// RL Intervention Dispatcher
// ---------------------------------------------------------------------------
// Bi-weekly (Mon & Thu 19:00 VN) scan of student learning data. Classifies
// each student as TOP / STRUGGLE / STEADY based on the last 14 days of
// activity, sends a personalized bell notification (assignment_notifications)
// to the student AND a mirror summary to the teacher(s)/admin(s). Every
// decision is logged into rl_interventions for an outer reward loop.
//
// Reward loop: at the start of each run, the previous run's pending
// interventions are scored — improvement => +1 (rewarded), stagnation
// after 2 struggle interventions => -0.5 (escalated, high-priority teacher
// ping), top-confirmed => +0.5.
//
// Manual invocation supports { dryRun, force } from the admin dashboard.
// Cron invocation uses service-role auth automatically.
// ---------------------------------------------------------------------------

import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

const SYSTEM_TYPES = new Set(['session_heartbeat', 'daily_login'])
const TOP_AVG_THRESHOLD = 0.80
const TOP_TREND_DELTA = 0.05
const TOP_MIN_ACTIVITIES = 5
const STRUGGLE_AVG_THRESHOLD = 0.65
const STRUGGLE_INACTIVE_DAYS = 4
const DEDUP_HOURS = 72
const ANALYSIS_WINDOW_DAYS = 14

interface ActivityRow {
  user_id: string
  activity_type: string
  score: number | null
  max_score: number | null
  created_at: string
  domain: string | null
}

interface StudentSnapshot {
  user_id: string
  full_name: string
  total_activities: number
  avg_score: number // 0..1
  recent_avg: number
  prior_avg: number
  trend_delta: number
  days_inactive: number
  weakest_area: string | null
  strongest_area: string | null
}

type Bucket = 'top' | 'struggle' | 'steady'

interface Classification {
  bucket: Bucket
  reason_vi: string
}

interface PriorIntervention {
  id: string
  student_id: string
  action: string
  state: any
  created_at: string
}

function classify(s: StudentSnapshot): Classification {
  // STRUGGLE wins over TOP if both somehow trigger (safety bias).
  if (s.days_inactive > STRUGGLE_INACTIVE_DAYS) {
    return { bucket: 'struggle', reason_vi: `em chưa hoạt động ${s.days_inactive} ngày` }
  }
  if (s.total_activities >= 3 && s.avg_score < STRUGGLE_AVG_THRESHOLD) {
    return { bucket: 'struggle', reason_vi: `điểm trung bình gần đây ${Math.round(s.avg_score * 100)}% cần cải thiện` }
  }
  if (s.total_activities >= TOP_MIN_ACTIVITIES && s.avg_score >= TOP_AVG_THRESHOLD) {
    return { bucket: 'top', reason_vi: `điểm trung bình ${Math.round(s.avg_score * 100)}%` }
  }
  if (s.total_activities >= TOP_MIN_ACTIVITIES && s.trend_delta >= TOP_TREND_DELTA) {
    return { bucket: 'top', reason_vi: `tiến bộ ${Math.round(s.trend_delta * 100)}% so với tuần trước` }
  }
  return { bucket: 'steady', reason_vi: 'ổn định' }
}

function moduleLabel(activityType: string | null): string {
  if (!activityType) return 'kỹ năng đang luyện'
  const map: Record<string, string> = {
    ielts_writing: 'IELTS Writing',
    ielts_speaking: 'IELTS Speaking',
    ielts_reading: 'IELTS Reading',
    ielts_listening: 'IELTS Listening',
    thpt_exam: 'Luyện thi THPT',
    toeic_speaking: 'TOEIC Speaking',
    pte_speaking: 'PTE Speaking',
    hsk_writing: 'HSK Writing',
    hskk_speaking: 'HSKK Speaking',
    python_challenge: 'Python',
    sql_challenge: 'SQL',
    coding_quiz: 'Coding Quiz',
  }
  if (map[activityType]) return map[activityType]
  return activityType.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

function buildTopMessage(s: StudentSnapshot, reason_vi: string) {
  const strong = s.strongest_area ? moduleLabel(s.strongest_area) : null
  const lines = [
    `🌟 Tuyệt vời, ${s.full_name}! Tuần này em đã hoàn thành ${s.total_activities} hoạt động với ${reason_vi}.`,
    'Thầy rất tự hào — cứ giữ phong độ này nhé!',
  ]
  if (strong) lines.push(`🏆 Điểm mạnh nổi bật: ${strong}.`)
  return lines.join(' ')
}

function buildStruggleMessage(s: StudentSnapshot, reason_vi: string) {
  const weak = s.weakest_area ? moduleLabel(s.weakest_area) : null
  const lines = [
    `💙 ${s.full_name} ơi, thầy thấy ${reason_vi}. Đừng lo, mỗi ngày 15 phút là đủ để bứt phá.`,
  ]
  if (weak) lines.push(`📚 Hôm nay thử lại: ${weak}.`)
  lines.push('💪 "Hành trình ngàn dặm bắt đầu từ một bước chân." — Thầy luôn ở đây nếu em cần.')
  return lines.join(' ')
}

async function fetchRecentActivity(supa: any, since: Date): Promise<ActivityRow[]> {
  // Paginate to be safe with large datasets.
  const pageSize = 1000
  let from = 0
  const all: ActivityRow[] = []
  for (;;) {
    const { data, error } = await supa
      .from('student_activity_log')
      .select('user_id, activity_type, score, max_score, created_at, domain')
      .gte('created_at', since.toISOString())
      .order('created_at', { ascending: true })
      .range(from, from + pageSize - 1)
    if (error) throw error
    if (!data || data.length === 0) break
    all.push(...(data as ActivityRow[]))
    if (data.length < pageSize) break
    from += pageSize
  }
  return all
}

function computeSnapshot(
  userId: string,
  fullName: string,
  rows: ActivityRow[],
  now: Date
): StudentSnapshot {
  const meaningful = rows.filter((r) => !SYSTEM_TYPES.has(r.activity_type))
  const halfMs = (ANALYSIS_WINDOW_DAYS / 2) * 86400_000
  const mid = new Date(now.getTime() - halfMs)

  const scored = meaningful.filter((r) => r.score != null && (r.max_score ?? 0) > 0)
  const overallAvg =
    scored.length > 0
      ? scored.reduce((a, r) => a + (r.score! / (r.max_score || 10)), 0) / scored.length
      : 0
  const recent = scored.filter((r) => new Date(r.created_at) >= mid)
  const prior = scored.filter((r) => new Date(r.created_at) < mid)
  const recentAvg =
    recent.length > 0 ? recent.reduce((a, r) => a + r.score! / (r.max_score || 10), 0) / recent.length : 0
  const priorAvg =
    prior.length > 0 ? prior.reduce((a, r) => a + r.score! / (r.max_score || 10), 0) / prior.length : 0

  const lastActive = meaningful.length > 0 ? new Date(meaningful[meaningful.length - 1].created_at) : null
  const daysInactive = lastActive
    ? Math.floor((now.getTime() - lastActive.getTime()) / 86400_000)
    : ANALYSIS_WINDOW_DAYS

  // Per activity_type avg → strongest/weakest
  const byType = new Map<string, { sum: number; cnt: number }>()
  for (const r of scored) {
    const ent = byType.get(r.activity_type) ?? { sum: 0, cnt: 0 }
    ent.sum += r.score! / (r.max_score || 10)
    ent.cnt += 1
    byType.set(r.activity_type, ent)
  }
  let strongest: string | null = null
  let weakest: string | null = null
  let strongAvg = -1
  let weakAvg = 2
  for (const [k, v] of byType.entries()) {
    if (v.cnt < 2) continue
    const a = v.sum / v.cnt
    if (a > strongAvg) { strongAvg = a; strongest = k }
    if (a < weakAvg) { weakAvg = a; weakest = k }
  }

  return {
    user_id: userId,
    full_name: fullName,
    total_activities: meaningful.length,
    avg_score: overallAvg,
    recent_avg: recentAvg,
    prior_avg: priorAvg,
    trend_delta: recentAvg - priorAvg,
    days_inactive: daysInactive,
    weakest_area: weakest,
    strongest_area: strongest,
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const supa = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  let body: { dryRun?: boolean; force?: boolean } = {}
  try { body = await req.json() } catch { /* cron empty body */ }
  const dryRun = body.dryRun === true
  const force = body.force === true

  try {
    const now = new Date()
    const since = new Date(now.getTime() - ANALYSIS_WINDOW_DAYS * 86400_000)

    // 1. Students = users with role 'student' (exclude staff)
    const { data: studentRoles, error: rolesErr } = await supa
      .from('user_roles')
      .select('user_id')
      .eq('role', 'student')
    if (rolesErr) throw rolesErr
    const studentIds = Array.from(new Set((studentRoles ?? []).map((r: any) => r.user_id)))

    const { data: staffRoles } = await supa
      .from('user_roles')
      .select('user_id, role')
      .in('role', ['teacher', 'admin', 'assistant'])
    const staffIds = new Set((staffRoles ?? []).map((r: any) => r.user_id))
    const eligible = studentIds.filter((id) => !staffIds.has(id))

    // Teacher/admin recipients of summary
    const teacherIds = Array.from(new Set(
      (staffRoles ?? []).filter((r: any) => r.role === 'teacher' || r.role === 'admin').map((r: any) => r.user_id)
    ))

    // 2. Profiles for display names
    const { data: profs } = await supa
      .from('profiles')
      .select('id, full_name')
      .in('id', eligible)
    const nameMap = new Map<string, string>()
    for (const p of (profs ?? [])) nameMap.set(p.id, (p.full_name?.trim() || 'em học viên'))

    // 3. Activity rows
    const acts = await fetchRecentActivity(supa, since)
    const byStudent = new Map<string, ActivityRow[]>()
    for (const r of acts) {
      if (!eligible.includes(r.user_id)) continue
      const arr = byStudent.get(r.user_id) ?? []
      arr.push(r); byStudent.set(r.user_id, arr)
    }

    // 4. Compute snapshots + classifications
    const decisions: Array<{ snap: StudentSnapshot; cls: Classification }> = []
    for (const uid of eligible) {
      const snap = computeSnapshot(uid, nameMap.get(uid) || 'em học viên', byStudent.get(uid) ?? [], now)
      const cls = classify(snap)
      decisions.push({ snap, cls })
    }

    // 5. Reward loop: score the most-recent pending interventions from prior run.
    // We look back 8 days to cover both Mon→Thu and Thu→Mon spans.
    const rewardSince = new Date(now.getTime() - 8 * 86400_000).toISOString()
    const { data: priorPending } = await supa
      .from('rl_interventions')
      .select('id, student_id, action, state, created_at')
      .eq('status', 'pending')
      .gte('created_at', rewardSince)
    const rewardUpdates: Array<{ id: string; reward: number; status: string }> = []
    const escalatedNotifs: Array<{ student_id: string; reason: string }> = []
    if (priorPending && priorPending.length > 0) {
      // Build a quick lookup of current snapshots
      const snapMap = new Map(decisions.map((d) => [d.snap.user_id, d]))
      // Count prior struggles per student to detect 2 consecutive.
      const { data: priorStruggles } = await supa
        .from('rl_interventions')
        .select('student_id')
        .eq('action', 'struggle_intervention')
        .gte('created_at', new Date(now.getTime() - 20 * 86400_000).toISOString())
      const struggleCount = new Map<string, number>()
      for (const row of (priorStruggles ?? []) as any[]) {
        struggleCount.set(row.student_id, (struggleCount.get(row.student_id) ?? 0) + 1)
      }
      for (const p of priorPending as PriorIntervention[]) {
        const cur = snapMap.get(p.student_id)
        if (!cur) {
          rewardUpdates.push({ id: p.id, reward: 0, status: 'expired' })
          continue
        }
        const priorAvg = Number(p.state?.avg_score ?? 0)
        const improvement = cur.snap.avg_score - priorAvg
        if (p.action === 'top_recognition') {
          if (cur.cls.bucket === 'top') rewardUpdates.push({ id: p.id, reward: 0.5, status: 'confirmed' })
          else rewardUpdates.push({ id: p.id, reward: 0, status: 'closed' })
        } else if (p.action === 'struggle_intervention') {
          if (improvement >= 0.05 || cur.snap.days_inactive <= 1) {
            rewardUpdates.push({ id: p.id, reward: 1, status: 'rewarded' })
          } else if ((struggleCount.get(p.student_id) ?? 0) >= 2) {
            rewardUpdates.push({ id: p.id, reward: -0.5, status: 'escalated' })
            escalatedNotifs.push({ student_id: p.student_id, reason: 'không cải thiện sau 2 lần can thiệp' })
          } else {
            rewardUpdates.push({ id: p.id, reward: 0, status: 'closed' })
          }
        }
      }
    }

    // 6. Dedup vs last DEDUP_HOURS
    const dedupSince = new Date(now.getTime() - DEDUP_HOURS * 3600_000).toISOString()
    const { data: recentInterv } = await supa
      .from('rl_interventions')
      .select('student_id, action, created_at')
      .gte('created_at', dedupSince)
    const recentKey = new Set<string>()
    for (const r of (recentInterv ?? []) as any[]) recentKey.add(`${r.student_id}::${r.action}`)

    // 7. Build notification + intervention payloads
    let notified = 0, skippedDedup = 0
    const notificationsToInsert: any[] = []
    const interventionsToInsert: any[] = []
    let topCount = 0, struggleCount = 0
    const struggleList: Array<{ name: string; reason: string }> = []

    for (const { snap, cls } of decisions) {
      if (cls.bucket === 'steady') continue
      const action = cls.bucket === 'top' ? 'top_recognition' : 'struggle_intervention'
      const key = `${snap.user_id}::${action}`
      if (!force && recentKey.has(key)) { skippedDedup++; continue }

      if (cls.bucket === 'top') topCount++
      else { struggleCount++; struggleList.push({ name: snap.full_name, reason: cls.reason_vi }) }

      const title = cls.bucket === 'top'
        ? '🌟 Lời khen từ Thầy Hải'
        : '💙 Báo cáo học tập & lời nhắn từ Thầy Hải'
      const bodyMsg = cls.bucket === 'top'
        ? buildTopMessage(snap, cls.reason_vi)
        : buildStruggleMessage(snap, cls.reason_vi)
      const route = cls.bucket === 'top' ? '/dashboard' : '/dashboard'

      notificationsToInsert.push({
        user_id: snap.user_id,
        title,
        body: bodyMsg,
        route,
        // Intentionally NO assignment_id — AssignmentReminderModal ignores these.
      })

      interventionsToInsert.push({
        student_id: snap.user_id,
        state: {
          avg_score: Number(snap.avg_score.toFixed(3)),
          trend_delta: Number(snap.trend_delta.toFixed(3)),
          total_activities: snap.total_activities,
          days_inactive: snap.days_inactive,
          weakest_area: snap.weakest_area,
          strongest_area: snap.strongest_area,
          full_name: snap.full_name,
        },
        action,
        action_details: { bucket: cls.bucket, reason_vi: cls.reason_vi, message: bodyMsg },
        status: 'pending',
      })

      notified++
    }

    // 8. Teacher summary — ONE consolidated digest per teacher to prevent
    // bell flooding (previously up to 17 notifications per run per teacher).
    if (teacherIds.length > 0 && (topCount + struggleCount + escalatedNotifs.length) > 0) {
      const dateStr = now.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
      const lines: string[] = []
      lines.push(`📊 ${dateStr}: ${topCount} xuất sắc · ${struggleCount} cần can thiệp · ${eligible.length} tổng học viên.`)
      if (escalatedNotifs.length > 0) {
        lines.push(`🚨 ${escalatedNotifs.length} ƯU TIÊN CAO (chưa cải thiện sau 2 lần):`)
        for (const esc of escalatedNotifs.slice(0, 5)) {
          const name = nameMap.get(esc.student_id) || 'Học viên'
          lines.push(`  • ${name} — ${esc.reason}`)
        }
        if (escalatedNotifs.length > 5) lines.push(`  • … và ${escalatedNotifs.length - 5} em khác`)
      }
      if (struggleList.length > 0) {
        lines.push(`💙 Cần can thiệp:`)
        for (const s of struggleList.slice(0, 6)) {
          lines.push(`  • ${s.name}${s.reason ? ' — ' + s.reason : ''}`)
        }
        if (struggleList.length > 6) lines.push(`  • … và ${struggleList.length - 6} em khác`)
      }
      const digest = lines.join('\n')
      const digestTitle = escalatedNotifs.length > 0
        ? `🚨 RL Báo cáo (${escalatedNotifs.length} ưu tiên cao)`
        : `📊 RL Báo cáo định kỳ`
      for (const tid of teacherIds) {
        notificationsToInsert.push({
          user_id: tid,
          title: digestTitle,
          body: digest,
          route: '/admin?tab=rl-interventions',
        })
      }
    }

    // 9. Apply (skip if dryRun)
    if (!dryRun) {
      if (rewardUpdates.length > 0) {
        for (const u of rewardUpdates) {
          await supa.from('rl_interventions').update({ reward: u.reward, status: u.status, updated_at: new Date().toISOString() }).eq('id', u.id)
        }
      }
      if (interventionsToInsert.length > 0) {
        await supa.from('rl_interventions').insert(interventionsToInsert)
      }
      // Chunk notification inserts (max ~500 per call)
      const chunkSize = 200
      for (let i = 0; i < notificationsToInsert.length; i += chunkSize) {
        const chunk = notificationsToInsert.slice(i, i + chunkSize)
        if (chunk.length > 0) await supa.from('assignment_notifications').insert(chunk)
      }
    }

    return new Response(JSON.stringify({
      ok: true,
      dryRun,
      force,
      scanned: eligible.length,
      with_activity: byStudent.size,
      top: topCount,
      struggle: struggleCount,
      notified,
      skipped_dedup: skippedDedup,
      teacher_recipients: teacherIds.length,
      reward_updates: rewardUpdates.length,
      escalated: escalatedNotifs.length,
      window_days: ANALYSIS_WINDOW_DAYS,
      ran_at: now.toISOString(),
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error('rl-intervention-dispatcher error', err)
    return new Response(JSON.stringify({ ok: false, error: String((err as any)?.message ?? err) }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
