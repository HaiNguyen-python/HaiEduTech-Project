"""Shared helpers for building src/data/pythonChallenges.ts from the spec files.

Run:  python3 scripts/python_challenges/build.py
Every reference answer is executed with the same harness the browser uses
(src/lib/pythonChallengeHarness.ts) and must pass all of its own tests.
"""
import json, os, re, shutil, tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
HARNESS_TS = os.path.join(ROOT, "src/lib/pythonChallengeHarness.ts")

_src = open(HARNESS_TS, encoding="utf-8").read()
_py = re.search(r"PY_HARNESS = String\.raw`(.*?)`;", _src, re.S).group(1)
_ns = {}
exec(_py, _ns)
hai_run = _ns["_hai_run"]

SECTIONS = [
    (1, 11, "The Basics"), (12, 19, "If Statements"), (20, 26, "Strings"), (27, 34, "Maths"),
    (35, 44, "For Loop"), (45, 51, "While Loop"), (52, 59, "Random"), (60, 68, "Turtle Graphics"),
    (69, 79, "Tuples, Lists and Dictionaries"), (80, 87, "More String Manipulation"),
    (88, 95, "Numeric Arrays"), (96, 104, "2D Lists and Dictionaries"),
    (105, 110, "Reading and Writing to a Text File"), (111, 117, "Reading and Writing to a .csv File"),
    (118, 123, "Subprograms"), (124, 132, "Tkinter GUI"), (133, 138, "More Tkinter"),
    (139, 145, "SQLite"), (146, 150, "Projects"),
]

CHALLENGES = []


def T(inputs, keywords=None, note="", allow_eof=False):
    return {"inputs": [str(v) for v in inputs], "keywords": keywords, "note": note, "allow_eof": allow_eof}


def C(n, title, title_vi, difficulty, desc, desc_vi, solution, tests, hints, tags,
      setup="", turtle=None, web_note="", web_note_vi="", seed=7):
    CHALLENGES.append(dict(n=n, title=title, title_vi=title_vi, difficulty=difficulty, desc=desc,
                           desc_vi=desc_vi, solution=solution, tests=tests, hints=hints, tags=tags,
                           setup=setup, turtle=turtle, web_note=web_note, web_note_vi=web_note_vi,
                           seed=seed))


def loose(s):
    s = s.lower().replace("\r\n", "\n").replace("\u2019", "'").replace("\u2018", "'")
    s = re.sub(r"(?<!\d)\.|\.(?!\d)", " ", s)
    s = re.sub(r"[^\w.\-]+", " ", s)
    return re.sub(r"\s+", " ", s).strip()


def match_keywords(out, kws):
    if len(kws) == 0:
        return out.strip() != ""
    rest = loose(out)
    for kw in kws:
        if kw.startswith("re:"):
            if not re.search(kw[3:], out, re.I):
                return False
            continue
        alts = []
        for a in kw.split("|"):
            l = loose(a)
            suffix = r"(?:\.0+)?" if re.fullmatch(r"-?\d+", l) else (r"\d*" if re.fullmatch(r"-?\d+\.\d+", l) else "")
            alts.append(r"(?:^| )" + re.escape(l) + suffix + r"(?= |$)")
        m = re.search("|".join(alts), rest)
        if not m:
            return False
        rest = rest[m.end():]
    return True


def run(code, inputs, setup, seed, echo=False):
    return json.loads(hai_run(code, json.dumps(inputs), echo, setup, seed))


def section_for(n):
    for a, b, name in SECTIONS:
        if a <= n <= b:
            return name
    raise ValueError(n)


def build():
    problems = []
    out = []
    work = tempfile.mkdtemp()
    cwd = os.getcwd()
    os.chdir(work)
    try:
        nums = sorted(c["n"] for c in CHALLENGES)
        if nums != list(range(1, 151)):
            missing = sorted(set(range(1, 151)) - set(nums))
            problems.append(f"challenge numbers incomplete, missing {missing}")
        for c in sorted(CHALLENGES, key=lambda x: x["n"]):
            tests = []
            for i, t in enumerate(c["tests"]):
                for f in os.listdir(work):
                    p = os.path.join(work, f)
                    os.remove(p) if os.path.isfile(p) else shutil.rmtree(p)
                r = run(c["solution"], t["inputs"], c["setup"], c["seed"])
                if r["err"] and t["allow_eof"] and "EOFError" in r["err"]:
                    r["err"] = ""
                if r["err"]:
                    problems.append(f"#{c['n']} test {i + 1}: {r['err']}")
                    continue
                if t["inputs"] and r["used"] == 0:
                    problems.append(f"#{c['n']} test {i + 1}: reference never reads input")
                if c["turtle"]:
                    tt = r["turtle"]; spec = c["turtle"]
                    for key, field in [("minLines", "lines"), ("minCircles", "circles"), ("minFills", "fills"), ("minColors", "colors")]:
                        if tt[field] < spec.get(key, 0):
                            problems.append(f"#{c['n']}: turtle {field}={tt[field]} < {spec[key]}")
                    expected = t["note"] or "A drawing appears below the console."
                else:
                    expected = r["out"].rstrip()
                    if t["keywords"] is not None and not match_keywords(r["out"], t["keywords"]):
                        problems.append(f"#{c['n']} test {i + 1}: keywords {t['keywords']} not found in {r['out']!r}")
                    if not expected:
                        problems.append(f"#{c['n']} test {i + 1}: empty output")
                case = {"input": "\n".join(t["inputs"]), "expected": expected,
                        "description": "Sample input" if t["inputs"] else "No input needed"}
                if t["keywords"] is not None:
                    case["keywords"] = t["keywords"]
                if t["allow_eof"]:
                    case["allowEof"] = True
                tests.append(case)
            entry = {
                "id": f"{c['n']:03d}", "number": c["n"], "title": c["title"], "titleVi": c["title_vi"],
                "difficulty": c["difficulty"], "section": section_for(c["n"]),
                "description": c["desc"], "descriptionVi": c["desc_vi"],
                "expectedOutput": tests[0]["expected"] if tests else "",
                "hints": c["hints"], "starterCode": "# Your code here\n", "solution": c["solution"],
                "testCases": tests, "tags": c["tags"],
            }
            if c["setup"]:
                entry["setupCode"] = c["setup"]
            if c["turtle"]:
                entry["turtle"] = c["turtle"]
            if c["web_note"]:
                entry["webNote"] = c["web_note"]; entry["webNoteVi"] = c["web_note_vi"]
            if "\u2014" in json.dumps(entry, ensure_ascii=False):
                problems.append(f"#{c['n']}: contains an em dash")
            out.append(entry)
    finally:
        os.chdir(cwd)
        shutil.rmtree(work, ignore_errors=True)
    return out, problems
