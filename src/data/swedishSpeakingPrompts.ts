/**
 * @file swedishSpeakingPrompts.ts
 * @description YKI Ruotsi (Swedish) Tala monologue prompts per level.
 *              Each prompt includes a Swedish question, Vietnamese gloss,
 *              suggested duration window and a sample answer skeleton.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

import type { SwedishLevel } from "./swedishWritingPrompts";

export interface SwedishSpeakingPrompt {
  id: string;
  level: SwedishLevel;
  titleVi: string;
  titleEn: string;
  promptSv: string;
  promptVi: string;
  minSec: number;
  maxSec: number;
  skeletonSv: string[];
  tipVi: string;
}

export const SWEDISH_SPEAKING_PROMPTS: SwedishSpeakingPrompt[] = [
  // ───── A1 ─────
  {
    id: "s-a1-self",
    level: "A1",
    titleVi: "Nói về bản thân",
    titleEn: "Talk about yourself",
    promptSv: "Berätta om dig själv på svenska: namn, ålder, var du bor och din familj. Tala i 30–45 sekunder.",
    promptVi: "Tự giới thiệu bằng tiếng Thụy Điển: tên, tuổi, nơi ở, gia đình. Nói 30–45 giây.",
    minSec: 30, maxSec: 60,
    skeletonSv: [
      "Hej, jag heter ___.",
      "Jag är ___ år gammal och kommer från Vietnam.",
      "Jag bor i ___ med ___.",
      "I min familj är vi ___ personer.",
    ],
    tipVi: "Mục tiêu A1: 4–5 câu rõ ràng. Nói chậm, ngắt câu giữa các ý.",
  },
  {
    id: "s-a1-weekend",
    level: "A1",
    titleVi: "Cuối tuần của bạn",
    titleEn: "Your weekend",
    promptSv: "Vad gör du på helgen? Berätta tre saker du tycker om att göra.",
    promptVi: "Cuối tuần bạn làm gì? Kể 3 việc bạn thích làm.",
    minSec: 25, maxSec: 50,
    skeletonSv: [
      "På helgen ___.",
      "På lördag brukar jag ___.",
      "På söndag tycker jag om att ___.",
    ],
    tipVi: "Dùng 'brukar' để chỉ thói quen — gây ấn tượng A1 cao.",
  },
  // ───── A2 ─────
  {
    id: "s-a2-restaurant",
    level: "A2",
    titleVi: "Phàn nàn ở nhà hàng",
    titleEn: "Complaining at a restaurant",
    promptSv: "Du är på en restaurang och maten är kall. Förklara problemet för servitören och be om en lösning.",
    promptVi: "Bạn đang ở nhà hàng và món ăn bị lạnh. Trình bày vấn đề với người phục vụ và đề nghị giải pháp.",
    minSec: 40, maxSec: 70,
    skeletonSv: [
      "Ursäkta mig, jag har ett problem.",
      "Min ___ är kall.",
      "Kan jag få ___ istället?",
      "Tack så mycket.",
    ],
    tipVi: "A2 Tala chuộng lịch sự: bắt đầu bằng 'Ursäkta', kết bằng 'Tack'.",
  },
  {
    id: "s-a2-job-day",
    level: "A2",
    titleVi: "Một ngày làm việc",
    titleEn: "A typical workday",
    promptSv: "Berätta om en typisk dag på jobbet eller i skolan: vad gör du på morgonen, eftermiddagen och kvällen?",
    promptVi: "Kể về một ngày làm việc/đi học điển hình: bạn làm gì sáng, chiều, tối.",
    minSec: 45, maxSec: 75,
    skeletonSv: [
      "På morgonen vaknar jag klockan ___ och ___.",
      "På eftermiddagen brukar jag ___.",
      "På kvällen ___ innan jag går och lägger mig.",
    ],
    tipVi: "Dùng trạng từ thời gian ở đầu câu để kích hoạt V2 inversion: 'På morgonen vaknar jag…'.",
  },
  // ───── B1 ─────
  {
    id: "s-b1-environment",
    level: "B1",
    titleVi: "Quan điểm: bảo vệ môi trường",
    titleEn: "Opinion: protecting the environment",
    promptSv: "Vad kan vanliga människor göra för att skydda miljön? Ge minst tre konkreta exempel och förklara varför.",
    promptVi: "Người dân bình thường có thể làm gì để bảo vệ môi trường? Đưa ít nhất 3 ví dụ cụ thể và giải thích lý do.",
    minSec: 60, maxSec: 120,
    skeletonSv: [
      "Jag tycker att vi alla har ett ansvar för miljön.",
      "För det första kan vi ___ eftersom ___.",
      "För det andra ___, och för det tredje ___.",
      "Sammanfattningsvis tror jag att ___.",
    ],
    tipVi: "B1: chuỗi 'För det första / andra / tredje + sammanfattningsvis' giúp đạt criteria Coherence cao.",
  },
  {
    id: "s-b1-interview",
    level: "B1",
    titleVi: "Phỏng vấn việc làm",
    titleEn: "Job interview",
    promptSv: "Du har en arbetsintervju. Berätta om din utbildning, dina arbetserfarenheter och varför du passar för jobbet.",
    promptVi: "Bạn đang phỏng vấn xin việc. Nói về học vấn, kinh nghiệm làm việc và lý do bạn phù hợp.",
    minSec: 60, maxSec: 120,
    skeletonSv: [
      "Tack för att jag fick komma hit.",
      "Jag har en examen i ___ från ___.",
      "Jag har arbetat som ___ i ___ år och har lärt mig att ___.",
      "Jag tror att jag passar för jobbet eftersom ___.",
    ],
    tipVi: "B1: dùng 'eftersom' / 'trots att' để chứng minh BIFF trong nói — điểm Grammar B1.",
  },
  // ───── A1 extra ─────
  {
    id: "s-a1-home",
    level: "A1",
    titleVi: "Mô tả căn hộ của bạn",
    titleEn: "Describe your flat",
    promptSv: "Berätta om din lägenhet. Hur många rum finns det? Vad finns i vardagsrummet och i köket? Tala i 25–40 sekunder.",
    promptVi: "Kể về căn hộ của bạn. Có bao nhiêu phòng? Phòng khách và nhà bếp có gì? Nói 25–40 giây.",
    minSec: 25, maxSec: 50,
    skeletonSv: [
      "Jag bor i en ___ med ___ rum.",
      "I vardagsrummet finns ___.",
      "I köket finns ___.",
      "Jag tycker att min lägenhet är ___.",
    ],
    tipVi: "A1: dùng 'det finns' nhiều lần để chỉ sự hiện diện của đồ vật — đủ điểm Vocabulary.",
  },
  {
    id: "s-a1-food",
    level: "A1",
    titleVi: "Nói về thức ăn yêu thích",
    titleEn: "Talk about your favourite food",
    promptSv: "Vad är din favoritmat? Var äter du den? Vad behöver man för att laga den? Tala i 25–40 sekunder.",
    promptVi: "Món ăn yêu thích của bạn là gì? Bạn ăn ở đâu? Cần gì để nấu món đó? Nói 25–40 giây.",
    minSec: 25, maxSec: 50,
    skeletonSv: [
      "Min favoritmat är ___.",
      "Jag brukar äta den på ___ / hemma.",
      "Man behöver ___ och ___.",
    ],
    tipVi: "A1: 'Man behöver' là cách nói chung chung hay — tránh phải chia động từ phức tạp.",
  },
  // ───── A2 extra ─────
  {
    id: "s-a2-holiday",
    level: "A2",
    titleVi: "Kể về kỳ nghỉ gần đây",
    titleEn: "Talk about a recent holiday",
    promptSv: "Berätta om din senaste semester. Vart åkte du? Vad gjorde du där? Vilket väder hade ni? Tala i 40–70 sekunder.",
    promptVi: "Kể về kỳ nghỉ gần nhất. Bạn đi đâu? Làm gì ở đó? Thời tiết thế nào? Nói 40–70 giây.",
    minSec: 40, maxSec: 75,
    skeletonSv: [
      "Förra månaden åkte jag till ___.",
      "Vi gjorde ___ och besökte ___.",
      "Vädret var ___, så vi ___.",
      "Jag tyckte att resan var ___ eftersom ___.",
    ],
    tipVi: "A2: 'eftersom' ở cuối để giải thích cảm xúc — kích hoạt BIFF nhẹ, điểm Grammar cao.",
  },
  {
    id: "s-a2-cooking",
    level: "A2",
    titleVi: "Giải thích cách nấu một món ăn",
    titleEn: "Explain how to cook a dish",
    promptSv: "Förklara hur man lagar din favoriträtt. Vilka ingredienser behövs? Vad gör man först, sedan och till sist? Tala i 40–70 sekunder.",
    promptVi: "Giải thích cách nấu món ăn yêu thích của bạn. Cần nguyên liệu gì? Làm gì trước, sau, cuối cùng? Nói 40–70 giây.",
    minSec: 40, maxSec: 75,
    skeletonSv: [
      "För att laga ___ behöver man ___.",
      "Först skär man ___.",
      "Sedan kokar man ___ i ___ minuter.",
      "Till sist blandar man allt och serverar med ___.",
    ],
    tipVi: "A2: dùng 'Först / Sedan / Till sist' để tạo trình tự logic — tiêu chí Coherence cao.",
  },
  // ───── B1 extra ─────
  {
    id: "s-b1-city-country",
    level: "B1",
    titleVi: "So sánh sống ở thành phố và nông thôn",
    titleEn: "City life vs countryside",
    promptSv: "Vad är för- och nackdelarna med att bo i en storstad jämfört med på landsbygden? Ge minst två argument för vardera och säg vad du föredrar. Tala i 60–90 sekunder.",
    promptVi: "Lợi và hại của sống ở thành phố lớn so với nông thôn? Đưa ít nhất 2 luận điểm cho mỗi bên và nói bạn thích gì. Nói 60–90 giây.",
    minSec: 60, maxSec: 100,
    skeletonSv: [
      "Å ena sidan är det bra att bo i stan eftersom ___.",
      "Men en nackdel är att ___.",
      "På landsbygden däremot kan man ___.",
      "Personligen föredrar jag ___ eftersom ___.",
    ],
    tipVi: "B1: 'däremot' là liên từ đối lập mạnh — thay 'men' ở đầu câu mới để tăng điểm Vocabulary.",
  },
  {
    id: "s-b1-online-education",
    level: "B1",
    titleVi: "Ý kiến về giáo dục trực tuyến",
    titleEn: "Opinion on online education",
    promptSv: "Vad tycker du om distansundervisning? Nämner minst två fördelar, två nackdelar och ge en rekommendation till skolor. Tala i 60–90 sekunder.",
    promptVi: "Bạn nghĩ gì về giảng dạy từ xa? Nêu ít nhất 2 lợi ích, 2 bất lợi và 1 khuyến nghị cho trường học. Nói 60–90 giây.",
    minSec: 60, maxSec: 100,
    skeletonSv: [
      "Jag tycker att distansundervisning har både fördelar och nackdelar.",
      "En fördel är att ___ medan en nackdel är att ___.",
      "Dessutom kan eleverna ___ om de ___.",
      "Därför rekommenderar jag att skolorna ___.",
    ],
    tipVi: "B1: 'medan' (trong khi) để đối chiếu 2 mặt cùng lúc — cấu trúc phức, điểm Grammar cao.",
  },
  // ───── A1 expansion v2 ─────
  {
    id: "s-a1-food",
    level: "A1",
    titleVi: "Món ăn yêu thích",
    titleEn: "Favourite food",
    promptSv: "Vad är din favoritmat? Berätta vad det är, var du brukar äta den och varför du tycker om den.",
    promptVi: "Món bạn thích nhất là gì? Kể đó là món gì, hay ăn ở đâu, vì sao thích.",
    minSec: 25, maxSec: 50,
    skeletonSv: [
      "Min favoritmat är ___.",
      "Jag brukar äta den på ___ eller hemma.",
      "Jag gillar den eftersom den är ___.",
      "Ibland lagar jag den själv med ___.",
    ],
    tipVi: "A1: 4 câu đơn — món, nơi ăn, lý do, bonus. 'eftersom' là từ A1 ăn điểm.",
  },
  {
    id: "s-a1-daily-routine",
    level: "A1",
    titleVi: "Lịch sinh hoạt một ngày",
    titleEn: "A day in your life",
    promptSv: "Berätta om en vanlig dag: när du går upp, vad du gör på morgonen, eftermiddagen och kvällen.",
    promptVi: "Kể về một ngày thường: thức dậy mấy giờ, sáng/chiều/tối làm gì.",
    minSec: 30, maxSec: 55,
    skeletonSv: [
      "Jag går upp klockan ___ på morgonen.",
      "Sedan äter jag frukost och ___.",
      "På eftermiddagen ___.",
      "På kvällen brukar jag ___ innan jag går och lägger mig.",
    ],
    tipVi: "A1: dùng 'sedan' (rồi) để nối hành động — kích hoạt V2 inversion tự nhiên.",
  },
  // ───── A2 expansion v2 ─────
  {
    id: "s-a2-best-trip",
    level: "A2",
    titleVi: "Chuyến đi đáng nhớ nhất",
    titleEn: "Most memorable trip",
    promptSv: "Berätta om en resa som du minns bra. Vart åkte du, med vem, vad gjorde ni och varför var den speciell?",
    promptVi: "Kể về chuyến đi bạn nhớ nhất: đi đâu, với ai, làm gì, vì sao đặc biệt.",
    minSec: 45, maxSec: 80,
    skeletonSv: [
      "För ___ år sedan åkte jag till ___ med ___.",
      "Vi besökte ___ och åt mycket ___.",
      "Det bästa var att ___.",
      "Jag vill gärna åka tillbaka eftersom ___.",
    ],
    tipVi: "A2: dùng quá khứ ('åkte', 'besökte', 'åt') — kiểm tra preteritum, điểm Grammar A2.",
  },
  {
    id: "s-a2-describe-friend",
    level: "A2",
    titleVi: "Mô tả một người bạn thân",
    titleEn: "Describe a close friend",
    promptSv: "Berätta om en av dina bästa vänner. Hur ser hen ut, vad gör hen och varför trivs ni tillsammans?",
    promptVi: "Kể về một người bạn thân: ngoại hình, công việc, vì sao hợp nhau.",
    minSec: 40, maxSec: 70,
    skeletonSv: [
      "En av mina bästa vänner heter ___.",
      "Hen är ___ och jobbar som ___.",
      "Vi träffades första gången ___.",
      "Vi trivs eftersom vi delar samma intresse för ___.",
    ],
    tipVi: "A2: dùng 'hen' (đại từ trung tính) để né lỗi giống. 'vi delar samma intresse för' là cấu trúc B1-light.",
  },
  // ───── B1 expansion v2 ─────
  {
    id: "s-b1-ai-jobs",
    level: "B1",
    titleVi: "AI sẽ thay thế việc làm?",
    titleEn: "Will AI replace jobs?",
    promptSv: "Kommer artificiell intelligens att ersätta många jobb i framtiden? Ge två exempel på yrken som påverkas och föreslå hur samhället bör förbereda sig. Tala i 60–90 sekunder.",
    promptVi: "AI có thay thế nhiều việc trong tương lai không? Nêu 2 ví dụ nghề bị ảnh hưởng và đề xuất xã hội nên chuẩn bị thế nào. Nói 60–90 giây.",
    minSec: 60, maxSec: 100,
    skeletonSv: [
      "Jag tror att AI kommer att förändra arbetsmarknaden mycket.",
      "Till exempel kan ___ och ___ bli automatiserade.",
      "Däremot kommer nya yrken inom ___ att skapas.",
      "Därför bör samhället satsa på ___ och livslångt lärande.",
    ],
    tipVi: "B1: 'livslångt lärande' (học suốt đời) — collocation B1 chuẩn, điểm Vocabulary cao.",
  },
  {
    id: "s-b1-climate-personal",
    level: "B1",
    titleVi: "Hành động cá nhân chống biến đổi khí hậu",
    titleEn: "Personal action on climate change",
    promptSv: "Vad gör du själv för att minska ditt klimatavtryck? Ge tre konkreta exempel och förklara om du tycker att individuella val räcker eller om vi behöver politiska beslut. Tala i 60–90 sekunder.",
    promptVi: "Bạn làm gì để giảm dấu chân carbon? Nêu 3 ví dụ cụ thể và bàn xem hành động cá nhân có đủ không, hay cần quyết định chính trị. Nói 60–90 giây.",
    minSec: 60, maxSec: 100,
    skeletonSv: [
      "För att minska mitt klimatavtryck försöker jag ___.",
      "Till exempel ___, ___ och ___.",
      "Jag tror att individuella val är viktiga men inte räcker ensamma.",
      "Vi behöver också politiska beslut, till exempel ___.",
    ],
    tipVi: "B1: 'klimatavtryck' + 'politiska beslut' = từ vựng aktuell. Cấu trúc 'inte räcker ensamma' là B1 thực thụ.",
  },
  // ───── A1 expansion v3 ─────
  {
    id: "s-a1-hometown",
    level: "A1",
    titleVi: "Quê hương của bạn",
    titleEn: "Your hometown",
    promptSv: "Berätta om din hemstad. Var ligger den, hur stor är den och vad finns det att göra där?",
    promptVi: "Kể về quê bạn: ở đâu, lớn cỡ nào, có gì để làm.",
    minSec: 25, maxSec: 50,
    skeletonSv: [
      "Min hemstad heter ___ och ligger i ___.",
      "Det bor ungefär ___ människor där.",
      "Det finns ___ och ___ som man kan besöka.",
      "Jag tycker att min hemstad är ___.",
    ],
    tipVi: "A1: dùng 'det finns' + 'man kan' (đại từ chung) — đơn giản nhưng đầy đủ.",
  },
  {
    id: "s-a1-weather-today",
    level: "A1",
    titleVi: "Thời tiết hôm nay",
    titleEn: "The weather today",
    promptSv: "Hur är vädret idag där du bor? Berätta också vilken årstid du gillar mest och varför.",
    promptVi: "Hôm nay thời tiết nơi bạn ở thế nào? Bạn thích mùa nào nhất, vì sao.",
    minSec: 20, maxSec: 45,
    skeletonSv: [
      "Idag är vädret ___ och temperaturen är ungefär ___ grader.",
      "Det är ___.",
      "Min favoritårstid är ___ eftersom ___.",
    ],
    tipVi: "A1: số đếm + đơn vị 'grader' là chuẩn YKI A1. 'min favoritårstid' = mùa yêu thích.",
  },
  // ───── A2 expansion v3 ─────
  {
    id: "s-a2-work-study",
    level: "A2",
    titleVi: "Công việc hoặc việc học của bạn",
    titleEn: "Your job or studies",
    promptSv: "Berätta om ditt jobb eller dina studier. Vad gör du, vilka är dina arbetstider och vad är det bästa och svåraste med det?",
    promptVi: "Kể về công việc hoặc việc học: bạn làm gì, giờ giấc thế nào, điều gì hay và khó nhất.",
    minSec: 45, maxSec: 75,
    skeletonSv: [
      "Just nu jobbar/studerar jag som ___.",
      "Mina arbetstider/lektioner är ___.",
      "Det bästa med mitt jobb/mina studier är ___.",
      "Det svåraste är att ___.",
    ],
    tipVi: "A2: cấu trúc 'det bästa / det svåraste + med' = mẫu so sánh tự nhiên.",
  },
  {
    id: "s-a2-shopping-habits",
    level: "A2",
    titleVi: "Thói quen mua sắm",
    titleEn: "Shopping habits",
    promptSv: "Hur ofta handlar du? Var brukar du handla — i butik eller på nätet — och varför?",
    promptVi: "Bạn mua sắm bao lâu một lần? Thường mua ở cửa hàng hay online, vì sao.",
    minSec: 40, maxSec: 70,
    skeletonSv: [
      "Jag brukar handla ___ gånger i veckan.",
      "För det mesta handlar jag på ___ eftersom ___.",
      "Ibland handlar jag också på nätet, till exempel ___.",
      "Nackdelen med näthandel är dock att ___.",
    ],
    tipVi: "A2: 'dock' = 'tuy nhiên' — adverb đối lập đặt cuối, kích điểm Grammar.",
  },
  // ───── B1 expansion v3 ─────
  {
    id: "s-b1-social-media",
    level: "B1",
    titleVi: "Tác động của mạng xã hội với sức khoẻ tinh thần",
    titleEn: "Social media and mental health",
    promptSv: "Hur påverkar sociala medier vår psykiska hälsa? Ge två risker, två fördelar och en konkret rekommendation till unga användare. Tala i 60–90 sekunder.",
    promptVi: "Mạng xã hội ảnh hưởng sức khoẻ tinh thần thế nào? Nêu 2 rủi ro, 2 lợi ích, 1 khuyến nghị cụ thể cho người trẻ. Nói 60–90 giây.",
    minSec: 60, maxSec: 100,
    skeletonSv: [
      "Sociala medier har förändrat hur vi kommunicerar.",
      "Två risker är att ___ och att ___.",
      "Däremot finns det fördelar — till exempel ___.",
      "Min rekommendation till unga är att ___.",
    ],
    tipVi: "B1: 'har förändrat' (perfekt) + 'däremot' (đối lập) là combo B1 chuẩn.",
  },
  {
    id: "s-b1-housing-young",
    level: "B1",
    titleVi: "Khủng hoảng nhà ở cho người trẻ",
    titleEn: "Housing crisis for young people",
    promptSv: "Det är svårt för unga att hitta lägenhet i Sverige. Vilka är orsakerna och vad kan staten, kommunen och unga själva göra? Tala i 60–90 sekunder.",
    promptVi: "Người trẻ khó tìm căn hộ ở Thụy Điển. Nguyên nhân là gì và nhà nước, địa phương, chính người trẻ có thể làm gì? Nói 60–90 giây.",
    minSec: 60, maxSec: 100,
    skeletonSv: [
      "Bostadssituationen för unga i Sverige är svår.",
      "Orsakerna är bland annat ___ och ___.",
      "Staten borde ___ medan kommunerna kan ___.",
      "Samtidigt kan unga själva ___.",
    ],
    tipVi: "B1: 'bland annat' (trong số đó) - từ học thuật. 'borde' = nên (lịch sự hơn 'måste').",
  },
  // ───── NEW: A1 family monologue ─────
  {
    id: "s-a1-family",
    level: "A1",
    titleVi: "Nói về gia đình",
    titleEn: "Talk about your family",
    promptSv: "Berätta om din familj. Hur många är ni? Var bor de och vad gör de?",
    promptVi: "Kể về gia đình bạn. Có bao nhiêu người? Họ sống ở đâu và làm gì?",
    minSec: 45,
    maxSec: 75,
    skeletonSv: [
      "Vi är ___ personer i min familj: ___.",
      "Mina föräldrar heter ___ och de bor i ___.",
      "Min pappa arbetar som ___ och min mamma är ___.",
      "Jag har ___ syskon. Min ___ är ___ år gammal.",
      "Vi träffas ofta på helgerna och äter middag tillsammans.",
    ],
    tipVi: "A1: dùng 'har' + số + 'syskon/barn'. Nghề nghiệp KHÔNG dùng mạo từ: 'Han är lärare' (không phải 'en lärare').",
  },
  // ───── NEW: A2 hometown ─────
  {
    id: "s-a2-hometown",
    level: "A2",
    titleVi: "Nói về quê hương",
    titleEn: "Talk about your hometown",
    promptSv: "Beskriv din hemstad. Var ligger den, hur stor är den och vad kan man göra där?",
    promptVi: "Mô tả quê bạn. Nằm ở đâu, lớn cỡ nào, và có thể làm gì ở đó?",
    minSec: 60,
    maxSec: 90,
    skeletonSv: [
      "Min hemstad heter ___ och ligger i ___.",
      "Det bor ungefär ___ människor där.",
      "Staden är känd för ___ och ___.",
      "På sommaren kan man ___, och på vintern brukar folk ___.",
      "Det jag gillar mest med min hemstad är ___ eftersom ___.",
    ],
    tipVi: "A2: dùng 'ligger i' cho vị trí, 'känd för' = nổi tiếng vì. Kết bằng câu 'eftersom' để nêu lý do.",
  },
  // ───── NEW: B1 favourite season ─────
  {
    id: "s-b1-favourite-season",
    level: "B1",
    titleVi: "Mùa yêu thích",
    titleEn: "Your favourite season",
    promptSv: "Vilken årstid tycker du bäst om och varför? Jämför den med de andra årstiderna.",
    promptVi: "Bạn thích mùa nào nhất và tại sao? So sánh với các mùa khác.",
    minSec: 75,
    maxSec: 120,
    skeletonSv: [
      "Min favoritårstid är ___ eftersom ___.",
      "Under denna årstid brukar jag ___ tillsammans med ___.",
      "Jämfört med vintern, som ofta är ___, känns ___ mycket ___.",
      "Vissa människor föredrar sommaren, men jag tycker att ___.",
      "Sammanfattningsvis tror jag att ___ passar mig bäst.",
    ],
    tipVi: "B1: dùng 'jämfört med' (so với), 'sammanfattningsvis' (tóm lại), 'föredrar' (thích hơn). Nêu ý kiến rõ ràng và có lý do.",
  },
];

// ─── Expansion: additional prompts pulled from expansion file ───
import { SWEDISH_SPEAKING_PROMPTS_EXPANSION } from "./swedishSpeakingPromptsExpansion";
SWEDISH_SPEAKING_PROMPTS.push(...SWEDISH_SPEAKING_PROMPTS_EXPANSION);
