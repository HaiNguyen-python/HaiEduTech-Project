import type { ToeicLRExam, ToeicLRQuestion, ToeicPart, ToeicSWExam, ToeicSWTask } from "./toeicExams";
import part1WomanReviewingDocument from "@/assets/toeic/part1-woman-reviewing-document.jpg";
import part1ColleaguesChartScreen from "@/assets/toeic/part1-colleagues-chart-screen.jpg";
import part1LaptopConferenceTable from "@/assets/toeic/part1-laptop-conference-table.jpg";
import part1ManPresentationMaterials from "@/assets/toeic/part1-man-presentation-materials.jpg";
import part1PeopleMeetingTable from "@/assets/toeic/part1-people-meeting-table.jpg";
import part1WorkerPointingDisplay from "@/assets/toeic/part1-worker-pointing-display.jpg";

export const TOEIC_LR_OFFICIAL_PART_COUNTS: Record<ToeicPart, number> = {
  1: 6,
  2: 25,
  3: 39,
  4: 30,
  5: 30,
  6: 16,
  7: 54,
};

export const TOEIC_SPEAKING_OFFICIAL_TASKS = 11;
export const TOEIC_WRITING_OFFICIAL_TASKS = 8;

const domainThemes = [
  {
    label: "Office Operations",
    company: "BrightWave Solutions",
    product: "client portal",
    place: "conference center",
    department: "operations team",
    event: "annual planning workshop",
  },
  {
    label: "Travel and Hospitality",
    company: "Harbor Grand Hotel",
    product: "guest reservation system",
    place: "airport terminal",
    department: "guest services team",
    event: "regional tourism expo",
  },
  {
    label: "Retail and Customer Care",
    company: "Northstar Retail Group",
    product: "online loyalty program",
    place: "downtown showroom",
    department: "customer care team",
    event: "seasonal sales campaign",
  },
  {
    label: "Finance and Administration",
    company: "Summit Financial Services",
    product: "expense tracking platform",
    place: "training room",
    department: "accounting department",
    event: "quarterly budget review",
  },
  {
    label: "Logistics and Manufacturing",
    company: "Pacific Logistics Ltd.",
    product: "inventory dashboard",
    place: "warehouse office",
    department: "shipping department",
    event: "supplier coordination meeting",
  },
  {
    label: "Technology and IT",
    company: "Helsinki Cloud Oy",
    product: "security update",
    place: "data center",
    department: "IT support team",
    event: "software launch briefing",
  },
  {
    label: "Marketing and Media",
    company: "Lumen Media Studio",
    product: "brand campaign",
    place: "recording studio",
    department: "creative department",
    event: "product launch rehearsal",
  },
  {
    label: "Education and Training",
    company: "Global Learning Institute",
    product: "online course catalog",
    place: "campus library",
    department: "academic support team",
    event: "teacher development seminar",
  },
];

type Theme = (typeof domainThemes)[number];

function themeFor(base: { id: string; title: string }, fallbackIndex: number): Theme {
  const key = `${base.id} ${base.title}`.toLowerCase();
  if (key.includes("tech") || key.includes("it")) return domainThemes[5];
  if (key.includes("logistics") || key.includes("manufacturing")) return domainThemes[4];
  if (key.includes("hospitality") || key.includes("travel")) return domainThemes[1];
  if (key.includes("retail")) return domainThemes[2];
  if (key.includes("finance")) return domainThemes[3];
  if (key.includes("marketing")) return domainThemes[6];
  if (key.includes("education")) return domainThemes[7];
  return domainThemes[fallbackIndex % domainThemes.length];
}

function svgDataUri(svg: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function makeSceneImage(seed: number, variant: "office" | "photo" | "speaking" | "writing"): string {
  const palettes = [
    ["#0f172a", "#2563eb", "#14b8a6", "#f8fafc"],
    ["#102a43", "#0ea5e9", "#10b981", "#e0f2fe"],
    ["#1e293b", "#3b82f6", "#f59e0b", "#f8fafc"],
    ["#111827", "#22c55e", "#38bdf8", "#f1f5f9"],
  ];
  const [bg, primary, accent, light] = palettes[seed % palettes.length];
  const deskY = 240 + (seed % 3) * 8;
  const personX = 120 + (seed % 5) * 34;
  const secondX = 430 - (seed % 4) * 22;
  const objectX = 270 + (seed % 4) * 26;

  const extras = variant === "photo"
    ? `<rect x="${objectX}" y="132" width="118" height="78" rx="8" fill="${light}" opacity="0.95"/><rect x="${objectX + 16}" y="150" width="86" height="10" rx="5" fill="${primary}" opacity="0.65"/><rect x="${objectX + 16}" y="172" width="62" height="10" rx="5" fill="${accent}" opacity="0.7"/>`
    : variant === "speaking"
      ? `<circle cx="318" cy="154" r="48" fill="${light}" opacity="0.95"/><path d="M290 154h56M318 126v56" stroke="${primary}" stroke-width="10" stroke-linecap="round"/>`
      : variant === "writing"
        ? `<rect x="278" y="120" width="134" height="98" rx="10" fill="${light}" opacity="0.96"/><path d="M300 150h88M300 176h70M300 202h52" stroke="${primary}" stroke-width="9" stroke-linecap="round"/>`
        : `<rect x="282" y="116" width="122" height="88" rx="10" fill="${light}" opacity="0.95"/><rect x="306" y="204" width="74" height="14" rx="7" fill="${primary}" opacity="0.85"/>`;

  return svgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="520" viewBox="0 0 800 520" role="img" aria-label="TOEIC workplace scene">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="${bg}"/>
          <stop offset="1" stop-color="${primary}"/>
        </linearGradient>
      </defs>
      <rect width="800" height="520" fill="url(#g)"/>
      <rect x="70" y="80" width="660" height="330" rx="26" fill="#ffffff" opacity="0.10"/>
      <rect x="90" y="${deskY}" width="620" height="42" rx="14" fill="${light}" opacity="0.92"/>
      <rect x="125" y="${deskY + 42}" width="44" height="104" rx="10" fill="${primary}" opacity="0.8"/>
      <rect x="602" y="${deskY + 42}" width="44" height="104" rx="10" fill="${primary}" opacity="0.8"/>
      <circle cx="${personX}" cy="154" r="34" fill="${light}" opacity="0.98"/>
      <path d="M${personX - 48} ${deskY}c12-54 84-54 96 0" fill="${accent}" opacity="0.9"/>
      <circle cx="${secondX}" cy="160" r="30" fill="${light}" opacity="0.92"/>
      <path d="M${secondX - 45} ${deskY}c16-48 74-48 90 0" fill="${primary}" opacity="0.82"/>
      ${extras}
      <circle cx="660" cy="116" r="34" fill="${accent}" opacity="0.5"/>
      <rect x="102" y="104" width="90" height="18" rx="9" fill="${light}" opacity="0.42"/>
      <rect x="102" y="134" width="62" height="18" rx="9" fill="${light}" opacity="0.25"/>
    </svg>
  `);
}

function optionSet(correct: string, distractors: string[]): string[] {
  return [correct, ...distractors].slice(0, 4);
}

function reorder<T>(items: T[], seed: number): { items: T[]; answer: number } {
  const correctPosition = seed % items.length;
  const distractors = items.slice(1);
  const rotation = distractors.length ? seed % distractors.length : 0;
  const rotated = [...distractors.slice(rotation), ...distractors.slice(0, rotation)];
  const arranged = [...rotated];
  arranged.splice(correctPosition, 0, items[0]);
  return { items: arranged, answer: correctPosition };
}

// Pick `count` items from `pool` starting at a seed-based offset, so each exam
// gets a different (but deterministic) subset and ordering.
function pickPool<T>(pool: T[], count: number, seed: number): T[] {
  const len = pool.length;
  if (len === 0) return [];
  const start = ((seed % len) + len) % len;
  const step = 1 + (seed % Math.max(1, Math.floor(len / count) || 1));
  const out: T[] = [];
  const used = new Set<number>();
  let idx = start;
  while (out.length < count) {
    if (!used.has(idx)) {
      used.add(idx);
      out.push(pool[idx]);
    }
    idx = (idx + step) % len;
    if (used.size >= len) break;
  }
  // Fill any remainder by linear scan (safety net)
  for (let i = 0; out.length < count && i < len; i++) {
    if (!used.has(i)) {
      used.add(i);
      out.push(pool[i]);
    }
  }
  return out;
}

function makeQuestion(args: Omit<ToeicLRQuestion, "options" | "answer"> & { options: string[]; answerSeed?: number }): ToeicLRQuestion {
  const { items, answer } = reorder(args.options, args.answerSeed ?? 0);
  return {
    ...args,
    options: items,
    answer,
    explanation: args.explanation ?? "The correct answer is supported directly by the context and the distractors do not match the key detail.",
  };
}

function generatePart1(theme: Theme, examId: string, seed: number): ToeicLRQuestion[] {
  const pool: [string, string, string[]][] = [
    ["A woman is reviewing a document at a desk.", part1WomanReviewingDocument, ["A woman is watering plants in a hallway.", "A man is carrying boxes into a truck.", "Some chairs are being stacked near a wall."]],
    ["Two colleagues are discussing a chart on a screen.", part1ColleaguesChartScreen, ["The employees are cleaning the windows.", "A customer is paying at a counter.", "The road is being repaired."]],
    ["A laptop has been placed on a conference table.", part1LaptopConferenceTable, ["A printer is being loaded into a vehicle.", "Several people are boarding a train.", "A package is being weighed on a scale."]],
    ["A man is arranging materials before a presentation.", part1ManPresentationMaterials, ["A man is painting a sign outdoors.", "The shelves are completely empty.", "A waiter is serving drinks to guests."]],
    ["Some people are seated around a meeting table.", part1PeopleMeetingTable, ["Some people are standing in a checkout line.", "A bicycle is leaning against a fence.", "The floor is being swept by a cleaner."]],
    ["A worker is pointing at information on a display.", part1WorkerPointingDisplay, ["A worker is repairing a staircase.", "The vehicles are parked beside a river.", "A woman is trying on a jacket."]],
    ["A man is studying figures in a printed report.", part1WomanReviewingDocument, ["A man is closing a window.", "A woman is folding clothes.", "Some boxes are being delivered."]],
    ["The team is examining data shown on a monitor.", part1ColleaguesChartScreen, ["A vehicle is being washed outside.", "A person is climbing a ladder.", "A waiter is wiping a table."]],
    ["A computer has been left open in a meeting room.", part1LaptopConferenceTable, ["A man is repairing a bicycle.", "A woman is opening a bottle.", "Some plants are being watered."]],
    ["A presenter is checking handouts before a session.", part1ManPresentationMaterials, ["A chef is cutting vegetables.", "Children are running in a park.", "A mechanic is changing a tire."]],
    ["Several colleagues are gathered around a table.", part1PeopleMeetingTable, ["A passenger is buying a ticket.", "Shoppers are walking near a mall.", "A photographer is setting up a tripod."]],
    ["An employee is highlighting points on a screen.", part1WorkerPointingDisplay, ["A guard is opening a gate.", "Workers are unloading crates.", "A diver is entering a pool."]],
  ];

  const scenes = pickPool(pool, 6, seed);

  return scenes.map(([correct, imageUrl, distractors], i) => makeQuestion({
    id: `${examId}-p1-${i + 1}`,
    part: 1,
    prompt: "Look at the photograph and choose the statement that best describes it.",
    options: optionSet(correct, distractors),
    answerSeed: seed + i,
    transcript: [correct, ...distractors].map((line, idx) => `${String.fromCharCode(65 + idx)}. ${line}`).join("\n"),
    audioText: [correct, ...distractors].map((line, idx) => `${String.fromCharCode(65 + idx)}. ${line}`).join(". "),
    imageUrl,
    explanation: "Choose the statement that accurately describes the visible action or state in the photograph.",
  }));
}

function generatePart2(theme: Theme, examId: string, seed: number): ToeicLRQuestion[] {
  const stems = [
    ["When will the report be ready?", "By Thursday afternoon.", ["In the main lobby.", "It was very informative."]],
    ["Where is the product demonstration being held?", "In the training room.", ["At nine o'clock sharp.", "Because the projector was broken."]],
    ["Have you called the supplier yet?", "Yes, I spoke with them this morning.", ["The supply closet is upstairs.", "It starts after lunch."]],
    ["Who is leading the workshop?", "Ms. Nguyen from the operations team.", ["For about two hours.", "I left it on your desk."]],
    ["Why was the meeting postponed?", "The director's flight was delayed.", ["Every Tuesday morning.", "Please use the side entrance."]],
    ["Would you prefer tea or coffee?", "Coffee would be great, thanks.", ["The copy machine is new.", "She prefers the earlier train."]],
    ["How often do you update the schedule?", "Usually once a week.", ["Next to the elevator.", "No, I haven't seen it."]],
    ["Could you review these figures before noon?", "Sure, I'll check them right away.", ["The review was published online.", "It's across from the bank."]],
    ["Is the client presentation finished?", "Almost, but we still need the final slide.", ["The client is from Singapore.", "Please finish your lunch first."]],
    ["Which entrance should visitors use?", "The one near the reception desk.", ["Visitors arrived yesterday.", "It costs fifteen dollars."]],
    ["Do you know where Mr. Park parked the company van?", "I think it's behind the warehouse.", ["He works for the company.", "The parking policy changed last year."]],
    ["Should we send the invitation today or tomorrow?", "Let's send it today.", ["The invitation was very colorful.", "They invited thirty people."]],
    ["What time does the training session end?", "At half past three.", ["In the west conference room.", "Training is required for all staff."]],
    ["Can I borrow your access card for a minute?", "I'm sorry, visitors need a temporary pass.", ["The card reader is blue.", "I borrowed the book yesterday."]],
    ["Who approved the budget increase?", "The finance director did.", ["It increased by ten percent.", "Because demand was higher."]],
    ["Are there any seats left for the seminar?", "Yes, but only a few.", ["The seats are made of leather.", "It lasts for three days."]],
    ["Where should I submit the travel request?", "Through the employee portal.", ["I traveled there last month.", "The request was approved."]],
    ["Why don't we test the equipment now?", "Good idea. The room is free.", ["The equipment was expensive.", "No, I didn't receive the test results."]],
    ["How did you hear about the job opening?", "A colleague forwarded the posting to me.", ["The opening ceremony begins soon.", "It pays every two weeks."]],
    ["When is the maintenance scheduled?", "From ten tonight until two in the morning.", ["The maintenance team is excellent.", "Please schedule a meeting with HR."]],
    ["Could you print twenty copies of the agenda?", "Of course. I'll do it before the meeting.", ["The agenda has three main items.", "No, the printer is near the exit."]],
    ["Who should receive the signed contract?", "Please send it to the legal department.", ["The contract was signed yesterday.", "It should arrive by courier."]],
    ["Isn't the invoice due tomorrow?", "Actually, the deadline was extended.", ["The invoice lists six items.", "Tomorrow's forecast is cloudy."]],
    ["What do you think of the new dashboard?", "It's much easier to use.", ["Use the stairs on the left.", "The dashboard is under the hood."]],
    ["Would you mind taking notes during the call?", "Not at all. I'll share them afterward.", ["The call lasted thirty minutes.", "She noted the change yesterday."]],
  ];

  return stems.map(([question, correct, distractors], i) => {
    const choices = [correct as string, ...(distractors as string[])];
    const { items, answer } = reorder(choices, seed + i);
    return {
      id: `${examId}-p2-${i + 1}`,
      part: 2,
      prompt: "Listen to the question and choose the best response.",
      options: items,
      answer,
      transcript: `Q: ${question}\n${items.map((line, idx) => `${String.fromCharCode(65 + idx)}. ${line}`).join("\n")}`,
      audioText: `${question} ${items.map((line, idx) => `${String.fromCharCode(65 + idx)}. ${line}`).join(" ")}`,
      explanation: "The best response answers the question type directly and naturally.",
    } as ToeicLRQuestion;
  });
}

function generatePart3(theme: Theme, examId: string, seed: number): ToeicLRQuestion[] {
  const situations = [
    ["a delayed shipment", "warehouse", "call the carrier", "The tracking page has not changed since Monday"],
    ["a conference room booking", "office", "move the meeting to Room B", "The projector in Room A is not working"],
    ["a marketing brochure", "design studio", "send revised images", "The product photo needs to be brighter"],
    ["a client invoice", "accounting office", "check the billing address", "The amount does not match the purchase order"],
    ["a hotel reservation", "hotel front desk", "confirm a late checkout", "The guest's flight leaves in the evening"],
    ["a software update", "IT help desk", "install the patch", "The program closes unexpectedly"],
    ["a training schedule", "training center", "add another afternoon session", "The morning class is already full"],
    ["an office move", "new headquarters", "label the equipment boxes", "The moving company arrives on Friday"],
    ["a restaurant order", "café counter", "prepare a replacement meal", "The customer received the wrong sandwich"],
    ["a job interview", "recruiting office", "email the candidate directions", "The candidate is unfamiliar with the building"],
    ["a sales report", "manager's office", "revise the chart", "The regional totals were entered incorrectly"],
    ["a delivery route", "shipping desk", "leave earlier tomorrow", "Roadwork is causing morning delays"],
    ["a product demonstration", "trade fair booth", "test the tablet connection", "Visitors will arrive in twenty minutes"],
  ];

  return situations.flatMap(([topic, location, action, detail], groupIdx) => {
    const transcript = `M: I need your help with ${topic}. ${detail}.\nW: I see. We should ${action} before the end of the day.\nM: Good idea. I'll also notify ${theme.department} so everyone knows the plan.`;
    const groupId = `${examId}-p3-conv-${groupIdx + 1}`;
    return [
      makeQuestion({
        id: `${examId}-p3-${groupIdx * 3 + 1}`,
        part: 3,
        prompt: "What are the speakers mainly discussing?",
        options: optionSet(topic, [theme.event, "a staff award ceremony", "a new office policy"]),
        answerSeed: seed + groupIdx,
        transcript,
        audioText: transcript,
        passageGroupId: groupId,
      }),
      makeQuestion({
        id: `${examId}-p3-${groupIdx * 3 + 2}`,
        part: 3,
        prompt: "Where are the speakers most likely?",
        options: optionSet(location, ["at a bank", "at a city park", "at a theater"]),
        answerSeed: seed + groupIdx + 1,
        transcript,
        audioText: transcript,
        passageGroupId: groupId,
      }),
      makeQuestion({
        id: `${examId}-p3-${groupIdx * 3 + 3}`,
        part: 3,
        prompt: "What will the speakers probably do next?",
        options: optionSet(action, ["cancel the order", "hire a new receptionist", "close the office early"]),
        answerSeed: seed + groupIdx + 2,
        transcript,
        audioText: transcript,
        passageGroupId: groupId,
      }),
    ];
  });
}

function generatePart4(theme: Theme, examId: string, seed: number): ToeicLRQuestion[] {
  const talks = [
    ["announcement", `Attention employees. ${theme.company} will conduct system maintenance this Saturday from 10 P.M. to 2 A.M. Please save your files and sign out before leaving on Friday.`, "system maintenance", "Saturday from 10 P.M. to 2 A.M.", "save files and sign out"],
    ["advertisement", `Looking for a convenient venue for your next meeting? ${theme.place} offers modern rooms, catering packages, and free parking for groups of twenty or more. Call by June 30 for a ten percent discount.`, "meeting venue services", "groups of twenty or more", "call by June 30"],
    ["recorded message", `Thank you for calling ${theme.company}. Our offices are closed for the public holiday. Regular business hours will resume on Tuesday at 8 A.M. For urgent assistance, press 1.`, "holiday office closure", "Tuesday at 8 A.M.", "press 1 for urgent help"],
    ["news report", `Local officials announced that construction near ${theme.place} will finish two weeks ahead of schedule. The new access road is expected to reduce traffic during morning commutes.`, "construction finishing early", "near the conference center", "reduce morning traffic"],
    ["tour guide talk", `Welcome to ${theme.place}. Please keep your visitor badge visible at all times. The guided tour will begin in the lobby and end at the product showroom.`, "a guided tour", "in the lobby", "keep badges visible"],
    ["staff briefing", `Before today's ${theme.event}, please check that every name tag is arranged alphabetically. Extra programs are stored behind the registration desk.`, "event preparation", "behind the registration desk", "arrange name tags alphabetically"],
    ["public announcement", `The 7:45 express train to Central Station is delayed because of signal repairs. Passengers may use the 8:05 local train on platform 3 with the same ticket.`, "a train delay", "signal repairs", "use the 8:05 local train"],
    ["training notice", `This afternoon's workshop on ${theme.product} has been moved to Room 204. Participants should bring their laptops and log in ten minutes before the session begins.`, "a room change", "Room 204", "bring laptops and log in early"],
    ["shipping update", `Due to heavy rain, deliveries scheduled for the north district may arrive one day late. Customers will receive updated tracking numbers by email tonight.`, "delivery delays", "heavy rain", "check updated tracking emails"],
    ["museum announcement", `The east gallery will close at 4 P.M. today for a private reception. Visitors can still access the main exhibit and the museum shop until 6 P.M.`, "a gallery closing early", "at 4 P.M.", "visit the main exhibit or shop"],
  ];

  return talks.flatMap(([kind, transcript, purpose, detail, action], groupIdx) => {
    const groupId = `${examId}-p4-talk-${groupIdx + 1}`;
    return [
      makeQuestion({
        id: `${examId}-p4-${groupIdx * 3 + 1}`,
        part: 4,
        prompt: "What is the main purpose of the talk?",
        options: optionSet(purpose, ["to introduce a new employee", "to request a payment", "to cancel a contract"]),
        answerSeed: seed + groupIdx,
        transcript: transcript as string,
        audioText: transcript as string,
        passageGroupId: groupId,
      }),
      makeQuestion({
        id: `${examId}-p4-${groupIdx * 3 + 2}`,
        part: 4,
        prompt: "What specific detail is mentioned?",
        options: optionSet(detail, ["a free lunch coupon", "a new uniform requirement", "a parking violation"]),
        answerSeed: seed + groupIdx + 1,
        transcript: transcript as string,
        audioText: transcript as string,
        passageGroupId: groupId,
      }),
      makeQuestion({
        id: `${examId}-p4-${groupIdx * 3 + 3}`,
        part: 4,
        prompt: "What are listeners advised to do?",
        options: optionSet(action, ["submit a tax form", "replace their ID cards", "reserve a hotel room"]),
        answerSeed: seed + groupIdx + 2,
        transcript: transcript as string,
        audioText: transcript as string,
        passageGroupId: groupId,
      }),
    ];
  });
}

function generatePart5(theme: Theme, examId: string, seed: number): ToeicLRQuestion[] {
  const items = [
    ["All employees must submit travel receipts ___ five business days.", "within", ["during", "since", "among"], "'Within' gives the allowed time limit."],
    ["The new policy will be ___ at the beginning of next month.", "implemented", ["implement", "implementation", "implementing"], "Passive voice requires be + past participle."],
    ["Ms. Carter is responsible for ___ monthly sales data.", "analyzing", ["analyze", "analysis", "analyzed"], "After a preposition, use a gerund."],
    ["The supplier offered a ___ discount for bulk orders.", "substantial", ["substantially", "substance", "substantiate"], "An adjective modifies the noun 'discount'."],
    ["Please contact reception ___ you need a visitor badge.", "if", ["despite", "unless", "during"], "'If' introduces a condition."],
    ["The shipment was delayed ___ severe weather near the port.", "because of", ["although", "so that", "therefore"], "'Because of' is followed by a noun phrase."],
    ["The marketing team worked ___ to prepare for the launch.", "quickly", ["quick", "quicken", "quickness"], "An adverb modifies the verb 'worked'."],
    ["The contract ___ by both parties yesterday.", "was signed", ["signs", "signing", "has sign"], "Past passive: was + past participle."],
    ["Our downtown branch is ___ than the airport branch.", "busier", ["busy", "busily", "busiest"], "The sentence compares two branches."],
    ["The manual explains how ___ the device safely.", "to operate", ["operating", "operated", "operation"], "Use infinitive after 'how'."],
    ["Employees ___ attend the seminar will receive certificates.", "who", ["which", "whose", "what"], "Use 'who' for people as a subject relative pronoun."],
    ["The technician arrived ___ after the service call was placed.", "shortly", ["short", "shorten", "shortage"], "An adverb of time is needed."],
    ["The figures in the report are ___ accurate.", "remarkably", ["remarkable", "remark", "remarked"], "An adverb modifies the adjective 'accurate'."],
    ["The company has opened a new office ___ Singapore.", "in", ["at", "on", "by"], "Use 'in' with cities/countries."],
    ["The presentation was postponed ___ the speaker was ill.", "because", ["due to", "despite", "therefore"], "'Because' introduces a full clause."],
    ["Participants are advised to arrive ___ least fifteen minutes early.", "at", ["on", "by", "for"], "The fixed phrase is 'at least'."],
    ["The device should be stored in a ___ place.", "dry", ["dryly", "dryness", "dried"], "An adjective modifies 'place'."],
    ["Our team is looking for ways to improve customer ___.", "satisfaction", ["satisfy", "satisfied", "satisfying"], "A noun is needed after 'customer'."],
    ["The airport shuttle runs ___ thirty minutes.", "every", ["all", "each of", "during"], "'Every thirty minutes' is the correct frequency expression."],
    ["The candidate's experience makes her highly ___ for the position.", "qualified", ["qualify", "qualification", "qualifying"], "The adjective 'qualified' describes the candidate."],
    ["The printer is out of paper; ___, the report cannot be printed now.", "therefore", ["however", "although", "beside"], "'Therefore' shows result."],
    ["The board will review the proposal before ___ a final decision.", "making", ["make", "made", "makes"], "After 'before' used as a preposition, use gerund."],
    ["Mr. Ito speaks English ___ enough to lead international calls.", "fluently", ["fluent", "fluency", "fluency's"], "An adverb modifies 'speaks'."],
    ["The office will remain open ___ the renovation work.", "during", ["while", "because", "until of"], "'During' is followed by a noun phrase."],
    ["All requests must be approved ___ the department manager.", "by", ["with", "from", "to"], "Passive constructions use 'by' for the agent."],
    ["The seminar attracted more visitors ___ expected.", "than", ["as", "that", "then"], "Comparative phrase: more than expected."],
    ["Please make sure the doors are locked ___ leaving.", "before", ["because", "despite", "within"], "'Before leaving' indicates sequence."],
    ["The online form is available ___ the company website.", "on", ["in", "at", "to"], "Use 'on' for websites."],
    ["The manager thanked everyone for their ___ during the audit.", "cooperation", ["cooperate", "cooperative", "cooperatively"], "A noun is required after possessive 'their'."],
    ["The package should arrive ___ Friday at the latest.", "by", ["until", "since", "between"], "'By' marks a deadline."],
  ];

  return items.map(([prompt, correct, distractors, explanation], i) => makeQuestion({
    id: `${examId}-p5-${i + 1}`,
    part: 5,
    prompt: prompt as string,
    options: optionSet(correct as string, distractors as string[]),
    answerSeed: seed + i,
    explanation: explanation as string,
  }));
}

function generatePart6(theme: Theme, examId: string, seed: number): ToeicLRQuestion[] {
  const passages = [
    {
      text: `Dear Ms. Rivera,\n\nThank you for registering for our ${theme.event}. Your registration has been [BLANK1]. The program begins at 9 A.M. in the main hall. Please [BLANK2] your confirmation email at the entrance. [BLANK3]\n\nSincerely,\nEvent Services`,
      blanks: [
        ["confirmed", ["confirm", "confirmation", "confirming"], "Passive perfect requires a past participle."],
        ["present", ["presentation", "presented", "presenting"], "After 'please', use the base verb."],
        ["Light refreshments will be served during the first break.", ["The invoice was paid last year.", "The parking lot was closed permanently.", "The speaker resigned yesterday."], "This sentence logically adds event information."],
        ["What is the purpose of the email?", ["To confirm registration", "To reject an application", "To request a refund", "To advertise a hotel"], "The email confirms event registration.", true],
      ],
    },
    {
      text: `NOTICE\n\nStarting July 1, all employees must use the new ${theme.product} to submit travel expenses. Paper forms will no longer be [BLANK1]. Training videos are available on the staff portal, and supervisors will [BLANK2] questions during weekly team meetings. [BLANK3]`,
      blanks: [
        ["accepted", ["accept", "accepting", "acceptance"], "Passive voice requires a past participle."],
        ["answer", ["answered", "answering", "answers"], "'Will' is followed by the base verb."],
        ["The finance department recommends watching the videos before submitting a claim.", ["The cafeteria menu changes every Monday.", "The elevator inspection was completed last week.", "The company picnic was canceled."], "The sentence fits the topic of training and expenses."],
        ["What will replace paper forms?", [theme.product, "a company newsletter", "a parking permit", "a hotel voucher"], "The notice says the platform will be used for expense submission.", true],
      ],
    },
    {
      text: `To: ${theme.department}\nSubject: Office Supply Order\n\nOur monthly supply order will be placed this Friday. If your team needs printer paper, folders, or other materials, please send a list to the purchasing assistant by Thursday noon. Orders received after the deadline may not be [BLANK1] until next month. We appreciate your [BLANK2]. [BLANK3]`,
      blanks: [
        ["processed", ["process", "processing", "procession"], "Passive modal: may not be + past participle."],
        ["cooperation", ["cooperate", "cooperative", "cooperatively"], "A noun is needed after 'your'."],
        ["A shared spreadsheet has been created to make requests easier to track.", ["The office windows face the river.", "The old printer is black and gray.", "Lunch will begin at noon."], "This sentence relates to tracking supply requests."],
        ["When must requests be sent?", ["By Thursday noon", "By Friday evening", "By next month", "By Monday morning"], "The memo gives Thursday noon as the deadline.", true],
      ],
    },
    {
      text: `Customer Update\n\nWe are pleased to announce that ${theme.company} has extended its service hours. Beginning next week, representatives will be available from 7 A.M. to 9 P.M. on weekdays. This change is intended to provide more [BLANK1] support for customers in different time zones. To speak with an agent, customers can call the usual number or use the live chat feature [BLANK2] the website. [BLANK3]`,
      blanks: [
        ["convenient", ["convenience", "conveniently", "convene"], "An adjective modifies 'support'."],
        ["on", ["in", "at", "with"], "Use 'on' for websites."],
        ["Weekend service hours will remain unchanged for now.", ["The old logo was designed by a student.", "The warehouse roof is being painted.", "All invoices must be printed twice."], "The sentence adds related information about service hours."],
        ["Why are service hours being extended?", ["To support customers in different time zones", "To reduce the number of employees", "To close the call center", "To change the company name"], "The update states the reason directly.", true],
      ],
    },
  ];

  return passages.flatMap((passage, pIdx) => {
    const groupId = `${examId}-p6-text-${pIdx + 1}`;
    return passage.blanks.map((entry, qIdx) => {
      const [correctOrPrompt, distractorsOrOptions, explanation, isComprehension] = entry as [string, string[], string, boolean?];
      const prompt = isComprehension ? correctOrPrompt : `BLANK${qIdx + 1} — choose the best option:`;
      const options = isComprehension ? distractorsOrOptions : optionSet(correctOrPrompt, distractorsOrOptions);
      return makeQuestion({
        id: `${examId}-p6-${pIdx * 4 + qIdx + 1}`,
        part: 6,
        passage: passage.text,
        passageGroupId: groupId,
        prompt,
        options,
        answerSeed: seed + pIdx + qIdx,
        explanation,
      });
    });
  });
}

function generatePart7(theme: Theme, examId: string, seed: number): ToeicLRQuestion[] {
  const docs = Array.from({ length: 18 }, (_, i) => {
    const day = 5 + i;
    const deadline = `July ${day + 7}`;
    const topic = ["training registration", "office relocation", "product recall", "conference agenda", "customer survey", "job posting", "restaurant opening", "shipping policy", "library renovation", "software license", "wellness program", "supplier contract", "travel advisory", "equipment sale", "newsletter update", "parking notice", "market report", "charity event"][i];
    const benefit = ["free parking", "a ten percent discount", "extended service hours", "a training certificate", "priority seating", "complimentary lunch"][i % 6];
    const contact = [`hr@${theme.company.toLowerCase().replace(/[^a-z]/g, "")}.com`, "support@example.com", "events@example.com", "careers@example.com"][i % 4];
    const place = [theme.place, "main auditorium", "customer service desk", "online portal", "north warehouse", "city convention hall"][i % 6];
    const passage = `${i < 8 ? "EMAIL" : i < 13 ? "NOTICE" : "ARTICLE"}\nSubject: ${topic.replace(/\b\w/g, (m) => m.toUpperCase())}\n\n${theme.company} is announcing an update about ${topic}. The change will take effect on July ${day}. Employees and customers should check the ${place} for detailed instructions. Anyone who responds by ${deadline} will receive ${benefit}. For questions, contact ${contact}.\n\nAdditional details: The update is part of a plan to improve service quality, reduce delays, and make information easier to find.`;
    return { passage, topic, deadline, benefit, contact, place };
  });

  return docs.flatMap((doc, i) => {
    const groupId = `${examId}-p7-doc-${i + 1}`;
    const start = i * 3;
    return [
      makeQuestion({
        id: `${examId}-p7-${start + 1}`,
        part: 7,
        passage: doc.passage,
        passageGroupId: groupId,
        prompt: "What is the document mainly about?",
        options: optionSet(`An update about ${doc.topic}`, ["A personal travel story", "A restaurant menu", "A weather forecast"]),
        answerSeed: seed + i,
        explanation: "The subject and opening sentence identify the main topic.",
      }),
      makeQuestion({
        id: `${examId}-p7-${start + 2}`,
        part: 7,
        passage: doc.passage,
        passageGroupId: groupId,
        prompt: "What will people receive if they respond by the deadline?",
        options: optionSet(doc.benefit, ["a parking fine", "a new laptop", "a printed textbook"]),
        answerSeed: seed + i + 1,
        explanation: "The passage states the benefit for responding by the deadline.",
      }),
      makeQuestion({
        id: `${examId}-p7-${start + 3}`,
        part: 7,
        passage: doc.passage,
        passageGroupId: groupId,
        prompt: "By when should people respond?",
        options: optionSet(doc.deadline, ["June 1", "August 30", "December 15"]),
        answerSeed: seed + i + 2,
        explanation: "The response deadline is stated explicitly in the document.",
      }),
    ];
  });
}

export function createFullToeicLRExam(base: ToeicLRExam, index: number): ToeicLRExam {
  const theme = themeFor(base, index);
  const seed = index * 17 + base.id.length;
  const questions = [
    ...generatePart1(theme, base.id, seed),
    ...generatePart2(theme, base.id, seed),
    ...generatePart3(theme, base.id, seed),
    ...generatePart4(theme, base.id, seed),
    ...generatePart5(theme, base.id, seed),
    ...generatePart6(theme, base.id, seed),
    ...generatePart7(theme, base.id, seed),
  ];

  return {
    ...base,
    title: base.title.replace(/\s*\(compact.*\)$/i, ""),
    durationSec: 7200,
    questions,
  };
}

function speakingTask(args: ToeicSWTask): ToeicSWTask {
  return {
    scoringCriteria: ["Pronunciation", "Intonation", "Vocabulary", "Cohesion", "Task completion"],
    ...args,
  };
}

function writingTask(args: ToeicSWTask): ToeicSWTask {
  return {
    scoringCriteria: ["Grammar", "Vocabulary", "Organization", "Task completion"],
    ...args,
  };
}

export function createFullToeicSWExam(base: ToeicSWExam, index: number): ToeicSWExam {
  const theme = themeFor(base, index + 4);
  const seed = index * 23 + base.id.length;
  const speakingTasks: ToeicSWTask[] = [
    speakingTask({
      id: `${base.id}-s1`, type: "read-aloud", part: 1,
      prompt: `Read aloud the following text: Welcome to ${theme.company}. Visitors attending today's ${theme.event} should collect a badge at the reception desk before entering the main hall.`,
      prepSeconds: 45, responseSeconds: 45,
    }),
    speakingTask({
      id: `${base.id}-s2`, type: "read-aloud", part: 2,
      prompt: `Read aloud the following announcement: The ${theme.department} will provide a short orientation on the new ${theme.product} at 2 P.M. Please bring your laptop and arrive ten minutes early.`,
      prepSeconds: 45, responseSeconds: 45,
    }),
    speakingTask({
      id: `${base.id}-s3`, type: "describe-picture", part: 3,
      prompt: "Describe the picture in as much detail as you can.",
      prepSeconds: 45, responseSeconds: 45, imageUrl: makeSceneImage(seed + 1, "speaking"),
    }),
    speakingTask({
      id: `${base.id}-s4`, type: "describe-picture", part: 4,
      prompt: "Describe the picture in as much detail as you can, including the people, place, and activity.",
      prepSeconds: 45, responseSeconds: 45, imageUrl: makeSceneImage(seed + 2, "speaking"),
    }),
    ...["How often do you attend professional training?", "What type of training is most useful for your work?", "Describe one skill you would like to improve this year."].map((prompt, i) => speakingTask({
      id: `${base.id}-s${5 + i}`, type: "respond-questions", part: 5 + i, prompt, prepSeconds: 3, responseSeconds: i < 2 ? 15 : 30,
    })),
    ...["According to the schedule, when does the morning session begin?", "Which speaker will lead the workshop on customer communication?", "A participant can only attend after lunch. Which session should you recommend, and why?"].map((prompt, i) => speakingTask({
      id: `${base.id}-s${8 + i}`, type: "respond-questions", part: 8 + i,
      context: `Conference Schedule\n9:00 Opening remarks\n10:00 Customer Communication — Ms. Allen\n13:30 Digital Tools — Mr. Park\n15:00 Networking Session`,
      prompt, prepSeconds: 45, responseSeconds: i < 2 ? 15 : 30,
    })),
    speakingTask({
      id: `${base.id}-s11`, type: "express-opinion", part: 11,
      prompt: "Some companies allow employees to work flexible hours. Do you think this is a good policy? Give specific reasons and examples to support your opinion.",
      prepSeconds: 45, responseSeconds: 60,
    }),
  ];

  const writingTasks: ToeicSWTask[] = [1, 2, 3, 4, 5].map((n) => writingTask({
    id: `${base.id}-w${n}`, type: "write-sentence-picture", part: n,
    prompt: [
      "Write ONE sentence about the picture using the two words: meeting / discuss",
      "Write ONE sentence about the picture using the two words: employee / organize",
      "Write ONE sentence about the picture using the two words: customer / receive",
      "Write ONE sentence about the picture using the two words: technician / repair",
      "Write ONE sentence about the picture using the two words: presentation / explain",
    ][n - 1],
    prepSeconds: 0, responseSeconds: 480, imageUrl: makeSceneImage(seed + n + 5, "writing"),
    sampleAnswer: [
      "The employees are having a meeting to discuss the project schedule.",
      "An employee is organizing documents before the conference begins.",
      "A customer is receiving assistance at the service counter.",
      "A technician is repairing equipment in the office.",
      "The presenter is explaining the quarterly results during a presentation.",
    ][n - 1],
  }));

  writingTasks.push(
    writingTask({
      id: `${base.id}-w6`, type: "respond-email", part: 6,
      prompt: `You received this email:\n\nFrom: Morgan Lee\nSubject: Question about ${theme.event}\n\nI registered for the event but need information about parking and the starting time. Could you also tell me whether lunch will be provided?\n\nWrite a reply that answers the questions and offers one additional helpful detail.`,
      prepSeconds: 0, responseSeconds: 600,
      sampleAnswer: "Dear Morgan, thank you for registering. Parking is available next to the main hall, and the event starts at 9 A.M. Lunch will be provided for all registered participants. Please bring your confirmation email to check in more quickly.",
    }),
    writingTask({
      id: `${base.id}-w7`, type: "respond-email", part: 7,
      prompt: `You received this email:\n\nFrom: Customer Support Manager\nSubject: Delayed delivery\n\nA customer reports that an important order has not arrived. Write a response that apologizes, explains two actions you will take, and asks for one piece of information.`,
      prepSeconds: 0, responseSeconds: 600,
      sampleAnswer: "Dear Customer, we apologize for the delay with your order. We will check the tracking status immediately and contact the shipping company for an updated delivery time. Could you please send us your order number so we can investigate faster?",
    }),
    writingTask({
      id: `${base.id}-w8`, type: "write-essay", part: 8,
      prompt: "Do you agree or disagree with the following statement? Companies should invest more money in employee training than in advertising. Use specific reasons and examples to support your opinion. Write at least 300 words.",
      prepSeconds: 0, responseSeconds: 1800,
      sampleAnswer: "A strong essay should state a clear opinion, give two or three business-related reasons, and include concrete examples about training quality, customer service, productivity, or brand reputation.",
    }),
  );

  return {
    ...base,
    durationSec: 4800,
    speakingTasks,
    writingTasks,
  };
}

export function auditToeicLRExam(exam: ToeicLRExam): string[] {
  const errors: string[] = [];
  const counts = new Map<ToeicPart, number>();
  exam.questions.forEach((q, idx) => {
    counts.set(q.part, (counts.get(q.part) ?? 0) + 1);
    if (!q.id || !q.prompt?.trim()) errors.push(`${exam.id} q${idx + 1}: missing id or prompt`);
    if (q.part === 2 && q.options.length !== 3) errors.push(`${q.id}: Part 2 must have 3 options`);
    if (q.part !== 2 && q.options.length !== 4) errors.push(`${q.id}: Part ${q.part} must have 4 options`);
    if (q.answer < 0 || q.answer >= q.options.length) errors.push(`${q.id}: answer index out of range`);
    if (q.part <= 4 && !(q.audioText || q.transcript)) errors.push(`${q.id}: missing listening audio text/transcript`);
    if (q.part === 1 && !q.imageUrl) errors.push(`${q.id}: missing photograph image`);
    if ((q.part === 6 || q.part === 7) && !q.passage?.trim()) errors.push(`${q.id}: missing reading passage`);
    if (!q.explanation?.trim()) errors.push(`${q.id}: missing explanation`);
  });
  Object.entries(TOEIC_LR_OFFICIAL_PART_COUNTS).forEach(([part, expected]) => {
    const actual = counts.get(Number(part) as ToeicPart) ?? 0;
    if (actual !== expected) errors.push(`${exam.id}: Part ${part} has ${actual}, expected ${expected}`);
  });
  if (exam.questions.length !== 200) errors.push(`${exam.id}: total ${exam.questions.length}, expected 200`);
  return errors;
}

export function auditToeicSWExam(exam: ToeicSWExam): string[] {
  const errors: string[] = [];
  if (exam.speakingTasks.length !== TOEIC_SPEAKING_OFFICIAL_TASKS) errors.push(`${exam.id}: speaking tasks ${exam.speakingTasks.length}, expected 11`);
  if (exam.writingTasks.length !== TOEIC_WRITING_OFFICIAL_TASKS) errors.push(`${exam.id}: writing tasks ${exam.writingTasks.length}, expected 8`);
  [...exam.speakingTasks, ...exam.writingTasks].forEach((task) => {
    if (!task.id || !task.prompt?.trim()) errors.push(`${exam.id}: task missing id or prompt`);
    if ((task.type === "describe-picture" || task.type === "write-sentence-picture") && !task.imageUrl) errors.push(`${task.id}: missing image`);
    if (!task.scoringCriteria?.length) errors.push(`${task.id}: missing scoring criteria`);
  });
  return errors;
}
