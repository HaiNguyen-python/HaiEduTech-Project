import { describe, expect, it } from 'vitest';
import { allToeicLectures } from '@/data/toeicLecturesData';
const lesson = (id: string) => {
  const found = allToeicLectures.find(item => item.id === id);
  if (!found) throw new Error(`Missing lecture ${id}`);
  return found;
};
describe('TOEIC lecture content integrity', () => {
  it('has unique routable lesson IDs', () => {
    expect(new Set(allToeicLectures.map(item => item.id)).size).toBe(allToeicLectures.length);
  });
  it('has valid answers and complete exercise fields across the bank', () => {
    for (const l of allToeicLectures) {
      expect(l.coreTechnique.length).toBeGreaterThan(0);
      for (const q of [...l.practiceSet, ...l.quiz]) {
        expect(Number.isInteger(q.answer)).toBe(true);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(q.options.length);
        expect(new Set(q.options).size).toBe(q.options.length);
        expect(q.explanation.trim().length).toBeGreaterThan(0);
      }
    }
  });
  it('supports the causal connector with an explicit decision to act', () => {
    const q = lesson('toeic-part6-cohesion-flow').practiceSet[1];
    expect(q.options[q.answer]).toBe('Therefore');
    expect(q.question).toContain('management decided to act');
    const quiz = lesson('toeic-part6-cohesion-flow').quiz[1];
    expect(quiz.options[quiz.answer]).toBe('Therefore');
  });
  it('uses a fronted preposition to disambiguate whom', () => {
    const q = lesson('toeic-part5-relative-clauses').practiceSet[2];
    expect(q.question).toContain('to _____');
    expect(q.options[q.answer]).toBe('whom');
  });
  it('makes shipment, delivery date and next action available in all three questions', () => {
    for (const q of lesson('toeic-part3-3-question-flow').practiceSet) {
      expect(q.context).toContain('shipment is late');
      expect(q.context).toContain('Friday');
      expect(q.context).toContain('email Sarah');
    }
  });
  it('provides a consistent jacket-only invoice calculation', () => {
    const q = lesson('toeic-part7-triple-cross').practiceSet[0];
    expect(q.context).toContain('discount $80');
    expect(q.context).toContain('subtotal $400');
    expect(q.options[q.answer]).toBe('20%');
  });
});
