/**
 * @file WorldVisitorMap.tsx
 * @description Marketing world map showing countries that have visited HaiEduTech,
 *              shaded by visit intensity, with a top-country bar chart and continent tally.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState, memo } from "react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { scaleLog } from "d3-scale";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe2, TrendingUp, Users, MapPin, GraduationCap } from "lucide-react";

// GeoJSON with ISO-3166-1 alpha-2 country codes. The previous TopoJSON source only
// exposed numeric IDs, so the database country codes could not match map shapes.
const GEO_URL = "https://cdn.jsdelivr.net/gh/nvkelso/natural-earth-vector@master/geojson/ne_110m_admin_0_countries.geojson";

type CountryRow = { country_code: string; country_name: string; visits: number };

const SESSION_FLAG = "hai-country-visit-logged";

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
  NL: "The Netherlands",
  TH: "Thailand",
  UA: "Ukraine",
  TW: "Taiwan",
  MY: "Malaysia",
  PH: "Philippines",
  ID: "Indonesia",
  IN: "India",
  CN: "China",
  NO: "Norway",
  DK: "Denmark",
  EE: "Estonia",
  PL: "Poland",
  ES: "Spain",
  IT: "Italy",
  CH: "Switzerland",
  AT: "Austria",
  BE: "Belgium",
  IE: "Ireland",
  NZ: "New Zealand",
  KH: "Cambodia",
  LA: "Laos",
  AE: "United Arab Emirates",
};

const COUNTRY_CENTERS: Record<string, [number, number]> = {
  AU: [134, -25],
  CA: [-106, 56],
  DE: [10, 51],
  FI: [26, 64],
  FR: [2, 46],
  GB: [-2, 54],
  JP: [138, 37],
  KR: [128, 36],
  NL: [5, 52],
  SG: [104, 1.3],
  US: [-98, 39],
  VN: [106, 16],
  TH: [101, 15],
  UA: [31, 49],
  TW: [121, 23.7],
  MY: [102, 4],
  PH: [122, 12],
  ID: [113, -2],
  IN: [79, 22],
  CN: [104, 35],
  NO: [9, 61],
  DK: [10, 56],
  EE: [26, 59],
  PL: [19, 52],
  ES: [-4, 40],
  IT: [12, 42],
  CH: [8, 47],
  AT: [14, 47.5],
  BE: [4.5, 50.5],
  IE: [-8, 53],
  NZ: [172, -41],
  KH: [105, 12.5],
  LA: [103, 18],
  AE: [54, 24],
};

// Simple continent lookup by ISO alpha-2 (top ~120 countries relevant to the audience).
const CONTINENT_BY_CODE: Record<string, string> = {
  VN: "Asia", CN: "Asia", JP: "Asia", KR: "Asia", TW: "Asia", HK: "Asia", TH: "Asia", ID: "Asia",
  MY: "Asia", SG: "Asia", PH: "Asia", IN: "Asia", PK: "Asia", BD: "Asia", LK: "Asia", NP: "Asia",
  KH: "Asia", LA: "Asia", MM: "Asia", MN: "Asia", KZ: "Asia", UZ: "Asia", AE: "Asia", SA: "Asia",
  IL: "Asia", TR: "Asia", IR: "Asia", IQ: "Asia", QA: "Asia", KW: "Asia", OM: "Asia", JO: "Asia",
  US: "Americas", CA: "Americas", MX: "Americas", BR: "Americas", AR: "Americas", CL: "Americas",
  CO: "Americas", PE: "Americas", VE: "Americas", CU: "Americas", DO: "Americas", CR: "Americas",
  PA: "Americas", UY: "Americas", EC: "Americas", BO: "Americas", PY: "Americas", GT: "Americas",
  GB: "Europe", IE: "Europe", FR: "Europe", DE: "Europe", ES: "Europe", PT: "Europe", IT: "Europe",
  NL: "Europe", BE: "Europe", LU: "Europe", CH: "Europe", AT: "Europe", SE: "Europe", NO: "Europe",
  DK: "Europe", FI: "Europe", IS: "Europe", PL: "Europe", CZ: "Europe", SK: "Europe", HU: "Europe",
  RO: "Europe", BG: "Europe", GR: "Europe", HR: "Europe", RS: "Europe", SI: "Europe", EE: "Europe",
  LV: "Europe", LT: "Europe", UA: "Europe", BY: "Europe", RU: "Europe", MD: "Europe", AL: "Europe",
  AU: "Oceania", NZ: "Oceania", FJ: "Oceania", PG: "Oceania",
  EG: "Africa", MA: "Africa", DZ: "Africa", TN: "Africa", NG: "Africa", KE: "Africa", ZA: "Africa",
  GH: "Africa", ET: "Africa", TZ: "Africa", UG: "Africa", SN: "Africa", CI: "Africa", CM: "Africa",
};

const CONTINENT_META: { key: string; emoji: string; vi: string; en: string; color: string }[] = [
  { key: "Asia", emoji: "🌏", vi: "Châu Á", en: "Asia", color: "#3b82f6" },
  { key: "Europe", emoji: "🏰", vi: "Châu Âu", en: "Europe", color: "#8b5cf6" },
  { key: "Americas", emoji: "🗽", vi: "Châu Mỹ", en: "Americas", color: "#10b981" },
  { key: "Oceania", emoji: "🏝️", vi: "Châu Đại Dương", en: "Oceania", color: "#f59e0b" },
  { key: "Africa", emoji: "🦁", vi: "Châu Phi", en: "Africa", color: "#ef4444" },
];

// Local and preview environments must never inflate the public counters.
function isTrackableHost() {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  if (host === "localhost" || host === "127.0.0.1" || host.endsWith(".local")) return false;
  if (host.includes("id-preview") || host.includes("lovableproject.com") || host.includes("sandbox")) return false;
  return true;
}

async function reportVisitorCountry() {
  try {
    if (!isTrackableHost()) return;
    if (sessionStorage.getItem(SESSION_FLAG)) return;
    // The backend detects the real country and counts one visit per visitor per day.
    const { data, error } = await supabase.functions.invoke("track-country-visit", { body: {} });
    if (!error && data?.success) sessionStorage.setItem(SESSION_FLAG, "1");
  } catch {
    // ignore
  }
}

const WorldVisitorMap = () => {
  const { t, lang } = useLanguage();
  const [rows, setRows] = useState<CountryRow[]>([]);
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [totalPageViews, setTotalPageViews] = useState<number>(0);
  const [hovered, setHovered] = useState<{ code: string; name: string; visits: number } | null>(null);


  const refreshData = async () => {
    const { data } = await supabase
      .from("country_visits" as never)
      .select("country_code,country_name,visits")
      .gt("visits", 0)
      .order("visits", { ascending: false })
      .limit(250);
    if (Array.isArray(data)) {
      const cleanRows = (data as unknown as CountryRow[])
        .map((row) => ({
          ...row,
          country_code: row.country_code.toUpperCase(),
          visits: Number(row.visits) || 0,
        }))
        .filter((row) => /^[A-Z]{2}$/.test(row.country_code) && row.visits > 0);
      setRows(cleanRows);
    }
  };

  useEffect(() => {
    let alive = true;
    (async () => {
      await refreshData();
      await reportVisitorCountry();
      if (alive) await refreshData();
      // Public aggregates: a single number each, no personal data exposed.
      const callRpc = (fn: string) =>
        (supabase.rpc as unknown as (name: string) => Promise<{ data: unknown; error: unknown }>).call(supabase, fn);
      const [studentRes, viewRes] = await Promise.all([
        callRpc("get_public_student_count"),
        callRpc("get_public_pageview_total"),
      ]);
      if (!alive) return;
      if (typeof studentRes.data === "number") setTotalStudents(studentRes.data);
      if (typeof viewRes.data === "number") setTotalPageViews(viewRes.data);
    })();
    return () => {
      alive = false;
    };
  }, []);


  const { byCode, maxVisits, totalCountries, totalVisits, top, continents } = useMemo(() => {
    const map = new Map<string, CountryRow>();
    let max = 0;
    let total = 0;
    const contTotals: Record<string, number> = {};
    for (const r of rows) {
      const code = r.country_code.toUpperCase();
      map.set(code, r);
      if (r.visits > max) max = r.visits;
      total += r.visits;
      const c = CONTINENT_BY_CODE[code];
      if (c) contTotals[c] = (contTotals[c] || 0) + r.visits;
    }
    const sorted = [...rows].sort((a, b) => b.visits - a.visits);
    return {
      byCode: map,
      maxVisits: max,
      totalCountries: map.size,
      totalVisits: total,
      top: sorted.slice(0, 10),
      continents: contTotals,
    };
  }, [rows]);

  const colorScale = useMemo(() => {
    const domainMax = Math.max(2, maxVisits);
    return scaleLog<string>()
      .domain([1, domainMax])
      .range(["#34d399", "#1d4ed8"])
      .clamp(true);
  }, [maxVisits]);

  const barData = useMemo(
    () => top.slice(0, 8).map((r) => ({ name: r.country_name, visits: r.visits, code: r.country_code })),
    [top]
  );

  const continentMax = Math.max(1, ...Object.values(continents));
  const mapMarkers = useMemo(
    () => top
      .map((row) => ({ ...row, center: COUNTRY_CENTERS[row.country_code.toUpperCase()] }))
      .filter((row): row is CountryRow & { center: [number, number] } => Boolean(row.center))
      .slice(0, 10),
    [top]
  );

  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-background via-primary/5 to-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
            <Globe2 className="w-3.5 h-3.5" />
            {t("Cộng đồng toàn cầu", "Global Community")}
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            {t("Học viên HaiEduTech ", "HaiEduTech Learners ")}
            <span className="text-gradient">{t("khắp thế giới", "Around the World")}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base text-muted-foreground">
            {t(
              "Bản đồ nhiệt các quốc gia đã truy cập HaiEduTech, tính từ ngày đầu. Màu càng đậm = càng nhiều khách.",
              "Heat map of every country that has visited HaiEduTech since day one. Darker shade = more visitors."
            )}
          </p>
        </div>

        {/* KPI strip */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6 max-w-6xl mx-auto">
          <div className="rounded-xl border border-border/60 bg-card/70 backdrop-blur-sm p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                {t("Quốc gia", "Countries")}
              </div>
              <div className="text-xl font-bold">{totalCountries}</div>
            </div>
          </div>
          <div className="rounded-xl border border-border/60 bg-card/70 backdrop-blur-sm p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/15 flex items-center justify-center">
              <Users className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                {t("Khách truy cập", "Visitors")}
              </div>
              <div className="text-xl font-bold">{totalVisits.toLocaleString()}</div>
            </div>
          </div>
          <div className="rounded-xl border border-border/60 bg-card/70 backdrop-blur-sm p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/15 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                {t("Tổng học viên", "Total students")}
              </div>
              <div className="text-xl font-bold">{totalStudents.toLocaleString()}</div>
            </div>
          </div>
          <div className="rounded-xl border border-border/60 bg-card/70 backdrop-blur-sm p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-500/15 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                {t("Lượt xem trang", "Page views")}
              </div>
              <div className="text-xl font-bold">{totalPageViews.toLocaleString()}</div>
            </div>
          </div>

          <div className="rounded-xl border border-border/60 bg-card/70 backdrop-blur-sm p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/15 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                {t("Quốc gia dẫn đầu", "Top country")}
              </div>
              <div className="text-sm font-bold truncate max-w-[140px]">
                {top[0]?.country_name || "—"}
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border/60 bg-card/70 backdrop-blur-sm p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-violet-500/15 flex items-center justify-center">
              <Globe2 className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                {t("Châu lục phủ sóng", "Continents reached")}
              </div>
              <div className="text-xl font-bold">{Object.keys(continents).length} / 5</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
          <div className="relative rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-2 sm:p-4 shadow-sm overflow-hidden">
            <ComposableMap
              projectionConfig={{ scale: 155 }}
              width={980}
              height={500}
              style={{ width: "100%", height: "auto" }}
            >
              <ZoomableGroup center={[10, 10]} zoom={1} minZoom={1} maxZoom={4}>
                <Geographies geography={GEO_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const props = geo.properties as Record<string, unknown>;
                      const code =
                        (props.ISO_A2 as string) ||
                        (props.iso_a2 as string) ||
                        (props["ISO3166-1-Alpha-2"] as string) ||
                        (props["Alpha-2"] as string) ||
                        "";
                      const normalizedCode = code.toUpperCase();
                      const name = (props.NAME as string) || (props.ADMIN as string) || (props.name as string) || "";
                      const row = normalizedCode ? byCode.get(normalizedCode) : undefined;
                      const fill = row ? (colorScale(Math.max(1, row.visits)) as string) : "hsl(var(--muted) / 0.55)";
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onMouseEnter={() =>
                            setHovered({
                              code: normalizedCode || "?",
                              name: row?.country_name || name || code || "Unknown",
                              visits: row?.visits ?? 0,
                            })
                          }
                          onMouseLeave={() => setHovered(null)}
                          style={{
                            default: {
                              fill,
                              stroke: row ? "hsl(var(--background))" : "hsl(var(--border) / 0.55)",
                              strokeWidth: row ? 0.75 : 0.35,
                              outline: "none",
                              transition: "fill 200ms ease, stroke 200ms ease, filter 200ms ease",
                              filter: row ? "drop-shadow(0 0 6px rgba(16, 185, 129, 0.45))" : "none",
                            },
                            hover: {
                              fill: row ? "#10b981" : "hsl(var(--muted-foreground) / 0.45)",
                              outline: "none",
                              cursor: "pointer",
                            },
                            pressed: { fill: row ? "#059669" : "hsl(var(--muted-foreground) / 0.45)", outline: "none" },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
                {mapMarkers.map((row, index) => {
                  const radius = Math.max(4, Math.min(15, 4 + (row.visits / Math.max(1, maxVisits)) * 11));
                  return (
                    <Marker key={row.country_code} coordinates={row.center}>
                      <circle
                        r={radius + 4}
                        fill="rgba(16, 185, 129, 0.18)"
                        stroke="rgba(16, 185, 129, 0.35)"
                        strokeWidth={1}
                      />
                      <circle
                        r={radius}
                        fill={index === 0 ? "#1d4ed8" : "#10b981"}
                        stroke="hsl(var(--background))"
                        strokeWidth={1.6}
                      />
                    </Marker>
                  );
                })}
              </ZoomableGroup>
            </ComposableMap>

            {/* Tooltip */}
            <div className="pointer-events-none absolute top-3 left-3 bg-background/90 backdrop-blur border border-border rounded-lg px-3 py-2 shadow text-xs sm:text-sm min-w-[160px]">
              {hovered ? (
                <>
                  <div className="font-semibold flex items-center gap-2">
                    <span className="text-[10px] font-mono bg-muted px-1.5 py-0.5 rounded">
                      {hovered.code}
                    </span>
                    {hovered.name}
                  </div>
                  <div className="text-muted-foreground mt-0.5">
                    {hovered.visits > 0
                      ? t(`${hovered.visits} lượt truy cập`, `${hovered.visits} visits`)
                      : t("Chưa có lượt truy cập", "No visits yet")}
                  </div>
                </>
              ) : (
                <div className="text-muted-foreground">
                  {t("Di chuột lên một quốc gia", "Hover over a country")}
                </div>
              )}
            </div>

            {/* Legend */}
            <div className="absolute bottom-3 right-3 bg-background/90 backdrop-blur border border-border rounded-lg px-3 py-2 shadow flex items-center gap-2 text-[11px] sm:text-xs">
              <span className="text-muted-foreground">{t("Ít", "Low")}</span>
              <div
                className="h-2 w-24 rounded"
                style={{
                  background: "linear-gradient(to right, #34d399, #10b981, #3b82f6, #1d4ed8)",
                }}
              />
              <span className="text-muted-foreground">{t("Nhiều", "High")}</span>
            </div>

            {totalCountries === 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-background/85 backdrop-blur border border-border rounded-xl px-5 py-4 text-center max-w-xs">
                  <div className="text-2xl mb-1">🌍</div>
                  <div className="text-sm font-semibold">
                    {t("Chưa có dữ liệu truy cập", "No visit data yet")}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {t(
                      "Bạn sẽ là điểm sáng đầu tiên trên bản đồ!",
                      "You'll be the first pin on the map!"
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-4">
            {/* Top 10 leaderboard */}
            <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-5 shadow-sm">
              <div className="text-sm font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                {t("Top 10 quốc gia", "Top 10 countries")}
              </div>
              {top.length === 0 ? (
                <div className="text-xs text-muted-foreground">
                  {t("Đang thu thập dữ liệu…", "Collecting data…")}
                </div>
              ) : (
                <ol className="space-y-2">
                  {top.map((r, i) => {
                    const pct = maxVisits > 0 ? Math.max(6, (r.visits / maxVisits) * 100) : 0;
                    return (
                      <li key={r.country_code} className="text-sm">
                        <div className="flex items-center justify-between mb-1">
                          <span className="flex items-center gap-2 min-w-0">
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/15 text-primary text-[11px] font-bold flex-shrink-0">
                              {i + 1}
                            </span>
                            <span className="font-medium truncate">{r.country_name}</span>
                          </span>
                          <span className="text-muted-foreground text-xs flex-shrink-0 ml-2">
                            {r.visits}
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-emerald-500 transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ol>
              )}
            </div>

            {/* Continent breakdown */}
            <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-5 shadow-sm">
              <div className="text-sm font-semibold mb-3">
                {t("Phân bố theo châu lục", "Continent breakdown")}
              </div>
              <div className="space-y-2">
                {CONTINENT_META.map((c) => {
                  const v = continents[c.key] || 0;
                  const pct = continentMax > 0 ? (v / continentMax) * 100 : 0;
                  return (
                    <div key={c.key} className="text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="flex items-center gap-1.5">
                          <span>{c.emoji}</span>
                          <span className="font-medium">
                            {lang === "vi" ? c.vi : c.en}
                          </span>
                        </span>
                        <span className="text-muted-foreground">{v}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${pct}%`, background: c.color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>

        {/* Bar chart of top 8 for extra visualization */}
        {barData.length > 0 && (
          <div className="mt-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-5 shadow-sm">
            <div className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-primary" />
              {t("Biểu đồ lượt truy cập theo quốc gia", "Visits per country")}
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={barData} margin={{ top: 5, right: 12, bottom: 5, left: 0 }}>
                <XAxis
                  dataKey="code"
                  tick={{ fontSize: 11 }}
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  formatter={(v: number, _n, p) => [
                    `${v} ${t("lượt", "visits")}`,
                    (p?.payload as { name?: string })?.name || "",
                  ]}
                />
                <Bar dataKey="visits" radius={[6, 6, 0, 0]}>
                  {barData.map((_, i) => (
                    <Cell key={i} fill={i === 0 ? "#1d4ed8" : "#3b82f6"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(WorldVisitorMap);
