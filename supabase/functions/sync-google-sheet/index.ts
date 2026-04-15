import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SHEET_ID = "1BpU2nN9_yqFHjXOS7hlFOpXv9-4NrRZNqbvnVzrBWBU";

function parseVndAmount(raw: string): number {
  if (!raw) return 0;
  // "7.980.000 đ" → 7980000
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
      result.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Auth check — teacher/admin only
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const token = authHeader.replace("Bearer ", "");
    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userError } = await supabaseAuth.auth.getUser(token);
    if (userError || !userData?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check role
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);
    const { data: roleCheck } = await supabaseAdmin.rpc("has_role", {
      _user_id: userData.user.id, _role: "teacher",
    });
    if (!roleCheck) {
      const { data: adminCheck } = await supabaseAdmin.rpc("has_role", {
        _user_id: userData.user.id, _role: "admin",
      });
      if (!adminCheck) {
        return new Response(JSON.stringify({ error: "Forbidden" }), {
          status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // Fetch CSV from Google Sheets
    const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;
    const csvRes = await fetch(csvUrl);
    if (!csvRes.ok) {
      throw new Error(`Failed to fetch sheet: ${csvRes.status}`);
    }
    const csvText = await csvRes.text();
    const lines = csvText.split("\n").filter((l) => l.trim());

    // Parse rows — skip header (line 0) and summary rows
    // Columns: 0=STT, 1=Name, 2=DOB, 3=Course, 4=Timeline, 5=blank, 6=Total2022, 7=blank, 8=KPI, 9=Amount2024, 10=Amount2025, 11=Amount2026, 12=KPI2025
    const records: Array<{
      student_name: string;
      course: string;
      payment_year: number;
      amount: number;
      status: string;
      kpi_met: boolean;
      notes: string | null;
    }> = [];

    for (let i = 1; i < lines.length; i++) {
      const cols = parseCSVLine(lines[i]);
      const stt = cols[0]?.trim();
      const name = cols[1]?.trim();

      // Skip empty/summary rows
      if (!stt || !name || name === "" || stt === "") continue;
      // Skip if STT is not a number (summary row)
      if (isNaN(parseInt(stt))) continue;

      const course = cols[3]?.trim() || "IELTS FOUNDATION";
      const timeline = cols[4]?.trim() || "";
      const kpi2025 = cols[12]?.trim()?.toLowerCase() === "yes";

      // Amount columns: 9=2024, 10=2025, 11=2026
      const yearAmounts: [number, string][] = [
        [2024, cols[9] || ""],
        [2025, cols[10] || ""],
        [2026, cols[11] || ""],
      ];

      for (const [year, rawAmount] of yearAmounts) {
        const amount = parseVndAmount(rawAmount);
        if (amount > 0) {
          records.push({
            student_name: name,
            course: course,
            payment_year: year,
            amount,
            status: "paid",
            kpi_met: kpi2025,
            notes: timeline ? `Schedule: ${timeline}` : null,
          });
        }
      }
    }

    // Upsert into revenue_logs — delete existing sheet-synced data first, then insert fresh
    // First get existing records to compare
    const { data: existing } = await supabaseAdmin
      .from("revenue_logs")
      .select("id, student_name, course, payment_year, amount");

    // Build a lookup key for existing records
    const existingMap = new Map<string, { id: string; amount: number }>();
    (existing || []).forEach((r: any) => {
      const key = `${r.student_name}|${r.course}|${r.payment_year}`;
      existingMap.set(key, { id: r.id, amount: Number(r.amount) });
    });

    let inserted = 0;
    let updated = 0;
    let skipped = 0;

    for (const rec of records) {
      const key = `${rec.student_name}|${rec.course}|${rec.payment_year}`;
      const existingRec = existingMap.get(key);

      if (existingRec) {
        // Update if amount changed
        if (existingRec.amount !== rec.amount) {
          await supabaseAdmin
            .from("revenue_logs")
            .update({ amount: rec.amount, kpi_met: rec.kpi_met, notes: rec.notes })
            .eq("id", existingRec.id);
          updated++;
        } else {
          skipped++;
        }
      } else {
        // Insert new
        await supabaseAdmin.from("revenue_logs").insert(rec);
        inserted++;
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        total_rows: records.length,
        inserted,
        updated,
        skipped,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("sync-google-sheet error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
