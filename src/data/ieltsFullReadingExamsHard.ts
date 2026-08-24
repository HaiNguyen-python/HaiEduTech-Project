/**
 * @file ieltsFullReadingExamsHard.ts
 * @description Wave 6 - high-difficulty IELTS Academic Reading passages written
 *   to Cambridge "Passage 3" specification: 850-950 words of dense academic
 *   prose, answers deliberately NOT in passage order, and the full range of
 *   official task types (matching headings with distractors, TFNG, YNNG,
 *   matching features, matching sentence endings, summary completion with a
 *   word bank, and multi-select multiple choice).
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { ReadingExam } from "./ieltsFullReadingExams";

export const IELTS_FULL_READING_EXAMS_HARD: ReadingExam[] = [
  // ============================================================
  // rx-hard-1 - The Economics of Extinction
  // ============================================================
  {
    id: "rx-hard-1",
    title: "Hard Test 1 - The Economics of Extinction",
    level: "Hard",
    durationMinutes: 20,
    passageTitle: "The Economics of Extinction",
    passage:
`A. Conservation has traditionally been argued for in moral terms. Species, the argument runs, possess a value that is independent of any use human beings might make of them, and the deliberate elimination of a lineage that took millions of years to assemble is therefore indefensible whatever the accounting. Since the late 1990s, however, a second and rather different vocabulary has come to dominate policy documents. Forests are described as carbon stores, wetlands as flood-defence infrastructure, and pollinating insects as an input to agricultural production with a calculable annual value. The shift is not merely rhetorical. It reflects a judgement, made by conservationists themselves, that arguments framed in the language of finance ministries are more likely to survive contact with a national budget than arguments framed in the language of ethics.

B. The intellectual foundation of this approach is the concept of the ecosystem service. In its simplest form, the idea holds that natural systems perform functions which, if they ceased, would have to be replaced at some cost. New York City's decision in the 1990s to protect the Catskill watershed rather than build a filtration plant is the example cited in almost every textbook: watershed protection was estimated at roughly one billion dollars against six to eight billion for the engineered alternative. The comparison was persuasive precisely because it required no appeal to the intrinsic worth of a forest. It simply observed that the forest was the cheaper machine.

C. Critics have pressed two objections, and they are not the same objection. The first is technical. Valuations of this kind depend on assumptions about substitution, discount rates and future prices that are, at best, uncertain, and small changes to those assumptions can move the headline figure by an order of magnitude. The second objection is deeper and concerns what economists call crowding out. If a marsh is defended on the ground that it saves a certain sum in flood damage, then the defence collapses the moment someone demonstrates that a concrete barrier would save more. Worse, there is experimental evidence from behavioural research that introducing monetary framing can weaken the non-monetary motivations people already hold, so that the argument may leave conservation with fewer supporters than it began with.

D. Where the framework has been implemented at scale, the results have been mixed in instructive ways. Costa Rica's payments for environmental services, established in 1997, channel revenue from a fuel tax to landowners who maintain forest cover. Forest area in the country has risen substantially since the programme began, and it is routinely presented as the model case. Careful evaluations, however, suggest that a considerable share of enrolled land would not have been cleared in any event, because it was steep, remote or legally protected already. The programme's measurable additional effect on deforestation, as distinct from its total payments, is therefore smaller than the aggregate statistics imply. This does not make it a failure; it makes it an expensive success whose true price per hectare saved is higher than advertised.

E. Markets in biodiversity offsets raise sharper difficulties. Under an offset scheme, a developer who destroys habitat in one place funds its restoration or protection somewhere else, on the assumption that the two are equivalent. The assumption is rarely examined. A drained fen that has taken eight thousand years to form its peat is not reproduced by planting reeds on a former field, however carefully the areas are matched on paper. Regulators have responded by demanding multipliers, so that two or three hectares must be created for every hectare lost, but multipliers manage the arithmetic rather than the ecology. Long-term monitoring of restored wetlands in the United States has found that a majority fail to reach the hydrological and species targets set for them, and that failures are typically discovered only after the compensating development is complete and irreversible.

F. A more radical response accepts the economics but rejects the market. On this view, the appropriate use of valuation is not to generate tradable units but to correct the systematic bias in how public decisions are made. Cost-benefit analysis of a road scheme will count the time saved by motorists, because those benefits are easily monetised, while omitting the loss of a hedgerow network, because it is not. The remedy is to place a defensible number in the empty column so that the comparison is at least complete. Whether that number is subsequently traded is a separate question, and one that can be answered in the negative without abandoning the analysis.

G. What has become clear over three decades is that the two vocabularies are not interchangeable and do not do the same work. Economic argument is effective in the narrow band of cases where a service is measurable, local and threatened by an alternative that can be priced. It performs poorly where the value at stake is aesthetic, cultural or simply unknown, which describes most of the species on the planet. The species least likely to survive the century are, almost by definition, those whose contribution to human welfare nobody has yet been able to quantify. For them, the older and less fashionable argument remains the only one available, and its neglect during the years when it was thought insufficiently practical may prove to have been costly.`,
    questions: [
      { number: 1, type: "matching-headings", prompt: "Choose the best heading for Paragraph C.",
        instruction: "Choose the correct heading from the list. There are more headings than paragraphs.",
        headings: [
          { label: "i", text: "Two separate lines of criticism" },
          { label: "ii", text: "A change in the language of policy" },
          { label: "iii", text: "The limits of the economic case" },
          { label: "iv", text: "Substituting one habitat for another" },
        ], answer: "i",
        explanation: "Paragraph C explicitly distinguishes a technical objection from the deeper crowding-out objection." },
      { number: 2, type: "matching-headings", prompt: "Choose the best heading for Paragraph F.",
        headings: [
          { label: "i", text: "Valuation without trading" },
          { label: "ii", text: "A national scheme reassessed" },
          { label: "iii", text: "The origin of ecosystem services" },
          { label: "iv", text: "Two separate lines of criticism" },
        ], answer: "i",
        explanation: "Paragraph F accepts valuation but argues it should correct bias in public decisions rather than create tradable units." },
      { number: 3, type: "matching-headings", prompt: "Choose the best heading for Paragraph G.",
        headings: [
          { label: "i", text: "Where each argument works" },
          { label: "ii", text: "Valuation without trading" },
          { label: "iii", text: "How offsets are regulated" },
          { label: "iv", text: "A cheaper machine" },
        ], answer: "i",
        explanation: "Paragraph G sets out the narrow band where economic argument works and where the moral argument remains the only option." },
      { number: 4, type: "matching-headings", prompt: "Choose the best heading for Paragraph B.",
        headings: [
          { label: "i", text: "The idea of the ecosystem service" },
          { label: "ii", text: "Where each argument works" },
          { label: "iii", text: "Monitoring restored wetlands" },
          { label: "iv", text: "The moral tradition" },
        ], answer: "i",
        explanation: "Paragraph B introduces the concept and illustrates it with the Catskill watershed." },
      { number: 5, type: "matching-headings", prompt: "Choose the best heading for Paragraph E.",
        headings: [
          { label: "i", text: "Trading habitat for habitat" },
          { label: "ii", text: "The idea of the ecosystem service" },
          { label: "iii", text: "Costa Rica reconsidered" },
          { label: "iv", text: "Where each argument works" },
        ], answer: "i",
        explanation: "Paragraph E is about biodiversity offsets, in which destroyed habitat is exchanged for habitat elsewhere." },

      { number: 6, type: "ynng", prompt: "The writer believes conservationists adopted economic language because they thought it would be more politically effective.",
        instruction: "Do the following statements agree with the views of the writer? Write YES, NO or NOT GIVEN.",
        answer: "Yes",
        explanation: "Paragraph A: arguments framed in the language of finance ministries are 'more likely to survive contact with a national budget'." },
      { number: 7, type: "ynng", prompt: "The writer considers biodiversity offset multipliers an adequate solution to the problem of habitat equivalence.",
        answer: "No",
        explanation: "Paragraph E states that 'multipliers manage the arithmetic rather than the ecology'." },
      { number: 8, type: "ynng", prompt: "The writer thinks the Costa Rican programme should be discontinued.",
        answer: "Not Given",
        explanation: "The writer calls it 'an expensive success' but never recommends ending it." },
      { number: 9, type: "tfng", prompt: "Protecting the Catskill watershed was estimated to cost less than one sixth of the engineered alternative.",
        instruction: "Do the following statements agree with the information in the passage? Write TRUE, FALSE or NOT GIVEN.",
        answer: "False",
        explanation: "One billion against six to eight billion is roughly one sixth to one eighth, so 'less than one sixth' is not supported for the lower estimate of six billion." },
      { number: 10, type: "tfng", prompt: "Most restored wetlands studied over the long term in the United States met the targets set for them.",
        answer: "False",
        explanation: "Paragraph E: 'a majority fail to reach the hydrological and species targets set for them'." },

      { number: 11, type: "matching-features", prompt: "Careful evaluation showed the true cost per hectare of protection was higher than the headline figures suggested.",
        instruction: "Match each statement with the example it describes.",
        features: [
          { label: "A", text: "The Catskill watershed decision" },
          { label: "B", text: "Costa Rica's payments for environmental services" },
          { label: "C", text: "Wetland restoration under offset schemes" },
          { label: "D", text: "Cost-benefit analysis of road schemes" },
        ], answer: "B",
        explanation: "Paragraph D: much enrolled land was not under threat, so the additional effect per payment was smaller." },
      { number: 12, type: "matching-features", prompt: "Benefits that are easy to express in money are counted while others are left out altogether.",
        features: [
          { label: "A", text: "The Catskill watershed decision" },
          { label: "B", text: "Costa Rica's payments for environmental services" },
          { label: "C", text: "Wetland restoration under offset schemes" },
          { label: "D", text: "Cost-benefit analysis of road schemes" },
        ], answer: "D",
        explanation: "Paragraph F: motorists' time savings are counted, hedgerow losses omitted." },

      { number: 13, type: "mcq-multi", prompt: "Which TWO weaknesses of monetary valuation are identified in the passage?",
        options: [
          "Results shift dramatically with changes to technical assumptions.",
          "Governments are legally prevented from using such figures.",
          "Monetary framing can weaken people's existing non-financial motivations.",
          "Ecologists are unable to identify which services a habitat provides.",
          "The method cannot be applied to forests.",
        ],
        answers: ["A", "C"], answer: "A",
        explanation: "Paragraph C gives the sensitivity of assumptions and the crowding out of non-monetary motivation." },

      { number: 14, type: "fill-blank", prompt: "According to the final paragraph, the species least likely to survive the century are those whose contribution to human welfare nobody has been able to ____.",
        instruction: "Write ONE WORD ONLY from the passage.",
        answer: "quantify",
        explanation: "Paragraph G: 'those whose contribution to human welfare nobody has yet been able to quantify'." },
    ],
  },

  // ============================================================
  // rx-hard-2 - Reading the Rings
  // ============================================================
  {
    id: "rx-hard-2",
    title: "Hard Test 2 - Reading the Rings",
    level: "Hard",
    durationMinutes: 20,
    passageTitle: "Reading the Rings",
    passage:
`A. Every temperate tree keeps a record of its own life. In spring, when water is plentiful, the cambium produces large, thin-walled cells; as the season closes it produces smaller, denser ones, and the boundary between the dark late wood of one year and the pale early wood of the next appears to the eye as a ring. The elementary observation that these rings are annual was made repeatedly from antiquity onwards, and Leonardo da Vinci noted that their widths varied with the wetness of the seasons. What none of these observers achieved was a method for turning the observation into a dating instrument, because a single tree records only its own lifetime, and an isolated timber from a ruin carries no label saying when its first ring was formed.

B. The solution arrived from an unexpected direction. Andrew Ellicott Douglass was an astronomer, employed in Arizona at the beginning of the twentieth century, and his interest in tree rings was originally a search for a terrestrial record of the sunspot cycle. Working with pines around Flagstaff, he noticed that the sequence of wide and narrow rings was not idiosyncratic but shared: trees separated by many kilometres showed the same distinctive pattern of good and bad years, because they were responding to the same regional climate. From this followed the technique on which the whole discipline rests. If the pattern in a living tree overlaps with the pattern in the outer rings of an older beam, and that beam's inner rings overlap with a still older one, the sequence can be extended backwards indefinitely. Douglass called the procedure cross-dating, and by 1929 he had used it to place the construction of a series of pueblos in the American Southwest to the exact year.

C. Precision of that kind transformed archaeology, but it also imposed a discipline that other dating methods do not require. Radiocarbon dating yields a probability distribution and can be applied to almost any organic material; dendrochronology yields a calendar year or nothing at all. It works only where a species lays down one clear ring per year, which excludes most tropical timber, and only where a regional reference chronology has already been assembled, which takes decades of collecting. A timber may also be undatable simply because the carpenter trimmed away the outer rings, so the felling date can be given only as "after" some year. Practitioners are correspondingly cautious about the sequences they will accept, and the statistical thresholds used to declare a match are conservative by the standards of most sciences.

D. Once long chronologies existed, they began to answer questions their builders had not asked. European oak sequences, assembled from building timbers, bog oaks and archaeological finds, now run continuously for more than ten thousand years, and they show intervals in which growth collapsed across the whole continent. One such interval begins in the year 536, when trees from Ireland to Siberia laid down almost nothing for a decade. Written sources from the Mediterranean to China describe a dimmed sun in the same years, and ice cores contain sulphate layers consistent with major volcanic eruptions. The rings did not by themselves explain the event, but they dated it precisely enough to make the other evidence comparable, which is often the more valuable contribution.

E. The relationship with radiocarbon dating turned out to be reciprocal rather than competitive. Because a ring can be assigned to a known year, its carbon content records the atmospheric ratio of carbon isotopes for that year. Measuring thousands of individually dated rings produced the calibration curves without which raw radiocarbon measurements cannot be converted into calendar dates at all. In this sense every radiocarbon date published today rests on tree rings, a dependence that is rarely visible in the reported result. The curve also revealed sudden single-year spikes in atmospheric carbon-14, now attributed to extreme solar events, which have themselves become dating markers for wood that lacks a long enough ring sequence to cross-date conventionally.

F. Climate reconstruction is the application that now attracts most funding, and it is the one that requires most care. Ring width responds to whichever factor is most limiting at a site: at the cold treeline that factor is summer temperature, in a semi-arid basin it is rainfall. Chronologies for temperature reconstruction are therefore built from marginal sites where trees are visibly struggling, not from comfortable ones where growth is limited by nothing in particular. Even then a tree's response is not fixed for life. A stand released by the felling of its neighbours will grow rapidly for reasons that have nothing to do with climate, and old trees generally add narrower rings simply because the same volume of wood is spread around a wider trunk. Removing these effects requires statistical procedures whose assumptions have been the subject of prolonged and sometimes bitter argument.

G. The field's reputation now rests on an unusual combination of qualities. It is capable of absolute precision, which is rare, and it is also capable of being definitively wrong, which is rarer still and considerably more useful. A proposed date either matches an independent chronology at an acceptable statistical level or it does not, and the wood can be measured again by someone else. Few methods in the historical sciences are so exposed.`,
    questions: [
      { number: 1, type: "matching-headings", prompt: "Choose the best heading for Paragraph B.",
        instruction: "Choose the correct heading from the list. There are more headings than paragraphs.",
        headings: [
          { label: "i", text: "An astronomer's accidental method" },
          { label: "ii", text: "What a single tree cannot tell us" },
          { label: "iii", text: "Reconstructing past climate" },
          { label: "iv", text: "Two methods that need each other" },
        ], answer: "i",
        explanation: "Paragraph B describes Douglass, an astronomer looking for sunspot records, who devised cross-dating." },
      { number: 2, type: "matching-headings", prompt: "Choose the best heading for Paragraph C.",
        headings: [
          { label: "i", text: "The strict conditions for success" },
          { label: "ii", text: "An astronomer's accidental method" },
          { label: "iii", text: "A decade without growth" },
          { label: "iv", text: "How rings are formed" },
        ], answer: "i",
        explanation: "Paragraph C lists the limits: annual rings, existing chronologies, trimmed timbers, conservative thresholds." },
      { number: 3, type: "matching-headings", prompt: "Choose the best heading for Paragraph E.",
        headings: [
          { label: "i", text: "A hidden dependence" },
          { label: "ii", text: "The strict conditions for success" },
          { label: "iii", text: "Arguments about statistics" },
          { label: "iv", text: "Dating the pueblos" },
        ], answer: "i",
        explanation: "Paragraph E explains that every radiocarbon date rests on tree rings, 'a dependence that is rarely visible'." },
      { number: 4, type: "matching-headings", prompt: "Choose the best heading for Paragraph F.",
        headings: [
          { label: "i", text: "Choosing difficult sites" },
          { label: "ii", text: "A hidden dependence" },
          { label: "iii", text: "The record inside the trunk" },
          { label: "iv", text: "A method that can be disproved" },
        ], answer: "i",
        explanation: "Paragraph F argues chronologies must come from marginal sites where a single factor limits growth." },
      { number: 5, type: "matching-headings", prompt: "Choose the best heading for Paragraph G.",
        headings: [
          { label: "i", text: "A method that can be disproved" },
          { label: "ii", text: "Choosing difficult sites" },
          { label: "iii", text: "The volcanic winter of 536" },
          { label: "iv", text: "What a single tree cannot tell us" },
        ], answer: "i",
        explanation: "Paragraph G stresses that the method is 'capable of being definitively wrong', and open to independent re-measurement." },

      { number: 6, type: "tfng", prompt: "Leonardo da Vinci recognised a connection between ring width and rainfall.",
        instruction: "Do the following statements agree with the information in the passage? Write TRUE, FALSE or NOT GIVEN.",
        answer: "True",
        explanation: "Paragraph A: he 'noted that their widths varied with the wetness of the seasons'." },
      { number: 7, type: "tfng", prompt: "Douglass began studying tree rings in order to date archaeological sites.",
        answer: "False",
        explanation: "His original aim was to find a terrestrial record of the sunspot cycle; the dating application followed." },
      { number: 8, type: "tfng", prompt: "European oak chronologies are now longer than ten thousand years.",
        answer: "True",
        explanation: "Paragraph D: they 'run continuously for more than ten thousand years'." },
      { number: 9, type: "tfng", prompt: "Tree rings alone established the cause of the events of 536.",
        answer: "False",
        explanation: "Paragraph D: 'The rings did not by themselves explain the event'; ice cores and written sources supplied the cause." },
      { number: 10, type: "ynng", prompt: "The writer regards the possibility of being proved wrong as a strength of dendrochronology.",
        instruction: "Does the statement agree with the views of the writer? Write YES, NO or NOT GIVEN.",
        answer: "Yes",
        explanation: "Paragraph G calls being definitively wrong 'considerably more useful'." },

      { number: 11, type: "matching-endings", prompt: "Ring width at a cold treeline site is used to reconstruct",
        instruction: "Complete each sentence with the correct ending. There are more endings than sentences.",
        endings: [
          { label: "A", text: "summer temperature." },
          { label: "B", text: "annual rainfall." },
          { label: "C", text: "the felling date of a beam." },
          { label: "D", text: "atmospheric carbon isotope ratios." },
          { label: "E", text: "the age of the surrounding stand." },
        ], answer: "A",
        explanation: "Paragraph F: at the cold treeline the limiting factor is summer temperature." },
      { number: 12, type: "matching-endings", prompt: "The carbon content of an individually dated ring is used to reconstruct",
        endings: [
          { label: "A", text: "summer temperature." },
          { label: "B", text: "annual rainfall." },
          { label: "C", text: "the felling date of a beam." },
          { label: "D", text: "atmospheric carbon isotope ratios." },
          { label: "E", text: "the age of the surrounding stand." },
        ], answer: "D",
        explanation: "Paragraph E: a ring's carbon content records the atmospheric isotope ratio for its year." },

      { number: 13, type: "mcq-multi", prompt: "Which TWO non-climatic influences on ring width does the passage mention?",
        options: [
          "The removal of neighbouring trees",
          "Changes in soil chemistry caused by fire",
          "The wider trunk circumference of an older tree",
          "Damage caused by grazing animals",
          "Selective breeding of timber species",
        ],
        answers: ["A", "C"], answer: "A",
        explanation: "Paragraph F cites release after felling of neighbours and the geometric effect of a widening trunk." },

      { number: 14, type: "fill-blank", prompt: "Sudden single-year rises in atmospheric carbon-14 are now attributed to extreme ____ events.",
        instruction: "Write ONE WORD ONLY from the passage.",
        answer: "solar",
        explanation: "Paragraph E: 'now attributed to extreme solar events'." },
    ],
  },

  // ============================================================
  // rx-hard-3 - The Standardised Test
  // ============================================================
  {
    id: "rx-hard-3",
    title: "Hard Test 3 - Measuring Minds",
    level: "Hard",
    durationMinutes: 20,
    passageTitle: "Measuring Minds: A Short History of the Standardised Test",
    passage:
`A. The examination as we know it was invented as a remedy for corruption. In eighteenth-century Europe, university places and public offices were distributed largely through patronage, and the written competitive examination was introduced by reformers who wanted a procedure that a candidate's family connections could not influence. The imperial Chinese civil service had operated on this principle for well over a millennium, and European advocates cited it explicitly. What made the innovation attractive was not a belief that written papers measured ability perfectly, but the observation that they were harder to corrupt than the alternative. From the beginning, then, the case for examinations was comparative rather than absolute, a point that later debates have consistently forgotten.

B. Measurement in the modern sense began with Alfred Binet, commissioned in 1904 by the French education ministry to identify children who would not benefit from ordinary classroom teaching. Binet assembled a series of small practical tasks, ordered them by the age at which most children could complete them, and expressed a child's performance as the age level at which they were functioning. He was explicit that the resulting figure was a snapshot of current attainment, that it should be used to direct extra teaching towards children who needed it, and that treating it as a fixed quantity would be an abuse of the instrument. Within fifteen years the scale had been translated, standardised on American populations, converted into a single ratio called the intelligence quotient, and used for purposes he had warned against.

C. The First World War completed the transformation. Faced with the need to sort nearly two million recruits, the United States Army commissioned group-administered written tests, and the exercise established a set of habits that outlasted the war: mass administration, mechanical scoring, and the expression of a person's capacity as a single number allowing them to be ranked against strangers. The wartime data were also published, and their apparent finding that recruits from southern and eastern Europe scored below those from the north was used in the immigration debates of the 1920s. Later analysis showed the tests to have been saturated with cultural knowledge that recent immigrants could not have possessed, including questions about American commercial brands. The conclusions were withdrawn by scholars long after the legislation they supported had passed.

D. The technical machinery, meanwhile, became genuinely sophisticated. Modern test theory can estimate the difficulty of an individual question independently of the ability of the candidates who happen to have answered it, detect items on which two groups of equal overall ability nevertheless perform differently, and adapt the sequence of questions in real time so that each candidate is presented with material near the limit of their competence. These are real achievements, and they mean that a well-constructed contemporary test is a far more reliable instrument than anything available in 1917. Reliability, however, concerns consistency, and consistency is not the same thing as relevance. A test can produce almost identical results for the same candidate on two occasions while measuring something of no importance whatever.

E. The most persistent difficulty is not technical but institutional, and it appears whenever a measure is used to allocate something valuable. Where examination results determine access to universities or the funding of schools, effort flows towards the measure itself. Preparation industries emerge; curricula narrow towards the tested subjects; teaching time is redistributed towards students near a threshold, because moving them across it changes the published statistics while attention to those far above or below it does not. None of this requires dishonesty. It is the ordinary and predictable behaviour of institutions that are judged by a number, and it steadily weakens the correlation between the number and the underlying quality it was meant to represent.

F. Attempts to escape by using richer forms of assessment have run into a trade-off that is easy to state and hard to avoid. Portfolios, extended projects and oral examinations capture a wider range of what education is for; they are also expensive to mark, harder to compare across institutions, and more vulnerable to the very influences that written examinations were invented to exclude, since judgement is exercised in private by individuals who may know the candidate. Several jurisdictions that expanded coursework in the 1990s reduced it again in the following decade after evidence of unequal parental assistance. The choice is not between a flawed instrument and a sound one but between different distributions of error.

G. A more modest conception is now gaining ground among measurement specialists, and it is close to Binet's. On this view a test result is a piece of evidence with a known margin of uncertainty, most useful when combined with other evidence and least reliable when a decision rests on it alone. Standard errors would be reported alongside scores; borderline candidates would be treated as borderline rather than sorted by a difference smaller than the instrument can detect. The obstacle is not statistical but political. Institutions that must justify their decisions publicly prefer a single number precisely because it appears to remove the need for judgement, and a measure that announces its own uncertainty is administratively inconvenient in exactly the situations where it matters most.`,
    questions: [
      { number: 1, type: "matching-headings", prompt: "Choose the best heading for Paragraph A.",
        instruction: "Choose the correct heading from the list. There are more headings than paragraphs.",
        headings: [
          { label: "i", text: "An answer to patronage" },
          { label: "ii", text: "Binet's original purpose" },
          { label: "iii", text: "Sorting an army" },
          { label: "iv", text: "The cost of richer assessment" },
        ], answer: "i",
        explanation: "Paragraph A presents examinations as a remedy for patronage and corruption." },
      { number: 2, type: "matching-headings", prompt: "Choose the best heading for Paragraph D.",
        headings: [
          { label: "i", text: "Reliable but not necessarily relevant" },
          { label: "ii", text: "An answer to patronage" },
          { label: "iii", text: "Effort flows to the measure" },
          { label: "iv", text: "A more modest proposal" },
        ], answer: "i",
        explanation: "Paragraph D concedes technical progress but separates reliability from relevance." },
      { number: 3, type: "matching-headings", prompt: "Choose the best heading for Paragraph E.",
        headings: [
          { label: "i", text: "What happens when scores decide outcomes" },
          { label: "ii", text: "Reliable but not relevant" },
          { label: "iii", text: "Binet's warning ignored" },
          { label: "iv", text: "Testing and immigration policy" },
        ], answer: "i",
        explanation: "Paragraph E describes institutional distortion when results allocate valuable things." },
      { number: 4, type: "matching-headings", prompt: "Choose the best heading for Paragraph F.",
        headings: [
          { label: "i", text: "Different distributions of error" },
          { label: "ii", text: "What happens when scores decide outcomes" },
          { label: "iii", text: "An answer to patronage" },
          { label: "iv", text: "Adaptive questioning" },
        ], answer: "i",
        explanation: "Paragraph F concludes that the choice is 'between different distributions of error'." },
      { number: 5, type: "matching-headings", prompt: "Choose the best heading for Paragraph G.",
        headings: [
          { label: "i", text: "Uncertainty that is politically inconvenient" },
          { label: "ii", text: "Different distributions of error" },
          { label: "iii", text: "Mass administration and mechanical scoring" },
          { label: "iv", text: "Cultural bias in wartime data" },
        ], answer: "i",
        explanation: "Paragraph G proposes reporting uncertainty and notes the obstacle is political, not statistical." },

      { number: 6, type: "ynng", prompt: "The writer thinks the original argument for written examinations was that they measured ability accurately.",
        instruction: "Do the following statements agree with the views of the writer? Write YES, NO or NOT GIVEN.",
        answer: "No",
        explanation: "Paragraph A: the case was comparative, that examinations were merely harder to corrupt." },
      { number: 7, type: "ynng", prompt: "The writer regards the narrowing of curricula around tested subjects as a form of deliberate misconduct.",
        answer: "No",
        explanation: "Paragraph E: 'None of this requires dishonesty.'" },
      { number: 8, type: "ynng", prompt: "The writer considers coursework a fairer method than written examinations in all circumstances.",
        answer: "No",
        explanation: "Paragraph F notes coursework is more vulnerable to unequal parental assistance and private judgement." },
      { number: 9, type: "tfng", prompt: "Binet intended his scale to identify children needing additional teaching.",
        instruction: "Do the following statements agree with the information in the passage? Write TRUE, FALSE or NOT GIVEN.",
        answer: "True",
        explanation: "Paragraph B: it should 'direct extra teaching towards children who needed it'." },
      { number: 10, type: "tfng", prompt: "The findings of the US Army tests were withdrawn before the immigration laws of the 1920s were passed.",
        answer: "False",
        explanation: "Paragraph C: withdrawn 'long after the legislation they supported had passed'." },

      { number: 11, type: "matching-features", prompt: "Warned that treating a score as a fixed quantity would misuse the instrument.",
        instruction: "Match each statement with the correct person or body.",
        features: [
          { label: "A", text: "Eighteenth-century European reformers" },
          { label: "B", text: "Alfred Binet" },
          { label: "C", text: "The United States Army" },
          { label: "D", text: "Contemporary measurement specialists" },
        ], answer: "B",
        explanation: "Paragraph B records Binet's explicit warning." },
      { number: 12, type: "matching-features", prompt: "Established the practice of ranking large numbers of strangers by a single figure.",
        features: [
          { label: "A", text: "Eighteenth-century European reformers" },
          { label: "B", text: "Alfred Binet" },
          { label: "C", text: "The United States Army" },
          { label: "D", text: "Contemporary measurement specialists" },
        ], answer: "C",
        explanation: "Paragraph C: mass administration, mechanical scoring and ranking against strangers." },

      { number: 13, type: "summary-completion", prompt: "Modern test theory can estimate an item's ____ separately from the ability of those who answered it.",
        instruction: "Choose the correct word from the box. There are more words than gaps.",
        wordBank: [
          { label: "A", text: "difficulty" },
          { label: "B", text: "relevance" },
          { label: "C", text: "reliability" },
          { label: "D", text: "cost" },
          { label: "E", text: "length" },
        ], answer: "A",
        explanation: "Paragraph D: it can 'estimate the difficulty of an individual question independently of the ability of the candidates'." },
      { number: 14, type: "fill-blank", prompt: "The writer says that institutions prefer a single number because it appears to remove the need for ____.",
        instruction: "Write ONE WORD ONLY from the passage.",
        answer: "judgement",
        explanation: "Paragraph G: 'it appears to remove the need for judgement'." },
    ],
  },
];
