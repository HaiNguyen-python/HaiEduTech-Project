/**
 * @file ieltsWritingLectureEnricher.ts
 * @description Replaces the generic `mk()`-factory content (identical strategy
 *   steps, one placeholder example, empty vocab) with lecture-specific
 *   Practical Examples and Band 7-8 Vocabulary for every IELTS Writing
 *   lecture. Topic is detected from the lecture `id` and mapped to a
 *   hand-crafted content pack. Applied inside `ieltsLecturesData.ts` so all
 *   writing lectures automatically become richer and on-topic.
 */
import type {
  IeltsLecture,
  VocabHighlight,
  StrategyStep,
  MistakeToAvoid,
} from "./ieltsLecturesData";

type Example = IeltsLecture["practicalExamples"][number];

interface Pack {
  examples: Example[];
  vocab: VocabHighlight[];
}

// Small helpers -------------------------------------------------------------
const v = (
  word: string,
  definition: string,
  definitionVi: string,
  example: string,
  band = "7.5",
): VocabHighlight => ({ word, definition, definitionVi, example, band });

const ex = (
  context: string,
  contextVi: string,
  example: string,
  explanation?: string,
): Example => ({ context, contextVi, example, explanation });

// ---------------------------------------------------------------------------
// TASK 1 - CONTENT PACKS
// ---------------------------------------------------------------------------

const T1_OVERVIEW: Pack = {
  examples: [
    ex(
      "Line graph - internet users 2000-2020",
      "Biểu đồ đường - người dùng internet 2000-2020",
      "Overall, the number of internet users rose dramatically over the two-decade period, with all three regions ending significantly higher than they began; however, Asia experienced by far the steepest growth and overtook Europe as the largest user base.",
      "Two-sentence overview: (1) headline trend for ALL data, (2) the single biggest comparison. No numbers.",
    ),
    ex(
      "Bar chart - electricity generation by source, 2010 vs 2022",
      "Biểu đồ cột - sản lượng điện theo nguồn, 2010 vs 2022",
      "Overall, renewable sources gained a substantially larger share of electricity generation between 2010 and 2022, while coal and oil declined in every country shown. Natural gas remained the single largest source throughout the period.",
      "Group increases vs decreases, then flag the item that stayed dominant. Zero exact figures in the overview.",
    ),
    ex(
      "Pie charts - household spending 1990 vs 2020",
      "Biểu đồ tròn - chi tiêu hộ gia đình 1990 vs 2020",
      "Overall, housing and healthcare consumed a noticeably larger portion of household budgets in 2020 than three decades earlier, whereas food and clothing shrank as spending priorities.",
      "For pie-vs-pie prompts, contrast the shifts between the two years and name the two biggest movers.",
    ),
    ex(
      "Map - town centre before and after redevelopment",
      "Bản đồ - trung tâm thị trấn trước và sau tái quy hoạch",
      "Overall, the town centre was transformed from a largely industrial zone into a mixed residential and leisure area, with the removal of the factory and the addition of a park, apartments and pedestrian streets.",
      "Map overviews name the FUNCTION change, not every building.",
    ),
  ],
  vocab: [
    v("overall", "used to introduce the summary sentence of Task 1", "dùng mở đầu câu tổng quan", "Overall, the figures rose across all three categories.", "6.5"),
    v("by far", "used to emphasise the biggest gap in the data", "cách xa, hơn hẳn", "China's exports were by far the highest of the four nations.", "7.0"),
    v("outstrip", "to be much greater than something else", "vượt xa", "Renewable output outstripped coal by the end of the period.", "7.5"),
    v("headline trend", "the single most important pattern in a chart", "xu hướng nổi bật nhất", "The headline trend was a sharp fall in traditional fuels.", "7.5"),
    v("mirror", "to show the same pattern as another category", "phản ánh giống", "Spending on transport mirrored the rise in fuel prices.", "7.5"),
    v("dwarf", "to be so large that another figure looks tiny", "át hẳn, làm lu mờ", "Video streaming traffic dwarfed all other online activity.", "8.0"),
    v("marginal", "very small and not important", "không đáng kể", "The change in the smallest category was marginal.", "7.0"),
    v("noticeably", "in a way clear enough to be seen", "rõ rệt", "Prices were noticeably higher in urban areas.", "7.0"),
    v("gain traction", "to become steadily more popular", "dần được ưa chuộng", "Electric vehicles gained traction after 2015.", "8.0"),
    v("headline figure", "the single number that best summarises a chart", "con số tiêu biểu", "The headline figure is a 60% rise over the decade.", "7.5"),
  ],
};

const T1_TRENDS: Pack = {
  examples: [
    ex(
      "Sample sentence - upward trend with degree adverb",
      "Câu mẫu - xu hướng tăng kèm trạng từ mức độ",
      "The proportion of households owning a car climbed steadily from 32% in 1990 to 71% in 2020, more than doubling within thirty years.",
      "Formula: subject + trend verb + adverb + from X to Y + by-clause. Never repeat 'increase' twice.",
    ),
    ex(
      "Sample sentence - fluctuation followed by peak",
      "Câu mẫu - dao động rồi đạt đỉnh",
      "Rice consumption fluctuated between 90 and 110 kg per capita during the 2000s before peaking at 128 kg in 2015 and then falling back to 105 kg by 2022.",
      "Chain three moves - fluctuate → peak → drop back - to demonstrate GRA range.",
    ),
    ex(
      "Sample sentence - two lines converging",
      "Câu mẫu - hai đường hội tụ",
      "While private car ownership continued to grow marginally, public transport use surged, so the gap between the two narrowed to just five percentage points by 2020.",
      "Comparative move: rise + rise + narrowing gap. Double-scores Task Achievement and Lexical Resource.",
    ),
    ex(
      "Prompt for practice - line graph, three cities' rainfall 1980-2020",
      "Đề luyện - lượng mưa của 3 thành phố 1980-2020",
      "Practise writing ONE overview sentence and TWO trend sentences using: soar, dip, plateau, edge up, plummet.",
      "Constraint: use each verb only once - forces vocabulary rotation.",
    ),
  ],
  vocab: [
    v("soar", "to rise very quickly to a high level", "vọt lên", "House prices soared by 40% in a single year.", "7.5"),
    v("plummet", "to fall very quickly and by a large amount", "lao dốc", "Sales plummeted after the recall.", "7.5"),
    v("plateau", "to stop rising or falling and stay level", "chững lại", "The unemployment rate plateaued at 5% after 2018.", "7.5"),
    v("edge up", "to rise very slowly and slightly", "nhích lên", "Interest rates edged up in the final quarter.", "7.0"),
    v("dip", "to fall a small amount before rising again", "giảm nhẹ", "Exports dipped briefly in June before recovering.", "7.0"),
    v("fluctuate", "to change frequently and irregularly", "dao động", "Oil prices fluctuated between $60 and $90.", "7.0"),
    v("surge", "to rise suddenly and by a large amount", "tăng vọt", "Demand for masks surged in early 2020.", "7.5"),
    v("marginally", "by a very small amount", "chút ít", "Female participation rose marginally over the decade.", "7.0"),
    v("outpace", "to grow faster than something else", "vượt tốc độ", "Renewables outpaced fossil fuels from 2018 onwards.", "8.0"),
    v("narrow the gap", "to become closer to another figure", "thu hẹp khoảng cách", "Rural incomes narrowed the gap with urban wages.", "7.5"),
  ],
};

const T1_BAR_PIE: Pack = {
  examples: [
    ex(
      "Bar chart - transport modes in four cities",
      "Biểu đồ cột - phương tiện di chuyển ở 4 thành phố",
      "Cars were the dominant mode in Los Angeles and Sydney, accounting for over 70% of trips in each, whereas cycling made up only a negligible share (below 3%). By contrast, Amsterdam and Copenhagen showed the reverse pattern: bicycles represented roughly 40% of daily journeys while car use fell below 30%.",
      "Compare cities in PAIRS (similar behaviour) rather than one-by-one.",
    ),
    ex(
      "Pie chart - global water usage by sector",
      "Biểu đồ tròn - sử dụng nước toàn cầu theo lĩnh vực",
      "Agriculture consumed the largest share of global water at 70%, followed by industry (19%) and domestic use (11%). This means that farming used more than six times the amount consumed by households.",
      "Always add a RATIO sentence for pie charts (e.g. six times, twice as much).",
    ),
    ex(
      "Two pie charts - energy sources 2000 vs 2020",
      "Hai biểu đồ tròn - nguồn năng lượng 2000 vs 2020",
      "The most striking shift was the rise of renewables from a marginal 5% in 2000 to a significant 24% in 2020, while coal roughly halved from 38% to 19%. Natural gas remained the largest single source in both years, at around 32%.",
      "Pie-vs-pie: name the biggest CHANGE first, then what stayed the same.",
    ),
  ],
  vocab: [
    v("account for", "to make up a proportion of the total", "chiếm tỷ lệ", "Solar accounted for 12% of new capacity.", "7.0"),
    v("make up", "to form a part of the whole", "cấu thành", "Women made up 46% of the workforce.", "6.5"),
    v("negligible", "so small that it can be ignored", "không đáng kể", "The share of coal was negligible by 2022.", "7.5"),
    v("roughly", "approximately", "khoảng, xấp xỉ", "Roughly one third of respondents agreed.", "6.5"),
    v("outnumber", "to be larger in number than", "nhiều hơn về số lượng", "Cyclists outnumbered drivers in Copenhagen.", "7.5"),
    v("respectively", "in the order mentioned", "tương ứng", "Prices rose by 4% and 7% respectively.", "7.0"),
    v("proportion", "a part of a total number or amount", "tỷ lệ", "A high proportion of teens use TikTok daily.", "6.5"),
    v("dominant", "the largest and most important", "chiếm ưu thế", "Cars were the dominant transport mode.", "7.5"),
    v("counterpart", "the equivalent figure elsewhere", "con số tương ứng", "Its French counterpart stood at just 5%.", "8.0"),
    v("six times as much", "used to express a large ratio", "gấp sáu lần", "Farming used six times as much water as households.", "7.0"),
  ],
};

const T1_TABLE: Pack = {
  examples: [
    ex(
      "Table - population of five capitals in 1990 and 2020",
      "Bảng - dân số của 5 thủ đô năm 1990 và 2020",
      "Tokyo remained by far the most populous capital throughout the period, growing from 30 to 37 million, whereas Berlin was consistently the smallest at under 4 million. The biggest proportional jump was in Delhi, whose population almost trebled from 9 to 26 million.",
      "Pick 3 extremes: largest, smallest, biggest change. Ignore the mid-range cells.",
    ),
    ex(
      "Table - CO2 emissions per capita by country",
      "Bảng - phát thải CO2 bình quân đầu người",
      "Qatar produced the highest per-capita emissions in every year measured, peaking at 45 tonnes in 2015, while India remained the lowest at under 2 tonnes. Notably, China's figure more than doubled, overtaking the EU average by 2020.",
      "Add a comparative verb (overtake / draw level / fall behind) to link two rows.",
    ),
    ex(
      "Practice prompt",
      "Đề luyện tập",
      "Given a 5x4 table of average incomes in five cities, write the overview + 2 body paragraphs using ONLY these four cells: highest, lowest, biggest rise, smallest change.",
      "Deliberately ignore 16 of 20 cells - selective reporting is the official IELTS instruction.",
    ),
  ],
  vocab: [
    v("consistently", "always, at every point measured", "một cách nhất quán", "Norway was consistently the top scorer.", "7.5"),
    v("treble", "to become three times as large", "gấp ba lần", "Tuition fees trebled between 2000 and 2020.", "7.5"),
    v("overtake", "to become larger than", "vượt qua", "China overtook Japan in 2010.", "7.0"),
    v("per capita", "for each person", "bình quân đầu người", "Emissions per capita fell in Germany.", "7.5"),
    v("draw level with", "to reach the same figure as", "ngang bằng với", "Chile drew level with Argentina in 2018.", "8.0"),
    v("stand at", "to be at a particular level", "ở mức", "The rate stood at 4.2% in 2022.", "7.0"),
    v("peak at", "to reach the highest point at", "đạt đỉnh tại", "Sales peaked at 8 million in 2019.", "7.0"),
    v("stagnate", "to stay the same for a long time", "trì trệ", "Rural incomes stagnated over the decade.", "7.5"),
    v("differ markedly", "to be very different", "khác biệt rõ rệt", "The two regions differed markedly in output.", "7.5"),
    v("bottom of the ranking", "the lowest in a list", "cuối bảng xếp hạng", "Portugal remained at the bottom of the ranking.", "7.0"),
  ],
};

const T1_PROCESS: Pack = {
  examples: [
    ex(
      "Process diagram - how chocolate is produced",
      "Sơ đồ quy trình - sản xuất socola",
      "The process begins when cocoa pods are harvested from the trees. Once picked, the beans are removed and left to ferment for approximately one week, after which they are dried in the sun. They are then roasted, ground into a paste, and finally moulded into chocolate bars ready for packaging.",
      "Signposts: begins / once / after which / then / finally. Use passive voice throughout.",
    ),
    ex(
      "Process diagram - water cycle",
      "Sơ đồ quy trình - vòng tuần hoàn nước",
      "The cycle starts as water evaporates from oceans and lakes due to solar heat. The resulting vapour rises and cools to form clouds through condensation. When the droplets become too heavy, they fall as precipitation - either rain or snow - and eventually flow back to the sea via rivers, completing the cycle.",
      "Cyclic processes need 'completing the cycle' as the closing move.",
    ),
    ex(
      "Practice mini-drill",
      "Bài luyện ngắn",
      "Rewrite the following active sentences in the passive: 'Workers pour the mixture into moulds. A machine seals the lid. The staff pack the bottles into boxes.'",
      "Passive voice is standard for Task 1 process descriptions.",
    ),
  ],
  vocab: [
    v("undergo", "to experience a process", "trải qua", "The beans undergo fermentation for a week.", "7.5"),
    v("subsequently", "after that; then", "sau đó", "The mixture is subsequently cooled.", "7.5"),
    v("give rise to", "to cause something to appear", "dẫn đến, tạo ra", "This step gives rise to a fine powder.", "8.0"),
    v("in turn", "one after the other in sequence", "lần lượt", "The valve, in turn, opens the second chamber.", "7.5"),
    v("thereby", "by this means", "bằng cách đó", "Heat is applied, thereby melting the wax.", "8.0"),
    v("harvest", "to gather crops from the fields", "thu hoạch", "Cocoa pods are harvested twice a year.", "6.5"),
    v("filter", "to pass a liquid through to remove impurities", "lọc", "The water is then filtered to remove particles.", "7.0"),
    v("compress", "to press together to reduce size", "nén", "The gas is compressed to a high pressure.", "7.0"),
    v("release", "to allow to escape or be discharged", "thải ra, giải phóng", "Steam is released through a valve.", "6.5"),
    v("cycle", "a sequence that keeps repeating", "chu trình", "The process operates in a continuous cycle.", "6.5"),
  ],
};

const T1_MAP: Pack = {
  examples: [
    ex(
      "Map - village centre in 1975 and today",
      "Bản đồ - trung tâm làng 1975 và hiện nay",
      "The most striking transformation is the disappearance of the woodland to the north, which has been cleared to make way for a large housing estate. To the east, the small farm has been demolished and replaced by a supermarket and its car park, while the primary school has been extended to twice its original size.",
      "Anchor changes by compass direction (north, east). Use present perfect passive: has been + past participle.",
    ),
    ex(
      "Map - university campus, current and proposed",
      "Bản đồ - khuôn viên đại học, hiện tại và dự kiến",
      "According to the plan, several major additions are envisaged. A new library will be constructed on the site of the current car park, and a pedestrian walkway is set to replace the road that presently bisects the campus.",
      "Future maps use 'will be + past participle' and 'is set to'.",
    ),
    ex(
      "Practice prompt",
      "Đề luyện",
      "The two maps show a coastal resort in 1990 and 2020. Write the overview + two body paragraphs, grouping changes as 'expansion' vs 'removal/replacement'.",
      "Grouping by change TYPE is far clearer than moving around the map building by building.",
    ),
  ],
  vocab: [
    v("demolish", "to knock down a building", "phá dỡ", "The old cinema was demolished in 2015.", "7.5"),
    v("relocate", "to move to a new place", "di dời", "The bus station was relocated to the west.", "7.5"),
    v("pedestrianise", "to make a street for walkers only", "biến thành phố đi bộ", "The main street has been pedestrianised.", "8.0"),
    v("adjacent to", "next to", "kế bên", "A new gym was built adjacent to the school.", "7.5"),
    v("in place of", "instead of", "thay cho", "Apartments now stand in place of the factory.", "7.0"),
    v("extend", "to make larger or longer", "mở rộng", "The library has been extended by two wings.", "6.5"),
    v("convert into", "to change into another use", "chuyển đổi thành", "The warehouse was converted into offices.", "7.0"),
    v("occupy", "to fill or take up space", "chiếm chỗ", "A small park now occupies the former lot.", "7.0"),
    v("envisaged", "planned or intended", "dự kiến", "Several changes are envisaged for the site.", "8.0"),
    v("undergo redevelopment", "to be rebuilt or renewed", "được tái quy hoạch", "The waterfront has undergone major redevelopment.", "8.0"),
  ],
};

const T1_LETTER: Pack = {
  examples: [
    ex(
      "Formal complaint letter - opening",
      "Thư khiếu nại trang trọng - mở đầu",
      "Dear Sir or Madam,\n\nI am writing to express my dissatisfaction with the laptop I purchased from your online store on 3 March 2026 (order #A-4821). Despite being advertised as brand new, the device arrived with visible scratches and a faulty keyboard.",
      "Formal openers: 'I am writing to express my dissatisfaction / to complain about / to bring to your attention'. Never 'Hi' or contractions.",
    ),
    ex(
      "Semi-formal request letter to a manager",
      "Thư yêu cầu bán trang trọng gửi quản lý",
      "Dear Ms Nguyen,\n\nI hope this message finds you well. I am writing to request permission to work from home for the next two weeks, as I need to care for a family member who has recently undergone surgery.",
      "Semi-formal: keep the professional tone but allow 'I hope this message finds you well'.",
    ),
    ex(
      "Informal thank-you letter",
      "Thư cảm ơn thân mật",
      "Hi Sarah,\n\nI just wanted to drop you a quick line to say a huge thank you for hosting me last weekend. The dinner you cooked was incredible, and I really appreciated the tour of the old town.",
      "Informal: contractions allowed, phrasal verbs ('drop you a line'), warm tone.",
    ),
    ex(
      "Job application closing",
      "Đơn xin việc - đoạn kết",
      "I have attached my CV for your consideration and would welcome the opportunity to discuss my suitability in an interview at your convenience. Thank you for taking the time to review my application.\n\nYours faithfully,\nHai Nguyen",
      "'Yours faithfully' = when you started 'Dear Sir/Madam'. 'Yours sincerely' = when you used a name.",
    ),
  ],
  vocab: [
    v("I am writing to", "standard opener stating the letter's purpose", "tôi viết thư này để", "I am writing to enquire about the vacancy.", "7.0"),
    v("bring to your attention", "to formally raise an issue", "báo cho quý vị được rõ", "I would like to bring to your attention a serious defect.", "7.5"),
    v("would appreciate it if", "polite request formula", "sẽ rất biết ơn nếu", "I would appreciate it if you could reply by Friday.", "7.5"),
    v("at your earliest convenience", "as soon as you can", "sớm nhất có thể", "Please respond at your earliest convenience.", "7.5"),
    v("enclosed please find", "used with attached documents (formal)", "đính kèm theo đây", "Enclosed please find my updated CV.", "7.5"),
    v("look forward to hearing", "polite closing before signature", "mong sớm nhận phản hồi", "I look forward to hearing from you.", "7.0"),
    v("yours faithfully", "sign-off after 'Dear Sir/Madam'", "trân trọng (khi mở Dear Sir/Madam)", "Yours faithfully, Hai Nguyen", "7.0"),
    v("yours sincerely", "sign-off after a named greeting", "trân trọng (khi mở bằng tên)", "Yours sincerely, Hai Nguyen", "7.0"),
    v("drop you a line", "informal 'write to you'", "viết vài dòng cho bạn", "I just wanted to drop you a line.", "7.0"),
    v("catch up soon", "informal closing", "gặp lại sớm", "Hope we can catch up soon!", "6.5"),
  ],
};

const T1_MIXED: Pack = {
  examples: [
    ex(
      "Line + pie combo - car sales and market share, 2010-2020",
      "Kết hợp đường + tròn - doanh số xe và thị phần",
      "Overall, while total car sales grew steadily from 8 to 12 million units, this rise was accompanied by a major shift in market share: electric vehicles expanded from a marginal 2% in 2010 to a substantial 24% in 2020, largely at the expense of diesel.",
      "Overview must merge BOTH sources in a single 'while / accompanied by' sentence.",
    ),
    ex(
      "Bar + table combo - university enrolment and staff numbers",
      "Cột + bảng - số sinh viên và giảng viên đại học",
      "The upward trend in enrolment is reflected in staffing figures: Cambridge added 400 lecturers over the decade, mirroring the 30% rise in its student body, while Manchester's flatter enrolment growth translated into a modest increase of just 90 staff.",
      "Cross-reference connectors: 'is reflected in', 'mirroring', 'translated into'.",
    ),
    ex(
      "Practice drill",
      "Bài luyện",
      "Given a bar chart of exports + a pie chart of destinations, plan ONE overview that combines both, and TWO body paragraphs each anchored in one chart but supported by the other.",
      "This prevents the classic Band 6 mistake: 'The bar chart shows... The pie chart shows...'",
    ),
  ],
  vocab: [
    v("is reflected in", "shows the same pattern as", "được phản ánh trong", "The wage rise is reflected in retail spending.", "7.5"),
    v("mirror", "to show the same pattern as", "phản ánh giống", "Export figures mirrored global demand.", "7.5"),
    v("translate into", "to result in another form of increase", "chuyển thành", "Higher fees translated into fewer applicants.", "8.0"),
    v("largely at the expense of", "gaining ground by taking from another", "phần lớn là do lấy từ", "EVs grew largely at the expense of diesel.", "8.0"),
    v("in tandem with", "at the same time as", "song hành cùng", "Costs rose in tandem with fuel prices.", "8.0"),
    v("correspond to", "to match", "tương ứng với", "The peaks correspond to summer months.", "7.5"),
    v("mirrored by", "shown in the other data source", "được phản ánh bởi", "The rise was mirrored by higher exports.", "7.5"),
    v("cross-referenced", "checked against another source", "đối chiếu chéo", "The two figures can be cross-referenced.", "7.5"),
    v("underpin", "to support or explain a trend", "làm nền tảng cho", "Rising incomes underpin the spending boom.", "8.0"),
    v("consistent with", "matching another finding", "nhất quán với", "The bar figures are consistent with the pie.", "7.5"),
  ],
};

// ---------------------------------------------------------------------------
// TASK 2 - CONTENT PACKS
// ---------------------------------------------------------------------------

const T2_OPINION: Pack = {
  examples: [
    ex(
      "Prompt - technology and children",
      "Đề - công nghệ và trẻ em",
      "Prompt: 'Some people believe that children should not be allowed to use smartphones before the age of 12. To what extent do you agree or disagree?'\n\nThesis: This essay strongly agrees that pre-teens should be kept away from smartphones, primarily because of the risk to their developing attention spans and their vulnerability to online harm.",
      "Thesis = clear position + 2 reasons that will become Body 1 and Body 2.",
    ),
    ex(
      "Model introduction - Band 8",
      "Mở bài mẫu - Band 8",
      "The role of smartphones in early childhood is a topic of intense debate. While a minority argue that early exposure helps children develop digital literacy, I firmly believe that unrestricted access before the age of twelve does more harm than good, for two main reasons: shorter attention spans and heightened safety risks.",
      "3 moves: hook + acknowledge other side + strong thesis with signposts.",
    ),
    ex(
      "Body 1 topic sentence + PEEL support",
      "Câu chủ đề Body 1 + hỗ trợ PEEL",
      "The first and most compelling reason is the well-documented impact of screen time on attention. A 2019 Cambridge study found that children who used smartphones for more than three hours a day scored 15% lower on sustained-focus tasks than their peers. This suggests that early, intensive screen use rewires young brains in ways that traditional play does not.",
      "Point → Evidence (real study or figure) → Explain (mechanism) → Link back to thesis.",
    ),
  ],
  vocab: [
    v("firmly believe", "to hold a strong opinion", "tin chắc rằng", "I firmly believe education should be free.", "7.5"),
    v("do more harm than good", "to cause more damage than benefit", "hại nhiều hơn lợi", "Banning technology entirely does more harm than good.", "7.5"),
    v("compelling reason", "a very strong reason", "lý do thuyết phục", "There is a compelling reason to regulate AI.", "8.0"),
    v("well-documented", "supported by many published sources", "có nhiều tài liệu chứng minh", "The link is well-documented in medical journals.", "8.0"),
    v("heightened", "increased, especially in intensity", "gia tăng, dâng cao", "There is a heightened risk of injury.", "8.0"),
    v("vulnerability", "the state of being easily harmed", "sự dễ tổn thương", "Children's vulnerability online is well known.", "7.5"),
    v("unrestricted access", "the ability to use without limits", "quyền truy cập không giới hạn", "Unrestricted access to gambling sites is dangerous.", "7.5"),
    v("intense debate", "strong disagreement between two sides", "cuộc tranh luận sôi nổi", "The policy has sparked intense debate.", "7.5"),
    v("outweigh", "to be more important than", "vượt trội hơn", "The benefits outweigh the drawbacks.", "7.5"),
    v("a minority argue", "a small group say", "một số ít cho rằng", "A minority argue for the opposite view.", "7.5"),
  ],
};

const T2_AGREE_DISAGREE: Pack = {
  examples: [
    ex(
      "Prompt - single-use plastics",
      "Đề - đồ nhựa dùng một lần",
      "Prompt: 'Governments should completely ban single-use plastics. To what extent do you agree or disagree?'\n\nThesis (partial agreement): While I agree that stricter regulation is urgently needed, an outright ban would be impractical; a phased approach targeting the worst products is a more realistic solution.",
      "Partial agreement is a strong Band 7+ move if you EXPLAIN which part you accept and which you reject.",
    ),
    ex(
      "Body paragraph - concession + strong stance",
      "Đoạn thân - nhượng bộ + lập trường mạnh",
      "Admittedly, plastic pollution is a genuine crisis: over eight million tonnes end up in the oceans each year. However, a total ban ignores the fact that some medical and food-safety uses have no viable substitute; a targeted ban on plastic bags and straws, combined with a tax on other items, would achieve most of the environmental benefit without disrupting essential services.",
      "Concession first sentence, refutation with SPECIFIC alternatives - Band 8 signature move.",
    ),
    ex(
      "Prompt - university free education",
      "Đề - miễn học phí đại học",
      "Prompt: 'University education should be free for all students.' Thesis (disagree): This essay disagrees, since free tuition would place an unsustainable burden on taxpayers and would not, on its own, improve equality of access.",
      "Disagree essays must attack the assumption behind the prompt, not just say 'no'.",
    ),
  ],
  vocab: [
    v("outright ban", "a complete, immediate prohibition", "lệnh cấm hoàn toàn", "An outright ban on smoking indoors was introduced.", "7.5"),
    v("phased approach", "a change introduced in stages", "cách tiếp cận theo giai đoạn", "The government prefers a phased approach.", "8.0"),
    v("admittedly", "used to accept part of the other view", "phải thừa nhận rằng", "Admittedly, the plan has some drawbacks.", "7.5"),
    v("no viable substitute", "no realistic alternative exists", "không có thay thế khả thi", "There is no viable substitute for antibiotics.", "8.0"),
    v("unsustainable burden", "a load too heavy to keep up long-term", "gánh nặng không bền vững", "It would place an unsustainable burden on hospitals.", "8.0"),
    v("equality of access", "everyone having the same opportunity", "bình đẳng trong tiếp cận", "Free public transport promotes equality of access.", "7.5"),
    v("targeted", "aimed at a specific group or issue", "có trọng điểm", "A targeted subsidy is more efficient.", "7.5"),
    v("proponents argue", "supporters say", "những người ủng hộ cho rằng", "Proponents argue that the tax is progressive.", "7.5"),
    v("far-reaching", "having a wide effect", "sâu rộng", "The policy will have far-reaching consequences.", "7.5"),
    v("counterproductive", "producing the opposite result", "phản tác dụng", "A total ban could be counterproductive.", "8.0"),
  ],
};

const T2_DISCUSSION: Pack = {
  examples: [
    ex(
      "Prompt - urban vs rural living",
      "Đề - sống ở thành thị vs nông thôn",
      "Prompt: 'Some people prefer to live in cities, while others prefer the countryside. Discuss both views and give your own opinion.'\n\nThesis: This essay will examine the career advantages of urban life and the wellbeing benefits of the countryside, before arguing that rural living is preferable for those with young families.",
      "Discussion essays MUST signal both views + your own stance in the thesis.",
    ),
    ex(
      "Body 1 - view A fairly presented",
      "Body 1 - trình bày view A khách quan",
      "Those who favour city living often cite the abundance of career opportunities. Metropolises like London or Ho Chi Minh City host the headquarters of major firms and offer higher starting salaries, meaning that ambitious professionals can climb the career ladder far faster than their rural counterparts.",
      "Present the other view fairly and specifically before switching sides in Body 2.",
    ),
    ex(
      "Body 2 opening + own opinion",
      "Body 2 mở đầu + quan điểm cá nhân",
      "On the other hand, and in my view more importantly, the countryside offers a quality of life that dense urban centres struggle to match. Cleaner air, safer streets and access to nature translate directly into better physical and mental health outcomes, particularly for children.",
      "'On the other hand, and in my view more importantly' cleanly pivots to your own opinion.",
    ),
  ],
  vocab: [
    v("proponents", "supporters of an idea", "những người ủng hộ", "Proponents of remote work cite flexibility.", "7.5"),
    v("critics counter that", "opponents reply that", "phản biện lại rằng", "Critics counter that the plan is too costly.", "8.0"),
    v("on the other hand", "used to introduce the opposing view", "mặt khác", "On the other hand, city life has clear downsides.", "6.5"),
    v("in my view more importantly", "signals a shift to your opinion", "theo tôi, quan trọng hơn là", "In my view, more importantly, health matters.", "7.5"),
    v("quality of life", "how good daily life is", "chất lượng cuộc sống", "The countryside offers a higher quality of life.", "7.0"),
    v("cite", "to give as a reason", "viện dẫn", "They cite the low crime rate as a key benefit.", "7.5"),
    v("climb the career ladder", "to move upwards professionally", "leo lên nấc thang sự nghiệp", "Big cities let you climb the career ladder fast.", "7.5"),
    v("counterpart", "the equivalent person elsewhere", "người tương ứng", "Their rural counterparts earn 25% less.", "8.0"),
    v("struggle to match", "to have difficulty equalling", "khó theo kịp", "Suburbs struggle to match urban wages.", "7.5"),
    v("translate directly into", "leads immediately to", "chuyển hoá trực tiếp thành", "Cleaner air translates directly into fewer illnesses.", "8.0"),
  ],
};

const T2_PROBLEM_SOLUTION: Pack = {
  examples: [
    ex(
      "Prompt - urban traffic congestion",
      "Đề - kẹt xe đô thị",
      "Prompt: 'Traffic congestion is becoming a serious problem in many cities. What are the main causes, and what solutions can you suggest?'\n\nBody 1 (cause): The single largest cause is unchecked private car ownership. As disposable incomes have risen in cities like Hanoi and Jakarta, the number of cars on the road has more than doubled in a decade, while road capacity has barely changed.",
      "Body 1 = one deeply-analysed cause with a real example. Two shallow causes is a Band 6 move.",
    ),
    ex(
      "Body 2 - solution with agent + mechanism",
      "Body 2 - giải pháp có chủ thể + cơ chế hoạt động",
      "The most effective solution is congestion pricing enforced by city governments. Under such a scheme, drivers pay a fee to enter the city centre during peak hours, as demonstrated by London's zone which cut traffic by 30% in its first year. The revenue can then be reinvested in public transport, creating a virtuous circle.",
      "A Band 8 solution names WHO acts, HOW, and cites a REAL city that proves it works.",
    ),
    ex(
      "Prompt - youth unemployment",
      "Đề - thất nghiệp ở thanh niên",
      "Prompt: 'Youth unemployment is rising in many countries. What are the causes and possible solutions?' Cause: a growing mismatch between graduate skills and employer needs. Solution: partnerships between universities and industry to redesign curricula around real workplace tasks.",
      "Match each solution back to the cause you named - avoid unrelated 'the government should…' fixes.",
    ),
  ],
  vocab: [
    v("unchecked", "not controlled or limited", "không được kiểm soát", "Unchecked emissions have warmed the planet.", "7.5"),
    v("compound the problem", "to make an existing issue worse", "làm vấn đề thêm nghiêm trọng", "Poor planning compounds the housing crisis.", "8.0"),
    v("root cause", "the deepest reason for a problem", "nguyên nhân gốc rễ", "Poverty is often the root cause of crime.", "7.5"),
    v("congestion pricing", "charging drivers to enter busy zones", "thu phí chống ùn tắc", "Congestion pricing has reduced traffic in London.", "8.0"),
    v("virtuous circle", "a chain of positive effects", "vòng tuần hoàn tích cực", "Reinvesting profits creates a virtuous circle.", "8.0"),
    v("mismatch", "a situation where two things do not match", "sự lệch pha", "There is a mismatch between skills and jobs.", "7.5"),
    v("scheme", "an organised government or company plan", "chương trình, cơ chế", "The scheme has been extended for another year.", "7.0"),
    v("enforce", "to make sure a rule is obeyed", "thực thi", "The police enforce the parking rules strictly.", "7.5"),
    v("reinvest", "to put profits back into a system", "tái đầu tư", "Toll revenue can be reinvested in cycling lanes.", "7.5"),
    v("tackle", "to try hard to deal with a problem", "giải quyết", "The city is tackling air pollution head-on.", "7.0"),
  ],
};

const T2_DOUBLE_QUESTION: Pack = {
  examples: [
    ex(
      "Prompt - screen-time in schools",
      "Đề - thời lượng dùng thiết bị ở trường",
      "Prompt: 'Many schools are replacing textbooks with tablets. Why is this happening, and is it a positive or negative development?'\n\nStructure: Body 1 = answer WHY, Body 2 = your evaluation.",
      "Two-question essays get ONE body paragraph per question. Do not merge.",
    ),
    ex(
      "Body 1 - WHY paragraph",
      "Body 1 - đoạn WHY",
      "Schools have moved to tablets primarily to cut costs and to prepare pupils for a digital workplace. A single device can replace dozens of textbooks over its lifetime, saving typical secondary schools thousands of pounds a year, while daily use of educational software builds the digital literacy that most future jobs will demand.",
      "Two solid reasons beat five shallow ones - each with WHY it matters.",
    ),
    ex(
      "Body 2 - EVALUATION paragraph",
      "Body 2 - đoạn ĐÁNH GIÁ",
      "On balance, I regard this shift as a broadly positive development, provided it is carefully managed. When paired with clear screen-time limits and teacher training, tablets enable interactive learning experiences that a printed textbook simply cannot offer, from real-time quizzes to multimedia simulations.",
      "'On balance… provided that…' is a Band 8 evaluation phrase that avoids sounding one-sided.",
    ),
  ],
  vocab: [
    v("on balance", "considering all the arguments", "cân nhắc tổng thể", "On balance, the policy is a step forward.", "8.0"),
    v("broadly positive", "mostly good, with reservations", "về cơ bản là tích cực", "The reform is broadly positive.", "8.0"),
    v("provided that", "on the condition that", "với điều kiện là", "It works, provided that training is offered.", "7.5"),
    v("digital literacy", "the ability to use digital tools well", "năng lực số", "Digital literacy is a core 21st-century skill.", "7.5"),
    v("interactive learning", "lessons where students actively engage", "học tương tác", "Tablets enable interactive learning.", "7.0"),
    v("prepare pupils for", "get students ready for", "chuẩn bị cho học sinh", "The programme prepares pupils for the workplace.", "7.0"),
    v("carefully managed", "run with proper oversight", "được quản lý cẩn trọng", "Screen time must be carefully managed.", "7.0"),
    v("dozens of", "many; a large number of", "hàng chục", "One device can replace dozens of books.", "6.5"),
    v("real-time", "happening immediately", "theo thời gian thực", "Real-time feedback speeds up learning.", "7.5"),
    v("primarily", "mainly", "chủ yếu là", "This is primarily a cost-saving move.", "7.0"),
  ],
};

const T2_ADV_DIS: Pack = {
  examples: [
    ex(
      "Prompt - working from home",
      "Đề - làm việc từ xa",
      "Prompt: 'More and more employees are working from home. Do the advantages outweigh the disadvantages?'\n\nThesis: Although remote work brings clear productivity and lifestyle gains, its disadvantages - particularly weaker team cohesion and blurred work-life boundaries - are considerable but manageable, so on balance the benefits outweigh the drawbacks.",
      "State YOUR answer to 'do the advantages outweigh' in the thesis - not in the conclusion.",
    ),
    ex(
      "Body 1 - two developed advantages",
      "Body 1 - hai lợi thế được triển khai",
      "The most significant advantage is the elimination of the daily commute, which saves the average urban employee two hours a day - time that can be reinvested in family or exercise. Secondly, remote work widens the talent pool for employers, since they are no longer limited to candidates within commuting distance of the office.",
      "Two developed advantages > four shallow ones.",
    ),
    ex(
      "Body 2 - conceded disadvantage",
      "Body 2 - nhược điểm đã được thừa nhận",
      "That said, remote work is not without cost. Team cohesion suffers when colleagues rarely meet face-to-face, and junior staff in particular miss out on the informal mentoring that happens in shared offices. Yet these issues can largely be offset by regular in-person team days.",
      "Advantages-disadvantages essays reward you for OFFSETTING the downsides in the same paragraph.",
    ),
  ],
  vocab: [
    v("outweigh", "to be more important than", "vượt trội hơn", "The benefits clearly outweigh the risks.", "7.5"),
    v("considerable", "large in size or amount", "đáng kể", "The savings are considerable.", "7.0"),
    v("manageable", "possible to deal with", "có thể kiểm soát được", "The drawbacks are manageable.", "7.0"),
    v("blurred", "unclear because of overlap", "mờ nhòe, không rõ ràng", "The line between work and home is blurred.", "7.5"),
    v("widen the talent pool", "to attract more candidates", "mở rộng nguồn nhân lực", "Remote work widens the talent pool.", "8.0"),
    v("commuting distance", "close enough to travel to work daily", "khoảng cách đi làm được", "Candidates within commuting distance are preferred.", "7.5"),
    v("offset", "to balance out", "bù trừ", "Regular meetings offset the isolation.", "7.5"),
    v("team cohesion", "how well a team sticks together", "tính gắn kết của đội nhóm", "Team cohesion suffers when meetings are online.", "7.5"),
    v("not without cost", "having some drawbacks", "cũng có cái giá của nó", "The scheme is not without cost.", "8.0"),
    v("in-person", "with people physically present", "trực tiếp, mặt đối mặt", "In-person team days improve morale.", "7.0"),
  ],
};

const T2_COHESION: Pack = {
  examples: [
    ex(
      "Reference words upgrade",
      "Nâng cấp bằng từ tham chiếu",
      "Bad: 'Governments should invest in renewable energy. Renewable energy will reduce pollution. Renewable energy will also create jobs.'\nGood: 'Governments should invest in renewable energy. Such policies will not only reduce pollution but also create the jobs of the future.'",
      "Replace repeated nouns with 'such X', 'this policy', 'these measures'.",
    ),
    ex(
      "Substitution",
      "Thay thế",
      "'Some cities have banned diesel cars, and others are considering doing so.' Here 'others' substitutes for 'cities' and 'doing so' substitutes for 'banning diesel cars'.",
      "Substitution avoids ugly repetition while sounding natural.",
    ),
    ex(
      "Linker rotation across an essay",
      "Xoay vòng linker trong toàn bài",
      "Body 1 opener: 'The first and most compelling reason is…' Body 2 opener: 'Equally important, however, is…' Never open two body paragraphs with the same linker.",
      "Rotating openers alone lifts Coherence by half a band.",
    ),
  ],
  vocab: [
    v("such measures", "reference to the policies just mentioned", "những biện pháp như vậy", "Such measures have proven effective abroad.", "7.5"),
    v("the former / the latter", "the first / the second of two things mentioned", "cái trước / cái sau", "Of nuclear and solar, the latter is safer.", "8.0"),
    v("as noted above", "referring back to an earlier point", "như đã nêu ở trên", "As noted above, the trend is accelerating.", "7.5"),
    v("this in turn", "as a direct result of that", "và điều này lại", "This in turn creates new jobs.", "7.5"),
    v("do so", "verb substitute for the previous action", "làm như vậy", "Others are considering doing so.", "7.5"),
    v("one", "noun substitute for a previously named item", "cái, chiếc (thay thế)", "A cheaper one would suit the same purpose.", "7.0"),
    v("equally important", "used to introduce a parallel reason", "cũng quan trọng không kém", "Equally important is the cost factor.", "7.5"),
    v("by the same token", "for the same reason", "cũng theo lý đó", "By the same token, wages should rise.", "8.0"),
    v("this being said", "having said that", "dù vậy", "This being said, there are exceptions.", "8.0"),
    v("in essence", "fundamentally", "về bản chất", "In essence, the two policies are similar.", "8.0"),
  ],
};

const T2_PARAGRAPH: Pack = {
  examples: [
    ex(
      "Full 3-Layer Paragraph",
      "Đoạn văn 3 lớp đầy đủ",
      "IDEA: Affordable public transport is the single most effective tool to reduce urban air pollution.\nEVIDENCE: When Helsinki expanded its tram network in 2017, the city centre saw a 22% drop in NO₂ within three years.\nEXPLAIN: This happened because commuters switched away from private cars, cutting exhaust emissions at their source.\nECHO: Cheap, reliable trams therefore do more for air quality than any emission-standard law.",
      "Idea (1 sentence) → Evidence (real city + figure) → Explain (mechanism) → Echo (link back).",
    ),
    ex(
      "Weak vs strong topic sentence",
      "Câu chủ đề yếu vs mạnh",
      "Weak: 'Cars have advantages and disadvantages.'\nStrong: 'Private cars deliver unmatched personal convenience, yet impose significant hidden costs on cities.'",
      "Strong topic sentences pack a POSITION + 2 nouns you can develop.",
    ),
    ex(
      "PEEL vs PEEEL demonstration",
      "Minh hoạ PEEL vs PEEEL",
      "PEEL adds one Example. PEEEL adds a second Example ('For instance in Copenhagen…, and similarly in Amsterdam…') and lifts you from Band 6.5 to 7.5 in Task Response.",
      "For high-band essays, always include a SECOND concrete example in each body.",
    ),
  ],
  vocab: [
    v("unmatched", "so good that nothing equals it", "không gì sánh bằng", "Cars offer unmatched personal freedom.", "8.0"),
    v("hidden costs", "expenses that are not obvious", "chi phí ẩn", "Cars impose hidden costs on cities.", "7.5"),
    v("at their source", "at the origin of the problem", "tại nguồn phát sinh", "The plan tackles emissions at their source.", "7.5"),
    v("a case in point", "a clear example of what was said", "một ví dụ điển hình", "Helsinki is a case in point.", "8.0"),
    v("for instance", "for example", "chẳng hạn như", "For instance, Copenhagen halved car use.", "6.5"),
    v("mechanism", "the way something works", "cơ chế vận hành", "The mechanism behind this is simple.", "7.5"),
    v("directly attributable to", "clearly caused by", "trực tiếp do", "The drop is directly attributable to the ban.", "8.0"),
    v("commuters", "people who travel to work regularly", "người đi làm hằng ngày", "Most commuters switched to buses.", "7.0"),
    v("switch away from", "to stop using in favour of another", "chuyển bỏ khỏi", "Buyers switched away from diesel.", "7.5"),
    v("reliable", "consistent and trustworthy", "đáng tin cậy", "The service must be reliable to succeed.", "6.5"),
  ],
};

const T2_INTRO_CONCLUSION: Pack = {
  examples: [
    ex(
      "Formulaic vs natural introduction",
      "Mở bài công thức vs tự nhiên",
      "Formulaic (Band 6): 'Nowadays, the world is developing very fast. Some people think X, others think Y. In my opinion…'\nNatural (Band 8): 'The rapid expansion of AI has forced governments to rethink how they regulate the tech sector. While some argue for a hands-off approach, I believe firm oversight is essential to protect consumers.'",
      "Ditch 'Nowadays'. Open with a SPECIFIC context sentence.",
    ),
    ex(
      "Two-sentence conclusion template",
      "Mẫu kết bài 2 câu",
      "Sentence 1: 'To sum up, remote work has become a lasting feature of modern employment because it improves productivity and widens the talent pool.'\nSentence 2: 'Going forward, employers who invest in strong virtual culture will hold a lasting competitive edge.'",
      "S1 = restate + 2 reasons. S2 = forward-looking prediction/recommendation. No new evidence.",
    ),
    ex(
      "What NOT to do in a conclusion",
      "Điều KHÔNG nên làm trong kết bài",
      "Do NOT: introduce a new example, start with 'I think', repeat the introduction word for word, or exceed 3 sentences.",
      "Conclusion errors are the fastest way to drop from Band 7 to 6 on Coherence.",
    ),
  ],
  vocab: [
    v("to sum up", "used to introduce the conclusion", "tóm lại", "To sum up, education should remain free.", "7.0"),
    v("going forward", "in the future", "trong thời gian tới", "Going forward, policy must adapt.", "7.5"),
    v("lasting", "continuing for a long time", "lâu dài", "Remote work is a lasting change.", "7.0"),
    v("competitive edge", "an advantage over rivals", "lợi thế cạnh tranh", "Innovation gives firms a competitive edge.", "8.0"),
    v("rethink", "to consider again in a new way", "suy nghĩ lại", "Governments must rethink taxation.", "7.5"),
    v("hands-off", "not involved or interfering", "không can thiệp", "A hands-off approach rarely works here.", "7.5"),
    v("oversight", "official supervision", "sự giám sát", "Firm oversight protects consumers.", "8.0"),
    v("rapid expansion", "very fast growth", "sự mở rộng nhanh chóng", "The rapid expansion of AI is undeniable.", "7.5"),
    v("in essence", "in the most important respect", "về bản chất", "In essence, the two proposals are similar.", "8.0"),
    v("in the long run", "over a long period of time", "về lâu dài", "In the long run, prevention is cheaper.", "7.0"),
  ],
};

const T2_LEXICAL: Pack = {
  examples: [
    ex(
      "Basic → Band 7+ paraphrase bank",
      "Ngân hàng paraphrase từ cơ bản → Band 7+",
      "big problem → pressing issue • good → highly beneficial • bad → detrimental • many people → a substantial proportion • important → crucial / pivotal • help → alleviate / facilitate • use → utilise / harness",
      "Master 20 core upgrades and rotate them - never repeat the same word twice in a paragraph.",
    ),
    ex(
      "Collocation over single word",
      "Ưu tiên collocation thay vì từ đơn",
      "Weak: 'Pollution is a big problem.'\nStrong: 'Air pollution has emerged as a pressing public-health concern in most Asian megacities.'",
      "'Pressing concern' + specificity ('Asian megacities') = Band 7.5+ Lexical Resource.",
    ),
    ex(
      "Nominalisation for academic tone",
      "Danh từ hoá cho giọng học thuật",
      "Verbal (Band 6): 'When governments regulate industry, pollution drops.'\nNominalised (Band 8): 'Government regulation of industry leads to a reduction in pollution.'",
      "Turning verbs into nouns compresses ideas and sounds far more academic.",
    ),
  ],
  vocab: [
    v("pressing", "urgent and demanding attention", "cấp bách", "Climate change is a pressing concern.", "7.5"),
    v("detrimental", "causing harm", "có hại", "Screen time can be detrimental to sleep.", "7.5"),
    v("substantial", "large in size or amount", "đáng kể, lớn", "A substantial proportion of citizens agree.", "7.5"),
    v("pivotal", "of central importance", "then chốt", "Education plays a pivotal role in growth.", "8.0"),
    v("alleviate", "to make less severe", "giảm nhẹ", "Aid can alleviate short-term hunger.", "8.0"),
    v("harness", "to control and use for a purpose", "khai thác, tận dụng", "We must harness renewable energy.", "8.0"),
    v("utilise", "to use for a practical purpose", "sử dụng, tận dụng", "Schools can utilise AI tutors.", "7.5"),
    v("emerging", "newly appearing", "mới nổi", "AI is an emerging area of concern.", "7.5"),
    v("far-reaching", "having wide effects", "sâu rộng", "The reform has far-reaching consequences.", "7.5"),
    v("mitigate", "to reduce the seriousness of", "giảm thiểu", "Vaccines mitigate the risk of illness.", "8.0"),
  ],
};

const T2_GRAMMAR: Pack = {
  examples: [
    ex(
      "Inversion for emphasis",
      "Đảo ngữ để nhấn mạnh",
      "Standard: 'The government has never faced a bigger challenge.'\nInverted (Band 8): 'Never has the government faced a bigger challenge than climate change.'",
      "Use inversion sparingly - once per essay is powerful, twice looks forced.",
    ),
    ex(
      "Mixed conditional for regret / consequence",
      "Câu điều kiện hỗn hợp - tiếc / hậu quả",
      "'If governments had acted on climate warnings in the 1990s, we would not be facing this crisis today.' (past condition + present consequence)",
      "Mixed conditionals show sophisticated GRA range - perfect for problem essays.",
    ),
    ex(
      "Cleft sentence for focus",
      "Cấu trúc chẻ để nhấn ý",
      "Standard: 'Schools should teach digital literacy.'\nCleft: 'What schools must urgently teach is digital literacy, not another year of algebra.'",
      "Cleft sentences shine a spotlight on the exact idea you want the examiner to notice.",
    ),
  ],
  vocab: [
    v("not only… but also", "used to add a second, equally strong point", "không chỉ… mà còn", "Not only does it save money, but it also creates jobs.", "7.5"),
    v("were it not for", "if it were not for; formal", "nếu không có", "Were it not for public transport, cities would grind to a halt.", "8.0"),
    v("had it been done", "if it had been done", "nếu điều đó đã được thực hiện", "Had it been done sooner, lives would have been saved.", "8.0"),
    v("what is more", "moreover", "hơn thế nữa", "What is more, the plan is cost-effective.", "7.5"),
    v("thereby", "and as a direct result", "qua đó", "The tax discouraged smoking, thereby lowering cancer rates.", "8.0"),
    v("in doing so", "as a result of that action", "khi làm như vậy", "In doing so, the city cut emissions by 20%.", "8.0"),
    v("no sooner… than", "immediately after", "vừa mới… đã", "No sooner had the ban taken effect than traffic dropped.", "8.0"),
    v("under no circumstances", "never; in no situation", "trong bất kỳ hoàn cảnh nào cũng không", "Under no circumstances should safety be compromised.", "8.0"),
    v("provided that", "on the condition that", "với điều kiện là", "The plan works, provided that funding continues.", "7.5"),
    v("granted that", "although", "dẫu rằng, thừa nhận rằng", "Granted that costs are high, the benefits justify them.", "8.0"),
  ],
};

const T2_TASK_ANALYSIS: Pack = {
  examples: [
    ex(
      "Identifying the question type",
      "Nhận diện dạng đề",
      "'To what extent do you agree?' = OPINION essay.\n'Discuss both views and give your opinion' = DISCUSSION essay.\n'Do the advantages outweigh?' = ADVANTAGES-DISADVANTAGES.\n'Why? What are the effects?' = TWO-QUESTION essay.\n'What are the causes and solutions?' = PROBLEM-SOLUTION.",
      "Misreading the task type is the #1 cause of Band 5 in Task 2.",
    ),
    ex(
      "Decoding keywords",
      "Giải mã từ khoá",
      "'Some people think university education should focus on preparing students for the workplace, rather than academic subjects.'\nKeywords: FOCUS ON (extent), WORKPLACE vs ACADEMIC (contrast), UNIVERSITY (scope).",
      "Underline SCOPE + TASK VERB + COMPARISON. Miss any of them and you lose Task Response points.",
    ),
    ex(
      "Restating without copying",
      "Diễn đạt lại đề mà không copy",
      "Original: 'Many people believe that traditional festivals are losing their importance in modern society.'\nRestated: 'It is often argued that long-standing cultural celebrations no longer hold the meaning they once did in today's world.'",
      "Rule: keep the IDEA, change 70%+ of the words. Never quote the prompt directly.",
    ),
  ],
  vocab: [
    v("to what extent", "how much you agree/disagree", "ở mức độ nào", "To what extent do you agree with this?", "7.0"),
    v("scope", "the range covered by the question", "phạm vi", "The scope is limited to teenagers.", "7.5"),
    v("focus on", "to give attention primarily to", "tập trung vào", "The prompt focuses on urban areas.", "7.0"),
    v("long-standing", "existing for a long time", "lâu đời", "It is a long-standing tradition.", "7.5"),
    v("it is often argued that", "some people say (used to open)", "người ta thường cho rằng", "It is often argued that AI will replace jobs.", "7.5"),
    v("no longer", "not any more", "không còn", "Textbooks are no longer the main resource.", "7.0"),
    v("decode", "to understand the deep meaning of", "giải mã", "You must decode the task before writing.", "7.5"),
    v("misread", "to interpret wrongly", "hiểu sai", "Do not misread the task type.", "7.5"),
    v("restate", "to express again in different words", "diễn đạt lại", "Restate the prompt using synonyms.", "7.5"),
    v("prompt", "the question you are asked to answer", "đề bài", "The prompt asks about two views.", "7.0"),
  ],
};

const T2_TRAPS: Pack = {
  examples: [
    ex(
      "Vietnamese-learner trap: overusing 'Nowadays'",
      "Bẫy học viên VN: lạm dụng 'Nowadays'",
      "Do NOT open with 'Nowadays, the world is developing very fast.' Examiners flag it as memorised. Replace with a topic-specific hook: 'The rapid growth of e-commerce has transformed how families in Vietnam buy everyday goods.'",
      "'Nowadays', 'In recent years', 'In the modern era' are ALL flagged as generic openers.",
    ),
    ex(
      "Trap: word-for-word translation from Vietnamese",
      "Bẫy: dịch nguyên từ tiếng Việt",
      "VN thought: 'Chính phủ cần quan tâm đến giáo dục.' Literal translation: 'The government needs to interest to education.' Natural: 'The government must prioritise education.'",
      "Always think of the ENGLISH collocation, not the Vietnamese word.",
    ),
    ex(
      "Trap: 'Firstly, Secondly, Thirdly, Lastly' in one essay",
      "Bẫy: dùng Firstly/Secondly/Thirdly/Lastly trong 1 bài",
      "Replace with rotation: 'The first and most compelling reason…', 'Equally important, however, is…', 'A further consideration is…', 'On top of this…'",
      "Coherence descriptor at Band 7 requires VARIETY of cohesive devices.",
    ),
    ex(
      "Trap: 100% agreement or 100% disagreement",
      "Bẫy: đồng ý hoặc phản đối 100%",
      "Bad: 'I completely agree' with no acknowledgement of the other side. Good: 'I largely agree, although I recognise…' - shows critical thinking.",
      "100% one-sided essays cap at Band 6.5 for Task Response.",
    ),
  ],
  vocab: [
    v("prioritise", "to treat as most important", "ưu tiên", "The government must prioritise healthcare.", "7.5"),
    v("recognise", "to accept the existence of", "công nhận, thừa nhận", "I recognise the counter-argument.", "7.0"),
    v("critical thinking", "reasoning that weighs multiple sides", "tư duy phản biện", "Universities teach critical thinking.", "7.5"),
    v("counter-argument", "an opposing point", "lập luận phản biện", "The counter-argument deserves attention.", "7.5"),
    v("largely", "mostly", "phần lớn", "I largely agree with the proposal.", "7.0"),
    v("acknowledge", "to accept the truth of", "thừa nhận", "I acknowledge that costs are high.", "7.5"),
    v("compelling", "very convincing", "thuyết phục", "There is a compelling case for reform.", "7.5"),
    v("consideration", "a factor to think about", "yếu tố cần cân nhắc", "Cost is another consideration.", "7.0"),
    v("on top of this", "in addition to this", "hơn nữa", "On top of this, safety improves.", "7.0"),
    v("memorised", "learnt by heart", "học thuộc lòng", "Examiners can spot memorised phrases.", "7.5"),
  ],
};

const T2_IDEAS_EXAMPLES: Pack = {
  examples: [
    ex(
      "Idea generation - the 5-lens method",
      "Sinh ý - phương pháp 5 lăng kính",
      "For any Task 2 topic, brainstorm through: (1) Economic, (2) Social, (3) Environmental, (4) Health, (5) Educational lenses. E.g. 'ban on private cars' → (1) car industry jobs, (2) social equity of transport, (3) emissions, (4) air-quality deaths, (5) walking-to-school habits.",
      "Pick the 2 lenses with the strongest evidence - one per body paragraph.",
    ),
    ex(
      "Specific over generic examples",
      "Ví dụ cụ thể thay vì chung chung",
      "Generic (Band 6): 'Many studies show smoking is bad.'\nSpecific (Band 8): 'A 2018 WHO report found that indoor smoking bans in Ireland cut hospital admissions for heart attacks by 26% within a year.'",
      "Real name + year + figure = a Band 8 example.",
    ),
    ex(
      "Personal + hypothetical examples",
      "Ví dụ cá nhân + giả định",
      "Personal: 'In my hometown of Da Nang, the new metro line has cut my daily commute in half.' Hypothetical: 'Imagine, for instance, a rural school with no internet access - such a school cannot benefit from any digital-first curriculum.'",
      "Both types are accepted - the key is that they are RELEVANT and DEVELOPED.",
    ),
  ],
  vocab: [
    v("brainstorm", "to think of many ideas quickly", "động não", "Brainstorm before you outline.", "7.0"),
    v("lens", "a way of viewing an issue", "lăng kính, góc nhìn", "Look at the issue through an economic lens.", "8.0"),
    v("social equity", "fair treatment across social groups", "công bằng xã hội", "The reform improves social equity.", "8.0"),
    v("air-quality", "the level of pollution in the air", "chất lượng không khí", "Air-quality standards were tightened.", "7.5"),
    v("hospital admission", "when a patient is taken into hospital", "ca nhập viện", "Hospital admissions dropped sharply.", "7.5"),
    v("hypothetical", "imagined, not real", "giả định", "Consider a hypothetical rural school.", "7.5"),
    v("relevant", "closely connected to the topic", "liên quan trực tiếp", "Make sure examples are relevant.", "6.5"),
    v("developed", "expanded with detail and reasoning", "được triển khai", "A developed example beats three shallow ones.", "7.0"),
    v("indoor smoking ban", "law against smoking in enclosed spaces", "lệnh cấm hút thuốc trong nhà", "The indoor smoking ban improved health.", "7.5"),
    v("cut in half", "reduced by 50%", "giảm một nửa", "The metro cut my commute in half.", "7.0"),
  ],
};

// Generic fallback pack for any writing lecture that doesn't match a topic
const WRITING_GENERIC: Pack = {
  examples: [
    ex(
      "Practice with a real Cambridge prompt",
      "Luyện với đề Cambridge thật",
      "Take a past-paper prompt, spend 5 minutes outlining ONLY (no drafting), then compare your outline with a Band 8 sample. The comparison reveals structure gaps far faster than writing a full essay.",
      "Outlining is where 60% of Band improvement happens.",
    ),
    ex(
      "Timed 30-minute Task 2 drill",
      "Bài viết Task 2 trong 30 phút",
      "Write a full 250-word Task 2 essay under exam conditions. Immediately underline: 3 linkers, 3 Band 7+ collocations, 2 complex sentences. If any category is empty, that is your priority for the next week.",
      "Self-diagnosis by category is more useful than a raw band score.",
    ),
    ex(
      "The 3-colour edit",
      "Sửa bài bằng 3 màu",
      "Print your draft. RED = grammar errors. BLUE = weak vocabulary to upgrade. GREEN = missing linkers. Rewrite once, respecting the three fixes only.",
      "Isolating one criterion at a time forces deliberate improvement.",
    ),
  ],
  vocab: [
    v("outline", "a short plan of the main ideas", "dàn ý", "Spend 5 minutes on an outline.", "6.5"),
    v("draft", "an early version of a piece of writing", "bản nháp", "Never submit your first draft.", "6.5"),
    v("collocation", "a natural word combination", "cụm từ đi liền", "'Make progress' is a common collocation.", "7.0"),
    v("complex sentence", "a sentence with a main + subordinate clause", "câu phức", "Aim for 3-4 complex sentences per essay.", "7.0"),
    v("under exam conditions", "with real test time pressure", "trong điều kiện thi thật", "Always practise under exam conditions.", "7.5"),
    v("self-diagnose", "to identify your own weaknesses", "tự chẩn đoán", "Self-diagnose after every draft.", "7.5"),
    v("deliberate practice", "focused, targeted practice", "luyện tập có chủ đích", "Deliberate practice beats hours of writing.", "8.0"),
    v("upgrade", "to replace with a stronger version", "nâng cấp", "Upgrade 'big' to 'substantial'.", "7.0"),
    v("criterion", "one of the four IELTS marking bands", "tiêu chí chấm điểm", "Target one criterion per week.", "7.5"),
    v("band descriptor", "official IELTS scoring rules", "mô tả band chi tiết", "Read the band descriptors carefully.", "7.5"),
  ],
};

// ---------------------------------------------------------------------------
// Topic router
// ---------------------------------------------------------------------------
type TopicKey =
  | "t1-overview" | "t1-trends" | "t1-bar-pie" | "t1-table" | "t1-process"
  | "t1-map" | "t1-letter" | "t1-mixed"
  | "t2-opinion" | "t2-agree-disagree" | "t2-discussion" | "t2-problem-solution"
  | "t2-double-question" | "t2-adv-dis" | "t2-cohesion" | "t2-paragraph"
  | "t2-intro-conclusion" | "t2-lexical" | "t2-grammar" | "t2-task-analysis"
  | "t2-traps" | "t2-ideas-examples" | "generic";

function detectTopic(id: string): TopicKey {
  const s = id.toLowerCase();
  if (/(letter|complaint|thank-you|job-application|semi-formal|informal|formal)/.test(s)) return "t1-letter";
  if (/(overview)/.test(s)) return "t1-overview";
  if (/(trend|line-chart|line-graph|dynamic-vs-static|time-expressions|tense-and-time|units-and-numbers|storytelling-numbers|trend-vocabulary|comparison-language|comparison-structures|comparison-table|paraphrasing-the-intro|reading-the-question)/.test(s)) return "t1-trends";
  if (/(bar|pie)/.test(s)) return "t1-bar-pie";
  if (/(table)/.test(s)) return "t1-table";
  if (/(process|describe-process|process-and-map)/.test(s)) return "t1-process";
  if (/(map)/.test(s)) return "t1-map";
  if (/(mixed-chart|multi-chart|multiple-charts|mixed-trends-language|mixed-overview|cohesion-without-firstly|band-7-pitfalls|grouping|data-grouping)/.test(s)) return "t1-mixed";

  if (/(opinion|to-what-extent)/.test(s)) return "t2-opinion";
  if (/(agree-disagree|agree|disagree|positive-negative)/.test(s)) return "t2-agree-disagree";
  if (/(discussion|both-views)/.test(s)) return "t2-discussion";
  if (/(problem-solution|causes-effects|problem|solution)/.test(s)) return "t2-problem-solution";
  if (/(two-part-question|double-question|mixed-question-types|question-types-map)/.test(s)) return "t2-double-question";
  if (/(advantages-disadvantages)/.test(s)) return "t2-adv-dis";
  if (/(cohesion|linker|cohesive|coherence)/.test(s)) return "t2-cohesion";
  if (/(paragraph|peel|3-layer|topic-sentences|supporting-examples)/.test(s)) return "t2-paragraph";
  if (/(introduction|conclusion|paraphrasing)/.test(s)) return "t2-intro-conclusion";
  if (/(lexical|vocabulary-upgrades|nominalisation|paraphras)/.test(s)) return "t2-lexical";
  if (/(grammar|band8|band-8|hypothetical-conditionals|counter-?argument|counterargument)/.test(s)) return "t2-grammar";
  if (/(understanding-the-task|thesis-statement)/.test(s)) return "t2-task-analysis";
  if (/(vn-learner|band-7-mistakes|traps)/.test(s)) return "t2-traps";
  if (/(idea-generation|examples-and-evidence)/.test(s)) return "t2-ideas-examples";
  return "generic";
}

const PACK_BY_TOPIC: Record<TopicKey, Pack> = {
  "t1-overview": T1_OVERVIEW, "t1-trends": T1_TRENDS, "t1-bar-pie": T1_BAR_PIE,
  "t1-table": T1_TABLE, "t1-process": T1_PROCESS, "t1-map": T1_MAP,
  "t1-letter": T1_LETTER, "t1-mixed": T1_MIXED,
  "t2-opinion": T2_OPINION, "t2-agree-disagree": T2_AGREE_DISAGREE,
  "t2-discussion": T2_DISCUSSION, "t2-problem-solution": T2_PROBLEM_SOLUTION,
  "t2-double-question": T2_DOUBLE_QUESTION, "t2-adv-dis": T2_ADV_DIS,
  "t2-cohesion": T2_COHESION, "t2-paragraph": T2_PARAGRAPH,
  "t2-intro-conclusion": T2_INTRO_CONCLUSION, "t2-lexical": T2_LEXICAL,
  "t2-grammar": T2_GRAMMAR, "t2-task-analysis": T2_TASK_ANALYSIS,
  "t2-traps": T2_TRAPS, "t2-ideas-examples": T2_IDEAS_EXAMPLES,
  "generic": WRITING_GENERIC,
};

function packForId(id: string): Pack {
  return PACK_BY_TOPIC[detectTopic(id)];
}

// ---------------------------------------------------------------------------
// THEORY PACKS (strategy steps + mistakes) — replaces generic mk() content
// ---------------------------------------------------------------------------
const step = (
  n: number, title: string, titleVi: string, description: string, descriptionVi: string, example?: string,
): StrategyStep => ({ step: n, title, titleVi, description, descriptionVi, ...(example ? { example } : {}) });

const mist = (mistake: string, mistakeVi: string, why: string, whyVi: string): MistakeToAvoid =>
  ({ mistake, mistakeVi, why, whyVi });

interface TheoryPack { strategySteps: StrategyStep[]; mistakesToAvoid: MistakeToAvoid[]; }

const THEORY: Record<TopicKey, TheoryPack> = {
  "t1-overview": {
    strategySteps: [
      step(1, "Read every axis, unit and time span first", "Đọc trục, đơn vị và mốc thời gian trước", "Note what is measured (%, millions, kg), the categories, and whether the data is a single year or a period. This shapes the tense of your overview.", "Ghi lại đơn vị (%, triệu, kg), các hạng mục và khoảng thời gian. Điều này quyết định thì trong overview."),
      step(2, "Group data by BEHAVIOUR, not order", "Nhóm dữ liệu theo HÀNH VI, không theo thứ tự", "Bundle items that rose together, fell together, or stayed flat. Ignore the visual order in the chart.", "Gộp các mục cùng tăng, cùng giảm hoặc đi ngang. Bỏ qua thứ tự hiển thị."),
      step(3, "Write TWO overview sentences with NO numbers", "Viết 2 câu overview KHÔNG dùng số", "Sentence 1 = headline trend across ALL data. Sentence 2 = the single biggest comparison or exception.", "Câu 1 = xu hướng chính cho TOÀN BỘ dữ liệu. Câu 2 = so sánh lớn nhất hoặc ngoại lệ."),
      step(4, "Place the overview RIGHT AFTER the introduction", "Đặt overview NGAY SAU mở bài", "Examiners look for it in paragraph 2. Signal it with 'Overall,' or 'It is clear that,'.", "Giám khảo tìm ở đoạn 2. Mở bằng 'Overall,' hoặc 'It is clear that,'."),
    ],
    mistakesToAvoid: [
      mist("Putting specific numbers in the overview", "Đưa số cụ thể vào overview", "The overview must summarise, not quote data. Numbers belong in the body paragraphs only.", "Overview để tổng quát, không trích số. Số liệu chỉ nên xuất hiện trong body."),
      mist("Describing every line/bar one by one", "Mô tả từng đường/cột một cách rời rạc", "Listing items individually shows no ability to group data — a Band 6 ceiling.", "Liệt kê rời rạc cho thấy không biết nhóm dữ liệu — trần Band 6."),
      mist("Skipping the overview entirely", "Bỏ hẳn phần overview", "No overview automatically caps Task Achievement at Band 5.", "Không có overview tự động giới hạn Task Achievement ở Band 5."),
    ],
  },
  "t1-trends": {
    strategySteps: [
      step(1, "Identify the trend TYPE for each line", "Xác định LOẠI xu hướng cho mỗi đường", "Label each line: steady rise, sharp fall, fluctuation, plateau, peak-then-drop. Write the label on the question paper.", "Gán nhãn từng đường: tăng đều, giảm mạnh, dao động, chững, đỉnh rồi giảm."),
      step(2, "Choose the trend verb + adverb pair", "Chọn cặp động từ + trạng từ", "Match verb to speed (soar/edge up), adverb to degree (sharply, marginally). Never repeat the same pair.", "Ghép động từ theo tốc độ (soar/edge up) và trạng từ theo mức độ (sharply, marginally)."),
      step(3, "Anchor with EXACT figures and dates", "Neo số liệu và mốc thời gian CHÍNH XÁC", "Every trend sentence needs the start value, end value and time frame — 'from X in 1990 to Y in 2020'.", "Mỗi câu trend cần giá trị đầu, cuối và mốc thời gian — 'from X in 1990 to Y in 2020'."),
      step(4, "Add ONE comparison sentence per paragraph", "Thêm 1 câu so sánh mỗi đoạn", "Compare two lines with 'while', 'whereas', 'in contrast', 'twice as', 'narrowed the gap to'.", "So sánh 2 đường bằng 'while', 'whereas', 'twice as', 'narrowed the gap to'."),
    ],
    mistakesToAvoid: [
      mist("Repeating 'increase' and 'decrease' throughout", "Lặp 'increase' và 'decrease' khắp bài", "Lexical Resource drops to Band 5-6 with no verb variety.", "Lexical Resource rớt còn 5-6 nếu động từ không đa dạng."),
      mist("Using future tense for historical data", "Dùng thì tương lai cho dữ liệu quá khứ", "Grammar band drops instantly — use past simple / present perfect only.", "Điểm ngữ pháp rớt ngay — chỉ dùng quá khứ đơn / hiện tại hoàn thành."),
      mist("Writing 'up' and 'down' instead of trend verbs", "Dùng 'up' và 'down' thay vì động từ trend", "'Up' and 'down' are informal fillers with no academic value.", "'Up' và 'down' là từ đệm không mang giá trị học thuật."),
    ],
  },
  "t1-bar-pie": {
    strategySteps: [
      step(1, "Read the axis or legend labels carefully", "Đọc kỹ trục và chú giải", "Note whether values are % of total, absolute numbers, or per capita — the answer changes the language.", "Xác định giá trị là % tổng, số tuyệt đối hay bình quân — sẽ đổi cách viết."),
      step(2, "Pair up categories with SIMILAR behaviour", "Ghép các hạng mục có HÀNH VI giống nhau", "Group cities/countries that follow the same pattern into one sentence rather than listing separately.", "Nhóm các thành phố/quốc gia cùng xu hướng vào một câu."),
      step(3, "Use fraction and ratio language for pies", "Dùng ngôn ngữ phân số/tỷ lệ cho pie", "'A third', 'roughly half', 'six times as much', 'accounts for 70%' — always include ONE ratio per pie paragraph.", "'A third', 'roughly half', 'six times as much', 'accounts for 70%'."),
      step(4, "End with the outlier or the dominant slice", "Kết bằng ngoại lệ hoặc phần lớn nhất", "Highlight what makes the chart special: the largest, smallest, or category that behaves oppositely.", "Nhấn phần lớn nhất, nhỏ nhất hoặc ngược xu hướng."),
    ],
    mistakesToAvoid: [
      mist("Adding percentages that don't sum to 100 in a pie", "Cộng phần trăm không bằng 100 khi mô tả pie", "Rounding errors give inaccurate data reporting — Task Achievement drops.", "Sai số làm chệch dữ liệu — mất điểm Task Achievement."),
      mist("Describing bars in the order they appear", "Mô tả cột theo đúng thứ tự hiển thị", "Order-based description shows no grouping ability. Regroup by size or by behaviour.", "Mô tả theo thứ tự cho thấy không biết nhóm — hãy nhóm theo kích thước hoặc hành vi."),
      mist("Confusing 'percent' with 'percentage point'", "Nhầm 'percent' với 'percentage point'", "A rise from 10% to 15% is 5 percentage points, not 5%. Examiners notice this.", "Tăng từ 10% lên 15% là 5 điểm phần trăm, không phải 5%."),
    ],
  },
  "t1-table": {
    strategySteps: [
      step(1, "Scan for the 3 extremes only", "Chỉ quét 3 giá trị cực đoan", "Highest, lowest and biggest change. Circle those 3 cells and IGNORE the rest.", "Cao nhất, thấp nhất và thay đổi lớn nhất. Khoanh 3 ô và bỏ qua phần còn lại."),
      step(2, "Use the row/column headers as your paragraph plan", "Dùng tiêu đề hàng/cột làm dàn ý", "Body 1 = one row or column. Body 2 = the contrast row/column.", "Body 1 = một hàng/cột. Body 2 = hàng/cột đối lập."),
      step(3, "Include a proportional comparison", "Đưa vào so sánh theo tỷ lệ", "'Nearly double', 'more than treble', 'roughly one quarter' — one per body paragraph.", "'Gần gấp đôi', 'hơn gấp ba', 'khoảng một phần tư' — mỗi body 1 lần."),
      step(4, "Verify units before you commit a figure", "Kiểm tra đơn vị trước khi viết số", "Thousands vs millions is the #1 careless error in tables.", "Nhầm nghìn với triệu là lỗi bất cẩn phổ biến nhất."),
    ],
    mistakesToAvoid: [
      mist("Trying to describe every cell", "Cố mô tả mọi ô", "Selective reporting is the official IELTS instruction. Reporting all cells kills coherence.", "IELTS yêu cầu chọn lọc — mô tả tất cả sẽ mất coherence."),
      mist("Ignoring the year/time header", "Bỏ qua tiêu đề năm/thời gian", "Missing the time frame means wrong tense throughout — Grammar drops a full band.", "Bỏ qua thời gian dẫn đến sai thì toàn bài — Grammar rớt 1 band."),
      mist("Copying numbers straight from the table", "Copy nguyên số từ bảng", "Round large numbers ('roughly 2.4 million') to sound more natural.", "Làm tròn số lớn ('khoảng 2,4 triệu') cho tự nhiên hơn."),
    ],
  },
  "t1-process": {
    strategySteps: [
      step(1, "Count the stages and note branch points", "Đếm số bước và các điểm rẽ nhánh", "Number every stage on the diagram. Note if two paths merge or split.", "Đánh số mọi bước. Ghi rõ chỗ hai luồng nhập/tách."),
      step(2, "Switch to the passive voice throughout", "Chuyển hoàn toàn sang câu bị động", "Task 1 processes use passive: 'the beans are washed', 'the mixture is heated'.", "Task 1 process dùng bị động: 'the beans are washed', 'the mixture is heated'."),
      step(3, "Sequence with signposts: begins → then → finally", "Dùng dấu chỉ dẫn: begins → then → finally", "Rotate 'first', 'once', 'subsequently', 'after which', 'in the final stage'.", "Xoay 'first', 'once', 'subsequently', 'after which', 'in the final stage'."),
      step(4, "Close with the output and (if cyclic) the loop", "Kết bằng thành phẩm hoặc quay lại đầu chu trình", "'…the finished product is packed for delivery' or 'completing the cycle'.", "'…the finished product is packed for delivery' hoặc 'completing the cycle'."),
    ],
    mistakesToAvoid: [
      mist("Adding personal opinion or reasons", "Thêm ý kiến cá nhân hoặc lý do", "Task 1 is descriptive only. Any 'because I think' language loses Task Achievement.", "Task 1 chỉ mô tả — thêm 'because I think' mất điểm."),
      mist("Using active voice with generic 'they/people'", "Dùng chủ động với 'they/people' chung chung", "'They pour the mixture' is Band 5. Passive is the standard.", "'They pour the mixture' là Band 5. Bị động là chuẩn."),
      mist("Skipping the overview of total stages", "Bỏ qua overview về tổng số bước", "'The process consists of X main stages, beginning with… and ending with…' is mandatory.", "'The process consists of X main stages…' là bắt buộc."),
    ],
  },
  "t1-map": {
    strategySteps: [
      step(1, "Orient using compass directions", "Định hướng bằng phương hướng la bàn", "Mark N/S/E/W on the map. Anchor every change with a direction.", "Ghi N/S/E/W lên bản đồ. Mỗi thay đổi neo theo phương hướng."),
      step(2, "Group changes by TYPE, not location", "Nhóm thay đổi theo LOẠI, không theo vị trí", "Body 1 = removals/demolitions. Body 2 = additions/expansions.", "Body 1 = xoá/phá bỏ. Body 2 = thêm mới/mở rộng."),
      step(3, "Choose the right tense per timeline", "Chọn thì đúng theo mốc thời gian", "Past → present perfect passive ('has been demolished'). Future plan → 'will be built' / 'is set to'.", "Past → hiện tại hoàn thành bị động. Kế hoạch → 'will be built' / 'is set to'."),
      step(4, "End the overview with FUNCTION change", "Kết overview bằng sự thay đổi CHỨC NĂNG", "Say what the area became overall (industrial → residential, empty → commercial).", "Nêu khu vực đã đổi công năng gì (công nghiệp → dân cư)."),
    ],
    mistakesToAvoid: [
      mist("Naming every building one by one", "Gọi tên từng công trình", "Building-by-building narration kills coherence. Group by change type.", "Kể từng công trình sẽ mất coherence — nhóm theo loại thay đổi."),
      mist("Mixing past and future maps in one paragraph", "Trộn bản đồ quá khứ và tương lai vào 1 đoạn", "Tenses collide and Grammar drops. Body 1 = past changes, Body 2 = planned changes.", "Thì bị lẫn — Body 1 quá khứ, Body 2 kế hoạch."),
      mist("Using 'here', 'there', 'this place'", "Dùng 'here', 'there', 'this place'", "Vague location words replace exact directions and lose marks.", "Từ chỉ vị trí mơ hồ thay cho phương hướng cụ thể sẽ mất điểm."),
    ],
  },
  "t1-letter": {
    strategySteps: [
      step(1, "Identify the tone: formal / semi-formal / informal", "Xác định giọng: trang trọng / bán trang trọng / thân mật", "Read the prompt for 'friend' (informal), 'manager' (semi-formal), 'company' (formal).", "Đọc đề tìm 'friend' (thân mật), 'manager' (bán trang trọng), 'company' (trang trọng)."),
      step(2, "Cover all 3 bullet points as separate paragraphs", "Trả lời 3 gạch đầu dòng thành 3 đoạn", "One paragraph per bullet keeps Task Achievement intact.", "Mỗi bullet 1 đoạn giữ trọn Task Achievement."),
      step(3, "Match opening AND closing to the tone", "Chọn mở-kết đồng bộ với giọng", "Formal → Dear Sir/Yours faithfully. Named → Dear Ms X/Yours sincerely. Informal → Hi/Best wishes.", "Trang trọng → Dear Sir/Yours faithfully. Có tên → Dear Ms X/Yours sincerely. Thân mật → Hi/Best."),
      step(4, "Hit 170-190 words with polite functional phrases", "Viết 170-190 từ với cụm chức năng lịch sự", "'I am writing to…', 'I would appreciate it if…', 'Please let me know…'", "'I am writing to…', 'I would appreciate it if…', 'Please let me know…'"),
    ],
    mistakesToAvoid: [
      mist("Mixing formal and informal in one letter", "Trộn trang trọng và thân mật trong 1 thư", "'Dear Sir, Hey what's up' collapses tone consistency — Task Response drops.", "'Dear Sir, Hey what's up' phá nhất quán giọng — Task Response rớt."),
      mist("Missing one of the three bullet points", "Bỏ 1 trong 3 gạch đầu dòng", "Missing a bullet automatically caps Task Achievement at Band 5.", "Bỏ 1 bullet giới hạn Task Achievement ở Band 5."),
      mist("Using contractions in a formal letter", "Dùng viết tắt trong thư trang trọng", "'I'm', 'don't', 'can't' break formal register instantly.", "'I'm', 'don't', 'can't' phá register trang trọng."),
    ],
  },
  "t1-mixed": {
    strategySteps: [
      step(1, "Identify each chart's role", "Xác định vai trò từng biểu đồ", "Which chart shows the trend, which shows the breakdown? Label each before writing.", "Biểu đồ nào cho trend, biểu đồ nào cho tỷ lệ? Ghi nhãn trước khi viết."),
      step(2, "Write ONE joint overview covering both", "Viết 1 overview chung cho cả hai", "Use 'while', 'accompanied by', 'reflected in' to link the two data sources.", "Dùng 'while', 'accompanied by', 'reflected in' để nối hai nguồn."),
      step(3, "Anchor each body in one chart, supported by the other", "Mỗi body chính từ 1 biểu đồ, hỗ trợ từ biểu đồ còn lại", "Body 1 = chart A + 1 supporting fact from B. Body 2 = chart B + 1 supporting fact from A.", "Body 1 = chart A + 1 dữ kiện từ B. Body 2 = ngược lại."),
      step(4, "Cross-reference at least twice", "Đối chiếu chéo ít nhất 2 lần", "'This is mirrored by…', 'A similar pattern appears in…' — Band 7.5+ move.", "'This is mirrored by…', 'A similar pattern appears in…' — nước đi Band 7.5+."),
    ],
    mistakesToAvoid: [
      mist("Writing 'The bar chart shows… The pie chart shows…'", "Viết 'The bar chart shows… The pie chart shows…'", "Two isolated descriptions kill cohesion. Always LINK the two charts.", "Hai mô tả tách rời phá cohesion — luôn LIÊN KẾT hai biểu đồ."),
      mist("Comparing incompatible units", "So sánh hai đơn vị không tương thích", "Comparing dollars in one chart to percentages in the other confuses the reader.", "So sánh đô-la với phần trăm gây khó hiểu."),
      mist("Overloading the overview with numbers from both charts", "Nhồi số của cả 2 biểu đồ vào overview", "Overview stays big-picture — numbers only appear in body paragraphs.", "Overview giữ tổng quan — số chỉ đưa vào body."),
    ],
  },
  "t2-opinion": {
    strategySteps: [
      step(1, "Decode: what is the exact opinion asked?", "Giải mã: đề hỏi quan điểm gì?", "'To what extent…?' = degree scale. 'Do you agree…?' = for/against. State YOUR position immediately.", "'To what extent…?' = mức độ. 'Do you agree…?' = tán thành/phản đối."),
      step(2, "Commit to a clear stance in the thesis", "Chốt lập trường rõ trong thesis", "'I firmly agree', 'I largely agree', 'I disagree' + 2 reasons that become Body 1 and Body 2.", "'I firmly agree', 'I largely agree', 'I disagree' + 2 lý do làm Body 1, Body 2."),
      step(3, "Build each body around ONE deep reason", "Mỗi body triển khai 1 lý do sâu", "Point → Explain → Example (real study/city/figure) → Link back to thesis (PEEL).", "Point → Explain → Example (nghiên cứu/thành phố/số thật) → Link về thesis."),
      step(4, "Restate the position with fresh wording in the conclusion", "Diễn đạt lại lập trường bằng từ mới trong kết bài", "Do not copy the thesis. Use synonyms and one forward-looking sentence.", "Không copy thesis — dùng từ đồng nghĩa và 1 câu hướng tương lai."),
    ],
    mistakesToAvoid: [
      mist("Sitting on the fence", "Không chọn phe rõ ràng", "'It has good and bad sides' with no personal stance caps Task Response at Band 5.", "'Có mặt tốt mặt xấu' không có quan điểm cá nhân giới hạn Task Response ở Band 5."),
      mist("Changing opinion between body and conclusion", "Đổi quan điểm giữa body và kết bài", "Inconsistent stance destroys Task Response — commit to ONE position from thesis to conclusion.", "Quan điểm mâu thuẫn phá Task Response — giữ 1 lập trường từ đầu đến cuối."),
      mist("Listing reasons without developing any", "Liệt kê nhiều lý do mà không triển khai", "Two deep reasons beat five shallow ones — always.", "Hai lý do sâu luôn tốt hơn năm lý do hời hợt."),
    ],
  },
  "t2-agree-disagree": {
    strategySteps: [
      step(1, "Choose full, partial, or opposite agreement", "Chọn đồng ý hoàn toàn / một phần / phản đối", "Partial agreement ('I agree with X but reject Y') is the strongest Band 7+ move.", "Đồng ý một phần ('agree with X but reject Y') là nước đi Band 7+ mạnh nhất."),
      step(2, "State position + scope in the thesis", "Nêu lập trường + phạm vi trong thesis", "'I strongly agree that A, but partly disagree about B, because…'", "'I strongly agree that A, but partly disagree about B, because…'"),
      step(3, "Concede fairly, then refute with specifics", "Thừa nhận phía đối lập, rồi phản biện có dẫn chứng", "'Admittedly, X has some merit… However, this ignores…' — Band 8 signature.", "'Admittedly, X has some merit… However, this ignores…' — dấu ấn Band 8."),
      step(4, "Close with a nuanced restatement", "Kết bằng câu diễn đạt lại tinh tế", "Reinforce the split ('agree on principle, disagree on scope') and add a forward-looking line.", "Củng cố sự phân biệt (đồng ý nguyên tắc, không đồng ý về mức độ)."),
    ],
    mistakesToAvoid: [
      mist("Blind 100% agreement or disagreement", "Đồng ý/phản đối 100% mù quáng", "One-sided essays cap Task Response at 6.5. Show critical thinking.", "Bài một chiều giới hạn Task Response ở 6.5 — cần tư duy phản biện."),
      mist("Confusing 'agree/disagree' with 'discuss both views'", "Nhầm 'agree/disagree' với 'discuss both views'", "Discussion essays require both views AND your opinion — different structure.", "Discussion cần cả hai quan điểm CỘNG quan điểm cá nhân — khác cấu trúc."),
      mist("Using 'I 100% agree' or 'It's 100% wrong'", "Dùng 'I 100% agree' hoặc 'It's 100% wrong'", "Extreme language sounds unacademic. Use 'largely', 'to a significant extent'.", "Ngôn ngữ cực đoan thiếu học thuật — dùng 'largely', 'to a significant extent'."),
    ],
  },
  "t2-discussion": {
    strategySteps: [
      step(1, "Signal BOTH views + your opinion in the thesis", "Báo hiệu CẢ HAI quan điểm + ý kiến cá nhân trong thesis", "'This essay will examine both A and B, before arguing that B is preferable.'", "'Bài viết sẽ phân tích cả A và B, trước khi khẳng định B thuyết phục hơn.'"),
      step(2, "Present view A fairly and specifically in Body 1", "Trình bày view A khách quan trong Body 1", "Even if you disagree, describe view A with real examples — not a strawman.", "Dù không đồng tình, vẫn mô tả view A có ví dụ thật — không dựng người rơm."),
      step(3, "Pivot to Body 2 with 'On the other hand, and in my view'", "Chuyển sang Body 2 bằng 'On the other hand, and in my view'", "This phrase seamlessly weaves your own opinion into the second view.", "Cụm này lồng ý kiến cá nhân vào view thứ hai một cách mượt."),
      step(4, "Conclude by naming the winning view + why", "Kết bằng cách nêu view thắng + lý do", "'On balance, view B is more convincing because…' — no new evidence.", "'On balance, view B is more convincing because…' — không thêm bằng chứng mới."),
    ],
    mistakesToAvoid: [
      mist("Presenting only one view", "Chỉ trình bày một quan điểm", "Missing view A caps Task Response at Band 5 automatically.", "Thiếu view A tự giới hạn Task Response ở Band 5."),
      mist("Forgetting to give your own opinion", "Quên nêu quan điểm cá nhân", "'Discuss AND give your opinion' — the AND is mandatory. No opinion = Band 5.", "'Discuss AND give your opinion' — chữ AND là bắt buộc."),
      mist("Giving the opinion only in the conclusion", "Chỉ nêu quan điểm ở kết bài", "Opinion must appear in the thesis AND be developed inside Body 2.", "Quan điểm phải xuất hiện ở thesis VÀ được triển khai trong Body 2."),
    ],
  },
  "t2-problem-solution": {
    strategySteps: [
      step(1, "Distinguish CAUSES from EFFECTS from PROBLEMS", "Phân biệt CAUSE, EFFECT và PROBLEM", "Read the prompt twice — 'causes' asks why; 'problems' asks impact; 'effects' asks consequence.", "Đọc đề 2 lần — 'causes' hỏi vì sao; 'problems' hỏi hậu quả; 'effects' hỏi tác động."),
      step(2, "Pick ONE deep cause and ONE matching solution", "Chọn 1 nguyên nhân sâu + 1 giải pháp tương ứng", "Two shallow causes = Band 6. One analysed cause + one matched solution = Band 7+.", "Hai lý do nông = Band 6. Một lý do sâu + giải pháp khớp = Band 7+."),
      step(3, "Name the agent, mechanism and real example", "Nêu chủ thể, cơ chế và ví dụ thật", "Solutions must say WHO acts, HOW, and cite a REAL city/policy that proves it works.", "Giải pháp phải nêu AI làm, LÀM THẾ NÀO và ví dụ thành phố/chính sách thật."),
      step(4, "Match solution to cause explicitly", "Nối giải pháp với nguyên nhân rõ ràng", "'This addresses the earlier cause of X by…' — do not float unrelated fixes.", "'Giải pháp này xử lý nguyên nhân X bằng…' — không đưa giải pháp lạc."),
    ],
    mistakesToAvoid: [
      mist("Listing 'The government should…' with no mechanism", "Chỉ viết 'The government should…' không cơ chế", "Vague solutions with no how/who/where score Band 6 at most.", "Giải pháp mơ hồ không có cơ chế chỉ đạt Band 6."),
      mist("Naming problems that don't match the causes", "Nêu vấn đề không khớp nguyên nhân", "Task Response drops if the solution doesn't answer YOUR cause paragraph.", "Task Response rớt nếu giải pháp không đáp lại nguyên nhân đã nêu."),
      mist("Confusing symptoms with root causes", "Nhầm triệu chứng với nguyên nhân gốc", "'Traffic is bad because cars are slow' is a symptom, not a cause.", "'Kẹt xe vì xe chậm' là triệu chứng, không phải nguyên nhân."),
    ],
  },
  "t2-double-question": {
    strategySteps: [
      step(1, "Locate both questions in the prompt", "Xác định 2 câu hỏi trong đề", "Underline each question separately — often 'Why…?' + 'Is this positive/negative?'.", "Gạch chân từng câu hỏi — thường là 'Why…?' + 'Is this positive/negative?'."),
      step(2, "Answer BOTH in the thesis", "Trả lời CẢ HAI ngay trong thesis", "Two mini-answers, one for each question. Never delay one to the conclusion.", "Hai câu trả lời nhỏ, không hoãn câu nào tới kết bài."),
      step(3, "Give each question its own body paragraph", "Mỗi câu hỏi 1 body riêng", "Body 1 = question 1. Body 2 = question 2. Do not merge.", "Body 1 = câu 1. Body 2 = câu 2. Không trộn."),
      step(4, "Balance depth — do not favour one question", "Cân bằng độ sâu — không thiên vị 1 câu", "Two developed reasons per body. Equal word count keeps Task Response at 7+.", "Hai lý do triển khai mỗi body, độ dài cân bằng để Task Response ≥ 7."),
    ],
    mistakesToAvoid: [
      mist("Answering only one question", "Chỉ trả lời 1 câu hỏi", "Missing one question caps Task Response at Band 5 automatically.", "Bỏ 1 câu hỏi tự động giới hạn Task Response ở Band 5."),
      mist("Merging both questions into one big paragraph", "Trộn 2 câu hỏi vào 1 đoạn lớn", "Coherence collapses — examiners want clear paragraphing per question.", "Coherence sụp — giám khảo cần phân đoạn rõ theo từng câu."),
      mist("Making the second answer much shorter", "Trả lời câu 2 quá ngắn", "Imbalance signals you ran out of ideas — Task Response drops.", "Mất cân bằng cho thấy bí ý — Task Response rớt."),
    ],
  },
  "t2-adv-dis": {
    strategySteps: [
      step(1, "Decide: 'discuss both' or 'do advantages outweigh'?", "Xác định dạng: 'discuss both' hay 'outweigh'?", "'Outweigh' variants require YOUR verdict. 'Discuss' variants do not.", "Dạng 'outweigh' cần kết luận của bạn; dạng 'discuss' thì không."),
      step(2, "State your verdict in the thesis for outweigh essays", "Nêu kết luận trong thesis với dạng outweigh", "'On balance, the benefits clearly outweigh the drawbacks because…'", "'On balance, the benefits clearly outweigh the drawbacks because…'"),
      step(3, "Develop TWO advantages deeply, then offset ONE disadvantage", "Triển khai 2 lợi ích sâu, rồi bù trừ 1 nhược điểm", "Two developed pros > four shallow pros. Offset the con to strengthen your verdict.", "Hai lợi ích sâu > bốn lợi ích nông. Bù trừ nhược điểm để củng cố kết luận."),
      step(4, "Weigh both sides in the conclusion", "Cân đo cả hai bên trong kết bài", "'Although X, the greater impact of Y makes the change worthwhile.'", "'Although X, the greater impact of Y makes the change worthwhile.'"),
    ],
    mistakesToAvoid: [
      mist("Treating 'outweigh' like 'discuss both'", "Xử lý 'outweigh' giống 'discuss both'", "Skipping the verdict caps Task Response at Band 5.", "Bỏ kết luận giới hạn Task Response ở Band 5."),
      mist("Listing 2 pros vs 2 cons with no comparison", "Liệt kê 2 pros vs 2 cons không so sánh", "Lists without evaluation give a Band 6 ceiling.", "Danh sách không đánh giá giới hạn ở Band 6."),
      mist("Introducing a new advantage in the conclusion", "Đưa lợi ích mới vào kết bài", "New ideas in conclusions violate structure — Coherence drops.", "Ý mới trong kết bài phá cấu trúc — Coherence rớt."),
    ],
  },
  "t2-cohesion": {
    strategySteps: [
      step(1, "Rotate linkers — never repeat within one paragraph", "Xoay linker — không lặp trong 1 đoạn", "Body 1 opener ≠ Body 2 opener. 'The first…' → 'Equally important…' → 'A further…'.", "Mở Body 1 ≠ mở Body 2. 'The first…' → 'Equally important…' → 'A further…'."),
      step(2, "Prefer PRONOUN reference over linking words", "Ưu tiên đại từ tham chiếu hơn từ nối", "'This', 'these measures', 'the former' cohere invisibly and beat over-used 'Moreover'.", "'This', 'these measures', 'the former' cohesive tự nhiên hơn 'Moreover' bị lạm dụng."),
      step(3, "Cap linker density at max 4 sentence-openers per essay", "Giới hạn tối đa 4 linker ở đầu câu mỗi bài", "More than 4 signals memorised template — Coherence drops from 7 to 6.", "Quá 4 báo hiệu template học thuộc — Coherence rớt từ 7 xuống 6."),
      step(4, "Use SUBSTITUTION to avoid noun repetition", "Dùng THAY THẾ để tránh lặp danh từ", "'Some cities banned cars, and others are considering doing so.' 'Others' + 'doing so' replace long noun phrases.", "'Others' + 'doing so' thay cụm danh từ dài."),
    ],
    mistakesToAvoid: [
      mist("Starting every paragraph with 'Firstly / Secondly'", "Mở mọi đoạn bằng 'Firstly / Secondly'", "Template linkers cap Coherence at Band 6.", "Linker học thuộc giới hạn Coherence ở Band 6."),
      mist("Overusing 'Moreover' and 'Furthermore'", "Lạm dụng 'Moreover' và 'Furthermore'", "Repeating additive linkers signals limited range — Band 6.5 ceiling.", "Lặp linker cộng thêm cho thấy giới hạn — trần 6.5."),
      mist("Placing linkers mid-sentence without commas", "Đặt linker giữa câu không có dấu phẩy", "'The plan however failed' → punctuation error — Grammar drops.", "'The plan however failed' — sai dấu, mất điểm ngữ pháp."),
    ],
  },
  "t2-paragraph": {
    strategySteps: [
      step(1, "Open with a POSITION-taking topic sentence", "Mở đoạn bằng câu chủ đề có LẬP TRƯỜNG", "'Cars deliver unmatched convenience, yet impose hidden costs' — packs stance + 2 nouns to develop.", "'Cars deliver unmatched convenience, yet impose hidden costs' — có lập trường + 2 danh từ để triển khai."),
      step(2, "Follow with EXPLAIN — the mechanism", "Tiếp theo là EXPLAIN — cơ chế", "One sentence saying WHY the topic sentence is true.", "Một câu giải thích VÌ SAO topic sentence đúng."),
      step(3, "Anchor with EVIDENCE — a real city, study or figure", "Neo bằng EVIDENCE — thành phố, nghiên cứu, số thật", "'Helsinki cut NO₂ by 22% after tram expansion in 2017.' Real specifics beat vague claims.", "'Helsinki cut NO₂ by 22% after tram expansion in 2017.' Cụ thể hơn khẳng định mơ hồ."),
      step(4, "Close with ECHO — link back to the thesis", "Kết đoạn bằng ECHO — nối về thesis", "One sentence tying the evidence back to your overall position.", "Một câu buộc bằng chứng trở về lập trường chung."),
    ],
    mistakesToAvoid: [
      mist("Writing weak topic sentences ('X has good and bad sides')", "Câu chủ đề yếu ('X có mặt tốt và xấu')", "Neutral topic sentences show no position — Task Response drops.", "Câu chủ đề trung tính không có lập trường — Task Response rớt."),
      mist("Cramming two ideas into one body paragraph", "Nhồi 2 ý vào 1 body", "One idea per paragraph is a Band 7 rule. Split them.", "Một ý một đoạn là chuẩn Band 7 — tách ra."),
      mist("Skipping the ECHO / link-back sentence", "Bỏ câu ECHO / nối về thesis", "Without the link-back, cohesion between body and thesis breaks.", "Không có câu link-back, cohesion giữa body và thesis đứt gãy."),
    ],
  },
  "t2-intro-conclusion": {
    strategySteps: [
      step(1, "Ditch 'Nowadays' — open with a specific hook", "Bỏ 'Nowadays' — mở bằng hook cụ thể", "'The rapid expansion of AI has forced governments to rethink…' Topic-specific > generic.", "'The rapid expansion of AI has forced governments to rethink…' Cụ thể > chung chung."),
      step(2, "Paraphrase the prompt in ONE sentence", "Paraphrase đề trong 1 câu", "Change 70% of the words. Keep the idea, replace vocab and grammar structure.", "Đổi 70% từ vựng. Giữ ý, thay từ và cấu trúc."),
      step(3, "State thesis with 2 signposts to Body 1 & 2", "Nêu thesis với 2 dấu hiệu về Body 1 và 2", "'…for two reasons: A (Body 1) and B (Body 2).' The reader knows the roadmap instantly.", "'…for two reasons: A (Body 1) and B (Body 2).' Người đọc thấy bản đồ ngay."),
      step(4, "Write a 2-sentence conclusion: restate + forward-looking", "Viết kết bài 2 câu: nhắc lại + hướng tương lai", "Sentence 1 = 'To sum up' + paraphrased thesis. Sentence 2 = prediction or recommendation.", "Câu 1 = 'To sum up' + paraphrased thesis. Câu 2 = dự báo hoặc khuyến nghị."),
    ],
    mistakesToAvoid: [
      mist("Opening with 'Nowadays, the world is developing very fast'", "Mở bằng 'Nowadays, the world is developing very fast'", "Examiners flag this as memorised — Task Response caps at 6.", "Giám khảo đánh dấu học thuộc — Task Response bị chặn ở 6."),
      mist("Adding new evidence in the conclusion", "Thêm bằng chứng mới trong kết bài", "New examples in conclusions violate structure — Coherence drops.", "Ví dụ mới ở kết bài phá cấu trúc — Coherence rớt."),
      mist("Copying the prompt word-for-word in the introduction", "Copy nguyên đề vào mở bài", "Copied prompts do not count toward the word count and hurt Lexical Resource.", "Câu copy không được tính từ và làm mất điểm Lexical Resource."),
    ],
  },
  "t2-lexical": {
    strategySteps: [
      step(1, "Upgrade weak keywords first", "Nâng cấp các từ khoá yếu trước tiên", "big → substantial; good → highly beneficial; bad → detrimental; many → a considerable proportion.", "big → substantial; good → highly beneficial; bad → detrimental."),
      step(2, "Prefer collocations over single fancy words", "Ưu tiên collocation hơn từ đơn hoa mỹ", "'Pressing public-health concern' scores higher than a rare word misused.", "'Pressing public-health concern' cao điểm hơn từ hiếm dùng sai."),
      step(3, "Nominalise for academic tone", "Danh từ hoá cho giọng học thuật", "'When governments regulate industry…' → 'Government regulation of industry…'.", "'Khi chính phủ điều tiết…' → 'Government regulation…'"),
      step(4, "Rotate synonyms — never repeat within a paragraph", "Xoay từ đồng nghĩa — không lặp trong 1 đoạn", "Build a 3-word rotation for each key noun: 'children / minors / young people'.", "Xoay 3 từ cho mỗi danh từ chính: 'children / minors / young people'."),
    ],
    mistakesToAvoid: [
      mist("Thesaurus-swapping without checking collocation", "Đổi từ theo từ điển đồng nghĩa mà không kiểm tra collocation", "'Make a large hospital' instead of 'large-scale hospital' — Band 6 signal.", "'Make a large hospital' thay vì 'large-scale hospital' — dấu hiệu Band 6."),
      mist("Using rare words in the wrong register", "Dùng từ hiếm sai register", "One misused Band 9 word can drop Lexical Resource by a whole band.", "Một từ Band 9 dùng sai có thể tụt Lexical Resource cả 1 band."),
      mist("Repeating the prompt's main noun 6+ times", "Lặp danh từ chính của đề hơn 6 lần", "Lack of paraphrase = Band 6 ceiling on Lexical Resource.", "Thiếu paraphrase = trần Band 6 cho Lexical Resource."),
    ],
  },
  "t2-grammar": {
    strategySteps: [
      step(1, "Aim for 4 out of 5 target structures per essay", "Nhắm đạt 4/5 cấu trúc mục tiêu mỗi bài", "Complex sentence • Conditional • Passive • Relative clause • Modal of speculation.", "Câu phức • Điều kiện • Bị động • Mệnh đề quan hệ • Modal phỏng đoán."),
      step(2, "Deploy ONE conditional per essay (mixed if possible)", "Dùng 1 câu điều kiện (hỗn hợp nếu được)", "'If governments had acted earlier, we would not be facing this crisis today.'", "'If governments had acted earlier, we would not be facing this crisis today.'"),
      step(3, "Insert 2-3 relative clauses to add detail", "Thêm 2-3 mệnh đề quan hệ để bổ sung chi tiết", "'…the tram network, which was expanded in 2017, cut emissions by 22%.'", "'…the tram network, which was expanded in 2017, cut emissions by 22%.'"),
      step(4, "Use ONE advanced structure sparingly (inversion / cleft)", "Dùng 1 cấu trúc nâng cao có chừng mực", "'Never has the government faced a bigger challenge.' Once per essay — twice looks forced.", "'Never has the government faced a bigger challenge.' Một lần/bài — hai lần là gượng."),
    ],
    mistakesToAvoid: [
      mist("Only simple sentences throughout", "Chỉ dùng câu đơn suốt bài", "No complex sentences = Band 5-6 Grammar automatically.", "Không có câu phức = Grammar tự động Band 5-6."),
      mist("Forcing inversion in every paragraph", "Ép đảo ngữ mọi đoạn", "Overused advanced structures look memorised and drop Grammar.", "Lạm dụng cấu trúc nâng cao trông học thuộc và mất điểm."),
      mist("Punctuating complex sentences incorrectly", "Sai dấu câu phức", "Missing commas after subordinate clauses is Band 6 signal.", "Thiếu dấu phẩy sau mệnh đề phụ là dấu hiệu Band 6."),
    ],
  },
  "t2-task-analysis": {
    strategySteps: [
      step(1, "Identify the question TYPE first (Opinion, Discussion, etc.)", "Xác định DẠNG đề trước tiên", "Misreading the type is the #1 cause of Band 5 in Task 2.", "Đọc sai dạng là lý do #1 khiến rơi Band 5."),
      step(2, "Underline TASK VERB + SCOPE + COMPARISON", "Gạch chân ĐỘNG TỪ + PHẠM VI + SO SÁNH", "Miss any of the three and Task Response drops immediately.", "Bỏ 1 trong 3 sẽ mất điểm Task Response ngay."),
      step(3, "Restate the prompt — change 70%+ of the words", "Diễn đạt lại đề — đổi ≥ 70% từ", "'It is often argued that long-standing cultural celebrations no longer hold their meaning.'", "'It is often argued that long-standing cultural celebrations no longer hold their meaning.'"),
      step(4, "Turn the underlined keywords into your 2 thesis reasons", "Biến từ khoá đã gạch thành 2 lý do trong thesis", "Each keyword maps directly to a body paragraph.", "Mỗi từ khoá ánh xạ trực tiếp về một body."),
    ],
    mistakesToAvoid: [
      mist("Writing without identifying the question type", "Viết mà không xác định dạng đề", "Wrong structure = Band 5 no matter how good the vocabulary.", "Sai cấu trúc = Band 5 dù từ vựng có hay."),
      mist("Copying the prompt verbatim in the intro", "Copy nguyên đề trong mở bài", "Copied words are not counted; Lexical Resource suffers.", "Từ copy không được tính; Lexical Resource giảm."),
      mist("Ignoring qualifiers like 'to what extent' or 'main reasons'", "Bỏ qua từ hạn định 'to what extent', 'main reasons'", "Qualifiers change the required answer structure.", "Từ hạn định thay đổi cấu trúc trả lời."),
    ],
  },
  "t2-traps": {
    strategySteps: [
      step(1, "Ban template openers ('Nowadays', 'In recent years')", "Cấm mở bài mẫu ('Nowadays', 'In recent years')", "All are flagged as memorised. Open with a topic-specific hook instead.", "Đều bị đánh dấu học thuộc. Mở bằng hook cụ thể."),
      step(2, "Think in English collocations, not Vietnamese translations", "Tư duy bằng collocation tiếng Anh, không dịch từ tiếng Việt", "'quan tâm đến giáo dục' → 'prioritise education', not 'interest to education'.", "'quan tâm đến giáo dục' → 'prioritise education'."),
      step(3, "Rotate cohesive devices — cap 'Firstly/Secondly' at zero", "Xoay từ nối — 'Firstly/Secondly' = 0", "Use 'The first and most compelling reason', 'Equally important', 'A further consideration'.", "Dùng 'The first and most compelling reason', 'Equally important', 'A further consideration'."),
      step(4, "Show critical thinking — never 100% agreement", "Thể hiện tư duy phản biện — không đồng ý 100%", "Even in strong-opinion essays, one 'admittedly…' sentence lifts Task Response.", "Kể cả bài quan điểm mạnh, một câu 'admittedly…' cũng nâng Task Response."),
    ],
    mistakesToAvoid: [
      mist("Word-for-word translation from Vietnamese", "Dịch từng chữ từ tiếng Việt", "Produces unnatural collocations examiners flag immediately.", "Tạo collocation không tự nhiên bị giám khảo phát hiện ngay."),
      mist("Using memorised 'template' introductions", "Dùng mở bài mẫu học thuộc", "Templates cap Task Response at Band 6.", "Template giới hạn Task Response ở Band 6."),
      mist("Extreme absolute language ('100%', 'always', 'never')", "Ngôn ngữ tuyệt đối ('100%', 'always', 'never')", "Sounds simplistic and unacademic — Lexical Resource drops.", "Nghe đơn giản, thiếu học thuật — Lexical Resource rớt."),
    ],
  },
  "t2-ideas-examples": {
    strategySteps: [
      step(1, "Brainstorm through the 5-lens method", "Sinh ý theo phương pháp 5 lăng kính", "Economic • Social • Environmental • Health • Educational — pick the 2 strongest.", "Kinh tế • Xã hội • Môi trường • Sức khoẻ • Giáo dục — chọn 2 lăng kính mạnh nhất."),
      step(2, "Prefer real examples over hypotheticals", "Ưu tiên ví dụ thật hơn giả định", "Named country + year + figure = Band 8 example.", "Tên nước + năm + số = ví dụ Band 8."),
      step(3, "Develop each example — do not drop it in", "Triển khai ví dụ — đừng chỉ ném vào", "Add mechanism ('this happened because…') and result ('leading to…').", "Thêm cơ chế ('nhờ vì…') và kết quả ('dẫn đến…')."),
      step(4, "One example per body paragraph — no more", "Mỗi body 1 ví dụ — không hơn", "Multiple undeveloped examples score lower than one fully developed example.", "Nhiều ví dụ hời hợt điểm thấp hơn 1 ví dụ triển khai kỹ."),
    ],
    mistakesToAvoid: [
      mist("Generic 'many studies show'", "Chung chung 'many studies show'", "Fake or unnamed evidence is Band 6 max.", "Bằng chứng giả hoặc không nêu tên = trần Band 6."),
      mist("Dropping examples without linking to the point", "Ném ví dụ mà không nối về point", "Isolated examples hurt cohesion — always link back.", "Ví dụ tách rời phá cohesion — luôn nối về point."),
      mist("Inventing statistics with impossible precision", "Bịa số liệu quá chi tiết", "'97.4% of people said X' looks fabricated — round instead ('roughly a third').", "'97.4% of people said X' trông bịa — làm tròn thay ('khoảng một phần ba')."),
    ],
  },
  "generic": {
    strategySteps: [
      step(1, "Decode the task type and scope", "Giải mã dạng đề và phạm vi", "Underline the task verb, scope and any qualifiers ('to what extent', 'main').", "Gạch chân động từ, phạm vi và từ hạn định."),
      step(2, "Plan a 4-paragraph skeleton in 4 minutes", "Lập dàn ý 4 đoạn trong 4 phút", "Thesis + 2 topic sentences + 1 forward-looking conclusion line.", "Thesis + 2 câu chủ đề + 1 câu kết hướng tương lai."),
      step(3, "Write with academic register and PEEL bodies", "Viết bằng văn phong học thuật + body PEEL", "Point → Explain → Example → Link back. No contractions.", "Point → Explain → Example → Link back. Không viết tắt."),
      step(4, "Proofread the cheap-mark zones for 3 minutes", "Soát lỗi vùng dễ ăn điểm trong 3 phút", "Articles, plurals, subject-verb agreement, spelling of task keywords.", "Mạo từ, số nhiều, hoà hợp chủ-vị, chính tả từ khoá đề bài."),
    ],
    mistakesToAvoid: [
      mist("Writing without planning", "Viết mà không lập dàn ý", "Unplanned essays drift off-topic — Task Response drops.", "Bài không dàn ý sẽ lạc đề — Task Response rớt."),
      mist("Memorised phrases dropped without context", "Cụm học thuộc dùng không đúng ngữ cảnh", "Examiners detect templates and penalise Lexical Resource.", "Giám khảo nhận ra template và trừ điểm Lexical Resource."),
      mist("Ignoring the word limit (under 250 / over 320)", "Bỏ qua giới hạn từ (< 250 / > 320)", "Under-length essays are penalised; over-length invites more mistakes.", "Viết ngắn bị trừ; viết quá dài dễ sai."),
    ],
  },
};

// Signature strings from generic mk() factories across expansion4-10
const GENERIC_STRATEGY_TITLES = new Set([
  "Analyse the prompt carefully",
  "Diagnose the prompt",
  "Decode the question type in 60 seconds",
  "Understand the goal of this lesson",
  "Decode the task",
]);
const GENERIC_MISTAKE_MARKERS = [
  "Translating directly from Vietnamese",
  "Skipping the planning phase",
  "Writing without planning",
  "Memorised phrases used inappropriately",
];

function hasGenericStrategy(steps: StrategyStep[]): boolean {
  if (!steps || steps.length === 0) return true;
  const firstTitle = steps[0]?.title?.trim() || "";
  return GENERIC_STRATEGY_TITLES.has(firstTitle);
}

function hasGenericMistakes(mistakes: MistakeToAvoid[]): boolean {
  if (!mistakes || mistakes.length === 0) return true;
  const joined = mistakes.map(m => m.mistake).join(" | ");
  return GENERIC_MISTAKE_MARKERS.some(marker => joined.includes(marker));
}



// ---------------------------------------------------------------------------
// Public enricher
// ---------------------------------------------------------------------------
const TARGET_EXAMPLES = 3;
const TARGET_VOCAB = 10;

/**
 * Enriches a single lecture with lecture-specific writing content.
 * - Adds/replaces `practicalExamples` if the current set is empty or looks
 *   like the generic factory placeholder.
 * - Fills `vocabHighlights` up to 10 items from the topic pack.
 * Non-writing lectures are returned untouched.
 */
export function enrichWritingLecture(l: IeltsLecture): IeltsLecture {
  const isWriting = l.skill === "writing" || /^writing-/.test(l.id);
  if (!isWriting) return l;

  const topic = detectTopic(l.id);
  const pack = PACK_BY_TOPIC[topic];
  const theory = THEORY[topic];

  // Practical examples
  const current = l.practicalExamples || [];
  const looksGeneric =
    current.length <= 1 &&
    current.some(e =>
      /apply the framework on a past paper|time yourself on a real cambridge|apply this framework to a past ielts prompt|drill it on a real prompt/i.test(
        `${e.context || ""} ${e.example || ""}`,
      ),
    );

  let mergedExamples: Example[];
  if (current.length === 0 || looksGeneric) {
    mergedExamples = [...pack.examples];
  } else if (current.length < TARGET_EXAMPLES) {
    const existing = new Set(current.map(e => e.example));
    const extras = pack.examples.filter(e => !existing.has(e.example));
    mergedExamples = [...current, ...extras].slice(0, Math.max(TARGET_EXAMPLES, current.length));
  } else {
    mergedExamples = current;
  }

  // Vocab
  const currentVocab = l.vocabHighlights || [];
  let mergedVocab: VocabHighlight[];
  if (currentVocab.length === 0) {
    mergedVocab = [...pack.vocab];
  } else if (currentVocab.length < TARGET_VOCAB) {
    const seen = new Set(currentVocab.map(v => v.word.toLowerCase()));
    const extras = pack.vocab.filter(v => !seen.has(v.word.toLowerCase()));
    mergedVocab = [...currentVocab, ...extras].slice(0, TARGET_VOCAB);
  } else {
    mergedVocab = currentVocab;
  }

  // Theory: swap in topic-specific strategy steps + mistakes when the lecture
  // is still using the generic mk() factory content.
  const strategySteps = hasGenericStrategy(l.strategySteps) ? theory.strategySteps : l.strategySteps;
  const mistakesToAvoid = hasGenericMistakes(l.mistakesToAvoid) ? theory.mistakesToAvoid : l.mistakesToAvoid;

  return {
    ...l,
    strategySteps,
    mistakesToAvoid,
    practicalExamples: mergedExamples,
    vocabHighlights: mergedVocab,
  };
}


/** Enriches an entire lecture array in one call. */
export function enrichWritingLectures(list: IeltsLecture[]): IeltsLecture[] {
  return list.map(enrichWritingLecture);
}
