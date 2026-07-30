import { sampleEssays } from "../src/data/ieltsSampleEssays";
const t1 = (sampleEssays as any[]).filter(e=>e.taskType===1);
for (const e of t1) {
  const c = e.chartConfig;
  const keys = c?.data?.[0] ? Object.keys(c.data[0]) : [];
  console.log(`${e.id} | ${e.chartType} | cfgtype=${c?.type} | rows=${c?.data?.length} | keys=${keys.join(",")} | series=${(c?.series||[]).map((s:any)=>s.key||s).join(",")}`);
}
