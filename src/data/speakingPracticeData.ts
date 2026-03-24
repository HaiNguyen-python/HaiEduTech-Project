// IELTS Speaking Practice - Comprehensive question database with vocabulary support
// Each question includes useful language, model structures, brainstorming ideas, and model answers
// Total: 110 Part 1 + 101 Part 2 + 110 Part 3 questions

export interface VocabItem {
  phrase: string;
  vietnamese: string;
}

export interface SpeakingPracticeQuestion {
  id: string;
  part: 1 | 2 | 3;
  topic: string;
  question: string;
  prompts?: string[];
  useful_language: {
    vocabulary_bank: VocabItem[];
    model_structures: string[];
    brainstorming_ideas: string[];
  };
  model_answer: string;
}

// ===================== PART 1 QUESTIONS (110 questions) =====================

const part1PracticeQuestions: SpeakingPracticeQuestion[] = [
  {
    "id": "p1-work---study-1",
    "part": 1,
    "topic": "Work & Study",
    "question": "What do you do, work or study?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pursue a career in",
          "vietnamese": "Theo đuổi sự nghiệp trong lĩnh vực..."
        },
        {
          "phrase": "A steep learning curve",
          "vietnamese": "Quá trình học hỏi nhiều thử thách"
        },
        {
          "phrase": "To juggle responsibilities",
          "vietnamese": "Cân bằng nhiều trách nhiệm cùng lúc"
        },
        {
          "phrase": "A rewarding experience",
          "vietnamese": "Một trải nghiệm đáng giá"
        },
        {
          "phrase": "To be snowed under with work",
          "vietnamese": "Ngập đầu trong công việc"
        }
      ],
      "model_structures": [
        "Well, to be perfectly honest, I've always been passionate about...",
        "At the moment, I'm currently working as a... and I find it incredibly...",
        "I'm in my final year of studying... which is both challenging and rewarding."
      ],
      "brainstorming_ideas": [
        "Mention your specific role, major, or field of study.",
        "Explain why you chose this path and what motivates you.",
        "Share a future goal or aspiration related to your career."
      ]
    },
    "model_answer": "When it comes to work & study, I would say that this is something I think about quite often. **To pursue a career in** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a steep learning curve** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-work---study-2",
    "part": 1,
    "topic": "Work & Study",
    "question": "What subjects are you studying?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pursue a career in",
          "vietnamese": "Theo đuổi sự nghiệp trong lĩnh vực..."
        },
        {
          "phrase": "A steep learning curve",
          "vietnamese": "Quá trình học hỏi nhiều thử thách"
        },
        {
          "phrase": "To juggle responsibilities",
          "vietnamese": "Cân bằng nhiều trách nhiệm cùng lúc"
        },
        {
          "phrase": "A rewarding experience",
          "vietnamese": "Một trải nghiệm đáng giá"
        },
        {
          "phrase": "To be snowed under with work",
          "vietnamese": "Ngập đầu trong công việc"
        }
      ],
      "model_structures": [
        "Well, to be perfectly honest, I've always been passionate about...",
        "At the moment, I'm currently working as a... and I find it incredibly...",
        "I'm in my final year of studying... which is both challenging and rewarding."
      ],
      "brainstorming_ideas": [
        "Mention your specific role, major, or field of study.",
        "Explain why you chose this path and what motivates you.",
        "Share a future goal or aspiration related to your career."
      ]
    },
    "model_answer": "When it comes to work & study, I would say that this is something I think about quite often. **To pursue a career in** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a steep learning curve** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-work---study-3",
    "part": 1,
    "topic": "Work & Study",
    "question": "Why did you choose that subject?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pursue a career in",
          "vietnamese": "Theo đuổi sự nghiệp trong lĩnh vực..."
        },
        {
          "phrase": "A steep learning curve",
          "vietnamese": "Quá trình học hỏi nhiều thử thách"
        },
        {
          "phrase": "To juggle responsibilities",
          "vietnamese": "Cân bằng nhiều trách nhiệm cùng lúc"
        },
        {
          "phrase": "A rewarding experience",
          "vietnamese": "Một trải nghiệm đáng giá"
        },
        {
          "phrase": "To be snowed under with work",
          "vietnamese": "Ngập đầu trong công việc"
        }
      ],
      "model_structures": [
        "Well, to be perfectly honest, I've always been passionate about...",
        "At the moment, I'm currently working as a... and I find it incredibly...",
        "I'm in my final year of studying... which is both challenging and rewarding."
      ],
      "brainstorming_ideas": [
        "Mention your specific role, major, or field of study.",
        "Explain why you chose this path and what motivates you.",
        "Share a future goal or aspiration related to your career."
      ]
    },
    "model_answer": "When it comes to work & study, I would say that this is something I think about quite often. **To pursue a career in** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a steep learning curve** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-work---study-4",
    "part": 1,
    "topic": "Work & Study",
    "question": "Do you enjoy your work? Why or why not?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pursue a career in",
          "vietnamese": "Theo đuổi sự nghiệp trong lĩnh vực..."
        },
        {
          "phrase": "A steep learning curve",
          "vietnamese": "Quá trình học hỏi nhiều thử thách"
        },
        {
          "phrase": "To juggle responsibilities",
          "vietnamese": "Cân bằng nhiều trách nhiệm cùng lúc"
        },
        {
          "phrase": "A rewarding experience",
          "vietnamese": "Một trải nghiệm đáng giá"
        },
        {
          "phrase": "To be snowed under with work",
          "vietnamese": "Ngập đầu trong công việc"
        }
      ],
      "model_structures": [
        "Well, to be perfectly honest, I've always been passionate about...",
        "At the moment, I'm currently working as a... and I find it incredibly...",
        "I'm in my final year of studying... which is both challenging and rewarding."
      ],
      "brainstorming_ideas": [
        "Mention your specific role, major, or field of study.",
        "Explain why you chose this path and what motivates you.",
        "Share a future goal or aspiration related to your career."
      ]
    },
    "model_answer": "When it comes to work & study, I would say that this is something I think about quite often. **To pursue a career in** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a steep learning curve** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-work---study-5",
    "part": 1,
    "topic": "Work & Study",
    "question": "What do you like most about your job?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pursue a career in",
          "vietnamese": "Theo đuổi sự nghiệp trong lĩnh vực..."
        },
        {
          "phrase": "A steep learning curve",
          "vietnamese": "Quá trình học hỏi nhiều thử thách"
        },
        {
          "phrase": "To juggle responsibilities",
          "vietnamese": "Cân bằng nhiều trách nhiệm cùng lúc"
        },
        {
          "phrase": "A rewarding experience",
          "vietnamese": "Một trải nghiệm đáng giá"
        },
        {
          "phrase": "To be snowed under with work",
          "vietnamese": "Ngập đầu trong công việc"
        }
      ],
      "model_structures": [
        "Well, to be perfectly honest, I've always been passionate about...",
        "At the moment, I'm currently working as a... and I find it incredibly...",
        "I'm in my final year of studying... which is both challenging and rewarding."
      ],
      "brainstorming_ideas": [
        "Mention your specific role, major, or field of study.",
        "Explain why you chose this path and what motivates you.",
        "Share a future goal or aspiration related to your career."
      ]
    },
    "model_answer": "When it comes to work & study, I would say that this is something I think about quite often. **To pursue a career in** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a steep learning curve** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-work---study-6",
    "part": 1,
    "topic": "Work & Study",
    "question": "Would you like to change your job in the future?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pursue a career in",
          "vietnamese": "Theo đuổi sự nghiệp trong lĩnh vực..."
        },
        {
          "phrase": "A steep learning curve",
          "vietnamese": "Quá trình học hỏi nhiều thử thách"
        },
        {
          "phrase": "To juggle responsibilities",
          "vietnamese": "Cân bằng nhiều trách nhiệm cùng lúc"
        },
        {
          "phrase": "A rewarding experience",
          "vietnamese": "Một trải nghiệm đáng giá"
        },
        {
          "phrase": "To be snowed under with work",
          "vietnamese": "Ngập đầu trong công việc"
        }
      ],
      "model_structures": [
        "Well, to be perfectly honest, I've always been passionate about...",
        "At the moment, I'm currently working as a... and I find it incredibly...",
        "I'm in my final year of studying... which is both challenging and rewarding."
      ],
      "brainstorming_ideas": [
        "Mention your specific role, major, or field of study.",
        "Explain why you chose this path and what motivates you.",
        "Share a future goal or aspiration related to your career."
      ]
    },
    "model_answer": "When it comes to work & study, I would say that this is something I think about quite often. **To pursue a career in** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a steep learning curve** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-work---study-7",
    "part": 1,
    "topic": "Work & Study",
    "question": "Do you prefer to study alone or in a group?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pursue a career in",
          "vietnamese": "Theo đuổi sự nghiệp trong lĩnh vực..."
        },
        {
          "phrase": "A steep learning curve",
          "vietnamese": "Quá trình học hỏi nhiều thử thách"
        },
        {
          "phrase": "To juggle responsibilities",
          "vietnamese": "Cân bằng nhiều trách nhiệm cùng lúc"
        },
        {
          "phrase": "A rewarding experience",
          "vietnamese": "Một trải nghiệm đáng giá"
        },
        {
          "phrase": "To be snowed under with work",
          "vietnamese": "Ngập đầu trong công việc"
        }
      ],
      "model_structures": [
        "Well, to be perfectly honest, I've always been passionate about...",
        "At the moment, I'm currently working as a... and I find it incredibly...",
        "I'm in my final year of studying... which is both challenging and rewarding."
      ],
      "brainstorming_ideas": [
        "Mention your specific role, major, or field of study.",
        "Explain why you chose this path and what motivates you.",
        "Share a future goal or aspiration related to your career."
      ]
    },
    "model_answer": "When it comes to work & study, I would say that this is something I think about quite often. **To pursue a career in** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a steep learning curve** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-work---study-8",
    "part": 1,
    "topic": "Work & Study",
    "question": "What is the most difficult part of your studies?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pursue a career in",
          "vietnamese": "Theo đuổi sự nghiệp trong lĩnh vực..."
        },
        {
          "phrase": "A steep learning curve",
          "vietnamese": "Quá trình học hỏi nhiều thử thách"
        },
        {
          "phrase": "To juggle responsibilities",
          "vietnamese": "Cân bằng nhiều trách nhiệm cùng lúc"
        },
        {
          "phrase": "A rewarding experience",
          "vietnamese": "Một trải nghiệm đáng giá"
        },
        {
          "phrase": "To be snowed under with work",
          "vietnamese": "Ngập đầu trong công việc"
        }
      ],
      "model_structures": [
        "Well, to be perfectly honest, I've always been passionate about...",
        "At the moment, I'm currently working as a... and I find it incredibly...",
        "I'm in my final year of studying... which is both challenging and rewarding."
      ],
      "brainstorming_ideas": [
        "Mention your specific role, major, or field of study.",
        "Explain why you chose this path and what motivates you.",
        "Share a future goal or aspiration related to your career."
      ]
    },
    "model_answer": "When it comes to work & study, I would say that this is something I think about quite often. **To pursue a career in** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a steep learning curve** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-work---study-9",
    "part": 1,
    "topic": "Work & Study",
    "question": "Do you think your job is easy or difficult?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pursue a career in",
          "vietnamese": "Theo đuổi sự nghiệp trong lĩnh vực..."
        },
        {
          "phrase": "A steep learning curve",
          "vietnamese": "Quá trình học hỏi nhiều thử thách"
        },
        {
          "phrase": "To juggle responsibilities",
          "vietnamese": "Cân bằng nhiều trách nhiệm cùng lúc"
        },
        {
          "phrase": "A rewarding experience",
          "vietnamese": "Một trải nghiệm đáng giá"
        },
        {
          "phrase": "To be snowed under with work",
          "vietnamese": "Ngập đầu trong công việc"
        }
      ],
      "model_structures": [
        "Well, to be perfectly honest, I've always been passionate about...",
        "At the moment, I'm currently working as a... and I find it incredibly...",
        "I'm in my final year of studying... which is both challenging and rewarding."
      ],
      "brainstorming_ideas": [
        "Mention your specific role, major, or field of study.",
        "Explain why you chose this path and what motivates you.",
        "Share a future goal or aspiration related to your career."
      ]
    },
    "model_answer": "When it comes to work & study, I would say that this is something I think about quite often. **To pursue a career in** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a steep learning curve** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-work---study-10",
    "part": 1,
    "topic": "Work & Study",
    "question": "What skills have you gained from your work?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pursue a career in",
          "vietnamese": "Theo đuổi sự nghiệp trong lĩnh vực..."
        },
        {
          "phrase": "A steep learning curve",
          "vietnamese": "Quá trình học hỏi nhiều thử thách"
        },
        {
          "phrase": "To juggle responsibilities",
          "vietnamese": "Cân bằng nhiều trách nhiệm cùng lúc"
        },
        {
          "phrase": "A rewarding experience",
          "vietnamese": "Một trải nghiệm đáng giá"
        },
        {
          "phrase": "To be snowed under with work",
          "vietnamese": "Ngập đầu trong công việc"
        }
      ],
      "model_structures": [
        "Well, to be perfectly honest, I've always been passionate about...",
        "At the moment, I'm currently working as a... and I find it incredibly...",
        "I'm in my final year of studying... which is both challenging and rewarding."
      ],
      "brainstorming_ideas": [
        "Mention your specific role, major, or field of study.",
        "Explain why you chose this path and what motivates you.",
        "Share a future goal or aspiration related to your career."
      ]
    },
    "model_answer": "When it comes to work & study, I would say that this is something I think about quite often. **To pursue a career in** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a steep learning curve** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-hometown-1",
    "part": 1,
    "topic": "Hometown",
    "question": "Where is your hometown?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A bustling metropolis",
          "vietnamese": "Một đô thị sầm uất"
        },
        {
          "phrase": "Steeped in history",
          "vietnamese": "Đậm đà lịch sử"
        },
        {
          "phrase": "A tight-knit community",
          "vietnamese": "Cộng đồng gắn bó chặt chẽ"
        },
        {
          "phrase": "To undergo rapid urbanization",
          "vietnamese": "Trải qua quá trình đô thị hóa nhanh chóng"
        },
        {
          "phrase": "The cost of living",
          "vietnamese": "Chi phí sinh hoạt"
        }
      ],
      "model_structures": [
        "I come from..., which is a..., located in the... part of...",
        "What I like most about my hometown is that it's...",
        "Over the past few years, my hometown has undergone significant changes, especially..."
      ],
      "brainstorming_ideas": [
        "Describe the size, location, and atmosphere of your hometown.",
        "Mention any famous landmarks, food, or cultural traditions.",
        "Talk about recent developments or changes you've noticed."
      ]
    },
    "model_answer": "When it comes to hometown, I would say that this is something I think about quite often. **A bustling metropolis** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **steeped in history** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-hometown-2",
    "part": 1,
    "topic": "Hometown",
    "question": "What do you like most about your hometown?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A bustling metropolis",
          "vietnamese": "Một đô thị sầm uất"
        },
        {
          "phrase": "Steeped in history",
          "vietnamese": "Đậm đà lịch sử"
        },
        {
          "phrase": "A tight-knit community",
          "vietnamese": "Cộng đồng gắn bó chặt chẽ"
        },
        {
          "phrase": "To undergo rapid urbanization",
          "vietnamese": "Trải qua quá trình đô thị hóa nhanh chóng"
        },
        {
          "phrase": "The cost of living",
          "vietnamese": "Chi phí sinh hoạt"
        }
      ],
      "model_structures": [
        "I come from..., which is a..., located in the... part of...",
        "What I like most about my hometown is that it's...",
        "Over the past few years, my hometown has undergone significant changes, especially..."
      ],
      "brainstorming_ideas": [
        "Describe the size, location, and atmosphere of your hometown.",
        "Mention any famous landmarks, food, or cultural traditions.",
        "Talk about recent developments or changes you've noticed."
      ]
    },
    "model_answer": "When it comes to hometown, I would say that this is something I think about quite often. **A bustling metropolis** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **steeped in history** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-hometown-3",
    "part": 1,
    "topic": "Hometown",
    "question": "Has your hometown changed much in recent years?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A bustling metropolis",
          "vietnamese": "Một đô thị sầm uất"
        },
        {
          "phrase": "Steeped in history",
          "vietnamese": "Đậm đà lịch sử"
        },
        {
          "phrase": "A tight-knit community",
          "vietnamese": "Cộng đồng gắn bó chặt chẽ"
        },
        {
          "phrase": "To undergo rapid urbanization",
          "vietnamese": "Trải qua quá trình đô thị hóa nhanh chóng"
        },
        {
          "phrase": "The cost of living",
          "vietnamese": "Chi phí sinh hoạt"
        }
      ],
      "model_structures": [
        "I come from..., which is a..., located in the... part of...",
        "What I like most about my hometown is that it's...",
        "Over the past few years, my hometown has undergone significant changes, especially..."
      ],
      "brainstorming_ideas": [
        "Describe the size, location, and atmosphere of your hometown.",
        "Mention any famous landmarks, food, or cultural traditions.",
        "Talk about recent developments or changes you've noticed."
      ]
    },
    "model_answer": "When it comes to hometown, I would say that this is something I think about quite often. **A bustling metropolis** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **steeped in history** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-hometown-4",
    "part": 1,
    "topic": "Hometown",
    "question": "Would you like to live in your hometown in the future?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A bustling metropolis",
          "vietnamese": "Một đô thị sầm uất"
        },
        {
          "phrase": "Steeped in history",
          "vietnamese": "Đậm đà lịch sử"
        },
        {
          "phrase": "A tight-knit community",
          "vietnamese": "Cộng đồng gắn bó chặt chẽ"
        },
        {
          "phrase": "To undergo rapid urbanization",
          "vietnamese": "Trải qua quá trình đô thị hóa nhanh chóng"
        },
        {
          "phrase": "The cost of living",
          "vietnamese": "Chi phí sinh hoạt"
        }
      ],
      "model_structures": [
        "I come from..., which is a..., located in the... part of...",
        "What I like most about my hometown is that it's...",
        "Over the past few years, my hometown has undergone significant changes, especially..."
      ],
      "brainstorming_ideas": [
        "Describe the size, location, and atmosphere of your hometown.",
        "Mention any famous landmarks, food, or cultural traditions.",
        "Talk about recent developments or changes you've noticed."
      ]
    },
    "model_answer": "When it comes to hometown, I would say that this is something I think about quite often. **A bustling metropolis** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **steeped in history** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-hometown-5",
    "part": 1,
    "topic": "Hometown",
    "question": "Is your hometown a good place for young people?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A bustling metropolis",
          "vietnamese": "Một đô thị sầm uất"
        },
        {
          "phrase": "Steeped in history",
          "vietnamese": "Đậm đà lịch sử"
        },
        {
          "phrase": "A tight-knit community",
          "vietnamese": "Cộng đồng gắn bó chặt chẽ"
        },
        {
          "phrase": "To undergo rapid urbanization",
          "vietnamese": "Trải qua quá trình đô thị hóa nhanh chóng"
        },
        {
          "phrase": "The cost of living",
          "vietnamese": "Chi phí sinh hoạt"
        }
      ],
      "model_structures": [
        "I come from..., which is a..., located in the... part of...",
        "What I like most about my hometown is that it's...",
        "Over the past few years, my hometown has undergone significant changes, especially..."
      ],
      "brainstorming_ideas": [
        "Describe the size, location, and atmosphere of your hometown.",
        "Mention any famous landmarks, food, or cultural traditions.",
        "Talk about recent developments or changes you've noticed."
      ]
    },
    "model_answer": "When it comes to hometown, I would say that this is something I think about quite often. **A bustling metropolis** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **steeped in history** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-hometown-6",
    "part": 1,
    "topic": "Hometown",
    "question": "What is the most famous thing about your hometown?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A bustling metropolis",
          "vietnamese": "Một đô thị sầm uất"
        },
        {
          "phrase": "Steeped in history",
          "vietnamese": "Đậm đà lịch sử"
        },
        {
          "phrase": "A tight-knit community",
          "vietnamese": "Cộng đồng gắn bó chặt chẽ"
        },
        {
          "phrase": "To undergo rapid urbanization",
          "vietnamese": "Trải qua quá trình đô thị hóa nhanh chóng"
        },
        {
          "phrase": "The cost of living",
          "vietnamese": "Chi phí sinh hoạt"
        }
      ],
      "model_structures": [
        "I come from..., which is a..., located in the... part of...",
        "What I like most about my hometown is that it's...",
        "Over the past few years, my hometown has undergone significant changes, especially..."
      ],
      "brainstorming_ideas": [
        "Describe the size, location, and atmosphere of your hometown.",
        "Mention any famous landmarks, food, or cultural traditions.",
        "Talk about recent developments or changes you've noticed."
      ]
    },
    "model_answer": "When it comes to hometown, I would say that this is something I think about quite often. **A bustling metropolis** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **steeped in history** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-hometown-7",
    "part": 1,
    "topic": "Hometown",
    "question": "Is there good public transportation in your hometown?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A bustling metropolis",
          "vietnamese": "Một đô thị sầm uất"
        },
        {
          "phrase": "Steeped in history",
          "vietnamese": "Đậm đà lịch sử"
        },
        {
          "phrase": "A tight-knit community",
          "vietnamese": "Cộng đồng gắn bó chặt chẽ"
        },
        {
          "phrase": "To undergo rapid urbanization",
          "vietnamese": "Trải qua quá trình đô thị hóa nhanh chóng"
        },
        {
          "phrase": "The cost of living",
          "vietnamese": "Chi phí sinh hoạt"
        }
      ],
      "model_structures": [
        "I come from..., which is a..., located in the... part of...",
        "What I like most about my hometown is that it's...",
        "Over the past few years, my hometown has undergone significant changes, especially..."
      ],
      "brainstorming_ideas": [
        "Describe the size, location, and atmosphere of your hometown.",
        "Mention any famous landmarks, food, or cultural traditions.",
        "Talk about recent developments or changes you've noticed."
      ]
    },
    "model_answer": "When it comes to hometown, I would say that this is something I think about quite often. **A bustling metropolis** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **steeped in history** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-hometown-8",
    "part": 1,
    "topic": "Hometown",
    "question": "Do many tourists visit your hometown?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A bustling metropolis",
          "vietnamese": "Một đô thị sầm uất"
        },
        {
          "phrase": "Steeped in history",
          "vietnamese": "Đậm đà lịch sử"
        },
        {
          "phrase": "A tight-knit community",
          "vietnamese": "Cộng đồng gắn bó chặt chẽ"
        },
        {
          "phrase": "To undergo rapid urbanization",
          "vietnamese": "Trải qua quá trình đô thị hóa nhanh chóng"
        },
        {
          "phrase": "The cost of living",
          "vietnamese": "Chi phí sinh hoạt"
        }
      ],
      "model_structures": [
        "I come from..., which is a..., located in the... part of...",
        "What I like most about my hometown is that it's...",
        "Over the past few years, my hometown has undergone significant changes, especially..."
      ],
      "brainstorming_ideas": [
        "Describe the size, location, and atmosphere of your hometown.",
        "Mention any famous landmarks, food, or cultural traditions.",
        "Talk about recent developments or changes you've noticed."
      ]
    },
    "model_answer": "When it comes to hometown, I would say that this is something I think about quite often. **A bustling metropolis** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **steeped in history** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-hometown-9",
    "part": 1,
    "topic": "Hometown",
    "question": "What would you improve about your hometown?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A bustling metropolis",
          "vietnamese": "Một đô thị sầm uất"
        },
        {
          "phrase": "Steeped in history",
          "vietnamese": "Đậm đà lịch sử"
        },
        {
          "phrase": "A tight-knit community",
          "vietnamese": "Cộng đồng gắn bó chặt chẽ"
        },
        {
          "phrase": "To undergo rapid urbanization",
          "vietnamese": "Trải qua quá trình đô thị hóa nhanh chóng"
        },
        {
          "phrase": "The cost of living",
          "vietnamese": "Chi phí sinh hoạt"
        }
      ],
      "model_structures": [
        "I come from..., which is a..., located in the... part of...",
        "What I like most about my hometown is that it's...",
        "Over the past few years, my hometown has undergone significant changes, especially..."
      ],
      "brainstorming_ideas": [
        "Describe the size, location, and atmosphere of your hometown.",
        "Mention any famous landmarks, food, or cultural traditions.",
        "Talk about recent developments or changes you've noticed."
      ]
    },
    "model_answer": "When it comes to hometown, I would say that this is something I think about quite often. **A bustling metropolis** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **steeped in history** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-hometown-10",
    "part": 1,
    "topic": "Hometown",
    "question": "How is the weather in your hometown?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A bustling metropolis",
          "vietnamese": "Một đô thị sầm uất"
        },
        {
          "phrase": "Steeped in history",
          "vietnamese": "Đậm đà lịch sử"
        },
        {
          "phrase": "A tight-knit community",
          "vietnamese": "Cộng đồng gắn bó chặt chẽ"
        },
        {
          "phrase": "To undergo rapid urbanization",
          "vietnamese": "Trải qua quá trình đô thị hóa nhanh chóng"
        },
        {
          "phrase": "The cost of living",
          "vietnamese": "Chi phí sinh hoạt"
        }
      ],
      "model_structures": [
        "I come from..., which is a..., located in the... part of...",
        "What I like most about my hometown is that it's...",
        "Over the past few years, my hometown has undergone significant changes, especially..."
      ],
      "brainstorming_ideas": [
        "Describe the size, location, and atmosphere of your hometown.",
        "Mention any famous landmarks, food, or cultural traditions.",
        "Talk about recent developments or changes you've noticed."
      ]
    },
    "model_answer": "When it comes to hometown, I would say that this is something I think about quite often. **A bustling metropolis** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **steeped in history** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-daily-routine-1",
    "part": 1,
    "topic": "Daily Routine",
    "question": "What is your typical daily routine?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To be an early bird / a night owl",
          "vietnamese": "Người dậy sớm / cú đêm"
        },
        {
          "phrase": "A creature of habit",
          "vietnamese": "Người sống theo thói quen"
        },
        {
          "phrase": "To stick to a schedule",
          "vietnamese": "Tuân thủ lịch trình"
        },
        {
          "phrase": "To squeeze in some exercise",
          "vietnamese": "Tranh thủ tập thể dục"
        },
        {
          "phrase": "To wind down after work",
          "vietnamese": "Thư giãn sau giờ làm"
        }
      ],
      "model_structures": [
        "On a typical day, I usually start by..., and then I...",
        "I'd say I'm more of a... because I tend to...",
        "My routine has changed quite a bit recently, mainly because..."
      ],
      "brainstorming_ideas": [
        "Describe your morning and evening routines.",
        "Mention activities you do for work, study, and relaxation.",
        "Talk about how your routine differs on weekdays vs. weekends."
      ]
    },
    "model_answer": "When it comes to daily routine, I would say that this is something I think about quite often. **To be an early bird / a night owl** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a creature of habit** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-daily-routine-2",
    "part": 1,
    "topic": "Daily Routine",
    "question": "Do you usually have breakfast in the morning?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To be an early bird / a night owl",
          "vietnamese": "Người dậy sớm / cú đêm"
        },
        {
          "phrase": "A creature of habit",
          "vietnamese": "Người sống theo thói quen"
        },
        {
          "phrase": "To stick to a schedule",
          "vietnamese": "Tuân thủ lịch trình"
        },
        {
          "phrase": "To squeeze in some exercise",
          "vietnamese": "Tranh thủ tập thể dục"
        },
        {
          "phrase": "To wind down after work",
          "vietnamese": "Thư giãn sau giờ làm"
        }
      ],
      "model_structures": [
        "On a typical day, I usually start by..., and then I...",
        "I'd say I'm more of a... because I tend to...",
        "My routine has changed quite a bit recently, mainly because..."
      ],
      "brainstorming_ideas": [
        "Describe your morning and evening routines.",
        "Mention activities you do for work, study, and relaxation.",
        "Talk about how your routine differs on weekdays vs. weekends."
      ]
    },
    "model_answer": "When it comes to daily routine, I would say that this is something I think about quite often. **To be an early bird / a night owl** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a creature of habit** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-daily-routine-3",
    "part": 1,
    "topic": "Daily Routine",
    "question": "Has your daily routine changed recently?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To be an early bird / a night owl",
          "vietnamese": "Người dậy sớm / cú đêm"
        },
        {
          "phrase": "A creature of habit",
          "vietnamese": "Người sống theo thói quen"
        },
        {
          "phrase": "To stick to a schedule",
          "vietnamese": "Tuân thủ lịch trình"
        },
        {
          "phrase": "To squeeze in some exercise",
          "vietnamese": "Tranh thủ tập thể dục"
        },
        {
          "phrase": "To wind down after work",
          "vietnamese": "Thư giãn sau giờ làm"
        }
      ],
      "model_structures": [
        "On a typical day, I usually start by..., and then I...",
        "I'd say I'm more of a... because I tend to...",
        "My routine has changed quite a bit recently, mainly because..."
      ],
      "brainstorming_ideas": [
        "Describe your morning and evening routines.",
        "Mention activities you do for work, study, and relaxation.",
        "Talk about how your routine differs on weekdays vs. weekends."
      ]
    },
    "model_answer": "When it comes to daily routine, I would say that this is something I think about quite often. **To be an early bird / a night owl** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a creature of habit** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-daily-routine-4",
    "part": 1,
    "topic": "Daily Routine",
    "question": "Do you prefer a fixed routine or a flexible schedule?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To be an early bird / a night owl",
          "vietnamese": "Người dậy sớm / cú đêm"
        },
        {
          "phrase": "A creature of habit",
          "vietnamese": "Người sống theo thói quen"
        },
        {
          "phrase": "To stick to a schedule",
          "vietnamese": "Tuân thủ lịch trình"
        },
        {
          "phrase": "To squeeze in some exercise",
          "vietnamese": "Tranh thủ tập thể dục"
        },
        {
          "phrase": "To wind down after work",
          "vietnamese": "Thư giãn sau giờ làm"
        }
      ],
      "model_structures": [
        "On a typical day, I usually start by..., and then I...",
        "I'd say I'm more of a... because I tend to...",
        "My routine has changed quite a bit recently, mainly because..."
      ],
      "brainstorming_ideas": [
        "Describe your morning and evening routines.",
        "Mention activities you do for work, study, and relaxation.",
        "Talk about how your routine differs on weekdays vs. weekends."
      ]
    },
    "model_answer": "When it comes to daily routine, I would say that this is something I think about quite often. **To be an early bird / a night owl** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a creature of habit** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-daily-routine-5",
    "part": 1,
    "topic": "Daily Routine",
    "question": "What do you usually do in the evenings?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To be an early bird / a night owl",
          "vietnamese": "Người dậy sớm / cú đêm"
        },
        {
          "phrase": "A creature of habit",
          "vietnamese": "Người sống theo thói quen"
        },
        {
          "phrase": "To stick to a schedule",
          "vietnamese": "Tuân thủ lịch trình"
        },
        {
          "phrase": "To squeeze in some exercise",
          "vietnamese": "Tranh thủ tập thể dục"
        },
        {
          "phrase": "To wind down after work",
          "vietnamese": "Thư giãn sau giờ làm"
        }
      ],
      "model_structures": [
        "On a typical day, I usually start by..., and then I...",
        "I'd say I'm more of a... because I tend to...",
        "My routine has changed quite a bit recently, mainly because..."
      ],
      "brainstorming_ideas": [
        "Describe your morning and evening routines.",
        "Mention activities you do for work, study, and relaxation.",
        "Talk about how your routine differs on weekdays vs. weekends."
      ]
    },
    "model_answer": "When it comes to daily routine, I would say that this is something I think about quite often. **To be an early bird / a night owl** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a creature of habit** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-daily-routine-6",
    "part": 1,
    "topic": "Daily Routine",
    "question": "Are weekends different from weekdays for you?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To be an early bird / a night owl",
          "vietnamese": "Người dậy sớm / cú đêm"
        },
        {
          "phrase": "A creature of habit",
          "vietnamese": "Người sống theo thói quen"
        },
        {
          "phrase": "To stick to a schedule",
          "vietnamese": "Tuân thủ lịch trình"
        },
        {
          "phrase": "To squeeze in some exercise",
          "vietnamese": "Tranh thủ tập thể dục"
        },
        {
          "phrase": "To wind down after work",
          "vietnamese": "Thư giãn sau giờ làm"
        }
      ],
      "model_structures": [
        "On a typical day, I usually start by..., and then I...",
        "I'd say I'm more of a... because I tend to...",
        "My routine has changed quite a bit recently, mainly because..."
      ],
      "brainstorming_ideas": [
        "Describe your morning and evening routines.",
        "Mention activities you do for work, study, and relaxation.",
        "Talk about how your routine differs on weekdays vs. weekends."
      ]
    },
    "model_answer": "When it comes to daily routine, I would say that this is something I think about quite often. **To be an early bird / a night owl** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a creature of habit** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-daily-routine-7",
    "part": 1,
    "topic": "Daily Routine",
    "question": "Do you think routines are important? Why?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To be an early bird / a night owl",
          "vietnamese": "Người dậy sớm / cú đêm"
        },
        {
          "phrase": "A creature of habit",
          "vietnamese": "Người sống theo thói quen"
        },
        {
          "phrase": "To stick to a schedule",
          "vietnamese": "Tuân thủ lịch trình"
        },
        {
          "phrase": "To squeeze in some exercise",
          "vietnamese": "Tranh thủ tập thể dục"
        },
        {
          "phrase": "To wind down after work",
          "vietnamese": "Thư giãn sau giờ làm"
        }
      ],
      "model_structures": [
        "On a typical day, I usually start by..., and then I...",
        "I'd say I'm more of a... because I tend to...",
        "My routine has changed quite a bit recently, mainly because..."
      ],
      "brainstorming_ideas": [
        "Describe your morning and evening routines.",
        "Mention activities you do for work, study, and relaxation.",
        "Talk about how your routine differs on weekdays vs. weekends."
      ]
    },
    "model_answer": "When it comes to daily routine, I would say that this is something I think about quite often. **To be an early bird / a night owl** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a creature of habit** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-daily-routine-8",
    "part": 1,
    "topic": "Daily Routine",
    "question": "What is the first thing you do after waking up?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To be an early bird / a night owl",
          "vietnamese": "Người dậy sớm / cú đêm"
        },
        {
          "phrase": "A creature of habit",
          "vietnamese": "Người sống theo thói quen"
        },
        {
          "phrase": "To stick to a schedule",
          "vietnamese": "Tuân thủ lịch trình"
        },
        {
          "phrase": "To squeeze in some exercise",
          "vietnamese": "Tranh thủ tập thể dục"
        },
        {
          "phrase": "To wind down after work",
          "vietnamese": "Thư giãn sau giờ làm"
        }
      ],
      "model_structures": [
        "On a typical day, I usually start by..., and then I...",
        "I'd say I'm more of a... because I tend to...",
        "My routine has changed quite a bit recently, mainly because..."
      ],
      "brainstorming_ideas": [
        "Describe your morning and evening routines.",
        "Mention activities you do for work, study, and relaxation.",
        "Talk about how your routine differs on weekdays vs. weekends."
      ]
    },
    "model_answer": "When it comes to daily routine, I would say that this is something I think about quite often. **To be an early bird / a night owl** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a creature of habit** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-daily-routine-9",
    "part": 1,
    "topic": "Daily Routine",
    "question": "Do you think you manage your time well?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To be an early bird / a night owl",
          "vietnamese": "Người dậy sớm / cú đêm"
        },
        {
          "phrase": "A creature of habit",
          "vietnamese": "Người sống theo thói quen"
        },
        {
          "phrase": "To stick to a schedule",
          "vietnamese": "Tuân thủ lịch trình"
        },
        {
          "phrase": "To squeeze in some exercise",
          "vietnamese": "Tranh thủ tập thể dục"
        },
        {
          "phrase": "To wind down after work",
          "vietnamese": "Thư giãn sau giờ làm"
        }
      ],
      "model_structures": [
        "On a typical day, I usually start by..., and then I...",
        "I'd say I'm more of a... because I tend to...",
        "My routine has changed quite a bit recently, mainly because..."
      ],
      "brainstorming_ideas": [
        "Describe your morning and evening routines.",
        "Mention activities you do for work, study, and relaxation.",
        "Talk about how your routine differs on weekdays vs. weekends."
      ]
    },
    "model_answer": "When it comes to daily routine, I would say that this is something I think about quite often. **To be an early bird / a night owl** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a creature of habit** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-daily-routine-10",
    "part": 1,
    "topic": "Daily Routine",
    "question": "Would you like to change anything about your daily routine?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To be an early bird / a night owl",
          "vietnamese": "Người dậy sớm / cú đêm"
        },
        {
          "phrase": "A creature of habit",
          "vietnamese": "Người sống theo thói quen"
        },
        {
          "phrase": "To stick to a schedule",
          "vietnamese": "Tuân thủ lịch trình"
        },
        {
          "phrase": "To squeeze in some exercise",
          "vietnamese": "Tranh thủ tập thể dục"
        },
        {
          "phrase": "To wind down after work",
          "vietnamese": "Thư giãn sau giờ làm"
        }
      ],
      "model_structures": [
        "On a typical day, I usually start by..., and then I...",
        "I'd say I'm more of a... because I tend to...",
        "My routine has changed quite a bit recently, mainly because..."
      ],
      "brainstorming_ideas": [
        "Describe your morning and evening routines.",
        "Mention activities you do for work, study, and relaxation.",
        "Talk about how your routine differs on weekdays vs. weekends."
      ]
    },
    "model_answer": "When it comes to daily routine, I would say that this is something I think about quite often. **To be an early bird / a night owl** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a creature of habit** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-hobbies---interests-1",
    "part": 1,
    "topic": "Hobbies & Interests",
    "question": "What hobbies do you have?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To take up a hobby",
          "vietnamese": "Bắt đầu một sở thích mới"
        },
        {
          "phrase": "A leisure activity",
          "vietnamese": "Hoạt động giải trí"
        },
        {
          "phrase": "To be passionate about",
          "vietnamese": "Đam mê về..."
        },
        {
          "phrase": "A creative outlet",
          "vietnamese": "Lối thoát sáng tạo"
        },
        {
          "phrase": "To while away the hours",
          "vietnamese": "Giết thời gian"
        }
      ],
      "model_structures": [
        "I've been interested in... for as long as I can remember.",
        "Whenever I have free time, I tend to... because it helps me...",
        "I recently took up... and I've found it incredibly..."
      ],
      "brainstorming_ideas": [
        "Explain how and when you started your hobby.",
        "Describe what you enjoy most about it.",
        "Mention any benefits it brings to your life."
      ]
    },
    "model_answer": "When it comes to hobbies & interests, I would say that this is something I think about quite often. **To take up a hobby** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a leisure activity** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-hobbies---interests-2",
    "part": 1,
    "topic": "Hobbies & Interests",
    "question": "How did you become interested in that hobby?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To take up a hobby",
          "vietnamese": "Bắt đầu một sở thích mới"
        },
        {
          "phrase": "A leisure activity",
          "vietnamese": "Hoạt động giải trí"
        },
        {
          "phrase": "To be passionate about",
          "vietnamese": "Đam mê về..."
        },
        {
          "phrase": "A creative outlet",
          "vietnamese": "Lối thoát sáng tạo"
        },
        {
          "phrase": "To while away the hours",
          "vietnamese": "Giết thời gian"
        }
      ],
      "model_structures": [
        "I've been interested in... for as long as I can remember.",
        "Whenever I have free time, I tend to... because it helps me...",
        "I recently took up... and I've found it incredibly..."
      ],
      "brainstorming_ideas": [
        "Explain how and when you started your hobby.",
        "Describe what you enjoy most about it.",
        "Mention any benefits it brings to your life."
      ]
    },
    "model_answer": "When it comes to hobbies & interests, I would say that this is something I think about quite often. **To take up a hobby** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a leisure activity** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-hobbies---interests-3",
    "part": 1,
    "topic": "Hobbies & Interests",
    "question": "How much time do you spend on your hobbies?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To take up a hobby",
          "vietnamese": "Bắt đầu một sở thích mới"
        },
        {
          "phrase": "A leisure activity",
          "vietnamese": "Hoạt động giải trí"
        },
        {
          "phrase": "To be passionate about",
          "vietnamese": "Đam mê về..."
        },
        {
          "phrase": "A creative outlet",
          "vietnamese": "Lối thoát sáng tạo"
        },
        {
          "phrase": "To while away the hours",
          "vietnamese": "Giết thời gian"
        }
      ],
      "model_structures": [
        "I've been interested in... for as long as I can remember.",
        "Whenever I have free time, I tend to... because it helps me...",
        "I recently took up... and I've found it incredibly..."
      ],
      "brainstorming_ideas": [
        "Explain how and when you started your hobby.",
        "Describe what you enjoy most about it.",
        "Mention any benefits it brings to your life."
      ]
    },
    "model_answer": "When it comes to hobbies & interests, I would say that this is something I think about quite often. **To take up a hobby** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a leisure activity** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-hobbies---interests-4",
    "part": 1,
    "topic": "Hobbies & Interests",
    "question": "Have your hobbies changed since you were a child?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To take up a hobby",
          "vietnamese": "Bắt đầu một sở thích mới"
        },
        {
          "phrase": "A leisure activity",
          "vietnamese": "Hoạt động giải trí"
        },
        {
          "phrase": "To be passionate about",
          "vietnamese": "Đam mê về..."
        },
        {
          "phrase": "A creative outlet",
          "vietnamese": "Lối thoát sáng tạo"
        },
        {
          "phrase": "To while away the hours",
          "vietnamese": "Giết thời gian"
        }
      ],
      "model_structures": [
        "I've been interested in... for as long as I can remember.",
        "Whenever I have free time, I tend to... because it helps me...",
        "I recently took up... and I've found it incredibly..."
      ],
      "brainstorming_ideas": [
        "Explain how and when you started your hobby.",
        "Describe what you enjoy most about it.",
        "Mention any benefits it brings to your life."
      ]
    },
    "model_answer": "When it comes to hobbies & interests, I would say that this is something I think about quite often. **To take up a hobby** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a leisure activity** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-hobbies---interests-5",
    "part": 1,
    "topic": "Hobbies & Interests",
    "question": "Is there a hobby you would like to try in the future?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To take up a hobby",
          "vietnamese": "Bắt đầu một sở thích mới"
        },
        {
          "phrase": "A leisure activity",
          "vietnamese": "Hoạt động giải trí"
        },
        {
          "phrase": "To be passionate about",
          "vietnamese": "Đam mê về..."
        },
        {
          "phrase": "A creative outlet",
          "vietnamese": "Lối thoát sáng tạo"
        },
        {
          "phrase": "To while away the hours",
          "vietnamese": "Giết thời gian"
        }
      ],
      "model_structures": [
        "I've been interested in... for as long as I can remember.",
        "Whenever I have free time, I tend to... because it helps me...",
        "I recently took up... and I've found it incredibly..."
      ],
      "brainstorming_ideas": [
        "Explain how and when you started your hobby.",
        "Describe what you enjoy most about it.",
        "Mention any benefits it brings to your life."
      ]
    },
    "model_answer": "When it comes to hobbies & interests, I would say that this is something I think about quite often. **To take up a hobby** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a leisure activity** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-hobbies---interests-6",
    "part": 1,
    "topic": "Hobbies & Interests",
    "question": "Do you prefer indoor or outdoor hobbies?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To take up a hobby",
          "vietnamese": "Bắt đầu một sở thích mới"
        },
        {
          "phrase": "A leisure activity",
          "vietnamese": "Hoạt động giải trí"
        },
        {
          "phrase": "To be passionate about",
          "vietnamese": "Đam mê về..."
        },
        {
          "phrase": "A creative outlet",
          "vietnamese": "Lối thoát sáng tạo"
        },
        {
          "phrase": "To while away the hours",
          "vietnamese": "Giết thời gian"
        }
      ],
      "model_structures": [
        "I've been interested in... for as long as I can remember.",
        "Whenever I have free time, I tend to... because it helps me...",
        "I recently took up... and I've found it incredibly..."
      ],
      "brainstorming_ideas": [
        "Explain how and when you started your hobby.",
        "Describe what you enjoy most about it.",
        "Mention any benefits it brings to your life."
      ]
    },
    "model_answer": "When it comes to hobbies & interests, I would say that this is something I think about quite often. **To take up a hobby** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a leisure activity** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-hobbies---interests-7",
    "part": 1,
    "topic": "Hobbies & Interests",
    "question": "Do you think hobbies are important for relaxation?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To take up a hobby",
          "vietnamese": "Bắt đầu một sở thích mới"
        },
        {
          "phrase": "A leisure activity",
          "vietnamese": "Hoạt động giải trí"
        },
        {
          "phrase": "To be passionate about",
          "vietnamese": "Đam mê về..."
        },
        {
          "phrase": "A creative outlet",
          "vietnamese": "Lối thoát sáng tạo"
        },
        {
          "phrase": "To while away the hours",
          "vietnamese": "Giết thời gian"
        }
      ],
      "model_structures": [
        "I've been interested in... for as long as I can remember.",
        "Whenever I have free time, I tend to... because it helps me...",
        "I recently took up... and I've found it incredibly..."
      ],
      "brainstorming_ideas": [
        "Explain how and when you started your hobby.",
        "Describe what you enjoy most about it.",
        "Mention any benefits it brings to your life."
      ]
    },
    "model_answer": "When it comes to hobbies & interests, I would say that this is something I think about quite often. **To take up a hobby** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a leisure activity** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-hobbies---interests-8",
    "part": 1,
    "topic": "Hobbies & Interests",
    "question": "Do you share your hobbies with friends?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To take up a hobby",
          "vietnamese": "Bắt đầu một sở thích mới"
        },
        {
          "phrase": "A leisure activity",
          "vietnamese": "Hoạt động giải trí"
        },
        {
          "phrase": "To be passionate about",
          "vietnamese": "Đam mê về..."
        },
        {
          "phrase": "A creative outlet",
          "vietnamese": "Lối thoát sáng tạo"
        },
        {
          "phrase": "To while away the hours",
          "vietnamese": "Giết thời gian"
        }
      ],
      "model_structures": [
        "I've been interested in... for as long as I can remember.",
        "Whenever I have free time, I tend to... because it helps me...",
        "I recently took up... and I've found it incredibly..."
      ],
      "brainstorming_ideas": [
        "Explain how and when you started your hobby.",
        "Describe what you enjoy most about it.",
        "Mention any benefits it brings to your life."
      ]
    },
    "model_answer": "When it comes to hobbies & interests, I would say that this is something I think about quite often. **To take up a hobby** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a leisure activity** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-hobbies---interests-9",
    "part": 1,
    "topic": "Hobbies & Interests",
    "question": "Is your hobby expensive to maintain?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To take up a hobby",
          "vietnamese": "Bắt đầu một sở thích mới"
        },
        {
          "phrase": "A leisure activity",
          "vietnamese": "Hoạt động giải trí"
        },
        {
          "phrase": "To be passionate about",
          "vietnamese": "Đam mê về..."
        },
        {
          "phrase": "A creative outlet",
          "vietnamese": "Lối thoát sáng tạo"
        },
        {
          "phrase": "To while away the hours",
          "vietnamese": "Giết thời gian"
        }
      ],
      "model_structures": [
        "I've been interested in... for as long as I can remember.",
        "Whenever I have free time, I tend to... because it helps me...",
        "I recently took up... and I've found it incredibly..."
      ],
      "brainstorming_ideas": [
        "Explain how and when you started your hobby.",
        "Describe what you enjoy most about it.",
        "Mention any benefits it brings to your life."
      ]
    },
    "model_answer": "When it comes to hobbies & interests, I would say that this is something I think about quite often. **To take up a hobby** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a leisure activity** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-hobbies---interests-10",
    "part": 1,
    "topic": "Hobbies & Interests",
    "question": "What hobby is most popular in your country?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To take up a hobby",
          "vietnamese": "Bắt đầu một sở thích mới"
        },
        {
          "phrase": "A leisure activity",
          "vietnamese": "Hoạt động giải trí"
        },
        {
          "phrase": "To be passionate about",
          "vietnamese": "Đam mê về..."
        },
        {
          "phrase": "A creative outlet",
          "vietnamese": "Lối thoát sáng tạo"
        },
        {
          "phrase": "To while away the hours",
          "vietnamese": "Giết thời gian"
        }
      ],
      "model_structures": [
        "I've been interested in... for as long as I can remember.",
        "Whenever I have free time, I tend to... because it helps me...",
        "I recently took up... and I've found it incredibly..."
      ],
      "brainstorming_ideas": [
        "Explain how and when you started your hobby.",
        "Describe what you enjoy most about it.",
        "Mention any benefits it brings to your life."
      ]
    },
    "model_answer": "When it comes to hobbies & interests, I would say that this is something I think about quite often. **To take up a hobby** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a leisure activity** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-food---cooking-1",
    "part": 1,
    "topic": "Food & Cooking",
    "question": "What is your favorite food?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A mouth-watering dish",
          "vietnamese": "Một món ăn hấp dẫn"
        },
        {
          "phrase": "A balanced diet",
          "vietnamese": "Chế độ ăn cân bằng"
        },
        {
          "phrase": "To have a sweet tooth",
          "vietnamese": "Thích ăn đồ ngọt"
        },
        {
          "phrase": "Home-cooked meals",
          "vietnamese": "Bữa ăn nấu tại nhà"
        },
        {
          "phrase": "To grab a quick bite",
          "vietnamese": "Ăn nhanh một chút"
        }
      ],
      "model_structures": [
        "I have to say, I'm quite a fan of... because...",
        "When it comes to cooking, I'd describe myself as...",
        "In my country, one of the most popular dishes is... which is made from..."
      ],
      "brainstorming_ideas": [
        "Describe your favorite dish and why you like it.",
        "Talk about cooking skills or experiences.",
        "Compare traditional and modern eating habits."
      ]
    },
    "model_answer": "When it comes to food & cooking, I would say that this is something I think about quite often. **A mouth-watering dish** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a balanced diet** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-food---cooking-2",
    "part": 1,
    "topic": "Food & Cooking",
    "question": "Do you enjoy cooking? Why or why not?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A mouth-watering dish",
          "vietnamese": "Một món ăn hấp dẫn"
        },
        {
          "phrase": "A balanced diet",
          "vietnamese": "Chế độ ăn cân bằng"
        },
        {
          "phrase": "To have a sweet tooth",
          "vietnamese": "Thích ăn đồ ngọt"
        },
        {
          "phrase": "Home-cooked meals",
          "vietnamese": "Bữa ăn nấu tại nhà"
        },
        {
          "phrase": "To grab a quick bite",
          "vietnamese": "Ăn nhanh một chút"
        }
      ],
      "model_structures": [
        "I have to say, I'm quite a fan of... because...",
        "When it comes to cooking, I'd describe myself as...",
        "In my country, one of the most popular dishes is... which is made from..."
      ],
      "brainstorming_ideas": [
        "Describe your favorite dish and why you like it.",
        "Talk about cooking skills or experiences.",
        "Compare traditional and modern eating habits."
      ]
    },
    "model_answer": "When it comes to food & cooking, I would say that this is something I think about quite often. **A mouth-watering dish** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a balanced diet** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-food---cooking-3",
    "part": 1,
    "topic": "Food & Cooking",
    "question": "What food is popular in your country?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A mouth-watering dish",
          "vietnamese": "Một món ăn hấp dẫn"
        },
        {
          "phrase": "A balanced diet",
          "vietnamese": "Chế độ ăn cân bằng"
        },
        {
          "phrase": "To have a sweet tooth",
          "vietnamese": "Thích ăn đồ ngọt"
        },
        {
          "phrase": "Home-cooked meals",
          "vietnamese": "Bữa ăn nấu tại nhà"
        },
        {
          "phrase": "To grab a quick bite",
          "vietnamese": "Ăn nhanh một chút"
        }
      ],
      "model_structures": [
        "I have to say, I'm quite a fan of... because...",
        "When it comes to cooking, I'd describe myself as...",
        "In my country, one of the most popular dishes is... which is made from..."
      ],
      "brainstorming_ideas": [
        "Describe your favorite dish and why you like it.",
        "Talk about cooking skills or experiences.",
        "Compare traditional and modern eating habits."
      ]
    },
    "model_answer": "When it comes to food & cooking, I would say that this is something I think about quite often. **A mouth-watering dish** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a balanced diet** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-food---cooking-4",
    "part": 1,
    "topic": "Food & Cooking",
    "question": "Do you prefer eating at home or eating out?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A mouth-watering dish",
          "vietnamese": "Một món ăn hấp dẫn"
        },
        {
          "phrase": "A balanced diet",
          "vietnamese": "Chế độ ăn cân bằng"
        },
        {
          "phrase": "To have a sweet tooth",
          "vietnamese": "Thích ăn đồ ngọt"
        },
        {
          "phrase": "Home-cooked meals",
          "vietnamese": "Bữa ăn nấu tại nhà"
        },
        {
          "phrase": "To grab a quick bite",
          "vietnamese": "Ăn nhanh một chút"
        }
      ],
      "model_structures": [
        "I have to say, I'm quite a fan of... because...",
        "When it comes to cooking, I'd describe myself as...",
        "In my country, one of the most popular dishes is... which is made from..."
      ],
      "brainstorming_ideas": [
        "Describe your favorite dish and why you like it.",
        "Talk about cooking skills or experiences.",
        "Compare traditional and modern eating habits."
      ]
    },
    "model_answer": "When it comes to food & cooking, I would say that this is something I think about quite often. **A mouth-watering dish** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a balanced diet** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-food---cooking-5",
    "part": 1,
    "topic": "Food & Cooking",
    "question": "Have your eating habits changed over the years?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A mouth-watering dish",
          "vietnamese": "Một món ăn hấp dẫn"
        },
        {
          "phrase": "A balanced diet",
          "vietnamese": "Chế độ ăn cân bằng"
        },
        {
          "phrase": "To have a sweet tooth",
          "vietnamese": "Thích ăn đồ ngọt"
        },
        {
          "phrase": "Home-cooked meals",
          "vietnamese": "Bữa ăn nấu tại nhà"
        },
        {
          "phrase": "To grab a quick bite",
          "vietnamese": "Ăn nhanh một chút"
        }
      ],
      "model_structures": [
        "I have to say, I'm quite a fan of... because...",
        "When it comes to cooking, I'd describe myself as...",
        "In my country, one of the most popular dishes is... which is made from..."
      ],
      "brainstorming_ideas": [
        "Describe your favorite dish and why you like it.",
        "Talk about cooking skills or experiences.",
        "Compare traditional and modern eating habits."
      ]
    },
    "model_answer": "When it comes to food & cooking, I would say that this is something I think about quite often. **A mouth-watering dish** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a balanced diet** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-food---cooking-6",
    "part": 1,
    "topic": "Food & Cooking",
    "question": "Do you think it is important to eat healthy food?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A mouth-watering dish",
          "vietnamese": "Một món ăn hấp dẫn"
        },
        {
          "phrase": "A balanced diet",
          "vietnamese": "Chế độ ăn cân bằng"
        },
        {
          "phrase": "To have a sweet tooth",
          "vietnamese": "Thích ăn đồ ngọt"
        },
        {
          "phrase": "Home-cooked meals",
          "vietnamese": "Bữa ăn nấu tại nhà"
        },
        {
          "phrase": "To grab a quick bite",
          "vietnamese": "Ăn nhanh một chút"
        }
      ],
      "model_structures": [
        "I have to say, I'm quite a fan of... because...",
        "When it comes to cooking, I'd describe myself as...",
        "In my country, one of the most popular dishes is... which is made from..."
      ],
      "brainstorming_ideas": [
        "Describe your favorite dish and why you like it.",
        "Talk about cooking skills or experiences.",
        "Compare traditional and modern eating habits."
      ]
    },
    "model_answer": "When it comes to food & cooking, I would say that this is something I think about quite often. **A mouth-watering dish** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a balanced diet** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-food---cooking-7",
    "part": 1,
    "topic": "Food & Cooking",
    "question": "What food did you like as a child?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A mouth-watering dish",
          "vietnamese": "Một món ăn hấp dẫn"
        },
        {
          "phrase": "A balanced diet",
          "vietnamese": "Chế độ ăn cân bằng"
        },
        {
          "phrase": "To have a sweet tooth",
          "vietnamese": "Thích ăn đồ ngọt"
        },
        {
          "phrase": "Home-cooked meals",
          "vietnamese": "Bữa ăn nấu tại nhà"
        },
        {
          "phrase": "To grab a quick bite",
          "vietnamese": "Ăn nhanh một chút"
        }
      ],
      "model_structures": [
        "I have to say, I'm quite a fan of... because...",
        "When it comes to cooking, I'd describe myself as...",
        "In my country, one of the most popular dishes is... which is made from..."
      ],
      "brainstorming_ideas": [
        "Describe your favorite dish and why you like it.",
        "Talk about cooking skills or experiences.",
        "Compare traditional and modern eating habits."
      ]
    },
    "model_answer": "When it comes to food & cooking, I would say that this is something I think about quite often. **A mouth-watering dish** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a balanced diet** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-food---cooking-8",
    "part": 1,
    "topic": "Food & Cooking",
    "question": "Can you cook? When did you learn?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A mouth-watering dish",
          "vietnamese": "Một món ăn hấp dẫn"
        },
        {
          "phrase": "A balanced diet",
          "vietnamese": "Chế độ ăn cân bằng"
        },
        {
          "phrase": "To have a sweet tooth",
          "vietnamese": "Thích ăn đồ ngọt"
        },
        {
          "phrase": "Home-cooked meals",
          "vietnamese": "Bữa ăn nấu tại nhà"
        },
        {
          "phrase": "To grab a quick bite",
          "vietnamese": "Ăn nhanh một chút"
        }
      ],
      "model_structures": [
        "I have to say, I'm quite a fan of... because...",
        "When it comes to cooking, I'd describe myself as...",
        "In my country, one of the most popular dishes is... which is made from..."
      ],
      "brainstorming_ideas": [
        "Describe your favorite dish and why you like it.",
        "Talk about cooking skills or experiences.",
        "Compare traditional and modern eating habits."
      ]
    },
    "model_answer": "When it comes to food & cooking, I would say that this is something I think about quite often. **A mouth-watering dish** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a balanced diet** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-food---cooking-9",
    "part": 1,
    "topic": "Food & Cooking",
    "question": "Do you ever try food from other countries?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A mouth-watering dish",
          "vietnamese": "Một món ăn hấp dẫn"
        },
        {
          "phrase": "A balanced diet",
          "vietnamese": "Chế độ ăn cân bằng"
        },
        {
          "phrase": "To have a sweet tooth",
          "vietnamese": "Thích ăn đồ ngọt"
        },
        {
          "phrase": "Home-cooked meals",
          "vietnamese": "Bữa ăn nấu tại nhà"
        },
        {
          "phrase": "To grab a quick bite",
          "vietnamese": "Ăn nhanh một chút"
        }
      ],
      "model_structures": [
        "I have to say, I'm quite a fan of... because...",
        "When it comes to cooking, I'd describe myself as...",
        "In my country, one of the most popular dishes is... which is made from..."
      ],
      "brainstorming_ideas": [
        "Describe your favorite dish and why you like it.",
        "Talk about cooking skills or experiences.",
        "Compare traditional and modern eating habits."
      ]
    },
    "model_answer": "When it comes to food & cooking, I would say that this is something I think about quite often. **A mouth-watering dish** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a balanced diet** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-food---cooking-10",
    "part": 1,
    "topic": "Food & Cooking",
    "question": "What is a typical breakfast in your country?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A mouth-watering dish",
          "vietnamese": "Một món ăn hấp dẫn"
        },
        {
          "phrase": "A balanced diet",
          "vietnamese": "Chế độ ăn cân bằng"
        },
        {
          "phrase": "To have a sweet tooth",
          "vietnamese": "Thích ăn đồ ngọt"
        },
        {
          "phrase": "Home-cooked meals",
          "vietnamese": "Bữa ăn nấu tại nhà"
        },
        {
          "phrase": "To grab a quick bite",
          "vietnamese": "Ăn nhanh một chút"
        }
      ],
      "model_structures": [
        "I have to say, I'm quite a fan of... because...",
        "When it comes to cooking, I'd describe myself as...",
        "In my country, one of the most popular dishes is... which is made from..."
      ],
      "brainstorming_ideas": [
        "Describe your favorite dish and why you like it.",
        "Talk about cooking skills or experiences.",
        "Compare traditional and modern eating habits."
      ]
    },
    "model_answer": "When it comes to food & cooking, I would say that this is something I think about quite often. **A mouth-watering dish** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a balanced diet** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-weather---seasons-1",
    "part": 1,
    "topic": "Weather & Seasons",
    "question": "What is the weather like in your city?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A scorching summer",
          "vietnamese": "Mùa hè nóng bức"
        },
        {
          "phrase": "A biting cold wind",
          "vietnamese": "Gió rét buốt"
        },
        {
          "phrase": "To be under the weather",
          "vietnamese": "Cảm thấy không khỏe"
        },
        {
          "phrase": "A mild climate",
          "vietnamese": "Khí hậu ôn hòa"
        },
        {
          "phrase": "Unpredictable weather",
          "vietnamese": "Thời tiết khó đoán"
        }
      ],
      "model_structures": [
        "The weather in my city is generally..., especially during...",
        "My favorite season would have to be... because...",
        "I think the weather has a significant impact on... because..."
      ],
      "brainstorming_ideas": [
        "Describe the typical climate in your region.",
        "Explain how weather affects your activities and mood.",
        "Compare different seasons and their characteristics."
      ]
    },
    "model_answer": "When it comes to weather & seasons, I would say that this is something I think about quite often. **A scorching summer** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a biting cold wind** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-weather---seasons-2",
    "part": 1,
    "topic": "Weather & Seasons",
    "question": "What is your favorite season? Why?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A scorching summer",
          "vietnamese": "Mùa hè nóng bức"
        },
        {
          "phrase": "A biting cold wind",
          "vietnamese": "Gió rét buốt"
        },
        {
          "phrase": "To be under the weather",
          "vietnamese": "Cảm thấy không khỏe"
        },
        {
          "phrase": "A mild climate",
          "vietnamese": "Khí hậu ôn hòa"
        },
        {
          "phrase": "Unpredictable weather",
          "vietnamese": "Thời tiết khó đoán"
        }
      ],
      "model_structures": [
        "The weather in my city is generally..., especially during...",
        "My favorite season would have to be... because...",
        "I think the weather has a significant impact on... because..."
      ],
      "brainstorming_ideas": [
        "Describe the typical climate in your region.",
        "Explain how weather affects your activities and mood.",
        "Compare different seasons and their characteristics."
      ]
    },
    "model_answer": "When it comes to weather & seasons, I would say that this is something I think about quite often. **A scorching summer** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a biting cold wind** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-weather---seasons-3",
    "part": 1,
    "topic": "Weather & Seasons",
    "question": "Does the weather affect your mood?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A scorching summer",
          "vietnamese": "Mùa hè nóng bức"
        },
        {
          "phrase": "A biting cold wind",
          "vietnamese": "Gió rét buốt"
        },
        {
          "phrase": "To be under the weather",
          "vietnamese": "Cảm thấy không khỏe"
        },
        {
          "phrase": "A mild climate",
          "vietnamese": "Khí hậu ôn hòa"
        },
        {
          "phrase": "Unpredictable weather",
          "vietnamese": "Thời tiết khó đoán"
        }
      ],
      "model_structures": [
        "The weather in my city is generally..., especially during...",
        "My favorite season would have to be... because...",
        "I think the weather has a significant impact on... because..."
      ],
      "brainstorming_ideas": [
        "Describe the typical climate in your region.",
        "Explain how weather affects your activities and mood.",
        "Compare different seasons and their characteristics."
      ]
    },
    "model_answer": "When it comes to weather & seasons, I would say that this is something I think about quite often. **A scorching summer** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a biting cold wind** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-weather---seasons-4",
    "part": 1,
    "topic": "Weather & Seasons",
    "question": "Do you prefer hot or cold weather?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A scorching summer",
          "vietnamese": "Mùa hè nóng bức"
        },
        {
          "phrase": "A biting cold wind",
          "vietnamese": "Gió rét buốt"
        },
        {
          "phrase": "To be under the weather",
          "vietnamese": "Cảm thấy không khỏe"
        },
        {
          "phrase": "A mild climate",
          "vietnamese": "Khí hậu ôn hòa"
        },
        {
          "phrase": "Unpredictable weather",
          "vietnamese": "Thời tiết khó đoán"
        }
      ],
      "model_structures": [
        "The weather in my city is generally..., especially during...",
        "My favorite season would have to be... because...",
        "I think the weather has a significant impact on... because..."
      ],
      "brainstorming_ideas": [
        "Describe the typical climate in your region.",
        "Explain how weather affects your activities and mood.",
        "Compare different seasons and their characteristics."
      ]
    },
    "model_answer": "When it comes to weather & seasons, I would say that this is something I think about quite often. **A scorching summer** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a biting cold wind** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-weather---seasons-5",
    "part": 1,
    "topic": "Weather & Seasons",
    "question": "What do you usually do on rainy days?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A scorching summer",
          "vietnamese": "Mùa hè nóng bức"
        },
        {
          "phrase": "A biting cold wind",
          "vietnamese": "Gió rét buốt"
        },
        {
          "phrase": "To be under the weather",
          "vietnamese": "Cảm thấy không khỏe"
        },
        {
          "phrase": "A mild climate",
          "vietnamese": "Khí hậu ôn hòa"
        },
        {
          "phrase": "Unpredictable weather",
          "vietnamese": "Thời tiết khó đoán"
        }
      ],
      "model_structures": [
        "The weather in my city is generally..., especially during...",
        "My favorite season would have to be... because...",
        "I think the weather has a significant impact on... because..."
      ],
      "brainstorming_ideas": [
        "Describe the typical climate in your region.",
        "Explain how weather affects your activities and mood.",
        "Compare different seasons and their characteristics."
      ]
    },
    "model_answer": "When it comes to weather & seasons, I would say that this is something I think about quite often. **A scorching summer** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a biting cold wind** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-weather---seasons-6",
    "part": 1,
    "topic": "Weather & Seasons",
    "question": "Has the weather in your area changed over the years?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A scorching summer",
          "vietnamese": "Mùa hè nóng bức"
        },
        {
          "phrase": "A biting cold wind",
          "vietnamese": "Gió rét buốt"
        },
        {
          "phrase": "To be under the weather",
          "vietnamese": "Cảm thấy không khỏe"
        },
        {
          "phrase": "A mild climate",
          "vietnamese": "Khí hậu ôn hòa"
        },
        {
          "phrase": "Unpredictable weather",
          "vietnamese": "Thời tiết khó đoán"
        }
      ],
      "model_structures": [
        "The weather in my city is generally..., especially during...",
        "My favorite season would have to be... because...",
        "I think the weather has a significant impact on... because..."
      ],
      "brainstorming_ideas": [
        "Describe the typical climate in your region.",
        "Explain how weather affects your activities and mood.",
        "Compare different seasons and their characteristics."
      ]
    },
    "model_answer": "When it comes to weather & seasons, I would say that this is something I think about quite often. **A scorching summer** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a biting cold wind** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-weather---seasons-7",
    "part": 1,
    "topic": "Weather & Seasons",
    "question": "Do you check the weather forecast regularly?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A scorching summer",
          "vietnamese": "Mùa hè nóng bức"
        },
        {
          "phrase": "A biting cold wind",
          "vietnamese": "Gió rét buốt"
        },
        {
          "phrase": "To be under the weather",
          "vietnamese": "Cảm thấy không khỏe"
        },
        {
          "phrase": "A mild climate",
          "vietnamese": "Khí hậu ôn hòa"
        },
        {
          "phrase": "Unpredictable weather",
          "vietnamese": "Thời tiết khó đoán"
        }
      ],
      "model_structures": [
        "The weather in my city is generally..., especially during...",
        "My favorite season would have to be... because...",
        "I think the weather has a significant impact on... because..."
      ],
      "brainstorming_ideas": [
        "Describe the typical climate in your region.",
        "Explain how weather affects your activities and mood.",
        "Compare different seasons and their characteristics."
      ]
    },
    "model_answer": "When it comes to weather & seasons, I would say that this is something I think about quite often. **A scorching summer** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a biting cold wind** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-weather---seasons-8",
    "part": 1,
    "topic": "Weather & Seasons",
    "question": "What is the best season to visit your country?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A scorching summer",
          "vietnamese": "Mùa hè nóng bức"
        },
        {
          "phrase": "A biting cold wind",
          "vietnamese": "Gió rét buốt"
        },
        {
          "phrase": "To be under the weather",
          "vietnamese": "Cảm thấy không khỏe"
        },
        {
          "phrase": "A mild climate",
          "vietnamese": "Khí hậu ôn hòa"
        },
        {
          "phrase": "Unpredictable weather",
          "vietnamese": "Thời tiết khó đoán"
        }
      ],
      "model_structures": [
        "The weather in my city is generally..., especially during...",
        "My favorite season would have to be... because...",
        "I think the weather has a significant impact on... because..."
      ],
      "brainstorming_ideas": [
        "Describe the typical climate in your region.",
        "Explain how weather affects your activities and mood.",
        "Compare different seasons and their characteristics."
      ]
    },
    "model_answer": "When it comes to weather & seasons, I would say that this is something I think about quite often. **A scorching summer** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a biting cold wind** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-weather---seasons-9",
    "part": 1,
    "topic": "Weather & Seasons",
    "question": "Do you think climate change is a serious problem?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A scorching summer",
          "vietnamese": "Mùa hè nóng bức"
        },
        {
          "phrase": "A biting cold wind",
          "vietnamese": "Gió rét buốt"
        },
        {
          "phrase": "To be under the weather",
          "vietnamese": "Cảm thấy không khỏe"
        },
        {
          "phrase": "A mild climate",
          "vietnamese": "Khí hậu ôn hòa"
        },
        {
          "phrase": "Unpredictable weather",
          "vietnamese": "Thời tiết khó đoán"
        }
      ],
      "model_structures": [
        "The weather in my city is generally..., especially during...",
        "My favorite season would have to be... because...",
        "I think the weather has a significant impact on... because..."
      ],
      "brainstorming_ideas": [
        "Describe the typical climate in your region.",
        "Explain how weather affects your activities and mood.",
        "Compare different seasons and their characteristics."
      ]
    },
    "model_answer": "When it comes to weather & seasons, I would say that this is something I think about quite often. **A scorching summer** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a biting cold wind** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-weather---seasons-10",
    "part": 1,
    "topic": "Weather & Seasons",
    "question": "How does the weather affect people's daily activities?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A scorching summer",
          "vietnamese": "Mùa hè nóng bức"
        },
        {
          "phrase": "A biting cold wind",
          "vietnamese": "Gió rét buốt"
        },
        {
          "phrase": "To be under the weather",
          "vietnamese": "Cảm thấy không khỏe"
        },
        {
          "phrase": "A mild climate",
          "vietnamese": "Khí hậu ôn hòa"
        },
        {
          "phrase": "Unpredictable weather",
          "vietnamese": "Thời tiết khó đoán"
        }
      ],
      "model_structures": [
        "The weather in my city is generally..., especially during...",
        "My favorite season would have to be... because...",
        "I think the weather has a significant impact on... because..."
      ],
      "brainstorming_ideas": [
        "Describe the typical climate in your region.",
        "Explain how weather affects your activities and mood.",
        "Compare different seasons and their characteristics."
      ]
    },
    "model_answer": "When it comes to weather & seasons, I would say that this is something I think about quite often. **A scorching summer** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a biting cold wind** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-music-1",
    "part": 1,
    "topic": "Music",
    "question": "Do you enjoy listening to music?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To be a huge fan of",
          "vietnamese": "Là fan cuồng của..."
        },
        {
          "phrase": "A catchy tune",
          "vietnamese": "Một giai điệu bắt tai"
        },
        {
          "phrase": "To have an ear for music",
          "vietnamese": "Có tai nghe nhạc"
        },
        {
          "phrase": "To set the mood",
          "vietnamese": "Tạo không khí"
        },
        {
          "phrase": "Live performance",
          "vietnamese": "Biểu diễn trực tiếp"
        }
      ],
      "model_structures": [
        "I'm a huge fan of... music because it really...",
        "I've been listening to... for years, and it always...",
        "Music plays a significant role in my life because..."
      ],
      "brainstorming_ideas": [
        "Share your music preferences and how they developed.",
        "Mention any instruments you play or would like to learn.",
        "Talk about the role of music in social gatherings or culture."
      ]
    },
    "model_answer": "When it comes to music, I would say that this is something I think about quite often. **To be a huge fan of** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a catchy tune** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-music-2",
    "part": 1,
    "topic": "Music",
    "question": "What type of music do you like?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To be a huge fan of",
          "vietnamese": "Là fan cuồng của..."
        },
        {
          "phrase": "A catchy tune",
          "vietnamese": "Một giai điệu bắt tai"
        },
        {
          "phrase": "To have an ear for music",
          "vietnamese": "Có tai nghe nhạc"
        },
        {
          "phrase": "To set the mood",
          "vietnamese": "Tạo không khí"
        },
        {
          "phrase": "Live performance",
          "vietnamese": "Biểu diễn trực tiếp"
        }
      ],
      "model_structures": [
        "I'm a huge fan of... music because it really...",
        "I've been listening to... for years, and it always...",
        "Music plays a significant role in my life because..."
      ],
      "brainstorming_ideas": [
        "Share your music preferences and how they developed.",
        "Mention any instruments you play or would like to learn.",
        "Talk about the role of music in social gatherings or culture."
      ]
    },
    "model_answer": "When it comes to music, I would say that this is something I think about quite often. **To be a huge fan of** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a catchy tune** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-music-3",
    "part": 1,
    "topic": "Music",
    "question": "Have your music preferences changed over the years?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To be a huge fan of",
          "vietnamese": "Là fan cuồng của..."
        },
        {
          "phrase": "A catchy tune",
          "vietnamese": "Một giai điệu bắt tai"
        },
        {
          "phrase": "To have an ear for music",
          "vietnamese": "Có tai nghe nhạc"
        },
        {
          "phrase": "To set the mood",
          "vietnamese": "Tạo không khí"
        },
        {
          "phrase": "Live performance",
          "vietnamese": "Biểu diễn trực tiếp"
        }
      ],
      "model_structures": [
        "I'm a huge fan of... music because it really...",
        "I've been listening to... for years, and it always...",
        "Music plays a significant role in my life because..."
      ],
      "brainstorming_ideas": [
        "Share your music preferences and how they developed.",
        "Mention any instruments you play or would like to learn.",
        "Talk about the role of music in social gatherings or culture."
      ]
    },
    "model_answer": "When it comes to music, I would say that this is something I think about quite often. **To be a huge fan of** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a catchy tune** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-music-4",
    "part": 1,
    "topic": "Music",
    "question": "Can you play any musical instruments?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To be a huge fan of",
          "vietnamese": "Là fan cuồng của..."
        },
        {
          "phrase": "A catchy tune",
          "vietnamese": "Một giai điệu bắt tai"
        },
        {
          "phrase": "To have an ear for music",
          "vietnamese": "Có tai nghe nhạc"
        },
        {
          "phrase": "To set the mood",
          "vietnamese": "Tạo không khí"
        },
        {
          "phrase": "Live performance",
          "vietnamese": "Biểu diễn trực tiếp"
        }
      ],
      "model_structures": [
        "I'm a huge fan of... music because it really...",
        "I've been listening to... for years, and it always...",
        "Music plays a significant role in my life because..."
      ],
      "brainstorming_ideas": [
        "Share your music preferences and how they developed.",
        "Mention any instruments you play or would like to learn.",
        "Talk about the role of music in social gatherings or culture."
      ]
    },
    "model_answer": "When it comes to music, I would say that this is something I think about quite often. **To be a huge fan of** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a catchy tune** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-music-5",
    "part": 1,
    "topic": "Music",
    "question": "Do you prefer listening to music alone or with others?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To be a huge fan of",
          "vietnamese": "Là fan cuồng của..."
        },
        {
          "phrase": "A catchy tune",
          "vietnamese": "Một giai điệu bắt tai"
        },
        {
          "phrase": "To have an ear for music",
          "vietnamese": "Có tai nghe nhạc"
        },
        {
          "phrase": "To set the mood",
          "vietnamese": "Tạo không khí"
        },
        {
          "phrase": "Live performance",
          "vietnamese": "Biểu diễn trực tiếp"
        }
      ],
      "model_structures": [
        "I'm a huge fan of... music because it really...",
        "I've been listening to... for years, and it always...",
        "Music plays a significant role in my life because..."
      ],
      "brainstorming_ideas": [
        "Share your music preferences and how they developed.",
        "Mention any instruments you play or would like to learn.",
        "Talk about the role of music in social gatherings or culture."
      ]
    },
    "model_answer": "When it comes to music, I would say that this is something I think about quite often. **To be a huge fan of** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a catchy tune** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-music-6",
    "part": 1,
    "topic": "Music",
    "question": "How often do you listen to music?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To be a huge fan of",
          "vietnamese": "Là fan cuồng của..."
        },
        {
          "phrase": "A catchy tune",
          "vietnamese": "Một giai điệu bắt tai"
        },
        {
          "phrase": "To have an ear for music",
          "vietnamese": "Có tai nghe nhạc"
        },
        {
          "phrase": "To set the mood",
          "vietnamese": "Tạo không khí"
        },
        {
          "phrase": "Live performance",
          "vietnamese": "Biểu diễn trực tiếp"
        }
      ],
      "model_structures": [
        "I'm a huge fan of... music because it really...",
        "I've been listening to... for years, and it always...",
        "Music plays a significant role in my life because..."
      ],
      "brainstorming_ideas": [
        "Share your music preferences and how they developed.",
        "Mention any instruments you play or would like to learn.",
        "Talk about the role of music in social gatherings or culture."
      ]
    },
    "model_answer": "When it comes to music, I would say that this is something I think about quite often. **To be a huge fan of** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a catchy tune** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-music-7",
    "part": 1,
    "topic": "Music",
    "question": "Do you like to sing? Why or why not?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To be a huge fan of",
          "vietnamese": "Là fan cuồng của..."
        },
        {
          "phrase": "A catchy tune",
          "vietnamese": "Một giai điệu bắt tai"
        },
        {
          "phrase": "To have an ear for music",
          "vietnamese": "Có tai nghe nhạc"
        },
        {
          "phrase": "To set the mood",
          "vietnamese": "Tạo không khí"
        },
        {
          "phrase": "Live performance",
          "vietnamese": "Biểu diễn trực tiếp"
        }
      ],
      "model_structures": [
        "I'm a huge fan of... music because it really...",
        "I've been listening to... for years, and it always...",
        "Music plays a significant role in my life because..."
      ],
      "brainstorming_ideas": [
        "Share your music preferences and how they developed.",
        "Mention any instruments you play or would like to learn.",
        "Talk about the role of music in social gatherings or culture."
      ]
    },
    "model_answer": "When it comes to music, I would say that this is something I think about quite often. **To be a huge fan of** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a catchy tune** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-music-8",
    "part": 1,
    "topic": "Music",
    "question": "What role does music play in your culture?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To be a huge fan of",
          "vietnamese": "Là fan cuồng của..."
        },
        {
          "phrase": "A catchy tune",
          "vietnamese": "Một giai điệu bắt tai"
        },
        {
          "phrase": "To have an ear for music",
          "vietnamese": "Có tai nghe nhạc"
        },
        {
          "phrase": "To set the mood",
          "vietnamese": "Tạo không khí"
        },
        {
          "phrase": "Live performance",
          "vietnamese": "Biểu diễn trực tiếp"
        }
      ],
      "model_structures": [
        "I'm a huge fan of... music because it really...",
        "I've been listening to... for years, and it always...",
        "Music plays a significant role in my life because..."
      ],
      "brainstorming_ideas": [
        "Share your music preferences and how they developed.",
        "Mention any instruments you play or would like to learn.",
        "Talk about the role of music in social gatherings or culture."
      ]
    },
    "model_answer": "When it comes to music, I would say that this is something I think about quite often. **To be a huge fan of** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a catchy tune** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-music-9",
    "part": 1,
    "topic": "Music",
    "question": "Do you listen to music while studying or working?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To be a huge fan of",
          "vietnamese": "Là fan cuồng của..."
        },
        {
          "phrase": "A catchy tune",
          "vietnamese": "Một giai điệu bắt tai"
        },
        {
          "phrase": "To have an ear for music",
          "vietnamese": "Có tai nghe nhạc"
        },
        {
          "phrase": "To set the mood",
          "vietnamese": "Tạo không khí"
        },
        {
          "phrase": "Live performance",
          "vietnamese": "Biểu diễn trực tiếp"
        }
      ],
      "model_structures": [
        "I'm a huge fan of... music because it really...",
        "I've been listening to... for years, and it always...",
        "Music plays a significant role in my life because..."
      ],
      "brainstorming_ideas": [
        "Share your music preferences and how they developed.",
        "Mention any instruments you play or would like to learn.",
        "Talk about the role of music in social gatherings or culture."
      ]
    },
    "model_answer": "When it comes to music, I would say that this is something I think about quite often. **To be a huge fan of** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a catchy tune** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-music-10",
    "part": 1,
    "topic": "Music",
    "question": "Have you ever been to a live concert?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To be a huge fan of",
          "vietnamese": "Là fan cuồng của..."
        },
        {
          "phrase": "A catchy tune",
          "vietnamese": "Một giai điệu bắt tai"
        },
        {
          "phrase": "To have an ear for music",
          "vietnamese": "Có tai nghe nhạc"
        },
        {
          "phrase": "To set the mood",
          "vietnamese": "Tạo không khí"
        },
        {
          "phrase": "Live performance",
          "vietnamese": "Biểu diễn trực tiếp"
        }
      ],
      "model_structures": [
        "I'm a huge fan of... music because it really...",
        "I've been listening to... for years, and it always...",
        "Music plays a significant role in my life because..."
      ],
      "brainstorming_ideas": [
        "Share your music preferences and how they developed.",
        "Mention any instruments you play or would like to learn.",
        "Talk about the role of music in social gatherings or culture."
      ]
    },
    "model_answer": "When it comes to music, I would say that this is something I think about quite often. **To be a huge fan of** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a catchy tune** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-sports---exercise-1",
    "part": 1,
    "topic": "Sports & Exercise",
    "question": "Do you enjoy playing sports?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To keep fit and healthy",
          "vietnamese": "Giữ gìn sức khỏe"
        },
        {
          "phrase": "A die-hard fan",
          "vietnamese": "Fan cuồng nhiệt"
        },
        {
          "phrase": "To work out regularly",
          "vietnamese": "Tập luyện thường xuyên"
        },
        {
          "phrase": "Team spirit",
          "vietnamese": "Tinh thần đồng đội"
        },
        {
          "phrase": "To push one's limits",
          "vietnamese": "Vượt qua giới hạn bản thân"
        }
      ],
      "model_structures": [
        "I try to... at least... times a week because...",
        "I've been playing... since I was young, and I still enjoy it.",
        "In my country, the most popular sport is definitely... because..."
      ],
      "brainstorming_ideas": [
        "Describe your exercise routine or favorite sport.",
        "Talk about the physical and mental benefits of exercise.",
        "Mention any sports events or teams you follow."
      ]
    },
    "model_answer": "When it comes to sports & exercise, I would say that this is something I think about quite often. **To keep fit and healthy** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a die-hard fan** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-sports---exercise-2",
    "part": 1,
    "topic": "Sports & Exercise",
    "question": "What sports are popular in your country?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To keep fit and healthy",
          "vietnamese": "Giữ gìn sức khỏe"
        },
        {
          "phrase": "A die-hard fan",
          "vietnamese": "Fan cuồng nhiệt"
        },
        {
          "phrase": "To work out regularly",
          "vietnamese": "Tập luyện thường xuyên"
        },
        {
          "phrase": "Team spirit",
          "vietnamese": "Tinh thần đồng đội"
        },
        {
          "phrase": "To push one's limits",
          "vietnamese": "Vượt qua giới hạn bản thân"
        }
      ],
      "model_structures": [
        "I try to... at least... times a week because...",
        "I've been playing... since I was young, and I still enjoy it.",
        "In my country, the most popular sport is definitely... because..."
      ],
      "brainstorming_ideas": [
        "Describe your exercise routine or favorite sport.",
        "Talk about the physical and mental benefits of exercise.",
        "Mention any sports events or teams you follow."
      ]
    },
    "model_answer": "When it comes to sports & exercise, I would say that this is something I think about quite often. **To keep fit and healthy** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a die-hard fan** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-sports---exercise-3",
    "part": 1,
    "topic": "Sports & Exercise",
    "question": "How often do you exercise?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To keep fit and healthy",
          "vietnamese": "Giữ gìn sức khỏe"
        },
        {
          "phrase": "A die-hard fan",
          "vietnamese": "Fan cuồng nhiệt"
        },
        {
          "phrase": "To work out regularly",
          "vietnamese": "Tập luyện thường xuyên"
        },
        {
          "phrase": "Team spirit",
          "vietnamese": "Tinh thần đồng đội"
        },
        {
          "phrase": "To push one's limits",
          "vietnamese": "Vượt qua giới hạn bản thân"
        }
      ],
      "model_structures": [
        "I try to... at least... times a week because...",
        "I've been playing... since I was young, and I still enjoy it.",
        "In my country, the most popular sport is definitely... because..."
      ],
      "brainstorming_ideas": [
        "Describe your exercise routine or favorite sport.",
        "Talk about the physical and mental benefits of exercise.",
        "Mention any sports events or teams you follow."
      ]
    },
    "model_answer": "When it comes to sports & exercise, I would say that this is something I think about quite often. **To keep fit and healthy** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a die-hard fan** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-sports---exercise-4",
    "part": 1,
    "topic": "Sports & Exercise",
    "question": "Did you play sports as a child?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To keep fit and healthy",
          "vietnamese": "Giữ gìn sức khỏe"
        },
        {
          "phrase": "A die-hard fan",
          "vietnamese": "Fan cuồng nhiệt"
        },
        {
          "phrase": "To work out regularly",
          "vietnamese": "Tập luyện thường xuyên"
        },
        {
          "phrase": "Team spirit",
          "vietnamese": "Tinh thần đồng đội"
        },
        {
          "phrase": "To push one's limits",
          "vietnamese": "Vượt qua giới hạn bản thân"
        }
      ],
      "model_structures": [
        "I try to... at least... times a week because...",
        "I've been playing... since I was young, and I still enjoy it.",
        "In my country, the most popular sport is definitely... because..."
      ],
      "brainstorming_ideas": [
        "Describe your exercise routine or favorite sport.",
        "Talk about the physical and mental benefits of exercise.",
        "Mention any sports events or teams you follow."
      ]
    },
    "model_answer": "When it comes to sports & exercise, I would say that this is something I think about quite often. **To keep fit and healthy** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a die-hard fan** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-sports---exercise-5",
    "part": 1,
    "topic": "Sports & Exercise",
    "question": "Do you prefer watching or playing sports?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To keep fit and healthy",
          "vietnamese": "Giữ gìn sức khỏe"
        },
        {
          "phrase": "A die-hard fan",
          "vietnamese": "Fan cuồng nhiệt"
        },
        {
          "phrase": "To work out regularly",
          "vietnamese": "Tập luyện thường xuyên"
        },
        {
          "phrase": "Team spirit",
          "vietnamese": "Tinh thần đồng đội"
        },
        {
          "phrase": "To push one's limits",
          "vietnamese": "Vượt qua giới hạn bản thân"
        }
      ],
      "model_structures": [
        "I try to... at least... times a week because...",
        "I've been playing... since I was young, and I still enjoy it.",
        "In my country, the most popular sport is definitely... because..."
      ],
      "brainstorming_ideas": [
        "Describe your exercise routine or favorite sport.",
        "Talk about the physical and mental benefits of exercise.",
        "Mention any sports events or teams you follow."
      ]
    },
    "model_answer": "When it comes to sports & exercise, I would say that this is something I think about quite often. **To keep fit and healthy** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a die-hard fan** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-sports---exercise-6",
    "part": 1,
    "topic": "Sports & Exercise",
    "question": "What is your favorite sport to watch?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To keep fit and healthy",
          "vietnamese": "Giữ gìn sức khỏe"
        },
        {
          "phrase": "A die-hard fan",
          "vietnamese": "Fan cuồng nhiệt"
        },
        {
          "phrase": "To work out regularly",
          "vietnamese": "Tập luyện thường xuyên"
        },
        {
          "phrase": "Team spirit",
          "vietnamese": "Tinh thần đồng đội"
        },
        {
          "phrase": "To push one's limits",
          "vietnamese": "Vượt qua giới hạn bản thân"
        }
      ],
      "model_structures": [
        "I try to... at least... times a week because...",
        "I've been playing... since I was young, and I still enjoy it.",
        "In my country, the most popular sport is definitely... because..."
      ],
      "brainstorming_ideas": [
        "Describe your exercise routine or favorite sport.",
        "Talk about the physical and mental benefits of exercise.",
        "Mention any sports events or teams you follow."
      ]
    },
    "model_answer": "When it comes to sports & exercise, I would say that this is something I think about quite often. **To keep fit and healthy** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a die-hard fan** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-sports---exercise-7",
    "part": 1,
    "topic": "Sports & Exercise",
    "question": "Do you think exercise is important for health?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To keep fit and healthy",
          "vietnamese": "Giữ gìn sức khỏe"
        },
        {
          "phrase": "A die-hard fan",
          "vietnamese": "Fan cuồng nhiệt"
        },
        {
          "phrase": "To work out regularly",
          "vietnamese": "Tập luyện thường xuyên"
        },
        {
          "phrase": "Team spirit",
          "vietnamese": "Tinh thần đồng đội"
        },
        {
          "phrase": "To push one's limits",
          "vietnamese": "Vượt qua giới hạn bản thân"
        }
      ],
      "model_structures": [
        "I try to... at least... times a week because...",
        "I've been playing... since I was young, and I still enjoy it.",
        "In my country, the most popular sport is definitely... because..."
      ],
      "brainstorming_ideas": [
        "Describe your exercise routine or favorite sport.",
        "Talk about the physical and mental benefits of exercise.",
        "Mention any sports events or teams you follow."
      ]
    },
    "model_answer": "When it comes to sports & exercise, I would say that this is something I think about quite often. **To keep fit and healthy** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a die-hard fan** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-sports---exercise-8",
    "part": 1,
    "topic": "Sports & Exercise",
    "question": "Would you like to try any new sports?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To keep fit and healthy",
          "vietnamese": "Giữ gìn sức khỏe"
        },
        {
          "phrase": "A die-hard fan",
          "vietnamese": "Fan cuồng nhiệt"
        },
        {
          "phrase": "To work out regularly",
          "vietnamese": "Tập luyện thường xuyên"
        },
        {
          "phrase": "Team spirit",
          "vietnamese": "Tinh thần đồng đội"
        },
        {
          "phrase": "To push one's limits",
          "vietnamese": "Vượt qua giới hạn bản thân"
        }
      ],
      "model_structures": [
        "I try to... at least... times a week because...",
        "I've been playing... since I was young, and I still enjoy it.",
        "In my country, the most popular sport is definitely... because..."
      ],
      "brainstorming_ideas": [
        "Describe your exercise routine or favorite sport.",
        "Talk about the physical and mental benefits of exercise.",
        "Mention any sports events or teams you follow."
      ]
    },
    "model_answer": "When it comes to sports & exercise, I would say that this is something I think about quite often. **To keep fit and healthy** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a die-hard fan** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-sports---exercise-9",
    "part": 1,
    "topic": "Sports & Exercise",
    "question": "Do you prefer team sports or individual sports?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To keep fit and healthy",
          "vietnamese": "Giữ gìn sức khỏe"
        },
        {
          "phrase": "A die-hard fan",
          "vietnamese": "Fan cuồng nhiệt"
        },
        {
          "phrase": "To work out regularly",
          "vietnamese": "Tập luyện thường xuyên"
        },
        {
          "phrase": "Team spirit",
          "vietnamese": "Tinh thần đồng đội"
        },
        {
          "phrase": "To push one's limits",
          "vietnamese": "Vượt qua giới hạn bản thân"
        }
      ],
      "model_structures": [
        "I try to... at least... times a week because...",
        "I've been playing... since I was young, and I still enjoy it.",
        "In my country, the most popular sport is definitely... because..."
      ],
      "brainstorming_ideas": [
        "Describe your exercise routine or favorite sport.",
        "Talk about the physical and mental benefits of exercise.",
        "Mention any sports events or teams you follow."
      ]
    },
    "model_answer": "When it comes to sports & exercise, I would say that this is something I think about quite often. **To keep fit and healthy** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a die-hard fan** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-sports---exercise-10",
    "part": 1,
    "topic": "Sports & Exercise",
    "question": "Is there a sports event you follow regularly?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To keep fit and healthy",
          "vietnamese": "Giữ gìn sức khỏe"
        },
        {
          "phrase": "A die-hard fan",
          "vietnamese": "Fan cuồng nhiệt"
        },
        {
          "phrase": "To work out regularly",
          "vietnamese": "Tập luyện thường xuyên"
        },
        {
          "phrase": "Team spirit",
          "vietnamese": "Tinh thần đồng đội"
        },
        {
          "phrase": "To push one's limits",
          "vietnamese": "Vượt qua giới hạn bản thân"
        }
      ],
      "model_structures": [
        "I try to... at least... times a week because...",
        "I've been playing... since I was young, and I still enjoy it.",
        "In my country, the most popular sport is definitely... because..."
      ],
      "brainstorming_ideas": [
        "Describe your exercise routine or favorite sport.",
        "Talk about the physical and mental benefits of exercise.",
        "Mention any sports events or teams you follow."
      ]
    },
    "model_answer": "When it comes to sports & exercise, I would say that this is something I think about quite often. **To keep fit and healthy** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **a die-hard fan** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-reading-1",
    "part": 1,
    "topic": "Reading",
    "question": "Do you enjoy reading?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A page-turner",
          "vietnamese": "Một cuốn sách hấp dẫn"
        },
        {
          "phrase": "To be an avid reader",
          "vietnamese": "Là người đọc say mê"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "A thought-provoking book",
          "vietnamese": "Cuốn sách gợi suy nghĩ"
        },
        {
          "phrase": "To lose oneself in a story",
          "vietnamese": "Đắm chìm trong câu chuyện"
        }
      ],
      "model_structures": [
        "I enjoy reading... because they help me...",
        "The last book I read was... and I found it incredibly...",
        "I think reading is essential because it allows you to..."
      ],
      "brainstorming_ideas": [
        "Share your reading habits and preferred genres.",
        "Mention a book that made a strong impression on you.",
        "Compare reading physical books with digital alternatives."
      ]
    },
    "model_answer": "When it comes to reading, I would say that this is something I think about quite often. **A page-turner** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **to be an avid reader** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-reading-2",
    "part": 1,
    "topic": "Reading",
    "question": "What type of books do you like?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A page-turner",
          "vietnamese": "Một cuốn sách hấp dẫn"
        },
        {
          "phrase": "To be an avid reader",
          "vietnamese": "Là người đọc say mê"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "A thought-provoking book",
          "vietnamese": "Cuốn sách gợi suy nghĩ"
        },
        {
          "phrase": "To lose oneself in a story",
          "vietnamese": "Đắm chìm trong câu chuyện"
        }
      ],
      "model_structures": [
        "I enjoy reading... because they help me...",
        "The last book I read was... and I found it incredibly...",
        "I think reading is essential because it allows you to..."
      ],
      "brainstorming_ideas": [
        "Share your reading habits and preferred genres.",
        "Mention a book that made a strong impression on you.",
        "Compare reading physical books with digital alternatives."
      ]
    },
    "model_answer": "When it comes to reading, I would say that this is something I think about quite often. **A page-turner** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **to be an avid reader** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-reading-3",
    "part": 1,
    "topic": "Reading",
    "question": "Do you prefer reading physical books or e-books?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A page-turner",
          "vietnamese": "Một cuốn sách hấp dẫn"
        },
        {
          "phrase": "To be an avid reader",
          "vietnamese": "Là người đọc say mê"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "A thought-provoking book",
          "vietnamese": "Cuốn sách gợi suy nghĩ"
        },
        {
          "phrase": "To lose oneself in a story",
          "vietnamese": "Đắm chìm trong câu chuyện"
        }
      ],
      "model_structures": [
        "I enjoy reading... because they help me...",
        "The last book I read was... and I found it incredibly...",
        "I think reading is essential because it allows you to..."
      ],
      "brainstorming_ideas": [
        "Share your reading habits and preferred genres.",
        "Mention a book that made a strong impression on you.",
        "Compare reading physical books with digital alternatives."
      ]
    },
    "model_answer": "When it comes to reading, I would say that this is something I think about quite often. **A page-turner** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **to be an avid reader** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-reading-4",
    "part": 1,
    "topic": "Reading",
    "question": "How often do you read?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A page-turner",
          "vietnamese": "Một cuốn sách hấp dẫn"
        },
        {
          "phrase": "To be an avid reader",
          "vietnamese": "Là người đọc say mê"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "A thought-provoking book",
          "vietnamese": "Cuốn sách gợi suy nghĩ"
        },
        {
          "phrase": "To lose oneself in a story",
          "vietnamese": "Đắm chìm trong câu chuyện"
        }
      ],
      "model_structures": [
        "I enjoy reading... because they help me...",
        "The last book I read was... and I found it incredibly...",
        "I think reading is essential because it allows you to..."
      ],
      "brainstorming_ideas": [
        "Share your reading habits and preferred genres.",
        "Mention a book that made a strong impression on you.",
        "Compare reading physical books with digital alternatives."
      ]
    },
    "model_answer": "When it comes to reading, I would say that this is something I think about quite often. **A page-turner** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **to be an avid reader** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-reading-5",
    "part": 1,
    "topic": "Reading",
    "question": "Did you read a lot as a child?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A page-turner",
          "vietnamese": "Một cuốn sách hấp dẫn"
        },
        {
          "phrase": "To be an avid reader",
          "vietnamese": "Là người đọc say mê"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "A thought-provoking book",
          "vietnamese": "Cuốn sách gợi suy nghĩ"
        },
        {
          "phrase": "To lose oneself in a story",
          "vietnamese": "Đắm chìm trong câu chuyện"
        }
      ],
      "model_structures": [
        "I enjoy reading... because they help me...",
        "The last book I read was... and I found it incredibly...",
        "I think reading is essential because it allows you to..."
      ],
      "brainstorming_ideas": [
        "Share your reading habits and preferred genres.",
        "Mention a book that made a strong impression on you.",
        "Compare reading physical books with digital alternatives."
      ]
    },
    "model_answer": "When it comes to reading, I would say that this is something I think about quite often. **A page-turner** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **to be an avid reader** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-reading-6",
    "part": 1,
    "topic": "Reading",
    "question": "What was the last book you read?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A page-turner",
          "vietnamese": "Một cuốn sách hấp dẫn"
        },
        {
          "phrase": "To be an avid reader",
          "vietnamese": "Là người đọc say mê"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "A thought-provoking book",
          "vietnamese": "Cuốn sách gợi suy nghĩ"
        },
        {
          "phrase": "To lose oneself in a story",
          "vietnamese": "Đắm chìm trong câu chuyện"
        }
      ],
      "model_structures": [
        "I enjoy reading... because they help me...",
        "The last book I read was... and I found it incredibly...",
        "I think reading is essential because it allows you to..."
      ],
      "brainstorming_ideas": [
        "Share your reading habits and preferred genres.",
        "Mention a book that made a strong impression on you.",
        "Compare reading physical books with digital alternatives."
      ]
    },
    "model_answer": "When it comes to reading, I would say that this is something I think about quite often. **A page-turner** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **to be an avid reader** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-reading-7",
    "part": 1,
    "topic": "Reading",
    "question": "Do you think reading is important? Why?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A page-turner",
          "vietnamese": "Một cuốn sách hấp dẫn"
        },
        {
          "phrase": "To be an avid reader",
          "vietnamese": "Là người đọc say mê"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "A thought-provoking book",
          "vietnamese": "Cuốn sách gợi suy nghĩ"
        },
        {
          "phrase": "To lose oneself in a story",
          "vietnamese": "Đắm chìm trong câu chuyện"
        }
      ],
      "model_structures": [
        "I enjoy reading... because they help me...",
        "The last book I read was... and I found it incredibly...",
        "I think reading is essential because it allows you to..."
      ],
      "brainstorming_ideas": [
        "Share your reading habits and preferred genres.",
        "Mention a book that made a strong impression on you.",
        "Compare reading physical books with digital alternatives."
      ]
    },
    "model_answer": "When it comes to reading, I would say that this is something I think about quite often. **A page-turner** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **to be an avid reader** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-reading-8",
    "part": 1,
    "topic": "Reading",
    "question": "Do you ever read newspapers or magazines?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A page-turner",
          "vietnamese": "Một cuốn sách hấp dẫn"
        },
        {
          "phrase": "To be an avid reader",
          "vietnamese": "Là người đọc say mê"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "A thought-provoking book",
          "vietnamese": "Cuốn sách gợi suy nghĩ"
        },
        {
          "phrase": "To lose oneself in a story",
          "vietnamese": "Đắm chìm trong câu chuyện"
        }
      ],
      "model_structures": [
        "I enjoy reading... because they help me...",
        "The last book I read was... and I found it incredibly...",
        "I think reading is essential because it allows you to..."
      ],
      "brainstorming_ideas": [
        "Share your reading habits and preferred genres.",
        "Mention a book that made a strong impression on you.",
        "Compare reading physical books with digital alternatives."
      ]
    },
    "model_answer": "When it comes to reading, I would say that this is something I think about quite often. **A page-turner** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **to be an avid reader** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-reading-9",
    "part": 1,
    "topic": "Reading",
    "question": "Would you like to write a book someday?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A page-turner",
          "vietnamese": "Một cuốn sách hấp dẫn"
        },
        {
          "phrase": "To be an avid reader",
          "vietnamese": "Là người đọc say mê"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "A thought-provoking book",
          "vietnamese": "Cuốn sách gợi suy nghĩ"
        },
        {
          "phrase": "To lose oneself in a story",
          "vietnamese": "Đắm chìm trong câu chuyện"
        }
      ],
      "model_structures": [
        "I enjoy reading... because they help me...",
        "The last book I read was... and I found it incredibly...",
        "I think reading is essential because it allows you to..."
      ],
      "brainstorming_ideas": [
        "Share your reading habits and preferred genres.",
        "Mention a book that made a strong impression on you.",
        "Compare reading physical books with digital alternatives."
      ]
    },
    "model_answer": "When it comes to reading, I would say that this is something I think about quite often. **A page-turner** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **to be an avid reader** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-reading-10",
    "part": 1,
    "topic": "Reading",
    "question": "Has the internet changed the way people read?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A page-turner",
          "vietnamese": "Một cuốn sách hấp dẫn"
        },
        {
          "phrase": "To be an avid reader",
          "vietnamese": "Là người đọc say mê"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "A thought-provoking book",
          "vietnamese": "Cuốn sách gợi suy nghĩ"
        },
        {
          "phrase": "To lose oneself in a story",
          "vietnamese": "Đắm chìm trong câu chuyện"
        }
      ],
      "model_structures": [
        "I enjoy reading... because they help me...",
        "The last book I read was... and I found it incredibly...",
        "I think reading is essential because it allows you to..."
      ],
      "brainstorming_ideas": [
        "Share your reading habits and preferred genres.",
        "Mention a book that made a strong impression on you.",
        "Compare reading physical books with digital alternatives."
      ]
    },
    "model_answer": "When it comes to reading, I would say that this is something I think about quite often. **A page-turner** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **to be an avid reader** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-travel---holidays-1",
    "part": 1,
    "topic": "Travel & Holidays",
    "question": "Do you enjoy traveling?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        },
        {
          "phrase": "A once-in-a-lifetime experience",
          "vietnamese": "Trải nghiệm có một không hai"
        },
        {
          "phrase": "To immerse oneself in the culture",
          "vietnamese": "Hòa mình vào văn hóa"
        },
        {
          "phrase": "Wanderlust",
          "vietnamese": "Đam mê khám phá, du lịch"
        }
      ],
      "model_structures": [
        "I absolutely love traveling because it gives me the chance to...",
        "The most memorable trip I've taken was to... where I...",
        "I usually prefer... holidays because they allow me to..."
      ],
      "brainstorming_ideas": [
        "Describe a memorable trip you've taken.",
        "Talk about your travel preferences and planning process.",
        "Mention cultural experiences gained through travel."
      ]
    },
    "model_answer": "When it comes to travel & holidays, I would say that this is something I think about quite often. **To broaden one's horizons** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **off the beaten track** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-travel---holidays-2",
    "part": 1,
    "topic": "Travel & Holidays",
    "question": "What places have you visited recently?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        },
        {
          "phrase": "A once-in-a-lifetime experience",
          "vietnamese": "Trải nghiệm có một không hai"
        },
        {
          "phrase": "To immerse oneself in the culture",
          "vietnamese": "Hòa mình vào văn hóa"
        },
        {
          "phrase": "Wanderlust",
          "vietnamese": "Đam mê khám phá, du lịch"
        }
      ],
      "model_structures": [
        "I absolutely love traveling because it gives me the chance to...",
        "The most memorable trip I've taken was to... where I...",
        "I usually prefer... holidays because they allow me to..."
      ],
      "brainstorming_ideas": [
        "Describe a memorable trip you've taken.",
        "Talk about your travel preferences and planning process.",
        "Mention cultural experiences gained through travel."
      ]
    },
    "model_answer": "When it comes to travel & holidays, I would say that this is something I think about quite often. **To broaden one's horizons** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **off the beaten track** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-travel---holidays-3",
    "part": 1,
    "topic": "Travel & Holidays",
    "question": "Do you prefer traveling alone or with others?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        },
        {
          "phrase": "A once-in-a-lifetime experience",
          "vietnamese": "Trải nghiệm có một không hai"
        },
        {
          "phrase": "To immerse oneself in the culture",
          "vietnamese": "Hòa mình vào văn hóa"
        },
        {
          "phrase": "Wanderlust",
          "vietnamese": "Đam mê khám phá, du lịch"
        }
      ],
      "model_structures": [
        "I absolutely love traveling because it gives me the chance to...",
        "The most memorable trip I've taken was to... where I...",
        "I usually prefer... holidays because they allow me to..."
      ],
      "brainstorming_ideas": [
        "Describe a memorable trip you've taken.",
        "Talk about your travel preferences and planning process.",
        "Mention cultural experiences gained through travel."
      ]
    },
    "model_answer": "When it comes to travel & holidays, I would say that this is something I think about quite often. **To broaden one's horizons** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **off the beaten track** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-travel---holidays-4",
    "part": 1,
    "topic": "Travel & Holidays",
    "question": "What is your dream travel destination?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        },
        {
          "phrase": "A once-in-a-lifetime experience",
          "vietnamese": "Trải nghiệm có một không hai"
        },
        {
          "phrase": "To immerse oneself in the culture",
          "vietnamese": "Hòa mình vào văn hóa"
        },
        {
          "phrase": "Wanderlust",
          "vietnamese": "Đam mê khám phá, du lịch"
        }
      ],
      "model_structures": [
        "I absolutely love traveling because it gives me the chance to...",
        "The most memorable trip I've taken was to... where I...",
        "I usually prefer... holidays because they allow me to..."
      ],
      "brainstorming_ideas": [
        "Describe a memorable trip you've taken.",
        "Talk about your travel preferences and planning process.",
        "Mention cultural experiences gained through travel."
      ]
    },
    "model_answer": "When it comes to travel & holidays, I would say that this is something I think about quite often. **To broaden one's horizons** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **off the beaten track** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-travel---holidays-5",
    "part": 1,
    "topic": "Travel & Holidays",
    "question": "Do you prefer beach holidays or city breaks?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        },
        {
          "phrase": "A once-in-a-lifetime experience",
          "vietnamese": "Trải nghiệm có một không hai"
        },
        {
          "phrase": "To immerse oneself in the culture",
          "vietnamese": "Hòa mình vào văn hóa"
        },
        {
          "phrase": "Wanderlust",
          "vietnamese": "Đam mê khám phá, du lịch"
        }
      ],
      "model_structures": [
        "I absolutely love traveling because it gives me the chance to...",
        "The most memorable trip I've taken was to... where I...",
        "I usually prefer... holidays because they allow me to..."
      ],
      "brainstorming_ideas": [
        "Describe a memorable trip you've taken.",
        "Talk about your travel preferences and planning process.",
        "Mention cultural experiences gained through travel."
      ]
    },
    "model_answer": "When it comes to travel & holidays, I would say that this is something I think about quite often. **To broaden one's horizons** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **off the beaten track** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-travel---holidays-6",
    "part": 1,
    "topic": "Travel & Holidays",
    "question": "How do you usually plan your trips?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        },
        {
          "phrase": "A once-in-a-lifetime experience",
          "vietnamese": "Trải nghiệm có một không hai"
        },
        {
          "phrase": "To immerse oneself in the culture",
          "vietnamese": "Hòa mình vào văn hóa"
        },
        {
          "phrase": "Wanderlust",
          "vietnamese": "Đam mê khám phá, du lịch"
        }
      ],
      "model_structures": [
        "I absolutely love traveling because it gives me the chance to...",
        "The most memorable trip I've taken was to... where I...",
        "I usually prefer... holidays because they allow me to..."
      ],
      "brainstorming_ideas": [
        "Describe a memorable trip you've taken.",
        "Talk about your travel preferences and planning process.",
        "Mention cultural experiences gained through travel."
      ]
    },
    "model_answer": "When it comes to travel & holidays, I would say that this is something I think about quite often. **To broaden one's horizons** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **off the beaten track** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-travel---holidays-7",
    "part": 1,
    "topic": "Travel & Holidays",
    "question": "Do you like to try local food when traveling?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        },
        {
          "phrase": "A once-in-a-lifetime experience",
          "vietnamese": "Trải nghiệm có một không hai"
        },
        {
          "phrase": "To immerse oneself in the culture",
          "vietnamese": "Hòa mình vào văn hóa"
        },
        {
          "phrase": "Wanderlust",
          "vietnamese": "Đam mê khám phá, du lịch"
        }
      ],
      "model_structures": [
        "I absolutely love traveling because it gives me the chance to...",
        "The most memorable trip I've taken was to... where I...",
        "I usually prefer... holidays because they allow me to..."
      ],
      "brainstorming_ideas": [
        "Describe a memorable trip you've taken.",
        "Talk about your travel preferences and planning process.",
        "Mention cultural experiences gained through travel."
      ]
    },
    "model_answer": "When it comes to travel & holidays, I would say that this is something I think about quite often. **To broaden one's horizons** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **off the beaten track** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-travel---holidays-8",
    "part": 1,
    "topic": "Travel & Holidays",
    "question": "What do you usually do on public holidays?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        },
        {
          "phrase": "A once-in-a-lifetime experience",
          "vietnamese": "Trải nghiệm có một không hai"
        },
        {
          "phrase": "To immerse oneself in the culture",
          "vietnamese": "Hòa mình vào văn hóa"
        },
        {
          "phrase": "Wanderlust",
          "vietnamese": "Đam mê khám phá, du lịch"
        }
      ],
      "model_structures": [
        "I absolutely love traveling because it gives me the chance to...",
        "The most memorable trip I've taken was to... where I...",
        "I usually prefer... holidays because they allow me to..."
      ],
      "brainstorming_ideas": [
        "Describe a memorable trip you've taken.",
        "Talk about your travel preferences and planning process.",
        "Mention cultural experiences gained through travel."
      ]
    },
    "model_answer": "When it comes to travel & holidays, I would say that this is something I think about quite often. **To broaden one's horizons** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **off the beaten track** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-travel---holidays-9",
    "part": 1,
    "topic": "Travel & Holidays",
    "question": "Do you think traveling is educational?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        },
        {
          "phrase": "A once-in-a-lifetime experience",
          "vietnamese": "Trải nghiệm có một không hai"
        },
        {
          "phrase": "To immerse oneself in the culture",
          "vietnamese": "Hòa mình vào văn hóa"
        },
        {
          "phrase": "Wanderlust",
          "vietnamese": "Đam mê khám phá, du lịch"
        }
      ],
      "model_structures": [
        "I absolutely love traveling because it gives me the chance to...",
        "The most memorable trip I've taken was to... where I...",
        "I usually prefer... holidays because they allow me to..."
      ],
      "brainstorming_ideas": [
        "Describe a memorable trip you've taken.",
        "Talk about your travel preferences and planning process.",
        "Mention cultural experiences gained through travel."
      ]
    },
    "model_answer": "When it comes to travel & holidays, I would say that this is something I think about quite often. **To broaden one's horizons** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **off the beaten track** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-travel---holidays-10",
    "part": 1,
    "topic": "Travel & Holidays",
    "question": "Have you ever traveled abroad?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        },
        {
          "phrase": "A once-in-a-lifetime experience",
          "vietnamese": "Trải nghiệm có một không hai"
        },
        {
          "phrase": "To immerse oneself in the culture",
          "vietnamese": "Hòa mình vào văn hóa"
        },
        {
          "phrase": "Wanderlust",
          "vietnamese": "Đam mê khám phá, du lịch"
        }
      ],
      "model_structures": [
        "I absolutely love traveling because it gives me the chance to...",
        "The most memorable trip I've taken was to... where I...",
        "I usually prefer... holidays because they allow me to..."
      ],
      "brainstorming_ideas": [
        "Describe a memorable trip you've taken.",
        "Talk about your travel preferences and planning process.",
        "Mention cultural experiences gained through travel."
      ]
    },
    "model_answer": "When it comes to travel & holidays, I would say that this is something I think about quite often. **To broaden one's horizons** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **off the beaten track** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-technology-1",
    "part": 1,
    "topic": "Technology",
    "question": "Do you use technology a lot in your daily life?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "State-of-the-art technology",
          "vietnamese": "Công nghệ tiên tiến nhất"
        },
        {
          "phrase": "To be tech-savvy",
          "vietnamese": "Am hiểu công nghệ"
        },
        {
          "phrase": "A digital footprint",
          "vietnamese": "Dấu vết kỹ thuật số"
        },
        {
          "phrase": "To keep up with the times",
          "vietnamese": "Bắt kịp thời đại"
        },
        {
          "phrase": "The pros and cons of technology",
          "vietnamese": "Ưu và nhược điểm của công nghệ"
        }
      ],
      "model_structures": [
        "I use technology on a daily basis, especially for...",
        "I think the biggest advantage of technology is that it allows us to...",
        "I'm quite interested in... technology because..."
      ],
      "brainstorming_ideas": [
        "Share how technology helps you in daily life.",
        "Discuss any concerns about technology overuse.",
        "Mention tech skills you'd like to develop."
      ]
    },
    "model_answer": "When it comes to technology, I would say that this is something I think about quite often. **State-of-the-art technology** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **to be tech-savvy** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-technology-2",
    "part": 1,
    "topic": "Technology",
    "question": "What is your favorite gadget or device?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "State-of-the-art technology",
          "vietnamese": "Công nghệ tiên tiến nhất"
        },
        {
          "phrase": "To be tech-savvy",
          "vietnamese": "Am hiểu công nghệ"
        },
        {
          "phrase": "A digital footprint",
          "vietnamese": "Dấu vết kỹ thuật số"
        },
        {
          "phrase": "To keep up with the times",
          "vietnamese": "Bắt kịp thời đại"
        },
        {
          "phrase": "The pros and cons of technology",
          "vietnamese": "Ưu và nhược điểm của công nghệ"
        }
      ],
      "model_structures": [
        "I use technology on a daily basis, especially for...",
        "I think the biggest advantage of technology is that it allows us to...",
        "I'm quite interested in... technology because..."
      ],
      "brainstorming_ideas": [
        "Share how technology helps you in daily life.",
        "Discuss any concerns about technology overuse.",
        "Mention tech skills you'd like to develop."
      ]
    },
    "model_answer": "When it comes to technology, I would say that this is something I think about quite often. **State-of-the-art technology** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **to be tech-savvy** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-technology-3",
    "part": 1,
    "topic": "Technology",
    "question": "How has technology changed your life?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "State-of-the-art technology",
          "vietnamese": "Công nghệ tiên tiến nhất"
        },
        {
          "phrase": "To be tech-savvy",
          "vietnamese": "Am hiểu công nghệ"
        },
        {
          "phrase": "A digital footprint",
          "vietnamese": "Dấu vết kỹ thuật số"
        },
        {
          "phrase": "To keep up with the times",
          "vietnamese": "Bắt kịp thời đại"
        },
        {
          "phrase": "The pros and cons of technology",
          "vietnamese": "Ưu và nhược điểm của công nghệ"
        }
      ],
      "model_structures": [
        "I use technology on a daily basis, especially for...",
        "I think the biggest advantage of technology is that it allows us to...",
        "I'm quite interested in... technology because..."
      ],
      "brainstorming_ideas": [
        "Share how technology helps you in daily life.",
        "Discuss any concerns about technology overuse.",
        "Mention tech skills you'd like to develop."
      ]
    },
    "model_answer": "When it comes to technology, I would say that this is something I think about quite often. **State-of-the-art technology** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **to be tech-savvy** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-technology-4",
    "part": 1,
    "topic": "Technology",
    "question": "Do you think children should use technology at school?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "State-of-the-art technology",
          "vietnamese": "Công nghệ tiên tiến nhất"
        },
        {
          "phrase": "To be tech-savvy",
          "vietnamese": "Am hiểu công nghệ"
        },
        {
          "phrase": "A digital footprint",
          "vietnamese": "Dấu vết kỹ thuật số"
        },
        {
          "phrase": "To keep up with the times",
          "vietnamese": "Bắt kịp thời đại"
        },
        {
          "phrase": "The pros and cons of technology",
          "vietnamese": "Ưu và nhược điểm của công nghệ"
        }
      ],
      "model_structures": [
        "I use technology on a daily basis, especially for...",
        "I think the biggest advantage of technology is that it allows us to...",
        "I'm quite interested in... technology because..."
      ],
      "brainstorming_ideas": [
        "Share how technology helps you in daily life.",
        "Discuss any concerns about technology overuse.",
        "Mention tech skills you'd like to develop."
      ]
    },
    "model_answer": "When it comes to technology, I would say that this is something I think about quite often. **State-of-the-art technology** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **to be tech-savvy** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-technology-5",
    "part": 1,
    "topic": "Technology",
    "question": "What app do you use most frequently?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "State-of-the-art technology",
          "vietnamese": "Công nghệ tiên tiến nhất"
        },
        {
          "phrase": "To be tech-savvy",
          "vietnamese": "Am hiểu công nghệ"
        },
        {
          "phrase": "A digital footprint",
          "vietnamese": "Dấu vết kỹ thuật số"
        },
        {
          "phrase": "To keep up with the times",
          "vietnamese": "Bắt kịp thời đại"
        },
        {
          "phrase": "The pros and cons of technology",
          "vietnamese": "Ưu và nhược điểm của công nghệ"
        }
      ],
      "model_structures": [
        "I use technology on a daily basis, especially for...",
        "I think the biggest advantage of technology is that it allows us to...",
        "I'm quite interested in... technology because..."
      ],
      "brainstorming_ideas": [
        "Share how technology helps you in daily life.",
        "Discuss any concerns about technology overuse.",
        "Mention tech skills you'd like to develop."
      ]
    },
    "model_answer": "When it comes to technology, I would say that this is something I think about quite often. **State-of-the-art technology** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **to be tech-savvy** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-technology-6",
    "part": 1,
    "topic": "Technology",
    "question": "Do you prefer shopping online or in stores?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "State-of-the-art technology",
          "vietnamese": "Công nghệ tiên tiến nhất"
        },
        {
          "phrase": "To be tech-savvy",
          "vietnamese": "Am hiểu công nghệ"
        },
        {
          "phrase": "A digital footprint",
          "vietnamese": "Dấu vết kỹ thuật số"
        },
        {
          "phrase": "To keep up with the times",
          "vietnamese": "Bắt kịp thời đại"
        },
        {
          "phrase": "The pros and cons of technology",
          "vietnamese": "Ưu và nhược điểm của công nghệ"
        }
      ],
      "model_structures": [
        "I use technology on a daily basis, especially for...",
        "I think the biggest advantage of technology is that it allows us to...",
        "I'm quite interested in... technology because..."
      ],
      "brainstorming_ideas": [
        "Share how technology helps you in daily life.",
        "Discuss any concerns about technology overuse.",
        "Mention tech skills you'd like to develop."
      ]
    },
    "model_answer": "When it comes to technology, I would say that this is something I think about quite often. **State-of-the-art technology** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **to be tech-savvy** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-technology-7",
    "part": 1,
    "topic": "Technology",
    "question": "Are you interested in new technology?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "State-of-the-art technology",
          "vietnamese": "Công nghệ tiên tiến nhất"
        },
        {
          "phrase": "To be tech-savvy",
          "vietnamese": "Am hiểu công nghệ"
        },
        {
          "phrase": "A digital footprint",
          "vietnamese": "Dấu vết kỹ thuật số"
        },
        {
          "phrase": "To keep up with the times",
          "vietnamese": "Bắt kịp thời đại"
        },
        {
          "phrase": "The pros and cons of technology",
          "vietnamese": "Ưu và nhược điểm của công nghệ"
        }
      ],
      "model_structures": [
        "I use technology on a daily basis, especially for...",
        "I think the biggest advantage of technology is that it allows us to...",
        "I'm quite interested in... technology because..."
      ],
      "brainstorming_ideas": [
        "Share how technology helps you in daily life.",
        "Discuss any concerns about technology overuse.",
        "Mention tech skills you'd like to develop."
      ]
    },
    "model_answer": "When it comes to technology, I would say that this is something I think about quite often. **State-of-the-art technology** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **to be tech-savvy** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-technology-8",
    "part": 1,
    "topic": "Technology",
    "question": "Do you think people are too dependent on technology?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "State-of-the-art technology",
          "vietnamese": "Công nghệ tiên tiến nhất"
        },
        {
          "phrase": "To be tech-savvy",
          "vietnamese": "Am hiểu công nghệ"
        },
        {
          "phrase": "A digital footprint",
          "vietnamese": "Dấu vết kỹ thuật số"
        },
        {
          "phrase": "To keep up with the times",
          "vietnamese": "Bắt kịp thời đại"
        },
        {
          "phrase": "The pros and cons of technology",
          "vietnamese": "Ưu và nhược điểm của công nghệ"
        }
      ],
      "model_structures": [
        "I use technology on a daily basis, especially for...",
        "I think the biggest advantage of technology is that it allows us to...",
        "I'm quite interested in... technology because..."
      ],
      "brainstorming_ideas": [
        "Share how technology helps you in daily life.",
        "Discuss any concerns about technology overuse.",
        "Mention tech skills you'd like to develop."
      ]
    },
    "model_answer": "When it comes to technology, I would say that this is something I think about quite often. **State-of-the-art technology** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **to be tech-savvy** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-technology-9",
    "part": 1,
    "topic": "Technology",
    "question": "How do you stay updated with technology trends?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "State-of-the-art technology",
          "vietnamese": "Công nghệ tiên tiến nhất"
        },
        {
          "phrase": "To be tech-savvy",
          "vietnamese": "Am hiểu công nghệ"
        },
        {
          "phrase": "A digital footprint",
          "vietnamese": "Dấu vết kỹ thuật số"
        },
        {
          "phrase": "To keep up with the times",
          "vietnamese": "Bắt kịp thời đại"
        },
        {
          "phrase": "The pros and cons of technology",
          "vietnamese": "Ưu và nhược điểm của công nghệ"
        }
      ],
      "model_structures": [
        "I use technology on a daily basis, especially for...",
        "I think the biggest advantage of technology is that it allows us to...",
        "I'm quite interested in... technology because..."
      ],
      "brainstorming_ideas": [
        "Share how technology helps you in daily life.",
        "Discuss any concerns about technology overuse.",
        "Mention tech skills you'd like to develop."
      ]
    },
    "model_answer": "When it comes to technology, I would say that this is something I think about quite often. **State-of-the-art technology** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **to be tech-savvy** in my own way, which has taught me valuable lessons about perseverance and growth."
  },
  {
    "id": "p1-technology-10",
    "part": 1,
    "topic": "Technology",
    "question": "What technology skill would you like to learn?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "State-of-the-art technology",
          "vietnamese": "Công nghệ tiên tiến nhất"
        },
        {
          "phrase": "To be tech-savvy",
          "vietnamese": "Am hiểu công nghệ"
        },
        {
          "phrase": "A digital footprint",
          "vietnamese": "Dấu vết kỹ thuật số"
        },
        {
          "phrase": "To keep up with the times",
          "vietnamese": "Bắt kịp thời đại"
        },
        {
          "phrase": "The pros and cons of technology",
          "vietnamese": "Ưu và nhược điểm của công nghệ"
        }
      ],
      "model_structures": [
        "I use technology on a daily basis, especially for...",
        "I think the biggest advantage of technology is that it allows us to...",
        "I'm quite interested in... technology because..."
      ],
      "brainstorming_ideas": [
        "Share how technology helps you in daily life.",
        "Discuss any concerns about technology overuse.",
        "Mention tech skills you'd like to develop."
      ]
    },
    "model_answer": "When it comes to technology, I would say that this is something I think about quite often. **State-of-the-art technology** is definitely relevant here because it relates to my personal experience. I believe that understanding this topic deeply helps us appreciate the nuances of daily life. For instance, I've always tried to **to be tech-savvy** in my own way, which has taught me valuable lessons about perseverance and growth."
  }
];

// ===================== PART 2 QUESTIONS (101 questions) =====================

const part2PracticeQuestions: SpeakingPracticeQuestion[] = [
  {
    "id": "p2-a-person-you-admire",
    "part": 2,
    "topic": "A Person You Admire",
    "question": "Describe a person you admire and explain why.",
    "prompts": [
      "Who this person is",
      "How you know them",
      "What qualities they have",
      "Why you admire them"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "An inspiring figure",
          "vietnamese": "Một nhân vật truyền cảm hứng"
        },
        {
          "phrase": "To look up to someone",
          "vietnamese": "Ngưỡng mộ ai đó"
        },
        {
          "phrase": "A role model",
          "vietnamese": "Hình mẫu lý tưởng"
        },
        {
          "phrase": "To have a profound impact on",
          "vietnamese": "Có ảnh hưởng sâu sắc đến"
        },
        {
          "phrase": "Selfless dedication",
          "vietnamese": "Sự cống hiến vô tư"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a person you admire that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a person you admire, which is something that has always been close to my heart. **An inspiring figure** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **to look up to someone** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **a role model**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-memorable-trip",
    "part": 2,
    "topic": "A Memorable Trip",
    "question": "Describe a trip that you remember well.",
    "prompts": [
      "Where you went",
      "Who you went with",
      "What you did there",
      "Why it was memorable"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A once-in-a-lifetime trip",
          "vietnamese": "Chuyến đi có một không hai"
        },
        {
          "phrase": "Breathtaking scenery",
          "vietnamese": "Phong cảnh ngoạn mục"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Culture shock",
          "vietnamese": "Sốc văn hóa"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a memorable trip that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a memorable trip, which is something that has always been close to my heart. **A once-in-a-lifetime trip** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **breathtaking scenery** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **to broaden one's horizons**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-skill-you-learned",
    "part": 2,
    "topic": "A Skill You Learned",
    "question": "Describe a useful skill you learned recently.",
    "prompts": [
      "What the skill is",
      "How you learned it",
      "How long it took",
      "Why it is useful"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pick up a new skill",
          "vietnamese": "Học một kỹ năng mới"
        },
        {
          "phrase": "Hands-on experience",
          "vietnamese": "Kinh nghiệm thực tiễn"
        },
        {
          "phrase": "Trial and error",
          "vietnamese": "Thử và sai"
        },
        {
          "phrase": "A transferable skill",
          "vietnamese": "Kỹ năng có thể ứng dụng nhiều nơi"
        },
        {
          "phrase": "Self-taught",
          "vietnamese": "Tự học"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a skill you learned that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a skill you learned, which is something that has always been close to my heart. **To pick up a new skill** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **hands-on experience** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **trial and error**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-book-you-enjoyed",
    "part": 2,
    "topic": "A Book You Enjoyed",
    "question": "Describe a book that you really enjoyed reading.",
    "prompts": [
      "What the book is about",
      "When you read it",
      "Why you chose it",
      "What you liked about it"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "An inspiring figure",
          "vietnamese": "Một nhân vật truyền cảm hứng"
        },
        {
          "phrase": "To look up to someone",
          "vietnamese": "Ngưỡng mộ ai đó"
        },
        {
          "phrase": "A role model",
          "vietnamese": "Hình mẫu lý tưởng"
        },
        {
          "phrase": "To have a profound impact on",
          "vietnamese": "Có ảnh hưởng sâu sắc đến"
        },
        {
          "phrase": "Selfless dedication",
          "vietnamese": "Sự cống hiến vô tư"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a book you enjoyed that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a book you enjoyed, which is something that has always been close to my heart. **An inspiring figure** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **to look up to someone** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **a role model**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-place-you-like-to-visit",
    "part": 2,
    "topic": "A Place You Like to Visit",
    "question": "Describe a place you like to visit in your free time.",
    "prompts": [
      "Where it is",
      "How often you go there",
      "What you do there",
      "Why you enjoy visiting"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A once-in-a-lifetime trip",
          "vietnamese": "Chuyến đi có một không hai"
        },
        {
          "phrase": "Breathtaking scenery",
          "vietnamese": "Phong cảnh ngoạn mục"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Culture shock",
          "vietnamese": "Sốc văn hóa"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a place you like to visit that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a place you like to visit, which is something that has always been close to my heart. **A once-in-a-lifetime trip** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **breathtaking scenery** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **to broaden one's horizons**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-childhood-memory",
    "part": 2,
    "topic": "A Childhood Memory",
    "question": "Describe a happy memory from your childhood.",
    "prompts": [
      "What happened",
      "How old you were",
      "Who was involved",
      "Why it made you happy"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pick up a new skill",
          "vietnamese": "Học một kỹ năng mới"
        },
        {
          "phrase": "Hands-on experience",
          "vietnamese": "Kinh nghiệm thực tiễn"
        },
        {
          "phrase": "Trial and error",
          "vietnamese": "Thử và sai"
        },
        {
          "phrase": "A transferable skill",
          "vietnamese": "Kỹ năng có thể ứng dụng nhiều nơi"
        },
        {
          "phrase": "Self-taught",
          "vietnamese": "Tự học"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a childhood memory that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a childhood memory, which is something that has always been close to my heart. **To pick up a new skill** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **hands-on experience** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **trial and error**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-an-important-decision",
    "part": 2,
    "topic": "An Important Decision",
    "question": "Describe an important decision you made in your life.",
    "prompts": [
      "What the decision was",
      "When you made it",
      "How you made it",
      "How it affected your life"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "An inspiring figure",
          "vietnamese": "Một nhân vật truyền cảm hứng"
        },
        {
          "phrase": "To look up to someone",
          "vietnamese": "Ngưỡng mộ ai đó"
        },
        {
          "phrase": "A role model",
          "vietnamese": "Hình mẫu lý tưởng"
        },
        {
          "phrase": "To have a profound impact on",
          "vietnamese": "Có ảnh hưởng sâu sắc đến"
        },
        {
          "phrase": "Selfless dedication",
          "vietnamese": "Sự cống hiến vô tư"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific an important decision that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about an important decision, which is something that has always been close to my heart. **An inspiring figure** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **to look up to someone** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **a role model**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-creative-person",
    "part": 2,
    "topic": "A Creative Person",
    "question": "Describe a creative person that you admire.",
    "prompts": [
      "Who this person is",
      "How you know them",
      "What creative things they do",
      "Why you admire their creativity"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A once-in-a-lifetime trip",
          "vietnamese": "Chuyến đi có một không hai"
        },
        {
          "phrase": "Breathtaking scenery",
          "vietnamese": "Phong cảnh ngoạn mục"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Culture shock",
          "vietnamese": "Sốc văn hóa"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a creative person that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a creative person, which is something that has always been close to my heart. **A once-in-a-lifetime trip** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **breathtaking scenery** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **to broaden one's horizons**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-festival-or-celebration",
    "part": 2,
    "topic": "A Festival or Celebration",
    "question": "Describe a festival or celebration in your country.",
    "prompts": [
      "What the festival is",
      "When it takes place",
      "What people do during it",
      "Why it is important"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pick up a new skill",
          "vietnamese": "Học một kỹ năng mới"
        },
        {
          "phrase": "Hands-on experience",
          "vietnamese": "Kinh nghiệm thực tiễn"
        },
        {
          "phrase": "Trial and error",
          "vietnamese": "Thử và sai"
        },
        {
          "phrase": "A transferable skill",
          "vietnamese": "Kỹ năng có thể ứng dụng nhiều nơi"
        },
        {
          "phrase": "Self-taught",
          "vietnamese": "Tự học"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a festival or celebration that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a festival or celebration, which is something that has always been close to my heart. **To pick up a new skill** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **hands-on experience** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **trial and error**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-piece-of-technology",
    "part": 2,
    "topic": "A Piece of Technology",
    "question": "Describe a piece of technology you find useful.",
    "prompts": [
      "What it is",
      "How you use it",
      "How long you have had it",
      "Why it is useful"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "An inspiring figure",
          "vietnamese": "Một nhân vật truyền cảm hứng"
        },
        {
          "phrase": "To look up to someone",
          "vietnamese": "Ngưỡng mộ ai đó"
        },
        {
          "phrase": "A role model",
          "vietnamese": "Hình mẫu lý tưởng"
        },
        {
          "phrase": "To have a profound impact on",
          "vietnamese": "Có ảnh hưởng sâu sắc đến"
        },
        {
          "phrase": "Selfless dedication",
          "vietnamese": "Sự cống hiến vô tư"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a piece of technology that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a piece of technology, which is something that has always been close to my heart. **An inspiring figure** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **to look up to someone** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **a role model**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-teacher-you-remember",
    "part": 2,
    "topic": "A Teacher You Remember",
    "question": "Describe a teacher who had a great influence on you.",
    "prompts": [
      "Who this teacher was",
      "What subject they taught",
      "What made them special",
      "How they influenced you"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A once-in-a-lifetime trip",
          "vietnamese": "Chuyến đi có một không hai"
        },
        {
          "phrase": "Breathtaking scenery",
          "vietnamese": "Phong cảnh ngoạn mục"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Culture shock",
          "vietnamese": "Sốc văn hóa"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a teacher you remember that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a teacher you remember, which is something that has always been close to my heart. **A once-in-a-lifetime trip** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **breathtaking scenery** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **to broaden one's horizons**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-movie-you-enjoyed",
    "part": 2,
    "topic": "A Movie You Enjoyed",
    "question": "Describe a movie that you really enjoyed.",
    "prompts": [
      "What the movie was about",
      "When you watched it",
      "Who you watched it with",
      "Why you enjoyed it"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pick up a new skill",
          "vietnamese": "Học một kỹ năng mới"
        },
        {
          "phrase": "Hands-on experience",
          "vietnamese": "Kinh nghiệm thực tiễn"
        },
        {
          "phrase": "Trial and error",
          "vietnamese": "Thử và sai"
        },
        {
          "phrase": "A transferable skill",
          "vietnamese": "Kỹ năng có thể ứng dụng nhiều nơi"
        },
        {
          "phrase": "Self-taught",
          "vietnamese": "Tự học"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a movie you enjoyed that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a movie you enjoyed, which is something that has always been close to my heart. **To pick up a new skill** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **hands-on experience** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **trial and error**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-healthy-habit",
    "part": 2,
    "topic": "A Healthy Habit",
    "question": "Describe a healthy habit you have developed.",
    "prompts": [
      "What the habit is",
      "When you started it",
      "How you maintain it",
      "Why it is beneficial"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "An inspiring figure",
          "vietnamese": "Một nhân vật truyền cảm hứng"
        },
        {
          "phrase": "To look up to someone",
          "vietnamese": "Ngưỡng mộ ai đó"
        },
        {
          "phrase": "A role model",
          "vietnamese": "Hình mẫu lý tưởng"
        },
        {
          "phrase": "To have a profound impact on",
          "vietnamese": "Có ảnh hưởng sâu sắc đến"
        },
        {
          "phrase": "Selfless dedication",
          "vietnamese": "Sự cống hiến vô tư"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a healthy habit that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a healthy habit, which is something that has always been close to my heart. **An inspiring figure** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **to look up to someone** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **a role model**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-an-interesting-conversation",
    "part": 2,
    "topic": "An Interesting Conversation",
    "question": "Describe an interesting conversation you had recently.",
    "prompts": [
      "Who you spoke with",
      "What you talked about",
      "Where the conversation took place",
      "Why it was interesting"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A once-in-a-lifetime trip",
          "vietnamese": "Chuyến đi có một không hai"
        },
        {
          "phrase": "Breathtaking scenery",
          "vietnamese": "Phong cảnh ngoạn mục"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Culture shock",
          "vietnamese": "Sốc văn hóa"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific an interesting conversation that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about an interesting conversation, which is something that has always been close to my heart. **A once-in-a-lifetime trip** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **breathtaking scenery** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **to broaden one's horizons**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-goal-you-want-to-achieve",
    "part": 2,
    "topic": "A Goal You Want to Achieve",
    "question": "Describe a goal you want to achieve in the future.",
    "prompts": [
      "What the goal is",
      "Why it is important to you",
      "What steps you need to take",
      "When you hope to achieve it"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pick up a new skill",
          "vietnamese": "Học một kỹ năng mới"
        },
        {
          "phrase": "Hands-on experience",
          "vietnamese": "Kinh nghiệm thực tiễn"
        },
        {
          "phrase": "Trial and error",
          "vietnamese": "Thử và sai"
        },
        {
          "phrase": "A transferable skill",
          "vietnamese": "Kỹ năng có thể ứng dụng nhiều nơi"
        },
        {
          "phrase": "Self-taught",
          "vietnamese": "Tự học"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a goal you want to achieve that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a goal you want to achieve, which is something that has always been close to my heart. **To pick up a new skill** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **hands-on experience** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **trial and error**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-beautiful-place",
    "part": 2,
    "topic": "A Beautiful Place",
    "question": "Describe a beautiful place you have visited.",
    "prompts": [
      "Where it is",
      "When you visited",
      "What it looked like",
      "Why you found it beautiful"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "An inspiring figure",
          "vietnamese": "Một nhân vật truyền cảm hứng"
        },
        {
          "phrase": "To look up to someone",
          "vietnamese": "Ngưỡng mộ ai đó"
        },
        {
          "phrase": "A role model",
          "vietnamese": "Hình mẫu lý tưởng"
        },
        {
          "phrase": "To have a profound impact on",
          "vietnamese": "Có ảnh hưởng sâu sắc đến"
        },
        {
          "phrase": "Selfless dedication",
          "vietnamese": "Sự cống hiến vô tư"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a beautiful place that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a beautiful place, which is something that has always been close to my heart. **An inspiring figure** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **to look up to someone** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **a role model**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-sports-event",
    "part": 2,
    "topic": "A Sports Event",
    "question": "Describe a sports event you attended or watched.",
    "prompts": [
      "What the event was",
      "When it happened",
      "Who you watched it with",
      "What made it exciting"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A once-in-a-lifetime trip",
          "vietnamese": "Chuyến đi có một không hai"
        },
        {
          "phrase": "Breathtaking scenery",
          "vietnamese": "Phong cảnh ngoạn mục"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Culture shock",
          "vietnamese": "Sốc văn hóa"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a sports event that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a sports event, which is something that has always been close to my heart. **A once-in-a-lifetime trip** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **breathtaking scenery** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **to broaden one's horizons**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-foreign-culture",
    "part": 2,
    "topic": "A Foreign Culture",
    "question": "Describe an aspect of a foreign culture you find interesting.",
    "prompts": [
      "What culture it is",
      "What aspect you find interesting",
      "How you learned about it",
      "Why it interests you"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pick up a new skill",
          "vietnamese": "Học một kỹ năng mới"
        },
        {
          "phrase": "Hands-on experience",
          "vietnamese": "Kinh nghiệm thực tiễn"
        },
        {
          "phrase": "Trial and error",
          "vietnamese": "Thử và sai"
        },
        {
          "phrase": "A transferable skill",
          "vietnamese": "Kỹ năng có thể ứng dụng nhiều nơi"
        },
        {
          "phrase": "Self-taught",
          "vietnamese": "Tự học"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a foreign culture that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a foreign culture, which is something that has always been close to my heart. **To pick up a new skill** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **hands-on experience** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **trial and error**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-difficult-challenge",
    "part": 2,
    "topic": "A Difficult Challenge",
    "question": "Describe a difficult challenge you overcame.",
    "prompts": [
      "What the challenge was",
      "When you faced it",
      "How you overcame it",
      "What you learned from it"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "An inspiring figure",
          "vietnamese": "Một nhân vật truyền cảm hứng"
        },
        {
          "phrase": "To look up to someone",
          "vietnamese": "Ngưỡng mộ ai đó"
        },
        {
          "phrase": "A role model",
          "vietnamese": "Hình mẫu lý tưởng"
        },
        {
          "phrase": "To have a profound impact on",
          "vietnamese": "Có ảnh hưởng sâu sắc đến"
        },
        {
          "phrase": "Selfless dedication",
          "vietnamese": "Sự cống hiến vô tư"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a difficult challenge that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a difficult challenge, which is something that has always been close to my heart. **An inspiring figure** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **to look up to someone** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **a role model**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-piece-of-music",
    "part": 2,
    "topic": "A Piece of Music",
    "question": "Describe a piece of music that is special to you.",
    "prompts": [
      "What the music is",
      "When you first heard it",
      "How it makes you feel",
      "Why it is special to you"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A once-in-a-lifetime trip",
          "vietnamese": "Chuyến đi có một không hai"
        },
        {
          "phrase": "Breathtaking scenery",
          "vietnamese": "Phong cảnh ngoạn mục"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Culture shock",
          "vietnamese": "Sốc văn hóa"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a piece of music that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a piece of music, which is something that has always been close to my heart. **A once-in-a-lifetime trip** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **breathtaking scenery** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **to broaden one's horizons**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-helpful-person",
    "part": 2,
    "topic": "A Helpful Person",
    "question": "Describe someone who helped you at an important time.",
    "prompts": [
      "Who this person was",
      "When they helped you",
      "How they helped",
      "Why their help was important"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pick up a new skill",
          "vietnamese": "Học một kỹ năng mới"
        },
        {
          "phrase": "Hands-on experience",
          "vietnamese": "Kinh nghiệm thực tiễn"
        },
        {
          "phrase": "Trial and error",
          "vietnamese": "Thử và sai"
        },
        {
          "phrase": "A transferable skill",
          "vietnamese": "Kỹ năng có thể ứng dụng nhiều nơi"
        },
        {
          "phrase": "Self-taught",
          "vietnamese": "Tự học"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a helpful person that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a helpful person, which is something that has always been close to my heart. **To pick up a new skill** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **hands-on experience** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **trial and error**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-gift-you-received",
    "part": 2,
    "topic": "A Gift You Received",
    "question": "Describe a meaningful gift you received.",
    "prompts": [
      "What the gift was",
      "Who gave it to you",
      "When you received it",
      "Why it was meaningful"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "An inspiring figure",
          "vietnamese": "Một nhân vật truyền cảm hứng"
        },
        {
          "phrase": "To look up to someone",
          "vietnamese": "Ngưỡng mộ ai đó"
        },
        {
          "phrase": "A role model",
          "vietnamese": "Hình mẫu lý tưởng"
        },
        {
          "phrase": "To have a profound impact on",
          "vietnamese": "Có ảnh hưởng sâu sắc đến"
        },
        {
          "phrase": "Selfless dedication",
          "vietnamese": "Sự cống hiến vô tư"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a gift you received that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a gift you received, which is something that has always been close to my heart. **An inspiring figure** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **to look up to someone** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **a role model**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-an-environmental-problem",
    "part": 2,
    "topic": "An Environmental Problem",
    "question": "Describe an environmental problem in your area.",
    "prompts": [
      "What the problem is",
      "What causes it",
      "How it affects people",
      "What can be done about it"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A once-in-a-lifetime trip",
          "vietnamese": "Chuyến đi có một không hai"
        },
        {
          "phrase": "Breathtaking scenery",
          "vietnamese": "Phong cảnh ngoạn mục"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Culture shock",
          "vietnamese": "Sốc văn hóa"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific an environmental problem that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about an environmental problem, which is something that has always been close to my heart. **A once-in-a-lifetime trip** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **breathtaking scenery** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **to broaden one's horizons**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-job-you-would-like",
    "part": 2,
    "topic": "A Job You Would Like",
    "question": "Describe a job you would like to have in the future.",
    "prompts": [
      "What the job is",
      "Why you are interested",
      "What skills it requires",
      "How you plan to get it"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pick up a new skill",
          "vietnamese": "Học một kỹ năng mới"
        },
        {
          "phrase": "Hands-on experience",
          "vietnamese": "Kinh nghiệm thực tiễn"
        },
        {
          "phrase": "Trial and error",
          "vietnamese": "Thử và sai"
        },
        {
          "phrase": "A transferable skill",
          "vietnamese": "Kỹ năng có thể ứng dụng nhiều nơi"
        },
        {
          "phrase": "Self-taught",
          "vietnamese": "Tự học"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a job you would like that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a job you would like, which is something that has always been close to my heart. **To pick up a new skill** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **hands-on experience** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **trial and error**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-historical-event",
    "part": 2,
    "topic": "A Historical Event",
    "question": "Describe a historical event that interests you.",
    "prompts": [
      "What the event was",
      "When it happened",
      "Why it was important",
      "How you learned about it"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "An inspiring figure",
          "vietnamese": "Một nhân vật truyền cảm hứng"
        },
        {
          "phrase": "To look up to someone",
          "vietnamese": "Ngưỡng mộ ai đó"
        },
        {
          "phrase": "A role model",
          "vietnamese": "Hình mẫu lý tưởng"
        },
        {
          "phrase": "To have a profound impact on",
          "vietnamese": "Có ảnh hưởng sâu sắc đến"
        },
        {
          "phrase": "Selfless dedication",
          "vietnamese": "Sự cống hiến vô tư"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a historical event that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a historical event, which is something that has always been close to my heart. **An inspiring figure** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **to look up to someone** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **a role model**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-change-in-your-life",
    "part": 2,
    "topic": "A Change in Your Life",
    "question": "Describe a significant change in your life.",
    "prompts": [
      "What the change was",
      "When it happened",
      "How it affected you",
      "Whether you think it was positive"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A once-in-a-lifetime trip",
          "vietnamese": "Chuyến đi có một không hai"
        },
        {
          "phrase": "Breathtaking scenery",
          "vietnamese": "Phong cảnh ngoạn mục"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Culture shock",
          "vietnamese": "Sốc văn hóa"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a change in your life that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a change in your life, which is something that has always been close to my heart. **A once-in-a-lifetime trip** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **breathtaking scenery** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **to broaden one's horizons**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-language-you-want-to-learn",
    "part": 2,
    "topic": "A Language You Want to Learn",
    "question": "Describe a language you would like to learn.",
    "prompts": [
      "What language it is",
      "Why you want to learn it",
      "How you plan to learn it",
      "What benefits it would bring"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pick up a new skill",
          "vietnamese": "Học một kỹ năng mới"
        },
        {
          "phrase": "Hands-on experience",
          "vietnamese": "Kinh nghiệm thực tiễn"
        },
        {
          "phrase": "Trial and error",
          "vietnamese": "Thử và sai"
        },
        {
          "phrase": "A transferable skill",
          "vietnamese": "Kỹ năng có thể ứng dụng nhiều nơi"
        },
        {
          "phrase": "Self-taught",
          "vietnamese": "Tự học"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a language you want to learn that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a language you want to learn, which is something that has always been close to my heart. **To pick up a new skill** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **hands-on experience** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **trial and error**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-crowded-place",
    "part": 2,
    "topic": "A Crowded Place",
    "question": "Describe a very crowded place you have been to.",
    "prompts": [
      "Where it was",
      "When you went there",
      "What you did there",
      "How you felt about the crowd"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "An inspiring figure",
          "vietnamese": "Một nhân vật truyền cảm hứng"
        },
        {
          "phrase": "To look up to someone",
          "vietnamese": "Ngưỡng mộ ai đó"
        },
        {
          "phrase": "A role model",
          "vietnamese": "Hình mẫu lý tưởng"
        },
        {
          "phrase": "To have a profound impact on",
          "vietnamese": "Có ảnh hưởng sâu sắc đến"
        },
        {
          "phrase": "Selfless dedication",
          "vietnamese": "Sự cống hiến vô tư"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a crowded place that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a crowded place, which is something that has always been close to my heart. **An inspiring figure** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **to look up to someone** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **a role model**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-an-exciting-activity",
    "part": 2,
    "topic": "An Exciting Activity",
    "question": "Describe an exciting activity you have tried.",
    "prompts": [
      "What the activity was",
      "Where you did it",
      "Who you did it with",
      "Why it was exciting"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A once-in-a-lifetime trip",
          "vietnamese": "Chuyến đi có một không hai"
        },
        {
          "phrase": "Breathtaking scenery",
          "vietnamese": "Phong cảnh ngoạn mục"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Culture shock",
          "vietnamese": "Sốc văn hóa"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific an exciting activity that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about an exciting activity, which is something that has always been close to my heart. **A once-in-a-lifetime trip** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **breathtaking scenery** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **to broaden one's horizons**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-tradition-in-your-family",
    "part": 2,
    "topic": "A Tradition in Your Family",
    "question": "Describe a tradition in your family.",
    "prompts": [
      "What the tradition is",
      "How long it has existed",
      "What you do during it",
      "Why it is important to your family"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pick up a new skill",
          "vietnamese": "Học một kỹ năng mới"
        },
        {
          "phrase": "Hands-on experience",
          "vietnamese": "Kinh nghiệm thực tiễn"
        },
        {
          "phrase": "Trial and error",
          "vietnamese": "Thử và sai"
        },
        {
          "phrase": "A transferable skill",
          "vietnamese": "Kỹ năng có thể ứng dụng nhiều nơi"
        },
        {
          "phrase": "Self-taught",
          "vietnamese": "Tự học"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a tradition in your family that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a tradition in your family, which is something that has always been close to my heart. **To pick up a new skill** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **hands-on experience** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **trial and error**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-problem-you-solved",
    "part": 2,
    "topic": "A Problem You Solved",
    "question": "Describe a problem you solved at work or school.",
    "prompts": [
      "What the problem was",
      "How you identified it",
      "What solution you found",
      "What the outcome was"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "An inspiring figure",
          "vietnamese": "Một nhân vật truyền cảm hứng"
        },
        {
          "phrase": "To look up to someone",
          "vietnamese": "Ngưỡng mộ ai đó"
        },
        {
          "phrase": "A role model",
          "vietnamese": "Hình mẫu lý tưởng"
        },
        {
          "phrase": "To have a profound impact on",
          "vietnamese": "Có ảnh hưởng sâu sắc đến"
        },
        {
          "phrase": "Selfless dedication",
          "vietnamese": "Sự cống hiến vô tư"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a problem you solved that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a problem you solved, which is something that has always been close to my heart. **An inspiring figure** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **to look up to someone** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **a role model**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-meal-you-cooked",
    "part": 2,
    "topic": "A Meal You Cooked",
    "question": "Describe a special meal you cooked for others.",
    "prompts": [
      "What you cooked",
      "Who you cooked for",
      "How you prepared it",
      "How people reacted"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A once-in-a-lifetime trip",
          "vietnamese": "Chuyến đi có một không hai"
        },
        {
          "phrase": "Breathtaking scenery",
          "vietnamese": "Phong cảnh ngoạn mục"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Culture shock",
          "vietnamese": "Sốc văn hóa"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a meal you cooked that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a meal you cooked, which is something that has always been close to my heart. **A once-in-a-lifetime trip** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **breathtaking scenery** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **to broaden one's horizons**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-news-story",
    "part": 2,
    "topic": "A News Story",
    "question": "Describe a recent news story that interested you.",
    "prompts": [
      "What the story was about",
      "Where you heard about it",
      "Why it interested you",
      "What your opinion is"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pick up a new skill",
          "vietnamese": "Học một kỹ năng mới"
        },
        {
          "phrase": "Hands-on experience",
          "vietnamese": "Kinh nghiệm thực tiễn"
        },
        {
          "phrase": "Trial and error",
          "vietnamese": "Thử và sai"
        },
        {
          "phrase": "A transferable skill",
          "vietnamese": "Kỹ năng có thể ứng dụng nhiều nơi"
        },
        {
          "phrase": "Self-taught",
          "vietnamese": "Tự học"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a news story that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a news story, which is something that has always been close to my heart. **To pick up a new skill** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **hands-on experience** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **trial and error**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-building-you-like",
    "part": 2,
    "topic": "A Building You Like",
    "question": "Describe a building you find interesting or beautiful.",
    "prompts": [
      "Where it is",
      "What it looks like",
      "What it is used for",
      "Why you find it interesting"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "An inspiring figure",
          "vietnamese": "Một nhân vật truyền cảm hứng"
        },
        {
          "phrase": "To look up to someone",
          "vietnamese": "Ngưỡng mộ ai đó"
        },
        {
          "phrase": "A role model",
          "vietnamese": "Hình mẫu lý tưởng"
        },
        {
          "phrase": "To have a profound impact on",
          "vietnamese": "Có ảnh hưởng sâu sắc đến"
        },
        {
          "phrase": "Selfless dedication",
          "vietnamese": "Sự cống hiến vô tư"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a building you like that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a building you like, which is something that has always been close to my heart. **An inspiring figure** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **to look up to someone** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **a role model**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-time-you-helped-someone",
    "part": 2,
    "topic": "A Time You Helped Someone",
    "question": "Describe a time you helped someone.",
    "prompts": [
      "Who you helped",
      "What the situation was",
      "How you helped them",
      "How you felt afterwards"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A once-in-a-lifetime trip",
          "vietnamese": "Chuyến đi có một không hai"
        },
        {
          "phrase": "Breathtaking scenery",
          "vietnamese": "Phong cảnh ngoạn mục"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Culture shock",
          "vietnamese": "Sốc văn hóa"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a time you helped someone that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a time you helped someone, which is something that has always been close to my heart. **A once-in-a-lifetime trip** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **breathtaking scenery** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **to broaden one's horizons**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-an-ambition-you-have",
    "part": 2,
    "topic": "An Ambition You Have",
    "question": "Describe a long-term ambition you have.",
    "prompts": [
      "What the ambition is",
      "How long you have had it",
      "What steps you are taking",
      "Why it matters to you"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pick up a new skill",
          "vietnamese": "Học một kỹ năng mới"
        },
        {
          "phrase": "Hands-on experience",
          "vietnamese": "Kinh nghiệm thực tiễn"
        },
        {
          "phrase": "Trial and error",
          "vietnamese": "Thử và sai"
        },
        {
          "phrase": "A transferable skill",
          "vietnamese": "Kỹ năng có thể ứng dụng nhiều nơi"
        },
        {
          "phrase": "Self-taught",
          "vietnamese": "Tự học"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific an ambition you have that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about an ambition you have, which is something that has always been close to my heart. **To pick up a new skill** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **hands-on experience** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **trial and error**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-photo-you-like",
    "part": 2,
    "topic": "A Photo You Like",
    "question": "Describe a photograph that you particularly like.",
    "prompts": [
      "What the photo shows",
      "When it was taken",
      "Who is in it",
      "Why you like it"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "An inspiring figure",
          "vietnamese": "Một nhân vật truyền cảm hứng"
        },
        {
          "phrase": "To look up to someone",
          "vietnamese": "Ngưỡng mộ ai đó"
        },
        {
          "phrase": "A role model",
          "vietnamese": "Hình mẫu lý tưởng"
        },
        {
          "phrase": "To have a profound impact on",
          "vietnamese": "Có ảnh hưởng sâu sắc đến"
        },
        {
          "phrase": "Selfless dedication",
          "vietnamese": "Sự cống hiến vô tư"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a photo you like that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a photo you like, which is something that has always been close to my heart. **An inspiring figure** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **to look up to someone** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **a role model**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-risk-you-took",
    "part": 2,
    "topic": "A Risk You Took",
    "question": "Describe a time you took a risk.",
    "prompts": [
      "What the risk was",
      "Why you decided to take it",
      "What happened as a result",
      "Whether you would do it again"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A once-in-a-lifetime trip",
          "vietnamese": "Chuyến đi có một không hai"
        },
        {
          "phrase": "Breathtaking scenery",
          "vietnamese": "Phong cảnh ngoạn mục"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Culture shock",
          "vietnamese": "Sốc văn hóa"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a risk you took that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a risk you took, which is something that has always been close to my heart. **A once-in-a-lifetime trip** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **breathtaking scenery** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **to broaden one's horizons**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-tv-program",
    "part": 2,
    "topic": "A TV Program",
    "question": "Describe a TV program you enjoy watching.",
    "prompts": [
      "What the program is",
      "What it is about",
      "How often you watch it",
      "Why you enjoy it"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pick up a new skill",
          "vietnamese": "Học một kỹ năng mới"
        },
        {
          "phrase": "Hands-on experience",
          "vietnamese": "Kinh nghiệm thực tiễn"
        },
        {
          "phrase": "Trial and error",
          "vietnamese": "Thử và sai"
        },
        {
          "phrase": "A transferable skill",
          "vietnamese": "Kỹ năng có thể ứng dụng nhiều nơi"
        },
        {
          "phrase": "Self-taught",
          "vietnamese": "Tự học"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a tv program that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a tv program, which is something that has always been close to my heart. **To pick up a new skill** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **hands-on experience** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **trial and error**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-an-invention",
    "part": 2,
    "topic": "An Invention",
    "question": "Describe an invention that has changed people's lives.",
    "prompts": [
      "What the invention is",
      "How it works",
      "How it has changed lives",
      "Why you think it is important"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "An inspiring figure",
          "vietnamese": "Một nhân vật truyền cảm hứng"
        },
        {
          "phrase": "To look up to someone",
          "vietnamese": "Ngưỡng mộ ai đó"
        },
        {
          "phrase": "A role model",
          "vietnamese": "Hình mẫu lý tưởng"
        },
        {
          "phrase": "To have a profound impact on",
          "vietnamese": "Có ảnh hưởng sâu sắc đến"
        },
        {
          "phrase": "Selfless dedication",
          "vietnamese": "Sự cống hiến vô tư"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific an invention that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about an invention, which is something that has always been close to my heart. **An inspiring figure** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **to look up to someone** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **a role model**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-time-you-were-late",
    "part": 2,
    "topic": "A Time You Were Late",
    "question": "Describe a time you were late for something important.",
    "prompts": [
      "What the event was",
      "Why you were late",
      "What happened as a result",
      "How you felt about it"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A once-in-a-lifetime trip",
          "vietnamese": "Chuyến đi có một không hai"
        },
        {
          "phrase": "Breathtaking scenery",
          "vietnamese": "Phong cảnh ngoạn mục"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Culture shock",
          "vietnamese": "Sốc văn hóa"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a time you were late that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a time you were late, which is something that has always been close to my heart. **A once-in-a-lifetime trip** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **breathtaking scenery** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **to broaden one's horizons**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-piece-of-advice",
    "part": 2,
    "topic": "A Piece of Advice",
    "question": "Describe a piece of advice that helped you.",
    "prompts": [
      "What the advice was",
      "Who gave it to you",
      "When you received it",
      "How it helped you"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pick up a new skill",
          "vietnamese": "Học một kỹ năng mới"
        },
        {
          "phrase": "Hands-on experience",
          "vietnamese": "Kinh nghiệm thực tiễn"
        },
        {
          "phrase": "Trial and error",
          "vietnamese": "Thử và sai"
        },
        {
          "phrase": "A transferable skill",
          "vietnamese": "Kỹ năng có thể ứng dụng nhiều nơi"
        },
        {
          "phrase": "Self-taught",
          "vietnamese": "Tự học"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a piece of advice that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a piece of advice, which is something that has always been close to my heart. **To pick up a new skill** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **hands-on experience** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **trial and error**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-place-where-you-study",
    "part": 2,
    "topic": "A Place Where You Study",
    "question": "Describe your favorite place to study.",
    "prompts": [
      "Where it is",
      "What it looks like",
      "How often you go there",
      "Why you prefer studying there"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "An inspiring figure",
          "vietnamese": "Một nhân vật truyền cảm hứng"
        },
        {
          "phrase": "To look up to someone",
          "vietnamese": "Ngưỡng mộ ai đó"
        },
        {
          "phrase": "A role model",
          "vietnamese": "Hình mẫu lý tưởng"
        },
        {
          "phrase": "To have a profound impact on",
          "vietnamese": "Có ảnh hưởng sâu sắc đến"
        },
        {
          "phrase": "Selfless dedication",
          "vietnamese": "Sự cống hiến vô tư"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a place where you study that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a place where you study, which is something that has always been close to my heart. **An inspiring figure** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **to look up to someone** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **a role model**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-website-you-use",
    "part": 2,
    "topic": "A Website You Use",
    "question": "Describe a website you use frequently.",
    "prompts": [
      "What the website is",
      "What it offers",
      "How often you use it",
      "Why you find it useful"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A once-in-a-lifetime trip",
          "vietnamese": "Chuyến đi có một không hai"
        },
        {
          "phrase": "Breathtaking scenery",
          "vietnamese": "Phong cảnh ngoạn mục"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Culture shock",
          "vietnamese": "Sốc văn hóa"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a website you use that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a website you use, which is something that has always been close to my heart. **A once-in-a-lifetime trip** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **breathtaking scenery** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **to broaden one's horizons**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-an-old-person-you-respect",
    "part": 2,
    "topic": "An Old Person You Respect",
    "question": "Describe an elderly person you respect.",
    "prompts": [
      "Who this person is",
      "How you know them",
      "What they have achieved",
      "Why you respect them"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pick up a new skill",
          "vietnamese": "Học một kỹ năng mới"
        },
        {
          "phrase": "Hands-on experience",
          "vietnamese": "Kinh nghiệm thực tiễn"
        },
        {
          "phrase": "Trial and error",
          "vietnamese": "Thử và sai"
        },
        {
          "phrase": "A transferable skill",
          "vietnamese": "Kỹ năng có thể ứng dụng nhiều nơi"
        },
        {
          "phrase": "Self-taught",
          "vietnamese": "Tự học"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific an old person you respect that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about an old person you respect, which is something that has always been close to my heart. **To pick up a new skill** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **hands-on experience** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **trial and error**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-rainy-day-memory",
    "part": 2,
    "topic": "A Rainy Day Memory",
    "question": "Describe something you did on a rainy day.",
    "prompts": [
      "What you did",
      "Where you were",
      "Who you were with",
      "How you felt about it"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "An inspiring figure",
          "vietnamese": "Một nhân vật truyền cảm hứng"
        },
        {
          "phrase": "To look up to someone",
          "vietnamese": "Ngưỡng mộ ai đó"
        },
        {
          "phrase": "A role model",
          "vietnamese": "Hình mẫu lý tưởng"
        },
        {
          "phrase": "To have a profound impact on",
          "vietnamese": "Có ảnh hưởng sâu sắc đến"
        },
        {
          "phrase": "Selfless dedication",
          "vietnamese": "Sự cống hiến vô tư"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a rainy day memory that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a rainy day memory, which is something that has always been close to my heart. **An inspiring figure** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **to look up to someone** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **a role model**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-competition",
    "part": 2,
    "topic": "A Competition",
    "question": "Describe a competition you participated in.",
    "prompts": [
      "What the competition was",
      "When it took place",
      "How you prepared",
      "What the result was"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A once-in-a-lifetime trip",
          "vietnamese": "Chuyến đi có một không hai"
        },
        {
          "phrase": "Breathtaking scenery",
          "vietnamese": "Phong cảnh ngoạn mục"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Culture shock",
          "vietnamese": "Sốc văn hóa"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a competition that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a competition, which is something that has always been close to my heart. **A once-in-a-lifetime trip** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **breathtaking scenery** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **to broaden one's horizons**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-new-development",
    "part": 2,
    "topic": "A New Development",
    "question": "Describe a new development in your city or town.",
    "prompts": [
      "What the development is",
      "Where it is located",
      "How it has changed the area",
      "What your opinion is"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pick up a new skill",
          "vietnamese": "Học một kỹ năng mới"
        },
        {
          "phrase": "Hands-on experience",
          "vietnamese": "Kinh nghiệm thực tiễn"
        },
        {
          "phrase": "Trial and error",
          "vietnamese": "Thử và sai"
        },
        {
          "phrase": "A transferable skill",
          "vietnamese": "Kỹ năng có thể ứng dụng nhiều nơi"
        },
        {
          "phrase": "Self-taught",
          "vietnamese": "Tự học"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a new development that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a new development, which is something that has always been close to my heart. **To pick up a new skill** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **hands-on experience** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **trial and error**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-friend-you-admire",
    "part": 2,
    "topic": "A Friend You Admire",
    "question": "Describe a close friend you admire.",
    "prompts": [
      "Who they are",
      "How you met",
      "What qualities they have",
      "Why you admire them"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "An inspiring figure",
          "vietnamese": "Một nhân vật truyền cảm hứng"
        },
        {
          "phrase": "To look up to someone",
          "vietnamese": "Ngưỡng mộ ai đó"
        },
        {
          "phrase": "A role model",
          "vietnamese": "Hình mẫu lý tưởng"
        },
        {
          "phrase": "To have a profound impact on",
          "vietnamese": "Có ảnh hưởng sâu sắc đến"
        },
        {
          "phrase": "Selfless dedication",
          "vietnamese": "Sự cống hiến vô tư"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a friend you admire that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a friend you admire, which is something that has always been close to my heart. **An inspiring figure** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **to look up to someone** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **a role model**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-volunteering-experience",
    "part": 2,
    "topic": "A Volunteering Experience",
    "question": "Describe a volunteering experience you had.",
    "prompts": [
      "What you did",
      "Where it was",
      "Who you helped",
      "What you gained from it"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A once-in-a-lifetime trip",
          "vietnamese": "Chuyến đi có một không hai"
        },
        {
          "phrase": "Breathtaking scenery",
          "vietnamese": "Phong cảnh ngoạn mục"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Culture shock",
          "vietnamese": "Sốc văn hóa"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a volunteering experience that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a volunteering experience, which is something that has always been close to my heart. **A once-in-a-lifetime trip** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **breathtaking scenery** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **to broaden one's horizons**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-childhood-toy",
    "part": 2,
    "topic": "A Childhood Toy",
    "question": "Describe a toy you loved as a child.",
    "prompts": [
      "What the toy was",
      "Who gave it to you",
      "How you played with it",
      "Why it was special"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pick up a new skill",
          "vietnamese": "Học một kỹ năng mới"
        },
        {
          "phrase": "Hands-on experience",
          "vietnamese": "Kinh nghiệm thực tiễn"
        },
        {
          "phrase": "Trial and error",
          "vietnamese": "Thử và sai"
        },
        {
          "phrase": "A transferable skill",
          "vietnamese": "Kỹ năng có thể ứng dụng nhiều nơi"
        },
        {
          "phrase": "Self-taught",
          "vietnamese": "Tự học"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a childhood toy that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a childhood toy, which is something that has always been close to my heart. **To pick up a new skill** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **hands-on experience** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **trial and error**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-science-subject",
    "part": 2,
    "topic": "A Science Subject",
    "question": "Describe a science subject you find interesting.",
    "prompts": [
      "What the subject is",
      "How you learned about it",
      "What aspects interest you",
      "Why you think it is important"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "An inspiring figure",
          "vietnamese": "Một nhân vật truyền cảm hứng"
        },
        {
          "phrase": "To look up to someone",
          "vietnamese": "Ngưỡng mộ ai đó"
        },
        {
          "phrase": "A role model",
          "vietnamese": "Hình mẫu lý tưởng"
        },
        {
          "phrase": "To have a profound impact on",
          "vietnamese": "Có ảnh hưởng sâu sắc đến"
        },
        {
          "phrase": "Selfless dedication",
          "vietnamese": "Sự cống hiến vô tư"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a science subject that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a science subject, which is something that has always been close to my heart. **An inspiring figure** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **to look up to someone** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **a role model**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-wedding-you-attended",
    "part": 2,
    "topic": "A Wedding You Attended",
    "question": "Describe a wedding you attended.",
    "prompts": [
      "Whose wedding it was",
      "Where it took place",
      "What happened",
      "What you enjoyed most"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A once-in-a-lifetime trip",
          "vietnamese": "Chuyến đi có một không hai"
        },
        {
          "phrase": "Breathtaking scenery",
          "vietnamese": "Phong cảnh ngoạn mục"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Culture shock",
          "vietnamese": "Sốc văn hóa"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a wedding you attended that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a wedding you attended, which is something that has always been close to my heart. **A once-in-a-lifetime trip** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **breathtaking scenery** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **to broaden one's horizons**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-public-transport-journey",
    "part": 2,
    "topic": "A Public Transport Journey",
    "question": "Describe a long journey you made by public transport.",
    "prompts": [
      "Where you went",
      "What transport you used",
      "How long it took",
      "What you did during the journey"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pick up a new skill",
          "vietnamese": "Học một kỹ năng mới"
        },
        {
          "phrase": "Hands-on experience",
          "vietnamese": "Kinh nghiệm thực tiễn"
        },
        {
          "phrase": "Trial and error",
          "vietnamese": "Thử và sai"
        },
        {
          "phrase": "A transferable skill",
          "vietnamese": "Kỹ năng có thể ứng dụng nhiều nơi"
        },
        {
          "phrase": "Self-taught",
          "vietnamese": "Tự học"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a public transport journey that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a public transport journey, which is something that has always been close to my heart. **To pick up a new skill** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **hands-on experience** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **trial and error**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-dream-you-had",
    "part": 2,
    "topic": "A Dream You Had",
    "question": "Describe a dream or goal you had as a child.",
    "prompts": [
      "What the dream was",
      "When you had it",
      "Whether it has changed",
      "How you feel about it now"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "An inspiring figure",
          "vietnamese": "Một nhân vật truyền cảm hứng"
        },
        {
          "phrase": "To look up to someone",
          "vietnamese": "Ngưỡng mộ ai đó"
        },
        {
          "phrase": "A role model",
          "vietnamese": "Hình mẫu lý tưởng"
        },
        {
          "phrase": "To have a profound impact on",
          "vietnamese": "Có ảnh hưởng sâu sắc đến"
        },
        {
          "phrase": "Selfless dedication",
          "vietnamese": "Sự cống hiến vô tư"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a dream you had that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a dream you had, which is something that has always been close to my heart. **An inspiring figure** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **to look up to someone** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **a role model**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-local-business",
    "part": 2,
    "topic": "A Local Business",
    "question": "Describe a local business you often visit.",
    "prompts": [
      "What the business is",
      "Where it is located",
      "What it sells or offers",
      "Why you go there often"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A once-in-a-lifetime trip",
          "vietnamese": "Chuyến đi có một không hai"
        },
        {
          "phrase": "Breathtaking scenery",
          "vietnamese": "Phong cảnh ngoạn mục"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Culture shock",
          "vietnamese": "Sốc văn hóa"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a local business that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a local business, which is something that has always been close to my heart. **A once-in-a-lifetime trip** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **breathtaking scenery** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **to broaden one's horizons**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-misunderstanding",
    "part": 2,
    "topic": "A Misunderstanding",
    "question": "Describe a misunderstanding you had with someone.",
    "prompts": [
      "What the misunderstanding was",
      "When it happened",
      "How it was resolved",
      "What you learned from it"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pick up a new skill",
          "vietnamese": "Học một kỹ năng mới"
        },
        {
          "phrase": "Hands-on experience",
          "vietnamese": "Kinh nghiệm thực tiễn"
        },
        {
          "phrase": "Trial and error",
          "vietnamese": "Thử và sai"
        },
        {
          "phrase": "A transferable skill",
          "vietnamese": "Kỹ năng có thể ứng dụng nhiều nơi"
        },
        {
          "phrase": "Self-taught",
          "vietnamese": "Tự học"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a misunderstanding that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a misunderstanding, which is something that has always been close to my heart. **To pick up a new skill** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **hands-on experience** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **trial and error**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-an-animal-you-like",
    "part": 2,
    "topic": "An Animal You Like",
    "question": "Describe an animal you find interesting.",
    "prompts": [
      "What the animal is",
      "Where you saw it",
      "What it looked like",
      "Why you find it interesting"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "An inspiring figure",
          "vietnamese": "Một nhân vật truyền cảm hứng"
        },
        {
          "phrase": "To look up to someone",
          "vietnamese": "Ngưỡng mộ ai đó"
        },
        {
          "phrase": "A role model",
          "vietnamese": "Hình mẫu lý tưởng"
        },
        {
          "phrase": "To have a profound impact on",
          "vietnamese": "Có ảnh hưởng sâu sắc đến"
        },
        {
          "phrase": "Selfless dedication",
          "vietnamese": "Sự cống hiến vô tư"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific an animal you like that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about an animal you like, which is something that has always been close to my heart. **An inspiring figure** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **to look up to someone** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **a role model**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-famous-landmark",
    "part": 2,
    "topic": "A Famous Landmark",
    "question": "Describe a famous landmark you have visited or want to visit.",
    "prompts": [
      "What it is",
      "Where it is located",
      "What it is famous for",
      "Why you want to visit or enjoyed visiting it"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A once-in-a-lifetime trip",
          "vietnamese": "Chuyến đi có một không hai"
        },
        {
          "phrase": "Breathtaking scenery",
          "vietnamese": "Phong cảnh ngoạn mục"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Culture shock",
          "vietnamese": "Sốc văn hóa"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a famous landmark that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a famous landmark, which is something that has always been close to my heart. **A once-in-a-lifetime trip** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **breathtaking scenery** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **to broaden one's horizons**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-time-you-were-proud",
    "part": 2,
    "topic": "A Time You Were Proud",
    "question": "Describe an achievement you are proud of.",
    "prompts": [
      "What you achieved",
      "When it happened",
      "How you achieved it",
      "Why you are proud of it"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pick up a new skill",
          "vietnamese": "Học một kỹ năng mới"
        },
        {
          "phrase": "Hands-on experience",
          "vietnamese": "Kinh nghiệm thực tiễn"
        },
        {
          "phrase": "Trial and error",
          "vietnamese": "Thử và sai"
        },
        {
          "phrase": "A transferable skill",
          "vietnamese": "Kỹ năng có thể ứng dụng nhiều nơi"
        },
        {
          "phrase": "Self-taught",
          "vietnamese": "Tự học"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a time you were proud that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a time you were proud, which is something that has always been close to my heart. **To pick up a new skill** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **hands-on experience** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **trial and error**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-boring-activity",
    "part": 2,
    "topic": "A Boring Activity",
    "question": "Describe an activity you find boring.",
    "prompts": [
      "What the activity is",
      "When you usually do it",
      "Why you find it boring",
      "What you do to make it less boring"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "An inspiring figure",
          "vietnamese": "Một nhân vật truyền cảm hứng"
        },
        {
          "phrase": "To look up to someone",
          "vietnamese": "Ngưỡng mộ ai đó"
        },
        {
          "phrase": "A role model",
          "vietnamese": "Hình mẫu lý tưởng"
        },
        {
          "phrase": "To have a profound impact on",
          "vietnamese": "Có ảnh hưởng sâu sắc đến"
        },
        {
          "phrase": "Selfless dedication",
          "vietnamese": "Sự cống hiến vô tư"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a boring activity that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a boring activity, which is something that has always been close to my heart. **An inspiring figure** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **to look up to someone** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **a role model**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-surprise-you-received",
    "part": 2,
    "topic": "A Surprise You Received",
    "question": "Describe a surprise someone gave you.",
    "prompts": [
      "What the surprise was",
      "Who planned it",
      "How you found out",
      "How you felt about it"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A once-in-a-lifetime trip",
          "vietnamese": "Chuyến đi có một không hai"
        },
        {
          "phrase": "Breathtaking scenery",
          "vietnamese": "Phong cảnh ngoạn mục"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Culture shock",
          "vietnamese": "Sốc văn hóa"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a surprise you received that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a surprise you received, which is something that has always been close to my heart. **A once-in-a-lifetime trip** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **breathtaking scenery** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **to broaden one's horizons**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-museum-or-gallery",
    "part": 2,
    "topic": "A Museum or Gallery",
    "question": "Describe a museum or art gallery you visited.",
    "prompts": [
      "Where it was",
      "What you saw there",
      "Who you went with",
      "What you enjoyed most"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pick up a new skill",
          "vietnamese": "Học một kỹ năng mới"
        },
        {
          "phrase": "Hands-on experience",
          "vietnamese": "Kinh nghiệm thực tiễn"
        },
        {
          "phrase": "Trial and error",
          "vietnamese": "Thử và sai"
        },
        {
          "phrase": "A transferable skill",
          "vietnamese": "Kỹ năng có thể ứng dụng nhiều nơi"
        },
        {
          "phrase": "Self-taught",
          "vietnamese": "Tự học"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a museum or gallery that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a museum or gallery, which is something that has always been close to my heart. **To pick up a new skill** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **hands-on experience** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **trial and error**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-rule-you-disagree-with",
    "part": 2,
    "topic": "A Rule You Disagree With",
    "question": "Describe a rule at school or work you disagree with.",
    "prompts": [
      "What the rule is",
      "Why it exists",
      "Why you disagree",
      "What you would change"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "An inspiring figure",
          "vietnamese": "Một nhân vật truyền cảm hứng"
        },
        {
          "phrase": "To look up to someone",
          "vietnamese": "Ngưỡng mộ ai đó"
        },
        {
          "phrase": "A role model",
          "vietnamese": "Hình mẫu lý tưởng"
        },
        {
          "phrase": "To have a profound impact on",
          "vietnamese": "Có ảnh hưởng sâu sắc đến"
        },
        {
          "phrase": "Selfless dedication",
          "vietnamese": "Sự cống hiến vô tư"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a rule you disagree with that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a rule you disagree with, which is something that has always been close to my heart. **An inspiring figure** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **to look up to someone** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **a role model**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-foreign-dish",
    "part": 2,
    "topic": "A Foreign Dish",
    "question": "Describe a dish from another country you have tried.",
    "prompts": [
      "What the dish was",
      "Where you tried it",
      "How it tasted",
      "Whether you would eat it again"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A once-in-a-lifetime trip",
          "vietnamese": "Chuyến đi có một không hai"
        },
        {
          "phrase": "Breathtaking scenery",
          "vietnamese": "Phong cảnh ngoạn mục"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Culture shock",
          "vietnamese": "Sốc văn hóa"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a foreign dish that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a foreign dish, which is something that has always been close to my heart. **A once-in-a-lifetime trip** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **breathtaking scenery** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **to broaden one's horizons**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-neighbor-you-know",
    "part": 2,
    "topic": "A Neighbor You Know",
    "question": "Describe a neighbor you get along with.",
    "prompts": [
      "Who they are",
      "How long you have known them",
      "What you do together",
      "Why you get along well"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pick up a new skill",
          "vietnamese": "Học một kỹ năng mới"
        },
        {
          "phrase": "Hands-on experience",
          "vietnamese": "Kinh nghiệm thực tiễn"
        },
        {
          "phrase": "Trial and error",
          "vietnamese": "Thử và sai"
        },
        {
          "phrase": "A transferable skill",
          "vietnamese": "Kỹ năng có thể ứng dụng nhiều nơi"
        },
        {
          "phrase": "Self-taught",
          "vietnamese": "Tự học"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a neighbor you know that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a neighbor you know, which is something that has always been close to my heart. **To pick up a new skill** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **hands-on experience** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **trial and error**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-street-market",
    "part": 2,
    "topic": "A Street Market",
    "question": "Describe a street market or outdoor market you visited.",
    "prompts": [
      "Where it was",
      "What was sold there",
      "What you bought",
      "What you liked about it"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "An inspiring figure",
          "vietnamese": "Một nhân vật truyền cảm hứng"
        },
        {
          "phrase": "To look up to someone",
          "vietnamese": "Ngưỡng mộ ai đó"
        },
        {
          "phrase": "A role model",
          "vietnamese": "Hình mẫu lý tưởng"
        },
        {
          "phrase": "To have a profound impact on",
          "vietnamese": "Có ảnh hưởng sâu sắc đến"
        },
        {
          "phrase": "Selfless dedication",
          "vietnamese": "Sự cống hiến vô tư"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a street market that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a street market, which is something that has always been close to my heart. **An inspiring figure** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **to look up to someone** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **a role model**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-learning-experience",
    "part": 2,
    "topic": "A Learning Experience",
    "question": "Describe something you learned outside of school.",
    "prompts": [
      "What you learned",
      "How you learned it",
      "Who helped you",
      "Why it was valuable"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A once-in-a-lifetime trip",
          "vietnamese": "Chuyến đi có một không hai"
        },
        {
          "phrase": "Breathtaking scenery",
          "vietnamese": "Phong cảnh ngoạn mục"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Culture shock",
          "vietnamese": "Sốc văn hóa"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a learning experience that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a learning experience, which is something that has always been close to my heart. **A once-in-a-lifetime trip** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **breathtaking scenery** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **to broaden one's horizons**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-childhood-friend",
    "part": 2,
    "topic": "A Childhood Friend",
    "question": "Describe a friend you had in childhood.",
    "prompts": [
      "Who they were",
      "How you met",
      "What you did together",
      "Whether you are still in contact"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pick up a new skill",
          "vietnamese": "Học một kỹ năng mới"
        },
        {
          "phrase": "Hands-on experience",
          "vietnamese": "Kinh nghiệm thực tiễn"
        },
        {
          "phrase": "Trial and error",
          "vietnamese": "Thử và sai"
        },
        {
          "phrase": "A transferable skill",
          "vietnamese": "Kỹ năng có thể ứng dụng nhiều nơi"
        },
        {
          "phrase": "Self-taught",
          "vietnamese": "Tự học"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a childhood friend that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a childhood friend, which is something that has always been close to my heart. **To pick up a new skill** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **hands-on experience** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **trial and error**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-piece-of-art",
    "part": 2,
    "topic": "A Piece of Art",
    "question": "Describe a piece of art that impressed you.",
    "prompts": [
      "What the artwork was",
      "Where you saw it",
      "What it depicted",
      "Why it impressed you"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "An inspiring figure",
          "vietnamese": "Một nhân vật truyền cảm hứng"
        },
        {
          "phrase": "To look up to someone",
          "vietnamese": "Ngưỡng mộ ai đó"
        },
        {
          "phrase": "A role model",
          "vietnamese": "Hình mẫu lý tưởng"
        },
        {
          "phrase": "To have a profound impact on",
          "vietnamese": "Có ảnh hưởng sâu sắc đến"
        },
        {
          "phrase": "Selfless dedication",
          "vietnamese": "Sự cống hiến vô tư"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a piece of art that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a piece of art, which is something that has always been close to my heart. **An inspiring figure** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **to look up to someone** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **a role model**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-quiet-place",
    "part": 2,
    "topic": "A Quiet Place",
    "question": "Describe a quiet place you enjoy going to.",
    "prompts": [
      "Where it is",
      "How often you go",
      "What you do there",
      "Why you enjoy the quietness"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A once-in-a-lifetime trip",
          "vietnamese": "Chuyến đi có một không hai"
        },
        {
          "phrase": "Breathtaking scenery",
          "vietnamese": "Phong cảnh ngoạn mục"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Culture shock",
          "vietnamese": "Sốc văn hóa"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a quiet place that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a quiet place, which is something that has always been close to my heart. **A once-in-a-lifetime trip** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **breathtaking scenery** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **to broaden one's horizons**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-an-outdoor-activity",
    "part": 2,
    "topic": "An Outdoor Activity",
    "question": "Describe an outdoor activity you enjoy.",
    "prompts": [
      "What the activity is",
      "Where you do it",
      "Who you do it with",
      "Why you enjoy it"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pick up a new skill",
          "vietnamese": "Học một kỹ năng mới"
        },
        {
          "phrase": "Hands-on experience",
          "vietnamese": "Kinh nghiệm thực tiễn"
        },
        {
          "phrase": "Trial and error",
          "vietnamese": "Thử và sai"
        },
        {
          "phrase": "A transferable skill",
          "vietnamese": "Kỹ năng có thể ứng dụng nhiều nơi"
        },
        {
          "phrase": "Self-taught",
          "vietnamese": "Tự học"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific an outdoor activity that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about an outdoor activity, which is something that has always been close to my heart. **To pick up a new skill** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **hands-on experience** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **trial and error**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-punctual-person",
    "part": 2,
    "topic": "A Punctual Person",
    "question": "Describe someone who is always on time.",
    "prompts": [
      "Who this person is",
      "How you know them",
      "Why they are punctual",
      "What you can learn from them"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "An inspiring figure",
          "vietnamese": "Một nhân vật truyền cảm hứng"
        },
        {
          "phrase": "To look up to someone",
          "vietnamese": "Ngưỡng mộ ai đó"
        },
        {
          "phrase": "A role model",
          "vietnamese": "Hình mẫu lý tưởng"
        },
        {
          "phrase": "To have a profound impact on",
          "vietnamese": "Có ảnh hưởng sâu sắc đến"
        },
        {
          "phrase": "Selfless dedication",
          "vietnamese": "Sự cống hiến vô tư"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a punctual person that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a punctual person, which is something that has always been close to my heart. **An inspiring figure** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **to look up to someone** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **a role model**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-podcast-or-radio-show",
    "part": 2,
    "topic": "A Podcast or Radio Show",
    "question": "Describe a podcast or radio show you enjoy.",
    "prompts": [
      "What it is about",
      "How you discovered it",
      "How often you listen",
      "Why you recommend it"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A once-in-a-lifetime trip",
          "vietnamese": "Chuyến đi có một không hai"
        },
        {
          "phrase": "Breathtaking scenery",
          "vietnamese": "Phong cảnh ngoạn mục"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Culture shock",
          "vietnamese": "Sốc văn hóa"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a podcast or radio show that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a podcast or radio show, which is something that has always been close to my heart. **A once-in-a-lifetime trip** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **breathtaking scenery** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **to broaden one's horizons**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-social-media-experience",
    "part": 2,
    "topic": "A Social Media Experience",
    "question": "Describe a positive experience you had on social media.",
    "prompts": [
      "What happened",
      "What platform it was on",
      "Who was involved",
      "Why it was positive"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pick up a new skill",
          "vietnamese": "Học một kỹ năng mới"
        },
        {
          "phrase": "Hands-on experience",
          "vietnamese": "Kinh nghiệm thực tiễn"
        },
        {
          "phrase": "Trial and error",
          "vietnamese": "Thử và sai"
        },
        {
          "phrase": "A transferable skill",
          "vietnamese": "Kỹ năng có thể ứng dụng nhiều nơi"
        },
        {
          "phrase": "Self-taught",
          "vietnamese": "Tự học"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a social media experience that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a social media experience, which is something that has always been close to my heart. **To pick up a new skill** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **hands-on experience** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **trial and error**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-an-important-river-or-lake",
    "part": 2,
    "topic": "An Important River or Lake",
    "question": "Describe an important river or lake in your country.",
    "prompts": [
      "What it is called",
      "Where it is located",
      "What it is used for",
      "Why it is important"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "An inspiring figure",
          "vietnamese": "Một nhân vật truyền cảm hứng"
        },
        {
          "phrase": "To look up to someone",
          "vietnamese": "Ngưỡng mộ ai đó"
        },
        {
          "phrase": "A role model",
          "vietnamese": "Hình mẫu lý tưởng"
        },
        {
          "phrase": "To have a profound impact on",
          "vietnamese": "Có ảnh hưởng sâu sắc đến"
        },
        {
          "phrase": "Selfless dedication",
          "vietnamese": "Sự cống hiến vô tư"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific an important river or lake that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about an important river or lake, which is something that has always been close to my heart. **An inspiring figure** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **to look up to someone** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **a role model**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-smart-phone-app",
    "part": 2,
    "topic": "A Smart Phone App",
    "question": "Describe an app on your phone that you use daily.",
    "prompts": [
      "What the app is",
      "What it does",
      "When you started using it",
      "Why you find it useful"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A once-in-a-lifetime trip",
          "vietnamese": "Chuyến đi có một không hai"
        },
        {
          "phrase": "Breathtaking scenery",
          "vietnamese": "Phong cảnh ngoạn mục"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Culture shock",
          "vietnamese": "Sốc văn hóa"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a smart phone app that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a smart phone app, which is something that has always been close to my heart. **A once-in-a-lifetime trip** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **breathtaking scenery** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **to broaden one's horizons**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-disappointing-experience",
    "part": 2,
    "topic": "A Disappointing Experience",
    "question": "Describe an experience that disappointed you.",
    "prompts": [
      "What happened",
      "When it happened",
      "Why you were disappointed",
      "How you dealt with it"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pick up a new skill",
          "vietnamese": "Học một kỹ năng mới"
        },
        {
          "phrase": "Hands-on experience",
          "vietnamese": "Kinh nghiệm thực tiễn"
        },
        {
          "phrase": "Trial and error",
          "vietnamese": "Thử và sai"
        },
        {
          "phrase": "A transferable skill",
          "vietnamese": "Kỹ năng có thể ứng dụng nhiều nơi"
        },
        {
          "phrase": "Self-taught",
          "vietnamese": "Tự học"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a disappointing experience that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a disappointing experience, which is something that has always been close to my heart. **To pick up a new skill** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **hands-on experience** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **trial and error**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-uniform-or-dress-code",
    "part": 2,
    "topic": "A Uniform or Dress Code",
    "question": "Describe a uniform or dress code you had to follow.",
    "prompts": [
      "What the dress code was",
      "Where you had to follow it",
      "How you felt about it",
      "Whether you think it was necessary"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "An inspiring figure",
          "vietnamese": "Một nhân vật truyền cảm hứng"
        },
        {
          "phrase": "To look up to someone",
          "vietnamese": "Ngưỡng mộ ai đó"
        },
        {
          "phrase": "A role model",
          "vietnamese": "Hình mẫu lý tưởng"
        },
        {
          "phrase": "To have a profound impact on",
          "vietnamese": "Có ảnh hưởng sâu sắc đến"
        },
        {
          "phrase": "Selfless dedication",
          "vietnamese": "Sự cống hiến vô tư"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a uniform or dress code that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a uniform or dress code, which is something that has always been close to my heart. **An inspiring figure** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **to look up to someone** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **a role model**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-long-walk",
    "part": 2,
    "topic": "A Long Walk",
    "question": "Describe a long walk you took.",
    "prompts": [
      "Where you walked",
      "How long it took",
      "What you saw on the way",
      "How you felt afterwards"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A once-in-a-lifetime trip",
          "vietnamese": "Chuyến đi có một không hai"
        },
        {
          "phrase": "Breathtaking scenery",
          "vietnamese": "Phong cảnh ngoạn mục"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Culture shock",
          "vietnamese": "Sốc văn hóa"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a long walk that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a long walk, which is something that has always been close to my heart. **A once-in-a-lifetime trip** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **breathtaking scenery** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **to broaden one's horizons**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-handmade-gift",
    "part": 2,
    "topic": "A Handmade Gift",
    "question": "Describe something you made by hand for someone.",
    "prompts": [
      "What you made",
      "Who it was for",
      "How you made it",
      "How the person reacted"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pick up a new skill",
          "vietnamese": "Học một kỹ năng mới"
        },
        {
          "phrase": "Hands-on experience",
          "vietnamese": "Kinh nghiệm thực tiễn"
        },
        {
          "phrase": "Trial and error",
          "vietnamese": "Thử và sai"
        },
        {
          "phrase": "A transferable skill",
          "vietnamese": "Kỹ năng có thể ứng dụng nhiều nơi"
        },
        {
          "phrase": "Self-taught",
          "vietnamese": "Tự học"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a handmade gift that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a handmade gift, which is something that has always been close to my heart. **To pick up a new skill** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **hands-on experience** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **trial and error**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-perfect-weekend",
    "part": 2,
    "topic": "A Perfect Weekend",
    "question": "Describe your idea of a perfect weekend.",
    "prompts": [
      "What you would do",
      "Where you would go",
      "Who you would spend it with",
      "Why it would be perfect"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "An inspiring figure",
          "vietnamese": "Một nhân vật truyền cảm hứng"
        },
        {
          "phrase": "To look up to someone",
          "vietnamese": "Ngưỡng mộ ai đó"
        },
        {
          "phrase": "A role model",
          "vietnamese": "Hình mẫu lý tưởng"
        },
        {
          "phrase": "To have a profound impact on",
          "vietnamese": "Có ảnh hưởng sâu sắc đến"
        },
        {
          "phrase": "Selfless dedication",
          "vietnamese": "Sự cống hiến vô tư"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a perfect weekend that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a perfect weekend, which is something that has always been close to my heart. **An inspiring figure** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **to look up to someone** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **a role model**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-song-you-know-by-heart",
    "part": 2,
    "topic": "A Song You Know by Heart",
    "question": "Describe a song you know all the words to.",
    "prompts": [
      "What the song is",
      "When you first heard it",
      "Why you memorized it",
      "What it means to you"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A once-in-a-lifetime trip",
          "vietnamese": "Chuyến đi có một không hai"
        },
        {
          "phrase": "Breathtaking scenery",
          "vietnamese": "Phong cảnh ngoạn mục"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Culture shock",
          "vietnamese": "Sốc văn hóa"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a song you know by heart that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a song you know by heart, which is something that has always been close to my heart. **A once-in-a-lifetime trip** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **breathtaking scenery** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **to broaden one's horizons**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-childhood-game",
    "part": 2,
    "topic": "A Childhood Game",
    "question": "Describe a game you played as a child.",
    "prompts": [
      "What the game was",
      "Who you played with",
      "Where you played it",
      "Why you enjoyed it"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pick up a new skill",
          "vietnamese": "Học một kỹ năng mới"
        },
        {
          "phrase": "Hands-on experience",
          "vietnamese": "Kinh nghiệm thực tiễn"
        },
        {
          "phrase": "Trial and error",
          "vietnamese": "Thử và sai"
        },
        {
          "phrase": "A transferable skill",
          "vietnamese": "Kỹ năng có thể ứng dụng nhiều nơi"
        },
        {
          "phrase": "Self-taught",
          "vietnamese": "Tự học"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a childhood game that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a childhood game, which is something that has always been close to my heart. **To pick up a new skill** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **hands-on experience** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **trial and error**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-an-unusual-job",
    "part": 2,
    "topic": "An Unusual Job",
    "question": "Describe an unusual or interesting job you have heard of.",
    "prompts": [
      "What the job is",
      "How you heard about it",
      "What skills it requires",
      "Why you find it interesting"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "An inspiring figure",
          "vietnamese": "Một nhân vật truyền cảm hứng"
        },
        {
          "phrase": "To look up to someone",
          "vietnamese": "Ngưỡng mộ ai đó"
        },
        {
          "phrase": "A role model",
          "vietnamese": "Hình mẫu lý tưởng"
        },
        {
          "phrase": "To have a profound impact on",
          "vietnamese": "Có ảnh hưởng sâu sắc đến"
        },
        {
          "phrase": "Selfless dedication",
          "vietnamese": "Sự cống hiến vô tư"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific an unusual job that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about an unusual job, which is something that has always been close to my heart. **An inspiring figure** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **to look up to someone** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **a role model**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-time-you-got-lost",
    "part": 2,
    "topic": "A Time You Got Lost",
    "question": "Describe a time you got lost.",
    "prompts": [
      "Where you were",
      "How you got lost",
      "What you did to find your way",
      "How you felt"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A once-in-a-lifetime trip",
          "vietnamese": "Chuyến đi có một không hai"
        },
        {
          "phrase": "Breathtaking scenery",
          "vietnamese": "Phong cảnh ngoạn mục"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Culture shock",
          "vietnamese": "Sốc văn hóa"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a time you got lost that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a time you got lost, which is something that has always been close to my heart. **A once-in-a-lifetime trip** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **breathtaking scenery** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **to broaden one's horizons**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-national-park",
    "part": 2,
    "topic": "A National Park",
    "question": "Describe a national park or nature reserve.",
    "prompts": [
      "Where it is",
      "What you can see there",
      "What activities are available",
      "Why you recommend it"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pick up a new skill",
          "vietnamese": "Học một kỹ năng mới"
        },
        {
          "phrase": "Hands-on experience",
          "vietnamese": "Kinh nghiệm thực tiễn"
        },
        {
          "phrase": "Trial and error",
          "vietnamese": "Thử và sai"
        },
        {
          "phrase": "A transferable skill",
          "vietnamese": "Kỹ năng có thể ứng dụng nhiều nơi"
        },
        {
          "phrase": "Self-taught",
          "vietnamese": "Tự học"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a national park that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a national park, which is something that has always been close to my heart. **To pick up a new skill** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **hands-on experience** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **trial and error**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-difficult-subject",
    "part": 2,
    "topic": "A Difficult Subject",
    "question": "Describe a subject that was difficult for you in school.",
    "prompts": [
      "What the subject was",
      "Why it was difficult",
      "How you tried to improve",
      "Whether you eventually succeeded"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "An inspiring figure",
          "vietnamese": "Một nhân vật truyền cảm hứng"
        },
        {
          "phrase": "To look up to someone",
          "vietnamese": "Ngưỡng mộ ai đó"
        },
        {
          "phrase": "A role model",
          "vietnamese": "Hình mẫu lý tưởng"
        },
        {
          "phrase": "To have a profound impact on",
          "vietnamese": "Có ảnh hưởng sâu sắc đến"
        },
        {
          "phrase": "Selfless dedication",
          "vietnamese": "Sự cống hiến vô tư"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a difficult subject that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a difficult subject, which is something that has always been close to my heart. **An inspiring figure** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **to look up to someone** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **a role model**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-positive-change-in-society",
    "part": 2,
    "topic": "A Positive Change in Society",
    "question": "Describe a positive change happening in your society.",
    "prompts": [
      "What the change is",
      "When it started",
      "How it is affecting people",
      "Why you think it is positive"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A once-in-a-lifetime trip",
          "vietnamese": "Chuyến đi có một không hai"
        },
        {
          "phrase": "Breathtaking scenery",
          "vietnamese": "Phong cảnh ngoạn mục"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Culture shock",
          "vietnamese": "Sốc văn hóa"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a positive change in society that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a positive change in society, which is something that has always been close to my heart. **A once-in-a-lifetime trip** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **breathtaking scenery** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **to broaden one's horizons**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-party-you-organized",
    "part": 2,
    "topic": "A Party You Organized",
    "question": "Describe a party or event you organized.",
    "prompts": [
      "What the event was",
      "When you organized it",
      "Who attended",
      "How it went"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pick up a new skill",
          "vietnamese": "Học một kỹ năng mới"
        },
        {
          "phrase": "Hands-on experience",
          "vietnamese": "Kinh nghiệm thực tiễn"
        },
        {
          "phrase": "Trial and error",
          "vietnamese": "Thử và sai"
        },
        {
          "phrase": "A transferable skill",
          "vietnamese": "Kỹ năng có thể ứng dụng nhiều nơi"
        },
        {
          "phrase": "Self-taught",
          "vietnamese": "Tự học"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a party you organized that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a party you organized, which is something that has always been close to my heart. **To pick up a new skill** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **hands-on experience** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **trial and error**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-meaningful-song",
    "part": 2,
    "topic": "A Meaningful Song",
    "question": "Describe a song that brings back memories.",
    "prompts": [
      "What the song is",
      "What memories it triggers",
      "When you first heard it",
      "Why it is meaningful"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "An inspiring figure",
          "vietnamese": "Một nhân vật truyền cảm hứng"
        },
        {
          "phrase": "To look up to someone",
          "vietnamese": "Ngưỡng mộ ai đó"
        },
        {
          "phrase": "A role model",
          "vietnamese": "Hình mẫu lý tưởng"
        },
        {
          "phrase": "To have a profound impact on",
          "vietnamese": "Có ảnh hưởng sâu sắc đến"
        },
        {
          "phrase": "Selfless dedication",
          "vietnamese": "Sự cống hiến vô tư"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a meaningful song that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a meaningful song, which is something that has always been close to my heart. **An inspiring figure** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **to look up to someone** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **a role model**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-successful-business",
    "part": 2,
    "topic": "A Successful Business",
    "question": "Describe a successful business you know about.",
    "prompts": [
      "What the business does",
      "How it became successful",
      "What makes it special",
      "What you can learn from it"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A once-in-a-lifetime trip",
          "vietnamese": "Chuyến đi có một không hai"
        },
        {
          "phrase": "Breathtaking scenery",
          "vietnamese": "Phong cảnh ngoạn mục"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Culture shock",
          "vietnamese": "Sốc văn hóa"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a successful business that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a successful business, which is something that has always been close to my heart. **A once-in-a-lifetime trip** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **breathtaking scenery** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **to broaden one's horizons**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-hobby-that-costs-money",
    "part": 2,
    "topic": "A Hobby That Costs Money",
    "question": "Describe a hobby that requires spending money.",
    "prompts": [
      "What the hobby is",
      "How much it costs",
      "Why people enjoy it despite the cost",
      "Whether you think it is worth it"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pick up a new skill",
          "vietnamese": "Học một kỹ năng mới"
        },
        {
          "phrase": "Hands-on experience",
          "vietnamese": "Kinh nghiệm thực tiễn"
        },
        {
          "phrase": "Trial and error",
          "vietnamese": "Thử và sai"
        },
        {
          "phrase": "A transferable skill",
          "vietnamese": "Kỹ năng có thể ứng dụng nhiều nơi"
        },
        {
          "phrase": "Self-taught",
          "vietnamese": "Tự học"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a hobby that costs money that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a hobby that costs money, which is something that has always been close to my heart. **To pick up a new skill** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **hands-on experience** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **trial and error**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-noisy-place",
    "part": 2,
    "topic": "A Noisy Place",
    "question": "Describe a noisy place you have been to.",
    "prompts": [
      "Where it was",
      "When you went there",
      "Why it was noisy",
      "How the noise affected you"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "An inspiring figure",
          "vietnamese": "Một nhân vật truyền cảm hứng"
        },
        {
          "phrase": "To look up to someone",
          "vietnamese": "Ngưỡng mộ ai đó"
        },
        {
          "phrase": "A role model",
          "vietnamese": "Hình mẫu lý tưởng"
        },
        {
          "phrase": "To have a profound impact on",
          "vietnamese": "Có ảnh hưởng sâu sắc đến"
        },
        {
          "phrase": "Selfless dedication",
          "vietnamese": "Sự cống hiến vô tư"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a noisy place that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a noisy place, which is something that has always been close to my heart. **An inspiring figure** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **to look up to someone** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **a role model**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-local-hero",
    "part": 2,
    "topic": "A Local Hero",
    "question": "Describe someone in your community who is considered a hero.",
    "prompts": [
      "Who this person is",
      "What they have done",
      "How the community views them",
      "Why you consider them a hero"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A once-in-a-lifetime trip",
          "vietnamese": "Chuyến đi có một không hai"
        },
        {
          "phrase": "Breathtaking scenery",
          "vietnamese": "Phong cảnh ngoạn mục"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Culture shock",
          "vietnamese": "Sốc văn hóa"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a local hero that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a local hero, which is something that has always been close to my heart. **A once-in-a-lifetime trip** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **breathtaking scenery** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **to broaden one's horizons**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-time-you-changed-your-mind",
    "part": 2,
    "topic": "A Time You Changed Your Mind",
    "question": "Describe a time you changed your opinion about something.",
    "prompts": [
      "What the topic was",
      "What your original opinion was",
      "What changed your mind",
      "How you feel about it now"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pick up a new skill",
          "vietnamese": "Học một kỹ năng mới"
        },
        {
          "phrase": "Hands-on experience",
          "vietnamese": "Kinh nghiệm thực tiễn"
        },
        {
          "phrase": "Trial and error",
          "vietnamese": "Thử và sai"
        },
        {
          "phrase": "A transferable skill",
          "vietnamese": "Kỹ năng có thể ứng dụng nhiều nơi"
        },
        {
          "phrase": "Self-taught",
          "vietnamese": "Tự học"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a time you changed your mind that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a time you changed your mind, which is something that has always been close to my heart. **To pick up a new skill** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **hands-on experience** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **trial and error**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-childhood-punishment",
    "part": 2,
    "topic": "A Childhood Punishment",
    "question": "Describe a time you were punished as a child.",
    "prompts": [
      "What happened",
      "Why you were punished",
      "Who punished you",
      "What you learned from it"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "An inspiring figure",
          "vietnamese": "Một nhân vật truyền cảm hứng"
        },
        {
          "phrase": "To look up to someone",
          "vietnamese": "Ngưỡng mộ ai đó"
        },
        {
          "phrase": "A role model",
          "vietnamese": "Hình mẫu lý tưởng"
        },
        {
          "phrase": "To have a profound impact on",
          "vietnamese": "Có ảnh hưởng sâu sắc đến"
        },
        {
          "phrase": "Selfless dedication",
          "vietnamese": "Sự cống hiến vô tư"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a childhood punishment that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a childhood punishment, which is something that has always been close to my heart. **An inspiring figure** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **to look up to someone** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **a role model**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-an-important-decision",
    "part": 2,
    "topic": "An Important Decision",
    "question": "Describe a decision you made quickly.",
    "prompts": [
      "What the decision was",
      "Why you had to decide quickly",
      "What happened afterwards",
      "Whether you think it was a good decision"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A once-in-a-lifetime trip",
          "vietnamese": "Chuyến đi có một không hai"
        },
        {
          "phrase": "Breathtaking scenery",
          "vietnamese": "Phong cảnh ngoạn mục"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Culture shock",
          "vietnamese": "Sốc văn hóa"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific an important decision that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about an important decision, which is something that has always been close to my heart. **A once-in-a-lifetime trip** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **breathtaking scenery** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **to broaden one's horizons**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-cultural-show",
    "part": 2,
    "topic": "A Cultural Show",
    "question": "Describe a cultural performance you attended.",
    "prompts": [
      "What the performance was",
      "Where it took place",
      "What you saw and heard",
      "Why you enjoyed it"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "To pick up a new skill",
          "vietnamese": "Học một kỹ năng mới"
        },
        {
          "phrase": "Hands-on experience",
          "vietnamese": "Kinh nghiệm thực tiễn"
        },
        {
          "phrase": "Trial and error",
          "vietnamese": "Thử và sai"
        },
        {
          "phrase": "A transferable skill",
          "vietnamese": "Kỹ năng có thể ứng dụng nhiều nơi"
        },
        {
          "phrase": "Self-taught",
          "vietnamese": "Tự học"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a cultural show that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a cultural show, which is something that has always been close to my heart. **To pick up a new skill** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **hands-on experience** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **trial and error**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-fitness-goal",
    "part": 2,
    "topic": "A Fitness Goal",
    "question": "Describe a fitness goal you have set for yourself.",
    "prompts": [
      "What the goal is",
      "When you started working on it",
      "What you are doing to achieve it",
      "Why it is important to you"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "An inspiring figure",
          "vietnamese": "Một nhân vật truyền cảm hứng"
        },
        {
          "phrase": "To look up to someone",
          "vietnamese": "Ngưỡng mộ ai đó"
        },
        {
          "phrase": "A role model",
          "vietnamese": "Hình mẫu lý tưởng"
        },
        {
          "phrase": "To have a profound impact on",
          "vietnamese": "Có ảnh hưởng sâu sắc đến"
        },
        {
          "phrase": "Selfless dedication",
          "vietnamese": "Sự cống hiến vô tư"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a fitness goal that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a fitness goal, which is something that has always been close to my heart. **An inspiring figure** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **to look up to someone** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **a role model**, and I would highly recommend it to anyone looking for a similar transformative experience."
  },
  {
    "id": "p2-a-free-day",
    "part": 2,
    "topic": "A Free Day",
    "question": "Describe what you would do with a completely free day.",
    "prompts": [
      "What activities you would choose",
      "Where you would go",
      "Who you would spend time with",
      "Why you would choose those activities"
    ],
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A once-in-a-lifetime trip",
          "vietnamese": "Chuyến đi có một không hai"
        },
        {
          "phrase": "Breathtaking scenery",
          "vietnamese": "Phong cảnh ngoạn mục"
        },
        {
          "phrase": "To broaden one's horizons",
          "vietnamese": "Mở rộng tầm nhìn"
        },
        {
          "phrase": "Culture shock",
          "vietnamese": "Sốc văn hóa"
        },
        {
          "phrase": "Off the beaten track",
          "vietnamese": "Nơi ít người biết đến"
        }
      ],
      "model_structures": [
        "I'd like to talk about..., which is something that has had a significant impact on my life.",
        "What stands out most in my memory is the way..., which really made me appreciate...",
        "Looking back on this experience, I realize that it taught me the importance of..."
      ],
      "brainstorming_ideas": [
        "Think about a specific a free day that left a strong impression.",
        "Use vivid descriptions and sensory details to make your answer engaging.",
        "Connect the topic to a personal lesson or insight you gained."
      ]
    },
    "model_answer": "I'd like to talk about a free day, which is something that has always been close to my heart. **A once-in-a-lifetime trip** perfectly describes this experience because it truly was remarkable. What I remember most vividly is the sense of discovery and growth that came with it. I believe that **breathtaking scenery** played a huge role in shaping how I view this topic today. Overall, this experience taught me the value of **to broaden one's horizons**, and I would highly recommend it to anyone looking for a similar transformative experience."
  }
];

// ===================== PART 3 QUESTIONS (110 questions) =====================

const part3PracticeQuestions: SpeakingPracticeQuestion[] = [
  {
    "id": "p3-education-1",
    "part": 3,
    "topic": "Education",
    "question": "Do you think the education system in your country needs improvement?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "The education system",
          "vietnamese": "Hệ thống giáo dục"
        },
        {
          "phrase": "Rote learning vs. critical thinking",
          "vietnamese": "Học vẹt vs. tư duy phản biện"
        },
        {
          "phrase": "A well-rounded education",
          "vietnamese": "Nền giáo dục toàn diện"
        },
        {
          "phrase": "To foster creativity",
          "vietnamese": "Nuôi dưỡng sự sáng tạo"
        },
        {
          "phrase": "Academic pressure",
          "vietnamese": "Áp lực học tập"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that education is one of the most pressing issues in modern society. From my perspective, **the education system** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **rote learning vs. critical thinking**. On the other hand, challenges remain, especially regarding **a well-rounded education**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-education-2",
    "part": 3,
    "topic": "Education",
    "question": "How has technology changed the way students learn?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "The education system",
          "vietnamese": "Hệ thống giáo dục"
        },
        {
          "phrase": "Rote learning vs. critical thinking",
          "vietnamese": "Học vẹt vs. tư duy phản biện"
        },
        {
          "phrase": "A well-rounded education",
          "vietnamese": "Nền giáo dục toàn diện"
        },
        {
          "phrase": "To foster creativity",
          "vietnamese": "Nuôi dưỡng sự sáng tạo"
        },
        {
          "phrase": "Academic pressure",
          "vietnamese": "Áp lực học tập"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that education is one of the most pressing issues in modern society. From my perspective, **the education system** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **rote learning vs. critical thinking**. On the other hand, challenges remain, especially regarding **a well-rounded education**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-education-3",
    "part": 3,
    "topic": "Education",
    "question": "Is it better to learn from experience or from books?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "The education system",
          "vietnamese": "Hệ thống giáo dục"
        },
        {
          "phrase": "Rote learning vs. critical thinking",
          "vietnamese": "Học vẹt vs. tư duy phản biện"
        },
        {
          "phrase": "A well-rounded education",
          "vietnamese": "Nền giáo dục toàn diện"
        },
        {
          "phrase": "To foster creativity",
          "vietnamese": "Nuôi dưỡng sự sáng tạo"
        },
        {
          "phrase": "Academic pressure",
          "vietnamese": "Áp lực học tập"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that education is one of the most pressing issues in modern society. From my perspective, **the education system** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **rote learning vs. critical thinking**. On the other hand, challenges remain, especially regarding **a well-rounded education**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-education-4",
    "part": 3,
    "topic": "Education",
    "question": "Should university education be free for everyone?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "The education system",
          "vietnamese": "Hệ thống giáo dục"
        },
        {
          "phrase": "Rote learning vs. critical thinking",
          "vietnamese": "Học vẹt vs. tư duy phản biện"
        },
        {
          "phrase": "A well-rounded education",
          "vietnamese": "Nền giáo dục toàn diện"
        },
        {
          "phrase": "To foster creativity",
          "vietnamese": "Nuôi dưỡng sự sáng tạo"
        },
        {
          "phrase": "Academic pressure",
          "vietnamese": "Áp lực học tập"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that education is one of the most pressing issues in modern society. From my perspective, **the education system** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **rote learning vs. critical thinking**. On the other hand, challenges remain, especially regarding **a well-rounded education**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-education-5",
    "part": 3,
    "topic": "Education",
    "question": "What role do teachers play in shaping a child's future?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "The education system",
          "vietnamese": "Hệ thống giáo dục"
        },
        {
          "phrase": "Rote learning vs. critical thinking",
          "vietnamese": "Học vẹt vs. tư duy phản biện"
        },
        {
          "phrase": "A well-rounded education",
          "vietnamese": "Nền giáo dục toàn diện"
        },
        {
          "phrase": "To foster creativity",
          "vietnamese": "Nuôi dưỡng sự sáng tạo"
        },
        {
          "phrase": "Academic pressure",
          "vietnamese": "Áp lực học tập"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that education is one of the most pressing issues in modern society. From my perspective, **the education system** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **rote learning vs. critical thinking**. On the other hand, challenges remain, especially regarding **a well-rounded education**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-education-6",
    "part": 3,
    "topic": "Education",
    "question": "Is online learning as effective as classroom learning?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "The education system",
          "vietnamese": "Hệ thống giáo dục"
        },
        {
          "phrase": "Rote learning vs. critical thinking",
          "vietnamese": "Học vẹt vs. tư duy phản biện"
        },
        {
          "phrase": "A well-rounded education",
          "vietnamese": "Nền giáo dục toàn diện"
        },
        {
          "phrase": "To foster creativity",
          "vietnamese": "Nuôi dưỡng sự sáng tạo"
        },
        {
          "phrase": "Academic pressure",
          "vietnamese": "Áp lực học tập"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that education is one of the most pressing issues in modern society. From my perspective, **the education system** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **rote learning vs. critical thinking**. On the other hand, challenges remain, especially regarding **a well-rounded education**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-education-7",
    "part": 3,
    "topic": "Education",
    "question": "Should students be allowed to choose their own subjects?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "The education system",
          "vietnamese": "Hệ thống giáo dục"
        },
        {
          "phrase": "Rote learning vs. critical thinking",
          "vietnamese": "Học vẹt vs. tư duy phản biện"
        },
        {
          "phrase": "A well-rounded education",
          "vietnamese": "Nền giáo dục toàn diện"
        },
        {
          "phrase": "To foster creativity",
          "vietnamese": "Nuôi dưỡng sự sáng tạo"
        },
        {
          "phrase": "Academic pressure",
          "vietnamese": "Áp lực học tập"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that education is one of the most pressing issues in modern society. From my perspective, **the education system** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **rote learning vs. critical thinking**. On the other hand, challenges remain, especially regarding **a well-rounded education**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-education-8",
    "part": 3,
    "topic": "Education",
    "question": "How important is creativity in education?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "The education system",
          "vietnamese": "Hệ thống giáo dục"
        },
        {
          "phrase": "Rote learning vs. critical thinking",
          "vietnamese": "Học vẹt vs. tư duy phản biện"
        },
        {
          "phrase": "A well-rounded education",
          "vietnamese": "Nền giáo dục toàn diện"
        },
        {
          "phrase": "To foster creativity",
          "vietnamese": "Nuôi dưỡng sự sáng tạo"
        },
        {
          "phrase": "Academic pressure",
          "vietnamese": "Áp lực học tập"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that education is one of the most pressing issues in modern society. From my perspective, **the education system** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **rote learning vs. critical thinking**. On the other hand, challenges remain, especially regarding **a well-rounded education**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-education-9",
    "part": 3,
    "topic": "Education",
    "question": "Do exams truly measure a student's ability?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "The education system",
          "vietnamese": "Hệ thống giáo dục"
        },
        {
          "phrase": "Rote learning vs. critical thinking",
          "vietnamese": "Học vẹt vs. tư duy phản biện"
        },
        {
          "phrase": "A well-rounded education",
          "vietnamese": "Nền giáo dục toàn diện"
        },
        {
          "phrase": "To foster creativity",
          "vietnamese": "Nuôi dưỡng sự sáng tạo"
        },
        {
          "phrase": "Academic pressure",
          "vietnamese": "Áp lực học tập"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that education is one of the most pressing issues in modern society. From my perspective, **the education system** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **rote learning vs. critical thinking**. On the other hand, challenges remain, especially regarding **a well-rounded education**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-education-10",
    "part": 3,
    "topic": "Education",
    "question": "What can be done to reduce the pressure on students?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "The education system",
          "vietnamese": "Hệ thống giáo dục"
        },
        {
          "phrase": "Rote learning vs. critical thinking",
          "vietnamese": "Học vẹt vs. tư duy phản biện"
        },
        {
          "phrase": "A well-rounded education",
          "vietnamese": "Nền giáo dục toàn diện"
        },
        {
          "phrase": "To foster creativity",
          "vietnamese": "Nuôi dưỡng sự sáng tạo"
        },
        {
          "phrase": "Academic pressure",
          "vietnamese": "Áp lực học tập"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that education is one of the most pressing issues in modern society. From my perspective, **the education system** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **rote learning vs. critical thinking**. On the other hand, challenges remain, especially regarding **a well-rounded education**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-environment-1",
    "part": 3,
    "topic": "Environment",
    "question": "What are the biggest environmental challenges today?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Carbon footprint",
          "vietnamese": "Dấu chân carbon"
        },
        {
          "phrase": "Sustainable development",
          "vietnamese": "Phát triển bền vững"
        },
        {
          "phrase": "Biodiversity loss",
          "vietnamese": "Mất đa dạng sinh học"
        },
        {
          "phrase": "Renewable energy sources",
          "vietnamese": "Nguồn năng lượng tái tạo"
        },
        {
          "phrase": "Environmental degradation",
          "vietnamese": "Suy thoái môi trường"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that environment is one of the most pressing issues in modern society. From my perspective, **carbon footprint** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **sustainable development**. On the other hand, challenges remain, especially regarding **biodiversity loss**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-environment-2",
    "part": 3,
    "topic": "Environment",
    "question": "Should individuals or governments be responsible for protecting the environment?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Carbon footprint",
          "vietnamese": "Dấu chân carbon"
        },
        {
          "phrase": "Sustainable development",
          "vietnamese": "Phát triển bền vững"
        },
        {
          "phrase": "Biodiversity loss",
          "vietnamese": "Mất đa dạng sinh học"
        },
        {
          "phrase": "Renewable energy sources",
          "vietnamese": "Nguồn năng lượng tái tạo"
        },
        {
          "phrase": "Environmental degradation",
          "vietnamese": "Suy thoái môi trường"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that environment is one of the most pressing issues in modern society. From my perspective, **carbon footprint** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **sustainable development**. On the other hand, challenges remain, especially regarding **biodiversity loss**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-environment-3",
    "part": 3,
    "topic": "Environment",
    "question": "How can technology help solve environmental problems?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Carbon footprint",
          "vietnamese": "Dấu chân carbon"
        },
        {
          "phrase": "Sustainable development",
          "vietnamese": "Phát triển bền vững"
        },
        {
          "phrase": "Biodiversity loss",
          "vietnamese": "Mất đa dạng sinh học"
        },
        {
          "phrase": "Renewable energy sources",
          "vietnamese": "Nguồn năng lượng tái tạo"
        },
        {
          "phrase": "Environmental degradation",
          "vietnamese": "Suy thoái môi trường"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that environment is one of the most pressing issues in modern society. From my perspective, **carbon footprint** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **sustainable development**. On the other hand, challenges remain, especially regarding **biodiversity loss**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-environment-4",
    "part": 3,
    "topic": "Environment",
    "question": "Do you think recycling is effective enough?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Carbon footprint",
          "vietnamese": "Dấu chân carbon"
        },
        {
          "phrase": "Sustainable development",
          "vietnamese": "Phát triển bền vững"
        },
        {
          "phrase": "Biodiversity loss",
          "vietnamese": "Mất đa dạng sinh học"
        },
        {
          "phrase": "Renewable energy sources",
          "vietnamese": "Nguồn năng lượng tái tạo"
        },
        {
          "phrase": "Environmental degradation",
          "vietnamese": "Suy thoái môi trường"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that environment is one of the most pressing issues in modern society. From my perspective, **carbon footprint** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **sustainable development**. On the other hand, challenges remain, especially regarding **biodiversity loss**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-environment-5",
    "part": 3,
    "topic": "Environment",
    "question": "What can young people do to help the environment?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Carbon footprint",
          "vietnamese": "Dấu chân carbon"
        },
        {
          "phrase": "Sustainable development",
          "vietnamese": "Phát triển bền vững"
        },
        {
          "phrase": "Biodiversity loss",
          "vietnamese": "Mất đa dạng sinh học"
        },
        {
          "phrase": "Renewable energy sources",
          "vietnamese": "Nguồn năng lượng tái tạo"
        },
        {
          "phrase": "Environmental degradation",
          "vietnamese": "Suy thoái môi trường"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that environment is one of the most pressing issues in modern society. From my perspective, **carbon footprint** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **sustainable development**. On the other hand, challenges remain, especially regarding **biodiversity loss**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-environment-6",
    "part": 3,
    "topic": "Environment",
    "question": "Should companies be punished for polluting?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Carbon footprint",
          "vietnamese": "Dấu chân carbon"
        },
        {
          "phrase": "Sustainable development",
          "vietnamese": "Phát triển bền vững"
        },
        {
          "phrase": "Biodiversity loss",
          "vietnamese": "Mất đa dạng sinh học"
        },
        {
          "phrase": "Renewable energy sources",
          "vietnamese": "Nguồn năng lượng tái tạo"
        },
        {
          "phrase": "Environmental degradation",
          "vietnamese": "Suy thoái môi trường"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that environment is one of the most pressing issues in modern society. From my perspective, **carbon footprint** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **sustainable development**. On the other hand, challenges remain, especially regarding **biodiversity loss**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-environment-7",
    "part": 3,
    "topic": "Environment",
    "question": "Is climate change the most serious issue facing the world?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Carbon footprint",
          "vietnamese": "Dấu chân carbon"
        },
        {
          "phrase": "Sustainable development",
          "vietnamese": "Phát triển bền vững"
        },
        {
          "phrase": "Biodiversity loss",
          "vietnamese": "Mất đa dạng sinh học"
        },
        {
          "phrase": "Renewable energy sources",
          "vietnamese": "Nguồn năng lượng tái tạo"
        },
        {
          "phrase": "Environmental degradation",
          "vietnamese": "Suy thoái môi trường"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that environment is one of the most pressing issues in modern society. From my perspective, **carbon footprint** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **sustainable development**. On the other hand, challenges remain, especially regarding **biodiversity loss**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-environment-8",
    "part": 3,
    "topic": "Environment",
    "question": "How has urbanization affected the natural environment?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Carbon footprint",
          "vietnamese": "Dấu chân carbon"
        },
        {
          "phrase": "Sustainable development",
          "vietnamese": "Phát triển bền vững"
        },
        {
          "phrase": "Biodiversity loss",
          "vietnamese": "Mất đa dạng sinh học"
        },
        {
          "phrase": "Renewable energy sources",
          "vietnamese": "Nguồn năng lượng tái tạo"
        },
        {
          "phrase": "Environmental degradation",
          "vietnamese": "Suy thoái môi trường"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that environment is one of the most pressing issues in modern society. From my perspective, **carbon footprint** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **sustainable development**. On the other hand, challenges remain, especially regarding **biodiversity loss**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-environment-9",
    "part": 3,
    "topic": "Environment",
    "question": "What role does education play in environmental awareness?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Carbon footprint",
          "vietnamese": "Dấu chân carbon"
        },
        {
          "phrase": "Sustainable development",
          "vietnamese": "Phát triển bền vững"
        },
        {
          "phrase": "Biodiversity loss",
          "vietnamese": "Mất đa dạng sinh học"
        },
        {
          "phrase": "Renewable energy sources",
          "vietnamese": "Nguồn năng lượng tái tạo"
        },
        {
          "phrase": "Environmental degradation",
          "vietnamese": "Suy thoái môi trường"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that environment is one of the most pressing issues in modern society. From my perspective, **carbon footprint** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **sustainable development**. On the other hand, challenges remain, especially regarding **biodiversity loss**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-environment-10",
    "part": 3,
    "topic": "Environment",
    "question": "Can economic growth and environmental protection coexist?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Carbon footprint",
          "vietnamese": "Dấu chân carbon"
        },
        {
          "phrase": "Sustainable development",
          "vietnamese": "Phát triển bền vững"
        },
        {
          "phrase": "Biodiversity loss",
          "vietnamese": "Mất đa dạng sinh học"
        },
        {
          "phrase": "Renewable energy sources",
          "vietnamese": "Nguồn năng lượng tái tạo"
        },
        {
          "phrase": "Environmental degradation",
          "vietnamese": "Suy thoái môi trường"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that environment is one of the most pressing issues in modern society. From my perspective, **carbon footprint** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **sustainable development**. On the other hand, challenges remain, especially regarding **biodiversity loss**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-technology-1",
    "part": 3,
    "topic": "Technology",
    "question": "How has technology affected the way we communicate?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Artificial intelligence",
          "vietnamese": "Trí tuệ nhân tạo"
        },
        {
          "phrase": "Digital divide",
          "vietnamese": "Khoảng cách số"
        },
        {
          "phrase": "Data privacy",
          "vietnamese": "Quyền riêng tư dữ liệu"
        },
        {
          "phrase": "Technological advancement",
          "vietnamese": "Tiến bộ công nghệ"
        },
        {
          "phrase": "Automation and job displacement",
          "vietnamese": "Tự động hóa và mất việc"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that technology is one of the most pressing issues in modern society. From my perspective, **artificial intelligence** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **digital divide**. On the other hand, challenges remain, especially regarding **data privacy**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-technology-2",
    "part": 3,
    "topic": "Technology",
    "question": "Do you think artificial intelligence will replace human jobs?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Artificial intelligence",
          "vietnamese": "Trí tuệ nhân tạo"
        },
        {
          "phrase": "Digital divide",
          "vietnamese": "Khoảng cách số"
        },
        {
          "phrase": "Data privacy",
          "vietnamese": "Quyền riêng tư dữ liệu"
        },
        {
          "phrase": "Technological advancement",
          "vietnamese": "Tiến bộ công nghệ"
        },
        {
          "phrase": "Automation and job displacement",
          "vietnamese": "Tự động hóa và mất việc"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that technology is one of the most pressing issues in modern society. From my perspective, **artificial intelligence** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **digital divide**. On the other hand, challenges remain, especially regarding **data privacy**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-technology-3",
    "part": 3,
    "topic": "Technology",
    "question": "What are the dangers of spending too much time online?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Artificial intelligence",
          "vietnamese": "Trí tuệ nhân tạo"
        },
        {
          "phrase": "Digital divide",
          "vietnamese": "Khoảng cách số"
        },
        {
          "phrase": "Data privacy",
          "vietnamese": "Quyền riêng tư dữ liệu"
        },
        {
          "phrase": "Technological advancement",
          "vietnamese": "Tiến bộ công nghệ"
        },
        {
          "phrase": "Automation and job displacement",
          "vietnamese": "Tự động hóa và mất việc"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that technology is one of the most pressing issues in modern society. From my perspective, **artificial intelligence** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **digital divide**. On the other hand, challenges remain, especially regarding **data privacy**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-technology-4",
    "part": 3,
    "topic": "Technology",
    "question": "Should children be limited in their use of technology?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Artificial intelligence",
          "vietnamese": "Trí tuệ nhân tạo"
        },
        {
          "phrase": "Digital divide",
          "vietnamese": "Khoảng cách số"
        },
        {
          "phrase": "Data privacy",
          "vietnamese": "Quyền riêng tư dữ liệu"
        },
        {
          "phrase": "Technological advancement",
          "vietnamese": "Tiến bộ công nghệ"
        },
        {
          "phrase": "Automation and job displacement",
          "vietnamese": "Tự động hóa và mất việc"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that technology is one of the most pressing issues in modern society. From my perspective, **artificial intelligence** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **digital divide**. On the other hand, challenges remain, especially regarding **data privacy**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-technology-5",
    "part": 3,
    "topic": "Technology",
    "question": "How has social media changed society?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Artificial intelligence",
          "vietnamese": "Trí tuệ nhân tạo"
        },
        {
          "phrase": "Digital divide",
          "vietnamese": "Khoảng cách số"
        },
        {
          "phrase": "Data privacy",
          "vietnamese": "Quyền riêng tư dữ liệu"
        },
        {
          "phrase": "Technological advancement",
          "vietnamese": "Tiến bộ công nghệ"
        },
        {
          "phrase": "Automation and job displacement",
          "vietnamese": "Tự động hóa và mất việc"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that technology is one of the most pressing issues in modern society. From my perspective, **artificial intelligence** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **digital divide**. On the other hand, challenges remain, especially regarding **data privacy**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-technology-6",
    "part": 3,
    "topic": "Technology",
    "question": "What are the ethical issues surrounding technology?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Artificial intelligence",
          "vietnamese": "Trí tuệ nhân tạo"
        },
        {
          "phrase": "Digital divide",
          "vietnamese": "Khoảng cách số"
        },
        {
          "phrase": "Data privacy",
          "vietnamese": "Quyền riêng tư dữ liệu"
        },
        {
          "phrase": "Technological advancement",
          "vietnamese": "Tiến bộ công nghệ"
        },
        {
          "phrase": "Automation and job displacement",
          "vietnamese": "Tự động hóa và mất việc"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that technology is one of the most pressing issues in modern society. From my perspective, **artificial intelligence** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **digital divide**. On the other hand, challenges remain, especially regarding **data privacy**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-technology-7",
    "part": 3,
    "topic": "Technology",
    "question": "Do you think privacy is at risk due to technology?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Artificial intelligence",
          "vietnamese": "Trí tuệ nhân tạo"
        },
        {
          "phrase": "Digital divide",
          "vietnamese": "Khoảng cách số"
        },
        {
          "phrase": "Data privacy",
          "vietnamese": "Quyền riêng tư dữ liệu"
        },
        {
          "phrase": "Technological advancement",
          "vietnamese": "Tiến bộ công nghệ"
        },
        {
          "phrase": "Automation and job displacement",
          "vietnamese": "Tự động hóa và mất việc"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that technology is one of the most pressing issues in modern society. From my perspective, **artificial intelligence** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **digital divide**. On the other hand, challenges remain, especially regarding **data privacy**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-technology-8",
    "part": 3,
    "topic": "Technology",
    "question": "How will technology change education in the future?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Artificial intelligence",
          "vietnamese": "Trí tuệ nhân tạo"
        },
        {
          "phrase": "Digital divide",
          "vietnamese": "Khoảng cách số"
        },
        {
          "phrase": "Data privacy",
          "vietnamese": "Quyền riêng tư dữ liệu"
        },
        {
          "phrase": "Technological advancement",
          "vietnamese": "Tiến bộ công nghệ"
        },
        {
          "phrase": "Automation and job displacement",
          "vietnamese": "Tự động hóa và mất việc"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that technology is one of the most pressing issues in modern society. From my perspective, **artificial intelligence** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **digital divide**. On the other hand, challenges remain, especially regarding **data privacy**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-technology-9",
    "part": 3,
    "topic": "Technology",
    "question": "Is technology making people lazier?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Artificial intelligence",
          "vietnamese": "Trí tuệ nhân tạo"
        },
        {
          "phrase": "Digital divide",
          "vietnamese": "Khoảng cách số"
        },
        {
          "phrase": "Data privacy",
          "vietnamese": "Quyền riêng tư dữ liệu"
        },
        {
          "phrase": "Technological advancement",
          "vietnamese": "Tiến bộ công nghệ"
        },
        {
          "phrase": "Automation and job displacement",
          "vietnamese": "Tự động hóa và mất việc"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that technology is one of the most pressing issues in modern society. From my perspective, **artificial intelligence** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **digital divide**. On the other hand, challenges remain, especially regarding **data privacy**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-technology-10",
    "part": 3,
    "topic": "Technology",
    "question": "What is the most important technological invention in history?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Artificial intelligence",
          "vietnamese": "Trí tuệ nhân tạo"
        },
        {
          "phrase": "Digital divide",
          "vietnamese": "Khoảng cách số"
        },
        {
          "phrase": "Data privacy",
          "vietnamese": "Quyền riêng tư dữ liệu"
        },
        {
          "phrase": "Technological advancement",
          "vietnamese": "Tiến bộ công nghệ"
        },
        {
          "phrase": "Automation and job displacement",
          "vietnamese": "Tự động hóa và mất việc"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that technology is one of the most pressing issues in modern society. From my perspective, **artificial intelligence** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **digital divide**. On the other hand, challenges remain, especially regarding **data privacy**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-health---lifestyle-1",
    "part": 3,
    "topic": "Health & Lifestyle",
    "question": "Why is maintaining a healthy lifestyle important?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A sedentary lifestyle",
          "vietnamese": "Lối sống ít vận động"
        },
        {
          "phrase": "Mental well-being",
          "vietnamese": "Sức khỏe tinh thần"
        },
        {
          "phrase": "Preventive healthcare",
          "vietnamese": "Chăm sóc sức khỏe phòng ngừa"
        },
        {
          "phrase": "Work-life balance",
          "vietnamese": "Cân bằng công việc - cuộc sống"
        },
        {
          "phrase": "Nutritional awareness",
          "vietnamese": "Nhận thức về dinh dưỡng"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that health & lifestyle is one of the most pressing issues in modern society. From my perspective, **a sedentary lifestyle** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **mental well-being**. On the other hand, challenges remain, especially regarding **preventive healthcare**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-health---lifestyle-2",
    "part": 3,
    "topic": "Health & Lifestyle",
    "question": "How has the concept of healthy living changed over the years?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A sedentary lifestyle",
          "vietnamese": "Lối sống ít vận động"
        },
        {
          "phrase": "Mental well-being",
          "vietnamese": "Sức khỏe tinh thần"
        },
        {
          "phrase": "Preventive healthcare",
          "vietnamese": "Chăm sóc sức khỏe phòng ngừa"
        },
        {
          "phrase": "Work-life balance",
          "vietnamese": "Cân bằng công việc - cuộc sống"
        },
        {
          "phrase": "Nutritional awareness",
          "vietnamese": "Nhận thức về dinh dưỡng"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that health & lifestyle is one of the most pressing issues in modern society. From my perspective, **a sedentary lifestyle** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **mental well-being**. On the other hand, challenges remain, especially regarding **preventive healthcare**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-health---lifestyle-3",
    "part": 3,
    "topic": "Health & Lifestyle",
    "question": "Should governments promote healthy eating habits?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A sedentary lifestyle",
          "vietnamese": "Lối sống ít vận động"
        },
        {
          "phrase": "Mental well-being",
          "vietnamese": "Sức khỏe tinh thần"
        },
        {
          "phrase": "Preventive healthcare",
          "vietnamese": "Chăm sóc sức khỏe phòng ngừa"
        },
        {
          "phrase": "Work-life balance",
          "vietnamese": "Cân bằng công việc - cuộc sống"
        },
        {
          "phrase": "Nutritional awareness",
          "vietnamese": "Nhận thức về dinh dưỡng"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that health & lifestyle is one of the most pressing issues in modern society. From my perspective, **a sedentary lifestyle** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **mental well-being**. On the other hand, challenges remain, especially regarding **preventive healthcare**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-health---lifestyle-4",
    "part": 3,
    "topic": "Health & Lifestyle",
    "question": "What are the effects of a sedentary lifestyle?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A sedentary lifestyle",
          "vietnamese": "Lối sống ít vận động"
        },
        {
          "phrase": "Mental well-being",
          "vietnamese": "Sức khỏe tinh thần"
        },
        {
          "phrase": "Preventive healthcare",
          "vietnamese": "Chăm sóc sức khỏe phòng ngừa"
        },
        {
          "phrase": "Work-life balance",
          "vietnamese": "Cân bằng công việc - cuộc sống"
        },
        {
          "phrase": "Nutritional awareness",
          "vietnamese": "Nhận thức về dinh dưỡng"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that health & lifestyle is one of the most pressing issues in modern society. From my perspective, **a sedentary lifestyle** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **mental well-being**. On the other hand, challenges remain, especially regarding **preventive healthcare**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-health---lifestyle-5",
    "part": 3,
    "topic": "Health & Lifestyle",
    "question": "Is mental health given enough attention in society?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A sedentary lifestyle",
          "vietnamese": "Lối sống ít vận động"
        },
        {
          "phrase": "Mental well-being",
          "vietnamese": "Sức khỏe tinh thần"
        },
        {
          "phrase": "Preventive healthcare",
          "vietnamese": "Chăm sóc sức khỏe phòng ngừa"
        },
        {
          "phrase": "Work-life balance",
          "vietnamese": "Cân bằng công việc - cuộc sống"
        },
        {
          "phrase": "Nutritional awareness",
          "vietnamese": "Nhận thức về dinh dưỡng"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that health & lifestyle is one of the most pressing issues in modern society. From my perspective, **a sedentary lifestyle** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **mental well-being**. On the other hand, challenges remain, especially regarding **preventive healthcare**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-health---lifestyle-6",
    "part": 3,
    "topic": "Health & Lifestyle",
    "question": "How does stress affect people's health?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A sedentary lifestyle",
          "vietnamese": "Lối sống ít vận động"
        },
        {
          "phrase": "Mental well-being",
          "vietnamese": "Sức khỏe tinh thần"
        },
        {
          "phrase": "Preventive healthcare",
          "vietnamese": "Chăm sóc sức khỏe phòng ngừa"
        },
        {
          "phrase": "Work-life balance",
          "vietnamese": "Cân bằng công việc - cuộc sống"
        },
        {
          "phrase": "Nutritional awareness",
          "vietnamese": "Nhận thức về dinh dưỡng"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that health & lifestyle is one of the most pressing issues in modern society. From my perspective, **a sedentary lifestyle** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **mental well-being**. On the other hand, challenges remain, especially regarding **preventive healthcare**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-health---lifestyle-7",
    "part": 3,
    "topic": "Health & Lifestyle",
    "question": "Should junk food advertising be banned?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A sedentary lifestyle",
          "vietnamese": "Lối sống ít vận động"
        },
        {
          "phrase": "Mental well-being",
          "vietnamese": "Sức khỏe tinh thần"
        },
        {
          "phrase": "Preventive healthcare",
          "vietnamese": "Chăm sóc sức khỏe phòng ngừa"
        },
        {
          "phrase": "Work-life balance",
          "vietnamese": "Cân bằng công việc - cuộc sống"
        },
        {
          "phrase": "Nutritional awareness",
          "vietnamese": "Nhận thức về dinh dưỡng"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that health & lifestyle is one of the most pressing issues in modern society. From my perspective, **a sedentary lifestyle** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **mental well-being**. On the other hand, challenges remain, especially regarding **preventive healthcare**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-health---lifestyle-8",
    "part": 3,
    "topic": "Health & Lifestyle",
    "question": "What role does exercise play in overall well-being?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A sedentary lifestyle",
          "vietnamese": "Lối sống ít vận động"
        },
        {
          "phrase": "Mental well-being",
          "vietnamese": "Sức khỏe tinh thần"
        },
        {
          "phrase": "Preventive healthcare",
          "vietnamese": "Chăm sóc sức khỏe phòng ngừa"
        },
        {
          "phrase": "Work-life balance",
          "vietnamese": "Cân bằng công việc - cuộc sống"
        },
        {
          "phrase": "Nutritional awareness",
          "vietnamese": "Nhận thức về dinh dưỡng"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that health & lifestyle is one of the most pressing issues in modern society. From my perspective, **a sedentary lifestyle** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **mental well-being**. On the other hand, challenges remain, especially regarding **preventive healthcare**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-health---lifestyle-9",
    "part": 3,
    "topic": "Health & Lifestyle",
    "question": "How can workplaces promote employee health?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A sedentary lifestyle",
          "vietnamese": "Lối sống ít vận động"
        },
        {
          "phrase": "Mental well-being",
          "vietnamese": "Sức khỏe tinh thần"
        },
        {
          "phrase": "Preventive healthcare",
          "vietnamese": "Chăm sóc sức khỏe phòng ngừa"
        },
        {
          "phrase": "Work-life balance",
          "vietnamese": "Cân bằng công việc - cuộc sống"
        },
        {
          "phrase": "Nutritional awareness",
          "vietnamese": "Nhận thức về dinh dưỡng"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that health & lifestyle is one of the most pressing issues in modern society. From my perspective, **a sedentary lifestyle** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **mental well-being**. On the other hand, challenges remain, especially regarding **preventive healthcare**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-health---lifestyle-10",
    "part": 3,
    "topic": "Health & Lifestyle",
    "question": "Is healthcare becoming too expensive for ordinary people?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "A sedentary lifestyle",
          "vietnamese": "Lối sống ít vận động"
        },
        {
          "phrase": "Mental well-being",
          "vietnamese": "Sức khỏe tinh thần"
        },
        {
          "phrase": "Preventive healthcare",
          "vietnamese": "Chăm sóc sức khỏe phòng ngừa"
        },
        {
          "phrase": "Work-life balance",
          "vietnamese": "Cân bằng công việc - cuộc sống"
        },
        {
          "phrase": "Nutritional awareness",
          "vietnamese": "Nhận thức về dinh dưỡng"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that health & lifestyle is one of the most pressing issues in modern society. From my perspective, **a sedentary lifestyle** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **mental well-being**. On the other hand, challenges remain, especially regarding **preventive healthcare**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-culture---society-1",
    "part": 3,
    "topic": "Culture & Society",
    "question": "How is globalization affecting local cultures?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Cultural heritage",
          "vietnamese": "Di sản văn hóa"
        },
        {
          "phrase": "Multiculturalism",
          "vietnamese": "Chủ nghĩa đa văn hóa"
        },
        {
          "phrase": "Social cohesion",
          "vietnamese": "Sự gắn kết xã hội"
        },
        {
          "phrase": "To preserve traditions",
          "vietnamese": "Bảo tồn truyền thống"
        },
        {
          "phrase": "Intercultural understanding",
          "vietnamese": "Hiểu biết liên văn hóa"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that culture & society is one of the most pressing issues in modern society. From my perspective, **cultural heritage** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **multiculturalism**. On the other hand, challenges remain, especially regarding **social cohesion**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-culture---society-2",
    "part": 3,
    "topic": "Culture & Society",
    "question": "Should countries try to preserve their traditional customs?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Cultural heritage",
          "vietnamese": "Di sản văn hóa"
        },
        {
          "phrase": "Multiculturalism",
          "vietnamese": "Chủ nghĩa đa văn hóa"
        },
        {
          "phrase": "Social cohesion",
          "vietnamese": "Sự gắn kết xã hội"
        },
        {
          "phrase": "To preserve traditions",
          "vietnamese": "Bảo tồn truyền thống"
        },
        {
          "phrase": "Intercultural understanding",
          "vietnamese": "Hiểu biết liên văn hóa"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that culture & society is one of the most pressing issues in modern society. From my perspective, **cultural heritage** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **multiculturalism**. On the other hand, challenges remain, especially regarding **social cohesion**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-culture---society-3",
    "part": 3,
    "topic": "Culture & Society",
    "question": "What is the role of arts and culture in modern society?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Cultural heritage",
          "vietnamese": "Di sản văn hóa"
        },
        {
          "phrase": "Multiculturalism",
          "vietnamese": "Chủ nghĩa đa văn hóa"
        },
        {
          "phrase": "Social cohesion",
          "vietnamese": "Sự gắn kết xã hội"
        },
        {
          "phrase": "To preserve traditions",
          "vietnamese": "Bảo tồn truyền thống"
        },
        {
          "phrase": "Intercultural understanding",
          "vietnamese": "Hiểu biết liên văn hóa"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that culture & society is one of the most pressing issues in modern society. From my perspective, **cultural heritage** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **multiculturalism**. On the other hand, challenges remain, especially regarding **social cohesion**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-culture---society-4",
    "part": 3,
    "topic": "Culture & Society",
    "question": "How has the role of family changed in recent decades?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Cultural heritage",
          "vietnamese": "Di sản văn hóa"
        },
        {
          "phrase": "Multiculturalism",
          "vietnamese": "Chủ nghĩa đa văn hóa"
        },
        {
          "phrase": "Social cohesion",
          "vietnamese": "Sự gắn kết xã hội"
        },
        {
          "phrase": "To preserve traditions",
          "vietnamese": "Bảo tồn truyền thống"
        },
        {
          "phrase": "Intercultural understanding",
          "vietnamese": "Hiểu biết liên văn hóa"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that culture & society is one of the most pressing issues in modern society. From my perspective, **cultural heritage** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **multiculturalism**. On the other hand, challenges remain, especially regarding **social cohesion**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-culture---society-5",
    "part": 3,
    "topic": "Culture & Society",
    "question": "Is it important to learn about other cultures?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Cultural heritage",
          "vietnamese": "Di sản văn hóa"
        },
        {
          "phrase": "Multiculturalism",
          "vietnamese": "Chủ nghĩa đa văn hóa"
        },
        {
          "phrase": "Social cohesion",
          "vietnamese": "Sự gắn kết xã hội"
        },
        {
          "phrase": "To preserve traditions",
          "vietnamese": "Bảo tồn truyền thống"
        },
        {
          "phrase": "Intercultural understanding",
          "vietnamese": "Hiểu biết liên văn hóa"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that culture & society is one of the most pressing issues in modern society. From my perspective, **cultural heritage** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **multiculturalism**. On the other hand, challenges remain, especially regarding **social cohesion**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-culture---society-6",
    "part": 3,
    "topic": "Culture & Society",
    "question": "How do festivals help maintain cultural identity?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Cultural heritage",
          "vietnamese": "Di sản văn hóa"
        },
        {
          "phrase": "Multiculturalism",
          "vietnamese": "Chủ nghĩa đa văn hóa"
        },
        {
          "phrase": "Social cohesion",
          "vietnamese": "Sự gắn kết xã hội"
        },
        {
          "phrase": "To preserve traditions",
          "vietnamese": "Bảo tồn truyền thống"
        },
        {
          "phrase": "Intercultural understanding",
          "vietnamese": "Hiểu biết liên văn hóa"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that culture & society is one of the most pressing issues in modern society. From my perspective, **cultural heritage** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **multiculturalism**. On the other hand, challenges remain, especially regarding **social cohesion**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-culture---society-7",
    "part": 3,
    "topic": "Culture & Society",
    "question": "What are the advantages of a multicultural society?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Cultural heritage",
          "vietnamese": "Di sản văn hóa"
        },
        {
          "phrase": "Multiculturalism",
          "vietnamese": "Chủ nghĩa đa văn hóa"
        },
        {
          "phrase": "Social cohesion",
          "vietnamese": "Sự gắn kết xã hội"
        },
        {
          "phrase": "To preserve traditions",
          "vietnamese": "Bảo tồn truyền thống"
        },
        {
          "phrase": "Intercultural understanding",
          "vietnamese": "Hiểu biết liên văn hóa"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that culture & society is one of the most pressing issues in modern society. From my perspective, **cultural heritage** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **multiculturalism**. On the other hand, challenges remain, especially regarding **social cohesion**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-culture---society-8",
    "part": 3,
    "topic": "Culture & Society",
    "question": "Should governments fund cultural programs?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Cultural heritage",
          "vietnamese": "Di sản văn hóa"
        },
        {
          "phrase": "Multiculturalism",
          "vietnamese": "Chủ nghĩa đa văn hóa"
        },
        {
          "phrase": "Social cohesion",
          "vietnamese": "Sự gắn kết xã hội"
        },
        {
          "phrase": "To preserve traditions",
          "vietnamese": "Bảo tồn truyền thống"
        },
        {
          "phrase": "Intercultural understanding",
          "vietnamese": "Hiểu biết liên văn hóa"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that culture & society is one of the most pressing issues in modern society. From my perspective, **cultural heritage** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **multiculturalism**. On the other hand, challenges remain, especially regarding **social cohesion**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-culture---society-9",
    "part": 3,
    "topic": "Culture & Society",
    "question": "How has social media influenced cultural trends?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Cultural heritage",
          "vietnamese": "Di sản văn hóa"
        },
        {
          "phrase": "Multiculturalism",
          "vietnamese": "Chủ nghĩa đa văn hóa"
        },
        {
          "phrase": "Social cohesion",
          "vietnamese": "Sự gắn kết xã hội"
        },
        {
          "phrase": "To preserve traditions",
          "vietnamese": "Bảo tồn truyền thống"
        },
        {
          "phrase": "Intercultural understanding",
          "vietnamese": "Hiểu biết liên văn hóa"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that culture & society is one of the most pressing issues in modern society. From my perspective, **cultural heritage** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **multiculturalism**. On the other hand, challenges remain, especially regarding **social cohesion**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-culture---society-10",
    "part": 3,
    "topic": "Culture & Society",
    "question": "Do young people today value tradition as much as older generations?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Cultural heritage",
          "vietnamese": "Di sản văn hóa"
        },
        {
          "phrase": "Multiculturalism",
          "vietnamese": "Chủ nghĩa đa văn hóa"
        },
        {
          "phrase": "Social cohesion",
          "vietnamese": "Sự gắn kết xã hội"
        },
        {
          "phrase": "To preserve traditions",
          "vietnamese": "Bảo tồn truyền thống"
        },
        {
          "phrase": "Intercultural understanding",
          "vietnamese": "Hiểu biết liên văn hóa"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that culture & society is one of the most pressing issues in modern society. From my perspective, **cultural heritage** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **multiculturalism**. On the other hand, challenges remain, especially regarding **social cohesion**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-work---career-1",
    "part": 3,
    "topic": "Work & Career",
    "question": "What makes a good leader in the workplace?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Job satisfaction",
          "vietnamese": "Sự hài lòng công việc"
        },
        {
          "phrase": "Career advancement",
          "vietnamese": "Thăng tiến nghề nghiệp"
        },
        {
          "phrase": "Remote working",
          "vietnamese": "Làm việc từ xa"
        },
        {
          "phrase": "Entrepreneurship",
          "vietnamese": "Tinh thần khởi nghiệp"
        },
        {
          "phrase": "Transferable skills",
          "vietnamese": "Kỹ năng có thể chuyển đổi"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that work & career is one of the most pressing issues in modern society. From my perspective, **job satisfaction** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **career advancement**. On the other hand, challenges remain, especially regarding **remote working**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-work---career-2",
    "part": 3,
    "topic": "Work & Career",
    "question": "Is it better to work for yourself or for a company?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Job satisfaction",
          "vietnamese": "Sự hài lòng công việc"
        },
        {
          "phrase": "Career advancement",
          "vietnamese": "Thăng tiến nghề nghiệp"
        },
        {
          "phrase": "Remote working",
          "vietnamese": "Làm việc từ xa"
        },
        {
          "phrase": "Entrepreneurship",
          "vietnamese": "Tinh thần khởi nghiệp"
        },
        {
          "phrase": "Transferable skills",
          "vietnamese": "Kỹ năng có thể chuyển đổi"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that work & career is one of the most pressing issues in modern society. From my perspective, **job satisfaction** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **career advancement**. On the other hand, challenges remain, especially regarding **remote working**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-work---career-3",
    "part": 3,
    "topic": "Work & Career",
    "question": "How important is job satisfaction compared to salary?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Job satisfaction",
          "vietnamese": "Sự hài lòng công việc"
        },
        {
          "phrase": "Career advancement",
          "vietnamese": "Thăng tiến nghề nghiệp"
        },
        {
          "phrase": "Remote working",
          "vietnamese": "Làm việc từ xa"
        },
        {
          "phrase": "Entrepreneurship",
          "vietnamese": "Tinh thần khởi nghiệp"
        },
        {
          "phrase": "Transferable skills",
          "vietnamese": "Kỹ năng có thể chuyển đổi"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that work & career is one of the most pressing issues in modern society. From my perspective, **job satisfaction** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **career advancement**. On the other hand, challenges remain, especially regarding **remote working**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-work---career-4",
    "part": 3,
    "topic": "Work & Career",
    "question": "What skills are most important for success in the modern workplace?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Job satisfaction",
          "vietnamese": "Sự hài lòng công việc"
        },
        {
          "phrase": "Career advancement",
          "vietnamese": "Thăng tiến nghề nghiệp"
        },
        {
          "phrase": "Remote working",
          "vietnamese": "Làm việc từ xa"
        },
        {
          "phrase": "Entrepreneurship",
          "vietnamese": "Tinh thần khởi nghiệp"
        },
        {
          "phrase": "Transferable skills",
          "vietnamese": "Kỹ năng có thể chuyển đổi"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that work & career is one of the most pressing issues in modern society. From my perspective, **job satisfaction** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **career advancement**. On the other hand, challenges remain, especially regarding **remote working**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-work---career-5",
    "part": 3,
    "topic": "Work & Career",
    "question": "How has remote work changed the way people view employment?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Job satisfaction",
          "vietnamese": "Sự hài lòng công việc"
        },
        {
          "phrase": "Career advancement",
          "vietnamese": "Thăng tiến nghề nghiệp"
        },
        {
          "phrase": "Remote working",
          "vietnamese": "Làm việc từ xa"
        },
        {
          "phrase": "Entrepreneurship",
          "vietnamese": "Tinh thần khởi nghiệp"
        },
        {
          "phrase": "Transferable skills",
          "vietnamese": "Kỹ năng có thể chuyển đổi"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that work & career is one of the most pressing issues in modern society. From my perspective, **job satisfaction** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **career advancement**. On the other hand, challenges remain, especially regarding **remote working**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-work---career-6",
    "part": 3,
    "topic": "Work & Career",
    "question": "Should retirement age be increased?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Job satisfaction",
          "vietnamese": "Sự hài lòng công việc"
        },
        {
          "phrase": "Career advancement",
          "vietnamese": "Thăng tiến nghề nghiệp"
        },
        {
          "phrase": "Remote working",
          "vietnamese": "Làm việc từ xa"
        },
        {
          "phrase": "Entrepreneurship",
          "vietnamese": "Tinh thần khởi nghiệp"
        },
        {
          "phrase": "Transferable skills",
          "vietnamese": "Kỹ năng có thể chuyển đổi"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that work & career is one of the most pressing issues in modern society. From my perspective, **job satisfaction** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **career advancement**. On the other hand, challenges remain, especially regarding **remote working**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-work---career-7",
    "part": 3,
    "topic": "Work & Career",
    "question": "What are the challenges of working in a team?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Job satisfaction",
          "vietnamese": "Sự hài lòng công việc"
        },
        {
          "phrase": "Career advancement",
          "vietnamese": "Thăng tiến nghề nghiệp"
        },
        {
          "phrase": "Remote working",
          "vietnamese": "Làm việc từ xa"
        },
        {
          "phrase": "Entrepreneurship",
          "vietnamese": "Tinh thần khởi nghiệp"
        },
        {
          "phrase": "Transferable skills",
          "vietnamese": "Kỹ năng có thể chuyển đổi"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that work & career is one of the most pressing issues in modern society. From my perspective, **job satisfaction** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **career advancement**. On the other hand, challenges remain, especially regarding **remote working**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-work---career-8",
    "part": 3,
    "topic": "Work & Career",
    "question": "How can companies attract and retain talented employees?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Job satisfaction",
          "vietnamese": "Sự hài lòng công việc"
        },
        {
          "phrase": "Career advancement",
          "vietnamese": "Thăng tiến nghề nghiệp"
        },
        {
          "phrase": "Remote working",
          "vietnamese": "Làm việc từ xa"
        },
        {
          "phrase": "Entrepreneurship",
          "vietnamese": "Tinh thần khởi nghiệp"
        },
        {
          "phrase": "Transferable skills",
          "vietnamese": "Kỹ năng có thể chuyển đổi"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that work & career is one of the most pressing issues in modern society. From my perspective, **job satisfaction** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **career advancement**. On the other hand, challenges remain, especially regarding **remote working**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-work---career-9",
    "part": 3,
    "topic": "Work & Career",
    "question": "Is work-life balance achievable in today's world?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Job satisfaction",
          "vietnamese": "Sự hài lòng công việc"
        },
        {
          "phrase": "Career advancement",
          "vietnamese": "Thăng tiến nghề nghiệp"
        },
        {
          "phrase": "Remote working",
          "vietnamese": "Làm việc từ xa"
        },
        {
          "phrase": "Entrepreneurship",
          "vietnamese": "Tinh thần khởi nghiệp"
        },
        {
          "phrase": "Transferable skills",
          "vietnamese": "Kỹ năng có thể chuyển đổi"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that work & career is one of the most pressing issues in modern society. From my perspective, **job satisfaction** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **career advancement**. On the other hand, challenges remain, especially regarding **remote working**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-work---career-10",
    "part": 3,
    "topic": "Work & Career",
    "question": "What impact does automation have on employment?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Job satisfaction",
          "vietnamese": "Sự hài lòng công việc"
        },
        {
          "phrase": "Career advancement",
          "vietnamese": "Thăng tiến nghề nghiệp"
        },
        {
          "phrase": "Remote working",
          "vietnamese": "Làm việc từ xa"
        },
        {
          "phrase": "Entrepreneurship",
          "vietnamese": "Tinh thần khởi nghiệp"
        },
        {
          "phrase": "Transferable skills",
          "vietnamese": "Kỹ năng có thể chuyển đổi"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that work & career is one of the most pressing issues in modern society. From my perspective, **job satisfaction** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **career advancement**. On the other hand, challenges remain, especially regarding **remote working**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-media---communication-1",
    "part": 3,
    "topic": "Media & Communication",
    "question": "How has the way people get news changed in recent years?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Fake news / misinformation",
          "vietnamese": "Tin giả / thông tin sai lệch"
        },
        {
          "phrase": "Media literacy",
          "vietnamese": "Kiến thức truyền thông"
        },
        {
          "phrase": "Freedom of the press",
          "vietnamese": "Tự do báo chí"
        },
        {
          "phrase": "Echo chamber",
          "vietnamese": "Buồng cộng hưởng thông tin"
        },
        {
          "phrase": "Citizen journalism",
          "vietnamese": "Báo chí công dân"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that media & communication is one of the most pressing issues in modern society. From my perspective, **fake news / misinformation** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **media literacy**. On the other hand, challenges remain, especially regarding **freedom of the press**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-media---communication-2",
    "part": 3,
    "topic": "Media & Communication",
    "question": "Do you think social media is a reliable source of information?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Fake news / misinformation",
          "vietnamese": "Tin giả / thông tin sai lệch"
        },
        {
          "phrase": "Media literacy",
          "vietnamese": "Kiến thức truyền thông"
        },
        {
          "phrase": "Freedom of the press",
          "vietnamese": "Tự do báo chí"
        },
        {
          "phrase": "Echo chamber",
          "vietnamese": "Buồng cộng hưởng thông tin"
        },
        {
          "phrase": "Citizen journalism",
          "vietnamese": "Báo chí công dân"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that media & communication is one of the most pressing issues in modern society. From my perspective, **fake news / misinformation** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **media literacy**. On the other hand, challenges remain, especially regarding **freedom of the press**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-media---communication-3",
    "part": 3,
    "topic": "Media & Communication",
    "question": "What are the effects of fake news on society?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Fake news / misinformation",
          "vietnamese": "Tin giả / thông tin sai lệch"
        },
        {
          "phrase": "Media literacy",
          "vietnamese": "Kiến thức truyền thông"
        },
        {
          "phrase": "Freedom of the press",
          "vietnamese": "Tự do báo chí"
        },
        {
          "phrase": "Echo chamber",
          "vietnamese": "Buồng cộng hưởng thông tin"
        },
        {
          "phrase": "Citizen journalism",
          "vietnamese": "Báo chí công dân"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that media & communication is one of the most pressing issues in modern society. From my perspective, **fake news / misinformation** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **media literacy**. On the other hand, challenges remain, especially regarding **freedom of the press**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-media---communication-4",
    "part": 3,
    "topic": "Media & Communication",
    "question": "Should there be stricter regulations on media content?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Fake news / misinformation",
          "vietnamese": "Tin giả / thông tin sai lệch"
        },
        {
          "phrase": "Media literacy",
          "vietnamese": "Kiến thức truyền thông"
        },
        {
          "phrase": "Freedom of the press",
          "vietnamese": "Tự do báo chí"
        },
        {
          "phrase": "Echo chamber",
          "vietnamese": "Buồng cộng hưởng thông tin"
        },
        {
          "phrase": "Citizen journalism",
          "vietnamese": "Báo chí công dân"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that media & communication is one of the most pressing issues in modern society. From my perspective, **fake news / misinformation** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **media literacy**. On the other hand, challenges remain, especially regarding **freedom of the press**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-media---communication-5",
    "part": 3,
    "topic": "Media & Communication",
    "question": "How has advertising changed with the rise of the internet?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Fake news / misinformation",
          "vietnamese": "Tin giả / thông tin sai lệch"
        },
        {
          "phrase": "Media literacy",
          "vietnamese": "Kiến thức truyền thông"
        },
        {
          "phrase": "Freedom of the press",
          "vietnamese": "Tự do báo chí"
        },
        {
          "phrase": "Echo chamber",
          "vietnamese": "Buồng cộng hưởng thông tin"
        },
        {
          "phrase": "Citizen journalism",
          "vietnamese": "Báo chí công dân"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that media & communication is one of the most pressing issues in modern society. From my perspective, **fake news / misinformation** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **media literacy**. On the other hand, challenges remain, especially regarding **freedom of the press**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-media---communication-6",
    "part": 3,
    "topic": "Media & Communication",
    "question": "Is traditional media still relevant?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Fake news / misinformation",
          "vietnamese": "Tin giả / thông tin sai lệch"
        },
        {
          "phrase": "Media literacy",
          "vietnamese": "Kiến thức truyền thông"
        },
        {
          "phrase": "Freedom of the press",
          "vietnamese": "Tự do báo chí"
        },
        {
          "phrase": "Echo chamber",
          "vietnamese": "Buồng cộng hưởng thông tin"
        },
        {
          "phrase": "Citizen journalism",
          "vietnamese": "Báo chí công dân"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that media & communication is one of the most pressing issues in modern society. From my perspective, **fake news / misinformation** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **media literacy**. On the other hand, challenges remain, especially regarding **freedom of the press**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-media---communication-7",
    "part": 3,
    "topic": "Media & Communication",
    "question": "What role does media play in shaping public opinion?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Fake news / misinformation",
          "vietnamese": "Tin giả / thông tin sai lệch"
        },
        {
          "phrase": "Media literacy",
          "vietnamese": "Kiến thức truyền thông"
        },
        {
          "phrase": "Freedom of the press",
          "vietnamese": "Tự do báo chí"
        },
        {
          "phrase": "Echo chamber",
          "vietnamese": "Buồng cộng hưởng thông tin"
        },
        {
          "phrase": "Citizen journalism",
          "vietnamese": "Báo chí công dân"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that media & communication is one of the most pressing issues in modern society. From my perspective, **fake news / misinformation** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **media literacy**. On the other hand, challenges remain, especially regarding **freedom of the press**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-media---communication-8",
    "part": 3,
    "topic": "Media & Communication",
    "question": "How can people become more critical consumers of media?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Fake news / misinformation",
          "vietnamese": "Tin giả / thông tin sai lệch"
        },
        {
          "phrase": "Media literacy",
          "vietnamese": "Kiến thức truyền thông"
        },
        {
          "phrase": "Freedom of the press",
          "vietnamese": "Tự do báo chí"
        },
        {
          "phrase": "Echo chamber",
          "vietnamese": "Buồng cộng hưởng thông tin"
        },
        {
          "phrase": "Citizen journalism",
          "vietnamese": "Báo chí công dân"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that media & communication is one of the most pressing issues in modern society. From my perspective, **fake news / misinformation** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **media literacy**. On the other hand, challenges remain, especially regarding **freedom of the press**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-media---communication-9",
    "part": 3,
    "topic": "Media & Communication",
    "question": "What are the pros and cons of 24-hour news coverage?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Fake news / misinformation",
          "vietnamese": "Tin giả / thông tin sai lệch"
        },
        {
          "phrase": "Media literacy",
          "vietnamese": "Kiến thức truyền thông"
        },
        {
          "phrase": "Freedom of the press",
          "vietnamese": "Tự do báo chí"
        },
        {
          "phrase": "Echo chamber",
          "vietnamese": "Buồng cộng hưởng thông tin"
        },
        {
          "phrase": "Citizen journalism",
          "vietnamese": "Báo chí công dân"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that media & communication is one of the most pressing issues in modern society. From my perspective, **fake news / misinformation** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **media literacy**. On the other hand, challenges remain, especially regarding **freedom of the press**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-media---communication-10",
    "part": 3,
    "topic": "Media & Communication",
    "question": "Should celebrities be careful about what they say on social media?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Fake news / misinformation",
          "vietnamese": "Tin giả / thông tin sai lệch"
        },
        {
          "phrase": "Media literacy",
          "vietnamese": "Kiến thức truyền thông"
        },
        {
          "phrase": "Freedom of the press",
          "vietnamese": "Tự do báo chí"
        },
        {
          "phrase": "Echo chamber",
          "vietnamese": "Buồng cộng hưởng thông tin"
        },
        {
          "phrase": "Citizen journalism",
          "vietnamese": "Báo chí công dân"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that media & communication is one of the most pressing issues in modern society. From my perspective, **fake news / misinformation** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **media literacy**. On the other hand, challenges remain, especially regarding **freedom of the press**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-urbanization-1",
    "part": 3,
    "topic": "Urbanization",
    "question": "What are the main problems facing cities today?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Urban sprawl",
          "vietnamese": "Sự mở rộng đô thị"
        },
        {
          "phrase": "Infrastructure development",
          "vietnamese": "Phát triển cơ sở hạ tầng"
        },
        {
          "phrase": "Quality of life",
          "vietnamese": "Chất lượng cuộc sống"
        },
        {
          "phrase": "Public amenities",
          "vietnamese": "Tiện ích công cộng"
        },
        {
          "phrase": "Affordable housing",
          "vietnamese": "Nhà ở giá cả phải chăng"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that urbanization is one of the most pressing issues in modern society. From my perspective, **urban sprawl** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **infrastructure development**. On the other hand, challenges remain, especially regarding **quality of life**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-urbanization-2",
    "part": 3,
    "topic": "Urbanization",
    "question": "Is it better to live in a city or in the countryside?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Urban sprawl",
          "vietnamese": "Sự mở rộng đô thị"
        },
        {
          "phrase": "Infrastructure development",
          "vietnamese": "Phát triển cơ sở hạ tầng"
        },
        {
          "phrase": "Quality of life",
          "vietnamese": "Chất lượng cuộc sống"
        },
        {
          "phrase": "Public amenities",
          "vietnamese": "Tiện ích công cộng"
        },
        {
          "phrase": "Affordable housing",
          "vietnamese": "Nhà ở giá cả phải chăng"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that urbanization is one of the most pressing issues in modern society. From my perspective, **urban sprawl** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **infrastructure development**. On the other hand, challenges remain, especially regarding **quality of life**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-urbanization-3",
    "part": 3,
    "topic": "Urbanization",
    "question": "How can cities become more sustainable?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Urban sprawl",
          "vietnamese": "Sự mở rộng đô thị"
        },
        {
          "phrase": "Infrastructure development",
          "vietnamese": "Phát triển cơ sở hạ tầng"
        },
        {
          "phrase": "Quality of life",
          "vietnamese": "Chất lượng cuộc sống"
        },
        {
          "phrase": "Public amenities",
          "vietnamese": "Tiện ích công cộng"
        },
        {
          "phrase": "Affordable housing",
          "vietnamese": "Nhà ở giá cả phải chăng"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that urbanization is one of the most pressing issues in modern society. From my perspective, **urban sprawl** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **infrastructure development**. On the other hand, challenges remain, especially regarding **quality of life**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-urbanization-4",
    "part": 3,
    "topic": "Urbanization",
    "question": "What causes people to move from rural areas to cities?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Urban sprawl",
          "vietnamese": "Sự mở rộng đô thị"
        },
        {
          "phrase": "Infrastructure development",
          "vietnamese": "Phát triển cơ sở hạ tầng"
        },
        {
          "phrase": "Quality of life",
          "vietnamese": "Chất lượng cuộc sống"
        },
        {
          "phrase": "Public amenities",
          "vietnamese": "Tiện ích công cộng"
        },
        {
          "phrase": "Affordable housing",
          "vietnamese": "Nhà ở giá cả phải chăng"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that urbanization is one of the most pressing issues in modern society. From my perspective, **urban sprawl** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **infrastructure development**. On the other hand, challenges remain, especially regarding **quality of life**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-urbanization-5",
    "part": 3,
    "topic": "Urbanization",
    "question": "How can public transportation be improved in cities?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Urban sprawl",
          "vietnamese": "Sự mở rộng đô thị"
        },
        {
          "phrase": "Infrastructure development",
          "vietnamese": "Phát triển cơ sở hạ tầng"
        },
        {
          "phrase": "Quality of life",
          "vietnamese": "Chất lượng cuộc sống"
        },
        {
          "phrase": "Public amenities",
          "vietnamese": "Tiện ích công cộng"
        },
        {
          "phrase": "Affordable housing",
          "vietnamese": "Nhà ở giá cả phải chăng"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that urbanization is one of the most pressing issues in modern society. From my perspective, **urban sprawl** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **infrastructure development**. On the other hand, challenges remain, especially regarding **quality of life**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-urbanization-6",
    "part": 3,
    "topic": "Urbanization",
    "question": "What are the social effects of urbanization?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Urban sprawl",
          "vietnamese": "Sự mở rộng đô thị"
        },
        {
          "phrase": "Infrastructure development",
          "vietnamese": "Phát triển cơ sở hạ tầng"
        },
        {
          "phrase": "Quality of life",
          "vietnamese": "Chất lượng cuộc sống"
        },
        {
          "phrase": "Public amenities",
          "vietnamese": "Tiện ích công cộng"
        },
        {
          "phrase": "Affordable housing",
          "vietnamese": "Nhà ở giá cả phải chăng"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that urbanization is one of the most pressing issues in modern society. From my perspective, **urban sprawl** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **infrastructure development**. On the other hand, challenges remain, especially regarding **quality of life**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-urbanization-7",
    "part": 3,
    "topic": "Urbanization",
    "question": "Should governments limit the growth of cities?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Urban sprawl",
          "vietnamese": "Sự mở rộng đô thị"
        },
        {
          "phrase": "Infrastructure development",
          "vietnamese": "Phát triển cơ sở hạ tầng"
        },
        {
          "phrase": "Quality of life",
          "vietnamese": "Chất lượng cuộc sống"
        },
        {
          "phrase": "Public amenities",
          "vietnamese": "Tiện ích công cộng"
        },
        {
          "phrase": "Affordable housing",
          "vietnamese": "Nhà ở giá cả phải chăng"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that urbanization is one of the most pressing issues in modern society. From my perspective, **urban sprawl** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **infrastructure development**. On the other hand, challenges remain, especially regarding **quality of life**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-urbanization-8",
    "part": 3,
    "topic": "Urbanization",
    "question": "How does urban living affect mental health?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Urban sprawl",
          "vietnamese": "Sự mở rộng đô thị"
        },
        {
          "phrase": "Infrastructure development",
          "vietnamese": "Phát triển cơ sở hạ tầng"
        },
        {
          "phrase": "Quality of life",
          "vietnamese": "Chất lượng cuộc sống"
        },
        {
          "phrase": "Public amenities",
          "vietnamese": "Tiện ích công cộng"
        },
        {
          "phrase": "Affordable housing",
          "vietnamese": "Nhà ở giá cả phải chăng"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that urbanization is one of the most pressing issues in modern society. From my perspective, **urban sprawl** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **infrastructure development**. On the other hand, challenges remain, especially regarding **quality of life**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-urbanization-9",
    "part": 3,
    "topic": "Urbanization",
    "question": "What can be done to make cities safer?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Urban sprawl",
          "vietnamese": "Sự mở rộng đô thị"
        },
        {
          "phrase": "Infrastructure development",
          "vietnamese": "Phát triển cơ sở hạ tầng"
        },
        {
          "phrase": "Quality of life",
          "vietnamese": "Chất lượng cuộc sống"
        },
        {
          "phrase": "Public amenities",
          "vietnamese": "Tiện ích công cộng"
        },
        {
          "phrase": "Affordable housing",
          "vietnamese": "Nhà ở giá cả phải chăng"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that urbanization is one of the most pressing issues in modern society. From my perspective, **urban sprawl** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **infrastructure development**. On the other hand, challenges remain, especially regarding **quality of life**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-urbanization-10",
    "part": 3,
    "topic": "Urbanization",
    "question": "How will cities change in the next 50 years?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Urban sprawl",
          "vietnamese": "Sự mở rộng đô thị"
        },
        {
          "phrase": "Infrastructure development",
          "vietnamese": "Phát triển cơ sở hạ tầng"
        },
        {
          "phrase": "Quality of life",
          "vietnamese": "Chất lượng cuộc sống"
        },
        {
          "phrase": "Public amenities",
          "vietnamese": "Tiện ích công cộng"
        },
        {
          "phrase": "Affordable housing",
          "vietnamese": "Nhà ở giá cả phải chăng"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that urbanization is one of the most pressing issues in modern society. From my perspective, **urban sprawl** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **infrastructure development**. On the other hand, challenges remain, especially regarding **quality of life**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-globalization-1",
    "part": 3,
    "topic": "Globalization",
    "question": "What are the advantages and disadvantages of globalization?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Cultural homogenization",
          "vietnamese": "Đồng nhất văn hóa"
        },
        {
          "phrase": "Free trade agreements",
          "vietnamese": "Hiệp định thương mại tự do"
        },
        {
          "phrase": "Economic interdependence",
          "vietnamese": "Sự phụ thuộc kinh tế lẫn nhau"
        },
        {
          "phrase": "Brain drain",
          "vietnamese": "Chảy máu chất xám"
        },
        {
          "phrase": "Global supply chain",
          "vietnamese": "Chuỗi cung ứng toàn cầu"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that globalization is one of the most pressing issues in modern society. From my perspective, **cultural homogenization** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **free trade agreements**. On the other hand, challenges remain, especially regarding **economic interdependence**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-globalization-2",
    "part": 3,
    "topic": "Globalization",
    "question": "How has globalization affected local businesses?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Cultural homogenization",
          "vietnamese": "Đồng nhất văn hóa"
        },
        {
          "phrase": "Free trade agreements",
          "vietnamese": "Hiệp định thương mại tự do"
        },
        {
          "phrase": "Economic interdependence",
          "vietnamese": "Sự phụ thuộc kinh tế lẫn nhau"
        },
        {
          "phrase": "Brain drain",
          "vietnamese": "Chảy máu chất xám"
        },
        {
          "phrase": "Global supply chain",
          "vietnamese": "Chuỗi cung ứng toàn cầu"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that globalization is one of the most pressing issues in modern society. From my perspective, **cultural homogenization** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **free trade agreements**. On the other hand, challenges remain, especially regarding **economic interdependence**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-globalization-3",
    "part": 3,
    "topic": "Globalization",
    "question": "Do you think globalization leads to cultural homogenization?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Cultural homogenization",
          "vietnamese": "Đồng nhất văn hóa"
        },
        {
          "phrase": "Free trade agreements",
          "vietnamese": "Hiệp định thương mại tự do"
        },
        {
          "phrase": "Economic interdependence",
          "vietnamese": "Sự phụ thuộc kinh tế lẫn nhau"
        },
        {
          "phrase": "Brain drain",
          "vietnamese": "Chảy máu chất xám"
        },
        {
          "phrase": "Global supply chain",
          "vietnamese": "Chuỗi cung ứng toàn cầu"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that globalization is one of the most pressing issues in modern society. From my perspective, **cultural homogenization** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **free trade agreements**. On the other hand, challenges remain, especially regarding **economic interdependence**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-globalization-4",
    "part": 3,
    "topic": "Globalization",
    "question": "How has international trade changed in recent years?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Cultural homogenization",
          "vietnamese": "Đồng nhất văn hóa"
        },
        {
          "phrase": "Free trade agreements",
          "vietnamese": "Hiệp định thương mại tự do"
        },
        {
          "phrase": "Economic interdependence",
          "vietnamese": "Sự phụ thuộc kinh tế lẫn nhau"
        },
        {
          "phrase": "Brain drain",
          "vietnamese": "Chảy máu chất xám"
        },
        {
          "phrase": "Global supply chain",
          "vietnamese": "Chuỗi cung ứng toàn cầu"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that globalization is one of the most pressing issues in modern society. From my perspective, **cultural homogenization** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **free trade agreements**. On the other hand, challenges remain, especially regarding **economic interdependence**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-globalization-5",
    "part": 3,
    "topic": "Globalization",
    "question": "Should countries prioritize domestic products over imports?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Cultural homogenization",
          "vietnamese": "Đồng nhất văn hóa"
        },
        {
          "phrase": "Free trade agreements",
          "vietnamese": "Hiệp định thương mại tự do"
        },
        {
          "phrase": "Economic interdependence",
          "vietnamese": "Sự phụ thuộc kinh tế lẫn nhau"
        },
        {
          "phrase": "Brain drain",
          "vietnamese": "Chảy máu chất xám"
        },
        {
          "phrase": "Global supply chain",
          "vietnamese": "Chuỗi cung ứng toàn cầu"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that globalization is one of the most pressing issues in modern society. From my perspective, **cultural homogenization** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **free trade agreements**. On the other hand, challenges remain, especially regarding **economic interdependence**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-globalization-6",
    "part": 3,
    "topic": "Globalization",
    "question": "What role does language play in globalization?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Cultural homogenization",
          "vietnamese": "Đồng nhất văn hóa"
        },
        {
          "phrase": "Free trade agreements",
          "vietnamese": "Hiệp định thương mại tự do"
        },
        {
          "phrase": "Economic interdependence",
          "vietnamese": "Sự phụ thuộc kinh tế lẫn nhau"
        },
        {
          "phrase": "Brain drain",
          "vietnamese": "Chảy máu chất xám"
        },
        {
          "phrase": "Global supply chain",
          "vietnamese": "Chuỗi cung ứng toàn cầu"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that globalization is one of the most pressing issues in modern society. From my perspective, **cultural homogenization** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **free trade agreements**. On the other hand, challenges remain, especially regarding **economic interdependence**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-globalization-7",
    "part": 3,
    "topic": "Globalization",
    "question": "How has globalization affected employment in developing countries?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Cultural homogenization",
          "vietnamese": "Đồng nhất văn hóa"
        },
        {
          "phrase": "Free trade agreements",
          "vietnamese": "Hiệp định thương mại tự do"
        },
        {
          "phrase": "Economic interdependence",
          "vietnamese": "Sự phụ thuộc kinh tế lẫn nhau"
        },
        {
          "phrase": "Brain drain",
          "vietnamese": "Chảy máu chất xám"
        },
        {
          "phrase": "Global supply chain",
          "vietnamese": "Chuỗi cung ứng toàn cầu"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that globalization is one of the most pressing issues in modern society. From my perspective, **cultural homogenization** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **free trade agreements**. On the other hand, challenges remain, especially regarding **economic interdependence**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-globalization-8",
    "part": 3,
    "topic": "Globalization",
    "question": "Is globalization making the world more equal or unequal?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Cultural homogenization",
          "vietnamese": "Đồng nhất văn hóa"
        },
        {
          "phrase": "Free trade agreements",
          "vietnamese": "Hiệp định thương mại tự do"
        },
        {
          "phrase": "Economic interdependence",
          "vietnamese": "Sự phụ thuộc kinh tế lẫn nhau"
        },
        {
          "phrase": "Brain drain",
          "vietnamese": "Chảy máu chất xám"
        },
        {
          "phrase": "Global supply chain",
          "vietnamese": "Chuỗi cung ứng toàn cầu"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that globalization is one of the most pressing issues in modern society. From my perspective, **cultural homogenization** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **free trade agreements**. On the other hand, challenges remain, especially regarding **economic interdependence**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-globalization-9",
    "part": 3,
    "topic": "Globalization",
    "question": "What are the environmental effects of globalization?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Cultural homogenization",
          "vietnamese": "Đồng nhất văn hóa"
        },
        {
          "phrase": "Free trade agreements",
          "vietnamese": "Hiệp định thương mại tự do"
        },
        {
          "phrase": "Economic interdependence",
          "vietnamese": "Sự phụ thuộc kinh tế lẫn nhau"
        },
        {
          "phrase": "Brain drain",
          "vietnamese": "Chảy máu chất xám"
        },
        {
          "phrase": "Global supply chain",
          "vietnamese": "Chuỗi cung ứng toàn cầu"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that globalization is one of the most pressing issues in modern society. From my perspective, **cultural homogenization** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **free trade agreements**. On the other hand, challenges remain, especially regarding **economic interdependence**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-globalization-10",
    "part": 3,
    "topic": "Globalization",
    "question": "How has travel contributed to globalization?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Cultural homogenization",
          "vietnamese": "Đồng nhất văn hóa"
        },
        {
          "phrase": "Free trade agreements",
          "vietnamese": "Hiệp định thương mại tự do"
        },
        {
          "phrase": "Economic interdependence",
          "vietnamese": "Sự phụ thuộc kinh tế lẫn nhau"
        },
        {
          "phrase": "Brain drain",
          "vietnamese": "Chảy máu chất xám"
        },
        {
          "phrase": "Global supply chain",
          "vietnamese": "Chuỗi cung ứng toàn cầu"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that globalization is one of the most pressing issues in modern society. From my perspective, **cultural homogenization** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **free trade agreements**. On the other hand, challenges remain, especially regarding **economic interdependence**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-crime---law-1",
    "part": 3,
    "topic": "Crime & Law",
    "question": "What are the main causes of crime in society?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Crime prevention",
          "vietnamese": "Phòng chống tội phạm"
        },
        {
          "phrase": "Rehabilitation vs. punishment",
          "vietnamese": "Cải tạo vs. trừng phạt"
        },
        {
          "phrase": "Juvenile delinquency",
          "vietnamese": "Phạm pháp vị thành niên"
        },
        {
          "phrase": "White-collar crime",
          "vietnamese": "Tội phạm cổ cồn trắng"
        },
        {
          "phrase": "Deterrent effect",
          "vietnamese": "Hiệu ứng răn đe"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that crime & law is one of the most pressing issues in modern society. From my perspective, **crime prevention** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **rehabilitation vs. punishment**. On the other hand, challenges remain, especially regarding **juvenile delinquency**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-crime---law-2",
    "part": 3,
    "topic": "Crime & Law",
    "question": "Should the focus be on punishment or rehabilitation for criminals?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Crime prevention",
          "vietnamese": "Phòng chống tội phạm"
        },
        {
          "phrase": "Rehabilitation vs. punishment",
          "vietnamese": "Cải tạo vs. trừng phạt"
        },
        {
          "phrase": "Juvenile delinquency",
          "vietnamese": "Phạm pháp vị thành niên"
        },
        {
          "phrase": "White-collar crime",
          "vietnamese": "Tội phạm cổ cồn trắng"
        },
        {
          "phrase": "Deterrent effect",
          "vietnamese": "Hiệu ứng răn đe"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that crime & law is one of the most pressing issues in modern society. From my perspective, **crime prevention** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **rehabilitation vs. punishment**. On the other hand, challenges remain, especially regarding **juvenile delinquency**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-crime---law-3",
    "part": 3,
    "topic": "Crime & Law",
    "question": "How can communities help reduce crime rates?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Crime prevention",
          "vietnamese": "Phòng chống tội phạm"
        },
        {
          "phrase": "Rehabilitation vs. punishment",
          "vietnamese": "Cải tạo vs. trừng phạt"
        },
        {
          "phrase": "Juvenile delinquency",
          "vietnamese": "Phạm pháp vị thành niên"
        },
        {
          "phrase": "White-collar crime",
          "vietnamese": "Tội phạm cổ cồn trắng"
        },
        {
          "phrase": "Deterrent effect",
          "vietnamese": "Hiệu ứng răn đe"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that crime & law is one of the most pressing issues in modern society. From my perspective, **crime prevention** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **rehabilitation vs. punishment**. On the other hand, challenges remain, especially regarding **juvenile delinquency**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-crime---law-4",
    "part": 3,
    "topic": "Crime & Law",
    "question": "Is cybercrime becoming a bigger threat than traditional crime?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Crime prevention",
          "vietnamese": "Phòng chống tội phạm"
        },
        {
          "phrase": "Rehabilitation vs. punishment",
          "vietnamese": "Cải tạo vs. trừng phạt"
        },
        {
          "phrase": "Juvenile delinquency",
          "vietnamese": "Phạm pháp vị thành niên"
        },
        {
          "phrase": "White-collar crime",
          "vietnamese": "Tội phạm cổ cồn trắng"
        },
        {
          "phrase": "Deterrent effect",
          "vietnamese": "Hiệu ứng răn đe"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that crime & law is one of the most pressing issues in modern society. From my perspective, **crime prevention** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **rehabilitation vs. punishment**. On the other hand, challenges remain, especially regarding **juvenile delinquency**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-crime---law-5",
    "part": 3,
    "topic": "Crime & Law",
    "question": "What role does education play in crime prevention?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Crime prevention",
          "vietnamese": "Phòng chống tội phạm"
        },
        {
          "phrase": "Rehabilitation vs. punishment",
          "vietnamese": "Cải tạo vs. trừng phạt"
        },
        {
          "phrase": "Juvenile delinquency",
          "vietnamese": "Phạm pháp vị thành niên"
        },
        {
          "phrase": "White-collar crime",
          "vietnamese": "Tội phạm cổ cồn trắng"
        },
        {
          "phrase": "Deterrent effect",
          "vietnamese": "Hiệu ứng răn đe"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that crime & law is one of the most pressing issues in modern society. From my perspective, **crime prevention** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **rehabilitation vs. punishment**. On the other hand, challenges remain, especially regarding **juvenile delinquency**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-crime---law-6",
    "part": 3,
    "topic": "Crime & Law",
    "question": "Should surveillance cameras be used everywhere for safety?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Crime prevention",
          "vietnamese": "Phòng chống tội phạm"
        },
        {
          "phrase": "Rehabilitation vs. punishment",
          "vietnamese": "Cải tạo vs. trừng phạt"
        },
        {
          "phrase": "Juvenile delinquency",
          "vietnamese": "Phạm pháp vị thành niên"
        },
        {
          "phrase": "White-collar crime",
          "vietnamese": "Tội phạm cổ cồn trắng"
        },
        {
          "phrase": "Deterrent effect",
          "vietnamese": "Hiệu ứng răn đe"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that crime & law is one of the most pressing issues in modern society. From my perspective, **crime prevention** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **rehabilitation vs. punishment**. On the other hand, challenges remain, especially regarding **juvenile delinquency**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-crime---law-7",
    "part": 3,
    "topic": "Crime & Law",
    "question": "Are prison sentences effective in deterring crime?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Crime prevention",
          "vietnamese": "Phòng chống tội phạm"
        },
        {
          "phrase": "Rehabilitation vs. punishment",
          "vietnamese": "Cải tạo vs. trừng phạt"
        },
        {
          "phrase": "Juvenile delinquency",
          "vietnamese": "Phạm pháp vị thành niên"
        },
        {
          "phrase": "White-collar crime",
          "vietnamese": "Tội phạm cổ cồn trắng"
        },
        {
          "phrase": "Deterrent effect",
          "vietnamese": "Hiệu ứng răn đe"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that crime & law is one of the most pressing issues in modern society. From my perspective, **crime prevention** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **rehabilitation vs. punishment**. On the other hand, challenges remain, especially regarding **juvenile delinquency**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-crime---law-8",
    "part": 3,
    "topic": "Crime & Law",
    "question": "How can young people be prevented from turning to crime?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Crime prevention",
          "vietnamese": "Phòng chống tội phạm"
        },
        {
          "phrase": "Rehabilitation vs. punishment",
          "vietnamese": "Cải tạo vs. trừng phạt"
        },
        {
          "phrase": "Juvenile delinquency",
          "vietnamese": "Phạm pháp vị thành niên"
        },
        {
          "phrase": "White-collar crime",
          "vietnamese": "Tội phạm cổ cồn trắng"
        },
        {
          "phrase": "Deterrent effect",
          "vietnamese": "Hiệu ứng răn đe"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that crime & law is one of the most pressing issues in modern society. From my perspective, **crime prevention** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **rehabilitation vs. punishment**. On the other hand, challenges remain, especially regarding **juvenile delinquency**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-crime---law-9",
    "part": 3,
    "topic": "Crime & Law",
    "question": "What are the ethical issues around the death penalty?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Crime prevention",
          "vietnamese": "Phòng chống tội phạm"
        },
        {
          "phrase": "Rehabilitation vs. punishment",
          "vietnamese": "Cải tạo vs. trừng phạt"
        },
        {
          "phrase": "Juvenile delinquency",
          "vietnamese": "Phạm pháp vị thành niên"
        },
        {
          "phrase": "White-collar crime",
          "vietnamese": "Tội phạm cổ cồn trắng"
        },
        {
          "phrase": "Deterrent effect",
          "vietnamese": "Hiệu ứng răn đe"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that crime & law is one of the most pressing issues in modern society. From my perspective, **crime prevention** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **rehabilitation vs. punishment**. On the other hand, challenges remain, especially regarding **juvenile delinquency**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-crime---law-10",
    "part": 3,
    "topic": "Crime & Law",
    "question": "How has technology changed law enforcement?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Crime prevention",
          "vietnamese": "Phòng chống tội phạm"
        },
        {
          "phrase": "Rehabilitation vs. punishment",
          "vietnamese": "Cải tạo vs. trừng phạt"
        },
        {
          "phrase": "Juvenile delinquency",
          "vietnamese": "Phạm pháp vị thành niên"
        },
        {
          "phrase": "White-collar crime",
          "vietnamese": "Tội phạm cổ cồn trắng"
        },
        {
          "phrase": "Deterrent effect",
          "vietnamese": "Hiệu ứng răn đe"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that crime & law is one of the most pressing issues in modern society. From my perspective, **crime prevention** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **rehabilitation vs. punishment**. On the other hand, challenges remain, especially regarding **juvenile delinquency**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-money---economy-1",
    "part": 3,
    "topic": "Money & Economy",
    "question": "Is money the most important factor in choosing a career?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Financial literacy",
          "vietnamese": "Hiểu biết tài chính"
        },
        {
          "phrase": "Income inequality",
          "vietnamese": "Bất bình đẳng thu nhập"
        },
        {
          "phrase": "Consumer culture",
          "vietnamese": "Văn hóa tiêu dùng"
        },
        {
          "phrase": "Economic recession",
          "vietnamese": "Suy thoái kinh tế"
        },
        {
          "phrase": "Disposable income",
          "vietnamese": "Thu nhập khả dụng"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that money & economy is one of the most pressing issues in modern society. From my perspective, **financial literacy** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **income inequality**. On the other hand, challenges remain, especially regarding **consumer culture**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-money---economy-2",
    "part": 3,
    "topic": "Money & Economy",
    "question": "How has the way people spend money changed?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Financial literacy",
          "vietnamese": "Hiểu biết tài chính"
        },
        {
          "phrase": "Income inequality",
          "vietnamese": "Bất bình đẳng thu nhập"
        },
        {
          "phrase": "Consumer culture",
          "vietnamese": "Văn hóa tiêu dùng"
        },
        {
          "phrase": "Economic recession",
          "vietnamese": "Suy thoái kinh tế"
        },
        {
          "phrase": "Disposable income",
          "vietnamese": "Thu nhập khả dụng"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that money & economy is one of the most pressing issues in modern society. From my perspective, **financial literacy** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **income inequality**. On the other hand, challenges remain, especially regarding **consumer culture**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-money---economy-3",
    "part": 3,
    "topic": "Money & Economy",
    "question": "Should financial literacy be taught in schools?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Financial literacy",
          "vietnamese": "Hiểu biết tài chính"
        },
        {
          "phrase": "Income inequality",
          "vietnamese": "Bất bình đẳng thu nhập"
        },
        {
          "phrase": "Consumer culture",
          "vietnamese": "Văn hóa tiêu dùng"
        },
        {
          "phrase": "Economic recession",
          "vietnamese": "Suy thoái kinh tế"
        },
        {
          "phrase": "Disposable income",
          "vietnamese": "Thu nhập khả dụng"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that money & economy is one of the most pressing issues in modern society. From my perspective, **financial literacy** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **income inequality**. On the other hand, challenges remain, especially regarding **consumer culture**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-money---economy-4",
    "part": 3,
    "topic": "Money & Economy",
    "question": "What are the effects of economic inequality?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Financial literacy",
          "vietnamese": "Hiểu biết tài chính"
        },
        {
          "phrase": "Income inequality",
          "vietnamese": "Bất bình đẳng thu nhập"
        },
        {
          "phrase": "Consumer culture",
          "vietnamese": "Văn hóa tiêu dùng"
        },
        {
          "phrase": "Economic recession",
          "vietnamese": "Suy thoái kinh tế"
        },
        {
          "phrase": "Disposable income",
          "vietnamese": "Thu nhập khả dụng"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that money & economy is one of the most pressing issues in modern society. From my perspective, **financial literacy** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **income inequality**. On the other hand, challenges remain, especially regarding **consumer culture**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-money---economy-5",
    "part": 3,
    "topic": "Money & Economy",
    "question": "Is it better to save money or spend it?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Financial literacy",
          "vietnamese": "Hiểu biết tài chính"
        },
        {
          "phrase": "Income inequality",
          "vietnamese": "Bất bình đẳng thu nhập"
        },
        {
          "phrase": "Consumer culture",
          "vietnamese": "Văn hóa tiêu dùng"
        },
        {
          "phrase": "Economic recession",
          "vietnamese": "Suy thoái kinh tế"
        },
        {
          "phrase": "Disposable income",
          "vietnamese": "Thu nhập khả dụng"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that money & economy is one of the most pressing issues in modern society. From my perspective, **financial literacy** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **income inequality**. On the other hand, challenges remain, especially regarding **consumer culture**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-money---economy-6",
    "part": 3,
    "topic": "Money & Economy",
    "question": "How do economic crises affect ordinary people?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Financial literacy",
          "vietnamese": "Hiểu biết tài chính"
        },
        {
          "phrase": "Income inequality",
          "vietnamese": "Bất bình đẳng thu nhập"
        },
        {
          "phrase": "Consumer culture",
          "vietnamese": "Văn hóa tiêu dùng"
        },
        {
          "phrase": "Economic recession",
          "vietnamese": "Suy thoái kinh tế"
        },
        {
          "phrase": "Disposable income",
          "vietnamese": "Thu nhập khả dụng"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that money & economy is one of the most pressing issues in modern society. From my perspective, **financial literacy** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **income inequality**. On the other hand, challenges remain, especially regarding **consumer culture**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-money---economy-7",
    "part": 3,
    "topic": "Money & Economy",
    "question": "What role does advertising play in consumer behavior?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Financial literacy",
          "vietnamese": "Hiểu biết tài chính"
        },
        {
          "phrase": "Income inequality",
          "vietnamese": "Bất bình đẳng thu nhập"
        },
        {
          "phrase": "Consumer culture",
          "vietnamese": "Văn hóa tiêu dùng"
        },
        {
          "phrase": "Economic recession",
          "vietnamese": "Suy thoái kinh tế"
        },
        {
          "phrase": "Disposable income",
          "vietnamese": "Thu nhập khả dụng"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that money & economy is one of the most pressing issues in modern society. From my perspective, **financial literacy** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **income inequality**. On the other hand, challenges remain, especially regarding **consumer culture**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-money---economy-8",
    "part": 3,
    "topic": "Money & Economy",
    "question": "Should governments provide financial support to citizens?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Financial literacy",
          "vietnamese": "Hiểu biết tài chính"
        },
        {
          "phrase": "Income inequality",
          "vietnamese": "Bất bình đẳng thu nhập"
        },
        {
          "phrase": "Consumer culture",
          "vietnamese": "Văn hóa tiêu dùng"
        },
        {
          "phrase": "Economic recession",
          "vietnamese": "Suy thoái kinh tế"
        },
        {
          "phrase": "Disposable income",
          "vietnamese": "Thu nhập khả dụng"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that money & economy is one of the most pressing issues in modern society. From my perspective, **financial literacy** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **income inequality**. On the other hand, challenges remain, especially regarding **consumer culture**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-money---economy-9",
    "part": 3,
    "topic": "Money & Economy",
    "question": "How has digital payment changed the economy?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Financial literacy",
          "vietnamese": "Hiểu biết tài chính"
        },
        {
          "phrase": "Income inequality",
          "vietnamese": "Bất bình đẳng thu nhập"
        },
        {
          "phrase": "Consumer culture",
          "vietnamese": "Văn hóa tiêu dùng"
        },
        {
          "phrase": "Economic recession",
          "vietnamese": "Suy thoái kinh tế"
        },
        {
          "phrase": "Disposable income",
          "vietnamese": "Thu nhập khả dụng"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that money & economy is one of the most pressing issues in modern society. From my perspective, **financial literacy** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **income inequality**. On the other hand, challenges remain, especially regarding **consumer culture**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  },
  {
    "id": "p3-money---economy-10",
    "part": 3,
    "topic": "Money & Economy",
    "question": "Is consumerism a positive or negative trend?",
    "useful_language": {
      "vocabulary_bank": [
        {
          "phrase": "Financial literacy",
          "vietnamese": "Hiểu biết tài chính"
        },
        {
          "phrase": "Income inequality",
          "vietnamese": "Bất bình đẳng thu nhập"
        },
        {
          "phrase": "Consumer culture",
          "vietnamese": "Văn hóa tiêu dùng"
        },
        {
          "phrase": "Economic recession",
          "vietnamese": "Suy thoái kinh tế"
        },
        {
          "phrase": "Disposable income",
          "vietnamese": "Thu nhập khả dụng"
        }
      ],
      "model_structures": [
        "That's an interesting question. I believe that..., mainly because...",
        "From my perspective, the key issue here is..., and this is because...",
        "There are arguments on both sides, but I would lean towards... because..."
      ],
      "brainstorming_ideas": [
        "Present both sides of the argument before stating your opinion.",
        "Use specific examples from your country or personal experience.",
        "Connect your answer to broader global trends or issues."
      ]
    },
    "model_answer": "That's a thought-provoking question. I believe that money & economy is one of the most pressing issues in modern society. From my perspective, **financial literacy** plays a crucial role in shaping how we approach this topic. On one hand, there are those who argue that progress has been significant, particularly in terms of **income inequality**. On the other hand, challenges remain, especially regarding **consumer culture**. Ultimately, I think the key is to strike a balance between innovation and responsibility, ensuring that developments in this area benefit society as a whole."
  }
];

// Export all questions grouped by part
export const speakingPracticeData = {
  part1: part1PracticeQuestions,
  part2: part2PracticeQuestions,
  part3: part3PracticeQuestions,
};

// Get all topics for a given part
export const getTopicsByPart = (part: 1 | 2 | 3): string[] => {
  const questions = speakingPracticeData[`part${part}`];
  return [...new Set(questions.map(q => q.topic))];
};

// Get questions for a given part and optional topic filter
export const getQuestionsByPartAndTopic = (part: 1 | 2 | 3, topic?: string): SpeakingPracticeQuestion[] => {
  const questions = speakingPracticeData[`part${part}`];
  if (!topic) return questions;
  return questions.filter(q => q.topic === topic);
};
