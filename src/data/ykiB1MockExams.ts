/**
 * @file ykiB1MockExams.ts
 * @description 2 đề thi YKI B1 (Keskitaso) hoàn chỉnh — 4 sections mỗi đề.
 *   Reading 50 phút · Listening 30 phút · Writing 70 phút · Speaking 20 phút.
 * @author Teacher Hai (HaiEduTech)
 */

export interface MockReadingPassage {
  id: string;
  title: string;
  type: "news" | "email" | "letter" | "notice" | "advertisement";
  textFi: string;
  questions: { q: string; options: string[]; answer: number; explanationFi: string }[];
}

export interface MockListeningClip {
  id: string;
  title: string;
  scenarioFi: string;
  scriptFi: string;
  questions: { q: string; options: string[]; answer: number }[];
}

export interface MockWritingTask {
  id: string;
  title: string;
  promptFi: string;
  promptVi: string;
  minWords: number;
  maxWords: number;
  type: "mielipide" | "valitus" | "viesti" | "tarina";
  rubric: { criterion: string; description: string }[];
}

export interface MockSpeakingTask {
  id: string;
  title: string;
  scenarioFi: string;
  scenarioVi: string;
  taskFi: string;
  prepTimeSeconds: number;
  speakTimeSeconds: number;
}

export interface YkiB1MockExam {
  id: string;
  title: string;
  titleVi: string;
  difficultyNote: string;
  difficultyNoteVi: string;
  reading: { timeMinutes: number; passages: MockReadingPassage[] };
  listening: { timeMinutes: number; clips: MockListeningClip[] };
  writing: { timeMinutes: number; tasks: MockWritingTask[] };
  speaking: { timeMinutes: number; tasks: MockSpeakingTask[] };
}

const writingRubric = [
  { criterion: "Tehtävän täyttäminen (Task)", description: "Vastaa kysymykseen, riittävä sanamäärä." },
  { criterion: "Sanasto (Vocabulary)", description: "B1-tason monipuolinen sanasto, 'iso' / 'hyvä' vältettävä." },
  { criterion: "Rakenne (Structure)", description: "4 kappaletta, sidesanat, looginen järjestys." },
  { criterion: "Kielioppi (Grammar)", description: "Verbi-aikamuodot, sija-päätteet, persoonapronominit." },
];

/* ============================================================
 * MOCK EXAM 1 — Standard difficulty
 * ============================================================ */
const exam1: YkiB1MockExam = {
  id: "mock-1",
  title: "YKI B1 Mock Exam #1 — Arki ja työ",
  titleVi: "Đề thi mẫu YKI B1 #1 — Đời sống & công việc",
  difficultyNote: "Standard B1 difficulty — themes from daily life and work.",
  difficultyNoteVi: "Độ khó B1 chuẩn — chủ đề đời sống và công việc.",
  reading: {
    timeMinutes: 50,
    passages: [
      {
        id: "m1-r1",
        title: "Ilmoitus: Talon kerhohuone",
        type: "notice",
        textFi:
          "Hyvät asukkaat,\n\nKerhohuone on käytettävissä maanantaista perjantaihin klo 10–22 ja viikonloppuisin klo 12–20. Varaaminen tapahtuu isännöitsijän toimistossa tai sähköpostilla viimeistään 3 päivää ennen tapahtumaa. Käyttömaksu on 15 euroa/ilta. Muista siivota tila käytön jälkeen — muuten peritään 50 euron lisämaksu.\n\nIsännöitsijä Pekka Virtanen",
        questions: [
          {
            q: "Mihin aikaan kerhohuone aukeaa lauantaina?",
            options: ["Klo 10", "Klo 12", "Klo 14", "Klo 18"],
            answer: 1,
            explanationFi: "'viikonloppuisin klo 12–20' = vào cuối tuần mở từ 12 giờ.",
          },
          {
            q: "Kuinka aikaisin pitää varata?",
            options: ["1 päivä ennen", "2 päivää ennen", "3 päivää ennen", "1 viikko ennen"],
            answer: 2,
            explanationFi: "'viimeistään 3 päivää ennen tapahtumaa'.",
          },
          {
            q: "Mitä tapahtuu, jos et siivoa?",
            options: ["Ei mitään", "50 € lisämaksu", "Et saa enää käyttää", "Soittavat poliisille"],
            answer: 1,
            explanationFi: "'muuten peritään 50 euron lisämaksu'.",
          },
        ],
      },
      {
        id: "m1-r2",
        title: "Sähköposti: Lääkäriaika",
        type: "email",
        textFi:
          "Hei Maria,\n\nKiitos viestistäsi. Voin tarjota sinulle ajan keskiviikkona 12.10. klo 14:30. Vastaanotto sijaitsee Kalevankatu 12, 3. kerros. Muista ottaa Kela-kortti mukaan. Jos et pääse paikalle, peruuta aika viimeistään 24 tuntia ennen — muuten peritään 30 euron sakkomaksu.\n\nTerveisin,\nTohtori Lehtinen",
        questions: [
          {
            q: "Milloin Marian aika on?",
            options: ["12.10. klo 13:30", "12.10. klo 14:30", "12.10. klo 15:30", "13.10. klo 14:30"],
            answer: 1,
            explanationFi: "'keskiviikkona 12.10. klo 14:30'.",
          },
          {
            q: "Mitä Marian täytyy tuoda?",
            options: ["Passi", "Henkilökortti", "Kela-kortti", "Reseptit"],
            answer: 2,
            explanationFi: "'Muista ottaa Kela-kortti mukaan'.",
          },
          {
            q: "Milloin pitää viimeistään peruuttaa?",
            options: ["12 h ennen", "24 h ennen", "48 h ennen", "1 viikko ennen"],
            answer: 1,
            explanationFi: "'viimeistään 24 tuntia ennen'.",
          },
        ],
      },
      {
        id: "m1-r3",
        title: "Uutinen: Etätyön suosio kasvaa",
        type: "news",
        textFi:
          "Suomalaisten työelämä on muuttunut merkittävästi viimeisten vuosien aikana. Tuoreen tutkimuksen mukaan yli puolet suomalaisista tekee etätyötä vähintään yhden päivän viikossa. Erityisesti pääkaupunkiseudulla luku on korkea. Työntekijät arvostavat joustavuutta ja säästävät aikaa työmatkoissa. Toisaalta osa kokee, että työ ja vapaa-aika sekoittuvat liikaa. Asiantuntijat suosittelevat selkeitä rajoja kotitoimistossa.",
        questions: [
          {
            q: "Kuinka moni tekee etätyötä viikoittain?",
            options: ["Alle 30 %", "Noin 40 %", "Yli 50 %", "Lähes kaikki"],
            answer: 2,
            explanationFi: "'yli puolet suomalaisista tekee etätyötä'.",
          },
          {
            q: "Miksi etätyötä arvostetaan?",
            options: ["Se on halvempaa", "Joustavuus ja ajansäästö", "Helppoa ystävien kanssa", "Pakollista"],
            answer: 1,
            explanationFi: "'arvostavat joustavuutta ja säästävät aikaa työmatkoissa'.",
          },
          {
            q: "Mikä on etätyön huono puoli?",
            options: ["Liian kallista", "Liian hidasta", "Työ ja vapaa-aika sekoittuvat", "Ei ole netti"],
            answer: 2,
            explanationFi: "'työ ja vapaa-aika sekoittuvat liikaa'.",
          },
          {
            q: "Mitä asiantuntijat suosittelevat?",
            options: ["Lopettaa etätyön", "Selkeitä rajoja", "Tehdä yötyötä", "Muuttaa toimistoon"],
            answer: 1,
            explanationFi: "'Asiantuntijat suosittelevat selkeitä rajoja'.",
          },
        ],
      },
      {
        id: "m1-r4",
        title: "Mainos: Kuntosali Aktiivi",
        type: "advertisement",
        textFi:
          "Tervetuloa Kuntosali Aktiiviin! Avoinna joka päivä klo 6–23. Tarjoamme yli 50 erilaista ryhmäliikuntatuntia viikossa, henkilökohtaista valmennusta ja modernit laitteet. Uusille jäsenille ensimmäinen kuukausi vain 19 euroa! Normaali jäsenmaksu on 49 €/kk. Liittyminen tapahtuu netissä tai paikan päällä. Ei sitoutumista — voit lopettaa milloin vain.",
        questions: [
          {
            q: "Mihin aikaan sali sulkeutuu?",
            options: ["Klo 21", "Klo 22", "Klo 23", "Klo 24"],
            answer: 2,
            explanationFi: "'Avoinna joka päivä klo 6–23'.",
          },
          {
            q: "Kuinka paljon ensimmäinen kuukausi maksaa?",
            options: ["19 €", "29 €", "39 €", "49 €"],
            answer: 0,
            explanationFi: "'Uusille jäsenille ensimmäinen kuukausi vain 19 euroa'.",
          },
          {
            q: "Voiko jäsenyyden lopettaa milloin tahansa?",
            options: ["Ei voi", "Vain vuoden jälkeen", "Kyllä, milloin vain", "6 kuukauden jälkeen"],
            answer: 2,
            explanationFi: "'Ei sitoutumista — voit lopettaa milloin vain'.",
          },
        ],
      },
      {
        id: "m1-r5",
        title: "Virallinen kirje: Verotoimisto",
        type: "letter",
        textFi:
          "Hyvä asiakas,\n\nVerotuksesi on valmis. Saat veronpalautusta 320 euroa, joka maksetaan tilillesi 15.12.2024. Jos sinulla on kysyttävää, ota yhteyttä asiakaspalveluun puhelimitse tai sähköpostilla. Säilytä tämä kirje verotusasiakirjojen kanssa.\n\nVerotoimisto",
        questions: [
          {
            q: "Saako asiakas palautusta vai pitääkö maksaa lisää?",
            options: ["Pitää maksaa lisää", "Saa palautusta", "Ei mitään", "Ei vielä tiedetä"],
            answer: 1,
            explanationFi: "'Saat veronpalautusta 320 euroa'.",
          },
          {
            q: "Milloin raha maksetaan?",
            options: ["Heti", "1.12.", "15.12.", "31.12."],
            answer: 2,
            explanationFi: "'maksetaan tilillesi 15.12.2024'.",
          },
        ],
      },
    ],
  },
  listening: {
    timeMinutes: 30,
    clips: [
      {
        id: "m1-l1",
        title: "Asema: Junalippu",
        scenarioFi: "Asiakas ostaa junalipun aseman lipunmyynnistä.",
        scriptFi:
          "Asiakas: Hei, saanko yhden lipun Tampereelle? Myyjä: Mihin aikaan haluaisit lähteä? Asiakas: Mahdollisimman pian. Myyjä: Seuraava juna lähtee kahdeksantoista nollaviisi. Maksaa 38 euroa. Asiakas: Onko opiskelija-alennusta? Myyjä: On, opiskelija maksaa 26 euroa. Asiakas: Ostan opiskelijaliput.",
        questions: [
          {
            q: "Minne asiakas matkustaa?",
            options: ["Helsinkiin", "Tampereelle", "Turkuun", "Ouluun"],
            answer: 1,
          },
          {
            q: "Mihin aikaan juna lähtee?",
            options: ["18:05", "18:15", "18:50", "19:05"],
            answer: 0,
          },
          {
            q: "Kuinka paljon opiskelijalippu maksaa?",
            options: ["19 €", "26 €", "38 €", "48 €"],
            answer: 1,
          },
        ],
      },
      {
        id: "m1-l2",
        title: "Puhelinkeskustelu: Työhaastattelu",
        scenarioFi: "Yritys soittaa hakijalle ja sopii haastattelusta.",
        scriptFi:
          "Yritys: Hyvää päivää, soitan Yritys Oy:stä. Olemme saaneet hakemuksesi. Hakija: Hei, kiitos soitosta! Yritys: Haluaisimme kutsua sinut haastatteluun ensi viikolla. Sopiiko maanantai klo 10? Hakija: Anteeksi, maanantaina minulla on jo varaus. Olisiko keskiviikko mahdollinen? Yritys: Kyllä, keskiviikko klo 14 sopii hyvin. Osoite on Mannerheimintie 42, neljäs kerros.",
        questions: [
          {
            q: "Miksi yritys soittaa?",
            options: ["Tarjoamaan työtä", "Kutsumaan haastatteluun", "Peruuttamaan haastattelun", "Pyytämään anteeksi"],
            answer: 1,
          },
          {
            q: "Mihin aikaan haastattelu on?",
            options: ["Maanantaina klo 10", "Keskiviikkona klo 10", "Keskiviikkona klo 14", "Perjantaina klo 14"],
            answer: 2,
          },
          {
            q: "Missä kerroksessa toimisto on?",
            options: ["Toinen", "Kolmas", "Neljäs", "Viides"],
            answer: 2,
          },
        ],
      },
      {
        id: "m1-l3",
        title: "Sääennuste",
        scenarioFi: "Radion sääennuste viikonloppua varten.",
        scriptFi:
          "Tervetuloa kuulemaan viikonlopun sääennuste. Lauantaina koko Suomessa on aurinkoista, lämpötila nousee viiteentoista asteeseen. Sunnuntaina sää muuttuu — etelässä sataa vettä iltapäivällä. Pohjoisessa pysyy kuivaa mutta kylmenee — voi olla jopa nolla astetta. Suosittelemme ottamaan sateenvarjon mukaan, jos liikut etelä-Suomessa.",
        questions: [
          {
            q: "Millainen sää on lauantaina?",
            options: ["Sateinen", "Aurinkoinen", "Pilvinen", "Lumisade"],
            answer: 1,
          },
          {
            q: "Missä sataa sunnuntaina?",
            options: ["Pohjoisessa", "Etelässä", "Keskellä", "Ei missään"],
            answer: 1,
          },
          {
            q: "Mikä on pohjoisen lämpötila sunnuntaina?",
            options: ["+15", "+5", "0", "-10"],
            answer: 2,
          },
        ],
      },
      {
        id: "m1-l4",
        title: "Ravintolavaraus",
        scenarioFi: "Asiakas varaa pöydän ravintolasta.",
        scriptFi:
          "Ravintola: Ravintola Aurora, hyvää päivää. Asiakas: Hei, haluaisin varata pöydän neljälle hengelle perjantaiksi. Ravintola: Mihin aikaan? Asiakas: Klo 19. Ravintola: Valitettavasti perjantaina klo 19 ei ole vapaita pöytiä. Olisiko klo 20:30 mahdollinen? Asiakas: Hyvä, otan sen. Ravintola: Saanko nimenne? Asiakas: Karoliina Mäkinen.",
        questions: [
          {
            q: "Kuinka monelle hengelle pöytä varataan?",
            options: ["Kahdelle", "Kolmelle", "Neljälle", "Kuudelle"],
            answer: 2,
          },
          {
            q: "Mihin aikaan pöytä varattiin?",
            options: ["19:00", "19:30", "20:00", "20:30"],
            answer: 3,
          },
        ],
      },
    ],
  },
  writing: {
    timeMinutes: 70,
    tasks: [
      {
        id: "m1-w1",
        title: "Tehtävä 1: Lyhyt viesti (15 min, 40-60 sanaa)",
        promptFi:
          "Olet ostanut uuden puhelimen verkkokaupasta. Puhelin on viallinen. Kirjoita verkkokaupan asiakaspalveluun viesti, jossa: kuvailet ongelman, pyydät vaihtoa tai rahojen palautusta, annat yhteystietosi.",
        promptVi:
          "Bạn vừa mua điện thoại mới qua mạng. Điện thoại bị lỗi. Viết thư cho bộ phận chăm sóc khách hàng: mô tả vấn đề, xin đổi hoặc hoàn tiền, để lại thông tin liên hệ.",
        minWords: 40,
        maxWords: 60,
        type: "valitus",
        rubric: writingRubric,
      },
      {
        id: "m1-w2",
        title: "Tehtävä 2: Mielipidekirjoitus (55 min, 100-150 sanaa)",
        promptFi:
          "Kirjoita mielipidekirjoitus aiheesta: 'Pitäisikö nuorten käyttää sosiaalista mediaa rajoitetusti?' Esitä oma kantasi, anna kaksi perustelua esimerkkien kanssa, ja päätä yhteenvedolla.",
        promptVi:
          "Viết bài nêu ý kiến: 'Thanh thiếu niên có nên giới hạn dùng mạng xã hội?' Trình bày quan điểm, đưa 2 lý lẽ kèm ví dụ, kết bằng tóm tắt.",
        minWords: 100,
        maxWords: 150,
        type: "mielipide",
        rubric: writingRubric,
      },
    ],
  },
  speaking: {
    timeMinutes: 20,
    tasks: [
      {
        id: "m1-s1",
        title: "Osa 1: Itsesi esittely (2 min)",
        scenarioFi: "Tutkija pyytää sinua esittäytymään ja kertomaan itsestäsi.",
        scenarioVi: "Giám khảo yêu cầu bạn tự giới thiệu.",
        taskFi: "Kerro nimesi, mistä olet kotoisin, mitä teet työksesi/opiskelet, perheestäsi ja harrastuksistasi.",
        prepTimeSeconds: 30,
        speakTimeSeconds: 120,
      },
      {
        id: "m1-s2",
        title: "Osa 2: Kuvan kuvaus (3 min)",
        scenarioFi: "Saat kuvan: ihmiset puistossa kesäpäivänä.",
        scenarioVi: "Bạn nhận được hình: mọi người trong công viên ngày hè.",
        taskFi: "Kuvaile kuvaa: keitä siellä on, mitä he tekevät, millainen tunnelma on. Kerro myös, käytkö itse usein puistossa.",
        prepTimeSeconds: 60,
        speakTimeSeconds: 180,
      },
      {
        id: "m1-s3",
        title: "Osa 3: Tilanne — Apteekissa (4 min)",
        scenarioFi: "Sinulla on flunssa. Menet apteekkiin ostamaan lääkkeitä.",
        scenarioVi: "Bạn bị cảm. Đến hiệu thuốc mua thuốc.",
        taskFi: "Kerro oireesi, kysy suosituksia, ota selvää annostuksesta ja hinnasta. Tutkija on apteekkari.",
        prepTimeSeconds: 60,
        speakTimeSeconds: 240,
      },
      {
        id: "m1-s4",
        title: "Osa 4: Mielipide (4 min)",
        scenarioFi: "Aihe: 'Pitäisikö julkisen liikenteen olla ilmaista?'",
        scenarioVi: "Chủ đề: 'Phương tiện công cộng có nên miễn phí?'",
        taskFi: "Esitä mielipiteesi, anna 2-3 perustelua, vastaa tutkijan vastakysymyksiin.",
        prepTimeSeconds: 60,
        speakTimeSeconds: 240,
      },
    ],
  },
};

/* ============================================================
 * MOCK EXAM 2 — Slightly harder
 * ============================================================ */
const exam2: YkiB1MockExam = {
  id: "mock-2",
  title: "YKI B1 Mock Exam #2 — Yhteiskunta ja kulttuuri",
  titleVi: "Đề thi mẫu YKI B1 #2 — Xã hội & văn hóa",
  difficultyNote: "Slightly harder — abstract topics like environment, culture, well-being.",
  difficultyNoteVi: "Khó hơn chút — chủ đề trừu tượng như môi trường, văn hóa, sức khỏe tinh thần.",
  reading: {
    timeMinutes: 50,
    passages: [
      {
        id: "m2-r1",
        title: "Uutinen: Kierrätys Suomessa",
        type: "news",
        textFi:
          "Suomi on yksi Euroopan parhaita kierrättäjiä. Yli 80 prosenttia kotitalouksien jätteestä kierrätetään. Eniten kierrätetään lasia ja paperia, mutta muovin määrä kasvaa nopeasti. Tutkijat kuitenkin huomauttavat, että suomalaiset tuottavat edelleen liikaa pakkausjätettä. Ratkaisuksi ehdotetaan vähemmän pakkauksia kaupoissa ja kuluttajien tietoisuuden lisäämistä.",
        questions: [
          {
            q: "Kuinka paljon jätettä kierrätetään?",
            options: ["50 %", "70 %", "Yli 80 %", "100 %"],
            answer: 2,
            explanationFi: "'Yli 80 prosenttia kotitalouksien jätteestä kierrätetään'.",
          },
          {
            q: "Mitä kierrätetään eniten?",
            options: ["Muovi ja metalli", "Lasi ja paperi", "Pakkaukset", "Elektroniikka"],
            answer: 1,
            explanationFi: "'Eniten kierrätetään lasia ja paperia'.",
          },
          {
            q: "Mikä on suomalaisten ongelma?",
            options: ["Liikaa pakkausjätettä", "Liian vähän tilaa", "Ei rahaa", "Ei tietoa"],
            answer: 0,
            explanationFi: "'tuottavat edelleen liikaa pakkausjätettä'.",
          },
        ],
      },
      {
        id: "m2-r2",
        title: "Sähköposti: Kurssipaikan peruutus",
        type: "email",
        textFi:
          "Hei,\n\nValitettavasti minun täytyy peruuttaa paikkani 'Suomi B2' -kurssilta, joka alkaa 5.2. Olen löytänyt uuden työn, joka alkaa samalla viikolla, ja työaikataulu ei salli kurssia. Olen pahoillani lyhyestä varoitusajasta. Saanko kurssimaksun takaisin vai siirtyykö paikkani seuraavalle kurssille?\n\nYstävällisin terveisin,\nLeena Korhonen",
        questions: [
          {
            q: "Mikä on viestin tarkoitus?",
            options: ["Ilmoittautua kurssille", "Peruuttaa kurssipaikka", "Vaihtaa kurssia", "Kysyä aikatauluista"],
            answer: 1,
            explanationFi: "'minun täytyy peruuttaa paikkani'.",
          },
          {
            q: "Miksi Leena ei voi tulla kurssille?",
            options: ["Sairas", "Uusi työ", "Liian kallis", "Liian vaikea"],
            answer: 1,
            explanationFi: "'Olen löytänyt uuden työn'.",
          },
          {
            q: "Mitä Leena toivoo?",
            options: ["Maksun palautusta tai paikan siirtoa", "Vain anteeksipyyntöä", "Vaihtoehtoja", "Tapaamista"],
            answer: 0,
            explanationFi: "'Saanko kurssimaksun takaisin vai siirtyykö paikkani'.",
          },
        ],
      },
      {
        id: "m2-r3",
        title: "Artikkeli: Liikunnan merkitys mielenterveydelle",
        type: "news",
        textFi:
          "Tutkimukset osoittavat, että säännöllinen liikunta vähentää masennusta ja ahdistusta. Jo 30 minuuttia kävelyä päivässä parantaa mielialaa selvästi. Liikunta lisää endorfiinin tuotantoa, joka tunnetaan 'onnellisuushormonina'. Erityisesti ulkona liikkuminen luonnossa tehostaa hyötyjä. Asiantuntijat suosittelevat aikuisille vähintään 150 minuuttia kohtuullista liikuntaa viikossa. Tärkeintä ei ole laji vaan säännöllisyys.",
        questions: [
          {
            q: "Kuinka kauan kävelyä riittää päivässä?",
            options: ["10 min", "20 min", "30 min", "60 min"],
            answer: 2,
            explanationFi: "'Jo 30 minuuttia kävelyä päivässä'.",
          },
          {
            q: "Mikä on 'onnellisuushormoni'?",
            options: ["Adrenaliini", "Insuliini", "Endorfiini", "Melatoniini"],
            answer: 2,
            explanationFi: "'endorfiinin tuotantoa, joka tunnetaan onnellisuushormonina'.",
          },
          {
            q: "Mikä on tärkeintä liikunnassa?",
            options: ["Laji", "Säännöllisyys", "Voima", "Nopeus"],
            answer: 1,
            explanationFi: "'Tärkeintä ei ole laji vaan säännöllisyys'.",
          },
          {
            q: "Kuinka paljon liikuntaa viikossa suositellaan?",
            options: ["50 min", "100 min", "150 min", "300 min"],
            answer: 2,
            explanationFi: "'vähintään 150 minuuttia kohtuullista liikuntaa viikossa'.",
          },
        ],
      },
      {
        id: "m2-r4",
        title: "Ilmoitus: Kirjastokortin uudistus",
        type: "notice",
        textFi:
          "Hyvät asiakkaat! Vanhat kirjastokortit poistuvat käytöstä 31.3.2025. Uuden kortin saa veloituksetta lähimmästä kirjastosta. Tarvitset henkilöllisyystodistuksen ja osoitetiedot. Lapset alle 15 vuotta tarvitsevat huoltajan suostumuksen. Uusi kortti toimii kaikissa pääkaupunkiseudun kirjastoissa.",
        questions: [
          {
            q: "Milloin vanhat kortit lakkaavat toimimasta?",
            options: ["1.1.2025", "31.3.2025", "30.6.2025", "31.12.2025"],
            answer: 1,
            explanationFi: "'Vanhat kirjastokortit poistuvat käytöstä 31.3.2025'.",
          },
          {
            q: "Maksaako uusi kortti?",
            options: ["Kyllä, 5 €", "Kyllä, 10 €", "Veloituksetta", "Vain aikuisille maksullinen"],
            answer: 2,
            explanationFi: "'Uuden kortin saa veloituksetta'.",
          },
          {
            q: "Mitä alle 15-vuotias tarvitsee?",
            options: ["Passin", "Huoltajan suostumuksen", "Koulukortin", "Veroilmoituksen"],
            answer: 1,
            explanationFi: "'Lapset alle 15 vuotta tarvitsevat huoltajan suostumuksen'.",
          },
        ],
      },
    ],
  },
  listening: {
    timeMinutes: 30,
    clips: [
      {
        id: "m2-l1",
        title: "Matkatoimisto: Lomamatka",
        scenarioFi: "Asiakas varaa kesäloman matkatoimistosta.",
        scriptFi:
          "Asiakas: Hei, etsin lomamatkaa kesäkuulle. Myyjä: Mihin haluaisitte matkustaa? Asiakas: Kreikkaan. Myyjä: Meillä on hyvä paketti Kreetalle, viikko maksaa 580 euroa per henkilö. Sisältää lennot ja hotellin. Asiakas: Sisältyykö ruoka? Myyjä: Aamupala sisältyy. Asiakas: Hyvä, varaan kahdelle hengelle.",
        questions: [
          {
            q: "Minne asiakas haluaa matkustaa?",
            options: ["Italiaan", "Espanjaan", "Kreikkaan", "Ranskaan"],
            answer: 2,
          },
          {
            q: "Kuinka paljon matka maksaa per henkilö?",
            options: ["480 €", "580 €", "680 €", "780 €"],
            answer: 1,
          },
          {
            q: "Mitä ruokaa hintaan sisältyy?",
            options: ["Ei mitään", "Aamupala", "Aamiainen ja päivällinen", "Kaikki ateriat"],
            answer: 1,
          },
        ],
      },
      {
        id: "m2-l2",
        title: "Yliopiston tiedote",
        scenarioFi: "Yliopiston henkilökunta antaa tärkeää tietoa opiskelijoille.",
        scriptFi:
          "Hyvät opiskelijat! Muistuttakaa, että kevään ilmoittautuminen sulkeutuu perjantaina kahdeskymmenes maaliskuuta. Jos ette ilmoittaudu ajoissa, menetätte opintotuen. Kevätlukukauden kurssit alkavat ensi viikon maanantaina. Lukujärjestykset löytyvät kotisivuilta. Onnea opintoihin!",
        questions: [
          {
            q: "Milloin ilmoittautuminen sulkeutuu?",
            options: ["10.3.", "20.3.", "30.3.", "1.4."],
            answer: 1,
          },
          {
            q: "Mitä menettää, jos ei ilmoittaudu?",
            options: ["Kurssipaikan", "Opintotuen", "Kirjastokortin", "Asunnon"],
            answer: 1,
          },
          {
            q: "Milloin kurssit alkavat?",
            options: ["Tänään", "Huomenna", "Ensi viikon maanantaina", "Kuukauden päästä"],
            answer: 2,
          },
        ],
      },
      {
        id: "m2-l3",
        title: "Naapurin pyyntö",
        scenarioFi: "Naapuri pyytää apua viikonloppuna.",
        scriptFi:
          "Naapuri: Hei! Voisitko tehdä pienen palveluksen viikonloppuna? Lähden Tukholmaan kahdeksi päiväksi. Voisitko ruokkia kissaani? Sinä: Tietenkin! Mihin aikaan? Naapuri: Aamulla kahdeksan ja illalla kuusi riittää. Avain on portaikossa rappukäytävässä. Sinä: Selvä, hoidan asian.",
        questions: [
          {
            q: "Kuinka kauan naapuri on poissa?",
            options: ["Yhden päivän", "Kaksi päivää", "Viikonlopun", "Viikon"],
            answer: 1,
          },
          {
            q: "Mitä naapuri pyytää?",
            options: ["Siivota asunto", "Hakea posti", "Ruokkia kissan", "Kastella kukat"],
            answer: 2,
          },
          {
            q: "Mihin aikaan iltaruoka annetaan?",
            options: ["17:00", "18:00", "19:00", "20:00"],
            answer: 1,
          },
        ],
      },
    ],
  },
  writing: {
    timeMinutes: 70,
    tasks: [
      {
        id: "m2-w1",
        title: "Tehtävä 1: Viesti ystävälle (15 min, 40-60 sanaa)",
        promptFi:
          "Et voi tulla ystäväsi syntymäpäiville lauantaina. Kirjoita viesti, jossa: kerrot syyn, pahoittelet, ehdotat tapaamista myöhemmin.",
        promptVi:
          "Bạn không thể tới sinh nhật bạn vào thứ 7. Viết tin nhắn: kể lý do, xin lỗi, đề nghị gặp lúc khác.",
        minWords: 40,
        maxWords: 60,
        type: "viesti",
        rubric: writingRubric,
      },
      {
        id: "m2-w2",
        title: "Tehtävä 2: Mielipidekirjoitus (55 min, 100-150 sanaa)",
        promptFi:
          "Aihe: 'Onko tärkeämpää opiskella vieraita kieliä vai matematiikkaa?' Esitä mielipiteesi, perustele kahdella esimerkillä, lopeta yhteenvedolla.",
        promptVi:
          "Chủ đề: 'Học ngoại ngữ hay toán quan trọng hơn?' Bày tỏ ý kiến, dẫn 2 ví dụ, kết bằng tóm tắt.",
        minWords: 100,
        maxWords: 150,
        type: "mielipide",
        rubric: writingRubric,
      },
    ],
  },
  speaking: {
    timeMinutes: 20,
    tasks: [
      {
        id: "m2-s1",
        title: "Osa 1: Päivittäinen rutiini (2 min)",
        scenarioFi: "Kerro tavallisesta päivästäsi.",
        scenarioVi: "Kể về một ngày bình thường của bạn.",
        taskFi: "Kerro: mihin aikaan heräät, mitä teet aamulla, mitä syöt, mitä teet iltapäivällä, miten vietät iltaa.",
        prepTimeSeconds: 30,
        speakTimeSeconds: 120,
      },
      {
        id: "m2-s2",
        title: "Osa 2: Kuvan kuvaus (3 min)",
        scenarioFi: "Saat kuvan: perheen joulujuhla pöydän ympärillä.",
        scenarioVi: "Bạn nhận hình: bữa tiệc Giáng sinh quanh bàn ăn.",
        taskFi: "Kuvaile kuvaa: keitä on, mitä he tekevät, millaista ruokaa pöydällä on. Kerro myös, miten itse vietät joulua.",
        prepTimeSeconds: 60,
        speakTimeSeconds: 180,
      },
      {
        id: "m2-s3",
        title: "Osa 3: Tilanne — Vuokranantaja (4 min)",
        scenarioFi: "Asunnossasi on rikkinäinen vesihana. Soitat vuokranantajalle.",
        scenarioVi: "Vòi nước trong căn hộ bị hỏng. Bạn gọi cho chủ nhà.",
        taskFi: "Selitä ongelma, pyydä korjaajaa, sovi aika. Tutkija on vuokranantaja.",
        prepTimeSeconds: 60,
        speakTimeSeconds: 240,
      },
      {
        id: "m2-s4",
        title: "Osa 4: Vapaa keskustelu (4 min)",
        scenarioFi: "Aihe: 'Pitäisikö lapsille opettaa kieliä jo päiväkodissa?'",
        scenarioVi: "Chủ đề: 'Có nên dạy ngoại ngữ cho trẻ từ mầm non?'",
        taskFi: "Esitä mielipiteesi, anna perusteluja, ole valmis vastaamaan vastakysymyksiin.",
        prepTimeSeconds: 60,
        speakTimeSeconds: 240,
      },
    ],
  },
};

export const YKI_B1_MOCK_EXAMS: YkiB1MockExam[] = [exam1, exam2];
