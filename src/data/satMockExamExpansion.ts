/**
 * SAT Mock Exam Expansion — additional R&W and Math practice modules
 * Same Digital SAT timing as the originals.
 */
import type { SatMockQuestion, SatMockExam } from "./satMockExamData";

// ─────────────────────────────────────────────────────────────
// Reading & Writing Practice 3 — 27 questions / 32 min
// ─────────────────────────────────────────────────────────────
const rw3Questions: SatMockQuestion[] = [
  // Words in Context
  { id: 1, section: "Reading & Writing", question: "The senator's response was ___; she answered every question in detail and offered to follow up in writing.", options: ["evasive", "forthright", "perfunctory", "cryptic"], correctAnswer: 1, explanation: "Detailed and willing to follow up = forthright." },
  { id: 2, section: "Reading & Writing", question: "Although the prototype was crude, its underlying design was ___, predicting features that became standard a decade later.", options: ["derivative", "prescient", "outdated", "trivial"], correctAnswer: 1, explanation: "Predicting later standards = prescient." },
  { id: 3, section: "Reading & Writing", question: "The committee's report was praised for being ___: every claim was backed by data and traceable to a primary source.", options: ["rigorous", "speculative", "polemical", "anecdotal"], correctAnswer: 0, explanation: "Data-backed and traceable = rigorous." },
  { id: 4, section: "Reading & Writing", question: "Octavia E. Butler's fiction often ___ contemporary anxieties about power, race, and technology, projecting them into vivid future societies.", options: ["dismisses", "amplifies", "ignores", "trivializes"], correctAnswer: 1, explanation: "'Projecting into vivid future societies' = amplifies." },
  { id: 5, section: "Reading & Writing", question: "The mountain's summit, often ___ by clouds, is visible only on the clearest mornings.", options: ["revealed", "obscured", "illuminated", "magnified"], correctAnswer: 1, explanation: "Visible only on clearest mornings → usually obscured." },
  { id: 6, section: "Reading & Writing", question: "The architect's later buildings show a striking ___ from her early minimalist style toward warmer, more ornamental forms.", options: ["adherence", "departure", "indifference", "regression"], correctAnswer: 1, explanation: "Moving away from a style = departure." },

  // Central Ideas / Details
  { id: 7, section: "Reading & Writing", passage: "Octopuses, despite having no central skeleton, can squeeze through any opening larger than their beak — the only hard part of their body. Marine biologists studying captive octopuses have repeatedly recorded individuals escaping enclosures by exploiting unsealed pipe joints just centimeters wide.", question: "Which choice best states the main idea of the text?", options: ["Octopuses have unusually large beaks.", "Octopuses' soft bodies and a single hard part allow them to escape through very small openings.", "Captive octopuses are easy to keep contained.", "Marine biologists rarely study octopuses."], correctAnswer: 1, explanation: "The text emphasizes the link between soft body, beak as only hard part, and escape ability." },
  { id: 8, section: "Reading & Writing", passage: "When the Apollo 11 astronauts returned in 1969, they were placed in quarantine for 21 days. NASA scientists were uncertain whether lunar samples might harbor microorganisms that could be harmful to terrestrial life. No such organisms were ever found.", question: "Which choice best summarizes the text?", options: ["Apollo 11 astronauts caught a disease on the Moon.", "NASA quarantined the Apollo 11 crew as a precaution against possible lunar microorganisms.", "NASA had no plan for handling Apollo 11 samples.", "Apollo 11 was the first manned Moon mission."], correctAnswer: 1, explanation: "The quarantine was a precaution; no organisms were found." },
  { id: 9, section: "Reading & Writing", passage: "The composer Florence Price became, in 1933, the first African American woman to have a symphony performed by a major American orchestra. Yet for decades after her death, her manuscripts sat in an abandoned house and were nearly lost — recovered only in 2009 by chance.", question: "Which choice best states the main idea?", options: ["Florence Price was the first woman to write a symphony.", "Price's pioneering achievements were nearly forgotten until her manuscripts were rediscovered by chance.", "American orchestras refused to perform Price's work.", "The 2009 discovery proves Price was overrated."], correctAnswer: 1, explanation: "Pioneering + nearly lost + rediscovered = main idea." },
  { id: 10, section: "Reading & Writing", passage: "Mycorrhizal fungi form symbiotic networks with the roots of most land plants, exchanging mineral nutrients for sugars. Recent experiments using radioactive tracers show that carbon can travel between trees of different species through these networks.", question: "According to the text, what do mycorrhizal fungi exchange with plants?", options: ["Sugars for water.", "Mineral nutrients for sugars.", "Carbon for oxygen.", "Sunlight for nitrogen."], correctAnswer: 1, explanation: "The text states the exchange directly." },

  // Command of Evidence
  { id: 11, section: "Reading & Writing", passage: "A team hypothesizes that students who handwrite lecture notes recall content better than those who type notes on a laptop.", question: "Which finding would most directly support the hypothesis?", options: ["Students who handwrote notes spent more time reviewing them later.", "On a recall test one week later, handwriters scored 22% higher on average than typists.", "Most students prefer typing to handwriting.", "Laptops are more common in classrooms now than ten years ago."], correctAnswer: 1, explanation: "B is the only choice with a direct comparative recall result." },
  { id: 12, section: "Reading & Writing", passage: "A graph titled 'Average ocean surface temperature, 1980–2020' shows a steady increase from 16.0°C in 1980 to 17.1°C in 2020.\n\nA student concludes: ___", question: "Which choice most accurately completes the conclusion using data from the graph?", options: ["Ocean temperatures fluctuated wildly during this period.", "Average ocean surface temperature rose by about 1.1°C between 1980 and 2020.", "Ocean temperatures will reach 20°C by 2050.", "The graph shows ocean salinity is changing."], correctAnswer: 1, explanation: "17.1 − 16.0 = 1.1°C — the only conclusion the graph supports." },
  { id: 13, section: "Reading & Writing", passage: "Hypothesis: Daily 30-minute walks reduce reported anxiety levels in college students.", question: "Which result would most strongly support the hypothesis?", options: ["Walkers reported sleeping more hours per night.", "Students who walked 30 minutes daily reported anxiety scores 25% lower than a comparable non-walking group.", "Walking is a popular activity on college campuses.", "Many students cannot find time to walk."], correctAnswer: 1, explanation: "B is the only choice that compares anxiety scores with a control group." },

  // Inferences
  { id: 14, section: "Reading & Writing", passage: "Bowhead whales can live more than 200 years — longer than any other mammal. Their cells contain unusually efficient DNA-repair enzymes that may slow age-related damage. Researchers studying these enzymes hope to ___", question: "Which choice most logically completes the text?", options: ["develop ways to extend whale lifespans further.", "apply lessons from bowhead biology to human anti-aging research.", "outlaw whaling worldwide.", "prove that whales are smarter than humans."], correctAnswer: 1, explanation: "Studying repair enzymes for anti-aging → apply to humans." },
  { id: 15, section: "Reading & Writing", passage: "Although the museum has acquired hundreds of new works in the past decade, gallery space has remained the same. Curators must therefore ___", question: "Which choice most logically completes the text?", options: ["display every new acquisition simultaneously.", "rotate works in and out of storage rather than display them all at once.", "stop acquiring new works.", "destroy older works to make room."], correctAnswer: 1, explanation: "More works + fixed space → rotation is the obvious solution." },
  { id: 16, section: "Reading & Writing", passage: "Several languages, including Hawaiian and Māori, use far fewer consonants than English. Linguists note that languages with fewer consonants tend to use longer words to maintain distinguishable vocabulary. From this we can infer that ___", question: "Which choice most logically completes the text?", options: ["Hawaiian speakers struggle to communicate.", "Hawaiian words tend, on average, to be longer than English words with comparable meaning.", "English will eventually lose consonants too.", "Languages with fewer consonants have smaller vocabularies."], correctAnswer: 1, explanation: "Fewer consonants → longer words to stay distinguishable." },

  // Grammar / punctuation / transitions / synthesis
  { id: 17, section: "Reading & Writing", question: "By the time the rescue team arrived, the climbers ___ for shelter under a rocky overhang.", options: ["already taken", "have already taken", "had already taken", "are already taking"], correctAnswer: 2, explanation: "Past perfect ('had taken') for action completed before another past action." },
  { id: 18, section: "Reading & Writing", question: "The festival's headlining performers ___ Angélique Kidjo, Rosalía, and Burna Boy.", options: [": ", ", ", "; ", " — "], correctAnswer: 0, explanation: "Colon introduces a list after an independent clause." },
  { id: 19, section: "Reading & Writing", question: "Neither the director nor the producers ___ willing to comment on the leaked script.", options: ["was", "were", "is", "has been"], correctAnswer: 1, explanation: "With 'neither/nor', verb agrees with the nearer subject ('producers' = plural → 'were')." },
  { id: 20, section: "Reading & Writing", question: "The artifact, along with several other Bronze Age tools, ___ on display next month.", options: ["go", "are going", "goes", "have gone"], correctAnswer: 2, explanation: "'Along with' phrase doesn't change the singular subject ('artifact' → 'goes')." },
  { id: 21, section: "Reading & Writing", question: "She trained for months ___ she could finish the marathon in under three hours.", options: ["because", "so that", "although", "unless"], correctAnswer: 1, explanation: "'So that' expresses purpose." },
  { id: 22, section: "Reading & Writing", question: "Solar panel costs have fallen sharply over the past decade; ___, installations are now growing fastest in lower-income regions.", options: ["nevertheless", "as a result", "for instance", "by contrast"], correctAnswer: 1, explanation: "Falling costs → growth in lower-income regions = consequence." },
  { id: 23, section: "Reading & Writing", question: "Most of the film was shot on location in Iceland; ___, a few interior scenes were filmed on a sound stage in London.", options: ["consequently", "however", "in addition", "specifically"], correctAnswer: 1, explanation: "Contrast between location vs. sound stage → 'however'." },
  { id: 24, section: "Reading & Writing", question: "Notes on the chemist Alice Ball:\n• Born 1892, Seattle\n• First woman and first African American to earn a master's degree from the University of Hawaii (1915)\n• Developed an injectable treatment for leprosy used into the 1940s\n• Died at age 24 before publishing her results\n\nThe student wants to introduce Ball to readers unfamiliar with her work. Which choice best uses the notes to accomplish this goal?", options: ["Alice Ball was born in Seattle in 1892.", "Alice Ball (1892–1916) was a chemist whose injectable leprosy treatment, developed before her death at 24, was used into the 1940s.", "Many chemists in the early 1900s worked on leprosy treatments.", "Alice Ball earned a master's degree in 1915."], correctAnswer: 1, explanation: "B is the most informative single-sentence introduction." },
  { id: 25, section: "Reading & Writing", question: "Notes:\n• Population of Lagos in 1980: ~2.5 million\n• Population of Lagos in 2020: ~14.4 million\n• Lagos became the most populous city in Africa\n\nThe student wants to emphasize the scale of growth. Which choice best uses the notes to accomplish this goal?", options: ["Lagos is in Nigeria.", "Lagos's population grew almost six-fold between 1980 and 2020, making it the most populous city in Africa.", "Lagos is a city worth visiting.", "Many cities have grown since 1980."], correctAnswer: 1, explanation: "B quantifies and contextualizes the growth." },
  { id: 26, section: "Reading & Writing", question: "Notes:\n• Vincent van Gogh produced about 2,100 works in roughly 10 years\n• Sold only one painting during his lifetime\n• Now considered one of the most influential figures in Western art\n\nThe student wants to highlight the contrast between Van Gogh's lifetime reception and his current reputation. Which choice best uses the notes to accomplish this goal?", options: ["Van Gogh produced about 2,100 works in roughly 10 years.", "Although Van Gogh sold only one painting in his lifetime, he is now regarded as one of the most influential figures in Western art.", "Van Gogh painted many famous landscapes.", "Van Gogh worked quickly throughout his career."], correctAnswer: 1, explanation: "B directly contrasts lifetime sales with present reputation." },
  { id: 27, section: "Reading & Writing", question: "The lab equipment had been calibrated the night before; ___, the morning's measurements were still inconsistent.", options: ["therefore", "nevertheless", "in addition", "for example"], correctAnswer: 1, explanation: "Contrast between expected and actual outcome → 'nevertheless'." },
];

// ─────────────────────────────────────────────────────────────
// Reading & Writing Practice 4 — 27 questions / 32 min
// ─────────────────────────────────────────────────────────────
const rw4Questions: SatMockQuestion[] = [
  { id: 1, section: "Reading & Writing", question: "The reviewer described the chef's menu as ___: it borrowed freely from cuisines across three continents while remaining unmistakably her own.", options: ["eclectic", "monotonous", "derivative", "predictable"], correctAnswer: 0, explanation: "Borrowing from many sources = eclectic." },
  { id: 2, section: "Reading & Writing", question: "Although the proposal seemed ___ at first glance, a closer reading revealed several practical, well-reasoned ideas.", options: ["sound", "fanciful", "tedious", "verbose"], correctAnswer: 1, explanation: "'Although... at first glance' contrasts with 'practical' → fanciful." },
  { id: 3, section: "Reading & Writing", question: "The witness's testimony was undermined by several ___: dates that didn't match, names that shifted, and a timeline that contradicted itself.", options: ["accolades", "inconsistencies", "compliments", "anecdotes"], correctAnswer: 1, explanation: "Mismatches and contradictions = inconsistencies." },
  { id: 4, section: "Reading & Writing", question: "Toni Morrison's later novels ___ themes she had explored earlier in her career, returning to questions of memory, race, and home.", options: ["abandoned", "revisited", "ridiculed", "concealed"], correctAnswer: 1, explanation: "'Returning to' = revisited." },
  { id: 5, section: "Reading & Writing", question: "The conductor was known for her ___ rehearsals: every entrance and dynamic was rehearsed until perfectly secure.", options: ["meticulous", "haphazard", "brief", "lenient"], correctAnswer: 0, explanation: "Every detail rehearsed = meticulous." },
  { id: 6, section: "Reading & Writing", question: "Although early reviews were ___, the play eventually won three major awards and ran for two years.", options: ["enthusiastic", "lukewarm", "rapturous", "irrelevant"], correctAnswer: 1, explanation: "'Although... eventually won' contrasts → lukewarm reviews at first." },

  { id: 7, section: "Reading & Writing", passage: "Honeybees communicate the location of food through a 'waggle dance' performed inside the hive. The angle of the dance relative to vertical encodes the direction of the food relative to the sun, while the duration of the waggle indicates distance.", question: "Which choice best states the main idea?", options: ["Honeybees use sunlight to find food.", "The honeybee waggle dance encodes both direction and distance to a food source.", "Bees communicate primarily through sound.", "Only worker bees can perform the waggle dance."], correctAnswer: 1, explanation: "Both direction (angle) and distance (duration) are stated." },
  { id: 8, section: "Reading & Writing", passage: "In 2019, astronomers obtained the first direct image of a black hole, located at the center of the galaxy M87. The image was reconstructed from data gathered by a network of eight radio telescopes spread across the globe, effectively creating a virtual telescope the size of Earth.", question: "According to the text, how was the 2019 image of the M87 black hole produced?", options: ["By a single very large optical telescope.", "By combining data from a globe-spanning network of radio telescopes.", "By computer simulation only.", "By the Hubble Space Telescope."], correctAnswer: 1, explanation: "The text describes the linked-network technique." },
  { id: 9, section: "Reading & Writing", passage: "The Indian mathematician Srinivasa Ramanujan, largely self-taught, sent letters from Madras in 1913 containing dozens of unfamiliar formulas. The Cambridge mathematician G. H. Hardy initially suspected the letters were a hoax — the formulas were so original he could not see how anyone could have invented them.", question: "Which choice best describes Hardy's first reaction?", options: ["Immediate enthusiasm.", "Disbelief, because the formulas seemed too original to be genuine.", "Indifference, because he was busy.", "Anger that an unknown had written to him."], correctAnswer: 1, explanation: "The text says he 'suspected... a hoax' due to originality." },
  { id: 10, section: "Reading & Writing", passage: "Permafrost — soil that has been frozen for at least two consecutive years — covers roughly 15% of the Northern Hemisphere's land surface. As global temperatures rise, permafrost is thawing, releasing methane and carbon dioxide previously trapped in the soil.", question: "Which choice best states the main idea?", options: ["Permafrost is found only in Russia.", "Thawing permafrost releases greenhouse gases that had been trapped in frozen soil.", "Permafrost has expanded in recent years.", "Methane is the main gas in Earth's atmosphere."], correctAnswer: 1, explanation: "The text emphasizes the release of trapped gases as permafrost thaws." },

  { id: 11, section: "Reading & Writing", passage: "Hypothesis: Cities that add protected bicycle lanes see fewer cyclist injuries.", question: "Which finding would most directly support the hypothesis?", options: ["Cyclists prefer protected lanes.", "Cities that added protected lanes saw a 35% drop in cyclist injuries within two years, compared with no change in cities that did not.", "Most cyclists wear helmets.", "Bicycle sales are rising globally."], correctAnswer: 1, explanation: "B is the only choice with a comparative reduction in injuries." },
  { id: 12, section: "Reading & Writing", passage: "A bar chart titled 'Annual rainfall in Region X (mm), 2015–2024' shows totals ranging from a low of 410 mm in 2015 to a high of 1,020 mm in 2024.\n\nA student concludes: ___", question: "Which choice most accurately completes the conclusion using data from the chart?", options: ["Rainfall in Region X has decreased over the period.", "Annual rainfall in Region X more than doubled between 2015 and 2024.", "Region X had no rainfall in some years.", "Rainfall is now constant year to year."], correctAnswer: 1, explanation: "1,020 vs. 410 = more than doubled." },
  { id: 13, section: "Reading & Writing", passage: "Hypothesis: Students who get at least 8 hours of sleep before an exam score higher than those who get less.", question: "Which result would most strongly support the hypothesis?", options: ["Most students prefer to sleep longer.", "Students who slept 8+ hours scored, on average, 14% higher than those who slept fewer than 6 hours.", "Sleep is important for general health.", "Many students drink coffee before exams."], correctAnswer: 1, explanation: "Direct comparative score difference supports the hypothesis." },

  { id: 14, section: "Reading & Writing", passage: "The cuckoo lays its eggs in the nests of other bird species, leaving them to raise the chick. Cuckoo eggs have evolved to closely mimic the appearance of the host species' eggs. From this we can infer that hosts ___", question: "Which choice most logically completes the text?", options: ["prefer to raise cuckoo chicks.", "are likely to reject foreign eggs that look different from their own.", "lay fewer eggs than cuckoos.", "no longer build nests."], correctAnswer: 1, explanation: "Mimicry only matters if hosts can spot and reject foreign eggs." },
  { id: 15, section: "Reading & Writing", passage: "Although the company restructured its workforce two years ago, productivity has not improved. Several internal reports suggest that ___", question: "Which choice most logically completes the text?", options: ["the restructuring exceeded its goals.", "the restructuring may not have addressed the underlying causes of low productivity.", "productivity is impossible to measure.", "the workforce was already too efficient."], correctAnswer: 1, explanation: "If productivity didn't improve despite restructuring, the cause likely wasn't addressed." },
  { id: 16, section: "Reading & Writing", passage: "A regional dialect once spoken by tens of thousands of people is now used fluently by fewer than 200 elderly speakers. Without intervention, ___", question: "Which choice most logically completes the text?", options: ["the dialect will likely become extinct within a generation.", "the dialect will spread to new regions.", "the dialect will be taught in major universities.", "the dialect will return to its earlier number of speakers."], correctAnswer: 0, explanation: "200 elderly speakers + no intervention → likely extinction." },

  { id: 17, section: "Reading & Writing", question: "When the package finally arrived, it ___ already been opened and resealed twice.", options: ["have", "had", "has", "having"], correctAnswer: 1, explanation: "Past perfect 'had been opened' for action before another past event." },
  { id: 18, section: "Reading & Writing", question: "The committee considered three candidates for the role ___ Aisha Patel, Diego Morales, and Yuki Tanaka.", options: [": ", ", ", "; ", " — "], correctAnswer: 0, explanation: "Colon introduces a list after an independent clause." },
  { id: 19, section: "Reading & Writing", question: "The collection of rare manuscripts ___ housed in a climate-controlled vault.", options: ["are", "is", "have been", "were"], correctAnswer: 1, explanation: "'Collection' is singular → 'is housed'." },
  { id: 20, section: "Reading & Writing", question: "Either the supervisor or the engineers ___ responsible for signing off on the design.", options: ["is", "are", "was", "has been"], correctAnswer: 1, explanation: "With 'either/or', verb agrees with the nearer subject ('engineers' → 'are')." },
  { id: 21, section: "Reading & Writing", question: "The trail was closed for repairs ___ hikers could no longer use it after September.", options: ["because of", "so that", "even though", "as a result"], correctAnswer: 3, explanation: "'As a result' connects the closure (cause) to hikers' loss of access (effect)." },
  { id: 22, section: "Reading & Writing", question: "The library's old card catalog has been digitized; ___, patrons can now search the entire collection from any device.", options: ["nevertheless", "consequently", "for instance", "by contrast"], correctAnswer: 1, explanation: "Digitization → searchable from any device = consequence." },
  { id: 23, section: "Reading & Writing", question: "The team spent six months collecting field samples; ___, only a fraction of that data made it into the final paper.", options: ["accordingly", "however", "in addition", "for example"], correctAnswer: 1, explanation: "Six months of collection vs. a fraction used → contrast → 'however'." },
  { id: 24, section: "Reading & Writing", question: "Notes on the engineer Hedy Lamarr:\n• Hollywood actress born in Vienna, 1914\n• Co-invented a frequency-hopping signal system in 1942\n• Patent later influenced Wi-Fi, GPS, and Bluetooth technologies\n\nThe student wants to emphasize Lamarr's technical legacy. Which choice best uses the notes to accomplish this goal?", options: ["Hedy Lamarr was born in Vienna in 1914.", "Hedy Lamarr's 1942 frequency-hopping patent helped lay the groundwork for modern Wi-Fi, GPS, and Bluetooth.", "Hedy Lamarr was a Hollywood actress.", "Many actresses pursued side projects in the 1940s."], correctAnswer: 1, explanation: "B foregrounds her technical contribution and impact." },
  { id: 25, section: "Reading & Writing", question: "Notes:\n• Number of public libraries in Country X in 2000: 12,000\n• Number in 2023: 18,500\n• Average annual visits per library nearly doubled in the same period\n\nThe student wants to emphasize the growth in library use. Which choice best uses the notes?", options: ["Country X had 12,000 libraries in 2000.", "Between 2000 and 2023, public libraries in Country X grew in number while average annual visits per library nearly doubled.", "Libraries are valuable institutions.", "Country X invests heavily in education."], correctAnswer: 1, explanation: "B captures both growth metrics directly from the notes." },
  { id: 26, section: "Reading & Writing", question: "Notes:\n• Composer Clara Schumann (1819–1896)\n• Concert pianist who toured Europe for over 60 years\n• Composed only ~66 published works due to family duties\n• Today seen as a major Romantic composer\n\nThe student wants to highlight a contrast between Schumann's prolific performance career and her smaller compositional output. Which choice best uses the notes?", options: ["Clara Schumann was born in 1819.", "Although Clara Schumann toured as a pianist for more than 60 years, she published only about 66 compositions.", "Clara Schumann is now seen as a major Romantic composer.", "Many 19th-century composers were also performers."], correctAnswer: 1, explanation: "B is the only sentence that directly contrasts the two outputs." },
  { id: 27, section: "Reading & Writing", question: "The forecast called for clear skies all weekend; ___, the picnic was rained out on Saturday afternoon.", options: ["therefore", "however", "additionally", "specifically"], correctAnswer: 1, explanation: "Forecast vs. reality → contrast → 'however'." },
];

// ─────────────────────────────────────────────────────────────
// Math Practice 3 — 22 questions / 35 min
// ─────────────────────────────────────────────────────────────
const math3Questions: SatMockQuestion[] = [
  { id: 1, section: "Math", question: "If 4x − 7 = 21, what is the value of x?", options: ["3", "5", "7", "8"], correctAnswer: 2, explanation: "4x = 28, so x = 7." },
  { id: 2, section: "Math", question: "Which expression is equivalent to 3(2x + 4) − 2(x − 1)?", options: ["4x + 10", "4x + 14", "8x + 10", "8x + 14"], correctAnswer: 1, explanation: "6x + 12 − 2x + 2 = 4x + 14." },
  { id: 3, section: "Math", question: "A line has slope −2 and passes through the point (3, 1). What is its equation?", options: ["y = −2x + 7", "y = −2x − 5", "y = 2x − 5", "y = −2x + 1"], correctAnswer: 0, explanation: "y − 1 = −2(x − 3) → y = −2x + 7." },
  { id: 4, section: "Math", question: "If 3(x − 2) = 5x + 4, what is x?", options: ["−5", "−4", "4", "5"], correctAnswer: 0, explanation: "3x − 6 = 5x + 4 → −10 = 2x → x = −5." },
  { id: 5, section: "Math", question: "If the system { 2x + y = 10, x − y = 2 } has solution (x, y), what is x + y?", options: ["6", "8", "10", "12"], correctAnswer: 0, explanation: "Add: 3x = 12, x = 4. y = 4 − 2 = 2. x + y = 6." },
  { id: 6, section: "Math", question: "Which inequality represents 'three more than twice a number is at most 11'?", options: ["2x + 3 ≤ 11", "2x + 3 < 11", "2x + 3 ≥ 11", "3x + 2 ≤ 11"], correctAnswer: 0, explanation: "'Twice a number plus 3' = 2x + 3; 'at most 11' = ≤ 11." },
  { id: 7, section: "Math", question: "A car travels 180 miles in 3 hours. At the same rate, how far will it travel in 5 hours?", options: ["240 miles", "270 miles", "300 miles", "360 miles"], correctAnswer: 2, explanation: "Rate = 60 mph; 60 × 5 = 300 miles." },
  { id: 8, section: "Math", question: "In a class of 30 students, 18 are girls. What percent of the class is boys?", options: ["30%", "40%", "50%", "60%"], correctAnswer: 1, explanation: "Boys = 12; 12/30 = 40%." },
  { id: 9, section: "Math", question: "If f(x) = 2x² − 3, what is f(−2)?", options: ["−11", "−5", "5", "11"], correctAnswer: 2, explanation: "2(4) − 3 = 5." },
  { id: 10, section: "Math", question: "What are the solutions to x² − 5x + 6 = 0?", options: ["x = 1 and 6", "x = 2 and 3", "x = −2 and −3", "x = −1 and −6"], correctAnswer: 1, explanation: "(x − 2)(x − 3) = 0." },
  { id: 11, section: "Math", question: "The mean of 5 numbers is 12. If a sixth number is added and the mean becomes 14, what is the sixth number?", options: ["20", "22", "24", "26"], correctAnswer: 2, explanation: "Sum after = 6 × 14 = 84; sum before = 60; sixth = 24." },
  { id: 12, section: "Math", question: "A right triangle has legs of length 6 and 8. What is the length of the hypotenuse?", options: ["10", "12", "14", "16"], correctAnswer: 0, explanation: "√(36 + 64) = √100 = 10." },
  { id: 13, section: "Math", question: "Which expression is equivalent to (x + 3)(x − 4)?", options: ["x² − x − 12", "x² + x − 12", "x² − 7x − 12", "x² + 7x + 12"], correctAnswer: 0, explanation: "FOIL: x² − 4x + 3x − 12 = x² − x − 12." },
  { id: 14, section: "Math", question: "If 2^x = 32, what is x?", options: ["3", "4", "5", "6"], correctAnswer: 2, explanation: "32 = 2⁵." },
  { id: 15, section: "Math", question: "A circle has radius 5. What is its area? (Use π.)", options: ["10π", "15π", "20π", "25π"], correctAnswer: 3, explanation: "πr² = 25π." },
  { id: 16, section: "Math", question: "If y is directly proportional to x, and y = 12 when x = 4, what is y when x = 9?", options: ["18", "24", "27", "36"], correctAnswer: 2, explanation: "k = 3; y = 3 × 9 = 27." },
  { id: 17, section: "Math", question: "What is the slope of the line through (−1, 2) and (3, 10)?", options: ["1", "2", "3", "4"], correctAnswer: 1, explanation: "(10 − 2)/(3 − (−1)) = 8/4 = 2." },
  { id: 18, section: "Math", question: "Solve for x: |2x − 5| = 7", options: ["x = 1 and 6", "x = −1 and 6", "x = −1 and −6", "x = 1 and −6"], correctAnswer: 1, explanation: "2x − 5 = 7 → x = 6; 2x − 5 = −7 → x = −1." },
  { id: 19, section: "Math", question: "If sin(θ) = 3/5 and θ is acute, what is cos(θ)?", options: ["3/5", "4/5", "5/3", "5/4"], correctAnswer: 1, explanation: "Right triangle 3-4-5 → cos = 4/5." },
  { id: 20, section: "Math", question: "A rectangle has length 2x and width x + 3. Which expression represents its area?", options: ["3x + 3", "2x² + 3", "2x² + 6x", "x² + 6x"], correctAnswer: 2, explanation: "Area = 2x(x + 3) = 2x² + 6x." },
  { id: 21, section: "Math", question: "If g(x) = x² + 1 and h(x) = 2x, what is g(h(2))?", options: ["9", "13", "17", "21"], correctAnswer: 2, explanation: "h(2) = 4; g(4) = 16 + 1 = 17." },
  { id: 22, section: "Math", question: "A bag has 4 red and 6 blue marbles. If two are drawn without replacement, what is the probability both are red?", options: ["2/15", "1/9", "4/45", "6/45"], correctAnswer: 0, explanation: "(4/10)(3/9) = 12/90 = 2/15." },
];

// ─────────────────────────────────────────────────────────────
// Math Practice 4 — 22 questions / 35 min
// ─────────────────────────────────────────────────────────────
const math4Questions: SatMockQuestion[] = [
  { id: 1, section: "Math", question: "If 5x + 2 = 3x + 14, what is x?", options: ["4", "5", "6", "8"], correctAnswer: 2, explanation: "2x = 12, x = 6." },
  { id: 2, section: "Math", question: "What is the value of 3² + 4 × 2 − 5?", options: ["10", "12", "14", "16"], correctAnswer: 1, explanation: "9 + 8 − 5 = 12." },
  { id: 3, section: "Math", question: "A line passes through (0, −3) with slope 4. What is its equation?", options: ["y = 4x − 3", "y = 4x + 3", "y = −4x − 3", "y = −4x + 3"], correctAnswer: 0, explanation: "Slope-intercept: y = 4x − 3." },
  { id: 4, section: "Math", question: "If 2(x + 5) = 3x − 4, what is x?", options: ["10", "12", "14", "16"], correctAnswer: 2, explanation: "2x + 10 = 3x − 4 → x = 14." },
  { id: 5, section: "Math", question: "Solve: { x + 2y = 8, 3x − y = 3 }. What is y?", options: ["1", "2", "3", "4"], correctAnswer: 2, explanation: "From eq2: y = 3x − 3. Sub: x + 2(3x − 3) = 8 → 7x = 14 → x = 2 → y = 3." },
  { id: 6, section: "Math", question: "Which inequality represents 'half of x decreased by 4 is greater than 6'?", options: ["x/2 − 4 > 6", "x/2 + 4 > 6", "x/2 − 4 < 6", "2x − 4 > 6"], correctAnswer: 0, explanation: "Half of x = x/2; decreased by 4 = − 4; > 6." },
  { id: 7, section: "Math", question: "If 25% of x is 30, what is x?", options: ["100", "120", "125", "150"], correctAnswer: 1, explanation: "0.25x = 30 → x = 120." },
  { id: 8, section: "Math", question: "The price of a shirt was $40 and is now $32. What is the percent decrease?", options: ["10%", "15%", "20%", "25%"], correctAnswer: 2, explanation: "(8/40) × 100 = 20%." },
  { id: 9, section: "Math", question: "If f(x) = 3x − 4, what is f(2) + f(3)?", options: ["7", "9", "11", "13"], correctAnswer: 2, explanation: "f(2) = 2; f(3) = 5; sum = 7. Wait — recompute: f(2) = 3(2) − 4 = 2; f(3) = 3(3) − 4 = 5. 2 + 5 = 7. Correct answer is 7 → option index 0." },
  { id: 10, section: "Math", question: "What are the solutions to x² + 3x − 10 = 0?", options: ["x = 2 and −5", "x = −2 and 5", "x = 2 and 5", "x = −2 and −5"], correctAnswer: 0, explanation: "(x − 2)(x + 5) = 0." },
  { id: 11, section: "Math", question: "The median of {3, 7, 9, 12, 15, 21} is:", options: ["9", "10.5", "12", "13.5"], correctAnswer: 1, explanation: "Average of middle two: (9 + 12)/2 = 10.5." },
  { id: 12, section: "Math", question: "A right triangle has hypotenuse 13 and one leg 5. What is the other leg?", options: ["8", "10", "12", "14"], correctAnswer: 2, explanation: "√(169 − 25) = √144 = 12." },
  { id: 13, section: "Math", question: "Expand: (2x − 1)(x + 4)", options: ["2x² + 7x − 4", "2x² + 9x − 4", "2x² − 7x − 4", "2x² + 8x − 4"], correctAnswer: 0, explanation: "2x² + 8x − x − 4 = 2x² + 7x − 4." },
  { id: 14, section: "Math", question: "If 3^x = 81, what is x?", options: ["2", "3", "4", "5"], correctAnswer: 2, explanation: "81 = 3⁴." },
  { id: 15, section: "Math", question: "A circle has diameter 14. What is its circumference? (Use π.)", options: ["7π", "14π", "21π", "28π"], correctAnswer: 1, explanation: "C = πd = 14π." },
  { id: 16, section: "Math", question: "If y is inversely proportional to x, and y = 6 when x = 4, what is y when x = 8?", options: ["2", "3", "4", "12"], correctAnswer: 1, explanation: "k = 24; y = 24/8 = 3." },
  { id: 17, section: "Math", question: "What is the y-intercept of the line through (2, 5) with slope 3?", options: ["−1", "1", "−2", "2"], correctAnswer: 0, explanation: "y − 5 = 3(x − 2) → y = 3x − 1; y-intercept = −1." },
  { id: 18, section: "Math", question: "Solve: |x − 4| < 6", options: ["−2 < x < 10", "x < −2 or x > 10", "−10 < x < 2", "x < 10"], correctAnswer: 0, explanation: "−6 < x − 4 < 6 → −2 < x < 10." },
  { id: 19, section: "Math", question: "In a right triangle, tan(θ) = 3/4. What is sin(θ)?", options: ["3/5", "4/5", "5/3", "5/4"], correctAnswer: 0, explanation: "Triangle 3-4-5 → sin = opp/hyp = 3/5." },
  { id: 20, section: "Math", question: "A square has area 81 cm². What is its perimeter?", options: ["18 cm", "27 cm", "36 cm", "81 cm"], correctAnswer: 2, explanation: "Side = 9; perimeter = 36 cm." },
  { id: 21, section: "Math", question: "If f(x) = x + 2 and g(x) = x², what is f(g(3))?", options: ["7", "9", "11", "25"], correctAnswer: 2, explanation: "g(3) = 9; f(9) = 11." },
  { id: 22, section: "Math", question: "A jar has 5 white and 7 black marbles. If one is drawn at random, what is the probability it is white?", options: ["1/3", "5/12", "7/12", "5/7"], correctAnswer: 1, explanation: "5/(5+7) = 5/12." },
];

// Fix the bad answer index in math4 Q9 (the recomputed answer is 7, index 0).
math4Questions[8].correctAnswer = 0;

const reIndex = (qs: SatMockQuestion[], offset: number): SatMockQuestion[] =>
  qs.map((q, i) => ({ ...q, id: offset + i + 1 }));

export const satMockExamExpansion: SatMockExam[] = [
  {
    id: "sat-rw-practice-3",
    title: "SAT Reading & Writing — Module Practice 3",
    titleVi: "SAT Reading & Writing — Đề luyện 3",
    type: "rw",
    duration: 32,
    totalQuestions: 27,
    description: "Third R&W module practice with the official Digital SAT timing.",
    descriptionVi: "Đề luyện Reading & Writing thứ ba theo đúng thời gian thi thật.",
    questions: rw3Questions,
  },
  {
    id: "sat-rw-practice-4",
    title: "SAT Reading & Writing — Module Practice 4",
    titleVi: "SAT Reading & Writing — Đề luyện 4",
    type: "rw",
    duration: 32,
    totalQuestions: 27,
    description: "Fourth R&W module practice with the official Digital SAT timing.",
    descriptionVi: "Đề luyện Reading & Writing thứ tư theo đúng thời gian thi thật.",
    questions: rw4Questions,
  },
  {
    id: "sat-math-practice-3",
    title: "SAT Math — Module Practice 3",
    titleVi: "SAT Math — Đề luyện 3",
    type: "math",
    duration: 35,
    totalQuestions: 22,
    description: "Third Math module practice with official Digital SAT timing.",
    descriptionVi: "Đề luyện Math thứ ba theo đúng thời gian thi thật.",
    questions: math3Questions,
  },
  {
    id: "sat-math-practice-4",
    title: "SAT Math — Module Practice 4",
    titleVi: "SAT Math — Đề luyện 4",
    type: "math",
    duration: 35,
    totalQuestions: 22,
    description: "Fourth Math module practice with official Digital SAT timing.",
    descriptionVi: "Đề luyện Math thứ tư theo đúng thời gian thi thật.",
    questions: math4Questions,
  },
  {
    id: "sat-full-mock-2",
    title: "Full Digital SAT Mock Test #2",
    titleVi: "Đề thi thử Digital SAT đầy đủ #2",
    type: "full",
    duration: 134,
    totalQuestions: 98,
    description: "A second full-length Digital SAT: 2 R&W modules + 2 Math modules = 134 min, 98 Q.",
    descriptionVi: "Đề Digital SAT đầy đủ thứ hai: 2 module R&W + 2 module Math = 134 phút, 98 câu.",
    questions: [
      ...rw3Questions,
      ...reIndex(rw4Questions, 27),
      ...reIndex(math3Questions, 54),
      ...reIndex(math4Questions, 76),
    ],
  },
];
