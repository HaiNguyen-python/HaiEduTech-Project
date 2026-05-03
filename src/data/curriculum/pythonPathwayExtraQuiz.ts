/**
 * @file pythonPathwayExtraQuiz.ts
 * @description Additional quiz questions appended to each Python Pathway lesson
 *              so every lesson has at least 5 questions. Keyed by lesson id.
 */
import type { QuizQuestion } from "./pythonPathway";

const mc = (
  q: string,
  options: string[],
  answer: number,
  explanation?: string,
): QuizQuestion => ({ type: "mcq", q, qEn: q, options, optionsEn: options, answer, explanation });

const fl = (
  q: string,
  codeBefore: string,
  codeAfter: string,
  answer: string,
  explanation?: string,
): QuizQuestion => ({ type: "fill", q, qEn: q, codeBefore, codeAfter, answer, explanation });

export const extraQuiz: Record<string, QuizQuestion[]> = {
  // ===== MODULE 1 - BASICS =====
  "m1-l1-setup": [
    mc("Which command checks the installed Python version?", ["python -v", "python --version", "py -version", "version python"], 1, "Use --version (or -V)."),
    mc("What is REPL?", ["A library", "Read–Eval–Print Loop", "A bug report", "A package manager"], 1),
  ],
  "m1-l2-variables": [
    mc("Which value is a bool?", ['"True"', "1", "True", "yes"], 2, "True/False with capital letters."),
    fl("Print the type of x", "print(", "(x))", "type", "type(x) returns the class."),
  ],
  "m1-l3-operators": [
    mc("Result of 7 // 2?", ["3.5", "3", "4", "1"], 1, "Floor division returns int."),
    mc("Which is the NOT operator in Python?", ["!", "not", "~", "no"], 1),
  ],
  "m1-l4-io": [
    mc("How to convert '3.14' to float?", ["float('3.14')", "int('3.14')", "str(3.14)", "num('3.14')"], 0),
    fl("Cast input to int", "n = int(", '("Age: "))', "input"),
  ],
  "m1-l5-fstring": [
    mc("Which prefix marks an f-string?", ['"', "f", "r", "b"], 1, "f\"...\" enables interpolation."),
    fl("Format pi with 2 decimals", 'print(f"', '{pi:.2f}")', "", "Use :.2f format spec."),
  ],
  "m1-l6-comments": [
    mc("Single-line comment in Python?", ["//", "#", "--", "/* */"], 1),
    mc("Multi-line docstring delimiter?", ['"""', "##", "/* */", "<!-- -->"], 0),
  ],
  "m1-l7-typecast": [
    mc("Convert 5 to string?", ["str(5)", "string(5)", "toString(5)", "(string)5"], 0),
    mc("int('3.14') results in?", ["3", "3.14", "ValueError", "0"], 2, "Cannot parse decimal as int directly."),
  ],

  // ===== MODULE 2 - CONTROL FLOW =====
  "m2-1-ifelse": [
    mc("Ternary expression syntax?", ["a ? b : c", "b if cond else c", "if cond then b else c", "cond ? b : c"], 1),
    mc("How many spaces per indent (PEP 8)?", ["2", "3", "4", "tab"], 2),
  ],
  "m2-l2-forloop": [
    mc("range(2, 10, 3) yields?", ["2,5,8", "2,4,6,8", "2,5,8,10", "3,6,9"], 0),
    fl("Loop with index using...", "for i, v in ", "(items):\n    print(i, v)", "enumerate"),
  ],
  "m2-l3-while": [
    mc("How to exit a while loop early?", ["exit", "break", "stop", "return"], 1),
    mc("What runs forever if not stopped?", ["while False:", "while True:", "for _ in []:", "if True:"], 1),
  ],
  "m2-l4-logic": [
    mc("Which value is FALSY?", ['"hi"', "1", "[]", "[0]"], 2, "Empty list is falsy."),
    mc("Result of: True and False or True", ["True", "False", "Error", "None"], 0),
  ],
  "m2-l5-break": [
    mc("Skip current iteration and go next?", ["break", "continue", "pass", "return"], 1),
    mc("Loop's else runs when?", ["Always", "Loop ends without break", "Loop is broken", "Never"], 1),
  ],
  "m2-l6-nested": [
    mc("break in a nested loop affects?", ["All loops", "Innermost loop", "Outermost loop", "None"], 1),
    mc("How many '*' printed by:\nfor i in range(3):\n  for j in range(2):\n    print('*')", ["5", "6", "3", "2"], 1),
  ],
  "m2-l7-while-advanced": [
    mc("walrus operator?", ["::", ":=", "=>", "<-"], 1, ":= assigns inside expression."),
    mc("Reset condition with walrus while reading until empty?", ["while x = input():", "while (x := input()):", "while input() as x:", "for x in input:"], 1),
  ],
  "m2-l8-match": [
    mc("match-case introduced in?", ["3.8", "3.9", "3.10", "3.11"], 2),
    mc("Wildcard pattern in match?", ["*", "_", "?", "any"], 1),
  ],

  // ===== MODULE 3 - DATA STRUCTURES =====
  "m3-l1-list": [
    mc("Append to list?", ["list.add()", "list.append()", "list.push()", "list.insert()"], 1),
    fl("Last element of nums", "nums[", "]", "-1"),
  ],
  "m3-l2-tuple": [
    mc("Tuple is...", ["Mutable", "Immutable", "Ordered set", "Dict"], 1),
    mc("Single-element tuple?", ["(1)", "(1,)", "[1]", "{1}"], 1, "Trailing comma required."),
  ],
  "m3-l3-dict": [
    mc("Get value safely if missing?", ["d['k']", "d.get('k')", "d.find('k')", "d.lookup('k')"], 1),
    fl("Iterate keys & values", "for k, v in d.", "():\n    print(k, v)", "items"),
  ],
  "m3-l4-set": [
    mc("Set property?", ["Ordered", "Indexable", "Unique elements", "Allow duplicates"], 2),
    mc("Intersection operator?", ["|", "&", "-", "^"], 1),
  ],
  "m3-l5-comprehension": [
    mc("Squares of 0..4 as list?", ["[i*i for i in range(5)]", "{i*i for i in range(5)}", "(i*i for i in range(5))", "list(i*i, range(5))"], 0),
    fl("Filter even numbers", "[x for x in nums ", " x % 2 == 0]", "if"),
  ],
  "m3-l6-strings": [
    mc("Uppercase string?", ["s.upper()", "upper(s)", "s.toUpper()", "s.upcase()"], 0),
    mc("Split by comma?", ["s.split(',')", "split(s, ',')", "s.cut(',')", "s.tokens(',')"], 0),
  ],
  "m3-l7-slicing": [
    mc("Reverse a list with slicing?", ["lst.reverse()", "lst[::-1]", "lst[-1:]", "reversed(lst)"], 1),
    fl("First 3 elements", "lst[", "]", ":3"),
  ],
  "m3-l8-sortfilter": [
    mc("Sort by length?", ["sorted(words, key=len)", "sort(words, len)", "words.sort(len)", "sorted(words, len)"], 0),
    mc("Filter positives?", ["filter(x>0, nums)", "list(filter(lambda x: x>0, nums))", "nums.filter(>0)", "filter(nums, >0)"], 1),
  ],

  // ===== MODULE 4 - FUNCTIONS =====
  "m4-l1-define": [
    mc("Define a function with?", ["function", "def", "func", "lambda"], 1),
    mc("Return nothing default?", ["0", "None", "False", "''"], 1),
  ],
  "m4-l2-params": [
    mc("Default value syntax?", ["def f(x=10):", "def f(x:10):", "def f(x->10):", "def f(x default 10):"], 0),
    mc("Keyword argument?", ["f(10)", "f(x=10)", "f(x:10)", "f(x->10)"], 1),
  ],
  "m4-l3-lambda": [
    mc("Lambda equivalent of: def sq(x): return x*x", ["lambda x=x*x", "lambda x: x*x", "lambda(x) x*x", "fn x => x*x"], 1),
    mc("Lambda can have...", ["Multiple statements", "Only one expression", "No arguments only", "Loops"], 1),
  ],
  "m4-l4-modules": [
    mc("Import math?", ["import math", "include math", "use math", "require math"], 0),
    fl("Import only sqrt", "from math ", " sqrt", "import"),
  ],
  "m4-l5-args": [
    mc("*args collects?", ["Keyword args", "Positional args as tuple", "Default values", "Nothing"], 1),
    mc("**kwargs collects?", ["Positional", "Keyword args as dict", "Lists", "Sets"], 1),
  ],
  "m4-l6-recursion": [
    mc("Recursion needs a...", ["Loop", "Base case", "Class", "Decorator"], 1),
    mc("Default Python recursion limit ~?", ["100", "1000", "10000", "Unlimited"], 1),
  ],
  "m4-l7-scope": [
    mc("Use a global var inside a function?", ["global x", "nonlocal x", "extern x", "static x"], 0),
    mc("Modify enclosing (not module) scope?", ["global", "nonlocal", "outer", "self"], 1),
  ],
  "m4-l8-typing": [
    mc("Type hint for an int parameter?", ["def f(x int):", "def f(x: int):", "def f(x as int):", "def f(int x):"], 1),
    mc("Optional[int] means?", ["int only", "int or None", "list of int", "any"], 1),
  ],

  // ===== MODULE 5 - OOP =====
  "m5-l1-class": [
    mc("Constructor method name?", ["__new__", "__init__", "constructor", "init"], 1),
    mc("First param of instance methods?", ["this", "self", "cls", "me"], 1),
  ],
  "m5-l2-inherit": [
    mc("Inherit class A?", ["class B(A):", "class B extends A:", "class B : A", "class B inherits A"], 0),
    mc("Call parent __init__?", ["parent.__init__()", "super().__init__()", "self.parent()", "A.init()"], 1),
  ],
  "m5-l3-encap": [
    mc("Convention for 'private' attr?", ["public_x", "_x", "$x", "@x"], 1),
    mc("Name mangling double underscore?", ["_x", "__x", "x__", "__x__"], 1),
  ],
  "m5-l4-poly": [
    mc("Polymorphism means?", ["Multiple inheritance", "Same interface, different behavior", "Encapsulation", "Casting"], 1),
    mc("Override means?", ["New method in subclass with same name", "Multiple methods overload", "Hide attr", "Static method"], 0),
  ],
  "m5-l5-property": [
    mc("Decorator to make a method behave like attr?", ["@staticmethod", "@property", "@classmethod", "@attr"], 1),
    mc("Setter decorator?", ["@x.set", "@x.setter", "@set.x", "@property.set"], 1),
  ],
  "m5-l6-magic": [
    mc("Customize str() output?", ["__repr__", "__str__", "__format__", "__print__"], 1),
    mc("Length via len()?", ["__size__", "__len__", "__count__", "__length__"], 1),
  ],
  "m5-l7-dataclass": [
    mc("Decorator?", ["@dataclass", "@data", "@class", "@record"], 0),
    mc("Auto-generated method?", ["__init__", "__main__", "__call__", "__del__"], 0),
  ],

  // ===== MODULE 6 - MASTERY =====
  "m6-l1-files": [
    mc("Read entire file?", ["f.read()", "f.readall()", "f.load()", "f.text()"], 0),
    mc("Best practice for opening files?", ["open() then close()", "with open() as f:", "open() in try", "load()"], 1),
  ],
  "m6-l2-api": [
    mc("Library to call HTTP APIs?", ["urllib3", "requests", "httpcall", "axios"], 1),
    mc("HTTP status 200 means?", ["Not found", "OK", "Server error", "Redirect"], 1),
  ],
  "m6-l3-numpy": [
    mc("Create array?", ["np.array([1,2])", "np.list([1,2])", "np.new([1,2])", "np.tensor([1,2])"], 0),
    mc("Element-wise add 2 arrays a + b requires?", ["Same shape", "Different shape", "Lists not arrays", "Loops"], 0),
  ],
  "m6-l4-pandas": [
    mc("Read CSV?", ["pd.read_csv()", "pd.load_csv()", "pd.csv()", "pd.open_csv()"], 0),
    mc("First 5 rows?", ["df.head()", "df.first(5)", "df.top()", "df[:5]()"], 0),
  ],
  "m6-l5-errors": [
    mc("Catch an exception?", ["try/catch", "try/except", "begin/rescue", "handle/error"], 1),
    mc("Always-run cleanup block?", ["except", "finally", "ensure", "after"], 1),
  ],
  "m6-l6-decorator": [
    mc("Apply a decorator?", ["@decorator", "#decorator", "$decorator", "decorate fn"], 0),
    mc("A decorator is a function that returns?", ["A class", "A function", "A value", "Nothing"], 1),
  ],
  "m6-l7-generator": [
    mc("Yield instead of return makes a?", ["List", "Generator", "Tuple", "Set"], 1),
    mc("Generators are good for?", ["Memory efficiency", "Speed only", "Random access", "Sorting"], 0),
  ],
  "m6-l8-regex": [
    mc("Module for regex?", ["regex", "re", "rex", "pattern"], 1),
    mc("Match digit?", ["\\w", "\\d", "\\s", "."], 1),
  ],
  "m6-l9-virtualenv": [
    mc("Create venv?", ["python -m venv .venv", "python create venv", "pip venv .venv", "venv new"], 0),
    mc("Activate venv on Windows?", [".venv/bin/activate", ".venv\\Scripts\\activate", "source .venv", "venv on"], 1),
  ],
};
