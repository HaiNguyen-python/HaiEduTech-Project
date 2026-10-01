/**
 * @file ieltsParaphraseToolkit.ts
 * @description Per-topic collocations, high-level phrases and structures (B2-C2)
 *   students can apply while paraphrasing. Keyed `task:topic`. No em-dashes.
 */
export type ToolKind = "collocation" | "phrase" | "structure";
export interface ToolItem { kind: ToolKind; en: string; vi: string; ex: string; level: "B2" | "C1" | "C2"; match?: string }

const c = (en: string, vi: string, ex: string, level: ToolItem["level"] = "B2"): ToolItem => ({ kind: "collocation", en, vi, ex, level });
const p = (en: string, vi: string, ex: string, level: ToolItem["level"] = "C1"): ToolItem => ({ kind: "phrase", en, vi, ex, level });
const s = (en: string, vi: string, ex: string, match: string, level: ToolItem["level"] = "C1"): ToolItem => ({ kind: "structure", en, vi, ex, level, match });

export const PARA_TOOLKIT: Record<string, ToolItem[]> = {
  "1:trends": [
    c("rise sharply", "tăng mạnh", "Car sales rose sharply after 2010."),
    c("a steady decline", "sự giảm đều", "There was a steady decline in oil use."),
    c("reach a peak", "đạt đỉnh", "Visitor numbers reached a peak in 2015."),
    c("level off", "chững lại", "The rate levelled off at 40%.", "C1"),
    p("over the period in question", "trong suốt giai đoạn được đề cập", "Prices doubled over the period in question."),
    p("witness a dramatic surge", "chứng kiến sự tăng vọt", "Internet use witnessed a dramatic surge.", "C2"),
    s("There was a(n) + adj + noun + in + N", "Có một sự ... về ...", "There was a significant increase in car ownership.", "there was a"),
    s("..., before + V-ing", "..., trước khi ...", "The figure peaked in 2015, before falling back.", "before"),
    s("N + saw/witnessed + N + V", "Giai đoạn ... chứng kiến ...", "The 1990s saw sales plummet.", "saw", "C2"),
  ],
  "1:comparisons": [
    c("considerably higher", "cao hơn đáng kể", "Spending was considerably higher in Japan."),
    c("a marked difference", "sự khác biệt rõ rệt", "There was a marked difference between the two cities.", "C1"),
    c("female counterparts", "nhóm nữ tương ứng", "Men earned more than their female counterparts.", "C1"),
    p("at the opposite end of the spectrum", "ở thái cực ngược lại", "India sat at the opposite end of the spectrum.", "C2"),
    p("by a narrow margin", "với cách biệt nhỏ", "Coffee led tea by a narrow margin."),
    s("..., whereas ...", "..., trong khi ...", "Japan was highest, whereas India was lowest.", "whereas", "B2"),
    s("twice as + adj + as", "gấp đôi ...", "Buses were twice as popular as trains.", "twice as", "B2"),
    s("N + dwarfed/exceeded that of N", "... vượt xa ... của ...", "City A's population far exceeded that of City B.", "that of", "C2"),
  ],
  "1:proportions": [
    c("the lion's share", "phần lớn nhất", "Rent took the lion's share of the budget.", "C1"),
    c("a small fraction", "một phần nhỏ", "Only a small fraction went on leisure."),
    c("account for", "chiếm", "Food accounted for 30% of spending."),
    p("roughly a quarter", "khoảng một phần tư", "Roughly a quarter of students cycled."),
    p("the vast majority", "đại đa số", "The vast majority of people used cars."),
    s("N + accounted for + %", "... chiếm ...%", "Transport accounted for 15% of the total.", "accounted for", "B2"),
    s("..., followed by + N", "..., tiếp theo là ...", "Coal was the main source, followed by gas.", "followed by"),
    s("It is noticeable that ...", "Đáng chú ý là ...", "It is noticeable that few people walked.", "it is noticeable"),
  ],
  "1:process": [
    c("the initial stage", "giai đoạn đầu", "In the initial stage, leaves are picked."),
    c("undergo treatment", "trải qua xử lý", "The water then undergoes treatment.", "C1"),
    c("the final product", "sản phẩm cuối", "The final product is packaged and shipped."),
    p("once this has been done", "sau khi hoàn tất bước này", "Once this has been done, the clay is fired.", "C1"),
    p("culminating in", "kết thúc bằng", "The process has six stages, culminating in delivery.", "C2"),
    s("N + is/are + V3 (passive)", "Câu bị động", "The beans are roasted at high heat.", "are", "B2"),
    s("Having been + V3, N + ...", "Sau khi được ..., ...", "Having been dried, the leaves are rolled.", "having been", "C2"),
    s("..., after which ...", "..., sau đó ...", "The mixture is heated, after which it is cooled.", "after which"),
  ],
  "1:map": [
    c("undergo significant changes", "trải qua thay đổi lớn", "The town underwent significant changes.", "C1"),
    c("residential area", "khu dân cư", "A residential area replaced the farmland."),
    c("be converted into", "được chuyển đổi thành", "The factory was converted into flats."),
    p("make way for", "nhường chỗ cho", "Trees were cut down to make way for a road.", "C1"),
    p("to the north of", "về phía bắc của", "A park was built to the north of the river."),
    s("N + was replaced by + N", "... được thay thế bởi ...", "The market was replaced by a mall.", "replaced by", "B2"),
    s("Where + N + once stood, ...", "Nơi từng có ..., ...", "Where a school once stood, there is now a car park.", "once stood", "C2"),
    s("N + saw the construction of + N", "... chứng kiến việc xây dựng ...", "The east side saw the construction of a hospital.", "construction of"),
  ],
  "1:overview": [
    c("the most striking feature", "đặc điểm nổi bật nhất", "The most striking feature is the rise in cars.", "C1"),
    c("an upward trend", "xu hướng đi lên"," Overall, there was an upward trend."),
    c("remain the dominant", "vẫn chiếm ưu thế", "Coal remained the dominant source."),
    p("it is clear that", "rõ ràng là", "It is clear that prices rose overall."),
    p("by far the most", "vượt xa nhất", "Cars were by far the most popular option."),
    s("Overall, it is evident that ...", "Nhìn chung, rõ ràng là ...", "Overall, it is evident that usage grew.", "it is evident"),
    s("While A ..., B ...", "Trong khi A ..., B ...", "While sales rose, profits fell.", "while", "B2"),
    s("What stands out is ...", "Điều nổi bật là ...", "What stands out is the sharp fall in 2010.", "what stands out", "C2"),
  ],
  "2:education": [
    c("academic performance", "kết quả học tập", "Homework can improve academic performance."),
    c("acquire practical skills", "tiếp thu kỹ năng thực tế", "Students should acquire practical skills."),
    c("a well-rounded education", "nền giáo dục toàn diện", "Art contributes to a well-rounded education.", "C1"),
    p("lifelong learning", "học tập suốt đời", "Universities should promote lifelong learning."),
    p("equip students with", "trang bị cho học sinh", "Schools must equip students with digital skills.", "C1"),
    s("It is widely argued that ...", "Nhiều người cho rằng ...", "It is widely argued that exams cause stress.", "it is widely argued"),
    s("Not only ... but also ...", "Không chỉ ... mà còn ...", "Reading not only builds vocabulary but also improves focus.", "not only", "B2"),
    s("Were + S + to V, ...", "Nếu ... (đảo ngữ)", "Were schools to cut fees, more children would enrol.", "were", "C2"),
  ],
  "2:environment": [
    c("carbon emissions", "khí thải carbon", "Cars produce high carbon emissions."),
    c("renewable energy", "năng lượng tái tạo", "Governments should invest in renewable energy."),
    c("pose a serious threat", "gây mối đe dọa nghiêm trọng", "Plastic poses a serious threat to marine life.", "C1"),
    p("tackle climate change", "giải quyết biến đổi khí hậu", "Individuals can help tackle climate change."),
    p("irreversible damage", "thiệt hại không thể đảo ngược", "Deforestation causes irreversible damage.", "C1"),
    s("Unless + clause, ...", "Trừ khi ..., ...", "Unless action is taken, temperatures will keep rising.", "unless", "B2"),
    s("Only by + V-ing + can + S + V", "Chỉ bằng cách ... mới ...", "Only by cutting emissions can we slow warming.", "only by", "C2"),
    s("The more ..., the more ...", "Càng ... càng ...", "The more we recycle, the less waste we create.", "the more"),
  ],
  "2:technology": [
    c("technological advances", "tiến bộ công nghệ", "Technological advances have changed work."),
    c("heavily reliant on", "phụ thuộc nặng vào", "Young people are heavily reliant on phones.", "C1"),
    c("social interaction", "tương tác xã hội", "Screens may reduce social interaction."),
    p("a double-edged sword", "con dao hai lưỡi", "Social media is a double-edged sword.", "C1"),
    p("at the touch of a button", "chỉ bằng một cú chạm", "Information is available at the touch of a button.", "C1"),
    s("While it is true that ..., ...", "Mặc dù đúng là ..., ...", "While it is true that AI saves time, it may cost jobs.", "while it is true"),
    s("N + has paved the way for + N", "... mở đường cho ...", "The internet has paved the way for online learning.", "paved the way"),
    s("So + adj + is + N + that ...", "Quá ... đến mức ... (đảo ngữ)", "So widespread is phone use that few people read books.", "so", "C2"),
  ],
  "2:work": [
    c("job satisfaction", "sự hài lòng trong công việc", "Flexible hours raise job satisfaction."),
    c("work-life balance", "cân bằng công việc - cuộc sống", "Remote work improves work-life balance."),
    c("career prospects", "triển vọng nghề nghiệp", "Training improves career prospects."),
    p("climb the career ladder", "thăng tiến sự nghiệp", "Many employees want to climb the career ladder.", "C1"),
    p("a high-pressure environment", "môi trường áp lực cao", "Doctors work in a high-pressure environment."),
    s("It is essential that S + V (bare)", "Điều cần thiết là ...", "It is essential that employers support staff.", "it is essential"),
    s("..., which in turn ...", "..., điều này đến lượt nó ...", "Stress lowers morale, which in turn reduces output.", "which in turn"),
    s("Should + S + V, ...", "Nếu ... (đảo ngữ)", "Should companies offer more leave, staff would stay longer.", "should", "C2"),
  ],
  "2:health": [
    c("a sedentary lifestyle", "lối sống ít vận động", "A sedentary lifestyle leads to obesity.", "C1"),
    c("a balanced diet", "chế độ ăn cân bằng", "Children need a balanced diet."),
    c("impose a tax on", "áp thuế lên", "The state could impose a tax on sugary drinks."),
    p("curb the consumption of", "hạn chế tiêu thụ", "Taxes may curb the consumption of junk food.", "C1"),
    p("place a burden on", "tạo gánh nặng cho", "Obesity places a burden on health services.", "C1"),
    s("It would be advisable for N + to V", "Sẽ là khôn ngoan nếu ...", "It would be advisable for governments to raise prices.", "advisable"),
    s("N + is likely to + V", "... có khả năng ...", "A sugar tax is likely to reduce intake.", "is likely to", "B2"),
    s("Were + N + to V, ...", "Nếu ... (đảo ngữ)", "Were sugary drinks to cost more, fewer would be sold.", "were", "C2"),
  ],
  "2:society": [
    c("social cohesion", "sự gắn kết xã hội", "Festivals strengthen social cohesion.", "C1"),
    c("the elderly population", "dân số cao tuổi", "The elderly population is growing fast."),
    c("widen the gap", "nới rộng khoảng cách", "Low wages widen the gap between rich and poor."),
    p("a sense of belonging", "cảm giác thuộc về", "Clubs give young people a sense of belonging."),
    p("from all walks of life", "từ mọi tầng lớp", "Volunteers come from all walks of life.", "C1"),
    s("There is a growing tendency for N + to V", "Ngày càng có xu hướng ...", "There is a growing tendency for people to live alone.", "growing tendency"),
    s("This is not to say that ...", "Điều này không có nghĩa là ...", "This is not to say that tradition is unimportant.", "not to say"),
    s("Little do + S + realise that ...", "Ít ai nhận ra rằng ... (đảo ngữ)", "Little do people realise how lonely the elderly are.", "little do", "C2"),
  ],
  "2:crime": [
    c("a deterrent to crime", "biện pháp răn đe tội phạm", "Harsh sentences act as a deterrent to crime.", "C1"),
    c("reoffend", "tái phạm", "Education helps prisoners not to reoffend."),
    c("juvenile delinquency", "tội phạm vị thành niên", "Poverty fuels juvenile delinquency.", "C1"),
    p("the root causes of", "nguyên nhân gốc rễ của", "We must address the root causes of crime."),
    p("be reintegrated into society", "tái hòa nhập xã hội", "Ex-offenders should be reintegrated into society.", "C1"),
    s("Rather than + V-ing, ...", "Thay vì ..., ...", "Rather than punishing, we should rehabilitate.", "rather than", "B2"),
    s("It is debatable whether ...", "Còn gây tranh cãi liệu ...", "It is debatable whether prison reduces crime.", "debatable"),
    s("Not until + clause + did/does + S + V", "Mãi đến khi ... mới ...", "Not until poverty falls will crime decline.", "not until", "C2"),
  ],
  "2:media": [
    c("mass media", "truyền thông đại chúng", "Mass media shapes public opinion."),
    c("shape public opinion", "định hình dư luận", "News outlets shape public opinion."),
    c("fake news", "tin giả", "Fake news spreads quickly online."),
    p("sensationalist reporting", "đưa tin giật gân", "Sensationalist reporting misleads readers.", "C1"),
    p("exert a strong influence on", "gây ảnh hưởng mạnh lên", "Advertising exerts a strong influence on children.", "C1"),
    s("It could be argued that ...", "Có thể lập luận rằng ...", "It could be argued that ads harm children.", "could be argued", "B2"),
    s("N + is said to + V", "... được cho là ...", "Social media is said to reduce attention spans.", "is said to"),
    s("Such is + N + that ...", "... lớn đến mức ... (đảo ngữ)", "Such is the power of TV that it sets trends.", "such is", "C2"),
  ],
};

/** Case-insensitive check whether the attempt uses the item (structure uses `match`). */
export function toolUsed(item: ToolItem, attempt: string): boolean {
  const a = attempt.toLowerCase();
  if (!a.trim()) return false;
  const key = (item.match ?? item.en).toLowerCase().replace(/\s+/g, " ");
  if (item.kind === "structure") return new RegExp(`\\b${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`).test(a);
  // collocation/phrase: all content words (>2 chars, stem 4) must appear
  const words = key.split(" ").filter((w) => w.length > 2 && !["the", "and", "for"].includes(w));
  return words.every((w) => a.includes(w.slice(0, Math.max(4, w.length - 2))));
}
