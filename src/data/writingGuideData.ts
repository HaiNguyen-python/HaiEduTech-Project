// Detailed writing guide data generator for IELTS Writing Practice
import { WritingPrompt } from "@/data/ieltsWritingPrompts";

export interface WritingGuideStep {
  title: string;
  objective: string;
  logicalFlow: string[];
  sentenceStarters: string[];
}

// Generate detailed guide steps based on task type and the specific prompt
export function getDetailedWritingGuide(prompt: WritingPrompt): WritingGuideStep[] {
  if (prompt.taskType === 1) {
    return getTask1Guide(prompt);
  }
  return getTask2Guide(prompt);
}

// ======================== TASK 1 ========================
function getTask1Guide(prompt: WritingPrompt): WritingGuideStep[] {
  const chartType = prompt.chartType || "bar";

  const overviewTips: Record<string, string> = {
    bar: "Compare the highest and lowest categories; note any dramatic differences.",
    line: "Identify the overall direction (upward/downward/fluctuating) and any intersections.",
    pie: "Highlight the largest and smallest segments; note any that are roughly equal.",
    table: "Identify the highest and lowest figures; compare rows or columns for patterns.",
    map: "Describe the most significant changes between the two time periods.",
    process: "State how many stages exist and whether the process is linear or cyclical.",
  };

  const bodyGroupTips: Record<string, string[]> = {
    bar: ["Group bars by category or time period", "Compare specific values with numbers", "Use comparative language (higher than, twice as much as)"],
    line: ["Describe the first half of the period with key data points", "Describe the second half, noting peaks, troughs, and plateaus", "Mention exact figures at start, end, and turning points"],
    pie: ["Describe the largest segments first with percentages", "Group smaller segments together for conciseness", "Compare proportions using fractions or multiples"],
    table: ["Organize by rows — describe the top performers first", "Organize by columns — compare across categories", "Highlight outliers and similarities"],
    map: ["Describe the original layout with key landmarks", "Describe the changes — what was added, removed, or relocated", "Note areas of significant transformation"],
    process: ["Describe the first half of the stages in order", "Describe the remaining stages to completion", "Mention inputs, outputs, and any recycling loops"],
  };

  return [
    {
      title: "Introduction (1 sentence)",
      objective: "Paraphrase the question using synonyms. Do NOT copy the original wording.",
      logicalFlow: ["Read the prompt carefully", "Identify key nouns & verbs", "Rewrite with synonyms"],
      sentenceStarters: [
        "The given [chart type] illustrates / compares / presents...",
        "The [chart type] below provides information about...",
        "The data presented in the [chart type] shows a comparison of...",
      ],
    },
    {
      title: "Overview (2 sentences)",
      objective: `Summarize the 2 most prominent features. NO specific data. ${overviewTips[chartType] || ""}`,
      logicalFlow: ["Identify main trend", "Identify secondary trend or key comparison", "Write 2 clear summary sentences"],
      sentenceStarters: [
        "Overall, it is clear that...",
        "In general, the most noticeable trend is that...",
        "The most striking feature is that..., while...",
      ],
    },
    {
      title: "Body Paragraph 1 (3 sentences)",
      objective: `Detail the first group of data with specific numbers. ${bodyGroupTips[chartType]?.[0] || ""}`,
      logicalFlow: ["Topic sentence", "Specific data point 1", "Comparison / data point 2"],
      sentenceStarters: [
        "Looking at the data in more detail, ...",
        "To begin with, [category/country/year]...",
        "In [year/category], the figure for ... stood at approximately...",
      ],
    },
    {
      title: "Body Paragraph 2 (3 sentences)",
      objective: `Detail the remaining data and comparisons. ${bodyGroupTips[chartType]?.[1] || ""}`,
      logicalFlow: ["Transition to second group", "Specific data with numbers", "Final comparison / contrast"],
      sentenceStarters: [
        "By contrast, / On the other hand, ...",
        "Turning to [category/country], the figures show that...",
        "Meanwhile, [category] experienced a [trend], reaching [number] by [year].",
      ],
    },
  ];
}

// ======================== TASK 2 ========================
function getTask2Guide(prompt: WritingPrompt): WritingGuideStep[] {
  const essayType = prompt.essayType || "opinion";

  // Customize guide based on essay type
  const guideMap: Record<string, WritingGuideStep[]> = {
    opinion: [
      {
        title: "Introduction",
        objective: "Paraphrase the question + give a clear thesis statement with your opinion.",
        logicalFlow: ["Paraphrase topic", "State your position clearly", "Preview your main arguments (optional)"],
        sentenceStarters: [
          "It is often argued that... In my opinion, I firmly believe that...",
          "There is a growing debate about whether... I strongly agree/disagree that...",
          "While some people contend that..., I am of the opinion that...",
        ],
      },
      {
        title: "Body 1 — Main Argument",
        objective: "Present your strongest argument with a clear example or evidence.",
        logicalFlow: ["Topic sentence (your first reason)", "Explain why", "Give a specific example", "Link back to thesis"],
        sentenceStarters: [
          "The primary reason for my viewpoint is that...",
          "First and foremost, it is essential to consider that...",
          "One compelling argument in favour of this is that...",
        ],
      },
      {
        title: "Body 2 — Counter-argument & Rebuttal",
        objective: "Acknowledge the opposing view and explain why your position is stronger.",
        logicalFlow: ["Concede the counter-argument", "Explain its limitations", "Reinforce your position with evidence"],
        sentenceStarters: [
          "Admittedly, some people argue that... However, this view fails to consider...",
          "While opponents may claim that..., evidence suggests that...",
          "Despite the argument that..., it is important to note that...",
        ],
      },
      {
        title: "Conclusion",
        objective: "Restate your opinion and summarize. Add a final thought or recommendation.",
        logicalFlow: ["Signal conclusion", "Restate thesis in different words", "Final recommendation or prediction"],
        sentenceStarters: [
          "In conclusion, I firmly maintain that...",
          "To sum up, while there are merits to both sides, I believe...",
          "All things considered, it is my conviction that...",
        ],
      },
    ],
    discussion: [
      {
        title: "Introduction",
        objective: "Paraphrase the topic and outline that you will discuss both views before giving your opinion.",
        logicalFlow: ["Paraphrase the issue", "State you will examine both perspectives", "Hint at your stance"],
        sentenceStarters: [
          "The issue of whether... has sparked considerable debate.",
          "People hold divergent views regarding... This essay will examine both sides before presenting my opinion.",
          "There are compelling arguments both for and against...",
        ],
      },
      {
        title: "Body 1 — View A",
        objective: "Present the first viewpoint objectively with supporting evidence.",
        logicalFlow: ["State View A clearly", "Explain the reasoning behind it", "Provide an example or evidence"],
        sentenceStarters: [
          "On the one hand, proponents of [View A] argue that...",
          "Those who support this perspective believe that...",
          "From one point of view, it could be argued that...",
        ],
      },
      {
        title: "Body 2 — View B",
        objective: "Present the second viewpoint with equal depth and give your opinion.",
        logicalFlow: ["State View B with a transition", "Explain its reasoning", "Add your own evaluation"],
        sentenceStarters: [
          "On the other hand, others contend that...",
          "Conversely, a significant number of people hold the view that...",
          "However, there is an equally strong argument that...",
        ],
      },
      {
        title: "Conclusion",
        objective: "Summarize both views and clearly state which one you agree with more.",
        logicalFlow: ["Summarize both sides briefly", "State your preference with reasoning", "End with a thoughtful observation"],
        sentenceStarters: [
          "In conclusion, while both arguments have merit, I tend to agree more with...",
          "Having considered both perspectives, I believe that...",
          "To summarize, although [View A] has its advantages, [View B] is more convincing because...",
        ],
      },
    ],
    "advantage-disadvantage": [
      {
        title: "Introduction",
        objective: "Paraphrase the topic and state that you will examine both advantages and disadvantages.",
        logicalFlow: ["Paraphrase the topic", "State the essay's purpose", "Optionally hint at your overall assessment"],
        sentenceStarters: [
          "In recent years, [topic] has become increasingly prevalent. This essay will explore its benefits and drawbacks.",
          "The [trend/phenomenon] of... brings with it both opportunities and challenges.",
          "[Topic] has generated significant debate, with clear advantages and disadvantages on each side.",
        ],
      },
      {
        title: "Body 1 — Advantages",
        objective: "Present 2-3 clear benefits with explanations and examples.",
        logicalFlow: ["State the main advantage", "Explain with reasoning", "Add a supporting example or statistic"],
        sentenceStarters: [
          "One of the most significant advantages of [topic] is that...",
          "A further benefit is the fact that...",
          "Perhaps the greatest merit of this approach is...",
        ],
      },
      {
        title: "Body 2 — Disadvantages",
        objective: "Present 2-3 clear drawbacks with explanations and examples.",
        logicalFlow: ["Transition to drawbacks", "State the main disadvantage", "Provide evidence or a real-world example"],
        sentenceStarters: [
          "Despite these benefits, there are notable drawbacks. Chief among them is...",
          "On the downside, [topic] can lead to...",
          "However, a major concern is that...",
        ],
      },
      {
        title: "Conclusion",
        objective: "Weigh both sides and give a balanced final opinion or recommendation.",
        logicalFlow: ["Acknowledge both sides", "State which outweighs the other (or balance)", "Suggest a way forward"],
        sentenceStarters: [
          "In conclusion, while the advantages of [topic] are considerable, the disadvantages cannot be ignored.",
          "On balance, I believe the benefits outweigh the drawbacks, provided that...",
          "To conclude, [topic] is a double-edged sword that requires careful management.",
        ],
      },
    ],
    "problem-solution": [
      {
        title: "Introduction",
        objective: "Introduce the problem clearly and state that you will discuss causes and solutions.",
        logicalFlow: ["Describe the issue", "State its significance", "Preview your essay structure"],
        sentenceStarters: [
          "One of the most pressing issues facing society today is...",
          "In many parts of the world, [problem] has reached alarming levels.",
          "[Problem] is a growing concern that demands immediate attention and practical solutions.",
        ],
      },
      {
        title: "Body 1 — Problems / Causes",
        objective: "Analyze 2-3 root causes of the problem with clear explanations.",
        logicalFlow: ["State the primary cause", "Explain the mechanism", "Describe secondary causes and their impact"],
        sentenceStarters: [
          "The root cause of this problem lies in...",
          "This issue stems primarily from...",
          "Another contributing factor is..., which exacerbates the situation by...",
        ],
      },
      {
        title: "Body 2 — Solutions",
        objective: "Propose 2-3 realistic solutions, explaining how each addresses the causes.",
        logicalFlow: ["Propose main solution", "Explain how it works", "Add supplementary measures"],
        sentenceStarters: [
          "To tackle this issue, governments should...",
          "A practical solution would be to..., as this would directly address...",
          "Furthermore, individuals can contribute by...",
        ],
      },
      {
        title: "Conclusion",
        objective: "Summarize the problem and reinforce the importance of the proposed solutions.",
        logicalFlow: ["Restate the severity", "Summarize key solutions", "End with a hopeful or urgent note"],
        sentenceStarters: [
          "In conclusion, [problem] requires a multi-faceted approach involving both...",
          "To sum up, unless decisive action is taken, [problem] will continue to worsen.",
          "Ultimately, a combination of government policy and individual responsibility is needed to...",
        ],
      },
    ],
    "direct-question": [
      {
        title: "Introduction",
        objective: "Paraphrase the question(s) and briefly outline your response.",
        logicalFlow: ["Paraphrase the topic", "State which questions you will answer", "Give a brief preview"],
        sentenceStarters: [
          "The question of whether... is one that merits careful consideration.",
          "There are two key issues to address here: firstly, ... and secondly, ...",
          "[Topic] raises important questions about...",
        ],
      },
      {
        title: "Body 1 — Answer to Question 1",
        objective: "Provide a direct, well-supported answer to the first question.",
        logicalFlow: ["State your answer directly", "Explain your reasoning", "Support with an example"],
        sentenceStarters: [
          "With regard to the first question, I believe that...",
          "To address the initial point, it is clear that...",
          "The answer to this question depends largely on...",
        ],
      },
      {
        title: "Body 2 — Answer to Question 2",
        objective: "Provide a direct, well-supported answer to the second question.",
        logicalFlow: ["Transition to the second question", "State your answer", "Provide evidence or examples"],
        sentenceStarters: [
          "Turning to the second question, ...",
          "As for whether [second question], I would argue that...",
          "In terms of [second aspect], the evidence suggests that...",
        ],
      },
      {
        title: "Conclusion",
        objective: "Summarize your answers and provide a cohesive final thought.",
        logicalFlow: ["Briefly recap both answers", "Link them together", "End with a broader reflection"],
        sentenceStarters: [
          "In conclusion, [answer 1] and [answer 2] are closely interconnected.",
          "To summarize, while [point 1], it is equally important that [point 2].",
          "All in all, these two issues highlight the need for...",
        ],
      },
    ],
  };

  return guideMap[essayType] || guideMap["opinion"];
}
