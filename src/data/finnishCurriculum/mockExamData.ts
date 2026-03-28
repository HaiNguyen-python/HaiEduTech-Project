// YKI A2 Mock Exam Data — Reading, Listening, Writing, Speaking
import type { FinnishModule } from "./types";

export const finnishMockExamModules: FinnishModule[] = [
  {
    id: "yki-mock-reading",
    title: "Tekstin ymmärtäminen",
    titleEn: "Reading Comprehension",
    icon: "📖",
    color: "from-blue-500 to-indigo-600",
    description: "YKI-style reading passages with multiple-choice and true/false questions.",
    descriptionEn: "YKI-style reading passages with multiple-choice and true/false questions.",
    pillar: "mock-exams",
    lessons: [
      {
        id: "yki-mock-reading-1",
        title: "Asunnon vuokrailmoitus",
        titleEn: "Apartment Rental Ad",
        icon: "🏠",
        level: "A2",
        theory: `### Reading Passage 1

**Vuokrataan: 2h + k, Helsinki, Kallio**

Vuokrataan valoisa kaksio Kallion keskustassa. Asunto on toisessa kerroksessa. Keittiössä on liesi, jääkaappi ja astianpesukone. Kylpyhuoneessa on suihku ja pesukone. Asunnossa on laminaattilattiat.

Vuokra: 850 €/kk + sähkö. Vesimaksu sisältyy vuokraan. Vapautuu 1.3.

Yhteystiedot: Matti Virtanen, puh. 040-1234567, matti@email.fi`,
        theoryEn: `### Reading Passage 1

**For rent: 2-room apartment + kitchen, Helsinki, Kallio**

A bright two-room apartment for rent in the center of Kallio. The apartment is on the second floor. The kitchen has a stove, fridge, and dishwasher. The bathroom has a shower and washing machine. The apartment has laminate floors.

Rent: €850/month + electricity. Water is included in the rent. Available from March 1st.

Contact: Matti Virtanen, tel. 040-1234567, matti@email.fi`,
        quiz: [
          { question: "Where is the apartment located?", options: ["Espoo", "Kallio, Helsinki", "Tampere", "Turku"], answer: 1, explanation: "The ad states the apartment is in 'Kallion keskustassa' (center of Kallio, Helsinki)." },
          { question: "What is included in the rent?", options: ["Electricity", "Water", "Internet", "Parking"], answer: 1, explanation: "'Vesimaksu sisältyy vuokraan' = Water is included in the rent." },
          { question: "When is the apartment available?", options: ["January 1", "February 1", "March 1", "April 1"], answer: 2, explanation: "'Vapautuu 1.3.' = Available from March 1st." },
          { question: "True or False: The apartment has a bathtub.", options: ["True", "False"], answer: 1, explanation: "The text says 'suihku' (shower), not 'kylpyamme' (bathtub)." },
        ],
      },
      {
        id: "yki-mock-reading-2",
        title: "Kirjaston tiedote",
        titleEn: "Library Notice",
        icon: "📚",
        level: "A2",
        theory: `### Reading Passage 2

**Helsingin kaupunginkirjasto — Tiedote**

Hyvät asiakkaat!

Kirjasto on suljettu maanantaina 15.3. remontin vuoksi. Tiistaina 16.3. olemme avoinna normaalisti klo 9–20.

Muistakaa, että lainoja voi uusia verkossa osoitteessa helmet.fi. Myöhästymismaksu on 0,20 €/päivä/kirja.

Uutta: Nyt voit lainata myös e-kirjoja ja äänikirjoja! Kysy lisää infotiskiltä.

Tervetuloa kirjastoon!`,
        theoryEn: `### Reading Passage 2

**Helsinki City Library — Notice**

Dear customers!

The library is closed on Monday, March 15th, due to renovation. On Tuesday, March 16th, we are open normally at 9 AM – 8 PM.

Remember that loans can be renewed online at helmet.fi. The late fee is €0.20/day/book.

New: You can now borrow e-books and audiobooks! Ask for more info at the information desk.

Welcome to the library!`,
        quiz: [
          { question: "Why is the library closed on Monday?", options: ["Holiday", "Staff meeting", "Renovation", "Weather"], answer: 2, explanation: "'remontin vuoksi' = due to renovation." },
          { question: "What is the late fee per day per book?", options: ["€0.10", "€0.20", "€0.50", "€1.00"], answer: 1, explanation: "'Myöhästymismaksu on 0,20 €/päivä/kirja.'" },
          { question: "What new service does the library offer?", options: ["Free coffee", "E-books and audiobooks", "Free printing", "Movie nights"], answer: 1, explanation: "'Nyt voit lainata myös e-kirjoja ja äänikirjoja!'" },
        ],
      },
    ],
  },
  {
    id: "yki-mock-writing",
    title: "Kirjoittaminen",
    titleEn: "Writing",
    icon: "✍️",
    color: "from-emerald-500 to-green-600",
    description: "Practice YKI writing tasks: informal emails, complaint letters, and everyday messages.",
    descriptionEn: "Practice YKI writing tasks: informal emails, complaint letters, and everyday messages.",
    pillar: "mock-exams",
    lessons: [
      {
        id: "yki-mock-writing-1",
        title: "Epävirallinen sähköposti",
        titleEn: "Informal Email",
        icon: "📧",
        level: "A2",
        theory: `### Writing Task 1: Informal Email

**Task**: Write an email to your Finnish friend Liisa. Tell her:
- You moved to a new apartment last week
- Describe your new apartment (rooms, location)
- Invite her to visit you next weekend
- Ask if she wants coffee or tea

**Useful phrases:**
- Hei Liisa! / Moikka! (Hi Liisa!)
- Muutin uuteen asuntoon... (I moved to a new apartment...)
- Haluaisitko tulla käymään? (Would you like to come visit?)
- Terveisin / Nähdään! (Regards / See you!)

**Time limit**: 20 minutes
**Word count**: 50–80 words`,
        theoryEn: `### Writing Task 1: Informal Email

**Task**: Write an email to your Finnish friend Liisa. Tell her:
- You moved to a new apartment last week
- Describe your new apartment (rooms, location)
- Invite her to visit you next weekend
- Ask if she wants coffee or tea

**Useful phrases:**
- Hei Liisa! / Moikka! (Hi Liisa!)
- Muutin uuteen asuntoon... (I moved to a new apartment...)
- Haluaisitko tulla käymään? (Would you like to come visit?)
- Terveisin / Nähdään! (Regards / See you!)

**Time limit**: 20 minutes | **Word count**: 50–80 words`,
        quiz: [
          { question: "What is a good way to start an informal email in Finnish?", options: ["Arvoisa vastaanottaja", "Hei [nimi]!", "Herra/Rouva", "Kunnioittaen"], answer: 1, explanation: "'Hei [nimi]!' or 'Moikka!' are informal greetings." },
        ],
      },
    ],
  },
  {
    id: "yki-mock-speaking",
    title: "Puhuminen",
    titleEn: "Speaking",
    icon: "🎤",
    color: "from-rose-500 to-red-600",
    description: "Simulated YKI speaking prompts with timed recording practice.",
    descriptionEn: "Simulated YKI speaking prompts with timed recording practice.",
    pillar: "mock-exams",
    lessons: [
      {
        id: "yki-mock-speaking-1",
        title: "Arkielämän tilanteet",
        titleEn: "Everyday Situations",
        icon: "💬",
        level: "A2",
        theory: `### Speaking Test Simulation

**Instructions**: You have **30–40 seconds** to respond to each prompt. Record your answer.

**Prompt 1**: You are calling your child's school. Tell the teacher:
- Your child is sick today
- He/she has a fever
- Ask when the homework can be picked up

**Prompt 2**: You are at the bank. Tell the clerk:
- You want to open a new bank account
- Ask what documents you need
- Ask about online banking

**Prompt 3**: You meet your neighbor. Talk about:
- The weather today
- Your plans for the weekend
- Ask about their family`,
        theoryEn: `### Speaking Test Simulation

**Instructions**: You have **30–40 seconds** to respond to each prompt. Record your answer.

**Prompt 1**: Calling your child's school (explain absence)
**Prompt 2**: At the bank (opening an account)
**Prompt 3**: Small talk with your neighbor`,
        quiz: [
          { question: "How much time do you typically get per speaking prompt in the YKI test?", options: ["10 seconds", "30-40 seconds", "2 minutes", "5 minutes"], answer: 1, explanation: "YKI speaking prompts typically give 30-40 seconds to respond." },
        ],
      },
    ],
  },
  {
    id: "yki-mock-listening",
    title: "Kuullun ymmärtäminen",
    titleEn: "Listening Comprehension",
    icon: "🎧",
    color: "from-purple-500 to-violet-600",
    description: "Practice with everyday Finnish dialogues and announcements.",
    descriptionEn: "Practice with everyday Finnish dialogues and announcements.",
    pillar: "mock-exams",
    lessons: [
      {
        id: "yki-mock-listening-1",
        title: "Arkipäivän kuulutukset",
        titleEn: "Everyday Announcements",
        icon: "📢",
        level: "A2",
        theory: `### Listening Practice

**Dialogue Transcript** (In the real test, you would hear this):

> "Huomio, huomio! Juna numero 57 Helsingistä Tampereelle lähtee raiteelta 4 kello 14:30. Pysähdykset: Pasila, Riihimäki ja Hämeenlinna. Seuraava juna Tampereelle lähtee kello 15:30."

**Questions to practice:**

1. Where is the train going?
2. What platform does it leave from?
3. What time does it depart?
4. Name two stops along the way.`,
        theoryEn: `### Listening Practice

**Dialogue Transcript** (In the real test, you would hear this):

> "Attention! Train number 57 from Helsinki to Tampere departs from platform 4 at 14:30. Stops: Pasila, Riihimäki, and Hämeenlinna. The next train to Tampere departs at 15:30."`,
        quiz: [
          { question: "Where is the train going?", options: ["Helsinki", "Turku", "Tampere", "Oulu"], answer: 2, explanation: "The announcement says 'Helsingistä Tampereelle' (from Helsinki to Tampere)." },
          { question: "What platform does it leave from?", options: ["Platform 2", "Platform 3", "Platform 4", "Platform 5"], answer: 2, explanation: "'raiteelta 4' = from platform 4." },
          { question: "What time does the train depart?", options: ["14:00", "14:30", "15:00", "15:30"], answer: 1, explanation: "'kello 14:30' = at 14:30." },
        ],
      },
    ],
  },
];
