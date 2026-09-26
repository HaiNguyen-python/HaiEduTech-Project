// Extra IELTS Writing Task 2 prompts across common exam themes.
import type { WritingPrompt } from "./ieltsWritingPrompts";

type ET = NonNullable<WritingPrompt["essayType"]>;

const GUIDE: Record<ET, string[]> = {
  opinion: ["Introduction: Paraphrase the statement and give a clear position.", "Body 1: Main reason for your view, explained and supported with an example.", "Body 2: Second reason, or the opposing view and why it is weaker.", "Conclusion: Restate your position in new words."],
  discussion: ["Introduction: Paraphrase both views and say you will discuss them and give your opinion.", "Body 1: Explain the first view with reasons and an example.", "Body 2: Explain the second view with reasons and an example.", "Conclusion: Summarise both sides and state which you support."],
  "advantage-disadvantage": ["Introduction: Paraphrase the topic and answer the exact question asked.", "Body 1: Main advantages with explanation and example.", "Body 2: Main disadvantages with explanation and example.", "Conclusion: Weigh them up and give a clear judgement."],
  "problem-solution": ["Introduction: Paraphrase the issue and outline that you will give causes or problems and solutions.", "Body 1: Two main causes or problems, each developed.", "Body 2: A matching solution for each, with who should act.", "Conclusion: Summarise and stress the most effective measure."],
  "direct-question": ["Introduction: Paraphrase the topic and give short answers to both questions.", "Body 1: Fully answer question one with reasons and examples.", "Body 2: Fully answer question two with reasons and examples.", "Conclusion: Restate both answers briefly."],
};

function p(id: string, essayType: ET, prompt: string, vocab: string[], ideas: string[]): WritingPrompt {
  return { id, taskType: 2, essayType, prompt, writingGuide: GUIDE[essayType], vocabularyBank: vocab, brainstormingIdeas: ideas };
}

export const task2ExtraPrompts: WritingPrompt[] = [
  // Opinion
  p("t2-op-7", "opinion", "Some people think that all university students should study whatever they like. Others believe they should only be allowed to study subjects that will be useful in the future, such as those related to science and technology. To what extent do you agree or disagree that students should only study useful subjects?",
    ["labour market demand (nhu cầu thị trường lao động)", "intrinsic motivation (động lực nội tại)", "the humanities (khối ngành nhân văn)", "skills shortage (thiếu hụt kỹ năng)", "well-rounded (toàn diện)", "academic freedom (tự do học thuật)"],
    ["Passion leads to better results.", "Economies need engineers and doctors.", "Arts subjects build creativity and critical thinking.", "Future jobs are hard to predict."]),
  p("t2-op-8", "opinion", "Governments should spend money on railways rather than roads. To what extent do you agree or disagree with this statement?",
    ["public infrastructure (hạ tầng công cộng)", "carbon footprint (lượng khí thải carbon)", "traffic congestion (ùn tắc giao thông)", "rural connectivity (kết nối nông thôn)", "long-term investment (đầu tư dài hạn)", "freight transport (vận tải hàng hóa)"],
    ["Trains move many people with low emissions.", "Rural areas depend on roads.", "Rail reduces congestion in cities.", "A balance may be most realistic."]),

  // Discussion
  p("t2-disc-3", "discussion", "Some people believe that working from home benefits both employees and companies, while others think that working in an office is more productive. Discuss both views and give your own opinion.",
    ["remote working (làm việc từ xa)", "work-life balance (cân bằng công việc - cuộc sống)", "face-to-face collaboration (hợp tác trực tiếp)", "overhead costs (chi phí vận hành)", "social isolation (cô lập xã hội)", "hybrid model (mô hình kết hợp)"],
    ["No commute saves time and money.", "Offices support teamwork and training.", "Companies save on rent.", "Loneliness and blurred boundaries at home."]),
  p("t2-disc-4", "discussion", "Some people think that the best way to reduce crime is to give longer prison sentences. Others believe there are better alternative ways of reducing crime. Discuss both views and give your opinion.",
    ["deterrent (biện pháp răn đe)", "rehabilitation (cải tạo)", "reoffending rate (tỷ lệ tái phạm)", "root causes (nguyên nhân gốc rễ)", "community service (lao động công ích)", "youth programmes (chương trình cho thanh thiếu niên)"],
    ["Long sentences keep criminals off the streets.", "Prisons can be schools of crime.", "Education and jobs address causes.", "Rehabilitation lowers reoffending."]),
  p("t2-disc-5", "discussion", "Some people believe that museums and art galleries should be free for everyone, while others think visitors should pay an entrance fee. Discuss both views and give your opinion.",
    ["cultural heritage (di sản văn hóa)", "public access (tiếp cận công cộng)", "maintenance costs (chi phí bảo trì)", "state subsidy (trợ cấp nhà nước)", "social inclusion (hòa nhập xã hội)", "admission fee (phí vào cửa)"],
    ["Free entry allows everyone to learn.", "Fees fund conservation.", "Tourists could pay while locals enter free.", "Taxes already pay for public museums."]),
  p("t2-disc-6", "discussion", "Some people think that parents should teach children how to be good members of society. Others, however, believe that school is the place to learn this. Discuss both views and give your opinion.",
    ["moral values (giá trị đạo đức)", "role model (hình mẫu)", "civic education (giáo dục công dân)", "upbringing (sự nuôi dạy)", "peer influence (ảnh hưởng bạn bè)", "social responsibility (trách nhiệm xã hội)"],
    ["Parents are the first role models.", "Schools teach cooperation in groups.", "Not all parents have time.", "Both are needed together."]),
  p("t2-disc-7", "discussion", "Some people believe that space exploration is a waste of money, while others think it brings important benefits to humanity. Discuss both views and give your opinion.",
    ["technological spin-offs (ứng dụng công nghệ phát sinh)", "pressing issues (vấn đề cấp bách)", "satellite technology (công nghệ vệ tinh)", "public funding (ngân sách công)", "scientific breakthrough (đột phá khoa học)", "opportunity cost (chi phí cơ hội)"],
    ["Money could fight poverty or disease.", "GPS and weather forecasts come from space research.", "Inspires young scientists.", "Private companies now share the cost."]),
  p("t2-disc-8", "discussion", "Some people think that it is better to live in a big city, while others prefer to live in the countryside. Discuss both views and give your opinion.",
    ["amenities (tiện ích)", "cost of living (chi phí sinh hoạt)", "pace of life (nhịp sống)", "job opportunities (cơ hội việc làm)", "air pollution (ô nhiễm không khí)", "close-knit community (cộng đồng gắn bó)"],
    ["Cities offer jobs, hospitals and culture.", "Countryside is calmer and healthier.", "Housing is cheaper outside cities.", "Remote work changes the choice."]),

  // Advantage / disadvantage
  p("t2-adv-3", "advantage-disadvantage", "More and more people are using online banking and cashless payments instead of cash. Do the advantages of this development outweigh the disadvantages?",
    ["cashless society (xã hội không tiền mặt)", "convenience (sự tiện lợi)", "cyber fraud (lừa đảo mạng)", "digital exclusion (loại trừ số)", "transaction record (lịch sử giao dịch)", "financial inclusion (tài chính toàn diện)"],
    ["Fast and convenient payments.", "Less theft of cash.", "Older people may be excluded.", "Risk of hacking and overspending."]),
  p("t2-adv-4", "advantage-disadvantage", "In some countries, young people take a gap year between finishing school and starting university to travel or work. What are the advantages and disadvantages of this?",
    ["gap year (năm nghỉ chuyển tiếp)", "life experience (trải nghiệm sống)", "maturity (sự trưởng thành)", "lose momentum (mất đà học)", "career direction (định hướng nghề)", "financial independence (độc lập tài chính)"],
    ["Gain maturity and work skills.", "Clarify what to study.", "May lose study habits.", "Can be expensive."]),
  p("t2-adv-5", "advantage-disadvantage", "Many people now use artificial intelligence tools to help them write, study and work. Do the advantages of this outweigh the disadvantages?",
    ["artificial intelligence (trí tuệ nhân tạo)", "productivity (năng suất)", "over-reliance (phụ thuộc quá mức)", "academic integrity (liêm chính học thuật)", "misinformation (thông tin sai lệch)", "routine tasks (công việc lặp lại)"],
    ["Saves time on routine tasks.", "Personalised learning support.", "Students may stop thinking for themselves.", "Answers can be wrong."]),
  p("t2-adv-6", "advantage-disadvantage", "Some cities have introduced a charge for private cars entering the city centre. What are the advantages and disadvantages of this policy?",
    ["congestion charge (phí ùn tắc)", "air quality (chất lượng không khí)", "public transport revenue (nguồn thu giao thông công cộng)", "low-income drivers (người lái xe thu nhập thấp)", "local businesses (doanh nghiệp địa phương)", "traffic flow (lưu lượng xe)"],
    ["Less traffic and pollution.", "Money funds buses and trains.", "Unfair to poorer workers.", "Shops may lose customers."]),
  p("t2-adv-7", "advantage-disadvantage", "Nowadays many people choose to buy products from international companies rather than local ones. What are the advantages and disadvantages of this trend?",
    ["globalisation (toàn cầu hóa)", "economies of scale (lợi thế kinh tế nhờ quy mô)", "local producers (nhà sản xuất địa phương)", "consumer choice (lựa chọn của người tiêu dùng)", "cultural homogenisation (đồng nhất văn hóa)", "supply chain (chuỗi cung ứng)"],
    ["Lower prices and consistent quality.", "More choice.", "Local businesses close.", "Loss of cultural variety."]),
  p("t2-adv-8", "advantage-disadvantage", "More and more older people are continuing to work after the traditional retirement age. What are the advantages and disadvantages of this for individuals and society?",
    ["retirement age (tuổi nghỉ hưu)", "institutional knowledge (kinh nghiệm tích lũy)", "pension pressure (áp lực lương hưu)", "youth unemployment (thất nghiệp ở người trẻ)", "mental stimulation (kích thích trí não)", "flexible working (làm việc linh hoạt)"],
    ["Keeps older people active.", "Eases pension costs.", "Fewer jobs for young people.", "Health may suffer."]),

  // Problem / solution
  p("t2-ps-3", "problem-solution", "Many young people today spend too much time on social media. What problems does this cause, and what solutions can you suggest?",
    ["screen time (thời gian dùng màn hình)", "mental health (sức khỏe tâm thần)", "cyberbullying (bắt nạt trên mạng)", "attention span (khả năng tập trung)", "digital literacy (hiểu biết kỹ thuật số)", "parental control (kiểm soát của phụ huynh)"],
    ["Anxiety from comparison with others.", "Poor sleep and concentration.", "Schools can teach digital habits.", "Apps can limit usage time."]),
  p("t2-ps-4", "problem-solution", "In many cities, housing has become too expensive for young people. What are the causes of this problem, and what measures could be taken to solve it?",
    ["housing affordability (khả năng chi trả nhà ở)", "property speculation (đầu cơ bất động sản)", "social housing (nhà ở xã hội)", "urban migration (di cư ra đô thị)", "rent control (kiểm soát giá thuê)", "supply shortage (thiếu nguồn cung)"],
    ["Population moves to cities.", "Investors buy homes as assets.", "Build more affordable housing.", "Tax empty homes."]),
  p("t2-ps-5", "problem-solution", "Plastic waste is polluting oceans around the world. What are the causes of this, and what can be done to reduce it?",
    ["single-use plastic (nhựa dùng một lần)", "marine life (sinh vật biển)", "waste management (quản lý chất thải)", "biodegradable (phân hủy sinh học)", "deposit scheme (chương trình đặt cọc)", "producer responsibility (trách nhiệm nhà sản xuất)"],
    ["Cheap packaging everywhere.", "Poor waste collection in some countries.", "Ban single-use items.", "Bottle deposit schemes."]),
  p("t2-ps-6", "problem-solution", "In many countries, fewer students are choosing to study science subjects at university. Why is this happening, and what can be done to encourage more students to study science?",
    ["STEM subjects (các môn STEM)", "perceived difficulty (độ khó được cảm nhận)", "hands-on learning (học qua thực hành)", "scholarship (học bổng)", "career prospects (triển vọng nghề nghiệp)", "role models (hình mẫu)"],
    ["Science seen as too hard.", "Poor teaching in schools.", "Scholarships for science students.", "Show real career paths."]),
  p("t2-ps-7", "problem-solution", "Obesity rates among children are rising in many parts of the world. What are the causes, and what can be done to address this problem?",
    ["sedentary lifestyle (lối sống ít vận động)", "processed food (thực phẩm chế biến sẵn)", "sugar tax (thuế đường)", "physical education (giáo dục thể chất)", "school meals (bữa ăn học đường)", "food advertising (quảng cáo thực phẩm)"],
    ["Fast food is cheap and advertised.", "Children play outside less.", "Healthier school meals.", "Limit junk food advertising to children."]),
  p("t2-ps-8", "problem-solution", "Many small shops in town centres are closing down. What are the reasons for this, and how could town centres be kept alive?",
    ["high street (phố mua sắm)", "e-commerce (thương mại điện tử)", "business rates (thuế kinh doanh)", "footfall (lượng khách qua lại)", "mixed-use development (phát triển đa chức năng)", "community events (sự kiện cộng đồng)"],
    ["Online shopping is cheaper.", "High rents and taxes.", "Lower taxes for small shops.", "Turn centres into leisure spaces."]),

  // Direct question
  p("t2-dq-3", "direct-question", "Many people today prefer to read news online rather than in newspapers. Why is this? Will printed newspapers disappear in the future?",
    ["real-time updates (cập nhật tức thì)", "print media (báo in)", "subscription model (mô hình thuê bao)", "credibility (độ tin cậy)", "news aggregator (trang tổng hợp tin)", "niche readership (nhóm độc giả riêng)"],
    ["Online news is free and instant.", "Phones are always with us.", "Some readers still trust print.", "Newspapers may survive in a smaller form."]),
  p("t2-dq-4", "direct-question", "In many countries, people are having children later in life. What are the reasons for this? Is it a positive or negative development?",
    ["delayed parenthood (làm cha mẹ muộn)", "career advancement (thăng tiến sự nghiệp)", "financial stability (ổn định tài chính)", "fertility (khả năng sinh sản)", "birth rate (tỷ lệ sinh)", "emotional maturity (trưởng thành cảm xúc)"],
    ["Longer education and careers.", "High cost of raising children.", "Parents are more mature and stable.", "Health risks and falling birth rates."]),
  p("t2-dq-5", "direct-question", "Some people choose to learn a foreign language by themselves, using apps and online resources. Why do people do this? Is it as effective as studying in a classroom?",
    ["self-study (tự học)", "language app (ứng dụng học ngôn ngữ)", "immediate feedback (phản hồi ngay lập tức)", "speaking practice (luyện nói)", "self-discipline (kỷ luật bản thân)", "flexible schedule (lịch học linh hoạt)"],
    ["Cheap and flexible.", "Learn at your own pace.", "Less speaking practice with real people.", "Needs strong motivation."]),
  p("t2-dq-6", "direct-question", "Many tourists now visit places that are far away from their own country. What are the effects of this on the places they visit? How can negative effects be reduced?",
    ["mass tourism (du lịch đại trà)", "local economy (kinh tế địa phương)", "cultural heritage (di sản văn hóa)", "overtourism (quá tải du lịch)", "eco-tourism (du lịch sinh thái)", "visitor cap (giới hạn du khách)"],
    ["Jobs and income for locals.", "Damage to nature and heritage sites.", "Rising prices for residents.", "Limit numbers and charge tourist taxes."]),
  p("t2-dq-7", "direct-question", "Nowadays, many people do not know their neighbours. Why is this? What can be done to build stronger local communities?",
    ["community spirit (tinh thần cộng đồng)", "urban anonymity (sự vô danh ở đô thị)", "residential mobility (di chuyển chỗ ở)", "neighbourhood association (hội khu phố)", "shared spaces (không gian chung)", "volunteering (tình nguyện)"],
    ["People move house often.", "Long working hours.", "Street events and shared gardens.", "Local online groups."]),
  p("t2-dq-8", "direct-question", "Some people spend a lot of money on celebrations such as weddings and birthday parties. Why do they do this? Is it a good use of money?",
    ["lavish celebration (lễ kỷ niệm xa hoa)", "social pressure (áp lực xã hội)", "status symbol (biểu tượng địa vị)", "lasting memories (kỷ niệm lâu dài)", "financial burden (gánh nặng tài chính)", "tradition (truyền thống)"],
    ["Tradition and family expectations.", "Social media encourages display.", "Creates memories with loved ones.", "Money could go to savings or a home."]),
];
