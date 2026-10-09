import type { PythonLesson, PythonModule } from "./pythonPathwayLegacy";

export interface BookChapter {
  lessonId: string;
  title: string;
  first: number;
  last: number;
  desktopExample?: string;
}

// Original concise teaching notes based on the chapter sequence of Nichola Lacey's
// Python by Example (2019). Do not copy the book's prose or answer listings.
const source: { lesson: PythonLesson; chapter: BookChapter }[] = [
  {
    "lesson": {
      "id": "m1-l4-io",
      "moduleId": "m1-basics",
      "order": 1,
      "title": "The Basics",
      "titleEn": "The Basics",
      "emoji": "💬",
      "concept": "### Essential idea\n\nA program follows instructions in order.\n\nA variable binds a name to a value; use meaningful names such as `first_name` and `total`.\n\nNames are case-sensitive.\n\nText uses quotes (`str`), whole numbers use `int`, and decimal numbers use `float`.\n\n`print()` displays values. `input()` returns text, even when the user types digits.\n\nConvert with `int()` or `float()` before doing arithmetic.\n\nUse commas in `print()` to display text and numbers together.\n\nA comment starts with `#` and is not executed.\n\n```python\nname = \"Ava\"\nage = 20\nprint(name, age)  # Ava 20\n```\n\n### Key syntax\n\n`name = value` assigns a value. `+`, `-`, `*`, `/` perform arithmetic; `**` raises a power.\n\nParentheses control calculation order. `\\n` inside a string starts a new line.\n\n```python\nprint((8 + 2) * 3)  # 30\nprint(8 + 2 * 3)    # 14\n```\n\n### Worked example\n\n```python\nfirst_name = input(\"First name: \")\nquantity = int(input(\"Quantity: \"))\nprice = float(input(\"Price per item: \"))\ntotal = quantity * price\nprint(\"Hello\", first_name)\nprint(f\"Total: {total}\\nThank you.\")\n```",
      "conceptEn": "### Essential idea\n\nA program follows instructions in order.\n\nA variable binds a name to a value; use meaningful names such as `first_name` and `total`.\n\nNames are case-sensitive.\n\nText uses quotes (`str`), whole numbers use `int`, and decimal numbers use `float`.\n\n`print()` displays values. `input()` returns text, even when the user types digits.\n\nConvert with `int()` or `float()` before doing arithmetic.\n\nUse commas in `print()` to display text and numbers together.\n\nA comment starts with `#` and is not executed.\n\n```python\nname = \"Ava\"\nage = 20\nprint(name, age)  # Ava 20\n```\n\n### Key syntax\n\n`name = value` assigns a value. `+`, `-`, `*`, `/` perform arithmetic; `**` raises a power.\n\nParentheses control calculation order. `\\n` inside a string starts a new line.\n\n```python\nprint((8 + 2) * 3)  # 30\nprint(8 + 2 * 3)    # 14\n```\n\n### Worked example\n\n```python\nfirst_name = input(\"First name: \")\nquantity = int(input(\"Quantity: \"))\nprice = float(input(\"Price per item: \"))\ntotal = quantity * price\nprint(\"Hello\", first_name)\nprint(f\"Total: {total}\\nThank you.\")\n```",
      "codeExample": "first_name = input(\"First name: \")\nquantity = int(input(\"Quantity: \"))\nprice = float(input(\"Price per item: \"))\ntotal = quantity * price\nprint(\"Hello\", first_name)\nprint(f\"Total: {total}\\nThank you.\")",
      "pitfalls": "- Do not add a number to text without conversion.\n\n- `int(\"3.5\")` raises ValueError; use `float()` for decimal input.\n\n- Use matching quotes and parentheses. Define a variable before reading it.",
      "pitfallsEn": "- Do not add a number to text without conversion.\n\n- `int(\"3.5\")` raises ValueError; use `float()` for decimal input.\n\n- Use matching quotes and parentheses. Define a variable before reading it.",
      "practiceTask": "Change the example to calculate a shared bill. Read the total and number of people, then display each share. Test with 24 and 3.",
      "practiceTaskEn": "Change the example to calculate a shared bill. Read the total and number of people, then display each share. Test with 24 and 3.",
      "quiz": [
        {
          "type": "mcq",
          "q": "What does input() return?",
          "qEn": "What does input() return?",
          "options": [
            "Text (str)",
            "An integer",
            "A float",
            "A boolean"
          ],
          "optionsEn": [
            "Text (str)",
            "An integer",
            "A float",
            "A boolean"
          ],
          "answer": 0,
          "explanation": "Text (str)"
        },
        {
          "type": "mcq",
          "q": "What is 8 + 2 * 3?",
          "qEn": "What is 8 + 2 * 3?",
          "options": [
            "30",
            "14",
            "18",
            "10"
          ],
          "optionsEn": [
            "30",
            "14",
            "18",
            "10"
          ],
          "answer": 1,
          "explanation": "14"
        },
        {
          "type": "mcq",
          "q": "Which name is valid?",
          "qEn": "Which name is valid?",
          "options": [
            "2name",
            "first-name",
            "first_name",
            "class"
          ],
          "optionsEn": [
            "2name",
            "first-name",
            "first_name",
            "class"
          ],
          "answer": 2,
          "explanation": "first_name"
        },
        {
          "type": "mcq",
          "q": "Which converts \"12\" to a whole number?",
          "qEn": "Which converts \"12\" to a whole number?",
          "options": [
            "str(\"12\")",
            "int(\"12\")",
            "print(\"12\")",
            "len(\"12\")"
          ],
          "optionsEn": [
            "str(\"12\")",
            "int(\"12\")",
            "print(\"12\")",
            "len(\"12\")"
          ],
          "answer": 1,
          "explanation": "int(\"12\")"
        },
        {
          "type": "fill",
          "q": "Convert an input value to an integer",
          "qEn": "Convert an input value to an integer",
          "codeBefore": "count = ",
          "codeAfter": "(input(\"Count: \"))",
          "answer": "int"
        }
      ]
    },
    "chapter": {
      "lessonId": "m1-l4-io",
      "title": "The Basics",
      "first": 1,
      "last": 11
    }
  },
  {
    "lesson": {
      "id": "m2-1-ifelse",
      "moduleId": "m1-basics",
      "order": 2,
      "title": "If Statements",
      "titleEn": "If Statements",
      "emoji": "🔀",
      "concept": "### Essential idea\n\nUse `if`, `elif` and `else` to choose one branch.\n\nPython checks conditions from top to bottom and runs the first matching branch; `else` handles all remaining cases.\n\nComparison operators are `==`, `!=`, `<`, `>`, `<=` and `>=`.\n\nCombine complete conditions with `and` (both true), `or` (at least one true) and `not` (invert).\n\nNormalize text with `.lower()` if a response should be case-insensitive.\n\n```python\ntemperature = 18\nif temperature < 20:\n    print(\"Wear a jacket\")\n```\n\n### Key syntax\n\nA colon starts each branch.\n\nIndentation defines the block: use four spaces consistently as the style convention, not a fixed language requirement.\n\nKeep `elif` and `else` aligned with `if`.\n\n```python\ncolour = \"BLUE\".lower()\nif colour == \"red\" or colour == \"blue\":\n    print(\"Accepted\")\n```\n\n### Worked example\n\n```python\nage = int(input(\"Age: \"))\nif age < 13:\n    print(\"Child\")\nelif age < 20:\n    print(\"Teenager\")\nelse:\n    print(\"Adult\")\nprint(\"Check complete\")\n```",
      "conceptEn": "### Essential idea\n\nUse `if`, `elif` and `else` to choose one branch.\n\nPython checks conditions from top to bottom and runs the first matching branch; `else` handles all remaining cases.\n\nComparison operators are `==`, `!=`, `<`, `>`, `<=` and `>=`.\n\nCombine complete conditions with `and` (both true), `or` (at least one true) and `not` (invert).\n\nNormalize text with `.lower()` if a response should be case-insensitive.\n\n```python\ntemperature = 18\nif temperature < 20:\n    print(\"Wear a jacket\")\n```\n\n### Key syntax\n\nA colon starts each branch.\n\nIndentation defines the block: use four spaces consistently as the style convention, not a fixed language requirement.\n\nKeep `elif` and `else` aligned with `if`.\n\n```python\ncolour = \"BLUE\".lower()\nif colour == \"red\" or colour == \"blue\":\n    print(\"Accepted\")\n```\n\n### Worked example\n\n```python\nage = int(input(\"Age: \"))\nif age < 13:\n    print(\"Child\")\nelif age < 20:\n    print(\"Teenager\")\nelse:\n    print(\"Adult\")\nprint(\"Check complete\")\n```",
      "codeExample": "age = int(input(\"Age: \"))\nif age < 13:\n    print(\"Child\")\nelif age < 20:\n    print(\"Teenager\")\nelse:\n    print(\"Adult\")\nprint(\"Check complete\")",
      "pitfalls": "- Use `==` to compare; `=` assigns.\n\n- Write `colour == \"red\" or colour == \"blue\"`, not `colour == \"red\" or \"blue\"`.\n\n- Check boundary values so overlapping conditions select the intended branch.",
      "pitfallsEn": "- Use `==` to compare; `=` assigns.\n\n- Write `colour == \"red\" or colour == \"blue\"`, not `colour == \"red\" or \"blue\"`.\n\n- Check boundary values so overlapping conditions select the intended branch.",
      "practiceTask": "Add a branch for age 65 or above. Test ages 12, 13, 19, 20 and 65.",
      "practiceTaskEn": "Add a branch for age 65 or above. Test ages 12, 13, 19, 20 and 65.",
      "quiz": [
        {
          "type": "mcq",
          "q": "Which operator tests equality?",
          "qEn": "Which operator tests equality?",
          "options": [
            "=",
            "==",
            "!=",
            "<="
          ],
          "optionsEn": [
            "=",
            "==",
            "!=",
            "<="
          ],
          "answer": 1,
          "explanation": "=="
        },
        {
          "type": "mcq",
          "q": "When does else run?",
          "qEn": "When does else run?",
          "options": [
            "Always",
            "Before if",
            "When previous branches are false",
            "Only for numbers"
          ],
          "optionsEn": [
            "Always",
            "Before if",
            "When previous branches are false",
            "Only for numbers"
          ],
          "answer": 2,
          "explanation": "When previous branches are false"
        },
        {
          "type": "mcq",
          "q": "What does and require?",
          "qEn": "What does and require?",
          "options": [
            "Both conditions true",
            "Either condition true",
            "Both false",
            "One string"
          ],
          "optionsEn": [
            "Both conditions true",
            "Either condition true",
            "Both false",
            "One string"
          ],
          "answer": 0,
          "explanation": "Both conditions true"
        },
        {
          "type": "mcq",
          "q": "Which keyword adds another condition?",
          "qEn": "Which keyword adds another condition?",
          "options": [
            "otherwise",
            "elseif",
            "elif",
            "then"
          ],
          "optionsEn": [
            "otherwise",
            "elseif",
            "elif",
            "then"
          ],
          "answer": 2,
          "explanation": "elif"
        },
        {
          "type": "fill",
          "q": "Complete the alternative branch",
          "qEn": "Complete the alternative branch",
          "codeBefore": "if age < 18:\n    print(\"Minor\")\n",
          "codeAfter": ":\n    print(\"Adult\")",
          "answer": "else"
        }
      ]
    },
    "chapter": {
      "lessonId": "m2-1-ifelse",
      "title": "If Statements",
      "first": 12,
      "last": 19
    }
  },
  {
    "lesson": {
      "id": "book-strings",
      "moduleId": "m1-basics",
      "order": 3,
      "title": "Strings",
      "titleEn": "Strings",
      "emoji": "🔤",
      "concept": "### Essential idea\n\nA string is an ordered sequence of characters. `len(text)` counts characters, including spaces.\n\nJoin strings with `+`; repeat a string with `*`.\n\nString methods return new strings, so assign the result when you want to keep it.\n\nUse `.lower()`, `.upper()` and `.title()` for case changes.\n\nIndexing starts at zero: `word[0]` is the first character.\n\nA slice `word[start:stop]` includes start but excludes stop.\n\nThese operations support name formatting and word transformations.\n\n```python\nword = \"Python\"\nprint(len(word))   # 6\nprint(word[:3])    # Pyt\n```\n\n### Key syntax\n\n`text[:3]` selects the first three characters. `text[1:]` selects everything after the first character. `.strip()` removes leading and trailing whitespace, not spaces within the text.\n\n```python\ntext = \"  hello  \"\nprint(text.strip().upper())  # HELLO\n```\n\n### Worked example\n\n```python\nfirst = input(\"First name: \").strip().title()\nsurname = input(\"Surname: \").strip().title()\nfull_name = first + \" \" + surname\nprint(full_name)\nprint(\"Characters:\", len(full_name))\nprint(\"Initial:\", first[:1])\n```",
      "conceptEn": "### Essential idea\n\nA string is an ordered sequence of characters. `len(text)` counts characters, including spaces.\n\nJoin strings with `+`; repeat a string with `*`.\n\nString methods return new strings, so assign the result when you want to keep it.\n\nUse `.lower()`, `.upper()` and `.title()` for case changes.\n\nIndexing starts at zero: `word[0]` is the first character.\n\nA slice `word[start:stop]` includes start but excludes stop.\n\nThese operations support name formatting and word transformations.\n\n```python\nword = \"Python\"\nprint(len(word))   # 6\nprint(word[:3])    # Pyt\n```\n\n### Key syntax\n\n`text[:3]` selects the first three characters. `text[1:]` selects everything after the first character. `.strip()` removes leading and trailing whitespace, not spaces within the text.\n\n```python\ntext = \"  hello  \"\nprint(text.strip().upper())  # HELLO\n```\n\n### Worked example\n\n```python\nfirst = input(\"First name: \").strip().title()\nsurname = input(\"Surname: \").strip().title()\nfull_name = first + \" \" + surname\nprint(full_name)\nprint(\"Characters:\", len(full_name))\nprint(\"Initial:\", first[:1])\n```",
      "codeExample": "first = input(\"First name: \").strip().title()\nsurname = input(\"Surname: \").strip().title()\nfull_name = first + \" \" + surname\nprint(full_name)\nprint(\"Characters:\", len(full_name))\nprint(\"Initial:\", first[:1])",
      "pitfalls": "- Spaces count toward string length.\n\n- Strings cannot be changed by assigning `text[0] = ...`; build a new string.\n\n- An empty string has no first character; use a slice or check before indexing.",
      "pitfallsEn": "- Spaces count toward string length.\n\n- Strings cannot be changed by assigning `text[0] = ...`; build a new string.\n\n- An empty string has no first character; use a slice or check before indexing.",
      "practiceTask": "Read a word, display its length and uppercase version, then separate the first character from the remaining characters.",
      "practiceTaskEn": "Read a word, display its length and uppercase version, then separate the first character from the remaining characters.",
      "quiz": [
        {
          "type": "mcq",
          "q": "First character index?",
          "qEn": "First character index?",
          "options": [
            "1",
            "0",
            "-1",
            "2"
          ],
          "optionsEn": [
            "1",
            "0",
            "-1",
            "2"
          ],
          "answer": 1,
          "explanation": "0"
        },
        {
          "type": "mcq",
          "q": "What is len(\"a b\")?",
          "qEn": "What is len(\"a b\")?",
          "options": [
            "2",
            "1",
            "3",
            "4"
          ],
          "optionsEn": [
            "2",
            "1",
            "3",
            "4"
          ],
          "answer": 2,
          "explanation": "3"
        },
        {
          "type": "mcq",
          "q": "What does upper() return?",
          "qEn": "What does upper() return?",
          "options": [
            "A new uppercase string",
            "A number",
            "Nothing",
            "A list"
          ],
          "optionsEn": [
            "A new uppercase string",
            "A number",
            "Nothing",
            "A list"
          ],
          "answer": 0,
          "explanation": "A new uppercase string"
        },
        {
          "type": "mcq",
          "q": "What does word[1:] exclude?",
          "qEn": "What does word[1:] exclude?",
          "options": [
            "Last character",
            "All characters",
            "First character",
            "Spaces only"
          ],
          "optionsEn": [
            "Last character",
            "All characters",
            "First character",
            "Spaces only"
          ],
          "answer": 2,
          "explanation": "First character"
        },
        {
          "type": "fill",
          "q": "Convert text to lowercase",
          "qEn": "Convert text to lowercase",
          "codeBefore": "print(\"PYTHON\".",
          "codeAfter": "())",
          "answer": "lower"
        }
      ]
    },
    "chapter": {
      "lessonId": "book-strings",
      "title": "Strings",
      "first": 20,
      "last": 26
    }
  },
  {
    "lesson": {
      "id": "book-maths",
      "moduleId": "m1-basics",
      "order": 4,
      "title": "Maths",
      "titleEn": "Maths",
      "emoji": "➗",
      "concept": "### Essential idea\n\nUse `float()` for decimal input and `round(value, digits)` to round a result.\n\nFormatting with an f-string such as `f\"{value:.2f}\"` displays exactly two decimal places; rounding alone does not guarantee trailing zeros.\n\n`//` gives floor division and `%` gives the remainder.\n\nFor non-negative whole numbers, these describe a quotient and leftover amount.\n\nImport `math` for `math.sqrt()` and `math.pi`.\n\nA circle has area pi times radius squared; a cylinder multiplies that area by its height.\n\n```python\nprint(23 // 5)  # 4 whole groups\nprint(23 % 5)   # 3 left over\n```\n\n### Key syntax\n\n`a ** 2` squares a value. `math.sqrt(a)` calculates a real square root for a non-negative input. `/` produces a float; `//` rounds the quotient down, including for negative operands.\n\n```python\nimport math\nprint(math.sqrt(16))  # 4.0\nprint(f\"{2.5:.2f}\")   # 2.50\n```\n\n### Worked example\n\n```python\nimport math\n\nradius = float(input(\"Radius: \"))\narea = math.pi * radius ** 2\nprint(f\"Area: {area:.2f}\")\nprint(\"Whole groups:\", 23 // 5)\nprint(\"Left over:\", 23 % 5)\n```",
      "conceptEn": "### Essential idea\n\nUse `float()` for decimal input and `round(value, digits)` to round a result.\n\nFormatting with an f-string such as `f\"{value:.2f}\"` displays exactly two decimal places; rounding alone does not guarantee trailing zeros.\n\n`//` gives floor division and `%` gives the remainder.\n\nFor non-negative whole numbers, these describe a quotient and leftover amount.\n\nImport `math` for `math.sqrt()` and `math.pi`.\n\nA circle has area pi times radius squared; a cylinder multiplies that area by its height.\n\n```python\nprint(23 // 5)  # 4 whole groups\nprint(23 % 5)   # 3 left over\n```\n\n### Key syntax\n\n`a ** 2` squares a value. `math.sqrt(a)` calculates a real square root for a non-negative input. `/` produces a float; `//` rounds the quotient down, including for negative operands.\n\n```python\nimport math\nprint(math.sqrt(16))  # 4.0\nprint(f\"{2.5:.2f}\")   # 2.50\n```\n\n### Worked example\n\n```python\nimport math\n\nradius = float(input(\"Radius: \"))\narea = math.pi * radius ** 2\nprint(f\"Area: {area:.2f}\")\nprint(\"Whole groups:\", 23 // 5)\nprint(\"Left over:\", 23 % 5)\n```",
      "codeExample": "import math\n\nradius = float(input(\"Radius: \"))\narea = math.pi * radius ** 2\nprint(f\"Area: {area:.2f}\")\nprint(\"Whole groups:\", 23 // 5)\nprint(\"Left over:\", 23 % 5)",
      "pitfalls": "- Import math before using its names.\n\n- `^` is not exponentiation; use `**`.\n\n- For negative numbers, floor division rounds toward negative infinity.",
      "pitfallsEn": "- Import math before using its names.\n\n- `^` is not exponentiation; use `**`.\n\n- For negative numbers, floor division rounds toward negative infinity.",
      "practiceTask": "Add a height input and display cylinder volume to three decimal places. Check radius 2 and height 5.",
      "practiceTaskEn": "Add a height input and display cylinder volume to three decimal places. Check radius 2 and height 5.",
      "quiz": [
        {
          "type": "mcq",
          "q": "Remainder operator?",
          "qEn": "Remainder operator?",
          "options": [
            "/",
            "//",
            "%",
            "**"
          ],
          "optionsEn": [
            "/",
            "//",
            "%",
            "**"
          ],
          "answer": 2,
          "explanation": "%"
        },
        {
          "type": "mcq",
          "q": "23 // 5 equals?",
          "qEn": "23 // 5 equals?",
          "options": [
            "4",
            "3",
            "4.6",
            "5"
          ],
          "optionsEn": [
            "4",
            "3",
            "4.6",
            "5"
          ],
          "answer": 0,
          "explanation": "4"
        },
        {
          "type": "mcq",
          "q": "Square root function?",
          "qEn": "Square root function?",
          "options": [
            "math.root",
            "sqrt.math",
            "math.sqrt",
            "math.square"
          ],
          "optionsEn": [
            "math.root",
            "sqrt.math",
            "math.sqrt",
            "math.square"
          ],
          "answer": 2,
          "explanation": "math.sqrt"
        },
        {
          "type": "mcq",
          "q": "Does round(2.5, 2) guarantee two displayed decimal digits?",
          "qEn": "Does round(2.5, 2) guarantee two displayed decimal digits?",
          "options": [
            "Yes",
            "No",
            "Only on Windows",
            "Only for ints"
          ],
          "optionsEn": [
            "Yes",
            "No",
            "Only on Windows",
            "Only for ints"
          ],
          "answer": 1,
          "explanation": "No"
        },
        {
          "type": "fill",
          "q": "Import the standard maths module",
          "qEn": "Import the standard maths module",
          "codeBefore": "import ",
          "codeAfter": "",
          "answer": "math"
        }
      ]
    },
    "chapter": {
      "lessonId": "book-maths",
      "title": "Maths",
      "first": 27,
      "last": 34
    }
  },
  {
    "lesson": {
      "id": "m2-l2-forloop",
      "moduleId": "m2-flow",
      "order": 5,
      "title": "For Loop",
      "titleEn": "For Loop",
      "emoji": "🔁",
      "concept": "### Essential idea\n\nA `for` loop repeats an action for each item in a sequence.\n\nLoop through characters in a string or use `range()` for a sequence of whole numbers.\n\nInitialize totals before a loop; update them inside the block.\n\nA statement after the block runs once after the loop ends.\n\n```python\ntotal = 0\nfor number in range(1, 4):\n    total += number\nprint(total)  # 6\n```\n\n### Key syntax\n\n`range(stop)` starts at zero. `range(start, stop, step)` excludes stop.\n\nA negative step counts down, for example `range(5, 0, -1)`.\n\nA step cannot be zero.\n\n```python\nfor number in range(3, 0, -1):\n    print(number)  # 3, then 2, then 1\n```\n\n### Worked example\n\n```python\nnumber = int(input(\"Table number: \"))\nfor multiplier in range(1, 11):\n    print(number, \"x\", multiplier, \"=\", number * multiplier)\n\nfor letter in \"CODE\":\n    print(letter)\n```",
      "conceptEn": "### Essential idea\n\nA `for` loop repeats an action for each item in a sequence.\n\nLoop through characters in a string or use `range()` for a sequence of whole numbers.\n\nInitialize totals before a loop; update them inside the block.\n\nA statement after the block runs once after the loop ends.\n\n```python\ntotal = 0\nfor number in range(1, 4):\n    total += number\nprint(total)  # 6\n```\n\n### Key syntax\n\n`range(stop)` starts at zero. `range(start, stop, step)` excludes stop.\n\nA negative step counts down, for example `range(5, 0, -1)`.\n\nA step cannot be zero.\n\n```python\nfor number in range(3, 0, -1):\n    print(number)  # 3, then 2, then 1\n```\n\n### Worked example\n\n```python\nnumber = int(input(\"Table number: \"))\nfor multiplier in range(1, 11):\n    print(number, \"x\", multiplier, \"=\", number * multiplier)\n\nfor letter in \"CODE\":\n    print(letter)\n```",
      "codeExample": "number = int(input(\"Table number: \"))\nfor multiplier in range(1, 11):\n    print(number, \"x\", multiplier, \"=\", number * multiplier)\n\nfor letter in \"CODE\":\n    print(letter)",
      "pitfalls": "- To include 10, use a stop value of 11.\n\n- Indent every line that should repeat.\n\n- Choose a step direction that can reach the stopping boundary.",
      "pitfallsEn": "- To include 10, use a stop value of 11.\n\n- Indent every line that should repeat.\n\n- Choose a step direction that can reach the stopping boundary.",
      "practiceTask": "Print a countdown from 10 to 1, then print \"Go\" once. Add a total of numbers from 1 to 10.",
      "practiceTaskEn": "Print a countdown from 10 to 1, then print \"Go\" once. Add a total of numbers from 1 to 10.",
      "quiz": [
        {
          "type": "mcq",
          "q": "range(3) produces?",
          "qEn": "range(3) produces?",
          "options": [
            "1,2,3",
            "0,1,2",
            "0,1,2,3",
            "3"
          ],
          "optionsEn": [
            "1,2,3",
            "0,1,2",
            "0,1,2,3",
            "3"
          ],
          "answer": 1,
          "explanation": "0,1,2"
        },
        {
          "type": "mcq",
          "q": "Which counts 3,2,1?",
          "qEn": "Which counts 3,2,1?",
          "options": [
            "range(3,0,-1)",
            "range(3,1)",
            "range(1,3)",
            "range(3,0)"
          ],
          "optionsEn": [
            "range(3,0,-1)",
            "range(3,1)",
            "range(1,3)",
            "range(3,0)"
          ],
          "answer": 0,
          "explanation": "range(3,0,-1)"
        },
        {
          "type": "mcq",
          "q": "Where is a running total initialized?",
          "qEn": "Where is a running total initialized?",
          "options": [
            "Inside every iteration",
            "After the loop",
            "Before the loop",
            "In print only"
          ],
          "optionsEn": [
            "Inside every iteration",
            "After the loop",
            "Before the loop",
            "In print only"
          ],
          "answer": 2,
          "explanation": "Before the loop"
        },
        {
          "type": "mcq",
          "q": "Is range stop included?",
          "qEn": "Is range stop included?",
          "options": [
            "Yes",
            "No",
            "Only when positive",
            "Only for strings"
          ],
          "optionsEn": [
            "Yes",
            "No",
            "Only when positive",
            "Only for strings"
          ],
          "answer": 1,
          "explanation": "No"
        },
        {
          "type": "fill",
          "q": "Create a sequence of 0 through 4",
          "qEn": "Create a sequence of 0 through 4",
          "codeBefore": "for i in ",
          "codeAfter": "(5):\n    print(i)",
          "answer": "range"
        }
      ]
    },
    "chapter": {
      "lessonId": "m2-l2-forloop",
      "title": "For Loop",
      "first": 35,
      "last": 44
    }
  },
  {
    "lesson": {
      "id": "m2-l3-while",
      "moduleId": "m2-flow",
      "order": 6,
      "title": "While Loop",
      "titleEn": "While Loop",
      "emoji": "♾️",
      "concept": "### Essential idea\n\nA `while` loop repeats while its condition is true.\n\nIt checks the condition before each iteration, so the body can run zero times.\n\nUse it when the number of attempts or entries is not known in advance.\n\nKeep a counter or total outside the loop, then update it inside.\n\nA new user response can change the condition. `break` exits the nearest loop immediately; `continue` skips the rest of the current iteration.\n\n```python\ncount = 1\nwhile count <= 3:\n    print(count)\n    count += 1\n```\n\n### Key syntax\n\nPlan an exit before running a loop.\n\nA sentinel is a special value such as `\"stop\"` used to end input.\n\nDo not include the sentinel in the total.\n\n```python\nvalue = \"stop\"\nwhile value != \"stop\":\n    print(value)\n    value = \"stop\"\nprint(\"Finished\")  # The body ran zero times\n```\n\n### Worked example\n\n```python\ntotal = 0\nvalue = input(\"Number or stop: \").lower()\nwhile value != \"stop\":\n    total += int(value)\n    value = input(\"Number or stop: \").lower()\nprint(f\"Total: {total}\\nThank you.\")\n```",
      "conceptEn": "### Essential idea\n\nA `while` loop repeats while its condition is true.\n\nIt checks the condition before each iteration, so the body can run zero times.\n\nUse it when the number of attempts or entries is not known in advance.\n\nKeep a counter or total outside the loop, then update it inside.\n\nA new user response can change the condition. `break` exits the nearest loop immediately; `continue` skips the rest of the current iteration.\n\n```python\ncount = 1\nwhile count <= 3:\n    print(count)\n    count += 1\n```\n\n### Key syntax\n\nPlan an exit before running a loop.\n\nA sentinel is a special value such as `\"stop\"` used to end input.\n\nDo not include the sentinel in the total.\n\n```python\nvalue = \"stop\"\nwhile value != \"stop\":\n    print(value)\n    value = \"stop\"\nprint(\"Finished\")  # The body ran zero times\n```\n\n### Worked example\n\n```python\ntotal = 0\nvalue = input(\"Number or stop: \").lower()\nwhile value != \"stop\":\n    total += int(value)\n    value = input(\"Number or stop: \").lower()\nprint(f\"Total: {total}\\nThank you.\")\n```",
      "codeExample": "total = 0\nvalue = input(\"Number or stop: \").lower()\nwhile value != \"stop\":\n    total += int(value)\n    value = input(\"Number or stop: \").lower()\nprint(f\"Total: {total}\\nThank you.\")",
      "pitfalls": "- Read a new value or update the condition inside the loop.\n\n- A condition initially false means zero iterations.\n\n- Do not write an infinite loop without an exit path.",
      "pitfallsEn": "- Read a new value or update the condition inside the loop.\n\n- A condition initially false means zero iterations.\n\n- Do not write an infinite loop without an exit path.",
      "practiceTask": "Count how many numbers were entered before \"stop\". Test an immediate stop, one number and three numbers.",
      "practiceTaskEn": "Count how many numbers were entered before \"stop\". Test an immediate stop, one number and three numbers.",
      "quiz": [
        {
          "type": "mcq",
          "q": "When is the condition checked?",
          "qEn": "When is the condition checked?",
          "options": [
            "Only after the loop",
            "Before each iteration",
            "Only once",
            "Never"
          ],
          "optionsEn": [
            "Only after the loop",
            "Before each iteration",
            "Only once",
            "Never"
          ],
          "answer": 1,
          "explanation": "Before each iteration"
        },
        {
          "type": "mcq",
          "q": "Exit keyword?",
          "qEn": "Exit keyword?",
          "options": [
            "skip",
            "stop",
            "break",
            "exitloop"
          ],
          "optionsEn": [
            "skip",
            "stop",
            "break",
            "exitloop"
          ],
          "answer": 2,
          "explanation": "break"
        },
        {
          "type": "mcq",
          "q": "A false initial condition causes?",
          "qEn": "A false initial condition causes?",
          "options": [
            "One iteration",
            "An error",
            "Zero iterations",
            "Infinite iterations"
          ],
          "optionsEn": [
            "One iteration",
            "An error",
            "Zero iterations",
            "Infinite iterations"
          ],
          "answer": 2,
          "explanation": "Zero iterations"
        },
        {
          "type": "mcq",
          "q": "A sentinel is?",
          "qEn": "A sentinel is?",
          "options": [
            "A stopping value",
            "A package",
            "A data type",
            "A comparison operator"
          ],
          "optionsEn": [
            "A stopping value",
            "A package",
            "A data type",
            "A comparison operator"
          ],
          "answer": 0,
          "explanation": "A stopping value"
        },
        {
          "type": "fill",
          "q": "Repeat while total is below 20",
          "qEn": "Repeat while total is below 20",
          "codeBefore": "",
          "codeAfter": " total < 20:\n    total += 1",
          "answer": "while"
        }
      ]
    },
    "chapter": {
      "lessonId": "m2-l3-while",
      "title": "While Loop",
      "first": 45,
      "last": 51
    }
  },
  {
    "lesson": {
      "id": "book-random",
      "moduleId": "m2-flow",
      "order": 7,
      "title": "Random",
      "titleEn": "Random",
      "emoji": "🎲",
      "concept": "### Essential idea\n\nImport `random` to generate pseudo-random values. `random.randint(a, b)` selects an integer including both endpoints. `random.choice(sequence)` chooses one item from a non-empty sequence. `random.random()` produces a float from zero inclusive to one exclusive.\n\nGenerate a secret value once before a guessing loop so the target stays the same.\n\nCompare each guess with the target and update an attempt counter.\n\nRandom choices are useful for practice games, not for storing passwords or creating secure tokens.\n\n```python\nimport random\ndice = random.randint(1, 6)\nprint(1 <= dice <= 6)  # True\n```\n\n### Key syntax\n\nUse `random.seed(7)` when you need repeatable debugging.\n\nA seed is not required for normal play.\n\nRandom output may differ between runs.\n\n```python\nimport random\nrandom.seed(7)\nprint(random.choice([\"red\", \"blue\"]))\n```\n\n### Worked example\n\n```python\nimport random\n\nsecret = random.randint(1, 10)\nguess = int(input(\"Guess 1-10: \"))\nif guess == secret:\n    print(\"Correct\")\nelse:\n    print(\"The number was\", secret)\nprint(\"Colour:\", random.choice([\"red\", \"blue\", \"green\"]))\n```",
      "conceptEn": "### Essential idea\n\nImport `random` to generate pseudo-random values. `random.randint(a, b)` selects an integer including both endpoints. `random.choice(sequence)` chooses one item from a non-empty sequence. `random.random()` produces a float from zero inclusive to one exclusive.\n\nGenerate a secret value once before a guessing loop so the target stays the same.\n\nCompare each guess with the target and update an attempt counter.\n\nRandom choices are useful for practice games, not for storing passwords or creating secure tokens.\n\n```python\nimport random\ndice = random.randint(1, 6)\nprint(1 <= dice <= 6)  # True\n```\n\n### Key syntax\n\nUse `random.seed(7)` when you need repeatable debugging.\n\nA seed is not required for normal play.\n\nRandom output may differ between runs.\n\n```python\nimport random\nrandom.seed(7)\nprint(random.choice([\"red\", \"blue\"]))\n```\n\n### Worked example\n\n```python\nimport random\n\nsecret = random.randint(1, 10)\nguess = int(input(\"Guess 1-10: \"))\nif guess == secret:\n    print(\"Correct\")\nelse:\n    print(\"The number was\", secret)\nprint(\"Colour:\", random.choice([\"red\", \"blue\", \"green\"]))\n```",
      "codeExample": "import random\n\nsecret = random.randint(1, 10)\nguess = int(input(\"Guess 1-10: \"))\nif guess == secret:\n    print(\"Correct\")\nelse:\n    print(\"The number was\", secret)\nprint(\"Colour:\", random.choice([\"red\", \"blue\", \"green\"]))",
      "pitfalls": "- randint includes both its lower and upper limits.\n\n- Do not regenerate the target after each guess.\n\n- choice cannot choose from an empty list.",
      "pitfallsEn": "- randint includes both its lower and upper limits.\n\n- Do not regenerate the target after each guess.\n\n- choice cannot choose from an empty list.",
      "practiceTask": "Turn the example into a repeating guessing game. Keep the target outside the loop and report the number of attempts.",
      "practiceTaskEn": "Turn the example into a repeating guessing game. Keep the target outside the loop and report the number of attempts.",
      "quiz": [
        {
          "type": "mcq",
          "q": "randint(1, 6) can return?",
          "qEn": "randint(1, 6) can return?",
          "options": [
            "0",
            "7",
            "6",
            "6.5"
          ],
          "optionsEn": [
            "0",
            "7",
            "6",
            "6.5"
          ],
          "answer": 2,
          "explanation": "6"
        },
        {
          "type": "mcq",
          "q": "Choose a list item with?",
          "qEn": "Choose a list item with?",
          "options": [
            "random.choice",
            "random.item",
            "random.list",
            "random.pickall"
          ],
          "optionsEn": [
            "random.choice",
            "random.item",
            "random.list",
            "random.pickall"
          ],
          "answer": 0,
          "explanation": "random.choice"
        },
        {
          "type": "mcq",
          "q": "Where should a guessing target be generated?",
          "qEn": "Where should a guessing target be generated?",
          "options": [
            "On every guess",
            "Once before the loop",
            "After all guesses",
            "Inside print"
          ],
          "optionsEn": [
            "On every guess",
            "Once before the loop",
            "After all guesses",
            "Inside print"
          ],
          "answer": 1,
          "explanation": "Once before the loop"
        },
        {
          "type": "mcq",
          "q": "random.random() may return 1.0?",
          "qEn": "random.random() may return 1.0?",
          "options": [
            "Yes",
            "No",
            "Always",
            "Only with seed"
          ],
          "optionsEn": [
            "Yes",
            "No",
            "Always",
            "Only with seed"
          ],
          "answer": 1,
          "explanation": "No"
        },
        {
          "type": "fill",
          "q": "Import the random module",
          "qEn": "Import the random module",
          "codeBefore": "import ",
          "codeAfter": "",
          "answer": "random"
        }
      ]
    },
    "chapter": {
      "lessonId": "book-random",
      "title": "Random",
      "first": 52,
      "last": 59
    }
  },
  {
    "lesson": {
      "id": "book-turtle",
      "moduleId": "m2-flow",
      "order": 8,
      "title": "Turtle Graphics",
      "titleEn": "Turtle Graphics",
      "emoji": "🐢",
      "concept": "### Essential idea\n\nTurtle graphics turns movement into a drawing. `forward(distance)` moves in the current direction; `left(angle)` and `right(angle)` rotate by degrees.\n\nUse `penup()` to move without drawing and `pendown()` to draw again.\n\nRegular polygons repeat equal-length sides and an exterior turn of `360 / sides`.\n\nUse `pencolor()` for line colour and `begin_fill()` / `end_fill()` around a closed shape. `circle()` draws a circle.\n\nCombine loops and random colours to create patterns.\n\n```python\nsides = 4\nprint(360 / sides)  # Turn 90 degrees after each side\n```\n\n### Key syntax\n\nThe book uses a desktop turtle window.\n\nThe challenge workspace supplies a drawing adapter for supported turtle commands.\n\nThe lesson example below checks polygon turns in the console; native turtle windows are not available in this lesson playground.\n\n```python\ndistance = 80\nfor side in range(4):\n    print(\"Move\", distance, \"then turn 90 degrees\")\n```\n\n### Worked example\n\n```python\nsides = 5\nturn = 360 / sides\nfor side in range(sides):\n    print(\"Forward 80; turn\", turn)\nprint(\"Total turn:\", sides * turn)\n```",
      "conceptEn": "### Essential idea\n\nTurtle graphics turns movement into a drawing. `forward(distance)` moves in the current direction; `left(angle)` and `right(angle)` rotate by degrees.\n\nUse `penup()` to move without drawing and `pendown()` to draw again.\n\nRegular polygons repeat equal-length sides and an exterior turn of `360 / sides`.\n\nUse `pencolor()` for line colour and `begin_fill()` / `end_fill()` around a closed shape. `circle()` draws a circle.\n\nCombine loops and random colours to create patterns.\n\n```python\nsides = 4\nprint(360 / sides)  # Turn 90 degrees after each side\n```\n\n### Key syntax\n\nThe book uses a desktop turtle window.\n\nThe challenge workspace supplies a drawing adapter for supported turtle commands.\n\nThe lesson example below checks polygon turns in the console; native turtle windows are not available in this lesson playground.\n\n```python\ndistance = 80\nfor side in range(4):\n    print(\"Move\", distance, \"then turn 90 degrees\")\n```\n\n### Worked example\n\n```python\nsides = 5\nturn = 360 / sides\nfor side in range(sides):\n    print(\"Forward 80; turn\", turn)\nprint(\"Total turn:\", sides * turn)\n```",
      "codeExample": "sides = 5\nturn = 360 / sides\nfor side in range(sides):\n    print(\"Forward 80; turn\", turn)\nprint(\"Total turn:\", sides * turn)",
      "pitfalls": "- Use the exterior turn, not the polygon interior angle.\n\n- Raise the pen before moving to a new starting position.\n\n- Close a shape before ending a fill.",
      "pitfallsEn": "- Use the exterior turn, not the polygon interior angle.\n\n- Raise the pen before moving to a new starting position.\n\n- Close a shape before ending a fill.",
      "practiceTask": "In the Turtle Graphics challenges, draw a square with a loop, then a triangle. Use penup and pendown to separate the shapes.",
      "practiceTaskEn": "In the Turtle Graphics challenges, draw a square with a loop, then a triangle. Use penup and pendown to separate the shapes.",
      "quiz": [
        {
          "type": "mcq",
          "q": "Pentagon exterior turn?",
          "qEn": "Pentagon exterior turn?",
          "options": [
            "108",
            "90",
            "72",
            "60"
          ],
          "optionsEn": [
            "108",
            "90",
            "72",
            "60"
          ],
          "answer": 2,
          "explanation": "72"
        },
        {
          "type": "mcq",
          "q": "Move without a line?",
          "qEn": "Move without a line?",
          "options": [
            "pendown",
            "penup",
            "begin_fill",
            "circle"
          ],
          "optionsEn": [
            "pendown",
            "penup",
            "begin_fill",
            "circle"
          ],
          "answer": 1,
          "explanation": "penup"
        },
        {
          "type": "mcq",
          "q": "Four equal sides and 90-degree turns draw?",
          "qEn": "Four equal sides and 90-degree turns draw?",
          "options": [
            "Triangle",
            "Circle",
            "Square",
            "Pentagon"
          ],
          "optionsEn": [
            "Triangle",
            "Circle",
            "Square",
            "Pentagon"
          ],
          "answer": 2,
          "explanation": "Square"
        },
        {
          "type": "mcq",
          "q": "Finish a filled shape with?",
          "qEn": "Finish a filled shape with?",
          "options": [
            "end_fill",
            "stop_fill",
            "fill_end",
            "closefill"
          ],
          "optionsEn": [
            "end_fill",
            "stop_fill",
            "fill_end",
            "closefill"
          ],
          "answer": 0,
          "explanation": "end_fill"
        },
        {
          "type": "fill",
          "q": "Compute the exterior turn",
          "qEn": "Compute the exterior turn",
          "codeBefore": "turn = 360 / ",
          "codeAfter": "",
          "answer": "sides"
        }
      ]
    },
    "chapter": {
      "lessonId": "book-turtle",
      "title": "Turtle Graphics",
      "first": 60,
      "last": 68,
      "desktopExample": "import turtle\n\nfor side in range(4):\n    turtle.forward(80)\n    turtle.right(90)\nturtle.done()"
    }
  },
  {
    "lesson": {
      "id": "m3-l1-list",
      "moduleId": "m3-data",
      "order": 9,
      "title": "Tuples, Lists and Dictionaries",
      "titleEn": "Tuples, Lists and Dictionaries",
      "emoji": "📦",
      "concept": "### Essential idea\n\nA tuple stores an ordered collection whose items cannot be reassigned.\n\nA list is ordered and mutable.\n\nA dictionary maps hashable keys, such as names, to values.\n\nChoose a tuple for fixed options, a list for a changing sequence, or a dictionary for named lookups.\n\nIndex sequences from zero.\n\nUse list `.append()`, `.insert()`, `.remove()` and `.pop()` to edit items. `.index()` finds a position and `.count()` counts matches. `.sort()` changes a list in place and returns None.\n\nDictionary access `data[key]` requires an existing key; `.get()` can supply a default.\n\n```python\nnames = [\"Ava\"]\nnames.append(\"Mia\")\nages = {\"Ava\": 20}\nprint(names[1], ages[\"Ava\"])  # Mia 20\n```\n\n### Key syntax\n\nBrackets distinguish forms: `[1, 2]` list, `(1, 2)` tuple, `{\"name\": \"Ava\"}` dictionary.\n\nA one-item tuple needs a comma: `(1,)`. `in` checks values in a sequence but keys in a dictionary.\n\n```python\nsingle = (1,)\nprint(len(single))          # 1\nprint(\"Ava\" in {\"Ava\": 20})  # True\n```\n\n### Worked example\n\n```python\ncolours = (\"red\", \"blue\", \"green\")\nnames = [\"Ava\", \"Noah\"]\nnames.append(\"Mia\")\nnames.insert(1, \"Leo\")\nnames.remove(\"Noah\")\nnames.pop(0)\nnames.sort()\nprint(names)\nages = {\"Ava\": 20, \"Mia\": 21}\nprint(ages.get(\"Ava\", \"Unknown\"))\n```",
      "conceptEn": "### Essential idea\n\nA tuple stores an ordered collection whose items cannot be reassigned.\n\nA list is ordered and mutable.\n\nA dictionary maps hashable keys, such as names, to values.\n\nChoose a tuple for fixed options, a list for a changing sequence, or a dictionary for named lookups.\n\nIndex sequences from zero.\n\nUse list `.append()`, `.insert()`, `.remove()` and `.pop()` to edit items. `.index()` finds a position and `.count()` counts matches. `.sort()` changes a list in place and returns None.\n\nDictionary access `data[key]` requires an existing key; `.get()` can supply a default.\n\n```python\nnames = [\"Ava\"]\nnames.append(\"Mia\")\nages = {\"Ava\": 20}\nprint(names[1], ages[\"Ava\"])  # Mia 20\n```\n\n### Key syntax\n\nBrackets distinguish forms: `[1, 2]` list, `(1, 2)` tuple, `{\"name\": \"Ava\"}` dictionary.\n\nA one-item tuple needs a comma: `(1,)`. `in` checks values in a sequence but keys in a dictionary.\n\n```python\nsingle = (1,)\nprint(len(single))          # 1\nprint(\"Ava\" in {\"Ava\": 20})  # True\n```\n\n### Worked example\n\n```python\ncolours = (\"red\", \"blue\", \"green\")\nnames = [\"Ava\", \"Noah\"]\nnames.append(\"Mia\")\nnames.insert(1, \"Leo\")\nnames.remove(\"Noah\")\nnames.pop(0)\nnames.sort()\nprint(names)\nages = {\"Ava\": 20, \"Mia\": 21}\nprint(ages.get(\"Ava\", \"Unknown\"))\n```",
      "codeExample": "colours = (\"red\", \"blue\", \"green\")\nnames = [\"Ava\", \"Noah\"]\nnames.append(\"Mia\")\nnames.insert(1, \"Leo\")\nnames.remove(\"Noah\")\nnames.pop(0)\nnames.sort()\nprint(names)\nages = {\"Ava\": 20, \"Mia\": 21}\nprint(ages.get(\"Ava\", \"Unknown\"))",
      "pitfalls": "- A list index is not the same as its value.\n\n- remove deletes by value; pop deletes by index.\n\n- Dictionary keys must be hashable; not every tuple is hashable if it contains a list.",
      "pitfallsEn": "- A list index is not the same as its value.\n\n- remove deletes by value; pop deletes by index.\n\n- Dictionary keys must be hashable; not every tuple is hashable if it contains a list.",
      "practiceTask": "Build a guest list: add a name, check whether it exists, then remove it. Store guest ages in a dictionary.",
      "practiceTaskEn": "Build a guest list: add a name, check whether it exists, then remove it. Store guest ages in a dictionary.",
      "quiz": [
        {
          "type": "mcq",
          "q": "Which is mutable?",
          "qEn": "Which is mutable?",
          "options": [
            "A list",
            "A string",
            "A tuple of ints",
            "An int"
          ],
          "optionsEn": [
            "A list",
            "A string",
            "A tuple of ints",
            "An int"
          ],
          "answer": 0,
          "explanation": "A list"
        },
        {
          "type": "mcq",
          "q": "append adds where?",
          "qEn": "append adds where?",
          "options": [
            "At the start",
            "At the end",
            "At every index",
            "It removes"
          ],
          "optionsEn": [
            "At the start",
            "At the end",
            "At every index",
            "It removes"
          ],
          "answer": 1,
          "explanation": "At the end"
        },
        {
          "type": "mcq",
          "q": "Dictionary membership checks?",
          "qEn": "Dictionary membership checks?",
          "options": [
            "Values",
            "Keys",
            "Only positions",
            "Pairs only"
          ],
          "optionsEn": [
            "Values",
            "Keys",
            "Only positions",
            "Pairs only"
          ],
          "answer": 1,
          "explanation": "Keys"
        },
        {
          "type": "mcq",
          "q": "list.sort() returns?",
          "qEn": "list.sort() returns?",
          "options": [
            "A new list",
            "The largest item",
            "None",
            "An index"
          ],
          "optionsEn": [
            "A new list",
            "The largest item",
            "None",
            "An index"
          ],
          "answer": 2,
          "explanation": "None"
        },
        {
          "type": "fill",
          "q": "Add one item at the end",
          "qEn": "Add one item at the end",
          "codeBefore": "names.",
          "codeAfter": "(\"Sam\")",
          "answer": "append"
        }
      ]
    },
    "chapter": {
      "lessonId": "m3-l1-list",
      "title": "Tuples, Lists and Dictionaries",
      "first": 69,
      "last": 79
    }
  },
  {
    "lesson": {
      "id": "m3-l6-strings",
      "moduleId": "m3-data",
      "order": 10,
      "title": "More String Manipulation",
      "titleEn": "More String Manipulation",
      "emoji": "🔎",
      "concept": "### Essential idea\n\nUse slicing to extract a section of text: `text[start:stop]`.\n\nOmitted start means the beginning; omitted stop means the end.\n\nNegative indices count backward from the end.\n\nLooping through a string visits its characters one at a time.\n\n`.isalpha()` checks a non-empty string for letters only; spaces make it false. `.isdigit()` checks digit characters, not a general decimal or signed number. `.islower()` and `.isupper()` check cased characters.\n\nNormalize case before comparing repeated entries. `.count()` counts occurrences of a substring.\n\n```python\nword = \"Python\"\nprint(word[2:5])  # tho\nprint(word[-1])   # n\n```\n\n### Key syntax\n\n`text[-1]` is the last character. `text[:4]` takes the first four. `text[2:5]` takes positions 2, 3 and 4.\n\nStrings are immutable; methods return new values.\n\n```python\nprint(\"abc\".isalpha())  # True\nprint(\"3.5\".isdigit())  # False\n```\n\n### Worked example\n\n```python\nword = input(\"Word: \").strip()\nprint(\"First four:\", word[:4])\nprint(\"Letters only:\", word.isalpha())\nvowels = 0\nfor letter in word.lower():\n    if letter in \"aeiou\":\n        vowels += 1\nprint(\"Vowels:\", vowels)\nprint(\"Count of 'a':\", word.lower().count(\"a\"))\nfor letter in word:\n    print(letter)\n```",
      "conceptEn": "### Essential idea\n\nUse slicing to extract a section of text: `text[start:stop]`.\n\nOmitted start means the beginning; omitted stop means the end.\n\nNegative indices count backward from the end.\n\nLooping through a string visits its characters one at a time.\n\n`.isalpha()` checks a non-empty string for letters only; spaces make it false. `.isdigit()` checks digit characters, not a general decimal or signed number. `.islower()` and `.isupper()` check cased characters.\n\nNormalize case before comparing repeated entries. `.count()` counts occurrences of a substring.\n\n```python\nword = \"Python\"\nprint(word[2:5])  # tho\nprint(word[-1])   # n\n```\n\n### Key syntax\n\n`text[-1]` is the last character. `text[:4]` takes the first four. `text[2:5]` takes positions 2, 3 and 4.\n\nStrings are immutable; methods return new values.\n\n```python\nprint(\"abc\".isalpha())  # True\nprint(\"3.5\".isdigit())  # False\n```\n\n### Worked example\n\n```python\nword = input(\"Word: \").strip()\nprint(\"First four:\", word[:4])\nprint(\"Letters only:\", word.isalpha())\nvowels = 0\nfor letter in word.lower():\n    if letter in \"aeiou\":\n        vowels += 1\nprint(\"Vowels:\", vowels)\nprint(\"Count of 'a':\", word.lower().count(\"a\"))\nfor letter in word:\n    print(letter)\n```",
      "codeExample": "word = input(\"Word: \").strip()\nprint(\"First four:\", word[:4])\nprint(\"Letters only:\", word.isalpha())\nvowels = 0\nfor letter in word.lower():\n    if letter in \"aeiou\":\n        vowels += 1\nprint(\"Vowels:\", vowels)\nprint(\"Count of 'a':\", word.lower().count(\"a\"))\nfor letter in word:\n    print(letter)",
      "pitfalls": "- Stop indices are excluded.\n\n- isdigit does not accept minus signs or decimal points.\n\n- Assign case-conversion results if you need them later.",
      "pitfallsEn": "- Stop indices are excluded.\n\n- isdigit does not accept minus signs or decimal points.\n\n- Assign case-conversion results if you need them later.",
      "practiceTask": "Read a surname and show its first three characters. Count vowels using a normal for loop and an accumulator.",
      "practiceTaskEn": "Read a surname and show its first three characters. Count vowels using a normal for loop and an accumulator.",
      "quiz": [
        {
          "type": "mcq",
          "q": "text[2:5] contains how many positions?",
          "qEn": "text[2:5] contains how many positions?",
          "options": [
            "2",
            "3",
            "4",
            "5"
          ],
          "optionsEn": [
            "2",
            "3",
            "4",
            "5"
          ],
          "answer": 1,
          "explanation": "3"
        },
        {
          "type": "mcq",
          "q": "\"A B\".isalpha() is?",
          "qEn": "\"A B\".isalpha() is?",
          "options": [
            "True",
            "False",
            "None",
            "An error"
          ],
          "optionsEn": [
            "True",
            "False",
            "None",
            "An error"
          ],
          "answer": 1,
          "explanation": "False"
        },
        {
          "type": "mcq",
          "q": "Last character index?",
          "qEn": "Last character index?",
          "options": [
            "0",
            "1",
            "-1",
            "len(text)"
          ],
          "optionsEn": [
            "0",
            "1",
            "-1",
            "len(text)"
          ],
          "answer": 2,
          "explanation": "-1"
        },
        {
          "type": "mcq",
          "q": "\"3.5\".isdigit() is?",
          "qEn": "\"3.5\".isdigit() is?",
          "options": [
            "True",
            "False",
            "3.5",
            "An error"
          ],
          "optionsEn": [
            "True",
            "False",
            "3.5",
            "An error"
          ],
          "answer": 1,
          "explanation": "False"
        },
        {
          "type": "fill",
          "q": "Count occurrences of a substring",
          "qEn": "Count occurrences of a substring",
          "codeBefore": "print(\"banana\".",
          "codeAfter": "(\"a\"))",
          "answer": "count"
        }
      ]
    },
    "chapter": {
      "lessonId": "m3-l6-strings",
      "title": "More String Manipulation",
      "first": 80,
      "last": 87
    }
  },
  {
    "lesson": {
      "id": "book-arrays",
      "moduleId": "m3-data",
      "order": 11,
      "title": "Numeric Arrays",
      "titleEn": "Numeric Arrays",
      "emoji": "🔢",
      "concept": "### Essential idea\n\nThe standard `array` module stores values using one numeric type code.\n\nThis differs from a normal list, which can mix types.\n\nImport `array` and create an array with a type code and initial values.\n\nUse `\"i\"` for signed integers and `\"d\"` for double-precision floating-point values.\n\nThe book also demonstrates `\"f\"` for single-precision floats.\n\nArrays support indexing, loops, append, insert, remove, pop, count and index. `.extend(other)` adds multiple values; `.reverse()` reverses the order in place.\n\nUse a loop to collect acceptable input values.\n\nConvert an array to a list before using list sorting operations.\n\n```python\nfrom array import array\nvalues = array(\"i\", [2, 4])\nvalues.append(6)\nprint(values.tolist())  # [2, 4, 6]\n```\n\n### Key syntax\n\n`array(\"i\", [2, 4])` constructs an integer array. `sorted(values)` returns a list, not an array; rebuild with the same type code if an array is required.\n\n```python\nfrom array import array\nvalues = array(\"i\", [4, 2])\nordered = array(\"i\", sorted(values))\nprint(ordered.tolist())  # [2, 4]\n```\n\n### Worked example\n\n```python\nfrom array import array\n\nvalues = array(\"i\", [8, 3, 8, 5])\nvalues.append(10)\nprint(\"Occurrences of 8:\", values.count(8))\nprint(\"First 8 at:\", values.index(8))\nvalues.reverse()\nprint(\"Reversed:\", values.tolist())\nordered = array(\"i\", sorted(values))\nprint(ordered.tolist())\n```",
      "conceptEn": "### Essential idea\n\nThe standard `array` module stores values using one numeric type code.\n\nThis differs from a normal list, which can mix types.\n\nImport `array` and create an array with a type code and initial values.\n\nUse `\"i\"` for signed integers and `\"d\"` for double-precision floating-point values.\n\nThe book also demonstrates `\"f\"` for single-precision floats.\n\nArrays support indexing, loops, append, insert, remove, pop, count and index. `.extend(other)` adds multiple values; `.reverse()` reverses the order in place.\n\nUse a loop to collect acceptable input values.\n\nConvert an array to a list before using list sorting operations.\n\n```python\nfrom array import array\nvalues = array(\"i\", [2, 4])\nvalues.append(6)\nprint(values.tolist())  # [2, 4, 6]\n```\n\n### Key syntax\n\n`array(\"i\", [2, 4])` constructs an integer array. `sorted(values)` returns a list, not an array; rebuild with the same type code if an array is required.\n\n```python\nfrom array import array\nvalues = array(\"i\", [4, 2])\nordered = array(\"i\", sorted(values))\nprint(ordered.tolist())  # [2, 4]\n```\n\n### Worked example\n\n```python\nfrom array import array\n\nvalues = array(\"i\", [8, 3, 8, 5])\nvalues.append(10)\nprint(\"Occurrences of 8:\", values.count(8))\nprint(\"First 8 at:\", values.index(8))\nvalues.reverse()\nprint(\"Reversed:\", values.tolist())\nordered = array(\"i\", sorted(values))\nprint(ordered.tolist())\n```",
      "codeExample": "from array import array\n\nvalues = array(\"i\", [8, 3, 8, 5])\nvalues.append(10)\nprint(\"Occurrences of 8:\", values.count(8))\nprint(\"First 8 at:\", values.index(8))\nvalues.reverse()\nprint(\"Reversed:\", values.tolist())\nordered = array(\"i\", sorted(values))\nprint(ordered.tolist())",
      "pitfalls": "- Type codes matter: an integer array cannot store a string or a decimal float.\n\n- index raises ValueError if a value is missing.\n\n- array is not NumPy and does not provide list.sort().",
      "pitfallsEn": "- Type codes matter: an integer array cannot store a string or a decimal float.\n\n- index raises ValueError if a value is missing.\n\n- array is not NumPy and does not provide list.sort().",
      "practiceTask": "Collect five integers from 10 to 20 inclusive. Reject out-of-range entries and print the sorted array values.",
      "practiceTaskEn": "Collect five integers from 10 to 20 inclusive. Reject out-of-range entries and print the sorted array values.",
      "quiz": [
        {
          "type": "mcq",
          "q": "Which module does this chapter use?",
          "qEn": "Which module does this chapter use?",
          "options": [
            "numpy",
            "array",
            "pandas",
            "csv"
          ],
          "optionsEn": [
            "numpy",
            "array",
            "pandas",
            "csv"
          ],
          "answer": 1,
          "explanation": "array"
        },
        {
          "type": "mcq",
          "q": "\"i\" stores?",
          "qEn": "\"i\" stores?",
          "options": [
            "Text",
            "Signed integers",
            "Dictionaries",
            "Any type"
          ],
          "optionsEn": [
            "Text",
            "Signed integers",
            "Dictionaries",
            "Any type"
          ],
          "answer": 1,
          "explanation": "Signed integers"
        },
        {
          "type": "mcq",
          "q": "sorted(array_values) returns?",
          "qEn": "sorted(array_values) returns?",
          "options": [
            "An array",
            "A list",
            "None",
            "A tuple"
          ],
          "optionsEn": [
            "An array",
            "A list",
            "None",
            "A tuple"
          ],
          "answer": 1,
          "explanation": "A list"
        },
        {
          "type": "mcq",
          "q": "Which counts matches?",
          "qEn": "Which counts matches?",
          "options": [
            "index",
            "append",
            "count",
            "insert"
          ],
          "optionsEn": [
            "index",
            "append",
            "count",
            "insert"
          ],
          "answer": 2,
          "explanation": "count"
        },
        {
          "type": "fill",
          "q": "Import the array constructor",
          "qEn": "Import the array constructor",
          "codeBefore": "from array import ",
          "codeAfter": "",
          "answer": "array"
        }
      ]
    },
    "chapter": {
      "lessonId": "book-arrays",
      "title": "Numeric Arrays",
      "first": 88,
      "last": 95
    }
  },
  {
    "lesson": {
      "id": "book-2d",
      "moduleId": "m3-data",
      "order": 12,
      "title": "2D Lists and Dictionaries",
      "titleEn": "2D Lists and Dictionaries",
      "emoji": "🗂️",
      "concept": "### Essential idea\n\nA nested list stores rows, with each row holding a list of columns.\n\nAccess one cell with `table[row][column]`, starting both indices at zero.\n\nA nested dictionary uses meaningful keys instead: `people[name][\"age\"]`.\n\nLoop through rows or dictionary `.items()` to display records.\n\nUpdate a cell without replacing the entire table.\n\nAdd a record by assigning a new key; delete one with `del`.\n\nChallenge 104 belongs to this group even though the book chapter heading ends at 103.\n\n```python\ntable = [[70, 80], [65, 90]]\ntable[0][1] = 85\nprint(table[0][1])  # 85\n```\n\n### Key syntax\n\nUse `[row][column]`, not `[column][row]`.\n\nBuild independent row lists; `[[0] * 3] * 4` aliases the same row four times.\n\nIn a dictionary, confirm a key exists before deleting it.\n\n```python\nrows = []\nfor row in range(2):\n    rows.append([0, 0])\nrows[0][0] = 1\nprint(rows)  # [[1, 0], [0, 0]]\n```\n\n### Worked example\n\n```python\ngrades = [[70, 80], [65, 90]]\nprint(\"First student, second subject:\", grades[0][1])\npeople = {\n    \"Ava\": {\"age\": 20, \"shoe\": 38},\n    \"Noah\": {\"age\": 22, \"shoe\": 42},\n}\npeople[\"Ava\"][\"age\"] = 21\nfor name, details in people.items():\n    print(name, details[\"age\"])\ndel people[\"Noah\"]\nprint(people)\n```",
      "conceptEn": "### Essential idea\n\nA nested list stores rows, with each row holding a list of columns.\n\nAccess one cell with `table[row][column]`, starting both indices at zero.\n\nA nested dictionary uses meaningful keys instead: `people[name][\"age\"]`.\n\nLoop through rows or dictionary `.items()` to display records.\n\nUpdate a cell without replacing the entire table.\n\nAdd a record by assigning a new key; delete one with `del`.\n\nChallenge 104 belongs to this group even though the book chapter heading ends at 103.\n\n```python\ntable = [[70, 80], [65, 90]]\ntable[0][1] = 85\nprint(table[0][1])  # 85\n```\n\n### Key syntax\n\nUse `[row][column]`, not `[column][row]`.\n\nBuild independent row lists; `[[0] * 3] * 4` aliases the same row four times.\n\nIn a dictionary, confirm a key exists before deleting it.\n\n```python\nrows = []\nfor row in range(2):\n    rows.append([0, 0])\nrows[0][0] = 1\nprint(rows)  # [[1, 0], [0, 0]]\n```\n\n### Worked example\n\n```python\ngrades = [[70, 80], [65, 90]]\nprint(\"First student, second subject:\", grades[0][1])\npeople = {\n    \"Ava\": {\"age\": 20, \"shoe\": 38},\n    \"Noah\": {\"age\": 22, \"shoe\": 42},\n}\npeople[\"Ava\"][\"age\"] = 21\nfor name, details in people.items():\n    print(name, details[\"age\"])\ndel people[\"Noah\"]\nprint(people)\n```",
      "codeExample": "grades = [[70, 80], [65, 90]]\nprint(\"First student, second subject:\", grades[0][1])\npeople = {\n    \"Ava\": {\"age\": 20, \"shoe\": 38},\n    \"Noah\": {\"age\": 22, \"shoe\": 42},\n}\npeople[\"Ava\"][\"age\"] = 21\nfor name, details in people.items():\n    print(name, details[\"age\"])\ndel people[\"Noah\"]\nprint(people)",
      "pitfalls": "- Keep row and column order consistent.\n\n- Avoid shared row references when building a table.\n\n- Deleting a missing dictionary key raises KeyError.",
      "pitfallsEn": "- Keep row and column order consistent.\n\n- Avoid shared row references when building a table.\n\n- Deleting a missing dictionary key raises KeyError.",
      "practiceTask": "Add two people, display only names and ages, then remove a selected person and display remaining records.",
      "practiceTaskEn": "Add two people, display only names and ages, then remove a selected person and display remaining records.",
      "quiz": [
        {
          "type": "mcq",
          "q": "table[1][0] refers to?",
          "qEn": "table[1][0] refers to?",
          "options": [
            "First row, second column",
            "Second row, first column",
            "Last row only",
            "Every cell"
          ],
          "optionsEn": [
            "First row, second column",
            "Second row, first column",
            "Last row only",
            "Every cell"
          ],
          "answer": 1,
          "explanation": "Second row, first column"
        },
        {
          "type": "mcq",
          "q": "Get dictionary key and value together?",
          "qEn": "Get dictionary key and value together?",
          "options": [
            "keys()",
            "values()",
            "items()",
            "rows()"
          ],
          "optionsEn": [
            "keys()",
            "values()",
            "items()",
            "rows()"
          ],
          "answer": 2,
          "explanation": "items()"
        },
        {
          "type": "mcq",
          "q": "Delete a dictionary record with?",
          "qEn": "Delete a dictionary record with?",
          "options": [
            "del",
            "drop",
            "erase",
            "clearone"
          ],
          "optionsEn": [
            "del",
            "drop",
            "erase",
            "clearone"
          ],
          "answer": 0,
          "explanation": "del"
        },
        {
          "type": "mcq",
          "q": "Is challenge 104 in this group?",
          "qEn": "Is challenge 104 in this group?",
          "options": [
            "Yes",
            "No",
            "It is a project",
            "It is a CSV task"
          ],
          "optionsEn": [
            "Yes",
            "No",
            "It is a project",
            "It is a CSV task"
          ],
          "answer": 0,
          "explanation": "Yes"
        },
        {
          "type": "fill",
          "q": "Access Ava's age",
          "qEn": "Access Ava's age",
          "codeBefore": "people[\"Ava\"][",
          "codeAfter": " ]",
          "answer": "\"age\""
        }
      ]
    },
    "chapter": {
      "lessonId": "book-2d",
      "title": "2D Lists and Dictionaries",
      "first": 96,
      "last": 104
    }
  },
  {
    "lesson": {
      "id": "m6-l1-files",
      "moduleId": "m4-functions",
      "order": 13,
      "title": "Reading and Writing to a Text File",
      "titleEn": "Reading and Writing to a Text File",
      "emoji": "📄",
      "concept": "### Essential idea\n\nA text file stores characters beyond a single variable. `open()` needs a filename and a mode: `\"r\"` reads an existing file, `\"w\"` creates or overwrites a file, and `\"a\"` appends. `write()` accepts text; add `\\n` when you want a new line.\n\nUse `with open(...) as file:` to close the file automatically. `read()` returns all text; iteration reads one line at a time.\n\nTo remove a record, read the existing lines, filter the unwanted one, then rewrite the file.\n\nThe book uses explicit close(); both patterns are valid.\n\n```python\nwith open(\"example.txt\", \"w\", encoding=\"utf-8\") as file:\n    file.write(\"Hello\\n\")\n```\n\n### Key syntax\n\nUse `encoding=\"utf-8\"` for text.\n\nLesson files live in the browser Python filesystem, not your downloads folder; do not assume they survive a reload.\n\nChallenge prerequisites are provided in their workspace.\n\n```python\nwith open(\"example.txt\", \"w\", encoding=\"utf-8\") as file:\n    file.write(\"Ava\\n\")\nwith open(\"example.txt\", \"r\", encoding=\"utf-8\") as file:\n    print(file.read().strip())  # Ava\n```\n\n### Worked example\n\n```python\nwith open(\"names.txt\", \"w\", encoding=\"utf-8\") as file:\n    file.write(\"Ava\\nNoah\\n\")\nwith open(\"names.txt\", \"a\", encoding=\"utf-8\") as file:\n    file.write(\"Mia\\n\")\nwith open(\"names.txt\", \"r\", encoding=\"utf-8\") as file:\n    for line in file:\n        print(line.strip())\n```",
      "conceptEn": "### Essential idea\n\nA text file stores characters beyond a single variable. `open()` needs a filename and a mode: `\"r\"` reads an existing file, `\"w\"` creates or overwrites a file, and `\"a\"` appends. `write()` accepts text; add `\\n` when you want a new line.\n\nUse `with open(...) as file:` to close the file automatically. `read()` returns all text; iteration reads one line at a time.\n\nTo remove a record, read the existing lines, filter the unwanted one, then rewrite the file.\n\nThe book uses explicit close(); both patterns are valid.\n\n```python\nwith open(\"example.txt\", \"w\", encoding=\"utf-8\") as file:\n    file.write(\"Hello\\n\")\n```\n\n### Key syntax\n\nUse `encoding=\"utf-8\"` for text.\n\nLesson files live in the browser Python filesystem, not your downloads folder; do not assume they survive a reload.\n\nChallenge prerequisites are provided in their workspace.\n\n```python\nwith open(\"example.txt\", \"w\", encoding=\"utf-8\") as file:\n    file.write(\"Ava\\n\")\nwith open(\"example.txt\", \"r\", encoding=\"utf-8\") as file:\n    print(file.read().strip())  # Ava\n```\n\n### Worked example\n\n```python\nwith open(\"names.txt\", \"w\", encoding=\"utf-8\") as file:\n    file.write(\"Ava\\nNoah\\n\")\nwith open(\"names.txt\", \"a\", encoding=\"utf-8\") as file:\n    file.write(\"Mia\\n\")\nwith open(\"names.txt\", \"r\", encoding=\"utf-8\") as file:\n    for line in file:\n        print(line.strip())\n```",
      "codeExample": "with open(\"names.txt\", \"w\", encoding=\"utf-8\") as file:\n    file.write(\"Ava\\nNoah\\n\")\nwith open(\"names.txt\", \"a\", encoding=\"utf-8\") as file:\n    file.write(\"Mia\\n\")\nwith open(\"names.txt\", \"r\", encoding=\"utf-8\") as file:\n    for line in file:\n        print(line.strip())",
      "pitfalls": "- w erases existing contents; use a to add.\n\n- write requires a string; convert numeric values.\n\n- Read before opening the same file for overwrite.",
      "pitfallsEn": "- w erases existing contents; use a to add.\n\n- write requires a string; convert numeric values.\n\n- Read before opening the same file for overwrite.",
      "practiceTask": "Write five names on separate lines. Append one name, then read and display every line. Remove one name by rewriting.",
      "practiceTaskEn": "Write five names on separate lines. Append one name, then read and display every line. Remove one name by rewriting.",
      "quiz": [
        {
          "type": "mcq",
          "q": "Append mode?",
          "qEn": "Append mode?",
          "options": [
            "r",
            "w",
            "a",
            "xread"
          ],
          "optionsEn": [
            "r",
            "w",
            "a",
            "xread"
          ],
          "answer": 2,
          "explanation": "a"
        },
        {
          "type": "mcq",
          "q": "What does w do to an existing file?",
          "qEn": "What does w do to an existing file?",
          "options": [
            "Appends",
            "Overwrites",
            "Reads only",
            "Renames"
          ],
          "optionsEn": [
            "Appends",
            "Overwrites",
            "Reads only",
            "Renames"
          ],
          "answer": 1,
          "explanation": "Overwrites"
        },
        {
          "type": "mcq",
          "q": "Which automatically closes a file?",
          "qEn": "Which automatically closes a file?",
          "options": [
            "with",
            "print",
            "input",
            "len"
          ],
          "optionsEn": [
            "with",
            "print",
            "input",
            "len"
          ],
          "answer": 0,
          "explanation": "with"
        },
        {
          "type": "mcq",
          "q": "write accepts?",
          "qEn": "write accepts?",
          "options": [
            "Only integers",
            "Text",
            "Only lists",
            "Only bytes in text mode"
          ],
          "optionsEn": [
            "Only integers",
            "Text",
            "Only lists",
            "Only bytes in text mode"
          ],
          "answer": 1,
          "explanation": "Text"
        },
        {
          "type": "fill",
          "q": "Read all text from an open file",
          "qEn": "Read all text from an open file",
          "codeBefore": "text = file.",
          "codeAfter": "()",
          "answer": "read"
        }
      ]
    },
    "chapter": {
      "lessonId": "m6-l1-files",
      "title": "Reading and Writing to a Text File",
      "first": 105,
      "last": 110
    }
  },
  {
    "lesson": {
      "id": "book-csv",
      "moduleId": "m4-functions",
      "order": 14,
      "title": "Reading and Writing to a .csv File",
      "titleEn": "Reading and Writing to a .csv File",
      "emoji": "📊",
      "concept": "### Essential idea\n\nA CSV file represents rows with fields separated by a delimiter, usually a comma.\n\nUse the standard `csv` module so quoted commas and other special characters are handled correctly. `csv.writer(...).writerow(row)` writes one record; `csv.reader(file)` reads records as lists of strings.\n\nConvert fields such as a publication year to int before a numeric comparison.\n\nDecide whether a header exists and handle it separately.\n\nFilter rows in memory for a search, then write the selected data or display the results.\n\n```python\nimport csv\nimport io\ntext = io.StringIO()\ncsv.writer(text).writerow([\"Ava, Lee\", 2020])\nprint(text.getvalue().strip())  # \"Ava, Lee\",2020\n```\n\n### Key syntax\n\nOpen CSV files with `newline=\"\"` and `encoding=\"utf-8\"`.\n\nUse `\"a\"` to append and `\"w\"` to replace.\n\nDo not duplicate a header each time you append.\n\n```python\nimport csv\nimport io\nrows = csv.reader(io.StringIO(\"title,year\\nPython,2020\\n\"))\nheader = next(rows)\nfor title, year in rows:\n    print(title, int(year) + 1)  # Python 2021\n```\n\n### Worked example\n\n```python\nimport csv\n\nwith open(\"books.csv\", \"w\", newline=\"\", encoding=\"utf-8\") as file:\n    writer = csv.writer(file)\n    writer.writerow([\"title\", \"year\"])\n    writer.writerow([\"Learning Python\", 2020])\nwith open(\"books.csv\", newline=\"\", encoding=\"utf-8\") as file:\n    reader = csv.reader(file)\n    header = next(reader, None)\n    for title, year in reader:\n        if int(year) >= 2019:\n            print(title, year)\n```",
      "conceptEn": "### Essential idea\n\nA CSV file represents rows with fields separated by a delimiter, usually a comma.\n\nUse the standard `csv` module so quoted commas and other special characters are handled correctly. `csv.writer(...).writerow(row)` writes one record; `csv.reader(file)` reads records as lists of strings.\n\nConvert fields such as a publication year to int before a numeric comparison.\n\nDecide whether a header exists and handle it separately.\n\nFilter rows in memory for a search, then write the selected data or display the results.\n\n```python\nimport csv\nimport io\ntext = io.StringIO()\ncsv.writer(text).writerow([\"Ava, Lee\", 2020])\nprint(text.getvalue().strip())  # \"Ava, Lee\",2020\n```\n\n### Key syntax\n\nOpen CSV files with `newline=\"\"` and `encoding=\"utf-8\"`.\n\nUse `\"a\"` to append and `\"w\"` to replace.\n\nDo not duplicate a header each time you append.\n\n```python\nimport csv\nimport io\nrows = csv.reader(io.StringIO(\"title,year\\nPython,2020\\n\"))\nheader = next(rows)\nfor title, year in rows:\n    print(title, int(year) + 1)  # Python 2021\n```\n\n### Worked example\n\n```python\nimport csv\n\nwith open(\"books.csv\", \"w\", newline=\"\", encoding=\"utf-8\") as file:\n    writer = csv.writer(file)\n    writer.writerow([\"title\", \"year\"])\n    writer.writerow([\"Learning Python\", 2020])\nwith open(\"books.csv\", newline=\"\", encoding=\"utf-8\") as file:\n    reader = csv.reader(file)\n    header = next(reader, None)\n    for title, year in reader:\n        if int(year) >= 2019:\n            print(title, year)\n```",
      "codeExample": "import csv\n\nwith open(\"books.csv\", \"w\", newline=\"\", encoding=\"utf-8\") as file:\n    writer = csv.writer(file)\n    writer.writerow([\"title\", \"year\"])\n    writer.writerow([\"Learning Python\", 2020])\nwith open(\"books.csv\", newline=\"\", encoding=\"utf-8\") as file:\n    reader = csv.reader(file)\n    header = next(reader, None)\n    for title, year in reader:\n        if int(year) >= 2019:\n            print(title, year)",
      "pitfalls": "- CSV reader returns strings, including numeric-looking fields.\n\n- Do not split raw rows on commas when fields may contain quoted commas.\n\n- Keep row field counts consistent and handle headers deliberately.",
      "pitfallsEn": "- CSV reader returns strings, including numeric-looking fields.\n\n- Do not split raw rows on commas when fields may contain quoted commas.\n\n- Keep row field counts consistent and handle headers deliberately.",
      "practiceTask": "Append two books and search for books whose years fall within a chosen inclusive range.",
      "practiceTaskEn": "Append two books and search for books whose years fall within a chosen inclusive range.",
      "quiz": [
        {
          "type": "mcq",
          "q": "CSV reader returns fields as?",
          "qEn": "CSV reader returns fields as?",
          "options": [
            "Integers",
            "Strings",
            "Floats",
            "Booleans"
          ],
          "optionsEn": [
            "Integers",
            "Strings",
            "Floats",
            "Booleans"
          ],
          "answer": 1,
          "explanation": "Strings"
        },
        {
          "type": "mcq",
          "q": "Write one row with?",
          "qEn": "Write one row with?",
          "options": [
            "writerow",
            "writecell",
            "rowwrite",
            "appendrow"
          ],
          "optionsEn": [
            "writerow",
            "writecell",
            "rowwrite",
            "appendrow"
          ],
          "answer": 0,
          "explanation": "writerow"
        },
        {
          "type": "mcq",
          "q": "Why use the csv module?",
          "qEn": "Why use the csv module?",
          "options": [
            "It runs SQL",
            "It handles quoted fields",
            "It installs Python",
            "It encrypts files"
          ],
          "optionsEn": [
            "It runs SQL",
            "It handles quoted fields",
            "It installs Python",
            "It encrypts files"
          ],
          "answer": 1,
          "explanation": "It handles quoted fields"
        },
        {
          "type": "mcq",
          "q": "CSV open newline setting?",
          "qEn": "CSV open newline setting?",
          "options": [
            "\"\\n\"",
            "True",
            "\"\"",
            "None only"
          ],
          "optionsEn": [
            "\"\\n\"",
            "True",
            "\"\"",
            "None only"
          ],
          "answer": 2,
          "explanation": "\"\""
        },
        {
          "type": "fill",
          "q": "Import CSV support",
          "qEn": "Import CSV support",
          "codeBefore": "import ",
          "codeAfter": "",
          "answer": "csv"
        }
      ]
    },
    "chapter": {
      "lessonId": "book-csv",
      "title": "Reading and Writing to a .csv File",
      "first": 111,
      "last": 117
    }
  },
  {
    "lesson": {
      "id": "m4-l1-define",
      "moduleId": "m4-functions",
      "order": 15,
      "title": "Subprograms",
      "titleEn": "Subprograms",
      "emoji": "🛠️",
      "concept": "### Essential idea\n\nA subprogram is a reusable section of code.\n\nDefine a function with `def`, give it a name and optional parameters, and indent its body.\n\nCalling the function runs that body.\n\nSeparate input, calculation and display so each part has one clear job.\n\nParameters receive values from the call. `return` sends a result to the caller and ends that function call. `print()` displays a value but does not replace return.\n\nVariables assigned inside a function are normally local to it.\n\nPass data explicitly rather than relying on global state.\n\n```python\ndef add(first, second):\n    return first + second\n\nprint(add(2, 3))  # 5\n```\n\n### Key syntax\n\nA function can return more than one value as a tuple: `return first, second`.\n\nUnpack it with `a, b = function()`.\n\nDefine a function before calling it during execution.\n\n```python\ndef dimensions():\n    return 4, 6\n\nwidth, height = dimensions()\nprint(width * height)  # 24\n```\n\n### Worked example\n\n```python\ndef read_numbers():\n    first = int(input(\"First number: \"))\n    second = int(input(\"Second number: \"))\n    return first, second\n\ndef add(first, second):\n    return first + second\n\na, b = read_numbers()\nprint(\"Total:\", add(a, b))\n```",
      "conceptEn": "### Essential idea\n\nA subprogram is a reusable section of code.\n\nDefine a function with `def`, give it a name and optional parameters, and indent its body.\n\nCalling the function runs that body.\n\nSeparate input, calculation and display so each part has one clear job.\n\nParameters receive values from the call. `return` sends a result to the caller and ends that function call. `print()` displays a value but does not replace return.\n\nVariables assigned inside a function are normally local to it.\n\nPass data explicitly rather than relying on global state.\n\n```python\ndef add(first, second):\n    return first + second\n\nprint(add(2, 3))  # 5\n```\n\n### Key syntax\n\nA function can return more than one value as a tuple: `return first, second`.\n\nUnpack it with `a, b = function()`.\n\nDefine a function before calling it during execution.\n\n```python\ndef dimensions():\n    return 4, 6\n\nwidth, height = dimensions()\nprint(width * height)  # 24\n```\n\n### Worked example\n\n```python\ndef read_numbers():\n    first = int(input(\"First number: \"))\n    second = int(input(\"Second number: \"))\n    return first, second\n\ndef add(first, second):\n    return first + second\n\na, b = read_numbers()\nprint(\"Total:\", add(a, b))\n```",
      "codeExample": "def read_numbers():\n    first = int(input(\"First number: \"))\n    second = int(input(\"Second number: \"))\n    return first, second\n\ndef add(first, second):\n    return first + second\n\na, b = read_numbers()\nprint(\"Total:\", add(a, b))",
      "pitfalls": "- Defining a function does not call it.\n\n- A function without an explicit return returns None.\n\n- A local variable cannot normally be read from outside its function.",
      "pitfallsEn": "- Defining a function does not call it.\n\n- A function without an explicit return returns None.\n\n- A local variable cannot normally be read from outside its function.",
      "practiceTask": "Create read_values, calculate_average and show_result functions. Call them from one main function.",
      "practiceTaskEn": "Create read_values, calculate_average and show_result functions. Call them from one main function.",
      "quiz": [
        {
          "type": "mcq",
          "q": "Define a function with?",
          "qEn": "Define a function with?",
          "options": [
            "func",
            "def",
            "function",
            "sub"
          ],
          "optionsEn": [
            "func",
            "def",
            "function",
            "sub"
          ],
          "answer": 1,
          "explanation": "def"
        },
        {
          "type": "mcq",
          "q": "Send a result to the caller with?",
          "qEn": "Send a result to the caller with?",
          "options": [
            "print",
            "input",
            "return",
            "show"
          ],
          "optionsEn": [
            "print",
            "input",
            "return",
            "show"
          ],
          "answer": 2,
          "explanation": "return"
        },
        {
          "type": "mcq",
          "q": "Does defining a function execute its body immediately?",
          "qEn": "Does defining a function execute its body immediately?",
          "options": [
            "Yes",
            "No",
            "Only with parameters",
            "Only at startup"
          ],
          "optionsEn": [
            "Yes",
            "No",
            "Only with parameters",
            "Only at startup"
          ],
          "answer": 1,
          "explanation": "No"
        },
        {
          "type": "mcq",
          "q": "No explicit return produces?",
          "qEn": "No explicit return produces?",
          "options": [
            "0",
            "False",
            "None",
            "An empty string"
          ],
          "optionsEn": [
            "0",
            "False",
            "None",
            "An empty string"
          ],
          "answer": 2,
          "explanation": "None"
        },
        {
          "type": "fill",
          "q": "Call the add function",
          "qEn": "Call the add function",
          "codeBefore": "result = ",
          "codeAfter": "(3, 4)",
          "answer": "add"
        }
      ]
    },
    "chapter": {
      "lessonId": "m4-l1-define",
      "title": "Subprograms",
      "first": 118,
      "last": 123
    }
  },
  {
    "lesson": {
      "id": "book-tkinter",
      "moduleId": "m5-oop",
      "order": 16,
      "title": "Tkinter GUI",
      "titleEn": "Tkinter GUI",
      "emoji": "🪟",
      "concept": "### Essential idea\n\nTkinter builds desktop graphical interfaces.\n\nA `Tk()` root owns widgets such as `Label` (display), `Entry` (text input), `Button` (action) and `Listbox` (items).\n\nA layout manager such as `grid()` or `place()` positions widgets. `mainloop()` processes user events.\n\nA button callback is a function passed to `command`.\n\nUse `command=calculate`, not `command=calculate()`, to wait for a click.\n\nRead an Entry with `.get()`, convert its text, then update a label with `.config(text=...)`.\n\nKeep calculations separate from widget handling.\n\n```python\ndef calculate():\n    return 10 * 0.621371\n\ncallback = calculate\nprint(f\"{callback():.2f}\")  # 6.21\n```\n\n### Key syntax\n\nTkinter windows cannot open in the browser playground.\n\nChallenges 124-132 preserve the same input/action/output logic using input() and console menus.\n\nThe desktop pattern below is for a local Python installation; the playground runs the console equivalent.\n\n```python\ndef convert(kilometres):\n    return kilometres * 0.621371\n\nprint(f\"{convert(10):.2f}\")  # 6.21\n```\n\n### Worked example\n\n```python\ndef convert(kilometres):\n    return kilometres * 0.621371\n\nkilometres = float(input(\"Kilometres: \"))\nprint(f\"Miles: {convert(kilometres):.2f}\")\n```",
      "conceptEn": "### Essential idea\n\nTkinter builds desktop graphical interfaces.\n\nA `Tk()` root owns widgets such as `Label` (display), `Entry` (text input), `Button` (action) and `Listbox` (items).\n\nA layout manager such as `grid()` or `place()` positions widgets. `mainloop()` processes user events.\n\nA button callback is a function passed to `command`.\n\nUse `command=calculate`, not `command=calculate()`, to wait for a click.\n\nRead an Entry with `.get()`, convert its text, then update a label with `.config(text=...)`.\n\nKeep calculations separate from widget handling.\n\n```python\ndef calculate():\n    return 10 * 0.621371\n\ncallback = calculate\nprint(f\"{callback():.2f}\")  # 6.21\n```\n\n### Key syntax\n\nTkinter windows cannot open in the browser playground.\n\nChallenges 124-132 preserve the same input/action/output logic using input() and console menus.\n\nThe desktop pattern below is for a local Python installation; the playground runs the console equivalent.\n\n```python\ndef convert(kilometres):\n    return kilometres * 0.621371\n\nprint(f\"{convert(10):.2f}\")  # 6.21\n```\n\n### Worked example\n\n```python\ndef convert(kilometres):\n    return kilometres * 0.621371\n\nkilometres = float(input(\"Kilometres: \"))\nprint(f\"Miles: {convert(kilometres):.2f}\")\n```",
      "codeExample": "def convert(kilometres):\n    return kilometres * 0.621371\n\nkilometres = float(input(\"Kilometres: \"))\nprint(f\"Miles: {convert(kilometres):.2f}\")",
      "pitfalls": "- Entry values are text; convert before calculating.\n\n- Pass a callback function without calling it in the command argument.\n\n- Use a local desktop Python environment for native Tkinter windows.",
      "pitfallsEn": "- Entry values are text; convert before calculating.\n\n- Pass a callback function without calling it in the command argument.\n\n- Use a local desktop Python environment for native Tkinter windows.",
      "practiceTask": "Write a console converter from kilometres to miles and back. Use a menu choice to represent two buttons.",
      "practiceTaskEn": "Write a console converter from kilometres to miles and back. Use a menu choice to represent two buttons.",
      "quiz": [
        {
          "type": "mcq",
          "q": "A text input widget is?",
          "qEn": "A text input widget is?",
          "options": [
            "Label",
            "Entry",
            "Button",
            "Tk only"
          ],
          "optionsEn": [
            "Label",
            "Entry",
            "Button",
            "Tk only"
          ],
          "answer": 1,
          "explanation": "Entry"
        },
        {
          "type": "mcq",
          "q": "Correct button callback?",
          "qEn": "Correct button callback?",
          "options": [
            "command=calculate",
            "command=calculate()",
            "command=\"calculate()\"",
            "command=print(result)"
          ],
          "optionsEn": [
            "command=calculate",
            "command=calculate()",
            "command=\"calculate()\"",
            "command=print(result)"
          ],
          "answer": 0,
          "explanation": "command=calculate"
        },
        {
          "type": "mcq",
          "q": "Entry.get returns?",
          "qEn": "Entry.get returns?",
          "options": [
            "An int",
            "Text",
            "A label",
            "A button"
          ],
          "optionsEn": [
            "An int",
            "Text",
            "A label",
            "A button"
          ],
          "answer": 1,
          "explanation": "Text"
        },
        {
          "type": "mcq",
          "q": "Process desktop GUI events with?",
          "qEn": "Process desktop GUI events with?",
          "options": [
            "mainloop()",
            "runall()",
            "events()",
            "startgui()"
          ],
          "optionsEn": [
            "mainloop()",
            "runall()",
            "events()",
            "startgui()"
          ],
          "answer": 0,
          "explanation": "mainloop()"
        },
        {
          "type": "fill",
          "q": "Get text from an Entry widget",
          "qEn": "Get text from an Entry widget",
          "codeBefore": "value = entry.",
          "codeAfter": "()",
          "answer": "get"
        }
      ]
    },
    "chapter": {
      "lessonId": "book-tkinter",
      "title": "Tkinter GUI",
      "first": 124,
      "last": 132,
      "desktopExample": "import tkinter as tk\n\nwindow = tk.Tk()\nentry = tk.Entry(window)\nentry.grid(row=0, column=0)\nresult = tk.Label(window, text=\"\")\nresult.grid(row=1, column=0)\n\ndef calculate():\n    result.config(text=str(float(entry.get()) * 0.621371))\n\ntk.Button(window, text=\"Convert\", command=calculate).grid(row=2, column=0)\nwindow.mainloop()"
    }
  },
  {
    "lesson": {
      "id": "book-more-tkinter",
      "moduleId": "m5-oop",
      "order": 17,
      "title": "More Tkinter",
      "titleEn": "More Tkinter",
      "emoji": "🎨",
      "concept": "### Essential idea\n\nExtend a desktop interface with list boxes, images, colours and file actions. `Listbox.insert()` adds an item; `delete()` removes it; `get()` reads items.\n\nUse an Entry and a callback to add items, then save the collection to a file. `OptionMenu` offers a fixed choice list through a Tkinter variable.\n\nUse `.configure(background=...)` to change a widget background.\n\nA desktop window icon can be set with `.wm_iconbitmap()` where supported.\n\n`PhotoImage` loads supported image formats.\n\nKeep the image object referenced while the widget uses it, otherwise it may disappear.\n\nFile paths must point to available assets.\n\nValidate empty entries before adding or saving.\n\nThe web challenges use console equivalents for these interactions.\n\n```python\nitems = [\"Book\"]\nitems.append(\"Pen\")\nprint(items)  # ['Book', 'Pen']\n```\n\n### Key syntax\n\nThe lesson playground demonstrates the data and saving logic with a list.\n\nNative images and Tkinter widgets require desktop Python.\n\nIn a desktop Listbox, use `tk.END` for the final insertion position.\n\n```python\nitems = [\"Book\", \"Pen\"]\nwith open(\"saved_items.txt\", \"w\", encoding=\"utf-8\") as file:\n    for item in items:\n        file.write(item + \"\\n\")\nprint(\"Saved:\", len(items))  # Saved: 2\n```\n\n### Worked example\n\n```python\nitems = []\nitem = input(\"Item to save: \").strip()\nif item:\n    items.append(item)\nwith open(\"items.txt\", \"w\", encoding=\"utf-8\") as file:\n    for item in items:\n        file.write(item + \"\\n\")\nprint(\"Saved items:\", items)\n```",
      "conceptEn": "### Essential idea\n\nExtend a desktop interface with list boxes, images, colours and file actions. `Listbox.insert()` adds an item; `delete()` removes it; `get()` reads items.\n\nUse an Entry and a callback to add items, then save the collection to a file. `OptionMenu` offers a fixed choice list through a Tkinter variable.\n\nUse `.configure(background=...)` to change a widget background.\n\nA desktop window icon can be set with `.wm_iconbitmap()` where supported.\n\n`PhotoImage` loads supported image formats.\n\nKeep the image object referenced while the widget uses it, otherwise it may disappear.\n\nFile paths must point to available assets.\n\nValidate empty entries before adding or saving.\n\nThe web challenges use console equivalents for these interactions.\n\n```python\nitems = [\"Book\"]\nitems.append(\"Pen\")\nprint(items)  # ['Book', 'Pen']\n```\n\n### Key syntax\n\nThe lesson playground demonstrates the data and saving logic with a list.\n\nNative images and Tkinter widgets require desktop Python.\n\nIn a desktop Listbox, use `tk.END` for the final insertion position.\n\n```python\nitems = [\"Book\", \"Pen\"]\nwith open(\"saved_items.txt\", \"w\", encoding=\"utf-8\") as file:\n    for item in items:\n        file.write(item + \"\\n\")\nprint(\"Saved:\", len(items))  # Saved: 2\n```\n\n### Worked example\n\n```python\nitems = []\nitem = input(\"Item to save: \").strip()\nif item:\n    items.append(item)\nwith open(\"items.txt\", \"w\", encoding=\"utf-8\") as file:\n    for item in items:\n        file.write(item + \"\\n\")\nprint(\"Saved items:\", items)\n```",
      "codeExample": "items = []\nitem = input(\"Item to save: \").strip()\nif item:\n    items.append(item)\nwith open(\"items.txt\", \"w\", encoding=\"utf-8\") as file:\n    for item in items:\n        file.write(item + \"\\n\")\nprint(\"Saved items:\", items)",
      "pitfalls": "- Keep a reference to PhotoImage.\n\n- Check for an empty selection before deleting a selected item.\n\n- Do not overwrite a file before collecting the data you need to save.",
      "pitfallsEn": "- Keep a reference to PhotoImage.\n\n- Check for an empty selection before deleting a selected item.\n\n- Do not overwrite a file before collecting the data you need to save.",
      "practiceTask": "Add a repeating menu to add, list and save items. Reject blank items and display the saved file contents.",
      "practiceTaskEn": "Add a repeating menu to add, list and save items. Reject blank items and display the saved file contents.",
      "quiz": [
        {
          "type": "mcq",
          "q": "Add a Listbox item with?",
          "qEn": "Add a Listbox item with?",
          "options": [
            "insert",
            "appendrow",
            "puttext",
            "configitem"
          ],
          "optionsEn": [
            "insert",
            "appendrow",
            "puttext",
            "configitem"
          ],
          "answer": 0,
          "explanation": "insert"
        },
        {
          "type": "mcq",
          "q": "Why keep a PhotoImage reference?",
          "qEn": "Why keep a PhotoImage reference?",
          "options": [
            "To increase its size",
            "To stop it disappearing",
            "To turn it into CSV",
            "To add a button"
          ],
          "optionsEn": [
            "To increase its size",
            "To stop it disappearing",
            "To turn it into CSV",
            "To add a button"
          ],
          "answer": 1,
          "explanation": "To stop it disappearing"
        },
        {
          "type": "mcq",
          "q": "Validate a new item before?",
          "qEn": "Validate a new item before?",
          "options": [
            "Adding it",
            "Importing tkinter",
            "Closing Python",
            "Naming the module"
          ],
          "optionsEn": [
            "Adding it",
            "Importing tkinter",
            "Closing Python",
            "Naming the module"
          ],
          "answer": 0,
          "explanation": "Adding it"
        },
        {
          "type": "mcq",
          "q": "Desktop image path should point to?",
          "qEn": "Desktop image path should point to?",
          "options": [
            "An existing asset",
            "Any arbitrary name",
            "The callback",
            "The console"
          ],
          "optionsEn": [
            "An existing asset",
            "Any arbitrary name",
            "The callback",
            "The console"
          ],
          "answer": 0,
          "explanation": "An existing asset"
        },
        {
          "type": "fill",
          "q": "Insert at the end of a desktop list box",
          "qEn": "Insert at the end of a desktop list box",
          "codeBefore": "box.insert(tk.",
          "codeAfter": " , \"New item\")",
          "answer": "END"
        }
      ]
    },
    "chapter": {
      "lessonId": "book-more-tkinter",
      "title": "More Tkinter",
      "first": 133,
      "last": 138
    }
  },
  {
    "lesson": {
      "id": "book-sqlite",
      "moduleId": "m6-mastery",
      "order": 18,
      "title": "SQLite",
      "titleEn": "SQLite",
      "emoji": "🗃️",
      "concept": "### Essential idea\n\nSQLite stores structured records in database tables.\n\nPython's `sqlite3` module provides a connection and a cursor.\n\nUse `CREATE TABLE`, `INSERT`, `SELECT`, `UPDATE` and `DELETE` for a table's lifecycle. `fetchall()` returns rows; iterate to display them.\n\nUse `?` placeholders and a separate tuple of values for user data, rather than building SQL strings.\n\nCommit changes to save them and close connections when finished.\n\nA WHERE clause restricts the rows updated or deleted.\n\nAn INNER JOIN combines matching records through a shared key.\n\n```python\nimport sqlite3\nconnection = sqlite3.connect(\":memory:\")\nprint(connection.execute(\"SELECT 2 + 3\").fetchone())  # (5,)\nconnection.close()\n```\n\n### Key syntax\n\nThe browser Python runtime supports SQLite without a web server. `\":memory:\"` creates a temporary database for a repeatable demo.\n\nFiles such as `phonebook.db` live in the browser filesystem and should not be assumed persistent across reloads.\n\n```python\nimport sqlite3\nconnection = sqlite3.connect(\":memory:\")\nprint(connection.execute(\"SELECT ?\", (\"Ava\",)).fetchone())  # ('Ava',)\nconnection.close()\n```\n\n### Worked example\n\n```python\nimport sqlite3\n\ndb = sqlite3.connect(\":memory:\")\ncursor = db.cursor()\ncursor.execute(\"CREATE TABLE people (id INTEGER PRIMARY KEY, name TEXT)\")\nname = input(\"Name: \")\ncursor.execute(\"INSERT INTO people (name) VALUES (?)\", (name,))\ndb.commit()\nfor row in cursor.execute(\"SELECT id, name FROM people ORDER BY id\"):\n    print(row)\ndb.close()\n```",
      "conceptEn": "### Essential idea\n\nSQLite stores structured records in database tables.\n\nPython's `sqlite3` module provides a connection and a cursor.\n\nUse `CREATE TABLE`, `INSERT`, `SELECT`, `UPDATE` and `DELETE` for a table's lifecycle. `fetchall()` returns rows; iterate to display them.\n\nUse `?` placeholders and a separate tuple of values for user data, rather than building SQL strings.\n\nCommit changes to save them and close connections when finished.\n\nA WHERE clause restricts the rows updated or deleted.\n\nAn INNER JOIN combines matching records through a shared key.\n\n```python\nimport sqlite3\nconnection = sqlite3.connect(\":memory:\")\nprint(connection.execute(\"SELECT 2 + 3\").fetchone())  # (5,)\nconnection.close()\n```\n\n### Key syntax\n\nThe browser Python runtime supports SQLite without a web server. `\":memory:\"` creates a temporary database for a repeatable demo.\n\nFiles such as `phonebook.db` live in the browser filesystem and should not be assumed persistent across reloads.\n\n```python\nimport sqlite3\nconnection = sqlite3.connect(\":memory:\")\nprint(connection.execute(\"SELECT ?\", (\"Ava\",)).fetchone())  # ('Ava',)\nconnection.close()\n```\n\n### Worked example\n\n```python\nimport sqlite3\n\ndb = sqlite3.connect(\":memory:\")\ncursor = db.cursor()\ncursor.execute(\"CREATE TABLE people (id INTEGER PRIMARY KEY, name TEXT)\")\nname = input(\"Name: \")\ncursor.execute(\"INSERT INTO people (name) VALUES (?)\", (name,))\ndb.commit()\nfor row in cursor.execute(\"SELECT id, name FROM people ORDER BY id\"):\n    print(row)\ndb.close()\n```",
      "codeExample": "import sqlite3\n\ndb = sqlite3.connect(\":memory:\")\ncursor = db.cursor()\ncursor.execute(\"CREATE TABLE people (id INTEGER PRIMARY KEY, name TEXT)\")\nname = input(\"Name: \")\ncursor.execute(\"INSERT INTO people (name) VALUES (?)\", (name,))\ndb.commit()\nfor row in cursor.execute(\"SELECT id, name FROM people ORDER BY id\"):\n    print(row)\ndb.close()",
      "pitfalls": "- Pass a one-value tuple as `(value,)`, including the comma.\n\n- UPDATE or DELETE without WHERE can affect every row.\n\n- Commit writes; never interpolate raw input into SQL.",
      "pitfallsEn": "- Pass a one-value tuple as `(value,)`, including the comma.\n\n- UPDATE or DELETE without WHERE can affect every row.\n\n- Commit writes; never interpolate raw input into SQL.",
      "practiceTask": "Add a second record, search by name with a placeholder, and delete only the matching ID. Display remaining rows.",
      "practiceTaskEn": "Add a second record, search by name with a placeholder, and delete only the matching ID. Display remaining rows.",
      "quiz": [
        {
          "type": "mcq",
          "q": "Library for SQLite?",
          "qEn": "Library for SQLite?",
          "options": [
            "csv",
            "sqlite3",
            "sql",
            "pandas"
          ],
          "optionsEn": [
            "csv",
            "sqlite3",
            "sql",
            "pandas"
          ],
          "answer": 1,
          "explanation": "sqlite3"
        },
        {
          "type": "mcq",
          "q": "SQL value placeholder?",
          "qEn": "SQL value placeholder?",
          "options": [
            "?",
            "{}",
            "%input",
            "@textonly"
          ],
          "optionsEn": [
            "?",
            "{}",
            "%input",
            "@textonly"
          ],
          "answer": 0,
          "explanation": "?"
        },
        {
          "type": "mcq",
          "q": "Save changes with?",
          "qEn": "Save changes with?",
          "options": [
            "fetchall",
            "closeonly",
            "commit",
            "print"
          ],
          "optionsEn": [
            "fetchall",
            "closeonly",
            "commit",
            "print"
          ],
          "answer": 2,
          "explanation": "commit"
        },
        {
          "type": "mcq",
          "q": "DELETE without WHERE may delete?",
          "qEn": "DELETE without WHERE may delete?",
          "options": [
            "Nothing",
            "Only one row",
            "All rows",
            "Only headers"
          ],
          "optionsEn": [
            "Nothing",
            "Only one row",
            "All rows",
            "Only headers"
          ],
          "answer": 2,
          "explanation": "All rows"
        },
        {
          "type": "fill",
          "q": "Fetch all selected rows",
          "qEn": "Fetch all selected rows",
          "codeBefore": "rows = cursor.",
          "codeAfter": "()",
          "answer": "fetchall"
        }
      ]
    },
    "chapter": {
      "lessonId": "book-sqlite",
      "title": "SQLite",
      "first": 139,
      "last": 145
    }
  },
  {
    "lesson": {
      "id": "book-projects",
      "moduleId": "m6-mastery",
      "order": 19,
      "title": "Projects: Combine Your Skills",
      "titleEn": "Projects: Combine Your Skills",
      "emoji": "🚀",
      "concept": "### Essential idea\n\nPlan each project as input, processing, storage and output.\n\nSplit the work into small functions and test each one before combining them.\n\nReuse the techniques from earlier chapters instead of adding unfamiliar libraries.\n\n**146 - Shift Code:** map letters to positions, apply an offset and wrap with modulo; reverse the offset to decode.\n\n**147 - Mastermind:** keep a secret colour sequence, compare guesses and count exact-position matches separately from wrong-position matches without double-counting duplicates.\n\n**148 - Passwords:** manage unique user IDs and check the book's password criteria before writing CSV records.\n\nThis is an educational exercise, not secure production password storage.\n\n**149 - Times Table:** validate a numeric input and generate a multiplication table; the web version uses console output instead of Tkinter.\n\n**150 - Art Gallery:** store artists and artworks in SQLite, relate them with IDs, and query matching records.\n\nKeep menu actions separate from database functions.\n\n```python\nalphabet = \"abcdefghijklmnopqrstuvwxyz\"\nindex = alphabet.index(\"z\")\nprint(alphabet[(index + 1) % len(alphabet)])  # a\n```\n\n### Key syntax\n\nFor a shift cipher use `(index + offset) % len(alphabet)`.\n\nPreserve characters outside the chosen alphabet.\n\nCheck both positive and negative offsets.\n\nBuild project menus with a clear quit option.\n\n```python\nalphabet = \"abcdefghijklmnopqrstuvwxyz\"\nprint(alphabet[(0 - 1) % len(alphabet)])  # z\n```\n\n### Worked example\n\n```python\nalphabet = \"abcdefghijklmnopqrstuvwxyz\"\n\ndef shift(message, offset):\n    result = \"\"\n    for character in message.lower():\n        if character in alphabet:\n            index = alphabet.index(character)\n            result += alphabet[(index + offset) % len(alphabet)]\n        else:\n            result += character\n    return result\n\nmessage = input(\"Message: \")\nencoded = shift(message, 3)\nprint(\"Encoded:\", encoded)\nprint(\"Decoded:\", shift(encoded, -3))\n```",
      "conceptEn": "### Essential idea\n\nPlan each project as input, processing, storage and output.\n\nSplit the work into small functions and test each one before combining them.\n\nReuse the techniques from earlier chapters instead of adding unfamiliar libraries.\n\n**146 - Shift Code:** map letters to positions, apply an offset and wrap with modulo; reverse the offset to decode.\n\n**147 - Mastermind:** keep a secret colour sequence, compare guesses and count exact-position matches separately from wrong-position matches without double-counting duplicates.\n\n**148 - Passwords:** manage unique user IDs and check the book's password criteria before writing CSV records.\n\nThis is an educational exercise, not secure production password storage.\n\n**149 - Times Table:** validate a numeric input and generate a multiplication table; the web version uses console output instead of Tkinter.\n\n**150 - Art Gallery:** store artists and artworks in SQLite, relate them with IDs, and query matching records.\n\nKeep menu actions separate from database functions.\n\n```python\nalphabet = \"abcdefghijklmnopqrstuvwxyz\"\nindex = alphabet.index(\"z\")\nprint(alphabet[(index + 1) % len(alphabet)])  # a\n```\n\n### Key syntax\n\nFor a shift cipher use `(index + offset) % len(alphabet)`.\n\nPreserve characters outside the chosen alphabet.\n\nCheck both positive and negative offsets.\n\nBuild project menus with a clear quit option.\n\n```python\nalphabet = \"abcdefghijklmnopqrstuvwxyz\"\nprint(alphabet[(0 - 1) % len(alphabet)])  # z\n```\n\n### Worked example\n\n```python\nalphabet = \"abcdefghijklmnopqrstuvwxyz\"\n\ndef shift(message, offset):\n    result = \"\"\n    for character in message.lower():\n        if character in alphabet:\n            index = alphabet.index(character)\n            result += alphabet[(index + offset) % len(alphabet)]\n        else:\n            result += character\n    return result\n\nmessage = input(\"Message: \")\nencoded = shift(message, 3)\nprint(\"Encoded:\", encoded)\nprint(\"Decoded:\", shift(encoded, -3))\n```",
      "codeExample": "alphabet = \"abcdefghijklmnopqrstuvwxyz\"\n\ndef shift(message, offset):\n    result = \"\"\n    for character in message.lower():\n        if character in alphabet:\n            index = alphabet.index(character)\n            result += alphabet[(index + offset) % len(alphabet)]\n        else:\n            result += character\n    return result\n\nmessage = input(\"Message: \")\nencoded = shift(message, 3)\nprint(\"Encoded:\", encoded)\nprint(\"Decoded:\", shift(encoded, -3))",
      "pitfalls": "- Do not regenerate a game secret each turn.\n\n- Handle repeated colours without counting one secret position twice.\n\n- Plain CSV passwords and a shift cipher are not appropriate security solutions.",
      "pitfallsEn": "- Do not regenerate a game secret each turn.\n\n- Handle repeated colours without counting one secret position twice.\n\n- Plain CSV passwords and a shift cipher are not appropriate security solutions.",
      "practiceTask": "Finish the five projects in order. For each one, test a normal case, a boundary case and an invalid input. Follow the workspace's web adaptation where a desktop window is required.",
      "practiceTaskEn": "Finish the five projects in order. For each one, test a normal case, a boundary case and an invalid input. Follow the workspace's web adaptation where a desktop window is required.",
      "quiz": [
        {
          "type": "mcq",
          "q": "Wrap a cipher position with?",
          "qEn": "Wrap a cipher position with?",
          "options": [
            "Modulo %",
            "Division /",
            "Exponent **",
            "Assignment ="
          ],
          "optionsEn": [
            "Modulo %",
            "Division /",
            "Exponent **",
            "Assignment ="
          ],
          "answer": 0,
          "explanation": "Modulo %"
        },
        {
          "type": "mcq",
          "q": "Decode a positive shift with?",
          "qEn": "Decode a positive shift with?",
          "options": [
            "The same shift",
            "A negative shift",
            "A random shift",
            "A larger shift"
          ],
          "optionsEn": [
            "The same shift",
            "A negative shift",
            "A random shift",
            "A larger shift"
          ],
          "answer": 1,
          "explanation": "A negative shift"
        },
        {
          "type": "mcq",
          "q": "Are plain CSV passwords production-safe?",
          "qEn": "Are plain CSV passwords production-safe?",
          "options": [
            "Yes",
            "No",
            "Only short ones",
            "Only with headers"
          ],
          "optionsEn": [
            "Yes",
            "No",
            "Only short ones",
            "Only with headers"
          ],
          "answer": 1,
          "explanation": "No"
        },
        {
          "type": "mcq",
          "q": "Art Gallery storage uses?",
          "qEn": "Art Gallery storage uses?",
          "options": [
            "SQLite",
            "Only strings",
            "Turtle",
            "NumPy"
          ],
          "optionsEn": [
            "SQLite",
            "Only strings",
            "Turtle",
            "NumPy"
          ],
          "answer": 0,
          "explanation": "SQLite"
        },
        {
          "type": "fill",
          "q": "Modulo for a 26-letter alphabet",
          "qEn": "Modulo for a 26-letter alphabet",
          "codeBefore": "new_index = (index + offset) ",
          "codeAfter": " 26",
          "answer": "%"
        }
      ]
    },
    "chapter": {
      "lessonId": "book-projects",
      "title": "Projects: Combine Your Skills",
      "first": 146,
      "last": 150
    }
  }
];

export const pythonBookLessons: PythonLesson[] = source.map(record => record.lesson);
export const pythonBookChapters: BookChapter[] = source.map(record => record.chapter);
export const getBookChapter = (lessonId: string) => pythonBookChapters.find(chapter => chapter.lessonId === lessonId);
export const getChapterForChallenge = (number: number) => pythonBookChapters.find(chapter => number >= chapter.first && number <= chapter.last);

export const pythonBookModules: PythonModule[] = [
  { id: "m1-basics", order: 1, title: "1. First Programs", titleEn: "1. First Programs", description: "Input, decisions, strings and maths", descriptionEn: "Input, decisions, strings and maths", level: "Beginner", emoji: "💻", color: "from-primary to-accent" },
  { id: "m2-flow", order: 2, title: "2. Repetition and Drawing", titleEn: "2. Repetition and Drawing", description: "Loops, random values and turtle graphics", descriptionEn: "Loops, random values and turtle graphics", level: "Beginner", emoji: "🔁", color: "from-primary to-accent" },
  { id: "m3-data", order: 3, title: "3. Organizing Data", titleEn: "3. Organizing Data", description: "Collections, strings, arrays and nested records", descriptionEn: "Collections, strings, arrays and nested records", level: "Intermediate", emoji: "📦", color: "from-primary to-accent" },
  { id: "m4-functions", order: 4, title: "4. Files and Functions", titleEn: "4. Files and Functions", description: "Text files, CSV and reusable subprograms", descriptionEn: "Text files, CSV and reusable subprograms", level: "Intermediate", emoji: "🛠️", color: "from-primary to-accent" },
  { id: "m5-oop", order: 5, title: "5. Desktop Interface Concepts", titleEn: "5. Desktop Interface Concepts", description: "Tkinter widgets and console equivalents", descriptionEn: "Tkinter widgets and console equivalents", level: "Intermediate", emoji: "🪟", color: "from-primary to-accent" },
  { id: "m6-mastery", order: 6, title: "6. Databases and Projects", titleEn: "6. Databases and Projects", description: "SQLite and five integrated projects", descriptionEn: "SQLite and five integrated projects", level: "Advanced", emoji: "🚀", color: "from-primary to-accent" },
];
