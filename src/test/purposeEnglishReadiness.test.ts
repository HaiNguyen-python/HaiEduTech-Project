import { describe, expect, it } from "vitest";
import { academicCommunicationLessons, professionalCommunicationLessons } from "@/data/conversationalCurriculum";
import { academicTopicsPart1 } from "@/data/academicEnglishLessons";
import { academicTopicsPart2 } from "@/data/academicEnglishLessons2";
import { businessTopicsPart1 } from "@/data/businessEnglishLessons";
import { businessTopicsPart2 } from "@/data/businessEnglishLessons2";
import { buildReadinessSnapshot, emptyReadinessScores, keepBestQuizScore, validateReadinessMapping } from "@/lib/purposeEnglishReadiness";

const businessTopics = [...businessTopicsPart1, ...businessTopicsPart2];
const academicTopics = [...academicTopicsPart1, ...academicTopicsPart2];

describe("purpose English readiness", () => {
  it.each([
    ["business" as const, businessTopics, professionalCommunicationLessons],
    ["academic" as const, academicTopics, academicCommunicationLessons],
  ])("maps every %s topic and lab exactly once", (track, topics, labs) => {
    const result = validateReadinessMapping(track, topics, labs);
    expect(result).toEqual({ missingTopics: [], missingLabs: [], duplicateLabs: [], unknownLabs: [] });
  });

  it("keeps the best quiz attempt", () => {
    const first = keepBestQuizScore(emptyReadinessScores(), "core", "lesson-1", 4, 5);
    const lower = keepBestQuizScore(first, "core", "lesson-1", 3, 5);
    const higher = keepBestQuizScore(lower, "core", "lesson-1", 5, 5);
    expect(lower).toBe(first);
    expect(higher.core["lesson-1"]).toEqual({ score: 5, maxScore: 5 });
  });

  it("does not invent quiz scores for legacy completion", () => {
    const lesson = businessTopics[0].lessons[0];
    const result = buildReadinessSnapshot({
      track: "business",
      topics: businessTopics,
      labs: professionalCommunicationLessons,
      coreDone: [lesson.id],
      labDone: [],
      practised: [],
      scores: emptyReadinessScores(),
    });
    expect(result.hasLegacyScoreGap).toBe(true);
    expect(result.axes[0].quizRecorded).toBe(0);
    expect(result.axes[0].value).toBe(11);
  });

  it("reaches 100 only with complete evidence", () => {
    const scores = emptyReadinessScores();
    for (const topic of businessTopics) {
      for (const lesson of topic.lessons) scores.core[lesson.id] = { score: lesson.questions.length, maxScore: lesson.questions.length };
    }
    const result = buildReadinessSnapshot({
      track: "business",
      topics: businessTopics,
      labs: professionalCommunicationLessons,
      coreDone: businessTopics.flatMap((topic) => topic.lessons.map((lesson) => lesson.id)),
      labDone: professionalCommunicationLessons.map((lesson) => lesson.id),
      practised: businessTopics.flatMap((topic) => topic.lessons.flatMap((lesson) => lesson.vocab.map((item) => `${lesson.id}:${item.term}`))),
      scores,
    });
    expect(result.overall).toBe(100);
    expect(result.stage).toBe("ready");
  });
});