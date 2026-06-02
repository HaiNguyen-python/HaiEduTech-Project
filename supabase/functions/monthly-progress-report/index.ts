// Monthly Progress Report dispatcher
// Aggregates the last 30 days of activity per active student and enqueues
// a branded transactional email summarizing their learning journey.
// Triggered by pg_cron at 00:00 on the 1st of each month, or manually
// from the admin dashboard (with optional dryRun).

import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

interface ActivityRow {
  user_id: string
  activity_type: string
  score: number | null
  max_score: number | null
  time_spent_seconds: number | null
  metadata: Record<string, any> | null
  created_at: string
}

interface ProfileRow { id: string; full_name: string | null }
interface AuthUser { id: string; email: string | null; raw_user_meta_data: Record<string, any> | null }

const SYSTEM_TYPES = new Set(['session_heartbeat', 'daily_login'])

const MODULE_LABEL: Record<string, string> = {
  ielts_writing: 'IELTS Writing',
  ielts_speaking: 'IELTS Speaking',
  ielts_reading: 'IELTS Reading',
  ielts_listening: 'IELTS Listening',
  thpt_exam: 'Luyện thi THPT Quốc gia',
  toeic_speaking: 'TOEIC Speaking',
  toeic_writing: 'TOEIC Writing',
  pte_speaking: 'PTE Speaking',
  pte_writing_essay: 'PTE Writing',
  hsk_writing: 'HSK Writing',
  hskk_speaking: 'HSKK Speaking',
  conv_english: 'Conversational English',
  conv_chinese: 'Conversational Chinese',
  conv_finnish: 'Conversational Finnish',
  conv_vietnamese: 'Conversational Vietnamese',
  speaking_coach_english: 'AI Speaking Coach (EN)',
  speaking_coach_chinese: 'AI Speaking Coach (ZH)',
  speaking_coach_finnish: 'AI Speaking Coach (FI)',
  python_challenge: 'Python Challenge',
  sql_challenge: 'SQL Challenge',
  coding_quiz: 'AI Academy · Coding Quiz',
  scratch_lesson: 'Scratch Coding Lab',
  ml_lesson: 'Machine Learning Lab',
  spark_lesson: 'Apache Spark Lab',
  pinyin_drill: 'Pinyin Drill',
  hanzi_recognition: 'Hanzi Recognition',
}

function moduleLabel(activityType: string): string {
  if (MODULE_LABEL[activityType]) return MODULE_LABEL[activityType]
  return activityType
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

// Compute streak: longest consecutive-day chain ending at or near the period end.
function computeStreak(dates: string[]): number {
  if (dates.length === 0) return 0
  const set = new Set(dates) // YYYY-MM-DD strings
  const sorted = [...set].sort()
  let best = 1
  let cur = 1
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1] + 'T00:00:00Z').getTime()
    const now = new Date(sorted[i] + 'T00:00:00Z').getTime()
    if (now - prev === 86400000) {
      cur++
      if (cur > best) best = cur
    } else {
      cur = 1
    }
  }
  return best
}

// Map mastered word count -> pet level + emoji (mirrors gamification rules).
function petStatus(masteredCount: number, stars: number): { level: number; emoji: string } {
  const score = masteredCount + Math.floor(stars / 10)
  const level = Math.max(1, Math.min(10, 1 + Math.floor(score / 25)))
  const emojis = ['🥚', '🐣', '🐤', '🐥', '🐦', '🦅', '🐲', '🐉', '🦄', '🌟']
  return { level, emoji: emojis[level - 1] || '🐉' }
}

function encouragementFor(hours: number, streak: number, level: number): string {
  if (hours >= 10 && streak >= 14) {
    return `Phong độ đỉnh cao! ${hours.toFixed(1)} giờ học cùng chuỗi ${streak} ngày liên tiếp đang đưa thú cưng AI của bạn vượt Level ${level}. Hãy tiếp tục giữ nhịp này nhé.`
  }
  if (hours >= 5) {
    return `Bạn đã học ${hours.toFixed(1)} giờ trong tháng — một nền tảng vững chắc. Tăng thêm 1-2 phiên/tuần là thú cưng sẽ leo lên Level ${level + 1} ngay.`
  }
  if (hours > 0) {
    return `Khởi đầu tốt với ${hours.toFixed(1)} giờ học! Hãy dành 15 phút mỗi ngày — sự đều đặn quan trọng hơn thời lượng.`
  }
  return 'Tháng này hơi vắng bóng bạn. Hãy quay lại với một bài học ngắn 10 phút để khởi động lại hành trình nhé!'
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !supabaseServiceKey) {
    return new Response(JSON.stringify({ error: 'Server configuration error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  let dryRun = false
  let onlyUserId: string | null = null
  try {
    const body = await req.json()
    dryRun = !!body?.dryRun
    onlyUserId = body?.userId ?? null
  } catch {
    // empty body = scheduled run
  }

  const admin = createClient(supabaseUrl, supabaseServiceKey)

  // Period = previous 30 days ending at midnight today (UTC)
  const periodEnd = new Date()
  periodEnd.setUTCHours(0, 0, 0, 0)
  const periodStart = new Date(periodEnd.getTime() - 30 * 86400000)
  const periodLabel = `Tháng ${periodStart.getUTCMonth() + 1}/${periodStart.getUTCFullYear()}`

  // 1. Get all students (role = student) — exclude staff to avoid noise
  const { data: studentRoles, error: rolesErr } = await admin
    .from('user_roles').select('user_id').eq('role', 'student')
  if (rolesErr) {
    return new Response(JSON.stringify({ error: rolesErr.message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  let studentIds = [...new Set((studentRoles || []).map((r) => r.user_id as string))]
  if (onlyUserId) studentIds = studentIds.filter((id) => id === onlyUserId)
  if (studentIds.length === 0) {
    return new Response(JSON.stringify({ success: true, processed: 0, sent: 0, skipped: 0, failed: 0 }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  // 2. Fetch profiles + emails (auth.users via admin API in chunks)
  const profilesMap = new Map<string, ProfileRow>()
  for (let i = 0; i < studentIds.length; i += 200) {
    const chunk = studentIds.slice(i, i + 200)
    const { data } = await admin.from('profiles').select('id, full_name').in('id', chunk)
    for (const p of data || []) profilesMap.set(p.id, p as ProfileRow)
  }

  const emailMap = new Map<string, string>()
  // listUsers paginates; pull up to 5000 (typical school size)
  for (let page = 1; page <= 50; page++) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 200 })
    if (error || !data?.users?.length) break
    for (const u of data.users as AuthUser[]) {
      if (u.email) emailMap.set(u.id, u.email)
    }
    if (data.users.length < 200) break
  }

  // 3. Fetch activities in the window for these students (paginated)
  const activities: ActivityRow[] = []
  const batch = 1000
  let from = 0
  while (true) {
    const { data, error } = await admin
      .from('student_activity_log')
      .select('user_id, activity_type, score, max_score, time_spent_seconds, metadata, created_at')
      .gte('created_at', periodStart.toISOString())
      .lt('created_at', periodEnd.toISOString())
      .in('user_id', studentIds.length > 500 ? studentIds.slice(0, 500) : studentIds) // guard
      .range(from, from + batch - 1)
    if (error) break
    const rows = (data || []) as ActivityRow[]
    activities.push(...rows)
    if (rows.length < batch) break
    from += batch
  }

  // 4. Fetch mastered vocab (Smart Review proxy) and stars per user
  const masteredCount = new Map<string, number>()
  {
    const { data } = await admin
      .from('user_vocab_mastered')
      .select('user_id')
      .in('user_id', studentIds)
    for (const r of (data || []) as { user_id: string }[]) {
      masteredCount.set(r.user_id, (masteredCount.get(r.user_id) || 0) + 1)
    }
  }

  // 5. Process per student
  let sent = 0, skipped = 0, failed = 0
  const logRows: Array<Record<string, any>> = []

  for (const uid of studentIds) {
    const email = emailMap.get(uid)
    const profile = profilesMap.get(uid)
    const studentName = (profile?.full_name || '').trim() || 'Học viên HaiEduTech'

    const userActs = activities.filter((a) => a.user_id === uid)

    // Aggregate
    const totalSeconds = userActs.reduce((s, a) => s + (a.time_spent_seconds || 0), 0)
    const totalHours = totalSeconds / 3600
    const dateStrings = userActs.map((a) => a.created_at.slice(0, 10))
    const streak = computeStreak(dateStrings)

    // Module breakdown (exclude system types)
    const moduleMap = new Map<string, { attempts: number; totalAcc: number }>()
    let starsEarned = 0
    for (const a of userActs) {
      if (SYSTEM_TYPES.has(a.activity_type)) continue
      const max = a.max_score || 10
      const acc = max > 0 ? Math.min(100, (Number(a.score || 0) / max) * 100) : 0
      const cur = moduleMap.get(a.activity_type) || { attempts: 0, totalAcc: 0 }
      cur.attempts += 1
      cur.totalAcc += acc
      moduleMap.set(a.activity_type, cur)
      // Stars = each completed activity ≥ 70% earns 5 stars + 1 per accuracy point above 70
      if (acc >= 70) starsEarned += 5 + Math.floor((acc - 70) / 5)
    }

    const modules = [...moduleMap.entries()]
      .map(([k, v]) => ({
        module: moduleLabel(k),
        accuracyPct: Math.round(v.totalAcc / v.attempts),
        attempts: v.attempts,
      }))
      .sort((a, b) => b.attempts - a.attempts)
      .slice(0, 8)

    const mastered = masteredCount.get(uid) || 0
    const pet = petStatus(mastered, starsEarned)
    const reviewQueueCount = Math.max(0, mastered) // Smart Review queue proxy

    const metrics = {
      totalHours: Number(totalHours.toFixed(2)),
      streakDays: streak,
      totalStars: starsEarned,
      petLevel: pet.level,
      petEmoji: pet.emoji,
      modulesCount: modules.length,
      reviewQueueCount,
      activitiesCount: userActs.filter((a) => !SYSTEM_TYPES.has(a.activity_type)).length,
    }

    // Skip students with zero engagement AND no email
    if (!email) {
      skipped += 1
      logRows.push({
        period_start: periodStart.toISOString().slice(0, 10),
        period_end: periodEnd.toISOString().slice(0, 10),
        user_id: uid,
        recipient_email: '',
        student_name: studentName,
        status: 'skipped',
        error_message: 'no_email',
        metrics,
      })
      continue
    }

    const templateData = {
      studentName,
      periodLabel,
      totalHours: metrics.totalHours,
      streakDays: metrics.streakDays,
      totalStars: metrics.totalStars,
      petLevel: metrics.petLevel,
      petEmoji: metrics.petEmoji,
      modules,
      reviewQueueCount,
      encouragement: encouragementFor(totalHours, streak, pet.level),
    }

    if (dryRun) {
      sent += 1
      logRows.push({
        period_start: periodStart.toISOString().slice(0, 10),
        period_end: periodEnd.toISOString().slice(0, 10),
        user_id: uid,
        recipient_email: email,
        student_name: studentName,
        status: 'dry_run',
        metrics,
      })
      continue
    }

    try {
      const { error } = await admin.functions.invoke('send-transactional-email', {
        body: {
          templateName: 'monthly-progress-report',
          recipientEmail: email,
          idempotencyKey: `monthly-report-${uid}-${periodStart.toISOString().slice(0, 7)}`,
          templateData,
        },
      })
      if (error) throw error
      sent += 1
      logRows.push({
        period_start: periodStart.toISOString().slice(0, 10),
        period_end: periodEnd.toISOString().slice(0, 10),
        user_id: uid,
        recipient_email: email,
        student_name: studentName,
        status: 'queued',
        metrics,
      })
    } catch (e) {
      failed += 1
      logRows.push({
        period_start: periodStart.toISOString().slice(0, 10),
        period_end: periodEnd.toISOString().slice(0, 10),
        user_id: uid,
        recipient_email: email,
        student_name: studentName,
        status: 'failed',
        error_message: e instanceof Error ? e.message : String(e),
        metrics,
      })
    }
  }

  // 6. Persist logs in chunks
  if (logRows.length > 0) {
    for (let i = 0; i < logRows.length; i += 500) {
      await admin.from('monthly_report_logs').insert(logRows.slice(i, i + 500))
    }
  }

  return new Response(
    JSON.stringify({
      success: true,
      period: { start: periodStart.toISOString(), end: periodEnd.toISOString(), label: periodLabel },
      processed: studentIds.length,
      sent, skipped, failed, dryRun,
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
})
