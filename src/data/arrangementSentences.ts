// Full sentence fragments for arrangement questions (Q13-Q17) across all 20 exams
// Each key is "examId-questionId" and value is an object with sentences keyed by letter

export interface ArrangementData {
  instruction: string; // Brief instruction for the question
  sentences: Record<string, string>; // e.g. { a: "...", b: "...", c: "...", d: "...", e: "..." }
}

export const arrangementSentences: Record<string, ArrangementData> = {
  // ========== EXAM 01 ==========
  "thpt-01-13": {
    instruction: "Arrange the sentences to form a complete email to Professor Williams.",
    sentences: {
      a: "I have been experiencing some difficulties with the advanced calculus assignments, particularly the integration techniques covered in Chapter 7.",
      b: "Dear Professor Williams, thank you so much for your detailed feedback on my midterm examination.",
      c: "Your clear explanation during office hours helped me understand the fundamental concepts much better.",
      d: "Before our meeting, I was quite confused about the relationship between differential equations and real-world applications.",
      e: "I look forward to discussing these topics further in our next tutorial session on Thursday."
    }
  },
  "thpt-01-14": {
    instruction: "Arrange the sentences to form a coherent paragraph about urban planning.",
    sentences: {
      a: "Urban planners must integrate sustainable transportation networks with green infrastructure to create livable environments.",
      b: "Modern cities face unprecedented challenges in managing rapid population growth while maintaining quality of life.",
      c: "Furthermore, efficient public transport systems reduce carbon emissions and alleviate traffic congestion significantly.",
      d: "As populations continue to migrate toward urban centers, the demand for housing and services intensifies.",
      e: "Innovative solutions such as vertical gardens and smart traffic management offer promising pathways forward."
    }
  },
  "thpt-01-15": {
    instruction: "Arrange the dialogue about AI in healthcare.",
    sentences: {
      a: "Marcus: But don't you think there are serious ethical concerns about AI making life-or-death medical decisions?",
      b: "Elena: Absolutely, that's why I believe we need robust regulatory frameworks before widespread clinical deployment.",
      c: "Elena: Our latest research shows that AI diagnostic systems can detect certain cancers 30% earlier than traditional methods."
    }
  },
  "thpt-01-16": {
    instruction: "Arrange the sentences to form a passage about personalized medicine.",
    sentences: {
      a: "Revolutionary biotechnology companies are now developing treatments tailored to individual genetic profiles.",
      b: "These innovations promise to transform how we approach chronic diseases and rare genetic conditions.",
      c: "Traditional medical approaches have relied on standardized treatments designed for the average patient.",
      d: "However, regulatory frameworks have not kept pace with the rapid advancement of genomic technologies.",
      e: "If successful, personalized medicine could dramatically reduce adverse drug reactions and improve treatment outcomes."
    }
  },
  "thpt-01-17": {
    instruction: "Arrange the dialogue about climate change.",
    sentences: {
      a: "Dr. Chen: The latest IPCC report confirms that global temperatures have already risen 1.1°C above pre-industrial levels.",
      b: "Prof. Adams: I completely agree. The scientific evidence is now overwhelming and demands immediate action.",
      c: "Prof. Adams: International cooperation through binding agreements is absolutely essential for meaningful progress.",
      d: "Dr. Chen: What specific measures do you think governments should prioritize in their climate response strategies?",
      e: "Dr. Chen: Specifically, we need massive investment in renewable energy infrastructure and carbon capture technology."
    }
  },

  // ========== EXAM 02 ==========
  "thpt-02-13": {
    instruction: "Arrange the sentences to form a formal letter about research collaboration.",
    sentences: {
      a: "I am particularly interested in exploring the intersection of quantum mechanics and materials science.",
      b: "Dear Dr. Nakamura, I am writing to express my sincere gratitude for accepting our research proposal.",
      c: "Your laboratory's expertise in nanofabrication would complement our theoretical modeling capabilities perfectly.",
      d: "I propose we schedule an initial video conference to discuss the project timeline and resource allocation.",
      e: "Together, I believe we can produce groundbreaking results that will advance the field significantly."
    }
  },
  "thpt-02-14": {
    instruction: "Arrange the sentences to form an academic paragraph about digital literacy.",
    sentences: {
      a: "Educational institutions must therefore redesign curricula to incorporate critical digital thinking skills.",
      b: "The proliferation of digital technology has fundamentally transformed how information is created and consumed.",
      c: "Students who develop strong digital literacy are better equipped to navigate misinformation.",
      d: "However, many school systems have been slow to adapt their teaching methodologies to this new reality.",
      e: "Partnerships between technology companies and educators can help bridge this critical skills gap."
    }
  },
  "thpt-02-15": {
    instruction: "Arrange the dialogue about renewable energy.",
    sentences: {
      a: "Dr. Park: Exactly. Battery storage technology has improved dramatically, making solar viable even in cloudy regions.",
      b: "Prof. Liu: Recent advances in solar panel efficiency have exceeded all predictions from just five years ago.",
      c: "Prof. Liu: The real breakthrough, however, will come when we solve the intermittency problem completely."
    }
  },
  "thpt-02-16": {
    instruction: "Arrange the sentences about autonomous vehicles.",
    sentences: {
      a: "Self-driving cars represent perhaps the most transformative transportation innovation since the automobile itself.",
      b: "Insurance models and liability frameworks will need complete overhaul to accommodate autonomous systems.",
      c: "The technology relies on sophisticated sensor arrays, machine learning algorithms, and real-time data processing.",
      d: "Despite impressive technological progress, full autonomy in complex urban environments remains several years away.",
      e: "Regulatory bodies worldwide are struggling to create appropriate legal frameworks for autonomous vehicle deployment."
    }
  },
  "thpt-02-17": {
    instruction: "Arrange the dialogue about space exploration.",
    sentences: {
      a: "Dr. Reeves: The discovery of water ice on Mars has reignited serious discussion about human colonization.",
      b: "Prof. Singh: However, the psychological challenges of long-duration spaceflight should not be underestimated.",
      c: "Dr. Reeves: Agreed. NASA's HI-SEAS experiments have revealed significant mental health risks for isolated crews.",
      d: "Prof. Singh: What about the radiation exposure during the six-month transit? That seems like a major barrier.",
      e: "Dr. Reeves: New shielding materials using hydrogen-rich polymers show promising results in laboratory tests."
    }
  },

  // ========== EXAM 03 ==========
  "thpt-03-13": {
    instruction: "Arrange the sentences to form a formal letter about scholarship application.",
    sentences: {
      a: "My research interests align closely with your department's focus on sustainable development and environmental policy.",
      b: "Dear Admissions Committee, I am writing to apply for the Chancellor's Distinguished Scholarship for the 2025–2026 academic year.",
      c: "During my undergraduate studies, I maintained a 3.9 GPA while leading two community service organizations.",
      d: "I am confident that this scholarship would enable me to make meaningful contributions to your research community.",
      e: "Additionally, my internship at the World Wildlife Fund provided invaluable field experience in conservation biology."
    }
  },
  "thpt-03-14": {
    instruction: "Arrange the sentences to form an academic paragraph about artificial intelligence ethics.",
    sentences: {
      a: "As AI systems become more autonomous, the question of accountability becomes increasingly complex.",
      b: "The rapid development of artificial intelligence has outpaced the creation of ethical guidelines.",
      c: "Philosophers argue that we need new frameworks that go beyond traditional notions of responsibility.",
      d: "When an autonomous vehicle causes an accident, determining legal and moral fault remains unresolved.",
      e: "International cooperation is essential to establish universal standards for AI governance."
    }
  },
  "thpt-03-15": {
    instruction: "Arrange the dialogue about genetic engineering.",
    sentences: {
      a: "Dr. Kim: The potential to eliminate hereditary diseases is extraordinary, but the ethical implications are profound.",
      b: "Prof. Mueller: I share your enthusiasm, but where exactly do we draw the line between therapy and enhancement?",
      c: "Dr. Kim: That's precisely why we need inclusive public dialogue before commercializing these technologies."
    }
  },
  "thpt-03-16": {
    instruction: "Arrange the sentences about ocean conservation.",
    sentences: {
      a: "Marine protected areas have proven effective in restoring fish populations and coral reef ecosystems.",
      b: "Overfishing and pollution threaten to collapse entire marine food chains within decades.",
      c: "The world's oceans provide critical ecosystem services worth an estimated $24 trillion annually.",
      d: "International treaties like the UN High Seas Treaty represent significant progress in ocean governance.",
      e: "However, enforcement remains challenging given the vast scale of international waters."
    }
  },
  "thpt-03-17": {
    instruction: "Arrange the debate about universal basic income.",
    sentences: {
      a: "Proponents argue that UBI would provide a safety net against technological unemployment.",
      b: "Critics counter that unconditional payments could reduce work incentives and strain government budgets.",
      c: "Finland's pilot program showed modest improvements in wellbeing but limited employment effects.",
      d: "The concept of universal basic income has gained traction across the political spectrum.",
      e: "Ultimately, the feasibility of UBI depends on each country's economic structure and social values."
    }
  },

  // ========== EXAM 04 ==========
  "thpt-04-13": {
    instruction: "Arrange the sentences to form a formal letter about an internship opportunity.",
    sentences: {
      a: "My coursework in data analytics and machine learning has equipped me with strong technical foundations.",
      b: "Dear Ms. Thompson, I am writing to express my keen interest in the summer internship position at TechVision Labs.",
      c: "I was particularly impressed by your company's innovative approach to healthcare data management.",
      d: "I would welcome the opportunity to discuss how my skills could contribute to your current projects.",
      e: "Last semester, I completed a capstone project analyzing hospital readmission patterns using predictive modeling."
    }
  },
  "thpt-04-14": {
    instruction: "Arrange the sentences about sustainable fashion.",
    sentences: {
      a: "Consumers are increasingly demanding transparency about the environmental impact of their clothing purchases.",
      b: "The fashion industry is the second-largest polluter globally, generating 10% of all carbon emissions.",
      c: "Innovative materials like mushroom leather and recycled ocean plastic offer promising alternatives.",
      d: "Fast fashion's business model of rapid production cycles creates enormous textile waste in landfills.",
      e: "Circular fashion concepts that prioritize durability, repair, and recycling are gaining market share."
    }
  },
  "thpt-04-15": {
    instruction: "Arrange the dialogue about mental health in universities.",
    sentences: {
      a: "Dean Harris: We've seen a 40% increase in counseling requests since the pandemic began.",
      b: "Dr. Santos: Peer support programs have shown remarkable effectiveness in early intervention studies.",
      c: "Dean Harris: That's encouraging. We should integrate such programs into our student wellness framework."
    }
  },
  "thpt-04-16": {
    instruction: "Arrange the sentences about cryptocurrency regulation.",
    sentences: {
      a: "Decentralized finance challenges traditional banking oversight and consumer protection mechanisms.",
      b: "Several countries have implemented comprehensive regulatory frameworks for digital asset trading.",
      c: "The rapid growth of cryptocurrency markets has caught financial regulators largely unprepared.",
      d: "Balancing innovation with investor protection remains the central challenge for policymakers worldwide.",
      e: "International coordination through organizations like the G20 is essential to prevent regulatory arbitrage."
    }
  },
  "thpt-04-17": {
    instruction: "Arrange the debate about social media and democracy.",
    sentences: {
      a: "Social media platforms have democratized information access but also amplified misinformation.",
      b: "Studies show that algorithmic content curation creates echo chambers that polarize political discourse.",
      c: "Free speech advocates warn that content moderation risks censoring legitimate political expression.",
      d: "The 2016 and 2020 elections demonstrated social media's outsized influence on democratic processes.",
      e: "Platform accountability legislation must carefully balance free expression with democratic integrity."
    }
  },

  // ========== EXAM 05 ==========
  "thpt-05-13": {
    instruction: "Arrange the sentences to form a formal complaint letter.",
    sentences: {
      a: "The product I received was significantly different from the description on your website.",
      b: "Dear Customer Service Manager, I am writing to formally register a complaint about Order #45782.",
      c: "I have attached photographs documenting the damage and discrepancies for your reference.",
      d: "Despite multiple attempts to contact your support team by phone, I have not received any response.",
      e: "I request a full refund or replacement within 14 business days, in accordance with your return policy."
    }
  },
  "thpt-05-14": {
    instruction: "Arrange the sentences about the future of work.",
    sentences: {
      a: "Automation will eliminate many routine tasks but simultaneously create new categories of employment.",
      b: "The workplace of 2030 will look fundamentally different from today's office-centric model.",
      c: "Lifelong learning and continuous skill development will become essential for career resilience.",
      d: "Remote and hybrid work arrangements have already proven viable across most knowledge-work sectors.",
      e: "Organizations that invest in employee reskilling programs will gain significant competitive advantages."
    }
  },
  "thpt-05-15": {
    instruction: "Arrange the dialogue about food security.",
    sentences: {
      a: "Dr. Okonkwo: Vertical farming and precision agriculture could revolutionize food production in urban areas.",
      b: "Prof. Chen: But we must ensure these technologies are accessible to developing nations, not just wealthy ones.",
      c: "Dr. Okonkwo: Absolutely. Technology transfer agreements and open-source agricultural tools are crucial steps."
    }
  },
  "thpt-05-16": {
    instruction: "Arrange the sentences about data privacy.",
    sentences: {
      a: "The European Union's GDPR has set a global benchmark for personal data protection standards.",
      b: "Corporate data collection practices have expanded dramatically with the growth of digital services.",
      c: "However, enforcement gaps and cross-border jurisdiction issues continue to undermine privacy protections.",
      d: "Citizens increasingly demand greater control over how their personal information is collected and used.",
      e: "Emerging technologies like blockchain could provide individuals with more transparent data ownership."
    }
  },
  "thpt-05-17": {
    instruction: "Arrange the debate about nuclear energy.",
    sentences: {
      a: "Nuclear power provides reliable, low-carbon baseload electricity that renewables alone cannot match.",
      b: "Opponents cite the unresolved problem of radioactive waste storage spanning thousands of years.",
      c: "New generation small modular reactors promise improved safety features and reduced construction costs.",
      d: "The Fukushima disaster demonstrated that even advanced safety systems can fail under extreme conditions.",
      e: "A balanced energy transition strategy may require nuclear as a bridge technology alongside renewables."
    }
  },

  // ========== EXAM 06 ==========
  "thpt-06-13": {
    instruction: "Arrange the sentences to form a recommendation letter.",
    sentences: {
      a: "Her analytical skills and creative problem-solving abilities consistently impressed both faculty and peers.",
      b: "Dear Selection Committee, I am writing to wholeheartedly recommend Ms. Sarah Chen for your graduate program.",
      c: "As her thesis advisor for two years, I have observed her exceptional intellectual curiosity and dedication.",
      d: "I am confident she will make outstanding contributions to your department's research endeavors.",
      e: "Her published paper on machine learning applications in linguistics received recognition at three international conferences."
    }
  },
  "thpt-06-14": {
    instruction: "Arrange the sentences about biodiversity loss.",
    sentences: {
      a: "Conservation corridors connecting fragmented habitats have shown success in sustaining wildlife populations.",
      b: "The current rate of species extinction is estimated to be 1,000 times higher than the natural background rate.",
      c: "Habitat destruction, primarily through deforestation and urbanization, remains the leading driver of biodiversity loss.",
      d: "Indigenous communities possess invaluable traditional knowledge about ecosystem management and species preservation.",
      e: "International agreements like the Kunming-Montreal Framework aim to protect 30% of Earth's surface by 2030."
    }
  },
  "thpt-06-15": {
    instruction: "Arrange the dialogue about education reform.",
    sentences: {
      a: "Minister Tran: Our new curriculum emphasizes critical thinking and problem-solving over rote memorization.",
      b: "Prof. Nguyen: That's a positive step, but teacher training must be significantly enhanced to support this shift.",
      c: "Minister Tran: You're right. We've allocated $500 million for professional development over the next five years."
    }
  },
  "thpt-06-16": {
    instruction: "Arrange the sentences about telemedicine.",
    sentences: {
      a: "The COVID-19 pandemic accelerated the adoption of telemedicine by approximately ten years.",
      b: "Virtual consultations now account for over 30% of primary care visits in many developed countries.",
      c: "Remote patient monitoring devices enable continuous health tracking outside traditional clinical settings.",
      d: "However, the digital divide means rural and elderly populations often lack access to telehealth services.",
      e: "Hybrid models combining in-person and virtual care appear to offer the best patient outcomes."
    }
  },
  "thpt-06-17": {
    instruction: "Arrange the debate about animal testing.",
    sentences: {
      a: "Animal testing has contributed to nearly every medical breakthrough of the past century.",
      b: "However, advances in organ-on-chip technology and computer modeling offer viable alternatives.",
      c: "Ethical concerns about animal suffering have prompted growing public opposition to laboratory testing.",
      d: "The European Union has already banned cosmetic testing on animals, setting a global precedent.",
      e: "A gradual transition toward alternative methods, while maintaining rigorous safety standards, seems inevitable."
    }
  },

  // ========== EXAM 07 ==========
  "thpt-07-13": {
    instruction: "Arrange the sentences to form a formal letter about a conference invitation.",
    sentences: {
      a: "My current research on sustainable urban development aligns closely with this year's conference theme.",
      b: "Dear Dr. Martinez, I am honored to accept your invitation to present at the International Sustainability Forum.",
      c: "I would like to propose a 45-minute keynote presentation followed by a panel discussion session.",
      d: "Additionally, I plan to showcase our latest findings on carbon-neutral building materials.",
      e: "Please let me know the technical requirements and submission deadlines at your earliest convenience."
    }
  },
  "thpt-07-14": {
    instruction: "Arrange the sentences about water scarcity.",
    sentences: {
      a: "Desalination technology has become more energy-efficient but remains costly for developing nations.",
      b: "By 2030, global water demand is projected to exceed supply by 40%, creating severe shortages.",
      c: "Climate change is disrupting rainfall patterns, making traditional water management strategies inadequate.",
      d: "Innovative solutions like fog harvesting and atmospheric water generators show promise in arid regions.",
      e: "International cooperation on transboundary river management is essential to prevent water-related conflicts."
    }
  },
  "thpt-07-15": {
    instruction: "Arrange the dialogue about cybersecurity threats.",
    sentences: {
      a: "Expert Lee: Ransomware attacks on critical infrastructure have increased by 300% in the past two years.",
      b: "Analyst Park: That's alarming. Are governments investing enough in cyber defense capabilities?",
      c: "Expert Lee: Unfortunately, most nations are still playing catch-up against increasingly sophisticated threat actors."
    }
  },
  "thpt-07-16": {
    instruction: "Arrange the sentences about aging populations.",
    sentences: {
      a: "Japan's experience with super-aging provides valuable lessons for countries facing similar demographic shifts.",
      b: "By 2050, one in six people globally will be over the age of 65, straining pension and healthcare systems.",
      c: "Robotics and AI-powered care systems may help address the growing shortage of elderly care workers.",
      d: "Raising retirement ages and encouraging immigration are common policy responses to demographic decline.",
      e: "The economic impact of aging populations extends beyond healthcare to productivity, innovation, and fiscal policy."
    }
  },
  "thpt-07-17": {
    instruction: "Arrange the debate about standardized testing.",
    sentences: {
      a: "Standardized tests provide objective, comparable measures of student achievement across diverse populations.",
      b: "Critics argue that such tests measure test-taking ability rather than genuine learning or intelligence.",
      c: "Research shows that socioeconomic background significantly influences test performance, raising equity concerns.",
      d: "Portfolio-based assessment and project evaluations offer more holistic measures of student capabilities.",
      e: "A balanced assessment system combining multiple evaluation methods may best serve educational goals."
    }
  },

  // ========== EXAM 08 ==========
  "thpt-08-13": {
    instruction: "Arrange the sentences to form a formal letter about a job application.",
    sentences: {
      a: "My five years of experience in digital marketing have equipped me with expertise in SEO and content strategy.",
      b: "Dear Hiring Manager, I am writing to apply for the Senior Marketing Director position advertised on LinkedIn.",
      c: "At my previous company, I led a team that increased organic traffic by 200% within eighteen months.",
      d: "I am particularly drawn to your company's commitment to data-driven marketing and brand storytelling.",
      e: "I would welcome the opportunity to discuss how my experience aligns with your team's strategic objectives."
    }
  },
  "thpt-08-14": {
    instruction: "Arrange the sentences about microplastic pollution.",
    sentences: {
      a: "Scientists have discovered microplastics in human blood, raising urgent questions about long-term health effects.",
      b: "Every year, approximately 8 million tons of plastic waste enters the world's oceans.",
      c: "These tiny particles, smaller than 5mm, are ingested by marine organisms and enter the food chain.",
      d: "Single-use plastic bans in over 60 countries represent a significant but insufficient response.",
      e: "Developing biodegradable alternatives and improving waste management infrastructure are equally critical strategies."
    }
  },
  "thpt-08-15": {
    instruction: "Arrange the dialogue about mental health stigma.",
    sentences: {
      a: "Counselor Tran: In many Asian cultures, discussing mental health openly remains deeply taboo.",
      b: "Dr. Pham: Yes, but younger generations are increasingly challenging these cultural norms through social media advocacy.",
      c: "Counselor Tran: That's true. We need to build on this momentum by integrating mental health education into schools."
    }
  },
  "thpt-08-16": {
    instruction: "Arrange the sentences about smart cities.",
    sentences: {
      a: "Integrated sensor networks collect real-time data on traffic flow, air quality, and energy consumption.",
      b: "The concept of smart cities promises to optimize urban living through technology and data analytics.",
      c: "Singapore and Barcelona have emerged as global leaders in implementing comprehensive smart city strategies.",
      d: "Privacy concerns arise when city governments collect vast amounts of personal movement data.",
      e: "Citizen engagement and transparent governance are essential for the ethical deployment of smart city technologies."
    }
  },
  "thpt-08-17": {
    instruction: "Arrange the debate about genetic modification of food.",
    sentences: {
      a: "GM crops have significantly increased yields and reduced pesticide use in many agricultural regions.",
      b: "Consumer resistance to genetically modified foods remains strong, particularly in European markets.",
      c: "Labeling requirements vary dramatically between countries, creating confusion for international trade.",
      d: "Golden Rice, engineered to combat vitamin A deficiency, exemplifies the humanitarian potential of GM technology.",
      e: "Scientific consensus confirms that currently approved GM foods are safe for human consumption."
    }
  },

  // ========== EXAM 09 ==========
  "thpt-09-13": {
    instruction: "Arrange the sentences to form a formal letter about a community initiative.",
    sentences: {
      a: "Our neighborhood association has identified littering and illegal dumping as the most pressing local issues.",
      b: "Dear Mayor Johnson, I am writing on behalf of the Riverside Community Association regarding our Clean Streets Initiative.",
      c: "We propose organizing monthly community clean-up events with support from the city's waste management department.",
      d: "Additionally, we request the installation of more recycling bins and better street lighting in affected areas.",
      e: "We believe this partnership between residents and local government will significantly improve our neighborhood's quality of life."
    }
  },
  "thpt-09-14": {
    instruction: "Arrange the sentences about the gig economy.",
    sentences: {
      a: "Platform workers frequently lack access to health insurance, retirement benefits, and employment protections.",
      b: "The gig economy has expanded rapidly, with an estimated 36% of U.S. workers now participating.",
      c: "Companies like Uber and TaskRabbit have disrupted traditional employment models across multiple industries.",
      d: "Labor unions and advocacy groups are pushing for legislation to classify gig workers as employees.",
      e: "Portable benefits systems that follow workers across multiple employers offer a promising middle ground."
    }
  },
  "thpt-09-15": {
    instruction: "Arrange the dialogue about deforestation.",
    sentences: {
      a: "Ecologist Silva: Satellite monitoring has revealed that Amazon deforestation increased 22% last year alone.",
      b: "Policy Advisor Wang: What enforcement mechanisms could effectively deter illegal logging in remote regions?",
      c: "Ecologist Silva: A combination of real-time satellite alerts, increased penalties, and indigenous land rights protection has shown results in some areas."
    }
  },
  "thpt-09-16": {
    instruction: "Arrange the sentences about antibiotic resistance.",
    sentences: {
      a: "Without effective antibiotics, routine surgeries and cancer treatments could become life-threateningly dangerous.",
      b: "The overuse of antibiotics in both human medicine and agriculture has accelerated bacterial resistance.",
      c: "Antibiotic-resistant infections already claim over 700,000 lives annually and could reach 10 million by 2050.",
      d: "New drug development pipelines are insufficient, as pharmaceutical companies find antibiotics less profitable than chronic disease medications.",
      e: "Global stewardship programs promoting responsible antibiotic use represent our best defense against this growing threat."
    }
  },
  "thpt-09-17": {
    instruction: "Arrange the debate about immigration policy.",
    sentences: {
      a: "Immigration provides significant economic benefits through labor force growth and entrepreneurial activity.",
      b: "Opponents argue that rapid immigration can strain public services and depress wages for native workers.",
      c: "Integration programs including language training and credential recognition are crucial for immigrant success.",
      d: "Countries like Canada and Australia have implemented points-based systems to attract skilled immigrants.",
      e: "A comprehensive immigration policy must balance economic needs with social cohesion and humanitarian obligations."
    }
  },

  // ========== EXAM 10 ==========
  "thpt-10-13": {
    instruction: "Arrange the sentences to form a formal letter about academic exchange.",
    sentences: {
      a: "The opportunity to study at your institution would significantly enhance my understanding of comparative education systems.",
      b: "Dear Professor Yamamoto, I am writing to express my interest in the semester exchange program at Kyoto University.",
      c: "My Japanese language proficiency (JLPT N2) and previous research on East Asian education policy make me well-suited for this program.",
      d: "I have enclosed my academic transcript, research proposal, and two letters of recommendation for your review.",
      e: "I am confident that this exchange would foster valuable academic collaboration between our universities."
    }
  },
  "thpt-10-14": {
    instruction: "Arrange the sentences about electric vehicles.",
    sentences: {
      a: "Battery technology improvements have extended EV range from 100 to over 400 miles in just a decade.",
      b: "The global electric vehicle market grew by 55% in 2022, signaling a fundamental shift in transportation.",
      c: "Charging infrastructure remains the primary barrier to mass EV adoption in many developing countries.",
      d: "Government incentives including tax credits and purchase subsidies have been crucial in driving consumer adoption.",
      e: "The environmental benefits of EVs depend heavily on how the electricity powering them is generated."
    }
  },
  "thpt-10-15": {
    instruction: "Arrange the dialogue about artificial intelligence in education.",
    sentences: {
      a: "Teacher Nguyen: AI tutoring systems can provide personalized learning paths for each student.",
      b: "Principal Hoang: That sounds promising, but how do we ensure students still develop critical thinking skills?",
      c: "Teacher Nguyen: The key is using AI as a supplement, not a replacement, for human instruction and mentorship."
    }
  },
  "thpt-10-16": {
    instruction: "Arrange the sentences about urbanization in developing countries.",
    sentences: {
      a: "Rapid urbanization in developing nations creates both economic opportunities and significant social challenges.",
      b: "Informal settlements and slums house over one billion people globally, often lacking basic sanitation.",
      c: "Investment in affordable housing, public transport, and green spaces can make cities more inclusive.",
      d: "Megacities like Lagos, Mumbai, and Jakarta are projected to grow by millions in the coming decade.",
      e: "Participatory urban planning that includes marginalized communities leads to more equitable development outcomes."
    }
  },
  "thpt-10-17": {
    instruction: "Arrange the debate about online privacy vs. security.",
    sentences: {
      a: "Government surveillance programs argue that monitoring communications is essential for preventing terrorism.",
      b: "Privacy advocates counter that mass surveillance violates fundamental human rights and chills free expression.",
      c: "Encryption technology enables both legitimate privacy protection and criminal communication concealment.",
      d: "The Edward Snowden revelations exposed the extent of government surveillance programs worldwide.",
      e: "Finding the right balance between security needs and privacy rights remains one of democracy's greatest challenges."
    }
  },

  // ========== EXAM 11 ==========
  "thpt-11-13": {
    instruction: "Arrange the dialogue about Neuralink and brain-computer interfaces.",
    sentences: {
      a: "Dr. Patel: Neuralink's latest demonstration showed a paralyzed patient controlling a computer cursor with thought alone.",
      b: "Dr. Patel: Fair point, but the therapeutic benefits for paralyzed individuals could be transformative.",
      c: "Prof. Kim: While impressive, the long-term risks of implanting electrodes in healthy brain tissue remain largely unknown."
    }
  },
  "thpt-11-14": {
    instruction: "Arrange the dialogue about mind uploading.",
    sentences: {
      a: "Philosopher Nguyen: Until we resolve the hard problem of consciousness, mind uploading remains philosophical speculation.",
      b: "Ethicist Chang: Moreover, even if technically possible, the copy would not truly be 'you' but rather a digital duplicate.",
      c: "Neuroscientist Park: Recent advances in whole-brain emulation have made scientists revisit the feasibility of digital consciousness.",
      d: "Philosopher Nguyen: Do you believe consciousness can be reduced to computational patterns that a machine could replicate?",
      e: "Neuroscientist Park: Our understanding of neural correlates has improved, but consciousness remains fundamentally mysterious."
    }
  },
  "thpt-11-15": {
    instruction: "Arrange the formal letter about the Pact for the Future.",
    sentences: {
      a: "We propose establishing a youth advisory council to ensure young voices are represented in implementation.",
      b: "We urge all member states to ratify and implement the Pact's provisions without further delay.",
      c: "The Pact offers a comprehensive framework for addressing interconnected global challenges.",
      d: "Dear Secretary-General, we write to express our strong support for the recently adopted Pact for the Future.",
      e: "However, the most urgent priorities – climate action and digital governance – demand immediate attention."
    }
  },
  "thpt-11-16": {
    instruction: "Arrange the sentences about the Pact for the Future and commitments.",
    sentences: {
      a: "Signatories pledged to strengthen multilateral institutions and reform the UN Security Council.",
      b: "Civil society organizations have expressed cautious optimism but demand concrete accountability mechanisms.",
      c: "The Pact for the Future represents the most ambitious intergovernmental agreement since the Sustainable Development Goals.",
      d: "Implementation timelines and funding mechanisms remain the primary concerns of developing nations.",
      e: "The agreement addresses five critical domains: peace, digital cooperation, youth, sustainability, and governance reform."
    }
  },
  "thpt-11-17": {
    instruction: "Arrange the passage about precision agriculture.",
    sentences: {
      a: "Sustainability benefits are equally compelling: precision techniques reduce water usage by up to 30% and minimize chemical runoff.",
      b: "Food security concerns drive adoption: yield optimization through data-driven planting maximizes output per hectare.",
      c: "Precision agriculture integrates GPS technology, drone monitoring, and AI analytics to revolutionize farming practices.",
      d: "The future of farming lies in these interconnected technologies working in concert to feed a growing global population.",
      e: "As costs decrease and connectivity improves, even smallholder farmers in developing nations are beginning to adopt precision methods."
    }
  },

  // ========== EXAM 12 ==========
  "thpt-12-13": {
    instruction: "Arrange the dialogue about the digital divide.",
    sentences: {
      a: "Prof. Tran: That's why targeted subsidies and community digital literacy programs are essential for equitable access.",
      b: "Analyst Kim: Studies show that communities without broadband access fall further behind in education and economic opportunity.",
      c: "Prof. Tran: While global internet penetration has reached 60%, the remaining 40% are disproportionately in rural areas."
    }
  },
  "thpt-12-14": {
    instruction: "Arrange the dialogue about technological exclusion.",
    sentences: {
      a: "Dr. Okafor: Exactly. Digital payment systems often exclude those without smartphones or bank accounts.",
      b: "Researcher Lee: The push toward cashless societies risks marginalizing elderly and low-income populations.",
      c: "Researcher Lee: Recent evidence from Sweden shows that rapid digitalization left 6% of the population unable to perform basic transactions.",
      d: "Dr. Okafor: Hybrid systems that maintain both digital and traditional options seem most equitable.",
      e: "Researcher Lee: India's approach of linking digital payments to biometric identity has achieved broader inclusion, though privacy concerns persist."
    }
  },
  "thpt-12-15": {
    instruction: "Arrange the dialogue about environmental justice.",
    sentences: {
      a: "Activist Nguyen: Communities near industrial zones suffer disproportionately from pollution-related health issues.",
      b: "Activist Nguyen: It starts with giving affected communities a real voice in environmental impact assessments.",
      c: "Lawyer Park: The legal framework for environmental justice remains weak in most developing countries. What needs to change?"
    }
  },
  "thpt-12-16": {
    instruction: "Arrange the formal letter about environmental vulnerability.",
    sentences: {
      a: "We request urgent attention to the flooding and landslide risks affecting our coastal communities.",
      b: "Furthermore, early warning systems must be upgraded to provide adequate evacuation time.",
      c: "Dear Minister of Environment, we are writing to highlight the increasing environmental vulnerability of our province.",
      d: "Climate change projections indicate that sea levels in our region could rise by 30cm by 2050.",
      e: "Investment in resilient infrastructure and natural barrier restoration is no longer optional but imperative."
    }
  },
  "thpt-12-17": {
    instruction: "Arrange the passage about postcolonial literature.",
    sentences: {
      a: "Writers like Chinua Achebe and Ngũgĩ wa Thiong'o challenged colonial narratives by centering indigenous perspectives.",
      b: "Their works exposed the psychological and cultural damage inflicted by colonialism on both individuals and communities.",
      c: "Contemporary postcolonial criticism increasingly incorporates intersectional perspectives on gender, class, and ethnicity.",
      d: "Postcolonial literature emerged as a powerful counter-narrative to Eurocentric literary traditions.",
      e: "The ongoing debate about language choice – writing in colonial versus indigenous languages – reflects deeper questions of cultural identity."
    }
  },

  // ========== EXAM 13 ==========
  "thpt-13-13": {
    instruction: "Arrange the passage about disinformation and elections.",
    sentences: {
      a: "Fact-checking organizations have emerged as crucial defenders of electoral integrity.",
      b: "Platform algorithms amplify sensational content, making disinformation spread faster than corrections.",
      c: "The weaponization of social media during elections poses unprecedented threats to democratic processes.",
      d: "Foreign state actors have been documented interfering in elections through coordinated disinformation campaigns.",
      e: "Media literacy education starting from primary school may be the most effective long-term defense."
    }
  },
  "thpt-13-14": {
    instruction: "Arrange the dialogue about content moderation.",
    sentences: {
      a: "Moderator Chen: Our team reviews over 10 million flagged posts daily, but context-dependent decisions remain extremely challenging.",
      b: "Expert Kim: That's why a combination of AI pre-screening and human judgment is the most effective approach.",
      c: "Moderator Chen: The challenge is that cultural norms vary dramatically – what's acceptable in one country may be offensive in another."
    }
  },
  "thpt-13-15": {
    instruction: "Arrange the dialogue about EU defence policy.",
    sentences: {
      a: "Analyst Weber: Russia's invasion of Ukraine has fundamentally transformed European security calculations.",
      b: "Diplomat Dupont: Indeed. EU member states have increased defense spending by an average of 25% since 2022.",
      c: "Analyst Weber: The key question is whether Europe can develop autonomous defense capabilities while maintaining the NATO alliance.",
      d: "Diplomat Dupont: Strategic autonomy doesn't mean replacing NATO; it means Europe being able to act independently when needed.",
      e: "Analyst Weber: Joint procurement programs for ammunition and equipment represent an important first step toward that goal."
    }
  },
  "thpt-13-16": {
    instruction: "Arrange the passage about EU defence policy.",
    sentences: {
      a: "The European Defence Fund allocates €8 billion for collaborative research and capability development.",
      b: "Establishing a common European defense identity requires overcoming deep-seated national sovereignty concerns.",
      c: "Joint military exercises and integrated command structures are gradually building operational interoperability.",
      d: "Franco-German defense cooperation has historically served as the engine for broader European security integration.",
      e: "The ultimate goal is a European defense framework that complements rather than duplicates NATO's collective defense mandate."
    }
  },
  "thpt-13-17": {
    instruction: "Arrange the passage about the MENA water crisis.",
    sentences: {
      a: "Desalination plants in the Gulf states consume enormous energy, creating a paradoxical carbon footprint.",
      b: "The Middle East and North Africa region is the most water-stressed area on Earth.",
      c: "Traditional irrigation techniques like qanat systems offer sustainable alternatives adapted to local conditions.",
      d: "Population growth and agricultural expansion continue to deplete already scarce groundwater reserves.",
      e: "International cooperation on shared river basins, particularly the Nile and Tigris-Euphrates, remains politically fraught."
    }
  },

  // ========== EXAM 14 ==========
  "thpt-14-13": {
    instruction: "Arrange the passage about sustainability.",
    sentences: {
      a: "Corporate sustainability reporting has become mandatory in many jurisdictions, improving transparency.",
      b: "The circular economy model seeks to eliminate waste by designing products for reuse and recycling.",
      c: "Consumer awareness of environmental issues has increased dramatically, driving demand for sustainable products.",
      d: "The concept of sustainability has evolved from a niche concern to a central pillar of business strategy.",
      e: "However, greenwashing – misleading environmental claims – remains a significant challenge for informed consumers."
    }
  },
  "thpt-14-14": {
    instruction: "Arrange the dialogue between CEO and CSO about net-zero targets.",
    sentences: {
      a: "CEO: We've committed to achieving net-zero emissions by 2040. What's our realistic pathway?",
      b: "CEO: Let's prioritize the quick wins first while developing our long-term carbon capture strategy.",
      c: "CSO: Our analysis shows that electrifying our fleet and switching to renewable energy could cut emissions by 60% within five years."
    }
  },
  "thpt-14-15": {
    instruction: "Arrange the dialogue about standardized testing.",
    sentences: {
      a: "Teacher Nguyen: Our students spend three months preparing for standardized tests instead of developing real-world skills.",
      b: "Principal Hoang: I understand the frustration, but these tests provide accountability data that parents and policymakers demand.",
      c: "Teacher Nguyen: What if we developed assessment methods that measured both accountability and authentic learning?",
      d: "Principal Hoang: There are pilot programs in Finland and Singapore doing exactly that. We should study their approaches.",
      e: "Teacher Nguyen: Agreed. Let's propose a pilot program to our district that integrates portfolio assessment with standardized metrics."
    }
  },
  "thpt-14-16": {
    instruction: "Arrange the formal letter about standardized tests.",
    sentences: {
      a: "We propose a pilot program incorporating project-based assessments alongside traditional examinations.",
      b: "Dear Minister of Education, we are writing to recommend reforms to the current standardized testing framework.",
      c: "Research from multiple countries demonstrates that alternative assessments better predict real-world success.",
      d: "The current system's emphasis on memorization fails to develop the critical thinking skills our economy demands.",
      e: "We urge the ministry to convene a task force of educators, researchers, and employers to design a modern assessment system."
    }
  },
  "thpt-14-17": {
    instruction: "Arrange the passage about cinema and memory.",
    sentences: {
      a: "Cinema has long served as a powerful medium for preserving and constructing collective memory.",
      b: "Documentary filmmakers bear particular responsibility for balancing artistic expression with historical accuracy.",
      c: "Historical films often shape public understanding of events more profoundly than academic scholarship.",
      d: "Digital restoration technologies are enabling the preservation of deteriorating film archives for future generations.",
      e: "However, the selective nature of cinematic representation inevitably privileges certain narratives while silencing others."
    }
  },

  // ========== EXAM 15 ==========
  "thpt-15-13": {
    instruction: "Arrange the passage about quantum encryption.",
    sentences: {
      a: "China's Micius satellite demonstrated quantum key distribution over distances exceeding 1,200 kilometers.",
      b: "Quantum encryption leverages the fundamental principles of quantum mechanics to create theoretically unbreakable codes.",
      c: "Traditional encryption methods face obsolescence as quantum computers become powerful enough to crack current algorithms.",
      d: "The transition to quantum-safe cryptography will require massive infrastructure investment across all sectors.",
      e: "Financial institutions and government agencies are already beginning to implement post-quantum security protocols."
    }
  },
  "thpt-15-14": {
    instruction: "Arrange the dialogue about neurodiversity in the workplace.",
    sentences: {
      a: "HR Director: Our neurodiversity hiring program has shown that autistic employees excel in quality assurance roles.",
      b: "Manager Kim: That's impressive. What accommodations have been most effective?",
      c: "HR Director: Simple changes like reducing sensory overload in open offices and providing clear written instructions make the biggest difference."
    }
  },
  "thpt-15-15": {
    instruction: "Arrange the dialogue about ocean acidification.",
    sentences: {
      a: "Marine Biologist Silva: Ocean pH has decreased by 0.1 units since pre-industrial times – a 26% increase in acidity.",
      b: "Climate Scientist Tanaka: That's devastating for coral reefs and shellfish, which struggle to form calcium carbonate structures.",
      c: "Marine Biologist Silva: Without immediate emissions reductions, we could see a 150% increase in acidity by 2100.",
      d: "Climate Scientist Tanaka: The cascading effects through marine food webs could collapse fisheries that feed billions.",
      e: "Marine Biologist Silva: Exactly. Ocean acidification is often called climate change's equally evil twin."
    }
  },
  "thpt-15-16": {
    instruction: "Arrange the passage about circular economy in fashion.",
    sentences: {
      a: "Patagonia's repair and resale programs have demonstrated that circular models can be commercially viable.",
      b: "Extended producer responsibility legislation is forcing fashion brands to take accountability for end-of-life garments.",
      c: "The fashion industry produces over 92 million tons of textile waste annually, most ending in landfills.",
      d: "Consumers are increasingly embracing second-hand clothing, with the resale market projected to reach $77 billion by 2025.",
      e: "Technological innovations in textile recycling can now convert blended fabrics back into raw fibers for reuse."
    }
  },
  "thpt-15-17": {
    instruction: "Arrange the debate about space tourism ethics.",
    sentences: {
      a: "Proponents argue that space tourism drives innovation and funds research that benefits all of humanity.",
      b: "Critics contend that billionaires launching themselves into space while millions lack clean water is morally indefensible.",
      c: "The carbon footprint of a single space tourism flight equals a typical person's lifetime emissions.",
      d: "Space tourism's democratization would require dramatic cost reductions from current prices exceeding $250,000 per seat.",
      e: "Regulation of commercial spaceflight remains minimal, with environmental impact assessments notably absent."
    }
  },

  // ========== EXAM 16 ==========
  "thpt-16-13": {
    instruction: "Arrange the passage about deep-sea mining.",
    sentences: {
      a: "Polymetallic nodules on the ocean floor contain metals essential for renewable energy technology.",
      b: "Environmental scientists warn that deep-sea mining could destroy ecosystems that take millennia to recover.",
      c: "The International Seabed Authority is developing regulations, but many scientists call for a moratorium.",
      d: "Deep-sea mining represents a new frontier in resource extraction, driven by growing demand for rare earth minerals.",
      e: "Alternative approaches like urban mining – recovering metals from electronic waste – could reduce pressure on ocean resources."
    }
  },
  "thpt-16-14": {
    instruction: "Arrange the dialogue about lab-grown meat.",
    sentences: {
      a: "Food Scientist Chen: Lab-grown meat could reduce agricultural land use by 95% and greenhouse gas emissions by 80%.",
      b: "Consumer Researcher Park: That's impressive from a sustainability perspective, but consumer acceptance remains the biggest hurdle.",
      c: "Food Scientist Chen: Taste tests show that participants increasingly cannot distinguish cultured meat from conventional products."
    }
  },
  "thpt-16-15": {
    instruction: "Arrange the dialogue about digital nomadism.",
    sentences: {
      a: "Tax Specialist Reeves: The rise of digital nomads has created complex jurisdictional issues for tax authorities worldwide.",
      b: "Policy Analyst Wong: Countries like Portugal and Croatia now offer digital nomad visas to attract remote workers.",
      c: "Tax Specialist Reeves: The challenge is when nomads earn income in one country while residing in another and paying taxes in neither.",
      d: "Policy Analyst Wong: International tax treaties designed for traditional employment simply don't address this new reality.",
      e: "Tax Specialist Reeves: A global framework for taxing location-independent work is urgently needed but politically unlikely."
    }
  },
  "thpt-16-16": {
    instruction: "Arrange the passage about regenerative agriculture.",
    sentences: {
      a: "Cover cropping and no-till farming practices can increase soil carbon sequestration significantly.",
      b: "Large food corporations are increasingly investing in regenerative supply chains to meet sustainability commitments.",
      c: "Regenerative agriculture goes beyond sustainability to actively restore degraded ecosystems and soil health.",
      d: "Financial incentives for farmers transitioning to regenerative practices remain insufficient in most countries.",
      e: "The potential for regenerative agriculture to simultaneously address food security and climate change is gaining recognition."
    }
  },
  "thpt-16-17": {
    instruction: "Arrange the debate about facial recognition technology.",
    sentences: {
      a: "Law enforcement agencies argue that facial recognition has helped solve numerous serious crimes.",
      b: "Studies consistently show that facial recognition systems exhibit higher error rates for people of color.",
      c: "Several cities, including San Francisco and Brussels, have banned government use of facial recognition.",
      d: "The technology has advanced rapidly, with accuracy rates now exceeding 99% under controlled conditions.",
      e: "Democratic societies must establish clear legal frameworks governing when and how facial recognition can be deployed."
    }
  },

  // ========== EXAM 17 ==========
  "thpt-17-13": {
    instruction: "Arrange the passage about CRISPR gene editing.",
    sentences: {
      a: "The technology has already been used to develop disease-resistant crops and treat sickle cell disease.",
      b: "CRISPR-Cas9 has revolutionized genetic engineering by making precise DNA editing faster, cheaper, and more accessible.",
      c: "However, off-target effects – unintended edits to other parts of the genome – remain a significant safety concern.",
      d: "The 2018 case of gene-edited babies in China sparked global outrage and calls for stricter international regulation.",
      e: "Establishing an international governance framework for human germline editing is now a matter of scientific consensus."
    }
  },
  "thpt-17-14": {
    instruction: "Arrange the dialogue about indigenous knowledge systems.",
    sentences: {
      a: "Anthropologist Nguyen: Indigenous communities possess ecological knowledge accumulated over thousands of years.",
      b: "Biologist Torres: Absolutely. Aboriginal Australian fire management practices are now being adopted to prevent devastating wildfires.",
      c: "Anthropologist Nguyen: The challenge is ensuring indigenous communities maintain intellectual property rights over their traditional knowledge."
    }
  },
  "thpt-17-15": {
    instruction: "Arrange the dialogue about algorithmic bias.",
    sentences: {
      a: "Data Scientist Lee: Our audit revealed that the hiring algorithm systematically disadvantaged female applicants.",
      b: "Ethics Officer Park: How did that bias enter the system?",
      c: "Data Scientist Lee: The model was trained on historical hiring data that reflected decades of gender discrimination.",
      d: "Ethics Officer Park: This perfectly illustrates why algorithmic impact assessments should be mandatory before deployment.",
      e: "Data Scientist Lee: We've now implemented fairness constraints and regular bias audits as standard practice."
    }
  },
  "thpt-17-16": {
    instruction: "Arrange the passage about vaccine hesitancy.",
    sentences: {
      a: "Social media platforms have amplified anti-vaccine messaging, reaching millions of parents with misleading claims.",
      b: "Community health workers who build personal relationships with families have proven most effective at addressing hesitancy.",
      c: "Vaccine hesitancy has been identified by the WHO as one of the top ten threats to global health.",
      d: "Punitive approaches like mandatory vaccination laws often backfire by reinforcing distrust of health authorities.",
      e: "Transparent communication about vaccine benefits and risks, rather than dismissive responses, builds lasting public trust."
    }
  },
  "thpt-17-17": {
    instruction: "Arrange the debate about universal healthcare.",
    sentences: {
      a: "Countries with universal healthcare systems consistently achieve better population health outcomes at lower per-capita costs.",
      b: "Opponents argue that government-run healthcare leads to long wait times and reduced quality of care.",
      c: "The United States spends more per capita on healthcare than any other nation while leaving millions uninsured.",
      d: "Hybrid models combining public universal coverage with private supplementary insurance may offer the best outcomes.",
      e: "Healthcare access is increasingly recognized as a fundamental human right rather than a market commodity."
    }
  },

  // ========== EXAM 18 ==========
  "thpt-18-13": {
    instruction: "Arrange the passage about dark tourism.",
    sentences: {
      a: "Sites like Auschwitz and Hiroshima attract millions of visitors seeking to understand historical atrocities.",
      b: "Dark tourism – visiting sites associated with death and tragedy – raises complex ethical questions.",
      c: "Critics argue that commercializing tragedy risks trivializing the suffering of victims and survivors.",
      d: "Proponents contend that such tourism serves essential educational purposes and preserves collective memory.",
      e: "Responsible dark tourism requires sensitive interpretation, community involvement, and respect for victims' dignity."
    }
  },
  "thpt-18-14": {
    instruction: "Arrange the dialogue about sleep science.",
    sentences: {
      a: "Neurologist Kim: Recent research reveals that sleep deprivation impairs judgment as severely as alcohol intoxication.",
      b: "Public Health Expert Tran: Corporate culture glorifying overwork is literally killing people through chronic sleep deprivation.",
      c: "Neurologist Kim: Companies like Nike and Google have introduced nap rooms, recognizing that well-rested employees are more productive."
    }
  },
  "thpt-18-15": {
    instruction: "Arrange the dialogue about rewilding projects.",
    sentences: {
      a: "Ecologist Weber: The reintroduction of wolves to Yellowstone transformed the entire ecosystem through trophic cascades.",
      b: "Farmer O'Brien: But rewilding near agricultural areas creates real conflicts with livestock farmers.",
      c: "Ecologist Weber: Compensation schemes and non-lethal deterrents have successfully reduced human-wildlife conflict in several European projects.",
      d: "Farmer O'Brien: I can accept that if farmers are genuinely supported, not just promised compensation that never arrives.",
      e: "Ecologist Weber: The Knepp Estate in England shows how rewilding and profitable farming can coexist on the same land."
    }
  },
  "thpt-18-16": {
    instruction: "Arrange the passage about misinformation during health crises.",
    sentences: {
      a: "The WHO coined the term 'infodemic' to describe the overwhelming flood of information during the COVID-19 pandemic.",
      b: "Pre-bunking – teaching people to recognize manipulation techniques before exposure – shows promising results.",
      c: "Health misinformation during pandemics directly contributes to preventable deaths and undermines public health measures.",
      d: "Social media platforms have struggled to balance free expression with the urgent need to contain dangerous health claims.",
      e: "Building long-term public trust in health institutions requires transparency about uncertainties, not just authoritative messaging."
    }
  },
  "thpt-18-17": {
    instruction: "Arrange the debate about mandatory voting.",
    sentences: {
      a: "Australia's compulsory voting system achieves 91% turnout, compared to 55% in voluntary systems like the United States.",
      b: "Critics argue that forcing citizens to vote violates personal freedom and may increase uninformed voting.",
      c: "Proponents maintain that mandatory voting ensures government legitimacy and reduces the influence of extremist minorities.",
      d: "Research from compulsory voting countries shows that voters become more politically informed when voting is expected.",
      e: "A middle ground might include automatic voter registration and election day holidays while keeping voting voluntary."
    }
  },

  // ========== EXAM 19 ==========
  "thpt-19-13": {
    instruction: "Arrange the passage about the right to be forgotten.",
    sentences: {
      a: "The European Court of Justice established the 'right to be forgotten' in its landmark 2014 Google Spain ruling.",
      b: "Search engines have received millions of removal requests, raising questions about who decides what information should disappear.",
      c: "Digital permanence means that youthful mistakes can follow individuals throughout their entire professional lives.",
      d: "Journalists argue that the right to be forgotten conflicts with press freedom and the public's right to information.",
      e: "A balanced approach must weigh individual privacy against the democratic value of accessible public records."
    }
  },
  "thpt-19-14": {
    instruction: "Arrange the dialogue about loneliness as a public health crisis.",
    sentences: {
      a: "Psychologist Yamada: Chronic loneliness increases mortality risk by 26%, comparable to smoking 15 cigarettes daily.",
      b: "Urban Planner Costa: Designing neighborhoods with shared green spaces and community centers can foster social connection.",
      c: "Psychologist Yamada: Japan's 'minister of loneliness' and the UK's similar appointment signal that governments are taking this seriously."
    }
  },
  "thpt-19-15": {
    instruction: "Arrange the dialogue about microfinance effectiveness.",
    sentences: {
      a: "Economist Okafor: Muhammad Yunus won the Nobel Prize for pioneering microcredit, but evidence of its impact is mixed.",
      b: "Development Worker Singh: In our programs, combining microloans with financial literacy training dramatically improved repayment rates.",
      c: "Economist Okafor: That aligns with the latest research showing that holistic approaches outperform credit-only interventions.",
      d: "Development Worker Singh: The key is designing programs around borrowers' actual needs rather than imposing standardized products.",
      e: "Economist Okafor: Digital mobile banking has also expanded access, reducing the cost of delivering financial services to remote areas."
    }
  },
  "thpt-19-16": {
    instruction: "Arrange the passage about language extinction.",
    sentences: {
      a: "Digital tools including speech recognition and machine translation are being deployed to document endangered languages.",
      b: "Every two weeks, a language dies, taking with it unique knowledge systems and cultural perspectives.",
      c: "Indigenous language immersion schools have proven remarkably effective in revitalizing threatened languages.",
      d: "Linguists estimate that 50% of the world's approximately 7,000 languages will disappear by the end of this century.",
      e: "Government policies supporting bilingual education and official recognition of indigenous languages are essential for preservation."
    }
  },
  "thpt-19-17": {
    instruction: "Arrange the debate about four-day work week.",
    sentences: {
      a: "Trials in Iceland, the UK, and Japan showed that productivity remained stable or improved with a four-day schedule.",
      b: "Employers initially resisted the idea, fearing reduced output and competitive disadvantage.",
      c: "Workers reported significant improvements in mental health, work-life balance, and job satisfaction.",
      d: "The four-day work week concept has gained momentum following successful pilot programs in multiple countries.",
      e: "Implementation challenges include adapting the model for essential services, manufacturing, and customer-facing roles."
    }
  },

  // ========== EXAM 20 ==========
  "thpt-20-13": {
    instruction: "Arrange the passage about soil degradation.",
    sentences: {
      a: "Without intervention, the FAO estimates that 90% of Earth's topsoil could be degraded by 2050.",
      b: "Intensive agriculture, deforestation, and urbanization are the primary drivers of global soil degradation.",
      c: "Healthy soils store more carbon than the atmosphere and all vegetation combined, making soil restoration a climate priority.",
      d: "Soil degradation affects 33% of the world's land surface, threatening food security for billions.",
      e: "Regenerative practices like composting, cover cropping, and reduced tillage can reverse soil degradation within a decade."
    }
  },
  "thpt-20-14": {
    instruction: "Arrange the dialogue about ethical AI development.",
    sentences: {
      a: "AI Researcher Kim: Our team has developed an AI system that can diagnose rare diseases with 95% accuracy.",
      b: "Ethics Board Chair Santos: That's remarkable, but who is legally responsible when the AI makes an incorrect diagnosis?",
      c: "AI Researcher Kim: Currently, liability falls into a gray area between the developer, the deploying hospital, and the treating physician."
    }
  },
  "thpt-20-15": {
    instruction: "Arrange the dialogue about cultural heritage preservation.",
    sentences: {
      a: "Archaeologist Weber: 3D scanning and digital twins allow us to preserve detailed records of deteriorating historical sites.",
      b: "Museum Director Tanaka: But digital preservation cannot replace the experience of visiting an actual ancient monument.",
      c: "Archaeologist Weber: You're right. The goal is complementary preservation – maintaining physical sites while creating accessible digital archives.",
      d: "Museum Director Tanaka: Virtual reality experiences could make world heritage sites accessible to people who cannot travel.",
      e: "Archaeologist Weber: UNESCO's Digital Heritage initiative is piloting exactly this approach at 50 World Heritage Sites."
    }
  },
  "thpt-20-16": {
    instruction: "Arrange the passage about youth mental health crisis.",
    sentences: {
      a: "Screen time exceeding four hours daily correlates strongly with increased anxiety and depression in adolescents.",
      b: "Schools are increasingly integrating social-emotional learning into curricula to build psychological resilience.",
      c: "Global rates of adolescent anxiety and depression have increased by 70% over the past 25 years.",
      d: "Social media's impact on youth mental health is complex – it can both provide community and amplify social comparison.",
      e: "Early intervention programs that train teachers and parents to recognize warning signs have shown significant effectiveness."
    }
  },
  "thpt-20-17": {
    instruction: "Arrange the debate about nuclear fusion energy.",
    sentences: {
      a: "Recent breakthroughs at the National Ignition Facility achieved net energy gain from fusion for the first time.",
      b: "Commercial fusion power could provide virtually unlimited clean energy with minimal radioactive waste.",
      c: "Critics note that fusion has been 'thirty years away' for the past six decades, questioning its practical timeline.",
      d: "Private investment in fusion startups exceeded $6 billion in 2023, signaling growing commercial confidence.",
      e: "Even optimistic projections suggest that commercial fusion power plants won't be operational before 2040."
    }
  }
};
