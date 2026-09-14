import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const FOUR = new Set(["python", "py"]);
const TWO = new Set([
  "javascript", "js", "typescript", "ts", "tsx", "jsx", "json", "css", "scss", "html", "xml",
  "yaml", "yml", "bash", "sh", "shell", "java", "hcl", "terraform", "mermaid",
]);

function normalizeCode(code: string, language: string): string {
  const lang = language.toLowerCase();
  const target = FOUR.has(lang) ? 4 : TWO.has(lang) ? 2 : 0;
  const lines = code.replace(/\r\n?/g, "\n").replace(/\t/g, " ".repeat(FOUR.has(lang) ? 4 : 2)).split("\n");
  while (lines.length && !lines[0]?.trim()) lines.shift();
  while (lines.length && !lines[lines.length - 1]?.trim()) lines.pop();
  const indent = (line: string) => line.match(/^ */)?.[0].length ?? 0;
  const nonBlank = lines.filter((line) => line.trim());
  const common = nonBlank.length ? Math.min(...nonBlank.map(indent)) : 0;
  const dedented = lines.map((line) => line.slice(Math.min(common, indent(line))).trimEnd());
  const joined = dedented.join("\n");
  const sensitive = FOUR.has(lang)
    ? /'''|"""/.test(joined)
    : ["javascript", "js", "typescript", "ts", "tsx", "jsx"].includes(lang) && /(?:^|[^\\])`/.test(joined);
  if (!target || sensitive) return joined;
  const widths = dedented.filter((line) => line.trim() && indent(line) > 0).map(indent);
  const shallowest = widths.length ? Math.min(...widths) : target;
  if (shallowest >= target) return joined;
  return dedented.map((line) => {
    const width = indent(line);
    return !line.trim() || width === 0 ? line : `${" ".repeat(Math.round(width * target / shallowest))}${line.slice(width)}`;
  }).join("\n");
}

function normalizeMarkdown(markdown: string): string {
  return markdown.replace(/```([^\n`]*)\n([\s\S]*?)```/g, (_whole, info: string, code: string) => {
    const cleanInfo = info.trim();
    return `\`\`\`${cleanInfo}\n${normalizeCode(code, cleanInfo.split(/\s+/)[0] || "text")}\n\`\`\``;
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const url = Deno.env.get("SUPABASE_URL") ?? "";
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const auth = req.headers.get("Authorization") ?? "";
    if (!auth) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });
    const admin = createClient(url, serviceKey);
    const token = auth.replace(/^Bearer\s+/i, "");
    const { data: { user } } = await admin.auth.getUser(token);
    if (!user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });
    const [{ data: isAdmin }, { data: isTeacher }] = await Promise.all([
      admin.rpc("has_role", { _user_id: user.id, _role: "admin" }),
      admin.rpc("has_role", { _user_id: user.id, _role: "teacher" }),
    ]);
    if (!isAdmin && !isTeacher) return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403, headers: corsHeaders });

    const { data: rows, error } = await admin.from("programming_theory_cache")
      .select("module_id, lesson_id, enhanced_markdown");
    if (error) throw error;
    let changed = 0;
    for (const row of rows ?? []) {
      const normalized = normalizeMarkdown(row.enhanced_markdown ?? "");
      if (normalized === row.enhanced_markdown) continue;
      const { error: updateError } = await admin.from("programming_theory_cache")
        .update({ enhanced_markdown: normalized })
        .eq("module_id", row.module_id)
        .eq("lesson_id", row.lesson_id);
      if (updateError) throw updateError;
      changed += 1;
    }
    return new Response(JSON.stringify({ ok: true, scanned: rows?.length ?? 0, changed }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});