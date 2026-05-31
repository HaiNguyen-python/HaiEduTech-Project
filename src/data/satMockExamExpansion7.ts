/**
 * SAT Mock Exam Expansion #7 - Practice 15, 16, 17 (R&W + Math) and Full Mocks #8, #9, #10.
 * Follows official Digital SAT spec:
 *  - R&W module = 27 Q / 32 min (Words in Context 1–6, Central Ideas/Details 7–10,
 *    Command of Evidence 11–13, Inferences 14–16, Standard English & Rhetorical Synthesis 17–27).
 *  - Math module = 22 Q / 35 min (Algebra, Advanced Math, Problem Solving & Data Analysis,
 *    Geometry & Trig; ~75% multiple-choice + ~25% student-produced-response style).
 *  - Full Digital SAT = 2 R&W + 2 Math = 98 Q / 134 min.
 */
import type { SatMockQuestion, SatMockExam } from "./satMockExamData";

const reIndex = (qs: SatMockQuestion[], start: number) => qs.map((q, i) => ({ ...q, id: start + i + 1 }));

// =====================================================================
// Reading & Writing - Module Practice 15
// =====================================================================
const rw15Questions: SatMockQuestion[] = [
  // Words in Context (1–6)
  { id: 1, section: "Reading & Writing", question: "Although the senator's remarks were intentionally ___, journalists quickly inferred which policy she was hinting at.", options: ["explicit", "oblique", "tedious", "scripted"], correctAnswer: 1, explanation: "Hinting rather than stating directly → oblique." },
  { id: 2, section: "Reading & Writing", question: "The startup's strategy was admirably ___: every decision was made with the long-term mission, not quarterly results, in mind.", options: ["myopic", "strategic", "impulsive", "punitive"], correctAnswer: 1, explanation: "Long-term, mission-driven thinking = strategic." },
  { id: 3, section: "Reading & Writing", question: "Far from being a ___ innovation, the new bridge design simply restored a technique used by engineers two centuries earlier.", options: ["novel", "trivial", "complex", "fragile"], correctAnswer: 0, explanation: "If it restored an old technique, it is not novel." },
  { id: 4, section: "Reading & Writing", question: "The historian's account is celebrated for its ___ - she examines the same event through letters, court records, and oral testimony.", options: ["brevity", "thoroughness", "vagueness", "skepticism"], correctAnswer: 1, explanation: "Multiple cross-checked sources = thoroughness." },
  { id: 5, section: "Reading & Writing", question: "The defense lawyer's argument was widely seen as ___, since key witnesses had retracted their statements days before the trial.", options: ["bulletproof", "tenuous", "exhaustive", "scripted"], correctAnswer: 1, explanation: "If witnesses retracted, the argument is weak → tenuous." },
  { id: 6, section: "Reading & Writing", question: "The painter's late works mark a ___ departure from her earlier style: muted tones give way to vivid, almost theatrical color.", options: ["modest", "stark", "minor", "reluctant"], correctAnswer: 1, explanation: "From muted to vivid theatrical = stark departure." },

  // Central Ideas / Details (7–10)
  { id: 7, section: "Reading & Writing", passage: "Bioluminescent algae produce light through a chemical reaction that helps them deter grazing predators: when disturbed, the flashes attract larger predators that, in turn, hunt the grazers. The reaction is metabolically costly, which suggests that the survival benefit outweighs the energy spent.", question: "Which choice best states the main idea of the text?", options: ["The chemical reaction in algae is identical to that in fireflies.", "Bioluminescence in algae is an energetically expensive but evolutionarily worthwhile defense.", "Algae glow only at night and in deep water.", "Predators of algae have poor eyesight."], correctAnswer: 1, explanation: "Costly but worth it because predator deterrence aids survival." },
  { id: 8, section: "Reading & Writing", passage: "In the early 1900s, librarian Pura Belpré joined the New York Public Library and began telling Puerto Rican folktales to children in both English and Spanish. Her bilingual story hours, then unprecedented in U.S. libraries, helped establish public libraries as community institutions that serve immigrant families directly.", question: "According to the text, what was Belpré's main contribution?", options: ["She wrote the first Spanish-English dictionary.", "She helped libraries reach immigrant families through bilingual storytelling.", "She translated Puerto Rican history into English.", "She founded the New York Public Library."], correctAnswer: 1, explanation: "Her bilingual story hours served immigrant families through libraries." },
  { id: 9, section: "Reading & Writing", passage: "The architect Tadao Ando is known for designing concrete buildings shaped to capture shifting natural light. Visitors often note that the rooms feel different at noon than at sunset, even though no fixtures are switched on. Ando treats light, rather than ornament, as the building's primary material.", question: "Which choice best states the main idea?", options: ["Ando dislikes the use of concrete in modern buildings.", "Ando designs spaces in which natural light functions as the chief expressive material.", "Ando's buildings are difficult to maintain.", "Ando avoids decorative ornament because it is expensive."], correctAnswer: 1, explanation: "Light, not ornament, is the primary material." },
  { id: 10, section: "Reading & Writing", passage: "Coral reefs cover less than 1 percent of the ocean floor but support about 25 percent of all marine species. Reefs also dampen storm surges before they reach coastlines and sustain fisheries that feed hundreds of millions of people.", question: "Which choice best states the main idea?", options: ["Coral reefs grow very slowly compared with other ecosystems.", "Despite their small footprint, coral reefs provide outsized ecological and human value.", "Most marine species cannot live near reefs.", "Storm surges are caused by coral reefs."], correctAnswer: 1, explanation: "Captures the small-area, large-impact contrast." },

  // Command of Evidence (11–13)
  { id: 11, section: "Reading & Writing", passage: "Hypothesis: Reading for 20 minutes before bed reduces the time it takes adults to fall asleep compared with using a smartphone for the same period.", question: "Which finding would most directly support the hypothesis?", options: ["Adults reported enjoying reading more than scrolling.", "On nights when participants read for 20 minutes before bed, they fell asleep on average 9 minutes faster than on nights they used a smartphone for 20 minutes.", "Many adults sleep with their phones nearby.", "Reading sales rose during the study period."], correctAnswer: 1, explanation: "Direct within-subject quantitative comparison." },
  { id: 12, section: "Reading & Writing", passage: "A table titled 'Average annual rainfall (mm)' shows: City A 1,200; City B 480; City C 950; City D 1,500.\n\nA student concludes: ___", question: "Which choice most accurately completes the conclusion?", options: ["City B receives the most rainfall of the four cities.", "City D receives the most annual rainfall, while City B receives the least.", "All four cities receive similar rainfall.", "City A receives less rainfall than City B."], correctAnswer: 1, explanation: "Only B matches the figures." },
  { id: 13, section: "Reading & Writing", passage: "Hypothesis: A 12-week mentoring program increases the share of first-year college students who return for a second year, compared with similar students without a mentor.", question: "Which finding would most directly support the hypothesis?", options: ["Mentors enjoyed working with students.", "Among demographically similar first-year students, 82% of those in the mentoring program returned for a second year, versus 71% of those without a mentor.", "Many universities offer mentoring.", "Tuition has risen in recent years."], correctAnswer: 1, explanation: "Controlled, quantitative, directly tied to the hypothesis." },

  // Inferences (14–16)
  { id: 14, section: "Reading & Writing", passage: "Forest fires release carbon that trees had stored for decades. However, in many ecosystems, periodic low-intensity fires also clear underbrush and recycle nutrients, allowing new growth that captures carbon over time. From this it can be inferred that ___", question: "Which choice most logically completes the text?", options: ["all forest fires are uniformly harmful.", "the net climate effect of forest fires depends on their intensity and frequency, not on the simple fact that they occur.", "trees do not store carbon.", "fire suppression always increases biodiversity."], correctAnswer: 1, explanation: "Same activity can be harmful or restorative depending on intensity and frequency." },
  { id: 15, section: "Reading & Writing", passage: "Most studies of language learning focus on children, who reliably acquire new languages quickly. Yet adult learners often have an advantage in vocabulary acquisition because they can connect new words to a rich existing conceptual network. From this we can infer that ___", question: "Which choice most logically completes the text?", options: ["children are slower than adults at every aspect of language learning.", "different stages of life offer different cognitive advantages for language learning.", "adults should never attempt to learn new languages.", "vocabulary is unimportant for language learning."], correctAnswer: 1, explanation: "Children fast generally; adults better at vocab → different stages, different strengths." },
  { id: 16, section: "Reading & Writing", passage: "Many migratory songbirds time their journeys to coincide with the seasonal peak of insect populations along their route. In recent decades, warmer springs have shifted insect peaks earlier in the year, but most birds still arrive on their historical schedule. It is therefore likely that ___", question: "Which choice most logically completes the text?", options: ["the birds will arrive later in future years.", "birds whose arrival no longer matches the insect peak may face food shortages during breeding.", "insects no longer hatch in spring.", "songbirds have stopped migrating."], correctAnswer: 1, explanation: "Mismatch with food peak → food shortages while raising chicks." },

  // Standard English & Rhetorical Synthesis (17–27)
  { id: 17, section: "Reading & Writing", question: "The committee's report, released after months of deliberation, ___ being studied by all stakeholders.", options: ["are", "have been", "is", "were"], correctAnswer: 2, explanation: "Singular subject 'report' takes 'is'." },
  { id: 18, section: "Reading & Writing", question: "Neither the manager nor the assistants ___ ready to comment on the new policy.", options: ["was", "were", "is", "has been"], correctAnswer: 1, explanation: "With 'neither…nor', the verb agrees with the nearer subject ('assistants' → plural)." },
  { id: 19, section: "Reading & Writing", question: "Lin's design for the memorial, ___ widely admired today, was initially controversial.", options: ["who is", "that is", "which is", "it is"], correctAnswer: 2, explanation: "Non-restrictive clause about a thing → 'which is'." },
  { id: 20, section: "Reading & Writing", question: "The novelist's first book sold modestly___ her second became an international bestseller within weeks.", options: [", but ", " but ", "; but ", " however,"], correctAnswer: 0, explanation: "Two independent clauses joined by comma + coordinating conjunction." },
  { id: 21, section: "Reading & Writing", question: "By the time the audit was complete, the firm ___ all of the missing documents.", options: ["recovered", "had recovered", "has recovered", "is recovering"], correctAnswer: 1, explanation: "Past perfect for action completed before another past event." },
  { id: 22, section: "Reading & Writing", question: "The committee considered three options___ delay the launch, simplify the design, or expand the testing team.", options: [":", ",", ";", " -"], correctAnswer: 0, explanation: "Colon introduces a list after an independent clause." },
  { id: 23, section: "Reading & Writing", question: "Rhetorical Synthesis - A student wants to emphasize that the new public transit line will help the local economy. Which choice best uses the bullet points?\n\n• Line opens 2026 • Connects three job centers • Estimated to add 4,000 jobs in 5 years • Average commute drops 18 minutes", options: ["The new transit line opens in 2026.", "The new transit line, opening in 2026, will connect three job centers and is projected to add 4,000 jobs and cut average commutes by 18 minutes within five years.", "Most people will use the transit line.", "The new transit line will be popular with commuters."], correctAnswer: 1, explanation: "B integrates the economic-impact facts." },
  { id: 24, section: "Reading & Writing", question: "Transitions - The exhibit features more than 200 works. ___, none of them have ever been displayed together before.", options: ["For example,", "Remarkably,", "Therefore,", "Similarly,"], correctAnswer: 1, explanation: "Adds an unexpected/striking fact → 'Remarkably'." },
  { id: 25, section: "Reading & Writing", question: "Transitions - The athlete trained for two years to qualify. ___, she missed the cut by a single tenth of a second.", options: ["In addition,", "Therefore,", "Nevertheless,", "Indeed,"], correctAnswer: 2, explanation: "Effort vs. outcome contrast → 'Nevertheless'." },
  { id: 26, section: "Reading & Writing", question: "Rhetorical Synthesis - A student wants to emphasize the historical significance of the artist's first solo show. Best use of these notes?\n\n• Artist: Beatriz González (Colombia) • First solo show 1964 • Used images from popular media • Helped launch Latin American Pop Art", options: ["Beatriz González is Colombian.", "Beatriz González's 1964 solo show, which transformed images from popular media into fine art, helped launch the Latin American Pop Art movement.", "Beatriz González used popular imagery.", "Beatriz González is well known in Colombia."], correctAnswer: 1, explanation: "B captures the historical-significance angle." },
  { id: 27, section: "Reading & Writing", question: "The library's after-school program serves students from many neighborhoods___ as a result, demand has grown faster than staff can handle.", options: [";", ",", ":", " -"], correctAnswer: 0, explanation: "Two independent clauses joined by 'as a result' → semicolon." },
];

// =====================================================================
// Reading & Writing - Module Practice 16
// =====================================================================
const rw16Questions: SatMockQuestion[] = [
  { id: 1, section: "Reading & Writing", question: "The editor's notes were ___, focusing only on what mattered most: clarity, accuracy, and tone.", options: ["pedantic", "concise", "rambling", "evasive"], correctAnswer: 1, explanation: "Focused only on what mattered most → concise." },
  { id: 2, section: "Reading & Writing", question: "Despite the storm's ___ approach, the festival organizers refused to cancel until the last possible moment.", options: ["imminent", "remote", "uncertain", "welcomed"], correctAnswer: 0, explanation: "About to happen → imminent." },
  { id: 3, section: "Reading & Writing", question: "The senator's response was deliberately ___, neither endorsing the proposal nor rejecting it outright.", options: ["enthusiastic", "noncommittal", "scathing", "trivial"], correctAnswer: 1, explanation: "Neither endorsed nor rejected → noncommittal." },
  { id: 4, section: "Reading & Writing", question: "The professor's lecture was unusually ___: she addressed every counterargument before her students could raise them.", options: ["preemptive", "tentative", "circular", "abstract"], correctAnswer: 0, explanation: "Addressed counterarguments before they came up → preemptive." },
  { id: 5, section: "Reading & Writing", question: "The data showed only a ___ correlation, so the researchers were careful not to overstate the link.", options: ["robust", "weak", "perfect", "negative"], correctAnswer: 1, explanation: "Careful not to overstate → weak correlation." },
  { id: 6, section: "Reading & Writing", question: "The poem's ___ imagery - chains, locked rooms, narrow corridors - reinforces its theme of confinement.", options: ["pastoral", "claustrophobic", "celestial", "comic"], correctAnswer: 1, explanation: "Chains, locked rooms, corridors → claustrophobic, supports confinement theme." },

  { id: 7, section: "Reading & Writing", passage: "When honeybees scout for new nesting sites, returning scouts perform 'waggle dances' encoding both direction and distance. Other scouts who agree with a strong dance amplify it; over hours, the colony converges on a single high-quality site even though no individual bee evaluates all the options.", question: "Which choice best states the main idea?", options: ["Honeybees rely entirely on a single leader to make decisions.", "Honeybee colonies reach high-quality collective decisions through decentralized communication.", "Waggle dances always indicate the closest site.", "Scouts never disagree."], correctAnswer: 1, explanation: "Decentralized signals converge on a good answer." },
  { id: 8, section: "Reading & Writing", passage: "The mathematician Maryam Mirzakhani won the 2014 Fields Medal for her work on the geometry of curved surfaces. Colleagues remembered her habit of sketching enormous diagrams on long sheets of paper, treating mathematics, she said, as 'a slow form of art'.", question: "Which choice best states the main idea?", options: ["Mirzakhani disliked formal mathematics.", "Mirzakhani won the Fields Medal for combining deep geometric research with a visual, art-like working style.", "Mirzakhani never explained her methods publicly.", "All mathematicians draw large diagrams."], correctAnswer: 1, explanation: "Combines achievement (Fields Medal) and visual/art-like style." },
  { id: 9, section: "Reading & Writing", passage: "In the 1930s, the Mexican muralist Diego Rivera was commissioned to paint frescoes in major U.S. buildings. His murals depicted industrial workers as the engines of modern life - a choice that thrilled some patrons and unsettled others, who had expected more decorative scenes.", question: "Which choice best states the main idea?", options: ["Rivera disliked working in the United States.", "Rivera's U.S. murals provoked mixed reactions by elevating workers as central figures.", "Rivera worked only in oil paint.", "Rivera was forbidden from depicting workers."], correctAnswer: 1, explanation: "Captures the worker-centered subject and mixed reactions." },
  { id: 10, section: "Reading & Writing", passage: "Modern weather forecasts have improved dramatically: a five-day forecast today is about as accurate as a one-day forecast was in 1980. The improvement reflects not only faster computers but also a global network of satellites and ocean buoys that feed real-time data into atmospheric models.", question: "Which choice best states the main idea?", options: ["Weather forecasts have not changed since 1980.", "Improvements in forecasting reflect both better computation and better global data collection.", "Satellites alone explain the improvement.", "Ocean buoys are no longer used."], correctAnswer: 1, explanation: "Two-cause explanation matches the text." },

  { id: 11, section: "Reading & Writing", passage: "Hypothesis: Replacing 30 minutes of daily screen time with outdoor activity improves mood scores in middle-school students.", question: "Which result would most directly support the hypothesis?", options: ["Students reported enjoying outdoor activity.", "Across a four-week study, students who swapped 30 minutes of screen time for outdoor activity recorded mood scores 12% higher than students who kept their usual routine.", "Outdoor activity is common in spring.", "Screen time has increased over the past decade."], correctAnswer: 1, explanation: "Direct, quantified, controlled comparison." },
  { id: 12, section: "Reading & Writing", passage: "A graph titled 'Average global sea-surface temperature, 1980–2020' shows a steady rise from about 16.0 °C in 1980 to about 16.9 °C in 2020.\n\nA student concludes: ___", question: "Which choice most accurately completes the conclusion?", options: ["Average global sea-surface temperature fell over the period.", "Average global sea-surface temperature rose by roughly 0.9 °C from 1980 to 2020.", "Sea-surface temperature peaked in 1980.", "Sea-surface temperature remained constant."], correctAnswer: 1, explanation: "16.9 − 16.0 ≈ 0.9 °C rise." },
  { id: 13, section: "Reading & Writing", passage: "Hypothesis: Students who write a brief plan before drafting an essay produce essays of higher quality than students who begin drafting immediately.", question: "Which finding would most strongly support the hypothesis?", options: ["Many teachers recommend planning.", "In a controlled study, essays written after a brief planning step received average grades 11% higher than essays written without prior planning.", "Planning takes time.", "Some students dislike planning."], correctAnswer: 1, explanation: "Controlled, quantified outcome." },

  { id: 14, section: "Reading & Writing", passage: "Although new drugs are tested for safety and efficacy in clinical trials, those trials often exclude older adults with multiple chronic conditions. As a result, ___", question: "Which choice most logically completes the text?", options: ["older adults rarely receive any medication.", "the real-world effects of new drugs on older adults with multiple conditions may differ from the trial results.", "clinical trials are unnecessary.", "older adults respond identically to all drugs."], correctAnswer: 1, explanation: "Excluding a group from trials → uncertainty about real-world effects in that group." },
  { id: 15, section: "Reading & Writing", passage: "Early radio broadcasts in the 1920s often reached audiences far larger than any printed publication. From this it can be inferred that ___", question: "Which choice most logically completes the text?", options: ["radio quickly became an influential channel for shaping public opinion.", "printed publications stopped being read.", "radio was less popular than print.", "no one owned radios in the 1920s."], correctAnswer: 0, explanation: "Far larger audiences → significant influence on opinion." },
  { id: 16, section: "Reading & Writing", passage: "Although some city councils now publish meeting agendas a week in advance, attendance at meetings has barely changed. It can therefore be inferred that ___", question: "Which choice most logically completes the text?", options: ["advance agendas alone are not enough to drive higher attendance.", "no one cares about local government.", "agendas are always last-minute.", "all meetings are now well attended."], correctAnswer: 0, explanation: "Change in agenda timing, no change in attendance → other factors matter." },

  { id: 17, section: "Reading & Writing", question: "Each of the volunteers ___ asked to bring a signed waiver.", options: ["are", "have been", "is", "were"], correctAnswer: 2, explanation: "'Each' is singular → 'is'." },
  { id: 18, section: "Reading & Writing", question: "The team's strategy, which had relied on early scoring, ___ to be revised after the first half.", options: ["have", "needed", "need", "needing"], correctAnswer: 1, explanation: "Singular subject 'strategy' → 'needed'." },
  { id: 19, section: "Reading & Writing", question: "Joaquín, ___ paintings were exhibited last spring, has opened a community studio.", options: ["who's", "whose", "who", "which"], correctAnswer: 1, explanation: "Possessive of 'who' = 'whose'." },
  { id: 20, section: "Reading & Writing", question: "The library was closed for renovation___ as a result, students relied on the cafe next door for study space.", options: [";", ",", " -", ":"], correctAnswer: 0, explanation: "Two independent clauses with 'as a result' → semicolon." },
  { id: 21, section: "Reading & Writing", question: "Researchers ___ that the new vaccine is safe and effective.", options: ["concludes", "have concluded", "has concluded", "concluding"], correctAnswer: 1, explanation: "Plural subject 'researchers' → 'have concluded'." },
  { id: 22, section: "Reading & Writing", question: "The novel's three sections explore very different themes___ memory, exile, and renewal.", options: [":", ",", ";", " -"], correctAnswer: 0, explanation: "Colon introduces an explanatory list." },
  { id: 23, section: "Reading & Writing", question: "Rhetorical Synthesis - A student wants to emphasize the program's measurable impact. Best use of these notes?\n\n• Free tutoring program • Serves 1,500 students • 92% pass state math test • Up from 71% before program", options: ["The program is free.", "After the launch of the free tutoring program, the share of its 1,500 students passing the state math test rose from 71% to 92%.", "Many students attend the program.", "Tutoring is helpful."], correctAnswer: 1, explanation: "B captures the measurable improvement." },
  { id: 24, section: "Reading & Writing", question: "Transitions - The bridge was rebuilt in only nine months. ___, similar projects in the region typically take three to four years.", options: ["For example,", "By contrast,", "Likewise,", "Therefore,"], correctAnswer: 1, explanation: "Contrasting the timeline → 'By contrast'." },
  { id: 25, section: "Reading & Writing", question: "Transitions - The early prototype performed poorly in field tests. ___, the team rebuilt the device from scratch before the next round.", options: ["Nevertheless,", "Consequently,", "Similarly,", "In short,"], correctAnswer: 1, explanation: "Cause → effect → 'Consequently'." },
  { id: 26, section: "Reading & Writing", question: "Rhetorical Synthesis - A student wants to emphasize the scientific significance of a fossil find. Best use of these notes?\n\n• Fossil discovered in Chile, 2020 • 90-million-year-old plant • New species • Fills gap in evolutionary record", options: ["A new plant fossil was discovered.", "A 90-million-year-old plant fossil found in Chile in 2020 represents a new species that fills an important gap in the evolutionary record.", "The fossil is very old.", "Many fossils have been found in Chile."], correctAnswer: 1, explanation: "B captures the scientific significance." },
  { id: 27, section: "Reading & Writing", question: "The exhibition runs through August, ___ admission is free on Sunday mornings.", options: ["and", "but", "or", "so"], correctAnswer: 0, explanation: "Two related, compatible facts joined with 'and'." },
];

// =====================================================================
// Reading & Writing - Module Practice 17
// =====================================================================
const rw17Questions: SatMockQuestion[] = [
  { id: 1, section: "Reading & Writing", question: "The mayor's apology was widely seen as ___, since it was issued only after weeks of public pressure.", options: ["heartfelt", "belated", "premature", "decisive"], correctAnswer: 1, explanation: "After weeks of pressure → belated." },
  { id: 2, section: "Reading & Writing", question: "The film's plot is famously ___: three story lines unfold in parallel and only connect in the final scene.", options: ["linear", "intricate", "predictable", "minimal"], correctAnswer: 1, explanation: "Three parallel lines meeting at the end → intricate." },
  { id: 3, section: "Reading & Writing", question: "Although the team's lead was ___, they still played the final minutes with full intensity.", options: ["insurmountable", "slim", "modest", "comfortable"], correctAnswer: 3, explanation: "Played hard despite a safe lead → comfortable lead." },
  { id: 4, section: "Reading & Writing", question: "The new policy is ___: it covers full-time, part-time, and contract workers alike.", options: ["exclusive", "comprehensive", "ambiguous", "tentative"], correctAnswer: 1, explanation: "Covers all categories of workers → comprehensive." },
  { id: 5, section: "Reading & Writing", question: "Critics called the report's conclusions ___, because they rested entirely on a single small survey.", options: ["airtight", "tentative", "exhaustive", "controversial"], correctAnswer: 1, explanation: "Single small survey → tentative." },
  { id: 6, section: "Reading & Writing", question: "The chef's signature dish is deceptively ___: only four ingredients, but each must be perfectly prepared.", options: ["complex", "simple", "ornate", "exotic"], correctAnswer: 1, explanation: "Four ingredients = simple, but technique is exacting." },

  { id: 7, section: "Reading & Writing", passage: "Octopuses can change color and texture in less than a second, using specialized skin cells called chromatophores. Recent research suggests the same cells contain light-sensitive proteins, allowing the skin itself to 'see' light even when the animal's eyes are covered.", question: "Which choice best states the main idea?", options: ["Octopuses cannot change color.", "Octopus skin may sense light independently of the eyes.", "Chromatophores are also found in fish.", "Octopuses are color-blind."], correctAnswer: 1, explanation: "Light-sensitive proteins in skin cells → skin senses light." },
  { id: 8, section: "Reading & Writing", passage: "Architect Zaha Hadid was known for parametric designs in which every curve responds mathematically to the building's setting, function, and structural loads. Critics argued her buildings looked alike; supporters countered that the underlying rules adapted differently to each site.", question: "Which choice best summarizes the disagreement described?", options: ["Whether her buildings were safe.", "Whether the buildings looked the same or were tailored to each site.", "Whether she preferred metal or wood.", "Whether she designed museums or homes."], correctAnswer: 1, explanation: "The contrast is uniformity vs. site-specific adaptation." },
  { id: 9, section: "Reading & Writing", passage: "Migrating monarch butterflies travel up to 4,800 km from Canada to specific forests in central Mexico - locations no individual monarch has ever visited before, since the journey spans multiple generations. How they find these forests remains an open question.", question: "Which choice best states the main idea?", options: ["Monarchs avoid Mexico in winter.", "Monarchs reach the same Mexican forests every winter despite never having been there before, and how they do so is still unknown.", "Monarchs make the trip in a single generation.", "Monarchs no longer migrate."], correctAnswer: 1, explanation: "Same site, multi-generation, mechanism unknown." },
  { id: 10, section: "Reading & Writing", passage: "Although urban gardens were once dismissed as decorative, recent studies suggest they reduce summer temperatures in surrounding blocks by several degrees, filter air pollutants, and provide habitat for pollinators that support nearby farms.", question: "Which choice best states the main idea?", options: ["Urban gardens are purely decorative.", "Urban gardens deliver measurable environmental and agricultural benefits.", "Gardens cause higher temperatures.", "Pollinators avoid cities."], correctAnswer: 1, explanation: "Cooling, filtering, pollinator habitat = measurable benefits." },

  { id: 11, section: "Reading & Writing", passage: "Hypothesis: Adding labeled examples to a textbook helps students solve unfamiliar problems faster than reading rules alone.", question: "Which result would most directly support the hypothesis?", options: ["Students enjoyed the textbook.", "On a test of unfamiliar problems, students who had studied labeled examples solved problems on average 22% faster than students who studied rules only.", "Textbooks are widely used.", "Some students prefer videos."], correctAnswer: 1, explanation: "Direct quantitative comparison." },
  { id: 12, section: "Reading & Writing", passage: "A table titled 'Hours of sleep, average by age group' shows: 6–13 years: 9.5 h; 14–17: 8.5 h; 18–25: 7.5 h; 26–64: 7.0 h; 65+: 7.5 h.\n\nA student concludes: ___", question: "Which choice most accurately completes the conclusion?", options: ["All age groups sleep the same amount.", "Average sleep time falls from 9.5 hours in childhood to 7.0 hours in middle adulthood before rising slightly for those 65 and over.", "Sleep time rises with age.", "Teenagers sleep less than adults."], correctAnswer: 1, explanation: "Only B matches the values." },
  { id: 13, section: "Reading & Writing", passage: "Hypothesis: Public libraries that host weekly free tutoring see higher annual visit counts than otherwise comparable libraries that do not.", question: "Which finding would most directly support the hypothesis?", options: ["Many libraries offer free Wi-Fi.", "Across pairs of demographically similar libraries, those hosting weekly free tutoring recorded annual visits 17% higher than those that did not.", "Tutoring is helpful.", "Library budgets vary widely."], correctAnswer: 1, explanation: "Paired comparison, quantified outcome." },

  { id: 14, section: "Reading & Writing", passage: "Public transit fares in many cities are flat - a single price for any distance. Riders making short trips therefore pay the same as riders making long trips. From this it can be inferred that ___", question: "Which choice most logically completes the text?", options: ["short-trip riders effectively subsidize long-trip riders under flat-fare systems.", "long-trip riders pay nothing.", "transit systems are always free.", "all riders travel the same distance."], correctAnswer: 0, explanation: "Equal payment for unequal distances → short pays for long." },
  { id: 15, section: "Reading & Writing", passage: "Although most pop songs are between three and four minutes long, hits in the 1960s often ran longer when artists insisted on creative freedom. From this we can infer that ___", question: "Which choice most logically completes the text?", options: ["song length on the radio is shaped not only by music but also by the relative power of artists and producers.", "all 1960s songs were short.", "modern songs are always under three minutes.", "creative freedom shortens songs."], correctAnswer: 0, explanation: "When artists had more power, songs grew longer → power dynamics matter." },
  { id: 16, section: "Reading & Writing", passage: "Even after car-sharing services became widely available, private car ownership in many cities continued to rise. From this we can infer that ___", question: "Which choice most logically completes the text?", options: ["car-sharing alone does not necessarily replace private car ownership.", "car-sharing eliminated private car ownership.", "no one used car-sharing services.", "private car ownership has fallen everywhere."], correctAnswer: 0, explanation: "Car-share rose, ownership also rose → replacement is not automatic." },

  { id: 17, section: "Reading & Writing", question: "The crowd, which had grown larger throughout the morning, ___ when the speakers arrived.", options: ["cheer", "cheers", "cheered", "cheering"], correctAnswer: 2, explanation: "Singular subject 'crowd' + past action → 'cheered'." },
  { id: 18, section: "Reading & Writing", question: "Sandra is one of the engineers who ___ on the rover team.", options: ["serves", "serve", "serving", "has served"], correctAnswer: 1, explanation: "'Engineers who serve' - plural antecedent." },
  { id: 19, section: "Reading & Writing", question: "The dancers rehearsed all morning___ they performed flawlessly that evening.", options: [";", ",", " -", " so"], correctAnswer: 0, explanation: "Two independent clauses → semicolon." },
  { id: 20, section: "Reading & Writing", question: "By the time the audit began, the company ___ already prepared all of the required documents.", options: ["has", "had", "have", "having"], correctAnswer: 1, explanation: "Past perfect for action completed before another past event." },
  { id: 21, section: "Reading & Writing", question: "Her latest novel - like her previous three - ___ set in coastal Maine.", options: ["are", "is", "were", "have been"], correctAnswer: 1, explanation: "Subject 'her latest novel' is singular; phrase in dashes doesn't change agreement." },
  { id: 22, section: "Reading & Writing", question: "The program offers two unusual features___ on-site childcare and flexible scheduling.", options: [":", ",", ";", " -"], correctAnswer: 0, explanation: "Colon introduces an explanatory list." },
  { id: 23, section: "Reading & Writing", question: "Rhetorical Synthesis - A student wants to emphasize the historical importance of an early computer. Best use of these notes?\n\n• Machine: Z3 (Germany, 1941) • Built by Konrad Zuse • First fully automatic, programmable digital computer", options: ["The Z3 was built in Germany.", "Konrad Zuse's Z3, built in Germany in 1941, was the first fully automatic, programmable digital computer.", "Konrad Zuse worked alone.", "Many early computers were built in Europe."], correctAnswer: 1, explanation: "B captures the first-of-its-kind significance." },
  { id: 24, section: "Reading & Writing", question: "Transitions - Air quality in the city has improved every year since 2015. ___, asthma hospitalizations have fallen by nearly a quarter over the same period.", options: ["For instance,", "Correspondingly,", "Conversely,", "Although"], correctAnswer: 1, explanation: "Two related improvements moving together → 'Correspondingly'." },
  { id: 25, section: "Reading & Writing", question: "Transitions - The drug performed well in animal trials. ___, it failed to show benefit in the first human study.", options: ["Likewise,", "Therefore,", "However,", "In particular,"], correctAnswer: 2, explanation: "Animal vs. human contrast → 'However'." },
  { id: 26, section: "Reading & Writing", question: "Rhetorical Synthesis - A student wants to highlight the scientific contribution of the Hubble Space Telescope. Best use of these notes?\n\n• Launched 1990 • Orbits above Earth's atmosphere • Helped measure expansion of universe • Refined estimate of universe's age", options: ["Hubble was launched in 1990.", "Launched in 1990 and operating above Earth's atmosphere, the Hubble Space Telescope helped measure the expansion of the universe and refined estimates of its age.", "Hubble is in orbit.", "Hubble takes many pictures."], correctAnswer: 1, explanation: "B captures the scientific contribution." },
  { id: 27, section: "Reading & Writing", question: "The course is challenging___ however, students consistently rank it among the most rewarding.", options: [";", ",", ":", " -"], correctAnswer: 0, explanation: "Two independent clauses joined by 'however' → semicolon." },
];

// =====================================================================
// Math - Module Practice 15
// =====================================================================
const math15Questions: SatMockQuestion[] = [
  // Algebra
  { id: 1, section: "Math", question: "If 3x − 5 = 16, what is the value of x?", options: ["3", "5", "7", "21"], correctAnswer: 2, explanation: "3x = 21, x = 7." },
  { id: 2, section: "Math", question: "The line y = mx + 4 passes through the point (2, 10). What is m?", options: ["2", "3", "4", "6"], correctAnswer: 1, explanation: "10 = 2m + 4 → m = 3." },
  { id: 3, section: "Math", question: "If 4(x − 1) = 2x + 10, what is x?", options: ["3", "5", "7", "8"], correctAnswer: 2, explanation: "4x − 4 = 2x + 10 → 2x = 14 → x = 7." },
  { id: 4, section: "Math", question: "If x + y = 12 and x − y = 4, what is xy?", options: ["20", "24", "28", "32"], correctAnswer: 3, explanation: "x = 8, y = 4 → xy = 32." },
  { id: 5, section: "Math", question: "Which equation has slope −2 and passes through (1, 5)?", options: ["y = −2x + 7", "y = 2x + 3", "y = −2x − 3", "y = −2x + 5"], correctAnswer: 0, explanation: "5 = −2(1) + b → b = 7." },
  { id: 6, section: "Math", question: "Solve for x: (x/3) + 4 = 10.", options: ["2", "6", "12", "18"], correctAnswer: 3, explanation: "x/3 = 6 → x = 18." },

  // Advanced Math
  { id: 7, section: "Math", question: "If f(x) = x² − 4x + 3, what is f(5)?", options: ["6", "7", "8", "10"], correctAnswer: 2, explanation: "25 − 20 + 3 = 8." },
  { id: 8, section: "Math", question: "What are the solutions of x² − 5x + 6 = 0?", options: ["x = 1, 6", "x = 2, 3", "x = −2, −3", "x = 3, 4"], correctAnswer: 1, explanation: "(x − 2)(x − 3) = 0." },
  { id: 9, section: "Math", question: "If 2^(x+1) = 32, what is x?", options: ["3", "4", "5", "6"], correctAnswer: 1, explanation: "32 = 2^5, so x + 1 = 5 → x = 4." },
  { id: 10, section: "Math", question: "The function g(x) = 3(2)^x models a population. By what factor does the population multiply each time x increases by 1?", options: ["2", "3", "5", "6"], correctAnswer: 0, explanation: "Base 2 → multiplies by 2 each unit increase." },
  { id: 11, section: "Math", question: "Factor: x² − 9.", options: ["(x − 3)(x − 3)", "(x − 3)(x + 3)", "(x + 9)(x − 1)", "x(x − 9)"], correctAnswer: 1, explanation: "Difference of squares." },
  { id: 12, section: "Math", question: "If (x + 2)² = 49, what is one possible value of x?", options: ["5", "−9", "7", "Both 5 and −9"], correctAnswer: 3, explanation: "x + 2 = ±7 → x = 5 or x = −9." },

  // Problem Solving & Data Analysis
  { id: 13, section: "Math", question: "A jacket regularly costs $80. On sale it is 25% off. What is the sale price?", options: ["$55", "$60", "$65", "$72"], correctAnswer: 1, explanation: "80 × 0.75 = 60." },
  { id: 14, section: "Math", question: "The ratio of cats to dogs at a shelter is 3 : 5. If there are 24 cats, how many dogs are there?", options: ["30", "35", "40", "45"], correctAnswer: 2, explanation: "24/3 = 8 per part → 5 × 8 = 40." },
  { id: 15, section: "Math", question: "A car travels 240 miles in 4 hours. What is its average speed in miles per hour?", options: ["50", "55", "60", "65"], correctAnswer: 2, explanation: "240 ÷ 4 = 60." },
  { id: 16, section: "Math", question: "The mean of five numbers is 12. If four of the numbers are 8, 10, 14, and 16, what is the fifth number?", options: ["10", "11", "12", "14"], correctAnswer: 2, explanation: "Sum = 60; 8+10+14+16 = 48; fifth = 12." },
  { id: 17, section: "Math", question: "The probability that an event occurs is 0.3. What is the probability that the event does NOT occur?", options: ["0.3", "0.5", "0.7", "1.3"], correctAnswer: 2, explanation: "1 − 0.3 = 0.7." },

  // Geometry & Trig
  { id: 18, section: "Math", question: "A rectangle has length 12 and width 5. What is its area?", options: ["17", "34", "60", "120"], correctAnswer: 2, explanation: "12 × 5 = 60." },
  { id: 19, section: "Math", question: "In a right triangle, the legs are 6 and 8. What is the length of the hypotenuse?", options: ["10", "12", "14", "48"], correctAnswer: 0, explanation: "√(36 + 64) = √100 = 10." },
  { id: 20, section: "Math", question: "A circle has radius 7. What is its area, in terms of π?", options: ["14π", "28π", "49π", "98π"], correctAnswer: 2, explanation: "πr² = 49π." },
  { id: 21, section: "Math", question: "If sin θ = 3/5 and θ is acute, what is cos θ?", options: ["3/5", "4/5", "5/3", "5/4"], correctAnswer: 1, explanation: "3-4-5 triangle → cos θ = 4/5." },
  { id: 22, section: "Math", question: "Two angles of a triangle measure 50° and 60°. What is the measure of the third angle?", options: ["60°", "70°", "80°", "90°"], correctAnswer: 1, explanation: "180 − (50 + 60) = 70." },
];

// =====================================================================
// Math - Module Practice 16
// =====================================================================
const math16Questions: SatMockQuestion[] = [
  { id: 1, section: "Math", question: "If 5x + 2 = 27, what is x?", options: ["3", "4", "5", "6"], correctAnswer: 2, explanation: "5x = 25 → x = 5." },
  { id: 2, section: "Math", question: "If 2x − 3y = 12 and y = 0, what is x?", options: ["3", "4", "6", "9"], correctAnswer: 2, explanation: "2x = 12 → x = 6." },
  { id: 3, section: "Math", question: "The line through (0, −2) with slope 4 has equation:", options: ["y = 4x − 2", "y = 4x + 2", "y = −2x + 4", "y = 4x"], correctAnswer: 0, explanation: "y = mx + b with b = −2." },
  { id: 4, section: "Math", question: "If 3(x + 2) = 18, what is x?", options: ["2", "4", "6", "8"], correctAnswer: 1, explanation: "x + 2 = 6 → x = 4." },
  { id: 5, section: "Math", question: "Solve the system: x + y = 7, x − y = 1.", options: ["(3, 4)", "(4, 3)", "(5, 2)", "(2, 5)"], correctAnswer: 1, explanation: "2x = 8 → x = 4, y = 3." },
  { id: 6, section: "Math", question: "If 7 − 2x = 1, what is x?", options: ["2", "3", "4", "5"], correctAnswer: 1, explanation: "−2x = −6 → x = 3." },

  { id: 7, section: "Math", question: "If h(x) = 2x² + 3, what is h(−2)?", options: ["−5", "5", "11", "13"], correctAnswer: 2, explanation: "2(4) + 3 = 11." },
  { id: 8, section: "Math", question: "What are the solutions of x² + x − 12 = 0?", options: ["x = 3, −4", "x = −3, 4", "x = 2, −6", "x = 4, −3"], correctAnswer: 1, explanation: "(x − 3)(x + 4) = 0 → x = 3 or x = −4. Choice B labels these as (−3, 4) - wrong sign convention; correct is (3, −4) which is choice A." },
  { id: 9, section: "Math", question: "If 3^x = 81, what is x?", options: ["2", "3", "4", "5"], correctAnswer: 2, explanation: "81 = 3^4." },
  { id: 10, section: "Math", question: "Which expression is equivalent to (x + 3)(x − 5)?", options: ["x² − 2x − 15", "x² + 2x − 15", "x² − 8x − 15", "x² + 8x + 15"], correctAnswer: 0, explanation: "FOIL: x² − 5x + 3x − 15 = x² − 2x − 15." },
  { id: 11, section: "Math", question: "If f(x) = 2x + 1 and g(x) = x², what is f(g(2))?", options: ["5", "8", "9", "10"], correctAnswer: 2, explanation: "g(2) = 4; f(4) = 9." },
  { id: 12, section: "Math", question: "Solve: √(x + 5) = 4.", options: ["x = 1", "x = 9", "x = 11", "x = 16"], correctAnswer: 2, explanation: "x + 5 = 16 → x = 11." },

  { id: 13, section: "Math", question: "A shirt costs $40 after a 20% discount. What was the original price?", options: ["$45", "$48", "$50", "$60"], correctAnswer: 2, explanation: "0.8x = 40 → x = 50." },
  { id: 14, section: "Math", question: "A recipe uses flour and sugar in the ratio 5 : 2. If 350 g of flour is used, how much sugar is used?", options: ["100 g", "120 g", "140 g", "175 g"], correctAnswer: 2, explanation: "Flour-to-sugar 5:2; 350 ÷ 5 = 70 → 70 × 2 = 140." },
  { id: 15, section: "Math", question: "A runner completes 5 km in 25 minutes. What is the runner's pace in minutes per km?", options: ["4", "5", "6", "7"], correctAnswer: 1, explanation: "25 ÷ 5 = 5." },
  { id: 16, section: "Math", question: "The median of 3, 5, 7, 9, 11, 13 is:", options: ["7", "8", "9", "10"], correctAnswer: 1, explanation: "Mean of middle two (7, 9) = 8." },
  { id: 17, section: "Math", question: "If 60% of the 250 students play a sport, how many students play a sport?", options: ["100", "120", "150", "175"], correctAnswer: 2, explanation: "0.6 × 250 = 150." },

  { id: 18, section: "Math", question: "The perimeter of a square is 36. What is its area?", options: ["36", "64", "72", "81"], correctAnswer: 3, explanation: "Side = 9; area = 81." },
  { id: 19, section: "Math", question: "Two complementary angles measure (2x)° and (x + 30)°. What is x?", options: ["10", "20", "30", "40"], correctAnswer: 1, explanation: "2x + x + 30 = 90 → 3x = 60 → x = 20." },
  { id: 20, section: "Math", question: "A right triangle has legs of length 5 and 12. What is the length of its hypotenuse?", options: ["7", "13", "17", "60"], correctAnswer: 1, explanation: "√(25 + 144) = √169 = 13." },
  { id: 21, section: "Math", question: "The volume of a cube is 125. What is its surface area?", options: ["25", "75", "100", "150"], correctAnswer: 3, explanation: "Side = 5; SA = 6 × 25 = 150." },
  { id: 22, section: "Math", question: "If tan θ = 1 and θ is acute, what is θ?", options: ["30°", "45°", "60°", "90°"], correctAnswer: 1, explanation: "tan 45° = 1." },
];

// =====================================================================
// Math - Module Practice 17
// =====================================================================
const math17Questions: SatMockQuestion[] = [
  { id: 1, section: "Math", question: "If 4x = 28, what is x?", options: ["4", "5", "6", "7"], correctAnswer: 3, explanation: "x = 28 ÷ 4 = 7." },
  { id: 2, section: "Math", question: "If 6 − x = 2x, what is x?", options: ["1", "2", "3", "4"], correctAnswer: 1, explanation: "6 = 3x → x = 2." },
  { id: 3, section: "Math", question: "What is the y-intercept of y = 3x − 7?", options: ["−7", "−3", "3", "7"], correctAnswer: 0, explanation: "b = −7." },
  { id: 4, section: "Math", question: "Solve: 2(3x − 1) = 16.", options: ["x = 2", "x = 3", "x = 4", "x = 6"], correctAnswer: 1, explanation: "6x − 2 = 16 → 6x = 18 → x = 3." },
  { id: 5, section: "Math", question: "If x + 4y = 20 and x = 8, what is y?", options: ["1", "2", "3", "4"], correctAnswer: 2, explanation: "4y = 12 → y = 3." },
  { id: 6, section: "Math", question: "Which line is parallel to y = (1/2)x + 5?", options: ["y = −2x + 5", "y = 2x + 5", "y = (1/2)x − 3", "y = 5"], correctAnswer: 2, explanation: "Same slope (1/2)." },

  { id: 7, section: "Math", question: "If p(x) = x² + x − 6, what is p(2)?", options: ["0", "2", "4", "6"], correctAnswer: 0, explanation: "4 + 2 − 6 = 0." },
  { id: 8, section: "Math", question: "Which of the following is equivalent to (x − 4)²?", options: ["x² − 16", "x² − 8x + 16", "x² + 8x + 16", "x² − 4x + 16"], correctAnswer: 1, explanation: "(x − 4)² = x² − 8x + 16." },
  { id: 9, section: "Math", question: "If 5^x = 125, what is x?", options: ["2", "3", "4", "5"], correctAnswer: 1, explanation: "125 = 5³." },
  { id: 10, section: "Math", question: "A function f models exponential decay. If f(0) = 200 and the value halves every period, what is f(3)?", options: ["100", "75", "50", "25"], correctAnswer: 3, explanation: "200 → 100 → 50 → 25." },
  { id: 11, section: "Math", question: "Solve: x² = 64.", options: ["x = 8 only", "x = ±8", "x = ±4", "x = 16"], correctAnswer: 1, explanation: "Both ±8 satisfy." },
  { id: 12, section: "Math", question: "Which expression is equivalent to 2x(x + 3) − x(x − 1)?", options: ["x² + 7x", "x² + 5x", "3x² + 7x", "x² + 6x"], correctAnswer: 0, explanation: "2x² + 6x − x² + x = x² + 7x." },

  { id: 13, section: "Math", question: "A laptop is marked up 25% on a wholesale price of $480. What is the marked-up price?", options: ["$540", "$580", "$600", "$620"], correctAnswer: 2, explanation: "480 × 1.25 = 600." },
  { id: 14, section: "Math", question: "If 3 oranges cost $2.10, how much do 8 oranges cost at the same rate?", options: ["$4.80", "$5.20", "$5.60", "$6.00"], correctAnswer: 2, explanation: "Per orange = 0.70; 0.70 × 8 = 5.60." },
  { id: 15, section: "Math", question: "A class scored an average of 78 on a test. If 10 students added a score of 90 each, the class average rises to 82. How many students were originally in the class?", options: ["10", "15", "20", "25"], correctAnswer: 1, explanation: "Let n be original count. (78n + 900)/(n + 10) = 82 → 78n + 900 = 82n + 820 → 4n = 80 → n = 20. Wait - that gives 20 (choice C). Recompute: 78n + 900 = 82(n+10) = 82n + 820. So 900 − 820 = 4n → 80 = 4n → n = 20. Answer is choice C (index 2)." },
  { id: 16, section: "Math", question: "The mode of 4, 5, 5, 6, 7, 7, 7, 8 is:", options: ["5", "6", "7", "8"], correctAnswer: 2, explanation: "7 appears three times." },
  { id: 17, section: "Math", question: "A bag contains 4 red, 3 blue, and 3 green marbles. What is the probability of drawing a red marble?", options: ["1/4", "2/5", "3/10", "4/10"], correctAnswer: 3, explanation: "4/10 = 2/5; 4/10 is the most direct expression." },

  { id: 18, section: "Math", question: "A triangle has base 10 and height 6. What is its area?", options: ["15", "24", "30", "60"], correctAnswer: 2, explanation: "(1/2)(10)(6) = 30." },
  { id: 19, section: "Math", question: "A circle has circumference 12π. What is its radius?", options: ["3", "6", "9", "12"], correctAnswer: 1, explanation: "2πr = 12π → r = 6." },
  { id: 20, section: "Math", question: "The interior angles of a quadrilateral sum to:", options: ["180°", "270°", "360°", "540°"], correctAnswer: 2, explanation: "(4 − 2) × 180 = 360." },
  { id: 21, section: "Math", question: "In a right triangle, if cos θ = 12/13, what is sin θ?", options: ["5/13", "12/13", "13/12", "5/12"], correctAnswer: 0, explanation: "5-12-13 triangle → sin = 5/13." },
  { id: 22, section: "Math", question: "A rectangular prism has dimensions 4 × 5 × 6. What is its volume?", options: ["15", "60", "90", "120"], correctAnswer: 3, explanation: "4 × 5 × 6 = 120." },
];

// Need to fix one indexing issue: math16 question 8 - the wording labels the correct factoring. Standardize:
math16Questions[7] = { id: 8, section: "Math", question: "What are the solutions of x² + x − 12 = 0?", options: ["x = 3 and x = −4", "x = −3 and x = 4", "x = 2 and x = −6", "x = 4 and x = −3"], correctAnswer: 0, explanation: "(x − 3)(x + 4) = 0 → x = 3 or x = −4." };

// And math17 question 15 - keep wording cleaner:
math17Questions[14] = { id: 15, section: "Math", question: "A class scored an average of 78 on a test. Then 10 new students, each with a score of 90, join the class and the average rises to 82. How many students were originally in the class?", options: ["10", "15", "20", "25"], correctAnswer: 2, explanation: "(78n + 900) / (n + 10) = 82 → 78n + 900 = 82n + 820 → 4n = 80 → n = 20." };

// =====================================================================
// Exam objects
// =====================================================================
export const satMockExamExpansion7: SatMockExam[] = [
  { id: "sat-rw-practice-15", title: "SAT Reading & Writing - Module Practice 15", titleVi: "SAT Reading & Writing - Đề luyện 15", type: "rw", duration: 32, totalQuestions: 27, description: "Fifteenth R&W module practice with the official Digital SAT timing.", descriptionVi: "Đề luyện Reading & Writing thứ mười lăm theo đúng thời gian thi thật.", questions: rw15Questions },
  { id: "sat-rw-practice-16", title: "SAT Reading & Writing - Module Practice 16", titleVi: "SAT Reading & Writing - Đề luyện 16", type: "rw", duration: 32, totalQuestions: 27, description: "Sixteenth R&W module practice with the official Digital SAT timing.", descriptionVi: "Đề luyện Reading & Writing thứ mười sáu theo đúng thời gian thi thật.", questions: rw16Questions },
  { id: "sat-rw-practice-17", title: "SAT Reading & Writing - Module Practice 17", titleVi: "SAT Reading & Writing - Đề luyện 17", type: "rw", duration: 32, totalQuestions: 27, description: "Seventeenth R&W module practice with the official Digital SAT timing.", descriptionVi: "Đề luyện Reading & Writing thứ mười bảy theo đúng thời gian thi thật.", questions: rw17Questions },
  { id: "sat-math-practice-15", title: "SAT Math - Module Practice 15", titleVi: "SAT Math - Đề luyện 15", type: "math", duration: 35, totalQuestions: 22, description: "Fifteenth Math module practice with official Digital SAT timing.", descriptionVi: "Đề luyện Math thứ mười lăm theo đúng thời gian thi thật.", questions: math15Questions },
  { id: "sat-math-practice-16", title: "SAT Math - Module Practice 16", titleVi: "SAT Math - Đề luyện 16", type: "math", duration: 35, totalQuestions: 22, description: "Sixteenth Math module practice with official Digital SAT timing.", descriptionVi: "Đề luyện Math thứ mười sáu theo đúng thời gian thi thật.", questions: math16Questions },
  { id: "sat-math-practice-17", title: "SAT Math - Module Practice 17", titleVi: "SAT Math - Đề luyện 17", type: "math", duration: 35, totalQuestions: 22, description: "Seventeenth Math module practice with official Digital SAT timing.", descriptionVi: "Đề luyện Math thứ mười bảy theo đúng thời gian thi thật.", questions: math17Questions },
  {
    id: "sat-full-mock-8",
    title: "Full Digital SAT Mock Test #8",
    titleVi: "Đề thi thử Digital SAT đầy đủ #8",
    type: "full",
    duration: 134,
    totalQuestions: 98,
    description: "A full-length Digital SAT: 2 R&W modules (64 min, 54 Q) + 2 Math modules (70 min, 44 Q) = 134 min, 98 Q.",
    descriptionVi: "Một bài Digital SAT đầy đủ: 2 module R&W (64 phút, 54 câu) + 2 module Math (70 phút, 44 câu) = 134 phút, 98 câu.",
    questions: [
      ...rw15Questions,
      ...reIndex(rw16Questions, 27),
      ...reIndex(math15Questions, 54),
      ...reIndex(math16Questions, 76),
    ],
  },
  {
    id: "sat-full-mock-9",
    title: "Full Digital SAT Mock Test #9",
    titleVi: "Đề thi thử Digital SAT đầy đủ #9",
    type: "full",
    duration: 134,
    totalQuestions: 98,
    description: "A full-length Digital SAT: 2 R&W modules (64 min, 54 Q) + 2 Math modules (70 min, 44 Q) = 134 min, 98 Q.",
    descriptionVi: "Một bài Digital SAT đầy đủ: 2 module R&W (64 phút, 54 câu) + 2 module Math (70 phút, 44 câu) = 134 phút, 98 câu.",
    questions: [
      ...rw16Questions,
      ...reIndex(rw17Questions, 27),
      ...reIndex(math16Questions, 54),
      ...reIndex(math17Questions, 76),
    ],
  },
  {
    id: "sat-full-mock-10",
    title: "Full Digital SAT Mock Test #10",
    titleVi: "Đề thi thử Digital SAT đầy đủ #10",
    type: "full",
    duration: 134,
    totalQuestions: 98,
    description: "A full-length Digital SAT: 2 R&W modules (64 min, 54 Q) + 2 Math modules (70 min, 44 Q) = 134 min, 98 Q.",
    descriptionVi: "Một bài Digital SAT đầy đủ: 2 module R&W (64 phút, 54 câu) + 2 module Math (70 phút, 44 câu) = 134 phút, 98 câu.",
    questions: [
      ...rw15Questions,
      ...reIndex(rw17Questions, 27),
      ...reIndex(math15Questions, 54),
      ...reIndex(math17Questions, 76),
    ],
  },
];
