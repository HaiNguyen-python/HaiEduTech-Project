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
    id: "read-4",
    title: "Uutinen: Suomalaiset ja sauna",
    type: "news",
    timeMinutes: 7,
    textFi:
      "Tutkimuksen mukaan yli 80 prosenttia suomalaisista käy saunassa vähintään kerran viikossa. Sauna on tärkeä osa suomalaista kulttuuria — se on paikka, jossa rentoudutaan, jutellaan ja jopa pidetään työpalavereita. Erityisen suosittu on perinteinen puulämmitteinen sauna, vaikka kaupungeissa sähkösauna on yleisempi. Monet suomalaiset sanovat, että ilman saunaa heidän viikkonsa tuntuisi vaillinaiselta.",
    hintVi: "Tin tức về văn hoá tắm sauna của người Phần Lan.",
    questions: [
      { q: "Kuinka usein suomalaiset käyvät saunassa?", options: ["Kerran kuukaudessa", "Vähintään kerran viikossa", "Joka päivä", "Vain kesällä"], answer: 1, explanationFi: "'vähintään kerran viikossa' = at least once a week." },
      { q: "Mikä sauna on suosituin?", options: ["Sähkösauna", "Höyrysauna", "Puulämmitteinen sauna", "Infrapunasauna"], answer: 2, explanationFi: "'Erityisen suosittu on perinteinen puulämmitteinen sauna'." },
      { q: "Mitä saunassa ei tekstin mukaan tehdä?", options: ["Rentoudutaan", "Jutellaan", "Pidetään palavereita", "Syödään päivällinen"], answer: 3, explanationFi: "Teksti mainitsee rentoutumisen, juttelun ja palaverit — ei päivällistä." },
    ],
  },
  {
    id: "read-5",
    title: "Ilmoitus: Kierrätys taloyhtiössä",
    type: "notice",
    timeMinutes: 5,
    textFi:
      "Hyvät asukkaat! Talon piha-alueelle on asennettu uudet kierrätysastiat. Muovi, lasi ja paperi on lajiteltava omiin astioihinsa. Sekajätettä saa laittaa vain mustaan astiaan. Pahvilaatikot on litistettävä ennen astiaan laittamista. Kiitos yhteistyöstä! — Taloyhtiön hallitus",
    hintVi: "Thông báo về phân loại rác tại chung cư.",
    questions: [
      { q: "Mihin astiaan menee sekajäte?", options: ["Vihreään", "Mustaan", "Siniseen", "Keltaiseen"], answer: 1, explanationFi: "'Sekajätettä saa laittaa vain mustaan astiaan'." },
      { q: "Mitä pahvilaatikoille pitää tehdä?", options: ["Polttaa", "Pestä", "Litistää", "Heittää roskiin"], answer: 2, explanationFi: "'Pahvilaatikot on litistettävä'." },
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
    id: "listen-3",
    title: "Pankissa",
    scenarioFi: "Asiakas avaa pankkitilin Suomessa.",
    durationSeconds: 45,
    scriptFi:
      "Virkailija: Hyvää päivää, miten voin auttaa? Asiakas: Haluaisin avata pankkitilin. Virkailija: Onko sinulla suomalainen henkilötunnus? Asiakas: Kyllä, sain sen viime kuussa. Virkailija: Hienoa. Tarvitsen myös passin tai oleskeluluvan. Asiakas: Tässä on passini. Virkailija: Kiitos. Tilin avaaminen kestää noin 15 minuuttia.",
    questions: [
      { q: "Mitä asiakas haluaa tehdä?", options: ["Sulkea tilin", "Avata pankkitilin", "Nostaa rahaa", "Vaihtaa valuuttaa"], answer: 1 },
      { q: "Mitä asiakas antaa virkailijalle?", options: ["Ajokortin", "Passin", "Henkilökortin", "Opiskelijakortin"], answer: 1 },
      { q: "Kuinka kauan tilin avaaminen kestää?", options: ["5 min", "10 min", "15 min", "30 min"], answer: 2 },
    ],
  },
  {
    id: "listen-4",
    title: "Lapsen päiväkodissa",
    scenarioFi: "Vanhempi keskustelee päiväkodin opettajan kanssa.",
    durationSeconds: 40,
    scriptFi:
      "Opettaja: Hei! Miten Mai voi tänään? Vanhempi: Hän on vähän väsynyt, mutta muuten hyvin. Opettaja: Selvä. Tänään leikimme ulkona ja syömme kalakeittoa. Vanhempi: Hienoa. Voiko Mai nukkua päiväunet hieman pidempään? Opettaja: Tietenkin, järjestämme sen.",
    questions: [
      { q: "Mitä päiväkodissa syödään tänään?", options: ["Pizzaa", "Kalakeittoa", "Riisiä", "Pastaa"], answer: 1 },
      { q: "Mitä vanhempi pyytää?", options: ["Pidempiä päiväunia", "Vähemmän leikkiä", "Ulkoilua", "Lääkettä"], answer: 0 },
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
  {
    id: "write-email-formal",
    type: "mielipide",
    title: "Muodollinen sähköposti — Formal email",
    promptFi:
      "Kirjoita sähköposti opettajallesi. Pyydä lisäaikaa kotitehtävän palauttamiseen ja perustele syy.",
    promptVi: "Viết email cho giáo viên xin gia hạn nộp bài tập và giải thích lý do.",
    minWords: 80,
    timeMinutes: 20,
    structure: [
      { step: "1. Aihe", stepFi: "Selkeä otsikko", example: "Aihe: Lisäaika kotitehtävälle" },
      { step: "2. Tervehdys", stepFi: "Muodollinen", example: "Hyvä opettaja Virtanen," },
      { step: "3. Syy", stepFi: "Lyhyt selitys", example: "Olen ollut sairaana koko viikon ja en ehtinyt valmistella tehtävää ajoissa." },
      { step: "4. Pyyntö", stepFi: "Konkreettinen", example: "Voisinko saada lisäaikaa ensi maanantaihin asti?" },
      { step: "5. Lopetus", stepFi: "Kohtelias", example: "Ymmärtäväisyydestänne kiittäen, Mai" },
    ],
    phrases: [
      { fi: "Hyvä opettaja…", meaning: "Dear teacher…" },
      { fi: "Valitettavasti en ole voinut…", meaning: "Unfortunately I have not been able to…" },
      { fi: "Voisitteko ystävällisesti…", meaning: "Could you kindly…" },
      { fi: "Pahoittelen vaivaa", meaning: "I apologize for the inconvenience" },
      { fi: "Kiittäen", meaning: "With thanks" },
    ],
    teacherTipFi: "Pidä viesti lyhyenä — opettajat lukevat satoja sähköposteja. Yksi syy + yksi pyyntö riittää.",
    teacherTipVi: "Giữ email ngắn gọn — giáo viên đọc hàng trăm email. Một lý do + một yêu cầu là đủ.",
  },
  {
    id: "write-blog",
    type: "mielipide",
    title: "Blogiteksti — Blog post",
    promptFi:
      "Kirjoita blogiteksti aiheesta 'Paras matkani Suomeen'. Kerro mitä teit, mistä pidit ja mitä opit.",
    promptVi: "Viết bài blog 'Chuyến đi Phần Lan đáng nhớ nhất của tôi'. Kể bạn đã làm gì, thích gì và học được gì.",
    minWords: 100,
    timeMinutes: 30,
    structure: [
      { step: "1. Otsikko", stepFi: "Houkutteleva", example: "Kolme päivää Lapissa — unohtumaton kokemus" },
      { step: "2. Aloitus", stepFi: "Aseta lukija mukaan", example: "Viime talvena matkustin Lappiin perheeni kanssa." },
      { step: "3. Tarina", stepFi: "Kerro 2–3 muistoa", example: "Näimme revontulia ja ajoimme moottorikelkalla." },
      { step: "4. Tunteet", stepFi: "Mitä tunsit", example: "Olin yllättynyt, kuinka hiljainen metsä oli." },
      { step: "5. Lopetus", stepFi: "Mitä opit / suosittelu", example: "Suosittelen Lappia kaikille, jotka rakastavat luontoa." },
    ],
    phrases: [
      { fi: "Yksi parhaista hetkistä oli…", meaning: "One of the best moments was…" },
      { fi: "En koskaan unohda…", meaning: "I will never forget…" },
      { fi: "Yllätyksekseni…", meaning: "To my surprise…" },
      { fi: "Lopuksi haluan sanoa…", meaning: "Finally I want to say…" },
      { fi: "Suosittelen lämpimästi…", meaning: "I warmly recommend…" },
    ],
    teacherTipFi: "Käytä menneitä aikoja (imperfekti) ja lisää aistihavaintoja: värit, äänet, tuoksut. Se elävöittää kerronnan.",
    teacherTipVi: "Dùng thì quá khứ (imperfekti) và thêm cảm giác: màu sắc, âm thanh, mùi vị. Sẽ làm bài sống động hơn.",
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
    id: "speak-4",
    title: "Ravintolassa tilaaminen",
    scenarioFi: "Olet ravintolassa ystäväsi kanssa. Tilaa ruoka ja juoma, kysy suosituksia.",
    scenarioVi: "Bạn ở nhà hàng cùng bạn. Gọi món, hỏi gợi ý.",
    taskFi: "Tervehdi tarjoilijaa, kysy suosituksia, tilaa, kiitä.",
    hintsFi: ["Mitä suosittelette tänään?", "Onko teillä kasvisruokaa?", "Otan…, kiitos", "Voinko saada laskun?"],
    timeMinutes: 3,
    speakingCoachLink: "/speaking-coach/finnish?topic=restaurant",
  },
  {
    id: "speak-5",
    title: "Työkokemuksesta puhuminen",
    scenarioFi: "Kerro työkokemuksestasi: missä olet työskennellyt, mitä teit, mitä opit.",
    scenarioVi: "Kể về kinh nghiệm làm việc: ở đâu, làm gì, học được gì.",
    taskFi: "Esittele itsesi, kerro 2 työpaikkaa, kerro mitä opit.",
    hintsFi: ["Olen työskennellyt…", "Vastuullani oli…", "Opin paljon…", "Tulevaisuudessa haluan…"],
    timeMinutes: 4,
    speakingCoachLink: "/speaking-coach/finnish?topic=work",
  },
  {
    id: "speak-6",
    title: "Kaupungin esittely",
    scenarioFi: "Esittele kotikaupunkisi ulkomaalaiselle ystävälle: mitä siellä voi tehdä?",
    scenarioVi: "Giới thiệu thành phố quê hương cho bạn nước ngoài: có gì để làm?",
    taskFi: "Mainitse 3 nähtävyyttä, kerro paras vuodenaika vierailulle, suosittele ruokaa.",
    hintsFi: ["Kotikaupunkini on…", "Suosittelen vierailemaan…", "Erityisen kuuluisa on…", "Paras aika tulla on…"],
    timeMinutes: 4,
    speakingCoachLink: "/speaking-coach/finnish?topic=city",
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
  { fi: "saavuttaa", partOfSpeech: "verb", meaningEn: "to achieve", meaningVi: "đạt được",
    exampleFi: "Hän saavutti unelmansa.", exampleEn: "She achieved her dream." },
  { fi: "yhteistyö", partOfSpeech: "noun", meaningEn: "cooperation", meaningVi: "hợp tác",
    exampleFi: "Yhteistyö on tärkeää työpaikalla.", exampleEn: "Cooperation is important at work." },
  { fi: "edistää", partOfSpeech: "verb", meaningEn: "to promote / advance", meaningVi: "thúc đẩy",
    exampleFi: "Liikunta edistää terveyttä.", exampleEn: "Exercise promotes health." },
  { fi: "haaste", partOfSpeech: "noun", meaningEn: "challenge", meaningVi: "thử thách",
    exampleFi: "Uusi työ on iso haaste.", exampleEn: "The new job is a big challenge." },
  { fi: "muuttua", partOfSpeech: "verb", meaningEn: "to change (intrans.)", meaningVi: "thay đổi",
    exampleFi: "Sää muuttuu nopeasti.", exampleEn: "The weather changes quickly." },
  { fi: "tutkimus", partOfSpeech: "noun", meaningEn: "research / study", meaningVi: "nghiên cứu",
    exampleFi: "Tutkimuksen mukaan kahvi on terveellistä.", exampleEn: "According to research, coffee is healthy." },
  { fi: "vaatia", partOfSpeech: "verb", meaningEn: "to require / demand", meaningVi: "đòi hỏi",
    exampleFi: "Tämä työ vaatii kärsivällisyyttä.", exampleEn: "This job requires patience." },
  { fi: "vapaaehtoinen", partOfSpeech: "adjective/noun", meaningEn: "voluntary / volunteer", meaningVi: "tự nguyện / tình nguyện viên",
    exampleFi: "Hän työskentelee vapaaehtoisena.", exampleEn: "She works as a volunteer." },
  { fi: "väittää", partOfSpeech: "verb", meaningEn: "to claim / argue", meaningVi: "khẳng định",
    exampleFi: "Hän väittää, että uutinen on totta.", exampleEn: "He claims the news is true." },
  { fi: "huomata", partOfSpeech: "verb", meaningEn: "to notice", meaningVi: "nhận thấy",
    exampleFi: "Huomasin, että ovi oli auki.", exampleEn: "I noticed that the door was open." },
  { fi: "palvelu", partOfSpeech: "noun", meaningEn: "service", meaningVi: "dịch vụ",
    exampleFi: "Asiakaspalvelu oli erinomaista.", exampleEn: "Customer service was excellent." },
  { fi: "tiedotus", partOfSpeech: "noun", meaningEn: "information / announcement", meaningVi: "thông báo",
    exampleFi: "Saimme tärkeän tiedotuksen koululta.", exampleEn: "We got an important notice from school." },
];

/* ============================================================
 * Merge expansion content (extra reading, listening, writing, speaking, vocab)
 * ============================================================ */
import {
  B1_READING_EXPANSION,
  B1_LISTENING_EXPANSION,
  B1_WRITING_EXPANSION,
  B1_SPEAKING_EXPANSION,
  B1_WORD_POOL_EXPANSION,
} from "./ykiB1Expansion";
import {
  B1_READING_EXPANSION2,
  B1_LISTENING_EXPANSION2,
  B1_WRITING_EXPANSION2,
  B1_SPEAKING_EXPANSION2,
  B1_WORD_POOL_EXPANSION2,
} from "./ykiB1Expansion2";

export const B1_READING_ALL: B1ReadingPassage[] = [...B1_READING, ...B1_READING_EXPANSION, ...B1_READING_EXPANSION2];
export const B1_LISTENING_ALL: B1ListeningClip[] = [...B1_LISTENING, ...B1_LISTENING_EXPANSION, ...B1_LISTENING_EXPANSION2];
export const B1_WRITING_ALL: B1WritingTemplate[] = [...B1_WRITING, ...B1_WRITING_EXPANSION, ...B1_WRITING_EXPANSION2];
export const B1_SPEAKING_ALL: B1SpeakingSituation[] = [...B1_SPEAKING, ...B1_SPEAKING_EXPANSION, ...B1_SPEAKING_EXPANSION2];
export const B1_WORD_POOL_ALL: B1WordOfDay[] = [...B1_WORD_POOL, ...B1_WORD_POOL_EXPANSION, ...B1_WORD_POOL_EXPANSION2];

/** Pick today's word deterministically (rotates over full pool incl. expansion) */
export const getWordOfTheDay = (): B1WordOfDay => {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86_400_000);
  return B1_WORD_POOL_ALL[dayOfYear % B1_WORD_POOL_ALL.length];
};
