/**
 * Generates 17 new Section 4 listening sets (academic lectures, sentence completion, 10 questions).
 * Item format: [lead text, answer, tail text]  ->  transcript "lead answer tail."
 * The exam question is the same sentence with the answer replaced by a blank.
 * @copyright 2026 HaiEduTech
 */
import fs from "fs";
import { q, transcriptLiteral, fileHeader } from "./listening-gen-lib.mjs";

const topics = [
  {
    id: "lecture-memory-sleep", title: "Lecture: Sleep and the Consolidation of Memory",
    titleVi: "Bài giảng: Giấc ngủ và củng cố ký ức",
    field: "psychology",
    intro: "Today we're looking at the relationship between sleep and memory - an area where the research has changed a great deal in the last twenty years.",
    outro: "Next week we'll turn to the effects of shift work, so please read the two papers on the reading list.",
    items: [
      ["The process by which fragile new memories become stable is known as", "consolidation", ""],
      ["Most consolidation of factual memory takes place during", "deep sleep", ""],
      ["Skills such as playing an instrument depend more on", "REM sleep", ""],
      ["In one classic study participants learned lists of", "word pairs", ""],
      ["Recall improved by roughly", "20", "per cent after a night of sleep."],
      ["The brain structure that replays new information at night is the", "hippocampus", ""],
      ["Losing sleep is particularly damaging for students in the", "week", "before an examination."],
      ["A short daytime nap of twenty minutes mainly improves", "attention", ""],
      ["Researchers now warn against the popular idea of", "sleep debt", "being fully repayable."],
      ["The most practical advice for learners is to keep a regular", "bedtime", ""],
    ],
  },
  {
    id: "lecture-urban-heat", title: "Lecture: Urban Heat Islands",
    titleVi: "Bài giảng: Hiện tượng đảo nhiệt đô thị",
    field: "environmental science",
    intro: "This morning I want to explain why cities are consistently warmer than the countryside around them, and what can be done about it.",
    outro: "So the message is that urban design decisions taken today will shape city temperatures for decades.",
    items: [
      ["The temperature difference between a city and its surroundings is called the urban heat", "island", "effect."],
      ["In large cities the difference can reach", "7", "degrees at night."],
      ["Dark surfaces such as asphalt have a very low", "albedo", ""],
      ["Buildings release stored heat slowly during the", "night", ""],
      ["The lack of vegetation reduces cooling by", "evaporation", ""],
      ["Air conditioning worsens the problem because it moves heat", "outdoors", ""],
      ["Street trees can lower local temperatures by up to", "4", "degrees."],
      ["Painting roofs white is described as a", "cool roof", "strategy."],
      ["Green corridors also improve urban", "biodiversity", ""],
      ["The people most at risk during heatwaves are the", "elderly", ""],
    ],
  },
  {
    id: "lecture-bird-migration", title: "Lecture: How Birds Navigate on Migration",
    titleVi: "Bài giảng: Chim di cư định hướng thế nào",
    field: "zoology",
    intro: "Bird migration raises one of the great questions in biology: how does a small bird find a wood in Africa it has never seen?",
    outro: "We'll look at the tracking technology itself in the practical session on Thursday.",
    items: [
      ["The longest annual migration is made by the Arctic", "tern", ""],
      ["Young birds on their first journey rely mainly on", "instinct", ""],
      ["Many species navigate at night using the pattern of the", "stars", ""],
      ["Birds also detect the earth's magnetic", "field", ""],
      ["The magnetic sense appears to involve proteins in the", "eye", ""],
      ["Experienced birds correct their course using familiar", "landmarks", ""],
      ["Before departure birds double their body", "weight", ""],
      ["Tracking is now possible with devices weighing under", "1", "gram."],
      ["Light pollution is a growing problem because it causes", "disorientation", ""],
      ["Conservation therefore has to protect the migration", "stopover", "sites."],
    ],
  },
  {
    id: "lecture-food-security", title: "Lecture: Food Security in a Warming World",
    titleVi: "Bài giảng: An ninh lương thực",
    field: "agricultural economics",
    intro: "Food security means more than producing enough calories. Today I'll set out the four pillars economists use and then look at the pressures on each.",
    outro: "The reading for next week compares two very different national strategies.",
    items: [
      ["The four pillars are availability, access, utilisation and", "stability", ""],
      ["Roughly one third of all food produced is", "wasted", ""],
      ["Most post-harvest loss in low-income countries happens during", "storage", ""],
      ["Wheat yields fall sharply when night-time temperatures rise above", "24", "degrees."],
      ["Irrigation already uses about", "70", "per cent of fresh water withdrawals."],
      ["Diversifying crops reduces a farm's exposure to", "risk", ""],
      ["Improved seed varieties are often adopted slowly because of their", "cost", ""],
      ["Urban agriculture is most valuable for supplying fresh", "vegetables", ""],
      ["Price shocks affect the poorest households because they spend most of their", "income", "on food."],
      ["The most effective short-term policy response is usually a targeted", "subsidy", ""],
    ],
  },
  {
    id: "lecture-hydro-power", title: "Lecture: Hydro Power - Benefits and Costs",
    titleVi: "Bài giảng: Thuỷ điện - lợi ích và chi phí",
    field: "engineering",
    intro: "Hydro power still supplies more renewable electricity than any other source, so it deserves careful analysis.",
    outro: "In the seminar we'll compare two dam projects, one widely praised and one heavily criticised.",
    items: [
      ["Hydro power currently provides about", "16", "per cent of world electricity."],
      ["A dam converts the potential energy of stored water into", "electricity", ""],
      ["The efficiency of a modern turbine can exceed", "90", "per cent."],
      ["Pumped storage schemes are valuable because they can store", "surplus", "power."],
      ["Reservoirs can emit methane produced by rotting", "vegetation", ""],
      ["Dams block the movement of migrating", "fish", ""],
      ["One common solution is the construction of a fish", "ladder", ""],
      ["Sediment trapped behind a dam reduces the fertility of the", "delta", ""],
      ["Small run-of-river schemes are attractive because they need no large", "reservoir", ""],
      ["The main economic drawback of hydro power is the high initial", "investment", ""],
    ],
  },
  {
    id: "lecture-language-endangerment", title: "Lecture: Why Languages Disappear",
    titleVi: "Bài giảng: Vì sao các ngôn ngữ biến mất",
    field: "linguistics",
    intro: "Of the seven thousand languages spoken today, linguists expect a large proportion to fall silent this century. Let's examine why, and what can be done.",
    outro: "Next time we'll look in detail at one successful revitalisation programme.",
    items: [
      ["Linguists estimate that a language dies roughly every", "two", "weeks."],
      ["A language is classified as endangered when it is no longer learned by", "children", ""],
      ["The strongest single predictor of language shift is", "migration", "to cities."],
      ["Speakers often abandon a language because of its low", "prestige", ""],
      ["Education policy matters because schooling is usually delivered in the", "majority", "language."],
      ["Documentation projects aim to produce a dictionary, a grammar and a collection of", "recordings", ""],
      ["Revitalisation succeeds most often when it begins in the", "home", ""],
      ["Immersion schools for young learners are known as language", "nests", ""],
      ["Digital tools help because they raise the language's", "visibility", ""],
      ["The loss of a language also means the loss of detailed local", "knowledge", ""],
    ],
  },
  {
    id: "lecture-glass-recycling", title: "Lecture: The Economics of Glass Recycling",
    titleVi: "Bài giảng: Kinh tế học tái chế thuỷ tinh",
    field: "materials science",
    intro: "Glass is often described as the perfect recyclable material. That is true chemically, but the economics are more complicated.",
    outro: "The seminar question asks whether deposit-return schemes are worth their cost.",
    items: [
      ["Glass can in principle be recycled without any loss of", "quality", ""],
      ["Recycled glass fed into a furnace is called", "cullet", ""],
      ["Using cullet reduces the energy needed by up to", "30", "per cent."],
      ["The furnace temperature required for new glass is around", "1500", "degrees."],
      ["The biggest practical problem is contamination by", "ceramics", ""],
      ["Mixed-colour collection lowers the material's", "value", ""],
      ["Green glass is hard to use in Britain because most of it arrives in imported", "bottles", ""],
      ["Crushed glass that cannot be remelted is often used in", "construction", ""],
      ["Deposit-return schemes typically raise collection rates above", "85", "per cent."],
      ["Reuse rather than recycling saves most energy for containers used in the", "drinks", "industry."],
    ],
  },
  {
    id: "lecture-antibiotic-resistance", title: "Lecture: Antibiotic Resistance",
    titleVi: "Bài giảng: Kháng kháng sinh",
    field: "microbiology",
    intro: "Antibiotic resistance is sometimes called a slow pandemic. Today I'll explain the biology and then the policy response.",
    outro: "Please read the World Health Organization summary before the tutorial.",
    items: [
      ["Resistance arises through the process of natural", "selection", ""],
      ["Bacteria can share resistance genes directly through", "plasmids", ""],
      ["Penicillin came into general medical use in the", "1940s", ""],
      ["Resistance to it was reported within about", "four", "years."],
      ["A major driver of resistance is the use of antibiotics in", "agriculture", ""],
      ["Patients contribute to the problem when they fail to complete a", "course", ""],
      ["Hospitals reduce transmission most effectively through hand", "hygiene", ""],
      ["Developing a new antibiotic now costs over one", "billion", "dollars."],
      ["Companies invest little because the return on new antibiotics is low, so governments offer", "incentives", ""],
      ["One promising alternative treatment uses viruses called", "phages", ""],
    ],
  },
  {
    id: "lecture-soil-carbon", title: "Lecture: Soil as a Carbon Store",
    titleVi: "Bài giảng: Đất và lưu trữ carbon",
    field: "soil science",
    intro: "Soil holds more carbon than the atmosphere and all vegetation combined, which makes soil management a climate issue.",
    outro: "We'll analyse two field trials in the practical class.",
    items: [
      ["Soils store roughly three times as much carbon as the", "atmosphere", ""],
      ["Carbon enters the soil mainly through plant", "roots", ""],
      ["The organic material formed by decomposition is called", "humus", ""],
      ["Ploughing releases carbon because it exposes soil to", "oxygen", ""],
      ["Peatlands are especially important because they are", "waterlogged", ""],
      ["Draining peat for farming can release carbon for", "decades", ""],
      ["Cover crops help because they keep the soil covered in", "winter", ""],
      ["Rotational grazing improves soil carbon by allowing grass to", "recover", ""],
      ["Measuring soil carbon accurately requires samples from several", "depths", ""],
      ["The main obstacle to paying farmers for soil carbon is the difficulty of", "verification", ""],
    ],
  },
  {
    id: "lecture-animal-navigation", title: "Lecture: Navigation in the Animal Kingdom",
    titleVi: "Bài giảng: Khả năng định hướng của động vật",
    field: "behavioural biology",
    intro: "We saw last week how birds navigate. Today we widen the picture to insects, fish and mammals.",
    outro: "The comparison essay title is on the module page.",
    items: [
      ["Desert ants find their nest using a method called path", "integration", ""],
      ["Honeybees communicate the direction of food through a", "dance", ""],
      ["Bees measure distance by monitoring the flow of", "images", "past the eye."],
      ["Salmon locate their home river by", "smell", ""],
      ["Sea turtles appear to use magnetic information as a kind of", "map", ""],
      ["Bats build a picture of their surroundings using", "echolocation", ""],
      ["Dung beetles have been shown to steer by the", "Milky Way", ""],
      ["Experiments often test navigation by", "displacing", "the animals."],
      ["Human interference is a problem because artificial light overrides natural", "cues", ""],
      ["The general conclusion is that most species combine several", "systems", ""],
    ],
  },
  {
    id: "lecture-trade-routes", title: "Lecture: Ancient Trade Routes and Their Legacy",
    titleVi: "Bài giảng: Con đường thương mại cổ đại",
    field: "history",
    intro: "Trade routes moved far more than goods. They moved technologies, diseases and ideas, and their traces are still visible today.",
    outro: "For the seminar, choose one commodity and trace its journey.",
    items: [
      ["The network linking China and the Mediterranean is usually called the Silk", "Road", ""],
      ["It was not a single road but a shifting network of", "routes", ""],
      ["The most valuable low-bulk cargo in the Indian Ocean trade was", "spices", ""],
      ["Sea trade depended on the seasonal pattern of the", "monsoon", ""],
      ["Camel caravans could cross deserts because camels tolerate", "dehydration", ""],
      ["Along the Sahara routes the main southbound commodity was", "salt", ""],
      ["Trading cities grew wealthy by charging", "taxes", "on goods passing through."],
      ["The routes also spread disease, most notoriously the", "plague", ""],
      ["Paper-making technology travelled westwards from", "China", ""],
      ["Historians study these exchanges using both documents and", "archaeology", ""],
    ],
  },
  {
    id: "lecture-noise-pollution", title: "Lecture: Noise Pollution and Public Health",
    titleVi: "Bài giảng: Ô nhiễm tiếng ồn và sức khoẻ",
    field: "public health",
    intro: "Noise is the environmental pollutant people complain about most, and the evidence on its health effects is now strong.",
    outro: "Next week: how planning law deals with noise.",
    items: [
      ["Noise is measured on a scale of", "decibels", ""],
      ["Health effects become measurable above about", "55", "decibels."],
      ["The clearest documented consequence is disturbed", "sleep", ""],
      ["Long-term exposure is associated with a higher risk of heart", "disease", ""],
      ["In schools aircraft noise has been shown to delay children's", "reading", ""],
      ["The main source of urban noise is road", "traffic", ""],
      ["Quiet road surfaces can reduce noise by about", "3", "decibels."],
      ["Barriers work best when they are placed close to the", "source", ""],
      ["Cities increasingly protect designated", "quiet", "areas."],
      ["The cheapest intervention of all is reducing vehicle", "speed", ""],
    ],
  },
  {
    id: "lecture-agri-robotics", title: "Lecture: Robots in Agriculture",
    titleVi: "Bài giảng: Robot trong nông nghiệp",
    field: "agricultural engineering",
    intro: "Farming is being reshaped by automation, but not in the way early predictions suggested. Let's look at what actually works in the field.",
    outro: "The case study for the seminar is a strawberry farm in Kent.",
    items: [
      ["Agricultural labour shortages are most acute at", "harvest", "time."],
      ["Machines find soft fruit difficult because it is easily", "bruised", ""],
      ["Robotic pickers identify ripe fruit using computer", "vision", ""],
      ["Weeding robots reduce the need for", "herbicide", ""],
      ["Small light robots are attractive because they cause less soil", "compaction", ""],
      ["Automated milking systems allow cows to be milked on", "demand", ""],
      ["Drones are used mainly for crop", "monitoring", ""],
      ["The main barrier to adoption on small farms is the", "price", ""],
      ["Reliable operation is difficult because field conditions are", "unpredictable", ""],
      ["Most experts expect automation to change the", "skills", "farm workers need."],
    ],
  },
  {
    id: "lecture-tidal-energy", title: "Lecture: Tidal Energy",
    titleVi: "Bài giảng: Năng lượng thuỷ triều",
    field: "renewable energy",
    intro: "Unlike wind and sun, tides are entirely predictable, and that predictability is the great attraction of tidal power.",
    outro: "Read the environmental impact assessment before Thursday.",
    items: [
      ["The great advantage of tidal power is that it is completely", "predictable", ""],
      ["Tides are caused mainly by the gravitational pull of the", "moon", ""],
      ["A tidal range of at least", "5", "metres is normally needed."],
      ["A structure built across an estuary is called a", "barrage", ""],
      ["Underwater turbines placed in fast currents are known as tidal", "stream", "devices."],
      ["Salt water makes maintenance difficult because it accelerates", "corrosion", ""],
      ["Barrages are controversial because they change estuary", "habitats", ""],
      ["Tidal stream devices are preferred partly because they are largely", "invisible", ""],
      ["Output can be smoothed by combining sites with different tidal", "timings", ""],
      ["The main reason tidal power grows slowly is its high", "cost", ""],
    ],
  },
  {
    id: "lecture-volcanic-ash-aviation", title: "Lecture: Volcanic Ash and Air Travel",
    titleVi: "Bài giảng: Tro núi lửa và hàng không",
    field: "geophysics",
    intro: "The 2010 Icelandic eruption grounded European aviation for days. Today we examine why ash is so dangerous and how forecasting has improved.",
    outro: "There is a short film on the module page about the ash advisory centres.",
    items: [
      ["Volcanic ash consists of fragments of", "glass", "and rock."],
      ["Ash is dangerous to aircraft because it melts inside the", "engine", ""],
      ["It also sandblasts the cockpit", "windows", ""],
      ["The 2010 eruption closed much of European airspace for", "six", "days."],
      ["Ash clouds are tracked by nine international advisory", "centres", ""],
      ["Forecasting combines satellite images with atmospheric", "models", ""],
      ["The height of the ash column is measured using", "radar", ""],
      ["Airlines now plan around zones defined by ash", "concentration", ""],
      ["An eruption under a glacier produces more ash because of contact with", "water", ""],
      ["The main uncertainty in any forecast is the", "wind", "at altitude."],
    ],
  },
  {
    id: "lecture-biodiversity-corridors", title: "Lecture: Wildlife Corridors and Connected Landscapes",
    titleVi: "Bài giảng: Hành lang sinh học",
    field: "conservation biology",
    intro: "Protected areas alone are not enough. Today's topic is connectivity: how we join habitats back together.",
    outro: "Bring your notes on the fragmentation reading to the tutorial.",
    items: [
      ["The process by which habitat is broken into pieces is called", "fragmentation", ""],
      ["Small isolated populations suffer from a loss of genetic", "diversity", ""],
      ["A strip of habitat linking two areas is called a", "corridor", ""],
      ["Structures allowing animals to cross roads safely are known as wildlife", "bridges", ""],
      ["Corridors are most effective when they are", "wide", ""],
      ["Hedgerows act as corridors for small mammals and", "insects", ""],
      ["River banks are valuable corridors because they are naturally", "continuous", ""],
      ["One risk of corridors is that they can also spread", "disease", ""],
      ["Planners identify priority routes using habitat", "modelling", ""],
      ["Long-term success depends on the cooperation of private", "landowners", ""],
    ],
  },
  {
    id: "lecture-museum-conservation", title: "Lecture: The Science of Museum Conservation",
    titleVi: "Bài giảng: Khoa học bảo quản bảo tàng",
    field: "conservation science",
    intro: "Conservation is applied chemistry and physics with an ethical dimension. Let's look at how museums slow down decay.",
    outro: "The visit to the conservation studio is on Friday afternoon.",
    items: [
      ["The guiding ethical principle is that treatment should be", "reversible", ""],
      ["Relative humidity in most galleries is kept close to", "50", "per cent."],
      ["Sudden changes in humidity are harmful because materials", "expand", "and contract."],
      ["Light damage is cumulative and cannot be", "reversed", ""],
      ["Watercolours are displayed at very low light levels measured in", "lux", ""],
      ["Ultraviolet light is removed using special", "filters", ""],
      ["Metal objects are protected from corrosion by controlling", "moisture", ""],
      ["Insect infestations are now often treated by", "freezing", ""],
      ["Before treatment, objects are analysed using", "X-rays", ""],
      ["Every intervention must be recorded in the object's", "documentation", ""],
    ],
  },
];

const connectors = [
  "Let's start with a definition.", "Now, some detail.", "This is the key point.",
  "Consider the evidence.", "There is a further factor here.", "Let me turn to the practical side.",
  "A related point:", "Here the research is clear.", "Now for the implications.", "And finally,",
];

function buildSet(t, ti) {
  const speaker = "Lecturer";
  const lines = [`${speaker}: ${t.intro}`];
  const questions = [];
  t.items.forEach(([lead, answer, tail], i) => {
    const sentence = `${lead} ${answer}${tail ? ` ${tail}` : "."}`;
    const marker = connectors[i % connectors.length];
    const body = marker.endsWith(",")
      ? sentence.charAt(0).toLowerCase() + sentence.slice(1)
      : sentence;
    lines.push(`${marker} ${body}`);
    questions.push({
      prompt: `${lead} ___${tail ? ` ${tail}` : "."}`,
      answer,
      maxWords: String(answer).trim().split(/\s+/).length,
    });
  });
  lines.push(`${speaker}: ${t.outro}`);

  return `  {
    id: ${q(t.id)},
    section: 4,
    questionType: "Sentence Completion",
    questionTypeVi: "Hoàn thành câu",
    title: ${q(t.title)},
    titleVi: ${q(t.titleVi)},
    context: ${q(`You will hear part of a ${t.field} lecture. Complete each sentence with NO MORE THAN TWO WORDS OR A NUMBER from the recording.`)},
    contextVi: ${q(`Bạn sẽ nghe một phần bài giảng ${t.titleVi.replace("Bài giảng: ", "")}. Hoàn thành mỗi câu với KHÔNG QUÁ HAI TỪ HOẶC MỘT SỐ.`)},
    transcript:
${transcriptLiteral(lines)},
    rate: 0.82,
    questions: [
${questions.map(qq => `      { type: "fill-in", prompt: ${q(qq.prompt)}, answer: ${q(qq.answer)}, maxWords: ${qq.maxWords} },`).join("\n")}
    ],
  },`;
}

const body = topics.map(buildSet).join("\n\n");
const out = `${fileHeader(
  "ieltsListeningPracticeExpansion11.ts",
  "Wave 11 - 17 new Section 4 sets (academic lectures, 10 sentence-completion questions each) so IELTS Listening reaches 30 unique Section 4 recordings."
)}
export const ieltsListeningPracticeSetsExpansion11: ListeningPracticeSet[] = [
${body}
];
`;
fs.writeFileSync("src/data/ieltsListeningPracticeExpansion11.ts", out);
console.log("wrote src/data/ieltsListeningPracticeExpansion11.ts", topics.length, "sets");
