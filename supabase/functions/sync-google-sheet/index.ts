import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SHEET_ID = "1BpU2nN9_yqFHjXOS7hlFOpXv9-4NrRZNqbvnVzrBWBU";

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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Auth check
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

    // Fetch FULL CSV using export endpoint (not gviz which filters)
    const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`;
    const csvRes = await fetch(csvUrl);
    if (!csvRes.ok) {
      throw new Error(`Failed to fetch sheet: ${csvRes.status}`);
    }
    const csvText = await csvRes.text();
    const lines = csvText.split("\n").filter((l) => l.trim());

    // Header: STT, Họ & Tên, Ngày sinh, Chương trình học, Thời gian,
    //         Học phí 2022, Tổng HP 2022, Học phí 2023, KPI,
    //         Học phí 2024, Học phí 2025, Học phí 2026, KPI 2025, ...
    // Columns: 0=STT, 1=Name, 2=DOB, 3=Course, 4=Timeline,
    //          5=HP2022, 6=TotalHP2022, 7=HP2023, 8=KPI,
    //          9=HP2024, 10=HP2025, 11=HP2026, 12=KPI2025

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
      const stt = cols[0] || "";
      const name = cols[1] || "";

      // Skip empty/summary rows
      if (!name || name === "") continue;
      // STT must be a number (skip "Tổng:", etc.)
      if (!stt || isNaN(parseInt(stt))) continue;

      const course = cols[3] || "IELTS FOUNDATION";
      const timeline = cols[4] || "";
      const kpi2025Str = (cols[12] || "").toLowerCase();
      const kpiMet = kpi2025Str === "yes";

      // Year-amount mappings from sheet columns
      const yearAmounts: [number, string][] = [
        [2022, cols[5] || ""],   // Học phí đã đóng trong năm 2022 (col 5)
        [2023, cols[7] || ""],   // HP 2023 (col 7)
        [2024, cols[9] || ""],   // HP 2024 (col 9)
        [2025, cols[10] || ""],  // HP 2025 (col 10)
        [2026, cols[11] || ""],  // HP 2026 (col 11)
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

    // Strategy: Delete ALL existing revenue_logs, then re-insert fresh data from sheet
    await supabaseAdmin
      .from("revenue_logs")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");

    // 3. Insert all fresh records from sheet
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
