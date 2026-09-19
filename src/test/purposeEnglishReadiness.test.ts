import { describe, expect, it } from "vitest";
import { academicCommunicationLessons, professionalCommunicationLessons } from "@/data/conversationalCurriculum";
import { academicTopicsPart1 } from "@/data/academicEnglishLessons";
import { academicTopicsPart2 } from "@/data/academicEnglishLessons2";
import { businessTopicsPart1 } from "@/data/businessEnglishLessons";
import { businessTopicsPart2 } from "@/data/businessEnglishLessons2";
import { buildCertificateStatus, buildReadinessSnapshot, certificateCode, emptyReadinessScores, keepBestQuizScore, validateReadinessMapping } from "@/lib/purposeEnglishReadiness";

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
    for (const lesson of professionalCommunicationLessons) scores.lab[lesson.id] = { score: 10, maxScore: 10 };
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

  it("uses lab quiz scores and never exceeds 100 or returns NaN", () => {
    const scores = emptyReadinessScores();
    for (const lesson of professionalCommunicationLessons) scores.lab[lesson.id] = { score: 10, maxScore: 10 };
    const withLabScores = buildReadinessSnapshot({
      track: "business",
      topics: businessTopics,
      labs: professionalCommunicationLessons,
      coreDone: [],
      labDone: professionalCommunicationLessons.map((lesson) => lesson.id),
      practised: [],
      scores,
    });
    const withoutLabScores = buildReadinessSnapshot({
      track: "business",
      topics: businessTopics,
      labs: professionalCommunicationLessons,
      coreDone: [],
      labDone: professionalCommunicationLessons.map((lesson) => lesson.id),
      practised: [],
      scores: emptyReadinessScores(),
    });
    expect(withLabScores.overall).toBeGreaterThan(withoutLabScores.overall);
    for (const axis of withLabScores.axes) {
      expect(Number.isNaN(axis.value)).toBe(false);
      expect(axis.value).toBeLessThanOrEqual(100);
      expect(axis).not.toHaveProperty("labIds");
    }
  });

  it("stays safe when a track has no data at all", () => {
    const empty = buildReadinessSnapshot({
      track: "business",
      topics: [],
      labs: [],
      coreDone: [],
      labDone: [],
      practised: [],
      scores: emptyReadinessScores(),
    });
    expect(empty.overall).toBe(0);
    expect(empty.hasEvidence).toBe(false);
    expect(empty.axes.every((axis) => axis.value === 0)).toBe(true);
  });

  it("only grants the certificate with full completion and 70+ readiness", () => {
    const allCore = businessTopics.flatMap((topic) => topic.lessons.map((lesson) => lesson.id));
    const allLabs = professionalCommunicationLessons.map((lesson) => lesson.id);
    const partial = buildCertificateStatus({ topics: businessTopics, labs: professionalCommunicationLessons, coreDone: allCore.slice(0, 5), labDone: [], overall: 40 });
    expect(partial.eligible).toBe(false);
    expect(partial.missingCore).toBe(allCore.length - 5);
    expect(partial.missingLab).toBe(allLabs.length);
    expect(partial.missingPoints).toBe(30);

    const lowScore = buildCertificateStatus({ topics: businessTopics, labs: professionalCommunicationLessons, coreDone: allCore, labDone: allLabs, overall: 69 });
    expect(lowScore.eligible).toBe(false);

    const done = buildCertificateStatus({ topics: businessTopics, labs: professionalCommunicationLessons, coreDone: allCore, labDone: allLabs, overall: 70 });
    expect(done.eligible).toBe(true);
    expect(done.missingCore).toBe(0);
    expect(done.missingPoints).toBe(0);
  });

  it("builds deterministic certificate codes per track", () => {
    expect(certificateCode("business", "Nguyen Van A")).toBe(certificateCode("business", "Nguyen Van A"));
    expect(certificateCode("business", "Nguyen Van A")).not.toBe(certificateCode("academic", "Nguyen Van A"));
    expect(certificateCode("business", "Nguyen Van A")).toMatch(/^HET-BUS-[0-9A-Z]+$/);
  });
});