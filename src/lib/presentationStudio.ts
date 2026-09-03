/**
 * Presentation & Public Speaking Studio - scenario bank + local speech analytics.
 * All heuristics run client-side so the studio still gives feedback offline.
 */

export type StudioMode = "scripted" | "impromptu";

export interface PresentationScenario {
  id: string;
  label: string;
  labelVi: string;
  audience: string;
  mode: StudioMode[];
  prompt: string;
  script: string;
  qaSeeds: string[];
}

export const PRESENTATION_SCENARIOS: PresentationScenario[] = [
  {
    id: "tech-pitch",
    label: "Tech Startup Pitch",
    labelVi: "Pitch khởi nghiệp công nghệ",
    audience: "Seed-stage investors",
    mode: ["scripted", "impromptu"],
    prompt:
      "Pitch your EdTech product in 3 minutes: problem, solution, traction, market size, team, and the ask.",
    script:
      "Good morning. Every year, four million Vietnamese students sit a high-stakes English exam, yet fewer than one in five can afford a personal tutor.\nThat is the gap we close. Our platform gives every learner an AI coach that listens, grades, and rebuilds the study plan overnight.\nFirst, let me show you the traction. In nine months we have grown to forty thousand monthly learners with a seventy-one percent week-four retention rate.\nSecond, the market. English test preparation in Southeast Asia is a two-point-one billion dollar market growing at fourteen percent a year.\nThird, the team. We combine fifteen years of classroom teaching with data engineering experience from Finland.\nTo summarise, we are raising eight hundred thousand dollars to expand into two new markets and double our content engine. Thank you - I am happy to take your questions.",
    qaSeeds: [
      "What stops a large incumbent from copying this in six months?",
      "Your retention looks strong - how do you prove it is not just early-adopter bias?",
    ],
  },
  {
    id: "thesis-defense",
    label: "Academic Thesis Defence",
    labelVi: "Bảo vệ luận văn",
    audience: "Examination committee",
    mode: ["scripted", "impromptu"],
    prompt:
      "Defend your thesis in 4 minutes: research gap, method, key findings, limitations, contribution.",
    script:
      "Distinguished members of the committee, thank you for your time. My thesis examines how adaptive feedback affects speaking fluency among upper-secondary learners.\nTo begin with, the literature treats fluency gains as a function of practice volume, yet it rarely isolates the quality of feedback.\nMoving on to the method, I ran a twelve-week quasi-experiment with two hundred and forty participants across four schools.\nThe central finding is that learners receiving word-level feedback improved fluency by zero-point-eight of a band, twice the gain of the control group.\nHowever, I must acknowledge two limitations: a single geographic region, and self-reported practice time.\nIn conclusion, this study contributes a replicable feedback protocol that schools can adopt without extra teaching hours. I welcome your questions.",
    qaSeeds: [
      "How do you rule out the novelty effect of the technology itself?",
      "Why did you choose a quasi-experimental design rather than a randomised trial?",
    ],
  },
  {
    id: "ielts-part3",
    label: "IELTS Speaking Part 3",
    labelVi: "IELTS Speaking Part 3",
    audience: "IELTS examiner",
    mode: ["impromptu", "scripted"],
    prompt:
      "Discuss: Should public speaking be a compulsory school subject? Develop both sides, then take a position.",
    script:
      "That is an interesting question. On the whole, I would argue that public speaking deserves a place in the core curriculum.\nOn the one hand, supporters point out that confident speakers do better in interviews and negotiations, so the skill has clear economic value.\nOn the other hand, critics claim that timetables are already crowded and that shy students may find compulsory presentations stressful.\nHaving said that, the pressure can be reduced with small-group formats rather than a whole-school auditorium.\nSo overall, I believe the benefits outweigh the drawbacks, provided that assessment focuses on progress rather than performance.",
    qaSeeds: [
      "Some people say online communication has made speaking skills less important - what do you think?",
      "How could schools assess speaking fairly without discouraging quieter students?",
    ],
  },
  {
    id: "exec-update",
    label: "Executive Business Update",
    labelVi: "Báo cáo cho ban điều hành",
    audience: "Leadership team",
    mode: ["scripted", "impromptu"],
    prompt:
      "Deliver a 2-minute quarterly update: headline result, two drivers, one risk, next actions.",
    script:
      "Thanks for making time. Here is the headline: we closed the quarter at one-point-four million in revenue, eight percent ahead of plan.\nThe first driver was the enterprise renewal cycle, where we retained ninety-four percent of accounts by value.\nThe second driver was pricing discipline; average contract value rose by eleven percent with no increase in churn.\nThe main risk I want to flag is delivery capacity - two of our three implementation leads are fully booked until November.\nTherefore I am asking for approval to bring forward two hires. I will follow up with the detailed plan by Friday. Over to you for questions.",
    qaSeeds: [
      "If we do not approve the hires, what exactly slips and by how long?",
      "How much of the revenue beat is one-off rather than repeatable?",
    ],
  },
  {
    id: "conference-talk",
    label: "Conference Lightning Talk",
    labelVi: "Bài nói hội thảo ngắn",
    audience: "Industry conference",
    mode: ["scripted", "impromptu"],
    prompt:
      "Give a 3-minute lightning talk on one idea worth spreading in education technology.",
    script:
      "Let me start with a number: the average learner forgets seventy percent of a new word within a week.\nMy talk today makes one claim - spaced practice is the cheapest upgrade any classroom can make.\nFirstly, consider how review timing works. A word revisited on day one, day three and day seven survives far longer than a word drilled ten times in one evening.\nSecondly, this costs nothing but scheduling. No new textbook, no new device.\nTo wrap up, if you change only one thing after this talk, change when your students review, not how much. Thank you.",
    qaSeeds: [
      "How would you convince a teacher with no extra planning time to adopt this?",
      "What evidence would change your mind about spaced practice?",
    ],
  },
  {
    id: "job-interview",
    label: "Job Interview: Tell Me About Yourself",
    labelVi: "Phỏng vấn xin việc: Giới thiệu bản thân",
    audience: "Hiring panel",
    mode: ["scripted", "impromptu"],
    prompt:
      "Answer 'Tell me about yourself' in 2 minutes: present role, two proof points, motivation, and why this company.",
    script:
      "Thank you for having me. I am an education technology specialist with five years of experience building learning products that teachers actually use.\nCurrently I lead content design at a language school, where I own the curriculum for eight hundred active learners.\nLet me give you two concrete results. First, I rebuilt our placement test, which cut misplaced students from eighteen percent to four percent in one term.\nSecond, I introduced weekly data reviews with teachers, and course completion rose from sixty-one to seventy-nine percent.\nWhat motivates me is the moment a hesitant learner speaks a full sentence without stopping. That is why I moved from classroom teaching into product work.\nAs for why your company, you are one of very few teams treating assessment as a design problem rather than a reporting problem, and that is exactly where I want to spend the next stage of my career.\nSo in short, I bring classroom credibility, measurable delivery, and a strong bias for evidence. I would be glad to walk through any of those in detail.",
    qaSeeds: [
      "What is the biggest professional mistake you have made, and what changed afterwards?",
      "Why should we hire you over a candidate with more years in the industry?",
    ],
  },
  {
    id: "scholarship-interview",
    label: "Scholarship / Visa Interview",
    labelVi: "Phỏng vấn học bổng / visa",
    audience: "Selection or visa officer",
    mode: ["scripted", "impromptu"],
    prompt:
      "Explain in 2 minutes: your study plan, why this country and programme, funding, and your return plan.",
    script:
      "Good morning. I am applying for the master's programme in educational data science, starting this autumn.\nMy plan is straightforward. In the first year I will complete the core courses in learning analytics and statistics, and in the second year I will write a thesis on early warning models for at-risk students.\nI chose this country because its schools publish open learning data, so my research can be validated against real cohorts rather than simulations.\nRegarding funding, my tuition is covered by the university scholarship, and my living costs are supported by family savings, with documentation included in my file.\nAfter graduation I intend to return home and join a national education programme, where dropout prediction is still done manually.\nTo summarise, this programme gives me a specific skill my country currently imports, and I have a concrete plan to bring it back. Thank you.",
    qaSeeds: [
      "What will you do if your scholarship is not renewed in the second year?",
      "Why can you not study this subject in your own country?",
    ],
  },
  {
    id: "ted-idea-talk",
    label: "TED-style Idea Talk",
    labelVi: "Bài nói kiểu TED",
    audience: "General public audience",
    mode: ["scripted", "impromptu"],
    prompt:
      "Share one idea worth spreading in 3 minutes: hook, personal story, the idea, evidence, and a call to action.",
    script:
      "I want to start with a confession. For three years I graded homework that nobody read.\nEvery Sunday I wrote careful comments in red ink, and every Monday those pages went straight into school bags and disappeared.\nThat led me to one idea: feedback is only feedback when the learner acts on it. Everything else is decoration.\nSo we ran a small experiment. Instead of written comments, students received one spoken sentence and had ten minutes in class to fix that exact thing.\nThe result surprised us. Error repetition dropped by more than half within a month, and the workload for teachers went down, not up.\nThink about what that means. The problem was never effort. The problem was timing.\nSo here is my ask. Next week, take one piece of feedback you would normally write, say it out loud instead, and give your learners time to use it while you are still in the room.\nSmall change, immediate return. Thank you.",
    qaSeeds: [
      "How would this idea survive in a class of fifty students?",
      "What is the strongest argument against your claim?",
    ],
  },
  {
    id: "product-demo",
    label: "Product Demo / Sales Presentation",
    labelVi: "Demo sản phẩm / thuyết trình bán hàng",
    audience: "Prospective client",
    mode: ["scripted", "impromptu"],
    prompt:
      "Run a 3-minute demo: customer pain, the workflow, one live feature, proof, pricing, next step.",
    script:
      "Thanks for the thirty minutes. Before I show anything, let me restate the problem you described last week.\nYour teachers spend roughly six hours a week marking speaking assignments, and parents still ask for more detail.\nHere is how our workflow changes that. A student records once, the platform returns a band score with evidence sentences, and the teacher reviews rather than marks from scratch.\nLet me show you the part that matters most: the evidence panel. Every score points to the exact phrase that earned it, so nothing looks like a black box.\nIn terms of proof, three schools of your size cut marking time by about seventy percent and increased parent report satisfaction from three-point-one to four-point-five out of five.\nOn pricing, you would be on the school plan, which is billed per active learner with no setup fee.\nAs a next step, I suggest a two-week pilot with one grade level, and I will handle the onboarding session myself. Does that work for you?",
    qaSeeds: [
      "How do you handle a case where your AI score disagrees with the teacher?",
      "What happens to our data if we stop using the platform?",
    ],
  },
  {
    id: "teaching-demo",
    label: "Classroom Teaching Demo",
    labelVi: "Dạy thử trước hội đồng",
    audience: "Teacher training panel",
    mode: ["scripted", "impromptu"],
    prompt:
      "Teach a 3-minute micro-lesson: objective, activation, model, guided practice, check for understanding.",
    script:
      "Good afternoon everyone. By the end of these few minutes, you will be able to describe a trend in one sentence using an adverb of degree.\nLet us start with something you already know. Look at this chart of ice cream sales. What happened between June and August?\nRight, it went up. Now I will model the sentence I want. Sales rose sharply between June and August.\nNotice three parts: the verb rose, the adverb sharply, and the time frame between June and August.\nYour turn, but with support. Using the same pattern, describe the drop in September. I will give you the verb fell and you choose the adverb.\nGood. Now the check. Hold up one finger if sharply means a small change, and two fingers if it means a large change.\nExcellent, two fingers everywhere. That tells me we can move on to gradual and slightly in the next stage.\nThat is the lesson: one pattern, one model, one immediate check.",
    qaSeeds: [
      "How would you support a learner who cannot produce the pattern at all?",
      "What evidence tells you this objective was met rather than mimicked?",
    ],
  },
  {
    id: "standup-review",
    label: "Team Stand-up & Sprint Review",
    labelVi: "Họp nhóm & tổng kết sprint",
    audience: "Product and engineering team",
    mode: ["scripted", "impromptu"],
    prompt:
      "Give a 2-minute sprint review: what shipped, what slipped, metrics, blockers, and the next sprint focus.",
    script:
      "Quick review of the sprint, then blockers.\nFirst, what shipped. The new speaking grader is live for all levels, and the report export is done including the bilingual layout.\nSecond, what slipped. The offline mode moved to next sprint because the caching layer failed under poor network conditions.\nOn the numbers, weekly active learners rose from nine thousand two hundred to ten thousand one hundred, and median grading time is now four seconds.\nThe main blocker is the audio storage quota. We are at eighty-eight percent, so I need a decision on retention this week rather than next.\nFor the next sprint, the focus is reliability, not features. Two engineers on offline mode, one on the storage cleanup job.\nThat is everything from me. Questions or objections before we commit?",
    qaSeeds: [
      "If we only ship one of the two items, which one and why?",
      "What is the risk of delaying the storage cleanup by another sprint?",
    ],
  },
  {
    id: "celebration-toast",
    label: "Wedding / Celebration Toast",
    labelVi: "Phát biểu chúc mừng",
    audience: "Friends and family",
    mode: ["scripted", "impromptu"],
    prompt:
      "Give a warm 2-minute toast: who you are, one story, one quality, one wish, and the raised glass.",
    script:
      "Good evening everyone. For those who do not know me, I am Minh, and I have had the pleasure of working beside Lan for seven years.\nI want to tell you one small story. On her very first week, our internet went down twenty minutes before a class of thirty students.\nMost of us froze. Lan picked up a marker, drew the whole lesson on the whiteboard, and the students later said it was their favourite class of the term.\nThat is the quality I admire most in her: she does not wait for perfect conditions.\nAnd Duc, you have the same habit, which is probably why the two of you make such calm decisions together.\nSo my wish is simple. May your life together be full of ordinary evenings that you would not trade for anything.\nPlease raise your glasses with me. To Lan and Duc. Congratulations.",
    qaSeeds: [
      "How would you shorten this toast to sixty seconds without losing the story?",
      "Which line would you cut if the room were much more formal?",
    ],
  },
  {
    id: "debate-opening",
    label: "Debate Opening Statement",
    labelVi: "Phát biểu mở đầu tranh luận",
    audience: "Debate adjudicators",
    mode: ["scripted", "impromptu"],
    prompt:
      "Deliver a 3-minute opening: definition, stance, two substantive arguments with impacts, and a pre-emptive rebuttal.",
    script:
      "Honourable adjudicators, today's motion is that smartphones should be banned in secondary schools during lesson time.\nWe define a ban as devices stored away from the learner between the first and last bell, with exceptions for medical and accessibility needs.\nWe stand in proposition, and we bring two arguments.\nOur first argument is attention. Studies of classroom interruption show that a single notification costs several minutes of recovered focus, and in a forty-five minute lesson that cost is not recoverable. The impact is measurable learning loss for the students who can least afford it.\nOur second argument is equity. When devices are present, the gap between learners with premium data plans and those without becomes visible every hour of the school day. Removing devices removes that daily reminder of difference.\nThe opposition will likely argue that phones are useful learning tools. We accept that, but usefulness is not the question. The question is whether the average lesson gains more from access than it loses from distraction, and the evidence says it does not.\nFor these reasons, we propose.",
    qaSeeds: [
      "How do you respond to schools that use phone-based quizzes successfully?",
      "Who enforces the ban, and what happens when enforcement fails?",
    ],
  },
  {
    id: "research-poster",
    label: "Science Fair / Research Poster Pitch",
    labelVi: "Thuyết trình poster nghiên cứu",
    audience: "Judges and visiting researchers",
    mode: ["scripted", "impromptu"],
    prompt:
      "Pitch your poster in 2 minutes: question, method, one figure, result, and why it matters.",
    script:
      "Hello, thank you for stopping by. My project asks a simple question: can a low-cost sensor predict indoor air quality well enough for a classroom?\nThe method had three stages. I built five sensors from off-the-shelf parts, ran them beside a calibrated reference monitor for six weeks, and compared readings every minute.\nIf you look at the figure in the centre of the poster, the blue line is my sensor and the grey line is the reference. They track closely until carbon dioxide passes two thousand parts per million, where my sensor begins to under-report.\nThe headline result is a correlation of zero-point-nine-four in the normal classroom range, at about one-twentieth of the cost.\nWhy does this matter? Most schools cannot afford a certified monitor per room, so they ventilate on a fixed schedule rather than on evidence.\nMy next step is a calibration correction for the high range, and I would welcome any suggestions on that. Thank you.",
    qaSeeds: [
      "What is your main source of measurement error, and how would you quantify it?",
      "How would you convince a school district to trust an uncertified sensor?",
    ],
  },
  {
    id: "crisis-update",
    label: "Crisis Communication Update",
    labelVi: "Thông báo xử lý sự cố",
    audience: "Affected users and staff",
    mode: ["scripted", "impromptu"],
    prompt:
      "Deliver a calm 2-minute update: what happened, what is confirmed, impact, actions taken, next update time.",
    script:
      "Thank you all for joining at short notice. I will keep this to facts, actions, and timing.\nWhat happened: between six and nine this morning, learners were unable to submit speaking assignments. The cause was a failed storage migration on our side, not a security incident.\nWhat is confirmed: no learner recordings were lost, and no personal data was exposed. Our logs cover the full window and we have reviewed them line by line.\nThe impact: approximately two thousand three hundred submissions were delayed, and forty-one were duplicated. Duplicates are being merged today.\nActions taken: the migration is rolled back, submissions are working normally as of nine-forty, and we have added an alert that pages an engineer within sixty seconds of a submission failure.\nWhat we still owe you: a written incident report with a full timeline, and an extended deadline for every affected class.\nMy next update will be at four o'clock this afternoon, whether or not there is new information. I will take questions now.",
    qaSeeds: [
      "How can you be certain no data was exposed?",
      "What prevents the same migration failure from happening again next month?",
    ],
  },
  {
    id: "class-presentation",
    label: "University Class Presentation",
    labelVi: "Thuyết trình nhóm trên lớp",
    audience: "Lecturer and classmates",
    mode: ["scripted", "impromptu"],
    prompt:
      "Present your group project in 3 minutes: aim, division of work, method, findings, and what you would do differently.",
    script:
      "Good afternoon everyone. Our group looked at how students in our faculty actually use AI tools for coursework.\nTo begin with, our aim was simple: separate what students say they do from what they really do.\nWe split the work three ways. Linh built the survey, Minh ran the interviews, and I handled the analysis.\nOur method combined a survey of one hundred and eighty students with twelve follow-up interviews.\nThe headline finding is that eighty-two percent use AI weekly, but only nine percent ever check the sources it gives them.\nA second finding surprised us: students who used AI most were also the ones most worried about their own writing skills.\nHaving said that, our sample came from one faculty only, so we cannot generalise to the whole university.\nIf we did this again, we would add a short writing task to measure skill directly rather than relying on self-reports.\nTo conclude, AI use is now normal, but verification habits are not. Thank you - we are happy to take questions.",
    qaSeeds: [
      "How did you make sure interview participants told you the truth?",
      "What would change in your conclusion if you had sampled another faculty?",
    ],
  },
  {
    id: "panel-answer",
    label: "Conference Q&A Panel Answer",
    labelVi: "Trả lời toạ đàm hội thảo",
    audience: "Conference delegates and moderator",
    mode: ["impromptu", "scripted"],
    prompt:
      "You are on a panel. Answer in 90 seconds: Will AI tutors replace language teachers in the next decade?",
    script:
      "Thank you for the question, and I will give you a direct answer: no, but the job description will change.\nFirst, let me define what AI does well. It gives instant feedback, infinite patience, and practice at three in the morning.\nHowever, it does not read a room, it does not notice that a student has stopped speaking because of something at home, and it cannot earn trust.\nFor example, in our own classrooms the learners who improved fastest were not the ones with the most AI practice, but the ones whose teacher used that practice data in the next lesson.\nSo my position is that AI replaces the drilling, not the teaching.\nTo wrap up, the teachers at risk are the ones doing only what software already does better. The rest are about to become far more effective.",
    qaSeeds: [
      "You say trust matters - how would you measure that in a classroom?",
      "What evidence would change your mind about replacement?",
    ],
  },
  {
    id: "investor-update",
    label: "Investor Follow-up Update",
    labelVi: "Cập nhật cho nhà đầu tư",
    audience: "Existing investors",
    mode: ["scripted", "impromptu"],
    prompt:
      "Give a 2-minute quarterly update: numbers, what worked, what did not, the ask, and the next milestone.",
    script:
      "Thanks everyone for making time. I will cover four things: the numbers, what worked, what did not, and what I need from you.\nStarting with the numbers. Revenue grew twenty-eight percent quarter on quarter, and our cash runway now stands at fourteen months.\nWhat worked: the school partnership channel. Three districts signed, and the cost of acquiring a learner through that channel is roughly one fifth of paid ads.\nWhat did not work: our self-serve upgrade flow. We shipped it, we measured it, and conversion moved by less than half a percent, so we are pulling it back for a rebuild.\nThe ask is specific. We need two warm introductions to regional school groups, and one advisor with curriculum accreditation experience.\nOur next milestone is one hundred paying schools by the end of the quarter, and I will report against that number whether or not we hit it. Questions welcome.",
    qaSeeds: [
      "Why is the self-serve flow worth rebuilding rather than dropping?",
      "What happens to the plan if the school channel slows next quarter?",
    ],
  },
  {
    id: "project-kickoff",
    label: "Project Kick-off Briefing",
    labelVi: "Họp khởi động dự án",
    audience: "Cross-functional project team",
    mode: ["scripted", "impromptu"],
    prompt:
      "Kick off a new project in 2 minutes: why now, scope, roles, timeline, risks, and how success is measured.",
    script:
      "Good morning, and welcome to the kick-off. I want everyone to leave this room knowing exactly what they own.\nFirst, why now. Our onboarding drop-off has sat at forty percent for three quarters, and every other growth idea is downstream of fixing it.\nSecond, the scope. We are rebuilding the first-session experience only. We are not touching billing, and we are not redesigning the dashboard.\nThird, roles. Mai leads design, Tuan leads engineering, and I am accountable for the outcome. If you are blocked, come to me, not to a queue.\nFourth, the timeline. Six weeks: two for research, three for build, one for rollout and measurement.\nOn risks, the biggest one is scope creep, and the second is dependency on the analytics migration finishing on time.\nFinally, success is one number: drop-off under twenty-five percent, measured four weeks after launch. Thank you - let us get to work.",
    qaSeeds: [
      "What do we cut first if the analytics migration slips two weeks?",
      "Why measure at four weeks rather than immediately after launch?",
    ],
  },
  {
    id: "workshop-opening",
    label: "Training Workshop Opening",
    labelVi: "Mở đầu buổi tập huấn",
    audience: "Workshop participants",
    mode: ["scripted", "impromptu"],
    prompt:
      "Open a training workshop in 2 minutes: hook, promise, agenda, ground rules, and first activity.",
    script:
      "Before we start, please write one word on your sticky note: the thing you find hardest about speaking in English. Keep it - we will come back to it at the end.\nWelcome to today's workshop. My promise is simple: you will leave with three techniques you can use in your very next meeting, not three theories.\nHere is the agenda. We spend the first thirty minutes on structure, the next forty on delivery, and the final twenty on live practice with feedback.\nTwo ground rules. First, everybody speaks in the first ten minutes, because the longer you wait the harder it gets. Second, feedback is specific and kind - no vague praise.\nOne housekeeping note: we break at half past ten, and slides go out afterwards, so please listen rather than copy.\nLet us start with the first activity. Turn to the person next to you and introduce yourself in exactly thirty seconds. Ready? Go.",
    qaSeeds: [
      "How do you handle a participant who refuses to speak?",
      "Why give out the slides afterwards rather than at the start?",
    ],
  },
  {
    id: "customer-story",
    label: "Customer Success Story",
    labelVi: "Câu chuyện khách hàng",
    audience: "Prospective customers",
    mode: ["scripted", "impromptu"],
    prompt:
      "Tell a 2-minute customer story: who they were, the problem, what changed, the measured result, and the lesson.",
    script:
      "Let me tell you about a school in Da Nang with six hundred students and two English teachers.\nBefore working with us, their problem was not motivation. It was feedback. A teacher marking six hundred speaking recordings simply cannot return them within a week, and feedback a fortnight late changes nothing.\nWhat changed was small. Students recorded on the platform, received instant word-level feedback, and teachers reviewed only the flagged cases.\nThe measured result after one semester: average speaking scores rose by zero-point-seven of a band, and teacher marking time dropped from nine hours a week to about two.\nThe part I did not expect is that teacher satisfaction moved more than student scores did.\nThe lesson for anyone here is this. Do not automate teaching. Automate the bottleneck that stops teaching from landing. Thank you.",
    qaSeeds: [
      "How do you know the gain came from feedback speed and not extra practice?",
      "What would this look like at a school with twenty teachers instead of two?",
    ],
  },
  {
    id: "data-walkthrough",
    label: "Data & Report Walkthrough",
    labelVi: "Trình bày số liệu, biểu đồ",
    audience: "Department stakeholders",
    mode: ["scripted", "impromptu"],
    prompt:
      "Walk an audience through a chart in 2 minutes: what it shows, the trend, the outlier, the cause, and the decision it drives.",
    script:
      "The chart on screen shows weekly active learners over the last twelve months, split by school and self-serve.\nBefore the numbers, one note on how to read it. The solid line is schools, the dotted line is self-serve, and the shaded band is the summer holiday.\nThe overall trend is steady growth in the school line, roughly nine percent a month, while self-serve is essentially flat.\nThe obvious outlier is week thirty-one, where activity halves. That is not a data problem - it is the national holiday week, and it recovers fully the week after.\nThe cause of the flat self-serve line appears to be discovery rather than quality. Retention in both groups is nearly identical once learners reach their third session.\nSo the decision this drives is clear. We move the next quarter's budget from self-serve advertising into school partnerships, and we revisit self-serve only if third-session retention drops.\nThat is the story in the data. Happy to go deeper on any segment.",
    qaSeeds: [
      "How confident are you that the summer dip is seasonal rather than churn?",
      "What number would make you reverse the budget decision?",
    ],
  },
  {
    id: "graduation-speech",
    label: "Motivational Graduation Speech",
    labelVi: "Phát biểu tốt nghiệp truyền cảm hứng",
    audience: "Graduating students, families and staff",
    mode: ["scripted"],
    prompt:
      "Deliver a 3-minute graduation speech: one story, one idea, one call to action. Warm, concrete, not clichéd.",
    script:
      "Teachers, families, and above all the class sitting in front of me - congratulations.\nI want to start with a confession. In my final year of school, I failed a speaking exam so badly that the examiner asked if I would like to try again in Vietnamese.\nI remember walking home and deciding that I was simply not a speaking person. That decision cost me four years.\nWhat changed was not talent and it was not confidence. It was repetition in front of people who were kind enough to tell me the truth.\nSo here is the one idea I want to leave you with. You are not finished, you are simply early. The gap between where you are and where you want to be is almost always practice you have not done yet, not ability you were not born with.\nAnd here is my call to action. In the next month, do one thing you are visibly bad at, in front of someone whose opinion you respect.\nThat is how you will keep learning long after nobody is grading you. Congratulations again, and thank you.",
    qaSeeds: [
      "Which sentence in your speech would you keep if you had only thirty seconds?",
      "How would you adapt this speech for an audience of parents rather than students?",
    ],
  },
  {
    id: "media-interview",
    label: "Podcast / Media Interview",
    labelVi: "Trả lời phỏng vấn podcast",
    audience: "Podcast host and listeners",
    mode: ["impromptu", "scripted"],
    prompt:
      "Answer the host in 2 minutes: What is the most misunderstood thing about learning a language as an adult?",
    script:
      "The most misunderstood thing is the idea that adults are worse learners than children. That is mostly a myth, and it does real damage.\nLet me be precise. Children are better at accent, because of when the ear is tuned. Adults are better at almost everything else - grammar, vocabulary, strategy, and above all self-direction.\nFor example, an adult can learn the two hundred words that matter for their job in three weeks. A seven-year-old cannot do that, and does not need to.\nWhere adults genuinely struggle is exposure. A child gets six hours a day of unavoidable practice. An adult gets twenty minutes if they are disciplined.\nSo the real problem is not the brain, it is the calendar.\nMy practical advice is to stop studying and start scheduling. Fifteen minutes of speaking every day beats three hours on Sunday, and it is not close.\nThat is the shift I would want every adult learner to hear.",
    qaSeeds: [
      "What is the strongest evidence against the myth you just described?",
      "If someone genuinely has only ten minutes a day, what should they cut?",
    ],
  },
  {
    id: "fundraising-appeal",
    label: "Non-profit Fundraising Appeal",
    labelVi: "Kêu gọi gây quỹ thiện nguyện",
    audience: "Donors at a charity evening",
    mode: ["scripted", "impromptu"],
    prompt:
      "Make a 2-minute appeal: one specific person, the gap, exactly what a donation buys, credibility, and a clear ask.",
    script:
      "Thank you for being here tonight. I want to tell you about one student, and then I will ask you for something very specific.\nHer name is Trang. She is fifteen, she lives two hours from the nearest exam centre, and last year she scored higher in our practice tests than any student in her province.\nShe did not sit the exam. The fee and the travel came to about four million dong, which is more than her family earns in a month.\nThat is the gap. It is not talent, and it is not effort. It is a bus ticket and a fee.\nHere is exactly what your donation buys. One hundred and eighty dollars covers one student's exam fee, travel, and a full year of preparation materials. Not overheads - we publish our accounts every quarter, and ninety-one cents of every dollar reaches a student directly.\nSo my ask tonight is simple. Sponsor one student. Twenty of you in this room doing that changes twenty exam results, and exam results in this system change everything downstream.\nThank you.",
    qaSeeds: [
      "How do you verify that the money actually reaches a specific student?",
      "What happens to a sponsored student who does not pass?",
    ],
  },
  {
    id: "architecture-review",
    label: "Technical Architecture Review",
    labelVi: "Trình bày kiến trúc kỹ thuật",
    audience: "Senior engineers and architects",
    mode: ["scripted", "impromptu"],
    prompt:
      "Present a design in 3 minutes: the constraint, the options considered, the choice, the trade-offs, and the rollback plan.",
    script:
      "I am proposing we move speech grading from the request path into a queue. Let me start with the constraint that forces the change.\nToday, grading runs inline, and the ninety-fifth percentile response time is eleven seconds. Anything above three seconds and learners re-submit, which doubles our load exactly when we are slowest.\nWe considered three options. One, scale the current service vertically. Two, cache aggressively. Three, decouple with a job queue and push results over a live channel.\nWe rejected vertical scaling because cost grows faster than traffic, and caching because almost every recording is unique.\nSo the choice is the queue. Submissions return in under three hundred milliseconds, grading happens asynchronously, and the client receives the result over an existing realtime connection.\nThe honest trade-offs are two. The client gets more complex because it must handle a pending state, and we now own a queue with its own failure modes and monitoring.\nOn rollback: the inline path stays behind a feature flag for two releases, so reverting is a config change, not a deploy.\nThat is the proposal. I would like a decision today so we can start on Monday.",
    qaSeeds: [
      "What is your plan when the queue backs up during a peak exam week?",
      "Why keep the inline path for two releases rather than one?",
    ],
  },
  {
    id: "elevator-pitch",
    label: "Elevator Pitch (60 seconds)",
    labelVi: "Pitch thang máy 60 giây",
    audience: "A busy decision maker",
    mode: ["impromptu", "scripted"],
    prompt:
      "You have 60 seconds and one chance: who you help, the problem, what you do, proof, and the single next step you want.",
    script:
      "I have sixty seconds, so here is the short version.\nWe help secondary schools that have hundreds of students and only a handful of English teachers.\nThe problem is feedback speed. Speaking practice only improves a learner if the correction arrives the same day, and no human team can mark six hundred recordings that fast.\nWhat we do is grade every recording instantly at the word level, then hand the teacher a short list of the students who actually need a human.\nThe proof is that across eleven schools last semester, speaking scores rose by roughly zero-point-seven of a band while teacher marking time fell by three quarters.\nThe next step I am asking for is twenty minutes with whoever owns your English curriculum. That is it - thank you for the sixty seconds.",
    qaSeeds: [
      "What is the one sentence you would drop if you only had thirty seconds?",
      "Why should a curriculum lead trust a machine score at all?",
    ],
  },
];

/** Grouping used by the scenario picker so the long list stays browsable. */
export const SCENARIO_GROUPS: { id: string; label: string; labelVi: string; ids: string[] }[] = [
  {
    id: "academic",
    label: "Academic",
    labelVi: "Học thuật",
    ids: ["thesis-defense", "class-presentation", "research-poster", "teaching-demo", "workshop-opening"],
  },
  {
    id: "business",
    label: "Business & Tech",
    labelVi: "Công việc & Công nghệ",
    ids: [
      "tech-pitch", "exec-update", "product-demo", "standup-review", "investor-update",
      "project-kickoff", "customer-story", "data-walkthrough", "architecture-review",
      "crisis-update", "elevator-pitch",
    ],
  },
  {
    id: "exam",
    label: "Exam & Interview",
    labelVi: "Thi cử & Phỏng vấn",
    ids: ["ielts-part3", "job-interview", "scholarship-interview", "debate-opening", "panel-answer", "media-interview"],
  },
  {
    id: "social",
    label: "Social & Inspiration",
    labelVi: "Xã hội & Truyền cảm hứng",
    ids: ["ted-idea-talk", "conference-talk", "celebration-toast", "graduation-speech", "fundraising-appeal"],
  },
];


/** Blank scenario shell used when a learner pastes their own script. */
export const CUSTOM_SCENARIO_ID = "custom-script";

export const buildCustomScenario = (script: string, audience: string): PresentationScenario => ({
  id: CUSTOM_SCENARIO_ID,
  label: "My own script",
  labelVi: "Kịch bản của tôi",
  audience: audience.trim() || "My own audience",
  mode: ["scripted", "impromptu"],
  prompt:
    audience.trim()
      ? `Deliver your own presentation to: ${audience.trim()}.`
      : "Deliver your own pasted presentation script.",
  script: script.trim(),
  qaSeeds: [
    "Which part of your script is weakest under a hostile question?",
    "If you had thirty seconds only, which sentence would you keep?",
  ],
});

/** Filler words tracked live. */
export const FILLER_PATTERNS: { label: string; regex: RegExp }[] = [
  { label: "um", regex: /\b(um|umm|uhm)\b/gi },
  { label: "ah", regex: /\b(ah|uh|er|erm)\b/gi },
  { label: "like", regex: /\blike\b(?!\s+(?:to|this|that|a|an|the|it|you|him|her|them|my|our))/gi },
  { label: "you know", regex: /\byou know\b/gi },
  { label: "actually", regex: /\bactually\b/gi },
  { label: "basically", regex: /\bbasically\b/gi },
  { label: "sort of", regex: /\b(sort of|kind of)\b/gi },
];

/** Signposting language that earns credit for structure. */
export const SIGNPOST_PHRASES = [
  "first of all", "firstly", "first", "to begin with", "secondly", "second",
  "thirdly", "next", "moving on", "moving on to", "turning to", "let me start with",
  "let me show you", "on the one hand", "on the other hand", "however",
  "having said that", "in contrast", "for example", "for instance", "as a result",
  "therefore", "consequently", "to summarise", "to summarize", "in summary",
  "to wrap up", "in conclusion", "so overall", "the main point is", "here is the headline",
  "finally", "to conclude",
];

/** Band 8.0+ / executive-register vocabulary. */
export const ADVANCED_VOCAB = [
  "pivotal", "compelling", "substantial", "unprecedented", "robust", "nuanced",
  "leverage", "mitigate", "sustainable", "scalable", "trajectory", "discipline",
  "retention", "traction", "differentiator", "replicable", "quasi-experimental",
  "outweigh", "drawbacks", "detrimental", "instrumental", "profound",
  "counterintuitive", "meticulous", "prevalent", "viable", "consolidate",
  "articulate", "advocate", "acknowledge", "underscore", "demonstrate",
];

export const WEAK_UPGRADES: { weak: RegExp; strong: string }[] = [
  { weak: /\bvery important\b/gi, strong: "pivotal" },
  { weak: /\bvery big\b/gi, strong: "substantial" },
  { weak: /\bvery good\b/gi, strong: "compelling" },
  { weak: /\ba lot of\b/gi, strong: "a considerable amount of" },
  { weak: /\bgood results\b/gi, strong: "strong outcomes" },
  { weak: /\bbad\b/gi, strong: "detrimental" },
  { weak: /\bthings\b/gi, strong: "factors" },
  { weak: /\bstuff\b/gi, strong: "elements" },
  { weak: /\bshow\b/gi, strong: "demonstrate" },
  { weak: /\bhelp a lot\b/gi, strong: "make a decisive difference" },
];

export const countWords = (text: string) =>
  text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;

export interface FillerHit { label: string; count: number }

export function countFillers(text: string): { total: number; hits: FillerHit[] } {
  const hits = FILLER_PATTERNS.map((f) => ({
    label: f.label,
    count: (text.match(f.regex) || []).length,
  })).filter((h) => h.count > 0);
  return { total: hits.reduce((s, h) => s + h.count, 0), hits };
}

export function findSignposts(text: string): string[] {
  const lower = ` ${text.toLowerCase()} `;
  const found = SIGNPOST_PHRASES.filter((p) => lower.includes(` ${p} `) || lower.includes(` ${p},`));
  // Prefer the longest match when phrases overlap (e.g. "first" vs "first of all").
  return found.filter((p) => !found.some((q) => q !== p && q.includes(p)));
}

export function findAdvancedVocab(text: string): string[] {
  const lower = text.toLowerCase();
  return ADVANCED_VOCAB.filter((w) => new RegExp(`\\b${w}\\b`, "i").test(lower));
}

export function paceLabel(wpm: number): { tone: "slow" | "good" | "fast"; text: string } {
  if (wpm < 100) return { tone: "slow", text: "Too slow - add energy" };
  if (wpm > 160) return { tone: "fast", text: "Too fast - breathe" };
  return { tone: "good", text: "Great pace" };
}

export interface StudioReport {
  overall: number;
  axes: { axis: string; score: number }[];
  wpm: number;
  durationSec: number;
  words: number;
  fillers: { total: number; hits: FillerHit[] };
  signposts: string[];
  advanced: string[];
  eyeContact: number;
  strengths: string[];
  fixes: string[];
  qaQuestions: string[];
  aiSourced?: boolean;
}

interface AnalyzeInput {
  transcript: string;
  durationSec: number;
  eyeContact: number;
  targetWpm: number;
  targetDurationSec: number;
  scenario: PresentationScenario;
  mode: StudioMode;
}

const clamp = (n: number, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, Math.round(n)));

/** Deterministic local scoring, used alone offline and as the base for AI coaching. */
export function analyzeSession(input: AnalyzeInput): StudioReport {
  const { transcript, durationSec, eyeContact, targetWpm, targetDurationSec, scenario, mode } = input;
  const words = countWords(transcript);
  const minutes = Math.max(durationSec / 60, 1 / 60);
  const wpm = Math.round(words / minutes);
  const fillers = countFillers(transcript);
  const signposts = findSignposts(transcript);
  const advanced = findAdvancedVocab(transcript);

  const fillerRate = words > 0 ? (fillers.total / words) * 100 : 0;
  const sentences = transcript.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean);
  const avgSentence = sentences.length ? words / sentences.length : words;

  const pacing = clamp(100 - Math.min(60, (Math.abs(wpm - targetWpm) / targetWpm) * 130));
  const fluency = clamp(100 - fillerRate * 9 - (avgSentence > 34 ? 12 : 0));
  const clarity = clamp(64 + Math.min(20, sentences.length * 2) - (avgSentence > 30 ? 14 : 0) - fillerRate * 3);
  const signposting = clamp(28 + signposts.length * 13);
  const persuasive = clamp(
    42 + advanced.length * 7 + Math.min(18, signposts.length * 4) +
      (/\d/.test(transcript) ? 12 : 0) - fillerRate * 2,
  );

  const durationFit = clamp(100 - (Math.abs(durationSec - targetDurationSec) / Math.max(targetDurationSec, 1)) * 90);
  const axes = [
    { axis: "Clarity", score: clarity },
    { axis: "Fluency", score: fluency },
    { axis: "Persuasiveness", score: persuasive },
    { axis: "Pacing", score: pacing },
    { axis: "Signposting", score: signposting },
  ];
  const overall = clamp(
    axes.reduce((s, a) => s + a.score, 0) / axes.length * 0.82 +
      durationFit * 0.1 + eyeContact * 0.08,
  );

  const strengths: string[] = [];
  if (signposts.length >= 3)
    strengths.push(`Clear structure - you signposted ${signposts.length} times ("${signposts.slice(0, 3).join('", "')}").`);
  if (fillerRate < 2)
    strengths.push("Very few filler words, so your ideas landed without noise.");
  if (wpm >= 110 && wpm <= 155)
    strengths.push(`Confident delivery pace at ${wpm} WPM - inside the ideal 120-150 band.`);
  if (advanced.length >= 2)
    strengths.push(`Strong register: you used ${advanced.slice(0, 3).join(", ")}.`);
  if (eyeContact >= 65)
    strengths.push(`You held the camera line ${eyeContact}% of the time, which reads as authority.`);
  if (/\d/.test(transcript)) strengths.push("You supported claims with concrete numbers, not vague praise.");
  if (durationSec >= targetDurationSec * 0.8)
    strengths.push("You sustained the full turn without trailing off early.");

  const fixes: string[] = [];
  if (fillers.total > 2)
    fixes.push(`Cut fillers: ${fillers.hits.map((h) => `"${h.label}" x${h.count}`).join(", ")}. Replace each one with a silent half-second pause.`);
  if (wpm > 160) fixes.push(`Slow from ${wpm} to about ${targetWpm} WPM - pause fully at every full stop.`);
  if (wpm < 100 && words > 20)
    fixes.push(`Lift the pace from ${wpm} to about ${targetWpm} WPM; group words into phrases instead of word-by-word delivery.`);
  if (signposts.length < 3)
    fixes.push('Add explicit signposts: "To begin with...", "Moving on to...", "To summarise...".');
  const upgrade = WEAK_UPGRADES.find((u) => u.weak.test(transcript));
  if (upgrade)
    fixes.push(`Upgrade weak wording - replace "${(transcript.match(upgrade.weak) || [""])[0]}" with "${upgrade.strong}".`);
  if (eyeContact < 55)
    fixes.push(`Eye contact was ${eyeContact}%. Look at the lens, not the script, for the first and last sentence of every point.`);
  if (durationSec < targetDurationSec * 0.6)
    fixes.push(`You spoke ${Math.round(durationSec)}s of a ${Math.round(targetDurationSec)}s target - add one example per point.`);
  if (mode === "impromptu" && sentences.length < 4)
    fixes.push("In Q&A defence mode, answer in three moves: position, reason, example.");

  return {
    overall,
    axes,
    wpm,
    durationSec: Math.round(durationSec),
    words,
    fillers,
    signposts,
    advanced,
    eyeContact,
    strengths: strengths.slice(0, 3),
    fixes: fixes.slice(0, 2),
    qaQuestions: scenario.qaSeeds.slice(0, 2),
  };
}

export type TokenKind = "filler" | "signpost" | "advanced" | "plain";

export interface TranscriptToken { text: string; kind: TokenKind }

/** Colour-coded transcript tokens for the report viewer. */
export function tokenizeTranscript(transcript: string): TranscriptToken[] {
  const signposts = SIGNPOST_PHRASES.slice().sort((a, b) => b.length - a.length);
  const words = transcript.split(/(\s+)/);
  const tokens: TranscriptToken[] = [];
  let i = 0;
  while (i < words.length) {
    const chunk = words[i];
    if (/^\s+$/.test(chunk)) { tokens.push({ text: chunk, kind: "plain" }); i += 1; continue; }
    // Try multi-word signpost match starting here.
    const ahead = words.slice(i, i + 8).join("").toLowerCase();
    const phrase = signposts.find((p) => ahead.startsWith(p));
    if (phrase) {
      let consumed = "";
      let j = i;
      while (j < words.length && consumed.replace(/\s+$/, "").length < phrase.length) {
        consumed += words[j];
        j += 1;
      }
      tokens.push({ text: consumed, kind: "signpost" });
      i = j;
      continue;
    }
    const bare = chunk.replace(/[^A-Za-z'-]/g, "").toLowerCase();
    const isFiller = FILLER_PATTERNS.some((f) => new RegExp(`^(?:${f.regex.source.replace(/\\b|\(\?!.*?\)/g, "").replace(/[()]/g, "")})$`, "i").test(bare));
    const kind: TokenKind = isFiller
      ? "filler"
      : ADVANCED_VOCAB.includes(bare)
        ? "advanced"
        : "plain";
    tokens.push({ text: chunk, kind });
    i += 1;
  }
  return tokens;
}

/** Highlight content (stress) words in the teleprompter. */
const FUNCTION_WORDS = new Set([
  "a", "an", "the", "and", "or", "but", "so", "if", "of", "to", "in", "on", "at", "for",
  "with", "from", "by", "as", "is", "are", "was", "were", "be", "been", "am", "do", "does",
  "did", "have", "has", "had", "will", "would", "can", "could", "may", "might", "shall",
  "should", "must", "that", "this", "these", "those", "it", "its", "we", "you", "i", "he",
  "she", "they", "them", "our", "your", "my", "his", "her", "their", "there", "here", "not",
  "no", "yes", "than", "then", "up", "out", "about", "into", "over", "also", "very", "just",
]);

export const isStressWord = (word: string) => {
  const bare = word.replace(/[^A-Za-z'-]/g, "").toLowerCase();
  return bare.length > 2 && !FUNCTION_WORDS.has(bare);
};

/** Delivery-structure checklist evaluated live against the running transcript. */
export const STRUCTURE_STEPS: {
  id: string; label: string; labelVi: string; test: RegExp;
}[] = [
  {
    id: "hook", label: "Opening hook", labelVi: "Mở đầu thu hút",
    test: /\b(good (morning|afternoon|evening)|imagine|let me (start|tell)|before we start|thank you for (being|joining|your time)|i want to tell you|here is the short version)\b/i,
  },
  {
    id: "roadmap", label: "Roadmap / preview", labelVi: "Giới thiệu bố cục",
    test: /\b(i will cover|here is the agenda|three things|i want to make (two|three)|first(ly)?|to begin with|let me start with)\b/i,
  },
  {
    id: "evidence", label: "Evidence or example", labelVi: "Dẫn chứng, ví dụ",
    test: /\b(for example|for instance|the data|our numbers|percent|the result|research|studies|we measured|the finding)\b/i,
  },
  {
    id: "contrast", label: "Counter-point handled", labelVi: "Xử lý ý phản biện",
    test: /\b(however|on the other hand|having said that|in contrast|critics|the trade-?offs?|limitation)\b/i,
  },
  {
    id: "close", label: "Clear close", labelVi: "Kết bài rõ ràng",
    test: /\b(to (summarise|summarize|conclude|wrap up)|in (summary|conclusion)|so overall|thank you|my ask is|the next step)\b/i,
  },
];

export const evaluateStructure = (transcript: string) =>
  STRUCTURE_STEPS.map((s) => ({ ...s, done: s.test.test(transcript) }));
