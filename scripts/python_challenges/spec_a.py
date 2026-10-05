from build_lib import C, T

C(1, "Hello Name", "Chào tên", "easy",
  "Ask for the user's first name and display the output message Hello [First Name].",
  "Hỏi tên của người dùng và hiển thị thông điệp Hello [Tên].",
  'name = input("What is your first name? ")\nprint("Hello", name)',
  [T(["Alice"], ["Hello", "Alice"]), T(["Minh"], ["Hello", "Minh"])],
  ["Use input() to ask a question and store the answer in a variable.", "print() can show several items separated by commas."],
  ["input", "print", "variables"])

C(2, "Hello Full Name", "Chào họ tên", "easy",
  "Ask for the user's first name and then ask for their surname and display the output message Hello [First Name] [Surname].",
  "Hỏi tên, sau đó hỏi họ của người dùng và hiển thị Hello [Tên] [Họ].",
  'firstname = input("What is your first name? ")\nsurname = input("What is your surname? ")\nprint("Hello", firstname, surname)',
  [T(["Alice", "Smith"], ["Hello", "Alice Smith"]), T(["Lan", "Nguyen"], ["Hello", "Lan Nguyen"])],
  ["Ask two questions and store each answer in its own variable.", "Print both variables after the word Hello."],
  ["input", "print"])

C(3, "Gummy Bear Joke", "Truyện cười gấu dẻo", "easy",
  'Write code that will display the joke "What do you call a bear with no teeth?" and on the next line display the answer "A gummy bear!" Try to create it using only one line of code.',
  'Viết code hiển thị câu đố "What do you call a bear with no teeth?" và ở dòng tiếp theo hiển thị đáp án "A gummy bear!". Hãy thử chỉ dùng một dòng code.',
  'print("What do you call a bear with no teeth?\\nA gummy bear!")',
  [T([], None)],
  ["\\n inside a string starts a new line.", "You can put both sentences inside one print()."],
  ["print", "strings"])

C(4, "Add Two Numbers", "Cộng hai số", "easy",
  "Ask the user to enter two numbers. Add them together and display the answer as The total is [answer].",
  "Yêu cầu người dùng nhập hai số. Cộng chúng lại và hiển thị The total is [kết quả].",
  'num1 = int(input("Enter the first number: "))\nnum2 = int(input("Enter the second number: "))\nanswer = num1 + num2\nprint("The total is", answer)',
  [T(["4", "6"], ["total", "10"]), T(["25", "17"], ["total", "42"])],
  ["input() always gives text, so wrap it in int() to get a number.", "Add the numbers before printing."],
  ["input", "int", "maths"])

C(5, "Add Then Multiply", "Cộng rồi nhân", "easy",
  "Ask the user to enter three numbers. Add together the first two numbers and then multiply this total by the third. Display the answer as The answer is [answer].",
  "Yêu cầu nhập ba số. Cộng hai số đầu rồi nhân tổng với số thứ ba. Hiển thị The answer is [kết quả].",
  'num1 = int(input("Enter the first number: "))\nnum2 = int(input("Enter the second number: "))\nnum3 = int(input("Enter the third number: "))\nanswer = (num1 + num2) * num3\nprint("The answer is", answer)',
  [T(["2", "3", "4"], ["answer", "20"]), T(["5", "5", "10"], ["answer", "100"])],
  ["Use brackets so the addition happens before the multiplication."],
  ["input", "int", "maths"])

C(6, "Pizza Slices", "Lát bánh pizza", "easy",
  "Ask how many slices of pizza the user started with and ask how many slices they have eaten. Work out how many slices they have left and display the answer in a user-friendly format.",
  "Hỏi người dùng lúc đầu có bao nhiêu lát pizza và đã ăn bao nhiêu lát. Tính số lát còn lại và hiển thị câu trả lời dễ hiểu.",
  'start = int(input("How many slices of pizza did you start with? "))\neaten = int(input("How many slices have you eaten? "))\nleft = start - eaten\nprint("You have", left, "slices left")',
  [T(["8", "3"], ["5"]), T(["12", "12"], ["0"])],
  ["Subtract the slices eaten from the starting number."],
  ["input", "int", "maths"])

C(7, "Next Birthday", "Sinh nhật tới", "easy",
  "Ask the user for their name and their age. Add 1 to their age and display the output [Name] next birthday you will be [new age].",
  "Hỏi tên và tuổi của người dùng. Cộng thêm 1 tuổi và hiển thị [Tên] next birthday you will be [tuổi mới].",
  'name = input("What is your name? ")\nage = int(input("How old are you? "))\nnewage = age + 1\nprint(name, "next birthday you will be", newage)',
  [T(["Alice", "15"], ["Alice", "16"]), T(["Nam", "9"], ["Nam", "10"])],
  ["Convert the age with int() before adding 1."],
  ["input", "int", "print"])

C(8, "Split the Bill", "Chia hóa đơn", "easy",
  "Ask for the total price of the bill, then ask how many diners there are. Divide the total bill by the number of diners and show how much each person must pay.",
  "Hỏi tổng tiền hóa đơn, sau đó hỏi có bao nhiêu người ăn. Chia tổng tiền cho số người và cho biết mỗi người phải trả bao nhiêu.",
  'bill = float(input("What is the total price of the bill? "))\ndiners = int(input("How many diners are there? "))\neach = bill / diners\nprint("Each person must pay", each)',
  [T(["100", "4"], ["25"]), T(["90", "3"], ["30"])],
  ["Money can have decimals, so use float() for the bill.", "Use / to divide."],
  ["input", "float", "maths"])

C(9, "Days to Hours, Minutes, Seconds", "Đổi ngày sang giờ, phút, giây", "easy",
  "Write a program that will ask for a number of days and then will show how many hours, minutes and seconds are in that number of days.",
  "Viết chương trình hỏi số ngày, rồi cho biết số ngày đó có bao nhiêu giờ, phút và giây.",
  'days = int(input("Enter a number of days: "))\nhours = days * 24\nminutes = hours * 60\nseconds = minutes * 60\nprint("In", days, "days there are...")\nprint(hours, "hours")\nprint(minutes, "minutes")\nprint(seconds, "seconds")',
  [T(["1"], ["24", "1440", "86400"]), T(["2"], ["48", "2880", "172800"])],
  ["1 day = 24 hours, 1 hour = 60 minutes, 1 minute = 60 seconds."],
  ["input", "int", "maths"])

C(10, "Kilograms to Pounds", "Đổi kilogam sang pound", "easy",
  "There are 2.204 pounds in a kilogram. Ask the user to enter a weight in kilograms and convert it to pounds.",
  "1 kilogam bằng 2.204 pound. Yêu cầu người dùng nhập cân nặng theo kilogam và đổi sang pound.",
  'kg = float(input("Enter the weight in kilograms: "))\npounds = kg * 2.204\nprint("That is", pounds, "pounds")',
  [T(["10"], ["22.04"]), T(["5"], ["11.02"])],
  ["Multiply the kilograms by 2.204."],
  ["input", "float", "maths"])

C(11, "How Many Times?", "Chia được bao nhiêu lần?", "easy",
  "Ask the user to enter a number over 100 and then enter a number under 10 and tell them how many times the smaller number goes into the larger number in a user-friendly format.",
  "Yêu cầu nhập một số lớn hơn 100, rồi một số nhỏ hơn 10. Cho biết số nhỏ chia hết vào số lớn bao nhiêu lần bằng một câu dễ hiểu.",
  'big = int(input("Enter a number over 100: "))\nsmall = int(input("Enter a number under 10: "))\nanswer = big // small\nprint(small, "goes into", big, answer, "times")',
  [T(["150", "7"], ["7", "150", "21"]), T(["200", "5"], ["5", "200", "40"])],
  ["// is whole number division: 150 // 7 gives 21."],
  ["input", "int", "maths"])

C(12, "Smaller Number First", "Số nhỏ in trước", "easy",
  "Ask for two numbers. If the first one is larger than the second, display the second number first and then the first number, otherwise show the first number first and then the second.",
  "Hỏi hai số. Nếu số thứ nhất lớn hơn số thứ hai thì in số thứ hai trước rồi đến số thứ nhất, ngược lại in số thứ nhất trước rồi đến số thứ hai.",
  'num1 = int(input("Enter the first number: "))\nnum2 = int(input("Enter the second number: "))\nif num1 > num2:\n    print(num2, num1)\nelse:\n    print(num1, num2)',
  [T(["9", "3"], ["3", "9"]), T(["2", "8"], ["2", "8"])],
  ["Use if ... else to choose which order to print."],
  ["if", "comparison"])

C(13, "Under 20", "Nhỏ hơn 20", "easy",
  'Ask the user to enter a number that is under 20. If they enter a number that is 20 or more, display the message "Too high", otherwise display "Thank you".',
  'Yêu cầu nhập một số nhỏ hơn 20. Nếu số đó từ 20 trở lên thì hiển thị "Too high", ngược lại hiển thị "Thank you".',
  'num = int(input("Enter a number under 20: "))\nif num >= 20:\n    print("Too high")\nelse:\n    print("Thank you")',
  [T(["25"], None), T(["7"], None), T(["20"], None)],
  [">= means greater than or equal to."],
  ["if", "comparison"])

C(14, "Between 10 and 20", "Trong khoảng 10 đến 20", "easy",
  'Ask the user to enter a number between 10 and 20 (inclusive). If they enter a number within this range, display the message "Thank you", otherwise display the message "Incorrect answer".',
  'Yêu cầu nhập một số từ 10 đến 20 (tính cả hai đầu). Nếu số nằm trong khoảng này thì hiển thị "Thank you", ngược lại hiển thị "Incorrect answer".',
  'num = int(input("Enter a number between 10 and 20: "))\nif num >= 10 and num <= 20:\n    print("Thank you")\nelse:\n    print("Incorrect answer")',
  [T(["15"], None), T(["25"], None), T(["10"], None)],
  ["Use and to check two conditions at once."],
  ["if", "and"])

C(15, "Favourite Colour", "Màu yêu thích", "easy",
  'Ask the user to enter their favourite colour. If they enter "red", "RED" or "Red" display the message "I like red too", otherwise display the message "I don\'t like [colour], I prefer red".',
  'Hỏi màu yêu thích của người dùng. Nếu họ nhập "red", "RED" hoặc "Red" thì hiển thị "I like red too", ngược lại hiển thị "I don\'t like [màu], I prefer red".',
  'colour = input("What is your favourite colour? ")\nif colour == "red" or colour == "RED" or colour == "Red":\n    print("I like red too")\nelse:\n    print("I don\'t like", colour + ", I prefer red")',
  [T(["Red"], None), T(["blue"], None)],
  ["Use or to accept any of the three spellings."],
  ["if", "or", "strings"])

C(16, "Rain and Wind", "Mưa và gió", "easy",
  'Ask the user if it is raining and convert their answer to lower case so it doesn\'t matter what case they type it in. If they answer "yes", ask if it is windy. If they answer "yes" to this second question, display the answer "It is too windy for an umbrella", otherwise display the message "Take an umbrella". If they did not answer yes to the first question, display the answer "Enjoy your day".',
  'Hỏi trời có mưa không và đổi câu trả lời sang chữ thường. Nếu trả lời "yes" thì hỏi tiếp có gió không. Nếu lại "yes" thì hiển thị "It is too windy for an umbrella", ngược lại hiển thị "Take an umbrella". Nếu câu đầu không phải yes thì hiển thị "Enjoy your day".',
  'raining = input("Is it raining? ").lower()\nif raining == "yes":\n    windy = input("Is it windy? ").lower()\n    if windy == "yes":\n        print("It is too windy for an umbrella")\n    else:\n        print("Take an umbrella")\nelse:\n    print("Enjoy your day")',
  [T(["YES", "yes"], None), T(["yes", "no"], None), T(["no"], None)],
  ["Put the second if inside the first one (indent it).", ".lower() changes text to lower case."],
  ["if", "nested if", "lower"])

C(17, "What Can You Do at Your Age?", "Tuổi này làm được gì?", "easy",
  'Ask the user\'s age. If they are 18 or over, display the message "You can vote", if they are aged 17, display the message "You can learn to drive", if they are 16, display the message "You can buy a lottery ticket", if they are under 16, display the message "You can go Trick-or-Treating".',
  'Hỏi tuổi người dùng. Từ 18 trở lên: "You can vote"; 17 tuổi: "You can learn to drive"; 16 tuổi: "You can buy a lottery ticket"; dưới 16: "You can go Trick-or-Treating".',
  'age = int(input("How old are you? "))\nif age >= 18:\n    print("You can vote")\nelif age == 17:\n    print("You can learn to drive")\nelif age == 16:\n    print("You can buy a lottery ticket")\nelse:\n    print("You can go Trick-or-Treating")',
  [T(["20"], None), T(["17"], None), T(["16"], None), T(["10"], None)],
  ["Use if, elif and else to check one condition after another."],
  ["if", "elif"])

C(18, "Too Low, Correct, Too High", "Thấp, đúng, cao", "easy",
  'Ask the user to enter a number. If it is under 10, display the message "Too low", if their number is between 10 and 20, display "Correct", otherwise display "Too high".',
  'Yêu cầu nhập một số. Dưới 10: "Too low"; từ 10 đến 20: "Correct"; còn lại: "Too high".',
  'num = int(input("Enter a number: "))\nif num < 10:\n    print("Too low")\nelif num <= 20:\n    print("Correct")\nelse:\n    print("Too high")',
  [T(["5"], None), T(["15"], None), T(["30"], None)],
  ["After checking num < 10, the elif only needs to check num <= 20."],
  ["if", "elif"])

C(19, "One, Two or Three", "Một, hai hay ba", "easy",
  'Ask the user to enter 1, 2 or 3. If they enter a 1, display the message "Thank you", if they enter a 2, display "Well done", if they enter a 3, display "Correct". If they enter anything else, display "Error message".',
  'Yêu cầu nhập 1, 2 hoặc 3. Nhập 1: "Thank you"; 2: "Well done"; 3: "Correct"; khác: "Error message".',
  'num = input("Enter 1, 2 or 3: ")\nif num == "1":\n    print("Thank you")\nelif num == "2":\n    print("Well done")\nelif num == "3":\n    print("Correct")\nelse:\n    print("Error message")',
  [T(["1"], None), T(["2"], None), T(["3"], None), T(["7"], None)],
  ["Keeping the answer as text means typing a letter will not crash the program."],
  ["if", "elif"])

C(20, "Length of a Name", "Độ dài của tên", "easy",
  "Ask the user to enter their first name and then display the length of their name.",
  "Yêu cầu nhập tên rồi hiển thị độ dài của tên.",
  'name = input("Enter your first name: ")\nprint(len(name))',
  [T(["Alice"], ["5"]), T(["Minh"], ["4"])],
  ["len() counts the characters in a string."],
  ["strings", "len"])

C(21, "Full Name and Its Length", "Họ tên và độ dài", "easy",
  "Ask the user to enter their first name and then ask them to enter their surname. Join them together with a space between and display the name and the length of whole name.",
  "Hỏi tên rồi hỏi họ. Ghép lại với một dấu cách ở giữa, hiển thị họ tên và độ dài của cả họ tên.",
  'firstname = input("Enter your first name: ")\nsurname = input("Enter your surname: ")\nname = firstname + " " + surname\nprint(name)\nprint(len(name))',
  [T(["Alice", "Smith"], ["Alice Smith", "11"]), T(["Lan", "Tran"], ["Lan Tran", "8"])],
  ["Use + to join strings, with \" \" in the middle.", "The space counts in the length."],
  ["strings", "len", "concatenation"])

C(22, "Title Case Name", "Viết hoa chữ cái đầu", "easy",
  "Ask the user to enter their first name and surname in lower case. Change the case to title case and join them together. Display the finished result.",
  "Yêu cầu nhập tên và họ bằng chữ thường. Đổi sang dạng viết hoa chữ cái đầu (title case), ghép lại và hiển thị kết quả.",
  'firstname = input("Enter your first name in lower case: ")\nsurname = input("Enter your surname in lower case: ")\nname = firstname.title() + " " + surname.title()\nprint(name)',
  [T(["alice", "smith"], ["Alice Smith"]), T(["lan", "tran"], ["Lan Tran"])],
  [".title() makes the first letter of each word upper case."],
  ["strings", "title"])

C(23, "Nursery Rhyme Slice", "Cắt câu đồng dao", "easy",
  "Ask the user to type in the first line of a nursery rhyme and display the length of the string. Ask for a starting number and an ending number and then display just that section of the text (remember Python starts counting from 0 and not 1).",
  "Yêu cầu nhập dòng đầu của một bài đồng dao và hiển thị độ dài. Hỏi vị trí bắt đầu và kết thúc, rồi chỉ hiển thị đoạn chữ đó (nhớ Python đếm từ 0).",
  'rhyme = input("Type the first line of a nursery rhyme: ")\nprint("This has", len(rhyme), "letters in it")\nstart = int(input("Enter a starting number: "))\nend = int(input("Enter an end number: "))\nprint(rhyme[start:end])',
  [T(["Mary had a little lamb", "0", "4"], ["22", "Mary"]), T(["Twinkle twinkle little star", "8", "15"], ["27", "twinkle"])],
  ["text[start:end] gives the characters from start up to (but not including) end."],
  ["strings", "slicing", "len"])

C(24, "Upper Case Word", "Chữ in hoa", "easy",
  "Ask the user to type in any word and display it in upper case.",
  "Yêu cầu nhập một từ bất kỳ và hiển thị nó bằng chữ in hoa.",
  'word = input("Type in a word: ")\nprint(word.upper())',
  [T(["hello"], None), T(["Python"], None)],
  [".upper() changes every letter to upper case."],
  ["strings", "upper"])

C(25, "Short or Long Name", "Tên ngắn hay dài", "easy",
  "Ask the user to enter their first name. If the length of their first name is under five characters, ask them to enter their surname and join them together (without a space) and display the name in upper case. If the length of the first name is five or more characters, display their first name in lower case.",
  "Hỏi tên. Nếu tên ít hơn 5 ký tự, hỏi thêm họ, ghép lại (không có dấu cách) và in hoa. Nếu tên từ 5 ký tự trở lên, hiển thị tên bằng chữ thường.",
  'name = input("Enter your first name: ")\nif len(name) < 5:\n    surname = input("Enter your surname: ")\n    name = name + surname\n    print(name.upper())\nelse:\n    print(name.lower())',
  [T(["Tom", "Lee"], None), T(["Alexander"], None)],
  ["Check len(name) < 5 with an if statement."],
  ["strings", "if", "len"])

C(26, "Pig Latin", "Tiếng Pig Latin", "easy",
  'Pig Latin takes the first consonant of a word, moves it to the end of the word and adds on an "ay". If a word begins with a vowel you just add "way" to the end. For example, pig becomes igpay, banana becomes ananabay, and aardvark becomes aardvarkway. Create a program that will ask the user to enter a word and change it into Pig Latin. Make sure the new word is displayed in lower case.',
  'Pig Latin chuyển phụ âm đầu của từ xuống cuối và thêm "ay". Nếu từ bắt đầu bằng nguyên âm thì chỉ thêm "way". Ví dụ: pig thành igpay, banana thành ananabay, aardvark thành aardvarkway. Viết chương trình nhận một từ và đổi sang Pig Latin, hiển thị bằng chữ thường.',
  'word = input("Enter a word: ").lower()\nfirst = word[0]\nif first in "aeiou":\n    newword = word + "way"\nelse:\n    newword = word[1:] + first + "ay"\nprint(newword)',
  [T(["pig"], None), T(["Banana"], None), T(["aardvark"], None)],
  ["word[0] is the first letter and word[1:] is the rest.", "Use in \"aeiou\" to test for a vowel."],
  ["strings", "slicing", "if"])

C(27, "Double a Decimal", "Nhân đôi số thập phân", "easy",
  "Ask the user to enter a number with lots of decimal places. Multiply this number by two and display the answer.",
  "Yêu cầu nhập một số có nhiều chữ số thập phân. Nhân số đó với 2 và hiển thị kết quả.",
  'num = float(input("Enter a number with lots of decimal places: "))\nprint(num * 2)',
  [T(["1.25"], ["2.5"]), T(["3.14159"], ["6.28318"])],
  ["float() keeps the decimal places."],
  ["float", "maths"])

C(28, "Two Decimal Places", "Hai chữ số thập phân", "easy",
  "Update program 027 so that it will display the answer to two decimal places.",
  "Sửa chương trình 027 để hiển thị kết quả làm tròn 2 chữ số thập phân.",
  'num = float(input("Enter a number with lots of decimal places: "))\nanswer = num * 2\nprint(round(answer, 2))',
  [T(["3.14159"], ["6.28"]), T(["1.23456"], ["2.47"])],
  ["round(number, 2) rounds to two decimal places."],
  ["float", "round"])

C(29, "Square Root", "Căn bậc hai", "easy",
  "Ask the user to enter an integer that is over 500. Work out the square root of that number and display it to two decimal places.",
  "Yêu cầu nhập một số nguyên lớn hơn 500. Tính căn bậc hai và hiển thị với 2 chữ số thập phân.",
  'import math\nnum = int(input("Enter a number over 500: "))\nanswer = math.sqrt(num)\nprint(round(answer, 2))',
  [T(["600"], ["24.49"]), T(["900"], ["30"])],
  ["Put import math at the top, then use math.sqrt()."],
  ["math", "sqrt", "round"])

C(30, "Pi to Five Places", "Số pi 5 chữ số", "easy",
  "Display pi (π) to five decimal places.",
  "Hiển thị số pi (π) với 5 chữ số thập phân.",
  'import math\nprint(round(math.pi, 5))',
  [T([], None)],
  ["math.pi holds the value of pi."],
  ["math", "round"])

C(31, "Area of a Circle", "Diện tích hình tròn", "easy",
  "Ask the user to enter the radius of a circle (measurement from the centre point to the edge). Work out the area of the circle (π*radius²).",
  "Yêu cầu nhập bán kính hình tròn (từ tâm ra mép). Tính diện tích hình tròn (π × bán kính²).",
  'import math\nradius = float(input("Enter the radius: "))\narea = math.pi * radius ** 2\nprint("The area is", area)',
  [T(["2"], ["12.566"]), T(["10"], ["314.159"])],
  ["** 2 squares a number.", "Use math.pi for π."],
  ["math", "pi", "power"])

C(32, "Volume of a Cylinder", "Thể tích hình trụ", "easy",
  "Ask for the radius and the depth of a cylinder and work out the total volume (circle area*depth) rounded to three decimal places.",
  "Hỏi bán kính và chiều cao (độ sâu) của hình trụ, tính thể tích (diện tích đáy × chiều cao) làm tròn 3 chữ số thập phân.",
  'import math\nradius = float(input("Enter the radius: "))\ndepth = float(input("Enter the depth: "))\narea = math.pi * radius ** 2\nvolume = area * depth\nprint("The volume is", round(volume, 3))',
  [T(["3", "5"], ["141.372"]), T(["1", "2"], ["6.283"])],
  ["Work out the circle area first, then multiply by the depth."],
  ["math", "round"])

C(33, "Divide with Remainder", "Chia có dư", "easy",
  'Ask the user to enter two numbers. Use whole number division to divide the first number by the second and also work out the remainder and display the answer in a user-friendly way (e.g. if they enter 7 and 2 display "7 divided by 2 is 3 with 1 remaining").',
  'Yêu cầu nhập hai số. Dùng phép chia lấy phần nguyên và phép chia lấy dư, hiển thị dễ hiểu (ví dụ nhập 7 và 2 thì hiển thị "7 divided by 2 is 3 with 1 remaining").',
  'num1 = int(input("Enter the first number: "))\nnum2 = int(input("Enter the second number: "))\nanswer = num1 // num2\nremainder = num1 % num2\nprint(num1, "divided by", num2, "is", answer, "with", remainder, "remaining")',
  [T(["7", "2"], ["7", "2", "3", "1"]), T(["20", "6"], ["20", "6", "3", "2"])],
  ["// gives the whole number part, % gives the remainder."],
  ["maths", "floor division", "modulo"])

C(34, "Square or Triangle", "Hình vuông hay tam giác", "easy",
  "Display the following message:\n1) Square\n2) Triangle\nEnter a number:\nIf the user enters 1, then it should ask them for the length of one of its sides and display the area. If they select 2, it should ask for the base and height of the triangle and display the area. If they type in anything else, it should give them a suitable error message.",
  "Hiển thị menu:\n1) Square\n2) Triangle\nEnter a number:\nNếu nhập 1, hỏi độ dài cạnh và hiển thị diện tích hình vuông. Nếu nhập 2, hỏi đáy và chiều cao rồi hiển thị diện tích tam giác. Nếu nhập khác, hiển thị thông báo lỗi phù hợp.",
  'print("1) Square")\nprint("2) Triangle")\nchoice = input("Enter a number: ")\nif choice == "1":\n    side = float(input("Enter the length of one side: "))\n    print("The area is", side * side)\nelif choice == "2":\n    base = float(input("Enter the base: "))\n    height = float(input("Enter the height: "))\n    print("The area is", base * height / 2)\nelse:\n    print("Incorrect option selected")',
  [T(["1", "4"], ["16"]), T(["2", "6", "3"], ["9"]), T(["5"], ["re:error|incorrect|invalid|wrong|not"])],
  ["Square area = side × side; triangle area = base × height ÷ 2."],
  ["if", "elif", "menu"])

C(35, "Name Three Times", "Tên ba lần", "medium",
  "Ask the user to enter their name and then display their name three times.",
  "Yêu cầu nhập tên rồi hiển thị tên đó ba lần.",
  'name = input("Enter your name: ")\nfor i in range(3):\n    print(name)',
  [T(["Alice"], ["Alice", "Alice", "Alice"])],
  ["range(3) repeats the loop three times."],
  ["for loop", "range"])

C(36, "Name a Number of Times", "Tên lặp theo số", "medium",
  "Alter program 035 so that it will ask the user to enter their name and a number and then display their name that number of times.",
  "Sửa chương trình 035: hỏi tên và một số, rồi hiển thị tên đúng số lần đó.",
  'name = input("Enter your name: ")\nnum = int(input("Enter a number: "))\nfor i in range(num):\n    print(name)',
  [T(["Bob", "2"], None), T(["Lan", "4"], None)],
  ["Use the number the user typed inside range()."],
  ["for loop", "range"])

C(37, "Letters on Separate Lines", "Mỗi chữ một dòng", "medium",
  "Ask the user to enter their name and display each letter in their name on a separate line.",
  "Yêu cầu nhập tên và hiển thị từng chữ cái trên một dòng riêng.",
  'name = input("Enter your name: ")\nfor letter in name:\n    print(letter)',
  [T(["Tom"], None), T(["Alice"], None)],
  ["for letter in name: goes through the string one character at a time."],
  ["for loop", "strings"])

C(38, "Repeat the Letters", "Lặp các chữ cái", "medium",
  "Change program 037 to also ask for a number. Display their name (one letter at a time on each line) and repeat this for the number of times they entered.",
  "Sửa chương trình 037 để hỏi thêm một số. Hiển thị tên (mỗi chữ một dòng) và lặp lại đúng số lần đã nhập.",
  'name = input("Enter your name: ")\nnum = int(input("Enter a number: "))\nfor i in range(num):\n    for letter in name:\n        print(letter)',
  [T(["Al", "3"], None), T(["Tom", "2"], None)],
  ["Put one for loop inside another."],
  ["for loop", "nested loop"])

C(39, "Times Table", "Bảng cửu chương", "medium",
  "Ask the user to enter a number between 1 and 12 and then display the times table for that number.",
  "Yêu cầu nhập một số từ 1 đến 12 rồi hiển thị bảng nhân của số đó.",
  'num = int(input("Enter a number between 1 and 12: "))\nfor i in range(1, 13):\n    print(i, "x", num, "=", i * num)',
  [T(["5"], ["5", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55", "60"]), T(["9"], ["9", "18", "27", "36", "45", "54", "63", "72", "81", "90", "99", "108"])],
  ["range(1, 13) gives 1 up to 12."],
  ["for loop", "range", "maths"])

C(40, "Count Down from 50", "Đếm ngược từ 50", "medium",
  "Ask for a number below 50 and then count down from 50 to that number, making sure you show the number they entered in the output.",
  "Hỏi một số nhỏ hơn 50 rồi đếm ngược từ 50 về số đó, nhớ hiển thị cả số người dùng nhập.",
  'num = int(input("Enter a number below 50: "))\nfor i in range(50, num - 1, -1):\n    print(i)',
  [T(["45"], None), T(["48"], None)],
  ["A third value of -1 in range() counts backwards.", "The end of range() is not included, so stop at num - 1."],
  ["for loop", "range"])

C(41, "Name or Too High", "Tên hoặc quá cao", "medium",
  'Ask the user to enter their name and a number. If the number is less than 10, then display their name that number of times; otherwise display the message "Too high" three times.',
  'Hỏi tên và một số. Nếu số nhỏ hơn 10 thì hiển thị tên đúng số lần đó; ngược lại hiển thị "Too high" ba lần.',
  'name = input("Enter your name: ")\nnum = int(input("Enter a number: "))\nif num < 10:\n    for i in range(num):\n        print(name)\nelse:\n    for i in range(3):\n        print("Too high")',
  [T(["Ann", "3"], None), T(["Ann", "12"], None)],
  ["Put a for loop inside each branch of the if."],
  ["for loop", "if"])

C(42, "Choose What to Add", "Chọn số để cộng", "medium",
  "Set a variable called total to 0. Ask the user to enter five numbers and after each input ask them if they want that number included. If they do, then add the number to the total. If they do not want it included, don't add it to the total. After they have entered all five numbers, display the total.",
  "Tạo biến total = 0. Yêu cầu nhập năm số, sau mỗi số hỏi có muốn tính số đó không. Nếu có thì cộng vào total, nếu không thì bỏ qua. Sau năm số, hiển thị total.",
  'total = 0\nfor i in range(5):\n    num = int(input("Enter a number: "))\n    ans = input("Do you want this number included? (y/n) ")\n    if ans == "y":\n        total = total + num\nprint(total)',
  [T(["1", "y", "2", "n", "3", "y", "4", "n", "5", "y"], ["9"]), T(["10", "y", "10", "y", "10", "y", "10", "y", "10", "y"], ["50"])],
  ["Ask both questions inside the loop.", "Only add to total when the answer is y."],
  ["for loop", "if", "total"])

C(43, "Count Up or Down", "Đếm lên hay xuống", "medium",
  'Ask which direction the user wants to count (up or down). If they select up, then ask them for the top number and then count from 1 to that number. If they select down, ask them to enter a number below 20 and then count down from 20 to that number. If they entered something other than up or down, display the message "I don\'t understand".',
  'Hỏi người dùng muốn đếm lên (up) hay xuống (down). Nếu up, hỏi số lớn nhất rồi đếm từ 1 đến số đó. Nếu down, hỏi một số nhỏ hơn 20 rồi đếm ngược từ 20 về số đó. Nếu nhập khác, hiển thị "I don\'t understand".',
  'direction = input("Do you want to count up or down? ")\nif direction == "up":\n    top = int(input("Enter the top number: "))\n    for i in range(1, top + 1):\n        print(i)\nelif direction == "down":\n    bottom = int(input("Enter a number below 20: "))\n    for i in range(20, bottom - 1, -1):\n        print(i)\nelse:\n    print("I don\'t understand")',
  [T(["up", "4"], None), T(["down", "17"], None), T(["sideways"], None)],
  ["Use range(1, top + 1) to count up and range(20, bottom - 1, -1) to count down."],
  ["for loop", "if"])

C(44, "Party Invitations", "Mời dự tiệc", "medium",
  'Ask how many people the user wants to invite to a party. If they enter a number below 10, ask for the names and after each name display "[name] has been invited". If they enter a number which is 10 or higher, display the message "Too many people".',
  'Hỏi muốn mời bao nhiêu người dự tiệc. Nếu nhỏ hơn 10, hỏi từng tên và sau mỗi tên hiển thị "[tên] has been invited". Nếu từ 10 trở lên, hiển thị "Too many people".',
  'num = int(input("How many people do you want to invite? "))\nif num < 10:\n    for i in range(num):\n        name = input("Enter a name: ")\n        print(name, "has been invited")\nelse:\n    print("Too many people")',
  [T(["2", "Ann", "Ben"], None), T(["12"], None)],
  ["Ask for the name inside the loop."],
  ["for loop", "if"])

C(45, "Total Over 50", "Tổng vượt 50", "medium",
  'Set the total to 0 to start with. While the total is 50 or less, ask the user to input a number. Add that number to the total and print the message "The total is... [total]". Stop the loop when the total is over 50.',
  'Bắt đầu với total = 0. Khi total còn nhỏ hơn hoặc bằng 50, yêu cầu nhập một số, cộng vào total và in "The total is... [total]". Dừng vòng lặp khi total vượt 50.',
  'total = 0\nwhile total <= 50:\n    num = int(input("Enter a number: "))\n    total = total + num\n    print("The total is...", total)',
  [T(["20", "20", "20"], ["20", "40", "60"]), T(["51"], ["51"])],
  ["while total <= 50: keeps looping until the total is over 50."],
  ["while loop", "total"])

C(46, "Over Five", "Lớn hơn 5", "medium",
  'Ask the user to enter a number. Keep asking until they enter a value over 5 and then display the message "The last number you entered was a [number]" and stop the program.',
  'Yêu cầu nhập một số. Tiếp tục hỏi cho đến khi người dùng nhập số lớn hơn 5, rồi hiển thị "The last number you entered was a [số]" và dừng.',
  'num = 0\nwhile num <= 5:\n    num = int(input("Enter a number: "))\nprint("The last number you entered was a", num)',
  [T(["2", "4", "9"], ["9"]), T(["6"], ["6"])],
  ["Start num at 0 so the loop runs at least once."],
  ["while loop"])

C(47, "Keep Adding", "Cộng tiếp", "medium",
  'Ask the user to enter a number and then enter another number. Add these two numbers together and then ask if they want to add another number. If they enter "y", ask them to enter another number and keep adding numbers until they do not answer "y". Once the loop has stopped, display the total.',
  'Yêu cầu nhập hai số và cộng lại, rồi hỏi có muốn cộng thêm số nữa không. Nếu nhập "y", hỏi thêm số và tiếp tục cộng cho đến khi không trả lời "y". Khi dừng, hiển thị tổng.',
  'num1 = int(input("Enter a number: "))\nnum2 = int(input("Enter another number: "))\ntotal = num1 + num2\nagain = input("Do you want to add another number? (y/n) ")\nwhile again == "y":\n    num = int(input("Enter another number: "))\n    total = total + num\n    again = input("Do you want to add another number? (y/n) ")\nprint("The total is", total)',
  [T(["3", "4", "y", "5", "n"], ["12"]), T(["10", "20", "n"], ["30"])],
  ["Ask the y/n question again at the end of the loop."],
  ["while loop", "total"])

C(48, "Who Is Coming?", "Ai sẽ đến?", "medium",
  'Ask for the name of somebody the user wants to invite to a party. After this, display the message "[name] has now been invited" and add 1 to the count. Then ask if they want to invite somebody else. Keep repeating this until they no longer want to invite anyone else to the party and then display how many people they have coming to the party.',
  'Hỏi tên người muốn mời dự tiệc, hiển thị "[tên] has now been invited" và tăng biến đếm thêm 1. Hỏi có muốn mời thêm ai không. Lặp lại cho đến khi không mời nữa, rồi hiển thị số người sẽ đến.',
  'count = 0\nagain = "y"\nwhile again == "y":\n    name = input("Who do you want to invite? ")\n    print(name, "has now been invited")\n    count = count + 1\n    again = input("Do you want to invite somebody else? (y/n) ")\nprint("You have", count, "people coming to your party")',
  [T(["Ann", "y", "Ben", "y", "Cara", "n"], ["Ann", "Ben", "Cara", "3"]), T(["Dan", "n"], ["Dan", "1"])],
  ["Keep a count variable and add 1 each time round the loop."],
  ["while loop", "count"])

C(49, "Guess compnum", "Đoán số compnum", "medium",
  'Create a variable called compnum and set the value to 50. Ask the user to enter a number. While their guess is not the same as the compnum value, tell them if their guess is too low or too high and ask them to have another guess. If they enter the same value as compnum, display the message "Well done, you took [count] attempts".',
  'Tạo biến compnum = 50. Yêu cầu nhập một số. Khi số đoán khác compnum, cho biết đoán thấp hay cao và hỏi đoán lại. Khi đoán đúng, hiển thị "Well done, you took [count] attempts".',
  'compnum = 50\nguess = int(input("Can you guess my number? "))\ncount = 1\nwhile guess != compnum:\n    if guess < compnum:\n        print("Too low")\n    else:\n        print("Too high")\n    guess = int(input("Have another guess: "))\n    count = count + 1\nprint("Well done, you took", count, "attempts")',
  [T(["20", "70", "50"], ["low", "high", "3"]), T(["50"], ["1"])],
  ["Count the first guess as attempt 1."],
  ["while loop", "if", "count"])

C(50, "Between 10 and 20 (Loop)", "Từ 10 đến 20 (vòng lặp)", "medium",
  'Ask the user to enter a number between 10 and 20. If they enter a value under 10, display the message "Too low" and ask them to try again. If they enter a value above 20, display the message "Too high" and ask them to try again. Keep repeating this until they enter a value that is between 10 and 20 and then display the message "Thank you".',
  'Yêu cầu nhập một số từ 10 đến 20. Dưới 10 thì hiển thị "Too low" và nhập lại; trên 20 thì "Too high" và nhập lại. Lặp cho đến khi số nằm trong khoảng 10 đến 20, rồi hiển thị "Thank you".',
  'num = int(input("Enter a number between 10 and 20: "))\nwhile num < 10 or num > 20:\n    if num < 10:\n        print("Too low")\n    else:\n        print("Too high")\n    num = int(input("Try again: "))\nprint("Thank you")',
  [T(["5", "25", "15"], ["Too low", "Too high", "Thank you"]), T(["12"], ["Thank you"])],
  ["Loop while the number is outside the range."],
  ["while loop", "if"])

C(51, "Green Bottles", "Mười chai xanh", "medium",
  'Using the song "10 green bottles", display the lines "There are [num] green bottles hanging on the wall, [num] green bottles hanging on the wall, and if 1 green bottle should accidentally fall". Then ask the question "how many green bottles will be hanging on the wall?" If the user answers correctly, display the message "There will be [num] green bottles hanging on the wall". If they answer incorrectly, display the message "No, try again" until they get it right. When the number of green bottles gets down to 0, display the message "There are no more green bottles hanging on the wall".',
  'Dùng bài hát "10 green bottles": hiển thị "There are [num] green bottles hanging on the wall, [num] green bottles hanging on the wall, and if 1 green bottle should accidentally fall". Hỏi "how many green bottles will be hanging on the wall?". Trả lời đúng thì hiển thị "There will be [num] green bottles hanging on the wall", sai thì "No, try again" cho đến khi đúng. Khi còn 0 chai, hiển thị "There are no more green bottles hanging on the wall".',
  'num = 10\nwhile num > 0:\n    print("There are", num, "green bottles hanging on the wall,", num, "green bottles hanging on the wall, and if 1 green bottle should accidentally fall")\n    num = num - 1\n    answer = int(input("How many green bottles will be hanging on the wall? "))\n    while answer != num:\n        print("No, try again")\n        answer = int(input("How many green bottles will be hanging on the wall? "))\n    print("There will be", num, "green bottles hanging on the wall")\nprint("There are no more green bottles hanging on the wall")',
  [T(["9", "7", "8", "7", "6", "5", "4", "3", "2", "1", "0"], ["10", "9", "try again", "8", "no more"])],
  ["Use one while loop for the bottles and another inside it for wrong answers."],
  ["while loop", "nested loop"])
