/**
 * @file ykiB1Data.ts
 * @description YKI B1 (Keskitaso) prep data: reading, listening, writing templates,
 *   speaking situations, B1 word of the day.
 * @author Teacher Hai (HaiEduTech)
 */

export interface B1ReadingPassage {
  id: string;
  title: string;
  type: "news" | "email" | "letter" | "notice";
  textFi: string;
  hintVi?: string; // optional Vietnamese hint, kept short
  questions: { q: string; options: string[]; answer: number; explanationFi: string; hintVi?: string }[];
  timeMinutes: number;
}

export interface B1ListeningClip {
  id: string;
  title: string;
  scenarioFi: string;
  scriptFi: string; // we use TTS to play this
  questions: { q: string; options: string[]; answer: number }[];
  durationSeconds: number;
}

export interface B1WritingTemplate {
  id: string;
  type: "mielipide" | "valitus";
  title: string;
  promptFi: string;
  promptVi: string;
  structure: { step: string; stepFi: string; example: string }[];
  phrases: { fi: string; meaning: string }[];
  teacherTipFi: string;
  teacherTipVi: string;
  minWords: number;
  timeMinutes: number;
}

export interface B1SpeakingSituation {
  id: string;
  title: string;
  scenarioFi: string;
  scenarioVi: string;
  taskFi: string;
  hintsFi: string[];
  speakingCoachLink: string;
  timeMinutes: number;
}

export interface B1WordOfDay {
  fi: string;
  partOfSpeech: string;
  meaningEn: string;
  meaningVi: string;
  exampleFi: string;
  exampleEn: string;
}

/* ============================================================
 * READING — news, emails, letters
 * ============================================================ */
export const B1_READING: B1ReadingPassage[] = [
  {
    id: "read-1",
    title: "Uutinen: Helsingin metro",
    type: "news",
    timeMinutes: 8,
    textFi:
      "Helsingin metro saa kaksi uutta linjaa ensi vuonna. Liikennelaitoksen mukaan matkustajat hyötyvät erityisesti aamuisin, kun ruuhka on pahimmillaan. Uudet asemat avataan toukokuussa, ja niiden lähellä rakennetaan myös uusia asuntoja. Kaupunki toivoo, että yhä useampi vaihtaisi auton julkiseen liikenteeseen.",
    hintVi: "Tin tức về tuyến metro mới của Helsinki, lợi ích cho hành khách giờ cao điểm.",
    questions: [
      {
        q: "Milloin uudet asemat avataan?",
        options: ["Tammikuussa", "Maaliskuussa", "Toukokuussa", "Elokuussa"],
        answer: 2,
        explanationFi: "Tekstissä sanotaan: 'Uudet asemat avataan toukokuussa'.",
      },
      {
        q: "Mitä kaupunki toivoo?",
        options: [
          "Lisää autoja kaduille",
          "Vähemmän julkista liikennettä",
          "Että ihmiset käyttäisivät julkista liikennettä",
          "Uusia kauppoja keskustaan",
        ],
        answer: 2,
        explanationFi: "'Kaupunki toivoo, että yhä useampi vaihtaisi auton julkiseen liikenteeseen.'",
      },
    ],
  },
  {
    id: "read-2",
    title: "Sähköposti: Vuokra-asunto",
    type: "email",
    timeMinutes: 6,
    textFi:
      "Hei!\n\nKiitos viestistäsi. Asunto on edelleen vapaana ja se on kahden huoneen kokoinen. Vuokra on 850 euroa kuukaudessa, sähkö ei sisälly hintaan. Voit muuttaa sisään 1.6. alkaen. Olisi mukavaa, jos voisimme tavata ennen sopimuksen tekemistä.\n\nYstävällisin terveisin,\nMatti",
    hintVi: "Email từ chủ nhà về căn hộ cho thuê, có giá và thời gian dọn vào.",
    questions: [
      {
        q: "Sisältyykö sähkö vuokraan?",
        options: ["Kyllä, kokonaan", "Ei sisälly", "Vain talvella", "Vain osittain"],
        answer: 1,
        explanationFi: "'sähkö ei sisälly hintaan' = electricity is NOT included.",
      },
      {
        q: "Milloin voi muuttaa sisään?",
        options: ["Heti", "1.5.", "1.6.", "1.7."],
        answer: 2,
        explanationFi: "'Voit muuttaa sisään 1.6. alkaen.'",
      },
      {
        q: "Mitä Matti ehdottaa?",
        options: [
          "Soittaa puhelimella",
          "Kirjoittaa kirjeen",
          "Tavata ennen sopimuksen tekemistä",
          "Maksaa heti",
        ],
        answer: 2,
        explanationFi: "'Olisi mukavaa, jos voisimme tavata ennen sopimuksen tekemistä.'",
      },
    ],
  },
  {
    id: "read-3",
    title: "Virallinen kirje: Kelan päätös",
    type: "letter",
    timeMinutes: 8,
    textFi:
      "Hyvä asiakas,\n\nOlemme käsitelleet hakemuksesi opintotuesta. Päätöksemme on myönteinen. Saat tukea 270 euroa kuukaudessa ajalla 1.9.–31.5. Tuki maksetaan kuukauden ensimmäisenä arkipäivänä tilillesi. Jos opintosi keskeytyvät, ilmoita siitä Kelaan välittömästi.\n\nKela",
    hintVi: "Thư chính thức từ Kela (cơ quan an sinh) về quyết định trợ cấp học tập.",
    questions: [
      {
        q: "Onko päätös myönteinen vai kielteinen?",
        options: ["Kielteinen", "Myönteinen", "Osittain", "Ei mainita"],
        answer: 1,
        explanationFi: "'Päätöksemme on myönteinen' = positive.",
      },
      {
        q: "Kuinka paljon tukea saa?",
        options: ["170 €", "270 €", "370 €", "470 €"],
        answer: 1,
        explanationFi: "'Saat tukea 270 euroa kuukaudessa'.",
      },
      {
        q: "Mitä pitää tehdä, jos opinnot keskeytyvät?",
        options: ["Soittaa kavereille", "Ilmoittaa Kelaan", "Odottaa", "Maksaa takaisin heti"],
        answer: 1,
        explanationFi: "'ilmoita siitä Kelaan välittömästi'.",
      },
    ],
  },
];

/* ============================================================
 * LISTENING — short authentic dialogues (TTS-driven)
 * ============================================================ */
export const B1_LISTENING: B1ListeningClip[] = [
  {
    id: "listen-1",
    title: "Apteekissa",
    scenarioFi: "Asiakas ja apteekkari keskustelevat lääkkeestä.",
    durationSeconds: 35,
    scriptFi:
      "Asiakas: Hei, minulla on kova yskä jo viikon. Onko teillä jotain hyvää? Apteekkari: Suosittelen tätä siirappia. Otetaan yksi lusikallinen kolme kertaa päivässä. Asiakas: Tarvitsenko reseptin? Apteekkari: Et tarvitse, tämä saadaan ilman reseptiä. Asiakas: Kiitos paljon!",
    questions: [
      {
        q: "Kuinka kauan asiakkaalla on ollut yskä?",
        options: ["Päivän", "Viikon", "Kuukauden", "Kaksi viikkoa"],
        answer: 1,
      },
      {
        q: "Tarvitaanko lääkkeeseen resepti?",
        options: ["Kyllä", "Ei", "Vain lapsille", "Ei mainita"],
        answer: 1,
      },
    ],
  },
  {
    id: "listen-2",
    title: "Työhaastattelu",
    scenarioFi: "Lyhyt työhaastattelu ravintolassa.",
    durationSeconds: 40,
    scriptFi:
      "Työnantaja: Miksi haet juuri tätä työtä? Hakija: Olen kiinnostunut asiakaspalvelusta ja pidän kiireisestä työstä. Työnantaja: Onko sinulla aiempaa kokemusta? Hakija: Kyllä, työskentelin kahvilassa kaksi vuotta. Työnantaja: Hienoa. Voitko aloittaa heti ensi viikolla? Hakija: Voin, sopii hyvin.",
    questions: [
      {
        q: "Missä hakija on aiemmin työskennellyt?",
        options: ["Ravintolassa", "Kahvilassa", "Kaupassa", "Hotellissa"],
        answer: 1,
      },
      {
        q: "Milloin hakija voi aloittaa?",
        options: ["Tänään", "Ensi viikolla", "Ensi kuussa", "Ei voi aloittaa"],
        answer: 1,
      },
    ],
  },
];

/* ============================================================
 * WRITING — Mielipide & Valitus templates
 * ============================================================ */
export const B1_WRITING: B1WritingTemplate[] = [
  {
    id: "write-mielipide",
    type: "mielipide",
    title: "Mielipidekirjoitus — Opinion text",
    promptFi:
      "Kirjoita mielipidekirjoitus aiheesta 'Pitäisikö julkisen liikenteen olla ilmainen?'. Perustele mielipiteesi 2–3 syyllä.",
    promptVi:
      "Viết bài bày tỏ ý kiến về chủ đề 'Giao thông công cộng có nên miễn phí không?'. Đưa ra 2-3 lý do.",
    minWords: 90,
    timeMinutes: 25,
    structure: [
      { step: "1. Aloitus", stepFi: "Otsikko + selkeä mielipide", example: "Mielestäni julkisen liikenteen pitäisi olla ilmainen, koska…" },
      { step: "2. Perustelu 1", stepFi: "Ensimmäinen syy + esimerkki", example: "Ensinnäkin se vähentäisi ruuhkia keskustassa." },
      { step: "3. Perustelu 2", stepFi: "Toinen syy + esimerkki", example: "Toiseksi se auttaisi vähätuloisia." },
      { step: "4. Vasta-argumentti", stepFi: "Tunnusta toinen näkökulma", example: "Toisaalta se maksaisi paljon kaupungille." },
      { step: "5. Loppu", stepFi: "Toista mielipide selkeästi", example: "Kaiken kaikkiaan kannatan ilmaista joukkoliikennettä." },
    ],
    phrases: [
      { fi: "Mielestäni…", meaning: "In my opinion…" },
      { fi: "Ensinnäkin… Toiseksi…", meaning: "Firstly… Secondly…" },
      { fi: "Esimerkiksi…", meaning: "For example…" },
      { fi: "Toisaalta…", meaning: "On the other hand…" },
      { fi: "Yhteenvetona…", meaning: "To summarize…" },
    ],
    teacherTipFi: "Käytä vähintään kahta sidossanaa per kappale. Vältä toistoa: jos käytit 'mielestäni' alussa, käytä lopussa 'kannatan' tai 'olen sitä mieltä, että'.",
    teacherTipVi: "Dùng ít nhất 2 từ liên kết mỗi đoạn. Tránh lặp: nếu đầu bài đã dùng 'mielestäni', cuối bài hãy dùng 'kannatan' hoặc 'olen sitä mieltä, että'.",
  },
  {
    id: "write-valitus",
    type: "valitus",
    title: "Valituskirje — Complaint letter",
    promptFi:
      "Ostit netistä kengät, mutta ne saapuivat rikkoutuneina. Kirjoita valituskirje yritykselle. Pyydä uudet kengät tai rahat takaisin.",
    promptVi:
      "Bạn mua giày online nhưng giao hàng bị hỏng. Hãy viết thư khiếu nại yêu cầu đổi hoặc hoàn tiền.",
    minWords: 80,
    timeMinutes: 25,
    structure: [
      { step: "1. Tervehdys", stepFi: "Muodollinen tervehdys", example: "Hyvä asiakaspalvelu," },
      { step: "2. Tilanne", stepFi: "Selitä mitä ostit ja milloin", example: "Tilasin teiltä mustat kengät 5.6. (tilausnumero 12345)." },
      { step: "3. Ongelma", stepFi: "Kuvaile ongelma tarkasti", example: "Paketti saapui eilen, mutta kengät olivat rikki: oikean kengän pohja oli irronnut." },
      { step: "4. Vaatimus", stepFi: "Mitä haluat (uudet/rahat)", example: "Pyydän, että lähetätte uudet kengät tai palautatte rahani." },
      { step: "5. Lopetus", stepFi: "Kohtelias loppu + yhteystiedot", example: "Odotan vastaustanne viikon kuluessa. Ystävällisin terveisin, Mai" },
    ],
    phrases: [
      { fi: "Tilasin teiltä…", meaning: "I ordered from you…" },
      { fi: "Valitettavasti…", meaning: "Unfortunately…" },
      { fi: "Pyydän, että…", meaning: "I request that…" },
      { fi: "Odotan vastaustanne…", meaning: "I look forward to your reply…" },
      { fi: "Ystävällisin terveisin", meaning: "Best regards" },
    ],
    teacherTipFi: "Säilytä kohtelias sävy, vaikka olet tyytymätön. Käytä konditionaalia ('haluaisin', 'voisitteko'), se kuulostaa ammattimaiselta.",
    teacherTipVi: "Giữ giọng điệu lịch sự dù bạn không hài lòng. Dùng dạng điều kiện ('haluaisin', 'voisitteko') để nghe chuyên nghiệp hơn.",
  },
];

/* ============================================================
 * SPEAKING — Tilanneharjoitus
 * ============================================================ */
export const B1_SPEAKING: B1SpeakingSituation[] = [
  {
    id: "speak-1",
    title: "Lääkärin vastaanotolla",
    scenarioFi: "Olet lääkärin vastaanotolla. Selitä, mikä sinua vaivaa ja kysy, mitä sinun pitäisi tehdä.",
    scenarioVi: "Bạn đang ở phòng khám. Giải thích triệu chứng và hỏi nên làm gì.",
    taskFi: "Kerro vaiva (1 minuutti), kysy ohjeita, kiitä lopuksi.",
    hintsFi: ["Minulla on…", "Tunnen oloni…", "Mitä minun pitäisi tehdä?", "Tarvitsenko reseptin?"],
    timeMinutes: 3,
    speakingCoachLink: "/speaking-coach/finnish?topic=health",
  },
  {
    id: "speak-2",
    title: "Asunnon vuokraaminen",
    scenarioFi: "Soitat vuokranantajalle ilmoituksesta. Kysy yksityiskohdat ja sovi näytöstä.",
    scenarioVi: "Bạn gọi điện cho chủ nhà từ thông báo cho thuê. Hỏi chi tiết và hẹn xem nhà.",
    taskFi: "Esittele itsesi, kysy 3 kysymystä asunnosta, sovi näyttöaika.",
    hintsFi: ["Hei, näin ilmoituksenne…", "Kuinka monta huonetta…?", "Sisältyykö vuokraan…?", "Voinko nähdä asunnon…?"],
    timeMinutes: 3,
    speakingCoachLink: "/speaking-coach/finnish?topic=housing",
  },
  {
    id: "speak-3",
    title: "Mielipide ilmastonmuutoksesta",
    scenarioFi: "Mitä mieltä olet ilmastonmuutoksesta? Mitä jokainen voi tehdä?",
    scenarioVi: "Bạn nghĩ gì về biến đổi khí hậu? Mỗi người có thể làm gì?",
    taskFi: "Anna mielipide (1 lause), perustele kahdella esimerkillä, ehdota ratkaisu.",
    hintsFi: ["Mielestäni ilmastonmuutos on…", "Esimerkiksi…", "Voimme esimerkiksi vähentää…", "On tärkeää, että…"],
    timeMinutes: 3,
    speakingCoachLink: "/speaking-coach/finnish?topic=opinion",
  },
];

/* ============================================================
 * WORD OF THE DAY pool (rotates by date)
 * ============================================================ */
export const B1_WORD_POOL: B1WordOfDay[] = [
  { fi: "vaikuttaa", partOfSpeech: "verb", meaningEn: "to affect / to influence", meaningVi: "ảnh hưởng",
    exampleFi: "Sää vaikuttaa mielialaan.", exampleEn: "The weather affects mood." },
  { fi: "kehittyä", partOfSpeech: "verb", meaningEn: "to develop", meaningVi: "phát triển",
    exampleFi: "Kielitaitoni kehittyy nopeasti.", exampleEn: "My language skills develop quickly." },
  { fi: "yhteiskunta", partOfSpeech: "noun", meaningEn: "society", meaningVi: "xã hội",
    exampleFi: "Suomalainen yhteiskunta arvostaa tasa-arvoa.", exampleEn: "Finnish society values equality." },
  { fi: "mahdollisuus", partOfSpeech: "noun", meaningEn: "opportunity / possibility", meaningVi: "cơ hội",
    exampleFi: "Sain hienon mahdollisuuden työhön.", exampleEn: "I got a great work opportunity." },
  { fi: "ympäristö", partOfSpeech: "noun", meaningEn: "environment", meaningVi: "môi trường",
    exampleFi: "Meidän pitää suojella ympäristöä.", exampleEn: "We must protect the environment." },
  { fi: "kokemus", partOfSpeech: "noun", meaningEn: "experience", meaningVi: "kinh nghiệm",
    exampleFi: "Minulla on paljon kokemusta opettamisesta.", exampleEn: "I have a lot of teaching experience." },
  { fi: "perustella", partOfSpeech: "verb", meaningEn: "to justify / to give reasons", meaningVi: "biện luận",
    exampleFi: "Voitko perustella mielipiteesi?", exampleEn: "Can you justify your opinion?" },
  { fi: "tärkeä", partOfSpeech: "adjective", meaningEn: "important", meaningVi: "quan trọng",
    exampleFi: "On tärkeää oppia uusia asioita.", exampleEn: "It is important to learn new things." },
  { fi: "vaihtoehto", partOfSpeech: "noun", meaningEn: "alternative / option", meaningVi: "lựa chọn",
    exampleFi: "Meillä on kaksi vaihtoehtoa.", exampleEn: "We have two options." },
  { fi: "luotettava", partOfSpeech: "adjective", meaningEn: "reliable", meaningVi: "đáng tin cậy",
    exampleFi: "Hän on luotettava ystävä.", exampleEn: "He is a reliable friend." },
  { fi: "tavoite", partOfSpeech: "noun", meaningEn: "goal", meaningVi: "mục tiêu",
    exampleFi: "Tavoitteeni on läpäistä YKI-testi.", exampleEn: "My goal is to pass the YKI test." },
  { fi: "huolimatta", partOfSpeech: "postposition", meaningEn: "despite", meaningVi: "mặc dù",
    exampleFi: "Sateesta huolimatta menemme metsään.", exampleEn: "Despite the rain, we go to the forest." },
  { fi: "ratkaisu", partOfSpeech: "noun", meaningEn: "solution", meaningVi: "giải pháp",
    exampleFi: "Etsimme ratkaisua ongelmaan.", exampleEn: "We are looking for a solution to the problem." },
  { fi: "merkittävä", partOfSpeech: "adjective", meaningEn: "significant", meaningVi: "đáng kể",
    exampleFi: "Tämä on merkittävä päätös.", exampleEn: "This is a significant decision." },
];

/** Pick today's word deterministically */
export const getWordOfTheDay = (): B1WordOfDay => {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86_400_000);
  return B1_WORD_POOL[dayOfYear % B1_WORD_POOL.length];
};
