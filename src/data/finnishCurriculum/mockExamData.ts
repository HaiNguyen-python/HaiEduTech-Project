// YKI A2 Mock Exam Data — 5 sets per skill, Finnish-only exam content
import type { FinnishModule } from "./types";

export const finnishMockExamModules: FinnishModule[] = [
  // ===== READING (5 sets) =====
  {
    id: "yki-mock-reading",
    title: "Tekstin ymmärtäminen",
    titleEn: "Reading Comprehension",
    icon: "📖",
    color: "from-blue-500 to-indigo-600",
    description: "YKI-style reading passages: emails, job ads, news, and official letters.",
    descriptionEn: "YKI-style reading passages: emails, job ads, news, and official letters.",
    pillar: "mock-exams",
    lessons: [
      {
        id: "yki-mock-reading-1",
        title: "Sähköposti kaverille",
        titleEn: "Email to a Friend",
        icon: "📧",
        level: "A2",
        theory: `### Lue sähköposti ja vastaa kysymyksiin.

**Lähettäjä:** anna.korhonen@email.fi
**Vastaanottaja:** liisa.m@email.fi
**Aihe:** Terveisiä Tampereelta!

Hei Liisa!

Mitä kuuluu? Minä muutin Tampereelle kaksi viikkoa sitten. Uusi asuntoni on kaksio Hervannassa. Siinä on olohuone, makuuhuone ja pieni keittiö. Parvekkeelta näkee puiston!

Aloitin uuden työn viime maanantaina. Työskentelen kirjastossa. Työ on mukavaa ja työkaverit ovat ystävällisiä. Työmatka kestää vain 15 minuuttia bussilla.

Haluaisitko tulla käymään ensi viikonloppuna? Voimme käydä Särkänniemessä. Siellä on uusi vuoristorata!

Terveisin,
Anna`,
        theoryEn: `### Read the email and answer the questions.

(Finnish A2-level email about moving to Tampere, new job, and inviting a friend to visit.)`,
        quiz: [
          { question: "Mihin Anna muutti?", options: ["Helsinkiin", "Turkuun", "Tampereelle", "Ouluun"], answer: 2, explanation: "'Minä muutin Tampereelle' — Anna moved to Tampere." },
          { question: "Millainen asunto Annalla on?", options: ["Yksiö", "Kaksio", "Kolmio", "Omakotitalo"], answer: 1, explanation: "'Uusi asuntoni on kaksio Hervannassa.'" },
          { question: "Missä Anna työskentelee?", options: ["Sairaalassa", "Koulussa", "Kirjastossa", "Kaupassa"], answer: 2, explanation: "'Työskentelen kirjastossa.'" },
          { question: "Kuinka kauan Annan työmatka kestää?", options: ["5 minuuttia", "15 minuuttia", "30 minuuttia", "1 tunti"], answer: 1, explanation: "'Työmatka kestää vain 15 minuuttia bussilla.'" },
          { question: "Oikein vai väärin: Anna pyytää Liisaa käymään ensi viikolla.", options: ["Oikein", "Väärin — ensi viikonloppuna"], answer: 1, explanation: "'Haluaisitko tulla käymään ensi viikonloppuna?' — next weekend, not next week." },
        ],
      },
      {
        id: "yki-mock-reading-2",
        title: "Työpaikkailmoitus",
        titleEn: "Job Advertisement",
        icon: "💼",
        level: "A2",
        theory: `### Lue työpaikkailmoitus ja vastaa kysymyksiin.

**MYYJÄ — K-Market Kallio, Helsinki**

Etsimme osa-aikaista myyjää K-Market Kallioon. Työ sisältää kassatyötä, hyllyjen täyttämistä ja asiakaspalvelua.

**Vaatimukset:**
- Suomen kielen taito (vähintään A2-taso)
- Kokemus kassatyöstä on eduksi
- Ystävällinen ja reipas asenne
- Mahdollisuus työskennellä iltaisin ja viikonloppuisin

**Tarjoamme:**
- Työaika: 20–30 tuntia viikossa
- Palkka: TES:n mukainen
- Henkilöstöetuudet (henkilökunta-alennus 15%)

**Hae:** Lähetä hakemus ja ansioluettelo 31.3. mennessä osoitteeseen: rekry@kmarket-kallio.fi`,
        theoryEn: `### Read the job ad and answer the questions.

(A2-level job advertisement for a part-time sales assistant at K-Market.)`,
        quiz: [
          { question: "Mikä työpaikka on kyseessä?", options: ["Ravintola", "K-Market", "Posti", "Kirjasto"], answer: 1, explanation: "'K-Market Kallio, Helsinki'" },
          { question: "Onko työ kokoaikaista vai osa-aikaista?", options: ["Kokoaikaista", "Osa-aikaista"], answer: 1, explanation: "'Etsimme osa-aikaista myyjää.'" },
          { question: "Mikä kielitaso vaaditaan vähintään?", options: ["A1", "A2", "B1", "B2"], answer: 1, explanation: "'Suomen kielen taito (vähintään A2-taso).'" },
          { question: "Kuinka monta tuntia viikossa työ on?", options: ["10–20", "20–30", "30–40", "40"], answer: 1, explanation: "'Työaika: 20–30 tuntia viikossa.'" },
          { question: "Milloin hakemus pitää lähettää?", options: ["15.3. mennessä", "31.3. mennessä", "1.4. mennessä", "Ei aikarajaa"], answer: 1, explanation: "'Lähetä hakemus ja ansioluettelo 31.3. mennessä.'" },
        ],
      },
      {
        id: "yki-mock-reading-3",
        title: "Uutinen paikallislehdessä",
        titleEn: "Local Newspaper Article",
        icon: "📰",
        level: "A2",
        theory: `### Lue uutinen ja vastaa kysymyksiin.

**Uusi leikkipuisto avataan Espoon Tapiolaan**

Espoon kaupunki avaa uuden leikkipuiston Tapiolaan ensi lauantaina 22.3. Puisto on tarkoitettu 2–12-vuotiaille lapsille. Puistossa on kiipeilyteline, liukumäki, keinut ja hiekkalaatikko.

Avajaisissa kello 10–14 on ilmaista mehua ja pullaa kaikille. Lisäksi paikalla on pelle, joka tekee ilmapalloeläimiä.

"Halusimme rakentaa turvallisen paikan, jossa perheet voivat viettää aikaa yhdessä", sanoo puistopäällikkö Matti Laine.

Puisto on avoinna joka päivä kello 7–21.`,
        theoryEn: `### Read the news article and answer the questions.

(Local news about a new playground opening in Tapiola, Espoo.)`,
        quiz: [
          { question: "Missä uusi leikkipuisto on?", options: ["Helsingissä", "Espoon Tapiolassa", "Vantaalla", "Tampereella"], answer: 1, explanation: "'Espoon kaupunki avaa uuden leikkipuiston Tapiolaan.'" },
          { question: "Minkä ikäisille lapsille puisto on tarkoitettu?", options: ["0–5-vuotiaille", "2–12-vuotiaille", "5–15-vuotiaille", "Kaikille"], answer: 1, explanation: "'Puisto on tarkoitettu 2–12-vuotiaille lapsille.'" },
          { question: "Mitä avajaisissa tarjotaan?", options: ["Kahvia ja kakkua", "Mehua ja pullaa", "Jäätelöä", "Ei mitään"], answer: 1, explanation: "'Avajaisissa on ilmaista mehua ja pullaa.'" },
          { question: "Mihin aikaan puisto on avoinna?", options: ["8–20", "7–21", "9–18", "Ympäri vuorokauden"], answer: 1, explanation: "'Puisto on avoinna joka päivä kello 7–21.'" },
        ],
      },
      {
        id: "yki-mock-reading-4",
        title: "Virallinen kirje",
        titleEn: "Official Letter",
        icon: "📬",
        level: "A2",
        theory: `### Lue kirje ja vastaa kysymyksiin.

**Kela — Päätös asumistuesta**

Arvoisa asiakas,

Olemme käsitelleet asumistukihakemuksenne. Päätös on seuraava:

Asumistuki myönnetään ajalle 1.4.–31.12.2025. Tuen määrä on 280 euroa kuukaudessa. Tuki maksetaan kuun alussa tilillenne.

Huomioikaa, että teidän tulee ilmoittaa muutoksista (esim. tulojen muutos, muutto) kuukauden kuluessa. Ilmoituksen voitte tehdä verkossa osoitteessa kela.fi tai puhelimitse numerossa 020 634 0200.

Jos olette tyytymätön päätökseen, voitte tehdä valituksen 30 päivän kuluessa.

Ystävällisin terveisin,
Kelan asumistukiyksikkö`,
        theoryEn: `### Read the official letter and answer the questions.

(A Kela (Social Insurance) decision letter about housing benefit.)`,
        quiz: [
          { question: "Mistä kirje on?", options: ["Verotoimistosta", "Kelasta", "Pankista", "Työvoimatoimistosta"], answer: 1, explanation: "'Kela — Päätös asumistuesta'" },
          { question: "Kuinka paljon asumistukea maksetaan kuukaudessa?", options: ["180 €", "280 €", "380 €", "480 €"], answer: 1, explanation: "'Tuen määrä on 280 euroa kuukaudessa.'" },
          { question: "Milloin tuki maksetaan?", options: ["Kuun alussa", "Kuun puolivälissä", "Kuun lopussa", "Kerran vuodessa"], answer: 0, explanation: "'Tuki maksetaan kuun alussa tilillenne.'" },
          { question: "Kuinka nopeasti muutoksista pitää ilmoittaa?", options: ["Viikon kuluessa", "Kuukauden kuluessa", "Kolmen kuukauden kuluessa", "Vuoden kuluessa"], answer: 1, explanation: "'Teidän tulee ilmoittaa muutoksista kuukauden kuluessa.'" },
        ],
      },
      {
        id: "yki-mock-reading-5",
        title: "Kirjaston tiedote",
        titleEn: "Library Notice",
        icon: "📚",
        level: "A2",
        theory: `### Lue kirjaston tiedote ja vastaa kysymyksiin.

**Helsingin kaupunginkirjasto — Oodi**

Hyvät asiakkaat!

Kirjasto on suljettu maanantaina 15.4. remontin vuoksi. Tiistaina 16.4. olemme avoinna normaalisti klo 8–22.

Muistakaa: Lainoja voi uusia verkossa osoitteessa helmet.fi. Myöhästymismaksu on 0,20 €/päivä/kirja. Lasten kirjoista ei peritä myöhästymismaksua.

**Uutta:** Nyt voit lainata myös e-kirjoja ja äänikirjoja sovelluksella!

Tervetuloa kirjastoon!`,
        theoryEn: `### Read the library notice and answer the questions.

(Notice from Helsinki Central Library Oodi about closure, late fees, and new services.)`,
        quiz: [
          { question: "Miksi kirjasto on suljettu maanantaina?", options: ["Loman vuoksi", "Remontin vuoksi", "Sään vuoksi", "Kokouksen vuoksi"], answer: 1, explanation: "'remontin vuoksi' = due to renovation." },
          { question: "Paljonko myöhästymismaksu on?", options: ["0,10 €/päivä", "0,20 €/päivä", "0,50 €/päivä", "1,00 €/päivä"], answer: 1, explanation: "'Myöhästymismaksu on 0,20 €/päivä/kirja.'" },
          { question: "Peritäänkö lasten kirjoista myöhästymismaksu?", options: ["Kyllä", "Ei"], answer: 1, explanation: "'Lasten kirjoista ei peritä myöhästymismaksua.'" },
          { question: "Mitä uutta palvelua kirjasto tarjoaa?", options: ["Elokuvia", "E-kirjoja ja äänikirjoja", "Musiikkia", "Pelejä"], answer: 1, explanation: "'Nyt voit lainata myös e-kirjoja ja äänikirjoja.'" },
        ],
      },
    ],
  },

  // ===== LISTENING (5 sets) =====
  {
    id: "yki-mock-listening",
    title: "Kuullun ymmärtäminen",
    titleEn: "Listening Comprehension",
    icon: "🎧",
    color: "from-purple-500 to-violet-600",
    description: "Everyday Finnish dialogues and announcements — train, doctor, market, weather.",
    descriptionEn: "Everyday Finnish dialogues and announcements — train, doctor, market, weather.",
    pillar: "mock-exams",
    lessons: [
      {
        id: "yki-mock-listening-1",
        title: "Puhelu lääkärille",
        titleEn: "Phone Call to Doctor",
        icon: "📞",
        level: "A2",
        theory: `### Kuuntele keskustelu ja vastaa kysymyksiin.

**Transkriptio:**

> **Vastaanottoapulainen:** Terveysasema, päivää. Miten voin auttaa?
>
> **Potilas:** Päivää. Haluaisin varata ajan lääkärille.
>
> **Vastaanottoapulainen:** Mikä vaiva on?
>
> **Potilas:** Minulla on ollut päänsärkyä ja kuumetta kolme päivää.
>
> **Vastaanottoapulainen:** Selvä. Lääkärillä on vapaata huomenna kello 10:30. Sopiiko se?
>
> **Potilas:** Kyllä, se sopii hyvin. Kiitos!
>
> **Vastaanottoapulainen:** Nimi ja henkilötunnus, kiitos?
>
> **Potilas:** Minh Nguyen, henkilötunnus 010590-1234.`,
        theoryEn: `### Listen to the conversation and answer the questions.

(Transcript of a phone call to book a doctor's appointment.)`,
        quiz: [
          { question: "Mihin potilas soittaa?", options: ["Apteekkiin", "Terveysasemalle", "Sairaalaan", "Hammaslääkäriin"], answer: 1, explanation: "'Terveysasema, päivää.'" },
          { question: "Mitä oireita potilaalla on?", options: ["Yskää ja nuhaa", "Päänsärkyä ja kuumetta", "Vatsakipua", "Selkäkipua"], answer: 1, explanation: "'Minulla on ollut päänsärkyä ja kuumetta.'" },
          { question: "Milloin lääkäriaika on?", options: ["Tänään klo 10:30", "Huomenna klo 10:30", "Ensi viikolla", "Perjantaina"], answer: 1, explanation: "'Lääkärillä on vapaata huomenna kello 10:30.'" },
        ],
      },
      {
        id: "yki-mock-listening-2",
        title: "Kuulutus juna-asemalla",
        titleEn: "Train Station Announcement",
        icon: "🚉",
        level: "A2",
        theory: `### Kuuntele kuulutus ja vastaa kysymyksiin.

**Transkriptio:**

> "Huomio, huomio! Intercity-juna numero 73 Helsingistä Ouluun lähtee raiteelta 6 kello 15:45. Pysähdykset: Pasila, Tikkurila, Riihimäki, Hämeenlinna, Tampere, Seinäjoki ja Oulu. Matka-aika on noin 6 tuntia. Ravintolavaunussa on tarjoilua. Hyvää matkaa!"`,
        theoryEn: `### Listen to the announcement and answer the questions.

(Train station announcement about an Intercity train to Oulu.)`,
        quiz: [
          { question: "Minne juna menee?", options: ["Tampereelle", "Turkuun", "Ouluun", "Rovaniemelle"], answer: 2, explanation: "'Helsingistä Ouluun'" },
          { question: "Miltä raiteelta juna lähtee?", options: ["Raiteelta 3", "Raiteelta 4", "Raiteelta 5", "Raiteelta 6"], answer: 3, explanation: "'raiteelta 6'" },
          { question: "Kuinka kauan matka kestää?", options: ["4 tuntia", "5 tuntia", "6 tuntia", "8 tuntia"], answer: 2, explanation: "'Matka-aika on noin 6 tuntia.'" },
        ],
      },
      {
        id: "yki-mock-listening-3",
        title: "Sääennuste",
        titleEn: "Weather Forecast",
        icon: "🌤️",
        level: "A2",
        theory: `### Kuuntele sääennuste ja vastaa kysymyksiin.

**Transkriptio:**

> "Hyvää huomenta! Tänään on pilvistä ja tuulista. Etelä-Suomessa lämpötila on noin 5 astetta. Iltapäivällä voi sataa vähän vettä. Huomenna on aurinkoisempaa ja lämpötila nousee 10 asteeseen. Viikonloppuna tulee taas sadetta ja lämpötila laskee nollaan. Pukeutukaa lämpimästi!"`,
        theoryEn: `### Listen to the weather forecast and answer the questions.

(Weather forecast for Southern Finland.)`,
        quiz: [
          { question: "Millainen sää on tänään?", options: ["Aurinkoista", "Pilvistä ja tuulista", "Sadetta ja ukkosta", "Lunta"], answer: 1, explanation: "'Tänään on pilvistä ja tuulista.'" },
          { question: "Mikä on tänään lämpötila?", options: ["0 astetta", "5 astetta", "10 astetta", "15 astetta"], answer: 1, explanation: "'lämpötila on noin 5 astetta'" },
          { question: "Millainen sää on huomenna?", options: ["Sateinen", "Aurinkoisempi", "Luminen", "Sama kuin tänään"], answer: 1, explanation: "'Huomenna on aurinkoisempaa.'" },
          { question: "Mikä on viikonlopun lämpötila?", options: ["5 astetta", "10 astetta", "0 astetta", "-5 astetta"], answer: 2, explanation: "'lämpötila laskee nollaan.'" },
        ],
      },
      {
        id: "yki-mock-listening-4",
        title: "Keskustelu torilla",
        titleEn: "Conversation at the Market",
        icon: "🏪",
        level: "A2",
        theory: `### Kuuntele keskustelu ja vastaa kysymyksiin.

**Transkriptio:**

> **Myyjä:** Tervetuloa! Mitä saisi olla?
>
> **Asiakas:** Paljonko mansikat maksavat?
>
> **Myyjä:** Puoli kiloa on 4 euroa ja kilo on 7 euroa.
>
> **Asiakas:** Otan kilon mansikkaa. Ja onko teillä tuoreita herneitä?
>
> **Myyjä:** Kyllä on! Herne maksaa 3 euroa litra.
>
> **Asiakas:** Otan kaksi litraa herneitä. Paljonko yhteensä?
>
> **Myyjä:** 7 plus 6 on 13 euroa. Käteisellä vai kortilla?
>
> **Asiakas:** Kortilla, kiitos.`,
        theoryEn: `### Listen to the conversation and answer the questions.

(Buying strawberries and peas at the market.)`,
        quiz: [
          { question: "Paljonko kilo mansikkaa maksaa?", options: ["4 euroa", "5 euroa", "7 euroa", "10 euroa"], answer: 2, explanation: "'kilo on 7 euroa'" },
          { question: "Mitä muuta asiakas ostaa?", options: ["Omenoita", "Tomaatteja", "Herneitä", "Perunoita"], answer: 2, explanation: "'Ja onko teillä tuoreita herneitä?'" },
          { question: "Paljonko asiakas maksaa yhteensä?", options: ["10 euroa", "11 euroa", "13 euroa", "15 euroa"], answer: 2, explanation: "'7 plus 6 on 13 euroa.'" },
        ],
      },
      {
        id: "yki-mock-listening-5",
        title: "Pankkivirkailija",
        titleEn: "At the Bank",
        icon: "🏦",
        level: "A2",
        theory: `### Kuuntele keskustelu ja vastaa kysymyksiin.

**Transkriptio:**

> **Virkailija:** Hyvää päivää. Miten voin auttaa?
>
> **Asiakas:** Haluaisin avata pankkitilin.
>
> **Virkailija:** Selvä. Tarvitsen henkilöllisyystodistuksen ja osoitetiedot.
>
> **Asiakas:** Tässä on passini. Asun osoitteessa Mannerheimintie 15 B 42.
>
> **Virkailija:** Kiitos. Haluatteko myös verkkopankkitunnukset?
>
> **Asiakas:** Kyllä kiitos.
>
> **Virkailija:** Tunnukset tulevat postissa noin viikon kuluessa. Pankkikortti tulee erikseen.`,
        theoryEn: `### Listen to the conversation and answer the questions.

(Opening a bank account in Finland.)`,
        quiz: [
          { question: "Mitä asiakas haluaa tehdä?", options: ["Vaihtaa rahaa", "Avata pankkitilin", "Sulkea tilin", "Hakea lainaa"], answer: 1, explanation: "'Haluaisin avata pankkitilin.'" },
          { question: "Mitä asiakirjoja tarvitaan?", options: ["Ajokortti", "Passi ja osoitetiedot", "Työtodistus", "Verotodistus"], answer: 1, explanation: "'Tarvitsen henkilöllisyystodistuksen ja osoitetiedot.'" },
          { question: "Miten verkkopankkitunnukset tulevat?", options: ["Sähköpostilla", "Tekstiviestillä", "Postissa", "Pankista haettava"], answer: 2, explanation: "'Tunnukset tulevat postissa noin viikon kuluessa.'" },
        ],
      },
    ],
  },

  // ===== WRITING (5 sets) =====
  {
    id: "yki-mock-writing",
    title: "Kirjoittaminen",
    titleEn: "Writing",
    icon: "✍️",
    color: "from-emerald-500 to-green-600",
    description: "YKI writing tasks: informal emails, messages, complaints, and invitations — all in Finnish.",
    descriptionEn: "YKI writing tasks: informal emails, messages, complaints, and invitations — all in Finnish.",
    pillar: "mock-exams",
    lessons: [
      {
        id: "yki-mock-writing-1",
        title: "Sähköposti kaverille",
        titleEn: "Email to a Friend",
        icon: "📧",
        level: "A2",
        theory: `### Kirjoitustehtävä 1

**Tehtävä:** Kirjoita sähköposti kaverillesi Mikalle. Kerro hänelle:
- Aloitit uuden suomen kielen kurssin
- Kerro kurssista (missä, milloin, minkälainen)
- Kysy haluaako hän tulla mukaan

**Hyödyllisiä ilmaisuja:**
- Hei Mikka! / Moikka!
- Aloitin uuden kurssin...
- Kurssi on [maanantaisin ja keskiviikkoisin]...
- Haluaisitko tulla mukaan?
- Terveisin / Nähdään!

**Aika:** 20 minuuttia | **Sanamäärä:** 50–80 sanaa`,
        theoryEn: `### Writing Task 1: Email to a friend about a new Finnish course.

Time: 20 minutes | Word count: 50–80 words`,
        quiz: [
          { question: "Miten aloitat epävirallisen sähköpostin?", options: ["Arvoisa vastaanottaja", "Hei/Moikka + nimi", "Herra/Rouva", "Kunnioittaen"], answer: 1, explanation: "'Hei [nimi]!' or 'Moikka!' for informal emails." },
        ],
      },
      {
        id: "yki-mock-writing-2",
        title: "Viesti opettajalle",
        titleEn: "Message to Teacher",
        icon: "📝",
        level: "A2",
        theory: `### Kirjoitustehtävä 2

**Tehtävä:** Kirjoita viesti opettajallesi. Kerro:
- Et voi tulla tunnille huomenna
- Syy: lapsesi on sairas
- Kysy: mitä tehtiin tunnilla
- Pyydä läksyt sähköpostilla

**Hyödyllisiä ilmaisuja:**
- Hei opettaja / Hyvä opettaja
- En valitettavasti pääse tunnille huomenna
- Voisitteko lähettää läksyt sähköpostilla?
- Kiitos ymmärryksestä

**Aika:** 15 minuuttia | **Sanamäärä:** 40–60 sanaa`,
        theoryEn: `### Writing Task 2: Message to your teacher about missing class.

Time: 15 minutes | Word count: 40–60 words`,
        quiz: [
          { question: "Miten ilmoitat opettajalle poissaolosta?", options: ["En tule huomenna", "En valitettavasti pääse tunnille", "Mä en jaksa tulla", "Mä skipaan tunnin"], answer: 1, explanation: "Polite form: 'En valitettavasti pääse tunnille.' The other options are either too blunt or too informal (slang)." },
        ],
      },
      {
        id: "yki-mock-writing-3",
        title: "Valitus huonosta palvelusta",
        titleEn: "Complaint Letter",
        icon: "😤",
        level: "A2",
        theory: `### Kirjoitustehtävä 3

**Tehtävä:** Kirjoita valitus ravintolalle. Kerro:
- Kävit ravintolassa viime lauantaina
- Ruoka oli kylmää
- Odotit 45 minuuttia
- Tarjoilija oli epäystävällinen
- Pyydä anteeksipyyntöä tai hyvitystä

**Hyödyllisiä ilmaisuja:**
- Hyvä ravintolan johtaja / Arvoisa...
- Haluan valittaa palvelusta...
- Ruoka oli kylmää ja odotusaika oli liian pitkä
- Toivoisin hyvitystä / anteeksipyyntöä

**Aika:** 20 minuuttia | **Sanamäärä:** 60–90 sanaa`,
        theoryEn: `### Writing Task 3: Complaint letter to a restaurant about bad service.

Time: 20 minutes | Word count: 60–90 words`,
        quiz: [
          { question: "Miten aloitat virallisen valituksen?", options: ["Hei!", "Arvoisa...", "Moro!", "Kuule!"], answer: 1, explanation: "'Arvoisa...' is the formal way to start a complaint." },
        ],
      },
      {
        id: "yki-mock-writing-4",
        title: "Kutsu syntymäpäiville",
        titleEn: "Birthday Invitation",
        icon: "🎂",
        level: "A2",
        theory: `### Kirjoitustehtävä 4

**Tehtävä:** Kirjoita kutsu syntymäpäivillesi. Kerro:
- Täytät 30 vuotta
- Milloin ja missä juhlat ovat
- Mitä ohjelmassa on (ruokaa, musiikkia)
- Pyydä ilmoittamaan tulosta

**Hyödyllisiä ilmaisuja:**
- Tervetuloa juhlimaan kanssani!
- Juhlat ovat [päivämäärä] klo [aika] osoitteessa [osoite]
- Tarjolla on [ruoka ja juoma]
- Ilmoitathan tulostasi [päivämäärään] mennessä

**Aika:** 15 minuuttia | **Sanamäärä:** 50–70 sanaa`,
        theoryEn: `### Writing Task 4: Birthday party invitation.

Time: 15 minutes | Word count: 50–70 words`,
        quiz: [
          { question: "'Ilmoitathan tulostasi' tarkoittaa...", options: ["Tell me your name", "Please confirm your attendance", "Bring a gift", "Come early"], answer: 1, explanation: "'Ilmoitathan tulostasi' = Please confirm your attendance (RSVP)." },
        ],
      },
      {
        id: "yki-mock-writing-5",
        title: "Ilmoitus taloyhtiölle",
        titleEn: "Notice to Housing Company",
        icon: "🏢",
        level: "A2",
        theory: `### Kirjoitustehtävä 5

**Tehtävä:** Kirjoita ilmoitus taloyhtiön isännöitsijälle. Kerro:
- Kylpyhuoneen hana vuotaa
- Ongelma alkanut viikko sitten
- Pyydä korjausta mahdollisimman pian
- Kerro milloin olet kotona (huoltomiehen käyntiä varten)

**Hyödyllisiä ilmaisuja:**
- Hyvä isännöitsijä
- Haluan ilmoittaa viasta asunnossani
- Kylpyhuoneen hana on vuotanut viikon ajan
- Pyydän korjausta pikimmiten
- Olen kotona arkisin kello 16 jälkeen

**Aika:** 20 minuuttia | **Sanamäärä:** 50–80 sanaa`,
        theoryEn: `### Writing Task 5: Report a maintenance issue to the housing company.

Time: 20 minutes | Word count: 50–80 words`,
        quiz: [
          { question: "'Isännöitsijä' on englanniksi...", options: ["Landlord", "Property manager", "Neighbor", "Maintenance worker"], answer: 1, explanation: "'Isännöitsijä' = property manager / building manager." },
        ],
      },
    ],
  },

  // ===== SPEAKING (5 sets) =====
  {
    id: "yki-mock-speaking",
    title: "Puhuminen",
    titleEn: "Speaking",
    icon: "🎤",
    color: "from-rose-500 to-red-600",
    description: "Timed YKI speaking prompts: introduce yourself, react to situations, describe images.",
    descriptionEn: "Timed YKI speaking prompts: introduce yourself, react to situations, describe images.",
    pillar: "mock-exams",
    lessons: [
      {
        id: "yki-mock-speaking-1",
        title: "Kerro itsestäsi",
        titleEn: "Tell About Yourself",
        icon: "👤",
        level: "A2",
        sampleAnswer: "Nimeni on Maria ja olen kotoisin Vietnamista. Asun nyt Helsingissä perheeni kanssa. Opiskelen suomea ja työskentelen ravintolassa tarjoilijana. Vapaa-ajallani tykkään lukea kirjoja ja kävellä luonnossa. Opiskelen suomea, koska haluan asua Suomessa pysyvästi ja saada hyvän työpaikan.",
        theory: `### Puhumistehtävä 1: Kerro itsestäsi

**Ohje:** Sinulla on **40 sekuntia** aikaa vastata. Kerro:
- Nimesi ja mistä olet kotoisin
- Missä asut nyt ja kenen kanssa
- Mitä teet työksesi tai opiskeletko
- Mitä harrastuksia sinulla on
- Miksi opiskelet suomea

**Hyödyllisiä ilmaisuja:**
- Nimeni on... ja olen kotoisin [maasta].
- Asun [kaupungissa] [perheeni/ystäväni] kanssa.
- Opiskelen / Työskentelen [ammatti/ala].
- Vapaa-ajallani [harrastus].
- Opiskelen suomea, koska...`,
        theoryEn: `### Speaking Task 1: Tell about yourself (40 seconds)`,
        quiz: [
          { question: "Kuinka kauan aikaa on puhumistehtävässä?", options: ["20 sekuntia", "40 sekuntia", "2 minuuttia", "5 minuuttia"], answer: 1, explanation: "YKI speaking tasks typically give 30–40 seconds." },
        ],
      },
      {
        id: "yki-mock-speaking-2",
        title: "Apteekissa",
        titleEn: "At the Pharmacy",
        icon: "💊",
        level: "A2",
        theory: `### Puhumistehtävä 2: Reagoi tilanteeseen — Apteekissa

**Ohje:** Olet apteekissa. Sinulla on **30 sekuntia** aikaa vastata jokaiseen kohtaan.

**Kohta A:** Kerro apteekin työntekijälle:
- Sinulla on päänsärkyä
- Tarvitset särkylääkettä
- Kysy suositusta

**Kohta B:** Apteekin työntekijä kysyy:
- "Onko teillä allergioita?"
- Vastaa ja kysy lääkkeen hinnasta

**Kohta C:** Työntekijä kertoo:
- "Tämä lääke maksaa 8,50 euroa. Ottakaa yksi tabletti kolme kertaa päivässä."
- Kiitä ja kysy muuta tarvittavaa`,
        theoryEn: `### Speaking Task 2: React to a situation — At the pharmacy (30 seconds per part)`,
        quiz: [
          { question: "'Onko teillä allergioita?' tarkoittaa...", options: ["Do you have insurance?", "Do you have allergies?", "Do you have a prescription?", "Do you have pain?"], answer: 1, explanation: "'Onko teillä allergioita?' = Do you have any allergies?" },
        ],
      },
      {
        id: "yki-mock-speaking-3",
        title: "Kuvaile kuvaa",
        titleEn: "Describe an Image",
        icon: "🖼️",
        level: "A2",
        theory: `### Puhumistehtävä 3: Kuvaile kuvaa

**Ohje:** Sinulla on **40 sekuntia** aikaa kuvailla kuvaa.

**Kuvan kuvaus:** Perhe on puistossa. Isä pelaa jalkapalloa pojan kanssa. Äiti istuu penkillä ja lukee kirjaa. Pieni tyttö leikkii koiran kanssa. Sää on aurinkoinen ja lämmin.

**Kerro:**
- Mitä kuvassa on?
- Mitä ihmiset tekevät?
- Millainen sää on?
- Mitä luulet, mikä vuodenaika on?

**Hyödyllisiä ilmaisuja:**
- Kuvassa on... / Kuvassa näkyy...
- [Henkilö] tekee [jotakin]
- Sää on [aurinkoinen/sateinen]
- Mielestäni vuodenaika on [kesä/talvi]`,
        theoryEn: `### Speaking Task 3: Describe an image (40 seconds)

Describe a family in a park — activities, weather, season.`,
        quiz: [
          { question: "Miten aloitat kuvan kuvailun?", options: ["Tässä on kuva.", "Kuvassa on / Kuvassa näkyy...", "Katso kuvaa.", "Minä näen..."], answer: 1, explanation: "'Kuvassa on...' or 'Kuvassa näkyy...' are natural ways to start describing an image." },
        ],
      },
      {
        id: "yki-mock-speaking-4",
        title: "Työhaastattelu",
        titleEn: "Job Interview",
        icon: "👔",
        level: "A2",
        theory: `### Puhumistehtävä 4: Reagoi tilanteeseen — Työhaastattelu

**Ohje:** Olet työhaastattelussa. Vastaa kysymyksiin. **30 sekuntia** per kysymys.

**Kysymys 1:** "Kerro itsestäsi ja työkokemuksestasi."

**Kysymys 2:** "Miksi haet tätä työpaikkaa?"

**Kysymys 3:** "Mitkä ovat vahvuutesi?"

**Kysymys 4:** "Voitko työskennellä viikonloppuisin?"

**Hyödyllisiä ilmaisuja:**
- Minulla on kokemusta [alalta]
- Hain tätä työtä, koska...
- Olen [ahkera/luotettava/ystävällinen]
- Kyllä, voin työskennellä viikonloppuisin`,
        theoryEn: `### Speaking Task 4: React to a job interview situation (30 seconds per question)`,
        quiz: [
          { question: "'Mitkä ovat vahvuutesi?' tarkoittaa...", options: ["What are your weaknesses?", "What are your strengths?", "What is your salary?", "What is your experience?"], answer: 1, explanation: "'Mitkä ovat vahvuutesi?' = What are your strengths?" },
        ],
      },
      {
        id: "yki-mock-speaking-5",
        title: "Naapurin kanssa",
        titleEn: "With Your Neighbor",
        icon: "🏘️",
        level: "A2",
        theory: `### Puhumistehtävä 5: Reagoi tilanteeseen — Naapurin kanssa

**Ohje:** Tapaat naapurisi rappukäytävässä. **40 sekuntia.**

**Keskustele:**
- Tervehdi naapuria
- Kerro mitä teit viikonloppuna
- Kysy naapurilta hänen viikonlopustaan
- Puhu säästä

**Hyödyllisiä ilmaisuja:**
- Hei! Mitä kuuluu?
- Viikonloppuna kävin [paikassa] / tein [jotakin]
- Entäs sinulla, mitä teit viikonloppuna?
- Onpa kylmä/lämmin tänään!
- Mukava jutella! Hyvää päivän jatkoa!`,
        theoryEn: `### Speaking Task 5: Small talk with your neighbor (40 seconds)`,
        quiz: [
          { question: "'Hyvää päivän jatkoa!' tarkoittaa...", options: ["Good morning!", "Have a nice day!", "Good evening!", "See you tomorrow!"], answer: 1, explanation: "'Hyvää päivän jatkoa!' = Have a nice rest of the day!" },
        ],
      },
    ],
  },
];
