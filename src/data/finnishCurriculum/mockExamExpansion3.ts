import type { FinnishModule } from "./types";

export const finnishMockExamExpansion3Modules: FinnishModule[] = [
  // READING
  {
    id: "yki-mock-reading-exp3",
    title: "Luetun ymmärtäminen - Lisäharjoitukset 3",
    titleEn: "Reading Comprehension - Extra Sets 3",
    icon: "📰",
    color: "from-blue-500 to-indigo-600",
    description: "Lisää lukutehtäviä YKI A2 -tasolla",
    descriptionEn: "More reading tasks at YKI A2 level",
    pillar: "mock-exams",
    lessons: [
      {
        id: "yki-mock-reading-exp3-1", title: "Vuokrailmoitus", titleEn: "Rental Ad", icon: "🏠", level: "A2",
        theory: `### Lue vuokrailmoitus ja vastaa kysymyksiin.\n\n**Vuokrataan:** 2 huoneen asunto Tampereen keskustassa. 55 m², 3. kerros, hissi. Vuokra 750 €/kk + sähkö. Vapaa 1.6. alkaen. Lemmikkieläimet sallittu. Yhteystiedot: vuokra@esimerkki.fi`,
        theoryEn: "Read the rental ad and answer the questions.",
        quiz: [
          { question: "Kuinka monta huonetta asunnossa on?", options: ["1", "2", "3", "4"], answer: 1, explanation: "Ilmoituksessa lukee '2 huoneen asunto'." },
          { question: "Paljonko vuokra on?", options: ["550 €", "650 €", "750 €", "850 €"], answer: 2, explanation: "Vuokra on 750 €/kk + sähkö." },
          { question: "Saako asunnossa pitää lemmikkieläimiä?", options: ["Kyllä", "Ei", "Ei mainita", "Vain kissoja"], answer: 0, explanation: "'Lemmikkieläimet sallittu' - kyllä saa." },
        ],
      },
      {
        id: "yki-mock-reading-exp3-2", title: "Kuntosalin esite", titleEn: "Gym Brochure", icon: "🏋️", level: "A2",
        theory: `### Lue kuntosalin esite.\n\n**FitCenter Turku**\nAukioloajat: ma–pe 6–22, la–su 8–20.\nJäsenmaksut: kuukausi 39 €, vuosi 349 €. Opiskelijoille -20 %. Ensimmäinen käynti ilmainen! Ryhmäliikuntatunnit: jooga, spinning, zumba. Osoite: Hämeenkatu 15.`,
        theoryEn: "Read the gym brochure and answer.",
        quiz: [
          { question: "Paljonko kuukausijäsenyys maksaa?", options: ["29 €", "39 €", "49 €", "59 €"], answer: 1, explanation: "Kuukausimaksu on 39 €." },
          { question: "Saako opiskelija alennusta?", options: ["10 %", "15 %", "20 %", "Ei"], answer: 2, explanation: "Opiskelijoille -20 %." },
          { question: "Mihin aikaan kuntosali aukeaa lauantaisin?", options: ["6:00", "7:00", "8:00", "9:00"], answer: 2, explanation: "La–su 8–20, eli aukeaa klo 8." },
        ],
      },
      {
        id: "yki-mock-reading-exp3-3", title: "Bussiaikataulu", titleEn: "Bus Schedule", icon: "🚌", level: "A2",
        theory: `### Lue bussiaikataulu.\n\n**Linja 15: Keskusta → Hervanta**\nArkisin: 6:15, 6:45, 7:15, 7:45 ... joka 30 min klo 22:15 asti.\nLauantaisin: 8:00, 9:00, 10:00 ... joka tunti klo 22:00 asti.\nSunnuntaisin: 9:00, 11:00, 13:00, 15:00, 17:00, 19:00.\nLipun hinta: aikuinen 3 €, opiskelija 1,50 €.`,
        theoryEn: "Read the bus schedule and answer.",
        quiz: [
          { question: "Kuinka usein bussi kulkee arkisin?", options: ["15 min", "20 min", "30 min", "60 min"], answer: 2, explanation: "Arkisin joka 30 minuutti." },
          { question: "Paljonko opiskelijan lippu maksaa?", options: ["1 €", "1,50 €", "2 €", "3 €"], answer: 1, explanation: "Opiskelija 1,50 €." },
          { question: "Montako vuoroa kulkee sunnuntaisin?", options: ["4", "5", "6", "7"], answer: 2, explanation: "Sunnuntaisin: 9, 11, 13, 15, 17, 19 → 6 vuoroa." },
        ],
      },
    ],
  },
  // LISTENING
  {
    id: "yki-mock-listening-exp3",
    title: "Kuullun ymmärtäminen - Lisäharjoitukset 3",
    titleEn: "Listening Comprehension - Extra Sets 3",
    icon: "🎧",
    color: "from-purple-500 to-violet-600",
    description: "Lisää kuuntelutehtäviä YKI A2 -tasolla",
    descriptionEn: "More listening tasks at YKI A2 level",
    pillar: "mock-exams",
    lessons: [
      {
        id: "yki-mock-listening-exp3-1", title: "Lentokenttäkuulutus", titleEn: "Airport Announcement", icon: "✈️", level: "A2",
        theory: `### Kuuntele lentokenttäkuulutus.\n\n"Huomio, matkustajat! Finnair-lennon AY123 Helsinki–Tukholma lähtöportti on vaihtunut. Uusi portti on B12. Lento lähtee aikataulun mukaisesti kello 14:30. Kiitos."`,
        theoryEn: "Listen to the airport announcement.",
        quiz: [
          { question: "Mikä on uusi lähtöportti?", options: ["A12", "B12", "B21", "C12"], answer: 1, explanation: "Uusi portti on B12." },
          { question: "Mihin aikaan lento lähtee?", options: ["13:30", "14:00", "14:30", "15:00"], answer: 2, explanation: "Lento lähtee kello 14:30." },
          { question: "Minne lento menee?", options: ["Oslo", "Tukholma", "Kööpenhamina", "Tallinna"], answer: 1, explanation: "Helsinki–Tukholma." },
        ],
      },
      {
        id: "yki-mock-listening-exp3-2", title: "Puhelinvaraus", titleEn: "Phone Reservation", icon: "📞", level: "A2",
        theory: `### Kuuntele puhelinvaraus.\n\n- Ravintola Savoy, päivää!\n- Päivää. Haluaisin varata pöydän perjantai-illaksi.\n- Monelle hengelle?\n- Neljälle, kiitos.\n- Mihin aikaan?\n- Kello 19.\n- Hienoa, pöytä neljälle klo 19. Millä nimellä?\n- Virtanen.\n- Kiitos, varaus on tehty!`,
        theoryEn: "Listen to the phone reservation.",
        quiz: [
          { question: "Monelle hengelle pöytä varataan?", options: ["2", "3", "4", "5"], answer: 2, explanation: "Neljälle hengelle." },
          { question: "Mihin aikaan varaus on?", options: ["18:00", "18:30", "19:00", "19:30"], answer: 2, explanation: "Kello 19." },
          { question: "Millä nimellä varaus tehdään?", options: ["Korhonen", "Virtanen", "Nieminen", "Mäkinen"], answer: 1, explanation: "Nimellä Virtanen." },
        ],
      },
      {
        id: "yki-mock-listening-exp3-3", title: "Uutiset", titleEn: "News Broadcast", icon: "📺", level: "A2",
        theory: `### Kuuntele uutiset.\n\n"Tänään Helsingissä on avattu uusi kirjasto Kalasataman alueella. Kirjasto on avoinna maanantaista lauantaihin kello 9–20. Kirjastossa on lasten osasto, opiskelutiloja ja kahvila. Avajaisviikolla kaikille lainaus on ilmaista."`,
        theoryEn: "Listen to the news broadcast.",
        quiz: [
          { question: "Missä uusi kirjasto on?", options: ["Espoo", "Kalasatama", "Vantaa", "Tampere"], answer: 1, explanation: "Kalasataman alueella." },
          { question: "Mihin aikaan kirjasto sulkeutuu?", options: ["18:00", "19:00", "20:00", "21:00"], answer: 2, explanation: "Kello 9–20, sulkeutuu klo 20." },
          { question: "Mitä avajaisviikolla tarjotaan?", options: ["Ilmainen kahvi", "Ilmainen lainaus", "Ilmainen kortti", "Ilmainen kirja"], answer: 1, explanation: "Kaikille lainaus on ilmaista." },
        ],
      },
    ],
  },
  // WRITING
  {
    id: "yki-mock-writing-exp3",
    title: "Kirjoittaminen - Lisäharjoitukset 3",
    titleEn: "Writing - Extra Sets 3",
    icon: "✍️",
    color: "from-emerald-500 to-green-600",
    description: "Lisää kirjoitustehtäviä YKI A2 -tasolla",
    descriptionEn: "More writing tasks at YKI A2 level",
    pillar: "mock-exams",
    lessons: [
      {
        id: "yki-mock-writing-exp3-1", title: "Kiitosviesti naapurille", titleEn: "Thank You Note to Neighbor", icon: "🏘️", level: "A2",
        theory: `### Kirjoitustehtävä\n\n**Tehtävä:** Naapurisi hoiti kissaasi lomasi aikana. Kirjoita kiitosviesti:\n- Kiitä häntä\n- Kerro, miten loma meni\n- Ehdota yhteistä kahvihetkeä\n\n**Aika:** 15 min | **Sanamäärä:** 40–60 sanaa\n\n**Mallivastaus:**\nHei Liisa! Kiitos todella paljon, että hoidit Misse-kissaani! Lomani meni hyvin. Kävin Tukholmassa ja näin paljon kauniita paikkoja. Haluaisitko tulla kahville ensi lauantaina? Voin tuoda sinulle pienen lahjan matkalta. Kiitos vielä kerran! Terveisin, Anna`,
        theoryEn: "Write a thank-you note to your neighbor who took care of your cat.",
        sampleAnswer: "Hei Liisa! Kiitos todella paljon, että hoidit Misse-kissaani! Lomani meni hyvin. Kävin Tukholmassa ja näin paljon kauniita paikkoja. Haluaisitko tulla kahville ensi lauantaina? Voin tuoda sinulle pienen lahjan matkalta. Kiitos vielä kerran! Terveisin, Anna",
        quiz: [
          { question: "Miten kiität naapuria?", options: ["Kiitos paljon avustasi!", "Tervetuloa!", "Anteeksi!", "Hei hei!"], answer: 0, explanation: "'Kiitos paljon avustasi!' is an appropriate thank-you." },
        ],
      },
      {
        id: "yki-mock-writing-exp3-2", title: "Palautetta kurssista", titleEn: "Course Feedback", icon: "📋", level: "A2",
        theory: `### Kirjoitustehtävä\n\n**Tehtävä:** Olet käynyt suomen kielen kurssin. Kirjoita palaute:\n- Mistä pidit kurssilla?\n- Mitä voisi parantaa?\n- Suosittelisitko kurssia muille?\n\n**Aika:** 20 min | **Sanamäärä:** 50–80 sanaa\n\n**Mallivastaus:**\nHei! Pidin kurssista paljon. Opettaja oli ystävällinen ja selitti asiat selvästi. Erityisesti pidin ryhmätehtävistä. Toivoisin kuitenkin enemmän puheharjoituksia. Kirjoitusharjoituksia oli riittävästi. Suosittelen kurssia kaikille, jotka haluavat oppia suomea! Ystävällisin terveisin, Minh`,
        theoryEn: "Write feedback about a Finnish course you attended.",
        sampleAnswer: "Hei! Pidin kurssista paljon. Opettaja oli ystävällinen ja selitti asiat selvästi. Erityisesti pidin ryhmätehtävistä. Toivoisin kuitenkin enemmän puheharjoituksia. Kirjoitusharjoituksia oli riittävästi. Suosittelen kurssia kaikille, jotka haluavat oppia suomea! Ystävällisin terveisin, Minh",
        quiz: [
          { question: "'Suosittelisitko' on...", options: ["imperatiivi", "konditionaali", "passiiivi", "imperfekti"], answer: 1, explanation: "Suosittelisitko = conditional mood of 'suositella'." },
        ],
      },
      {
        id: "yki-mock-writing-exp3-3", title: "Ilmoitus myyntitavarasta", titleEn: "For-Sale Ad", icon: "🏷️", level: "A2",
        theory: `### Kirjoitustehtävä\n\n**Tehtävä:** Myyt vanhaa polkupyörääsi. Kirjoita myynti-ilmoitus:\n- Kuvaile pyörää (väri, koko, kunto)\n- Kerro hinta\n- Kerro yhteystiedot ja milloin voi tulla katsomaan\n\n**Aika:** 15 min | **Sanamäärä:** 40–60 sanaa\n\n**Mallivastaus:**\nMyydään punainen naisten polkupyörä. Pyörä on hyväkuntoinen, 3 vuotta vanha. Koko 26 tuumaa. Hinta 80 euroa. Voit tulla katsomaan pyörää Tampereen keskustaan arkisin klo 17 jälkeen. Ota yhteyttä: 040-1234567. Tervetuloa katsomaan!`,
        theoryEn: "Write a for-sale ad for your old bicycle.",
        sampleAnswer: "Myydään punainen naisten polkupyörä. Pyörä on hyväkuntoinen, 3 vuotta vanha. Koko 26 tuumaa. Hinta 80 euroa. Voit tulla katsomaan pyörää Tampereen keskustaan arkisin klo 17 jälkeen. Ota yhteyttä: 040-1234567. Tervetuloa katsomaan!",
        quiz: [
          { question: "'Hyväkuntoinen' tarkoittaa...", options: ["brand new", "in good condition", "broken", "expensive"], answer: 1, explanation: "'Hyväkuntoinen' = in good condition." },
        ],
      },
      {
        id: "yki-mock-writing-exp3-4", title: "Sähköposti vuokranantajalle", titleEn: "Email to Landlord", icon: "🏠", level: "A2",
        theory: `### Kirjoitustehtävä\n\n**Tehtävä:** Asunnossasi on ongelma. Kirjoita sähköposti vuokranantajalle:\n- Kerro, mikä on vialla\n- Kerro, milloin ongelma alkoi\n- Pyydä korjaamaan\n\n**Aika:** 15 min | **Sanamäärä:** 40–60 sanaa\n\n**Hyödyllisiä ilmaisuja:** Hyvä vuokranantaja / Haluaisin ilmoittaa, että... / Ongelma alkoi... / Voisitteko korjata...? / Ystävällisin terveisin`,
        theoryEn: "Write an email to your landlord about a problem in your apartment.",
        sampleAnswer: "Hyvä vuokranantaja! Haluaisin ilmoittaa, että keittiön hana vuotaa. Ongelma alkoi viime viikolla. Vesi tippuu koko ajan ja lattia kastuu. Voisitteko korjata hanan mahdollisimman pian? Olen kotona iltaisin klo 17 jälkeen. Ystävällisin terveisin, Linh",
        quiz: [
          { question: "'Vuokranantaja' tarkoittaa...", options: ["tenant", "landlord", "neighbor", "repairman"], answer: 1, explanation: "'Vuokranantaja' = landlord." },
        ],
      },
      {
        id: "yki-mock-writing-exp3-5", title: "Kutsu juhliin", titleEn: "Party Invitation", icon: "🎉", level: "A2",
        theory: `### Kirjoitustehtävä\n\n**Tehtävä:** Järjestät syntymäpäiväjuhlat. Kirjoita kutsu ystävällesi:\n- Kerro, milloin ja missä juhlat ovat\n- Kerro, mitä juhlissa tapahtuu\n- Pyydä vastaamaan kutsuun\n\n**Aika:** 15 min | **Sanamäärä:** 40–60 sanaa\n\n**Hyödyllisiä ilmaisuja:** Tervetuloa juhlimaan! / Juhlat ovat... / Tarjolla on... / Vastaa viimeistään... / Nähdään!`,
        theoryEn: "Write a birthday party invitation to your friend.",
        sampleAnswer: "Hei! Tervetuloa syntymäpäiväjuhliini ensi lauantaina 15. kesäkuuta! Juhlat alkavat klo 18 kotonani osoitteessa Hämeentie 5. Tarjolla on ruokaa, kakkua ja musiikkia. Pelataan myös pelejä! Vastaa viimeistään keskiviikkona. Nähdään juhlissa! Terveisin, Linh",
        quiz: [
          { question: "'Syntymäpäiväjuhlat' tarkoittaa...", options: ["wedding party", "birthday party", "Christmas party", "graduation party"], answer: 1, explanation: "'Syntymäpäiväjuhlat' = birthday party." },
        ],
      },
    ],
  },
  // SPEAKING
  {
    id: "yki-mock-speaking-exp3",
    title: "Puhuminen - Lisäharjoitukset 3",
    titleEn: "Speaking - Extra Sets 3",
    icon: "🎙️",
    color: "from-rose-500 to-pink-600",
    description: "Lisää puhetehtäviä YKI A2 -tasolla",
    descriptionEn: "More speaking tasks at YKI A2 level",
    pillar: "mock-exams",
    lessons: [
      {
        id: "yki-mock-speaking-exp3-1", title: "Kaupassa asioiminen", titleEn: "Shopping", icon: "🛒", level: "A2",
        theory: `### Puhetehtävä\n\n**Tilanne:** Olet vaatekaupassa. Haluat ostaa takin.\n- Kysy, onko takkia koossa M\n- Kysy hintaa\n- Kysy, voitko sovittaa\n- Kysy, voiko maksaa kortilla\n\n**Aika:** 3 min\n\n**Hyödyllisiä ilmaisuja:** Anteeksi, onko teillä...? / Paljonko tämä maksaa? / Voinko sovittaa? / Käykö kortti?\n\n**Arviointikriteerit:**\n- Sujuvuus ja ääntäminen\n- Sanavalinnat ja ilmaisut\n- Tilanteen hoitaminen loppuun`,
        theoryEn: "Role-play: Shopping for a jacket.",
        sampleAnswer: "Hei! Haluaisin ostaa takin. Onko teillä takkia koossa M? Paljonko tämä maksaa? Voinko sovittaa tätä? Käykö kortti? Kiitos paljon!",
        quiz: [
          { question: "'Voinko sovittaa?' tarkoittaa...", options: ["Can I pay?", "Can I try it on?", "Can I return it?", "Can I see it?"], answer: 1, explanation: "'Sovittaa' = to try on." },
        ],
      },
      {
        id: "yki-mock-speaking-exp3-2", title: "Naapurin kanssa jutteleminen", titleEn: "Chatting with Neighbor", icon: "🏠", level: "A2",
        theory: `### Puhetehtävä\n\n**Tilanne:** Tapaat uuden naapurin rappukäytävässä.\n- Esittele itsesi\n- Kysy, mistä hän on kotoisin\n- Kerro, kuinka kauan olet asunut talossa\n- Ehdota kahville tulemista\n\n**Aika:** 3 min\n\n**Arviointikriteerit:**\n- Kohtelias esittäytyminen\n- Kysymysten muodostaminen\n- Luonteva keskustelu`,
        theoryEn: "Role-play: Chatting with a new neighbor.",
        sampleAnswer: "Hei! Minä olen Anna. Olen asunut tässä talossa kaksi vuotta. Mistä sinä olet kotoisin? Hauska tavata! Haluaisitko tulla meille kahville joskus? Voisimme jutella lisää!",
        quiz: [
          { question: "'Mistä olet kotoisin?' tarkoittaa...", options: ["Where do you work?", "Where are you from?", "Where do you live?", "Where are you going?"], answer: 1, explanation: "'Kotoisin' = originally from." },
        ],
      },
      {
        id: "yki-mock-speaking-exp3-3", title: "Harrastuksista kertominen", titleEn: "Talking About Hobbies", icon: "🎨", level: "A2",
        theory: `### Puhetehtävä\n\n**Tilanne:** Kerro harrastuksistasi.\n- Mitä harrastat?\n- Kuinka usein?\n- Miksi pidät siitä?\n- Suosittele harrastusta toiselle\n\n**Aika:** 3 min\n\n**Hyödyllisiä ilmaisuja:** Harrastan... / Käyn ... kerran viikossa / Pidän siitä, koska... / Suosittelen, koska...\n\n**Arviointikriteerit:**\n- Verbien oikea käyttö (harrastaa + partitiivi)\n- Ajan ilmaisut\n- Perustelutaito`,
        theoryEn: "Talk about your hobbies.",
        sampleAnswer: "Harrastan uimista ja lukemista. Käyn uimassa kaksi kertaa viikossa uimahallissa. Pidän uimisesta, koska se on hyvää liikuntaa ja rentouttavaa. Suosittelen uimista kaikille, koska se on hauskaa ja terveellistä!",
        quiz: [
          { question: "'Harrastan uimista' - mikä sijamuoto?", options: ["partitiivi", "genetiivi", "illatiivi", "inessiivi"], answer: 0, explanation: "Harrastaa + partitiivi → uimista." },
        ],
      },
      {
        id: "yki-mock-speaking-exp3-4", title: "Ravintolassa tilaaminen", titleEn: "Ordering at a Restaurant", icon: "🍽️", level: "A2",
        theory: `### Puhetehtävä\n\n**Tilanne:** Olet ravintolassa. Tilaa ruokaa ja juomaa.\n- Kysy ruokalistaa\n- Tilaa alkuruoka ja pääruoka\n- Kysy, onko jälkiruokaa\n- Pyydä lasku\n\n**Aika:** 3 min\n\n**Hyödyllisiä ilmaisuja:** Saisinko ruokalistan? / Haluaisin tilata... / Onko teillä...? / Saisinko laskun?\n\n**Arviointikriteerit:**\n- Kohtelias pyyntö (konditionaali)\n- Ruokasanasto\n- Luonteva vuorovaikutus`,
        theoryEn: "Role-play: Ordering food at a restaurant.",
        sampleAnswer: "Saisinko ruokalistan, kiitos? Haluaisin tilata alkuruoaksi keittoa ja pääruoaksi lohta perunoiden kanssa. Onko teillä jälkiruokaa? Haluaisin kahvia myös. Saisinko laskun, kiitos!",
        quiz: [
          { question: "'Saisinko laskun?' on...", options: ["käsky", "kohtelias pyyntö", "kysymys hinnasta", "valitus"], answer: 1, explanation: "'Saisinko' on konditionaali - kohtelias pyyntö." },
        ],
      },
      {
        id: "yki-mock-speaking-exp3-5", title: "Terveyskeskuksessa", titleEn: "At the Health Center", icon: "🏥", level: "A2",
        theory: `### Puhetehtävä\n\n**Tilanne:** Olet terveyskeskuksessa. Kerro lääkärille oireistasi.\n- Kerro, mikä on vialla\n- Kerro, milloin oireet alkoivat\n- Vastaa lääkärin kysymyksiin\n- Kysy ohjeita\n\n**Aika:** 3 min\n\n**Hyödyllisiä ilmaisuja:** Minulla on... / Oireet alkoivat... / Onko minun otettava lääkettä? / Milloin tulen uudelleen?\n\n**Arviointikriteerit:**\n- Oiresanasto\n- Ajan ilmaisut (eilen, viime viikolla)\n- Kysymysten muodostaminen`,
        theoryEn: "Role-play: Describing symptoms at the health center.",
        sampleAnswer: "Päivää! Minulla on kuumetta ja yskää. Oireet alkoivat kolme päivää sitten. En käytä mitään lääkkeitä. Onko minun otettava jotain lääkettä? Milloin tulen uudelleen vastaanotolle? Kiitos!",
        quiz: [
          { question: "'Minulla on kuumetta' - mitä verbiä käytetään?", options: ["olen", "minulla on", "tulen", "menen"], answer: 1, explanation: "'Minulla on' - omistusrakenne tuntemuksille." },
        ],
      },
    ],
  },
];
