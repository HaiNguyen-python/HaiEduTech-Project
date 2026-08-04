/**
 * AI Academy - extended educational content per track.
 * This sidecar augments the inline TRACKS array in AIAcademy.tsx without
 * touching the existing story / sandbox / quiz data. Keyed by TrackId.
 *
 * Each track gets:
 *  - vietnamCase: A Vietnam-specific real-world story.
 *  - goldenTip:   Signature actionable insight.
 *  - glossary:    5-6 key terms with student-friendly definitions.
 *  - careers:     3-5 related job titles with where they exist.
 *  - homework:    A practical 15-30 minute mini-project to try at home.
 *  - externalDemo: 2-3 free links to play with real AI tools.
 *  - safetyNote:  Optional callout for sensitive tracks (Ethics, Deepfake, Digital Safety).
 */

export type TrackExtra = {
  vietnamCase: { title: string; body: string };
  goldenTip: string;
  glossary: { term: string; def: string }[];
  careers: string[];
  homework: string;
  externalDemo: { label: string; url: string }[];
  safetyNote?: { title: string; body: string };
};

export const TRACK_EXTRAS: Record<string, TrackExtra> = {
  // ============== Lesson 1 - Computer Vision ==============
  vision: {
    vietnamCase: {
      title: "🇻🇳 VinAI Face Recognition at Noi Bai Airport",
      body: "🏢 VinAI Research (part of Vingroup) rolled out a FaceID boarding system at Vietnam's two busiest airports, Noi Bai in Hanoi and Tan Son Nhat in Ho Chi Minh City. ⚡ Passengers scan their face instead of a paper ticket, cutting check-in time from about 4 minutes down to 5 seconds. 🎯 The system reports 99.2% accuracy even when travelers wear face masks, a habit carried over from the COVID-19 years. 🌏 It is one of the largest airport-scale face recognition deployments in Southeast Asia, processing tens of thousands of faces every day.",
    },
    goldenTip:
      "When you train a vision model, don't just collect pretty photos. Deliberately add blurry shots, backlit shots, and images tilted 45 degrees. A model that learns from 'ugly' data becomes robust in the real world - that's the trick behind Tesla's Autopilot handling rain, glare, and night driving.",
    glossary: [
      { term: "Pixel", def: "The smallest dot in a digital image, storing three numbers for red, green, and blue light, each from 0 to 255." },
      { term: "Bounding Box", def: "The rectangle an AI draws around an object it has detected, like a box around a dog's whole body." },
      { term: "Confidence Score", def: "The percentage that tells you how sure the AI is about a specific prediction, like '92% sure this is a cat'." },
      { term: "Convolution", def: "A sliding-filter operation that scans across an image to find patterns such as edges, corners, and textures." },
      { term: "Landmark", def: "A fixed reference point on a face, like the corners of the eyes or the tip of the nose; FaceID systems track over 30,000 of these points." },
    ],
    careers: [
      "Computer Vision Engineer (self-driving car and robotics companies, $90k-$180k)",
      "Medical Imaging AI Specialist (hospitals and health-tech startups)",
      "Autonomous Vehicle Perception Engineer (VinFast, Tesla, Waymo)",
      "AR/VR Developer (Apple Vision Pro, Meta Reality Labs)",
    ],
    homework:
      "Open Google Photos on your phone and search 'cat' or 'beach', even if you never typed those tags. Google has been auto-labeling your photos since around 2015. Count how many results are correct versus wrong, and take a screenshot of your search results plus one wrong match as proof.",
    externalDemo: [
      { label: "Teachable Machine - train your own vision model in 5 minutes", url: "https://teachablemachine.withgoogle.com/" },
      { label: "Quick, Draw! - watch AI guess your hand-drawn sketches", url: "https://quickdraw.withgoogle.com/" },
      { label: "How-Old.net - Microsoft's age-guessing vision demo", url: "https://how-old.net/" },
    ],
  },

  // ============== Lesson 2 - NLP ==============
  nlp: {
    vietnamCase: {
      title: "🇻🇳 Zalo AI Lab and the Kiki Voice Assistant",
      body: "Kiki is a Vietnamese-native voice assistant built by Zalo AI Lab. It understands regional accents from the North, Central, and South of Vietnam, decodes teen slang like 'iu qa' (love it) and 'k bit' (don't know), and even handles dialects from Nghe An and Quang Nam provinces. Built into the VinFast VF8 electric car, Kiki serves more than 10 million users per month and ranks near the top for Vietnamese speech recognition on the VLSP benchmark, a national evaluation for Vietnamese language processing.",
    },
    goldenTip:
      "When chatting with ChatGPT in Vietnamese, add the instruction 'Answer in plain modern Vietnamese, avoid archaic Sino-Vietnamese vocabulary.' Output quality noticeably improves, because the model's default Vietnamese training data leans heavily on formal, old-fashioned Sino-Vietnamese text.",
    glossary: [
      { term: "Token", def: "The smallest chunk of text an AI processes at once, usually a word, part of a word, or a syllable." },
      { term: "Intent", def: "What the user actually wants, such as asking for a price, placing an order, or filing a complaint." },
      { term: "Embedding", def: "A way of turning a word or sentence into a list of numbers (often 768 of them) so a computer can compare meanings." },
      { term: "Sentiment", def: "An analysis of whether a piece of text sounds positive, negative, or neutral." },
      { term: "Named Entity Recognition (NER)", def: "A technique that picks out names of people, places, and dates from a block of text." },
    ],
    careers: [
      "NLP Engineer (FPT.AI, VinBigdata, Zalo AI Lab)",
      "Chatbot Designer (e-commerce and customer service companies)",
      "Conversational AI Product Manager (fintech and telecom apps)",
      "Computational Linguist (research labs and language-tech startups)",
    ],
    homework:
      "Open Google Translate and type the Vietnamese idiom 'an chao da bat' (eat the porridge, kick the bowl - meaning ungrateful). Screenshot the English translation, then ask ChatGPT to explain why the literal translation misses the cultural meaning and how it should really be translated.",
    externalDemo: [
      { label: "Hugging Face Spaces - try 1000+ free NLP models", url: "https://huggingface.co/spaces" },
      { label: "Cohere Playground - experiment with language models", url: "https://dashboard.cohere.com/playground" },
      { label: "Google Translate - test real-time translation quality", url: "https://translate.google.com/" },
    ],
  },

  // ============== Lesson 3 - Neural Networks ==============
  nn: {
    vietnamCase: {
      title: "🇻🇳 VinBigdata's Chest X-ray Diagnosis Model",
      body: "In 2021, VinBigdata published a dataset of 18,000 chest X-rays labeled by 17 specialist doctors. Their CNN (convolutional neural network) learned to detect 14 different lung conditions with 93% accuracy, roughly matching a radiologist with 10 years of experience. The model is now used to assist diagnosis at Vinmec Hospital, helping doctors catch cases faster during busy shifts.",
    },
    goldenTip:
      "Don't try to learn deep learning by memorizing formulas. Open TensorFlow Playground, drag the 'learning rate' slider, and watch the network learn or fail in real time. Thirty minutes of hands-on play teaches you more than three weeks of reading theory.",
    glossary: [
      { term: "Neuron", def: "A tiny calculating unit that takes inputs, multiplies each by a weight, and produces one output number." },
      { term: "Weight", def: "A number the network adjusts while learning; the pattern of weights is essentially where the network's 'knowledge' lives." },
      { term: "Activation Function", def: "A rule that decides whether a neuron 'fires' a signal forward, such as ReLU or Sigmoid." },
      { term: "Backpropagation", def: "The method a network uses to learn from mistakes: it sends the error backward through the layers to adjust weights." },
      { term: "Overfitting", def: "When a model memorizes the training examples so well that it fails on new, unseen data." },
    ],
    careers: [
      "Deep Learning Engineer (tech companies worldwide, $120k-$250k)",
      "Research Scientist (DeepMind, OpenAI, university AI labs)",
      "AI Hardware Engineer (NVIDIA, Cerebras)",
      "Medical AI Researcher (hospital research departments)",
    ],
    homework:
      "Go to playground.tensorflow.org, pick the spiral dataset, add two hidden layers, and crank the learning rate up to 1. Watch what happens to the loss curve. Write down three observations and screenshot the final network graph as proof.",
    externalDemo: [
      { label: "TensorFlow Playground - build a neural net in your browser", url: "https://playground.tensorflow.org/" },
      { label: "CNN Explainer - interactive 3D convolution visualizer", url: "https://poloclub.github.io/cnn-explainer/" },
      { label: "Google Colab - write and run AI code with a free GPU", url: "https://colab.research.google.com/" },
    ],
  },

  // ============== Lesson - Data Detective ==============
  datadet: {
    vietnamCase: {
      title: "🇻🇳 VinAI Collects 1 Million Vietnamese Faces to Fix FaceID Bias",
      body: "📷 In 2018, many Vietnamese users complained that Apple's Face ID recognized them poorly, mainly because the training data was skewed toward lighter-skinned faces. 🇻🇳 VinAI Research responded by building a dataset of over 1 million Vietnamese faces, covering different genders, ages, hairstyles, glasses, and mask-wearing. 🎯 The retrained model reached 99.2% accuracy on Vietnamese faces, a vivid proof that 'data decides how smart an AI really is'.",
    },
    goldenTip:
      "Before training any AI, inspect the data like a detective: what's missing, what's skewed, what's dirty? A great AI engineer spends about 80% of their time cleaning data and only 20% writing algorithm code.",
    glossary: [
      { term: "Dataset", def: "The collection of examples an AI learns from, for instance 10,000 labeled photos of cats." },
      { term: "Feature", def: "A measurable characteristic of one data sample, such as height, color, or age." },
      { term: "Label", def: "The correct answer attached to each training example, like 'cat', 'dog', or 'spam'." },
      { term: "Bias", def: "A systematic skew caused by unbalanced data that makes an AI's predictions unfair to certain groups." },
      { term: "Outlier", def: "An unusual value, like an age of 999, that can drag averages off and confuse a model during training." },
      { term: "Structured vs Unstructured Data", def: "Structured data lives in neat tables (like a spreadsheet), while unstructured data is free-form, like photos, video, or plain text." },
    ],
    careers: [
      "Data Engineer (25-70 million VND/month in Vietnam)",
      "Data Analyst (20-55 million VND/month)",
      "Data Quality Specialist (any company running ML in production)",
      "ML Data Curator (a newer, fast-growing role at AI startups)",
    ],
    homework:
      "Open any spreadsheet you already have at home, like a grade sheet, contact list, or expense tracker. Find three problems: an empty cell, a spelling mistake, or an outlier value. Fix them and write two sentences explaining why clean data leads to better decisions. Screenshot the before and after.",
    externalDemo: [
      { label: "Kaggle Datasets - free public data to explore", url: "https://www.kaggle.com/datasets" },
      { label: "OpenRefine - clean messy data like magic", url: "https://openrefine.org/" },
      { label: "Google Dataset Search", url: "https://datasetsearch.research.google.com/" },
    ],
  },

  // ============== Lesson - ML Magic ==============
  mlmagic: {
    vietnamCase: {
      title: "🇻🇳 Shopee Uses K-Means to Group 50 Million Customers",
      body: "🛍️ Shopee Vietnam has more than 50 million users. The company uses K-Means clustering to group shoppers into personas: students hunting deals under 200,000 VND, young parents buying baby products, office workers buying cosmetics, and more. 🎯 Each group receives different product recommendations, and click-through rates rose by roughly 35% after this segmentation. It's a textbook example of unsupervised learning generating real business value.",
    },
    goldenTip:
      "Use the 5-second rule: look at your data - is there an 'answer column'? If yes, that's Supervised Learning. If no, that's Unsupervised Learning. Don't memorize the definitions; just look at the data.",
    glossary: [
      { term: "Supervised Learning", def: "Training where each example comes with a labeled correct answer for the AI to learn from." },
      { term: "Unsupervised Learning", def: "Training where the data has no labels, so the AI must discover patterns on its own." },
      { term: "Decision Tree", def: "A model that classifies things through a chain of yes-or-no questions, like a flowchart." },
      { term: "Cluster", def: "A group of similar data points that an algorithm has automatically discovered." },
      { term: "K-Means", def: "An algorithm that sorts data into K groups based on how close each point is to a group's center." },
      { term: "Classification", def: "Assigning each example to one category, such as sorting photos into 'cat', 'dog', or 'bird'." },
    ],
    careers: [
      "Machine Learning Engineer (30-80 million VND/month)",
      "Data Scientist (25-60 million VND/month)",
      "MLOps Engineer (companies running ML pipelines at scale)",
      "Quant Analyst (banks and fintech firms)",
    ],
    homework:
      "Open Google Sheets and list 10 classmates with two columns: height and weight. Manually group them into clusters just by eye. How many groups do you see? Screenshot your table with your groups circled - that's literally the K-Means algorithm your brain just ran.",
    externalDemo: [
      { label: "Teachable Machine - train your own classifier in 5 minutes", url: "https://teachablemachine.withgoogle.com/" },
      { label: "MLU-Explain - visual guide to K-Means clustering", url: "https://mlu-explain.github.io/k-means/" },
      { label: "MLU-Explain - interactive decision tree visualizer", url: "https://mlu-explain.github.io/decision-tree/" },
    ],
  },

  // ============== Lesson 4 - Generative AI ==============
  genai: {
    vietnamCase: {
      title: "🇻🇳 PhoGPT - VinAI's Vietnamese Large Language Model",
      body: "In December 2023, VinAI released PhoGPT, one of the first large language models genuinely built and trained for Vietnamese, with 7.5 billion parameters trained on 102GB of clean Vietnamese text including textbooks, news articles, and literature. PhoGPT can write a grade-9 style persuasive essay, translate classical Han-Nom script, and compose lục bát poetry (a traditional Vietnamese verse form) with correct rhyme rules, outperforming GPT-3.5 on Vietnamese-language benchmarks.",
    },
    goldenTip:
      "Use this prompt formula: ROLE + CONTEXT + TASK + CONSTRAINT + FORMAT. Example: 'You are a 9th-grade math tutor [role] for a student who is afraid of geometry [context]. Solve this problem [task] in under 200 words [constraint], presented as bullet points [format].'",
    glossary: [
      { term: "Prompt", def: "The instruction you type to tell a generative AI what to create." },
      { term: "Token (in LLMs)", def: "The billing unit ChatGPT uses to measure text; roughly one token equals 0.75 English words." },
      { term: "Temperature", def: "A setting where 0 makes answers rigid and predictable, and 1 makes them creative and varied." },
      { term: "Hallucination", def: "When an AI confidently invents information that sounds real but isn't true - always double-check facts." },
      { term: "Diffusion Model", def: "The mechanism behind tools like Midjourney and Stable Diffusion: it adds noise to an image, then learns to remove it step by step to create a picture." },
    ],
    careers: [
      "Prompt Engineer ($150k-$300k at leading AI companies)",
      "AI Artist / Creative Director (studios and marketing agencies)",
      "Generative AI Product Designer (app and game studios)",
      "LLM Fine-Tuning Specialist (AI research labs)",
    ],
    homework:
      "Use the free tool Microsoft Designer or Leonardo.ai to write three different prompts for the same idea, 'an astronaut cat'. Compare the three results and screenshot them side by side. Which prompt produced the best image, and why?",
    externalDemo: [
      { label: "Microsoft Designer - free DALL-E 3 image generation", url: "https://designer.microsoft.com/" },
      { label: "Leonardo.ai - about 150 free images per day", url: "https://leonardo.ai/" },
      { label: "Suno - generate a full song from a text prompt", url: "https://suno.com/" },
    ],
  },

  // ============== Lesson 5 - Reinforcement Learning ==============
  rl: {
    vietnamCase: {
      title: "🇻🇳 VinFast VF8 Learns to Drive Inside a Virtual World",
      body: "Before testing on real roads, VinFast trained its self-driving software inside the CARLA simulator: a virtual car drove more than 50 million simulated kilometers through Hanoi-style traffic, complete with weaving motorbikes and blinking yellow lights. Every virtual crash cost -1000 points, and every kilometer driven correctly in-lane earned +1 point. After six months of training, the AI discovered how to dodge motorbikes on its own, without anyone explicitly coding that behavior.",
    },
    goldenTip:
      "The number one trap in reinforcement learning is reward hacking: the agent finds a shortcut to rack up points instead of doing the real task. If you reward 'not crashing' too generously, the AI may simply learn to never move at all. Designing the reward function is harder than writing the algorithm itself.",
    glossary: [
      { term: "Agent", def: "The AI character that is learning, such as a car, a robot, or a game character." },
      { term: "Environment", def: "The world the agent interacts with, like a maze, a street, or a chessboard." },
      { term: "Reward", def: "The score, positive or negative, that the environment gives back after each action." },
      { term: "Policy", def: "The strategy the agent has learned - basically 'in situation X, do Y'." },
      { term: "Q-Learning", def: "A classic algorithm that builds a lookup table mapping each situation to its best known action." },
    ],
    careers: [
      "Robotics Engineer (Boston Dynamics, VinAI)",
      "Game AI Developer (building opponent bots for video games)",
      "Autonomous Vehicle Engineer (self-driving car companies)",
      "Quantitative Trader (applying RL to financial markets)",
    ],
    homework:
      "Run the OpenAI Gym CartPole example in Google Colab (a ready-made 10-line script). Watch the untrained AI drop the pole within a few steps, then watch it balance for 500+ steps after 1000 training rounds. Screenshot the final training score as proof.",
    externalDemo: [
      { label: "AlphaGo the Movie - DeepMind's documentary on beating Lee Sedol", url: "https://www.youtube.com/watch?v=WXuK6gekU1Y" },
      { label: "Gymnasium - the standard RL sandbox from the OpenAI ecosystem", url: "https://gymnasium.farama.org/" },
      { label: "Hugging Face Lunar Lander demo - play an RL agent live in your browser", url: "https://huggingface.co/spaces/ThomasSimonini/Lunar-Lander" },
    ],
  },

  // ============== Lesson 6 - Ethics ==============
  ethics: {
    vietnamCase: {
      title: "🇻🇳 ChatGPT Gets Vietnamese Traffic Law Wrong (2023)",
      body: "Tuoi Tre newspaper reported that ChatGPT confidently claimed 'Vietnam does not require motorbike riders to wear helmets', which directly contradicts the 2008 Road Traffic Law. The root cause: about 95% of OpenAI's training data is in English, so the model guessed at Vietnamese law instead of citing it accurately. The lesson: never fully trust an AI on legal, medical, or financial questions.",
    },
    goldenTip:
      "Ask three golden questions before trusting an AI answer: (1) What year does its training data end? (2) Can it show a verifiable source? (3) Do I have access to a human expert to double-check? Missing even one of these means the answer is just a starting point, not a final decision.",
    glossary: [
      { term: "Bias", def: "Unfair skew in an AI's outputs caused by unbalanced training data, often affecting gender, race, or region." },
      { term: "Fairness", def: "A measure of whether an AI treats different groups equally, often checked with a disparate impact ratio." },
      { term: "Transparency", def: "The ability for an AI to explain why it made a particular decision, sometimes called explainable AI (XAI)." },
      { term: "Privacy", def: "Protection of personal data, governed by laws like the EU's GDPR and Vietnam's Law on Cybersecurity." },
      { term: "Hallucination", def: "An AI stating false information with total confidence - this is a natural side effect of how language models work, not a rare bug." },
    ],
    careers: [
      "AI Ethics Officer (Meta, Google, Microsoft)",
      "AI Policy Researcher (government agencies, EU AI Act working groups)",
      "Responsible AI Product Manager (any company shipping AI features)",
      "AI Auditor (specializing in testing models for bias)",
    ],
    homework:
      "Ask ChatGPT: 'Tell a short story about a doctor and a nurse.' Notice which one it assumes is male and which is female. That's a classic gender bias. Screenshot the response and discuss it with a friend or classmate.",
    externalDemo: [
      { label: "AI Fairness 360 - IBM's open-source bias detection toolkit", url: "https://aif360.res.ibm.com/" },
      { label: "Moral Machine - MIT's self-driving car ethics experiment", url: "https://www.moralmachine.net/" },
      { label: "EU AI Act Explorer - understand Europe's AI law", url: "https://artificialintelligenceact.eu/" },
    ],
    safetyNote: {
      title: "⚠️ If You Encounter Biased or Harmful AI Content in Real Life",
      body: "Report it in three steps: (1) Use the platform's own report button (look for 'AI-generated abuse'). (2) Contact Vietnam's Authority of Information Security at hotline 0339.829.929. (3) Call 113 (police) if criminal fraud is involved. Save a screenshot and the URL before you report anything.",
    },
  },

  // ============== Lesson 7 - Recommender Systems ==============
  recsys: {
    vietnamCase: {
      title: "🇻🇳 TikTok's For You Page - Why Is It So Addictive?",
      body: "TikTok's algorithm measures behavior down to the microsecond: how long you watch a video, how fast you scroll past it, whether you like, share, or comment, and even where your thumb hovers on the screen. Every swipe is a vote that trains the AI. Vietnamese users spend an average of 76 minutes per day on TikTok (2024 data), among the highest in the world - which is why Vietnam's Ministry of Information and Communications is tightening moderation rules and pushing to disable personalized feeds for users under 13.",
    },
    goldenTip:
      "Want to reset your algorithm? Go to Settings, then Activity, then Clear Watch History, and spend three days deliberately watching only new topics (cooking, travel, books). After about a week, your For You Page resets and you break out of the old filter bubble.",
    glossary: [
      { term: "Collaborative Filtering", def: "'People similar to you also liked this' - the approach Netflix relies on heavily." },
      { term: "Content-Based Filtering", def: "Recommending items based on their own features, like Spotify matching songs by melody and tempo." },
      { term: "Cosine Similarity", def: "A math formula that measures how similar two preference vectors are, from 0 (totally different) to 1 (identical)." },
      { term: "Cold Start Problem", def: "The challenge of recommending anything useful to a brand-new user who has no history yet." },
      { term: "Filter Bubble", def: "A narrow information bubble where you only see content that matches views you already hold." },
    ],
    careers: [
      "Recommender Systems Engineer (TikTok, Shopee, Netflix)",
      "Data Scientist for Personalization (streaming and e-commerce platforms)",
      "MLOps Engineer (maintaining recommendation pipelines at scale)",
      "Growth Marketer specializing in data-driven personalization",
    ],
    homework:
      "Open your Spotify Wrapped or recently played list. What are your top 5 genres? Now deliberately search and listen to one opposite genre (jazz if you love rap, classical if you love EDM) for a week. Screenshot your recommendations before and after to see if they shifted.",
    externalDemo: [
      { label: "MovieLens - the legendary open recommender-systems dataset", url: "https://movielens.org/" },
      { label: "Spotify for Developers - explore how music features drive recommendations", url: "https://developer.spotify.com/" },
      { label: "WSJ Investigation - Inside TikTok's Algorithm", url: "https://www.wsj.com/video/series/inside-tiktoks-highly-secretive-algorithm/investigation-how-tiktok-algorithm-figures-out-your-deepest-desires/6C0C2040-FF25-4827-8528-2BD6612E3796" },
    ],
  },

  // ============== Lesson 8 - AIoT ==============
  aiot: {
    vietnamCase: {
      title: "🇻🇳 AI Traffic Lights in Binh Duong",
      body: "In 2023, Binh Duong province deployed 100 AIoT-powered intersections, built by FPT IS in partnership with Viettel: cameras count vehicles in real time and automatically extend the green light for whichever direction has the most traffic. After six months, the project cut average red-light waiting time by 30% and reduced traffic accidents by 18%. The model is now being expanded to Hanoi, Ho Chi Minh City, and Da Nang.",
    },
    goldenTip:
      "When designing an AIoT system, always follow the 'edge-first' rule: run the AI directly on the device (like a Raspberry Pi or NVIDIA Jetson Nano) before sending anything to the cloud. This saves about 90% of bandwidth and cuts latency from around 200ms down to 20ms, which matters enormously for something like a self-driving car.",
    glossary: [
      { term: "IoT (Internet of Things)", def: "A network of everyday physical devices connected to the internet, from thermostats to street cameras." },
      { term: "Edge AI", def: "AI that runs directly on a device, without needing to send data to the internet first." },
      { term: "Sensor Fusion", def: "Combining data from multiple sensors, such as cameras, lidar, and GPS, for a more reliable picture of the world." },
      { term: "MQTT", def: "A lightweight messaging protocol that lets IoT devices 'chat' efficiently with a server." },
      { term: "Digital Twin", def: "A virtual, data-driven replica of a real city, building, or factory used for simulation and testing." },
    ],
    careers: [
      "IoT Engineer (Viettel, FPT, VNPT)",
      "Embedded AI Engineer (hardware and firmware companies)",
      "Smart City Architect (urban planning and infrastructure agencies)",
      "Industrial IoT Consultant (Industry 4.0 manufacturing plants)",
    ],
    homework:
      "Spend one day counting how many IoT devices exist in your home: smart TV, smartwatch, speaker, air conditioner, water purifier, etc. Draw a simple diagram of how they connect. Which device would you most want to make 'smart' next, and why? Photograph your diagram as proof.",
    externalDemo: [
      { label: "Wokwi - simulate ESP32 IoT projects online for free", url: "https://wokwi.com/" },
      { label: "Cisco Packet Tracer - free network and smart-city simulator", url: "https://www.netacad.com/courses/packet-tracer" },
      { label: "Edge Impulse - train a tiny AI model for free and deploy it to a device", url: "https://edgeimpulse.com/" },
    ],
  },

  // ============== Lesson 9 - Capstone (BUILD focus) ==============
  capstone: {
    vietnamCase: {
      title: "🇻🇳 Le Quy Don High School Students Win Intel ISEF with a Forest-Guard AI",
      body: "In 2024, a team of three students from Le Quy Don High School in Da Nang won an Intel ISEF award for 'ForestGuard AI': a drone that autonomously patrols protected forest, using computer vision (Lesson 1) to spot smoke from fires, NLP (Lesson 2) to send alerts through Zalo, and AIoT (Lesson 8) to transmit GPS coordinates to forest rangers. The project combined four core AI technologies into one working system - exactly the spirit of a great capstone project.",
    },
    goldenTip:
      "Ninety percent of students make the same mistake on a capstone: choosing a topic that's too huge, like 'AI that saves the world'. Instead, go small and complete: one specific problem, one real user, one 60-second demo, and one convincing number. A great capstone is an MVP, not a masterpiece.",
    glossary: [
      { term: "MVP (Minimum Viable Product)", def: "The smallest working version of a product that real users can actually try." },
      { term: "Pipeline", def: "The full chain of steps in an AI project: collect data, clean it, train a model, then deploy it." },
      { term: "MLOps", def: "The practice of running machine learning in production, including deployment, monitoring, and retraining." },
      { term: "API", def: "Application Programming Interface - a defined way for two pieces of software to talk to each other." },
      { term: "Integration", def: "Combining several separate AI modules into one product that actually works end to end." },
    ],
    careers: [
      "AI Solutions Architect ($150k-$280k)",
      "Full-Stack AI Engineer (startups and product teams)",
      "Technical Product Manager (AI-driven products)",
      "AI Startup Founder",
    ],
    homework:
      "List three problems at your home or school that AI could help solve, such as counting how many students are in the cafeteria, reminding people to drink water, or sorting recyclables. Pick the smallest one and sketch a simple pipeline: input, then AI, then output. Photograph your sketch.",
    externalDemo: [
      { label: "Lovable - build an AI-powered app just by chatting", url: "https://lovable.dev/" },
      { label: "n8n - drag-and-drop workflow automation", url: "https://n8n.io/" },
      { label: "Make.com - connect over 1500 apps without code", url: "https://www.make.com/" },
    ],
  },

  // ============== Lesson 10 - Deepfake ==============
  deepfake: {
    vietnamCase: {
      title: "🇻🇳 The Fake VTV Anchor Scam (2024)",
      body: "In early 2024, scammers used deepfake technology to superimpose the face of a well-known Vietnamese TV anchor onto a fake forex-trading advertisement posted on Facebook, causing billions of Vietnamese dong in losses among trusting viewers. Hanoi police opened a criminal investigation under Article 174 of the Penal Code. The lesson: even when a video looks 99% real, always verify it against an official, trusted source before believing it.",
    },
    goldenTip:
      "You can often spot a deepfake with the naked eye in five seconds: (1) ask the person in the video to turn their head 90 degrees sideways - most current deepfake AI still struggles with extreme side angles. (2) Look closely at the teeth, which often appear blurry or fused together. (3) Check earrings or glasses for flickering that doesn't match head movement. These three signs catch about 70% of deepfakes.",
    glossary: [
      { term: "Deepfake", def: "A fabricated video or audio clip created by AI, combining the words 'deep learning' and 'fake'." },
      { term: "GAN (Generative Adversarial Network)", def: "A setup where two AI models compete: one generates fake images, the other tries to catch the fakes, until the fakes become nearly perfect." },
      { term: "Face Swap", def: "Replacing one person's face with another person's face throughout a video." },
      { term: "Voice Cloning", def: "Recreating someone's voice convincingly from as little as three seconds of a real audio sample." },
      { term: "Digital Forensics", def: "The science of examining pixel patterns and digital noise to detect whether media has been manipulated." },
    ],
    careers: [
      "Digital Forensics Investigator (police cybercrime units, security firms)",
      "Cybersecurity Analyst specializing in AI-generated threats",
      "Content Moderation AI Specialist (social media platforms)",
      "Trust & Safety Engineer (Meta, TikTok)",
    ],
    homework:
      "Go to MIT's Detect Fakes website, watch 10 short video clips, and guess REAL or FAKE for each. How many did you get right? Write down three visual clues that helped you spot the fakes, and screenshot your final score.",
    externalDemo: [
      { label: "MIT Detect Fakes - test your ability to spot deepfakes", url: "https://detectfakes.kellogg.northwestern.edu/" },
      { label: "Deepware Scanner - upload a video to check for manipulation", url: "https://scanner.deepware.ai/" },
      { label: "Reality Defender - AI-powered deepfake detection company", url: "https://www.realitydefender.com/" },
    ],
    safetyNote: {
      title: "⚠️ If You Are Targeted by a Harmful Deepfake",
      body: "Act immediately: (1) Screenshot the content and save the original URL. (2) Report it on the platform (look for 'impersonation' or 'deepfake' as the reason). (3) File a report with your local police and Vietnam's Authority of Information Security at 0339.829.929. (4) Call the mental health support hotline 1800.1567 if you need to talk to someone. Do NOT re-share it 'as a warning' - that only spreads it further.",
    },
  },

  // ============== Lesson 11 - AI Agent ==============
  agent: {
    vietnamCase: {
      title: "🇻🇳 FPT.AI Agent Powers TPBank's Customer Service",
      body: "TPBank has run an FPT.AI agent since 2023 that resolves about 80% of customer questions, such as checking balances, transferring money, and opening cards, without a human employee. The agent calls 12 banking APIs in parallel and decides on its own when a case needs to be escalated to a real person. It saves the bank an estimated 200 billion VND per year in call-center costs and is considered Vietnam's first production-scale autonomous banking agent.",
    },
    goldenTip:
      "Use the STAR framework when designing agent prompts: Setup (role and context), Tools (list exactly which APIs the agent can call), Action (the specific task), and Result (the exact output format you expect). Skip 'Tools' and the agent will invent tools that don't exist - the number one bug when building agents.",
    glossary: [
      { term: "Agent", def: "An AI system that runs a loop of thinking, taking an action, and observing the result, then repeating." },
      { term: "Tool Use", def: "An agent's ability to call outside functions or APIs, like running a web search or sending an email." },
      { term: "Chain-of-Thought", def: "A technique where an AI writes out its reasoning step by step before giving a final answer." },
      { term: "ReAct (Reasoning + Acting)", def: "A pattern where an agent alternates between thinking through a problem and actually using a tool." },
      { term: "Multi-Agent System", def: "Several AI agents working together on different roles, like one planning, one coding, and one testing." },
    ],
    careers: [
      "AI Agent Engineer (one of the hottest roles going into 2025)",
      "Senior Prompt Engineer",
      "Workflow Automation Specialist (business process consulting)",
      "AI Solutions Consultant",
    ],
    homework:
      "Build a free Zapier workflow: 'Every morning at 7am, grab the top TechCrunch headline, summarize it in 3 lines, and email it to me.' This is the simplest possible agent, and it's genuinely useful for staying up to date on tech trends. Screenshot the finished Zap.",
    externalDemo: [
      { label: "Zapier - no-code agent-style workflows", url: "https://zapier.com/" },
      { label: "AutoGPT - an open-source autonomous agent project", url: "https://github.com/Significant-Gravitas/AutoGPT" },
      { label: "LangChain Hub - over 1000 shared prompt templates", url: "https://smith.langchain.com/hub" },
    ],
  },

  // ============== Lesson 12 - Graduation (PRESENT focus) ==============
  graduation: {
    vietnamCase: {
      title: "🇻🇳 Nguyen Ha Dong and the Flappy Bird Story",
      body: "In 2014, Hanoi-based developer Nguyen Ha Dong launched Flappy Bird and earned roughly $50,000 a day from ads while topping the global App Store charts. The secret wasn't complex code - it was storytelling: one bird, one pipe, one message about pushing through challenges. The lesson for the AI generation: technology is just the vehicle. The story is what actually wins users over.",
    },
    goldenTip:
      "Use Y Combinator's 60-second pitch formula: 'We solve [problem] for [audience] by [solution]. Unlike [competitor], we [unique advantage]. We already have [traction numbers].' Write your own AI project pitch using this exact structure - projects that follow it succeed roughly three times more often.",
    glossary: [
      { term: "Pitch Deck", def: "A short slide presentation (usually 10-15 slides) used to present a product to investors or judges." },
      { term: "Traction", def: "Concrete numbers proving people actually use your product, like daily active users or monthly revenue." },
      { term: "Live Demo", def: "Showing your product working in real time, instead of just describing it with static slides." },
      { term: "Storytelling", def: "Framing your presentation as a narrative instead of a plain list of features." },
      { term: "Personal Brand", def: "Your professional online presence, built through LinkedIn, GitHub, and a personal blog or portfolio." },
    ],
    careers: [
      "AI Product Manager ($140k-$280k)",
      "AI Developer Advocate (developer relations at AI companies)",
      "AI Startup Founder / CEO",
      "Tech Educator or Speaker",
      "AI Journalist or Content Creator",
    ],
    homework:
      "Record a 60-second video introducing your favorite AI app. Structure: a 3-second hook, 10 seconds on the problem, 30 seconds on the AI solution, and a 7-second call to action. Save the video file as proof.",
    externalDemo: [
      { label: "Gamma - generate a slide deck from a text prompt", url: "https://gamma.app/" },
      { label: "Pitch - free collaborative pitch deck tool", url: "https://pitch.com/" },
      { label: "Notion - build a personal portfolio site for free", url: "https://www.notion.so/templates/category/personal-brand" },
    ],
  },

  // ============== Lesson 13 - Study Smart ==============
  study: {
    vietnamCase: {
      title: "🇻🇳 Hanoi-Amsterdam Math Students Use NotebookLM",
      body: "A group of students from the specialized Math program at Hanoi-Amsterdam High School loaded five years of national math exam papers and their full textbook into Google's NotebookLM, which generated flashcards, summaries, and audio podcasts they listened to on the way to school. The result: 18 out of 20 students in the group scored 9 or higher on the 2024 national high school math exam.",
    },
    goldenTip:
      "Follow the 3-step rule: try the problem yourself first, then ask the AI to explain the method (not just give the answer), then verify what it says against your textbook. Skip step one and you lose about 90% of the actual thinking skill you were supposed to build.",
    glossary: [
      { term: "Prompt", def: "The instruction you type to an AI; the more specific it is, the more accurate the answer." },
      { term: "NotebookLM", def: "A Google AI tool that reads your PDFs or documents and generates summaries, flashcards, and podcasts from them." },
      { term: "Hallucination", def: "When an AI makes up information that sounds convincing but is false - always verify it." },
      { term: "Context", def: "The background details you give an AI, like your grade level, subject, and goal, so it can personalize its help." },
    ],
    careers: ["EdTech Product Manager", "AI Tutor Designer", "Education-focused Prompt Engineer", "AI Learning Content Specialist"],
    homework:
      "Open NotebookLM, upload a PDF of your weakest subject's textbook chapter, and ask it to generate 10 flashcards plus a 5-minute podcast. Listen to the podcast on your commute for three days straight and note whether a quiz score improves. Screenshot the generated flashcards.",
    externalDemo: [
      { label: "NotebookLM - an AI tutor that reads your PDFs", url: "https://notebooklm.google.com/" },
      { label: "ChatGPT - general-purpose study assistant", url: "https://chat.openai.com/" },
      { label: "Khanmigo - Khan Academy's AI tutor", url: "https://www.khanmigo.ai/" },
    ],
  },

  // ============== Lesson 14 - Careers Map ==============
  careers: {
    vietnamCase: {
      title: "🇻🇳 VinAI Plans to Hire 500 AI Engineers by 2026",
      body: "VinAI Research announced plans to hire 500 additional AI engineers between 2024 and 2026, with salaries ranging from about 30 million VND per month for juniors up to 150 million VND per month for senior engineers. FPT.AI, Zalo AI Lab, VinBigdata, and MoMo are all hiring aggressively too. Gartner has ranked Vietnam among the top 5 fastest-growing AI markets in Asia.",
    },
    goldenTip:
      "You don't need to be a math genius to work in AI. Prompt Engineer, AI Product Manager, AI UX Designer, and AI Linguist are four hot roles that mainly require sharp thinking, decent English, and genuine curiosity about technology. The most important step is starting small real projects as early as grade 10.",
    glossary: [
      { term: "AI Engineer", def: "Someone who builds and deploys machine learning models, requiring solid Python and math skills." },
      { term: "Prompt Engineer", def: "Someone who designs effective AI instructions for a business, without needing to be a strong programmer." },
      { term: "AI Product Manager", def: "Someone who manages an AI product's direction, blending business sense with technical understanding." },
      { term: "MLOps Engineer", def: "Someone who runs a company's AI infrastructure, needing skills like Docker, Kubernetes, and cloud platforms." },
    ],
    careers: ["AI/ML Engineer (30-80 million VND/month)", "Data Scientist (25-60 million VND/month)", "Prompt Engineer (20-50 million VND/month)", "AI Product Manager (40-100 million VND/month)", "AI UX Designer (20-45 million VND/month)"],
    homework:
      "Search 'AI Engineer Vietnam' on LinkedIn and read 10 job descriptions. Write down the 5 skills that appear most often - that list is essentially your self-study roadmap from now through the end of high school. Screenshot two of the job postings as proof.",
    externalDemo: [
      { label: "VinAI Careers page", url: "https://www.vinai.io/careers/" },
      { label: "FPT.AI Careers page", url: "https://fpt.ai/career" },
      { label: "TopDev - IT jobs board in Vietnam", url: "https://topdev.vn/viec-lam-it/ai-ml" },
    ],
  },

  // ============== Lesson 15 - Fact Check ==============
  factcheck: {
    vietnamCase: {
      title: "🇻🇳 An AI-Fabricated PhD Dissertation Scandal in Hanoi (2024)",
      body: "In 2024, a PhD candidate at a Hanoi university was caught having used ChatGPT to write parts of their dissertation, including 23 citations to books that DO NOT EXIST - the AI had invented them entirely. The case shook the local academic community. The lesson: an AI can fabricate details with 100% apparent confidence, so the user is always responsible for verifying what it produces.",
    },
    goldenTip:
      "Watch for four red flags that an AI is making things up: (1) suspiciously exact numbers, like '2,347,891 people'; (2) citations to obscure or unfamiliar books; (3) a name plus a date plus an achievement that sounds too perfect; (4) unusually specific historical details. If you spot even one, search Google immediately to verify it.",
    glossary: [
      { term: "Hallucination", def: "An AI generating false information that still sounds perfectly reasonable." },
      { term: "Cross-Checking", def: "Verifying a claim using a second independent source, like Wikipedia, a book, or a news article." },
      { term: "Source Citation", def: "Asking an AI to name where its claim came from; if it can't, there's a high chance it's fabricated." },
      { term: "Red Flag", def: "A warning sign in a piece of information that tells you to verify it before trusting it." },
    ],
    careers: ["AI Safety Researcher", "Fact-Checking Journalist", "AI Auditor", "Content Moderation Specialist"],
    homework:
      "Ask ChatGPT five detailed questions about Vietnamese history, each requiring specific names, dates, and numbers. Verify every answer against Vietnamese Wikipedia. Count how many details turn out to be fabricated - the result is usually surprising. Screenshot at least one confirmed hallucination.",
    externalDemo: [
      { label: "Google Scholar - verify academic claims and citations", url: "https://scholar.google.com/" },
      { label: "Snopes - a well-known global fact-checking site", url: "https://www.snopes.com/" },
      { label: "Vietnamese Wikipedia", url: "https://vi.wikipedia.org/" },
    ],
    safetyNote: {
      title: "⚠️ Important Warning",
      body: "Never submit homework or a thesis that is 100% AI-written without checking every citation yourself. Consequences can include expulsion, losing a degree, and lasting damage to your reputation.",
    },
  },

  // ============== Lesson 16 - Digital Safety ==============
  safety: {
    vietnamCase: {
      title: "🇻🇳 AI Voice-Cloning Scams in Ho Chi Minh City (2024)",
      body: "In August 2024, Ho Chi Minh City police recorded 47 scam cases in a single month that used AI-cloned voices impersonating family members, causing over 12 billion VND in total losses. The scammers' method: grab a 3-second audio clip from TikTok or Facebook, clone the voice with AI, then call claiming an emergency and demanding an urgent money transfer. Young people made up about 60% of the victims.",
    },
    goldenTip:
      "Use the golden 3-2-1 rule: pause for 3 seconds if something feels off, verify through 2 separate channels (call back the saved number, or ask a different family member), and tell 1 trusted adult. Apply this to every single request to send money or documents over a phone call or chat message.",
    glossary: [
      { term: "Deepfake Voice", def: "An AI-cloned voice that sounds exactly like a real person, generated from just a few seconds of sample audio." },
      { term: "Two-Channel Verification", def: "Confirming a suspicious request through a second, independent communication channel before trusting it." },
      { term: "Grooming", def: "When an adult manipulates or builds inappropriate trust with a child online in order to exploit or scam them." },
      { term: "Phishing", def: "Tricking someone into giving up personal information through a fake link, message, or website." },
    ],
    careers: ["Cybersecurity Analyst", "Trust & Safety Officer", "Digital Forensics Investigator", "AI Policy Advisor"],
    homework:
      "Check your own TikTok and Facebook profiles and remove any video or voice recording where your voice is clearly audible in public. Ask your parents to set up a secret 'family password' to be used only to verify identity during an emergency call. Screenshot the settings change you made.",
    externalDemo: [
      { label: "Vietnam Authority of Information Security", url: "https://www.ais.gov.vn/" },
      { label: "Report scams at tinnhiemmang.vn", url: "https://tinnhiemmang.vn/" },
      { label: "Google Safety Center for Families", url: "https://safety.google/families/" },
    ],
    safetyNote: {
      title: "🚨 Emergency Numbers to Remember",
      body: "Report a scam: call 113 (police) or the Authority of Information Security at 069.219.6395. If you are threatened online, tell a parent or teacher immediately. Never try to handle it alone.",
    },
  },
};
