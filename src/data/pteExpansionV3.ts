/**
 * @file pteExpansionV3.ts
 * @description PTE Academic v3 expansion — ~20 items per task type across 4 academic themes
 *              (Science/Tech, Education/Society, Business/Economy, Health/Environment).
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type {
  PteReadAloud, PteRepeatSentence, PteEssayPrompt, PteSummarizeText,
  PteFillBlank, PteReorderItem, PteDictation, PteSummarizeSpoken,
  PteDescribeImage, PteMcq, PteHighlightIncorrect,
} from "./pteData";

/* ============================================================
 * SPEAKING — Read Aloud (20 items, 5 per theme)
 * ============================================================ */
export const READ_ALOUD_V3: PteReadAloud[] = [
  // Science & Tech
  { id: "ra-v3-01", topic: "Quantum computing", difficulty: "hard", prepSeconds: 35, recordSeconds: 40, targetBand: "79+",
    text: "Quantum computers exploit superposition and entanglement to process information in ways classical machines cannot, promising breakthroughs in cryptography, drug discovery and optimisation problems that remain intractable today." },
  { id: "ra-v3-02", topic: "Artificial intelligence ethics", difficulty: "medium", prepSeconds: 35, recordSeconds: 40, targetBand: "65",
    text: "As AI systems increasingly mediate hiring, lending and medical decisions, scholars warn that opaque algorithms can entrench bias unless developers prioritise transparency, accountability and rigorous auditing throughout the design process." },
  { id: "ra-v3-03", topic: "CRISPR gene editing", difficulty: "hard", prepSeconds: 35, recordSeconds: 40, targetBand: "79+",
    text: "CRISPR-Cas9 has revolutionised molecular biology by enabling precise edits to DNA sequences, yet its therapeutic applications still depend on solving delivery, off-target effects and complex ethical concerns." },
  { id: "ra-v3-04", topic: "Renewable energy storage", difficulty: "medium", prepSeconds: 35, recordSeconds: 40, targetBand: "65",
    text: "Grid-scale lithium and flow batteries are now cheap enough to smooth the intermittency of solar and wind farms, accelerating the global transition away from fossil fuels in many advanced economies." },
  { id: "ra-v3-05", topic: "Space exploration", difficulty: "easy", prepSeconds: 30, recordSeconds: 40, targetBand: "50",
    text: "Reusable rockets have dramatically lowered the cost of reaching low Earth orbit, sparking new research missions and commercial ventures in satellite communications and space tourism." },

  // Education & Society
  { id: "ra-v3-06", topic: "Online learning", difficulty: "medium", prepSeconds: 35, recordSeconds: 40, targetBand: "65",
    text: "Massive open online courses widen access to elite university content, but completion rates remain low because many learners lack the structured support that traditional classrooms provide." },
  { id: "ra-v3-07", topic: "University funding", difficulty: "hard", prepSeconds: 35, recordSeconds: 40, targetBand: "79+",
    text: "When public subsidies decline, universities increasingly rely on tuition fees and corporate partnerships, raising concerns about the autonomy of academic research and the affordability of higher education." },
  { id: "ra-v3-08", topic: "Urbanisation", difficulty: "medium", prepSeconds: 35, recordSeconds: 40, targetBand: "65",
    text: "Rapid urbanisation in developing nations creates dynamic labour markets but also strains housing, transport and sanitation infrastructure, exposing migrants to precarious living conditions." },
  { id: "ra-v3-09", topic: "Bilingual education", difficulty: "easy", prepSeconds: 30, recordSeconds: 40, targetBand: "50",
    text: "Children raised in bilingual environments often demonstrate superior cognitive flexibility and metalinguistic awareness, advantages that persist into adulthood and benefit professional life." },
  { id: "ra-v3-10", topic: "Inequality", difficulty: "hard", prepSeconds: 35, recordSeconds: 40, targetBand: "79+",
    text: "Persistent income inequality undermines social mobility and erodes trust in democratic institutions, prompting economists to revisit progressive taxation, universal services and place-based investment policies." },

  // Business & Economy
  { id: "ra-v3-11", topic: "Globalisation", difficulty: "medium", prepSeconds: 35, recordSeconds: 40, targetBand: "65",
    text: "Globalisation has lifted millions out of poverty by integrating supply chains across continents, yet the same interconnectedness amplifies the impact of trade disputes and pandemics." },
  { id: "ra-v3-12", topic: "Gig economy", difficulty: "medium", prepSeconds: 35, recordSeconds: 40, targetBand: "65",
    text: "Platform-based gig work offers flexibility but transfers risks such as illness, retirement and income volatility from employers to workers, prompting regulators to rethink labour protections." },
  { id: "ra-v3-13", topic: "Sustainable finance", difficulty: "hard", prepSeconds: 35, recordSeconds: 40, targetBand: "79+",
    text: "Investors are increasingly directing capital towards companies with credible environmental, social and governance frameworks, although standardised reporting remains essential to prevent greenwashing." },
  { id: "ra-v3-14", topic: "Entrepreneurship", difficulty: "easy", prepSeconds: 30, recordSeconds: 40, targetBand: "50",
    text: "Successful entrepreneurs identify a clear customer problem, validate solutions through rapid experimentation and build resilient teams long before pursuing significant external investment." },
  { id: "ra-v3-15", topic: "Central banking", difficulty: "hard", prepSeconds: 35, recordSeconds: 40, targetBand: "79+",
    text: "Central banks must balance their mandates for price stability and full employment, often deploying unconventional tools such as quantitative easing when traditional interest rate policy reaches its lower bound." },

  // Health & Environment
  { id: "ra-v3-16", topic: "Mental health", difficulty: "medium", prepSeconds: 35, recordSeconds: 40, targetBand: "65",
    text: "Public health agencies now treat mental wellbeing with the same seriousness as physical illness, expanding access to evidence-based therapies and challenging long-standing cultural stigma." },
  { id: "ra-v3-17", topic: "Antibiotic resistance", difficulty: "hard", prepSeconds: 35, recordSeconds: 40, targetBand: "79+",
    text: "The overuse of antibiotics in human medicine and livestock farming has accelerated the emergence of drug-resistant pathogens, threatening to undo a century of medical progress against infectious diseases." },
  { id: "ra-v3-18", topic: "Air pollution", difficulty: "medium", prepSeconds: 35, recordSeconds: 40, targetBand: "65",
    text: "Fine particulate matter from traffic and industry penetrates deep into the lungs and bloodstream, contributing to respiratory disease, cardiovascular events and millions of premature deaths each year." },
  { id: "ra-v3-19", topic: "Biodiversity loss", difficulty: "hard", prepSeconds: 35, recordSeconds: 40, targetBand: "79+",
    text: "Habitat destruction, invasive species and climate change are driving an unprecedented decline in biodiversity, jeopardising the ecosystem services upon which agriculture and human health ultimately depend." },
  { id: "ra-v3-20", topic: "Vaccination", difficulty: "easy", prepSeconds: 30, recordSeconds: 40, targetBand: "50",
    text: "Vaccination campaigns have eradicated smallpox and dramatically reduced the burden of measles, polio and other infectious diseases that once caused widespread suffering and death." },
];

/* ============================================================
 * SPEAKING — Repeat Sentence (20 items)
 * ============================================================ */
export const REPEAT_SENTENCE_V3: PteRepeatSentence[] = [
  { id: "rs-v3-01", recordSeconds: 15, accent: "US", text: "Quantum encryption could one day make standard internet communication virtually unbreakable." },
  { id: "rs-v3-02", recordSeconds: 15, accent: "UK", text: "The lecturer will discuss neural networks during tomorrow afternoon's seminar in the engineering hall." },
  { id: "rs-v3-03", recordSeconds: 15, accent: "AU", text: "Researchers have identified a promising new compound for treating early-stage Alzheimer's disease." },
  { id: "rs-v3-04", recordSeconds: 15, accent: "US", text: "Solar panels installed on residential rooftops can offset most household electricity consumption." },
  { id: "rs-v3-05", recordSeconds: 15, accent: "UK", text: "Most postgraduate scholarships require a personal statement and two academic references." },
  { id: "rs-v3-06", recordSeconds: 15, accent: "AU", text: "The university library will remain open twenty-four hours during the final examination period." },
  { id: "rs-v3-07", recordSeconds: 15, accent: "US", text: "City planners are redesigning suburbs to reduce car dependency and encourage walking." },
  { id: "rs-v3-08", recordSeconds: 15, accent: "UK", text: "Inflation has prompted the central bank to raise interest rates for the third consecutive quarter." },
  { id: "rs-v3-09", recordSeconds: 15, accent: "AU", text: "Several start-ups are competing to develop affordable carbon capture technology." },
  { id: "rs-v3-10", recordSeconds: 15, accent: "US", text: "Workers in the gig economy often lack access to traditional employment benefits." },
  { id: "rs-v3-11", recordSeconds: 15, accent: "UK", text: "Sustainable investing has grown rapidly as pension funds prioritise climate risk." },
  { id: "rs-v3-12", recordSeconds: 15, accent: "AU", text: "Entrepreneurs need both technical expertise and strong communication skills to succeed." },
  { id: "rs-v3-13", recordSeconds: 15, accent: "US", text: "Doctors recommend regular exercise to improve both physical and mental wellbeing." },
  { id: "rs-v3-14", recordSeconds: 15, accent: "UK", text: "Resistance to common antibiotics is rising in hospitals across Europe and Asia." },
  { id: "rs-v3-15", recordSeconds: 15, accent: "AU", text: "Air quality monitoring stations have been installed throughout the metropolitan region." },
  { id: "rs-v3-16", recordSeconds: 15, accent: "US", text: "Conservationists are working to protect endangered species in tropical rainforests." },
  { id: "rs-v3-17", recordSeconds: 15, accent: "UK", text: "Recent vaccination drives have significantly reduced child mortality rates worldwide." },
  { id: "rs-v3-18", recordSeconds: 15, accent: "AU", text: "Online courses allow students to learn at their own pace from anywhere in the world." },
  { id: "rs-v3-19", recordSeconds: 15, accent: "US", text: "Many universities now offer interdisciplinary programs combining science and humanities." },
  { id: "rs-v3-20", recordSeconds: 15, accent: "UK", text: "The government plans to increase funding for renewable energy research over the next decade." },
];

/* ============================================================
 * SPEAKING — Describe Image (10 items)
 * ============================================================ */
export const DESCRIBE_IMAGE_V3: PteDescribeImage[] = [
  { id: "di-v3-01", title: "Bar chart: AI investment by sector 2026", chartType: "bar", prepSeconds: 25, recordSeconds: 40, targetBand: "65",
    emojiVisual: "📊 Healthcare 38B | Finance 27B | Retail 19B | Manufacturing 14B",
    keywords: ["bar chart", "AI investment", "healthcare", "finance", "leading sector", "billion dollars"],
    modelAnswer: "The bar chart compares global AI investment across four sectors in 2026. Healthcare leads with 38 billion dollars, followed by finance at 27 billion. Retail attracts 19 billion while manufacturing receives the smallest share at 14 billion, reflecting how diagnostic and risk modelling applications continue to dominate enterprise AI spending." },
  { id: "di-v3-02", title: "Line graph: Global renewable capacity 2010-2025", chartType: "line", prepSeconds: 25, recordSeconds: 40, targetBand: "79+",
    emojiVisual: "📈 2010: 1.2TW → 2015: 1.9TW → 2020: 2.8TW → 2025: 4.5TW",
    keywords: ["line graph", "renewable capacity", "terawatt", "steady growth", "tripled", "fifteen-year period"],
    modelAnswer: "The line graph illustrates the steady expansion of global renewable energy capacity from 2010 to 2025. Starting at 1.2 terawatts, capacity rose to 1.9 terawatts by 2015 and 2.8 terawatts by 2020 before accelerating to 4.5 terawatts in 2025. Overall, capacity nearly tripled across the fifteen-year period." },
  { id: "di-v3-03", title: "Pie chart: University expenditure", chartType: "pie", prepSeconds: 25, recordSeconds: 40, targetBand: "65",
    emojiVisual: "🥧 Salaries 52% | Research 18% | Facilities 15% | Scholarships 10% | Other 5%",
    keywords: ["pie chart", "expenditure", "salaries", "largest portion", "research", "scholarships"],
    modelAnswer: "The pie chart breaks down a typical university's annual expenditure. Staff salaries account for the largest portion at 52 percent, followed by research at 18 percent and facilities at 15 percent. Scholarships make up 10 percent while a residual 5 percent covers other administrative costs." },
  { id: "di-v3-04", title: "Process: Water treatment plant", chartType: "process", prepSeconds: 25, recordSeconds: 40, targetBand: "65",
    emojiVisual: "🔄 Intake → Screening → Sedimentation → Filtration → Disinfection → Storage",
    keywords: ["process", "water treatment", "screening", "sedimentation", "filtration", "disinfection", "consumers"],
    modelAnswer: "The diagram outlines the six stages of municipal water treatment. Raw water first enters through an intake before passing screening that removes large debris. Sedimentation and filtration then progressively eliminate finer particles. Finally, disinfection kills pathogens before treated water is stored and distributed to consumers." },
  { id: "di-v3-05", title: "Map: Coastal city flooding zones", chartType: "map", prepSeconds: 25, recordSeconds: 40, targetBand: "79+",
    emojiVisual: "🗺️ North district: low risk | Centre & port: high risk | South suburbs: moderate",
    keywords: ["map", "flooding zones", "coastal", "high risk", "port", "moderate"],
    modelAnswer: "The map identifies flood vulnerability across a coastal city. The northern district faces only low risk thanks to its elevation, whereas the central downtown and historic port lie in the highest-risk band. Southern suburbs are classified as moderate risk, prompting calls for upgraded sea walls and drainage infrastructure." },
  { id: "di-v3-06", title: "Bar chart: Global education spending per pupil", chartType: "bar", prepSeconds: 25, recordSeconds: 40, targetBand: "65",
    emojiVisual: "📊 Norway $14k | USA $13k | Germany $11k | Japan $9k | Brazil $4k",
    keywords: ["bar chart", "education spending", "per pupil", "Norway", "highest", "developing economies"],
    modelAnswer: "The chart compares annual education spending per pupil across five countries. Norway leads at fourteen thousand dollars, closely followed by the United States at thirteen thousand and Germany at eleven thousand. Japan invests nine thousand while Brazil sits at the bottom with only four thousand, highlighting the persistent gap between advanced and developing economies." },
  { id: "di-v3-07", title: "Line graph: Online retail share 2015-2025", chartType: "line", prepSeconds: 25, recordSeconds: 40, targetBand: "65",
    emojiVisual: "📈 2015: 8% → 2018: 12% → 2020: 18% → 2022: 22% → 2025: 26%",
    keywords: ["line graph", "online retail", "share of total", "tripled", "pandemic", "consumer habits"],
    modelAnswer: "The line graph shows how online retail's share of total sales tripled between 2015 and 2025. Starting at eight percent, it climbed steadily to twelve percent in 2018 before accelerating to eighteen percent during the pandemic in 2020. Growth continued to twenty-six percent by 2025, signalling a permanent shift in consumer habits." },
  { id: "di-v3-08", title: "Pie chart: Causes of biodiversity loss", chartType: "pie", prepSeconds: 25, recordSeconds: 40, targetBand: "79+",
    emojiVisual: "🥧 Habitat loss 41% | Climate change 23% | Pollution 14% | Invasive species 12% | Overexploitation 10%",
    keywords: ["pie chart", "biodiversity loss", "habitat destruction", "leading driver", "climate change", "intervention"],
    modelAnswer: "The pie chart attributes global biodiversity loss to five main drivers. Habitat destruction is the leading factor at forty-one percent, followed by climate change at twenty-three percent and pollution at fourteen percent. Invasive species and overexploitation contribute twelve and ten percent respectively, suggesting that conservation policy must intervene on multiple fronts." },
  { id: "di-v3-09", title: "Process: Vaccine development", chartType: "process", prepSeconds: 25, recordSeconds: 40, targetBand: "79+",
    emojiVisual: "🔄 Research → Preclinical → Phase I → Phase II → Phase III → Approval → Distribution",
    keywords: ["vaccine", "preclinical", "clinical trials", "regulatory approval", "distribution", "rigorous"],
    modelAnswer: "The flowchart depicts the multi-year journey of vaccine development. Initial research and preclinical animal studies precede three phases of clinical trials that progressively test safety and efficacy in larger human cohorts. Successful candidates undergo regulatory approval before mass production and global distribution begin." },
  { id: "di-v3-10", title: "Bar chart: Mental health prevalence by age", chartType: "bar", prepSeconds: 25, recordSeconds: 40, targetBand: "65",
    emojiVisual: "📊 18-24: 28% | 25-44: 22% | 45-64: 17% | 65+: 12%",
    keywords: ["mental health", "prevalence", "young adults", "decline", "age", "intervention"],
    modelAnswer: "The chart shows the prevalence of common mental health disorders by age group. Young adults aged eighteen to twenty-four report the highest rate at twenty-eight percent, declining steadily through middle age. Adults over sixty-five exhibit the lowest prevalence at twelve percent, although under-reporting may understate the true figure for older cohorts." },
];

/* ============================================================
 * WRITING — Essay (12 items, 3 per theme)
 * ============================================================ */
export const ESSAY_V3: PteEssayPrompt[] = [
  { id: "es-v3-01", minWords: 200, maxWords: 300, timeMinutes: 20, targetBand: "65",
    prompt: "Some people argue that artificial intelligence will create more jobs than it destroys, while others fear widespread unemployment. Discuss both views and give your own opinion.",
    modelOutline: "Intro · paraphrase + thesis (cautiously optimistic).\nBody 1: Job creation — historical pattern, new industries (AI engineering, prompt design, data ethics), productivity boosts.\nBody 2: Job loss — routine cognitive tasks, transitional displacement of administrative roles.\nConclusion: Net impact depends on retraining policy and education reform." },
  { id: "es-v3-02", minWords: 200, maxWords: 300, timeMinutes: 20, targetBand: "79+",
    prompt: "Many governments are increasing investment in renewable energy. To what extent do you agree that this is the most effective response to climate change?",
    modelOutline: "Intro · acknowledge urgency + partially agree.\nBody 1: Why renewables matter — emissions cuts, energy security, falling costs.\nBody 2: Other essential measures — efficiency standards, carbon pricing, behavioural change.\nConclusion: Renewables are necessary but insufficient on their own." },
  { id: "es-v3-03", minWords: 200, maxWords: 300, timeMinutes: 20, targetBand: "65",
    prompt: "Space exploration is extremely expensive. Some argue the money should instead address problems on Earth. Discuss both views and present your opinion.",
    modelOutline: "Intro · framing the trade-off.\nBody 1: Case for redirecting funds — poverty, healthcare, climate adaptation.\nBody 2: Case for space — spin-off technology, GPS, climate monitoring satellites, long-term species survival.\nConclusion: Balanced portfolio rather than either-or." },
  { id: "es-v3-04", minWords: 200, maxWords: 300, timeMinutes: 20, targetBand: "65",
    prompt: "Online learning has become a standard part of higher education. Do the advantages outweigh the disadvantages?",
    modelOutline: "Intro · advantages outweigh, with caveats.\nBody 1: Advantages — flexibility, lower cost, global access, recorded lectures.\nBody 2: Disadvantages — reduced peer interaction, digital divide, motivation problems.\nConclusion: Hybrid models maximise benefits." },
  { id: "es-v3-05", minWords: 200, maxWords: 300, timeMinutes: 20, targetBand: "79+",
    prompt: "Some people believe universities should focus only on academic subjects, while others believe practical job skills are equally important. Discuss both views.",
    modelOutline: "Intro · both perspectives valid in different contexts.\nBody 1: Academic focus — critical thinking, research literacy, foundational knowledge.\nBody 2: Job skills — internships, project work, employability after graduation.\nConclusion: Integrated curriculum that combines theory with applied projects." },
  { id: "es-v3-06", minWords: 200, maxWords: 300, timeMinutes: 20, targetBand: "65",
    prompt: "Living in big cities has many benefits but also serious drawbacks. Discuss both sides and give your opinion.",
    modelOutline: "Intro · benefits slightly outweigh in long run.\nBody 1: Benefits — jobs, cultural amenities, healthcare access.\nBody 2: Drawbacks — high cost of living, pollution, congestion.\nConclusion: Smart-city planning can mitigate the worst drawbacks." },
  { id: "es-v3-07", minWords: 200, maxWords: 300, timeMinutes: 20, targetBand: "65",
    prompt: "Globalisation has both positive and negative effects on local cultures. Discuss the impact and suggest how cultures can be preserved.",
    modelOutline: "Intro · double-edged sword.\nBody 1: Positives — cultural exchange, tourism revenue, language learning.\nBody 2: Negatives — homogenisation, loss of dialects, threatened crafts.\nConclusion: Government grants, education and digital archives." },
  { id: "es-v3-08", minWords: 200, maxWords: 300, timeMinutes: 20, targetBand: "79+",
    prompt: "The gig economy is reshaping employment. Should governments intervene to protect gig workers, or should the market decide?",
    modelOutline: "Intro · regulated middle path.\nBody 1: Case for intervention — sick pay, pensions, minimum income protection.\nBody 2: Case for market freedom — flexibility valued by workers, innovation by platforms.\nConclusion: Portable benefits and minimum standards without rigid employee classification." },
  { id: "es-v3-09", minWords: 200, maxWords: 300, timeMinutes: 20, targetBand: "65",
    prompt: "Some argue that companies should prioritise sustainability over profit. To what extent do you agree?",
    modelOutline: "Intro · agree they are not mutually exclusive.\nBody 1: Why sustainability matters — long-term profit, regulatory risk, brand value.\nBody 2: Practical levers — circular supply chains, carbon-aware product design.\nConclusion: Profit and sustainability reinforce each other in mature firms." },
  { id: "es-v3-10", minWords: 200, maxWords: 300, timeMinutes: 20, targetBand: "65",
    prompt: "Mental health problems are on the rise globally. What are the causes, and what can governments and individuals do to address them?",
    modelOutline: "Intro · multifactorial issue.\nBody 1: Causes — social media pressure, work stress, urban isolation, post-pandemic effects.\nBody 2: Solutions — public funding for therapy, school programs, individual habits like exercise and mindfulness.\nConclusion: Combined societal and personal action." },
  { id: "es-v3-11", minWords: 200, maxWords: 300, timeMinutes: 20, targetBand: "79+",
    prompt: "Air pollution causes millions of premature deaths each year. Discuss the most effective strategies governments can adopt to reduce it.",
    modelOutline: "Intro · multi-pronged strategy.\nBody 1: Transport — electrification, public transit, congestion charges.\nBody 2: Industry & energy — emissions caps, cleaner fuels, monitoring.\nConclusion: Policy mix tailored to local pollution sources." },
  { id: "es-v3-12", minWords: 200, maxWords: 300, timeMinutes: 20, targetBand: "65",
    prompt: "Vaccination programs have eradicated several deadly diseases. Should vaccination be made compulsory? Discuss.",
    modelOutline: "Intro · qualified support for compulsion.\nBody 1: Public health benefits — herd immunity, protection of immunocompromised.\nBody 2: Concerns — bodily autonomy, religious objections, trust in institutions.\nConclusion: Mandate for school entry plus strong communication campaign." },
];

/* ============================================================
 * WRITING — Summarize Written Text (12 items)
 * ============================================================ */
export const SUMMARIZE_TEXT_V3: PteSummarizeText[] = [
  { id: "sw-v3-01", minWords: 5, maxWords: 75, timeMinutes: 10, targetBand: "65",
    keyPoints: ["AI adoption growth", "productivity benefits", "ethical concerns"],
    passage: "Adoption of artificial intelligence in the workplace has accelerated dramatically since 2024, with surveys reporting that more than half of large enterprises now embed machine-learning models into core business processes. Productivity gains have been substantial in customer service, software engineering and logistics, where routine tasks can be automated. However, regulators warn that opaque algorithms risk perpetuating historical biases, particularly in hiring and lending, and call for mandatory audits to ensure fairness, accountability and transparency." },
  { id: "sw-v3-02", minWords: 5, maxWords: 75, timeMinutes: 10, targetBand: "79+",
    keyPoints: ["renewable cost decline", "storage breakthroughs", "policy alignment"],
    passage: "The cost of solar photovoltaic generation has fallen by more than ninety percent since 2010, transforming renewables from a niche technology into the cheapest form of new electricity in most regions. Recent advances in lithium-iron-phosphate and flow batteries are smoothing the intermittency that historically plagued wind and solar farms. Yet analysts caution that ambitious decarbonisation targets will only be met if grid-scale storage, transmission upgrades and supportive policy frameworks evolve in parallel with generation capacity." },
  { id: "sw-v3-03", minWords: 5, maxWords: 75, timeMinutes: 10, targetBand: "65",
    keyPoints: ["space economy growth", "private investment", "regulation gaps"],
    passage: "The global space economy surpassed six hundred billion dollars in 2025, propelled by reusable rockets, satellite mega-constellations and new commercial Earth-observation services. Private investment now eclipses traditional government spending in several segments. However, the proliferation of low Earth orbit satellites raises concerns about congestion, debris and astronomical observation. International rule-making bodies have struggled to keep pace, prompting calls for binding orbital traffic regulations." },
  { id: "sw-v3-04", minWords: 5, maxWords: 75, timeMinutes: 10, targetBand: "65",
    keyPoints: ["online learning growth", "completion challenge", "support strategies"],
    passage: "Massive open online courses have democratised access to elite university content, attracting tens of millions of registrants worldwide. Despite this enthusiasm, completion rates rarely exceed fifteen percent, partly because most learners juggle study with full-time work or caregiving. Educational researchers find that small cohort discussion forums, structured deadlines and personalised mentoring substantially improve persistence, suggesting that the next generation of online programs must blend self-paced content with deliberate community design." },
  { id: "sw-v3-05", minWords: 5, maxWords: 75, timeMinutes: 10, targetBand: "79+",
    keyPoints: ["urbanisation pressures", "infrastructure stress", "planning solutions"],
    passage: "By 2030 nearly two-thirds of humanity will live in cities, with the fastest growth occurring in sub-Saharan Africa and South Asia. Although urban centres concentrate economic opportunity, they also strain housing supply, transport networks and sanitation systems, leaving vulnerable migrants in informal settlements. Planners increasingly advocate for compact, mixed-use neighbourhoods served by mass transit, arguing that proactive zoning and infrastructure investment can prevent the worst excesses of unplanned sprawl." },
  { id: "sw-v3-06", minWords: 5, maxWords: 75, timeMinutes: 10, targetBand: "65",
    keyPoints: ["inequality persistence", "policy responses", "social cohesion risk"],
    passage: "Income inequality in advanced economies has remained stubbornly high despite a decade of low unemployment, with the wealthiest decile capturing the majority of post-tax income gains. Economists attribute this to skill-biased technological change, weakened collective bargaining and capital concentration. Proposed remedies range from progressive taxation and universal childcare to place-based investment in declining regions. Failure to act, sociologists warn, could erode trust in democratic institutions." },
  { id: "sw-v3-07", minWords: 5, maxWords: 75, timeMinutes: 10, targetBand: "65",
    keyPoints: ["globalisation benefits", "supply chain risks", "diversification trend"],
    passage: "Globalisation has integrated production networks across continents, lowering consumer prices and lifting hundreds of millions out of extreme poverty. Yet recent geopolitical tensions and pandemic-era disruptions exposed the fragility of long, single-source supply chains. Multinationals are now diversifying suppliers, holding larger inventories and investing in regional manufacturing hubs, signalling a partial reversal of just-in-time logistics that dominated the previous three decades." },
  { id: "sw-v3-08", minWords: 5, maxWords: 75, timeMinutes: 10, targetBand: "79+",
    keyPoints: ["sustainable finance growth", "ESG metrics", "greenwashing risk"],
    passage: "Sustainable finance has expanded rapidly, with assets aligned to environmental, social and governance criteria now accounting for roughly a third of global professionally managed funds. Investors view climate-related risks as financially material, particularly for insurers and infrastructure portfolios. Critics, however, argue that inconsistent ESG metrics enable greenwashing, where firms exaggerate sustainability credentials. Regulators in Europe and Asia are introducing mandatory disclosure standards to restore credibility to the sector." },
  { id: "sw-v3-09", minWords: 5, maxWords: 75, timeMinutes: 10, targetBand: "65",
    keyPoints: ["central bank dilemma", "inflation tools", "growth trade-off"],
    passage: "Central banks face an unenviable balancing act between curbing inflation and avoiding recession. After raising interest rates aggressively in response to post-pandemic price pressures, many policymakers now confront slowing growth, fragile housing markets and stressed corporate balance sheets. Some economists advocate a pause to assess delayed policy effects, while others insist that loosening too soon would re-anchor inflation expectations at undesirably elevated levels." },
  { id: "sw-v3-10", minWords: 5, maxWords: 75, timeMinutes: 10, targetBand: "65",
    keyPoints: ["antibiotic resistance", "drivers", "global response"],
    passage: "Antimicrobial resistance is projected to cause ten million deaths annually by 2050 if current trends continue. The over-prescription of antibiotics in human medicine and their routine use in livestock farming are accelerating the emergence of multi-drug-resistant bacteria. International coordination, surveillance of resistant strains and substantial investment in new drug pipelines are essential, yet pharmaceutical incentives remain weak because novel antibiotics are typically reserved as last-resort treatments." },
  { id: "sw-v3-11", minWords: 5, maxWords: 75, timeMinutes: 10, targetBand: "79+",
    keyPoints: ["air pollution health cost", "main sources", "policy levers"],
    passage: "Outdoor air pollution contributes to roughly four million premature deaths each year, with fine particulate matter and nitrogen dioxide linked to heart disease, stroke and lung cancer. Vehicle emissions, coal-fired power and biomass burning remain the dominant sources in most low- and middle-income cities. Successful policy interventions combine cleaner fuel standards, electrification of public transport, stricter industrial emissions caps and continuous monitoring networks that hold polluters accountable." },
  { id: "sw-v3-12", minWords: 5, maxWords: 75, timeMinutes: 10, targetBand: "65",
    keyPoints: ["biodiversity loss", "ecosystem services", "conservation strategies"],
    passage: "The current extinction rate is estimated to be at least one hundred times the natural background level, driven by habitat loss, climate change, pollution and invasive species. Biodiversity decline jeopardises ecosystem services such as pollination, water purification and carbon sequestration on which human wellbeing depends. Conservationists advocate expanding protected areas, restoring degraded ecosystems and incorporating natural capital into national accounting to ensure development decisions consider ecological costs." },
];

/* ============================================================
 * WRITING / READING — Summarize Spoken Text & Dictation
 * ============================================================ */
export const SUMMARIZE_SPOKEN_V3: PteSummarizeSpoken[] = [
  { id: "ss-v3-01", minWords: 50, maxWords: 70,
    keyPoints: ["AI in healthcare", "diagnostic accuracy", "ethical guardrails"],
    audioText: "Today's lecture explores how artificial intelligence is transforming clinical medicine. Deep-learning models now match or surpass radiologists when interpreting chest X-rays, mammograms and retinal scans. Hospitals are also deploying AI-driven triage tools that flag deteriorating patients hours before traditional warning signs emerge. Despite these benefits, ethicists warn that algorithms must be validated across diverse populations, kept transparent, and subjected to ongoing audit to prevent bias." },
  { id: "ss-v3-02", minWords: 50, maxWords: 70,
    keyPoints: ["climate adaptation", "vulnerable communities", "infrastructure investment"],
    audioText: "Climate adaptation is no longer optional. Coastal cities face sea-level rise, while inland regions endure record heatwaves and drought. The lecture argues that adaptation strategies must prioritise the most vulnerable communities, who often lack the resources to relocate or upgrade their homes. Policy makers should fund nature-based solutions such as mangrove restoration, alongside hard infrastructure like sea walls, and integrate climate risk into every infrastructure investment decision." },
  { id: "ss-v3-03", minWords: 50, maxWords: 70,
    keyPoints: ["lifelong learning", "automation pressure", "policy support"],
    audioText: "Automation is reshaping the labour market faster than universities can update curricula. The speaker argues that lifelong learning must become a societal norm, supported by individual learning accounts, generous reskilling vouchers and modular micro-credentials. Employers should partner with public colleges to offer paid time for upskilling, while governments must ensure that workers in declining industries can access meaningful, well-funded transitions instead of being abandoned to insecure gig jobs." },
  { id: "ss-v3-04", minWords: 50, maxWords: 70,
    keyPoints: ["mental health on campus", "early intervention", "peer support"],
    audioText: "Universities report record demand for counselling services, with anxiety, depression and burnout cited most often. The lecture emphasises early intervention through low-threshold drop-in centres, online cognitive behavioural therapy and mental health literacy training for academic staff. Peer support networks, when properly trained and supervised, also reduce stigma and ensure that struggling students reach professional help before crisis points develop." },
  { id: "ss-v3-05", minWords: 50, maxWords: 70,
    keyPoints: ["circular economy", "design principles", "policy levers"],
    audioText: "A circular economy seeks to decouple economic growth from resource consumption by designing products that can be repaired, refurbished or recycled at end of life. The lecture highlights extended producer responsibility schemes, deposit-return systems and right-to-repair legislation as effective policy levers. Companies that embrace circular design often discover unexpected revenue streams from remanufactured goods, materials recovery and subscription-based service models." },
];

export const DICTATION_V3: PteDictation[] = [
  { id: "wd-v3-01", difficulty: "medium", audioText: "Many universities now require that final-year projects demonstrate measurable real-world impact." },
  { id: "wd-v3-02", difficulty: "hard", audioText: "Pharmaceutical companies must navigate increasingly complex regulatory frameworks before launching new therapies internationally." },
  { id: "wd-v3-03", difficulty: "easy", audioText: "Renewable energy now supplies a significant share of electricity in many European countries." },
  { id: "wd-v3-04", difficulty: "medium", audioText: "Researchers are investigating how social media use affects sleep patterns among adolescents." },
  { id: "wd-v3-05", difficulty: "hard", audioText: "Quantitative easing temporarily lowered borrowing costs but contributed to soaring asset prices in subsequent years." },
  { id: "wd-v3-06", difficulty: "medium", audioText: "Conservation programmes have successfully restored wetland habitats along several major river systems." },
  { id: "wd-v3-07", difficulty: "easy", audioText: "Online discussion forums help students connect with peers around the world." },
  { id: "wd-v3-08", difficulty: "hard", audioText: "Sustainable agriculture combines crop rotation, integrated pest management and reduced reliance on synthetic fertilisers." },
];

/* ============================================================
 * READING — Fill Blank, Reorder, MCQ, Highlight Incorrect
 * ============================================================ */
export const FILL_BLANK_V3: PteFillBlank[] = [
  { id: "fb-v3-01", targetBand: "65",
    passage: "Quantum computing relies on the {{1}} of quantum bits, which can occupy multiple states simultaneously and {{2}} certain calculations that would take classical machines billions of years to {{3}}.",
    options: ["superposition", "entanglement", "complete", "accelerate", "transmit", "configure"],
    answers: ["superposition", "accelerate", "complete"] },
  { id: "fb-v3-02", targetBand: "65",
    passage: "Online education platforms must {{1}} engaging content with {{2}} assessment to ensure that learners actually {{3}} the material rather than simply consume videos.",
    options: ["combine", "ignore", "rigorous", "loose", "master", "memorise"],
    answers: ["combine", "rigorous", "master"] },
  { id: "fb-v3-03", targetBand: "79+",
    passage: "Central banks aim to {{1}} inflation expectations through credible communication while simultaneously {{2}} financial stability and {{3}} sustainable employment growth.",
    options: ["anchor", "release", "safeguarding", "ignoring", "fostering", "preventing"],
    answers: ["anchor", "safeguarding", "fostering"] },
  { id: "fb-v3-04", targetBand: "65",
    passage: "Air pollution {{1}} respiratory and cardiovascular disease, particularly among the elderly, prompting cities to {{2}} cleaner fuels and {{3}} stricter emission standards.",
    options: ["aggravates", "alleviates", "adopt", "abandon", "enforce", "loosen"],
    answers: ["aggravates", "adopt", "enforce"] },
  { id: "fb-v3-05", targetBand: "65",
    passage: "Conservationists urge governments to {{1}} protected areas, {{2}} degraded ecosystems and {{3}} sustainable land-use practices among local communities.",
    options: ["expand", "shrink", "restore", "destroy", "promote", "discourage"],
    answers: ["expand", "restore", "promote"] },
  { id: "fb-v3-06", targetBand: "79+",
    passage: "Sustainable finance requires standardised {{1}} so that investors can {{2}} the genuine environmental impact of companies and avoid {{3}} marketing claims.",
    options: ["disclosures", "rumours", "evaluate", "ignore", "misleading", "honest"],
    answers: ["disclosures", "evaluate", "misleading"] },
  { id: "fb-v3-07", targetBand: "65",
    passage: "Global supply chains have become {{1}} efficient through digital tracking, but recent disruptions revealed how {{2}} they remain to geopolitical {{3}}.",
    options: ["remarkably", "barely", "vulnerable", "immune", "shocks", "rewards"],
    answers: ["remarkably", "vulnerable", "shocks"] },
  { id: "fb-v3-08", targetBand: "65",
    passage: "Vaccination programmes {{1}} herd immunity that protects those who cannot be vaccinated, but {{2}} requires {{3}} public communication about safety and efficacy.",
    options: ["generate", "weaken", "compliance", "rebellion", "transparent", "secretive"],
    answers: ["generate", "compliance", "transparent"] },
];

export const REORDER_V3: PteReorderItem[] = [
  { id: "ro-v3-01", topic: "AI deployment in business",
    paragraphs: [
      "Pilot projects then validate the model in a controlled environment using historical data and a small group of human reviewers.",
      "Successful enterprises typically begin by identifying a high-value, narrowly scoped problem rather than attempting company-wide AI transformation overnight.",
      "Once results meet predetermined accuracy and fairness thresholds, the team gradually scales the solution to additional departments while continuously monitoring outcomes.",
      "Long-term success ultimately depends on disciplined governance, clear data ownership and a culture that welcomes both automation and human oversight.",
    ],
    correctOrder: [1, 0, 2, 3] },
  { id: "ro-v3-02", topic: "Climate adaptation planning",
    paragraphs: [
      "Adaptation plans must therefore prioritise the protection of vulnerable communities while strengthening resilience of critical infrastructure.",
      "Climate change is already producing measurable impacts on coastal flooding, agricultural yields and the spread of vector-borne diseases.",
      "Effective implementation requires reliable funding, transparent monitoring and meaningful participation from residents who experience climate risks first hand.",
      "The most ambitious cities now embed climate considerations into every land-use, transport and procurement decision they make.",
    ],
    correctOrder: [1, 0, 2, 3] },
  { id: "ro-v3-03", topic: "Vaccine development",
    paragraphs: [
      "Researchers begin by mapping the genome of a target pathogen and identifying antigens likely to provoke a strong immune response.",
      "Promising candidates undergo preclinical animal testing to verify basic safety and immunogenicity before any human trials.",
      "Three sequential phases of clinical trials then expand testing to progressively larger and more diverse human cohorts.",
      "Only after regulatory approval does manufacturing scale up to enable distribution through national immunisation programmes.",
    ],
    correctOrder: [0, 1, 2, 3] },
  { id: "ro-v3-04", topic: "Urban transport reform",
    paragraphs: [
      "City governments are rethinking decades of car-centric planning that has produced congestion, pollution and unsafe streets.",
      "The first step usually involves expanding bus and rail capacity so that residents have a credible alternative to private vehicles.",
      "Pedestrian zones, protected cycle lanes and lower speed limits then make active modes safer and more attractive.",
      "Over time, congestion charging or low-emission zones can reinforce these gains by making car use less convenient and more expensive.",
    ],
    correctOrder: [0, 1, 2, 3] },
  { id: "ro-v3-05", topic: "Sustainable business models",
    paragraphs: [
      "Forward-looking companies are realising that sustainability and profitability are not opposing goals but mutually reinforcing strategies.",
      "Internal carbon pricing helps managers compare investment options on a level playing field that reflects future regulation.",
      "Suppliers can be evaluated on environmental criteria alongside cost and quality, embedding sustainability deep in the value chain.",
      "Transparent annual reporting then reassures investors, customers and employees that promises translate into measurable progress.",
    ],
    correctOrder: [0, 1, 2, 3] },
  { id: "ro-v3-06", topic: "Mental health response",
    paragraphs: [
      "Demand for mental health support has surged worldwide, particularly among adolescents and young adults.",
      "A coherent response begins with widely accessible, low-threshold services that reduce the friction of seeking help.",
      "Schools, workplaces and community centres can complement clinical care by promoting literacy and resilience skills.",
      "Sustained investment, not one-off campaigns, is what ultimately translates good intentions into population-level improvement.",
    ],
    correctOrder: [0, 1, 2, 3] },
];

export const MCQ_V3: PteMcq[] = [
  { id: "mcq-v3-01", topic: "AI ethics", correctIndices: [1, 2],
    passage: "Algorithms that decide who receives a loan or interview can replicate historical bias when trained on past data. Researchers therefore advocate three safeguards: representative training data, independent audits and transparent explanations of how decisions are reached. Without these measures, automation may simply scale existing discrimination at unprecedented speed.",
    question: "Which TWO measures do researchers recommend to mitigate algorithmic bias?",
    options: ["Removing all human oversight", "Independent audits of model behaviour", "Transparent decision explanations", "Training only on the most recent data"] },
  { id: "mcq-v3-02", topic: "Renewable storage", correctIndices: [2],
    passage: "Solar and wind generation are inherently intermittent. Lithium-iron-phosphate and flow batteries are now affordable enough to deploy at grid scale, smoothing supply between sunny afternoons and calm evenings. However, batteries alone cannot solve the seasonal mismatch between summer solar peaks and winter demand, so green hydrogen and pumped hydro remain essential complements.",
    question: "What does the passage identify as the main weakness of batteries alone?",
    options: ["They are still too expensive", "They cannot be recycled", "They cannot solve the seasonal supply mismatch", "They produce hazardous emissions"] },
  { id: "mcq-v3-03", topic: "Online learning persistence", correctIndices: [0, 3],
    passage: "Online courses attract millions yet retain only a small fraction of registrants through to completion. Studies suggest that two interventions consistently improve persistence: structured deadlines that mimic the rhythm of in-person courses, and small-group cohort interaction that builds accountability. Adding personalised mentoring further amplifies these effects.",
    question: "Which TWO interventions improve completion rates?",
    options: ["Structured deadlines", "Removing all live discussion", "Eliminating mentoring", "Cohort-based group interaction"] },
  { id: "mcq-v3-04", topic: "Sustainable finance", correctIndices: [1],
    passage: "Investors increasingly weigh environmental, social and governance metrics alongside financial returns. Critics argue that the proliferation of competing rating systems and inconsistent disclosure standards enables greenwashing, where firms exaggerate sustainability credentials. Mandatory regulatory disclosure, backed by independent assurance, is widely seen as the most effective remedy.",
    question: "What does the passage identify as the most effective remedy for greenwashing?",
    options: ["Voluntary corporate pledges", "Mandatory regulatory disclosure with independent assurance", "Banning ESG investing entirely", "Letting markets self-correct"] },
  { id: "mcq-v3-05", topic: "Antibiotic resistance", correctIndices: [0, 2],
    passage: "Antimicrobial resistance threatens to undo a century of progress against infectious disease. Two human drivers stand out: over-prescription of antibiotics for viral illnesses where they have no effect, and routine use of antibiotics in livestock to promote growth. Tackling resistance therefore requires both clinical stewardship in hospitals and reform of agricultural practices.",
    question: "Which TWO drivers of antibiotic resistance are highlighted?",
    options: ["Over-prescription for viral infections", "Insufficient hospital hygiene", "Routine antibiotic use in livestock", "Lack of new vaccines"] },
  { id: "mcq-v3-06", topic: "Biodiversity loss", correctIndices: [3],
    passage: "Habitat destruction, climate change, pollution, invasive species and overexploitation collectively drive an extinction rate at least one hundred times the natural background level. While each pressure can be tackled individually, conservationists argue that habitat protection delivers the largest immediate benefit because it simultaneously addresses several drivers of biodiversity decline.",
    question: "Why do conservationists prioritise habitat protection?",
    options: ["It is the cheapest single intervention", "It eliminates the need for climate policy", "It only matters for charismatic mammals", "It simultaneously addresses several drivers of decline"] },
];

export const HIGHLIGHT_INCORRECT_V3: PteHighlightIncorrect[] = [
  { id: "hi-v3-01", topic: "Climate policy",
    audioText:   "Many countries have introduced carbon pricing schemes to discourage emissions and fund renewable investment.",
    displayText: "Many nations have introduced carbon trading schemes to encourage emissions and fund renewable investment.",
    incorrectIndices: [1, 4, 6] }, // nations | trading | encourage
  { id: "hi-v3-02", topic: "Higher education",
    audioText:   "Postgraduate scholarships often require a personal statement and two academic references.",
    displayText: "Undergraduate scholarships often demand a personal statement and three academic references.",
    incorrectIndices: [0, 3, 8] }, // Undergraduate | demand | three
  { id: "hi-v3-03", topic: "Public health",
    audioText:   "Vaccination programmes have eradicated smallpox and dramatically reduced cases of measles globally.",
    displayText: "Vaccination programmes have eliminated smallpox and significantly increased cases of measles globally.",
    incorrectIndices: [3, 5, 6] }, // eliminated | significantly | increased
  { id: "hi-v3-04", topic: "Economics",
    audioText:   "Central banks raised interest rates aggressively in response to post-pandemic inflation pressures.",
    displayText: "Central banks lowered interest rates cautiously in response to pre-pandemic inflation pressures.",
    incorrectIndices: [2, 5, 9] }, // lowered | cautiously | pre-pandemic
  { id: "hi-v3-05", topic: "Renewable energy",
    audioText:   "Solar panels installed on residential rooftops can offset most household electricity consumption.",
    displayText: "Solar panels installed on commercial rooftops will eliminate all household electricity consumption.",
    incorrectIndices: [4, 6, 7] }, // commercial | will | eliminate / all (varies; pick 3 distinct altered)
  { id: "hi-v3-06", topic: "Conservation",
    audioText:   "Conservationists are restoring wetlands along several major river systems across the country.",
    displayText: "Conservationists are draining wetlands beside several minor river systems across the country.",
    incorrectIndices: [3, 5, 7] }, // draining | beside | minor
];

/* ============================================================
 * Aggregated arrays consumed by skill pages
 * ============================================================ */
export const READ_ALOUD_V3_ALL = READ_ALOUD_V3;
export const REPEAT_SENTENCE_V3_ALL = REPEAT_SENTENCE_V3;
export const DESCRIBE_IMAGE_V3_ALL = DESCRIBE_IMAGE_V3;
export const ESSAY_V3_ALL = ESSAY_V3;
export const SUMMARIZE_TEXT_V3_ALL = SUMMARIZE_TEXT_V3;
export const SUMMARIZE_SPOKEN_V3_ALL = SUMMARIZE_SPOKEN_V3;
export const DICTATION_V3_ALL = DICTATION_V3;
export const FILL_BLANK_V3_ALL = FILL_BLANK_V3;
export const REORDER_V3_ALL = REORDER_V3;
export const MCQ_V3_ALL = MCQ_V3;
export const HIGHLIGHT_INCORRECT_V3_ALL = HIGHLIGHT_INCORRECT_V3;
