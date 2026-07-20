/**
 * @file ieltsFullReadingExamsExpansion5.ts
 * @description Wave 5 - 15 new Cambridge-style IELTS Academic Reading passages
 * (rx-cam-12 … rx-cam-26). Passages are longer (~600-750 words) to match the
 * length of authentic Cambridge IELTS papers. Each passage has 13 mixed
 * questions (matching-headings, multiple-choice, fill-blank) with an
 * explanation revealed in review mode after submission.
 * @copyright 2026 HaiEduTech
 */
import type { ReadingExam } from "./ieltsFullReadingExams";

export const IELTS_FULL_READING_EXAMS_EXPANSION5: ReadingExam[] = [
  // ============================================================
  // rx-cam-12 — The Return of the Wolf to Europe
  // ============================================================
  {
    id: "rx-cam-12",
    title: "Test 16 - The Return of the Wolf to Europe",
    level: "Medium",
    durationMinutes: 20,
    passageTitle: "The Return of the Wolf to Europe",
    passage:
`A. A century ago, the grey wolf (Canis lupus) had been almost completely eliminated from western Europe. Bounties, poison and habitat loss had reduced a species that once ranged from the Atlantic coast to the Urals to a few isolated pockets in Italy, Poland and the Iberian peninsula. In many countries schoolchildren were taught, quite matter-of-factly, that the wolf belonged only in folk tales. In the 1970s a small group of biologists began quietly documenting evidence that this picture was already changing.

B. The single most important legal turning point was the 1979 Bern Convention, which listed the wolf as a strictly protected species across most signatory states. When wolves began drifting westwards from the Balkans and Italy, they entered a landscape in which shooting them had become a criminal offence rather than a rewarded activity. At roughly the same time, rural depopulation across the Alps, Pyrenees and Carpathians meant that forest cover was expanding for the first time in centuries, and populations of red deer, roe deer and wild boar were increasing rapidly. The habitat and the prey base were, in effect, being rebuilt just as the legal protection came into force.

C. The result surprised even optimistic conservationists. By 2012 wolves had recolonised parts of Germany, having crossed from western Poland; by 2020 confirmed packs were breeding in the Netherlands, Belgium and Denmark for the first time in more than a hundred years. The most recent Europe-wide census, published in 2022, estimated a continental population of at least 21,500 animals, spread across almost every country on the mainland.

D. Livestock farmers, however, have not welcomed the return with the same enthusiasm. Attacks on unguarded sheep, goats and, in some regions, semi-free-ranging cattle have risen sharply. In France alone, compensation payments for livestock losses attributed to wolves exceeded 4 million euros in 2021. Farmers argue that traditional protection methods - electric fencing, night-time enclosures and livestock guarding dogs - are expensive to install and time-consuming to maintain, particularly on the steep alpine pastures where flocks have grazed unsupervised for generations.

E. Researchers who study large carnivores emphasise that most wolf-related livestock losses are concentrated on a small minority of farms, typically those without any form of active protection. Where guarding dogs of a suitable breed have been reintroduced, losses in the following seasons have often fallen by more than 60%. Nonetheless, farmer associations point out that the psychological cost of finding dead animals, and of adapting to a predator that had been absent for generations, is not fully captured by these statistics.

F. Ecologically, the wolf's return has produced effects that reach far beyond the animals it kills. Deer numbers have started to level off in several regions where they had been damaging young trees for decades, and there is preliminary evidence that riverside vegetation is beginning to recover along some Alpine streams as browsing pressure eases. Whether these changes will be sustained depends on how tolerant human societies remain as the population continues to expand.

G. Politically, the wolf has become a symbol far larger than the species itself. For urban voters it often represents the recovery of a wilder, more diverse Europe; for many rural communities it is a reminder of what they see as decisions taken far away and imposed without consultation. Balancing these two perceptions - scientific, and social - is now the central challenge of European large-carnivore policy.`,
    questions: [
      { number: 1, type: "matching-headings", prompt: "Choose the best heading for Paragraph A.",
        headings: [
          { label: "i", text: "A near-total disappearance" },
          { label: "ii", text: "The politics of the wolf" },
          { label: "iii", text: "Landscape recovery" },
          { label: "iv", text: "The role of guarding dogs" },
        ], answer: "i", explanation: "Paragraph A describes how the wolf had been almost completely eliminated from western Europe." },
      { number: 2, type: "matching-headings", prompt: "Choose the best heading for Paragraph B.",
        headings: [
          { label: "i", text: "A near-total disappearance" },
          { label: "ii", text: "Legal protection and returning habitat" },
          { label: "iii", text: "Compensation costs" },
          { label: "iv", text: "Rewilding rivers" },
        ], answer: "ii", explanation: "Paragraph B centres on the Bern Convention and expanding forests and prey." },
      { number: 3, type: "matching-headings", prompt: "Choose the best heading for Paragraph C.",
        headings: [
          { label: "i", text: "Fast recolonisation across the continent" },
          { label: "ii", text: "Farmer resistance grows" },
          { label: "iii", text: "Effects on vegetation" },
          { label: "iv", text: "Public perception splits" },
        ], answer: "i", explanation: "Paragraph C lists countries newly recolonised and the 2022 census figure." },
      { number: 4, type: "matching-headings", prompt: "Choose the best heading for Paragraph D.",
        headings: [
          { label: "i", text: "A symbol beyond biology" },
          { label: "ii", text: "Rising livestock losses" },
          { label: "iii", text: "Recovery of riverside plants" },
          { label: "iv", text: "The 1979 turning point" },
        ], answer: "ii", explanation: "Paragraph D details attacks on livestock and rising compensation." },
      { number: 5, type: "matching-headings", prompt: "Choose the best heading for Paragraph F.",
        headings: [
          { label: "i", text: "Ecological knock-on effects" },
          { label: "ii", text: "Legal loopholes" },
          { label: "iii", text: "Urban-rural divide" },
          { label: "iv", text: "Compensation systems" },
        ], answer: "i", explanation: "Paragraph F describes deer levelling off and riverside vegetation recovering." },
      { number: 6, type: "matching-headings", prompt: "Choose the best heading for Paragraph G.",
        headings: [
          { label: "i", text: "Ecological knock-on effects" },
          { label: "ii", text: "A symbol beyond biology" },
          { label: "iii", text: "Fast recolonisation" },
          { label: "iv", text: "Farmer protests" },
        ], answer: "ii", explanation: "Paragraph G explicitly treats the wolf as a political and cultural symbol." },
      { number: 7, type: "multiple-choice", prompt: "In which decade did biologists begin documenting evidence of recovery?",
        options: ["1950s", "1960s", "1970s", "1990s"], answer: "1970s",
        explanation: "Paragraph A states biologists began work in the 1970s." },
      { number: 8, type: "multiple-choice", prompt: "The Bern Convention was signed in:",
        options: ["1969", "1979", "1989", "1999"], answer: "1979",
        explanation: "Named directly in Paragraph B as the 1979 Bern Convention." },
      { number: 9, type: "multiple-choice", prompt: "According to the 2022 census, the European wolf population is at least:",
        options: ["12,500", "15,500", "21,500", "31,500"], answer: "21,500",
        explanation: "Paragraph C gives the figure 21,500." },
      { number: 10, type: "multiple-choice", prompt: "French livestock compensation payments in 2021 exceeded:",
        options: ["2 million euros", "4 million euros", "10 million euros", "40 million euros"], answer: "4 million euros",
        explanation: "Paragraph D quotes over 4 million euros." },
      { number: 11, type: "multiple-choice", prompt: "Where suitable guarding dogs are used, losses have often fallen by more than:",
        options: ["20%", "40%", "60%", "80%"], answer: "60%",
        explanation: "Paragraph E states more than 60%." },
      { number: 12, type: "fill-blank", prompt: "The wolf's return has begun to level off populations of _____.",
        answer: "deer", explanation: "Paragraph F: deer numbers have started to level off." },
      { number: 13, type: "fill-blank", prompt: "For urban voters the wolf often represents a wilder, more _____ Europe.",
        answer: "diverse", explanation: "Paragraph G: 'a wilder, more diverse Europe'." },
    ],
  },

  // ============================================================
  // rx-cam-13 — The Science of Sleep Debt
  // ============================================================
  {
    id: "rx-cam-13",
    title: "Test 17 - The Science of Sleep Debt",
    level: "Medium",
    durationMinutes: 20,
    passageTitle: "The Science of Sleep Debt",
    passage:
`A. For most of the twentieth century, sleep was treated by mainstream medicine as a passive interval - a pause between the periods of activity that genuinely mattered. It was widely believed that a person could sleep four or five hours a night for years without any measurable damage, provided they felt subjectively fine during the day. Only in the 1990s, when laboratories began to measure cognitive performance objectively rather than relying on how tired volunteers said they felt, did the modern picture of "sleep debt" begin to emerge.

B. In a now-famous experiment carried out at the University of Pennsylvania in 2003, healthy adults were restricted to four, six or eight hours of sleep per night for two consecutive weeks. Their reaction times, memory scores and rates of lapses of attention were tested every day. Those who slept six hours a night were, after fourteen days, performing at roughly the same level as volunteers who had gone completely without sleep for twenty-four hours. Strikingly, the six-hour group consistently rated themselves as only "a little tired". Their sense of their own performance had almost completely lost contact with the reality of it.

C. Chronic partial sleep loss appears to accumulate in a way that acute total deprivation does not. A single all-night study session, unpleasant as it feels, is corrected by one or two nights of longer sleep. Weeks of restricting sleep to five or six hours, by contrast, produces changes in glucose metabolism, blood pressure and inflammatory markers that persist for days after normal sleep resumes. Large observational studies have linked habitual short sleep to a modestly increased risk of type 2 diabetes and cardiovascular disease.

D. Adolescents present a particular puzzle. During puberty, the timing of the brain's internal clock shifts so that most teenagers do not become sleepy until around eleven o'clock at night. When they are required to be in class at eight in the morning, they are effectively asked to perform academic work during a period when their bodies are still biologically expecting sleep. Districts in the United States that have shifted secondary-school start times to 8:30 or later have reported measurable improvements in test scores, attendance and, more surprisingly, road-traffic accidents involving young drivers.

E. The workplace has been slower to change. Long night shifts, particularly in healthcare, are still routinely rostered in ways that would be illegal for airline pilots. Studies of junior doctors have consistently shown that after 24 hours awake, diagnostic accuracy and fine motor performance are comparable to those of someone at the legal drink-driving limit. Reforms have been introduced in several countries, but resistance to shorter shifts often centres on tradition and the perceived learning value of long hours rather than on any evidence about patient outcomes.

F. Genes complicate the story. A small proportion of the population - probably no more than 3% - carries variants of the DEC2 gene that appear to allow them to function well on around six hours of sleep. Most people who believe themselves to be part of this group are mistaken; when tested in a laboratory, they show the same performance deficits as anyone else who is chronically undersleeping. Genuine short-sleepers are, statistically, no more common than left-handers who are also good with their right hand.

G. Public health messages about sleep are only beginning to catch up with the science. The recommendation of seven to nine hours for adults, once dismissed as excessive, is now standard advice from national health services. Whether societies designed around long working hours, bright artificial light and constant screen use can actually deliver that recommendation remains an open question.`,
    questions: [
      { number: 1, type: "matching-headings", prompt: "Choose the best heading for Paragraph A.",
        headings: [
          { label: "i", text: "How our understanding changed" },
          { label: "ii", text: "The Pennsylvania study" },
          { label: "iii", text: "Rare genetic short-sleepers" },
          { label: "iv", text: "School start times" },
        ], answer: "i", explanation: "Paragraph A traces the historical view up to the 1990s shift." },
      { number: 2, type: "matching-headings", prompt: "Choose the best heading for Paragraph B.",
        headings: [
          { label: "i", text: "The Pennsylvania study" },
          { label: "ii", text: "The workplace lags behind" },
          { label: "iii", text: "Accumulating damage" },
          { label: "iv", text: "Genes and short sleep" },
        ], answer: "i", explanation: "Paragraph B is entirely about the 2003 UPenn experiment." },
      { number: 3, type: "matching-headings", prompt: "Choose the best heading for Paragraph C.",
        headings: [
          { label: "i", text: "The Pennsylvania study" },
          { label: "ii", text: "Chronic loss vs. one bad night" },
          { label: "iii", text: "Teenage body clocks" },
          { label: "iv", text: "Public health messages" },
        ], answer: "ii", explanation: "Paragraph C contrasts chronic partial deprivation with acute deprivation." },
      { number: 4, type: "matching-headings", prompt: "Choose the best heading for Paragraph D.",
        headings: [
          { label: "i", text: "Teenage body clocks" },
          { label: "ii", text: "Chronic vs. acute loss" },
          { label: "iii", text: "Doctors on long shifts" },
          { label: "iv", text: "Genes and sleep need" },
        ], answer: "i", explanation: "Paragraph D describes the adolescent circadian shift and school start times." },
      { number: 5, type: "matching-headings", prompt: "Choose the best heading for Paragraph E.",
        headings: [
          { label: "i", text: "Teenage body clocks" },
          { label: "ii", text: "Doctors and shift work" },
          { label: "iii", text: "The Pennsylvania study" },
          { label: "iv", text: "Public messages catch up" },
        ], answer: "ii", explanation: "Paragraph E focuses on junior doctors and long shifts." },
      { number: 6, type: "multiple-choice", prompt: "In the 2003 UPenn study, after two weeks the six-hour group performed like people who had gone without sleep for:",
        options: ["12 hours", "24 hours", "36 hours", "48 hours"], answer: "24 hours",
        explanation: "Paragraph B says roughly the same as volunteers who had gone without sleep for 24 hours." },
      { number: 7, type: "multiple-choice", prompt: "The six-hour volunteers rated themselves as:",
        options: ["Severely impaired", "Moderately tired", "A little tired", "Fully alert"], answer: "A little tired",
        explanation: "Paragraph B: they rated themselves as only 'a little tired'." },
      { number: 8, type: "multiple-choice", prompt: "After 24 hours awake, junior doctors' performance is compared to someone:",
        options: ["Slightly drowsy", "At the legal drink-driving limit", "Recently vaccinated", "With mild flu"], answer: "At the legal drink-driving limit",
        explanation: "Explicitly stated in Paragraph E." },
      { number: 9, type: "multiple-choice", prompt: "Genuine genetic short-sleepers are estimated at no more than:",
        options: ["0.3%", "3%", "13%", "30%"], answer: "3%",
        explanation: "Paragraph F: probably no more than 3%." },
      { number: 10, type: "multiple-choice", prompt: "The recommended nightly sleep for adults is now:",
        options: ["5-7 hours", "6-8 hours", "7-9 hours", "9-11 hours"], answer: "7-9 hours",
        explanation: "Paragraph G quotes seven to nine hours." },
      { number: 11, type: "fill-blank", prompt: "Chronic short sleep is linked to increased risk of type 2 _____ and cardiovascular disease.",
        answer: "diabetes", explanation: "Paragraph C names type 2 diabetes." },
      { number: 12, type: "fill-blank", prompt: "The gene variant associated with short sleep is called _____.",
        answer: "DEC2", explanation: "Paragraph F names the DEC2 gene." },
      { number: 13, type: "fill-blank", prompt: "US districts that delayed secondary-school start times saw a fall in road-traffic accidents involving young _____.",
        answer: "drivers", explanation: "Paragraph D references young drivers." },
    ],
  },

  // ============================================================
  // rx-cam-14 — The Long History of the Book
  // ============================================================
  {
    id: "rx-cam-14",
    title: "Test 18 - The Long History of the Book",
    level: "Medium",
    durationMinutes: 20,
    passageTitle: "The Long History of the Book",
    passage:
`A. The book, as an object, is far older than most readers realise. Long before the invention of the printing press, communities in Mesopotamia, Egypt and China had developed portable, durable systems for storing written knowledge. Clay tablets, papyrus scrolls, wooden strips tied together with silk cord and folded palm leaves all served the same essential function: preserving language beyond the moment of speech. The word "book" itself derives from an old northern-European term for the beech tree, whose thin bark provided one of the earliest writing surfaces in that region.

B. The single most consequential change in the physical design of the book came not with printing but with the shift from scroll to codex. A codex - sheets folded and stitched along one edge - allowed readers to open a text at any point rather than having to unroll several metres to reach a particular passage. It also made it possible to write on both sides of the page. Early Christians appear to have favoured the codex partly for practical reasons: it was cheaper, more portable and easier to consult during ceremonies. By the fifth century AD, the codex had displaced the scroll across most of the Mediterranean world.

C. For the next thousand years, the production of books remained essentially a hand craft. Monasteries in Europe, madrasas in North Africa and Buddhist temples in Korea and Japan trained scribes to copy sacred and philosophical texts. A single Bible could take a skilled scribe more than a year to complete. Books were consequently rare and, in most societies, restricted to religious or governing institutions.

D. Gutenberg's development of movable metal type around 1450 is often described as the moment "everything changed", but historians increasingly stress that the change was more gradual than the standard narrative suggests. Movable type had existed in China and Korea for centuries; Gutenberg's innovation was to combine it with an oil-based ink, a metal alloy that cast cleanly, and a press adapted from wine-making equipment. Even so, the printed book remained, for its first several decades, a product for the wealthy. Only during the sixteenth century did prices fall far enough for skilled artisans and merchants to afford small personal libraries.

E. What print made possible was standardisation. A page number in one copy of a printed textbook now referred to the same passage as the corresponding page number in every other copy. Scholars separated by hundreds of kilometres could argue about specific footnotes with confidence that they were reading the same text. This apparently minor development transformed the sciences: repeatable experiments required repeatable references.

F. The book was, however, always more than a container for knowledge. From the illuminated manuscripts of medieval Europe to the ornate bindings of the Ottoman court, books were also luxury objects, gifts and markers of status. The introduction of paperback editions in the mid-twentieth century seemed, briefly, to threaten this decorative tradition. In fact, it simply divided the market: a small premium market for beautiful, cloth-bound editions, and a very large one for cheap, disposable copies.

G. Digital reading was expected, at various points in the last thirty years, to end the printed book altogether. It did not. E-book sales grew rapidly between 2007 and 2013, then plateaued in most Western markets. Independent bookshops, having declined for decades, have reopened in significant numbers. Readers appear to make different choices for different purposes: convenience for travel, physical books for concentration. Whatever the reason, the object that began with clay and palm leaves has proven far more resilient than most technologists predicted.`,
    questions: [
      { number: 1, type: "matching-headings", prompt: "Choose the best heading for Paragraph A.",
        headings: [
          { label: "i", text: "Digital reading arrives" },
          { label: "ii", text: "Early materials and origins" },
          { label: "iii", text: "The rise of the codex" },
          { label: "iv", text: "The illuminated manuscript" },
        ], answer: "ii", explanation: "Paragraph A surveys clay, papyrus, palm leaves and the origin of the word 'book'." },
      { number: 2, type: "matching-headings", prompt: "Choose the best heading for Paragraph B.",
        headings: [
          { label: "i", text: "The rise of the codex" },
          { label: "ii", text: "Beauty and status" },
          { label: "iii", text: "Standardisation and science" },
          { label: "iv", text: "The hand-copying centuries" },
        ], answer: "i", explanation: "Paragraph B is dedicated to the scroll-to-codex shift." },
      { number: 3, type: "matching-headings", prompt: "Choose the best heading for Paragraph C.",
        headings: [
          { label: "i", text: "The hand-copying centuries" },
          { label: "ii", text: "Gutenberg re-examined" },
          { label: "iii", text: "Standardisation and science" },
          { label: "iv", text: "The digital plateau" },
        ], answer: "i", explanation: "Paragraph C covers hand-copying by scribes across many cultures." },
      { number: 4, type: "matching-headings", prompt: "Choose the best heading for Paragraph D.",
        headings: [
          { label: "i", text: "The hand-copying centuries" },
          { label: "ii", text: "Gutenberg re-examined" },
          { label: "iii", text: "Books as luxury objects" },
          { label: "iv", text: "Digital reading" },
        ], answer: "ii", explanation: "Paragraph D revisits Gutenberg and stresses the gradual nature of change." },
      { number: 5, type: "matching-headings", prompt: "Choose the best heading for Paragraph E.",
        headings: [
          { label: "i", text: "Standardisation and science" },
          { label: "ii", text: "Digital reading" },
          { label: "iii", text: "The rise of the codex" },
          { label: "iv", text: "Books as luxury objects" },
        ], answer: "i", explanation: "Paragraph E focuses on how print enabled repeatable references and science." },
      { number: 6, type: "matching-headings", prompt: "Choose the best heading for Paragraph G.",
        headings: [
          { label: "i", text: "Beauty and status" },
          { label: "ii", text: "The unexpected resilience of print" },
          { label: "iii", text: "Gutenberg re-examined" },
          { label: "iv", text: "Early materials and origins" },
        ], answer: "ii", explanation: "Paragraph G explains how print survived the digital challenge." },
      { number: 7, type: "multiple-choice", prompt: "The English word 'book' originally referred to:",
        options: ["A scroll", "A beech tree", "Palm leaves", "A wax tablet"], answer: "A beech tree",
        explanation: "Paragraph A: the word derives from a term for the beech tree." },
      { number: 8, type: "multiple-choice", prompt: "By which century had the codex displaced the scroll across the Mediterranean?",
        options: ["3rd", "5th", "7th", "10th"], answer: "5th",
        explanation: "Paragraph B: by the fifth century AD." },
      { number: 9, type: "multiple-choice", prompt: "Gutenberg's press was adapted from equipment used for:",
        options: ["Weaving", "Milling grain", "Wine-making", "Metalworking"], answer: "Wine-making",
        explanation: "Paragraph D states 'a press adapted from wine-making equipment'." },
      { number: 10, type: "multiple-choice", prompt: "In which period did printed books become affordable for merchants and artisans?",
        options: ["14th century", "15th century", "16th century", "18th century"], answer: "16th century",
        explanation: "Paragraph D: 'only during the sixteenth century did prices fall far enough'." },
      { number: 11, type: "multiple-choice", prompt: "E-book sales grew rapidly and then plateaued between:",
        options: ["1997 and 2003", "2000 and 2007", "2007 and 2013", "2013 and 2020"], answer: "2007 and 2013",
        explanation: "Paragraph G cites the 2007 to 2013 window." },
      { number: 12, type: "fill-blank", prompt: "Movable type existed in China and _____ before Gutenberg.",
        answer: "Korea", explanation: "Paragraph D mentions China and Korea." },
      { number: 13, type: "fill-blank", prompt: "Print enabled the same _____ number in every copy to refer to the same passage.",
        answer: "page", explanation: "Paragraph E: 'A page number in one copy…'." },
    ],
  },

  // ============================================================
  // rx-cam-15 — Coral Reefs and Climate Refugia
  // ============================================================
  {
    id: "rx-cam-15",
    title: "Test 19 - Coral Reefs and Climate Refugia",
    level: "Hard",
    durationMinutes: 20,
    passageTitle: "Coral Reefs and Climate Refugia",
    passage:
`A. Coral reefs occupy less than 0.1% of the ocean floor, yet support roughly a quarter of all known marine species. They form the physical basis of coastal economies from the Caribbean to the western Pacific, supplying food, tourism income and natural storm barriers. Successive assessments by the Intergovernmental Panel on Climate Change have described tropical coral reefs as one of the ecosystems most immediately at risk from warming seas.

B. The mechanism of the risk is now well understood. Reef-building corals live in a partnership with microscopic algae, which supply most of the coral's energy through photosynthesis. When water temperatures rise even one to two degrees above the local seasonal maximum for several weeks, the coral expels the algae, revealing the white skeleton beneath - the phenomenon known as bleaching. A single severe bleaching event does not necessarily kill a reef, but repeated events, particularly if separated by less than five years, leave little time for recovery.

C. Between 2014 and 2017, an event of unprecedented duration affected 75% of the world's tropical reefs. Long-term monitoring on Australia's Great Barrier Reef found that on some northern sections roughly half of shallow corals died. In parts of the western Indian Ocean, losses were higher still. Coastal fisheries which had depended on reef species for generations began to report noticeable declines in catch weight and diversity within two seasons.

D. Attention has increasingly turned to what scientists call climate refugia - locations where local conditions may allow corals to survive even as the wider ocean warms. Deep reefs that lie thirty to sixty metres below the surface are relatively insulated from short-term heat spikes. Certain narrow channels around Indonesia and the Solomon Islands, where colder deep water is regularly forced upwards, keep surface temperatures around one degree lower than the surrounding open sea. These localities are attracting intense research interest as potential seed sources for the reefs of the future.

E. Genetic differences within a single coral species are proving to be just as important as location. Colonies of the same species living in shallow, occasionally very warm lagoons appear to carry heat-tolerance traits that their offshore neighbours do not. Aquaculture projects in Hawaii and the Red Sea are attempting to cross these robust colonies with more vulnerable ones, producing larvae that might, in theory, seed damaged reefs. Whether such "assisted evolution" can operate at the vast spatial scale of a full reef system remains untested.

F. Not all responses are technological. In several regions, active reduction of local stresses - pollution, overfishing, poorly designed tourism - has been shown to improve a reef's ability to recover from bleaching. A comparative study of reefs in the Philippines found that no-take marine reserves recovered coral cover roughly twice as fast as unprotected sites after the same heatwave. Conservationists argue that whatever the ultimate fate of the global climate, well-managed reefs will still be measurably healthier than poorly managed ones.

G. The debate now is less about whether reefs can be saved in their current form and more about which reefs, in which places, and by what means. A recent modelling study suggested that even under optimistic emissions scenarios, no more than 30% of today's tropical reef area is likely to persist in a fully functional state by 2050. The scientific challenge is to identify those areas quickly enough for policy to protect them.`,
    questions: [
      { number: 1, type: "matching-headings", prompt: "Choose the best heading for Paragraph A.",
        headings: [
          { label: "i", text: "How bleaching works" },
          { label: "ii", text: "Small area, huge role" },
          { label: "iii", text: "Assisted evolution" },
          { label: "iv", text: "Local action helps" },
        ], answer: "ii", explanation: "Paragraph A stresses the disproportionate role of reefs relative to their area." },
      { number: 2, type: "matching-headings", prompt: "Choose the best heading for Paragraph B.",
        headings: [
          { label: "i", text: "How bleaching works" },
          { label: "ii", text: "The 2014-17 event" },
          { label: "iii", text: "Small area, huge role" },
          { label: "iv", text: "Marine reserves" },
        ], answer: "i", explanation: "Paragraph B explains the coral-algae partnership and bleaching mechanism." },
      { number: 3, type: "matching-headings", prompt: "Choose the best heading for Paragraph C.",
        headings: [
          { label: "i", text: "How bleaching works" },
          { label: "ii", text: "The 2014-17 global event" },
          { label: "iii", text: "Genetic tolerance" },
          { label: "iv", text: "Climate refugia" },
        ], answer: "ii", explanation: "Paragraph C describes the unprecedented 2014-2017 bleaching event." },
      { number: 4, type: "matching-headings", prompt: "Choose the best heading for Paragraph D.",
        headings: [
          { label: "i", text: "Climate refugia" },
          { label: "ii", text: "The 2014-17 event" },
          { label: "iii", text: "Local stressors" },
          { label: "iv", text: "The economics of tourism" },
        ], answer: "i", explanation: "Paragraph D defines refugia and gives Indonesian/Solomon examples." },
      { number: 5, type: "matching-headings", prompt: "Choose the best heading for Paragraph E.",
        headings: [
          { label: "i", text: "Local stressors" },
          { label: "ii", text: "Genetics and assisted evolution" },
          { label: "iii", text: "Modelling reef futures" },
          { label: "iv", text: "How bleaching works" },
        ], answer: "ii", explanation: "Paragraph E focuses on heat-tolerance genes and breeding programmes." },
      { number: 6, type: "matching-headings", prompt: "Choose the best heading for Paragraph F.",
        headings: [
          { label: "i", text: "Local action helps recovery" },
          { label: "ii", text: "Climate refugia" },
          { label: "iii", text: "Assisted evolution" },
          { label: "iv", text: "The 2014-17 event" },
        ], answer: "i", explanation: "Paragraph F describes how reducing local stressors aids recovery." },
      { number: 7, type: "multiple-choice", prompt: "Coral reefs support roughly what proportion of known marine species?",
        options: ["10%", "25%", "50%", "75%"], answer: "25%",
        explanation: "Paragraph A: 'roughly a quarter'." },
      { number: 8, type: "multiple-choice", prompt: "Bleaching begins when temperatures exceed the seasonal maximum by:",
        options: ["0.1-0.5°C", "1-2°C", "3-4°C", "5-6°C"], answer: "1-2°C",
        explanation: "Paragraph B: 'one to two degrees above the local seasonal maximum'." },
      { number: 9, type: "multiple-choice", prompt: "The 2014-17 bleaching event affected what proportion of tropical reefs?",
        options: ["25%", "50%", "75%", "95%"], answer: "75%",
        explanation: "Paragraph C: '75% of the world's tropical reefs'." },
      { number: 10, type: "multiple-choice", prompt: "Philippine no-take reserves recovered coral cover roughly how much faster than unprotected sites?",
        options: ["Slightly faster", "Twice as fast", "Five times as fast", "Ten times as fast"], answer: "Twice as fast",
        explanation: "Paragraph F: 'roughly twice as fast'." },
      { number: 11, type: "multiple-choice", prompt: "The recent modelling study projects that by 2050, in a fully functional state, no more than:",
        options: ["10% of today's reef area", "30% of today's reef area", "50% of today's reef area", "70% of today's reef area"], answer: "30% of today's reef area",
        explanation: "Paragraph G names 30% under optimistic scenarios." },
      { number: 12, type: "fill-blank", prompt: "In refugia, colder deep water is forced upwards, keeping surface temperatures around one degree _____.",
        answer: "lower", explanation: "Paragraph D: 'around one degree lower than the surrounding open sea'." },
      { number: 13, type: "fill-blank", prompt: "Reef-building corals partner with microscopic _____ that supply energy through photosynthesis.",
        answer: "algae", explanation: "Paragraph B names the algal partners." },
    ],
  },

  // ============================================================
  // rx-cam-16 — The Economics of Long-Distance Trade
  // ============================================================
  {
    id: "rx-cam-16",
    title: "Test 20 - The Economics of Long-Distance Trade",
    level: "Medium",
    durationMinutes: 20,
    passageTitle: "The Economics of Long-Distance Trade",
    passage:
`A. For most of recorded history, moving goods over long distances was an expensive and dangerous business. Overland caravans across central Asia could take a year to complete a single circuit, and losses to bandits, disease and adverse weather were routinely built into the price. Even so, silk from China, spices from the Malay archipelago, and precious stones from India regularly reached markets in the Mediterranean and northern Europe from at least the second century BC onwards. The costs were high because the products, on arrival, were extraordinary.

B. The economic logic behind these routes has been reconstructed in unusual detail thanks to a body of documentary evidence collectively known as the Cairo Geniza. This archive of medieval Jewish trading correspondence, preserved in a synagogue storeroom in the Egyptian capital, records prices, insurance arrangements and detailed shipping instructions across the Indian Ocean world between the tenth and thirteenth centuries. Historians have used the archive to show that traders were highly sensitive to variations in port fees, currency exchange rates and the risk of piracy along different segments of a voyage.

C. Long-distance trade was almost never conducted by lone merchants shipping goods on their own account. Instead, it relied on layered partnerships in which investors, shipowners and travelling agents shared both risk and profit. In the Muslim world these arrangements were formalised as the qirad; in Christian Europe the very similar commenda contract underpinned the growth of Venetian and Genoese trade. Under both systems, an investor who stayed at home would typically receive around three-quarters of the profits of a successful voyage while bearing all of the financial loss if the ship was lost.

D. The technology of the ships themselves changed only gradually until the fifteenth century, when a series of European vessels combining the square sails of the Atlantic with the triangular lateen sails of the Mediterranean produced a hull that could sail closer to the wind and store several months' supplies. These ships opened routes to the Americas and around Africa that had previously been impractical. The commercial consequences were far larger than the technological differences might suggest.

E. Silver from the Americas, in particular, entered a global monetary system in which Chinese demand set most prices. Ming-era China had adopted silver as the basis of its tax system, and rising demand pulled bullion across the Pacific through the Spanish port of Manila. Economic historians now speak of a genuinely global economy emerging in the second half of the sixteenth century, in the sense that events on one continent visibly moved prices on another for the first time in human history.

F. The industrial revolution transformed long-distance trade twice. Steamships in the second half of the nineteenth century roughly halved the cost of moving bulk goods between continents; refrigeration, introduced from around 1880, allowed meat, butter and later fruit to be shipped from Argentina, Australia and New Zealand to Europe. The result was a sharp fall in food prices in industrial cities and, less happily, a sudden collapse of small-scale European agriculture that had previously been protected by distance.

G. Modern shipping containers, standardised in the 1960s, cut the cost of moving finished goods by an order of magnitude and made possible the extended global supply chains of the last half century. Some economists argue that the container was the single most important business innovation of the twentieth century - a claim that would have seemed startling to earlier observers but that is now, essentially, mainstream.`,
    questions: [
      { number: 1, type: "matching-headings", prompt: "Choose the best heading for Paragraph A.",
        headings: [
          { label: "i", text: "The Cairo archive" },
          { label: "ii", text: "High costs, exceptional goods" },
          { label: "iii", text: "Container standardisation" },
          { label: "iv", text: "Steam and refrigeration" },
        ], answer: "ii", explanation: "Paragraph A establishes that costs were high because goods were extraordinary." },
      { number: 2, type: "matching-headings", prompt: "Choose the best heading for Paragraph B.",
        headings: [
          { label: "i", text: "The Cairo Geniza" },
          { label: "ii", text: "Partnership contracts" },
          { label: "iii", text: "Silver and China" },
          { label: "iv", text: "Steamships arrive" },
        ], answer: "i", explanation: "Paragraph B is entirely about the Cairo Geniza archive." },
      { number: 3, type: "matching-headings", prompt: "Choose the best heading for Paragraph C.",
        headings: [
          { label: "i", text: "Container standardisation" },
          { label: "ii", text: "Partnership contracts" },
          { label: "iii", text: "High costs, exceptional goods" },
          { label: "iv", text: "The Cairo archive" },
        ], answer: "ii", explanation: "Paragraph C describes qirad and commenda partnership contracts." },
      { number: 4, type: "matching-headings", prompt: "Choose the best heading for Paragraph D.",
        headings: [
          { label: "i", text: "Steamships and refrigeration" },
          { label: "ii", text: "Ship design and new routes" },
          { label: "iii", text: "Silver and China" },
          { label: "iv", text: "The rise of the container" },
        ], answer: "ii", explanation: "Paragraph D describes the hybrid ship design opening new routes." },
      { number: 5, type: "matching-headings", prompt: "Choose the best heading for Paragraph E.",
        headings: [
          { label: "i", text: "Silver and the birth of global prices" },
          { label: "ii", text: "Ship design and new routes" },
          { label: "iii", text: "Partnership contracts" },
          { label: "iv", text: "The container" },
        ], answer: "i", explanation: "Paragraph E covers American silver, Ming China and global prices." },
      { number: 6, type: "matching-headings", prompt: "Choose the best heading for Paragraph F.",
        headings: [
          { label: "i", text: "Steam and refrigeration transform trade" },
          { label: "ii", text: "Silver and China" },
          { label: "iii", text: "The Cairo archive" },
          { label: "iv", text: "Partnership contracts" },
        ], answer: "i", explanation: "Paragraph F focuses on steamships and refrigeration in the 19th century." },
      { number: 7, type: "multiple-choice", prompt: "The Cairo Geniza records span mainly which period?",
        options: ["5th-8th centuries", "10th-13th centuries", "14th-16th centuries", "17th-19th centuries"], answer: "10th-13th centuries",
        explanation: "Paragraph B: between the tenth and thirteenth centuries." },
      { number: 8, type: "multiple-choice", prompt: "Under the qirad/commenda systems, the stay-at-home investor typically received about:",
        options: ["One-quarter of profits", "Half of profits", "Three-quarters of profits", "All profits"], answer: "Three-quarters of profits",
        explanation: "Paragraph C: around three-quarters." },
      { number: 9, type: "multiple-choice", prompt: "The hybrid European ships combined Atlantic sails with the _____ sails of the Mediterranean.",
        options: ["Square", "Lateen", "Junk", "Fore-and-aft"], answer: "Lateen",
        explanation: "Paragraph D names the triangular lateen sail." },
      { number: 10, type: "multiple-choice", prompt: "Silver was routed through which Spanish port?",
        options: ["Havana", "Lima", "Manila", "Acapulco"], answer: "Manila",
        explanation: "Paragraph E identifies Manila." },
      { number: 11, type: "multiple-choice", prompt: "Refrigerated shipping was introduced from around:",
        options: ["1850", "1880", "1910", "1940"], answer: "1880",
        explanation: "Paragraph F states 'from around 1880'." },
      { number: 12, type: "fill-blank", prompt: "Standardised shipping _____ were introduced in the 1960s.",
        answer: "containers", explanation: "Paragraph G refers to shipping containers." },
      { number: 13, type: "fill-blank", prompt: "Steamships in the late 19th century roughly _____ the cost of moving bulk goods.",
        answer: "halved", explanation: "Paragraph F: 'roughly halved the cost'." },
    ],
  },

  // ============================================================
  // rx-cam-17 — Bird Migration and Magnetic Navigation
  // ============================================================
  {
    id: "rx-cam-17",
    title: "Test 21 - Bird Migration and Magnetic Navigation",
    level: "Hard",
    durationMinutes: 20,
    passageTitle: "Bird Migration and Magnetic Navigation",
    passage:
`A. Every autumn, roughly five billion birds leave the boreal forests, tundra and temperate woodlands of Europe and North America and travel south. Many will cross oceans, deserts and mountain ranges to reach wintering grounds that they, individually, have never previously visited. Some, such as the bar-tailed godwit, complete non-stop flights of more than 11,000 kilometres. How they find their way has been one of the longest-standing puzzles of animal behaviour.

B. Early hypotheses concentrated on landmarks and celestial cues. Experiments in the 1950s showed that migratory birds released under a clear night sky orientate themselves relative to the stars, particularly to patterns around the Pole Star; when the same species is held in a planetarium in which the projected sky is rotated, the birds correspondingly rotate their preferred departure direction. But star navigation cannot explain how young birds without experience can select the correct heading, nor how migrations continue under cloud.

C. From the 1960s onwards, evidence began to accumulate that birds also make use of the Earth's magnetic field. In a series of now-classic experiments, robins in cages were exposed to artificial magnetic fields whose direction differed from that of the true field. The birds reliably reorientated to match the artificial field. This suggested a magnetic compass sensitive to the direction of the field lines rather than to the polarity of the magnetic north and south. The compass appears to operate only within a narrow window of field strengths - a fact that has intriguing implications for whether such a compass could function on other planets.

D. Where exactly the magnetic sense sits in the bird's body has proved more difficult to establish. Two main candidates have been proposed. The first is a group of iron-rich cells near the upper beak, which some researchers believe act as small compass needles. The second, and now more widely favoured, is a light-sensitive protein called cryptochrome in the retina of the eye. In the presence of blue light, cryptochrome molecules can exist briefly in states whose behaviour depends on the surrounding magnetic field - the so-called radical-pair mechanism.

E. If the eye-based hypothesis is correct, birds may in some sense see the magnetic field superimposed on their normal visual world, especially in dim conditions. Behavioural experiments broadly support this picture: covering one eye of a European robin with a translucent patch disrupts its magnetic orientation, whereas covering the beak has little effect. The chemistry involved is delicate; even small oscillating radio-frequency fields, of a kind unintentionally produced in modern cities, are enough to abolish the ability entirely.

F. Long-distance travel requires more than a compass. A migrating bird also needs a map - some way of knowing where it is now relative to where it should be. Recent studies of Eurasian reed warblers suggest that they combine magnetic direction with magnetic intensity, which varies smoothly across the Earth's surface, to estimate latitude. Coupled with an internal clock, this could in principle provide a rough two-dimensional map. Experiments in which reed warblers were displaced 1,000 kilometres eastwards showed that adult birds compensated for the displacement while young birds did not, implying that the map is at least partly learned.

G. Understanding magnetic navigation matters for more than pure science. Wind turbines, power lines and, more subtly, human electromagnetic pollution may all interact with these sensory systems in ways that we are only beginning to measure. Conservation planning is starting, cautiously, to take these possibilities into account.`,
    questions: [
      { number: 1, type: "matching-headings", prompt: "Choose the best heading for Paragraph A.",
        headings: [
          { label: "i", text: "The scale of the puzzle" },
          { label: "ii", text: "The role of cryptochrome" },
          { label: "iii", text: "Compass vs. map" },
          { label: "iv", text: "Star navigation" },
        ], answer: "i", explanation: "Paragraph A sets out the scale of migration and states the puzzle." },
      { number: 2, type: "matching-headings", prompt: "Choose the best heading for Paragraph B.",
        headings: [
          { label: "i", text: "Star navigation and its limits" },
          { label: "ii", text: "The map problem" },
          { label: "iii", text: "The scale of the puzzle" },
          { label: "iv", text: "Conservation implications" },
        ], answer: "i", explanation: "Paragraph B focuses on star cues and their limitations." },
      { number: 3, type: "matching-headings", prompt: "Choose the best heading for Paragraph C.",
        headings: [
          { label: "i", text: "Beak vs. eye" },
          { label: "ii", text: "Magnetic compass discovered" },
          { label: "iii", text: "Star navigation" },
          { label: "iv", text: "Conservation implications" },
        ], answer: "ii", explanation: "Paragraph C describes the discovery of an inclination-based magnetic compass." },
      { number: 4, type: "matching-headings", prompt: "Choose the best heading for Paragraph D.",
        headings: [
          { label: "i", text: "Beak vs. eye - where the sense lives" },
          { label: "ii", text: "Magnetic compass discovered" },
          { label: "iii", text: "The map problem" },
          { label: "iv", text: "Human interference" },
        ], answer: "i", explanation: "Paragraph D compares the beak and the retinal cryptochrome hypotheses." },
      { number: 5, type: "matching-headings", prompt: "Choose the best heading for Paragraph F.",
        headings: [
          { label: "i", text: "The map problem" },
          { label: "ii", text: "Star navigation" },
          { label: "iii", text: "Beak vs. eye" },
          { label: "iv", text: "The scale of the puzzle" },
        ], answer: "i", explanation: "Paragraph F is about combining compass with map information." },
      { number: 6, type: "matching-headings", prompt: "Choose the best heading for Paragraph G.",
        headings: [
          { label: "i", text: "Beak vs. eye" },
          { label: "ii", text: "Conservation implications" },
          { label: "iii", text: "Star navigation" },
          { label: "iv", text: "The map problem" },
        ], answer: "ii", explanation: "Paragraph G notes turbines, power lines and pollution for conservation." },
      { number: 7, type: "multiple-choice", prompt: "Approximately how many birds leave northern regions each autumn?",
        options: ["500 million", "1 billion", "5 billion", "50 billion"], answer: "5 billion",
        explanation: "Paragraph A: 'roughly five billion birds'." },
      { number: 8, type: "multiple-choice", prompt: "Star-navigation experiments used a rotated:",
        options: ["Compass needle", "Planetarium sky", "Wind pattern", "Light source"], answer: "Planetarium sky",
        explanation: "Paragraph B references the rotated planetarium." },
      { number: 9, type: "multiple-choice", prompt: "The magnetic compass appears sensitive to:",
        options: ["Field polarity", "Field direction (inclination)", "Field colour", "Field temperature"], answer: "Field direction (inclination)",
        explanation: "Paragraph C: sensitive to direction, not polarity." },
      { number: 10, type: "multiple-choice", prompt: "The favoured location of the magnetic sensor is now:",
        options: ["The beak", "The wings", "The retina", "The heart"], answer: "The retina",
        explanation: "Paragraph D: cryptochrome in the retina." },
      { number: 11, type: "multiple-choice", prompt: "Reed warblers displaced 1,000 km east: which birds compensated?",
        options: ["Only young ones", "Only adults", "All of them", "None"], answer: "Only adults",
        explanation: "Paragraph F: adults compensated, young did not." },
      { number: 12, type: "fill-blank", prompt: "Covering a European robin's _____ with a translucent patch disrupts magnetic orientation.",
        answer: "eye", explanation: "Paragraph E describes covering one eye." },
      { number: 13, type: "fill-blank", prompt: "Cryptochrome operates in the presence of _____ light.",
        answer: "blue", explanation: "Paragraph D: 'in the presence of blue light'." },
    ],
  },

  // ============================================================
  // rx-cam-18 — The Green Roof Movement
  // ============================================================
  {
    id: "rx-cam-18",
    title: "Test 22 - The Green Roof Movement",
    level: "Medium",
    durationMinutes: 20,
    passageTitle: "The Green Roof Movement",
    passage:
`A. The idea of covering a building's roof with vegetation is very old. Turf roofs kept homes warm in medieval Scandinavia; the Hanging Gardens of Babylon, though probably as much legend as history, describe terraces planted with fruit trees. What is genuinely new is the systematic use of green roofs in twenty-first-century cities as an instrument of environmental policy. In Germany alone, roughly nine million square metres of new green roof are installed each year, most of it required or incentivised by municipal regulation.

B. The strongest argument in favour of green roofs is thermal. A conventional dark roof in a temperate summer can reach surface temperatures above 70°C, radiating heat into the space beneath and into the surrounding air. A green roof of comparable size, in the same conditions, typically peaks below 30°C. Buildings with green roofs consequently use less energy for cooling in summer, and a small amount less for heating in winter. At the neighbourhood scale, widespread green roofing has been shown to reduce peak air temperatures during heatwaves by up to 2°C, a difference significant enough to affect hospital admissions among elderly residents.

C. Green roofs also change the way that cities handle rainfall. In a dense district with sealed surfaces, a heavy rainstorm sends a large pulse of water into the drainage system almost immediately. A well-designed green roof retains, on average, around 50-60% of moderate rainfall, releasing it slowly through evaporation and plant transpiration. The engineering benefit is a reduction in the peak flow to sewers, which can prevent the localised flooding that increasingly affects older urban systems in a changing climate.

D. Not every green roof is equally effective. So-called extensive roofs, with only a thin layer of soil and hardy sedum species, are relatively cheap and can be added to many existing buildings. Intensive roofs, with deeper soils supporting shrubs and even small trees, provide much greater ecological and aesthetic value but require significant structural reinforcement. A large proportion of installed green roofs are extensive - a compromise driven by cost.

E. Biodiversity effects are often overstated in marketing material. Extensive green roofs planted only with sedum offer limited habitat variety, and species colonising them are typically a familiar set of generalists. Multi-species green roofs that include grasses, small perennials and areas of gravel, however, have been shown in Swiss and Austrian surveys to support significant numbers of ground-nesting bees, spiders and, in some cases, endangered ground beetles. Design details matter more than the presence or absence of vegetation.

F. Cost remains the principal obstacle. In the absence of regulation, the initial expense of installing a green roof is roughly 40-60% higher than that of a conventional flat roof of the same size. Studies in Chicago, Toronto and Singapore have shown that over a lifespan of forty years, the difference is more than recovered through longer roof life, reduced energy costs and lower stormwater fees - but private developers do not always plan on that horizon. Some cities have addressed this gap with direct subsidies; others, notably Toronto, have simply made green roofs mandatory on new commercial buildings above a certain size.

G. Whether green roofs alone can transform a city's ecology is doubtful. Whether they can be part of an approach that includes street trees, permeable paving and connected green corridors is now widely accepted. The debate has largely moved from "should we?" to "how, where, and paid for by whom?".`,
    questions: [
      { number: 1, type: "matching-headings", prompt: "Choose the best heading for Paragraph A.",
        headings: [
          { label: "i", text: "An old idea, a new policy" },
          { label: "ii", text: "Thermal benefits" },
          { label: "iii", text: "Biodiversity in detail" },
          { label: "iv", text: "Cost obstacles" },
        ], answer: "i", explanation: "Paragraph A situates green roofs historically and as modern policy." },
      { number: 2, type: "matching-headings", prompt: "Choose the best heading for Paragraph B.",
        headings: [
          { label: "i", text: "Cooling and heatwaves" },
          { label: "ii", text: "An old idea, a new policy" },
          { label: "iii", text: "Rain management" },
          { label: "iv", text: "Extensive vs. intensive roofs" },
        ], answer: "i", explanation: "Paragraph B focuses on temperature reduction and heatwave effects." },
      { number: 3, type: "matching-headings", prompt: "Choose the best heading for Paragraph C.",
        headings: [
          { label: "i", text: "Rain management" },
          { label: "ii", text: "Cooling and heatwaves" },
          { label: "iii", text: "Extensive vs. intensive roofs" },
          { label: "iv", text: "Design details for wildlife" },
        ], answer: "i", explanation: "Paragraph C explains rainfall retention and sewer benefits." },
      { number: 4, type: "matching-headings", prompt: "Choose the best heading for Paragraph D.",
        headings: [
          { label: "i", text: "Rain management" },
          { label: "ii", text: "Extensive vs. intensive designs" },
          { label: "iii", text: "Design details for wildlife" },
          { label: "iv", text: "Cost obstacles" },
        ], answer: "ii", explanation: "Paragraph D compares extensive and intensive roof types." },
      { number: 5, type: "matching-headings", prompt: "Choose the best heading for Paragraph E.",
        headings: [
          { label: "i", text: "Design details for wildlife" },
          { label: "ii", text: "Cost obstacles" },
          { label: "iii", text: "Rain management" },
          { label: "iv", text: "An old idea, new policy" },
        ], answer: "i", explanation: "Paragraph E focuses on biodiversity and how design matters." },
      { number: 6, type: "matching-headings", prompt: "Choose the best heading for Paragraph F.",
        headings: [
          { label: "i", text: "Cost obstacles and policy answers" },
          { label: "ii", text: "Extensive vs. intensive" },
          { label: "iii", text: "Cooling and heatwaves" },
          { label: "iv", text: "Design details for wildlife" },
        ], answer: "i", explanation: "Paragraph F discusses costs and municipal responses." },
      { number: 7, type: "multiple-choice", prompt: "Germany installs approximately how much new green roof each year?",
        options: ["900,000 m²", "3 million m²", "9 million m²", "90 million m²"], answer: "9 million m²",
        explanation: "Paragraph A: 'roughly nine million square metres'." },
      { number: 8, type: "multiple-choice", prompt: "A green roof can lower neighbourhood peak temperatures during a heatwave by up to:",
        options: ["0.2°C", "2°C", "5°C", "10°C"], answer: "2°C",
        explanation: "Paragraph B: 'up to 2°C'." },
      { number: 9, type: "multiple-choice", prompt: "A well-designed green roof typically retains what proportion of moderate rainfall?",
        options: ["10-20%", "30-40%", "50-60%", "80-90%"], answer: "50-60%",
        explanation: "Paragraph C: 'around 50-60%'." },
      { number: 10, type: "multiple-choice", prompt: "Extensive green roofs are usually planted with:",
        options: ["Rose bushes", "Sedum species", "Small trees", "Native grasses only"], answer: "Sedum species",
        explanation: "Paragraph D: 'hardy sedum species'." },
      { number: 11, type: "multiple-choice", prompt: "Initial green-roof costs are typically higher than conventional roofs by:",
        options: ["10-20%", "40-60%", "80-100%", "150-200%"], answer: "40-60%",
        explanation: "Paragraph F: 'roughly 40-60% higher'." },
      { number: 12, type: "fill-blank", prompt: "Toronto has made green roofs _____ on new large commercial buildings.",
        answer: "mandatory", explanation: "Paragraph F: 'made green roofs mandatory'." },
      { number: 13, type: "fill-blank", prompt: "A conventional dark roof in summer can reach surface temperatures above _____°C.",
        answer: "70", explanation: "Paragraph B: 'above 70°C'." },
    ],
  },

  // ============================================================
  // rx-cam-19 — Language Endangerment in the Digital Age
  // ============================================================
  {
    id: "rx-cam-19",
    title: "Test 23 - Language Endangerment in the Digital Age",
    level: "Hard",
    durationMinutes: 20,
    passageTitle: "Language Endangerment in the Digital Age",
    passage:
`A. Of the roughly 7,000 languages spoken today, linguists estimate that at least half will disappear as living, everyday languages by the end of this century. The figure is not new; UNESCO first published broadly similar projections in the late 1990s. What has changed is the arrival of digital technology, which has been described in some accounts as a further threat, in others as a decisive opportunity.

B. The classical drivers of language shift are well documented. When speakers of a smaller language perceive that their children's economic prospects depend on a larger neighbour, they often reduce transmission of the home language at home in favour of the dominant one. This process, once begun, tends to accelerate: within two or three generations a language may go from universal use in a community to the property of a small circle of elderly speakers. Political discrimination and mass displacement have compressed the same shift into a single generation in extreme cases.

C. Written standards were historically a way of slowing down this decline. A language which is codified, taught in schools and used for administration is far more resilient than one which exists only in speech. But the requirements for a viable written standard - a widely accepted orthography, a body of published material, and support in the education system - remain substantial even in relatively wealthy states. For many indigenous languages, they have never been met.

D. Digital tools have altered the situation in several ways at once. On the one hand, the dominance of a small number of "official" languages online - English, Mandarin, Spanish and a handful of others account for the vast majority of internet content - creates a powerful new form of pressure on smaller tongues, particularly among younger speakers. On the other hand, the same technologies remove some of the traditional obstacles. A Kaqchikel-speaking community in Guatemala can now distribute a video story to speakers scattered across three countries without printing a single book.

E. Machine translation raises the stakes further. Large translation systems have historically covered around one hundred of the world's biggest languages, leaving thousands with essentially no digital presence. Between 2022 and 2024, several major systems expanded to cover more than 1,000 languages, at least at basic quality. Community groups in Wales, Nunavut and Aotearoa/New Zealand have been quick to note that translation quality depends heavily on training data - which they, and no one else, can supply.

F. This gives rise to what some researchers now call "data sovereignty": the principle that a language community should decide how their spoken and written material is collected, stored and used. There is unease at models trained without permission on centuries of indigenous storytelling, and even greater unease where the results are then sold back to those same communities as products. Several New Zealand iwi (tribes) have already agreed protocols with universities and technology firms restricting the use of te reo Maori corpora.

G. Optimists argue that the twenty-first century may see the first mass revival of endangered languages, driven by the same digital tools that once threatened them. Sceptics point out that a language survives only if it is used in the messy details of daily life - shopping, arguing, joking - and that these situations remain stubbornly resistant to software solutions. Whether the sceptics or the optimists are right, the pace of change ensures that the next twenty years will settle much of the argument.`,
    questions: [
      { number: 1, type: "matching-headings", prompt: "Choose the best heading for Paragraph A.",
        headings: [
          { label: "i", text: "How many languages are at risk" },
          { label: "ii", text: "The classical drivers of shift" },
          { label: "iii", text: "The rise of data sovereignty" },
          { label: "iv", text: "Machine translation" },
        ], answer: "i", explanation: "Paragraph A gives the ~7,000 figure and UNESCO projections." },
      { number: 2, type: "matching-headings", prompt: "Choose the best heading for Paragraph B.",
        headings: [
          { label: "i", text: "The classical drivers of shift" },
          { label: "ii", text: "Written standards" },
          { label: "iii", text: "How many languages" },
          { label: "iv", text: "Optimists and sceptics" },
        ], answer: "i", explanation: "Paragraph B lists economic and political drivers of shift." },
      { number: 3, type: "matching-headings", prompt: "Choose the best heading for Paragraph C.",
        headings: [
          { label: "i", text: "Written standards as a defence" },
          { label: "ii", text: "The classical drivers" },
          { label: "iii", text: "Machine translation" },
          { label: "iv", text: "Digital pressure and opportunity" },
        ], answer: "i", explanation: "Paragraph C is about written standards slowing decline." },
      { number: 4, type: "matching-headings", prompt: "Choose the best heading for Paragraph D.",
        headings: [
          { label: "i", text: "Digital pressure and opportunity" },
          { label: "ii", text: "Written standards" },
          { label: "iii", text: "Data sovereignty" },
          { label: "iv", text: "How many languages" },
        ], answer: "i", explanation: "Paragraph D explicitly balances online pressure and opportunity." },
      { number: 5, type: "matching-headings", prompt: "Choose the best heading for Paragraph E.",
        headings: [
          { label: "i", text: "Machine translation reaches thousands of languages" },
          { label: "ii", text: "Data sovereignty" },
          { label: "iii", text: "Written standards" },
          { label: "iv", text: "The classical drivers" },
        ], answer: "i", explanation: "Paragraph E covers translation systems expanding to 1,000+ languages." },
      { number: 6, type: "matching-headings", prompt: "Choose the best heading for Paragraph F.",
        headings: [
          { label: "i", text: "Data sovereignty" },
          { label: "ii", text: "Machine translation" },
          { label: "iii", text: "Optimists and sceptics" },
          { label: "iv", text: "Digital pressure" },
        ], answer: "i", explanation: "Paragraph F introduces and defines 'data sovereignty'." },
      { number: 7, type: "multiple-choice", prompt: "Approximately how many languages are spoken today?",
        options: ["700", "3,000", "7,000", "70,000"], answer: "7,000",
        explanation: "Paragraph A gives ~7,000." },
      { number: 8, type: "multiple-choice", prompt: "UNESCO first published broadly similar projections in:",
        options: ["The 1960s", "The 1980s", "The late 1990s", "The 2010s"], answer: "The late 1990s",
        explanation: "Paragraph A: 'the late 1990s'." },
      { number: 9, type: "multiple-choice", prompt: "Between 2022 and 2024, translation systems expanded to more than:",
        options: ["100 languages", "500 languages", "1,000 languages", "5,000 languages"], answer: "1,000 languages",
        explanation: "Paragraph E cites more than 1,000." },
      { number: 10, type: "multiple-choice", prompt: "New Zealand agreements chiefly concern:",
        options: ["Broadcasting licences", "Te reo Maori corpora", "School exams", "Naming rights"], answer: "Te reo Maori corpora",
        explanation: "Paragraph F names te reo Maori corpora." },
      { number: 11, type: "multiple-choice", prompt: "Sceptics of digital revival stress the importance of:",
        options: ["Government funding", "Everyday informal use", "Written literature", "Machine translation"], answer: "Everyday informal use",
        explanation: "Paragraph G: 'shopping, arguing, joking'." },
      { number: 12, type: "fill-blank", prompt: "Language shift can be compressed by political discrimination and mass _____.",
        answer: "displacement", explanation: "Paragraph B names displacement." },
      { number: 13, type: "fill-blank", prompt: "The Kaqchikel example is drawn from _____.",
        answer: "Guatemala", explanation: "Paragraph D locates it in Guatemala." },
    ],
  },

  // ============================================================
  // rx-cam-20 — Rethinking Urban Waste
  // ============================================================
  {
    id: "rx-cam-20",
    title: "Test 24 - Rethinking Urban Waste",
    level: "Medium",
    durationMinutes: 20,
    passageTitle: "Rethinking Urban Waste",
    passage:
`A. For most of the twentieth century, urban waste was handled according to a strikingly simple logic. Households and businesses produced material that was no longer wanted; municipal services collected it; and the collected material was transported, at public expense, to landfills or incinerators located outside city limits. The system was intended to be, above all, invisible. As long as bins were emptied on schedule, few residents needed to think about what happened next.

B. This model became untenable earlier in some parts of the world than in others. In dense, small countries such as Japan, Singapore and the Netherlands, suitable landfill sites became scarce as early as the 1970s. Recycling collection was expanded and standards were tightened. In parts of the United States, by contrast, the price of landfilling stayed low well into the 2000s, largely because the costs of long-distance transport were externalised. The result was a highly uneven map of waste management even within a single country.

C. The apparent success story of the 1990s and 2000s was materials recovery: separating paper, glass, metal and some plastics for reprocessing. Between 1990 and 2015, recycling rates in European Union member states rose from roughly 25% to more than 45% of household waste. For a while it appeared that recycling infrastructure and consumer habits could scale in parallel indefinitely.

D. This picture was disrupted in 2018 when China, until then the destination for a substantial share of the world's recyclable plastic and paper, announced restrictions on imports of contaminated material. Consignments that failed to meet strict purity standards were refused entry. Overnight, many European and North American recycling programmes lost their principal downstream market. Prices for baled recyclables fell sharply, and some smaller municipalities in the United States quietly reverted to sending mixed recyclables to landfill.

E. In response, attention has increasingly shifted from recycling to the reduction of waste at source. So-called circular-economy strategies aim to design products so that they can be repaired, reused or ultimately dismantled with minimal loss of material. The European Union has adopted a range of directives that will require most manufacturers to make spare parts available for household electronics for a minimum of seven to ten years - a much longer window than most producers currently plan for.

F. Composting has also received renewed attention. Roughly a third of household waste in most cities is organic. Where that fraction is collected separately and composted, both landfill volumes and methane emissions fall sharply. San Francisco was one of the first large cities to make organic separation compulsory; other cities, including Milan and Seoul, have since introduced comparable schemes with reported diversion rates above 60%.

G. Sceptics argue that circular-economy ambitions risk being co-opted by producers who use them as marketing language while continuing to sell essentially disposable products. Supporters reply that regulation, provided it is enforced, has already begun to shift design decisions in electronics and clothing. What is clear is that the twentieth-century model of collect-and-forget can no longer serve as the default. Cities that have not yet begun to redesign their waste systems will soon face significant catch-up costs.`,
    questions: [
      { number: 1, type: "matching-headings", prompt: "Choose the best heading for Paragraph A.",
        headings: [
          { label: "i", text: "Composting comes of age" },
          { label: "ii", text: "The old collect-and-forget model" },
          { label: "iii", text: "The circular economy" },
          { label: "iv", text: "The 2018 shock" },
        ], answer: "ii", explanation: "Paragraph A describes the old invisible system." },
      { number: 2, type: "matching-headings", prompt: "Choose the best heading for Paragraph B.",
        headings: [
          { label: "i", text: "Uneven pressures worldwide" },
          { label: "ii", text: "Recycling grows" },
          { label: "iii", text: "The 2018 shock" },
          { label: "iv", text: "Composting" },
        ], answer: "i", explanation: "Paragraph B contrasts Japan/NL/SG with the US." },
      { number: 3, type: "matching-headings", prompt: "Choose the best heading for Paragraph C.",
        headings: [
          { label: "i", text: "The rise of recycling" },
          { label: "ii", text: "The 2018 shock" },
          { label: "iii", text: "The circular economy" },
          { label: "iv", text: "The old model" },
        ], answer: "i", explanation: "Paragraph C tracks EU recycling rates rising." },
      { number: 4, type: "matching-headings", prompt: "Choose the best heading for Paragraph D.",
        headings: [
          { label: "i", text: "The 2018 shock" },
          { label: "ii", text: "The rise of recycling" },
          { label: "iii", text: "The circular economy" },
          { label: "iv", text: "Uneven pressures" },
        ], answer: "i", explanation: "Paragraph D is about China's 2018 import restrictions." },
      { number: 5, type: "matching-headings", prompt: "Choose the best heading for Paragraph E.",
        headings: [
          { label: "i", text: "The circular economy" },
          { label: "ii", text: "Composting" },
          { label: "iii", text: "The 2018 shock" },
          { label: "iv", text: "Uneven pressures" },
        ], answer: "i", explanation: "Paragraph E introduces circular-economy strategies." },
      { number: 6, type: "matching-headings", prompt: "Choose the best heading for Paragraph F.",
        headings: [
          { label: "i", text: "Composting" },
          { label: "ii", text: "The circular economy" },
          { label: "iii", text: "The rise of recycling" },
          { label: "iv", text: "The old model" },
        ], answer: "i", explanation: "Paragraph F focuses on organic separation and composting." },
      { number: 7, type: "multiple-choice", prompt: "EU recycling rates rose between 1990 and 2015 to more than:",
        options: ["25%", "35%", "45%", "65%"], answer: "45%",
        explanation: "Paragraph C: 'more than 45%'." },
      { number: 8, type: "multiple-choice", prompt: "China's 2018 policy targeted:",
        options: ["Textile imports", "Contaminated recyclables", "Wooden pallets", "Rare earth exports"], answer: "Contaminated recyclables",
        explanation: "Paragraph D: contaminated material." },
      { number: 9, type: "multiple-choice", prompt: "The EU will require spare parts for electronics for:",
        options: ["1-2 years", "3-5 years", "7-10 years", "15-20 years"], answer: "7-10 years",
        explanation: "Paragraph E: seven to ten years." },
      { number: 10, type: "multiple-choice", prompt: "Roughly what fraction of household waste is organic in most cities?",
        options: ["1/10", "1/5", "1/3", "1/2"], answer: "1/3",
        explanation: "Paragraph F: 'Roughly a third'." },
      { number: 11, type: "multiple-choice", prompt: "Which city was one of the first to make organic separation compulsory?",
        options: ["Milan", "San Francisco", "Seoul", "Tokyo"], answer: "San Francisco",
        explanation: "Paragraph F names San Francisco as one of the first." },
      { number: 12, type: "fill-blank", prompt: "Cities including Milan and Seoul report diversion rates above _____%.",
        answer: "60", explanation: "Paragraph F: above 60%." },
      { number: 13, type: "fill-blank", prompt: "Landfill scarcity became clear in Japan, Singapore and the _____ as early as the 1970s.",
        answer: "Netherlands", explanation: "Paragraph B names the Netherlands." },
    ],
  },

  // ============================================================
  // rx-cam-21 — The Rise of Vertical Farming
  // ============================================================
  {
    id: "rx-cam-21",
    title: "Test 25 - The Rise of Vertical Farming",
    level: "Medium",
    durationMinutes: 20,
    passageTitle: "The Rise of Vertical Farming",
    passage:
`A. The idea of stacking rows of crops in a warehouse and growing them under artificial light has moved, over the last two decades, from the pages of speculative journalism into the accounts of listed companies. Vertical farms now operate at commercial scale in Newark, Osaka, Riyadh, Copenhagen and Ho Chi Minh City. Their advocates claim that the technology can significantly reduce the environmental cost of feeding cities. Critics reply that most current installations grow only the highest-value crops and are only marginally profitable even so.

B. In technical terms, a vertical farm is a controlled-environment growing space in which nutrient-rich water is circulated through the root zone of plants growing on shelves. Sunlight is replaced by tunable LED lamps whose spectrum can be adjusted for different growth stages. Because pests are largely excluded, pesticides are rarely required. Water consumption is typically 90% lower than in equivalent open-field production, since virtually none is lost to evaporation.

C. The energy cost, however, is not lower. In most cases it is dramatically higher. A recent independent study of five European vertical farms found that the electricity used to power lighting and climate control was, on average, seven to ten times the primary energy cost of open-field production of the same crop. Whether this represents a net environmental gain therefore depends heavily on the local electricity mix. In Iceland, where geothermal and hydroelectric power dominate, the calculation is broadly favourable; in coal-dependent grids it is unambiguously worse.

D. Product range is currently narrow. Leafy greens, herbs and strawberries dominate; staple grains, potatoes and legumes are almost entirely absent. The reason is straightforward economics: fast-growing, high-value crops with short shelf life justify the capital cost of the facility, whereas cereals do not. Some engineers argue that this restriction is permanent given the physics of photosynthesis; others predict that further advances in LED efficiency will slowly enlarge the viable crop list.

E. Urban proximity is often presented as a key advantage. A lettuce sold in a Tokyo supermarket, grown three kilometres away, can reach the shelf within hours of harvest, extending its shelf life and reducing food waste. But short transport distances do not automatically outweigh higher energy use per kilogram. A careful life-cycle analysis is needed for each individual case, and such analyses have so far produced mixed results.

F. The most substantial claim in favour of vertical farming is resilience. In regions where drought, extreme heat or seasonal flooding already threaten conventional production, a controlled indoor system can supply consistent volumes throughout the year. Gulf states in particular have used this argument to justify large public investments in vertical farming, framing it as a national food-security measure rather than as a commercial venture.

G. Where the sector will settle is unclear. Several high-profile vertical-farming companies collapsed between 2022 and 2024 as venture funding tightened. Others, more modestly capitalised and often owned by larger food-service groups, have quietly expanded. The final shape of the industry may look less like the shining tower envisaged in early conceptual drawings and more like a network of low, wide production sheds attached to logistics hubs.`,
    questions: [
      { number: 1, type: "matching-headings", prompt: "Choose the best heading for Paragraph A.",
        headings: [
          { label: "i", text: "From speculation to industry" },
          { label: "ii", text: "The energy problem" },
          { label: "iii", text: "Which crops make sense" },
          { label: "iv", text: "Resilience and food security" },
        ], answer: "i", explanation: "Paragraph A traces the shift from speculation to commercial reality." },
      { number: 2, type: "matching-headings", prompt: "Choose the best heading for Paragraph B.",
        headings: [
          { label: "i", text: "What a vertical farm is" },
          { label: "ii", text: "The energy problem" },
          { label: "iii", text: "Where the industry settles" },
          { label: "iv", text: "Resilience and food security" },
        ], answer: "i", explanation: "Paragraph B describes the technical setup." },
      { number: 3, type: "matching-headings", prompt: "Choose the best heading for Paragraph C.",
        headings: [
          { label: "i", text: "The energy problem" },
          { label: "ii", text: "What a vertical farm is" },
          { label: "iii", text: "Which crops make sense" },
          { label: "iv", text: "Urban proximity" },
        ], answer: "i", explanation: "Paragraph C compares energy costs across grids." },
      { number: 4, type: "matching-headings", prompt: "Choose the best heading for Paragraph D.",
        headings: [
          { label: "i", text: "Which crops make sense" },
          { label: "ii", text: "The energy problem" },
          { label: "iii", text: "Resilience" },
          { label: "iv", text: "Where the industry settles" },
        ], answer: "i", explanation: "Paragraph D focuses on the narrow current crop range." },
      { number: 5, type: "matching-headings", prompt: "Choose the best heading for Paragraph E.",
        headings: [
          { label: "i", text: "Urban proximity and life-cycle analysis" },
          { label: "ii", text: "Which crops make sense" },
          { label: "iii", text: "Resilience" },
          { label: "iv", text: "The energy problem" },
        ], answer: "i", explanation: "Paragraph E weighs urban proximity via life-cycle analyses." },
      { number: 6, type: "matching-headings", prompt: "Choose the best heading for Paragraph F.",
        headings: [
          { label: "i", text: "Resilience and food security" },
          { label: "ii", text: "Urban proximity" },
          { label: "iii", text: "The energy problem" },
          { label: "iv", text: "What a vertical farm is" },
        ], answer: "i", explanation: "Paragraph F frames vertical farming as food-security." },
      { number: 7, type: "multiple-choice", prompt: "Water consumption in a vertical farm is typically lower by about:",
        options: ["30%", "60%", "90%", "99.9%"], answer: "90%",
        explanation: "Paragraph B: 'typically 90% lower'." },
      { number: 8, type: "multiple-choice", prompt: "Electricity use in the studied European farms was, on average, how many times the primary energy of open-field production?",
        options: ["1-2 times", "3-4 times", "7-10 times", "20-30 times"], answer: "7-10 times",
        explanation: "Paragraph C: 'seven to ten times'." },
      { number: 9, type: "multiple-choice", prompt: "Which country's electricity mix makes vertical farming broadly favourable?",
        options: ["Poland", "Iceland", "India", "China"], answer: "Iceland",
        explanation: "Paragraph C names Iceland." },
      { number: 10, type: "multiple-choice", prompt: "Which crop is dominant in today's vertical farms?",
        options: ["Rice", "Potatoes", "Leafy greens", "Wheat"], answer: "Leafy greens",
        explanation: "Paragraph D lists leafy greens." },
      { number: 11, type: "multiple-choice", prompt: "Between 2022 and 2024, several high-profile companies:",
        options: ["Merged", "Collapsed", "Listed on new exchanges", "Moved to Africa"], answer: "Collapsed",
        explanation: "Paragraph G: 'collapsed between 2022 and 2024'." },
      { number: 12, type: "fill-blank", prompt: "Sunlight in vertical farms is replaced by tunable _____ lamps.",
        answer: "LED", explanation: "Paragraph B: 'tunable LED lamps'." },
      { number: 13, type: "fill-blank", prompt: "Gulf states have justified investment on grounds of national food _____.",
        answer: "security", explanation: "Paragraph F: 'a national food-security measure'." },
    ],
  },

  // ============================================================
  // rx-cam-22 — The Enduring Puzzle of Handedness
  // ============================================================
  {
    id: "rx-cam-22",
    title: "Test 26 - The Enduring Puzzle of Handedness",
    level: "Hard",
    durationMinutes: 20,
    passageTitle: "The Enduring Puzzle of Handedness",
    passage:
`A. Roughly one person in ten writes and manipulates fine objects with their left hand. This ratio is remarkably stable: it holds, within a percentage point or two, across cultures and across recorded history. It also holds in most stone-age skeletal remains examined for wear patterns. Given the near-universal cultural preference for the right hand - and the historical persecution of left-handers in some societies - the persistence of the minority requires an explanation.

B. Nineteenth-century commentators generally regarded left-handedness as a defect to be corrected. Handwriting classes actively retrained children, and in some educational systems this practice continued well into the 1960s. A significant body of retrospective evidence now suggests that forced retraining produces measurable increases in stammering, dyslexia and school anxiety. Most modern educational authorities have therefore abandoned it, at least officially.

C. Attempts to link handedness to a single gene have failed. Studies of monozygotic twins - who share their entire DNA - find that roughly 25% of twin pairs differ in dominant hand. This is a decisive result: whatever produces handedness in an individual, it is not a simple Mendelian trait. Contemporary models generally invoke a network of small genetic effects modulated by prenatal development in the uterus, particularly by the mother's hormonal environment.

D. The evolutionary function, if there is one, remains debated. One hypothesis, sometimes called the fighting hypothesis, notes that left-handers are over-represented among top performers in interactive sports such as tennis, boxing and fencing, in which surprise plays a large role. If, in ancestral populations, left-handedness conferred a similar advantage in physical conflict, the trait might have been selected as a rare "cheating" strategy - useful precisely because most opponents were right-handed. Statistical analyses of tennis rankings and, more strikingly, of injury patterns in small-scale societies studied in the twentieth century, are consistent with this idea, though not decisive.

E. A competing hypothesis emphasises social cooperation. Precise coordination in tool use - passing an object, guiding a partner's grip - is easier if most people share the same dominant hand. From this perspective, the striking global bias toward the right-hand majority is itself the phenomenon that needs to be explained: any minority that persists at 10% is a puzzle. A stable equilibrium between cooperation-favouring and conflict-favouring pressures is one theoretical solution, though no single study has confirmed it.

F. Brain lateralisation, once thought to be the whole story, is only loosely correlated with handedness. In the general population, about 95% of right-handers process language predominantly in the left hemisphere. Among left-handers the corresponding figure is around 70%, with the remainder using the right hemisphere or a more distributed pattern. Handedness alone is therefore a poor predictor of an individual's neural organisation.

G. Recent large-scale genomic surveys have identified around forty regions of the genome weakly associated with hand preference. Individually, none of them accounts for more than a fraction of a percent of the variance. The overall picture is that handedness is a mildly heritable trait, sensitive to prenatal conditions and only marginally to environment thereafter. In this respect it resembles a growing number of behavioural traits whose supposed simplicity, on inspection, turns out to be an illusion.`,
    questions: [
      { number: 1, type: "matching-headings", prompt: "Choose the best heading for Paragraph A.",
        headings: [
          { label: "i", text: "A striking constant" },
          { label: "ii", text: "The fighting hypothesis" },
          { label: "iii", text: "Brain lateralisation" },
          { label: "iv", text: "Historical persecution" },
        ], answer: "i", explanation: "Paragraph A stresses the stable 10% ratio across cultures." },
      { number: 2, type: "matching-headings", prompt: "Choose the best heading for Paragraph B.",
        headings: [
          { label: "i", text: "Forced retraining and its harm" },
          { label: "ii", text: "The fighting hypothesis" },
          { label: "iii", text: "Brain lateralisation" },
          { label: "iv", text: "A striking constant" },
        ], answer: "i", explanation: "Paragraph B critiques historical retraining." },
      { number: 3, type: "matching-headings", prompt: "Choose the best heading for Paragraph C.",
        headings: [
          { label: "i", text: "Beyond one gene" },
          { label: "ii", text: "The fighting hypothesis" },
          { label: "iii", text: "Cooperation hypothesis" },
          { label: "iv", text: "Genomic surveys" },
        ], answer: "i", explanation: "Paragraph C rules out simple Mendelian inheritance." },
      { number: 4, type: "matching-headings", prompt: "Choose the best heading for Paragraph D.",
        headings: [
          { label: "i", text: "The fighting hypothesis" },
          { label: "ii", text: "Cooperation hypothesis" },
          { label: "iii", text: "Brain lateralisation" },
          { label: "iv", text: "Beyond one gene" },
        ], answer: "i", explanation: "Paragraph D describes the fighting hypothesis." },
      { number: 5, type: "matching-headings", prompt: "Choose the best heading for Paragraph E.",
        headings: [
          { label: "i", text: "Cooperation hypothesis" },
          { label: "ii", text: "The fighting hypothesis" },
          { label: "iii", text: "Genomic surveys" },
          { label: "iv", text: "Forced retraining" },
        ], answer: "i", explanation: "Paragraph E develops the cooperation-based hypothesis." },
      { number: 6, type: "matching-headings", prompt: "Choose the best heading for Paragraph F.",
        headings: [
          { label: "i", text: "Brain lateralisation" },
          { label: "ii", text: "Beyond one gene" },
          { label: "iii", text: "The fighting hypothesis" },
          { label: "iv", text: "A striking constant" },
        ], answer: "i", explanation: "Paragraph F is on brain lateralisation and language." },
      { number: 7, type: "multiple-choice", prompt: "The proportion of left-handers worldwide is roughly:",
        options: ["1 in 3", "1 in 10", "1 in 25", "1 in 100"], answer: "1 in 10",
        explanation: "Paragraph A: 'one person in ten'." },
      { number: 8, type: "multiple-choice", prompt: "In twin pairs sharing DNA, roughly what percentage differ in dominant hand?",
        options: ["5%", "15%", "25%", "50%"], answer: "25%",
        explanation: "Paragraph C: 'roughly 25%'." },
      { number: 9, type: "multiple-choice", prompt: "The fighting hypothesis draws support from over-representation of left-handers in:",
        options: ["Chess", "Interactive combat sports", "Long-distance running", "Weightlifting"], answer: "Interactive combat sports",
        explanation: "Paragraph D lists tennis, boxing, fencing." },
      { number: 10, type: "multiple-choice", prompt: "Of right-handers, approximately what percentage process language mainly in the left hemisphere?",
        options: ["55%", "70%", "85%", "95%"], answer: "95%",
        explanation: "Paragraph F: 'about 95% of right-handers'." },
      { number: 11, type: "multiple-choice", prompt: "Recent genomic surveys have identified approximately how many regions weakly linked to hand preference?",
        options: ["10", "40", "200", "1,000"], answer: "40",
        explanation: "Paragraph G: 'around forty regions'." },
      { number: 12, type: "fill-blank", prompt: "Forced retraining has been linked to increases in stammering, dyslexia and school _____.",
        answer: "anxiety", explanation: "Paragraph B lists school anxiety." },
      { number: 13, type: "fill-blank", prompt: "Handedness is described as a mildly _____ trait.",
        answer: "heritable", explanation: "Paragraph G: 'mildly heritable trait'." },
    ],
  },

  // ============================================================
  // rx-cam-23 — Museums in the Twenty-First Century
  // ============================================================
  {
    id: "rx-cam-23",
    title: "Test 27 - Museums in the Twenty-First Century",
    level: "Medium",
    durationMinutes: 20,
    passageTitle: "Museums in the Twenty-First Century",
    passage:
`A. For most of the last two centuries, the public museum was understood primarily as a place of instruction. Objects, arranged in cases according to type or period, taught visitors what to admire and what to remember. Curators wrote authoritative labels; visitors, largely middle-class and mostly silent, read them. The unstated model was that of a well-behaved classroom.

B. That model began to change decisively in the 1980s. A new generation of museum professionals, influenced by developments in cultural studies and social history, began to ask uncomfortable questions. Whose story was being told in the imperial collections of London, Paris and Berlin? On what terms had the objects been acquired? Which groups of people had never appeared in the exhibits at all? These questions were initially unwelcome; today they have become nearly unavoidable, and no serious institution can wholly ignore them.

C. Attendance figures, in the meantime, have grown. Global museum visits reached roughly 850 million per year before the pandemic of the early 2020s, twice the level of the early 1990s. Growth has been particularly rapid in East Asia and the Gulf, where large new institutions have been built with substantial state investment. In many European cities, however, museum visits per capita have plateaued, and specific groups - notably men under thirty in socially deprived areas - remain systematically absent.

D. Digital reproduction has changed what museums offer more subtly than early forecasts predicted. Twenty years ago, some commentators expected that if entire collections were made available online, physical visits would fall away. In practice, the opposite has often occurred: institutions with strong digital offerings tend to see higher in-person attendance. Digital reproductions appear to whet appetite rather than replace it. This does not, of course, apply everywhere, and small provincial museums without the resources to digitise remain disadvantaged.

E. Restitution has become the most publicly visible of the changes now under way. Since roughly 2017, several European governments have committed in principle to returning objects looted during colonial rule. Actual returns, however, remain small in number relative to the sheer scale of contested collections. Museums argue that returns raise difficult questions about ownership, physical condition and access. Communities of origin reply that these are precisely the arguments used to postpone action indefinitely.

F. Alongside restitution, some museums have opened storage areas to the public and invited communities of origin to reinterpret existing displays. In parts of Canada, Australia and New Zealand, this has led to significant changes in how indigenous collections are displayed and named. Visitors sometimes find these newer displays disconcerting; that discomfort, curators argue, is part of the intended experience.

G. What the museum will be by the middle of this century is now genuinely uncertain. It may be a place where an object's provenance is presented alongside its aesthetics; a place where visitors contribute as well as receive; a place, some argue, that will hold far fewer objects than today. What is unlikely is that it will resemble the well-behaved classroom of a century ago.`,
    questions: [
      { number: 1, type: "matching-headings", prompt: "Choose the best heading for Paragraph A.",
        headings: [
          { label: "i", text: "The classroom model" },
          { label: "ii", text: "Restitution today" },
          { label: "iii", text: "Digital reproduction" },
          { label: "iv", text: "Attendance patterns" },
        ], answer: "i", explanation: "Paragraph A describes the 19th-20th century classroom model." },
      { number: 2, type: "matching-headings", prompt: "Choose the best heading for Paragraph B.",
        headings: [
          { label: "i", text: "New questions from the 1980s" },
          { label: "ii", text: "The classroom model" },
          { label: "iii", text: "Digital reproduction" },
          { label: "iv", text: "Restitution today" },
        ], answer: "i", explanation: "Paragraph B is about new critical questions." },
      { number: 3, type: "matching-headings", prompt: "Choose the best heading for Paragraph C.",
        headings: [
          { label: "i", text: "Attendance patterns" },
          { label: "ii", text: "The classroom model" },
          { label: "iii", text: "Community-led displays" },
          { label: "iv", text: "New questions from the 1980s" },
        ], answer: "i", explanation: "Paragraph C reviews global attendance figures." },
      { number: 4, type: "matching-headings", prompt: "Choose the best heading for Paragraph D.",
        headings: [
          { label: "i", text: "Digital reproduction and physical visits" },
          { label: "ii", text: "Restitution today" },
          { label: "iii", text: "New questions" },
          { label: "iv", text: "Attendance patterns" },
        ], answer: "i", explanation: "Paragraph D links digital collections to in-person attendance." },
      { number: 5, type: "matching-headings", prompt: "Choose the best heading for Paragraph E.",
        headings: [
          { label: "i", text: "Restitution today" },
          { label: "ii", text: "Community-led displays" },
          { label: "iii", text: "Digital reproduction" },
          { label: "iv", text: "Attendance patterns" },
        ], answer: "i", explanation: "Paragraph E focuses on restitution." },
      { number: 6, type: "matching-headings", prompt: "Choose the best heading for Paragraph F.",
        headings: [
          { label: "i", text: "Community-led displays" },
          { label: "ii", text: "Restitution today" },
          { label: "iii", text: "Digital reproduction" },
          { label: "iv", text: "The classroom model" },
        ], answer: "i", explanation: "Paragraph F describes community-led reinterpretation." },
      { number: 7, type: "multiple-choice", prompt: "Before the 2020s pandemic, annual global museum visits were roughly:",
        options: ["150 million", "450 million", "850 million", "1.5 billion"], answer: "850 million",
        explanation: "Paragraph C: 'roughly 850 million per year'." },
      { number: 8, type: "multiple-choice", prompt: "Global museum visits have grown to about how many times the early-1990s level?",
        options: ["Same", "1.5×", "2×", "5×"], answer: "2×",
        explanation: "Paragraph C: 'twice the level of the early 1990s'." },
      { number: 9, type: "multiple-choice", prompt: "European governments committed in principle to colonial restitution since about:",
        options: ["2007", "2012", "2017", "2022"], answer: "2017",
        explanation: "Paragraph E: 'Since roughly 2017'." },
      { number: 10, type: "multiple-choice", prompt: "Community-led display changes are most notable in:",
        options: ["Southern Europe", "Canada, Australia and New Zealand", "West Africa", "Central Asia"], answer: "Canada, Australia and New Zealand",
        explanation: "Paragraph F lists these three." },
      { number: 11, type: "multiple-choice", prompt: "Digital availability of collections has typically:",
        options: ["Reduced physical visits", "Increased physical visits", "Had no measurable effect", "Reduced curatorial jobs"], answer: "Increased physical visits",
        explanation: "Paragraph D: 'the opposite has often occurred'." },
      { number: 12, type: "fill-blank", prompt: "Museums have opened previously private _____ areas to the public.",
        answer: "storage", explanation: "Paragraph F: 'opened storage areas to the public'." },
      { number: 13, type: "fill-blank", prompt: "The unstated 19th-century model of the museum was that of a well-behaved _____.",
        answer: "classroom", explanation: "Paragraph A: 'well-behaved classroom'." },
    ],
  },

  // ============================================================
  // rx-cam-24 — The Reinvention of Public Transport
  // ============================================================
  {
    id: "rx-cam-24",
    title: "Test 28 - The Reinvention of Public Transport",
    level: "Medium",
    durationMinutes: 20,
    passageTitle: "The Reinvention of Public Transport",
    passage:
`A. For much of the second half of the twentieth century, public transport in Western Europe and North America was considered a service in slow decline. Rising car ownership, expanding suburbs and cheap fuel eroded the passenger base of trams, buses and commuter railways. Networks that had been built in the era of walking cities began to look, on the balance sheet, like expensive relics.

B. The rethinking of this narrative began in cities that had not, or could not, follow the American model of near-universal car dependency. Zurich in the 1970s adopted a strict "priority to public transport" policy, in which every traffic light on a tram route was programmed to detect and favour the approaching vehicle. Copenhagen, in the same decade, began systematically converting central streets into pedestrian and cycling space. Both cities saw modal share of public transport and cycling rise steadily even as economic activity in the centre grew.

C. Statistical evidence for a positive feedback loop is now widely accepted. When services become more frequent and more reliable, passenger numbers rise; higher numbers in turn justify more frequent services. Vienna's public transport authority reports that between 2005 and 2020, ridership grew almost twice as fast as fares - a pattern only possible where investment moved in the right direction first.

D. Cost, unsurprisingly, remains the principal political fault line. Very frequent bus services are labour-intensive, and full metro systems require capital investments in the tens of billions. Innovative financing models have emerged, from land-value capture (in which increases in property values near a new line are taxed to fund it) to Business Improvement Districts contributing to shuttle services. None of these entirely replaces public subsidy; most work best as a supplement.

E. Digital tools have also had a significant effect. Mobile ticketing has eliminated the queue at machines and, in many cities, replaced physical tickets almost entirely. Real-time arrival information reduces perceived waiting time even when actual waiting time does not fall. Studies of Berlin passengers found that access to real-time information alone increased user satisfaction by around 20% at no additional operational cost - a rare instance in transport of a genuinely cheap improvement.

F. Bus networks in particular have been transformed by the concept of "bus rapid transit", which reserves lanes and gives buses priority at intersections. Cities such as Bogota and Curitiba built full BRT networks decades ago; more recently, Dar es Salaam and Lagos have adopted similar systems. Where properly implemented, BRT can move passenger volumes comparable to a light rail system at a fraction of the capital cost.

G. What none of these strategies can substitute for is political consistency. Cities that alternate between pro-transit and pro-car policies with each election typically end up with underused systems. The success stories, from Zurich to Curitiba, share less a single "correct" technology than a stable multi-decade commitment. Whether the current cross-party consensus in favour of public transport in most European cities will hold under future budget pressure is, at the moment, an open question.`,
    questions: [
      { number: 1, type: "matching-headings", prompt: "Choose the best heading for Paragraph A.",
        headings: [
          { label: "i", text: "A slow post-war decline" },
          { label: "ii", text: "Bus rapid transit" },
          { label: "iii", text: "The Zurich model" },
          { label: "iv", text: "Real-time information" },
        ], answer: "i", explanation: "Paragraph A describes the mid-20th-century decline." },
      { number: 2, type: "matching-headings", prompt: "Choose the best heading for Paragraph B.",
        headings: [
          { label: "i", text: "European rethinking" },
          { label: "ii", text: "Digital tools" },
          { label: "iii", text: "A slow post-war decline" },
          { label: "iv", text: "Financing models" },
        ], answer: "i", explanation: "Paragraph B introduces Zurich and Copenhagen." },
      { number: 3, type: "matching-headings", prompt: "Choose the best heading for Paragraph C.",
        headings: [
          { label: "i", text: "The virtuous circle" },
          { label: "ii", text: "Digital tools" },
          { label: "iii", text: "Financing models" },
          { label: "iv", text: "Political consistency" },
        ], answer: "i", explanation: "Paragraph C describes the positive feedback loop." },
      { number: 4, type: "matching-headings", prompt: "Choose the best heading for Paragraph D.",
        headings: [
          { label: "i", text: "Financing models" },
          { label: "ii", text: "The virtuous circle" },
          { label: "iii", text: "European rethinking" },
          { label: "iv", text: "Bus rapid transit" },
        ], answer: "i", explanation: "Paragraph D covers land-value capture and BIDs." },
      { number: 5, type: "matching-headings", prompt: "Choose the best heading for Paragraph E.",
        headings: [
          { label: "i", text: "Digital tools" },
          { label: "ii", text: "Financing models" },
          { label: "iii", text: "Political consistency" },
          { label: "iv", text: "Bus rapid transit" },
        ], answer: "i", explanation: "Paragraph E is about mobile ticketing and real-time info." },
      { number: 6, type: "matching-headings", prompt: "Choose the best heading for Paragraph F.",
        headings: [
          { label: "i", text: "Bus rapid transit" },
          { label: "ii", text: "Digital tools" },
          { label: "iii", text: "Financing models" },
          { label: "iv", text: "The virtuous circle" },
        ], answer: "i", explanation: "Paragraph F is dedicated to BRT." },
      { number: 7, type: "multiple-choice", prompt: "Zurich's traffic-light policy was designed to:",
        options: ["Ban private cars", "Detect and favour approaching trams", "Reduce cycling speed", "Increase fuel taxes"], answer: "Detect and favour approaching trams",
        explanation: "Paragraph B: 'programmed to detect and favour the approaching vehicle'." },
      { number: 8, type: "multiple-choice", prompt: "Between 2005 and 2020, Vienna's ridership growth compared with fares was roughly:",
        options: ["Half as fast", "The same", "Twice as fast", "Ten times as fast"], answer: "Twice as fast",
        explanation: "Paragraph C: 'almost twice as fast as fares'." },
      { number: 9, type: "multiple-choice", prompt: "Real-time information in Berlin increased user satisfaction by around:",
        options: ["5%", "20%", "40%", "60%"], answer: "20%",
        explanation: "Paragraph E: 'around 20%'." },
      { number: 10, type: "multiple-choice", prompt: "Cities identified as early adopters of full BRT include:",
        options: ["Berlin and Paris", "Bogota and Curitiba", "Tokyo and Osaka", "Lagos and Nairobi"], answer: "Bogota and Curitiba",
        explanation: "Paragraph F names them." },
      { number: 11, type: "multiple-choice", prompt: "The principal shared feature of success stories is:",
        options: ["A single new technology", "Very high fares", "Stable multi-decade commitment", "Low labour costs"], answer: "Stable multi-decade commitment",
        explanation: "Paragraph G: 'a stable multi-decade commitment'." },
      { number: 12, type: "fill-blank", prompt: "Increases in nearby property values funded through _____-value capture help finance transit.",
        answer: "land", explanation: "Paragraph D: 'land-value capture'." },
      { number: 13, type: "fill-blank", prompt: "African BRT adopters include Dar es Salaam and _____.",
        answer: "Lagos", explanation: "Paragraph F names Lagos." },
    ],
  },

  // ============================================================
  // rx-cam-25 — The Return of the Herbal
  // ============================================================
  {
    id: "rx-cam-25",
    title: "Test 29 - The Return of the Herbal Compendium",
    level: "Medium",
    durationMinutes: 20,
    passageTitle: "The Return of the Herbal Compendium",
    passage:
`A. Long before the emergence of modern pharmacology, physicians and healers relied on compendia of plant lore known as herbals. These volumes, richly illustrated and often organised regionally, described the medicinal use, preparation and seasonal availability of hundreds of species. Dioscorides' first-century De Materia Medica remained a standard reference across Europe and the Islamic world for more than fifteen hundred years. What is striking is not merely the endurance of the format, but that its findings turn out, in many cases, to be broadly correct.

B. In the second half of the twentieth century, the herbal tradition was increasingly dismissed by mainstream Western medicine. Synthetic drugs offered predictable dosages and quality control that a foraged plant could not match. Regulatory frameworks were built almost entirely around single-molecule compounds. Traditional preparations, with their mixtures of dozens of active substances, sat uneasily within these systems and were often treated as folklore rather than evidence.

C. The pendulum has since begun to swing back, though not to any romanticised past. The World Health Organization estimates that around 80% of people in low- and middle-income countries continue to use traditional plant-based medicines as their first point of care. Even in high-income countries, sales of herbal supplements have grown steadily, reaching roughly 15 billion US dollars globally in 2023. Some of this growth is undoubtedly marketing-led; some, however, reflects genuine interest in complementing conventional treatment.

D. Modern pharmacology has quietly built much of its own foundation on plants. Aspirin, digoxin, quinine, artemisinin, morphine and paclitaxel - all cornerstones of modern medicine - derive from plants first identified in traditional systems. The extraction of paclitaxel from Pacific yew in the 1960s, in particular, transformed the treatment of several cancers and remains one of the more dramatic examples of a traditional lead compound becoming a global therapy.

E. Not everything from the historical herbal tradition, however, has held up under scrutiny. Some remedies once considered universally effective are, at best, symptomatic; a smaller number contain compounds now known to be toxic in the doses traditionally recommended. Assessing traditional preparations rigorously is time-consuming: a single Chinese herbal formula may contain a dozen ingredients, each with multiple active compounds. Trials designed for a single molecule are poorly suited to such complexity.

F. Attention has therefore turned to "network pharmacology", which studies the effect of multi-compound preparations on multiple targets simultaneously. Early results are cautiously encouraging: some traditional formulations for inflammation and metabolic disease show consistent, if modest, effects when assessed with these newer methods. Whether regulatory systems built around single molecules can adapt to accept such evidence is a live question.

G. The commercial risks are real. Increased demand for wild-harvested plants - particularly African rooibos, Himalayan snow lotus and North American ginseng - has already pushed several species toward local extinction. Sustainable cultivation programmes exist, but they compete with less scrupulous suppliers. Whatever the future of traditional medicine in Western practice, the plants it depends on need to be secured now.`,
    questions: [
      { number: 1, type: "matching-headings", prompt: "Choose the best heading for Paragraph A.",
        headings: [
          { label: "i", text: "The long history of the herbal" },
          { label: "ii", text: "20th-century dismissal" },
          { label: "iii", text: "Network pharmacology" },
          { label: "iv", text: "Sustainable supply" },
        ], answer: "i", explanation: "Paragraph A surveys the ancient herbal tradition." },
      { number: 2, type: "matching-headings", prompt: "Choose the best heading for Paragraph B.",
        headings: [
          { label: "i", text: "20th-century dismissal" },
          { label: "ii", text: "Modern pharmacology's plant roots" },
          { label: "iii", text: "The long history" },
          { label: "iv", text: "Sustainable supply" },
        ], answer: "i", explanation: "Paragraph B is about mid-20th-century dismissal." },
      { number: 3, type: "matching-headings", prompt: "Choose the best heading for Paragraph C.",
        headings: [
          { label: "i", text: "The commercial and cultural revival" },
          { label: "ii", text: "Network pharmacology" },
          { label: "iii", text: "20th-century dismissal" },
          { label: "iv", text: "Sustainable supply" },
        ], answer: "i", explanation: "Paragraph C tracks WHO estimates and growing sales." },
      { number: 4, type: "matching-headings", prompt: "Choose the best heading for Paragraph D.",
        headings: [
          { label: "i", text: "Modern pharmacology's plant roots" },
          { label: "ii", text: "Limits of tradition" },
          { label: "iii", text: "Network pharmacology" },
          { label: "iv", text: "Sustainable supply" },
        ], answer: "i", explanation: "Paragraph D lists plant-derived drugs." },
      { number: 5, type: "matching-headings", prompt: "Choose the best heading for Paragraph E.",
        headings: [
          { label: "i", text: "Limits of tradition" },
          { label: "ii", text: "Modern pharmacology's plant roots" },
          { label: "iii", text: "Network pharmacology" },
          { label: "iv", text: "The commercial revival" },
        ], answer: "i", explanation: "Paragraph E discusses toxicity and evaluation difficulty." },
      { number: 6, type: "matching-headings", prompt: "Choose the best heading for Paragraph F.",
        headings: [
          { label: "i", text: "Network pharmacology" },
          { label: "ii", text: "Limits of tradition" },
          { label: "iii", text: "Sustainable supply" },
          { label: "iv", text: "Modern plant roots" },
        ], answer: "i", explanation: "Paragraph F introduces network pharmacology." },
      { number: 7, type: "multiple-choice", prompt: "De Materia Medica dates from the:",
        options: ["1st century", "5th century", "10th century", "15th century"], answer: "1st century",
        explanation: "Paragraph A: 'Dioscorides' first-century De Materia Medica'." },
      { number: 8, type: "multiple-choice", prompt: "WHO estimates the proportion of people in low/middle-income countries relying on traditional plant medicines as first care at around:",
        options: ["20%", "40%", "60%", "80%"], answer: "80%",
        explanation: "Paragraph C: 'around 80%'." },
      { number: 9, type: "multiple-choice", prompt: "Global herbal supplement sales reached in 2023 roughly:",
        options: ["1.5 billion USD", "5 billion USD", "15 billion USD", "150 billion USD"], answer: "15 billion USD",
        explanation: "Paragraph C: 'roughly 15 billion US dollars'." },
      { number: 10, type: "multiple-choice", prompt: "Paclitaxel was extracted from:",
        options: ["Pacific yew", "Willow bark", "Foxglove", "Rooibos"], answer: "Pacific yew",
        explanation: "Paragraph D names Pacific yew." },
      { number: 11, type: "multiple-choice", prompt: "Species pushed toward local extinction include:",
        options: ["Aloe and lavender", "Rooibos, snow lotus and ginseng", "Wheat, rice and maize", "Yew and willow"], answer: "Rooibos, snow lotus and ginseng",
        explanation: "Paragraph G lists them." },
      { number: 12, type: "fill-blank", prompt: "A single Chinese herbal formula may contain a dozen _____.",
        answer: "ingredients", explanation: "Paragraph E: 'a dozen ingredients'." },
      { number: 13, type: "fill-blank", prompt: "Modern regulatory frameworks are built almost entirely around single-_____ compounds.",
        answer: "molecule", explanation: "Paragraph B: 'single-molecule compounds'." },
    ],
  },

  // ============================================================
  // rx-cam-26 — Space Debris and the Crowded Sky
  // ============================================================
  {
    id: "rx-cam-26",
    title: "Test 30 - Space Debris and the Crowded Sky",
    level: "Hard",
    durationMinutes: 20,
    passageTitle: "Space Debris and the Crowded Sky",
    passage:
`A. When the Soviet Union launched Sputnik in 1957, no one anticipated that low Earth orbit would eventually resemble a congested motorway. The first satellite was a polished metal sphere the size of a beach ball; today, more than 10,000 functional spacecraft share the same volume of space, together with an estimated 130 million fragments of debris larger than one millimetre. Most of the fragments will not decay naturally for decades or, in higher orbits, for centuries.

B. The physical danger from this debris is disproportionate to its size. At orbital velocities of around 28,000 kilometres per hour, a fragment weighing less than a gram carries more kinetic energy than a rifle bullet at close range. A collision between an operational satellite and a piece of debris the size of a marble is generally catastrophic. In 2009, the accidental collision of the Iridium 33 communications satellite with a defunct Russian military satellite produced more than 1,800 trackable fragments, most of which remain in orbit today.

C. Concern about a runaway chain reaction is not new. As early as 1978, the American engineer Donald Kessler warned that once debris density crossed a certain threshold, collisions themselves would generate further collisions, potentially rendering some orbital bands unusable for generations. The scenario, now known as the Kessler syndrome, remains hypothetical, but recent modelling suggests that parts of low Earth orbit are already close to the density at which cascading failure could begin.

D. Regulation has struggled to keep pace with launches. The Outer Space Treaty of 1967 assigned liability for damage to the state that launched an object, but it did not, and could not, foresee constellations of tens of thousands of small satellites operated by private companies. Modern guidelines, such as the 25-year post-mission deorbit rule adopted informally by many space agencies, have often been ignored in practice. Enforcement mechanisms across national jurisdictions remain weak.

E. Technical solutions to remove debris are being trialled. In 2022, a European Space Agency mission demonstrated a robotic arm that could capture a spent rocket stage the size of a car. Other proposals include tethered nets, high-powered ground-based lasers to slow debris slightly and hasten reentry, and self-consuming satellites designed to burn up completely on re-entry. Each proposal has its own set of technical and legal challenges, and none has yet been deployed at operational scale.

F. Perhaps the most important shift is the growing recognition that the problem cannot be managed one country at a time. Debris does not respect national boundaries; a Chinese fragment can destroy an Argentinian weather satellite. Recent proposals include a global registration system for all objects above a minimum size, standardised transponders for tracking, and a shared insurance mechanism to cover unavoidable collisions. Progress on these ideas is slow but visible.

G. The commercial pressure will not ease. Analysts project that more than 50,000 satellites could be in orbit by 2030, most in large communications constellations. Whether such numbers can coexist with safe operations depends less on any single technology than on the willingness of governments and operators to accept and enforce common rules. The next decade will determine whether low Earth orbit becomes a shared, well-governed resource or a slowly deteriorating one.`,
    questions: [
      { number: 1, type: "matching-headings", prompt: "Choose the best heading for Paragraph A.",
        headings: [
          { label: "i", text: "A congested orbit" },
          { label: "ii", text: "Kessler syndrome" },
          { label: "iii", text: "Debris removal" },
          { label: "iv", text: "Regulation lags behind" },
        ], answer: "i", explanation: "Paragraph A sets out how crowded orbit has become." },
      { number: 2, type: "matching-headings", prompt: "Choose the best heading for Paragraph B.",
        headings: [
          { label: "i", text: "Small pieces, huge damage" },
          { label: "ii", text: "Kessler syndrome" },
          { label: "iii", text: "Regulation lags behind" },
          { label: "iv", text: "Debris removal" },
        ], answer: "i", explanation: "Paragraph B focuses on the destructive kinetic energy of small fragments." },
      { number: 3, type: "matching-headings", prompt: "Choose the best heading for Paragraph C.",
        headings: [
          { label: "i", text: "Kessler syndrome" },
          { label: "ii", text: "A congested orbit" },
          { label: "iii", text: "International governance" },
          { label: "iv", text: "Debris removal" },
        ], answer: "i", explanation: "Paragraph C introduces and describes the Kessler scenario." },
      { number: 4, type: "matching-headings", prompt: "Choose the best heading for Paragraph D.",
        headings: [
          { label: "i", text: "Regulation lags behind launches" },
          { label: "ii", text: "Debris removal" },
          { label: "iii", text: "Kessler syndrome" },
          { label: "iv", text: "A congested orbit" },
        ], answer: "i", explanation: "Paragraph D is about the treaty and the 25-year rule." },
      { number: 5, type: "matching-headings", prompt: "Choose the best heading for Paragraph E.",
        headings: [
          { label: "i", text: "Debris removal" },
          { label: "ii", text: "Kessler syndrome" },
          { label: "iii", text: "International governance" },
          { label: "iv", text: "Regulation lags behind" },
        ], answer: "i", explanation: "Paragraph E surveys removal technologies." },
      { number: 6, type: "matching-headings", prompt: "Choose the best heading for Paragraph F.",
        headings: [
          { label: "i", text: "International governance" },
          { label: "ii", text: "Debris removal" },
          { label: "iii", text: "Small pieces, huge damage" },
          { label: "iv", text: "Kessler syndrome" },
        ], answer: "i", explanation: "Paragraph F is on the global registration and shared insurance ideas." },
      { number: 7, type: "multiple-choice", prompt: "Sputnik was launched in:",
        options: ["1947", "1957", "1967", "1977"], answer: "1957",
        explanation: "Paragraph A: 'Soviet Union launched Sputnik in 1957'." },
      { number: 8, type: "multiple-choice", prompt: "Estimated number of debris fragments larger than one millimetre is:",
        options: ["130 thousand", "1.3 million", "13 million", "130 million"], answer: "130 million",
        explanation: "Paragraph A: '130 million fragments'." },
      { number: 9, type: "multiple-choice", prompt: "The Iridium/Russian collision year was:",
        options: ["1999", "2004", "2009", "2014"], answer: "2009",
        explanation: "Paragraph B: 'In 2009'." },
      { number: 10, type: "multiple-choice", prompt: "Kessler proposed the cascade scenario in:",
        options: ["1958", "1968", "1978", "1988"], answer: "1978",
        explanation: "Paragraph C: 'As early as 1978'." },
      { number: 11, type: "multiple-choice", prompt: "The post-mission deorbit rule adopted informally by many agencies is:",
        options: ["5 years", "10 years", "25 years", "50 years"], answer: "25 years",
        explanation: "Paragraph D: '25-year post-mission deorbit rule'." },
      { number: 12, type: "fill-blank", prompt: "Orbital velocities are around _____ kilometres per hour.",
        answer: "28,000", explanation: "Paragraph B: 'orbital velocities of around 28,000 kilometres per hour'." },
      { number: 13, type: "fill-blank", prompt: "Analysts project more than _____ satellites in orbit by 2030.",
        answer: "50,000", explanation: "Paragraph G: 'more than 50,000 satellites'." },
    ],
  },
];
