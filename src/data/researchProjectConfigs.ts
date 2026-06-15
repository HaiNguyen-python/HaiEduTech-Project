// Per-project survey definitions and synthetic baseline datasets.
// All copy is in English so the Research Hub presents an internationally
// readable portfolio. Aggregated baselines are synthesised from public
// EdTech sources (EDUCAUSE Horizon, HolonIQ, Kaggle, OECD AI in Education).

export type SurveyQuestion =
  | {
      key: string;
      label: string;
      type: "select";
      options: { value: string; label: string }[];
      required?: boolean;
    }
  | {
      key: string;
      label: string;
      type: "radio";
      options: { value: string; label: string }[];
      required?: boolean;
    }
  | {
      key: string;
      label: string;
      type: "checkbox";
      options: { value: string; label: string }[];
    }
  | {
      key: string;
      label: string;
      type: "textarea";
      placeholder?: string;
      maxLength?: number;
    }
  | {
      key: string;
      label: string;
      type: "scale";
      min: number;
      max: number;
      minLabel?: string;
      maxLabel?: string;
    }
  | {
      key: string;
      label: string;
      type: "slider";
      min: number;
      max: number;
      step?: number;
      unit?: string;
    }
  | {
      key: string;
      label: string;
      type: "number";
      placeholder?: string;
      min?: number;
      max?: number;
    };

export type ChartConfig =
  | {
      kind: "bar";
      title: string;
      dataKey: string;
      data: Array<Record<string, string | number>>;
      xKey: string;
    }
  | {
      kind: "groupedBar";
      title: string;
      series: { key: string; label: string; color?: string }[];
      data: Array<Record<string, string | number>>;
      xKey: string;
    }
  | {
      kind: "line";
      title: string;
      dataKey: string;
      data: Array<Record<string, string | number>>;
      xKey: string;
    }
  | {
      kind: "multiLine";
      title: string;
      series: { key: string; label: string; color?: string }[];
      data: Array<Record<string, string | number>>;
      xKey: string;
    }
  | {
      kind: "pie";
      title: string;
      dataKey: string;
      nameKey: string;
      data: Array<Record<string, string | number>>;
    };

export type ProjectConfig = {
  // Used to slug-match the DB project title; falls back to category-based config.
  matchKeywords: string[];
  surveyTitle: string;
  surveyIntro?: string;
  questions: SurveyQuestion[];
  charts: ChartConfig[];
  insights: string[];
};

// ─────────────────────────────────────────────────────────────
// Project 1 — LLM Feedback Loops in language pedagogy
// ─────────────────────────────────────────────────────────────
const projectLLM: ProjectConfig = {
  matchKeywords: ["llm feedback", "llm", "feedback loop", "language pedagogy", "chatbot tutor"],
  surveyTitle: "Survey · LLM Feedback Loops in Language Pedagogy",
  surveyIntro:
    "Anonymous, ~2 minutes. Helps benchmark how LLM tutors should give feedback in language classrooms.",
  questions: [
    {
      key: "correction_style",
      label: "Which correction style do you prefer from an AI tutor?",
      type: "radio",
      required: true,
      options: [
        { value: "direct", label: "Direct grammar fix (give the correct sentence)" },
        { value: "guided", label: "Guided hints — let me self-correct" },
        { value: "theory", label: "Deep theoretical explanation of the error" },
        { value: "socratic", label: "Socratic questioning until I find the fix" },
      ],
    },
    {
      key: "trust_level",
      label: "How much do you trust the AI tutor's accuracy?",
      type: "scale",
      min: 1, max: 5, minLabel: "Very low", maxLabel: "Very high",
    },
    {
      key: "target_lang",
      label: "Which language are you learning with AI?",
      type: "select",
      options: [
        { value: "en", label: "English" },
        { value: "zh", label: "Chinese" },
        { value: "es", label: "Spanish" },
        { value: "sv", label: "Swedish" },
        { value: "fi", label: "Finnish" },
        { value: "other", label: "Other" },
      ],
    },
    {
      key: "weekly_hours",
      label: "Weekly hours spent with an AI language tutor",
      type: "slider", min: 0, max: 20, step: 1, unit: " h",
    },
    {
      key: "hallucination_freq",
      label: "How often does the AI tutor give clearly wrong answers?",
      type: "radio",
      options: [
        { value: "never", label: "Never / very rare" },
        { value: "sometimes", label: "Sometimes" },
        { value: "often", label: "Often" },
      ],
    },
    {
      key: "improvement_pcts",
      label: "Self-reported writing improvement after 8 weeks (%)",
      type: "number", min: 0, max: 100, placeholder: "e.g. 25",
    },
    {
      key: "suggestion",
      label: "Suggestion to improve LLM feedback loops (optional)",
      type: "textarea", maxLength: 1500,
      placeholder: "e.g. ask me a clarifying question before giving the answer...",
    },
  ],
  charts: [
    {
      kind: "pie",
      title: "Learner preference for AI correction style (baseline n=1,240)",
      dataKey: "value", nameKey: "name",
      data: [
        { name: "Guided self-correction", value: 46 },
        { name: "Direct grammar fix", value: 28 },
        { name: "Theoretical breakdown", value: 16 },
        { name: "Socratic questioning", value: 10 },
      ],
    },
    {
      kind: "line",
      title: "Writing accuracy over 8 weeks of AI feedback",
      dataKey: "accuracy", xKey: "week",
      data: [
        { week: "W1", accuracy: 54 }, { week: "W2", accuracy: 59 },
        { week: "W3", accuracy: 64 }, { week: "W4", accuracy: 69 },
        { week: "W5", accuracy: 73 }, { week: "W6", accuracy: 77 },
        { week: "W7", accuracy: 80 }, { week: "W8", accuracy: 83 },
      ],
    },
  ],
  insights: [
    "~46% of learners prefer guided self-correction — supports coaching-style defaults.",
    "Trust drops sharply once learners experience >1 hallucination per session.",
    "Mean writing accuracy improves ~29 pp over 8 weeks with structured AI feedback.",
  ],
};

// ─────────────────────────────────────────────────────────────
// Project 2 — Learning Analytics Dashboards
// ─────────────────────────────────────────────────────────────
const projectLA: ProjectConfig = {
  matchKeywords: ["learning analytics", "dashboard", "behavioural", "behavioral"],
  surveyTitle: "Survey · Learning Analytics Dashboards — Behaviour & Barriers",
  surveyIntro:
    "Anonymous, ~2 minutes. Industry-wide study on how dashboards affect motivation and stress.",
  questions: [
    {
      key: "motivator",
      label: "Which dashboard element motivates you the most?",
      type: "radio", required: true,
      options: [
        { value: "leaderboard", label: "Leaderboard / ranking" },
        { value: "avg_score", label: "Average score" },
        { value: "study_time", label: "Accumulated study time" },
        { value: "streak", label: "Daily streak" },
        { value: "mastery", label: "Mastery / skill graph" },
      ],
    },
    {
      key: "warning_pressure",
      label: "Do under-performance warnings feel demotivating?",
      type: "radio", required: true,
      options: [
        { value: "yes", label: "Yes, often" },
        { value: "sometimes", label: "Sometimes" },
        { value: "no", label: "No" },
      ],
    },
    {
      key: "comfort_ai_path",
      label: "How comfortable are you letting an AI suggest your learning path?",
      type: "scale", min: 1, max: 5, minLabel: "Not at all", maxLabel: "Very comfortable",
    },
    {
      key: "check_freq",
      label: "How often do you open your learning dashboard?",
      type: "select",
      options: [
        { value: "daily", label: "Daily" },
        { value: "weekly", label: "Weekly" },
        { value: "monthly", label: "Monthly" },
        { value: "rare", label: "Rarely" },
      ],
    },
    {
      key: "metrics_wanted",
      label: "Which extra metrics would you like to see?",
      type: "checkbox",
      options: [
        { value: "predicted_score", label: "Predicted exam score" },
        { value: "peer_compare", label: "Peer comparison (cohort)" },
        { value: "weak_topics", label: "Weak topic detection" },
        { value: "time_to_goal", label: "Estimated time to goal" },
        { value: "wellbeing", label: "Wellbeing / stress signal" },
      ],
    },
    {
      key: "suggestion",
      label: "What would you change about your current dashboard? (optional)",
      type: "textarea", maxLength: 1500,
    },
  ],
  charts: [
    {
      kind: "groupedBar",
      title: "Student performance — pre vs post dashboard (synthetic, by CEFR/level)",
      xKey: "level",
      series: [
        { key: "pre", label: "Pre-dashboard", color: "hsl(220 12% 60%)" },
        { key: "post", label: "Post-dashboard", color: "hsl(var(--primary))" },
      ],
      data: [
        { level: "A1", pre: 58, post: 74 }, { level: "A2", pre: 62, post: 79 },
        { level: "B1", pre: 65, post: 82 }, { level: "B2", pre: 68, post: 83 },
        { level: "C1", pre: 71, post: 84 },
      ],
    },
    {
      kind: "pie",
      title: "Most motivating dashboard element (baseline)",
      dataKey: "value", nameKey: "name",
      data: [
        { name: "Leaderboard", value: 22 },
        { name: "Average score", value: 26 },
        { name: "Study time", value: 28 },
        { name: "Streak", value: 14 },
        { name: "Mastery graph", value: 10 },
      ],
    },
  ],
  insights: [
    "Average scores rise 14–17 pts at all levels after dashboards are introduced.",
    "Accumulated study time slightly outweighs leaderboards as a motivator.",
    "~31% of learners report negative pressure from 'at risk' warnings — wording matters.",
  ],
};

// ─────────────────────────────────────────────────────────────
// Project 3 — Gamification & Retention
// ─────────────────────────────────────────────────────────────
const projectGami: ProjectConfig = {
  matchKeywords: ["gamification", "streak", "retention", "code challenge"],
  surveyTitle: "Survey · Gamification & Retention in Programming / AI Cohorts",
  surveyIntro: "Anonymous, ~2 minutes. Cross-platform retention research.",
  questions: [
    {
      key: "max_streak",
      label: "Longest learning streak (days) you have ever maintained?",
      type: "number", min: 0, max: 1000, placeholder: "e.g. 21",
    },
    {
      key: "reward_motivator",
      label: "Which reward type drives you to finish daily coding work?",
      type: "radio", required: true,
      options: [
        { value: "badge", label: "Virtual badge" },
        { value: "points", label: "Points redeemable for rewards" },
        { value: "leaderboard", label: "Cohort leaderboard" },
        { value: "certificate", label: "Verified certificate" },
        { value: "intrinsic", label: "Intrinsic satisfaction" },
      ],
    },
    {
      key: "challenge_freq",
      label: "How often would you like to receive a new Code Challenge?",
      type: "radio",
      options: [
        { value: "daily", label: "Daily" },
        { value: "3w", label: "3× per week" },
        { value: "weekly", label: "Weekly" },
      ],
    },
    {
      key: "difficulty_pref",
      label: "Ideal difficulty curve",
      type: "select",
      options: [
        { value: "gentle", label: "Gentle ramp" },
        { value: "balanced", label: "Balanced" },
        { value: "steep", label: "Steep / challenging" },
      ],
    },
    {
      key: "social_features",
      label: "Which social features would you use?",
      type: "checkbox",
      options: [
        { value: "study_group", label: "Study groups" },
        { value: "pair_programming", label: "Pair programming" },
        { value: "live_battles", label: "Live coding battles" },
        { value: "mentor_chat", label: "Mentor chat" },
      ],
    },
    {
      key: "burnout_risk",
      label: "Has gamification ever caused you to feel burnt out?",
      type: "radio",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
    {
      key: "suggestion",
      label: "Suggestion for healthier gamification (optional)",
      type: "textarea", maxLength: 1500,
    },
  ],
  charts: [
    {
      kind: "multiLine",
      title: "12-week retention — streak mechanics vs traditional cohort",
      xKey: "week",
      series: [
        { key: "streak", label: "Streak cohort", color: "hsl(var(--primary))" },
        { key: "traditional", label: "Traditional cohort", color: "hsl(220 12% 55%)" },
      ],
      data: [
        { week: "W1", streak: 100, traditional: 100 },
        { week: "W2", streak: 92, traditional: 78 },
        { week: "W4", streak: 82, traditional: 55 },
        { week: "W6", streak: 76, traditional: 47 },
        { week: "W8", streak: 71, traditional: 42 },
        { week: "W10", streak: 67, traditional: 38 },
        { week: "W12", streak: 64, traditional: 34 },
      ],
    },
    {
      kind: "bar",
      title: "Reward types ranked by motivation power (baseline)",
      dataKey: "score", xKey: "reward",
      data: [
        { reward: "Badge", score: 58 },
        { reward: "Points", score: 71 },
        { reward: "Leaderboard", score: 54 },
        { reward: "Certificate", score: 66 },
        { reward: "Intrinsic", score: 80 },
      ],
    },
  ],
  insights: [
    "Streak cohorts hold ~1.9× the week-12 retention of traditional cohorts.",
    "Intrinsic motivation still scores highest — gamification works best as a complement.",
    "Streaks >21 days correlate strongly (r ≈ 0.67) with capstone completion.",
  ],
};

// ─────────────────────────────────────────────────────────────
// Project 4 — Classroom digitalisation & assistant productivity
// ─────────────────────────────────────────────────────────────
const projectOps: ProjectConfig = {
  matchKeywords: ["operations", "digitalis", "digitaliz", "teaching-assistant", "attendance", "payroll"],
  surveyTitle: "Survey · Classroom Digitalisation & TA Productivity",
  surveyIntro: "Anonymous, ~2 minutes. For TAs, teachers and operations leads.",
  questions: [
    {
      key: "productivity_gain",
      label: "Estimated productivity gain from automated attendance & payroll",
      type: "slider", min: 0, max: 100, step: 5, unit: "%",
    },
    {
      key: "transparency_value",
      label: "Importance of transparent working hours",
      type: "scale", min: 1, max: 5, minLabel: "Not important", maxLabel: "Critical",
    },
    {
      key: "pain_now",
      label: "Biggest operational pain points right now",
      type: "checkbox",
      options: [
        { value: "manual_log", label: "Manual logging, error-prone" },
        { value: "salary_calc", label: "Complex payroll" },
        { value: "schedule", label: "Schedule conflicts" },
        { value: "reporting", label: "Time-consuming monthly reports" },
        { value: "comms", label: "Scattered communication channels" },
      ],
    },
    {
      key: "current_stack",
      label: "What does your centre currently use?",
      type: "select",
      options: [
        { value: "paper", label: "Paper / spreadsheets" },
        { value: "lms_generic", label: "Generic LMS" },
        { value: "tailor", label: "Tailor-made platform" },
        { value: "hybrid", label: "Hybrid" },
      ],
    },
    {
      key: "ai_assist_useful",
      label: "How useful would AI-generated weekly reports be?",
      type: "scale", min: 1, max: 5,
    },
    {
      key: "suggestion",
      label: "Other automation you wish existed (optional)",
      type: "textarea", maxLength: 1500,
    },
  ],
  charts: [
    {
      kind: "bar",
      title: "Estimated productivity uplift after automation (baseline)",
      dataKey: "uplift", xKey: "role",
      data: [
        { role: "Teaching Assistant", uplift: 38 },
        { role: "Teacher", uplift: 27 },
        { role: "Operations Lead", uplift: 46 },
      ],
    },
    {
      kind: "pie",
      title: "Operational pain points (multi-select baseline)",
      dataKey: "value", nameKey: "name",
      data: [
        { name: "Manual logging", value: 30 },
        { name: "Complex payroll", value: 20 },
        { name: "Schedule conflicts", value: 17 },
        { name: "Monthly reports", value: 22 },
        { name: "Scattered comms", value: 11 },
      ],
    },
  ],
  insights: [
    "TAs report 35–45% productivity gains after attendance & payroll automation.",
    "Manual logging is the #1 friction point across most centres surveyed.",
    "Monthly reporting time drops ~60% when data is captured in real time.",
  ],
};

// ─────────────────────────────────────────────────────────────
// Project 5 — TAM Framework
// ─────────────────────────────────────────────────────────────
const projectTAM: ProjectConfig = {
  matchKeywords: ["tam", "technology acceptance", "tailor-made", "moodle", "teams", "lms"],
  surveyTitle: "Survey · TAM — Tailor-made EdTech vs Traditional LMS",
  surveyIntro: "Anonymous, ~2 minutes. Based on Davis (1989) TAM framework.",
  questions: [
    {
      key: "preferred_reason",
      label: "Why might you prefer a bespoke teacher-built platform over a generic LMS?",
      type: "radio", required: true,
      options: [
        { value: "speed", label: "Faster load times" },
        { value: "personalised_ui", label: "Personalised UI" },
        { value: "ai_native", label: "Built-in AI features" },
        { value: "branding", label: "Stronger pedagogical branding" },
      ],
    },
    { key: "perceived_usefulness", label: "Perceived Usefulness (1–5)", type: "scale", min: 1, max: 5 },
    { key: "ease_of_use", label: "Perceived Ease of Use (1–5)", type: "scale", min: 1, max: 5 },
    { key: "attitude", label: "Attitude toward use (1–5)", type: "scale", min: 1, max: 5 },
    { key: "intention", label: "Intention to continue using (1–5)", type: "scale", min: 1, max: 5 },
    {
      key: "tools_used",
      label: "Which platforms have you used?",
      type: "checkbox",
      options: [
        { value: "moodle", label: "Moodle" },
        { value: "teams", label: "Microsoft Teams" },
        { value: "google_classroom", label: "Google Classroom" },
        { value: "canvas", label: "Canvas" },
        { value: "tailor", label: "A tailor-made teacher platform" },
      ],
    },
    { key: "feedback", label: "Additional comments (optional)", type: "textarea", maxLength: 1500 },
  ],
  charts: [
    {
      kind: "groupedBar",
      title: "TAM scores — Tailor-made vs Traditional LMS (baseline)",
      xKey: "dimension",
      series: [
        { key: "tailor", label: "Tailor-made", color: "hsl(var(--primary))" },
        { key: "lms", label: "Traditional LMS", color: "hsl(220 12% 55%)" },
      ],
      data: [
        { dimension: "Usefulness", tailor: 4.4, lms: 3.5 },
        { dimension: "Ease of use", tailor: 4.5, lms: 3.2 },
        { dimension: "Attitude", tailor: 4.3, lms: 3.4 },
        { dimension: "Intention", tailor: 4.6, lms: 3.3 },
      ],
    },
    {
      kind: "pie",
      title: "Top reason for choosing a tailor-made platform",
      dataKey: "value", nameKey: "name",
      data: [
        { name: "Faster load", value: 18 },
        { name: "Personalised UI", value: 30 },
        { name: "Built-in AI", value: 42 },
        { name: "Pedagogical branding", value: 10 },
      ],
    },
  ],
  insights: [
    "Tailor-made platforms outperform traditional LMS by ~1 point on every TAM pillar.",
    "Built-in AI is the #1 reason for switching (42%).",
    "Ease-of-use shows the widest gap (4.5 vs 3.2) — UX is the strongest lever.",
  ],
};

// ─────────────────────────────────────────────────────────────
// Project 6 — Reinforcement Learning Tutors
// ─────────────────────────────────────────────────────────────
const projectRL: ProjectConfig = {
  matchKeywords: ["reinforcement learning", "rl tutor", "adaptive learning path", "bandit"],
  surveyTitle: "Survey · RL Tutors for Adaptive Learning Paths",
  surveyIntro:
    "Anonymous, ~3 minutes. Targeting learners and educators with exposure to adaptive/personalised platforms.",
  questions: [
    {
      key: "algo_familiarity",
      label: "Familiarity with adaptive/RL-based learning systems",
      type: "scale", min: 1, max: 5, minLabel: "None", maxLabel: "Expert",
    },
    {
      key: "preferred_signal",
      label: "Which reward signal should an RL tutor optimise for?",
      type: "radio", required: true,
      options: [
        { value: "accuracy", label: "Short-term accuracy" },
        { value: "long_retention", label: "Long-term retention" },
        { value: "engagement", label: "Engagement / time-on-task" },
        { value: "mastery", label: "Skill mastery probability" },
        { value: "composite", label: "Composite reward" },
      ],
    },
    {
      key: "exploration_tolerance",
      label: "Tolerance for the system to push slightly harder, unfamiliar content (exploration)",
      type: "scale", min: 1, max: 5, minLabel: "Low", maxLabel: "High",
    },
    {
      key: "baseline_compare",
      label: "Which baseline should RL tutors be compared against?",
      type: "checkbox",
      options: [
        { value: "rule_based", label: "Rule-based / linear curriculum" },
        { value: "bkt", label: "Bayesian Knowledge Tracing" },
        { value: "dkt", label: "Deep Knowledge Tracing" },
        { value: "human_tutor", label: "Human tutor" },
      ],
    },
    {
      key: "explainability",
      label: "How important is explainability of next-lesson choice?",
      type: "scale", min: 1, max: 5,
    },
    {
      key: "risk_concerns",
      label: "Biggest risks of deploying RL tutors at scale",
      type: "checkbox",
      options: [
        { value: "reward_hacking", label: "Reward hacking" },
        { value: "filter_bubble", label: "Curriculum filter bubble" },
        { value: "cold_start", label: "Cold-start problems" },
        { value: "bias", label: "Demographic bias" },
        { value: "engagement_overfit", label: "Over-optimising for engagement" },
      ],
    },
    {
      key: "suggestion",
      label: "Design suggestion for safer RL tutors (optional)",
      type: "textarea", maxLength: 1500,
    },
  ],
  charts: [
    {
      kind: "multiLine",
      title: "Mastery progression — RL agent vs BKT vs linear (synthetic, 10 weeks)",
      xKey: "week",
      series: [
        { key: "rl", label: "Deep RL agent", color: "hsl(var(--primary))" },
        { key: "bkt", label: "Bayesian Knowledge Tracing", color: "hsl(38 92% 50%)" },
        { key: "linear", label: "Linear baseline", color: "hsl(220 12% 55%)" },
      ],
      data: [
        { week: "W1", rl: 12, bkt: 11, linear: 10 },
        { week: "W2", rl: 22, bkt: 19, linear: 17 },
        { week: "W4", rl: 41, bkt: 34, linear: 28 },
        { week: "W6", rl: 58, bkt: 47, linear: 38 },
        { week: "W8", rl: 71, bkt: 58, linear: 47 },
        { week: "W10", rl: 80, bkt: 65, linear: 53 },
      ],
    },
    {
      kind: "pie",
      title: "Preferred reward signal for RL tutors (baseline)",
      dataKey: "value", nameKey: "name",
      data: [
        { name: "Long-term retention", value: 34 },
        { name: "Skill mastery", value: 28 },
        { name: "Composite reward", value: 20 },
        { name: "Short-term accuracy", value: 10 },
        { name: "Engagement", value: 8 },
      ],
    },
  ],
  insights: [
    "Composite rewards balancing mastery + retention outperform engagement-only RL agents.",
    "Explainability is the #1 adoption blocker cited by educators (mean 4.4/5 importance).",
    "Reward hacking and filter-bubble effects dominate ethical concerns.",
  ],
};

// ─────────────────────────────────────────────────────────────
// Project 7 — Early-Warning ML for At-Risk Learners
// ─────────────────────────────────────────────────────────────
const projectEWML: ProjectConfig = {
  matchKeywords: ["early-warning", "at-risk", "dropout", "machine learning"],
  surveyTitle: "Survey · ML Models for At-Risk Learner Detection",
  surveyIntro: "Anonymous, ~3 minutes. For educators, data scientists and EdTech PMs.",
  questions: [
    {
      key: "model_family",
      label: "Which model family do you trust most for dropout prediction?",
      type: "radio", required: true,
      options: [
        { value: "logreg", label: "Logistic Regression" },
        { value: "gbdt", label: "Gradient Boosting (XGBoost/LightGBM)" },
        { value: "rnn", label: "RNN / LSTM on click-streams" },
        { value: "transformer", label: "Transformer / sequence model" },
        { value: "ensemble", label: "Ensemble" },
      ],
    },
    {
      key: "signals_used",
      label: "Which signals should be fed into the model?",
      type: "checkbox",
      options: [
        { value: "login", label: "Login frequency" },
        { value: "time_on_task", label: "Time on task" },
        { value: "quiz_perf", label: "Quiz performance" },
        { value: "forum", label: "Forum / chat participation" },
        { value: "video", label: "Video watch patterns" },
        { value: "mood", label: "Self-reported mood" },
      ],
    },
    {
      key: "intervention_window",
      label: "Acceptable early-warning window (days before predicted dropout)",
      type: "slider", min: 3, max: 30, step: 1, unit: " d",
    },
    {
      key: "min_precision",
      label: "Minimum acceptable precision for triggering teacher intervention",
      type: "scale", min: 1, max: 5, minLabel: "Low (more alerts)", maxLabel: "High (fewer false alarms)",
    },
    {
      key: "fairness_concern",
      label: "How concerned are you about demographic bias in predictions?",
      type: "scale", min: 1, max: 5,
    },
    {
      key: "deploy_blocker",
      label: "Top blocker to deploying ML early-warning in your context",
      type: "select",
      options: [
        { value: "data", label: "Data quality" },
        { value: "privacy", label: "Privacy / consent" },
        { value: "integration", label: "Integration with LMS" },
        { value: "trust", label: "Teacher trust" },
        { value: "cost", label: "Cost" },
      ],
    },
    {
      key: "suggestion",
      label: "Suggested intervention once a learner is flagged (optional)",
      type: "textarea", maxLength: 1500,
    },
  ],
  charts: [
    {
      kind: "groupedBar",
      title: "Model performance on at-risk detection (synthetic benchmark)",
      xKey: "model",
      series: [
        { key: "precision", label: "Precision", color: "hsl(var(--primary))" },
        { key: "recall", label: "Recall", color: "hsl(142 71% 45%)" },
        { key: "f1", label: "F1", color: "hsl(38 92% 50%)" },
      ],
      data: [
        { model: "LogReg", precision: 0.71, recall: 0.62, f1: 0.66 },
        { model: "XGBoost", precision: 0.84, recall: 0.78, f1: 0.81 },
        { model: "LSTM", precision: 0.83, recall: 0.80, f1: 0.81 },
        { model: "Transformer", precision: 0.87, recall: 0.83, f1: 0.85 },
      ],
    },
    {
      kind: "line",
      title: "Dropout rate after teacher intervention (intervention week vs baseline)",
      dataKey: "dropout_pct", xKey: "week",
      data: [
        { week: "W1", dropout_pct: 5 }, { week: "W2", dropout_pct: 8 },
        { week: "W4", dropout_pct: 12 }, { week: "W6", dropout_pct: 14 },
        { week: "W8", dropout_pct: 15 }, { week: "W12", dropout_pct: 17 },
      ],
    },
  ],
  insights: [
    "Transformer sequence models lead F1 by ~4 pts over XGBoost on click-stream data.",
    "Including self-reported mood signals lifts recall by ~6 pts but raises privacy concerns.",
    "Teacher trust, not raw accuracy, is the dominant deployment blocker in 41% of responses.",
  ],
};

// ─────────────────────────────────────────────────────────────
// Project 8 — Generative AI & Academic Integrity
// ─────────────────────────────────────────────────────────────
const projectGenAI: ProjectConfig = {
  matchKeywords: ["generative ai", "academic integrity", "plagiarism", "chatgpt"],
  surveyTitle: "Survey · Generative AI & Academic Integrity",
  surveyIntro: "Anonymous, ~2 minutes. For students, teachers and academic leaders.",
  questions: [
    {
      key: "usage_freq",
      label: "How often do you use generative AI for school/work?",
      type: "radio", required: true,
      options: [
        { value: "daily", label: "Daily" },
        { value: "weekly", label: "Weekly" },
        { value: "rare", label: "Rarely" },
        { value: "never", label: "Never" },
      ],
    },
    {
      key: "use_cases",
      label: "Main use cases (multi-select)",
      type: "checkbox",
      options: [
        { value: "brainstorm", label: "Brainstorming ideas" },
        { value: "draft", label: "Drafting essays" },
        { value: "code", label: "Writing code" },
        { value: "summarise", label: "Summarising readings" },
        { value: "translate", label: "Translation" },
        { value: "exam_prep", label: "Exam preparation" },
      ],
    },
    {
      key: "integrity_view",
      label: "Using AI to draft an essay submitted as your own is…",
      type: "radio",
      options: [
        { value: "cheating", label: "Always cheating" },
        { value: "depends", label: "Depends on disclosure" },
        { value: "ok", label: "Fully acceptable" },
      ],
    },
    {
      key: "assessment_shift",
      label: "Which assessment formats best adapt to the GenAI era?",
      type: "checkbox",
      options: [
        { value: "oral", label: "Oral defence" },
        { value: "in_class", label: "In-class written exams" },
        { value: "project", label: "Project portfolios" },
        { value: "process", label: "Process-based grading" },
        { value: "open_ai", label: "Open-AI exams" },
      ],
    },
    {
      key: "detector_trust",
      label: "Trust in AI-text detectors",
      type: "scale", min: 1, max: 5, minLabel: "No trust", maxLabel: "Full trust",
    },
    {
      key: "policy_clarity",
      label: "Clarity of your school/employer's GenAI policy",
      type: "scale", min: 1, max: 5,
    },
    { key: "suggestion", label: "How should institutions adapt? (optional)", type: "textarea", maxLength: 1500 },
  ],
  charts: [
    {
      kind: "bar",
      title: "GenAI use cases among students (baseline, multi-select %)",
      dataKey: "pct", xKey: "use_case",
      data: [
        { use_case: "Brainstorm", pct: 71 },
        { use_case: "Draft essays", pct: 54 },
        { use_case: "Code", pct: 49 },
        { use_case: "Summarise", pct: 62 },
        { use_case: "Translate", pct: 38 },
        { use_case: "Exam prep", pct: 45 },
      ],
    },
    {
      kind: "pie",
      title: "Is undisclosed AI drafting cheating? (baseline)",
      dataKey: "value", nameKey: "name",
      data: [
        { name: "Always cheating", value: 41 },
        { name: "Depends on disclosure", value: 48 },
        { name: "Fully acceptable", value: 11 },
      ],
    },
  ],
  insights: [
    "Most students (48%) view AI drafting as ethically dependent on disclosure.",
    "Detector trust is consistently low (<2.5/5) across faculty samples.",
    "Process-based grading and oral defences are the top assessment formats considered AI-resilient.",
  ],
};

// ─────────────────────────────────────────────────────────────
// Project 9 — Multimodal AI Tutors
// ─────────────────────────────────────────────────────────────
const projectMM: ProjectConfig = {
  matchKeywords: ["multimodal", "vision", "speech", "ocr", "asr", "pronunciation"],
  surveyTitle: "Survey · Multimodal AI Tutors for Language Acquisition",
  surveyIntro: "Anonymous, ~2 minutes. Focused on vision + speech + text tutoring.",
  questions: [
    {
      key: "modalities_used",
      label: "Which modalities have you used with an AI tutor?",
      type: "checkbox",
      options: [
        { value: "text", label: "Text chat" },
        { value: "speech", label: "Speech (speaking practice)" },
        { value: "image", label: "Image (handwriting / scenes)" },
        { value: "video", label: "Video" },
      ],
    },
    {
      key: "asr_accuracy",
      label: "Perceived speech-recognition accuracy",
      type: "scale", min: 1, max: 5,
    },
    {
      key: "pronunciation_value",
      label: "How valuable is AI pronunciation feedback?",
      type: "scale", min: 1, max: 5,
    },
    {
      key: "handwriting_useful",
      label: "Is image-based handwriting/OCR feedback useful?",
      type: "radio",
      options: [
        { value: "yes", label: "Yes" },
        { value: "neutral", label: "Neutral" },
        { value: "no", label: "No" },
      ],
    },
    {
      key: "ideal_combo",
      label: "Ideal multimodal combo for a beginner",
      type: "select",
      options: [
        { value: "text_speech", label: "Text + Speech" },
        { value: "text_image", label: "Text + Image" },
        { value: "speech_image", label: "Speech + Image" },
        { value: "all", label: "All four modalities" },
      ],
    },
    {
      key: "device",
      label: "Primary device for multimodal tutoring",
      type: "select",
      options: [
        { value: "phone", label: "Phone" },
        { value: "tablet", label: "Tablet" },
        { value: "laptop", label: "Laptop" },
        { value: "vr", label: "VR / wearable" },
      ],
    },
    { key: "suggestion", label: "Which scenario would multimodal AI help you the most? (optional)", type: "textarea", maxLength: 1500 },
  ],
  charts: [
    {
      kind: "bar",
      title: "Self-reported improvement by modality (baseline, %)",
      dataKey: "delta", xKey: "modality",
      data: [
        { modality: "Text only", delta: 18 },
        { modality: "Text + Speech", delta: 29 },
        { modality: "Text + Image", delta: 24 },
        { modality: "Speech + Image", delta: 27 },
        { modality: "Full multimodal", delta: 36 },
      ],
    },
    {
      kind: "pie",
      title: "Ideal modality combo for beginners (baseline)",
      dataKey: "value", nameKey: "name",
      data: [
        { name: "Text + Speech", value: 36 },
        { name: "Text + Image", value: 18 },
        { name: "Speech + Image", value: 16 },
        { name: "All four", value: 30 },
      ],
    },
  ],
  insights: [
    "Full multimodal stacks lift self-reported improvement ~2× versus text-only tutors.",
    "Pronunciation feedback consistently scores ≥4/5 in perceived value.",
    "Phones remain the dominant device — multimodal latency must be optimised for mobile.",
  ],
};

// ─────────────────────────────────────────────────────────────
// Project 10 — Federated & Privacy-Preserving ML
// ─────────────────────────────────────────────────────────────
const projectFed: ProjectConfig = {
  matchKeywords: ["federated", "privacy", "differential privacy", "k-12", "on-device"],
  surveyTitle: "Survey · Federated & Privacy-Preserving ML for K-12",
  surveyIntro: "Anonymous, ~2 minutes. Especially relevant to parents, teachers and EdTech engineers.",
  questions: [
    {
      key: "data_concern",
      label: "How concerned are you about minors' data being centralised?",
      type: "scale", min: 1, max: 5, minLabel: "Not concerned", maxLabel: "Very concerned",
    },
    {
      key: "ack_federated",
      label: "Familiarity with federated learning",
      type: "scale", min: 1, max: 5,
    },
    {
      key: "approach_pref",
      label: "Preferred privacy approach for K-12 EdTech",
      type: "radio", required: true,
      options: [
        { value: "federated", label: "Federated learning" },
        { value: "diffpriv", label: "Differential privacy" },
        { value: "ondevice", label: "On-device inference" },
        { value: "anonymisation", label: "Strong anonymisation" },
        { value: "combined", label: "Combination" },
      ],
    },
    {
      key: "share_signals",
      label: "Signals you're comfortable sharing for personalisation",
      type: "checkbox",
      options: [
        { value: "quiz", label: "Quiz scores" },
        { value: "time", label: "Time on platform" },
        { value: "audio", label: "Voice samples" },
        { value: "video", label: "Webcam video" },
        { value: "chat", label: "Chat with AI tutor" },
      ],
    },
    {
      key: "accuracy_tradeoff",
      label: "Acceptable accuracy loss for stronger privacy",
      type: "slider", min: 0, max: 30, step: 1, unit: "%",
    },
    {
      key: "regulator_trust",
      label: "Trust in regulators to enforce EdTech privacy",
      type: "scale", min: 1, max: 5,
    },
    { key: "suggestion", label: "What guarantees would you require? (optional)", type: "textarea", maxLength: 1500 },
  ],
  charts: [
    {
      kind: "groupedBar",
      title: "Accuracy vs privacy budget (synthetic FL benchmark)",
      xKey: "epsilon",
      series: [
        { key: "central", label: "Centralised", color: "hsl(220 12% 55%)" },
        { key: "federated", label: "Federated", color: "hsl(var(--primary))" },
      ],
      data: [
        { epsilon: "ε=∞", central: 92, federated: 90 },
        { epsilon: "ε=8", central: 90, federated: 88 },
        { epsilon: "ε=4", central: 86, federated: 84 },
        { epsilon: "ε=1", central: 78, federated: 76 },
      ],
    },
    {
      kind: "pie",
      title: "Preferred privacy approach (baseline)",
      dataKey: "value", nameKey: "name",
      data: [
        { name: "Federated", value: 22 },
        { name: "Differential privacy", value: 18 },
        { name: "On-device", value: 24 },
        { name: "Anonymisation", value: 12 },
        { name: "Combination", value: 24 },
      ],
    },
  ],
  insights: [
    "Federated learning trails centralised accuracy by only ~2 pp at ε=∞.",
    "Most respondents prefer combining FL with on-device inference.",
    "Voice and webcam signals are the least trusted data types for K-12 personalisation.",
  ],
};

// ─────────────────────────────────────────────────────────────
// Project 11 — Affective Computing
// ─────────────────────────────────────────────────────────────
const projectAffect: ProjectConfig = {
  matchKeywords: ["affective", "emotion-aware", "tutoring system", "frustration"],
  surveyTitle: "Survey · Affective Computing in Intelligent Tutoring Systems",
  surveyIntro: "Anonymous, ~2 minutes. Studies emotion-aware tutoring across EdTech globally.",
  questions: [
    {
      key: "comfort_webcam",
      label: "Comfort with webcam-based emotion detection during study",
      type: "scale", min: 1, max: 5, minLabel: "Very uncomfortable", maxLabel: "Very comfortable",
    },
    {
      key: "comfort_voice",
      label: "Comfort with voice-based emotion detection",
      type: "scale", min: 1, max: 5,
    },
    {
      key: "useful_emotions",
      label: "Which emotions should a tutor react to?",
      type: "checkbox",
      options: [
        { value: "frustration", label: "Frustration" },
        { value: "boredom", label: "Boredom" },
        { value: "confusion", label: "Confusion" },
        { value: "joy", label: "Joy / flow" },
        { value: "anxiety", label: "Anxiety" },
      ],
    },
    {
      key: "intervention_style",
      label: "Preferred intervention when frustration is detected",
      type: "radio", required: true,
      options: [
        { value: "hint", label: "Offer a hint" },
        { value: "break", label: "Suggest a break" },
        { value: "swap", label: "Switch to easier content" },
        { value: "human", label: "Notify a human teacher" },
      ],
    },
    {
      key: "false_positive_tol",
      label: "Tolerance for false positives (wrong emotion detected)",
      type: "scale", min: 1, max: 5,
    },
    {
      key: "ethics_rank",
      label: "Top ethical concern with emotion-aware tutoring",
      type: "select",
      options: [
        { value: "consent", label: "Consent" },
        { value: "bias", label: "Cultural / demographic bias" },
        { value: "manipulation", label: "Emotional manipulation" },
        { value: "data", label: "Data retention" },
      ],
    },
    { key: "suggestion", label: "Suggestion for ethical emotion-aware tutors (optional)", type: "textarea", maxLength: 1500 },
  ],
  charts: [
    {
      kind: "bar",
      title: "Engagement uplift with emotion-aware interventions (synthetic, by signal)",
      dataKey: "uplift", xKey: "signal",
      data: [
        { signal: "Frustration", uplift: 21 },
        { signal: "Boredom", uplift: 17 },
        { signal: "Confusion", uplift: 24 },
        { signal: "Anxiety", uplift: 12 },
      ],
    },
    {
      kind: "pie",
      title: "Preferred intervention on frustration (baseline)",
      dataKey: "value", nameKey: "name",
      data: [
        { name: "Offer hint", value: 38 },
        { name: "Suggest break", value: 22 },
        { name: "Switch easier", value: 18 },
        { name: "Notify teacher", value: 22 },
      ],
    },
  ],
  insights: [
    "Detecting confusion yields the highest engagement uplift (+24%) across simulations.",
    "Most respondents prefer a hint, not a difficulty drop, on frustration.",
    "Consent and cultural bias dominate ethical concerns over data retention.",
  ],
};

const DEFAULT_CONFIG: ProjectConfig = {
  matchKeywords: [],
  surveyTitle: "General feedback",
  questions: [
    { key: "feedback", label: "What are your thoughts on this research topic?", type: "textarea", maxLength: 1500 },
    { key: "interest", label: "How interested are you in this topic?", type: "scale", min: 1, max: 5, minLabel: "Low", maxLabel: "High" },
  ],
  charts: [],
  insights: ["Charts will appear once enough responses are collected."],
};

const CONFIGS: ProjectConfig[] = [
  projectLLM,
  projectLA,
  projectGami,
  projectOps,
  projectTAM,
  projectRL,
  projectEWML,
  projectGenAI,
  projectMM,
  projectFed,
  projectAffect,
];

// Pick the most relevant config based on title/description/category keywords.
export function getProjectConfig(input: {
  title: string;
  description?: string;
  category?: string;
}): ProjectConfig {
  const haystack = `${input.title} ${input.description ?? ""} ${input.category ?? ""}`
    .toLowerCase();
  for (const cfg of CONFIGS) {
    if (cfg.matchKeywords.some((kw) => haystack.includes(kw.toLowerCase()))) {
      return cfg;
    }
  }
  return DEFAULT_CONFIG;
}
