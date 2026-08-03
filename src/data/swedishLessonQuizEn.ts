/**
 * @file swedishLessonQuizEn.ts
 * @description English versions of the self-check quiz questions defined in
 *              swedishLessonDeep.ts (A1 batch). The original data only stores
 *              Vietnamese question text, so this map supplies the English
 *              mirror used when the UI language is set to EN.
 *              Keyed by lesson id, index-aligned with LESSON_DEEP[id].quiz.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export interface QuizEn {
  q: string;
  options: string[];
}

export const LESSON_QUIZ_EN: Record<string, QuizEn[]> = {
  "a1-pron": [
    {
      q: "Which sound does 'sjuksköterska' begin with?",
      options: ["s as in English", "a soft sh", "the rounded-lip sj-sound", "the Chinese ch"],
    },
    { q: "Which word has a SHORT vowel?", options: ["vit", "mat", "vitt", "hus"] },
    {
      q: "Where does the stress fall in 'hej-då'?",
      options: ["First syllable", "Last syllable", "No stress at all", "Both equally"],
    },
  ],
  "a1-self": [
    {
      q: "Which sentence is CORRECT for 'I am 28 years old'?",
      options: ["Jag 28 år.", "Jag har 28 år.", "Jag är 28 år.", "Jag är 28 år gammal det."],
    },
    {
      q: "Which possessive form goes with the noun 'ett namn'?",
      options: ["min", "mitt", "mina", "min or mitt"],
    },
    {
      q: "What is the most natural way to ask 'What do you do for a living?'",
      options: ["Vad är ditt jobb?", "Vad gör du för jobb?", "Vad jobbar du med?", "Hur jobbar du?"],
    },
  ],
  "a1-num": [
    { q: "How is 27 written out?", options: ["tjugoseven", "tjugosju", "tjugiseven", "tjugesju"] },
    {
      q: "How do you say 'klockan 14:45' the YKI way?",
      options: [
        "Klockan fjorton fyrtiofem",
        "Klockan fjorton och fyrtiofem",
        "Kvart i tre på eftermiddagen",
        "Both B and C are fine",
      ],
    },
    {
      q: "How is the decimal 3,5 read out?",
      options: ["tre punkt fem", "tre komma fem", "tre och en halv", "Both B and C"],
    },
  ],
  "a1-alphabet": [
    { q: "How many letters are there in the Swedish alphabet?", options: ["26", "27", "28", "29"] },
    {
      q: "How is the letter Y pronounced in Swedish?",
      options: ["Like English 'y'", "A rounded-lip i", "A long u", "A short j"],
    },
    {
      q: "In a dictionary, where does the word 'år' appear?",
      options: ["At the start (after A)", "In the middle (near O)", "At the very end (after Z)", "It is not listed"],
    },
  ],
  "a1-greetings": [
    {
      q: "When do you use 'God natt'?",
      options: ["At 7 pm", "At 9 pm", "Right before going to sleep", "When meeting someone in the evening"],
    },
    {
      q: "How does 'Ursäkta' differ from 'Förlåt'?",
      options: [
        "They mean the same",
        "Ursäkta gets attention / excuses you, Förlåt apologises for a mistake",
        "The other way round",
        "Ursäkta is more formal than Förlåt",
      ],
    },
    {
      q: "What is the most polite reply to 'Tack så mycket'?",
      options: ["Inget problem", "Varsågod", "Ja tack", "Hej då"],
    },
  ],
  "a1-pronouns": [
    { q: "Which possessive goes with 'ett namn' (a name)?", options: ["min", "mitt", "mina", "mig"] },
    {
      q: "Which sentence is CORRECT for 'I see him'?",
      options: ["Jag ser han.", "Jag ser honom.", "Jag ser hans.", "Jag ser hen."],
    },
    {
      q: "When is 'hen' used?",
      options: ["Only for children", "As a gender-neutral pronoun", "Only for women", "For plurals"],
    },
  ],
  "a1-en-ett": [
    { q: "Which word is an ett-word?", options: ["bil (car)", "hund (dog)", "barn (child)", "kvinna (woman)"] },
    { q: "What is the definite form of 'en bok' (a book)?", options: ["boket", "boken", "böker", "bok"] },
    { q: "How do you write 'that child'?", options: ["barnen", "barnet", "ett barn", "barna"] },
  ],
  "a1-questions": [
    { q: "How do you correctly say 'Where are you going?'", options: ["Var går du?", "Vart går du?", "När går du?", "Hur går du?"] },
    {
      q: "What is the best way to ask a price?",
      options: ["Hur många pengar?", "Hur mycket kostar det?", "Vad pris?", "Vem betalar?"],
    },
    { q: "Which question word asks for a NAME / person?", options: ["Vad?", "Vem?", "Var?", "Varför?"] },
  ],
  "a1-colors-clothes": [
    { q: "How is the adjective 'röd' written with 'ett hus'?", options: ["röd hus", "rött hus", "röda hus", "röden hus"] },
    {
      q: "What is the plural of 'en blå tröja' (a blue jumper)?",
      options: ["blå tröjor", "blåa tröjor", "Both A and B are accepted", "blått tröjor"],
    },
    {
      q: "When shopping, which is the most polite way to ask for another size?",
      options: ["Har ni mindre?", "Jag vill ha mindre.", "Har ni den här i en mindre storlek?", "Mindre, tack."],
    },
  ],
  "a1-body-health": [
    { q: "What is the plural of 'ett öga' (an eye)?", options: ["ögor", "ögon", "ögen", "ögat"] },
    {
      q: "Which sentence correctly says 'I have a headache'?",
      options: ["Jag har huvud ont.", "Jag är ont huvud.", "Jag har ont i huvudet.", "Mitt huvud är ont."],
    },
    {
      q: "In Finland, what is the number 116 117 for?",
      options: ["Police", "Fire brigade", "Out-of-hours medical advice", "Fire alarm"],
    },
  ],
  "a1-daily-routine": [
    {
      q: "How do you write 'at 7 in the evening'?",
      options: ["sju på morgonen", "klockan sju på kvällen", "klockan sju på natten", "sjukvällen"],
    },
    { q: "Which verb form is used in 'jag äter'?", options: ["Infinitiv", "Presens", "Preteritum", "Imperativ"] },
    {
      q: "How does describing your routine help the YKI A1 speaking test?",
      options: ["It does not", "It is a very common task type", "Only for writing", "Only for reading"],
    },
  ],
  "a1-hobbies": [
    {
      q: "Which sentence correctly says 'I like cooking'?",
      options: ["Jag tycker om laga.", "Jag tycker om att laga.", "Jag tycker om lagar.", "Jag tycker att laga."],
    },
    {
      q: "In which sentence is dropping 'att' correct?",
      options: ["Jag vill att resa.", "Jag vill resa.", "Jag gillar resa.", "Jag tycker om resa."],
    },
    {
      q: "How do you correctly say 'I don't like coffee'?",
      options: [
        "Jag inte tycker om kaffe.",
        "Jag tycker om inte kaffe.",
        "Jag tycker inte om kaffe.",
        "Jag tycker om kaffe inte.",
      ],
    },
  ],
  "a1-doctor": [
    {
      q: "You have had stomach pain for 5 days - which sentence is best?",
      options: [
        "Jag har ont mage 5 dagar.",
        "Jag har ont i magen sedan fem dagar.",
        "Min mage gör ont 5 dagar.",
        "Jag är ont mage.",
      ],
    },
    { q: "What is a sick-leave certificate called?", options: ["sjukrecept", "sjukintyg", "sjuksköterska", "sjuktagare"] },
    {
      q: "How do you correctly say 'I am allergic to penicillin'?",
      options: [
        "Jag har allergi mot penicillin.",
        "Jag är allergisk mot penicillin.",
        "Jag allergisk penicillin.",
        "Min allergi är penicillin.",
      ],
    },
  ],
  "a1-shopping": [
    {
      q: "What is the best way to ask 'How much is this jumper?'",
      options: [
        "Hur många kostar tröjan?",
        "Hur mycket är tröjan kostar?",
        "Hur mycket kostar tröjan?",
        "Vad mycket är tröjan?",
      ],
    },
    {
      q: "The cashier asks 'Vill du ha en påse?' - what is the politest reply?",
      options: ["Ja.", "Nej.", "Ja tack, en stor.", "Påse, ja."],
    },
    { q: "What is the K-Market loyalty card called?", options: ["S-mobiili", "K-Plussa", "Bonuskort", "Stamkund"] },
  ],
};

export const lessonQuizEn = (id: string, index: number): QuizEn | undefined =>
  LESSON_QUIZ_EN[id]?.[index];
