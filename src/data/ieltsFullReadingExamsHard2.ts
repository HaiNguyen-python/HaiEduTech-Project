/**
 * @file ieltsFullReadingExamsHard2.ts
 * @description Wave 6 (part 2) - high-difficulty IELTS Academic Reading passages.
 *   Same specification as ieltsFullReadingExamsHard.ts: dense academic prose of
 *   850-950 words, answers scattered rather than sequential, and the full range
 *   of official Cambridge task types.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { ReadingExam } from "./ieltsFullReadingExams";

export const IELTS_FULL_READING_EXAMS_HARD2: ReadingExam[] = [
  // ============================================================
  // rx-hard-4 - Soft Defences
  // ============================================================
  {
    id: "rx-hard-4",
    title: "Test 34 - Soft Defences",
    level: "Hard",
    durationMinutes: 20,
    passageTitle: "Soft Defences: Rethinking the Coastal Wall",
    passage:
`A. For most of the twentieth century, coastal engineering in northern Europe proceeded from a single premise: the sea advances, and the correct response is a barrier. Sea walls, groynes and revetments were built to protect farmland and settlements, and where a wall failed it was replaced by a larger one. The premise was not unreasonable given the assets at risk, but it had a consequence that was understood only slowly. A hard vertical structure reflects wave energy rather than absorbing it, and the reflected energy scours the seabed at the foot of the wall. Over decades the beach in front of the defence is lowered, the wall is undermined, and the cost of the next intervention exceeds the cost of the last. Engineers describe this as coastal squeeze, and it is now regarded as the characteristic failure mode of hard defence rather than an occasional accident.

B. Salt marsh behaves in the opposite way. A marsh is a shallow platform of sediment held together by the roots of halophytic plants, crossed by a branching network of creeks. Waves entering it lose energy to friction against stems and to the tortuous path the water must follow, and measurements from the Essex coast in England indicate that a marsh eighty metres wide can reduce wave height by more than half before the water reaches any structure behind it. The system also responds to the conditions that threaten it. Sediment settles most readily where the water is slowest, which is on the marsh surface at high tide, so a marsh receiving an adequate sediment supply gains height as sea level rises. A concrete wall cannot do this. It is fixed at the elevation at which it was designed, and every centimetre of sea-level rise reduces its margin of safety.

C. The obvious question is why marshes were not used sooner, and the answer is partly historical. Coastal wetland in Europe was systematically drained for agriculture from the medieval period onwards, so that by 1900 the sequence of dune, marsh and dry land had been replaced in most places by a wall with fields directly behind it. Reversing this requires deliberately breaching an existing embankment and allowing the sea back onto reclaimed land, a procedure known as managed realignment. It is politically demanding in a way that building a wall is not, because the land to be surrendered has an owner, an agricultural value and frequently a long family association, whereas the benefit is diffuse and accrues largely to people living some distance inland.

D. Where realignment has been carried out, ecological recovery has been faster than sceptics predicted but less complete than advocates hoped. The site at Tollesbury in Essex, breached in 1995, developed extensive vegetation cover within a few years and now supports large numbers of wintering birds. Its sediment, however, remains lower and more compacted than that of the ancient marsh alongside it, because centuries of drainage caused the reclaimed soil to shrink and oxidise. As a result the site floods more deeply and drains more slowly than a natural marsh at the same tidal elevation, and its creek network is simpler. Twenty-five years is a short period in the formation of a marsh, and the honest conclusion is that recreated sites are functional but not equivalent.

E. Economic appraisal has nevertheless moved decisively in favour of the softer approach, for reasons that have little to do with ecology. A marsh requires no maintenance budget, whereas a sea wall requires inspection, repair and eventual replacement, and when those costs are projected over a century under plausible scenarios of sea-level rise the comparison is rarely close. Insurers have reached similar conclusions from their own data. The difficulty is one of accounting rather than arithmetic: the saving is spread over generations while the political cost of surrendering land is immediate, and the institutions that must bear the second are not those that will enjoy the first.

F. Not every coast can be defended in this way, and the enthusiasm of the last decade has sometimes obscured the conditions required. Marsh formation needs a supply of fine sediment, a tidal range within a particular band, and shelter from the largest waves; on a steep, sediment-starved or heavily urbanised shoreline these conditions are absent and no amount of planting will create them. Attempts to establish marsh on unsuitable frontages have produced expensive failures, and where a city stands at the water's edge there is no realistic alternative to engineering. The realistic claim is not that soft defence replaces hard defence but that the two are appropriate to different situations, and that for most of the twentieth century the harder option was applied indiscriminately to both.

G. What has changed most is the treatment of time. A wall is designed for a fixed period, after which it must be rebuilt to a higher specification, and each rebuild commits its successors to the same decision under worse conditions. A marsh, provided sediment continues to arrive, adjusts without a further decision being taken. In a century whose central characteristic is uncertainty about rates of change, a defence that responds to conditions has an advantage that no calculation of present cost captures, and it is this argument, rather than any concern for wintering birds, that has persuaded most of the agencies now funding the work.`,
    questions: [
      { number: 1, type: "matching-headings", prompt: "Choose the best heading for Paragraph A.",
        instruction: "Choose the correct heading from the list. There are more headings than paragraphs.",
        headings: [
          { label: "i", text: "How hard defences defeat themselves" },
          { label: "ii", text: "A marsh that grows upwards" },
          { label: "iii", text: "Where soft defence cannot work" },
          { label: "iv", text: "Costs spread across generations" },
        ], answer: "i",
        explanation: "Paragraph A explains reflection, scour and the escalating cost cycle of walls." },
      { number: 2, type: "matching-headings", prompt: "Choose the best heading for Paragraph B.",
        headings: [
          { label: "i", text: "A defence that adjusts itself" },
          { label: "ii", text: "How hard defences defeat themselves" },
          { label: "iii", text: "Twenty-five years is not long" },
          { label: "iv", text: "Draining the wetlands" },
        ], answer: "i",
        explanation: "Paragraph B contrasts a marsh that gains height with a wall fixed at its design elevation." },
      { number: 3, type: "matching-headings", prompt: "Choose the best heading for Paragraph C.",
        headings: [
          { label: "i", text: "Why the land is hard to give back" },
          { label: "ii", text: "A defence that adjusts itself" },
          { label: "iii", text: "The advantage of flexibility" },
          { label: "iv", text: "Evidence from Tollesbury" },
        ], answer: "i",
        explanation: "Paragraph C is about historical drainage and the political difficulty of managed realignment." },
      { number: 4, type: "matching-headings", prompt: "Choose the best heading for Paragraph F.",
        headings: [
          { label: "i", text: "The limits of the marsh solution" },
          { label: "ii", text: "Why the land is hard to give back" },
          { label: "iii", text: "An accounting problem" },
          { label: "iv", text: "A defence that adjusts itself" },
        ], answer: "i",
        explanation: "Paragraph F lists the physical conditions marsh formation requires and where engineering remains necessary." },
      { number: 5, type: "matching-headings", prompt: "Choose the best heading for Paragraph G.",
        headings: [
          { label: "i", text: "Designing for an uncertain century" },
          { label: "ii", text: "The limits of the marsh solution" },
          { label: "iii", text: "Recovery at a breached site" },
          { label: "iv", text: "How hard defences defeat themselves" },
        ], answer: "i",
        explanation: "Paragraph G argues the decisive advantage is responsiveness under uncertainty." },

      { number: 6, type: "tfng", prompt: "A salt marsh eighty metres wide was measured as cutting wave height by over 50 per cent.",
        instruction: "Do the following statements agree with the information in the passage? Write TRUE, FALSE or NOT GIVEN.",
        answer: "True",
        explanation: "Paragraph B cites Essex measurements of more than half." },
      { number: 7, type: "tfng", prompt: "The soil at Tollesbury sits at the same level and density as the neighbouring ancient marsh.",
        answer: "False",
        explanation: "Paragraph D: it 'remains lower and more compacted' because of past drainage." },
      { number: 8, type: "tfng", prompt: "Insurers have used their own records to reach conclusions similar to those of official appraisals.",
        answer: "True",
        explanation: "Paragraph E: 'Insurers have reached similar conclusions from their own data.'" },
      { number: 9, type: "ynng", prompt: "The writer believes soft defences should replace hard defences on all coastlines.",
        instruction: "Do the following statements agree with the views of the writer? Write YES, NO or NOT GIVEN.",
        answer: "No",
        explanation: "Paragraph F: the realistic claim is that the two suit different situations." },
      { number: 10, type: "ynng", prompt: "The writer thinks the ecological benefits are the main reason agencies now fund marsh restoration.",
        answer: "No",
        explanation: "Paragraph G: the persuasive argument is flexibility, 'rather than any concern for wintering birds'." },

      { number: 11, type: "matching-endings", prompt: "A concrete sea wall reflects wave energy and therefore",
        instruction: "Complete each sentence with the correct ending. There are more endings than sentences.",
        endings: [
          { label: "A", text: "lowers the beach in front of it." },
          { label: "B", text: "gains height as sea level rises." },
          { label: "C", text: "requires no maintenance budget." },
          { label: "D", text: "develops a branching creek network." },
          { label: "E", text: "shrinks and oxidises over centuries." },
        ], answer: "A",
        explanation: "Paragraph A: reflected energy scours the seabed and lowers the beach." },
      { number: 12, type: "matching-endings", prompt: "Soil on reclaimed agricultural land behind an embankment tends to",
        endings: [
          { label: "A", text: "lower the beach in front of it." },
          { label: "B", text: "gain height as sea level rises." },
          { label: "C", text: "require no maintenance budget." },
          { label: "D", text: "develop a branching creek network." },
          { label: "E", text: "shrink and oxidise over centuries." },
        ], answer: "E",
        explanation: "Paragraph D: centuries of drainage caused the reclaimed soil to shrink and oxidise." },

      { number: 13, type: "mcq-multi", prompt: "Which TWO physical conditions does the passage say marsh formation requires?",
        options: [
          "A supply of fine sediment",
          "A rocky, steeply shelving seabed",
          "Shelter from the largest waves",
          "Water temperatures above a fixed threshold",
          "Regular removal of vegetation",
        ],
        answers: ["A", "C"], answer: "A",
        explanation: "Paragraph F names fine sediment, a particular tidal range and shelter from the largest waves." },

      { number: 14, type: "fill-blank", prompt: "The self-defeating cycle in which a wall lowers the beach that protects it is known as coastal ____.",
        instruction: "Write ONE WORD ONLY from the passage.",
        answer: "squeeze",
        explanation: "Paragraph A: 'Engineers describe this as coastal squeeze'." },
    ],
  },

  // ============================================================
  // rx-hard-5 - The Function of Play
  // ============================================================
  {
    id: "rx-hard-5",
    title: "Test 35 - The Function of Play",
    level: "Hard",
    durationMinutes: 20,
    passageTitle: "The Function of Play",
    passage:
`A. Play is an awkward subject for evolutionary biology because it appears to violate the discipline's central expectation. Young animals engaged in it expend energy they could store, expose themselves to predators they could avoid, and sustain injuries that occasionally prove fatal. Estimates from field studies of several mammal species place the energetic cost of juvenile play at a few per cent of the daily budget, which is modest, but the risk of injury is not trivial and mortality attributable to play has been documented in seals and mountain goats. Behaviour with a measurable cost and no obvious product ought to have been eliminated. That it has instead persisted across mammals, birds and at least some reptiles and fish implies a benefit that has proved difficult to identify.

B. The first serious hypothesis, dominant for much of the twentieth century, held that play is practice. A kitten stalking a leaf is rehearsing the movements it will later use on prey; a young ungulate sparring with a sibling is training for adult contests. The proposal is intuitive and, for particular species, supported. It also faces an inconvenient body of evidence. Attempts to show that animals which played more became better hunters or more successful fighters have produced weak and inconsistent results, and in several experiments animals deprived of play opportunities but allowed normal exercise acquired adult skills perfectly well. Cats reared without the chance to play with objects hunt competently. If play were rehearsal, the correlation between practice and later performance should be considerably stronger than it is.

C. A second explanation shifts attention from the movements to the brain. Play tends to occur in exactly the period when neural connections are being formed and pruned in the cerebellum and cortex, and it declines when that process ends. On this account the function of play is not to learn any specific action but to generate varied sensory and motor input during a window when the developing nervous system is unusually responsive to it. The strongest evidence is experimental: rats reared in isolation, and thus deprived of social play, show measurable differences in the prefrontal cortex and behave inflexibly in tasks requiring the adjustment of a learned rule. They are not incapable; they are rigid, which is a different and more interesting deficit.

D. A third possibility, developed since the 1990s, is that play trains the management of losing control. Animals at play repeatedly and apparently deliberately put themselves at a disadvantage: they leap onto unstable surfaces, allow smaller partners to pin them, and adopt postures from which recovery is difficult. Marc Bekoff and others have argued that what is being practised is the physiological and emotional response to sudden disadvantage, so that an animal meeting a genuine emergency is not encountering the sensation for the first time. This hypothesis explains a feature the rehearsal account cannot: the deliberate self-handicapping that would be counterproductive if the point were to perfect a skill.

E. Social play adds a further dimension, because it can only continue if the participants restrain themselves. Bites are inhibited, larger animals reduce their force, and dominant individuals frequently allow themselves to be beaten by subordinates when the alternative is that the subordinate stops playing. Sequences are punctuated by signals whose function appears to be to mark what follows as non-serious: the canid play bow, the primate relaxed open-mouth face. Animals that ignore these conventions are excluded from future sessions, and among wolves individuals which repeatedly fail to modulate their behaviour occupy weaker positions in the adult hierarchy. The suggestion is that play is where the rules of cooperation are learned, and where an individual's reliability is assessed by others.

F. Two observations constrain any general theory. The first is that play is not uniformly distributed: it is most elaborate in species with large brains, extended juvenile periods and flexible foraging, and it is rudimentary or absent in species whose behaviour is largely fixed at birth. This pattern suggests that play is associated with the developmental strategy of learning rather than with any particular skill. The second is that play requires slack. Juveniles that are food-stressed, cold or ill stop playing before they stop other activities, and in populations under nutritional pressure play is among the first behaviours to disappear. Because it is abandoned so readily, some researchers have proposed using its frequency as an indicator of welfare in captive and farmed animals, a practical application that would have seemed remote when the behaviour was still regarded as a puzzle without a function.

G. The likely resolution is that the search for a single function was misconceived. Play in a wolf, an octopus and a raven may share a superficial description without sharing a mechanism, and even within one species it may deliver several unrelated benefits, none individually large enough to have been detected by the studies that looked for one. Small advantages in flexibility, emotional regulation and social standing, accumulated over a long juvenile period, would be sufficient to maintain the behaviour while remaining almost invisible to any experiment designed around a single outcome.`,
    questions: [
      { number: 1, type: "matching-headings", prompt: "Choose the best heading for Paragraph B.",
        instruction: "Choose the correct heading from the list. There are more headings than paragraphs.",
        headings: [
          { label: "i", text: "Rehearsal and its difficulties" },
          { label: "ii", text: "Learning to lose control" },
          { label: "iii", text: "Play as a measure of welfare" },
          { label: "iv", text: "Costs without an obvious product" },
        ], answer: "i",
        explanation: "Paragraph B sets out the practice hypothesis and the evidence against it." },
      { number: 2, type: "matching-headings", prompt: "Choose the best heading for Paragraph C.",
        headings: [
          { label: "i", text: "Input for a developing brain" },
          { label: "ii", text: "Rehearsal and its difficulties" },
          { label: "iii", text: "Restraint among partners" },
          { label: "iv", text: "Several small benefits" },
        ], answer: "i",
        explanation: "Paragraph C describes play as varied input during a period of neural development." },
      { number: 3, type: "matching-headings", prompt: "Choose the best heading for Paragraph E.",
        headings: [
          { label: "i", text: "Learning the rules of cooperation" },
          { label: "ii", text: "Input for a developing brain" },
          { label: "iii", text: "Which species play most" },
          { label: "iv", text: "Deliberate self-handicapping" },
        ], answer: "i",
        explanation: "Paragraph E is about restraint, play signals and social reputation." },
      { number: 4, type: "matching-headings", prompt: "Choose the best heading for Paragraph F.",
        headings: [
          { label: "i", text: "Two limits on any theory" },
          { label: "ii", text: "Learning the rules of cooperation" },
          { label: "iii", text: "An expensive puzzle" },
          { label: "iv", text: "Input for a developing brain" },
        ], answer: "i",
        explanation: "Paragraph F presents the uneven distribution of play and its dependence on slack." },
      { number: 5, type: "matching-headings", prompt: "Choose the best heading for Paragraph G.",
        headings: [
          { label: "i", text: "Why one answer was never likely" },
          { label: "ii", text: "Two limits on any theory" },
          { label: "iii", text: "Rehearsal and its difficulties" },
          { label: "iv", text: "Play in captivity" },
        ], answer: "i",
        explanation: "Paragraph G argues the search for a single function was misconceived." },

      { number: 6, type: "tfng", prompt: "Deaths caused by play have been recorded in more than one species.",
        instruction: "Do the following statements agree with the information in the passage? Write TRUE, FALSE or NOT GIVEN.",
        answer: "True",
        explanation: "Paragraph A cites documented mortality in seals and mountain goats." },
      { number: 7, type: "tfng", prompt: "Cats prevented from playing with objects are unable to hunt as adults.",
        answer: "False",
        explanation: "Paragraph B: such cats 'hunt competently'." },
      { number: 8, type: "tfng", prompt: "Rats deprived of social play are unable to learn any new rule.",
        answer: "False",
        explanation: "Paragraph C: 'They are not incapable; they are rigid.'" },
      { number: 9, type: "tfng", prompt: "Play is usually the last activity a food-stressed juvenile gives up.",
        answer: "False",
        explanation: "Paragraph F: they 'stop playing before they stop other activities'." },
      { number: 10, type: "ynng", prompt: "The writer thinks studies designed around a single outcome were likely to miss the benefits of play.",
        instruction: "Does the statement agree with the views of the writer? Write YES, NO or NOT GIVEN.",
        answer: "Yes",
        explanation: "Paragraph G: small accumulated advantages would remain 'almost invisible' to such experiments." },

      { number: 11, type: "matching-features", prompt: "Explains why animals at play deliberately put themselves at a disadvantage.",
        instruction: "Match each statement with the correct hypothesis.",
        features: [
          { label: "A", text: "Play as rehearsal of adult skills" },
          { label: "B", text: "Play as input for brain development" },
          { label: "C", text: "Play as training for loss of control" },
          { label: "D", text: "Play as an indicator of welfare" },
        ], answer: "C",
        explanation: "Paragraph D: self-handicapping fits the loss-of-control account, not rehearsal." },
      { number: 12, type: "matching-features", prompt: "Supported by experiments showing altered prefrontal cortex in isolated animals.",
        features: [
          { label: "A", text: "Play as rehearsal of adult skills" },
          { label: "B", text: "Play as input for brain development" },
          { label: "C", text: "Play as training for loss of control" },
          { label: "D", text: "Play as an indicator of welfare" },
        ], answer: "B",
        explanation: "Paragraph C reports the isolated-rat experiments." },

      { number: 13, type: "mcq-multi", prompt: "According to Paragraph F, which TWO characteristics are associated with elaborate play?",
        options: [
          "Large brains relative to body size",
          "Behaviour that is largely fixed at birth",
          "A long juvenile period",
          "Solitary adult life",
          "A strictly seasonal diet",
        ],
        answers: ["A", "C"], answer: "A",
        explanation: "Paragraph F: large brains, extended juvenile periods and flexible foraging." },

      { number: 14, type: "fill-blank", prompt: "In canids, the signal that marks the behaviour which follows as non-serious is called the play ____.",
        instruction: "Write ONE WORD ONLY from the passage.",
        answer: "bow",
        explanation: "Paragraph E: 'the canid play bow'." },
    ],
  },

  // ============================================================
  // rx-hard-6 - The Tin Problem
  // ============================================================
  {
    id: "rx-hard-6",
    title: "Test 36 - The Tin Problem",
    level: "Hard",
    durationMinutes: 20,
    passageTitle: "The Tin Problem",
    passage:
`A. Bronze is an alloy, and that simple fact created the first long-distance trading system in European history. Copper is comparatively widespread and was worked in the Balkans and Anatolia from the fifth millennium BC. Tin is not. Workable tin deposits are geologically rare and are concentrated in a small number of regions: Cornwall and Brittany in the west, the Erzgebirge of central Europe, and a belt running through Afghanistan and Central Asia. Yet from roughly 2000 BC objects containing about ten per cent tin appear across the eastern Mediterranean, a region with no significant tin of its own. Every bronze sword in a Mycenaean grave therefore implies a supply chain of at least two thousand kilometres, maintained across political boundaries by people who left almost no written record of how it worked.

B. For most of the twentieth century the question was pursued through documents, and the documents are tantalising. Cuneiform tablets from Kanesh in Anatolia, dating to the nineteenth century BC, record merchants moving tin northwards from Assur in exchange for textiles, with quantities, prices and complaints about quality preserved in extraordinary detail. Egyptian and Ugaritic texts mention tin as a commodity of state. What none of these sources supplies is an origin. The tablets name the intermediaries but not the mines, and the phrase generally rendered as coming from the east could describe anywhere between Iran and the Himalayas. Historians were left with a well-documented distribution system attached to an unknown source.

C. The natural response was chemistry, and it disappointed for a long time. Trace-element analysis of bronze artefacts had limited value because the smelting process itself alters the mixture and because ancient metal was extensively recycled: an object may combine metal from several sources and several centuries. Lead isotope analysis, which had succeeded brilliantly for copper and silver, worked poorly on tin because the isotopic variation between tin deposits is small relative to the analytical error. For several decades the field was in the frustrating position of having a clear question, abundant material and no method capable of connecting the two.

D. The situation changed with the refinement of tin isotope measurement, and the first results were not what most specialists had predicted. Analyses published from 2019 onwards of tin ingots recovered from shipwrecks off the coast of Israel, together with material from Turkey and Greece, indicated that a substantial proportion of the tin reaching the eastern Mediterranean in the late second millennium BC was compatible with sources in Cornwall and Devon. The eastern route through Central Asia had been the orthodox assumption for a century, largely because the textual evidence pointed that way and because the geographical alternative seemed implausibly remote. The isotopic data did not eliminate the eastern supply, but they established that a western one operated alongside it on a serious scale.

E. Interpreting this requires care of a kind that headlines rarely allow. An isotopic signature is consistent with a source; it does not prove that a particular ingot was mined there, since deposits in different regions can overlap in signature and the reference database for ancient tin remains thin. Nor does a British origin imply direct contact. The plausible mechanism is a relay in which metal passed through many hands, each transaction covering a few hundred kilometres, with no participant possessing knowledge of the whole route. This is precisely the pattern reconstructed for amber and for Baltic goods, and it is consistent with the absence of Mediterranean material in Cornwall, which had puzzled earlier scholars who expected direct exchange to leave a mirror image.

F. The economic implications are more interesting than the geographical ones. Copper could be obtained locally by most Bronze Age societies; tin could not, and control of tin therefore represented a form of leverage available to whoever sat on a route rather than a mine. Several archaeologists have argued that the collapse of the eastern Mediterranean palace economies around 1200 BC is best understood partly in these terms. The states that fell were those whose military technology depended on an imported material they did not produce, and whose supply passed through territories they did not govern. The subsequent adoption of iron, a metal of mediocre quality in early smelting but available almost everywhere, can be read as a response to that vulnerability rather than as a straightforward technological advance.

G. The tin problem remains unsolved in its details, and it illustrates a general condition of prehistoric research. Three independent bodies of evidence, textual, archaeological and isotopic, each point clearly in a direction, and the directions do not fully coincide. The temptation is to privilege whichever body of evidence is newest, and the more defensible position is to treat the disagreement itself as information: it indicates a system with multiple sources operating simultaneously, whose relative importance shifted over centuries in ways that no single method will recover on its own.`,
    questions: [
      { number: 1, type: "matching-headings", prompt: "Choose the best heading for Paragraph A.",
        instruction: "Choose the correct heading from the list. There are more headings than paragraphs.",
        headings: [
          { label: "i", text: "A rare metal and a long journey" },
          { label: "ii", text: "Documents without an origin" },
          { label: "iii", text: "Why the chemistry failed" },
          { label: "iv", text: "The turn to iron" },
        ], answer: "i",
        explanation: "Paragraph A establishes the rarity of tin and the distances implied." },
      { number: 2, type: "matching-headings", prompt: "Choose the best heading for Paragraph B.",
        headings: [
          { label: "i", text: "Detailed records, unknown mines" },
          { label: "ii", text: "A rare metal and a long journey" },
          { label: "iii", text: "A relay of many hands" },
          { label: "iv", text: "Disagreement as information" },
        ], answer: "i",
        explanation: "Paragraph B: the tablets record trade in detail but never name a source." },
      { number: 3, type: "matching-headings", prompt: "Choose the best heading for Paragraph C.",
        headings: [
          { label: "i", text: "Methods that could not answer the question" },
          { label: "ii", text: "Detailed records, unknown mines" },
          { label: "iii", text: "An unexpected western source" },
          { label: "iv", text: "Leverage over a route" },
        ], answer: "i",
        explanation: "Paragraph C explains why trace-element and lead isotope analysis both failed for tin." },
      { number: 4, type: "matching-headings", prompt: "Choose the best heading for Paragraph F.",
        headings: [
          { label: "i", text: "Dependence and collapse" },
          { label: "ii", text: "Methods that could not answer the question" },
          { label: "iii", text: "Cautions about isotopic evidence" },
          { label: "iv", text: "A rare metal and a long journey" },
        ], answer: "i",
        explanation: "Paragraph F links reliance on imported tin to the palace collapses and the shift to iron." },
      { number: 5, type: "matching-headings", prompt: "Choose the best heading for Paragraph G.",
        headings: [
          { label: "i", text: "When the evidence does not agree" },
          { label: "ii", text: "Dependence and collapse" },
          { label: "iii", text: "An unexpected western source" },
          { label: "iv", text: "Detailed records, unknown mines" },
        ], answer: "i",
        explanation: "Paragraph G treats the disagreement between three bodies of evidence as informative." },

      { number: 6, type: "tfng", prompt: "The Kanesh tablets identify the mines from which the tin was extracted.",
        instruction: "Do the following statements agree with the information in the passage? Write TRUE, FALSE or NOT GIVEN.",
        answer: "False",
        explanation: "Paragraph B: 'The tablets name the intermediaries but not the mines.'" },
      { number: 7, type: "tfng", prompt: "Lead isotope analysis had already proved useful for studying copper and silver objects.",
        answer: "True",
        explanation: "Paragraph C: it 'had succeeded brilliantly for copper and silver'." },
      { number: 8, type: "tfng", prompt: "The isotopic results showed that tin from Central Asia never reached the Mediterranean.",
        answer: "False",
        explanation: "Paragraph D: the data 'did not eliminate the eastern supply'." },
      { number: 9, type: "tfng", prompt: "Mediterranean objects have been found in quantity at Cornish sites.",
        answer: "False",
        explanation: "Paragraph E refers to 'the absence of Mediterranean material in Cornwall'." },
      { number: 10, type: "ynng", prompt: "The writer thinks the newest form of evidence should be given priority over the others.",
        instruction: "Does the statement agree with the views of the writer? Write YES, NO or NOT GIVEN.",
        answer: "No",
        explanation: "Paragraph G calls that a 'temptation' and prefers treating the disagreement as information." },

      { number: 11, type: "matching-features", prompt: "Recorded prices, quantities and complaints about the quality of the metal.",
        instruction: "Match each description with the correct body of evidence.",
        features: [
          { label: "A", text: "The Kanesh cuneiform tablets" },
          { label: "B", text: "Shipwreck tin ingots analysed from 2019" },
          { label: "C", text: "Lead isotope analysis" },
          { label: "D", text: "Comparisons with the amber trade" },
        ], answer: "A",
        explanation: "Paragraph B describes the level of commercial detail in the tablets." },
      { number: 12, type: "matching-features", prompt: "Provided the model of exchange in which no participant knew the whole route.",
        features: [
          { label: "A", text: "The Kanesh cuneiform tablets" },
          { label: "B", text: "Shipwreck tin ingots analysed from 2019" },
          { label: "C", text: "Lead isotope analysis" },
          { label: "D", text: "Comparisons with the amber trade" },
        ], answer: "D",
        explanation: "Paragraph E: the relay pattern is the one reconstructed for amber and Baltic goods." },

      { number: 13, type: "mcq-multi", prompt: "Which TWO reasons does the passage give for the long dominance of the eastern-route theory?",
        options: [
          "The written sources pointed in that direction.",
          "Tin deposits in Cornwall were unknown to archaeologists.",
          "A western origin appeared geographically implausible.",
          "Isotopic analysis had confirmed an Afghan source.",
          "No shipwrecks had been excavated in the Mediterranean.",
        ],
        answers: ["A", "C"], answer: "A",
        explanation: "Paragraph D: the textual evidence pointed east and the alternative 'seemed implausibly remote'." },

      { number: 14, type: "fill-blank", prompt: "The passage says early iron was of mediocre quality but was available almost ____.",
        instruction: "Write ONE WORD ONLY from the passage.",
        answer: "everywhere",
        explanation: "Paragraph F: 'available almost everywhere'." },
    ],
  },
];
