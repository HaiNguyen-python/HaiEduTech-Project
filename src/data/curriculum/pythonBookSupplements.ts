/** Original book-specific notes. Fenced examples run in the lesson console. */
const example = (title: string, explanation: string, code: string) =>
  `### ${title}\n\n${explanation}\n\n\`\`\`python\n${code}\n\`\`\``;

export const pythonBookSupplements: Record<string, string> = {
  "book-strings": example("Quotes, escaping and conversion", "Use different outer quotes or a backslash to include a quote inside text. `\\n` starts a new line and `\\\\` represents a literal backslash. Triple quotes allow multiline text. `str(number)` converts a number to text; `int(text)` and `float(text)` reverse the conversion when the text is valid. This supports Challenges 020-026.", String.raw`message = "It's Python"
path = "folder\\notes.txt"
print(message)
print(path)
print("Age: " + str(20))`),
  "book-random": example("Stepped random choices", "`randrange(start, stop, step)` selects from the same values as `range()`; stop is excluded. `randint(a, b)` includes both endpoints. Multiplying `random.random()` by 100 gives a float from 0 inclusive to 100 exclusive. Create a game's secret before the guessing loop in Challenges 052-059.", `import random
multiple = random.randrange(0, 100, 5)
scaled = random.random() * 100
print("Multiple of five:", multiple % 5 == 0)
print("Within range:", 0 <= scaled < 100)`),
  "book-turtle": example("Drawing setup and colour", "For desktop Python, create `screen = turtle.Screen()` and call `screen.bgcolor(\"lightblue\")`. `turtle.shape(\"turtle\")` changes the cursor; `hideturtle()` hides it. `turtle.color(\"black\", \"red\")` sets line and fill colours. Enclose a closed shape between `begin_fill()` and `end_fill()`; `circle(radius)` draws a circle. Finish with `screen.exitonclick()`. Native window commands require local Python, not this console. Challenges 060-068 supply a drawing adapter; this example calculates triangle turns.", `sides = 3
turn = 360 / sides
for side in range(sides):
    print("Side", side + 1, "turn", turn)
print("Full rotation:", sides * turn)`),
  "m3-l1-list": example("Ordering, slicing and membership", "`sorted(sequence)` creates a sorted list without changing the source. `list.sort()` changes the original and returns `None`. `len()` counts items, `in` checks membership and slicing excludes its stop. A tuple's `.index(value)` finds the first match. These operations support Challenges 069-079.", `colours = ("red", "blue", "green")
print("Blue position:", colours.index("blue"))
names = ["Mia", "Ava", "Leo"]
ordered = sorted(names)
print("Original:", names)
print("Sorted:", ordered)
print("First two:", ordered[:2])
print("Ava present:", "Ava" in names)
print("Count:", len(names))`),
  "m3-l6-strings": example("Case checks and output separators", "`.isupper()` and `.islower()` require at least one cased character and check all cased characters; digits are ignored. `.isalpha()` rejects spaces. `end=` replaces print's usual newline, so `print(letter, end=\"*\")` displays characters on one line. Finish with `print()` for a newline. These techniques prepare the password and letter-display tasks in Challenges 080-087.", `print("CODE7".isupper())  # True
print("code7".islower())  # True
print("123".isupper())    # False
for letter in "CODE":
    print(letter, end="*")
print()`),
  "book-arrays": example("Type codes and precision", "`\"i\"` stores signed C integers and `\"l\"` signed C long integers. Their size depends on the runtime: inspect `.itemsize` rather than assuming four bytes. `\"f\"` stores single-precision and `\"d\"` double-precision floats; both may show representation rounding. These standard-library arrays are not NumPy arrays. Match the code to the inputs in Challenges 088-095.", `from array import array
counts = array("l", [10, 20])
prices = array("d", [1.25, 2.5])
print("Counts:", counts.tolist())
print("Bytes per count:", counts.itemsize)
print("Prices:", prices.tolist())`),
  "book-2d": example("Adding and searching nested records", "Assign a new dictionary under a new name to add a record. Iterate through `.items()` to search; keep field names consistent. List indices identify row then column; nested dictionary keys identify a record then a field. This prepares the entry and filtering tasks in Challenges 100-104.", `people = {"Ava": {"age": 20, "shoe": 38}}
people["Mia"] = {"age": 21, "shoe": 39}
for name, details in people.items():
    if details["age"] >= 21:
        print(name, details["shoe"])`),
  "book-csv": example("Removing a CSV record safely", "Read rows into `list(csv.reader(file))` before opening that file in write mode. Keep the header, filter the selected record, then use `writerows()` to rewrite the retained rows. Writing before reading erases the original. Mode `\"x\"` creates a new file but raises `FileExistsError` if it exists. Challenge 116 uses read-filter-rewrite; Challenge 117 combines append and display.", `import csv

with open("catalogue.csv", "w", newline="", encoding="utf-8") as file:
    csv.writer(file).writerows([
        ["title", "year"], ["Python", "2020"], ["Old Guide", "2000"]
    ])
with open("catalogue.csv", newline="", encoding="utf-8") as file:
    rows = list(csv.reader(file))
kept = [rows[0]]
for row in rows[1:]:
    if row[0] != "Old Guide":
        kept.append(row)
with open("catalogue.csv", "w", newline="", encoding="utf-8") as file:
    csv.writer(file).writerows(kept)
print("Remaining:", kept[1:])`),
  "m4-l1-define": example("Menu actions and function scope", "A menu chooses which function to call. Define functions before execution reaches their calls. A function body may refer to a function defined later if that definition executes before the call. Pass values as arguments and return results instead of relying on globals. The book also shows `global`, which permits assignment to a module-level name inside a function; explicit parameters are easier to test. Challenges 118-123 combine input, calculation and menus.", `def total(first, second):
    return first + second

def run_action(choice):
    if choice == "add":
        return total(4, 6)
    return "Unknown action"

print(run_action("add"))`),
  "book-tkinter": example("Widget layout and callbacks", "Create the window before its widgets. `window.title()` sets its caption; `window.geometry(\"400x300\")` sets its initial size. `place(x=..., y=..., width=..., height=...)` uses coordinates; `grid(row=..., column=...)` uses rows and columns. `Entry.delete(0, tk.END)` clears text and `Entry.insert(0, value)` inserts text. `Listbox.insert(tk.END, item)` appends an item. Pass the callback itself to `command`. Challenges 124-132 adapt these input/action/output steps to console programs; the desktop example below shows native widgets.", `def calculate(value):
    return value * 2

actions = {"double": calculate}
callback = actions["double"]
print("Result:", callback(12))`),
  "book-more-tkinter": example("Selections, images and saving", "On desktop Python, `selection = listbox.curselection()` returns selected indices. Check it is non-empty before `listbox.get(selection[0])` or `listbox.delete(selection[0])`. An `OptionMenu` reads its choice through a `StringVar` and `.get()`. Display a `PhotoImage` with a Label and retain the image reference. `.configure(bg=...)` changes colour. Challenges 133-138 exercise corresponding selection, validation and save logic without native windows.", `items = ["Book", "Pen"]
selected = [1]
if selected:
    index = selected[0]
    print("Selected:", items[index])
    items.pop(index)
print("Remaining:", items)`),
  "book-sqlite": example("Updating, deleting and joining", "`UPDATE ... WHERE` edits matching rows; `DELETE ... WHERE` removes them. `ORDER BY` sorts results; `WHERE` filters them. `INNER JOIN` matches related keys across tables. Use `INTEGER PRIMARY KEY` for stable IDs. Commit writes and pass values separately with placeholders. This covers Challenges 139-145 and prepares the artist/artwork relationship in Challenge 150.", `import sqlite3

db = sqlite3.connect(":memory:")
db.execute("CREATE TABLE artists (id INTEGER PRIMARY KEY, name TEXT)")
db.execute("CREATE TABLE works (id INTEGER PRIMARY KEY, artist_id INTEGER, title TEXT)")
db.execute("INSERT INTO artists VALUES (?, ?)", (1, "Ava"))
db.execute("INSERT INTO works VALUES (?, ?, ?)", (1, 1, "Study"))
db.execute("UPDATE works SET title = ? WHERE id = ?", ("Morning", 1))
rows = db.execute("SELECT artists.name, works.title FROM artists INNER JOIN works ON artists.id = works.artist_id ORDER BY works.id").fetchall()
print(rows)
db.execute("DELETE FROM works WHERE id = ?", (1,))
db.commit()
print("Remaining works:", db.execute("SELECT COUNT(*) FROM works").fetchone()[0])
db.close()`),
  "book-projects": example("Mastermind feedback without double-counting", "For Challenge 147, remove exact-position matches first. Compare remaining colours and remove each matched occurrence after counting it, so repeated colours cannot be counted twice. Keep the secret fixed while guesses change. Test all-exact, all-wrong and repeated-colour cases before adding the menu and attempt counter.", `def feedback(secret, guess):
    exact = 0
    remaining_secret = []
    remaining_guess = []
    for target, colour in zip(secret, guess):
        if target == colour:
            exact += 1
        else:
            remaining_secret.append(target)
            remaining_guess.append(colour)
    misplaced = 0
    for colour in remaining_guess:
        if colour in remaining_secret:
            misplaced += 1
            remaining_secret.remove(colour)
    return exact, misplaced

print(feedback(["red", "blue", "red", "green"],
               ["red", "red", "yellow", "blue"]))  # (1, 2)`),
};