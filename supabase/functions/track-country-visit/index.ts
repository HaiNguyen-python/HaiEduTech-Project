import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type CountryInfo = {
  code: string;
  name: string;
};

const COUNTRY_NAMES: Record<string, string> = {
  VN: "Vietnam",
  US: "United States",
  GB: "United Kingdom",
  FI: "Finland",
  SE: "Sweden",
  DE: "Germany",
  FR: "France",
  AU: "Australia",
  CA: "Canada",
  SG: "Singapore",
  JP: "Japan",
  KR: "South Korea",
};

function normalizeCountry(code: unknown, name?: unknown): CountryInfo | null {
  if (typeof code !== "string") return null;
  const normalized = code.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(normalized) || normalized === "XX") return null;
  const displayName = typeof name === "string" && name.trim()
    ? name.trim()
    : COUNTRY_NAMES[normalized] || normalized;
  return { code: normalized, name: displayName };
}

function getClientIp(req: Request): string | null {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const firstIp = forwardedFor.split(",")[0]?.trim();
    if (firstIp) return firstIp;
  }
  return req.headers.get("cf-connecting-ip") || req.headers.get("x-real-ip");
}

async function detectCountry(req: Request): Promise<CountryInfo | null> {
  const headerCountry = normalizeCountry(
    req.headers.get("cf-ipcountry") || req.headers.get("x-vercel-ip-country"),
  );
  if (headerCountry) return headerCountry;

  const clientIp = getClientIp(req);
  const lookupTargets = clientIp
    ? [
        `https://ipapi.co/${encodeURIComponent(clientIp)}/json/`,
        `https://ipwho.is/${encodeURIComponent(clientIp)}`,
        `https://api.country.is/${encodeURIComponent(clientIp)}`,
      ]
    : ["https://ipapi.co/json/", "https://ipwho.is/", "https://api.country.is/"];

  for (const url of lookupTargets) {
    try {
      const response = await fetch(url, {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(2500),
      });
      if (!response.ok) continue;
      const data = await response.json();
      const country = normalizeCountry(
        data.country_code || data.countryCode || data.country,
        data.country_name || data.countryName || data.country,
      );
      if (country) return country;
    } catch {
      // Try the next provider.
    }
  }

  return null;
}

const BOT_UA_REGEX = /bot|crawler|spider|crawling|slurp|bingpreview|facebookexternalhit|embedly|quora|slackbot|vkshare|w3c_validator|redditbot|applebot|whatsapp|telegrambot|pinterest|semrush|ahrefs|mj12bot|dotbot|petalbot|gptbot|chatgpt|claudebot|anthropic|perplexity|ccbot|dataforseo|headlesschrome|phantomjs|puppeteer|playwright|lighthouse|python-requests|curl\/|wget\//i;

function isLikelyBot(req: Request): boolean {
  const ua = (req.headers.get("user-agent") || "").toLowerCase();
  if (!ua) return true;
  return BOT_UA_REGEX.test(ua);
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (isLikelyBot(req)) {
      return new Response(
        JSON.stringify({ success: false, reason: "bot_filtered" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    const country = await detectCountry(req);
    if (!country) {
      return new Response(
        JSON.stringify({ success: false, reason: "country_not_detected" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }


    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceKey) throw new Error("Backend credentials are not configured");

    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { error } = await supabase.rpc("increment_country_visit", {
      _code: country.code,
      _name: country.name,
    });
    if (error) throw error;

    return new Response(
      JSON.stringify({ success: true, countryCode: country.code, countryName: country.name }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});