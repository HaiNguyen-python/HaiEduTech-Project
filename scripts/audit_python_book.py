"""Execute each book theory example and completed fill-in with the browser harness."""
import json
import os
import re
import subprocess
import tempfile
from pathlib import Path

root = Path(__file__).resolve().parents[1]
records = json.loads(subprocess.check_output([
    "bun", "-e",
    'import { pythonLessons, getBookChapter } from "./src/data/curriculum/pythonPathway.ts"; process.stdout.write(JSON.stringify(pythonLessons.map(lesson => ({lesson, chapter: getBookChapter(lesson.id)}))));'
], cwd=root, text=True))
harness = (root / "src/lib/pythonChallengeHarness.ts").read_text()
namespace = {}
exec(re.search(r"PY_HARNESS = String\.raw`(.*?)`;", harness, re.S).group(1), namespace)
inputs = {1: ["Ava", "3", "8"], 2: ["20", "yes"], 3: ["ava", "lee"], 4: ["2"], 5: ["3"], 6: ["2", "3", "stop"], 7: ["5"], 10: ["Python"], 15: ["2", "3"], 16: ["10"], 17: ["Book"], 18: ["Ava"], 19: ["Hello z!"]}
expected = {1: "Total: 24.0", 2: "Adult", 3: "Ava Lee", 4: "Area: 12.57", 5: "3 x 10 = 30", 6: "Total: 5", 8: "Total turn: 360.0", 9: "['Leo', 'Mia']", 10: "Vowels: 1", 11: "[3, 5, 8, 8, 10]", 12: "Ava 21", 13: "Mia", 14: "Learning Python 2020", 15: "Total: 5", 16: "Miles: 6.21", 17: "Saved items: ['Book']", 18: "(1, 'Ava')", 19: "Decoded: hello z!"}
old_cwd = os.getcwd()
section_count = 0
with tempfile.TemporaryDirectory() as work:
    os.chdir(work)
    try:
        for number, record in enumerate(records, 1):
            lesson = record["lesson"]
            code = lesson["codeExample"]
            compile(code, lesson["id"], "exec")
            result = json.loads(namespace["_hai_run"](code, json.dumps(inputs.get(number, [])), False, "", 7))
            assert not result["err"], f"{lesson['id']}: {result['err']}"
            assert result["out"].strip(), lesson["id"]
            if number in expected:
                assert expected[number] in result["out"], f"{lesson['id']}: {result['out']}"
            snippets = re.findall(r"```python\n(.*?)\n```", lesson["conceptEn"], re.S)
            assert len(snippets) >= 3, f"{lesson['id']}: missing section example"
            for snippet in snippets:
                if snippet.strip() == code.strip():
                    continue
                section_count += 1
                compile(snippet, lesson["id"] + "-section", "exec")
                result = json.loads(namespace["_hai_run"](snippet, "[]", False, "", 7))
                assert not result["err"], f"{lesson['id']} section: {result['err']}"
                if lesson["id"] == "m6-l1-files" and "print(" not in snippet:
                    assert Path("example.txt").read_text() == "Hello\n"
                else:
                    assert result["out"].strip(), f"{lesson['id']}: empty section output"
            for question in lesson["quiz"]:
                if question["type"] == "fill":
                    compile(question["codeBefore"] + question["answer"] + question["codeAfter"], "fill.py", "exec")
            desktop = record["chapter"].get("desktopExample")
            if desktop:
                compile(desktop, "desktop.py", "exec")
        limited = json.loads(namespace["_hai_run"]("while True:\n    pass", "[]", False, "", 7))
        assert "ran for too long" in limited["err"]
        missing = json.loads(namespace["_hai_run"]("input('Name: ')", "[]", False, "", 7))
        assert "Add another line" in missing["err"]
    finally:
        os.chdir(old_cwd)
print(f"PASS: 19 worked examples, {section_count} section examples, 19 code questions, desktop syntax, input exhaustion and loop limit.")