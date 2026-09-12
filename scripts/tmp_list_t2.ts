import { ieltsSampleEssays } from "../src/data/ieltsSampleEssays";
const t2 = (ieltsSampleEssays as any[]).filter(e=>e.taskType===2);
console.log("COUNT", t2.length);
for (const e of t2) console.log(JSON.stringify({id:e.id, topic:e.topic, prompt:e.prompt}));
