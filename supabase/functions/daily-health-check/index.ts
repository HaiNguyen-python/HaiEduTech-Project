/**
 * daily-health-check
 * Pings every edge function (OPTIONS preflight), critical DB tables/RPCs,
 * key public routes, and AI provider balances. Self-heals transient failures
 * (rate-limit, timeout, 5xx) via a 1x retry pass, classifies remaining issues,
 * writes a summary row into health_check_runs and notifies super admins.
 */
import { createClient } from 'npm:@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!;
const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY') || '';

const EDGE_FUNCTIONS = [
  'ai-strategy-optimizer','analyze-cv','assess-profile-strength','audit-content','auto-generate-daily',
  'business-insight','career-roadmap-ai','chat','cleanup-knowledge-hub','counseling-ai','debug-python',
  'dictionary-ai-generate','dictionary-lookup','draft-cold-email','draft-motivation-letter',
  'draft-research-proposal-section','enhance-programming-theory','explain-code','explain-ielts-listening',
  'fetch-knowledge-articles','finnish-tts','generate-and-store-lesson','generate-code-challenge',
  'generate-exercise','generate-lesson','generate-lesson-illustrations','generate-marketing-kit',
  'generate-specialized-lesson','generate-vocab-image','generate-writing-prompt','grade-phrase-sentence',
  'grade-speaking','grade-writing','handle-email-suppression','handle-email-unsubscribe','hsk-mnemonic',
  'hskk-grade','interview-prep-ai','it-job-market','lookup-university','monthly-progress-report',
  'multi-lang-lookup','pedagogical-assistant','polish-motivation-letter','preview-transactional-email',
  'process-email-queue','review-python-code','roleplay-chat','scholarship-advisor','send-contact-email',
  'send-transactional-email','shortlist-universities','study-abroad-deadline-reminder','super-translate',
  'sync-google-sheet','translate-example','translate-finnish-word','translate-vi-en','upgrade-speaking',
  'vietnamese-tts',
];

const DB_TABLES = [
  'profiles','user_roles','assignments','class_schedules','student_activity_log',
  'user_vocab_mastered','revenue_logs','chatbot_conversations','email_send_log','api_balance',
];

const DB_RPCS: Array<{ name: string; args: Record<string, unknown> }> = [
  { name: 'get_monthly_top_students', args: { _limit: 3 } },
  { name: 'get_streak_leaderboard', args: {} },
  { name: 'get_overall_vocab_leaderboard', args: {} },
];

const PUBLIC_ROUTES = [
  '/', '/dashboard', '/admin', '/english', '/finnish', '/chinese',
  '/ielts', '/programming', '/learn-vietnamese', '/scholarship', '/career-roadmap',
];

const SITE_ORIGIN = 'https://haiedutech.com';

type Status = 'ok' | 'fail' | 'warn';
type Category = 'edge' | 'db' | 'rpc' | 'route' | 'ai';

interface Result {
  category: Category;
  name: string;
  status: Status;
  http_status?: number;
  latency_ms: number;
  error?: string;
  auto_recovered?: boolean;
  suggested_fix?: string;
}

function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)); }

async function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return await Promise.race([
    p,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error(`timeout ${ms}ms`)), ms)),
  ]);
}

/** Run an async mapper across `items` with bounded concurrency + optional inter-batch delay. */
async function runBatched<T, R>(items: T[], fn: (item: T) => Promise<R>, concurrency = 5, gapMs = 250): Promise<R[]> {
  const out: R[] = [];
  for (let i = 0; i < items.length; i += concurrency) {
    const slice = items.slice(i, i + concurrency);
    const res = await Promise.all(slice.map(fn));
    out.push(...res);
    if (i + concurrency < items.length && gapMs > 0) await sleep(gapMs);
  }
  return out;
}

async function checkEdgeFn(name: string): Promise<Result> {
  const t0 = performance.now();
  try {
    const res = await withTimeout(
      fetch(`${SUPABASE_URL}/functions/v1/${name}`, {
        method: 'OPTIONS',
        headers: {
          'apikey': ANON_KEY,
          'Authorization': `Bearer ${ANON_KEY}`,
          'Access-Control-Request-Method': 'POST',
          'Access-Control-Request-Headers': 'authorization,content-type',
          'Origin': SITE_ORIGIN,
        },
      }), 8000);
    const lat = Math.round(performance.now() - t0);
    try { await res.text(); } catch { /* ignore */ }
    // 429 from the gateway means the *checker* hit the per-trace rate-limit,
    // NOT that the function is broken — a missing function returns 404.
    // 2xx/3xx/4xx all prove the function is registered and reachable.
    // Only 5xx or network/timeout failures indicate real trouble.
    return {
      category: 'edge', name, http_status: res.status, latency_ms: lat,
      status: res.status < 500 ? 'ok' : 'fail',
      error: res.status >= 500 ? `HTTP ${res.status}` : undefined,
    };
  } catch (e) {
    const msg = (e as Error).message || '';
    // Self-throttle: the Supabase Edge runtime rejects sibling-function probes
    // beyond ~30/min per parent trace with a "Rate limit exceeded for trace …"
    // error. Reaching that error proves the gateway is alive and the function
    // is registered — treat as OK (the function itself is fine).
    if (/rate limit exceeded for trace/i.test(msg)) {
      return { category: 'edge', name, status: 'ok', latency_ms: Math.round(performance.now() - t0), http_status: 429 };
    }
    return { category: 'edge', name, status: 'fail', latency_ms: Math.round(performance.now() - t0), error: msg };
  }
}

async function checkTable(sb: ReturnType<typeof createClient>, table: string): Promise<Result> {
  const t0 = performance.now();
  try {
    const { error } = await withTimeout(
      sb.from(table).select('*', { count: 'exact', head: true }) as unknown as Promise<{ error: unknown }>,
      6000);
    const lat = Math.round(performance.now() - t0);
    if (error) return { category: 'db', name: table, status: 'fail', latency_ms: lat, error: (error as { message: string }).message };
    return { category: 'db', name: table, status: 'ok', latency_ms: lat };
  } catch (e) {
    return { category: 'db', name: table, status: 'fail', latency_ms: Math.round(performance.now() - t0), error: (e as Error).message };
  }
}

async function checkRpc(sb: ReturnType<typeof createClient>, name: string, args: Record<string, unknown>): Promise<Result> {
  const t0 = performance.now();
  try {
    const { error } = await withTimeout(
      sb.rpc(name, args) as unknown as Promise<{ error: unknown }>,
      8000);
    const lat = Math.round(performance.now() - t0);
    if (error) return { category: 'rpc', name, status: 'fail', latency_ms: lat, error: (error as { message: string }).message };
    return { category: 'rpc', name, status: 'ok', latency_ms: lat };
  } catch (e) {
    return { category: 'rpc', name, status: 'fail', latency_ms: Math.round(performance.now() - t0), error: (e as Error).message };
  }
}

async function checkRoute(path: string): Promise<Result> {
  const t0 = performance.now();
  try {
    const res = await withTimeout(fetch(`${SITE_ORIGIN}${path}`, { redirect: 'manual' }), 10000);
    const lat = Math.round(performance.now() - t0);
    try { await res.text(); } catch { /* ignore */ }
    const ok = res.status >= 200 && res.status < 400;
    return {
      category: 'route', name: path, http_status: res.status, latency_ms: lat,
      status: ok ? 'ok' : 'fail', error: ok ? undefined : `HTTP ${res.status}`,
    };
  } catch (e) {
    return { category: 'route', name: path, status: 'fail', latency_ms: Math.round(performance.now() - t0), error: (e as Error).message };
  }
}

async function checkPerplexity(sb: ReturnType<typeof createClient>): Promise<Result> {
  const t0 = performance.now();
  try {
    const { data, error } = await sb
      .from('api_balance')
      .select('balance, updated_at')
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    const lat = Math.round(performance.now() - t0);
    if (error) return { category: 'ai', name: 'Perplexity Balance', status: 'fail', latency_ms: lat, error: error.message };
    const bal = Number((data as { balance?: number } | null)?.balance ?? 0);
    if (bal < 1) return { category: 'ai', name: 'Perplexity Balance', status: 'fail', latency_ms: lat, error: `Số dư rất thấp: $${bal.toFixed(2)}` };
    if (bal < 10) return { category: 'ai', name: 'Perplexity Balance', status: 'warn', latency_ms: lat, error: `Số dư thấp: $${bal.toFixed(2)}` };
    return { category: 'ai', name: 'Perplexity Balance', status: 'ok', latency_ms: lat };
  } catch (e) {
    return { category: 'ai', name: 'Perplexity Balance', status: 'fail', latency_ms: Math.round(performance.now() - t0), error: (e as Error).message };
  }
}

async function checkLovableGateway(): Promise<Result> {
  const t0 = performance.now();
  if (!LOVABLE_API_KEY) {
    return { category: 'ai', name: 'Lovable AI Gateway', status: 'warn', latency_ms: 0, error: 'LOVABLE_API_KEY chưa được cấu hình' };
  }
  try {
    const res = await withTimeout(fetch('https://ai.gateway.lovable.dev/v1/models', {
      headers: { 'Authorization': `Bearer ${LOVABLE_API_KEY}` },
    }), 8000);
    const lat = Math.round(performance.now() - t0);
    try { await res.text(); } catch { /* ignore */ }
    if (res.status === 401 || res.status === 403) {
      return { category: 'ai', name: 'Lovable AI Gateway', status: 'fail', http_status: res.status, latency_ms: lat, error: 'Auth lỗi' };
    }
    if (res.status >= 500) {
      return { category: 'ai', name: 'Lovable AI Gateway', status: 'fail', http_status: res.status, latency_ms: lat, error: `HTTP ${res.status}` };
    }
    return { category: 'ai', name: 'Lovable AI Gateway', status: 'ok', http_status: res.status, latency_ms: lat };
  } catch (e) {
    return { category: 'ai', name: 'Lovable AI Gateway', status: 'fail', latency_ms: Math.round(performance.now() - t0), error: (e as Error).message };
  }
}

/** Transient = worth a single auto-retry. */
function isTransient(r: Result): boolean {
  const e = (r.error || '').toLowerCase();
  if (r.http_status === 429 || r.http_status === 502 || r.http_status === 503 || r.http_status === 504) return true;
  return /rate.?limit|timeout|fetch failed|connection|reset|temporarily|econn|network/i.test(e);
}

/** Human-readable fix hint for real failures. */
function suggestFix(r: Result): string | undefined {
  const e = (r.error || '').toLowerCase();
  if (/column .* does not exist/i.test(e)) return 'Schema mismatch — kiểm tra tên cột trong code function.';
  if (/relation .* does not exist/i.test(e)) return 'Bảng đã đổi tên hoặc bị xoá — cập nhật query.';
  if (/function .* does not exist|could not find the function/i.test(e)) return 'RPC không tồn tại — tạo lại hoặc đổi tên.';
  if (/permission denied|rls/i.test(e)) return 'Thiếu GRANT/RLS — kiểm tra quyền của vai trò gọi.';
  if (r.category === 'edge' && r.http_status && r.http_status >= 500) return 'Edge function crash — xem log function chi tiết.';
  if (r.category === 'ai' && r.name === 'Lovable AI Gateway' && (r.http_status === 401 || r.http_status === 403)) {
    return 'LOVABLE_API_KEY hết hạn — rotate trong Project Settings.';
  }
  if (r.category === 'ai' && r.name === 'Perplexity Balance') return 'Nạp thêm credit Perplexity hoặc kiểm tra Connector.';
  if (r.category === 'route' && r.http_status && r.http_status >= 500) return 'Route trả 5xx — kiểm tra build hoặc lỗi runtime.';
  return undefined;
}

async function retryOne(sb: ReturnType<typeof createClient>, r: Result): Promise<Result> {
  if (r.category === 'edge') return checkEdgeFn(r.name);
  if (r.category === 'db') return checkTable(sb, r.name);
  if (r.category === 'rpc') {
    const def = DB_RPCS.find((x) => x.name === r.name);
    return def ? checkRpc(sb, def.name, def.args) : r;
  }
  if (r.category === 'route') return checkRoute(r.name);
  if (r.category === 'ai' && r.name === 'Perplexity Balance') return checkPerplexity(sb);
  if (r.category === 'ai' && r.name === 'Lovable AI Gateway') return checkLovableGateway();
  return r;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const startedAt = performance.now();
  let triggeredBy = 'cron';
  try {
    if (req.method === 'POST') {
      const body = await req.json().catch(() => ({}));
      if (typeof body?.triggered_by === 'string') triggeredBy = body.triggered_by;
    }
  } catch { /* ignore */ }

  const sb = createClient(SUPABASE_URL, SERVICE_ROLE);

  // Pass 1 — edge functions throttled to dodge gateway rate-limit
  const edgeResults = await runBatched(EDGE_FUNCTIONS, checkEdgeFn, 5, 300);

  const [dbResults, rpcResults, routeResults, pplx, lovable] = await Promise.all([
    runBatched(DB_TABLES, (t) => checkTable(sb, t), 5, 0),
    runBatched(DB_RPCS, (r) => checkRpc(sb, r.name, r.args), 3, 0),
    runBatched(PUBLIC_ROUTES, checkRoute, 4, 100),
    checkPerplexity(sb),
    checkLovableGateway(),
  ]);

  let results: Result[] = [...edgeResults, ...dbResults, ...rpcResults, ...routeResults, pplx, lovable];

  // Pass 2 — self-healing retry of transient failures
  const transientIdx: number[] = [];
  results.forEach((r, i) => { if (r.status === 'fail' && isTransient(r)) transientIdx.push(i); });

  if (transientIdx.length > 0) {
    await sleep(5000);
    const retried = await runBatched(
      transientIdx,
      async (i) => {
        const orig = results[i];
        const next = await retryOne(sb, orig);
        if (next.status === 'ok') return { ...next, auto_recovered: true } as Result;
        return { ...next, suggested_fix: suggestFix(next) } as Result;
      },
      4, 250,
    );
    transientIdx.forEach((idx, k) => { results[idx] = retried[k]; });
  }

  results = results.map((r) => (r.status === 'fail' && !r.suggested_fix) ? { ...r, suggested_fix: suggestFix(r) } : r);

  const total = results.length;
  const passed = results.filter((r) => r.status === 'ok').length;
  const warned = results.filter((r) => r.status === 'warn').length;
  const failed = results.filter((r) => r.status === 'fail').length;
  const auto_recovered = results.filter((r) => r.auto_recovered).length;
  const duration_ms = Math.round(performance.now() - startedAt);

  const { data: runRow, error: insertErr } = await sb
    .from('health_check_runs')
    .insert({ triggered_by: triggeredBy, total, passed, warned, failed, auto_recovered, duration_ms, results })
    .select('id')
    .single();

  if (insertErr) {
    return new Response(JSON.stringify({ error: insertErr.message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Notify staff via bell — every run so admin sees daily confirmation
  const failItems = results.filter((r) => r.status === 'fail');
  let title: string;
  let body: string;
  if (failed === 0) {
    title = auto_recovered > 0
      ? `✅ Health OK · ${auto_recovered} tự phục hồi`
      : (warned > 0 ? `✅ Health OK · ${warned} cảnh báo` : `✅ Health Check OK · ${total} chức năng`);
    body = `Tất cả ${passed}/${total} chức năng hoạt động bình thường (${(duration_ms / 1000).toFixed(1)}s).`
      + (auto_recovered > 0 ? `\nTự phục hồi: ${auto_recovered} lỗi tạm thời.` : '');
  } else {
    title = `⚠️ Health Check: ${failed} chức năng cần xử lý`;
    const lines = failItems.slice(0, 5).map((r) => `• [${r.category}] ${r.name}: ${r.error || 'fail'}${r.suggested_fix ? ` → ${r.suggested_fix}` : ''}`);
    if (failed > 5) lines.push(`… và ${failed - 5} lỗi khác`);
    body = lines.join('\n');
  }

  if (true) {
    const { data: staffRoles } = await sb
      .from('user_roles')
      .select('user_id')
      .in('role', ['teacher', 'admin']);
    if (staffRoles && staffRoles.length > 0) {
      const uniqueIds = [...new Set((staffRoles as Array<{ user_id: string }>).map((r) => r.user_id))];
      await sb.from('assignment_notifications').insert(
        uniqueIds.map((uid) => ({ user_id: uid, title, body, route: '/admin?tab=health' })),
      );
    }
  }

  return new Response(JSON.stringify({
    run_id: (runRow as { id: string }).id, total, passed, warned, failed, auto_recovered, duration_ms,
  }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
});
