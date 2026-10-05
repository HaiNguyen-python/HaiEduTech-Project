from build_lib import C, T

COLOURS = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "black", "white", "brown", "grey", "gray"]

C(52, "Random 1 to 100", "Số ngẫu nhiên 1 đến 100", "medium",
  "Display a random integer between 1 and 100 inclusive.",
  "Hiển thị một số nguyên ngẫu nhiên từ 1 đến 100 (tính cả hai đầu).",
  'import random\nnum = random.randint(1, 100)\nprint(num)',
  [T([], ["re:\\b([1-9][0-9]?|100)\\b"])],
  ["import random, then random.randint(1, 100) includes both 1 and 100."],
  ["random", "randint"])

C(53, "Random Fruit", "Trái cây ngẫu nhiên", "medium",
  "Display a random fruit from a list of five fruits.",
  "Hiển thị ngẫu nhiên một loại trái cây từ danh sách năm loại.",
  'import random\nfruit = random.choice(["apple", "banana", "mango", "orange", "grape"])\nprint(fruit)',
  [T([], [])],
  ["random.choice() picks one item from a list."],
  ["random", "choice", "lists"])

C(54, "Heads or Tails", "Sấp hay ngửa", "medium",
  'Randomly choose either heads or tails ("h" or "t"). Ask the user to make their choice. If their choice is the same as the randomly selected value, display the message "You win", otherwise display "Bad luck". At the end, tell the user if the computer selected heads or tails.',
  'Chọn ngẫu nhiên sấp hoặc ngửa ("h" hoặc "t"). Hỏi người dùng chọn gì. Nếu giống với giá trị ngẫu nhiên thì hiển thị "You win", ngược lại "Bad luck". Cuối cùng cho biết máy đã chọn heads hay tails.',
  'import random\ncoin = random.choice(["h", "t"])\nguess = input("Enter h or t: ")\nif guess == coin:\n    print("You win")\nelse:\n    print("Bad luck")\nif coin == "h":\n    print("It was heads")\nelse:\n    print("It was tails")',
  [T(["h"], ["You win|Bad luck", "heads|tails|h|t"]), T(["t"], ["You win|Bad luck", "heads|tails|h|t"])],
  ["random.choice([\"h\", \"t\"]) picks the coin."],
  ["random", "if"])

C(55, "Two Guesses", "Hai lần đoán", "medium",
  'Randomly choose a number between 1 and 5. Ask the user to pick a number. If they guess correctly, display the message "Well done", otherwise tell them if they are too high or too low and ask them to pick a second number. If they guess correctly on their second guess, display "Correct", otherwise display "You lose".',
  'Chọn ngẫu nhiên một số từ 1 đến 5. Yêu cầu người dùng đoán. Đúng thì hiển thị "Well done", sai thì cho biết cao hay thấp và cho đoán lần hai. Lần hai đúng thì hiển thị "Correct", sai thì "You lose".',
  'import random\ncomp = random.randint(1, 5)\nguess = int(input("Enter a number between 1 and 5: "))\nif guess == comp:\n    print("Well done")\nelse:\n    if guess > comp:\n        print("Too high")\n    else:\n        print("Too low")\n    guess = int(input("Pick a second number: "))\n    if guess == comp:\n        print("Correct")\n    else:\n        print("You lose")',
  [T(["3", "2"], ["Well done|Correct|You lose"]), T(["1", "5"], ["Well done|Correct|You lose"])],
  ["Use a nested if for the second guess."],
  ["random", "if"])

C(56, "Guess 1 to 10", "Đoán số 1 đến 10", "medium",
  'Randomly pick a whole number between 1 and 10. Ask the user to enter a number and keep entering numbers until they enter the number that was randomly picked. (Display a message such as "Well done" at the end.)',
  'Chọn ngẫu nhiên một số nguyên từ 1 đến 10. Yêu cầu người dùng nhập số và tiếp tục nhập cho đến khi trùng số máy chọn. (Cuối cùng hiển thị một thông báo như "Well done".)',
  'import random\ncomp = random.randint(1, 10)\nguess = int(input("Enter a number: "))\nwhile guess != comp:\n    guess = int(input("Try again: "))\nprint("Well done")',
  [T([str(i) for i in range(1, 11)], [])],
  ["A while loop keeps asking while the guess is wrong."],
  ["random", "while loop"])

C(57, "Guess with Clues", "Đoán số có gợi ý", "medium",
  "Update program 056 so that it tells the user if they are too high or too low before they pick again.",
  "Sửa chương trình 056 để cho biết số đoán quá cao hay quá thấp trước khi đoán lại.",
  'import random\ncomp = random.randint(1, 10)\nguess = int(input("Enter a number: "))\nwhile guess != comp:\n    if guess > comp:\n        print("Too high")\n    else:\n        print("Too low")\n    guess = int(input("Try again: "))\nprint("Well done")',
  [T([str(i) for i in range(1, 11)], ["re:low|well done|correct"])],
  ["Put an if inside the while loop."],
  ["random", "while loop", "if"])

C(58, "Maths Quiz", "Đố vui toán học", "medium",
  "Make a maths quiz that asks five questions by randomly generating two whole numbers to make the question (e.g. [num1] + [num2]). Ask the user to enter the answer. If they get it right add a point to their score. At the end of the quiz, tell them how many they got correct out of five.",
  "Làm bài đố toán gồm năm câu, mỗi câu tạo ngẫu nhiên hai số nguyên (ví dụ [num1] + [num2]). Người dùng nhập đáp án, đúng thì cộng 1 điểm. Cuối bài cho biết đúng bao nhiêu câu trên năm.",
  'import random\nscore = 0\nfor i in range(5):\n    num1 = random.randint(1, 50)\n    num2 = random.randint(1, 50)\n    answer = int(input(str(num1) + " + " + str(num2) + " = "))\n    if answer == num1 + num2:\n        score = score + 1\nprint("You got", score, "out of 5")',
  [T(["0", "0", "0", "0", "0"], ["re:out of (5|five)|/ ?5"])],
  ["Use a for loop for the five questions and a score variable."],
  ["random", "for loop", "score"])

C(59, "Guess the Colour", "Đoán màu", "medium",
  'Display five colours and ask the user to pick one. If they pick the same as the program has chosen, say "Well done", otherwise display a witty answer which involves the correct colour, e.g. "I bet you are GREEN with envy" or "You are probably feeling BLUE right now". Ask them to guess again; if they have still not got it right, keep giving them the same clue and ask the user to enter a colour until they guess it correctly.',
  'Hiển thị năm màu và hỏi người dùng chọn một. Nếu trùng màu chương trình chọn thì nói "Well done", ngược lại đưa ra một câu dí dỏm có nhắc màu đúng, ví dụ "I bet you are GREEN with envy" hoặc "You are probably feeling BLUE right now". Tiếp tục cho đoán và nhắc cùng gợi ý cho đến khi đoán đúng.',
  'import random\ncolours = ["red", "blue", "green", "yellow", "pink"]\ncomp = random.choice(colours)\nprint(colours)\nguess = input("Pick a colour: ").lower()\nwhile guess != comp:\n    if comp == "red":\n        print("I bet you are RED in the face")\n    elif comp == "blue":\n        print("You are probably feeling BLUE right now")\n    elif comp == "green":\n        print("I bet you are GREEN with envy")\n    elif comp == "yellow":\n        print("Are you feeling YELLOW, a bit scared?")\n    else:\n        print("Think PINK!")\n    guess = input("Guess again: ").lower()\nprint("Well done")',
  [T(COLOURS, ["Well done"])],
  ["Use .lower() so RED and red both match."],
  ["random", "while loop", "lists"])

TURTLE_NOTE = "Web version: the drawing appears under the console. All usual turtle commands work."
TURTLE_NOTE_VI = "Bản web: hình vẽ hiện ngay dưới Console. Các lệnh turtle quen thuộc đều dùng được."

def turtle(n, title, vi, desc, desc_vi, sol, check, note, hints, tags):
    C(n, title, vi, "medium", desc, desc_vi, sol, [T([], None, note)], hints, ["turtle"] + tags,
      turtle=check, web_note=TURTLE_NOTE, web_note_vi=TURTLE_NOTE_VI)

turtle(60, "Draw a Square", "Vẽ hình vuông", "Draw a square.", "Vẽ một hình vuông.",
  'import turtle\nfor i in range(4):\n    turtle.forward(100)\n    turtle.right(90)\nturtle.exitonclick()',
  {"minLines": 4}, "A square with 4 equal sides.",
  ["Repeat forward and right(90) four times."], ["for loop"])

turtle(61, "Draw a Triangle", "Vẽ tam giác", "Draw a triangle.", "Vẽ một hình tam giác.",
  'import turtle\nfor i in range(3):\n    turtle.forward(100)\n    turtle.left(120)\nturtle.exitonclick()',
  {"minLines": 3}, "A triangle with 3 sides.",
  ["An equilateral triangle turns 120 degrees at each corner."], ["for loop"])

turtle(62, "Draw a Circle", "Vẽ hình tròn", "Draw a circle.", "Vẽ một hình tròn.",
  'import turtle\nturtle.circle(80)\nturtle.exitonclick()',
  {"minCircles": 1}, "A circle.",
  ["turtle.circle(radius) draws a circle."], [])

turtle(63, "Three Coloured Squares", "Ba hình vuông màu", "Draw three squares in a row with a gap between each. Fill them using three different colours.",
  "Vẽ ba hình vuông thành một hàng, có khoảng cách giữa chúng. Tô mỗi hình một màu khác nhau.",
  'import turtle\ncolours = ["red", "blue", "green"]\nfor colour in colours:\n    turtle.fillcolor(colour)\n    turtle.begin_fill()\n    for i in range(4):\n        turtle.forward(60)\n        turtle.left(90)\n    turtle.end_fill()\n    turtle.penup()\n    turtle.forward(90)\n    turtle.pendown()\nturtle.exitonclick()',
  {"minLines": 12, "minFills": 3}, "Three filled squares in a row, each a different colour.",
  ["Use fillcolor(), begin_fill() and end_fill().", "penup() lets you move without drawing the gap."], ["fill", "for loop"])

turtle(64, "Five-Pointed Star", "Ngôi sao năm cánh", "Draw a five-pointed star.", "Vẽ một ngôi sao năm cánh.",
  'import turtle\nfor i in range(5):\n    turtle.forward(150)\n    turtle.right(144)\nturtle.exitonclick()',
  {"minLines": 5}, "A five-pointed star (5 lines).",
  ["Turn 144 degrees after each line."], ["for loop"])

turtle(65, "Draw 1 2 3", "Vẽ số 1 2 3", "Write the numbers 1, 2 and 3 using straight lines, starting at the bottom of the number one.",
  "Vẽ các chữ số 1, 2 và 3 bằng các nét thẳng, bắt đầu từ chân của số 1.",
  'import turtle\nturtle.left(90)\nturtle.forward(100)\nturtle.penup()\nturtle.goto(40, 100)\nturtle.pendown()\nturtle.goto(90, 100)\nturtle.goto(90, 50)\nturtle.goto(40, 50)\nturtle.goto(40, 0)\nturtle.goto(90, 0)\nturtle.penup()\nturtle.goto(130, 100)\nturtle.pendown()\nturtle.goto(180, 100)\nturtle.goto(180, 0)\nturtle.goto(130, 0)\nturtle.penup()\nturtle.goto(130, 50)\nturtle.pendown()\nturtle.goto(180, 50)\nturtle.hideturtle()\nturtle.exitonclick()',
  {"minLines": 10}, "The numbers 1 2 3 drawn with straight lines.",
  ["goto(x, y) moves straight to a point.", "Lift the pen between numbers with penup()."], ["goto"])

turtle(66, "Colourful Octagon", "Bát giác nhiều màu", "Draw an octagon that uses a different colour (randomly selected from a list of six possible colours) for each line.",
  "Vẽ hình bát giác, mỗi cạnh một màu chọn ngẫu nhiên từ danh sách sáu màu.",
  'import turtle\nimport random\ncolours = ["red", "blue", "green", "orange", "purple", "pink"]\nfor i in range(8):\n    turtle.color(random.choice(colours))\n    turtle.forward(70)\n    turtle.right(45)\nturtle.exitonclick()',
  {"minLines": 8, "minColors": 2}, "An octagon (8 lines) in random colours.",
  ["An octagon turns 45 degrees at each corner.", "Choose the colour inside the loop."], ["random", "for loop"])

turtle(67, "Flower Pattern", "Họa tiết bông hoa", "Create a flower-like pattern by drawing the same shape many times, turning a little each time (as in the picture in the book).",
  "Tạo họa tiết giống bông hoa bằng cách vẽ cùng một hình nhiều lần, mỗi lần xoay một chút (như hình trong sách).",
  'import turtle\nfor i in range(10):\n    for j in range(8):\n        turtle.forward(50)\n        turtle.right(45)\n    turtle.right(36)\nturtle.exitonclick()',
  {"minLines": 40}, "A flower made of 10 rotated octagons.",
  ["Put the octagon loop inside another loop that turns 36 degrees."], ["nested loop"])

turtle(68, "Random Pattern", "Họa tiết ngẫu nhiên", "Draw a pattern that will change each time the program is run. Use the random function to pick the number of lines, the length of each line and the angle of each turn.",
  "Vẽ họa tiết thay đổi mỗi lần chạy. Dùng random để chọn số nét, độ dài mỗi nét và góc quay.",
  'import turtle\nimport random\nlines = random.randint(5, 30)\nfor i in range(lines):\n    length = random.randint(20, 120)\n    angle = random.randint(30, 170)\n    turtle.forward(length)\n    turtle.right(angle)\nturtle.exitonclick()',
  {"minLines": 3}, "A different pattern every run.",
  ["Pick the number of lines first, then a length and angle inside the loop."], ["random", "for loop"])

C(69, "Countries Tuple", "Tuple các nước", "medium",
  "Create a tuple containing the names of five countries and display the whole tuple. Ask the user to enter one of the countries that have been shown to them and then display the index number (i.e. position in the list) of that item in the tuple.",
  "Tạo tuple chứa tên năm quốc gia và hiển thị cả tuple. Yêu cầu nhập một quốc gia trong đó rồi hiển thị chỉ số (vị trí) của nó trong tuple.",
  'countries = ("France", "Japan", "Vietnam", "Finland", "Brazil")\nprint(countries)\ncountry = input("Enter one of the countries: ")\nprint(country, "has index number", countries.index(country))',
  [T(["Vietnam"], ["2"]), T(["France"], ["0"])],
  ["tuple.index(item) gives the position, starting from 0."],
  ["tuples", "index"])

C(70, "Country by Number", "Quốc gia theo số", "medium",
  "Add to program 069 to ask the user to enter a number and display the country in that position.",
  "Bổ sung chương trình 069: hỏi một số và hiển thị quốc gia ở vị trí đó.",
  'countries = ("France", "Japan", "Vietnam", "Finland", "Brazil")\nprint(countries)\ncountry = input("Enter one of the countries: ")\nprint(country, "has index number", countries.index(country))\nnum = int(input("Enter a number between 0 and 4: "))\nprint(countries[num])',
  [T(["Japan", "3"], ["1", "Finland"])],
  ["countries[num] gets the item at that position."],
  ["tuples", "index"])

C(71, "Favourite Sport", "Môn thể thao yêu thích", "medium",
  "Create a list of two sports. Ask the user what their favourite sport is and add this to the end of the list. Sort the list and display it.",
  "Tạo danh sách hai môn thể thao. Hỏi môn thể thao yêu thích của người dùng và thêm vào cuối danh sách. Sắp xếp rồi hiển thị.",
  'sports = ["tennis", "football"]\nsport = input("What is your favourite sport? ")\nsports.append(sport)\nsports.sort()\nprint(sports)',
  [T(["badminton"], ["badminton", "football", "tennis"])],
  ["append() adds to the end, sort() puts the list in order."],
  ["lists", "append", "sort"])

C(72, "Delete a Subject", "Xóa môn học", "medium",
  "Create a list of six school subjects. Ask the user which of these subjects they don't like. Delete the subject they have chosen from the list before you display the list again.",
  "Tạo danh sách sáu môn học. Hỏi người dùng không thích môn nào, xóa môn đó khỏi danh sách rồi hiển thị lại.",
  'subjects = ["Maths", "English", "Science", "History", "Art", "Music"]\nprint(subjects)\ndislike = input("Which of these subjects do you not like? ")\nsubjects.remove(dislike)\nprint(subjects)',
  [T(["History"], ["Maths", "English", "Science", "Art", "Music"])],
  ["list.remove(item) deletes that item."],
  ["lists", "remove"])

C(73, "Favourite Foods Dictionary", "Từ điển món ăn", "medium",
  "Ask the user to enter four of their favourite foods and store them in a dictionary so that they are indexed with numbers starting from 1. Display the dictionary in full, showing the index number and the item. Ask them which they want to get rid of and remove it from the list. Sort the remaining data and display the dictionary.",
  "Yêu cầu nhập bốn món ăn yêu thích và lưu vào dictionary với khóa là số bắt đầu từ 1. Hiển thị toàn bộ dictionary (số và món). Hỏi muốn bỏ món nào và xóa nó. Sắp xếp phần còn lại và hiển thị dictionary.",
  'foods = {}\nfor i in range(1, 5):\n    food = input("Enter a favourite food: ")\n    foods[i] = food\nprint(foods)\nnum = int(input("Which number do you want to get rid of? "))\ndel foods[num]\nprint(sorted(foods.values()))',
  [T(["pizza", "pho", "apple", "rice", "2"], ["pizza", "pho", "apple", "rice", "apple", "pizza", "rice"])],
  ["foods[i] = food adds an item with key i.", "del foods[num] removes it."],
  ["dictionaries", "del", "sorted"])

C(74, "Slice of Colours", "Lát cắt danh sách màu", "medium",
  "Enter a list of ten colours. Ask the user for a starting number between 0 and 4 and an end number between 5 and 9. Display the list for those colours between the start and end numbers the user input.",
  "Tạo danh sách mười màu. Hỏi số bắt đầu (0 đến 4) và số kết thúc (5 đến 9). Hiển thị các màu nằm giữa hai số đó.",
  'colours = ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "pink", "black", "white"]\nstart = int(input("Enter a starting number (0-4): "))\nend = int(input("Enter an end number (5-9): "))\nprint(colours[start:end])',
  [T(["1", "5"], ["orange", "yellow", "green", "blue"]), T(["0", "9"], ["red", "black"])],
  ["colours[start:end] slices the list."],
  ["lists", "slicing"])

C(75, "Three-Digit Numbers", "Số có ba chữ số", "medium",
  'Create a list of four three-digit numbers. Display the list to the user, showing each item from the list on a separate line. Ask the user to enter a three-digit number. If the number they have typed in matches one in the list, display the position of that number in the list, otherwise display the message "That is not in the list".',
  'Tạo danh sách bốn số có ba chữ số. Hiển thị mỗi số trên một dòng. Yêu cầu nhập một số có ba chữ số. Nếu có trong danh sách thì hiển thị vị trí của nó, ngược lại hiển thị "That is not in the list".',
  'nums = [123, 456, 789, 321]\nfor num in nums:\n    print(num)\nguess = int(input("Enter a three-digit number: "))\nif guess in nums:\n    print("It is in position", nums.index(guess))\nelse:\n    print("That is not in the list")',
  [T(["789"], ["2"]), T(["555"], ["not in the list"])],
  ["Use in to check if a value is in the list."],
  ["lists", "in", "index"])

C(76, "Party Guest List", "Danh sách khách mời", "medium",
  'Ask the user to enter the names of three people they want to invite to a party and store them in a list. After they have entered all three names, ask them if they want to add another. If they do, allow them to add more names until they answer "no". When they answer "no", display how many people they have invited to the party.',
  'Yêu cầu nhập tên ba người muốn mời và lưu vào danh sách. Sau đó hỏi có muốn mời thêm không; nếu có thì cho thêm tên cho đến khi trả lời "no". Khi "no", hiển thị tổng số người đã mời.',
  'guests = []\nfor i in range(3):\n    name = input("Enter a name to invite: ")\n    guests.append(name)\nmore = input("Do you want to invite another person? ")\nwhile more != "no":\n    name = input("Enter a name to invite: ")\n    guests.append(name)\n    more = input("Do you want to invite another person? ")\nprint("You have invited", len(guests), "people")',
  [T(["Ann", "Ben", "Cara", "yes", "Dan", "no"], ["4"]), T(["Ann", "Ben", "Cara", "no"], ["3"])],
  ["len(list) counts the items."],
  ["lists", "while loop", "len"])

C(77, "Change the Guest List", "Sửa danh sách khách", "medium",
  'Change program 076 so that once the user has completed their list of names, display the full list and ask them to type in one of the names on the list. Display the position of that name in the list. Ask the user if they still want that person to come to the party. If they answer "no", delete that entry from the list and display the list again.',
  'Sửa chương trình 076: sau khi nhập xong, hiển thị cả danh sách và yêu cầu gõ một tên trong đó. Hiển thị vị trí của tên. Hỏi còn muốn người đó đến không; nếu "no" thì xóa khỏi danh sách và hiển thị lại.',
  'guests = []\nfor i in range(3):\n    name = input("Enter a name to invite: ")\n    guests.append(name)\nmore = input("Do you want to invite another person? ")\nwhile more != "no":\n    name = input("Enter a name to invite: ")\n    guests.append(name)\n    more = input("Do you want to invite another person? ")\nprint(guests)\nname = input("Type in one of the names: ")\nprint(name, "is in position", guests.index(name))\ncoming = input("Do you still want them to come? ")\nif coming == "no":\n    guests.remove(name)\nprint(guests)',
  [T(["Ann", "Ben", "Cara", "no", "Ben", "no"], ["1", "Ann", "Cara"])],
  ["Use index() to find the position and remove() to delete."],
  ["lists", "index", "remove"])

C(78, "Insert a TV Programme", "Chèn chương trình TV", "medium",
  "Create a list containing the titles of four TV programmes and display them on separate lines. Ask the user to enter another show and a position they want it inserted into the list. Display the list again, showing all five TV programmes in their new positions.",
  "Tạo danh sách bốn chương trình TV và hiển thị mỗi cái một dòng. Yêu cầu nhập thêm một chương trình và vị trí muốn chèn. Hiển thị lại cả năm chương trình theo vị trí mới.",
  'shows = ["Doctor Who", "Friends", "Bluey", "Planet Earth"]\nfor show in shows:\n    print(show)\nnew = input("Enter another show: ")\npos = int(input("Enter the position to insert it: "))\nshows.insert(pos, new)\nfor show in shows:\n    print(show)',
  [T(["MasterChef", "1"], ["Doctor Who", "MasterChef", "Friends"])],
  ["list.insert(position, item) puts the item at that position."],
  ["lists", "insert"])

C(79, "Keep the Last Number?", "Giữ số cuối?", "medium",
  'Create an empty list called "nums". Ask the user to enter numbers. After each number is entered, add it to the end of the nums list and display the list. Once they have entered three numbers, ask them if they still want the last number they entered saved. If they say "no", remove the last item from the list. Display the list of numbers.',
  'Tạo danh sách rỗng "nums". Yêu cầu nhập số, sau mỗi số thêm vào cuối nums và hiển thị danh sách. Sau ba số, hỏi có muốn giữ số vừa nhập không. Nếu "no" thì xóa phần tử cuối. Hiển thị danh sách.',
  'nums = []\nfor i in range(3):\n    num = int(input("Enter a number: "))\n    nums.append(num)\n    print(nums)\nkeep = input("Do you want the last number saved? ")\nif keep == "no":\n    nums.pop()\nprint(nums)',
  [T(["4", "8", "15", "no"], ["re:\\[4, 8\\]\\s*$"]), T(["1", "2", "3", "yes"], ["re:\\[1, 2, 3\\]\\s*$"])],
  ["pop() removes the last item."],
  ["lists", "append", "pop"])

C(80, "Name Lengths", "Độ dài họ tên", "medium",
  "Ask the user to enter their first name and then display the length of their first name. Then ask for their surname and display the length of their surname. Join their first name and surname together with a space between and display the result. Finally, display the length of their full name (including the space).",
  "Hỏi tên và hiển thị độ dài tên. Hỏi họ và hiển thị độ dài họ. Ghép tên và họ với dấu cách và hiển thị. Cuối cùng hiển thị độ dài cả họ tên (tính cả dấu cách).",
  'firstname = input("Enter your first name: ")\nprint(len(firstname))\nsurname = input("Enter your surname: ")\nprint(len(surname))\nname = firstname + " " + surname\nprint(name)\nprint(len(name))',
  [T(["Alice", "Smith"], ["5", "5", "Alice Smith", "11"])],
  ["The space between the names counts as one character."],
  ["strings", "len"])

C(81, "Dashes Between Letters", "Gạch nối giữa các chữ", "medium",
  'Ask the user to type in their favourite school subject. Display it with "-" after each letter, e.g. S-p-a-n-i-s-h-.',
  'Yêu cầu nhập môn học yêu thích. Hiển thị môn đó với "-" sau mỗi chữ, ví dụ S-p-a-n-i-s-h-.',
  'subject = input("What is your favourite school subject? ")\nfor letter in subject:\n    print(letter, end="-")\nprint()',
  [T(["Spanish"], ["re:S-p-a-n-i-s-h-"]), T(["Art"], ["re:A-r-t-"])],
  ["print(letter, end=\"-\") prints a dash instead of a new line."],
  ["strings", "for loop", "end"])

C(82, "Slice a Poem", "Cắt câu thơ", "medium",
  "Show the user a line of text from your favourite poem and ask for a starting and ending point. Display the characters between those two points.",
  "Hiển thị một dòng thơ yêu thích và hỏi điểm bắt đầu và kết thúc. Hiển thị các ký tự nằm giữa hai điểm đó.",
  'poem = "The woods are lovely, dark and deep"\nprint(poem)\nstart = int(input("Enter a starting number: "))\nend = int(input("Enter an end number: "))\nprint(poem[start:end])',
  [T(["4", "9"], None), T(["0", "3"], None)],
  ["Strings can be sliced just like lists."],
  ["strings", "slicing"])

C(83, "Upper Case Only", "Chỉ chữ in hoa", "medium",
  "Ask the user to type in a word in upper case. If they type it in lower case, ask them to try again. Keep repeating this until they type in a message all in uppercase.",
  "Yêu cầu nhập một từ bằng chữ in hoa. Nếu gõ chữ thường thì yêu cầu thử lại. Lặp cho đến khi gõ hoàn toàn chữ in hoa.",
  'word = input("Type a word in upper case: ")\nwhile word != word.upper():\n    word = input("That is not in upper case, try again: ")\nprint("Thank you")',
  [T(["hello", "Hello", "HELLO"], [])],
  ["A word is all upper case when word == word.upper()."],
  ["strings", "while loop", "upper"])

C(84, "Postcode Letters", "Hai chữ đầu mã bưu chính", "medium",
  "Ask the user to type in their postcode. Display the first two letters in uppercase.",
  "Yêu cầu nhập mã bưu chính. Hiển thị hai ký tự đầu bằng chữ in hoa.",
  'postcode = input("Enter your postcode: ")\nprint(postcode[0:2].upper())',
  [T(["pe32 5lp"], ["PE"]), T(["sw1a 1aa"], ["SW"])],
  ["postcode[0:2] gives the first two characters."],
  ["strings", "slicing", "upper"])

C(85, "Count the Vowels", "Đếm nguyên âm", "medium",
  "Ask the user to type in their name and then tell them how many vowels are in their name.",
  "Yêu cầu nhập tên rồi cho biết tên có bao nhiêu nguyên âm.",
  'name = input("Enter your name: ")\ncount = 0\nfor letter in name.lower():\n    if letter in "aeiou":\n        count = count + 1\nprint("Your name has", count, "vowels")',
  [T(["Alice"], ["3"]), T(["Bryn"], ["0"])],
  ["Loop through each letter and add 1 when it is a vowel."],
  ["strings", "for loop", "count"])

C(86, "Confirm Password", "Xác nhận mật khẩu", "medium",
  'Ask the user to enter a new password. Ask them to enter it again. If the two passwords match, display "Thank you". If the letters are correct but in the wrong case, display the message "They must be in the same case", otherwise display the message "Incorrect".',
  'Yêu cầu nhập mật khẩu mới, rồi nhập lại. Nếu hai lần giống hệt nhau thì hiển thị "Thank you". Nếu đúng chữ nhưng khác hoa thường thì hiển thị "They must be in the same case", ngược lại hiển thị "Incorrect".',
  'pw1 = input("Enter a new password: ")\npw2 = input("Enter it again: ")\nif pw1 == pw2:\n    print("Thank you")\nelif pw1.lower() == pw2.lower():\n    print("They must be in the same case")\nelse:\n    print("Incorrect")',
  [T(["Secret1", "Secret1"], None), T(["Secret1", "secret1"], None), T(["Secret1", "Other"], None)],
  ["Compare the lower case versions to spot a case mistake."],
  ["strings", "if", "lower"])

C(87, "Word Backwards", "Từ viết ngược", "medium",
  'Ask the user to type in a word and then display it backwards on separate lines. For instance, if they type in "Hello" it should display o, l, l, e, H, each on its own line.',
  'Yêu cầu nhập một từ rồi hiển thị ngược lại, mỗi chữ một dòng. Ví dụ "Hello" sẽ hiển thị o, l, l, e, H trên từng dòng.',
  'word = input("Type in a word: ")\nfor i in range(len(word) - 1, -1, -1):\n    print(word[i])',
  [T(["Hello"], None), T(["abc"], None)],
  ["Count backwards from len(word) - 1 down to 0."],
  ["strings", "for loop", "range"])

C(88, "Sort in Reverse", "Sắp xếp ngược", "medium",
  "Ask the user for a list of five integers. Store them in an array. Sort the list and display it in reverse order.",
  "Yêu cầu nhập năm số nguyên và lưu vào mảng (array). Sắp xếp và hiển thị theo thứ tự ngược.",
  'from array import *\nnums = array("i", [])\nfor i in range(5):\n    num = int(input("Enter a number: "))\n    nums.append(num)\nnums = sorted(nums)\nnums.reverse()\nprint(nums)',
  [T(["3", "9", "1", "7", "5"], ["9", "7", "5", "3", "1"])],
  ["from array import * lets you use array(\"i\", [])."],
  ["arrays", "sort", "reverse"])

C(89, "Five Random Numbers", "Năm số ngẫu nhiên", "medium",
  "Create an array which will store a list of integers. Generate five random numbers and store them in the array. Display the array (showing each item on a separate line).",
  "Tạo mảng lưu các số nguyên. Sinh năm số ngẫu nhiên và lưu vào mảng. Hiển thị mảng (mỗi phần tử một dòng).",
  'from array import *\nimport random\nnums = array("i", [])\nfor i in range(5):\n    nums.append(random.randint(1, 100))\nfor num in nums:\n    print(num)',
  [T([], ["re:^\\s*-?\\d+\\s*\\n\\s*-?\\d+\\s*\\n\\s*-?\\d+\\s*\\n\\s*-?\\d+\\s*\\n\\s*-?\\d+\\s*$"])],
  ["Use append() inside a loop."],
  ["arrays", "random"])

C(90, "Numbers 10 to 20 Only", "Chỉ số từ 10 đến 20", "medium",
  'Ask the user to enter numbers. If they enter a number between 10 and 20, save it in the array, otherwise display the message "Outside the range". Once five numbers have been successfully added, display the message "Thank you" and display the array with each item shown on a separate line.',
  'Yêu cầu nhập các số. Nếu số từ 10 đến 20 thì lưu vào mảng, ngược lại hiển thị "Outside the range". Khi đã lưu đủ năm số, hiển thị "Thank you" và in mảng, mỗi phần tử một dòng.',
  'from array import *\nnums = array("i", [])\nwhile len(nums) < 5:\n    num = int(input("Enter a number between 10 and 20: "))\n    if num >= 10 and num <= 20:\n        nums.append(num)\n    else:\n        print("Outside the range")\nprint("Thank you")\nfor num in nums:\n    print(num)',
  [T(["5", "12", "30", "15", "10", "20", "18"], ["Outside the range", "Outside the range", "Thank you", "12", "15", "10", "20", "18"])],
  ["Loop while the array has fewer than five items."],
  ["arrays", "while loop", "if"])

C(91, "Count Repeats", "Đếm số lần lặp", "medium",
  "Create an array which contains five numbers (two of which should be repeated). Display the whole array to the user. Ask the user to enter one of the numbers from the array and then display a message saying how many times that number appears in the list.",
  "Tạo mảng năm số (có hai số lặp lại). Hiển thị cả mảng. Yêu cầu nhập một số trong mảng rồi cho biết số đó xuất hiện bao nhiêu lần.",
  'from array import *\nnums = array("i", [5, 7, 5, 9, 7])\nfor num in nums:\n    print(num)\nchoice = int(input("Enter one of the numbers: "))\nprint(choice, "appears", nums.count(choice), "times")',
  [T(["5"], ["5", "2"]), T(["9"], ["9", "1"])],
  ["nums.count(value) counts how often a value appears."],
  ["arrays", "count"])

C(92, "Join Two Arrays", "Nối hai mảng", "medium",
  "Create two arrays (one containing three numbers that the user enters and one containing a set of five random numbers). Join these two arrays together into one large array. Sort this large array and display it so that each number appears on a separate line.",
  "Tạo hai mảng: một mảng gồm ba số do người dùng nhập, một mảng gồm năm số ngẫu nhiên. Nối thành một mảng lớn, sắp xếp và hiển thị mỗi số một dòng.",
  'from array import *\nimport random\nnums1 = array("i", [])\nnums2 = array("i", [])\nfor i in range(3):\n    nums1.append(int(input("Enter a number: ")))\nfor i in range(5):\n    nums2.append(random.randint(1, 100))\nnums1.extend(nums2)\nfor num in sorted(nums1):\n    print(num)',
  [T(["-5", "-1", "500"], ["-5", "-1", "500"])],
  ["extend() adds a whole array to the end of another."],
  ["arrays", "extend", "sort"])

C(93, "Move a Number", "Chuyển một số", "medium",
  "Ask the user to enter five numbers. Sort them into order and present them to the user. Ask them to select one of the numbers. Remove it from the original array and save it in a new array.",
  "Yêu cầu nhập năm số. Sắp xếp và hiển thị. Yêu cầu chọn một số, xóa số đó khỏi mảng ban đầu và lưu vào một mảng mới.",
  'from array import *\nnums = array("i", [])\nfor i in range(5):\n    nums.append(int(input("Enter a number: ")))\nnums = array("i", sorted(nums))\nprint(nums)\nchoice = int(input("Select one of the numbers: "))\nnums.remove(choice)\nnew = array("i", [choice])\nprint(nums)\nprint(new)',
  [T(["4", "2", "8", "6", "1", "6"], ["1, 2, 4, 6, 8", "1, 2, 4, 8", "6"])],
  ["remove() deletes the first matching value."],
  ["arrays", "remove"])

C(94, "Find the Position", "Tìm vị trí", "medium",
  "Display an array of five numbers. Ask the user to select one of the numbers. Once they have selected a number, display the position of that item in the array. If they enter something that is not in the array, ask them to try again until they select a relevant item.",
  "Hiển thị mảng năm số. Yêu cầu chọn một số và hiển thị vị trí của nó. Nếu số không có trong mảng, yêu cầu nhập lại cho đến khi đúng.",
  'from array import *\nnums = array("i", [10, 20, 30, 40, 50])\nprint(nums)\nchoice = int(input("Select one of the numbers: "))\nwhile choice not in nums:\n    choice = int(input("That is not in the array, try again: "))\nprint("It is in position", nums.index(choice))',
  [T(["7", "40"], ["3"]), T(["10"], ["0"])],
  ["Loop while the number is not in the array."],
  ["arrays", "index", "while loop"])

C(95, "Divide the Array", "Chia các phần tử", "medium",
  "Create an array of five numbers between 10 and 100 which each have two decimal places. Ask the user to enter a whole number between 2 and 5. If they enter something outside of that range, display a suitable error message and ask them to try again until they enter a valid amount. Divide each of the numbers in the array by the number the user entered and display the answers shown to two decimal places.",
  "Tạo mảng năm số từ 10 đến 100, mỗi số có hai chữ số thập phân. Yêu cầu nhập số nguyên từ 2 đến 5; nếu ngoài khoảng thì báo lỗi và nhập lại. Chia từng số trong mảng cho số đó và hiển thị kết quả với hai chữ số thập phân.",
  'from array import *\nnums = array("f", [12.50, 45.25, 60.00, 88.80, 99.99])\nnum = int(input("Enter a whole number between 2 and 5: "))\nwhile num < 2 or num > 5:\n    num = int(input("Incorrect value, please enter a number between 2 and 5: "))\nfor x in nums:\n    print(round(x / num, 2))',
  [T(["9", "2"], ["6.25", "22.62|22.63", "30", "44.4", "49.99|50"]), T(["5"], ["2.5", "9.05", "12", "17.76", "20"])],
  ["array(\"f\", [...]) stores decimal numbers.", "round(value, 2) shows two decimal places."],
  ["arrays", "float", "round"])

GRID = "grid = [[2, 5, 8], [3, 7, 4], [1, 6, 9], [4, 2, 0]]"

C(96, "Create a 2D List", "Tạo danh sách 2 chiều", "hard",
  "Create the following using a simple 2D list using the standard Python indexing:\n     0  1  2\n  0  2  5  8\n  1  3  7  4\n  2  1  6  9\n  3  4  2  0\nDisplay the list.",
  "Tạo danh sách 2 chiều sau theo chỉ số chuẩn của Python:\n     0  1  2\n  0  2  5  8\n  1  3  7  4\n  2  1  6  9\n  3  4  2  0\nHiển thị danh sách.",
  GRID + "\nprint(grid)",
  [T([], ["2, 5, 8", "3, 7, 4", "1, 6, 9", "4, 2, 0"])],
  ["Each row is a list inside the main list."],
  ["2D lists"])

C(97, "Row and Column", "Hàng và cột", "hard",
  "Using the 2D list from program 096, ask the user to select a row and a column and display that value.",
  "Dùng danh sách 2 chiều của 096, yêu cầu chọn hàng và cột rồi hiển thị giá trị ở đó.",
  GRID + '\nrow = int(input("Select a row: "))\ncol = int(input("Select a column: "))\nprint(grid[row][col])',
  [T(["1", "1"], ["7"]), T(["3", "0"], ["4"])],
  ["grid[row][col] gives a single value."],
  ["2D lists", "index"])

C(98, "Add to a Row", "Thêm vào một hàng", "hard",
  "Using the 2D list from program 096, ask the user which row they would like displayed and display just that row. Ask them to enter a new value and add it to the end of the row and display the row again.",
  "Dùng danh sách của 096, hỏi muốn xem hàng nào và hiển thị hàng đó. Yêu cầu nhập giá trị mới, thêm vào cuối hàng và hiển thị lại.",
  GRID + '\nrow = int(input("Which row do you want displayed? "))\nprint(grid[row])\nvalue = int(input("Enter a new value: "))\ngrid[row].append(value)\nprint(grid[row])',
  [T(["2", "10"], ["1, 6, 9", "1, 6, 9, 10"])],
  ["grid[row] is a normal list, so append() works."],
  ["2D lists", "append"])

C(99, "Change a Value", "Đổi một giá trị", "hard",
  "Change your previous program to ask the user which row they want displayed. Display that row. Ask which column in that row they want displayed and display the value that is held there. Ask the user if they want to change the value. If they do, ask for a new value and change the data. Finally, display the whole row again.",
  "Sửa chương trình trước: hỏi muốn xem hàng nào và hiển thị hàng đó. Hỏi cột nào và hiển thị giá trị ở đó. Hỏi có muốn đổi giá trị không; nếu có thì nhập giá trị mới và thay. Cuối cùng hiển thị lại cả hàng.",
  GRID + '\nrow = int(input("Which row do you want displayed? "))\nprint(grid[row])\ncol = int(input("Which column do you want displayed? "))\nprint(grid[row][col])\nchange = input("Do you want to change the value? (y/n) ")\nif change == "y":\n    grid[row][col] = int(input("Enter the new value: "))\nprint(grid[row])',
  [T(["0", "2", "y", "99"], ["2, 5, 8", "8", "2, 5, 99"]), T(["1", "0", "n"], ["3, 7, 4", "3", "3, 7, 4"])],
  ["grid[row][col] = value changes one item."],
  ["2D lists"])

SALES = 'sales = {"John": {"N": 3056, "S": 8463, "E": 8441, "W": 2694},\n         "Tom": {"N": 4832, "S": 6786, "E": 4737, "W": 3612},\n         "Anne": {"N": 5239, "S": 4802, "E": 5820, "W": 1859},\n         "Fiona": {"N": 3904, "S": 3645, "E": 8821, "W": 2451}}'

C(100, "Sales Dictionary", "Từ điển doanh số", "hard",
  "Create the following using a 2D dictionary showing the sales each person has made in the different geographical regions:\n          N     S     E     W\nJohn    3056  8463  8441  2694\nTom     4832  6786  4737  3612\nAnne    5239  4802  5820  1859\nFiona   3904  3645  8821  2451\nDisplay the dictionary.",
  "Tạo dictionary 2 chiều thể hiện doanh số của mỗi người theo vùng:\n          N     S     E     W\nJohn    3056  8463  8441  2694\nTom     4832  6786  4737  3612\nAnne    5239  4802  5820  1859\nFiona   3904  3645  8821  2451\nHiển thị dictionary.",
  SALES + "\nprint(sales)",
  [T([], ["John", "3056", "Tom", "4832", "Anne", "5239", "Fiona", "2451"])],
  ["Each person's value is itself a dictionary of regions."],
  ["dictionaries", "2D"])

C(101, "Update Sales", "Cập nhật doanh số", "hard",
  "Using program 100, ask the user for a name and a region. Display the relevant data. Ask the user for the name and region of data they want to change and allow them to make the alteration to the sales figure. Display the sales for all regions for the name they choose.",
  "Dùng chương trình 100, hỏi tên và vùng rồi hiển thị số liệu. Hỏi tên và vùng muốn sửa, cho nhập doanh số mới. Hiển thị doanh số mọi vùng của người đã chọn.",
  SALES + '\nname = input("Enter a name: ")\nregion = input("Enter a region: ")\nprint(sales[name][region])\nname = input("Name of the data to change: ")\nregion = input("Region of the data to change: ")\nsales[name][region] = int(input("Enter the new sales figure: "))\nprint(sales[name])',
  [T(["Tom", "E", "Anne", "W", "2000"], ["4737", "5239", "4802", "5820", "2000"])],
  ["sales[name][region] reads or changes one figure."],
  ["dictionaries", "2D"])

PEOPLE_IN = ["Ann", "15", "5", "Ben", "16", "8", "Cara", "14", "4", "Dan", "17", "9"]

C(102, "Name, Age and Shoe Size", "Tên, tuổi, cỡ giày", "hard",
  "Ask the user to enter the name, age and shoe size for four people. Ask for the name of one of the people in the list and display their age and shoe size.",
  "Yêu cầu nhập tên, tuổi và cỡ giày của bốn người. Hỏi tên một người trong danh sách và hiển thị tuổi và cỡ giày của người đó.",
  'people = {}\nfor i in range(4):\n    name = input("Enter a name: ")\n    age = int(input("Enter their age: "))\n    shoe = int(input("Enter their shoe size: "))\n    people[name] = {"age": age, "shoe size": shoe}\nname = input("Whose details do you want? ")\nprint(people[name])',
  [T(PEOPLE_IN + ["Ben"], ["16", "8"])],
  ["Store each person as a dictionary inside a dictionary."],
  ["dictionaries", "2D", "for loop"])

C(103, "Names and Ages Only", "Chỉ tên và tuổi", "hard",
  "Adapt program 102 to display the names and ages of all the people in the list but do not show their shoe size.",
  "Sửa chương trình 102 để hiển thị tên và tuổi của tất cả mọi người, không hiển thị cỡ giày.",
  'people = {}\nfor i in range(4):\n    name = input("Enter a name: ")\n    age = int(input("Enter their age: "))\n    shoe = int(input("Enter their shoe size: "))\n    people[name] = {"age": age, "shoe size": shoe}\nfor name in people:\n    print(name, people[name]["age"])',
  [T(PEOPLE_IN, ["Ann", "15", "Ben", "16", "Cara", "14", "Dan", "17"])],
  ["Loop through the dictionary and print only name and age."],
  ["dictionaries", "for loop"])

C(104, "Remove a Person", "Xóa một người", "hard",
  "After gathering the four names, ages and shoe sizes, ask the user to enter the name of the person they want to remove from the list. Delete this row from the data and display the other rows on separate lines.",
  "Sau khi nhập bốn người (tên, tuổi, cỡ giày), hỏi tên người muốn xóa. Xóa dòng đó và hiển thị các dòng còn lại, mỗi dòng một người.",
  'people = {}\nfor i in range(4):\n    name = input("Enter a name: ")\n    age = int(input("Enter their age: "))\n    shoe = int(input("Enter their shoe size: "))\n    people[name] = {"age": age, "shoe size": shoe}\nremove = input("Who do you want to remove? ")\ndel people[remove]\nfor name in people:\n    print(name, people[name])',
  [T(PEOPLE_IN + ["Cara"], ["Ann", "Ben", "Dan"])],
  ["del people[name] removes that person."],
  ["dictionaries", "del"])
