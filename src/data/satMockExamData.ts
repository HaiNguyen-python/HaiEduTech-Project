/**
 * SAT Mock Exam Data – Digital SAT format
 * Real timing:
 *  - Reading & Writing module: 32 minutes / 27 questions
 *  - Math module: 35 minutes / 22 questions
 *  - Full Digital SAT: 2 R&W + 2 Math = 134 minutes / 98 questions
 */

export interface SatMockQuestion {
  id: number;
  passage?: string;
  question: string;
  questionVi?: string;
  options: string[];
  correctAnswer: number; // index
  explanation: string;
  explanationVi?: string;
  section: "Reading & Writing" | "Math";
}

export interface SatMockExam {
  id: string;
  title: string;
  titleVi: string;
  type: "rw" | "math" | "full";
  duration: number; // minutes
  totalQuestions: number;
  description: string;
  descriptionVi: string;
  questions: SatMockQuestion[];
}

export const SAT_TYPE_LABELS: Record<SatMockExam["type"], { label: string; color: string; emoji: string }> = {
  rw: { label: "Reading & Writing", color: "#10B981", emoji: "📖" },
  math: { label: "Math", color: "#3B82F6", emoji: "🧮" },
  full: { label: "Full SAT", color: "#A855F7", emoji: "🎯" },
};

// ─────────────────────────────────────────────────────────────
// Reading & Writing Practice 1 — 27 questions / 32 min
// ─────────────────────────────────────────────────────────────
const rw1Questions: SatMockQuestion[] = [
  // Words in Context (1-6)
  { id: 1, section: "Reading & Writing", question: "While the new policy was widely seen as ___, critics argued it failed to address the underlying inequities in the system.\n\nWhich choice completes the text with the most logical and precise word?", options: ["progressive", "perfunctory", "ambiguous", "redundant"], correctAnswer: 0, explanation: "'Progressive' contrasts with the critics' charge that the policy failed to address inequities — it was seen as forward-thinking but, to critics, insufficient." },
  { id: 2, section: "Reading & Writing", question: "The candidate's speech was praised for its ___ tone: she neither overstated her achievements nor downplayed the challenges ahead.", options: ["measured", "exuberant", "indignant", "evasive"], correctAnswer: 0, explanation: "'Measured' fits a balanced tone that neither overstates nor downplays." },
  { id: 3, section: "Reading & Writing", question: "Although the experiment yielded ___ results, the team chose to publish them so that other researchers could attempt to replicate the findings.", options: ["definitive", "inconclusive", "spectacular", "fraudulent"], correctAnswer: 1, explanation: "If results need replication, they were not definitive — 'inconclusive' fits." },
  { id: 4, section: "Reading & Writing", question: "Marcus Garvey's 1920 Declaration of the Rights of the Negro Peoples of the World ___ a global vision of Pan-African solidarity that would influence later movements.", options: ["articulated", "obscured", "questioned", "dismissed"], correctAnswer: 0, explanation: "The Declaration is well known to have set out (articulated) such a vision." },
  { id: 5, section: "Reading & Writing", question: "Researchers found the data ___: it appeared to support two contradictory hypotheses equally well.", options: ["conclusive", "ambiguous", "trivial", "redundant"], correctAnswer: 1, explanation: "Supporting two contradictory hypotheses = ambiguous." },
  { id: 6, section: "Reading & Writing", question: "The composer's late symphonies are notable for their ___, weaving folk melodies into rigorously formal classical structures.", options: ["austerity", "synthesis", "monotony", "improvisation"], correctAnswer: 1, explanation: "Weaving two elements together is synthesis." },

  // Central Ideas / Details (7-10)
  { id: 7, section: "Reading & Writing", passage: "Recent archaeological evidence suggests that the city of Caral, in present-day Peru, was inhabited as early as 2600 BCE — making it roughly contemporary with the early Egyptian pyramids. Unlike many ancient urban centers, Caral shows no evidence of warfare: there are no fortifications, weapons, or mutilated remains.", question: "Which choice best states the main idea of the text?", options: ["Caral was the largest city in the Americas before 2000 BCE.", "Caral is significant because it is both ancient and apparently peaceful.", "Egyptian and Peruvian civilizations developed at the same rate.", "Archaeologists have only recently begun to study South America."], correctAnswer: 1, explanation: "The text emphasizes both Caral's antiquity and the absence of warfare." },
  { id: 8, section: "Reading & Writing", passage: "In 2018, biologist Lan Zhao and colleagues observed that mangrove crabs (Aratus pisonii) climb higher in their host trees as ambient temperatures rise. Subsequent measurements showed that body temperature in climbing crabs was up to 4 °C lower than in crabs at the base of the same tree.", question: "According to the text, why do mangrove crabs climb higher when it gets hot?", options: ["To find more food.", "To avoid predators.", "To lower their body temperature.", "To find a mate."], correctAnswer: 2, explanation: "Climbing crabs had body temperatures up to 4 °C lower." },
  { id: 9, section: "Reading & Writing", passage: "In her 1928 essay collection, Zora Neale Hurston defends the value of African American oral traditions, arguing that storytelling, sermons, and folk tales constitute a sophisticated literary heritage worthy of academic study — a view that was largely dismissed by her contemporaries.", question: "Which choice best describes Hurston's position as presented in the text?", options: ["Oral traditions should replace written literature.", "Oral traditions deserve serious literary recognition.", "African American writers should focus only on folk tales.", "Academic literature is superior to popular storytelling."], correctAnswer: 1, explanation: "Hurston argued these traditions were worthy of academic study." },
  { id: 10, section: "Reading & Writing", passage: "The Voyager 1 spacecraft, launched in 1977, crossed the heliopause — the boundary where the Sun's solar wind gives way to interstellar plasma — in August 2012. Yet engineers on Earth did not confirm this milestone until 2013, after analyzing changes in plasma density recorded by the craft.", question: "Which choice best states the main idea?", options: ["Voyager 1 took 35 years to reach interstellar space.", "Confirmation of Voyager 1's crossing required careful data analysis after the fact.", "The heliopause is the most distant feature of the solar system.", "NASA had not expected Voyager 1 to last so long."], correctAnswer: 1, explanation: "The text emphasizes the gap between the event (2012) and confirmation (2013) via data analysis." },

  // Command of Evidence (11-13)
  { id: 11, section: "Reading & Writing", passage: "A student claims that wearing blue-light-blocking glasses improves sleep quality.\n\nResearchers measured sleep efficiency in 60 adults across two weeks: one week wearing blue-light glasses each evening, and one week wearing identical placebo glasses.", question: "Which result, if true, would most directly support the student's claim?", options: ["Participants reported feeling more relaxed in the evening regardless of which glasses they wore.", "Sleep efficiency was significantly higher during the week participants wore blue-light glasses.", "Participants spent the same number of hours in bed during both weeks.", "More than half of participants found the glasses uncomfortable."], correctAnswer: 1, explanation: "Direct evidence supporting the claim is improved sleep efficiency in the blue-light week." },
  { id: 12, section: "Reading & Writing", passage: "A graph titled 'Number of bicycles registered in Amsterdam, 1990–2020' shows a steady rise from 480,000 in 1990 to 880,000 in 2020.\n\nA student concludes: ___", question: "Which choice most accurately completes the conclusion using data from the graph?", options: ["Bicycles became less popular in Amsterdam during this period.", "The number of registered bicycles in Amsterdam nearly doubled between 1990 and 2020.", "Most Amsterdam residents owned a bicycle by 2020.", "Cars were banned in Amsterdam during this period."], correctAnswer: 1, explanation: "880k vs 480k — nearly doubled — is the only claim directly supported by the figures." },
  { id: 13, section: "Reading & Writing", passage: "Hypothesis: Children who read aloud at home for at least 20 minutes daily perform better on standardized vocabulary tests than peers who do not.", question: "Which finding would most strongly support the hypothesis?", options: ["Children who read aloud reported enjoying reading more than peers.", "Children who read aloud at home for 20+ minutes scored, on average, 18% higher on standardized vocabulary tests than peers who did not.", "Vocabulary tests are widely used in schools.", "Children read silently more often than aloud."], correctAnswer: 1, explanation: "B is the only choice with a direct, quantitative comparison supporting the hypothesis." },

  // Inferences (14-16)
  { id: 14, section: "Reading & Writing", passage: "In recent decades, the population of sea otters along the Pacific coast has rebounded. Where otters return, kelp forests also flourish — because otters prey on sea urchins, which would otherwise overgraze the kelp.\n\nIt can therefore be inferred that, in regions where sea otter populations remain low, ___", question: "Which choice most logically completes the text?", options: ["sea urchin populations are likely high and kelp forests degraded.", "sea otters are migrating to colder waters.", "kelp forests have replaced coral reefs.", "fishermen catch fewer urchins than they once did."], correctAnswer: 0, explanation: "Without otters to control urchins, urchins thrive and kelp suffers." },
  { id: 15, section: "Reading & Writing", passage: "Although the painter Hilma af Klint produced abstract works as early as 1906 — predating Kandinsky and Mondrian — she instructed that her paintings remain unseen for 20 years after her death. As a result, ___", question: "Which choice most logically completes the text?", options: ["af Klint became famous during her lifetime.", "her contributions to abstract art were not widely recognized until decades after she made them.", "Kandinsky and Mondrian copied her style.", "her paintings were destroyed by her family."], correctAnswer: 1, explanation: "Hidden for 20+ years → recognition came decades later." },
  { id: 16, section: "Reading & Writing", passage: "Researchers studying urban birds found that great tits (Parus major) sing at higher pitches in noisy city environments than in quiet rural ones. The shift appears to be a learned behavior, transmitted from one generation to the next. From this we can infer that ___", question: "Which choice most logically completes the text?", options: ["urban great tits are losing the ability to sing altogether.", "the song shift may persist even if a city becomes quieter, at least for some generations.", "great tits are migrating to rural areas.", "rural and urban great tits cannot recognize each other's songs."], correctAnswer: 1, explanation: "Learned and transmitted behaviors persist past the original stimulus." },

  // Punctuation, grammar, transitions, synthesis (17-27)
  { id: 17, section: "Reading & Writing", question: "While studying neutron stars, astronomer Jocelyn Bell ___ a regular radio signal that turned out to be the first known pulsar.", options: ["detect", "detected", "detecting", "to detect"], correctAnswer: 1, explanation: "Past tense main verb agreeing with the past 'studying' context." },
  { id: 18, section: "Reading & Writing", question: "The exhibit features works by three contemporary muralists ___ Judith Baca, Tatyana Fazlalizadeh, and Eduardo Kobra.", options: [": ", ", ", "; ", " — "], correctAnswer: 0, explanation: "A colon introduces a list following an independent clause." },
  { id: 19, section: "Reading & Writing", question: "The new tram line, which opened in March, ___ reduced average commute times by nearly twelve minutes.", options: ["have", "having", "has", "is"], correctAnswer: 2, explanation: "Singular subject 'tram line' takes 'has reduced' (present perfect)." },
  { id: 20, section: "Reading & Writing", question: "Each of the dancers ___ memorized the entire choreography by the dress rehearsal.", options: ["have", "are", "has", "were"], correctAnswer: 2, explanation: "'Each' is singular → 'has memorized'." },
  { id: 21, section: "Reading & Writing", question: "The committee delayed the vote ___ they could review the amendments more carefully.", options: ["because of", "so that", "in spite of", "as well as"], correctAnswer: 1, explanation: "'So that' expresses purpose." },
  { id: 22, section: "Reading & Writing", question: "Lin's research focuses on coral reefs in the Indo-Pacific; ___, her field seasons usually take place between May and August.", options: ["however", "for example", "consequently", "nevertheless"], correctAnswer: 2, explanation: "Field season timing is a consequence of the focus area." },
  { id: 23, section: "Reading & Writing", question: "Although the rover landed in 2021, scientists are only now publishing the first detailed analyses of its samples; ___, the data continue to surprise even seasoned planetary geologists.", options: ["meanwhile", "in addition", "in fact", "by contrast"], correctAnswer: 2, explanation: "'In fact' intensifies and supports the prior idea." },
  { id: 24, section: "Reading & Writing", question: "Notes on the painter Remedios Varo:\n• Born in Spain, 1908\n• Fled fascism, settled in Mexico City in 1941\n• Known for surrealist paintings featuring alchemical and scientific imagery\n• Influence on later magical realist artists\n\nThe student wants to introduce Varo to an audience unfamiliar with her work. Which choice best uses the notes to accomplish this goal?", options: ["Born in Spain in 1908, Remedios Varo settled in Mexico City in 1941.", "Remedios Varo (1908–1963) was a Spanish-born surrealist painter whose alchemical imagery shaped later magical realism.", "Many surrealist painters fled fascism in the 1930s and 1940s.", "Remedios Varo's paintings often feature alchemical imagery."], correctAnswer: 1, explanation: "B introduces who she is, era, style and influence in one sentence." },
  { id: 25, section: "Reading & Writing", question: "Notes:\n• A 2022 study tracked migration of monarch butterflies in eastern North America\n• Researchers tagged 1,200 individuals\n• 68% reached overwintering sites in central Mexico\n• Previous study (2010) had a 41% arrival rate\n\nThe student wants to emphasize the change in arrival rate. Which choice best uses the notes to accomplish this goal?", options: ["A 2022 study tagged 1,200 monarch butterflies.", "Compared with a 41% arrival rate in 2010, 68% of tagged monarchs reached central Mexico in 2022 — a substantial increase.", "Monarch butterflies overwinter in central Mexico.", "Researchers have studied monarch migration for decades."], correctAnswer: 1, explanation: "B is the only choice that compares the two figures (the writer's stated goal)." },
  { id: 26, section: "Reading & Writing", question: "Notes:\n• Maria Sibylla Merian (1647–1717), German naturalist & illustrator\n• Travelled to Suriname in 1699 to study insects\n• Published Metamorphosis Insectorum Surinamensium (1705)\n• Documented insect life cycles that European scientists had ignored\n\nThe student wants to emphasize Merian's scientific contribution. Which choice best uses the notes to accomplish this goal?", options: ["Merian's 1705 book documented insect life cycles that European scientists had previously ignored.", "Merian travelled to Suriname when she was in her fifties.", "Merian was born in Germany in 1647.", "Many naturalists in the 17th century were also illustrators."], correctAnswer: 0, explanation: "A focuses on her scientific contribution." },
  { id: 27, section: "Reading & Writing", question: "The architect's sketches were detailed and elegant; ___ the final building bore little resemblance to them.", options: ["therefore", "however", "in addition", "for instance"], correctAnswer: 1, explanation: "Contrast between elegant sketches and unlike final building → however." },
];

// ─────────────────────────────────────────────────────────────
// Reading & Writing Practice 2 — 27 questions / 32 min
// ─────────────────────────────────────────────────────────────
const rw2Questions: SatMockQuestion[] = [
  { id: 1, section: "Reading & Writing", question: "Despite the company's ___ marketing, sales of the new device fell short of internal projections.", options: ["aggressive", "tepid", "honest", "delayed"], correctAnswer: 0, explanation: "'Despite' implies a contrast: aggressive marketing yet sales fell short." },
  { id: 2, section: "Reading & Writing", question: "The biographer's portrait of the inventor is unusually ___ : she neither glorifies his triumphs nor downplays his ethical lapses.", options: ["evenhanded", "scathing", "reverential", "speculative"], correctAnswer: 0, explanation: "Balanced treatment = evenhanded." },
  { id: 3, section: "Reading & Writing", question: "Although critics initially dismissed the novel as derivative, recent scholarship has begun to ___ its quiet originality.", options: ["overlook", "appreciate", "exaggerate", "fabricate"], correctAnswer: 1, explanation: "'Although... dismissed' → contrast: now appreciated." },
  { id: 4, section: "Reading & Writing", question: "The new policy is intended to ___ disparities in access to public transit, but early data suggest the gap has actually widened.", options: ["create", "mitigate", "celebrate", "ignore"], correctAnswer: 1, explanation: "Policies meant to address disparities aim to mitigate them." },
  { id: 5, section: "Reading & Writing", question: "The paper's findings, while ___, will need to be replicated by independent teams before they can be considered established.", options: ["dubious", "promising", "irrelevant", "fabricated"], correctAnswer: 1, explanation: "Findings worth replicating are promising." },
  { id: 6, section: "Reading & Writing", question: "His prose style is famously ___, packing several layers of meaning into a single short sentence.", options: ["verbose", "compact", "rambling", "ornate"], correctAnswer: 1, explanation: "Several layers in a short sentence = compact." },

  { id: 7, section: "Reading & Writing", passage: "The brain consumes about 20% of the body's energy at rest, despite making up only about 2% of body mass. Much of this energy supports the constant signaling between billions of neurons — even when a person is doing nothing in particular.", question: "Which choice best states the main idea of the text?", options: ["The brain stops working when a person rests.", "The brain is energetically expensive even at rest because of constant neural signaling.", "Most of the body's energy is used by muscles.", "Neurons can fire without using energy."], correctAnswer: 1, explanation: "Main idea: high energy use at rest, due to neural signaling." },
  { id: 8, section: "Reading & Writing", passage: "Although octopuses are invertebrates, recent studies have shown that they can navigate mazes, recognize individual humans, and even use coconut shells as portable shelters — behaviors once thought to require a vertebrate brain.", question: "The author's main purpose in the text is to ___", options: ["describe octopus anatomy in detail.", "challenge the idea that complex behavior requires a vertebrate brain.", "argue that octopuses should be kept as pets.", "explain how mazes are designed for animals."], correctAnswer: 1, explanation: "The text contrasts invertebrate octopuses with traditionally 'vertebrate' behaviors — challenging the assumption." },
  { id: 9, section: "Reading & Writing", passage: "Sociologist Mitchell Duneier argued that public sidewalks, far from being uniform spaces, are 'thickly textured social environments' shaped by the daily routines of street vendors, residents, and passersby.", question: "Which statement best summarizes Duneier's view as presented in the text?", options: ["Sidewalks are uniform spaces with little social meaning.", "Sidewalks are complex social environments shaped by everyday users.", "Sidewalks should be designed by sociologists.", "Street vendors disrupt sidewalk life."], correctAnswer: 1, explanation: "Duneier's quote ('thickly textured social environments') = complex." },
  { id: 10, section: "Reading & Writing", passage: "Although mosses lack true roots, they can colonize bare rock — secreting acids that slowly break the rock down and creating thin layers of soil that, over centuries, allow larger plants to take hold.", question: "Which choice best states the main idea?", options: ["Mosses are simpler than other plants.", "Mosses help convert bare rock into soil that supports later plants.", "Larger plants always grow before mosses.", "Mosses cannot survive on rock."], correctAnswer: 1, explanation: "Main idea: mosses pioneer soil-building." },

  { id: 11, section: "Reading & Writing", passage: "Hypothesis: Workers who take a 5-minute walk every hour are more productive than those who don't.", question: "Which finding most directly supports the hypothesis?", options: ["Workers who walked hourly reported feeling refreshed.", "Workers who walked for 5 minutes every hour completed 14% more tasks per day, on average, than a control group.", "Walking has been shown to reduce stress.", "Most workers prefer not to walk during the workday."], correctAnswer: 1, explanation: "B gives a direct, quantitative productivity comparison." },
  { id: 12, section: "Reading & Writing", passage: "Table: Annual rainfall (mm) in Phoenix, Tucson, and Las Vegas (2020–2023):\n2020 — Phoenix 101, Tucson 162, Las Vegas 78\n2023 — Phoenix 240, Tucson 290, Las Vegas 165", question: "A student wants to support the claim that rainfall in Phoenix and Las Vegas more than doubled between 2020 and 2023. Which observation from the table best supports the claim?", options: ["Phoenix rose from 101 to 240 mm and Las Vegas from 78 to 165 mm — each more than doubling.", "Phoenix is in the same state as Tucson.", "Tucson had more rainfall than Phoenix in both years.", "Las Vegas had less rainfall than Tucson in both years."], correctAnswer: 0, explanation: "Only A cites figures that directly support a more-than-doubled claim (101→240 and 78→165)." },
  { id: 13, section: "Reading & Writing", passage: "Researchers tracked 200 students who used a new study app and 200 who did not. After one semester, the app users showed an average GPA increase of 0.3 points, while the control group showed no change.", question: "Which conclusion is most directly supported by the data?", options: ["The app caused all students to improve.", "Students who used the app showed a greater average GPA increase than those who did not.", "The app is the best study tool available.", "Students who did not use the app got worse grades."], correctAnswer: 1, explanation: "B sticks to what the data show: greater average increase, not causation or rankings." },

  { id: 14, section: "Reading & Writing", passage: "Solar panels are most efficient when kept cool. In hot desert climates, panel temperatures can rise so high that efficiency drops noticeably. From this we can infer that ___", question: "Which choice most logically completes the text?", options: ["solar panels do not work in deserts.", "cooling solar panels in hot climates could improve their efficiency.", "deserts are unsuitable for any kind of energy generation.", "solar panels are always more efficient at night."], correctAnswer: 1, explanation: "Lower temperature → higher efficiency, so cooling helps." },
  { id: 15, section: "Reading & Writing", passage: "After publishing her first novel anonymously, Charlotte Brontë found that critics judged the book on its merits rather than on the author's gender. When her authorship was revealed, however, reviews of subsequent works often dwelt on her being a woman writer. From this we can infer that ___", question: "Which choice most logically completes the text?", options: ["Brontë's later novels were of lower quality.", "the gender of an author can influence how critics evaluate the work.", "anonymous publication is now illegal.", "critics in Brontë's era were exclusively male."], correctAnswer: 1, explanation: "Same writer, different framing once gender was known → gender influenced evaluation." },
  { id: 16, section: "Reading & Writing", passage: "When archaeologists found shipwrecks in the cold, oxygen-poor depths of the Black Sea, they observed that wooden hulls and even ropes were preserved in remarkable detail. They concluded that ___", question: "Which choice most logically completes the text?", options: ["the Black Sea is unusually warm.", "low-oxygen conditions can dramatically slow the decay of organic materials.", "all shipwrecks are well preserved.", "wooden hulls usually rot within months."], correctAnswer: 1, explanation: "Oxygen-poor + remarkable preservation → low-oxygen slows decay." },

  { id: 17, section: "Reading & Writing", question: "Maya Lin, who designed the Vietnam Veterans Memorial as an undergraduate, ___ on to become one of the most influential architects of her generation.", options: ["go", "going", "gone", "went"], correctAnswer: 3, explanation: "Past tense parallel to 'designed': went on." },
  { id: 18, section: "Reading & Writing", question: "The cellist performed three encores ___ a Bach prelude, a Catalan folk song, and a piece written by a friend.", options: [": ", ", ", "; ", " and "], correctAnswer: 0, explanation: "Colon introduces the list after a complete clause." },
  { id: 19, section: "Reading & Writing", question: "The team of researchers ___ planning to publish their findings in a peer-reviewed journal next spring.", options: ["are", "is", "be", "have"], correctAnswer: 1, explanation: "Collective noun 'team' takes singular 'is'." },
  { id: 20, section: "Reading & Writing", question: "Neither the conductor nor the soloists ___ available for an interview after the concert.", options: ["was", "is", "were", "has"], correctAnswer: 2, explanation: "With 'neither/nor', verb agrees with the nearer noun (soloists, plural) → were." },
  { id: 21, section: "Reading & Writing", question: "The bridge was closed for repairs ___ engineers detected a hairline crack in one of its support beams.", options: ["unless", "after", "in case", "as if"], correctAnswer: 1, explanation: "Sequence: closed after detection." },
  { id: 22, section: "Reading & Writing", question: "Wind energy now supplies a substantial share of the country's electricity; ___, fossil fuels still dominate the overall mix.", options: ["nevertheless", "therefore", "for instance", "in addition"], correctAnswer: 0, explanation: "Contrast: substantial share, but fossil fuels dominate → nevertheless." },
  { id: 23, section: "Reading & Writing", question: "Many of the museum's most valuable pieces were donated by a single benefactor; ___, the south wing is named after her.", options: ["however", "in fact", "by contrast", "even so"], correctAnswer: 1, explanation: "'In fact' intensifies and adds emphasis." },

  { id: 24, section: "Reading & Writing", question: "Notes on the artist Faith Ringgold:\n• American painter and sculptor (b. 1930)\n• Best known for narrative quilts blending text and image\n• Quilts often address themes of race, gender, and family\n• Wrote and illustrated children's books, including Tar Beach (1991)\n\nThe student wants to emphasize the range of media in which Ringgold has worked. Which choice best uses the notes to accomplish this goal?", options: ["Faith Ringgold (b. 1930) has worked across media — from narrative quilts to sculpture to children's books such as Tar Beach (1991).", "Faith Ringgold was born in 1930.", "Many artists work in more than one medium.", "Tar Beach is a popular children's book."], correctAnswer: 0, explanation: "Only A names multiple media to emphasize range." },
  { id: 25, section: "Reading & Writing", question: "Notes:\n• Solar storms can disrupt satellite communications\n• A 2003 'Halloween storm' damaged 28 satellites\n• Forecasting solar storms is difficult because they originate in the Sun's complex magnetic field\n• Better forecasts could help operators safeguard equipment\n\nThe student wants to emphasize the practical motivation for improving forecasts. Which choice best uses the notes to accomplish this goal?", options: ["Solar storms originate in the Sun's complex magnetic field.", "Better forecasts of solar storms could help satellite operators protect equipment from damage like that caused by the 2003 'Halloween storm.'", "The 2003 Halloween storm damaged 28 satellites.", "Solar storms are an active area of research."], correctAnswer: 1, explanation: "B explicitly connects forecasting to a practical benefit." },
  { id: 26, section: "Reading & Writing", question: "Notes:\n• Plant geneticists have engineered drought-tolerant maize\n• Field trials in 2019 in Kenya showed 25–35% higher yields under drought\n• Farmers using the variety reported greater food security\n• Wider adoption could help mitigate climate-related crop losses\n\nThe student wants to emphasize the broader implications of the trials. Which choice best uses the notes to accomplish this goal?", options: ["The 2019 Kenya trials measured maize yields under drought.", "Drought-tolerant maize trials in Kenya produced 25–35% higher yields, suggesting that wider adoption could help mitigate climate-related crop losses.", "Farmers in Kenya grow maize.", "Plant genetics is a complex field."], correctAnswer: 1, explanation: "Only B links the trial results to the broader implication." },
  { id: 27, section: "Reading & Writing", question: "The novelist's early stories were quiet and domestic; ___ her later work tackled war, displacement, and political violence.", options: ["likewise", "by contrast", "for example", "in conclusion"], correctAnswer: 1, explanation: "Contrast between early quiet/domestic and later large themes → by contrast." },
];

// ─────────────────────────────────────────────────────────────
// Math Practice 1 — 22 questions / 35 min
// ─────────────────────────────────────────────────────────────
const math1Questions: SatMockQuestion[] = [
  { id: 1, section: "Math", question: "If 3x + 5 = 26, what is the value of x?", options: ["5", "6", "7", "9"], correctAnswer: 2, explanation: "3x = 21 → x = 7." },
  { id: 2, section: "Math", question: "A line passes through (0, 4) and (3, 13). What is its slope?", options: ["2", "3", "4", "9"], correctAnswer: 1, explanation: "Slope = (13−4)/(3−0) = 9/3 = 3." },
  { id: 3, section: "Math", question: "If 4(x − 2) = 2x + 6, what is x?", options: ["5", "6", "7", "8"], correctAnswer: 2, explanation: "4x − 8 = 2x + 6 → 2x = 14 → x = 7." },
  { id: 4, section: "Math", question: "If f(x) = 2x² − 3, what is f(4)?", options: ["13", "23", "29", "32"], correctAnswer: 2, explanation: "2(16) − 3 = 32 − 3 = 29." },
  { id: 5, section: "Math", question: "Solve for x: x/3 + 2 = 8", options: ["12", "16", "18", "20"], correctAnswer: 2, explanation: "x/3 = 6 → x = 18." },
  { id: 6, section: "Math", question: "If 2x − y = 7 and x + y = 5, what is x?", options: ["3", "4", "5", "6"], correctAnswer: 1, explanation: "Adding: 3x = 12 → x = 4." },
  { id: 7, section: "Math", question: "What is 15% of 240?", options: ["24", "30", "36", "40"], correctAnswer: 2, explanation: "0.15 × 240 = 36." },
  { id: 8, section: "Math", question: "A rectangle has length 12 and width 5. What is its area?", options: ["17", "34", "60", "120"], correctAnswer: 2, explanation: "Area = 12 × 5 = 60." },
  { id: 9, section: "Math", question: "If x² = 49, which of the following could be x?", options: ["−7", "0", "14", "49"], correctAnswer: 0, explanation: "x = ±7." },
  { id: 10, section: "Math", question: "Triangle ABC has angles 50° and 65°. What is the third angle?", options: ["55°", "60°", "65°", "70°"], correctAnswer: 2, explanation: "180 − 50 − 65 = 65°." },
  { id: 11, section: "Math", question: "If y is directly proportional to x and y = 12 when x = 3, what is y when x = 8?", options: ["24", "32", "36", "48"], correctAnswer: 1, explanation: "k = 12/3 = 4 → y = 4·8 = 32." },
  { id: 12, section: "Math", question: "Solve x² − 5x + 6 = 0.", options: ["x = 1, 6", "x = 2, 3", "x = −2, −3", "x = 0, 5"], correctAnswer: 1, explanation: "(x − 2)(x − 3) = 0." },
  { id: 13, section: "Math", question: "A circle has radius 6. What is its area? (use π ≈ 3.14)", options: ["18.84", "37.68", "113.04", "226.08"], correctAnswer: 2, explanation: "πr² = 3.14 × 36 = 113.04." },
  { id: 14, section: "Math", question: "If the average of 4, 7, x, and 9 is 8, what is x?", options: ["10", "11", "12", "14"], correctAnswer: 2, explanation: "(4+7+x+9)/4 = 8 → x+20 = 32 → x = 12." },
  { id: 15, section: "Math", question: "What is the value of (3⁴ × 3²) / 3³?", options: ["3", "9", "27", "81"], correctAnswer: 2, explanation: "3^(4+2−3) = 3³ = 27." },
  { id: 16, section: "Math", question: "Line ℓ has equation y = 2x − 1. Which line is parallel to ℓ?", options: ["y = −2x + 5", "y = (1/2)x + 3", "y = 2x + 4", "y = −(1/2)x"], correctAnswer: 2, explanation: "Same slope (2)." },
  { id: 17, section: "Math", question: "A bag has 4 red and 6 blue marbles. What is the probability of drawing a red marble?", options: ["2/5", "3/5", "4/6", "6/10"], correctAnswer: 0, explanation: "4/10 = 2/5." },
  { id: 18, section: "Math", question: "Solve: |x − 3| = 5", options: ["x = 2 or 8", "x = −2 or 8", "x = −5 or 5", "x = 8 only"], correctAnswer: 1, explanation: "x − 3 = ±5 → x = 8 or x = −2." },
  { id: 19, section: "Math", question: "If sin θ = 3/5 and θ is acute, what is cos θ?", options: ["3/4", "4/5", "5/4", "5/3"], correctAnswer: 1, explanation: "3-4-5 triangle → cos θ = 4/5." },
  { id: 20, section: "Math", question: "A right triangle has legs 5 and 12. What is the hypotenuse?", options: ["13", "15", "17", "60"], correctAnswer: 0, explanation: "5-12-13 triple." },
  { id: 21, section: "Math", question: "If x:y = 2:3 and x + y = 25, what is y?", options: ["10", "12", "15", "18"], correctAnswer: 2, explanation: "x = 10, y = 15." },
  { id: 22, section: "Math", question: "Expand (x + 4)(x − 2).", options: ["x² + 2x − 8", "x² − 2x + 8", "x² + 6x − 8", "x² − 6x + 8"], correctAnswer: 0, explanation: "x² −2x + 4x − 8 = x² + 2x − 8." },
];

// ─────────────────────────────────────────────────────────────
// Math Practice 2 — 22 questions / 35 min
// ─────────────────────────────────────────────────────────────
const math2Questions: SatMockQuestion[] = [
  { id: 1, section: "Math", question: "Solve for x: 5x − 8 = 2x + 7.", options: ["3", "4", "5", "6"], correctAnswer: 2, explanation: "3x = 15 → x = 5." },
  { id: 2, section: "Math", question: "Line passes through (1, 2) and (5, 14). Slope?", options: ["2", "3", "4", "6"], correctAnswer: 1, explanation: "(14−2)/(5−1) = 12/4 = 3." },
  { id: 3, section: "Math", question: "If g(x) = x² + x, what is g(−3)?", options: ["−12", "−6", "6", "12"], correctAnswer: 2, explanation: "9 + (−3) = 6." },
  { id: 4, section: "Math", question: "What is 60% of 250?", options: ["120", "140", "150", "180"], correctAnswer: 2, explanation: "0.6 × 250 = 150." },
  { id: 5, section: "Math", question: "Solve: x² + 4x − 12 = 0.", options: ["x = 2, −6", "x = −2, 6", "x = 3, 4", "x = −3, −4"], correctAnswer: 0, explanation: "(x − 2)(x + 6) = 0." },
  { id: 6, section: "Math", question: "If 2x + 3y = 12 and x = 3, what is y?", options: ["1", "2", "3", "4"], correctAnswer: 1, explanation: "6 + 3y = 12 → y = 2." },
  { id: 7, section: "Math", question: "A car travels 180 miles in 3 hours. Average speed?", options: ["50 mph", "55 mph", "60 mph", "65 mph"], correctAnswer: 2, explanation: "180/3 = 60 mph." },
  { id: 8, section: "Math", question: "Area of a triangle with base 10 and height 6?", options: ["16", "30", "60", "120"], correctAnswer: 1, explanation: "(1/2)(10)(6) = 30." },
  { id: 9, section: "Math", question: "If 3^x = 27, what is x?", options: ["2", "3", "4", "9"], correctAnswer: 1, explanation: "3³ = 27 → x = 3." },
  { id: 10, section: "Math", question: "A bag has 3 green, 5 yellow, 2 red marbles. P(yellow)?", options: ["1/5", "1/3", "1/2", "5/10"], correctAnswer: 2, explanation: "5/10 = 1/2." },
  { id: 11, section: "Math", question: "Median of 4, 9, 2, 7, 6?", options: ["4", "6", "7", "9"], correctAnswer: 1, explanation: "Sorted: 2,4,6,7,9 → median 6." },
  { id: 12, section: "Math", question: "If y = mx + b passes through (0, 3) and (2, 11), what is m?", options: ["2", "3", "4", "8"], correctAnswer: 2, explanation: "(11−3)/(2−0) = 4." },
  { id: 13, section: "Math", question: "Volume of a cube with side 4?", options: ["12", "16", "48", "64"], correctAnswer: 3, explanation: "4³ = 64." },
  { id: 14, section: "Math", question: "Solve: 2(x + 3) = x + 11.", options: ["3", "4", "5", "8"], correctAnswer: 2, explanation: "2x + 6 = x + 11 → x = 5." },
  { id: 15, section: "Math", question: "If cos θ = 12/13 and θ is acute, what is sin θ?", options: ["5/12", "5/13", "12/13", "13/5"], correctAnswer: 1, explanation: "5-12-13 → sin θ = 5/13." },
  { id: 16, section: "Math", question: "A rectangle's perimeter is 30 and its length is 9. What is its width?", options: ["3", "5", "6", "12"], correctAnswer: 2, explanation: "2(9 + w) = 30 → w = 6." },
  { id: 17, section: "Math", question: "If a:b = 5:2 and b = 8, what is a?", options: ["10", "16", "20", "25"], correctAnswer: 2, explanation: "a/8 = 5/2 → a = 20." },
  { id: 18, section: "Math", question: "Expand (2x − 3)².", options: ["4x² − 9", "4x² − 12x + 9", "4x² + 12x + 9", "2x² − 12x + 9"], correctAnswer: 1, explanation: "(2x)² − 2·2x·3 + 9." },
  { id: 19, section: "Math", question: "Vertex of y = (x − 2)² + 5?", options: ["(−2, 5)", "(2, −5)", "(2, 5)", "(5, 2)"], correctAnswer: 2, explanation: "Vertex form: (h, k) = (2, 5)." },
  { id: 20, section: "Math", question: "Distance between (1, 2) and (4, 6)?", options: ["3", "4", "5", "7"], correctAnswer: 2, explanation: "√(3² + 4²) = √25 = 5." },
  { id: 21, section: "Math", question: "If 4x − y = 10 and 2x + y = 8, what is x?", options: ["2", "3", "4", "5"], correctAnswer: 1, explanation: "Adding: 6x = 18 → x = 3." },
  { id: 22, section: "Math", question: "A circle has equation x² + y² = 49. Radius?", options: ["6", "7", "14", "49"], correctAnswer: 1, explanation: "r² = 49 → r = 7." },
];

const reIndex = (qs: SatMockQuestion[], offset: number): SatMockQuestion[] =>
  qs.map((q, i) => ({ ...q, id: offset + i + 1 }));

// ─────────────────────────────────────────────────────────────
// Exams
// ─────────────────────────────────────────────────────────────
import { satMockExamExpansion } from "./satMockExamExpansion";
import { satMockExamExpansion2 } from "./satMockExamExpansion2";
import { satMockExamExpansion3 } from "./satMockExamExpansion3";
import { satMockExamExpansion4 } from "./satMockExamExpansion4";
import { satMockExamExpansion5 } from "./satMockExamExpansion5";

const baseSatMockExams: SatMockExam[] = [
  {
    id: "sat-rw-practice-1",
    title: "SAT Reading & Writing — Module Practice 1",
    titleVi: "SAT Reading & Writing — Đề luyện 1",
    type: "rw",
    duration: 32,
    totalQuestions: 27,
    description: "One full Digital SAT R&W module. Real timing: 32 minutes for 27 questions.",
    descriptionVi: "Một module Reading & Writing chuẩn Digital SAT. Đúng thời gian thật: 32 phút cho 27 câu.",
    questions: rw1Questions,
  },
  {
    id: "sat-rw-practice-2",
    title: "SAT Reading & Writing — Module Practice 2",
    titleVi: "SAT Reading & Writing — Đề luyện 2",
    type: "rw",
    duration: 32,
    totalQuestions: 27,
    description: "Second R&W module practice with the official Digital SAT timing.",
    descriptionVi: "Đề luyện Reading & Writing thứ hai theo đúng thời gian thi thật.",
    questions: rw2Questions,
  },
  {
    id: "sat-math-practice-1",
    title: "SAT Math — Module Practice 1",
    titleVi: "SAT Math — Đề luyện 1",
    type: "math",
    duration: 35,
    totalQuestions: 22,
    description: "One full Digital SAT Math module. Real timing: 35 minutes for 22 questions. Calculator allowed.",
    descriptionVi: "Một module Math chuẩn Digital SAT. Đúng thời gian thật: 35 phút cho 22 câu. Được dùng máy tính.",
    questions: math1Questions,
  },
  {
    id: "sat-math-practice-2",
    title: "SAT Math — Module Practice 2",
    titleVi: "SAT Math — Đề luyện 2",
    type: "math",
    duration: 35,
    totalQuestions: 22,
    description: "Second Math module practice with official Digital SAT timing.",
    descriptionVi: "Đề luyện Math thứ hai theo đúng thời gian thi thật.",
    questions: math2Questions,
  },
  {
    id: "sat-full-mock-1",
    title: "Full Digital SAT Mock Test #1",
    titleVi: "Đề thi thử Digital SAT đầy đủ #1",
    type: "full",
    duration: 134, // 64 R&W + 70 Math
    totalQuestions: 98,
    description: "A full-length Digital SAT: 2 R&W modules (64 min, 54 Q) + 2 Math modules (70 min, 44 Q) = 134 min, 98 Q.",
    descriptionVi: "Một bài Digital SAT đầy đủ: 2 module R&W (64 phút, 54 câu) + 2 module Math (70 phút, 44 câu) = 134 phút, 98 câu.",
    questions: [
      ...rw1Questions, // 27
      ...reIndex(rw2Questions, 27), // 27
      ...reIndex(math1Questions, 54), // 22
      ...reIndex(math2Questions, 76), // 22
    ],
  },
];

export const satMockExams: SatMockExam[] = [...baseSatMockExams, ...satMockExamExpansion, ...satMockExamExpansion2, ...satMockExamExpansion3, ...satMockExamExpansion4, ...satMockExamExpansion5];
