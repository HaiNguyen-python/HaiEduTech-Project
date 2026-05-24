// IELTS Lecture Quiz Extras - overlay to guarantee each Writing/Speaking lecture has ≥5 questions.
// Merged into a lecture's quiz array at view-time by id.
import type { LectureQuizQuestion } from "./ieltsLecturesData";

export const lectureQuizExtras: Record<string, LectureQuizQuestion[]> = {
  // ============ WRITING TASK 1 ============
  "writing-task1-describe-process": [
    { question: "Which tense dominates Task 1 process descriptions?", options: ["Simple past", "Present simple passive", "Present continuous", "Future perfect"], answer: 1, explanation: "Generic, ongoing processes use the present simple passive: 'is heated', 'are mixed'." },
    { question: "Best opener for a process diagram overview?", options: ["The process starts when…", "The diagram illustrates the stages by which X is produced, comprising N main steps.", "There are many steps.", "First, second, third."], answer: 1, explanation: "An overview paraphrases the prompt AND states the number of stages." },
  ],
  "writing-task1-maps-diagrams": [
    { question: "Best phrase to describe a building that no longer exists?", options: ["was destroyed", "was demolished / had been replaced by", "was bombed", "broke down"], answer: 1, explanation: "Neutral academic verbs: 'was demolished', 'was replaced by', 'gave way to'." },
    { question: "Which tense to compare two maps from 2000 and 2020?", options: ["Present simple only", "Past simple for both periods", "Past simple + present perfect to show change", "Future perfect"], answer: 2, explanation: "Use past simple to describe each map; present perfect (or past) for the changes between them." },
  ],
  "writing-task1-trends": [
    { question: "Which pair shows synonyms of 'increased sharply'?", options: ["rose gradually / climbed steadily", "soared / surged", "dipped / dropped", "remained stable / leveled off"], answer: 1, explanation: "'Soared' and 'surged' indicate a sharp, dramatic increase." },
    { question: "Best way to express 'reached the highest point of 80%'?", options: ["peaked at 80%", "topped 80% maximum", "highest 80%", "was the most 80%"], answer: 0, explanation: "'Peaked at X%' is the natural academic collocation." },
    { question: "How to combine a noun and an adjective for variety?", options: ["There was a sharp increase in sales.", "Sales increased sharply.", "Both A and B are correct and should be alternated.", "Only the verb form is acceptable."], answer: 2, explanation: "Band 7+ writers vary noun (a sharp increase) and verb (increased sharply) forms." },
  ],
  "writing-task1-bar-pie-charts": [
    { question: "What is the best overview sentence for a pie chart?", options: ["List every percentage.", "Identify the largest and smallest segments and any obvious dominance.", "Mention only the title.", "Describe colors used."], answer: 1, explanation: "Overview = the big picture: largest, smallest, dominant share." },
  ],
  "writing-task1-overview-mastery": [
    { question: "How many sentences should the overview ideally contain?", options: ["1", "2 well-developed sentences", "5+", "Half a paragraph"], answer: 1, explanation: "Two sentences typically capture the two main trends/features." },
    { question: "Which is NOT appropriate in the overview?", options: ["Specific numbers and data points", "Main trends", "Most striking features", "Comparison of largest vs smallest"], answer: 0, explanation: "Save specific data for the body paragraphs; the overview is general." },
  ],
  "writing-task1-comparison-table": [
    { question: "Best comparative structure for tables?", options: ["X is more than Y", "X is twice as high as Y / X is significantly higher than Y", "X bigger Y", "X >> Y"], answer: 1, explanation: "Use 'twice/three times as…as', 'significantly higher than' for academic register." },
    { question: "How to group data in a table effectively?", options: ["By alphabetical order", "By category, highest-to-lowest, or by time period", "Randomly", "By color"], answer: 1, explanation: "Group logically to reveal patterns: by category, rank, or time." },
  ],
  "writing-task1-line-graph-deep-dive": [
    { question: "Best verb for a small, temporary drop then recovery?", options: ["plummeted", "dipped before recovering", "collapsed", "stagnated"], answer: 1, explanation: "'Dipped' indicates a small temporary fall before going back up." },
    { question: "How to describe a flat line at 50%?", options: ["stayed exactly", "remained stable / plateaued / leveled off at 50%", "did nothing", "stopped"], answer: 1, explanation: "Academic synonyms for 'stayed the same': remained stable, plateaued, leveled off." },
    { question: "If two lines cross, what verb describes it?", options: ["overtook / surpassed / intersected with", "passed by", "beat", "won"], answer: 0, explanation: "'X overtook Y in 2010' or 'the lines intersected' are appropriate." },
  ],
  "writing-task1-multiple-charts": [
    { question: "Best approach when given two charts?", options: ["Describe each chart in a separate paragraph and link them in the overview.", "Mix all data together.", "Only describe the bigger chart.", "Skip the smaller chart."], answer: 0, explanation: "One body paragraph per chart, then connect both in the overview." },
    { question: "What to do if two charts show related data?", options: ["Ignore the link", "Make a comparison or cause-effect connection in the overview", "Describe sequentially without linking", "Only mention numbers"], answer: 1, explanation: "Examiners reward seeing relationships between two visuals." },
    { question: "How long should the overview be for two charts?", options: ["1 sentence", "2-3 sentences covering main features of BOTH", "Half a page", "0 — only body needed"], answer: 1, explanation: "Cover the main feature of each visual, totaling 2-3 sentences." },
  ],
  "writing-task1-mixed-trends-language": [
    { question: "Which sentence shows BEST variation?", options: ["The number went up. The number went up again.", "The number rose sharply, before plateauing and eventually dipping.", "Up, up, down.", "It increased and increased."], answer: 1, explanation: "Combine multiple movement verbs for lexical resource Band 7+." },
    { question: "Best adverb for 'increased a little'?", options: ["dramatically", "marginally / slightly", "vastly", "exponentially"], answer: 1, explanation: "'Marginally' and 'slightly' both express a small change." },
    { question: "Which preposition follows 'an increase'?", options: ["an increase of 5% in sales", "an increase to 5%", "an increase on sales", "an increase with sales"], answer: 0, explanation: "An increase OF (amount) IN (category)." },
  ],
  "writing-task1-letter-style": [
    { question: "Correct closing for a letter to an unknown 'Dear Sir/Madam'?", options: ["Yours sincerely", "Yours faithfully", "Best regards", "Cheers"], answer: 1, explanation: "Unknown name → 'Yours faithfully'. Known name → 'Yours sincerely'." },
    { question: "Formal tone marker?", options: ["I'm writing to…", "I am writing to enquire about…", "Hi, just a quick note…", "Yo, listen up"], answer: 1, explanation: "Full forms and formal verbs ('enquire', 'request') signal formality." },
    { question: "How many bullet points must each Task 1 letter address?", options: ["1", "2", "All 3 bullets in the prompt", "Whichever you prefer"], answer: 2, explanation: "Failing to address all 3 bullets loses Task Achievement marks." },
  ],
  "writing-task1-bar-chart": [
    { question: "Best overview for a bar chart with one dominant category?", options: ["List all bars.", "State that category X is by far the largest, while category Y is the smallest.", "Mention color only.", "Skip the overview."], answer: 1, explanation: "Highlight dominance and any obvious extremes." },
    { question: "Best verb for 'almost equal bars'?", options: ["surpassed", "stood at roughly the same level / were comparable", "doubled", "soared"], answer: 1, explanation: "'Were comparable' or 'stood at roughly the same level' show near-equality." },
    { question: "How to handle 6+ categories in a bar chart?", options: ["Describe every bar.", "Group bars (highest, middle, lowest) and compare groups.", "Pick only the tallest.", "Mention numbers only."], answer: 1, explanation: "Grouping prevents listing and shows analytical skill." },
  ],
  "writing-task1-pie-chart": [
    { question: "Synonym for 'accounted for 40%'?", options: ["made up 40% / constituted 40% / represented 40%", "had 40%", "got 40%", "did 40%"], answer: 0, explanation: "Academic verbs for shares: account for, make up, constitute, represent." },
    { question: "If you have 2 pie charts (year 2000 and 2020), what's key?", options: ["Describe each separately, no comparison.", "Compare proportions across years.", "Add the percentages.", "Ignore one chart."], answer: 1, explanation: "Comparison across time periods is the main task." },
    { question: "Best opener for pie chart overview?", options: ["The pie chart shows percentages.", "Overall, X was the largest category, accounting for nearly half of the total.", "There are 5 segments.", "Pie is round."], answer: 1, explanation: "State the dominant segment with a clear comparative." },
  ],
  "writing-task1-table": [
    { question: "Tables often contain too much data. What should you do?", options: ["Describe every cell.", "Select the most significant data points and group them.", "Only describe the first row.", "Convert to a chart."], answer: 1, explanation: "Selectivity is rewarded; describing everything loses focus." },
    { question: "Best comparative for table data?", options: ["was twice as high as / was three times greater than", "was bigger", "more than", "was much"], answer: 0, explanation: "Multiplicative comparatives ('twice as…as') add precision." },
    { question: "Overview for a table should include?", options: ["Total numbers", "Highest, lowest, and any clear trend or grouping", "Color codes", "Sources only"], answer: 1, explanation: "Same as charts: identify extremes and key patterns." },
  ],
  "writing-task1-mixed-overview": [
    { question: "When given a chart AND a table together, the overview must cover…", options: ["only the chart", "only the table", "main features of BOTH visuals", "neither"], answer: 2, explanation: "Examiners check that you've identified the big picture across all visuals." },
    { question: "Best linker between two visuals?", options: ["And, and, and", "Meanwhile / In contrast / Similarly,", "But", "Then"], answer: 1, explanation: "Sophisticated linkers signal cohesion across paragraphs." },
    { question: "If the chart shows trends and table shows totals, body paragraphs should…", options: ["mix all numbers randomly", "separate by visual: one paragraph on trends, one on totals", "skip the totals", "list only"], answer: 1, explanation: "Logical grouping by visual type keeps Coherence high." },
  ],
  "writing-task1-process-diagram": [
    { question: "Best sequencer for steps 3-5 of a process?", options: ["First, then, finally", "Subsequently, following this, at the final stage", "Number 3, number 4, number 5", "After that, after that, after that"], answer: 1, explanation: "Varied sequencers show lexical range." },
    { question: "Process diagrams normally use…", options: ["active voice", "passive voice (is/are + past participle)", "future tense", "modal verbs"], answer: 1, explanation: "Generic agents → passive voice is standard." },
    { question: "Overview for a process must state…", options: ["the number of stages and where it begins/ends", "only step 1", "the colors", "the title only"], answer: 0, explanation: "Number of stages + starting and ending points = the big picture." },
  ],
  "writing-task1-map": [
    { question: "Best phrase for 'a new road was built'?", options: ["A road was constructed / built / developed.", "A road appeared.", "A road came.", "A road made itself."], answer: 0, explanation: "Passive construction verbs are standard for new structures." },
    { question: "If a forest became a car park…", options: ["The forest was replaced by a car park / gave way to a car park.", "The forest disappeared.", "The car park ate the forest.", "Trees turned into cars."], answer: 0, explanation: "'Was replaced by' / 'gave way to' are precise academic phrases." },
    { question: "Best direction language?", options: ["up there, down there", "in the north-east, to the west of, adjacent to", "left and right", "here, there"], answer: 1, explanation: "Compass directions and prepositions show precision." },
  ],
  "writing-task1-formal-letter-complaint": [
    { question: "Best formal opener for a complaint letter?", options: ["I'm so angry about…", "I am writing to express my dissatisfaction with…", "Hey, this is not okay", "What were you thinking?"], answer: 1, explanation: "Formal complaints use 'express dissatisfaction/concern'." },
    { question: "Best closing for a complaint when no action is taken yet?", options: ["I demand action now!", "I look forward to your prompt response and a satisfactory resolution.", "Bye bye", "Hope you're well"], answer: 1, explanation: "Polite but firm 'look forward to' closes formal complaints." },
    { question: "Tone throughout a complaint letter should be…", options: ["aggressive and emotional", "firm but polite and factual", "casual and friendly", "begging"], answer: 1, explanation: "Maintain a firm-but-polite tone to score Band 7+ in register." },
  ],
  "writing-task1-semi-formal-request": [
    { question: "Best opener for a semi-formal request to a tutor?", options: ["I would like to request…", "Gimme…", "I need now…", "URGENT!"], answer: 0, explanation: "'I would like to request/ask if you could' fits semi-formal register." },
    { question: "Best modal for polite requests?", options: ["could / would", "must", "shall not", "will not"], answer: 0, explanation: "'Could you' and 'would it be possible' are politest." },
    { question: "Best closing for a semi-formal request?", options: ["Many thanks in advance for your help.", "PEACE OUT", "K thx bye", "Whatever"], answer: 0, explanation: "Polite anticipatory thanks is appropriate." },
  ],
  "writing-task1-informal-thank-you": [
    { question: "Best informal opener to a friend?", options: ["Dear Sir/Madam,", "Hi Sam, / Dear Sam,", "To whom it may concern,", "Yours sincerely,"], answer: 1, explanation: "First name + Hi/Dear = informal." },
    { question: "Best informal closing to a friend?", options: ["Yours faithfully,", "Take care / All the best / Speak soon,", "Sincerely yours,", "Regards,"], answer: 1, explanation: "Casual signoffs match informal tone." },
    { question: "Which feature signals informality?", options: ["Contractions like I'm, you're, let's", "No contractions", "Latin phrases", "Passive voice everywhere"], answer: 0, explanation: "Contractions, idioms, and exclamation marks signal informality." },
  ],
  "writing-task1-job-application": [
    { question: "Best opener for a job application letter?", options: ["I am writing to apply for the position of X advertised on…", "I want job", "Hi, give me job", "Sup"], answer: 0, explanation: "Mention the position and where you saw it." },
    { question: "Which paragraph structure works best?", options: ["Intro / qualifications / availability / closing", "Random", "Only qualifications", "Only closing"], answer: 0, explanation: "Standard application structure addresses all 3 bullets cleanly." },
    { question: "Best closing line?", options: ["I look forward to hearing from you and would welcome the opportunity to interview.", "Hope to hear back maybe.", "Whatever works", "Bye"], answer: 0, explanation: "Forward-looking closing is standard professional register." },
  ],

  // ============ WRITING TASK 2 ============
  "writing-task2-opinion": [
    { question: "What does 'To what extent do you agree?' require?", options: ["Yes/no only", "A clear position (fully/partly agree) + reasoned support", "Just describe both sides", "A neutral overview"], answer: 1, explanation: "State your position clearly and defend it throughout." },
    { question: "Best thesis location?", options: ["Last sentence of the introduction", "Hidden in the conclusion", "Middle paragraph", "Title"], answer: 0, explanation: "Examiners look for a clear thesis at the end of the intro." },
  ],
  "writing-task2-agree-disagree": [
    { question: "Which approach can also score Band 7+?", options: ["Only fully agree", "Partly agree, partly disagree with clear reasoning", "Stay neutral throughout", "Avoid taking a position"], answer: 1, explanation: "Partial agreement is fully acceptable when defended logically." },
  ],
  "writing-task2-problem-solution": [
    { question: "Structure of a problem-solution essay?", options: ["Intro / 1 paragraph problems / 1 paragraph solutions / conclusion", "Intro / 4 paragraphs of solutions", "Just one big paragraph", "Intro / conclusion only"], answer: 0, explanation: "Standard 4-paragraph structure: causes/problems → solutions." },
    { question: "Best linker to introduce solutions?", options: ["However", "To tackle this issue / A viable solution would be / To address this problem", "Therefore", "Moreover"], answer: 1, explanation: "Use solution-introducing phrases to signal the shift." },
    { question: "Each solution should be…", options: ["specific, actionable, and supported with an example or consequence", "vague and general", "a slogan", "a question"], answer: 0, explanation: "Specific + supported solutions earn Task Response marks." },
    { question: "Best modal verbs for solutions?", options: ["could / should / must / ought to", "will / shall", "may / might (only)", "do / did"], answer: 0, explanation: "Modals of suggestion/obligation suit recommendations." },
  ],
  "writing-task2-discussion-both-views": [
    { question: "A 'Discuss both views and give your opinion' essay requires…", options: ["only discuss one view", "discuss BOTH views, then state YOUR opinion clearly", "give opinion without views", "stay neutral throughout"], answer: 1, explanation: "Both views + clear personal opinion = task response complete." },
    { question: "Where should the personal opinion appear?", options: ["Only in the conclusion", "In the introduction (thesis) AND consistently reinforced", "Hidden in body 1", "Optional"], answer: 1, explanation: "State opinion early; reinforce throughout." },
    { question: "Best body structure for this essay type?", options: ["Body 1: View A / Body 2: View B + your stance", "Body 1: opinion / Body 2: opinion", "One body paragraph only", "Random order"], answer: 0, explanation: "Each body paragraph fully develops one view; opinion stitches them." },
  ],
  "writing-task2-double-question": [
    { question: "A 'two-question' prompt requires…", options: ["answering only the easier one", "answering BOTH questions, each in its own body paragraph", "skipping one question", "discussing both views"], answer: 1, explanation: "Each question gets a dedicated body paragraph." },
    { question: "Best intro for two-question essays?", options: ["Paraphrase the prompt + signpost that both questions will be answered", "Skip the intro", "Answer only one question", "Just state opinion"], answer: 0, explanation: "Signpost shows the examiner you understood the task." },
  ],
  "writing-task2-coherence-cohesion": [
    { question: "Best way to score Band 7 in Coherence/Cohesion?", options: ["Use one linker per sentence", "Use a range of linkers naturally + clear paragraphing + referencing (this, such)", "Over-use 'however' and 'moreover'", "No linkers at all"], answer: 1, explanation: "Range + natural use + referencing devices score higher than over-linking." },
    { question: "Best topic sentence pattern?", options: ["Question form", "Clear main idea introduced first, then supported", "Last sentence of the paragraph", "Hidden in the middle"], answer: 1, explanation: "Topic sentence first = examiner immediately sees the controlling idea." },
  ],
  "writing-task2-introduction-mastery": [
    { question: "Best intro length?", options: ["1 sentence", "2-3 sentences: paraphrase + thesis (+ optional outline)", "Half the essay", "5+ sentences"], answer: 1, explanation: "Concise: paraphrase the topic, then state your thesis." },
    { question: "Worst intro mistake?", options: ["Copy the prompt verbatim", "Paraphrase the prompt", "State your opinion", "Use synonyms"], answer: 0, explanation: "Copied prompts don't count toward your word total or score." },
    { question: "Best thesis pattern?", options: ["In my opinion, X is more beneficial than Y because…", "Maybe X is okay", "It depends", "X exists"], answer: 0, explanation: "Clear stance + brief reasoning = strong thesis." },
  ],
  "writing-task2-conclusion-mastery": [
    { question: "Best conclusion content?", options: ["New arguments", "Restate thesis + summarize main points + (optional) final thought", "List vocabulary", "Ask a question"], answer: 1, explanation: "Conclusions consolidate; they don't introduce new ideas." },
    { question: "Best conclusion opener?", options: ["In conclusion, / To sum up, / Ultimately,", "Once upon a time,", "By the way,", "And another thing,"], answer: 0, explanation: "Standard conclusion signposts." },
    { question: "Worst conclusion mistake?", options: ["Introducing a brand-new argument", "Paraphrasing the thesis", "Summarizing", "Final thought"], answer: 0, explanation: "New arguments undermine cohesion." },
  ],
  "writing-task2-grammar-range": [
    { question: "Band 7+ requires what mix of structures?", options: ["Only simple sentences", "Simple + compound + complex sentences with varied tenses", "Only complex sentences", "No grammar"], answer: 1, explanation: "Variety is the key — mix sentence types and tenses naturally." },
    { question: "Best advanced structure for hypotheticals?", options: ["If clauses (Type 2 & 3): If governments invested more, pollution would decrease.", "Will + bare infinitive only", "Past simple", "Imperative"], answer: 0, explanation: "Conditionals showcase advanced grammar range." },
    { question: "Which is a Band 7+ structure?", options: ["Cleft sentence: 'It is education that drives progress.'", "Simple subject-verb only", "Sentence fragments", "Run-on sentences"], answer: 0, explanation: "Cleft sentences for emphasis demonstrate range." },
  ],
  "writing-task2-cohesive-devices": [
    { question: "Which is a referencing device?", options: ["this issue / such problems / the former / the latter", "However", "Moreover", "Firstly"], answer: 0, explanation: "Referencing (this, such, former/latter) is more sophisticated than only linkers." },
    { question: "Best contrast linker variety?", options: ["However / Nevertheless / On the other hand / Conversely / By contrast", "But / But / But", "And / Also", "Then / Then"], answer: 0, explanation: "Range of contrast linkers > repetition." },
    { question: "How often to use linkers per paragraph?", options: ["Every sentence", "2-3 well-placed linkers, varied", "None", "10+"], answer: 1, explanation: "Over-linking is mechanical; under-linking loses cohesion." },
  ],
  "writing-task2-opinion-essay": [
    { question: "Best opinion-essay thesis?", options: ["Maybe I agree", "I strongly agree / partially agree / disagree with this statement because…", "There are two sides", "I don't know"], answer: 1, explanation: "Clear stance + brief reasons = strong thesis." },
    { question: "How many supporting reasons per body paragraph?", options: ["One main reason + example + explanation", "Five reasons", "No reasons", "Only an example"], answer: 0, explanation: "One developed idea > many shallow ideas (PEEL/TEEL)." },
    { question: "Which is a strong personal opinion phrase?", options: ["From my perspective, / In my view, / I firmly believe that", "Maybe perhaps possibly", "Some say maybe", "It is what it is"], answer: 0, explanation: "Clear personal opinion phrases signal stance." },
  ],
  "writing-task2-advantages-disadvantages": [
    { question: "Structure for 'discuss adv & disadv'?", options: ["Body 1: advantages / Body 2: disadvantages", "All advantages only", "All disadvantages only", "Random"], answer: 0, explanation: "Balanced structure addresses both sides equally." },
    { question: "If asked 'do advantages outweigh disadvantages?', you must…", options: ["state which side outweighs and defend it", "skip the question", "list both with no judgment", "describe only one side"], answer: 0, explanation: "The verdict question demands a clear stance." },
    { question: "Best linker to introduce a disadvantage?", options: ["On the downside / Conversely / However, a notable drawback is…", "And", "Plus", "Also"], answer: 0, explanation: "Specific contrast/drawback linkers are clearer." },
  ],
  "writing-task2-causes-effects": [
    { question: "Best linker for causes?", options: ["due to / owing to / as a result of / stems from", "however", "moreover", "finally"], answer: 0, explanation: "Cause linkers signal causation explicitly." },
    { question: "Best linker for effects?", options: ["leads to / results in / gives rise to / has a knock-on effect on", "but", "although", "while"], answer: 0, explanation: "Effect linkers are essential for this essay type." },
    { question: "Best structure?", options: ["Body 1: main causes / Body 2: main effects (or solutions)", "Mix randomly", "Only causes", "Only effects"], answer: 0, explanation: "Separate paragraphs for causes vs effects improves clarity." },
  ],
  "writing-task2-two-part-question": [
    { question: "Best body structure?", options: ["Body 1 answers Question 1; Body 2 answers Question 2", "Answer only one question", "Mix both questions in one paragraph", "Skip both"], answer: 0, explanation: "One paragraph per question is the cleanest structure." },
    { question: "Intro should signpost…", options: ["that both questions will be answered", "only one question", "no signposting", "the title"], answer: 0, explanation: "Signposting shows full task understanding." },
    { question: "Conclusion should…", options: ["briefly answer BOTH questions again", "only summarize question 1", "introduce a new question", "be optional"], answer: 0, explanation: "Conclusion mirrors the two-part structure." },
  ],
  "writing-task2-positive-negative": [
    { question: "'Is this a positive or negative development?' requires…", options: ["a clear stance (positive / negative / mostly positive but with caveats)", "no stance", "list both sides only", "describe the topic"], answer: 0, explanation: "You must take a stance and justify it." },
    { question: "Best body structure for a clear-stance answer?", options: ["Body 1: main positive aspects / Body 2: counter (negative) + rebuttal", "List 10 positives only", "Skip negatives entirely", "Random"], answer: 0, explanation: "Acknowledging the counter-side strengthens your argument." },
    { question: "Best phrase to introduce a counter-argument?", options: ["Admittedly, / While it is true that… / Critics may argue that…", "However also", "Plus", "And"], answer: 0, explanation: "Concession phrases handle counter-arguments gracefully." },
  ],
  "writing-task2-mixed-question-types": [
    { question: "First step when you see the prompt?", options: ["Identify the question type (opinion / problem-solution / discuss / 2-question)", "Start writing immediately", "Skip planning", "Memorize templates"], answer: 0, explanation: "Question type dictates structure — identify it first." },
    { question: "If the prompt has TWO tasks (e.g., causes + solutions)…", options: ["Address BOTH in separate body paragraphs", "Choose one", "Skip the harder one", "Mix randomly"], answer: 0, explanation: "All parts of the prompt must be addressed." },
    { question: "Best planning time before writing?", options: ["3-5 minutes for ideas, outline, thesis", "0 minutes", "20 minutes", "Just dive in"], answer: 0, explanation: "Quick planning saves time and improves coherence." },
  ],
  "writing-task2-paraphrasing-mastery": [
    { question: "Best paraphrasing techniques?", options: ["Synonyms + change word form + change sentence structure (active↔passive)", "Just copy the prompt", "Change one word", "Use a thesaurus blindly"], answer: 0, explanation: "Combine multiple techniques for natural paraphrasing." },
    { question: "Which is poor paraphrasing?", options: ["Replacing every word with a random synonym (sounds unnatural)", "Reordering ideas naturally", "Changing word forms", "Using passive voice"], answer: 0, explanation: "Forced synonyms ('utilise' for every 'use') sound unnatural." },
    { question: "Words you should NOT paraphrase?", options: ["Topic-specific nouns like 'climate change', 'internet', 'education'", "All words", "Verbs", "Adjectives"], answer: 0, explanation: "Some technical terms have no good synonyms — keep them." },
  ],
  "writing-task2-supporting-examples": [
    { question: "Best types of supporting evidence?", options: ["Real-world examples / statistics / hypothetical scenarios / personal experience (sparingly)", "Only personal experience", "No examples needed", "Only quotes"], answer: 0, explanation: "A mix of evidence types adds credibility." },
    { question: "Best linker to introduce examples?", options: ["For instance, / A case in point is, / To illustrate,", "Therefore", "However", "Firstly"], answer: 0, explanation: "Example linkers signal the supporting evidence." },
    { question: "Best evidence-introduction pattern?", options: ["Topic sentence → explanation → example → consequence (PEEL)", "Example only", "Topic sentence only", "Random order"], answer: 0, explanation: "PEEL (Point-Evidence-Explain-Link) structures supports clearly." },
  ],
  "band8-intro-3min": [
    { question: "Time to spend on a Band 8 intro?", options: ["3 minutes max", "10 minutes", "1 minute", "No limit"], answer: 0, explanation: "Speed matters; spend ~3 minutes on the intro to leave time for body." },
    { question: "Band 8 intros have…", options: ["sophisticated paraphrasing + clear thesis + (optional) brief outline", "5+ sentences", "no thesis", "a question"], answer: 0, explanation: "Concise but high-quality language defines Band 8." },
  ],
  "tips-peel-method": [
    { question: "What does PEEL stand for?", options: ["Point, Evidence, Explanation, Link", "Practice, Effort, English, Language", "Plan, Edit, Examine, List", "Past, Effect, Example, Link"], answer: 0, explanation: "PEEL is Point-Evidence-Explanation-Link — the body paragraph backbone." },
    { question: "Best 'Link' sentence?", options: ["Connects back to the thesis or transitions to the next paragraph.", "Asks a question.", "Repeats the topic sentence.", "Lists vocabulary."], answer: 0, explanation: "The Link cements relevance and transitions cleanly." },
    { question: "Why is PEEL useful?", options: ["It ensures every paragraph is fully developed and coherent.", "It saves time.", "It avoids ideas.", "It hides the thesis."], answer: 0, explanation: "PEEL guarantees structure → Task Response & Coherence scores." },
  ],

  // ============ SPEAKING ============
  "speaking-part2-technique": [
    { question: "Part 2 prep time is…", options: ["1 minute to plan + 2 minutes to speak", "30 seconds + 2 minutes", "2 minutes + 1 minute", "no prep"], answer: 0, explanation: "Standard timing: 1 minute prep, 2 minutes talk." },
    { question: "Best use of the 1-minute prep?", options: ["Write keywords for each bullet point + a few advanced phrases", "Write a full script", "Stare at the card", "Plan the conclusion only"], answer: 0, explanation: "Keywords + advanced phrases > full sentences (no time to read)." },
  ],
  "speaking-part3-discussion": [
    { question: "Part 3 questions are typically…", options: ["abstract, analytical, opinion-based on the Part 2 theme", "personal", "yes/no", "about your childhood"], answer: 0, explanation: "Part 3 tests abstract discussion and analysis." },
  ],
  "speaking-part1-expanding": [
    { question: "Best Part 1 answer length?", options: ["2-4 sentences with reason + example", "1 word", "1 minute monologue", "10+ sentences"], answer: 0, explanation: "Concise but developed: 2-4 sentences with brief support." },
    { question: "Best expansion pattern?", options: ["Direct answer + Reason + Example/Detail", "Direct answer only", "Long rambling story", "Repeat the question"], answer: 0, explanation: "Answer + Reason + Example = ideal Part 1 shape." },
    { question: "Worst Part 1 habit?", options: ["One-word answers ('Yes', 'No')", "Adding a reason", "Smiling", "Using contractions"], answer: 0, explanation: "Mono-syllabic answers give examiners no language to score." },
  ],
  "speaking-part2-abstract-topics": [
    { question: "How to handle a Part 2 cue card on an abstract topic?", options: ["Pick a concrete personal example to illustrate the abstract idea.", "Refuse to answer", "Stay abstract throughout", "Read the card aloud"], answer: 0, explanation: "Anchor abstract ideas in a concrete story you know well." },
    { question: "Best opener for an abstract Part 2?", options: ["The topic on the card reminds me of a time when…", "Um, I don't know", "I don't have anything to say", "Let me read the card"], answer: 0, explanation: "Bridge from abstract to personal story." },
    { question: "If you run out of ideas at 1:30, what do you do?", options: ["Add reflection: 'Looking back, this experience taught me…'", "Stop speaking", "Repeat the same point", "Apologize and quit"], answer: 0, explanation: "Reflection/lessons-learned extends naturally and earns marks." },
    { question: "Best phrase to handle a tricky bullet?", options: ["I suppose what made it special was… / If I had to pick one aspect, it would be…", "I don't know that one", "Skip", "Idk"], answer: 0, explanation: "Hedging phrases buy time while showing fluency." },
  ],
  "speaking-pronunciation-band7": [
    { question: "Band 7 pronunciation requires…", options: ["clear individual sounds + sentence stress + intonation patterns", "perfect British accent", "fast speech", "no mistakes"], answer: 0, explanation: "Intelligibility, stress, and intonation > accent." },
    { question: "Best way to show sentence stress?", options: ["Stress content words (nouns, verbs, adjectives), unstress function words", "Stress every word", "Stress nothing", "Stress only the last word"], answer: 0, explanation: "Natural English rhythm comes from content/function-word contrast." },
  ],
  "speaking-cue-card-stories": [
    { question: "Best Part 2 story structure?", options: ["Set scene → main event → outcome → reflection", "Skip the scene", "Only outcome", "Only reflection"], answer: 0, explanation: "Story arc covers all bullets and fills 2 minutes." },
    { question: "Best storytelling tense?", options: ["Past simple + past continuous for background + present perfect for impact", "Present simple only", "Future only", "No tense"], answer: 0, explanation: "Tense variety showcases grammar range." },
  ],
  "speaking-part1-natural-answers": [
    { question: "Best 'natural' filler?", options: ["Well, / Actually, / To be honest, / I'd say,", "Um um um", "Silence", "Like like like"], answer: 0, explanation: "Natural fillers buy thinking time without sounding hesitant." },
  ],
  "speaking-part1-home-hometown": [
    { question: "Best answer to 'Do you like your hometown?'", options: ["Yes, I do. What I love most is X because… For example, …", "Yes.", "No.", "It's okay."], answer: 0, explanation: "Direct answer + reason + example = Part 1 shape." },
    { question: "Useful hometown vocabulary?", options: ["bustling / vibrant / picturesque / laid-back / cosmopolitan", "good / bad / nice", "okay / fine", "big / small"], answer: 0, explanation: "Topic-specific adjectives lift lexical resource." },
    { question: "If asked 'how has your hometown changed?'…", options: ["use present perfect: 'It has become much more developed…'", "use future tense", "use past only", "use no tense"], answer: 0, explanation: "Present perfect is the natural tense for ongoing change." },
  ],
  "speaking-part1-work-study": [
    { question: "Best opener for 'What do you do?'", options: ["I'm currently studying X / I work as a Y at Z", "Job.", "I work.", "Yes."], answer: 0, explanation: "Specific job/study description gives the examiner language to follow up on." },
    { question: "Useful study/work vocabulary?", options: ["demanding / rewarding / challenging / hands-on / fast-paced", "good", "easy", "okay"], answer: 0, explanation: "Workplace adjectives lift Band score." },
    { question: "Best way to add depth?", options: ["Add a reason ('because…') and a concrete example", "Just say yes/no", "Repeat the question", "Apologize"], answer: 0, explanation: "Reason + example transforms a one-line answer into Band 7+." },
  ],
  "speaking-part1-hobbies-free-time": [
    { question: "Best Part 1 answer about hobbies?", options: ["Name the hobby + how long + why you enjoy it + a brief example", "Just name it", "List 10 hobbies", "Say none"], answer: 0, explanation: "Develop one hobby fully rather than listing many." },
    { question: "Useful hobby verbs?", options: ["I'm really into / I'm passionate about / I'm keen on / I'm hooked on", "I like", "I do", "I have"], answer: 0, explanation: "Idiomatic expressions for interest lift the score." },
    { question: "Best follow-up if asked 'Has this changed?'", options: ["Use past + present: 'I used to play X, but now I prefer Y because…'", "Only present", "Only past", "Future"], answer: 0, explanation: "Used to + now contrast showcases tense range." },
  ],
  "speaking-part1-food-cooking": [
    { question: "Best descriptive food adjectives?", options: ["mouth-watering / savoury / fragrant / hearty / mild / rich", "good", "tasty", "yum"], answer: 0, explanation: "Specific food adjectives demonstrate lexical resource." },
    { question: "If asked 'Do you cook?'…", options: ["State frequency + a typical dish + reason: 'I cook a few times a week, mostly…'", "Just say yes/no", "Describe a restaurant", "Skip"], answer: 0, explanation: "Frequency + example + reason = full Part 1 answer." },
    { question: "Useful cooking verbs?", options: ["chop / fry / simmer / season / marinate / whisk", "make food", "do food", "cook food"], answer: 0, explanation: "Specific cooking verbs are higher-band lexis." },
  ],
  "speaking-part1-tech-social-media": [
    { question: "Useful tech vocabulary?", options: ["scroll through / browse / stream / livestream / addictive / informative", "use phone", "good tech", "internet stuff"], answer: 0, explanation: "Tech collocations and adjectives lift the score." },
    { question: "If asked 'Do you use social media a lot?'", options: ["State frequency + which platforms + what for: 'I spend about an hour a day on…'", "Yes/no", "All day", "Never"], answer: 0, explanation: "Specifics give the examiner language to score." },
    { question: "Balanced answer about social media?", options: ["Acknowledge benefits AND drawbacks briefly", "Only positive", "Only negative", "No opinion"], answer: 0, explanation: "Balanced answers showcase critical thinking." },
  ],
  "speaking-part2-describe-person": [
    { question: "Best structure for 'describe a person'?", options: ["Who + how you know them + appearance/personality + why memorable", "Just name", "Only appearance", "Only personality"], answer: 0, explanation: "Cover all bullets with concrete detail." },
    { question: "Useful personality vocabulary?", options: ["easy-going / down-to-earth / outgoing / level-headed / quick-witted", "nice", "good", "okay"], answer: 0, explanation: "Idiomatic personality adjectives lift lexical resource." },
    { question: "Best reflective ending?", options: ["What makes them special to me is… / I really look up to them because…", "The end", "That's all", "Skip"], answer: 0, explanation: "Reflection covers 'why memorable' and fills time naturally." },
  ],
  "speaking-part2-describe-place": [
    { question: "Best place-description vocabulary?", options: ["picturesque / breathtaking / serene / vibrant / off-the-beaten-track", "nice place", "good place", "okay place"], answer: 0, explanation: "Place adjectives are high-frequency Band 7+ lexis." },
    { question: "Best Part 2 place structure?", options: ["Where + how often you go + what's special + why you love it", "Just name it", "Only how often", "Skip bullets"], answer: 0, explanation: "Cover all bullets for Task Achievement." },
    { question: "Useful place prepositions?", options: ["nestled in / tucked away in / on the outskirts of / in the heart of", "in", "at", "on"], answer: 0, explanation: "Idiomatic place phrases lift the score." },
  ],
  "speaking-part2-describe-object": [
    { question: "Best object-description structure?", options: ["What it is + how you got it + what it looks like + why it's important", "Just name", "Only appearance", "Only sentimental value"], answer: 0, explanation: "Cover all bullets; sentimental value is the key 'memorable' element." },
    { question: "Useful descriptive vocabulary?", options: ["sentimental value / heirloom / cherished / treasured / one of a kind", "good", "nice", "old"], answer: 0, explanation: "Emotional-value adjectives suit personal-object descriptions." },
    { question: "Best reflective ending?", options: ["It means a lot to me because… / I'd be devastated if I lost it because…", "That's it", "End", "Skip"], answer: 0, explanation: "Emotional reflection fills time and earns lexical marks." },
  ],
  "speaking-part2-describe-event": [
    { question: "Best event tense?", options: ["Past simple for main events + past continuous for background + present perfect for impact", "Present only", "Future only", "No tenses"], answer: 0, explanation: "Tense variety in storytelling is essential." },
    { question: "Useful event vocabulary?", options: ["once-in-a-lifetime / unforgettable / milestone / turning point", "good event", "nice event", "okay"], answer: 0, explanation: "Idiomatic event vocabulary lifts the score." },
    { question: "Best ending?", options: ["Looking back, it was a turning point because…", "End", "Skip", "Repeat the question"], answer: 0, explanation: "Reflection + lesson-learned closes the story powerfully." },
  ],
  "speaking-part2-describe-activity": [
    { question: "Useful activity vocabulary?", options: ["take up / get into / dabble in / be hooked on / unwind by doing", "do", "make", "play"], answer: 0, explanation: "Phrasal verbs/collocations for activities lift the score." },
    { question: "Best structure?", options: ["What the activity is + how often + why you enjoy it + benefits", "Just name it", "Only frequency", "Only benefits"], answer: 0, explanation: "Cover all bullets, especially 'why' for lexical depth." },
    { question: "Best reflective ending?", options: ["It's become a real escape / It keeps me grounded / It's good for my mental wellbeing.", "End", "That's all", "Skip"], answer: 0, explanation: "Wellbeing-themed reflection adds depth and modern lexis." },
  ],
  "speaking-part2-time-management": [
    { question: "Best signpost to manage 2 minutes?", options: ["So… (start) / Moving on to… (mid) / All things considered… (end)", "No signposts", "Same phrase always", "Stop talking"], answer: 0, explanation: "Signposts structure your talk and signal fluency." },
    { question: "If you finish early, what do you do?", options: ["Add reflection: 'In hindsight, …' or compare to a similar experience", "Stop and apologize", "Repeat the bullet points", "Stay silent"], answer: 0, explanation: "Adding reflection naturally extends your talk." },
    { question: "If you run over time, what happens?", options: ["The examiner will stop you politely — no penalty, but plan to hit 1:30-2:00", "You fail", "You get extra marks", "Speak louder"], answer: 0, explanation: "Aim for 1:30-2:00; the examiner manages the cutoff." },
  ],
  "speaking-part3-comparing-contrasting": [
    { question: "Useful comparing/contrasting phrases?", options: ["whereas / on the other hand / by contrast / similarly / in much the same way", "and / but", "also / too", "yes / no"], answer: 0, explanation: "Range of contrast linkers is essential for Part 3 analysis." },
    { question: "Best comparative structure?", options: ["X is significantly more X than Y, primarily because…", "X better Y", "X is good", "Y is bad"], answer: 0, explanation: "Sophisticated comparatives + reasoning earn Band 7+." },
    { question: "Best way to extend a Part 3 comparison?", options: ["Add a reason + example + a hypothetical: 'If X were available in Y, …'", "One sentence", "Yes/no", "Repeat question"], answer: 0, explanation: "Reason + example + hypothetical = full Part 3 development." },
  ],
  "speaking-part3-speculating-predicting": [
    { question: "Best modals for speculation?", options: ["might / could / may well / is likely to / is bound to", "will (always)", "must", "do"], answer: 0, explanation: "Hedged modals are the language of speculation." },
    { question: "Best future-prediction phrase?", options: ["In the foreseeable future, … / It wouldn't surprise me if… / We're likely to see…", "Future will happen", "Tomorrow yes", "I don't know"], answer: 0, explanation: "Sophisticated future phrases lift the score." },
    { question: "Best hypothetical structure?", options: ["If governments were to invest more, … would probably… (Type 2 conditional)", "Will is", "Past tense only", "No condition"], answer: 0, explanation: "Type 2 conditional is essential for speculation." },
  ],
  "speaking-part3-cause-effect-analysis": [
    { question: "Useful cause phrases?", options: ["stems from / is rooted in / can be attributed to / is largely due to", "because", "so", "and"], answer: 0, explanation: "Sophisticated cause expressions are Band 7+ lexis." },
    { question: "Useful effect phrases?", options: ["has knock-on effects on / gives rise to / paves the way for / has far-reaching consequences", "so", "then", "and"], answer: 0, explanation: "Effect phrases enhance analysis." },
    { question: "Best Part 3 cause-effect chain?", options: ["This stems from X, which in turn leads to Y, ultimately resulting in Z.", "Because Y", "It happens", "X and Y"], answer: 0, explanation: "Multi-step causal chains showcase analytical depth." },
  ],
  "speaking-part3-opinion-justification": [
    { question: "Best opinion frames?", options: ["Personally, I'm of the opinion that… / I would argue that… / It seems to me that…", "I think", "Yes", "Maybe"], answer: 0, explanation: "Sophisticated opinion frames are Band 7+ register." },
    { question: "Best justification structure?", options: ["Opinion + Reason + Example/Evidence + Acknowledgement of counter-view", "Just opinion", "Just example", "Just reason"], answer: 0, explanation: "Full justification + counter-acknowledgement shows critical thinking." },
    { question: "Best concession phrase?", options: ["That said, / Having said that, / Admittedly, / While I acknowledge that…", "But", "Plus", "And"], answer: 0, explanation: "Concession phrases demonstrate balanced thinking." },
  ],
  "speaking-part3-abstract-discussion": [
    { question: "Best way to handle abstract Part 3 questions?", options: ["Anchor abstract ideas in concrete examples (society, history, your country)", "Stay abstract throughout", "Refuse to answer", "Just say I don't know"], answer: 0, explanation: "Concrete examples illustrate abstract claims clearly." },
    { question: "Useful abstract vocabulary?", options: ["fundamentally / inherently / arguably / conceivably / in principle", "very", "really", "so"], answer: 0, explanation: "Abstract adverbs lift lexical resource." },
    { question: "Best phrase to broaden a discussion?", options: ["On a broader scale, / From a societal perspective, / In the grand scheme of things,", "And also", "Plus", "Too"], answer: 0, explanation: "Broadening phrases signal big-picture thinking." },
  ],
  "speaking-part3-buying-time-naturally": [
    { question: "Best natural thinking phrases?", options: ["That's an interesting question. / Let me think for a moment. / I haven't really thought about it, but I suppose…", "Um um", "Silence", "I don't know"], answer: 0, explanation: "Natural fillers buy time without sounding hesitant." },
    { question: "Worst thinking habit?", options: ["Long silence or 'um um um'", "Saying 'let me think'", "Smiling", "A short pause with a phrase"], answer: 0, explanation: "Silence loses fluency marks; use a natural filler." },
    { question: "Best way to recover if you lose your point mid-sentence?", options: ["Where was I? Oh yes, … / Going back to what I was saying, …", "Stop", "Apologize and quit", "Start over completely"], answer: 0, explanation: "Recovery phrases maintain fluency naturally." },
  ],
  "natural-fillers-speaking": [
    { question: "Best 'thinking' fillers?", options: ["Well, / Actually, / You know, / To be honest,", "Um um um", "Like like like", "Silence"], answer: 0, explanation: "Natural fillers buy time and sound native." },
    { question: "How often to use fillers?", options: ["Sparingly — once or twice per Part 1 answer", "In every sentence", "Never", "Only at the start"], answer: 0, explanation: "Over-use becomes a hesitation marker; under-use sounds robotic." },
  ],
  "tips-speaking-general-specific": [
    { question: "Best speaking structure?", options: ["Start with a general statement, then narrow to a specific example.", "Start with vocabulary list", "Skip the general statement", "Only specifics"], answer: 0, explanation: "General → specific = natural English thinking pattern." },
    { question: "Best opener for a general-specific answer?", options: ["Generally speaking, … / By and large, … / For the most part, …", "Maybe", "I don't know", "Yes"], answer: 0, explanation: "General-statement openers signal the structure." },
    { question: "Best transition to specific?", options: ["For instance, / Take my own experience: / A good example would be…", "And", "Then", "But"], answer: 0, explanation: "Example transitions are essential signposts." },
    { question: "Why does general-specific work?", options: ["Examiners hear topic-relevant vocabulary AND personal authenticity.", "It's shorter", "It avoids ideas", "It's easier"], answer: 0, explanation: "Range + authenticity = high marks across all criteria." },
  ],
};

/** Returns combined quiz (original + extras), padding to at least 5 entries when extras exist. */
export function getLectureQuizWithExtras(lectureId: string, originalQuiz: LectureQuizQuestion[]): LectureQuizQuestion[] {
  const extras = lectureQuizExtras[lectureId] ?? [];
  if (extras.length === 0) return originalQuiz;
  return [...originalQuiz, ...extras];
}
