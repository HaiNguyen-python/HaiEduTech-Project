/** Validates every IELTS Listening set: answer coverage in transcript, MCQ key balance, matching letters. @copyright 2026 HaiEduTech */
import fs from "fs";
const files=fs.readdirSync("src/data").filter(f=>/^ieltsListeningPractice(Expansion\d*)?\.ts$/.test(f));
let issues=[]; const mcqKeys={0:0,1:0,2:0,3:0}; let sets=0;
for(const f of files){
  const src=fs.readFileSync(`src/data/${f}`,"utf8");
  for(const b of src.split(/\n    id: "/).slice(1)){
    const id=b.slice(0,b.indexOf('"')); sets++;
    const tr=(b.match(/transcript:\n([\s\S]*?)\n    (rate|questions):/)||[])[1]||"";
    const plain=tr.replace(/\\n/g," ").replace(/"|\+/g," ").toLowerCase();
    for(const m of b.matchAll(/type: "mcq"[\s\S]*?answer: (\d)/g)) mcqKeys[m[1]]++;
    for(const m of b.matchAll(/type: "fill-in",[\s\S]{0,300}?answer: "([^"]+)"/g)){
      const a=m[1].toLowerCase();
      if(!plain.includes(a) && !/^\d+$/.test(a)) issues.push(`${id}: fill answer "${a}" not in transcript`);
    }
    const letters=(b.match(/matchingOptions: \[([\s\S]*?)\]/)||[])[1];
    if(letters){
      const valid=[...letters.matchAll(/letter: "([A-Z])"/g)].map(x=>x[1]);
      for(const m of b.matchAll(/type: "matching",[\s\S]{0,200}?answer: "([A-Z])"/g))
        if(!valid.includes(m[1])) issues.push(`${id}: matching answer ${m[1]} not an option`);
    }
  }
}
console.log("sets:",sets,"mcq key distribution:",mcqKeys);
console.log(issues.length?issues.slice(0,40):"no issues");
