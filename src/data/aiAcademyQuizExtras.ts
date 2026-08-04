/**
 * AI Academy - extra quiz banks per track.
 * Adds MultipleChoice + Scenario questions to complement the drag-drop quiz.
 * Keyed by TrackId. Used as "Practice more" extra drills (no double star rewards).
 */
import type { MCQuestion } from "@/components/ai-academy/MultipleChoiceQuiz";
import type { ScenarioQuestion } from "@/components/ai-academy/ScenarioQuiz";

export type QuizExtra = {
  mc: MCQuestion[];
  scenario: ScenarioQuestion[];
};

export const QUIZ_EXTRAS: Record<string, QuizExtra> = {
  // ============== Lesson 1 - Vision ==============
  vision: {
    mc: [
      {
        prompt: "In Computer Vision, what is a 'bounding box'?",
        options: [
          "A container for data in RAM",
          "A folder that stores training images",
          "A rectangular frame the AI draws around an object it recognizes",
          "A special type of camera lens",
        ],
        answer: 2,
        explanation: "A bounding box is the rectangle drawn around a detected object, along with a label and confidence score.",
      },
      {
        prompt: "Why does Tesla need millions of kilometers of real driving data?",
        options: [
          "To make stronger marketing claims",
          "Because the model needs to encounter rare situations (rain, dirty signs, jaywalkers)",
          "Because AI drains battery fast",
          "To download more of Google Maps",
        ],
        answer: 1,
        explanation: "A vision model only performs well when its training data covers diverse situations, including rare and messy ones.",
      },
    ],
    scenario: [
      {
        situation: "Your school installed a FaceID camera for attendance. A student wearing a thick black mask gets flagged as 'not recognized'.",
        prompt: "What should you do?",
        choices: [
          { label: "Force the student to remove the mask during flu season", verdict: "wrong", feedback: "That risks health and safety - it isn't the student's fault the AI failed." },
          { label: "Mark them absent automatically", verdict: "wrong", feedback: "Unfair and incorrect - if the AI is wrong, the student shouldn't be punished." },
          { label: "Ask a teacher to record attendance manually and suggest collecting masked-face photos to retrain the model", verdict: "good", feedback: "Correct process: humans act as a backup, and new data helps the AI improve." },
        ],
      },
    ],
  },

  // ============== Lesson 2 - NLP ==============
  nlp: {
    mc: [
      {
        prompt: "What does tokenization mean?",
        options: [
          "Encrypting a password",
          "Splitting text into small units (words/characters) and assigning them numeric IDs",
          "Translating between languages",
          "Compressing a text file",
        ],
        answer: 1,
        explanation: "AI cannot read text directly - it must convert text into a sequence of numbers (token IDs) before computing anything.",
      },
      {
        prompt: "How should the message 'thx sooo much omg' be handled by a chatbot?",
        options: [
          "Reply instantly with an emoji",
          "Ignore the message and report an error",
          "Delete all informal words before responding",
          "Normalize it to 'thank you so much' before analyzing intent",
        ],
        answer: 3,
        explanation: "Normalizing informal or slang text is a critical step for NLP to correctly understand casual language.",
      },
    ],
    scenario: [
      {
        situation: "You're building a chatbot for a clothing store. A customer messages: 'is there a sale rn pls send link'.",
        prompt: "What intent should the chatbot classify this as?",
        choices: [
          { label: "Intent: 'Greeting'", verdict: "wrong", feedback: "There's no greeting here - this is a request for information." },
          { label: "Intent: 'Ask about promotions' -> return the sale landing page link", verdict: "good", feedback: "Correct - the keywords 'sale' and 'link' clearly signal this intent." },
          { label: "Intent: 'Complaint'", verdict: "wrong", feedback: "There is no sign of dissatisfaction in this message." },
        ],
      },
    ],
  },

  // ============== Lesson - Data Detective ==============
  datadet: {
    mc: [
      {
        prompt: "What does the rule 'Garbage In, Garbage Out' mean?",
        options: [
          "The AI will automatically filter out bad data",
          "The AI only works with trash data",
          "You need a trash bin to store data",
          "Dirty input data leads to unreliable output results",
        ],
        answer: 3,
        explanation: "This is one of the most fundamental rules in machine learning - output quality directly depends on input quality.",
      },
      {
        prompt: "Which of these four values is an 'outlier'?",
        options: [
          "Student age = 14",
          "Student height = 155 cm",
          "Student weight = 500 kg",
          "Math score = 8.5",
        ],
        answer: 2,
        explanation: "500 kg is clearly abnormal, almost certainly a data entry error. Outliers skew averages and cause the AI to learn incorrect patterns.",
      },
    ],
    scenario: [
      {
        situation: "You're building an AI to predict exam scores from study hours. You have 100 rows of data, but 20 rows have a blank 'study hours' column.",
        prompt: "What should you do?",
        choices: [
          { label: "Just train the model as is, the AI will figure it out", verdict: "wrong", feedback: "AI cannot guess missing values - it will learn incorrectly and make bad predictions." },
          { label: "Fill in all blanks with 0", verdict: "wrong", feedback: "Incorrect - setting missing values to 0 creates bias, since 0 study hours doesn't reflect reality." },
          { label: "Remove the 20 incomplete rows or fill them with the average value, then train", verdict: "good", feedback: "Correct - these are the two most common ways to handle missing data." },
        ],
      },
    ],
  },

  // ============== Lesson - ML Made Simple ==============
  mlmagic: {
    mc: [
      {
        prompt: "When an AI groups Shopee customers into clusters without anyone labeling them, what type of learning is this?",
        options: [
          "Supervised Learning",
          "Reinforcement Learning",
          "Unsupervised Learning",
          "Deep Learning",
        ],
        answer: 2,
        explanation: "No labels are provided, so this is Unsupervised Learning. K-Means is a classic algorithm used for this task.",
      },
      {
        prompt: "What is the biggest advantage of a Decision Tree compared to a Neural Network?",
        options: [
          "It runs 1000 times faster",
          "It never needs any data",
          "It always gives 100% correct results",
          "It's easy to interpret - you can see each question the AI is asking",
        ],
        answer: 3,
        explanation: "A Decision Tree is a 'white-box' model - its logic is visible. Neural Networks are 'black-box' and harder to interpret.",
      },
    ],
    scenario: [
      {
        situation: "Your school wants AI to recommend clubs to students. Option (A): ask 100 students which club they already picked to use as labels. Option (B): don't ask, let the AI group students by interests on its own.",
        prompt: "Which option is Supervised, and which is Unsupervised?",
        choices: [
          { label: "Both are Supervised", verdict: "wrong", feedback: "Incorrect - only (A) has labels." },
          { label: "(A) is Unsupervised, (B) is Supervised", verdict: "wrong", feedback: "That's reversed - having labels is what makes it Supervised." },
          { label: "(A) is Supervised, (B) is Unsupervised", verdict: "good", feedback: "Correct! (A) has the label 'chosen club' to learn from, while (B) has no labels so the AI must group students on its own." },
        ],
      },
    ],
  },

  // ============== Lesson 3 - Neural Network ==============
  nn: {
    mc: [
      {
        prompt: "A 'weight' in a neural network is most similar to what?",
        options: [
          "The physical weight of a server",
          "How important each input is when making a decision",
          "The speed of the wifi connection",
          "The number of layers in the network",
        ],
        answer: 1,
        explanation: "A weight determines how much each input signal influences the final output.",
      },
      {
        prompt: "How does a neural network 'learn' during training?",
        options: [
          "It invents answers on its own",
          "It downloads answers from the internet",
          "It waits for a human to type in the answers",
          "It gradually adjusts weights to reduce error (backpropagation)",
        ],
        answer: 3,
        explanation: "Every time the model predicts wrong, it nudges its weights slightly - repeated millions of times.",
      },
    ],
    scenario: [
      {
        situation: "You train a house price prediction model. After 100 epochs, accuracy is 99% on the training set but only 60% on new data.",
        prompt: "What is this phenomenon called and how do you fix it?",
        choices: [
          { label: "Underfitting - train for 1000 more epochs", verdict: "wrong", feedback: "That's backwards - training more would only make overfitting worse." },
          { label: "This is normal, deploy it as is", verdict: "wrong", feedback: "A 39% gap is a dangerous sign - the model will fail in the real world." },
          { label: "Overfitting - add more data or use regularization/dropout", verdict: "good", feedback: "Correct! The model memorized the training set instead of learning the underlying pattern." },
        ],
      },
    ],
  },

  // ============== Lesson 4 - Generative AI ==============
  genai: {
    mc: [
      {
        prompt: "Why does ChatGPT sometimes 'make up' wrong information while sounding very confident?",
        options: [
          "Because it's intentionally lying",
          "Because the internet is down",
          "Because Vietnamese is a hard language",
          "Because it predicts the next word based on probability, not by checking facts",
        ],
        answer: 3,
        explanation: "This is called 'hallucination' - the model generates fluent text but has no built-in mechanism to verify facts.",
      },
      {
        prompt: "What is prompt engineering?",
        options: [
          "Learning C++ programming",
          "Fixing bugs in ChatGPT",
          "Creating logos with AI",
          "The skill of writing input instructions so an LLM responds better",
        ],
        answer: 3,
        explanation: "With the same model, a well-crafted prompt can produce far better results than a poorly written one.",
      },
    ],
    scenario: [
      {
        situation: "You ask ChatGPT to write an essay about a historical figure. It states they were born in 1820, but the real birth year is 1765.",
        prompt: "What should you do?",
        choices: [
          { label: "Trust it and submit the essay as is", verdict: "wrong", feedback: "You'll lose points - LLMs can invent incorrect dates." },
          { label: "Ask it the same question 5 times until it repeats the same answer", verdict: "risky", feedback: "A model can confidently repeat the same wrong answer - you still need to check an outside source." },
          { label: "Cross-check the fact against a textbook or reliable source before using it", verdict: "good", feedback: "Correct - always fact-check, especially for historical dates and figures." },
        ],
      },
    ],
  },

  // ============== Lesson 5 - Reinforcement Learning ==============
  rl: {
    mc: [
      {
        prompt: "What does Reinforcement Learning learn from?",
        options: [
          "Textbooks",
          "Labeled images",
          "A survey questionnaire",
          "Rewards and penalties received after each action",
        ],
        answer: 3,
        explanation: "The agent learns by trial and error - good actions earn +points, bad actions earn -points, learning from experience.",
      },
      {
        prompt: "What was the main technique behind AlphaGo defeating the world Go champion in 2016?",
        options: [
          "Memorizing 100 of the champion's past games",
          "Searching Google for answers",
          "Brute-force calculating every possible move",
          "Reinforcement Learning plus self-play (playing against itself millions of times)",
        ],
        answer: 3,
        explanation: "AlphaGo Zero played against itself for 40 days straight, without needing any human game data.",
      },
    ],
    scenario: [
      {
        situation: "You train an AI to play Mario, giving +1 point for every second it survives. After a week of training, the AI just stands still in one spot.",
        prompt: "Why did this happen, and how do you fix it?",
        choices: [
          { label: "The AI is broken, reinstall it", verdict: "wrong", feedback: "The AI is behaving exactly as the reward told it to - the problem is the reward design." },
          { label: "Increase the computer's processing speed", verdict: "wrong", feedback: "Not relevant - the issue is the logic of the reward, not the hardware performance." },
          { label: "The reward design is flawed - add +10 for moving right and +100 for completing a level", verdict: "good", feedback: "Correct! Standing still maximizes survival time under this reward, so the reward must match the actual goal." },
        ],
      },
    ],
  },

  // ============== Lesson 6 - Ethics ==============
  ethics: {
    mc: [
      {
        prompt: "Where does bias in AI usually come from?",
        options: [
          "GPU hardware",
          "Programmers intentionally inserting it",
          "Internet connection errors",
          "Training data that is not balanced (underrepresenting women, minorities, low-income groups, etc.)",
        ],
        answer: 3,
        explanation: "Garbage in, garbage out - a model faithfully reflects the biases present in its training data.",
      },
      {
        prompt: "What does GDPR (the EU's data protection law) allow users to do?",
        options: [
          "Sell their own data",
          "Copy AI software for free",
          "Sue any AI company in court",
          "Request a company delete all of their personal data ('right to be forgotten')",
        ],
        answer: 3,
        explanation: "The right to be forgotten is a core protection under GDPR and similar data protection laws.",
      },
    ],
    scenario: [
      {
        situation: "You discover an app that claims to score a student's IQ by analyzing their facial features, then sends the results to parents.",
        prompt: "Is this an ethical problem?",
        choices: [
          { label: "No - it's fine if the AI's claims turn out correct", verdict: "wrong", feedback: "What the AI 'says' doesn't matter if there's no scientific basis behind it." },
          { label: "It depends - it's fine as long as the app charges a fee", verdict: "wrong", feedback: "Charging money doesn't make a pseudoscientific scam legitimate." },
          { label: "Yes - this is pseudoscience that can harm a child's confidence and enable discrimination", verdict: "good", feedback: "Correct! There is no scientific basis linking facial features to IQ. This should be reported." },
        ],
      },
    ],
  },

  // ============== Lesson 7 - Recommender System ==============
  recsys: {
    mc: [
      {
        prompt: "Why is TikTok so 'addictive'?",
        options: [
          "Because videos are short",
          "Because the music is catchy",
          "Because the screen is in portrait mode",
          "Because its recommendation algorithm rapidly learns personal interests from every second of watch time",
        ],
        answer: 3,
        explanation: "TikTok optimizes for watch time (dwell time) - one of the strongest feedback signals in recommender systems.",
      },
      {
        prompt: "What does 'filter bubble' mean?",
        options: [
          "A literal soap bubble",
          "An Instagram photo filter",
          "An ad-blocking feature",
          "Only seeing content that matches your existing views, making it harder to encounter different opinions",
        ],
        answer: 3,
        explanation: "The more personalized a recommender system becomes, the more likely it is to create a 'bubble' - a major concern with modern social media.",
      },
    ],
    scenario: [
      {
        situation: "YouTube keeps recommending fake-science conspiracy videos to your younger sibling in 7th grade, for an entire week straight.",
        prompt: "What should you do?",
        choices: [
          { label: "Leave it alone, they'll eventually get bored", verdict: "risky", feedback: "The more the algorithm recommends it, the more they watch - creating a harmful feedback loop." },
          { label: "Ban them from using YouTube entirely", verdict: "risky", feedback: "That's an extreme response - it's better to teach them to use it mindfully." },
          { label: "Go into watch history, remove those videos, and click 'Not interested' plus 'Don't recommend channel'", verdict: "good", feedback: "Correct - this is the most effective way to 'retrain' the recommendation algorithm." },
        ],
      },
    ],
  },

  // ============== Lesson 8 - AIoT ==============
  aiot: {
    mc: [
      {
        prompt: "What does AIoT stand for?",
        options: [
          "AI on Tablet",
          "All-In-One Toolkit",
          "Auto Internet of Things",
          "Artificial Intelligence of Things - AI running directly on IoT devices",
        ],
        answer: 3,
        explanation: "AIoT = AI + IoT - placing an AI model on a small device (camera, watch, sensor) so it can process data on the spot.",
      },
      {
        prompt: "What is the advantage of edge computing compared to sending everything to the cloud?",
        options: [
          "It drains more battery",
          "It costs more money",
          "It requires a 5G connection",
          "It responds within milliseconds, protects privacy, and still works without internet access",
        ],
        answer: 3,
        explanation: "Edge computing processes data directly on the device - no waiting for a server, no data leakage, no dependency on a network connection.",
      },
    ],
    scenario: [
      {
        situation: "A school installs an AI camera to count students in the cafeteria and warn about overcrowding. The camera streams raw video to the cloud for processing.",
        prompt: "What is the problem with this setup?",
        choices: [
          { label: "No problem, the cloud is secure enough", verdict: "risky", feedback: "Cloud services can be hacked, and streaming students' faces 24/7 is a serious risk." },
          { label: "As long as the camera hardware is good quality, it's fine", verdict: "wrong", feedback: "The problem is the system architecture, not the camera's quality." },
          { label: "It violates privacy and wastes bandwidth - the AI should run directly on the camera (edge) and only send the count number", verdict: "good", feedback: "Exactly right! True AIoT processes data at the edge instead of streaming raw video." },
        ],
      },
    ],
  },

  // ============== Lesson 9 - Capstone ==============
  capstone: {
    mc: [
      {
        prompt: "What is MLOps?",
        options: [
          "A type of GPU",
          "Charting software",
          "A Python library",
          "The process of taking an AI model from the lab into production: deploying, monitoring, and retraining it",
        ],
        answer: 3,
        explanation: "MLOps is DevOps for machine learning - without it, a model 'dies' shortly after launch due to data drift.",
      },
      {
        prompt: "Why must a model be monitored continuously after deployment?",
        options: [
          "Out of fear of hackers",
          "Because phones tend to overheat",
          "Because it's legally required",
          "Because real-world data changes over time (data drift), causing accuracy to gradually decline",
        ],
        answer: 3,
        explanation: "For example, a shopping-behavior model trained in 2019 would perform poorly after COVID-19. Periodic retraining is required.",
      },
    ],
    scenario: [
      {
        situation: "Your team builds an admissions advice chatbot that scores 100% accuracy in the demo. Three months later, students complain the chatbot gives wrong answers about the new curriculum.",
        prompt: "What is the main cause of this problem?",
        choices: [
          { label: "The chatbot got infected with a virus", verdict: "wrong", feedback: "Not related to this situation at all." },
          { label: "Students are phrasing their questions strangely", verdict: "risky", feedback: "That could be a factor, but the main cause is still outdated content." },
          { label: "The admissions program changed - the knowledge base needs updating and the model needs retraining", verdict: "good", feedback: "Correct - this is a classic case of data drift." },
        ],
      },
    ],
  },

  // ============== Lesson 10 - Deepfake ==============
  deepfake: {
    mc: [
      {
        prompt: "What AI technique is used to create deepfakes?",
        options: [
          "Advanced Photoshop editing",
          "Manual video splicing",
          "An Instagram filter",
          "GAN (Generative Adversarial Network) or diffusion models",
        ],
        answer: 3,
        explanation: "A GAN consists of two competing models: one generates fakes, the other detects fakes, until the fakes look real.",
      },
      {
        prompt: "What is the most common way to spot a deepfake video?",
        options: [
          "Looking at the logo in the corner",
          "Counting pixels",
          "Asking YouTube's support team",
          "Watching for unnatural blinking, uneven skin lighting, and mismatched lip-sync",
        ],
        answer: 3,
        explanation: "Current deepfakes still struggle with fine details like teeth, ears, flowing hair, and shadows on the neck.",
      },
    ],
    scenario: [
      {
        situation: "You receive a video call that looks and sounds exactly like your mom, urgently asking you to transfer a large sum of money because she's 'in an emergency'.",
        prompt: "What should you do?",
        choices: [
          { label: "Transfer the money right away out of fear something happened to her", verdict: "wrong", feedback: "This is exactly the deepfake scam pattern - victims have lost huge sums of money this way." },
          { label: "Post about it on social media asking for advice", verdict: "risky", feedback: "That wastes precious time - you need to verify directly with the family member right away." },
          { label: "Hang up, call your mom back on her SAVED number, and ask a question only she would know", verdict: "good", feedback: "Correct! This is currently the most effective way to defend against a deepfake scam." },
        ],
      },
    ],
  },

  // ============== Lesson 11 - Agent / Workflow ==============
  agent: {
    mc: [
      {
        prompt: "How is an AI Agent different from a traditional chatbot?",
        options: [
          "It looks nicer",
          "It runs faster",
          "It's free to use",
          "It can plan multiple steps on its own and call tools to carry them out",
        ],
        answer: 3,
        explanation: "An agent = LLM + planning + tools (web search, code execution, email, etc.) - it can complete complex tasks on its own.",
      },
      {
        prompt: "In an agent workflow, what does 'tool calling' mean?",
        options: [
          "Making a phone call",
          "Buying a tool on an online store",
          "Downloading an app",
          "The LLM deciding on its own when and which tool to use (search, code, an API, etc.) and passing it the right parameters",
        ],
        answer: 3,
        explanation: "Tool calling extends an LLM's abilities beyond 'talking' into actually 'doing work'.",
      },
    ],
    scenario: [
      {
        situation: "You build an agent that books flights automatically. A customer says 'book the cheapest flight from Hanoi to Ho Chi Minh City next week'. The agent books it immediately without confirming anything.",
        prompt: "What is the problem here?",
        choices: [
          { label: "The agent runs too slowly", verdict: "wrong", feedback: "This isn't the main issue in this situation." },
          { label: "The customer should just book it themselves instead", verdict: "risky", feedback: "The goal is automation, but there still needs to be a checkpoint." },
          { label: "It's missing a human-in-the-loop confirmation step before taking an irreversible action", verdict: "good", feedback: "Correct - an agent handling big decisions should always confirm before taking an action that can't be undone." },
        ],
      },
    ],
  },

  // ============== Lesson 12 - Graduation ==============
  graduation: {
    mc: [
      {
        prompt: "During a 60-second AI project pitch, what's the most important thing to say first?",
        options: [
          "Your team's name",
          "The technology you used",
          "The price of your product",
          "The problem you're solving and why it matters (the problem statement)",
        ],
        answer: 3,
        explanation: "Investors and judges care about the 'why' before the 'how'. Without a real problem, no one needs your solution.",
      },
      {
        prompt: "Which of these is NOT a typical AI-related job?",
        options: [
          "Prompt Engineer",
          "ML Engineer",
          "AI Ethicist",
          "Motorcycle mechanic (no AI involved)",
        ],
        answer: 3,
        explanation: "The first three roles are all highly in-demand jobs in the AI industry.",
      },
    ],
    scenario: [
      {
        situation: "You're pitching your 'automatic essay grading AI' project to a panel of judges. One judge asks: 'What if the AI unfairly grades a student wrong?'",
        prompt: "How should you respond?",
        choices: [
          { label: "Modern AI never makes mistakes", verdict: "wrong", feedback: "That destroys your credibility instantly - every AI system can make mistakes." },
          { label: "That's a problem for the school to deal with", verdict: "wrong", feedback: "Dodging responsibility like this will fail the pitch." },
          { label: "Explain a human-in-the-loop process: the AI does an initial grading pass, and teachers review borderline or low scores", verdict: "good", feedback: "Great answer! It shows you understand the risk and have designed a way to reduce it." },
        ],
      },
    ],
  },
};
