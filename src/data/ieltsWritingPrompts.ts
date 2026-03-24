// Static IELTS Writing prompt bank for fallback and quick access

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
}

export const writingPrompts: WritingPrompt[] = [
  // ========== TASK 2 — Opinion ===========
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
    vocabularyBank: ['vocational training', 'employability', 'theoretical knowledge', 'practical skills', 'career-oriented', 'academic rigour', 'work-ready graduates', 'curriculum design'],
    brainstormingIdeas: ['Universities provide critical thinking skills applicable to any career.', 'Employers often complain graduates lack practical skills.', 'Internship programs can bridge the gap.', 'Some fields (medicine, engineering) need both.'],
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
    vocabularyBank: ['ageing population', 'life expectancy', 'pension system', 'demographic shift', 'elderly care', 'workforce participation', 'intergenerational', 'social security burden'],
    brainstormingIdeas: ['Older workers bring experience and mentorship.', 'Healthcare and pension costs rise dramatically.', 'Countries like Japan face labour shortages.', 'Technology can assist elderly independence.'],
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
    vocabularyBank: ['cognitive development', 'play-based learning', 'socialisation', 'academic readiness', 'formative years', 'curriculum pressure', 'childhood autonomy', 'developmental milestones'],
    brainstormingIdeas: ['Early education can build literacy and numeracy foundations.', 'Play is essential for creativity and emotional growth.', 'Scandinavian countries start formal education at 7 and rank highly.', 'Pressure too early can cause burnout.'],
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
    vocabularyBank: ['infrastructure investment', 'high-speed rail', 'commuter routes', 'urban mobility', 'sustainable transport', 'congestion reduction', 'cost-effective', 'connectivity'],
    brainstormingIdeas: ['High-speed rail reduces domestic flights and carbon emissions.', 'Existing systems in many cities are overcrowded and unreliable.', 'Building new lines is extremely expensive.', 'Improving buses and metro serves more people daily.'],
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
    vocabularyBank: ['digital overload', 'automation', 'information age', 'cyber security', 'work-life balance', 'streamline processes', 'technological dependency', 'digital literacy'],
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
    vocabularyBank: ['growth mindset', 'resilience', 'self-efficacy', 'unrealistic expectations', 'meritocracy', 'intrinsic motivation', 'social inequality', 'perseverance'],
    brainstormingIdeas: ['Encouragement builds confidence and risk-taking.', 'Ignores systemic barriers (poverty, discrimination).', 'Failure despite effort can damage self-esteem.', 'Balanced messaging acknowledges effort AND circumstances.'],
  },

  // ========== TASK 2 — Discussion ===========
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
    vocabularyBank: ['civic responsibility', 'community engagement', 'volunteer work', 'time management', 'social awareness', 'mandatory service', 'personal development', 'exploitation'],
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
    vocabularyBank: ['cultural exchange', 'national pride', 'hooliganism', 'sportsmanship', 'diplomacy', 'commercialisation', 'doping scandals', 'global solidarity'],
    brainstormingIdeas: ['Olympics promote international friendship.', 'Rivalries can escalate into nationalism.', 'Host cities face massive debt.', 'Athletes become role models across cultures.'],
  },

  // ========== TASK 2 — Advantage/Disadvantage ===========
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
    vocabularyBank: ['telecommuting', 'work-life balance', 'productivity', 'isolation', 'commute reduction', 'digital nomad', 'collaborative tools', 'workplace culture'],
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
    vocabularyBank: ['autonomy', 'self-reliance', 'social isolation', 'financial burden', 'personal space', 'emotional well-being', 'solo household', 'support network'],
    brainstormingIdeas: ['Full control over daily routine.', 'Higher cost of living without shared expenses.', 'Can lead to loneliness, especially for elderly.', 'Encourages independence and problem-solving.'],
  },

  // ========== TASK 2 — Problem/Solution ===========
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
    vocabularyBank: ['air pollution', 'emissions', 'fossil fuels', 'respiratory diseases', 'green energy', 'public transport', 'carbon footprint', 'environmental regulations'],
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
    vocabularyBank: ['urbanisation', 'rural depopulation', 'brain drain', 'infrastructure strain', 'agricultural decline', 'job opportunities', 'decentralisation', 'remote work incentives'],
    brainstormingIdeas: ['Rural areas lose young workforce.', 'Cities become overcrowded with housing shortages.', 'Government can create rural job incentives.', 'Improve internet and services in countryside.'],
  },

  // ========== TASK 2 — Direct Question ===========
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
    vocabularyBank: ['delayed parenthood', 'career progression', 'financial stability', 'fertility challenges', 'emotional maturity', 'family planning', 'societal pressure', 'childcare costs'],
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
    vocabularyBank: ['e-commerce', 'consumer behaviour', 'convenience', 'brick-and-mortar', 'price comparison', 'impulse buying', 'delivery logistics', 'high street decline'],
    brainstormingIdeas: ['Convenience of shopping from home 24/7.', 'Local shops struggle to compete.', 'Environmental cost of packaging and delivery.', 'Greater product variety and price transparency.'],
  },

  // ========== TASK 1 — Charts & Visuals ===========
  {
    id: 't1-bar-1',
    taskType: 1,
    chartType: 'bar',
    prompt: 'The bar chart below shows the percentage of households in a country that owned different types of technology between 2000 and 2020. Summarise the information by selecting and reporting the main features and make comparisons where relevant.',
    imageDescription: 'Bar chart with 5 grouped bars for years 2000, 2005, 2010, 2015, 2020. Categories: Desktop Computer, Laptop, Smartphone, Tablet, Smart TV. Values increase over time with smartphones showing the steepest rise.',
    writingGuide: [
      'Introduction: Paraphrase what the chart shows.',
      'Overview: Identify 2-3 major trends (e.g. smartphones rose dramatically, desktops declined).',
      'Body 1: Detail the trends for 2-3 technologies.',
      'Body 2: Compare the remaining technologies.',
    ],
    vocabularyBank: ['a significant increase', 'a gradual decline', 'overtook', 'peaked at', 'remained stable', 'rose sharply', 'in contrast', 'by comparison'],
    brainstormingIdeas: ['Identify the highest and lowest values.', 'Note any crossover points.', 'Group similar trends together.', 'Compare start and end values.'],
  },
  {
    id: 't1-line-1',
    taskType: 1,
    chartType: 'line',
    prompt: 'The line graph below shows the number of international students enrolled in universities in four countries from 1995 to 2020. Summarise the information by selecting and reporting the main features and make comparisons where relevant.',
    imageDescription: 'Line graph with 4 lines (USA, UK, Australia, Germany). X-axis: 1995-2020. Y-axis: Number of students (thousands). USA starts highest and remains dominant. Australia and UK show steady growth. Germany grows slowly.',
    writingGuide: [
      'Introduction: Paraphrase the graph description.',
      'Overview: Identify overall trends and the country with the most/fewest students.',
      'Body 1: Describe USA and UK trends in detail.',
      'Body 2: Describe Australia and Germany trends.',
    ],
    vocabularyBank: ['fluctuated', 'witnessed a surge', 'remained the dominant', 'saw a modest increase', 'between…and…', 'approximately', 'over the period', 'reached a peak of'],
    brainstormingIdeas: ['USA likely dominates throughout.', 'Growth rates differ between countries.', 'Some countries may have plateaued.', 'Post-2015 data may show acceleration.'],
  },
  {
    id: 't1-pie-1',
    taskType: 1,
    chartType: 'pie',
    prompt: 'The pie charts below compare the proportion of energy generated from different sources in a country in 2000 and 2020. Summarise the information by selecting and reporting the main features and make comparisons where relevant.',
    imageDescription: 'Two pie charts side by side. 2000: Coal 45%, Oil 30%, Gas 15%, Nuclear 5%, Renewables 5%. 2020: Coal 20%, Oil 15%, Gas 25%, Nuclear 10%, Renewables 30%.',
    writingGuide: [
      'Introduction: Paraphrase what the charts compare.',
      'Overview: Highlight the biggest changes (renewables grew, coal shrank).',
      'Body 1: Describe the 2000 distribution.',
      'Body 2: Describe the 2020 distribution and key changes.',
    ],
    vocabularyBank: ['accounted for', 'comprised', 'the largest proportion', 'a notable shift', 'declined from…to…', 'doubled', 'renewable sources', 'fossil fuels'],
    brainstormingIdeas: ['Coal dominant in 2000, renewables in 2020.', 'Oil decreased significantly.', 'Nuclear share doubled but remained small.', 'Overall shift from fossil fuels to clean energy.'],
  },
  {
    id: 't1-table-1',
    taskType: 1,
    chartType: 'table',
    prompt: 'The table below shows the literacy rates in five developing countries in 1990, 2000, 2010, and 2020. Summarise the information by selecting and reporting the main features and make comparisons where relevant.',
    imageDescription: 'Table with 5 countries (India, Nigeria, Brazil, Vietnam, Ethiopia) and 4 time periods. India: 48%, 61%, 74%, 87%. Nigeria: 42%, 53%, 62%, 71%. Brazil: 82%, 87%, 91%, 94%. Vietnam: 88%, 92%, 95%, 97%. Ethiopia: 29%, 38%, 49%, 62%.',
    writingGuide: [
      'Introduction: Paraphrase what the table presents.',
      'Overview: Identify overall upward trend and notable differences.',
      'Body 1: Focus on countries with highest literacy (Vietnam, Brazil).',
      'Body 2: Discuss the countries with lower but improving rates.',
    ],
    vocabularyBank: ['literacy rate', 'rose steadily', 'the highest figure', 'lagged behind', 'saw the greatest improvement', 'stood at', 'by the end of the period', 'in comparison to'],
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
    vocabularyBank: ['was replaced by', 'was converted into', 'was constructed', 'underwent significant development', 'previously', 'in contrast', 'to the north/south of', 'adjacent to'],
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
    vocabularyBank: ['the process begins with', 'subsequently', 'following this', 'at the next stage', 'the final step involves', 'are then transported to', 'is converted into', 'the cycle repeats'],
    brainstormingIdeas: ['8-step cyclical process.', 'Starts with collection, ends with redistribution.', 'Key transformation: shredding and melting.', 'Note passive voice usage for describing processes.'],
  },
  // More Task 1 prompts
  {
    id: 't1-bar-2',
    taskType: 1,
    chartType: 'bar',
    prompt: 'The bar chart below shows the average monthly rainfall in three cities (London, Cairo, Tokyo) over one year. Summarise the information by selecting and reporting the main features and make comparisons where relevant.',
    imageDescription: 'Grouped bar chart. London: consistent 40-60mm year-round. Cairo: very low (0-5mm) except slight rise in winter. Tokyo: peaks in June-September (150-200mm), lower in winter (30-50mm).',
    writingGuide: [
      'Introduction: Paraphrase what the chart shows.',
      'Overview: Identify key patterns (Tokyo wettest, Cairo driest).',
      'Body 1: Describe Tokyo and London patterns.',
      'Body 2: Describe Cairo and make comparisons.',
    ],
    vocabularyBank: ['precipitation', 'rainfall patterns', 'monsoon season', 'arid climate', 'moderate levels', 'peaked at', 'negligible rainfall', 'in stark contrast'],
    brainstormingIdeas: ['Tokyo has a clear rainy season.', 'Cairo is almost dry year-round.', 'London has even distribution.', 'Compare extremes between the three.'],
  },
  {
    id: 't1-line-2',
    taskType: 1,
    chartType: 'line',
    prompt: 'The line graph below shows the percentage of the population using the internet in four regions (North America, Europe, Asia, Africa) from 2000 to 2023. Summarise the information by selecting and reporting the main features.',
    imageDescription: 'Line graph. North America: 45%→95%. Europe: 30%→90%. Asia: 5%→65%. Africa: 1%→40%. All lines trend upward with Asia showing the steepest growth after 2010.',
    writingGuide: [
      'Introduction: Paraphrase the graph description.',
      'Overview: All regions grew; North America remained highest; Asia grew fastest.',
      'Body 1: Detail North America and Europe.',
      'Body 2: Detail Asia and Africa.',
    ],
    vocabularyBank: ['internet penetration', 'digital divide', 'exponential growth', 'steadily increased', 'remained the frontrunner', 'narrowed the gap', 'lagged behind', 'from a base of'],
    brainstormingIdeas: ['Digital divide narrowing but still exists.', 'Asia growth rate steepest post-2010.', 'Africa started lowest but quadrupled.', 'North America approaching saturation.'],
  },
];

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
  return filtered[Math.floor(Math.random() * filtered.length)];
}
