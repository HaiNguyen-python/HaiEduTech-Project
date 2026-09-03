// Task 1 specific grammar structures (data description language).
// Used by Grammar Practice when the learner selects Task 1.
import type { IELTSGrammarItem } from "./ieltsGrammarBank";

export const TASK1_GRAMMAR_CATEGORIES: { value: string; label: string }[] = [
  { value: "all", label: "All structures" },
  { value: "t1-trend", label: "Trends & change" },
  { value: "t1-comparison", label: "Comparison" },
  { value: "t1-figures", label: "Figures & proportions" },
  { value: "t1-overview", label: "Overview & summary" },
  { value: "t1-process", label: "Process" },
  { value: "t1-map", label: "Maps & changes" },
  { value: "t1-participle", label: "Participle & clauses" },
];

export const IELTS_GRAMMAR_TASK1: IELTSGrammarItem[] = [
  // --- Trends & change ---
  {
    id: "t1g-trend-rose-to", task: 1, category: "t1-trend",
    structure: "S + rose/fell + adverb + to + figure + in + year",
    meaning: "Động từ xu hướng + trạng từ + mốc số liệu + thời gian.",
    example: "Car ownership **rose steadily to** 42 million **in** 2015.",
    hint: "Describe one line going up with a clear end figure and year.",
  },
  {
    id: "t1g-trend-there-was", task: 1, category: "t1-trend",
    structure: "There was + adj + noun of change + in + N",
    meaning: "Cấu trúc danh từ hoá: 'a sharp rise in ...'.",
    example: "**There was a sharp rise in** the number of international students between 2005 and 2012.",
  },
  {
    id: "t1g-trend-saw", task: 1, category: "t1-trend",
    structure: "Year / Place + saw / witnessed + noun of change",
    meaning: "Lấy năm hoặc địa điểm làm chủ ngữ.",
    example: "The year 2009 **witnessed** a dramatic fall in factory output.",
  },
  {
    id: "t1g-trend-with-ving", task: 1, category: "t1-trend",
    structure: "..., with + N + V-ing (accompanying detail)",
    meaning: "Mệnh đề 'with' bổ sung số liệu đi kèm.",
    example: "Energy demand climbed throughout the period, **with** consumption **reaching** 900 terawatt-hours by 2020.",
  },
  {
    id: "t1g-trend-before", task: 1, category: "t1-trend",
    structure: "S + V-ed ..., before + V-ing ...",
    meaning: "Nối hai giai đoạn của cùng một đường xu hướng.",
    example: "Unemployment peaked at 11% in 2010, **before falling** back to 6% five years later.",
  },
  {
    id: "t1g-trend-continued", task: 1, category: "t1-trend",
    structure: "S + continued to V / remained + adj + until + year",
    meaning: "Diễn tả giai đoạn không đổi hoặc kéo dài.",
    example: "Rainfall **remained stable at** around 80 mm **until** 2014.",
  },
  {
    id: "t1g-trend-by-figure", task: 1, category: "t1-trend",
    structure: "S + increased/decreased + by + amount (vs. to + level)",
    meaning: "Phân biệt 'by' (mức thay đổi) và 'to' (mức đạt tới).",
    example: "Online sales grew **by** 15 percentage points, **to** just over 60% of all retail transactions.",
  },
  {
    id: "t1g-trend-fluctuate", task: 1, category: "t1-trend",
    structure: "S + fluctuated between X and Y",
    meaning: "Dao động trong khoảng.",
    example: "Visitor numbers **fluctuated between** 2.1 and 2.8 million throughout the decade.",
  },

  // --- Comparison ---
  {
    id: "t1g-comp-times", task: 1, category: "t1-comparison",
    structure: "S + is/was + number + times as + adj + as + N",
    meaning: "So sánh bội số.",
    example: "Water consumption in industry was **three times as high as** that in agriculture.",
  },
  {
    id: "t1g-comp-twice-many", task: 1, category: "t1-comparison",
    structure: "twice / half as many + N + as",
    meaning: "Gấp đôi / bằng một nửa về số lượng.",
    example: "**Twice as many** men **as** women chose engineering as a career.",
  },
  {
    id: "t1g-comp-whereas", task: 1, category: "t1-comparison",
    structure: "Whereas / While + clause, clause (contrast two figures)",
    meaning: "Đối chiếu hai số liệu trong một câu.",
    example: "**Whereas** France produced 320 tonnes of steel, Italy managed only 180 tonnes.",
  },
  {
    id: "t1g-comp-compared", task: 1, category: "t1-comparison",
    structure: "compared with / in comparison with + N",
    meaning: "So với ...",
    example: "Bus use fell sharply **compared with** cycling, which almost doubled.",
  },
  {
    id: "t1g-comp-far-higher", task: 1, category: "t1-comparison",
    structure: "far / significantly / marginally + comparative + than",
    meaning: "Trạng từ mức độ trước hình thức so sánh hơn.",
    example: "Spending on housing was **significantly higher than** spending on transport in every country surveyed.",
  },
  {
    id: "t1g-comp-superlative", task: 1, category: "t1-comparison",
    structure: "The + superlative + N + was/were + figure",
    meaning: "So sánh nhất khi nêu cao nhất/thấp nhất.",
    example: "**The largest** share of household income, at 34%, went on rent.",
  },
  {
    id: "t1g-comp-similarly", task: 1, category: "t1-comparison",
    structure: "Similarly / Likewise, S + V (parallel trend)",
    meaning: "Nêu xu hướng tương tự giữa hai đối tượng.",
    example: "Japan's birth rate declined steadily; **similarly**, South Korea saw a continuous fall.",
  },
  {
    id: "t1g-comp-outnumber", task: 1, category: "t1-comparison",
    structure: "S + outnumbered / exceeded + O + by + figure",
    meaning: "Nhiều hơn / vượt quá bao nhiêu.",
    example: "Private vehicles **outnumbered** public buses **by** a factor of five.",
  },
  {
    id: "t1g-comp-least", task: 1, category: "t1-comparison",
    structure: "S + was the least + adj / the second highest",
    meaning: "Diễn đạt thứ hạng trong bảng, biểu đồ.",
    example: "Germany recorded **the second highest** recycling rate, just behind Sweden.",
  },

  // --- Figures & proportions ---
  {
    id: "t1g-fig-accounting", task: 1, category: "t1-figures",
    structure: "..., accounting for + percentage",
    meaning: "Chiếm bao nhiêu phần trăm.",
    example: "Coal remained the dominant fuel, **accounting for** 47% of total generation.",
  },
  {
    id: "t1g-fig-a-figure-of", task: 1, category: "t1-figures",
    structure: "..., a figure of + number",
    meaning: "Đồng vị ngữ nêu lại con số.",
    example: "Rice exports reached 6.4 million tonnes, **a figure of** almost double the 2000 level.",
  },
  {
    id: "t1g-fig-at-just-over", task: 1, category: "t1-figures",
    structure: "at just over / just under / approximately + figure",
    meaning: "Diễn đạt số liệu xấp xỉ.",
    example: "Literacy stood **at just under** 90% by the end of the period.",
  },
  {
    id: "t1g-fig-one-in", task: 1, category: "t1-figures",
    structure: "one in every + number + N",
    meaning: "Cứ ... người thì có 1 người.",
    example: "**One in every** four households owned an electric vehicle by 2022.",
  },
  {
    id: "t1g-fig-proportion", task: 1, category: "t1-figures",
    structure: "The proportion / percentage of N + V",
    meaning: "Chủ ngữ là tỉ lệ - động từ chia số ít.",
    example: "**The proportion of** graduates entering teaching **has fallen** to 12%.",
  },
  {
    id: "t1g-fig-make-up", task: 1, category: "t1-figures",
    structure: "S + made up / constituted + percentage of + N",
    meaning: "Chiếm tỉ trọng trong tổng thể.",
    example: "Imported goods **made up** roughly a third **of** all consumer spending.",
  },
  {
    id: "t1g-fig-respectively", task: 1, category: "t1-figures",
    structure: "X and Y + V + figures + respectively",
    meaning: "Nêu hai số liệu song song với 'respectively'.",
    example: "Canada and Mexico spent 4.2% and 2.8% of GDP on research **respectively**.",
  },
  {
    id: "t1g-fig-with-total", task: 1, category: "t1-figures",
    structure: "at a rate of / to a total of + figure",
    meaning: "Nêu tốc độ hoặc tổng mức.",
    example: "The population expanded **at a rate of** 1.3% a year, **to a total of** 68 million.",
  },

  // --- Overview & summary ---
  {
    id: "t1g-ov-overall", task: 1, category: "t1-overview",
    structure: "Overall, it is clear that + clause",
    meaning: "Câu tổng quan bắt buộc trong Task 1.",
    example: "**Overall, it is clear that** solar power grew fastest, while coal declined throughout.",
    hint: "Summarise the two biggest features without quoting figures.",
  },
  {
    id: "t1g-ov-what-stands", task: 1, category: "t1-overview",
    structure: "What stands out is that + clause",
    meaning: "Nhấn mạnh đặc điểm nổi bật nhất.",
    example: "**What stands out is that** every category rose except public transport.",
  },
  {
    id: "t1g-ov-the-chart-shows", task: 1, category: "t1-overview",
    structure: "The chart / table illustrates + noun phrase",
    meaning: "Câu mở bài paraphrase đề.",
    example: "**The bar chart illustrates** changes in household energy use in four countries between 1990 and 2010.",
  },
  {
    id: "t1g-ov-broadly", task: 1, category: "t1-overview",
    structure: "Broadly speaking, S + V",
    meaning: "Khái quát xu hướng chung.",
    example: "**Broadly speaking**, urban areas expanded while farmland shrank.",
  },
  {
    id: "t1g-ov-with-exception", task: 1, category: "t1-overview",
    structure: "With the exception of + N, S + V",
    meaning: "Ngoại trừ ...",
    example: "**With the exception of** Norway, all countries reported falling emissions.",
  },
  {
    id: "t1g-ov-in-general", task: 1, category: "t1-overview",
    structure: "In general, N + tended to + V",
    meaning: "Kết hợp khái quát và hedging.",
    example: "**In general**, younger age groups **tended to** spend more time online.",
  },
  {
    id: "t1g-ov-two-features", task: 1, category: "t1-overview",
    structure: "It can be seen that + clause",
    meaning: "Cách nêu đặc điểm khách quan.",
    example: "**It can be seen that** the gap between the two regions widened after 2008.",
  },
  {
    id: "t1g-ov-throughout", task: 1, category: "t1-overview",
    structure: "Throughout the period, S + remained + adj",
    meaning: "Khái quát cả giai đoạn.",
    example: "**Throughout the period**, wheat **remained** the most widely grown crop.",
  },

  // --- Process ---
  {
    id: "t1g-proc-passive-seq", task: 1, category: "t1-process",
    structure: "First, N + is/are + V3. Then, ...",
    meaning: "Bị động hiện tại nối tiếp - ngôn ngữ chuẩn của biểu đồ quy trình.",
    example: "First, raw clay **is extracted** from the ground. It **is then filtered** to remove impurities.",
  },
  {
    id: "t1g-proc-once", task: 1, category: "t1-process",
    structure: "Once + N + has been + V3, ...",
    meaning: "Sau khi bước trước hoàn tất.",
    example: "**Once** the glass **has been crushed**, it is transported to a furnace.",
  },
  {
    id: "t1g-proc-before-being", task: 1, category: "t1-process",
    structure: "..., before being + V3",
    meaning: "Rút gọn bước tiếp theo bằng bị động.",
    example: "The beans are dried in the sun, **before being roasted** at 200 degrees.",
  },
  {
    id: "t1g-proc-at-this-stage", task: 1, category: "t1-process",
    structure: "At this stage / In the final step, N + is + V3",
    meaning: "Từ nối chỉ giai đoạn.",
    example: "**In the final step**, the finished bottles **are packaged** for distribution.",
  },
  {
    id: "t1g-proc-purpose", task: 1, category: "t1-process",
    structure: "N + is + V3 + so that / in order to + V",
    meaning: "Nêu mục đích của một bước.",
    example: "The mixture is heated **in order to** kill any remaining bacteria.",
  },
  {
    id: "t1g-proc-cyclical", task: 1, category: "t1-process",
    structure: "The cycle then begins again with + N",
    meaning: "Kết thúc quy trình tuần hoàn.",
    example: "**The cycle then begins again with** water evaporating from the ocean surface.",
  },
  {
    id: "t1g-proc-consists", task: 1, category: "t1-process",
    structure: "The process consists of + number + main stages, beginning with + N",
    meaning: "Câu tổng quan của biểu đồ quy trình.",
    example: "**The process consists of** six main stages, **beginning with** the harvesting of cane.",
  },
  {
    id: "t1g-proc-where", task: 1, category: "t1-process",
    structure: "..., where + N + is + V3",
    meaning: "Mệnh đề quan hệ chỉ nơi diễn ra bước tiếp theo.",
    example: "The pulp travels to a large tank, **where** it **is mixed** with warm water.",
  },

  // --- Maps & changes ---
  {
    id: "t1g-map-was-replaced", task: 1, category: "t1-map",
    structure: "N + was replaced by / was converted into + N",
    meaning: "Mô tả sự thay thế trên bản đồ.",
    example: "The woodland to the north **was replaced by** a residential estate.",
  },
  {
    id: "t1g-map-underwent", task: 1, category: "t1-map",
    structure: "N + underwent + noun of change",
    meaning: "Trải qua sự thay đổi.",
    example: "The town centre **underwent** considerable redevelopment between 1980 and 2010.",
  },
  {
    id: "t1g-map-there-be", task: 1, category: "t1-map",
    structure: "In + year, there was / were + N + to the north of + N",
    meaning: "Định vị theo phương hướng.",
    example: "**In** 1985, **there was** a small harbour **to the south of** the main road.",
  },
  {
    id: "t1g-map-had-been", task: 1, category: "t1-map",
    structure: "By + year, N + had been + V3",
    meaning: "Quá khứ hoàn thành bị động cho bản đồ hai mốc thời gian.",
    example: "**By** 2010, the old factory **had been demolished** to make way for a park.",
  },
  {
    id: "t1g-map-extended", task: 1, category: "t1-map",
    structure: "N + was extended / expanded + eastwards",
    meaning: "Mở rộng theo hướng nào.",
    example: "The railway line **was extended eastwards** as far as the new hospital.",
  },
  {
    id: "t1g-map-remain-unchanged", task: 1, category: "t1-map",
    structure: "N + remained unchanged / was left intact",
    meaning: "Phần không thay đổi trên bản đồ.",
    example: "The church beside the river **remained unchanged** over the whole period.",
  },
  {
    id: "t1g-map-in-place-of", task: 1, category: "t1-map",
    structure: "In place of + N, a new + N + was built",
    meaning: "Thay cho ... một công trình mới được xây.",
    example: "**In place of** the farmland, a new shopping centre **was built** in 2005.",
  },
  {
    id: "t1g-map-the-most-striking", task: 1, category: "t1-map",
    structure: "The most striking change is that + clause",
    meaning: "Câu tổng quan cho bản đồ.",
    example: "**The most striking change is that** the rural village had become a small town by 2015.",
  },

  // --- Participle & clauses ---
  {
    id: "t1g-part-peaking", task: 1, category: "t1-participle",
    structure: "..., peaking at + figure + in + year",
    meaning: "Mệnh đề phân từ nêu đỉnh của xu hướng.",
    example: "Tourist arrivals climbed sharply, **peaking at** 9 million **in** 2018.",
  },
  {
    id: "t1g-part-having-risen", task: 1, category: "t1-participle",
    structure: "Having + V3, S + V",
    meaning: "Hành động hoàn tất trước giai đoạn tiếp theo.",
    example: "**Having risen** for five straight years, exports levelled off after 2016.",
  },
  {
    id: "t1g-part-which-summ", task: 1, category: "t1-participle",
    structure: ", which + V (summative relative clause)",
    meaning: "Mệnh đề quan hệ tổng kết cả ý trước.",
    example: "Rail fares doubled over the decade, **which made** cycling far more attractive.",
  },
  {
    id: "t1g-part-followed-by", task: 1, category: "t1-participle",
    structure: "..., followed by + N + at + figure",
    meaning: "Xếp hạng các hạng mục sau mục cao nhất.",
    example: "Canada topped the table at 78%, **followed by** Australia **at** 65%.",
  },
  {
    id: "t1g-part-despite", task: 1, category: "t1-participle",
    structure: "Despite + N / V-ing, S + V",
    meaning: "Nêu tương phản trong cùng một câu.",
    example: "**Despite falling** for three years, oil imports still exceeded those of any other fuel.",
  },
  {
    id: "t1g-part-ranging", task: 1, category: "t1-participle",
    structure: "..., ranging from X to Y",
    meaning: "Nêu khoảng giá trị.",
    example: "Class sizes varied widely, **ranging from** 12 **to** 34 pupils.",
  },
  {
    id: "t1g-part-while-ving", task: 1, category: "t1-participle",
    structure: "While + V-ing, S + V (reduced time clause)",
    meaning: "Rút gọn mệnh đề thời gian.",
    example: "**While rising** overall, the figure for rural areas dipped briefly in 2004.",
  },
  {
    id: "t1g-part-with-nn", task: 1, category: "t1-participle",
    structure: "with + N + at + figure (absolute phrase)",
    meaning: "Cụm tuyệt đối bổ sung số liệu ngắn gọn.",
    example: "The two nations differed sharply, **with** Spain **at** 22% and Poland at only 7%.",
  },
];
