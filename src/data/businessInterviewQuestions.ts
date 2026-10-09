export type BusinessInterviewLevel = "Junior" | "Mid" | "Senior";

export interface BusinessInterviewQuestion {
  id: string;
  category: string;
  level: BusinessInterviewLevel;
  question: string;
  questionVi: string;
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
] as const;

const C = businessInterviewCategories;

export const businessInterviewQuestions: BusinessInterviewQuestion[] = [
  {
    id: "bi-intro-1", category: C[0], level: "Junior",
    question: "Tell me about yourself.",
    questionVi: "Hãy giới thiệu về bản thân bạn.",
    purpose: "A 60-90 second professional summary that links your background to this job - not your life story.",
    structure: ["Present: your current role or studies", "Past: one or two relevant achievements", "Future: why this role is the logical next step"],
    sampleAnswer: "I'm currently a marketing coordinator at a retail company in Ho Chi Minh City, where I manage our social media campaigns. Over the last two years, I increased our online engagement by 40% by introducing weekly customer stories. I've also worked closely with the sales team, which taught me how marketing supports revenue. Now I'm looking for a role with a larger international brand, and that's why this position caught my attention.",
    highlights: ["I'm currently a marketing coordinator", "increased our online engagement by 40%", "worked closely with the sales team", "that's why this position caught my attention"],
    usefulPhrases: ["I'm currently working as...", "Over the last X years, I've...", "What I enjoy most is...", "That's what brings me here today."],
    avoid: ["Starting with your birthplace and family", "Repeating your CV line by line", "Speaking for more than two minutes"],
  },
  {
    id: "bi-intro-2", category: C[0], level: "Junior",
    question: "Why do you want to work for our company?",
    questionVi: "Tại sao bạn muốn làm việc cho công ty chúng tôi?",
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
    questionVi: "Tại sao bạn rời công việc hiện tại?",
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
    questionVi: "Bạn thấy mình ở đâu sau năm năm nữa?",
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
    questionVi: "Điểm mạnh lớn nhất của bạn là gì?",
    purpose: "Two or three strengths relevant to the job, each proven with an example.",
    structure: ["Name the strength", "Give a short real example", "Show the result for the team or business"],
    sampleAnswer: "One of my main strengths is organisation. In my last job, I coordinated a product launch with five departments. I created a shared timeline and held short weekly check-ins, so we launched two days ahead of schedule. I'm also a quick learner - I learned our new CRM system in one week and then trained my colleagues.",
    highlights: ["One of my main strengths is organisation", "launched two days ahead of schedule", "I'm also a quick learner"],
    usefulPhrases: ["One of my key strengths is...", "For example, ...", "As a result, ..."],
    avoid: ["A long list of adjectives with no proof", "Strengths unrelated to the role"],
  },
  {
    id: "bi-str-2", category: C[1], level: "Junior",
    question: "What is your greatest weakness?",
    questionVi: "Điểm yếu lớn nhất của bạn là gì?",
    purpose: "Self-awareness and a real plan for improvement.",
    structure: ["A genuine, non-critical weakness", "What you are doing about it", "Evidence of progress"],
    sampleAnswer: "I used to find public speaking difficult, especially in English. I was nervous when presenting to senior managers. To improve, I joined a presentation skills course and volunteered to lead our monthly team updates. Now I feel much more confident, and last quarter I presented our results to the regional director.",
    highlights: ["I used to find public speaking difficult", "To improve, I joined a presentation skills course", "Now I feel much more confident"],
    usefulPhrases: ["I used to struggle with...", "To work on this, I've...", "I've made good progress, for example..."],
    avoid: ["'I'm a perfectionist' or 'I work too hard'", "A weakness that is core to the job", "No improvement plan"],
  },
  {
    id: "bi-str-3", category: C[1], level: "Mid",
    question: "What is your biggest professional achievement?",
    questionVi: "Thành tựu nghề nghiệp lớn nhất của bạn là gì?",
    purpose: "Evidence of impact, ideally with numbers, and your personal role in it.",
    structure: ["Context and challenge", "Your specific actions", "Measurable result and what you learned"],
    sampleAnswer: "My biggest achievement was reducing customer complaints by 30% in six months. Our support team was overloaded, and response times were very slow. I analysed the most common issues and created a self-help FAQ and email templates. As a result, response time dropped from 48 hours to 12 hours, and customer satisfaction scores improved significantly.",
    highlights: ["reducing customer complaints by 30%", "I analysed the most common issues", "from 48 hours to 12 hours"],
    usefulPhrases: ["I'm most proud of...", "I took the initiative to...", "This resulted in..."],
    avoid: ["Saying 'we' without explaining your own role", "No numbers or concrete outcome"],
  },
  {
    id: "bi-str-4", category: C[1], level: "Mid",
    question: "Why should we hire you?",
    questionVi: "Tại sao chúng tôi nên tuyển bạn?",
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
    questionVi: "Hãy kể về lần bạn gặp vấn đề khó khăn trong công việc.",
    purpose: "Your problem-solving process, told with the STAR method.",
    structure: ["Situation: short background", "Task: your responsibility", "Action: the steps YOU took (most detail here)", "Result: outcome with numbers + lesson"],
    sampleAnswer: "Situation: two weeks before a trade fair, our supplier told us the brochures would be late. Task: as the event coordinator, I had to make sure we had materials on time. Action: I contacted three local printers the same day, compared prices and chose one who could deliver in five days. I also prepared a digital version with a QR code as a backup. Result: the brochures arrived on time, we stayed within budget, and the QR code was so popular that we now use it at every event.",
    highlights: ["Situation:", "Task:", "Action:", "Result:", "prepared a digital version with a QR code as a backup", "stayed within budget"],
    usefulPhrases: ["The situation was...", "My responsibility was to...", "So I decided to...", "In the end, ..."],
    avoid: ["Spending most of the time on the situation", "A story with no clear result"],
  },
  {
    id: "bi-star-2", category: C[2], level: "Mid",
    question: "Describe a time you made a mistake. How did you handle it?",
    questionVi: "Hãy kể về một lần bạn mắc lỗi và cách bạn xử lý.",
    purpose: "Honesty, accountability and learning - not perfection.",
    structure: ["Admit a real mistake briefly", "Take responsibility and fix it quickly", "Explain the lesson and the change you made"],
    sampleAnswer: "Once, I sent a quotation to a client with the wrong discount. When I noticed it an hour later, I immediately told my manager and called the client to apologise and explain. I sent a corrected version the same day, and the client appreciated our transparency. Since then, I always use a checklist and ask a colleague to double-check important figures.",
    highlights: ["I immediately told my manager", "apologise and explain", "I always use a checklist"],
    usefulPhrases: ["I take full responsibility for...", "I acted quickly to...", "The lesson I learned was..."],
    avoid: ["Blaming others", "Choosing a mistake with serious ethical problems", "Claiming you never make mistakes"],
  },
  {
    id: "bi-star-3", category: C[2], level: "Mid",
    question: "Tell me about a time you worked under pressure or a tight deadline.",
    questionVi: "Hãy kể về lần bạn làm việc dưới áp lực hoặc deadline gấp.",
    purpose: "How you prioritise, stay calm and communicate when time is short.",
    structure: ["The deadline and why it was tight", "How you prioritised and communicated", "Result"],
    sampleAnswer: "Last year, a key client asked for a full market report in three days instead of two weeks. I broke the work into daily goals and focused first on the sections the client needed most. I also kept the client updated every evening so there were no surprises. We delivered on time, and the client signed a twelve-month contract the following month.",
    highlights: ["broke the work into daily goals", "focused first on the sections the client needed most", "kept the client updated every evening"],
    usefulPhrases: ["I prioritised...", "I kept everyone informed...", "Despite the pressure, ..."],
    avoid: ["Saying you never feel pressure", "Stories where the solution was only working all night"],
  },
  {
    id: "bi-star-4", category: C[2], level: "Senior",
    question: "Give an example of when you led a team or took the initiative.",
    questionVi: "Hãy cho ví dụ về lần bạn dẫn dắt nhóm hoặc chủ động đề xuất.",
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
    questionVi: "Bạn xử lý mâu thuẫn với đồng nghiệp như thế nào?",
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
    questionVi: "Bạn xử lý khách hàng khó tính như thế nào?",
    purpose: "Empathy, professionalism and problem-solving with clients.",
    structure: ["Stay calm and listen fully", "Acknowledge feelings and clarify the issue", "Offer options and follow up"],
    sampleAnswer: "First, I stay calm and let the customer explain the whole problem without interrupting. Then I acknowledge their frustration, for example: 'I completely understand why this is frustrating.' I confirm the facts, offer two or three realistic solutions, and agree on a deadline. Finally, I follow up to make sure they are satisfied. With one angry client, this approach turned a complaint into a repeat order.",
    highlights: ["let the customer explain the whole problem without interrupting", "I completely understand why this is frustrating", "offer two or three realistic solutions", "I follow up"],
    usefulPhrases: ["I'm sorry to hear that.", "Let me make sure I understand...", "What I can do for you is..."],
    avoid: ["Arguing about who is right", "Promising things you cannot deliver"],
  },
  {
    id: "bi-team-3", category: C[3], level: "Junior",
    question: "Do you prefer working alone or in a team?",
    questionVi: "Bạn thích làm việc độc lập hay theo nhóm?",
    purpose: "Flexibility: most jobs need both.",
    structure: ["Say you value both", "Example of each", "Link to the job's needs"],
    sampleAnswer: "I enjoy both, and I think each has its place. I work well independently when I need to focus, for example when preparing detailed reports. But I really value teamwork for brainstorming and solving complex problems, because different perspectives lead to better ideas. From the job description, this role needs both, which suits me well.",
    highlights: ["I enjoy both", "I work well independently", "I really value teamwork", "this role needs both"],
    usefulPhrases: ["I'm comfortable working...", "I value...", "It depends on the task."],
    avoid: ["Saying you dislike teamwork", "An answer with no example"],
  },
  {
    id: "bi-team-4", category: C[3], level: "Senior",
    question: "How would you explain a complex idea to a non-expert, such as a client or senior manager?",
    questionVi: "Bạn sẽ giải thích ý tưởng phức tạp cho người không chuyên như thế nào?",
    purpose: "Clear communication, audience awareness and structure.",
    structure: ["Start with the main message", "Use simple words, an analogy or a visual", "Check understanding"],
    sampleAnswer: "I start with the main message and why it matters to them, then add details only if needed. For example, when I explained a new pricing model to our directors, I began with the impact: 'This will increase profit by about 8%.' I used one simple chart instead of a long table and compared the model to a mobile phone plan. At the end, I asked them to summarise the key point to check understanding.",
    highlights: ["I start with the main message and why it matters to them", "one simple chart instead of a long table", "check understanding"],
    usefulPhrases: ["The bottom line is...", "To put it simply, ...", "Think of it like..."],
    avoid: ["Technical jargon", "Explaining the process before the result"],
  },
  {
    id: "bi-close-1", category: C[4], level: "Mid",
    question: "What are your salary expectations?",
    questionVi: "Mức lương mong muốn của bạn là bao nhiêu?",
    purpose: "Whether your expectations fit their budget - and how professionally you negotiate.",
    structure: ["Show you researched the market", "Give a realistic range", "Stay open to the full package"],
    sampleAnswer: "Based on my research for similar roles in this city and my four years of experience, I'm looking for a salary in the range of 25 to 30 million VND per month. That said, I'm open to discussing the whole package, including training and career development opportunities.",
    highlights: ["Based on my research", "in the range of 25 to 30 million VND per month", "I'm open to discussing the whole package"],
    usefulPhrases: ["Based on my research...", "I'm looking for something in the range of...", "I'm flexible depending on..."],
    avoid: ["'Anything is fine'", "A single number with no flexibility", "Asking about salary in the first minute"],
  },
  {
    id: "bi-close-2", category: C[4], level: "Junior",
    question: "Do you have any questions for us?",
    questionVi: "Bạn có câu hỏi nào cho chúng tôi không?",
    purpose: "Your genuine interest and preparation. Always ask two or three questions.",
    structure: ["Ask about the role's success criteria", "Ask about the team or culture", "Ask about next steps"],
    sampleAnswer: "Yes, thank you. What would success look like in this role after the first six months? Could you tell me a little about the team I'd be working with? And finally, what are the next steps in the hiring process?",
    highlights: ["What would success look like in this role", "the team I'd be working with", "what are the next steps"],
    usefulPhrases: ["Could you tell me more about...?", "What are the biggest challenges for...?", "What are the next steps?"],
    avoid: ["'No, I don't have any questions'", "Questions answered on the company website", "Only asking about holidays"],
  },
  {
    id: "bi-close-3", category: C[4], level: "Junior",
    question: "When can you start?",
    questionVi: "Khi nào bạn có thể bắt đầu?",
    purpose: "Your availability and professionalism toward your current employer.",
    structure: ["State your notice period honestly", "Show enthusiasm", "Mention flexibility if possible"],
    sampleAnswer: "My current contract requires one month's notice, so I could start on the first of next month. I'd like to finish my current projects properly, but I'm very excited about this role and happy to read any materials before my start date.",
    highlights: ["one month's notice", "finish my current projects properly", "very excited about this role"],
    usefulPhrases: ["My notice period is...", "I'm available from...", "I could be flexible on..."],
    avoid: ["Offering to leave your current job without notice"],
  },
  {
    id: "bi-close-4", category: C[4], level: "Senior",
    question: "How do you handle a negotiation when the other side says no?",
    questionVi: "Bạn xử lý đàm phán thế nào khi đối phương từ chối?",
    purpose: "Persuasion, patience and win-win thinking in business communication.",
    structure: ["Understand the reason behind the no", "Explore alternatives and trade-offs", "Aim for a win-win agreement"],
    sampleAnswer: "When a client says no, I first ask questions to understand the real reason - is it price, timing or risk? In one case, a distributor rejected our price. I learned their main concern was cash flow, so I offered the same price with 60-day payment terms instead of 30. They accepted, and we kept our margin. A no is often the start of the conversation, not the end.",
    highlights: ["ask questions to understand the real reason", "60-day payment terms instead of 30", "we kept our margin", "the start of the conversation, not the end"],
    usefulPhrases: ["What's your main concern?", "Would it help if we...?", "Let's find a solution that works for both of us."],
    avoid: ["Immediately lowering your price", "Becoming defensive or pushy"],
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
