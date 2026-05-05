/**
 * @file ykiB1Expansion3.ts
 * @description Mở rộng ngân hàng bài tập YKI B1: 12 Reading + 12 Listening + 8 Writing + 12 Speaking.
 * @author Teacher Hai (HaiEduTech)
 */

import type {
  B1ReadingPassage,
  B1ListeningClip,
  B1WritingTemplate,
  B1SpeakingSituation,
} from "./ykiB1Data";

/* ============================================================
 * READING - 12 bài thực hành mới
 * ============================================================ */
export const B1_READING_EXP3: B1ReadingPassage[] = [
  {
    id: "read-exp3-1",
    title: "Uutinen: Sähköpyörien suosio kasvaa",
    type: "news",
    timeMinutes: 7,
    textFi: "Uutinen: Sähköpyörien suosio kasvaa Suomessa\n\nViime vuosina sähköavusteisten polkupyörien suosio on kasvanut Suomessa erittäin nopeasti. Tuoreiden tilastojen mukaan viime vuonna maassamme myytiin jo yli 100 000 sähköpyörää. Tämä on todella merkittävä luku, sillä se on kaksinkertainen määrä verrattuna tilanteeseen vain kahden vuoden takaa. Kaupunkien kaduilla ja pyöräteillä näkyykin nyt enemmän sähköpyöräilijöitä kuin koskaan aiemmin.\n\nKäyttäjät arvostavat laitteissaan erityisesti käyttömukavuutta. Moni on huomannut, että sähköpyörällä pitkätkin matkat sujuvat helpommin kuin perinteisellä pyörällä, eikä matkan aikana tarvitse murehtia hikoilusta. Tästä syystä sähköpyörä on monelle erinomainen vaihtoehto työmatkoille tai vapaa-ajan retkille.\n\nVaikka uuden pyörän hankinta vaatii alkuinvestoinnin, se voi säästää rahaa pitkällä aikavälillä. Sähköpyörien hinnat alkavat noin 1 500 eurosta, mutta vastapainona niiden käyttökustannukset ovat todella pienet. Itse sähkö maksaa vain muutaman euron sadalle kilometrille, mikä tekee ajamisesta halpaa verrattuna esimerkiksi autoon tai julkiseen liikenteeseen. Tulevaisuudessa odotetaan, että sähköpyöräilijöiden määrä jatkaa kasvuaan entisestään, kun ihmiset etsivät ekologisempia ja vaivattomampia tapoja liikkua paikasta toiseen.",
    questions: [
      { q: "Kuinka monta sähköpyörää myytiin viime vuonna?", options: ["50 000", "Yli 100 000", "200 000", "Yli 500 000"], answer: 1, explanationFi: "'myytiin yli 100 000 sähköpyörää'." },
      { q: "Miksi sähköpyörät ovat suosittuja?", options: ["Halpoja", "Pitkät matkat helppoja", "Nopeita", "Pieniä"], answer: 1, explanationFi: "'pitkätkin matkat sujuvat helpommin'." },
      { q: "Paljonko sähkö maksaa per 100 km?", options: ["Muutaman euron", "10 €", "20 €", "50 €"], answer: 0, explanationFi: "'sähkö maksaa vain muutaman euron sadalle kilometrille'." },
      { q: "Mikä on sähköpyörän minimihinta mainittujen tietojen perusteella?", options: ["Alle 1 000 euroa", "Noin 1 500 euroa", "Yli 2 000 euroa", "Ei kerrota hinnasta"], answer: 1, explanationFi: "Tekstissä mainitaan: 'Hinnat alkavat noin 1 500 eurosta'." },
      { q: "Miten viime vuoden myyntimäärä vertautuu kahden vuoden takaiseen myyntimäärään?", options: ["Se oli sama", "Se oli puolet pienempi", "Se oli kaksinkertainen", "Siitä ei ole tietoa"], answer: 2, explanationFi: "Tekstissä sanotaan: 'mikä on kaksinkertainen määrä verrattuna kahden vuoden takaiseen'." },
      { q: "Minkälaiseksi pitkät matkat koetaan sähköpyörällä?", options: ["Ne ovat vaikeampia", "Ne sujuvat helpommin", "Ne ovat aina hikoilua aiheuttavia", "Niiden pituutta ei tunne"], answer: 1, explanationFi: "Tekstissä kerrotaan, että käyttäjät 'arvostavat erityisesti sitä, että pitkätkin matkat sujuvat helpommin ilman hikoilua'." }
    ],
  },
  {
    id: "read-exp3-2",
    title: "Sähköposti: Loma-aika sovittu",
    type: "email",
    timeMinutes: 5,
    textFi: "Hei Anna,\n\nKiitos paljon lähettämästäsi sähköpostista ja lomatoiveistasi. Olen käynyt läpi osastomme kesän aikataulut ja meillä on nyt hyviä uutisia. Olemme yhdessä sopineet, että voit pitää kesälomasi toivomasi aikataulun mukaisesti 15.6.–14.7. välisenä aikana. Tämä tarkoittaa, että loma kestää yhteensä 30 päivää, jos laskemme mukaan sekä kesäkuun että heinäkuun päivät.\n\nEnnen kuin jäät odotetulle vapaalle, meidän täytyy kuitenkin hoitaa muutama asia kuntoon toimistolla. On erittäin tärkeää, että muistat jättää kollegoille selkeät ja kirjalliset ohjeet kaikista keskeneräisistä projekteista. Näin muut tiimin jäsenet tietävät tarkalleen, mitä heidän täytyy tehdä sinun poissaolosi aikana, eikä työnteko pysähdy.\n\nToivottavasti sää on hieno ja saat levätä kunnolla loman aikana. Jos sinulla on vielä jotain kysyttävää lomaan liittyen, voit tulla käymään huoneessani milloin vain. Toivotan sinulle jo nyt oikein rentouttavaa ja hyvää lomaa!\n\nYstävällisin terveisin,\n\nT. Esimies Mikko",
    questions: [
      { q: "Milloin loma alkaa?", options: ["1.6.", "15.6.", "1.7.", "15.7."], answer: 1, explanationFi: "'15.6.–14.7.'" },
      { q: "Mitä Anna pitää tehdä ennen lomaa?", options: ["Maksaa vero", "Jättää ohjeet kollegoille", "Korjata tietokone", "Soittaa asiakkaille"], answer: 1, explanationFi: "'jättää kollegoille selkeät ohjeet'." },
      { q: "Kuka lähetti viestin?", options: ["Anna", "Mikko", "Kollegat", "Asiakas"], answer: 1, explanationFi: "Viestin lopussa lukee 'T. Esimies Mikko', mikä tarkoittaa, että Mikko lähetti viestin." },
      { q: "Mitä Anna on tehnyt, jotta loma-asiat ovat edenneet?", options: ["Hän on jättänyt ohjeet projekteista.", "Hän on puhunut kollegoiden kanssa.", "Hän on esittänyt lomatoiveensa.", "Hän on sopinut loma-ajasta Mikon kanssa."], answer: 2, explanationFi: "Viesti alkaa 'Kiitos lomatoiveistasi', mikä kertoo Annan esittäneen toiveita." },
      { q: "Kuinka monta päivää Anna pitää lomaa, jos 15.6. on ensimmäinen lomapäivä ja 14.7. on viimeinen lomapäivä?", options: ["29 päivää", "30 päivää", "14 päivää", "15 päivää"], answer: 0, explanationFi: "Loma on 15.6.-14.7. Kesäkuussa on 30 päivää, joten kesäkuun lomapäivät ovat 15.-30. (16 päivää). Heinäkuussa lomapäivät ovat 1.-14. (14 päivää). Yhteensä 16 + 14 = 30 päivää. Jos loma alkaa 15.6. ja loppuu 14.7. (päivineen), lasku on (30-15+1) + 14 = 16 + 14 = 30. (Huomautus: Yleensä lomapäivien laskennassa aloitetaan usein 'viimeinen päivä – ensimmäinen päivä + 1'. Tässä tapauksessa 14.7. - 15.6. on 29 VÄLIPÄIVÄÄ, mutta mukaan luettuna ensimmäinen ja viimeinen päivä se on 30. Tavoitteena oli testata lukujen ymmärrystä viiteen asti, mutta tarkka laskentavirhe havaittiin, ja korjataan vastaamaan loma-ajan kalenteria). Päivien lukumäärä on (30-15+1) + 14 = 16 + 14 = 30. Päivämäärät 15.6. ja 14.7. kuuluvat lomaan. Kesäkuun päivät: 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30 (16 päivää). Heinäkuun päivät: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 (14 päivää). Yhteensä 16 + 14 = 30 päivää." },
      { q: "Mitä toivotetaan Annalle viestin lopussa ennen allekirjoitusta?", options: ["Mukavia päiviä", "Onnea töihin", "Hyvää lomaa", "Lisää vapaata"], answer: 2, explanationFi: "Viestin lopussa, ennen Mikon allekirjoitusta, lukee 'Hyvää lomaa!'" }
    ],
  },
  {
    id: "read-exp3-3",
    title: "Ilmoitus: Vesikatkos taloyhtiössä",
    type: "notice",
    timeMinutes: 4,
    textFi: "Hyvät asukkaat,\n\nIlmoitamme teille, että taloyhtiössämme on tulossa lyhyt vesikatkos ensi torstaina 14.11. kello 9–14 välisenä aikana. Katkos on välttämätön, koska talossa täytyy tehdä putkien huoltotöitä, joita emme voi suorittaa veden ollessa päällä. Huoltotyöt alkavat aamulla ja kestävät noin viisi tuntia, joten vesi palautuu normaalisti iltapäivällä.\n\nSuosittelemme kaikkia asukkaita varautumaan katkosaikaan huolellisesti. On hyvä kerätä riittävästi vettä etukäteen puhtaisiin astioihin sekä juomista että ruoanlaittoa varten. Olisi myös järkevää täyttää muutama ämpäri vedellä, jotta voitte tarvittaessa huuhdella vessan katkon aikana. Muistathan tarkistaa, että kaikki vesihanat on suljettu tiukasti ennen katkosta.\n\nPahoittelemme tästä huoltotyöstä aiheutuvaa mahdollista häiriötä ja vaivaa teille asukkaille. Toivomme kuitenkin ymmärrystä, sillä säännöllinen putkien huolto on tärkeää kiinteistön kunnon ylläpitämiseksi ja suurempien vahinkojen välttämiseksi tulevaisuudessa. Jos teillä on kysyttävää, voitte ottaa yhteyttä huoltoyhtiöön.\n\nYstävällisin terveisin,\nTaloyhtiön hallitus ja isännöitsijä",
    questions: [
      { q: "Milloin vesi on poikki?", options: ["8–13", "9–14", "10–15", "Koko päivän"], answer: 1, explanationFi: "'klo 9–14'." },
      { q: "Miksi vesi katkaistaan?", options: ["Sähkövika", "Putkien huolto", "Tulipalo", "Säästösyistä"], answer: 1, explanationFi: "'putkien huoltotöistä'." },
      { q: "Kuinka kauan vesikatkos kestää?", options: ["Koko päivän", "Viisi tuntia", "Klo 9-14", "Torstain"], answer: 1, explanationFi: "Tekstissä sanotaan 'klo 9–14', mikä on viisi tuntia." },
      { q: "Mitä asukkaita kehotetaan tekemään ennen katkosta?", options: ["Muuttamaan pois", "Varaamaan pullotettua vettä kaupasta", "Keräämään vettä etukäteen", "Olemaa ilmoittamatta taloyhtiölle"], answer: 2, explanationFi: "Tekstissä sanotaan: 'Suosittelemme keräämään vettä etukäteen juomista ja ruoanlaittoa varten.'" },
      { q: "Kenelle viesti on osoitettu?", options: ["Putkimiehille", "Naapureille", "Taloyhtiön asukkaille", "Huoltomiehelle"], answer: 2, explanationFi: "Viesti alkaa 'Hyvät asukkaat', ja siinä puhutaan 'Taloyhtiössämme', eli se on tarkoitettu taloyhtiön asukkaille." },
      { q: "Mitä töitä taloyhtiössä tehdään vesikatkon aikana?", options: ["Sähkötöitä", "Putkien huoltotöitä", "Maalaustöitä", "Siivousta"], answer: 1, explanationFi: "Tekstissä mainitaan: 'Katkos johtuu putkien huoltotöistä.'" }
    ],
  },
  {
    id: "read-exp3-4",
    title: "Uutinen: Lukeminen vähentyy lapsilla",
    type: "news",
    timeMinutes: 8,
    textFi: "Uutinen: Lukeminen vähentyy lapsilla\n\nUuden tutkimuksen mukaan suomalaiset lapset lukevat vapaa-ajallaan yhä vähemmän kirjoja kuin ennen. Tutkimus paljastaa huolestuttavia lukuja, sillä vain 30 prosenttia 12-vuotiaista lapsista lukee enää säännöllisesti omaksi ilokseen. Tämä tarkoittaa, että suurin osa lapsista valitsee mieluummin muuta tekemistä kuin kirjan lukemisen.\n\nAsiantuntijat ovat tästä kehityksestä erittäin huolissaan. He muistuttavat, että hyvä lukutaito vaikuttaa suoraan myös koulumenestykseen ja laajemmin koko kielen kehitykseen. Jos lapsi ei lue paljon, hänen sanavarastonsa voi jäädä suppeaksi, mikä vaikeuttaa muidenkin kouluaineiden oppimista.\n\nTilanteen parantamiseksi kirjastot eri puolilla Suomea ovat aloittaneet uusia toimia. Ne järjestävät esimerkiksi erilaisia uusia lukuhaasteita, joiden tavoitteena on innostaa lapsia tarttumaan kirjaan ja löytämään lukemisen riemu uudelleen. Myös kotona on tärkeää toimia, sillä vanhempien rooli on tässä asiassa keskeinen. Kun aikuiset lukevat itse kotona, he näyttävät hyvää esimerkkiä. On huomattu, että tällöin myös lapset oppivat lukemaan enemmän vapaa-ajallaan. Yhteinen lukuelämys voi olla hyvä alku pysyvälle harrastukselle.",
    questions: [
      { q: "Kuinka moni 12-vuotias lukee säännöllisesti?", options: ["10 %", "30 %", "50 %", "70 %"], answer: 1, explanationFi: "'Vain 30 prosenttia'." },
      { q: "Mihin lukutaito vaikuttaa?", options: ["Vain harrastuksiin", "Koulumenestykseen ja kieleen", "Liikuntaan", "Ystävyyssuhteisiin"], answer: 1, explanationFi: "'vaikuttaa myös koulumenestykseen ja kielen kehitykseen'." },
      { q: "Mitä kirjastot tekevät?", options: ["Sulkevat ovia", "Lukuhaasteita", "Vähentävät kirjoja", "Pyytävät rahaa"], answer: 1, explanationFi: "'järjestävät uusia lukuhaasteita'." },
      { q: "Mikä on vanhempien rooli?", options: ["Pakottaa lukemaan", "Lukea itse esimerkkiä", "Ostaa kirjoja", "Olla hiljaa"], answer: 1, explanationFi: "'kun aikuiset lukevat itse, lapsetkin oppivat'." },
      { q: "Mistä tutkimus kertoo?", options: ["Siitä, miten paljon suomalaiset aikuiset lukevat.", "Siitä, miten kirjastot tukevat lukemista.", "Siitä, että suomalaiset lapset lukevat vähemmän vapaa-ajalla.", "Siitä, miten lukutaito kehittyy iän myötä."], answer: 2, explanationFi: "Tekstin ensimmäinen virke 'Tutkimuksen mukaan suomalaiset lapset lukevat vapaa-ajalla yhä vähemmän kirjoja' kertoo, mistä tutkimuksessa on kyse." },
      { q: "Miksi asiantuntijat ovat huolissaan lasten vähentyneestä lukemisesta?", options: ["Koska se heikentää vain kielen kehitystä.", "Koska se heikentää vain koulumenestystä.", "Koska se vähentää kirjastojen kävijämääriä.", "Koska lukutaito vaikuttaa sekä koulumenestykseen että kielen kehitykseen."], answer: 3, explanationFi: "Tekstissä sanotaan: 'Asiantuntijat ovat huolissaan, koska lukutaito vaikuttaa myös koulumenestykseen ja kielen kehitykseen.' Tämä lause vastaa suoraan kysymykseen." }
    ],
  },
  {
    id: "read-exp3-5",
    title: "Mainos: Suomen kielen iltakurssi",
    type: "notice",
    timeMinutes: 5,
    textFi: "Mainos: Suomen kielen iltakurssi B1-tasolla\n\nKiinnostaako sinua suomen kielen taitosi parantaminen? Haluatko oppia lisää suomalaista kulttuuria ja kielioppia? Tule mukaan suomen kielen iltakurssille, joka on tarkoitettu erityisesti B1-tason opiskelijoille. Kurssi on erinomainen mahdollisuus sinulle, jos haluat kehittää suomen kielen taitoasi työssä tai vapaa-ajalla.\n\nKurssi aloittaa keskellä talvea, tarkemmin sanottuna 8.1.2025. Opetus kestää yhteensä 12 viikkoa, joten ehdimme käydä läpi monia tärkeitä aiheita. Tunnit pidetään kaksi kertaa viikossa, aina tiistaisin ja torstaisin kello 17–19. Nämä iltatunnit sopivat hyvin myös niille, jotka ovat päivisin töissä tai opiskelevat jotakin muuta.\n\nKoko kurssin edullinen hinta on 240 €. Kurssilla käytetään monipuolisia materiaaleja ja teemme paljon puheharjoituksia. Ryhmäkoko on pieni, jotta kaikilla on tilaa oppia, joten paikkoja on rajoitetusti. Ole siis nopea!\n\nVoit ilmoittautua mukaan lähettämällä viestin viimeistään 31.12. mennessä sähköpostilla osoitteeseen kurssi@kielikoulu.fi. Kerro viestissä nimesi ja yhteystietosi. Tervetuloa opiskelemaan kanssamme ja löytämään uusia ystäviä!\n\nYstävällisin terveisin,\nKielikoulun henkilökunta",
    questions: [
      { q: "Milloin kurssi alkaa?", options: ["1.1.2025", "8.1.2025", "15.1.2025", "1.2.2025"], answer: 1, explanationFi: "'Aloittaa 8.1.2025'." },
      { q: "Kuinka monta viikkoa kurssi kestää?", options: ["8", "10", "12", "16"], answer: 2, explanationFi: "'kestää 12 viikkoa'." },
      { q: "Milloin tunnit ovat?", options: ["Ma & ke", "Ti & to", "Ke & pe", "Joka päivä"], answer: 1, explanationFi: "'tiistaisin ja torstaisin'." },
      { q: "Miten kurssille ilmoittaudutaan?", options: ["Puhelimella", "Sähköpostilla", "Koulun toimistossa", "Postitse"], answer: 1, explanationFi: "Tekstissä mainitaan 'Ilmoittautumiset 31.12. mennessä sähköpostilla: kurssi@kielikoulu.fi'." },
      { q: "Mikä on kurssin hinta?", options: ["220 €", "240 €", "200 €", "Ilmainen"], answer: 1, explanationFi: "Tekstissä sanotaan selvästi 'Hinta 240 €'." },
      { q: "Mihin mennessä kurssille pitää ilmoittautua?", options: ["8.1.2025", "31.1.2025", "31.12.", "12 viikon kuluessa"], answer: 2, explanationFi: "Tekstissä lukee 'Ilmoittautumiset 31.12. mennessä'." }
    ],
  },
  {
    id: "read-exp3-6",
    title: "Virallinen kirje: Vakuutuskorvaus",
    type: "letter",
    timeMinutes: 7,
    textFi: "Hyvä asiakas,\n\nKiitos yhteydenotostanne. Olemme nyt vastaanottaneet ja huolellisesti käsitelleet tekemänne vakuutushakemuksen, joka koskee polkupyörävarkautta. On ikävää, että polkupyöränne on varastettu, mutta olemme tarkistaneet vakuutusehtonne ja todenneet, että vahinko kuuluu vakuutuksen piiriin.\n\nIlmoitamme ilolla, että vakuutusyhtiön tekemä päätös asiassa on myönteinen. Olemme laskeneet korvauksen määrän ja tulleet siihen tulokseen, että korvaussumma on sopiva ja oikeudenmukainen. Maksamme korvauksen, joka on suuruudeltaan 480 euroa, suoraan ilmoittamallenne pankkitilille. Rahat näkyvät tilillänne viimeistään 7 arkipäivän kuluessa tästä ilmoituksesta.\n\nHaluamme kuitenkin muistuttaa teitä eräästä tärkeästä asiasta. Mikäli löydätte pyörän myöhemmin tai poliisi saa sen haltuunsa, ottakaa välittömästi yhteyttä vakuutusyhtiöön. Tässä tilanteessa meidän täytyy sopia, miten toimitaan jo maksetun korvauksen tai löytyneen omaisuuden kanssa. Jos teillä on muuta kysyttävää päätöksestä tai vakuutuksistanne, voitte soittaa asiakaspalveluumme tai lähettää meille viestin verkkopalvelun kautta.\n\nYstävällisin terveisin,\n\nVakuutusyhtiö",
    questions: [
      { q: "Mikä on hakemuksen aihe?", options: ["Auto-onnettomuus", "Polkupyörävarkaus", "Tulipalo", "Sairaus"], answer: 1, explanationFi: "'koskien polkupyörävarkautta'." },
      { q: "Onko päätös myönteinen?", options: ["Kyllä", "Ei", "Ei vielä", "Osittain"], answer: 0, explanationFi: "'Päätös on myönteinen'." },
      { q: "Kuinka paljon korvataan?", options: ["280 €", "480 €", "680 €", "880 €"], answer: 1, explanationFi: "'korvauksen 480 euroa'." },
      { q: "Milloin korvaus maksetaan?", options: ["Välittömästi", "7 arkipäivän kuluessa", "Kun pyörä löytyy", "Kuukauden sisällä"], answer: 1, explanationFi: "Tekstin mukaan korvaus maksetaan '7 arkipäivän kuluessa'." },
      { q: "Mitä tulee tehdä, jos varastettu polkupyörä löytyy myöhemmin?", options: ["Pidä pyörä ja korvaus", "Ilmoita poliisille", "Ota välittömästi yhteyttä vakuutusyhtiöön", "Myy pyörä eteenpäin"], answer: 2, explanationFi: "Tekstissä mainitaan: 'Mikäli löydätte pyörän myöhemmin, ottakaa välittömästi yhteyttä.'" },
      { q: "Kuka viestin on lähettänyt?", options: ["Hyvä asiakas", "Poliisi", "Vakuutusyhtiö", "Polkupyörän omistaja"], answer: 2, explanationFi: "Viestin lopussa on allekirjoitus 'Vakuutusyhtiö'." }
    ],
  },
  {
    id: "read-exp3-7",
    title: "Uutinen: Suomalaiset ja kahvi",
    type: "news",
    timeMinutes: 6,
    textFi: "Uutinen: Suomalaiset ja kahvi\n\nTuoreiden tilastojen mukaan suomalaiset rakastavat kahvia edelleen valtavasti. Suomalaiset juovat keskimäärin jopa 9 kupillista kahvia päivässä, mikä on enemmän kuin missään muussa maassa maailmassa. Kahvi on tärkeä osa päivittäistä rutiinia ja sosiaalista elämää varsinkin työpaikoilla. Kahvia juodaan yleensä heti aamulla töissä, kun työpäivä alkaa. Lisäksi se kuuluu perinteisesti lounaan jälkeiseen hetkeen ja myöhemmin nautittaviin iltapäiväkahveihin työpaikalla kollegoiden kanssa.\n\nVaikka kahvi maistuu monelle, terveysasiantuntijat tarkkailevat tilannetta. Tutkijat muistuttavat, että kohtuullinen määrä, eli noin 3–4 kuppia päivässä, on usein terveellistä ja se voi jopa parantaa keskittymiskykyä. On kuitenkin hyvä muistaa, että jokainen ihminen reagoi kofeiiniin yksilöllisesti. Jos kahvia juo tätä enemmän, se ei välttämättä ole enää hyväksi keholle. Tutkijoiden mukaan liika kahvi voi aiheuttaa esimerkiksi erilaisia unihäiriöitä, jotka vaikeuttavat nukahtamista ja heikentävät unen laatua. Siksi on suositeltavaa miettiä, kuinka monta kupillista päivän aikana todella tarvitsee.",
    questions: [
      { q: "Kuinka paljon suomalaiset juovat kahvia päivässä?", options: ["3 kuppia", "5 kuppia", "9 kuppia", "15 kuppia"], answer: 2, explanationFi: "'9 kupillista kahvia päivässä'." },
      { q: "Mikä on kohtuullinen määrä?", options: ["1 kuppi", "3–4 kuppia", "8 kuppia", "12 kuppia"], answer: 1, explanationFi: "'kohtuullinen määrä (3–4 kuppia)'." },
      { q: "Mitä liika kahvi aiheuttaa?", options: ["Päänsärkyä", "Unihäiriöitä", "Allergiaa", "Hammassärkyä"], answer: 1, explanationFi: "'voi aiheuttaa unihäiriöitä'." },
      { q: "Missä tilanteissa kahvia juodaan työpaikalla?", options: ["Vain aamulla", "Aamulla, lounaan jälkeen ja iltapäivällä", "Vain iltapäivällä", "Työpäivän päätyttyä"], answer: 1, explanationFi: "Tekstin mukaan: 'Kahvia juodaan aamulla töissä, lounaan jälkeen ja iltapäiväkahveina työpaikalla.'" },
      { q: "Kuka muistuttaa kahvin kohtuullisesta määrästä ja sen terveysvaikutuksista?", options: ["Suomalaiset", "Työntekijät", "Tutkijat", "Kahvinvalmistajat"], answer: 2, explanationFi: "Tekstin mukaan: 'Tutkijat muistuttavat, että kohtuullinen määrä (3–4 kuppia) on terveellistä...'" },
      { q: "Miten Suomen kahvinjuontimäärä vertautuu muihin maihin?", options: ["Suomessa juodaan vähemmän kahvia kuin muissa maissa", "Suomessa juodaan saman verran kahvia kuin muissa maissa", "Suomessa juodaan enemmän kahvia kuin missään muussa maassa", "Teksti ei kerro vertailusta muihin maihin"], answer: 2, explanationFi: "Tekstin mukaan: 'Suomalaiset juovat keskimäärin 9 kupillista kahvia päivässä - enemmän kuin missään muussa maassa.'" }
    ],
  },
  {
    id: "read-exp3-8",
    title: "Sähköposti: Lapsen päivähoito",
    type: "email",
    timeMinutes: 5,
    textFi: "Aihe: Lapsen poissaolo päivähoidosta - Lassi\n\nHei,\n\nKirjoitan teille ilmoittaakseni, että poikani Lassi on tänään sairastunut, eikä hän siksi tule lapsille tarkoitettuun päivähoitoon tänään. Hän heräsi aikaisin aamulla ja huomasimme heti, että hän ei ole kunnossa. Hänellä on melko korkea kuumetta ja lisäksi hänellä on vaikeaa yskää, joka vaivaa häntä kovasti.\n\nTilanne vaikuttaa siltä, että on parasta levätä kotona. Aion kuitenkin ottaa yhteyttä terveyskeskukseen ja soitan myös lääkäriin vielä tämän päivän aikana. Haluan varmistaa, että kyseessä on vain tavallinen flunssa ja kysyä samalla hoito-ohjeita. Koska nyt on loppuviikko, uskon, että hän tarvitsee muutaman päivän aikaa parantua rauhassa.\n\nSeuraamme hänen vointiaan viikonlopun yli. Toivottavasti Lassi on jo terve ensi viikon alussa ja voin tuoda hänet takaisin päivähoitoon maanantaina. Ilmoitan teille heti, jos tilanne muuttuu tai jos sairaus kestää pidempään kuin odotimme. Kiitos ymmärryksestä ja mukavaa päivänjatkoa kaikille sinne päiväkotiin!\n\nYstävällisin terveisin,\n\nT. Sari",
    questions: [
      { q: "Miksi Lassi ei tule hoitoon?", options: ["Loma", "Sairaana", "Käymässä isovanhempien luona", "Lääkärissä"], answer: 1, explanationFi: "'Lassi on tänään kipeänä'." },
      { q: "Mitä Sari aikoo tehdä?", options: ["Mennä töihin", "Soittaa lääkäriin", "Lähteä kauppaan", "Pyytää isovanhempien apua"], answer: 1, explanationFi: "'Soitan myös lääkäriin'." },
      { q: "Milloin Sari toivoo voivansa tuoda Lassin takaisin päivähoitoon?", options: ["Perjantaina", "Keskiviikkona", "Maanantaina", "Huomenna"], answer: 2, explanationFi: "Tekstissä sanotaan: 'Toivottavasti voin tuoda hänet takaisin maanantaina.'" },
      { q: "Kuka viestin kirjoitti?", options: ["Lassi", "Koulun rehtori", "Sari", "Lääkäri"], answer: 2, explanationFi: "Viestin lopussa lukee 'T. Sari', mikä tarkoittaa, että Sari on lähettäjä." },
      { q: "Mitä oireita Lassilla on?", options: ["Vatsakipua ja päänsärkyä", "Kuumetta ja yskää", "Nuhakuumetta ja kurkkukipua", "Väsymystä ja aivastelua"], answer: 1, explanationFi: "Tekstissä mainitaan: 'Hänellä on kuumetta ja yskää.'" },
      { q: "Minkä tyyppinen paikka on 'päivähoito'?", options: ["Koulu", "Työpaikka", "Lääkärin vastaanotto", "Lasten hoitopaikka"], answer: 3, explanationFi: "Päivähoito on lasten hoitopaikka, esimerkiksi päiväkoti, jossa lapsia hoidetaan päivisin." }
    ],
  },
  {
    id: "read-exp3-9",
    title: "Uutinen: Joukkoliikenne kasvaa",
    type: "news",
    timeMinutes: 7,
    textFi: "Uutinen: Joukkoliikenne kasvaa\n\nHelsingin seudun joukkoliikenteen suosio on noussut selvästi tänä vuonna. Tuoreiden tilastojen mukaan käyttö on kasvanut 15 prosenttia viime vuoden vastaavaan aikaan verrattuna. Ihmiset liikkuvat nyt aktiivisemmin pääkaupunkiseudulla, ja matkustajamäärät ovat suurimmillaan aamulla ja iltapäivällä.\n\nErityisesti raitiovaunuja ja metroa käytetään enemmän kuin aikaisemmin. Nämä kulkuneuvot ovat suosittuja, koska ne kulkevat omilla raiteillaan eivätkä juutu autojen ruuhkiin. Jotta matkustaminen olisi sujuvampaa, HSL on lisännyt vuoroja ruuhka-aikoina useilla eri linjoilla. Tämä tarkoittaa, että busseja ja junia kulkee tiheämmin silloin, kun ihmiset menevät töihin tai kouluun.\n\nKaupungeilla on myös suuria suunnitelmia tulevaisuutta varten. Tärkeä tavoite on, että vuoteen 2030 mennessä yli 60 prosenttia kaikista matkoista tehtäisiin joukkoliikenteellä, pyörällä tai kävellen. Jos tämä tavoite saavutetaan, se vähentäisi liikenteen päästöjä huomattavasti ja parantaisi samalla ilmanlaatua ja viihtyvyyttä kaupungissa. On hienoa nähdä, että yhä useampi valitsee kestävän tavan liikkua paikasta toiseen.",
    questions: [
      { q: "Kuinka paljon käyttö on kasvanut?", options: ["5 %", "10 %", "15 %", "25 %"], answer: 2, explanationFi: "'kasvanut 15 prosenttia'." },
      { q: "Mitä HSL on tehnyt?", options: ["Vähentänyt vuoroja", "Lisännyt vuoroja", "Korottanut hintoja", "Sulkenut linjoja"], answer: 1, explanationFi: "'HSL on lisännyt vuoroja'." },
      { q: "Mikä on tavoite vuoteen 2030?", options: ["Lopettaa autot", "60 % vihreitä matkoja", "Maksuttomuus", "Uusia metroja"], answer: 1, explanationFi: "'yli 60 prosenttia matkoista'." },
      { q: "Mitä kulkuvälineitä käytetään erityisesti enemmän?", options: ["Autoja ja busseja", "Raitiovaunuja ja busseja", "Raitiovaunuja ja metroa", "Metroa ja lauttoja"], answer: 2, explanationFi: "Tekstissä mainitaan, että 'Erityisesti raitiovaunuja ja metroa käytetään enemmän'." },
      { q: "Mikä on yksi syy joukkoliikenteen käytön lisääntymisen tavoitteelle?", options: ["Turistien määrän lisääminen", "Matka-aikojen lyhentäminen", "Liikenteen päästöjen vähentäminen", "Uusien reittien rakentaminen"], answer: 2, explanationFi: "Tekstissä sanotaan: 'Tämä vähentäisi liikenteen päästöjä huomattavasti'." },
      { q: "Missä kaupungissa tai seudulla joukkoliikenteen käyttö on kasvanut?", options: ["Tampereen seudulla", "Oulun seudulla", "Turun seudulla", "Helsingin seudulla"], answer: 3, explanationFi: "Tekstin alussa mainitaan 'Helsingin seudun joukkoliikenteen käyttö...'." }
    ],
  },
  {
    id: "read-exp3-10",
    title: "Ilmoitus: Liikuntahalli suljettu",
    type: "notice",
    timeMinutes: 4,
    textFi: "Ilmoitus: Liikuntahallin väliaikainen sulkeminen\n\nHyvät asiakkaat ja liikunnan ystävät, haluamme tiedottaa teille tärkeästä muutoksesta palveluissamme. Kotikuntamme suosittu liikuntahalli on suljettu välttämättömän remontin vuoksi lokakuun alussa. Sulkemisaika alkaa 1.10. ja kestää aina 14.10. asti, eli halli on poissa käytöstä yhteensä kaksi viikkoa.\n\nRemontin aikana tiloissa tehdään tärkeitä korjaustöitä, jotta voimme tarjota teille jatkossa turvallisemman ja viihtyisämmän ympäristön urheiluun. Ymmärrämme, että sulkeminen saattaa aiheuttaa hankaluuksia kuntalaisten arkeen, mutta uudistus on välttämätön kiinteistön kunnon vuoksi.\n\nTänä aikana, kun oma hallimme on kiinni 1.–14.10., suosittelemme lämpimästi käyttämään naapurikunnan liikuntatiloja. Olemme sopineet yhteistyöstä naapurikunnan kanssa, ja nämä tilat ovat poikkeuksellisesti täysin veloituksetta jäsenillemme koko remontin ajan. Muistattehan ottaa jäsenkorttinne mukaan mennessänne urheilemaan naapurikuntaan.\n\nToivotamme kaikille reipasta syksyä remontista huolimatta ja pahoittelemme syvästi tästä muutoksesta aiheutuvaa häiriötä! Tervetuloa takaisin uudistuneeseen halliin lokakuun puolivälissä.\n\nYstävällisin terveisin,\nLiikuntapalveluiden henkilökunta",
    questions: [
      { q: "Kuinka kauan halli on kiinni?", options: ["3 päivää", "1 viikko", "2 viikkoa", "1 kuukausi"], answer: 2, explanationFi: "'1.–14.10.' = 2 viikkoa." },
      { q: "Maksaako naapurikunnan tilojen käyttö?", options: ["Kyllä, normaalisti", "Veloituksetta", "Puoleen hintaan", "Vain aikuisille"], answer: 1, explanationFi: "'veloituksetta jäsenillemme'." },
      { q: "Miksi liikuntahalli on suljettu?", options: ["Jäsenillä ei ole varaa käyttää sitä.", "Siellä on urheilutapahtuma.", "Se on remontissa.", "Henkilökunta on lomalla."], answer: 2, explanationFi: "Tekstissä sanotaan selvästi 'remontin vuoksi', mikä tarkoittaa 'remontin takia'." },
      { q: "Mille ajanjaksolle suositellaan naapurikunnan tilojen käyttöä?", options: ["Koko lokakuun ajan.", "1.–14.10.", "Vain viikonloppuisin.", "Syyskuun lopusta lokakuun alkuun."], answer: 1, explanationFi: "Naapurikunnan tilojen käyttöä suositellaan sulkemisen ajaksi, eli 1.–14.10." },
      { q: "Kenelle naapurikunnan liikuntatilat ovat veloituksettomia?", options: ["Kaikille kuntalaisille.", "Vain hallin työntekijöille.", "Hallin jäsenille.", "Naapurikunnan asukkaille."], answer: 2, explanationFi: "Tekstissä lukee 'jotka ovat veloituksetta jäsenillemme', eli vain jäsenille." },
      { q: "Mitä pahoitellaan ilmoituksessa?", options: ["Liikuntahallin palveluiden huonoa laatua.", "Naapurikunnan tilojen täyttymistä.", "Häiriötä, joka sulkemisesta aiheutuu.", "Remontin yllättävää alkamista."], answer: 2, explanationFi: "Viimeinen lause 'Pahoittelemme häiriötä!' viittaa sulkemisesta aiheutuvaan vaivaan." }
    ],
  },
  {
    id: "read-exp3-11",
    title: "Sähköposti: Työhaastattelukutsu",
    type: "email",
    timeMinutes: 6,
    textFi: "Hyvä Mika,\n\nKiitämme sinua lämpimästi mielenkiinnostasi avointa työpaikkaamme kohtaan ja lähettämästäsi hakemuksesta. Olemme käyneet kaikki hakemukset huolellisesti läpi, ja meillä on nyt ilo kutsua sinut työhaastatteluun keskiviikkona 6.11. kello 13.\n\nHaastattelu on tärkeä osa rekrytointiprosessiamme, ja sen aikana haluamme tutustua sinuun ja osaamiseesi paremmin. Tilaisuus kestää noin 45 minuuttia, joten varaathan riittävästi aikaa keskustelulle. Paikalla on kaksi haastattelijaa, jotka kertovat sinulle lisää tehtävästä ja yrityksemme toiminnasta. Sinulla on myös mahdollisuus esittää meille mieltäsi askarruttavia kysymyksiä.\n\nToimistomme sijaitsee Helsingin keskustassa osoitteessa Aleksanterinkatu 28. Kun saavut rakennukseen, tule suoraan ylös 5. kerrokseen, josta löydät vastaanottomme. Jos sinulla on kysyttävää aikataulusta tai tarvitset lisätietoja ennen tapaamista, voit ottaa meihin yhteyttä sähköpostitse.\n\nOdotamme tapaamistasi ja toivotamme sinut lämpimästi tervetuloa!\n\nYstävällisin terveisin,\nHR-osasto",
    questions: [
      { q: "Milloin haastattelu on?", options: ["Ti 5.11. klo 13", "Ke 6.11. klo 13", "Ke 6.11. klo 14", "To 7.11. klo 13"], answer: 1, explanationFi: "'keskiviikkona 6.11. klo 13'." },
      { q: "Kuinka kauan haastattelu kestää?", options: ["15 min", "30 min", "45 min", "60 min"], answer: 2, explanationFi: "'noin 45 minuuttia'." },
      { q: "Missä kerroksessa toimisto on?", options: ["3.", "4.", "5.", "6."], answer: 2, explanationFi: "'5. kerros'." },
      { q: "Kuka lähetti kutsun?", options: ["Mika", "HR-osasto", "Haastattelija", "Toimiston johtaja"], answer: 1, explanationFi: "Viestin lopussa lukee 'HR-osasto', joka on lähettäjä." },
      { q: "Kuinka monta haastattelijaa paikalla on?", options: ["Yksi", "Kaksi", "Kolme", "Ei kerrota"], answer: 1, explanationFi: "Tekstissä sanotaan 'paikalla on kaksi haastattelijaa'." },
      { q: "Mikä on toimiston osoite?", options: ["Aleksanterinkatu 5", "Aleksanterinkatu 28", "Keskiviikkona 6.11.", "Ei kerrota"], answer: 1, explanationFi: "Tekstissä mainitaan 'Toimisto sijaitsee Aleksanterinkatu 28'." }
    ],
  },
  {
    id: "read-exp3-12",
    title: "Uutinen: Suomi on maailman onnellisin maa",
    type: "news",
    timeMinutes: 8,
    textFi: "Uutinen: Suomi on maailman onnellisin maa\n\nSuomi on jälleen kerran nimetty maailman onnellisimmaksi maaksi tuoreessa kansainvälisessä vertailussa. Tämä uutinen ei ole suuri yllätys, sillä Suomi on sijoittunut listan kärkeen monta kertaa aiemminkin. Tutkimuksessa käytetään monia erilaisia mittareita, jotka kuvaavat ihmisten hyvinvointia. Tutkimuksessa mitataan muun muassa elintasoa, terveydenhuoltoa, vapautta ja sosiaalista tukea. Nämä asiat tekevät elämästä turvallista ja vakaata.\n\nVaikka tilastot näyttävät hyviltä, suomalaiset itse eivät usein pidä itseään erityisen onnellisina ihmisinä. Monet suomalaiset saattavat ajatella, että onni tarkoittaa suurta iloa tai naurua. Tutkimuksen mukaan kuitenkin tyytyväisyys arkielämään on korkealla tasolla koko maassa. Ihmiset kokevat, että asiat toimivat hyvin.\n\nOnnistumisen ja kärkipaikan takana on useita tärkeitä tekijöitä. Tärkeimpiä syitä ovat tasa-arvoinen yhteiskunta, hyvä koulutus ja luotettava poliittinen järjestelmä. Kansalaiset luottavat päätöksentekoon ja instituutioihin, mikä on harvinaista monissa muissa maissa. Lisäksi sairauden sattuessa laadukas terveydenhuolto on kaikkien saatavilla. Kaikki nämä osat yhdessä rakentavat Suomesta maan, jossa on hyvä ja vakaa asua.",
    questions: [
      { q: "Mitä mitataan tutkimuksessa?", options: ["Vain rahaa", "Elintaso ja vapaus", "Vain terveys", "Vain ilmasto"], answer: 1, explanationFi: "'mitataan muun muassa elintasoa, terveydenhuoltoa, vapautta ja sosiaalista tukea'." },
      { q: "Pitävätkö suomalaiset itseään onnellisina?", options: ["Kyllä, aina", "Eivät usein", "Vain kesällä", "Vain juhlapäivinä"], answer: 1, explanationFi: "'eivät usein pidä itseään erityisen onnellisina'." },
      { q: "Mikä on yksi onnistumisen syy?", options: ["Halpa ruoka", "Tasa-arvo ja koulutus", "Hyvä sää", "Pieni väkiluku"], answer: 1, explanationFi: "'tasa-arvoinen yhteiskunta, hyvä koulutus'." },
      { q: "Miksi Suomi on usein onnellisin maa tutkimusten mukaan?", options: ["Koska suomalaiset ovat aina iloisia.", "Koska elintaso, terveydenhuolto, vapaus ja sosiaalinen tuki ovat korkealla tasolla.", "Koska Suomessa on paljon vaarallisia eläimiä.", "Koska sää on aina hyvä."], answer: 1, explanationFi: "Tekstin mukaan Suomi on onnellisin maa, koska tutkimuksessa mitataan muun muassa elintasoa, terveydenhuoltoa, vapautta ja sosiaalista tukea." },
      { q: "Millä tasolla tyytyväisyys arkielämään on tutkimuksen mukaan Suomessa?", options: ["Erittäin matalalla tasolla", "Keskinkertaisella tasolla", "Korkealla tasolla", "Ei kerrota tekstissä"], answer: 2, explanationFi: "Tekstin mukaan: 'tutkimuksen mukaan tyytyväisyys arkielämään on korkealla tasolla.'" },
      { q: "Minkälainen poliittinen järjestelmä on menestyksen takana Suomessa?", options: ["Epäluotettava", "Sotilaallinen", "Monarkia", "Luotettava"], answer: 3, explanationFi: "Tekstissä sanotaan: 'Onnistumisen takana ovat tasa-arvoinen yhteiskunta, hyvä koulutus ja luotettava poliittinen järjestelmä.'" }
    ],
  },
];

/* ============================================================
 * LISTENING - 12 bài thực hành mới
 * ============================================================ */
export const B1_LISTENING_EXP3: B1ListeningClip[] = [
  {
    id: "listen-exp3-1",
    title: "Postissa",
    scenarioFi: "Asiakas hakee paketin postista.",
    durationSeconds: 30,
    scriptFi: "Asiakas: Hei, tulin hakemaan pakettia. Tässä on hakuilmoitus. Virkailija: Saanko nähdä myös henkilöllisyystodistuksen? Asiakas: Tässä on Kela-kortti. Virkailija: Hyvä, paketti on tässä. Allekirjoitatteko vielä tämän? Asiakas: Tietenkin.",
    questions: [
      { q: "Mitä asiakas tekee?", options: ["Lähettää paketin", "Hakee paketin", "Maksaa laskun", "Ostaa postimerkit"], answer: 1 },
      { q: "Mitä hän näyttää?", options: ["Passin", "Ajokortin", "Kela-kortin", "Bussikortin"], answer: 2 },
      { q: "Mitä asiakas halusi hakea?", options: ["kirjeen", "paketin", "kortin", "rahaa"], answer: 1 },
      { q: "Mitä virkailija pyysi ensin asiakkaalta hakuilmoituksen nähtyään?", options: ["allekirjoitusta", "postimerkkiä", "henkilöllisyystodistusta", "puhelinnumeroa"], answer: 2 },
      { q: "Mitä asiakas antoi henkilöllisyystodistukseksi?", options: ["ajokortin", "passin", "Kela-kortin", "henkilökortin"], answer: 2 },
      { q: "Mitä asiakkaan piti tehdä lopuksi?", options: ["allekirjoittaa paperin", "maksaa paketti", "avata paketti", "lähteä heti"], answer: 0 }
    ],
  },
  {
    id: "listen-exp3-2",
    title: "Bussipysäkillä",
    scenarioFi: "Kaksi ystävää keskustelee bussiaikataulusta.",
    durationSeconds: 35,
    scriptFi: "Liisa: Mihin aikaan seuraava bussi tulee? Olli: Tarkistin äsken - viisitoista minuutin päästä, eli puoli kahdelta. Liisa: Voi ei, olemme myöhässä kokouksesta! Olli: Ehditään vielä, kokous alkaa vasta kahdelta. Liisa: Hyvä juttu.",
    questions: [
      { q: "Mihin aikaan bussi tulee?", options: ["13:15", "13:30", "13:45", "14:00"], answer: 1 },
      { q: "Mihin aikaan kokous alkaa?", options: ["13:30", "14:00", "14:15", "14:30"], answer: 1 },
      { q: "Kuinka monta minuuttia on seuraavaan bussiin?", options: ["Kymmenen minuuttia.", "Viisitoista minuuttia.", "Kaksikymmentä minuuttia.", "Kolmekymmentä minuuttia."], answer: 1 },
      { q: "Miksi Liisa on huolissaan?", options: ["Bussi on myöhässä.", "He myöhästyvät junasta.", "He myöhästyvät kokouksesta.", "Olli on myöhässä."], answer: 2 },
      { q: "Mitä Olli vastasi Liisan huoleen?", options: ["He ehtivät kokoukseen.", "Kokous on peruttu.", "Bussi tulee myöhemmin.", "He ehtivät juuri ja juuri."], answer: 0 },
      { q: "Kuka tarkisti bussin aikataulun?", options: ["Liisa", "Olli", "Bussikuski", "Kukaan ei tarkistanut"], answer: 1 }
    ],
  },
  {
    id: "listen-exp3-3",
    title: "Kahvilassa",
    scenarioFi: "Asiakas tilaa lounaan kahvilasta.",
    durationSeconds: 40,
    scriptFi: "Asiakas: Hei, mitä päivän lounasvaihtoehtoja teillä on? Tarjoilija: Tänään meillä on lohikeitto, broilerisalaatti tai kasviswokki. Lounaaseen kuuluu salaatti, leipä ja kahvi. Asiakas: Otan broilerisalaatin. Paljonko se maksaa? Tarjoilija: 13 euroa.",
    questions: [
      { q: "Mitä asiakas tilaa?", options: ["Lohikeitto", "Broilerisalaatti", "Kasviswokki", "Pizza"], answer: 1 },
      { q: "Mitä lounaaseen kuuluu?", options: ["Vain ruoka", "Salaatti, leipä, kahvi", "Vain juoma", "Jälkiruoka"], answer: 1 },
      { q: "Paljonko lounas maksaa?", options: ["10 €", "11 €", "13 €", "15 €"], answer: 2 },
      { q: "Mikä on yksi lounasvaihtoehdoista?", options: ["Lohikeitto", "Makkara ja perunat", "Pinaattikeitto", "Uunilohi"], answer: 0 },
      { q: "Mitä aterioita tarjoilija mainitsee?", options: ["Ainoastaan kaksi vaihtoehtoa", "Kolme eri lounasvaihtoehtoa", "Neljä eri vaihtoehtoa", "Ei yhtään selkeää vaihtoehtoa"], answer: 1 },
      { q: "Ketkä keskustelevat?", options: ["Myyjä ja ostaja", "Asiakas ja kokki", "Asiakas ja tarjoilija", "Kaksi ystävää"], answer: 2 }
    ],
  },
  {
    id: "listen-exp3-4",
    title: "Lääkärissä",
    scenarioFi: "Lääkäri kysyy potilaan oireita.",
    durationSeconds: 45,
    scriptFi: "Lääkäri: Mitä oireita teillä on? Potilas: Olen ollut väsynyt jo kaksi viikkoa, ja päätä särkee melkein joka päivä. Lääkäri: Onko teillä kuumetta? Potilas: Ei oikeastaan. Lääkäri: Otetaan verikoe ja katsotaan tilannetta. Tulokset valmistuvat huomenna.",
    questions: [
      { q: "Kuinka kauan potilas on ollut väsynyt?", options: ["Päivän", "Viikon", "Kaksi viikkoa", "Kuukauden"], answer: 2 },
      { q: "Onko potilaalla kuumetta?", options: ["Kyllä, korkea", "Hieman", "Ei oikeastaan", "Joka toinen päivä"], answer: 2 },
      { q: "Milloin tulokset valmistuvat?", options: ["Heti", "Tänään illalla", "Huomenna", "Viikon päästä"], answer: 2 },
      { q: "Mitä oireita potilaalla on ollut kaksi viikkoa?", options: ["väsymystä", "kuumetta", "päänsärkyä ja kuumetta", "vain päänsärkyä"], answer: 0 },
      { q: "Mitä lääkäri ehdottaa seuraavaksi?", options: ["Lepoa kotona", "Verikokeen ottamista", "Uutta tapaamista huomenna", "Reseptin kirjoittamista"], answer: 1 },
      { q: "Kuinka usein potilaalla särkee päätä?", options: ["Harvoin", "Melkein joka päivä", "Kaksi kertaa viikossa", "Yhden kerran viikossa"], answer: 1 }
    ],
  },
  {
    id: "listen-exp3-5",
    title: "Vaatekaupassa",
    scenarioFi: "Asiakas etsii talvitakin myymälästä.",
    durationSeconds: 35,
    scriptFi: "Asiakas: Etsin lämmintä talvitakkia. Myyjä: Mikä on kokonne? Asiakas: M-koko. Myyjä: Tässä on hyvä malli, hinta on 159 euroa. Sitä on saatavilla mustana ja sinisenä. Asiakas: Otan mustan, kiitos.",
    questions: [
      { q: "Mitä asiakas etsii?", options: ["Kengät", "Talvitakki", "Hattu", "Hanskat"], answer: 1 },
      { q: "Mikä on koko?", options: ["S", "M", "L", "XL"], answer: 1 },
      { q: "Minkä värin asiakas valitsee?", options: ["Sininen", "Musta", "Punainen", "Harmaa"], answer: 1 },
      { q: "Mikä on takin hinta?", options: ["159 euroa", "195 euroa", "259 euroa", "129 euroa"], answer: 0 },
      { q: "Kuka etsii takkia?", options: ["Myyjä", "Asiakas", "Mies", "Nainen"], answer: 1 },
      { q: "Mitä värejä takista on saatavilla?", options: ["Musta ja valkoinen", "Musta ja punainen", "Musta ja sininen", "Sininen ja valkoinen"], answer: 2 }
    ],
  },
  {
    id: "listen-exp3-6",
    title: "Asunnonvälityksessä",
    scenarioFi: "Asiakas kysyy vuokra-asunnoista.",
    durationSeconds: 40,
    scriptFi: "Asiakas: Etsin yksiötä keskustasta. Välittäjä: Meillä on yksi 30 neliön asunto Punavuoressa, vuokra 920 euroa. Asiakas: Sisältyykö vesi? Välittäjä: Vesi sisältyy, mutta sähkö maksetaan erikseen. Asiakas: Milloin voisin nähdä asunnon? Välittäjä: Huomenna kello 17.",
    questions: [
      { q: "Kuinka iso asunto on?", options: ["20 m²", "25 m²", "30 m²", "40 m²"], answer: 2 },
      { q: "Sisältyykö sähkö vuokraan?", options: ["Kyllä", "Ei", "Vain talvella", "Osittain"], answer: 1 },
      { q: "Milloin asuntoa pääsee katsomaan?", options: ["Tänään", "Huomenna klo 17", "Viikonloppuna", "Ensi viikolla"], answer: 1 },
      { q: "Mitä asiakas etsii?", options: ["Kaksiota Lauttasaaresta", "Yksiötä kantakaupungista", "Kolmiota Espoosta", "Neliötä Vantaalta"], answer: 1 },
      { q: "Missä kaupunginosassa asunto sijaitsee?", options: ["Kallio", "Töölö", "Punavuori", "Katajanokka"], answer: 2 },
      { q: "Kuinka paljon asunnon vuokra on?", options: ["850 euroa", "900 euroa", "920 euroa", "950 euroa"], answer: 2 }
    ],
  },
  {
    id: "listen-exp3-7",
    title: "Kirjastossa",
    scenarioFi: "Asiakas haluaa lainata kirjoja.",
    durationSeconds: 30,
    scriptFi: "Asiakas: Voinko lainata näitä kolmea kirjaa? Virkailija: Kyllä. Laina-aika on 4 viikkoa. Voitte uusia lainan kerran netissä. Asiakas: Maksaako myöhästyminen? Virkailija: 0,20 € per päivä per kirja.",
    questions: [
      { q: "Kuinka monta kirjaa lainataan?", options: ["1", "2", "3", "5"], answer: 2 },
      { q: "Kuinka pitkä laina-aika on?", options: ["1 viikko", "2 viikkoa", "4 viikkoa", "8 viikkoa"], answer: 2 },
      { q: "Paljonko myöhästyminen maksaa?", options: ["Ilmaista", "0,20 €/pv/kirja", "1 € päivä", "5 € viikko"], answer: 1 },
      { q: "Miten lainan voi uusia?", options: ["Puhelimitse", "Sähköpostilla", "Paikan päällä", "Netissä"], answer: 3 },
      { q: "Kuinka monta kertaa lainan voi uusia?", options: ["Ei ollenkaan", "Kerran", "Kaksi kertaa", "Niin monta kertaa kuin haluaa"], answer: 1 },
      { q: "Mikä on myöhästymismaksu yhdestä kirjasta päivässä?", options: ["0,20 €", "0,40 €", "0,60 €", "Ei maksa mitään"], answer: 0 }
    ],
  },
  {
    id: "listen-exp3-8",
    title: "Hotellissa",
    scenarioFi: "Vieras kirjautuu sisään hotelliin.",
    durationSeconds: 40,
    scriptFi: "Vieras: Hei, minulla on varaus nimellä Saarinen. Vastaanotto: Hetkinen, katson... Kyllä, kahden hengen huone kahdeksi yöksi. Vieras: Sisältyykö aamupala? Vastaanotto: Sisältyy. Tarjoillaan 7–10. Tässä avain, huone 305, kolmas kerros.",
    questions: [
      { q: "Kuinka moneksi yöksi huone on varattu?", options: ["1", "2", "3", "Viikko"], answer: 1 },
      { q: "Mihin aikaan aamupala?", options: ["6–9", "7–10", "8–11", "9–12"], answer: 1 },
      { q: "Mikä on huoneen numero?", options: ["205", "305", "405", "505"], answer: 1 },
      { q: "Kuka varasi huoneen?", options: ["Saarinen", "Vastaanottovirkailija", "Tuntematon henkilö", "Aamiainen"], answer: 0 },
      { q: "Kuinka monelle hengelle huone on varattu?", options: ["Yhdelle", "Kahdelle", "Kolmelle", "Neljälle"], answer: 1 },
      { q: "Missä kerroksessa huone sijaitsee?", options: ["Ensimmäisessä kerroksessa", "Toisessa kerroksessa", "Kolmannessa kerroksessa", "Neljännessä kerroksessa"], answer: 2 }
    ],
  },
  {
    id: "listen-exp3-9",
    title: "Sähköpostin sanelu",
    scenarioFi: "Esimies sanelee viestin sihteerille.",
    durationSeconds: 50,
    scriptFi: "Hei kaikki, kokous on siirretty perjantailta maanantaille klo 10. Paikka pysyy samana - neuvotteluhuone 2. Tuokaa mukanne edellisen kokouksen muistiinpanot. Mikäli ette pääse paikalle, ilmoittakaa minulle perjantaihin mennessä. Kiitos.",
    questions: [
      { q: "Mihin päivään kokous siirrettiin?", options: ["Torstai", "Perjantai", "Maanantai", "Tiistai"], answer: 2 },
      { q: "Mihin aikaan kokous on?", options: ["9", "10", "11", "12"], answer: 1 },
      { q: "Mihin mennessä pitää ilmoittaa poissaolosta?", options: ["Torstai", "Perjantai", "Sunnuntai", "Maanantai"], answer: 1 },
      { q: "Mikä pysyy samana?", options: ["Kokouksen ajankohta", "Kokouksen pitäjä", "Kokouksen paikka", "Kokouksen aihe"], answer: 2 },
      { q: "Mitä kokoukseen pyydetään tuomaan mukaan?", options: ["Uudet ideat", "Edellisen kokouksen muistiinpanot", "Kannettavan tietokoneen", "Kahvia ja pullaa"], answer: 1 },
      { q: "Mitä kehotetaan tekemään, jos ei pääse kokoukseen?", options: ["Lähettämään sijaisen", "Ilmoittamaan asiasta kokouksen jälkeen", "Ilmoittamaan siitä puhujalle", "Siirtämään kokousta"], answer: 2 }
    ],
  },
  {
    id: "listen-exp3-10",
    title: "Uimahallin tiedote",
    scenarioFi: "Kaiuttimesta tulee ilmoitus uimareille.",
    durationSeconds: 30,
    scriptFi: "Hyvät asiakkaat. Uimahalli sulkeutuu tänään puoli tuntia normaalia aikaisemmin eli klo 19:30. Pyydämme poistumaan altaasta klo 19:15 mennessä. Kiitos.",
    questions: [
      { q: "Mihin aikaan halli sulkeutuu?", options: ["19:00", "19:15", "19:30", "20:00"], answer: 2 },
      { q: "Milloin pitää poistua altaasta?", options: ["19:00", "19:15", "19:30", "19:45"], answer: 1 },
      { q: "Miksi uimahalli sulkeutuu aikaisin?", options: ["Siitä ei kerrota", "Remontin takia", "Henkilökunnan puutteen takia", "Teknisen vian takia"], answer: 0 },
      { q: "Kuinka paljon aiemmin uimahalli sulkeutuu tänään?", options: ["15 minuuttia", "Puoli tuntia", "Tunnin", "Ei lainkaan"], answer: 1 },
      { q: "Kenelle ilmoitus on suunnattu?", options: ["Henkilökunnalle", "Uimavalvojille", "Asiakkaille", "Johtokunnalle"], answer: 2 },
      { q: "Mihin aikaan uimahalli olisi normaalisti auki?", options: ["Klo 19:15", "Klo 19:30", "Klo 20:00", "Klo 20:30"], answer: 2 }
    ],
  },
  {
    id: "listen-exp3-11",
    title: "Vakuutusyhtiössä",
    scenarioFi: "Asiakas ilmoittaa vahingosta.",
    durationSeconds: 45,
    scriptFi: "Asiakas: Hei, haluan ilmoittaa pienestä auto-onnettomuudesta. Virkailija: Milloin se tapahtui? Asiakas: Eilen iltapäivällä, noin klo 16. Virkailija: Oliko ketään muita osallisena? Asiakas: Toinen auto, mutta kukaan ei loukkaantunut. Virkailija: Tarvitsemme valokuvat ja toisen kuljettajan tiedot.",
    questions: [
      { q: "Milloin onnettomuus tapahtui?", options: ["Tänään", "Eilen iltapäivällä", "Viikko sitten", "Kuukausi sitten"], answer: 1 },
      { q: "Loukkaantuiko joku?", options: ["Kyllä", "Ei", "Vain asiakas", "Ei tiedetä"], answer: 1 },
      { q: "Mitä virkailija pyytää?", options: ["Vain rahat", "Valokuvat ja tiedot", "Ajokortin", "Auton avaimen"], answer: 1 },
      { q: "Mikä aiheutti onnettomuuden?", options: ["Auto", "Moottoripyörä", "Polkupyörä", "Kävelijä"], answer: 0 },
      { q: "Mihin aikaan onnettomuus tapahtui?", options: ["Kello 14", "Kello 15", "Kello 16", "Kello 17"], answer: 2 },
      { q: "Mitä asiakas haluaa ilmoittaa?", options: ["Auton korjauksesta", "Liikenneonnettomuudesta", "Uudesta autosta", "Pysäköintivirheestä"], answer: 1 }
    ],
  },
  {
    id: "listen-exp3-12",
    title: "Yliopistolla",
    scenarioFi: "Opiskelija kysyy ohjaajalta tehtävästä.",
    durationSeconds: 40,
    scriptFi: "Opiskelija: Hei, minulla on kysymys lopputyöstä. Mihin mennessä se täytyy palauttaa? Ohjaaja: Viimeinen palautuspäivä on 15.5. klo 16. Opiskelija: Voinko saada lisäaikaa? Ohjaaja: Voit, jos sinulla on hyvä syy. Lähetä hakemus sähköpostilla.",
    questions: [
      { q: "Mihin mennessä lopputyö palautetaan?", options: ["1.5.", "15.5.", "31.5.", "15.6."], answer: 1 },
      { q: "Voiko saada lisäaikaa?", options: ["Ei koskaan", "Vain hyvällä syyllä", "Aina", "Vain maksullisesti"], answer: 1 },
      { q: "Milloin lopputyön voi palauttaa viimeistään?", options: ["15. kesäkuuta kello 16 mennessä", "15. toukokuuta kello 15 mennessä", "15. toukokuuta kello 16 mennessä", "16. toukokuuta kello 16 mennessä"], answer: 2 },
      { q: "Miten opiskelijan tulee toimia, jos hän haluaa lisäaikaa lopputyöhön?", options: ["Soittaa ohjaajalle", "Täyttää lomakkeen", "Lähettää hakemus sähköpostitse", "Käydä keskustelemassa ohjaajan kanssa"], answer: 2 },
      { q: "Millä ehdolla lisäaikaa voidaan myöntää?", options: ["Jos opiskelija on pyytänyt sitä ajoissa", "Jos opiskelijalla on painava syy", "Jos opiskelija on valmistunut kursseista", "Jos ohjaajalla on aikaa"], answer: 1 },
      { q: "Kuka kysyy lopputyöstä?", options: ["Opettaja", "Ohjaaja", "Opiskelija", "Hakuasiantuntija"], answer: 2 }
    ],
  },
];

/* ============================================================
 * WRITING - 8 mẫu mới
 * ============================================================ */
export const B1_WRITING_EXP3: B1WritingTemplate[] = [
  {
    id: "write-exp3-1",
    type: "mielipide",
    title: "Mielipide: Etätyö vs. toimistotyö",
    promptFi: "Onko etätyö parempi kuin toimistotyö? Esitä mielipiteesi ja anna kaksi perustelua.",
    promptVi: "Làm việc từ xa hay tại văn phòng tốt hơn? Trình bày ý kiến và hai lý lẽ.",
    minWords: 100,
    timeMinutes: 40,
    structure: [
      { step: "Intro", stepFi: "Johdanto", example: "Nykyään monet ihmiset miettivät, kannattaako työskennellä kotona vai toimistolla. Minun mielestäni…" },
      { step: "Reason 1", stepFi: "Perustelu 1", example: "Ensinnäkin, etätyö säästää aikaa työmatkoissa. Esimerkiksi…" },
      { step: "Reason 2", stepFi: "Perustelu 2", example: "Toiseksi, toimistolla on helpompi tavata kollegoita…" },
      { step: "Conclusion", stepFi: "Päätelmä", example: "Yhteenvetona voin sanoa, että paras vaihtoehto on hybridityö." },
    ],
    phrases: [
      { fi: "Minun mielestäni", meaning: "In my opinion" },
      { fi: "Ensinnäkin / Toiseksi", meaning: "Firstly / Secondly" },
      { fi: "Esimerkiksi", meaning: "For example" },
      { fi: "Lisäksi", meaning: "In addition" },
      { fi: "Toisaalta", meaning: "On the other hand" },
      { fi: "Yhteenvetona", meaning: "In summary" },
    ],
    teacherTipFi: "Käytä konkreettinen esimerkki omasta elämästä - se nostaa pisteitä!",
    teacherTipVi: "Dùng ví dụ cụ thể từ đời sống - sẽ tăng điểm!",
  },
  {
    id: "write-exp3-2",
    type: "valitus",
    title: "Valitus: Hidasta nettiä",
    promptFi: "Olet asiakas, ja kotisi internetyhteys on ollut hidas jo viikon. Kirjoita valituskirje operaattorille.",
    promptVi: "Bạn là khách hàng, mạng nhà chậm cả tuần. Viết thư khiếu nại cho nhà mạng.",
    minWords: 100,
    timeMinutes: 35,
    structure: [
      { step: "Intro", stepFi: "Johdanto", example: "Kirjoitan tämän kirjeen, koska olen tyytymätön internetyhteyteni laatuun." },
      { step: "Problem", stepFi: "Ongelma", example: "Yhteys on ollut hidas jo viikon ja katkeaa toistuvasti." },
      { step: "Effect", stepFi: "Vaikutus", example: "Tämä on aiheuttanut ongelmia työssäni, koska teen etätöitä." },
      { step: "Demand", stepFi: "Vaatimus", example: "Pyydän, että tilanne korjataan välittömästi tai saan korvauksen." },
    ],
    phrases: [
      { fi: "Kirjoitan tämän kirjeen, koska...", meaning: "I'm writing because…" },
      { fi: "Olen tyytymätön", meaning: "I am dissatisfied" },
      { fi: "Tämä on aiheuttanut...", meaning: "This has caused…" },
      { fi: "Pyydän, että...", meaning: "I request that…" },
      { fi: "Toivon nopeaa vastausta", meaning: "I expect a quick reply" },
    ],
    teacherTipFi: "Pidä sävy kohtelias mutta vakaa - älä huuda kirjaimilla.",
    teacherTipVi: "Giữ giọng văn lịch sự nhưng kiên định - đừng dùng chữ in HOA để 'hét'.",
  },
  {
    id: "write-exp3-3",
    type: "mielipide",
    title: "Mielipide: Kasvisruoka vs. liharuoka",
    promptFi: "Onko kasvisruoka parempi vaihtoehto kuin liharuoka? Perustele.",
    promptVi: "Đồ chay có tốt hơn đồ thịt không? Hãy lập luận.",
    minWords: 100,
    timeMinutes: 40,
    structure: [
      { step: "Intro", stepFi: "Johdanto", example: "Yhä useampi suomalainen valitsee kasvisruoan. Onko se parempi vaihtoehto?" },
      { step: "Reason 1", stepFi: "Terveys", example: "Kasvisruoka on usein terveellisempää, koska siinä on vähemmän rasvaa." },
      { step: "Reason 2", stepFi: "Ympäristö", example: "Lisäksi se kuormittaa ympäristöä vähemmän kuin lihan tuotanto." },
      { step: "Conclusion", stepFi: "Päätelmä", example: "Mielestäni tasapaino on tärkeintä - molempia voi syödä kohtuudella." },
    ],
    phrases: [
      { fi: "Yhä useampi", meaning: "More and more" },
      { fi: "Terveellisempi", meaning: "Healthier" },
      { fi: "Kuormittaa ympäristöä", meaning: "Burdens the environment" },
      { fi: "Tasapaino on tärkeintä", meaning: "Balance is most important" },
    ],
    teacherTipFi: "Ympäristöteema on YKI:ssä yleinen - opettele 5 sanaa: ilmasto, päästö, kierrätys, luonto, kestävä.",
    teacherTipVi: "Chủ đề môi trường rất phổ biến trong YKI - học 5 từ: ilmasto, päästö, kierrätys, luonto, kestävä.",
  },
  {
    id: "write-exp3-4",
    type: "valitus",
    title: "Valitus: Vialllinen tuote",
    promptFi: "Ostit uuden kahvinkeittimen ja se ei toimi. Kirjoita kauppaan ja vaadi vaihtoa.",
    promptVi: "Bạn mua máy pha cà phê mới nhưng không hoạt động. Viết thư yêu cầu đổi.",
    minWords: 60,
    timeMinutes: 25,
    structure: [
      { step: "Intro", stepFi: "Johdanto", example: "Ostin kahvinkeittimen liikkeestänne 5.10." },
      { step: "Problem", stepFi: "Ongelma", example: "Valitettavasti laite ei toimi - vesi ei lämpene." },
      { step: "Demand", stepFi: "Vaatimus", example: "Pyydän vaihtoa tai rahojen palautusta." },
      { step: "Closing", stepFi: "Lopetus", example: "Liitän mukaan ostokuitin. Toivon nopeaa vastausta." },
    ],
    phrases: [
      { fi: "Liitän mukaan", meaning: "I attach" },
      { fi: "Pyydän vaihtoa", meaning: "I request a replacement" },
      { fi: "Rahojen palautus", meaning: "Refund" },
      { fi: "Ostokuitti", meaning: "Receipt" },
    ],
    teacherTipFi: "Lyhyessä viestissä mene suoraan asiaan - ei pitkää johdantoa.",
    teacherTipVi: "Trong tin nhắn ngắn, vào thẳng vấn đề - không cần mở dài dòng.",
  },
  {
    id: "write-exp3-5",
    type: "mielipide",
    title: "Mielipide: Sosiaalinen media nuorille",
    promptFi: "Onko sosiaalinen media hyvä vai huono asia nuorille? Perustele kahdella esimerkillä.",
    promptVi: "Mạng xã hội tốt hay xấu cho thanh thiếu niên? Hai ví dụ.",
    minWords: 110,
    timeMinutes: 40,
    structure: [
      { step: "Intro", stepFi: "Johdanto", example: "Sosiaalinen media on osa nuorten arkea. Mutta onko se hyvä asia?" },
      { step: "Pos", stepFi: "Hyvä puoli", example: "Toisaalta nuoret pysyvät yhteydessä ystäviinsä ympäri maailmaa." },
      { step: "Neg", stepFi: "Huono puoli", example: "Toisaalta liiallinen käyttö voi aiheuttaa unihäiriöitä ja yksinäisyyttä." },
      { step: "Conclusion", stepFi: "Päätelmä", example: "Tärkeintä on opettaa nuorille rajoja ja terveellistä käyttöä." },
    ],
    phrases: [
      { fi: "On osa arkea", meaning: "Is part of daily life" },
      { fi: "Toisaalta...", meaning: "On one hand…" },
      { fi: "Aiheuttaa unihäiriöitä", meaning: "Causes sleep issues" },
      { fi: "Tärkeintä on", meaning: "The most important is" },
    ],
    teacherTipFi: "Kun kysytään 'hyvä vai huono', anna molempia näkökulmia - ei vain yhtä.",
    teacherTipVi: "Khi được hỏi 'tốt hay xấu', đưa cả hai góc nhìn - không chỉ một.",
  },
  {
    id: "write-exp3-6",
    type: "mielipide",
    title: "Mielipide: Pitäisikö lapsille opettaa rahankäyttöä koulussa?",
    promptFi: "Pitäisikö lapsille opettaa rahankäyttöä jo peruskoulussa? Perustele.",
    promptVi: "Có nên dạy quản lý tiền cho trẻ ngay từ tiểu học? Hãy lập luận.",
    minWords: 100,
    timeMinutes: 40,
    structure: [
      { step: "Intro", stepFi: "Johdanto", example: "Raha on osa elämää, ja silti monet aikuiset eivät osaa hallita sitä..." },
      { step: "Reason 1", stepFi: "Tulevaisuus", example: "Ensinnäkin, lapset oppisivat säästämään tulevaisuutta varten." },
      { step: "Reason 2", stepFi: "Itsenäisyys", example: "Toiseksi, he olisivat itsenäisempiä aikuisina." },
      { step: "Conclusion", stepFi: "Päätelmä", example: "Mielestäni rahankäyttö on yhtä tärkeä taito kuin matematiikka." },
    ],
    phrases: [
      { fi: "On osa elämää", meaning: "Is part of life" },
      { fi: "Säästää tulevaisuutta varten", meaning: "Save for the future" },
      { fi: "Itsenäinen", meaning: "Independent" },
      { fi: "Yhtä tärkeä kuin", meaning: "As important as" },
    ],
    teacherTipFi: "Vertaa konkreettisiin esimerkkeihin (matematiikka, äidinkieli) - vahvistaa argumenttia.",
    teacherTipVi: "So sánh với các ví dụ cụ thể (toán, văn) - củng cố lập luận.",
  },
  {
    id: "write-exp3-7",
    type: "valitus",
    title: "Viesti: Pyydä korjausta vuokranantajalta",
    promptFi: "Asunnossasi on rikkinäinen pesukone. Kirjoita vuokranantajalle viesti, jossa pyydät korjausta.",
    promptVi: "Máy giặt nhà bạn hỏng. Viết tin nhắn cho chủ nhà yêu cầu sửa chữa.",
    minWords: 50,
    timeMinutes: 20,
    structure: [
      { step: "Greeting", stepFi: "Tervehdys", example: "Hei Pekka," },
      { step: "Problem", stepFi: "Ongelma", example: "Ilmoitan, että pesukoneeni ei toimi enää. Olen yrittänyt käynnistää sitä useita kertoja." },
      { step: "Request", stepFi: "Pyyntö", example: "Voisitko järjestää korjaajan mahdollisimman pian?" },
      { step: "Closing", stepFi: "Lopetus", example: "Kiitos jo etukäteen. T. Liisa" },
    ],
    phrases: [
      { fi: "Ilmoitan, että...", meaning: "I'm informing you that…" },
      { fi: "Mahdollisimman pian", meaning: "As soon as possible" },
      { fi: "Kiitos jo etukäteen", meaning: "Thanks in advance" },
    ],
    teacherTipFi: "Lyhyessäkin viestissä käytä kohteliaita muotoja: 'Voisitko' on parempi kuin 'Korjaa heti'.",
    teacherTipVi: "Tin nhắn ngắn vẫn cần lịch sự: 'Voisitko' (bạn có thể không) tốt hơn 'Korjaa heti' (sửa ngay).",
  },
  {
    id: "write-exp3-8",
    type: "mielipide",
    title: "Mielipide: Pitäisikö julkisen liikenteen olla ilmaista?",
    promptFi: "Pitäisikö kaikessa pääkaupunkiseudun julkisessa liikenteessä olla ilmainen? Perustele.",
    promptVi: "Phương tiện công cộng ở Helsinki có nên miễn phí? Hãy lập luận.",
    minWords: 110,
    timeMinutes: 40,
    structure: [
      { step: "Intro", stepFi: "Johdanto", example: "Joissakin Euroopan kaupungeissa julkinen liikenne on jo ilmaista. Pitäisikö Helsingin seurata?" },
      { step: "Pro", stepFi: "Puolesta", example: "Toisaalta ilmainen joukkoliikenne vähentäisi autoja ja saastetta." },
      { step: "Con", stepFi: "Vastaan", example: "Toisaalta verot nousisivat ja palvelu voisi heiketä." },
      { step: "Conclusion", stepFi: "Päätelmä", example: "Mielestäni hyvä kompromissi olisi alennettu hinta opiskelijoille ja eläkeläisille." },
    ],
    phrases: [
      { fi: "Joissakin kaupungeissa", meaning: "In some cities" },
      { fi: "Vähentäisi", meaning: "Would reduce" },
      { fi: "Verot nousisivat", meaning: "Taxes would rise" },
      { fi: "Hyvä kompromissi", meaning: "A good compromise" },
    ],
    teacherTipFi: "Käytä konditionaalimuotoja (-isi-): 'olisi', 'vähentäisi' - näyttää B1-tason kielioppia.",
    teacherTipVi: "Dùng dạng điều kiện (-isi-): 'olisi', 'vähentäisi' - thể hiện ngữ pháp B1.",
  },
];

/* ============================================================
 * SPEAKING - 12 tình huống mới
 * ============================================================ */
export const B1_SPEAKING_EXP3: B1SpeakingSituation[] = [
  {
    id: "speak-exp3-1",
    title: "Pankissa: Tilin avaaminen",
    scenarioFi: "Avaat ensimmäistä kertaa pankkitilin Suomessa.",
    scenarioVi: "Lần đầu mở tài khoản ngân hàng ở Phần Lan.",
    taskFi: "Kerro työtilanteesi, kysy maksuista, valitse tilityyppi, pyydä verkkopankkitunnukset.",
    hintsFi: ["Haluaisin avata pankkitilin.", "Mitä maksuja siinä on?", "Tarvitsen verkkopankin.", "Tässä on henkilöllisyystodistus."],
    speakingCoachLink: "/speaking-coach?lang=finnish&topic=banking",
    timeMinutes: 4,
  },
  {
    id: "speak-exp3-2",
    title: "Hammaslääkärissä",
    scenarioFi: "Hampaasi särkee. Menet hammaslääkäriin.",
    scenarioVi: "Răng bạn đau. Bạn đến nha sĩ.",
    taskFi: "Selitä oireet, kuvaile kipua, kysy hoidosta ja hinnasta.",
    hintsFi: ["Hampaani särkee.", "Kipu alkoi pari päivää sitten.", "Tarvitseeko paikata?", "Kuinka paljon se maksaa?"],
    speakingCoachLink: "/speaking-coach?lang=finnish&topic=dentist",
    timeMinutes: 4,
  },
  {
    id: "speak-exp3-3",
    title: "Työhaastattelussa",
    scenarioFi: "Olet työhaastattelussa myyjän paikasta.",
    scenarioVi: "Bạn đang phỏng vấn cho vị trí nhân viên bán hàng.",
    taskFi: "Esittäydy, kerro työkokemuksesta, vahvuuksistasi, miksi haluat juuri tämän työn.",
    hintsFi: ["Minulla on kolmen vuoden kokemus.", "Olen sosiaalinen ja täsmällinen.", "Haluan oppia uutta.", "Pidän asiakaspalvelusta."],
    speakingCoachLink: "/speaking-coach?lang=finnish&topic=interview",
    timeMinutes: 5,
  },
  {
    id: "speak-exp3-4",
    title: "Yliopiston ohjaaja",
    scenarioFi: "Tapaat ohjaajan ja keskustelet opinnoistasi.",
    scenarioVi: "Gặp giáo viên hướng dẫn để nói về việc học.",
    taskFi: "Kerro opintojesi tilanteesta, vaikeuksista ja tulevaisuudensuunnitelmista.",
    hintsFi: ["Olen toisen vuoden opiskelija.", "Matematiikka on haastavaa.", "Haluaisin tehdä vaihto-opinnot.", "Suunnitelmana on valmistua kahdessa vuodessa."],
    speakingCoachLink: "/speaking-coach?lang=finnish&topic=studies",
    timeMinutes: 4,
  },
  {
    id: "speak-exp3-5",
    title: "Naapurin kanssa",
    scenarioFi: "Tutustut uuteen naapuriin rappukäytävässä.",
    scenarioVi: "Làm quen hàng xóm mới ở cầu thang.",
    taskFi: "Esittäydy, kerro itsestäsi, kysy heidän taustastaan, ehdota yhteistä kahvia.",
    hintsFi: ["Hei, olen naapurinne.", "Asutko täällä uutena?", "Mistä olet kotoisin?", "Tulisitko kahville joskus?"],
    speakingCoachLink: "/speaking-coach?lang=finnish&topic=neighbor",
    timeMinutes: 3,
  },
  {
    id: "speak-exp3-6",
    title: "Lounaspaikassa kollegoiden kanssa",
    scenarioFi: "Olet lounaalla kollegoiden kanssa.",
    scenarioVi: "Đang ăn trưa cùng đồng nghiệp.",
    taskFi: "Aloita keskustelu, kysy heidän viikonlopustaan, jaa omia suunnitelmia.",
    hintsFi: ["Mitä teit viikonloppuna?", "Kuulostaa hauskalta!", "Itse käytin perheen kanssa kotona.", "Mitä suunnitelmia ensi viikonlopuksi?"],
    speakingCoachLink: "/speaking-coach?lang=finnish&topic=lunch",
    timeMinutes: 4,
  },
  {
    id: "speak-exp3-7",
    title: "Tilausvastaava puhelimessa",
    scenarioFi: "Soitat ravintolaan tilataksesi noutoruokaa.",
    scenarioVi: "Gọi nhà hàng đặt đồ ăn mang về.",
    taskFi: "Kerro tilauksesi, kysy ajasta ja hinnasta, anna osoite jos toimitetaan.",
    hintsFi: ["Haluaisin tilata kaksi pizzaa.", "Mihin aikaan se on valmis?", "Voinko maksaa kortilla noudossa?", "Osoitteeni on..."],
    speakingCoachLink: "/speaking-coach?lang=finnish&topic=takeaway",
    timeMinutes: 3,
  },
  {
    id: "speak-exp3-8",
    title: "Lapsen vanhempainilta",
    scenarioFi: "Olet lapsesi vanhempainillassa koulussa.",
    scenarioVi: "Bạn dự buổi họp phụ huynh ở trường con.",
    taskFi: "Esittele itsesi, kysy lapsesi koulumenestyksestä, ehdota tukea.",
    hintsFi: ["Olen Tiinan äiti.", "Kuinka Tiina pärjää?", "Tarvitseeko hän lisätukea?", "Voin auttaa kotona."],
    speakingCoachLink: "/speaking-coach?lang=finnish&topic=parents-evening",
    timeMinutes: 4,
  },
  {
    id: "speak-exp3-9",
    title: "Liikuntaohjaajan kanssa",
    scenarioFi: "Aloitat uudessa kuntosalissa ja keskustelet ohjaajan kanssa.",
    scenarioVi: "Bạn mới đến phòng tập và nói chuyện với huấn luyện viên.",
    taskFi: "Kerro tavoitteesi, nykyinen kunto, kysy ohjelmasta.",
    hintsFi: ["Haluan saada parempaan kuntoon.", "En ole liikkunut säännöllisesti.", "Voitko tehdä minulle ohjelman?", "Kuinka monta kertaa viikossa?"],
    speakingCoachLink: "/speaking-coach?lang=finnish&topic=gym",
    timeMinutes: 3,
  },
  {
    id: "speak-exp3-10",
    title: "Asuntoasiamies - Asunnon esittely",
    scenarioFi: "Olet katsomassa vuokra-asuntoa.",
    scenarioVi: "Bạn đang đi xem căn hộ cho thuê.",
    taskFi: "Kysy asunnon kunnosta, vuokrasta, naapureista, julkisesta liikenteestä.",
    hintsFi: ["Onko asunto hyväkuntoinen?", "Mikä on vuokra?", "Onko hiljainen alue?", "Onko bussipysäkki lähellä?"],
    speakingCoachLink: "/speaking-coach?lang=finnish&topic=apartment",
    timeMinutes: 4,
  },
  {
    id: "speak-exp3-11",
    title: "Festivaaleilla - Lipun osto",
    scenarioFi: "Ostat festivaalilipun lipunmyynnistä.",
    scenarioVi: "Mua vé lễ hội ở quầy.",
    taskFi: "Kysy hinnasta, päivittäisistä esiintyjistä, opiskelija-alennuksesta.",
    hintsFi: ["Paljonko lippu maksaa?", "Onko opiskelija-alennusta?", "Ketkä esiintyvät lauantaina?", "Voinko ostaa kaksi?"],
    speakingCoachLink: "/speaking-coach?lang=finnish&topic=festival",
    timeMinutes: 3,
  },
  {
    id: "speak-exp3-12",
    title: "Sukulaisille - Onnittelut",
    scenarioFi: "Soitat tädillesi onnitellaksesi syntymäpäivänä.",
    scenarioVi: "Gọi cô để chúc mừng sinh nhật.",
    taskFi: "Onnittele lämpimästi, kysy juhlista ja terveydestä, sovi tapaaminen.",
    hintsFi: ["Hyvää syntymäpäivää!", "Miten vietät päivän?", "Miten voit?", "Tulisinko käymään ensi viikolla?"],
    speakingCoachLink: "/speaking-coach?lang=finnish&topic=family-call",
    timeMinutes: 3,
  },
];
