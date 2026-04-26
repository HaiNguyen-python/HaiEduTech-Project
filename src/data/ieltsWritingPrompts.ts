// Static IELTS Writing prompt bank for fallback and quick access
import { ChartDataConfig } from "@/components/Task1Chart";
import { MapDiagramData, ProcessDiagramData } from "@/components/Task1Visual";

export interface WritingPrompt {
  id: string;
  taskType: 1 | 2;
  essayType?: 'opinion' | 'discussion' | 'advantage-disadvantage' | 'problem-solution' | 'direct-question';
  chartType?: 'bar' | 'line' | 'pie' | 'table' | 'map' | 'process';
  prompt: string;
  writingGuide: string[];
  vocabularyBank: string[];
  brainstormingIdeas: string[];
  imageDescription?: string;
  chartData?: ChartDataConfig;
  mapData?: MapDiagramData;
  processData?: ProcessDiagramData;
}

export const writingPrompts: WritingPrompt[] = [
  // ========== TASK 2 - Opinion ===========
  {
    id: 't2-op-1',
    taskType: 2,
    essayType: 'opinion',
    prompt: 'Some people believe that universities should focus on providing academic knowledge, while others think they should prepare students for employment. To what extent do you agree or disagree?',
    writingGuide: [
      'Introduction: Paraphrase the question and state your opinion clearly.',
      'Body 1: Present your main argument with examples.',
      'Body 2: Discuss the opposing view and refute or partially agree.',
      'Conclusion: Restate your opinion and summarize key points.',
    ],
    vocabularyBank: ['vocational training (đào tạo nghề)', 'employability (khả năng tuyển dụng)', 'theoretical knowledge (kiến thức lý thuyết)', 'practical skills (kỹ năng thực hành)', 'career-oriented (định hướng nghề nghiệp)', 'academic rigour (tính nghiêm ngặt học thuật)', 'work-ready graduates (sinh viên sẵn sàng làm việc)', 'curriculum design (thiết kế chương trình)'],
    brainstormingIdeas: [
      'Universities provide critical thinking skills applicable to any career.',
      'Employers often complain graduates lack practical skills.',
      'Internship programs can bridge the gap between theory and practice.',
      'Some fields (medicine, engineering) need both academic and practical training.',
      'Soft skills like teamwork and communication are increasingly valued by employers.',
      'Research-focused universities drive innovation and economic growth.',
      'Many successful entrepreneurs dropped out - questioning the traditional purpose of university.',
      'A blend of theory and practice produces well-rounded, adaptable graduates.',
      'Government funding often favors academic research over vocational programs.',
      'Online platforms now offer career-specific training more efficiently than universities.',
    ],
  },
  {
    id: 't2-op-2',
    taskType: 2,
    essayType: 'opinion',
    prompt: 'In many countries, the proportion of older people is steadily increasing. Some believe this is a positive development, while others think it is a problem. What is your opinion?',
    writingGuide: [
      'Introduction: Introduce the ageing population trend and state your view.',
      'Body 1: Discuss benefits (experience, wisdom, stability).',
      'Body 2: Address challenges (healthcare costs, workforce shrinkage).',
      'Conclusion: Summarize and give a balanced final opinion.',
    ],
    vocabularyBank: ['ageing population (dân số già hóa)', 'life expectancy (tuổi thọ)', 'pension system (hệ thống lương hưu)', 'demographic shift (thay đổi nhân khẩu học)', 'elderly care (chăm sóc người cao tuổi)', 'workforce participation (tham gia lực lượng lao động)', 'intergenerational (liên thế hệ)', 'social security burden (gánh nặng an sinh xã hội)'],
    brainstormingIdeas: [
      'Older workers bring experience and mentorship to workplaces.',
      'Healthcare and pension costs rise dramatically with an ageing population.',
      'Countries like Japan face severe labour shortages due to demographics.',
      'Technology can assist elderly independence and reduce care costs.',
      'Older populations contribute significantly to volunteering and community stability.',
      'Immigration can offset workforce shortages in ageing societies.',
      'Retirement age may need to increase as life expectancy rises.',
      'Intergenerational programs benefit both young and old populations.',
      'Economic growth tends to slow when the working-age population declines.',
      'Digital literacy training can help elderly people remain independent and connected.',
    ],
  },
  {
    id: 't2-op-3',
    taskType: 2,
    essayType: 'opinion',
    prompt: 'Some people think that children should begin their formal education at a very early age. Others think that children should begin after the age of seven. Discuss both views and give your opinion.',
    writingGuide: [
      'Introduction: Outline the debate and state your position.',
      'Body 1: Arguments for early formal education.',
      'Body 2: Arguments for starting later.',
      'Conclusion: Give your clear opinion with reasoning.',
    ],
    vocabularyBank: ['cognitive development (phát triển nhận thức)', 'play-based learning (học qua chơi)', 'socialisation (xã hội hóa)', 'academic readiness (sẵn sàng học thuật)', 'formative years (những năm hình thành)', 'curriculum pressure (áp lực chương trình)', 'childhood autonomy (quyền tự chủ của trẻ)', 'developmental milestones (cột mốc phát triển)'],
    brainstormingIdeas: [
      'Early education can build strong literacy and numeracy foundations.',
      'Play is essential for creativity, imagination, and emotional growth.',
      'Scandinavian countries start formal education at 7 and rank highly in education.',
      'Academic pressure too early can cause burnout and stress in children.',
      'Different children develop at different rates - one size doesn\'t fit all.',
      'Research shows free play significantly improves problem-solving skills.',
      'Structured preschool programs can reduce inequality in educational outcomes.',
      'Excessive homework at young ages leads to anxiety and family stress.',
      'Cultural factors heavily influence when formal education traditionally starts.',
      'Home learning environments often play a bigger role than school entry age.',
    ],
  },
  {
    id: 't2-op-4',
    taskType: 2,
    essayType: 'opinion',
    prompt: 'Some people think that the government should spend money on building more railway lines for fast trains between cities. Others believe the money should be spent on improving existing public transport. Discuss both views and give your opinion.',
    writingGuide: [
      'Introduction: Paraphrase and state your stance.',
      'Body 1: Benefits of new railway infrastructure.',
      'Body 2: Benefits of improving current public transport.',
      'Conclusion: Summarize and state your preference.',
    ],
    vocabularyBank: ['infrastructure investment (đầu tư hạ tầng)', 'high-speed rail (đường sắt cao tốc)', 'commuter routes (tuyến đường đi lại)', 'urban mobility (giao thông đô thị)', 'sustainable transport (giao thông bền vững)', 'congestion reduction (giảm tắc nghẽn)', 'cost-effective (hiệu quả chi phí)', 'connectivity (khả năng kết nối)'],
    brainstormingIdeas: [
      'High-speed rail reduces domestic flights and carbon emissions significantly.',
      'Existing systems in many cities are overcrowded, delayed, and unreliable.',
      'Building new railway lines is extremely expensive and takes years.',
      'Improving buses and metro serves more commuters on a daily basis.',
      'Rail infrastructure projects create thousands of construction and service jobs.',
      'Better public transport reduces car dependency and urban air pollution.',
      'Rural areas often lack even basic public transport connections.',
      'Successful examples include Japan\'s Shinkansen and France\'s TGV systems.',
      'Maintenance costs for new railways can burden future government budgets.',
      'Electric buses are a cheaper and greener short-term alternative.',
    ],
  },
  {
    id: 't2-op-5',
    taskType: 2,
    essayType: 'opinion',
    prompt: 'Some people believe that technology has made our lives more complex. To what extent do you agree or disagree?',
    writingGuide: [
      'Introduction: State your position on whether technology simplifies or complicates life.',
      'Body 1: Ways technology has simplified life.',
      'Body 2: Ways technology has added complexity.',
      'Conclusion: Weigh both sides and give your opinion.',
    ],
    vocabularyBank: ['digital overload (quá tải kỹ thuật số)', 'automation (tự động hóa)', 'information age (thời đại thông tin)', 'cyber security (an ninh mạng)', 'work-life balance (cân bằng công việc-cuộc sống)', 'streamline processes (hợp lý hóa quy trình)', 'technological dependency (phụ thuộc công nghệ)', 'digital literacy (hiểu biết kỹ thuật số)'],
    brainstormingIdeas: ['Technology automates mundane tasks.', 'Constant connectivity blurs work-life boundaries.', 'Information overload causes decision fatigue.', 'Medical technology saves lives that were previously lost.'],
  },
  {
    id: 't2-op-6',
    taskType: 2,
    essayType: 'opinion',
    prompt: 'In some cultures, children are often told that they can achieve anything if they try hard enough. Is this a positive or negative message to give children?',
    writingGuide: [
      'Introduction: Present the motivational message debate.',
      'Body 1: Positive effects of encouraging ambition.',
      'Body 2: Potential negative impacts (unrealistic expectations).',
      'Conclusion: State whether the message is overall beneficial.',
    ],
    vocabularyBank: ['growth mindset (tư duy phát triển)', 'resilience (khả năng phục hồi)', 'self-efficacy (niềm tin vào bản thân)', 'unrealistic expectations (kỳ vọng phi thực tế)', 'meritocracy (chế độ nhân tài)', 'intrinsic motivation (động lực nội tại)', 'social inequality (bất bình đẳng xã hội)', 'perseverance (sự kiên trì)'],
    brainstormingIdeas: ['Encouragement builds confidence and risk-taking.', 'Ignores systemic barriers (poverty, discrimination).', 'Failure despite effort can damage self-esteem.', 'Balanced messaging acknowledges effort AND circumstances.'],
  },

  // ========== TASK 2 - Discussion ===========
  {
    id: 't2-disc-1',
    taskType: 2,
    essayType: 'discussion',
    prompt: 'Some people think that all teenagers should be required to do unpaid work in their free time to help the local community. Others believe this would be a waste of their time. Discuss both views and give your own opinion.',
    writingGuide: [
      'Introduction: Paraphrase and preview both views.',
      'Body 1: Benefits of mandatory community service.',
      'Body 2: Reasons why it could be counterproductive.',
      'Conclusion: State your opinion with justification.',
    ],
    vocabularyBank: ['civic responsibility (trách nhiệm công dân)', 'community engagement (sự tham gia cộng đồng)', 'volunteer work (công việc tình nguyện)', 'time management (quản lý thời gian)', 'social awareness (nhận thức xã hội)', 'mandatory service (nghĩa vụ bắt buộc)', 'personal development (phát triển cá nhân)', 'exploitation (sự bóc lột)'],
    brainstormingIdeas: ['Builds empathy and social responsibility.', 'Teenagers already face academic pressure.', 'Forced volunteering undermines genuine altruism.', 'Skills gained are transferable to employment.'],
  },
  {
    id: 't2-disc-2',
    taskType: 2,
    essayType: 'discussion',
    prompt: 'Some people think that competitive sports are good for bringing different people and cultures together. Others argue that these events often cause more problems. Discuss both views and give your opinion.',
    writingGuide: [
      'Introduction: Frame the debate around international sporting events.',
      'Body 1: How sports unite people.',
      'Body 2: Problems caused by competitive sports.',
      'Conclusion: Balance your view.',
    ],
    vocabularyBank: ['cultural exchange (giao lưu văn hóa)', 'national pride (niềm tự hào dân tộc)', 'hooliganism (bạo lực trong thể thao)', 'sportsmanship (tinh thần thể thao)', 'diplomacy (ngoại giao)', 'commercialisation (thương mại hóa)', 'doping scandals (bê bối doping)', 'global solidarity (đoàn kết toàn cầu)'],
    brainstormingIdeas: ['Olympics promote international friendship.', 'Rivalries can escalate into nationalism.', 'Host cities face massive debt.', 'Athletes become role models across cultures.'],
  },

  // ========== TASK 2 - Advantage/Disadvantage ===========
  {
    id: 't2-adv-1',
    taskType: 2,
    essayType: 'advantage-disadvantage',
    prompt: 'Many people now work from home rather than travelling to a workplace every day. What are the advantages and disadvantages of this development?',
    writingGuide: [
      'Introduction: Describe the remote work trend.',
      'Body 1: List 2-3 clear advantages with examples.',
      'Body 2: List 2-3 disadvantages with examples.',
      'Conclusion: Summarize and state whether benefits outweigh drawbacks.',
    ],
    vocabularyBank: ['telecommuting (làm việc từ xa)', 'work-life balance (cân bằng công việc-cuộc sống)', 'productivity (năng suất)', 'isolation (sự cô lập)', 'commute reduction (giảm đi lại)', 'digital nomad (du mục kỹ thuật số)', 'collaborative tools (công cụ cộng tác)', 'workplace culture (văn hóa công sở)'],
    brainstormingIdeas: ['No commute saves time and reduces stress.', 'Loneliness and poor mental health from isolation.', 'Flexible schedule benefits parents.', 'Blurred boundaries lead to overworking.'],
  },
  {
    id: 't2-adv-2',
    taskType: 2,
    essayType: 'advantage-disadvantage',
    prompt: 'In some countries, an increasing number of people are choosing to live alone. What are the advantages and disadvantages of living alone?',
    writingGuide: [
      'Introduction: Note the trend toward solo living.',
      'Body 1: Advantages (independence, privacy, personal growth).',
      'Body 2: Disadvantages (loneliness, cost, safety).',
      'Conclusion: Provide a balanced summary.',
    ],
    vocabularyBank: ['autonomy (quyền tự chủ)', 'self-reliance (tự lực)', 'social isolation (cô lập xã hội)', 'financial burden (gánh nặng tài chính)', 'personal space (không gian cá nhân)', 'emotional well-being (sức khỏe tinh thần)', 'solo household (hộ gia đình một người)', 'support network (mạng lưới hỗ trợ)'],
    brainstormingIdeas: ['Full control over daily routine.', 'Higher cost of living without shared expenses.', 'Can lead to loneliness, especially for elderly.', 'Encourages independence and problem-solving.'],
  },

  // ========== TASK 2 - Problem/Solution ===========
  {
    id: 't2-ps-1',
    taskType: 2,
    essayType: 'problem-solution',
    prompt: 'In many cities, the air quality has deteriorated significantly in recent years. What are the causes of this problem? What measures could be taken to solve it?',
    writingGuide: [
      'Introduction: State the problem clearly.',
      'Body 1: Identify 2-3 main causes with evidence.',
      'Body 2: Propose 2-3 practical solutions.',
      'Conclusion: Summarize causes and solutions briefly.',
    ],
    vocabularyBank: ['air pollution (ô nhiễm không khí)', 'emissions (khí thải)', 'fossil fuels (nhiên liệu hóa thạch)', 'respiratory diseases (bệnh hô hấp)', 'green energy (năng lượng xanh)', 'public transport (giao thông công cộng)', 'carbon footprint (dấu chân carbon)', 'environmental regulations (quy định môi trường)'],
    brainstormingIdeas: ['Vehicle emissions and industrial waste.', 'Promote electric vehicles and renewable energy.', 'Implement congestion charges.', 'Plant more urban trees and green spaces.'],
  },
  {
    id: 't2-ps-2',
    taskType: 2,
    essayType: 'problem-solution',
    prompt: 'Many young people today are leaving the countryside to live in cities. What problems does this cause? What solutions can you suggest?',
    writingGuide: [
      'Introduction: Describe rural-to-urban migration.',
      'Body 1: Problems in rural areas and cities.',
      'Body 2: Possible solutions to reverse the trend.',
      'Conclusion: Brief summary of key points.',
    ],
    vocabularyBank: ['urbanisation (đô thị hóa)', 'rural depopulation (giảm dân số nông thôn)', 'brain drain (chảy máu chất xám)', 'infrastructure strain (quá tải hạ tầng)', 'agricultural decline (suy giảm nông nghiệp)', 'job opportunities (cơ hội việc làm)', 'decentralisation (phân quyền)', 'remote work incentives (ưu đãi làm việc từ xa)'],
    brainstormingIdeas: ['Rural areas lose young workforce.', 'Cities become overcrowded with housing shortages.', 'Government can create rural job incentives.', 'Improve internet and services in countryside.'],
  },

  // ========== TASK 2 - Direct Question ===========
  {
    id: 't2-dq-1',
    taskType: 2,
    essayType: 'direct-question',
    prompt: 'Nowadays, more and more people decide to have children later in life. Why is this the case? Do the advantages outweigh the disadvantages?',
    writingGuide: [
      'Introduction: Note the trend and preview your answer structure.',
      'Body 1: Explain 2-3 reasons for delayed parenthood.',
      'Body 2: Discuss whether advantages outweigh disadvantages.',
      'Conclusion: State your final assessment.',
    ],
    vocabularyBank: ['delayed parenthood (trì hoãn sinh con)', 'career progression (thăng tiến nghề nghiệp)', 'financial stability (ổn định tài chính)', 'fertility challenges (thách thức sinh sản)', 'emotional maturity (trưởng thành cảm xúc)', 'family planning (kế hoạch hóa gia đình)', 'societal pressure (áp lực xã hội)', 'childcare costs (chi phí chăm sóc trẻ)'],
    brainstormingIdeas: ['Career and financial stability before children.', 'Higher risk of complications with age.', 'More emotionally prepared parents.', 'Less energy for active parenting.'],
  },
  {
    id: 't2-dq-2',
    taskType: 2,
    essayType: 'direct-question',
    prompt: 'Many people prefer to shop online rather than in stores. Why is this happening? Is this a positive or negative development?',
    writingGuide: [
      'Introduction: Describe the shift to online shopping.',
      'Body 1: Reasons for the popularity of online shopping.',
      'Body 2: Evaluate whether this is positive or negative.',
      'Conclusion: Give your final assessment.',
    ],
    vocabularyBank: ['e-commerce (thương mại điện tử)', 'consumer behaviour (hành vi tiêu dùng)', 'convenience (sự tiện lợi)', 'brick-and-mortar (cửa hàng truyền thống)', 'price comparison (so sánh giá)', 'impulse buying (mua sắm bốc đồng)', 'delivery logistics (hậu cần giao hàng)', 'high street decline (suy giảm phố thương mại)'],
    brainstormingIdeas: ['Convenience of shopping from home 24/7.', 'Local shops struggle to compete.', 'Environmental cost of packaging and delivery.', 'Greater product variety and price transparency.'],
  },

  // ========== TASK 1 - Charts & Visuals (with dynamic chart data) ===========
  {
    id: 't1-bar-1',
    taskType: 1,
    chartType: 'bar',
    prompt: 'The bar chart below shows the percentage of households in a country that owned different types of technology between 2000 and 2020. Summarise the information by selecting and reporting the main features and make comparisons where relevant.',
    imageDescription: 'Bar chart with 5 grouped bars for years 2000, 2005, 2010, 2015, 2020. Categories: Desktop Computer, Laptop, Smartphone, Tablet, Smart TV.',
    chartData: {
      chart_type: "bar",
      title: "Household Technology Ownership (%) - 2000–2020",
      x_axis: "Year",
      y_axis: "Percentage (%)",
      series: ["Desktop", "Laptop", "Smartphone", "Tablet", "Smart TV"],
      data: [
        { Year: "2000", Desktop: 45, Laptop: 10, Smartphone: 2, Tablet: 0, "Smart TV": 0 },
        { Year: "2005", Desktop: 55, Laptop: 25, Smartphone: 8, Tablet: 0, "Smart TV": 2 },
        { Year: "2010", Desktop: 50, Laptop: 45, Smartphone: 35, Tablet: 10, "Smart TV": 8 },
        { Year: "2015", Desktop: 40, Laptop: 55, Smartphone: 72, Tablet: 30, "Smart TV": 25 },
        { Year: "2020", Desktop: 30, Laptop: 60, Smartphone: 92, Tablet: 45, "Smart TV": 55 },
      ],
    },
    writingGuide: [
      'Introduction: Paraphrase what the chart shows.',
      'Overview: Identify 2-3 major trends (e.g. smartphones rose dramatically, desktops declined).',
      'Body 1: Detail the trends for 2-3 technologies.',
      'Body 2: Compare the remaining technologies.',
    ],
    vocabularyBank: ['a significant increase (tăng đáng kể)', 'a gradual decline (giảm dần)', 'overtook (vượt qua)', 'peaked at (đạt đỉnh tại)', 'remained stable (duy trì ổn định)', 'rose sharply (tăng mạnh)', 'in contrast (ngược lại)', 'by comparison (so sánh)'],
    brainstormingIdeas: ['Identify the highest and lowest values.', 'Note any crossover points.', 'Group similar trends together.', 'Compare start and end values.'],
  },
  {
    id: 't1-line-1',
    taskType: 1,
    chartType: 'line',
    prompt: 'The line graph below shows the number of international students enrolled in universities in four countries from 1995 to 2020. Summarise the information by selecting and reporting the main features and make comparisons where relevant.',
    imageDescription: 'Line graph with 4 lines (USA, UK, Australia, Germany). X-axis: 1995-2020. Y-axis: Number of students (thousands).',
    chartData: {
      chart_type: "line",
      title: "International Students Enrolled (thousands) - 1995–2020",
      x_axis: "Year",
      y_axis: "Students (thousands)",
      series: ["USA", "UK", "Australia", "Germany"],
      data: [
        { Year: "1995", USA: 450, UK: 120, Australia: 80, Germany: 60 },
        { Year: "2000", USA: 550, UK: 180, Australia: 130, Germany: 75 },
        { Year: "2005", USA: 590, UK: 260, Australia: 200, Germany: 95 },
        { Year: "2010", USA: 720, UK: 350, Australia: 280, Germany: 120 },
        { Year: "2015", USA: 900, UK: 420, Australia: 350, Germany: 160 },
        { Year: "2020", USA: 1050, UK: 500, Australia: 430, Germany: 200 },
      ],
    },
    writingGuide: [
      'Introduction: Paraphrase the graph description.',
      'Overview: Identify overall trends and the country with the most/fewest students.',
      'Body 1: Describe USA and UK trends in detail.',
      'Body 2: Describe Australia and Germany trends.',
    ],
    vocabularyBank: ['fluctuated (dao động)', 'witnessed a surge (chứng kiến sự tăng vọt)', 'remained the dominant (duy trì vị trí thống trị)', 'saw a modest increase (tăng nhẹ)', 'between…and… (giữa…và…)', 'approximately (xấp xỉ)', 'over the period (trong suốt giai đoạn)', 'reached a peak of (đạt đỉnh)'],
    brainstormingIdeas: ['USA likely dominates throughout.', 'Growth rates differ between countries.', 'Some countries may have plateaued.', 'Post-2015 data may show acceleration.'],
  },
  {
    id: 't1-pie-1',
    taskType: 1,
    chartType: 'pie',
    prompt: 'The pie charts below compare the proportion of energy generated from different sources in a country in 2000 and 2020. Summarise the information by selecting and reporting the main features and make comparisons where relevant.',
    imageDescription: 'Two pie charts side by side. 2000: Coal 45%, Oil 30%, Gas 15%, Nuclear 5%, Renewables 5%. 2020: Coal 20%, Oil 15%, Gas 25%, Nuclear 10%, Renewables 30%.',
    chartData: {
      chart_type: "pie",
      title: "Energy Sources Distribution - 2020",
      x_axis: "Source",
      y_axis: "Percentage",
      series: ["Percentage"],
      data: [
        { Source: "Coal", Percentage: 20 },
        { Source: "Oil", Percentage: 15 },
        { Source: "Gas", Percentage: 25 },
        { Source: "Nuclear", Percentage: 10 },
        { Source: "Renewables", Percentage: 30 },
      ],
    },
    writingGuide: [
      'Introduction: Paraphrase what the charts compare.',
      'Overview: Highlight the biggest changes (renewables grew, coal shrank).',
      'Body 1: Describe the 2000 distribution.',
      'Body 2: Describe the 2020 distribution and key changes.',
    ],
    vocabularyBank: ['accounted for (chiếm)', 'comprised (bao gồm)', 'the largest proportion (tỷ lệ lớn nhất)', 'a notable shift (sự thay đổi đáng kể)', 'declined from…to… (giảm từ…xuống…)', 'doubled (tăng gấp đôi)', 'renewable sources (nguồn tái tạo)', 'fossil fuels (nhiên liệu hóa thạch)'],
    brainstormingIdeas: ['Coal dominant in 2000, renewables in 2020.', 'Oil decreased significantly.', 'Nuclear share doubled but remained small.', 'Overall shift from fossil fuels to clean energy.'],
  },
  {
    id: 't1-table-1',
    taskType: 1,
    chartType: 'table',
    prompt: 'The table below shows the literacy rates in five developing countries in 1990, 2000, 2010, and 2020. Summarise the information by selecting and reporting the main features and make comparisons where relevant.',
    imageDescription: 'Table with 5 countries and 4 time periods.',
    chartData: {
      chart_type: "table",
      title: "Literacy Rates (%) in Developing Countries - 1990–2020",
      x_axis: "Country",
      y_axis: "Literacy Rate (%)",
      series: ["1990", "2000", "2010", "2020"],
      data: [
        { Country: "India", "1990": 48, "2000": 61, "2010": 74, "2020": 87 },
        { Country: "Nigeria", "1990": 42, "2000": 53, "2010": 62, "2020": 71 },
        { Country: "Brazil", "1990": 82, "2000": 87, "2010": 91, "2020": 94 },
        { Country: "Vietnam", "1990": 88, "2000": 92, "2010": 95, "2020": 97 },
        { Country: "Ethiopia", "1990": 29, "2000": 38, "2010": 49, "2020": 62 },
      ],
    },
    writingGuide: [
      'Introduction: Paraphrase what the table presents.',
      'Overview: Identify overall upward trend and notable differences.',
      'Body 1: Focus on countries with highest literacy (Vietnam, Brazil).',
      'Body 2: Discuss the countries with lower but improving rates.',
    ],
    vocabularyBank: ['literacy rate (tỷ lệ biết chữ)', 'rose steadily (tăng đều)', 'the highest figure (con số cao nhất)', 'lagged behind (tụt hậu)', 'saw the greatest improvement (có sự cải thiện lớn nhất)', 'stood at (đạt mức)', 'by the end of the period (cuối giai đoạn)', 'in comparison to (so với)'],
    brainstormingIdeas: ['All countries improved.', 'Vietnam consistently the highest.', 'Ethiopia had the lowest but significant progress.', 'India showed dramatic improvement.'],
  },
  {
    id: 't1-map-1',
    taskType: 1,
    chartType: 'map',
    prompt: 'The two maps below show a small town before and after the construction of a new shopping centre and transport network. Summarise the information by selecting and reporting the main features and make comparisons where relevant.',
    imageDescription: 'Map 1 (Before): Small residential area with farmland to the east, a river to the south, one main road. Map 2 (After): Shopping centre built on farmland, new roundabout, car park, bus station added, residential area expanded north.',
    writingGuide: [
      'Introduction: Describe what the maps compare.',
      'Overview: State the main changes (development of farmland, new infrastructure).',
      'Body 1: Describe the original layout.',
      'Body 2: Detail the changes made.',
    ],
    vocabularyBank: ['was replaced by (được thay thế bởi)', 'was converted into (được chuyển đổi thành)', 'was constructed (được xây dựng)', 'underwent significant development (trải qua phát triển đáng kể)', 'previously (trước đó)', 'in contrast (ngược lại)', 'to the north/south of (phía bắc/nam của)', 'adjacent to (liền kề với)'],
    brainstormingIdeas: ['Farmland replaced by commercial area.', 'New transport links added.', 'Residential area expanded.', 'River area may have been developed.'],
  },
  {
    id: 't1-process-1',
    taskType: 1,
    chartType: 'process',
    prompt: 'The diagram below shows the process of recycling plastic bottles. Summarise the information by selecting and reporting the main features and make comparisons where relevant.',
    imageDescription: 'A cyclical process with 8 steps: 1. Collection from bins → 2. Sorting by type → 3. Washing & cleaning → 4. Shredding into flakes → 5. Melting → 6. Forming pellets → 7. Manufacturing new products → 8. Distribution to stores → back to 1.',
    writingGuide: [
      'Introduction: Paraphrase what the diagram illustrates.',
      'Overview: State the total number of steps and whether it is linear or cyclical.',
      'Body 1: Describe the first half of the process.',
      'Body 2: Describe the second half of the process.',
    ],
    vocabularyBank: ['the process begins with (quy trình bắt đầu với)', 'subsequently (sau đó)', 'following this (tiếp theo)', 'at the next stage (ở giai đoạn tiếp theo)', 'the final step involves (bước cuối cùng bao gồm)', 'are then transported to (sau đó được vận chuyển đến)', 'is converted into (được chuyển đổi thành)', 'the cycle repeats (chu trình lặp lại)'],
    brainstormingIdeas: ['8-step cyclical process.', 'Starts with collection, ends with redistribution.', 'Key transformation: shredding and melting.', 'Note passive voice usage for describing processes.'],
  },
  {
    id: 't1-bar-2',
    taskType: 1,
    chartType: 'bar',
    prompt: 'The bar chart below shows the average monthly rainfall in three cities (London, Cairo, Tokyo) over one year. Summarise the information by selecting and reporting the main features and make comparisons where relevant.',
    imageDescription: 'Grouped bar chart showing monthly rainfall for London, Cairo, and Tokyo.',
    chartData: {
      chart_type: "bar",
      title: "Average Monthly Rainfall (mm) - London, Cairo, Tokyo",
      x_axis: "Month",
      y_axis: "Rainfall (mm)",
      series: ["London", "Cairo", "Tokyo"],
      data: [
        { Month: "Jan", London: 55, Cairo: 5, Tokyo: 45 },
        { Month: "Mar", London: 40, Cairo: 3, Tokyo: 100 },
        { Month: "May", London: 50, Cairo: 1, Tokyo: 130 },
        { Month: "Jul", London: 45, Cairo: 0, Tokyo: 155 },
        { Month: "Sep", London: 50, Cairo: 0, Tokyo: 200 },
        { Month: "Nov", London: 60, Cairo: 4, Tokyo: 80 },
      ],
    },
    writingGuide: [
      'Introduction: Paraphrase what the chart shows.',
      'Overview: Identify key patterns (Tokyo wettest, Cairo driest).',
      'Body 1: Describe Tokyo and London patterns.',
      'Body 2: Describe Cairo and make comparisons.',
    ],
    vocabularyBank: ['precipitation (lượng mưa)', 'rainfall patterns (mô hình mưa)', 'monsoon season (mùa gió mùa)', 'arid climate (khí hậu khô cằn)', 'moderate levels (mức vừa phải)', 'peaked at (đạt đỉnh tại)', 'negligible rainfall (lượng mưa không đáng kể)', 'in stark contrast (trái ngược hoàn toàn)'],
    brainstormingIdeas: ['Tokyo has a clear rainy season.', 'Cairo is almost dry year-round.', 'London has even distribution.', 'Compare extremes between the three.'],
  },
  {
    id: 't1-line-2',
    taskType: 1,
    chartType: 'line',
    prompt: 'The line graph below shows the percentage of the population using the internet in four regions (North America, Europe, Asia, Africa) from 2000 to 2023. Summarise the information by selecting and reporting the main features.',
    imageDescription: 'Line graph showing internet usage growth across four regions.',
    chartData: {
      chart_type: "line",
      title: "Internet Usage by Region (%) - 2000–2023",
      x_axis: "Year",
      y_axis: "Population (%)",
      series: ["North America", "Europe", "Asia", "Africa"],
      data: [
        { Year: "2000", "North America": 45, Europe: 30, Asia: 5, Africa: 1 },
        { Year: "2005", "North America": 65, Europe: 48, Asia: 12, Africa: 3 },
        { Year: "2010", "North America": 78, Europe: 67, Asia: 28, Africa: 10 },
        { Year: "2015", "North America": 87, Europe: 80, Asia: 45, Africa: 22 },
        { Year: "2020", "North America": 93, Europe: 88, Asia: 60, Africa: 35 },
        { Year: "2023", "North America": 95, Europe: 90, Asia: 65, Africa: 40 },
      ],
    },
    writingGuide: [
      'Introduction: Paraphrase the graph description.',
      'Overview: All regions grew; North America remained highest; Asia grew fastest.',
      'Body 1: Detail North America and Europe.',
      'Body 2: Detail Asia and Africa.',
    ],
    vocabularyBank: ['internet penetration (mức độ phổ cập internet)', 'digital divide (khoảng cách số)', 'exponential growth (tăng trưởng theo cấp số nhân)', 'steadily increased (tăng đều)', 'remained the frontrunner (duy trì vị trí dẫn đầu)', 'narrowed the gap (thu hẹp khoảng cách)', 'lagged behind (tụt hậu)', 'from a base of (từ mức cơ sở)'],
    brainstormingIdeas: ['Digital divide narrowing but still exists.', 'Asia growth rate steepest post-2010.', 'Africa started lowest but quadrupled.', 'North America approaching saturation.'],
  },
  // Additional Task 1 prompts with chart data
  {
    id: 't1-area-1',
    taskType: 1,
    chartType: 'line',
    prompt: 'The graph below shows the total CO2 emissions (in million tonnes) from three sectors - Transport, Industry, and Residential - in a European country from 1990 to 2020. Summarise the information.',
    imageDescription: 'Area graph showing CO2 emissions from three sectors over 30 years.',
    chartData: {
      chart_type: "area",
      title: "CO2 Emissions by Sector (million tonnes) - 1990–2020",
      x_axis: "Year",
      y_axis: "Million Tonnes",
      series: ["Transport", "Industry", "Residential"],
      data: [
        { Year: "1990", Transport: 120, Industry: 200, Residential: 80 },
        { Year: "1995", Transport: 130, Industry: 185, Residential: 75 },
        { Year: "2000", Transport: 145, Industry: 170, Residential: 70 },
        { Year: "2005", Transport: 155, Industry: 150, Residential: 65 },
        { Year: "2010", Transport: 160, Industry: 130, Residential: 60 },
        { Year: "2015", Transport: 150, Industry: 110, Residential: 55 },
        { Year: "2020", Transport: 135, Industry: 95, Residential: 50 },
      ],
    },
    writingGuide: [
      'Introduction: Paraphrase what the graph illustrates.',
      'Overview: Industry declined most; Transport rose then fell; Residential steady decline.',
      'Body 1: Detail Industry and Transport trends.',
      'Body 2: Detail Residential and compare all three.',
    ],
    vocabularyBank: ['carbon emissions (khí thải carbon)', 'declined steadily (giảm đều)', 'peaked in (đạt đỉnh vào)', 'accounted for the largest share (chiếm tỷ trọng lớn nhất)', 'overtook (vượt qua)', 'saw a reversal (đảo chiều)', 'environmental impact (tác động môi trường)', 'sector-specific (theo ngành)'],
    brainstormingIdeas: ['Industry was highest in 1990 but fell.', 'Transport peaked around 2010.', 'Residential had smallest contribution.', 'Overall emissions decreased.'],
  },
  {
    id: 't1-pie-2',
    taskType: 1,
    chartType: 'pie',
    prompt: 'The pie chart below shows how a university budget was allocated across different departments in 2023. Summarise the information by selecting and reporting the main features.',
    imageDescription: 'Pie chart showing university budget allocation by department.',
    chartData: {
      chart_type: "pie",
      title: "University Budget Allocation - 2023",
      x_axis: "Department",
      y_axis: "Percentage",
      series: ["Budget"],
      data: [
        { Department: "Engineering", Budget: 28 },
        { Department: "Medicine", Budget: 25 },
        { Department: "Business", Budget: 18 },
        { Department: "Arts", Budget: 12 },
        { Department: "Sciences", Budget: 10 },
        { Department: "Admin", Budget: 7 },
      ],
    },
    writingGuide: [
      'Introduction: Paraphrase what the chart presents.',
      'Overview: Engineering and Medicine received the most; Admin the least.',
      'Body 1: Describe the top 3 departments.',
      'Body 2: Describe the remaining departments.',
    ],
    vocabularyBank: ['budget allocation (phân bổ ngân sách)', 'the lion\'s share (phần lớn nhất)', 'was allocated to (được phân bổ cho)', 'comprised (chiếm)', 'a negligible portion (phần không đáng kể)', 'funding priorities (ưu tiên tài trợ)', 'proportionally (theo tỷ lệ)', 'the remainder (phần còn lại)'],
    brainstormingIdeas: ['STEM departments dominate spending.', 'Arts and Admin receive the least.', 'Engineering alone = over a quarter.', 'Combined STEM = over 60%.'],
  },
  {
    id: 't1-bar-3',
    taskType: 1,
    chartType: 'bar',
    prompt: 'The bar chart below shows the number of tourists (in millions) visiting five Asian countries in 2019 and 2023. Summarise the information by selecting and reporting the main features.',
    imageDescription: 'Grouped bar chart comparing tourist arrivals in 2019 and 2023 for five Asian countries.',
    chartData: {
      chart_type: "bar",
      title: "Tourist Arrivals in Asia (millions) - 2019 vs 2023",
      x_axis: "Country",
      y_axis: "Tourists (millions)",
      series: ["2019", "2023"],
      data: [
        { Country: "Thailand", "2019": 39.8, "2023": 28.2 },
        { Country: "Japan", "2019": 31.9, "2023": 25.1 },
        { Country: "Malaysia", "2019": 26.1, "2023": 20.1 },
        { Country: "Vietnam", "2019": 18.0, "2023": 12.6 },
        { Country: "Indonesia", "2019": 16.1, "2023": 11.7 },
      ],
    },
    writingGuide: [
      'Introduction: Paraphrase what the chart compares.',
      'Overview: All countries saw fewer tourists in 2023 compared to 2019.',
      'Body 1: Detail the top 2-3 countries.',
      'Body 2: Detail the remaining countries and overall comparison.',
    ],
    vocabularyBank: ['tourist arrivals (lượng khách du lịch)', 'declined by (giảm)', 'saw the sharpest drop (giảm mạnh nhất)', 'recovered partially (phục hồi một phần)', 'pre-pandemic levels (mức trước đại dịch)', 'travel restrictions (hạn chế đi lại)', 'hospitality sector (ngành du lịch khách sạn)', 'inbound tourism (du lịch nội địa)'],
    brainstormingIdeas: ['COVID impact visible.', 'Thailand remained most popular.', 'Recovery rates varied.', 'Southeast Asia vs East Asia comparison.'],
  },
];

// Extra generic brainstorming ideas to pad prompts with fewer than 10 ideas
const extraBrainstormingPool: Record<string, string[]> = {
  opinion: [
    'Consider real-world examples from different countries to support your argument.',
    'Think about long-term vs. short-term consequences of each position.',
    'Consider perspectives of different stakeholders: government, individuals, businesses.',
    'Historical precedents can strengthen your argument significantly.',
    'Statistical evidence from reputable sources adds credibility to claims.',
    'Consider the economic, social, and environmental dimensions of the issue.',
    'Think about how cultural differences affect views on this topic.',
    'Consider whether the situation is improving or worsening over time.',
  ],
  discussion: [
    'Present each side\'s strongest argument before giving your opinion.',
    'Consider cultural and regional differences in perspective.',
    'Think about how this issue has evolved over the past decade.',
    'Consider the role of government regulation vs. individual responsibility.',
    'Use specific case studies from different countries to illustrate points.',
    'Acknowledge complexity - most real-world issues are not black and white.',
    'Think about generational differences in how people view this topic.',
    'Consider unintended consequences of policies related to this issue.',
  ],
  'advantage-disadvantage': [
    'Categorize advantages/disadvantages by short-term and long-term impact.',
    'Consider who benefits most and who is most negatively affected.',
    'Think about unintended consequences that are often overlooked.',
    'Compare with alternative approaches that might offer better outcomes.',
    'Consider the scale - does this apply equally to all demographics?',
    'Real-world success and failure stories make compelling evidence.',
    'Think about the financial cost vs. social benefit trade-off.',
    'Consider how technology might change the equation in the future.',
  ],
  'problem-solution': [
    'Identify root causes rather than just surface-level symptoms.',
    'Consider both individual-level and systemic solutions.',
    'Think about prevention strategies vs. reactive measures.',
    'Evaluate the feasibility and cost-effectiveness of each solution.',
    'Look at countries that have successfully addressed similar problems.',
    'Consider potential drawbacks or resistance to proposed solutions.',
    'Think about who should be responsible: government, companies, or individuals.',
    'Consider how education and awareness campaigns could help.',
  ],
  'direct-question': [
    'Break down the question into smaller sub-questions to address each clearly.',
    'Use specific evidence and examples rather than broad generalizations.',
    'Consider both developed and developing country contexts.',
    'Think about how technology is changing the landscape of this issue.',
    'Address potential counterarguments to strengthen your response.',
    'Connect your ideas back to the broader social or economic context.',
    'Consider the role of media and public opinion in shaping this issue.',
    'Think about what changes might occur in the next 10-20 years.',
  ],
  'default': [
    'Consider examples from at least two different countries or regions.',
    'Think about the impact on different age groups and social classes.',
    'Consider both the immediate and long-term effects of this trend.',
    'Use cause-and-effect reasoning to build a logical argument.',
    'Think about how this issue connects to broader global trends.',
    'Consider the role of education in addressing this issue.',
    'Think about economic implications for governments and individuals.',
    'Consider environmental sustainability as a factor in your analysis.',
  ],
};

/**
 * Expand brainstorming ideas to at least 10 items
 */
function expandBrainstormingIdeas(prompt: WritingPrompt): string[] {
  const ideas = [...prompt.brainstormingIdeas];
  if (ideas.length >= 10) return ideas;

  const type = prompt.essayType || prompt.chartType || 'default';
  const pool = extraBrainstormingPool[type] || extraBrainstormingPool['default'];
  
  // Add ideas from the pool that aren't already included
  for (const idea of pool) {
    if (ideas.length >= 10) break;
    if (!ideas.some(existing => existing.toLowerCase().includes(idea.substring(0, 30).toLowerCase()))) {
      ideas.push(idea);
    }
  }
  return ideas;
}

/**
 * Get a random prompt by task type and optional sub-type
 */
export function getRandomPrompt(taskType: 1 | 2, subType?: string): WritingPrompt {
  let filtered = writingPrompts.filter(p => p.taskType === taskType);
  if (subType) {
    filtered = filtered.filter(p =>
      taskType === 1 ? p.chartType === subType : p.essayType === subType
    );
  }
  if (filtered.length === 0) filtered = writingPrompts.filter(p => p.taskType === taskType);
  const selected = filtered[Math.floor(Math.random() * filtered.length)];
  // Auto-expand brainstorming ideas to at least 10
  return { ...selected, brainstormingIdeas: expandBrainstormingIdeas(selected) };
}
