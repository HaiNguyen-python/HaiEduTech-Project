/**
 * @file ykiB1Expansion4.ts
 * @description Mở rộng ngân hàng bài tập YKI B1 — bộ 4: 3 Reading + 3 Listening + 3 Writing + 3 Speaking.
 *              Phủ đều 4 chủ đề: Cuộc sống ở Phần Lan, Công việc & học tập, Sức khỏe & dịch vụ, Văn hóa & xã hội.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

import type {
  B1ReadingPassage,
  B1ListeningClip,
  B1WritingTemplate,
  B1SpeakingSituation,
} from "./ykiB1Data";

/* ============================================================
 * READING — 3 bài (cuộc sống ở Phần Lan, công việc, văn hóa)
 * ============================================================ */
export const B1_READING_EXP4: B1ReadingPassage[] = [
  {
    id: "read-exp4-1",
    title: "Uutinen: Lumen tulo viivästyy etelässä",
    type: "news",
    timeMinutes: 7,
    textFi:
      "Tänä vuonna lunta on satanut Etelä-Suomessa odotettua vähemmän. Ilmatieteen laitoksen mukaan keskilämpötila marraskuussa oli kolme astetta tavallista korkeampi. Hiihtokeskukset ovat joutuneet käynnistämään lumitykit aikaisemmin kuin koskaan. Monet asukkaat valittavat, että pimeä syksy ilman lunta tuntuu raskaalta. Toisaalta kaupungin työntekijät iloitsevat, koska auraustyöt ovat vähentyneet ja kunta säästää rahaa.",
    hintVi: "Tin tức: tuyết đến muộn ở miền Nam Phần Lan, ảnh hưởng tâm lý và ngân sách thành phố.",
    questions: [
      { q: "Millainen marraskuun lämpötila oli?", options: ["Tavallista kylmempi", "Tavallista lämpimämpi", "Sama kuin yleensä", "Erittäin kylmä"], answer: 1, explanationFi: "'keskilämpötila marraskuussa oli kolme astetta tavallista korkeampi'.", hintVi: "Cao hơn 3 độ so với bình thường." },
      { q: "Mitä hiihtokeskukset tekivät?", options: ["Sulkivat ovensa", "Käynnistivät lumitykit aikaisin", "Nostivat hintoja", "Vaihtoivat lajia"], answer: 1, explanationFi: "'käynnistämään lumitykit aikaisemmin kuin koskaan'." },
      { q: "Miksi kaupungin työntekijät ovat tyytyväisiä?", options: ["Saavat lomaa", "Auraustyöt ovat vähentyneet", "Palkka nousi", "Lunta tuli paljon"], answer: 1, explanationFi: "'auraustyöt ovat vähentyneet ja kunta säästää rahaa'." },
      { q: "Missä lunta on satanut odotettua vähemmän?", options: ["Pohjois-Suomessa", "Koko Suomessa", "Etelä-Suomessa", "Lapissa"], answer: 2, explanationFi: "Tekstin mukaan lunta on satanut odotettua vähemmän 'Etelä-Suomessa'." },
      { q: "Mitä asukkaat valittavat?", options: ["Kallista sähköä", "Pimeää syksyä ilman lunta", "Liikaa lunta", "Lumitykkien meteliä"], answer: 1, explanationFi: "Tekstissä mainitaan, että 'Monet asukkaat valittavat, että pimeä syksy ilman lunta tuntuu raskaalta.'" },
      { q: "Kuka säästää rahaa?", options: ["Hiihtokeskukset", "Ilmatieteen laitos", "Kunta", "Asukkaat"], answer: 2, explanationFi: "Tekstin lopussa sanotaan 'kunta säästää rahaa', koska auraustyöt ovat vähentyneet." }
    ],
  },
  {
    id: "read-exp4-2",
    title: "Sähköposti: Kutsu työhaastatteluun",
    type: "email",
    timeMinutes: 5,
    textFi:
      "Hei Minh,\n\nKiitos hakemuksestasi myyjän paikkaa varten. Olemme iloisia voidessamme kutsua sinut haastatteluun keskiviikkona 22.1. klo 14.00 toimistollemme osoitteeseen Aleksanterinkatu 12, Helsinki. Haastattelu kestää noin 45 minuuttia. Otathan mukaasi henkilöllisyystodistuksen ja tutkintotodistuksesi kopion. Vahvista osallistumisesi vastaamalla tähän viestiin viimeistään perjantaina.\n\nYstävällisin terveisin,\nKaisa Lehtonen, HR",
    hintVi: "Email mời phỏng vấn vị trí nhân viên bán hàng — thời gian, địa điểm, giấy tờ cần mang.",
    questions: [
      { q: "Milloin haastattelu on?", options: ["Tiistaina 21.1.", "Keskiviikkona 22.1.", "Torstaina 23.1.", "Perjantaina 24.1."], answer: 1, explanationFi: "'keskiviikkona 22.1. klo 14.00'." },
      { q: "Mitä Minhin pitää ottaa mukaan?", options: ["Vain CV", "Henkilöllisyystodistus ja tutkintotodistus", "Pelkkä passi", "Ei mitään"], answer: 1, explanationFi: "'henkilöllisyystodistuksen ja tutkintotodistuksesi kopion'." },
      { q: "Milloin osallistuminen pitää vahvistaa?", options: ["Maanantaihin mennessä", "Keskiviikkoon mennessä", "Perjantaihin mennessä", "Ei tarvitse vahvistaa"], answer: 2, explanationFi: "'viimeistään perjantaina'." },
      { q: "Kuka kutsui Minhin haastatteluun?", options: ["Minh itse", "Kaisa Lehtonen", "Aleksanterinkatu 12", "Henkilöstöosasto"], answer: 1, explanationFi: "Kaisan nimi lukee viestin lopussa lähettäjänä." },
      { q: "Minkä tyyppiseen työpaikkaan Minh haki?", options: ["HR-assistentiksi", "Toimistosihteeriksi", "Myyjäksi", "Haastattelijaksi"], answer: 2, explanationFi: "Viestissä sanotaan 'hakemuksestasi myyjän paikkaa varten'." },
      { q: "Kuinka pitkään haastattelu kestää?", options: ["Noin tunnin", "Noin puoli tuntia", "Noin kolme varttia", "Tasan 22.1. asti"], answer: 2, explanationFi: "Tekstissä mainitaan 'Haastattelu kestää noin 45 minuuttia'. Kolme varttia on 45 minuuttia." }
    ],
  },
  {
    id: "read-exp4-3",
    title: "Ilmoitus: Vappujuhla kirjastolla",
    type: "notice",
    timeMinutes: 4,
    textFi:
      "Tervetuloa viettämään vappua kirjastollemme keskiviikkona 30.4. klo 12–16! Ohjelmassa on lapsille naamiointia ja ilmapallotaikuria, aikuisille runoiltaa ja simaa. Tilaisuus on maksuton, mutta kahvia ja munkkeja myydään 2 euron hintaan. Pukeudu mielellään keväiseen asuun. Tapahtuma järjestetään ulkona, joten varaudu säänmukaiseen vaatetukseen.",
    hintVi: "Thông báo lễ hội Vappu (1/5) ở thư viện — chương trình, giá đồ ăn, lưu ý thời tiết.",
    questions: [
      { q: "Milloin tapahtuma on?", options: ["29.4. klo 10–14", "30.4. klo 12–16", "1.5. klo 14–18", "2.5. klo 12–16"], answer: 1, explanationFi: "'keskiviikkona 30.4. klo 12–16'." },
      { q: "Mitä lapsille tarjotaan?", options: ["Konsertti", "Naamiointia ja taikuri", "Elokuva", "Tanssia"], answer: 1, explanationFi: "'lapsille naamiointia ja ilmapallotaikuria'." },
      { q: "Onko sisäänpääsy ilmainen?", options: ["Ei, 2 €", "Kyllä, mutta kahvi maksaa", "Vain lapsille ilmainen", "5 € aikuisille"], answer: 1, explanationFi: "'Tilaisuus on maksuton, mutta kahvia ja munkkeja myydään 2 euron hintaan'." },
      { q: "Mitä aikuisille on tarjolla ohjelmassa vappuna?", options: ["Naamiointia ja simaa", "Ilmapallotaikuri ja runoilta", "Runoiltaa ja simaa", "Kahvia ja munkkeja"], answer: 2, explanationFi: "Tekstissä mainitaan, että aikuisille on runoiltaa ja simaa." },
      { q: "Missä tapahtuma järjestetään?", options: ["Kirjaston sisätiloissa", "Ulkona", "Keskustassa", "Kahvilassa"], answer: 1, explanationFi: "Tekstissä sanotaan: 'Tapahtuma järjestetään ulkona'." },
      { q: "Mitä kahvi ja munkit maksavat?", options: ["Maksutta", "1 euroa", "2 euroa", "3 euroa"], answer: 2, explanationFi: "Tekstissä kerrotaan: 'kahvia ja munkkeja myydään 2 euron hintaan'." }
    ],
  },
];

/* ============================================================
 * LISTENING — 3 bài (sức khỏe, công việc, văn hóa)
 * ============================================================ */
export const B1_LISTENING_EXP4: B1ListeningClip[] = [
  {
    id: "listen-exp4-1",
    title: "Terveysasemalla: Ajanvaraus",
    scenarioFi: "Asiakas soittaa terveysasemalle ja varaa ajan lääkärille.",
    durationSeconds: 45,
    scriptFi:
      "Hoitaja: Hyvää päivää, terveysasema, Saara puhelimessa. Asiakas: Hei, haluaisin varata ajan lääkärille. Minulla on ollut yskä ja kuumetta jo viisi päivää. Hoitaja: Selvä. Onko sinulla aiempi diagnoosi astmasta? Asiakas: Ei ole. Hoitaja: Hyvä. Vapaa aika on huomenna torstaina kello yhdeksän tai perjantaina kello kolmetoista. Asiakas: Otetaan torstai aamu, kiitos.",
    questions: [
      { q: "Kuinka monta päivää oireet ovat kestäneet?", options: ["Kaksi", "Kolme", "Viisi", "Viikon"], answer: 2 },
      { q: "Onko asiakkaalla astma?", options: ["Kyllä", "Ei", "Ei tiedä", "Vain kausittain"], answer: 1 },
      { q: "Milloin asiakas tulee vastaanotolle?", options: ["Torstaina kello 9", "Torstaina kello 13", "Perjantaina kello 9", "Perjantaina kello 13"], answer: 0 },
      { q: "Kuka on puhelimessa terveysasemalta?", options: ["Lääkäri", "Saara", "Asiakas", "Hoitaja"], answer: 1 },
      { q: "Mitä asiakas haluaa varata?", options: ["Ajan optikolle", "Ajan hammaslääkärille", "Ajan lääkärille", "Laboratorioajan"], answer: 2 },
      { q: "Mitkä ovat asiakkaan oireet?", options: ["Vatsakipu ja päänsärky", "Kurkkukipu ja nuha", "Yskä ja kuume", "Väsymys ja lihaskipu"], answer: 2 }
    ],
  },
  {
    id: "listen-exp4-2",
    title: "Tiimipalaverissa",
    scenarioFi: "Esimies kertoo tiimille ensi viikon aikatauluista.",
    durationSeconds: 50,
    scriptFi:
      "Esimies: Hei kaikki. Ensi viikolla on kolme tärkeää asiaa. Maanantaina alkaa uusi koulutus klo kymmenen, kestää kaksi tuntia. Keskiviikkona on asiakaskäynti Tampereella, lähtö asemalta klo seitsemän. Perjantaina on tiimipäivä — ohjelmassa lounas ja saunailta. Muistakaa ilmoittautua sähköpostilla torstaihin mennessä.",
    questions: [
      { q: "Milloin koulutus alkaa?", options: ["Maanantaina klo 9", "Maanantaina klo 10", "Tiistaina klo 10", "Keskiviikkona klo 8"], answer: 1 },
      { q: "Mihin aikaan juna lähtee Tampereelle?", options: ["Klo 6", "Klo 7", "Klo 8", "Klo 9"], answer: 1 },
      { q: "Mitä tiimipäivänä tehdään?", options: ["Kokous ja työ", "Lounas ja sauna", "Vain etätyö", "Loma"], answer: 1 },
      { q: "Mihin mennessä pitää ilmoittautua?", options: ["Tiistai", "Keskiviikko", "Torstai", "Perjantai"], answer: 2 },
      { q: "Missä kaupungissa asiakaskäynti on?", options: ["Turussa", "Oulussa", "Tampereella", "Helsingissä"], answer: 2 },
      { q: "Kuinka kauan koulutus kestää?", options: ["Yhden tunnin", "Kaksi tuntia", "Kolme tuntia", "Neljä tuntia"], answer: 1 }
    ],
  },
  {
    id: "listen-exp4-3",
    title: "Lippukassalla teatterissa",
    scenarioFi: "Asiakas ostaa liput perheelle teatteriesitykseen.",
    durationSeconds: 45,
    scriptFi:
      "Asiakas: Hei, haluaisin neljä lippua lauantain näytökseen. Kaksi aikuista ja kaksi lasta. Myyjä: Selvä. Lasten liput maksavat kymmenen euroa ja aikuisten kahdeksantoista euroa. Yhteensä viisikymmentäkuusi euroa. Käykö kortti? Asiakas: Käy. Saako rivin viisi paikat? Myyjä: Valitettavasti rivi viisi on jo varattu, mutta rivi seitsemän on vapaa.",
    questions: [
      { q: "Kuinka monta lippua asiakas ostaa?", options: ["2", "3", "4", "5"], answer: 2 },
      { q: "Paljonko on lasten lippu?", options: ["8 €", "10 €", "15 €", "18 €"], answer: 1 },
      { q: "Saiko asiakas rivin 5 paikat?", options: ["Kyllä", "Ei, rivi 7", "Vain yhden", "Ei kerrota"], answer: 1 },
      { q: "Mikä päivä näytökseen liput ostetaan?", options: ["Perjantai", "Lauantai", "Sunnuntai", "Maanantai"], answer: 1 },
      { q: "Paljonko kahden aikuisen liput maksavat yhteensä?", options: ["10 euroa", "18 euroa", "36 euroa", "56 euroa"], answer: 2 },
      { q: "Millä rivillä on vapaita paikkoja?", options: ["Rivi viisi", "Rivi kuusi", "Rivi seitsemän", "Rivi kahdeksan"], answer: 2 }
    ],
  },
];

/* ============================================================
 * WRITING — 3 bài mẫu (cuộc sống, công việc, dịch vụ)
 * ============================================================ */
export const B1_WRITING_EXP4: B1WritingTemplate[] = [
  {
    id: "write-exp4-1",
    type: "mielipide",
    title: "Mielipide: Pitäisikö kaikkien oppia uimaan?",
    promptFi:
      "Suomessa on paljon järviä ja merta. Pitäisikö uimataidon olla pakollinen kaikille? Esitä mielipiteesi ja anna kaksi perustelua.",
    promptVi:
      "Phần Lan có rất nhiều hồ và biển. Liệu kỹ năng bơi có nên bắt buộc cho mọi người? Trình bày ý kiến và 2 lập luận.",
    minWords: 100,
    timeMinutes: 40,
    structure: [
      {
        step: "Intro",
        stepFi: "Johdanto",
        example:
          "Suomessa vesi on aina lähellä — joka kesä kuulemme ikäviä uutisia hukkumistapauksista. Minun mielestäni uimataidon pitäisi olla pakollinen kaikille.",
      },
      {
        step: "Reason 1",
        stepFi: "Perustelu 1 (turvallisuus)",
        example:
          "Ensinnäkin uimataito pelastaa henkiä. Esimerkiksi viime kesänä naapurini lapsi joutui veteen, mutta hän osasi uida ja selviytyi.",
      },
      {
        step: "Reason 2",
        stepFi: "Perustelu 2 (terveys)",
        example:
          "Toiseksi uinti on erinomainen liikuntamuoto, joka sopii kaikenikäisille ja kaikille keholle.",
      },
      {
        step: "Conclusion",
        stepFi: "Päätelmä",
        example:
          "Yhteenvetona voin sanoa, että koulujen pitäisi tarjota kaikille uintiopetusta. Se on sekä turvallisuuskysymys että hyvä elämäntapa.",
      },
    ],
    phrases: [
      { fi: "Minun mielestäni", meaning: "In my opinion" },
      { fi: "Ensinnäkin / Toiseksi", meaning: "Firstly / Secondly" },
      { fi: "Esimerkiksi", meaning: "For example" },
      { fi: "Pelastaa henkiä", meaning: "Saves lives" },
      { fi: "Sopii kaikenikäisille", meaning: "Suits all ages" },
      { fi: "Yhteenvetona", meaning: "In summary" },
    ],
    teacherTipFi:
      "YKI-arvioija pitää konkreettisista esimerkeistä. Käytä yhtä omaa kokemusta — se nostaa pisteitä!",
    teacherTipVi:
      "Giám khảo YKI thích ví dụ cụ thể. Hãy lồng 1 trải nghiệm riêng — sẽ tăng điểm!",
  },
  {
    id: "write-exp4-2",
    type: "valitus",
    title: "Valitus: Myöhästyneet työvuorolistat",
    promptFi:
      "Olet työntekijä ja esimies on lähettänyt työvuorolistan aina liian myöhään. Kirjoita kohtelias mutta selkeä viesti esimiehelle.",
    promptVi:
      "Bạn là nhân viên, sếp luôn gửi lịch ca làm việc quá muộn. Viết tin nhắn lịch sự nhưng rõ ràng cho sếp.",
    minWords: 100,
    timeMinutes: 35,
    structure: [
      {
        step: "Intro",
        stepFi: "Johdanto",
        example:
          "Hei Mikko, kirjoitan tämän viestin, koska haluan keskustella työvuorolistojen aikataulusta.",
      },
      {
        step: "Problem",
        stepFi: "Ongelma",
        example:
          "Olen huomannut, että saamme listan vasta perjantai-iltana, vaikka uusi viikko alkaa jo maanantaina.",
      },
      {
        step: "Effect",
        stepFi: "Vaikutus",
        example:
          "Tämä on aiheuttanut vaikeuksia perheen aikataulujen sovittamisessa ja lastenhoidon järjestämisessä.",
      },
      {
        step: "Demand",
        stepFi: "Toive",
        example:
          "Toivoisin, että lista lähetettäisiin viimeistään keskiviikkona, jotta voimme suunnitella elämämme paremmin.",
      },
    ],
    phrases: [
      { fi: "Kirjoitan tämän viestin, koska...", meaning: "I'm writing because…" },
      { fi: "Olen huomannut, että...", meaning: "I have noticed that…" },
      { fi: "Aiheuttaa vaikeuksia", meaning: "Causes difficulties" },
      { fi: "Toivoisin, että...", meaning: "I would hope that…" },
      { fi: "Suunnitella elämää", meaning: "Plan one's life" },
      { fi: "Kiitos ymmärryksestäsi", meaning: "Thanks for your understanding" },
    ],
    teacherTipFi:
      "Aloita aina positiivisesti ja päätä rakentavasti — älä syytä, vaan ehdota ratkaisua.",
    teacherTipVi:
      "Mở đầu tích cực, kết thúc xây dựng — đừng đổ lỗi, hãy đề xuất giải pháp.",
  },
  {
    id: "write-exp4-3",
    type: "mielipide",
    title: "Mielipide: Pitäisikö Kelan palvelut digitalisoida kokonaan?",
    promptFi:
      "Suomessa Kelan palveluja siirretään yhä enemmän verkkoon. Onko se hyvä vai huono asia? Perustele.",
    promptVi:
      "Ở Phần Lan, dịch vụ Kela ngày càng chuyển lên mạng. Là tốt hay xấu? Hãy lập luận.",
    minWords: 100,
    timeMinutes: 40,
    structure: [
      {
        step: "Intro",
        stepFi: "Johdanto",
        example:
          "Yhä useampi viranomaispalvelu siirtyy verkkoon. Minun mielestäni digitalisaatio on pääosin hyvä asia, mutta ei kaikille.",
      },
      {
        step: "Reason 1",
        stepFi: "Hyvä puoli",
        example:
          "Ensinnäkin verkkopalvelu on nopea — voin hoitaa hakemukset kotoa illalla, kun lapset nukkuvat.",
      },
      {
        step: "Reason 2",
        stepFi: "Huono puoli",
        example:
          "Toisaalta vanhat ihmiset ja maahanmuuttajat eivät aina osaa käyttää digitaalisia palveluja, jolloin he tarvitsevat apua.",
      },
      {
        step: "Conclusion",
        stepFi: "Päätelmä",
        example:
          "Mielestäni digi on hyvä, mutta toimistoja pitää säilyttää niitä varten, jotka tarvitsevat henkilökohtaista palvelua.",
      },
    ],
    phrases: [
      { fi: "Yhä useampi", meaning: "More and more" },
      { fi: "Pääosin hyvä asia", meaning: "Mostly a good thing" },
      { fi: "Toisaalta", meaning: "On the other hand" },
      { fi: "Tarvitsevat apua", meaning: "Need help" },
      { fi: "Henkilökohtainen palvelu", meaning: "Personal service" },
    ],
    teacherTipFi:
      "Mielipidetehtävässä esitä molemmat puolet — se osoittaa B1-tason ajattelukykyä.",
    teacherTipVi:
      "Bài nêu ý kiến hãy trình bày cả 2 mặt — chứng tỏ tư duy ở mức B1.",
  },
];

/* ============================================================
 * SPEAKING — 3 tình huống (cuộc sống, học tập, văn hóa)
 * ============================================================ */
export const B1_SPEAKING_EXP4: B1SpeakingSituation[] = [
  {
    id: "speak-exp4-1",
    title: "Vuokranantajalle: Vesivuoto keittiössä",
    scenarioFi: "Keittiön hanasta vuotaa vettä. Soitat vuokranantajalle ja pyydät korjausta.",
    scenarioVi: "Vòi nước trong bếp bị rò rỉ. Bạn gọi cho chủ nhà và yêu cầu sửa chữa.",
    taskFi:
      "Esittäydy, kuvaile ongelma, kerro milloin se alkoi, kysy milloin korjaaja tulee, vahvista yhteystietosi.",
    hintsFi: [
      "Hei, olen vuokralainen osoitteessa Mannerheimintie 12.",
      "Keittiön hanasta vuotaa vettä eilisestä asti.",
      "Voitteko lähettää korjaajan?",
      "Milloin hän pääsee tulemaan?",
      "Numeroni on nolla neljä nolla — kaksi kolme neljä — viisi kuusi seitsemän kahdeksan.",
    ],
    speakingCoachLink: "/speaking-coach?lang=finnish&topic=plumbing",
    timeMinutes: 4,
  },
  {
    id: "speak-exp4-2",
    title: "Opintotoimistossa: Kurssimuutos",
    scenarioFi: "Haluat vaihtaa yhden kurssin toiseen ja menet opintotoimistoon kysymään.",
    scenarioVi: "Bạn muốn đổi một môn sang môn khác và đến phòng quản lý sinh viên hỏi.",
    taskFi:
      "Esittäydy, kerro nykyinen ja toivomasi kurssi, perustele miksi haluat vaihtaa, kysy onko vielä paikkoja, kysy mitä papereita tarvitaan.",
    hintsFi: [
      "Hei, olen toisen vuoden opiskelija, opiskelijanumero 123456.",
      "Olen kirjoittautunut tilastotieteen kurssille, mutta haluaisin vaihtaa data-analytiikkaan.",
      "Tilastotiede on minulle liian teoreettinen — haluan käytännönläheisempää sisältöä.",
      "Onko data-analytiikan kurssilla vielä vapaita paikkoja?",
      "Mitä lomakkeita tarvitsen?",
    ],
    speakingCoachLink: "/speaking-coach?lang=finnish&topic=studies",
    timeMinutes: 5,
  },
  {
    id: "speak-exp4-3",
    title: "Ystävän kanssa: Kutsu juhannusjuhlaan",
    scenarioFi: "Suomalainen ystäväsi kutsuu sinut viettämään juhannusta mökille. Vastaat kutsuun ja kysyt yksityiskohtia.",
    scenarioVi: "Bạn người Phần mời bạn đi nghỉ Juhannus (lễ giữa hè) ở nhà gỗ. Bạn trả lời lời mời và hỏi chi tiết.",
    taskFi:
      "Kiitä kutsusta, kysy aikataulu ja sijainti, kysy mitä otat mukaan, kerro pieni huoli (esim. uima- tai sauna-asia), sovi kyydistä.",
    hintsFi: [
      "Voi, kiitos kutsusta — todella kiva!",
      "Mihin aikaan ja mihin osoitteeseen pitää tulla?",
      "Mitä otan mukaan? Ruokaa, juomaa vai jotain muuta?",
      "Sauna kuulostaa hyvältä, mutta en ole vielä tottunut suomalaiseen saunalämpöön — onko se kovin kuuma?",
      "Voinko tulla teidän autollanne vai pitääkö varata oma kyyti?",
    ],
    speakingCoachLink: "/speaking-coach?lang=finnish&topic=midsummer",
    timeMinutes: 4,
  },
];
