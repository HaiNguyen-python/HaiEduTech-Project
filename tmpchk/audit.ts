import { sampleEssays } from "../src/data/ieltsSampleEssays";
const t1 = (sampleEssays as any[]).filter(e=>e.taskType===1);
for (const e of t1) {
  const c = e.chartConfig; const probs: string[] = [];
  const years = Array.from(new Set((e.prompt.match(/\b(19|20)\d{2}\b/g)||[])));
  if (!c) { console.log(e.id, "NO CONFIG"); continue; }
  if (c.type==="line"||c.type==="bar") {
    if (!c.yKeys?.length) probs.push("no yKeys");
    else { const k=Object.keys(c.data?.[0]||{}); c.yKeys.forEach((y:string)=>{ if(!k.includes(y)) probs.push("yKey missing in data: "+y)}); }
    if (!c.xKey || !Object.keys(c.data?.[0]||{}).includes(c.xKey)) probs.push("bad xKey "+c.xKey);
    if (c.type==="bar" && years.length>1 && (c.yKeys||[]).length<2) probs.push("prompt has years "+years.join("/")+" but 1 series");
  }
  if (c.type==="pie") {
    if(!c.data?.length) probs.push("no pie data");
    if (years.length>1 && !c.data2) probs.push("prompt years "+years.join("/")+" but single pie");
    const k=Object.keys(c.data?.[0]||{});
    if(!k.includes(c.pieNameKey||"name")) probs.push("bad pieNameKey");
    if(!k.includes(c.pieValueKey||"value")) probs.push("bad pieValueKey");
  }
  if (c.type==="table" && (!c.columns?.length || !c.rows?.length)) probs.push("empty table");
  if (c.type==="process" && !c.stages?.length) probs.push("no stages");
  if (c.type==="map" && !c.mapLayouts?.length && !c.stages?.length) probs.push("no map layouts");
  if (c.type==="mixed" && (!c.barKeys?.length)) probs.push("no barKeys");
  if (probs.length) console.log(e.id, "|", e.chartType, "=>", probs.join("; "));
}
