/**
 * @file WorldVisitorMap.tsx
 * @description Marketing world map showing countries that have visited HaiEduTech,
 *              shaded by visit intensity. Tracks the current visitor's country once
 *              per browser session via a public RPC.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useEffect, useMemo, useState, memo } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { scaleLog } from "d3-scale";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe2 } from "lucide-react";

// TopoJSON of world countries (ISO-3166-1 alpha-2 in `properties.iso_a2`)
const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

type CountryRow = { country_code: string; country_name: string; visits: number };

const SESSION_FLAG = "hai-country-visit-logged";

async function reportVisitorCountry() {
  try {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_FLAG)) return;
    // Free, keyless IP geolocation. Fails silently if blocked.
    const res = await fetch("https://ipapi.co/json/", { cache: "no-store" });
    if (!res.ok) return;
    const data = await res.json();
    const code: string | undefined = data?.country_code;
    const name: string | undefined = data?.country_name;
    if (!code || code.length !== 2) return;
    sessionStorage.setItem(SESSION_FLAG, "1");
    await supabase.rpc("increment_country_visit" as never, { _code: code, _name: name || code } as never);
  } catch {
    // ignore
  }
}

const WorldVisitorMap = () => {
  const { t } = useLanguage();
  const [rows, setRows] = useState<CountryRow[]>([]);
  const [hovered, setHovered] = useState<{ code: string; name: string; visits: number } | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data } = await supabase.from("country_visits" as never).select("country_code,country_name,visits");
      if (alive && Array.isArray(data)) setRows(data as unknown as CountryRow[]);
      reportVisitorCountry();
    })();
    return () => {
      alive = false;
    };
  }, []);

  const { byCode, maxVisits, totalCountries, totalVisits } = useMemo(() => {
    const map = new Map<string, CountryRow>();
    let max = 0;
    let total = 0;
    for (const r of rows) {
      map.set(r.country_code.toUpperCase(), r);
      if (r.visits > max) max = r.visits;
      total += r.visits;
    }
    return { byCode: map, maxVisits: max, totalCountries: map.size, totalVisits: total };
  }, [rows]);

  // Log scale: darker for high-visit countries, light for low.
  const colorScale = useMemo(() => {
    const domainMax = Math.max(2, maxVisits);
    return scaleLog<string>()
      .domain([1, domainMax])
      .range(["#bfdbfe", "#1d4ed8"]) // light blue -> deep royal blue
      .clamp(true);
  }, [maxVisits]);

  const top = useMemo(() => {
    return [...rows].sort((a, b) => b.visits - a.visits).slice(0, 5);
  }, [rows]);

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
              "Bản đồ nhiệt các quốc gia đã truy cập HaiEduTech. Màu càng đậm, lượt truy cập càng nhiều.",
              "Live heat map of countries that have visited HaiEduTech. Darker shades = more visits."
            )}
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_260px] gap-6 items-start">
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
                        (props.iso_a2 as string) ||
                        (props.ISO_A2 as string) ||
                        (props["Alpha-2"] as string) ||
                        "";
                      const name = (props.name as string) || (props.NAME as string) || "";
                      const row = code ? byCode.get(code.toUpperCase()) : undefined;
                      const fill = row ? (colorScale(Math.max(1, row.visits)) as string) : "hsl(var(--muted))";
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onMouseEnter={() =>
                            setHovered({
                              code: code || "?",
                              name: row?.country_name || name || code || "Unknown",
                              visits: row?.visits ?? 0,
                            })
                          }
                          onMouseLeave={() => setHovered(null)}
                          style={{
                            default: {
                              fill,
                              stroke: "hsl(var(--background))",
                              strokeWidth: 0.4,
                              outline: "none",
                              transition: "fill 200ms ease",
                            },
                            hover: {
                              fill: row ? "#0f172a" : "hsl(var(--muted-foreground) / 0.5)",
                              outline: "none",
                              cursor: "pointer",
                            },
                            pressed: { fill: "#0f172a", outline: "none" },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>

            {/* Tooltip */}
            <div className="pointer-events-none absolute top-3 left-3 bg-background/90 backdrop-blur border border-border rounded-lg px-3 py-2 shadow text-xs sm:text-sm min-w-[140px]">
              {hovered ? (
                <>
                  <div className="font-semibold">{hovered.name}</div>
                  <div className="text-muted-foreground">
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
                  background: "linear-gradient(to right, #bfdbfe, #60a5fa, #2563eb, #1d4ed8)",
                }}
              />
              <span className="text-muted-foreground">{t("Nhiều", "High")}</span>
            </div>
          </div>

          <aside className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-5 shadow-sm">
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="rounded-xl bg-primary/10 p-3">
                <div className="text-xs text-muted-foreground">{t("Quốc gia", "Countries")}</div>
                <div className="text-2xl font-bold text-primary">{totalCountries}</div>
              </div>
              <div className="rounded-xl bg-emerald-500/10 p-3">
                <div className="text-xs text-muted-foreground">{t("Lượt truy cập", "Visits")}</div>
                <div className="text-2xl font-bold text-emerald-600">{totalVisits}</div>
              </div>
            </div>
            <div className="text-sm font-semibold mb-2">
              {t("Top quốc gia quan tâm", "Top interested countries")}
            </div>
            {top.length === 0 ? (
              <div className="text-xs text-muted-foreground">
                {t("Đang thu thập dữ liệu…", "Collecting data…")}
              </div>
            ) : (
              <ol className="space-y-2">
                {top.map((r, i) => (
                  <li key={r.country_code} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/15 text-primary text-[11px] font-bold">
                        {i + 1}
                      </span>
                      <span className="font-medium">{r.country_name}</span>
                    </span>
                    <span className="text-muted-foreground text-xs">{r.visits}</span>
                  </li>
                ))}
              </ol>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
};

export default memo(WorldVisitorMap);
