import { spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";
import { pythonCheatsheetGroups } from "@/data/pythonCheatsheet";

describe("Python cheatsheet executable semantics", () => {
  for (const group of pythonCheatsheetGroups) {
    for (const entry of group.entries) {
      it(`${group.title}: ${entry.signature}`, () => {
        // Each example runs in an isolated temporary directory, with controlled input/output.
        const script = `import builtins, contextlib, io, os, tempfile\ncaptured = io.StringIO()\nbuiltins.input = lambda prompt='': 'Hai'\nwith tempfile.TemporaryDirectory() as directory:\n    os.chdir(directory)\n    code = ${JSON.stringify(entry.example)}\n    compile(code, '<cheatsheet>', 'exec')\n    if not ${entry.syntaxOnly ? "True" : "False"}:\n        with contextlib.redirect_stdout(captured):\n            exec(code)\n        exec(${JSON.stringify(entry.check)})\n`;
        const result = spawnSync("python3", ["-c", script], { encoding: "utf-8", timeout: 5000 });
        expect(result.error, "Python runtime must be available for the content audit").toBeUndefined();
        expect(result.status, result.stderr).toBe(0);
      });
    }
  }
});
