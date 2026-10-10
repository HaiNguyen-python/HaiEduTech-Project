import type { SwedishLevel } from "./swedishWritingPrompts";

export interface SwedishWritingSentence {
  id: string;
  level: SwedishLevel;
  sv: string;
  en: string;
  alternativeSv: string;
}
const sentence = (id: number, level: SwedishLevel, sv: string, en: string, alternativeSv: string): SwedishWritingSentence => ({ id: `sv-writing-s${id}`, level, sv, en, alternativeSv });
export const SWEDISH_WRITING_SENTENCES: SwedishWritingSentence[] = [
  sentence(1, "A1", "Jag bor i Helsingfors.", "I live in Helsinki.", "Mitt hem finns i Helsingfors."),
  sentence(2, "A1", "Jag gillar att läsa böcker.", "I like reading books.", "Jag tycker om att läsa böcker."),
  sentence(3, "A1", "Min familj är liten.", "My family is small.", "Jag har en liten familj."),
  sentence(4, "A1", "Jag behöver en biljett.", "I need a ticket.", "En biljett är vad jag behöver."),
  sentence(5, "A1", "Bussen kommer klockan åtta.", "The bus arrives at eight o'clock.", "Klockan åtta kommer bussen."),
  sentence(6, "A1", "Jag arbetar på ett café.", "I work at a café.", "Mitt jobb är på ett café."),
  sentence(7, "A1", "Vi äter frukost hemma.", "We eat breakfast at home.", "Hemma äter vi frukost."),
  sentence(8, "A1", "Det är kallt idag.", "It is cold today.", "Idag är det kallt."),
  sentence(9, "A1", "Min syster har en hund.", "My sister has a dog.", "En hund bor hos min syster."),
  sentence(10, "A1", "Jag går till skolan varje dag.", "I walk to school every day.", "Varje dag går jag till skolan."),
  sentence(11, "A2", "Jag skulle vilja boka en tid hos läkaren.", "I would like to book an appointment with the doctor.", "Jag önskar boka en läkartid."),
  sentence(12, "A2", "Igår handlade jag mat efter jobbet.", "Yesterday I bought groceries after work.", "Jag köpte mat efter jobbet igår."),
  sentence(13, "A2", "Jag kan inte komma på fredag.", "I cannot come on Friday.", "På fredag har jag inte möjlighet att komma."),
  sentence(14, "A2", "Kan du skicka adressen till mig?", "Can you send me the address?", "Skulle du kunna skicka mig adressen?"),
  sentence(15, "A2", "Jag har redan betalat hyran.", "I have already paid the rent.", "Hyran är redan betald."),
  sentence(16, "A2", "Vi ska besöka våra vänner i helgen.", "We are going to visit our friends this weekend.", "I helgen tänker vi hälsa på våra vänner."),
  sentence(17, "A2", "Den här jackan är billigare än den där.", "This jacket is cheaper than that one.", "Den där jackan är dyrare än den här."),
  sentence(18, "A2", "Jag är intresserad av lägenheten.", "I am interested in the flat.", "Lägenheten intresserar mig."),
  sentence(19, "A2", "Tack för hjälpen med min ansökan.", "Thank you for helping with my application.", "Jag tackar dig för att du hjälpte mig med ansökan."),
  sentence(20, "A2", "Jag stannar hemma eftersom jag är sjuk.", "I am staying at home because I am ill.", "Eftersom jag är sjuk stannar jag hemma."),
  sentence(21, "B1", "Jag tycker att staden behöver fler parker.", "I think the city needs more parks.", "Enligt min mening behövs fler parker i staden."),
  sentence(22, "B1", "Trots att det regnar går jag en promenad.", "Although it is raining, I am going for a walk.", "Jag går en promenad även om det regnar."),
  sentence(23, "B1", "Om jag hade mer tid skulle jag läsa mer.", "If I had more time, I would read more.", "Jag skulle läsa mer om jag hade mer tid."),
  sentence(24, "B1", "Jag föreslår att vi flyttar mötet till måndag.", "I suggest moving the meeting to Monday.", "Mitt förslag är att hålla mötet på måndag i stället."),
  sentence(25, "B1", "Kollektivtrafiken är bra, men den kan bli bättre.", "Public transport is good, but it can be improved.", "Även om kollektivtrafiken är bra finns det utrymme för förbättring."),
  sentence(26, "B1", "Det är viktigt att alla får delta.", "It is important that everyone can participate.", "Alla bör få möjlighet att delta."),
  sentence(27, "B1", "Jag håller inte med eftersom kostnaden är för hög.", "I disagree because the cost is too high.", "Den höga kostnaden gör att jag inte kan instämma."),
  sentence(28, "B1", "Ju mer jag övar, desto lättare blir det.", "The more I practise, the easier it gets.", "Det blir lättare när jag övar mer."),
  sentence(29, "B1", "En fördel med distansarbete är att det sparar tid.", "One advantage of remote work is that it saves time.", "Distansarbete har fördelen att vara tidsbesparande."),
  sentence(30, "B1", "Sammanfattningsvis bör vi tänka på miljön.", "In summary, we should consider the environment.", "Avslutningsvis är det viktigt att ta hänsyn till miljön."),
];

export interface SwedishWritingSkill { term: string; vi: string; en: string; exampleSv: string; exampleEn: string }
const skill = (term: string, vi: string, en: string, exampleSv: string, exampleEn: string): SwedishWritingSkill => ({ term, vi, en, exampleSv, exampleEn });
export const SWEDISH_WRITING_SKILLS: Record<"vocabulary" | "grammar" | "connectors", SwedishWritingSkill[]> = {
  vocabulary: [
    skill("en ansökan", "đơn đăng ký", "an application", "Jag skickar min ansökan idag.", "I am sending my application today."),
    skill("en hyra", "tiền thuê nhà", "rent", "Hyran är 700 euro i månaden.", "The rent is 700 euros per month."),
    skill("en tidsfrist", "hạn chót", "a deadline", "Kan vi flytta tidsfristen till fredag?", "Can we move the deadline to Friday?"),
    skill("en återbetalning", "khoản hoàn tiền", "a refund", "Jag vill be om en återbetalning.", "I would like to request a refund."),
    skill("en fördel", "lợi ích", "an advantage", "En fördel är att vi sparar tid.", "One advantage is that we save time."),
    skill("en nackdel", "bất lợi", "a disadvantage", "En nackdel är den höga kostnaden.", "One disadvantage is the high cost."),
    skill("ett förslag", "đề xuất", "a suggestion", "Jag har ett förslag till nästa möte.", "I have a suggestion for the next meeting."),
    skill("att boka", "đặt lịch", "to book", "Jag skulle vilja boka ett bord.", "I would like to book a table."),
  ],
  grammar: [
    skill("V2: Idag arbetar jag", "Động từ chia đứng thứ hai trong mệnh đề chính.", "The finite verb occupies position two in main clauses.", "Imorgon åker jag till Åbo.", "Tomorrow I am going to Turku."),
    skill("BIFF: eftersom jag inte kan", "Trong mệnh đề phụ, inte đứng trước động từ chia.", "In subordinate clauses, inte precedes the finite verb.", "Jag stannar hemma eftersom jag inte mår bra.", "I am staying home because I do not feel well."),
    skill("har + supinum", "Thì hoàn thành dùng har + supinum.", "The perfect tense uses har + supine.", "Jag har skrivit ett mejl.", "I have written an email."),
    skill("skulle vilja + infinitiv", "Nguyện vọng lịch sự, không có att sau vilja.", "Polite wishes use an infinitive without att after vilja.", "Jag skulle vilja ändra min bokning.", "I would like to change my booking."),
    skill("en / ett + adjektiv", "Tính từ hòa hợp với giống và số của danh từ.", "Adjectives agree with the noun's gender and number.", "Jag har en ny cykel och ett nytt jobb.", "I have a new bicycle and a new job."),
    skill("om + preteritum, skulle + infinitiv", "Điều kiện giả định dùng quá khứ và skulle.", "Hypothetical conditions use the past tense and skulle.", "Om jag hade tid skulle jag hjälpa dig.", "If I had time, I would help you."),
  ],
  connectors: [
    skill("eftersom", "bởi vì", "because", "Jag tar bussen eftersom bilen är trasig.", "I am taking the bus because the car is broken."),
    skill("därför", "vì vậy", "therefore", "Bilen är trasig. Därför tar jag bussen.", "The car is broken. Therefore I am taking the bus."),
    skill("trots att", "mặc dù", "although", "Trots att jag är trött fortsätter jag.", "Although I am tired, I continue."),
    skill("dessutom", "hơn nữa", "moreover", "Bussen är billig. Dessutom är den bekväm.", "The bus is cheap. Moreover, it is comfortable."),
    skill("å ena sidan / å andra sidan", "một mặt / mặt khác", "on the one hand / on the other hand", "Å ena sidan sparar vi tid, men å andra sidan blir det dyrare.", "On the one hand we save time, but on the other hand it becomes more expensive."),
    skill("sammanfattningsvis", "tóm lại", "in summary", "Sammanfattningsvis behöver vi en bättre plan.", "In summary, we need a better plan."),
  ],
};

// Typing is exact after NFC normalization: Swedish letters, case, punctuation
// and spaces are meaningful. Insertions cannot inflate the accuracy above 100.
export function scoreSwedishTyping(answer: string, target: string): number {
  const a = Array.from(answer.normalize("NFC"));
  const b = Array.from(target.normalize("NFC"));
  if (!b.length) return 0;
  let previous = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 0; i < a.length; i++) {
    const current = [i + 1];
    for (let j = 0; j < b.length; j++) current.push(Math.min(current[j] + 1, previous[j + 1] + 1, previous[j] + (a[i] === b[j] ? 0 : 1)));
    previous = current;
  }
  return Math.max(0, Math.round((1 - previous[b.length] / Math.max(a.length, b.length)) * 100));
}

export function shuffledSwedishIndices(length: number): number[] {
  const ids = Array.from({ length }, (_, i) => i);
  for (let i = length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [ids[i], ids[j]] = [ids[j], ids[i]]; }
  return ids;
}
