// YKI A2 Finnish - Conversational Real-life Situations (18 lessons)
import type { FinnishModule } from "./types";

export const finnishLessonExpansion5Modules: FinnishModule[] = [
  {
    id: "yki-conv-daily",
    title: "Arkipäivän tilanteet",
    titleEn: "Everyday Situations",
    icon: "🏪",
    color: "from-orange-500 to-amber-400",
    description: "Käytännön suomi arkielämän tilanteisiin.",
    descriptionEn: "Practical Finnish for everyday real-life situations.",
    pillar: "lessons",
    lessons: [
      {
        id: "conv-supermarket",
        title: "Ruokakaupassa",
        titleEn: "At the Supermarket",
        icon: "🛒",
        level: "A2",
        theory: `### Ruokakaupassa (At the Supermarket)

Useful phrases for shopping in a Finnish supermarket. Learn to ask for items, quantities, and understand labels.

**Key vocabulary:**
- **Kassa** - cashier/checkout
- **Tarjous** - offer/sale
- **Hedelmät** - fruits
- **Vihannekset** - vegetables
- **Maitohylly** - dairy section`,
        theoryEn: `### At the Supermarket

Useful phrases for shopping in a Finnish supermarket. Learn to ask for items, quantities, and understand labels.`,
        dialogues: [
          {
            situation: "Asiakkaana ruokakaupassa",
            situationEn: "As a customer at the grocery store",
            lines: [
              { speaker: "Asiakas", finnish: "Anteeksi, missä on maito?", english: "Excuse me, where is the milk?" },
              { speaker: "Myyjä", finnish: "Maito on tuolla, hyllyn päässä.", english: "The milk is over there, at the end of the shelf." },
              { speaker: "Asiakas", finnish: "Kiitos! Onko teillä laktoositonta maitoa?", english: "Thanks! Do you have lactose-free milk?" },
              { speaker: "Myyjä", finnish: "Kyllä, laktoositon maito on sinisessä pakkauksessa.", english: "Yes, lactose-free milk is in the blue package." },
              { speaker: "Asiakas", finnish: "Paljonko tämä maksaa?", english: "How much does this cost?" },
              { speaker: "Myyjä", finnish: "Se maksaa kaksi euroa ja viisikymmentä senttiä.", english: "It costs two euros and fifty cents." },
            ],
          },
        ],
        vocabulary: [
          { word: "ruokakauppa", partOfSpeech: "noun", meaningEn: "grocery store", meaningVi: "siêu thị", example: "Menen ruokakauppaan.", exampleEn: "I go to the grocery store.", category: "Shopping" },
          { word: "kassa", partOfSpeech: "noun", meaningEn: "cashier", meaningVi: "quầy thu ngân", example: "Maksan kassalla.", exampleEn: "I pay at the cashier.", category: "Shopping" },
          { word: "tarjous", partOfSpeech: "noun", meaningEn: "offer/sale", meaningVi: "khuyến mãi", example: "Tämä on tarjouksessa.", exampleEn: "This is on sale.", category: "Shopping" },
          { word: "hedelmä", partOfSpeech: "noun", meaningEn: "fruit", meaningVi: "trái cây", example: "Ostan hedelmiä.", exampleEn: "I buy fruits.", category: "Food" },
          { word: "vihannekset", partOfSpeech: "noun", meaningEn: "vegetables", meaningVi: "rau củ", example: "Vihannekset ovat tuoreita.", exampleEn: "The vegetables are fresh.", category: "Food" },
          { word: "leipä", partOfSpeech: "noun", meaningEn: "bread", meaningVi: "bánh mì", example: "Haluaisin ruisleipää.", exampleEn: "I would like rye bread.", category: "Food" },
          { word: "kassi", partOfSpeech: "noun", meaningEn: "bag", meaningVi: "túi", example: "Tarvitsetko kassin?", exampleEn: "Do you need a bag?", category: "Shopping" },
          { word: "kuitti", partOfSpeech: "noun", meaningEn: "receipt", meaningVi: "hóa đơn", example: "Haluatko kuitin?", exampleEn: "Do you want a receipt?", category: "Shopping" },
          { word: "tuore", partOfSpeech: "adjective", meaningEn: "fresh", meaningVi: "tươi", example: "Tämä kala on tuoretta.", exampleEn: "This fish is fresh.", category: "Food" },
          { word: "pakaste", partOfSpeech: "noun", meaningEn: "frozen food", meaningVi: "đông lạnh", example: "Pakasteet ovat alakerrassa.", exampleEn: "Frozen foods are downstairs.", category: "Food" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Täydennä lauseet oikeilla sanoilla.",
            instructionEn: "Complete the sentences with the correct words.",
            items: [
              { question: "Missä on ___? (milk)", answer: "maito", hint: "m____" },
              { question: "Tämä on ___. (on sale)", answer: "tarjouksessa", hint: "tarj____" },
              { question: "Maksan ___. (at the cashier)", answer: "kassalla", hint: "kass____" },
              { question: "Haluatko ___? (a receipt)", answer: "kuitin", hint: "k____" },
            ],
          },
        ],
        quiz: [
          { question: "Mitä 'ruokakauppa' tarkoittaa?", options: ["Restaurant", "Grocery store", "Market hall", "Bakery"], answer: 1, explanation: "Ruokakauppa = grocery store (siêu thị)" },
          { question: "Miten kysyt hintaa suomeksi?", options: ["Mikä tämä on?", "Paljonko tämä maksaa?", "Mistä olet?", "Mitä haluat?"], answer: 1, explanation: "'Paljonko tämä maksaa?' = How much does this cost?" },
          { question: "Mikä on 'tarjous'?", options: ["Receipt", "Bag", "Offer/Sale", "Price"], answer: 2, explanation: "Tarjous = offer, sale (khuyến mãi)" },
          { question: "Mitä 'laktoositon' tarkoittaa?", options: ["Gluten-free", "Sugar-free", "Lactose-free", "Fat-free"], answer: 2, explanation: "Laktoositon = lactose-free" },
          { question: "Miten sanot 'I need a bag'?", options: ["Tarvitsen kassin", "Haluan kuitin", "Ostan leipää", "Menen kassalle"], answer: 0, explanation: "Tarvitsen kassin = I need a bag" },
        ],
      },
      {
        id: "conv-pharmacy",
        title: "Apteekissa",
        titleEn: "At the Pharmacy",
        icon: "💊",
        level: "A2",
        theory: `### Apteekissa (At the Pharmacy)

Learn to describe symptoms, ask for medication, and understand dosage instructions in Finnish.

**Key phrases:**
- **Minulla on päänsärkyä** - I have a headache
- **Tarvitsen lääkettä** - I need medicine
- **Onko tämä reseptilääke?** - Is this a prescription medicine?`,
        theoryEn: `### At the Pharmacy\n\nLearn to describe symptoms, ask for medication, and understand dosage instructions in Finnish.`,
        dialogues: [
          {
            situation: "Ostamassa lääkettä",
            situationEn: "Buying medicine",
            lines: [
              { speaker: "Asiakas", finnish: "Hei, minulla on päänsärkyä. Mitä suosittelette?", english: "Hi, I have a headache. What do you recommend?" },
              { speaker: "Apteekkari", finnish: "Suosittelen tätä särkylääkettä. Ota kaksi tablettia päivässä.", english: "I recommend this painkiller. Take two tablets per day." },
              { speaker: "Asiakas", finnish: "Onko sillä sivuvaikutuksia?", english: "Does it have side effects?" },
              { speaker: "Apteekkari", finnish: "Ei yleensä, mutta lue pakkausseloste.", english: "Not usually, but read the package leaflet." },
              { speaker: "Asiakas", finnish: "Kiitos. Paljonko tämä maksaa?", english: "Thanks. How much does this cost?" },
              { speaker: "Apteekkari", finnish: "Seitsemän euroa ja kaksikymmentä senttiä.", english: "Seven euros and twenty cents." },
            ],
          },
        ],
        vocabulary: [
          { word: "apteekki", partOfSpeech: "noun", meaningEn: "pharmacy", meaningVi: "nhà thuốc", example: "Menen apteekkiin.", exampleEn: "I go to the pharmacy.", category: "Health" },
          { word: "lääke", partOfSpeech: "noun", meaningEn: "medicine", meaningVi: "thuốc", example: "Tarvitsen lääkettä.", exampleEn: "I need medicine.", category: "Health" },
          { word: "päänsärky", partOfSpeech: "noun", meaningEn: "headache", meaningVi: "đau đầu", example: "Minulla on päänsärkyä.", exampleEn: "I have a headache.", category: "Health" },
          { word: "kuume", partOfSpeech: "noun", meaningEn: "fever", meaningVi: "sốt", example: "Minulla on kuumetta.", exampleEn: "I have a fever.", category: "Health" },
          { word: "yskä", partOfSpeech: "noun", meaningEn: "cough", meaningVi: "ho", example: "Minulla on yskää.", exampleEn: "I have a cough.", category: "Health" },
          { word: "resepti", partOfSpeech: "noun", meaningEn: "prescription", meaningVi: "đơn thuốc", example: "Tämä on reseptilääke.", exampleEn: "This is a prescription medicine.", category: "Health" },
          { word: "tabletti", partOfSpeech: "noun", meaningEn: "tablet", meaningVi: "viên thuốc", example: "Ota yksi tabletti.", exampleEn: "Take one tablet.", category: "Health" },
          { word: "sivuvaikutus", partOfSpeech: "noun", meaningEn: "side effect", meaningVi: "tác dụng phụ", example: "Lääkkeellä ei ole sivuvaikutuksia.", exampleEn: "The medicine has no side effects.", category: "Health" },
          { word: "nuha", partOfSpeech: "noun", meaningEn: "runny nose", meaningVi: "sổ mũi", example: "Minulla on nuhaa.", exampleEn: "I have a runny nose.", category: "Health" },
          { word: "kipulääke", partOfSpeech: "noun", meaningEn: "painkiller", meaningVi: "thuốc giảm đau", example: "Haluaisin kipulääkettä.", exampleEn: "I would like a painkiller.", category: "Health" },
        ],
        exercises: [
          {
            type: "multiple-choice",
            instruction: "Valitse oikea vastaus.",
            instructionEn: "Choose the correct answer.",
            items: [
              { question: "Miten sanot 'I have a headache'?", options: ["Minulla on nuhaa", "Minulla on päänsärkyä", "Minulla on kuumetta", "Minulla on yskää"], answer: "Minulla on päänsärkyä" },
              { question: "Mikä on 'prescription'?", options: ["Resepti", "Tabletti", "Lääke", "Kuitti"], answer: "Resepti" },
              { question: "Miten sanot 'Take two tablets'?", options: ["Osta kaksi tablettia", "Ota kaksi tablettia", "Anna kaksi tablettia", "Syö kaksi tablettia"], answer: "Ota kaksi tablettia" },
            ],
          },
        ],
        quiz: [
          { question: "Mitä 'apteekki' tarkoittaa?", options: ["Hospital", "Pharmacy", "Clinic", "Laboratory"], answer: 1, explanation: "Apteekki = pharmacy (nhà thuốc)" },
          { question: "Miten kuvailet oireita?", options: ["Minulla on...", "Minä olen...", "Minä haluan...", "Minä menen..."], answer: 0, explanation: "'Minulla on...' is used to describe symptoms: I have..." },
          { question: "Mikä on 'kipulääke'?", options: ["Antibiotic", "Vitamin", "Painkiller", "Cough syrup"], answer: 2, explanation: "Kipulääke = painkiller (thuốc giảm đau)" },
          { question: "Mitä 'sivuvaikutus' tarkoittaa?", options: ["Main effect", "Side effect", "Dosage", "Warning"], answer: 1, explanation: "Sivuvaikutus = side effect (tác dụng phụ)" },
          { question: "Miten kysyt 'Is this a prescription medicine?'", options: ["Onko tämä reseptilääke?", "Onko tämä kipulääke?", "Onko tämä ilmainen?", "Onko tämä kallis?"], answer: 0, explanation: "Onko tämä reseptilääke? = Is this a prescription medicine?" },
        ],
      },
      {
        id: "conv-doctor",
        title: "Lääkärissä",
        titleEn: "At the Doctor's Office",
        icon: "🏥",
        level: "A2",
        theory: `### Lääkärissä (At the Doctor's)

Essential phrases for visiting a doctor in Finland. Learn to describe pain, duration of symptoms, and understand medical advice.

**Key structures:**
- **Minua sattuu tähän** - It hurts here
- **Olen ollut sairas kolme päivää** - I've been sick for three days
- **Milloin oireet alkoivat?** - When did the symptoms start?`,
        theoryEn: `### At the Doctor's Office\n\nEssential phrases for visiting a doctor in Finland.`,
        dialogues: [
          {
            situation: "Lääkärin vastaanotolla",
            situationEn: "At the doctor's appointment",
            lines: [
              { speaker: "Lääkäri", finnish: "Hyvää päivää! Mikä vaivaa?", english: "Good day! What's the problem?" },
              { speaker: "Potilas", finnish: "Minulla on ollut kuumetta ja kurkkukipua kolme päivää.", english: "I've had fever and sore throat for three days." },
              { speaker: "Lääkäri", finnish: "Avaa suu, olkaa hyvä. Ahaa, kurkku on punainen.", english: "Open your mouth, please. I see, the throat is red." },
              { speaker: "Potilas", finnish: "Onko se vakavaa?", english: "Is it serious?" },
              { speaker: "Lääkäri", finnish: "Ei, se on tavallinen flunssa. Kirjoitan sairaslomaa kolme päivää.", english: "No, it's a common flu. I'll write you a sick leave for three days." },
              { speaker: "Potilas", finnish: "Kiitos, lääkäri.", english: "Thank you, doctor." },
            ],
          },
        ],
        vocabulary: [
          { word: "lääkäri", partOfSpeech: "noun", meaningEn: "doctor", meaningVi: "bác sĩ", example: "Menen lääkäriin.", exampleEn: "I go to the doctor.", category: "Health" },
          { word: "vastaanotto", partOfSpeech: "noun", meaningEn: "appointment/reception", meaningVi: "buổi khám", example: "Vastaanotto on kello 10.", exampleEn: "The appointment is at 10.", category: "Health" },
          { word: "oire", partOfSpeech: "noun", meaningEn: "symptom", meaningVi: "triệu chứng", example: "Mitkä ovat oireesi?", exampleEn: "What are your symptoms?", category: "Health" },
          { word: "kurkkukipu", partOfSpeech: "noun", meaningEn: "sore throat", meaningVi: "đau họng", example: "Minulla on kurkkukipua.", exampleEn: "I have a sore throat.", category: "Health" },
          { word: "sairasloma", partOfSpeech: "noun", meaningEn: "sick leave", meaningVi: "nghỉ bệnh", example: "Tarvitsen sairaslomaa.", exampleEn: "I need sick leave.", category: "Health" },
          { word: "flunssa", partOfSpeech: "noun", meaningEn: "flu", meaningVi: "cảm cúm", example: "Minulla on flunssa.", exampleEn: "I have the flu.", category: "Health" },
          { word: "vatsakipu", partOfSpeech: "noun", meaningEn: "stomachache", meaningVi: "đau bụng", example: "Minulla on vatsakipua.", exampleEn: "I have a stomachache.", category: "Health" },
          { word: "allergia", partOfSpeech: "noun", meaningEn: "allergy", meaningVi: "dị ứng", example: "Minulla on allergia.", exampleEn: "I have an allergy.", category: "Health" },
          { word: "verikoe", partOfSpeech: "noun", meaningEn: "blood test", meaningVi: "xét nghiệm máu", example: "Tarvitaan verikoe.", exampleEn: "A blood test is needed.", category: "Health" },
          { word: "rokote", partOfSpeech: "noun", meaningEn: "vaccine", meaningVi: "vắc-xin", example: "Oletko ottanut rokotteen?", exampleEn: "Have you taken the vaccine?", category: "Health" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Täydennä keskustelu lääkärissä.",
            instructionEn: "Complete the conversation at the doctor's.",
            items: [
              { question: "Mikä ___? (what's the problem)", answer: "vaivaa", hint: "v____" },
              { question: "Minulla on ollut ___ kolme päivää. (fever)", answer: "kuumetta", hint: "ku____" },
              { question: "Kirjoitan ___ kolme päivää. (sick leave)", answer: "sairaslomaa", hint: "sairaus____" },
              { question: "Onko se ___? (serious)", answer: "vakavaa", hint: "v____" },
            ],
          },
        ],
        quiz: [
          { question: "Miten sanot 'What's the problem?' lääkärille?", options: ["Mitä haluat?", "Mikä vaivaa?", "Missä asut?", "Mitä teet?"], answer: 1, explanation: "'Mikä vaivaa?' = What's the problem?" },
          { question: "Mitä 'sairasloma' tarkoittaa?", options: ["Holiday", "Sick leave", "Medicine", "Hospital"], answer: 1, explanation: "Sairasloma = sick leave (nghỉ bệnh)" },
          { question: "Miten kuvailet kipua suomeksi?", options: ["Minua sattuu", "Minä satun", "Minulla on satu", "Minä olen satu"], answer: 0, explanation: "'Minua sattuu' = It hurts me" },
          { question: "Mikä on 'flunssa'?", options: ["Headache", "Allergy", "Flu", "Fever"], answer: 2, explanation: "Flunssa = flu (cảm cúm)" },
          { question: "Miten sanot 'I've been sick for three days'?", options: ["Olen ollut sairas kolme päivää", "Olen sairas kolme kertaa", "Olen sairaalassa kolme päivää", "Menen lääkäriin kolme kertaa"], answer: 0, explanation: "'Olen ollut sairas kolme päivää' describes duration of illness" },
        ],
      },
    ],
  },
  {
    id: "yki-conv-services",
    title: "Palvelut ja virastot",
    titleEn: "Services & Offices",
    icon: "🏛️",
    color: "from-indigo-500 to-purple-500",
    description: "Käytännön suomi virastoissa ja palveluissa.",
    descriptionEn: "Practical Finnish for offices and public services.",
    pillar: "lessons",
    lessons: [
      {
        id: "conv-bank",
        title: "Pankissa",
        titleEn: "At the Bank",
        icon: "🏦",
        level: "A2",
        theory: `### Pankissa (At the Bank)

Learn to open accounts, ask about services, and handle banking tasks in Finnish.`,
        theoryEn: `### At the Bank\n\nLearn to open accounts, ask about services, and handle banking tasks in Finnish.`,
        dialogues: [
          {
            situation: "Tilin avaaminen",
            situationEn: "Opening an account",
            lines: [
              { speaker: "Asiakas", finnish: "Haluaisin avata pankkitilin.", english: "I would like to open a bank account." },
              { speaker: "Virkailija", finnish: "Tarvitsen henkilöllisyystodistuksenne.", english: "I need your ID." },
              { speaker: "Asiakas", finnish: "Tässä on passini.", english: "Here is my passport." },
              { speaker: "Virkailija", finnish: "Kiitos. Haluatteko pankkikortin?", english: "Thank you. Would you like a bank card?" },
              { speaker: "Asiakas", finnish: "Kyllä, kiitos. Ja verkkopankin.", english: "Yes, please. And online banking." },
              { speaker: "Virkailija", finnish: "Hyvä, täyttäkää tämä lomake.", english: "Good, please fill in this form." },
            ],
          },
        ],
        vocabulary: [
          { word: "pankki", partOfSpeech: "noun", meaningEn: "bank", meaningVi: "ngân hàng", example: "Menen pankkiin.", exampleEn: "I go to the bank.", category: "Services" },
          { word: "pankkitili", partOfSpeech: "noun", meaningEn: "bank account", meaningVi: "tài khoản ngân hàng", example: "Avaan pankkitilin.", exampleEn: "I open a bank account.", category: "Services" },
          { word: "pankkikortti", partOfSpeech: "noun", meaningEn: "bank card", meaningVi: "thẻ ngân hàng", example: "Maksan pankkikortilla.", exampleEn: "I pay with a bank card.", category: "Services" },
          { word: "verkkopankki", partOfSpeech: "noun", meaningEn: "online banking", meaningVi: "ngân hàng trực tuyến", example: "Käytän verkkopankkia.", exampleEn: "I use online banking.", category: "Services" },
          { word: "laina", partOfSpeech: "noun", meaningEn: "loan", meaningVi: "khoản vay", example: "Haen lainaa.", exampleEn: "I apply for a loan.", category: "Services" },
          { word: "korko", partOfSpeech: "noun", meaningEn: "interest rate", meaningVi: "lãi suất", example: "Korko on kaksi prosenttia.", exampleEn: "The interest rate is two percent.", category: "Services" },
          { word: "käteinen", partOfSpeech: "noun", meaningEn: "cash", meaningVi: "tiền mặt", example: "Maksan käteisellä.", exampleEn: "I pay with cash.", category: "Services" },
          { word: "tilisiirto", partOfSpeech: "noun", meaningEn: "bank transfer", meaningVi: "chuyển khoản", example: "Teen tilisiirron.", exampleEn: "I make a bank transfer.", category: "Services" },
          { word: "lomake", partOfSpeech: "noun", meaningEn: "form", meaningVi: "biểu mẫu", example: "Täytä tämä lomake.", exampleEn: "Fill in this form.", category: "Services" },
          { word: "henkilöllisyystodistus", partOfSpeech: "noun", meaningEn: "ID card", meaningVi: "chứng minh thư", example: "Näytä henkilöllisyystodistuksesi.", exampleEn: "Show your ID.", category: "Services" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Täydennä pankkikeskustelu.",
            instructionEn: "Complete the banking conversation.",
            items: [
              { question: "Haluaisin avata ___. (bank account)", answer: "pankkitilin", hint: "pankki____" },
              { question: "Maksan ___. (with a bank card)", answer: "pankkikortilla", hint: "pankki____" },
              { question: "Täyttäkää tämä ___. (form)", answer: "lomake", hint: "l____" },
            ],
          },
        ],
        quiz: [
          { question: "Miten sanot 'I would like to open a bank account'?", options: ["Haluaisin avata pankkitilin", "Haluaisin sulkea pankkitilin", "Haluaisin pankkikortin", "Haluaisin lainaa"], answer: 0, explanation: "'Haluaisin avata pankkitilin' = I would like to open a bank account" },
          { question: "Mitä 'verkkopankki' tarkoittaa?", options: ["ATM", "Online banking", "Bank branch", "Credit card"], answer: 1, explanation: "Verkkopankki = online banking (ngân hàng trực tuyến)" },
          { question: "Mikä on 'käteinen'?", options: ["Card", "Cash", "Check", "Receipt"], answer: 1, explanation: "Käteinen = cash (tiền mặt)" },
          { question: "Mitä 'lomake' tarkoittaa?", options: ["Letter", "Form", "Book", "Card"], answer: 1, explanation: "Lomake = form (biểu mẫu)" },
          { question: "Miten sanot 'I pay with a bank card'?", options: ["Maksan käteisellä", "Maksan pankkikortilla", "Maksan laskulla", "Maksan verkossa"], answer: 1, explanation: "Maksan pankkikortilla = I pay with a bank card" },
        ],
      },
      {
        id: "conv-post-office",
        title: "Postissa",
        titleEn: "At the Post Office",
        icon: "📮",
        level: "A2",
        theory: `### Postissa (At the Post Office)

Learn to send packages, buy stamps, and handle mail in Finnish.`,
        theoryEn: `### At the Post Office\n\nLearn to send packages, buy stamps, and handle mail in Finnish.`,
        dialogues: [
          {
            situation: "Paketin lähettäminen",
            situationEn: "Sending a package",
            lines: [
              { speaker: "Asiakas", finnish: "Haluaisin lähettää tämän paketin Vietnamiin.", english: "I would like to send this package to Vietnam." },
              { speaker: "Virkailija", finnish: "Paljonko paketti painaa?", english: "How much does the package weigh?" },
              { speaker: "Asiakas", finnish: "Noin kaksi kiloa.", english: "About two kilos." },
              { speaker: "Virkailija", finnish: "Postimaksu on kaksikymmentäviisi euroa. Haluatteko seurannan?", english: "The postage is twenty-five euros. Would you like tracking?" },
              { speaker: "Asiakas", finnish: "Kyllä, kiitos.", english: "Yes, please." },
            ],
          },
        ],
        vocabulary: [
          { word: "posti", partOfSpeech: "noun", meaningEn: "post/mail", meaningVi: "bưu điện", example: "Menen postiin.", exampleEn: "I go to the post office.", category: "Services" },
          { word: "paketti", partOfSpeech: "noun", meaningEn: "package", meaningVi: "gói hàng", example: "Lähetän paketin.", exampleEn: "I send a package.", category: "Services" },
          { word: "postimerkki", partOfSpeech: "noun", meaningEn: "stamp", meaningVi: "tem", example: "Ostan postimerkkejä.", exampleEn: "I buy stamps.", category: "Services" },
          { word: "kirje", partOfSpeech: "noun", meaningEn: "letter", meaningVi: "thư", example: "Lähetän kirjeen.", exampleEn: "I send a letter.", category: "Services" },
          { word: "osoite", partOfSpeech: "noun", meaningEn: "address", meaningVi: "địa chỉ", example: "Mikä on osoitteesi?", exampleEn: "What is your address?", category: "Services" },
          { word: "postinumero", partOfSpeech: "noun", meaningEn: "postal code", meaningVi: "mã bưu điện", example: "Postinumero on 00100.", exampleEn: "The postal code is 00100.", category: "Services" },
          { word: "lähettää", partOfSpeech: "verb", meaningEn: "to send", meaningVi: "gửi", example: "Lähetän paketin huomenna.", exampleEn: "I'll send the package tomorrow.", category: "Services" },
          { word: "painaa", partOfSpeech: "verb", meaningEn: "to weigh", meaningVi: "nặng/cân nặng", example: "Paketti painaa kolme kiloa.", exampleEn: "The package weighs three kilos.", category: "Services" },
          { word: "seuranta", partOfSpeech: "noun", meaningEn: "tracking", meaningVi: "theo dõi", example: "Haluan seurannan.", exampleEn: "I want tracking.", category: "Services" },
          { word: "postimaksu", partOfSpeech: "noun", meaningEn: "postage", meaningVi: "cước phí bưu điện", example: "Postimaksu on viisi euroa.", exampleEn: "The postage is five euros.", category: "Services" },
        ],
        exercises: [
          {
            type: "multiple-choice",
            instruction: "Valitse oikea vastaus.",
            instructionEn: "Choose the correct answer.",
            items: [
              { question: "Miten sanot 'I would like to send a package'?", options: ["Haluaisin lähettää paketin", "Haluaisin ostaa paketin", "Haluaisin avata paketin", "Haluaisin saada paketin"], answer: "Haluaisin lähettää paketin" },
              { question: "'Postimerkki' tarkoittaa?", options: ["Envelope", "Stamp", "Package", "Address"], answer: "Stamp" },
            ],
          },
        ],
        quiz: [
          { question: "Mitä 'paketti' tarkoittaa?", options: ["Letter", "Package", "Stamp", "Envelope"], answer: 1, explanation: "Paketti = package (gói hàng)" },
          { question: "Miten kysyt 'How much does the package weigh?'", options: ["Paljonko paketti maksaa?", "Paljonko paketti painaa?", "Missä paketti on?", "Milloin paketti tulee?"], answer: 1, explanation: "'Paljonko paketti painaa?' = How much does the package weigh?" },
          { question: "Mikä on 'osoite'?", options: ["Name", "Address", "Phone", "Email"], answer: 1, explanation: "Osoite = address (địa chỉ)" },
          { question: "Mitä 'lähettää' tarkoittaa?", options: ["To receive", "To open", "To send", "To buy"], answer: 2, explanation: "Lähettää = to send (gửi)" },
          { question: "Mikä on 'seuranta'?", options: ["Insurance", "Tracking", "Express", "Return"], answer: 1, explanation: "Seuranta = tracking (theo dõi)" },
        ],
      },
      {
        id: "conv-kela",
        title: "Kelassa",
        titleEn: "At Kela (Social Insurance)",
        icon: "🏢",
        level: "A2",
        theory: `### Kelassa (At Kela)

Kela is the Social Insurance Institution of Finland. Learn to apply for benefits, understand forms, and communicate with Kela staff.

**Common Kela services:**
- **Asumistuki** - housing benefit
- **Opintotuki** - student benefit
- **Sairauspäiväraha** - sickness allowance
- **Työttömyysturva** - unemployment benefit`,
        theoryEn: `### At Kela (Social Insurance)\n\nKela is Finland's Social Insurance Institution. Learn essential vocabulary and phrases for Kela services.`,
        dialogues: [
          {
            situation: "Asumistuen hakeminen",
            situationEn: "Applying for housing benefit",
            lines: [
              { speaker: "Asiakas", finnish: "Haluaisin hakea asumistukea.", english: "I would like to apply for housing benefit." },
              { speaker: "Virkailija", finnish: "Asutteko vuokralla?", english: "Do you rent?" },
              { speaker: "Asiakas", finnish: "Kyllä, asun yksiössä Helsingissä.", english: "Yes, I live in a studio in Helsinki." },
              { speaker: "Virkailija", finnish: "Paljonko vuokranne on kuukaudessa?", english: "How much is your rent per month?" },
              { speaker: "Asiakas", finnish: "Seitsemänsataa euroa.", english: "Seven hundred euros." },
              { speaker: "Virkailija", finnish: "Täyttäkää hakemus verkossa tai täällä.", english: "Fill in the application online or here." },
            ],
          },
        ],
        vocabulary: [
          { word: "Kela", partOfSpeech: "noun", meaningEn: "Social Insurance Institution", meaningVi: "Cơ quan bảo hiểm xã hội", example: "Menen Kelaan.", exampleEn: "I go to Kela.", category: "Services" },
          { word: "asumistuki", partOfSpeech: "noun", meaningEn: "housing benefit", meaningVi: "trợ cấp nhà ở", example: "Haen asumistukea.", exampleEn: "I apply for housing benefit.", category: "Services" },
          { word: "opintotuki", partOfSpeech: "noun", meaningEn: "student benefit", meaningVi: "trợ cấp sinh viên", example: "Saan opintotukea.", exampleEn: "I receive student benefit.", category: "Services" },
          { word: "hakemus", partOfSpeech: "noun", meaningEn: "application", meaningVi: "đơn xin", example: "Täytän hakemuksen.", exampleEn: "I fill in the application.", category: "Services" },
          { word: "vuokra", partOfSpeech: "noun", meaningEn: "rent", meaningVi: "tiền thuê nhà", example: "Vuokra on 700 euroa.", exampleEn: "The rent is 700 euros.", category: "Housing" },
          { word: "päätös", partOfSpeech: "noun", meaningEn: "decision", meaningVi: "quyết định", example: "Sain päätöksen Kelasta.", exampleEn: "I received a decision from Kela.", category: "Services" },
          { word: "etuus", partOfSpeech: "noun", meaningEn: "benefit", meaningVi: "quyền lợi", example: "Mikä etuus sinulla on?", exampleEn: "What benefit do you have?", category: "Services" },
          { word: "tulo", partOfSpeech: "noun", meaningEn: "income", meaningVi: "thu nhập", example: "Kuukausituloni on 1500 euroa.", exampleEn: "My monthly income is 1500 euros.", category: "Services" },
          { word: "liite", partOfSpeech: "noun", meaningEn: "attachment/appendix", meaningVi: "tài liệu đính kèm", example: "Lähetä liitteet hakemuksen kanssa.", exampleEn: "Send the attachments with the application.", category: "Services" },
          { word: "sairauspäiväraha", partOfSpeech: "noun", meaningEn: "sickness allowance", meaningVi: "trợ cấp ốm đau", example: "Haen sairauspäivärahaa.", exampleEn: "I apply for sickness allowance.", category: "Services" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Täydennä Kela-keskustelu.",
            instructionEn: "Complete the Kela conversation.",
            items: [
              { question: "Haluaisin hakea ___. (housing benefit)", answer: "asumistukea", hint: "asumis____" },
              { question: "Täyttäkää ___ verkossa. (application)", answer: "hakemus", hint: "h____" },
              { question: "Paljonko ___ on kuukaudessa? (rent)", answer: "vuokranne", hint: "v____" },
            ],
          },
        ],
        quiz: [
          { question: "Mikä on Kela?", options: ["Bank", "Hospital", "Social Insurance Institution", "School"], answer: 2, explanation: "Kela = Social Insurance Institution of Finland" },
          { question: "Mitä 'asumistuki' tarkoittaa?", options: ["Student benefit", "Housing benefit", "Unemployment benefit", "Child benefit"], answer: 1, explanation: "Asumistuki = housing benefit (trợ cấp nhà ở)" },
          { question: "Miten sanot 'I fill in the application'?", options: ["Luen hakemuksen", "Täytän hakemuksen", "Lähetän hakemuksen", "Saan hakemuksen"], answer: 1, explanation: "Täytän hakemuksen = I fill in the application" },
          { question: "Mikä on 'vuokra'?", options: ["Salary", "Tax", "Rent", "Bill"], answer: 2, explanation: "Vuokra = rent (tiền thuê nhà)" },
          { question: "Mitä 'päätös' tarkoittaa?", options: ["Application", "Decision", "Document", "Receipt"], answer: 1, explanation: "Päätös = decision (quyết định)" },
        ],
      },
    ],
  },
  {
    id: "yki-conv-social",
    title: "Sosiaalinen elämä",
    titleEn: "Social Life",
    icon: "🤝",
    color: "from-pink-500 to-rose-400",
    description: "Suomi sosiaalisiin tilanteisiin ja vapaa-aikaan.",
    descriptionEn: "Finnish for social situations and free time.",
    pillar: "lessons",
    lessons: [
      {
        id: "conv-cafe",
        title: "Kahvilassa",
        titleEn: "At a Café",
        icon: "☕",
        level: "A2",
        theory: `### Kahvilassa (At a Café)

Coffee culture is central to Finnish life. Learn to order, chat, and enjoy a café visit.`,
        theoryEn: `### At a Café\n\nCoffee culture is central to Finnish life. Learn to order, chat, and enjoy a café visit.`,
        dialogues: [
          {
            situation: "Tilaaminen kahvilassa",
            situationEn: "Ordering at a café",
            lines: [
              { speaker: "Tarjoilija", finnish: "Tervetuloa! Mitä saisi olla?", english: "Welcome! What would you like?" },
              { speaker: "Asiakas", finnish: "Saisinko kupin kahvia ja korvapuustin?", english: "Could I have a cup of coffee and a cinnamon bun?" },
              { speaker: "Tarjoilija", finnish: "Totta kai! Haluatteko maitoa kahviin?", english: "Of course! Would you like milk in your coffee?" },
              { speaker: "Asiakas", finnish: "Kyllä, kiitos. Ja vähän sokeria.", english: "Yes, please. And a little sugar." },
              { speaker: "Tarjoilija", finnish: "Ole hyvä. Se on neljä euroa ja viisikymmentä senttiä.", english: "Here you go. That's four euros and fifty cents." },
            ],
          },
        ],
        vocabulary: [
          { word: "kahvila", partOfSpeech: "noun", meaningEn: "café", meaningVi: "quán cà phê", example: "Mennään kahvilaan!", exampleEn: "Let's go to a café!", category: "Social" },
          { word: "kahvi", partOfSpeech: "noun", meaningEn: "coffee", meaningVi: "cà phê", example: "Juon kahvia joka aamu.", exampleEn: "I drink coffee every morning.", category: "Food" },
          { word: "korvapuusti", partOfSpeech: "noun", meaningEn: "cinnamon bun", meaningVi: "bánh quế", example: "Korvapuusti on herkullinen.", exampleEn: "The cinnamon bun is delicious.", category: "Food" },
          { word: "tee", partOfSpeech: "noun", meaningEn: "tea", meaningVi: "trà", example: "Haluaisitko teetä?", exampleEn: "Would you like tea?", category: "Food" },
          { word: "pulla", partOfSpeech: "noun", meaningEn: "sweet bread", meaningVi: "bánh mì ngọt", example: "Pulla tuoksuu hyvältä.", exampleEn: "The sweet bread smells good.", category: "Food" },
          { word: "kerma", partOfSpeech: "noun", meaningEn: "cream", meaningVi: "kem", example: "Haluatko kermaa?", exampleEn: "Do you want cream?", category: "Food" },
          { word: "sokeri", partOfSpeech: "noun", meaningEn: "sugar", meaningVi: "đường", example: "Vähän sokeria, kiitos.", exampleEn: "A little sugar, please.", category: "Food" },
          { word: "lasku", partOfSpeech: "noun", meaningEn: "bill/check", meaningVi: "hóa đơn", example: "Saisinko laskun?", exampleEn: "Could I have the bill?", category: "Services" },
          { word: "tarjoilija", partOfSpeech: "noun", meaningEn: "waiter/waitress", meaningVi: "nhân viên phục vụ", example: "Tarjoilija tuo kahvin.", exampleEn: "The waiter brings the coffee.", category: "Social" },
          { word: "herkullinen", partOfSpeech: "adjective", meaningEn: "delicious", meaningVi: "ngon", example: "Tämä kakku on herkullinen!", exampleEn: "This cake is delicious!", category: "Food" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Täydennä kahvilakeskustelu.",
            instructionEn: "Complete the café conversation.",
            items: [
              { question: "Saisinko kupin ___? (coffee)", answer: "kahvia", hint: "k____" },
              { question: "Haluatteko ___ kahviin? (milk)", answer: "maitoa", hint: "m____" },
              { question: "Se on neljä ___ ja viisikymmentä senttiä. (euros)", answer: "euroa", hint: "e____" },
            ],
          },
        ],
        quiz: [
          { question: "Mitä 'korvapuusti' tarkoittaa?", options: ["Donut", "Cinnamon bun", "Croissant", "Cookie"], answer: 1, explanation: "Korvapuusti = cinnamon bun, a classic Finnish pastry" },
          { question: "Miten tilaat kahvia kahvilassa?", options: ["Anna minulle kahvia", "Saisinko kahvia", "Tuo kahvia", "Ota kahvia"], answer: 1, explanation: "'Saisinko kahvia' is the polite way to order coffee" },
          { question: "Mikä on 'tarjoilija'?", options: ["Chef", "Waiter", "Customer", "Manager"], answer: 1, explanation: "Tarjoilija = waiter/waitress (nhân viên phục vụ)" },
          { question: "Mitä 'herkullinen' tarkoittaa?", options: ["Expensive", "Cheap", "Delicious", "Hot"], answer: 2, explanation: "Herkullinen = delicious (ngon)" },
          { question: "Miten sanot 'Could I have the bill?'", options: ["Saisinko laskun?", "Saisinko menun?", "Saisinko kassin?", "Saisinko kuitin?"], answer: 0, explanation: "'Saisinko laskun?' = Could I have the bill?" },
        ],
      },
      {
        id: "conv-restaurant",
        title: "Ravintolassa",
        titleEn: "At a Restaurant",
        icon: "🍽️",
        level: "A2",
        theory: `### Ravintolassa (At a Restaurant)\n\nLearn to make reservations, order food, and handle restaurant situations.`,
        theoryEn: `### At a Restaurant\n\nLearn to make reservations, order food, and handle restaurant situations.`,
        dialogues: [
          {
            situation: "Tilaaminen ravintolassa",
            situationEn: "Ordering at a restaurant",
            lines: [
              { speaker: "Tarjoilija", finnish: "Hyvää iltaa! Onko teillä pöytävarausta?", english: "Good evening! Do you have a reservation?" },
              { speaker: "Asiakas", finnish: "Kyllä, nimellä Nguyen, kahdelle.", english: "Yes, under Nguyen, for two." },
              { speaker: "Tarjoilija", finnish: "Tässä on ruokalista. Haluatteko jotain juotavaa?", english: "Here is the menu. Would you like something to drink?" },
              { speaker: "Asiakas", finnish: "Vettä, kiitos. Mitä suosittelette?", english: "Water, please. What do you recommend?" },
              { speaker: "Tarjoilija", finnish: "Lohikeitto on päivän suositus.", english: "Salmon soup is today's recommendation." },
              { speaker: "Asiakas", finnish: "Otan sen, kiitos.", english: "I'll take that, thank you." },
            ],
          },
        ],
        vocabulary: [
          { word: "ravintola", partOfSpeech: "noun", meaningEn: "restaurant", meaningVi: "nhà hàng", example: "Mennään ravintolaan.", exampleEn: "Let's go to a restaurant.", category: "Social" },
          { word: "ruokalista", partOfSpeech: "noun", meaningEn: "menu", meaningVi: "thực đơn", example: "Saisinko ruokalistan?", exampleEn: "Could I have the menu?", category: "Food" },
          { word: "pöytävaraus", partOfSpeech: "noun", meaningEn: "table reservation", meaningVi: "đặt bàn", example: "Haluaisin tehdä pöytävarauksen.", exampleEn: "I'd like to make a reservation.", category: "Social" },
          { word: "alkuruoka", partOfSpeech: "noun", meaningEn: "appetizer", meaningVi: "món khai vị", example: "Alkuruoka on salaatti.", exampleEn: "The appetizer is a salad.", category: "Food" },
          { word: "pääruoka", partOfSpeech: "noun", meaningEn: "main course", meaningVi: "món chính", example: "Pääruoka on lohta.", exampleEn: "The main course is salmon.", category: "Food" },
          { word: "jälkiruoka", partOfSpeech: "noun", meaningEn: "dessert", meaningVi: "tráng miệng", example: "Jälkiruoka on jäätelöä.", exampleEn: "Dessert is ice cream.", category: "Food" },
          { word: "lohikeitto", partOfSpeech: "noun", meaningEn: "salmon soup", meaningVi: "súp cá hồi", example: "Lohikeitto on hyvää.", exampleEn: "Salmon soup is good.", category: "Food" },
          { word: "juoma", partOfSpeech: "noun", meaningEn: "drink", meaningVi: "đồ uống", example: "Mitä juomaa haluat?", exampleEn: "What drink do you want?", category: "Food" },
          { word: "tippi", partOfSpeech: "noun", meaningEn: "tip", meaningVi: "tiền boa", example: "Suomessa tippi ei ole pakollinen.", exampleEn: "In Finland, tipping is not mandatory.", category: "Social" },
          { word: "erikoisruokavalio", partOfSpeech: "noun", meaningEn: "special diet", meaningVi: "chế độ ăn đặc biệt", example: "Minulla on erikoisruokavalio.", exampleEn: "I have a special diet.", category: "Food" },
        ],
        exercises: [
          {
            type: "multiple-choice",
            instruction: "Valitse oikea vastaus.",
            instructionEn: "Choose the correct answer.",
            items: [
              { question: "Miten teet pöytävarauksen?", options: ["Haluaisin tehdä pöytävarauksen", "Haluaisin tehdä tilauksen", "Haluaisin tehdä ruokaa", "Haluaisin tehdä matkan"], answer: "Haluaisin tehdä pöytävarauksen" },
              { question: "Mikä on 'jälkiruoka'?", options: ["Appetizer", "Main course", "Dessert", "Side dish"], answer: "Dessert" },
            ],
          },
        ],
        quiz: [
          { question: "Mitä 'ruokalista' tarkoittaa?", options: ["Shopping list", "Menu", "Recipe", "Bill"], answer: 1, explanation: "Ruokalista = menu (thực đơn)" },
          { question: "Miten tilaat ravintolassa?", options: ["Otan tämän", "Annan tämän", "Vien tämän", "Teen tämän"], answer: 0, explanation: "'Otan tämän' = I'll take this - common way to order" },
          { question: "Mikä on 'lohikeitto'?", options: ["Fish soup", "Salmon soup", "Chicken soup", "Vegetable soup"], answer: 1, explanation: "Lohikeitto = salmon soup (súp cá hồi)" },
          { question: "Pitääkö Suomessa antaa tippiä?", options: ["Aina", "Joskus", "Ei ole pakollista", "Kyllä, 20%"], answer: 2, explanation: "Tipping is not mandatory (not required) in Finland" },
          { question: "Mitä 'erikoisruokavalio' tarkoittaa?", options: ["Regular menu", "Special diet", "Children's menu", "Lunch offer"], answer: 1, explanation: "Erikoisruokavalio = special diet (chế độ ăn đặc biệt)" },
        ],
      },
      {
        id: "conv-library",
        title: "Kirjastossa",
        titleEn: "At the Library",
        icon: "📚",
        level: "A2",
        theory: `### Kirjastossa (At the Library)\n\nFinnish libraries are free and offer many services. Learn to borrow books, use computers, and ask for help.`,
        theoryEn: `### At the Library\n\nFinnish libraries are free and offer many services.`,
        dialogues: [
          {
            situation: "Kirjan lainaaminen",
            situationEn: "Borrowing a book",
            lines: [
              { speaker: "Asiakas", finnish: "Haluaisin lainata tämän kirjan.", english: "I would like to borrow this book." },
              { speaker: "Kirjastonhoitaja", finnish: "Onko sinulla kirjastokortti?", english: "Do you have a library card?" },
              { speaker: "Asiakas", finnish: "Kyllä, tässä.", english: "Yes, here it is." },
              { speaker: "Kirjastonhoitaja", finnish: "Laina-aika on neljä viikkoa. Voit uusia verkossa.", english: "The loan period is four weeks. You can renew online." },
              { speaker: "Asiakas", finnish: "Kiitos! Voiko täällä käyttää tietokonetta?", english: "Thanks! Can I use a computer here?" },
              { speaker: "Kirjastonhoitaja", finnish: "Kyllä, tietokoneet ovat toisessa kerroksessa.", english: "Yes, the computers are on the second floor." },
            ],
          },
        ],
        vocabulary: [
          { word: "kirjasto", partOfSpeech: "noun", meaningEn: "library", meaningVi: "thư viện", example: "Menen kirjastoon.", exampleEn: "I go to the library.", category: "Social" },
          { word: "kirjastokortti", partOfSpeech: "noun", meaningEn: "library card", meaningVi: "thẻ thư viện", example: "Tarvitset kirjastokortin.", exampleEn: "You need a library card.", category: "Social" },
          { word: "lainata", partOfSpeech: "verb", meaningEn: "to borrow", meaningVi: "mượn", example: "Lainaan kirjan.", exampleEn: "I borrow a book.", category: "Social" },
          { word: "palauttaa", partOfSpeech: "verb", meaningEn: "to return", meaningVi: "trả lại", example: "Palautan kirjan huomenna.", exampleEn: "I return the book tomorrow.", category: "Social" },
          { word: "laina-aika", partOfSpeech: "noun", meaningEn: "loan period", meaningVi: "thời hạn mượn", example: "Laina-aika on neljä viikkoa.", exampleEn: "The loan period is four weeks.", category: "Social" },
          { word: "uusia", partOfSpeech: "verb", meaningEn: "to renew", meaningVi: "gia hạn", example: "Voin uusia lainan.", exampleEn: "I can renew the loan.", category: "Social" },
          { word: "myöhästymismaksu", partOfSpeech: "noun", meaningEn: "late fee", meaningVi: "phí trễ hạn", example: "Myöhästymismaksu on yksi euro.", exampleEn: "The late fee is one euro.", category: "Services" },
          { word: "lukusali", partOfSpeech: "noun", meaningEn: "reading room", meaningVi: "phòng đọc", example: "Lukusali on hiljainen.", exampleEn: "The reading room is quiet.", category: "Social" },
          { word: "lehti", partOfSpeech: "noun", meaningEn: "magazine/newspaper", meaningVi: "tạp chí/báo", example: "Luen lehtiä kirjastossa.", exampleEn: "I read magazines at the library.", category: "Social" },
          { word: "tietokone", partOfSpeech: "noun", meaningEn: "computer", meaningVi: "máy tính", example: "Käytän tietokonetta.", exampleEn: "I use the computer.", category: "Technology" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Täydennä kirjastokeskustelu.",
            instructionEn: "Complete the library conversation.",
            items: [
              { question: "Haluaisin ___ tämän kirjan. (borrow)", answer: "lainata", hint: "l____" },
              { question: "Onko sinulla ___? (library card)", answer: "kirjastokortti", hint: "kirjasto____" },
              { question: "___ on neljä viikkoa. (loan period)", answer: "Laina-aika", hint: "L____" },
            ],
          },
        ],
        quiz: [
          { question: "Mitä 'lainata' tarkoittaa?", options: ["To buy", "To borrow", "To sell", "To read"], answer: 1, explanation: "Lainata = to borrow (mượn)" },
          { question: "Miten sanot 'I return the book'?", options: ["Lainaan kirjan", "Palautan kirjan", "Ostan kirjan", "Luen kirjan"], answer: 1, explanation: "Palautan kirjan = I return the book" },
          { question: "Mikä on 'kirjastokortti'?", options: ["Credit card", "ID card", "Library card", "Bus card"], answer: 2, explanation: "Kirjastokortti = library card (thẻ thư viện)" },
          { question: "Mitä 'uusia' tarkoittaa tässä kontekstissa?", options: ["To buy new", "To renew", "To change", "To cancel"], answer: 1, explanation: "Uusia = to renew (a loan) (gia hạn)" },
          { question: "Ovatko kirjastot ilmaisia Suomessa?", options: ["Kyllä", "Ei", "Vain lapsille", "Vain opiskelijoille"], answer: 0, explanation: "Yes, Finnish libraries are free for everyone" },
        ],
      },
      {
        id: "conv-bus",
        title: "Bussissa ja metrossa",
        titleEn: "On the Bus & Metro",
        icon: "🚌",
        level: "A2",
        theory: `### Bussissa ja metrossa (On the Bus & Metro)\n\nLearn to buy tickets, ask for directions, and navigate public transport in Finland.`,
        theoryEn: `### On the Bus & Metro\n\nLearn to navigate Finnish public transport.`,
        dialogues: [
          {
            situation: "Matkustaminen bussilla",
            situationEn: "Traveling by bus",
            lines: [
              { speaker: "Matkustaja", finnish: "Anteeksi, meneekö tämä bussi keskustaan?", english: "Excuse me, does this bus go to the city center?" },
              { speaker: "Kuljettaja", finnish: "Kyllä, pysäkki on Rautatientorilla.", english: "Yes, the stop is at Rautatientori." },
              { speaker: "Matkustaja", finnish: "Paljonko lippu maksaa?", english: "How much does a ticket cost?" },
              { speaker: "Kuljettaja", finnish: "Kolme euroa ja kymmenen senttiä. Voit maksaa kortilla.", english: "Three euros and ten cents. You can pay by card." },
              { speaker: "Matkustaja", finnish: "Voitteko sanoa, milloin pitää jäädä pois?", english: "Can you tell me when I should get off?" },
              { speaker: "Kuljettaja", finnish: "Totta kai, sanon sitten.", english: "Of course, I'll let you know." },
            ],
          },
        ],
        vocabulary: [
          { word: "bussi", partOfSpeech: "noun", meaningEn: "bus", meaningVi: "xe buýt", example: "Matkustan bussilla.", exampleEn: "I travel by bus.", category: "Transport" },
          { word: "metro", partOfSpeech: "noun", meaningEn: "metro", meaningVi: "tàu điện ngầm", example: "Otan metron.", exampleEn: "I take the metro.", category: "Transport" },
          { word: "lippu", partOfSpeech: "noun", meaningEn: "ticket", meaningVi: "vé", example: "Ostan lipun.", exampleEn: "I buy a ticket.", category: "Transport" },
          { word: "pysäkki", partOfSpeech: "noun", meaningEn: "stop", meaningVi: "trạm dừng", example: "Seuraava pysäkki on Hakaniemi.", exampleEn: "The next stop is Hakaniemi.", category: "Transport" },
          { word: "aikataulu", partOfSpeech: "noun", meaningEn: "timetable", meaningVi: "thời gian biểu", example: "Tarkistan aikataulun.", exampleEn: "I check the timetable.", category: "Transport" },
          { word: "matkakortti", partOfSpeech: "noun", meaningEn: "travel card", meaningVi: "thẻ đi lại", example: "Käytän matkakorttia.", exampleEn: "I use a travel card.", category: "Transport" },
          { word: "vaihto", partOfSpeech: "noun", meaningEn: "transfer/change", meaningVi: "chuyển tuyến", example: "Vaihto on Kampissa.", exampleEn: "The transfer is at Kamppi.", category: "Transport" },
          { word: "kuljettaja", partOfSpeech: "noun", meaningEn: "driver", meaningVi: "tài xế", example: "Kysy kuljettajalta.", exampleEn: "Ask the driver.", category: "Transport" },
          { word: "keskusta", partOfSpeech: "noun", meaningEn: "city center", meaningVi: "trung tâm thành phố", example: "Menen keskustaan.", exampleEn: "I go to the city center.", category: "Transport" },
          { word: "raitiovaunu", partOfSpeech: "noun", meaningEn: "tram", meaningVi: "xe điện", example: "Raitiovaunu tulee pian.", exampleEn: "The tram is coming soon.", category: "Transport" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Täydennä joukkoliikenteen lauseet.",
            instructionEn: "Complete the public transport sentences.",
            items: [
              { question: "Meneekö tämä bussi ___? (to the center)", answer: "keskustaan", hint: "k____" },
              { question: "Paljonko ___ maksaa? (ticket)", answer: "lippu", hint: "l____" },
              { question: "Seuraava ___ on Hakaniemi. (stop)", answer: "pysäkki", hint: "p____" },
            ],
          },
        ],
        quiz: [
          { question: "Miten kysyt 'Does this bus go to the center?'", options: ["Meneekö tämä bussi keskustaan?", "Tuleeko tämä bussi keskustaan?", "Onko tämä bussi keskustasta?", "Lähteekö tämä bussi keskustaan?"], answer: 0, explanation: "'Meneekö tämä bussi keskustaan?' is the standard way to ask" },
          { question: "Mikä on 'matkakortti'?", options: ["Passport", "Travel card", "Driving license", "Student ID"], answer: 1, explanation: "Matkakortti = travel card (thẻ đi lại)" },
          { question: "Mitä 'pysäkki' tarkoittaa?", options: ["Station", "Stop", "Terminal", "Platform"], answer: 1, explanation: "Pysäkki = stop (trạm dừng)" },
          { question: "Mikä on 'raitiovaunu'?", options: ["Bus", "Metro", "Tram", "Train"], answer: 2, explanation: "Raitiovaunu = tram (xe điện)" },
          { question: "Miten sanot 'I check the timetable'?", options: ["Luen aikataulun", "Tarkistan aikataulun", "Ostan aikataulun", "Kirjoitan aikataulun"], answer: 1, explanation: "Tarkistan aikataulun = I check the timetable" },
        ],
      },
      {
        id: "conv-gym",
        title: "Kuntosalilla ja uimahallissa",
        titleEn: "At the Gym & Swimming Pool",
        icon: "🏊",
        level: "A2",
        theory: `### Kuntosalilla ja uimahallissa\n\nLearn vocabulary for fitness, gym membership, and swimming pool visits.`,
        theoryEn: `### At the Gym & Swimming Pool\n\nFitness and swimming vocabulary for daily life in Finland.`,
        dialogues: [
          {
            situation: "Kuntosalijäsenyys",
            situationEn: "Gym membership",
            lines: [
              { speaker: "Asiakas", finnish: "Haluaisin liittyä kuntosalille.", english: "I would like to join the gym." },
              { speaker: "Henkilökunta", finnish: "Meillä on kuukausijäsenyys 30 euroa tai vuosijäsenyys 300 euroa.", english: "We have a monthly membership for 30 euros or an annual membership for 300 euros." },
              { speaker: "Asiakas", finnish: "Otan kuukausijäsenyyden. Mihin aikaan sali on auki?", english: "I'll take the monthly membership. What time is the gym open?" },
              { speaker: "Henkilökunta", finnish: "Maanantaista perjantaihin kuudesta kahteenkymmeneenkahteen.", english: "Monday to Friday from 6 to 22." },
            ],
          },
        ],
        vocabulary: [
          { word: "kuntosali", partOfSpeech: "noun", meaningEn: "gym", meaningVi: "phòng gym", example: "Menen kuntosalille.", exampleEn: "I go to the gym.", category: "Sports" },
          { word: "uimahalli", partOfSpeech: "noun", meaningEn: "swimming pool", meaningVi: "bể bơi", example: "Uimahalli on lähellä.", exampleEn: "The swimming pool is nearby.", category: "Sports" },
          { word: "jäsenyys", partOfSpeech: "noun", meaningEn: "membership", meaningVi: "thẻ thành viên", example: "Otan jäsenyyden.", exampleEn: "I take a membership.", category: "Sports" },
          { word: "harjoitella", partOfSpeech: "verb", meaningEn: "to exercise/train", meaningVi: "tập luyện", example: "Harjoittelen kolme kertaa viikossa.", exampleEn: "I train three times a week.", category: "Sports" },
          { word: "uida", partOfSpeech: "verb", meaningEn: "to swim", meaningVi: "bơi", example: "Uin uimahallissa.", exampleEn: "I swim at the swimming pool.", category: "Sports" },
          { word: "sauna", partOfSpeech: "noun", meaningEn: "sauna", meaningVi: "phòng xông hơi", example: "Sauna on uimahallin yhteydessä.", exampleEn: "The sauna is connected to the pool.", category: "Sports" },
          { word: "pukuhuone", partOfSpeech: "noun", meaningEn: "changing room", meaningVi: "phòng thay đồ", example: "Pukuhuone on vasemmalla.", exampleEn: "The changing room is on the left.", category: "Sports" },
          { word: "uima-allas", partOfSpeech: "noun", meaningEn: "swimming pool (basin)", meaningVi: "hồ bơi", example: "Uima-allas on 25 metriä.", exampleEn: "The pool is 25 meters.", category: "Sports" },
          { word: "juoksurata", partOfSpeech: "noun", meaningEn: "running track", meaningVi: "đường chạy", example: "Juoksen juoksuradalla.", exampleEn: "I run on the track.", category: "Sports" },
          { word: "venyttely", partOfSpeech: "noun", meaningEn: "stretching", meaningVi: "giãn cơ", example: "Venyttely on tärkeää.", exampleEn: "Stretching is important.", category: "Sports" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Täydennä urheilulauseet.",
            instructionEn: "Complete the sports sentences.",
            items: [
              { question: "Haluaisin liittyä ___. (gym)", answer: "kuntosalille", hint: "kunto____" },
              { question: "Uin ___. (at the swimming pool)", answer: "uimahallissa", hint: "uima____" },
              { question: "___ kolme kertaa viikossa. (I exercise)", answer: "Harjoittelen", hint: "H____" },
            ],
          },
        ],
        quiz: [
          { question: "Mitä 'kuntosali' tarkoittaa?", options: ["Swimming pool", "Gym", "Stadium", "Park"], answer: 1, explanation: "Kuntosali = gym (phòng gym)" },
          { question: "Mikä on 'uimahalli'?", options: ["Lake", "Beach", "Swimming pool", "Water park"], answer: 2, explanation: "Uimahalli = swimming pool (bể bơi)" },
          { question: "Miten sanot 'I swim'?", options: ["Uin", "Juoksen", "Kävelen", "Harjoittelen"], answer: 0, explanation: "Uin = I swim" },
          { question: "Mikä on 'sauna'?", options: ["Shower", "Sauna", "Bath", "Hot tub"], answer: 1, explanation: "Sauna is a Finnish invention - a steam bath" },
          { question: "Mitä 'venyttely' tarkoittaa?", options: ["Running", "Lifting", "Stretching", "Swimming"], answer: 2, explanation: "Venyttely = stretching (giãn cơ)" },
        ],
      },
    ],
  },
  {
    id: "yki-conv-housing",
    title: "Asuminen ja arki",
    titleEn: "Housing & Daily Routines",
    icon: "🏠",
    color: "from-green-500 to-teal-400",
    description: "Suomi asumiseen ja päivittäisiin rutiineihin.",
    descriptionEn: "Finnish for housing and daily routines.",
    pillar: "lessons",
    lessons: [
      {
        id: "conv-apartment",
        title: "Asunnon vuokraaminen",
        titleEn: "Renting an Apartment",
        icon: "🔑",
        level: "A2",
        theory: `### Asunnon vuokraaminen\n\nLearn to search, view, and rent apartments in Finland. Understand rental contracts and tenant rights.`,
        theoryEn: `### Renting an Apartment\n\nEssential vocabulary for finding and renting housing in Finland.`,
        dialogues: [
          {
            situation: "Asuntonäyttö",
            situationEn: "Apartment viewing",
            lines: [
              { speaker: "Vuokranantaja", finnish: "Tervetuloa katsomaan asuntoa! Tämä on kaksio.", english: "Welcome to view the apartment! This is a two-room flat." },
              { speaker: "Vuokralainen", finnish: "Paljonko vuokra on kuukaudessa?", english: "How much is the rent per month?" },
              { speaker: "Vuokranantaja", finnish: "Vuokra on 750 euroa, sisältää vesimaksun.", english: "The rent is 750 euros, including water." },
              { speaker: "Vuokralainen", finnish: "Sisältyykö sähkö?", english: "Is electricity included?" },
              { speaker: "Vuokranantaja", finnish: "Ei, sähkösopimus pitää tehdä itse.", english: "No, you need to make an electricity contract yourself." },
              { speaker: "Vuokralainen", finnish: "Milloin voisin muuttaa?", english: "When could I move in?" },
            ],
          },
        ],
        vocabulary: [
          { word: "asunto", partOfSpeech: "noun", meaningEn: "apartment", meaningVi: "căn hộ", example: "Etsin asuntoa.", exampleEn: "I'm looking for an apartment.", category: "Housing" },
          { word: "kaksio", partOfSpeech: "noun", meaningEn: "two-room flat", meaningVi: "căn hộ 2 phòng", example: "Asun kaksiossa.", exampleEn: "I live in a two-room flat.", category: "Housing" },
          { word: "yksiö", partOfSpeech: "noun", meaningEn: "studio apartment", meaningVi: "căn hộ studio", example: "Yksiö on pieni.", exampleEn: "The studio is small.", category: "Housing" },
          { word: "vuokranantaja", partOfSpeech: "noun", meaningEn: "landlord", meaningVi: "chủ nhà", example: "Vuokranantaja on ystävällinen.", exampleEn: "The landlord is friendly.", category: "Housing" },
          { word: "vuokralainen", partOfSpeech: "noun", meaningEn: "tenant", meaningVi: "người thuê", example: "Olen vuokralainen.", exampleEn: "I am a tenant.", category: "Housing" },
          { word: "vuokrasopimus", partOfSpeech: "noun", meaningEn: "rental contract", meaningVi: "hợp đồng thuê", example: "Allekirjoitan vuokrasopimuksen.", exampleEn: "I sign the rental contract.", category: "Housing" },
          { word: "takuuvuokra", partOfSpeech: "noun", meaningEn: "security deposit", meaningVi: "tiền đặt cọc", example: "Takuuvuokra on yksi kuukausi.", exampleEn: "The deposit is one month.", category: "Housing" },
          { word: "muuttaa", partOfSpeech: "verb", meaningEn: "to move", meaningVi: "chuyển nhà", example: "Muutan ensi kuussa.", exampleEn: "I move next month.", category: "Housing" },
          { word: "sähkösopimus", partOfSpeech: "noun", meaningEn: "electricity contract", meaningVi: "hợp đồng điện", example: "Teen sähkösopimuksen.", exampleEn: "I make an electricity contract.", category: "Housing" },
          { word: "taloyhtiö", partOfSpeech: "noun", meaningEn: "housing company", meaningVi: "ban quản lý tòa nhà", example: "Taloyhtiö hoitaa piha-alueen.", exampleEn: "The housing company maintains the yard.", category: "Housing" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Täydennä asuntokeskustelu.",
            instructionEn: "Complete the housing conversation.",
            items: [
              { question: "Paljonko ___ on kuukaudessa? (rent)", answer: "vuokra", hint: "v____" },
              { question: "Allekirjoitan ___. (rental contract)", answer: "vuokrasopimuksen", hint: "vuokra____" },
              { question: "Milloin voisin ___? (move in)", answer: "muuttaa", hint: "m____" },
            ],
          },
        ],
        quiz: [
          { question: "Mikä on 'kaksio'?", options: ["Studio", "Two-room flat", "House", "Office"], answer: 1, explanation: "Kaksio = two-room flat (căn hộ 2 phòng)" },
          { question: "Mitä 'vuokranantaja' tarkoittaa?", options: ["Tenant", "Landlord", "Neighbor", "Agent"], answer: 1, explanation: "Vuokranantaja = landlord (chủ nhà)" },
          { question: "Mikä on 'takuuvuokra'?", options: ["First month's rent", "Security deposit", "Insurance", "Moving fee"], answer: 1, explanation: "Takuuvuokra = security deposit (tiền đặt cọc)" },
          { question: "Miten sanot 'I'm looking for an apartment'?", options: ["Etsin asuntoa", "Ostan asuntoa", "Myyn asuntoa", "Vuokraan asuntoa"], answer: 0, explanation: "Etsin asuntoa = I'm looking for an apartment" },
          { question: "Mikä on 'taloyhtiö'?", options: ["Real estate agent", "Housing company", "Construction firm", "Insurance company"], answer: 1, explanation: "Taloyhtiö = housing company (ban quản lý tòa nhà)" },
        ],
      },
      {
        id: "conv-neighbours",
        title: "Naapurien kanssa",
        titleEn: "With Neighbours",
        icon: "👋",
        level: "A2",
        theory: `### Naapurien kanssa (With Neighbours)\n\nLearn to greet, chat, and handle common situations with Finnish neighbours.`,
        theoryEn: `### With Neighbours\n\nCommon phrases for interacting with neighbours in Finland.`,
        dialogues: [
          {
            situation: "Uusi naapuri",
            situationEn: "Meeting a new neighbour",
            lines: [
              { speaker: "Sinä", finnish: "Moi! Olen uusi naapuri. Nimeni on Hai.", english: "Hi! I'm the new neighbour. My name is Hai." },
              { speaker: "Naapuri", finnish: "Tervetuloa! Minä olen Matti. Mistä olet kotoisin?", english: "Welcome! I'm Matti. Where are you from?" },
              { speaker: "Sinä", finnish: "Olen Vietnamista. Muutin tänne viime viikolla.", english: "I'm from Vietnam. I moved here last week." },
              { speaker: "Naapuri", finnish: "Mukavaa! Jos tarvitset apua, voit aina koputtaa oveen.", english: "Nice! If you need help, you can always knock on the door." },
              { speaker: "Sinä", finnish: "Kiitos paljon! Se on ystävällistä.", english: "Thank you so much! That's kind." },
            ],
          },
        ],
        vocabulary: [
          { word: "naapuri", partOfSpeech: "noun", meaningEn: "neighbour", meaningVi: "hàng xóm", example: "Naapurini on mukava.", exampleEn: "My neighbour is nice.", category: "Social" },
          { word: "kerrostalo", partOfSpeech: "noun", meaningEn: "apartment building", meaningVi: "chung cư", example: "Asun kerrostalossa.", exampleEn: "I live in an apartment building.", category: "Housing" },
          { word: "rappukäytävä", partOfSpeech: "noun", meaningEn: "stairwell", meaningVi: "cầu thang", example: "Rappukäytävä on siisti.", exampleEn: "The stairwell is clean.", category: "Housing" },
          { word: "taloyhtiön säännöt", partOfSpeech: "noun", meaningEn: "building rules", meaningVi: "nội quy tòa nhà", example: "Lue taloyhtiön säännöt.", exampleEn: "Read the building rules.", category: "Housing" },
          { word: "hiljaisuusaika", partOfSpeech: "noun", meaningEn: "quiet hours", meaningVi: "giờ yên lặng", example: "Hiljaisuusaika on klo 22-07.", exampleEn: "Quiet hours are 22-07.", category: "Housing" },
          { word: "pesutuva", partOfSpeech: "noun", meaningEn: "laundry room", meaningVi: "phòng giặt", example: "Pesutuva on kellarissa.", exampleEn: "The laundry room is in the basement.", category: "Housing" },
          { word: "koputtaa", partOfSpeech: "verb", meaningEn: "to knock", meaningVi: "gõ cửa", example: "Koputan oveen.", exampleEn: "I knock on the door.", category: "Social" },
          { word: "tervetuloa", partOfSpeech: "interjection", meaningEn: "welcome", meaningVi: "chào mừng", example: "Tervetuloa taloon!", exampleEn: "Welcome to the building!", category: "Social" },
          { word: "apu", partOfSpeech: "noun", meaningEn: "help", meaningVi: "sự giúp đỡ", example: "Tarvitsen apua.", exampleEn: "I need help.", category: "Social" },
          { word: "ystävällinen", partOfSpeech: "adjective", meaningEn: "friendly/kind", meaningVi: "thân thiện", example: "Naapurini on ystävällinen.", exampleEn: "My neighbour is friendly.", category: "Social" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Täydennä naapurikeskustelu.",
            instructionEn: "Complete the neighbour conversation.",
            items: [
              { question: "Olen uusi ___. (neighbour)", answer: "naapuri", hint: "n____" },
              { question: "___ on klo 22-07. (quiet hours)", answer: "Hiljaisuusaika", hint: "H____" },
              { question: "Jos tarvitset ___, voit koputtaa. (help)", answer: "apua", hint: "a____" },
            ],
          },
        ],
        quiz: [
          { question: "Mitä 'naapuri' tarkoittaa?", options: ["Friend", "Neighbour", "Colleague", "Roommate"], answer: 1, explanation: "Naapuri = neighbour (hàng xóm)" },
          { question: "Mikä on 'hiljaisuusaika'?", options: ["Lunch break", "Quiet hours", "Business hours", "Holiday"], answer: 1, explanation: "Hiljaisuusaika = quiet hours (giờ yên lặng)" },
          { question: "Mitä 'pesutuva' tarkoittaa?", options: ["Kitchen", "Bathroom", "Laundry room", "Storage room"], answer: 2, explanation: "Pesutuva = laundry room (phòng giặt)" },
          { question: "Miten sanot 'I knock on the door'?", options: ["Avaan oven", "Suljen oven", "Koputan oveen", "Lukitsen oven"], answer: 2, explanation: "Koputan oveen = I knock on the door" },
          { question: "Mikä on 'kerrostalo'?", options: ["House", "Apartment building", "Office", "School"], answer: 1, explanation: "Kerrostalo = apartment building (chung cư)" },
        ],
      },
      {
        id: "conv-weather",
        title: "Säästä puhuminen",
        titleEn: "Talking About Weather",
        icon: "🌦️",
        level: "A2",
        theory: `### Säästä puhuminen (Talking About Weather)\n\nWeather talk is essential in Finland! Learn seasons, temperatures, and weather small talk.`,
        theoryEn: `### Talking About Weather\n\nWeather is a universal topic in Finland - learn essential weather vocabulary.`,
        dialogues: [
          {
            situation: "Sääjuttu naapurin kanssa",
            situationEn: "Weather chat with a neighbour",
            lines: [
              { speaker: "Sinä", finnish: "Voi, onpa kylmä tänään!", english: "Oh, it's so cold today!" },
              { speaker: "Naapuri", finnish: "Joo, pakkasta on kaksikymmentä astetta!", english: "Yeah, it's minus twenty degrees!" },
              { speaker: "Sinä", finnish: "Milloin kevät tulee?", english: "When does spring come?" },
              { speaker: "Naapuri", finnish: "Yleensä huhtikuussa. Mutta tänä vuonna ehkä toukokuussa.", english: "Usually in April. But this year maybe in May." },
              { speaker: "Sinä", finnish: "Minä kaipaan kesää!", english: "I miss summer!" },
              { speaker: "Naapuri", finnish: "Me kaikki kaipaemme! Mutta lumi on kaunista.", english: "We all do! But the snow is beautiful." },
            ],
          },
        ],
        vocabulary: [
          { word: "sää", partOfSpeech: "noun", meaningEn: "weather", meaningVi: "thời tiết", example: "Millainen sää on tänään?", exampleEn: "What's the weather like today?", category: "Weather" },
          { word: "pakkanen", partOfSpeech: "noun", meaningEn: "frost/freezing", meaningVi: "băng giá", example: "Pakkasta on 20 astetta.", exampleEn: "It's minus 20 degrees.", category: "Weather" },
          { word: "lumi", partOfSpeech: "noun", meaningEn: "snow", meaningVi: "tuyết", example: "Ulkona sataa lunta.", exampleEn: "It's snowing outside.", category: "Weather" },
          { word: "sade", partOfSpeech: "noun", meaningEn: "rain", meaningVi: "mưa", example: "Huomenna tulee sadetta.", exampleEn: "Tomorrow there will be rain.", category: "Weather" },
          { word: "aurinko", partOfSpeech: "noun", meaningEn: "sun", meaningVi: "mặt trời", example: "Aurinko paistaa.", exampleEn: "The sun is shining.", category: "Weather" },
          { word: "tuuli", partOfSpeech: "noun", meaningEn: "wind", meaningVi: "gió", example: "Tuuli on kova.", exampleEn: "The wind is strong.", category: "Weather" },
          { word: "kevät", partOfSpeech: "noun", meaningEn: "spring", meaningVi: "mùa xuân", example: "Kevät tulee huhtikuussa.", exampleEn: "Spring comes in April.", category: "Weather" },
          { word: "kesä", partOfSpeech: "noun", meaningEn: "summer", meaningVi: "mùa hè", example: "Kesä on lämmin.", exampleEn: "Summer is warm.", category: "Weather" },
          { word: "syksy", partOfSpeech: "noun", meaningEn: "autumn", meaningVi: "mùa thu", example: "Syksyllä sataa paljon.", exampleEn: "It rains a lot in autumn.", category: "Weather" },
          { word: "talvi", partOfSpeech: "noun", meaningEn: "winter", meaningVi: "mùa đông", example: "Talvi on pitkä Suomessa.", exampleEn: "Winter is long in Finland.", category: "Weather" },
        ],
        exercises: [
          {
            type: "matching",
            instruction: "Yhdistä vuodenajat kuvauksiinsa.",
            instructionEn: "Match the seasons with their descriptions.",
            items: [
              { question: "Kevät", answer: "Spring", hint: "k____" },
              { question: "Kesä", answer: "Summer", hint: "k____" },
              { question: "Syksy", answer: "Autumn", hint: "s____" },
              { question: "Talvi", answer: "Winter", hint: "t____" },
            ],
          },
        ],
        quiz: [
          { question: "Miten sanot 'What's the weather like today?'", options: ["Millainen sää on tänään?", "Mikä päivä on tänään?", "Mitä kello on?", "Miten menee?"], answer: 0, explanation: "'Millainen sää on tänään?' = What's the weather like today?" },
          { question: "Mitä 'pakkanen' tarkoittaa?", options: ["Heat", "Frost/Freezing", "Rain", "Snow"], answer: 1, explanation: "Pakkanen = frost/freezing (băng giá)" },
          { question: "Mikä vuodenaika on 'kesä'?", options: ["Spring", "Summer", "Autumn", "Winter"], answer: 1, explanation: "Kesä = summer (mùa hè)" },
          { question: "Miten sanot 'It's snowing'?", options: ["Sataa lunta", "Tuulee kovaa", "Aurinko paistaa", "On kylmä"], answer: 0, explanation: "'Sataa lunta' = It's snowing" },
          { question: "Mikä on 'tuuli'?", options: ["Cloud", "Sun", "Wind", "Snow"], answer: 2, explanation: "Tuuli = wind (gió)" },
        ],
      },
      {
        id: "conv-phone-calls",
        title: "Puhelimessa",
        titleEn: "On the Phone",
        icon: "📱",
        level: "A2",
        theory: `### Puhelimessa (On the Phone)\n\nLearn to make calls, leave messages, and handle phone conversations in Finnish.`,
        theoryEn: `### On the Phone\n\nPhone conversation skills for daily life and appointments.`,
        dialogues: [
          {
            situation: "Ajanvaraus puhelimitse",
            situationEn: "Making an appointment by phone",
            lines: [
              { speaker: "Vastaanottaja", finnish: "Helsingin terveysasema, hyvää päivää!", english: "Helsinki health station, good day!" },
              { speaker: "Soittaja", finnish: "Hyvää päivää! Haluaisin varata ajan lääkärille.", english: "Good day! I'd like to book an appointment with a doctor." },
              { speaker: "Vastaanottaja", finnish: "Mikä on nimenne ja henkilötunnuksenne?", english: "What is your name and social security number?" },
              { speaker: "Soittaja", finnish: "Nimeni on Hai Nguyen. Henkilötunnus on...", english: "My name is Hai Nguyen. My SSN is..." },
              { speaker: "Vastaanottaja", finnish: "Ensi tiistaina kello kymmenen sopii?", english: "Next Tuesday at ten works?" },
              { speaker: "Soittaja", finnish: "Kyllä, sopii hyvin. Kiitos!", english: "Yes, that works well. Thank you!" },
            ],
          },
        ],
        vocabulary: [
          { word: "puhelin", partOfSpeech: "noun", meaningEn: "phone", meaningVi: "điện thoại", example: "Soitan puhelimella.", exampleEn: "I call on the phone.", category: "Technology" },
          { word: "soittaa", partOfSpeech: "verb", meaningEn: "to call", meaningVi: "gọi điện", example: "Soitan huomenna.", exampleEn: "I'll call tomorrow.", category: "Social" },
          { word: "ajanvaraus", partOfSpeech: "noun", meaningEn: "appointment booking", meaningVi: "đặt lịch hẹn", example: "Teen ajanvarauksen.", exampleEn: "I make an appointment.", category: "Services" },
          { word: "henkilötunnus", partOfSpeech: "noun", meaningEn: "social security number", meaningVi: "số CMND", example: "Mikä on henkilötunnuksesi?", exampleEn: "What is your SSN?", category: "Services" },
          { word: "viesti", partOfSpeech: "noun", meaningEn: "message", meaningVi: "tin nhắn", example: "Jätän viestin.", exampleEn: "I leave a message.", category: "Social" },
          { word: "varata", partOfSpeech: "verb", meaningEn: "to book/reserve", meaningVi: "đặt/đăng ký", example: "Varaan ajan.", exampleEn: "I book an appointment.", category: "Services" },
          { word: "peruuttaa", partOfSpeech: "verb", meaningEn: "to cancel", meaningVi: "hủy", example: "Peruutan ajan.", exampleEn: "I cancel the appointment.", category: "Services" },
          { word: "terveysasema", partOfSpeech: "noun", meaningEn: "health station", meaningVi: "trạm y tế", example: "Soitan terveysasemalle.", exampleEn: "I call the health station.", category: "Health" },
          { word: "takaisinsoitto", partOfSpeech: "noun", meaningEn: "callback", meaningVi: "gọi lại", example: "Pyydän takaisinsoittoa.", exampleEn: "I request a callback.", category: "Services" },
          { word: "sopii", partOfSpeech: "verb", meaningEn: "it works/suits", meaningVi: "phù hợp/được", example: "Tiistai sopii hyvin.", exampleEn: "Tuesday works well.", category: "Social" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Täydennä puhelinkeskustelu.",
            instructionEn: "Complete the phone conversation.",
            items: [
              { question: "Haluaisin ___ ajan lääkärille. (book)", answer: "varata", hint: "v____" },
              { question: "Mikä on ___ ja henkilötunnuksenne? (your name)", answer: "nimenne", hint: "n____" },
              { question: "Ensi tiistaina kello kymmenen ___? (works)", answer: "sopii", hint: "s____" },
            ],
          },
        ],
        quiz: [
          { question: "Miten sanot 'I'd like to book an appointment'?", options: ["Haluaisin varata ajan", "Haluaisin peruuttaa ajan", "Haluaisin soittaa", "Haluaisin lähettää viestin"], answer: 0, explanation: "'Haluaisin varata ajan' = I'd like to book an appointment" },
          { question: "Mitä 'peruuttaa' tarkoittaa?", options: ["To book", "To cancel", "To change", "To confirm"], answer: 1, explanation: "Peruuttaa = to cancel (hủy)" },
          { question: "Mikä on 'henkilötunnus'?", options: ["Phone number", "Social security number", "Address", "Email"], answer: 1, explanation: "Henkilötunnus = social security number (số CMND)" },
          { question: "Miten sanot 'Tuesday works well'?", options: ["Tiistai on hyvä", "Tiistai sopii hyvin", "Tiistai tulee", "Tiistai menee"], answer: 1, explanation: "'Tiistai sopii hyvin' = Tuesday works well" },
          { question: "Mitä 'takaisinsoitto' tarkoittaa?", options: ["Voicemail", "Callback", "Missed call", "Text message"], answer: 1, explanation: "Takaisinsoitto = callback (gọi lại)" },
        ],
      },
      {
        id: "conv-work",
        title: "Työpaikalla",
        titleEn: "At the Workplace",
        icon: "💼",
        level: "A2",
        theory: `### Työpaikalla (At the Workplace)\n\nLearn basic workplace Finnish: greetings, asking for help, meeting colleagues, and common office phrases.`,
        theoryEn: `### At the Workplace\n\nEssential workplace vocabulary and phrases.`,
        dialogues: [
          {
            situation: "Ensimmäinen työpäivä",
            situationEn: "First day at work",
            lines: [
              { speaker: "Esimies", finnish: "Tervetuloa meille! Minä olen Anna, esimiehesi.", english: "Welcome to us! I'm Anna, your supervisor." },
              { speaker: "Sinä", finnish: "Kiitos! Olen tosi innoissani.", english: "Thanks! I'm really excited." },
              { speaker: "Esimies", finnish: "Tässä on työpisteesi. Tarvitsetko jotain?", english: "Here is your workstation. Do you need anything?" },
              { speaker: "Sinä", finnish: "Mikä on WiFi-salasana?", english: "What's the WiFi password?" },
              { speaker: "Esimies", finnish: "Se on ilmoitustaululla. Kahvitauko on kello kymmenen.", english: "It's on the notice board. Coffee break is at ten." },
            ],
          },
        ],
        vocabulary: [
          { word: "työpaikka", partOfSpeech: "noun", meaningEn: "workplace", meaningVi: "nơi làm việc", example: "Menen työpaikalle.", exampleEn: "I go to work.", category: "Work" },
          { word: "esimies", partOfSpeech: "noun", meaningEn: "supervisor/boss", meaningVi: "sếp", example: "Esimieheni on mukava.", exampleEn: "My boss is nice.", category: "Work" },
          { word: "työkaveri", partOfSpeech: "noun", meaningEn: "colleague", meaningVi: "đồng nghiệp", example: "Työkaverini on hauska.", exampleEn: "My colleague is funny.", category: "Work" },
          { word: "kahvitauko", partOfSpeech: "noun", meaningEn: "coffee break", meaningVi: "giờ nghỉ cà phê", example: "Kahvitauko on kello 10.", exampleEn: "Coffee break is at 10.", category: "Work" },
          { word: "kokous", partOfSpeech: "noun", meaningEn: "meeting", meaningVi: "cuộc họp", example: "Meillä on kokous huomenna.", exampleEn: "We have a meeting tomorrow.", category: "Work" },
          { word: "työpiste", partOfSpeech: "noun", meaningEn: "workstation", meaningVi: "chỗ ngồi làm việc", example: "Tämä on työpisteeni.", exampleEn: "This is my workstation.", category: "Work" },
          { word: "palkka", partOfSpeech: "noun", meaningEn: "salary", meaningVi: "lương", example: "Palkka maksetaan kuun lopussa.", exampleEn: "Salary is paid at the end of the month.", category: "Work" },
          { word: "lomaday", partOfSpeech: "noun", meaningEn: "vacation day", meaningVi: "ngày nghỉ phép", example: "Minulla on lomapäivä.", exampleEn: "I have a vacation day.", category: "Work" },
          { word: "työsopimus", partOfSpeech: "noun", meaningEn: "employment contract", meaningVi: "hợp đồng lao động", example: "Allekirjoitan työsopimuksen.", exampleEn: "I sign the employment contract.", category: "Work" },
          { word: "ylityö", partOfSpeech: "noun", meaningEn: "overtime", meaningVi: "tăng ca", example: "Teen ylitöitä tänään.", exampleEn: "I'm doing overtime today.", category: "Work" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Täydennä työkeskustelu.",
            instructionEn: "Complete the work conversation.",
            items: [
              { question: "Minä olen Anna, ___. (your supervisor)", answer: "esimiehesi", hint: "esimie____" },
              { question: "Tässä on ___. (your workstation)", answer: "työpisteesi", hint: "työ____" },
              { question: "___ on kello kymmenen. (coffee break)", answer: "Kahvitauko", hint: "K____" },
            ],
          },
        ],
        quiz: [
          { question: "Mitä 'työkaveri' tarkoittaa?", options: ["Boss", "Colleague", "Customer", "Friend"], answer: 1, explanation: "Työkaveri = colleague (đồng nghiệp)" },
          { question: "Mikä on 'kahvitauko'?", options: ["Lunch break", "Coffee break", "Meeting", "Holiday"], answer: 1, explanation: "Kahvitauko = coffee break (giờ nghỉ cà phê)" },
          { question: "Mitä 'kokous' tarkoittaa?", options: ["Party", "Meeting", "Lunch", "Break"], answer: 1, explanation: "Kokous = meeting (cuộc họp)" },
          { question: "Mikä on 'palkka'?", options: ["Tax", "Salary", "Bonus", "Fee"], answer: 1, explanation: "Palkka = salary (lương)" },
          { question: "Miten sanot 'I'm doing overtime'?", options: ["Teen ylitöitä", "Teen lomaa", "Teen taukoa", "Teen sopimusta"], answer: 0, explanation: "'Teen ylitöitä' = I'm doing overtime" },
        ],
      },
      {
        id: "conv-emergency",
        title: "Hätätilanteessa",
        titleEn: "In an Emergency",
        icon: "🚨",
        level: "A2",
        theory: `### Hätätilanteessa (In an Emergency)\n\nCritical phrases for emergency situations in Finland. The emergency number is **112**.`,
        theoryEn: `### In an Emergency\n\nKnow the critical phrases for emergencies. Finland's emergency number is **112**.`,
        dialogues: [
          {
            situation: "Soitto hätänumeroon",
            situationEn: "Calling the emergency number",
            lines: [
              { speaker: "Päivystäjä", finnish: "Hätäkeskus, mikä hätänä?", english: "Emergency center, what's the emergency?" },
              { speaker: "Soittaja", finnish: "Tarvitsen ambulanssia! Ystäväni kaatui ja ei liiku.", english: "I need an ambulance! My friend fell and isn't moving." },
              { speaker: "Päivystäjä", finnish: "Mikä on osoitteenne?", english: "What is your address?" },
              { speaker: "Soittaja", finnish: "Mannerheimintie 42, Helsinki.", english: "Mannerheimintie 42, Helsinki." },
              { speaker: "Päivystäjä", finnish: "Ambulanssi on matkalla. Pysykää paikalla.", english: "An ambulance is on its way. Stay where you are." },
            ],
          },
        ],
        vocabulary: [
          { word: "hätänumero", partOfSpeech: "noun", meaningEn: "emergency number", meaningVi: "số khẩn cấp", example: "Hätänumero on 112.", exampleEn: "The emergency number is 112.", category: "Emergency" },
          { word: "ambulanssi", partOfSpeech: "noun", meaningEn: "ambulance", meaningVi: "xe cứu thương", example: "Tarvitsen ambulanssin!", exampleEn: "I need an ambulance!", category: "Emergency" },
          { word: "paloauto", partOfSpeech: "noun", meaningEn: "fire truck", meaningVi: "xe cứu hỏa", example: "Paloauto tulee.", exampleEn: "The fire truck is coming.", category: "Emergency" },
          { word: "poliisi", partOfSpeech: "noun", meaningEn: "police", meaningVi: "cảnh sát", example: "Soitan poliisille.", exampleEn: "I call the police.", category: "Emergency" },
          { word: "tulipalo", partOfSpeech: "noun", meaningEn: "fire", meaningVi: "hỏa hoạn", example: "Talossa on tulipalo!", exampleEn: "There's a fire in the building!", category: "Emergency" },
          { word: "onnettomuus", partOfSpeech: "noun", meaningEn: "accident", meaningVi: "tai nạn", example: "Tiellä on onnettomuus.", exampleEn: "There's an accident on the road.", category: "Emergency" },
          { word: "auttaa", partOfSpeech: "verb", meaningEn: "to help", meaningVi: "giúp đỡ", example: "Voitteko auttaa?", exampleEn: "Can you help?", category: "Emergency" },
          { word: "loukkaantunut", partOfSpeech: "adjective", meaningEn: "injured", meaningVi: "bị thương", example: "Hän on loukkaantunut.", exampleEn: "He/She is injured.", category: "Emergency" },
          { word: "hätäkeskus", partOfSpeech: "noun", meaningEn: "emergency center", meaningVi: "trung tâm cấp cứu", example: "Soitin hätäkeskukseen.", exampleEn: "I called the emergency center.", category: "Emergency" },
          { word: "ensiapu", partOfSpeech: "noun", meaningEn: "first aid", meaningVi: "sơ cứu", example: "Osaatko ensiapua?", exampleEn: "Do you know first aid?", category: "Emergency" },
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Täydennä hätäkeskustelut.",
            instructionEn: "Complete the emergency conversations.",
            items: [
              { question: "Suomen ___ on 112. (emergency number)", answer: "hätänumero", hint: "h____" },
              { question: "Tarvitsen ___! (an ambulance)", answer: "ambulanssin", hint: "a____" },
              { question: "Talossa on ___! (a fire)", answer: "tulipalo", hint: "t____" },
            ],
          },
        ],
        quiz: [
          { question: "Mikä on Suomen hätänumero?", options: ["911", "112", "999", "110"], answer: 1, explanation: "Finland's emergency number is 112" },
          { question: "Miten sanot 'I need an ambulance'?", options: ["Tarvitsen poliisin", "Tarvitsen ambulanssin", "Tarvitsen paloauton", "Tarvitsen apua"], answer: 1, explanation: "'Tarvitsen ambulanssin' = I need an ambulance" },
          { question: "Mitä 'tulipalo' tarkoittaa?", options: ["Flood", "Fire", "Storm", "Earthquake"], answer: 1, explanation: "Tulipalo = fire (hỏa hoạn)" },
          { question: "Mikä on 'ensiapu'?", options: ["First aid", "Medicine", "Hospital", "Doctor"], answer: 0, explanation: "Ensiapu = first aid (sơ cứu)" },
          { question: "Miten sanot 'There's an accident'?", options: ["On tulipalo", "On onnettomuus", "On hätä", "On vaaraa"], answer: 1, explanation: "'On onnettomuus' = There's an accident" },
        ],
      },
    ],
  },
];
