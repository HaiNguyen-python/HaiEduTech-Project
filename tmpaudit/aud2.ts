import { edtechAdvancedModules } from "../src/data/curriculum/edtechAdvanced";
for (const m of edtechAdvancedModules) for (const l of m.lessons) console.log(l.id, l.theory.length, l.theoryEn.length, l.quiz.length, l.quiz.filter(q=>q.optionsEn?.length===q.options.length).length);
