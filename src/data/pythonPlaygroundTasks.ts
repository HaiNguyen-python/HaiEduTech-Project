/** Clear, testable playground briefs for each Python by Example chapter. */
export interface PlaygroundTask {
  goal: string;
  steps: string[];
  sampleInput?: string;
  expectedOutput: string;
}

export const pythonPlaygroundTasks: Record<string, PlaygroundTask> = {
  "m1-l4-io": {
    goal: "Write a bill splitter that reads a total and a number of people, then prints each person's share.",
    steps: ["Ask for the bill total with float(input(...)).", "Ask for the number of people with int(input(...)).", "Divide and print the share to 2 decimal places with an f-string."],
    sampleInput: "24\n3",
    expectedOutput: "Each person pays: 8.00",
  },
  "m2-1-ifelse": {
    goal: "Classify an age as Child, Teenager, Adult or Senior.",
    steps: ["Read the age as an integer.", "Use if / elif / else: under 13 Child, under 20 Teenager, under 65 Adult, otherwise Senior.", "Test the boundary ages 12, 13, 19, 20 and 65."],
    sampleInput: "65",
    expectedOutput: "Senior",
  },
  "book-strings": {
    goal: "Read one word and describe it.",
    steps: ["Read a word and remove extra spaces with .strip().", "Print its length with len() and its uppercase version with .upper().", "Print the first character with word[0] and the rest with word[1:]."],
    sampleInput: "python",
    expectedOutput: "Length: 6\nUpper: PYTHON\nFirst: p\nRest: ython",
  },
  "book-maths": {
    goal: "Calculate the volume of a cylinder.",
    steps: ["import math and read radius and height as floats.", "Compute volume = math.pi * radius ** 2 * height.", "Print the result to 3 decimal places."],
    sampleInput: "2\n5",
    expectedOutput: "Volume: 62.832",
  },
  "m2-l2-forloop": {
    goal: "Print a countdown, then the total of 1 to 10.",
    steps: ["Use for i in range(10, 0, -1) to print 10 down to 1.", "Print \"Go\" once, after the loop.", "Use a second loop with an accumulator to add 1 to 10 and print the total."],
    expectedOutput: "10\n9\n...\n1\nGo\nTotal: 55",
  },
  "m2-l3-while": {
    goal: "Keep reading numbers until the user types stop, then report the count and total.",
    steps: ["Read the first value before the loop.", "Inside while value != \"stop\": add to the total, add 1 to the count, read the next value.", "After the loop print the count and total. Test stopping immediately too."],
    sampleInput: "4\n6\n10\nstop",
    expectedOutput: "Numbers entered: 3\nTotal: 20",
  },
  "book-random": {
    goal: "Build a guessing game that repeats until the guess is correct.",
    steps: ["Pick secret = random.randint(1, 10) once, before the loop.", "Loop: read a guess, add 1 to attempts, print Too high / Too low.", "When correct, print the number of attempts."],
    sampleInput: "5\n8\n7",
    expectedOutput: "Too low\nToo high\nCorrect in 3 attempts (example run)",
  },
  "book-turtle": {
    goal: "Plan a regular polygon: print each move and the turn angle.",
    steps: ["Read the number of sides as an integer.", "Compute turn = 360 / sides.", "Use a for loop to print one \"Forward 80; turn ...\" line per side, then the total turn (always 360)."],
    sampleInput: "4",
    expectedOutput: "Forward 80; turn 90.0 (x4)\nTotal turn: 360.0",
  },
  "m3-l1-list": {
    goal: "Manage a guest list and a dictionary of ages.",
    steps: ["Start with guests = [\"Ava\", \"Mia\"] and append a name you read.", "Check with if name in guests and print the result, then remove the name.", "Store ages in a dictionary and print one with ages.get(name, \"Unknown\")."],
    sampleInput: "Leo",
    expectedOutput: "Leo is on the list: True\nGuests: ['Ava', 'Mia']\nAva is 20",
  },
  "m3-l6-strings": {
    goal: "Analyse a surname: first three letters and vowel count.",
    steps: ["Read a surname and print surname[:3].", "Set vowels = 0, then loop over surname.lower() and add 1 for each letter in \"aeiou\".", "Print the vowel count."],
    sampleInput: "Nguyen",
    expectedOutput: "First three: Ngu\nVowels: 2",
  },
  "book-arrays": {
    goal: "Store whole-number scores in an array and summarise them.",
    steps: ["from array import array and create scores = array(\"i\", [...]).", "Append one score you read with int(input(...)).", "Print the sorted scores, the highest and the average to 1 decimal place."],
    sampleInput: "70",
    expectedOutput: "Sorted: [55, 70, 80, 90]\nHighest: 90\nAverage: 73.8",
  },
  "book-2d": {
    goal: "Use a 2D list as a small grid of marks.",
    steps: ["Create marks = [[7, 8, 9], [6, 5, 8]] (one row per student).", "Use nested for loops to print each row on one line.", "Print the total of each row and the value at marks[1][2]."],
    expectedOutput: "7 8 9 -> 24\n6 5 8 -> 19\nmarks[1][2] = 8",
  },
  "m6-l1-files": {
    goal: "Save names to a text file, then read them back.",
    steps: ["Open \"names.txt\" with mode \"a\" and write two names, each ending with \\n.", "Open it again with mode \"r\" and loop over the lines.", "Print each name with .strip() and the number of lines."],
    expectedOutput: "Ava\nLeo\nLines: 2 (more if you run it again, because \"a\" appends)",
  },
  "book-csv": {
    goal: "Write rows to a CSV file and read one column back.",
    steps: ["import csv and write a header plus two rows to \"scores.csv\" with csv.writer.", "Read the file with csv.reader and skip the header with next().", "Print each name with its score and the total of all scores."],
    expectedOutput: "Ava 80\nLeo 70\nTotal: 150",
  },
  "m4-l1-define": {
    goal: "Split a program into reusable functions.",
    steps: ["Define get_number(prompt) that returns int(input(prompt)).", "Define area(width, height) that returns width * height.", "Call both and print the area. Keep input in one function and the calculation in the other."],
    sampleInput: "4\n5",
    expectedOutput: "Area: 20",
  },
  "book-tkinter": {
    goal: "Simulate a GUI greeting in the console (Tkinter only runs on a desktop).",
    steps: ["Read a name as if it came from an Entry box.", "Write a function on_click(name) that returns the greeting text.", "Print the returned text as if it were a Label update."],
    sampleInput: "Hai",
    expectedOutput: "Label: Hello, Hai!",
  },
  "book-more-tkinter": {
    goal: "Simulate a list box: add items and show the selected one.",
    steps: ["Keep items in a list called listbox.", "Add three items you read in a for loop.", "Read an index and print the selected item, or \"No selection\" if the index is out of range."],
    sampleInput: "Red\nBlue\nGreen\n1",
    expectedOutput: "Selected: Blue",
  },
  "book-sqlite": {
    goal: "Create an in-memory table, insert rows and query them.",
    steps: ["import sqlite3 and connect to \":memory:\".", "CREATE TABLE students (name TEXT, score INTEGER) and insert two rows with ? placeholders.", "SELECT rows WHERE score >= 75 and print them."],
    expectedOutput: "('Ava', 80)",
  },
  "book-projects": {
    goal: "Build a mini quiz program that combines input, loops, lists and a function.",
    steps: ["Store questions and answers as a list of tuples.", "Write ask(question, answer) that returns True when the reply matches (ignore case).", "Loop over the questions, keep a score and print it out of the total."],
    sampleInput: "4\nparis",
    expectedOutput: "Score: 2/2",
  },
};
