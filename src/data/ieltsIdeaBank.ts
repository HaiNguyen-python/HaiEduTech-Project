/**
 * IELTS Writing Task 2 — Idea Bank
 *
 * Curated essay topics with brainstormed ideas (reasons + supporting examples)
 * for IELTS Writing Task 2 idea-generation practice. Mirrors the way
 * Mr Hai teaches brainstorming: split each topic into 2-3 perspectives,
 * each idea = REASON + EXAMPLE / EVIDENCE so students can build a Band 7+ body
 * paragraph from a single card.
 */

export type IdeaCategory =
  | "education"
  | "environment"
  | "technology"
  | "health"
  | "society"
  | "work"
  | "globalisation"
  | "government"
  | "media"
  | "family";

export interface IeltsIdeaPoint {
  /** One-line idea / position statement */
  point: string;
  /** WHY this idea matters (reasoning) */
  reason: string;
  /** Concrete example / statistic / scenario */
  example: string;
  /** Optional Band 7+ collocations to deploy */
  collocations?: string[];
}

export interface IeltsIdeaSide {
  /** e.g. "Agree", "Disagree", "Advantages", "Causes", "Solutions" */
  label: string;
  labelVi: string;
  ideas: IeltsIdeaPoint[];
}

export interface IeltsIdeaTopic {
  id: string;
  category: IdeaCategory;
  /** Question type: opinion | discussion | advantages-disadvantages | problem-solution | two-part */
  type:
    | "opinion"
    | "discussion"
    | "advantages-disadvantages"
    | "problem-solution"
    | "two-part";
  prompt: string;
  promptVi: string;
  /** 2-3 perspectives; for opinion essays usually Agree + Disagree */
  sides: IeltsIdeaSide[];
  /** Suggested thesis lines for Band 7+ introductions */
  thesisOptions: string[];
}

const TOPICS: IeltsIdeaTopic[] = [
  // ========== EDUCATION ==========
  {
    id: "edu-online-vs-traditional",
    category: "education",
    type: "discussion",
    prompt:
      "Some people believe that online learning will eventually replace traditional classroom education, while others think classrooms remain irreplaceable. Discuss both views and give your own opinion.",
    promptVi:
      "Một số người tin rằng học trực tuyến cuối cùng sẽ thay thế lớp học truyền thống, trong khi những người khác cho rằng lớp học là không thể thay thế. Thảo luận cả hai quan điểm và đưa ra ý kiến của bạn.",
    sides: [
      {
        label: "Online learning will dominate",
        labelVi: "Học trực tuyến sẽ chiếm ưu thế",
        ideas: [
          {
            point: "Geographical flexibility democratises access",
            reason: "Rural and low-income learners can attend top universities without relocating.",
            example: "Coursera reports over 100 million learners; many enrol from countries with no local elite university.",
            collocations: ["bridge the educational divide", "democratise access to knowledge"],
          },
          {
            point: "Personalised pace boosts mastery",
            reason: "AI-driven platforms adapt difficulty in real time, so weaker students get extra drills.",
            example: "Duolingo's spaced-repetition algorithm reportedly improves vocabulary retention by 30%.",
            collocations: ["tailored learning pathway", "adaptive difficulty"],
          },
          {
            point: "Lower costs disrupt traditional providers",
            reason: "Universities face shrinking enrolment as cheap micro-credentials become valid in the job market.",
            example: "Google Career Certificates are accepted by 150+ employers as equivalent to a 4-year degree.",
            collocations: ["cost-effective alternative", "credential disruption"],
          },
        ],
      },
      {
        label: "Classrooms remain irreplaceable",
        labelVi: "Lớp học vẫn không thể thay thế",
        ideas: [
          {
            point: "Face-to-face interaction develops soft skills",
            reason: "Group projects and live debate cannot be fully replicated on a screen.",
            example: "Stanford studies show in-person discussion improves negotiation skills 2x more than Zoom debate.",
            collocations: ["interpersonal competence", "collaborative learning"],
          },
          {
            point: "Disciplined environment curbs procrastination",
            reason: "Physical attendance enforces routine, which is critical for adolescents.",
            example: "OECD data: students learning fully online during COVID lost 3-9 months of progress.",
            collocations: ["academic discipline", "learning routine"],
          },
          {
            point: "Hands-on subjects need labs and equipment",
            reason: "Chemistry, surgery, and engineering require physical experimentation.",
            example: "A medical student cannot learn suturing through video tutorials alone.",
            collocations: ["practical proficiency", "kinesthetic learning"],
          },
        ],
      },
    ],
    thesisOptions: [
      "Although online learning offers undeniable flexibility, I believe physical classrooms will remain essential for hands-on subjects and the social maturation of young learners.",
      "In my view, a blended model that combines the personalisation of online tools with the discipline of the classroom will dominate the next decade.",
    ],
  },
  {
    id: "edu-free-university",
    category: "education",
    type: "opinion",
    prompt:
      "Some people argue that university education should be free for all students. To what extent do you agree or disagree?",
    promptVi:
      "Một số người cho rằng giáo dục đại học nên miễn phí cho mọi sinh viên. Bạn đồng ý hay không đồng ý ở mức nào?",
    sides: [
      {
        label: "Agree — University should be free",
        labelVi: "Đồng ý — Đại học nên miễn phí",
        ideas: [
          {
            point: "Equal opportunity boosts social mobility",
            reason: "Talented students from poor backgrounds gain access regardless of family wealth.",
            example: "Germany abolished tuition in 2014 and enrolment of low-income students rose by 22%.",
            collocations: ["upward mobility", "level the playing field"],
          },
          {
            point: "Higher-skilled workforce fuels the economy",
            reason: "Governments recoup tuition costs through future income tax.",
            example: "Nordic countries with free tuition outperform on per-capita GDP and innovation indices.",
            collocations: ["return on public investment", "knowledge-based economy"],
          },
          {
            point: "Reduces graduate debt crisis",
            reason: "Crippling loans deter young people from starting businesses or families.",
            example: "Average US student loan debt is $37,000, delaying home ownership by 7 years.",
            collocations: ["financial burden", "debt trap"],
          },
        ],
      },
      {
        label: "Disagree — Students should contribute",
        labelVi: "Không đồng ý — Sinh viên nên đóng góp",
        ideas: [
          {
            point: "Tuition fees ensure quality and accountability",
            reason: "Fee-paying students demand high standards, pushing universities to improve.",
            example: "UK universities consistently rank top-100 globally despite charging fees.",
            collocations: ["market-driven quality", "academic accountability"],
          },
          {
            point: "Free education strains taxpayers unfairly",
            reason: "Non-graduates effectively subsidise the careers of higher earners.",
            example: "A plumber's taxes funding a future doctor's degree is regressive.",
            collocations: ["fiscal burden", "subsidy mismatch"],
          },
          {
            point: "Targeted scholarships are more efficient",
            reason: "Public money is better spent on bright low-income students, not everyone.",
            example: "Singapore's MOE Tuition Grant covers 75% of fees only for those who qualify.",
            collocations: ["means-tested support", "needs-based funding"],
          },
        ],
      },
    ],
    thesisOptions: [
      "I largely agree that university should be free at the point of use because the long-term societal returns outweigh the upfront fiscal cost.",
      "I partly disagree: a hybrid model of subsidised tuition combined with targeted scholarships strikes the best balance between equity and accountability.",
    ],
  },

  // ========== ENVIRONMENT ==========
  {
    id: "env-individual-vs-government",
    category: "environment",
    type: "discussion",
    prompt:
      "Some people think that individuals should be responsible for tackling climate change, while others believe governments must take the lead. Discuss both views and give your opinion.",
    promptVi:
      "Một số người cho rằng cá nhân phải chịu trách nhiệm chống biến đổi khí hậu, trong khi những người khác tin rằng chính phủ phải đi đầu. Thảo luận cả hai quan điểm và đưa ra ý kiến của bạn.",
    sides: [
      {
        label: "Individual responsibility",
        labelVi: "Trách nhiệm cá nhân",
        ideas: [
          {
            point: "Consumer choices drive corporate behaviour",
            reason: "Companies follow demand; if buyers reject plastic, supply chains adapt.",
            example: "Plant-based meat sales tripled after eco-conscious consumers boycotted beef.",
            collocations: ["consumer-led change", "shift in demand"],
          },
          {
            point: "Daily habits compound into massive impact",
            reason: "If a billion people skip one flight a year, emissions plummet.",
            example: "Sweden's 'flygskam' movement cut domestic flights by 9% in 2019.",
            collocations: ["carbon footprint", "lifestyle adjustments"],
          },
          {
            point: "Bottom-up pressure forces political action",
            reason: "Voters who recycle elect politicians who legislate sustainability.",
            example: "The Greens entered the German coalition government in 2021 thanks to youth activism.",
            collocations: ["grassroots movement", "civic engagement"],
          },
        ],
      },
      {
        label: "Government responsibility",
        labelVi: "Trách nhiệm chính phủ",
        ideas: [
          {
            point: "Only legislation can curb major polluters",
            reason: "Just 100 companies cause 71% of industrial emissions; individuals cannot regulate them.",
            example: "The EU Emissions Trading Scheme cut power-sector CO2 by 35% since 2005.",
            collocations: ["regulatory framework", "structural change"],
          },
          {
            point: "Infrastructure shifts require public funding",
            reason: "Building metros, EV charging, and renewable grids costs trillions.",
            example: "The US Inflation Reduction Act allocates $370 billion to clean energy.",
            collocations: ["public investment", "low-carbon infrastructure"],
          },
          {
            point: "International treaties need state actors",
            reason: "Climate is borderless; only nations can negotiate at the UN.",
            example: "The Paris Agreement has 196 signatory states, not individuals.",
            collocations: ["binding agreement", "global cooperation"],
          },
        ],
      },
    ],
    thesisOptions: [
      "While both stakeholders matter, I believe governments must take the lead because only legislation can regulate the corporations and infrastructures that drive most emissions.",
      "In my opinion, lasting climate action requires a partnership in which governments set the rules and individuals translate them into daily practice.",
    ],
  },
  {
    id: "env-plastic-ban",
    category: "environment",
    type: "problem-solution",
    prompt:
      "Plastic waste is polluting oceans worldwide. What are the main causes of this problem and what solutions can governments and citizens take?",
    promptVi:
      "Rác thải nhựa đang gây ô nhiễm đại dương toàn cầu. Nguyên nhân chính của vấn đề này là gì và chính phủ cùng người dân có thể đưa ra giải pháp nào?",
    sides: [
      {
        label: "Causes",
        labelVi: "Nguyên nhân",
        ideas: [
          {
            point: "Single-use packaging dominates retail",
            reason: "Convenience culture drives unnecessary plastic for short-lived purposes.",
            example: "Over 500 billion plastic bottles are produced annually, most discarded within minutes.",
            collocations: ["throwaway culture", "single-use plastics"],
          },
          {
            point: "Poor waste-management infrastructure",
            reason: "Developing nations lack the capacity to collect and recycle waste.",
            example: "60% of ocean plastic comes from just 5 Asian countries with insufficient landfills.",
            collocations: ["inadequate infrastructure", "waste-management gap"],
          },
          {
            point: "Lack of consumer awareness",
            reason: "Many shoppers do not realise the lifecycle impact of their plastic choices.",
            example: "Only 9% of all plastic ever produced has been recycled.",
            collocations: ["consumer ignorance", "lifecycle awareness"],
          },
        ],
      },
      {
        label: "Solutions",
        labelVi: "Giải pháp",
        ideas: [
          {
            point: "Outright bans on disposable items",
            reason: "Eliminating supply forces innovation in biodegradable alternatives.",
            example: "Kenya's 2017 plastic bag ban — among the world's strictest — reduced visible litter dramatically.",
            collocations: ["legislative ban", "biodegradable alternatives"],
          },
          {
            point: "Deposit-return schemes",
            reason: "Financial incentives turn waste into income.",
            example: "Germany's Pfand system achieves 98% bottle return rates.",
            collocations: ["circular economy", "deposit-refund model"],
          },
          {
            point: "Public education and reusable culture",
            reason: "Schools and media can normalise reusables within a generation.",
            example: "Japan's tradition of carrying personal bento boxes already cuts packaging waste.",
            collocations: ["behavioural change", "reusable habits"],
          },
        ],
      },
    ],
    thesisOptions: [
      "The plastic crisis stems chiefly from throwaway culture and weak waste-management infrastructure, but it can be tackled through bold legislation, financial incentives and a cultural shift toward reusables.",
    ],
  },

  // ========== TECHNOLOGY ==========
  {
    id: "tech-screen-time-children",
    category: "technology",
    type: "two-part",
    prompt:
      "Children today spend an increasing amount of time on screens. Why is this happening, and what are the long-term effects on their development?",
    promptVi:
      "Trẻ em ngày nay dành ngày càng nhiều thời gian trước màn hình. Tại sao điều này xảy ra và hậu quả lâu dài lên sự phát triển của các em là gì?",
    sides: [
      {
        label: "Reasons",
        labelVi: "Lý do",
        ideas: [
          {
            point: "Parents use devices as digital babysitters",
            reason: "Busy work schedules leave little time for active engagement with children.",
            example: "A US survey found 65% of parents hand over a tablet to keep toddlers quiet at restaurants.",
            collocations: ["parental convenience", "screen as pacifier"],
          },
          {
            point: "Schools have shifted to digital learning",
            reason: "Tablets and laptops are now standard classroom tools post-COVID.",
            example: "South Korea distributes free tablets to all primary students.",
            collocations: ["digital classroom", "tech-enabled learning"],
          },
          {
            point: "Algorithms exploit dopamine loops",
            reason: "Apps are engineered to be addictive through endless scroll and notifications.",
            example: "TikTok teens average 95 minutes a day, often exceeding 4 hours.",
            collocations: ["attention economy", "dopamine-driven design"],
          },
        ],
      },
      {
        label: "Effects",
        labelVi: "Hậu quả",
        ideas: [
          {
            point: "Stunted face-to-face communication skills",
            reason: "Children miss real-world cues like tone and body language.",
            example: "British paediatricians report a 30% rise in delayed speech in pre-schoolers since 2015.",
            collocations: ["impaired social skills", "communication deficit"],
          },
          {
            point: "Rising rates of anxiety and depression",
            reason: "Social-media comparison harms self-esteem during formative years.",
            example: "Teen suicide rates correlate with the launch of smartphone-era social platforms (2010+).",
            collocations: ["mental-health epidemic", "comparison culture"],
          },
          {
            point: "Physical health deterioration",
            reason: "Sedentary screen time increases obesity, eye strain and poor posture.",
            example: "WHO links one extra screen-hour daily to 13% higher childhood obesity risk.",
            collocations: ["sedentary lifestyle", "myopia epidemic"],
          },
        ],
      },
    ],
    thesisOptions: [
      "Children's surging screen time results mainly from busy parenting and addictive app design, and unless curbed, it will likely cause long-lasting damage to their social skills, mental health and physical development.",
    ],
  },
  {
    id: "tech-ai-jobs",
    category: "technology",
    type: "advantages-disadvantages",
    prompt:
      "Artificial intelligence is increasingly being used to perform tasks that humans used to do. Do the advantages of this trend outweigh the disadvantages?",
    promptVi:
      "Trí tuệ nhân tạo ngày càng được sử dụng để làm những công việc trước đây của con người. Lợi ích của xu hướng này có lớn hơn bất lợi không?",
    sides: [
      {
        label: "Advantages",
        labelVi: "Lợi ích",
        ideas: [
          {
            point: "Frees humans from dangerous and tedious work",
            reason: "AI handles mining, bomb disposal and 24/7 assembly lines.",
            example: "Foxconn replaced 60,000 workers with robots, cutting industrial injury rates.",
            collocations: ["labour automation", "occupational safety"],
          },
          {
            point: "Boosts productivity and innovation",
            reason: "AI can analyse petabytes of data in seconds, accelerating research.",
            example: "DeepMind's AlphaFold predicted 200 million protein structures, transforming biology.",
            collocations: ["scientific breakthrough", "data-driven discovery"],
          },
          {
            point: "Creates new high-skill jobs",
            reason: "Roles like prompt engineer, AI ethicist and data curator did not exist 5 years ago.",
            example: "LinkedIn reports a 74% annual growth in AI-related job postings.",
            collocations: ["emerging professions", "high-value roles"],
          },
        ],
      },
      {
        label: "Disadvantages",
        labelVi: "Bất lợi",
        ideas: [
          {
            point: "Mass unemployment among low-skill workers",
            reason: "Routine cognitive jobs (cashiers, drivers) face wholesale displacement.",
            example: "Goldman Sachs estimates AI could replace 300 million jobs globally by 2030.",
            collocations: ["technological unemployment", "displacement risk"],
          },
          {
            point: "Erosion of human judgement and ethics",
            reason: "Outsourcing decisions to opaque algorithms creates accountability gaps.",
            example: "AI hiring tools have been shown to discriminate against women and minorities.",
            collocations: ["algorithmic bias", "ethical deficit"],
          },
          {
            point: "Concentration of wealth in tech giants",
            reason: "AI infrastructure favours firms with the deepest pockets.",
            example: "Just 5 companies control 80% of cutting-edge AI models.",
            collocations: ["monopoly power", "wealth concentration"],
          },
        ],
      },
    ],
    thesisOptions: [
      "While AI clearly enhances safety, productivity and scientific progress, I believe the long-term disadvantages — particularly mass displacement and algorithmic bias — outweigh the benefits unless governments intervene.",
    ],
  },

  // ========== HEALTH ==========
  {
    id: "health-junk-food-tax",
    category: "health",
    type: "opinion",
    prompt:
      "Some people believe governments should impose higher taxes on unhealthy food to combat obesity. To what extent do you agree?",
    promptVi:
      "Một số người tin rằng chính phủ nên đánh thuế cao hơn vào thực phẩm không lành mạnh để chống béo phì. Bạn đồng ý ở mức nào?",
    sides: [
      {
        label: "Agree — Tax junk food",
        labelVi: "Đồng ý — Đánh thuế thực phẩm rác",
        ideas: [
          {
            point: "Price signals change consumer behaviour",
            reason: "Higher prices nudge people toward healthier alternatives.",
            example: "Mexico's 2014 sugar tax cut sugary-drink sales by 12% in two years.",
            collocations: ["fiscal nudge", "price elasticity"],
          },
          {
            point: "Revenue funds public health initiatives",
            reason: "Tax income can subsidise vegetables, school meals and clinics.",
            example: "The UK's soft-drink levy raised £340 million for school sports programs.",
            collocations: ["earmarked revenue", "hypothecated tax"],
          },
          {
            point: "Lowers long-term healthcare costs",
            reason: "Preventing obesity is cheaper than treating diabetes or heart disease.",
            example: "Obesity-related diseases cost the US $173 billion a year.",
            collocations: ["preventive healthcare", "fiscal sustainability"],
          },
        ],
      },
      {
        label: "Disagree — Tax is the wrong tool",
        labelVi: "Không đồng ý — Thuế không phải giải pháp",
        ideas: [
          {
            point: "Disproportionately hurts the poor",
            reason: "Junk food is often the cheapest calorie source for low-income families.",
            example: "Critics call the UK soft-drink tax 'regressive', hitting working-class households hardest.",
            collocations: ["regressive policy", "social inequity"],
          },
          {
            point: "Education is more effective long-term",
            reason: "Nutrition literacy creates lasting behaviour change.",
            example: "Japan's compulsory 'shokuiku' food-education program contributes to its low obesity rate (4%).",
            collocations: ["health literacy", "long-term behaviour change"],
          },
          {
            point: "Restricts individual freedom",
            reason: "Adults should choose their own diet without state interference.",
            example: "New York City's failed soda-size ban was overturned for being paternalistic.",
            collocations: ["nanny state", "individual autonomy"],
          },
        ],
      },
    ],
    thesisOptions: [
      "I largely agree that taxing unhealthy food is justified, provided that the revenue is ring-fenced for public-health programs and the policy is paired with nutrition education to avoid disproportionately burdening the poor.",
    ],
  },
  {
    id: "health-mental-health-priority",
    category: "health",
    type: "opinion",
    prompt:
      "Mental health problems are now considered as serious as physical illnesses. To what extent do you agree or disagree?",
    promptVi:
      "Vấn đề sức khỏe tâm thần hiện được coi nghiêm trọng như bệnh thể chất. Bạn đồng ý hay không đồng ý ở mức nào?",
    sides: [
      {
        label: "Agree",
        labelVi: "Đồng ý",
        ideas: [
          {
            point: "Mental illness has direct physical consequences",
            reason: "Chronic depression raises mortality and weakens immunity.",
            example: "WHO data: untreated depression shortens life expectancy by 10-20 years.",
            collocations: ["psychosomatic impact", "comorbidity"],
          },
          {
            point: "Economic cost rivals physical disease",
            reason: "Lost productivity from anxiety and depression runs into trillions.",
            example: "WEF estimates mental illness will cost the global economy $6 trillion by 2030.",
            collocations: ["productivity loss", "economic burden"],
          },
          {
            point: "Mental suffering is just as real",
            reason: "Severe depression can be as disabling as a stroke.",
            example: "DALY (Disability-Adjusted Life Year) metrics rank depression in the top 5 conditions.",
            collocations: ["quality-adjusted life years", "subjective wellbeing"],
          },
        ],
      },
      {
        label: "Partly disagree — Physical illnesses still distinct",
        labelVi: "Một phần không đồng ý",
        ideas: [
          {
            point: "Physical illness is more easily diagnosable",
            reason: "Blood tests and scans give objective evidence; mental illness relies on self-report.",
            example: "Cancer biopsies are conclusive whereas depression diagnosis is criteria-based.",
            collocations: ["objective diagnosis", "diagnostic precision"],
          },
          {
            point: "Acute physical conditions can kill instantly",
            reason: "A heart attack requires immediate intervention; mental illness usually does not.",
            example: "Emergency rooms triage stroke ahead of panic attack.",
            collocations: ["acute care", "life-threatening condition"],
          },
        ],
      },
    ],
    thesisOptions: [
      "I strongly agree that mental health deserves parity with physical health, given its profound impact on lifespan, productivity and personal wellbeing.",
    ],
  },

  // ========== SOCIETY ==========
  {
    id: "soc-urban-migration",
    category: "society",
    type: "problem-solution",
    prompt:
      "Many people from rural areas are moving to cities in search of work, causing overcrowding. What problems does this cause, and what solutions can be implemented?",
    promptVi:
      "Nhiều người từ nông thôn chuyển đến thành phố tìm việc, gây ra tình trạng quá tải. Việc này gây ra những vấn đề gì và có thể áp dụng giải pháp nào?",
    sides: [
      {
        label: "Problems",
        labelVi: "Vấn đề",
        ideas: [
          {
            point: "Housing crisis and slum expansion",
            reason: "Supply cannot match demand, pushing prices up and migrants into informal settlements.",
            example: "Mumbai's Dharavi houses one million people in just 2.1 km².",
            collocations: ["housing shortage", "informal settlements"],
          },
          {
            point: "Strain on infrastructure",
            reason: "Roads, hospitals and schools become overwhelmed.",
            example: "Hanoi's morning commute times have doubled in a decade due to migration.",
            collocations: ["overburdened infrastructure", "service gap"],
          },
          {
            point: "Rural depopulation collapses villages",
            reason: "Loss of young workers means farms close and elderly are left isolated.",
            example: "Japan has over 8 million abandoned 'akiya' houses in shrinking villages.",
            collocations: ["rural decline", "demographic hollowing"],
          },
        ],
      },
      {
        label: "Solutions",
        labelVi: "Giải pháp",
        ideas: [
          {
            point: "Decentralise economic opportunities",
            reason: "Investing in second-tier cities attracts jobs away from megacities.",
            example: "South Korea relocated 36 ministries to Sejong City to ease Seoul congestion.",
            collocations: ["regional development", "decentralisation policy"],
          },
          {
            point: "Improve rural infrastructure and broadband",
            reason: "If villages have good roads and internet, remote work and agribusiness flourish.",
            example: "Vietnam's e-commerce growth allows farmers to sell directly via TikTok Shop.",
            collocations: ["digital inclusion", "rural revitalisation"],
          },
          {
            point: "Affordable urban housing programs",
            reason: "State-built apartments reduce the slum problem.",
            example: "Singapore's HDB houses 80% of citizens in affordable public flats.",
            collocations: ["public housing", "social housing scheme"],
          },
        ],
      },
    ],
    thesisOptions: [
      "Mass urban migration creates a housing shortage, infrastructure strain and rural collapse, but a coordinated strategy of regional development, rural digital investment and affordable urban housing can rebalance the problem.",
    ],
  },
  {
    id: "soc-aging-population",
    category: "society",
    type: "problem-solution",
    prompt:
      "Many countries are facing an aging population. What problems does this cause, and what can be done to address them?",
    promptVi:
      "Nhiều quốc gia đang đối mặt với dân số già hóa. Việc này gây ra vấn đề gì và có thể làm gì để giải quyết?",
    sides: [
      {
        label: "Problems",
        labelVi: "Vấn đề",
        ideas: [
          {
            point: "Shrinking workforce hurts the economy",
            reason: "Fewer young workers cannot fund pensions for retirees.",
            example: "Japan's working-age population dropped 13% from 1995 to 2020.",
            collocations: ["dependency ratio", "labour shortage"],
          },
          {
            point: "Healthcare costs surge",
            reason: "Elderly people require expensive long-term and chronic care.",
            example: "OECD projects health spending will rise from 8.8% to 14% of GDP by 2060.",
            collocations: ["healthcare burden", "long-term care"],
          },
          {
            point: "Social isolation of the elderly",
            reason: "Smaller families mean fewer relatives to care for grandparents.",
            example: "South Korea reports rising 'kodokushi' (lonely death) cases.",
            collocations: ["social isolation", "loneliness epidemic"],
          },
        ],
      },
      {
        label: "Solutions",
        labelVi: "Giải pháp",
        ideas: [
          {
            point: "Raise the retirement age gradually",
            reason: "Longer working lives ease pension strain.",
            example: "France raised its retirement age from 62 to 64 in 2023.",
            collocations: ["pension reform", "extended working life"],
          },
          {
            point: "Encourage immigration of young workers",
            reason: "Migrants fill labour gaps and pay taxes.",
            example: "Canada plans to admit 500,000 newcomers a year by 2025.",
            collocations: ["selective immigration", "labour market gap"],
          },
          {
            point: "Invest in elderly care infrastructure",
            reason: "Day-care centres and tele-health reduce isolation and hospitalisation.",
            example: "Netherlands' Hogeweyk dementia village provides community-based care.",
            collocations: ["age-friendly community", "community-based care"],
          },
        ],
      },
    ],
    thesisOptions: [
      "Aging populations threaten economic growth, healthcare budgets and social cohesion, but pension reform, smart immigration and age-friendly infrastructure can soften the impact.",
    ],
  },

  // ========== WORK ==========
  {
    id: "work-remote-future",
    category: "work",
    type: "advantages-disadvantages",
    prompt:
      "Working from home has become increasingly common. Do the advantages outweigh the disadvantages?",
    promptVi:
      "Làm việc tại nhà ngày càng phổ biến. Lợi ích có lớn hơn bất lợi không?",
    sides: [
      {
        label: "Advantages",
        labelVi: "Lợi ích",
        ideas: [
          {
            point: "Eliminates commuting time and stress",
            reason: "Saved hours boost productivity and family time.",
            example: "Stanford research: remote workers gained 70 extra working minutes per day.",
            collocations: ["commute-free lifestyle", "time savings"],
          },
          {
            point: "Widens the talent pool for companies",
            reason: "Firms can hire globally, not just locally.",
            example: "GitLab operates with 1,700 employees across 65 countries, no head office.",
            collocations: ["distributed workforce", "global talent pool"],
          },
          {
            point: "Reduces carbon emissions",
            reason: "Fewer cars on the road and lower office energy use.",
            example: "UK lockdown remote work cut CO2 emissions by 10% in 2020.",
            collocations: ["green commuting", "low-carbon work"],
          },
        ],
      },
      {
        label: "Disadvantages",
        labelVi: "Bất lợi",
        ideas: [
          {
            point: "Erodes work-life boundaries",
            reason: "Home becomes the office, leading to burnout.",
            example: "Microsoft reports a 40% rise in after-hours messaging since 2020.",
            collocations: ["always-on culture", "work-life blur"],
          },
          {
            point: "Weakens team cohesion and mentoring",
            reason: "Junior employees miss informal learning moments.",
            example: "Google found new graduates onboarding remotely took 50% longer to reach productivity.",
            collocations: ["loss of mentorship", "team cohesion"],
          },
          {
            point: "Empties city centres economically",
            reason: "Restaurants and shops near offices lose footfall.",
            example: "Manhattan office occupancy was still at 47% in 2023, hurting local businesses.",
            collocations: ["urban hollowing", "commercial decline"],
          },
        ],
      },
    ],
    thesisOptions: [
      "While remote work clearly saves time and broadens hiring pools, I believe a hybrid model is necessary to preserve mentorship, mental health and city economies.",
    ],
  },

  // ========== GLOBALISATION ==========
  {
    id: "global-english-dominance",
    category: "globalisation",
    type: "advantages-disadvantages",
    prompt:
      "English is increasingly becoming the global lingua franca. Do the advantages of this trend outweigh the disadvantages?",
    promptVi:
      "Tiếng Anh ngày càng trở thành ngôn ngữ chung toàn cầu. Lợi ích có lớn hơn bất lợi không?",
    sides: [
      {
        label: "Advantages",
        labelVi: "Lợi ích",
        ideas: [
          {
            point: "Facilitates international cooperation",
            reason: "Scientists, diplomats and business people can collaborate seamlessly.",
            example: "98% of scientific papers are published in English.",
            collocations: ["common medium", "cross-border collaboration"],
          },
          {
            point: "Boosts career mobility",
            reason: "Bilingual professionals access global job markets.",
            example: "Vietnamese IT graduates with English earn 60% more than monolingual peers.",
            collocations: ["employability premium", "global mobility"],
          },
          {
            point: "Spreads knowledge and culture",
            reason: "Online courses, films and books reach billions through one language.",
            example: "Coursera and Khan Academy democratise education in English.",
            collocations: ["knowledge dissemination", "cultural diffusion"],
          },
        ],
      },
      {
        label: "Disadvantages",
        labelVi: "Bất lợi",
        ideas: [
          {
            point: "Threatens minority languages",
            reason: "Young people abandon native tongues for English.",
            example: "UNESCO warns 40% of the world's 7,000 languages risk extinction.",
            collocations: ["linguistic erosion", "endangered languages"],
          },
          {
            point: "Cultural homogenisation",
            reason: "Western values spread along with the language.",
            example: "Hollywood dominates 70% of global box office, sidelining local cinema.",
            collocations: ["cultural imperialism", "loss of diversity"],
          },
          {
            point: "Native English speakers gain unfair advantage",
            reason: "Non-natives must invest years to compete on equal footing.",
            example: "TOEFL/IELTS costs and visa requirements disadvantage non-native graduate applicants.",
            collocations: ["linguistic inequality", "native-speaker privilege"],
          },
        ],
      },
    ],
    thesisOptions: [
      "Although English-as-lingua-franca enables unprecedented global cooperation, the price — linguistic erosion and cultural homogenisation — is significant; in my view the benefits still outweigh the drawbacks if local languages are actively protected.",
    ],
  },

  // ========== GOVERNMENT ==========
  {
    id: "gov-arts-funding",
    category: "government",
    type: "opinion",
    prompt:
      "Some people believe governments should spend money on arts and culture, while others think this is a waste of public funds. Discuss both views and give your opinion.",
    promptVi:
      "Một số người cho rằng chính phủ nên chi tiền cho nghệ thuật và văn hóa, trong khi những người khác cho rằng đây là sự lãng phí tiền công. Thảo luận cả hai quan điểm và đưa ra ý kiến.",
    sides: [
      {
        label: "Should fund arts",
        labelVi: "Nên tài trợ nghệ thuật",
        ideas: [
          {
            point: "Arts shape national identity",
            reason: "Museums, theatre and heritage build cultural pride.",
            example: "The British Museum draws 6 million visitors a year, projecting soft power.",
            collocations: ["cultural identity", "soft power"],
          },
          {
            point: "Generates tourism and jobs",
            reason: "Cultural sites attract foreign currency.",
            example: "France's Louvre alone generates over €100 million annually.",
            collocations: ["creative economy", "cultural tourism"],
          },
          {
            point: "Enhances education and wellbeing",
            reason: "Exposure to art improves creativity and mental health.",
            example: "UK studies show arts in schools boost academic results by 17%.",
            collocations: ["holistic development", "cognitive benefits"],
          },
        ],
      },
      {
        label: "Funds better spent elsewhere",
        labelVi: "Nên chi cho việc khác",
        ideas: [
          {
            point: "Healthcare and education are more urgent",
            reason: "Lifesaving services should come before luxuries.",
            example: "A single hospital wing serves more people than a state theatre.",
            collocations: ["budget priorities", "essential services"],
          },
          {
            point: "Private sponsorship can fill the gap",
            reason: "Corporations and philanthropy fund arts in the US successfully.",
            example: "The Met Museum runs largely on private donations.",
            collocations: ["private patronage", "philanthropic funding"],
          },
        ],
      },
    ],
    thesisOptions: [
      "I believe modest public funding for arts is justified because it builds identity, attracts tourism and improves wellbeing, but it should not crowd out essential spending on healthcare and education.",
    ],
  },

  // ========== MEDIA ==========
  {
    id: "media-fake-news",
    category: "media",
    type: "problem-solution",
    prompt:
      "The spread of fake news on the internet has become a major problem. What are the causes and what solutions can be taken?",
    promptVi:
      "Việc lan truyền tin giả trên internet đã trở thành vấn đề lớn. Nguyên nhân là gì và có thể đưa ra giải pháp nào?",
    sides: [
      {
        label: "Causes",
        labelVi: "Nguyên nhân",
        ideas: [
          {
            point: "Engagement-driven algorithms reward outrage",
            reason: "Platforms profit from clicks, regardless of accuracy.",
            example: "MIT research: false news spreads 6 times faster than truth on Twitter.",
            collocations: ["algorithmic amplification", "engagement bait"],
          },
          {
            point: "Low media literacy among users",
            reason: "Many readers cannot distinguish credible journalism from clickbait.",
            example: "Stanford study: 80% of US students confused sponsored content with news.",
            collocations: ["media illiteracy", "critical thinking gap"],
          },
          {
            point: "Foreign interference and political agendas",
            reason: "State actors weaponise disinformation to sway elections.",
            example: "The 2016 US election saw documented Russian troll-farm interference.",
            collocations: ["state-sponsored disinformation", "information warfare"],
          },
        ],
      },
      {
        label: "Solutions",
        labelVi: "Giải pháp",
        ideas: [
          {
            point: "Platform accountability and content labels",
            reason: "Tagging or removing false posts limits viral spread.",
            example: "Meta partners with fact-checkers and labels disputed content.",
            collocations: ["content moderation", "platform accountability"],
          },
          {
            point: "Media literacy in schools",
            reason: "Teaching source-checking from a young age inoculates future voters.",
            example: "Finland's school curriculum trains pupils to spot disinformation.",
            collocations: ["digital literacy", "civic education"],
          },
          {
            point: "Support independent journalism",
            reason: "Well-funded reporting fills the trust vacuum.",
            example: "Public broadcasters like BBC and NPR maintain high credibility scores.",
            collocations: ["quality journalism", "public-service media"],
          },
        ],
      },
    ],
    thesisOptions: [
      "Fake news thrives on profit-driven algorithms, low literacy and political manipulation; the antidote is a triad of platform regulation, school-based media literacy and well-funded independent journalism.",
    ],
  },

  // ========== FAMILY ==========
  {
    id: "family-traditional-values",
    category: "family",
    type: "discussion",
    prompt:
      "Some people believe traditional family values are disappearing, while others think families are simply changing. Discuss both views and give your opinion.",
    promptVi:
      "Một số người tin rằng các giá trị gia đình truyền thống đang biến mất, trong khi những người khác cho rằng gia đình chỉ đang thay đổi. Thảo luận cả hai quan điểm và đưa ra ý kiến.",
    sides: [
      {
        label: "Values are disappearing",
        labelVi: "Giá trị đang biến mất",
        ideas: [
          {
            point: "Multi-generational households are vanishing",
            reason: "Young adults move out earlier; grandparents are placed in care homes.",
            example: "In Vietnam, the share of three-generation households fell from 30% to 17% in two decades.",
            collocations: ["nuclear family", "erosion of tradition"],
          },
          {
            point: "Divorce rates are climbing",
            reason: "Marriage is no longer considered lifelong.",
            example: "Vietnam's divorce rate doubled between 2000 and 2020.",
            collocations: ["marital instability", "rising divorce"],
          },
          {
            point: "Materialism replaces filial piety",
            reason: "Career ambitions override traditional duties to parents.",
            example: "Urban professionals often replace visits with money transfers.",
            collocations: ["filial piety", "commodified care"],
          },
        ],
      },
      {
        label: "Families are simply changing",
        labelVi: "Gia đình chỉ đang thay đổi",
        ideas: [
          {
            point: "New family forms reflect equality",
            reason: "Dual-income, single-parent and same-sex families are valid.",
            example: "Sweden's diverse family models coexist with high happiness rankings.",
            collocations: ["family diversity", "evolving norms"],
          },
          {
            point: "Quality time replaces strict hierarchy",
            reason: "Modern parenting emphasises emotional closeness over obedience.",
            example: "Surveys show today's fathers spend triple the time with children compared to the 1960s.",
            collocations: ["emotional bonding", "involved parenting"],
          },
          {
            point: "Technology keeps families connected",
            reason: "Video calls let migrants stay close to elderly parents.",
            example: "Filipino OFWs maintain daily contact with families abroad via Zalo or WhatsApp.",
            collocations: ["digital intimacy", "virtual closeness"],
          },
        ],
      },
    ],
    thesisOptions: [
      "I believe traditional family values are not disappearing but evolving: structures change, yet the underlying bonds of care, communication and shared identity remain — and in many ways are even stronger thanks to technology.",
    ],
  },
];

export const IELTS_IDEA_TOPICS = TOPICS;

export const IDEA_CATEGORIES: { id: IdeaCategory; label: string; labelVi: string; icon: string }[] = [
  { id: "education", label: "Education", labelVi: "Giáo dục", icon: "🎓" },
  { id: "environment", label: "Environment", labelVi: "Môi trường", icon: "🌍" },
  { id: "technology", label: "Technology", labelVi: "Công nghệ", icon: "💻" },
  { id: "health", label: "Health", labelVi: "Sức khỏe", icon: "🏥" },
  { id: "society", label: "Society", labelVi: "Xã hội", icon: "👥" },
  { id: "work", label: "Work", labelVi: "Công việc", icon: "💼" },
  { id: "globalisation", label: "Globalisation", labelVi: "Toàn cầu hóa", icon: "🌐" },
  { id: "government", label: "Government", labelVi: "Chính phủ", icon: "🏛️" },
  { id: "media", label: "Media", labelVi: "Truyền thông", icon: "📰" },
  { id: "family", label: "Family", labelVi: "Gia đình", icon: "👨‍👩‍👧" },
];
