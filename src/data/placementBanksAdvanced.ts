/**
 * @file placementBanksAdvanced.ts
 * @description Extra placement items that raise every language bank from 18 to
 *   24 questions: one full C1 block (listening, reading, writing, speaking)
 *   plus two extra B1/B2 items, so each level block holds at least four items
 *   and high-level students can be separated reliably. The Programming bank
 *   gets six extra items spread over its four technical domains.
 *
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { PlacementQuestion } from "./placementTest";

/* ── Chinese (HSK 5-6 range) ──────────────────────────────────────── */
export const CHINESE_ADV: PlacementQuestion[] = [
  { id: 121, skill: "reading", cefr: "B1", type: "read-mcq",
    prompt: "我已经 ___ 三年汉语了。", options: ["学", "学了", "学着", "在学"], correct: 1 },
  { id: 122, skill: "listening", cefr: "B2", type: "listen-mcq",
    prompt: "What does the speaker complain about?",
    audioText: "这家公司的产品不错,可是售后服务太慢了,我等了两个星期还没有人联系我。",
    options: ["The product quality", "The slow after-sales service", "The high price", "The delivery address"], correct: 1 },
  { id: 123, skill: "listening", cefr: "C1", type: "listen-mcq",
    prompt: "What is the speaker's attitude towards remote work?",
    audioText: "远程办公确实提高了灵活性,但如果缺少明确的沟通制度,团队的效率反而会下降,所以关键不在于地点,而在于管理方式。",
    options: [
      "Remote work always improves efficiency",
      "Remote work only succeeds with clear communication rules",
      "Remote work should be banned",
      "Location matters more than management"], correct: 1 },
  { id: 124, skill: "reading", cefr: "C1", type: "read-analytical",
    prompt: "What can be inferred from the passage?",
    passage: "过去十年,中国的教育科技公司经历了快速扩张与迅速收缩。资本推动了在线课程的普及,却也让部分机构忽视了教学质量。如今,能够留下来的公司往往不是最会营销的,而是最了解学生真实需求的。",
    options: [
      "Marketing is the key to survival in EdTech",
      "Capital alone guarantees long-term success",
      "Companies that understand learners' real needs survive",
      "Online courses failed completely in China"], correct: 2 },
  { id: 125, skill: "writing", cefr: "C1", type: "write-essay",
    prompt: "请就“人工智能是否会取代语言教师”写一段论述,给出你的观点和两个理由。(120-180字)",
    minWords: 120, maxWords: 180 },
  { id: 126, skill: "speaking", cefr: "C1", type: "speak-present",
    prompt: "Argue for or against this statement in Chinese: \"Young people should study abroad before working.\" Prepare 40 seconds, speak 90 seconds.",
    prepSeconds: 40, recordSeconds: 90 },
];

/* ── Vietnamese ───────────────────────────────────────────────────── */
export const VIETNAMESE_ADV: PlacementQuestion[] = [
  { id: 221, skill: "reading", cefr: "B1", type: "read-mcq",
    prompt: "Tôi đã sống ở Hà Nội ___ năm năm.", options: ["trong", "được", "từ", "khi"], correct: 1 },
  { id: 222, skill: "listening", cefr: "B2", type: "listen-mcq",
    prompt: "Người nói phàn nàn về điều gì?",
    audioText: "Sản phẩm của công ty này thì tốt, nhưng dịch vụ sau bán hàng quá chậm, tôi đã đợi hai tuần mà vẫn chưa ai liên hệ lại.",
    options: ["Chất lượng sản phẩm", "Dịch vụ sau bán hàng chậm", "Giá quá cao", "Địa chỉ giao hàng"], correct: 1 },
  { id: 223, skill: "listening", cefr: "C1", type: "listen-mcq",
    prompt: "Quan điểm của người nói về làm việc từ xa là gì?",
    audioText: "Làm việc từ xa giúp linh hoạt hơn, nhưng nếu thiếu quy tắc giao tiếp rõ ràng thì hiệu quả của cả nhóm lại giảm, nên vấn đề không nằm ở địa điểm mà ở cách quản lý.",
    options: [
      "Làm việc từ xa luôn hiệu quả hơn",
      "Làm việc từ xa chỉ hiệu quả khi có quy tắc giao tiếp rõ ràng",
      "Nên bỏ hoàn toàn làm việc từ xa",
      "Địa điểm quan trọng hơn cách quản lý"], correct: 1 },
  { id: 224, skill: "reading", cefr: "C1", type: "read-analytical",
    prompt: "Có thể suy ra điều gì từ đoạn văn?",
    passage: "Mười năm qua, các công ty công nghệ giáo dục Việt Nam mở rộng rất nhanh rồi thu hẹp cũng rất nhanh. Dòng vốn giúp khóa học trực tuyến phổ biến hơn, nhưng cũng khiến một số nơi xem nhẹ chất lượng dạy học. Hiện nay, những công ty trụ lại thường không phải là công ty tiếp thị giỏi nhất, mà là công ty hiểu rõ nhu cầu thật của học sinh.",
    options: [
      "Tiếp thị là yếu tố quyết định để tồn tại",
      "Chỉ cần nhiều vốn là sẽ thành công lâu dài",
      "Công ty hiểu nhu cầu thật của học sinh thì trụ lại được",
      "Khóa học trực tuyến đã thất bại hoàn toàn"], correct: 2 },
  { id: 225, skill: "writing", cefr: "C1", type: "write-essay",
    prompt: "Hãy viết một đoạn nghị luận về ý kiến \"Trí tuệ nhân tạo sẽ thay thế giáo viên ngoại ngữ\": nêu quan điểm và hai lý do. (150-220 từ)",
    minWords: 150, maxWords: 220 },
  { id: 226, skill: "speaking", cefr: "C1", type: "speak-present",
    prompt: "Trình bày ý kiến đồng ý hay không đồng ý với nhận định: \"Người trẻ nên đi du học trước khi làm việc.\" Chuẩn bị 40 giây, nói 90 giây.",
    prepSeconds: 40, recordSeconds: 90 },
];

/* ── Finnish ──────────────────────────────────────────────────────── */
export const FINNISH_ADV: PlacementQuestion[] = [
  { id: 321, skill: "reading", cefr: "B1", type: "read-mcq",
    prompt: "Olen asunut Helsingissä ___ viisi vuotta.", options: ["jo", "vielä", "vasta kun", "kohta"], correct: 0 },
  { id: 322, skill: "listening", cefr: "B2", type: "listen-mcq",
    prompt: "Mistä puhuja valittaa?",
    audioText: "Tämän yrityksen tuotteet ovat hyviä, mutta asiakaspalvelu on liian hidasta. Olen odottanut vastausta kaksi viikkoa.",
    options: ["Tuotteiden laadusta", "Hitaasta asiakaspalvelusta", "Korkeasta hinnasta", "Toimitusosoitteesta"], correct: 1 },
  { id: 323, skill: "listening", cefr: "C1", type: "listen-mcq",
    prompt: "Mikä on puhujan näkemys etätyöstä?",
    audioText: "Etätyö lisää joustavuutta, mutta ilman selkeitä viestintäkäytäntöjä tiimin tehokkuus laskee. Kysymys ei siis ole paikasta vaan johtamisesta.",
    options: [
      "Etätyö parantaa aina tehokkuutta",
      "Etätyö onnistuu vain selkeillä viestintäkäytännöillä",
      "Etätyö pitäisi kieltää",
      "Paikka on tärkeämpi kuin johtaminen"], correct: 1 },
  { id: 324, skill: "reading", cefr: "C1", type: "read-analytical",
    prompt: "Mitä tekstistä voi päätellä?",
    passage: "Suomessa keskustellaan siitä, pitäisikö korkeakouluopetusta tarjota enemmän englanniksi. Kansainväliset opiskelijat tuovat osaamista, mutta moni heistä lähtee maasta, koska työpaikan saaminen ilman suomen kieltä on vaikeaa. Ratkaisu ei ole vain opetuskielessä vaan myös kielikoulutuksessa työelämää varten.",
    options: [
      "Englanninkielinen opetus riittää ratkaisuksi",
      "Kansainväliset opiskelijat eivät halua töitä Suomesta",
      "Työelämän kielikoulutus on olennainen osa ratkaisua",
      "Korkeakoulujen pitäisi lopettaa englanninkielinen opetus"], correct: 2 },
  { id: 325, skill: "writing", cefr: "C1", type: "write-essay",
    prompt: "Kirjoita mielipidekirjoitus: korvaako tekoäly kieltenopettajat? Kerro kantasi ja kaksi perustelua. (120-180 sanaa)",
    minWords: 120, maxWords: 180 },
  { id: 326, skill: "speaking", cefr: "C1", type: "speak-present",
    prompt: "Perustele suomeksi, oletko samaa vai eri mieltä: \"Nuorten pitäisi opiskella ulkomailla ennen työelämää.\" Valmistaudu 40 sekuntia, puhu 90 sekuntia.",
    prepSeconds: 40, recordSeconds: 90 },
];

/* ── Japanese (N3-N2 range) ───────────────────────────────────────── */
export const JAPANESE_ADV: PlacementQuestion[] = [
  { id: 521, skill: "reading", cefr: "B1", type: "read-mcq",
    prompt: "日本語を 五年 ___ 勉強しています。", options: ["から", "間", "まで", "ごろ"], correct: 1 },
  { id: 522, skill: "listening", cefr: "B2", type: "listen-mcq",
    prompt: "話す人は何に不満がありますか。 (What is the speaker unhappy about?)",
    audioText: "この会社の製品は いいのですが、アフターサービスが 遅すぎます。二週間 待っても だれからも 連絡が ありません。",
    options: ["製品の品質", "アフターサービスの遅さ", "値段の高さ", "配達の住所"], correct: 1 },
  { id: 523, skill: "listening", cefr: "C1", type: "listen-mcq",
    prompt: "在宅勤務について話す人の考えはどれですか。",
    audioText: "在宅勤務は 柔軟性を 高めますが、はっきりした コミュニケーションの ルールが なければ チーム全体の 効率は 下がります。つまり 問題は 場所ではなく 管理の 仕方です。",
    options: [
      "在宅勤務は いつでも 効率が 上がる",
      "はっきりした ルールが あって はじめて うまく いく",
      "在宅勤務は やめた ほうが いい",
      "場所の ほうが 管理より 大事だ"], correct: 1 },
  { id: 524, skill: "reading", cefr: "C1", type: "read-analytical",
    prompt: "本文から分かることはどれですか。",
    passage: "日本では 外国人材の 受け入れが 進んでいる。企業は 高い技術を 求めているが、来日した人の 多くは 数年で 帰国してしまう。理由は 給料だけではなく、日本語で 相談できる 環境が 足りないことだと 言われている。",
    options: [
      "外国人材は 給料だけを 重視している",
      "日本語で 相談できる 環境が 足りない ことも 問題である",
      "企業は 技術を 求めていない",
      "外国人材の 受け入れは 減っている"], correct: 1 },
  { id: 525, skill: "writing", cefr: "C1", type: "write-essay",
    prompt: "「AIは 語学の 先生に 代われるか」について、あなたの 意見と 理由を 二つ 書いて ください。(150-250字)",
    minWords: 150, maxWords: 250 },
  { id: 526, skill: "speaking", cefr: "C1", type: "speak-present",
    prompt: "「若い人は 働く前に 留学した ほうが いい」に 賛成か 反対か、日本語で 話して ください。準備40秒、発表90秒。",
    prepSeconds: 40, recordSeconds: 90 },
];

/* ── Swedish ──────────────────────────────────────────────────────── */
export const SWEDISH_ADV: PlacementQuestion[] = [
  { id: 621, skill: "reading", cefr: "B1", type: "read-mcq",
    prompt: "Jag har bott i Stockholm ___ fem år.", options: ["i", "sedan", "för", "på"], correct: 0 },
  { id: 622, skill: "listening", cefr: "B2", type: "listen-mcq",
    prompt: "Vad klagar talaren på?",
    audioText: "Företagets produkter är bra, men kundservicen är alldeles för långsam. Jag har väntat på svar i två veckor.",
    options: ["Produkternas kvalitet", "Den långsamma kundservicen", "Det höga priset", "Leveransadressen"], correct: 1 },
  { id: 623, skill: "listening", cefr: "C1", type: "listen-mcq",
    prompt: "Vad tycker talaren om distansarbete?",
    audioText: "Distansarbete ger mer flexibilitet, men utan tydliga rutiner för kommunikation sjunker teamets effektivitet. Frågan handlar alltså inte om plats utan om ledarskap.",
    options: [
      "Distansarbete ger alltid högre effektivitet",
      "Distansarbete fungerar bara med tydliga kommunikationsrutiner",
      "Distansarbete borde förbjudas",
      "Platsen är viktigare än ledarskapet"], correct: 1 },
  { id: 624, skill: "reading", cefr: "C1", type: "read-analytical",
    prompt: "Vad kan man dra för slutsats av texten?",
    passage: "I Sverige diskuteras hur nyanlända snabbare ska komma in på arbetsmarknaden. Många har lång utbildning men får ändå inte jobb, eftersom arbetsgivare kräver svenska i det dagliga arbetet. Forskare menar därför att språkutbildning och praktik behöver ske samtidigt, inte i tur och ordning.",
    options: [
      "Utbildning från andra länder saknar värde",
      "Språkutbildning och praktik bör ske parallellt",
      "Arbetsgivare bryr sig inte om svenska",
      "Praktik borde komma flera år efter språkkursen"], correct: 1 },
  { id: 625, skill: "writing", cefr: "C1", type: "write-essay",
    prompt: "Skriv en argumenterande text: kan AI ersätta språklärare? Ange din åsikt och två skäl. (120-180 ord)",
    minWords: 120, maxWords: 180 },
  { id: 626, skill: "speaking", cefr: "C1", type: "speak-present",
    prompt: "Argumentera på svenska för eller emot påståendet: \"Unga borde studera utomlands innan de börjar arbeta.\" Förbered i 40 sekunder, tala i 90 sekunder.",
    prepSeconds: 40, recordSeconds: 90 },
];

/* ── Programming: two extra items per technical domain ────────────── */
export const PROGRAMMING_ADV: PlacementQuestion[] = [
  { id: 421, skill: "reading", cefr: "A2", domain: "logic", type: "read-mcq",
    prompt: "A loop must repeat while a counter is smaller than 5. Which condition is correct?",
    options: ["counter > 5", "counter < 5", "counter == 5", "counter != counter"], correct: 1 },
  { id: 422, skill: "reading", cefr: "B1", domain: "logic", type: "read-mcq",
    prompt: "This code should print every name once, but it prints nothing. What is wrong?",
    code: "names = [\"An\", \"Binh\"]\nfor n in names:\n    pass",
    language: "python",
    options: [
      "The list is empty",
      "`pass` does nothing, so no print statement runs",
      "`for` cannot loop over a list",
      "The names need quotes"], correct: 1 },
  { id: 423, skill: "reading", cefr: "B1", domain: "python", type: "read-mcq",
    prompt: "What does this code print?",
    code: "scores = {\"An\": 8, \"Binh\": 6}\nprint(scores.get(\"Chi\", 0))",
    language: "python",
    options: ["8", "6", "0", "KeyError"], correct: 2 },
  { id: 424, skill: "reading", cefr: "B2", domain: "python", type: "read-mcq",
    prompt: "Why does this function return the wrong average for an empty list?",
    code: "def avg(xs):\n    return sum(xs) / len(xs)",
    language: "python",
    options: [
      "`sum` is not defined for lists",
      "Dividing by len(xs) raises ZeroDivisionError when the list is empty",
      "It should use a for loop",
      "`return` must come first"], correct: 1 },
  { id: 425, skill: "reading", cefr: "B2", domain: "sql", type: "read-mcq",
    prompt: "Which clause keeps only the classes whose average score is above 80?",
    schema: "scores(class_id, value)",
    code: "SELECT class_id, AVG(value) AS avg_value\nFROM scores\nGROUP BY class_id\n___ AVG(value) > 80;",
    language: "sql",
    options: ["WHERE", "HAVING", "ORDER BY", "LIMIT"], correct: 1 },
  { id: 426, skill: "reading", cefr: "B2", domain: "ai", type: "read-mcq",
    prompt: "A model scores 99 percent on training data but 62 percent on new data. This is:",
    options: ["Underfitting", "Overfitting", "Data leakage in the test set only", "A hardware limit"], correct: 1 },
];
