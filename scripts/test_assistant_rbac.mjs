#!/usr/bin/env node
/**
 * Automated RLS verification for the Assistant (CTV) RBAC system.
 *
 * Simulates RLS for different users by setting `request.jwt.claims` and the
 * `authenticated` role inside a single transaction (the canonical pattern for
 * testing Supabase RLS). Requires PG* env vars (managed by Lovable Cloud).
 *
 * Run:  node scripts/test_assistant_rbac.mjs
 */
import { execSync } from "node:child_process";

const TEACHER_ID = "e9f302be-c5c5-47ad-a57b-2ba323ea8947"; // Nguyen Hai (teacher)
const STUDENT_ID = "eb048a3c-b074-4927-b7c3-95edbd59a70d"; // Mai Do (no super_admin)
const TARGET_ID  = "88e4ae19-65ce-4cb5-b89e-f9452b7d5d19"; // CTV candidate

const psql = (sql) => {
  try {
    const out = execSync(`psql -X -A -t -v ON_ERROR_STOP=1`, {
      input: sql,
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
    });
    return { ok: true, out: out.trim() };
  } catch (e) {
    return { ok: false, err: (e.stderr || e.message || "").toString().trim() };
  }
};

// Run a block as a given authenticated user via a single transaction.
const asUser = (uid, sql) => psql(`
BEGIN;
SET LOCAL role authenticated;
SET LOCAL request.jwt.claims TO '{"sub":"${uid}","role":"authenticated"}';
${sql}
ROLLBACK;
`);

let pass = 0, fail = 0;
const check = (name, cond, detail = "") => {
  if (cond) { pass++; console.log(`  ✅ ${name}`); }
  else      { fail++; console.log(`  ❌ ${name}${detail ? "  — " + detail : ""}`); }
};

console.log("\n🧪 Assistant RBAC — RLS verification\n");

// 1. Teacher (super_admin) can appoint CTV
console.log("[1] Teacher appoints CTV");
{
  const r = asUser(TEACHER_ID,
    `INSERT INTO public.user_roles(user_id, role) VALUES ('${TARGET_ID}', 'assistant') RETURNING id;`);
  check("INSERT user_roles assistant succeeds", r.ok && r.out.length > 0, r.err);
}

// 2. Teacher can revoke CTV
console.log("\n[2] Teacher revokes CTV");
{
  const r = asUser(TEACHER_ID, `
    INSERT INTO public.user_roles(user_id, role) VALUES ('${TARGET_ID}', 'assistant');
    DELETE FROM public.user_roles WHERE user_id = '${TARGET_ID}' AND role = 'assistant';
    SELECT 'deleted';
  `);
  check("DELETE user_roles assistant succeeds", r.ok && r.out.includes("deleted"), r.err);
}

// 3. Teacher can read all user_roles, time_logs, daily_reports, assistant_bonuses
console.log("\n[3] Teacher reads CTV data");
for (const table of ["user_roles", "time_logs", "daily_reports", "assistant_bonuses"]) {
  const r = asUser(TEACHER_ID, `SELECT count(*) FROM public.${table};`);
  check(`SELECT public.${table}`, r.ok && /^\d+$/.test(r.out), r.err);
}

// 4. Teacher can grant a bonus
console.log("\n[4] Teacher grants bonus");
{
  const r = asUser(TEACHER_ID,
    `INSERT INTO public.assistant_bonuses(user_id, amount, reason, granted_by)
     VALUES ('${TARGET_ID}', 100000, 'RLS test', '${TEACHER_ID}') RETURNING id;`);
  check("INSERT assistant_bonuses succeeds", r.ok && r.out.length > 0, r.err);
}

// 5. Plain student cannot appoint CTV
console.log("\n[5] Student is blocked from appointing CTV");
{
  const r = asUser(STUDENT_ID,
    `INSERT INTO public.user_roles(user_id, role) VALUES ('${TARGET_ID}', 'assistant');`);
  check("INSERT user_roles fails for student",
    !r.ok && /row-level security|permission denied/i.test(r.err), r.err || "unexpectedly succeeded");
}

// 6. Plain student cannot read another user's time_logs / bonuses
console.log("\n[6] Student cannot read other users' CTV data");
{
  const r = asUser(STUDENT_ID,
    `SELECT count(*) FROM public.time_logs WHERE user_id = '${TARGET_ID}';`);
  check("time_logs scoped — returns 0 for non-owner", r.ok && r.out === "0", r.err);
}
{
  const r = asUser(STUDENT_ID,
    `SELECT count(*) FROM public.assistant_bonuses WHERE user_id = '${TARGET_ID}';`);
  check("assistant_bonuses scoped — returns 0 for non-owner", r.ok && r.out === "0", r.err);
}

// 7. Student cannot grant bonus
console.log("\n[7] Student is blocked from granting bonuses");
{
  const r = asUser(STUDENT_ID,
    `INSERT INTO public.assistant_bonuses(user_id, amount, reason, granted_by)
     VALUES ('${TARGET_ID}', 50000, 'hack', '${STUDENT_ID}');`);
  check("INSERT assistant_bonuses fails for student",
    !r.ok && /row-level security|permission denied/i.test(r.err), r.err || "unexpectedly succeeded");
}

console.log(`\n📊 Result: ${pass} passed, ${fail} failed\n`);
process.exit(fail === 0 ? 0 : 1);
