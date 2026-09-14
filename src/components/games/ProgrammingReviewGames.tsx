/**
 * Programming review games for the Tech & Code Game Hub.
 * Seven multiple-choice review missions (Bug Hunter, Git Branch Quest, Cyber Shield,
 * Big-O Detective, Terminal Rescue, Data Type Sorter, Prompt Architect) plus
 * Python Speed Run (accuracy + speed typing).
 * Questions and code stay English-only; interface copy is bilingual.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Binary, Bug, CheckCircle2, Flame, GitBranch, Keyboard, Lightbulb, RotateCcw, ShieldCheck, Sparkles, Terminal, Timer, Trophy, Wand2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { finishGame } from "@/lib/gameSession";
import { recordArcadeRun, type ArcadeBadge } from "@/lib/arcadeProgress";
import { playArcadeCue } from "@/lib/arcadeSound";
import { useLanguage } from "@/contexts/LanguageContext";

interface GameProps {
  onScore?: (delta: number) => void;
  /** Number of games in the hub, used for the explorer badge. */
  totalGames?: number;
  /** Fired when a run finishes so the hub can refresh records and badges. */
  onRunSaved?: () => void;
}

interface ReviewQuestion {
  /** Short review focus label shown above the question (English, curriculum wording). */
  tag: string;
  prompt: string;
  code?: string;
  options: string[];
  answer: number;
  explanation: string;
}

type Mode = "easy" | "normal" | "hard";

/** XP awarded per correct multiple-choice answer. */
const XP_PER_ANSWER = 20;
/** Extra XP per answer while a correct streak is running. */
const COMBO_BONUS = 5;
/** XP traded for one hint. */
const HINT_COST = 10;
/** Hints allowed per run. */
const MAX_HINTS = 2;
/** Questions drawn from the bank for one run. */
const QUESTIONS_PER_RUN = 10;
/** Highest XP a single typing snippet can award (see scoreFor). */
const MAX_SNIPPET_XP = 119;

const MODE_SECONDS: Record<Mode, number | null> = { easy: null, normal: 25, hard: 12 };

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = () => setReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  return reduced;
};

/** Pick n random questions, keeping one question per review tag when possible. */
function sampleQuestions(bank: ReviewQuestion[], count: number) {
  const shuffled = [...bank].sort(() => Math.random() - 0.5);
  const seenTags = new Set<string>();
  const primary: ReviewQuestion[] = [];
  const spare: ReviewQuestion[] = [];
  shuffled.forEach((question) => {
    if (!seenTags.has(question.tag)) {
      seenTags.add(question.tag);
      primary.push(question);
    } else {
      spare.push(question);
    }
  });
  return [...primary, ...spare].slice(0, Math.min(count, bank.length));
}

/** Core Python typing ladder: variables -> conditions -> loops -> functions -> data. */
const PYTHON_SNIPPETS = [
  "name = 'Mai'\nprint('Hello', name)",
  "score = 82\nif score >= 80:\n    print('Pass')\nelse:\n    print('Retry')",
  "total = 0\nfor number in range(1, 6):\n    total += number\nprint(total)",
  "def average(values):\n    return sum(values) / len(values)\n\nprint(average([8, 9, 10]))",
  "students = {'Mai': 9, 'Nam': 7}\nfor name, score in students.items():\n    print(name, score)",
];

const BUG_QUESTIONS: ReviewQuestion[] = [
  { tag: "Loops", prompt: "Why does this loop never stop?", code: "count = 5\nwhile count > 0:\n    print(count)\n    count += 1", options: ["The condition needs ==", "count should decrease", "print must be outside", "while cannot use numbers"], answer: 1, explanation: "The condition stays true because count increases. Use count -= 1." },
  { tag: "Functions", prompt: "Which fix makes this function return the sum?", code: "def add(a, b):\n    total = a + b\nprint(add(2, 3))", options: ["Add return total inside the function", "Rename total to sum", "Remove print", "Use a loop"], answer: 0, explanation: "Without return total, Python returns None." },
  { tag: "Syntax", prompt: "What causes the syntax error?", code: "if score >= 80\n    print('Pass')", options: ["Missing colon after the condition", "Wrong comparison operator", "String needs double quotes", "Indentation is too deep"], answer: 0, explanation: "Python condition headers must end with a colon." },
  { tag: "Ranges", prompt: "Why is the final item skipped?", code: "items = ['a', 'b', 'c']\nfor i in range(len(items) - 1):\n    print(items[i])", options: ["The list is immutable", "range stops one item early", "print changes the list", "Indices start at one"], answer: 1, explanation: "range(len(items) - 1) stops before the last index. Use range(len(items)) or iterate over items directly." },
  { tag: "Operators", prompt: "Which expression correctly checks equality?", code: "if role = 'admin':\n    grant_access()", options: ["role := 'admin'", "role === 'admin'", "role == 'admin'", "role equals 'admin'"], answer: 2, explanation: "Python uses == for comparison and = for assignment." },
  { tag: "Data types", prompt: "Why can this fail?", code: "age = input('Age: ')\nprint(age + 1)", options: ["input returns a string", "print cannot show numbers", "age is reserved", "The prompt is too short"], answer: 0, explanation: "Convert the input first, for example int(input('Age: '))." },
  { tag: "Indexing", prompt: "Which fix prevents an IndexError?", code: "colors = ['red', 'blue']\nprint(colors[2])", options: ["Use colors[1]", "Use colors(2)", "Add a semicolon", "Reverse the list"], answer: 0, explanation: "A two-item list has indices 0 and 1." },
  { tag: "Dictionaries", prompt: "What is wrong with this dictionary lookup?", code: "user = {'name': 'Mai'}\nprint(user['email'])", options: ["Dictionaries need numeric keys", "The email key does not exist", "print cannot read dictionaries", "Quotes are invalid"], answer: 1, explanation: "Use user.get('email') or ensure the key exists before reading it." },
  { tag: "Indentation", prompt: "Why does this code raise IndentationError?", code: "def greet(name):\nprint('Hi', name)", options: ["The function body is not indented", "greet is a reserved word", "print needs a return", "The parameter is missing"], answer: 0, explanation: "Everything inside a function must be indented, usually by four spaces." },
  { tag: "Scope", prompt: "Why does this print 0 instead of 5?", code: "total = 0\n\ndef add_five():\n    total = 5\n\nadd_five()\nprint(total)", options: ["print runs too early", "The function creates its own local total", "total must be a list", "5 is not an integer"], answer: 1, explanation: "Assigning inside a function creates a local name. Return the value instead of relying on the outer variable." },
  { tag: "Mutation", prompt: "Why does removing items skip some of them?", code: "nums = [1, 2, 3, 4]\nfor n in nums:\n    if n % 2 == 0:\n        nums.remove(n)", options: ["remove needs an index", "The list changes while it is being looped", "% is the wrong operator", "Lists cannot hold integers"], answer: 1, explanation: "Build a new list instead, for example [n for n in nums if n % 2]." },
  { tag: "Comparison", prompt: "Why is this condition never true?", code: "answer = 'yes'\nif answer == 'Yes':\n    print('ok')", options: ["String comparison is case sensitive", "== only works on numbers", "The variable is empty", "if needs elif"], answer: 0, explanation: "Normalise first, for example answer.lower() == 'yes'." },
  { tag: "Division", prompt: "Which line safely divides by a user value?", code: "count = 0\nprint(10 / count)", options: ["Wrap it in a check that count is not zero", "Use 10 // count", "Convert count to a string", "Use round(10 / count)"], answer: 0, explanation: "Dividing by zero raises ZeroDivisionError, so guard the value first." },
  { tag: "Return values", prompt: "Why does the total stay unchanged?", code: "prices = [4, 6]\nsorted(prices)\nprint(prices)", options: ["sorted returns a new list", "prices must be a tuple", "print cannot show lists", "sorted needs a key"], answer: 0, explanation: "Use prices.sort() to sort in place, or assign the result of sorted()." },
  { tag: "String formatting", prompt: "Which line prints Score: 9 correctly?", options: ["print('Score: ' + 9)", "print(f'Score: {score}')", "print('Score: {score}')", "print('Score: ', + score)"], answer: 1, explanation: "An f-string inserts the value; concatenating a number with a string raises TypeError." },
];

const GIT_QUESTIONS: ReviewQuestion[] = [
  { tag: "Repository setup", prompt: "Start a new repository in the current folder.", options: ["git init", "git start", "git create", "git clone ."], answer: 0, explanation: "git init creates a repository in the current directory." },
  { tag: "Branching", prompt: "Create and switch to a branch named feature/login.", options: ["git branch feature/login", "git switch -c feature/login", "git merge feature/login", "git push feature/login"], answer: 1, explanation: "git switch -c creates the branch and checks it out in one step." },
  { tag: "Staging", prompt: "Stage all current changes.", options: ["git add .", "git save .", "git commit .", "git stage --all-only"], answer: 0, explanation: "git add . stages changes under the current directory." },
  { tag: "Committing", prompt: "Record the staged changes with a message.", options: ["git log -m 'Add login'", "git commit -m 'Add login'", "git push -m 'Add login'", "git save 'Add login'"], answer: 1, explanation: "git commit records staged changes in local history." },
  { tag: "Switching", prompt: "Move back to the main branch.", options: ["git switch main", "git move main", "git branch -d main", "git merge main"], answer: 0, explanation: "git switch main changes the current branch." },
  { tag: "Merging", prompt: "Combine feature/login into the current main branch.", options: ["git join feature/login", "git pull feature/login", "git merge feature/login", "git commit feature/login"], answer: 2, explanation: "Run git merge feature/login while main is checked out." },
  { tag: "History", prompt: "Inspect the recent commit history.", options: ["git status", "git log --oneline", "git diff --staged", "git branch -a"], answer: 1, explanation: "git log --oneline gives a compact commit history." },
  { tag: "Undo", prompt: "Safely undo a published commit by creating a new commit.", options: ["git reset --hard", "git revert <commit>", "git delete <commit>", "git clean -fd"], answer: 1, explanation: "git revert preserves shared history and adds an inverse commit." },
  { tag: "Status", prompt: "Check which files are modified but not staged.", options: ["git status", "git config --list", "git remote -v", "git tag"], answer: 0, explanation: "git status lists staged, unstaged and untracked files." },
  { tag: "Remote", prompt: "Send local commits on main to the origin remote.", options: ["git fetch origin main", "git push origin main", "git remote add origin main", "git pull origin main"], answer: 1, explanation: "git push uploads local commits to the remote branch." },
  { tag: "Sync", prompt: "Bring the latest remote commits into your current branch.", options: ["git pull", "git push --force", "git stash pop", "git cherry-pick"], answer: 0, explanation: "git pull fetches and integrates remote commits." },
  { tag: "Stashing", prompt: "Park unfinished changes so you can switch branches cleanly.", options: ["git stash", "git rm --cached", "git reset --soft", "git ignore"], answer: 0, explanation: "git stash stores work in progress and restores a clean tree." },
  { tag: "Diff", prompt: "Review the exact lines you are about to commit.", options: ["git diff --staged", "git log -p HEAD~5", "git blame", "git show-branch"], answer: 0, explanation: "git diff --staged compares the staging area with the last commit." },
  { tag: "Cleanup", prompt: "Delete a merged local branch named feature/login.", options: ["git branch -d feature/login", "git switch -d feature/login", "git reset feature/login", "git revert feature/login"], answer: 0, explanation: "git branch -d removes a branch once its work is merged." },
  { tag: "Ignoring files", prompt: "Stop tracking a secrets file that must stay local.", options: ["Add it to .gitignore and run git rm --cached on it", "Run git clean -x", "Rename the file", "Commit it with a warning message"], answer: 0, explanation: ".gitignore prevents future tracking; git rm --cached removes it from the index." },
];

const CYBER_QUESTIONS: ReviewQuestion[] = [
  { tag: "Phishing", prompt: "A login email asks you to verify your account through an unfamiliar link. What is safest?", options: ["Open it quickly", "Reply with your password", "Visit the official site directly", "Forward it to friends"], answer: 2, explanation: "Open the known official site yourself instead of trusting an unexpected link." },
  { tag: "Passwords", prompt: "Which password is strongest?", options: ["password123", "Mai2009", "Blue-River-7-Lantern!", "12345678"], answer: 2, explanation: "A long, unique passphrase is much harder to guess than a short or reused one." },
  { tag: "App permissions", prompt: "A weather app requests access to all contacts. What should you do?", options: ["Allow every permission", "Deny unnecessary access", "Share the contact list manually", "Disable the lock screen"], answer: 1, explanation: "Grant only the permissions an app genuinely needs for its purpose." },
  { tag: "Account safety", prompt: "What adds protection if a password is stolen?", options: ["Reusing it elsewhere", "Two-factor authentication", "Writing it in chat", "Using a shorter password"], answer: 1, explanation: "A second factor blocks most password-only account takeovers." },
  { tag: "Secrets", prompt: "Which value should never be committed to a public repository?", options: ["README title", "API secret key", "Function name", "CSS class"], answer: 1, explanation: "Secrets belong in protected environment settings, never in source control." },
  { tag: "Least privilege", prompt: "A teammate asks for database access. What is the safest default?", options: ["Give administrator access", "Share your account", "Grant only required permissions", "Turn off access logs"], answer: 2, explanation: "Least privilege limits both accidents and misuse." },
  { tag: "Safe browsing", prompt: "Which web address deserves extra caution?", options: ["A saved school bookmark", "A misspelled login domain", "A verified official domain", "A local project page"], answer: 1, explanation: "Lookalike domains are a common phishing signal." },
  { tag: "Dependencies", prompt: "What should you do before installing an unknown package?", options: ["Run it as administrator", "Review its source, owner, and reputation", "Turn off antivirus", "Paste secrets into its setup"], answer: 1, explanation: "Check provenance, maintenance, and permissions before trusting a dependency." },
  { tag: "Public networks", prompt: "You must check grades on free airport wi-fi. What is safest?", options: ["Use a trusted VPN or mobile data", "Disable the screen lock", "Share the network password", "Turn off site certificates"], answer: 0, explanation: "Untrusted networks can observe traffic, so tunnel it or use your own connection." },
  { tag: "Updates", prompt: "Your laptop offers a security update before an exam week. What is best?", options: ["Install it promptly", "Postpone it for months", "Uninstall the browser", "Disable update checks"], answer: 0, explanation: "Updates close known holes that attackers already use." },
  { tag: "Backups", prompt: "How do you best protect coursework against ransomware or a broken drive?", options: ["Keep one copy on the laptop", "Keep regular backups in a second location", "Email files to yourself once", "Rename files weekly"], answer: 1, explanation: "A separate, recent backup is the reliable recovery path." },
  { tag: "Data sharing", prompt: "A form asks for your ID number to enter a prize draw. What should you do?", options: ["Provide it immediately", "Share only what the service genuinely needs", "Post it publicly", "Send a photo of your ID"], answer: 1, explanation: "Share the minimum data required; extra personal data raises the risk of misuse." },
  { tag: "Two-factor codes", prompt: "Someone calls claiming to be support and asks for your one-time code. What now?", options: ["Read the code aloud", "Never share it and end the call", "Send it by message", "Turn off two-factor login"], answer: 1, explanation: "One-time codes are secrets; real support never asks for them." },
  { tag: "Web security", prompt: "Which practice keeps a school web form safer?", options: ["Trusting all user input", "Validating input on the server too", "Storing passwords as plain text", "Logging passwords for support"], answer: 1, explanation: "Server-side validation and hashed passwords are basic defensive habits." },
  { tag: "Device safety", prompt: "You leave a shared computer lab for lunch. What should you do first?", options: ["Lock the screen and sign out", "Leave the session open", "Save the password in the browser", "Disable the antivirus"], answer: 0, explanation: "Signing out prevents anyone from using your active session." },
];

const BIGO_QUESTIONS: ReviewQuestion[] = [
  { tag: "Constant time", prompt: "What is the time complexity?", code: "def first(items):\n    return items[0]", options: ["O(1)", "O(n)", "O(n log n)", "O(n^2)"], answer: 0, explanation: "Reading one index takes the same time no matter how long the list is." },
  { tag: "Linear scan", prompt: "What is the time complexity?", code: "def total(items):\n    result = 0\n    for value in items:\n        result += value\n    return result", options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"], answer: 2, explanation: "Every item is visited exactly once." },
  { tag: "Nested loops", prompt: "What is the time complexity?", code: "for a in items:\n    for b in items:\n        compare(a, b)", options: ["O(n)", "O(n log n)", "O(n^2)", "O(2^n)"], answer: 2, explanation: "Each of the n items is paired with all n items." },
  { tag: "Binary search", prompt: "What is the time complexity of binary search on a sorted list?", options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"], answer: 1, explanation: "Each step halves the remaining range." },
  { tag: "Sorting", prompt: "What is the typical time complexity of Python's sorted()?", options: ["O(n)", "O(n log n)", "O(n^2)", "O(1)"], answer: 1, explanation: "Comparison sorts such as Timsort run in O(n log n) on average." },
  { tag: "Dictionary lookup", prompt: "What is the average complexity of checking a key in a dict?", code: "if user_id in users:\n    print('found')", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], answer: 0, explanation: "Hash lookups are constant time on average." },
  { tag: "List membership", prompt: "What is the complexity of checking membership in a list?", code: "if user_id in id_list:\n    print('found')", options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"], answer: 2, explanation: "A list must be scanned item by item, unlike a set or dict." },
  { tag: "Space complexity", prompt: "How much extra space does this use?", code: "def double(items):\n    return [x * 2 for x in items]", options: ["O(1)", "O(n)", "O(n^2)", "O(log n)"], answer: 1, explanation: "A new list of the same length is created." },
  { tag: "Halving loops", prompt: "What is the time complexity?", code: "n = len(items)\nwhile n > 1:\n    n = n // 2", options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"], answer: 1, explanation: "The counter halves each round, so the loop runs about log2(n) times." },
  { tag: "Triangular loops", prompt: "What is the time complexity?", code: "for i in range(len(items)):\n    for j in range(i):\n        compare(items[i], items[j])", options: ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"], answer: 2, explanation: "About n^2 / 2 comparisons still grows as O(n^2)." },
  { tag: "Append cost", prompt: "What is the amortised complexity of list.append()?", options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"], answer: 0, explanation: "Appending is constant time on average, unlike inserting at the front." },
  { tag: "Choosing structures", prompt: "You must test membership of 100000 ids many times. What is best?", options: ["A list", "A set", "A string", "A tuple"], answer: 1, explanation: "Sets give O(1) average lookups; lists and tuples need a full scan." },
];

const TERMINAL_QUESTIONS: ReviewQuestion[] = [
  { tag: "Navigation", prompt: "Move into a folder named project.", options: ["cd project", "mv project", "ls project", "open -dir project"], answer: 0, explanation: "cd changes the working directory." },
  { tag: "Listing files", prompt: "List files including hidden ones.", options: ["ls -a", "ls -x", "dir --hidden", "cat -a"], answer: 0, explanation: "ls -a shows entries starting with a dot." },
  { tag: "Current path", prompt: "Show which folder you are currently in.", options: ["pwd", "path", "whoami", "cd ~"], answer: 0, explanation: "pwd prints the working directory." },
  { tag: "Reading files", prompt: "Print the contents of notes.txt to the screen.", options: ["cat notes.txt", "run notes.txt", "touch notes.txt", "cd notes.txt"], answer: 0, explanation: "cat writes a file to standard output." },
  { tag: "Creating folders", prompt: "Create a new folder named data.", options: ["mkdir data", "touch data", "newdir data", "cp data"], answer: 0, explanation: "mkdir makes a directory." },
  { tag: "Copying", prompt: "Copy report.csv into the data folder.", options: ["cp report.csv data/", "mv report.csv data/", "cat report.csv data/", "ln report.csv"], answer: 0, explanation: "cp copies; mv would move the original." },
  { tag: "Renaming", prompt: "Rename old.py to main.py.", options: ["mv old.py main.py", "cp old.py main.py", "rename main.py", "touch main.py"], answer: 0, explanation: "mv both moves and renames files." },
  { tag: "Searching text", prompt: "Find every line containing TODO inside app.py.", options: ["grep TODO app.py", "find TODO app.py", "cat TODO app.py", "wc TODO app.py"], answer: 0, explanation: "grep searches file contents for a pattern." },
  { tag: "Python packages", prompt: "Install the requests library for a Python project.", options: ["pip install requests", "python requests", "install requests.py", "apt requests"], answer: 0, explanation: "pip installs Python packages from the package index." },
  { tag: "Running scripts", prompt: "Run a Python file named main.py.", options: ["python main.py", "run main.py", "main.py start", "exec python"], answer: 0, explanation: "Pass the file to the Python interpreter." },
  { tag: "Permissions", prompt: "Make a shell script executable.", options: ["chmod +x setup.sh", "chown +x setup.sh", "chmod 000 setup.sh", "sudo setup.sh"], answer: 0, explanation: "chmod +x adds the execute permission." },
  { tag: "Stopping a process", prompt: "Stop a program that is running in your terminal.", options: ["Press Ctrl + C", "Press Ctrl + S", "Type stop", "Close the folder"], answer: 0, explanation: "Ctrl + C sends an interrupt to the running process." },
  { tag: "Command help", prompt: "Read the documentation for the ls command.", options: ["man ls", "ls --explain", "help(ls)", "info ls --raw"], answer: 0, explanation: "man opens the manual page for a command." },
  { tag: "Deleting safely", prompt: "Remove an empty folder named temp.", options: ["rmdir temp", "rm -rf /", "del temp", "mv temp"], answer: 0, explanation: "rmdir removes empty folders; rm -rf on a wrong path is destructive." },
];

const DATATYPE_QUESTIONS: ReviewQuestion[] = [
  { tag: "Integer", prompt: "What type does Python give this value?", code: "value = 42", options: ["int", "float", "str", "bool"], answer: 0, explanation: "Whole numbers without a decimal point are int." },
  { tag: "Float", prompt: "What type does Python give this value?", code: "value = 3.5", options: ["int", "float", "str", "list"], answer: 1, explanation: "A decimal point creates a float." },
  { tag: "String", prompt: "What type does Python give this value?", code: "value = '7'", options: ["int", "float", "str", "bool"], answer: 2, explanation: "Quotes always create a string, even around digits." },
  { tag: "Boolean", prompt: "What type is the result of this expression?", code: "value = 5 > 2", options: ["int", "bool", "str", "None"], answer: 1, explanation: "Comparisons return True or False, which are bool." },
  { tag: "List", prompt: "What type does Python give this value?", code: "value = [1, 2, 3]", options: ["list", "tuple", "set", "dict"], answer: 0, explanation: "Square brackets create a mutable list." },
  { tag: "Dictionary", prompt: "What type does Python give this value?", code: "value = {'name': 'Mai'}", options: ["set", "dict", "list", "tuple"], answer: 1, explanation: "Key-value pairs in braces create a dict." },
  { tag: "Tuple", prompt: "What type does Python give this value?", code: "value = (2, 4)", options: ["list", "tuple", "dict", "range"], answer: 1, explanation: "Parentheses with commas create an immutable tuple." },
  { tag: "Set", prompt: "What type does Python give this value?", code: "value = {2, 4, 6}", options: ["dict", "set", "list", "frozenset"], answer: 1, explanation: "Braces without key-value pairs create a set of unique items." },
  { tag: "Division result", prompt: "What type does this expression produce?", code: "value = 10 / 2", options: ["int", "float", "str", "bool"], answer: 1, explanation: "True division always returns a float, even for exact results." },
  { tag: "Floor division", prompt: "What type does this expression produce?", code: "value = 10 // 3", options: ["int", "float", "str", "bool"], answer: 0, explanation: "Floor division of two ints returns an int." },
  { tag: "Concatenation", prompt: "What type does this expression produce?", code: "value = 'score: ' + str(9)", options: ["str", "int", "list", "bool"], answer: 0, explanation: "Joining strings returns a string." },
  { tag: "None", prompt: "What does a function without a return statement give back?", code: "def log(message):\n    print(message)\n\nvalue = log('hi')", options: ["None", "0", "''", "False"], answer: 0, explanation: "Python returns None when no value is returned." },
  { tag: "Input", prompt: "What type does input() always return?", options: ["str", "int", "float", "bool"], answer: 0, explanation: "input() returns text; convert it with int() or float() when needed." },
  { tag: "Length", prompt: "What type does len() return?", options: ["int", "float", "str", "list"], answer: 0, explanation: "len() returns a whole number of items." },
];

const PROMPT_QUESTIONS: ReviewQuestion[] = [
  { tag: "Clear goal", prompt: "Which prompt states the task most clearly?", options: ["Do something with my data", "Summarise this sales table in three bullet points", "Data?", "Help fast please"], answer: 1, explanation: "A clear verb plus a concrete outcome removes guesswork." },
  { tag: "Context", prompt: "You want feedback on an IELTS essay. What should you include?", options: ["Only the word count", "The essay, the task type, and your target band", "Just the topic name", "A request to be nice"], answer: 1, explanation: "Context lets the model judge against the right standard." },
  { tag: "Output format", prompt: "Which instruction produces the most usable output?", options: ["Write about it", "Return a table with columns Term, Meaning, Example", "Be creative", "Answer somehow"], answer: 1, explanation: "Naming the exact structure makes the answer easy to reuse." },
  { tag: "Audience", prompt: "You are writing for beginner students. What should the prompt say?", options: ["Use expert jargon", "Explain in simple language for a 12-year-old beginner", "Keep it vague", "Add as much theory as possible"], answer: 1, explanation: "Stating the audience controls vocabulary and depth." },
  { tag: "Constraints", prompt: "Which prompt best controls length and tone?", options: ["Write something short-ish", "Write 120 words in a friendly, encouraging tone", "Write a lot", "Any length is fine"], answer: 1, explanation: "Measurable limits are easier to follow than vague hints." },
  { tag: "Examples", prompt: "How can you make the model match your preferred style?", options: ["Give one or two example answers to imitate", "Ask it to guess your style", "Use fewer words", "Repeat the request twice"], answer: 0, explanation: "Few-shot examples show the pattern you expect." },
  { tag: "Step by step", prompt: "For a multi-step maths explanation, what helps most?", options: ["Ask for the final answer only", "Ask for the reasoning steps, then the answer", "Ask for a single number", "Ask for a poem"], answer: 1, explanation: "Requesting intermediate steps makes reasoning checkable." },
  { tag: "Role", prompt: "Which role instruction is most useful for exam feedback?", options: ["Act as an IELTS examiner using the official band criteria", "Act as a robot", "Act as anyone", "No role at all"], answer: 0, explanation: "A specific expert role focuses the criteria used." },
  { tag: "Verification", prompt: "The model gives a confident but suspicious statistic. What next?", options: ["Publish it immediately", "Ask for sources and verify them yourself", "Ask the same question louder", "Delete the chat"], answer: 1, explanation: "Always verify facts; models can state wrong details confidently." },
  { tag: "Iteration", prompt: "The first answer is close but too long. What is the best follow-up?", options: ["Start a brand new chat with no context", "Ask it to cut the answer to 100 words and keep the examples", "Say it is bad", "Repeat the original prompt"], answer: 1, explanation: "Targeted refinement keeps what worked and fixes only the gap." },
  { tag: "Privacy", prompt: "Which detail should stay out of an AI prompt?", options: ["A public lesson title", "Classmates' phone numbers and ID numbers", "A grammar question", "A vocabulary list"], answer: 1, explanation: "Never paste other people's personal data into a prompt." },
  { tag: "Honest use", prompt: "What is a responsible way to use AI for homework?", options: ["Submit the output as your own work", "Use it to explain concepts, then write your own answer", "Ask it to impersonate your teacher", "Hide that you used it when asked"], answer: 1, explanation: "AI works best as a tutor for understanding, not as a substitute for your work." },
];

/** Shared results screen for every review mission. */
function Results({ xp, maxXp, detail, best, isRecord, newBadges, wrong, onRetry }: {
  xp: number;
  maxXp: number;
  detail: string;
  best: number;
  isRecord: boolean;
  newBadges: ArcadeBadge[];
  wrong: ReviewQuestion[];
  onRetry: () => void;
}) {
  const { t, lang } = useLanguage();
  const reduced = usePrefersReducedMotion();
  const percent = maxXp > 0 ? Math.round((xp / maxXp) * 100) : 0;
  return (
    <div className="arcade-game-panel p-5 sm:p-6">
      <motion.div
        initial={reduced ? undefined : { opacity: 0, scale: 0.94 }}
        animate={reduced ? undefined : { opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-3 text-center"
      >
        <Trophy className="h-12 w-12 text-[hsl(var(--arcade-gold))]" />
        <h2 className="font-display text-2xl font-bold text-[hsl(var(--arcade-text))]">{t("Hoàn thành nhiệm vụ", "Mission complete")}</h2>
        <p className="text-lg font-bold text-[hsl(var(--arcade-gold))]">{xp} / {maxXp} XP ({percent}%)</p>
        <p className="text-sm text-[hsl(var(--arcade-muted))]">{detail}</p>
        <p className="text-sm text-[hsl(var(--arcade-muted))]">
          {t("Kỷ lục cá nhân", "Personal best")}: <span className="font-bold text-[hsl(var(--arcade-text))]">{Math.max(best, xp)} XP</span>
        </p>
        {isRecord && (
          <div className="arcade-meta text-[hsl(var(--arcade-green))]">
            <Sparkles className="h-4 w-4" /> {t("Kỷ lục mới!", "New record!")}
          </div>
        )}
      </motion.div>

      {newBadges.length > 0 && (
        <div className="mt-5 rounded-md border border-[hsl(var(--arcade-gold)/0.4)] bg-[hsl(var(--arcade-gold)/0.08)] p-4">
          <p className="mb-2 text-sm font-bold text-[hsl(var(--arcade-gold))]">{t("Huy hiệu mới mở khóa", "New badges unlocked")}</p>
          <div className="flex flex-wrap gap-2">
            {newBadges.map((badge) => (
              <span key={badge.id} className="arcade-meta text-[hsl(var(--arcade-text))]">
                <span aria-hidden>{badge.emoji}</span> {language === "vi" ? badge.vi : badge.en}
              </span>
            ))}
          </div>
        </div>
      )}

      {wrong.length > 0 && (
        <div className="mt-5 rounded-md border border-[hsl(var(--arcade-line))] bg-[hsl(var(--arcade-panel))] p-4">
          <p className="mb-3 text-sm font-bold text-[hsl(var(--arcade-text))]">{t("Ôn lại các câu chưa đúng", "Review the missed questions")}</p>
          <ul className="space-y-3">
            {wrong.map((question, index) => (
              <li key={`${question.prompt}-${index}`} className="text-sm text-[hsl(var(--arcade-muted))]">
                <span className="arcade-skill mr-2 inline-block">{question.tag}</span>
                <span className="text-[hsl(var(--arcade-text))]">{question.prompt}</span>
                <br />
                <span className="text-[hsl(var(--arcade-green))]">✔ {question.options[question.answer]}</span>
                <br />
                <span>{question.explanation}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <Button onClick={onRetry} className="min-h-11 bg-[hsl(var(--arcade-blue))] text-[hsl(var(--arcade-canvas))] hover:bg-[hsl(var(--arcade-blue)/0.9)]">
          <RotateCcw className="h-4 w-4" /> {t("Chơi lại", "Play again")}
        </Button>
      </div>
    </div>
  );
}

interface ReviewGameProps extends GameProps {
  title: string;
  gameType: string;
  questions: ReviewQuestion[];
  icon: React.ReactNode;
  accent?: "blue" | "green" | "gold" | "pink";
  extra?: React.ReactNode;
  defaultMode?: Mode;
}

function ReviewGame({ title, gameType, questions: bank, icon, onScore, accent = "blue", extra, defaultMode, totalGames = 12, onRunSaved }: ReviewGameProps) {
  const { t } = useLanguage();
  const reduced = usePrefersReducedMotion();
  const [mode, setMode] = useState<Mode | null>(null);
  const [run, setRun] = useState<ReviewQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [xp, setXp] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [timedOut, setTimedOut] = useState(false);
  const [eliminated, setEliminated] = useState<number[]>([]);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [wrong, setWrong] = useState<ReviewQuestion[]>([]);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [saved, setSaved] = useState<{ best: number; isRecord: boolean; badges: ArcadeBadge[] } | null>(null);
  const savedRef = useRef(false);

  const done = mode !== null && run.length > 0 && index >= run.length;
  const question = run[index];
  const perRun = Math.min(QUESTIONS_PER_RUN, bank.length);
  const maxXp = perRun * XP_PER_ANSWER + (perRun - 1) * COMBO_BONUS;

  const start = useCallback((chosen: Mode) => {
    savedRef.current = false;
    setSaved(null);
    setMode(chosen);
    setRun(sampleQuestions(bank, QUESTIONS_PER_RUN));
    setIndex(0);
    setCorrect(0);
    setXp(0);
    setCombo(0);
    setBestCombo(0);
    setPicked(null);
    setTimedOut(false);
    setEliminated([]);
    setHintsUsed(0);
    setWrong([]);
    setSecondsLeft(MODE_SECONDS[chosen]);
  }, [bank]);

  useEffect(() => {
    if (defaultMode && mode === null) start(defaultMode);
  }, [defaultMode, mode, start]);

  const miss = useCallback((byTimeout: boolean) => {
    setCombo(0);
    setTimedOut(byTimeout);
    if (question) setWrong((list) => [...list, question]);
    playArcadeCue(byTimeout ? "timeout" : "wrong");
  }, [question]);

  // Per-question countdown for normal and hard modes
  useEffect(() => {
    if (!mode || done || picked !== null || MODE_SECONDS[mode] === null) return;
    const timer = window.setInterval(() => {
      setSecondsLeft((value) => {
        if (value === null) return value;
        if (value <= 1) {
          window.clearInterval(timer);
          setPicked(-1);
          miss(true);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [done, index, miss, mode, picked]);

  // Save the finished run exactly once
  useEffect(() => {
    if (!done || savedRef.current) return;
    savedRef.current = true;
    const accuracy = run.length ? Math.round((correct / run.length) * 100) : 0;
    void finishGame({ gameType, score: xp, accuracy });
    const result = recordArcadeRun(gameType, xp, correct === run.length, totalGames);
    setSaved({ best: result.previousBest, isRecord: result.isRecord, badges: result.newBadges });
    if (result.newBadges.length > 0) playArcadeCue("badge");
    else if (result.isRecord) playArcadeCue("levelup");
    onRunSaved?.();
  }, [correct, done, gameType, onRunSaved, run.length, totalGames, xp]);

  const choose = (choice: number) => {
    if (picked !== null || !question) return;
    setPicked(choice);
    if (choice === question.answer) {
      const bonus = combo * COMBO_BONUS;
      const gained = XP_PER_ANSWER + bonus;
      setCorrect((value) => value + 1);
      setXp((value) => value + gained);
      setCombo((value) => {
        const next = value + 1;
        setBestCombo((high) => Math.max(high, next));
        return next;
      });
      onScore?.(gained);
      playArcadeCue("correct");
    } else {
      miss(false);
    }
  };

  const useHint = () => {
    if (!question || picked !== null || hintsUsed >= MAX_HINTS) return;
    const candidates = question.options
      .map((_, optionIndex) => optionIndex)
      .filter((optionIndex) => optionIndex !== question.answer && !eliminated.includes(optionIndex));
    if (candidates.length === 0) return;
    setEliminated((list) => [...list, candidates[Math.floor(Math.random() * candidates.length)]]);
    setHintsUsed((value) => value + 1);
    setXp((value) => Math.max(0, value - HINT_COST));
  };

  const next = () => {
    setPicked(null);
    setTimedOut(false);
    setEliminated([]);
    setIndex((value) => value + 1);
    if (mode) setSecondsLeft(MODE_SECONDS[mode]);
  };

  if (mode === null) {
    const modes: { id: Mode; label: string; hint: string }[] = [
      { id: "easy", label: t("Dễ", "Easy"), hint: t("Không giới hạn thời gian", "No timer") },
      { id: "normal", label: t("Thường", "Normal"), hint: t("25 giây mỗi câu", "25 seconds per question") },
      { id: "hard", label: t("Khó", "Hard"), hint: t("12 giây mỗi câu", "12 seconds per question") },
    ];
    return (
      <div className={`arcade-game-panel arcade-mission--${accent} p-5 sm:p-6`}>
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span className="arcade-icon">{icon}</span>
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-xl font-bold text-[hsl(var(--arcade-text))] sm:text-2xl">{title}</h2>
            <p className="text-sm text-[hsl(var(--arcade-muted))]">
              {t(`${perRun} câu ngẫu nhiên từ ngân hàng ${bank.length} câu`, `${perRun} random questions from a bank of ${bank.length}`)}
            </p>
          </div>
        </div>
        <p className="mb-4 text-sm text-[hsl(var(--arcade-muted))]">
          {t("Chọn mức độ. Trả lời đúng liên tiếp sẽ được cộng thêm điểm chuỗi.", "Choose a level. Correct answers in a row earn combo bonus XP.")}
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {modes.map((item) => (
            <Button key={item.id} onClick={() => start(item.id)} variant="outline" className="min-h-16 h-auto flex-col items-start gap-1 border-[hsl(var(--arcade-line))] bg-[hsl(var(--arcade-panel))] px-4 py-3 text-left text-[hsl(var(--arcade-text))] hover:border-[hsl(var(--arcade-blue)/0.7)]">
              <span className="font-bold">{item.label}</span>
              <span className="text-xs text-[hsl(var(--arcade-muted))]">{item.hint}</span>
            </Button>
          ))}
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <Results
        xp={xp}
        maxXp={maxXp}
        detail={t(
          `Đúng ${correct}/${run.length} câu · chuỗi dài nhất ${bestCombo}`,
          `${correct} of ${run.length} correct · best streak ${bestCombo}`,
        )}
        best={saved?.best ?? 0}
        isRecord={saved?.isRecord ?? false}
        newBadges={saved?.badges ?? []}
        wrong={wrong}
        onRetry={() => setMode(defaultMode ?? null)}
      />
    );
  }

  if (!question) return null;

  const answered = picked !== null;
  const isCorrect = picked === question.answer;
  const limit = MODE_SECONDS[mode];

  return (
    <motion.div
      animate={!reduced && answered && !isCorrect ? { x: [-6, 6, -4, 4, 0] } : undefined}
      transition={{ duration: 0.3 }}
      className={`arcade-game-panel arcade-mission--${accent} p-4 sm:p-6`}
    >
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <span className="arcade-icon">{icon}</span>
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-xl font-bold text-[hsl(var(--arcade-text))] sm:text-2xl">{title}</h2>
          <p className="text-sm text-[hsl(var(--arcade-muted))]">{t(`Câu ${index + 1} / ${run.length}`, `Question ${index + 1} of ${run.length}`)}</p>
        </div>
        {combo >= 2 && (
          <span className="arcade-meta text-[hsl(var(--arcade-green))]"><Flame className="h-4 w-4" />{t(`Chuỗi ${combo}`, `Streak ${combo}`)}</span>
        )}
        {limit !== null && (
          <span className={`arcade-meta ${secondsLeft !== null && secondsLeft <= 5 ? "text-destructive" : "text-[hsl(var(--arcade-muted))]"}`}>
            <Timer className="h-4 w-4" />{secondsLeft ?? limit}s
          </span>
        )}
        <span className="arcade-meta text-[hsl(var(--arcade-gold))]">{xp} XP</span>
      </div>
      <Progress value={(index / run.length) * 100} className="mb-6 h-2 bg-[hsl(var(--arcade-line))]" />
      {extra}
      <div className="arcade-skill mb-3">{question.tag}</div>
      <p className="mb-4 text-base font-semibold text-[hsl(var(--arcade-text))] sm:text-lg">{question.prompt}</p>
      {question.code && <div className="arcade-terminal mb-4 overflow-x-auto whitespace-pre-wrap font-mono text-sm text-[hsl(var(--arcade-green))]">{question.code}</div>}
      <div className="grid gap-3 sm:grid-cols-2">
        {question.options.map((option, optionIndex) => {
          const isAnswer = optionIndex === question.answer;
          const selected = optionIndex === picked;
          const removed = eliminated.includes(optionIndex);
          const state = answered && isAnswer
            ? "border-[hsl(var(--arcade-green))] bg-[hsl(var(--arcade-green)/0.13)]"
            : answered && selected
              ? "border-destructive bg-destructive/10"
              : "border-[hsl(var(--arcade-line))] bg-[hsl(var(--arcade-panel))] hover:border-[hsl(var(--arcade-blue)/0.7)]";
          return (
            <Button
              key={option}
              variant="outline"
              disabled={answered || removed}
              onClick={() => choose(optionIndex)}
              className={`min-h-14 h-auto justify-start whitespace-normal px-4 py-3 text-left text-[hsl(var(--arcade-text))] disabled:opacity-100 ${removed ? "border-dashed border-[hsl(var(--arcade-line))] bg-transparent line-through opacity-45" : state}`}
            >
              {option}
            </Button>
          );
        })}
      </div>

      {!answered && (
        <Button
          variant="ghost"
          onClick={useHint}
          disabled={hintsUsed >= MAX_HINTS}
          className="mt-4 min-h-11 text-[hsl(var(--arcade-gold))] hover:bg-[hsl(var(--arcade-gold)/0.12)] hover:text-[hsl(var(--arcade-gold))]"
        >
          <Lightbulb className="h-4 w-4" />
          {t(`Gợi ý (-${HINT_COST} XP) · còn ${MAX_HINTS - hintsUsed}`, `Hint (-${HINT_COST} XP) · ${MAX_HINTS - hintsUsed} left`)}
        </Button>
      )}

      {answered && (
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 8 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          className={`mt-5 rounded-md border p-4 ${isCorrect ? "border-[hsl(var(--arcade-green)/0.45)] bg-[hsl(var(--arcade-green)/0.08)]" : "border-destructive/40 bg-destructive/10"}`}
          aria-live="polite"
        >
          <div className="flex items-start gap-2 text-sm text-[hsl(var(--arcade-text))]">
            {isCorrect ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--arcade-green))]" /> : <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />}
            <div>
              {timedOut && <p className="mb-1 font-bold">{t("Hết thời gian", "Time is up")}</p>}
              <p>{question.explanation}</p>
            </div>
          </div>
          <Button onClick={next} className="mt-4 min-h-11 bg-[hsl(var(--arcade-blue))] text-[hsl(var(--arcade-canvas))] hover:bg-[hsl(var(--arcade-blue)/0.9)]">
            {t("Câu tiếp theo", "Next challenge")}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}

export function BugHunter(props: GameProps) {
  return <ReviewGame title="Bug Hunter" gameType="prog_bug_hunter" questions={BUG_QUESTIONS} icon={<Bug className="h-6 w-6" />} accent="pink" {...props} />;
}

export function GitBranchQuest(props: GameProps) {
  const graph = (
    <div className="arcade-terminal mb-5 overflow-hidden" aria-hidden>
      <div className="flex items-center gap-2 text-xs text-[hsl(var(--arcade-muted))]"><span className="h-3 w-3 rounded-full bg-[hsl(var(--arcade-blue))]" /><span>main</span><span className="h-px flex-1 bg-[hsl(var(--arcade-blue)/0.45)]" /><span className="h-3 w-3 rounded-full bg-[hsl(var(--arcade-blue))]" /></div>
      <div className="ml-8 mt-2 flex items-center gap-2 text-xs text-[hsl(var(--arcade-green))]"><GitBranch className="h-4 w-4" /><span>feature/login</span><span className="h-px flex-1 bg-[hsl(var(--arcade-green)/0.45)]" /></div>
    </div>
  );
  return <ReviewGame title="Git Branch Quest" gameType="prog_git_branch_quest" questions={GIT_QUESTIONS} icon={<GitBranch className="h-6 w-6" />} accent="green" extra={graph} {...props} />;
}

export function CyberShield(props: GameProps) {
  return <ReviewGame title="Cyber Shield" gameType="prog_cyber_shield" questions={CYBER_QUESTIONS} icon={<ShieldCheck className="h-6 w-6" />} accent="gold" {...props} />;
}

export function BigODetective(props: GameProps) {
  return <ReviewGame title="Big-O Detective" gameType="prog_bigo_detective" questions={BIGO_QUESTIONS} icon={<Binary className="h-6 w-6" />} accent="blue" {...props} />;
}

export function TerminalRescue(props: GameProps) {
  return <ReviewGame title="Terminal Rescue" gameType="prog_terminal_rescue" questions={TERMINAL_QUESTIONS} icon={<Terminal className="h-6 w-6" />} accent="green" {...props} />;
}

export function DataTypeSorter(props: GameProps) {
  return <ReviewGame title="Data Type Sorter" gameType="prog_data_type_sorter" questions={DATATYPE_QUESTIONS} icon={<Sparkles className="h-6 w-6" />} accent="pink" defaultMode="hard" {...props} />;
}

export function PromptArchitect(props: GameProps) {
  return <ReviewGame title="Prompt Architect" gameType="prog_prompt_architect" questions={PROMPT_QUESTIONS} icon={<Wand2 className="h-6 w-6" />} accent="gold" {...props} />;
}

/** Speed score for one snippet: fastest finish is capped at MAX_SNIPPET_XP. */
const scoreFor = (seconds: number) => Math.max(20, Math.min(MAX_SNIPPET_XP, Math.round(120 - seconds)));

export function PythonSpeedRun({ onScore, totalGames = 12, onRunSaved }: GameProps) {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [finishedAt, setFinishedAt] = useState<number | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [accuracySum, setAccuracySum] = useState(0);
  const [clock, setClock] = useState(0);
  const [saved, setSaved] = useState<{ best: number; isRecord: boolean; badges: ArcadeBadge[] } | null>(null);
  const savedRef = useRef(false);
  const snippet = PYTHON_SNIPPETS[index];
  const complete = index >= PYTHON_SNIPPETS.length;
  const maxXp = PYTHON_SNIPPETS.length * MAX_SNIPPET_XP;
  const runAccuracy = index > 0 ? Math.round(accuracySum / index) : 0;

  useEffect(() => {
    if (!startedAt || finishedAt) return;
    const timer = window.setInterval(() => setClock(Date.now()), 250);
    return () => window.clearInterval(timer);
  }, [finishedAt, startedAt]);

  useEffect(() => {
    if (!complete || savedRef.current) return;
    savedRef.current = true;
    void finishGame({ gameType: "prog_python_speed_run", score: totalScore, accuracy: runAccuracy });
    const result = recordArcadeRun("prog_python_speed_run", totalScore, runAccuracy === 100, totalGames);
    setSaved({ best: result.previousBest, isRecord: result.isRecord, badges: result.newBadges });
    if (result.newBadges.length > 0) playArcadeCue("badge");
    else if (result.isRecord) playArcadeCue("levelup");
    onRunSaved?.();
  }, [complete, onRunSaved, runAccuracy, totalGames, totalScore]);

  const elapsed = startedAt ? ((finishedAt ?? (clock || Date.now())) - startedAt) / 1000 : 0;
  const correctChars = snippet ? [...typed].filter((char, i) => char === snippet[i]).length : 0;
  const accuracy = typed.length ? Math.round((correctChars / typed.length) * 100) : 100;
  const charsPerSecond = elapsed > 0 ? (correctChars / elapsed).toFixed(1) : "0.0";

  const type = (value: string) => {
    if (!startedAt) setStartedAt(Date.now());
    setTyped(value);
    if (value === snippet) {
      const end = Date.now();
      const seconds = Math.max(1, (end - (startedAt ?? end)) / 1000);
      const points = scoreFor(seconds);
      setFinishedAt(end);
      setTotalScore((score) => score + points);
      setAccuracySum((sum) => sum + (typed.length ? accuracy : 100));
      onScore?.(points);
      playArcadeCue("correct");
    }
  };

  const next = () => {
    setIndex((value) => value + 1);
    setTyped("");
    setStartedAt(null);
    setFinishedAt(null);
    setClock(0);
  };

  const reset = () => {
    savedRef.current = false;
    setSaved(null);
    setIndex(0);
    setTyped("");
    setStartedAt(null);
    setFinishedAt(null);
    setTotalScore(0);
    setAccuracySum(0);
    setClock(0);
  };

  if (complete) {
    return (
      <Results
        xp={totalScore}
        maxXp={maxXp}
        detail={t(`Độ chính xác trung bình ${runAccuracy}%`, `Average accuracy ${runAccuracy}%`)}
        best={saved?.best ?? 0}
        isRecord={saved?.isRecord ?? false}
        newBadges={saved?.badges ?? []}
        wrong={[]}
        onRetry={reset}
      />
    );
  }

  return (
    <div className="arcade-game-panel p-4 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <span className="arcade-icon"><Keyboard className="h-6 w-6" /></span>
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-xl font-bold text-[hsl(var(--arcade-text))] sm:text-2xl">Python Speed Run</h2>
          <p className="text-sm text-[hsl(var(--arcade-muted))]">{t(`Đoạn ${index + 1} / ${PYTHON_SNIPPETS.length}`, `Snippet ${index + 1} of ${PYTHON_SNIPPETS.length}`)}</p>
        </div>
        <span className="arcade-meta"><Timer className="h-4 w-4" />{elapsed.toFixed(1)}s</span>
        <span className="arcade-meta text-[hsl(var(--arcade-gold))]">{totalScore} XP</span>
      </div>
      <Progress value={(index / PYTHON_SNIPPETS.length) * 100} className="mb-6 h-2 bg-[hsl(var(--arcade-line))]" />
      <p className="mb-3 text-sm text-[hsl(var(--arcade-muted))]">
        {t("Gõ lại đoạn code Python thật chính xác. Chữ hoa, khoảng trắng và dấu xuống dòng đều quan trọng.", "Retype the Python code exactly. Capital letters, spaces, and line breaks matter.")}
      </p>
      <div className="arcade-terminal mb-4 overflow-x-auto whitespace-pre-wrap font-mono text-sm leading-6 text-[hsl(var(--arcade-green))]">{snippet}</div>
      <Textarea value={typed} onChange={(event) => type(event.target.value)} disabled={finishedAt !== null} spellCheck={false} autoCapitalize="off" autoCorrect="off" aria-label={t("Gõ lại đoạn code Python", "Type the Python snippet")} className="min-h-36 border-[hsl(var(--arcade-line))] bg-[hsl(var(--arcade-canvas))] font-mono text-[hsl(var(--arcade-text))]" />
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm text-[hsl(var(--arcade-muted))]">
        <span>{t("Độ chính xác", "Accuracy")}: {accuracy}% · {t("Ký tự đúng mỗi giây", "Correct chars per second")}: {charsPerSecond}</span>
        {finishedAt && (
          <Button onClick={next} className="min-h-11 bg-[hsl(var(--arcade-green))] text-[hsl(var(--arcade-canvas))] hover:bg-[hsl(var(--arcade-green)/0.9)]">
            {t("Đoạn tiếp theo", "Next snippet")}
          </Button>
        )}
      </div>
    </div>
  );
}
