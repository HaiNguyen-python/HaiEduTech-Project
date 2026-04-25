/**
 * @file ykiB1Expansion.ts
 * @description Massive YKI B1 (Keskitaso) content expansion - additional reading,
 *   listening, writing, speaking, and vocabulary pool. All Finnish text is meant
 *   to be played via the Finnish TTS pipeline (proxy → Google fi → native fi-FI).
 * @author Teacher Hai (HaiEduTech)
 */

import type {
  B1ReadingPassage,
  B1ListeningClip,
  B1WritingTemplate,
  B1SpeakingSituation,
  B1WordOfDay,
} from "./ykiB1Data";

/* ============================================================
 * READING - extra news, emails, letters, notices (B1 level)
 * ============================================================ */
export const B1_READING_EXPANSION: B1ReadingPassage[] = [
  {
    id: "read-6",
    title: "Uutinen: Sähköpotkulaudat kaupungissa",
    type: "news",
    timeMinutes: 7,
    textFi:
      "Sähköpotkulautojen suosio on kasvanut nopeasti suomalaisissa kaupungeissa. Monet asukkaat pitävät niitä kätevänä tapana liikkua keskustassa, mutta osa on huolissaan turvallisuudesta. Viime vuonna onnettomuuksien määrä kasvoi, ja siksi kaupunki päätti rajoittaa nopeutta jalkakäytävillä. Uudet säännöt astuvat voimaan ensi kuussa.",
    hintVi: "Tin tức về xe scooter điện và quy định mới.",
    questions: [
      { q: "Miksi kaupunki rajoittaa nopeutta?", options: ["Säästää sähköä", "Turvallisuussyistä", "Verojen takia", "Säätila vaatii"], answer: 1, explanationFi: "Tekstissä mainitaan, että onnettomuudet lisääntyivät." },
      { q: "Milloin uudet säännöt tulevat voimaan?", options: ["Heti", "Ensi viikolla", "Ensi kuussa", "Ensi vuonna"], answer: 2, explanationFi: "'Uudet säännöt astuvat voimaan ensi kuussa.'" },
      { q: "Mitä asukkaat pitävät hyvänä?", options: ["Hintaa", "Liikkumisen kätevyyttä", "Värejä", "Mainoksia"], answer: 1, explanationFi: "'kätevänä tapana liikkua keskustassa'." },
    ],
  },
  {
    id: "read-7",
    title: "Sähköposti: Lääkäriaika peruttu",
    type: "email",
    timeMinutes: 5,
    textFi:
      "Hyvä asiakas,\n\nValitettavasti joudumme perumaan lääkäriaikanne keskiviikkona klo 10.00. Lääkäri Salonen on sairaana. Voitte varata uuden ajan verkkopalvelumme kautta tai soittamalla numeroon 010 123 4567. Pahoittelemme vaivaa.\n\nTerveyskeskus",
    hintVi: "Email báo huỷ lịch khám bệnh.",
    questions: [
      { q: "Miksi aika peruttiin?", options: ["Asiakas peruutti", "Lääkäri on sairaana", "Klinikka on kiinni", "Tietokoneongelma"], answer: 1, explanationFi: "'Lääkäri Salonen on sairaana.'" },
      { q: "Miten voi varata uuden ajan?", options: ["Vain käymällä paikan päällä", "Verkossa tai puhelimitse", "Sähköpostilla", "Tekstiviestillä"], answer: 1, explanationFi: "Verkkopalvelussa tai numeroon soittamalla." },
    ],
  },
  {
    id: "read-8",
    title: "Uutinen: Suomi maailman onnellisin maa",
    type: "news",
    timeMinutes: 8,
    textFi:
      "Suomi on jälleen valittu maailman onnellisimmaksi maaksi YK:n vuosittaisessa raportissa. Tutkijoiden mukaan suomalaisten onnellisuuden taustalla ovat luottamus toisiin, hyvä koulutus, terveydenhuolto ja luonnon läheisyys. Toisaalta moni suomalainen yllättyy tuloksista, sillä talvi on pitkä ja pimeä. Asiantuntijat painottavat, että onnellisuus ei tarkoita pelkästään iloa, vaan tyytyväisyyttä elämään.",
    hintVi: "Tin: Phần Lan là nước hạnh phúc nhất thế giới.",
    questions: [
      { q: "Mikä EI kuulu suomalaisten onnellisuuden syihin?", options: ["Luottamus", "Koulutus", "Lämmin sää", "Luonto"], answer: 2, explanationFi: "Sää ei ole syy - päinvastoin, talvi on pitkä." },
      { q: "Mitä onnellisuus tutkijoiden mukaan tarkoittaa?", options: ["Aina iloa", "Tyytyväisyyttä elämään", "Paljon rahaa", "Lomamatkoja"], answer: 1, explanationFi: "'tyytyväisyyttä elämään'." },
      { q: "Kuka julkaisee raportin?", options: ["EU", "WHO", "YK", "Eduskunta"], answer: 2, explanationFi: "'YK:n vuosittaisessa raportissa'." },
    ],
  },
  {
    id: "read-9",
    title: "Ilmoitus: Kirjaston aukioloajat",
    type: "notice",
    timeMinutes: 4,
    textFi:
      "Tiedote asiakkaillemme! Pääkirjasto on suljettu juhannuksena 21.–24.6. Lähikirjastot ovat avoinna ma–pe klo 10–18 kesäkuun ajan. Varatut kirjat voi noutaa myös kirjastoautosta. Kysy lisää henkilökunnalta tai katso verkkosivuiltamme.",
    hintVi: "Thông báo giờ mở cửa thư viện dịp lễ.",
    questions: [
      { q: "Milloin pääkirjasto on suljettu?", options: ["Joulun aikaan", "Juhannuksena", "Pääsiäisenä", "Heinäkuussa"], answer: 1, explanationFi: "'suljettu juhannuksena 21.–24.6.'" },
      { q: "Mistä varatut kirjat voi noutaa?", options: ["Vain pääkirjastosta", "Postista", "Kirjastoautosta", "Koulusta"], answer: 2, explanationFi: "'Varatut kirjat voi noutaa myös kirjastoautosta.'" },
    ],
  },
  {
    id: "read-10",
    title: "Sähköposti: Työpaikkahaastattelu",
    type: "email",
    timeMinutes: 6,
    textFi:
      "Hei Mai,\n\nKiitos hakemuksestasi. Olemme iloisia kutsuessamme sinut haastatteluun ensi torstaina 12.6. klo 14.00. Haastattelu pidetään toimistollamme osoitteessa Mannerheimintie 12, 4. kerros. Ota mukaan henkilöllisyystodistus ja kopio tutkintotodistuksestasi. Haastattelu kestää noin 45 minuuttia. Vahvistathan tulosi sähköpostitse.\n\nTerveisin,\nLaura Mäkinen, HR",
    hintVi: "Email mời phỏng vấn xin việc.",
    questions: [
      { q: "Milloin haastattelu on?", options: ["Ensi maanantaina", "Ensi torstaina 12.6.", "Tänään", "Ensi kuussa"], answer: 1, explanationFi: "'ensi torstaina 12.6. klo 14.00'." },
      { q: "Mitä pitää ottaa mukaan?", options: ["Vain CV", "Henkilöllisyystodistus ja tutkintotodistus", "Vain passi", "Suosituskirjeet"], answer: 1, explanationFi: "Henkilöllisyystodistus ja kopio tutkintotodistuksesta." },
      { q: "Mitä Mai pitää tehdä ennen haastattelua?", options: ["Maksaa rekisteröintimaksu", "Vahvistaa tulonsa sähköpostitse", "Lähettää lisätiedot", "Soittaa pomolle"], answer: 1, explanationFi: "'Vahvistathan tulosi sähköpostitse.'" },
    ],
  },
  {
    id: "read-11",
    title: "Uutinen: Suomalainen ruokakulttuuri muuttuu",
    type: "news",
    timeMinutes: 8,
    textFi:
      "Suomalaisten ruokatottumukset ovat muuttuneet viimeisen kymmenen vuoden aikana. Yhä useampi syö kasvisruokaa ja vähentää lihan kulutusta. Erityisesti nuoret kaupunkilaiset ovat kiinnostuneita ympäristöystävällisestä ruoasta. Kaupoissa on nykyään paljon enemmän kasvistuotteita kuin ennen, ja ravintolat tarjoavat usein vegaanivaihtoehtoja. Asiantuntijoiden mukaan trendi tulee jatkumaan.",
    hintVi: "Văn hoá ẩm thực Phần Lan đang thay đổi: nhiều người ăn chay hơn.",
    questions: [
      { q: "Kuka erityisesti syö kasvisruokaa?", options: ["Vanhemmat ihmiset", "Nuoret kaupunkilaiset", "Maaseudun asukkaat", "Lapset"], answer: 1, explanationFi: "'Erityisesti nuoret kaupunkilaiset…'" },
      { q: "Mitä kaupoissa on enemmän?", options: ["Lihaa", "Kalaa", "Kasvistuotteita", "Maitotuotteita"], answer: 2, explanationFi: "'paljon enemmän kasvistuotteita kuin ennen'." },
      { q: "Mitä asiantuntijat sanovat tulevaisuudesta?", options: ["Trendi loppuu pian", "Trendi jatkuu", "Ei tiedetä", "Hinnat nousevat"], answer: 1, explanationFi: "'trendi tulee jatkumaan'." },
    ],
  },
  {
    id: "read-12",
    title: "Virallinen kirje: Verotoimiston tiedote",
    type: "letter",
    timeMinutes: 8,
    textFi:
      "Hyvä veronmaksaja,\n\nVerokorttinne vuodelle 2025 on nyt valmis. Voitte tarkistaa tietonne osoitteessa vero.fi. Jos tulonne ovat muuttuneet, on tärkeää ilmoittaa siitä mahdollisimman pian. Muutokset voi tehdä helposti verkossa tai puhelimitse. Mikäli ette tee muutoksia, vanha verokortti on voimassa.\n\nVerohallinto",
    hintVi: "Thư từ cơ quan thuế về thẻ thuế năm mới.",
    questions: [
      { q: "Mistä voi tarkistaa verokortin tiedot?", options: ["Postista", "Vero.fi-sivustolta", "Pankista", "Kirjastosta"], answer: 1, explanationFi: "'osoitteessa vero.fi'." },
      { q: "Mitä pitää tehdä, jos tulot ovat muuttuneet?", options: ["Ei mitään", "Maksaa lisää", "Ilmoittaa Verohallintoon", "Mennä toimistoon"], answer: 2, explanationFi: "'on tärkeää ilmoittaa siitä mahdollisimman pian'." },
      { q: "Mitä tapahtuu, jos muutoksia ei tehdä?", options: ["Verokortti vanhenee", "Vanha verokortti pysyy voimassa", "Saadaan sakko", "Pankkitili suljetaan"], answer: 1, explanationFi: "'vanha verokortti on voimassa'." },
    ],
  },
];

/* ============================================================
 * LISTENING - extra dialogues (TTS-driven)
 * ============================================================ */
export const B1_LISTENING_EXPANSION: B1ListeningClip[] = [
  {
    id: "listen-5",
    title: "Junassa",
    scenarioFi: "Matkustaja kysyy konduktööriltä asemista.",
    durationSeconds: 35,
    scriptFi:
      "Matkustaja: Anteeksi, milloin saavumme Tampereelle? Konduktööri: Noin kymmenen minuutin kuluttua. Matkustaja: Onko sieltä suora juna Ouluun? Konduktööri: Ei valitettavasti. Sinun pitää vaihtaa Seinäjoella. Vaihto kestää noin viisitoista minuuttia. Matkustaja: Selvä, kiitos avusta!",
    questions: [
      { q: "Milloin juna saapuu Tampereelle?", options: ["Heti", "Noin 10 minuutin kuluttua", "Tunnin kuluttua", "Ei tiedetä"], answer: 1 },
      { q: "Missä matkustaja vaihtaa junaa?", options: ["Helsingissä", "Tampereella", "Seinäjoella", "Oulussa"], answer: 2 },
    ],
  },
  {
    id: "listen-6",
    title: "Vuokranantajan kanssa",
    scenarioFi: "Asukas ilmoittaa rikkoutuneesta hanasta.",
    durationSeconds: 40,
    scriptFi:
      "Asukas: Hei, asunnossani keittiön hana vuotaa. Vuokranantaja: Voi harmi. Onko vesi sammutettu? Asukas: Ei vielä, en löydä sulkuventtiiliä. Vuokranantaja: Se on yleensä keittiön kaapissa lavuaarin alla. Lähetän putkimiehen huomenna aamulla kymmeneltä. Sopiiko? Asukas: Sopii hyvin, kiitos paljon.",
    questions: [
      { q: "Mikä on rikki?", options: ["Pesukone", "Keittiön hana", "Lämmitys", "Ovi"], answer: 1 },
      { q: "Milloin putkimies tulee?", options: ["Heti", "Tänä iltana", "Huomenna aamulla", "Ensi viikolla"], answer: 2 },
      { q: "Missä sulkuventtiili yleensä on?", options: ["Kylpyhuoneessa", "Lavuaarin alla", "Eteisessä", "Parvekkeella"], answer: 1 },
    ],
  },
  {
    id: "listen-7",
    title: "Postissa",
    scenarioFi: "Asiakas lähettää paketin ulkomaille.",
    durationSeconds: 35,
    scriptFi:
      "Asiakas: Hei, haluaisin lähettää tämän paketin Vietnamiin. Virkailija: Selvä. Paketti painaa kaksi kiloa. Lähetys kestää noin kaksi viikkoa ja maksaa 25 euroa. Asiakas: Voinko maksaa kortilla? Virkailija: Tietenkin. Tarvitsen myös vastaanottajan puhelinnumeron. Asiakas: Tässä on. Virkailija: Kiitos, tässä on kuitti.",
    questions: [
      { q: "Mihin paketti lähetetään?", options: ["Saksaan", "Vietnamiin", "Ruotsiin", "Viroon"], answer: 1 },
      { q: "Kuinka kauan lähetys kestää?", options: ["Viikon", "Kaksi viikkoa", "Kuukauden", "Kolme päivää"], answer: 1 },
      { q: "Mitä virkailija tarvitsee asiakkaalta?", options: ["Vastaanottajan puhelinnumeron", "Asiakkaan henkilötunnuksen", "Pankkitilin", "Sähköpostin"], answer: 0 },
    ],
  },
  {
    id: "listen-8",
    title: "Kampaajalla",
    scenarioFi: "Asiakas varaa hiusten leikkauksen.",
    durationSeconds: 30,
    scriptFi:
      "Asiakas: Hei, haluaisin varata ajan hiustenleikkuuseen. Kampaaja: Joo, milloin sopisi? Asiakas: Ehkä lauantaina iltapäivällä? Kampaaja: Lauantaina kello kaksi olisi vapaa aika. Sopiiko? Asiakas: Sopii. Mitä leikkaus maksaa? Kampaaja: Naisten leikkaus on 45 euroa.",
    questions: [
      { q: "Milloin asiakas tulee leikkaukseen?", options: ["Perjantaina", "Lauantaina kello 14", "Sunnuntaina", "Maanantaina"], answer: 1 },
      { q: "Mitä leikkaus maksaa?", options: ["35 €", "45 €", "55 €", "65 €"], answer: 1 },
    ],
  },
  {
    id: "listen-9",
    title: "Koulun vanhempainillassa",
    scenarioFi: "Opettaja kertoo lukukauden suunnitelmista.",
    durationSeconds: 50,
    scriptFi:
      "Opettaja: Tervetuloa vanhempainiltaan. Tällä lukukaudella keskitymme erityisesti matematiikkaan ja äidinkieleen. Lapset saavat kotitehtäviä joka viikko, mutta ne eivät ole vaikeita. Toivomme, että vanhemmat lukevat lasten kanssa kotona. Lokakuussa järjestämme retken museoon. Ilmoitamme tarkemmat tiedot pian.",
    questions: [
      { q: "Mihin oppiaineisiin keskitytään?", options: ["Liikuntaan ja musiikkiin", "Matematiikkaan ja äidinkieleen", "Englantiin ja saksaan", "Käsityöhön"], answer: 1 },
      { q: "Mitä vanhemmilta toivotaan?", options: ["Tehdä lasten tehtävät", "Maksaa lisää", "Lukea lasten kanssa kotona", "Käydä koulussa joka päivä"], answer: 2 },
      { q: "Mitä lokakuussa tapahtuu?", options: ["Loma", "Koe", "Retki museoon", "Konsertti"], answer: 2 },
    ],
  },
  {
    id: "listen-10",
    title: "Hätäkeskuksessa",
    scenarioFi: "Soittaja ilmoittaa pienestä onnettomuudesta.",
    durationSeconds: 35,
    scriptFi:
      "Hätäkeskus: Hätäkeskus, mitä on tapahtunut? Soittaja: Kaaduin pyörällä ja jalkani on kipeä. En pysty nousemaan. Hätäkeskus: Missä olet nyt? Soittaja: Olen Tampereentien ja Koulukadun risteyksessä. Hätäkeskus: Pysy paikallasi. Ambulanssi tulee noin viidessä minuutissa.",
    questions: [
      { q: "Mitä soittajalle tapahtui?", options: ["Hän eksyi", "Hän kaatui pyörällä", "Hänet ryöstettiin", "Hän sairastui"], answer: 1 },
      { q: "Kuinka pian ambulanssi tulee?", options: ["Heti", "Noin 5 minuutissa", "10 minuutissa", "Puolessa tunnissa"], answer: 1 },
    ],
  },
];

/* ============================================================
 * WRITING - extra B1 templates
 * ============================================================ */
export const B1_WRITING_EXPANSION: B1WritingTemplate[] = [
  {
    id: "write-tarina",
    type: "mielipide",
    title: "Kertomus - Story / personal narrative",
    promptFi:
      "Kerro tilanteesta, jossa opit jotakin tärkeää itsestäsi. Mitä tapahtui ja mitä opit?",
    promptVi: "Hãy kể về một tình huống bạn học được điều quan trọng về bản thân. Đã xảy ra chuyện gì và bạn học được gì?",
    minWords: 90,
    timeMinutes: 25,
    structure: [
      { step: "1. Aloitus", stepFi: "Aseta aika ja paikka", example: "Viime kesänä olin ensimmäistä kertaa yksin matkalla." },
      { step: "2. Tapahtuma", stepFi: "Mitä tapahtui (imperfekti)", example: "Eksyin vieraassa kaupungissa enkä osannut puhua kieltä." },
      { step: "3. Tunteet", stepFi: "Miltä tuntui", example: "Aluksi pelkäsin, mutta sitten kysyin apua paikalliselta." },
      { step: "4. Ratkaisu", stepFi: "Miten tilanne ratkesi", example: "Sain ohjeet ja pääsin hotellille." },
      { step: "5. Opetus", stepFi: "Mitä opit", example: "Opin, että rohkeus auttaa enemmän kuin pelko." },
    ],
    phrases: [
      { fi: "Eräänä päivänä…", meaning: "One day…" },
      { fi: "Yhtäkkiä…", meaning: "Suddenly…" },
      { fi: "Lopulta…", meaning: "Finally…" },
      { fi: "Sen jälkeen ymmärsin, että…", meaning: "After that I understood that…" },
      { fi: "Tämä kokemus opetti minulle…", meaning: "This experience taught me…" },
    ],
    teacherTipFi: "Käytä aikamuotoja oikein: imperfekti tapahtumalle, perfekti opetukselle ('olen oppinut').",
    teacherTipVi: "Dùng đúng thì: imperfekti cho sự kiện, perfekti cho bài học ('olen oppinut').",
  },
  {
    id: "write-suositus",
    type: "mielipide",
    title: "Suosituskirje - Recommendation",
    promptFi: "Kirjoita ystävällesi suositus hyvästä ravintolasta tai paikasta. Perustele, miksi suosittelet sitä.",
    promptVi: "Viết thư giới thiệu cho bạn về một nhà hàng/địa điểm yêu thích và giải thích lý do.",
    minWords: 80,
    timeMinutes: 20,
    structure: [
      { step: "1. Tervehdys", stepFi: "Ystävällinen", example: "Hei Anna," },
      { step: "2. Suositus", stepFi: "Sano selkeästi", example: "Haluan suositella sinulle ravintola Saunaa." },
      { step: "3. Sijainti & tyyli", stepFi: "Lyhyt esittely", example: "Se sijaitsee keskustassa ja on tunnelmaltaan rento." },
      { step: "4. Perustelu", stepFi: "Miksi suosittelet (2 syytä)", example: "Ruoka on tuoretta ja hinnat ovat kohtuulliset." },
      { step: "5. Lopetus", stepFi: "Kannustava", example: "Toivottavasti pidät siitä yhtä paljon kuin minä!" },
    ],
    phrases: [
      { fi: "Suosittelen lämpimästi…", meaning: "I warmly recommend…" },
      { fi: "Erityisesti pidän…", meaning: "I especially like…" },
      { fi: "Kannattaa kokeilla…", meaning: "It's worth trying…" },
      { fi: "Ehdottomasti…", meaning: "Definitely…" },
      { fi: "Olen varma, että…", meaning: "I'm sure that…" },
    ],
    teacherTipFi: "Käytä konkreettisia esimerkkejä: nimet, ruokalajit, hinnat. Ne tekevät suosituksesta uskottavan.",
    teacherTipVi: "Dùng ví dụ cụ thể: tên món, giá, vị trí. Khiến lời giới thiệu đáng tin hơn.",
  },
  {
    id: "write-uutiskirje",
    type: "mielipide",
    title: "Lyhyt uutinen - Short news report",
    promptFi: "Kirjoita lyhyt uutinen tapahtumasta omassa kaupungissasi (esim. konsertti, festivaali, urheilutapahtuma).",
    promptVi: "Viết bản tin ngắn về một sự kiện ở thành phố bạn (concert, lễ hội, sự kiện thể thao).",
    minWords: 80,
    timeMinutes: 20,
    structure: [
      { step: "1. Otsikko", stepFi: "Lyhyt ja selkeä", example: "Kesäfestivaali keräsi tuhansia kävijöitä" },
      { step: "2. Mitä", stepFi: "Mitä tapahtui", example: "Viime viikonloppuna järjestettiin suuri musiikkifestivaali keskuspuistossa." },
      { step: "3. Milloin & missä", stepFi: "Aika ja paikka", example: "Tapahtuma alkoi perjantaina ja päättyi sunnuntaina." },
      { step: "4. Yksityiskohdat", stepFi: "Kuka, miten paljon", example: "Esiintyjinä oli sekä suomalaisia että ulkomaisia artisteja. Yleisöä saapui yli 5000." },
      { step: "5. Lopetus", stepFi: "Tulevaisuus", example: "Järjestäjien mukaan festivaali järjestetään uudestaan ensi kesänä." },
    ],
    phrases: [
      { fi: "Tapahtuma järjestettiin…", meaning: "The event was organized…" },
      { fi: "Yleisöä saapui yli…", meaning: "Over … visitors arrived" },
      { fi: "Järjestäjien mukaan…", meaning: "According to the organizers…" },
      { fi: "Suosio yllätti…", meaning: "The popularity surprised…" },
      { fi: "Tapahtuma jatkuu ensi vuonna…", meaning: "The event will continue next year…" },
    ],
    teacherTipFi: "Vastaa kysymyksiin: Kuka? Mitä? Missä? Milloin? Miksi? - viiden W:n sääntö (5W).",
    teacherTipVi: "Trả lời 5W: Ai? Cái gì? Ở đâu? Khi nào? Tại sao? - quy tắc tin tức.",
  },
  {
    id: "write-kuvaus",
    type: "mielipide",
    title: "Henkilökuvaus - Describing a person",
    promptFi: "Kuvaile henkilöä, joka on vaikuttanut elämääsi (esimerkiksi opettaja, perheenjäsen tai ystävä).",
    promptVi: "Mô tả một người đã ảnh hưởng đến cuộc sống bạn (giáo viên, người thân, bạn bè).",
    minWords: 90,
    timeMinutes: 25,
    structure: [
      { step: "1. Esittely", stepFi: "Kuka hän on", example: "Haluan kertoa lukio-opettajastani Pirkosta." },
      { step: "2. Ulkonäkö", stepFi: "Lyhyt kuvaus", example: "Hän on noin 50-vuotias, lyhyt ja aina hymyilevä." },
      { step: "3. Luonne", stepFi: "Persoonallisuuspiirteitä", example: "Hän on kärsivällinen ja erittäin ystävällinen." },
      { step: "4. Vaikutus", stepFi: "Miten hän vaikutti sinuun", example: "Hänen ansiostaan aloin uskoa kykyihini." },
      { step: "5. Lopetus", stepFi: "Tunnustus / kiitos", example: "Olen aina kiitollinen siitä, että hän opetti minua." },
    ],
    phrases: [
      { fi: "Hän on luonteeltaan…", meaning: "By nature he/she is…" },
      { fi: "Pidän hänestä, koska…", meaning: "I like him/her because…" },
      { fi: "Hän on opettanut minulle, että…", meaning: "He/she has taught me that…" },
      { fi: "Ihailen erityisesti hänen…", meaning: "I especially admire his/her…" },
      { fi: "Olen kiitollinen…", meaning: "I am grateful…" },
    ],
    teacherTipFi: "Käytä adjektiiveja monipuolisesti. Vältä toistoa: 'kiva → mukava, mukavaa, ystävällinen, lämmin'.",
    teacherTipVi: "Dùng tính từ đa dạng. Tránh lặp 'kiva' - thay bằng 'mukava, ystävällinen, lämmin'.",
  },
];

/* ============================================================
 * SPEAKING - extra B1 situations
 * ============================================================ */
export const B1_SPEAKING_EXPANSION: B1SpeakingSituation[] = [
  {
    id: "speak-7",
    title: "Pankissa lainan hakeminen",
    scenarioFi: "Olet pankissa hakemassa pientä lainaa. Selitä, mihin tarvitset lainan ja kysy ehdoista.",
    scenarioVi: "Bạn đến ngân hàng vay tiền. Giải thích lý do và hỏi điều kiện.",
    taskFi: "Esittele itsesi, kerro syy lainalle, kysy korosta ja takaisinmaksuajasta.",
    hintsFi: ["Haluaisin hakea lainaa…", "Tarvitsen lainan…", "Mikä on korko?", "Kuinka pitkä takaisinmaksuaika on?"],
    timeMinutes: 4,
    speakingCoachLink: "/speaking-coach/finnish?topic=banking",
  },
  {
    id: "speak-8",
    title: "Auton vuokraaminen",
    scenarioFi: "Vuokraat auton lomalle. Kysy hinnoista, vakuutuksesta ja palautuspaikasta.",
    scenarioVi: "Bạn thuê xe đi nghỉ. Hỏi giá, bảo hiểm và nơi trả xe.",
    taskFi: "Tervehdi, kerro vuokra-ajat, kysy 3 kysymystä, kiitä lopuksi.",
    hintsFi: ["Haluaisin vuokrata auton…", "Sisältyykö vakuutus?", "Missä auton voi palauttaa?", "Kuinka paljon se maksaa päivässä?"],
    timeMinutes: 4,
    speakingCoachLink: "/speaking-coach/finnish?topic=travel",
  },
  {
    id: "speak-9",
    title: "Internet-yhteys ei toimi",
    scenarioFi: "Soitat operaattorille, koska kotisi internet ei toimi. Kuvaile ongelma ja pyydä apua.",
    scenarioVi: "Bạn gọi nhà mạng vì internet không hoạt động. Mô tả vấn đề và xin trợ giúp.",
    taskFi: "Selitä ongelma, kerro mitä olet jo kokeillut, kysy milloin apu tulee.",
    hintsFi: ["Internetini ei toimi…", "Olen jo kokeillut käynnistää modeemin uudestaan…", "Milloin tekninen apu voi tulla?", "Voitteko tehdä sen pikaisesti?"],
    timeMinutes: 3,
    speakingCoachLink: "/speaking-coach/finnish?topic=service",
  },
  {
    id: "speak-10",
    title: "Harrastuksesta puhuminen",
    scenarioFi: "Kerro harrastuksestasi: mitä teet, miksi pidät siitä, kuinka kauan olet harrastanut.",
    scenarioVi: "Kể về sở thích của bạn: bạn làm gì, vì sao thích, đã làm bao lâu.",
    taskFi: "Esittele harrastus, kerro 3 syytä miksi pidät siitä, suosittele sitä muille.",
    hintsFi: ["Harrastan…", "Aloitin harrastuksen…", "Pidän siitä, koska…", "Suosittelen tätä kaikille, koska…"],
    timeMinutes: 4,
    speakingCoachLink: "/speaking-coach/finnish?topic=hobby",
  },
  {
    id: "speak-11",
    title: "Kaupassa palauttaminen",
    scenarioFi: "Olet ostanut takin, joka ei sovi. Mene kauppaan ja palauta se kohteliaasti.",
    scenarioVi: "Bạn mua áo khoác không vừa. Đến cửa hàng trả lại lịch sự.",
    taskFi: "Tervehdi, selitä syy, kysy hyvitystä tai vaihtoa, kiitä.",
    hintsFi: ["Ostin tämän takin viikko sitten…", "Valitettavasti se ei sovi…", "Voinko vaihtaa sen?", "Saanko rahat takaisin?"],
    timeMinutes: 3,
    speakingCoachLink: "/speaking-coach/finnish?topic=shopping",
  },
  {
    id: "speak-12",
    title: "Tulevaisuuden suunnitelmat",
    scenarioFi: "Kerro mitä haluat tehdä seuraavien viiden vuoden aikana: työ, opiskelu, perhe, matkustaminen.",
    scenarioVi: "Kể về kế hoạch 5 năm tới: công việc, học tập, gia đình, du lịch.",
    taskFi: "Mainitse 3 tavoitetta, perustele miksi ne ovat tärkeitä, kerro miten aiot saavuttaa ne.",
    hintsFi: ["Tulevaisuudessa haluan…", "Ensimmäinen tavoitteeni on…", "Tämä on tärkeää, koska…", "Aion työskennellä kovasti…"],
    timeMinutes: 4,
    speakingCoachLink: "/speaking-coach/finnish?topic=future",
  },
];

/* ============================================================
 * VOCABULARY - extra B1 word pool (rotates)
 * ============================================================ */
export const B1_WORD_POOL_EXPANSION: B1WordOfDay[] = [
  { fi: "asenne", partOfSpeech: "noun", meaningEn: "attitude", meaningVi: "thái độ",
    exampleFi: "Hyvä asenne auttaa työssä.", exampleEn: "A good attitude helps at work." },
  { fi: "vakuuttaa", partOfSpeech: "verb", meaningEn: "to convince", meaningVi: "thuyết phục",
    exampleFi: "Hän vakuutti minut tulemaan mukaan.", exampleEn: "She convinced me to join." },
  { fi: "kärsivällinen", partOfSpeech: "adjective", meaningEn: "patient", meaningVi: "kiên nhẫn",
    exampleFi: "Opettajan pitää olla kärsivällinen.", exampleEn: "A teacher needs to be patient." },
  { fi: "epäonnistua", partOfSpeech: "verb", meaningEn: "to fail", meaningVi: "thất bại",
    exampleFi: "Älä pelkää epäonnistua.", exampleEn: "Don't be afraid to fail." },
  { fi: "menestyä", partOfSpeech: "verb", meaningEn: "to succeed", meaningVi: "thành công",
    exampleFi: "Hän menestyi opinnoissaan.", exampleEn: "She succeeded in her studies." },
  { fi: "vaikuttavuus", partOfSpeech: "noun", meaningEn: "impact / effectiveness", meaningVi: "tác động",
    exampleFi: "Mainoksen vaikuttavuus on suuri.", exampleEn: "The ad's impact is great." },
  { fi: "vastuu", partOfSpeech: "noun", meaningEn: "responsibility", meaningVi: "trách nhiệm",
    exampleFi: "Otan vastuun tehtävästä.", exampleEn: "I take responsibility for the task." },
  { fi: "neuvotella", partOfSpeech: "verb", meaningEn: "to negotiate", meaningVi: "đàm phán",
    exampleFi: "Voimme neuvotella hinnasta.", exampleEn: "We can negotiate the price." },
  { fi: "kestävä", partOfSpeech: "adjective", meaningEn: "sustainable / durable", meaningVi: "bền vững",
    exampleFi: "Kestävä kehitys on tärkeää.", exampleEn: "Sustainable development is important." },
  { fi: "kohtuullinen", partOfSpeech: "adjective", meaningEn: "reasonable", meaningVi: "hợp lý",
    exampleFi: "Hinta on kohtuullinen.", exampleEn: "The price is reasonable." },
  { fi: "ennustaa", partOfSpeech: "verb", meaningEn: "to predict", meaningVi: "dự đoán",
    exampleFi: "Sääennuste ennustaa sadetta.", exampleEn: "The forecast predicts rain." },
  { fi: "vaihtelu", partOfSpeech: "noun", meaningEn: "variation / change", meaningVi: "sự thay đổi",
    exampleFi: "Säässä on paljon vaihtelua.", exampleEn: "There is a lot of variation in the weather." },
  { fi: "harkita", partOfSpeech: "verb", meaningEn: "to consider", meaningVi: "cân nhắc",
    exampleFi: "Harkitsen muuttoa Helsinkiin.", exampleEn: "I'm considering moving to Helsinki." },
  { fi: "kannattaa", partOfSpeech: "verb", meaningEn: "to be worth / to support", meaningVi: "đáng / ủng hộ",
    exampleFi: "Kannattaa lukea kirja.", exampleEn: "It's worth reading the book." },
  { fi: "edellyttää", partOfSpeech: "verb", meaningEn: "to require / presuppose", meaningVi: "yêu cầu",
    exampleFi: "Tehtävä edellyttää tarkkuutta.", exampleEn: "The task requires precision." },
  { fi: "ilmaista", partOfSpeech: "verb", meaningEn: "to express", meaningVi: "diễn đạt",
    exampleFi: "Hän ilmaisi mielipiteensä selvästi.", exampleEn: "She expressed her opinion clearly." },
  { fi: "kokeilla", partOfSpeech: "verb", meaningEn: "to try / experiment", meaningVi: "thử",
    exampleFi: "Haluan kokeilla uutta ruokaa.", exampleEn: "I want to try new food." },
  { fi: "puolustaa", partOfSpeech: "verb", meaningEn: "to defend", meaningVi: "bảo vệ",
    exampleFi: "Puolustan oikeuksiani.", exampleEn: "I defend my rights." },
  { fi: "selviytyä", partOfSpeech: "verb", meaningEn: "to cope / survive", meaningVi: "vượt qua",
    exampleFi: "Selviydyin vaikeasta päivästä.", exampleEn: "I got through a hard day." },
  { fi: "päättäväinen", partOfSpeech: "adjective", meaningEn: "determined", meaningVi: "quyết tâm",
    exampleFi: "Hän on päättäväinen ihminen.", exampleEn: "She is a determined person." },
  { fi: "joustava", partOfSpeech: "adjective", meaningEn: "flexible", meaningVi: "linh hoạt",
    exampleFi: "Työaikani on joustava.", exampleEn: "My working hours are flexible." },
  { fi: "luovuus", partOfSpeech: "noun", meaningEn: "creativity", meaningVi: "sự sáng tạo",
    exampleFi: "Luovuus on tärkeä taito.", exampleEn: "Creativity is an important skill." },
  { fi: "rohkeus", partOfSpeech: "noun", meaningEn: "courage", meaningVi: "lòng can đảm",
    exampleFi: "Tarvitset rohkeutta puhua julkisesti.", exampleEn: "You need courage to speak publicly." },
  { fi: "epävarmuus", partOfSpeech: "noun", meaningEn: "uncertainty", meaningVi: "sự không chắc chắn",
    exampleFi: "Tulevaisuudessa on aina epävarmuutta.", exampleEn: "There is always uncertainty in the future." },
];
