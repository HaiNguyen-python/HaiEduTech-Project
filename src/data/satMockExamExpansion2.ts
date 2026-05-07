/**
 * SAT Mock Exam Expansion #2 — fresh R&W and Math practice modules.
 * Same Digital SAT timing as the originals.
 */
import type { SatMockQuestion, SatMockExam } from "./satMockExamData";

// ─────────────────────────────────────────────────────────────
// Reading & Writing Practice 5 — 27 questions / 32 min
// ─────────────────────────────────────────────────────────────
const rw5Questions: SatMockQuestion[] = [
  // Words in context
  { id: 1, section: "Reading & Writing", question: "Although his early novels were widely criticized as ___, his later work was praised for its quiet emotional depth.", options: ["sentimental", "austere", "experimental", "concise"], correctAnswer: 0, explanation: "Contrast with 'quiet emotional depth' suggests early work was overly emotional → sentimental." },
  { id: 2, section: "Reading & Writing", question: "The startup's growth has been ___ : revenue has roughly doubled every six months for two years.", options: ["modest", "stagnant", "explosive", "uneven"], correctAnswer: 2, explanation: "Doubling every six months = explosive growth." },
  { id: 3, section: "Reading & Writing", question: "Though many regarded the proposal as ___, the committee found that its central claims were supported by extensive data.", options: ["rigorous", "speculative", "verifiable", "exhaustive"], correctAnswer: 1, explanation: "'Though... supported by extensive data' contrasts with 'speculative'." },
  { id: 4, section: "Reading & Writing", question: "Frida Kahlo's self-portraits ___ both physical pain and political conviction, often within a single image.", options: ["conceal", "convey", "contradict", "trivialize"], correctAnswer: 1, explanation: "Her portraits are well known to express (convey) both elements." },
  { id: 5, section: "Reading & Writing", question: "After three years of drought, the lake's water level had become ___, prompting the city to ration usage.", options: ["abundant", "fluctuating", "precarious", "stable"], correctAnswer: 2, explanation: "Drought + rationing → precarious." },
  { id: 6, section: "Reading & Writing", question: "The historian's account is unusually ___, drawing on letters, oral histories, court records, and newspaper archives.", options: ["narrow", "comprehensive", "biased", "anecdotal"], correctAnswer: 1, explanation: "Drawing on many source types = comprehensive." },

  // Central ideas / details
  { id: 7, section: "Reading & Writing", passage: "The axolotl, a salamander native to lakes near Mexico City, retains many larval features into adulthood — including external gills and a fully aquatic lifestyle. This trait, called neoteny, has fascinated biologists studying how organisms can evolve by holding onto juvenile characteristics rather than gaining new adult ones.", question: "Which choice best states the main idea?", options: ["The axolotl is found only in Mexico.", "The axolotl illustrates how evolution can occur by retaining juvenile traits, a process called neoteny.", "External gills are common in adult salamanders.", "Biologists do not understand the axolotl's life cycle."], correctAnswer: 1, explanation: "The text frames the axolotl as an example of neoteny." },
  { id: 8, section: "Reading & Writing", passage: "When researchers played recordings of orchestral music to dairy cows, milk yield rose by an average of 3% during the playback period. The effect disappeared when faster, louder music was played — suggesting that tempo and volume, not music in general, drive the response.", question: "According to the text, what conclusion did the researchers draw?", options: ["All music increases milk yield.", "Specific qualities of music — tempo and volume — affect milk yield, not music in general.", "Cows prefer orchestral music to other genres.", "Loud music harms dairy cattle."], correctAnswer: 1, explanation: "The text emphasizes that the *qualities* of music drive the response." },
  { id: 9, section: "Reading & Writing", passage: "The historian Ibn Khaldun (1332–1406) argued that civilizations follow a cyclical pattern: a vigorous early phase based on social cohesion gives way, over generations, to luxury, factionalism, and decline. His framework anticipates ideas later developed by 19th- and 20th-century sociologists.", question: "Which choice best states Ibn Khaldun's central argument as described in the text?", options: ["Civilizations always last exactly the same length of time.", "Civilizations rise and fall in a cyclical pattern shaped by changes in social cohesion.", "Modern sociology was invented in the 14th century.", "Luxury alone causes the collapse of civilizations."], correctAnswer: 1, explanation: "The cyclical-cohesion framework is the central claim." },
  { id: 10, section: "Reading & Writing", passage: "Bioluminescence — the production of light by living organisms — is found in many marine species but only a handful of land species, most of them insects. Researchers attribute this disparity to the fact that light signals carry farther in water than through dense terrestrial vegetation.", question: "Which choice best summarizes the explanation given in the text for the disparity?", options: ["Marine species evolved earlier than land species.", "Light signals propagate more effectively in water than in dense terrestrial environments.", "Terrestrial insects do not need to communicate.", "Marine species are larger than land species."], correctAnswer: 1, explanation: "The text directly attributes the disparity to signal propagation." },

  // Command of evidence
  { id: 11, section: "Reading & Writing", passage: "Hypothesis: Public libraries that offer free Wi-Fi see higher visit numbers than libraries that do not.", question: "Which finding would most directly support the hypothesis?", options: ["Most library users own smartphones.", "Libraries that added free Wi-Fi saw average daily visits rise 28% compared with no change at libraries without Wi-Fi.", "Wi-Fi is increasingly expected in public spaces.", "Many library patrons prefer printed books."], correctAnswer: 1, explanation: "Only B provides a direct comparative result." },
  { id: 12, section: "Reading & Writing", passage: "A line graph titled 'Average smartphone screen time per teenager (hours/day), 2014–2024' shows a steady rise from 2.1 hours in 2014 to 5.4 hours in 2024.\n\nA student concludes: ___", question: "Which choice most accurately completes the conclusion using data from the graph?", options: ["Teenagers' average daily screen time more than doubled between 2014 and 2024.", "Teenagers spent less time on screens in 2024 than in 2014.", "Screen time will continue to rise indefinitely.", "Most teenagers use their phones for studying."], correctAnswer: 0, explanation: "5.4 vs. 2.1 = more than doubled — the only graph-supported claim." },
  { id: 13, section: "Reading & Writing", passage: "Hypothesis: Students who eat breakfast before an exam perform better than those who skip it.", question: "Which finding would most strongly support the hypothesis?", options: ["Breakfast cereals are popular among students.", "Students who ate breakfast scored, on average, 11% higher on the exam than those who did not.", "Many schools now serve free breakfast.", "Skipping breakfast is more common among older students."], correctAnswer: 1, explanation: "B is the only choice with a direct comparative score result." },

  // Inferences
  { id: 14, section: "Reading & Writing", passage: "Some species of frogs in Costa Rica use loud, complex calls to attract mates. Recent recordings show that males in noisy roadside habitats produce higher-pitched calls than those in quiet rainforest interiors. Researchers infer that ___", question: "Which choice most logically completes the text?", options: ["road noise is selecting for higher-pitched calls that carry above traffic noise.", "the frogs are migrating to quieter habitats.", "rainforest frogs are losing the ability to call.", "the frogs are unaffected by their environment."], correctAnswer: 0, explanation: "Adapting calls to noisy environments is a classic selection inference." },
  { id: 15, section: "Reading & Writing", passage: "Although the medication reduced symptoms in 70% of patients in the trial, regulators delayed approval pending additional safety data. From this we can infer that ___", question: "Which choice most logically completes the text?", options: ["the medication's efficacy alone was not enough to satisfy regulators.", "the medication is unsafe.", "regulators do not understand the science.", "the trial was poorly designed."], correctAnswer: 0, explanation: "Effective + delayed for safety = efficacy alone wasn't sufficient." },
  { id: 16, section: "Reading & Writing", passage: "Studies show that elephants can recognize themselves in mirrors — a capacity once thought unique to humans and a few great apes. This finding suggests that ___", question: "Which choice most logically completes the text?", options: ["self-recognition may have evolved independently in distantly related species.", "elephants are more intelligent than humans.", "all mammals can recognize themselves in mirrors.", "mirror self-recognition is meaningless as a test."], correctAnswer: 0, explanation: "Distantly related species sharing a trait suggests independent (convergent) evolution." },

  // Grammar / punctuation / transitions / synthesis
  { id: 17, section: "Reading & Writing", question: "Before the snowstorm hit, the supply trucks ___ already left the depot.", options: ["have", "has", "had", "having"], correctAnswer: 2, explanation: "Past perfect: action completed before another past event." },
  { id: 18, section: "Reading & Writing", question: "The festival features three local foods ___ banh mi, pho, and com tam.", options: [": ", ", ", "; ", " — "], correctAnswer: 0, explanation: "Colon introduces a list following an independent clause." },
  { id: 19, section: "Reading & Writing", question: "Each of the proposals ___ been reviewed by the committee chair.", options: ["have", "has", "are", "were"], correctAnswer: 1, explanation: "'Each' is singular → 'has been reviewed'." },
  { id: 20, section: "Reading & Writing", question: "Neither the chef nor the servers ___ aware of the change to the menu.", options: ["was", "were", "is", "has been"], correctAnswer: 1, explanation: "With 'neither/nor', verb agrees with the nearer subject ('servers' → 'were')." },
  { id: 21, section: "Reading & Writing", question: "The lecture was rescheduled ___ more students could attend.", options: ["because of", "so that", "in spite of", "as well as"], correctAnswer: 1, explanation: "'So that' expresses purpose." },
  { id: 22, section: "Reading & Writing", question: "The river had been heavily polluted for decades; ___, fish are once again common after a sustained cleanup.", options: ["nevertheless", "for instance", "consequently", "by contrast"], correctAnswer: 0, explanation: "Contrast between polluted past and now-recovered river → 'nevertheless'." },
  { id: 23, section: "Reading & Writing", question: "The script went through eleven drafts; ___, several scenes were cut entirely in the final version.", options: ["meanwhile", "in addition", "in contrast", "for example"], correctAnswer: 1, explanation: "Adds another related fact about the heavy revisions." },
  { id: 24, section: "Reading & Writing", question: "Notes on the engineer Hertha Ayrton:\n• British physicist and engineer (1854–1923)\n• First woman elected to the Institution of Electrical Engineers (1899)\n• Invented an improved electric arc lamp\n• Won the Royal Society's Hughes Medal in 1906\n\nThe student wants to introduce Ayrton to readers unfamiliar with her work. Which choice best uses the notes to accomplish this goal?", options: ["Hertha Ayrton was British.", "Hertha Ayrton (1854–1923) was a pioneering British engineer who improved the electric arc lamp and, in 1906, won the Royal Society's Hughes Medal.", "Many engineers worked on arc lamps in the 1800s.", "Hertha Ayrton joined the IEE in 1899."], correctAnswer: 1, explanation: "B introduces who, era, achievement, and recognition in one sentence." },
  { id: 25, section: "Reading & Writing", question: "Notes:\n• Number of recorded earthquakes in Region Y in 2010: ~120\n• Number in 2023: ~360\n• Expansion of monitoring network may explain part of the rise\n\nThe student wants to convey both the change and a possible explanation. Which choice best uses the notes?", options: ["Region Y had 120 earthquakes in 2010.", "Recorded earthquakes in Region Y tripled between 2010 and 2023, though improved monitoring likely accounts for some of the increase.", "Region Y is seismically active.", "Earthquake monitoring has improved worldwide."], correctAnswer: 1, explanation: "B captures the change AND the caveat from the notes." },
  { id: 26, section: "Reading & Writing", question: "Notes:\n• Astronomer Vera Rubin (1928–2016)\n• Studied rotation curves of spiral galaxies\n• Provided strong evidence for dark matter\n• National Medal of Science (1993)\n\nThe student wants to highlight Rubin's main scientific contribution. Which choice best uses the notes?", options: ["Vera Rubin was born in 1928.", "Vera Rubin's measurements of galactic rotation curves provided some of the strongest evidence for the existence of dark matter.", "Vera Rubin won the National Medal of Science in 1993.", "Vera Rubin lived from 1928 to 2016."], correctAnswer: 1, explanation: "B foregrounds her central scientific contribution." },
  { id: 27, section: "Reading & Writing", question: "The candidates spent months campaigning across the country; ___, voter turnout in the election was the lowest in two decades.", options: ["therefore", "however", "in addition", "for example"], correctAnswer: 1, explanation: "Contrast between effort and low turnout → 'however'." },
];

// ─────────────────────────────────────────────────────────────
// Reading & Writing Practice 6 — 27 questions / 32 min
// ─────────────────────────────────────────────────────────────
const rw6Questions: SatMockQuestion[] = [
  { id: 1, section: "Reading & Writing", question: "The keynote address was ___, lasting nearly two hours and revisiting the same three points repeatedly.", options: ["concise", "interminable", "lively", "controversial"], correctAnswer: 1, explanation: "Two hours + repetition → interminable." },
  { id: 2, section: "Reading & Writing", question: "The mayor's ___ apology — issued reluctantly and only after weeks of public pressure — failed to satisfy critics.", options: ["heartfelt", "grudging", "lavish", "preemptive"], correctAnswer: 1, explanation: "Reluctant + only after pressure = grudging." },
  { id: 3, section: "Reading & Writing", question: "Despite its ___ pace, the documentary holds the viewer's attention by virtue of its striking visual composition.", options: ["frenetic", "leisurely", "irregular", "formulaic"], correctAnswer: 1, explanation: "'Despite' implies contrast with engaging content → 'leisurely'." },
  { id: 4, section: "Reading & Writing", question: "The artist's later sculptures show a clear ___ of Indigenous Mexican traditions and European modernist forms.", options: ["rejection", "fusion", "imitation", "concealment"], correctAnswer: 1, explanation: "Combining two traditions = fusion." },
  { id: 5, section: "Reading & Writing", question: "The senator's voting record is ___: she has supported expansive social programs while opposing nearly every tax increase that would fund them.", options: ["consistent", "predictable", "contradictory", "exemplary"], correctAnswer: 2, explanation: "Supporting programs but opposing funding = contradictory." },
  { id: 6, section: "Reading & Writing", question: "The expedition team's success has been attributed largely to its leader's ___ planning, which anticipated nearly every conceivable hazard.", options: ["careless", "exhaustive", "informal", "delayed"], correctAnswer: 1, explanation: "'Anticipated nearly every hazard' = exhaustive." },

  { id: 7, section: "Reading & Writing", passage: "When the writer Octavio Paz published 'The Labyrinth of Solitude' in 1950, he was attempting to identify a Mexican national character through history, language, and ritual. The book provoked debate not only for its conclusions but for its method — using literary essay rather than survey data — to make sociological claims.", question: "Which choice best states the main idea?", options: ["Paz's 1950 book was famous mainly for its conclusions.", "Paz's book was notable both for what it argued about Mexican identity and for using literary essay rather than data to argue it.", "The book had little impact on later writers.", "Paz only wrote essays after 1950."], correctAnswer: 1, explanation: "Both conclusions and method are highlighted." },
  { id: 8, section: "Reading & Writing", passage: "Engineers studying the 19th-century iron bridges of the British railway network have found that bridges with rivets in groups of four lasted, on average, 30% longer than otherwise similar bridges with rivets in groups of three. The pattern held even when controlling for traffic load and climate.", question: "What conclusion does the text best support?", options: ["All 19th-century bridges were rivet-based.", "Rivet grouping appears to have a measurable, independent effect on bridge longevity.", "Climate has no effect on bridge longevity.", "Modern bridges no longer use rivets."], correctAnswer: 1, explanation: "30% longer with controls held constant → independent effect of rivet grouping." },
  { id: 9, section: "Reading & Writing", passage: "Ada Lovelace, working with Charles Babbage in the 1840s, drafted what is now considered the first computer algorithm — a sequence of operations for computing Bernoulli numbers on Babbage's never-built Analytical Engine. Her notes also speculated that such machines could one day manipulate symbols, not only numbers.", question: "Which choice best states the main idea?", options: ["Lovelace built the first computer.", "Lovelace anticipated both the first algorithm and the broader idea that machines could manipulate symbols.", "Babbage and Lovelace disliked each other.", "Bernoulli numbers were invented in the 1840s."], correctAnswer: 1, explanation: "Both algorithm + symbolic manipulation are presented." },
  { id: 10, section: "Reading & Writing", passage: "Recent surveys of seafloor sediment cores show that microplastic concentrations in the deep North Pacific have risen sharply since the 1980s. Because deep-sea sediments accumulate slowly, scientists view them as a long-term record of human pollution.", question: "Why are deep-sea sediments useful for tracking pollution, according to the text?", options: ["They are easy to retrieve.", "They accumulate slowly, providing a long-term record of pollution.", "They contain only microplastic.", "They are found only in the Pacific."], correctAnswer: 1, explanation: "The text states their value comes from slow accumulation = long record." },

  { id: 11, section: "Reading & Writing", passage: "Hypothesis: Schools that introduce mid-morning fruit breaks see fewer student visits to the nurse for stomach complaints.", question: "Which finding would most directly support the hypothesis?", options: ["Most students enjoy fruit.", "Schools that introduced fruit breaks saw nurse visits for stomach complaints fall by 22% over the following semester, while comparable schools saw no change.", "Many students skip breakfast.", "Apples are the most common fruit served."], correctAnswer: 1, explanation: "Comparative drop vs. control = direct support." },
  { id: 12, section: "Reading & Writing", passage: "A bar chart titled 'Annual passengers carried by City X metro (millions), 2018–2023' shows: 2018: 320; 2019: 360; 2020: 110; 2021: 220; 2022: 340; 2023: 420.\n\nA student concludes: ___", question: "Which choice most accurately completes the conclusion using data from the chart?", options: ["Annual ridership reached its lowest point in 2020 before recovering and exceeding the 2018 level by 2023.", "Annual ridership has fallen every year since 2018.", "Ridership has been constant from 2018 to 2023.", "The metro carried more passengers in 2020 than in any other year."], correctAnswer: 0, explanation: "2020 = 110 (lowest); 2023 = 420 > 320 (2018) — only A is supported." },
  { id: 13, section: "Reading & Writing", passage: "Hypothesis: Office workers who take a 10-minute walk after lunch report higher afternoon focus than those who do not.", question: "Which finding would most strongly support the hypothesis?", options: ["Walking is a popular form of exercise.", "Workers who walked after lunch reported, on average, 18% higher focus scores in the afternoon than a comparable non-walking group.", "Many workplaces have nearby parks.", "Some workers prefer to nap after lunch."], correctAnswer: 1, explanation: "B is the only comparative result with a control group." },

  { id: 14, section: "Reading & Writing", passage: "Although solar panel manufacturing requires considerable energy upfront, panels typically pay back this 'energy debt' in less than three years and then generate clean energy for two decades or more. From this we can infer that ___", question: "Which choice most logically completes the text?", options: ["solar panels are net-negative for energy and the climate.", "across their full lifecycle, solar panels generate far more energy than is required to make them.", "manufacturers do not consider energy costs.", "panels lose efficiency immediately."], correctAnswer: 1, explanation: "3-year payback + 20+ years of generation → strongly net-positive." },
  { id: 15, section: "Reading & Writing", passage: "Although the city has invested heavily in expanding bus routes, ridership has continued to decline. Transit researchers suggest that ___", question: "Which choice most logically completes the text?", options: ["the new routes alone may not address the underlying causes of declining ridership, such as reliability or perceived safety.", "ridership will increase if the city builds more roads.", "buses are no longer technologically feasible.", "the city's investment was not large enough to be measured."], correctAnswer: 0, explanation: "Investment without effect → causes likely lie elsewhere." },
  { id: 16, section: "Reading & Writing", passage: "Linguistic studies show that children raised in households where two languages are spoken rarely confuse the two systems by school age, even though early speech may mix them. Researchers therefore conclude that ___", question: "Which choice most logically completes the text?", options: ["bilingual children develop separate, fully functional grammars for each language by school age.", "bilingual children always prefer one language to another.", "early language mixing prevents fluency.", "bilingualism is harmful for children."], correctAnswer: 0, explanation: "Rarely confuse the two by school age → separate functional grammars." },

  { id: 17, section: "Reading & Writing", question: "By the time the bell rang, most of the students ___ already submitted their tests.", options: ["have", "has", "had", "having"], correctAnswer: 2, explanation: "Past perfect for action completed before another past event." },
  { id: 18, section: "Reading & Writing", question: "The kit comes with three accessories ___ a charger, a carrying case, and a set of replacement filters.", options: [": ", ", ", "; ", " — "], correctAnswer: 0, explanation: "Colon after an independent clause introduces a list." },
  { id: 19, section: "Reading & Writing", question: "Either the principal or the teachers ___ authorized to cancel classes during severe weather.", options: ["is", "are", "was", "has been"], correctAnswer: 1, explanation: "With 'either/or', verb agrees with the nearer subject ('teachers' → 'are')." },
  { id: 20, section: "Reading & Writing", question: "The set of vintage cameras, including a rare Leica, ___ housed in a glass cabinet.", options: ["are", "is", "have been", "were"], correctAnswer: 1, explanation: "'Set' is singular → 'is housed'." },
  { id: 21, section: "Reading & Writing", question: "The exhibition was extended by two weeks ___ more visitors could see it.", options: ["because of", "so that", "in spite of", "even though"], correctAnswer: 1, explanation: "'So that' expresses purpose." },
  { id: 22, section: "Reading & Writing", question: "The new vaccine completed three large clinical trials; ___, regulators approved it for emergency use within the year.", options: ["nevertheless", "consequently", "for instance", "by contrast"], correctAnswer: 1, explanation: "Successful trials → approval = consequence." },
  { id: 23, section: "Reading & Writing", question: "The play opened to mixed reviews; ___, ticket sales remained strong throughout the run.", options: ["therefore", "however", "in addition", "for example"], correctAnswer: 1, explanation: "Mixed reviews vs. strong sales → contrast → 'however'." },
  { id: 24, section: "Reading & Writing", question: "Notes on the chemist Mario Molina:\n• Mexican-born chemist (1943–2020)\n• Co-discovered that CFCs damage the ozone layer (1974)\n• Shared the 1995 Nobel Prize in Chemistry\n• Work helped prompt the Montreal Protocol (1987)\n\nThe student wants to highlight Molina's main scientific contribution. Which choice best uses the notes?", options: ["Mario Molina was born in Mexico in 1943.", "Mario Molina's research showed that CFCs damage the ozone layer — work that earned him a 1995 Nobel Prize and helped prompt the Montreal Protocol.", "Mario Molina won the Nobel Prize in 1995.", "The Montreal Protocol was signed in 1987."], correctAnswer: 1, explanation: "B foregrounds the contribution and its impact." },
  { id: 25, section: "Reading & Writing", question: "Notes:\n• A 2022 study tracked reading speed in 500 adults\n• Average reading speed for fiction: 260 words per minute\n• Average reading speed for technical text: 160 words per minute\n\nThe student wants to compare the two reading speeds. Which choice best uses the notes?", options: ["A 2022 study tracked reading speed.", "On average, adults in a 2022 study read fiction at 260 words per minute — about 60% faster than the 160 words per minute they averaged on technical text.", "Reading speed depends on age.", "Adults read about 260 words per minute."], correctAnswer: 1, explanation: "B compares both figures (the writer's stated goal)." },
  { id: 26, section: "Reading & Writing", question: "Notes:\n• Civil rights activist Bayard Rustin (1912–1987)\n• Chief organizer of the 1963 March on Washington\n• Promoted nonviolent resistance\n• Posthumously awarded the Presidential Medal of Freedom (2013)\n\nThe student wants to introduce Rustin to readers unfamiliar with him. Which choice best uses the notes?", options: ["Bayard Rustin was a civil rights activist.", "Bayard Rustin (1912–1987), a leading proponent of nonviolent resistance, organized the 1963 March on Washington and was posthumously awarded the Presidential Medal of Freedom.", "Bayard Rustin received the Medal of Freedom in 2013.", "Rustin organized one of the largest marches in U.S. history."], correctAnswer: 1, explanation: "B is the most informative single-sentence introduction." },
  { id: 27, section: "Reading & Writing", question: "The instructions emphasized careful measurement; ___, several students rushed through the procedure and got incorrect results.", options: ["therefore", "however", "additionally", "specifically"], correctAnswer: 1, explanation: "Instructions vs. behavior → contrast → 'however'." },
];

// ─────────────────────────────────────────────────────────────
// Math Practice 5 — 22 questions / 35 min
// ─────────────────────────────────────────────────────────────
const math5Questions: SatMockQuestion[] = [
  { id: 1, section: "Math", question: "If 6x − 8 = 22, what is x?", options: ["3", "4", "5", "6"], correctAnswer: 2, explanation: "6x = 30 → x = 5." },
  { id: 2, section: "Math", question: "Simplify: 5(2x − 3) − 4(x − 1)", options: ["6x − 11", "6x − 19", "10x − 11", "6x − 15"], correctAnswer: 0, explanation: "10x − 15 − 4x + 4 = 6x − 11." },
  { id: 3, section: "Math", question: "A line passes through (1, 4) and (3, 10). What is its slope?", options: ["2", "3", "4", "6"], correctAnswer: 1, explanation: "(10 − 4)/(3 − 1) = 6/2 = 3." },
  { id: 4, section: "Math", question: "If 4(x − 1) = 2x + 6, what is x?", options: ["3", "4", "5", "6"], correctAnswer: 2, explanation: "4x − 4 = 2x + 6 → 2x = 10 → x = 5." },
  { id: 5, section: "Math", question: "Solve: { 3x + y = 11, x − y = 1 }. What is x?", options: ["2", "3", "4", "5"], correctAnswer: 1, explanation: "Add: 4x = 12 → x = 3." },
  { id: 6, section: "Math", question: "Which inequality represents 'four less than three times a number is at least 17'?", options: ["3x − 4 ≥ 17", "3x − 4 > 17", "3x − 4 ≤ 17", "4 − 3x ≥ 17"], correctAnswer: 0, explanation: "Three times a number minus 4 = 3x − 4; 'at least 17' = ≥ 17." },
  { id: 7, section: "Math", question: "If 40% of x is 60, what is x?", options: ["100", "120", "150", "240"], correctAnswer: 2, explanation: "0.4x = 60 → x = 150." },
  { id: 8, section: "Math", question: "A jacket originally priced at $80 is on sale for 25% off. What is the sale price?", options: ["$55", "$60", "$65", "$70"], correctAnswer: 1, explanation: "80 × 0.75 = 60." },
  { id: 9, section: "Math", question: "If f(x) = x² − 2x + 1, what is f(4)?", options: ["7", "9", "11", "13"], correctAnswer: 1, explanation: "16 − 8 + 1 = 9." },
  { id: 10, section: "Math", question: "What are the solutions to x² − 4x − 12 = 0?", options: ["x = 2 and −6", "x = 6 and −2", "x = 6 and 2", "x = −6 and −2"], correctAnswer: 1, explanation: "(x − 6)(x + 2) = 0." },
  { id: 11, section: "Math", question: "The mean of 6 numbers is 15. If one number, 9, is removed, what is the new mean?", options: ["15.6", "16.2", "16.5", "17.0"], correctAnswer: 1, explanation: "Total = 90; remove 9 → 81; new mean = 81/5 = 16.2." },
  { id: 12, section: "Math", question: "A right triangle has legs of length 9 and 12. What is the hypotenuse?", options: ["13", "14", "15", "18"], correctAnswer: 2, explanation: "√(81 + 144) = √225 = 15." },
  { id: 13, section: "Math", question: "Expand: (x − 5)(x + 2)", options: ["x² − 3x − 10", "x² + 3x − 10", "x² − 7x − 10", "x² + 7x − 10"], correctAnswer: 0, explanation: "x² + 2x − 5x − 10 = x² − 3x − 10." },
  { id: 14, section: "Math", question: "If 5^x = 125, what is x?", options: ["2", "3", "4", "5"], correctAnswer: 1, explanation: "125 = 5³." },
  { id: 15, section: "Math", question: "A circle has radius 6. What is its area? (Use π.)", options: ["12π", "24π", "36π", "72π"], correctAnswer: 2, explanation: "πr² = 36π." },
  { id: 16, section: "Math", question: "If y is directly proportional to x, and y = 18 when x = 6, what is y when x = 10?", options: ["20", "24", "27", "30"], correctAnswer: 3, explanation: "k = 3; y = 3 × 10 = 30." },
  { id: 17, section: "Math", question: "What is the equation of the line through (0, 2) with slope −3?", options: ["y = −3x + 2", "y = −3x − 2", "y = 3x + 2", "y = 2x − 3"], correctAnswer: 0, explanation: "y = mx + b → y = −3x + 2." },
  { id: 18, section: "Math", question: "Solve: |3x + 1| = 10", options: ["x = 3 and −11/3", "x = 3 and 11/3", "x = −3 and 11/3", "x = −3 and −11/3"], correctAnswer: 0, explanation: "3x + 1 = 10 → x = 3; 3x + 1 = −10 → x = −11/3." },
  { id: 19, section: "Math", question: "In a right triangle, cos(θ) = 5/13. What is sin(θ)?", options: ["5/13", "12/13", "13/5", "13/12"], correctAnswer: 1, explanation: "5-12-13 triangle → sin = 12/13." },
  { id: 20, section: "Math", question: "A rectangle has length (x + 4) and width 3. Its perimeter is 26. What is x?", options: ["3", "4", "5", "6"], correctAnswer: 0, explanation: "2(x + 4) + 2(3) = 26 → 2x + 14 = 26 → x = 6. Wait — recompute: 2(x+4) + 6 = 26 → 2(x+4) = 20 → x + 4 = 10 → x = 6." },
  { id: 21, section: "Math", question: "If g(x) = 2x + 1 and h(x) = x − 4, what is g(h(5))?", options: ["1", "3", "5", "7"], correctAnswer: 1, explanation: "h(5) = 1; g(1) = 3." },
  { id: 22, section: "Math", question: "A jar has 6 red and 4 green marbles. If two are drawn without replacement, what is the probability both are green?", options: ["2/15", "1/9", "4/45", "6/45"], correctAnswer: 0, explanation: "(4/10)(3/9) = 12/90 = 2/15." },
];
// Fix Q20 answer — the math gives x = 6, which is option index 3
math5Questions[19].correctAnswer = 3;

// ─────────────────────────────────────────────────────────────
// Math Practice 6 — 22 questions / 35 min
// ─────────────────────────────────────────────────────────────
const math6Questions: SatMockQuestion[] = [
  { id: 1, section: "Math", question: "If 7x + 3 = 38, what is x?", options: ["3", "4", "5", "6"], correctAnswer: 2, explanation: "7x = 35 → x = 5." },
  { id: 2, section: "Math", question: "Simplify: 4(x + 2) − 3(2x − 1)", options: ["−2x + 11", "−2x + 5", "2x + 11", "2x + 5"], correctAnswer: 0, explanation: "4x + 8 − 6x + 3 = −2x + 11." },
  { id: 3, section: "Math", question: "A line has y-intercept 4 and slope −1. What is the x-intercept?", options: ["−4", "−1", "1", "4"], correctAnswer: 3, explanation: "y = −x + 4; set y = 0 → x = 4." },
  { id: 4, section: "Math", question: "If 2x + 7 = 4x − 5, what is x?", options: ["3", "5", "6", "7"], correctAnswer: 2, explanation: "12 = 2x → x = 6." },
  { id: 5, section: "Math", question: "Solve: { 2x − y = 4, x + y = 5 }. What is y?", options: ["1", "2", "3", "4"], correctAnswer: 1, explanation: "Add: 3x = 9 → x = 3 → y = 5 − 3 = 2." },
  { id: 6, section: "Math", question: "Which inequality represents 'twice a number plus 5 is less than 17'?", options: ["2x + 5 < 17", "2x + 5 ≤ 17", "2x + 5 > 17", "5x + 2 < 17"], correctAnswer: 0, explanation: "Twice a number plus 5 = 2x + 5; 'less than 17' = < 17." },
  { id: 7, section: "Math", question: "20% of what number is 35?", options: ["70", "140", "150", "175"], correctAnswer: 3, explanation: "0.20x = 35 → x = 175." },
  { id: 8, section: "Math", question: "A laptop's price rose from $500 to $620. What is the percent increase?", options: ["20%", "22%", "24%", "25%"], correctAnswer: 2, explanation: "120/500 = 0.24 = 24%." },
  { id: 9, section: "Math", question: "If f(x) = −x² + 5, what is f(−3)?", options: ["−4", "−1", "1", "4"], correctAnswer: 0, explanation: "−9 + 5 = −4." },
  { id: 10, section: "Math", question: "What are the solutions to 2x² − 8 = 0?", options: ["x = 2 and −2", "x = 4 and −4", "x = ±√2", "x = 0 and 4"], correctAnswer: 0, explanation: "2x² = 8 → x² = 4 → x = ±2." },
  { id: 11, section: "Math", question: "The mean of {4, 7, x, 13, 16} is 10. What is x?", options: ["8", "9", "10", "11"], correctAnswer: 2, explanation: "Sum = 50; 4+7+13+16 = 40 → x = 10." },
  { id: 12, section: "Math", question: "A right triangle has hypotenuse 17 and one leg 8. What is the other leg?", options: ["10", "12", "14", "15"], correctAnswer: 3, explanation: "√(289 − 64) = √225 = 15." },
  { id: 13, section: "Math", question: "Expand: (2x + 3)(x − 5)", options: ["2x² − 7x − 15", "2x² + 7x − 15", "2x² − 13x + 15", "2x² + 13x + 15"], correctAnswer: 0, explanation: "2x² − 10x + 3x − 15 = 2x² − 7x − 15." },
  { id: 14, section: "Math", question: "If 4^x = 64, what is x?", options: ["2", "3", "4", "6"], correctAnswer: 1, explanation: "64 = 4³." },
  { id: 15, section: "Math", question: "A circle has circumference 10π. What is its radius?", options: ["3", "5", "10", "25"], correctAnswer: 1, explanation: "C = 2πr = 10π → r = 5." },
  { id: 16, section: "Math", question: "If y is inversely proportional to x, and y = 8 when x = 3, what is y when x = 12?", options: ["1", "2", "3", "4"], correctAnswer: 1, explanation: "k = 24; y = 24/12 = 2." },
  { id: 17, section: "Math", question: "What is the slope of the line 2x + 3y = 12?", options: ["−2/3", "−3/2", "2/3", "3/2"], correctAnswer: 0, explanation: "Solve: 3y = −2x + 12 → y = (−2/3)x + 4 → slope = −2/3." },
  { id: 18, section: "Math", question: "Solve: |x + 3| ≤ 5", options: ["−8 ≤ x ≤ 2", "−5 ≤ x ≤ 5", "x ≤ −8 or x ≥ 2", "−2 ≤ x ≤ 8"], correctAnswer: 0, explanation: "−5 ≤ x + 3 ≤ 5 → −8 ≤ x ≤ 2." },
  { id: 19, section: "Math", question: "In a right triangle, sin(θ) = 7/25. What is cos(θ)?", options: ["7/25", "24/25", "25/7", "25/24"], correctAnswer: 1, explanation: "7-24-25 triangle → cos = 24/25." },
  { id: 20, section: "Math", question: "A cube has surface area 96 cm². What is the length of an edge?", options: ["3 cm", "4 cm", "5 cm", "6 cm"], correctAnswer: 1, explanation: "6s² = 96 → s² = 16 → s = 4." },
  { id: 21, section: "Math", question: "If f(x) = 3x and g(x) = x + 2, what is f(g(4))?", options: ["12", "14", "16", "18"], correctAnswer: 3, explanation: "g(4) = 6; f(6) = 18." },
  { id: 22, section: "Math", question: "A bag has 3 red, 4 blue, and 5 green marbles. If one is drawn at random, what is the probability it is NOT blue?", options: ["1/3", "1/2", "2/3", "3/4"], correctAnswer: 2, explanation: "Non-blue = 8/12 = 2/3." },
];

const reIndex = (qs: SatMockQuestion[], offset: number): SatMockQuestion[] =>
  qs.map((q, i) => ({ ...q, id: offset + i + 1 }));

export const satMockExamExpansion2: SatMockExam[] = [
  {
    id: "sat-rw-practice-5",
    title: "SAT Reading & Writing — Module Practice 5",
    titleVi: "SAT Reading & Writing — Đề luyện 5",
    type: "rw",
    duration: 32,
    totalQuestions: 27,
    description: "Fifth R&W module practice with the official Digital SAT timing.",
    descriptionVi: "Đề luyện Reading & Writing thứ năm theo đúng thời gian thi thật.",
    questions: rw5Questions,
  },
  {
    id: "sat-rw-practice-6",
    title: "SAT Reading & Writing — Module Practice 6",
    titleVi: "SAT Reading & Writing — Đề luyện 6",
    type: "rw",
    duration: 32,
    totalQuestions: 27,
    description: "Sixth R&W module practice with the official Digital SAT timing.",
    descriptionVi: "Đề luyện Reading & Writing thứ sáu theo đúng thời gian thi thật.",
    questions: rw6Questions,
  },
  {
    id: "sat-math-practice-5",
    title: "SAT Math — Module Practice 5",
    titleVi: "SAT Math — Đề luyện 5",
    type: "math",
    duration: 35,
    totalQuestions: 22,
    description: "Fifth Math module practice with official Digital SAT timing.",
    descriptionVi: "Đề luyện Math thứ năm theo đúng thời gian thi thật.",
    questions: math5Questions,
  },
  {
    id: "sat-math-practice-6",
    title: "SAT Math — Module Practice 6",
    titleVi: "SAT Math — Đề luyện 6",
    type: "math",
    duration: 35,
    totalQuestions: 22,
    description: "Sixth Math module practice with official Digital SAT timing.",
    descriptionVi: "Đề luyện Math thứ sáu theo đúng thời gian thi thật.",
    questions: math6Questions,
  },
  {
    id: "sat-full-mock-3",
    title: "Full Digital SAT Mock Test #3",
    titleVi: "Đề thi thử Digital SAT đầy đủ #3",
    type: "full",
    duration: 134,
    totalQuestions: 98,
    description: "A third full-length Digital SAT: 2 R&W modules + 2 Math modules = 134 min, 98 Q.",
    descriptionVi: "Đề Digital SAT đầy đủ thứ ba: 2 module R&W + 2 module Math = 134 phút, 98 câu.",
    questions: [
      ...rw5Questions,
      ...reIndex(rw6Questions, 27),
      ...reIndex(math5Questions, 54),
      ...reIndex(math6Questions, 76),
    ],
  },
];
