/**
 * IELTS Speaking Practice - Part 3 top-up bank.
 * Raises every Part 3 topic to at least five discussion questions, using
 * abstract, analytical language (comparing, speculating, evaluating trends).
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { SpeakingPracticeQuestion } from "./speakingPracticeData";
import { build2, type Seed2 } from "./speakingPracticeExpansion2";

type Pair = [string, string];

const topic = (
  name: string,
  vocab: Pair[],
  structures: string[],
  ideas: string[],
) => (id: string, question: string, model: string): Seed2 => ({
  id,
  topic: name,
  question,
  vocab,
  structures,
  ideas,
  model,
});

const work = topic(
  "Work",
  [
    ["Job satisfaction", "Sự hài lòng trong công việc"],
    ["Automation", "Tự động hóa"],
    ["Transferable skills", "Kỹ năng có thể chuyển đổi"],
    ["A flexible workforce", "Lực lượng lao động linh hoạt"],
  ],
  ["There's a clear shift towards...", "The obvious counterargument is...", "In the long run, I'd expect..."],
  ["Gig economy", "Retraining schemes", "Ageing workforce"],
);

const cities = topic(
  "Cities",
  [
    ["Urban sprawl", "Đô thị mở rộng thiếu kiểm soát"],
    ["Affordable housing", "Nhà ở giá phải chăng"],
    ["Green space", "Không gian xanh"],
    ["Infrastructure", "Cơ sở hạ tầng"],
  ],
  ["The core issue is that...", "Where planning has worked, it's because...", "Without investment in..., cities will..."],
  ["Public transport", "Rent prices", "Air pollution"],
);

const culture = topic(
  "Culture",
  [
    ["Cultural identity", "Bản sắc văn hóa"],
    ["To pass down traditions", "Truyền lại truyền thống"],
    ["Cultural exchange", "Giao lưu văn hóa"],
    ["To water something down", "Làm nhạt đi, làm mất bản sắc"],
  ],
  ["It cuts both ways.", "What's genuinely at risk is...", "A sensible balance would be..."],
  ["Festivals", "Language loss", "Tourism and authenticity"],
);

const money = topic(
  "Money",
  [
    ["Disposable income", "Thu nhập khả dụng"],
    ["Financial literacy", "Hiểu biết tài chính"],
    ["The wealth gap", "Khoảng cách giàu nghèo"],
    ["Consumer culture", "Văn hóa tiêu dùng"],
  ],
  ["Up to a point, yes.", "The evidence suggests that...", "The deeper problem is..."],
  ["Advertising pressure", "Saving habits", "Social comparison"],
);

const travel = topic(
  "Travel",
  [
    ["Mass tourism", "Du lịch đại trà"],
    ["Local economy", "Kinh tế địa phương"],
    ["Sustainable travel", "Du lịch bền vững"],
    ["To broaden your horizons", "Mở rộng tầm nhìn"],
  ],
  ["The benefits are real, but so are the costs.", "Communities gain..., yet they also...", "The way forward is probably..."],
  ["Overcrowded heritage sites", "Seasonal jobs", "Carbon footprint"],
);

const family = topic(
  "Family",
  [
    ["Nuclear family", "Gia đình hạt nhân"],
    ["Extended family", "Đại gia đình"],
    ["Work-life balance", "Cân bằng công việc và cuộc sống"],
    ["An ageing population", "Dân số già hóa"],
  ],
  ["The change has been quite dramatic.", "This largely reflects...", "One consequence people overlook is..."],
  ["Urban migration", "Childcare costs", "Care for the elderly"],
);

const language = topic(
  "Language",
  [
    ["A lingua franca", "Ngôn ngữ chung"],
    ["Minority languages", "Ngôn ngữ thiểu số"],
    ["Language loss", "Sự mai một ngôn ngữ"],
    ["Bilingual education", "Giáo dục song ngữ"],
  ],
  ["On balance, the advantages outweigh...", "The risk, though, is that...", "Governments could realistically..."],
  ["English in business", "Local dialects", "Translation technology"],
);

const transport = topic(
  "Transport",
  [
    ["Congestion charges", "Phí ùn tắc"],
    ["Public transport network", "Mạng lưới giao thông công cộng"],
    ["Car dependency", "Sự phụ thuộc vào ô tô, xe máy"],
    ["Emissions", "Khí thải"],
  ],
  ["No single measure will solve it.", "The most effective policies combine...", "People only change habits when..."],
  ["Metro systems", "Cycling lanes", "Electric vehicles"],
);

const art = topic(
  "Art",
  [
    ["Public funding", "Ngân sách công"],
    ["Creative industries", "Ngành công nghiệp sáng tạo"],
    ["Cultural heritage", "Di sản văn hóa"],
    ["Accessible to everyone", "Ai cũng tiếp cận được"],
  ],
  ["I'd argue it's not a luxury.", "Critics would say..., and they have a point.", "A compromise would be to..."],
  ["Art in schools", "Tourism revenue", "Digital galleries"],
);

const health = topic(
  "Health",
  [
    ["Preventive care", "Y tế dự phòng"],
    ["A sedentary lifestyle", "Lối sống ít vận động"],
    ["Mental wellbeing", "Sức khỏe tinh thần"],
    ["Public health campaigns", "Chiến dịch y tế cộng đồng"],
  ],
  ["The trend is worrying, frankly.", "It's partly individual choice and partly...", "The cheapest intervention is usually..."],
  ["Processed food", "Screen time", "Access to clinics"],
);

const media = topic(
  "Media",
  [
    ["Clickbait", "Tiêu đề giật gân câu view"],
    ["Editorial standards", "Chuẩn mực biên tập"],
    ["An echo chamber", "Buồng vọng thông tin"],
    ["Media literacy", "Năng lực đọc hiểu truyền thông"],
  ],
  ["It varies enormously by source.", "The business model explains a lot:", "The realistic solution is..."],
  ["Algorithms", "Citizen journalism", "Fact-checking"],
);

const seeds: Seed2[] = [
  // Work
  work("p3x-work-3", "How will technology change the jobs people do?",
    "**Automation** will remove a lot of routine work - data entry, basic accounting, even parts of translation. What it can't easily replace is judgement and human contact, so I'd expect demand to shift towards **transferable skills** like problem solving and communication. The danger is that retraining lags behind, leaving older workers stranded."),
  work("p3x-work-4", "What makes people satisfied at work?",
    "Surveys consistently show it's not just salary. **Job satisfaction** comes mainly from autonomy, being recognised, and feeling that the work matters. Pay becomes a serious issue only when it's clearly unfair compared with colleagues doing the same job."),
  work("p3x-work-5", "Should companies allow more flexible working hours?",
    "In most office roles, yes. **A flexible workforce** tends to be more productive because people work when they concentrate best, and it helps parents enormously. The counterargument is coordination - if nobody shares hours, teamwork suffers - so core hours are a sensible compromise."),
  work("p3x-work-6", "Is it better to work for a large company or a small one?",
    "They suit different stages of a career. Large firms offer structured training and security, whereas a small company gives you far broader responsibility early on. I'd argue starting small teaches you more, and moving to a corporation later is easier than the reverse."),

  // Cities
  cities("p3x-city-3", "What makes a city a good place to live?",
    "Affordable housing and a reliable **public transport network** come first, because they determine how much time and money people actually have. After that it's **green space** and safety. Interestingly, the cities that top liveability rankings are rarely the biggest ones."),
  cities("p3x-city-4", "How can governments control urban sprawl?",
    "Mainly by building upwards and investing in **infrastructure** before the population arrives, not after. Green belts help, though they can push prices up, so they need to come with genuine **affordable housing** programmes in the centre."),
  cities("p3x-city-5", "Will more people live in cities in the future?",
    "Almost certainly, since jobs, universities and hospitals concentrate there. That said, remote work has slowed the trend slightly - some professionals now choose smaller towns, which could ease pressure on the largest cities if it continues."),

  // Culture
  culture("p3x-cul-3", "How can traditional culture be preserved?",
    "Through education more than museums. If children learn traditional music or crafts at school, traditions are genuinely **passed down** rather than displayed. Financial support matters too, because artisans abandon their craft when it stops paying."),
  culture("p3x-cul-4", "Do international tourists help or harm local culture?",
    "Both. Tourism creates income that keeps festivals and crafts alive, but it also **waters down** traditions when performances are shortened for visitors. The healthiest model is when locals control how their culture is presented."),
  culture("p3x-cul-5", "Is it important for young people to know their country's history?",
    "I'd say so, because **cultural identity** is built on shared stories. Knowing why things are the way they are also makes people better citizens. The risk is teaching history as pure memorisation, which puts young people off entirely."),

  // Money
  money("p3x-mon-3", "Should schools teach children about managing money?",
    "Definitely. **Financial literacy** is a practical life skill, yet most people learn it through expensive mistakes. A single term covering budgeting, interest and debt would save many young adults years of trouble."),
  money("p3x-mon-4", "Is the gap between rich and poor increasing?",
    "In most economies, yes - **the wealth gap** has widened as asset prices have risen faster than wages. It matters because extreme inequality reduces social mobility and, eventually, trust in institutions."),
  money("p3x-mon-5", "Do people spend money differently from previous generations?",
    "Considerably. Older generations prioritised saving and property, whereas younger people with less **disposable income** relative to housing costs often spend on experiences instead. **Consumer culture** and easy online payment have also made spending frictionless."),

  // Travel
  travel("p3x-tra-4", "Is travelling the best way to learn about another country?",
    "It's the most vivid way, certainly - you **broaden your horizons** by seeing daily life rather than reading about it. But a two-week holiday can also confirm stereotypes if you stay in resorts, so it depends entirely on how you travel."),
  travel("p3x-tra-5", "How can tourism be made more sustainable?",
    "By spreading visitors out - promoting less famous regions and charging more at peak times. **Sustainable travel** also means investing tourist revenue back into the **local economy** instead of letting foreign chains take most of it."),
  travel("p3x-tra-6", "Will people travel more or less in the future?",
    "More overall, as incomes rise in large developing countries. The counterweight is climate policy: if flying becomes significantly more expensive, we may see a return to regional travel by train, which would honestly be no bad thing."),

  // Family
  family("p3x-fam-2", "Why do people have smaller families than in the past?",
    "Mainly cost and opportunity. Raising a child in a city is expensive, housing is small, and women now have careers they reasonably don't want to interrupt. Better healthcare also means parents no longer need several children to be sure some survive."),
  family("p3x-fam-3", "Who should look after elderly people?",
    "Culturally in Vietnam it's the family, and I think that closeness is valuable. But with **an ageing population** and adults working long hours, the state has to share the load through home care services, otherwise the burden falls unfairly on daughters."),
  family("p3x-fam-4", "Do parents spend enough time with their children?",
    "Many genuinely can't. Long commutes and unstable hours make **work-life balance** difficult, so quantity of time has fallen. What matters more, though, is attention - an hour without phones is worth an evening in the same room."),
  family("p3x-fam-5", "How have the roles of men and women in families changed?",
    "Substantially in cities. Both partners usually work, so household tasks are shared far more than in my grandparents' generation. Progress is uneven, however - women still do most of the childcare, even in dual-income **nuclear families**."),

  // Language
  language("p3x-lan-2", "Why do some languages disappear?",
    "Because speakers stop seeing an economic future in them. Once education and jobs operate in a dominant language, parents raise children in it, and within two generations you get **language loss**. **Minority languages** survive mainly where they're used in schools and media."),
  language("p3x-lan-3", "Should everyone learn a second language at school?",
    "Yes, though not necessarily English everywhere. **Bilingual education** improves memory and cultural awareness, and it's far easier before the teenage years. What matters is enough hours - two lessons a week achieves very little."),
  language("p3x-lan-4", "Will technology replace the need to learn languages?",
    "For transactions, largely yes - translation apps already handle menus and directions. But relationships and humour don't survive machine translation well, so anyone working closely with another culture will still need the language itself."),
  language("p3x-lan-5", "What are the advantages of having a global language?",
    "Efficiency, above all. **A lingua franca** lets scientists, businesses and travellers cooperate without endless translation. The cost is that native speakers gain an unfair advantage, and smaller languages lose prestige, which is why local languages need active protection."),

  // Transport
  transport("p3x-trp-2", "Should governments invest more in public transport?",
    "Yes, because it's the only measure that scales properly. Building more roads simply attracts more vehicles within a few years, whereas a dense **public transport network** moves far more people per lane, cuts **emissions** and gives poorer households genuine mobility. The difficulty is that the investment is enormous and the political benefit only appears a decade later."),
  transport("p3x-trp-3", "How can people be encouraged to use cars less?",
    "A mix of push and pull. **Congestion charges** and higher parking fees make driving less attractive, but they're only fair if the alternative is reliable. Cities that added cycling lanes and frequent metros saw **car dependency** fall quickly."),
  transport("p3x-trp-4", "Are electric vehicles a real solution to pollution?",
    "Partly. They clearly improve air quality in cities, which is a health win. But if the electricity comes from coal, the **emissions** are simply moved elsewhere, and they do nothing about congestion."),
  transport("p3x-trp-5", "How might transport change in the next twenty years?",
    "I'd expect far more electrification and better integration - one app for metro, bus and bike hire. Self-driving vehicles are talked about constantly, but I suspect regulation, not technology, will decide how quickly they arrive."),

  // Art
  art("p3x-art-2", "Should art be taught in schools?",
    "Absolutely. Art develops creativity and confidence, and for some children it's the only subject where they succeed. Cutting it to add exam subjects narrows education just when the **creative industries** are growing."),
  art("p3x-art-3", "Why do people visit art galleries?",
    "For different reasons - some for genuine interest, others because it's part of travelling. Galleries also offer quiet, which is rare in cities. The problem is that many still feel intimidating rather than **accessible to everyone**."),
  art("p3x-art-4", "Is street art a legitimate form of art?",
    "I'd say yes, when it's done with permission. It brings **cultural heritage** and social comment into places people actually walk through. Vandalism on private property is a different matter, and conflating the two helps nobody."),
  art("p3x-art-5", "Has technology changed the way people experience art?",
    "Enormously. Anyone can now view collections online, which democratises access, and digital tools have created entirely new art forms. Something is lost though - scale and texture simply don't survive a screen."),

  // Health
  health("p3x-hea-4", "Whose responsibility is public health, the individual or the government?",
    "Both, but the balance is often misstated. Individuals choose what they eat, yet those choices are shaped by prices, advertising and city design. Governments can make the healthy option the easy option, which is what effective **public health campaigns** actually do."),
  health("p3x-hea-5", "Is mental health taken seriously enough?",
    "Awareness has improved dramatically, but services haven't kept pace. **Mental wellbeing** is still treated as secondary in most workplaces and schools, and waiting lists for counselling are long, so people rely on family or nothing at all."),
  health("p3x-hea-6", "How does modern work affect people's health?",
    "Mainly through **a sedentary lifestyle** and stress. Sitting for nine hours, eating at a desk and checking messages late at night take a slow toll. Companies that fund gym access are treating the symptom rather than the workload itself."),

  // Media
  media("p3x-med-4", "How has social media changed journalism?",
    "It has broken the old business model. News now competes for attention, which rewards **clickbait** over careful reporting, and **editorial standards** vary wildly. On the positive side, citizen video has exposed events that would once have been hidden."),
  media("p3x-med-5", "How can people tell whether news is reliable?",
    "By checking who benefits from the story and whether other outlets report it. Basic **media literacy** - looking at the source, the date and the evidence - would filter out most misinformation, which is why it should be taught in schools."),
  media("p3x-med-6", "Do algorithms limit what people see?",
    "Significantly. Platforms show you what keeps you scrolling, so opinions you already hold get amplified and you end up in **an echo chamber**. Deliberately following sources you disagree with is one of the few effective personal remedies."),
];

export const SPEAKING_PRACTICE_EXPANSION_5: { part3: SpeakingPracticeQuestion[] } = {
  part3: build2(3, seeds),
};
