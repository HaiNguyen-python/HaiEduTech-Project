/**
 * daily-health-check
 * Pings every edge function (OPTIONS preflight), critical DB tables/RPCs,
 * key public routes, and AI provider balances. Writes a summary row into
 * health_check_runs and notifies super admins via the bell.
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

// 60 edge functions (excluding this one)
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

interface Result {
  category: 'edge' | 'db' | 'rpc' | 'route' | 'ai';
  name: string;
  status: 'ok' | 'fail' | 'warn';
  http_status?: number;
  latency_ms: number;
  error?: string;
}

async function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return await Promise.race([
    p,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error(`timeout ${ms}ms`)), ms)),
  ]);
}

async function checkEdgeFn(name: string): Promise<Result> {
  const t0 = performance.now();
  try {
    const res = await withTimeout(
      fetch(`${SUPABASE_URL}/functions/v1/${name}`, {
        method: 'OPTIONS',
        headers: {
          'apikey': ANON_KEY,
          'Access-Control-Request-Method': 'POST',
          'Access-Control-Request-Headers': 'authorization,content-type',
          'Origin': SITE_ORIGIN,
        },
      }), 8000);
    const lat = Math.round(performance.now() - t0);
    return {
      category: 'edge', name, http_status: res.status, latency_ms: lat,
      status: res.status < 500 ? 'ok' : 'fail',
      error: res.status >= 500 ? `HTTP ${res.status}` : undefined,
    };
  } catch (e) {
    return { category: 'edge', name, status: 'fail', latency_ms: Math.round(performance.now() - t0), error: (e as Error).message };
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
    const { data, error } = await sb.from('api_balance').select('balance_usd, provider').order('updated_at', { ascending: false }).limit(1).maybeSingle();
    const lat = Math.round(performance.now() - t0);
    if (error) return { category: 'ai', name: 'Perplexity Balance', status: 'fail', latency_ms: lat, error: error.message };
    const bal = Number((data as { balance_usd?: number } | null)?.balance_usd ?? 0);
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

  // Run all checks in parallel batches to avoid socket exhaustion
  const edgeResults = await Promise.all(EDGE_FUNCTIONS.map(checkEdgeFn));
  const [dbResults, rpcResults, routeResults, pplx, lovable] = await Promise.all([
    Promise.all(DB_TABLES.map((t) => checkTable(sb, t))),
    Promise.all(DB_RPCS.map((r) => checkRpc(sb, r.name, r.args))),
    Promise.all(PUBLIC_ROUTES.map(checkRoute)),
    checkPerplexity(sb),
    checkLovableGateway(),
  ]);

  const results: Result[] = [...edgeResults, ...dbResults, ...rpcResults, ...routeResults, pplx, lovable];
  const total = results.length;
  const passed = results.filter((r) => r.status === 'ok').length;
  const warned = results.filter((r) => r.status === 'warn').length;
  const failed = results.filter((r) => r.status === 'fail').length;
  const duration_ms = Math.round(performance.now() - startedAt);

  const { data: runRow, error: insertErr } = await sb
    .from('health_check_runs')
    .insert({ triggered_by: triggeredBy, total, passed, warned, failed, duration_ms, results })
    .select('id')
    .single();

  if (insertErr) {
    return new Response(JSON.stringify({ error: insertErr.message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Notify super admins via the bell
  const failItems = results.filter((r) => r.status === 'fail');
  const title = failed === 0
    ? (warned > 0 ? `✅ Health Check OK · ${warned} cảnh báo` : `✅ Health Check OK · ${total} chức năng`)
    : `⚠️ Health Check: ${failed} chức năng lỗi`;
  const summaryLines = failItems.slice(0, 5).map((r) => `• [${r.category}] ${r.name}: ${r.error || 'fail'}`);
  if (failed > 5) summaryLines.push(`… và ${failed - 5} lỗi khác`);
  const body = failed === 0
    ? `Tất cả ${passed}/${total} chức năng hoạt động bình thường (${(duration_ms / 1000).toFixed(1)}s).`
    : summaryLines.join('\n');

  // Insert notifications directly for staff users (notify_super_admins uses auth.uid which is null here)
  const { data: staffRoles } = await sb
    .from('user_roles')
    .select('user_id')
    .in('role', ['teacher', 'admin']);

  if (staffRoles && staffRoles.length > 0) {
    const uniqueIds = [...new Set((staffRoles as Array<{ user_id: string }>).map((r) => r.user_id))];
    await sb.from('assignment_notifications').insert(
      uniqueIds.map((uid) => ({
        user_id: uid,
        title,
        body,
        route: '/admin?tab=health',
      })),
    );
  }

  return new Response(JSON.stringify({
    run_id: (runRow as { id: string }).id, total, passed, warned, failed, duration_ms,
  }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
});
