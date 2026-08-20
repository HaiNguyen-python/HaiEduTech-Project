export interface TestCase {
  input: string;
  expected: string;
  description: string;
}

export interface PythonChallenge {
  id: string;
  number: number;
  title: string;
  titleVi: string;
  difficulty: "easy" | "medium" | "hard";
  section: string;
  description: string;
  descriptionVi: string;
  expectedOutput: string;
  hints: string[];
  starterCode: string;
  solution: string;
  testCases: TestCase[];
  tags: string[];
}

export const pythonChallenges: PythonChallenge[] = [
  {
    "id": "001",
    "number": 1,
    "title": "Hello Name",
    "titleVi": "Chào Tên",
    "difficulty": "easy",
    "section": "The Basics",
    "description": "Given a first name, print \"Hello [name]\".",
    "descriptionVi": "Cho một tên, in ra \"Hello [tên]\".",
    "expectedOutput": "Hello Alice",
    "hints": [
      "Use an f-string or string concatenation to combine 'Hello ' with the given name.",
      "Remember to print the result."
    ],
    "starterCode": "def solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "def solve():\n    name = \"Alice\"\n\n    print(f\"Hello {name}\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "Alice",
        "expected": "Hello Alice",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "print",
      "variables",
      "f-string"
    ]
  },
  {
    "id": "002",
    "number": 2,
    "title": "Full Name Greeting",
    "titleVi": "Chào Tên Đầy Đủ",
    "difficulty": "easy",
    "section": "The Basics",
    "description": "Given a first name and a surname, print \"Hello [first name] [surname]\".",
    "descriptionVi": "Cho một tên và một họ, in ra \"Hello [tên] [họ]\".",
    "expectedOutput": "Hello Alice Smith",
    "hints": [
      "Combine the greeting, first name, a space, and the surname.",
      "Use an f-string for clear formatting."
    ],
    "starterCode": "def solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "def solve():\n    first_name = \"Alice\"\n    surname = \"Smith\"\n\n    print(f\"Hello {first_name} {surname}\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "Alice,Smith",
        "expected": "Hello Alice Smith",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "print",
      "variables",
      "f-string"
    ]
  },
  {
    "id": "003",
    "number": 3,
    "title": "Joke Time",
    "titleVi": "Đến Giờ Nói Đùa",
    "difficulty": "easy",
    "section": "The Basics",
    "description": "Print the following joke:\nWhat do you call a bear with no teeth?\nA gummy bear!",
    "descriptionVi": "In ra câu đố sau:\nBạn gọi con gấu không răng là gì?\nMột con gấu kẹo cao su!",
    "expectedOutput": "What do you call a bear with no teeth?\nA gummy bear!",
    "hints": [
      "Use a single print statement with multiple lines.",
      "The newline character '\\n' can be used to create new lines."
    ],
    "starterCode": "def solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "def solve():\n    print(\"What do you call a bear with no teeth?\\nA gummy bear!\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "None",
        "expected": "What do you call a bear with no teeth?\nA gummy bear!",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "print",
      "strings",
      "special characters"
    ]
  },
  {
    "id": "004",
    "number": 4,
    "title": "Sum Two Numbers",
    "titleVi": "Tổng Hai Số",
    "difficulty": "easy",
    "section": "The Basics",
    "description": "Given two numbers, add them together and print \"The total is [answer]\".",
    "descriptionVi": "Cho hai số, cộng chúng lại với nhau và in ra \"Tổng là [kết quả]\".",
    "expectedOutput": "The total is 15",
    "hints": [
      "Use the '+' operator to add the numbers.",
      "Format the output string using an f-string."
    ],
    "starterCode": "num1 = 5\nnum2 = 10\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "num1 = 5\nnum2 = 10\n\ndef solve():\n    total = num1 + num2\n    print(f\"The total is {total}\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "5,10",
        "expected": "The total is 15",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "print",
      "arithmetic",
      "f-string"
    ]
  },
  {
    "id": "005",
    "number": 5,
    "title": "Complex Calculation",
    "titleVi": "Tính Toán Phức Tạp",
    "difficulty": "easy",
    "section": "The Basics",
    "description": "Given three numbers, add the first two together, then multiply the result by the third number. Print \"The answer is [answer]\".",
    "descriptionVi": "Cho ba số, cộng hai số đầu tiên lại với nhau, sau đó nhân kết quả với số thứ ba. In ra \"Câu trả lời là [kết quả]\".",
    "expectedOutput": "The answer is 60",
    "hints": [
      "Remember the order of operations: additions first, then multiplication.",
      "Parentheses can be used to ensure correct order `(num1 + num2) * num3`."
    ],
    "starterCode": "num1 = 5\nnum2 = 5\nnum3 = 6\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "num1 = 5\nnum2 = 5\nnum3 = 6\n\ndef solve():\n    result = (num1 + num2) * num3\n    print(f\"The answer is {result}\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "5,5,6",
        "expected": "The answer is 60",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "print",
      "arithmetic",
      "variables"
    ]
  },
  {
    "id": "006",
    "number": 6,
    "title": "Pizza Slices Remaining",
    "titleVi": "Số Lát Pizza Còn Lại",
    "difficulty": "easy",
    "section": "The Basics",
    "description": "Given the total number of pizza slices an individual started with, and the number of slices they have eaten, print the number of slices remaining.",
    "descriptionVi": "Cho tổng số lát pizza ban đầu và số lát đã ăn, in ra số lát còn lại.",
    "expectedOutput": "There are 2 slices remaining.",
    "hints": [
      "Use subtraction to find the difference between the total and eaten slices.",
      "The output should clearly state the number of remaining slices."
    ],
    "starterCode": "total_slices = 8\neaten_slices = 6\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "total_slices = 8\neaten_slices = 6\n\ndef solve():\n    remaining = total_slices - eaten_slices\n    print(f\"There are {remaining} slices remaining.\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "8,6",
        "expected": "There are 2 slices remaining.",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "print",
      "arithmetic",
      "variables"
    ]
  },
  {
    "id": "007",
    "number": 7,
    "title": "Birthday Age",
    "titleVi": "Tuổi Sinh Nhật",
    "difficulty": "easy",
    "section": "The Basics",
    "description": "Given a name and current age, add 1 to the age and print \"[name] next birthday you will be [new age]\".",
    "descriptionVi": "Cho một tên và tuổi hiện tại, thêm 1 vào tuổi và in ra \"[tên] sinh nhật tới bạn sẽ ỷ [tuổi mới]\".",
    "expectedOutput": "Alice next birthday you will be 21",
    "hints": [
      "Increment the age by 1 using `age + 1`.",
      "Use an f-string to embed the name and new age into the output message."
    ],
    "starterCode": "def solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "def solve():\n    name = \"Alice\"\n    age = 20\n\n    new_age = age + 1\n    print(f\"{name} next birthday you will be {new_age}\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "Alice,20",
        "expected": "Alice next birthday you will be 21",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "print",
      "variables",
      "arithmetic",
      "f-string"
    ]
  },
  {
    "id": "008",
    "number": 8,
    "title": "Bill Splitter",
    "titleVi": "Chia Hóa Đơn",
    "difficulty": "easy",
    "section": "The Basics",
    "description": "Given the total bill amount and the number of diners, print the amount each person pays, rounded to two decimal places.",
    "descriptionVi": "Cho tổng số hóa đơn và số người ăn, in ra số tiền mỗi người phải trả, làm tròn đến hai chữ số thập phân.",
    "expectedOutput": "Each person pays 12.50",
    "hints": [
      "Divide the total bill by the number of diners.",
      "Use f-string formatting with `:.2f` to round to two decimal places.",
      "Make sure the numbers are treated as floats for division."
    ],
    "starterCode": "total_bill = 50.00\nnum_diners = 4\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "total_bill = 50.00\nnum_diners = 4\n\ndef solve():\n    amount_per_person = total_bill / num_diners\n    print(f\"Each person pays {amount_per_person:.2f}\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "50.00,4",
        "expected": "Each person pays 12.50",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "print",
      "arithmetic",
      "formatting",
      "floats"
    ]
  },
  {
    "id": "009",
    "number": 9,
    "title": "Time Converter",
    "titleVi": "Chuyển Đổi Thời Gian",
    "difficulty": "easy",
    "section": "The Basics",
    "description": "Given a number of days, print the equivalent number of hours, minutes, and seconds.",
    "descriptionVi": "Cho một số ngày, in ra số giờ, phút và giây tương đương.",
    "expectedOutput": "2 days is 48 hours, 2880 minutes, and 172800 seconds.",
    "hints": [
      "There are 24 hours in a day.",
      "There are 60 minutes in an hour.",
      "There are 60 seconds in a minute.",
      "Calculate each unit separately and then print them in a descriptive sentence."
    ],
    "starterCode": "days = 2\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "days = 2\n\ndef solve():\n    hours = days * 24\n    minutes = hours * 60\n    seconds = minutes * 60\n    print(f\"{days} days is {hours} hours, {minutes} minutes, and {seconds} seconds.\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "2",
        "expected": "2 days is 48 hours, 2880 minutes, and 172800 seconds.",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "print",
      "arithmetic",
      "variables"
    ]
  },
  {
    "id": "010",
    "number": 10,
    "title": "KG to Pounds Converter",
    "titleVi": "Chuyển Đổi KG sang Pound",
    "difficulty": "easy",
    "section": "The Basics",
    "description": "Given a weight in kilograms, convert it to pounds. (1 kg = 2.204 pounds). Print the result to two decimal places.",
    "descriptionVi": "Cho một trọng lượng bằng kilôgam, chuyển đổi nó sang pound. (1 kg = 2.204 pound). In kết quả ra hai chữ số thập phân.",
    "expectedOutput": "10.00 kg is 22.04 pounds.",
    "hints": [
      "Multiply the kilograms by the conversion factor.",
      "Format the output using an f-string to show two decimal places for pounds."
    ],
    "starterCode": "kg = 10\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "kg = 10\n\ndef solve():\n    pounds = kg * 2.204\n    print(f\"{kg:.2f} kg is {pounds:.2f} pounds.\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "10",
        "expected": "10.00 kg is 22.04 pounds.",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "print",
      "arithmetic",
      "floats",
      "formatting"
    ]
  },
  {
    "id": "011",
    "number": 11,
    "title": "Integer Division",
    "titleVi": "Phép Chia Nguyên",
    "difficulty": "easy",
    "section": "The Basics",
    "description": "Given a number greater than 100 and a number under 10, show the integer division result of the first number by the second number. Print 'The integer division result is [answer]'.",
    "descriptionVi": "Cho một số lớn hơn 100 và một số nhỏ hơn 10, hiển thị kết quả phép chia nguyên của số thứ nhất cho số thứ hai. In ra 'Kết quả phép chia nguyên là [kết quả]'.",
    "expectedOutput": "The integer division result is 11",
    "hints": [
      "Use the integer division operator `//`.",
      "Ensure the output format matches the requirement."
    ],
    "starterCode": "num_over_100 = 115\nnum_under_10 = 10\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "num_over_100 = 115\nnum_under_10 = 10\n\ndef solve():\n    result = num_over_100 // num_under_10\n    print(f\"The integer division result is {result}\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "115,10",
        "expected": "The integer division result is 11",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "print",
      "arithmetic",
      "operators"
    ]
  },
  {
    "id": "012",
    "number": 12,
    "title": "Order Two Numbers",
    "titleVi": "Sắp Xếp Hai Số",
    "difficulty": "easy",
    "section": "If Statements",
    "description": "Given two numbers, display the smaller number first, then the larger number. Print the numbers separated by a comma and space.",
    "descriptionVi": "Cho hai số, hiển thị số nhỏ hơn trước, sau đó là số lớn hơn. In các số được phân tách bằng dấu phẩy và dấu cách.",
    "expectedOutput": "5, 10",
    "hints": [
      "Use an if-else statement to compare the two numbers.",
      "Print the numbers in the correct order based on the comparison."
    ],
    "starterCode": "num1 = 10\nnum2 = 5\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "num1 = 10\nnum2 = 5\n\ndef solve():\n    if num1 < num2:\n        print(f\"{num1}, {num2}\")\n    else:\n        print(f\"{num2}, {num1}\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "10,5",
        "expected": "5, 10",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "if-else",
      "comparison",
      "print"
    ]
  },
  {
    "id": "013",
    "number": 13,
    "title": "Number Check 20",
    "titleVi": "Kiểm Tra Số 20",
    "difficulty": "easy",
    "section": "If Statements",
    "description": "Given a number, if it is 20 or greater, print \"Too high\". Otherwise, print \"Thank you\".",
    "descriptionVi": "Cho một số, nếu nó lớn hơn hoặc bằng 20, in ra \"Quá cao\". Ngược lại, in ra \"Cảm ơn\".",
    "expectedOutput": "Too high",
    "hints": [
      "Use an `if` statement with the `>=` operator.",
      "The `else` block will handle cases where the number is less than 20."
    ],
    "starterCode": "number = 25\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "number = 25\n\ndef solve():\n    if number >= 20:\n        print(\"Too high\")\n    else:\n        print(\"Thank you\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "25",
        "expected": "Too high",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "if-else",
      "comparison",
      "print"
    ]
  },
  {
    "id": "014",
    "number": 14,
    "title": "Number Range 10-20",
    "titleVi": "Phạm Vi Số 10-20",
    "difficulty": "easy",
    "section": "If Statements",
    "description": "Given a number, if it is between 10 and 20 (inclusive), print \"Thank you\". Otherwise, print \"Incorrect answer\".",
    "descriptionVi": "Cho một số, nếu nó nằm trong khoảng từ 10 đến 20 (bao gồm cả 10 và 20), in ra \"Cảm ơn\". Ngược lại, in ra \"Câu trả lời không chính xác\".",
    "expectedOutput": "Thank you",
    "hints": [
      "Use logical operators (`and`) to check if a number falls within a range.",
      "Remember that 'inclusive' means the boundary numbers (10 and 20) are part of the range."
    ],
    "starterCode": "number = 15\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "number = 15\n\ndef solve():\n    if 10 <= number <= 20:\n        print(\"Thank you\")\n    else:\n        print(\"Incorrect answer\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "15",
        "expected": "Thank you",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "if-else",
      "logical operators",
      "comparison",
      "print"
    ]
  },
  {
    "id": "015",
    "number": 15,
    "title": "Favorite Color",
    "titleVi": "Màu Yêu Thích",
    "difficulty": "medium",
    "section": "If Statements",
    "description": "Given a color string, if it is \"red\" (case-insensitive), print \"I like red too\". Otherwise, print \"I don't like [color], I prefer red\".",
    "descriptionVi": "Cho một chuỗi màu sắc, nếu nó là \"đỏ\" (không phân biệt chữ hoa, chữ thường), in ra \"Tôi cũng thích màu đỏ\". Ngược lại, in ra \"Tôi không thích [màu], tôi thích màu đỏ\".",
    "expectedOutput": "I like red too",
    "hints": [
      "Convert the input color to lowercase before comparing to handle case-insensitivity.",
      "Use an f-string to embed the user's color in the 'don't like' message."
    ],
    "starterCode": "def solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "def solve():\n    color = \"red\"\n\n    if color.lower() == \"red\":\n        print(\"I like red too\")\n    else:\n        print(f\"I don't like {color}, I prefer red\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "red",
        "expected": "I like red too",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "if-else",
      "strings",
      "case-conversion",
      "print"
    ]
  },
  {
    "id": "016",
    "number": 16,
    "title": "Weather Advice",
    "titleVi": "Lời Khuyên Thời Tiết",
    "difficulty": "medium",
    "section": "If Statements",
    "description": "Given two boolean values, `raining` and `windy`:\n- If it's raining AND windy, print \"Too windy for an umbrella\".\n- If it's raining BUT NOT windy, print \"Take an umbrella\".\n- If it's NOT raining, print \"Enjoy your day\".",
    "descriptionVi": "Cho hai giá trị boolean, `raining` và `windy`:\n- Nếu trời đang mưa VÀ có gió, in ra \"Quá gió để dùng ô\".\n- Nếu trời đang mưa NHƯNG KHÔNG có gió, in ra \"Hãy mang theo ô\".\n- Nếu KHÔNG mưa, in ra \"Tận hưởng ngày của bạn\".",
    "expectedOutput": "Too windy for an umbrella",
    "hints": [
      "Use nested if-else statements or a series of `if/elif/else` statements.",
      "Pay attention to the specific conditions for each message, especially combining `and` and `not`."
    ],
    "starterCode": "raining = True\nwindy = True\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "raining = True\nwindy = True\n\ndef solve():\n    if raining and windy:\n        print(\"Too windy for an umbrella\")\n    elif raining and not windy:\n        print(\"Take an umbrella\")\n    else:\n        print(\"Enjoy your day\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "True,True",
        "expected": "Too windy for an umbrella",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "if-elif-else",
      "boolean",
      "logical operators",
      "print"
    ]
  },
  {
    "id": "017",
    "number": 17,
    "title": "Age-Based Activities",
    "titleVi": "Hoạt Động Theo Tuổi",
    "difficulty": "medium",
    "section": "If Statements",
    "description": "Given an age:\n- If age is 18 or greater, print \"You can vote\".\n- If age is 17, print \"You can learn to drive\".\n- If age is 16, print \"You can buy a lottery ticket\".\n- If age is less than 16, print \"You can go Trick-or-Treating\".",
    "descriptionVi": "Cho một độ tuổi:\n- Nếu tuổi từ 18 trở lên, in ra \"Bạn có thể bỏ phiếu\".\n- Nếu tuổi là 17, in ra \"Bạn có thể học lái xe\".\n- Nếu tuổi là 16, in ra \"Bạn có thể mua vé số\".\n- Nếu tuổi nhỏ hơn 16, in ra \"Bạn có thể đi xin kẹo (Trick-or-Treating)\".",
    "expectedOutput": "You can vote",
    "hints": [
      "Use `if`, `elif`, `else` statements to handle different age ranges.",
      "The order of your `elif` conditions matters. Start with the highest age and work down, or test specific ages first."
    ],
    "starterCode": "age = 18\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "age = 18\n\ndef solve():\n    if age >= 18:\n        print(\"You can vote\")\n    elif age == 17:\n        print(\"You can learn to drive\")\n    elif age == 16:\n        print(\"You can buy a lottery ticket\")\n    else:\n        print(\"You can go Trick-or-Treating\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "18",
        "expected": "You can vote",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "if-elif-else",
      "comparison",
      "print"
    ]
  },
  {
    "id": "018",
    "number": 18,
    "title": "Number Guess Feedback",
    "titleVi": "Phản Hồi Số Đoán",
    "difficulty": "medium",
    "section": "If Statements",
    "description": "Given a number:\n- If the number is less than 10, print \"Too low\".\n- If the number is between 10 and 20 (inclusive), print \"Correct\".\n- If the number is greater than 20, print \"Too high\".",
    "descriptionVi": "Cho một số:\n- Nếu số đó nhỏ hơn 10, in ra \"Quá thấp\".\n- Nếu số đó nằm trong khoảng từ 10 đến 20 (bao gồm cả 10 và 20), in ra \"Chính xác\".\n- Nếu số đó lớn hơn 20, in ra \"Quá cao\".",
    "expectedOutput": "Too low",
    "hints": [
      "Use `if`, `elif`, `else` to structure your conditions.",
      "Remember to handle the inclusive range for \"Correct\" using `and` or chained comparisons."
    ],
    "starterCode": "number = 5\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "number = 5\n\ndef solve():\n    if number < 10:\n        print(\"Too low\")\n    elif 10 <= number <= 20:\n        print(\"Correct\")\n    else:\n        print(\"Too high\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "5",
        "expected": "Too low",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "if-elif-else",
      "comparison",
      "logical operators",
      "print"
    ]
  },
  {
    "id": "019",
    "number": 19,
    "title": "Special Number Message",
    "titleVi": "Thông Điệp Số Đặc Biệt",
    "difficulty": "medium",
    "section": "If Statements",
    "description": "Given a number:\n- If the number is 1, print \"Thank you\".\n- If the number is 2, print \"Well done\".\n- If the number is 3, print \"Correct\".\n- For any other number, print \"Error message\".",
    "descriptionVi": "Cho một số:\n- Nếu số đó là 1, in ra \"Cảm ơn\".\n- Nếu số đó là 2, in ra \"Tuyệt vời\".\n- Nếu số đó là 3, in ra \"Chính xác\".\n- Đối với bất kỳ số nào khác, in ra \"Thông báo lỗi\".",
    "expectedOutput": "Thank you",
    "hints": [
      "Use a series of `if`, `elif`, `else` statements to check for specific number values.",
      "The `else` block will catch any number that doesn't match 1, 2, or 3."
    ],
    "starterCode": "number = 1\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "number = 1\n\ndef solve():\n    if number == 1:\n        print(\"Thank you\")\n    elif number == 2:\n        print(\"Well done\")\n    elif number == 3:\n        print(\"Correct\")\n    else:\n        print(\"Error message\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "1",
        "expected": "Thank you",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "if-elif-else",
      "comparison",
      "print"
    ]
  },
  {
    "id": "020",
    "number": 20,
    "title": "First Name Length",
    "titleVi": "Độ Dài Tên Riêng",
    "difficulty": "easy",
    "section": "Strings",
    "description": "Given a first name, print its length.",
    "descriptionVi": "Cho một tên riêng, in ra độ dài của nó.",
    "expectedOutput": "The length of Alice is 5",
    "hints": [
      "Use the `len()` function to get the length of a string.",
      "Format the output to clearly state the name and its length."
    ],
    "starterCode": "def solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "def solve():\n    first_name = \"Alice\"\n\n    length = len(first_name)\n    print(f\"The length of {first_name} is {length}\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "Alice",
        "expected": "The length of Alice is 5",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "strings",
      "len",
      "print"
    ]
  },
  {
    "id": "021",
    "number": 21,
    "title": "Full Name and Total Length",
    "titleVi": "Tên Đầy Đủ và Tổng Độ Dài",
    "difficulty": "easy",
    "section": "Strings",
    "description": "Given a first name and a surname, join them with a space to form a full name. Then, print the full name and its total length.",
    "descriptionVi": "Cho một tên riêng và một họ, nối chúng lại với nhau bằng một dấu cách để tạo thành tên đầy đủ. Sau đó, in ra tên đầy đủ và tổng độ dài của nó.",
    "expectedOutput": "Full name: Alice Smith, Length: 11",
    "hints": [
      "Use string concatenation or an f-string to combine the first name, a space, and the surname.",
      "Apply the `len()` function to the resulting full name."
    ],
    "starterCode": "def solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "def solve():\n    first_name = \"Alice\"\n    surname = \"Smith\"\n\n    full_name = f\"{first_name} {surname}\"\n    total_length = len(full_name)\n    print(f\"Full name: {full_name}, Length: {total_length}\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "Alice,Smith",
        "expected": "Full name: Alice Smith, Length: 11",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "strings",
      "concatenation",
      "len",
      "print"
    ]
  },
  {
    "id": "022",
    "number": 22,
    "title": "Title Case Full Name",
    "titleVi": "Tên Đầy Đủ Về Dạng Viết Hoa Chữ Cái Đầu",
    "difficulty": "easy",
    "section": "Strings",
    "description": "Given a first name and a surname (which might be in lowercase), convert both to title case and join them with a space. Print the resulting full name.",
    "descriptionVi": "Cho một tên riêng và một họ (có thể ở dạng chữ thường), chuyển cả hai thành dạng viết hoa chữ cái đầu và nối chúng lại với một dấu cách. In ra tên đầy đủ kết quả.",
    "expectedOutput": "Hello Alice Smith",
    "hints": [
      "Use the `.title()` string method to convert each name part to title case.",
      "Then, combine them with a space and print."
    ],
    "starterCode": "def solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "def solve():\n    first_name_lower = \"alice\"\n    surname_lower = \"smith\"\n\n    first_name_title = first_name_lower.title()\n    surname_title = surname_lower.title()\n    full_name = f\"{first_name_title} {surname_title}\"\n    print(f\"Hello {full_name}\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "alice,smith",
        "expected": "Hello Alice Smith",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "strings",
      "titlecase",
      "methods",
      "print"
    ]
  },
  {
    "id": "023",
    "number": 23,
    "title": "Phrase Length",
    "titleVi": "Độ Dài Cụm Từ",
    "difficulty": "easy",
    "section": "Strings",
    "description": "Given a phrase, print its length.",
    "descriptionVi": "Cho một cụm từ, in ra độ dài của nó.",
    "expectedOutput": "The phrase 'Hello world!' has a length of 12 characters.",
    "hints": [
      "The `len()` function works on any string, including phrases with spaces and punctuation.",
      "Make sure your output clearly states the phrase and its calculated length."
    ],
    "starterCode": "def solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "def solve():\n    phrase = \"Hello world!\"\n\n    length = len(phrase)\n    print(f\"The phrase '{phrase}' has a length of {length} characters.\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "Hello world!",
        "expected": "The phrase 'Hello world!' has a length of 12 characters.",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "strings",
      "len",
      "print"
    ]
  },
  {
    "id": "024",
    "number": 24,
    "title": "Uppercase Word",
    "titleVi": "Từ Chữ Hoa",
    "difficulty": "easy",
    "section": "Strings",
    "description": "Given a word, print it in uppercase.",
    "descriptionVi": "Cho một từ, in nó ra bằng chữ hoa.",
    "expectedOutput": "HELLO",
    "hints": [
      "Use the `.upper()` string method to convert the word to uppercase.",
      "Simply print the result."
    ],
    "starterCode": "def solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "def solve():\n    word = \"hello\"\n\n    print(word.upper())\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "hello",
        "expected": "HELLO",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "strings",
      "uppercase",
      "methods",
      "print"
    ]
  },
  {
    "id": "025",
    "number": 25,
    "title": "Conditional Name Formatting",
    "titleVi": "Định Dạng Tên Có Điều Kiện",
    "difficulty": "medium",
    "section": "Strings",
    "description": "Given a first name:\n- If its length is less than 5 characters, ask for a surname, then concatenate the first name and surname without a space, and print the result in uppercase.\n- Otherwise (if the first name's length is 5 or more), print the first name in lowercase.",
    "descriptionVi": "Cho một tên riêng:\n- Nếu độ dài của nó nhỏ hơn 5 ký tự, yêu cầu nhập họ, sau đó ghép tên riêng và họ mà không có dấu cách, và in kết quả bằng chữ hoa.\n- Ngược lại (nếu độ dài tên riêng từ 5 trở lên), in tên riêng bằng chữ thường.",
    "expectedOutput": "JOESMITH",
    "hints": [
      "Use `len()` to check the length of the first name.",
      "Implement an `if-else` statement for the different conditions.",
      "For the 'less than 5' case, concatenate strings and use `.upper()`.",
      "For the '5 or more' case, use `.lower()`."
    ],
    "starterCode": "def solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "def solve():\n    first_name = \"Joe\"\n    surname = \"Smith\"\n\n    if len(first_name) < 5:\n        # Assuming surname is provided for testing this branch\n        if surname is None:\n            # This case shouldn't occur with the test mechanism, but good practice\n            print(\"Error: Surname expected but not provided.\")\n            return\n        combined_name = first_name + surname\n        print(combined_name.upper())\n    else:\n        print(first_name.lower())\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "Joe,Smith",
        "expected": "JOESMITH",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "strings",
      "if-else",
      "len",
      "concatenation",
      "uppercase",
      "lowercase"
    ]
  },
  {
    "id": "026",
    "number": 26,
    "title": "Pig Latin Converter",
    "titleVi": "Chuyển Đổi Sang Tiếng Lợn La Tinh",
    "difficulty": "hard",
    "section": "Strings",
    "description": "Convert a given word to Pig Latin:\n- If the word starts with a vowel (a, e, i, o, u), add \"way\" to the end.\n- If the word starts with a consonant, move the first consonant (or consonant cluster) to the end and add \"ay\".\nAssume the input is a single word, all lowercase.\n\nExample:\n- 'apple' -> 'appleway'\n- 'pig' -> 'igpay'\n- 'smile' -> 'ilesmay'",
    "descriptionVi": "Chuyển một từ đã cho sang Tiếng Lợn La Tinh (Pig Latin):\n- Nếu từ bắt đầu bằng nguyên âm (a, e, i, o, u), thêm \"way\" vào cuối.\n- Nếu từ bắt đầu bằng phụ âm, di chuyển phụ âm đầu tiên (hoặc cụm phụ âm) đến cuối và thêm \"ay\".\nHãy giả định đầu vào là một từ đơn, tất cả đều là chữ thường.\n\nVí dụ:\n- 'apple' -> 'appleway'\n- 'pig' -> 'igpay'\n- 'smile' -> 'ilesmay'",
    "expectedOutput": "appleway",
    "hints": [
      "Define a set of vowels to easily check if the first letter is a vowel.",
      "Use `word[0]` to get the first character and `word[1:]` for the rest of the word.",
      "For words starting with consonants, you might need a loop to find the end of the initial consonant cluster.",
      "The string `find()` method or `startswith()` checks can be useful."
    ],
    "starterCode": "def solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "def solve():\n    word = \"apple\"\n\n    vowels = 'aeiou'\n    if word[0] in vowels:\n        print(word + 'way')\n    else:\n        consonant_cluster = ''\n        for char in word:\n            if char not in vowels:\n                consonant_cluster += char\n            else:\n                break\n        if consonant_cluster:\n            print(word[len(consonant_cluster):] + consonant_cluster + 'ay')\n        else: # Should ideally not happen if it passed the vowel check\n            print(word + 'ay') # Fallback if somehow no consonant cluster found for a consonant-starting word\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "apple",
        "expected": "appleway",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "strings",
      "if-else",
      "loops",
      "string slicing",
      "algorithms"
    ]
  },
  {
    "id": "027",
    "number": 27,
    "title": "Double Decimal Number",
    "titleVi": "Nhân Đôi Số Thập Phân",
    "difficulty": "easy",
    "section": "Maths",
    "description": "Given a decimal number, multiply it by 2 and print the result.",
    "descriptionVi": "Cho một số thập phân, nhân nó với 2 và in ra kết quả.",
    "expectedOutput": "The doubled number is 10.5",
    "hints": [
      "Use the `*` operator for multiplication.",
      "Ensure the result is printed with appropriate precision (Python usually handles floats well by default)."
    ],
    "starterCode": "decimal_num = 5.25\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "decimal_num = 5.25\n\ndef solve():\n    result = decimal_num * 2\n    print(f\"The doubled number is {result}\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "5.25",
        "expected": "The doubled number is 10.5",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "maths",
      "arithmetic",
      "floats",
      "print"
    ]
  },
  {
    "id": "028",
    "number": 28,
    "title": "Double and Round Decimal",
    "titleVi": "Nhân Đôi và Làm Tròn Số Thập Phân",
    "difficulty": "medium",
    "section": "Maths",
    "description": "Given a decimal number, multiply it by 2 and print the result rounded to 2 decimal places.",
    "descriptionVi": "Cho một số thập phân, nhân nó với 2 và in ra kết quả làm tròn đến 2 chữ số thập phân.",
    "expectedOutput": "The doubled and rounded number is 10.50",
    "hints": [
      "First, multiply the number by 2.",
      "Then, use f-string formatting `:.2f` to round the result to two decimal places when printing."
    ],
    "starterCode": "decimal_num = 5.25\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "decimal_num = 5.25\n\ndef solve():\n    result = decimal_num * 2\n    print(f\"The doubled and rounded number is {result:.2f}\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "5.25",
        "expected": "The doubled and rounded number is 10.50",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "maths",
      "arithmetic",
      "floats",
      "formatting",
      "rounding"
    ]
  },
  {
    "id": "029",
    "number": 29,
    "title": "Square Root over 500",
    "titleVi": "Căn Bậc Hai Của Số Lớn Hơn 500",
    "difficulty": "medium",
    "section": "Maths",
    "description": "Given an integer greater than 500, print its square root to 2 decimal places.",
    "descriptionVi": "Cho một số nguyên lớn hơn 500, in ra căn bậc hai của nó đến 2 chữ số thập phân.",
    "expectedOutput": "The square root is 22.36",
    "hints": [
      "Import the `math` module to use `math.sqrt()`.",
      "Ensure the output is formatted to exactly two decimal places using f-string formatting (`:.2f`)."
    ],
    "starterCode": "import math\n\nnumber = 500\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "import math\n\nnumber = 500\n\ndef solve():\n    square_root = math.sqrt(number)\n    print(f\"The square root is {square_root:.2f}\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "500",
        "expected": "The square root is 22.36",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "maths",
      "sqrt",
      "imports",
      "floats",
      "formatting"
    ]
  },
  {
    "id": "030",
    "number": 30,
    "title": "Print Pi",
    "titleVi": "In Số Pi",
    "difficulty": "easy",
    "section": "Maths",
    "description": "Print the value of Pi (π) to 5 decimal places.",
    "descriptionVi": "In giá trị của Pi (π) đến 5 chữ số thập phân.",
    "expectedOutput": "Pi to 5 decimal places: 3.14159",
    "hints": [
      "Import the `math` module to access `math.pi`.",
      "Use f-string formatting `:.5f` to display exactly five decimal places."
    ],
    "starterCode": "import math\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "import math\n\ndef solve():\n    print(f\"Pi to 5 decimal places: {math.pi:.5f}\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "None",
        "expected": "Pi to 5 decimal places: 3.14159",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "maths",
      "pi",
      "imports",
      "floats",
      "formatting"
    ]
  },
  {
    "id": "031",
    "number": 31,
    "title": "Area of a Circle",
    "titleVi": "Diện tích hình tròn",
    "difficulty": "easy",
    "section": "Maths",
    "description": "Write a function that calculates the area of a circle given its radius. The area should be returned to two decimal places. Use `math.pi` for pi.",
    "descriptionVi": "Viết hàm tính diện tích hình tròn khi biết bán kính. Diện tích phải được làm tròn đến hai chữ số thập phân. Sử dụng `math.pi` cho số pi.",
    "expectedOutput": "The area is 78.54",
    "hints": [
      "You will need to import the `math` module.",
      "The formula for the area of a circle is pi * radius^2.",
      "Use `round()` to format the output to two decimal places."
    ],
    "starterCode": "import math\n\nradius = 5\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "import math\n\nradius = 5\n\ndef solve():\n    area = math.pi * (radius ** 2)\n    print(f\"The area is {area:.2f}\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "radius = 5",
        "expected": "The area is 78.54",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "math",
      "functions",
      "float",
      "formatting"
    ]
  },
  {
    "id": "032",
    "number": 32,
    "title": "Volume of a Cylinder",
    "titleVi": "Thể tích hình trụ",
    "difficulty": "medium",
    "section": "Maths",
    "description": "Write a function that calculates the volume of a cylinder. The function should take the radius and depth (height) as arguments. Return the volume to three decimal places. Use `math.pi` for pi.",
    "descriptionVi": "Viết hàm tính thể tích hình trụ. Hàm sẽ nhận bán kính và chiều sâu (chiều cao) làm đối số. Trả về thể tích với ba chữ số thập phân. Sử dụng `math.pi` cho số pi.",
    "expectedOutput": "The volume is 392.699",
    "hints": [
      "The formula for the area of a circle is pi * radius^2.",
      "The volume of a cylinder is the area of the circle multiplied by the depth.",
      "Use `round()` or an f-string to format the output to three decimal places."
    ],
    "starterCode": "import math\n\nradius = 5\ndepth = 5\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "import math\n\nradius = 5\ndepth = 5\n\ndef solve():\n    circle_area = math.pi * (radius ** 2)\n    volume = circle_area * depth\n    print(f\"The volume is {volume:.3f}\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "radius = 5, depth = 5",
        "expected": "The volume is 392.699",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "math",
      "functions",
      "float",
      "formatting"
    ]
  },
  {
    "id": "033",
    "number": 33,
    "title": "Integer Division and Remainder",
    "titleVi": "Chia nguyên và số dư",
    "difficulty": "easy",
    "section": "Maths",
    "description": "Write a function that takes two numbers, `num1` and `num2`. Perform integer division and calculate the remainder. Return a string formatted as: '`num1` divided by `num2` is `result` with `remainder` remaining.'",
    "descriptionVi": "Viết hàm nhận hai số, `num1` và `num2`. Thực hiện phép chia nguyên và tính số dư. Trả về một chuỗi được định dạng như sau: '`num1` chia cho `num2` là `kết quả` còn lại `số dư`.'",
    "expectedOutput": "10 divided by 3 is 3 with 1 remaining.",
    "hints": [
      "Use the `//` operator for integer division.",
      "Use the `%` operator for the modulo (remainder)."
    ],
    "starterCode": "num1 = 10\nnum2 = 3\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "num1 = 10\nnum2 = 3\n\ndef solve():\n    result = num1 // num2\n    remainder = num1 % num2\n    print(f\"{num1} divided by {num2} is {result} with {remainder} remaining.\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "num1 = 10, num2 = 3",
        "expected": "10 divided by 3 is 3 with 1 remaining.",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "math",
      "operators",
      "string formatting"
    ]
  },
  {
    "id": "034",
    "number": 34,
    "title": "Shape Area Calculator Menu",
    "titleVi": "Menu tính diện tích hình",
    "difficulty": "medium",
    "section": "Conditional Statements",
    "description": "Write a function `solve(choice, value1, value2=None)` that acts as a menu-driven area calculator. \n- If `choice` is 'square', calculate the area of a square given its side length (`value1`).\n- If `choice` is 'triangle', calculate the area of a triangle given its base (`value1`) and height (`value2`).\n\nReturn the calculated area as an integer. If the choice is invalid, return -1.",
    "descriptionVi": "Viết hàm `solve(choice, value1, value2=None)` hoạt động như một máy tính diện tích dựa trên menu. \n- Nếu `choice` là 'square', tính diện tích hình vuông với độ dài cạnh (`value1`).\n- Nếu `choice` là 'triangle', tính diện tích hình tam giác với đáy (`value1`) và chiều cao (`value2`).\n\nTrả về diện tích đã tính dưới dạng số nguyên. Nếu lựa chọn không hợp lệ, trả về -1.",
    "expectedOutput": "25",
    "hints": [
      "Use `if-elif-else` statements to handle different choices.",
      "Area of square = side * side.",
      "Area of triangle = 0.5 * base * height.",
      "Remember to handle the case where `value2` might not be provided for a square."
    ],
    "starterCode": "choice = 'square'\nvalue1 = 5\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "choice = 'square'\nvalue1 = 5\n\ndef solve():\n    value2 = \"\"\n\n    if choice == 'square':\n        return int(value1 * value1)\n    elif choice == 'triangle':\n        if value2 is not None:\n            return int(0.5 * value1 * value2)\n        else:\n            return -1 # Need two values for triangle\n    else:\n        return -1\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "choice = 'square', value1 = 5",
        "expected": "25",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "functions",
      "conditional",
      "math",
      "menu"
    ]
  },
  {
    "id": "035",
    "number": 35,
    "title": "Display Name Three Times",
    "titleVi": "Hiển thị tên ba lần",
    "difficulty": "easy",
    "section": "Loops",
    "description": "Write a function `solve(name)` that takes a name as a string and returns a list containing that name repeated three times.",
    "descriptionVi": "Viết hàm `solve(name)` nhận một chuỗi tên và trả về một danh sách chứa tên đó lặp lại ba lần.",
    "expectedOutput": "['Alice', 'Alice', 'Alice']",
    "hints": [
      "Use a `for` loop that iterates three times.",
      "Append the name to a list in each iteration."
    ],
    "starterCode": "name = 'Alice'\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "name = 'Alice'\n\ndef solve():\n    result = []\n    for _ in range(3):\n        result.append(name)\n    print(result)\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "name = 'Alice'",
        "expected": "['Alice', 'Alice', 'Alice']",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "loops",
      "list",
      "string"
    ]
  },
  {
    "id": "036",
    "number": 36,
    "title": "Display Name N Times",
    "titleVi": "Hiển thị tên N lần",
    "difficulty": "easy",
    "section": "Loops",
    "description": "Modify the previous program so that the function `solve(name, num_times)` takes a name and a number. It should return a list containing the name repeated that many times.",
    "descriptionVi": "Sửa đổi chương trình trước đó để hàm `solve(name, num_times)` nhận một tên và một số. Hàm sẽ trả về một danh sách chứa tên đó lặp lại số lần được chỉ định.",
    "expectedOutput": "['Alice', 'Alice', 'Alice', 'Alice', 'Alice']",
    "hints": [
      "Use a `for` loop with `range(num_times)`.",
      "Append the name to a list in each iteration."
    ],
    "starterCode": "name = 'Alice'\nnum_times = 5\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "name = 'Alice'\nnum_times = 5\n\ndef solve():\n    result = []\n    for _ in range(num_times):\n        result.append(name)\n    print(result)\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "name = 'Alice', num_times = 5",
        "expected": "['Alice', 'Alice', 'Alice', 'Alice', 'Alice']",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "loops",
      "list",
      "string"
    ]
  },
  {
    "id": "037",
    "number": 37,
    "title": "Display Name Letter by Letter N Times",
    "titleVi": "Hiển thị tên từng chữ cái N lần",
    "difficulty": "medium",
    "section": "Loops",
    "description": "Write a function `solve(name, num_times)` that takes a name and a number. For each of the `num_times` repetitions, it should iterate through the letters of the name and add each letter to a list. The function should return a single list containing all the letters from all repetitions.",
    "descriptionVi": "Viết hàm `solve(name, num_times)` nhận một tên và một số. Với mỗi lần lặp lại `num_times`, hàm sẽ lặp qua các chữ cái của tên và thêm từng chữ cái vào một danh sách. Hàm sẽ trả về một danh sách duy nhất chứa tất cả các chữ cái từ tất cả các lần lặp.",
    "expectedOutput": "['A', 'l', 'i', 'c', 'e', 'A', 'l', 'i', 'c', 'e']",
    "hints": [
      "You will need a nested loop: an outer loop for the number of repetitions and an inner loop for the letters in the name.",
      "Append each character to the result list."
    ],
    "starterCode": "name = 'Alice'\nnum_times = 2\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "name = 'Alice'\nnum_times = 2\n\ndef solve():\n    result = []\n    for _ in range(num_times):\n        for char in name:\n            result.append(char)\n    print(result)\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "name = 'Alice', num_times = 2",
        "expected": "['A', 'l', 'i', 'c', 'e', 'A', 'l', 'i', 'c', 'e']",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "loops",
      "nested loops",
      "list",
      "string"
    ]
  },
  {
    "id": "038",
    "number": 38,
    "title": "Times Table",
    "titleVi": "Bảng cửu chương",
    "difficulty": "easy",
    "section": "Loops",
    "description": "Write a function `solve(number)` that takes an integer `number` (between 1 and 12 inclusive). It should return a list of strings, where each string represents a line of the multiplication table for that number, from 1 to 12. \nExample: for `number = 5`, the first element would be '5 x 1 = 5'.",
    "descriptionVi": "Viết hàm `solve(number)` nhận một số nguyên `number` (từ 1 đến 12). Hàm sẽ trả về một danh sách các chuỗi, trong đó mỗi chuỗi đại diện cho một dòng của bảng cửu chương cho số đó, từ 1 đến 12. \nVí dụ: với `number = 5`, phần tử đầu tiên sẽ là '5 x 1 = 5'.",
    "expectedOutput": "['5 x 1 = 5', '5 x 2 = 10', '5 x 3 = 15', '5 x 4 = 20', '5 x 5 = 25', '5 x 6 = 30', '5 x 7 = 35', '5 x 8 = 40', '5 x 9 = 45', '5 x 10 = 50', '5 x 11 = 55', '5 x 12 = 60']",
    "hints": [
      "Use a `for` loop to iterate from 1 to 12.",
      "Use an f-string to format each line of the times table."
    ],
    "starterCode": "number = 5\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "number = 5\n\ndef solve():\n    table = []\n    for i in range(1, 13):\n        table.append(f\"{number} x {i} = {number * i}\")\n    print(table)\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "number = 5",
        "expected": "['5 x 1 = 5', '5 x 2 = 10', '5 x 3 = 15', '5 x 4 = 20', '5 x 5 = 25', '5 x 6 = 30', '5 x 7 = 35', '5 x 8 = 40', '5 x 9 = 45', '5 x 10 = 50', '5 x 11 = 55', '5 x 12 = 60']",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "loops",
      "list",
      "string formatting",
      "math"
    ]
  },
  {
    "id": "039",
    "number": 39,
    "title": "Count Down to User Number",
    "titleVi": "Đếm ngược đến số của người dùng",
    "difficulty": "easy",
    "section": "Loops",
    "description": "Write a function `solve(target_number)` that takes an integer `target_number`. It should return a list of numbers counting down from 50 to `target_number` (inclusive).",
    "descriptionVi": "Viết hàm `solve(target_number)` nhận một số nguyên `target_number`. Hàm sẽ trả về một danh sách các số đếm ngược từ 50 xuống `target_number` (bao gồm cả `target_number`).",
    "expectedOutput": "[50, 49, 48, 47, 46, 45]",
    "hints": [
      "Use `range(start, stop, step)` to create the countdown sequence.",
      "Remember that the `stop` value in `range` is exclusive, so adjust it accordingly."
    ],
    "starterCode": "target_number = 45\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "target_number = 45\n\ndef solve():\n    result = []\n    for i in range(50, target_number - 1, -1):\n        result.append(i)\n    print(result)\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "target_number = 45",
        "expected": "[50, 49, 48, 47, 46, 45]",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "loops",
      "list",
      "range"
    ]
  },
  {
    "id": "040",
    "number": 40,
    "title": "Conditional Name Display",
    "titleVi": "Hiển thị tên có điều kiện",
    "difficulty": "easy",
    "section": "Conditional Statements",
    "description": "Write a function `solve(number, name)` that takes an integer `number` and a string `name`. If `number` is less than 10, it should return a list containing `name` repeated `number` times. Otherwise (if `number` is 10 or greater), it should return a list containing the string 'Too high' repeated three times.",
    "descriptionVi": "Viết hàm `solve(number, name)` nhận một số nguyên `number` và một chuỗi `name`. Nếu `number` nhỏ hơn 10, hàm sẽ trả về một danh sách chứa `name` lặp lại `number` lần. Ngược lại (nếu `number` từ 10 trở lên), hàm sẽ trả về một danh sách chứa chuỗi 'Too high' lặp lại ba lần.",
    "expectedOutput": "['John', 'John', 'John', 'John']",
    "hints": [
      "Use an `if-else` statement to check the condition for `number`.",
      "Use a `for` loop to repeat the name or the 'Too high' string."
    ],
    "starterCode": "number = 4\nname = 'John'\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "number = 4\nname = 'John'\n\ndef solve():\n    result = []\n    if number < 10:\n        for _ in range(number):\n            result.append(name)\n    else:\n        for _ in range(3):\n            result.append('Too high')\n    print(result)\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "number = 4, name = 'John'",
        "expected": "['John', 'John', 'John', 'John']",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "conditional",
      "loops",
      "list",
      "string"
    ]
  },
  {
    "id": "041",
    "number": 41,
    "title": "Sum 5 Numbers (Optional Inclusion)",
    "titleVi": "Tổng 5 số (có điều kiện)",
    "difficulty": "medium",
    "section": "Loops",
    "description": "Write a function `solve(numbers_list)` that takes a list of 5 integers. It should sum only the numbers that the original challenge implies would be included (implicitly, this means adding all 5 numbers). Return the total.",
    "descriptionVi": "Viết hàm `solve(numbers_list)` nhận một danh sách 5 số nguyên. Hàm sẽ chỉ tổng các số mà thử thách gốc ngụ ý sẽ được đưa vào (ngụ ý, điều này có nghĩa là cộng tất cả 5 số). Trả về tổng.",
    "expectedOutput": "The total is 15",
    "hints": [
      "The original problem implies adding all numbers entered without explicit conditions for exclusion.",
      "Use a loop to iterate through the list and sum the numbers."
    ],
    "starterCode": "numbers_list = [1, 2, 3, 4, 5]\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "numbers_list = [1, 2, 3, 4, 5]\n\ndef solve():\n    total = 0\n    for num in numbers_list:\n        total += num\n    print(f\"The total is {total}\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "numbers_list = [1, 2, 3, 4, 5]",
        "expected": "The total is 15",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "loops",
      "list",
      "sum"
    ]
  },
  {
    "id": "042",
    "number": 42,
    "title": "Count Up or Down",
    "titleVi": "Đếm lên hoặc đếm xuống",
    "difficulty": "medium",
    "section": "Loops",
    "description": "Write a function `solve(choice, num)` that takes a string `choice` ('up' or 'down') and an integer `num`. \n- If `choice` is 'up', return a list of numbers from 1 to `num` (inclusive).\n- If `choice` is 'down', return a list of numbers counting down from `num` to 1 (inclusive).\n- If `choice` is neither, return an empty list.",
    "descriptionVi": "Viết hàm `solve(choice, num)` nhận một chuỗi `choice` ('up' hoặc 'down') và một số nguyên `num`. \n- Nếu `choice` là 'up', trả về một danh sách các số từ 1 đến `num` (bao gồm `num`).\n- Nếu `choice` là 'down', trả về một danh sách các số đếm ngược từ `num` xuống 1 (bao gồm `num`).\n- Nếu `choice` không phải là 'up' cũng không phải 'down', trả về một danh sách rỗng.",
    "expectedOutput": "[1, 2, 3, 4, 5]",
    "hints": [
      "Use an `if-elif-else` statement for the choice.",
      "Use `range(start, stop)` for counting up and `range(start, stop, step)` for counting down."
    ],
    "starterCode": "choice = 'up'\nnum = 5\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "choice = 'up'\nnum = 5\n\ndef solve():\n    result = []\n    if choice == 'up':\n        for i in range(1, num + 1):\n            result.append(i)\n    elif choice == 'down':\n        for i in range(num, 0, -1):\n            result.append(i)\n    print(result)\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "choice = 'up', num = 5",
        "expected": "[1, 2, 3, 4, 5]",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "conditional",
      "loops",
      "list",
      "range"
    ]
  },
  {
    "id": "043",
    "number": 43,
    "title": "Invite Friends to Party",
    "titleVi": "Mời bạn bè đến bữa tiệc",
    "difficulty": "medium",
    "section": "Loops",
    "description": "Write a function `solve(friend_list)` that takes a list of friend names. It should simulate inviting friends to a party. If the `friend_list` contains more than 10 friends, it should return a truncated list containing only the first 10 friends. If the list is 10 or fewer, return the original list. The returned list should contain strings like 'You have invited [friend_name]'.",
    "descriptionVi": "Viết hàm `solve(friend_list)` nhận một danh sách tên bạn bè. Hàm sẽ mô phỏng việc mời bạn bè đến một bữa tiệc. Nếu `friend_list` chứa nhiều hơn 10 người bạn, hàm sẽ trả về một danh sách đã cắt chỉ chứa 10 người bạn đầu tiên. Nếu danh sách có 10 người bạn trở xuống, trả về danh sách gốc. Danh sách trả về phải chứa các chuỗi như 'You have invited [friend_name]'.",
    "expectedOutput": "['You have invited Alice', 'You have invited Bob', 'You have invited Charlie', 'You have invited David', 'You have invited Eve', 'You have invited Frank', 'You have invited Grace', 'You have invited Heidi', 'You have invited Ivan', 'You have invited Judy']",
    "hints": [
      "Check the length of the `friend_list`.",
      "Use slicing `[:10]` to get the first 10 elements if needed.",
      "Use a list comprehension or a loop to format the invitation messages."
    ],
    "starterCode": "friend_list = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Heidi', 'Ivan', 'Judy', 'Kevin', 'Liam']\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "friend_list = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Heidi', 'Ivan', 'Judy', 'Kevin', 'Liam']\n\ndef solve():\n    invited_friends = []\n    if len(friend_list) > 10:\n        for friend in friend_list[:10]:\n            invited_friends.append(f\"You have invited {friend}\")\n    else:\n        for friend in friend_list:\n            invited_friends.append(f\"You have invited {friend}\")\n    print(invited_friends)\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "friend_list = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Heidi', 'Ivan', 'Judy', 'Kevin', 'Liam']",
        "expected": "['You have invited Alice', 'You have invited Bob', 'You have invited Charlie', 'You have invited David', 'You have invited Eve', 'You have invited Frank', 'You have invited Grace', 'You have invited Heidi', 'You have invited Ivan', 'You have invited Judy']",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "loops",
      "list",
      "conditional",
      "string formatting"
    ]
  },
  {
    "id": "044",
    "number": 44,
    "title": "Display Even Numbers Between Two Values",
    "titleVi": "Hiển thị số chẵn giữa hai giá trị",
    "difficulty": "medium",
    "section": "Loops",
    "description": "Write a function `solve(start_num, end_num)` that takes two integers, `start_num` and `end_num`. It should return a list of all even numbers (inclusive) between these two values.",
    "descriptionVi": "Viết hàm `solve(start_num, end_num)` nhận hai số nguyên, `start_num` và `end_num`. Hàm sẽ trả về một danh sách tất cả các số chẵn (bao gồm cả `start_num` và `end_num` nếu chúng là số chẵn) nằm giữa hai giá trị này.",
    "expectedOutput": "[10, 12, 14, 16]",
    "hints": [
      "Use a `for` loop with `range(start_num, end_num + 1)`.",
      "Use the modulo operator (`%`) to check if a number is even (a number is even if `number % 2 == 0`)."
    ],
    "starterCode": "start_num = 10\nend_num = 16\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "start_num = 10\nend_num = 16\n\ndef solve():\n    even_numbers = []\n    for i in range(start_num, end_num + 1):\n        if i % 2 == 0:\n            even_numbers.append(i)\n    print(even_numbers)\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "start_num = 10, end_num = 16",
        "expected": "[10, 12, 14, 16]",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "loops",
      "conditional",
      "list",
      "math"
    ]
  },
  {
    "id": "045",
    "number": 45,
    "title": "Password Until Correct",
    "titleVi": "Mật khẩu cho đến khi đúng",
    "difficulty": "medium",
    "section": "Loops",
    "description": "Write a function `solve(correct_password, attempts)` that takes a hardcoded `correct_password` string and a list of `attempts` passwords. It should simulate asking for a password until the correct one is entered. Return the first correct password string, or 'Access Denied' if none of the attempts are correct.",
    "descriptionVi": "Viết hàm `solve(correct_password, attempts)` nhận một chuỗi `correct_password` được mã hóa cứng và một danh sách các mật khẩu `attempts`. Hàm này sẽ mô phỏng việc yêu cầu mật khẩu cho đến khi nhập đúng mật khẩu. Trả về chuỗi mật khẩu đúng đầu tiên, hoặc 'Access Denied' nếu không có nỗ lực nào đúng.",
    "expectedOutput": "secret",
    "hints": [
      "Use a `for` loop to iterate through the `attempts` list.",
      "Use an `if` statement to check if the current attempt matches the `correct_password`.",
      "If a match is found, return immediately. If the loop completes without a match, then return 'Access Denied'."
    ],
    "starterCode": "correct_password = 'secret'\nattempts = ['wrong1', 'wrong2', 'secret', 'wrong3']\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "correct_password = 'secret'\nattempts = ['wrong1', 'wrong2', 'secret', 'wrong3']\n\ndef solve():\n    for attempt in attempts:\n        if attempt == correct_password:\n            return correct_password\n    print('Access Denied')\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "correct_password = 'secret', attempts = ['wrong1', 'wrong2', 'secret', 'wrong3']",
        "expected": "secret",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "loops",
      "conditional",
      "string"
    ]
  },
  {
    "id": "046",
    "number": 46,
    "title": "Total Numbers Until Over 100",
    "titleVi": "Tổng các số cho đến khi vượt quá 100",
    "difficulty": "medium",
    "section": "Loops",
    "description": "Write a function `solve(numbers_list)` that takes a list of integers. It should add numbers from the list to a running total until the total becomes greater than 100. Return the final total.",
    "descriptionVi": "Viết hàm `solve(numbers_list)` nhận một danh sách số nguyên. Hàm sẽ cộng các số từ danh sách vào tổng đang chạy cho đến khi tổng lớn hơn 100. Trả về tổng cuối cùng.",
    "expectedOutput": "The total is 150",
    "hints": [
      "Use a `while` loop or a `for` loop with a `break` statement.",
      "Initialize `total = 0` before the loop."
    ],
    "starterCode": "numbers_list = [10, 20, 30, 40, 50, 60]\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "numbers_list = [10, 20, 30, 40, 50, 60]\n\ndef solve():\n    total = 0\n    for num in numbers_list:\n        total += num\n        if total > 100:\n            break\n    print(f\"The total is {total}\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "numbers_list = [10, 20, 30, 40, 50, 60]",
        "expected": "The total is 150",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "loops",
      "conditional",
      "list",
      "sum"
    ]
  },
  {
    "id": "047",
    "number": 47,
    "title": "Average Until -1",
    "titleVi": "Trung bình cho đến khi -1",
    "difficulty": "medium",
    "section": "Loops",
    "description": "Write a function `solve(numbers_sequence)` that takes a list of integers. It should calculate the average of these numbers until a -1 is encountered. The -1 itself should not be included in the calculation. Return the average as a string formatted to two decimal places. If no numbers are entered before -1, or if the list is empty, return 'No numbers to average'.",
    "descriptionVi": "Viết hàm `solve(numbers_sequence)` nhận một danh sách các số nguyên. Hàm sẽ tính trung bình của các số này cho đến khi gặp -1. Số -1 không được tính vào. Trả về giá trị trung bình dưới dạng chuỗi được định dạng đến hai chữ số thập phân. Nếu không có số nào được nhập trước khi gặp -1, hoặc nếu danh sách trống, trả về 'No numbers to average'.",
    "expectedOutput": "The average is 2.50",
    "hints": [
      "Use a loop to iterate through the input list.",
      "Maintain a running `total` and a `count` of numbers.",
      "Use a `break` statement when -1 is found.",
      "Handle the division by zero case if no numbers are processed."
    ],
    "starterCode": "numbers_sequence = [1, 2, 3, 4, -1, 5, 6]\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "numbers_sequence = [1, 2, 3, 4, -1, 5, 6]\n\ndef solve():\n    total = 0\n    count = 0\n    for num in numbers_sequence:\n        if num == -1:\n            break\n        total += num\n        count += 1\n\n    if count == 0:\n        return 'No numbers to average'\n    else:\n        average = total / count\n        return f\"The average is {average:.2f}\"\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "numbers_sequence = [1, 2, 3, 4, -1, 5, 6]",
        "expected": "The average is 2.50",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "loops",
      "conditional",
      "list",
      "math",
      "average",
      "formatting"
    ]
  },
  {
    "id": "048",
    "number": 48,
    "title": "Guess Hardcoded Number",
    "titleVi": "Đoán số mã hóa cứng",
    "difficulty": "medium",
    "section": "Loops",
    "description": "Write a function `solve(guesses)` that simulates a number guessing game. The target number is hardcoded to 50. The function takes a list of `guesses`. For each guess, it should return a list of strings with hints: 'Too high', 'Too low', or 'Correct!'. If 'Correct!' is returned, no further guesses are processed. The list should only contain messages for processed guesses.",
    "descriptionVi": "Viết hàm `solve(guesses)` mô phỏng trò chơi đoán số. Số mục tiêu được mã hóa cứng là 50. Hàm nhận một danh sách `guesses`. Với mỗi lần đoán, hàm sẽ trả về một danh sách các chuỗi gợi ý: 'Too high', 'Too low', hoặc 'Correct!'. Nếu 'Correct!' được trả về, không có đoán nào nữa được xử lý. Danh sách chỉ nên chứa thông báo cho các lần đoán đã được xử lý.",
    "expectedOutput": "['Too low', 'Too high', 'Correct!']",
    "hints": [
      "The target number is 50.",
      "Use a `for` loop to iterate through the `guesses` list.",
      "Use `if-elif-else` to check if a guess is too high, too low, or correct.",
      "Use `break` to stop processing guesses once the correct one is found."
    ],
    "starterCode": "guesses = [25, 75, 50, 40]\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "guesses = [25, 75, 50, 40]\n\ndef solve():\n    target_number = 50\n    result_messages = []\n    for guess in guesses:\n        if guess < target_number:\n            result_messages.append('Too low')\n        elif guess > target_number:\n            result_messages.append('Too high')\n        else:\n            result_messages.append('Correct!')\n            break # Stop if correct guess is made\n    print(result_messages)\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "guesses = [25, 75, 50, 40]",
        "expected": "['Too low', 'Too high', 'Correct!']",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "loops",
      "conditional",
      "list",
      "game"
    ]
  },
  {
    "id": "049",
    "number": 49,
    "title": "Number Guessing with Limited Attempts",
    "titleVi": "Đoán số với số lần thử giới hạn",
    "difficulty": "hard",
    "section": "Loops",
    "description": "Write a function `solve(target_number, guesses)` that simulates a number guessing game with a limit of 5 attempts. The function takes the `target_number` and a list of `guesses`. Return a list of strings with results: 'Attempt X: Too high', 'Attempt X: Too low', 'Attempt X: Correct!'. If 5 attempts are exhausted without a correct guess, append 'You ran out of attempts.' to the list. If a correct guess is made, stop and return the results up to that point.",
    "descriptionVi": "Viết hàm `solve(target_number, guesses)` mô phỏng trò chơi đoán số với giới hạn 5 lần thử. Hàm nhận `target_number` và một danh sách `guesses`. Trả về một danh sách các chuỗi kết quả: 'Attempt X: Too high', 'Attempt X: Too low', 'Attempt X: Correct!'. Nếu đã hết 5 lần thử mà không đoán đúng, hãy thêm 'You ran out of attempts.' vào danh sách. Nếu đoán đúng, dừng lại và trả về kết quả cho đến thời điểm đó.",
    "expectedOutput": "['Attempt 1: Too low', 'Attempt 2: Too high', 'Attempt 3: Correct!']",
    "hints": [
      "Use a `for` loop with `enumerate` to get the attempt number (starting from 1).",
      "Limit the loop to 5 iterations using `range(min(len(guesses), 5))`.",
      "Use `if-elif-else` for hints.",
      "Use `break` when the correct guess is found.",
      "After the loop, check if the correct guess was found to append the 'ran out of attempts' message."
    ],
    "starterCode": "target_number = 42\nguesses = [20, 60, 42, 30]\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "target_number = 42\nguesses = [20, 60, 42, 30]\n\ndef solve():\n    result_messages = []\n    max_attempts = 5\n    correct_found = False\n\n    for i, guess in enumerate(guesses[:max_attempts]):\n        attempt_num = i + 1\n        if guess < target_number:\n            result_messages.append(f'Attempt {attempt_num}: Too low')\n        elif guess > target_number:\n            result_messages.append(f'Attempt {attempt_num}: Too high')\n        else:\n            result_messages.append(f'Attempt {attempt_num}: Correct!')\n            correct_found = True\n            break\n\n    if not correct_found and len(guesses) >= max_attempts:\n        result_messages.append('You ran out of attempts.')\n\n    print(result_messages)\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "target_number = 42, guesses = [20, 60, 42, 30]",
        "expected": "['Attempt 1: Too low', 'Attempt 2: Too high', 'Attempt 3: Correct!']",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "loops",
      "conditional",
      "list",
      "game"
    ]
  },
  {
    "id": "050",
    "number": 50,
    "title": "Count Names Until 'stop'",
    "titleVi": "Đếm tên cho đến khi 'stop'",
    "difficulty": "medium",
    "section": "Loops",
    "description": "Write a function `solve(name_list)` that takes a list of strings (names). It should count how many names are in the list before the string 'stop' is encountered. The string 'stop' itself should not be counted. Return a string formatted as 'You have entered [count] names.'",
    "descriptionVi": "Viết hàm `solve(name_list)` nhận một danh sách các chuỗi (tên). Hàm sẽ đếm có bao nhiêu tên trong danh sách trước khi gặp chuỗi 'stop'. Chuỗi 'stop' không được tính. Trả về một chuỗi được định dạng là 'You have entered [count] names.'",
    "expectedOutput": "You have entered 3 names.",
    "hints": [
      "Use a `for` loop to iterate through the list.",
      "Maintain a `count` variable.",
      "Use an `if` statement to check for 'stop' and a `break` to exit the loop.",
      "Ensure the 'stop' string is case-sensitive as specified."
    ],
    "starterCode": "name_list = ['Alice', 'Bob', 'Charlie', 'stop', 'David']\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "name_list = ['Alice', 'Bob', 'Charlie', 'stop', 'David']\n\ndef solve():\n    count = 0\n    for name in name_list:\n        if name == 'stop':\n            break\n        count += 1\n    print(f\"You have entered {count} names.\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "name_list = ['Alice', 'Bob', 'Charlie', 'stop', 'David']",
        "expected": "You have entered 3 names.",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "loops",
      "conditional",
      "list",
      "string"
    ]
  },
  {
    "id": "051",
    "number": 51,
    "title": "ATM Simulation",
    "titleVi": "Mô phỏng ATM",
    "difficulty": "hard",
    "section": "Loops",
    "description": "Write a function `solve(initial_balance, transactions)` that simulates a simple ATM. It takes an `initial_balance` (float) and a list of `transactions`. Each transaction is a tuple: `('deposit', amount)` or `('withdraw', amount)`. Return a list of strings representing the outcome of each transaction and the final balance. If a withdrawal would result in a negative balance, return 'Insufficient funds' for that transaction and do not process it. The format should be: 'Deposit: [amount], New Balance: [new_balance]', 'Withdraw: [amount], New Balance: [new_balance]', or 'Withdraw: [amount], Insufficient funds. Current Balance: [current_balance]'. All balance and amount values should be formatted to two decimal places.",
    "descriptionVi": "Viết hàm `solve(initial_balance, transactions)` mô phỏng một máy ATM đơn giản. Hàm nhận `initial_balance` (số thực) và một danh sách `transactions` (giao dịch). Mỗi giao dịch là một tuple: `('deposit', amount)` hoặc `('withdraw', amount)`. Trả về một danh sách các chuỗi đại diện cho kết quả của mỗi giao dịch và số dư cuối cùng. Nếu một giao dịch rút tiền dẫn đến số dư âm, hãy trả về 'Insufficient funds' cho giao dịch đó và không xử lý nó. Định dạng phải là: 'Deposit: [amount], New Balance: [new_balance]', 'Withdraw: [amount], New Balance: [new_balance]', hoặc 'Withdraw: [amount], Insufficient funds. Current Balance: [current_balance]'. Tất cả các giá trị số dư và số tiền phải được định dạng đến hai chữ số thập phân.",
    "expectedOutput": "['Deposit: 100.00, New Balance: 600.00', 'Withdraw: 200.00, New Balance: 400.00', 'Final Balance: 400.00']",
    "hints": [
      "Keep a `current_balance` variable.",
      "Iterate through the `transactions` list.",
      "Use `if-elif` to handle 'deposit' and 'withdraw' actions.",
      "For 'withdraw', check if `current_balance` is sufficient before deducting.",
      "Use f-strings for precise formatting to two decimal places (`:.2f`)."
    ],
    "starterCode": "initial_balance = 500.00\ntransactions = [('deposit', 100.00), ('withdraw', 200.00)]\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "initial_balance = 500.00\ntransactions = [('deposit', 100.00), ('withdraw', 200.00)]\n\ndef solve():\n    balance = initial_balance\n    results = []\n\n    for op_type, amount in transactions:\n        if op_type == 'deposit':\n            balance += amount\n            results.append(f'Deposit: {amount:.2f}, New Balance: {balance:.2f}')\n        elif op_type == 'withdraw':\n            if balance >= amount:\n                balance -= amount\n                results.append(f'Withdraw: {amount:.2f}, New Balance: {balance:.2f}')\n            else:\n                results.append(f'Withdraw: {amount:.2f}, Insufficient funds. Current Balance: {balance:.2f}')\n\n    results.append(f'Final Balance: {balance:.2f}')\n    print(results)\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "initial_balance = 500.00, transactions = [('deposit', 100.00), ('withdraw', 200.00)]",
        "expected": "['Deposit: 100.00, New Balance: 600.00', 'Withdraw: 200.00, New Balance: 400.00', 'Final Balance: 400.00']",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "loops",
      "conditional",
      "list",
      "financial",
      "float",
      "formatting"
    ]
  },
  {
    "id": "052",
    "number": 52,
    "title": "Generate Random Number 1-100",
    "titleVi": "Tạo số ngẫu nhiên 1-100",
    "difficulty": "easy",
    "section": "Random",
    "description": "Write a function `solve()` that generates a random integer between 1 and 100 (inclusive). Return the generated number.",
    "descriptionVi": "Viết hàm `solve()` tạo một số nguyên ngẫu nhiên trong khoảng từ 1 đến 100 (bao gồm cả 1 và 100). Trả về số đã tạo.",
    "expectedOutput": "82",
    "hints": [
      "You will need to import the `random` module.",
      "Use `random.randint(a, b)` for inclusive range generation."
    ],
    "starterCode": "import random\nrandom.seed(42)\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "import random\nrandom.seed(42)\n\ndef solve():\n    print(random.randint(1, 100))\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "No explicit input, function call only.",
        "expected": "82",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "random",
      "functions",
      "integer"
    ]
  },
  {
    "id": "053",
    "number": 53,
    "title": "Random Number Over/Under 50",
    "titleVi": "Số ngẫu nhiên lớn hơn/nhỏ hơn 50",
    "difficulty": "medium",
    "section": "Random",
    "description": "Write a function `solve(random_number)` that takes a randomly generated integer (between 1 and 100). It should return 'Over 50' if the number is greater than 50, 'Under 50' if it's less than 50, and 'Exactly 50' if it's 50.",
    "descriptionVi": "Viết hàm `solve(random_number)` nhận một số nguyên ngẫu nhiên (từ 1 đến 100). Hàm sẽ trả về 'Over 50' nếu số đó lớn hơn 50, 'Under 50' nếu nhỏ hơn 50 và 'Exactly 50' nếu là 50.",
    "expectedOutput": "Over 50",
    "hints": [
      "Use `if-elif-else` statements to check the conditions.",
      "The input `random_number` will be provided, so you don't need to generate it inside the function.",
      "Be careful with strict inequalities (> or <) vs. equality (==)."
    ],
    "starterCode": "import random\nrandom.seed(42)\nrandom_number = 75\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "import random\nrandom.seed(42)\nrandom_number = 75\n\ndef solve():\n    if random_number > 50:\n        return 'Over 50'\n    elif random_number < 50:\n        return 'Under 50'\n    else:\n        return 'Exactly 50'\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "random_number = 75",
        "expected": "Over 50",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "conditional",
      "functions",
      "integer"
    ]
  },
  {
    "id": "054",
    "number": 54,
    "title": "Heads or Tails Simulator",
    "titleVi": "Mô phỏng sấp ngửa",
    "difficulty": "easy",
    "section": "Random",
    "description": "Write a function `solve(choice)` that takes a string `choice` ('heads' or 'tails'). The function simulates a coin flip. If the simulated flip matches the `choice`, return 'You win!'. Otherwise, return 'You lose!'. The coin flip should be truly random.",
    "descriptionVi": "Viết hàm `solve(choice)` nhận một chuỗi `choice` ('heads' hoặc 'tails'). Hàm này mô phỏng một lần tung đồng xu. Nếu kết quả tung trùng với `choice`, trả về 'You win!'. Ngược lại, trả về 'You lose!'. Lần tung đồng xu phải thực sự ngẫu nhiên.",
    "expectedOutput": "You win!",
    "hints": [
      "You will need to import the `random` module.",
      "Use `random.randint(0, 1)` or `random.choice(['heads', 'tails'])` to simulate the coin flip."
    ],
    "starterCode": "import random\nrandom.seed(42)\n\nchoice = 'heads'\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "import random\nrandom.seed(42)\n\nchoice = 'heads'\n\ndef solve():\n    coin_flip = random.choice(['heads', 'tails'])\n    if choice.lower() == coin_flip:\n        return 'You win!'\n    else:\n        return 'You lose!'\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "choice = 'heads'",
        "expected": "You win!",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "random",
      "conditional",
      "string",
      "game"
    ]
  },
  {
    "id": "055",
    "number": 55,
    "title": "Rock Paper Scissors vs Computer",
    "titleVi": "Oẳn tù tì đấu với máy tính",
    "difficulty": "medium",
    "section": "Random",
    "description": "Write a Rock Paper Scissors round against the computer. `player_choice` is 'rock', 'paper' or 'scissors'. The computer picks randomly with `random.choice` (the seed is fixed so the result is repeatable). Print the computer's choice on the first line, then the result: 'You win!', 'You lose!' or \"It's a draw!\".",
    "descriptionVi": "Viet mot luot Bua Bao Keo voi may. `player_choice` la 'rock', 'paper' hoac 'scissors'. May chon ngau nhien bang `random.choice` (seed co dinh nen ket qua lap lai duoc). In lua chon cua may o dong dau, sau do in ket qua: 'You win!', 'You lose!' hoac \"It's a draw!\".",
    "expectedOutput": "Computer chose scissors\nYou win!",
    "hints": [
      "You will need to import the `random` module.",
      "Use `random.choice(['rock', 'paper', 'scissors'])` for the computer's move.",
      "Implement the game logic using `if-elif-else` statements to determine the winner.",
      "Consider all nine possible combinations (3 player choices * 3 computer choices)."
    ],
    "starterCode": "import random\nrandom.seed(42)\n\nplayer_choice = 'rock'\n\n# Your code here",
    "solution": "import random\nrandom.seed(42)\n\nplayer_choice = 'rock'\n\nchoices = ['rock', 'paper', 'scissors']\ncomputer_choice = random.choice(choices)\n\nif player_choice == computer_choice:\n    result = \"It's a draw!\"\nelif (\n    (player_choice == 'rock' and computer_choice == 'scissors')\n    or (player_choice == 'scissors' and computer_choice == 'paper')\n    or (player_choice == 'paper' and computer_choice == 'rock')\n):\n    result = 'You win!'\nelse:\n    result = 'You lose!'\n\nprint(f\"Computer chose {computer_choice}\")\nprint(result)",
    "testCases": [
      {
        "input": "player_choice = 'rock'",
        "expected": "Computer chose scissors\nYou win!",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "random",
      "conditional",
      "string",
      "game"
    ]
  },
  {
    "id": "056",
    "number": 56,
    "title": "Random Math Quiz (Addition)",
    "titleVi": "Trò chơi đố toán ngẫu nhiên (phép cộng)",
    "difficulty": "medium",
    "section": "Random",
    "description": "Build a random addition quiz. Pick two random numbers from 1 to 100 with `random.randint` (the seed is fixed so the numbers are always the same). Print the question, then compare `user_answer` with the real sum: print 'Correct!' or 'Incorrect. The answer was X.'",
    "descriptionVi": "Tao mot bai quiz cong ngau nhien. Lay hai so ngau nhien tu 1 den 100 bang `random.randint` (seed co dinh nen so luon giong nhau). In cau hoi, sau do so sanh `user_answer` voi tong that: in 'Correct!' hoac 'Incorrect. The answer was X.'",
    "expectedOutput": "Question: 82 + 15 = ?\nCorrect!",
    "hints": [
      "You will need to import the `random` module.",
      "Generate two random numbers using `random.randint(1, 100)`.",
      "Calculate the `correct_answer` inside the function.",
      "Compare `answer` (which simulates user input) with `correct_answer`.",
      "Return the appropriate string based on the comparison."
    ],
    "starterCode": "import random\nrandom.seed(42)\n\nuser_answer = 97\n\n# Your code here",
    "solution": "import random\nrandom.seed(42)\n\nuser_answer = 97\n\nnum1 = random.randint(1, 100)\nnum2 = random.randint(1, 100)\ncorrect_sum = num1 + num2\n\nprint(f\"Question: {num1} + {num2} = ?\")\nif user_answer == correct_sum:\n    print('Correct!')\nelse:\n    print(f'Incorrect. The answer was {correct_sum}.')",
    "testCases": [
      {
        "input": "user_answer = 97",
        "expected": "Question: 82 + 15 = ?\nCorrect!",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "random",
      "math",
      "conditional",
      "string"
    ]
  },
  {
    "id": "057",
    "number": 57,
    "title": "Random Math Quiz (All Operations)",
    "titleVi": "Trò chơi đố toán ngẫu nhiên (tất cả các phép tính)",
    "difficulty": "hard",
    "section": "Random",
    "description": "Build a random math quiz over the operators +, -, * and //. Pick the operator with `random.choice` and the operands with `random.randint` (the seed is fixed, and for // make sure the first number is a multiple of the second). Print the question, then compare `user_answer` with the correct result: print 'Correct!' or 'Incorrect. The answer was X.'",
    "descriptionVi": "Tao bai quiz toan ngau nhien voi cac phep +, -, * va //. Chon phep tinh bang `random.choice` va cac so bang `random.randint` (seed co dinh; voi // hay dam bao so thu nhat la boi cua so thu hai). In cau hoi, sau do so sanh `user_answer` voi ket qua dung: in 'Correct!' hoac 'Incorrect. The answer was X.'",
    "expectedOutput": "Question: 4 + 95 = ?\nCorrect!",
    "hints": [
      "Import `random`.",
      "Define lists for operators and number ranges.",
      "Generate a random operator and two random numbers based on the operator.",
      "For division: ensure `num1` is a multiple of `num2` and `num2` is not zero. You might need to regenerate `num1` or `num2` until this condition is met, or pre-select numbers that work.",
      "Use `if-elif-else` to perform the calculation based on the operator.",
      "Compare the `answer` argument with the calculated `correct_result`."
    ],
    "starterCode": "import random\nrandom.seed(42)\n\nuser_answer = 99\n\n# Your code here",
    "solution": "import random\nrandom.seed(42)\n\nuser_answer = 99\n\noperators = ['+', '-', '*', '//']\nop = random.choice(operators)\n\nif op == '+':\n    num1, num2 = random.randint(1, 100), random.randint(1, 100)\nelif op == '//':\n    num2 = random.randint(1, 10)\n    num1 = num2 * random.randint(1, 10)\nelse:\n    num1, num2 = random.randint(1, 10), random.randint(1, 10)\n\nif op == '+':\n    correct = num1 + num2\nelif op == '-':\n    correct = num1 - num2\nelif op == '*':\n    correct = num1 * num2\nelse:\n    correct = num1 // num2\n\nprint(f\"Question: {num1} {op} {num2} = ?\")\nif user_answer == correct:\n    print('Correct!')\nelse:\n    print(f'Incorrect. The answer was {correct}.')",
    "testCases": [
      {
        "input": "user_answer = 99",
        "expected": "Question: 4 + 95 = ?\nCorrect!",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "random",
      "math",
      "conditional",
      "string"
    ]
  },
  {
    "id": "058",
    "number": 58,
    "title": "Dice Rolling Simulator (Until 6)",
    "titleVi": "Mô phỏng gieo xúc xắc (cho đến khi ra 6)",
    "difficulty": "medium",
    "section": "Random",
    "description": "Write a function `solve(roll_sequence)` that simulates rolling a dice repeatedly until a 6 is rolled. The `roll_sequence` is a list of integers representing pre-determined dice rolls. The function should count how many rolls it took and return a string formatted as 'It took [count] rolls to get a 6.'. If 6 is never in the sequence, return '6 was not rolled.'.",
    "descriptionVi": "Viết hàm `solve(roll_sequence)` mô phỏng việc gieo xúc xắc liên tục cho đến khi ra mặt 6. `roll_sequence` là một danh sách các số nguyên đại diện cho các lần gieo xúc xắc đã được xác định trước. Hàm sẽ đếm số lần gieo và trả về một chuỗi được định dạng là 'It took [count] rolls to get a 6.'. Nếu không bao giờ có 6 trong chuỗi, trả về '6 was not rolled.'.",
    "expectedOutput": "It took 3 rolls to get a 6.",
    "hints": [
      "Use a `for` loop with `enumerate` to count rolls.",
      "Use a `break` statement when a 6 is encountered.",
      "Keep a flag or check if the loop completed without finding a 6."
    ],
    "starterCode": "roll_sequence = [1, 5, 6, 2, 4]\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "roll_sequence = [1, 5, 6, 2, 4]\n\ndef solve():\n    rolls = 0\n    found_six = False\n    for roll in roll_sequence:\n        rolls += 1\n        if roll == 6:\n            found_six = True\n            break\n\n    if found_six:\n        return f'It took {rolls} rolls to get a 6.'\n    else:\n        return '6 was not rolled.'\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "roll_sequence = [1, 5, 6, 2, 4]",
        "expected": "It took 3 rolls to get a 6.",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "loops",
      "conditional",
      "random",
      "game"
    ]
  },
  {
    "id": "059",
    "number": 59,
    "title": "Generate Random Password",
    "titleVi": "Tạo mật khẩu ngẫu nhiên",
    "difficulty": "medium",
    "section": "Random",
    "description": "Write a function `solve(length)` that generates a random password of a given `length`. The password should consist of a mix of lowercase letters, uppercase letters, and digits. Return the generated password string.",
    "descriptionVi": "Viết hàm `solve(length)` tạo một mật khẩu ngẫu nhiên có độ dài `length`. Mật khẩu phải bao gồm sự kết hợp của các chữ cái thường, chữ cái hoa và chữ số. Trả về chuỗi mật khẩu đã tạo.",
    "expectedOutput": "OhbVrpoi",
    "hints": [
      "You will need to import the `random` module and the `string` module (for `string.ascii_letters` and `string.digits`).",
      "Combine possible characters into a single string or list.",
      "Use a loop to append `length` random characters to build the password.",
      "Use `random.choice()` to select characters."
    ],
    "starterCode": "import random\nrandom.seed(42)\nimport string\n\nlength = 8\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "import random\nrandom.seed(42)\nimport string\n\nlength = 8\n\ndef solve():\n    if length <= 0:\n        return ''\n    characters = string.ascii_letters + string.digits\n    password = ''.join(random.choice(characters) for i in range(length))\n    print(password)\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "length = 8",
        "expected": "OhbVrpoi",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "random",
      "string",
      "loops",
      "security"
    ]
  },
  {
    "id": "060",
    "number": 60,
    "title": "Draw a Square Pattern",
    "titleVi": "Vẽ mẫu hình vuông",
    "difficulty": "easy",
    "section": "Console Patterns",
    "description": "Write a function `solve(side)` that returns a list of strings representing a square pattern of '*' characters. The `side` parameter indicates the length of each side of the square. Each string in the list corresponds to a row of the pattern.",
    "descriptionVi": "Viết hàm `solve(side)` trả về một danh sách các chuỗi đại diện cho một mẫu hình vuông gồm các ký tự '*'. Tham số `side` cho biết độ dài của mỗi cạnh hình vuông. Mỗi chuỗi trong danh sách tương ứng với một hàng của mẫu.",
    "expectedOutput": "['****', '****', '****', '****']",
    "hints": [
      "Use a `for` loop to iterate `side` number of times for the rows.",
      "In each iteration, create a string of `side` '*' characters.",
      "Append each created string to a list."
    ],
    "starterCode": "side = 4\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "side = 4\n\ndef solve():\n    pattern = []\n    for _ in range(side):\n        pattern.append('*' * side)\n    print(pattern)\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "side = 4",
        "expected": "['****', '****', '****', '****']",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "loops",
      "string",
      "patterns",
      "console"
    ]
  },
  {
    "id": "061",
    "number": 61,
    "title": "Draw a Triangle Pattern",
    "titleVi": "Vẽ mẫu hình tam giác",
    "difficulty": "easy",
    "section": "Console Patterns (adapted from Turtle)",
    "description": "Write a function `draw_triangle(height)` that prints a right-angled triangle pattern made of '*' characters. The `height` parameter determines the number of rows in the triangle. Each row should have one more '*' than the previous, starting with one '*'.",
    "descriptionVi": "Viết một hàm `draw_triangle(height)` in ra một mẫu hình tam giác vuông được tạo thành từ các ký tự '*'. Tham số `height` xác định số hàng trong tam giác. Mỗi hàng nên có thêm một '*' so với hàng trước, bắt đầu bằng một '*'.",
    "expectedOutput": "*\n**\n***",
    "hints": [
      "Use a loop to iterate through each row.",
      "In each iteration, print the correct number of '*' characters."
    ],
    "starterCode": "height = 3\n\ndef draw_triangle(height):\n    # Your code here\n    pass\n\nresult = draw_triangle(height)\nif result is not None:\n    print(result)",
    "solution": "height = 3\n\ndef draw_triangle(height):\n    output_lines = []\n    for i in range(1, height + 1):\n        output_lines.append('*' * i)\n    return '\\n'.join(output_lines)\n\nresult = draw_triangle(height)\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "height = 3",
        "expected": "*\n**\n***",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "loops",
      "strings",
      "patterns"
    ]
  },
  {
    "id": "062",
    "number": 62,
    "title": "Draw a Right-Angle Triangle",
    "titleVi": "Vẽ mẫu hình tam giác vuông",
    "difficulty": "easy",
    "section": "Console Patterns (adapted from Turtle)",
    "description": "Write a function `draw_right_triangle(height)` that prints a right-angled triangle pattern made of '*' characters where the right angle is at the top-left (or inverted from 061). The `height` parameter determines the number of rows. Each row should decrease the number of '*' characters, starting with `height` stars.",
    "descriptionVi": "Viết một hàm `draw_right_triangle(height)` in ra một mẫu hình tam giác vuông được tạo thành từ các ký tự '*' trong đó góc vuông ở phía trên bên trái (hoặc ngược lại với 061). Tham số `height` xác định số hàng. Mỗi hàng nên giảm số lượng ký tự '*' sao cho hàng đầu tiên có `height` sao.",
    "expectedOutput": "***\n**\n*",
    "hints": [
      "Use a loop that counts down or a range with reversed iteration."
    ],
    "starterCode": "height = 3\n\ndef draw_right_triangle(height):\n    # Your code here\n    pass\n\nresult = draw_right_triangle(height)\nif result is not None:\n    print(result)",
    "solution": "height = 3\n\ndef draw_right_triangle(height):\n    output_lines = []\n    for i in range(height, 0, -1):\n        output_lines.append('*' * i)\n    return '\\n'.join(output_lines)\n\nresult = draw_right_triangle(height)\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "height = 3",
        "expected": "***\n**\n*",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "loops",
      "strings",
      "patterns"
    ]
  },
  {
    "id": "063",
    "number": 63,
    "title": "Draw a Diamond Shape",
    "titleVi": "Vẽ hình kim cương",
    "difficulty": "medium",
    "section": "Console Patterns (adapted from Turtle)",
    "description": "Write a function `draw_diamond(size)` that prints a diamond shape made of '*' characters. The `size` parameter determines the maximum width of the diamond (the middle row will have `size` stars). Assume `size` will always be an odd number.",
    "descriptionVi": "Viết một hàm `draw_diamond(size)` in ra một hình kim cương được tạo thành từ các ký tự '*'. Tham số `size` xác định chiều rộng tối đa của hình kim cương (hàng giữa sẽ có `size` sao). Giả sử `size` sẽ luôn là một số lẻ.",
    "expectedOutput": "  *\n ***\n*****\n ***\n  *",
    "hints": [
      "A diamond can be thought of as an upper triangle and a lower inverted triangle.",
      "You'll need to manage spaces before the stars to center the pattern."
    ],
    "starterCode": "size = 5\n\n# Your code here",
    "solution": "size = 5\n\nlines = []\nfor i in range(1, size + 1, 2):\n    lines.append(' ' * ((size - i) // 2) + '*' * i)\nfor i in range(size - 2, 0, -2):\n    lines.append(' ' * ((size - i) // 2) + '*' * i)\nprint('\\n'.join(lines))",
    "testCases": [
      {
        "input": "size = 5",
        "expected": "  *\n ***\n*****\n ***\n  *",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "loops",
      "strings",
      "patterns",
      "conditional logic"
    ]
  },
  {
    "id": "064",
    "number": 64,
    "title": "Draw a Hollow Square",
    "titleVi": "Vẽ hình vuông rỗng",
    "difficulty": "medium",
    "section": "Console Patterns (adapted from Turtle)",
    "description": "Write a function `draw_hollow_square(side)` that prints a hollow square pattern made of '*' characters. The `side` parameter determines the length of each side of the square. For a side value of 1, print a single '*'. For `side` values greater than 1, only the border should be '*' and the inside should be spaces.",
    "descriptionVi": "Viết một hàm `draw_hollow_square(side)` in ra một mẫu hình vuông rỗng được tạo thành từ các ký tự '*'. Tham số `side` xác định độ dài của mỗi cạnh của hình vuông. Đối với giá trị `side` là 1, in ra một '*'. Đối với giá trị `side` lớn hơn 1, chỉ phần biên phải là '*' và phần bên trong phải là khoảng trắng.",
    "expectedOutput": "***\n* *\n***",
    "hints": [
      "The first and last rows are full of stars.",
      "The middle rows consist of a star, `side - 2` spaces, and another star."
    ],
    "starterCode": "side = 3\n\ndef draw_hollow_square(side):\n    # Your code here\n    pass\n\nresult = draw_hollow_square(side)\nif result is not None:\n    print(result)",
    "solution": "side = 3\n\ndef draw_hollow_square(side):\n    output_lines = []\n    if side == 1:\n        output_lines.append('*')\n    else:\n        # Top border\n        output_lines.append('*' * side)\n        # Middle rows\n        for _ in range(side - 2):\n            output_lines.append('*' + ' ' * (side - 2) + '*')\n        # Bottom border\n        output_lines.append('*' * side)\n    return '\\n'.join(output_lines)\n\nresult = draw_hollow_square(side)\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "side = 3",
        "expected": "***\n* *\n***",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "loops",
      "strings",
      "patterns",
      "conditional logic"
    ]
  },
  {
    "id": "065",
    "number": 65,
    "title": "Draw a Staircase Pattern",
    "titleVi": "Vẽ mẫu hình cầu thang",
    "difficulty": "medium",
    "section": "Console Patterns (adapted from Turtle)",
    "description": "Write a function `draw_staircase(steps, char='*')` that prints a staircase pattern. The `steps` parameter determines the number of steps, and `char` is the character to use for drawing (default to '*'). Each step should increase by the `char` character, with appropriate indentation.",
    "descriptionVi": "Viết một hàm `draw_staircase(steps, char='*')` in ra một mẫu hình cầu thang. Tham số `steps` xác định số bậc thang, và `char` là ký tự để vẽ (mặc định là '*'). Mỗi bậc thang nên tăng thêm ký tự `char`, với độ thụt lề phù hợp.",
    "expectedOutput": "  *\n **\n***",
    "hints": [
      "You'll need to calculate the number of spaces and characters for each step.",
      "The number of characters increases, while the number of spaces decreases."
    ],
    "starterCode": "steps = 3\nchar = '*'\n\ndef draw_staircase(steps, char='*'):\n    # Your code here\n    pass\n\nresult = draw_staircase(steps, char)\nif result is not None:\n    print(result)",
    "solution": "steps = 3\nchar = '*'\n\ndef draw_staircase(steps, char='*'):\n    output_lines = []\n    if steps <= 0:\n        return \"\"\n    for i in range(1, steps + 1):\n        spaces = steps - i\n        output_lines.append(' ' * spaces + char * i)\n    return '\\n'.join(output_lines)\n\nresult = draw_staircase(steps, char)\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "steps = 3, char = '*'",
        "expected": "  *\n **\n***",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "loops",
      "strings",
      "patterns",
      "default arguments"
    ]
  },
  {
    "id": "066",
    "number": 66,
    "title": "Draw an Inverted Triangle Pattern",
    "titleVi": "Vẽ mẫu hình tam giác ngược",
    "difficulty": "medium",
    "section": "Console Patterns (adapted from Turtle)",
    "description": "Write a function `draw_inverted_triangle(height)` that prints an inverted isosceles triangle pattern made of '*' characters. The `height` parameter determines the number of rows. The top row should have `2 * height - 1` stars and each subsequent row should decrease by two stars, centered.",
    "descriptionVi": "Viết một hàm `draw_inverted_triangle(height)` in ra một mẫu hình tam giác cân ngược được tạo thành từ các ký tự '*'. Tham số `height` xác định số hàng. Hàng trên cùng nên có `2 * height - 1` sao và mỗi hàng tiếp theo nên giảm đi hai sao, được căn giữa.",
    "expectedOutput": "*******\n *****\n  ***\n   *",
    "hints": [
      "The number of stars decreases by 2 in each row.",
      "The number of leading spaces increases by 1 in each row."
    ],
    "starterCode": "height = 4\n\n# Your code here",
    "solution": "height = 4\n\nlines = []\nfor i in range(height, 0, -1):\n    lines.append(' ' * (height - i) + '*' * (2 * i - 1))\nprint('\\n'.join(lines))",
    "testCases": [
      {
        "input": "height = 4",
        "expected": "*******\n *****\n  ***\n   *",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "loops",
      "strings",
      "patterns"
    ]
  },
  {
    "id": "067",
    "number": 67,
    "title": "Draw a Christmas Tree Pattern",
    "titleVi": "Vẽ mẫu hình cây thông Noel",
    "difficulty": "hard",
    "section": "Console Patterns (adapted from Turtle)",
    "description": "Print a Christmas tree. The tree has `height` rows of '*': row 1 has one star, row 2 has three stars, and so on, each row centred on a base that is `2 * height - 1` characters wide. Under the tree print a trunk of two rows, each containing three '#' characters, centred on the same width.",
    "descriptionVi": "In mot cay thong Noel. Cay co `height` dong dau '*': dong 1 co 1 dau, dong 2 co 3 dau, ... moi dong can giua tren be rong `2 * height - 1`. Duoi cay in goc cay gom 2 dong, moi dong 3 ky tu '#', cung can giua.",
    "expectedOutput": "   *\n  ***\n *****\n*******\n  ###\n  ###",
    "hints": [
      "Break the problem into drawing multiple triangle segments and then the trunk.",
      "The base width of the `i`-th segment can be calculated based on its position.",
      "Consider the maximum width needed to center everything."
    ],
    "starterCode": "height = 4\n\n# Your code here",
    "solution": "height = 4\n\nwidth = 2 * height - 1\nlines = []\n\nfor i in range(1, height + 1):\n    stars = 2 * i - 1\n    lines.append(' ' * ((width - stars) // 2) + '*' * stars)\n\nfor _ in range(2):\n    lines.append(' ' * ((width - 3) // 2) + '###')\n\nprint('\\n'.join(lines))",
    "testCases": [
      {
        "input": "height = 4",
        "expected": "   *\n  ***\n *****\n*******\n  ###\n  ###",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "loops",
      "strings",
      "patterns",
      "complex"
    ]
  },
  {
    "id": "068",
    "number": 68,
    "title": "Draw a Bordered Rectangle",
    "titleVi": "Vẽ hình chữ nhật có viền",
    "difficulty": "medium",
    "section": "Console Patterns (adapted from Turtle)",
    "description": "Write a function `draw_bordered_rectangle(width, height, border_char='-', fill_char=' '`) that prints a rectangle with a border. The `width` and `height` parameters determine the dimensions. `border_char` is the character for the border (default to '-') and `fill_char` is for the inside (default to space). If `width` or `height` is 1, it should be a solid line/column of `border_char`.",
    "descriptionVi": "Viết một hàm `draw_bordered_rectangle(width, height, border_char='-', fill_char=' '`) in ra một hình chữ nhật có viền. Các tham số `width` và `height` xác định kích thước. `border_char` là ký tự cho viền (mặc định là '-') và `fill_char` là cho bên trong (mặc định là khoảng trắng). Nếu `width` hoặc `height` là 1, nó sẽ là một đường/cột liền của `border_char`.",
    "expectedOutput": "-----\n-   -\n-----",
    "hints": [
      "Handle edge cases for `width` or `height` being 1 separately.",
      "The top and bottom rows are full of `border_char`.",
      "Middle rows have `border_char`, then `width - 2` `fill_char`s, then `border_char`."
    ],
    "starterCode": "width = 5\nheight = 3\n\ndef draw_bordered_rectangle(width, height, border_char='-', fill_char=' '):\n    # Your code here\n    pass\n\nresult = draw_bordered_rectangle(width, height)\nif result is not None:\n    print(result)",
    "solution": "width = 5\nheight = 3\n\ndef draw_bordered_rectangle(width, height, border_char='-', fill_char=' '):\n    if width <= 0 or height <= 0:\n        return \"\"\n    \n    output_lines = []\n\n    if height == 1: # Single row\n        output_lines.append(border_char * width)\n    elif width == 1: # Single column\n        for _ in range(height):\n            output_lines.append(border_char)\n    else: # Normal rectangle\n        # Top border\n        output_lines.append(border_char * width)\n        # Middle rows\n        for _ in range(height - 2):\n            output_lines.append(border_char + fill_char * (width - 2) + border_char)\n        # Bottom border\n        output_lines.append(border_char * width)\n\n    return '\\n'.join(output_lines)\n\nresult = draw_bordered_rectangle(width, height)\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "width = 5, height = 3",
        "expected": "-----\n-   -\n-----",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "loops",
      "strings",
      "patterns",
      "default arguments",
      "conditional logic"
    ]
  },
  {
    "id": "069",
    "number": 69,
    "title": "Create and Display a List of Names",
    "titleVi": "Tạo và hiển thị một danh sách tên",
    "difficulty": "easy",
    "section": "Tuples, Lists and Dictionaries",
    "description": "Write a function `process_names(names_list)` that takes a list of strings (names) as input. The function should return a single string where each name from the list is on a new line, prefixed with its index (starting from 0).",
    "descriptionVi": "Viết một hàm `process_names(names_list)` nhận vào một danh sách các chuỗi (tên) làm đầu vào. Hàm nên trả về một chuỗi duy nhất trong đó mỗi tên từ danh sách nằm trên một dòng mới, được đặt tiền tố bằng chỉ mục của nó (bắt đầu từ 0).",
    "expectedOutput": "0: Alice\n1: Bob\n2: Charlie",
    "hints": [
      "Use a `for` loop with `enumerate` to get both the index and the item.",
      "Join the formatted strings with newline characters."
    ],
    "starterCode": "names_list = ['Alice', 'Bob', 'Charlie']\n\ndef process_names(names_list):\n    # Your code here\n    pass\n\nresult = process_names(names_list)\nif result is not None:\n    print(result)",
    "solution": "names_list = ['Alice', 'Bob', 'Charlie']\n\ndef process_names(names_list):\n    output_lines = []\n    for index, name in enumerate(names_list):\n        output_lines.append(f\"{index}: {name}\")\n    return '\\n'.join(output_lines)\n\nresult = process_names(names_list)\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "names_list = ['Alice', 'Bob', 'Charlie']",
        "expected": "0: Alice\n1: Bob\n2: Charlie",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "lists",
      "loops",
      "strings",
      "enumerate"
    ]
  },
  {
    "id": "070",
    "number": 70,
    "title": "Add and Remove Items from a List",
    "titleVi": "Thêm và xóa các mục khỏi danh sách",
    "difficulty": "easy",
    "section": "Tuples, Lists and Dictionaries",
    "description": "Write a function `manage_list(initial_list, add_item, remove_item)` that takes three arguments: `initial_list` (a list of strings), `add_item` (a string to add), and `remove_item` (a string to remove). The function should first add `add_item` to the list, then attempt to remove `remove_item` (if it exists). Finally, it should return the modified list.",
    "descriptionVi": "Viết một hàm `manage_list(initial_list, add_item, remove_item)` nhận ba đối số: `initial_list` (một danh sách các chuỗi), `add_item` (một chuỗi để thêm), và `remove_item` (một chuỗi để xóa). Hàm nên thêm `add_item` vào danh sách trước, sau đó cố gắng xóa `remove_item` (nếu nó tồn tại). Cuối cùng, nó nên trả về danh sách đã sửa đổi.",
    "expectedOutput": "['apple', 'mango']",
    "hints": [
      "Use `list.append()` to add an item.",
      "Use `list.remove()` to remove an item. It's good practice to check if the item exists first using `if item in list` to avoid errors if the item is not present."
    ],
    "starterCode": "initial_list = ['apple', 'banana']\nadd_item = 'mango'\nremove_item = 'banana'\n\ndef manage_list(initial_list, add_item, remove_item):\n    # Your code here\n    pass\n\nresult = manage_list(initial_list, add_item, remove_item)\nif result is not None:\n    print(result)",
    "solution": "initial_list = ['apple', 'banana']\nadd_item = 'mango'\nremove_item = 'banana'\n\ndef manage_list(initial_list, add_item, remove_item):\n    modified_list = initial_list.copy() # Create a copy to avoid modifying the original list passed to tests\n    modified_list.append(add_item)\n    if remove_item in modified_list:\n        modified_list.remove(remove_item)\n    return modified_list\n\nresult = manage_list(initial_list, add_item, remove_item)\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "initial_list = ['apple', 'banana'], add_item = 'mango', remove_item = 'banana'",
        "expected": "['apple', 'mango']",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "lists",
      "append",
      "remove",
      "conditional logic"
    ]
  },
  {
    "id": "071",
    "number": 71,
    "title": "Display List in Alphabetical Order",
    "titleVi": "Hiển thị danh sách theo thứ tự bảng chữ cái",
    "difficulty": "easy",
    "section": "Tuples, Lists and Dictionaries",
    "description": "Write a function `sort_and_display_list(items)` that takes a list of strings as input. The function should return a new list containing the same items, but sorted alphabetically. The original list should not be modified.",
    "descriptionVi": "Viết một hàm `sort_and_display_list(items)` nhận vào một danh sách các chuỗi làm đầu vào. Hàm nên trả về một danh sách mới chứa các mục tương tự, nhưng được sắp xếp theo thứ tự bảng chữ cái. Danh sách gốc không được sửa đổi.",
    "expectedOutput": "['apple', 'banana', 'orange', 'zebra']",
    "hints": [
      "Use the `sorted()` function, which returns a new sorted list without modifying the original."
    ],
    "starterCode": "items = ['banana', 'apple', 'zebra', 'orange']\n\ndef sort_and_display_list(items):\n    # Your code here\n    pass\n\nresult = sort_and_display_list(items)\nif result is not None:\n    print(result)",
    "solution": "items = ['banana', 'apple', 'zebra', 'orange']\n\ndef sort_and_display_list(items):\n    return sorted(items)\n\nresult = sort_and_display_list(items)\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "items = ['banana', 'apple', 'zebra', 'orange']",
        "expected": "['apple', 'banana', 'orange', 'zebra']",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "lists",
      "sorting",
      "functions"
    ]
  },
  {
    "id": "072",
    "number": 72,
    "title": "Find Min and Max in a List of Numbers",
    "titleVi": "Tìm giá trị nhỏ nhất và lớn nhất trong danh sách số",
    "difficulty": "easy",
    "section": "Tuples, Lists and Dictionaries",
    "description": "Write a function `find_min_max(numbers)` that takes a list of integers as input. If the list is empty, it should return `(None, None)`. Otherwise, it should return a tuple containing the smallest and largest numbers in the list, in that order.",
    "descriptionVi": "Viết một hàm `find_min_max(numbers)` nhận vào một danh sách các số nguyên làm đầu vào. Nếu danh sách trống, nó nên trả về `(None, None)`. Ngược lại, nó nên trả về một tuple chứa số nhỏ nhất và số lớn nhất trong danh sách, theo thứ tự đó.",
    "expectedOutput": "(1, 9)",
    "hints": [
      "Python has built-in `min()` and `max()` functions.",
      "Remember to handle the empty list case."
    ],
    "starterCode": "numbers = [3, 1, 4, 1, 5, 9, 2, 6]\n\ndef find_min_max(numbers):\n    # Your code here\n    pass\n\nresult = find_min_max(numbers)\nif result is not None:\n    print(result)",
    "solution": "numbers = [3, 1, 4, 1, 5, 9, 2, 6]\n\ndef find_min_max(numbers):\n    if not numbers:\n        return (None, None)\n    return (min(numbers), max(numbers))\n\nresult = find_min_max(numbers)\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "numbers = [3, 1, 4, 1, 5, 9, 2, 6]",
        "expected": "(1, 9)",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "lists",
      "min",
      "max",
      "tuples",
      "conditional logic"
    ]
  },
  {
    "id": "073",
    "number": 73,
    "title": "Count Occurrences of Item in List",
    "titleVi": "Đếm số lần xuất hiện của mục trong danh sách",
    "difficulty": "easy",
    "section": "Tuples, Lists and Dictionaries",
    "description": "Write a function `count_item_occurrences(items_list, target_item)` that takes a list `items_list` and a `target_item` as input. The function should return an integer representing how many times `target_item` appears in `items_list`.",
    "descriptionVi": "Viết một hàm `count_item_occurrences(items_list, target_item)` nhận vào một danh sách `items_list` và một `target_item` làm đầu vào. Hàm nên trả về một số nguyên biểu thị số lần `target_item` xuất hiện trong `items_list`.",
    "expectedOutput": "3",
    "hints": [
      "Lists have a built-in `count()` method.",
      "Alternatively, you can use a loop and an accumulator variable."
    ],
    "starterCode": "items_list = ['apple', 'banana', 'apple', 'orange', 'apple']\ntarget_item = 'apple'\n\ndef count_item_occurrences(items_list, target_item):\n    # Your code here\n    pass\n\nresult = count_item_occurrences(items_list, target_item)\nif result is not None:\n    print(result)",
    "solution": "items_list = ['apple', 'banana', 'apple', 'orange', 'apple']\ntarget_item = 'apple'\n\ndef count_item_occurrences(items_list, target_item):\n    return items_list.count(target_item)\n\nresult = count_item_occurrences(items_list, target_item)\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "items_list = ['apple', 'banana', 'apple', 'orange', 'apple'], target_item = 'apple'",
        "expected": "3",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "lists",
      "count",
      "methods"
    ]
  },
  {
    "id": "074",
    "number": 74,
    "title": "Create Dictionary of Countries and Capitals",
    "titleVi": "Tạo từ điển các quốc gia và thủ đô",
    "difficulty": "easy",
    "section": "Tuples, Lists and Dictionaries",
    "description": "Write a function `create_capital_dictionary(countries_capitals)` that takes a list of `(country, capital)` tuples as input. It should convert this list into a dictionary where country names are keys and their capitals are values. The function should return this dictionary.",
    "descriptionVi": "Viết một hàm `create_capital_dictionary(countries_capitals)` nhận vào một danh sách các tuple `(quốc gia, thủ đô)` làm đầu vào. Nó nên chuyển đổi danh sách này thành một từ điển trong đó tên quốc gia là khóa và thủ đô của chúng là giá trị. Hàm nên trả về từ điển này.",
    "expectedOutput": "{'France': 'Paris', 'Japan': 'Tokyo', 'Germany': 'Berlin'}",
    "hints": [
      "You can initialize an empty dictionary and add key-value pairs in a loop.",
      "Alternatively, the `dict()` constructor can take a list of tuples directly."
    ],
    "starterCode": "countries_capitals = [('France', 'Paris'), ('Japan', 'Tokyo'), ('Germany', 'Berlin')]\n\ndef create_capital_dictionary(countries_capitals):\n    # Your code here\n    pass\n\nresult = create_capital_dictionary(countries_capitals)\nif result is not None:\n    print(result)",
    "solution": "countries_capitals = [('France', 'Paris'), ('Japan', 'Tokyo'), ('Germany', 'Berlin')]\n\ndef create_capital_dictionary(countries_capitals):\n    return dict(countries_capitals)\n\nresult = create_capital_dictionary(countries_capitals)\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "countries_capitals = [('France', 'Paris'), ('Japan', 'Tokyo'), ('Germany', 'Berlin')]",
        "expected": "{'France': 'Paris', 'Japan': 'Tokyo', 'Germany': 'Berlin'}",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "dictionaries",
      "tuples",
      "data structures"
    ]
  },
  {
    "id": "075",
    "number": 75,
    "title": "Look Up Capital by Country Name",
    "titleVi": "Tra cứu thủ đô theo tên quốc gia",
    "difficulty": "easy",
    "section": "Tuples, Lists and Dictionaries",
    "description": "Write a function `lookup_capital(capitals_dict, country_name)` that takes a dictionary `capitals_dict` (country:capital) and a `country_name` as input. It should return the capital of the given country. If the country is not found in the dictionary, return the string 'Country not found'.",
    "descriptionVi": "Viết một hàm `lookup_capital(capitals_dict, country_name)` nhận vào một từ điển `capitals_dict` (quốc gia:thủ đô) và một `country_name` làm đầu vào. Nó nên trả về thủ đô của quốc gia đã cho. Nếu không tìm thấy quốc gia trong từ điển, hãy trả về chuỗi 'Country not found'.",
    "expectedOutput": "Paris",
    "hints": [
      "Use `dictionary.get(key, default_value)` to safely retrieve a value or return a default if the key isn't present."
    ],
    "starterCode": "capitals_dict = {'France': 'Paris', 'Japan': 'Tokyo'}\ncountry_name = 'France'\n\ndef lookup_capital(capitals_dict, country_name):\n    # Your code here\n    pass\n\nresult = lookup_capital(capitals_dict, country_name)\nif result is not None:\n    print(result)",
    "solution": "capitals_dict = {'France': 'Paris', 'Japan': 'Tokyo'}\ncountry_name = 'France'\n\ndef lookup_capital(capitals_dict, country_name):\n    return capitals_dict.get(country_name, 'Country not found')\n\nresult = lookup_capital(capitals_dict, country_name)\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "capitals_dict = {'France': 'Paris', 'Japan': 'Tokyo'}, country_name = 'France'",
        "expected": "Paris",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "dictionaries",
      "get_method",
      "data structures"
    ]
  },
  {
    "id": "076",
    "number": 76,
    "title": "Add/Remove Entries from Dictionary",
    "titleVi": "Thêm/Xóa các mục khỏi từ điển",
    "difficulty": "medium",
    "section": "Tuples, Lists and Dictionaries",
    "description": "Write a function `manage_country_capitals(capitals_dict, operation, country, capital=None)` that modifies a dictionary of countries and capitals. `capitals_dict` is the initial dictionary. `operation` can be 'add', 'remove', or 'update'. `country` is the key, and `capital` is the value (only used for 'add'/'update').\n- 'add': Add a new country-capital pair.\n- 'remove': Remove a country and its capital.\n- 'update': Update the capital for an existing country.\nReturn the modified dictionary. Assume `capitals_dict` will always be a dictionary of strings.",
    "descriptionVi": "Viết một hàm `manage_country_capitals(capitals_dict, operation, country, capital=None)` để sửa đổi một từ điển các quốc gia và thủ đô. `capitals_dict` là từ điển ban đầu. `operation` có thể là 'add', 'remove', hoặc 'update'. `country` là khóa, và `capital` là giá trị (chỉ được sử dụng cho 'add'/'update').\n- 'add': Thêm một cặp quốc gia-thủ đô mới.\n- 'remove': Xóa một quốc gia và thủ đô của nó.\n- 'update': Cập nhật thủ đô cho một quốc gia hiện có.\nTrả về từ điển đã sửa đổi. Giả sử `capitals_dict` sẽ luôn là một từ điển chuỗi.",
    "expectedOutput": "{'Spain': 'Madrid', 'Italy': 'Rome', 'Portugal': 'Lisbon'}",
    "hints": [
      "Use `dict[key] = value` for adding or updating.",
      "Use `del dict[key]` for removing. Be careful to check if the key exists before attempting to delete."
    ],
    "starterCode": "capitals_dict = {'Spain': 'Madrid', 'Italy': 'Rome'}\noperation = 'add'\ncountry = 'Portugal'\ncapital = 'Lisbon'\n\ndef manage_country_capitals(capitals_dict, operation, country, capital=None):\n    # Your code here\n    pass\n\nresult = manage_country_capitals(capitals_dict, operation, country, capital)\nif result is not None:\n    print(result)",
    "solution": "capitals_dict = {'Spain': 'Madrid', 'Italy': 'Rome'}\noperation = 'add'\ncountry = 'Portugal'\ncapital = 'Lisbon'\n\ndef manage_country_capitals(capitals_dict, operation, country, capital=None):\n    modified_dict = capitals_dict.copy()\n    if operation == 'add':\n        if country not in modified_dict:\n            modified_dict[country] = capital\n    elif operation == 'remove':\n        if country in modified_dict:\n            del modified_dict[country]\n    elif operation == 'update':\n        if country in modified_dict:\n            modified_dict[country] = capital\n    return modified_dict\n\nresult = manage_country_capitals(capitals_dict, operation, country, capital)\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "capitals_dict = {'Spain': 'Madrid', 'Italy': 'Rome'}, operation = 'add', country = 'Portugal', capital = 'Lisbon'",
        "expected": "{'Spain': 'Madrid', 'Italy': 'Rome', 'Portugal': 'Lisbon'}",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "dictionaries",
      "add",
      "remove",
      "update",
      "conditional logic",
      "data structures"
    ]
  },
  {
    "id": "077",
    "number": 77,
    "title": "Create Shopping List, Add Items, Show Total Count",
    "titleVi": "Tạo danh sách mua sắm, thêm mục, hiển thị tổng số lượng",
    "difficulty": "medium",
    "section": "Tuples, Lists and Dictionaries",
    "description": "Write a function `manage_shopping_list(initial_list, items_to_add)` that simulates a shopping list using a dictionary where keys are item names and values are their quantities. `initial_list` is a dictionary representing the starting list. `items_to_add` is a list of tuples, where each tuple is `(item_name, quantity_to_add)`. The function should update the quantities of items in the list, adding new items if they don't exist. Finally, it should return the modified dictionary.",
    "descriptionVi": "Viết một hàm `manage_shopping_list(initial_list, items_to_add)` mô phỏng một danh sách mua sắm bằng cách sử dụng một từ điển trong đó khóa là tên mặt hàng và giá trị là số lượng của chúng. `initial_list` là một từ điển đại diện cho danh sách ban đầu. `items_to_add` là một danh sách các tuple, trong đó mỗi tuple là `(tên_mặt_hàng, số_lượng_cần_thêm)`. Hàm nên cập nhật số lượng mặt hàng trong danh sách, thêm các mặt hàng mới nếu chúng không tồn tại. Cuối cùng, nó nên trả về từ điển đã sửa đổi.",
    "expectedOutput": "{'milk': 3, 'bread': 1, 'eggs': 1}",
    "hints": [
      "Use `dictionary.get(key, default_value)` to get the current quantity or 0 if the item is new.",
      "Then add the `quantity_to_add` to it."
    ],
    "starterCode": "initial_list = {'milk': 1, 'bread': 1}\nitems_to_add = [('eggs', 1), ('milk', 2)]\n\ndef manage_shopping_list(initial_list, items_to_add):\n    # Your code here\n    pass\n\nresult = manage_shopping_list(initial_list, items_to_add)\nif result is not None:\n    print(result)",
    "solution": "initial_list = {'milk': 1, 'bread': 1}\nitems_to_add = [('eggs', 1), ('milk', 2)]\n\ndef manage_shopping_list(initial_list, items_to_add):\n    shopping_list = initial_list.copy()\n    for item, quantity in items_to_add:\n        shopping_list[item] = shopping_list.get(item, 0) + quantity\n    return shopping_list\n\nresult = manage_shopping_list(initial_list, items_to_add)\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "initial_list = {'milk': 1, 'bread': 1}, items_to_add = [('eggs', 1), ('milk', 2)]",
        "expected": "{'milk': 3, 'bread': 1, 'eggs': 1}",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "dictionaries",
      "lists",
      "loops",
      "get_method",
      "data structures"
    ]
  },
  {
    "id": "078",
    "number": 78,
    "title": "Student Grades Dictionary, Calculate Average",
    "titleVi": "Từ điển điểm học sinh, tính điểm trung bình",
    "difficulty": "medium",
    "section": "Tuples, Lists and Dictionaries",
    "description": "Write a function `calculate_student_average(grades_data, student_name)` that takes a dictionary `grades_data` (where keys are student names and values are lists of their grades as integers) and a `student_name` as input. The function should return the average grade for the specified student. If the student is not found or has no grades, return `0.0`.",
    "descriptionVi": "Viết một hàm `calculate_student_average(grades_data, student_name)` nhận vào một từ điển `grades_data` (trong đó khóa là tên học sinh và giá trị là danh sách các điểm của họ dưới dạng số nguyên) và một `student_name` làm đầu vào. Hàm nên trả về điểm trung bình cho học sinh được chỉ định. Nếu không tìm thấy học sinh hoặc học sinh không có điểm, hãy trả về `0.0`.",
    "expectedOutput": "89.0",
    "hints": [
      "Check if the student name exists as a key in the dictionary.",
      "If the student exists, check if their list of grades is empty before calculating the average.",
      "Use `sum()` and `len()` functions for calculating the average."
    ],
    "starterCode": "grades_data = {'Alice': [90, 85, 92], 'Bob': [70, 75, 80], 'Charlie': [60, 65]}\nstudent_name = 'Alice'\n\ndef calculate_student_average(grades_data, student_name):\n    # Your code here\n    pass\n\nresult = calculate_student_average(grades_data, student_name)\nif result is not None:\n    print(result)",
    "solution": "grades_data = {'Alice': [90, 85, 92], 'Bob': [70, 75, 80], 'Charlie': [60, 65]}\nstudent_name = 'Alice'\n\ndef calculate_student_average(grades_data, student_name):\n    if student_name in grades_data:\n        grades = grades_data[student_name]\n        if grades:\n            return sum(grades) / len(grades)\n    return 0.0\n\nresult = calculate_student_average(grades_data, student_name)\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "grades_data = {'Alice': [90, 85, 92], 'Bob': [70, 75, 80], 'Charlie': [60, 65]}, student_name = 'Alice'",
        "expected": "89.0",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "dictionaries",
      "lists",
      "average",
      "conditional logic",
      "statistics"
    ]
  },
  {
    "id": "079",
    "number": 79,
    "title": "Merge Two Lists into a Dictionary",
    "titleVi": "Gộp hai danh sách thành một từ điển",
    "difficulty": "medium",
    "section": "Tuples, Lists and Dictionaries",
    "description": "Write a function `merge_lists_to_dict(keys_list, values_list)` that takes two lists, `keys_list` and `values_list`, as input. It should create and return a dictionary where elements from `keys_list` are keys and elements from `values_list` are their corresponding values. Assume both lists have the same length.",
    "descriptionVi": "Viết một hàm `merge_lists_to_dict(keys_list, values_list)` nhận vào hai danh sách, `keys_list` và `values_list`, làm đầu vào. Nó nên tạo và trả về một từ điển trong đó các phần tử từ `keys_list` là khóa và các phần tử từ `values_list` là các giá trị tương ứng của chúng. Giả sử cả hai danh sách có cùng độ dài.",
    "expectedOutput": "{'name': 'Alice', 'age': 30, 'city': 'New York'}",
    "hints": [
      "Use the `zip()` function to pair corresponding elements from the two lists.",
      "Then pass the zipped object to the `dict()` constructor."
    ],
    "starterCode": "keys_list = ['name', 'age', 'city']\nvalues_list = ['Alice', 30, 'New York']\n\ndef merge_lists_to_dict(keys_list, values_list):\n    # Your code here\n    pass\n\nresult = merge_lists_to_dict(keys_list, values_list)\nif result is not None:\n    print(result)",
    "solution": "keys_list = ['name', 'age', 'city']\nvalues_list = ['Alice', 30, 'New York']\n\ndef merge_lists_to_dict(keys_list, values_list):\n    return dict(zip(keys_list, values_list))\n\nresult = merge_lists_to_dict(keys_list, values_list)\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "keys_list = ['name', 'age', 'city'], values_list = ['Alice', 30, 'New York']",
        "expected": "{'name': 'Alice', 'age': 30, 'city': 'New York'}",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "lists",
      "dictionaries",
      "zip",
      "data structures"
    ]
  },
  {
    "id": "080",
    "number": 80,
    "title": "Count Vowels in a String",
    "titleVi": "Đếm nguyên âm trong một chuỗi",
    "difficulty": "easy",
    "section": "More String Manipulation",
    "description": "Write a function `count_vowels(text_string)` that takes a string as input and returns the total number of vowels ('a', 'e', 'i', 'o', 'u', case-insensitive) present in the string.",
    "descriptionVi": "Viết một hàm `count_vowels(text_string)` nhận vào một chuỗi làm đầu vào và trả về tổng số nguyên âm ('a', 'e', 'i', 'o', 'u', không phân biệt chữ hoa chữ thường) có trong chuỗi.",
    "expectedOutput": "3",
    "hints": [
      "Convert the input string to lowercase to handle case-insensitivity.",
      "Iterate through the string and check if each character is in a set of vowels."
    ],
    "starterCode": "text_string = 'Hello World'\n\ndef count_vowels(text_string):\n    # Your code here\n    pass\n\nresult = count_vowels(text_string)\nif result is not None:\n    print(result)",
    "solution": "text_string = 'Hello World'\n\ndef count_vowels(text_string):\n    vowels = 'aeiou'\n    count = 0\n    for char in text_string.lower():\n        if char in vowels:\n            count += 1\n    return count\n\nresult = count_vowels(text_string)\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "text_string = 'Hello World'",
        "expected": "3",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "strings",
      "loops",
      "conditional logic",
      "character counting"
    ]
  },
  {
    "id": "081",
    "number": 81,
    "title": "Reverse a String",
    "titleVi": "Đảo ngược một chuỗi",
    "difficulty": "easy",
    "section": "More String Manipulation",
    "description": "Write a function `reverse_string(input_string)` that takes a string as input and returns a new string with the characters in reverse order.",
    "descriptionVi": "Viết một hàm `reverse_string(input_string)` nhận vào một chuỗi làm đầu vào và trả về một chuỗi mới với các ký tự theo thứ tự ngược lại.",
    "expectedOutput": "olleh",
    "hints": [
      "Python strings can be easily reversed using slicing: `string[::-1]`."
    ],
    "starterCode": "input_string = 'hello'\n\ndef reverse_string(input_string):\n    # Your code here\n    pass\n\nresult = reverse_string(input_string)\nif result is not None:\n    print(result)",
    "solution": "input_string = 'hello'\n\ndef reverse_string(input_string):\n    return input_string[::-1]\n\nresult = reverse_string(input_string)\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "input_string = 'hello'",
        "expected": "olleh",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "strings",
      "slicing"
    ]
  },
  {
    "id": "082",
    "number": 82,
    "title": "Check if String is Palindrome",
    "titleVi": "Kiểm tra xem chuỗi có phải là Palindrome không",
    "difficulty": "medium",
    "section": "More String Manipulation",
    "description": "Write a function `is_palindrome(input_string)` that takes a string as input and returns `True` if it is a palindrome (reads the same forwards and backwards, ignoring case and spaces), and `False` otherwise.",
    "descriptionVi": "Viết một hàm `is_palindrome(input_string)` nhận vào một chuỗi làm đầu vào và trả về `True` nếu nó là một palindrome (đọc như nhau từ trước ra sau và từ sau ra trước, bỏ qua chữ hoa chữ thường và khoảng trắng), và `False` nếu không.",
    "expectedOutput": "True",
    "hints": [
      "First, preprocess the string: convert to lowercase and remove spaces (or any non-alphanumeric characters if you want to be more robust).",
      "Then compare the processed string with its reversed version."
    ],
    "starterCode": "import re\n\ninput_string = 'madam'\n\ndef is_palindrome(input_string):\n    # Your code here\n    pass\n\nresult = is_palindrome(input_string)\nif result is not None:\n    print(result)",
    "solution": "import re\n\ninput_string = 'madam'\n\ndef is_palindrome(input_string):\n    # Remove non-alphanumeric characters and convert to lowercase\n    processed_string = re.sub(r'[^a-zA-Z0-9]', '', input_string).lower()\n    return processed_string == processed_string[::-1]\n\nresult = is_palindrome(input_string)\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "input_string = 'madam'",
        "expected": "True",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "strings",
      "slicing",
      "conditional logic",
      "regex"
    ]
  },
  {
    "id": "083",
    "number": 83,
    "title": "Count Words in a Sentence",
    "titleVi": "Đếm từ trong một câu",
    "difficulty": "easy",
    "section": "More String Manipulation",
    "description": "Write a function `count_words(sentence)` that takes a string `sentence` as input and returns the number of words in it. Assume words are separated by single spaces. Consider an empty string to have 0 words.",
    "descriptionVi": "Viết một hàm `count_words(sentence)` nhận vào một chuỗi `sentence` làm đầu vào và trả về số lượng từ trong đó. Giả sử các từ được phân tách bằng một khoảng trắng đơn. Coi một chuỗi trống có 0 từ.",
    "expectedOutput": "5",
    "hints": [
      "Use the `split()` method without arguments to split by whitespace and handle multiple spaces.",
      "The `len()` of the resulting list will give the word count. Remember to handle empty strings correctly."
    ],
    "starterCode": "sentence = 'This is a test sentence'\n\ndef count_words(sentence):\n    # Your code here\n    pass\n\nresult = count_words(sentence)\nif result is not None:\n    print(result)",
    "solution": "sentence = 'This is a test sentence'\n\ndef count_words(sentence):\n    words = sentence.split()\n    return len(words)\n\nresult = count_words(sentence)\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "sentence = 'This is a test sentence'",
        "expected": "5",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "strings",
      "split",
      "word counting"
    ]
  },
  {
    "id": "084",
    "number": 84,
    "title": "Replace All Spaces with Hyphens",
    "titleVi": "Thay thế tất cả khoảng trắng bằng dấu gạch ngang",
    "difficulty": "easy",
    "section": "More String Manipulation",
    "description": "Write a function `replace_spaces_with_hyphens(input_string)` that takes a string as input and returns a new string where all spaces (' ') have been replaced by hyphens ('-').",
    "descriptionVi": "Viết một hàm `replace_spaces_with_hyphens(input_string)` nhận vào một chuỗi làm đầu vào và trả về một chuỗi mới trong đó tất cả các khoảng trắng (' ') đã được thay thế bằng dấu gạch ngang ('-').",
    "expectedOutput": "hello-world",
    "hints": [
      "Use the `replace()` string method."
    ],
    "starterCode": "input_string = 'hello world'\n\ndef replace_spaces_with_hyphens(input_string):\n    # Your code here\n    pass\n\nresult = replace_spaces_with_hyphens(input_string)\nif result is not None:\n    print(result)",
    "solution": "input_string = 'hello world'\n\ndef replace_spaces_with_hyphens(input_string):\n    return input_string.replace(' ', '-')\n\nresult = replace_spaces_with_hyphens(input_string)\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "input_string = 'hello world'",
        "expected": "hello-world",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "strings",
      "replace"
    ]
  },
  {
    "id": "085",
    "number": 85,
    "title": "Extract Initials from Full Name",
    "titleVi": "Trích xuất chữ cái đầu từ tên đầy đủ",
    "difficulty": "medium",
    "section": "More String Manipulation",
    "description": "Write a function `get_initials(full_name)` that takes a full name (a string with one or more words separated by spaces) as input and returns a string of the initials, capitalized, connected without spaces. Each word in the name should contribute its first letter.",
    "descriptionVi": "Viết một hàm `get_initials(full_name)` nhận vào một tên đầy đủ (một chuỗi với một hoặc nhiều từ được phân tách bằng khoảng trắng) làm đầu vào và trả về một chuỗi các chữ cái đầu, viết hoa, nối liền không có khoảng trắng. Mỗi từ trong tên nên đóng góp chữ cái đầu tiên của nó.",
    "expectedOutput": "JD",
    "hints": [
      "Split the full name into a list of words.",
      "Iterate through the words, take the first character of each, convert to uppercase, and join them."
    ],
    "starterCode": "full_name = 'John Doe'\n\ndef get_initials(full_name):\n    # Your code here\n    pass\n\nresult = get_initials(full_name)\nif result is not None:\n    print(result)",
    "solution": "full_name = 'John Doe'\n\ndef get_initials(full_name):\n    words = full_name.split()\n    initials = [word[0].upper() for word in words if word] # Ensure word is not empty\n    return ''.join(initials)\n\nresult = get_initials(full_name)\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "full_name = 'John Doe'",
        "expected": "JD",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "strings",
      "split",
      "list comprehension",
      "join",
      "uppercase"
    ]
  },
  {
    "id": "086",
    "number": 86,
    "title": "Caesar Cipher Encoder",
    "titleVi": "Mã hóa Caesar Cipher",
    "difficulty": "hard",
    "section": "More String Manipulation",
    "description": "Write a function `caesar_encode(text, shift)` that implements a Caesar cipher. It takes `text` (a string) and `shift` (an integer) as input. Each alphabetical character in the text should be shifted forward by the `shift` amount. Non-alphabetical characters (spaces, punctuation, numbers) should remain unchanged. Case should be preserved (e.g., 'A' becomes 'D' if shift is 3, 'a' becomes 'd'). The alphabet wraps around (e.g., 'Z' shifted by 1 becomes 'A').",
    "descriptionVi": "Viết một hàm `caesar_encode(text, shift)` triển khai mã hóa Caesar. Nó nhận chuỗi `text` và số nguyên `shift` làm đầu vào. Mỗi ký tự chữ cái trong văn bản nên được dịch chuyển về phía trước bằng lượng `shift`. Các ký tự không phải chữ cái (khoảng trắng, dấu câu, số) nên giữ nguyên. Chữ hoa chữ thường phải được bảo toàn (ví dụ: 'A' thành 'D' nếu dịch 3, 'a' thành 'd'). Bảng chữ cái được cuộn tròn (ví dụ: 'Z' dịch 1 thành 'A').",
    "expectedOutput": "Khoor Zruog",
    "hints": [
      "Process character by character.",
      "Check if a character is an uppercase letter or a lowercase letter.",
      "Use `ord()` to get ASCII value and `chr()` to convert back.",
      "Remember to handle the 'wraparound' effect using the modulo operator (`%`). For example, `(char_code - base_code + shift) % 26 + base_code`."
    ],
    "starterCode": "text = 'Hello World'\nshift = 3\n\ndef caesar_encode(text, shift):\n    # Your code here\n    pass\n\nprint(caesar_encode(text, shift))",
    "solution": "text = 'Hello World'\nshift = 3\n\ndef caesar_encode(text, shift):\n    result = []\n    for char in text:\n        if 'a' <= char <= 'z':\n            result.append(chr((ord(char) - ord('a') + shift) % 26 + ord('a')))\n        elif 'A' <= char <= 'Z':\n            result.append(chr((ord(char) - ord('A') + shift) % 26 + ord('A')))\n        else:\n            result.append(char)\n    return ''.join(result)\n\nprint(caesar_encode(text, shift))",
    "testCases": [
      {
        "input": "text = 'Hello World', shift = 3",
        "expected": "Khoor Zruog",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "strings",
      "encryption",
      "loops",
      "ord",
      "chr",
      "modulo",
      "conditional logic"
    ]
  },
  {
    "id": "087",
    "number": 87,
    "title": "Caesar Cipher Decoder",
    "titleVi": "Giải mã Caesar Cipher",
    "difficulty": "hard",
    "section": "More String Manipulation",
    "description": "Write a function `caesar_decode(text, shift)` that deciphers a message encoded with a Caesar cipher. It takes `text` (a string, which is the encoded message) and `shift` (the integer shift used for encoding) as input. Each alphabetical character in the text should be shifted backward by the `shift` amount. Non-alphabetical characters remain unchanged. Case should be preserved, and the alphabet wraps around (e.g., 'A' shifted back by 1 becomes 'Z').",
    "descriptionVi": "Viết một hàm `caesar_decode(text, shift)` giải mã một thông điệp được mã hóa bằng mã Caesar. Nó nhận chuỗi `text` (thông điệp đã mã hóa) và số nguyên `shift` (độ dịch chuyển được sử dụng để mã hóa) làm đầu vào. Mỗi ký tự chữ cái trong văn bản nên được dịch chuyển ngược lại bằng lượng `shift`. Các ký tự không phải chữ cái giữ nguyên. Chữ hoa chữ thường phải được bảo toàn, và bảng chữ cái được cuộn tròn (ví dụ: 'A' dịch ngược 1 thành 'Z').",
    "expectedOutput": "Hello World",
    "hints": [
      "This is the reverse of encoding. Instead of adding `shift`, subtract it.",
      "The modulo arithmetic for backward shift can be `(char_code - base_code - shift + 26) % 26 + base_code` to handle negative results gracefully."
    ],
    "starterCode": "text = 'Khoor Zruog'\nshift = 3\n\ndef caesar_decode(text, shift):\n    # Your code here\n    pass\n\nprint(caesar_decode(text, shift))",
    "solution": "text = 'Khoor Zruog'\nshift = 3\n\ndef caesar_decode(text, shift):\n    result = []\n    for char in text:\n        if 'a' <= char <= 'z':\n            result.append(chr((ord(char) - ord('a') - shift) % 26 + ord('a')))\n        elif 'A' <= char <= 'Z':\n            result.append(chr((ord(char) - ord('A') - shift) % 26 + ord('A')))\n        else:\n            result.append(char)\n    return ''.join(result)\n\nprint(caesar_decode(text, shift))",
    "testCases": [
      {
        "input": "text = 'Khoor Zruog', shift = 3",
        "expected": "Hello World",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "strings",
      "decryption",
      "loops",
      "ord",
      "chr",
      "modulo",
      "conditional logic"
    ]
  },
  {
    "id": "088",
    "number": 88,
    "title": "Create Array of Numbers, Find Sum",
    "titleVi": "Tạo mảng số, tìm tổng",
    "difficulty": "easy",
    "section": "Numeric Arrays (adapted to Lists)",
    "description": "Write a function `sum_list_elements(numbers_list)` that takes a list of integers as input. It should calculate and return the sum of all elements in the list.",
    "descriptionVi": "Viết một hàm `sum_list_elements(numbers_list)` nhận vào một danh sách các số nguyên làm đầu vào. Nó nên tính toán và trả về tổng của tất cả các phần tử trong danh sách.",
    "expectedOutput": "100",
    "hints": [
      "Python's built-in `sum()` function is perfect for this.",
      "Alternatively, use a loop and an accumulator variable."
    ],
    "starterCode": "numbers_list = [10, 20, 30, 40]\n\ndef sum_list_elements(numbers_list):\n    # Your code here\n    pass\n\nresult = sum_list_elements(numbers_list)\nif result is not None:\n    print(result)",
    "solution": "numbers_list = [10, 20, 30, 40]\n\ndef sum_list_elements(numbers_list):\n    return sum(numbers_list)\n\nresult = sum_list_elements(numbers_list)\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "numbers_list = [10, 20, 30, 40]",
        "expected": "100",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "lists",
      "sum",
      "math"
    ]
  },
  {
    "id": "089",
    "number": 89,
    "title": "Find Average of Array",
    "titleVi": "Tìm giá trị trung bình của mảng",
    "difficulty": "easy",
    "section": "Numeric Arrays (adapted to Lists)",
    "description": "Write a function `calculate_average(numbers_list)` that takes a list of integers as input. It should calculate and return the average of all elements in the list. If the list is empty, return `0.0`.",
    "descriptionVi": "Viết một hàm `calculate_average(numbers_list)` nhận vào một danh sách các số nguyên làm đầu vào. Nó nên tính toán và trả về giá trị trung bình của tất cả các phần tử trong danh sách. Nếu danh sách trống, hãy trả về `0.0`.",
    "expectedOutput": "25.0",
    "hints": [
      "Use `sum()` to get the total and `len()` to get the count of elements.",
      "Remember to perform floating-point division and handle the empty list case."
    ],
    "starterCode": "numbers_list = [10, 20, 30, 40]\n\ndef calculate_average(numbers_list):\n    # Your code here\n    pass\n\nresult = calculate_average(numbers_list)\nif result is not None:\n    print(result)",
    "solution": "numbers_list = [10, 20, 30, 40]\n\ndef calculate_average(numbers_list):\n    if not numbers_list:\n        return 0.0\n    return sum(numbers_list) / len(numbers_list)\n\nresult = calculate_average(numbers_list)\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "numbers_list = [10, 20, 30, 40]",
        "expected": "25.0",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "lists",
      "average",
      "sum",
      "len",
      "math",
      "conditional logic"
    ]
  },
  {
    "id": "090",
    "number": 90,
    "title": "Find Second Largest Number",
    "titleVi": "Tìm số lớn thứ hai",
    "difficulty": "medium",
    "section": "Numeric Arrays (adapted to Lists)",
    "description": "Write a function `find_second_largest(numbers_list)` that takes a list of integers as input. It should find and return the second largest number in the list. If the list has fewer than two distinct elements, return `None`.",
    "descriptionVi": "Viết một hàm `find_second_largest(numbers_list)` nhận vào một danh sách các số nguyên làm đầu vào. Nó nên tìm và trả về số lớn thứ hai trong danh sách. Nếu danh sách có ít hơn hai phần tử khác biệt, hãy trả về `None`.",
    "expectedOutput": "20",
    "hints": [
      "Remove duplicate elements first using `set()` and convert back to a list.",
      "Sort the unique elements in ascending order.",
      "Check the length of the sorted unique list before trying to access elements.",
      "The second largest element will be at `index - 2` (or `len() - 2`) if sorted ascending."
    ],
    "starterCode": "numbers_list = [10, 5, 20, 15, 25]\n\ndef find_second_largest(numbers_list):\n    # Your code here\n    pass\n\nresult = find_second_largest(numbers_list)\nif result is not None:\n    print(result)",
    "solution": "numbers_list = [10, 5, 20, 15, 25]\n\ndef find_second_largest(numbers_list):\n    unique_numbers = sorted(list(set(numbers_list))) # Get unique numbers and sort them\n    if len(unique_numbers) < 2:\n        return None\n    return unique_numbers[-2]\n\nresult = find_second_largest(numbers_list)\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "numbers_list = [10, 5, 20, 15, 25]",
        "expected": "20",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "lists",
      "sorting",
      "set",
      "conditional logic",
      "max"
    ]
  },
  {
    "id": "091",
    "number": 91,
    "title": "Sort Array Manually",
    "titleVi": "Sắp xếp mảng thủ công",
    "difficulty": "medium",
    "section": "Numeric Arrays",
    "description": "Write a function that takes a list of numbers and sorts it in ascending order without using the built-in `sort()` method or `sorted()` function. You can use any sorting algorithm (e.g., bubble sort, selection sort, insertion sort). The function should return the sorted list.",
    "descriptionVi": "Viết một hàm nhận vào một danh sách các số và sắp xếp nó theo thứ tự tăng dần mà không sử dụng phương thức `sort()` hoặc hàm `sorted()` tích hợp sẵn. Bạn có thể sử dụng bất kỳ thuật toán sắp xếp nào (ví dụ: sắp xếp nổi bọt, sắp xếp chọn, sắp xếp chèn). Hàm phải trả về danh sách đã sắp xếp.",
    "expectedOutput": "[1, 2, 3, 4, 5]",
    "hints": [
      "Consider using a simple sorting algorithm like Bubble Sort. In Bubble Sort, you repeatedly step through the list, compare adjacent elements and swap them if they are in the wrong order.",
      "You will need nested loops to iterate through the array for comparisons and swaps."
    ],
    "starterCode": "arr = [5, 2, 4, 1, 3]\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "arr = [5, 2, 4, 1, 3]\n\ndef solve():\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n - i - 1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j] # Swap elements\n    print(arr)\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "arr = [5, 2, 4, 1, 3]",
        "expected": "[1, 2, 3, 4, 5]",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "arrays",
      "list",
      "sorting",
      "loops",
      "algorithms"
    ]
  },
  {
    "id": "092",
    "number": 92,
    "title": "Linear Search in Array",
    "titleVi": "Tìm kiếm tuyến tính trong mảng",
    "difficulty": "medium",
    "section": "Numeric Arrays",
    "description": "Write a function that performs a linear search on a given list of numbers. The function should take the list and a target number as input. It should return the index of the target number if found, otherwise return -1. There's no need to print anything; just return the index.",
    "descriptionVi": "Viết một hàm thực hiện tìm kiếm tuyến tính trên một danh sách các số đã cho. Hàm phải nhận vào danh sách và một số mục tiêu làm đầu vào. Nó sẽ trả về chỉ mục của số mục tiêu nếu tìm thấy, nếu không thì trả về -1. Không cần in bất cứ thứ gì; chỉ cần trả về chỉ mục.",
    "expectedOutput": "2",
    "hints": [
      "Iterate through the list from the beginning to the end.",
      "At each element, compare it with the target number.",
      "If a match is found, return its index immediately. If the loop finishes without finding a match, return -1."
    ],
    "starterCode": "arr = [10, 20, 30, 40, 50]\ntarget = 30\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "arr = [10, 20, 30, 40, 50]\ntarget = 30\n\ndef solve():\n    for i in range(len(arr)):\n        if arr[i] == target:\n            return i\n    print(-1)\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "arr = [10, 20, 30, 40, 50], target = 30",
        "expected": "2",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "arrays",
      "list",
      "search",
      "loops",
      "algorithms"
    ]
  },
  {
    "id": "093",
    "number": 93,
    "title": "Count Above Average",
    "titleVi": "Đếm số lớn hơn trung bình",
    "difficulty": "medium",
    "section": "Numeric Arrays",
    "description": "Write a function that takes a list of numbers, calculates their average, and then counts how many numbers in the list are strictly greater than the average. The function should return the count.",
    "descriptionVi": "Viết một hàm nhận vào một danh sách các số, tính toán giá trị trung bình của chúng, sau đó đếm xem có bao nhiêu số trong danh sách lớn hơn nghiêm ngặt giá trị trung bình. Hàm phải trả về số lượng.",
    "expectedOutput": "2",
    "hints": [
      "First, calculate the sum of all numbers in the list and divide by the total count to get the average.",
      "Then, iterate through the list again, comparing each number to the calculated average.",
      "Increment a counter each time a number is found to be greater than the average."
    ],
    "starterCode": "arr = [10, 20, 30, 40, 50]\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "arr = [10, 20, 30, 40, 50]\n\ndef solve():\n    if not arr:\n        return 0\n    total_sum = sum(arr)\n    average = total_sum / len(arr)\n    count_above_average = 0\n    for num in arr:\n        if num > average:\n            count_above_average += 1\n    print(count_above_average)\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "arr = [10, 20, 30, 40, 50]",
        "expected": "2",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "arrays",
      "list",
      "average",
      "counting",
      "loops"
    ]
  },
  {
    "id": "094",
    "number": 94,
    "title": "Remove Duplicates from Array",
    "titleVi": "Xóa các phần tử trùng lặp khỏi mảng",
    "difficulty": "medium",
    "section": "Numeric Arrays",
    "description": "Write a function that takes a list of numbers and returns a new list with all duplicate elements removed. The order of the remaining elements should be preserved as much as possible according to their first appearance. The function should return the list without duplicates.",
    "descriptionVi": "Viết một hàm nhận vào một danh sách các số và trả về một danh sách mới đã loại bỏ tất cả các phần tử trùng lặp. Thứ tự của các phần tử còn lại phải được giữ nguyên càng nhiều càng tốt theo lần xuất hiện đầu tiên của chúng. Hàm phải trả về danh sách không có phần tử trùng lặp.",
    "expectedOutput": "[1, 2, 3, 4, 5]",
    "hints": [
      "You can use an auxiliary data structure, like a set, to keep track of elements that have already been added to the new list.",
      "Iterate through the original list. For each element, check if it's already in your auxiliary structure. If not, add it to your new list and to the auxiliary structure."
    ],
    "starterCode": "arr = [1, 2, 2, 3, 4, 4, 5]\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "arr = [1, 2, 2, 3, 4, 4, 5]\n\ndef solve():\n    seen = set()\n    result = []\n    for item in arr:\n        if item not in seen:\n            seen.add(item)\n            result.append(item)\n    print(result)\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "arr = [1, 2, 2, 3, 4, 4, 5]",
        "expected": "[1, 2, 3, 4, 5]",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "arrays",
      "list",
      "duplicates",
      "set",
      "data structures"
    ]
  },
  {
    "id": "095",
    "number": 95,
    "title": "Merge Two Sorted Arrays",
    "titleVi": "Hợp nhất hai mảng đã sắp xếp",
    "difficulty": "medium",
    "section": "Numeric Arrays",
    "description": "Write a function that takes two already sorted lists of numbers and merges them into a single sorted list. The function should return the new merged and sorted list. Do not use the built-in `sort()` method or `sorted()` function on the merged list.",
    "descriptionVi": "Viết một hàm nhận vào hai danh sách số đã được sắp xếp và hợp nhất chúng thành một danh sách đã sắp xếp duy nhất. Hàm phải trả về danh sách đã hợp nhất và đã sắp xếp mới. Không sử dụng phương thức `sort()` hoặc hàm `sorted()` tích hợp sẵn trên danh sách đã hợp nhất.",
    "expectedOutput": "[1, 2, 3, 4, 5, 6]",
    "hints": [
      "Use two pointers, one for each input list, to track the current position in each list.",
      "Compare the elements pointed to by the pointers and append the smaller one to the result list.",
      "Advance the pointer of the list from which the element was taken.",
      "After one list is exhausted, append all remaining elements from the other list to the result."
    ],
    "starterCode": "arr1 = [1, 3, 5]\narr2 = [2, 4, 6]\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "arr1 = [1, 3, 5]\narr2 = [2, 4, 6]\n\ndef solve():\n    merged = []\n    i, j = 0, 0\n    while i < len(arr1) and j < len(arr2):\n        if arr1[i] < arr2[j]:\n            merged.append(arr1[i])\n            i += 1\n        else:\n            merged.append(arr2[j])\n            j += 1\n    while i < len(arr1):\n        merged.append(arr1[i])\n        i += 1\n    while j < len(arr2):\n        merged.append(arr2[j])\n        j += 1\n    print(merged)\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "arr1 = [1, 3, 5], arr2 = [2, 4, 6]",
        "expected": "[1, 2, 3, 4, 5, 6]",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "arrays",
      "list",
      "merge",
      "sorting",
      "algorithms",
      "pointers"
    ]
  },
  {
    "id": "096",
    "number": 96,
    "title": "Create and Display 3x3 Grid",
    "titleVi": "Tạo và hiển thị lưới 3x3",
    "difficulty": "easy",
    "section": "2D Lists and Dictionaries",
    "description": "Write a function that creates a 3x3 grid (a list of lists) where each cell contains a sequential number starting from 1. For example, the top-left cell should be 1, the next 2, and so on, up to 9. The function should then return a formatted string representation of this grid. Each row should be on a new line and numbers should be separated by a space.",
    "descriptionVi": "Viết một hàm tạo một lưới 3x3 (một danh sách các danh sách) trong đó mỗi ô chứa một số tuần tự bắt đầu từ 1. Ví dụ, ô trên cùng bên trái sẽ là 1, tiếp theo là 2, v.v., lên đến 9. Hàm sau đó sẽ trả về một biểu diễn chuỗi được định dạng của lưới này. Mỗi hàng phải nằm trên một dòng mới và các số phải được phân tách bằng một dấu cách.",
    "expectedOutput": "1 2 3\n4 5 6\n7 8 9",
    "hints": [
      "Initialize an empty list of lists, or a list with three empty inner lists.",
      "Use nested for loops to populate the grid. An outer loop for rows and an inner loop for columns.",
      "Keep a counter variable that increments with each number placed in the grid.",
      "To format the output, iterate through the created grid. For each inner list (row), convert the numbers to strings, join them with a space, and then join the rows with newline characters."
    ],
    "starterCode": "def solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "def solve():\n    grid = []\n    number = 1\n    for _ in range(3):\n        row = []\n        for _ in range(3):\n            row.append(number)\n            number += 1\n        grid.append(row)\n\n    formatted_grid = []\n    for row in grid:\n        formatted_grid.append(' '.join(map(str, row)))\n    print('\\n'.join(formatted_grid))\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "No input needed, the grid is fixed.",
        "expected": "1 2 3\n4 5 6\n7 8 9",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "2d lists",
      "grid",
      "nested loops",
      "string formatting"
    ]
  },
  {
    "id": "097",
    "number": 97,
    "title": "Student Records 2D List",
    "titleVi": "Danh sách 2D hồ sơ sinh viên",
    "difficulty": "medium",
    "section": "2D Lists and Dictionaries",
    "description": "Write a function that accepts a list of student data, where each student is represented by a sublist containing their `[name, age, grade]`. The function should iterate through this 2D list and return a formatted string that displays each student's information on a new line. The output for each student should be in the format: `Name: [name], Age: [age], Grade: [grade]`.",
    "descriptionVi": "Viết một hàm chấp nhận một danh sách dữ liệu sinh viên, trong đó mỗi sinh viên được biểu thị bằng một danh sách con chứa `[tên, tuổi, điểm]`. Hàm phải lặp qua danh sách 2D này và trả về một chuỗi được định dạng hiển thị thông tin của mỗi sinh viên trên một dòng mới. Định dạng đầu ra cho mỗi sinh viên phải là: `Tên: [tên], Tuổi: [tuổi], Điểm: [điểm]`.",
    "expectedOutput": "Name: Alice, Age: 18, Grade: A\nName: Bob, Age: 19, Grade: B\nName: Charlie, Age: 17, Grade: A",
    "hints": [
      "Use a for loop to iterate through the main list, where each element is a sublist representing a student.",
      "Inside the loop, access the elements of the sublist by index (e.g., student[0] for name).",
      "Use an f-string or string concatenation to format the output for each student.",
      "Join the formatted strings for each student with a newline character to get the final output."
    ],
    "starterCode": "student_data = [['Alice', 18, 'A'], ['Bob', 19, 'B'], ['Charlie', 17, 'A']]\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "student_data = [['Alice', 18, 'A'], ['Bob', 19, 'B'], ['Charlie', 17, 'A']]\n\ndef solve():\n    formatted_records = []\n    for student in student_data:\n        name, age, grade = student[0], student[1], student[2]\n        formatted_records.append(f\"Name: {name}, Age: {age}, Grade: {grade}\")\n    print('\\n'.join(formatted_records))\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "student_data = [['Alice', 18, 'A'], ['Bob', 19, 'B'], ['Charlie', 17, 'A']]",
        "expected": "Name: Alice, Age: 18, Grade: A\nName: Bob, Age: 19, Grade: B\nName: Charlie, Age: 17, Grade: A",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "2d lists",
      "list of lists",
      "data display",
      "string formatting",
      "loops"
    ]
  },
  {
    "id": "098",
    "number": 98,
    "title": "Matrix Addition",
    "titleVi": "Cộng ma trận",
    "difficulty": "medium",
    "section": "2D Lists and Dictionaries",
    "description": "Write a function that takes two matrices (represented as lists of lists) of the same dimensions and returns a new matrix that is the sum of the input matrices. Matrix addition involves adding corresponding elements. Each matrix will be 2x2. The function should return the resulting 2x2 matrix.",
    "descriptionVi": "Viết một hàm nhận vào hai ma trận (được biểu thị bằng danh sách các danh sách) có cùng kích thước và trả về một ma trận mới là tổng của các ma trận đầu vào. Cộng ma trận liên quan đến việc cộng các phần tử tương ứng. Mỗi ma trận sẽ là 2x2. Hàm phải trả về ma trận 2x2 kết quả.",
    "expectedOutput": "[[4, 6], [8, 10]]",
    "hints": [
      "Initialize a result matrix of the same dimensions, typically filled with zeros or empty lists.",
      "Use nested loops to iterate through rows and columns of both matrices simultaneously.",
      "Add the elements at the corresponding positions from matrix1 and matrix2, and store the result in the new matrix.",
      "Remember that matrices in this context are lists of lists."
    ],
    "starterCode": "matrix1 = [[1, 2], [3, 4]]\nmatrix2 = [[3, 4], [5, 6]]\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "matrix1 = [[1, 2], [3, 4]]\nmatrix2 = [[3, 4], [5, 6]]\n\ndef solve():\n    rows = len(matrix1)\n    cols = len(matrix1[0])\n\n    result_matrix = []\n    for i in range(rows):\n        current_row = []\n        for j in range(cols):\n            current_row.append(matrix1[i][j] + matrix2[i][j])\n        result_matrix.append(current_row)\n    print(result_matrix)\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "matrix1 = [[1, 2], [3, 4]], matrix2 = [[3, 4], [5, 6]]",
        "expected": "[[4, 6], [8, 10]]",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "2d lists",
      "matrices",
      "addition",
      "nested loops",
      "algorithms"
    ]
  },
  {
    "id": "099",
    "number": 99,
    "title": "Matrix Multiplication (Simple)",
    "titleVi": "Nhân ma trận (Đơn giản)",
    "difficulty": "hard",
    "section": "2D Lists and Dictionaries",
    "description": "Write a function that takes two square matrices (represented as lists of lists) of the same dimensions and returns a new matrix that is their product. For simplicity, assume matrices are 2x2. The function should return the resulting 2x2 matrix.",
    "descriptionVi": "Viết một hàm nhận vào hai ma trận vuông (được biểu thị bằng danh sách các danh sách) có cùng kích thước và trả về một ma trận mới là tích của chúng. Để đơn giản, giả sử các ma trận là 2x2. Hàm phải trả về ma trận 2x2 kết quả.",
    "expectedOutput": "[[19, 22], [43, 50]]",
    "hints": [
      "Matrix multiplication `C = A * B` works as follows: `C[i][j]` is the dot product of row `i` of `A` and column `j` of `B`.",
      "For a 2x2 matrix multiplication: `C[0][0] = A[0][0]*B[0][0] + A[0][1]*B[1][0]`.",
      "You will likely need three nested loops: one for rows of the result matrix, one for columns of the result matrix, and one for iterating through the elements for the dot product sum.",
      "Initialize the result matrix with zeros before performing calculations."
    ],
    "starterCode": "matrix1 = [[1, 2], [3, 4]]\nmatrix2 = [[5, 6], [7, 8]]\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "matrix1 = [[1, 2], [3, 4]]\nmatrix2 = [[5, 6], [7, 8]]\n\ndef solve():\n    rows_a = len(matrix1)\n    cols_a = len(matrix1[0])\n    rows_b = len(matrix2)\n    cols_b = len(matrix2[0])\n\n    # Check if multiplication is possible (cols_a == rows_b)\n    if cols_a != rows_b:\n        return [] # Or raise an error\n\n    result_matrix = [[0 for _ in range(cols_b)] for _ in range(rows_a)]\n\n    for i in range(rows_a):\n        for j in range(cols_b):\n            for k in range(cols_a):\n                result_matrix[i][j] += matrix1[i][k] * matrix2[k][j]\n    print(result_matrix)\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "matrix1 = [[1, 2], [3, 4]], matrix2 = [[5, 6], [7, 8]]",
        "expected": "[[19, 22], [43, 50]]",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "2d lists",
      "matrices",
      "multiplication",
      "nested loops",
      "algorithms",
      "hard"
    ]
  },
  {
    "id": "100",
    "number": 100,
    "title": "Tic-Tac-Toe Board Display",
    "titleVi": "Hiển thị bảng Tic-Tac-Toe",
    "difficulty": "medium",
    "section": "2D Lists and Dictionaries",
    "description": "Write a function that takes a 3x3 list of lists representing a Tic-Tac-Toe board (where 'X', 'O', or ' ' for empty are the elements) and returns a formatted string to display the board. Each row should be separated by a newline, and cells within a row should be separated by a vertical bar `|`. Horizontal lines `-----` should separate rows.",
    "descriptionVi": "Viết một hàm nhận vào một danh sách các danh sách 3x3 đại diện cho một bảng Tic-Tac-Toe (trong đó 'X', 'O' hoặc ' ' cho ô trống là các phần tử) và trả về một chuỗi được định dạng để hiển thị bảng. Mỗi hàng phải được phân tách bằng một dòng mới, và các ô trong một hàng phải được phân tách bằng một dấu gạch (|).\nCác đường ngang `-----` sẽ phân tách các hàng.",
    "expectedOutput": " X | O | X \n-----------\n O | X | O \n-----------\n X | O | X ",
    "hints": [
      "Iterate through the rows of the board.",
      "For each row, join the elements with ' | ' to form the row string.",
      "Between each row string, append a separator line ('-----------\n').",
      "Be careful with the additional spaces around 'X', 'O', or ' ' to make it look clean: ' X | O | X '."
    ],
    "starterCode": "board = [['X', 'O', 'X'], ['O', 'X', 'O'], ['X', 'O', 'X']]\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "board = [['X', 'O', 'X'], ['O', 'X', 'O'], ['X', 'O', 'X']]\n\ndef solve():\n    display_rows = []\n    for i, row in enumerate(board):\n        display_rows.append(' ' + ' | '.join(row) + ' ')\n        if i < len(board) - 1:\n            display_rows.append('-----------')\n    print('\\n'.join(display_rows))\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "board = [['X', 'O', 'X'], ['O', 'X', 'O'], ['X', 'O', 'X']]",
        "expected": " X | O | X \n-----------\n O | X | O \n-----------\n X | O | X ",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "2d lists",
      "game board",
      "string formatting",
      "loops"
    ]
  },
  {
    "id": "101",
    "number": 101,
    "title": "Phonebook with Nested Dictionary",
    "titleVi": "Sổ điện thoại với từ điển lồng nhau",
    "difficulty": "medium",
    "section": "2D Lists and Dictionaries",
    "description": "Write a function that takes a dictionary representing a phonebook. Each key is a person's name, and its value is another dictionary containing 'phone' and 'email' as keys with their respective string values. The function should take this phonebook dictionary and return a formatted string listing all contacts. Each contact should be on a new line, showing 'Name: [name], Phone: [phone], Email: [email]'.",
    "descriptionVi": "Viết một hàm nhận một từ điển đại diện cho một danh bạ điện thoại. Mỗi khóa là tên của một người, và giá trị của nó là một từ điển khác chứa 'điện thoại' và 'email' làm khóa với các giá trị chuỗi tương ứng. Hàm phải nhận từ điển danh bạ này và trả về một chuỗi được định dạng liệt kê tất cả các liên hệ. Mỗi liên hệ phải nằm trên một dòng mới, hiển thị 'Tên: [tên], Điện thoại: [điện thoại], Email: [email]'.",
    "expectedOutput": "Name: Alice, Phone: 111-222-3333, Email: alice@example.com\nName: Bob, Phone: 444-555-6666, Email: bob@example.com",
    "hints": [
      "Iterate through the outer dictionary using the `.items()` method to get both the name (key) and the inner dictionary (value).",
      "Access the 'phone' and 'email' details from the inner dictionary.",
      "Use an f-string to format the output for each contact.",
      "Collect all formatted contact strings in a list and then join them with newline characters."
    ],
    "starterCode": "phonebook = {'Alice': {'phone': '111-222-3333', 'email': 'alice@example.com'}, 'Bob': {'phone': '444-555-6666', 'email': 'bob@example.com'}}\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "phonebook = {'Alice': {'phone': '111-222-3333', 'email': 'alice@example.com'}, 'Bob': {'phone': '444-555-6666', 'email': 'bob@example.com'}}\n\ndef solve():\n    formatted_contacts = []\n    for name, details in phonebook.items():\n        phone = details.get('phone', 'N/A')\n        email = details.get('email', 'N/A')\n        formatted_contacts.append(f\"Name: {name}, Phone: {phone}, Email: {email}\")\n    print('\\n'.join(formatted_contacts))\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "phonebook = {'Alice': {'phone': '111-222-3333', 'email': 'alice@example.com'}, 'Bob': {'phone': '444-555-6666', 'email': 'bob@example.com'}}",
        "expected": "Name: Alice, Phone: 111-222-3333, Email: alice@example.com\nName: Bob, Phone: 444-555-6666, Email: bob@example.com",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "dictionaries",
      "nested dictionaries",
      "data display",
      "string formatting",
      "loops"
    ]
  },
  {
    "id": "102",
    "number": 102,
    "title": "Inventory System with Quantities and Prices",
    "titleVi": "Hệ thống kho hàng với số lượng và giá",
    "difficulty": "medium",
    "section": "2D Lists and Dictionaries",
    "description": "Write a function that takes a dictionary representing an inventory. Each key is an item name, and its value is another dictionary with 'quantity' (integer) and 'price' (float) as keys. The function should return a formatted string listing each item, its quantity, and its unit price. Additionally, it should calculate and display the total value of all items (quantity * price). The output should be formatted as: `Item: [name], Quantity: [qty], Price: $[price:.2f], Total Value: $[item_total:.2f]\nOverall Inventory Value: $[grand_total:.2f]`.",
    "descriptionVi": "Viết một hàm nhận một từ điển đại diện cho kho hàng. Mỗi khóa là tên một mặt hàng, và giá trị của nó là một từ điển khác với 'số lượng' (số nguyên) và 'giá' (số thập phân) làm khóa. Hàm phải trả về một chuỗi được định dạng liệt kê từng mặt hàng, số lượng và giá đơn vị. Ngoài ra, nó phải tính toán và hiển thị tổng giá trị của tất cả các mặt hàng (số lượng * giá). Đầu ra phải được định dạng như sau: `Mặt hàng: [tên], Số lượng: [số lượng], Giá: $[giá:.2f], Tổng giá trị: $[tổng_mặt_hàng:.2f]\nTổng giá trị kho hàng: $[tổng_chung:.2f]`.",
    "expectedOutput": "Item: Laptop, Quantity: 5, Price: $1200.00, Total Value: $6000.00\nItem: Mouse, Quantity: 20, Price: $25.50, Total Value: $510.00\nOverall Inventory Value: $6510.00",
    "hints": [
      "Initialize a variable `grand_total` to 0.",
      "Iterate through the outer dictionary using `.items()` to get item name and its details.",
      "Inside the loop, retrieve `quantity` and `price`. Calculate `item_total = quantity * price` and add it to `grand_total`.",
      "Format each item's string and store them in a list. Remember to format float values to two decimal places using f-string specifiers (e.g., `:.2f`).",
      "Finally, join the item strings and append the overall grand total."
    ],
    "starterCode": "inventory = {'Laptop': {'quantity': 5, 'price': 1200.00}, 'Mouse': {'quantity': 20, 'price': 25.50}}\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "inventory = {'Laptop': {'quantity': 5, 'price': 1200.00}, 'Mouse': {'quantity': 20, 'price': 25.50}}\n\ndef solve():\n    formatted_items = []\n    grand_total = 0.0\n    for item_name, details in inventory.items():\n        quantity = details.get('quantity', 0)\n        price = details.get('price', 0.0)\n        item_total = quantity * price\n        grand_total += item_total\n        formatted_items.append(f\"Item: {item_name}, Quantity: {quantity}, Price: ${price:.2f}, Total Value: ${item_total:.2f}\")\n\n    if not formatted_items:\n        return f\"Overall Inventory Value: ${grand_total:.2f}\"\n\n    print('\\n'.join(formatted_items) + f\"\\nOverall Inventory Value: ${grand_total:.2f}\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "inventory = {'Laptop': {'quantity': 5, 'price': 1200.00}, 'Mouse': {'quantity': 20, 'price': 25.50}}",
        "expected": "Item: Laptop, Quantity: 5, Price: $1200.00, Total Value: $6000.00\nItem: Mouse, Quantity: 20, Price: $25.50, Total Value: $510.00\nOverall Inventory Value: $6510.00",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "dictionaries",
      "nested dictionaries",
      "inventory",
      "calculation",
      "string formatting"
    ]
  },
  {
    "id": "103",
    "number": 103,
    "title": "Grade Tracker for Multiple Students and Subjects",
    "titleVi": "Theo dõi điểm cho nhiều học sinh và môn học",
    "difficulty": "hard",
    "section": "2D Lists and Dictionaries",
    "description": "Write a function that takes a nested dictionary representing student grades. The outer dictionary keys are student names. Each student's value is another dictionary where keys are subjects and values are their numerical grades. The function should return a formatted string that lists each student, their subjects, and then an overall average for that student. If a student has no grades, their average should be 'N/A'. Output format for each student: `Student: [name]\n  [Subject1]: [Grade1]\n  [Subject2]: [Grade2]\n  Average: [average:.2f]`.\nStudents should be separated by an empty line.",
    "descriptionVi": "Viết một hàm nhận một từ điển lồng nhau thể hiện điểm của học sinh. Các khóa của từ điển bên ngoài là tên học sinh. Giá trị của mỗi học sinh là một từ điển khác trong đó các khóa là môn học và giá trị là điểm số. Hàm phải trả về một chuỗi được định dạng liệt kê từng học sinh, các môn học của họ và sau đó là điểm trung bình tổng thể cho học sinh đó. Nếu học sinh không có điểm, điểm trung bình của họ phải là 'N/A'. Định dạng đầu ra cho mỗi học sinh: `Học sinh: [tên]\n  [Môn học1]: [Điểm1]\n  [Môn học2]: [Điểm2]\n  Trung bình: [điểm_trung_bình:.2f]`.\nCác học sinh phải được phân tách bằng một dòng trống.",
    "expectedOutput": "Student: Alice\n  Math: 90\n  Science: 85\n  Average: 87.50\n\nStudent: Bob\n  Math: 70\n  History: 65\n  Average: 67.50",
    "hints": [
      "Iterate through the outer dictionary using `.items()` to get student names and their grade dictionaries.",
      "For each student, initialize `total_grades` and `num_subjects` to calculate their average.",
      "Iterate through the inner subject-grade dictionary to sum up grades.",
      "Calculate the average. If `num_subjects` is 0, set average to 'N/A'. Otherwise, format to two decimal places.",
      "Construct the student's output string including subject grades and their average. Store these strings in a list.",
      "Join the student strings with `\\n\\n` to separate them by an empty line."
    ],
    "starterCode": "grades_data = {'Alice': {'Math': 90, 'Science': 85}, 'Bob': {'Math': 70, 'History': 65}}\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "grades_data = {'Alice': {'Math': 90, 'Science': 85}, 'Bob': {'Math': 70, 'History': 65}}\n\ndef solve():\n    all_student_reports = []\n    for student_name, subjects_grades in grades_data.items():\n        student_report = [f\"Student: {student_name}\"]\n        total_grades = 0\n        num_subjects = 0\n\n        for subject, grade in subjects_grades.items():\n            student_report.append(f\"  {subject}: {grade}\")\n            total_grades += grade\n            num_subjects += 1\n\n        if num_subjects > 0:\n            average = total_grades / num_subjects\n            student_report.append(f\"  Average: {average:.2f}\")\n        else:\n            student_report.append(\"  Average: N/A\")\n\n        all_student_reports.append('\\n'.join(student_report))\n\n    print('\\n\\n'.join(all_student_reports))\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "grades_data = {'Alice': {'Math': 90, 'Science': 85}, 'Bob': {'Math': 70, 'History': 65}}",
        "expected": "Student: Alice\n  Math: 90\n  Science: 85\n  Average: 87.50\n\nStudent: Bob\n  Math: 70\n  History: 65\n  Average: 67.50",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "dictionaries",
      "nested dictionaries",
      "grades",
      "average",
      "string formatting",
      "data analysis"
    ]
  },
  {
    "id": "104",
    "number": 104,
    "title": "Display Multiplication Table Grid",
    "titleVi": "Hiển thị bảng cửu chương dạng lưới",
    "difficulty": "medium",
    "section": "2D Lists and Dictionaries",
    "description": "Write a function that generates and returns a formatted string representing a multiplication table from 1x1 up to a specified maximum number. The function takes an integer `max_num` as input. The output should be a grid where numbers are right-aligned and separated by spaces, similar to a standard mathematical multiplication table. Assume `max_num` will be small (e.g., up to 5).",
    "descriptionVi": "Viết một hàm tạo và trả về một chuỗi được định dạng đại diện cho một bảng cửu chương từ 1x1 lên đến một số tối đa được chỉ định. Hàm nhận một số nguyên `max_num` làm đầu vào. Đầu ra phải là một lưới trong đó các số được căn phải và phân tách bằng dấu cách, tương tự như một bảng cửu chương toán học tiêu chuẩn. Giả sử `max_num` sẽ nhỏ (ví dụ, lên đến 5).",
    "expectedOutput": " 1  2  3  4\n 2  4  6  8\n 3  6  9 12\n 4  8 12 16",
    "hints": [
      "You'll need nested loops. The outer loop can represent the multiplier (rows), and the inner loop the multiplicand (columns).",
      "For proper alignment, determine the maximum width for a number in the table (which would be `max_num * max_num`). Use f-string formatting like `{number:>{width}}` to right-align numbers within that width.",
      "Collect each row string, then join them with newline characters."
    ],
    "starterCode": "max_num = 4\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "max_num = 4\n\ndef solve():\n    table_rows = []\n    # Determine max width for alignment\n    max_val = max_num * max_num\n    width = len(str(max_val))\n\n    for i in range(1, max_num + 1):\n        row_values = []\n        for j in range(1, max_num + 1):\n            product = i * j\n            row_values.append(f\"{product:>{width}}\") # Right-align with determined width\n        table_rows.append(' '.join(row_values))\n    print('\\n'.join(table_rows))\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "max_num = 4",
        "expected": " 1  2  3  4\n 2  4  6  8\n 3  6  9 12\n 4  8 12 16",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "loops",
      "multiplication",
      "grid",
      "string formatting",
      "two-dimensional"
    ]
  },
  {
    "id": "105",
    "number": 105,
    "title": "Process Multi-line String, Count Lines",
    "titleVi": "Xử lý chuỗi nhiều dòng, đếm số dòng",
    "difficulty": "easy",
    "section": "File I/O (Adapted)",
    "description": "Write a function that takes a multi-line string as input. Simulate file processing by treating each line of the string as a record. The function should return the total number of non-empty lines in the string. A line is considered non-empty if it contains at least one character after stripping leading/trailing whitespace.",
    "descriptionVi": "Viết một hàm nhận một chuỗi nhiều dòng làm đầu vào. Mô phỏng việc xử lý tệp bằng cách coi mỗi dòng của chuỗi là một bản ghi. Hàm phải trả về tổng số dòng không trống trong chuỗi. Một dòng được coi là không trống nếu nó chứa ít nhất một ký tự sau khi loại bỏ khoảng trắng đầu/cuối.",
    "expectedOutput": "3",
    "hints": [
      "Use the `.splitlines()` method to break the multi-line string into a list of individual lines.",
      "Iterate through the list of lines.",
      "For each line, use the `.strip()` method to remove leading/trailing whitespace.",
      "Check if the `stripped_line` is not empty. If it's not, increment a counter."
    ],
    "starterCode": "multiline_string = \"Line 1\\nLine 2\\n\\nLine 4 \"\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "multiline_string = \"Line 1\\nLine 2\\n\\nLine 4 \"\n\ndef solve():\n    lines = multiline_string.splitlines()\n    non_empty_count = 0\n    for line in lines:\n        if line.strip(): # Checks if the line is not empty after stripping whitespace\n            non_empty_count += 1\n    print(non_empty_count)\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "multiline_string = \"Line 1\\nLine 2\\n\\nLine 4 \"",
        "expected": "3",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "strings",
      "parsing",
      "counting",
      "file simulation",
      "text processing"
    ]
  },
  {
    "id": "106",
    "number": 106,
    "title": "Search for Keyword in Text",
    "titleVi": "Tìm kiếm từ khóa trong văn bản",
    "difficulty": "medium",
    "section": "File I/O (Adapted)",
    "description": "Write a function that takes a multi-line string (representing text content) and a keyword string. The function should search for the keyword (case-insensitive) in each line of the text and return a list of line numbers (1-indexed) where the keyword is found. If the keyword appears multiple times in a single line, that line number should only be listed once.",
    "descriptionVi": "Viết một hàm nhận một chuỗi nhiều dòng (đại diện cho nội dung văn bản) và một chuỗi từ khóa. Hàm phải tìm kiếm từ khóa (không phân biệt chữ hoa chữ thường) trong mỗi dòng văn bản và trả về một danh sách các số dòng (bắt đầu từ 1) nơi tìm thấy từ khóa. Nếu từ khóa xuất hiện nhiều lần trong một dòng, số dòng đó chỉ nên được liệt kê một lần.",
    "expectedOutput": "[1, 3]",
    "hints": [
      "Convert both the line and the keyword to lowercase for case-insensitive comparison using `.lower()`.",
      "Use the `.splitlines()` method to get individual lines.",
      "Keep track of the line number using `enumerate` (starting from 0, so add 1 for 1-indexed output).",
      "Use the `in` operator to check if the keyword is present in the line string."
    ],
    "starterCode": "text_content = \"This is a test.\\nAnother line here.\\nTest again!\"\nkeyword = \"test\"\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "text_content = \"This is a test.\\nAnother line here.\\nTest again!\"\nkeyword = \"test\"\n\ndef solve():\n    lines = text_content.splitlines()\n    found_line_numbers = []\n    lower_keyword = keyword.lower()\n\n    for i, line in enumerate(lines):\n        if lower_keyword in line.lower():\n            found_line_numbers.append(i + 1)\n    print(found_line_numbers)\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "text_content = \"This is a test.\\nAnother line here.\\nTest again!\", keyword = \"test\"",
        "expected": "[1, 3]",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "strings",
      "search",
      "keyword",
      "text processing",
      "case-insensitive"
    ]
  },
  {
    "id": "107",
    "number": 107,
    "title": "Word Frequency Counter",
    "titleVi": "Đếm tần suất từ",
    "difficulty": "medium",
    "section": "File I/O (Adapted)",
    "description": "Write a function that takes a multi-line string as input and returns a dictionary where keys are words and values are their frequencies (counts). The function should: \n1. Convert all words to lowercase.\n2. Remove punctuation (periods, commas, exclamation marks, question marks).\n3. Split the text into words based on spaces.\n4. Count the occurrences of each unique word.\nThe dictionary should be returned.",
    "descriptionVi": "Viết một hàm nhận một chuỗi nhiều dòng làm đầu vào và trả về một từ điển trong đó các khóa là các từ và giá trị là tần suất (số lần xuất hiện) của chúng. Hàm phải:\n1. Chuyển đổi tất cả các từ thành chữ thường.\n2. Loại bỏ dấu câu (dấu chấm, dấu phẩy, dấu chấm than, dấu hỏi).\n3. Chia văn bản thành các từ dựa trên khoảng trắng.\n4. Đếm số lần xuất hiện của mỗi từ duy nhất.\nTừ điển phải được trả về.",
    "expectedOutput": "{'this': 1, 'is': 1, 'a': 1, 'test': 2, 'another': 1, 'line': 1, 'here': 1, 'again': 1}",
    "hints": [
      "Use `text_content.lower()` to convert the entire string to lowercase first.",
      "You can replace punctuation characters with spaces or an empty string using `str.replace()` or a loop/list comprehension.",
      "Use `text_content.split()` to split the string into a list of words. This handles multiple spaces automatically.",
      "Use a dictionary to store word counts. When iterating through the words, increment the count for an existing word or add a new word with a count of 1."
    ],
    "starterCode": "import string\n\ntext_content = \"This is a test. Another line here. Test again!\"\n\n# Your code here",
    "solution": "import string\n\ntext_content = \"This is a test. Another line here. Test again!\"\n\ntext = text_content.lower()\n\nfor char in string.punctuation:\n    text = text.replace(char, '')\n\nword_counts = {}\nfor word in text.split():\n    word_counts[word] = word_counts.get(word, 0) + 1\n\nprint(word_counts)",
    "testCases": [
      {
        "input": "text_content = \"This is a test. Another line here. Test again!\"",
        "expected": "{'this': 1, 'is': 1, 'a': 1, 'test': 2, 'another': 1, 'line': 1, 'here': 1, 'again': 1}",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "strings",
      "dictionaries",
      "word count",
      "text processing",
      "punctuation",
      "case-insensitive"
    ]
  },
  {
    "id": "108",
    "number": 108,
    "title": "Process Log Entries (from string data)",
    "titleVi": "Xử lý các mục nhật ký (từ dữ liệu chuỗi)",
    "difficulty": "medium",
    "section": "File I/O (Adapted)",
    "description": "Write a function that takes a multi-line string representing log entries. Each line is a log entry in the format `[TIMESTAMP] [LEVEL]: [MESSAGE]`. The function should parse these log entries and return a list of dictionaries, where each dictionary represents a log entry with keys 'timestamp', 'level', and 'message'.",
    "descriptionVi": "Viết một hàm nhận một chuỗi nhiều dòng đại diện cho các mục nhật ký. Mỗi dòng là một mục nhật ký ở định dạng `[TIMESTAMP] [LEVEL]: [MESSAGE]`. Hàm phải phân tích cú pháp các mục nhật ký này và trả về một danh sách các từ điển, trong đó mỗi từ điển đại diện cho một mục nhật ký với các khóa 'timestamp', 'level' và 'message'.",
    "expectedOutput": "[{'timestamp': '2023-10-26 10:00:00', 'level': 'INFO', 'message': 'User logged in'}, {'timestamp': '2023-10-26 10:01:05', 'level': 'ERROR', 'message': 'Failed to connect to database'}]",
    "hints": [
      "Use `multiline_string.splitlines()` to get individual log lines.",
      "For each line, use string slicing or `str.split()` along with appropriate delimiters to extract the timestamp, level, and message.",
      "The timestamp will be inside `[]`, the level inside `[]`, and the message starts after `: `.",
      "Be careful to handle potential edge cases or variations in spacing if any (though these inputs are typically consistent)."
    ],
    "starterCode": "log_data = \"[2023-10-26 10:00:00] [INFO]: User logged in\\n[2023-10-26 10:01:05] [ERROR]: Failed to connect to database\"\n\n# Your code here",
    "solution": "log_data = \"[2023-10-26 10:00:00] [INFO]: User logged in\\n[2023-10-26 10:01:05] [ERROR]: Failed to connect to database\"\n\nparsed_logs = []\n\nfor line in log_data.splitlines():\n    if not line.strip():\n        continue\n    timestamp_part, rest = line.split(']', 1)\n    timestamp = timestamp_part.strip().lstrip('[')\n    level_part, message = rest.strip().split(':', 1)\n    parsed_logs.append({\n        'timestamp': timestamp,\n        'level': level_part.strip().strip('[]'),\n        'message': message.strip(),\n    })\n\nprint(parsed_logs)",
    "testCases": [
      {
        "input": "log_data = \"[2023-10-26 10:00:00] [INFO]: User logged in\\n[2023-10-26 10:01:05] [ERROR]: Failed to connect to database\"",
        "expected": "[{'timestamp': '2023-10-26 10:00:00', 'level': 'INFO', 'message': 'User logged in'}, {'timestamp': '2023-10-26 10:01:05', 'level': 'ERROR', 'message': 'Failed to connect to database'}]",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "strings",
      "parsing",
      "log data",
      "dictionaries",
      "list of dictionaries"
    ]
  },
  {
    "id": "109",
    "number": 109,
    "title": "Parse Structured Text Data",
    "titleVi": "Phân tích cú pháp dữ liệu văn bản có cấu trúc",
    "difficulty": "medium",
    "section": "File I/O (Adapted)",
    "description": "Write a function that takes a multi-line string where each line represents a record of 'product,price,stock'. The function should parse this string and return a list of dictionaries. Each dictionary should have 'product' (string), 'price' (float), and 'stock' (integer) as keys with their respective parsed values. If a line is malformed or empty, it should be skipped.",
    "descriptionVi": "Viết một hàm nhận một chuỗi nhiều dòng trong đó mỗi dòng đại diện cho một bản ghi 'sản phẩm,giá,kho'. Hàm phải phân tích cú pháp chuỗi này và trả về một danh sách các từ điển. Mỗi từ điển phải có các khóa 'sản phẩm' (chuỗi), 'giá' (số thập phân) và 'kho' (số nguyên) với các giá trị được phân tích cú pháp tương ứng. Nếu một dòng bị định dạng sai hoặc trống, nó phải được bỏ qua.",
    "expectedOutput": "[{'product': 'Laptop', 'price': 1200.5, 'stock': 10}, {'product': 'Mouse', 'price': 25.0, 'stock': 50}, {'product': 'Monitor', 'price': 300.0, 'stock': 20}]",
    "hints": [
      "Use `multiline_string.splitlines()` to get individual lines.",
      "For each line, use `line.strip().split(',')` to separate the fields.",
      "Check if there are exactly three fields after splitting.",
      "Use `try-except` blocks to handle `ValueError` if `float()` or `int()` conversions fail for malformed data, and `IndexError` if `split(',')` doesn't produce enough parts.",
      "Remember to convert price to float and stock to integer."
    ],
    "starterCode": "data_string = \"Laptop,1200.50,10\\nMouse,25.00,50\\nKeyboard,75,invalid_stock\\nMonitor,300.00,20\"\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "data_string = \"Laptop,1200.50,10\\nMouse,25.00,50\\nKeyboard,75,invalid_stock\\nMonitor,300.00,20\"\n\ndef solve():\n    parsed_records = []\n    lines = data_string.splitlines()\n    for line in lines:\n        line = line.strip()\n        if not line:\n            continue\n\n        parts = line.split(',')\n        if len(parts) == 3:\n            try:\n                product = parts[0].strip()\n                price = float(parts[1].strip())\n                stock = int(parts[2].strip())\n                parsed_records.append({'product': product, 'price': price, 'stock': stock})\n            except ValueError:\n                # Skip lines with invalid price or stock formats\n                continue\n        # else: skip lines with incorrect number of parts\n    print(parsed_records)\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "data_string = \"Laptop,1200.50,10\\nMouse,25.00,50\\nKeyboard,75,invalid_stock\\nMonitor,300.00,20\"",
        "expected": "[{'product': 'Laptop', 'price': 1200.5, 'stock': 10}, {'product': 'Mouse', 'price': 25.0, 'stock': 50}, {'product': 'Monitor', 'price': 300.0, 'stock': 20}]",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "strings",
      "parsing",
      "structured data",
      "data types",
      "error handling"
    ]
  },
  {
    "id": "110",
    "number": 110,
    "title": "Generate Formatted Report from Data",
    "titleVi": "Tạo báo cáo được định dạng từ dữ liệu",
    "difficulty": "hard",
    "section": "File I/O (Adapted)",
    "description": "Write a function that takes a list of product dictionaries (each with 'product', 'price', and 'stock' keys) and generates a formatted report string. The report should have a header, a line for each product detailing its name, price, stock, and total value (price * stock), and a footer showing the grand total value of all products. All numerical values (price, stock, item total, grand total) should be right-aligned and formatted to two decimal places for price/total value. Product names should be left-aligned within a fixed width.",
    "descriptionVi": "Viết một hàm nhận một danh sách các từ điển sản phẩm (mỗi từ điển có các khóa 'sản phẩm', 'giá' và 'kho') và tạo một chuỗi báo cáo được định dạng. Báo cáo phải có một tiêu đề, một dòng cho mỗi sản phẩm chi tiết tên, giá, kho và tổng giá trị của nó (giá * kho), và một chân trang hiển thị tổng giá trị lớn của tất cả các sản phẩm. Tất cả các giá trị số (giá, kho, tổng mặt hàng, tổng chung) phải được căn phải và định dạng đến hai chữ số thập phân cho giá / tổng giá trị. Tên sản phẩm phải được căn trái trong một độ rộng cố định.",
    "expectedOutput": "PRODUCT NAME             PRICE  STOCK TOTAL VALUE\n-------------------------------------------------\nLaptop                 1200.50     10    12005.00\nMouse                    25.00     50     1250.00\nMonitor                 300.00     20     6000.00\n-------------------------------------------------\nGRAND TOTAL VALUE:                       19255.00",
    "hints": [
      "Determine appropriate fixed widths for each column (Product Name, Price, Stock, Total Value) for consistent alignment.",
      "Use `f-string` formatting with alignment specifiers (e.g., `{value:<20}` for left-alignment, `{value:>10.2f}` for right-alignment with 2 decimal places).",
      "Calculate the `grand_total` by summing up `price * stock` for all products.",
      "Construct the header, each item line, and the footer separately, then join them with newlines."
    ],
    "starterCode": "products_data = [{'product': 'Laptop', 'price': 1200.50, 'stock': 10}, {'product': 'Mouse', 'price': 25.00, 'stock': 50}, {'product': 'Monitor', 'price': 300.00, 'stock': 20}]\n\n# Your code here",
    "solution": "products_data = [{'product': 'Laptop', 'price': 1200.50, 'stock': 10}, {'product': 'Mouse', 'price': 25.00, 'stock': 50}, {'product': 'Monitor', 'price': 300.00, 'stock': 20}]\n\nproduct_width, price_width, stock_width, total_width = 20, 10, 7, 12\n\nheader = f\"{'PRODUCT NAME':<{product_width}}{'PRICE':>{price_width}}{'STOCK':>{stock_width}}{'TOTAL VALUE':>{total_width}}\"\nlines = [header, '-' * len(header)]\ngrand_total = 0.0\n\nfor item in products_data:\n    total = item['price'] * item['stock']\n    grand_total += total\n    lines.append(\n        f\"{item['product']:<{product_width}}{item['price']:>{price_width}.2f}\"\n        f\"{item['stock']:>{stock_width}}{total:>{total_width}.2f}\"\n    )\n\nlines.append('-' * len(header))\nlines.append(f\"{'GRAND TOTAL VALUE:':<{product_width + price_width + stock_width}}{grand_total:>{total_width}.2f}\")\n\nprint('\\n'.join(lines))",
    "testCases": [
      {
        "input": "products_data = [{'product': 'Laptop', 'price': 1200.50, 'stock': 10}, {'product': 'Mouse', 'price': 25.00, 'stock': 50}, {'product': 'Monitor', 'price': 300.00, 'stock': 20}]",
        "expected": "PRODUCT NAME             PRICE  STOCK TOTAL VALUE\n-------------------------------------------------\nLaptop                 1200.50     10    12005.00\nMouse                    25.00     50     1250.00\nMonitor                 300.00     20     6000.00\n-------------------------------------------------\nGRAND TOTAL VALUE:                       19255.00",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "lists of dictionaries",
      "report generation",
      "string formatting",
      "calculation",
      "data display"
    ]
  },
  {
    "id": "111",
    "number": 111,
    "title": "Parse CSV-formatted String into Table",
    "titleVi": "Phân tích chuỗi định dạng CSV thành bảng",
    "difficulty": "medium",
    "section": "CSV (Adapted)",
    "description": "Write a function that takes a multi-line string in CSV format (Comma Separated Values) as input. The first line is the header, and subsequent lines are data rows. The function should parse this string and return a list of lists, where the first inner list is the header and the rest are data rows. Each value should be stripped of leading/trailing whitespace.",
    "descriptionVi": "Viết một hàm nhận một chuỗi nhiều dòng ở định dạng CSV (Comma Separated Values) làm đầu vào. Dòng đầu tiên là tiêu đề, và các dòng tiếp theo là các hàng dữ liệu. Hàm phải phân tích cú pháp chuỗi này và trả về một danh sách các danh sách, trong đó danh sách con đầu tiên là tiêu đề và phần còn lại là các hàng dữ liệu. Mỗi giá trị phải được loại bỏ khoảng trắng đầu/cuối.",
    "expectedOutput": "[['Name', 'Age', 'City'], ['Alice', '30', 'New York'], ['Bob', '24', 'London']]",
    "hints": [
      "Use `csv_string.splitlines()` to get individual lines.",
      "For each line, use `line.split(',')` to separate the values.",
      "Remember to `strip()` whitespace from each individual value.",
      "Store the header row separately, then append data rows.",
      "Handle potential empty lines by skipping them."
    ],
    "starterCode": "csv_string = \"Name,Age,City\\nAlice,30,New York\\nBob,24,London\"\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "csv_string = \"Name,Age,City\\nAlice,30,New York\\nBob,24,London\"\n\ndef solve():\n    lines = csv_string.strip().splitlines()\n    if not lines:\n        return []\n\n    parsed_table = []\n    for line in lines:\n        if not line.strip():\n            continue # Skip empty lines\n\n        # Split by comma and strip whitespace from each value\n        row = [value.strip() for value in line.split(',')]\n        parsed_table.append(row)\n    print(parsed_table)\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "csv_string = \"Name,Age,City\\nAlice,30,New York\\nBob,24,London\"",
        "expected": "[['Name', 'Age', 'City'], ['Alice', '30', 'New York'], ['Bob', '24', 'London']]",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "csv",
      "parsing",
      "lists of lists",
      "string manipulation",
      "data processing"
    ]
  },
  {
    "id": "112",
    "number": 112,
    "title": "Calculate Column Averages from CSV Data",
    "titleVi": "Tính toán trung bình cột từ dữ liệu CSV",
    "difficulty": "medium",
    "section": "CSV (Adapted)",
    "description": "Write a function that takes CSV data (as a list of lists, similar to the output of Challenge 111) and a list of column names for which to calculate the average. The function should return a dictionary where keys are the requested column names and values are their averages. Only numerical columns should be averaged. If a column is not found or contains non-numeric data, it should be skipped. Assume the first row is the header.",
    "descriptionVi": "Viết một hàm nhận dữ liệu CSV (dưới dạng danh sách các danh sách, tương tự như đầu ra của Thử thách 111) và một danh sách tên cột cần tính trung bình. Hàm phải trả về một từ điển trong đó các khóa là tên cột được yêu cầu và giá trị là giá trị trung bình của chúng. Chỉ các cột số mới được tính trung bình. Nếu một cột không được tìm thấy hoặc chứa dữ liệu không phải số, nó sẽ bị bỏ qua. Giả sử hàng đầu tiên là tiêu đề.",
    "expectedOutput": "{'Age': 27.0, 'Score': 85.0}",
    "hints": [
      "The first element of the input list is the header with column names.",
      "Find the indices of the requested column names in the header.",
      "Iterate through the data rows (skipping the header).",
      "For each requested column, try to convert the cell value to a float. If successful, add it to a running sum and count. Use a `try-except ValueError` block for conversion.",
      "Calculate the average after processing all rows. If no valid numbers were found for a column, it should not appear in the result."
    ],
    "starterCode": "csv_table = [['Name', 'Age', 'Score'], ['Alice', '30', '90'], ['Bob', '24', '80'], ['Charlie', 'invalid_age', '85']]\ncolumns_to_average = ['Age', 'Score', 'NonExistent']\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "csv_table = [['Name', 'Age', 'Score'], ['Alice', '30', '90'], ['Bob', '24', '80'], ['Charlie', 'invalid_age', '85']]\ncolumns_to_average = ['Age', 'Score', 'NonExistent']\n\ndef solve():\n    if not csv_table or len(csv_table) < 2:\n        return {}\n\n    header = csv_table[0]\n    data_rows = csv_table[1:]\n\n    averages = {}\n\n    for col_name in columns_to_average:\n        if col_name not in header:\n            continue\n\n        col_index = header.index(col_name)\n        column_values = []\n        for row in data_rows:\n            if col_index < len(row):\n                try:\n                    column_values.append(float(row[col_index]))\n                except ValueError:\n                    # Skip non-numeric values in the column\n                    pass\n\n        if column_values:\n            averages[col_name] = sum(column_values) / len(column_values)\n\n    print(averages)\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "csv_table = [['Name', 'Age', 'Score'], ['Alice', '30', '90'], ['Bob', '24', '80'], ['Charlie', 'invalid_age', '85']], columns_to_average = ['Age', 'Score', 'NonExistent']",
        "expected": "{'Age': 27.0, 'Score': 85.0}",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "csv",
      "lists of lists",
      "average",
      "data analysis",
      "error handling"
    ]
  },
  {
    "id": "113",
    "number": 113,
    "title": "Find Max Value in CSV Column",
    "titleVi": "Tìm giá trị lớn nhất trong cột CSV",
    "difficulty": "medium",
    "section": "CSV (Adapted)",
    "description": "Write a function that takes CSV data (as a list of lists) and a column name, then finds and returns the maximum numerical value in that column. The first row is the header. Only numerical values should be considered. If a column is not found, contains no numeric data, or the CSV is empty, return `None`.",
    "descriptionVi": "Viết một hàm nhận dữ liệu CSV (dưới dạng danh sách các danh sách) và tên cột, sau đó tìm và trả về giá trị số lớn nhất trong cột đó. Hàng đầu tiên là tiêu đề. Chỉ các giá trị số mới được xem xét. Nếu một cột không được tìm thấy, không chứa dữ liệu số, hoặc CSV trống, trả về `None`.",
    "expectedOutput": "90.0",
    "hints": [
      "Similar to Challenge 112, locate the column index using the header.",
      "Initialize a `max_value` variable. It's often helpful to initialize it to `None` or negative infinity so that the first valid number becomes the max.",
      "Iterate through the data rows, attempt to convert each cell in the target column to a float, and update `max_value` if a new larger number is found.",
      "Use `try-except ValueError` for robust conversion. Skip non-numeric cells."
    ],
    "starterCode": "csv_table = [['Name', 'Age', 'Score'], ['Alice', '30', '90'], ['Bob', '24', '80'], ['Charlie', 'invalid', '85']]\ncolumn_name = 'Score'\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "csv_table = [['Name', 'Age', 'Score'], ['Alice', '30', '90'], ['Bob', '24', '80'], ['Charlie', 'invalid', '85']]\ncolumn_name = 'Score'\n\ndef solve():\n    if not csv_table or len(csv_table) < 2:\n        return None\n\n    header = csv_table[0]\n    data_rows = csv_table[1:]\n\n    if column_name not in header:\n        return None\n\n    col_index = header.index(column_name)\n    max_value = None\n\n    for row in data_rows:\n        if col_index < len(row):\n            try:\n                numeric_value = float(row[col_index])  # Try converting to float\n                if max_value is None or numeric_value > max_value:\n                    max_value = numeric_value\n            except ValueError:\n                # Skip non-numeric values\n                pass\n\n    print(max_value)\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "csv_table = [['Name', 'Age', 'Score'], ['Alice', '30', '90'], ['Bob', '24', '80'], ['Charlie', 'invalid', '85']], column_name = 'Score'",
        "expected": "90.0",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "csv",
      "lists of lists",
      "max value",
      "data analysis",
      "error handling"
    ]
  },
  {
    "id": "114",
    "number": 114,
    "title": "Filter CSV Rows by Condition",
    "titleVi": "Lọc các hàng CSV theo điều kiện",
    "difficulty": "medium",
    "section": "CSV (Adapted)",
    "description": "Write a function that takes CSV data (as a list of lists), a column name, an operator (e.g., '>', '<', '=='), and a value. The function should filter the data rows and return a new list of lists containing only the rows where the specified column's value meets the condition. The header row should also be included in the returned data. Assume numerical comparison for specified column values (convert to float if possible). Rows with non-numeric data in the filter column should be excluded from the comparison.",
    "descriptionVi": "Viết một hàm nhận dữ liệu CSV (dưới dạng danh sách các danh sách), tên cột, toán tử (ví dụ: '>', '<', '==') và một giá trị. Hàm phải lọc các hàng dữ liệu và trả về một danh sách các danh sách mới chỉ chứa các hàng mà giá trị của cột được chỉ định đáp ứng điều kiện. Hàng tiêu đề cũng phải được bao gồm trong dữ liệu trả về. Giả sử so sánh số đối với các giá trị cột được chỉ định (chuyển đổi thành float nếu có thể). Các hàng có dữ liệu không phải số trong cột lọc sẽ bị loại khỏi so sánh.",
    "expectedOutput": "[['Name', 'Age', 'Score'], ['Alice', '30', '90'], ['Charlie', '28', '85']]",
    "hints": [
      "Locate the column index for the `column_name` using the header.",
      "Initialize a `filtered_data` list with the header row.",
      "Iterate through the data rows (starting from the second row).",
      "For each row, attempt to convert the value in the target column to a float. If successful, apply the given `operator` and `value` to filter. Use `try-except ValueError` for safety.",
      "If the condition is met, append the entire row to `filtered_data`."
    ],
    "starterCode": "csv_table = [['Name', 'Age', 'Score'], ['Alice', '30', '90'], ['Bob', '24', '75'], ['Charlie', '28', '85']]\ncolumn_name = 'Score'\noperator = '>'\nvalue_to_compare = 80\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "csv_table = [['Name', 'Age', 'Score'], ['Alice', '30', '90'], ['Bob', '24', '75'], ['Charlie', '28', '85']]\ncolumn_name = 'Score'\noperator = '>'\nvalue_to_compare = 80\n\ndef solve():\n    if not csv_table or len(csv_table) < 2:\n        return []\n\n    header = csv_table[0]\n    data_rows = csv_table[1:]\n\n    if column_name not in header:\n        return [header] # Return header only if column not found\n\n    col_index = header.index(column_name)\n    filtered_data = [header]\n\n    for row in data_rows:\n        if col_index < len(row):\n            try:\n                cell_value = float(row[col_index])\n                # Use eval for dynamic operator comparison for simplicity in challenges\n                # In production, use explicit if/elif for security.\n                if operator == '>':\n                    if cell_value > float(value_to_compare):\n                        filtered_data.append(row)\n                elif operator == '<':\n                    if cell_value < float(value_to_compare):\n                        filtered_data.append(row)\n                elif operator == '==':\n                    if cell_value == float(value_to_compare):\n                        filtered_data.append(row)\n                elif operator == '>=':\n                    if cell_value >= float(value_to_compare):\n                        filtered_data.append(row)\n                elif operator == '<=':\n                    if cell_value <= float(value_to_compare):\n                        filtered_data.append(row)\n                elif operator == '!=':\n                    if cell_value != float(value_to_compare):\n                        filtered_data.append(row)\n            except ValueError:\n                # Skip rows where the comparison value is not numeric\n                pass\n\n    print(filtered_data)\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "csv_table = [['Name', 'Age', 'Score'], ['Alice', '30', '90'], ['Bob', '24', '75'], ['Charlie', '28', '85']], column_name = 'Score', operator = '>', value_to_compare = 80",
        "expected": "[['Name', 'Age', 'Score'], ['Alice', '30', '90'], ['Charlie', '28', '85']]",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "csv",
      "lists of lists",
      "filter",
      "data manipulation",
      "conditional logic"
    ]
  },
  {
    "id": "115",
    "number": 115,
    "title": "Sort CSV Data by Column",
    "titleVi": "Sắp xếp dữ liệu CSV theo cột",
    "difficulty": "medium",
    "section": "CSV (Adapted)",
    "description": "Write a function that takes CSV data (as a list of lists), a column name to sort by, and an optional `reverse` boolean (defaulting to `False`). The function should sort the data rows based on the values in the specified column and return a new list of lists, including the header. Numeric columns should be sorted numerically, string columns alphabetically. Rows with non-comparable data in the sort column (e.g., text in a numeric column) should be handled gracefully (e.g., by being treated as less than numeric values or placed at the end).",
    "descriptionVi": "Viết một hàm nhận dữ liệu CSV (dưới dạng danh sách các danh sách), tên cột để sắp xếp và một boolean `reverse` tùy chọn (mặc định là `False`). Hàm phải sắp xếp các hàng dữ liệu dựa trên các giá trị trong cột được chỉ định và trả về một danh sách các danh sách mới, bao gồm tiêu đề. Các cột số phải được sắp xếp theo số, các cột chuỗi theo thứ tự bảng chữ cái. Các hàng có dữ liệu không thể so sánh trong cột sắp xếp (ví dụ: văn bản trong cột số) phải được xử lý một cách linh hoạt (ví dụ: bằng cách được coi là nhỏ hơn các giá trị số hoặc được đặt ở cuối).",
    "expectedOutput": "[['Name', 'Age', 'Score'], ['Bob', '24', '75'], ['Charlie', '28', '85'], ['Alice', '30', '90']]",
    "hints": [
      "Extract the header and data rows.",
      "Find the index of the `column_name` in the header.",
      "Use `list.sort()` with a `key` function (a `lambda` function is useful here) to specify how to extract the sorting value from each row.",
      "Inside the `key` function, attempt to convert the column's value to a float. If it fails, return a value that ensures non-numeric values are handled as specified (e.g., `float('-inf')` for ascending numeric sorts, `float('inf')` for text in numeric column at the end, or the string itself for text sorts).",
      "Combine the sorted data rows with the header. Remember to use the `reverse` parameter correctly."
    ],
    "starterCode": "csv_table = [['Name', 'Age', 'Score'], ['Alice', '30', '90'], ['Bob', '24', '75'], ['Charlie', '28', '85']]\ncolumn_name = 'Age'\nreverse = False\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "csv_table = [['Name', 'Age', 'Score'], ['Alice', '30', '90'], ['Bob', '24', '75'], ['Charlie', '28', '85']]\ncolumn_name = 'Age'\nreverse = False\n\ndef solve():\n    if not csv_table or len(csv_table) < 2:\n        return csv_table\n\n    header = csv_table[0]\n    data_rows = csv_table[1:]\n\n    if column_name not in header:\n        return csv_table # If column not found, return original\n\n    col_index = header.index(column_name)\n\n    def sort_key(row):\n        if col_index >= len(row):\n            return float('inf') # malformed rows go to the end\n        val = row[col_index]\n        try:\n            return float(val) # Try numerical sort\n        except ValueError:\n            return val # Fallback to string sort\n\n    # Sort the data rows\n    data_rows.sort(key=sort_key, reverse=reverse)\n\n    print([header] + data_rows)\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "csv_table = [['Name', 'Age', 'Score'], ['Alice', '30', '90'], ['Bob', '24', '75'], ['Charlie', '28', '85']], column_name = 'Age', reverse = False",
        "expected": "[['Name', 'Age', 'Score'], ['Bob', '24', '75'], ['Charlie', '28', '85'], ['Alice', '30', '90']]",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "csv",
      "lists of lists",
      "sorting",
      "data manipulation",
      "lambda",
      "error handling"
    ]
  },
  {
    "id": "116",
    "number": 116,
    "title": "Generate Summary Statistics from CSV",
    "titleVi": "Tạo thống kê tóm tắt từ CSV",
    "difficulty": "hard",
    "section": "CSV (Adapted)",
    "description": "Write a function that takes CSV data (as a list of lists) and a list of numeric column names. For each specified column, the function should calculate its count, sum, minimum, maximum, and average. The function should return a dictionary where keys are column names, and values are another dictionary containing these statistics (e.g., `{'count': N, 'sum': S, 'min': MN, 'max': MX, 'average': AVG}`). Round averages to two decimal places. If a column is not found or contains no numeric data, it should not appear in the result.",
    "descriptionVi": "Viết một hàm nhận dữ liệu CSV (dưới dạng danh sách các danh sách) và một danh sách tên cột số. Đối với mỗi cột được chỉ định, hàm phải tính toán số lượng, tổng, giá trị nhỏ nhất, giá trị lớn nhất và giá trị trung bình của nó. Hàm phải trả về một từ điển trong đó các khóa là tên cột, và giá trị là một từ điển khác chứa các thống kê này (ví dụ: `{'count': N, 'sum': S, 'min': MN, 'max': MX, 'average': AVG}`). Làm tròn giá trị trung bình đến hai chữ số thập phân. Nếu một cột không được tìm thấy hoặc không chứa dữ liệu số, nó sẽ không xuất hiện trong kết quả.",
    "expectedOutput": "{'Age': {'count': 3, 'sum': 82.0, 'min': 24.0, 'max': 30.0, 'average': 27.33}, 'Score': {'count': 3, 'sum': 250.0, 'min': 75.0, 'max': 90.0, 'average': 83.33}}",
    "hints": [
      "Extract header and data rows.",
      "For each requested column:",
      "  Get its index.",
      "  Initialize `values = []` to store all numeric values from that column.",
      "  Iterate through data rows, convert cell values to float, and append to `values` (use `try-except`).",
      "  If `values` list is not empty, calculate count, sum, min, max, and average from it.",
      "  Store these statistics in a nested dictionary for the current column. Format average to two decimal places."
    ],
    "starterCode": "csv_table = [['Name', 'Age', 'Score'], ['Alice', '30', '90'], ['Bob', '24', '75'], ['Charlie', '28', '85']]\nnumeric_columns = ['Age', 'Score', 'InvalidColumn']\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "csv_table = [['Name', 'Age', 'Score'], ['Alice', '30', '90'], ['Bob', '24', '75'], ['Charlie', '28', '85']]\nnumeric_columns = ['Age', 'Score', 'InvalidColumn']\n\ndef solve():\n    if not csv_table or len(csv_table) < 2:\n        return {}\n\n    header = csv_table[0]\n    data_rows = csv_table[1:]\n\n    summary_stats = {}\n\n    for col_name in numeric_columns:\n        if col_name not in header:\n            continue\n\n        col_index = header.index(col_name)\n        column_values = []\n        for row in data_rows:\n            if col_index < len(row):\n                try:\n                    column_values.append(float(row[col_index]))\n                except ValueError:\n                    pass\n\n        if column_values:\n            count = len(column_values)\n            total_sum = sum(column_values)\n            minimum = min(column_values)\n            maximum = max(column_values)\n            average = total_sum / count if count > 0 else 0.0\n\n            summary_stats[col_name] = {\n                'count': count,\n                'sum': total_sum,\n                'min': minimum,\n                'max': maximum,\n                'average': round(average, 2)\n            }\n\n    print(summary_stats)\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "csv_table = [['Name', 'Age', 'Score'], ['Alice', '30', '90'], ['Bob', '24', '75'], ['Charlie', '28', '85']], numeric_columns = ['Age', 'Score', 'InvalidColumn']",
        "expected": "{'Age': {'count': 3, 'sum': 82.0, 'min': 24.0, 'max': 30.0, 'average': 27.33}, 'Score': {'count': 3, 'sum': 250.0, 'min': 75.0, 'max': 90.0, 'average': 83.33}}",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "csv",
      "lists of lists",
      "statistics",
      "data analysis",
      "dictionaries",
      "summary"
    ]
  },
  {
    "id": "117",
    "number": 117,
    "title": "Join Two CSV Datasets",
    "titleVi": "Kết hợp hai tập dữ liệu CSV",
    "difficulty": "hard",
    "section": "CSV (Adapted)",
    "description": "Write a function that takes two CSV datasets (each as a list of lists, header included) and a `join_key_column` name, then performs an inner join on them. The function should return a new list of lists representing the joined dataset. The header of the joined dataset should combine the headers of both input datasets (removing the duplicate join key column). Only rows that have a matching value in the `join_key_column` in both datasets should be included.",
    "descriptionVi": "Viết một hàm nhận hai tập dữ liệu CSV (mỗi tập dữ liệu dưới dạng danh sách các danh sách, bao gồm tiêu đề) và một tên `cột_khóa_kết_nối`, sau đó thực hiện phép nối bên trong trên chúng. Hàm phải trả về một danh sách các danh sách mới đại diện cho tập dữ liệu đã nối. Tiêu đề của tập dữ liệu đã nối phải kết hợp các tiêu đề của cả hai tập dữ liệu đầu vào (loại bỏ cột khóa kết nối trùng lặp). Chỉ các hàng có giá trị khớp trong `cột_khóa_kết_nối` trong cả hai tập dữ liệu mới được đưa vào.",
    "expectedOutput": "[['ID', 'Name', 'Age', 'Product', 'Price'], ['1', 'Alice', '30', 'Laptop', '1200.50'], ['2', 'Bob', '24', 'Mouse', '25.00']]",
    "hints": [
      "First, parse both `csv1` and `csv2` into header and data rows.",
      "Find the index of `join_key_column` in both headers.",
      "Create a new combined header. Make sure the `join_key_column` is only included once, typically at the beginning or by taking one and appending the rest of the other.",
      "For efficient joining, convert one of the datasets into a dictionary where keys are the join key values and values are the rest of the row data.",
      "Iterate through the rows of the second dataset. For each row, if its join key exists in the dictionary created from the first dataset, construct a joined row and add it to the result.",
      "Be mindful of the order of columns in the final joined row."
    ],
    "starterCode": "csv_data1 = [['ID', 'Name', 'Age'], ['1', 'Alice', '30'], ['2', 'Bob', '24'], ['3', 'Charlie', '28']]\ncsv_data2 = [['ID', 'Product', 'Price'], ['1', 'Laptop', '1200.50'], ['2', 'Mouse', '25.00'], ['4', 'Keyboard', '75.00']]\njoin_key_column = 'ID'\n\n# Your code here",
    "solution": "csv_data1 = [['ID', 'Name', 'Age'], ['1', 'Alice', '30'], ['2', 'Bob', '24'], ['3', 'Charlie', '28']]\ncsv_data2 = [['ID', 'Product', 'Price'], ['1', 'Laptop', '1200.50'], ['2', 'Mouse', '25.00'], ['4', 'Keyboard', '75.00']]\njoin_key_column = 'ID'\n\nheader1, data1 = csv_data1[0], csv_data1[1:]\nheader2, data2 = csv_data2[0], csv_data2[1:]\n\nkey_idx1 = header1.index(join_key_column)\nkey_idx2 = header2.index(join_key_column)\n\nlookup = {}\nfor row in data1:\n    lookup[row[key_idx1]] = [v for i, v in enumerate(row) if i != key_idx1]\n\nnew_header = [join_key_column] + [c for c in header1 if c != join_key_column] + [c for c in header2 if c != join_key_column]\njoined = [new_header]\n\nfor row in data2:\n    key = row[key_idx2]\n    if key in lookup:\n        rest2 = [v for i, v in enumerate(row) if i != key_idx2]\n        joined.append([key] + lookup[key] + rest2)\n\nprint(joined)",
    "testCases": [
      {
        "input": "csv_data1 = [['ID', 'Name', 'Age'], ['1', 'Alice', '30'], ['2', 'Bob', '24'], ['3', 'Charlie', '28']], csv_data2 = [['ID', 'Product', 'Price'], ['1', 'Laptop', '1200.50'], ['2', 'Mouse', '25.00'], ['4', 'Keyboard', '75.00']], join_key_column = 'ID'",
        "expected": "[['ID', 'Name', 'Age', 'Product', 'Price'], ['1', 'Alice', '30', 'Laptop', '1200.50'], ['2', 'Bob', '24', 'Mouse', '25.00']]",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "csv",
      "lists of lists",
      "join",
      "data manipulation",
      "dictionaries",
      "hard"
    ]
  },
  {
    "id": "118",
    "number": 118,
    "title": "Function to Calculate Area of Shapes",
    "titleVi": "Hàm tính diện tích các hình",
    "difficulty": "easy",
    "section": "Subprograms (Functions)",
    "description": "Write a function `calculate_area(shape, **kwargs)` that calculates the area of different shapes. The function should accept a `shape` string, and keyword arguments for dimensions.\n- If `shape` is 'square', it needs a `side` argument.\n- If `shape` is 'rectangle', it needs `length` and `width` arguments.\n- If `shape` is 'circle', it needs a `radius` argument.\nReturn the calculated area. If the `shape` is unrecognized or required arguments are missing, return `None`.",
    "descriptionVi": "Viết một hàm `calculate_area(shape, **kwargs)` để tính diện tích của các hình khác nhau. Hàm phải chấp nhận một chuỗi `shape` và các đối số từ khóa cho các kích thước.\n- Nếu `shape` là 'square', nó cần đối số `side`.\n- Nếu `shape` là 'rectangle', nó cần các đối số `length` và `width`.\n- Nếu `shape` là 'circle', nó cần đối số `radius`.\nTrả về diện tích đã tính. Nếu `shape` không được nhận dạng hoặc thiếu các đối số cần thiết, trả về `None`.",
    "expectedOutput": "25",
    "hints": [
      "Use `if/elif/else` statements to check the `shape` parameter.",
      "Inside each `if` block, check for the presence of required keyword arguments using `kwargs.get()` or by directly checking `if 'key' in kwargs:`.",
      "Remember the formulas: Square: `side * side`, Rectangle: `length * width`, Circle: `math.pi * radius * radius` (or `radius**2`). You'll need to import the `math` module for `math.pi`.",
      "Return `None` if conditions are not met for any shape, or if the shape is unknown."
    ],
    "starterCode": "import math\n\nshape = 'square'\nkwargs = {'side': 5}\n\ndef solve(shape, **kwargs):\n    # Your code here\n    pass\n\nresult = solve(shape, **kwargs)\nif result is not None:\n    print(result)",
    "solution": "import math\n\nshape = 'square'\nkwargs = {'side': 5}\n\ndef solve(shape, **kwargs):\n    if shape == 'square':\n        side = kwargs.get('side')\n        if side is not None:\n            return side * side\n    elif shape == 'rectangle':\n        length = kwargs.get('length')\n        width = kwargs.get('width')\n        if length is not None and width is not None:\n            return length * width\n    elif shape == 'circle':\n        radius = kwargs.get('radius')\n        if radius is not None:\n            return math.pi * (radius ** 2)\n    return None\n\nresult = solve(shape, **kwargs)\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "shape = 'square', kwargs={'side': 5}",
        "expected": "25",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "functions",
      "kwargs",
      "area",
      "math",
      "conditional logic"
    ]
  },
  {
    "id": "119",
    "number": 119,
    "title": "Function with Default Parameters",
    "titleVi": "Hàm với tham số mặc định",
    "difficulty": "easy",
    "section": "Subprograms (Functions)",
    "description": "Write a Python function `greet(name, greeting='Hello')` that takes a `name` and an optional `greeting` string. The `greeting` parameter should have a default value of 'Hello'. The function should return a formatted string combining the greeting and the name.",
    "descriptionVi": "Viết một hàm Python `greet(name, greeting='Hello')` nhận một `name` và một chuỗi `greeting` tùy chọn. Tham số `greeting` phải có giá trị mặc định là 'Hello'. Hàm phải trả về một chuỗi được định dạng kết hợp lời chào và tên.",
    "expectedOutput": "Hello Alice!",
    "hints": [
      "Define the function signature with the default parameter: `def greet(name, greeting='Hello'):`",
      "Inside the function, use an f-string or string concatenation to combine the `greeting` and `name`."
    ],
    "starterCode": "name = 'Alice'\ngreeting = None\n\ndef solve(name, greeting=None):\n    # Your code here\n    pass\n\nresult = solve(name, greeting)\nif result is not None:\n    print(result)",
    "solution": "name = 'Alice'\ngreeting = None\n\ndef greet(name, greeting='Hello'):\n    return f\"{greeting} {name}!\"\n\ndef solve(name, greeting=None):\n    if greeting is None:\n        return greet(name)\n    else:\n        return greet(name, greeting)\n\nresult = solve(name, greeting)\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "name = 'Alice', greeting = None",
        "expected": "Hello Alice!",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "functions",
      "default parameters",
      "string formatting",
      "easy"
    ]
  },
  {
    "id": "120",
    "number": 120,
    "title": "Recursive Factorial",
    "titleVi": "Giai thừa đệ quy",
    "difficulty": "medium",
    "section": "Subprograms (Functions)",
    "description": "Write a recursive Python function `factorial(n)` that calculates the factorial of a non-negative integer `n`. The factorial of an integer `n` is the product of all positive integers less than or equal to `n`. The factorial of 0 is 1. Your function should return the calculated factorial.",
    "descriptionVi": "Viết một hàm Python đệ quy `factorial(n)` tính giai thừa của một số nguyên không âm `n`. Giai thừa của một số nguyên `n` là tích của tất cả các số nguyên dương nhỏ hơn hoặc bằng `n`. Giai thừa của 0 là 1. Hàm của bạn phải trả về giai thừa đã tính được.",
    "expectedOutput": "1",
    "hints": [
      "The base case for recursion is when `n` is 0 or 1, in which case the factorial is 1.",
      "The recursive step is `n * factorial(n - 1)`.",
      "Ensure your function handles the base case to prevent infinite recursion."
    ],
    "starterCode": "n = 0\n\ndef solve(n):\n    # Your code here\n    pass\n\nresult = solve(n)\nif result is not None:\n    print(result)",
    "solution": "n = 0\n\ndef solve(n):\n    if n == 0 or n == 1:\n        return 1\n    else:\n        return n * solve(n - 1)\n\nresult = solve(n)\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "n = 0",
        "expected": "1",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "functions",
      "recursion",
      "factorial",
      "math",
      "algorithms"
    ]
  },
  {
    "id": "121",
    "number": 121,
    "title": "Recursive Factorial",
    "titleVi": "Giai thừa đệ quy",
    "difficulty": "medium",
    "section": "Functions",
    "description": "Write a recursive function `solve(n)` that calculates the factorial of a non-negative integer `n`. The factorial of 0 is 1. The factorial of a positive integer `n` is the product of all positive integers less than or equal to `n`.",
    "descriptionVi": "Viết một hàm đệ quy `solve(n)` tính toán giai thừa của một số nguyên không âm `n`. Giai thừa của 0 là 1. Giai thừa của một số nguyên dương `n` là tích của tất cả các số nguyên dương nhỏ hơn hoặc bằng `n`.",
    "expectedOutput": "120",
    "hints": [
      "The base case for recursion is when n is 0.",
      "The recursive step involves multiplying n by the factorial of (n-1)."
    ],
    "starterCode": "n = 5\n\ndef solve(n):\n    # Your code here\n    pass\n\nresult = solve(n)\nif result is not None:\n    print(result)",
    "solution": "n = 5\n\ndef solve(n):\n    if n == 0:\n        return 1\n    else:\n        return n * solve(n - 1)\n\nresult = solve(n)\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "5",
        "expected": "120",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "recursion",
      "math",
      "functions"
    ]
  },
  {
    "id": "122",
    "number": 122,
    "title": "Min/Max/Average",
    "titleVi": "Tìm Min/Max/Trung bình",
    "difficulty": "easy",
    "section": "Functions",
    "description": "Write a function `solve(numbers)` that takes a list of numbers, calculates their minimum, maximum, and average, and prints them. Each value should be printed on a new line, and the average should be formatted to two decimal places.",
    "descriptionVi": "Viết hàm `solve(numbers)` nhận vào một danh sách các số, tính giá trị nhỏ nhất, lớn nhất và trung bình của chúng, sau đó in ra. Mỗi giá trị được in trên một dòng mới, và giá trị trung bình được định dạng với hai chữ số thập phân.",
    "expectedOutput": "1\n10\n5.50",
    "hints": [
      "Use built-in functions `min()`, `max()`, and `sum()`.",
      "Remember to handle the case of an empty list if necessary, or assume non-empty.",
      "Use an f-string or `.format()` for floating-point formatting."
    ],
    "starterCode": "numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n\ndef solve(numbers):\n    # Your code here\n    pass\n\nresult = solve(numbers)\nif result is not None:\n    print(result)",
    "solution": "numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n\ndef solve(numbers):\n    if not numbers:\n        print(\"No numbers provided.\")\n        return\n    minimum = min(numbers)\n    maximum = max(numbers)\n    average = sum(numbers) / len(numbers)\n    print(minimum)\n    print(maximum)\n    print(f\"{average:.2f}\")\n\nresult = solve(numbers)\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]",
        "expected": "1\n10\n5.50",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "list",
      "functions",
      "statistics"
    ]
  },
  {
    "id": "123",
    "number": 123,
    "title": "Lambda Map Filter",
    "titleVi": "Lambda Map Filter",
    "difficulty": "medium",
    "section": "Functions",
    "description": "Use `map` with a `lambda` to double every number in `numbers`. Then use `filter` with another `lambda` to keep only the doubled values that are divisible by 4. Print the sorted result.",
    "descriptionVi": "Dung `map` voi `lambda` de nhan doi moi so trong `numbers`. Sau do dung `filter` voi mot `lambda` khac de chi giu lai cac gia tri chia het cho 4. In ket qua da sap xep.",
    "expectedOutput": "[4, 8, 12, 16, 20]",
    "hints": [
      "`map()` applies a function to all items in an input list.",
      "`filter()` constructs an iterator from elements of an iterable for which a function returns true.",
      "A number is even if `x % 2 == 0`.",
      "Remember to convert the map/filter objects to lists before printing."
    ],
    "starterCode": "numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n\n# Your code here",
    "solution": "numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n\ndoubled = list(map(lambda x: x * 2, numbers))\ndivisible_by_four = list(filter(lambda x: x % 4 == 0, doubled))\nprint(sorted(divisible_by_four))",
    "testCases": [
      {
        "input": "[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]",
        "expected": "[4, 8, 12, 16, 20]",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "lambda",
      "map",
      "filter",
      "functional programming",
      "list"
    ]
  },
  {
    "id": "124",
    "number": 124,
    "title": "Calculator Menu",
    "titleVi": "Menu Máy tính",
    "difficulty": "easy",
    "section": "Menu Programs",
    "description": "Write a function `solve(num1, num2, op)` that simulates a simple calculator. It takes two numbers (`num1`, `num2`) and an operation string (`op`). Perform the specified operation ('+', '-', '*', '/') and print the result. For division, if `num2` is 0, print 'Error: Division by zero.'.",
    "descriptionVi": "Viết hàm `solve(num1, num2, op)` mô phỏng một máy tính đơn giản. Nó nhận hai số (`num1`, `num2`) và một chuỗi thao tác (`op`). Thực hiện thao tác được chỉ định ('+', '-', '*', '/') và in kết quả. Đối với phép chia, nếu `num2` là 0, in 'Error: Division by zero.'.",
    "expectedOutput": "5",
    "hints": [
      "Use if-elif-else statements to check the `op` string.",
      "Remember to handle the division by zero case explicitly."
    ],
    "starterCode": "num1 = 2\nnum2 = 3\nop = '+'\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "num1 = 2\nnum2 = 3\nop = '+'\n\ndef solve():\n    if op == '+':\n        print(num1 + num2)\n    elif op == '-':\n        print(num1 - num2)\n    elif op == '*':\n        print(num1 * num2)\n    elif op == '/':\n        if num2 == 0:\n            print('Error: Division by zero.')\n        else:\n            print(num1 / num2)\n    else:\n        print('Error: Invalid operator.')\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "2, 3, '+'",
        "expected": "5",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "menu",
      "conditional",
      "arithmetic"
    ]
  },
  {
    "id": "125",
    "number": 125,
    "title": "Unit Converter",
    "titleVi": "Bộ chuyển đổi đơn vị",
    "difficulty": "medium",
    "section": "Menu Programs",
    "description": "Write a function `solve(value, conversion_type)` that converts units. Supported `conversion_type`s are 'C_to_F' (Celsius to Fahrenheit), 'F_to_C' (Fahrenheit to Celsius), 'meters_to_feet', and 'feet_to_meters'. Print the converted value formatted to two decimal places. If `conversion_type` is invalid, print 'Error: Invalid conversion type.'.",
    "descriptionVi": "Viết hàm `solve(value, conversion_type)` để chuyển đổi đơn vị. Các `conversion_type` được hỗ trợ là 'C_to_F' (Celsius sang Fahrenheit), 'F_to_C' (Fahrenheit sang Celsius), 'meters_to_feet' và 'feet_to_meters'. In ra giá trị đã chuyển đổi được định dạng với hai chữ số thập phân. Nếu `conversion_type` không hợp lệ, in 'Error: Invalid conversion type.'.",
    "expectedOutput": "32.00",
    "hints": [
      "Formulas: C to F: (C * 9/5) + 32; F to C: (F - 32) * 5/9.",
      "Formulas: Meters to Feet: meters * 3.28084; Feet to Meters: feet / 3.28084.",
      "Use if-elif-else statements.",
      "Use an f-string or `.format()` for floating-point formatting."
    ],
    "starterCode": "value = 0\nconversion_type = 'C_to_F'\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "value = 0\nconversion_type = 'C_to_F'\n\ndef solve():\n    result = None\n    if conversion_type == 'C_to_F':\n        result = (value * 9/5) + 32\n    elif conversion_type == 'F_to_C':\n        result = (value - 32) * 5/9\n    elif conversion_type == 'meters_to_feet':\n        result = value * 3.28084\n    elif conversion_type == 'feet_to_meters':\n        result = value / 3.28084\n    else:\n        print('Error: Invalid conversion type.')\n        return\n\n    print(f\"{result:.2f}\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "0, 'C_to_F'",
        "expected": "32.00",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "menu",
      "conversion",
      "math"
    ]
  },
  {
    "id": "126",
    "number": 126,
    "title": "Quiz Game",
    "titleVi": "Trò chơi đố vui",
    "difficulty": "medium",
    "section": "Menu Programs",
    "description": "Write a function `solve(answers_list)` that simulates a simple quiz game. Assume there are 5 questions with correct answers: 'A', 'B', 'C', 'D', 'A'. The function takes a list of user's answers. Calculate and print the final score (number of correct answers).",
    "descriptionVi": "Viết hàm `solve(answers_list)` mô phỏng một trò chơi đố vui đơn giản. Giả sử có 5 câu hỏi với đáp án đúng là: 'A', 'B', 'C', 'D', 'A'. Hàm nhận vào một danh sách các câu trả lời của người dùng. Tính toán và in ra điểm cuối cùng (số câu trả lời đúng).",
    "expectedOutput": "4",
    "hints": [
      "Store the correct answers in a list.",
      "Iterate through the user's answers and compare them with the correct answers.",
      "Keep a counter for the score."
    ],
    "starterCode": "answers_list = ['A', 'B', 'X', 'D', 'A']\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "answers_list = ['A', 'B', 'X', 'D', 'A']\n\ndef solve():\n    correct_answers = ['A', 'B', 'C', 'D', 'A']\n    score = 0\n    for i in range(min(len(answers_list), len(correct_answers))):\n        if answers_list[i] == correct_answers[i]:\n            score += 1\n    print(score)\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "['A', 'B', 'X', 'D', 'A']",
        "expected": "4",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "menu",
      "list",
      "game",
      "conditional"
    ]
  },
  {
    "id": "127",
    "number": 127,
    "title": "Student Manager",
    "titleVi": "Quản lý sinh viên",
    "difficulty": "medium",
    "section": "Menu Programs",
    "description": "Simulate a basic student management system. The function `solve(action, students, name=None)` takes an `action` ('add', 'remove', 'list'), a list of `students` (strings), and an optional `name`. If 'add', add `name` to `students` and print the updated list. If 'remove', remove `name` from `students` and print the updated list. If 'list', print all `students`. If the student is not found for removal, or already exists for add, print an appropriate message. Each print for updated list or messages should be on a new line.",
    "descriptionVi": "Mô phỏng hệ thống quản lý sinh viên cơ bản. Hàm `solve(action, students, name=None)` nhận vào một `action` ('add', 'remove', 'list'), một danh sách `students` (chuỗi), và một `name` tùy chọn. Nếu là 'add', thêm `name` vào `students` và in ra danh sách cập nhật. Nếu là 'remove', xóa `name` khỏi `students` và in ra danh sách cập nhật. Nếu là 'list', in tất cả `students`. Nếu không tìm thấy sinh viên để xóa, hoặc sinh viên đã tồn tại khi thêm, in ra thông báo thích hợp. Mỗi lần in danh sách cập nhật hoặc thông báo phải trên một dòng mới.",
    "expectedOutput": "['Alice', 'Bob', 'Charlie']",
    "hints": [
      "Use `name in students` to check for existence.",
      "`students.append(name)` to add.",
      "`students.remove(name)` to remove. Handle `ValueError` if `name` not found during removal.",
      "Print the list directly for 'list' action."
    ],
    "starterCode": "action = 'add'\nstudents = ['Alice', 'Bob']\nname = 'Charlie'\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "action = 'add'\nstudents = ['Alice', 'Bob']\nname = 'Charlie'\n\ndef solve():\n    if action == 'add':\n        if name and name not in students:\n            students.append(name)\n            print(students)\n        elif name:\n            print(f\"Student {name} already exists.\")\n        else:\n            print(\"Please provide a name to add.\")\n    elif action == 'remove':\n        if name and name in students:\n            students.remove(name)\n            print(students)\n        elif name:\n            print(f\"Student {name} not found.\")\n        else:\n            print(\"Please provide a name to remove.\")\n    elif action == 'list':\n        print(students)\n    else:\n        print('Error: Invalid action.')\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "'add', ['Alice', 'Bob'], 'Charlie'",
        "expected": "['Alice', 'Bob', 'Charlie']",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "menu",
      "list",
      "data management"
    ]
  },
  {
    "id": "128",
    "number": 128,
    "title": "Inventory Manager",
    "titleVi": "Quản lý kho hàng",
    "difficulty": "medium",
    "section": "Menu Programs",
    "description": "Simulate a basic inventory management system. The function `solve(action, inventory, item=None, qty=None)` takes an `action` ('add', 'remove', 'list'), a dictionary `inventory` (item: quantity), and optional `item` and `qty`. If 'add', add `qty` to `item` (create if new). If 'remove', remove `qty` from `item` (remove item if qty <= 0, print error if not enough or item DNE). If 'list', print `inventory`. Print the updated `inventory` or appropriate messages. Each print for updated inventory or messages should be on a new line.",
    "descriptionVi": "Mô phỏng hệ thống quản lý kho hàng cơ bản. Hàm `solve(action, inventory, item=None, qty=None)` nhận vào một `action` ('add', 'remove', 'list'), một từ điển `inventory` (mặt hàng: số lượng), và `item`, `qty` tùy chọn. Nếu là 'add', thêm `qty` vào `item` (tạo mới nếu chưa có). Nếu là 'remove', xóa `qty` khỏi `item` (xóa mặt hàng nếu số lượng <= 0, in lỗi nếu không đủ hoặc mặt hàng không tồn tại). Nếu là 'list', in `inventory`. In ra `inventory` đã cập nhật hoặc thông báo thích hợp. Mỗi lần in kho hàng hoặc thông báo phải trên một dòng mới.",
    "expectedOutput": "{'apple': 15}",
    "hints": [
      "Use `inventory.get(item, 0)` for safe access.",
      "Be careful with dictionary key deletion if quantity drops to 0 or less.",
      "Print the dictionary directly for 'list' action."
    ],
    "starterCode": "action = 'add'\ninventory = {'apple': 10}\nitem = 'apple'\nqty = 5\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "action = 'add'\ninventory = {'apple': 10}\nitem = 'apple'\nqty = 5\n\ndef solve():\n    if action == 'add':\n        if item and isinstance(qty, int) and qty > 0:\n            inventory[item] = inventory.get(item, 0) + qty\n            print(inventory)\n        else:\n            print('Error: Invalid item or quantity for add.')\n    elif action == 'remove':\n        if item and isinstance(qty, int) and qty > 0:\n            if item in inventory:\n                if inventory[item] >= qty:\n                    inventory[item] -= qty\n                    if inventory[item] <= 0:\n                        del inventory[item]\n                    print(inventory)\n                else:\n                    print(f'Error: Not enough {item} in stock.')\n            else:\n                print(f'Error: {item} not found in inventory.')\n        else:\n            print('Error: Invalid item or quantity for remove.')\n    elif action == 'list':\n        print(inventory)\n    else:\n        print('Error: Invalid action.')\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "'add', {'apple': 10}, 'apple', 5",
        "expected": "{'apple': 15}",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "menu",
      "dictionary",
      "data management"
    ]
  },
  {
    "id": "129",
    "number": 129,
    "title": "Contact Book",
    "titleVi": "Sổ liên lạc",
    "difficulty": "medium",
    "section": "Menu Programs",
    "description": "Simulate a basic contact book. The function `solve(action, contacts, name=None, phone=None)` takes an `action` ('add', 'remove', 'view'), a dictionary `contacts` (name: phone), and optional `name` and `phone`. If 'add', add/update contact. If 'remove', remove contact. If 'view', print contact or 'Contact not found.' if it doesn't exist. If 'list_all', print all contacts. Print updated dictionary or messages. Each print for updated contacts or messages should be on a new line.",
    "descriptionVi": "Mô phỏng một sổ liên lạc cơ bản. Hàm `solve(action, contacts, name=None, phone=None)` nhận vào một `action` ('add', 'remove', 'view'), một từ điển `contacts` (tên: điện thoại), và `name`, `phone` tùy chọn. Nếu là 'add', thêm/cập nhật liên hệ. Nếu là 'remove', xóa liên hệ. Nếu là 'view', in thông tin liên hệ hoặc 'Contact not found.' nếu không tồn tại. Nếu là 'list_all', in tất cả các liên hệ. In từ điển đã cập nhật hoặc thông báo. Mỗi lần in sổ liên lạc hoặc thông báo phải trên một dòng mới.",
    "expectedOutput": "{'Alice': '123-456-7890', 'Bob': '444-555-6666'}",
    "hints": [
      "Use `contacts[name] = phone` for add/update.",
      "Use `del contacts[name]` for remove, handle `KeyError`.",
      "Use `contacts.get(name)` to safely view contact."
    ],
    "starterCode": "action = 'add'\ncontacts = {'Alice': '123-456-7890'}\nname = 'Bob'\nphone = '444-555-6666'\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "action = 'add'\ncontacts = {'Alice': '123-456-7890'}\nname = 'Bob'\nphone = '444-555-6666'\n\ndef solve():\n    if action == 'add':\n        if name and phone is not None:\n            contacts[name] = phone\n            print(contacts)\n        else:\n            print('Error: Name and phone are required for add.')\n    elif action == 'remove':\n        if name:\n            if name in contacts:\n                del contacts[name]\n                print(contacts)\n            else:\n                print(f'Contact {name} not found.')\n        else:\n            print('Error: Name is required for remove.')\n    elif action == 'view':\n        if name:\n            if name in contacts:\n                print(f'{name}: {contacts[name]}')\n            else:\n                print('Contact not found.')\n        else:\n            print('Error: Name is required for view.')\n    elif action == 'list_all':\n        if contacts:\n            sorted_contacts = dict(sorted(contacts.items()))\n            for k, v in sorted_contacts.items():\n                print(f'{k}: {v}')\n        else:\n            print('No contacts available.')\n    else:\n        print('Error: Invalid action.')\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "'add', {'Alice': '123-456-7890'}, 'Bob', '444-555-6666'",
        "expected": "{'Alice': '123-456-7890', 'Bob': '444-555-6666'}",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "menu",
      "dictionary",
      "data management"
    ]
  },
  {
    "id": "130",
    "number": 130,
    "title": "Banking System",
    "titleVi": "Hệ thống ngân hàng",
    "difficulty": "medium",
    "section": "Menu Programs",
    "description": "Simulate a basic banking system. The function `solve(action, balance, amount=0)` takes an `action` ('deposit', 'withdraw', 'check_balance'), current `balance`, and an optional `amount`. If 'deposit', add `amount` to `balance`. If 'withdraw', subtract `amount` from `balance`, ensuring `balance` doesn't go negative. If 'check_balance', print current `balance`. Print updated `balance` or appropriate error messages. Amounts must be positive. Prints on new lines.\n\nThe variables are already set at the top of the editor - print the result directly.",
    "descriptionVi": "Mô phỏng hệ thống ngân hàng cơ bản. Hàm `solve(action, balance, amount=0)` nhận vào một `action` ('deposit', 'withdraw', 'check_balance'), `balance` hiện tại, và một `amount` tùy chọn. Nếu là 'deposit', thêm `amount` vào `balance`. Nếu là 'withdraw', trừ `amount` khỏi `balance`, đảm bảo `balance` không âm. Nếu là 'check_balance', in `balance` hiện tại. In `balance` đã cập nhật hoặc thông báo lỗi thích hợp. Số tiền phải dương. In trên dòng mới.\n\nCác biến đã được khai báo sẵn ở đầu editor - hãy in kết quả trực tiếp.",
    "expectedOutput": "150",
    "hints": [
      "Use if-elif-else statements.",
      "Check `amount > 0` for both deposit and withdraw.",
      "Check `balance >= amount` for withdrawal."
    ],
    "starterCode": "action = 'deposit'\nbalance = 100\namount = 50\n\n# Your code here",
    "solution": "action = 'deposit'\nbalance = 100\namount = 50\n\nif action == 'deposit':\n    if amount > 0:\n        balance += amount\n        print(balance)\n    else:\n        print('Error: Deposit amount must be positive.')\nelif action == 'withdraw':\n    if amount > 0:\n        if balance >= amount:\n            balance -= amount\n            print(balance)\n        else:\n            print('Error: Insufficient funds.')\n    else:\n        print('Error: Withdrawal amount must be positive.')\nelif action == 'check_balance':\n    print(balance)\nelse:\n    print('Error: Invalid action.')",
    "testCases": [
      {
        "input": "'deposit', 100, 50",
        "expected": "150",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "menu",
      "conditional",
      "financial"
    ]
  },
  {
    "id": "131",
    "number": 131,
    "title": "Todo List",
    "titleVi": "Danh sách việc cần làm",
    "difficulty": "medium",
    "section": "Menu Programs",
    "description": "Simulate a todo list. The function `solve(action, todos, task=None)` takes an `action` ('add', 'complete', 'list'), a list `todos` (strings), and an optional `task`. If 'add', add `task` to `todos`. If 'complete', remove `task` from `todos`. If 'list', print all `todos`. Print updated list or appropriate messages. Each print for updated list or messages should be on a new line.",
    "descriptionVi": "Mô phỏng một danh sách việc cần làm. Hàm `solve(action, todos, task=None)` nhận vào một `action` ('add', 'complete', 'list'), một danh sách `todos` (chuỗi), và `task` tùy chọn. Nếu là 'add', thêm `task` vào `todos`. Nếu là 'complete', xóa `task` khỏi `todos`. Nếu là 'list', in tất cả `todos`. In danh sách đã cập nhật hoặc thông báo thích hợp. Mỗi lần in danh sách hoặc thông báo phải trên một dòng mới.",
    "expectedOutput": "['Buy groceries', 'Pay bills']",
    "hints": [
      "Use `todos.append(task)` for 'add'.",
      "Use `todos.remove(task)` for 'complete', handle `ValueError` if task not found.",
      "Print the list directly for 'list'."
    ],
    "starterCode": "action = 'add'\ntodos = ['Buy groceries']\ntask = 'Pay bills'\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "action = 'add'\ntodos = ['Buy groceries']\ntask = 'Pay bills'\n\ndef solve():\n    if action == 'add':\n        if task:\n            todos.append(task)\n            print(todos)\n        else:\n            print('Error: Task cannot be empty.')\n    elif action == 'complete':\n        if task:\n            if task in todos:\n                todos.remove(task)\n                print(todos)\n            else:\n                print(f\"Task '{task}' not found.\")\n        else:\n            print('Error: Task cannot be empty.')\n    elif action == 'list':\n        if todos:\n            for t in todos:\n                print(t)\n        else:\n            print('No tasks in the todo list.')\n    else:\n        print('Error: Invalid action.')\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "'add', ['Buy groceries'], 'Pay bills'",
        "expected": "['Buy groceries', 'Pay bills']",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "menu",
      "list",
      "management"
    ]
  },
  {
    "id": "132",
    "number": 132,
    "title": "Text Adventure Game",
    "titleVi": "Trò chơi phiêu lưu văn bản",
    "difficulty": "hard",
    "section": "Menu Programs",
    "description": "Simulate a simple text adventure game. The function `solve(choices)` takes a list of choices (strings like 'go north', 'take key'). Based on these choices, navigate through a predefined set of rooms and interactions. Print messages indicating current location and actions. Start in 'start_room'.\n\n**Rooms and interactions:**\n- `start_room`: 'You are in a dimly lit room. There's a door to the north.'\n- `north_room`: 'You are in a bright hall. There is a shiny key on a pedestal. Exits: south.' (if 'take key' is chosen here, print 'You took the key.' and the user now 'has_key')\n- `south_room`: 'You are in a dark cavern. Exits: north. There is a locked chest.' (if 'use key' is chosen here and `has_key` is true, print 'You unlocked the chest! You win!' and exit, else 'The chest is locked.')\n- Invalid choice: 'Invalid action.'\n\nPrint the final status/message for each choice. Separate messages with a newline.\n\nThe variables are already set at the top of the editor - print the result directly.",
    "descriptionVi": "Mô phỏng một trò chơi phiêu lưu văn bản đơn giản. Hàm `solve(choices)` nhận vào một danh sách các lựa chọn (chuỗi như 'go north', 'take key'). Dựa trên các lựa chọn này, điều hướng qua một tập hợp các phòng và tương tác được định nghĩa trước. In các thông báo cho biết vị trí hiện tại và các hành động. Bắt đầu từ 'start_room'.\n\n**Các phòng và tương tác:**\n- `start_room`: 'Bạn đang ở trong một căn phòng thiếu ánh sáng. Có một cánh cửa phía bắc.'\n- `north_room`: 'Bạn đang ở trong một hành lang sáng sủa. Có một chiếc chìa khóa sáng bóng trên bệ. Lối ra: phía nam.' (nếu chọn 'take key' ở đây, in 'Bạn đã lấy chìa khóa.' và người dùng bây giờ 'has_key')\n- `south_room`: 'Bạn đang ở trong một hang động tối tăm. Lối ra: phía bắc. Có một cái rương bị khóa.' (nếu chọn 'use key' ở đây và `has_key` là đúng, in 'Bạn đã mở khóa rương! Bạn thắng!' và thoát, nếu không thì 'Rương bị khóa.')\n- Lựa chọn không hợp lệ: 'Hành động không hợp lệ.'\n\nIn trạng thái/thông báo cuối cùng cho mỗi lựa chọn. Tách các thông báo bằng một dòng mới.\n\nCác biến đã được khai báo sẵn ở đầu editor - hãy in kết quả trực tiếp.",
    "expectedOutput": "You are in a bright hall. There is a shiny key on a pedestal. Exits: south.\nYou took the key.\nYou are in a dimly lit room. There's a door to the north.\nYou are in a dark cavern. Exits: north. There is a locked chest.\nYou unlocked the chest! You win!",
    "hints": [
      "Maintain `current_room` and `has_key` variables.",
      "Use if-elif-else for navigation and action handling.",
      "Print initial room description."
    ],
    "starterCode": "choices = ['go north', 'take key', 'go south', 'go south', 'use key']\n\n# Your code here",
    "solution": "choices = ['go north', 'take key', 'go south', 'go south', 'use key']\n\ncurrent_room = 'start_room'\nhas_key = False\n\nfor choice in choices:\n    if current_room == 'start_room':\n        if choice == 'go north':\n            current_room = 'north_room'\n            print(\"You are in a bright hall. There is a shiny key on a pedestal. Exits: south.\")\n        elif choice == 'go south':\n            current_room = 'south_room'\n            print(\"You are in a dark cavern. Exits: north. There is a locked chest.\")\n        else:\n            print('Invalid action.')\n    elif current_room == 'north_room':\n        if choice == 'take key':\n            has_key = True\n            print(\"You took the key.\")\n        elif choice == 'go south':\n            current_room = 'start_room'\n            print(\"You are in a dimly lit room. There's a door to the north.\")\n        else:\n            print('Invalid action.')\n    elif current_room == 'south_room':\n        if choice == 'use key':\n            if has_key:\n                print(\"You unlocked the chest! You win!\")\n                break\n            print(\"The chest is locked.\")\n        elif choice == 'go north':\n            current_room = 'start_room'\n            print(\"You are in a dimly lit room. There's a door to the north.\")\n        else:\n            print('Invalid action.')",
    "testCases": [
      {
        "input": "['go north', 'take key', 'go south', 'go south', 'use key']",
        "expected": "You are in a bright hall. There is a shiny key on a pedestal. Exits: south.\nYou took the key.\nYou are in a dimly lit room. There's a door to the north.\nYou are in a dark cavern. Exits: north. There is a locked chest.\nYou unlocked the chest! You win!",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "menu",
      "game",
      "state machine",
      "conditional"
    ]
  },
  {
    "id": "133",
    "number": 133,
    "title": "Hangman Game",
    "titleVi": "Trò chơi Hangman",
    "difficulty": "hard",
    "section": "Complex Programs",
    "description": "Implement a simplified Hangman game. The function `solve(word, guesses)` takes a secret `word` (string) and a list of `guesses` (characters). For each guess, update the displayed word (e.g., '_ _ _ _' becomes 'a _ _ _' if 'a' is guessed for 'apple'). Keep track of incorrect guesses. The game ends when the word is guessed or a maximum of 6 incorrect guesses are made. Print the current state after each guess. State format: `Displayed word: <word_state>, Incorrect guesses: <count>/6, Guessed letters: <sorted_letters>`. If the game ends, print 'You win!' or 'You lose! The word was: <word>'.",
    "descriptionVi": "Triển khai một trò chơi Hangman đơn giản hóa. Hàm `solve(word, guesses)` nhận một `word` bí mật (chuỗi) và một danh sách `guesses` (ký tự). Với mỗi lần đoán, cập nhật từ được hiển thị (ví dụ: '_ _ _ _' thành 'a _ _ _' nếu đoán 'a' cho 'apple'). Theo dõi số lần đoán sai. Trò chơi kết thúc khi từ được đoán hoặc tối đa 6 lần đoán sai được thực hiện. In trạng thái hiện tại sau mỗi lần đoán. Định dạng trạng thái: `Displayed word: <từ_trạng_thái>, Incorrect guesses: <số_đếm>/6, Guessed letters: <ký_tự_đã_đoán_được_sắp_xếp>`. Nếu trò chơi kết thúc, in 'You win!' hoặc 'You lose! The word was: <word>'.",
    "expectedOutput": "Displayed word: a _ _ _ _, Incorrect guesses: 0/6, Guessed letters: ['a']\nDisplayed word: a p p _ _, Incorrect guesses: 0/6, Guessed letters: ['a', 'p']\nDisplayed word: a p p l _, Incorrect guesses: 0/6, Guessed letters: ['a', 'l', 'p']\nDisplayed word: a p p l e, Incorrect guesses: 0/6, Guessed letters: ['a', 'e', 'l', 'p']\nYou win!",
    "hints": [
      "Initialize `display_word` as underscores.",
      "Maintain `incorrect_guesses_count` and `guessed_letters` set.",
      "Iterate through `guesses`, and update state.",
      "Check win/loss conditions after each guess.",
      "Use `sorted(list(guessed_letters))` for printing guessed letters."
    ],
    "starterCode": "word = 'apple'\nguesses = ['a', 'p', 'l', 'e']\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "word = 'apple'\nguesses = ['a', 'p', 'l', 'e']\n\ndef solve():\n    word_letters = set(word)\n    guessed_letters = set()\n    incorrect_guesses_count = 0\n    max_incorrect_guesses = 6\n\n    def get_display_word():\n        return ' '.join([char if char in guessed_letters else '_' for char in word])\n\n    game_over = False\n\n    for guess in guesses:\n        if game_over:\n            break # Stop processing if game is already over\n\n        if guess in guessed_letters:\n            # Already guessed, do nothing or print a message indicating it\n            # For this problem, we just update the state if it was a correct or incorrect repetitive guess.\n            # We'll just continue and report the current state.\n            pass # No additional penalty for re-guessing correctly\n\n        guessed_letters.add(guess)\n\n        if guess not in word_letters:\n            incorrect_guesses_count += 1\n\n        current_display_word_state = get_display_word()\n        print(f\"Displayed word: {current_display_word_state}, Incorrect guesses: {incorrect_guesses_count}/{max_incorrect_guesses}, Guessed letters: {sorted(list(guessed_letters))}\")\n\n        if '_' not in current_display_word_state:\n            print(\"You win!\")\n            game_over = True\n        elif incorrect_guesses_count >= max_incorrect_guesses:\n            print(f\"You lose! The word was: {word}\")\n            game_over = True\n\n    if not game_over and '_' not in get_display_word():\n        print(\"You win!\")\n    elif not game_over and incorrect_guesses_count >= max_incorrect_guesses:\n        print(f\"You lose! The word was: {word}\")\n    # If the loop finishes and game_over is not set, means neither win nor lose yet\n    # In a real game, this would typically indicate an ongoing game, but for this problem\n    # we assume all necessary guesses for a conclusion are provided or it ends implicitly.\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "'apple', ['a', 'p', 'l', 'e']",
        "expected": "Displayed word: a _ _ _ _, Incorrect guesses: 0/6, Guessed letters: ['a']\nDisplayed word: a p p _ _, Incorrect guesses: 0/6, Guessed letters: ['a', 'p']\nDisplayed word: a p p l _, Incorrect guesses: 0/6, Guessed letters: ['a', 'l', 'p']\nDisplayed word: a p p l e, Incorrect guesses: 0/6, Guessed letters: ['a', 'e', 'l', 'p']\nYou win!",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "game",
      "string manipulation",
      "loops",
      "conditional"
    ]
  },
  {
    "id": "134",
    "number": 134,
    "title": "Base Converter",
    "titleVi": "Bộ chuyển đổi cơ số",
    "difficulty": "hard",
    "section": "Complex Programs",
    "description": "Write code that converts a non-negative decimal `number` to a string representation in the specified `base` (between 2 and 16). For bases greater than 10, use 'A' for 10, 'B' for 11, ..., 'F' for 15. The result should be a string.\n\nThe variables are already set at the top of the editor - print the result directly.",
    "descriptionVi": "Viết code để chuyển đổi một số thập phân `number` không âm thành biểu diễn chuỗi trong cơ số `base` được chỉ định (từ 2 đến 16). Đối với các cơ số lớn hơn 10, sử dụng 'A' cho 10, 'B' cho 11, ..., 'F' cho 15. Kết quả phải là một chuỗi.\n\nCác biến đã được khai báo sẵn ở đầu editor - hãy in kết quả trực tiếp.",
    "expectedOutput": "1001",
    "hints": [
      "Use the division and remainder method.",
      "Build the result string in reverse order.",
      "Create a lookup string for digits '0123456789ABCDEF'."
    ],
    "starterCode": "number = 9\nbase = 2\n\ndef to_base(number, base):\n    # Your code here\n    pass\n\nprint(to_base(number, base))",
    "solution": "number = 9\nbase = 2\n\ndef to_base(number, base):\n    if not 2 <= base <= 16:\n        return 'Error: Base must be between 2 and 16.'\n    if number == 0:\n        return '0'\n    digits = '0123456789ABCDEF'\n    result = ''\n    while number > 0:\n        result = digits[number % base] + result\n        number //= base\n    return result\n\nprint(to_base(number, base))",
    "testCases": [
      {
        "input": "9, 2",
        "expected": "1001",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "conversion",
      "math",
      "algorithms",
      "string manipulation"
    ]
  },
  {
    "id": "135",
    "number": 135,
    "title": "Caesar Cipher",
    "titleVi": "Mã Caesar",
    "difficulty": "hard",
    "section": "Complex Programs",
    "description": "Implement the Caesar Cipher. The function `solve(text, shift, mode)` takes a `text` (string), an integer `shift`, and a `mode` ('encrypt' or 'decrypt'). It should only apply the cipher to alphabetic characters (A-Z, a-z), leaving other characters unchanged. Case should be preserved. Print the resulting string.",
    "descriptionVi": "Triển khai Mã Caesar. Hàm `solve(text, shift, mode)` nhận một `text` (chuỗi), một số nguyên `shift`, và một `mode` ('encrypt' hoặc 'decrypt'). Hàm chỉ áp dụng mã hóa cho các ký tự chữ cái (A-Z, a-z), giữ nguyên các ký tự khác. Phân biệt chữ hoa/thường phải được bảo toàn. In ra chuỗi kết quả.",
    "expectedOutput": "Khoor Zruog!",
    "hints": [
      "Use `ord()` and `chr()` to convert between characters and ASCII values.",
      "Handle uppercase and lowercase letters separately by checking their ASCII ranges.",
      "For encryption, `(char_code - base_code + shift) % 26 + base_code`.",
      "For decryption, `(char_code - base_code - shift) % 26 + base_code` (Python's % handles negative results correctly for positive modulo).",
      "Constants: `ord('a')`, `ord('A')`."
    ],
    "starterCode": "text = 'Hello World!'\nshift = 3\nmode = 'encrypt'\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "text = 'Hello World!'\nshift = 3\nmode = 'encrypt'\n\ndef solve():\n    result = []\n    for char in text:\n        if 'a' <= char <= 'z':\n            base = ord('a')\n            char_code = ord(char)\n            if mode == 'encrypt':\n                shifted_code = (char_code - base + shift) % 26 + base\n            elif mode == 'decrypt':\n                shifted_code = (char_code - base - shift) % 26 + base\n            result.append(chr(shifted_code))\n        elif 'A' <= char <= 'Z':\n            base = ord('A')\n            char_code = ord(char)\n            if mode == 'encrypt':\n                shifted_code = (char_code - base + shift) % 26 + base\n            elif mode == 'decrypt':\n                shifted_code = (char_code - base - shift) % 26 + base\n            result.append(chr(shifted_code))\n        else:\n            result.append(char)\n\n    print(\"\".join(result))\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "'Hello World!', 3, 'encrypt'",
        "expected": "Khoor Zruog!",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "cryptography",
      "string manipulation",
      "algorithms",
      "conditional"
    ]
  },
  {
    "id": "136",
    "number": 136,
    "title": "Statistics Calculator",
    "titleVi": "Máy tính thống kê",
    "difficulty": "hard",
    "section": "Complex Programs",
    "description": "Write a Python function `solve(numbers)` that takes a list of numbers as input. The function should calculate and print the mean, median, mode, and standard deviation of these numbers. Use `print()` for the output. The mean, median, and standard deviation should be rounded to two decimal places. If there are multiple modes, print all of them, separated by commas and sorted in ascending order. If there is no unique mode (e.g., all numbers appear once), print 'No mode'.",
    "descriptionVi": "Viết một hàm Python `solve(numbers)` nhận vào một danh sách các số. Hàm này nên tính toán và in ra giá trị trung bình, trung vị, mode và độ lệch chuẩn của các số này. Sử dụng `print()` để xuất kết quả. Giá trị trung bình, trung vị và độ lệch chuẩn nên được làm tròn đến hai chữ số thập phân. Nếu có nhiều mode, hãy in tất cả chúng, cách nhau bằng dấu phẩy và được sắp xếp theo thứ tự tăng dần. Nếu không có mode duy nhất (ví dụ: tất cả các số xuất hiện một lần), hãy in 'No mode'.",
    "expectedOutput": "Mean: 3.00\nMedian: 3.00\nMode: No mode\nStandard Deviation: 1.58",
    "hints": [
      "You can use `statistics` module for some calculations, but consider implementing them manually for practice.",
      "For mode, count frequencies of each number.",
      "Standard deviation requires calculating variance first.",
      "Handle edge cases like empty lists or lists with single elements gracefully (though test cases might not cover this deeply)."
    ],
    "starterCode": "import math\nfrom collections import Counter\n\nnumbers = [1, 2, 3, 4, 5]\n\ndef solve(numbers):\n    # Your code here\n    pass\n\nresult = solve(numbers)\nif result is not None:\n    print(result)",
    "solution": "import math\nfrom collections import Counter\n\nnumbers = [1, 2, 3, 4, 5]\n\ndef solve(numbers):\n    if not numbers:\n        print(\"Mean: N/A\")\n        print(\"Median: N/A\")\n        print(\"Mode: N/A\")\n        print(\"Standard Deviation: N/A\")\n        return\n\n    # Mean\n    mean = sum(numbers) / len(numbers)\n\n    # Median\n    sorted_numbers = sorted(numbers)\n    n = len(sorted_numbers)\n    if n % 2 == 1:\n        median = sorted_numbers[n // 2]\n    else:\n        median = (sorted_numbers[n // 2 - 1] + sorted_numbers[n // 2]) / 2\n\n    # Mode\n    counts = Counter(numbers)\n    max_freq = 0\n    if counts:\n        max_freq = max(counts.values())\n    \n    modes = [num for num, freq in counts.items() if freq == max_freq]\n    modes.sort()\n    \n    if max_freq == 1 and len(modes) == len(numbers):\n        mode_str = 'No mode'\n    elif modes:\n        mode_str = \", \".join(map(str, modes))\n    else:\n        mode_str = 'N/A'\n\n    # Standard Deviation (sample standard deviation)\n    if n < 2:\n        std_dev = 0.0 # Standard deviation is undefined for n < 2, but we'll return 0.0 for simplicity\n    else:\n        variance = sum([(x - mean) ** 2 for x in numbers]) / (n - 1)\n        std_dev = math.sqrt(variance)\n\n    print(f\"Mean: {mean:.2f}\")\n    print(f\"Median: {median:.2f}\")\n    print(f\"Mode: {mode_str}\")\n    print(f\"Standard Deviation: {std_dev:.2f}\")\n\nresult = solve(numbers)\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "[1, 2, 3, 4, 5]",
        "expected": "Mean: 3.00\nMedian: 3.00\nMode: No mode\nStandard Deviation: 1.58",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "statistics",
      "list",
      "math",
      "data analysis"
    ]
  },
  {
    "id": "137",
    "number": 137,
    "title": "Calendar Display",
    "titleVi": "Hiển thị lịch",
    "difficulty": "hard",
    "section": "Complex Programs",
    "description": "Write code that takes an integer `month` (1-12) and an integer `year` as input. The function should print a calendar for that specific month and year. The calendar should start on Sunday and clearly display the days of the week and dates. Use `print()` statements for output. Ensure correct handling of leap years and variable month lengths. The calendar should be formatted nicely, similar to standard calendar output.\n\nExample for January 2024:\n\n```\n   January 2024\nSu Mo Tu We Th Fr Sa\n    1  2  3  4  5  6\n 7  8  9 10 11 12 13\n14 15 16 17 18 19 20\n21 22 23 24 25 26 27\n28 29 30 31\n```\n\nThe variables are already set at the top of the editor - print the result directly.",
    "descriptionVi": "Viết code để nhận vào một số nguyên `month` (1-12) và một số nguyên `year`. Hàm này nên in ra lịch cho tháng và năm cụ thể đó. Lịch phải bắt đầu vào Chủ Nhật và hiển thị rõ ràng các ngày trong tuần và ngày. Sử dụng các câu lệnh `print()` để xuất. Đảm bảo xử lý đúng năm nhuận và độ dài tháng khác nhau. Lịch phải được định dạng đẹp mắt, tương tự như đầu ra lịch tiêu chuẩn.\n\nVí dụ cho Tháng 1 năm 2024:\n\n```\n   January 2024\nSu Mo Tu We Th Fr Sa\n    1  2  3  4  5  6\n 7  8  9 10 11 12 13\n14 15 16 17 18 19 20\n21 22 23 24 25 26 27\n28 29 30 31\n```\n\nCác biến đã được khai báo sẵn ở đầu editor - hãy in kết quả trực tiếp.",
    "expectedOutput": "   January 2024\nSu Mo Tu We Th Fr Sa\n    1  2  3  4  5  6\n 7  8  9 10 11 12 13\n14 15 16 17 18 19 20\n21 22 23 24 25 26 27\n28 29 30 31",
    "hints": [
      "You can use the `calendar` module in Python for this. Specifically `calendar.Calendar` and its `monthdays2calendar` or `monthcalendar` methods are very useful.",
      "The `monthrange` function from `calendar` can give you the weekday of the first day and the number of days in the month.",
      "Remember to adjust the weekday index if your calendar starts on Sunday (Python's `weekday` usually starts Monday=0)."
    ],
    "starterCode": "import calendar\n\nmonth = 1\nyear = 2024\n\n# Your code here",
    "solution": "import calendar\n\nmonth = 1\nyear = 2024\n\ncal = calendar.Calendar(firstweekday=6)  # weeks start on Sunday\n\nprint(f\"   {calendar.month_name[month]} {year}\")\nprint(\"Su Mo Tu We Th Fr Sa\")\n\nfor week in cal.monthdayscalendar(year, month):\n    line = \"\"\n    for day in week:\n        line += \"   \" if day == 0 else f\"{day:2d} \"\n    print(line.rstrip())",
    "testCases": [
      {
        "input": "1, 2024",
        "expected": "   January 2024\nSu Mo Tu We Th Fr Sa\n    1  2  3  4  5  6\n 7  8  9 10 11 12 13\n14 15 16 17 18 19 20\n21 22 23 24 25 26 27\n28 29 30 31",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "date",
      "time",
      "calendar",
      "display",
      "complex"
    ]
  },
  {
    "id": "138",
    "number": 138,
    "title": "Pattern Search",
    "titleVi": "Tìm kiếm mẫu",
    "difficulty": "hard",
    "section": "Complex Programs",
    "description": "Write a Python function `solve(text, pattern)` that takes two strings, `text` and `pattern`, as input. The function should find all non-overlapping occurrences of the `pattern` within the `text` and print their starting indices. The output should be a comma-separated string of indices, sorted in ascending order. If no occurrences are found, print 'No matches'. Perform a case-sensitive search.",
    "descriptionVi": "Viết một hàm Python `solve(text, pattern)` nhận vào hai chuỗi, `text` và `pattern`. Hàm này nên tìm tất cả các lần xuất hiện không trùng lặp của `pattern` trong `text` và in ra các chỉ số bắt đầu của chúng. Đầu ra phải là một chuỗi các chỉ số được phân tách bằng dấu phẩy, được sắp xếp theo thứ tự tăng dần. Nếu không tìm thấy lần xuất hiện nào, hãy in 'No matches'. Thực hiện tìm kiếm phân biệt chữ hoa chữ thường.",
    "expectedOutput": "1",
    "hints": [
      "You can use a loop and string slicing or `str.find()` method.",
      "Remember to start the next search *after* the end of the found pattern to ensure non-overlapping occurrences.",
      "`str.find(substring, start_index)` is useful for this."
    ],
    "starterCode": "text = \"banana\"\npattern = \"ana\"\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "text = \"banana\"\npattern = \"ana\"\n\ndef solve():\n    if not pattern:\n        # As per typical string search, an empty pattern is often found at index 0.\n        # However, for non-overlapping, it becomes tricky. For this problem, we assume non-empty pattern.\n        # If strict non-overlapping of empty string means it only appears at position 0, then:\n        # if not text: print(\"0\") else: print(\"No matches\") or special handling.\n        # Let's clarify: an empty pattern cannot 'occupy' space, making 'non-overlapping' difficult to define meaningfully.\n        # Sticking to non-empty patterns for this challenge to avoid ambiguity of 'len(pattern)' logic.\n        print(\"No matches\") \n        return\n\n    indices = []\n    start = 0\n    while True:\n        idx = text.find(pattern, start)\n        if idx == -1:\n            break\n        indices.append(idx)\n        start = idx + len(pattern) # Shift start past the found pattern to ensure non-overlapping\n\n    if not indices:\n        print(\"No matches\")\n    else:\n        print(\", \".join(map(str, indices)))\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "\"banana\", \"ana\"",
        "expected": "1",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "string",
      "search",
      "algorithm",
      "substring"
    ]
  },
  {
    "id": "139",
    "number": 139,
    "title": "CRUD Records",
    "titleVi": "Quản lý bản ghi CRUD",
    "difficulty": "medium",
    "section": "Data Management",
    "description": "Write a Python function `solve(action, records, record=None)` that simulates basic CRUD (Create, Read, Update, Delete) operations on a list of `records`. Each record is a dictionary with at least an 'id' key. The function should print relevant information for each action. `records` is passed by value (a copy), so modifications will be local unless explicitly returned/passed. For this problem, modify the list in place and reflect changes in output.\n\n-   `action`: 'create', 'read', 'update', 'delete'\n-   `records`: A list of student dictionaries, e.g., `[{'id': 1, 'name': 'Alice'}, {'id': 2, 'name': 'Bob'}]`\n-   `record`: For 'create' and 'update', this is the dictionary to add/modify. For 'read' and 'delete', it expects a record with just an 'id' for lookup (`{'id': 1}`).\n\nOutput requirements:\n-   'create': Add `record` to `records`. Print 'Record created. Current records: [updated_records]'\n-   'read': Find record by 'id'. Print 'Record found: {record}' or 'Record not found.'\n-   'update': Find record by 'id', update its fields with `record`'s fields. Print 'Record updated. Current records: [updated_records]' or 'Record not found.'\n-   'delete': Find record by 'id' and remove it. Print 'Record deleted. Current records: [updated_records]' or 'Record not found.'\n\nPrint lists of records as `str(records)`.",
    "descriptionVi": "Viết một hàm Python `solve(action, records, record=None)` mô phỏng các thao tác CRUD cơ bản (Tạo, Đọc, Cập nhật, Xóa) trên một danh sách `records`. Mỗi bản ghi là một từ điển có ít nhất một khóa 'id'. Hàm này nên in thông tin liên quan cho mỗi hành động. `records` được truyền theo giá trị (một bản sao), vì vậy các sửa đổi sẽ là cục bộ trừ khi được trả về/truyền rõ ràng. Đối với bài toán này, hãy sửa đổi danh sách tại chỗ và phản ánh các thay đổi trong đầu ra.\n\n-   `action`: 'create', 'read', 'update', 'delete'\n-   `records`: Một danh sách các từ điển sinh viên, ví dụ: `[{'id': 1, 'name': 'Alice'}, {'id': 2, 'name': 'Bob'}]`\n-   `record`: Đối với 'create' và 'update', đây là từ điển để thêm/sửa đổi. Đối với 'read' và 'delete', nó mong đợi một bản ghi chỉ với 'id' để tra cứu (`{'id': 1}`).\n\nYêu cầu đầu ra:\n-   'create': Thêm `record` vào `records`. In 'Record created. Current records: [updated_records]'\n-   'read': Tìm bản ghi theo 'id'. In 'Record found: {record}' hoặc 'Record not found.'\n-   'update': Tìm bản ghi theo 'id', cập nhật các trường của nó bằng các trường của `record`. In 'Record updated. Current records: [updated_records]' hoặc 'Record not found.'\n-   'delete': Tìm bản ghi theo 'id' và xóa nó. In 'Record deleted. Current records: [updated_records]' hoặc 'Record not found.'\n\nIn danh sách các bản ghi dưới dạng `str(records)`.",
    "expectedOutput": "Record created. Current records: [{'id': 2, 'name': 'Bob'}, {'id': 1, 'name': 'Alice', 'age': 20}]",
    "hints": [
      "Iterate through the `records` list to find the record by 'id'.",
      "For 'update', use `dict.update()` to merge new fields into the existing record.",
      "Be careful with modifying a list while iterating over it (e.g., for 'delete'). Using a new list or iterating in reverse can help, or safely removing by index."
    ],
    "starterCode": "action = 'create'\nrecords = [{'id': 2, 'name': 'Bob'}]\nrecord = {'id': 1, 'name': 'Alice', 'age': 20}\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "action = 'create'\nrecords = [{'id': 2, 'name': 'Bob'}]\nrecord = {'id': 1, 'name': 'Alice', 'age': 20}\n\ndef solve():\n    # The records list is modified in place.\n\n    if action == 'create':\n        records.append(record)\n        print(f\"Record created. Current records: {records}\")\n    elif action == 'read':\n        found_record = None\n        for r_item in records:\n            if r_item.get('id') == record.get('id'):\n                found_record = r_item\n                break\n        if found_record:\n            print(f\"Record found: {found_record}\")\n        else:\n            print(\"Record not found.\")\n    elif action == 'update':\n        found_index = -1\n        for i, r_item in enumerate(records):\n            if r_item.get('id') == record.get('id'):\n                found_index = i\n                break\n\n        if found_index != -1:\n            records[found_index].update(record)\n            print(f\"Record updated. Current records: {records}\")\n        else:\n            print(\"Record not found.\")\n    elif action == 'delete':\n        found_index = -1\n        for i, r_item in enumerate(records):\n            if r_item.get('id') == record.get('id'):\n                found_index = i\n                break\n\n        if found_index != -1:\n            del records[found_index]\n            print(f\"Record deleted. Current records: {records}\")\n        else:\n            print(\"Record not found.\")\n    else:\n        print(\"Invalid action.\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "'create', [{'id': 2, 'name': 'Bob'}], {'id': 1, 'name': 'Alice', 'age': 20}",
        "expected": "Record created. Current records: [{'id': 2, 'name': 'Bob'}, {'id': 1, 'name': 'Alice', 'age': 20}]",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "data management",
      "CRUD",
      "list",
      "dictionary"
    ]
  },
  {
    "id": "140",
    "number": 140,
    "title": "Search Filter",
    "titleVi": "Bộ lọc tìm kiếm",
    "difficulty": "easy",
    "section": "Data Management",
    "description": "Write a Python function `solve(records, field, value)` that takes a list of dictionaries (`records`), a `field` name (string), and a `value` as input. The function should filter the `records` and print only those dictionaries where the specified `field` matches the given `value`. The matches should be exact and case-sensitive. Print the list of filtered dictionaries using `print()`. If no records match, print an empty list `[]`.",
    "descriptionVi": "Viết một hàm Python `solve(records, field, value)` nhận vào một danh sách các từ điển (`records`), tên `field` (chuỗi) và một `value`. Hàm này nên lọc `records` và chỉ in ra những từ điển mà `field` được chỉ định khớp với `value` đã cho. Các kết quả khớp phải chính xác và phân biệt chữ hoa chữ thường. In danh sách các từ điển đã lọc bằng `print()`. Nếu không có bản ghi nào khớp, hãy in một danh sách trống `[]`.",
    "expectedOutput": "[{'id': 1, 'name': 'Alice', 'age': 30}]",
    "hints": [
      "Use a list comprehension or a loop to iterate through the records and apply the filter condition.",
      "Access dictionary values using `record.get(field)` or `record[field]` (if you're sure the field always exists)."
    ],
    "starterCode": "records = [{'id': 1, 'name': 'Alice', 'age': 30}, {'id': 2, 'name': 'Bob', 'age': 25}]\nfield = 'name'\nvalue = 'Alice'\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "records = [{'id': 1, 'name': 'Alice', 'age': 30}, {'id': 2, 'name': 'Bob', 'age': 25}]\nfield = 'name'\nvalue = 'Alice'\n\ndef solve():\n    filtered_records = []\n    for record in records:\n        if field in record and record[field] == value:\n            filtered_records.append(record)\n    print(filtered_records)\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "[{'id': 1, 'name': 'Alice', 'age': 30}, {'id': 2, 'name': 'Bob', 'age': 25}], 'name', 'Alice'",
        "expected": "[{'id': 1, 'name': 'Alice', 'age': 30}]",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "data management",
      "filter",
      "list",
      "dictionary",
      "search"
    ]
  },
  {
    "id": "141",
    "number": 141,
    "title": "Multi Sort",
    "titleVi": "Sắp xếp đa trường",
    "difficulty": "medium",
    "section": "Data Management",
    "description": "Write a Python function `solve(records, sort_by)` that takes a list of dictionaries (`records`) and a list of field names (`sort_by`) as input. The function should sort the `records` list in-place based on the specified `sort_by` fields. If multiple fields are provided, records should be sorted primarily by the first field, then by the second field for records with equal values in the first field, and so on. All sorting should be in ascending order. Print the sorted `records` list using `print()`.",
    "descriptionVi": "Viết một hàm Python `solve(records, sort_by)` nhận vào một danh sách các từ điển (`records`) và một danh sách tên trường (`sort_by`). Hàm này nên sắp xếp danh sách `records` tại chỗ dựa trên các trường `sort_by` được chỉ định. Nếu nhiều trường được cung cấp, các bản ghi nên được sắp xếp trước tiên theo trường đầu tiên, sau đó theo trường thứ hai đối với các bản ghi có giá trị bằng nhau trong trường đầu tiên, v.v. Tất cả các lần sắp xếp nên theo thứ tự tăng dần. In danh sách `records` đã sắp xếp bằng `print()`.",
    "expectedOutput": "[{'id': 3, 'name': 'Alice', 'age': 20}, {'id': 1, 'name': 'Bob', 'age': 25}, {'id': 2, 'name': 'Bob', 'age': 30}]",
    "hints": [
      "Python's `list.sort()` method or `sorted()` function can take a `key` argument.",
      "The `key` can be a lambda function that returns a tuple of values from the record for multi-field sorting. Python compares tuples element by element."
    ],
    "starterCode": "records = [{'id': 1, 'name': 'Bob', 'age': 25}, {'id': 2, 'name': 'Bob', 'age': 30}, {'id': 3, 'name': 'Alice', 'age': 20}]\nsort_by = ['name', 'age']\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "records = [{'id': 1, 'name': 'Bob', 'age': 25}, {'id': 2, 'name': 'Bob', 'age': 30}, {'id': 3, 'name': 'Alice', 'age': 20}]\nsort_by = ['name', 'age']\n\ndef solve():\n    if not sort_by:\n        print(records) # No sort fields, return as is\n        return\n\n    # Use a lambda function to construct a tuple of values for sorting\n    # The key function will return (record[sort_by[0]], record[sort_by[1]], ...)\n    # Python's sort will compare tuples element by element.\n    # Using .get(field, None) to handle cases where a field might be missing in a record\n    records.sort(key=lambda record: tuple(record.get(field, None) for field in sort_by))\n    print(records)\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "[{'id': 1, 'name': 'Bob', 'age': 25}, {'id': 2, 'name': 'Bob', 'age': 30}, {'id': 3, 'name': 'Alice', 'age': 20}], ['name', 'age']",
        "expected": "[{'id': 3, 'name': 'Alice', 'age': 20}, {'id': 1, 'name': 'Bob', 'age': 25}, {'id': 2, 'name': 'Bob', 'age': 30}]",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "data management",
      "sort",
      "list",
      "dictionary",
      "lambda"
    ]
  },
  {
    "id": "142",
    "number": 142,
    "title": "Aggregates",
    "titleVi": "Tổng hợp dữ liệu",
    "difficulty": "medium",
    "section": "Data Management",
    "description": "Write a Python function `solve(records, field)` that takes a list of dictionaries (`records`) and a `field` name (string) as input. The function should calculate and print the sum, average, count, minimum, and maximum of the values for the specified `field` across all records. Assume the field values are numeric (integers or floats). Use `print()` statements for each aggregate value, formatted as specified.\n\nOutput format:\n- `Sum: {sum_value}`\n- `Average: {avg_value:.2f}`\n- `Count: {count_value}`\n- `Min: {min_value}`\n- `Max: {max_value}`\n\nIf the `field` does not exist in any record or no numeric values are found for the field, print 'N/A' for sum, average, min, max, and 0 for count. Filter out non-numeric values for calculations.",
    "descriptionVi": "Viết một hàm Python `solve(records, field)` nhận vào một danh sách các từ điển (`records`) và tên `field` (chuỗi) làm đầu vào. Hàm này nên tính toán và in ra tổng, trung bình, số lượng, giá trị nhỏ nhất và lớn nhất của các giá trị cho `field` được chỉ định trên tất cả các bản ghi. Giả sử các giá trị trường là số (số nguyên hoặc số thực). Sử dụng các câu lệnh `print()` cho mỗi giá trị tổng hợp, được định dạng như đã chỉ định.\n\nĐịnh dạng đầu ra:\n- `Sum: {sum_value}`\n- `Average: {avg_value:.2f}`\n- `Count: {count_value}`\n- `Min: {min_value}`\n- `Max: {max_value}`\n\nNếu `field` không tồn tại trong bất kỳ bản ghi nào hoặc không tìm thấy giá trị số nào cho trường đó, hãy in 'N/A' cho tổng, trung bình, nhỏ nhất, lớn nhất và 0 cho số lượng. Lọc bỏ các giá trị không phải là số để tính toán.",
    "expectedOutput": "Sum: 75\nAverage: 25.00\nCount: 3\nMin: 20\nMax: 30",
    "hints": [
      "First, extract all valid numeric values for the `field` into a list.",
      "Check if the list of extracted values is empty before performing calculations to handle 'N/A' cases.",
      "Use `isinstance()` to check if a value is numeric (e.g., `isinstance(value, (int, float))`)."
    ],
    "starterCode": "records = [{'id': 1, 'age': 30}, {'id': 2, 'age': 20}, {'id': 3, 'age': 25}]\nfield = 'age'\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "records = [{'id': 1, 'age': 30}, {'id': 2, 'age': 20}, {'id': 3, 'age': 25}]\nfield = 'age'\n\ndef solve():\n    values = []\n    for record in records:\n        if field in record and isinstance(record[field], (int, float)):\n            values.append(record[field])\n\n    if not values:\n        print(\"Sum: N/A\")\n        print(\"Average: N/A\")\n        print(\"Count: 0\")\n        print(\"Min: N/A\")\n        print(\"Max: N/A\")\n        return\n\n    total_sum = sum(values)\n    avg = total_sum / len(values)\n    count = len(values)\n    minimum = min(values)\n    maximum = max(values)\n\n    print(f\"Sum: {total_sum}\")\n    print(f\"Average: {avg:.2f}\")\n    print(f\"Count: {count}\")\n    print(f\"Min: {minimum}\")\n    print(f\"Max: {maximum}\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "[{'id': 1, 'age': 30}, {'id': 2, 'age': 20}, {'id': 3, 'age': 25}], 'age'",
        "expected": "Sum: 75\nAverage: 25.00\nCount: 3\nMin: 20\nMax: 30",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "data management",
      "aggregation",
      "list",
      "dictionary",
      "statistics"
    ]
  },
  {
    "id": "143",
    "number": 143,
    "title": "Join Datasets",
    "titleVi": "Nối tập dữ liệu",
    "difficulty": "medium",
    "section": "Data Management",
    "description": "Write a Python function `solve(students, grades)` that takes two lists of dictionaries as input: `students` and `grades`. \n-   `students`: Each dictionary has at least 'student_id' and 'name'.\n-   `grades`: Each dictionary has at least 'student_id' and 'score'.\n\nThe function should perform an 'inner join' operation on these two datasets using 'student_id' as the common key. For each matching `student_id`, combine the student's name and score into a new dictionary. Print the list of combined dictionaries. Each combined dictionary should have 'student_id', 'name', and 'score'. If a student_id from `students` has no matching grade or vice versa, it should not be included in the output.\n\nExample Output: `[{'student_id': 1, 'name': 'Alice', 'score': 90}, {'student_id': 2, 'name': 'Bob', 'score': 85}]`",
    "descriptionVi": "Viết một hàm Python `solve(students, grades)` nhận vào hai danh sách các từ điển: `students` và `grades`. \n-   `students`: Mỗi từ điển có ít nhất 'student_id' và 'name'.\n-   `grades`: Mỗi từ điển có ít nhất 'student_id' và 'score'.\n\nHàm này nên thực hiện một phép 'inner join' trên hai tập dữ liệu này sử dụng 'student_id' làm khóa chung. Đối với mỗi 'student_id' khớp, hãy kết hợp tên và điểm của học sinh vào một từ điển mới. In danh sách các từ điển đã kết hợp. Mỗi từ điển đã kết hợp phải có 'student_id', 'name' và 'score'. Nếu một student_id từ `students` không có điểm tương ứng hoặc ngược lại, nó sẽ không được đưa vào đầu ra.\n\nVí dụ đầu ra: `[{'student_id': 1, 'name': 'Alice', 'score': 90}, {'student_id': 2, 'name': 'Bob', 'score': 85}]`",
    "expectedOutput": "[{'student_id': 1, 'name': 'Alice', 'score': 90}, {'student_id': 2, 'name': 'Bob', 'score': 85}]",
    "hints": [
      "One efficient way is to first create a dictionary (or hash map) from one of the lists (e.g., `students`) where the keys are 'student_id' and values are the student records.",
      "Then iterate through the second list (`grades`) and look up each `grade`'s 'student_id' in the student dictionary.",
      "If a match is found, combine the information."
    ],
    "starterCode": "students = [{'student_id': 1, 'name': 'Alice'}, {'student_id': 2, 'name': 'Bob'}]\ngrades = [{'student_id': 1, 'score': 90}, {'student_id': 2, 'score': 85}]\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "students = [{'student_id': 1, 'name': 'Alice'}, {'student_id': 2, 'name': 'Bob'}]\ngrades = [{'student_id': 1, 'score': 90}, {'student_id': 2, 'score': 85}]\n\ndef solve():\n    student_map = {student['student_id']: student for student in students}\n\n    joined_records = []\n    for grade_record in grades:\n        student_id = grade_record['student_id']\n        if student_id in student_map:\n            student_record = student_map[student_id]\n            joined_record = {\n                'student_id': student_id,\n                'name': student_record['name'],\n                'score': grade_record['score']\n            }\n            joined_records.append(joined_record)\n\n    print(joined_records)\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "[{'student_id': 1, 'name': 'Alice'}, {'student_id': 2, 'name': 'Bob'}], [{'student_id': 1, 'score': 90}, {'student_id': 2, 'score': 85}]",
        "expected": "[{'student_id': 1, 'name': 'Alice', 'score': 90}, {'student_id': 2, 'name': 'Bob', 'score': 85}]",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "data management",
      "join",
      "list",
      "dictionary",
      "data processing"
    ]
  },
  {
    "id": "144",
    "number": 144,
    "title": "Transaction Log",
    "titleVi": "Nhật ký giao dịch",
    "difficulty": "medium",
    "section": "Data Management",
    "description": "Write a Python function `solve(transactions)` that takes a list of transaction dictionaries as input. Each transaction has a `type` ('deposit' or 'withdrawal') and an `amount`. The function should process these transactions sequentially and maintain a running `balance`. Print the `balance` after each transaction. Start with an initial `balance` of 0. Amounts are always positive integers or floats. Withdrawals can make the balance negative.\n\nExample:\n`transactions = [{'type': 'deposit', 'amount': 100}, {'type': 'withdrawal', 'amount': 30}]`\n\nOutput:\n`Balance: 100.00`\n`Balance: 70.00`",
    "descriptionVi": "Viết một hàm Python `solve(transactions)` nhận vào một danh sách các từ điển giao dịch. Mỗi giao dịch có một 'type' ('deposit' hoặc 'withdrawal') và một 'amount'. Hàm này nên xử lý các giao dịch này theo trình tự và duy trì một `balance` đang chạy. In `balance` sau mỗi giao dịch. Bắt đầu với `balance` ban đầu là 0. Số tiền luôn là số nguyên hoặc số thực dương. Rút tiền có thể làm cho số dư âm.\n\nVí dụ:\n`transactions = [{'type': 'deposit', 'amount': 100}, {'type': 'withdrawal', 'amount': 30}]`\n\nĐầu ra:\n`Balance: 100.00`\n`Balance: 70.00`",
    "expectedOutput": "Balance: 100.00\nBalance: 70.00",
    "hints": [
      "Initialize `balance = 0`.",
      "Iterate through the `transactions` list.",
      "Use an if-else statement to check the `transaction['type']` and update the balance accordingly.",
      "Use f-strings for formatted output to two decimal places: `f\"Balance: {balance:.2f}\"`."
    ],
    "starterCode": "transactions = [{'type': 'deposit', 'amount': 100}, {'type': 'withdrawal', 'amount': 30}]\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "transactions = [{'type': 'deposit', 'amount': 100}, {'type': 'withdrawal', 'amount': 30}]\n\ndef solve():\n    balance = 0.0\n    for transaction in transactions:\n        transaction_type = transaction['type']\n        amount = float(transaction['amount']) # Ensure amount is float for calculations\n\n        if transaction_type == 'deposit':\n            balance += amount\n        elif transaction_type == 'withdrawal':\n            balance -= amount\n        # For robustness, consider an else for invalid transaction types, though problem implies valid inputs.\n\n        print(f\"Balance: {balance:.2f}\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "[{'type': 'deposit', 'amount': 100}, {'type': 'withdrawal', 'amount': 30}]",
        "expected": "Balance: 100.00\nBalance: 70.00",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "data management",
      "financial",
      "transactions",
      "balance",
      "sequential processing"
    ]
  },
  {
    "id": "145",
    "number": 145,
    "title": "Data Validation",
    "titleVi": "Xác thực dữ liệu",
    "difficulty": "medium",
    "section": "Data Management",
    "description": "Write code that validates a given `value` against a specified `data_type`. It should print `True` if the `value` is valid for the `data_type`, otherwise `False`. Print the boolean result.\n\nSupported `data_type`s and their validation rules:\n-   `'email'`: Must contain exactly one '@' and at least one '.' after '@'. No spaces allowed.\n-   `'phone'`: Must be a string of 10 digits only. (e.g., '1234567890')\n-   `'age'`: Must be an integer between 0 and 120 (inclusive).\n-   `'password'`: Must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one digit.\n-   Any other `data_type`: Print 'Unsupported data type' and return `False`.\n\nThe variables are already set at the top of the editor - print the result directly.",
    "descriptionVi": "Viết code để xác thực một `value` đã cho so với một `data_type` được chỉ định. Hàm này nên trả về `True` nếu `value` hợp lệ cho `data_type`, ngược lại là `False`. In kết quả boolean.\n\nCác `data_type` được hỗ trợ và quy tắc xác thực của chúng:\n-   `'email'`: Phải chứa chính xác một ký tự '@' và ít nhất một ký tự '.' sau '@'. Không được phép có khoảng trắng.\n-   `'phone'`: Phải là một chuỗi gồm 10 chữ số. (ví dụ: '1234567890')\n-   `'age'`: Phải là một số nguyên từ 0 đến 120 (bao gồm).\n-   `'password'`: Phải dài ít nhất 8 ký tự, chứa ít nhất một chữ cái viết hoa, một chữ cái viết thường và một chữ số.\n-   Bất kỳ `data_type` nào khác: In 'Unsupported data type' và trả về `False`.\n\nCác biến đã được khai báo sẵn ở đầu editor - hãy in kết quả trực tiếp.",
    "expectedOutput": "True",
    "hints": [
      "For email, use `value.count('@')`, `value.find('@')`, and `value.rfind('.')`.",
      "For phone, use `value.isdigit()` and check `len(value)`.",
      "For age, use `isinstance(value, int)` and range checks.",
      "For password, use `any(char.isupper() for char in value)`, `any(char.islower() for char in value)`, and `any(char.isdigit() for char in value)`."
    ],
    "starterCode": "data_type = 'email'\nvalue = 'test@example.com'\n\ndef validate(data_type, value):\n    # Your code here\n    pass\n\nprint(validate(data_type, value))",
    "solution": "data_type = 'email'\nvalue = 'test@example.com'\n\ndef validate(data_type, value):\n    if data_type == 'email':\n        if not isinstance(value, str) or ' ' in value or value.count('@') != 1:\n            return False\n        at = value.index('@')\n        dot = value.rfind('.', at)\n        return at > 0 and dot >= at + 2 and dot < len(value) - 1\n    if data_type == 'phone':\n        return isinstance(value, str) and value.isdigit() and len(value) == 10\n    if data_type == 'age':\n        return isinstance(value, int) and 0 <= value <= 120\n    if data_type == 'password':\n        return (\n            isinstance(value, str)\n            and len(value) >= 8\n            and any(c.isupper() for c in value)\n            and any(c.islower() for c in value)\n            and any(c.isdigit() for c in value)\n        )\n    return False\n\nprint(validate(data_type, value))",
    "testCases": [
      {
        "input": "'email', 'test@example.com'",
        "expected": "True",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "data management",
      "validation",
      "string",
      "regex",
      "conditions"
    ]
  },
  {
    "id": "146",
    "number": 146,
    "title": "Shift Cipher",
    "titleVi": "Mật mã Caesar",
    "difficulty": "easy",
    "section": "Chunky Challenges",
    "description": "Write a Python function `solve(text, shift, mode)` that implements a simple Shift (Caesar) Cipher. \n-   `text`: The input string to encrypt or decrypt.\n-   `shift`: An integer representing the number of positions to shift each letter. Can be positive or negative.\n-   `mode`: A string, either 'encrypt' or 'decrypt'.\n\nThe function should shift alphabetic characters (A-Z and a-z) by the `shift` amount, wrapping around the alphabet. Non-alphabetic characters should remain unchanged. Print the resulting string. Your solution should be case-sensitive, meaning 'A' shifted by 1 becomes 'B', and 'a' shifted by 1 becomes 'b'.",
    "descriptionVi": "Viết một hàm Python `solve(text, shift, mode)` triển khai mã hóa Shift (Caesar) đơn giản. \n-   `text`: Chuỗi đầu vào để mã hóa hoặc giải mã.\n-   `shift`: Một số nguyên biểu thị số vị trí để dịch chuyển mỗi chữ cái. Có thể là số dương hoặc số âm.\n-   `mode`: Một chuỗi, 'encrypt' hoặc 'decrypt'.\n\nHàm này nên dịch chuyển các ký tự chữ cái (A-Z và a-z) theo số lượng `shift`, cuộn vòng quanh bảng chữ cái. Các ký tự không phải chữ cái sẽ không thay đổi. In chuỗi kết quả. Giải pháp của bạn phải phân biệt chữ hoa chữ thường, nghĩa là 'A' dịch chuyển 1 thành 'B' và 'a' dịch chuyển 1 thành 'b'.",
    "expectedOutput": "Khoor Zruog!",
    "hints": [
      "Use `ord()` to get the ASCII value of a character and `chr()` to convert an ASCII value back to a character.",
      "Determine if a character is uppercase (`'A'` to `'Z'`) or lowercase (`'a'` to `'z'`) to get the correct base for wrapping.",
      "The modulo operator (`%`) is crucial for wrapping around the alphabet: `(shifted_pos - base + 26) % 26 + base` where `base` is `ord('A')` or `ord('a')`.",
      "For decryption, either negate the `shift` or add 26 to the shift value before taking modulo."
    ],
    "starterCode": "text = 'Hello World!'\nshift = 3\nmode = 'encrypt'\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "text = 'Hello World!'\nshift = 3\nmode = 'encrypt'\n\ndef solve():\n    result = []\n    effective_shift = shift\n    if mode == 'decrypt':\n        effective_shift = -shift # For decryption, reverse the shift\n\n    for char in text:\n        if 'a' <= char <= 'z':\n            start_ascii = ord('a')\n            # Apply shift and wrap around 26 letters (0-25). \n            # Adding 26 before modulo handles negative results correctly in Python.\n            shifted_char = chr( ( (ord(char) - start_ascii + effective_shift + 26) % 26 ) + start_ascii )\n            result.append(shifted_char)\n        elif 'A' <= char <= 'Z':\n            start_ascii = ord('A')\n            # Same logic for uppercase\n            shifted_char = chr( ( (ord(char) - start_ascii + effective_shift + 26) % 26 ) + start_ascii )\n            result.append(shifted_char)\n        else:\n            result.append(char) # Non-alphabetic characters remain unchanged\n\n    print(\"\".join(result))\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "'Hello World!', 3, 'encrypt'",
        "expected": "Khoor Zruog!",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "cryptography",
      "string manipulation",
      "cipher",
      "algorithm"
    ]
  },
  {
    "id": "147",
    "number": 147,
    "title": "Mastermind",
    "titleVi": "Trò chơi Mastermind",
    "difficulty": "medium",
    "section": "Chunky Challenges",
    "description": "Write code that simulates a single round of the game Mastermind. Both `secret` and `guess` are strings of four characters representing colors (e.g., 'RGBY'). The function should determine and print the number of 'bulls' and 'cows'.\n\n-   A 'bull' is a character in the `guess` that is correct in both color and position.\n-   A 'cow' is a character in the `guess` that is correct in color but in the wrong position.\n\nEach character in the `secret` and `guess` can only contribute to one bull or one cow. Assume `secret` and `guess` always have a length of 4. Case-sensitive matching.\n\nOutput format:\n`Bulls: {bulls_count}`\n`Cows: {cows_count}`\n\nThe variables are already set at the top of the editor - print the result directly.",
    "descriptionVi": "Viết code để mô phỏng một vòng chơi Mastermind. Cả `secret` và `guess` đều là chuỗi gồm bốn ký tự đại diện cho màu sắc (ví dụ: 'RGBY'). Hàm này nên xác định và in ra số lượng 'bulls' và 'cows'.\n\n-   Một 'bull' là một ký tự trong `guess` đúng cả màu sắc và vị trí.\n-   Một 'cow' là một ký tự trong `guess` đúng màu sắc nhưng sai vị trí.\n\nMỗi ký tự trong `secret` và `guess` chỉ có thể đóng góp vào một bull hoặc một cow. Giả sử `secret` và `guess` luôn có độ dài là 4. So khớp phân biệt chữ hoa chữ thường.\n\nĐịnh dạng đầu ra:\n`Bulls: {bulls_count}`\n`Cows: {cows_count}`\n\nCác biến đã được khai báo sẵn ở đầu editor - hãy in kết quả trực tiếp.",
    "expectedOutput": "Bulls: 2\nCows: 1",
    "hints": [
      "First calculate bulls by iterating and comparing characters at the same position. Mark matched characters so they aren't reused for cows.",
      "Then calculate cows. For each remaining character in `guess`, check if it exists in the remaining `secret` characters.",
      "It's helpful to convert `secret` and `guess` into mutable lists for marking/removing characters, or use frequency counts.",
      "A common strategy is to use `collections.Counter` or create frequency maps for the remaining characters after bulls are accounted for."
    ],
    "starterCode": "from collections import Counter\n\nsecret = 'RGGB'\nguess = 'RGBY'\n\n# Your code here",
    "solution": "from collections import Counter\n\nsecret = 'RGGB'\nguess = 'RGBY'\n\nsecret_chars = list(secret)\nguess_chars = list(guess)\nbulls = 0\n\nfor i in range(len(secret_chars)):\n    if guess_chars[i] == secret_chars[i]:\n        bulls += 1\n        guess_chars[i] = secret_chars[i] = '#'\n\nremaining = Counter(c for c in secret_chars if c != '#')\ncows = 0\nfor c in guess_chars:\n    if c != '#' and remaining[c] > 0:\n        cows += 1\n        remaining[c] -= 1\n\nprint(f\"Bulls: {bulls}\")\nprint(f\"Cows: {cows}\")",
    "testCases": [
      {
        "input": "'RGGB', 'RGBY'",
        "expected": "Bulls: 2\nCows: 1",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "game",
      "logic",
      "string",
      "algorithm",
      "counting"
    ]
  },
  {
    "id": "148",
    "number": 148,
    "title": "Password Checker",
    "titleVi": "Kiểm tra mật khẩu",
    "difficulty": "medium",
    "section": "Chunky Challenges",
    "description": "Write a Python function `solve(password)` that checks the strength of a given `password` string and prints its strength level. The rules for strength are:\n\n-   **Weak**: Length < 8 OR does not meet at least 2 of the following conditions.\n-   **Moderate**: Length >= 8 AND meets at least 2 of the following conditions.\n-   **Strong**: Length >= 8 AND meets all 3 of the following conditions.\n\nConditions:\n1.  Contains at least one uppercase letter.\n2.  Contains at least one lowercase letter.\n3.  Contains at least one digit.\n4.  Contains at least one special character (any character that is not a letter or a digit, e.g., `!@#$%^&*()-_+=[]{}|;:'\",.<>/?`)\n\nPrint 'Weak', 'Moderate', or 'Strong'.",
    "descriptionVi": "Viết một hàm Python `solve(password)` kiểm tra độ mạnh của chuỗi `password` đã cho và in ra cấp độ mạnh của nó. Các quy tắc về độ mạnh là:\n\n-   **Yếu**: Độ dài < 8 HOẶC không đáp ứng ít nhất 2 trong các điều kiện sau.\n-   **Trung bình**: Độ dài >= 8 VÀ đáp ứng ít nhất 2 trong các điều kiện sau.\n-   **Mạnh**: Độ dài >= 8 VÀ đáp ứng tất cả 3 điều kiện sau.\n\nĐiều kiện:\n1.  Chứa ít nhất một chữ cái viết hoa.\n2.  Chứa ít nhất một chữ cái viết thường.\n3.  Chứa ít nhất một chữ số.\n4.  Chứa ít nhất một ký tự đặc biệt (bất kỳ ký tự nào không phải chữ cái hoặc chữ số, ví dụ: `!@#$%^&*()-_+=[]{}|;:'\",.<>/?`)\n\nIn 'Weak', 'Moderate' hoặc 'Strong'.",
    "expectedOutput": "Weak",
    "hints": [
      "Iterate through the password characters to check for each condition.",
      "Use `char.isupper()`, `char.islower()`, `char.isdigit()` for letters and digits.",
      "For special characters, you can define a set of allowed special characters or use a universal check like `not char.isalnum()` (if you restrict other types of chars, otherwise it might be too broad). It's safer to check if `not (char.isupper() or char.islower() or char.isdigit())` for the special character condition.",
      "Count how many conditions are met."
    ],
    "starterCode": "password = 'short'\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "password = 'short'\n\ndef solve():\n    has_upper = False\n    has_lower = False\n    has_digit = False\n    has_special = False\n\n    if not isinstance(password, str): \n        print(\"Weak\")\n        return\n\n    for char in password:\n        if char.isupper():\n            has_upper = True\n        elif char.islower():\n            has_lower = True\n        elif char.isdigit():\n            has_digit = True\n        else:\n            # A character that is not uppercase, lowercase, or a digit is considered special\n            has_special = True\n\n    num_conditions_met = sum([has_upper, has_lower, has_digit, has_special])\n\n    if len(password) < 8 or num_conditions_met < 2:\n        print(\"Weak\")\n    elif len(password) >= 8 and num_conditions_met >= 4: # All 4 conditions met for strong\n        print(\"Strong\")\n    elif len(password) >= 8 and num_conditions_met >= 2: # At least 2 conditions for moderate (implicitly up to 3 conditions)\n        # Note: The problem asks for >= 2 conditions for Moderate. If Strong implies ALL 4,\n        # then Moderate covers 2 or 3 conditions met (when length >= 8).\n        print(\"Moderate\")\n    else:\n        # This 'else' should theoretically not be hit if all conditions are properly covered above.\n        # It might indicate a logic flaw or unexpected input, but for typical scenarios,\n        # the prior if/elif statements handle all cases given the definition.\n        print(\"Weak\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "'short'",
        "expected": "Weak",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "security",
      "string",
      "validation",
      "logic",
      "conditions"
    ]
  },
  {
    "id": "149",
    "number": 149,
    "title": "Times Table Quiz",
    "titleVi": "Bài kiểm tra bảng cửu chương",
    "difficulty": "easy",
    "section": "Chunky Challenges",
    "description": "Write a Python function `solve(questions, answers)` that grades a simple times table quiz. \n-   `questions`: A list of strings, each representing a multiplication question (e.g., '3x5').\n-   `answers`: A list of integers, corresponding to the user's answers for each question.\n\nThe function should compare each `answer` with the correct result of the corresponding `question`. Print the number of correct answers and the total number of questions. Questions and answers lists will always have the same length.\n\nOutput format:\n`Correct: {correct_count}`\n`Total: {total_count}`",
    "descriptionVi": "Viết một hàm Python `solve(questions, answers)` chấm điểm một bài kiểm tra bảng cửu chương đơn giản. \n-   `questions`: Một danh sách các chuỗi, mỗi chuỗi đại diện cho một câu hỏi nhân (ví dụ: '3x5').\n-   `answers`: Một danh sách các số nguyên, tương ứng với câu trả lời của người dùng cho mỗi câu hỏi.\n\nHàm này nên so sánh từng `answer` với kết quả đúng của `question` tương ứng. In số câu trả lời đúng và tổng số câu hỏi. Danh sách câu hỏi và câu trả lời sẽ luôn có cùng độ dài.\n\nĐịnh dạng đầu ra:\n`Correct: {correct_count}`\n`Total: {total_count}`",
    "expectedOutput": "Correct: 3\nTotal: 3",
    "hints": [
      "Iterate through the questions and answers simultaneously (e.g., using `zip()`).",
      "For each question string (e.g., '3x5'), split it to extract the two numbers and then multiply them.",
      "Convert the parts of the question string to integers before multiplication."
    ],
    "starterCode": "questions = ['2x3', '5x4', '10x1']\nanswers = [6, 20, 10]\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "questions = ['2x3', '5x4', '10x1']\nanswers = [6, 20, 10]\n\ndef solve():\n    correct_count = 0\n    total_count = len(questions)\n\n    for i in range(total_count):\n        question_str = questions[i]\n        user_answer = answers[i]\n\n        # Parse the question string 'AxB' -> A and B\n        parts = question_str.split('x')\n        num1 = int(parts[0])\n        num2 = int(parts[1])\n\n        correct_result = num1 * num2\n\n        if user_answer == correct_result:\n            correct_count += 1\n\n    print(f\"Correct: {correct_count}\")\n    print(f\"Total: {total_count}\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "['2x3', '5x4', '10x1'], [6, 20, 10]",
        "expected": "Correct: 3\nTotal: 3",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "math",
      "quiz",
      "string parsing",
      "list",
      "game"
    ]
  },
  {
    "id": "150",
    "number": 150,
    "title": "Art Gallery",
    "titleVi": "Thư viện Nghệ thuật",
    "difficulty": "medium",
    "section": "Chunky Challenges",
    "description": "Write a Python function `solve(action, gallery, painting=None)` that manages an art gallery's collection. The `gallery` is a list of painting dictionaries. Each `painting` dictionary has at least 'id' and 'title'. The function should perform CRUD-like operations.\n\n-   `action`: 'add', 'view', 'update', 'remove'\n-   `gallery`: A list of painting dictionaries.\n-   `painting`: For 'add' and 'update', this is the dictionary to add/modify. For 'view' and 'remove', it expects a painting with just an 'id' for lookup (`{'id': 1}`).\n\nOutput requirements for each action:\n-   'add': Add `painting` to `gallery`. If 'id' already exists, print 'Painting with ID already exists.'. Otherwise, print 'Painting added. Current gallery: [updated_gallery]'\n-   'view': Find painting by 'id'. Print 'Painting found: {painting}' or 'Painting not found.'\n-   'update': Find painting by 'id', update its fields with `painting`'s fields. Print 'Painting updated. Current gallery: [updated_gallery]' or 'Painting not found.'\n-   'remove': Find painting by 'id' and remove it. Print 'Painting removed. Current gallery: [updated_gallery]' or 'Painting not found.'\n\nPrint lists of galleries as `str(gallery)`.",
    "descriptionVi": "Viết một hàm Python `solve(action, gallery, painting=None)` quản lý bộ sưu tập của một thư viện nghệ thuật. `gallery` là một danh sách các từ điển tranh. Mỗi từ điển `painting` có ít nhất 'id' và 'title'. Hàm này nên thực hiện các thao tác giống như CRUD.\n\n-   `action`: 'add', 'view', 'update', 'remove'\n-   `gallery`: Một danh sách các từ điển tranh.\n-   `painting`: Đối với 'add' và 'update', đây là từ điển để thêm/sửa đổi. Đối với 'view' và 'remove', nó mong đợi một bức tranh chỉ với 'id' để tra cứu (`{'id': 1}`).\n\nYêu cầu đầu ra cho mỗi hành động:\n-   'add': Thêm `painting` vào `gallery`. Nếu 'id' đã tồn tại, hãy in 'Painting with ID already exists.'. Ngược lại, in 'Painting added. Current gallery: [updated_gallery]'\n-   'view': Tìm tranh theo 'id'. In 'Painting found: {painting}' hoặc 'Painting not found.'\n-   'update': Tìm tranh theo 'id', cập nhật các trường của nó bằng các trường của `painting`. In 'Painting updated. Current gallery: [updated_gallery]' hoặc 'Painting not found.'\n-   'remove': Tìm tranh theo 'id' và xóa nó. In 'Painting removed. Current gallery: [updated_gallery]' hoặc 'Painting not found.'\n\nIn danh sách các thư viện dưới dạng `str(gallery)`.",
    "expectedOutput": "Painting added. Current gallery: [{'id': 1, 'title': 'Mona Lisa', 'artist': 'Leonardo da Vinci'}]",
    "hints": [
      "Maintain a unique ID constraint for 'add' operations. You'll need to check if an ID already exists before adding.",
      "Similar to CRUD Records problem (139), iterate to find by 'id'.",
      "For 'update', use `dict.update()` to merge new fields.",
      "The `gallery` list should be modified in place."
    ],
    "starterCode": "action = 'add'\ngallery = []\npainting = {'id': 1, 'title': 'Mona Lisa', 'artist': 'Leonardo da Vinci'}\n\ndef solve():\n    # Your code here\n    pass\n\nresult = solve()\nif result is not None:\n    print(result)",
    "solution": "action = 'add'\ngallery = []\npainting = {'id': 1, 'title': 'Mona Lisa', 'artist': 'Leonardo da Vinci'}\n\ndef solve():\n    if action == 'add':\n        if painting is None or 'id' not in painting:\n            print(\"Invalid painting data for add.\")\n            return\n\n        # Check if ID already exists\n        for p in gallery:\n            if p.get('id') == painting['id']:\n                print(\"Painting with ID already exists.\")\n                return\n\n        gallery.append(painting)\n        print(f\"Painting added. Current gallery: {gallery}\")\n\n    elif action == 'view':\n        if painting is None or 'id' not in painting:\n            print(\"Invalid painting ID for view.\")\n            return\n\n        found_painting = None\n        for p in gallery:\n            if p.get('id') == painting['id']:\n                found_painting = p\n                break\n\n        if found_painting:\n            print(f\"Painting found: {found_painting}\")\n        else:\n            print(\"Painting not found.\")\n\n    elif action == 'update':\n        if painting is None or 'id' not in painting:\n            print(\"Invalid painting data for update.\")\n            return\n\n        found_index = -1\n        for i, p in enumerate(gallery):\n            if p.get('id') == painting['id']:\n                found_index = i\n                break\n\n        if found_index != -1:\n            gallery[found_index].update(painting)\n            print(f\"Painting updated. Current gallery: {gallery}\")\n        else:\n            print(\"Painting not found.\")\n\n    elif action == 'remove':\n        if painting is None or 'id' not in painting:\n            print(\"Invalid painting ID for remove.\")\n            return\n\n        found_index = -1\n        for i, p in enumerate(gallery):\n            if p.get('id') == painting['id']:\n                found_index = i\n                break\n\n        if found_index != -1:\n            del gallery[found_index]\n            print(f\"Painting removed. Current gallery: {gallery}\")\n        else:\n            print(\"Painting not found.\")\n\n    else:\n        print(\"Invalid action.\")\n\nresult = solve()\nif result is not None:\n    print(result)",
    "testCases": [
      {
        "input": "'add', [], {'id': 1, 'title': 'Mona Lisa', 'artist': 'Leonardo da Vinci'}",
        "expected": "Painting added. Current gallery: [{'id': 1, 'title': 'Mona Lisa', 'artist': 'Leonardo da Vinci'}]",
        "description": "Verified by running the reference solution."
      }
    ],
    "tags": [
      "data management",
      "CRUD",
      "list",
      "dictionary",
      "gallery"
    ]
  }
];

/** Look up a challenge by its zero-padded id (e.g. "007"). */
export const getChallengeById = (id: string): PythonChallenge | undefined =>
  pythonChallenges.find((c) => c.id === id);

/** The challenge after the given id, or undefined at the end of the list. */
export const getNextChallenge = (id: string): PythonChallenge | undefined => {
  const idx = pythonChallenges.findIndex((c) => c.id === id);
  return idx >= 0 ? pythonChallenges[idx + 1] : undefined;
};

/** The challenge before the given id, or undefined at the start of the list. */
export const getPrevChallenge = (id: string): PythonChallenge | undefined => {
  const idx = pythonChallenges.findIndex((c) => c.id === id);
  return idx > 0 ? pythonChallenges[idx - 1] : undefined;
};
