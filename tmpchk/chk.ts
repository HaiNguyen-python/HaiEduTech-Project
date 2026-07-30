import { sampleEssays } from "../src/data/ieltsSampleEssays";
const t1 = (sampleEssays as any[]).filter(e=>e.taskType===1);
console.log("task1 total", t1.length);
const miss = t1.filter(e=>!e.chartConfig);
console.log("missing chartConfig", miss.length);
miss.forEach(e=>console.log(e.id, e.chartType, e.topic));
