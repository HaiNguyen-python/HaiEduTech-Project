/**
 * @file toeicLecturesExpansion4.ts
 * @description Wave 4 - 12 new TOEIC lectures (English only) covering Part 2
 * question traps, Part 3/4 paraphrase tracking, Part 5 verb forms and
 * prepositions, Part 6 discourse connectors, Part 7 double/triple passages,
 * plus Speaking Q11 and Writing Q8 response templates.
 * Each lecture: 3 trap alerts, 4 technique steps, 3 practice questions,
 * 6 vocabulary highlights and 5 quiz questions.
 *
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type {
  ToeicLecture, ToeicTrap, ToeicStrategyStep, ToeicPracticeQuestion,
  ToeicVocabHighlight, ToeicQuizQuestion,
} from "./toeicLecturesData";

/* Helpers: content is authored in English only, so the *Vi mirror fields
   simply reuse the English strings to satisfy the shared lecture type. */
const trap = (t: string, why: string): ToeicTrap => ({ trap: t, trapVi: t, why, whyVi: why });

const step = (n: number, title: string, description: string, example?: string): ToeicStrategyStep =>
  ({ step: n, title, titleVi: title, description, descriptionVi: description, example });

const pq = (
  context: string, question: string, options: string[], answer: number, explanation: string,
): ToeicPracticeQuestion =>
  ({ context, contextVi: context, question, options, answer, explanation, explanationVi: explanation });

const vh = (word: string, definition: string, example: string, businessContext?: string): ToeicVocabHighlight =>
  ({ word, definition, definitionVi: definition, example, businessContext });

const q = (question: string, options: string[], answer: number, explanation: string): ToeicQuizQuestion =>
  ({ question, options, answer, explanation });

type LectureDraft = Omit<ToeicLecture, "titleVi" | "descriptionVi" | "businessContextVi" | "proSpeedTipVi">;

const lecture = (d: LectureDraft): ToeicLecture => ({
  ...d,
  titleVi: d.title,
  descriptionVi: d.description,
  businessContextVi: d.businessContext,
  proSpeedTipVi: d.proSpeedTip,
});

/* ===================== 1. PART 2 - QUESTION-TYPE TRAPS ===================== */
const part2SameWordTrap = lecture({
  id: "toeic-part2-same-word-trap",
  title: "Part 2 - The Same-Word Trap",
  category: "listening",
  parts: ["Part 2"],
  icon: "🎧",
  duration: "16 min",
  level: "foundation",
  targetScore: "450+",
  description:
    "In Part 2 the option that repeats a word from the question is almost always wrong. This lecture trains you to hear the repetition, reject it, and choose the answer that responds to the question function instead.",
  trapAlerts: [
    trap("An option repeating a word from the question", "ETS deliberately recycles a question word so a nervous listener recognises it and selects it."),
    trap("Similar-sounding words: report / reporter, fair / fare", "Sound overlap feels familiar under time pressure but changes the meaning completely."),
    trap("A grammatically perfect answer to a different question type", "A yes/no answer given to a Wh- question is fluent English but wrong here."),
  ],
  coreTechnique: [
    step(1, "Catch the first two words", "The first two words fix the question type: Where, When, Who, How long, Do you, Would you, Should we."),
    step(2, "Predict the answer shape", "Where expects a place, When expects a time, Who expects a person or department, How long expects a duration."),
    step(3, "Reject repetition", "If an option repeats a key noun or verb from the question, mark it as suspect immediately."),
    step(4, "Accept indirect answers", "\"I'll check the schedule\" is a valid reply to \"When does the training start?\" - relevance beats directness."),
  ],
  practiceSet: [
    pq("Question: \"Where did you put the quarterly report?\"", "Which reply is correct?",
      ["I reported it yesterday.", "On the shelf behind your desk.", "The reporter is late.", "Yes, quarterly."],
      1, "Where needs a place. The other options recycle report or reporter as sound traps."),
    pq("Question: \"When will the shipment arrive?\"", "Which reply is correct?",
      ["At the loading dock.", "Not until Thursday.", "Yes, it shipped.", "By courier."],
      1, "When needs a time. Place, yes/no and method answers all mismatch the question type."),
    pq("Question: \"Who is handling the vendor contracts now?\"", "Which reply is correct?",
      ["Since last quarter.", "In the legal office.", "Someone from procurement.", "Yes, they are handled."],
      2, "Who needs a person or department; procurement satisfies that without naming an individual."),
  ],
  businessContext: "Part 2 mirrors quick corridor exchanges at work, where colleagues answer indirectly and rarely repeat your wording.",
  proSpeedTip: "Decide within one second of the question ending. Lingering on option A means you miss B and C entirely.",
  vocabHighlights: [
    vh("shipment", "A load of goods being transported.", "The shipment cleared customs on Monday.", "Logistics and supply chain."),
    vh("procurement", "The department that buys goods and services.", "Procurement approved the new supplier.", "Purchasing conversations."),
    vh("quarterly", "Happening four times a year.", "We publish quarterly results.", "Finance reporting."),
    vh("to handle", "To be responsible for.", "Who handles refunds?", "Task ownership."),
    vh("loading dock", "The area where trucks are loaded.", "Deliveries arrive at the loading dock.", "Warehouse."),
    vh("to postpone", "To move to a later time.", "The meeting was postponed until Friday.", "Scheduling."),
  ],
  quiz: [
    q("An option that repeats a word from the question is usually:", ["Correct", "Incorrect", "Always about time", "Grammatically wrong"], 1,
      "Word repetition is the classic Part 2 distractor design."),
    q("\"How long will the audit take?\" expects an answer about:", ["A place", "A duration", "A person", "A reason"], 1,
      "How long asks for length of time."),
    q("A yes/no answer to a Wh- question is:", ["Acceptable", "Wrong because it mismatches the question type", "Preferred", "Only wrong in Part 3"], 1,
      "Wh- questions require information, not confirmation."),
    q("\"I'll check the schedule\" as a reply to \"When does training start?\" is:", ["Wrong, it avoids the question", "Correct, indirect answers are common", "Only correct in Part 1", "Grammatically incorrect"], 1,
      "Part 2 frequently rewards relevant indirect responses."),
    q("Which words matter most for identifying the question type?", ["The last two words", "The first two words", "The intonation only", "The longest word"], 1,
      "The opening words set the question function and the expected answer shape."),
  ],
  cheatSheetPoints: [
    "Lock the question type from the first two words",
    "Predict the answer shape before the options play",
    "Repetition of question words signals a trap",
    "Indirect but relevant replies are usually correct",
    "Choose within one second - never revisit an option",
  ],
  isNew: true,
});

/* ===================== 2. PART 2 - REQUESTS AND OFFERS ===================== */
const part2RequestsOffers = lecture({
  id: "toeic-part2-requests-offers",
  title: "Part 2 - Requests, Offers and Suggestions",
  category: "listening",
  parts: ["Part 2"],
  icon: "🤝",
  duration: "15 min",
  level: "foundation",
  targetScore: "600+",
  description:
    "Roughly a quarter of Part 2 items are not questions at all but requests, offers and suggestions. They need a functional reply - accepting, declining or deferring - rather than information.",
  trapAlerts: [
    trap("Treating \"Would you mind...\" as a yes/no question", "\"Yes\" to Would you mind actually means refusal, which reverses your intended meaning."),
    trap("Answering a suggestion with information", "\"Why don't we move the meeting?\" needs agreement or an alternative, not a time fact."),
    trap("Missing the polite request frame", "Could you, Would you, I was wondering if all signal a request hidden inside question grammar."),
  ],
  coreTechnique: [
    step(1, "Spot the frame", "Could you / Would you mind / Why don't we / How about / Let's - each marks a request, offer or suggestion."),
    step(2, "Choose a function, not a fact", "Valid replies accept (Sure, I'd be glad to), decline politely (I'm afraid I can't) or defer (Let me check first)."),
    step(3, "Handle Would you mind carefully", "\"Not at all\" and \"Of course not\" mean acceptance; \"Yes\" means refusal."),
    step(4, "Watch for conditional acceptance", "\"As long as it's before five\" accepts with a condition and is very often the key."),
  ],
  practiceSet: [
    pq("Statement: \"Would you mind reviewing this draft before lunch?\"", "Which reply is correct?",
      ["Yes, I would.", "Not at all, send it over.", "It was reviewed.", "At noon, in the cafeteria."],
      1, "Not at all signals willingness; Yes, I would means you object."),
    pq("Statement: \"Why don't we reschedule the site visit?\"", "Which reply is correct?",
      ["The site is large.", "That's a good idea - how about Thursday?", "It was visited twice.", "Yes, the site."],
      1, "A suggestion needs agreement plus an alternative arrangement."),
    pq("Statement: \"I could pick up the printer cartridges on my way in.\"", "Which reply is correct?",
      ["The printer is broken.", "That would be a great help, thanks.", "On Monday morning.", "Yes, cartridges."],
      1, "An offer is answered with acceptance and thanks."),
  ],
  businessContext: "Workplace English relies on indirect requests to stay polite; recognising these frames is essential in real meetings as well as in the test.",
  proSpeedTip: "The moment you hear Could / Would / Why don't, stop looking for facts and start listening for agreement words.",
  vocabHighlights: [
    vh("to reschedule", "To arrange for a different time.", "Can we reschedule to next week?", "Calendar management."),
    vh("draft", "An early version of a document.", "Please review the draft contract.", "Document workflow."),
    vh("to defer", "To postpone a decision.", "Let's defer that item to the next agenda.", "Meetings."),
    vh("I'm afraid", "A polite way to introduce bad news.", "I'm afraid I'm double-booked.", "Polite refusal."),
    vh("cartridge", "A replaceable ink container.", "The printer needs a new cartridge.", "Office supplies."),
    vh("on my way in", "During the journey to work.", "I'll collect it on my way in.", "Everyday office talk."),
  ],
  quiz: [
    q("\"Would you mind sending the file?\" - which reply accepts?", ["Yes, I would.", "Not at all.", "Yes, mind.", "It was sent, wasn't it?"], 1,
      "Not at all means you do not object, so it accepts the request."),
    q("A suggestion beginning \"Why don't we\" needs:", ["A time fact", "Agreement or an alternative", "A yes/no about the past", "A location"], 1,
      "Suggestions are answered functionally."),
    q("\"I could drop it off later\" is a:", ["Complaint", "Offer", "Question about time", "Refusal"], 1,
      "Could plus a helpful action is an offer."),
    q("\"As long as it's before five\" is an example of:", ["Refusal", "Conditional acceptance", "A question", "A repetition trap"], 1,
      "It accepts, subject to a condition, and is a common correct answer."),
    q("Roughly what share of Part 2 items are requests, offers or suggestions?", ["None", "About a quarter", "About 90%", "Only one item"], 1,
      "Around a quarter of items test these functional exchanges."),
  ],
  cheatSheetPoints: [
    "Could / Would / Why don't / How about = functional item",
    "Reply by accepting, declining politely or deferring",
    "Would you mind: Not at all = yes, Yes = no",
    "Conditional acceptance is often the key",
    "Stop hunting for facts once you hear a request frame",
  ],
  isNew: true,
});

/* ===================== 3. PART 3 - PARAPHRASE TRACKING ===================== */
const part3Paraphrase = lecture({
  id: "toeic-part3-paraphrase-tracking",
  title: "Part 3 - Paraphrase Tracking in Conversations",
  category: "listening",
  parts: ["Part 3"],
  icon: "🗣️",
  duration: "18 min",
  level: "intermediate",
  targetScore: "600+",
  description:
    "Correct Part 3 options almost never repeat the speaker's words. They paraphrase them. This lecture builds the paraphrase habit so you can match meaning instead of matching sound.",
  trapAlerts: [
    trap("An option repeating exact words from the audio", "Word-for-word overlap usually marks a distractor, not the answer."),
    trap("Correct information attributed to the wrong speaker", "Both speakers mention numbers; the question asks what one of them says."),
    trap("Information that is true but answers a different question", "Timing details are used to distract from a question about a problem."),
  ],
  coreTechnique: [
    step(1, "Read the three questions first", "In the 8 seconds before audio, note the question words: problem, suggest, next week."),
    step(2, "Predict the paraphrase", "\"The system is down\" will appear as \"a technical problem\"; \"I'll email it\" as \"send documentation\"."),
    step(3, "Tag the speakers", "Write M and W beside your notes so you can answer \"What does the woman suggest?\" with confidence."),
    step(4, "Answer in order", "The three questions follow the conversation order, so answer as the information arrives."),
  ],
  practiceSet: [
    pq("Audio: W: \"The projector in Room B keeps shutting off.\" M: \"I'll ask maintenance to look at it this afternoon.\"", "What problem does the woman mention?",
      ["A room is too small.", "A piece of equipment is malfunctioning.", "A meeting was cancelled.", "Maintenance staff are unavailable."],
      1, "Keeps shutting off is paraphrased as malfunctioning."),
    pq("Same conversation.", "What will the man most likely do next?",
      ["Book a different room.", "Contact the maintenance team.", "Buy a new projector.", "Cancel the presentation."],
      1, "Ask maintenance to look at it is paraphrased as contact the maintenance team."),
    pq("Audio: M: \"Our supplier raised prices by twelve percent.\" W: \"Then we should request quotes from two other vendors.\"", "What does the woman suggest?",
      ["Accepting the increase.", "Comparing other suppliers.", "Reducing production.", "Delaying the order."],
      1, "Request quotes from other vendors is paraphrased as comparing other suppliers."),
  ],
  businessContext: "Real meetings restate points in new words constantly; paraphrase recognition is the core listening skill for office English.",
  proSpeedTip: "Underline the question word (problem / suggest / next) so your ear filters for that function only.",
  vocabHighlights: [
    vh("to malfunction", "To stop working properly.", "The scanner malfunctioned again.", "Equipment issues."),
    vh("quote", "A stated price for work or goods.", "We received three quotes.", "Procurement."),
    vh("vendor", "A company that sells goods or services.", "The vendor delivered late.", "Supplier management."),
    vh("maintenance", "Repair and upkeep work.", "Maintenance will visit at two.", "Facilities."),
    vh("to raise prices", "To increase what is charged.", "They raised prices twice this year.", "Negotiation."),
    vh("shortly", "Soon.", "The technician will arrive shortly.", "Scheduling."),
  ],
  quiz: [
    q("Correct Part 3 options normally:", ["Repeat the audio exactly", "Paraphrase the audio", "Contain numbers", "Are the longest option"], 1,
      "Paraphrase is the standard design of correct answers."),
    q("\"The system keeps shutting off\" is best paraphrased as:", ["A staffing shortage", "A technical problem", "A pricing dispute", "A delivery delay"], 1,
      "Shutting off describes equipment failure, a technical problem."),
    q("Why tag speakers as M and W in your notes?", ["To count words", "Because questions ask what a specific speaker says", "For spelling", "To time the audio"], 1,
      "Speaker attribution traps are common in Part 3."),
    q("The three questions in a Part 3 set usually follow:", ["Reverse order", "The order of the conversation", "Random order", "Alphabetical order"], 1,
      "Information arrives in question order, which lets you answer live."),
    q("What should you do in the seconds before the audio starts?", ["Rest your eyes", "Read the three questions and note the question words", "Read all twelve options twice", "Translate the options"], 1,
      "Reading the question words primes your ear for the right information."),
  ],
  cheatSheetPoints: [
    "Read the three questions before the audio",
    "Expect paraphrase, not repetition",
    "Tag M and W to survive speaker traps",
    "Answer in conversation order",
    "Exact word overlap usually marks a distractor",
  ],
  isNew: true,
});

/* ===================== 4. PART 4 - TALKS AND ANNOUNCEMENTS ===================== */
const part4Announcements = lecture({
  id: "toeic-part4-announcement-map",
  title: "Part 4 - Mapping Talks and Announcements",
  category: "listening",
  parts: ["Part 4"],
  icon: "📢",
  duration: "17 min",
  level: "intermediate",
  targetScore: "600+",
  description:
    "Part 4 talks follow predictable blueprints: announcement, voicemail, tour, advertisement and broadcast. Knowing the blueprint tells you where each answer will appear before you hear it.",
  trapAlerts: [
    trap("Choosing the purpose stated in the first sentence only", "Many talks open with a greeting and reveal the real purpose in sentence two or three."),
    trap("Detail options that come from the wrong stage of the talk", "A discount mentioned at the end is offered as an answer about the opening problem."),
    trap("Confusing what the speaker requests with what the speaker will do", "Listeners must separate the request to the audience from the speaker's own next step."),
  ],
  coreTechnique: [
    step(1, "Identify the genre in the first five seconds", "\"Attention shoppers\" = store announcement; \"You've reached\" = voicemail; \"Thanks for joining our tour\" = tour."),
    step(2, "Use the three-stage map", "Stage 1 purpose or problem, stage 2 details or instructions, stage 3 request or next step."),
    step(3, "Match questions to stages", "Question 1 usually targets stage 1, question 2 stage 2, question 3 stage 3."),
    step(4, "Listen for the request verb", "Please, be sure to, don't forget to and you'll need to introduce what the audience must do."),
  ],
  practiceSet: [
    pq("Talk: \"Good morning, staff. Because of scheduled maintenance, the east elevator will be out of service on Friday. Please use the west elevator or the stairs.\"", "What is the purpose of the announcement?",
      ["To advertise a new building.", "To report a maintenance closure.", "To announce a hiring drive.", "To thank staff."],
      1, "Stage 1 states the maintenance closure."),
    pq("Same talk.", "What are listeners asked to do?",
      ["Work from home.", "Use another elevator or the stairs.", "Contact the landlord.", "Arrive earlier on Friday."],
      1, "Please use signals the request in stage 3."),
    pq("Talk: \"You've reached Brightline Supplies. Our office is closed until Monday. For urgent orders, press two to reach our on-call team.\"", "What can a caller do for an urgent order?",
      ["Leave a written message.", "Press two for the on-call team.", "Visit the office.", "Call back Monday only."],
      1, "The instruction is stated explicitly in stage 3."),
  ],
  businessContext: "Voicemail greetings, facility notices and store announcements are everyday workplace listening genres.",
  proSpeedTip: "Name the genre out loud in your head within five seconds; the blueprint then predicts every answer position.",
  vocabHighlights: [
    vh("out of service", "Not working or not available.", "The lift is out of service.", "Facilities notices."),
    vh("on-call", "Available outside normal hours.", "The on-call engineer will respond.", "Support teams."),
    vh("scheduled maintenance", "Planned repair work.", "Scheduled maintenance starts at midnight.", "Operations."),
    vh("to be sure to", "A polite instruction phrase.", "Be sure to sign in at reception.", "Instructions."),
    vh("urgent", "Needing immediate attention.", "Mark the request as urgent.", "Prioritisation."),
    vh("premises", "The building and its grounds.", "Visitors must not leave the premises.", "Facility rules."),
  ],
  quiz: [
    q("The purpose of a Part 4 talk is usually stated:", ["Only at the very end", "In the first two or three sentences", "Never", "In the middle only"], 1,
      "Purpose appears early, though often just after a greeting."),
    q("\"Please use the west elevator\" belongs to which stage?", ["Purpose", "Details", "Request or next step", "Greeting"], 2,
      "Please marks the audience request in the final stage."),
    q("\"You've reached Brightline Supplies\" signals which genre?", ["Radio advertisement", "Voicemail greeting", "Guided tour", "News report"], 1,
      "You've reached is the standard voicemail opening."),
    q("Why is genre identification useful?", ["It shortens the audio", "It predicts where each answer will appear", "It gives you the answers", "It removes distractors"], 1,
      "Each genre follows a predictable information order."),
    q("Which verb group signals an instruction to listeners?", ["Seem, appear, tend", "Please, be sure to, don't forget to", "Was, were, had", "Could have, might have"], 1,
      "These phrases introduce what the audience must do."),
  ],
  cheatSheetPoints: [
    "Name the genre in five seconds",
    "Three stages: purpose, details, request",
    "Question order follows stage order",
    "Listen for please / be sure to for the request question",
    "Separate the speaker's next step from the audience's task",
  ],
  isNew: true,
});

/* ===================== 5. PART 5 - VERB FORMS ===================== */
const part5VerbForms = lecture({
  id: "toeic-part5-verb-forms",
  title: "Part 5 - Verb Forms: Tense, Voice and Agreement",
  category: "grammar",
  parts: ["Part 5"],
  icon: "⏱️",
  duration: "18 min",
  level: "intermediate",
  targetScore: "600+",
  description:
    "About one in four Part 5 items tests the verb slot. Three checks - subject agreement, time signal and active or passive voice - resolve almost all of them in under fifteen seconds.",
  trapAlerts: [
    trap("A plural verb after a long singular subject", "\"The list of approved suppliers\" is singular; the plural noun suppliers pulls you to the wrong verb."),
    trap("Active voice where the subject receives the action", "Reports do not write themselves: the passive was written is required."),
    trap("Present perfect with a finished past time expression", "Last quarter requires the past simple, not has increased."),
  ],
  coreTechnique: [
    step(1, "Find the real subject", "Cross out prepositional phrases: The list (of approved suppliers) is ready."),
    step(2, "Read the time signal", "yesterday, last month = past simple; since, for, already = present perfect; by next year = future perfect."),
    step(3, "Test the voice", "Ask whether the subject does the action or receives it. If it receives, choose be plus past participle."),
    step(4, "Confirm with the other clause", "In two-clause sentences, the second verb must agree logically with the first: when he arrived, the meeting had already started."),
  ],
  practiceSet: [
    pq("The list of approved suppliers ______ updated every quarter.", "Choose the correct verb.",
      ["are", "is", "were", "have been"], 1, "The subject is the list, which is singular, so is is required."),
    pq("The annual report ______ by the finance team last week.", "Choose the correct verb.",
      ["prepared", "was prepared", "has prepared", "is preparing"], 1, "The report receives the action and last week is finished past, so was prepared fits."),
    pq("Sales ______ steadily since the new branch opened.", "Choose the correct verb.",
      ["increase", "increased", "have increased", "will increase"], 2, "Since with a present result requires the present perfect."),
  ],
  businessContext: "Business writing depends on passive reporting and precise tense choice, exactly what the verb slot tests.",
  proSpeedTip: "Delete every phrase between the subject and the blank before choosing; agreement errors then become visible.",
  vocabHighlights: [
    vh("to approve", "To agree officially to something.", "The board approved the budget.", "Governance."),
    vh("steadily", "At a constant rate.", "Costs rose steadily.", "Trend description."),
    vh("annual", "Happening once a year.", "The annual report is published in May.", "Reporting cycles."),
    vh("to implement", "To put a plan into action.", "The policy was implemented in June.", "Project work."),
    vh("as of", "Starting from a stated date.", "As of Monday, the new rate applies.", "Policy notices."),
    vh("to oversee", "To supervise.", "She oversees three departments.", "Management."),
  ],
  quiz: [
    q("\"The list of approved suppliers ______ ready.\" Which verb is correct?", ["are", "is", "were", "being"], 1,
      "The head noun list is singular, so is agrees."),
    q("Which time expression requires the present perfect?", ["Last Monday", "Since March", "In 2019", "Two years ago"], 1,
      "Since links a past start to the present, requiring the present perfect."),
    q("\"The report ______ by the auditor.\" The subject receives the action, so use:", ["wrote", "was written", "has written", "writes"], 1,
      "A receiving subject needs be plus past participle."),
    q("What should you delete before checking agreement?", ["The main verb", "Prepositional phrases between subject and verb", "The subject", "All adjectives"], 1,
      "Prepositional phrases hide the real subject and cause agreement errors."),
    q("Roughly what proportion of Part 5 items test the verb slot?", ["About one in twenty", "About one in four", "All of them", "None"], 1,
      "The verb slot is one of the most frequent Part 5 targets."),
  ],
  cheatSheetPoints: [
    "Find the head noun, ignore prepositional phrases",
    "Time signal decides the tense",
    "Receiving subject means passive voice",
    "Since / for = present perfect",
    "Finished past time = past simple",
  ],
  isNew: true,
});

/* ===================== 6. PART 5 - PREPOSITIONS ===================== */
const part5Prepositions = lecture({
  id: "toeic-part5-preposition-drill",
  title: "Part 5 - Prepositions and Fixed Phrases",
  category: "grammar",
  parts: ["Part 5", "Part 6"],
  icon: "🔗",
  duration: "16 min",
  level: "intermediate",
  targetScore: "600+",
  description:
    "Preposition items cannot be reasoned out - they must be recognised. This lecture groups the highest-frequency TOEIC prepositional phrases into memorable families so recognition becomes automatic.",
  trapAlerts: [
    trap("Translating the preposition from your first language", "Prepositions rarely map one to one between languages; depend on, not depend of."),
    trap("Confusing time prepositions in, on, at", "at 9 a.m., on Monday, in June - each level of precision takes a different preposition."),
    trap("Missing a phrasal verb boundary", "In \"look into the complaint\", into belongs to the verb, not to the noun."),
  ],
  coreTechnique: [
    step(1, "Group by family", "Time: at a clock time, on a day, in a month or year. Place: at a point, on a surface, in an enclosed space."),
    step(2, "Learn verb + preposition pairs", "comply with, apply for, account for, result in, benefit from, participate in."),
    step(3, "Learn adjective + preposition pairs", "responsible for, eligible for, familiar with, subject to, capable of."),
    step(4, "Check the whole phrase, not the gap", "Read the four words before and after the blank aloud; the fixed phrase will surface."),
  ],
  practiceSet: [
    pq("All employees must comply ______ the new safety rules.", "Choose the preposition.",
      ["to", "with", "for", "in"], 1, "Comply with is the fixed pair."),
    pq("Applicants are eligible ______ the allowance after six months.", "Choose the preposition.",
      ["of", "for", "with", "on"], 1, "Eligible for is the fixed adjective pair."),
    pq("The delay resulted ______ additional shipping costs.", "Choose the preposition.",
      ["from", "in", "of", "at"], 1, "Result in introduces the consequence; result from introduces the cause."),
  ],
  businessContext: "Contracts, policies and notices are built from fixed prepositional phrases, so this knowledge transfers directly to workplace reading.",
  proSpeedTip: "Keep a single page of verb plus preposition pairs and review it for two minutes daily; recognition beats reasoning here.",
  vocabHighlights: [
    vh("to comply with", "To obey a rule or law.", "All staff must comply with the policy.", "Compliance."),
    vh("eligible for", "Qualified to receive.", "You are eligible for reimbursement.", "HR benefits."),
    vh("to result in", "To cause.", "The change resulted in higher output.", "Cause and effect."),
    vh("subject to", "Depending on or governed by.", "Prices are subject to change.", "Contract wording."),
    vh("to account for", "To explain or to make up a share of.", "Exports account for half of revenue.", "Reporting."),
    vh("in accordance with", "Following a rule.", "Work proceeded in accordance with the contract.", "Formal notices."),
  ],
  quiz: [
    q("Which preposition follows comply?", ["to", "with", "for", "of"], 1, "Comply with is fixed."),
    q("\"Prices are ______ change without notice.\"", ["subject to", "subject of", "subject in", "subject for"], 0,
      "Subject to is the standard contract phrase."),
    q("Which preposition introduces the consequence?", ["result from", "result in", "result of", "result at"], 1,
      "Result in points to the effect; result from points to the cause."),
    q("Which time preposition goes with a specific day?", ["in", "on", "at", "by"], 1, "On Monday, on 5 June."),
    q("The safest way to solve a preposition item is to:", ["Translate from your own language", "Recognise the fixed phrase", "Choose the shortest option", "Pick at by default"], 1,
      "Prepositions are memorised in phrases, not reasoned out."),
  ],
  cheatSheetPoints: [
    "at time, on day, in month or year",
    "comply with, apply for, account for, result in",
    "responsible for, eligible for, familiar with, subject to",
    "Read four words each side of the blank",
    "Never translate the preposition directly",
  ],
  isNew: true,
});

/* ===================== 7. PART 6 - CONNECTORS ===================== */
const part6Connectors = lecture({
  id: "toeic-part6-discourse-connectors",
  title: "Part 6 - Discourse Connectors and Sentence Insertion",
  category: "reading",
  parts: ["Part 6"],
  icon: "🧩",
  duration: "18 min",
  level: "intermediate",
  targetScore: "750+",
  description:
    "Part 6 asks two things Part 5 never does: choose the connector that fits the logic between sentences, and insert a complete sentence into the right gap. Both are solved by reading across the gap, not inside it.",
  trapAlerts: [
    trap("Choosing a connector that fits the sentence but not the paragraph", "However is grammatical anywhere; only the surrounding logic decides whether contrast is correct."),
    trap("Inserting a sentence that repeats information already given", "The inserted sentence must add the missing link, not restate the previous line."),
    trap("Ignoring pronouns in the sentence-insertion options", "An option beginning with This change must follow a sentence that describes a change."),
  ],
  coreTechnique: [
    step(1, "Read the sentence before and after the gap", "Connector items depend on the relationship between two sentences, never on one alone."),
    step(2, "Name the relationship", "Addition (moreover), contrast (however, nevertheless), cause (therefore, as a result), example (for instance), sequence (subsequently)."),
    step(3, "For insertion, follow the reference chain", "Match pronouns and demonstratives: it, they, this policy, these changes must point to something already named."),
    step(4, "Re-read the whole paragraph once", "A correct choice keeps the paragraph coherent from first line to last; take ten seconds to confirm."),
  ],
  practiceSet: [
    pq("Our supplier raised prices in March. ______, we have kept our retail prices unchanged.", "Choose the connector.",
      ["Therefore", "Nevertheless", "For example", "In addition"], 1, "Higher costs but unchanged prices is a contrast, so Nevertheless fits."),
    pq("Registration closes on Friday. ______, late applications will not be reviewed.", "Choose the connector.",
      ["However", "Consequently", "Meanwhile", "By contrast"], 1, "The second sentence states the result of the first."),
    pq("Paragraph: \"The office will move to the fourth floor in July. ______ Staff will receive new access cards next month.\"", "Which sentence best fits the gap?",
      ["The cafeteria menu has changed.", "This relocation will double our meeting-room capacity.", "Sales rose sharply last year.", "Please recycle used paper."],
      1, "This relocation refers back to the move and leads naturally into access cards."),
  ],
  businessContext: "Internal memos and customer letters rely on connectors to signal reasoning, so Part 6 mirrors genuine business writing.",
  proSpeedTip: "Cover the options and predict the relationship first; then select the connector that names it.",
  vocabHighlights: [
    vh("nevertheless", "In spite of that.", "Costs rose; nevertheless, prices held.", "Formal contrast."),
    vh("consequently", "As a result.", "Consequently, deliveries were delayed.", "Cause and effect."),
    vh("relocation", "A move to a new place.", "The relocation begins in July.", "Facilities."),
    vh("subsequently", "Afterwards.", "The contract was subsequently renewed.", "Sequence."),
    vh("in the meantime", "During the period until then.", "In the meantime, use the side entrance.", "Interim instructions."),
    vh("accordingly", "In a way that is appropriate.", "Budgets were adjusted accordingly.", "Formal writing."),
  ],
  quiz: [
    q("To choose a connector you must read:", ["Only the sentence with the gap", "The sentences before and after the gap", "Only the first line", "Only the options"], 1,
      "Connectors express relationships between sentences."),
    q("\"Costs rose. ______, prices stayed the same.\" Which connector fits?", ["Therefore", "Nevertheless", "For instance", "Similarly"], 1,
      "The relationship is contrast."),
    q("An insertion option starting \"This change\" must follow a sentence that:", ["Asks a question", "Describes a change", "Lists prices", "Gives a greeting"], 1,
      "The demonstrative must have something to refer back to."),
    q("Which connector signals a result?", ["Meanwhile", "Consequently", "By contrast", "For example"], 1,
      "Consequently introduces the effect of what came before."),
    q("The final check on a Part 6 item is to:", ["Count the words", "Re-read the whole paragraph for coherence", "Choose the longest option", "Check spelling"], 1,
      "Coherence across the paragraph confirms the choice."),
  ],
  cheatSheetPoints: [
    "Read across the gap, never inside it only",
    "Name the relationship before reading the options",
    "Addition, contrast, cause, example, sequence",
    "Insertion options must match the reference chain",
    "Re-read the paragraph once to confirm",
  ],
  isNew: true,
});

/* ===================== 8. PART 7 - DOUBLE PASSAGES ===================== */
const part7DoublePassages = lecture({
  id: "toeic-part7-double-passage-links",
  title: "Part 7 - Double Passages: Finding the Link Question",
  category: "reading",
  parts: ["Part 7"],
  icon: "🔀",
  duration: "20 min",
  level: "advanced",
  targetScore: "750+",
  description:
    "In every double-passage set, one or two questions can only be answered by combining both texts. Identifying those link questions first prevents the most common Part 7 time loss.",
  trapAlerts: [
    trap("Answering a link question from one passage only", "The single-passage answer is always present as a distractor."),
    trap("Reading both passages fully before looking at questions", "Full reading costs three minutes you cannot recover in Part 7."),
    trap("Missing a date or price conflict between the two texts", "The link is often a mismatch: an advertised price versus an invoiced price."),
  ],
  coreTechnique: [
    step(1, "Identify the two document types", "Advertisement plus email, schedule plus notice, invoice plus complaint. The pairing predicts the link."),
    step(2, "Scan questions for cross words", "Questions mentioning both texts, or asking why a request was made, are link questions."),
    step(3, "Answer single-text questions first", "Bank the easy marks, then spend remaining time on the link."),
    step(4, "Match the shared item", "Locate the same date, price, name or product in both texts and compare them."),
  ],
  practiceSet: [
    pq("Text 1: advertisement offering a 15% discount on orders placed before 30 June. Text 2: an email dated 3 July requesting the discount.", "Why will the discount most likely be refused?",
      ["The order was too small.", "The request came after the deadline.", "The product was discontinued.", "Payment failed."],
      1, "Only by comparing the two dates does the answer appear."),
    pq("Text 1: workshop schedule listing Session B at 2 p.m. Text 2: notice that Session B has moved to 4 p.m.", "When will Session B now begin?",
      ["2 p.m.", "4 p.m.", "It is cancelled.", "The time is not stated."],
      1, "The notice updates the schedule, so the later text governs."),
    pq("Text 1: invoice for 200 units. Text 2: email stating only 180 units arrived.", "What is the writer's main concern?",
      ["An incorrect address.", "A shortfall in the delivered quantity.", "A late invoice.", "A damaged package."],
      1, "The quantity mismatch across the texts is the issue."),
  ],
  businessContext: "Cross-checking an invoice against an order, or a notice against a schedule, is daily office work.",
  proSpeedTip: "Write the two document types at the top of your scratch note; the link question almost always sits between them.",
  vocabHighlights: [
    vh("invoice", "A bill for goods or services.", "The invoice is due in 30 days.", "Accounts payable."),
    vh("shortfall", "An amount less than required.", "There was a shortfall of 20 units.", "Inventory."),
    vh("to expire", "To come to an end.", "The offer expired on 30 June.", "Promotions."),
    vh("discrepancy", "A difference that should not exist.", "We found a discrepancy in the totals.", "Auditing."),
    vh("as stated", "As already written.", "As stated in our email, delivery is Friday.", "Formal correspondence."),
    vh("to reissue", "To send out again in corrected form.", "We will reissue the invoice.", "Billing."),
  ],
  quiz: [
    q("A link question requires information from:", ["The first text only", "Both texts", "The questions only", "The second text only"], 1,
      "Link questions are answered by combining the two documents."),
    q("The best order of work in a double-passage set is:", ["Read both texts fully, then answer", "Answer single-text questions first, then the link", "Answer the link first", "Guess all answers"], 1,
      "Banking single-text answers protects your time."),
    q("Which pairing most often produces a date-based link?", ["Two advertisements", "An advertisement and a later email", "Two invoices", "A menu and a map"], 1,
      "Offer deadlines versus request dates are a standard link."),
    q("A shared item to compare across texts might be:", ["A font", "A price, date, name or quantity", "A paragraph length", "A heading style"], 1,
      "Links hinge on shared factual details."),
    q("Why is reading both passages fully first a mistake?", ["It is not allowed", "It costs time you cannot recover in Part 7", "It reveals answers", "It confuses the order"], 1,
      "Part 7 is a time-management test as much as a reading test."),
  ],
  cheatSheetPoints: [
    "Name both document types first",
    "Find the link questions before reading in depth",
    "Bank single-text answers first",
    "Compare shared dates, prices, names, quantities",
    "The single-text answer to a link question is a distractor",
  ],
  isNew: true,
});

/* ===================== 9. PART 7 - TRIPLE PASSAGES ===================== */
const part7TriplePassages = lecture({
  id: "toeic-part7-triple-passage-routing",
  title: "Part 7 - Triple Passages: Routing Five Questions",
  category: "reading",
  parts: ["Part 7"],
  icon: "🗺️",
  duration: "20 min",
  level: "advanced",
  targetScore: "900+",
  description:
    "Triple-passage sets carry five questions across three documents. High scorers route each question to the right document within seconds instead of searching all three.",
  trapAlerts: [
    trap("Searching all three texts for every question", "Routing errors are the main cause of running out of time before the final set."),
    trap("Assuming the third text is always the reply", "The order can be notice, schedule, then email, so check document types, not position."),
    trap("Overlooking the sender and recipient lines", "Who wrote to whom often decides the answer to a purpose question."),
  ],
  coreTechnique: [
    step(1, "Label the three texts in ten seconds", "Read only the headers: type, sender, recipient, date."),
    step(2, "Route each question", "Keyword in the question matches the header of one document; start there."),
    step(3, "Expect one or two cross-text questions", "Usually the fourth or fifth question requires two documents."),
    step(4, "Cap your time", "Give the set no more than six minutes; move on and guess rather than sacrifice a later set."),
  ],
  practiceSet: [
    pq("Texts: (1) conference programme, (2) email from a speaker requesting a later slot, (3) reply from the organiser confirming a change.", "Where is the final session time confirmed?",
      ["Text 1", "Text 2", "Text 3", "It is not stated."],
      2, "The organiser's reply carries the confirmed change."),
    pq("Same set.", "Why did the speaker write?",
      ["To cancel the talk", "To request a later time slot", "To book accommodation", "To confirm payment"],
      1, "The purpose comes from text 2, identified by the sender line."),
    pq("Same set.", "Which question is most likely a cross-text question?",
      ["What is the conference theme?", "How does the confirmed schedule differ from the printed programme?", "Who is the organiser?", "What is the venue address?"],
      1, "Comparing the programme with the confirmation needs two documents."),
  ],
  businessContext: "Handling a request that changes an existing plan, and confirming it in writing, is core professional communication.",
  proSpeedTip: "Write 1, 2, 3 with two words each on your scratch note; then answer without re-scanning the wrong document.",
  vocabHighlights: [
    vh("programme", "A published schedule of events.", "The programme lists four sessions.", "Events."),
    vh("slot", "An allocated time period.", "Her slot moved to 3 p.m.", "Scheduling."),
    vh("to confirm", "To state that something is definite.", "We confirm the revised time.", "Correspondence."),
    vh("venue", "The place where an event happens.", "The venue seats 300.", "Event planning."),
    vh("attendee", "A person who attends.", "Attendees receive a badge.", "Conferences."),
    vh("revised", "Changed and corrected.", "Please see the revised agenda.", "Document control."),
  ],
  quiz: [
    q("How many questions does a triple-passage set normally have?", ["Two", "Five", "Ten", "One"], 1,
      "Triple sets carry five questions."),
    q("The first ten seconds should be spent:", ["Reading text 1 fully", "Labelling all three texts from their headers", "Reading all questions twice", "Guessing"], 1,
      "Header labelling enables routing."),
    q("Which question is typically cross-text?", ["The first", "The fourth or fifth", "None", "All five"], 1,
      "Cross-text questions usually appear at the end of the set."),
    q("What decides which document to search?", ["Its length", "The keyword match with its header", "Its position", "The number of paragraphs"], 1,
      "Routing works on header and keyword matching."),
    q("A sensible time cap for one triple set is:", ["Two minutes", "About six minutes", "Fifteen minutes", "No cap"], 1,
      "Six minutes protects the remaining sets."),
  ],
  cheatSheetPoints: [
    "Label type, sender, recipient, date for all three texts",
    "Route each question to one document first",
    "Expect one or two cross-text questions",
    "Sender and recipient lines answer purpose questions",
    "Cap the set at six minutes",
  ],
  isNew: true,
});

/* ===================== 10. SPEAKING Q11 ===================== */
const speakingQ11 = lecture({
  id: "toeic-speaking-q11-opinion",
  title: "Speaking Question 11 - Express an Opinion Template",
  category: "speed-hacks",
  parts: ["Speaking Q11"],
  icon: "🎤",
  duration: "18 min",
  level: "advanced",
  targetScore: "750+",
  description:
    "Question 11 gives 45 seconds of preparation and 60 seconds of speech on an opinion topic. A four-part template turns an unfamiliar topic into four slots you can always fill.",
  trapAlerts: [
    trap("Giving two opinions and supporting neither", "The rubric rewards a single clear position developed with reasons."),
    trap("Running out of content at 30 seconds", "Silence in the second half lowers the delivery and development scores."),
    trap("Listing three reasons with no examples", "Two reasons with concrete examples score higher than three bare assertions."),
  ],
  coreTechnique: [
    step(1, "State the position in one sentence", "\"I believe companies should allow flexible working hours.\""),
    step(2, "Give reason one plus an example", "\"First, it raises productivity. In my last role, output rose after we introduced flexible starts.\""),
    step(3, "Give reason two plus an example", "\"Second, it widens the talent pool, because parents and carers can apply.\""),
    step(4, "Close with a restatement", "\"For these reasons, flexible hours benefit both employees and employers.\" A closing line guarantees you fill the minute."),
  ],
  practiceSet: [
    pq("Prompt: Should companies provide training during working hours?", "Which opening is strongest?",
      ["There are many opinions about this.", "I firmly believe companies should provide training during working hours.", "Training is difficult.", "It depends on everything."],
      1, "A clear single position frames the whole response."),
    pq("You have used 30 seconds and both reasons. What next?", "Best action?",
      ["Stop speaking.", "Add a brief consequence and a closing restatement.", "Repeat reason one word for word.", "Change your opinion."],
      1, "Extending with a consequence and closing keeps delivery smooth to the end."),
    pq("Prompt: Is it better to work in a team or alone?", "Which support is strongest?",
      ["Teams are good.", "Teams catch errors early; in my project, a colleague spotted a costing mistake before submission.", "I like people.", "Alone is quiet."],
      1, "A concrete example develops the reason, which is what the rubric rewards."),
  ],
  businessContext: "Stating a position and justifying it briefly is exactly what managers do in meetings and performance reviews.",
  proSpeedTip: "In the 45-second preparation, write only four words: position, reason 1, example, reason 2. Sentences come from speaking, not writing.",
  vocabHighlights: [
    vh("flexible working", "Working hours that can be adjusted.", "Flexible working improved retention.", "HR policy."),
    vh("talent pool", "The set of available skilled candidates.", "Remote hiring widens the talent pool.", "Recruitment."),
    vh("retention", "Keeping employees in the company.", "Retention rose by 8%.", "HR metrics."),
    vh("productivity", "Output per hour worked.", "Productivity improved after training.", "Operations."),
    vh("to justify", "To give reasons for.", "Can you justify the extra cost?", "Business cases."),
    vh("on balance", "After considering both sides.", "On balance, the benefits outweigh the costs.", "Conclusions."),
  ],
  quiz: [
    q("How long is the response for Speaking Question 11?", ["30 seconds", "60 seconds", "Three minutes", "15 seconds"], 1,
      "You speak for 60 seconds after 45 seconds of preparation."),
    q("How many developed reasons suit the response best?", ["One", "Two", "Five", "None"], 1,
      "Two reasons with examples fit the minute and satisfy the development criterion."),
    q("Stating two opposing opinions without choosing one will:", ["Raise the score", "Weaken the position and development scores", "Save time", "Improve pronunciation"], 1,
      "The rubric expects a single clear position."),
    q("What should you write during preparation time?", ["Full sentences", "Four keywords: position, reason 1, example, reason 2", "Nothing", "A translation"], 1,
      "Keywords are fast enough and prevent reading aloud."),
    q("Why end with a restatement?", ["It adds new ideas", "It guarantees you speak for the full minute and sounds complete", "It is required by law", "It replaces reasons"], 1,
      "A closing line prevents dead air and signals a finished answer."),
  ],
  cheatSheetPoints: [
    "One position, stated in sentence one",
    "Reason 1 plus example, reason 2 plus example",
    "Closing restatement to fill the minute",
    "Prepare four keywords, not sentences",
    "Never present two opinions without choosing",
  ],
  isNew: true,
});

/* ===================== 11. WRITING Q8 ===================== */
const writingQ8 = lecture({
  id: "toeic-writing-q8-opinion-essay",
  title: "Writing Question 8 - Opinion Essay in 30 Minutes",
  category: "speed-hacks",
  parts: ["Writing Q8"],
  icon: "✍️",
  duration: "20 min",
  level: "advanced",
  targetScore: "750+",
  description:
    "The final Writing task asks for an opinion essay of at least 300 words in 30 minutes. A fixed time budget and paragraph plan let you write at length without losing accuracy.",
  trapAlerts: [
    trap("Writing under 300 words", "Short essays are capped by the length requirement no matter how accurate they are."),
    trap("Spending fifteen minutes on the introduction", "Body paragraphs carry the development score; the introduction should take three minutes."),
    trap("Submitting with no proofread", "Grammar and vocabulary are scored, and a two-minute check recovers easy marks."),
  ],
  coreTechnique: [
    step(1, "Budget the 30 minutes", "3 minutes planning, 3 introduction, 8 plus 8 for two body paragraphs, 4 conclusion, 4 proofreading."),
    step(2, "Plan two body ideas only", "Each body paragraph: topic sentence, explanation, example, link back to the position."),
    step(3, "Signal structure explicitly", "First, In addition, For example, However, Overall. Clear signposting raises the organisation score."),
    step(4, "Proofread in two passes", "Pass one: verb endings and agreement. Pass two: spelling, articles and word count."),
  ],
  practiceSet: [
    pq("Prompt: Do you agree that companies should pay for employees' further education?", "Which introduction ending is strongest?",
      ["There are two sides to this.", "I strongly agree, because trained staff bring measurable returns.", "Education is expensive.", "Let me explain later."],
      1, "A stated position with a preview of the reason organises the whole essay."),
    pq("You have written 240 words with five minutes left.", "Best action?",
      ["Submit as it is.", "Add a developed example to a body paragraph, then proofread.", "Add a new third body paragraph.", "Repeat the introduction."],
      1, "Extending an existing paragraph reaches the length requirement without weakening structure."),
    pq("Which sentence best opens a body paragraph?", "Choose one.",
      ["Also, many things are important.", "First, employer-funded training improves retention.", "In conclusion, I agree.", "There are many reasons."],
      1, "A topic sentence names one specific reason."),
  ],
  businessContext: "Written argument with clear structure is what internal proposals and recommendation memos require.",
  proSpeedTip: "Write the conclusion before you extend any paragraph; an essay with no conclusion loses organisation marks.",
  vocabHighlights: [
    vh("further education", "Study after initial qualifications.", "The company funds further education.", "HR development."),
    vh("measurable", "Able to be quantified.", "We need measurable results.", "Performance management."),
    vh("to outweigh", "To be more important than.", "The benefits outweigh the costs.", "Argument writing."),
    vh("incentive", "Something that encourages action.", "Bonuses act as an incentive.", "Compensation."),
    vh("turnover", "The rate at which staff leave.", "High turnover raises hiring costs.", "HR metrics."),
    vh("in the long run", "Over an extended period.", "In the long run, training pays for itself.", "Business argument."),
  ],
  quiz: [
    q("What is the minimum recommended length for Writing Question 8?", ["100 words", "About 300 words", "600 words", "There is no guideline"], 1,
      "The task asks for an essay of at least about 300 words."),
    q("How long should planning take in the 30-minute budget?", ["Ten minutes", "About three minutes", "No time at all", "Half the time"], 1,
      "Three minutes is enough to fix a position and two body ideas."),
    q("A body paragraph should contain:", ["Only a topic sentence", "Topic sentence, explanation, example, link back", "Three unrelated facts", "A question"], 1,
      "That structure produces the development the rubric rewards."),
    q("With five minutes left and 240 words written, you should:", ["Submit immediately", "Develop an existing paragraph, then proofread", "Start a new argument", "Delete the conclusion"], 1,
      "Extending existing content is safer than opening a new idea late."),
    q("Which signposting set best shows organisation?", ["And, and, and", "First, In addition, For example, Overall", "Also, also, also", "No connectors"], 1,
      "Explicit signposting raises the organisation score.",),
  ],
  cheatSheetPoints: [
    "Budget: 3 plan, 3 intro, 8 + 8 body, 4 conclusion, 4 check",
    "State the position at the end of the introduction",
    "Two developed body ideas, each with an example",
    "Signpost with First, In addition, For example, Overall",
    "Always finish the conclusion before extending paragraphs",
  ],
  isNew: true,
});

/* ===================== 12. SPEED HACKS - FINAL 20 MINUTES ===================== */
const readingEndgame = lecture({
  id: "toeic-reading-endgame-triage",
  title: "Reading Endgame - Triage in the Final 20 Minutes",
  category: "speed-hacks",
  parts: ["Part 5", "Part 6", "Part 7"],
  icon: "⏳",
  duration: "15 min",
  level: "advanced",
  targetScore: "750+",
  description:
    "Most candidates lose 15 to 25 raw points simply by running out of time in Part 7. A rehearsed triage plan converts those lost items into probable marks.",
  trapAlerts: [
    trap("Leaving the last five items blank", "There is no penalty for a wrong answer, so a blank is a guaranteed loss."),
    trap("Spending three minutes on a single hard Part 5 item", "Part 5 items are worth the same as Part 7 items but take a fraction of the time."),
    trap("Discovering your pace only in the last five minutes", "Checkpoint times must be rehearsed before test day."),
  ],
  coreTechnique: [
    step(1, "Set two checkpoints", "Part 5 and 6 finished by minute 25 of the 75-minute Reading section; single passages by minute 50."),
    step(2, "Use the 60-second rule", "No Part 5 item gets more than 60 seconds. Mark it, guess, move on."),
    step(3, "Triage the last sets", "For remaining sets, answer questions with specific keywords such as names, dates and prices first."),
    step(4, "Reserve 60 seconds for filling blanks", "In the final minute, mark every unanswered item with one consistent letter."),
  ],
  practiceSet: [
    pq("You reach minute 40 with Part 5 and 6 done and eight Part 7 sets remaining.", "What is the best plan?",
      ["Read every passage fully in order.", "Answer keyword-based questions across all sets first, then return to inference questions.", "Skip Part 7 entirely.", "Guess everything now."],
      1, "Keyword questions give the fastest marks per minute."),
    pq("A Part 5 item has taken 70 seconds and you are still unsure.", "Best action?",
      ["Keep working until solved.", "Guess, mark it, and move on.", "Leave it blank.", "Restart the section."],
      1, "The 60-second rule protects Part 7 time and blanks score nothing."),
    pq("Sixty seconds remain and six items are unanswered.", "Best action?",
      ["Leave them blank.", "Mark all six with the same letter.", "Read one passage quickly.", "Erase earlier answers."],
      1, "Consistent guessing converts blanks into probable marks."),
  ],
  businessContext: "Prioritising tasks under a deadline is a workplace skill the Reading section measures directly.",
  proSpeedTip: "Rehearse your two checkpoint times in at least three full mock tests so the pace is automatic on test day.",
  vocabHighlights: [
    vh("triage", "Deciding the order of priority.", "We triaged the support tickets.", "Operations."),
    vh("checkpoint", "A point for verifying progress.", "The project has weekly checkpoints.", "Project management."),
    vh("to allocate", "To assign resources or time.", "Allocate ten minutes per section.", "Planning."),
    vh("inference", "A conclusion drawn from evidence.", "The question requires an inference.", "Reading skills."),
    vh("pace", "The speed of progress.", "Keep a steady pace.", "Time management."),
    vh("to skim", "To read quickly for main ideas.", "Skim the notice first.", "Reading technique."),
  ],
  quiz: [
    q("Is there a penalty for a wrong answer in TOEIC Listening and Reading?", ["Yes", "No", "Only in Part 7", "Only in Part 5"], 1,
      "There is no negative marking, so never leave a blank."),
    q("What is the maximum time to spend on one Part 5 item?", ["Three minutes", "About 60 seconds", "Ten seconds", "As long as needed"], 1,
      "The 60-second rule preserves Part 7 time."),
    q("Parts 5 and 6 should be finished by roughly:", ["Minute 10", "Minute 25 of the Reading section", "Minute 60", "The end"], 1,
      "That checkpoint leaves enough time for Part 7."),
    q("Which Part 7 questions should be answered first under time pressure?", ["Inference questions", "Keyword questions about names, dates and prices", "The longest questions", "Vocabulary questions only"], 1,
      "Keyword questions are the fastest to verify."),
    q("With one minute left and unanswered items, you should:", ["Leave them blank", "Mark them all with one consistent letter", "Recheck earlier answers", "Read the last passage"], 1,
      "Consistent guessing has positive expected value with no penalty."),
  ],
  cheatSheetPoints: [
    "No penalty for guessing - never leave a blank",
    "Parts 5 and 6 done by minute 25",
    "60-second limit per Part 5 item",
    "Keyword questions before inference questions",
    "Reserve the final minute for filling blanks",
  ],
  isNew: true,
});

export const toeicLecturesExpansion4: ToeicLecture[] = [
  part2SameWordTrap,
  part2RequestsOffers,
  part3Paraphrase,
  part4Announcements,
  part5VerbForms,
  part5Prepositions,
  part6Connectors,
  part7DoublePassages,
  part7TriplePassages,
  speakingQ11,
  writingQ8,
  readingEndgame,
];
