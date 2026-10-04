import { it, expect } from "vitest";
import { TOEIC_SW_EXAMS } from "@/data/toeicExams";
import { auditToeicSWExam } from "@/data/toeicFullExamBuilder";
it("sw", () => {
  const errs = TOEIC_SW_EXAMS.flatMap(auditToeicSWExam);
  console.log(TOEIC_SW_EXAMS.map(e=>e.id+" "+e.title+" "+e.speakingTasks.length+"/"+e.writingTasks.length).join("\n"));
  const prompts = TOEIC_SW_EXAMS.flatMap(e=>[...e.speakingTasks,...e.writingTasks].filter(t=>t.type!=="describe-picture").map(t=>t.prompt));
  console.log("dup prompts", prompts.length - new Set(prompts).size, errs);
  expect(errs).toEqual([]);
  expect(prompts.length - new Set(prompts).size).toBe(0);
  expect(TOEIC_SW_EXAMS.length).toBe(10);
});
