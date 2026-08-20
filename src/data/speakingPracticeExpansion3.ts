/**
 * IELTS Speaking Practice - Part 3 expansion bank.
 * Abstract discussion questions with analytical vocabulary suited to Part 3
 * (comparing, speculating, evaluating trends).
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { SpeakingPracticeQuestion } from "./speakingPracticeData";
import { build2, type Seed2 } from "./speakingPracticeExpansion2";

const p3: Seed2[] = [
  {
    id: "pz3-work-life",
    topic: "Work",
    question: "Why do many people find it hard to balance work and personal life today?",
    vocab: [
      ["Blurred boundaries", "Ranh giới mờ nhạt"],
      ["Always-on culture", "Văn hóa luôn trực tuyến"],
      ["Burnout", "Kiệt sức"],
      ["Job insecurity", "Bấp bênh việc làm"],
    ],
    structures: ["The root of the problem is that...", "A further factor is...", "Unless employers..., this trend will..."],
    ideas: ["Remote work", "Smartphones", "Competitive labour market"],
    model:
      "The root of the problem is that technology has created **blurred boundaries**: a message at ten at night is now normal, so people never fully switch off. This **always-on culture** is reinforced by **job insecurity** - if you refuse extra work, someone else won't. The predictable result is **burnout**. Unless employers set explicit rules about after-hours contact, I doubt individual willpower will be enough.",
  },
  {
    id: "pz3-remote-future",
    topic: "Work",
    question: "Do you think most jobs will be done remotely in the future?",
    vocab: [
      ["Hybrid model", "Mô hình kết hợp"],
      ["Face-to-face collaboration", "Hợp tác trực tiếp"],
      ["Overheads", "Chi phí vận hành"],
      ["To be feasible", "Khả thi"],
    ],
    structures: ["Most, no - but a significant minority, yes.", "It's only **feasible** where...", "On balance I'd predict..."],
    ideas: ["Manufacturing vs office work", "Office rent savings", "Training juniors"],
    model:
      "Most, no - but a significant proportion, yes. Remote work is only **feasible** in knowledge-based roles; nurses and factory workers can't log in from home. Companies do like the reduced **overheads**, yet they've realised that training junior staff depends on **face-to-face collaboration**. On balance I'd predict a **hybrid model** becoming standard: two or three fixed days in the office.",
  },
  {
    id: "pz3-ai-jobs",
    topic: "Technology",
    question: "How might artificial intelligence change the jobs young people do?",
    vocab: [
      ["To automate routine tasks", "Tự động hóa việc lặp lại"],
      ["To reskill", "Đào tạo lại kỹ năng"],
      ["Entry-level position", "Vị trí khởi điểm"],
      ["Human judgement", "Óc phán đoán của con người"],
    ],
    structures: ["The clearest impact will be on...", "What worries me is that...", "The jobs that survive will be those requiring..."],
    ideas: ["Translation and data entry", "Loss of junior roles", "New AI-related careers"],
    model:
      "The clearest impact will be on **entry-level positions**, because AI **automates routine tasks** like drafting and data entry first. What worries me is that graduates traditionally learn through exactly that work. The roles that survive will be those requiring **human judgement** - negotiation, teaching, care. Governments therefore need to help people **reskill** rather than assume the market will sort itself out.",
  },
  {
    id: "pz3-education-equality",
    topic: "Education",
    question: "Does education really give everyone equal opportunities?",
    vocab: [
      ["Social mobility", "Dịch chuyển xã hội"],
      ["Achievement gap", "Khoảng cách thành tích"],
      ["Private tutoring", "Học thêm tư nhân"],
      ["To level the playing field", "Tạo sân chơi bình đẳng"],
    ],
    structures: ["In theory yes, in practice no.", "The main obstacle is...", "Genuine equality would require..."],
    ideas: ["Rural vs urban schools", "Cost of extra classes", "Scholarships"],
    model:
      "In theory yes, in practice not really. Education is the strongest driver of **social mobility** we have, but the **achievement gap** opens long before university: wealthy families buy **private tutoring** while rural schools lack teachers. Genuine equality would require investing where the need is greatest - free supplementary classes and better rural pay - rather than assuming a national exam alone **levels the playing field**.",
  },
  {
    id: "pz3-exams-value",
    topic: "Education",
    question: "Are examinations the best way to assess students?",
    vocab: [
      ["Rote learning", "Học vẹt"],
      ["Continuous assessment", "Đánh giá liên tục"],
      ["High-stakes testing", "Thi cử áp lực cao"],
      ["Objective measure", "Thước đo khách quan"],
    ],
    structures: ["They have obvious advantages, namely...", "The drawback, however, is...", "Ideally schools would combine..."],
    ideas: ["Fairness and scale", "Exam stress", "Portfolios and projects"],
    model:
      "They have one clear advantage: an exam is a relatively **objective measure** that can be applied to a million students at once. The drawback is that **high-stakes testing** encourages **rote learning** and punishes students who simply perform badly under pressure. Ideally schools would combine exams with **continuous assessment** - projects and presentations - so that the final grade reflects a year of work, not two hours.",
  },
  {
    id: "pz3-lifelong-learning",
    topic: "Education",
    question: "Why has lifelong learning become more important?",
    vocab: [
      ["Shelf life of skills", "Tuổi thọ của kỹ năng"],
      ["To keep pace with", "Theo kịp"],
      ["Upskilling", "Nâng cấp kỹ năng"],
      ["Career change", "Chuyển hướng nghề nghiệp"],
    ],
    structures: ["Primarily because...", "Another consideration is...", "As a result, learning can no longer stop at..."],
    ideas: ["Technology cycles", "Longer working lives", "Online courses"],
    model:
      "Primarily because the **shelf life of skills** has collapsed - what I learn about software this year may be obsolete in five. Another consideration is that people now work into their sixties and often make at least one **career change**. As a result, learning can no longer stop at graduation; continuous **upskilling** is simply how you **keep pace with** the market, and cheap online courses have made that realistic.",
  },
  {
    id: "pz3-city-growth",
    topic: "Cities",
    question: "What problems does rapid urban growth cause?",
    vocab: [
      ["Urban sprawl", "Đô thị lan rộng"],
      ["To put a strain on infrastructure", "Gây áp lực lên hạ tầng"],
      ["Housing shortage", "Thiếu nhà ở"],
      ["Air pollution", "Ô nhiễm không khí"],
    ],
    structures: ["The most immediate problem is...", "This is compounded by...", "Addressing it requires..."],
    ideas: ["Hanoi and HCMC traffic", "Flooding", "Public transport investment"],
    model:
      "The most immediate problem is that growth **puts a strain on infrastructure** faster than governments can build it - hence daily gridlock and flooding in Ho Chi Minh City. This is compounded by a **housing shortage** that pushes workers to the outskirts, creating **urban sprawl** and longer commutes, which in turn worsens **air pollution**. Addressing it requires planning transport before the apartment blocks go up, not afterwards.",
  },
  {
    id: "pz3-rural-decline",
    topic: "Cities",
    question: "Why do young people move away from rural areas?",
    vocab: [
      ["Limited job prospects", "Ít cơ hội việc làm"],
      ["Rural-urban migration", "Di cư nông thôn ra thành thị"],
      ["Brain drain", "Chảy máu chất xám"],
      ["Standard of living", "Mức sống"],
    ],
    structures: ["The obvious driver is...", "Beyond money, there's also...", "Reversing this would mean..."],
    ideas: ["Wages", "Entertainment and services", "Remote work potential"],
    model:
      "The obvious driver is **limited job prospects**: farming incomes are unstable and most graduates cannot use their degree in a village. Beyond money, young people want the hospitals, universities and social life that raise their **standard of living**. The result is a **brain drain** that leaves an ageing population behind. Reversing **rural-urban migration** would mean bringing genuine opportunities - internet infrastructure, small industry - to the provinces.",
  },
  {
    id: "pz3-tourism-culture",
    topic: "Tourism",
    question: "How does tourism affect local culture?",
    vocab: [
      ["Cultural preservation", "Bảo tồn văn hóa"],
      ["Commercialisation", "Thương mại hóa"],
      ["Authenticity", "Tính chân thực"],
      ["Cross-cultural exchange", "Giao lưu văn hóa"],
    ],
    structures: ["It cuts both ways.", "On the positive side...", "The danger, though, is that..."],
    ideas: ["Craft villages", "Staged performances", "Revenue for restoration"],
    model:
      "It cuts both ways. On the positive side, tourist money funds **cultural preservation** - many craft villages survive only because visitors buy their work - and genuine **cross-cultural exchange** takes place. The danger is **commercialisation**: when a ritual becomes a nightly show, it loses its **authenticity** and the community performs an identity rather than living it. The outcome depends largely on whether locals control the industry or outsiders do.",
  },
  {
    id: "pz3-env-individual",
    topic: "Environment",
    question: "Should individuals or governments take responsibility for the environment?",
    vocab: [
      ["Regulation", "Quy định pháp luật"],
      ["Carbon footprint", "Dấu chân carbon"],
      ["Collective action", "Hành động tập thể"],
      ["Incentive", "Ưu đãi khuyến khích"],
    ],
    structures: ["Realistically, both, but not equally.", "Individuals can only...", "Governments, by contrast, can..."],
    ideas: ["Recycling vs industry emissions", "Carbon tax", "Public transport"],
    model:
      "Realistically both, but not equally. Individuals can reduce their **carbon footprint** by cycling or eating less meat, yet that's marginal when a handful of industries produce most emissions. Governments, by contrast, can use **regulation** and **incentives** - carbon pricing, subsidised solar - to make the sustainable choice the cheap one. So personal effort matters symbolically, but only **collective action** through policy changes the numbers.",
  },
  {
    id: "pz3-plastic",
    topic: "Environment",
    question: "What can be done to reduce plastic waste?",
    vocab: [
      ["Single-use plastic", "Nhựa dùng một lần"],
      ["To phase out", "Loại bỏ dần"],
      ["Recycling infrastructure", "Hạ tầng tái chế"],
      ["Deposit scheme", "Chương trình đặt cọc vỏ chai"],
    ],
    structures: ["Three measures would help.", "First and most obviously,...", "None of this works without..."],
    ideas: ["Bans and charges", "Bottle return", "Consumer habits"],
    model:
      "Three measures would help. First, governments should **phase out** **single-use plastic** bags and straws, as several countries have done successfully. Second, a **deposit scheme** on bottles works remarkably well - Finland recovers over ninety per cent that way. Third, investment in **recycling infrastructure**, because sorting waste at home is pointless if it all goes to the same landfill. None of this works without consistent enforcement.",
  },
  {
    id: "pz3-climate-poor",
    topic: "Environment",
    question: "Why is climate change harder for developing countries to deal with?",
    vocab: [
      ["Vulnerable to", "Dễ bị tổn thương bởi"],
      ["Adaptation costs", "Chi phí thích ứng"],
      ["Competing priorities", "Ưu tiên cạnh tranh nhau"],
      ["Climate finance", "Tài chính khí hậu"],
    ],
    structures: ["The unfairness is striking:...", "They also face...", "That's why international..."],
    ideas: ["Mekong Delta salinity", "Limited budgets", "Historical emissions"],
    model:
      "The unfairness is striking: countries that emitted least are most **vulnerable to** the consequences. Vietnam's Mekong Delta is a clear case, with salt water destroying rice land. They also face **competing priorities** - a government must choose between sea walls, hospitals and schools - and the **adaptation costs** run into billions. That's why **climate finance** from wealthy nations isn't charity so much as an overdue bill.",
  },
  {
    id: "pz3-family-change",
    topic: "Family",
    question: "How have family structures changed in your country?",
    vocab: [
      ["Extended family", "Đại gia đình"],
      ["Nuclear family", "Gia đình hạt nhân"],
      ["Ageing population", "Dân số già hóa"],
      ["Gender roles", "Vai trò giới"],
    ],
    structures: ["The biggest shift has been...", "Alongside that,...", "The consequence is that..."],
    ideas: ["Three generations under one roof", "Working mothers", "Elderly care"],
    model:
      "The biggest shift has been from the **extended family** to the **nuclear family** in cities - young couples now rent their own apartment instead of living with parents. Alongside that, **gender roles** have loosened; both partners typically work. The consequence, given an **ageing population**, is that caring for grandparents has become a real problem, since the traditional arrangement that solved it no longer exists.",
  },
  {
    id: "pz3-elderly-care",
    topic: "Society",
    question: "Who should look after elderly people - families or the state?",
    vocab: [
      ["Filial duty", "Đạo hiếu"],
      ["Care home", "Viện dưỡng lão"],
      ["Pension system", "Hệ thống hưu trí"],
      ["To bear the burden", "Gánh vác"],
    ],
    structures: ["Culturally in Vietnam, the answer has always been...", "However, that model is under pressure because...", "A realistic solution combines..."],
    ideas: ["Confucian values", "Migration of children", "Home-care services"],
    model:
      "Culturally in Vietnam the answer has always been the family - **filial duty** is deeply held and **care homes** still carry a stigma. However, that model is under pressure: children migrate for work and families are smaller, so one person may **bear the burden** alone. A realistic solution combines both, with a stronger **pension system** and subsidised home-care visits that let elderly people stay at home without exhausting their children.",
  },
  {
    id: "pz3-media-trust",
    topic: "Media",
    question: "Why do people trust social media more than traditional news?",
    vocab: [
      ["Echo chamber", "Buồng vọng thông tin"],
      ["Misinformation", "Thông tin sai lệch"],
      ["Gatekeeping", "Kiểm soát nội dung"],
      ["Immediacy", "Tính tức thời"],
    ],
    structures: ["Partly it's about speed:...", "There's also a perception that...", "The cost of this shift is..."],
    ideas: ["Algorithms", "Distrust of institutions", "Fact-checking"],
    model:
      "Partly it's about **immediacy** - a video appears within minutes, while a newspaper takes a day. There's also a perception that traditional outlets are subject to **gatekeeping** and vested interests, whereas an ordinary person seems authentic. The cost of this shift is severe: algorithms build an **echo chamber** around each user and **misinformation** spreads faster than any correction. Media literacy in schools is now as important as maths.",
  },
  {
    id: "pz3-advertising-children",
    topic: "Media",
    question: "Should advertising aimed at children be restricted?",
    vocab: [
      ["Impressionable", "Dễ bị tác động"],
      ["Pester power", "Sức ép vòi vĩnh của trẻ"],
      ["To ban outright", "Cấm hoàn toàn"],
      ["Junk food", "Đồ ăn vặt kém lành mạnh"],
    ],
    structures: ["I'd argue strongly that it should.", "The justification is that...", "A total ban may be excessive, but..."],
    ideas: ["Obesity", "Sweden's model", "Online influencers"],
    model:
      "I'd argue strongly that it should. The justification is that young children are **impressionable** and cannot recognise persuasion, so advertising exploits **pester power** to reach parents. The link between **junk food** marketing and childhood obesity is well documented. A total ban may be excessive for all products, but I'd certainly **ban outright** the advertising of sugary food during children's programming and on platforms popular with under-thirteens.",
  },
  {
    id: "pz3-globalisation-language",
    topic: "Language",
    question: "Is the dominance of English a good thing?",
    vocab: [
      ["Lingua franca", "Ngôn ngữ chung"],
      ["Linguistic diversity", "Đa dạng ngôn ngữ"],
      ["Endangered language", "Ngôn ngữ có nguy cơ biến mất"],
      ["Level of access", "Mức độ tiếp cận"],
    ],
    structures: ["There are undeniable benefits.", "The counterargument concerns...", "Ideally we'd have..."],
    ideas: ["Science publishing", "Minority languages", "Bilingual education"],
    model:
      "There are undeniable benefits: a **lingua franca** gives researchers and businesses in Vietnam the same **level of access** to information as anyone in London. The counterargument concerns **linguistic diversity** - when parents see no economic value in a minority language, it can become an **endangered language** within two generations. Ideally we'd treat English as a practical tool while funding education in local languages, rather than letting one replace the other.",
  },
  {
    id: "pz3-culture-globalisation",
    topic: "Culture",
    question: "Is globalisation making cultures too similar?",
    vocab: [
      ["Cultural homogenisation", "Đồng nhất văn hóa"],
      ["Local identity", "Bản sắc địa phương"],
      ["To adapt rather than adopt", "Bản địa hóa thay vì sao chép"],
      ["Hybrid culture", "Văn hóa lai"],
    ],
    structures: ["Superficially, yes.", "Look closer, though, and...", "So I'd describe the result as..."],
    ideas: ["Global brands", "Localised menus", "K-pop influence"],
    model:
      "Superficially yes - the same coffee chains and clothing brands appear in every city. Look closer, though, and communities **adapt rather than adopt**: the menu in a Vietnamese branch of a global chain includes rice dishes, and young people mix K-pop fashion with ao dai at Tet. So I'd describe the result less as **cultural homogenisation** than as **hybrid culture**, where **local identity** survives by absorbing outside influences.",
  },
  {
    id: "pz3-money-happiness",
    topic: "Money",
    question: "Does having more money make people happier?",
    vocab: [
      ["Diminishing returns", "Lợi ích giảm dần"],
      ["Financial security", "An toàn tài chính"],
      ["Materialism", "Chủ nghĩa vật chất"],
      ["To keep up with the Joneses", "Đua đòi bằng bạn bằng bè"],
    ],
    structures: ["Up to a point, clearly yes.", "Beyond that threshold, however,...", "What matters more seems to be..."],
    ideas: ["Poverty and stress", "Comparison culture", "Relationships"],
    model:
      "Up to a point, clearly yes: **financial security** removes the constant stress of rent and medical bills, which is a huge source of unhappiness. Beyond that threshold there are **diminishing returns** - a second car adds very little. In fact **materialism** can reduce wellbeing when people **keep up with the Joneses** on social media. What matters more seems to be relationships, health and a sense of purpose.",
  },
  {
    id: "pz3-consumer-society",
    topic: "Money",
    question: "Why do people buy things they do not need?",
    vocab: [
      ["Impulse purchase", "Mua sắm bốc đồng"],
      ["Status symbol", "Biểu tượng địa vị"],
      ["Targeted advertising", "Quảng cáo nhắm đối tượng"],
      ["Retail therapy", "Mua sắm giải sầu"],
    ],
    structures: ["Several forces are at work.", "Psychologically,...", "Commercially,..."],
    ideas: ["Emotional shopping", "One-click buying", "Influencers"],
    model:
      "Several forces are at work. Psychologically, shopping delivers a quick reward, so people use **retail therapy** to handle boredom or stress, and possessions double as a **status symbol** signalling success. Commercially, **targeted advertising** and one-click payment remove every barrier between wanting and owning, which massively increases **impulse purchases**. Fifty years ago you at least had to travel to a shop and carry cash.",
  },
  {
    id: "pz3-health-prevention",
    topic: "Health",
    question: "Should governments spend more on preventing illness than treating it?",
    vocab: [
      ["Preventive healthcare", "Y tế dự phòng"],
      ["Cost-effective", "Hiệu quả chi phí"],
      ["Public health campaign", "Chiến dịch y tế cộng đồng"],
      ["To ease the burden on hospitals", "Giảm tải cho bệnh viện"],
    ],
    structures: ["Economically the case is overwhelming.", "The political difficulty is that...", "A sensible balance would be..."],
    ideas: ["Vaccination", "Smoking and diet", "Visible results"],
    model:
      "Economically the case for **preventive healthcare** is overwhelming: vaccination and screening are far more **cost-effective** than treating advanced disease, and they **ease the burden on hospitals**. The political difficulty is that prevention is invisible - no minister wins votes for illnesses that never happened, whereas a new hospital can be opened on television. A sensible balance would ring-fence a fixed share of the budget for **public health campaigns** so it can't be raided each year.",
  },
  {
    id: "pz3-fitness-culture",
    topic: "Health",
    question: "Why are more young people interested in fitness nowadays?",
    vocab: [
      ["Sedentary lifestyle", "Lối sống ít vận động"],
      ["Body image", "Hình ảnh cơ thể"],
      ["Health awareness", "Nhận thức về sức khỏe"],
      ["To take up a routine", "Bắt đầu một thói quen tập luyện"],
    ],
    structures: ["One reason is simply...", "Social media plays a double role here:...", "I'd say the trend is broadly positive, provided..."],
    ideas: ["Desk jobs", "Instagram", "Gym accessibility"],
    model:
      "One reason is simply reaction: most young people now have a **sedentary lifestyle** at a desk, so exercise has to be deliberate. **Health awareness** has also risen sharply since the pandemic. Social media plays a double role - it motivates people to **take up a routine**, but it also promotes an unrealistic **body image** that can tip into obsession. I'd say the trend is positive provided the motivation is health rather than appearance.",
  },
  {
    id: "pz3-transport-future",
    topic: "Transport",
    question: "How could cities reduce their traffic problems?",
    vocab: [
      ["Congestion charge", "Phí ùn tắc"],
      ["Mass transit", "Giao thông công cộng khối lượng lớn"],
      ["Park and ride", "Bãi đỗ chuyển tiếp"],
      ["Disincentive", "Biện pháp hạn chế"],
    ],
    structures: ["There's no single fix, but...", "The stick approach would be...", "Crucially, the alternative must exist first."],
    ideas: ["Metro lines", "London congestion charge", "Cycling lanes"],
    model:
      "There's no single fix, but the carrot must come before the stick. Cities need reliable **mass transit** - metro lines and frequent buses - plus **park and ride** sites on the outskirts. Once a genuine alternative exists, a **congestion charge** works as an effective **disincentive**, as London showed. Introducing the charge first, while the buses are still unusable, simply punishes people who have no other option.",
  },
  {
    id: "pz3-travel-benefit",
    topic: "Travel",
    question: "What do people gain from travelling to other countries?",
    vocab: [
      ["To broaden one's outlook", "Mở rộng tầm nhìn"],
      ["Culture shock", "Sốc văn hóa"],
      ["Tolerance", "Sự khoan dung"],
      ["Firsthand experience", "Trải nghiệm trực tiếp"],
    ],
    structures: ["The most valuable gain is...", "There's also a practical dimension:...", "That said, it depends how you travel."],
    ideas: ["Stereotypes challenged", "Language practice", "Package tours vs independent travel"],
    model:
      "The most valuable gain is perspective: **firsthand experience** of another society challenges stereotypes in a way no documentary can, and even **culture shock** teaches **tolerance**. There's a practical dimension too - languages, independence, problem solving. That said, it depends how you travel; two weeks in a resort **broadens your outlook** far less than a month living among locals and using public transport.",
  },
  {
    id: "pz3-technology-children",
    topic: "Technology",
    question: "At what age should children be given a smartphone?",
    vocab: [
      ["Screen time", "Thời gian dùng màn hình"],
      ["Parental controls", "Kiểm soát của phụ huynh"],
      ["Online safety", "An toàn trên mạng"],
      ["Peer pressure", "Áp lực bạn bè"],
    ],
    structures: ["I'd suggest around..., with conditions.", "The argument for waiting is...", "The counter-pressure comes from..."],
    ideas: ["Contacting parents", "Cyberbullying", "Basic phone alternative"],
    model:
      "I'd suggest around twelve or thirteen, with conditions. The argument for waiting is **online safety**: younger children can't easily judge strangers or handle cyberbullying, and unlimited **screen time** displaces sleep and play. The counter-pressure comes from **peer pressure** - a child without a group chat is genuinely excluded. A reasonable compromise is a basic phone for calls at primary age, then a smartphone with **parental controls** and agreed rules in secondary school.",
  },
  {
    id: "pz3-social-skills",
    topic: "Society",
    question: "Are people's social skills declining because of technology?",
    vocab: [
      ["Face-to-face interaction", "Giao tiếp trực tiếp"],
      ["Non-verbal cues", "Tín hiệu phi ngôn ngữ"],
      ["Social anxiety", "Lo âu xã hội"],
      ["To be overstated", "Bị thổi phồng"],
    ],
    structures: ["The claim is often **overstated**, but there's something in it.", "Where I do see a real effect is...", "On the other hand, technology has also..."],
    ideas: ["Restaurant scene", "Introverts connecting", "Job interviews"],
    model:
      "The claim is often **overstated**, but there's something in it. Where I see a real effect is in tolerance for discomfort: young people avoid phone calls and small talk, so **non-verbal cues** get less practice and mild **social anxiety** becomes normal. On the other hand, technology has enabled **face-to-face interaction** that wouldn't otherwise happen - I met my closest study group online. It's a change in the balance of skills rather than a straightforward decline.",
  },
  {
    id: "pz3-volunteering",
    topic: "Society",
    question: "Should young people be encouraged to do voluntary work?",
    vocab: [
      ["Civic responsibility", "Trách nhiệm công dân"],
      ["Soft skills", "Kỹ năng mềm"],
      ["Compulsory", "Bắt buộc"],
      ["Sense of purpose", "Cảm giác có mục đích"],
    ],
    structures: ["Encouraged, certainly - **compulsory**, I'm less sure.", "The benefits run both ways:...", "The risk of forcing it is that..."],
    ideas: ["CV value", "Community need", "Genuine motivation"],
    model:
      "Encouraged, certainly - **compulsory**, I'm less sure. The benefits run both ways: communities get help they can't pay for, while students develop **soft skills** such as teamwork and communication, plus a **sense of purpose** and genuine **civic responsibility**. The risk of forcing it is that volunteering becomes a box to tick; students turn up resentfully and the organisation spends more time supervising than it gains. Strong incentives, such as university credit, work better than obligation.",
  },
  {
    id: "pz3-crime-prevention",
    topic: "Society",
    question: "Is punishment or education more effective in reducing crime?",
    vocab: [
      ["Deterrent", "Biện pháp răn đe"],
      ["Rehabilitation", "Cải tạo, phục hồi"],
      ["Reoffending", "Tái phạm"],
      ["Root causes", "Nguyên nhân gốc rễ"],
    ],
    structures: ["Evidence tends to favour...", "Punishment does act as a **deterrent** for..., but...", "Tackling the **root causes** means..."],
    ideas: ["Prison rates", "Poverty and unemployment", "Nordic model"],
    model:
      "Evidence tends to favour education and **rehabilitation**. Punishment does act as a **deterrent** for calculated crimes such as fraud, but harsh sentences do little for offences driven by poverty or addiction, and countries with the longest sentences often have the highest **reoffending** rates. Tackling the **root causes** - schooling, employment, mental health support - is slower and less popular politically, yet Nordic prison systems suggest it produces far better long-term results.",
  },
  {
    id: "pz3-art-funding",
    topic: "Art",
    question: "Should governments fund the arts when there are other priorities?",
    vocab: [
      ["Public funding", "Ngân sách nhà nước"],
      ["Cultural heritage", "Di sản văn hóa"],
      ["Intangible benefit", "Lợi ích vô hình"],
      ["To generate revenue", "Tạo doanh thu"],
    ],
    structures: ["I'd argue yes, though not unconditionally.", "The purely economic case is that...", "The stronger argument, though, is..."],
    ideas: ["Museums and tourism", "Water puppetry", "Education value"],
    model:
      "I'd argue yes, though not unconditionally. The purely economic case is decent: museums and festivals **generate revenue** through tourism, and Vietnam's water puppetry attracts visitors precisely because it was preserved. The stronger argument is that **cultural heritage** and creativity are **intangible benefits** no market will pay for in advance - if the state doesn't fund a traditional music school, it disappears within a generation. Funding should simply come with public access requirements.",
  },
  {
    id: "pz3-creativity-schools",
    topic: "Education",
    question: "How can schools encourage creativity?",
    vocab: [
      ["Open-ended task", "Bài tập mở"],
      ["To think outside the box", "Tư duy đột phá"],
      ["Fear of failure", "Nỗi sợ thất bại"],
      ["Project-based learning", "Học theo dự án"],
    ],
    structures: ["The first step is removing...", "Practically, that means...", "It also requires assessment that..."],
    ideas: ["Group projects", "Arts subjects", "Teacher training"],
    model:
      "The first step is removing the **fear of failure**, because students who are punished for wrong answers stop taking risks. Practically that means more **open-ended tasks** and **project-based learning**, where several solutions are acceptable and the process is discussed. It also requires assessment that rewards originality rather than matching a model answer, and teachers who are trained - and permitted - to leave the textbook when a class wants to **think outside the box**.",
  },
  {
    id: "pz3-competition-cooperation",
    topic: "Society",
    question: "Is competition or cooperation more valuable for young people?",
    vocab: [
      ["Healthy competition", "Cạnh tranh lành mạnh"],
      ["Collaborative skills", "Kỹ năng hợp tác"],
      ["To bring out the best in someone", "Khơi dậy tiềm năng"],
      ["Cut-throat", "Khốc liệt"],
    ],
    structures: ["They're less opposed than people assume.", "**Healthy competition** can...", "However, once it becomes **cut-throat**,..."],
    ideas: ["Sport", "Exam rankings", "Workplace teams"],
    model:
      "They're less opposed than people assume. **Healthy competition** can **bring out the best in someone** - in sport it raises standards and teaches resilience. However, once it becomes **cut-throat**, as with public exam rankings here, students hide notes from each other and anxiety soars. Since almost every real job depends on **collaborative skills**, I'd weight school life towards cooperation and use competition mainly in low-stakes settings.",
  },
  {
    id: "pz3-heritage-buildings",
    topic: "Culture",
    question: "Is it worth preserving old buildings in modern cities?",
    vocab: [
      ["Architectural heritage", "Di sản kiến trúc"],
      ["To demolish", "Phá dỡ"],
      ["Restoration", "Trùng tu"],
      ["Sense of place", "Bản sắc nơi chốn"],
    ],
    structures: ["In most cases, yes.", "The counterargument is about...", "A pragmatic approach is..."],
    ideas: ["French villas in Hanoi", "Land value", "Adaptive reuse"],
    model:
      "In most cases yes. **Architectural heritage** gives a city its **sense of place** - Hanoi without its French villas and shophouses would be indistinguishable from any new district. The counterargument is about land value and cost: **restoration** is expensive and central plots are worth a fortune, so developers prefer to **demolish**. A pragmatic approach is adaptive reuse - turning old buildings into cafes, galleries or offices so that they earn their keep instead of standing empty.",
  },
];

export const SPEAKING_PRACTICE_EXPANSION_3: { part3: SpeakingPracticeQuestion[] } = {
  part3: build2(3, p3),
};
