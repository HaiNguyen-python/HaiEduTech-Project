import { sampleEssays } from "../src/data/ieltsSampleEssays";
const t2 = sampleEssays.filter(e=>e.taskType===2);
console.log("COUNT", t2.length, "TOTAL", sampleEssays.length);
for (const e of t2) console.log(JSON.stringify({id:e.id, topic:e.topic, prompt:e.prompt}));
