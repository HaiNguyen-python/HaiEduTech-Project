/**
 * @file ieltsParaphraseToolkit.ts
 * @description Per-topic collocations and structures (B2-C2) students can apply
 *   while paraphrasing. Keyed `task:topic`. No em-dashes.
 */
export type ToolKind = "collocation" | "structure";
export interface ToolItem { kind: ToolKind; en: string; vi: string; ex: string; level: "B2" | "C1" | "C2"; match?: string }

const c = (en: string, vi: string, ex: string, level: ToolItem["level"] = "B2"): ToolItem => ({ kind: "collocation", en, vi, ex, level });
const s = (en: string, vi: string, ex: string, match: string, level: ToolItem["level"] = "C1"): ToolItem => ({ kind: "structure", en, vi, ex, level, match });

export const PARA_TOOLKIT: Record<string, ToolItem[]> = {
  "1:trends": [
    c("rise sharply", "tăng mạnh", "Car sales rose sharply after 2010."),
    c("level off", "chững lại", "The rate levelled off at 40%.", "C1"),
    s("There was a(n) + adj + noun + in + N", "Có một sự ... về ...", "There was a significant increase in car ownership.", "there was a"),
    s("N + saw/witnessed + N + V", "Giai đoạn ... chứng kiến ...", "The 1990s saw sales plummet.", "saw", "C2"),
  ],
  "1:comparisons": [
    c("considerably higher", "cao hơn đáng kể", "Spending was considerably higher in Japan."),
    c("female counterparts", "nhóm nữ tương ứng", "Men earned more than their female counterparts.", "C1"),
    s("..., whereas ...", "..., trong khi ...", "Japan was highest, whereas India was lowest.", "whereas", "B2"),
    s("N + dwarfed/exceeded that of N", "... vượt xa ... của ...", "City A's population far exceeded that of City B.", "that of", "C2"),
  ],
  "1:proportions": [
    c("the lion's share", "phần lớn nhất", "Rent took the lion's share of the budget.", "C1"),
    c("account for", "chiếm", "Food accounted for 30% of spending."),
    s("N + accounted for + %", "... chiếm ...%", "Transport accounted for 15% of the total.", "accounted for", "B2"),
    s("It is noticeable that ...", "Đáng chú ý là ...", "It is noticeable that few people walked.", "it is noticeable"),
  ],
  "1:process": [
    c("the initial stage", "giai đoạn đầu", "In the initial stage, leaves are picked."),
    c("the final product", "sản phẩm cuối", "The final product is packaged and shipped."),
    s("N + is/are + V3 (passive)", "Câu bị động", "The beans are roasted at high heat.", "are", "B2"),
    s("..., after which ...", "..., sau đó ...", "The mixture is heated, after which it is cooled.", "after which"),
  ],
  "1:map": [
    c("undergo significant changes", "trải qua thay đổi lớn", "The town underwent significant changes.", "C1"),
    c("be converted into", "được chuyển đổi thành", "The factory was converted into flats."),
    s("N + was replaced by + N", "... được thay thế bởi ...", "The market was replaced by a mall.", "replaced by", "B2"),
    s("N + saw the construction of + N", "... chứng kiến việc xây dựng ...", "The east side saw the construction of a hospital.", "construction of"),
  ],
  "1:overview": [
    c("the most striking feature", "đặc điểm nổi bật nhất", "The most striking feature is the rise in cars.", "C1"),
    c("remain the dominant", "vẫn chiếm ưu thế", "Coal remained the dominant source."),
    s("Overall, it is evident that ...", "Nhìn chung, rõ ràng là ...", "Overall, it is evident that usage grew.", "it is evident"),
    s("What stands out is ...", "Điều nổi bật là ...", "What stands out is the sharp fall in 2010.", "what stands out", "C2"),
  ],
  "2:education": [
    c("academic performance", "kết quả học tập", "Homework can improve academic performance."),
    c("a well-rounded education", "nền giáo dục toàn diện", "Art contributes to a well-rounded education.", "C1"),
    s("It is widely argued that ...", "Nhiều người cho rằng ...", "It is widely argued that exams cause stress.", "it is widely argued"),
    s("Were + S + to V, ...", "Nếu ... (đảo ngữ)", "Were schools to cut fees, more children would enrol.", "were", "C2"),
  ],
  "2:environment": [
    c("carbon emissions", "khí thải carbon", "Cars produce high carbon emissions."),
    c("pose a serious threat", "gây mối đe dọa nghiêm trọng", "Plastic poses a serious threat to marine life.", "C1"),
    s("Unless + clause, ...", "Trừ khi ..., ...", "Unless action is taken, temperatures will keep rising.", "unless", "B2"),
    s("The more ..., the more ...", "Càng ... càng ...", "The more we recycle, the less waste we create.", "the more"),
  ],
  "2:technology": [
    c("technological advances", "tiến bộ công nghệ", "Technological advances have changed work."),
    c("social interaction", "tương tác xã hội", "Screens may reduce social interaction."),
    s("While it is true that ..., ...", "Mặc dù đúng là ..., ...", "While it is true that AI saves time, it may cost jobs.", "while it is true"),
    s("So + adj + is + N + that ...", "Quá ... đến mức ... (đảo ngữ)", "So widespread is phone use that few people read books.", "so", "C2"),
  ],
  "2:work": [
    c("job satisfaction", "sự hài lòng trong công việc", "Flexible hours raise job satisfaction."),
    c("career prospects", "triển vọng nghề nghiệp", "Training improves career prospects."),
    s("It is essential that S + V (bare)", "Điều cần thiết là ...", "It is essential that employers support staff.", "it is essential"),
    s("Should + S + V, ...", "Nếu ... (đảo ngữ)", "Should companies offer more leave, staff would stay longer.", "should", "C2"),
  ],
  "2:health": [
    c("a sedentary lifestyle", "lối sống ít vận động", "A sedentary lifestyle leads to obesity.", "C1"),
    c("impose a tax on", "áp thuế lên", "The state could impose a tax on sugary drinks."),
    s("It would be advisable for N + to V", "Sẽ là khôn ngoan nếu ...", "It would be advisable for governments to raise prices.", "advisable"),
    s("Were + N + to V, ...", "Nếu ... (đảo ngữ)", "Were sugary drinks to cost more, fewer would be sold.", "were", "C2"),
  ],
  "2:society": [
    c("social cohesion", "sự gắn kết xã hội", "Festivals strengthen social cohesion.", "C1"),
    c("widen the gap", "nới rộng khoảng cách", "Low wages widen the gap between rich and poor."),
    s("There is a growing tendency for N + to V", "Ngày càng có xu hướng ...", "There is a growing tendency for people to live alone.", "growing tendency"),
    s("Little do + S + realise that ...", "Ít ai nhận ra rằng ... (đảo ngữ)", "Little do people realise how lonely the elderly are.", "little do", "C2"),
  ],
  "2:crime": [
    c("a deterrent to crime", "biện pháp răn đe tội phạm", "Harsh sentences act as a deterrent to crime.", "C1"),
    c("juvenile delinquency", "tội phạm vị thành niên", "Poverty fuels juvenile delinquency.", "C1"),
    s("Rather than + V-ing, ...", "Thay vì ..., ...", "Rather than punishing, we should rehabilitate.", "rather than", "B2"),
    s("Not until + clause + did/does + S + V", "Mãi đến khi ... mới ...", "Not until poverty falls will crime decline.", "not until", "C2"),
  ],
  "2:media": [
    c("mass media", "truyền thông đại chúng", "Mass media shapes public opinion."),
    c("fake news", "tin giả", "Fake news spreads quickly online."),
    s("It could be argued that ...", "Có thể lập luận rằng ...", "It could be argued that ads harm children.", "could be argued", "B2"),
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
