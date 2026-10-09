import { describe, expect, it } from 'vitest';
import { PTE_EXAM_BLUEPRINT } from '@/data/pteExamBlueprint';
import { PTE_TASK_REQUIREMENTS } from '@/data/pteTaskRequirements';
import { PTE_LESSONS } from '@/data/pteLessonsData';
import { HIGHLIGHT_INCORRECT_ALL, MOCK_TESTS, MCQ_ALL, FILL_BLANK_ALL, REORDER_ALL, READ_ALOUD_ALL, REPEAT_SENTENCE_ALL, ESSAY_ALL, SUMMARIZE_TEXT_ALL, DICTATION_ALL, SUMMARIZE_SPOKEN_ALL } from '@/data/pteData';
import { getPteMockTasks } from '@/lib/pteMockTasks';
import { scoreReorderPairs } from '@/lib/pteObjectiveScoring';

describe('PTE content integrity', () => {
  it('maps every printed mismatch to its exact word index', () => {
    for (const item of HIGHLIGHT_INCORRECT_ALL) {
      const audio = item.audioText.split(/\s+/);
      const printed = item.displayText.split(/\s+/);
      expect(printed.length, item.id).toBe(audio.length);
      expect(item.incorrectIndices, item.id).toEqual(printed.flatMap((word, index) => word === audio[index] ? [] : [index]));
    }
  });
  it('keeps every mock reference resolvable and exact-item links complete', () => {
    const groups = { readAloudIds: READ_ALOUD_ALL, repeatSentenceIds: REPEAT_SENTENCE_ALL, essayIds: ESSAY_ALL, summarizeTextIds: SUMMARIZE_TEXT_ALL, fillBlankIds: FILL_BLANK_ALL, reorderIds: REORDER_ALL, dictationIds: DICTATION_ALL, summarizeSpokenIds: SUMMARIZE_SPOKEN_ALL, mcqIds: MCQ_ALL, highlightIds: HIGHLIGHT_INCORRECT_ALL };
    for (const mock of MOCK_TESTS) {
      let count = 0;
      for (const [key, bank] of Object.entries(groups)) {
        const ids = mock[key as keyof typeof groups] ?? [];
        for (const id of ids) expect(bank.some(item => item.id === id), `${mock.id}: ${id}`).toBe(true);
        count += ids.length;
      }
      const tasks = getPteMockTasks(mock);
      expect(tasks.length).toBe(count);
      for (const task of tasks) expect(new URL(task.route, 'https://example.test').searchParams.get('item')).toBe(task.id);
    }
    expect(MOCK_TESTS.length).toBe(10);
  });
  it('keeps all question keys valid and unique', () => {
    for (const bank of [MCQ_ALL, FILL_BLANK_ALL, REORDER_ALL, READ_ALOUD_ALL, REPEAT_SENTENCE_ALL, ESSAY_ALL, SUMMARIZE_TEXT_ALL, DICTATION_ALL, SUMMARIZE_SPOKEN_ALL, HIGHLIGHT_INCORRECT_ALL]) expect(new Set(bank.map(item => item.id)).size).toBe(bank.length);
    for (const item of MCQ_ALL) for (const index of item.correctIndices) { expect(index).toBeGreaterThanOrEqual(0); expect(index).toBeLessThan(item.options.length); }
    for (const item of FILL_BLANK_ALL) {
      expect(item.passage.match(/\{\{\d+\}\}/g)?.length).toBe(item.answers.length);
      for (const answer of item.answers) expect(item.options).toContain(answer);
    }
    for (const item of REORDER_ALL) expect([...item.correctOrder].sort()).toEqual(item.paragraphs.map((_, index) => index));
  });
  it('has valid knowledge-check keys for all 18 lessons', () => {
    expect(PTE_LESSONS.length).toBe(18);
    expect(new Set(PTE_LESSONS.map(item => item.id)).size).toBe(18);
    for (const lesson of PTE_LESSONS) for (const q of lesson.quiz) { expect(q.answer).toBeGreaterThanOrEqual(0); expect(q.answer).toBeLessThan(q.options.length); }
  });
  it('attributes enhanced read aloud to Speaking only', () => {
    expect(PTE_EXAM_BLUEPRINT.find(item => item.id === 'read-aloud')?.contributesTo).toEqual(['speaking']);
  });
  it('attributes short questions to Listening only', () => {
    expect(PTE_EXAM_BLUEPRINT.find(item => item.id === 'answer-short-question')?.contributesTo).toEqual(['listening']);
  });
  it('attributes both reading blank types to Reading only', () => {
    for (const id of ['reading-fill-dropdown', 'reading-fill-drag-drop']) expect(PTE_EXAM_BLUEPRINT.find(item => item.id === id)?.contributesTo).toEqual(['reading']);
  });
  it('attributes listening type-in blanks to Listening only', () => {
    expect(PTE_EXAM_BLUEPRINT.find(item => item.id === 'listening-fill-blanks')?.contributesTo).toEqual(['listening']);
  });
  it('scores correct adjacent pairs even in shifted positions', () => {
    expect(scoreReorderPairs([2, 3, 0, 1], [0, 1, 2, 3])).toMatchObject({ rawScore: 2, maxScore: 3 });
    expect(scoreReorderPairs([0, 2, 1, 3], [0, 1, 2, 3]).rawScore).toBe(0);
  });
  it('provides requirements for every exam type', () => {
    expect(Object.keys(PTE_TASK_REQUIREMENTS).sort()).toEqual(PTE_EXAM_BLUEPRINT.map(item => item.id).sort());
  });
});