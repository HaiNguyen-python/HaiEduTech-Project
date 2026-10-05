from build_lib import C, T

NAMES_SETUP = 'file = open("Names.txt", "w")\nfile.write("Bob\\nSue\\nTom\\nAmy\\nJoe\\n")\nfile.close()'
BOOKS_SETUP = ('file = open("Books.csv", "w")\n'
               'file.write("To Kill A Mockingbird,Harper Lee,1960\\n")\n'
               'file.write("A Brief History of Time,Stephen Hawking,1988\\n")\n'
               'file.write("The Great Gatsby,F. Scott Fitzgerald,1922\\n")\n'
               'file.write("The Man Who Mistook His Wife for a Hat,Oliver Sacks,1985\\n")\n'
               'file.write("Pride and Prejudice,Jane Austen,1813\\n")\n'
               'file.close()')
FILE_NOTE = "Web version: files are saved inside this page's Python, so you can create, read and add to them here. Files the book assumes already exist are created for you before your code runs."
FILE_NOTE_VI = "Bản web: tệp được lưu trong Python của trang này nên bạn có thể tạo, đọc và ghi thêm ngay tại đây. Các tệp mà sách giả định đã có sẽ được tạo sẵn trước khi code chạy."
GUI_NOTE = "Web version: this page cannot open Tkinter windows, so build the same program in the console. Use input() where the window has a text box and a menu choice where it has a button."
GUI_NOTE_VI = "Bản web: trang này không mở được cửa sổ Tkinter, nên hãy làm cùng chương trình đó trên Console. Dùng input() thay cho ô nhập chữ và lựa chọn menu thay cho nút bấm."


def files(*a, **k):
    k.setdefault("web_note", FILE_NOTE)
    k.setdefault("web_note_vi", FILE_NOTE_VI)
    C(*a, **k)


def gui(*a, **k):
    k.setdefault("web_note", GUI_NOTE)
    k.setdefault("web_note_vi", GUI_NOTE_VI)
    C(*a, **k)


files(105, "Numbers.txt", "Tệp Numbers.txt", "hard",
  'Write a new file called "Numbers.txt". Add five numbers to the document which are stored on the same line and only separated by a comma. Once you have run the program, check that the file has been created (here: read it back and display it).',
  'Tạo tệp mới "Numbers.txt". Ghi năm số trên cùng một dòng, chỉ cách nhau bằng dấu phẩy. Sau khi chạy, kiểm tra tệp đã được tạo (ở đây: đọc lại và hiển thị).',
  'file = open("Numbers.txt", "w")\nfile.write("4, 8, 15, 16, 23")\nfile.close()\nfile = open("Numbers.txt", "r")\nprint(file.read())\nfile.close()',
  [T([], ["re:\\d+\\s*,\\s*\\d+\\s*,\\s*\\d+\\s*,\\s*\\d+\\s*,\\s*\\d+"])],
  ["open(\"Numbers.txt\", \"w\") creates a new file for writing.", "Always close() the file."],
  ["files", "write"])

files(106, "Names.txt", "Tệp Names.txt", "hard",
  'Create a new file called "Names.txt". Add five names to the document, which are stored on separate lines. Once you have run the program, check that the file has been created properly (here: read it back and display it).',
  'Tạo tệp mới "Names.txt". Ghi năm cái tên, mỗi tên một dòng. Sau khi chạy, kiểm tra tệp (ở đây: đọc lại và hiển thị).',
  'file = open("Names.txt", "w")\nfile.write("Bob\\n")\nfile.write("Sue\\n")\nfile.write("Tom\\n")\nfile.write("Amy\\n")\nfile.write("Joe\\n")\nfile.close()\nfile = open("Names.txt", "r")\nprint(file.read())\nfile.close()',
  [T([], ["re:^(\\s*\\S.*\\n){4}\\s*\\S"])],
  ["\\n at the end of each name puts the next one on a new line."],
  ["files", "write"])

files(107, "Read Names.txt", "Đọc Names.txt", "hard",
  "Open the Names.txt file and display the data in Python.",
  "Mở tệp Names.txt và hiển thị dữ liệu trong Python.",
  'file = open("Names.txt", "r")\nprint(file.read())\nfile.close()',
  [T([], ["Bob", "Sue", "Tom", "Amy", "Joe"])],
  ["open(name, \"r\") opens a file for reading."],
  ["files", "read"], setup=NAMES_SETUP)

files(108, "Add a Name", "Thêm một tên", "hard",
  "Open the Names.txt file. Ask the user to input a new name. Add this to the end of the file and display the entire file.",
  "Mở tệp Names.txt. Yêu cầu nhập một tên mới, ghi thêm vào cuối tệp và hiển thị toàn bộ tệp.",
  'file = open("Names.txt", "a")\nname = input("Enter a new name: ")\nfile.write(name + "\\n")\nfile.close()\nfile = open("Names.txt", "r")\nprint(file.read())\nfile.close()',
  [T(["Lan"], ["Bob", "Joe", "Lan"])],
  ["Mode \"a\" appends to the end instead of overwriting."],
  ["files", "append"], setup=NAMES_SETUP)

files(109, "Subject File Menu", "Menu tệp môn học", "hard",
  "Display the following menu to the user:\n1) Create a new file\n2) Display the file\n3) Add a new item to the file\nMake a selection 1, 2 or 3:\nAsk the user to enter 1, 2 or 3. If they select anything other than 1, 2 or 3 it should display a suitable error message. If they select 1, ask the user to enter a school subject and save it to a new file called \"Subject.txt\". It should overwrite any existing file with a new file. If they select 2, display the contents of the \"Subject.txt\" file. If they select 3, ask the user to enter a new subject and save it to the file and then display the entire contents of the file. Run the program several times to test the options.",
  "Hiển thị menu:\n1) Create a new file\n2) Display the file\n3) Add a new item to the file\nMake a selection 1, 2 or 3:\nNếu nhập khác 1, 2, 3 thì báo lỗi. Chọn 1: nhập một môn học và lưu vào tệp mới \"Subject.txt\" (ghi đè tệp cũ). Chọn 2: hiển thị nội dung \"Subject.txt\". Chọn 3: nhập môn mới, ghi thêm vào tệp rồi hiển thị toàn bộ tệp. Chạy nhiều lần để thử các lựa chọn.",
  'print("1) Create a new file")\nprint("2) Display the file")\nprint("3) Add a new item to the file")\nchoice = input("Make a selection 1, 2 or 3: ")\nif choice == "1":\n    file = open("Subject.txt", "w")\n    file.write(input("Enter a school subject: ") + "\\n")\n    file.close()\nelif choice == "2":\n    file = open("Subject.txt", "r")\n    print(file.read())\n    file.close()\nelif choice == "3":\n    file = open("Subject.txt", "a")\n    file.write(input("Enter a new subject: ") + "\\n")\n    file.close()\n    file = open("Subject.txt", "r")\n    print(file.read())\n    file.close()\nelse:\n    print("Invalid option")',
  [T(["3", "History"], ["Maths", "History"]), T(["2"], ["Maths"]), T(["9"], ["re:invalid|error|incorrect|not|wrong"])],
  ["Use \"w\" to create, \"r\" to read and \"a\" to add."],
  ["files", "menu", "if"], setup='file = open("Subject.txt", "w")\nfile.write("Maths\\n")\nfile.close()')

files(110, "Names2.txt", "Tệp Names2.txt", "hard",
  "Using the Names.txt file you created earlier, display the list of names in Python. Ask the user to type in one of the names and then save all the names except the one they entered into a new file called Names2.txt.",
  "Dùng tệp Names.txt đã tạo, hiển thị danh sách tên. Yêu cầu gõ một tên, rồi lưu tất cả các tên trừ tên đó vào tệp mới Names2.txt.",
  'file = open("Names.txt", "r")\nprint(file.read())\nfile.close()\nselected = input("Enter one of the names: ")\nfile = open("Names.txt", "r")\nnew = open("Names2.txt", "w")\nfor line in file:\n    if line.strip() != selected:\n        new.write(line)\nfile.close()\nnew.close()\nnew = open("Names2.txt", "r")\nprint(new.read())\nnew.close()',
  [T(["Tom"], ["Tom", "Bob", "Sue", "Amy", "Joe"])],
  ["Loop through the lines and write every line except the chosen one.", ".strip() removes the \\n so you can compare."],
  ["files", "read", "write"], setup=NAMES_SETUP)

files(111, "Books.csv", "Tệp Books.csv", "hard",
  'Create a .csv file that will store the following data. Call it "Books.csv".\n   Book                                    Author               Year Released\n0  To Kill A Mockingbird                   Harper Lee           1960\n1  A Brief History of Time                 Stephen Hawking      1988\n2  The Great Gatsby                        F. Scott Fitzgerald  1922\n3  The Man Who Mistook His Wife for a Hat  Oliver Sacks         1985\n4  Pride and Prejudice                     Jane Austen          1813\n(Read the file back and display it to check.)',
  'Tạo tệp .csv tên "Books.csv" chứa dữ liệu sau (sách, tác giả, năm phát hành):\n0  To Kill A Mockingbird, Harper Lee, 1960\n1  A Brief History of Time, Stephen Hawking, 1988\n2  The Great Gatsby, F. Scott Fitzgerald, 1922\n3  The Man Who Mistook His Wife for a Hat, Oliver Sacks, 1985\n4  Pride and Prejudice, Jane Austen, 1813\n(Đọc lại tệp và hiển thị để kiểm tra.)',
  'import csv\nfile = open("Books.csv", "w")\nfile.write("To Kill A Mockingbird,Harper Lee,1960\\n")\nfile.write("A Brief History of Time,Stephen Hawking,1988\\n")\nfile.write("The Great Gatsby,F. Scott Fitzgerald,1922\\n")\nfile.write("The Man Who Mistook His Wife for a Hat,Oliver Sacks,1985\\n")\nfile.write("Pride and Prejudice,Jane Austen,1813\\n")\nfile.close()\nfile = open("Books.csv", "r")\nfor row in csv.reader(file):\n    print(row)\nfile.close()',
  [T([], ["Mockingbird", "1960", "Hawking", "Gatsby", "Sacks", "Austen", "1813"])],
  ["Separate each field with a comma and end each row with \\n."],
  ["csv", "files", "write"])

files(112, "Add a Book", "Thêm một cuốn sách", "hard",
  "Using the Books.csv file from program 111, ask the user to enter another record and add it to the end of the file. Display each row of the .csv file on a separate line.",
  "Dùng tệp Books.csv của 111, yêu cầu nhập thêm một bản ghi và ghi vào cuối tệp. Hiển thị mỗi dòng của tệp .csv trên một dòng riêng.",
  'import csv\nbook = input("Enter a book title: ")\nauthor = input("Enter the author: ")\nyear = input("Enter the year released: ")\nfile = open("Books.csv", "a")\nfile.write(book + "," + author + "," + year + "\\n")\nfile.close()\nfile = open("Books.csv", "r")\nfor row in csv.reader(file):\n    print(row)\nfile.close()',
  [T(["Dune", "Frank Herbert", "1965"], ["Mockingbird", "Austen", "Dune", "Herbert", "1965"])],
  ["Open the file with \"a\" to add a row."],
  ["csv", "append"], setup=BOOKS_SETUP)

files(113, "Books by Author", "Sách theo tác giả", "hard",
  "Using the Books.csv file, ask the user how many records they want to add to the list and then allow them to add that many. After all the data has been added, ask for an author and display all the books in the list by that author. If there are no books by that author in the list, display a suitable message.",
  "Dùng Books.csv, hỏi muốn thêm bao nhiêu bản ghi rồi cho nhập đủ số đó. Sau đó hỏi tên tác giả và hiển thị mọi sách của tác giả đó. Nếu không có, hiển thị thông báo phù hợp.",
  'import csv\nnum = int(input("How many records do you want to add? "))\nfile = open("Books.csv", "a")\nfor i in range(num):\n    book = input("Enter a book title: ")\n    author = input("Enter the author: ")\n    year = input("Enter the year released: ")\n    file.write(book + "," + author + "," + year + "\\n")\nfile.close()\nsearch = input("Enter an author: ")\nfound = False\nfile = open("Books.csv", "r")\nfor row in csv.reader(file):\n    if row[1] == search:\n        print(row)\n        found = True\nfile.close()\nif found == False:\n    print("There are no books by that author")',
  [T(["1", "Emma", "Jane Austen", "1815", "Jane Austen"], ["Pride and Prejudice", "Emma"]), T(["0", "Nobody"], ["re:no books|not found|none|no record|sorry"])],
  ["row[1] is the author in each row.", "Use a found variable to know if nothing matched."],
  ["csv", "for loop", "if"], setup=BOOKS_SETUP)

files(114, "Books Between Years", "Sách trong khoảng năm", "hard",
  "Using the Books.csv file, ask the user to enter a starting year and an end year. Display all books released between those two years.",
  "Dùng Books.csv, yêu cầu nhập năm bắt đầu và năm kết thúc. Hiển thị mọi sách phát hành trong khoảng đó.",
  'import csv\nstart = int(input("Enter a starting year: "))\nend = int(input("Enter an end year: "))\nfile = open("Books.csv", "r")\nfor row in csv.reader(file):\n    if int(row[2]) >= start and int(row[2]) <= end:\n        print(row)\nfile.close()',
  [T(["1950", "1990"], ["Mockingbird", "Hawking", "Sacks"]), T(["1800", "1925"], ["Gatsby", "Austen"])],
  ["Change row[2] to int() before comparing years."],
  ["csv", "if"], setup=BOOKS_SETUP)

files(115, "Rows with Numbers", "Dòng kèm số thứ tự", "hard",
  "Using the Books.csv file, display the data in the file along with the row number of each.",
  "Dùng Books.csv, hiển thị dữ liệu kèm số thứ tự của từng dòng.",
  'import csv\nfile = open("Books.csv", "r")\nrow_num = 0\nfor row in csv.reader(file):\n    print(row_num, row)\n    row_num = row_num + 1\nfile.close()',
  [T([], ["0", "Mockingbird", "1", "Hawking", "2", "Gatsby", "3", "Sacks", "4", "Austen"])],
  ["Keep a counter and add 1 for every row."],
  ["csv", "count"], setup=BOOKS_SETUP)

files(116, "Edit Books.csv", "Sửa Books.csv", "hard",
  "Import the data from the Books.csv file into a list. Display the list to the user. Ask them to select which row from the list they want to delete and remove it from the list. Ask the user which data they want to change and allow them to change it. Write the data back to the original .csv file, overwriting the existing data with the amended data.",
  "Đọc dữ liệu Books.csv vào một danh sách và hiển thị. Hỏi muốn xóa dòng nào và xóa khỏi danh sách. Hỏi muốn sửa dữ liệu nào và cho sửa. Ghi đè dữ liệu đã sửa vào tệp .csv ban đầu.",
  'import csv\nfile = open("Books.csv", "r")\nbooks = []\nfor row in csv.reader(file):\n    books.append(row)\nfile.close()\nfor i in range(len(books)):\n    print(i, books[i])\ndelete = int(input("Which row do you want to delete? "))\ndel books[delete]\nfor i in range(len(books)):\n    print(i, books[i])\nrow = int(input("Which row do you want to change? "))\ncol = int(input("Which field (0 = book, 1 = author, 2 = year)? "))\nbooks[row][col] = input("Enter the new data: ")\nfile = open("Books.csv", "w")\nfor book in books:\n    file.write(book[0] + "," + book[1] + "," + book[2] + "\\n")\nfile.close()\nfile = open("Books.csv", "r")\nprint(file.read())\nfile.close()',
  [T(["2", "0", "2", "1961"], ["re:Mockingbird,Harper Lee,1961"])],
  ["Read the rows into a list, change the list, then write everything back with \"w\"."],
  ["csv", "lists", "write"], setup=BOOKS_SETUP)

files(117, "Quiz Results File", "Lưu kết quả đố vui", "hard",
  "Create a simple maths quiz that will ask the user for their name and then generate two random questions. Store their name, the questions they were asked, their answers and their final score in a .csv file. Whenever the program is run it should add to the .csv file and not overwrite anything.",
  "Tạo bài đố toán đơn giản: hỏi tên, sinh ngẫu nhiên hai câu hỏi. Lưu tên, các câu hỏi, câu trả lời và điểm vào tệp .csv. Mỗi lần chạy phải ghi thêm, không ghi đè.",
  'import random\nname = input("What is your name? ")\nscore = 0\nfile = open("QuizScore.csv", "a")\nrecord = name\nfor i in range(2):\n    num1 = random.randint(1, 20)\n    num2 = random.randint(1, 20)\n    question = str(num1) + " + " + str(num2)\n    answer = int(input(question + " = "))\n    if answer == num1 + num2:\n        score = score + 1\n    record = record + "," + question + "," + str(answer)\nfile.write(record + "," + str(score) + "\\n")\nfile.close()\nfile = open("QuizScore.csv", "r")\nprint(file.read())\nfile.close()',
  [T(["Lan", "0", "0"], ["Lan", "re:\\d+ ?\\+ ?\\d+"])],
  ["Open the file with \"a\" so old results are kept."],
  ["csv", "random", "append"])

C(118, "Count with Subprograms", "Đếm bằng chương trình con", "hard",
  'Define a subprogram that will ask the user to enter a number and save it as the variable "num". Define another subprogram that will use "num" and count from 1 to that number.',
  'Định nghĩa một chương trình con hỏi người dùng nhập một số và lưu vào biến "num". Định nghĩa chương trình con khác dùng "num" để đếm từ 1 đến số đó.',
  'def ask_value():\n    num = int(input("Enter a number: "))\n    return num\n\ndef count(num):\n    for i in range(1, num + 1):\n        print(i)\n\nnum = ask_value()\ncount(num)',
  [T(["5"], ["1", "2", "3", "4", "5"])],
  ["return sends the value back so the other subprogram can use it."],
  ["functions", "def", "return"])

C(119, "Guessing Game Subprograms", "Trò đoán số bằng chương trình con", "hard",
  'Define a subprogram that will ask the user to pick a low and a high number, and then generate a random number between those two values and store it in a variable called "comp_num". Define another subprogram that will give the instruction "I am thinking of a number..." and then ask the user to guess the number they are thinking of. Define a third subprogram that will check to see if the comp_num is the same as the user\'s guess. If it is, it should display the message "Correct, you win", otherwise it should keep looping, telling the user if they are too low or too high and asking them to guess again until they guess correctly.',
  'Chương trình con thứ nhất hỏi số nhỏ và số lớn, rồi sinh số ngẫu nhiên giữa hai số và lưu vào "comp_num". Chương trình con thứ hai hiển thị "I am thinking of a number..." và hỏi người dùng đoán. Chương trình con thứ ba kiểm tra: đúng thì hiển thị "Correct, you win", sai thì báo thấp hay cao và cho đoán lại cho đến khi đúng.',
  'import random\n\ndef pick_num():\n    low = int(input("Enter a low number: "))\n    high = int(input("Enter a high number: "))\n    comp_num = random.randint(low, high)\n    return comp_num\n\ndef first_guess():\n    print("I am thinking of a number...")\n    guess = int(input("What is your guess? "))\n    return guess\n\ndef check_answer(comp_num, guess):\n    while guess != comp_num:\n        if guess < comp_num:\n            print("Too low")\n        else:\n            print("Too high")\n        guess = int(input("Guess again: "))\n    print("Correct, you win")\n\ncomp_num = pick_num()\nguess = first_guess()\ncheck_answer(comp_num, guess)',
  [T(["1", "5", "1", "2", "3", "4", "5"], ["I am thinking of a number", "Correct, you win"])],
  ["Return comp_num and the guess, then pass them to the checking subprogram."],
  ["functions", "random", "while loop"])

C(120, "Addition or Subtraction", "Phép cộng hay trừ", "hard",
  'Display the following menu to the user:\n1) Addition\n2) Subtraction\nEnter 1 or 2:\nIf they enter a 1, it should run a subprogram that will generate two random numbers between 5 and 20, and ask the user to add them together. Work out the correct answer and return both the user\'s answer and the correct answer. If they entered 2 as their selection on the menu, it should run a subprogram that will generate one number between 25 and 50 and another number between 1 and 25 and ask them to work out num1 minus num2. Return both the user\'s answer and the correct answer. Create another subprogram that will check if the user\'s answer matches the actual answer. If it does, display "Correct", otherwise display a message that will say "Incorrect, the answer is" and display the real answer. If they do not select a relevant option on the first menu you should display a suitable message.',
  'Hiển thị menu:\n1) Addition\n2) Subtraction\nEnter 1 or 2:\nChọn 1: chương trình con sinh hai số ngẫu nhiên từ 5 đến 20, yêu cầu cộng và trả về cả câu trả lời của người dùng lẫn đáp án đúng. Chọn 2: sinh một số từ 25 đến 50 và một số từ 1 đến 25, yêu cầu tính num1 trừ num2, trả về hai giá trị. Một chương trình con khác kiểm tra: đúng thì "Correct", sai thì "Incorrect, the answer is" kèm đáp án. Nếu chọn sai menu thì hiển thị thông báo phù hợp.',
  'import random\n\ndef addition():\n    num1 = random.randint(5, 20)\n    num2 = random.randint(5, 20)\n    user = int(input(str(num1) + " + " + str(num2) + " = "))\n    return user, num1 + num2\n\ndef subtraction():\n    num1 = random.randint(25, 50)\n    num2 = random.randint(1, 25)\n    user = int(input(str(num1) + " - " + str(num2) + " = "))\n    return user, num1 - num2\n\ndef check(user, actual):\n    if user == actual:\n        print("Correct")\n    else:\n        print("Incorrect, the answer is", actual)\n\nprint("1) Addition")\nprint("2) Subtraction")\nchoice = input("Enter 1 or 2: ")\nif choice == "1":\n    user, actual = addition()\n    check(user, actual)\nelif choice == "2":\n    user, actual = subtraction()\n    check(user, actual)\nelse:\n    print("Incorrect selection")',
  [T(["1", "0"], ["re:Incorrect, the answer is \\d+|Correct"]), T(["2", "0"], ["re:Incorrect, the answer is \\d+|Correct"]), T(["7"], ["re:incorrect|invalid|error|not|wrong"])],
  ["A function can return two values: return user, answer."],
  ["functions", "random", "menu"])

C(121, "Manage a List of Names", "Quản lý danh sách tên", "hard",
  "Create a program that will allow the user to easily manage a list of names. You should display a menu that will allow them to add a name to the list, change a name in the list, delete a name from the list or view all the names in the list. There should also be a menu option to allow the user to end the program. If they select an option that is not relevant, then it should display a suitable message. After they have made a selection to either add a name, change a name, delete a name or view all the names, they should see the menu again without having to restart the program. The program should be made as easy to use as possible.",
  "Tạo chương trình quản lý danh sách tên với menu: thêm tên, sửa tên, xóa tên, xem tất cả tên và thoát. Chọn sai thì báo lỗi. Sau mỗi thao tác, menu hiện lại mà không cần chạy lại chương trình. Làm cho chương trình dễ dùng nhất có thể.",
  'def show_menu():\n    print("1) Add a name")\n    print("2) Change a name")\n    print("3) Delete a name")\n    print("4) View all names")\n    print("5) Quit")\n    return input("Enter your selection: ")\n\nnames = []\nchoice = show_menu()\nwhile choice != "5":\n    if choice == "1":\n        names.append(input("Enter a name to add: "))\n    elif choice == "2":\n        old = input("Which name do you want to change? ")\n        if old in names:\n            names[names.index(old)] = input("Enter the new name: ")\n        else:\n            print("That name is not in the list")\n    elif choice == "3":\n        name = input("Which name do you want to delete? ")\n        if name in names:\n            names.remove(name)\n        else:\n            print("That name is not in the list")\n    elif choice == "4":\n        for name in names:\n            print(name)\n    else:\n        print("Incorrect option")\n    choice = show_menu()\nprint("Goodbye")',
  [T(["1", "Ann", "1", "Ben", "2", "Ann", "Anna", "3", "Ben", "4", "9", "5"], ["Anna", "re:incorrect|invalid|error|not|wrong"])],
  ["Keep the menu inside a while loop that stops when they choose quit."],
  ["functions", "menu", "lists"])

SAL_NOTE = FILE_NOTE
SAL_NOTE_VI = FILE_NOTE_VI

files(122, "Salaries.csv Menu", "Menu Salaries.csv", "hard",
  "Create the following menu:\n1) Add to file\n2) View all records\n3) Quit program\nEnter the number of your selection:\nIf the user selects 1, allow them to add to a file called Salaries.csv which will store their name and salary. If they select 2 it should display all records in the Salaries.csv file. If they select 3 it should stop the program. If they select an incorrect option they should see an error message. They should keep returning to the menu until they select option 3.",
  "Tạo menu:\n1) Add to file\n2) View all records\n3) Quit program\nEnter the number of your selection:\nChọn 1: thêm tên và lương vào tệp Salaries.csv. Chọn 2: hiển thị mọi bản ghi. Chọn 3: dừng chương trình. Chọn sai: báo lỗi. Menu lặp lại cho đến khi chọn 3.",
  'def add_to_file():\n    name = input("Enter a name: ")\n    salary = input("Enter their salary: ")\n    file = open("Salaries.csv", "a")\n    file.write(name + "," + salary + "\\n")\n    file.close()\n\ndef view_records():\n    file = open("Salaries.csv", "r")\n    print(file.read())\n    file.close()\n\nchoice = ""\nwhile choice != "3":\n    print("1) Add to file")\n    print("2) View all records")\n    print("3) Quit program")\n    choice = input("Enter the number of your selection: ")\n    if choice == "1":\n        add_to_file()\n    elif choice == "2":\n        view_records()\n    elif choice != "3":\n        print("Incorrect option")',
  [T(["1", "Ann", "32000", "1", "Ben", "28000", "2", "7", "3"], ["Ann", "32000", "Ben", "28000", "re:incorrect|invalid|error|not|wrong"])],
  ["Use subprograms for each menu option."],
  ["functions", "csv", "menu"])

files(123, "Delete a Salary Record", "Xóa bản ghi lương", "hard",
  "In Python, it is not technically possible to directly delete a record from a .csv file. Instead you need to save the file to a temporary list in Python, make the changes to the list and then overwrite the original file with the temporary list. Change the previous program to allow you to do this. Your menu should now look like this:\n1) Add to file\n2) View all records\n3) Delete a record\n4) Quit program\nEnter the number of your selection:",
  "Python không xóa trực tiếp được một bản ghi trong tệp .csv. Bạn cần đọc tệp vào một danh sách tạm, sửa danh sách rồi ghi đè tệp gốc. Sửa chương trình trước để làm được điều này. Menu mới:\n1) Add to file\n2) View all records\n3) Delete a record\n4) Quit program\nEnter the number of your selection:",
  'import csv\n\ndef add_to_file():\n    name = input("Enter a name: ")\n    salary = input("Enter their salary: ")\n    file = open("Salaries.csv", "a")\n    file.write(name + "," + salary + "\\n")\n    file.close()\n\ndef view_records():\n    file = open("Salaries.csv", "r")\n    print(file.read())\n    file.close()\n\ndef delete_record():\n    file = open("Salaries.csv", "r")\n    rows = []\n    for row in csv.reader(file):\n        rows.append(row)\n    file.close()\n    for i in range(len(rows)):\n        print(i, rows[i])\n    num = int(input("Enter the row number to delete: "))\n    del rows[num]\n    file = open("Salaries.csv", "w")\n    for row in rows:\n        file.write(row[0] + "," + row[1] + "\\n")\n    file.close()\n\nchoice = ""\nwhile choice != "4":\n    print("1) Add to file")\n    print("2) View all records")\n    print("3) Delete a record")\n    print("4) Quit program")\n    choice = input("Enter the number of your selection: ")\n    if choice == "1":\n        add_to_file()\n    elif choice == "2":\n        view_records()\n    elif choice == "3":\n        delete_record()\n    elif choice != "4":\n        print("Incorrect option")',
  [T(["3", "0", "2", "4"], ["re:^(?![\\s\\S]*Ann,32000\\s*\\n\\s*\\n)", "Ben"])],
  ["Read every row into a list, delete one, then write the list back with \"w\"."],
  ["functions", "csv", "lists"], setup='file = open("Salaries.csv", "w")\nfile.write("Ann,32000\\nBen,28000\\nCara,35000\\n")\nfile.close()')

gui(124, "Hello Window", "Cửa sổ chào", "hard",
  'Create a window that will ask the user to enter their name. When they click on a button it should display the message "Hello" and their name and change the background colour and font colour of the message box.',
  'Tạo cửa sổ hỏi tên người dùng. Khi bấm nút sẽ hiển thị "Hello" và tên, đồng thời đổi màu nền và màu chữ của ô thông báo.',
  'name = input("Enter your name: ")\nprint("Hello", name)\nprint("(Message box: background yellow, text blue)")',
  [T(["Alice"], ["Hello", "Alice"])],
  ["In Tkinter this is an Entry, a Button and a Message; here input() and print() do the same job."],
  ["tkinter", "gui", "input"])

gui(125, "Dice Button", "Nút xúc xắc", "hard",
  "Write a program that can be used instead of rolling a six-sided die in a board game. When the user clicks a button it should display a random whole number between 1 to 6 (inclusive).",
  "Viết chương trình thay cho việc tung xúc xắc sáu mặt. Mỗi lần bấm nút sẽ hiển thị một số ngẫu nhiên từ 1 đến 6.",
  'import random\nagain = "y"\nwhile again == "y":\n    print(random.randint(1, 6))\n    again = input("Roll again? (y/n) ")',
  [T(["y", "y", "n"], ["re:(?m)^\\s*[1-6]\\s*$(?:\\s*^\\s*[1-6]\\s*$){2}"])],
  ["random.randint(1, 6) is one roll.", "Pressing the button = answering y."],
  ["tkinter", "random", "while loop"])

gui(126, "Running Total", "Tổng cộng dồn", "hard",
  "Create a program that will ask the user to enter a number in a box. When they click on a button it will add that number to a total and display it in another box. This can be repeated as many times as they want and keep adding to the total. There should be another button that resets the total back to 0 and empties the original text box, ready for them to start again.",
  "Tạo chương trình cho nhập một số, bấm nút để cộng vào tổng và hiển thị tổng. Có thể lặp lại bao nhiêu lần cũng được. Có nút khác đặt lại tổng về 0 để bắt đầu lại.",
  'total = 0\nchoice = ""\nwhile choice != "q":\n    choice = input("Type a number to add, r to reset or q to quit: ")\n    if choice == "r":\n        total = 0\n        print("Total:", total)\n    elif choice != "q":\n        total = total + int(choice)\n        print("Total:", total)',
  [T(["5", "10", "r", "7", "q"], ["5", "15", "0", "7"])],
  ["Keep total outside the loop so it remembers the sum."],
  ["tkinter", "while loop", "total"])

gui(127, "Name List", "Danh sách tên", "hard",
  "Create a window that will ask the user to enter a name in a text box. When they click on a button it will add it to the end of the list that is displayed on the screen. Create another button which will clear the list.",
  "Tạo cửa sổ cho nhập tên. Bấm nút để thêm tên vào cuối danh sách hiển thị trên màn hình. Thêm một nút khác để xóa sạch danh sách.",
  'names = []\nchoice = ""\nwhile choice != "q":\n    choice = input("Type a name to add, c to clear or q to quit: ")\n    if choice == "c":\n        names = []\n    elif choice != "q":\n        names.append(choice)\n    print(names)',
  [T(["Ann", "Ben", "c", "Cara", "q"], ["Ann", "Ben", "re:\\[\\]", "Cara"])],
  ["Show the list after every action."],
  ["tkinter", "lists"])

gui(128, "Miles and Kilometres", "Dặm và kilômét", "hard",
  "1 kilometre = 0.6214 miles and 1 mile = 1.6093 kilometres. Using these figures, make a program that will allow the user to convert between miles and kilometres.",
  "1 kilômét = 0.6214 dặm và 1 dặm = 1.6093 kilômét. Dùng các số này để làm chương trình đổi qua lại giữa dặm và kilômét.",
  'print("1) Kilometres to miles")\nprint("2) Miles to kilometres")\nchoice = input("Enter 1 or 2: ")\nvalue = float(input("Enter the distance: "))\nif choice == "1":\n    print(round(value * 0.6214, 4), "miles")\nelse:\n    print(round(value * 1.6093, 4), "kilometres")',
  [T(["1", "10"], ["6.214"]), T(["2", "10"], ["16.093"])],
  ["Ask which way to convert, then multiply by the right figure."],
  ["tkinter", "float", "if"])

gui(129, "Whole Numbers Only", "Chỉ số nguyên", "hard",
  "Create a window that will ask the user to enter a number in a text box. When they click on a button it will use the code variable.isdigit() to check to see if it is a whole number. If it is a whole number, add it to a list box, otherwise clear the entry box. Add another button that will clear the list.",
  "Tạo cửa sổ cho nhập một số. Khi bấm nút, dùng variable.isdigit() kiểm tra có phải số nguyên không. Nếu đúng thì thêm vào danh sách, nếu không thì xóa ô nhập. Thêm nút xóa sạch danh sách.",
  'num_list = []\nchoice = ""\nwhile choice != "q":\n    choice = input("Type a number, c to clear or q to quit: ")\n    if choice == "c":\n        num_list = []\n    elif choice.isdigit():\n        num_list.append(choice)\n    elif choice != "q":\n        print("Not a whole number")\n    print(num_list)',
  [T(["12", "abc", "7", "q"], ["12", "Not a whole number", "12", "7"])],
  ["\"12\".isdigit() is True, \"abc\".isdigit() is False."],
  ["tkinter", "isdigit", "lists"])

gui(130, "Save the List", "Lưu danh sách", "hard",
  "Alter program 129 to add a third button that will save the list to a .csv file. The code tmp_list = num_list.get(0,END) can be used to save the contents of a list box as a tuple called tmp_list.",
  "Sửa chương trình 129 để thêm nút thứ ba lưu danh sách vào tệp .csv. Trong Tkinter, tmp_list = num_list.get(0,END) lấy nội dung list box thành tuple tmp_list.",
  'num_list = []\nchoice = ""\nwhile choice != "q":\n    choice = input("Type a number, c to clear, s to save or q to quit: ")\n    if choice == "c":\n        num_list = []\n    elif choice == "s":\n        file = open("Numbers.csv", "w")\n        for num in num_list:\n            file.write(num + "\\n")\n        file.close()\n        print("Saved")\n    elif choice.isdigit():\n        num_list.append(choice)\n    elif choice != "q":\n        print("Not a whole number")\nfile = open("Numbers.csv", "r")\nprint(file.read())\nfile.close()',
  [T(["4", "9", "s", "q"], ["Saved", "4", "9"])],
  ["Write each number on its own row of the .csv file."],
  ["tkinter", "csv", "files"])

gui(131, "New Ages File", "Tệp tuổi mới", "hard",
  "Create a program that will allow the user to create a new .csv file. It should ask them to enter the name and age of a person and then allow them to add this to the end of the file they have just created.",
  "Tạo chương trình cho người dùng tạo tệp .csv mới. Hỏi tên và tuổi của một người rồi ghi vào cuối tệp vừa tạo.",
  'file = open("Ages.csv", "w")\nfile.close()\nname = input("Enter a name: ")\nage = input("Enter their age: ")\nfile = open("Ages.csv", "a")\nfile.write(name + "," + age + "\\n")\nfile.close()\nfile = open("Ages.csv", "r")\nprint(file.read())\nfile.close()',
  [T(["Ann", "15"], ["Ann", "15"])],
  ["Open with \"w\" once to create the file, then \"a\" to add."],
  ["tkinter", "csv", "files"])

gui(132, "Add and View Ages", "Thêm và xem tuổi", "hard",
  "Using the .csv file you created for the last challenge, create a program that will allow people to add names and ages to the list and create a button that will display the contents of the .csv file by importing it to a list box.",
  "Dùng tệp .csv của bài trước, tạo chương trình cho thêm tên và tuổi, và một nút hiển thị nội dung tệp .csv (đọc vào danh sách).",
  'import csv\nchoice = ""\nwhile choice != "3":\n    print("1) Add a person")\n    print("2) View the file")\n    print("3) Quit")\n    choice = input("Enter your selection: ")\n    if choice == "1":\n        name = input("Enter a name: ")\n        age = input("Enter their age: ")\n        file = open("Ages.csv", "a")\n        file.write(name + "," + age + "\\n")\n        file.close()\n    elif choice == "2":\n        file = open("Ages.csv", "r")\n        for row in csv.reader(file):\n            print(row)\n        file.close()',
  [T(["1", "Ben", "16", "2", "3"], ["Ann", "15", "Ben", "16"])],
  ["Reading the file into a list = filling the list box."],
  ["tkinter", "csv", "menu"], setup='file = open("Ages.csv", "w")\nfile.write("Ann,15\\n")\nfile.close()')

gui(133, "Logo Greeting", "Lời chào kèm logo", "hard",
  "Create your own icon that consists of several vertical multi-coloured lines. Create a logo which measures 200 x 150, using Paint or another graphics package. Create a window using your own icon and logo. When the user enters their name and clicks on the Press Me button, it should display \"Hello [name]\".",
  "Tự tạo icon gồm nhiều vạch dọc nhiều màu và logo kích thước 200 x 150. Tạo cửa sổ dùng icon và logo đó. Khi người dùng nhập tên và bấm nút Press Me, hiển thị \"Hello [tên]\".",
  'print("|||  HaiEduTech  |||")\nname = input("Enter your name: ")\nprint("Hello", name)',
  [T(["Alice"], ["Hello", "Alice"])],
  ["Print a simple text logo first, then greet the user."],
  ["tkinter", "input"])

gui(134, "Tick or Cross", "Dấu đúng hay sai", "hard",
  "Create a new program that will generate two random whole numbers between 10 and 50. It should ask the user to add the numbers together and type in the answer. If they get the question correct, display a suitable image such as a tick; if they get the answer wrong, display another suitable image such as a cross. They should click on a Next button to get another question.",
  "Tạo chương trình sinh hai số ngẫu nhiên từ 10 đến 50, yêu cầu cộng và nhập đáp án. Đúng thì hiển thị hình dấu tích, sai thì hiển thị dấu X. Bấm Next để sang câu khác.",
  'import random\nagain = "y"\nwhile again == "y":\n    num1 = random.randint(10, 50)\n    num2 = random.randint(10, 50)\n    answer = int(input(str(num1) + " + " + str(num2) + " = "))\n    if answer == num1 + num2:\n        print("✔ Correct")\n    else:\n        print("✘ Wrong")\n    again = input("Next question? (y/n) ")',
  [T(["0", "y", "0", "n"], ["re:(✘|✔|correct|wrong|right|incorrect)[\\s\\S]*(✘|✔|correct|wrong|right|incorrect)"])],
  ["Print a tick or cross symbol instead of showing an image."],
  ["tkinter", "random", "while loop"])

gui(135, "Change the Background", "Đổi màu nền", "hard",
  "Create a simple program that shows a drop-down list containing several colours and a Click Me button. When the user selects a colour from the list and clicks the button it should change the background of the window to that colour. For an extra challenge, try to avoid using an if statement to do this.",
  "Tạo chương trình có danh sách thả xuống gồm nhiều màu và nút Click Me. Khi chọn màu và bấm nút, nền cửa sổ đổi sang màu đó. Thử thách thêm: không dùng câu lệnh if.",
  'colours = ["red", "green", "blue", "yellow"]\nfor i in range(len(colours)):\n    print(i, colours[i])\nchoice = int(input("Pick a colour number: "))\nprint("The background is now", colours[choice])',
  [T(["2"], ["blue"]), T(["0"], ["red"])],
  ["Use the number as an index into the list, so no if is needed."],
  ["tkinter", "lists", "index"])

gui(136, "Name and Gender List", "Danh sách tên và giới tính", "hard",
  "Create a program that will ask the user to enter a name and then select the gender for that person from a drop-down list. It should then add the name and the gender (separated by a comma) to a list box when the user clicks on a button.",
  "Tạo chương trình hỏi tên và chọn giới tính từ danh sách thả xuống. Khi bấm nút, thêm tên và giới tính (cách nhau bằng dấu phẩy) vào danh sách.",
  'people = []\nagain = "y"\nwhile again == "y":\n    name = input("Enter a name: ")\n    gender = input("Select gender (M/F): ")\n    people.append(name + ", " + gender)\n    for person in people:\n        print(person)\n    again = input("Add another? (y/n) ")',
  [T(["Ann", "F", "y", "Ben", "M", "n"], ["Ann, F", "Ben, M"])],
  ["Join name and gender with \", \" before adding to the list."],
  ["tkinter", "lists", "strings"])

gui(137, "Save Names and Genders", "Lưu tên và giới tính", "hard",
  "Change program 136 so that when a new name and gender is added to the list box it is also written to a text file. Add another button that will display the entire text file in the main Python shell window.",
  "Sửa chương trình 136 để mỗi tên và giới tính mới cũng được ghi vào tệp văn bản. Thêm nút hiển thị toàn bộ tệp trong cửa sổ Python.",
  'choice = ""\nwhile choice != "3":\n    print("1) Add a person")\n    print("2) Show the file")\n    print("3) Quit")\n    choice = input("Enter your selection: ")\n    if choice == "1":\n        name = input("Enter a name: ")\n        gender = input("Select gender (M/F): ")\n        file = open("People.txt", "a")\n        file.write(name + ", " + gender + "\\n")\n        file.close()\n    elif choice == "2":\n        file = open("People.txt", "r")\n        print(file.read())\n        file.close()',
  [T(["1", "Ann", "F", "1", "Ben", "M", "2", "3"], ["Ann, F", "Ben, M"])],
  ["Open the text file with \"a\" each time a person is added."],
  ["tkinter", "files", "menu"])

gui(138, "Choose a Picture", "Chọn hình", "hard",
  "Save several images in the same folder as your program and call them 1.gif, 2.gif, 3.gif, etc. Display one in a window and ask the user to enter a number. It should then use that number to choose the correct file name and display the correct image.",
  "Lưu vài hình cùng thư mục với chương trình, đặt tên 1.gif, 2.gif, 3.gif... Hiển thị một hình và yêu cầu nhập một số, rồi dùng số đó để chọn đúng tên tệp và hiển thị hình tương ứng.",
  'pictures = {"1": "🐶 a dog", "2": "🐱 a cat", "3": "🐟 a fish"}\nprint("Showing 1.gif:", pictures["1"])\nnum = input("Enter a number 1-3: ")\nfilename = num + ".gif"\nprint("Showing", filename + ":", pictures[num])',
  [T(["2"], ["2.gif", "cat"]), T(["3"], ["3.gif", "fish"])],
  ["Build the file name with num + \".gif\"."],
  ["tkinter", "strings", "dictionaries"])

PHONE_SETUP = ('import sqlite3\n'
               'db = sqlite3.connect("PhoneBook.db")\n'
               'cursor = db.cursor()\n'
               'cursor.execute("DROP TABLE IF EXISTS Names")\n'
               'cursor.execute("CREATE TABLE Names(id integer PRIMARY KEY, firstname text, surname text, phonenumber text)")\n'
               'cursor.executemany("INSERT INTO Names VALUES(?, ?, ?, ?)", [(1, "Simon", "Howels", "01223 349752"), (2, "Karen", "Phillips", "01954 295773"), (3, "Darren", "Smith", "01583 749012"), (4, "Anne", "Jones", "01323 567322"), (5, "Mark", "Smith", "01223 855534")])\n'
               'db.commit()\n'
               'db.close()')
BOOKINFO_SETUP = ('import sqlite3\n'
                  'db = sqlite3.connect("BookInfo.db")\n'
                  'cursor = db.cursor()\n'
                  'cursor.execute("DROP TABLE IF EXISTS Authors")\n'
                  'cursor.execute("DROP TABLE IF EXISTS Books")\n'
                  'cursor.execute("CREATE TABLE Authors(Name text PRIMARY KEY, PlaceofBirth text)")\n'
                  'cursor.executemany("INSERT INTO Authors VALUES(?, ?)", [("Agatha Christie", "Torquay"), ("Cecelia Ahern", "Dublin"), ("J.K. Rowling", "Bristol"), ("Oscar Wilde", "Dublin")])\n'
                  'cursor.execute("CREATE TABLE Books(ID integer PRIMARY KEY, Title text, Author text, DatePublished integer)")\n'
                  'cursor.executemany("INSERT INTO Books VALUES(?, ?, ?, ?)", [(1, "De Profundis", "Oscar Wilde", 1905), (2, "Harry Potter and the chamber of secrets", "J.K. Rowling", 1998), (3, "Harry Potter and the prisoner of Azkaban", "J.K. Rowling", 1999), (4, "Lyrebird", "Cecelia Ahern", 2017), (5, "Murder on the Orient Express", "Agatha Christie", 1934), (6, "Perfect", "Cecelia Ahern", 2017), (7, "The marble collector", "Cecelia Ahern", 2016), (8, "The murder on the links", "Agatha Christie", 1923), (9, "The picture of Dorian Gray", "Oscar Wilde", 1890), (10, "The secret adversary", "Agatha Christie", 1921), (11, "The seven dials mystery", "Agatha Christie", 1929), (12, "The year I met you", "Cecelia Ahern", 2014)])\n'
                  'db.commit()\n'
                  'db.close()')
SQL_NOTE = "Web version: SQLite runs inside this page. Databases the book assumes already exist are created for you before your code runs."
SQL_NOTE_VI = "Bản web: SQLite chạy ngay trong trang. Các cơ sở dữ liệu mà sách giả định đã có sẽ được tạo sẵn trước khi code chạy."


def sql(*a, **k):
    k.setdefault("web_note", SQL_NOTE)
    k.setdefault("web_note_vi", SQL_NOTE_VI)
    C(*a, **k)


sql(139, "PhoneBook Database", "Cơ sở dữ liệu PhoneBook", "hard",
  "Create an SQL database called PhoneBook that contains a table called Names with the following data:\nID  First Name  Surname   Phone Number\n1   Simon       Howels    01223 349752\n2   Karen       Phillips  01954 295773\n3   Darren      Smith     01583 749012\n4   Anne        Jones     01323 567322\n5   Mark        Smith     01223 855534\nDisplay the table to check it.",
  "Tạo cơ sở dữ liệu SQL tên PhoneBook có bảng Names với dữ liệu:\nID  First Name  Surname   Phone Number\n1   Simon       Howels    01223 349752\n2   Karen       Phillips  01954 295773\n3   Darren      Smith     01583 749012\n4   Anne        Jones     01323 567322\n5   Mark        Smith     01223 855534\nHiển thị bảng để kiểm tra.",
  'import sqlite3\nwith sqlite3.connect("PhoneBook.db") as db:\n    cursor = db.cursor()\n    cursor.execute("DROP TABLE IF EXISTS Names")\n    cursor.execute("CREATE TABLE Names(id integer PRIMARY KEY, firstname text, surname text, phonenumber text)")\n    cursor.execute("INSERT INTO Names VALUES(1, \'Simon\', \'Howels\', \'01223 349752\')")\n    cursor.execute("INSERT INTO Names VALUES(2, \'Karen\', \'Phillips\', \'01954 295773\')")\n    cursor.execute("INSERT INTO Names VALUES(3, \'Darren\', \'Smith\', \'01583 749012\')")\n    cursor.execute("INSERT INTO Names VALUES(4, \'Anne\', \'Jones\', \'01323 567322\')")\n    cursor.execute("INSERT INTO Names VALUES(5, \'Mark\', \'Smith\', \'01223 855534\')")\n    db.commit()\n    cursor.execute("SELECT * FROM Names")\n    for row in cursor.fetchall():\n        print(row)',
  [T([], ["Simon", "Howels", "Karen", "Darren", "Anne", "Mark", "01223 855534"])],
  ["CREATE TABLE makes the table, INSERT INTO adds each row.", "db.commit() saves the changes."],
  ["sqlite", "sql", "database"])

sql(140, "PhoneBook Menu", "Menu PhoneBook", "hard",
  "Using the PhoneBook database from program 139, write a program that will display the following menu.\nMain Menu\n1) View phone book\n2) Add to phone book\n3) Search for surname\n4) Delete person from phone book\n5) Quit\nEnter your selection:\nIf the user selects 1, they should be able to view the entire phonebook. If they select 2, it should allow them to add a new person to the phonebook. If they select 3, it should ask them for a surname and then display only the records of people with the same surname. If they select 4, it should ask for an ID and then delete that record from the table. If they select 5, it should end the program. Finally, it should display a suitable message if they enter an incorrect selection from the menu. They should return to the menu after each action, until they select 5.",
  "Dùng cơ sở dữ liệu PhoneBook của 139, hiển thị menu:\nMain Menu\n1) View phone book\n2) Add to phone book\n3) Search for surname\n4) Delete person from phone book\n5) Quit\nEnter your selection:\nChọn 1: xem toàn bộ danh bạ. 2: thêm người mới. 3: hỏi họ và chỉ hiển thị người cùng họ. 4: hỏi ID và xóa bản ghi đó. 5: kết thúc. Chọn sai thì báo lỗi. Menu lặp lại sau mỗi thao tác cho đến khi chọn 5.",
  'import sqlite3\n\ndb = sqlite3.connect("PhoneBook.db")\ncursor = db.cursor()\n\ndef view():\n    cursor.execute("SELECT * FROM Names")\n    for row in cursor.fetchall():\n        print(row)\n\ndef add():\n    first = input("Enter the first name: ")\n    surname = input("Enter the surname: ")\n    phone = input("Enter the phone number: ")\n    cursor.execute("INSERT INTO Names(firstname, surname, phonenumber) VALUES(?, ?, ?)", [first, surname, phone])\n    db.commit()\n\ndef search():\n    surname = input("Enter a surname: ")\n    cursor.execute("SELECT * FROM Names WHERE surname = ?", [surname])\n    for row in cursor.fetchall():\n        print(row)\n\ndef delete():\n    id = input("Enter the ID to delete: ")\n    cursor.execute("DELETE FROM Names WHERE id = ?", [id])\n    db.commit()\n\nchoice = ""\nwhile choice != "5":\n    print("Main Menu")\n    print("1) View phone book")\n    print("2) Add to phone book")\n    print("3) Search for surname")\n    print("4) Delete person from phone book")\n    print("5) Quit")\n    choice = input("Enter your selection: ")\n    if choice == "1":\n        view()\n    elif choice == "2":\n        add()\n    elif choice == "3":\n        search()\n    elif choice == "4":\n        delete()\n    elif choice != "5":\n        print("Incorrect selection")\ndb.close()',
  [T(["3", "Smith", "4", "1", "2", "Lan", "Tran", "0912 345678", "1", "8", "5"], ["Darren", "Mark", "Karen", "Lan", "re:incorrect|invalid|error|not|wrong"])],
  ["Use ? placeholders in SQL for values the user types."],
  ["sqlite", "sql", "menu"], setup=PHONE_SETUP)

sql(141, "BookInfo Database", "Cơ sở dữ liệu BookInfo", "hard",
  "Create a new SQL database called BookInfo that will store a list of authors and the books they wrote. It will have two tables. The first one should be called Authors and contain the following data:\nName             Place of Birth\nAgatha Christie  Torquay\nCecelia Ahern    Dublin\nJ.K. Rowling     Bristol\nOscar Wilde      Dublin\nThe second should be called Books and contain the following data:\n1  De Profundis                              Oscar Wilde      1905\n2  Harry Potter and the chamber of secrets   J.K. Rowling     1998\n3  Harry Potter and the prisoner of Azkaban  J.K. Rowling     1999\n4  Lyrebird                                  Cecelia Ahern    2017\n5  Murder on the Orient Express              Agatha Christie  1934\n6  Perfect                                   Cecelia Ahern    2017\n7  The marble collector                      Cecelia Ahern    2016\n8  The murder on the links                   Agatha Christie  1923\n9  The picture of Dorian Gray                Oscar Wilde      1890\n10 The secret adversary                      Agatha Christie  1921\n11 The seven dials mystery                   Agatha Christie  1929\n12 The year I met you                        Cecelia Ahern    2014\nDisplay both tables to check them.",
  "Tạo cơ sở dữ liệu SQL mới BookInfo lưu tác giả và sách của họ, gồm hai bảng. Bảng Authors (tên, nơi sinh): Agatha Christie - Torquay, Cecelia Ahern - Dublin, J.K. Rowling - Bristol, Oscar Wilde - Dublin. Bảng Books gồm 12 cuốn như trong đề tiếng Anh (ID, tên sách, tác giả, năm xuất bản). Hiển thị cả hai bảng để kiểm tra.",
  'import sqlite3\nwith sqlite3.connect("BookInfo.db") as db:\n    cursor = db.cursor()\n    cursor.execute("DROP TABLE IF EXISTS Authors")\n    cursor.execute("DROP TABLE IF EXISTS Books")\n    cursor.execute("CREATE TABLE Authors(Name text PRIMARY KEY, PlaceofBirth text)")\n    authors = [("Agatha Christie", "Torquay"), ("Cecelia Ahern", "Dublin"), ("J.K. Rowling", "Bristol"), ("Oscar Wilde", "Dublin")]\n    cursor.executemany("INSERT INTO Authors VALUES(?, ?)", authors)\n    cursor.execute("CREATE TABLE Books(ID integer PRIMARY KEY, Title text, Author text, DatePublished integer)")\n    books = [(1, "De Profundis", "Oscar Wilde", 1905),\n             (2, "Harry Potter and the chamber of secrets", "J.K. Rowling", 1998),\n             (3, "Harry Potter and the prisoner of Azkaban", "J.K. Rowling", 1999),\n             (4, "Lyrebird", "Cecelia Ahern", 2017),\n             (5, "Murder on the Orient Express", "Agatha Christie", 1934),\n             (6, "Perfect", "Cecelia Ahern", 2017),\n             (7, "The marble collector", "Cecelia Ahern", 2016),\n             (8, "The murder on the links", "Agatha Christie", 1923),\n             (9, "The picture of Dorian Gray", "Oscar Wilde", 1890),\n             (10, "The secret adversary", "Agatha Christie", 1921),\n             (11, "The seven dials mystery", "Agatha Christie", 1929),\n             (12, "The year I met you", "Cecelia Ahern", 2014)]\n    cursor.executemany("INSERT INTO Books VALUES(?, ?, ?, ?)", books)\n    db.commit()\n    cursor.execute("SELECT * FROM Authors")\n    for row in cursor.fetchall():\n        print(row)\n    cursor.execute("SELECT * FROM Books")\n    for row in cursor.fetchall():\n        print(row)',
  [T([], ["Agatha Christie", "Torquay", "Oscar Wilde", "De Profundis", "The year I met you", "2014"])],
  ["executemany() inserts a whole list of rows at once."],
  ["sqlite", "sql", "database"])

sql(142, "Books by Birthplace", "Sách theo nơi sinh tác giả", "hard",
  "Using the BookInfo database from program 141, display the list of authors and their place of birth. Ask the user to enter a place of birth and then show the title, date published and author's name for all the books by authors who were born in the location they selected.",
  "Dùng BookInfo của 141, hiển thị danh sách tác giả và nơi sinh. Yêu cầu nhập một nơi sinh rồi hiển thị tên sách, năm xuất bản và tác giả của mọi sách do tác giả sinh ở nơi đó viết.",
  'import sqlite3\nwith sqlite3.connect("BookInfo.db") as db:\n    cursor = db.cursor()\n    cursor.execute("SELECT * FROM Authors")\n    for row in cursor.fetchall():\n        print(row)\n    place = input("Enter a place of birth: ")\n    cursor.execute("SELECT Books.Title, Books.DatePublished, Books.Author FROM Books, Authors WHERE Authors.Name = Books.Author AND Authors.PlaceofBirth = ?", [place])\n    for row in cursor.fetchall():\n        print(row)',
  [T(["Bristol"], ["chamber of secrets", "1998", "prisoner of Azkaban"]), T(["Dublin"], ["De Profundis", "Lyrebird"])],
  ["Join the two tables where Authors.Name = Books.Author."],
  ["sqlite", "sql", "join"], setup=BOOKINFO_SETUP)

sql(143, "Books After a Year", "Sách sau một năm", "hard",
  "Using the BookInfo database, ask the user to enter a year and display all the books published after that year, sorted by the year they were published.",
  "Dùng BookInfo, yêu cầu nhập một năm và hiển thị mọi sách xuất bản sau năm đó, sắp xếp theo năm xuất bản.",
  'import sqlite3\nwith sqlite3.connect("BookInfo.db") as db:\n    cursor = db.cursor()\n    year = int(input("Enter a year: "))\n    cursor.execute("SELECT * FROM Books WHERE DatePublished > ? ORDER BY DatePublished", [year])\n    for row in cursor.fetchall():\n        print(row)',
  [T(["2000"], ["2014", "2016", "2017"]), T(["1925"], ["1929", "1934", "1998"])],
  ["ORDER BY sorts the results."],
  ["sqlite", "sql", "order by"], setup=BOOKINFO_SETUP)

sql(144, "Save Books to Text", "Lưu sách ra tệp văn bản", "hard",
  "Using the BookInfo database, ask the user for an author's name and then save all the books by that author to a text file, with each field separated by dashes so it looks as follows:\n5 - Murder on the Orient Express - Agatha Christie - 1934\n8 - The murder on the links - Agatha Christie - 1923\n10 - The secret adversary - Agatha Christie - 1921\n11 - The seven dials mystery - Agatha Christie - 1929\nOpen the text file to make sure it has worked correctly (here: read it back and display it).",
  "Dùng BookInfo, hỏi tên tác giả rồi lưu mọi sách của tác giả đó vào tệp văn bản, các trường cách nhau bằng dấu gạch như sau:\n5 - Murder on the Orient Express - Agatha Christie - 1934\n8 - The murder on the links - Agatha Christie - 1923\n10 - The secret adversary - Agatha Christie - 1921\n11 - The seven dials mystery - Agatha Christie - 1929\nMở tệp để kiểm tra (ở đây: đọc lại và hiển thị).",
  'import sqlite3\nwith sqlite3.connect("BookInfo.db") as db:\n    cursor = db.cursor()\n    author = input("Enter an author\'s name: ")\n    cursor.execute("SELECT * FROM Books WHERE Author = ?", [author])\n    file = open("Author.txt", "w")\n    for row in cursor.fetchall():\n        file.write(str(row[0]) + " - " + row[1] + " - " + row[2] + " - " + str(row[3]) + "\\n")\n    file.close()\nfile = open("Author.txt", "r")\nprint(file.read())\nfile.close()',
  [T(["Agatha Christie"], ["5 - Murder on the Orient Express - Agatha Christie - 1934", "11 - The seven dials mystery - Agatha Christie - 1929"])],
  ["Join the fields with \" - \" and turn numbers into text with str()."],
  ["sqlite", "files"], setup=BOOKINFO_SETUP)

sql(145, "TestScores Form", "Biểu mẫu TestScores", "hard",
  "Create a program that displays a TestScores screen with two boxes, \"Enter student's name\" and \"Enter student's grade\", and two buttons, Add and Clear. It should save the data to an SQL database called TestScores when the Add button is clicked. The Clear button should clear the window.",
  "Tạo màn hình TestScores có hai ô \"Enter student's name\" và \"Enter student's grade\" cùng hai nút Add và Clear. Bấm Add sẽ lưu dữ liệu vào cơ sở dữ liệu SQL TestScores. Bấm Clear xóa trắng màn hình.",
  'import sqlite3\nwith sqlite3.connect("TestScores.db") as db:\n    cursor = db.cursor()\n    cursor.execute("CREATE TABLE IF NOT EXISTS Scores(id integer PRIMARY KEY, name text, grade integer)")\n    choice = ""\n    while choice != "q":\n        choice = input("Type a to add, c to clear or q to quit: ")\n        if choice == "a":\n            name = input("Enter student\'s name: ")\n            grade = int(input("Enter student\'s grade: "))\n            cursor.execute("INSERT INTO Scores(name, grade) VALUES(?, ?)", [name, grade])\n            db.commit()\n            print("Added")\n        elif choice == "c":\n            print("\\n" * 3)\n    cursor.execute("SELECT * FROM Scores")\n    for row in cursor.fetchall():\n        print(row)',
  [T(["a", "Ann", "8", "a", "Ben", "6", "q"], ["Ann", "8", "Ben", "6"])],
  ["Add = INSERT INTO; Clear = start fresh on screen."],
  ["sqlite", "tkinter", "menu"], web_note=GUI_NOTE + " SQLite runs inside this page.", web_note_vi=GUI_NOTE_VI + " SQLite chạy ngay trong trang.")

C(146, "Shift Code", "Mã dịch chuyển", "hard",
  'A shift code is where a message can be easily encoded and is one of the simplest codes to use. Each letter is moved forwards through the alphabet a set number of letters to be represented by a new letter. For instance, "abc" becomes "bcd" when the code is shifted by one.\nYou need to create a program which will display the following menu:\n1) Make a code\n2) Decode a message\n3) Quit\nEnter your selection:\nIf the user selects 1, they should be able to type in a message (including spaces) and then enter a number. Python should then display the encoded message once the shift code has been applied. If the user selects 2, they should enter an encoded message and the correct number and it should display the decoded message. If they select 3 it should stop the program from running. After they have encoded or decoded a message the menu should be displayed to them again until they select quit.\nIf the shift goes past the end of the alphabet it should start again. Test your decode option with the message "we ovugjohsslunl", which was created with the number 7 when the code uses "abcdefghijklmnopqrstuvwxyz " (note the space at the end).',
  'Mã dịch chuyển: mỗi chữ cái được dời tiến một số vị trí trong bảng chữ cái, ví dụ "abc" dời 1 thành "bcd". Hiển thị menu:\n1) Make a code\n2) Decode a message\n3) Quit\nEnter your selection:\nChọn 1: nhập thông điệp (có dấu cách) và một số, hiển thị thông điệp đã mã hóa. Chọn 2: nhập thông điệp đã mã hóa và số đúng, hiển thị thông điệp gốc. Chọn 3: dừng. Menu lặp lại cho đến khi chọn thoát. Khi dời quá cuối bảng chữ cái thì quay lại đầu. Thử giải mã "we ovugjohsslunl" với số 7, dùng bảng "abcdefghijklmnopqrstuvwxyz " (có dấu cách ở cuối).',
  'alphabet = "abcdefghijklmnopqrstuvwxyz "\n\ndef shift(message, num):\n    new = ""\n    for letter in message.lower():\n        if letter in alphabet:\n            pos = (alphabet.index(letter) + num) % len(alphabet)\n            new = new + alphabet[pos]\n        else:\n            new = new + letter\n    return new\n\nchoice = ""\nwhile choice != "3":\n    print("1) Make a code")\n    print("2) Decode a message")\n    print("3) Quit")\n    choice = input("Enter your selection: ")\n    if choice == "1":\n        message = input("Enter a message: ")\n        num = int(input("Enter a number: "))\n        print(shift(message, num))\n    elif choice == "2":\n        message = input("Enter the encoded message: ")\n        num = int(input("Enter the number: "))\n        print(shift(message, -num))\n    elif choice != "3":\n        print("Incorrect selection")',
  [T(["2", "we ovugjohsslunl", "7", "1", "abc", "1", "3"], ["python challenge", "bcd"])],
  ["% len(alphabet) wraps round to the start.", "Decoding is shifting by the negative number."],
  ["project", "strings", "functions"])

C(147, "Mastermind", "Mastermind", "hard",
  'You are going to make an on-screen version of the board game "Mastermind". The computer will automatically generate four colours from a list of possible colours (it should be possible for the computer to randomly select the same colour more than once). This sequence should not be displayed to the user. After this is done the user should enter their choice of four colours from the same list the computer used. After the user has made their selection, the program should display how many colours they got right in the correct position and how many colours they got right but in the wrong position, e.g. "Correct colour in the correct place: 1" and "Correct colour but in the wrong place: 1". The user continues guessing until they correctly enter the four colours in the order they should be in. At the end of the game it should display a suitable message and tell them how many guesses they took.',
  'Làm phiên bản trò chơi "Mastermind". Máy chọn ngẫu nhiên bốn màu từ một danh sách (có thể trùng màu) và không cho người chơi thấy. Người chơi nhập bốn màu từ cùng danh sách. Sau mỗi lượt, hiển thị số màu đúng ở đúng vị trí và số màu đúng nhưng sai vị trí, ví dụ "Correct colour in the correct place: 1" và "Correct colour but in the wrong place: 1". Tiếp tục đoán cho đến khi đúng cả bốn màu theo thứ tự. Kết thúc thì hiển thị thông báo và số lượt đã đoán.',
  'import random\ncolours = ["r", "b", "g", "y", "p"]\ncode = []\nfor i in range(4):\n    code.append(random.choice(colours))\nprint("Colours: r = red, b = blue, g = green, y = yellow, p = pink")\nguesses = 0\ncorrect = 0\nwhile correct != 4:\n    guess = []\n    for i in range(4):\n        guess.append(input("Enter colour " + str(i + 1) + ": ").lower())\n    guesses = guesses + 1\n    correct = 0\n    for i in range(4):\n        if guess[i] == code[i]:\n            correct = correct + 1\n    common = 0\n    for c in colours:\n        common = common + min(guess.count(c), code.count(c))\n    print("Correct colour in the correct place:", correct)\n    print("Correct colour but in the wrong place:", common - correct)\nprint("Well done, you took", guesses, "guesses")',
  [T(["r", "r", "b", "b"], ["re:correct place:? ?\\d|right place:? ?\\d|correct position:? ?\\d", "re:wrong place:? ?\\d|wrong position:? ?\\d"], allow_eof=True)],
  ["Count exact matches first, then colours in common, then subtract.", "Use single letters so typing is quick."],
  ["project", "random", "lists"], seed=3)

C(148, "Passwords", "Mật khẩu", "hard",
  "You need to create a program that will store the user ID and passwords for the users of a system. It should display the following menu:\n1) Create a new User ID\n2) Change a password\n3) Display all User IDs\n4) Quit\nEnter Selection:\nIf the user selects 1, it should ask them to enter a user ID. It should check if the user ID is already in the list. If it is, the program should display a suitable message and ask them to select another user ID. Once a suitable user ID has been entered it should ask for a password. Passwords should be scored with 1 point for each of the following: at least 8 characters; uppercase letters; lower case letters; numbers; at least one special character such as !, £, $, %, &, <, * or @. If the password scores only 1 or 2 it should be rejected with a message saying it is a weak password; if it scores 3 or 4 tell them that \"This password could be improved.\" Ask them if they want to try again. If it scores 5 tell them they have selected a strong password. Only acceptable user IDs and passwords should be added to the end of the .csv file. If they select 2 from the menu they will need to enter a user ID, check to see if the user ID exists in the list, and if it does, allow the user to change the password and save the changes to the .csv file. If the user selects 3, display all the user IDs but not the passwords. If the user selects 4 it should stop the program.",
  "Tạo chương trình lưu User ID và mật khẩu, với menu:\n1) Create a new User ID\n2) Change a password\n3) Display all User IDs\n4) Quit\nEnter Selection:\nChọn 1: nhập User ID; nếu đã có thì báo và yêu cầu chọn ID khác. Sau đó nhập mật khẩu, chấm 1 điểm cho mỗi tiêu chí: ít nhất 8 ký tự; có chữ hoa; có chữ thường; có số; có ký tự đặc biệt như !, £, $, %, &, <, * hoặc @. 1-2 điểm: từ chối vì mật khẩu yếu; 3-4 điểm: báo \"This password could be improved.\" và hỏi có muốn thử lại không; 5 điểm: mật khẩu mạnh. Chỉ lưu ID và mật khẩu hợp lệ vào cuối tệp .csv. Chọn 2: nhập User ID, nếu tồn tại thì cho đổi mật khẩu và lưu vào tệp. Chọn 3: hiển thị mọi User ID, không hiện mật khẩu. Chọn 4: dừng.",
  'import csv\n\ndef get_rows():\n    file = open("passwords.csv", "r")\n    rows = []\n    for row in csv.reader(file):\n        rows.append(row)\n    file.close()\n    return rows\n\ndef score(password):\n    points = 0\n    if len(password) >= 8:\n        points = points + 1\n    if password.lower() != password:\n        points = points + 1\n    if password.upper() != password:\n        points = points + 1\n    if any(ch.isdigit() for ch in password):\n        points = points + 1\n    if any(ch in "!£$%&<*@" for ch in password):\n        points = points + 1\n    return points\n\ndef get_password():\n    while True:\n        password = input("Enter a password: ")\n        points = score(password)\n        if points <= 2:\n            print("That is a weak password, try again")\n        elif points <= 4:\n            print("This password could be improved.")\n            again = input("Do you want to try again? (y/n) ")\n            if again != "y":\n                return password\n        else:\n            print("You have selected a strong password")\n            return password\n\ndef save(rows):\n    file = open("passwords.csv", "w")\n    for row in rows:\n        file.write(row[0] + "," + row[1] + "\\n")\n    file.close()\n\nchoice = ""\nwhile choice != "4":\n    print("1) Create a new User ID")\n    print("2) Change a password")\n    print("3) Display all User IDs")\n    print("4) Quit")\n    choice = input("Enter Selection: ")\n    rows = get_rows()\n    ids = [row[0] for row in rows]\n    if choice == "1":\n        user = input("Enter a new user ID: ")\n        while user in ids:\n            print("That user ID is already taken")\n            user = input("Enter another user ID: ")\n        rows.append([user, get_password()])\n        save(rows)\n    elif choice == "2":\n        user = input("Enter your user ID: ")\n        if user in ids:\n            rows[ids.index(user)][1] = get_password()\n            save(rows)\n        else:\n            print("That user ID does not exist")\n    elif choice == "3":\n        for user in ids:\n            print(user)\n    elif choice != "4":\n        print("Incorrect selection")',
  [T(["1", "admin", "lan", "abc", "Hello123", "n", "2", "lan", "Str0ng!Pass", "3", "4"], ["re:taken|already|exists|in use", "weak", "could be improved", "strong", "admin", "lan"])],
  ["Keep the data in a list, change it, then rewrite the whole .csv file.", "Give each rule its own if so points add up."],
  ["project", "csv", "functions"], setup='file = open("passwords.csv", "w")\nfile.write("admin,Adm1n!Pass\\n")\nfile.close()',
  web_note=FILE_NOTE, web_note_vi=FILE_NOTE_VI)

gui(149, "Times Tables", "Bảng cửu chương (GUI)", "hard",
  'Create a program with a box to enter a number, a "View Times Table" button, a list area and a "Clear" button. When the user enters a number in the first box and clicks on the "View Times Table" button it should show the times table in the list area (for example 1 x 99 = 99 up to 12 x 99 = 1188). The "Clear" button should clear both boxes. Display the number sentence in the list rather than just the answers.',
  'Tạo chương trình có ô nhập số, nút "View Times Table", vùng danh sách và nút "Clear". Khi nhập số và bấm "View Times Table" sẽ hiện bảng nhân trong vùng danh sách (ví dụ 1 x 99 = 99 đến 12 x 99 = 1188). Nút "Clear" xóa cả hai ô. Hiển thị cả phép tính chứ không chỉ kết quả.',
  'def view_times_table(num):\n    for i in range(1, 13):\n        print(i, "x", num, "=", i * num)\n\nchoice = ""\nwhile choice != "q":\n    choice = input("Enter a number, c to clear or q to quit: ")\n    if choice == "c":\n        print("\\n" * 3)\n    elif choice != "q":\n        view_times_table(int(choice))',
  [T(["99", "q"], ["1 x 99 = 99", "12 x 99 = 1188"]), T(["7", "q"], ["1 x 7 = 7", "12 x 7 = 84"])],
  ["Print the whole number sentence: i, \"x\", num, \"=\", i * num."],
  ["project", "tkinter", "functions"])

ART_DATA = ('artists = [(1, "Martin Leighton", "5 Park Place", "Peterborough", "Cambridgeshire", "PE32 5LP"),\n'
            '           (2, "Eva Czarniecka", "77 Warner Close", "Chelmsford", "Essex", "CM22 5FT"),\n'
            '           (3, "Roxy Parkin", "90 Hindhead Road", "London", "", "SE12 6WM"),\n'
            '           (4, "Nigel Farnworth", "41 Whitby Road", "Huntly", "Aberdeenshire", "AB54 5PN"),\n'
            '           (5, "Teresa Tanner", "70 Guild Street", "London", "", "NW7 1SP")]\n'
            'art = [(1, 5, "Woman with black Labrador", "Oil", 220), (2, 5, "Bees & thistles", "Watercolour", 85),\n'
            '       (3, 2, "A stroll to Westminster", "Ink", 190), (4, 1, "African giant", "Oil", 800),\n'
            '       (5, 3, "Water daemon", "Acrylic", 1700), (6, 4, "A seagull", "Watercolour", 35),\n'
            '       (7, 1, "Three friends", "Oil", 1800), (8, 2, "Summer breeze 1", "Acrylic", 1350),\n'
            '       (9, 4, "Mr Hamster", "Watercolour", 35), (10, 1, "Pulpit Rock, Dorset", "Oil", 600),\n'
            '       (11, 5, "Trawler Dungeness beach", "Oil", 195), (12, 2, "Dance in the snow", "Oil", 250),\n'
            '       (13, 4, "St Tropez port", "Ink", 45), (14, 3, "Pirate assassin", "Acrylic", 420),\n'
            '       (15, 1, "Morning walk", "Oil", 800), (16, 4, "A baby barn swallow", "Watercolour", 35),\n'
            '       (17, 4, "The old working mills", "Ink", 395)]\n')

sql(150, "Art Gallery", "Phòng tranh", "hard",
  "A small art gallery is selling works from different artists and wants to keep track of the paintings using an SQL database. You need to create a user-friendly system to keep track of the art. Store the artists (ID, name, address, town, county, postcode) and the pieces of art (piece ID, artist ID, title, medium, price) given in the book. The user should be able to add new artists and new pieces of art, search by artist, by medium (e.g. oil, watercolour) and by price range, and when a piece is sold it should be removed from the pieces table and saved to a separate text file of sold art.",
  "Một phòng tranh nhỏ muốn quản lý tác phẩm bằng cơ sở dữ liệu SQL. Hãy tạo hệ thống dễ dùng: lưu nghệ sĩ (ID, tên, địa chỉ, thị trấn, hạt, mã bưu chính) và tác phẩm (ID, ID nghệ sĩ, tên, chất liệu, giá) theo dữ liệu trong sách. Người dùng có thể thêm nghệ sĩ và tác phẩm mới, tìm theo nghệ sĩ, theo chất liệu (ví dụ oil, watercolour) và theo khoảng giá; khi một tác phẩm được bán thì xóa khỏi bảng và lưu vào tệp văn bản các tác phẩm đã bán.",
  'import sqlite3\n\n' + ART_DATA + '\ndb = sqlite3.connect("ArtGallery.db")\ncursor = db.cursor()\ncursor.execute("DROP TABLE IF EXISTS Artists")\ncursor.execute("DROP TABLE IF EXISTS Pieces")\ncursor.execute("CREATE TABLE Artists(ArtistID integer PRIMARY KEY, Name text, Address text, Town text, County text, Postcode text)")\ncursor.execute("CREATE TABLE Pieces(PieceID integer PRIMARY KEY, ArtistID integer, Title text, Medium text, Price integer)")\ncursor.executemany("INSERT INTO Artists VALUES(?, ?, ?, ?, ?, ?)", artists)\ncursor.executemany("INSERT INTO Pieces VALUES(?, ?, ?, ?, ?)", art)\ndb.commit()\n\ndef show(rows):\n    for row in rows:\n        print(row)\n\nchoice = ""\nwhile choice != "7":\n    print("1) Add an artist")\n    print("2) Add a piece of art")\n    print("3) Search by artist")\n    print("4) Search by medium")\n    print("5) Search by price range")\n    print("6) Sell a piece")\n    print("7) Quit")\n    choice = input("Enter your selection: ")\n    if choice == "1":\n        name = input("Name: ")\n        address = input("Address: ")\n        town = input("Town: ")\n        county = input("County: ")\n        postcode = input("Postcode: ")\n        cursor.execute("INSERT INTO Artists(Name, Address, Town, County, Postcode) VALUES(?, ?, ?, ?, ?)", [name, address, town, county, postcode])\n        db.commit()\n    elif choice == "2":\n        artist = int(input("Artist ID: "))\n        title = input("Title: ")\n        medium = input("Medium: ")\n        price = int(input("Price: "))\n        cursor.execute("INSERT INTO Pieces(ArtistID, Title, Medium, Price) VALUES(?, ?, ?, ?)", [artist, title, medium, price])\n        db.commit()\n    elif choice == "3":\n        name = input("Artist name: ")\n        cursor.execute("SELECT Pieces.Title, Pieces.Medium, Pieces.Price FROM Pieces, Artists WHERE Pieces.ArtistID = Artists.ArtistID AND Artists.Name = ?", [name])\n        show(cursor.fetchall())\n    elif choice == "4":\n        medium = input("Medium: ")\n        cursor.execute("SELECT * FROM Pieces WHERE Medium = ?", [medium])\n        show(cursor.fetchall())\n    elif choice == "5":\n        low = int(input("Lowest price: "))\n        high = int(input("Highest price: "))\n        cursor.execute("SELECT * FROM Pieces WHERE Price >= ? AND Price <= ? ORDER BY Price", [low, high])\n        show(cursor.fetchall())\n    elif choice == "6":\n        piece = int(input("Piece ID sold: "))\n        cursor.execute("SELECT * FROM Pieces WHERE PieceID = ?", [piece])\n        row = cursor.fetchone()\n        if row:\n            file = open("SoldArt.txt", "a")\n            file.write(str(row) + "\\n")\n            file.close()\n            cursor.execute("DELETE FROM Pieces WHERE PieceID = ?", [piece])\n            db.commit()\n            print("Sold:", row[2])\n        else:\n            print("That piece is not in the gallery")\n    elif choice != "7":\n        print("Incorrect selection")\ndb.close()',
  [T(["3", "Teresa Tanner", "4", "Ink", "5", "30", "50", "6", "9", "5", "30", "50", "7"], ["Woman with black Labrador", "Trawler Dungeness beach", "A stroll to Westminster", "St Tropez port", "A seagull", "Mr Hamster", "Sold", "Mr Hamster", "A seagull", "re:^(?![\\s\\S]*Sold: Mr Hamster[\\s\\S]*Mr Hamster)"])],
  ["Create both tables first, then one menu with a branch per feature.", "Use a JOIN to search by artist name."],
  ["project", "sqlite", "tkinter"], web_note=GUI_NOTE + " SQLite runs inside this page.", web_note_vi=GUI_NOTE_VI + " SQLite chạy ngay trong trang.")
