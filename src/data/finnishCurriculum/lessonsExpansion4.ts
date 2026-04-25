import type { FinnishModule } from "./types";

export const finnishLessonExpansion4Modules: FinnishModule[] = [
  {
    id: "yki-int-work",
    title: "Työelämä - Workplace Finnish",
    titleEn: "Workplace Finnish",
    icon: "💼",
    color: "from-blue-600 to-blue-800",
    description: "Suomen kieli työpaikalla",
    descriptionEn: "Finnish language at the workplace",
    pillar: "lessons",
    lessons: [
      {
        id: "yki-int-work-1",
        title: "Työnhaku",
        titleEn: "Job Searching",
        icon: "🔍",
        level: "A2",
        theory: `# Työnhaku (Job Searching)

## Hyödyllisiä sanoja
- **työpaikkailmoitus** - job advertisement
- **ansioluettelo / CV** - curriculum vitae
- **työhakemus** - job application
- **työhaastattelu** - job interview
- **palkka** - salary
- **työsopimus** - employment contract

## Fraaseja
- "Haen töitä..." - I'm looking for a job...
- "Minulla on kokemusta..." - I have experience in...
- "Olen kiinnostunut tästä työpaikasta." - I'm interested in this position.`,
        theoryEn: `# Job Searching in Finnish
Key vocabulary: työpaikkailmoitus (job ad), ansioluettelo (CV), työhakemus (application), työhaastattelu (interview), palkka (salary), työsopimus (contract).`,
        vocabulary: [
          { word: "työpaikkailmoitus", partOfSpeech: "noun", meaningEn: "job advertisement", meaningVi: "tin tuyển dụng", example: "Luin työpaikkailmoituksen.", exampleEn: "I read the job advertisement.", category: "work" },
          { word: "ansioluettelo", partOfSpeech: "noun", meaningEn: "CV / resume", meaningVi: "sơ yếu lý lịch", example: "Lähetä ansioluettelo sähköpostilla.", exampleEn: "Send your CV by email.", category: "work" },
          { word: "palkka", partOfSpeech: "noun", meaningEn: "salary", meaningVi: "lương", example: "Palkka on 2500 euroa kuussa.", exampleEn: "The salary is 2500 euros per month.", category: "work" },
          { word: "työsopimus", partOfSpeech: "noun", meaningEn: "employment contract", meaningVi: "hợp đồng lao động", example: "Allekirjoitin työsopimuksen.", exampleEn: "I signed the employment contract.", category: "work" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Täytä oikea sana.",
            instructionEn: "Fill in the correct word.",
            items: [
              { question: "Luin ___ netissä. (tin tuyển dụng)", answer: "työpaikkailmoituksen", hint: "job ad" },
              { question: "Lähetin ___ sähköpostilla. (CV)", answer: "ansioluettelon", hint: "CV/resume" },
              { question: "Minulla on ___ huomenna. (phỏng vấn)", answer: "työhaastattelu", hint: "interview" },
            ],
          },
        ],
        quiz: [
          { question: "What is 'ansioluettelo' in English?", options: ["Job interview", "CV / Resume", "Work contract", "Salary"], answer: 1, explanation: "Ansioluettelo is the Finnish word for CV or resume." },
          { question: "'Haen töitä' means:", options: ["I quit my job", "I'm looking for a job", "I got a job", "I like my job"], answer: 1, explanation: "'Haen töitä' means 'I'm looking for a job' / 'I'm applying for jobs'." },
        ],
      },
      {
        id: "yki-int-work-2",
        title: "Työpaikalla",
        titleEn: "At the Workplace",
        icon: "🏢",
        level: "A2",
        theory: `# Työpaikalla (At the Workplace)

## Arkipäiväisiä fraaseja
- "Hyvää huomenta!" - Good morning!
- "Voisitko auttaa minua?" - Could you help me?
- "Milloin on tauko?" - When is the break?
- "Minulla on kokous kello 10." - I have a meeting at 10.
- "Voisinko puhua esihenkilön kanssa?" - Could I speak with the supervisor?

## Työpaikan sanastoa
- **kokous** - meeting
- **tauko** - break
- **esihenkilö** - supervisor
- **työvuoro** - shift
- **ylityö** - overtime`,
        theoryEn: `# At the Workplace
Common phrases for daily work interactions and key vocabulary like kokous (meeting), tauko (break), esihenkilö (supervisor).`,
        vocabulary: [
          { word: "kokous", partOfSpeech: "noun", meaningEn: "meeting", meaningVi: "cuộc họp", example: "Kokous alkaa kello 9.", exampleEn: "The meeting starts at 9.", category: "work" },
          { word: "tauko", partOfSpeech: "noun", meaningEn: "break", meaningVi: "giờ nghỉ", example: "Kahvitauko on kello 10.", exampleEn: "Coffee break is at 10.", category: "work" },
          { word: "esihenkilö", partOfSpeech: "noun", meaningEn: "supervisor", meaningVi: "cấp trên", example: "Puhuin esihenkilön kanssa.", exampleEn: "I spoke with the supervisor.", category: "work" },
          { word: "työvuoro", partOfSpeech: "noun", meaningEn: "work shift", meaningVi: "ca làm việc", example: "Työvuoroni alkaa kello 7.", exampleEn: "My shift starts at 7.", category: "work" },
        ],
        exercises: [
          {
            type: "multiple-choice",
            instruction: "Valitse oikea vastaus.",
            instructionEn: "Choose the correct answer.",
            items: [
              { question: "'Voisitko auttaa minua?' means:", options: ["Could you help me?", "What time is it?", "Where is the office?", "I need a break"], answer: "Could you help me?" },
              { question: "Kokous means:", options: ["Coffee", "Meeting", "Break", "Salary"], answer: "Meeting" },
            ],
          },
        ],
        quiz: [
          { question: "'Työvuoro' means:", options: ["Day off", "Work shift", "Overtime", "Vacation"], answer: 1, explanation: "Työvuoro means 'work shift'." },
          { question: "'Voisinko puhua esihenkilön kanssa?' is asking to:", options: ["Take a break", "Leave early", "Speak with the supervisor", "Get overtime pay"], answer: 2, explanation: "It means 'Could I speak with the supervisor?'" },
        ],
      },
    ],
  },
  {
    id: "yki-int-health",
    title: "Terveys - Health",
    titleEn: "Health & Doctor Visits",
    icon: "🏥",
    color: "from-green-500 to-green-700",
    description: "Terveydenhuolto ja lääkärissä käynti",
    descriptionEn: "Healthcare and visiting the doctor",
    pillar: "lessons",
    lessons: [
      {
        id: "yki-int-health-1",
        title: "Lääkärissä",
        titleEn: "At the Doctor",
        icon: "👨‍⚕️",
        level: "A2",
        theory: `# Lääkärissä (At the Doctor)

## Oireita (Symptoms)
- Minulla on **kuumetta**. - I have a fever.
- Minua **särkee** päätä. - I have a headache.
- **Vatsaani** koskee. - My stomach hurts.
- Minulla on **yskää**. - I have a cough.
- Minulla on **nuhaa**. - I have a runny nose.
- Olen **allerginen** pölylle. - I'm allergic to dust.

## Lääkärille puhuminen
- "Minulle tuli huono olo eilen." - I started feeling bad yesterday.
- "Voitteko kirjoittaa reseptin?" - Can you write a prescription?
- "Pitääkö minun ottaa lääkettä?" - Do I need to take medicine?`,
        theoryEn: `# At the Doctor
Symptoms: kuume (fever), päänsärky (headache), yskä (cough), nuha (runny nose).
Key phrases for describing symptoms and asking questions.`,
        vocabulary: [
          { word: "kuume", partOfSpeech: "noun", meaningEn: "fever", meaningVi: "sốt", example: "Minulla on korkea kuume.", exampleEn: "I have a high fever.", category: "health" },
          { word: "yskä", partOfSpeech: "noun", meaningEn: "cough", meaningVi: "ho", example: "Minulla on pahaa yskää.", exampleEn: "I have a bad cough.", category: "health" },
          { word: "resepti", partOfSpeech: "noun", meaningEn: "prescription", meaningVi: "đơn thuốc", example: "Lääkäri kirjoitti reseptin.", exampleEn: "The doctor wrote a prescription.", category: "health" },
          { word: "lääke", partOfSpeech: "noun", meaningEn: "medicine", meaningVi: "thuốc", example: "Otan lääkettä kolme kertaa päivässä.", exampleEn: "I take medicine three times a day.", category: "health" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Täytä oikea sana.",
            instructionEn: "Fill in the correct word.",
            items: [
              { question: "Minulla on ___. (sốt)", answer: "kuumetta", hint: "fever" },
              { question: "Lääkäri kirjoitti ___. (đơn thuốc)", answer: "reseptin", hint: "prescription" },
              { question: "Otan ___ kaksi kertaa päivässä. (thuốc)", answer: "lääkettä", hint: "medicine" },
            ],
          },
        ],
        quiz: [
          { question: "'Minua särkee päätä' means:", options: ["I have a stomachache", "I have a headache", "I'm tired", "I'm hungry"], answer: 1, explanation: "'Särkee päätä' means to have a headache." },
          { question: "'Resepti' is:", options: ["A recipe for food", "A medical prescription", "A receipt", "A restaurant menu"], answer: 1, explanation: "In medical context, resepti means prescription." },
        ],
      },
      {
        id: "yki-int-health-2",
        title: "Apteekissa",
        titleEn: "At the Pharmacy",
        icon: "💊",
        level: "A2",
        theory: `# Apteekissa (At the Pharmacy)

## Hyödyllisiä fraaseja
- "Minulla on resepti." - I have a prescription.
- "Tarvitsen särkylääkettä." - I need painkillers.
- "Onko tätä lääkettä ilman reseptiä?" - Is this medicine available without prescription?
- "Kuinka usein pitää ottaa tätä?" - How often should I take this?

## Lääkkeitä
- **särkylääke** - painkiller
- **kuumelääke** - fever medicine
- **antibiootti** - antibiotic
- **voide** - ointment/cream
- **laastari** - band-aid`,
        theoryEn: `# At the Pharmacy
Phrases for buying medicine, asking about dosage, and common medicine types.`,
        vocabulary: [
          { word: "särkylääke", partOfSpeech: "noun", meaningEn: "painkiller", meaningVi: "thuốc giảm đau", example: "Tarvitsen särkylääkettä.", exampleEn: "I need a painkiller.", category: "health" },
          { word: "voide", partOfSpeech: "noun", meaningEn: "ointment/cream", meaningVi: "thuốc mỡ", example: "Käytä voidetta kaksi kertaa päivässä.", exampleEn: "Use the ointment twice a day.", category: "health" },
          { word: "laastari", partOfSpeech: "noun", meaningEn: "band-aid", meaningVi: "băng dán", example: "Tarvitsen laastarin.", exampleEn: "I need a band-aid.", category: "health" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Valitse oikea lääke.",
            instructionEn: "Choose the correct medicine.",
            items: [
              { question: "Minulla on päänsärky. Tarvitsen ___. (thuốc giảm đau)", answer: "särkylääkettä", hint: "painkiller" },
              { question: "Sormeeni tuli haava. Tarvitsen ___. (băng dán)", answer: "laastarin", hint: "band-aid" },
            ],
          },
        ],
        quiz: [
          { question: "'Särkylääke' is:", options: ["Antibiotic", "Painkiller", "Vitamin", "Cough syrup"], answer: 1, explanation: "Särkylääke means painkiller (särky = pain, lääke = medicine)." },
          { question: "'Ilman reseptiä' means:", options: ["With a prescription", "Without a prescription", "Expensive medicine", "Natural medicine"], answer: 1, explanation: "'Ilman' means 'without', so 'ilman reseptiä' = without prescription." },
        ],
      },
    ],
  },
  {
    id: "yki-int-housing",
    title: "Asuminen - Housing",
    titleEn: "Housing & Rental",
    icon: "🏠",
    color: "from-yellow-500 to-yellow-700",
    description: "Asunnon vuokraus ja asuminen Suomessa",
    descriptionEn: "Renting and living in Finland",
    pillar: "lessons",
    lessons: [
      {
        id: "yki-int-housing-1",
        title: "Asunnon etsiminen",
        titleEn: "Finding an Apartment",
        icon: "🔑",
        level: "A2",
        theory: `# Asunnon etsiminen (Finding an Apartment)

## Asuntoilmoituksen sanastoa
- **vuokra-asunto** - rental apartment
- **yksiö** - studio / one-room apartment
- **kaksio** - two-room apartment
- **kolmio** - three-room apartment
- **vuokra** - rent
- **takuuvuokra** - security deposit
- **sähkö** - electricity
- **vesi** - water

## Fraaseja
- "Etsin vuokra-asuntoa." - I'm looking for a rental apartment.
- "Paljonko vuokra on?" - How much is the rent?
- "Sisältyykö vesi vuokraan?" - Is water included in the rent?
- "Milloin voin muuttaa sisään?" - When can I move in?`,
        theoryEn: `# Finding an Apartment
Apartment types: yksiö (studio), kaksio (2-room), kolmio (3-room).
Key phrases for inquiring about rentals.`,
        vocabulary: [
          { word: "vuokra-asunto", partOfSpeech: "noun", meaningEn: "rental apartment", meaningVi: "căn hộ cho thuê", example: "Etsin vuokra-asuntoa Helsingistä.", exampleEn: "I'm looking for a rental in Helsinki.", category: "housing" },
          { word: "yksiö", partOfSpeech: "noun", meaningEn: "studio apartment", meaningVi: "căn hộ 1 phòng", example: "Yksiö on sopiva yhdelle.", exampleEn: "A studio is suitable for one person.", category: "housing" },
          { word: "vuokra", partOfSpeech: "noun", meaningEn: "rent", meaningVi: "tiền thuê", example: "Vuokra on 600 euroa kuussa.", exampleEn: "The rent is 600 euros per month.", category: "housing" },
          { word: "takuuvuokra", partOfSpeech: "noun", meaningEn: "security deposit", meaningVi: "tiền đặt cọc", example: "Takuuvuokra on kahden kuukauden vuokra.", exampleEn: "The deposit is two months' rent.", category: "housing" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Täytä oikea sana.",
            instructionEn: "Fill in the correct word.",
            items: [
              { question: "Etsin ___. (căn hộ cho thuê)", answer: "vuokra-asuntoa", hint: "rental apartment" },
              { question: "Paljonko ___ on? (tiền thuê)", answer: "vuokra", hint: "rent" },
              { question: "___ on kahden kuukauden vuokra. (tiền cọc)", answer: "Takuuvuokra", hint: "security deposit" },
            ],
          },
        ],
        quiz: [
          { question: "A 'kaksio' is:", options: ["A house", "A two-room apartment", "A studio", "A three-room apartment"], answer: 1, explanation: "Kaksio = kaksi (two) + -io, meaning a two-room apartment." },
          { question: "'Sisältyykö vesi vuokraan?' asks:", options: ["Is there hot water?", "Is water included in rent?", "How much water do you use?", "Can I drink the water?"], answer: 1, explanation: "Sisältyy = is included; it asks if water is included in the rent." },
        ],
      },
      {
        id: "yki-int-housing-2",
        title: "Asuminen ja naapurit",
        titleEn: "Living & Neighbors",
        icon: "🏘️",
        level: "A2",
        theory: `# Asuminen ja naapurit (Living & Neighbors)

## Taloyhtiön säännöt (House rules)
- **Hiljaisuusaika**: klo 22–07 (Quiet hours: 10 PM – 7 AM)
- **Pyykkitupa**: varataan etukäteen (Laundry room: book in advance)
- **Sauna**: taloyhtiön saunavuorot (Building sauna schedule)
- **Jätteiden lajittelu**: bio, paperi, muovi, metalli, sekajäte (Waste sorting)

## Naapureiden kanssa
- "Hei, olen uusi naapuri." - Hi, I'm a new neighbor.
- "Anteeksi häiriöstä." - Sorry for the disturbance.
- "Voisitko olla hiljempaa?" - Could you be quieter?

## Vikailmoitus
- "Hana vuotaa." - The faucet is leaking.
- "Lämmitys ei toimi." - The heating isn't working.`,
        theoryEn: `# Living & Neighbors
House rules: quiet hours, laundry room booking, sauna schedule, waste sorting.
Phrases for interacting with neighbors and reporting maintenance issues.`,
        vocabulary: [
          { word: "hiljaisuusaika", partOfSpeech: "noun", meaningEn: "quiet hours", meaningVi: "giờ yên tĩnh", example: "Hiljaisuusaika alkaa kello 22.", exampleEn: "Quiet hours start at 10 PM.", category: "housing" },
          { word: "pyykkitupa", partOfSpeech: "noun", meaningEn: "laundry room", meaningVi: "phòng giặt", example: "Varasin pyykkituvan huomiseksi.", exampleEn: "I booked the laundry room for tomorrow.", category: "housing" },
          { word: "jätteiden lajittelu", partOfSpeech: "noun phrase", meaningEn: "waste sorting", meaningVi: "phân loại rác", example: "Jätteiden lajittelu on tärkeää.", exampleEn: "Waste sorting is important.", category: "housing" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Täytä oikea sana.",
            instructionEn: "Fill in the correct word.",
            items: [
              { question: "___ alkaa kello 22. (giờ yên tĩnh)", answer: "Hiljaisuusaika", hint: "quiet hours" },
              { question: "Varasin ___ huomiseksi. (phòng giặt)", answer: "pyykkituvan", hint: "laundry room" },
            ],
          },
        ],
        quiz: [
          { question: "In Finnish apartments, 'hiljaisuusaika' is typically:", options: ["6 AM – 8 PM", "10 PM – 7 AM", "All day Sunday", "No specific time"], answer: 1, explanation: "Quiet hours (hiljaisuusaika) are typically from 10 PM to 7 AM." },
          { question: "'Jätteiden lajittelu' refers to:", options: ["Waste sorting/recycling", "Cleaning the apartment", "Paying bills", "Moving out"], answer: 0, explanation: "Jätteiden lajittelu means waste sorting - an important part of Finnish daily life." },
        ],
      },
    ],
  },
  {
    id: "yki-adv-topics",
    title: "Edistynyt - Advanced Finnish",
    titleEn: "Advanced Finnish Topics",
    icon: "🎓",
    color: "from-purple-600 to-purple-800",
    description: "YKI keskitaso: uutiset, viralliset kirjeet, kulttuuri",
    descriptionEn: "YKI intermediate: news, formal letters, culture",
    pillar: "lessons",
    lessons: [
      {
        id: "yki-adv-news",
        title: "Uutisten ymmärtäminen",
        titleEn: "Understanding News",
        icon: "📰",
        level: "A2",
        theory: `# Uutisten ymmärtäminen (Understanding Finnish News)

## Uutisten rakenne
1. **Otsikko** - Headline (short, present tense)
2. **Ingressi** - Lead paragraph (key facts)
3. **Leipäteksti** - Body text (details)

## Yleisiä uutissanoja
- **hallitus** - government
- **eduskunta** - parliament
- **talous** - economy
- **työllisyys** - employment
- **ilmastonmuutos** - climate change
- **tutkimus** - research/study

## Lukuvinkkejä
- Lue otsikko ja ingressi ensin
- Etsi tuttuja sanoja
- Älä yritä ymmärtää jokaista sanaa`,
        theoryEn: `# Understanding Finnish News
Structure: headline, lead, body. Common news words: hallitus (government), eduskunta (parliament), talous (economy).`,
        vocabulary: [
          { word: "hallitus", partOfSpeech: "noun", meaningEn: "government", meaningVi: "chính phủ", example: "Hallitus päätti uudesta laista.", exampleEn: "The government decided on a new law.", category: "society" },
          { word: "eduskunta", partOfSpeech: "noun", meaningEn: "parliament", meaningVi: "quốc hội", example: "Eduskunta äänesti lain puolesta.", exampleEn: "Parliament voted in favor of the law.", category: "society" },
          { word: "ilmastonmuutos", partOfSpeech: "noun", meaningEn: "climate change", meaningVi: "biến đổi khí hậu", example: "Ilmastonmuutos on vakava ongelma.", exampleEn: "Climate change is a serious problem.", category: "society" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Täytä oikea uutissana.",
            instructionEn: "Fill in the correct news word.",
            items: [
              { question: "___ päätti uudesta budjetista. (chính phủ)", answer: "Hallitus", hint: "government" },
              { question: "___ on suuri haaste. (biến đổi khí hậu)", answer: "Ilmastonmuutos", hint: "climate change" },
            ],
          },
        ],
        quiz: [
          { question: "'Eduskunta' is the Finnish:", options: ["Government", "Parliament", "President", "Court"], answer: 1, explanation: "Eduskunta is the Finnish parliament." },
          { question: "When reading Finnish news, you should:", options: ["Translate every word", "Read headline and lead first", "Only read the headline", "Use a dictionary for every word"], answer: 1, explanation: "Read the headline and lead paragraph first to get the main idea." },
        ],
      },
      {
        id: "yki-adv-formal-letter",
        title: "Virallinen kirje",
        titleEn: "Formal Letter Writing",
        icon: "✉️",
        level: "A2",
        theory: `# Virallinen kirje (Formal Letter)

## Rakenne
1. **Päivämäärä**: 6.4.2026
2. **Vastaanottaja**: Nimi ja osoite
3. **Otsikko**: Asia: + aihe
4. **Aloitus**: "Hyvä vastaanottaja" / "Arvoisa..."
5. **Sisältö**: Asia lyhyesti ja selkeästi
6. **Lopetus**: "Ystävällisin terveisin" / "Kunnioittavasti"
7. **Allekirjoitus**: Oma nimi

## Esimerkkifraaseja
- "Kirjoitan tiedustellakseni..." - I'm writing to inquire...
- "Pyydän ystävällisesti..." - I kindly request...
- "Kiitos vastauksestanne etukäteen." - Thank you for your reply in advance.`,
        theoryEn: `# Formal Letter Writing
Structure: date, recipient, subject line, greeting, body, closing, signature.
Key phrases for formal correspondence.`,
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Täydennä virallisen kirjeen fraasi.",
            instructionEn: "Complete the formal letter phrase.",
            items: [
              { question: "___ vastaanottaja, (formal greeting)", answer: "Hyvä", hint: "Dear..." },
              { question: "Ystävällisin ___. (closing)", answer: "terveisin", hint: "regards" },
            ],
          },
        ],
        quiz: [
          { question: "A formal Finnish letter starts with:", options: ["Hei!", "Moi!", "Hyvä vastaanottaja", "Terve!"], answer: 2, explanation: "'Hyvä vastaanottaja' (Dear recipient) is the formal greeting." },
          { question: "'Kunnioittavasti' means:", options: ["Sincerely/Respectfully", "Hello", "Thank you", "Goodbye"], answer: 0, explanation: "'Kunnioittavasti' means 'respectfully' - a very formal closing." },
        ],
      },
    ],
  },
];
