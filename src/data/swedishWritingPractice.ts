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
  sentence(31, "A1", "Jag heter Anna och jag kommer från Vietnam.", "My name is Anna and I come from Vietnam.", "Mitt namn är Anna och jag är från Vietnam."),
  sentence(32, "A1", "Vi har två barn.", "We have two children.", "Vi är föräldrar till två barn."),
  sentence(33, "A1", "Jag dricker kaffe på morgonen.", "I drink coffee in the morning.", "På morgonen dricker jag kaffe."),
  sentence(34, "A1", "Affären öppnar klockan nio.", "The shop opens at nine o'clock.", "Klockan nio öppnar affären."),
  sentence(35, "A1", "Var ligger stationen?", "Where is the station?", "Var finns stationen?"),
  sentence(36, "A1", "Jag talar lite svenska.", "I speak a little Swedish.", "Min svenska är inte så bra än."),
  sentence(37, "A1", "Min bror bor i Åbo.", "My brother lives in Turku.", "I Åbo bor min bror."),
  sentence(38, "A1", "Hur mycket kostar äpplena?", "How much do the apples cost?", "Vad kostar äpplena?"),
  sentence(39, "A1", "Jag tycker om sommaren.", "I like the summer.", "Sommaren är min favoritårstid."),
  sentence(40, "A1", "Vi ses i morgon.", "See you tomorrow.", "Vi träffas i morgon."),
  sentence(41, "A1", "Jag har ont i huvudet.", "I have a headache.", "Mitt huvud gör ont."),
  sentence(42, "A1", "Lägenheten har tre rum och kök.", "The flat has three rooms and a kitchen.", "Det finns tre rum och ett kök i lägenheten."),
  sentence(43, "A1", "Jag cyklar till jobbet.", "I cycle to work.", "Till jobbet åker jag cykel."),
  sentence(44, "A1", "Barnen leker i parken.", "The children are playing in the park.", "I parken leker barnen."),
  sentence(45, "A1", "Kan jag få vatten, tack?", "Can I have some water, please?", "Jag skulle vilja ha vatten, tack."),
  sentence(46, "A1", "Jag är ledig på lördag.", "I am free on Saturday.", "På lördag är jag ledig."),
  sentence(47, "A1", "Min telefon är ny.", "My phone is new.", "Jag har en ny telefon."),
  sentence(48, "A1", "Vi lagar middag tillsammans.", "We cook dinner together.", "Tillsammans lagar vi middag."),
  sentence(49, "A1", "Det snöar mycket i januari.", "It snows a lot in January.", "I januari snöar det mycket."),
  sentence(50, "A1", "Jag lär mig svenska på kvällarna.", "I learn Swedish in the evenings.", "På kvällarna studerar jag svenska."),
  sentence(51, "A2", "Förra veckan var jag sjuk i tre dagar.", "Last week I was ill for three days.", "Jag var sjuk i tre dagar förra veckan."),
  sentence(52, "A2", "Kan du ringa mig när du är hemma?", "Can you call me when you are home?", "Ring mig när du har kommit hem, är du snäll."),
  sentence(53, "A2", "Jag letar efter ett jobb inom vården.", "I am looking for a job in healthcare.", "Jag söker arbete inom vården."),
  sentence(54, "A2", "Tåget var försenat på grund av snön.", "The train was delayed because of the snow.", "Snön gjorde att tåget blev försenat."),
  sentence(55, "A2", "Jag vill byta tröjan mot en större storlek.", "I want to exchange the jumper for a bigger size.", "Jag skulle vilja ha tröjan i en större storlek i stället."),
  sentence(56, "A2", "Vi flyttade till Finland för två år sedan.", "We moved to Finland two years ago.", "För två år sedan flyttade vi till Finland."),
  sentence(57, "A2", "Diskmaskinen i min lägenhet fungerar inte.", "The dishwasher in my flat does not work.", "Diskmaskinen i lägenheten är trasig."),
  sentence(58, "A2", "Jag brukar handla på lördagar.", "I usually go shopping on Saturdays.", "På lördagar handlar jag oftast."),
  sentence(59, "A2", "Mötet börjar en halvtimme senare än vanligt.", "The meeting starts half an hour later than usual.", "Mötet är flyttat en halvtimme framåt i dag."),
  sentence(60, "A2", "Min dotter har börjat i en ny skola.", "My daughter has started at a new school.", "Min dotter går nu i en ny skola."),
  sentence(61, "A2", "Jag måste avboka min tid hos tandläkaren.", "I must cancel my dentist appointment.", "Jag behöver ställa in tandläkartiden."),
  sentence(62, "A2", "Det var trevligt att träffa dig igen.", "It was nice to see you again.", "Jag blev glad att få träffa dig igen."),
  sentence(63, "A2", "Vi behöver köpa mjölk, bröd och ost.", "We need to buy milk, bread and cheese.", "Mjölk, bröd och ost behöver vi köpa."),
  sentence(64, "A2", "Jag har bott här sedan i mars.", "I have lived here since March.", "Sedan i mars bor jag här."),
  sentence(65, "A2", "Kan du hjälpa mig att fylla i blanketten?", "Can you help me fill in the form?", "Skulle du kunna hjälpa mig med blanketten?"),
  sentence(66, "A2", "Grannen spelar hög musik varje kväll.", "The neighbour plays loud music every evening.", "Varje kväll spelar grannen musik högt."),
  sentence(67, "A2", "Jag tar hellre tåget än bussen.", "I would rather take the train than the bus.", "Jag föredrar tåget framför bussen."),
  sentence(68, "A2", "Restaurangen är stängd på måndagar.", "The restaurant is closed on Mondays.", "På måndagar har restaurangen stängt."),
  sentence(69, "A2", "Jag glömde min plånbok på bussen.", "I forgot my wallet on the bus.", "Min plånbok blev kvar på bussen."),
  sentence(70, "A2", "När slutar du jobba i dag?", "When do you finish work today?", "Hur dags slutar du på jobbet i dag?"),
  sentence(71, "B1", "Jag anser att alla borde ha rätt till gratis utbildning.", "I think everyone should have the right to free education.", "Enligt mig borde utbildning vara gratis för alla."),
  sentence(72, "B1", "Det skulle vara bra om bussarna gick oftare på kvällen.", "It would be good if the buses ran more often in the evening.", "Fler bussturer på kvällen skulle vara en förbättring."),
  sentence(73, "B1", "Jag skriver för att klaga på servicen i er butik.", "I am writing to complain about the service in your shop.", "Syftet med mitt mejl är att klaga på servicen i er butik."),
  sentence(74, "B1", "Många unga använder sociala medier varje dag.", "Many young people use social media every day.", "Sociala medier används dagligen av många unga."),
  sentence(75, "B1", "Även om priset är högt är kvaliteten mycket bra.", "Even though the price is high, the quality is very good.", "Kvaliteten är mycket bra, trots det höga priset."),
  sentence(76, "B1", "Jag har arbetat som sjuksköterska i fem år.", "I have worked as a nurse for five years.", "I fem år har jag haft jobb som sjuksköterska."),
  sentence(77, "B1", "Det är svårt att hitta en billig bostad i huvudstaden.", "It is difficult to find cheap housing in the capital.", "Billiga bostäder i huvudstaden är svåra att hitta."),
  sentence(78, "B1", "Jag hoppas att ni kan lösa problemet så snart som möjligt.", "I hope you can solve the problem as soon as possible.", "Förhoppningsvis kan ni åtgärda problemet snarast."),
  sentence(79, "B1", "En nackdel med att bo på landet är de långa avstånden.", "One disadvantage of living in the countryside is the long distances.", "De långa avstånden är en nackdel med livet på landet."),
  sentence(80, "B1", "Jag skulle gärna delta i kursen om den hölls på kvällen.", "I would gladly take part in the course if it were held in the evening.", "Om kursen var på kvällen skulle jag gärna delta."),
  sentence(81, "B1", "Enligt min erfarenhet lär man sig bäst genom att prata.", "In my experience, you learn best by speaking.", "Min erfarenhet är att man lär sig mest när man pratar."),
  sentence(82, "B1", "Kommunen borde satsa mer på cykelvägar.", "The municipality should invest more in cycle paths.", "Det behövs större satsningar på cykelvägar i kommunen."),
  sentence(83, "B1", "Jag blev besviken eftersom paketet aldrig kom fram.", "I was disappointed because the parcel never arrived.", "Eftersom paketet aldrig kom fram blev jag besviken."),
  sentence(84, "B1", "Det är viktigt att äldre människor inte blir ensamma.", "It is important that older people do not become lonely.", "Vi måste se till att äldre människor inte känner sig ensamma."),
  sentence(85, "B1", "Innan jag flyttade hit visste jag inte mycket om Finland.", "Before I moved here, I did not know much about Finland.", "Jag kände inte till så mycket om Finland innan jag flyttade hit."),
  sentence(86, "B1", "Å ena sidan är staden livlig, å andra sidan är den dyr.", "On the one hand the city is lively, on the other hand it is expensive.", "Staden är livlig men samtidigt dyr."),
  sentence(87, "B1", "Jag vill tacka er för ett mycket trevligt samarbete.", "I would like to thank you for a very pleasant collaboration.", "Tack för ett mycket trevligt samarbete."),
  sentence(88, "B1", "Om fler människor åkte kollektivt skulle luften bli renare.", "If more people used public transport, the air would be cleaner.", "Luften skulle bli renare om fler åkte kollektivt."),
  sentence(89, "B1", "Det beror på vilken tid på året man reser.", "It depends on what time of year you travel.", "Vilken årstid man reser spelar roll."),
  sentence(90, "B1", "Jag ser fram emot att höra från er.", "I look forward to hearing from you.", "Jag hoppas få svar från er snart."),
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
    skill("en bostad", "chỗ ở", "housing", "Det är svårt att hitta en bostad.", "It is hard to find housing."),
    skill("en blankett", "mẫu đơn", "a form", "Fyll i blanketten och skicka den.", "Fill in the form and send it."),
    skill("ett klagomål", "lời phàn nàn", "a complaint", "Jag vill lämna ett klagomål.", "I want to make a complaint."),
    skill("en granne", "hàng xóm", "a neighbour", "Min granne är mycket hjälpsam.", "My neighbour is very helpful."),
    skill("att avboka", "hủy đặt chỗ", "to cancel a booking", "Jag måste avboka mitt rum.", "I must cancel my room."),
    skill("en arbetsgivare", "người sử dụng lao động", "an employer", "Min arbetsgivare erbjuder en kurs.", "My employer offers a course."),
    skill("kollektivtrafik", "giao thông công cộng", "public transport", "Kollektivtrafiken fungerar bra här.", "Public transport works well here."),
    skill("att ansöka om", "nộp đơn xin", "to apply for", "Jag vill ansöka om jobbet.", "I want to apply for the job."),
    skill("en erfarenhet", "kinh nghiệm", "an experience", "Jag har erfarenhet av kundservice.", "I have experience of customer service."),
    skill("att jämföra", "so sánh", "to compare", "Vi jämför priserna innan vi köper.", "We compare the prices before we buy."),
  ],
  grammar: [
    skill("V2: Idag arbetar jag", "Động từ chia đứng thứ hai trong mệnh đề chính.", "The finite verb occupies position two in main clauses.", "Imorgon åker jag till Åbo.", "Tomorrow I am going to Turku."),
    skill("BIFF: eftersom jag inte kan", "Trong mệnh đề phụ, inte đứng trước động từ chia.", "In subordinate clauses, inte precedes the finite verb.", "Jag stannar hemma eftersom jag inte mår bra.", "I am staying home because I do not feel well."),
    skill("har + supinum", "Thì hoàn thành dùng har + supinum.", "The perfect tense uses har + supine.", "Jag har skrivit ett mejl.", "I have written an email."),
    skill("skulle vilja + infinitiv", "Nguyện vọng lịch sự, không có att sau vilja.", "Polite wishes use an infinitive without att after vilja.", "Jag skulle vilja ändra min bokning.", "I would like to change my booking."),
    skill("en / ett + adjektiv", "Tính từ hòa hợp với giống và số của danh từ.", "Adjectives agree with the noun's gender and number.", "Jag har en ny cykel och ett nytt jobb.", "I have a new bicycle and a new job."),
    skill("om + preteritum, skulle + infinitiv", "Điều kiện giả định dùng quá khứ và skulle.", "Hypothetical conditions use the past tense and skulle.", "Om jag hade tid skulle jag hjälpa dig.", "If I had time, I would help you."),
    skill("Bestämd form: bilen, huset", "Danh từ xác định thêm -en/-et ở cuối.", "Definite nouns add -en/-et as an ending.", "Bilen står utanför huset.", "The car is outside the house."),
    skill("Preteritum: arbetade, skrev", "Quá khứ đơn cho sự việc đã kết thúc.", "The past tense describes finished events.", "Igår skrev jag ett brev.", "Yesterday I wrote a letter."),
    skill("ska + infinitiv", "Dự định hoặc kế hoạch tương lai.", "Plans and intentions for the future.", "I helgen ska vi besöka mormor.", "This weekend we are going to visit Grandma."),
    skill("Komparation: billig, billigare, billigast", "So sánh hơn và so sánh nhất của tính từ.", "Comparative and superlative adjectives.", "Tåget är billigare än flyget.", "The train is cheaper than the plane."),
    skill("Reflexiva verb: sig", "Động từ phản thân đi với mig/dig/sig.", "Reflexive verbs take mig/dig/sig.", "Jag känner mig trött i dag.", "I feel tired today."),
    skill("att + infinitiv efter adjektiv", "Sau cụm như det är svårt dùng att + nguyên mẫu.", "After phrases like det är svårt use att + infinitive.", "Det är svårt att hitta parkering.", "It is hard to find parking."),
  ],
  connectors: [
    skill("eftersom", "bởi vì", "because", "Jag tar bussen eftersom bilen är trasig.", "I am taking the bus because the car is broken."),
    skill("därför", "vì vậy", "therefore", "Bilen är trasig. Därför tar jag bussen.", "The car is broken. Therefore I am taking the bus."),
    skill("trots att", "mặc dù", "although", "Trots att jag är trött fortsätter jag.", "Although I am tired, I continue."),
    skill("dessutom", "hơn nữa", "moreover", "Bussen är billig. Dessutom är den bekväm.", "The bus is cheap. Moreover, it is comfortable."),
    skill("å ena sidan / å andra sidan", "một mặt / mặt khác", "on the one hand / on the other hand", "Å ena sidan sparar vi tid, men å andra sidan blir det dyrare.", "On the one hand we save time, but on the other hand it becomes more expensive."),
    skill("sammanfattningsvis", "tóm lại", "in summary", "Sammanfattningsvis behöver vi en bättre plan.", "In summary, we need a better plan."),
    skill("men", "nhưng", "but", "Jag vill komma, men jag har inte tid.", "I want to come, but I do not have time."),
    skill("eller", "hoặc", "or", "Vill du ha te eller kaffe?", "Would you like tea or coffee?"),
    skill("när", "khi", "when", "När jag kommer hem lagar jag mat.", "When I get home, I cook."),
    skill("innan", "trước khi", "before", "Jag läser instruktionen innan jag börjar.", "I read the instructions before I start."),
    skill("till exempel", "ví dụ", "for example", "Jag gillar sport, till exempel fotboll.", "I like sport, for example football."),
    skill("först ... sedan", "đầu tiên ... sau đó", "first ... then", "Först äter vi, sedan går vi ut.", "First we eat, then we go out."),
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
