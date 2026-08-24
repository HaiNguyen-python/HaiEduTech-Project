/**
 * @file ieltsFullReadingExamsHard4.ts
 * @description Wave 7 - four further high-difficulty IELTS Academic Reading
 *   passages written to Cambridge "Passage 3" specification (800-950 words,
 *   answers out of passage order, mixed official task types).
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { ReadingExam } from "./ieltsFullReadingExams";

export const IELTS_FULL_READING_EXAMS_HARD4: ReadingExam[] = [
  // ============================================================
  // rx-hard-11 - The Ledger and the Merchant
  // ============================================================
  {
    id: "rx-hard-11",
    title: "Test 41 - The Ledger and the Merchant",
    level: "Hard",
    durationMinutes: 20,
    passageTitle: "The Ledger and the Merchant",
    passage:
`A. In 1494 a Franciscan friar named Luca Pacioli published, as one section of a large mathematical compendium, the first printed description of double-entry bookkeeping. He did not claim to have invented it. The system he set out had been in use among the merchants of northern Italy for at least two centuries, and surviving ledgers from Genoa and Florence show it operating in recognisable form well before 1400. What Pacioli supplied was standardisation and reach: a printed account of a practice that had previously been transmitted by apprenticeship, and that within a century of his book was being taught from Antwerp to Edinburgh.

B. The mechanism is deceptively simple. Every transaction is recorded twice, once as a debit and once as a credit, in such a way that the two entries must sum to zero. A merchant who buys cloth for cash records an increase in stock and a decrease in cash; if the two figures do not balance, an error has been made somewhere and can be hunted down. This arithmetical redundancy is the system's first virtue and the one usually emphasised, but it is not the most important. The deeper consequence is that the accounts, taken together, describe a single fictional person, the business, whose property and obligations are distinct from those of the merchant who owns it.

C. That fiction did real work. A trader operating alone with a cash box knows whether he has money; he does not necessarily know whether he is making a profit, since goods bought on credit, goods not yet sold and money owed to him are all invisible to a simple count of coins. Double entry makes them visible by requiring that each be given a place in the accounts, and it therefore permits the calculation of a periodic result. Historians of the firm regard this as the decisive step. A partnership of several investors, some of whom take no part in the trade, can only distribute gains if the gains can be computed in a way all of them accept, and an agent in a distant port can only be held to account if his transactions can be reconciled against a central record.

D. It has often been argued that the technique was therefore a cause of the commercial expansion that followed. The economic historian Werner Sombart went furthest, treating double entry as one of the conditions that made rational capitalism possible, and the claim retains a certain appeal. The evidence, however, resists it. Many highly successful firms of the sixteenth and seventeenth centuries, including some of the largest, kept accounts that were incomplete, irregular or single-entry, and closed their books at intervals of many years or not at all. Meanwhile the technique spread to places where no comparable expansion occurred. The most careful modern assessment is that double entry was an enabling instrument rather than an engine: it lowered the cost of monitoring, which mattered most where trade was distant and ownership was divided.

E. The instrument also shaped what could be seen, and this is where the historical account becomes uncomfortable. An accounting system records what can be entered in it. Items that resist quantification, and items for which nobody is liable, have no place in the ledger and consequently no place in the periodic result. For a Venetian trader in pepper this omitted little of consequence. For a modern corporation it omits a great deal, including the depletion of resources it does not own and the costs it imposes on people with whom it has no contract. The complaint that companies pursue what they measure is often made as though it were a moral failing of managers. It is at least as much a structural feature of a five-hundred-year-old technology that was designed for a different scale of activity.

F. Attempts to widen the frame have a long and largely unsuccessful history. Proposals for social accounting appeared in the 1970s, environmental accounting in the 1990s, and integrated reporting more recently, each seeking to bring non-financial consequences into the same statement as revenue and cost. The obstacle is not usually ideological but technical. Double entry achieves its discipline through a closed system in which every entry has a counterpart, and there is no counterpart to a tonne of emitted carbon unless a liability for it has been created by law or contract. Where such liabilities have been created, as in the European emissions trading system, the accounting follows without difficulty, which suggests the constraint lies in the definition of obligations rather than in the ledger itself.

G. Pacioli concluded his treatise with the advice that a merchant should be able to see, at any time and in a single figure, the state of his affairs. The remark identifies both the achievement and the limit. A single figure is enormously useful, and no large organisation could be governed without something like it. But a single figure is also a selection, and the selection was made by fifteenth-century merchants for their own purposes. Five centuries later the world is administered largely through numbers produced by their method, and the debate about sustainability is, from one angle, an argument about which columns the original design left blank.`,
    questions: [
      { number: 1, type: "matching-headings", prompt: "Choose the best heading for Paragraph C.",
        instruction: "Choose the correct heading from the list below. There are more headings than paragraphs, so some headings will not be used.",
        headings: [
          { label: "i", text: "Making profit and obligation visible" },
          { label: "ii", text: "A friar who printed an old practice" },
          { label: "iii", text: "What the ledger cannot hold" },
          { label: "iv", text: "Attempts to widen the statement" },
        ], answer: "i",
        explanation: "Paragraph C explains that double entry reveals credit, unsold stock and debts, allowing a periodic result to be computed." },
      { number: 2, type: "matching-headings", prompt: "Choose the best heading for Paragraph E.",
        headings: [
          { label: "i", text: "What the ledger cannot hold" },
          { label: "ii", text: "Making profit and obligation visible" },
          { label: "iii", text: "The claim that accounting caused capitalism" },
          { label: "iv", text: "How the double record works" },
        ], answer: "i",
        explanation: "Paragraph E argues unquantifiable items and items with no liable party fall outside the accounts." },
      { number: 3, type: "matching-headings", prompt: "Choose the best heading for Paragraph D.",
        headings: [
          { label: "i", text: "An enabling instrument, not an engine" },
          { label: "ii", text: "What the ledger cannot hold" },
          { label: "iii", text: "A friar who printed an old practice" },
          { label: "iv", text: "The advice at the end of the treatise" },
        ], answer: "i",
        explanation: "Paragraph D rejects the causal claim and concludes the technique lowered monitoring costs rather than driving expansion." },
      { number: 4, type: "matching-headings", prompt: "Choose the best heading for Paragraph F.",
        headings: [
          { label: "i", text: "Reform blocked by a missing counterpart" },
          { label: "ii", text: "An enabling instrument, not an engine" },
          { label: "iii", text: "Making profit and obligation visible" },
          { label: "iv", text: "Ledgers before print" },
        ], answer: "i",
        explanation: "Paragraph F identifies the technical obstacle: no counterpart entry exists without a legally created liability." },
      { number: 5, type: "matching-headings", prompt: "Choose the best heading for Paragraph B.",
        headings: [
          { label: "i", text: "How the double record works" },
          { label: "ii", text: "Reform blocked by a missing counterpart" },
          { label: "iii", text: "The claim that accounting caused capitalism" },
          { label: "iv", text: "What the ledger cannot hold" },
        ], answer: "i",
        explanation: "Paragraph B describes the debit and credit mechanism and the fiction of the business as a separate person." },

      { number: 6, type: "tfng", prompt: "Pacioli presented double-entry bookkeeping as his own invention.",
        instruction: "Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.",
        answer: "False",
        explanation: "Paragraph A: 'He did not claim to have invented it.'" },
      { number: 7, type: "tfng", prompt: "Some of the largest firms of the sixteenth and seventeenth centuries did not keep complete double-entry accounts.",
        answer: "True",
        explanation: "Paragraph D states many successful firms, including some of the largest, kept incomplete or single-entry accounts." },
      { number: 8, type: "tfng", prompt: "Pacioli's book was translated into more languages than any other mathematical work of its century.",
        answer: "Not Given",
        explanation: "The passage says the practice was taught from Antwerp to Edinburgh but makes no claim about translations." },
      { number: 9, type: "tfng", prompt: "Emissions can be recorded in conventional accounts once a legal liability for them exists.",
        answer: "True",
        explanation: "Paragraph F: where such liabilities have been created, 'the accounting follows without difficulty'." },

      { number: 10, type: "matching-endings", prompt: "The requirement that entries balance",
        instruction: "Complete each sentence with the correct ending, A-E.",
        endings: [
          { label: "A", text: "allows mistakes to be detected and traced." },
          { label: "B", text: "makes credit transactions unnecessary." },
          { label: "C", text: "was introduced only after 1494." },
          { label: "D", text: "prevents partnerships from sharing profit." },
          { label: "E", text: "removes the need for a periodic result." },
        ], answer: "A",
        explanation: "Paragraph B: if the figures do not balance 'an error has been made somewhere and can be hunted down'." },
      { number: 11, type: "matching-endings", prompt: "Treating the business as a person distinct from its owner",
        endings: [
          { label: "A", text: "is described as the deeper consequence of the method." },
          { label: "B", text: "was a legal reform of the nineteenth century." },
          { label: "C", text: "made apprenticeship unnecessary." },
          { label: "D", text: "reduced the accuracy of the accounts." },
          { label: "E", text: "applied only to distant agents." },
        ], answer: "A",
        explanation: "Paragraph B calls this fiction the deeper consequence, more important than arithmetical redundancy." },

      { number: 12, type: "summary-completion", prompt: "Modern historians describe double entry as an instrument that reduced the cost of ___ , which mattered most in distant trade with divided ownership.",
        instruction: "Complete the summary using the list of words, A-F, below.",
        wordBank: [
          { label: "A", text: "monitoring" },
          { label: "B", text: "shipping" },
          { label: "C", text: "printing" },
          { label: "D", text: "borrowing" },
          { label: "E", text: "insurance" },
          { label: "F", text: "training" },
        ], answer: "A",
        explanation: "Paragraph D: 'it lowered the cost of monitoring, which mattered most where trade was distant and ownership was divided'." },
      { number: 13, type: "fill-blank", prompt: "Before Pacioli's book, the technique had been passed on chiefly through ___.",
        instruction: "Complete the sentence with ONE WORD ONLY from the passage.",
        answer: "apprenticeship",
        explanation: "Paragraph A: the practice 'had previously been transmitted by apprenticeship'." },
      { number: 14, type: "multiple-choice", prompt: "What does the writer suggest about the criticism that companies pursue only what they measure?",
        options: [
          "It is unfair, because managers cannot influence accounts.",
          "It reflects a design feature of an old technique as much as a moral fault.",
          "It applies equally to fifteenth-century Venetian traders.",
          "It has been answered by integrated reporting.",
        ],
        answer: "It reflects a design feature of an old technique as much as a moral fault.",
        explanation: "Paragraph E: the complaint is 'at least as much a structural feature of a five-hundred-year-old technology'." },
    ],
  },

  // ============================================================
  // rx-hard-12 - The Last Speakers
  // ============================================================
  {
    id: "rx-hard-12",
    title: "Test 42 - The Last Speakers",
    level: "Hard",
    durationMinutes: 20,
    passageTitle: "The Last Speakers",
    passage:
`A. Estimates of the number of languages currently spoken cluster around seven thousand, and estimates of how many will still be spoken in 2100 cluster, uncomfortably, around half that figure. The projection is not a prediction about deaths but about transmission: a language ceases to have a future at the point where children stop acquiring it, which typically happens a generation or two before the last fluent speaker dies. By that measure a substantial share of the world's languages are already beyond recovery, since their youngest competent speakers are middle-aged, and the loss is unusually concentrated. A few dozen languages account for the great majority of speakers, while roughly half of all languages have fewer than ten thousand.

B. The mechanism of shift is fairly well understood and is rarely a matter of prohibition. Overt suppression, of the kind practised in residential schools in North America and Australia, did enormous damage, but most contemporary shift is voluntary in the narrow sense that parents choose it. They choose it because the local language does not open the door to secondary education, salaried employment or urban housing, and because bilingualism is widely, if wrongly, believed to hold children back. The result is a characteristic three-generation sequence: grandparents monolingual in the local language, parents bilingual, children monolingual in the national one. Once the sequence has run, reversing it requires teaching the language as a subject rather than transmitting it as a mother tongue, which is a different and much slower undertaking.

C. Arguments for intervention take three distinct forms, and conflating them has weakened the case. The scientific argument holds that each language is evidence about the range of possible human grammars, and that the sample is shrinking in a biased way, since the languages disappearing are disproportionately those most unlike the well-documented European ones. The cultural argument holds that oral literature, taxonomy and law encoded in a language are not fully translatable, and that the loss is therefore a loss of content rather than merely of form. The third argument concerns the speakers themselves, and rests on the association between language loss and measurable harm to community wellbeing. Only the third makes a claim that can be tested by the people most affected, which is one reason it has become the most influential.

D. Revitalisation has produced one unambiguous success and a large number of partial ones. Hebrew, revived as a spoken vernacular from a liturgical and literary tradition, is the case always cited, but the conditions were exceptional: a highly motivated population, an existing written corpus of immense prestige, a state apparatus and a context in which the alternative was several mutually unintelligible immigrant languages. No other project has enjoyed that combination. Welsh, Maori and Hawaiian illustrate what is achievable without it. In each, the number of speakers has stabilised or risen after decades of decline, chiefly through immersion schooling, broadcasting and official status, without the language recovering its former role in every domain of daily life.

E. The immersion school has become the standard instrument, and its record deserves scrutiny. Hawaiian medium education, begun in 1984 with fewer than fifty children, now enrols several thousand and has produced adults who use the language professionally. Yet studies of graduates of comparable programmes elsewhere repeatedly find that competence acquired in school is not carried into the home, so that the school produces speakers rather than transmitters. The programmes that have done better on this measure are those which deliberately targeted the household, through language nests staffed by elderly fluent speakers caring for infants, and through adult courses aimed at parents rather than children. The insight is unromantic: the bottleneck is not the child's ability to learn but the parent's willingness and ability to speak.

F. Documentation is sometimes offered as a fallback, and it should not be confused with maintenance. Modern descriptive practice can produce a grammar, a dictionary and an annotated corpus of recordings that will allow a linguist in two centuries to analyse the language and, in favourable cases, allow descendants to reconstruct something of it. Several communities have used such archives to begin reclamation projects decades after the last speaker died, with results that are linguistically imperfect and socially significant. But a corpus is not a speech community, and presenting archiving as a solution has occasionally been resented by the communities involved, who did not regard their language as a specimen.

G. What has changed most in the field over thirty years is authority. Early salvage linguistics treated the community as a source of data and the researcher as the interpreter of it; the resulting materials were often inaccessible to the people they described, deposited in distant universities and written in notation only specialists could read. Current practice, at least in principle, treats the community as the client, with rights over the material and a decisive voice in what is recorded and how it is used. The shift has slowed the production of academic descriptions and improved the chances that documentation will be of use to anyone who might want to speak the language again. On the evidence so far, that trade is worth making.`,
    questions: [
      { number: 1, type: "matching-headings", prompt: "Choose the best heading for Paragraph B.",
        instruction: "Choose the correct heading from the list below. There are more headings than paragraphs, so some headings will not be used.",
        headings: [
          { label: "i", text: "How a language is given up in three generations" },
          { label: "ii", text: "Counting what remains" },
          { label: "iii", text: "Records are not communities" },
          { label: "iv", text: "Who decides what is recorded" },
        ], answer: "i",
        explanation: "Paragraph B describes the voluntary shift and the grandparent-parent-child sequence." },
      { number: 2, type: "matching-headings", prompt: "Choose the best heading for Paragraph C.",
        headings: [
          { label: "i", text: "Three reasons that should be kept apart" },
          { label: "ii", text: "How a language is given up in three generations" },
          { label: "iii", text: "The exceptional case of Hebrew" },
          { label: "iv", text: "Schools that produce speakers" },
        ], answer: "i",
        explanation: "Paragraph C separates the scientific, cultural and wellbeing arguments and warns against conflating them." },
      { number: 3, type: "matching-headings", prompt: "Choose the best heading for Paragraph E.",
        headings: [
          { label: "i", text: "Schools, homes and the real bottleneck" },
          { label: "ii", text: "Three reasons that should be kept apart" },
          { label: "iii", text: "Counting what remains" },
          { label: "iv", text: "Records are not communities" },
        ], answer: "i",
        explanation: "Paragraph E contrasts school-produced speakers with household transmission and names the parental bottleneck." },
      { number: 4, type: "matching-headings", prompt: "Choose the best heading for Paragraph F.",
        headings: [
          { label: "i", text: "Records are not communities" },
          { label: "ii", text: "Schools, homes and the real bottleneck" },
          { label: "iii", text: "Who decides what is recorded" },
          { label: "iv", text: "One success and several partial ones" },
        ], answer: "i",
        explanation: "Paragraph F insists documentation is not maintenance: 'a corpus is not a speech community'." },
      { number: 5, type: "matching-headings", prompt: "Choose the best heading for Paragraph G.",
        headings: [
          { label: "i", text: "A change in who holds authority" },
          { label: "ii", text: "Records are not communities" },
          { label: "iii", text: "How a language is given up in three generations" },
          { label: "iv", text: "Immersion in Hawaii" },
        ], answer: "i",
        explanation: "Paragraph G traces the shift from researcher-as-interpreter to community-as-client." },

      { number: 6, type: "ynng", prompt: "The writer thinks the belief that bilingualism disadvantages children is mistaken.",
        instruction: "Do the following statements agree with the views of the writer? Write YES, NO or NOT GIVEN.",
        answer: "Yes",
        explanation: "Paragraph B: bilingualism is 'widely, if wrongly, believed to hold children back'." },
      { number: 7, type: "ynng", prompt: "The writer considers the revival of Hebrew a model that other communities can straightforwardly follow.",
        answer: "No",
        explanation: "Paragraph D stresses the conditions were exceptional and that 'no other project has enjoyed that combination'." },
      { number: 8, type: "ynng", prompt: "The writer believes the slower output of academic descriptions is an acceptable price for community control.",
        answer: "Yes",
        explanation: "Paragraph G: 'On the evidence so far, that trade is worth making.'" },

      { number: 9, type: "matching-features", prompt: "This programme is credited with growing from fewer than fifty children to several thousand.",
        instruction: "Match each description with the correct language, A-D.",
        features: [
          { label: "A", text: "Hebrew" },
          { label: "B", text: "Hawaiian" },
          { label: "C", text: "Welsh" },
          { label: "D", text: "Maori" },
        ], answer: "B",
        explanation: "Paragraph E gives these figures for Hawaiian medium education from 1984." },
      { number: 10, type: "matching-features", prompt: "This language was revived from a liturgical and literary tradition in unusually favourable conditions.",
        features: [
          { label: "A", text: "Hebrew" },
          { label: "B", text: "Hawaiian" },
          { label: "C", text: "Welsh" },
          { label: "D", text: "Maori" },
        ], answer: "A",
        explanation: "Paragraph D describes Hebrew's revival and the exceptional circumstances behind it." },

      { number: 11, type: "fill-blank", prompt: "Programmes in which elderly fluent speakers care for infants are known as language ___.",
        instruction: "Complete the sentences with ONE WORD ONLY from the passage.",
        answer: "nests",
        explanation: "Paragraph E refers to 'language nests staffed by elderly fluent speakers caring for infants'." },
      { number: 12, type: "fill-blank", prompt: "A language loses its future when children stop ___ it, often long before the last speaker dies.",
        answer: "acquiring",
        explanation: "Paragraph A: a language ceases to have a future 'where children stop acquiring it'." },
      { number: 13, type: "multiple-choice", prompt: "Why does the writer say the shrinking sample of languages is biased?",
        options: [
          "Because the surviving languages have the most speakers.",
          "Because the languages disappearing are largely those least similar to well-documented European ones.",
          "Because researchers prefer to study written languages.",
          "Because half of all languages have fewer than ten thousand speakers.",
        ],
        answer: "Because the languages disappearing are largely those least similar to well-documented European ones.",
        explanation: "Paragraph C states the disappearing languages are 'disproportionately those most unlike the well-documented European ones'." },
      { number: 14, type: "mcq-multi", prompt: "Which TWO outcomes does the writer attribute to Welsh, Maori and Hawaiian efforts?",
        instruction: "Choose TWO letters, A-E.",
        options: [
          "A. Speaker numbers have stopped falling or have increased.",
          "B. Official status and broadcasting have been secured.",
          "C. The languages have regained every domain of daily life.",
          "D. Documentation has replaced teaching.",
          "E. Parents have been excluded from programmes.",
        ],
        answers: ["A", "B"], answer: "A",
        explanation: "Paragraph D credits stabilised or rising speaker numbers through immersion schooling, broadcasting and official status, while denying full recovery of every domain." },
    ],
  },

  // ============================================================
  // rx-hard-13 - The Price of Resistance
  // ============================================================
  {
    id: "rx-hard-13",
    title: "Test 43 - The Price of Resistance",
    level: "Hard",
    durationMinutes: 20,
    passageTitle: "The Price of Resistance",
    passage:
`A. Antibiotic resistance is often described as a scientific problem awaiting a scientific solution, and the description is misleading in an important way. The biology has been understood since the 1940s, when Alexander Fleming himself warned that careless use of penicillin would select for organisms able to survive it. Resistance is not an accident of misuse but the expected consequence of exposure: any population of bacteria under a lethal pressure will be enriched for whatever variant tolerates it. The scientific question is therefore not why resistance arises, which is settled, but why the supply of new antibiotics has failed at precisely the moment the need has become acute. That question is economic.

B. The commercial difficulty is unusual and worth stating precisely. A new antibiotic effective against resistant infections is, if properly managed, a drug that should be used as little as possible. Physicians reserve it for cases in which nothing else will work, and public health authorities actively discourage its wider use in order to delay the emergence of resistance to it. The result is a product whose social value is enormous and whose sales volume is deliberately kept near zero. Compare this with a treatment for a chronic condition, taken daily for decades by millions, and the allocation of research budgets over the past thirty years requires no further explanation. Several small companies that succeeded in bringing new antibiotics to market have subsequently entered bankruptcy, an outcome that has been more discouraging to investors than any regulatory obstacle.

C. Agriculture complicates the picture and is frequently misrepresented in both directions. By volume, more antimicrobials are administered to farm animals than to humans in most large economies, much of it historically for growth promotion rather than treatment. Restrictions in the European Union and, later, in the United States have reduced this substantially. What is contested is how much of the human clinical problem is attributable to farming. Resistance genes certainly move between animal and human bacterial populations, and specific instances of transfer have been documented, but the dominant driver of resistance in hospital pathogens appears to be hospital prescribing itself. Overstating the agricultural contribution is convenient for prescribers and, on the evidence, unhelpful.

D. Diagnosis is the intervention with the best ratio of benefit to cost and receives the least attention. A physician facing a patient with a possible bacterial infection typically has no result from the laboratory for a day or more, and in that interval must choose between withholding treatment from someone who may deteriorate and prescribing broadly against organisms not yet identified. Almost everyone prescribes. A test capable of distinguishing bacterial from viral infection at the bedside in twenty minutes would remove the dilemma, and several such tests now exist in prototype. They are not deployed at scale because a diagnostic that reduces prescribing has a market value far below the cost of the prescriptions it prevents, and because reimbursement systems pay for treatments rather than for the avoidance of them.

E. Proposals to repair the incentive fall into two families. Push mechanisms subsidise the research itself, through grants and public private partnerships, and have had a modest but real effect on the number of candidate compounds in early development. Pull mechanisms operate on the reward: the best known is the market entry reward, a large lump sum paid on approval in exchange for the developer accepting restrictions on promotion, which deliberately severs income from volume sold. A variant, adopted on a small scale in the United Kingdom, pays an annual subscription for access to a drug regardless of how much is used, in effect treating the antibiotic as a standing insurance policy rather than a commodity. Early evaluations are cautiously positive, though the sums so far committed are far below the levels that economic modelling suggests would be needed.

F. The problem is also international in a way that resists national solutions. Resistant organisms travel in the intestines of ordinary travellers, and a resistance gene selected in one country's hospitals appears within a few years in another's. This means that a state which invests in stewardship gains only part of the benefit, while a state which permits over the counter sales imposes costs it does not bear. The structure is familiar from environmental policy, and so is the difficulty of correcting it. Meanwhile the most immediate humanitarian problem in many low-income settings is not excessive antibiotic use but insufficient access: far more people still die of treatable bacterial infection for want of any effective drug than die of infections resistant to all of them.

G. Forecasts of mortality decades ahead have been used to raise the political salience of all this, and have been criticised, reasonably, for resting on thin data and heroic extrapolation. The criticism does not much alter the conclusion. Every element of modern surgery that involves opening the body, every course of chemotherapy that suppresses immunity and every intensive care unit depends on the assumption that a bacterial infection acquired in the process can be cured. That assumption held for roughly seventy years. Whether it continues to hold is now largely a question of how societies choose to pay for drugs they hope never to need.`,
    questions: [
      { number: 1, type: "matching-headings", prompt: "Choose the best heading for Paragraph B.",
        instruction: "Choose the correct heading from the list below. There are more headings than paragraphs, so some headings will not be used.",
        headings: [
          { label: "i", text: "A product designed not to sell" },
          { label: "ii", text: "An old warning, an economic question" },
          { label: "iii", text: "Two ways to change the reward" },
          { label: "iv", text: "The test that nobody buys" },
        ], answer: "i",
        explanation: "Paragraph B explains that a new antibiotic must be used sparingly, so its sales volume is deliberately near zero." },
      { number: 2, type: "matching-headings", prompt: "Choose the best heading for Paragraph D.",
        headings: [
          { label: "i", text: "The test that nobody buys" },
          { label: "ii", text: "A product designed not to sell" },
          { label: "iii", text: "How much is farming to blame?" },
          { label: "iv", text: "A problem that crosses borders" },
        ], answer: "i",
        explanation: "Paragraph D argues rapid bedside diagnostics exist but are not deployed because reimbursement pays for treatment." },
      { number: 3, type: "matching-headings", prompt: "Choose the best heading for Paragraph C.",
        headings: [
          { label: "i", text: "How much is farming to blame?" },
          { label: "ii", text: "The test that nobody buys" },
          { label: "iii", text: "Two ways to change the reward" },
          { label: "iv", text: "What modern medicine assumes" },
        ], answer: "i",
        explanation: "Paragraph C weighs agricultural use against hospital prescribing as the dominant driver." },
      { number: 4, type: "matching-headings", prompt: "Choose the best heading for Paragraph E.",
        headings: [
          { label: "i", text: "Push, pull and subscription" },
          { label: "ii", text: "How much is farming to blame?" },
          { label: "iii", text: "A problem that crosses borders" },
          { label: "iv", text: "A product designed not to sell" },
        ], answer: "i",
        explanation: "Paragraph E describes push mechanisms, market entry rewards and the subscription model." },
      { number: 5, type: "matching-headings", prompt: "Choose the best heading for Paragraph F.",
        headings: [
          { label: "i", text: "Costs that spill across frontiers" },
          { label: "ii", text: "Push, pull and subscription" },
          { label: "iii", text: "The test that nobody buys" },
          { label: "iv", text: "An old warning, an economic question" },
        ], answer: "i",
        explanation: "Paragraph F describes cross-border spread and the mismatch between who pays for stewardship and who benefits." },

      { number: 6, type: "tfng", prompt: "The biological cause of antibiotic resistance is still poorly understood.",
        instruction: "Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.",
        answer: "False",
        explanation: "Paragraph A says the biology has been understood since the 1940s and the question of why resistance arises is settled." },
      { number: 7, type: "tfng", prompt: "Some firms that launched new antibiotics later went bankrupt.",
        answer: "True",
        explanation: "Paragraph B: several small companies 'have subsequently entered bankruptcy'." },
      { number: 8, type: "tfng", prompt: "In many low-income settings, lack of access to antibiotics currently kills more people than untreatable resistant infections.",
        answer: "True",
        explanation: "Paragraph F states far more people die of treatable infection for want of a drug than of fully resistant infection." },
      { number: 9, type: "tfng", prompt: "Rapid bedside tests distinguishing bacterial from viral infection have been approved in every large economy.",
        answer: "Not Given",
        explanation: "Paragraph D says several exist 'in prototype' and are not deployed at scale; approval status is not discussed." },

      { number: 10, type: "matching-features", prompt: "This approach funds the research stage directly.",
        instruction: "Match each description with the correct mechanism, A-D.",
        features: [
          { label: "A", text: "Push mechanisms" },
          { label: "B", text: "Market entry rewards" },
          { label: "C", text: "Subscription payments" },
          { label: "D", text: "Over the counter sales" },
        ], answer: "A",
        explanation: "Paragraph E: push mechanisms 'subsidise the research itself, through grants and public private partnerships'." },
      { number: 11, type: "matching-features", prompt: "This approach pays a fixed annual sum for access irrespective of the quantity used.",
        features: [
          { label: "A", text: "Push mechanisms" },
          { label: "B", text: "Market entry rewards" },
          { label: "C", text: "Subscription payments" },
          { label: "D", text: "Over the counter sales" },
        ], answer: "C",
        explanation: "Paragraph E describes the United Kingdom variant paying an annual subscription regardless of volume." },

      { number: 12, type: "summary-completion", prompt: "The dominant driver of resistance in hospital pathogens appears to be hospital ___ rather than agriculture.",
        instruction: "Complete the summary using the list of words, A-F, below.",
        wordBank: [
          { label: "A", text: "prescribing" },
          { label: "B", text: "hygiene" },
          { label: "C", text: "staffing" },
          { label: "D", text: "surgery" },
          { label: "E", text: "travel" },
          { label: "F", text: "diagnosis" },
        ], answer: "A",
        explanation: "Paragraph C: 'the dominant driver of resistance in hospital pathogens appears to be hospital prescribing itself'." },
      { number: 13, type: "fill-blank", prompt: "Much of the antimicrobial use in farming was historically intended for growth ___ rather than treatment.",
        instruction: "Complete the sentence with ONE WORD ONLY from the passage.",
        answer: "promotion",
        explanation: "Paragraph C refers to use 'for growth promotion rather than treatment'." },
      { number: 14, type: "multiple-choice", prompt: "How does the writer respond to criticism of long-range mortality forecasts?",
        options: [
          "By rejecting the criticism as politically motivated",
          "By accepting it while arguing the conclusion still stands",
          "By providing better data of his own",
          "By concluding that the threat has been exaggerated",
        ],
        answer: "By accepting it while arguing the conclusion still stands",
        explanation: "Paragraph G calls the criticism reasonable but says it 'does not much alter the conclusion'." },
    ],
  },

  // ============================================================
  // rx-hard-14 - Concrete That Heals
  // ============================================================
  {
    id: "rx-hard-14",
    title: "Test 44 - Concrete That Heals",
    level: "Hard",
    durationMinutes: 20,
    passageTitle: "Concrete That Heals",
    passage:
`A. The harbour works at Caesarea, the piers of Pozzuoli and the unreinforced dome of the Pantheon share a property that has irritated engineers for two centuries: they are made of concrete, they are roughly two thousand years old, and in several cases they are in better condition than structures built in the twentieth century. Modern concrete in a marine environment is generally expected to require major intervention within fifty to a hundred years. Roman marine concrete, immersed continuously in salt water since the reign of Augustus, has in places grown stronger. Explaining the difference has taken longer than might be expected, partly because the answer turned out not to be a single ingredient.

B. The chemistry of the two materials is genuinely different. Modern Portland cement is made by heating limestone and clay to about 1450 degrees Celsius, producing a powder that reacts with water to form a calcium silicate hydrate binder. It is strong, predictable and fast, and its production releases a large quantity of carbon dioxide, roughly half of it from the chemical decomposition of the limestone itself rather than from the fuel. The Roman recipe used quicklime, seawater and volcanic ash, chiefly from the region around Naples, and cured slowly at ambient temperature into a matrix in which an aluminous mineral called tobermorite grew in interlocking plates. The plates are the key to the material's behaviour, because they form gradually and continue to form long after the structure is in service.

C. Analysis of drill cores taken from Roman harbour installations has shown these crystals growing in the very cracks that would, in a modern structure, be the beginning of failure. Seawater penetrating a fissure dissolves components of the volcanic ash and reprecipitates them as new mineral, sealing the gap. The mechanism is not repair in any designed sense; it is a slow reaction that happens to have a beneficial result, and it depends on conditions the Romans could not have understood. What they did understand, and recorded, was that ash from particular locations produced mortar that set under water, a property they exploited deliberately in harbour construction.

D. A second and more recent finding concerns the way the lime was mixed. Cores contain small white inclusions of calcium rich material that were long dismissed as evidence of careless preparation, on the assumption that a competent builder would have slaked his lime thoroughly. Experimental work published in 2023 suggested the opposite. If quicklime is combined directly with the aggregate and water at high temperature, a process called hot mixing, these inclusions survive as reservoirs of reactive calcium. When a crack later exposes them to water, they dissolve and recrystallise, closing the crack within weeks. Laboratory specimens made this way sealed fractures that specimens made with modern slaked lime did not, which converts an apparent defect into a designed feature.

E. Enthusiasm for these results needs qualification, and the researchers involved have supplied most of it themselves. Roman concrete is weak in compression by modern standards, at perhaps a tenth to a fifth of a structural mix used today, and it sets over months rather than hours. It cannot be reinforced with steel, and it is the corrosion of embedded steel, expanding as it rusts and splitting the surrounding concrete, that causes most modern deterioration. In this respect the comparison is unfair: the ancient material has no steel to protect, and the ancient structures that survive are massive compressive forms, arches and domes, which the material suits. A bridge deck or a tower block cannot be built this way at all.

F. The interest is therefore less in copying the recipe than in adopting two of its principles. The first is longevity as a design objective. Because cement production accounts for a substantial share of global industrial emissions, doubling the service life of a structure roughly halves the emissions attributable to each year of its use, a saving unavailable through efficiency in the kiln alone. The second is tolerance of imperfection. Modern practice attempts to exclude water and prevent cracking absolutely, an ambition that fails in the field and fails expensively; a material that expects to crack and responds by sealing itself changes the economics of maintenance.

G. Commercial products embodying these ideas are beginning to appear, and the most developed use neither Roman ash nor hot lime. Bacterial concrete incorporates dormant spores together with a nutrient; water entering a crack revives them and they precipitate calcium carbonate, sealing gaps of up to about half a millimetre. Others use encapsulated polymers or reactive mineral additives, and blended cements substituting volcanic ash or industrial slag for part of the clinker are already in wide use for reasons of both durability and emissions. None of this reproduces the Pantheon, whose dome has stood for nineteen centuries with no reinforcement and no recorded structural repair. It does suggest that the Roman achievement was less a lost secret than an unrecognised standard.`,
    questions: [
      { number: 1, type: "matching-headings", prompt: "Choose the best heading for Paragraph B.",
        instruction: "Choose the correct heading from the list below. There are more headings than paragraphs, so some headings will not be used.",
        headings: [
          { label: "i", text: "Two recipes, two chemistries" },
          { label: "ii", text: "Structures that outlasted expectation" },
          { label: "iii", text: "Lumps that turned out to matter" },
          { label: "iv", text: "Products reaching the market" },
        ], answer: "i",
        explanation: "Paragraph B contrasts Portland cement chemistry with the Roman lime, seawater and volcanic ash mix." },
      { number: 2, type: "matching-headings", prompt: "Choose the best heading for Paragraph D.",
        headings: [
          { label: "i", text: "Lumps that turned out to matter" },
          { label: "ii", text: "Two recipes, two chemistries" },
          { label: "iii", text: "Why the comparison is unfair" },
          { label: "iv", text: "Crystals growing in cracks" },
        ], answer: "i",
        explanation: "Paragraph D reinterprets the white lime inclusions, once seen as sloppy work, as reservoirs of reactive calcium." },
      { number: 3, type: "matching-headings", prompt: "Choose the best heading for Paragraph E.",
        headings: [
          { label: "i", text: "Why the comparison is unfair" },
          { label: "ii", text: "Lumps that turned out to matter" },
          { label: "iii", text: "Two principles worth borrowing" },
          { label: "iv", text: "Structures that outlasted expectation" },
        ], answer: "i",
        explanation: "Paragraph E lists the ancient material's weaknesses and notes the surviving forms suit it, so the comparison is unfair." },
      { number: 4, type: "matching-headings", prompt: "Choose the best heading for Paragraph F.",
        headings: [
          { label: "i", text: "Two principles worth borrowing" },
          { label: "ii", text: "Why the comparison is unfair" },
          { label: "iii", text: "Crystals growing in cracks" },
          { label: "iv", text: "Bacteria and capsules" },
        ], answer: "i",
        explanation: "Paragraph F identifies longevity as a design objective and tolerance of imperfection as the transferable principles." },
      { number: 5, type: "matching-headings", prompt: "Choose the best heading for Paragraph C.",
        headings: [
          { label: "i", text: "Sealing by accident" },
          { label: "ii", text: "Two principles worth borrowing" },
          { label: "iii", text: "Lumps that turned out to matter" },
          { label: "iv", text: "Emissions from the kiln" },
        ], answer: "i",
        explanation: "Paragraph C describes crystal growth in cracks as 'not repair in any designed sense' but a beneficial reaction." },

      { number: 6, type: "ynng", prompt: "The writer believes the durability of Roman concrete is explained by one ingredient.",
        instruction: "Do the following statements agree with the views of the writer? Write YES, NO or NOT GIVEN.",
        answer: "No",
        explanation: "Paragraph A says the answer 'turned out not to be a single ingredient', and two mechanisms are then described." },
      { number: 7, type: "ynng", prompt: "The writer regards the Roman builders as having deliberately engineered a self-sealing material.",
        answer: "No",
        explanation: "Paragraph C states the mechanism depends on conditions 'the Romans could not have understood'." },
      { number: 8, type: "ynng", prompt: "The writer thinks extending the life of buildings is a more promising emissions strategy than improving cement kilns alone.",
        answer: "Yes",
        explanation: "Paragraph F argues doubling service life halves annual emissions, 'a saving unavailable through efficiency in the kiln alone'." },
      { number: 9, type: "ynng", prompt: "The writer claims modern self-healing products match the performance of the Pantheon's concrete.",
        answer: "No",
        explanation: "Paragraph G: 'None of this reproduces the Pantheon.'" },

      { number: 10, type: "matching-endings", prompt: "Most deterioration in modern concrete structures",
        instruction: "Complete each sentence with the correct ending, A-E.",
        endings: [
          { label: "A", text: "results from embedded steel rusting and expanding." },
          { label: "B", text: "is caused by volcanic ash in the mix." },
          { label: "C", text: "occurs within the first ten years of service." },
          { label: "D", text: "is prevented entirely by blended cements." },
          { label: "E", text: "happens only in marine environments." },
        ], answer: "A",
        explanation: "Paragraph E: corrosion of embedded steel 'expanding as it rusts and splitting the surrounding concrete' causes most modern deterioration." },
      { number: 11, type: "matching-endings", prompt: "Bacterial concrete seals damage because",
        endings: [
          { label: "A", text: "water revives spores that deposit calcium carbonate." },
          { label: "B", text: "polymers are released by heating the surface." },
          { label: "C", text: "seawater dissolves the aggregate." },
          { label: "D", text: "steel reinforcement expands into the gap." },
          { label: "E", text: "the mix sets more quickly than Portland cement." },
        ], answer: "A",
        explanation: "Paragraph G describes dormant spores revived by water precipitating calcium carbonate in cracks." },

      { number: 12, type: "fill-blank", prompt: "The interlocking plates in Roman marine concrete are formed by a mineral called ___.",
        instruction: "Complete the sentences with ONE WORD ONLY from the passage.",
        answer: "tobermorite",
        explanation: "Paragraph B names 'an aluminous mineral called tobermorite' growing in interlocking plates." },
      { number: 13, type: "fill-blank", prompt: "Combining quicklime with aggregate and water at high temperature is known as ___ mixing.",
        answer: "hot",
        explanation: "Paragraph D calls this 'a process called hot mixing'." },
      { number: 14, type: "mcq-multi", prompt: "Which TWO limitations of Roman concrete does the writer identify?",
        instruction: "Choose TWO letters, A-E.",
        options: [
          "A. Low compressive strength compared with modern mixes",
          "B. A curing time measured in months",
          "C. Vulnerability to steel corrosion",
          "D. High carbon dioxide emissions in production",
          "E. Inability to set under water",
        ],
        answers: ["A", "B"], answer: "A",
        explanation: "Paragraph E gives low compressive strength and slow setting; steel corrosion and high emissions belong to modern concrete, and Roman mortar did set under water." },
    ],
  },
];
