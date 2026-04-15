import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SHEET_ID = "1BpU2nN9_yqFHjXOS7hlFOpXv9-4NrRZNqbvnVzrBWBU";
const SUMMARY_SHEET_NAME = "Tổng thu - chi";

interface RevenueRecord {
  student_name: string;
  course: string;
  payment_year: number;
  amount: number;
  status: string;
  kpi_met: boolean;
  notes: string | null;
}

interface YearlyIncomeSummary {
  year: number;
  amount: number;
}

function parseVndAmount(raw: string): number {
  if (!raw) return 0;
  const cleaned = raw.replace(/[^\d]/g, "");
  return cleaned ? parseInt(cleaned, 10) : 0;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }

  result.push(current.trim());
  return result;
}

function parseYearFromSectionLabel(label: string): number | null {
  const match = label.match(/năm\s*(\d{4})/i);
  if (!match) return null;
  const year = parseInt(match[1], 10);
  return Number.isFinite(year) ? year : null;
}

function parseYearlyIncomeSummary(csvText: string): YearlyIncomeSummary[] {
  const lines = csvText.split(/\r?\n/).filter((line) => line.trim());
  const summary = new Map<number, number>();
  let currentYear: number | null = null;

  for (const line of lines) {
    const cols = parseCSVLine(line);
    const label = (cols[0] || "").trim();
    const amountText = (cols[1] || "").trim();

    const detectedYear = parseYearFromSectionLabel(label);
    if (detectedYear) {
      currentYear = detectedYear;
      continue;
    }

    if (!currentYear) continue;

    if (label.toLowerCase() === "tổng") {
      const amount = parseVndAmount(amountText);
      if (amount > 0) {
        summary.set(currentYear, amount);
      }
    }
  }

  return Array.from(summary.entries())
    .map(([year, amount]) => ({ year, amount }))
    .sort((a, b) => a.year - b.year);
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    let summaryOnly = false;
    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      try {
        const body = await req.json();
        summaryOnly = body?.summaryOnly === true;
      } catch {
        summaryOnly = false;
      }
    }

    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const token = authHeader.replace("Bearer ", "");
    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: userData, error: userError } = await supabaseAuth.auth.getUser(token);
    if (userError || !userData?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);
    const { data: roleCheck } = await supabaseAdmin.rpc("has_role", {
      _user_id: userData.user.id,
      _role: "teacher",
    });

    if (!roleCheck) {
      const { data: adminCheck } = await supabaseAdmin.rpc("has_role", {
        _user_id: userData.user.id,
        _role: "admin",
      });

      if (!adminCheck) {
        return new Response(JSON.stringify({ error: "Forbidden" }), {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const summaryCsvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(SUMMARY_SHEET_NAME)}`;
    const summaryRes = await fetch(summaryCsvUrl);
    if (!summaryRes.ok) {
      throw new Error(`Failed to fetch summary sheet: ${summaryRes.status}`);
    }

    const yearlyIncome = parseYearlyIncomeSummary(await summaryRes.text());

    if (summaryOnly) {
      return new Response(
        JSON.stringify({ success: true, yearly_income: yearlyIncome }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`;
    const csvRes = await fetch(csvUrl);
    if (!csvRes.ok) {
      throw new Error(`Failed to fetch sheet: ${csvRes.status}`);
    }

    const csvText = await csvRes.text();
    const lines = csvText.split(/\r?\n/).filter((line) => line.trim());

    const records: RevenueRecord[] = [];

    for (let i = 1; i < lines.length; i++) {
      const cols = parseCSVLine(lines[i]);
      const stt = cols[0] || "";
      const name = cols[1] || "";

      if (!name) continue;
      if (!stt || Number.isNaN(parseInt(stt, 10))) continue;

      const course = cols[3] || "IELTS FOUNDATION";
      const timeline = cols[4] || "";
      const kpi2025Str = (cols[12] || "").toLowerCase();
      const kpiMet = kpi2025Str === "yes";

      const yearAmounts: [number, string][] = [
        [2022, cols[5] || ""],
        [2023, cols[7] || ""],
        [2024, cols[9] || ""],
        [2025, cols[10] || ""],
        [2026, cols[11] || ""],
      ];

      for (const [year, rawAmount] of yearAmounts) {
        const amount = parseVndAmount(rawAmount);
        if (amount > 0) {
          records.push({
            student_name: name,
            course,
            payment_year: year,
            amount,
            status: "paid",
            kpi_met: kpiMet,
            notes: timeline ? `Schedule: ${timeline}` : null,
          });
        }
      }
    }

    await supabaseAdmin
      .from("revenue_logs")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");

    let inserted = 0;
    const batchSize = 50;
    for (let i = 0; i < records.length; i += batchSize) {
      const batch = records.slice(i, i + batchSize);
      const { error } = await supabaseAdmin.from("revenue_logs").insert(batch);
      if (error) {
        console.error("Insert error:", error);
      } else {
        inserted += batch.length;
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        total_sheet_rows: records.length,
        inserted,
        yearly_income: yearlyIncome,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("sync-google-sheet error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});