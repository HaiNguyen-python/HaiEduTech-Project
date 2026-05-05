/**
 * @file ykiB1Expansion2.ts
 * @description Second wave of YKI B1 content - extra reading, listening, writing,
 *   speaking, and word-of-the-day pool. Doubles the practice volume.
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
 * READING - wave 2
 * ============================================================ */
export const B1_READING_EXPANSION2: B1ReadingPassage[] = [
  {
    id: "read-13",
    title: "Uutinen: Etätyö muuttaa kaupungit",
    type: "news",
    timeMinutes: 8,
    textFi:
      "Uutinen: Etätyö muuttaa kaupungit\n\nEtätyö on yleistynyt Suomessa huomattavan nopeasti pandemian jälkeen, ja se on muuttanut monien suomalaisten arkipäivää pysyvästi. Monet työntekijät ovat huomanneet, että kotona työskentely säästää aikaa ja rahaa, koska päivittäiset työmatkat jäävät pois ja polttoainekulut tai bussiliput eivät enää maksa niin paljon. Vaikka joustavuus on suuri etu, tilanteessa on myös huonoja puolia. Toisaalta on huomattu, että sosiaaliset suhteet työpaikalla ovat vähentyneet, kun kollegoita ei tavata enää kasvotusten kahvitauoilla.\n\nTyökulttuurin muutos näkyy selvästi myös katukuvassa. Tutkijoiden mukaan kaupunkien keskustat ovat hiljentyneet merkittävästi, kun toimistoja on vähemmän käytössä ja työpisteet seisovat tyhjinä. Tämä vaikuttaa esimerkiksi lounasravintoloiden ja pienten kauppojen toimintaan. Samaan aikaan tilanne on kuitenkin synnyttänyt uusia mahdollisuuksia muualla maassa. Toisaalta lähikylät ja pienemmät kaupungit hyötyvät tästä kehityksestä, kun ihmiset muuttavat kauemmas pääkaupungista etsiessään edullisempia asuntoja ja luonnon rauhaa. On mielenkiintoista nähdä, miten Suomen alueellinen kehitys jatkuu tulevaisuudessa, kun asuinpaikka ei enää sido ihmisiä samalla tavalla kuin ennen.",
    hintVi: "Etätyö thay đổi cấu trúc thành phố sau đại dịch.",
    questions: [
      { q: "Mikä on etätyön etu tekstin mukaan?", options: ["Enemmän palkkaa", "Säästää aikaa ja rahaa", "Parempi terveys", "Lyhyemmät päivät"], answer: 1, explanationFi: "'kotona työskentely säästää aikaa ja rahaa'." },
      { q: "Mitä kaupunkien keskustoissa tapahtuu?", options: ["Ne kasvavat", "Ne ovat hiljentyneet", "Liikenne lisääntyy", "Vuokrat nousevat"], answer: 1, explanationFi: "'kaupunkien keskustat ovat hiljentyneet'." },
      { q: "Kuka hyötyy muutoksesta?", options: ["Suuret kaupungit", "Lähikylät ja pienemmät kaupungit", "Vain pomot", "Ulkomaalaiset"], answer: 1, explanationFi: "'lähikylät ja pienemmät kaupungit hyötyvät'." },
      { q: "Milloin etätyö on erityisesti yleistynyt Suomessa?", options: ["Ennen pandemiaa", "Pandemian jälkeen", "Viime vuosikymmenen aikana", "Aina ollut yleistä"], answer: 1, explanationFi: "Tekstissä mainitaan selvästi, että etätyö on yleistynyt 'nopeasti pandemian jälkeen'." },
      { q: "Mitä haittapuolta etätyöllä on tekstin mukaan?", options: ["Lisääntyneet matkakulut", "Vähentyneet sosiaaliset suhteet työpaikalla", "Parempi työympäristö", "Vaikeampi keskittyminen"], answer: 1, explanationFi: "Tekstissä sanotaan, että 'sosiaaliset suhteet työpaikalla ovat vähentyneet' etätyön vuoksi." },
      { q: "Miksi kaupunkien keskustat ovat hiljentyneet?", options: ["Lisääntyneen matkailun vuoksi", "Kun ihmiset muuttavat takaisin kaupunkeihin", "Kun toimistoja on vähemmän käytössä", "Koska internet-yhteydet ovat parantuneet"], answer: 2, explanationFi: "Tekstin mukaan 'Tutkijoiden mukaan kaupunkien keskustat ovat hiljentyneet, kun toimistoja on vähemmän käytössä.'" }
    ],
  },
  {
    id: "read-14",
    title: "Sähköposti: Lapsen koulukuljetus",
    type: "email",
    timeMinutes: 6,
    textFi:
      "Hyvä huoltaja,\n\nLähestymme teitä kotiin lähetettävällä tiedotteella, joka koskee uuden lukuvuoden järjestelyjä. Haluamme ilmoittaa, että lapsenne koulukuljetus alkaa virallisesti ensi maanantaina 14.8. On tärkeää, että oppilas on valmiina lapsen pysäkillä hyvissä ajoin.\n\nKuljetus on suunniteltu huolellisesti, ja bussi pysähtyy joka aamu täsmälleen klo 7.45 tutussa osoitteessa Koivutie 5. Pyydämme, että lapsi odottaa bussia turvallisessa paikassa tien reunassa. Koulupäivän päätyttyä iltapäivällä lapsi saapuu takaisin samaan paikkaan, eli Koivutie 5:n kohdalle, noin klo 14.30. Toivomme, että tämä aikataulu sopii perheenne arkeen hyvin.\n\nJoskus liikenteessä voi kuitenkin tulla yllättäviä viivästyksiä tai muita tilanteita. Jos kuljetuksessa on joitakin muutoksia tai peruutuksia, me ilmoitamme niistä teille välittömästi tekstiviestillä suoraan huoltajan matkapuhelimeen. Tätä varten on hyvä tarkistaa, että yhteystietonne ovat ajan tasalla järjestelmässämme.\n\nMikäli teillä on kysyttävää reiteistä tai tarvitsette muuta apua, lisätietoja saa rehtorilta kääntymällä hänen puoleensa. Toivotamme lapsellenne oikein mukavaa ja turvallista koulumatkaa!\n\nTerveisin,\nKoulutoimisto",
    hintVi: "Email thông báo lịch xe buýt trường học.",
    questions: [
      { q: "Mihin aikaan bussi pysähtyy aamulla?", options: ["7.30", "7.45", "8.00", "8.15"], answer: 1, explanationFi: "'klo 7.45'." },
      { q: "Miten muutoksista ilmoitetaan?", options: ["Sähköpostilla", "Tekstiviestillä", "Soittamalla", "Kirjeellä"], answer: 1, explanationFi: "'ilmoitamme tekstiviestillä'." },
      { q: "Kenestä saa lisätietoja?", options: ["Bussinkuljettajalta", "Rehtorilta", "Naapurilta", "Opettajalta"], answer: 1, explanationFi: "'Lisätietoja saa rehtorilta'." },
      { q: "Milloin koulukuljetus alkaa?", options: ["Perjantaina 14.8.", "Maanantaina 14.8.", "Keskiviikkona 14.8.", "Tiistaina 14.8."], answer: 1, explanationFi: "Tekstissä mainitaan, että koulukuljetus alkaa maanantaina 14.8." },
      { q: "Mikä on bussipysäkin osoite?", options: ["Koivutie 4", "Pihlajatie 5", "Koivutie 5", "Koulutie 5"], answer: 2, explanationFi: "Tekstissä kerrotaan, että bussi pysähtyy osoitteessa Koivutie 5." },
      { q: "Kuka on viestin lähettäjä?", options: ["Rehtori", "Huoltaja", "Kuljettaja", "Koulutoimisto"], answer: 3, explanationFi: "Viestin lopussa on allekirjoitus 'Koulutoimisto'." }
    ],
  },
  {
    id: "read-15",
    title: "Ilmoitus: Liikuntaviikko alkaa",
    type: "notice",
    timeMinutes: 5,
    textFi:
      "Ilmoitus: Liikuntaviikko alkaa\n\nLämpimästi tervetuloa mukaan kaupungin suosittuun liikuntaviikkoon, joka järjestetään tänä syksynä 5.–11.9.! Tämän viikon tavoitteena on innostaa kaikkia kuntalaisia liikkumaan yhdessä ja kokeilemaan uusia lajeja helposti. Tarjoamme erilaisia ilmaisia tunteja, joihin kuka tahansa voi osallistua riippumatta kuntotasosta.\n\nViikon ohjelmassa on monipuolisesti eri lajeja: valikoimaan kuuluvat rentouttava jooga, reipas sauvakävely, virkistävä vesijuoksu sekä hauska ja vauhdikas tanssi. Nämä kaikki tunnit ovat täysin avoimia kaikenikäisille asukkaille, joten lapset, nuoret ja seniorit ovat kaikki tervetulleita liikkumaan.\n\nOlethan tarkkana, sillä ilmoittautuminen alkaa 1.9. kätevästi verkossa kaupungin nettisivuilla. Koska kyseessä on suosittu tapahtuma, mukaan mahtuu vain rajoitettu määrä osallistujia kullekin tunnille. Jos haluat varmistaa paikkasi suosikkilajissasi, suosittelemme, että olet nopea ja teet varauksen heti, kun ilmoittautuminen aukeaa. Kaikki tunnit ovat maksuttomia, joten osallistujille ei koidu kuluja. Toivotamme oikein aktiivista ja energistä liikkumisen viikkoa kaikille!",
    hintVi: "Thông báo tuần lễ thể thao miễn phí.",
    questions: [
      { q: "Milloin liikuntaviikko on?", options: ["1.–4.9.", "5.–11.9.", "12.–18.9.", "Lokakuussa"], answer: 1, explanationFi: "'5.–11.9.'" },
      { q: "Mikä tunti EI ole listalla?", options: ["Jooga", "Sauvakävely", "Tennis", "Tanssi"], answer: 2, explanationFi: "Tennistä ei mainita." },
      { q: "Kenelle tunnit ovat?", options: ["Vain lapsille", "Vain aikuisille", "Kaikenikäisille", "Vain naisille"], answer: 2, explanationFi: "'avoimia kaikenikäisille'." },
      { q: "Mistä ilmoittautuminen alkaa?", options: ["Puhelimitse", "Sähköpostilla", "Verkossa", "Paikan päällä"], answer: 2, explanationFi: "Tekstissä sanotaan 'Ilmoittautuminen alkaa 1.9. verkossa'." },
      { q: "Miksi pitää olla nopea, jos haluaa osallistua?", options: ["Koska kaikki tunnit ovat jo täynnä.", "Koska tunnit alkavat pian.", "Koska osallistujamäärä on rajoitettu.", "Koska se on erittäin suosittu tapahtuma."], answer: 2, explanationFi: "Tekstissä lukee 'Mukaan mahtuu rajoitettu määrä osallistujia, joten ole nopea!'." },
      { q: "Mitä kuluja osallistujille koituu tunneista?", options: ["Ne maksavat 5 euroa per tunti.", "Ne ovat täysin ilmaisia.", "Ne maksavat 10 euroa viikolta.", "Ne ovat ilmaisia lapsille, mutta aikuisille maksullisia."], answer: 1, explanationFi: "Tekstissä mainitaan 'Tarjoamme ilmaisia tunteja', mikä tarkoittaa, että tunnit ovat maksuttomia." }
    ],
  },
  {
    id: "read-16",
    title: "Virallinen kirje: Vuokrasopimuksen päättyminen",
    type: "letter",
    timeMinutes: 8,
    textFi:
      "Hyvä vuokralainen,\n\nKirjoitamme teille tiedottaaksemme nykyisen vuokrasopimuksenne tilanteesta. Virallisten tietojemme mukaan vuokrasopimuksenne päättyy 30.11.2025. Haluamme muistuttaa teitä ajoissa sopimukseen liittyvistä ehdoista ja jatko-mahdollisuuksista.\n\nMikäli olette viihtyneet asunnossa ja haluatte jatkaa sopimusta nykyisen kauden jälkeen, teidän täytyy ottaa yhteyttä toimistoon viimeistään kuukausi ennen sopimuksen loppumista. Tällöin voimme keskustella uuden sopimuksen yksityiskohdista ja mahdollisista muutoksista.\n\nMikäli ette kuitenkaan jatka sopimusta, huomioikaa muuttoon liittyvät velvollisuudet. Asunto on luovutettava takaisin kiinteistönomistajalle täysin puhtaana ja tyhjänä. On tärkeää, että kaikki omat tavaranne on viety pois. Muistattehan, että loppusiivouksesta vastaa vuokralainen itse. Asunnon on oltava siivottu huolellisesti ennen avainten palautusta.\n\nAsunnon hallinnan luovutus ja avainten palautus on tapahduttava viimeistään sopimuksen päättymispäivän klo 12.00 mennessä. Tämän jälkeen suoritamme asunnossa lopputarkastuksen. Jos teillä on kysyttävää muuttopäivään tai siivoukseen liittyen, voitte olla yhteydessä asiakaspalveluumme.\n\nYstävällisin terveisin,\n\nKiinteistönomistaja",
    hintVi: "Thư báo kết thúc hợp đồng thuê nhà.",
    questions: [
      { q: "Milloin vuokrasopimus päättyy?", options: ["31.10.2025", "30.11.2025", "31.12.2025", "1.1.2026"], answer: 1, explanationFi: "'päättyy 30.11.2025'." },
      { q: "Milloin pitää ilmoittaa, jos haluaa jatkaa?", options: ["Päätöspäivänä", "Viimeistään kuukausi ennen", "Kaksi kuukautta ennen", "Milloin tahansa"], answer: 1, explanationFi: "'viimeistään kuukausi ennen sopimuksen loppumista'." },
      { q: "Kuka vastaa loppusiivouksesta?", options: ["Vuokranantaja", "Kaupunki", "Vuokralainen", "Siivousfirma"], answer: 2, explanationFi: "'Loppusiivouksesta vastaa vuokralainen'." },
      { q: "Mihin aikaan asunto pitää luovuttaa viimeistään, jos ei jatka vuokrasopimusta?", options: ["Klo 9.00", "Klo 10.00", "Klo 12.00", "Klo 15.00"], answer: 2, explanationFi: "Tekstin mukaan asunto on luovutettava puhtaana ja tyhjänä viimeistään päättymispäivän klo 12.00." },
      { q: "Miten asunto pitää olla, kun se luovutetaan takaisin, jos sopimusta ei jatketa?", options: ["Sisustettuna", "Perussiivottuna ja osittain kalustettuna", "Puhtaana ja tyhjänä", "Siivousta odottamassa"], answer: 2, explanationFi: "Tekstissä sanotaan: 'asunto on luovutettava puhtaana ja tyhjänä'." },
      { q: "Kuka on tämän ilmoituksen lähettäjä?", options: ["Vuokralainen", "Toimisto", "Kiinteistönomistaja", "Naapuri"], answer: 2, explanationFi: "Ilmoituksen allekirjoituksessa lukee 'Kiinteistönomistaja'." }
    ],
  },
  {
    id: "read-17",
    title: "Uutinen: Suomi panostaa sähköautoihin",
    type: "news",
    timeMinutes: 8,
    textFi:
      "Uutinen: Suomi panostaa sähköautoihin\n\nSuomen hallitus on tehnyt uuden merkittävän päätöksen, jonka tarkoituksena on tukea sähköautojen ostoa uusilla valtion avustuksilla. Tämä on tärkeä askel kohti ympäristöystävällisempää liikennettä. Hallituksen tavoitteena on vähentää liikenteen päästöjä puoleen vuoteen 2030 mennessä, jotta Suomi voi saavuttaa tiukat ilmastotavoitteensa ajoissa.\n\nKuluttajille suunnattu taloudellinen tuki on merkittävä, sillä avustus on enintään 2000 euroa per auto. Hallitus toivoo, että tämä rahasumma kannustaa yhä useampia suomalaisia vaihtamaan vanhan bensiini- tai dieselautonsa puhtaampaan vaihtoehtoon. Pelkkä raha ei kuitenkaan riitä, vaan myös infrastruktuurin täytyy toimia. Siksi hallitus on luvannut, että lisäksi rakennetaan tuhansia uusia latauspisteitä eri puolille maata, jotta sähköautolla ajaminen on helppoa myös maaseudulla ja pitkillä matkoilla.\n\nMonet asiantuntijat pitävät tätä uutista positiivisena ja tarpeellisena käänteenä. Asiantuntijat uskovat, että muutos nopeutuu seuraavien viiden vuoden aikana, kun tekniikka kehittyy ja autojen hinnat laskevat. Jos suunnitelma onnistuu, Suomi on pian yksi Euroopan kärkimaita sähköisessä liikenteessä.",
    hintVi: "Tin: Phần Lan hỗ trợ xe điện.",
    questions: [
      { q: "Mikä on hallituksen tavoite?", options: ["Lisätä autoja", "Vähentää päästöjä puoleen", "Rakentaa moottoriteitä", "Korottaa veroja"], answer: 1, explanationFi: "'vähentää liikenteen päästöjä puoleen'." },
      { q: "Mikä on avustuksen enimmäismäärä?", options: ["1000 €", "2000 €", "5000 €", "10000 €"], answer: 1, explanationFi: "'enintään 2000 euroa per auto'." },
      { q: "Mitä myös rakennetaan?", options: ["Uusia bussireittejä", "Tuhansia latauspisteitä", "Junaratoja", "Kävelykatuja"], answer: 1, explanationFi: "'rakennetaan tuhansia uusia latauspisteitä'." },
      { q: "Kuinka paljon hallitus haluaa vähentää liikenteen päästöjä?", options: ["20 prosentilla", "Kolmanneksella", "Puoleen", "Kaikki päästöt"], answer: 2, explanationFi: "Tekstissä sanotaan, että hallituksen tavoitteena on vähentää liikenteen päästöjä puoleen." },
      { q: "Mihin mennessä liikenteen päästöt on tarkoitus vähentää?", options: ["Vuoteen 2025 mennessä", "Vuoteen 2030 mennessä", "Vuoteen 2035 mennessä", "Seuraavien viiden vuoden aikana"], answer: 1, explanationFi: "Tekstin mukaan hallituksen tavoitteena on vähentää päästöjä puoleen 'vuoteen 2030 mennessä'." },
      { q: "Kuka uskoo muutoksen nopeutuvan seuraavien viiden vuoden aikana?", options: ["Hallitus", "Kuluttajat", "Asiantuntijat", "Valmistajat"], answer: 2, explanationFi: "Viimeisessä lauseessa todetaan: 'Asiantuntijat uskovat, että muutos nopeutuu seuraavien viiden vuoden aikana'." }
    ],
  },
];

/* ============================================================
 * LISTENING - wave 2
 * ============================================================ */
export const B1_LISTENING_EXPANSION2: B1ListeningClip[] = [
  {
    id: "listen-11",
    title: "Verotoimistossa",
    scenarioFi: "Asiakas kysyy verokortista.",
    durationSeconds: 40,
    scriptFi:
      "Asiakas: Hei, haluaisin uuden verokortin. Tuloni ovat muuttuneet. Virkailija: Selvä. Onko sinulla mukana viimeisin palkkalaskelma? Asiakas: Kyllä, tässä on. Virkailija: Hyvä. Teemme uuden verokortin heti. Se on voimassa vuoden loppuun. Asiakas: Lähetetäänkö se postissa vai sähköisesti? Virkailija: Sähköisesti, OmaVeroon.",
    questions: [
      { q: "Miksi asiakas tarvitsee uuden verokortin?", options: ["Hän muutti", "Tulot ovat muuttuneet", "Hän aloitti opiskelun", "Hän jäi eläkkeelle"], answer: 1 },
      { q: "Mihin uusi verokortti lähetetään?", options: ["Postiin", "OmaVeroon (sähköisesti)", "Pankkitilille", "Kotiosoitteeseen"], answer: 1 },
      { q: "Mitä asiakkaalla on mukanaan, jonka virkailija haluaa nähdä?", options: ["Henkilöllisyystodistus", "Palkkalaskelma", "Vanha verokortti", "Pankkitunnukset"], answer: 1 },
      { q: "Kuinka kauan uusi verokortti on voimassa?", options: ["Kuukauden", "Vuoden", "Vuoden loppuun", "Toistaiseksi"], answer: 2 },
      { q: "Kuka pyytää asiakkaalta palkkalaskelmaa?", options: ["Asiakas itse", "Virkailija", "Postin työntekijä", "Pankin johtaja"], answer: 1 },
      { q: "Miksi virkailija voi tehdä uuden verokortin heti?", options: ["Asiakkaan pyynnöstä", "Koska asiakkaalla on palkkalaskelma mukana", "Koska asiakas on kiireinen", "Niin on tapa toimia"], answer: 1 }
    ],
  },
  {
    id: "listen-12",
    title: "Kelan asiakaspalvelussa",
    scenarioFi: "Asiakas kysyy lapsilisästä.",
    durationSeconds: 45,
    scriptFi:
      "Asiakas: Päivää, milloin lapsilisä maksetaan? Virkailija: Lapsilisä maksetaan kerran kuussa, kuukauden 26. päivänä. Asiakas: Pitääkö hakea uudestaan, jos saan toisen lapsen? Virkailija: Kyllä, sinun täytyy tehdä uusi hakemus. Voit tehdä sen verkossa Kelan sivuilla. Asiakas: Selvä. Kuinka kauan käsittely kestää? Virkailija: Yleensä kaksi viikkoa.",
    questions: [
      { q: "Milloin lapsilisä maksetaan?", options: ["1. päivänä", "15. päivänä", "26. päivänä", "Viimeisenä päivänä"], answer: 2 },
      { q: "Miten haetaan toisen lapsen lapsilisä?", options: ["Soittamalla", "Verkkohakemuksella Kelan sivuilla", "Postitse", "Käymällä toimistossa"], answer: 1 },
      { q: "Kauanko käsittely kestää?", options: ["Päivän", "Viikon", "Kaksi viikkoa", "Kuukauden"], answer: 2 },
      { q: "Kuinka usein lapsilisä maksetaan?", options: ["Kerran viikossa", "Kerran kuussa", "Kaksi kertaa kuussa", "Kerran vuodessa"], answer: 1 },
      { q: "Mistä uusi hakemus tehdään?", options: ["Postitse", "Puhelimitse", "Kelan toimistossa", "Verkossa Kelan sivuilla"], answer: 3 },
      { q: "Mitä asiakas kysyy virkailijalta toisen kerran?", options: ["Mitä asiakas kysyy virkailijalta toisen kerran?", "Kuinka paljon lapsilisää saa?", "Kuinka kauan käsittely kestää?", "Saako lapsilisää takautuvasti?"], answer: 2 }
    ],
  },
  {
    id: "listen-13",
    title: "Kuntosalilla",
    scenarioFi: "Henkilökohtainen valmentaja antaa neuvoja.",
    durationSeconds: 35,
    scriptFi:
      "Valmentaja: Mikä on tavoitteesi? Asiakas: Haluaisin laihtua viisi kiloa ja saada lihasta. Valmentaja: Hyvä. Suosittelen treenaamaan kolme kertaa viikossa: kaksi kertaa kuntosalilla ja kerran juoksemassa. Asiakas: Pitääkö myös ruokavaliota muuttaa? Valmentaja: Kyllä, syö enemmän proteiinia ja vähennä sokeria.",
    questions: [
      { q: "Mikä on asiakkaan tavoite?", options: ["Lihoa", "Laihtua ja saada lihasta", "Vain juosta maratonin", "Levätä"], answer: 1 },
      { q: "Mitä valmentaja suosittelee syömään?", options: ["Sokeria", "Enemmän proteiinia", "Pelkkiä kasviksia", "Vähemmän vettä"], answer: 1 },
      { q: "Kuinka monta kertaa viikossa valmentaja suosittelee asiakkaan treenaavan?", options: ["Kerran viikossa", "Kaksi kertaa viikossa", "Kolme kertaa viikossa", "Neljä kertaa viikossa"], answer: 2 },
      { q: "Missä asiakkaan tulisi käydä kaksi kertaa viikossa?", options: ["Joogassa", "Kuntosalilla", "Uimassa", "Juoksemassa"], answer: 1 },
      { q: "Mitä asiakkaan tulisi vähentää ruokavaliosta?", options: ["Proteiinia", "Rasvaa", "Sokeria", "Hedelmiä"], answer: 2 },
      { q: "Mitä lajia valmentaja suosittelee kerran viikossa?", options: ["Pyöräilyä", "Uimista", "Juoksua", "Voimanoston"], answer: 2 }
    ],
  },
  {
    id: "listen-14",
    title: "Yliopiston neuvonnassa",
    scenarioFi: "Vaihto-opiskelija kysyy kursseista.",
    durationSeconds: 40,
    scriptFi:
      "Opiskelija: Hei, olen uusi vaihto-opiskelija. Mistä saan listan kursseista? Neuvoja: Hyvä, että tulit. Kurssikatalogi on yliopiston nettisivuilla, kohdassa 'Opinto-opas'. Opiskelija: Voinko valita mitä tahansa kursseja? Neuvoja: Joitakin kursseja saa valita vapaasti, mutta osa edellyttää aiempia opintoja. Tarkista kuvauksesta. Opiskelija: Kiitos paljon!",
    questions: [
      { q: "Mistä löytyy kurssikatalogi?", options: ["Opettajalta", "Nettisivuilta, Opinto-oppaasta", "Kirjastosta", "Sähköpostista"], answer: 1 },
      { q: "Voiko kaikki kurssit valita vapaasti?", options: ["Kyllä, kaikki", "Ei, osa vaatii aiempia opintoja", "Vain ulkomaalaiset", "Vain maisteritason"], answer: 1 },
      { q: "Kuka kysyy neuvojalta kysymyksiä?", options: ["Vaihto-opiskelija", "Opettaja", "Neuvoja", "Yliopiston rehtori"], answer: 0 },
      { q: "Mitä opiskelija on yliopistolla?", options: ["Uusi neuvonantaja", "Uusi vaihto-opiskelija", "Vanha opettaja", "Kuraattori"], answer: 1 },
      { q: "Miten opiskelija saa tarkempaa tietoa kurssien vaatimuksista?", options: ["Kysymällä opettajalta", "Tarkistamalla kuvauksesta", "Soittamalla yliopistoon", "Lukemalla ilmoitustaululta"], answer: 1 },
      { q: "Mitä neuvoja sanoo heti alussa opiskelijalle?", options: ["Kiitos paljon", "Hei, olen neuvontapisteestä", "Hyvä, että tulit", "Mitä haluat?"], answer: 2 }
    ],
  },
  {
    id: "listen-15",
    title: "Naapuruston kokouksessa",
    scenarioFi: "Asukkaat keskustelevat pihasta.",
    durationSeconds: 50,
    scriptFi:
      "Puheenjohtaja: Tänään puhumme pihasta. Joku ehdotti uutta leikkipaikkaa lapsille. Asukas 1: Kannatan ideaa. Pihalla ei ole nyt mitään lapsille. Asukas 2: Mutta kuka maksaa sen? Puheenjohtaja: Hyvä kysymys. Hakemme ehkä avustusta kaupungilta. Asukas 1: Voisimme myös järjestää keräyksen. Puheenjohtaja: Hyvä idea. Päätetään seuraavassa kokouksessa.",
    questions: [
      { q: "Mistä asukkaat puhuvat?", options: ["Vuokrasta", "Uudesta leikkipaikasta", "Saunasta", "Pysäköinnistä"], answer: 1 },
      { q: "Miten leikkipaikka voitaisiin rahoittaa?", options: ["Vain vuokralaisten rahoilla", "Kaupungin avustuksella tai keräyksellä", "Lainalla", "Ulkomaalta"], answer: 1 },
      { q: "Milloin asiasta päätetään?", options: ["Tänään", "Seuraavassa kokouksessa", "Ensi vuonna", "Ei koskaan"], answer: 1 },
      { q: "Mikä on asukkaiden suurin huoli leikkipaikan suhteen?", options: ["Sen sijainti", "Kuka maksaa sen", "Kuka rakentaa sen", "Milloin se valmistuu"], answer: 1 },
      { q: "Mitä asukas 1 ehdottaa rahoitukseksi avustuksen lisäksi?", options: ["Lainaa pankilta", "Myyjäisiä", "Keräyksen järjestämistä", "Talkootyötä"], answer: 2 },
      { q: "Miksi leikkipaikka on asukas 1:n mielestä tarpeellinen?", options: ["Koska vanha on rikki", "Koska piha on liian tyhjä", "Koska pihalla ei ole mitään lapsille", "Koska lapset kyllästyvät helposti"], answer: 2 }
    ],
  },
];

/* ============================================================
 * WRITING - wave 2 (3 templates)
 * ============================================================ */
export const B1_WRITING_EXPANSION2: B1WritingTemplate[] = [
  {
    id: "write-blogi",
    type: "mielipide",
    title: "Blogiteksti - Blog post",
    promptFi: "Kirjoita blogiteksti aiheesta 'Mikä tekee elämästä onnellisen?'. Jaa omat ajatuksesi ja anna neuvoja lukijoille.",
    promptVi: "Viết blog về 'Điều gì làm cuộc sống hạnh phúc?'. Chia sẻ suy nghĩ và lời khuyên.",
    minWords: 100,
    timeMinutes: 25,
    structure: [
      { step: "1. Otsikko & koukku", stepFi: "Henkilökohtainen avaus", example: "Onnellisuus - pieniä asioita, suuria valintoja." },
      { step: "2. Oma kokemus", stepFi: "Kerro lyhyesti itsestäsi", example: "Olen pohtinut tätä viime aikoina paljon." },
      { step: "3. Pääajatukset 2–3", stepFi: "Listamuotoiset neuvot", example: "Ensinnäkin: vietä aikaa läheisten kanssa. Toiseksi: liiku ulkona." },
      { step: "4. Esimerkki", stepFi: "Konkreettinen tarina", example: "Esimerkiksi viime sunnuntaina kävelin metsässä ja tunsin oloni rauhalliseksi." },
      { step: "5. Lopetus & kysymys", stepFi: "Sitouta lukija", example: "Mitä sinä teet ollaksesi onnellinen? Kerro kommenteissa!" },
    ],
    phrases: [
      { fi: "Mielestäni tärkeintä on…", meaning: "I think the most important thing is…" },
      { fi: "Olen huomannut, että…", meaning: "I have noticed that…" },
      { fi: "Suosittelen lämpimästi…", meaning: "I warmly recommend…" },
      { fi: "Mikä toimii sinulle?", meaning: "What works for you?" },
      { fi: "Pieni asia voi muuttaa paljon.", meaning: "A small thing can change a lot." },
    ],
    teacherTipFi: "Käytä puhuttelua ('sinä', 'me') ja kysymyksiä - ne pitävät lukijan mukana. Älä unohda otsikkoa.",
    teacherTipVi: "Dùng đại từ 'sinä/me' và câu hỏi - giữ độc giả tham gia. Đừng quên tiêu đề.",
  },
  {
    id: "write-formal-email",
    type: "valitus",
    title: "Virallinen sähköposti viranomaiselle",
    promptFi: "Kirjoita sähköposti Migriin: kysy oleskelulupahakemuksesi tilanteesta. Mainitse hakemusnumero ja jättöpäivä.",
    promptVi: "Viết email cho Migri hỏi tình trạng hồ sơ giấy phép cư trú. Nêu số đơn và ngày nộp.",
    minWords: 80,
    timeMinutes: 20,
    structure: [
      { step: "1. Aihe / Subject", stepFi: "Lyhyt ja selkeä", example: "Aihe: Tiedustelu oleskelulupahakemuksesta nro 12345" },
      { step: "2. Tervehdys", stepFi: "Muodollinen", example: "Hyvä Migri,  /  Arvoisa vastaanottaja," },
      { step: "3. Esittely", stepFi: "Kerro kuka olet", example: "Nimeni on Mai Nguyen ja jätin oleskelulupahakemuksen 1.3.2025." },
      { step: "4. Asia", stepFi: "Selkeä kysymys", example: "Haluaisin tiedustella, missä vaiheessa hakemukseni käsittely on. Hakemusnumero: 12345." },
      { step: "5. Päätös", stepFi: "Kiitos + yhteystiedot", example: "Kiitän etukäteen vastauksestanne. Ystävällisin terveisin, Mai Nguyen, puh. 040 123 4567" },
    ],
    phrases: [
      { fi: "Haluaisin tiedustella…", meaning: "I would like to inquire…" },
      { fi: "Olen jättänyt hakemuksen päivämäärällä…", meaning: "I submitted the application on…" },
      { fi: "Voisitteko ystävällisesti kertoa…", meaning: "Could you kindly tell me…" },
      { fi: "Kiitän etukäteen…", meaning: "I thank you in advance…" },
      { fi: "Ystävällisin terveisin", meaning: "Best regards" },
    ],
    teacherTipFi: "Käytä teitittelyä (te, teidän) viranomaisille. Pidä viesti lyhyenä - yksi kappale per asia.",
    teacherTipVi: "Dùng cách xưng hô lịch sự (te/teidän) với cơ quan. Email ngắn gọn, mỗi đoạn 1 ý.",
  },
  {
    id: "write-vertailu",
    type: "mielipide",
    title: "Vertailu - Comparing two things",
    promptFi: "Vertaile kahta asiaa: kaupunkielämää ja maaseutuelämää. Mitä etuja ja haittoja kummassakin on?",
    promptVi: "So sánh sống thành phố và nông thôn. Ưu nhược điểm mỗi nơi.",
    minWords: 100,
    timeMinutes: 25,
    structure: [
      { step: "1. Aloitus", stepFi: "Esittele aihe", example: "Suomessa voi valita kaupunkielämän ja maaseudun välillä." },
      { step: "2. Kaupungin edut", stepFi: "2 etua + esimerkki", example: "Kaupungissa on enemmän palveluja, kuten kauppoja ja ravintoloita." },
      { step: "3. Kaupungin haitat", stepFi: "1–2 haittaa", example: "Toisaalta vuokrat ovat kalliimpia ja liikenne ruuhkaisaa." },
      { step: "4. Maaseudun edut/haitat", stepFi: "Saman rakenteen mukaan", example: "Maaseudulla on rauhallista ja luonto on lähellä, mutta palveluja on vähän." },
      { step: "5. Oma mielipide", stepFi: "Kumpi parempi minulle ja miksi", example: "Itse pidän enemmän kaupunkielämästä, koska arvostan palveluita." },
    ],
    phrases: [
      { fi: "Toisin kuin…", meaning: "Unlike…" },
      { fi: "Sen sijaan…", meaning: "Instead…" },
      { fi: "Kummassakin on hyviä puolia.", meaning: "Both have good sides." },
      { fi: "Toisaalta… toisaalta…", meaning: "On one hand… on the other…" },
      { fi: "Loppujen lopuksi…", meaning: "In the end…" },
    ],
    teacherTipFi: "Käytä vertailusanoja (toisaalta, sen sijaan, kummassakin). Älä luettele - peilaa rakenteita: ensin etu, sitten haitta.",
    teacherTipVi: "Dùng từ so sánh. Đừng liệt kê khô khan - đối chiếu: ưu rồi nhược.",
  },
];

/* ============================================================
 * SPEAKING - wave 2
 * ============================================================ */
export const B1_SPEAKING_EXPANSION2: B1SpeakingSituation[] = [
  {
    id: "speak-13",
    title: "Asunnon esittely vieraalle",
    scenarioFi: "Esittele uudelle ystävälle kotisi: huoneet, alue, mukavuudet.",
    scenarioVi: "Giới thiệu nhà cho bạn mới: phòng, khu vực, tiện nghi.",
    taskFi: "Mainitse 3 huonetta, kerro alueen edut, suosittele yhtä paikkaa lähellä.",
    hintsFi: ["Asun…", "Asunnossani on…", "Pidän erityisesti…", "Lähellä on hyvä…"],
    timeMinutes: 4,
    speakingCoachLink: "/speaking-coach/finnish?topic=home",
  },
  {
    id: "speak-14",
    title: "Kelan asiakaspalvelussa",
    scenarioFi: "Soitat Kelaan ja kysyt opintotuesta tai lapsilisästä.",
    scenarioVi: "Gọi Kela hỏi trợ cấp học tập hoặc trợ cấp con.",
    taskFi: "Esittele itsesi, esitä kysymys, vastaa lisäkysymyksiin, kiitä.",
    hintsFi: ["Hei, nimeni on…", "Haluaisin tiedustella…", "Mitä papereita tarvitsen?", "Kuinka kauan käsittely kestää?"],
    timeMinutes: 3,
    speakingCoachLink: "/speaking-coach/finnish?topic=service",
  },
  {
    id: "speak-15",
    title: "Mielipide etätyöstä",
    scenarioFi: "Kerro mielipiteesi etätyöstä: edut, haitat, suositus.",
    scenarioVi: "Nêu ý kiến về làm việc từ xa: lợi/hại, gợi ý.",
    taskFi: "Anna selkeä mielipide, perustele kahdella esimerkillä, anna suositus.",
    hintsFi: ["Mielestäni etätyö on…", "Etuna on, että…", "Toisaalta haittana on…", "Suosittelen, että…"],
    timeMinutes: 4,
    speakingCoachLink: "/speaking-coach/finnish?topic=opinion",
  },
  {
    id: "speak-16",
    title: "Lääkäriajan varaaminen",
    scenarioFi: "Soita terveysasemalle ja varaa aika lääkärille. Kuvaile oireet.",
    scenarioVi: "Gọi trạm y tế đặt lịch khám. Mô tả triệu chứng.",
    taskFi: "Tervehdi, kuvaile oireet, ehdota aikaa, vahvista varaus.",
    hintsFi: ["Hei, haluaisin varata ajan…", "Minulla on ollut…", "Olisiko vapaata…", "Sopiiko klo…"],
    timeMinutes: 3,
    speakingCoachLink: "/speaking-coach/finnish?topic=health",
  },
  {
    id: "speak-17",
    title: "Lomamatkasta kertominen",
    scenarioFi: "Kerro viime lomastasi: mihin menit, mitä teit, miltä tuntui.",
    scenarioVi: "Kể về kỳ nghỉ vừa rồi: đi đâu, làm gì, cảm thấy thế nào.",
    taskFi: "Mainitse kohde ja matka-aika, kerro 2 aktiviteettia, kerro tunne.",
    hintsFi: ["Viime kesänä matkustin…", "Vietin siellä…", "Parasta oli…", "Suosittelisin tätä paikkaa, koska…"],
    timeMinutes: 4,
    speakingCoachLink: "/speaking-coach/finnish?topic=travel",
  },
  {
    id: "speak-18",
    title: "Kierrätys kotona",
    scenarioFi: "Kerro, miten kierrätät kotona ja anna vinkkejä toiselle.",
    scenarioVi: "Kể cách bạn tái chế tại nhà và cho lời khuyên.",
    taskFi: "Mainitse 3 kierrätettävää asiaa, anna 1 hyödyllinen vinkki, perustele miksi se on tärkeää.",
    hintsFi: ["Kotona kierrätän…", "Erityisesti…", "Vinkkini on, että…", "Tämä on tärkeää, koska…"],
    timeMinutes: 4,
    speakingCoachLink: "/speaking-coach/finnish?topic=environment",
  },
];

/* ============================================================
 * WORD POOL - wave 2 (extra 30 words)
 * ============================================================ */
export const B1_WORD_POOL_EXPANSION2: B1WordOfDay[] = [
  { fi: "tasapaino", partOfSpeech: "noun", meaningEn: "balance", meaningVi: "cân bằng", exampleFi: "Tasapaino työn ja vapaa-ajan välillä on tärkeää.", exampleEn: "Balance between work and free time is important." },
  { fi: "saavutus", partOfSpeech: "noun", meaningEn: "achievement", meaningVi: "thành tựu", exampleFi: "YKI-todistus on iso saavutus.", exampleEn: "A YKI certificate is a big achievement." },
  { fi: "edistys", partOfSpeech: "noun", meaningEn: "progress", meaningVi: "tiến bộ", exampleFi: "Olen tehnyt edistystä suomen kielessä.", exampleEn: "I have made progress in Finnish." },
  { fi: "kehitys", partOfSpeech: "noun", meaningEn: "development", meaningVi: "sự phát triển", exampleFi: "Lapsen kehitys on nopeaa.", exampleEn: "A child's development is fast." },
  { fi: "vakavasti", partOfSpeech: "adverb", meaningEn: "seriously", meaningVi: "nghiêm túc", exampleFi: "Otan opiskelun vakavasti.", exampleEn: "I take studying seriously." },
  { fi: "rehellinen", partOfSpeech: "adjective", meaningEn: "honest", meaningVi: "trung thực", exampleFi: "Hän on aina rehellinen.", exampleEn: "She is always honest." },
  { fi: "kohtelias", partOfSpeech: "adjective", meaningEn: "polite", meaningVi: "lịch sự", exampleFi: "Suomessa on kohteliasta tervehtiä.", exampleEn: "In Finland it is polite to greet." },
  { fi: "kannustaa", partOfSpeech: "verb", meaningEn: "to encourage", meaningVi: "khuyến khích", exampleFi: "Vanhemmat kannustavat lapsiaan.", exampleEn: "Parents encourage their children." },
  { fi: "tunnistaa", partOfSpeech: "verb", meaningEn: "to recognize", meaningVi: "nhận ra", exampleFi: "Tunnistan hänet kuvasta.", exampleEn: "I recognize her from the photo." },
  { fi: "toimia", partOfSpeech: "verb", meaningEn: "to function / act", meaningVi: "hoạt động", exampleFi: "Tämä laite toimii hyvin.", exampleEn: "This device works well." },
  { fi: "sopeutua", partOfSpeech: "verb", meaningEn: "to adapt", meaningVi: "thích nghi", exampleFi: "Sopeuduin nopeasti uuteen maahan.", exampleEn: "I adapted quickly to the new country." },
  { fi: "suvaitsevainen", partOfSpeech: "adjective", meaningEn: "tolerant", meaningVi: "khoan dung", exampleFi: "Suvaitsevainen ihminen kunnioittaa muita.", exampleEn: "A tolerant person respects others." },
  { fi: "ennakkoluulo", partOfSpeech: "noun", meaningEn: "prejudice", meaningVi: "định kiến", exampleFi: "Ennakkoluulot vähenevät tutustumalla.", exampleEn: "Prejudices decrease through getting to know." },
  { fi: "kunnioittaa", partOfSpeech: "verb", meaningEn: "to respect", meaningVi: "tôn trọng", exampleFi: "Kunnioitan kollegoitani.", exampleEn: "I respect my colleagues." },
  { fi: "väittely", partOfSpeech: "noun", meaningEn: "debate", meaningVi: "tranh luận", exampleFi: "Hyvä väittely vaatii argumentteja.", exampleEn: "A good debate requires arguments." },
  { fi: "todistaa", partOfSpeech: "verb", meaningEn: "to prove", meaningVi: "chứng minh", exampleFi: "Hän todisti olevansa oikeassa.", exampleEn: "He proved he was right." },
  { fi: "yritys", partOfSpeech: "noun", meaningEn: "company / attempt", meaningVi: "công ty / nỗ lực", exampleFi: "Tämä yritys palkkaa väkeä.", exampleEn: "This company is hiring." },
  { fi: "asiakas", partOfSpeech: "noun", meaningEn: "customer", meaningVi: "khách hàng", exampleFi: "Asiakas on aina oikeassa.", exampleEn: "The customer is always right." },
  { fi: "laatu", partOfSpeech: "noun", meaningEn: "quality", meaningVi: "chất lượng", exampleFi: "Tuotteen laatu on hyvä.", exampleEn: "The product quality is good." },
  { fi: "hinta-laatusuhde", partOfSpeech: "noun", meaningEn: "value for money", meaningVi: "giá cả/chất lượng", exampleFi: "Hinta-laatusuhde on erinomainen.", exampleEn: "The value for money is excellent." },
  { fi: "tarjous", partOfSpeech: "noun", meaningEn: "offer / sale", meaningVi: "khuyến mãi", exampleFi: "Kaupassa oli hyvä tarjous.", exampleEn: "There was a good offer at the store." },
  { fi: "valikoima", partOfSpeech: "noun", meaningEn: "selection", meaningVi: "danh mục", exampleFi: "Valikoima on laaja.", exampleEn: "The selection is wide." },
  { fi: "varata", partOfSpeech: "verb", meaningEn: "to reserve / book", meaningVi: "đặt", exampleFi: "Varasin pöydän kahdelle.", exampleEn: "I booked a table for two." },
  { fi: "perua", partOfSpeech: "verb", meaningEn: "to cancel", meaningVi: "huỷ", exampleFi: "Jouduin perumaan tapaamisen.", exampleEn: "I had to cancel the meeting." },
  { fi: "siirtää", partOfSpeech: "verb", meaningEn: "to move / postpone", meaningVi: "dời / chuyển", exampleFi: "Siirsin kokouksen huomiseksi.", exampleEn: "I moved the meeting to tomorrow." },
  { fi: "selkeä", partOfSpeech: "adjective", meaningEn: "clear", meaningVi: "rõ ràng", exampleFi: "Ohjeet ovat selkeät.", exampleEn: "The instructions are clear." },
  { fi: "epäselvä", partOfSpeech: "adjective", meaningEn: "unclear", meaningVi: "không rõ", exampleFi: "Hänen vastauksensa oli epäselvä.", exampleEn: "His answer was unclear." },
  { fi: "tarkka", partOfSpeech: "adjective", meaningEn: "precise / careful", meaningVi: "chính xác", exampleFi: "Ole tarkka aikataulun kanssa.", exampleEn: "Be careful with the schedule." },
  { fi: "huolellinen", partOfSpeech: "adjective", meaningEn: "thorough / careful", meaningVi: "kỹ lưỡng", exampleFi: "Hän on huolellinen työssään.", exampleEn: "She is careful in her work." },
  { fi: "suosittu", partOfSpeech: "adjective", meaningEn: "popular", meaningVi: "phổ biến", exampleFi: "Tämä ravintola on suosittu nuorten keskuudessa.", exampleEn: "This restaurant is popular among young people." },
];
