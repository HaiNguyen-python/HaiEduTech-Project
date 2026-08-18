import { edtechModules } from "../src/data/curriculum/edtechLessons";
import { edtechExpansionModules } from "../src/data/curriculum/edtechExpansion";
import { edtechAdvancedModules } from "../src/data/curriculum/edtechAdvanced";
import { edtechGlobalResearchModules } from "../src/data/curriculum/edtechGlobalResearch";
import { edtechAiInEdtechModules } from "../src/data/curriculum/edtechAiInEdtech";
import { edtechResearchMethodsModules } from "../src/data/curriculum/edtechResearchMethods";
import { edtechQuizEn } from "../src/data/curriculum/edtechQuizI18n";
const mods=[...edtechModules,...edtechExpansionModules,...edtechAdvancedModules,...edtechGlobalResearchModules,...edtechAiInEdtechModules,...edtechResearchMethodsModules];
let short=0,total=0,noQuizEn=0,quizTot=0,noExEn=0;
const rows:string[]=[];
for(const m of mods){for(const l of m.lessons){total++;
 const a=l.theory.length,b=(l.theoryEn||"").length;const ratio=b/a;
 const missQ=l.quiz.filter(q=>!q.questionEn && !edtechQuizEn[q.question]).length;
 quizTot+=l.quiz.length;noQuizEn+=missQ;
 if(!l.exerciseEn||l.exerciseEn===l.exercise){noExEn++;}
 if(ratio<0.75) {short++;rows.push(`${m.id}/${l.id} vi=${a} en=${b} r=${ratio.toFixed(2)} missQ=${missQ}`);}
 else if(missQ) rows.push(`${m.id}/${l.id} OKlen missQ=${missQ}`);
}}
console.log(rows.join("\n"));
console.log({total,short,quizTot,noQuizEn,noExEn,modules:mods.length});
console.log(mods.map(m=>`${m.id}:${m.lessons.length}`).join(" "));
