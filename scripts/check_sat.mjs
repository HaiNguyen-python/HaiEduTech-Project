import { allEnglishModules } from '../src/data/languageCurriculum/index.ts';
const sat = allEnglishModules.filter(m => m.category === 'sat');
const ids = sat.map(m=>m.id);
const dup = ids.filter((x,i)=>ids.indexOf(x)!==i);
console.log('SAT modules:', sat.length, 'duplicate module ids:', [...new Set(dup)]);
const allModIds = allEnglishModules.map(m=>m.id);
const dupAll = allModIds.filter((x,i)=>allModIds.indexOf(x)!==i);
console.log('All English duplicate module ids:', [...new Set(dupAll)]);
let totalLessons = 0;
for (const m of sat) {
  const lids = m.lessons.map(l=>l.id);
  const ldup = lids.filter((x,i)=>lids.indexOf(x)!==i);
  if (ldup.length) console.log('Module', m.id, 'duplicate lesson ids:', [...new Set(ldup)]);
  totalLessons += m.lessons.length;
  for (const l of m.lessons) {
    if (!l.exercises || !l.quiz) console.log('Missing data', m.id, l.id, 'ex:', !!l.exercises, 'quiz:', !!l.quiz);
    if (l.quiz && l.quiz.length === 0) console.log('Empty quiz', m.id, l.id);
    if (!l.theory) console.log('No theory', m.id, l.id);
  }
}
console.log('Total SAT lessons:', totalLessons);

// Check that for each SAT lesson, find by lesson id alone returns the right module
for (const m of sat) {
  for (const l of m.lessons) {
    const matches = allEnglishModules.filter(mm => mm.lessons.some(ll => ll.id === l.id));
    if (matches.length > 1) console.log('Lesson id collision', l.id, 'in modules', matches.map(x=>x.id));
  }
}
