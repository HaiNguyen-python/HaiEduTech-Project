/**
 * @file cambridgeReadingSets.ts
 * @description Reading texts (with comprehension questions) authored for the 25
 *              original Cambridge papers, which shipped as standalone items with
 *              no reading text. Level-appropriate length: Starters ~40 words up
 *              to PET ~180 words. Every question has a bilingual explanation.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
export interface CambridgeReadingSetQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  explanationVi: string;
}

export interface CambridgeReadingSet {
  passage: string;
  questions: CambridgeReadingSetQuestion[];
}

export const CAMBRIDGE_READING_SETS: Record<string, CambridgeReadingSet[]> =
{
  "cambridge-starters-1": [
    {
      "passage": "My cat is black and white. She likes to play with a red ball. She sleeps on my bed at night. My dog is brown. He likes to run in the garden with my cat every day.",
      "questions": [
        {
          "question": "What colour is the cat?",
          "options": [
            "Black and white",
            "Brown",
            "Red",
            "Yellow"
          ],
          "correctAnswer": 0,
          "explanation": "The text says the cat is black and white, so this is the correct colour.",
          "explanationVi": "Đáp án đúng là \"Black and white\". Thông tin này được nêu trực tiếp trong bài đọc."
        },
        {
          "question": "What does the cat like to play with?",
          "options": [
            "A red ball",
            "A brown dog",
            "A garden",
            "A bed"
          ],
          "correctAnswer": 0,
          "explanation": "The passage states the cat likes to play with a red ball.",
          "explanationVi": "Chọn \"A red ball\" vì bài đọc nói rõ chi tiết này."
        },
        {
          "question": "Where does the cat sleep?",
          "options": [
            "On the bed",
            "In the garden",
            "Under the table",
            "On the ball"
          ],
          "correctAnswer": 0,
          "explanation": "The text says she sleeps on my bed at night.",
          "explanationVi": "Bài đọc cho biết đáp án là \"On the bed\", các phương án còn lại không khớp với văn bản."
        },
        {
          "question": "What colour is the dog?",
          "options": [
            "Brown",
            "Black",
            "White",
            "Red"
          ],
          "correctAnswer": 0,
          "explanation": "The passage clearly says my dog is brown.",
          "explanationVi": "Dựa vào thông tin trong bài, \"Brown\" là câu trả lời chính xác."
        }
      ]
    },
    {
      "passage": "I have two pets, a rabbit and a bird. The rabbit is white and small. It eats carrots every day. The bird is yellow. It can sing nice songs in the morning.",
      "questions": [
        {
          "question": "How many pets are there?",
          "options": [
            "Three",
            "One",
            "Two",
            "Four"
          ],
          "correctAnswer": 2,
          "explanation": "The writer says I have two pets, a rabbit and a bird.",
          "explanationVi": "Câu trả lời đúng: \"Two\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        },
        {
          "question": "What colour is the rabbit?",
          "options": [
            "Yellow",
            "White",
            "Brown",
            "Black"
          ],
          "correctAnswer": 1,
          "explanation": "The text says the rabbit is white and small.",
          "explanationVi": "Đáp án đúng là \"White\". Thông tin này được nêu trực tiếp trong bài đọc."
        },
        {
          "question": "What does the rabbit eat?",
          "options": [
            "Bread",
            "Fish",
            "Carrots",
            "Rice"
          ],
          "correctAnswer": 2,
          "explanation": "The passage says it eats carrots every day.",
          "explanationVi": "Chọn \"Carrots\" vì bài đọc nói rõ chi tiết này."
        },
        {
          "question": "When does the bird sing?",
          "options": [
            "At night",
            "In the morning",
            "At lunchtime",
            "On Monday"
          ],
          "correctAnswer": 1,
          "explanation": "The text says it can sing nice songs in the morning.",
          "explanationVi": "Bài đọc cho biết đáp án là \"In the morning\", các phương án còn lại không khớp với văn bản."
        }
      ]
    }
  ],
  "cambridge-starters-2": [
    {
      "passage": "This is my family. My mum makes pizza on Sunday. My dad likes apples. My brother eats rice every day. I like ice cream, but my sister only likes milk.",
      "questions": [
        {
          "question": "What does mum make on Sunday?",
          "options": [
            "Rice",
            "Pizza",
            "Ice cream",
            "Milk"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says my mum makes pizza on Sunday.",
          "explanationVi": "Dựa vào thông tin trong bài, \"Pizza\" là câu trả lời chính xác."
        },
        {
          "question": "What does dad like?",
          "options": [
            "Apples",
            "Rice",
            "Ice cream",
            "Pizza"
          ],
          "correctAnswer": 0,
          "explanation": "The text states my dad likes apples.",
          "explanationVi": "Câu trả lời đúng: \"Apples\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        },
        {
          "question": "What does the brother eat every day?",
          "options": [
            "Pizza",
            "Apples",
            "Rice",
            "Milk"
          ],
          "correctAnswer": 2,
          "explanation": "The passage says my brother eats rice every day.",
          "explanationVi": "Đáp án đúng là \"Rice\". Thông tin này được nêu trực tiếp trong bài đọc."
        },
        {
          "question": "What does the sister like?",
          "options": [
            "Ice cream",
            "Milk",
            "Apples",
            "Pizza"
          ],
          "correctAnswer": 1,
          "explanation": "The text says my sister only likes milk.",
          "explanationVi": "Chọn \"Milk\" vì bài đọc nói rõ chi tiết này."
        }
      ]
    },
    {
      "passage": "Today we have lunch at school. There is soup, bread and fruit. I like the orange best. My friend Tom likes the banana. We drink water after we eat our food.",
      "questions": [
        {
          "question": "Where do they have lunch?",
          "options": [
            "At home",
            "At school",
            "At a shop",
            "In a park"
          ],
          "correctAnswer": 1,
          "explanation": "The text says today we have lunch at school.",
          "explanationVi": "Bài đọc cho biết đáp án là \"At school\", các phương án còn lại không khớp với văn bản."
        },
        {
          "question": "What fruit does the writer like best?",
          "options": [
            "Banana",
            "Apple",
            "Orange",
            "Grape"
          ],
          "correctAnswer": 2,
          "explanation": "The passage says I like the orange best.",
          "explanationVi": "Dựa vào thông tin trong bài, \"Orange\" là câu trả lời chính xác."
        },
        {
          "question": "What does Tom like?",
          "options": [
            "The orange",
            "The soup",
            "The bread",
            "The banana"
          ],
          "correctAnswer": 3,
          "explanation": "The text states my friend Tom likes the banana.",
          "explanationVi": "Câu trả lời đúng: \"The banana\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        },
        {
          "question": "What do they drink after eating?",
          "options": [
            "Milk",
            "Juice",
            "Water",
            "Tea"
          ],
          "correctAnswer": 2,
          "explanation": "The passage says we drink water after we eat our food.",
          "explanationVi": "Đáp án đúng là \"Water\". Thông tin này được nêu trực tiếp trong bài đọc."
        }
      ]
    }
  ],
  "cambridge-starters-3": [
    {
      "passage": "It is cold today. The wind is strong and it is snowing. I wear my blue coat and warm hat. My little sister plays with her new toy car in the house.",
      "questions": [
        {
          "question": "What is the weather like today?",
          "options": [
            "Hot",
            "Sunny",
            "Cold",
            "Windy only"
          ],
          "correctAnswer": 2,
          "explanation": "The passage says it is cold today and it is snowing.",
          "explanationVi": "Chọn \"Cold\" vì bài đọc nói rõ chi tiết này."
        },
        {
          "question": "What colour is the coat?",
          "options": [
            "Red",
            "Blue",
            "Green",
            "Yellow"
          ],
          "correctAnswer": 1,
          "explanation": "The text says I wear my blue coat.",
          "explanationVi": "Bài đọc cho biết đáp án là \"Blue\", các phương án còn lại không khớp với văn bản."
        },
        {
          "question": "What does the sister play with?",
          "options": [
            "A doll",
            "A ball",
            "A toy car",
            "A book"
          ],
          "correctAnswer": 2,
          "explanation": "The passage states my little sister plays with her new toy car.",
          "explanationVi": "Dựa vào thông tin trong bài, \"A toy car\" là câu trả lời chính xác."
        },
        {
          "question": "Where does the sister play?",
          "options": [
            "Outside",
            "In the house",
            "In the car",
            "At school"
          ],
          "correctAnswer": 1,
          "explanation": "The text says she plays with her toy car in the house.",
          "explanationVi": "Câu trả lời đúng: \"In the house\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        }
      ]
    },
    {
      "passage": "Look at my toy box! I have a teddy bear, a train and three balls. My favourite toy is the train because it can go very fast around the room.",
      "questions": [
        {
          "question": "How many balls are there?",
          "options": [
            "Two",
            "Three",
            "Four",
            "One"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says I have a teddy bear, a train and three balls.",
          "explanationVi": "Đáp án đúng là \"Three\". Thông tin này được nêu trực tiếp trong bài đọc."
        },
        {
          "question": "What is the favourite toy?",
          "options": [
            "Teddy bear",
            "Ball",
            "Train",
            "Box"
          ],
          "correctAnswer": 2,
          "explanation": "The text says my favourite toy is the train.",
          "explanationVi": "Chọn \"Train\" vì bài đọc nói rõ chi tiết này."
        },
        {
          "question": "Why does the writer like the train?",
          "options": [
            "It is soft",
            "It can go very fast",
            "It is small",
            "It is blue"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says it can go very fast around the room.",
          "explanationVi": "Bài đọc cho biết đáp án là \"It can go very fast\", các phương án còn lại không khớp với văn bản."
        },
        {
          "question": "Where is the train?",
          "options": [
            "In a box",
            "At school",
            "In the garden",
            "On the bed"
          ],
          "correctAnswer": 0,
          "explanation": "The text says look at my toy box, showing the train is in the toy box.",
          "explanationVi": "Dựa vào thông tin trong bài, \"In a box\" là câu trả lời chính xác."
        }
      ]
    }
  ],
  "cambridge-starters-4": [
    {
      "passage": "Our house has a big garden. There is a tree, some flowers and a small pond. My grandma grows tomatoes there. I like to help her water the plants every evening.",
      "questions": [
        {
          "question": "What is in the garden?",
          "options": [
            "A tree, flowers and a pond",
            "Only a tree",
            "A car",
            "A shop"
          ],
          "correctAnswer": 0,
          "explanation": "The passage lists a tree, some flowers and a small pond in the garden.",
          "explanationVi": "Câu trả lời đúng: \"A tree, flowers and a pond\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        },
        {
          "question": "What does grandma grow?",
          "options": [
            "Flowers",
            "Tomatoes",
            "Apples",
            "Rice"
          ],
          "correctAnswer": 1,
          "explanation": "The text says my grandma grows tomatoes there.",
          "explanationVi": "Đáp án đúng là \"Tomatoes\". Thông tin này được nêu trực tiếp trong bài đọc."
        },
        {
          "question": "What does the writer help with?",
          "options": [
            "Cooking",
            "Cleaning",
            "Watering the plants",
            "Reading books"
          ],
          "correctAnswer": 2,
          "explanation": "The passage says I like to help her water the plants.",
          "explanationVi": "Chọn \"Watering the plants\" vì bài đọc nói rõ chi tiết này."
        },
        {
          "question": "When do they water the plants?",
          "options": [
            "In the morning",
            "At lunch",
            "Every evening",
            "On Sundays only"
          ],
          "correctAnswer": 2,
          "explanation": "The text says every evening they water the plants.",
          "explanationVi": "Bài đọc cho biết đáp án là \"Every evening\", các phương án còn lại không khớp với văn bản."
        }
      ]
    },
    {
      "passage": "This is my bedroom. I have a blue bed and a small desk. On the desk there is a lamp and some books. My favourite book is about a funny dog.",
      "questions": [
        {
          "question": "What colour is the bed?",
          "options": [
            "Red",
            "Blue",
            "Green",
            "White"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says I have a blue bed.",
          "explanationVi": "Dựa vào thông tin trong bài, \"Blue\" là câu trả lời chính xác."
        },
        {
          "question": "What is on the desk?",
          "options": [
            "A lamp and some books",
            "A ball",
            "A hat",
            "A cat"
          ],
          "correctAnswer": 0,
          "explanation": "The text states on the desk there is a lamp and some books.",
          "explanationVi": "Câu trả lời đúng: \"A lamp and some books\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        },
        {
          "question": "What is the favourite book about?",
          "options": [
            "A cat",
            "A funny dog",
            "A car",
            "A flower"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says my favourite book is about a funny dog.",
          "explanationVi": "Đáp án đúng là \"A funny dog\". Thông tin này được nêu trực tiếp trong bài đọc."
        },
        {
          "question": "Whose bedroom is it?",
          "options": [
            "The writer's",
            "Grandma's",
            "A friend's",
            "The dog's"
          ],
          "correctAnswer": 0,
          "explanation": "The text says this is my bedroom, meaning it belongs to the writer.",
          "explanationVi": "Chọn \"The writer's\" vì bài đọc nói rõ chi tiết này."
        }
      ]
    }
  ],
  "cambridge-starters-5": [
    {
      "passage": "I can count! One, two, three red apples. Four, five yellow bananas. My favourite colour is purple, but I do not have any purple fruit today, only green grapes.",
      "questions": [
        {
          "question": "How many apples are there?",
          "options": [
            "Two",
            "Three",
            "Four",
            "Five"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says one, two, three red apples, so there are three.",
          "explanationVi": "Bài đọc cho biết đáp án là \"Three\", các phương án còn lại không khớp với văn bản."
        },
        {
          "question": "What colour are the bananas?",
          "options": [
            "Green",
            "Red",
            "Yellow",
            "Purple"
          ],
          "correctAnswer": 2,
          "explanation": "The text says four, five yellow bananas.",
          "explanationVi": "Dựa vào thông tin trong bài, \"Yellow\" là câu trả lời chính xác."
        },
        {
          "question": "What is the favourite colour?",
          "options": [
            "Green",
            "Yellow",
            "Red",
            "Purple"
          ],
          "correctAnswer": 3,
          "explanation": "The passage states my favourite colour is purple.",
          "explanationVi": "Câu trả lời đúng: \"Purple\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        },
        {
          "question": "What colour are the grapes?",
          "options": [
            "Purple",
            "Green",
            "Red",
            "Yellow"
          ],
          "correctAnswer": 1,
          "explanation": "The text says only green grapes at the end.",
          "explanationVi": "Đáp án đúng là \"Green\". Thông tin này được nêu trực tiếp trong bài đọc."
        }
      ]
    },
    {
      "passage": "Today is my birthday! I am seven years old. I have a big cake with seven candles. My friends sing a song and give me two nice presents.",
      "questions": [
        {
          "question": "How old is the writer?",
          "options": [
            "Six",
            "Seven",
            "Eight",
            "Nine"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says I am seven years old.",
          "explanationVi": "Chọn \"Seven\" vì bài đọc nói rõ chi tiết này."
        },
        {
          "question": "How many candles are on the cake?",
          "options": [
            "Six",
            "Seven",
            "Eight",
            "Two"
          ],
          "correctAnswer": 1,
          "explanation": "The text says a big cake with seven candles.",
          "explanationVi": "Bài đọc cho biết đáp án là \"Seven\", các phương án còn lại không khớp với văn bản."
        },
        {
          "question": "What do the friends do?",
          "options": [
            "Sing a song",
            "Cook food",
            "Play football",
            "Draw pictures"
          ],
          "correctAnswer": 0,
          "explanation": "The passage says my friends sing a song.",
          "explanationVi": "Dựa vào thông tin trong bài, \"Sing a song\" là câu trả lời chính xác."
        },
        {
          "question": "How many presents does the writer get?",
          "options": [
            "One",
            "Two",
            "Three",
            "Four"
          ],
          "correctAnswer": 1,
          "explanation": "The text says they give me two nice presents.",
          "explanationVi": "Câu trả lời đúng: \"Two\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        }
      ]
    }
  ],
  "cambridge-movers-1": [
    {
      "passage": "Every day after school, Lucy does something different. On Monday she plays the piano for thirty minutes. On Tuesday she rides her bike in the park with her brother. On Wednesday she paints pictures of animals. Her favourite day is Thursday because she goes swimming with her best friend Anna. At the weekend, Lucy likes to read books about space and stars in her bedroom.",
      "questions": [
        {
          "question": "What does Lucy do on Monday?",
          "options": [
            "Rides her bike",
            "Plays the piano",
            "Goes swimming",
            "Paints pictures"
          ],
          "correctAnswer": 1,
          "explanation": "The text says on Monday she plays the piano for thirty minutes.",
          "explanationVi": "Đáp án đúng là \"Plays the piano\". Thông tin này được nêu trực tiếp trong bài đọc."
        },
        {
          "question": "Who does Lucy ride her bike with?",
          "options": [
            "Her mother",
            "Her friend Anna",
            "Her brother",
            "Her teacher"
          ],
          "correctAnswer": 2,
          "explanation": "The passage says she rides her bike in the park with her brother.",
          "explanationVi": "Chọn \"Her brother\" vì bài đọc nói rõ chi tiết này."
        },
        {
          "question": "Why is Thursday her favourite day?",
          "options": [
            "She paints pictures",
            "She reads books",
            "She goes swimming with Anna",
            "She plays the piano"
          ],
          "correctAnswer": 2,
          "explanation": "The text explains her favourite day is Thursday because she goes swimming with her best friend Anna.",
          "explanationVi": "Bài đọc cho biết đáp án là \"She goes swimming with Anna\", các phương án còn lại không khớp với văn bản."
        },
        {
          "question": "What does Lucy read about at the weekend?",
          "options": [
            "Animals",
            "Space and stars",
            "Music",
            "Sports"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says she likes to read books about space and stars.",
          "explanationVi": "Dựa vào thông tin trong bài, \"Space and stars\" là câu trả lời chính xác."
        }
      ]
    },
    {
      "passage": "My hobby is collecting stamps from different countries. I started two years ago when my uncle gave me some stamps from Japan. Now I have more than two hundred stamps in a special book. My favourite stamps show colourful birds and old trains. Every Saturday, I go to a small shop in town to look for new stamps to add to my collection.",
      "questions": [
        {
          "question": "How did the hobby start?",
          "options": [
            "A friend gave stamps",
            "An uncle gave stamps from Japan",
            "The writer bought a book",
            "A teacher taught it"
          ],
          "correctAnswer": 1,
          "explanation": "The text says it started when my uncle gave me some stamps from Japan.",
          "explanationVi": "Câu trả lời đúng: \"An uncle gave stamps from Japan\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        },
        {
          "question": "How many stamps does the writer have now?",
          "options": [
            "Fifty",
            "One hundred",
            "More than two hundred",
            "Ten"
          ],
          "correctAnswer": 2,
          "explanation": "The passage states now I have more than two hundred stamps.",
          "explanationVi": "Đáp án đúng là \"More than two hundred\". Thông tin này được nêu trực tiếp trong bài đọc."
        },
        {
          "question": "What do the favourite stamps show?",
          "options": [
            "Flowers",
            "Colourful birds and old trains",
            "Mountains",
            "Cars"
          ],
          "correctAnswer": 1,
          "explanation": "The text says my favourite stamps show colourful birds and old trains.",
          "explanationVi": "Chọn \"Colourful birds and old trains\" vì bài đọc nói rõ chi tiết này."
        },
        {
          "question": "When does the writer look for new stamps?",
          "options": [
            "Every Saturday",
            "Every Monday",
            "Every summer",
            "Every morning"
          ],
          "correctAnswer": 0,
          "explanation": "The passage says every Saturday, I go to a small shop in town.",
          "explanationVi": "Bài đọc cho biết đáp án là \"Every Saturday\", các phương án còn lại không khớp với văn bản."
        }
      ]
    }
  ],
  "cambridge-movers-2": [
    {
      "passage": "Last weekend the weather was terrible in our town. It rained all day on Saturday, and the wind was very strong. My family stayed at home and played board games. On Sunday, the sun came out and the sky was blue again, so we walked to the lake near our house. We saw ducks swimming and children flying colourful kites in the park.",
      "questions": [
        {
          "question": "What was the weather like on Saturday?",
          "options": [
            "Sunny and warm",
            "Rainy and windy",
            "Snowy",
            "Foggy"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says it rained all day on Saturday, and the wind was very strong.",
          "explanationVi": "Dựa vào thông tin trong bài, \"Rainy and windy\" là câu trả lời chính xác."
        },
        {
          "question": "What did the family do on Saturday?",
          "options": [
            "Went to the lake",
            "Played board games",
            "Flew kites",
            "Went swimming"
          ],
          "correctAnswer": 1,
          "explanation": "The text says my family stayed at home and played board games.",
          "explanationVi": "Câu trả lời đúng: \"Played board games\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        },
        {
          "question": "What was the weather like on Sunday?",
          "options": [
            "Rainy",
            "Windy",
            "Sunny with blue sky",
            "Cloudy"
          ],
          "correctAnswer": 2,
          "explanation": "The passage says the sun came out and the sky was blue again.",
          "explanationVi": "Đáp án đúng là \"Sunny with blue sky\". Thông tin này được nêu trực tiếp trong bài đọc."
        },
        {
          "question": "What did they see at the lake?",
          "options": [
            "Ducks and kites",
            "Fish and boats",
            "Horses",
            "Snow"
          ],
          "correctAnswer": 0,
          "explanation": "The text says they saw ducks swimming and children flying colourful kites.",
          "explanationVi": "Chọn \"Ducks and kites\" vì bài đọc nói rõ chi tiết này."
        }
      ]
    },
    {
      "passage": "Our town has many interesting places to visit. Near the school there is a big library with thousands of books. Across the street, there is a small park with a playground for children. In the centre of town, there is an old museum that shows pictures from long ago. My favourite place is the sports centre, where I play basketball with my friends every Friday afternoon.",
      "questions": [
        {
          "question": "What is near the school?",
          "options": [
            "A museum",
            "A big library",
            "A sports centre",
            "A farm"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says near the school there is a big library with thousands of books.",
          "explanationVi": "Bài đọc cho biết đáp án là \"A big library\", các phương án còn lại không khớp với văn bản."
        },
        {
          "question": "What is in the park?",
          "options": [
            "A museum",
            "A playground",
            "A library",
            "A pool"
          ],
          "correctAnswer": 1,
          "explanation": "The text says there is a small park with a playground for children.",
          "explanationVi": "Dựa vào thông tin trong bài, \"A playground\" là câu trả lời chính xác."
        },
        {
          "question": "What does the museum show?",
          "options": [
            "New toys",
            "Pictures from long ago",
            "Sports games",
            "Animals"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says the museum shows pictures from long ago.",
          "explanationVi": "Câu trả lời đúng: \"Pictures from long ago\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        },
        {
          "question": "When does the writer play basketball?",
          "options": [
            "Every morning",
            "Every Friday afternoon",
            "Every Sunday",
            "Every night"
          ],
          "correctAnswer": 1,
          "explanation": "The text says I play basketball with my friends every Friday afternoon.",
          "explanationVi": "Đáp án đúng là \"Every Friday afternoon\". Thông tin này được nêu trực tiếp trong bài đọc."
        }
      ]
    }
  ],
  "cambridge-movers-3": [
    {
      "passage": "At Green Park School, students can choose many after-school clubs. The art club meets on Mondays and children paint and draw pictures. The music club meets on Wednesdays, where students learn to play the guitar or the drums. On Fridays, there is a science club where students do fun experiments with water and light. My best friend Ben joins the football club every Tuesday, but I prefer the art club because I love drawing animals.",
      "questions": [
        {
          "question": "When does the music club meet?",
          "options": [
            "Mondays",
            "Wednesdays",
            "Fridays",
            "Tuesdays"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says the music club meets on Wednesdays.",
          "explanationVi": "Chọn \"Wednesdays\" vì bài đọc nói rõ chi tiết này."
        },
        {
          "question": "What do students do in the science club?",
          "options": [
            "Play instruments",
            "Paint pictures",
            "Do experiments with water and light",
            "Play football"
          ],
          "correctAnswer": 2,
          "explanation": "The text says the science club does fun experiments with water and light.",
          "explanationVi": "Bài đọc cho biết đáp án là \"Do experiments with water and light\", các phương án còn lại không khớp với văn bản."
        },
        {
          "question": "Which club does Ben join?",
          "options": [
            "Art club",
            "Music club",
            "Football club",
            "Science club"
          ],
          "correctAnswer": 2,
          "explanation": "The passage says my best friend Ben joins the football club every Tuesday.",
          "explanationVi": "Dựa vào thông tin trong bài, \"Football club\" là câu trả lời chính xác."
        },
        {
          "question": "Why does the writer prefer the art club?",
          "options": [
            "It is easier",
            "Because I love drawing animals",
            "Because friends go there",
            "It meets on Fridays"
          ],
          "correctAnswer": 1,
          "explanation": "The text says I prefer the art club because I love drawing animals.",
          "explanationVi": "Câu trả lời đúng: \"Because I love drawing animals\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        }
      ]
    },
    {
      "passage": "This weekend, our class went on a school trip to a farm outside the city. We travelled there by bus for one hour. When we arrived, a farmer showed us cows, sheep and chickens. We learned how to milk a cow and collect eggs from the hens. After lunch, we walked through a field of yellow sunflowers and took many photos. Everyone agreed it was the best trip of the year.",
      "questions": [
        {
          "question": "How did the class travel to the farm?",
          "options": [
            "By train",
            "By bus",
            "By car",
            "On foot"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says we travelled there by bus for one hour.",
          "explanationVi": "Đáp án đúng là \"By bus\". Thông tin này được nêu trực tiếp trong bài đọc."
        },
        {
          "question": "Who showed the students the animals?",
          "options": [
            "A teacher",
            "A farmer",
            "A bus driver",
            "A parent"
          ],
          "correctAnswer": 1,
          "explanation": "The text says a farmer showed us cows, sheep and chickens.",
          "explanationVi": "Chọn \"A farmer\" vì bài đọc nói rõ chi tiết này."
        },
        {
          "question": "What did students learn to do?",
          "options": [
            "Drive a tractor",
            "Milk a cow and collect eggs",
            "Plant sunflowers",
            "Cook lunch"
          ],
          "correctAnswer": 1,
          "explanation": "The passage states they learned how to milk a cow and collect eggs from the hens.",
          "explanationVi": "Bài đọc cho biết đáp án là \"Milk a cow and collect eggs\", các phương án còn lại không khớp với văn bản."
        },
        {
          "question": "What did they see after lunch?",
          "options": [
            "A river",
            "A field of sunflowers",
            "A forest",
            "A lake"
          ],
          "correctAnswer": 1,
          "explanation": "The text says they walked through a field of yellow sunflowers.",
          "explanationVi": "Dựa vào thông tin trong bài, \"A field of sunflowers\" là câu trả lời chính xác."
        }
      ]
    }
  ],
  "cambridge-movers-4": [
    {
      "passage": "On Saturday morning, Mrs Taylor goes to the market to buy food for the week. First, she buys fresh vegetables like carrots and potatoes from a friendly farmer. Then she visits the fish stall to choose some fish for dinner. Next, she stops at the bakery to buy fresh bread and a chocolate cake for her children. Finally, she buys apples and oranges from a fruit stand before walking home with her heavy bags.",
      "questions": [
        {
          "question": "What does Mrs Taylor buy first?",
          "options": [
            "Fish",
            "Vegetables",
            "Bread",
            "Fruit"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says first, she buys fresh vegetables like carrots and potatoes.",
          "explanationVi": "Câu trả lời đúng: \"Vegetables\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        },
        {
          "question": "Where does she go after the vegetables?",
          "options": [
            "The bakery",
            "The fish stall",
            "The fruit stand",
            "Home"
          ],
          "correctAnswer": 1,
          "explanation": "The text says then she visits the fish stall to choose some fish for dinner.",
          "explanationVi": "Đáp án đúng là \"The fish stall\". Thông tin này được nêu trực tiếp trong bài đọc."
        },
        {
          "question": "What does she buy at the bakery?",
          "options": [
            "Cheese",
            "Bread and a chocolate cake",
            "Fish",
            "Vegetables"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says she stops at the bakery to buy fresh bread and a chocolate cake.",
          "explanationVi": "Chọn \"Bread and a chocolate cake\" vì bài đọc nói rõ chi tiết này."
        },
        {
          "question": "What does she buy last?",
          "options": [
            "Vegetables",
            "Fish",
            "Bread",
            "Apples and oranges"
          ],
          "correctAnswer": 3,
          "explanation": "The text says finally, she buys apples and oranges from a fruit stand.",
          "explanationVi": "Bài đọc cho biết đáp án là \"Apples and oranges\", các phương án còn lại không khớp với văn bản."
        }
      ]
    },
    {
      "passage": "There is a new shop in our town called Fun Toys. It sells all kinds of toys, from small cars to giant teddy bears. Last week, my mum took me there to buy a birthday present for my cousin. We looked at many shelves full of puzzles, games and dolls. In the end, we chose a colourful puzzle with five hundred pieces because my cousin loves putting pictures together. The shop assistant wrapped the present in blue paper with a big yellow bow.",
      "questions": [
        {
          "question": "What is the name of the new shop?",
          "options": [
            "Toy World",
            "Fun Toys",
            "Happy Games",
            "Big Bears"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says there is a new shop in our town called Fun Toys.",
          "explanationVi": "Dựa vào thông tin trong bài, \"Fun Toys\" là câu trả lời chính xác."
        },
        {
          "question": "Why did they go to the shop?",
          "options": [
            "To buy shoes",
            "To buy a birthday present",
            "To buy books",
            "To buy food"
          ],
          "correctAnswer": 1,
          "explanation": "The text says my mum took me there to buy a birthday present for my cousin.",
          "explanationVi": "Câu trả lời đúng: \"To buy a birthday present\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        },
        {
          "question": "What did they choose in the end?",
          "options": [
            "A teddy bear",
            "A doll",
            "A puzzle",
            "A toy car"
          ],
          "correctAnswer": 2,
          "explanation": "The passage states we chose a colourful puzzle with five hundred pieces.",
          "explanationVi": "Đáp án đúng là \"A puzzle\". Thông tin này được nêu trực tiếp trong bài đọc."
        },
        {
          "question": "How did the assistant wrap the present?",
          "options": [
            "In red paper",
            "In blue paper with a yellow bow",
            "In a box",
            "In a bag"
          ],
          "correctAnswer": 1,
          "explanation": "The text says the shop assistant wrapped the present in blue paper with a big yellow bow.",
          "explanationVi": "Chọn \"In blue paper with a yellow bow\" vì bài đọc nói rõ chi tiết này."
        }
      ]
    }
  ],
  "cambridge-movers-5": [
    {
      "passage": "Last summer, my family visited a big zoo in the city. We saw many amazing animals there. The elephants were huge and they liked to spray water with their trunks. The monkeys jumped from tree to tree and made funny noises. My little sister loved the colourful parrots the best because they could say a few words. We also watched the zookeepers feed the lions some meat at three o'clock. It was an exciting day for the whole family.",
      "questions": [
        {
          "question": "What did the elephants like to do?",
          "options": [
            "Sleep all day",
            "Spray water with their trunks",
            "Eat leaves",
            "Play with the monkeys"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says the elephants liked to spray water with their trunks.",
          "explanationVi": "Bài đọc cho biết đáp án là \"Spray water with their trunks\", các phương án còn lại không khớp với văn bản."
        },
        {
          "question": "What did the monkeys do?",
          "options": [
            "Slept in cages",
            "Jumped from tree to tree",
            "Swam in water",
            "Ate fruit only"
          ],
          "correctAnswer": 1,
          "explanation": "The text says the monkeys jumped from tree to tree and made funny noises.",
          "explanationVi": "Dựa vào thông tin trong bài, \"Jumped from tree to tree\" là câu trả lời chính xác."
        },
        {
          "question": "Why did the sister love the parrots?",
          "options": [
            "They were big",
            "They could say a few words",
            "They were free",
            "They danced"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says she loved the colourful parrots best because they could say a few words.",
          "explanationVi": "Câu trả lời đúng: \"They could say a few words\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        },
        {
          "question": "What time did the lions get fed?",
          "options": [
            "One o'clock",
            "Two o'clock",
            "Three o'clock",
            "Four o'clock"
          ],
          "correctAnswer": 2,
          "explanation": "The text says they watched the zookeepers feed the lions at three o'clock.",
          "explanationVi": "Đáp án đúng là \"Three o'clock\". Thông tin này được nêu trực tiếp trong bài đọc."
        }
      ]
    },
    {
      "passage": "My grandmother lives in a small village near the mountains. Every summer, my family drives there for two weeks. The village has only one shop, one school and a beautiful old church. Behind my grandmother's house, there is a river where my cousins and I like to catch fish. In the evening, we sit outside and grandmother tells us stories about when she was young. I always feel happy and relaxed when I visit this quiet, green place.",
      "questions": [
        {
          "question": "Where does the grandmother live?",
          "options": [
            "In a big city",
            "Near the sea",
            "In a small village near the mountains",
            "On a farm"
          ],
          "correctAnswer": 2,
          "explanation": "The passage says my grandmother lives in a small village near the mountains.",
          "explanationVi": "Chọn \"In a small village near the mountains\" vì bài đọc nói rõ chi tiết này."
        },
        {
          "question": "How long does the family stay each summer?",
          "options": [
            "One week",
            "Two weeks",
            "One month",
            "Three days"
          ],
          "correctAnswer": 1,
          "explanation": "The text says every summer, my family drives there for two weeks.",
          "explanationVi": "Bài đọc cho biết đáp án là \"Two weeks\", các phương án còn lại không khớp với văn bản."
        },
        {
          "question": "What is behind the grandmother's house?",
          "options": [
            "A shop",
            "A school",
            "A river",
            "A church"
          ],
          "correctAnswer": 2,
          "explanation": "The passage says behind my grandmother's house, there is a river.",
          "explanationVi": "Dựa vào thông tin trong bài, \"A river\" là câu trả lời chính xác."
        },
        {
          "question": "What does grandmother do in the evening?",
          "options": [
            "Cooks dinner",
            "Tells stories",
            "Reads books",
            "Watches television"
          ],
          "correctAnswer": 1,
          "explanation": "The text says grandmother tells us stories about when she was young.",
          "explanationVi": "Câu trả lời đúng: \"Tells stories\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        }
      ]
    }
  ],
  "cambridge-flyers-1": [
    {
      "passage": "Once upon a time, there was a young girl named Mia who loved reading stories about dragons. One rainy afternoon, she found an old book hidden at the back of her grandfather's bookshelf. When she opened it, a soft golden light shone from the pages, and a tiny dragon flew out! The dragon, whose name was Spark, explained that he had been trapped inside the book for one hundred years by a jealous wizard. Mia decided to help Spark find his way home to the mountains. Together, they had to solve three tricky riddles before sunset, or Spark would disappear forever into the pages again.",
      "questions": [
        {
          "question": "Where did Mia find the old book?",
          "options": [
            "Under her bed",
            "At the back of her grandfather's bookshelf",
            "In a shop",
            "At school"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says she found an old book hidden at the back of her grandfather's bookshelf.",
          "explanationVi": "Đáp án đúng là \"At the back of her grandfather's bookshelf\". Thông tin này được nêu trực tiếp trong bài đọc."
        },
        {
          "question": "How long had Spark been trapped in the book?",
          "options": [
            "Ten years",
            "Fifty years",
            "One hundred years",
            "One year"
          ],
          "correctAnswer": 2,
          "explanation": "The text says he had been trapped inside the book for one hundred years.",
          "explanationVi": "Chọn \"One hundred years\" vì bài đọc nói rõ chi tiết này."
        },
        {
          "question": "Who trapped Spark inside the book?",
          "options": [
            "A dragon",
            "A jealous wizard",
            "Mia's grandfather",
            "A king"
          ],
          "correctAnswer": 1,
          "explanation": "The passage states he had been trapped by a jealous wizard.",
          "explanationVi": "Bài đọc cho biết đáp án là \"A jealous wizard\", các phương án còn lại không khớp với văn bản."
        },
        {
          "question": "What did Mia and Spark need to do before sunset?",
          "options": [
            "Find some gold",
            "Solve three tricky riddles",
            "Fly to the mountains",
            "Read another book"
          ],
          "correctAnswer": 1,
          "explanation": "The text says they had to solve three tricky riddles before sunset.",
          "explanationVi": "Dựa vào thông tin trong bài, \"Solve three tricky riddles\" là câu trả lời chính xác."
        }
      ]
    },
    {
      "passage": "Dear Grandma, Thank you so much for the wonderful birthday present you sent me last week! I was so surprised when I opened the box and found a beautiful telescope inside. I have always wanted to look at the stars and planets, so this is the perfect gift for me. Last night, my dad helped me set it up in the garden, and we could see the moon very clearly through it. We even saw some of its craters! Next month, there will be a special event called a meteor shower, and I really hope the sky will be clear so we can watch it together with the new telescope. Love, Charlie.",
      "questions": [
        {
          "question": "What present did Charlie receive?",
          "options": [
            "A camera",
            "A telescope",
            "A book about stars",
            "A microscope"
          ],
          "correctAnswer": 1,
          "explanation": "The letter says I found a beautiful telescope inside.",
          "explanationVi": "Câu trả lời đúng: \"A telescope\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        },
        {
          "question": "Who helped set up the telescope?",
          "options": [
            "Grandma",
            "Charlie's dad",
            "A friend",
            "Charlie's teacher"
          ],
          "correctAnswer": 1,
          "explanation": "The text says my dad helped me set it up in the garden.",
          "explanationVi": "Đáp án đúng là \"Charlie's dad\". Thông tin này được nêu trực tiếp trong bài đọc."
        },
        {
          "question": "What could they see clearly through the telescope?",
          "options": [
            "The sun",
            "The moon and its craters",
            "A planet",
            "A comet"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says we could see the moon very clearly through it and its craters.",
          "explanationVi": "Chọn \"The moon and its craters\" vì bài đọc nói rõ chi tiết này."
        },
        {
          "question": "What event will happen next month?",
          "options": [
            "A birthday party",
            "A meteor shower",
            "A school trip",
            "A concert"
          ],
          "correctAnswer": 1,
          "explanation": "The text says next month, there will be a special event called a meteor shower.",
          "explanationVi": "Bài đọc cho biết đáp án là \"A meteor shower\", các phương án còn lại không khớp với văn bản."
        }
      ]
    }
  ],
  "cambridge-flyers-2": [
    {
      "passage": "Welcome to Riverside Adventure Park! Our park is open every day from nine in the morning until six in the evening, except on Mondays when it is closed for cleaning. Children under seven years old must be with an adult at all times near the water rides. Our most popular attraction is the Giant Wheel, which gives visitors an amazing view of the whole city. If you get hungry, visit our cafe near the main entrance, which sells sandwiches, fruit and ice cream. Please remember that pets are not allowed inside the park, and we ask all visitors to put their rubbish in the bins provided around the park to keep it clean for everyone.",
      "questions": [
        {
          "question": "What time does the park open?",
          "options": [
            "Eight in the morning",
            "Nine in the morning",
            "Ten in the morning",
            "Seven in the morning"
          ],
          "correctAnswer": 1,
          "explanation": "The notice says our park is open every day from nine in the morning.",
          "explanationVi": "Dựa vào thông tin trong bài, \"Nine in the morning\" là câu trả lời chính xác."
        },
        {
          "question": "Which day is the park closed?",
          "options": [
            "Sunday",
            "Monday",
            "Saturday",
            "Friday"
          ],
          "correctAnswer": 1,
          "explanation": "The text says except on Mondays when it is closed for cleaning.",
          "explanationVi": "Câu trả lời đúng: \"Monday\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        },
        {
          "question": "What is the most popular attraction?",
          "options": [
            "The cafe",
            "The water rides",
            "The Giant Wheel",
            "The main entrance"
          ],
          "correctAnswer": 2,
          "explanation": "The passage says our most popular attraction is the Giant Wheel.",
          "explanationVi": "Đáp án đúng là \"The Giant Wheel\". Thông tin này được nêu trực tiếp trong bài đọc."
        },
        {
          "question": "What is NOT allowed in the park?",
          "options": [
            "Sandwiches",
            "Rubbish bins",
            "Pets",
            "Ice cream"
          ],
          "correctAnswer": 2,
          "explanation": "The notice says pets are not allowed inside the park.",
          "explanationVi": "Chọn \"Pets\" vì bài đọc nói rõ chi tiết này."
        }
      ]
    },
    {
      "passage": "Last Tuesday, our whole class went to the city library for a special reading morning. Mr Jones, our teacher, told us to choose one book each and read quietly for thirty minutes. After that, a famous author named Ella Brooks visited to talk about her new adventure story for children. She explained how she gets ideas for her characters by watching people in the park and imagining exciting things that could happen to them. Many students asked her questions about writing, and she said the most important thing is to read as much as possible. At the end of the visit, every student received a free bookmark and a small notebook to write their own stories in.",
      "questions": [
        {
          "question": "What did students do first at the library?",
          "options": [
            "Meet the author",
            "Choose a book and read quietly",
            "Write stories",
            "Ask questions"
          ],
          "correctAnswer": 1,
          "explanation": "The text says he told us to choose one book each and read quietly for thirty minutes.",
          "explanationVi": "Bài đọc cho biết đáp án là \"Choose a book and read quietly\", các phương án còn lại không khớp với văn bản."
        },
        {
          "question": "Who visited the class at the library?",
          "options": [
            "A teacher",
            "A famous author",
            "A librarian",
            "A parent"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says a famous author named Ella Brooks visited.",
          "explanationVi": "Dựa vào thông tin trong bài, \"A famous author\" là câu trả lời chính xác."
        },
        {
          "question": "Where does Ella Brooks get ideas for characters?",
          "options": [
            "From books",
            "By watching people in the park",
            "From her family",
            "From the internet"
          ],
          "correctAnswer": 1,
          "explanation": "The text says she gets ideas by watching people in the park.",
          "explanationVi": "Câu trả lời đúng: \"By watching people in the park\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        },
        {
          "question": "What did every student receive at the end?",
          "options": [
            "A book",
            "A bookmark and a notebook",
            "A pen",
            "A poster"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says every student received a free bookmark and a small notebook.",
          "explanationVi": "Đáp án đúng là \"A bookmark and a notebook\". Thông tin này được nêu trực tiếp trong bài đọc."
        }
      ]
    }
  ],
  "cambridge-flyers-3": [
    {
      "passage": "Two weeks ago, my family and I travelled to a small island for our summer holiday. We took a boat from the mainland, and the journey took almost two hours across the calm blue sea. When we arrived, we stayed in a wooden cottage near a quiet beach surrounded by tall palm trees. Every morning, my brother and I explored the rocky paths near the cliffs, looking for interesting shells and small crabs. One afternoon, a local fisherman took us out on his boat and taught us how to catch fish using a simple net. In the evenings, we watched the sunset turn the sky orange and pink while eating fresh fruit that grew on the island. It was the most peaceful holiday we have ever had.",
      "questions": [
        {
          "question": "How did the family travel to the island?",
          "options": [
            "By plane",
            "By boat",
            "By car",
            "By train"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says we took a boat from the mainland.",
          "explanationVi": "Chọn \"By boat\" vì bài đọc nói rõ chi tiết này."
        },
        {
          "question": "How long did the journey take?",
          "options": [
            "One hour",
            "Almost two hours",
            "Three hours",
            "Thirty minutes"
          ],
          "correctAnswer": 1,
          "explanation": "The text says the journey took almost two hours across the calm blue sea.",
          "explanationVi": "Bài đọc cho biết đáp án là \"Almost two hours\", các phương án còn lại không khớp với văn bản."
        },
        {
          "question": "Where did the family stay?",
          "options": [
            "In a hotel",
            "In a wooden cottage near a beach",
            "On the boat",
            "In a tent"
          ],
          "correctAnswer": 1,
          "explanation": "The passage states they stayed in a wooden cottage near a quiet beach.",
          "explanationVi": "Dựa vào thông tin trong bài, \"In a wooden cottage near a beach\" là câu trả lời chính xác."
        },
        {
          "question": "Who taught them to catch fish?",
          "options": [
            "A teacher",
            "A local fisherman",
            "Their father",
            "A tour guide"
          ],
          "correctAnswer": 1,
          "explanation": "The text says a local fisherman took us out on his boat and taught us how to catch fish.",
          "explanationVi": "Câu trả lời đúng: \"A local fisherman\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        }
      ]
    },
    {
      "passage": "The rainforest is one of the most important places on our planet because it is home to millions of different plants and animals. Many rainforests are found near the equator, where the weather is warm and wet all year round. Tall trees grow very close together, forming a thick roof of leaves called the canopy, which blocks most of the sunlight from reaching the ground. Because of this, many animals such as monkeys, colourful birds and insects live high up in the trees rather than on the forest floor. Sadly, large areas of rainforest are being cut down every year for farming and building, which is dangerous for the animals that live there and also affects the air that we breathe. Scientists and volunteers around the world are working hard to protect these amazing forests for the future.",
      "questions": [
        {
          "question": "Where are most rainforests found?",
          "options": [
            "Near the poles",
            "Near the equator",
            "In the desert",
            "In the mountains"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says many rainforests are found near the equator.",
          "explanationVi": "Đáp án đúng là \"Near the equator\". Thông tin này được nêu trực tiếp trong bài đọc."
        },
        {
          "question": "What is the canopy?",
          "options": [
            "The forest floor",
            "A thick roof of leaves formed by tall trees",
            "A type of animal",
            "A river in the forest"
          ],
          "correctAnswer": 1,
          "explanation": "The text describes the canopy as a thick roof of leaves formed by tall trees.",
          "explanationVi": "Chọn \"A thick roof of leaves formed by tall trees\" vì bài đọc nói rõ chi tiết này."
        },
        {
          "question": "Where do many animals live in the rainforest?",
          "options": [
            "On the forest floor",
            "High up in the trees",
            "Underground",
            "In rivers"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says many animals live high up in the trees rather than on the forest floor.",
          "explanationVi": "Bài đọc cho biết đáp án là \"High up in the trees\", các phương án còn lại không khớp với văn bản."
        },
        {
          "question": "Why are rainforests being cut down?",
          "options": [
            "For fun",
            "For farming and building",
            "To make rivers",
            "To find animals"
          ],
          "correctAnswer": 1,
          "explanation": "The text says large areas are being cut down every year for farming and building.",
          "explanationVi": "Dựa vào thông tin trong bài, \"For farming and building\" là câu trả lời chính xác."
        }
      ]
    }
  ],
  "cambridge-flyers-4": [
    {
      "passage": "Every Saturday morning, hundreds of children in our town take part in a fun run around the local park to stay healthy and active. The event starts at eight o'clock, and runners of all ages can join, from young children to grandparents. Before the race begins, a coach leads everyone in a short warm-up to stretch their muscles and prevent injuries. The course is not too difficult, following a flat path beside the river for about two kilometres. At the finish line, every runner receives a colourful sticker and a bottle of water, no matter how fast or slow they finish. Many families say the fun run has helped them become closer, as they train together during the week and cheer each other on during the race. Local doctors also say regular exercise like this is very good for both the body and the mind.",
      "questions": [
        {
          "question": "What time does the fun run start?",
          "options": [
            "Seven o'clock",
            "Eight o'clock",
            "Nine o'clock",
            "Ten o'clock"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says the event starts at eight o'clock.",
          "explanationVi": "Câu trả lời đúng: \"Eight o'clock\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        },
        {
          "question": "What happens before the race begins?",
          "options": [
            "Everyone eats breakfast",
            "A coach leads a warm-up",
            "Runners get medals",
            "Music plays"
          ],
          "correctAnswer": 1,
          "explanation": "The text says a coach leads everyone in a short warm-up.",
          "explanationVi": "Đáp án đúng là \"A coach leads a warm-up\". Thông tin này được nêu trực tiếp trong bài đọc."
        },
        {
          "question": "How long is the course?",
          "options": [
            "One kilometre",
            "About two kilometres",
            "Five kilometres",
            "Ten kilometres"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says the course follows a flat path for about two kilometres.",
          "explanationVi": "Chọn \"About two kilometres\" vì bài đọc nói rõ chi tiết này."
        },
        {
          "question": "What does every runner get at the finish line?",
          "options": [
            "A medal and trophy",
            "A sticker and water",
            "Money",
            "A t-shirt"
          ],
          "correctAnswer": 1,
          "explanation": "The text says every runner receives a colourful sticker and a bottle of water.",
          "explanationVi": "Bài đọc cho biết đáp án là \"A sticker and water\", các phương án còn lại không khớp với văn bản."
        }
      ]
    },
    {
      "passage": "Notice: School Sports Day. This year, our school Sports Day will take place on Friday the fifteenth of June at the town stadium instead of the school field, because the field is being repaired. All students should arrive by half past eight wearing their house colours, either red, blue, green or yellow. Events will include running races, the long jump, and a relay race for each class. Parents are welcome to come and watch, and there will be a small stall selling drinks and snacks to raise money for new sports equipment. Please remember to bring a hat and a bottle of water, as the weather is expected to be very sunny that day. If it rains, the event will be moved to the following Friday instead.",
      "questions": [
        {
          "question": "Where will Sports Day take place this year?",
          "options": [
            "The school field",
            "The town stadium",
            "A local park",
            "The gym"
          ],
          "correctAnswer": 1,
          "explanation": "The notice says it will take place at the town stadium instead of the school field.",
          "explanationVi": "Dựa vào thông tin trong bài, \"The town stadium\" là câu trả lời chính xác."
        },
        {
          "question": "Why has the location changed?",
          "options": [
            "The stadium is bigger",
            "The field is being repaired",
            "It is cheaper",
            "Parents requested it"
          ],
          "correctAnswer": 1,
          "explanation": "The text says because the field is being repaired.",
          "explanationVi": "Câu trả lời đúng: \"The field is being repaired\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        },
        {
          "question": "What should students wear?",
          "options": [
            "School uniform",
            "Their house colours",
            "Sports team shirts only",
            "Formal clothes"
          ],
          "correctAnswer": 1,
          "explanation": "The notice says students should arrive wearing their house colours.",
          "explanationVi": "Đáp án đúng là \"Their house colours\". Thông tin này được nêu trực tiếp trong bài đọc."
        },
        {
          "question": "What will happen if it rains?",
          "options": [
            "The event is cancelled",
            "It moves indoors",
            "It moves to the following Friday",
            "Nothing changes"
          ],
          "correctAnswer": 2,
          "explanation": "The passage says if it rains, the event will be moved to the following Friday.",
          "explanationVi": "Chọn \"It moves to the following Friday\" vì bài đọc nói rõ chi tiết này."
        }
      ]
    }
  ],
  "cambridge-flyers-5": [
    {
      "passage": "For our school science fair this year, my group decided to build a small robot that could pick up and sort different coloured balls. It took us almost three weeks to plan, build and test our project after school. First, we drew a design on paper, then we used a simple computer program to control the robot's arm and wheels. The most difficult part was making the robot recognise colours correctly using a small sensor, because sometimes it made mistakes in bright light. My teammate Sam solved this problem by adding a small cover over the sensor to block extra light. On the day of the fair, our robot successfully sorted twenty balls in under two minutes, and we won second prize out of fifteen groups. Our teacher said our project showed excellent teamwork and creative thinking.",
      "questions": [
        {
          "question": "What did the robot do?",
          "options": [
            "Played music",
            "Picked up and sorted coloured balls",
            "Cleaned the classroom",
            "Drew pictures"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says they built a robot that could pick up and sort different coloured balls.",
          "explanationVi": "Bài đọc cho biết đáp án là \"Picked up and sorted coloured balls\", các phương án còn lại không khớp với văn bản."
        },
        {
          "question": "How long did the project take?",
          "options": [
            "One week",
            "Almost three weeks",
            "Two months",
            "One day"
          ],
          "correctAnswer": 1,
          "explanation": "The text says it took us almost three weeks to plan, build and test our project.",
          "explanationVi": "Dựa vào thông tin trong bài, \"Almost three weeks\" là câu trả lời chính xác."
        },
        {
          "question": "What was the most difficult part?",
          "options": [
            "Designing the arm",
            "Making the robot recognise colours correctly",
            "Writing the program",
            "Building the wheels"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says the most difficult part was making the robot recognise colours correctly.",
          "explanationVi": "Câu trả lời đúng: \"Making the robot recognise colours correctly\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        },
        {
          "question": "How did Sam solve the light problem?",
          "options": [
            "He changed the sensor",
            "He added a cover over the sensor",
            "He used a bigger robot",
            "He asked the teacher"
          ],
          "correctAnswer": 1,
          "explanation": "The text says Sam solved this problem by adding a small cover over the sensor.",
          "explanationVi": "Đáp án đúng là \"He added a cover over the sensor\". Thông tin này được nêu trực tiếp trong bài đọc."
        }
      ]
    },
    {
      "passage": "Dear students, Next month, our class will take part in a special project about protecting the environment. Each group must choose one topic, such as recycling, saving water, or reducing plastic waste, and create a presentation using pictures, facts and a short video. You will have three weeks to research your topic using books from the library and safe websites approved by your teacher. On the final day, each group will present their project to the whole school during assembly, and the best three projects will be displayed in the school hall for one month. Remember, this project is not just about getting a good grade, but about learning how small actions can make a real difference to our planet. Please bring your notebooks to the next lesson so we can begin planning our groups and topics together.",
      "questions": [
        {
          "question": "What is the class project about?",
          "options": [
            "Sports",
            "Protecting the environment",
            "Cooking",
            "History"
          ],
          "correctAnswer": 1,
          "explanation": "The letter says our class will take part in a special project about protecting the environment.",
          "explanationVi": "Chọn \"Protecting the environment\" vì bài đọc nói rõ chi tiết này."
        },
        {
          "question": "How long do students have to research?",
          "options": [
            "One week",
            "Three weeks",
            "One month",
            "Two days"
          ],
          "correctAnswer": 1,
          "explanation": "The text says you will have three weeks to research your topic.",
          "explanationVi": "Bài đọc cho biết đáp án là \"Three weeks\", các phương án còn lại không khớp với văn bản."
        },
        {
          "question": "Where will the presentations happen?",
          "options": [
            "In the library",
            "During assembly in front of the school",
            "At home",
            "In the science lab"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says each group will present their project to the whole school during assembly.",
          "explanationVi": "Dựa vào thông tin trong bài, \"During assembly in front of the school\" là câu trả lời chính xác."
        },
        {
          "question": "What happens to the best three projects?",
          "options": [
            "They win money",
            "They are displayed in the school hall for a month",
            "They are sent to another school",
            "They are printed in a book"
          ],
          "correctAnswer": 1,
          "explanation": "The text says the best three projects will be displayed in the school hall for one month.",
          "explanationVi": "Câu trả lời đúng: \"They are displayed in the school hall for a month\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        }
      ]
    }
  ],
  "cambridge-ket-1": [
    {
      "passage": "Notice for New Employees at Greenway Cafe. Welcome to Greenway Cafe! We are happy to have you join our team. Please read the following information carefully before your first shift. All staff must arrive fifteen minutes before their shift starts to change into their uniform, which will be given to you by the manager on your first day. Uniforms must be washed at home and brought back clean every week. During your shift, you should always be polite and friendly to customers, even when the cafe is very busy. If you need to take a day off for any reason, you must tell the manager at least three days in advance so that another member of staff can cover your shift. Breaks are twenty minutes long, and staff should not use their phones while working at the counter or serving customers. If you have any questions, please speak to Mr Adams in the office upstairs.",
      "questions": [
        {
          "question": "What must staff do before their shift starts?",
          "options": [
            "Eat lunch",
            "Arrive fifteen minutes early",
            "Call the manager",
            "Clean the tables"
          ],
          "correctAnswer": 1,
          "explanation": "The notice says all staff must arrive fifteen minutes before their shift starts.",
          "explanationVi": "Đáp án đúng là \"Arrive fifteen minutes early\". Thông tin này được nêu trực tiếp trong bài đọc."
        },
        {
          "question": "Who gives new staff their uniform?",
          "options": [
            "Another staff member",
            "The manager",
            "Mr Adams only",
            "A customer"
          ],
          "correctAnswer": 1,
          "explanation": "The text says the uniform will be given to you by the manager.",
          "explanationVi": "Chọn \"The manager\" vì bài đọc nói rõ chi tiết này."
        },
        {
          "question": "How much notice is needed for a day off?",
          "options": [
            "One day",
            "Two days",
            "At least three days",
            "One week"
          ],
          "correctAnswer": 2,
          "explanation": "The passage says you must tell the manager at least three days in advance.",
          "explanationVi": "Bài đọc cho biết đáp án là \"At least three days\", các phương án còn lại không khớp với văn bản."
        },
        {
          "question": "How long are the breaks?",
          "options": [
            "Ten minutes",
            "Fifteen minutes",
            "Twenty minutes",
            "Thirty minutes"
          ],
          "correctAnswer": 2,
          "explanation": "The text states breaks are twenty minutes long.",
          "explanationVi": "Dựa vào thông tin trong bài, \"Twenty minutes\" là câu trả lời chính xác."
        },
        {
          "question": "Where is Mr Adams's office?",
          "options": [
            "Downstairs",
            "In the kitchen",
            "Upstairs",
            "Outside"
          ],
          "correctAnswer": 2,
          "explanation": "The passage says please speak to Mr Adams in the office upstairs.",
          "explanationVi": "Câu trả lời đúng: \"Upstairs\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        }
      ]
    },
    {
      "passage": "Dear Sam, I hope you are well! I am writing to tell you about my trip to London last weekend. I travelled there by train, which took about two hours from our city. When I arrived, I stayed with my aunt, who lives near a famous park. On Saturday, we visited a huge museum full of old paintings and interesting objects from history. It was very crowded because it was a public holiday, so we had to wait in a long queue to get inside. On Sunday morning, we walked around the local market, where my aunt bought fresh vegetables and I bought a small gift for my mother. In the afternoon, we took a boat trip along the river, which gave us a wonderful view of the city's famous buildings. I really enjoyed the weekend and hope to visit again soon. Write back and tell me your news! Best wishes, Ana.",
      "questions": [
        {
          "question": "How did Ana travel to London?",
          "options": [
            "By bus",
            "By train",
            "By plane",
            "By car"
          ],
          "correctAnswer": 1,
          "explanation": "The letter says I travelled there by train.",
          "explanationVi": "Đáp án đúng là \"By train\". Thông tin này được nêu trực tiếp trong bài đọc."
        },
        {
          "question": "Who did Ana stay with?",
          "options": [
            "Her mother",
            "Her aunt",
            "A friend",
            "Her brother"
          ],
          "correctAnswer": 1,
          "explanation": "The text says I stayed with my aunt, who lives near a famous park.",
          "explanationVi": "Chọn \"Her aunt\" vì bài đọc nói rõ chi tiết này."
        },
        {
          "question": "Why was the museum crowded?",
          "options": [
            "It was closing soon",
            "It was a public holiday",
            "It was free entry day",
            "It was raining"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says it was very crowded because it was a public holiday.",
          "explanationVi": "Bài đọc cho biết đáp án là \"It was a public holiday\", các phương án còn lại không khớp với văn bản."
        },
        {
          "question": "What did Ana buy at the market?",
          "options": [
            "Vegetables",
            "A small gift for her mother",
            "A book",
            "Clothes"
          ],
          "correctAnswer": 1,
          "explanation": "The text says I bought a small gift for my mother.",
          "explanationVi": "Dựa vào thông tin trong bài, \"A small gift for her mother\" là câu trả lời chính xác."
        },
        {
          "question": "What did they do on Sunday afternoon?",
          "options": [
            "Visited a museum",
            "Went shopping",
            "Took a boat trip along the river",
            "Went to a park"
          ],
          "correctAnswer": 2,
          "explanation": "The passage says in the afternoon, we took a boat trip along the river.",
          "explanationVi": "Câu trả lời đúng: \"Took a boat trip along the river\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        }
      ]
    }
  ],
  "cambridge-ket-2": [
    {
      "passage": "Airport Announcement Information. Passengers travelling on flight BA245 to Madrid should now proceed to gate twelve, as boarding will begin in twenty minutes. Please have your boarding pass and passport ready to show to the staff at the gate. Passengers with young children or those needing extra assistance are welcome to board first. All hand luggage must fit under the seat in front of you or in the overhead lockers, and should not weigh more than seven kilograms. Due to bad weather in Madrid, the flight may be delayed by up to thirty minutes after boarding, so please remain patient and stay near the gate area. If you have any questions about your flight, please speak to a member of staff at the information desk near gate ten. We thank you for your patience and wish you a pleasant journey.",
      "questions": [
        {
          "question": "Which gate should passengers on flight BA245 go to?",
          "options": [
            "Gate ten",
            "Gate eleven",
            "Gate twelve",
            "Gate thirteen"
          ],
          "correctAnswer": 2,
          "explanation": "The announcement says passengers should now proceed to gate twelve.",
          "explanationVi": "Đáp án đúng là \"Gate twelve\". Thông tin này được nêu trực tiếp trong bài đọc."
        },
        {
          "question": "Who can board the plane first?",
          "options": [
            "Business passengers",
            "Passengers with young children or needing assistance",
            "Passengers with no luggage",
            "Staff members"
          ],
          "correctAnswer": 1,
          "explanation": "The text says passengers with young children or those needing extra assistance are welcome to board first.",
          "explanationVi": "Chọn \"Passengers with young children or needing assistance\" vì bài đọc nói rõ chi tiết này."
        },
        {
          "question": "What is the weight limit for hand luggage?",
          "options": [
            "Five kilograms",
            "Seven kilograms",
            "Ten kilograms",
            "Twenty kilograms"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says hand luggage should not weigh more than seven kilograms.",
          "explanationVi": "Bài đọc cho biết đáp án là \"Seven kilograms\", các phương án còn lại không khớp với văn bản."
        },
        {
          "question": "Why might the flight be delayed?",
          "options": [
            "Too many passengers",
            "Bad weather in Madrid",
            "A staff problem",
            "Lost luggage"
          ],
          "correctAnswer": 1,
          "explanation": "The text says due to bad weather in Madrid, the flight may be delayed.",
          "explanationVi": "Dựa vào thông tin trong bài, \"Bad weather in Madrid\" là câu trả lời chính xác."
        },
        {
          "question": "Where is the information desk?",
          "options": [
            "Near gate twelve",
            "Near gate ten",
            "At the entrance",
            "On the plane"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says please speak to a member of staff at the information desk near gate ten.",
          "explanationVi": "Câu trả lời đúng: \"Near gate ten\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        }
      ]
    },
    {
      "passage": "Text message conversation. Hi Kate, are you free this evening? I wanted to ask if you could help me with my English homework, because I do not understand the grammar exercise about the past tense. My brother said he could help, but he is busy working on his own homework tonight. If you are free, maybe we could meet at the library at six o'clock, because it is quiet there and we can both concentrate. I also brought my dictionary in case we need to check any difficult words. If the library is closed, we could also study at my house instead, since my mum said that is fine with her. Please let me know as soon as possible so I can plan my evening. Thanks so much for your help, I really appreciate it! See you soon, Leo.",
      "questions": [
        {
          "question": "Why does Leo need help?",
          "options": [
            "He is bored",
            "He does not understand a grammar exercise",
            "He lost his homework",
            "He wants company"
          ],
          "correctAnswer": 1,
          "explanation": "The message says he does not understand the grammar exercise about the past tense.",
          "explanationVi": "Đáp án đúng là \"He does not understand a grammar exercise\". Thông tin này được nêu trực tiếp trong bài đọc."
        },
        {
          "question": "Why can't Leo's brother help?",
          "options": [
            "He is not good at English",
            "He is busy with his own homework",
            "He is out",
            "He does not like grammar"
          ],
          "correctAnswer": 1,
          "explanation": "The text says his brother is busy working on his own homework tonight.",
          "explanationVi": "Chọn \"He is busy with his own homework\" vì bài đọc nói rõ chi tiết này."
        },
        {
          "question": "Where does Leo suggest meeting first?",
          "options": [
            "His house",
            "Kate's house",
            "The library",
            "School"
          ],
          "correctAnswer": 2,
          "explanation": "The passage says maybe we could meet at the library at six o'clock.",
          "explanationVi": "Bài đọc cho biết đáp án là \"The library\", các phương án còn lại không khớp với văn bản."
        },
        {
          "question": "What did Leo bring with him?",
          "options": [
            "A laptop",
            "A dictionary",
            "A textbook",
            "A pen"
          ],
          "correctAnswer": 1,
          "explanation": "The text says I also brought my dictionary in case we need to check any difficult words.",
          "explanationVi": "Dựa vào thông tin trong bài, \"A dictionary\" là câu trả lời chính xác."
        },
        {
          "question": "What is the alternative plan if the library is closed?",
          "options": [
            "Cancel the study session",
            "Study at Leo's house",
            "Study at school",
            "Study on the phone"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says we could also study at my house instead.",
          "explanationVi": "Câu trả lời đúng: \"Study at Leo's house\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        }
      ]
    }
  ],
  "cambridge-ket-3": [
    {
      "passage": "Jack works as a chef in a busy restaurant in the city centre. He starts work every day at ten in the morning and usually finishes around eleven at night, which means his job requires a lot of energy and patience. Before the restaurant opens for lunch, Jack and his team prepare fresh ingredients and plan the menu for the day, choosing dishes that use seasonal vegetables and fruit. During busy evenings, especially on weekends, the kitchen can become extremely hot and stressful, but Jack says he loves the excitement of cooking for many different customers. On his day off, which is usually a Monday, Jack likes to relax by going fishing with his father at a nearby lake, far away from the noise of the kitchen. He says this quiet hobby helps him forget about work and feel calm again before another busy week begins at the restaurant.",
      "questions": [
        {
          "question": "What time does Jack start work?",
          "options": [
            "Nine in the morning",
            "Ten in the morning",
            "Eleven in the morning",
            "Twelve noon"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says he starts work every day at ten in the morning.",
          "explanationVi": "Đáp án đúng là \"Ten in the morning\". Thông tin này được nêu trực tiếp trong bài đọc."
        },
        {
          "question": "What do Jack and his team do before the restaurant opens?",
          "options": [
            "Clean the tables",
            "Prepare ingredients and plan the menu",
            "Take orders",
            "Wash dishes"
          ],
          "correctAnswer": 1,
          "explanation": "The text says they prepare fresh ingredients and plan the menu for the day.",
          "explanationVi": "Chọn \"Prepare ingredients and plan the menu\" vì bài đọc nói rõ chi tiết này."
        },
        {
          "question": "When is the kitchen extremely busy?",
          "options": [
            "Monday mornings",
            "Weekend evenings",
            "Weekday afternoons",
            "Early mornings"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says during busy evenings, especially on weekends, the kitchen can become extremely hot and stressful.",
          "explanationVi": "Bài đọc cho biết đáp án là \"Weekend evenings\", các phương án còn lại không khớp với văn bản."
        },
        {
          "question": "What is Jack's day off?",
          "options": [
            "Sunday",
            "Saturday",
            "Monday",
            "Friday"
          ],
          "correctAnswer": 2,
          "explanation": "The text says on his day off, which is usually a Monday.",
          "explanationVi": "Dựa vào thông tin trong bài, \"Monday\" là câu trả lời chính xác."
        },
        {
          "question": "What does Jack do to relax?",
          "options": [
            "Watch television",
            "Go fishing with his father",
            "Go shopping",
            "Sleep all day"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says Jack likes to relax by going fishing with his father.",
          "explanationVi": "Câu trả lời đúng: \"Go fishing with his father\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        }
      ]
    },
    {
      "passage": "Volunteering at the Animal Shelter. Many people in our town spend their free time helping at the local animal shelter, which looks after dogs and cats that have no home. Volunteers usually work for a few hours each week, feeding the animals, cleaning their cages, and taking the dogs for walks in the nearby park. New volunteers must first attend a short training session to learn how to handle the animals safely and calmly, since some of them may feel frightened after being abandoned by their previous owners. The shelter always needs more volunteers, especially at weekends when many families visit to consider adopting a pet. One volunteer, Maria, said that although the work can sometimes be tiring, seeing an animal find a loving new home makes all the hard work completely worth it. She has been volunteering there every Saturday for the past two years and hopes to continue for a long time.",
      "questions": [
        {
          "question": "What do volunteers do at the shelter?",
          "options": [
            "Only clean cages",
            "Feed animals, clean cages and walk dogs",
            "Sell pets",
            "Train new staff"
          ],
          "correctAnswer": 1,
          "explanation": "The passage lists feeding the animals, cleaning their cages, and taking the dogs for walks.",
          "explanationVi": "Đáp án đúng là \"Feed animals, clean cages and walk dogs\". Thông tin này được nêu trực tiếp trong bài đọc."
        },
        {
          "question": "Why must new volunteers attend training?",
          "options": [
            "To learn to cook",
            "To learn how to handle animals safely",
            "To get paid",
            "To meet the manager"
          ],
          "correctAnswer": 1,
          "explanation": "The text says to learn how to handle the animals safely and calmly.",
          "explanationVi": "Chọn \"To learn how to handle animals safely\" vì bài đọc nói rõ chi tiết này."
        },
        {
          "question": "When does the shelter need more volunteers most?",
          "options": [
            "Weekday mornings",
            "Weekends",
            "Every evening",
            "Only in summer"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says the shelter always needs more volunteers, especially at weekends.",
          "explanationVi": "Bài đọc cho biết đáp án là \"Weekends\", các phương án còn lại không khớp với văn bản."
        },
        {
          "question": "How long has Maria been volunteering?",
          "options": [
            "One year",
            "Two years",
            "Six months",
            "Five years"
          ],
          "correctAnswer": 1,
          "explanation": "The text says she has been volunteering there every Saturday for the past two years.",
          "explanationVi": "Dựa vào thông tin trong bài, \"Two years\" là câu trả lời chính xác."
        },
        {
          "question": "What makes the work worth it for Maria?",
          "options": [
            "The money",
            "Seeing animals find a loving new home",
            "Free food",
            "Meeting friends"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says seeing an animal find a loving new home makes all the hard work completely worth it.",
          "explanationVi": "Câu trả lời đúng: \"Seeing animals find a loving new home\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        }
      ]
    }
  ],
  "cambridge-ket-4": [
    {
      "passage": "Notice: Changes to the Number 12 Bus Route. Passengers are informed that from next Monday, the number 12 bus route will change because of building work on Main Street. The bus will no longer stop outside the town hall; instead, it will stop on Park Road, which is about a five-minute walk from the town hall. This change is expected to last for about six weeks while the road repairs are completed. During this time, buses may also take a little longer to complete their journey, so passengers are advised to leave home a few minutes earlier than usual. Free timetables showing the new stops are available at the bus station office or can be downloaded from the city transport website. We apologise for any inconvenience this may cause and thank passengers for their patience while the important road work is finished.",
      "questions": [
        {
          "question": "Why is the bus route changing?",
          "options": [
            "New buses are arriving",
            "Building work on Main Street",
            "The town hall is closed",
            "Fewer passengers"
          ],
          "correctAnswer": 1,
          "explanation": "The notice says the route will change because of building work on Main Street.",
          "explanationVi": "Đáp án đúng là \"Building work on Main Street\". Thông tin này được nêu trực tiếp trong bài đọc."
        },
        {
          "question": "Where will the bus stop instead of the town hall?",
          "options": [
            "Park Road",
            "Main Street",
            "The bus station",
            "School Road"
          ],
          "correctAnswer": 0,
          "explanation": "The text says it will stop on Park Road instead.",
          "explanationVi": "Chọn \"Park Road\" vì bài đọc nói rõ chi tiết này."
        },
        {
          "question": "How long will the change last?",
          "options": [
            "Two weeks",
            "Six weeks",
            "Three months",
            "One year"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says this change is expected to last for about six weeks.",
          "explanationVi": "Bài đọc cho biết đáp án là \"Six weeks\", các phương án còn lại không khớp với văn bản."
        },
        {
          "question": "What are passengers advised to do?",
          "options": [
            "Take a taxi instead",
            "Leave home a few minutes earlier",
            "Walk to work",
            "Avoid the bus completely"
          ],
          "correctAnswer": 1,
          "explanation": "The text says passengers are advised to leave home a few minutes earlier than usual.",
          "explanationVi": "Dựa vào thông tin trong bài, \"Leave home a few minutes earlier\" là câu trả lời chính xác."
        },
        {
          "question": "Where can passengers find the new timetable?",
          "options": [
            "Only online",
            "At the bus station office or online",
            "At the town hall",
            "On the bus"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says free timetables are available at the bus station office or can be downloaded from the website.",
          "explanationVi": "Câu trả lời đúng: \"At the bus station office or online\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        }
      ]
    },
    {
      "passage": "Living in a big city has many advantages, but it also has some problems, especially when it comes to transport. In our city, more and more people are choosing to travel by bicycle instead of by car, because it is cheaper, better for the environment, and often faster during busy traffic hours. Last year, the city government built two hundred kilometres of new cycle paths to make cycling safer for everyone, including children going to school. However, some people still complain that certain streets do not have enough space for both cars and bicycles, which can be dangerous for cyclists. The government has promised to build even more cycle paths next year and to add more traffic lights especially for cyclists at busy crossings. Many residents believe that if the city continues improving its transport system, fewer people will need to use cars in the future, making the air cleaner for everyone.",
      "questions": [
        {
          "question": "Why are more people cycling instead of driving?",
          "options": [
            "It is more comfortable",
            "It is cheaper, better for the environment and often faster",
            "Cars are banned",
            "It is required by law"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says it is cheaper, better for the environment, and often faster during busy traffic hours.",
          "explanationVi": "Đáp án đúng là \"It is cheaper, better for the environment and often faster\". Thông tin này được nêu trực tiếp trong bài đọc."
        },
        {
          "question": "What did the city government build last year?",
          "options": [
            "New roads for cars",
            "Two hundred kilometres of new cycle paths",
            "A new train station",
            "More car parks"
          ],
          "correctAnswer": 1,
          "explanation": "The text says the city government built two hundred kilometres of new cycle paths.",
          "explanationVi": "Chọn \"Two hundred kilometres of new cycle paths\" vì bài đọc nói rõ chi tiết này."
        },
        {
          "question": "What do some people complain about?",
          "options": [
            "Too many cycle paths",
            "Not enough space for cars and bicycles on some streets",
            "Too few cars",
            "Expensive bicycles"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says some people complain that certain streets do not have enough space for both cars and bicycles.",
          "explanationVi": "Bài đọc cho biết đáp án là \"Not enough space for cars and bicycles on some streets\", các phương án còn lại không khớp với văn bản."
        },
        {
          "question": "What has the government promised for next year?",
          "options": [
            "To ban bicycles",
            "To build more cycle paths and traffic lights for cyclists",
            "To remove cycle paths",
            "To close busy streets"
          ],
          "correctAnswer": 1,
          "explanation": "The text says the government has promised to build even more cycle paths next year and to add more traffic lights for cyclists.",
          "explanationVi": "Dựa vào thông tin trong bài, \"To build more cycle paths and traffic lights for cyclists\" là câu trả lời chính xác."
        },
        {
          "question": "What do many residents believe will happen if transport improves?",
          "options": [
            "More people will drive",
            "Fewer people will need cars, making the air cleaner",
            "The city will become smaller",
            "Traffic will get worse"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says fewer people will need to use cars in the future, making the air cleaner for everyone.",
          "explanationVi": "Câu trả lời đúng: \"Fewer people will need cars, making the air cleaner\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        }
      ]
    }
  ],
  "cambridge-ket-5": [
    {
      "passage": "Dear Tom, I hope you are enjoying your summer holidays. I am writing to tell you about the trip my family took to the mountains last week. We stayed in a small wooden cabin near a lake, far away from the noise of the city. Every morning, my dad and I went fishing early before breakfast, and although we did not catch many fish, it was still relaxing and fun. In the afternoons, we went hiking along different mountain paths, and one day we even saw some wild deer close to the trail, which was really exciting. The weather was mostly sunny, but one evening there was a big storm, so we stayed inside the cabin, played card games and told funny stories by candlelight. On our last day, we visited a small village nearby and bought some handmade souvenirs for our friends and family. I really hope you can join us next time we go, because I think you would love the mountains as much as I did. Write back soon and tell me about your holiday plans. Best wishes, Emma.",
      "questions": [
        {
          "question": "Where did Emma's family stay?",
          "options": [
            "In a hotel",
            "In a wooden cabin near a lake",
            "In a tent",
            "In a city apartment"
          ],
          "correctAnswer": 1,
          "explanation": "The letter says we stayed in a small wooden cabin near a lake.",
          "explanationVi": "Đáp án đúng là \"In a wooden cabin near a lake\". Thông tin này được nêu trực tiếp trong bài đọc."
        },
        {
          "question": "What did Emma and her dad do every morning?",
          "options": [
            "Went hiking",
            "Went fishing before breakfast",
            "Cooked breakfast",
            "Slept late"
          ],
          "correctAnswer": 1,
          "explanation": "The text says every morning, my dad and I went fishing early before breakfast.",
          "explanationVi": "Chọn \"Went fishing before breakfast\" vì bài đọc nói rõ chi tiết này."
        },
        {
          "question": "What did they see on the hiking trail?",
          "options": [
            "A bear",
            "Wild deer",
            "A river",
            "A waterfall"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says one day we even saw some wild deer close to the trail.",
          "explanationVi": "Bài đọc cho biết đáp án là \"Wild deer\", các phương án còn lại không khớp với văn bản."
        },
        {
          "question": "What did they do during the storm?",
          "options": [
            "Went outside",
            "Played card games and told stories",
            "Went to the village",
            "Went fishing"
          ],
          "correctAnswer": 1,
          "explanation": "The text says they stayed inside, played card games and told funny stories by candlelight.",
          "explanationVi": "Dựa vào thông tin trong bài, \"Played card games and told stories\" là câu trả lời chính xác."
        },
        {
          "question": "What did they do on the last day?",
          "options": [
            "Went fishing again",
            "Visited a small village and bought souvenirs",
            "Stayed in the cabin",
            "Went hiking again"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says on our last day, we visited a small village nearby and bought some handmade souvenirs.",
          "explanationVi": "Câu trả lời đúng: \"Visited a small village and bought souvenirs\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        }
      ]
    },
    {
      "passage": "Free Time Survey Results. Last month, our school magazine asked two hundred students how they like to spend their free time after school and at weekends. The results showed that the most popular activity was playing computer or video games, chosen by almost a third of students. The second most popular activity was playing sport, especially football and basketball, which many students said helped them relax and stay fit after a long day at school. Reading books came in third place, with students saying they enjoyed adventure and mystery stories the most. Surprisingly, only a small number of students said they liked watching television, which used to be much more popular in the past. Many students also mentioned that they enjoy spending time with friends, whether meeting at someone's house, going to the park, or simply chatting online in the evenings. The magazine editor said the results show that young people today have many different ways to relax and enjoy their free time.",
      "questions": [
        {
          "question": "What was the most popular free time activity?",
          "options": [
            "Reading books",
            "Watching television",
            "Playing computer or video games",
            "Meeting friends"
          ],
          "correctAnswer": 2,
          "explanation": "The passage says the most popular activity was playing computer or video games.",
          "explanationVi": "Đáp án đúng là \"Playing computer or video games\". Thông tin này được nêu trực tiếp trong bài đọc."
        },
        {
          "question": "Why do students like playing sport?",
          "options": [
            "It is cheap",
            "It helps them relax and stay fit",
            "It is easy",
            "Teachers require it"
          ],
          "correctAnswer": 1,
          "explanation": "The text says students said it helped them relax and stay fit after a long day at school.",
          "explanationVi": "Chọn \"It helps them relax and stay fit\" vì bài đọc nói rõ chi tiết này."
        },
        {
          "question": "What kind of books do students enjoy most?",
          "options": [
            "Fairy tales",
            "Adventure and mystery stories",
            "Science books",
            "History books"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says students said they enjoyed adventure and mystery stories the most.",
          "explanationVi": "Bài đọc cho biết đáp án là \"Adventure and mystery stories\", các phương án còn lại không khớp với văn bản."
        },
        {
          "question": "What activity has become less popular than before?",
          "options": [
            "Playing sport",
            "Watching television",
            "Playing video games",
            "Meeting friends"
          ],
          "correctAnswer": 1,
          "explanation": "The text says only a small number of students said they liked watching television, which used to be much more popular.",
          "explanationVi": "Dựa vào thông tin trong bài, \"Watching television\" là câu trả lời chính xác."
        },
        {
          "question": "How do students spend time with friends?",
          "options": [
            "Only at school",
            "Meeting at houses, going to the park, or chatting online",
            "Only by phone calls",
            "Only on weekends"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says whether meeting at someone's house, going to the park, or simply chatting online.",
          "explanationVi": "Câu trả lời đúng: \"Meeting at houses, going to the park, or chatting online\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        }
      ]
    }
  ],
  "cambridge-pet-1": [
    {
      "passage": "A Year Without a Smartphone. When Daniel decided to spend a whole year without a smartphone, his friends were convinced he would give up within a fortnight. At first, the change was genuinely difficult: he missed group messages, arrived late because he could not check bus timetables, and had to write directions on paper before leaving the house. After about six weeks, however, he noticed unexpected benefits. He was sleeping far better, because he no longer scrolled through videos in bed, and he was reading two or three books a month instead of one every six months. He also began speaking to strangers again, asking shopkeepers and neighbours for information he would once have looked up online. Daniel admits the experiment was not entirely practical, particularly at work, where colleagues expected instant replies, so he eventually bought a simple phone that could only make calls and send short messages. He now believes the point was never to reject technology completely, but to decide for himself when to use it.",
      "questions": [
        {
          "question": "What did Daniel's friends expect?",
          "options": [
            "That he would succeed easily",
            "That he would stop after two weeks",
            "That he would buy a better phone",
            "That he would move away"
          ],
          "correctAnswer": 1,
          "explanation": "The text says his friends were convinced he would give up within a fortnight, which means two weeks.",
          "explanationVi": "Đáp án đúng là \"That he would stop after two weeks\". Thông tin này được nêu trực tiếp trong bài đọc."
        },
        {
          "question": "What problem did Daniel have at the start?",
          "options": [
            "He could not sleep at all",
            "He lost his job",
            "He was late because he could not check timetables",
            "He forgot how to read"
          ],
          "correctAnswer": 2,
          "explanation": "The passage says he arrived late because he could not check bus timetables.",
          "explanationVi": "Chọn \"He was late because he could not check timetables\" vì bài đọc nói rõ chi tiết này."
        },
        {
          "question": "Why did Daniel start sleeping better?",
          "options": [
            "He went to bed earlier",
            "He stopped scrolling through videos in bed",
            "He took medicine",
            "He stopped reading books"
          ],
          "correctAnswer": 1,
          "explanation": "The text explains he was sleeping far better because he no longer scrolled through videos in bed.",
          "explanationVi": "Bài đọc cho biết đáp án là \"He stopped scrolling through videos in bed\", các phương án còn lại không khớp với văn bản."
        },
        {
          "question": "What is Daniel's conclusion?",
          "options": [
            "Technology should be rejected completely",
            "Smartphones are always harmful",
            "People should choose when to use technology",
            "Simple phones are useless"
          ],
          "correctAnswer": 2,
          "explanation": "In the final sentence he says the point was to decide for himself when to use technology.",
          "explanationVi": "Dựa vào thông tin trong bài, \"People should choose when to use technology\" là câu trả lời chính xác."
        },
        {
          "question": "Why did Daniel buy a simple phone?",
          "options": [
            "Because work colleagues expected quick replies",
            "Because it was cheaper",
            "Because he wanted to take photos",
            "Because his friends asked him to"
          ],
          "correctAnswer": 0,
          "explanation": "The passage says the experiment was not practical at work, where colleagues expected instant replies.",
          "explanationVi": "Câu trả lời đúng: \"Because work colleagues expected quick replies\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        }
      ]
    },
    {
      "passage": "Community Repair Cafe. Every second Saturday, the hall next to the town library turns into a repair cafe, where volunteers help residents mend items instead of throwing them away. Visitors bring broken toasters, torn jackets, wobbly chairs and laptops that no longer start, and sit beside a volunteer who explains each step of the repair rather than doing the work for them. The organisers insist on this approach because their aim is to pass on skills, not simply to fix objects. Tools, thread and common spare parts are provided free of charge, although donations are welcome and pay for replacement equipment. Roughly seven out of ten items are successfully repaired on the day; the rest are either recorded for a specialist to look at or taken apart so that useful components can be saved. According to the organisers, the cafe has kept several tonnes of waste out of local bins since it opened, but the most popular result is social: people who arrive as strangers often stay for coffee long after their repairs are finished.",
      "questions": [
        {
          "question": "How often does the repair cafe open?",
          "options": [
            "Every Saturday",
            "Twice a month",
            "Once every two weeks",
            "Once a month"
          ],
          "correctAnswer": 2,
          "explanation": "The text says it happens every second Saturday, that is once every two weeks.",
          "explanationVi": "Đáp án đúng là \"Once every two weeks\". Thông tin này được nêu trực tiếp trong bài đọc."
        },
        {
          "question": "Why do volunteers explain each step?",
          "options": [
            "Because they are not allowed to touch tools",
            "Because they want to teach skills",
            "Because repairs are dangerous",
            "Because they are too busy"
          ],
          "correctAnswer": 1,
          "explanation": "The passage says their aim is to pass on skills, not simply to fix objects.",
          "explanationVi": "Chọn \"Because they want to teach skills\" vì bài đọc nói rõ chi tiết này."
        },
        {
          "question": "What happens to items that cannot be repaired?",
          "options": [
            "They are thrown away immediately",
            "They are sold to visitors",
            "They are recorded for a specialist or taken apart for parts",
            "They are returned unopened"
          ],
          "correctAnswer": 2,
          "explanation": "The text says the rest are recorded for a specialist or taken apart so useful components can be saved.",
          "explanationVi": "Bài đọc cho biết đáp án là \"They are recorded for a specialist or taken apart for parts\", các phương án còn lại không khớp với văn bản."
        },
        {
          "question": "What are donations used for?",
          "options": [
            "Paying the volunteers",
            "Buying replacement equipment",
            "Renting the library",
            "Providing free coffee"
          ],
          "correctAnswer": 1,
          "explanation": "The passage states donations are welcome and pay for replacement equipment.",
          "explanationVi": "Dựa vào thông tin trong bài, \"Buying replacement equipment\" là câu trả lời chính xác."
        },
        {
          "question": "What do the organisers consider the best result?",
          "options": [
            "The money collected",
            "The number of tools bought",
            "The social contact between people",
            "The publicity in newspapers"
          ],
          "correctAnswer": 2,
          "explanation": "The final sentence says the most popular result is social, as strangers stay for coffee together.",
          "explanationVi": "Câu trả lời đúng: \"The social contact between people\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        }
      ]
    }
  ],
  "cambridge-pet-2": [
    {
      "passage": "Learning to Cook at Sixteen. Priya had never cooked anything more complicated than pasta until her mother started evening shifts at the hospital. Suddenly she was responsible for feeding herself and her younger brother four nights a week. Her first attempts were discouraging: rice that stuck to the pan, vegetables cooked until they lost all colour, and a curry so salty that even her brother refused a second spoonful. Instead of giving up, Priya began writing down what went wrong and asked her grandmother to explain the basics over the phone, particularly how much heat different ingredients need. Within two months she could prepare six reliable meals, and she found that planning the shopping on Sunday saved both money and arguments. Her brother now helps by washing and chopping vegetables, which he claims is the only useful skill he learned that year. Priya says the biggest change is not the cooking itself but her confidence: she no longer assumes that a new practical task is beyond her.",
      "questions": [
        {
          "question": "Why did Priya have to start cooking?",
          "options": [
            "She joined a cooking club",
            "Her mother began working evening shifts",
            "Her brother refused to eat out",
            "She moved to another city"
          ],
          "correctAnswer": 1,
          "explanation": "The passage explains her mother started evening shifts at the hospital.",
          "explanationVi": "Đáp án đúng là \"Her mother began working evening shifts\". Thông tin này được nêu trực tiếp trong bài đọc."
        },
        {
          "question": "What was wrong with her first curry?",
          "options": [
            "It was too cold",
            "It was too salty",
            "It contained no vegetables",
            "It was undercooked"
          ],
          "correctAnswer": 1,
          "explanation": "The text says the curry was so salty that even her brother refused a second spoonful.",
          "explanationVi": "Chọn \"It was too salty\" vì bài đọc nói rõ chi tiết này."
        },
        {
          "question": "How did Priya improve?",
          "options": [
            "She followed videos only",
            "She attended a college course",
            "She noted her mistakes and asked her grandmother for advice",
            "She hired a cook"
          ],
          "correctAnswer": 2,
          "explanation": "She began writing down what went wrong and asked her grandmother to explain the basics.",
          "explanationVi": "Bài đọc cho biết đáp án là \"She noted her mistakes and asked her grandmother for advice\", các phương án còn lại không khớp với văn bản."
        },
        {
          "question": "What benefit did planning the shopping bring?",
          "options": [
            "More free time at school",
            "Saving money and avoiding arguments",
            "Better marks in exams",
            "A part-time job"
          ],
          "correctAnswer": 1,
          "explanation": "The text says planning the shopping on Sunday saved both money and arguments.",
          "explanationVi": "Dựa vào thông tin trong bài, \"Saving money and avoiding arguments\" là câu trả lời chính xác."
        },
        {
          "question": "What does Priya value most from the experience?",
          "options": [
            "Her cooking speed",
            "Her brother's help",
            "Her increased confidence",
            "Her grandmother's recipes"
          ],
          "correctAnswer": 2,
          "explanation": "She says the biggest change is her confidence with new practical tasks.",
          "explanationVi": "Câu trả lời đúng: \"Her increased confidence\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        }
      ]
    },
    {
      "passage": "The Return of the Night Train. For several decades, night trains across Europe were closing down, unable to compete with cheap flights. Recently, though, several routes have reopened, and tickets often sell out within days. Part of the explanation is environmental: a sleeper journey produces a small fraction of the emissions of an equivalent flight, and many travellers now consider this when booking. There are practical arguments too. Passengers board in a city centre in the evening and wake in another city centre in the morning, avoiding both airport queues and the cost of a hotel night. Operators admit the business is complicated, because a sleeper carriage carries far fewer passengers than a seated one and must be cleaned and staffed overnight. To make the finances work, companies are offering several levels of comfort, from shared compartments with six bunks to private rooms with a shower. Critics point out that fares remain higher than budget flights, but demand suggests a growing number of travellers are willing to pay for a slower, quieter journey.",
      "questions": [
        {
          "question": "Why did night trains decline in the past?",
          "options": [
            "Trains were too slow for freight",
            "They could not compete with cheap flights",
            "Governments banned them",
            "Passengers preferred buses"
          ],
          "correctAnswer": 1,
          "explanation": "The text says night trains were unable to compete with cheap flights.",
          "explanationVi": "Đáp án đúng là \"They could not compete with cheap flights\". Thông tin này được nêu trực tiếp trong bài đọc."
        },
        {
          "question": "What environmental point is made?",
          "options": [
            "Sleepers use no electricity",
            "Sleepers emit far less than flights",
            "Flights are quieter",
            "Trains are always full"
          ],
          "correctAnswer": 1,
          "explanation": "A sleeper journey produces a small fraction of the emissions of an equivalent flight.",
          "explanationVi": "Chọn \"Sleepers emit far less than flights\" vì bài đọc nói rõ chi tiết này."
        },
        {
          "question": "What practical advantage do sleepers offer?",
          "options": [
            "Free meals for everyone",
            "No need for tickets",
            "City-centre departures and no hotel night",
            "Shorter travel time than planes"
          ],
          "correctAnswer": 2,
          "explanation": "Passengers board and arrive in city centres and avoid the cost of a hotel night.",
          "explanationVi": "Bài đọc cho biết đáp án là \"City-centre departures and no hotel night\", các phương án còn lại không khớp với văn bản."
        },
        {
          "question": "Why is the business complicated for operators?",
          "options": [
            "Sleeper carriages carry fewer passengers and need overnight staff",
            "Passengers refuse to book online",
            "Tracks close at night",
            "Tickets cannot be priced"
          ],
          "correctAnswer": 0,
          "explanation": "The passage explains a sleeper carriage carries far fewer passengers and must be cleaned and staffed overnight.",
          "explanationVi": "Dựa vào thông tin trong bài, \"Sleeper carriages carry fewer passengers and need overnight staff\" là câu trả lời chính xác."
        },
        {
          "question": "What do critics say?",
          "options": [
            "The trains are unsafe",
            "Fares are still higher than budget flights",
            "The routes are too short",
            "Nobody wants private rooms"
          ],
          "correctAnswer": 1,
          "explanation": "Critics point out that fares remain higher than budget flights.",
          "explanationVi": "Câu trả lời đúng: \"Fares are still higher than budget flights\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        }
      ]
    }
  ],
  "cambridge-pet-3": [
    {
      "passage": "Volunteering Abroad: Read the Small Print. Advertisements for volunteer projects abroad promise the chance to teach children, protect turtles or build classrooms while travelling. Such programmes can be valuable, but experienced organisations advise young applicants to ask careful questions before paying a fee. The first question is what happens to the money: a responsible project explains how much covers accommodation, training and local salaries, and how much goes to the agency. The second is whether the work is genuinely needed. Building projects that replace paid local workers, or short placements in orphanages where children meet a new stranger every fortnight, may do more harm than good. Length of stay matters as well, since most useful roles require at least a month to be worth the training involved. Finally, applicants should check what support exists if something goes wrong: a named local contact, insurance and a clear complaints procedure. Volunteers who ask these questions often report a more rewarding experience, because they arrive with realistic expectations rather than a holiday brochure in their heads.",
      "questions": [
        {
          "question": "What should applicants ask first?",
          "options": [
            "How hot the weather is",
            "How the fee is spent",
            "Whether flights are included",
            "How many photos they can take"
          ],
          "correctAnswer": 1,
          "explanation": "The text says the first question is what happens to the money.",
          "explanationVi": "Đáp án đúng là \"How the fee is spent\". Thông tin này được nêu trực tiếp trong bài đọc."
        },
        {
          "question": "Why can some building projects be harmful?",
          "options": [
            "They use expensive materials",
            "They replace paid local workers",
            "They take place in cities",
            "They last too long"
          ],
          "correctAnswer": 1,
          "explanation": "The passage warns about projects that replace paid local workers.",
          "explanationVi": "Chọn \"They replace paid local workers\" vì bài đọc nói rõ chi tiết này."
        },
        {
          "question": "What is the problem with short orphanage placements?",
          "options": [
            "Children meet a new stranger every two weeks",
            "Volunteers are not paid",
            "The buildings are unsafe",
            "Teachers dislike volunteers"
          ],
          "correctAnswer": 0,
          "explanation": "The text criticises short placements where children meet a new stranger every fortnight.",
          "explanationVi": "Bài đọc cho biết đáp án là \"Children meet a new stranger every two weeks\", các phương án còn lại không khớp với văn bản."
        },
        {
          "question": "How long should a useful placement last?",
          "options": [
            "A weekend",
            "About a week",
            "At least a month",
            "At least a year"
          ],
          "correctAnswer": 2,
          "explanation": "Most useful roles require at least a month to be worth the training involved.",
          "explanationVi": "Dựa vào thông tin trong bài, \"At least a month\" là câu trả lời chính xác."
        },
        {
          "question": "What support should volunteers check for?",
          "options": [
            "A free guidebook",
            "A local contact, insurance and a complaints procedure",
            "A daily allowance",
            "A language certificate"
          ],
          "correctAnswer": 1,
          "explanation": "The passage lists a named local contact, insurance and a clear complaints procedure.",
          "explanationVi": "Câu trả lời đúng: \"A local contact, insurance and a complaints procedure\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        }
      ]
    },
    {
      "passage": "Why Museums Are Getting Quieter. Several major museums have introduced 'quiet hours', when lighting is softened, announcements are switched off and visitor numbers are limited. The idea began as a service for visitors who find noise and crowds distressing, including autistic children and people with sensory difficulties, but it has proved surprisingly popular with the general public. Staff report that during quiet hours visitors spend longer in front of individual objects and ask more detailed questions. Some galleries have gone further, removing background music from exhibitions altogether after surveys showed that most people could not remember the music yet felt tired more quickly when it was playing. Not everyone approves: a few curators worry that silence makes galleries feel formal and unwelcoming to families, and that limiting numbers reduces income on busy weekends. Most museums therefore keep quiet hours to one morning a week, treating them as one option among many rather than a new rule for the whole building.",
      "questions": [
        {
          "question": "Who were quiet hours originally designed for?",
          "options": [
            "School groups",
            "Visitors who find noise and crowds distressing",
            "Museum staff",
            "Tourists from abroad"
          ],
          "correctAnswer": 1,
          "explanation": "The idea began as a service for visitors who find noise and crowds distressing.",
          "explanationVi": "Đáp án đúng là \"Visitors who find noise and crowds distressing\". Thông tin này được nêu trực tiếp trong bài đọc."
        },
        {
          "question": "What do staff notice during quiet hours?",
          "options": [
            "Visitors leave earlier",
            "Visitors look at objects longer and ask more questions",
            "Fewer children attend",
            "More items are damaged"
          ],
          "correctAnswer": 1,
          "explanation": "Staff report visitors spend longer in front of objects and ask more detailed questions.",
          "explanationVi": "Chọn \"Visitors look at objects longer and ask more questions\" vì bài đọc nói rõ chi tiết này."
        },
        {
          "question": "Why did some galleries remove background music?",
          "options": [
            "It was too expensive",
            "Visitors felt tired more quickly with it",
            "Musicians complained",
            "It broke the speakers"
          ],
          "correctAnswer": 1,
          "explanation": "Surveys showed people could not remember the music yet felt tired more quickly when it played.",
          "explanationVi": "Bài đọc cho biết đáp án là \"Visitors felt tired more quickly with it\", các phương án còn lại không khớp với văn bản."
        },
        {
          "question": "What worries some curators?",
          "options": [
            "Galleries may feel formal and unwelcoming",
            "Visitors will talk too loudly",
            "Lighting costs will rise",
            "Exhibitions will close"
          ],
          "correctAnswer": 0,
          "explanation": "A few curators worry that silence makes galleries feel formal and unwelcoming to families.",
          "explanationVi": "Dựa vào thông tin trong bài, \"Galleries may feel formal and unwelcoming\" là câu trả lời chính xác."
        },
        {
          "question": "How often do most museums hold quiet hours?",
          "options": [
            "Every day",
            "One morning a week",
            "Only in winter",
            "Twice a day"
          ],
          "correctAnswer": 1,
          "explanation": "Most museums keep quiet hours to one morning a week.",
          "explanationVi": "Câu trả lời đúng: \"One morning a week\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        }
      ]
    }
  ],
  "cambridge-pet-5": [
    {
      "passage": "The Student Who Fixed the School Bus Route. When Mateo missed his first lesson three times in one week, he did not simply complain about the school bus. He borrowed a stopwatch, recorded the arrival time at every stop for a month and drew a simple graph. The data showed that the delay always began at the same junction, where the bus turned left across heavy morning traffic. Mateo suggested reversing the direction of the route so that the bus turned right instead, and presented his graph to the head teacher and the transport company. The company was doubtful at first, arguing that parents were used to the existing order of stops, but agreed to a two-week trial. Average arrival time improved by nine minutes, and the change was made permanent the following term. Mateo says the lesson was not about buses at all: adults listen far more carefully when a complaint arrives with evidence attached, and collecting that evidence took him less than ten minutes a day.",
      "questions": [
        {
          "question": "What did Mateo do after missing lessons?",
          "options": [
            "He complained to his parents",
            "He recorded arrival times for a month",
            "He walked to school instead",
            "He changed schools"
          ],
          "correctAnswer": 1,
          "explanation": "He borrowed a stopwatch and recorded the arrival time at every stop for a month.",
          "explanationVi": "Đáp án đúng là \"He recorded arrival times for a month\". Thông tin này được nêu trực tiếp trong bài đọc."
        },
        {
          "question": "What did the data reveal?",
          "options": [
            "The bus was too small",
            "The driver started late",
            "The delay began at one junction",
            "Students boarded slowly"
          ],
          "correctAnswer": 2,
          "explanation": "The data showed the delay always began at the same junction.",
          "explanationVi": "Chọn \"The delay began at one junction\" vì bài đọc nói rõ chi tiết này."
        },
        {
          "question": "What change did Mateo suggest?",
          "options": [
            "Adding a second bus",
            "Removing two stops",
            "Reversing the route direction",
            "Starting thirty minutes earlier"
          ],
          "correctAnswer": 2,
          "explanation": "He suggested reversing the direction of the route so the bus turned right.",
          "explanationVi": "Bài đọc cho biết đáp án là \"Reversing the route direction\", các phương án còn lại không khớp với văn bản."
        },
        {
          "question": "Why was the company doubtful?",
          "options": [
            "The idea was expensive",
            "Parents were used to the existing order of stops",
            "The roads were closed",
            "The graph was unclear"
          ],
          "correctAnswer": 1,
          "explanation": "The company argued that parents were used to the existing order of stops.",
          "explanationVi": "Dựa vào thông tin trong bài, \"Parents were used to the existing order of stops\" là câu trả lời chính xác."
        },
        {
          "question": "What conclusion does Mateo draw?",
          "options": [
            "Buses are always late",
            "Evidence makes adults listen",
            "Graphs are difficult to draw",
            "Trials never work"
          ],
          "correctAnswer": 1,
          "explanation": "He says adults listen far more carefully when a complaint arrives with evidence attached.",
          "explanationVi": "Câu trả lời đúng: \"Evidence makes adults listen\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        }
      ]
    },
    {
      "passage": "Second-Hand Fashion Goes Mainstream. Ten years ago, buying used clothes was mainly a way to save money. Today, resale apps and vintage shops attract customers who could afford new items but prefer older ones, and the market is growing several times faster than traditional retail. Shoppers give three main reasons. The first is quality: garments made two or three decades ago often use heavier fabric and stronger stitching than fast-fashion equivalents. The second is individuality, since a second-hand rail rarely contains two identical pieces. The third is environmental, because extending the life of a garment by nine months noticeably reduces its overall impact. The trend brings problems as well. Prices for popular vintage brands have risen sharply, which frustrates the shoppers who depend on cheap clothing, and some sellers now buy in bulk from charity shops to resell online at a profit. Campaigners therefore argue that resale should be judged on whether it replaces new purchases, not simply on how fashionable it has become.",
      "questions": [
        {
          "question": "How has second-hand shopping changed?",
          "options": [
            "It is now only for students",
            "It attracts customers who could buy new",
            "It has become more expensive than new clothes",
            "It happens only online"
          ],
          "correctAnswer": 1,
          "explanation": "The text says resale attracts customers who could afford new items but prefer older ones.",
          "explanationVi": "Đáp án đúng là \"It attracts customers who could buy new\". Thông tin này được nêu trực tiếp trong bài đọc."
        },
        {
          "question": "Why do shoppers mention quality?",
          "options": [
            "Older garments use heavier fabric and stronger stitching",
            "Old clothes are always clean",
            "New clothes are illegal",
            "Vintage shops repair items free"
          ],
          "correctAnswer": 0,
          "explanation": "Garments made decades ago often use heavier fabric and stronger stitching.",
          "explanationVi": "Chọn \"Older garments use heavier fabric and stronger stitching\" vì bài đọc nói rõ chi tiết này."
        },
        {
          "question": "What environmental point is made?",
          "options": [
            "Resale removes all pollution",
            "Extending a garment's life reduces its impact",
            "Cotton cannot be recycled",
            "Shipping is free"
          ],
          "correctAnswer": 1,
          "explanation": "Extending the life of a garment by nine months noticeably reduces its overall impact.",
          "explanationVi": "Bài đọc cho biết đáp án là \"Extending a garment's life reduces its impact\", các phương án còn lại không khớp với văn bản."
        },
        {
          "question": "What problem does the trend create?",
          "options": [
            "Shops close early",
            "Prices for popular vintage brands have risen",
            "Clothes are harder to wash",
            "Nobody donates any more"
          ],
          "correctAnswer": 1,
          "explanation": "Prices for popular vintage brands have risen sharply, frustrating shoppers who need cheap clothing.",
          "explanationVi": "Dựa vào thông tin trong bài, \"Prices for popular vintage brands have risen\" là câu trả lời chính xác."
        },
        {
          "question": "What do campaigners argue?",
          "options": [
            "Resale should be banned",
            "Resale should be judged on whether it replaces new purchases",
            "Charity shops should close",
            "Fashion is unimportant"
          ],
          "correctAnswer": 1,
          "explanation": "Campaigners say resale should be judged on whether it replaces new purchases.",
          "explanationVi": "Câu trả lời đúng: \"Resale should be judged on whether it replaces new purchases\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        }
      ]
    }
  ],
  "cambridge-pet-6": [
    {
      "passage": "Sleep and the School Timetable. Several schools have experimented with starting lessons an hour later for older students, and the results are consistent enough to interest education authorities. During adolescence the body clock shifts, so teenagers naturally fall asleep later without becoming less tired in the morning. Where start times moved from eight to nine o'clock, attendance improved, lateness fell and students reported roughly forty extra minutes of sleep each night. Test results in the first lesson of the day also rose, although overall grades changed less than headlines suggested. The difficulty is organisational rather than scientific. Later lessons finish later, which affects sports fixtures, part-time jobs and the shared buses that also carry primary pupils. Some families with younger children found the new timetable harder, because parents had to manage two different school days. Researchers therefore recommend consulting families before changing anything, and warn that a later start helps only if evening screen habits do not simply move later as well.",
      "questions": [
        {
          "question": "Why do teenagers fall asleep later?",
          "options": [
            "They drink more coffee",
            "Their body clock shifts during adolescence",
            "They study at night",
            "They exercise in the evening"
          ],
          "correctAnswer": 1,
          "explanation": "The text explains that during adolescence the body clock shifts.",
          "explanationVi": "Đáp án đúng là \"Their body clock shifts during adolescence\". Thông tin này được nêu trực tiếp trong bài đọc."
        },
        {
          "question": "What improved when lessons started later?",
          "options": [
            "Only sports results",
            "Attendance, lateness and sleep length",
            "Nothing measurable",
            "Only exam grades"
          ],
          "correctAnswer": 1,
          "explanation": "Attendance improved, lateness fell and students reported about forty extra minutes of sleep.",
          "explanationVi": "Chọn \"Attendance, lateness and sleep length\" vì bài đọc nói rõ chi tiết này."
        },
        {
          "question": "What does the writer say about overall grades?",
          "options": [
            "They doubled",
            "They fell sharply",
            "They changed less than headlines suggested",
            "They were not measured"
          ],
          "correctAnswer": 2,
          "explanation": "The passage says overall grades changed less than headlines suggested.",
          "explanationVi": "Bài đọc cho biết đáp án là \"They changed less than headlines suggested\", các phương án còn lại không khớp với văn bản."
        },
        {
          "question": "What is the main difficulty with later starts?",
          "options": [
            "Teachers refuse to teach",
            "Organisational effects on buses, sport and jobs",
            "Classrooms are too small",
            "Students dislike mornings"
          ],
          "correctAnswer": 1,
          "explanation": "The difficulty is organisational: sports fixtures, part-time jobs and shared buses are affected.",
          "explanationVi": "Dựa vào thông tin trong bài, \"Organisational effects on buses, sport and jobs\" là câu trả lời chính xác."
        },
        {
          "question": "What warning do researchers give?",
          "options": [
            "Screens must be banned completely",
            "A later start helps only if evening screen habits do not move later too",
            "Sleep does not affect learning",
            "Primary pupils need later starts most"
          ],
          "correctAnswer": 1,
          "explanation": "Researchers warn a later start helps only if evening screen habits do not simply move later as well.",
          "explanationVi": "Câu trả lời đúng: \"A later start helps only if evening screen habits do not move later too\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        }
      ]
    },
    {
      "passage": "The Rebuilt Town Market. After a fire destroyed the covered market in 2019, the council had to decide whether to rebuild it or sell the land. Traders campaigned hard, collecting eleven thousand signatures and arguing that the market supported around ninety small businesses, most of them family-run. The new building, opened last spring, keeps the original iron roof frame, which survived the fire, but adds insulation, better drainage and a shared cold store that individual traders could never have afforded alone. Rents were set slightly higher than before, and a small number of older traders decided to retire rather than move back. In their place the council reserved eight stalls at reduced rent for new businesses in their first two years, a scheme that has already attracted a bakery, a repair workshop and a stall selling food made from vegetables that supermarkets reject for being the wrong shape. Visitor numbers are now above the level recorded before the fire, though traders note that success depends on the surrounding streets staying open to pedestrians.",
      "questions": [
        {
          "question": "What decision did the council face after the fire?",
          "options": [
            "Whether to rebuild or sell the land",
            "Whether to raise taxes",
            "Whether to close the streets",
            "Whether to move the market abroad"
          ],
          "correctAnswer": 0,
          "explanation": "The council had to decide whether to rebuild the market or sell the land.",
          "explanationVi": "Đáp án đúng là \"Whether to rebuild or sell the land\". Thông tin này được nêu trực tiếp trong bài đọc."
        },
        {
          "question": "How did traders campaign?",
          "options": [
            "By closing their stalls",
            "By collecting eleven thousand signatures",
            "By writing to newspapers only",
            "By offering free food"
          ],
          "correctAnswer": 1,
          "explanation": "Traders collected eleven thousand signatures and argued the market supported ninety businesses.",
          "explanationVi": "Chọn \"By collecting eleven thousand signatures\" vì bài đọc nói rõ chi tiết này."
        },
        {
          "question": "What was kept from the old market?",
          "options": [
            "The wooden floor",
            "The iron roof frame",
            "The old rents",
            "The cold store"
          ],
          "correctAnswer": 1,
          "explanation": "The new building keeps the original iron roof frame, which survived the fire.",
          "explanationVi": "Bài đọc cho biết đáp án là \"The iron roof frame\", các phương án còn lại không khớp với văn bản."
        },
        {
          "question": "Why did some older traders not return?",
          "options": [
            "The building was too far away",
            "Rents were slightly higher and they chose to retire",
            "They lost their licences",
            "The market opened at night"
          ],
          "correctAnswer": 1,
          "explanation": "Rents were set slightly higher and a small number of older traders decided to retire.",
          "explanationVi": "Dựa vào thông tin trong bài, \"Rents were slightly higher and they chose to retire\" là câu trả lời chính xác."
        },
        {
          "question": "What do traders say success depends on?",
          "options": [
            "Lower rents every year",
            "The surrounding streets staying open to pedestrians",
            "More parking spaces",
            "Longer opening hours"
          ],
          "correctAnswer": 1,
          "explanation": "Traders note that success depends on the surrounding streets staying open to pedestrians.",
          "explanationVi": "Câu trả lời đúng: \"The surrounding streets staying open to pedestrians\". Hãy tìm lại câu chứa thông tin này trong bài đọc."
        }
      ]
    }
  ]
};
