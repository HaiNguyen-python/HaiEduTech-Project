import { speakingPracticeData } from "../src/data/speakingPracticeData";
const ids = ["p1x-hand-4","p1x-plant-2","p1x-plant-4","p1x-time-3","p1x-time-4","p1x-time-5","p1x-ani-3","p1x-mon-5","p3x-city-5","p3x-tra-4","p3x-trp-5","p3x-art-5"];
for (const part of [1,2,3] as const) for (const q of speakingPracticeData[`part${part}`]) if (ids.includes(q.id))
  console.log(q.id, "|", (q.useful_language.vocabulary_bank||[]).map(v=>v.phrase).join(" / "));
