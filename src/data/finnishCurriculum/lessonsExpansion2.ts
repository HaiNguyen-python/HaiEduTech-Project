import type { FinnishModule } from "./types";

export const finnishLessonExpansion2Modules: FinnishModule[] = [
  {
    id: "yki-possessive",
    title: "Possessiivisuffiksit",
    titleEn: "Possessive Suffixes",
    icon: "🔤",
    color: "from-violet-500 to-purple-600",
    description: "Omistusliitteet: -ni, -si, -nsa/-nsä, -mme, -nne",
    descriptionEn: "Possessive suffixes in Finnish: -ni, -si, -nsa, -mme, -nne",
    pillar: "lessons",
    lessons: [
      {
        id: "possessive-basics",
        title: "Omistusliitteiden perusteet",
        titleEn: "Possessive Suffix Basics",
        icon: "📝",
        level: "A2",
        theory: `### Possessiivisuffiksit (Omistusliitteet)

Suomen kielessä omistusta voidaan ilmaista omistusliitteillä. Ne lisätään sanan loppuun.

| Persoona | Suffiksi | Esimerkki |
|----------|---------|-----------|
| minä | -ni | kirja**ni** (my book) |
| sinä | -si | kirja**si** (your book) |
| hän | -nsa/-nsä | kirja**nsa** (his/her book) |
| me | -mme | kirja**mme** (our book) |
| te | -nne | kirja**nne** (your book) |
| he | -nsa/-nsä | kirja**nsa** (their book) |

**Esimerkkejä:**
- Missä on **laukkuni**? (Where is my bag?)
- Tämä on **autosi**. (This is your car.)
- Hän rakastaa **perhettään**. (He/she loves his/her family.)
- **Kotimme** on kaunis. (Our home is beautiful.)
- Onko **koiranne** kiltti? (Is your dog nice?)`,
        theoryEn: `### Possessive Suffixes

In Finnish, possession can be expressed with possessive suffixes added to the end of the word.

| Person | Suffix | Example |
|--------|--------|---------|
| minä (I) | -ni | kirjani (my book) |
| sinä (you) | -si | kirjasi (your book) |
| hän (he/she) | -nsa/-nsä | kirjansa (his/her book) |
| me (we) | -mme | kirjamme (our book) |
| te (you pl.) | -nne | kirjanne (your book) |
| he (they) | -nsa/-nsä | kirjansa (their book) |`,
        grammar: [
          {
            title: "Perusmuoto + suffiksi",
            titleEn: "Base form + suffix",
            explanation: "Omistusliite lisätään sanan perusmuodon tai taivutetun muodon perään.",
            explanationEn: "The possessive suffix is added after the base or inflected form.",
            examples: [
              { finnish: "talo + ni → taloni", english: "my house" },
              { finnish: "auto + si → autosi", english: "your car" },
              { finnish: "koulu + mme → koulumme", english: "our school" },
              { finnish: "nimi + nsä → nimensä", english: "his/her name" },
            ],
          },
        ],
        quiz: [
          { question: "'Minun kirjani' — mikä on omistusliite?", options: ["-ni", "-si", "-nsa", "-mme"], answer: 0, explanation: "Minä → -ni: kirjani" },
          { question: "Täydennä: 'Missä on avain___?' (sinä)", options: ["-ni", "-si", "-nsa", "-mme"], answer: 1, explanation: "Sinä → -si: avaimesi" },
          { question: "'Meidän talomme' — mikä suffiksi?", options: ["-nne", "-mme", "-nsa", "-ni"], answer: 1, explanation: "Me → -mme: talomme" },
          { question: "Valitse oikea: 'Hän otti ___ (his bag)'", options: ["laukkunsa", "laukkuni", "laukkumme", "laukkunne"], answer: 0, explanation: "Hän → -nsa: laukkunsa" },
        ],
      },
    ],
  },
  {
    id: "yki-rection",
    title: "Rektio",
    titleEn: "Verb Rection",
    icon: "🔗",
    color: "from-cyan-500 to-teal-600",
    description: "Verbien rektio: mitä sijaa verbi vaatii?",
    descriptionEn: "Verb rection: which case does the verb require?",
    pillar: "lessons",
    lessons: [
      {
        id: "rection-basics",
        title: "Rektioperusteet",
        titleEn: "Rection Basics",
        icon: "📐",
        level: "A2",
        theory: `### Rektio — Verbin vaatima sija

Jokaisella verbillä on oma rektionsa. Se tarkoittaa, että verbi vaatii tietyn sijamuodon.

**Partitiivi (-a/-ä):**
- rakastaa + partitiivi → Rakastan **musiikkia**.
- odottaa + partitiivi → Odotan **bussia**.
- pelätä + partitiivi → Pelkään **koiraa**.

**Elatiivi (-sta/-stä):**
- pitää + elatiivi → Pidän **kahvista**.
- tykätä + elatiivi → Tykkään **uimisesta**.
- puhua + elatiivi → Puhun **työstä**.

**Illatiivi (-Vn / -seen):**
- tutustua + illatiivi → Tutustun **kaupunkiin**.
- vastata + illatiivi → Vastaan **kysymykseen**.
- luottaa + illatiivi → Luotan **sinuun**.

**Allatiivi (-lle):**
- soittaa + allatiivi → Soitan **kaverille**.
- kertoa + allatiivi → Kerron **opettajalle**.`,
        theoryEn: `### Verb Rection — Which case does the verb require?

Each Finnish verb requires a specific grammatical case for its object or complement.

**Partitive (-a/-ä):** rakastaa, odottaa, pelätä
**Elative (-sta/-stä):** pitää, tykätä, puhua
**Illative (-Vn/-seen):** tutustua, vastata, luottaa
**Allative (-lle):** soittaa, kertoa`,
        grammar: [
          {
            title: "Partitiiviverbit",
            titleEn: "Partitive verbs",
            explanation: "Nämä verbit vaativat partitiivin: rakastaa, odottaa, pelätä, auttaa, etsiä.",
            explanationEn: "These verbs require the partitive case.",
            examples: [
              { finnish: "Rakastan Suomea.", english: "I love Finland." },
              { finnish: "Odotan ystävää.", english: "I'm waiting for a friend." },
              { finnish: "Autan sinua.", english: "I'm helping you." },
            ],
          },
          {
            title: "Elatiiviverbit",
            titleEn: "Elative verbs",
            explanation: "Nämä verbit vaativat elatiivin: pitää, tykätä, puhua, nauttia.",
            explanationEn: "These verbs require the elative case.",
            examples: [
              { finnish: "Pidän jäätelöstä.", english: "I like ice cream." },
              { finnish: "Puhun suomesta.", english: "I'm talking about Finnish." },
            ],
          },
        ],
        quiz: [
          { question: "'Pidän ___' (kahvi) — mikä sija?", options: ["kahvia", "kahvista", "kahviin", "kahville"], answer: 1, explanation: "pitää + elatiivi → kahvista" },
          { question: "'Odotan ___' (bussi)", options: ["bussista", "bussiin", "bussia", "bussille"], answer: 2, explanation: "odottaa + partitiivi → bussia" },
          { question: "'Soitan ___' (kaveri)", options: ["kaveria", "kaverista", "kaveriin", "kaverille"], answer: 3, explanation: "soittaa + allatiivi → kaverille" },
          { question: "'Tutustun ___' (kaupunki)", options: ["kaupunkia", "kaupungista", "kaupunkiin", "kaupungille"], answer: 2, explanation: "tutustua + illatiivi → kaupunkiin" },
        ],
      },
    ],
  },
  {
    id: "yki-word-order",
    title: "Sanajärjestys",
    titleEn: "Word Order",
    icon: "📏",
    color: "from-amber-500 to-orange-600",
    description: "Suomen kielen sanajärjestyksen perusteet",
    descriptionEn: "Basics of Finnish word order",
    pillar: "lessons",
    lessons: [
      {
        id: "word-order-basics",
        title: "Sanajärjestyksen perusteet",
        titleEn: "Word Order Basics",
        icon: "🔀",
        level: "A2",
        theory: `### Sanajärjestys suomessa

Suomen kielen perus sanajärjestys on **SVO** (Subjekti – Verbi – Objekti), mutta se on joustava.

**Peruslause:**
- **Minä luen kirjaa.** (I read a book.)
- **Koira juoksee puistossa.** (The dog runs in the park.)

**Kysymyslause:**
- **Luetko sinä kirjaa?** (Do you read a book?) — Verbi ensin!
- **Missä sinä asut?** (Where do you live?) — Kysymyssana ensin.

**Kielteinen lause:**
- **Minä en lue kirjaa.** (I don't read a book.)
- **Hän ei asu Helsingissä.** (He/she doesn't live in Helsinki.)

**Painotus (korostaminen):**
- **Kirjaa minä luen.** (It's a book that I read.) — Objekti ensin = painotus.
- **Helsingissä minä asun.** (It's in Helsinki that I live.)`,
        theoryEn: `### Finnish Word Order

Basic word order is **SVO** (Subject – Verb – Object), but flexible.

- Statements: Minä luen kirjaa. (SVO)
- Questions: Luetko sinä? (Verb first) / Missä asut? (Question word first)
- Negation: Minä en lue. (Subject + ei + verb stem)
- Emphasis: Move the emphasized word to the front.`,
        grammar: [
          {
            title: "Perusjärjestys SVO",
            titleEn: "Basic SVO order",
            explanation: "Normaali väitelause: Subjekti + Verbi + Objekti/Adverbiaali.",
            explanationEn: "Normal declarative sentence: Subject + Verb + Object.",
            examples: [
              { finnish: "Lapsi syö omenaa.", english: "The child eats an apple." },
              { finnish: "Me asumme Turussa.", english: "We live in Turku." },
              { finnish: "Opettaja opettaa suomea.", english: "The teacher teaches Finnish." },
            ],
          },
          {
            title: "Kysymyslauseet",
            titleEn: "Question sentences",
            explanation: "Kyllä/ei-kysymyksissä verbi tulee ensin. Kysymyssanakysymyksissä kysymyssana tulee ensin.",
            explanationEn: "Yes/no questions start with the verb. Wh-questions start with the question word.",
            examples: [
              { finnish: "Puhutko sinä suomea?", english: "Do you speak Finnish?" },
              { finnish: "Mitä sinä teet?", english: "What are you doing?" },
              { finnish: "Milloin kurssi alkaa?", english: "When does the course start?" },
            ],
          },
        ],
        quiz: [
          { question: "Mikä on suomen perus sanajärjestys?", options: ["SOV", "VSO", "SVO", "OVS"], answer: 2, explanation: "Suomen perus sanajärjestys on SVO." },
          { question: "Miten muodostetaan kyllä/ei-kysymys?", options: ["Subjekti ensin", "Verbi ensin", "Objekti ensin", "Adverbi ensin"], answer: 1, explanation: "Kyllä/ei-kysymyksissä verbi tulee ensin: Puhutko suomea?" },
          { question: "Mikä on oikein: 'Missä ___ asut?'", options: ["sinä", "asutko", "asut sinä", "sinä asut"], answer: 0, explanation: "Missä sinä asut? — kysymyssana + subjekti + verbi" },
          { question: "'Minä en ___ suomea.' (puhua)", options: ["puhun", "puhu", "puhui", "puhua"], answer: 1, explanation: "Kielteisessä: en + verbin vartalo: en puhu" },
        ],
      },
    ],
  },
  {
    id: "yki-reading-exercises",
    title: "Lukuharjoitukset",
    titleEn: "Reading Exercises",
    icon: "📖",
    color: "from-blue-500 to-cyan-600",
    description: "A2-tason luetunymmärtämisharjoituksia",
    descriptionEn: "A2-level reading comprehension exercises",
    pillar: "lessons",
    lessons: [
      {
        id: "reading-exercise-1",
        title: "Kirjastoilmoitus",
        titleEn: "Library Notice",
        icon: "📚",
        level: "A2",
        theory: `### Lue teksti ja vastaa kysymyksiin.

**Kirjaston tiedote**

Hyvät asiakkaat! Kirjastomme on suljettu remontin vuoksi 15.–30.6. Remontin aikana palautetut kirjat voi jättää ulko-ovella olevaan palautuslaatikkoon. Varauksia voi tehdä verkkokirjastossa osoitteessa kirjasto.fi. Kirjasto avautuu jälleen 1.7. uusilla aukioloajoilla: ma–pe 9–19, la 10–16. Tervetuloa!

**Sanasto:**
- suljettu = closed
- remontti = renovation
- palautuslaatikko = return box
- varaus = reservation
- aukioloajat = opening hours`,
        theoryEn: `Read the library notice and answer the questions.`,
        quiz: [
          { question: "Miksi kirjasto on suljettu?", options: ["Kesäloma", "Remontti", "Henkilökunnan puute", "Tulipalo"], answer: 1, explanation: "Kirjasto on suljettu remontin vuoksi." },
          { question: "Minne kirjat voi palauttaa remontin aikana?", options: ["Naapurikirjastoon", "Sähköpostilla", "Palautuslaatikkoon", "Ei minnekään"], answer: 2, explanation: "Ulko-ovella olevaan palautuslaatikkoon." },
          { question: "Milloin kirjasto avautuu?", options: ["15.6.", "30.6.", "1.7.", "1.8."], answer: 2, explanation: "Kirjasto avautuu jälleen 1.7." },
          { question: "Mihin aikaan kirjasto sulkeutuu arkisin?", options: ["17:00", "18:00", "19:00", "20:00"], answer: 2, explanation: "Ma–pe 9–19, eli sulkeutuu klo 19." },
        ],
      },
      {
        id: "reading-exercise-2",
        title: "Sähköpostiviesti",
        titleEn: "Email Message",
        icon: "📧",
        level: "A2",
        theory: `### Lue sähköposti ja vastaa kysymyksiin.

**Aihe:** Tervetuloa suomen kielen kurssille!

Hei!

Tervetuloa suomen kielen kurssille! Kurssi alkaa maanantaina 5.9. klo 17.00. Paikka on Kansalaisopisto, luokka 204. Kurssi kestää 10 viikkoa ja se on joka maanantai ja keskiviikko klo 17–19.

Tarvitset muistikirjan ja kynän. Oppikirjan saat ensimmäisellä tunnilla. Kurssi maksaa 50 euroa.

Jos sinulla on kysymyksiä, ota yhteyttä: opettaja@kansalaisopisto.fi

Ystävällisin terveisin,
Maria Korhonen
Suomen kielen opettaja`,
        theoryEn: `Read the email and answer the questions.`,
        quiz: [
          { question: "Milloin kurssi alkaa?", options: ["1.9.", "5.9.", "10.9.", "15.9."], answer: 1, explanation: "Kurssi alkaa maanantaina 5.9." },
          { question: "Kuinka pitkä kurssi on?", options: ["5 viikkoa", "8 viikkoa", "10 viikkoa", "12 viikkoa"], answer: 2, explanation: "Kurssi kestää 10 viikkoa." },
          { question: "Paljonko kurssi maksaa?", options: ["30 €", "40 €", "50 €", "60 €"], answer: 2, explanation: "Kurssi maksaa 50 euroa." },
          { question: "Mitä tarvitset mukaan?", options: ["Tietokone", "Muistikirja ja kynä", "Oppikirja", "Sanakirja"], answer: 1, explanation: "Tarvitset muistikirjan ja kynän." },
        ],
      },
    ],
  },
  {
    id: "yki-listening-exercises",
    title: "Kuunteluharjoitukset",
    titleEn: "Listening Exercises",
    icon: "🎧",
    color: "from-purple-500 to-indigo-600",
    description: "A2-tason kuullunymmärtämisharjoituksia",
    descriptionEn: "A2-level listening comprehension exercises",
    pillar: "lessons",
    lessons: [
      {
        id: "listening-exercise-1",
        title: "Säätiedotus",
        titleEn: "Weather Report",
        icon: "🌤️",
        level: "A2",
        theory: `### Kuuntele säätiedotus ja vastaa kysymyksiin.

"Huomenta! Tässä on tämän päivän sää. Etelä-Suomessa on aurinkoista ja lämpötila on 18 astetta. Keski-Suomessa sataa ajoittain ja lämpötila on 14 astetta. Pohjois-Suomessa on pilvistä ja tuulista, lämpötila on 10 astetta. Huomenna on koko maassa aurinkoisempaa."

**Sanasto:**
- säätiedotus = weather report
- aurinkoista = sunny
- sataa = it rains
- pilvistä = cloudy
- tuulista = windy
- astetta = degrees`,
        theoryEn: `Listen to the weather report and answer the questions.`,
        quiz: [
          { question: "Millainen sää on Etelä-Suomessa?", options: ["Pilvistä", "Aurinkoista", "Sateista", "Myrskyistä"], answer: 1, explanation: "Etelä-Suomessa on aurinkoista." },
          { question: "Paljonko on lämpötila Keski-Suomessa?", options: ["10 astetta", "14 astetta", "18 astetta", "20 astetta"], answer: 1, explanation: "Keski-Suomessa lämpötila on 14 astetta." },
          { question: "Millainen sää on Pohjois-Suomessa?", options: ["Aurinkoista", "Sateista", "Pilvistä ja tuulista", "Lumista"], answer: 2, explanation: "Pohjois-Suomessa on pilvistä ja tuulista." },
          { question: "Millainen sää on huomenna?", options: ["Sateista", "Aurinkoisempaa", "Myrskyisää", "Lumista"], answer: 1, explanation: "Huomenna on aurinkoisempaa." },
        ],
      },
      {
        id: "listening-exercise-2",
        title: "Lääkärin vastaanotolla",
        titleEn: "At the Doctor's Office",
        icon: "🏥",
        level: "A2",
        theory: `### Kuuntele dialogi ja vastaa kysymyksiin.

— Hyvää päivää. Mikä vaivaa?
— Päivää. Minulla on kova päänsärky ja kuumetta.
— Kuinka kauan oireet ovat kestäneet?
— Kolme päivää.
— Onko sinulla yskää tai nuhaa?
— Kyllä, yskää on vähän.
— Selvä. Kirjoitan sinulle reseptin. Ota lääkettä kaksi kertaa päivässä. Ja lepää hyvin.
— Kiitos, lääkäri.
— Ole hyvä. Jos kuume ei laske viikossa, tule uudelleen.

**Sanasto:**
- vaivaa = ails / is wrong
- päänsärky = headache
- oireet = symptoms
- resepti = prescription
- lepää = rest`,
        theoryEn: `Listen to the doctor's office dialogue and answer the questions.`,
        quiz: [
          { question: "Mikä potilaalla on?", options: ["Vatsakipu", "Päänsärky ja kuume", "Jalka kipeä", "Korvasärky"], answer: 1, explanation: "Potilaalla on kova päänsärky ja kuumetta." },
          { question: "Kuinka kauan oireet ovat kestäneet?", options: ["1 päivä", "2 päivää", "3 päivää", "1 viikko"], answer: 2, explanation: "Oireet ovat kestäneet kolme päivää." },
          { question: "Kuinka usein lääkettä pitää ottaa?", options: ["Kerran päivässä", "Kaksi kertaa päivässä", "Kolme kertaa päivässä", "Neljä kertaa päivässä"], answer: 1, explanation: "Ota lääkettä kaksi kertaa päivässä." },
          { question: "Milloin pitää tulla uudelleen?", options: ["Huomenna", "3 päivän päästä", "Jos kuume ei laske viikossa", "Ensi kuussa"], answer: 2, explanation: "Jos kuume ei laske viikossa, tule uudelleen." },
        ],
      },
    ],
  },
];
