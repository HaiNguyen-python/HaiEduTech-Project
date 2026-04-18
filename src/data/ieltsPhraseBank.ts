// IELTS Phrase Bank — high-level (B1+) phrases for Writing Task 1 & 2 practice
export type PhraseLevel = "B1" | "B2" | "C1";
export type PhraseCategoryT1 = "trends" | "comparisons" | "process-map" | "overview";
export type PhraseCategoryT2 = "opinion" | "cause-effect" | "argument" | "solutions" | "linking";

export interface IELTSPhrase {
  id: string;
  phrase: string;
  meaning: string; // Vietnamese
  meaningEn: string;
  example: string; // Band 7+ sample sentence
  level: PhraseLevel;
  taskType: 1 | 2;
  category: PhraseCategoryT1 | PhraseCategoryT2;
}

export const TASK1_CATEGORIES: { value: PhraseCategoryT1; label: string; labelEn: string }[] = [
  { value: "trends", label: "Xu hướng", labelEn: "Trends" },
  { value: "comparisons", label: "So sánh", labelEn: "Comparisons" },
  { value: "process-map", label: "Quy trình & Bản đồ", labelEn: "Process & Map" },
  { value: "overview", label: "Tổng quan", labelEn: "Overview" },
];

export const TASK2_CATEGORIES: { value: PhraseCategoryT2; label: string; labelEn: string }[] = [
  { value: "opinion", label: "Quan điểm", labelEn: "Opinion" },
  { value: "cause-effect", label: "Nguyên nhân-Hệ quả", labelEn: "Cause & Effect" },
  { value: "argument", label: "Lập luận", labelEn: "Argument" },
  { value: "solutions", label: "Giải pháp", labelEn: "Solutions" },
  { value: "linking", label: "Liên kết câu", labelEn: "Linking" },
];

export const IELTS_PHRASES: IELTSPhrase[] = [
  // ===== TASK 1: TRENDS (12) =====
  { id: "t1-tr-1", phrase: "witnessed a sharp rise", meaning: "chứng kiến sự gia tăng mạnh", meaningEn: "experienced a steep increase", example: "The number of online shoppers witnessed a sharp rise between 2010 and 2020.", level: "B2", taskType: 1, category: "trends" },
  { id: "t1-tr-2", phrase: "plummeted dramatically", meaning: "giảm mạnh đột ngột", meaningEn: "fell sharply", example: "Sales of physical newspapers plummeted dramatically after the rise of digital media.", level: "C1", taskType: 1, category: "trends" },
  { id: "t1-tr-3", phrase: "fluctuated wildly", meaning: "dao động thất thường", meaningEn: "varied unpredictably", example: "Oil prices fluctuated wildly throughout the decade, peaking in 2014.", level: "B2", taskType: 1, category: "trends" },
  { id: "t1-tr-4", phrase: "reached a peak of", meaning: "đạt đỉnh ở mức", meaningEn: "hit a maximum at", example: "Tourist arrivals reached a peak of 12 million in 2019 before declining.", level: "B1", taskType: 1, category: "trends" },
  { id: "t1-tr-5", phrase: "leveled off at", meaning: "ổn định ở mức", meaningEn: "stabilised at", example: "Unemployment rates leveled off at around 5% by the end of the period.", level: "B2", taskType: 1, category: "trends" },
  { id: "t1-tr-6", phrase: "experienced a steady decline", meaning: "trải qua sự suy giảm đều đặn", meaningEn: "showed continuous decrease", example: "Coal consumption experienced a steady decline over the twenty-year period.", level: "B2", taskType: 1, category: "trends" },
  { id: "t1-tr-7", phrase: "soared to an all-time high", meaning: "tăng vọt lên mức cao kỷ lục", meaningEn: "rose to record levels", example: "House prices soared to an all-time high in 2022, exceeding €500,000.", level: "C1", taskType: 1, category: "trends" },
  { id: "t1-tr-8", phrase: "remained relatively stable", meaning: "duy trì khá ổn định", meaningEn: "stayed nearly constant", example: "Birth rates remained relatively stable at approximately 1.4 children per woman.", level: "B1", taskType: 1, category: "trends" },
  { id: "t1-tr-9", phrase: "showed a marginal increase", meaning: "tăng nhẹ không đáng kể", meaningEn: "rose slightly", example: "Public transport usage showed a marginal increase of just 2% over five years.", level: "B2", taskType: 1, category: "trends" },
  { id: "t1-tr-10", phrase: "underwent a gradual rise", meaning: "trải qua sự tăng từ từ", meaningEn: "rose progressively", example: "Renewable energy production underwent a gradual rise from 2000 onwards.", level: "C1", taskType: 1, category: "trends" },
  { id: "t1-tr-11", phrase: "saw a moderate growth", meaning: "chứng kiến sự tăng trưởng vừa phải", meaningEn: "had reasonable expansion", example: "The technology sector saw a moderate growth of around 4% annually.", level: "B1", taskType: 1, category: "trends" },
  { id: "t1-tr-12", phrase: "tapered off towards the end", meaning: "giảm dần về cuối kỳ", meaningEn: "decreased gradually at the end", example: "The upward trend tapered off towards the end of the survey period.", level: "C1", taskType: 1, category: "trends" },

  // ===== TASK 1: COMPARISONS (10) =====
  { id: "t1-cm-1", phrase: "outnumbered by a margin of", meaning: "nhiều hơn với khoảng cách là", meaningEn: "exceeded by", example: "Male graduates outnumbered female graduates by a margin of 15%.", level: "C1", taskType: 1, category: "comparisons" },
  { id: "t1-cm-2", phrase: "accounted for the lion's share", meaning: "chiếm phần lớn", meaningEn: "represented the majority", example: "Renewable sources accounted for the lion's share of electricity production at 62%.", level: "C1", taskType: 1, category: "comparisons" },
  { id: "t1-cm-3", phrase: "was twice as high as", meaning: "cao gấp đôi so với", meaningEn: "doubled the value of", example: "Spending on healthcare was twice as high as spending on education.", level: "B1", taskType: 1, category: "comparisons" },
  { id: "t1-cm-4", phrase: "in stark contrast to", meaning: "trái ngược hoàn toàn với", meaningEn: "very different from", example: "In stark contrast to 2010, online sales dominated the retail market by 2020.", level: "B2", taskType: 1, category: "comparisons" },
  { id: "t1-cm-5", phrase: "constituted the smallest proportion", meaning: "chiếm tỷ lệ nhỏ nhất", meaningEn: "made up the lowest share", example: "Coal constituted the smallest proportion of the energy mix at only 4%.", level: "C1", taskType: 1, category: "comparisons" },
  { id: "t1-cm-6", phrase: "made up just under", meaning: "chiếm gần", meaningEn: "represented slightly less than", example: "Imports from Asia made up just under 40% of total trade volume.", level: "B2", taskType: 1, category: "comparisons" },
  { id: "t1-cm-7", phrase: "was significantly lower than", meaning: "thấp hơn đáng kể so với", meaningEn: "was much smaller than", example: "Female participation was significantly lower than male participation in 1980.", level: "B1", taskType: 1, category: "comparisons" },
  { id: "t1-cm-8", phrase: "surpassed that of", meaning: "vượt qua mức của", meaningEn: "exceeded the figure for", example: "By 2020, electric vehicle sales surpassed that of diesel cars.", level: "B2", taskType: 1, category: "comparisons" },
  { id: "t1-cm-9", phrase: "exhibited a similar pattern to", meaning: "thể hiện xu hướng tương tự với", meaningEn: "showed comparable trend with", example: "Japan exhibited a similar pattern to South Korea in terms of population aging.", level: "C1", taskType: 1, category: "comparisons" },
  { id: "t1-cm-10", phrase: "represented a tenfold increase", meaning: "thể hiện mức tăng gấp 10 lần", meaningEn: "showed 10x growth", example: "Mobile users represented a tenfold increase compared to figures from 2000.", level: "C1", taskType: 1, category: "comparisons" },

  // ===== TASK 1: PROCESS / MAP (8) =====
  { id: "t1-pm-1", phrase: "undergo a transformation", meaning: "trải qua sự biến đổi", meaningEn: "go through a change", example: "The raw materials undergo a transformation through a series of chemical processes.", level: "C1", taskType: 1, category: "process-map" },
  { id: "t1-pm-2", phrase: "in the initial stage", meaning: "ở giai đoạn đầu", meaningEn: "at the start", example: "In the initial stage, the wheat is harvested and transported to the mill.", level: "B1", taskType: 1, category: "process-map" },
  { id: "t1-pm-3", phrase: "subsequently followed by", meaning: "tiếp theo sau đó là", meaningEn: "then comes", example: "The mixture is heated, subsequently followed by a cooling phase.", level: "B2", taskType: 1, category: "process-map" },
  { id: "t1-pm-4", phrase: "culminates in the final product", meaning: "kết thúc với sản phẩm cuối cùng", meaningEn: "ends with the finished item", example: "The entire procedure culminates in the final product being packaged for distribution.", level: "C1", taskType: 1, category: "process-map" },
  { id: "t1-pm-5", phrase: "underwent significant redevelopment", meaning: "đã trải qua sự tái phát triển đáng kể", meaningEn: "was substantially rebuilt", example: "The town center underwent significant redevelopment between 1990 and 2020.", level: "C1", taskType: 1, category: "process-map" },
  { id: "t1-pm-6", phrase: "was demolished to make way for", meaning: "bị phá bỏ để nhường chỗ cho", meaningEn: "was torn down for", example: "The old factory was demolished to make way for a residential complex.", level: "B2", taskType: 1, category: "process-map" },
  { id: "t1-pm-7", phrase: "is situated to the north of", meaning: "nằm ở phía bắc của", meaningEn: "is located north of", example: "The new shopping mall is situated to the north of the railway station.", level: "B1", taskType: 1, category: "process-map" },
  { id: "t1-pm-8", phrase: "the final phase involves", meaning: "giai đoạn cuối bao gồm", meaningEn: "the last step is", example: "The final phase involves quality inspection before the goods are shipped.", level: "B2", taskType: 1, category: "process-map" },

  // ===== TASK 1: OVERVIEW (6) =====
  { id: "t1-ov-1", phrase: "it is readily apparent that", meaning: "có thể thấy rõ rằng", meaningEn: "it is obvious that", example: "It is readily apparent that overall consumption rose substantially over the period.", level: "C1", taskType: 1, category: "overview" },
  { id: "t1-ov-2", phrase: "the most striking feature is", meaning: "đặc điểm nổi bật nhất là", meaningEn: "the key point is", example: "The most striking feature is the dramatic shift from oil to renewable energy.", level: "B2", taskType: 1, category: "overview" },
  { id: "t1-ov-3", phrase: "overall, it can be observed that", meaning: "nhìn chung, có thể thấy rằng", meaningEn: "in general, we see that", example: "Overall, it can be observed that all four categories showed upward trends.", level: "B1", taskType: 1, category: "overview" },
  { id: "t1-ov-4", phrase: "a notable trend emerges", meaning: "một xu hướng đáng chú ý xuất hiện", meaningEn: "a clear pattern appears", example: "A notable trend emerges with female employment overtaking male employment by 2020.", level: "C1", taskType: 1, category: "overview" },
  { id: "t1-ov-5", phrase: "the data reveals a clear pattern", meaning: "dữ liệu cho thấy một xu hướng rõ ràng", meaningEn: "data shows a distinct trend", example: "The data reveals a clear pattern of decline in traditional manufacturing jobs.", level: "B2", taskType: 1, category: "overview" },
  { id: "t1-ov-6", phrase: "broadly speaking", meaning: "nói chung", meaningEn: "in general terms", example: "Broadly speaking, urbanisation accelerated across all three continents.", level: "B2", taskType: 1, category: "overview" },

  // ===== TASK 2: OPINION (10) =====
  { id: "t2-op-1", phrase: "from my perspective", meaning: "theo quan điểm của tôi", meaningEn: "in my view", example: "From my perspective, governments should prioritise environmental protection over short-term economic growth.", level: "B2", taskType: 2, category: "opinion" },
  { id: "t2-op-2", phrase: "I am firmly convinced that", meaning: "tôi tin chắc rằng", meaningEn: "I strongly believe that", example: "I am firmly convinced that early language exposure shapes lifelong cognitive abilities.", level: "C1", taskType: 2, category: "opinion" },
  { id: "t2-op-3", phrase: "there is little doubt that", meaning: "không còn nghi ngờ gì rằng", meaningEn: "it is clear that", example: "There is little doubt that technology has revolutionised the way we communicate.", level: "B2", taskType: 2, category: "opinion" },
  { id: "t2-op-4", phrase: "I would argue that", meaning: "tôi cho rằng", meaningEn: "I claim that", example: "I would argue that public transport investment is more effective than building new roads.", level: "B2", taskType: 2, category: "opinion" },
  { id: "t2-op-5", phrase: "in my considered opinion", meaning: "theo ý kiến cân nhắc của tôi", meaningEn: "in my reasoned view", example: "In my considered opinion, work-life balance should be legally protected by employers.", level: "C1", taskType: 2, category: "opinion" },
  { id: "t2-op-6", phrase: "it is my firm belief that", meaning: "tôi tin chắc chắn rằng", meaningEn: "I strongly think that", example: "It is my firm belief that creativity cannot be taught through standardised testing.", level: "C1", taskType: 2, category: "opinion" },
  { id: "t2-op-7", phrase: "I am inclined to think that", meaning: "tôi có xu hướng nghĩ rằng", meaningEn: "I tend to think that", example: "I am inclined to think that remote work benefits both employees and the environment.", level: "B2", taskType: 2, category: "opinion" },
  { id: "t2-op-8", phrase: "personally, I subscribe to the view that", meaning: "cá nhân tôi ủng hộ quan điểm rằng", meaningEn: "I personally agree that", example: "Personally, I subscribe to the view that universal healthcare is a fundamental right.", level: "C1", taskType: 2, category: "opinion" },
  { id: "t2-op-9", phrase: "as far as I am concerned", meaning: "theo tôi", meaningEn: "in my opinion", example: "As far as I am concerned, social media has done more harm than good to teenagers.", level: "B1", taskType: 2, category: "opinion" },
  { id: "t2-op-10", phrase: "without a shadow of a doubt", meaning: "không chút nghi ngờ nào", meaningEn: "absolutely certain", example: "Without a shadow of a doubt, climate change represents the greatest threat of our era.", level: "C1", taskType: 2, category: "opinion" },

  // ===== TASK 2: CAUSE-EFFECT (8) =====
  { id: "t2-ce-1", phrase: "stems primarily from", meaning: "bắt nguồn chủ yếu từ", meaningEn: "originates mainly from", example: "Urban traffic congestion stems primarily from inadequate public transport infrastructure.", level: "C1", taskType: 2, category: "cause-effect" },
  { id: "t2-ce-2", phrase: "gives rise to", meaning: "dẫn đến / gây ra", meaningEn: "causes", example: "Excessive screen time gives rise to a range of physical and mental health issues.", level: "B2", taskType: 2, category: "cause-effect" },
  { id: "t2-ce-3", phrase: "has far-reaching consequences", meaning: "có những hệ quả sâu rộng", meaningEn: "has wide impact", example: "Deforestation has far-reaching consequences for global biodiversity and climate.", level: "C1", taskType: 2, category: "cause-effect" },
  { id: "t2-ce-4", phrase: "is largely attributable to", meaning: "phần lớn là do", meaningEn: "is mostly caused by", example: "The recent surge in obesity is largely attributable to processed food consumption.", level: "C1", taskType: 2, category: "cause-effect" },
  { id: "t2-ce-5", phrase: "leads inevitably to", meaning: "tất yếu dẫn đến", meaningEn: "must result in", example: "Unchecked industrial expansion leads inevitably to severe environmental degradation.", level: "B2", taskType: 2, category: "cause-effect" },
  { id: "t2-ce-6", phrase: "exerts a profound influence on", meaning: "có ảnh hưởng sâu sắc đến", meaningEn: "deeply affects", example: "Parental involvement exerts a profound influence on a child's academic performance.", level: "C1", taskType: 2, category: "cause-effect" },
  { id: "t2-ce-7", phrase: "is a direct consequence of", meaning: "là hệ quả trực tiếp của", meaningEn: "results directly from", example: "Rising sea levels are a direct consequence of global warming caused by human activity.", level: "B2", taskType: 2, category: "cause-effect" },
  { id: "t2-ce-8", phrase: "triggers a chain reaction", meaning: "kích hoạt một phản ứng dây chuyền", meaningEn: "starts a series of effects", example: "Job automation triggers a chain reaction across multiple sectors of the economy.", level: "C1", taskType: 2, category: "cause-effect" },

  // ===== TASK 2: ARGUMENT (8) =====
  { id: "t2-ar-1", phrase: "a compelling argument in favor of", meaning: "một lập luận thuyết phục ủng hộ", meaningEn: "a strong reason for", example: "A compelling argument in favor of renewable energy is its long-term cost effectiveness.", level: "C1", taskType: 2, category: "argument" },
  { id: "t2-ar-2", phrase: "opponents would contend that", meaning: "những người phản đối sẽ cho rằng", meaningEn: "critics would say that", example: "Opponents would contend that strict regulation stifles innovation in the tech sector.", level: "C1", taskType: 2, category: "argument" },
  { id: "t2-ar-3", phrase: "this notion is reinforced by", meaning: "quan điểm này được củng cố bởi", meaningEn: "this idea is supported by", example: "This notion is reinforced by recent studies linking exercise to mental wellbeing.", level: "C1", taskType: 2, category: "argument" },
  { id: "t2-ar-4", phrase: "it could be argued that", meaning: "có thể lập luận rằng", meaningEn: "one might say that", example: "It could be argued that traditional classroom learning still offers irreplaceable benefits.", level: "B2", taskType: 2, category: "argument" },
  { id: "t2-ar-5", phrase: "a case in point is", meaning: "một ví dụ điển hình là", meaningEn: "a clear example is", example: "A case in point is Singapore, which transformed its economy through education investment.", level: "B2", taskType: 2, category: "argument" },
  { id: "t2-ar-6", phrase: "this view is substantiated by", meaning: "quan điểm này được chứng minh bởi", meaningEn: "this view is proven by", example: "This view is substantiated by data from the World Health Organisation.", level: "C1", taskType: 2, category: "argument" },
  { id: "t2-ar-7", phrase: "proponents maintain that", meaning: "những người ủng hộ khẳng định rằng", meaningEn: "supporters say that", example: "Proponents maintain that nuclear energy is essential for achieving carbon neutrality.", level: "C1", taskType: 2, category: "argument" },
  { id: "t2-ar-8", phrase: "there is a strong case for", meaning: "có cơ sở vững chắc cho việc", meaningEn: "there are good reasons for", example: "There is a strong case for raising the legal age for social media use to 16.", level: "B2", taskType: 2, category: "argument" },

  // ===== TASK 2: SOLUTIONS (8) =====
  { id: "t2-so-1", phrase: "a viable solution would be to", meaning: "một giải pháp khả thi là", meaningEn: "one practical fix is to", example: "A viable solution would be to introduce congestion charges in major city centres.", level: "C1", taskType: 2, category: "solutions" },
  { id: "t2-so-2", phrase: "governments should impose stringent regulations", meaning: "chính phủ nên áp đặt các quy định nghiêm ngặt", meaningEn: "authorities must enforce strict rules", example: "Governments should impose stringent regulations on plastic packaging manufacturers.", level: "C1", taskType: 2, category: "solutions" },
  { id: "t2-so-3", phrase: "investing heavily in", meaning: "đầu tư mạnh mẽ vào", meaningEn: "spending a lot on", example: "Investing heavily in vocational training would address the skills gap effectively.", level: "B2", taskType: 2, category: "solutions" },
  { id: "t2-so-4", phrase: "raise public awareness about", meaning: "nâng cao nhận thức cộng đồng về", meaningEn: "educate people about", example: "Media campaigns should raise public awareness about the dangers of misinformation.", level: "B1", taskType: 2, category: "solutions" },
  { id: "t2-so-5", phrase: "implement comprehensive measures", meaning: "thực hiện các biện pháp toàn diện", meaningEn: "carry out wide-ranging actions", example: "Authorities must implement comprehensive measures to combat air pollution in cities.", level: "C1", taskType: 2, category: "solutions" },
  { id: "t2-so-6", phrase: "tackle the root cause of", meaning: "giải quyết tận gốc nguyên nhân của", meaningEn: "address the source of", example: "Education policies must tackle the root cause of inequality rather than its symptoms.", level: "B2", taskType: 2, category: "solutions" },
  { id: "t2-so-7", phrase: "introduce financial incentives", meaning: "đưa ra các ưu đãi tài chính", meaningEn: "offer monetary rewards", example: "Introducing financial incentives for electric vehicle buyers would accelerate the green transition.", level: "B2", taskType: 2, category: "solutions" },
  { id: "t2-so-8", phrase: "foster collaboration between", meaning: "thúc đẩy sự hợp tác giữa", meaningEn: "encourage cooperation between", example: "Schools should foster collaboration between parents and teachers to support student learning.", level: "C1", taskType: 2, category: "solutions" },

  // ===== TASK 2: LINKING (10) =====
  { id: "t2-li-1", phrase: "notwithstanding this", meaning: "mặc dù vậy", meaningEn: "despite this", example: "The policy faced criticism. Notwithstanding this, the government pressed ahead with reforms.", level: "C1", taskType: 2, category: "linking" },
  { id: "t2-li-2", phrase: "by the same token", meaning: "tương tự như vậy", meaningEn: "similarly", example: "Healthy diets reduce illness; by the same token, regular exercise extends lifespan.", level: "C1", taskType: 2, category: "linking" },
  { id: "t2-li-3", phrase: "in stark contrast", meaning: "trái ngược hoàn toàn", meaningEn: "very differently", example: "Urban areas thrive economically. In stark contrast, rural regions face stagnation.", level: "B2", taskType: 2, category: "linking" },
  { id: "t2-li-4", phrase: "on the contrary", meaning: "ngược lại", meaningEn: "the opposite is true", example: "Critics claim renewable energy is unreliable. On the contrary, modern grids handle it efficiently.", level: "B1", taskType: 2, category: "linking" },
  { id: "t2-li-5", phrase: "to illustrate this point", meaning: "để minh họa cho điểm này", meaningEn: "to give an example", example: "To illustrate this point, Finland's education system consistently outperforms others globally.", level: "B2", taskType: 2, category: "linking" },
  { id: "t2-li-6", phrase: "in light of this", meaning: "xét theo điều này", meaningEn: "given this", example: "In light of this, governments must reconsider their long-term energy strategies.", level: "B2", taskType: 2, category: "linking" },
  { id: "t2-li-7", phrase: "what is more", meaning: "hơn nữa", meaningEn: "moreover", example: "Cycling reduces emissions. What is more, it improves the cyclist's overall fitness.", level: "B1", taskType: 2, category: "linking" },
  { id: "t2-li-8", phrase: "having said that", meaning: "tuy nhiên, dù vậy", meaningEn: "however", example: "Online learning offers flexibility. Having said that, it cannot fully replace face-to-face interaction.", level: "B2", taskType: 2, category: "linking" },
  { id: "t2-li-9", phrase: "consequently", meaning: "do đó", meaningEn: "as a result", example: "The factory closed unexpectedly; consequently, hundreds of workers lost their jobs.", level: "B1", taskType: 2, category: "linking" },
  { id: "t2-li-10", phrase: "to put it another way", meaning: "nói cách khác", meaningEn: "in other words", example: "Education unlocks opportunity; to put it another way, it is the great equaliser.", level: "B2", taskType: 2, category: "linking" },
];

export function getPhrasesByTask(taskType: 1 | 2): IELTSPhrase[] {
  return IELTS_PHRASES.filter(p => p.taskType === taskType);
}
