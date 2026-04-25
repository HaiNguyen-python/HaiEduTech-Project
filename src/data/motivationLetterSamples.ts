/**
 * @file motivationLetterSamples.ts
 * @description Three exemplary Motivation Letters across different fields, used as references in MotivationLetterGuide.
 */
export interface SampleLetter {
  id: string;
  title: string;
  titleVi: string;
  field: string;
  fieldVi: string;
  targetSchool: string;
  targetProgram: string;
  level: string;
  bandColor: string; // tailwind gradient suffix
  content: string;
}

export const SAMPLE_LETTERS: SampleLetter[] = [
  {
    id: "data-science-aalto",
    title: "MSc Data Science - Aalto University",
    titleVi: "Thạc sĩ Khoa học Dữ liệu - Aalto University",
    field: "Data Science / AI",
    fieldVi: "Khoa học Dữ liệu / AI",
    targetSchool: "Aalto University, Finland",
    targetProgram: "MSc in Computer, Communication and Information Sciences - Data Science",
    level: "Master's",
    bandColor: "from-sky-500 to-indigo-600",
    content: `**1. Introduction & Hook**
The first time I trained a logistic regression model to predict student dropout rates at my undergraduate university, I was shocked: the model surfaced a single feature - average login frequency in week three - that explained more variance than any demographic variable. That moment crystallised what I want to do for the rest of my career: turn messy educational data into decisions that actually change lives. I am applying to the MSc in Data Science at Aalto University because no other program combines rigorous statistical training, a lively startup ecosystem, and direct collaboration with the Finnish Centre for Educational Equity the way Aalto does.

**2. Academic Background**
I will graduate this summer from Hanoi University of Science and Technology with a BSc in Computer Science (GPA 3.74/4.0, Top 4% of cohort). My coursework concentrated on probability theory, linear algebra, and machine learning, complemented by a self-directed minor in microeconomics so that I could read empirical education research. My undergraduate thesis - "Sequence-Aware Recommender Systems for Adaptive Vietnamese Reading Practice" - applied transformer architectures to 1.2 million reading-log events from a local EdTech platform and improved next-text relevance NDCG@5 by 17% over the baseline. The thesis was awarded the Faculty's Best Undergraduate Research prize and accepted as a poster at the Vietnam Symposium on Information and Communications Technology 2024.

**3. Why This Program & University**
Three concrete elements pulled me toward Aalto. First, the course "CS-E4640 Big Data Platforms" taught by Professor Linh Truong is one of the few graduate-level courses globally that treats data engineering as a first-class citizen rather than an afterthought to modelling - exactly the gap I felt during my thesis. Second, Professor Aristides Gionis' research on graph mining at the Data Mining Group aligns directly with the cold-start problem I want to attack in educational recommender systems. Third, Aalto's compulsory "Project Course in Data Science" with industry partners such as Nokia and OP Financial Group would give me the production-scale experience that Vietnamese universities cannot yet offer. Beyond the classroom, the Slush ecosystem and Aalto Ventures Program would let me road-test my long-term ambition of building a data-driven EdTech company.

**4. Career Goals**
In the short term (0–3 years after graduation) I aim to join a Helsinki-based EdTech company such as Claned or Eduten as a Machine Learning Engineer, focusing on adaptive learning pipelines. In the medium term (3–7 years) I plan to return to Vietnam to lead the data science function of an EdTech startup that helps under-resourced provincial schools personalise instruction - closing the very dropout gap that motivated my undergraduate thesis. The Aalto MSc, with its blend of statistical depth, software engineering rigour and entrepreneurial scaffolding, is the most direct bridge I can imagine between today's foundation and tomorrow's contribution.

**5. Conclusion**
Studying at Aalto is not a generic step toward a Master's diploma; it is the specific environment in which I can convert disciplined curiosity into measurable educational impact. I would be honoured to contribute my work ethic, my undergraduate research record and my deep commitment to educational equity to the Aalto community. Thank you for considering my application - I look forward to the opportunity to grow alongside your faculty and peers.`,
  },
  {
    id: "public-health-helsinki",
    title: "MPH - University of Helsinki",
    titleVi: "Thạc sĩ Y tế Công cộng - University of Helsinki",
    field: "Public Health",
    fieldVi: "Y tế Công cộng",
    targetSchool: "University of Helsinki, Finland",
    targetProgram: "Master's Programme in Public Health",
    level: "Master's",
    bandColor: "from-emerald-500 to-teal-600",
    content: `**1. Introduction & Hook**
On a humid afternoon in 2022, I sat across from a young mother in a rural commune of Thanh Hoa province who had walked nine kilometres to ask whether the second dose of measles vaccine was "still safe" for her two-year-old. Her question, born from a poorly translated Facebook post, made me realise that the most decisive variable in a public health system is not always biology - it is communication, equity, and trust. Since then I have devoted my work and study to closing those non-clinical gaps, and the Master's Programme in Public Health at the University of Helsinki is the next deliberate step on that path.

**2. Academic Background**
I hold a BSc in Preventive Medicine from Hanoi Medical University (GPA 3.62/4.0, graduating in the top 8% of my class). My academic interests crystallised during the third-year course on Social Epidemiology, where I learned to read mortality data through the lens of structural inequality. My undergraduate thesis - a cross-sectional study of vaccine hesitancy among 412 mothers in three Northern provinces - found that perceived government transparency, not income, was the strongest predictor of complete childhood vaccination (adjusted OR 2.41, 95% CI 1.62–3.59). The thesis was awarded the Faculty's First-Class Honour and is currently being revised for submission to BMC Public Health.

**3. Why This Program & University**
The Helsinki MPH attracted me for three precise reasons. First, the Global Health track's core course "Health Systems and Policy in Low- and Middle-Income Countries" speaks directly to the policy translation skills I need to bring evidence into Vietnamese district health offices. Second, Professor Ossi Rahkonen's research on socioeconomic determinants of health offers a methodological tradition that I have admired since my thesis literature review. Third, the partnership between the Faculty of Medicine and the Finnish Institute for Health and Welfare (THL) provides a rare opportunity to learn how a high-trust Nordic system designs population-level interventions - a contrast that will sharpen my analytical lens when I return home. The Helsinki Summer School's reputation for interdisciplinary cohorts also matches my conviction that public health cannot be solved by epidemiologists alone.

**4. Career Goals**
In the short term I plan to join the WHO Vietnam Country Office or a similar institution as a Public Health Analyst, focusing on health communication and immunisation equity. In the long term (5–10 years) I aim to lead a research-to-policy unit at the Vietnamese Ministry of Health that designs evidence-based behavioural interventions for under-served provinces - replacing today's blanket campaigns with locally tailored, equity-aware strategies. The Helsinki MPH, with its triple emphasis on quantitative methods, policy analysis, and global health ethics, is the most coherent training I can imagine for that mission.

**5. Conclusion**
I am applying not to escape but to return - better trained, more humble, and more useful to the communities I have already served. I would be deeply grateful for the opportunity to learn from the Helsinki faculty and to contribute the perspective of a Vietnamese clinician-researcher to the cohort. Thank you for considering my application.`,
  },
  {
    id: "education-policy-leiden",
    title: "MA Education & Child Studies - Leiden University",
    titleVi: "Thạc sĩ Giáo dục & Nghiên cứu Trẻ em - Leiden University",
    field: "Education / Policy",
    fieldVi: "Giáo dục / Chính sách",
    targetSchool: "Leiden University, Netherlands",
    targetProgram: "MA Education and Child Studies - Learning Problems & Impairments",
    level: "Master's",
    bandColor: "from-amber-500 to-orange-600",
    content: `**1. Introduction & Hook**
For three years I taught English to Vietnamese teenagers preparing for the IELTS exam, and one student - a fifteen-year-old named Minh who could decode every word on the page but could not tell me what the paragraph meant - quietly rewrote my career plan. Diagnosed only after I asked the school to investigate, Minh had a specific reading comprehension impairment that no one in his fourteen years of schooling had identified. That single case taught me that a country can build world-class test-prep industries while still failing the children who need its educators most. I am applying to the MA in Education and Child Studies - Learning Problems and Impairments at Leiden University because I am determined to be part of closing that gap in Vietnam.

**2. Academic Background**
I graduated from the University of Languages and International Studies (Vietnam National University) with a BA in English Language Teaching, GPA 3.71/4.0, ranked second in a cohort of 187. Beyond my major I completed Coursera specialisations in Educational Psychology (University of Pennsylvania) and Foundations of Special Education (University of London). My senior thesis investigated the prevalence of undiagnosed dyslexia indicators among 248 secondary students in two Hanoi public schools and found that 9.3% of them met the screening threshold while none had ever been formally assessed. The findings were presented at the 2023 VietTESOL conference and will inform a forthcoming guideline of the Hanoi Department of Education.

**3. Why This Program & University**
Leiden is not a generic destination for me but a deliberate choice. First, the specialisation track "Learning Problems and Impairments" is one of the few in Europe that integrates neurocognitive assessment with classroom intervention design - a synthesis I will not find at home. Second, Professor Elise de Bree's research on developmental language disorders directly addresses the assessment gap I documented in my thesis. Third, the program's compulsory research internship at institutions such as the Royal Dutch Kentalis or the Leiden Pre-University College would give me practical fluency in evidence-based intervention design that lectures alone cannot provide. The Dutch tradition of inclusive education, with its strong empirical orientation, is exactly the model I want to study before adapting it to the Vietnamese context.

**4. Career Goals**
Within three years of graduation I plan to return to Vietnam and join the Research and Policy unit of an organisation such as VVOB or RISE Vietnam, designing and evaluating early screening protocols for learning disabilities in primary schools. Within ten years I intend to establish Vietnam's first independent training institute for educational diagnosticians, partnering with universities and the Ministry of Education to professionalise a role that today does not formally exist. The Leiden MA, combining diagnostic rigour, inclusive education theory and policy literacy, is the most direct preparation I can imagine for that long-term mission.

**5. Conclusion**
I have spent my early career standing in front of classrooms; I now want to spend the next phase building the assessment systems that will make those classrooms work for the children currently invisible within them. I would be honoured to learn from Leiden's faculty and to bring the perspective of a Southeast Asian practitioner to the cohort. Thank you for considering my application.`,
  },
];
