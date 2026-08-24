/** Rotates MCQ option arrays so correct-answer positions are evenly spread. @copyright 2026 HaiEduTech */
import fs from "fs";
const files=fs.readdirSync("src/data").filter(f=>/^ieltsListeningPractice(Expansion\d*)?\.ts$/.test(f));
let n=0, seq=0;
const targets=[0,1,2,3];
for(const f of files){
  const p=`src/data/${f}`;
  let src=fs.readFileSync(p,"utf8");
  src=src.replace(/options: \[((?:\s*"(?:[^"\\]|\\.)*",?)+)\s*\],?\s*\n?\s*answer: (\d)/g,(m,opts,ans)=>{
    const list=[...opts.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map(x=>x[1]);
    if(list.length!==4) return m;
    const cur=+ans; const want=targets[seq++%4];
    if(cur===want) return m;
    const arr=[...list]; const [correct]=arr.splice(cur,1); arr.splice(want,0,correct);
    n++;
    const joined=arr.map(o=>`"${o}"`).join(", ");
    return m.replace(/options: \[[\s\S]*?\]/, `options: [${joined}]`).replace(/answer: \d/, `answer: ${want}`);
  });
  fs.writeFileSync(p,src);
}
console.log("rotated MCQs:",n);
