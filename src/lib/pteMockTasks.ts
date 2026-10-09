import { MOCK_TESTS, READ_ALOUD_ALL, REPEAT_SENTENCE_ALL, ESSAY_ALL, SUMMARIZE_TEXT_ALL, FILL_BLANK_ALL, REORDER_ALL, DICTATION_ALL, SUMMARIZE_SPOKEN_ALL, MCQ_ALL, HIGHLIGHT_INCORRECT_ALL, type PteMockTest } from '@/data/pteData';

export interface PteMockTask { id: string; type: string; label: string; section: string; route: string }
export const getPteMockTasks = (mock: PteMockTest): PteMockTask[] => {
  const groups = [
    { ids: mock.readAloudIds, bank: READ_ALOUD_ALL, type: 'read-aloud', label: 'Read Aloud', section: 'Speaking & Writing', page: 'speaking' },
    { ids: mock.repeatSentenceIds, bank: REPEAT_SENTENCE_ALL, type: 'repeat', label: 'Repeat Sentence', section: 'Speaking & Writing', page: 'speaking' },
    { ids: mock.summarizeTextIds, bank: SUMMARIZE_TEXT_ALL, type: 'summarize', label: 'Summarize Written Text', section: 'Speaking & Writing', page: 'writing' },
    { ids: mock.essayIds, bank: ESSAY_ALL, type: 'essay', label: 'Write Essay', section: 'Speaking & Writing', page: 'writing' },
    { ids: mock.fillBlankIds, bank: FILL_BLANK_ALL, type: 'fillBlank', label: 'Fill in the Blanks - Dropdown Practice', section: 'Reading', page: 'reading' },
    { ids: mock.reorderIds, bank: REORDER_ALL, type: 'reorder', label: 'Re-order Paragraphs', section: 'Reading', page: 'reading' },
    { ids: mock.mcqIds ?? [], bank: MCQ_ALL, type: 'reading-single-answer', label: 'Multiple Choice, Single Answer', section: 'Reading', page: 'objective-practice' },
    { ids: mock.summarizeSpokenIds, bank: SUMMARIZE_SPOKEN_ALL, type: 'summarize', label: 'Summarize Spoken Text', section: 'Listening', page: 'listening' },
    { ids: mock.highlightIds ?? [], bank: HIGHLIGHT_INCORRECT_ALL, type: 'highlight-incorrect-words', label: 'Highlight Incorrect Words', section: 'Listening', page: 'objective-practice' },
    { ids: mock.dictationIds, bank: DICTATION_ALL, type: 'dictation', label: 'Write from Dictation', section: 'Listening', page: 'listening' },
  ];
  return groups.flatMap(g => g.ids.filter(id => g.bank.some(item => item.id === id)).map(id => ({ id, type: g.type, label: g.label, section: g.section, route: `/pte/${g.page}?type=${g.type}&item=${encodeURIComponent(id)}&set=${encodeURIComponent(mock.id)}` })));
};
export const getPteMock = (id: string) => MOCK_TESTS.find(mock => mock.id === id);
