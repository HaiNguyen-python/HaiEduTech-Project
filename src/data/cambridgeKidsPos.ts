/**
 * @file cambridgeKidsPos.ts
 * @description Part-of-speech lookup for Cambridge YLE vocabulary.
 * Default fallback is "n" (noun) since the majority of YLE words are nouns.
 */

export type Pos = "n" | "v" | "adj" | "adv" | "prep" | "phr";

export const POS_LABEL: Record<Pos, { en: string; vi: string; color: string }> = {
  n:    { en: "noun",       vi: "danh từ",      color: "#3B82F6" }, // blue
  v:    { en: "verb",       vi: "động từ",      color: "#EF4444" }, // red
  adj:  { en: "adjective",  vi: "tính từ",      color: "#10B981" }, // green
  adv:  { en: "adverb",     vi: "trạng từ",     color: "#F59E0B" }, // amber
  prep: { en: "preposition",vi: "giới từ",      color: "#8B5CF6" }, // violet
  phr:  { en: "phrase",     vi: "cụm từ",       color: "#EC4899" }, // pink
};

// Explicit map for verbs / adjectives / adverbs / preposition.
// Anything not listed defaults to "n".
const POS_MAP: Record<string, Pos> = {};
const add = (pos: Pos, words: string[]) => {
  for (const w of words) POS_MAP[w.toLowerCase()] = pos;
};

add("v", [
  "accept","achieve","acknowledge","adapt","add","adjust","admire","agree","analyse","answer",
  "apologize","appear","appreciate","approach","approve","argue","arrange","arrive","ask","assist",
  "assume","attempt","believe","borrow","break","bring","build","buy","call","carry","catch",
  "celebrate","change","check","choose","clean","climb","close","come","communicate","compare",
  "compete","complain","complete","concentrate","conclude","consider","construct","contain","contribute",
  "convince","cook","copy","cry","cut","dance","decide","decline","decrease","demand","describe",
  "design","develop","discover","discuss","do","draw","dream","drink","drive","drop","eat",
  "encourage","enjoy","estimate","explain","explore","fall","feel","find","finish","fix","fly",
  "follow","forget","get","give","go","grow","guess","guarantee","happen","have","hear","help",
  "hold","identify","ignore","imagine","imitate","imply","improve","include","inspire","introduce",
  "invent","invite","involve","join","jump","keep","kick","kill","know","laugh","learn","leave",
  "let","like","listen","live","look","lose","love","make","manage","mean","meet","memorize",
  "motivate","move","need","notice","open","organize","paint","pay","persuade","pick","plan",
  "play","practise","predict","prefer","prepare","produce","promise","protect","pull","push","put",
  "read","receive","recommend","recycle","reduce","relax","rely","remember","reply","reserve",
  "rescue","rest","return","ride","run","save","say","scream","see","sell","send","share",
  "shop","show","sing","sit","sleep","smile","speak","spend","stand","stay","stop","study",
  "succeed","suggest","support","survive","swim","take","talk","teach","tell","think","throw",
  "translate","travel","try","turn","understand","use","visit","wait","walk","want","wash","watch",
  "wear","whisper","win","wish","work","write","abandon","appear","arrange","cycle","persuade",
  "react","relate","reveal","explore","draw","jump","run","sit","skip","sleep","write","read",
  "play","sing","dance",
]);

add("adj", [
  "above","absolute","adequate","afraid","amazing","ancient","angry","anxious","appropriate","attractive",
  "available","average","beautiful","big","black","blue","brave","brilliant","broken","brown","busy",
  "calm","careful","cheap","cheerful","clean","clear","clever","cold","comfortable","commercial",
  "complicated","confident","considerate","convenient","creative","curious","dangerous","dark","deep",
  "delicious","desperate","determined","different","difficult","dirty","dry","early","easy","efficient",
  "elderly","embarrassed","empty","energetic","enormous","essential","excited","exciting","expensive",
  "famous","fantastic","fascinating","fast","favourite","few","fine","flat","fortunate","frequent",
  "friendly","full","funny","generous","glad","global","gold","good","great","green","grey",
  "happy","hard","heavy","helpful","high","honest","hopeful","hot","huge","hungry","ill",
  "important","incredible","independent","intelligent","interesting","jealous","joyful","kind","large",
  "late","lazy","light","little","lonely","long","loud","loyal","low","lucky","memorable",
  "modern","narrow","national","natural","near","negative","nervous","new","nice","obvious",
  "old","ordinary","orange","patient","peaceful","permanent","pink","poor","polite","popular",
  "positive","powerful","practical","pretty","private","professional","proud","purple","quiet","red",
  "relaxed","responsible","rich","right","round","sad","scared","serious","sharp","short","shy",
  "sick","silly","silver","small","smart","soft","special","specific","strange","strong","successful",
  "sunny","sure","surprised","sweet","talented","tall","temporary","terrible","thick","thin","tired",
  "tiny","traditional","unique","upset","useful","valuable","warm","weak","wet","white","wide",
  "windy","wonderful","worried","wrong","yellow","young","alternative","minimum",
]);

add("adv", [
  "above","across","afterwards","again","ago","almost","alone","already","always","away","below",
  "carefully","downstairs","early","easily","everywhere","fast","finally","fortunately","forever",
  "hard","here","inside","later","loud","never","now","often","outside","quickly","really",
  "slowly","sometimes","soon","still","there","today","together","tomorrow","tonight","upstairs",
  "very","well","yesterday","yet",
]);

add("prep", [
  "above","across","after","at","behind","below","beside","between","by","down","for","from",
  "in","inside","into","near","of","off","on","outside","over","through","to","under","up","with","without",
]);

add("phr", [
  "ice cream","police station","post office","swimming pool","toy car",
]);

export const getPos = (word: string): Pos => {
  const w = word.toLowerCase().trim();
  return POS_MAP[w] ?? "n";
};
