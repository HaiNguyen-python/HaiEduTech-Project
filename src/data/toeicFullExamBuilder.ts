import type { ToeicLRExam, ToeicLRQuestion, ToeicPart, ToeicSWExam, ToeicSWTask } from "./toeicExams";
import part1WomanReviewingDocument from "@/assets/toeic/part1-woman-reviewing-document.jpg";
import part1ColleaguesChartScreen from "@/assets/toeic/part1-colleagues-chart-screen.jpg";
import part1LaptopConferenceTable from "@/assets/toeic/part1-laptop-conference-table.jpg";
import part1ManPresentationMaterials from "@/assets/toeic/part1-man-presentation-materials.jpg";
import part1PeopleMeetingTable from "@/assets/toeic/part1-people-meeting-table.jpg";
import part1WorkerPointingDisplay from "@/assets/toeic/part1-worker-pointing-display.jpg";
import part1ManWhiteboard from "@/assets/toeic/part1-man-whiteboard.jpg";
import part1WomanTyping from "@/assets/toeic/part1-woman-typing.jpg";
import part1WorkersLoading from "@/assets/toeic/part1-workers-loading.jpg";
import part1ClerkReceipt from "@/assets/toeic/part1-clerk-receipt.jpg";
import part1PeopleHallway from "@/assets/toeic/part1-people-hallway.jpg";
import part1ManGoggles from "@/assets/toeic/part1-man-goggles.jpg";
import part1WomanClipboard from "@/assets/toeic/part1-woman-clipboard.jpg";
import part1ShelvesMerchandise from "@/assets/toeic/part1-shelves-merchandise.jpg";
import part1TechnicianMachine from "@/assets/toeic/part1-technician-machine.jpg";
import part1WaiterTable from "@/assets/toeic/part1-waiter-table.jpg";
import part1CarsStreet from "@/assets/toeic/part1-cars-street.jpg";
import part1WomanJacket from "@/assets/toeic/part1-woman-jacket.jpg";
import part1ManNewspaper from "@/assets/toeic/part1-man-newspaper.jpg";
import part1MusicianTuning from "@/assets/toeic/part1-musician-tuning.jpg";
import part1DoctorChart from "@/assets/toeic/part1-doctor-chart.jpg";
import part1BooksShelf from "@/assets/toeic/part1-books-shelf.jpg";
import part1ConstructionHelmet from "@/assets/toeic/part1-construction-helmet.jpg";
import part1PassengerBoard from "@/assets/toeic/part1-passenger-board.jpg";
import part1BaristaDrink from "@/assets/toeic/part1-barista-drink.jpg";
import part1PhotographerCamera from "@/assets/toeic/part1-photographer-camera.jpg";
import part1SalespersonProduct from "@/assets/toeic/part1-salesperson-product.jpg";
import part1TeacherChalkboard from "@/assets/toeic/part1-teacher-chalkboard.jpg";
import part1ChefChopping from "@/assets/toeic/part1-chef-chopping.jpg";
import part1ReceptionistPhone from "@/assets/toeic/part1-receptionist-phone.jpg";
import part1GardenerHedge from "@/assets/toeic/part1-gardener-hedge.jpg";
import part1JoggerPark from "@/assets/toeic/part1-jogger-park.jpg";
import part1MechanicCar from "@/assets/toeic/part1-mechanic-car.jpg";
import part1PharmacistBottle from "@/assets/toeic/part1-pharmacist-bottle.jpg";
import part1FloristFlowers from "@/assets/toeic/part1-florist-flowers.jpg";
import part1PilotCockpit from "@/assets/toeic/part1-pilot-cockpit.jpg";
import part1JournalistNotes from "@/assets/toeic/part1-journalist-notes.jpg";
import part1VendorFruit from "@/assets/toeic/part1-vendor-fruit.jpg";
import part1ChildLibrary from "@/assets/toeic/part1-child-library.jpg";
import part1DentistEquipment from "@/assets/toeic/part1-dentist-equipment.jpg";
import part1ScientistMicroscope from "@/assets/toeic/part1-scientist-microscope.jpg";
import part1ArtistCanvas from "@/assets/toeic/part1-artist-canvas.jpg";
import part1CoachPlayers from "@/assets/toeic/part1-coach-players.jpg";
import part1TourGuideLandmark from "@/assets/toeic/part1-tourguide-landmark.jpg";
import part1HotelClerkKey from "@/assets/toeic/part1-hotelclerk-key.jpg";
import part1DeliveryParcel from "@/assets/toeic/part1-delivery-parcel.jpg";
import part1BankTellerBills from "@/assets/toeic/part1-bankteller-bills.jpg";
import part1MusicianStage from "@/assets/toeic/part1-musician-stage.jpg";

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

// Pick `count` items from `pool` so that each exam (examIndex) gets a
// non-overlapping slice when the pool is large enough (len >= 8 * count).
// When the pool is too small, slices wrap around but each exam still starts
// at a unique offset to maximise diversity.
function pickPool<T>(pool: T[], count: number, examIndex: number): T[] {
  const len = pool.length;
  if (len === 0) return [];
  const start = ((examIndex * count) % len + len) % len;
  const out: T[] = [];
  for (let i = 0; i < count; i++) {
    out.push(pool[(start + i) % len]);
  }
  return out;
}

// Per-exam content variation — swaps common tokens so even shared stems
// look different across the 8 exams. Each replacement uses an 8-element
// rotation keyed by examIndex.
const VARY_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Monday", "Wednesday", "Friday"];
const VARY_TIMES = ["9 A.M.", "10 A.M.", "11 A.M.", "1 P.M.", "2 P.M.", "3 P.M.", "4 P.M.", "8 A.M."];
const VARY_PERCENTS = ["ten", "fifteen", "twenty", "twenty-five", "thirty", "five", "twelve", "eighteen"];
const VARY_NAMES_F = ["Ms. Nguyen", "Ms. Carter", "Ms. Park", "Ms. Tanaka", "Ms. Rivera", "Ms. Lopez", "Ms. Chen", "Ms. Singh"];
const VARY_NAMES_M = ["Mr. Park", "Mr. Ito", "Mr. Kumar", "Mr. Silva", "Mr. Klein", "Mr. Owens", "Mr. Brooks", "Mr. Hassan"];
const VARY_CITIES = ["Singapore", "Lisbon", "Helsinki", "Toronto", "Sydney", "Dubai", "Berlin", "Osaka"];
const VARY_NUMS = ["fifteen", "twenty", "twenty-five", "thirty", "forty", "fifty", "ten", "eighteen"];
const VARY_DURATIONS = ["two hours", "ninety minutes", "three hours", "forty-five minutes", "one hour", "two and a half hours", "fifty minutes", "seventy-five minutes"];

function varyText(text: string, examIndex: number): string {
  const i = ((examIndex % 8) + 8) % 8;
  return text
    .replace(/\bThursday\b/g, VARY_DAYS[i])
    .replace(/\b9 A\.M\.\b/g, VARY_TIMES[i])
    .replace(/\bten percent\b/gi, `${VARY_PERCENTS[i]} percent`)
    .replace(/\bMs\. Nguyen\b/g, VARY_NAMES_F[i])
    .replace(/\bMs\. Carter\b/g, VARY_NAMES_F[(i + 3) % 8])
    .replace(/\bMs\. Park\b/g, VARY_NAMES_F[(i + 5) % 8])
    .replace(/\bMr\. Park\b/g, VARY_NAMES_M[i])
    .replace(/\bMr\. Ito\b/g, VARY_NAMES_M[(i + 2) % 8])
    .replace(/\bSingapore\b/g, VARY_CITIES[i])
    .replace(/\bLisbon\b/g, VARY_CITIES[(i + 4) % 8])
    .replace(/\bOsaka\b/g, VARY_CITIES[(i + 6) % 8])
    .replace(/\bfifteen minutes\b/g, `${VARY_NUMS[i]} minutes`)
    .replace(/\btwenty minutes\b/g, `${VARY_NUMS[(i + 2) % 8]} minutes`)
    .replace(/\bthirty minutes\b/g, `${VARY_NUMS[(i + 4) % 8]} minutes`)
    .replace(/\btwo hours\b/g, VARY_DURATIONS[i]);
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

function generatePart1(theme: Theme, examId: string, seed: number, examIndex: number): ToeicLRQuestion[] {
  const photoPool: [string, string, string[]][] = [
    ["A woman is reviewing a document at a desk.", part1WomanReviewingDocument, ["A woman is watering plants in a hallway.", "A man is carrying boxes into a truck.", "Some chairs are being stacked near a wall."]],
    ["Two colleagues are discussing a chart on a screen.", part1ColleaguesChartScreen, ["The employees are cleaning the windows.", "A customer is paying at a counter.", "The road is being repaired."]],
    ["A laptop has been placed on a conference table.", part1LaptopConferenceTable, ["A printer is being loaded into a vehicle.", "Several people are boarding a train.", "A package is being weighed on a scale."]],
    ["A man is arranging materials before a presentation.", part1ManPresentationMaterials, ["A man is painting a sign outdoors.", "The shelves are completely empty.", "A waiter is serving drinks to guests."]],
    ["Some people are seated around a meeting table.", part1PeopleMeetingTable, ["Some people are standing in a checkout line.", "A bicycle is leaning against a fence.", "The floor is being swept by a cleaner."]],
    ["A worker is pointing at information on a display.", part1WorkerPointingDisplay, ["A worker is repairing a staircase.", "The vehicles are parked beside a river.", "A woman is trying on a jacket."]],
  ];

  const extraStatements: [string, string, string[]][] = [
    ["A man is standing in front of a whiteboard.", part1ManWhiteboard, ["A man is wiping the whiteboard clean.", "A woman is sitting on the floor.", "Some students are leaving a classroom."]],
    ["A woman is typing on a keyboard.", part1WomanTyping, ["A woman is watering a plant.", "A man is sleeping at a desk.", "Some children are drawing pictures."]],
    ["Workers are loading boxes onto a truck.", part1WorkersLoading, ["Workers are repairing a roof.", "Customers are tasting samples.", "A driver is parking a car."]],
    ["A clerk is handing a receipt to a customer.", part1ClerkReceipt, ["A clerk is sweeping the floor.", "A waiter is taking an order.", "A man is carrying a ladder."]],
    ["Several people are walking down a hallway.", part1PeopleHallway, ["Several people are riding bicycles.", "A man is climbing some stairs.", "A guard is opening a gate."]],
    ["A man is wearing safety goggles.", part1ManGoggles, ["A man is fishing by a lake.", "A woman is painting a wall.", "Some plants are being trimmed."]],
    ["A woman is holding a clipboard.", part1WomanClipboard, ["A woman is wrapping a gift.", "A waiter is serving food.", "Some books are stacked on a shelf."]],
    ["The shelves are filled with merchandise.", part1ShelvesMerchandise, ["The shelves are being repaired.", "A truck is being unloaded.", "Customers are leaving the store."]],
    ["A technician is checking a machine.", part1TechnicianMachine, ["A technician is washing a window.", "A barista is making coffee.", "Some workers are eating lunch."]],
    ["A waiter is setting a table.", part1WaiterTable, ["A waiter is washing dishes.", "A chef is greeting customers.", "Some glasses are being broken."]],
    ["Cars are parked along the street.", part1CarsStreet, ["Cars are being towed away.", "A bus is making a turn.", "Pedestrians are crossing a bridge."]],
    ["A woman is putting on a jacket.", part1WomanJacket, ["A woman is folding a shirt.", "A child is opening a present.", "Some shoes are being repaired."]],
    ["A man is reading a newspaper outdoors.", part1ManNewspaper, ["A man is mowing a lawn.", "A woman is pushing a stroller.", "Some boys are playing soccer."]],
    ["A musician is tuning an instrument.", part1MusicianTuning, ["A musician is signing autographs.", "A teacher is grading papers.", "Some chairs are being arranged."]],
    ["A doctor is examining a patient's chart.", part1DoctorChart, ["A doctor is closing a window.", "A nurse is unloading a delivery.", "Some equipment is being moved."]],
    ["Books are being placed on a shelf.", part1BooksShelf, ["Books are being printed in a factory.", "A librarian is opening a door.", "A reader is paying for a magazine."]],
    ["A construction worker is wearing a helmet.", part1ConstructionHelmet, ["A construction worker is taking a nap.", "A painter is mixing colors.", "Some cement is being poured."]],
    ["A passenger is checking the departure board.", part1PassengerBoard, ["A passenger is boarding a plane.", "A pilot is closing a hatch.", "Some luggage is being scanned."]],
    ["A barista is preparing a drink at the counter.", part1BaristaDrink, ["A barista is wiping a window.", "A baker is decorating a cake.", "Some tables are being moved outside."]],
    ["A photographer is adjusting a camera.", part1PhotographerCamera, ["A photographer is leaving the studio.", "A model is changing clothes.", "Some lights are being turned off."]],
    ["A salesperson is showing a product to a customer.", part1SalespersonProduct, ["A salesperson is closing the cash register.", "A delivery driver is asking for a signature.", "Some products are being thrown away."]],
    ["A teacher is writing on a chalkboard.", part1TeacherChalkboard, ["A teacher is collecting homework.", "Students are leaving for recess.", "A janitor is mopping the floor."]],
    ["A chef is chopping vegetables on a cutting board.", part1ChefChopping, ["A chef is greeting diners at the entrance.", "A waiter is balancing several plates.", "Some bread is being baked."]],
    ["A receptionist is answering a phone call.", part1ReceptionistPhone, ["A receptionist is locking the front door.", "A guest is signing the register.", "Some flowers are being delivered."]],
    ["A gardener is trimming a hedge.", part1GardenerHedge, ["A gardener is washing a car.", "A delivery person is ringing a bell.", "Some leaves are being raked."]],
    ["A jogger is running along a path in the park.", part1JoggerPark, ["A jogger is stretching by a bench.", "A cyclist is fixing a flat tire.", "Some dogs are being walked."]],
    ["A mechanic is checking under the hood of a car.", part1MechanicCar, ["A mechanic is changing a tire.", "A driver is paying for fuel.", "Some cars are being polished."]],
    ["A pharmacist is labeling a bottle of medicine.", part1PharmacistBottle, ["A pharmacist is closing the shop.", "A customer is asking for directions.", "Some shelves are being restocked."]],
    ["A florist is arranging flowers in a vase.", part1FloristFlowers, ["A florist is sweeping the sidewalk.", "A customer is buying a card.", "Some plants are being delivered."]],
    ["A pilot is reviewing a flight plan in the cockpit.", part1PilotCockpit, ["A pilot is greeting passengers.", "A flight attendant is closing a door.", "Some snacks are being served."]],
    ["A journalist is taking notes during an interview.", part1JournalistNotes, ["A journalist is leaving a press conference.", "A photographer is setting up a tripod.", "Some microphones are being adjusted."]],
    ["A vendor is selling fruit at an outdoor market.", part1VendorFruit, ["A vendor is closing the market stall.", "A shopper is choosing vegetables.", "Some boxes are being stacked."]],
    ["A child is reading a book in a library.", part1ChildLibrary, ["A child is climbing a tree.", "A librarian is shelving books.", "Some chairs are being moved."]],
    ["A dentist is preparing equipment in the clinic.", part1DentistEquipment, ["A dentist is leaving the office.", "A patient is filling out a form.", "Some instruments are being cleaned."]],
    ["A scientist is looking through a microscope.", part1ScientistMicroscope, ["A scientist is washing test tubes.", "A student is taking notes.", "Some samples are being labeled."]],
    ["An artist is painting a canvas in the studio.", part1ArtistCanvas, ["An artist is cleaning brushes.", "A visitor is buying a sculpture.", "Some frames are being hung."]],
    ["A coach is giving instructions to the players.", part1CoachPlayers, ["A coach is walking off the field.", "A referee is signaling a foul.", "Some balls are being collected."]],
    ["A tour guide is pointing at a landmark.", part1TourGuideLandmark, ["A tour guide is selling tickets.", "A tourist is taking a photograph.", "Some maps are being handed out."]],
    ["A hotel clerk is handing over a room key.", part1HotelClerkKey, ["A hotel clerk is mopping the lobby.", "A bellhop is loading luggage onto a cart.", "Some guests are leaving the hotel."]],
    ["A delivery person is carrying a parcel to the door.", part1DeliveryParcel, ["A delivery person is parking a van.", "A homeowner is signing a form.", "Some packages are being scanned."]],
    ["A bank teller is counting bills behind the counter.", part1BankTellerBills, ["A bank teller is closing the window.", "A customer is filling out a slip.", "Some coins are being sorted."]],
    ["A musician is performing on a small stage.", part1MusicianStage, ["A musician is tuning before the show.", "Audience members are clapping.", "Some lights are being adjusted."]],
  ];

  // 48-scene pool: all real photographs matching each statement.
  const pool: [string, string, string[]][] = [...photoPool, ...extraStatements];

  const scenes = pickPool(pool, 6, examIndex);

  return scenes.map(([correct, imageUrl, distractors], i) => {
    const v = (s: string) => varyText(s, examIndex);
    const correctV = v(correct);
    const distractorsV = distractors.map(v);
    return makeQuestion({
      id: `${examId}-p1-${i + 1}`,
      part: 1,
      prompt: "Look at the photograph and choose the statement that best describes it.",
      options: optionSet(correctV, distractorsV),
      answerSeed: seed + i,
      transcript: [correctV, ...distractorsV].map((line, idx) => `${String.fromCharCode(65 + idx)}. ${line}`).join("\n"),
      audioText: [correctV, ...distractorsV].map((line, idx) => `${String.fromCharCode(65 + idx)}. ${line}`).join(". "),
      imageUrl,
      explanation: "Choose the statement that accurately describes the visible action or state in the photograph.",
    });
  });
}

function generatePart2(theme: Theme, examId: string, seed: number, examIndex: number): ToeicLRQuestion[] {
  const pool: [string, string, string[]][] = [
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
    ["Where did you put the projector remote?", "It's in the top drawer of the cabinet.", ["The remote area is restricted.", "We arrived a bit late."]],
    ["Has the new policy been announced yet?", "Yes, it went out by email this morning.", ["The announcement was funny.", "They moved into the new office."]],
    ["Why are the lights still on in the lobby?", "I forgot to switch them off after closing.", ["The lobby is on the second floor.", "She prefers warm lighting."]],
    ["Will the order arrive on time?", "It should be here by Thursday morning.", ["Order forms are at the front desk.", "It was very heavy."]],
    ["Do you want me to call a taxi?", "That would be helpful, thank you.", ["The taxi is yellow.", "I called yesterday afternoon."]],
    ["How was your business trip to Osaka?", "It went better than I expected.", ["I'd like a window seat.", "The hotel is being renovated."]],
    ["Could we discuss the proposal after lunch?", "Sure, let's meet around two o'clock.", ["The lunch menu changed.", "I read the proposal aloud."]],
    ["Who's going to handle the customer complaint?", "Tom said he'd take care of it.", ["The customer left a tip.", "Around the corner."]],
    ["Where can I find the staff handbook?", "On the shared drive under HR documents.", ["I found it last week.", "Staff are very helpful."]],
    ["Why isn't the printer working?", "It looks like it's out of toner.", ["The printer was on sale.", "Because she said so."]],
    ["When does the new branch open?", "Sometime in early September.", ["The branch is downtown.", "Open the door, please."]],
    ["Should I email or fax the contract?", "Email is fine — it's faster.", ["The fax machine is broken.", "It's a long contract."]],
    ["Aren't you supposed to be at the conference?", "It was rescheduled to next week.", ["The conference room is reserved.", "I'm supposed to be on time."]],
    ["What did the manager say about the budget?", "She wants us to reduce travel costs.", ["He's the new manager.", "Budgets are due Friday."]],
    ["How long will the renovation take?", "About six weeks, according to the contractor.", ["It's a large building.", "We renovated last year."]],
  ];

  const stems = pickPool(pool, 25, examIndex);

  return stems.map(([question, correct, distractors], i) => {
    const v = (s: string) => varyText(s, examIndex);
    const questionV = v(question);
    const choices = [v(correct), ...distractors.map(v)];
    const { items, answer } = reorder(choices, seed + i);
    return {
      id: `${examId}-p2-${i + 1}`,
      part: 2,
      prompt: "Listen to the question and choose the best response.",
      options: items,
      answer,
      transcript: `Q: ${questionV}\n${items.map((line, idx) => `${String.fromCharCode(65 + idx)}. ${line}`).join("\n")}`,
      audioText: `${questionV} ${items.map((line, idx) => `${String.fromCharCode(65 + idx)}. ${line}`).join(" ")}`,
      explanation: "The best response answers the question type directly and naturally.",
    } as ToeicLRQuestion;
  });
}

function generatePart3(theme: Theme, examId: string, seed: number, examIndex: number): ToeicLRQuestion[] {
  const pool: [string, string, string, string][] = [
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
    ["a missing package", "reception desk", "contact the courier", "The package was supposed to arrive yesterday"],
    ["a printer malfunction", "copy room", "order a service technician", "Pages are coming out smudged"],
    ["a website redesign", "creative agency", "approve the new homepage", "The launch date was moved up"],
    ["a customer refund request", "store manager's office", "process the refund", "The receipt is older than thirty days"],
    ["a flight cancellation", "airport check-in counter", "rebook a later flight", "The next available departure is at six"],
    ["an employee orientation", "human resources office", "prepare the welcome packet", "Three new hires start on Monday"],
    ["a catering order", "company kitchen", "double the lunch quantity", "Twenty extra guests just confirmed"],
    ["a faulty security camera", "lobby control room", "schedule a repair visit", "Footage from yesterday is missing"],
    ["a budget proposal", "executive boardroom", "revise the cost estimates", "The original numbers exceed the cap"],
    ["a magazine subscription", "subscription office", "send a renewal notice", "The current issue will be the last one"],
  ];

  const situations = pickPool(pool, 13, examIndex);

  return situations.flatMap(([topic, location, action, detail], groupIdx) => {
    const v = (s: string) => varyText(s, examIndex);
    const transcript = `M: I need your help with ${v(topic)}. ${v(detail)}.\nW: I see. We should ${v(action)} before the end of the day.\nM: Good idea. I'll also notify ${theme.department} so everyone knows the plan.`;
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

function generatePart4(theme: Theme, examId: string, seed: number, examIndex: number): ToeicLRQuestion[] {
  const pool: [string, string, string, string, string][] = [
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
    ["weather report", `Heavy snow is expected throughout the region tomorrow morning. Commuters should plan for delays and consider working from home if possible.`, "a weather warning", "heavy snow tomorrow morning", "work from home if possible"],
    ["radio commercial", `Visit Greenleaf Garden Center this weekend for our biggest plant sale of the year. All outdoor furniture is forty percent off through Sunday evening.`, "a weekend sale", "forty percent off outdoor furniture", "visit before Sunday evening"],
    ["airport announcement", `Flight 482 to Vancouver is now boarding at gate twenty-three. Passengers traveling with small children may board first.`, "a boarding announcement", "gate twenty-three", "families with children board first"],
    ["voicemail message", `Hi, this is Daniel from Brookline Dental. I'm calling to remind you of your cleaning appointment on Thursday at 3 P.M. Please call back to confirm.`, "an appointment reminder", "Thursday at 3 P.M.", "call back to confirm"],
    ["meeting opener", `Good morning, everyone. Before we begin, I'd like to welcome our new regional manager, Ms. Park, who will lead today's strategy session.`, "introducing a new manager", "Ms. Park", "listen to the strategy session"],
    ["restaurant announcement", `Diners, please note that our kitchen will close fifteen minutes earlier than usual tonight due to staff training. Last orders should be placed by 9:45.`, "an early kitchen closing", "fifteen minutes earlier", "place orders by 9:45"],
    ["product instruction", `Before using the espresso machine for the first time, run two cycles of plain water through the system. This removes any factory residue.`, "first-time setup", "two cycles of plain water", "run cleaning cycles before use"],
    ["volunteer briefing", `Thank you all for joining today's clean-up event. Gloves and bags are at the registration tent. Please return any unused supplies before noon.`, "a clean-up event", "at the registration tent", "return unused supplies by noon"],
  ];

  const talks = pickPool(pool, 10, examIndex);

  return talks.flatMap(([kind, transcript, purpose, detail, action], groupIdx) => {
    const transcriptV = varyText(transcript as string, examIndex);
    const groupId = `${examId}-p4-talk-${groupIdx + 1}`;
    return [
      makeQuestion({
        id: `${examId}-p4-${groupIdx * 3 + 1}`,
        part: 4,
        prompt: "What is the main purpose of the talk?",
        options: optionSet(purpose, ["to introduce a new employee", "to request a payment", "to cancel a contract"]),
        answerSeed: seed + groupIdx,
        transcript: transcriptV,
        audioText: transcriptV,
        passageGroupId: groupId,
      }),
      makeQuestion({
        id: `${examId}-p4-${groupIdx * 3 + 2}`,
        part: 4,
        prompt: "What specific detail is mentioned?",
        options: optionSet(detail, ["a free lunch coupon", "a new uniform requirement", "a parking violation"]),
        answerSeed: seed + groupIdx + 1,
        transcript: transcriptV,
        audioText: transcriptV,
        passageGroupId: groupId,
      }),
      makeQuestion({
        id: `${examId}-p4-${groupIdx * 3 + 3}`,
        part: 4,
        prompt: "What are listeners advised to do?",
        options: optionSet(action, ["submit a tax form", "replace their ID cards", "reserve a hotel room"]),
        answerSeed: seed + groupIdx + 2,
        transcript: transcriptV,
        audioText: transcriptV,
        passageGroupId: groupId,
      }),
    ];
  });
}

function generatePart5(theme: Theme, examId: string, seed: number, examIndex: number): ToeicLRQuestion[] {
  const pool: [string, string, string[], string][] = [
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
    ["Sales figures have improved ___ the launch of the new app.", "since", ["for", "during", "until"], "'Since' marks a starting point in the past."],
    ["The renovation will be completed ___ the end of October.", "by", ["until", "from", "between"], "'By' indicates a deadline."],
    ["Visitors are kindly asked to ___ silent in the gallery.", "remain", ["remains", "remaining", "remained"], "Use the base form after 'to'."],
    ["The ___ of the building is scheduled for next quarter.", "renovation", ["renovate", "renovated", "renovating"], "A noun is needed after 'the'."],
    ["The catering team prepared the meal ___ than expected.", "faster", ["fast", "fastest", "fastly"], "Comparative form is required before 'than'."],
    ["Her presentation was both ___ and engaging.", "informative", ["informatively", "information", "inform"], "An adjective parallels 'engaging'."],
    ["The instructions ___ in the user manual are very clear.", "provided", ["provide", "providing", "provides"], "Reduced relative clause uses past participle."],
    ["___ the heavy rain, the outdoor event continued as planned.", "Despite", ["Although", "Because", "However"], "'Despite' is followed by a noun phrase."],
    ["The award was given to the employee ___ ideas saved the company money.", "whose", ["who", "which", "whom"], "'Whose' shows possession."],
    ["The travel agency offers ___ packages for corporate clients.", "customized", ["customize", "customizing", "customizes"], "A past participle adjective modifies 'packages'."],
    ["Sign-up sheets are located ___ the front desk.", "next to", ["between", "among", "into"], "'Next to' indicates an adjacent position."],
    ["The auditorium can ___ up to five hundred people.", "accommodate", ["accommodation", "accommodating", "accommodated"], "A base verb follows the modal 'can'."],
    ["Our service center is open seven days ___ week.", "a", ["the", "an", "any"], "Use 'a' before 'week' in this fixed expression."],
    ["The manager asked us ___ in the survey.", "to participate", ["participate", "participating", "participated"], "'Ask + object + to-infinitive' pattern."],
    ["The instructions are clear ___ first-time users.", "for", ["of", "on", "at"], "'Clear for' targets a group."],
    ["The employees ___ for the project will be announced tomorrow.", "selected", ["select", "selecting", "selects"], "Past participle as reduced relative clause."],
    ["Please ___ the form before submitting it online.", "complete", ["completes", "completing", "completion"], "Imperative requires the base verb."],
    ["The meeting agenda was sent ___ everyone last night.", "to", ["for", "with", "from"], "'Sent to' marks the recipient."],
    ["Production has increased ___ over the past quarter.", "significantly", ["significant", "significance", "signify"], "An adverb modifies 'increased'."],
    ["The ___ of the new branch will create thirty jobs.", "opening", ["open", "opens", "opened"], "A noun (gerund) is needed after 'the'."],
  ];

  const items = pickPool(pool, 30, examIndex);

  return items.map(([prompt, correct, distractors, explanation], i) => makeQuestion({
    id: `${examId}-p5-${i + 1}`,
    part: 5,
    prompt: varyText(prompt, examIndex),
    options: optionSet(correct, distractors),
    answerSeed: seed + i,
    explanation,
  }));
}

function generatePart6(theme: Theme, examId: string, seed: number, examIndex: number): ToeicLRQuestion[] {
  const pool = [
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
    {
      text: `MEMO\nFrom: Facilities Manager\nTo: All Staff\nSubject: Parking Lot Resurfacing\n\nThe north parking lot will be [BLANK1] from May 4 to May 7. During that period, employees should park in the south lot or use public transportation. We apologize for any [BLANK2] caused by this work. [BLANK3]`,
      blanks: [
        ["closed", ["close", "closing", "closure"], "Passive voice requires a past participle."],
        ["inconvenience", ["inconvenient", "inconveniently", "inconvenienced"], "A noun follows 'any'."],
        ["Carpooling is encouraged to reduce demand on the south lot.", ["The roof was painted blue last spring.", "The cafeteria will close permanently.", "Visitors must wear formal attire."], "The sentence relates to parking and transportation."],
        ["When will the work end?", ["May 7", "May 4", "April 4", "June 7"], "The memo states the resurfacing ends on May 7.", true],
      ],
    },
    {
      text: `Job Posting\n\n${theme.company} is seeking a part-time office assistant to support the ${theme.department}. The successful candidate will be ___ for sorting mail, scheduling appointments, and assisting visitors. Applicants must [BLANK1] strong communication skills and basic computer knowledge. To apply, please [BLANK2] a résumé and cover letter to careers@example.com. [BLANK3]`,
      blanks: [
        ["have", ["had", "having", "has"], "Use the base verb after 'must'."],
        ["submit", ["submission", "submits", "submitted"], "Imperative requires a base verb."],
        ["Applications received after May 30 will not be considered.", ["The office building is twelve stories tall.", "The previous assistant has retired to Spain.", "All employees enjoy free coffee."], "The sentence adds an application deadline."],
        ["Where should applicants send their materials?", ["careers@example.com", "the front desk", "the local newspaper", "the city library"], "The posting gives an application email address.", true],
      ],
    },
    {
      text: `Press Release\n\n${theme.company} announced today that it will [BLANK1] a new branch office in Lisbon next spring. The expansion is expected to create approximately fifty new positions, mostly in customer service and ${theme.department}. Company spokesperson Lina Park said the move reflects [BLANK2] demand for the company's services in southern Europe. [BLANK3]`,
      blanks: [
        ["open", ["opens", "opening", "opened"], "Use base verb after 'will'."],
        ["growing", ["grow", "growth", "grew"], "An adjective modifies 'demand'."],
        ["Recruitment for the new positions will begin in early autumn.", ["The CEO recently sold his vacation home.", "Headquarters will move to a smaller building.", "The company will discontinue its email newsletter."], "The sentence continues the expansion story.", false],
        ["What is the press release mainly about?", ["A new branch office", "A merger with a competitor", "A change in product packaging", "A scheduled price increase"], "The release announces a new branch.", true],
      ],
    },
    {
      text: `To: All Employees\nFrom: IT Help Desk\nSubject: Mandatory Password Reset\n\nFor security reasons, all employees must [BLANK1] their company password by Friday at 5 P.M. Instructions can be found on the staff portal under "Account Security." If you experience any issues, please contact the IT help desk [BLANK2]. [BLANK3]`,
      blanks: [
        ["reset", ["resets", "resetting", "resetted"], "Use the base verb after the modal 'must'."],
        ["immediately", ["immediate", "immediacy", "immediates"], "An adverb modifies 'contact'."],
        ["Passwords that are not updated by the deadline will be deactivated.", ["The cafeteria menu features new soups.", "The company gym is open until midnight.", "Office plants will be replaced next week."], "The sentence reinforces the deadline.", false],
        ["What is the deadline for resetting passwords?", ["Friday at 5 P.M.", "Monday morning", "Saturday at noon", "The end of the month"], "The memo states the deadline.", true],
      ],
    },
  ];

  const passages = pickPool(pool, 4, examIndex);

  return passages.flatMap((passage, pIdx) => {
    const passageTextV = varyText(passage.text, examIndex);
    const groupId = `${examId}-p6-text-${pIdx + 1}`;
    return passage.blanks.map((entry, qIdx) => {
      const [correctOrPrompt, distractorsOrOptions, explanation, isComprehension] = entry as [string, string[], string, boolean?];
      const prompt = isComprehension ? correctOrPrompt : `BLANK${qIdx + 1} — choose the best option:`;
      const options = isComprehension ? distractorsOrOptions : optionSet(correctOrPrompt, distractorsOrOptions);
      return makeQuestion({
        id: `${examId}-p6-${pIdx * 4 + qIdx + 1}`,
        part: 6,
        passage: passageTextV,
        passageGroupId: groupId,
        prompt,
        options,
        answerSeed: seed + pIdx + qIdx,
        explanation,
      });
    });
  });
}

function generatePart7(theme: Theme, examId: string, seed: number, examIndex: number): ToeicLRQuestion[] {
  const topicPool = [
    "training registration", "office relocation", "product recall", "conference agenda", "customer survey",
    "job posting", "restaurant opening", "shipping policy", "library renovation", "software license",
    "wellness program", "supplier contract", "travel advisory", "equipment sale", "newsletter update",
    "parking notice", "market report", "charity event", "membership renewal", "vendor evaluation",
    "internship opportunity", "exhibition schedule", "loyalty program update", "factory tour", "annual audit",
    "promotional campaign", "warranty extension", "service interruption", "budget reallocation", "policy revision",
    "menu change", "scholarship application", "construction notice", "data backup procedure", "uniform redesign",
    "expense policy", "intern welcome", "store grand opening", "customer rewards", "facility inspection",
    "press release", "rental agreement", "shipping schedule update", "training certification", "annual gala",
    "team-building retreat", "patent announcement", "vehicle leasing program", "office gym launch", "energy savings plan",
  ];
  const benefitPool = [
    "free parking", "a ten percent discount", "extended service hours", "a training certificate",
    "priority seating", "complimentary lunch", "an early access pass", "a one-month subscription",
    "a gift voucher", "a guided facility tour", "a free consultation", "a welcome kit",
    "a complimentary upgrade", "a printed handbook", "a souvenir mug", "a parking pass for the week",
    "express checkout privileges", "a dedicated support contact", "a digital badge", "a year of newsletter access",
  ];
  const placePool = [
    theme.place, "main auditorium", "customer service desk", "online portal", "north warehouse",
    "city convention hall", "second-floor reception", "rear entrance kiosk", "regional sales office",
    "executive lounge", "downtown branch", "airport service counter", "mobile help center", "training room B",
    "outdoor pavilion", "innovation lab", "satellite office", "community center", "rooftop terrace",
    "ground-floor showroom",
  ];
  const contactPool = [
    `hr@${theme.company.toLowerCase().replace(/[^a-z]/g, "")}.com`,
    `support@${theme.company.toLowerCase().replace(/[^a-z]/g, "")}.com`,
    "support@example.com", "events@example.com", "careers@example.com", "info@example.com",
    "service@example.com", "frontdesk@example.com", "training@example.com", "media@example.com",
    "operations@example.com", "membership@example.com", "billing@example.com", "logistics@example.com",
  ];

  const topics = pickPool(topicPool, 18, examIndex);
  const benefits = pickPool(benefitPool, 18, examIndex + 1);
  const places = pickPool(placePool, 18, examIndex + 2);
  const contacts = pickPool(contactPool, 18, examIndex + 3);

  const docs = topics.map((topic, i) => {
    const day = 3 + ((examIndex * 5 + i * 2) % 22);
    const deadline = `July ${day + 7}`;
    const benefit = benefits[i];
    const contact = contacts[i];
    const place = places[i];
    const passage = `${i < 8 ? "EMAIL" : i < 13 ? "NOTICE" : "ARTICLE"}\nSubject: ${topic.replace(/\b\w/g, (m) => m.toUpperCase())}\n\n${theme.company} is announcing an update about ${topic}. The change will take effect on July ${day}. Employees and customers should check the ${place} for detailed instructions. Anyone who responds by ${deadline} will receive ${benefit}. For questions, contact ${contact}.\n\nAdditional details: The update is part of a plan to improve service quality, reduce delays, and make information easier to find.`;
    return { passage: varyText(passage, examIndex), topic, deadline, benefit, contact, place };
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
    ...generatePart1(theme, base.id, seed, index),
    ...generatePart2(theme, base.id, seed, index),
    ...generatePart3(theme, base.id, seed, index),
    ...generatePart4(theme, base.id, seed, index),
    ...generatePart5(theme, base.id, seed, index),
    ...generatePart6(theme, base.id, seed, index),
    ...generatePart7(theme, base.id, seed, index),
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
