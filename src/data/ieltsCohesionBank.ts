/**
 * IELTS Coherence & Cohesion Bank
 * - LINKERS: ngân hàng từ nối theo 10 nhóm chức năng
 * - LINKING_PAIRS: cặp câu để luyện nối câu
 * - REORDER_PARAGRAPHS: đoạn văn bị xáo trộn để sắp lại
 */

export type LinkerTask = 1 | 2 | "both";
export type LinkerLevel = "B2" | "C1";

export interface LinkerItem {
  id: string;
  linker: string;
  meaning: string;
  category:
    | "adding"
    | "contrasting"
    | "cause-effect"
    | "exemplifying"
    | "sequencing"
    | "summarising"
    | "emphasising"
    | "conceding"
    | "comparing"
    | "referencing";
  level: LinkerLevel;
  task: LinkerTask;
  example: string;
  warning?: string; // Common misuse warning
}

export interface LinkerCategoryMeta {
  value: LinkerItem["category"] | "all";
  label: string;
  labelEn: string;
}

export const LINKER_CATEGORIES: LinkerCategoryMeta[] = [
  { value: "all", label: "Tất cả", labelEn: "All" },
  { value: "adding", label: "Thêm ý", labelEn: "Adding" },
  { value: "contrasting", label: "Đối lập", labelEn: "Contrasting" },
  { value: "cause-effect", label: "Nguyên nhân - Kết quả", labelEn: "Cause / Effect" },
  { value: "exemplifying", label: "Ví dụ", labelEn: "Exemplifying" },
  { value: "sequencing", label: "Trình tự", labelEn: "Sequencing" },
  { value: "summarising", label: "Tóm tắt", labelEn: "Summarising" },
  { value: "emphasising", label: "Nhấn mạnh", labelEn: "Emphasising" },
  { value: "conceding", label: "Nhượng bộ", labelEn: "Conceding" },
  { value: "comparing", label: "So sánh", labelEn: "Comparing" },
  { value: "referencing", label: "Tham chiếu", labelEn: "Referencing" },
];

export const LINKERS: LinkerItem[] = [
  // ================= ADDING =================
  { id: "a1", linker: "Moreover", meaning: "hơn nữa", category: "adding", level: "B2", task: "both",
    example: "The policy reduces traffic. **Moreover**, it lowers greenhouse emissions significantly.",
    warning: "Không dùng trong văn nói hoặc informal writing." },
  { id: "a2", linker: "Furthermore", meaning: "hơn thế nữa", category: "adding", level: "B2", task: 2,
    example: "Renewable energy is cleaner. **Furthermore**, it creates long-term employment." },
  { id: "a3", linker: "In addition (to)", meaning: "thêm vào đó", category: "adding", level: "B2", task: "both",
    example: "**In addition to** cutting costs, automation improves accuracy." },
  { id: "a4", linker: "Additionally", meaning: "ngoài ra", category: "adding", level: "B2", task: "both",
    example: "The city expanded its metro network. **Additionally**, bike lanes were introduced." },
  { id: "a5", linker: "Not only ... but also ...", meaning: "không những ... mà còn ...", category: "adding", level: "C1", task: 2,
    example: "The scheme **not only** boosts productivity **but also** enhances worker morale." },
  { id: "a6", linker: "What is more", meaning: "hơn thế nữa", category: "adding", level: "B2", task: 2,
    example: "The proposal is affordable. **What is more**, it can be implemented within a year." },
  { id: "a7", linker: "Besides", meaning: "bên cạnh đó", category: "adding", level: "B2", task: 2,
    example: "**Besides** the environmental benefits, the plan generates tourism revenue.",
    warning: "Trong formal writing, ưu tiên 'Moreover' hoặc 'Furthermore' hơn." },
  { id: "a8", linker: "Coupled with", meaning: "cùng với", category: "adding", level: "C1", task: 2,
    example: "Rising demand, **coupled with** limited supply, has driven housing prices up." },
  { id: "a9", linker: "Along with", meaning: "cùng với", category: "adding", level: "B2", task: "both",
    example: "The graph shows exports **along with** imports rising steadily after 2015." },
  { id: "a10", linker: "As well as", meaning: "cũng như", category: "adding", level: "B2", task: "both",
    example: "The policy targets urban **as well as** rural communities." },
  { id: "a11", linker: "In the same vein", meaning: "theo cùng một hướng", category: "adding", level: "C1", task: 2,
    example: "Governments must invest in schools. **In the same vein**, they must upgrade hospitals." },
  { id: "a12", linker: "On top of that", meaning: "trên hết", category: "adding", level: "B2", task: 2,
    example: "The plan is costly. **On top of that**, it lacks public support." },

  // ================= CONTRASTING =================
  { id: "c1", linker: "However", meaning: "tuy nhiên", category: "contrasting", level: "B2", task: "both",
    example: "Public transport is efficient. **However**, coverage remains inadequate in rural areas." },
  { id: "c2", linker: "Nevertheless", meaning: "tuy vậy", category: "contrasting", level: "C1", task: 2,
    example: "The reform faced strong opposition; **nevertheless**, it was successfully implemented." },
  { id: "c3", linker: "Nonetheless", meaning: "dù vậy", category: "contrasting", level: "C1", task: 2,
    example: "The proposal is expensive; **nonetheless**, it offers substantial long-term returns." },
  { id: "c4", linker: "On the contrary", meaning: "trái lại", category: "contrasting", level: "C1", task: 2,
    example: "Some claim technology isolates people. **On the contrary**, it enables global connection.",
    warning: "Chỉ dùng khi phủ nhận trực tiếp ý ngược lại - không phải 'mặt khác'." },
  { id: "c5", linker: "On the other hand", meaning: "mặt khác", category: "contrasting", level: "B2", task: 2,
    example: "Urban living is convenient. **On the other hand**, it is stressful and polluted." },
  { id: "c6", linker: "In contrast (to)", meaning: "ngược lại", category: "contrasting", level: "B2", task: 1,
    example: "**In contrast to** 2010, exports rose sharply between 2015 and 2020." },
  { id: "c7", linker: "By contrast", meaning: "trái lại", category: "contrasting", level: "B2", task: 1,
    example: "Male participation fell to 40%. **By contrast**, female participation climbed to 65%." },
  { id: "c8", linker: "Whereas", meaning: "trong khi", category: "contrasting", level: "B2", task: 1,
    example: "France exported 30 million tonnes, **whereas** Germany exported only 18 million." },
  { id: "c9", linker: "While", meaning: "trong khi", category: "contrasting", level: "B2", task: "both",
    example: "**While** wages rose modestly, housing costs surged." },
  { id: "c10", linker: "Conversely", meaning: "ngược lại", category: "contrasting", level: "C1", task: "both",
    example: "Young people embraced the app. **Conversely**, older users found it confusing." },
  { id: "c11", linker: "Yet", meaning: "tuy nhiên", category: "contrasting", level: "B2", task: 2,
    example: "The scheme was widely praised, **yet** its implementation was flawed." },
  { id: "c12", linker: "Despite / In spite of", meaning: "mặc dù", category: "contrasting", level: "B2", task: "both",
    example: "**Despite** heavy investment, productivity has stagnated." },

  // ================= CAUSE-EFFECT =================
  { id: "ce1", linker: "Consequently", meaning: "do đó", category: "cause-effect", level: "B2", task: "both",
    example: "Oil prices soared. **Consequently**, transport costs rose sharply." },
  { id: "ce2", linker: "As a result", meaning: "kết quả là", category: "cause-effect", level: "B2", task: "both",
    example: "Rainfall was scarce; **as a result**, crop yields dropped by 30%." },
  { id: "ce3", linker: "Therefore", meaning: "vì vậy", category: "cause-effect", level: "B2", task: 2,
    example: "The evidence is overwhelming; **therefore**, action must be taken immediately." },
  { id: "ce4", linker: "Thus", meaning: "do đó", category: "cause-effect", level: "C1", task: 2,
    example: "Automation reduces human error, **thus** increasing overall efficiency." },
  { id: "ce5", linker: "Hence", meaning: "vì thế", category: "cause-effect", level: "C1", task: 2,
    example: "The policy failed to attract voters; **hence**, it was quickly withdrawn." },
  { id: "ce6", linker: "Owing to / Due to", meaning: "do bởi", category: "cause-effect", level: "B2", task: "both",
    example: "**Owing to** budget cuts, several projects were postponed." },
  { id: "ce7", linker: "Because of / As a result of", meaning: "vì / do", category: "cause-effect", level: "B2", task: "both",
    example: "**As a result of** the tax reform, small businesses thrived." },
  { id: "ce8", linker: "For this reason", meaning: "vì lý do này", category: "cause-effect", level: "B2", task: 2,
    example: "Fossil fuels harm the planet. **For this reason**, renewable alternatives must be prioritised." },
  { id: "ce9", linker: "This is why", meaning: "đây là lý do", category: "cause-effect", level: "B2", task: 2,
    example: "Learning a language builds cognitive resilience. **This is why** it should start early." },
  { id: "ce10", linker: "Accordingly", meaning: "theo đó", category: "cause-effect", level: "C1", task: 2,
    example: "Demand fell sharply; **accordingly**, production was scaled back." },
  { id: "ce11", linker: "Give rise to", meaning: "gây ra", category: "cause-effect", level: "C1", task: 2,
    example: "Rapid urbanisation has **given rise to** severe air pollution." },
  { id: "ce12", linker: "Lead to / Result in", meaning: "dẫn tới / gây ra", category: "cause-effect", level: "B2", task: "both",
    example: "Deforestation **has led to** the loss of countless species." },

  // ================= EXEMPLIFYING =================
  { id: "ex1", linker: "For instance", meaning: "ví dụ", category: "exemplifying", level: "B2", task: "both",
    example: "Some countries rely heavily on tourism. **For instance**, Thailand earns 20% of GDP from it." },
  { id: "ex2", linker: "For example", meaning: "ví dụ", category: "exemplifying", level: "B2", task: "both",
    example: "Certain professions face automation. **For example**, cashiers are being replaced by self-checkouts." },
  { id: "ex3", linker: "To illustrate", meaning: "để minh họa", category: "exemplifying", level: "C1", task: 2,
    example: "**To illustrate**, Finland's education system emphasises play-based learning until age seven." },
  { id: "ex4", linker: "Such as", meaning: "chẳng hạn như", category: "exemplifying", level: "B2", task: "both",
    example: "Nordic countries **such as** Norway and Sweden invest heavily in social welfare." },
  { id: "ex5", linker: "A case in point", meaning: "một ví dụ điển hình", category: "exemplifying", level: "C1", task: 2,
    example: "Renewable energy is expanding rapidly. **A case in point** is Denmark's wind power." },
  { id: "ex6", linker: "Namely", meaning: "cụ thể là", category: "exemplifying", level: "C1", task: 2,
    example: "Two factors matter most, **namely** cost and convenience." },
  { id: "ex7", linker: "In particular", meaning: "đặc biệt là", category: "exemplifying", level: "B2", task: 2,
    example: "Cities suffer from pollution, **in particular** those with heavy industry." },
  { id: "ex8", linker: "Take ... for example", meaning: "hãy lấy ... làm ví dụ", category: "exemplifying", level: "B2", task: 2,
    example: "**Take Singapore for example**: strict laws produced one of the world's safest cities." },

  // ================= SEQUENCING =================
  { id: "s1", linker: "Initially / At first", meaning: "ban đầu", category: "sequencing", level: "B2", task: 1,
    example: "**Initially**, the population stood at 5 million in 1990." },
  { id: "s2", linker: "Subsequently", meaning: "sau đó", category: "sequencing", level: "C1", task: 1,
    example: "**Subsequently**, the figure rose steadily to 8 million by 2020." },
  { id: "s3", linker: "Afterwards", meaning: "sau đó", category: "sequencing", level: "B2", task: 1,
    example: "The economy contracted in 2008. **Afterwards**, growth resumed gradually." },
  { id: "s4", linker: "Ultimately / Eventually", meaning: "cuối cùng", category: "sequencing", level: "B2", task: 1,
    example: "**Ultimately**, the figure plateaued at around 12 million." },
  { id: "s5", linker: "Firstly, Secondly, Finally", meaning: "thứ nhất, thứ hai, cuối cùng", category: "sequencing", level: "B2", task: 2,
    example: "**Firstly**, education is key. **Secondly**, employment matters. **Finally**, healthcare seals it." },
  { id: "s6", linker: "Following this / that", meaning: "tiếp theo", category: "sequencing", level: "B2", task: 1,
    example: "Sales peaked in Q3. **Following this**, they declined sharply in Q4." },
  { id: "s7", linker: "Prior to", meaning: "trước khi", category: "sequencing", level: "C1", task: 1,
    example: "**Prior to** the reform, unemployment averaged 11%." },
  { id: "s8", linker: "Meanwhile", meaning: "trong khi đó", category: "sequencing", level: "B2", task: 1,
    example: "Exports climbed steadily. **Meanwhile**, imports remained flat." },
  { id: "s9", linker: "In the meantime", meaning: "trong lúc đó", category: "sequencing", level: "B2", task: "both",
    example: "New regulations will take effect in 2027. **In the meantime**, businesses must prepare." },
  { id: "s10", linker: "From then on", meaning: "kể từ đó", category: "sequencing", level: "B2", task: 1,
    example: "The bridge opened in 2005. **From then on**, commute times fell dramatically." },

  // ================= SUMMARISING =================
  { id: "sm1", linker: "In conclusion", meaning: "tóm lại", category: "summarising", level: "B2", task: 2,
    example: "**In conclusion**, the benefits of renewable energy far outweigh its costs." },
  { id: "sm2", linker: "To conclude", meaning: "để kết luận", category: "summarising", level: "B2", task: 2,
    example: "**To conclude**, governments must invest in early childhood education." },
  { id: "sm3", linker: "To sum up", meaning: "tóm lại", category: "summarising", level: "B2", task: 2,
    example: "**To sum up**, remote work brings both flexibility and isolation." },
  { id: "sm4", linker: "In summary", meaning: "tóm lại", category: "summarising", level: "B2", task: 2,
    example: "**In summary**, urbanisation drives economic growth but strains infrastructure." },
  { id: "sm5", linker: "Overall", meaning: "nhìn chung", category: "summarising", level: "B2", task: 1,
    example: "**Overall**, the chart shows a clear upward trend across all three sectors." },
  { id: "sm6", linker: "All in all", meaning: "tựu chung", category: "summarising", level: "B2", task: 2,
    example: "**All in all**, the advantages of the policy justify its cost." },
  { id: "sm7", linker: "In essence", meaning: "về bản chất", category: "summarising", level: "C1", task: 2,
    example: "**In essence**, the problem is one of resource allocation, not scarcity." },
  { id: "sm8", linker: "On balance", meaning: "cân nhắc lại", category: "summarising", level: "C1", task: 2,
    example: "**On balance**, the merits of the reform outweigh its drawbacks." },
  { id: "sm9", linker: "Broadly speaking", meaning: "nói chung", category: "summarising", level: "C1", task: 2,
    example: "**Broadly speaking**, richer nations spend more on healthcare per capita." },

  // ================= EMPHASISING =================
  { id: "em1", linker: "Notably", meaning: "đặc biệt là", category: "emphasising", level: "C1", task: "both",
    example: "Emissions have fallen in several sectors, **notably** transport and manufacturing." },
  { id: "em2", linker: "Above all", meaning: "trên hết", category: "emphasising", level: "B2", task: 2,
    example: "**Above all**, governments must protect the most vulnerable citizens." },
  { id: "em3", linker: "Indeed", meaning: "quả thực", category: "emphasising", level: "C1", task: 2,
    example: "The initiative has succeeded. **Indeed**, it has exceeded every expectation." },
  { id: "em4", linker: "In fact", meaning: "thực tế là", category: "emphasising", level: "B2", task: 2,
    example: "The policy is not merely popular; **in fact**, it enjoys 82% approval." },
  { id: "em5", linker: "Undoubtedly", meaning: "chắc chắn rằng", category: "emphasising", level: "C1", task: 2,
    example: "**Undoubtedly**, artificial intelligence will reshape the labour market." },
  { id: "em6", linker: "Clearly", meaning: "rõ ràng là", category: "emphasising", level: "B2", task: 2,
    example: "**Clearly**, more investment in public transport is needed." },
  { id: "em7", linker: "Particularly", meaning: "đặc biệt", category: "emphasising", level: "B2", task: "both",
    example: "Young graduates struggle to find stable work, **particularly** in rural areas." },
  { id: "em8", linker: "It is worth noting that", meaning: "đáng chú ý là", category: "emphasising", level: "C1", task: 2,
    example: "**It is worth noting that** the trend reversed after 2018." },

  // ================= CONCEDING =================
  { id: "co1", linker: "Admittedly", meaning: "phải thừa nhận là", category: "conceding", level: "C1", task: 2,
    example: "**Admittedly**, the plan is costly, but its long-term benefits are undeniable." },
  { id: "co2", linker: "Granted that", meaning: "cho rằng", category: "conceding", level: "C1", task: 2,
    example: "**Granted that** some jobs will disappear, new roles will emerge in AI-related fields." },
  { id: "co3", linker: "Of course", meaning: "tất nhiên", category: "conceding", level: "B2", task: 2,
    example: "**Of course**, no policy is perfect; however, this one addresses the core issue." },
  { id: "co4", linker: "It is true that", meaning: "đúng là", category: "conceding", level: "B2", task: 2,
    example: "**It is true that** globalisation has costs, yet its overall impact is positive." },
  { id: "co5", linker: "Even though / Although", meaning: "mặc dù", category: "conceding", level: "B2", task: "both",
    example: "**Although** critics disagree, the data supports the government's decision." },
  { id: "co6", linker: "While it is true that", meaning: "trong khi đúng là", category: "conceding", level: "C1", task: 2,
    example: "**While it is true that** technology creates jobs, it also displaces many workers." },
  { id: "co7", linker: "Notwithstanding", meaning: "bất chấp", category: "conceding", level: "C1", task: 2,
    example: "**Notwithstanding** the challenges, the initiative succeeded on every metric." },

  // ================= COMPARING =================
  { id: "cp1", linker: "Similarly", meaning: "tương tự", category: "comparing", level: "B2", task: "both",
    example: "France invests heavily in nuclear energy. **Similarly**, South Korea prioritises this sector." },
  { id: "cp2", linker: "Likewise", meaning: "cũng vậy", category: "comparing", level: "C1", task: 2,
    example: "Vietnam has embraced e-payments. **Likewise**, China leads in cashless transactions." },
  { id: "cp3", linker: "In the same way", meaning: "theo cách tương tự", category: "comparing", level: "B2", task: 2,
    example: "Reading develops the mind. **In the same way**, exercise strengthens the body." },
  { id: "cp4", linker: "Just as", meaning: "cũng như", category: "comparing", level: "B2", task: 2,
    example: "**Just as** rivers shape valleys, technology reshapes societies." },
  { id: "cp5", linker: "Compared to / with", meaning: "so với", category: "comparing", level: "B2", task: 1,
    example: "**Compared to** 2010, the figure had more than doubled by 2020." },
  { id: "cp6", linker: "Correspondingly", meaning: "tương ứng", category: "comparing", level: "C1", task: 1,
    example: "Income rose 15%. **Correspondingly**, household spending increased by 12%." },
  { id: "cp7", linker: "By the same token", meaning: "cũng vậy", category: "comparing", level: "C1", task: 2,
    example: "Education transforms lives. **By the same token**, healthcare access saves them." },

  // ================= REFERENCING =================
  { id: "r1", linker: "This trend / phenomenon", meaning: "xu hướng / hiện tượng này", category: "referencing", level: "B2", task: "both",
    example: "Working hours have shortened. **This trend** reflects changing worker priorities." },
  { id: "r2", linker: "Such (a) situation / practice", meaning: "tình huống / thói quen như vậy", category: "referencing", level: "C1", task: 2,
    example: "Employees are asked to work weekends. **Such a practice** damages mental health." },
  { id: "r3", linker: "The former ... the latter", meaning: "cái trước ... cái sau", category: "referencing", level: "C1", task: "both",
    example: "Two policies stand out - taxation and subsidy. **The former** discourages waste; **the latter** rewards innovation." },
  { id: "r4", linker: "These / Those", meaning: "những cái này / đó", category: "referencing", level: "B2", task: "both",
    example: "Prices, wages, and rents all rose. **These** are the main drivers of inflation." },
  { id: "r5", linker: "This is largely because", meaning: "chủ yếu là vì", category: "referencing", level: "B2", task: 2,
    example: "Cities suffer from overcrowding. **This is largely because** rural areas offer few jobs." },
  { id: "r6", linker: "Doing so", meaning: "làm như vậy", category: "referencing", level: "C1", task: 2,
    example: "Governments should tax carbon emissions. **Doing so** would accelerate the green transition." },
  { id: "r7", linker: "Which ...", meaning: "điều đó ...", category: "referencing", level: "B2", task: "both",
    example: "The reform boosted GDP by 3%, **which** exceeded all forecasts." },
  { id: "r8", linker: "Given this / that", meaning: "với điều này / rằng", category: "referencing", level: "C1", task: 2,
    example: "**Given that** demand is rising, prices are unlikely to fall soon." },
];

// =============================================================
// SENTENCE LINKING PAIRS - Nối 2 câu thành 1 câu mạch lạc
// =============================================================

export interface LinkingPair {
  id: string;
  taskType: 1 | 2;
  topic: string;
  sentenceA: string;
  sentenceB: string;
  suggestedLinkers: string[]; // hints
  modelAnswers: string[]; // 2-3 Band 7+ combined versions
}

export const LINKING_PAIRS: LinkingPair[] = [
  {
    id: "lp1", taskType: 2, topic: "Public transport",
    sentenceA: "Public transport reduces traffic congestion.",
    sentenceB: "It also cuts down on greenhouse gas emissions.",
    suggestedLinkers: ["Moreover", "In addition", "Not only ... but also"],
    modelAnswers: [
      "Not only does public transport reduce traffic congestion, but it also cuts down on greenhouse gas emissions.",
      "Public transport reduces traffic congestion; moreover, it significantly lowers greenhouse gas emissions.",
    ],
  },
  {
    id: "lp2", taskType: 2, topic: "Online learning",
    sentenceA: "Online learning offers flexibility for students.",
    sentenceB: "It often lacks the social interaction of a physical classroom.",
    suggestedLinkers: ["However", "Yet", "On the other hand"],
    modelAnswers: [
      "Although online learning offers flexibility for students, it often lacks the social interaction of a physical classroom.",
      "Online learning offers considerable flexibility; however, it frequently lacks the social interaction that a physical classroom provides.",
    ],
  },
  {
    id: "lp3", taskType: 2, topic: "Automation",
    sentenceA: "Automation eliminates many repetitive jobs.",
    sentenceB: "New industries emerge that require different skills.",
    suggestedLinkers: ["While", "Even though", "Conversely"],
    modelAnswers: [
      "While automation eliminates many repetitive jobs, new industries emerge that demand a different set of skills.",
      "Automation is undeniably eliminating repetitive jobs; conversely, entirely new industries are emerging that require different skills.",
    ],
  },
  {
    id: "lp4", taskType: 2, topic: "Junk food tax",
    sentenceA: "Governments should tax junk food heavily.",
    sentenceB: "This would discourage unhealthy eating habits.",
    suggestedLinkers: ["Doing so", "As a result", "Consequently"],
    modelAnswers: [
      "Governments should tax junk food heavily; doing so would discourage unhealthy eating habits nationwide.",
      "Heavy taxation on junk food is essential, as it would consequently discourage unhealthy eating habits.",
    ],
  },
  {
    id: "lp5", taskType: 2, topic: "Reading",
    sentenceA: "Reading books expands vocabulary.",
    sentenceB: "Watching documentaries broadens knowledge.",
    suggestedLinkers: ["Similarly", "Likewise", "In the same way"],
    modelAnswers: [
      "Just as reading books expands vocabulary, watching documentaries broadens general knowledge.",
      "Reading books expands vocabulary; similarly, watching documentaries broadens one's general knowledge.",
    ],
  },
  {
    id: "lp6", taskType: 2, topic: "Renewable energy",
    sentenceA: "Renewable energy is expensive to install.",
    sentenceB: "It saves money over the long term.",
    suggestedLinkers: ["Although", "Despite", "However"],
    modelAnswers: [
      "Although renewable energy is expensive to install, it saves considerable money over the long term.",
      "Despite the high initial installation cost, renewable energy proves far more economical in the long run.",
    ],
  },
  {
    id: "lp7", taskType: 2, topic: "Working from home",
    sentenceA: "Many employees work from home nowadays.",
    sentenceB: "This trend has reshaped urban housing markets.",
    suggestedLinkers: ["Which", "This trend", "As a result"],
    modelAnswers: [
      "A growing number of employees now work from home, a trend which has reshaped urban housing markets.",
      "Many employees now work from home; this shift has fundamentally reshaped urban housing markets.",
    ],
  },
  {
    id: "lp8", taskType: 2, topic: "Air pollution",
    sentenceA: "Air pollution damages public health.",
    sentenceB: "It costs governments billions in healthcare each year.",
    suggestedLinkers: ["Moreover", "Furthermore", "Not only ... but also"],
    modelAnswers: [
      "Not only does air pollution damage public health, but it also costs governments billions in healthcare each year.",
      "Air pollution severely damages public health; furthermore, it costs governments billions in annual healthcare spending.",
    ],
  },
  {
    id: "lp9", taskType: 2, topic: "Language learning",
    sentenceA: "Children learn languages faster than adults.",
    sentenceB: "Their brains are more adaptable.",
    suggestedLinkers: ["This is because", "Owing to", "The reason is that"],
    modelAnswers: [
      "Children learn languages faster than adults, largely because their brains are more adaptable during early development.",
      "Owing to the greater plasticity of their brains, children acquire languages far more rapidly than adults.",
    ],
  },
  {
    id: "lp10", taskType: 2, topic: "Social media",
    sentenceA: "Social media connects people across the world.",
    sentenceB: "It also amplifies misinformation.",
    suggestedLinkers: ["Yet", "However", "Nonetheless"],
    modelAnswers: [
      "Social media connects people across the world; nonetheless, it dangerously amplifies misinformation.",
      "While social media links people globally, it simultaneously amplifies misinformation on a massive scale.",
    ],
  },
  {
    id: "lp11", taskType: 1, topic: "Population chart",
    sentenceA: "The population of City A rose from 2 million in 1990 to 5 million in 2000.",
    sentenceB: "It then plateaued until 2020.",
    suggestedLinkers: ["Following this", "Afterwards", "Subsequently"],
    modelAnswers: [
      "The population of City A climbed from 2 million in 1990 to 5 million in 2000, following which it plateaued until 2020.",
      "After rising sharply from 2 million in 1990 to 5 million in 2000, the population of City A subsequently levelled off until 2020.",
    ],
  },
  {
    id: "lp12", taskType: 1, topic: "Sales comparison",
    sentenceA: "Sales of electric cars doubled between 2015 and 2020.",
    sentenceB: "Sales of petrol vehicles fell by 30% in the same period.",
    suggestedLinkers: ["Whereas", "By contrast", "In contrast to"],
    modelAnswers: [
      "Sales of electric cars doubled between 2015 and 2020, whereas those of petrol vehicles dropped by 30%.",
      "Between 2015 and 2020, electric car sales doubled; by contrast, sales of petrol vehicles declined by 30%.",
    ],
  },
  {
    id: "lp13", taskType: 1, topic: "Process description",
    sentenceA: "The raw materials are heated in a furnace.",
    sentenceB: "The molten liquid is poured into moulds.",
    suggestedLinkers: ["After that", "Subsequently", "Following this"],
    modelAnswers: [
      "The raw materials are first heated in a furnace, after which the molten liquid is poured into moulds.",
      "Once the raw materials have been heated in a furnace, the resulting molten liquid is subsequently poured into moulds.",
    ],
  },
  {
    id: "lp14", taskType: 1, topic: "Map changes",
    sentenceA: "In 1990, the site contained mostly farmland.",
    sentenceB: "By 2020, the farmland had been replaced with residential blocks.",
    suggestedLinkers: ["However", "By contrast", "Whereas"],
    modelAnswers: [
      "Whereas the site was largely farmland in 1990, by 2020 the entire area had been converted into residential blocks.",
      "In 1990, the site was dominated by farmland; however, by 2020 the farmland had given way to residential blocks.",
    ],
  },
  {
    id: "lp15", taskType: 1, topic: "Bar chart",
    sentenceA: "Female participation in higher education rose steadily.",
    sentenceB: "Male participation showed a similar upward trend.",
    suggestedLinkers: ["Similarly", "Likewise", "Correspondingly"],
    modelAnswers: [
      "Female participation in higher education climbed steadily; likewise, male participation displayed a comparable upward trajectory.",
      "Just as female participation in higher education increased steadily, male participation followed a similar upward trend.",
    ],
  },
];

// =============================================================
// PARAGRAPH REORDER - Sắp xếp câu thành đoạn văn mạch lạc
// =============================================================

export interface ReorderParagraph {
  id: string;
  taskType: 1 | 2;
  type: "introduction" | "body" | "conclusion" | "overview";
  topic: string;
  sentences: string[]; // in the CORRECT order
  explanation: string; // why this order works (referenced markers, topic sentence, etc.)
}

export const REORDER_PARAGRAPHS: ReorderParagraph[] = [
  {
    id: "rp1", taskType: 2, type: "introduction",
    topic: "Should governments invest in public transport?",
    sentences: [
      "Traffic congestion has become one of the defining problems of modern urban life.",
      "In response, many argue that governments should channel greater resources into public transport systems.",
      "This essay will contend that such investment is not only justified but essential for both environmental and economic reasons.",
    ],
    explanation: "Câu 1 là hook giới thiệu vấn đề chung. Câu 2 dùng 'In response' để tham chiếu và giới thiệu quan điểm. Câu 3 là thesis statement kết luận đoạn intro.",
  },
  {
    id: "rp2", taskType: 2, type: "body",
    topic: "Benefits of learning a second language",
    sentences: [
      "The most significant advantage of learning a second language lies in its cognitive benefits.",
      "Research has consistently shown that bilingual individuals perform better on tasks requiring attention and problem-solving.",
      "This is because managing two languages strengthens the brain's executive function.",
      "As a result, bilingual learners often outperform their monolingual peers academically.",
    ],
    explanation: "Câu 1 là topic sentence. Câu 2 đưa evidence ('Research has shown'). Câu 3 giải thích lý do ('This is because'). Câu 4 kết luận ('As a result').",
  },
  {
    id: "rp3", taskType: 2, type: "conclusion",
    topic: "Renewable energy",
    sentences: [
      "In conclusion, the transition to renewable energy is both a moral and economic imperative.",
      "While the initial investment is undeniably high, the long-term benefits far outweigh these costs.",
      "Governments and citizens alike must therefore commit to this transition without delay.",
    ],
    explanation: "Câu 1 mở kết bằng 'In conclusion'. Câu 2 dùng 'While' để nhượng bộ trước khi khẳng định. Câu 3 dùng 'therefore' đưa call-to-action.",
  },
  {
    id: "rp4", taskType: 2, type: "body",
    topic: "Working from home",
    sentences: [
      "Remote work offers employees a level of flexibility that traditional offices cannot match.",
      "For instance, parents can adjust their schedules around childcare responsibilities.",
      "Moreover, workers save considerable time and money by eliminating daily commutes.",
      "Consequently, many report higher job satisfaction and improved work-life balance.",
    ],
    explanation: "Câu 1 topic sentence. Câu 2 'For instance' đưa ví dụ. Câu 3 'Moreover' bổ sung. Câu 4 'Consequently' kết luận hệ quả.",
  },
  {
    id: "rp5", taskType: 1, type: "overview",
    topic: "Line chart of car sales 2000-2020",
    sentences: [
      "Overall, sales of electric vehicles rose dramatically over the two-decade period, while petrol car sales showed a clear downward trend.",
      "The most striking change occurred after 2015, when the two categories reversed positions.",
      "By 2020, electric vehicles had become the dominant category in the market.",
    ],
    explanation: "Overview mở bằng 'Overall'. Câu 2 chỉ ra điểm nổi bật. Câu 3 kết luận trạng thái cuối.",
  },
  {
    id: "rp6", taskType: 2, type: "body",
    topic: "University education for everyone",
    sentences: [
      "Critics argue that not everyone is suited to academic study.",
      "However, this view underestimates the transformative power of higher education.",
      "Even students who initially struggle often flourish when given proper support.",
      "For this reason, access to university should be widened, not restricted.",
    ],
    explanation: "Câu 1 nêu quan điểm đối lập. Câu 2 'However' phản biện. Câu 3 đưa dẫn chứng. Câu 4 'For this reason' kết luận.",
  },
  {
    id: "rp7", taskType: 2, type: "introduction",
    topic: "Is technology making people less social?",
    sentences: [
      "It is often claimed that the rise of digital technology has eroded genuine human interaction.",
      "While there is some truth to this concern, the picture is far more nuanced.",
      "This essay will argue that technology, when used wisely, can actually deepen social bonds rather than weaken them.",
    ],
    explanation: "Câu 1 nêu ý kiến phổ biến. Câu 2 nhượng bộ ('While'). Câu 3 thesis phản biện.",
  },
  {
    id: "rp8", taskType: 1, type: "body",
    topic: "Bar chart comparing three countries' exports",
    sentences: [
      "In 2010, Country A led the group with exports worth 40 billion dollars.",
      "By contrast, Country B exported only 25 billion dollars in the same year.",
      "Over the next decade, however, Country B's exports doubled to 50 billion, overtaking Country A.",
      "Country C, meanwhile, remained the smallest exporter throughout the period.",
    ],
    explanation: "Câu 1 giới thiệu điểm cao nhất. Câu 2 'By contrast' so sánh. Câu 3 'however' đảo chiều. Câu 4 'meanwhile' bổ sung song song.",
  },
  {
    id: "rp9", taskType: 2, type: "conclusion",
    topic: "Junk food regulation",
    sentences: [
      "To sum up, the harm caused by excessive consumption of junk food justifies stronger government intervention.",
      "Taxation, restricted advertising, and clearer labelling would together create meaningful change.",
      "Only through such coordinated action can societies protect the health of future generations.",
    ],
    explanation: "Câu 1 mở bằng 'To sum up'. Câu 2 liệt kê giải pháp cụ thể. Câu 3 dùng 'Only through' nhấn mạnh và kết.",
  },
  {
    id: "rp10", taskType: 2, type: "body",
    topic: "Space exploration",
    sentences: [
      "Investing in space exploration yields far more than scientific prestige.",
      "Technologies developed for missions - such as satellite navigation and water purification - now benefit everyday life.",
      "In addition, space research inspires young people to pursue careers in science and engineering.",
      "These practical returns make continued investment not just worthwhile, but strategically essential.",
    ],
    explanation: "Câu 1 topic sentence. Câu 2 dẫn chứng cụ thể. Câu 3 'In addition' bổ sung. Câu 4 'These practical returns' tham chiếu lại và kết.",
  },
];
