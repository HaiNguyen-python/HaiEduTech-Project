export type BusinessInterviewLevel = "Junior" | "Mid" | "Senior";

export interface BusinessInterviewQuestion {
  id: string;
  category: string;
  level: BusinessInterviewLevel;
  question: string;
  /** What the interviewer really wants to find out. */
  purpose: string;
  /** Answer structure, one step per line. */
  structure: string[];
  sampleAnswer: string;
  /** Exact phrases from the sample answer to highlight. */
  highlights: string[];
  usefulPhrases: string[];
  avoid: string[];
}

export const businessInterviewCategories = [
  "Introduction & Motivation",
  "Strengths & Experience",
  "Behavioural (STAR)",
  "Teamwork & Communication",
  "Closing & Salary",
  "Workplace Scenarios",
  "Leadership & Judgement",
] as const;

const C = businessInterviewCategories;

export const businessInterviewQuestions: BusinessInterviewQuestion[] = [
  {
    id: "bi-intro-1", category: C[0], level: "Junior",
    question: "Tell me about yourself.",
    purpose: "A concise professional summary linking your background to the job. Internships, studies and projects are valid evidence for early-career candidates.",
    structure: ["Present: your current role or studies", "Past: one or two relevant achievements", "Future: why this role is the logical next step"],
    sampleAnswer: "I recently completed a business degree and a marketing internship at a retail company. During the internship, I helped schedule social media posts and worked closely with the sales team to check product information. I also prepared a weekly summary of customer enquiries, which helped the team decide which questions to answer in future posts. I am now looking for an entry-level role where I can develop these skills and support customer communication, and that's why this position caught my attention.",
    highlights: ["a business degree and a marketing internship", "a weekly summary of customer enquiries", "worked closely with the sales team", "that's why this position caught my attention"],
    usefulPhrases: ["I'm currently working as...", "Over the last X years, I've...", "What I enjoy most is...", "That's what brings me here today."],
    avoid: ["Starting with your birthplace and family", "Repeating your CV line by line", "Speaking for more than two minutes"],
  },
  {
    id: "bi-intro-2", category: C[0], level: "Junior",
    question: "Why do you want to work for our company?",
    purpose: "Proof that you researched the company and that your goals match theirs.",
    structure: ["Something specific about the company (product, values, news)", "How it connects to your skills or values", "What you can contribute"],
    sampleAnswer: "I've followed your expansion into Southeast Asia, and I was impressed by your recent launch in Vietnam. Your focus on sustainable packaging matches my own values. With my experience in regional logistics, I believe I could help you scale your supply chain while keeping costs under control.",
    highlights: ["your expansion into Southeast Asia", "matches my own values", "I believe I could help you"],
    usefulPhrases: ["I was impressed by...", "Your commitment to... really stands out.", "I'd love to contribute to..."],
    avoid: ["'Because you pay well'", "Generic praise that fits any company", "Talking only about what you will gain"],
  },
  {
    id: "bi-intro-3", category: C[0], level: "Junior",
    question: "Why are you leaving your current job?",
    purpose: "Checks that you leave for positive reasons and will not speak badly about employers.",
    structure: ["Stay positive about the current employer", "Name a forward-looking reason (growth, scope)", "Connect it to this role"],
    sampleAnswer: "I've learned a lot in my current role, and I'm grateful for the opportunities. However, the company is small, and there's limited room to work on international projects. I'm ready for a bigger challenge, and this role would let me work with clients across Europe.",
    highlights: ["I'm grateful for the opportunities", "limited room to work on international projects", "I'm ready for a bigger challenge"],
    usefulPhrases: ["I'm looking for new challenges.", "I'd like to develop my skills in...", "I feel I've grown as much as I can there."],
    avoid: ["Complaining about your boss or colleagues", "Saying you are bored", "Mentioning only money"],
  },
  {
    id: "bi-intro-4", category: C[0], level: "Mid",
    question: "Where do you see yourself in five years?",
    purpose: "Tests ambition, realism and whether you plan to stay and grow with the company.",
    structure: ["Skills you want to master", "Responsibility you hope to take on", "Link to the company's path"],
    sampleAnswer: "In five years, I'd like to be an expert in B2B account management and lead a small team. I'm especially interested in developing my negotiation skills. I can see from your structure that there are clear paths to team leadership here, so I hope to grow with the company.",
    highlights: ["an expert in B2B account management", "lead a small team", "grow with the company"],
    usefulPhrases: ["I'd like to have developed...", "I hope to take on more responsibility for...", "I see myself growing into..."],
    avoid: ["'In your job!'", "'I don't know'", "Plans that clearly involve leaving soon"],
  },
  {
    id: "bi-str-1", category: C[1], level: "Junior",
    question: "What are your greatest strengths?",
    purpose: "One or two strengths relevant to the role, supported by a specific example rather than a list of adjectives.",
    structure: ["Name the strength", "Give a short real example", "Show the result for the team or business"],
    sampleAnswer: "One of my main strengths is organisation. During my internship, I maintained the task list for a small product launch, checked upcoming deadlines and reminded owners about missing information. This helped the team complete its checklist before launch. I'm also a quick learner: I practised routine CRM updates in the training environment and asked my supervisor to check my first entries before I worked independently.",
    highlights: ["One of my main strengths is organisation", "asked my supervisor to check my first entries", "I'm also a quick learner"],
    usefulPhrases: ["One of my key strengths is...", "For example, ...", "As a result, ..."],
    avoid: ["A long list of adjectives with no proof", "Strengths unrelated to the role"],
  },
  {
    id: "bi-str-2", category: C[1], level: "Junior",
    question: "What is your greatest weakness?",
    purpose: "Self-awareness and a real plan for improvement.",
    structure: ["A genuine development area, explained honestly in relation to the role", "What you are doing about it", "Evidence of progress"],
    sampleAnswer: "I used to find public speaking difficult, especially in English. I was nervous when presenting to senior managers. To improve, I joined a presentation skills course and volunteered to lead our monthly team updates. Now I feel much more confident, and last quarter I presented our results to the regional director.",
    highlights: ["I used to find public speaking difficult", "To improve, I joined a presentation skills course", "Now I feel much more confident"],
    usefulPhrases: ["I used to struggle with...", "To work on this, I've...", "I've made good progress, for example..."],
    avoid: ["'I'm a perfectionist' or 'I work too hard'", "Concealing a relevant skill gap rather than discussing how you would address it", "No improvement plan"],
  },
  {
    id: "bi-str-3", category: C[1], level: "Mid",
    question: "What is your biggest professional achievement?",
    purpose: "Evidence of impact, ideally with numbers, and your personal role in it.",
    structure: ["Context and challenge", "Your specific actions", "Measurable result and what you learned"],
    sampleAnswer: "My biggest achievement was reducing customer complaints by 30% in six months. Our support team was overloaded, and response times were very slow. I analysed the most common issues and created a self-help FAQ and email templates. As a result, response time dropped from 48 hours to 12 hours, and customer satisfaction scores improved significantly.",
    highlights: ["reducing customer complaints by 30%", "I analysed the most common issues", "from 48 hours to 12 hours"],
    usefulPhrases: ["I'm most proud of...", "I took the initiative to...", "This resulted in..."],
    avoid: ["Saying 'we' without explaining your own role", "An unsupported outcome or invented figures; an observable qualitative result is valid"],
  },
  {
    id: "bi-str-4", category: C[1], level: "Mid",
    question: "Why should we hire you?",
    purpose: "A confident summary that matches your skills to their top requirements.",
    structure: ["Repeat their key need", "Match two or three of your proven skills", "Add what makes you different"],
    sampleAnswer: "You need someone who can manage international clients and communicate clearly in English. I've handled accounts in Japan and Singapore for three years and kept a 95% client retention rate. In addition, I speak Vietnamese and Chinese, which would help you as you expand in Asia.",
    highlights: ["manage international clients", "kept a 95% client retention rate", "I speak Vietnamese and Chinese"],
    usefulPhrases: ["From what I understand, you need...", "I've proven that I can...", "What sets me apart is..."],
    avoid: ["'Because I need a job'", "Comparing yourself negatively to other candidates"],
  },
  {
    id: "bi-star-1", category: C[2], level: "Mid",
    question: "Tell me about a time you faced a difficult problem at work.",
    purpose: "Your problem-solving process, told with the STAR method.",
    structure: ["Situation: short background", "Task: your responsibility", "Action: the steps YOU took (most detail here)", "Result: a verified outcome and lesson; use figures only when you can explain their source"],
    sampleAnswer: "Situation: two weeks before a trade fair, our supplier told us the brochures would be late. Task: as the event coordinator, I had to make sure we had materials on time. Action: I contacted three local printers the same day and compared their delivery capacity, quotes and sample quality. I confirmed the artwork requirements, obtained approval for the replacement supplier and agreed a delivery checkpoint. I also prepared a digital version with a QR code as a backup, checking the link and materials with the event team. Result: the brochures arrived on time, we stayed within budget, and the QR code was so popular that we now use it at every event.",
    highlights: ["Situation:", "Task:", "Action:", "Result:", "prepared a digital version with a QR code as a backup", "stayed within budget"],
    usefulPhrases: ["The situation was...", "My responsibility was to...", "So I decided to...", "In the end, ..."],
    avoid: ["Spending most of the time on the situation", "A story with no clear result"],
  },
  {
    id: "bi-star-2", category: C[2], level: "Mid",
    question: "Describe a time you made a mistake. How did you handle it?",
    purpose: "Honesty, accountability and learning - not perfection.",
    structure: ["Admit a real mistake briefly", "Take responsibility and fix it quickly", "Explain the lesson and the change you made"],
    sampleAnswer: "Once, I sent a quotation to a client with the wrong discount. When I noticed it an hour later, I immediately told my manager and called the client to apologise and explain. After my manager confirmed the approved price and how to handle any existing commitment, I sent a corrected version and checked that the client understood the change. Since then, I always use a checklist and ask a colleague to double-check important figures.",
    highlights: ["I immediately told my manager", "apologise and explain", "I always use a checklist"],
    usefulPhrases: ["I take full responsibility for...", "I acted quickly to...", "The lesson I learned was..."],
    avoid: ["Blaming others", "Hiding material facts or sharing confidential details", "Claiming you never make mistakes"],
  },
  {
    id: "bi-star-3", category: C[2], level: "Mid",
    question: "Tell me about a time you worked under pressure or a tight deadline.",
    purpose: "How you prioritise, stay calm and communicate when time is short.",
    structure: ["The deadline and why it was tight", "How you prioritised and communicated", "Result"],
    sampleAnswer: "Last year, a key client asked for a full market report in three days instead of two weeks. I checked the available resources, broke the work into daily goals and focused first on the sections the client needed most. I also kept the client updated every evening so there were no surprises. We agreed to deliver the essential sections in three days and the remaining analysis the following week. Both milestones were met, and the client confirmed that the staged delivery supported their decision.",
    highlights: ["broke the work into daily goals", "focused first on the sections the client needed most", "kept the client updated every evening"],
    usefulPhrases: ["I prioritised...", "I kept everyone informed...", "Despite the pressure, ..."],
    avoid: ["Saying you never feel pressure", "Stories where the solution was only working all night"],
  },
  {
    id: "bi-star-4", category: C[2], level: "Mid",
    question: "Give an example of when you led a team or took the initiative.",
    purpose: "Leadership potential, even without a manager title.",
    structure: ["A problem nobody owned", "How you motivated or organised others", "Business result"],
    sampleAnswer: "Our team kept losing time searching for old client documents. Nobody was responsible for it, so I proposed a shared folder system and offered to lead the project. I organised a one-hour workshop, assigned each person a client group, and created simple naming rules. Within a month, the average time to find a document fell from ten minutes to under one minute.",
    highlights: ["I proposed a shared folder system", "offered to lead the project", "from ten minutes to under one minute"],
    usefulPhrases: ["I took the initiative to...", "I brought the team together to...", "I delegated..."],
    avoid: ["Taking all the credit", "Describing leadership as just giving orders"],
  },
  {
    id: "bi-team-1", category: C[3], level: "Junior",
    question: "How do you handle conflict with a colleague?",
    purpose: "Maturity, listening and focus on solutions rather than winning.",
    structure: ["Talk privately and early", "Listen and find common goals", "Agree on a solution and follow up"],
    sampleAnswer: "A colleague and I disagreed about how to share tasks on a project. Instead of arguing in the meeting, I asked to talk privately. I listened to her concerns and realised she felt overloaded. We agreed to split tasks by strengths and set weekly check-ins. After that, our cooperation improved and we finished the project on time.",
    highlights: ["I asked to talk privately", "I listened to her concerns", "We agreed to split tasks by strengths"],
    usefulPhrases: ["I'd prefer to discuss it face to face.", "I understand your point of view.", "What if we..."],
    avoid: ["Saying you have never had a conflict", "Criticising the colleague personally"],
  },
  {
    id: "bi-team-2", category: C[3], level: "Mid",
    question: "How do you deal with a difficult customer?",
    purpose: "Empathy, professionalism and problem-solving with clients.",
    structure: ["Stay calm and listen fully", "Acknowledge feelings and clarify the issue", "Offer options and follow up"],
    sampleAnswer: "First, I stay calm and let the customer explain the whole problem without interrupting. Then I acknowledge their frustration, for example: 'I completely understand why this is frustrating.' I confirm the facts, offer realistic solutions within my authority, and agree on a deadline. If a refund or exception requires approval, I involve the responsible person before promising it. Finally, I follow up to make sure they are satisfied. With one angry client, this approach turned a complaint into a repeat order.",
    highlights: ["let the customer explain the whole problem without interrupting", "I completely understand why this is frustrating", "offer two or three realistic solutions", "I follow up"],
    usefulPhrases: ["I'm sorry to hear that.", "Let me make sure I understand...", "What I can do for you is..."],
    avoid: ["Arguing about who is right", "Promising things you cannot deliver"],
  },
  {
    id: "bi-team-3", category: C[3], level: "Junior",
    question: "Do you prefer working alone or in a team?",
    purpose: "Flexibility: most jobs need both.",
    structure: ["Say you value both", "Example of each", "Link to the job's needs"],
    sampleAnswer: "I enjoy both, and I think each has its place. I work well independently when I need to focus, for example when preparing detailed reports. But I really value teamwork for brainstorming and solving complex problems, because different perspectives lead to better ideas. In a study project, I prepared the data summary independently and then worked with my group to interpret it. From the job description, this role needs both, which suits me well.",
    highlights: ["I enjoy both", "I work well independently", "I really value teamwork", "this role needs both"],
    usefulPhrases: ["I'm comfortable working...", "I value...", "It depends on the task."],
    avoid: ["Saying you dislike teamwork", "An answer with no example"],
  },
  {
    id: "bi-team-4", category: C[3], level: "Mid",
    question: "How would you explain a complex idea to a non-expert, such as a client or senior manager?",
    purpose: "Clear communication, audience awareness and structure.",
    structure: ["Start with the main message", "Use simple words, an analogy or a visual", "Check understanding"],
    sampleAnswer: "I start with the main message and why it matters to them, then add details only if needed. For example, when I explained a new pricing model to our directors, I began with the impact: 'Our forecast suggests an increase in profit of about 8%, subject to the assumptions on this slide.' I used one simple chart instead of a long table and compared the model to a mobile phone plan. I then invited questions and asked whether the assumptions matched their business priorities, to check understanding without putting them on the spot.",
    highlights: ["I start with the main message and why it matters to them", "one simple chart instead of a long table", "check understanding"],
    usefulPhrases: ["The bottom line is...", "To put it simply, ...", "Think of it like..."],
    avoid: ["Technical jargon", "Explaining the process before the result"],
  },
  {
    id: "bi-close-1", category: C[4], level: "Mid",
    question: "What are your salary expectations?",
    purpose: "Whether your expectations fit their budget - and how professionally you negotiate.",
    structure: ["Show you researched the market", "Give a realistic range", "Stay open to the full package"],
    sampleAnswer: "Before giving a firm figure, could you share the budgeted range and confirm the currency and whether the figure is gross or net? I would compare that with current market information for this location, the responsibilities and my experience. I am open to discussing the full package, including benefits and any variable pay. If you need my range first, I can provide a researched range on that same basis.",
    highlights: ["current market information for this location", "confirm the currency and whether the figure is gross or net", "I am open to discussing the full package"],
    usefulPhrases: ["Based on my research...", "I'm looking for something in the range of...", "I'm flexible depending on..."],
    avoid: ["'Anything is fine'", "A single number with no flexibility", "Asking about salary in the first minute"],
  },
  {
    id: "bi-close-2", category: C[4], level: "Junior",
    question: "Do you have any questions for us?",
    purpose: "Your genuine interest and preparation. Prepare a few relevant questions and ask those not already answered, as time allows.",
    structure: ["Ask about the role's success criteria", "Ask about the team or culture", "Ask about next steps"],
    sampleAnswer: "Yes, thank you. What would success look like in this role after the first six months? Could you tell me a little about the team I'd be working with? And finally, what are the next steps in the hiring process?",
    highlights: ["What would success look like in this role", "the team I'd be working with", "what are the next steps"],
    usefulPhrases: ["Could you tell me more about...?", "What are the biggest challenges for...?", "What are the next steps?"],
    avoid: ["'No, I don't have any questions'", "Questions answered on the company website", "Only asking about holidays"],
  },
  {
    id: "bi-close-3", category: C[4], level: "Junior",
    question: "When can you start?",
    purpose: "Your availability and professionalism toward your current employer.",
    structure: ["State your notice period honestly", "Show enthusiasm", "Mention flexibility if possible"],
    sampleAnswer: "My contract requires one month's notice. If we agree on an offer, I would confirm the resignation date with my current employer and then give you a realistic start date. I want to complete a proper handover, and I am enthusiastic about joining your team. If you have a preferred date, we can discuss whether it is feasible.",
    highlights: ["one month's notice", "complete a proper handover", "enthusiastic about joining your team"],
    usefulPhrases: ["My notice period is...", "I'm available from...", "I could be flexible on..."],
    avoid: ["Offering to leave your current job without notice"],
  },
  {
    id: "bi-close-4", category: C[4], level: "Senior",
    question: "How do you handle a negotiation when the other side says no?",
    purpose: "Persuasion, patience and win-win thinking in business communication.",
    structure: ["Understand the reason behind the no", "Explore alternatives and trade-offs", "Aim for a win-win agreement"],
    sampleAnswer: "When a client says no, I first ask questions to understand the real reason - is it price, timing or risk? In one case, a distributor rejected our price. I learned their concern was cash flow. After checking credit risk and obtaining finance approval, I offered 60-day payment terms instead of 30, with the financing cost included in our margin review. They accepted the approved terms. I respect a clear final refusal; exploring options is useful only when both parties want to continue.",
    highlights: ["ask questions to understand the real reason", "60-day payment terms instead of 30", "obtaining finance approval", "I respect a clear final refusal"],
    usefulPhrases: ["What's your main concern?", "Would it help if we...?", "Let's find a solution that works for both of us."],
    avoid: ["Immediately lowering your price", "Becoming defensive or pushy"],
  },
  {
    "id": "bi-graduate",
    "category": "Introduction & Motivation",
    "level": "Junior",
    "question": "What can you bring to this role if you have limited work experience?",
    "purpose": "Whether you can connect transferable skills to actual job requirements without exaggerating your experience.",
    "structure": [
      "Acknowledge your experience level",
      "Give evidence from an internship, study project or volunteering",
      "Connect the evidence to a job requirement and a learning plan"
    ],
    "sampleAnswer": "I have not held a full-time business role yet, but I have practised the skills this position needs. During a university group project, I coordinated deadlines and checked the final report against the assessment requirements. When one section was late, I agreed a revised plan with the team rather than waiting until submission day. We submitted a complete report on time. That experience gave me a foundation in organisation and clear communication. I would still need training on your systems, and I would ask for feedback early so I could improve quickly.",
    "highlights": [
      "I have not held a full-time business role yet",
      "coordinated deadlines",
      "ask for feedback early"
    ],
    "usefulPhrases": [
      "My most relevant experience is...",
      "That taught me how to..."
    ],
    "avoid": [
      "Inventing employment history",
      "Claiming you need no training"
    ]
  },
  {
    "id": "bi-role-understanding",
    "category": "Introduction & Motivation",
    "level": "Junior",
    "question": "What do you understand about this role?",
    "purpose": "Whether you have read the job description and understand its practical responsibilities.",
    "structure": [
      "Identify two core responsibilities",
      "Explain who benefits from the work",
      "Ask about an unclear priority"
    ],
    "sampleAnswer": "From the job description, I understand that the role combines customer communication with accurate order administration. I would need to keep clients informed and make sure the sales and operations teams have consistent information. My internship involved maintaining a shared order tracker, so I understand why accuracy matters. I would like to clarify whether the initial priority is handling existing accounts or supporting new customers, because that would affect how I prepare.",
    "highlights": [
      "customer communication with accurate order administration",
      "clarify whether the initial priority"
    ],
    "usefulPhrases": [
      "From the job description, I understand...",
      "Could you clarify the priority?"
    ],
    "avoid": [
      "Simply reading the advertisement aloud",
      "Assuming responsibilities not described"
    ]
  },
  {
    "id": "bi-career-change",
    "category": "Introduction & Motivation",
    "level": "Mid",
    "question": "Why are you changing careers, and how will your previous experience help?",
    "purpose": "A considered transition with transferable evidence and an honest account of remaining gaps.",
    "structure": [
      "Explain the reason for the transition",
      "Link a previous skill to the new work",
      "Describe preparation and remaining learning needs"
    ],
    "sampleAnswer": "I am moving from hospitality operations into customer success because I want to work on longer-term customer relationships. In hospitality, I learned to resolve complaints, coordinate handovers and explain options clearly under pressure. Those skills transfer well, but I recognise that software onboarding and account reporting are new areas for me. I have completed an introductory course and practised creating an onboarding plan for a sample product. I am applying for a role where I can contribute my service experience while learning the product with structured support.",
    "highlights": [
      "Those skills transfer well",
      "new areas for me",
      "structured support"
    ],
    "usefulPhrases": [
      "My transferable experience is...",
      "The gap I am working on is..."
    ],
    "avoid": [
      "Claiming unrelated experience is identical",
      "Criticising the previous industry"
    ]
  },
  {
    "id": "bi-career-gap",
    "category": "Introduction & Motivation",
    "level": "Junior",
    "question": "Could you explain the gap in your employment history?",
    "purpose": "A clear timeline and current readiness, without requiring private medical or family details.",
    "structure": [
      "Explain the period briefly at a level you are comfortable sharing",
      "Mention relevant activity only if true",
      "Confirm present availability"
    ],
    "sampleAnswer": "I took several months away from paid work to manage a personal responsibility. I prefer to keep the private details separate, but I can confirm that I am now ready to return to work. During the period, I kept my spreadsheet skills current through a short course and practice exercises. I understand that I will need to learn your current processes, and I am available to discuss a realistic start date.",
    "highlights": [
      "keep the private details separate",
      "ready to return to work"
    ],
    "usefulPhrases": [
      "During that period, I...",
      "I am now available to..."
    ],
    "avoid": [
      "Inventing courses or freelance work",
      "Feeling obliged to disclose sensitive personal details"
    ]
  },
  {
    "id": "bi-learning",
    "category": "Strengths & Experience",
    "level": "Junior",
    "question": "Tell me about a skill you learned recently. How did you apply it?",
    "purpose": "Evidence of a repeatable learning process and practical application.",
    "structure": [
      "Identify a relevant skill",
      "Explain practice and feedback",
      "Describe application and a remaining development area"
    ],
    "sampleAnswer": "I recently learned pivot tables because our weekly order report required repeated manual counting. I worked through a short tutorial, then practised on a copy of an old report. I checked the totals against the original and asked a colleague to review the categories before using the new format. The next report was easier to update, although I still needed help with more complex formulas. That taught me to test a new skill on a safe example before relying on it in live work.",
    "highlights": [
      "checked the totals against the original",
      "test a new skill on a safe example"
    ],
    "usefulPhrases": [
      "I practised by...",
      "I checked the result against..."
    ],
    "avoid": [
      "Listing certificates without application",
      "Using live data without permission"
    ]
  },
  {
    "id": "bi-tools",
    "category": "Strengths & Experience",
    "level": "Junior",
    "question": "Which business tools have you used, and how confident are you with them?",
    "purpose": "Accurate skill calibration rather than inflated claims of mastery.",
    "structure": [
      "Name relevant tools",
      "Give a specific task you can perform",
      "State limits and how you would learn"
    ],
    "sampleAnswer": "I use spreadsheets for sorting records, basic formulas and simple summary tables. In my internship, I also used a CRM to update contact details and record follow-up notes. I have not administered a CRM or built automated workflows, so I would not describe myself as an advanced user. If your team uses a different platform, I would learn the standard process, practise in a training environment and confirm the required fields before working independently.",
    "highlights": [
      "I would not describe myself as an advanced user",
      "practise in a training environment"
    ],
    "usefulPhrases": [
      "I am comfortable with...",
      "I have not yet used..."
    ],
    "avoid": [
      "Saying expert when you know only basics",
      "Naming tools you cannot discuss"
    ]
  },
  {
    "id": "bi-feedback",
    "category": "Behavioural (STAR)",
    "level": "Junior",
    "question": "Tell me about a time you received constructive criticism.",
    "purpose": "Whether you listen, clarify expectations and change your work without becoming defensive.",
    "structure": [
      "Describe the feedback",
      "Explain your response and revision",
      "Give an observed result"
    ],
    "sampleAnswer": "During my internship, my supervisor said my weekly update contained too much detail and did not make the next action clear. I asked to see an example of a useful update and confirmed which decisions the reader needed to make. I rewrote the report with a short summary, open issues and named owners. My supervisor accepted the revised format and used it in the next team meeting. I learned that a report is useful only if the audience can act on it.",
    "highlights": [
      "confirmed which decisions the reader needed to make",
      "open issues and named owners"
    ],
    "usefulPhrases": [
      "Could you show me an example?",
      "I changed my approach by..."
    ],
    "avoid": [
      "Treating feedback as a personal attack",
      "Saying you accepted feedback without changing anything"
    ]
  },
  {
    "id": "bi-failed-project",
    "category": "Behavioural (STAR)",
    "level": "Mid",
    "question": "Describe a project that did not achieve its objective. What did you learn?",
    "purpose": "Accountability, diagnosis and improvement rather than turning every failure into a success story.",
    "structure": [
      "State the original goal and actual outcome",
      "Separate causes from excuses",
      "Explain changes and evidence from later work"
    ],
    "sampleAnswer": "I coordinated a campaign intended to generate qualified enquiries, but most responses came from people outside our target segment. I had approved the audience settings without checking them against the sales team's criteria. I owned that decision, reviewed the leads with sales and paused the remaining spend with my manager's agreement. For the next campaign, we agreed qualification rules before launch and checked a small pilot first. The original campaign missed its target; the useful lesson was to validate the audience before scaling.",
    "highlights": [
      "I owned that decision",
      "validate the audience before scaling"
    ],
    "usefulPhrases": [
      "The objective was...",
      "In hindsight, I should have..."
    ],
    "avoid": [
      "Recasting a missed target as a success",
      "Blaming the whole outcome on another team"
    ]
  },
  {
    "id": "bi-initiative-junior",
    "category": "Behavioural (STAR)",
    "level": "Junior",
    "question": "Give an example of an improvement you suggested without being asked.",
    "purpose": "Practical initiative within your authority, including consultation and testing.",
    "structure": [
      "Identify a small recurring problem",
      "Explain your suggestion and approval",
      "Describe the change and outcome"
    ],
    "sampleAnswer": "I noticed that new volunteers repeatedly asked where to find event instructions. I suggested a one-page checklist with links to the approved documents. The coordinator reviewed it before we shared it, and I tested the links with another volunteer. At the next event, volunteers could find the key instructions in one place. I did not change the event rules; I made the existing information easier to access.",
    "highlights": [
      "The coordinator reviewed it",
      "made the existing information easier to access"
    ],
    "usefulPhrases": [
      "I noticed a recurring problem...",
      "I suggested a small change..."
    ],
    "avoid": [
      "Changing a controlled process without approval",
      "Claiming an unmeasured efficiency gain"
    ]
  },
  {
    "id": "bi-ambiguity",
    "category": "Workplace Scenarios",
    "level": "Junior",
    "question": "What would you do if you received a task with unclear instructions?",
    "purpose": "How you clarify the deliverable and avoid avoidable rework.",
    "structure": [
      "Confirm purpose, audience and deadline",
      "Ask focused questions and state assumptions",
      "Agree a small first draft or checkpoint"
    ],
    "sampleAnswer": "If I were asked to prepare a client report without a clear brief, I would first ask what decision it should support, who will read it and when it is needed. I would confirm the required data and format, then send a brief summary of my understanding. If the manager were unavailable, I would work on a reversible outline using existing approved information and mark assumptions clearly. I would not send the report externally until the scope and approval were confirmed.",
    "highlights": [
      "what decision it should support",
      "mark assumptions clearly",
      "approval were confirmed"
    ],
    "usefulPhrases": [
      "To confirm my understanding...",
      "Which outcome matters most?"
    ],
    "avoid": [
      "Guessing and sending externally",
      "Waiting silently without making a safe first step"
    ]
  },
  {
    "id": "bi-priorities",
    "category": "Workplace Scenarios",
    "level": "Junior",
    "question": "How do you prioritise when several tasks are urgent?",
    "purpose": "Your ability to compare impact and deadlines and communicate trade-offs.",
    "structure": [
      "Check true deadlines, impact and dependencies",
      "Propose an order with reasons",
      "Agree changes with affected people"
    ],
    "sampleAnswer": "I compare the deadlines, the consequences of delay and whether someone else is blocked. For example, I would prioritise correcting an order that is about to be dispatched over formatting an internal presentation due next week. If two managers requested work for the same afternoon, I would explain my current commitments and ask them to agree the order, offering realistic completion times. I would update both rather than silently promising that everything would be finished.",
    "highlights": [
      "deadlines, the consequences of delay",
      "offering realistic completion times"
    ],
    "usefulPhrases": [
      "The main risk of delaying this is...",
      "I can deliver A today and B tomorrow."
    ],
    "avoid": [
      "Treating every request as equally urgent",
      "Overpromising to avoid a difficult conversation"
    ]
  },
  {
    "id": "bi-missed-deadline",
    "category": "Workplace Scenarios",
    "level": "Junior",
    "question": "What would you do if you realised you could not meet a deadline?",
    "purpose": "Early escalation and a realistic recovery plan, not concealment.",
    "structure": [
      "Flag the risk before the deadline",
      "Explain the blocker and options",
      "Agree a revised plan and follow through"
    ],
    "sampleAnswer": "I would inform the owner as soon as the risk became clear, not after the deadline. I would explain what was complete, what was blocked and the likely impact. For instance, if required data were missing, I could offer a clearly labelled partial report today or a complete report after the data arrived. I would ask which option supported the business need, agree a revised date and send updates until delivery. I would not label incomplete figures as final.",
    "highlights": [
      "as soon as the risk became clear",
      "clearly labelled partial report",
      "not label incomplete figures as final"
    ],
    "usefulPhrases": [
      "There is a risk to the deadline because...",
      "Here are two realistic options..."
    ],
    "avoid": [
      "Waiting until the deadline passes",
      "Hiding missing information"
    ]
  },
  {
    "id": "bi-remote",
    "category": "Teamwork & Communication",
    "level": "Junior",
    "question": "How would you stay effective in a remote or hybrid team?",
    "purpose": "Reliable coordination and visible progress without equating availability with productivity.",
    "structure": [
      "Agree communication and availability expectations",
      "Make progress and blockers visible",
      "Document handovers and protect focused work"
    ],
    "sampleAnswer": "I would agree the team's core hours and which channel to use for urgent issues. I would keep my task board current and send concise updates covering completed work, next steps and blockers. For handovers, I would include the owner, deadline and links to relevant documents so colleagues in another time zone could continue. I would also reserve focus time and give advance notice if I would be unavailable. Being effective means delivering agreed work, not being online every minute.",
    "highlights": [
      "completed work, next steps and blockers",
      "owner, deadline and links"
    ],
    "usefulPhrases": [
      "My current blocker is...",
      "I will hand this over with..."
    ],
    "avoid": [
      "Promising constant availability",
      "Keeping decisions only in private messages"
    ]
  },
  {
    "id": "bi-international",
    "category": "Teamwork & Communication",
    "level": "Mid",
    "question": "Tell me about a communication challenge in an international team.",
    "purpose": "Checking assumptions without stereotyping cultures or blaming language ability.",
    "structure": [
      "Describe a specific misunderstanding",
      "Explain clarification and a shared convention",
      "State the outcome"
    ],
    "sampleAnswer": "On a regional project, the phrase end of day caused confusion because colleagues worked in different time zones. One team expected a file several hours earlier than the sender intended. I clarified the deadline with both teams and changed our tracker to show the date, time and time zone explicitly. We also agreed to confirm dependencies during handovers. The next delivery used the new convention and arrived before the agreed review slot. The issue was an unclear process, not anyone's nationality.",
    "highlights": [
      "date, time and time zone explicitly",
      "not anyone's nationality"
    ],
    "usefulPhrases": [
      "Which time zone should we use?",
      "Let us confirm the deadline explicitly."
    ],
    "avoid": [
      "Cultural stereotypes",
      "Assuming silence means agreement"
    ]
  },
  {
    "id": "bi-manager-disagreement",
    "category": "Teamwork & Communication",
    "level": "Mid",
    "question": "How would you handle a disagreement with your manager?",
    "purpose": "Respectful challenge supported by evidence, with appropriate escalation for material risks.",
    "structure": [
      "Clarify the objective and constraints",
      "Present evidence and an alternative privately",
      "Support a lawful decision or escalate serious concerns appropriately"
    ],
    "sampleAnswer": "I would first check that I understood the objective. If I thought a proposed delivery date was unrealistic, I would discuss the dependencies privately and show the current estimates. I would offer an alternative, such as a smaller first release, rather than simply objecting. Once we agreed a reasonable plan, I would support it and track the risks. If the instruction involved misleading a client or breaching policy, I would document the concern and use the appropriate escalation channel rather than treating it as an ordinary difference of opinion.",
    "highlights": [
      "show the current estimates",
      "a smaller first release",
      "appropriate escalation channel"
    ],
    "usefulPhrases": [
      "My concern is based on...",
      "Could we consider this alternative?"
    ],
    "avoid": [
      "Publicly undermining a manager",
      "Following an unethical instruction without question"
    ]
  },
  {
    "id": "bi-english-clarification",
    "category": "Teamwork & Communication",
    "level": "Junior",
    "question": "What would you do if you did not understand a question in English?",
    "purpose": "Professional clarification, not pretending to understand or apologising excessively.",
    "structure": [
      "Ask for repetition or clarification",
      "Paraphrase your understanding",
      "Answer the clarified question"
    ],
    "sampleAnswer": "I would ask for clarification politely rather than guess. For example, I might say, Could you clarify whether you mean my experience managing clients or my experience using the CRM? Once the interviewer confirmed the meaning, I would briefly restate it and give a relevant example. If one unfamiliar word were the issue, I would ask what it meant in that context. Clear communication matters more than pretending I understood every word immediately.",
    "highlights": [
      "ask for clarification politely rather than guess",
      "give a relevant example"
    ],
    "usefulPhrases": [
      "Could you rephrase that, please?",
      "Do you mean...?"
    ],
    "avoid": [
      "Answering an unrelated question",
      "Repeatedly apologising for your English"
    ]
  },
  {
    "id": "bi-handover",
    "category": "Workplace Scenarios",
    "level": "Junior",
    "question": "How would you prepare a handover before going on leave?",
    "purpose": "Continuity, ownership and practical documentation.",
    "structure": [
      "List active work and upcoming deadlines",
      "Assign cover with agreement",
      "Share accessible information and escalation contacts"
    ],
    "sampleAnswer": "I would list each open task, its status, the next action and the deadline. I would agree cover with my manager and confirm that the colleague taking over had access to the required documents. For a client order, I would record the latest promise, any unresolved issue and the contact person in operations. I would walk through high-risk items before leaving and set an out-of-office reply with the agreed contact. I would not share passwords or assume someone could cover without checking their workload.",
    "highlights": [
      "status, the next action and the deadline",
      "agree cover with my manager",
      "not share passwords"
    ],
    "usefulPhrases": [
      "The next action is...",
      "This needs attention by..."
    ],
    "avoid": [
      "A list with no owners",
      "Sharing login credentials"
    ]
  },
  {
    "id": "bi-email",
    "category": "Workplace Scenarios",
    "level": "Junior",
    "question": "How would you write an email about a delayed customer order?",
    "purpose": "Clear, accurate customer communication with ownership and realistic commitments.",
    "structure": [
      "State the issue and apologise appropriately",
      "Give verified information and options",
      "Specify the next update and contact"
    ],
    "sampleAnswer": "I would use a clear subject line with the order reference, acknowledge the delay and apologise for the inconvenience. I would state only the cause and delivery information that operations had confirmed. If the new delivery date were not yet known, I would explain when I would provide the next update rather than invent a date. I would include any approved alternatives and a contact point. Before sending, I would check the recipient, order details and any attachments to avoid exposing another customer's information.",
    "highlights": [
      "only the cause and delivery information that operations had confirmed",
      "when I would provide the next update"
    ],
    "usefulPhrases": [
      "I am sorry for the delay...",
      "I will update you by..."
    ],
    "avoid": [
      "Unverified delivery promises",
      "Sending unnecessary confidential details"
    ]
  },
  {
    "id": "bi-data-check",
    "category": "Workplace Scenarios",
    "level": "Junior",
    "question": "What would you do if two reports showed different sales figures?",
    "purpose": "Careful validation before reporting, not choosing the more favourable number.",
    "structure": [
      "Check definitions, dates and sources",
      "Reconcile with the responsible owner",
      "Disclose unresolved discrepancies"
    ],
    "sampleAnswer": "I would check whether both reports used the same period, currency and definition of sales. One might include cancelled orders while the other counts only completed invoices. I would trace a small sample of records and ask the report owners to confirm the rules. Once reconciled, I would document the agreed source for future updates. If the difference could not be resolved before a meeting, I would flag it clearly and avoid presenting either number as a verified final total.",
    "highlights": [
      "same period, currency and definition of sales",
      "avoid presenting either number as a verified final total"
    ],
    "usefulPhrases": [
      "These reports appear to use different definitions.",
      "This figure is not yet reconciled."
    ],
    "avoid": [
      "Picking the larger number",
      "Changing source data without authority"
    ]
  },
  {
    "id": "bi-ai-use",
    "category": "Workplace Scenarios",
    "level": "Mid",
    "question": "How would you use AI tools responsibly in your business work?",
    "purpose": "Useful application with privacy, accuracy and human accountability.",
    "structure": [
      "Identify an appropriate low-risk task",
      "Follow data and tool policy",
      "Verify outputs before using them"
    ],
    "sampleAnswer": "I would use an approved AI tool for low-risk support, such as proposing an outline for a generic training email. I would first check company policy and avoid entering confidential client information or personal data into an unapproved service. I would review the draft for facts, tone and missing context, and check any claims against trusted sources. The final message would still be my responsibility. I would not let the tool make customer commitments or send an email without review.",
    "highlights": [
      "an approved AI tool",
      "check any claims against trusted sources",
      "my responsibility"
    ],
    "usefulPhrases": [
      "I use it as a drafting aid, not a decision-maker.",
      "I verify the output before sharing it."
    ],
    "avoid": [
      "Uploading confidential information without permission",
      "Treating fluent output as proof of accuracy"
    ]
  },
  {
    "id": "bi-ethics",
    "category": "Leadership & Judgement",
    "level": "Mid",
    "question": "What would you do if you were asked to present a misleading result?",
    "purpose": "Integrity, evidence and an appropriate documented response.",
    "structure": [
      "Clarify whether the issue is an error or request to mislead",
      "Offer an accurate presentation",
      "Escalate through an appropriate channel if necessary"
    ],
    "sampleAnswer": "I would first clarify the request in case a definition or calculation had been misunderstood. If the proposed chart excluded failed orders in a way that made performance look better, I would explain the issue and offer a transparent version with the exclusions stated. I would not knowingly present a misleading figure. If pressure continued, I would keep a factual record and seek guidance from the appropriate manager or compliance channel under company policy. I would protect confidential information while raising the concern.",
    "highlights": [
      "a transparent version with the exclusions stated",
      "not knowingly present a misleading figure"
    ],
    "usefulPhrases": [
      "This could give a misleading impression because...",
      "Here is an accurate alternative."
    ],
    "avoid": [
      "Changing numbers to satisfy a manager",
      "Making public accusations before using appropriate channels"
    ]
  },
  {
    "id": "bi-influence",
    "category": "Leadership & Judgement",
    "level": "Mid",
    "question": "How have you persuaded a stakeholder without having formal authority?",
    "purpose": "Listening, evidence and proportionate influence rather than manipulation.",
    "structure": [
      "Identify the stakeholder's concern",
      "Offer evidence and a low-risk test",
      "Describe agreement and observed result"
    ],
    "sampleAnswer": "I wanted sales colleagues to use a shared enquiry tracker, but they were concerned it would add administration. I asked which fields they found unnecessary and reduced the proposed form to the information operations actually needed. We tested it with one account group for two weeks and reviewed missed handovers together. The pilot made responsibilities clearer, so the team agreed to keep it. I gained support by reducing the burden and showing a useful result, not by insisting my idea was right.",
    "highlights": [
      "reduced the proposed form",
      "tested it with one account group",
      "not by insisting my idea was right"
    ],
    "usefulPhrases": [
      "What would make this workable for your team?",
      "Could we test it on a small scale?"
    ],
    "avoid": [
      "Ignoring legitimate concerns",
      "Claiming consensus when people have not agreed"
    ]
  },
  {
    "id": "bi-feedback-giving",
    "category": "Leadership & Judgement",
    "level": "Mid",
    "question": "How would you give feedback to a colleague whose work is affecting the team?",
    "purpose": "Fair, specific feedback with support and clear ownership boundaries.",
    "structure": [
      "Discuss observable behaviour privately",
      "Ask about obstacles and agree a change",
      "Follow up; involve the manager if needed"
    ],
    "sampleAnswer": "I would speak privately and describe the specific issue rather than label the person. For example, I might explain that two handovers lacked delivery dates, leaving operations unable to schedule the orders. I would ask whether the template or workload was causing the problem and agree a practical next step, such as a checklist for the next handover. As a colleague, I would not threaten disciplinary action. If the pattern continued, I would involve the responsible manager with factual examples.",
    "highlights": [
      "specific issue rather than label the person",
      "not threaten disciplinary action"
    ],
    "usefulPhrases": [
      "I noticed that...",
      "What is making this difficult?"
    ],
    "avoid": [
      "Personal criticism",
      "Acting as a manager when you are not one"
    ]
  },
  {
    "id": "bi-first-90",
    "category": "Introduction & Motivation",
    "level": "Mid",
    "question": "What would you focus on during your first 90 days?",
    "purpose": "A realistic onboarding plan based on learning, alignment and modest early delivery.",
    "structure": [
      "Learn the product, people and processes",
      "Agree success measures with your manager",
      "Deliver a scoped improvement and review it"
    ],
    "sampleAnswer": "In the first month, I would learn the product, meet the teams I depend on and understand the current customer workflow. I would agree success measures with my manager rather than assume them. In the second month, I would take ownership of a defined part of the work and identify one manageable improvement using actual evidence. By the third month, I would aim to deliver that improvement, review its effect and agree the next priorities. The exact timing would depend on the role and access to training.",
    "highlights": [
      "agree success measures with my manager",
      "one manageable improvement",
      "depend on the role"
    ],
    "usefulPhrases": [
      "My initial priority would be...",
      "I would agree the measures before..."
    ],
    "avoid": [
      "Promising major savings before seeing the data",
      "Changing processes before understanding them"
    ]
  },
  {
    "id": "bi-scope",
    "category": "Workplace Scenarios",
    "level": "Mid",
    "question": "How would you respond when a client requests work outside the agreed scope?",
    "purpose": "Commercial boundaries with clear options and no unauthorised commitments.",
    "structure": [
      "Understand the requested change",
      "Compare scope and assess impact",
      "Offer an approved change or alternative"
    ],
    "sampleAnswer": "I would clarify the requested outcome and check it against the agreed scope. If it were additional work, I would explain that positively rather than dismiss the request. I would ask the delivery team to estimate the effort and confirm any effect on cost or timing. Then I would offer an approved change proposal or a smaller option within the existing agreement. I would record the client's decision and wait for the required approval before committing the team.",
    "highlights": [
      "effect on cost or timing",
      "wait for the required approval"
    ],
    "usefulPhrases": [
      "That is possible, but it would change...",
      "Within the current scope, we can..."
    ],
    "avoid": [
      "Agreeing extra work without approval",
      "Using the contract to avoid understanding the need"
    ]
  },
  {
    "id": "bi-sales-target",
    "category": "Workplace Scenarios",
    "level": "Mid",
    "question": "What would you do if you were behind your sales target?",
    "purpose": "Diagnosis and an ethical action plan, not pressure selling or manipulating records.",
    "structure": [
      "Analyse the funnel and remaining time",
      "Prioritise realistic opportunities and seek support",
      "Track progress honestly"
    ],
    "sampleAnswer": "I would compare the current pipeline with the target and identify whether the gap came from too few enquiries, slow follow-up or low conversion. I would prioritise qualified opportunities with a genuine customer need and review the main obstacles with my manager. If pricing were a barrier, I would seek approval for any proposed offer rather than promise an unauthorised discount. I would update the forecast honestly and track the next actions. I would not book an unconfirmed order just to improve the report.",
    "highlights": [
      "qualified opportunities with a genuine customer need",
      "update the forecast honestly"
    ],
    "usefulPhrases": [
      "The main gap appears to be...",
      "My next actions are..."
    ],
    "avoid": [
      "Pressure selling",
      "Recording unconfirmed revenue"
    ]
  },
  {
    "id": "bi-workload",
    "category": "Workplace Scenarios",
    "level": "Junior",
    "question": "How do you manage a sustained workload without sacrificing quality?",
    "purpose": "Sustainable delivery, early capacity discussion and quality safeguards.",
    "structure": [
      "Plan capacity and identify essential checks",
      "Discuss trade-offs early",
      "Monitor whether the revised plan is sustainable"
    ],
    "sampleAnswer": "I plan the week around deadlines and reserve time for checking important work. If demand regularly exceeds capacity, I would show my manager the workload and discuss priorities, support or revised timelines. During a short peak, I may be flexible within agreed arrangements, but working late every day is not a reliable long-term plan. I would keep essential checks, such as verifying payment details, rather than skip them to appear faster. After the peak, I would review what caused the overload.",
    "highlights": [
      "discuss priorities, support or revised timelines",
      "keep essential checks"
    ],
    "usefulPhrases": [
      "With the current capacity, we can complete...",
      "Which task can move?"
    ],
    "avoid": [
      "Glorifying exhaustion",
      "Skipping critical checks"
    ]
  },
  {
    "id": "bi-leadership-senior",
    "category": "Leadership & Judgement",
    "level": "Senior",
    "question": "Tell me about a difficult decision involving competing business priorities.",
    "purpose": "Trade-off judgement, consultation and ownership of consequences at leadership level.",
    "structure": [
      "State the competing objectives and constraints",
      "Explain evidence, options and decision rights",
      "Describe implementation, impact and review"
    ],
    "sampleAnswer": "I had to choose between launching a service update on the planned date and delaying it to resolve a support-readiness gap. Sales needed the launch for a customer commitment, but support had not completed training. I brought both teams together, checked the contractual implications and compared a full launch with a limited pilot. Within my approval authority, I chose the pilot for trained accounts and agreed a revised wider launch date with the sponsor. We monitored incidents and training completion before expanding. The trade-off was a slower rollout in exchange for a controlled customer experience.",
    "highlights": [
      "checked the contractual implications",
      "Within my approval authority",
      "slower rollout in exchange for a controlled customer experience"
    ],
    "usefulPhrases": [
      "The trade-off was...",
      "The decision criteria were..."
    ],
    "avoid": [
      "Ignoring decision authority",
      "Describing only the benefits and not the cost"
    ]
  },
  {
    "id": "bi-underperformance",
    "category": "Leadership & Judgement",
    "level": "Senior",
    "question": "How would you support an employee whose performance is below expectations?",
    "purpose": "Fair management, evidence, support and adherence to HR policy.",
    "structure": [
      "Check agreed expectations and concrete evidence",
      "Discuss causes and support privately",
      "Agree milestones and review through the proper process"
    ],
    "sampleAnswer": "I would check that the expectations were clear and that I had specific examples, not impressions. In a private conversation, I would describe the gap and listen for issues such as training, workload or unclear priorities. We would agree a documented improvement plan with achievable milestones, support and review dates, following HR policy. I would recognise progress and address continuing gaps consistently. I would not promise a particular disciplinary outcome in advance or discuss the person's private circumstances with the wider team.",
    "highlights": [
      "specific examples, not impressions",
      "support and review dates",
      "following HR policy"
    ],
    "usefulPhrases": [
      "The agreed expectation is...",
      "What support would help you meet it?"
    ],
    "avoid": [
      "Surprising someone with vague criticism",
      "Ignoring privacy or HR procedure"
    ]
  },
  {
    "id": "bi-interview-close",
    "category": "Closing & Salary",
    "level": "Junior",
    "question": "How would you follow up after an interview?",
    "purpose": "Concise professional follow-up that respects the hiring timeline.",
    "structure": [
      "Thank the interviewer",
      "Mention one relevant discussion point",
      "Follow the agreed next-step timeline"
    ],
    "sampleAnswer": "If appropriate for the hiring process, I would send a short thank-you message within a day or two. I would mention one specific point from the conversation and briefly confirm my interest. For example, I could refer to the team's focus on improving customer handovers and connect it to my relevant experience. If the recruiter gave a decision date, I would wait until that date had passed before asking for an update. I would not send repeated messages or assume silence meant an offer or rejection.",
    "highlights": [
      "one specific point from the conversation",
      "wait until that date had passed"
    ],
    "usefulPhrases": [
      "Thank you for discussing...",
      "I am following up on the timeline we discussed."
    ],
    "avoid": [
      "Repeated daily messages",
      "Sending a long second interview answer"
    ]
  },
];

export type HighlightPart = { text: string; important: boolean };

/** Splits text into plain and highlighted parts for safe React rendering. */
export const highlightPhrases = (text: string, phrases: string[]): HighlightPart[] => {
  const valid = phrases.filter((phrase) => phrase && text.includes(phrase)).sort((a, b) => b.length - a.length);
  if (!valid.length) return [{ text, important: false }];
  const pattern = new RegExp(`(${valid.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  return text.split(pattern).filter(Boolean).map((part) => ({ text: part, important: valid.includes(part) }));
};
