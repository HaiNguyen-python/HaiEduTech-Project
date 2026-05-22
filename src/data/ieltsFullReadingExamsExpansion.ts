/**
 * @file ieltsFullReadingExamsExpansion.ts
 * @description Additional Cambridge-style IELTS Academic Reading exams.
 * Each follows the same shape as IELTS_FULL_READING_EXAMS.
 */
import type { ReadingExam } from "./ieltsFullReadingExams";

export const IELTS_FULL_READING_EXAMS_EXPANSION: ReadingExam[] = [
  {
    id: "rx-cam-1",
    title: "Test 6 — The Science of Sleep (Extended)",
    level: "Medium",
    durationMinutes: 20,
    passageTitle: "The Science of Sleep",
    passage:
`A. For most of human history, sleep was considered a passive, almost wasted state. The dominant view well into the twentieth century was that the brain effectively shut down at night, recharging in a way analogous to a battery. Modern neuroscience has overturned this assumption almost entirely. Brain-imaging studies now show that during sleep the brain is remarkably active, cycling through distinct stages that each serve specific biological functions.

B. Sleep architecture is conventionally divided into rapid eye movement (REM) sleep and three stages of non-REM sleep. Slow-wave sleep — the deepest non-REM stage — is when growth hormone is released and when the brain consolidates declarative memories such as facts and events. REM sleep, by contrast, is closely linked to procedural learning and emotional processing. Skills practised in the afternoon are measurably sharper after a night that includes adequate REM.

C. The discovery of the glymphatic system in 2013 added a striking dimension to the picture. Researchers at the University of Rochester demonstrated that the space between brain cells expands by some sixty percent during deep sleep, allowing cerebrospinal fluid to flush out metabolic by-products including beta-amyloid, a protein implicated in Alzheimer's disease. Chronic sleep deprivation, the team suggested, may therefore raise long-term neurodegenerative risk.

D. Despite this evidence, modern societies sleep less than ever. National surveys in the United States, the United Kingdom and Japan report that one in three adults sleep fewer than six hours a night, well below the seven to nine hours recommended for most people. Causes range from artificial light and round-the-clock connectivity to demanding work cultures that treat exhaustion as a badge of honour.

E. Public-health responses have begun to catch up. Several school districts in the United States have shifted high-school start times to after 8:30 a.m., citing studies showing measurable gains in attendance, grades and even traffic-accident rates. France has experimented with workplace "right to disconnect" legislation that limits after-hours email. Even so, individual habits remain the largest lever: regular sleep timing, dim evening light and limited late-night screens are consistently identified as the most effective interventions.`,
    questions: [
      { number: 1, type: "matching-headings", prompt: "Choose the best heading for Paragraph A.",
        headings: [
          { label: "i", text: "The brain is active, not idle, during sleep" },
          { label: "ii", text: "Newly discovered cleansing mechanism" },
          { label: "iii", text: "Policy responses to sleep loss" },
          { label: "iv", text: "Declining sleep in modern society" },
        ], answer: "i" },
      { number: 2, type: "matching-headings", prompt: "Choose the best heading for Paragraph B.",
        headings: [
          { label: "i", text: "Why sleep differs by age" },
          { label: "ii", text: "Specific functions of REM and non-REM" },
          { label: "iii", text: "Sleep and cardiovascular risk" },
          { label: "iv", text: "Cultural attitudes to rest" },
        ], answer: "ii" },
      { number: 3, type: "matching-headings", prompt: "Choose the best heading for Paragraph C.",
        headings: [
          { label: "i", text: "The brain's nightly clean-up" },
          { label: "ii", text: "Memory and learning gains" },
          { label: "iii", text: "Hormonal cycles during sleep" },
          { label: "iv", text: "International comparisons" },
        ], answer: "i" },
      { number: 4, type: "multiple-choice", prompt: "What did pre-twentieth century thinkers generally believe about sleep?",
        options: ["It was a state of intense brain activity", "It was a passive, recharging state", "It was harmful to long-term health", "It varied widely between individuals"], answer: "It was a passive, recharging state" },
      { number: 5, type: "multiple-choice", prompt: "According to the passage, slow-wave sleep is most associated with:",
        options: ["procedural skills", "emotional regulation", "consolidation of facts and events", "muscle repair only"], answer: "consolidation of facts and events" },
      { number: 6, type: "multiple-choice", prompt: "The 2013 Rochester study showed that during deep sleep the space between brain cells:",
        options: ["shrinks slightly", "expands by about 60%", "remains constant", "fills with new neurons"], answer: "expands by about 60%" },
      { number: 7, type: "fill-blank", prompt: "Beta-amyloid is a protein linked to ___ disease.", answer: "Alzheimer's" },
      { number: 8, type: "fill-blank", prompt: "Surveys in three countries found one in ___ adults sleep fewer than six hours.", answer: "three" },
      { number: 9, type: "fill-blank", prompt: "Some US school districts moved start times to after ___ a.m.", answer: "8:30" },
      { number: 10, type: "fill-blank", prompt: "France introduced a 'right to ___' law on after-hours email.", answer: "disconnect" },
      { number: 11, type: "multiple-choice", prompt: "Which intervention is NOT named as effective in the passage?",
        options: ["Regular sleep timing", "Dim evening light", "Limiting late-night screens", "Daily caffeine reduction"], answer: "Daily caffeine reduction" },
      { number: 12, type: "fill-blank", prompt: "The recommended sleep range for most adults is ___ to nine hours.", answer: "seven" },
      { number: 13, type: "multiple-choice", prompt: "The author's overall stance on sleep can best be described as:",
        options: ["sceptical of recent research", "concerned but constructive", "indifferent", "alarmist"], answer: "concerned but constructive" },
    ],
  },
  {
    id: "rx-cam-2",
    title: "Test 7 — The Rise of Vertical Farming",
    level: "Hard",
    durationMinutes: 20,
    passageTitle: "The Rise of Vertical Farming",
    passage:
`A. Vertical farming — the cultivation of crops in stacked, climate-controlled indoor environments — was for decades dismissed as economically implausible. Early prototypes were criticised as glorified science experiments, dependent on subsidised electricity and unable to compete with field agriculture at scale. The first decade of the twenty-first century, however, brought three converging changes that altered the calculation: the rapid fall in the price of light-emitting diodes, advances in hydroponic and aeroponic nutrient delivery, and rising consumer demand for pesticide-free, locally grown produce.

B. The economic case rests on yield density. A well-designed vertical farm can produce between 50 and 100 times the output of an open-field operation per square metre of footprint. Because the growing environment is fully sealed, crops are unaffected by drought, pests or seasonal variation, allowing twelve to fifteen harvests of leafy greens each year compared with one or two outdoors. Water consumption is reduced by roughly 95% through closed-loop recirculation, a powerful selling point in water-stressed regions.

C. The technology is not without limitations. Energy intensity remains the principal constraint: lighting and climate control can account for more than half of operating costs, meaning profitability is heavily dependent on electricity prices and on the availability of renewable supply. Crops that demand long, intense growing cycles — staples such as wheat, rice and maize — are still far cheaper to grow conventionally. As a result, commercial vertical farms have so far concentrated on high-value, short-cycle produce: salad greens, herbs, microgreens, strawberries and a handful of speciality vegetables.

D. Geographically, the industry has clustered in places that combine high land prices, reliable electricity and strong consumer willingness to pay. Singapore, the United Arab Emirates and Japan have moved early, often with explicit government backing tied to food-security strategies. In Europe, the Netherlands has leveraged its world-leading horticultural expertise, while in North America a handful of large operators have built warehouse-scale facilities near major cities to shorten supply chains.

E. The long-term role of vertical farming in global food systems remains contested. Critics argue that even at scale it will remain a niche solution, supplying premium produce to wealthy urban markets rather than feeding the world. Advocates counter that as renewable electricity becomes cheaper and as climate volatility intensifies, vertical farming offers a uniquely resilient and land-sparing model. A more pragmatic view is that it will complement rather than replace conventional agriculture, occupying a specific and growing niche where its strengths align with local conditions.`,
    questions: [
      { number: 1, type: "matching-headings", prompt: "Best heading for Paragraph A:",
        headings: [
          { label: "i", text: "Why early scepticism gave way" },
          { label: "ii", text: "The role of government policy" },
          { label: "iii", text: "Crops best suited to vertical farms" },
          { label: "iv", text: "The future of staple grains" },
        ], answer: "i" },
      { number: 2, type: "matching-headings", prompt: "Best heading for Paragraph B:",
        headings: [
          { label: "i", text: "Energy as the main cost" },
          { label: "ii", text: "Yield and water advantages" },
          { label: "iii", text: "Regional clusters" },
          { label: "iv", text: "Public perception of indoor produce" },
        ], answer: "ii" },
      { number: 3, type: "matching-headings", prompt: "Best heading for Paragraph C:",
        headings: [
          { label: "i", text: "Limits and crop selection" },
          { label: "ii", text: "Hydroponic breakthroughs" },
          { label: "iii", text: "Renewable supply chains" },
          { label: "iv", text: "The Singapore model" },
        ], answer: "i" },
      { number: 4, type: "multiple-choice", prompt: "The author identifies which THREE changes that improved vertical farming's economics?",
        options: ["Cheaper LEDs, better nutrient systems, consumer demand", "Government grants, cheaper land, GMO crops", "Lower wages, better seeds, larger fields", "Higher fuel prices, automation, satellite imagery"], answer: "Cheaper LEDs, better nutrient systems, consumer demand" },
      { number: 5, type: "fill-blank", prompt: "Vertical farms can yield 50 to ___ times more per square metre than fields.", answer: "100" },
      { number: 6, type: "fill-blank", prompt: "Water use is cut by about ___ % through closed-loop systems.", answer: "95" },
      { number: 7, type: "multiple-choice", prompt: "Why are wheat and rice rarely grown in vertical farms?",
        options: ["They damage the lighting", "Their long, intense cycles make them cheaper to grow outdoors", "They are banned by regulation", "They lack consumer demand"], answer: "Their long, intense cycles make them cheaper to grow outdoors" },
      { number: 8, type: "fill-blank", prompt: "Vertical farms have clustered in regions with high land prices, reliable power and willing ___.", answer: "consumers" },
      { number: 9, type: "multiple-choice", prompt: "Which country leverages existing horticultural expertise in vertical farming?",
        options: ["Singapore", "UAE", "Netherlands", "Japan"], answer: "Netherlands" },
      { number: 10, type: "multiple-choice", prompt: "Critics argue that vertical farming will:",
        options: ["replace all field agriculture", "remain a niche serving wealthy markets", "be banned for health reasons", "collapse within ten years"], answer: "remain a niche serving wealthy markets" },
      { number: 11, type: "multiple-choice", prompt: "The author's own conclusion is best described as:",
        options: ["enthusiastic and uncritical", "dismissive", "balanced and pragmatic", "deeply pessimistic"], answer: "balanced and pragmatic" },
      { number: 12, type: "fill-blank", prompt: "Energy can account for over ___ % of operating costs.", answer: "half" },
      { number: 13, type: "fill-blank", prompt: "Leafy greens may be harvested ___ to fifteen times a year indoors.", answer: "twelve" },
    ],
  },
];
