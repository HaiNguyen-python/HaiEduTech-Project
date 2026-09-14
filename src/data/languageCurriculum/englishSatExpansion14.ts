/**
 * @file englishSatExpansion14.ts
 * @description SAT Expansion 14 - 2 modules x 6 lessons (12 new lessons), English only.
 *   1) R&W - Command of Evidence & Inference
 *   2) Math - Problem Solving, Data Analysis & Advanced Math
 * Every lesson: worked examples in the theory, one interactive exercise and a 5-question quiz.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { LanguageModule } from "./types";

export const satExpansionModules14: LanguageModule[] = [
  // ════════════════ 1. R&W - Command of Evidence & Inference
  {
    id: "sat-rw-evidence-inference-pack",
    title: "SAT R&W - Command of Evidence & Inference",
    titleEn: "SAT R&W - Command of Evidence & Inference",
    icon: "🔎",
    color: "from-indigo-500/15 to-blue-600/15",
    description: "Six lessons on textual and quantitative evidence, inference completion, claim support and weakening answers.",
    descriptionEn: "Six lessons on textual and quantitative evidence, inference completion, claim support and weakening answers.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-ei-1-textual-evidence",
        title: "Lesson 1 - Textual Evidence: Which quotation supports the claim?",
        titleEn: "Lesson 1 - Textual Evidence: Which quotation supports the claim?",
        level: 2,
        difficulty: "beginner",
        theory:
          "Command of Evidence (textual) gives a claim and four quotations. Only one quotation directly supports the exact claim.\n\nMethod: 1) underline the claim's key idea; 2) restate it in five words; 3) test each quotation against that restatement; 4) reject quotations that are relevant to the topic but not to the claim.\n\nWorked example\nClaim: the researchers were surprised by how quickly the seedlings recovered.\nA. 'The seedlings were grown in identical soil.' - method, not surprise.\nB. 'Recovery took only nine days, far sooner than the team had predicted.' - correct: speed plus expectation.\nC. 'The study was funded by a regional agency.' - irrelevant.\nD. 'Seedlings need consistent watering.' - general fact.\nB is the only quotation that contains both parts of the claim: speed and unexpectedness.",
        theoryEn:
          "Command of Evidence (textual) gives a claim and four quotations. Only one quotation directly supports the exact claim.\n\nMethod: 1) underline the claim's key idea; 2) restate it in five words; 3) test each quotation against that restatement; 4) reject quotations that are relevant to the topic but not to the claim.\n\nWorked example\nClaim: the researchers were surprised by how quickly the seedlings recovered.\nA. 'The seedlings were grown in identical soil.' - method, not surprise.\nB. 'Recovery took only nine days, far sooner than the team had predicted.' - correct: speed plus expectation.\nC. 'The study was funded by a regional agency.' - irrelevant.\nD. 'Seedlings need consistent watering.' - general fact.\nB is the only quotation that contains both parts of the claim: speed and unexpectedness.",
        proTips: [
          "A claim with two parts needs a quotation that covers both parts.",
          "Topic-relevant is not the same as claim-relevant.",
        ],
        proTipsEn: [
          "A claim with two parts needs a quotation that covers both parts.",
          "Topic-relevant is not the same as claim-relevant.",
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Write supports or fails for each quotation against the claim 'the method was unusually cheap'.",
            instructionEn: "Write supports or fails for each quotation against the claim 'the method was unusually cheap'.",
            sentences: [
              { text: "'The whole procedure cost less than a tenth of standard testing.' -> ___", textEn: "'The whole procedure cost less than a tenth of standard testing.' -> ___", answer: "supports" },
              { text: "'The procedure was completed in a single afternoon.' -> ___", textEn: "'The procedure was completed in a single afternoon.' -> ___", answer: "fails" },
              { text: "'Materials were purchased from a hardware shop for a few dollars.' -> ___", textEn: "'Materials were purchased from a hardware shop for a few dollars.' -> ___", answer: "supports" },
            ],
          },
        ],
        quiz: [
          { question: "What is the first step on a textual-evidence item?", options: ["Read all four quotations twice", "Underline and restate the claim", "Skip to the longest quotation", "Check the citation"], answer: 1, explanation: "You cannot test evidence until the claim is precisely restated." },
          { question: "A claim with two parts requires a quotation that:", options: ["Covers only the first part", "Covers both parts", "Is the longest", "Mentions numbers"], answer: 1, explanation: "Partial support is the most common distractor." },
          { question: "A quotation about funding, in a claim about surprise, is:", options: ["Correct", "Irrelevant", "Partially correct", "Always correct"], answer: 1, explanation: "Funding does not address surprise." },
          { question: "Topic-relevant answers are:", options: ["Always correct", "Often distractors", "Never present", "Ungrammatical"], answer: 1, explanation: "The test relies on relevant-but-insufficient options." },
          { question: "How many quotations directly support the claim?", options: ["None", "Exactly one", "Two", "All four"], answer: 1, explanation: "Only one option supports the claim as stated." },
        ],
      },
      {
        id: "sat-ei-2-quantitative-evidence",
        title: "Lesson 2 - Quantitative Evidence: reading the graph before the options",
        titleEn: "Lesson 2 - Quantitative Evidence: reading the graph before the options",
        level: 3,
        difficulty: "intermediate",
        theory:
          "Quantitative evidence items pair a short text with a table or graph. The correct option is true according to the data AND completes the writer's point.\n\nMethod: 1) read the axis labels and units first; 2) note the trend in your own words; 3) read the sentence that the option must complete; 4) test each option twice - is it true in the data, and does it finish the writer's idea?\n\nWorked example\nGraph: recycling rate rises from 21% in 2015 to 38% in 2023, while landfill use falls from 62% to 44%.\nSentence: 'The data suggest the city's diversion policy worked, since ______'\nCorrect: 'recycling rose by 17 percentage points while landfill use fell by 18.'\nTrap: 'recycling reached 38% in 2023' - true, but it does not show change over time, which is what the policy claim needs.",
        theoryEn:
          "Quantitative evidence items pair a short text with a table or graph. The correct option is true according to the data AND completes the writer's point.\n\nMethod: 1) read the axis labels and units first; 2) note the trend in your own words; 3) read the sentence that the option must complete; 4) test each option twice - is it true in the data, and does it finish the writer's idea?\n\nWorked example\nGraph: recycling rate rises from 21% in 2015 to 38% in 2023, while landfill use falls from 62% to 44%.\nSentence: 'The data suggest the city's diversion policy worked, since ______'\nCorrect: 'recycling rose by 17 percentage points while landfill use fell by 18.'\nTrap: 'recycling reached 38% in 2023' - true, but it does not show change over time, which is what the policy claim needs.",
        proTips: [
          "Percentage points and percent are different; the test exploits the confusion.",
          "True in the data is only half the requirement.",
        ],
        proTipsEn: [
          "Percentage points and percent are different; the test exploits the confusion.",
          "True in the data is only half the requirement.",
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Data: 2015 = 21%, 2023 = 38%. Complete each statement.",
            instructionEn: "Data: 2015 = 21%, 2023 = 38%. Complete each statement.",
            sentences: [
              { text: "The rise is ___ percentage points.", textEn: "The rise is ___ percentage points.", answer: "17" },
              { text: "The 2023 value is ___ percent.", textEn: "The 2023 value is ___ percent.", answer: "38" },
              { text: "A claim about change over time needs ___ values, not one.", textEn: "A claim about change over time needs ___ values, not one.", answer: "two" },
            ],
          },
        ],
        quiz: [
          { question: "What should you read first on a graph item?", options: ["The options", "The axis labels and units", "The title only", "The footnote"], answer: 1, explanation: "Units and axes prevent almost all data misreadings." },
          { question: "An option that is true in the data but does not finish the writer's point is:", options: ["Correct", "A distractor", "Impossible", "Half credit"], answer: 1, explanation: "Both conditions must hold." },
          { question: "From 21% to 38% is a rise of:", options: ["17 percent", "17 percentage points", "38 percentage points", "59 percent"], answer: 1, explanation: "Differences between percentages are measured in percentage points." },
          { question: "A claim about a trend requires:", options: ["One data value", "At least two data values", "No data", "Only the maximum"], answer: 1, explanation: "Trends need a comparison across time or groups." },
          { question: "The safest habit before reading options is to:", options: ["Guess the answer", "State the trend in your own words", "Count the bars", "Read the source"], answer: 1, explanation: "A self-stated trend makes distractors visible." },
        ],
      },
      {
        id: "sat-ei-3-inference-completion",
        title: "Lesson 3 - Inference Completion: finishing the logical sentence",
        titleEn: "Lesson 3 - Inference Completion: finishing the logical sentence",
        level: 3,
        difficulty: "intermediate",
        theory:
          "Inference items end with a blank such as 'Therefore, the researchers most likely concluded that ______'. The answer must follow necessarily from the passage, adding nothing new.\n\nMethod: 1) identify the logical connector before the blank (therefore, however, because); 2) summarise the evidence in one sentence; 3) predict the conclusion before reading options; 4) delete any option that needs outside information.\n\nWorked example\nPassage: a soil additive raised yields in dry regions but had no measurable effect in wet regions.\nBlank: 'The additive is therefore most useful ______'\nCorrect: 'in areas where water is scarce.'\nTrap: 'in all agricultural regions' - contradicts the wet-region result. Trap: 'because it contains nitrogen' - new information not in the passage.",
        theoryEn:
          "Inference items end with a blank such as 'Therefore, the researchers most likely concluded that ______'. The answer must follow necessarily from the passage, adding nothing new.\n\nMethod: 1) identify the logical connector before the blank (therefore, however, because); 2) summarise the evidence in one sentence; 3) predict the conclusion before reading options; 4) delete any option that needs outside information.\n\nWorked example\nPassage: a soil additive raised yields in dry regions but had no measurable effect in wet regions.\nBlank: 'The additive is therefore most useful ______'\nCorrect: 'in areas where water is scarce.'\nTrap: 'in all agricultural regions' - contradicts the wet-region result. Trap: 'because it contains nitrogen' - new information not in the passage.",
        proTips: [
          "Predict before you read the options; prediction blocks the attractive over-statement.",
          "Words such as all, never and proves usually mark an over-claim.",
        ],
        proTipsEn: [
          "Predict before you read the options; prediction blocks the attractive over-statement.",
          "Words such as all, never and proves usually mark an over-claim.",
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Write valid or over-claim for each conclusion drawn from 'the additive helped only in dry regions'.",
            instructionEn: "Write valid or over-claim for each conclusion drawn from 'the additive helped only in dry regions'.",
            sentences: [
              { text: "'It is most useful where water is scarce.' -> ___", textEn: "'It is most useful where water is scarce.' -> ___", answer: "valid" },
              { text: "'It always increases yields.' -> ___", textEn: "'It always increases yields.' -> ___", answer: "over-claim" },
              { text: "'It proves soil chemistry is irrelevant in wet regions.' -> ___", textEn: "'It proves soil chemistry is irrelevant in wet regions.' -> ___", answer: "over-claim" },
            ],
          },
        ],
        quiz: [
          { question: "An inference answer must:", options: ["Add new facts", "Follow necessarily from the passage", "Quote the passage exactly", "Be the longest option"], answer: 1, explanation: "Inference is constrained by what the text supports." },
          { question: "Which word most often signals an over-claim?", options: ["some", "all", "may", "often"], answer: 1, explanation: "Absolute words exceed the evidence." },
          { question: "The connector before the blank tells you:", options: ["The word count", "The logical relationship required", "The topic", "The author's name"], answer: 1, explanation: "Therefore needs a consequence; however needs a contrast." },
          { question: "Best habit before reading the options:", options: ["Predict the conclusion", "Read the last line only", "Eliminate option A", "Check the date"], answer: 0, explanation: "Prediction protects you from attractive over-statements." },
          { question: "An option requiring outside knowledge is:", options: ["Correct", "Wrong", "Partially correct", "Preferred"], answer: 1, explanation: "Inference items are closed to outside information." },
        ],
      },
      {
        id: "sat-ei-4-two-text-sets",
        title: "Lesson 4 - Paired Texts: agreement and disagreement",
        titleEn: "Lesson 4 - Paired Texts: agreement and disagreement",
        level: 4,
        difficulty: "advanced",
        theory:
          "Paired-text items ask how the author of Text 2 would respond to Text 1. The answer must combine a position from each text.\n\nMethod: 1) write a five-word position for Text 1; 2) do the same for Text 2; 3) decide whether Text 2 agrees, disagrees or qualifies; 4) choose the option that names that relationship and cites the specific point of disagreement.\n\nWorked example\nText 1: urban trees reduce summer temperatures, so cities should plant widely.\nText 2: cooling depends on species and canopy density; scattered planting has little effect.\nRelationship: qualified disagreement about method, not about cooling.\nCorrect: 'Text 2 would agree that trees cool cities but argue that placement and species determine the benefit.'\nTrap: 'Text 2 rejects the claim that trees cool cities' - overstates the disagreement.",
        theoryEn:
          "Paired-text items ask how the author of Text 2 would respond to Text 1. The answer must combine a position from each text.\n\nMethod: 1) write a five-word position for Text 1; 2) do the same for Text 2; 3) decide whether Text 2 agrees, disagrees or qualifies; 4) choose the option that names that relationship and cites the specific point of disagreement.\n\nWorked example\nText 1: urban trees reduce summer temperatures, so cities should plant widely.\nText 2: cooling depends on species and canopy density; scattered planting has little effect.\nRelationship: qualified disagreement about method, not about cooling.\nCorrect: 'Text 2 would agree that trees cool cities but argue that placement and species determine the benefit.'\nTrap: 'Text 2 rejects the claim that trees cool cities' - overstates the disagreement.",
        proTips: [
          "Most paired-text answers are partial agreement, not total rejection.",
          "Name the exact point of disagreement, not the general topic.",
        ],
        proTipsEn: [
          "Most paired-text answers are partial agreement, not total rejection.",
          "Name the exact point of disagreement, not the general topic.",
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Label each relationship: agree, disagree or qualify.",
            instructionEn: "Label each relationship: agree, disagree or qualify.",
            sentences: [
              { text: "Text 2 accepts the effect but limits the conditions. -> ___", textEn: "Text 2 accepts the effect but limits the conditions. -> ___", answer: "qualify" },
              { text: "Text 2 reports the opposite result entirely. -> ___", textEn: "Text 2 reports the opposite result entirely. -> ___", answer: "disagree" },
              { text: "Text 2 adds a second study with the same finding. -> ___", textEn: "Text 2 adds a second study with the same finding. -> ___", answer: "agree" },
            ],
          },
        ],
        quiz: [
          { question: "A paired-text answer must draw on:", options: ["Text 1 only", "Both texts", "Text 2 only", "Neither text"], answer: 1, explanation: "The relationship needs a position from each text." },
          { question: "The most common relationship tested is:", options: ["Total rejection", "Partial agreement or qualification", "Identical claims", "Unrelated topics"], answer: 1, explanation: "SAT paired texts usually differ on a specific point." },
          { question: "An option that overstates disagreement is:", options: ["Correct", "A distractor", "Neutral", "Always shortest"], answer: 1, explanation: "Overstatement is the main paired-text trap." },
          { question: "What should you write before reading the options?", options: ["A five-word position for each text", "The full summary of both texts", "Nothing", "A translation"], answer: 0, explanation: "Short positions make the relationship visible." },
          { question: "In the worked example, the disagreement concerns:", options: ["Whether trees cool cities", "How trees should be planted", "The cost of trees", "Tree species names only"], answer: 1, explanation: "Text 2 disputes method, not the cooling effect." },
        ],
      },
      {
        id: "sat-ei-5-weakening-answers",
        title: "Lesson 5 - Weakening and Strengthening a Hypothesis",
        titleEn: "Lesson 5 - Weakening and Strengthening a Hypothesis",
        level: 4,
        difficulty: "advanced",
        theory:
          "Some evidence items ask which finding would weaken or strengthen a hypothesis. The task is causal reasoning, not reading speed.\n\nMethod: 1) state the hypothesis as cause -> effect; 2) to weaken, look for the effect appearing without the cause, or the cause without the effect; 3) to strengthen, look for the effect tracking the cause closely; 4) ignore findings about unrelated variables.\n\nWorked example\nHypothesis: the new street lighting reduced night-time accidents.\nWeakens: 'Accidents fell by the same amount in neighbouring streets with no new lighting.' The effect appears without the cause.\nStrengthens: 'Accidents fell only on the streets where lights were installed, and only after installation.' The effect tracks the cause in place and time.",
        theoryEn:
          "Some evidence items ask which finding would weaken or strengthen a hypothesis. The task is causal reasoning, not reading speed.\n\nMethod: 1) state the hypothesis as cause -> effect; 2) to weaken, look for the effect appearing without the cause, or the cause without the effect; 3) to strengthen, look for the effect tracking the cause closely; 4) ignore findings about unrelated variables.\n\nWorked example\nHypothesis: the new street lighting reduced night-time accidents.\nWeakens: 'Accidents fell by the same amount in neighbouring streets with no new lighting.' The effect appears without the cause.\nStrengthens: 'Accidents fell only on the streets where lights were installed, and only after installation.' The effect tracks the cause in place and time.",
        proTips: [
          "A control group with the same result is the strongest weakening evidence.",
          "Timing matters: an effect before the cause destroys the hypothesis.",
        ],
        proTipsEn: [
          "A control group with the same result is the strongest weakening evidence.",
          "Timing matters: an effect before the cause destroys the hypothesis.",
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Write weakens or strengthens for the hypothesis 'the lighting reduced accidents'.",
            instructionEn: "Write weakens or strengthens for the hypothesis 'the lighting reduced accidents'.",
            sentences: [
              { text: "'Unlit neighbouring streets saw the same decline.' -> ___", textEn: "'Unlit neighbouring streets saw the same decline.' -> ___", answer: "weakens" },
              { text: "'The decline began the month after installation, only on lit streets.' -> ___", textEn: "'The decline began the month after installation, only on lit streets.' -> ___", answer: "strengthens" },
              { text: "'Accidents had already fallen before the lights were installed.' -> ___", textEn: "'Accidents had already fallen before the lights were installed.' -> ___", answer: "weakens" },
            ],
          },
        ],
        quiz: [
          { question: "Restating the hypothesis as cause and effect helps because:", options: ["It shortens the passage", "It shows exactly what must be broken or supported", "It is required", "It reveals the answer letter"], answer: 1, explanation: "Causal structure guides the evaluation." },
          { question: "Which finding weakens a causal claim most strongly?", options: ["A control group with the same effect", "A larger sample", "A longer study", "A new researcher"], answer: 0, explanation: "The effect without the cause undermines causation." },
          { question: "An effect that appears before the cause:", options: ["Strengthens the claim", "Weakens the claim", "Is irrelevant", "Proves the claim"], answer: 1, explanation: "Causes must precede effects." },
          { question: "Findings about unrelated variables are:", options: ["Strong evidence", "Irrelevant distractors", "Always correct", "Weakening"], answer: 1, explanation: "They do not touch the hypothesis." },
          { question: "Strengthening evidence typically shows:", options: ["The effect tracking the cause in place and time", "A bigger budget", "More authors", "A different topic"], answer: 0, explanation: "Close tracking supports causation." },
        ],
      },
      {
        id: "sat-ei-6-evidence-timing",
        title: "Lesson 6 - Evidence Under Time Pressure",
        titleEn: "Lesson 6 - Evidence Under Time Pressure",
        level: 4,
        difficulty: "advanced",
        theory:
          "Evidence questions are the slowest R&W items, so pacing decides the score.\n\nMethod: 1) allow 75 seconds per evidence item and 45 seconds for shorter items; 2) read the question stem before the passage on evidence items; 3) eliminate two options fast using the claim restatement; 4) if two options remain after 20 seconds, choose the narrower one and move on.\n\nWorked example of triage\nMinute 20 of the module with six items left and eight minutes remaining: answer the two vocabulary-in-context items first (about 30 seconds each), then spend the remaining time on evidence items rather than the reverse. Narrow, cautiously worded options are correct more often than sweeping ones, so they are the better guess when time runs out.",
        theoryEn:
          "Evidence questions are the slowest R&W items, so pacing decides the score.\n\nMethod: 1) allow 75 seconds per evidence item and 45 seconds for shorter items; 2) read the question stem before the passage on evidence items; 3) eliminate two options fast using the claim restatement; 4) if two options remain after 20 seconds, choose the narrower one and move on.\n\nWorked example of triage\nMinute 20 of the module with six items left and eight minutes remaining: answer the two vocabulary-in-context items first (about 30 seconds each), then spend the remaining time on evidence items rather than the reverse. Narrow, cautiously worded options are correct more often than sweeping ones, so they are the better guess when time runs out.",
        proTips: [
          "Read the stem before the passage on evidence items only.",
          "When guessing, prefer the narrower, more cautious option.",
        ],
        proTipsEn: [
          "Read the stem before the passage on evidence items only.",
          "When guessing, prefer the narrower, more cautious option.",
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Fill in the pacing plan.",
            instructionEn: "Fill in the pacing plan.",
            sentences: [
              { text: "Allow about ___ seconds for an evidence item.", textEn: "Allow about ___ seconds for an evidence item.", answer: "75" },
              { text: "Allow about ___ seconds for a vocabulary-in-context item.", textEn: "Allow about ___ seconds for a vocabulary-in-context item.", answer: "30" },
              { text: "When two options remain, choose the ___ one.", textEn: "When two options remain, choose the ___ one.", answer: "narrower" },
            ],
          },
        ],
        quiz: [
          { question: "Which R&W items are slowest?", options: ["Vocabulary in context", "Command of Evidence", "Punctuation", "Transitions"], answer: 1, explanation: "Evidence items require claim testing across four options." },
          { question: "On an evidence item you should read:", options: ["The passage twice first", "The question stem first", "Only the options", "The footnote"], answer: 1, explanation: "The stem tells you what to look for." },
          { question: "With little time left, answer first:", options: ["Evidence items", "Fast vocabulary and punctuation items", "The longest passage", "Nothing"], answer: 1, explanation: "Fast items give more marks per minute." },
          { question: "When guessing between two options, prefer:", options: ["The sweeping one", "The narrower, cautious one", "The longest one", "Option A"], answer: 1, explanation: "Correct SAT answers are rarely absolute." },
          { question: "Blank answers on the SAT:", options: ["Avoid penalties", "Score nothing, so always guess", "Are corrected later", "Give half credit"], answer: 1, explanation: "There is no penalty for wrong answers." },
        ],
      },
    ],
  },

  // ════════════════ 2. Math - Problem Solving, Data Analysis & Advanced Math
  {
    id: "sat-math-data-advanced-pack",
    title: "SAT Math - Problem Solving, Data Analysis & Advanced Math",
    titleEn: "SAT Math - Problem Solving, Data Analysis & Advanced Math",
    icon: "📊",
    color: "from-emerald-500/15 to-teal-600/15",
    description: "Six lessons on ratios and rates, percent change, statistics and spread, probability from tables, quadratics and exponential models.",
    descriptionEn: "Six lessons on ratios and rates, percent change, statistics and spread, probability from tables, quadratics and exponential models.",
    category: "sat",
    language: "english",
    lessons: [
      {
        id: "sat-mda-1-ratios-rates",
        title: "Lesson 1 - Ratios, Rates and Unit Conversion",
        titleEn: "Lesson 1 - Ratios, Rates and Unit Conversion",
        level: 2,
        difficulty: "beginner",
        theory:
          "Set up every ratio problem as a proportion with matching units on both sides.\n\nWorked example 1\nA printer produces 18 pages in 40 seconds. How many pages in 3 minutes?\n3 minutes = 180 seconds. 18/40 = x/180, so x = 18 x 180 / 40 = 81 pages.\n\nWorked example 2\nA recipe uses flour and sugar in the ratio 5:2. If 350 g of flour is used, how much sugar?\n5/2 = 350/x, so x = 140 g.\n\nWorked example 3 (unit conversion)\n72 km/h in metres per second: 72 x 1000 / 3600 = 20 m/s. Convert before substituting, never after.",
        theoryEn:
          "Set up every ratio problem as a proportion with matching units on both sides.\n\nWorked example 1\nA printer produces 18 pages in 40 seconds. How many pages in 3 minutes?\n3 minutes = 180 seconds. 18/40 = x/180, so x = 18 x 180 / 40 = 81 pages.\n\nWorked example 2\nA recipe uses flour and sugar in the ratio 5:2. If 350 g of flour is used, how much sugar?\n5/2 = 350/x, so x = 140 g.\n\nWorked example 3 (unit conversion)\n72 km/h in metres per second: 72 x 1000 / 3600 = 20 m/s. Convert before substituting, never after.",
        proTips: [
          "Write the units next to every number; mismatched units cause most ratio errors.",
          "Convert time to a single unit before forming the proportion.",
        ],
        proTipsEn: [
          "Write the units next to every number; mismatched units cause most ratio errors.",
          "Convert time to a single unit before forming the proportion.",
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Solve each item.",
            instructionEn: "Solve each item.",
            sentences: [
              { text: "18 pages per 40 seconds gives ___ pages in 180 seconds.", textEn: "18 pages per 40 seconds gives ___ pages in 180 seconds.", answer: "81" },
              { text: "Flour to sugar is 5:2. With 350 g flour, sugar is ___ g.", textEn: "Flour to sugar is 5:2. With 350 g flour, sugar is ___ g.", answer: "140" },
              { text: "72 km/h equals ___ m/s.", textEn: "72 km/h equals ___ m/s.", answer: "20" },
            ],
          },
        ],
        quiz: [
          { question: "3 minutes equals how many seconds?", options: ["30", "180", "300", "120"], answer: 1, explanation: "3 x 60 = 180." },
          { question: "18/40 = x/180 gives x =", options: ["72", "81", "90", "45"], answer: 1, explanation: "18 x 180 / 40 = 81." },
          { question: "Ratio 5:2 with 350 g of the first quantity gives:", options: ["70", "140", "175", "700"], answer: 1, explanation: "350 x 2 / 5 = 140." },
          { question: "To convert km/h to m/s you:", options: ["Multiply by 3.6", "Divide by 3.6", "Multiply by 60", "Divide by 60"], answer: 1, explanation: "72 / 3.6 = 20 m/s." },
          { question: "The most common ratio error is:", options: ["Using a calculator", "Mismatched units", "Writing a proportion", "Cross-multiplying"], answer: 1, explanation: "Units must match on both sides of the proportion." },
        ],
      },
      {
        id: "sat-mda-2-percent-change",
        title: "Lesson 2 - Percent Change, Increase and Decrease",
        titleEn: "Lesson 2 - Percent Change, Increase and Decrease",
        level: 3,
        difficulty: "intermediate",
        theory:
          "Percent change = (new - old) / old x 100. Successive changes multiply; they never add.\n\nWorked example 1\nA price rises from 80 to 92: (92 - 80)/80 = 0.15, a 15% increase.\n\nWorked example 2\nA price rises 20% then falls 20%: 1.20 x 0.80 = 0.96, so the final price is 4% below the original, not equal to it.\n\nWorked example 3\nAfter a 30% discount an item costs 63. Original price: 63 / 0.70 = 90. Divide by the multiplier to reverse a percent change.",
        theoryEn:
          "Percent change = (new - old) / old x 100. Successive changes multiply; they never add.\n\nWorked example 1\nA price rises from 80 to 92: (92 - 80)/80 = 0.15, a 15% increase.\n\nWorked example 2\nA price rises 20% then falls 20%: 1.20 x 0.80 = 0.96, so the final price is 4% below the original, not equal to it.\n\nWorked example 3\nAfter a 30% discount an item costs 63. Original price: 63 / 0.70 = 90. Divide by the multiplier to reverse a percent change.",
        proTips: [
          "Always divide by the ORIGINAL value, not the new one.",
          "Reverse a percent change by dividing, not by adding the percentage back.",
        ],
        proTipsEn: [
          "Always divide by the ORIGINAL value, not the new one.",
          "Reverse a percent change by dividing, not by adding the percentage back.",
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Solve each item.",
            instructionEn: "Solve each item.",
            sentences: [
              { text: "From 80 to 92 is an increase of ___ percent.", textEn: "From 80 to 92 is an increase of ___ percent.", answer: "15" },
              { text: "Up 20% then down 20% leaves ___ percent of the original.", textEn: "Up 20% then down 20% leaves ___ percent of the original.", answer: "96" },
              { text: "After a 30% discount the price is 63, so the original was ___.", textEn: "After a 30% discount the price is 63, so the original was ___.", answer: "90" },
            ],
          },
        ],
        quiz: [
          { question: "Percent change divides the difference by:", options: ["The new value", "The original value", "Their sum", "Their average"], answer: 1, explanation: "The base is always the original value." },
          { question: "Up 20% then down 20% gives:", options: ["The original value", "96% of the original", "104% of the original", "80%"], answer: 1, explanation: "1.2 x 0.8 = 0.96." },
          { question: "A 30% discount corresponds to a multiplier of:", options: ["0.30", "0.70", "1.30", "1.70"], answer: 1, explanation: "You pay 70% of the price." },
          { question: "To reverse a 25% increase you:", options: ["Subtract 25%", "Divide by 1.25", "Multiply by 0.75", "Add 20%"], answer: 1, explanation: "Dividing by the multiplier restores the original." },
          { question: "Successive percent changes are combined by:", options: ["Adding", "Multiplying the multipliers", "Averaging", "Subtracting"], answer: 1, explanation: "Percent changes compound multiplicatively." },
        ],
      },
      {
        id: "sat-mda-3-statistics-spread",
        title: "Lesson 3 - Mean, Median and Spread",
        titleEn: "Lesson 3 - Mean, Median and Spread",
        level: 3,
        difficulty: "intermediate",
        theory:
          "The SAT tests how statistics respond to changes rather than heavy computation.\n\nKey facts: the mean is pulled by outliers, the median is not; adding a value equal to the mean leaves the mean unchanged; standard deviation measures spread, so a tighter cluster means a smaller standard deviation.\n\nWorked example 1\nData 4, 5, 6, 7, 8: mean 6, median 6. Replace 8 with 28: mean becomes 10, median stays 6. The mean moved; the median did not.\n\nWorked example 2\nSet A = 10, 10, 10, 10 and Set B = 4, 8, 12, 16 share the mean 10, but Set B has the larger standard deviation because its values are farther from the mean.",
        theoryEn:
          "The SAT tests how statistics respond to changes rather than heavy computation.\n\nKey facts: the mean is pulled by outliers, the median is not; adding a value equal to the mean leaves the mean unchanged; standard deviation measures spread, so a tighter cluster means a smaller standard deviation.\n\nWorked example 1\nData 4, 5, 6, 7, 8: mean 6, median 6. Replace 8 with 28: mean becomes 10, median stays 6. The mean moved; the median did not.\n\nWorked example 2\nSet A = 10, 10, 10, 10 and Set B = 4, 8, 12, 16 share the mean 10, but Set B has the larger standard deviation because its values are farther from the mean.",
        proTips: [
          "For a skewed distribution, the median is the better centre.",
          "Standard deviation questions are about clustering, so no calculation is needed.",
        ],
        proTipsEn: [
          "For a skewed distribution, the median is the better centre.",
          "Standard deviation questions are about clustering, so no calculation is needed.",
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Data set 4, 5, 6, 7, 8. Answer each item.",
            instructionEn: "Data set 4, 5, 6, 7, 8. Answer each item.",
            sentences: [
              { text: "The median is ___.", textEn: "The median is ___.", answer: "6" },
              { text: "Replacing 8 with 28 makes the mean ___.", textEn: "Replacing 8 with 28 makes the mean ___.", answer: "10" },
              { text: "The statistic unchanged by that replacement is the ___.", textEn: "The statistic unchanged by that replacement is the ___.", answer: "median" },
            ],
          },
        ],
        quiz: [
          { question: "Which statistic is most affected by an outlier?", options: ["Median", "Mean", "Mode", "Range of the middle half"], answer: 1, explanation: "The mean uses every value, so outliers pull it." },
          { question: "Two sets share a mean; the one with values farther from the mean has:", options: ["A smaller standard deviation", "A larger standard deviation", "The same standard deviation", "No standard deviation"], answer: 1, explanation: "Standard deviation measures spread about the mean." },
          { question: "For a strongly skewed data set, the better measure of centre is:", options: ["Mean", "Median", "Range", "Sum"], answer: 1, explanation: "The median resists skew." },
          { question: "Adding a value equal to the mean changes the mean:", options: ["Upwards", "Not at all", "Downwards", "Unpredictably"], answer: 1, explanation: "The balance point stays the same." },
          { question: "In 4, 5, 6, 7, 8 the mean is:", options: ["5", "6", "7", "8"], answer: 1, explanation: "30 / 5 = 6." },
        ],
      },
      {
        id: "sat-mda-4-probability-tables",
        title: "Lesson 4 - Probability from Two-Way Tables",
        titleEn: "Lesson 4 - Probability from Two-Way Tables",
        level: 3,
        difficulty: "intermediate",
        theory:
          "Two-way table items hinge on identifying the correct denominator.\n\nTable: of 200 students, 120 take Spanish (70 of them juniors) and 80 take French (30 of them juniors).\n\nWorked example 1\nProbability a random student takes French: 80/200 = 0.4.\n\nWorked example 2\nGiven the student takes Spanish, probability of being a junior: 70/120 = 7/12. The condition given restricts the denominator to the Spanish column.\n\nWorked example 3\nProbability a student is a junior: (70 + 30)/200 = 0.5. Always ask: which group is the question restricting me to?",
        theoryEn:
          "Two-way table items hinge on identifying the correct denominator.\n\nTable: of 200 students, 120 take Spanish (70 of them juniors) and 80 take French (30 of them juniors).\n\nWorked example 1\nProbability a random student takes French: 80/200 = 0.4.\n\nWorked example 2\nGiven the student takes Spanish, probability of being a junior: 70/120 = 7/12. The condition given restricts the denominator to the Spanish column.\n\nWorked example 3\nProbability a student is a junior: (70 + 30)/200 = 0.5. Always ask: which group is the question restricting me to?",
        proTips: [
          "The words given that or among always change the denominator.",
          "Circle the row or column named in the question before dividing.",
        ],
        proTipsEn: [
          "The words given that or among always change the denominator.",
          "Circle the row or column named in the question before dividing.",
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Use the table: 200 students, 120 Spanish (70 juniors), 80 French (30 juniors).",
            instructionEn: "Use the table: 200 students, 120 Spanish (70 juniors), 80 French (30 juniors).",
            sentences: [
              { text: "P(French) as a decimal is ___.", textEn: "P(French) as a decimal is ___.", answer: "0.4" },
              { text: "Among Spanish students, the number of juniors is ___.", textEn: "Among Spanish students, the number of juniors is ___.", answer: "70" },
              { text: "The denominator for 'given the student takes Spanish' is ___.", textEn: "The denominator for 'given the student takes Spanish' is ___.", answer: "120" },
            ],
          },
        ],
        quiz: [
          { question: "'Given that the student takes Spanish' changes:", options: ["The numerator only", "The denominator", "Nothing", "The table"], answer: 1, explanation: "Conditioning restricts the group considered." },
          { question: "P(French) with 80 of 200 students is:", options: ["0.2", "0.4", "0.6", "0.8"], answer: 1, explanation: "80/200 = 0.4." },
          { question: "P(junior given Spanish) with 70 of 120 is:", options: ["70/200", "70/120", "120/200", "30/80"], answer: 1, explanation: "The Spanish column is the denominator." },
          { question: "P(junior) overall with 70 + 30 juniors of 200 is:", options: ["0.35", "0.5", "0.15", "0.7"], answer: 1, explanation: "100/200 = 0.5." },
          { question: "The first action on a table item is to:", options: ["Add every cell", "Circle the row or column the question names", "Guess", "Compute all probabilities"], answer: 1, explanation: "The named group defines the denominator." },
        ],
      },
      {
        id: "sat-mda-5-quadratics",
        title: "Lesson 5 - Quadratics: forms, vertex and roots",
        titleEn: "Lesson 5 - Quadratics: forms, vertex and roots",
        level: 4,
        difficulty: "advanced",
        theory:
          "Each quadratic form reveals different information, so choose the form the question needs.\n\nStandard y = ax^2 + bx + c gives the y-intercept c. Factored y = a(x - r)(x - s) gives the roots r and s. Vertex y = a(x - h)^2 + k gives the vertex (h, k).\n\nWorked example 1\ny = x^2 - 6x + 8 factors to (x - 2)(x - 4), so the roots are 2 and 4. The axis of symmetry is the midpoint, x = 3, and y(3) = -1, so the vertex is (3, -1).\n\nWorked example 2\nThe discriminant b^2 - 4ac decides the number of real roots: positive gives two, zero gives one, negative gives none. For x^2 + 2x + 5: 4 - 20 = -16, so there are no real roots.",
        theoryEn:
          "Each quadratic form reveals different information, so choose the form the question needs.\n\nStandard y = ax^2 + bx + c gives the y-intercept c. Factored y = a(x - r)(x - s) gives the roots r and s. Vertex y = a(x - h)^2 + k gives the vertex (h, k).\n\nWorked example 1\ny = x^2 - 6x + 8 factors to (x - 2)(x - 4), so the roots are 2 and 4. The axis of symmetry is the midpoint, x = 3, and y(3) = -1, so the vertex is (3, -1).\n\nWorked example 2\nThe discriminant b^2 - 4ac decides the number of real roots: positive gives two, zero gives one, negative gives none. For x^2 + 2x + 5: 4 - 20 = -16, so there are no real roots.",
        proTips: [
          "The axis of symmetry is the average of the two roots.",
          "A question about the maximum or minimum is asking for the vertex.",
        ],
        proTipsEn: [
          "The axis of symmetry is the average of the two roots.",
          "A question about the maximum or minimum is asking for the vertex.",
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Work with y = x^2 - 6x + 8.",
            instructionEn: "Work with y = x^2 - 6x + 8.",
            sentences: [
              { text: "The smaller root is ___.", textEn: "The smaller root is ___.", answer: "2" },
              { text: "The axis of symmetry is x = ___.", textEn: "The axis of symmetry is x = ___.", answer: "3" },
              { text: "The discriminant of x^2 + 2x + 5 is ___.", textEn: "The discriminant of x^2 + 2x + 5 is ___.", answer: "-16" },
            ],
          },
        ],
        quiz: [
          { question: "Which form shows the roots immediately?", options: ["Standard", "Factored", "Vertex", "None"], answer: 1, explanation: "Factored form sets each bracket to zero." },
          { question: "The roots of x^2 - 6x + 8 = 0 are:", options: ["1 and 8", "2 and 4", "-2 and -4", "3 and 5"], answer: 1, explanation: "(x - 2)(x - 4) = 0." },
          { question: "A negative discriminant means:", options: ["Two real roots", "No real roots", "One real root", "Infinite roots"], answer: 1, explanation: "b^2 - 4ac < 0 gives complex roots." },
          { question: "The vertex of y = x^2 - 6x + 8 is:", options: ["(3, -1)", "(0, 8)", "(2, 0)", "(6, 8)"], answer: 0, explanation: "x = 3 gives y = -1." },
          { question: "A maximum or minimum value question asks for the:", options: ["y-intercept", "Vertex", "Discriminant", "Slope"], answer: 1, explanation: "Extreme values occur at the vertex." },
        ],
      },
      {
        id: "sat-mda-6-exponential-models",
        title: "Lesson 6 - Linear versus Exponential Models",
        titleEn: "Lesson 6 - Linear versus Exponential Models",
        level: 4,
        difficulty: "advanced",
        theory:
          "Deciding between a linear and an exponential model is a frequent SAT task.\n\nLinear growth adds a constant amount per period: y = mx + b. Exponential growth multiplies by a constant factor: y = a(b)^x, where b > 1 grows and 0 < b < 1 decays.\n\nWorked example 1\n'The population increases by 40 people each year' is linear: P = 40t + P0.\n'The population increases by 4% each year' is exponential: P = P0(1.04)^t.\n\nWorked example 2\nA sample halves every 6 hours starting at 240 mg. After 18 hours there have been 3 halvings: 240 x (1/2)^3 = 30 mg.\n\nWorked example 3\nIn y = 500(0.85)^t, the initial value is 500 and the quantity decays by 15% per period.",
        theoryEn:
          "Deciding between a linear and an exponential model is a frequent SAT task.\n\nLinear growth adds a constant amount per period: y = mx + b. Exponential growth multiplies by a constant factor: y = a(b)^x, where b > 1 grows and 0 < b < 1 decays.\n\nWorked example 1\n'The population increases by 40 people each year' is linear: P = 40t + P0.\n'The population increases by 4% each year' is exponential: P = P0(1.04)^t.\n\nWorked example 2\nA sample halves every 6 hours starting at 240 mg. After 18 hours there have been 3 halvings: 240 x (1/2)^3 = 30 mg.\n\nWorked example 3\nIn y = 500(0.85)^t, the initial value is 500 and the quantity decays by 15% per period.",
        proTips: [
          "The words per year with a percent signal exponential; a fixed amount signals linear.",
          "Count the number of periods before applying the factor.",
        ],
        proTipsEn: [
          "The words per year with a percent signal exponential; a fixed amount signals linear.",
          "Count the number of periods before applying the factor.",
        ],
        exercises: [
          {
            type: "fill-in-blank",
            instruction: "Answer each item.",
            instructionEn: "Answer each item.",
            sentences: [
              { text: "'Increases by 4% per year' is a ___ model.", textEn: "'Increases by 4% per year' is a ___ model.", answer: "exponential" },
              { text: "240 mg halving every 6 hours leaves ___ mg after 18 hours.", textEn: "240 mg halving every 6 hours leaves ___ mg after 18 hours.", answer: "30" },
              { text: "In y = 500(0.85)^t the decay rate is ___ percent per period.", textEn: "In y = 500(0.85)^t the decay rate is ___ percent per period.", answer: "15" },
            ],
          },
        ],
        quiz: [
          { question: "'Rises by 40 units each year' describes:", options: ["Exponential growth", "Linear growth", "Decay", "No change"], answer: 1, explanation: "A constant amount per period is linear." },
          { question: "'Rises by 4% each year' is modelled by:", options: ["y = 4t + b", "y = a(1.04)^t", "y = a(0.04)^t", "y = 4^t"], answer: 1, explanation: "A constant percent means a constant multiplier." },
          { question: "240 mg halving every 6 hours, after 18 hours, gives:", options: ["120 mg", "30 mg", "60 mg", "80 mg"], answer: 1, explanation: "Three halvings: 240 -> 120 -> 60 -> 30." },
          { question: "In y = a(b)^x, decay occurs when:", options: ["b > 1", "0 < b < 1", "b = 1", "b = 0"], answer: 1, explanation: "A factor below 1 shrinks the quantity." },
          { question: "In y = 500(0.85)^t the initial value is:", options: ["0.85", "500", "15", "85"], answer: 1, explanation: "At t = 0 the factor equals 1, leaving 500." },
        ],
      },
    ],
  },
];
