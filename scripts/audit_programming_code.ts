/** Static syntax audit only: never executes lesson code. Run with bun. */
import { spawnSync } from "node:child_process";
import { allProgrammingModules } from "../src/data/programmingLessonData";
import { pythonLessons } from "../src/data/curriculum/pythonPathway";
import * as flagship from "../src/data/dataEngFlagshipCode";
import * as extensions from "../src/data/curriculum/theoryExtensions";
import { normalizeCodeIndentation } from "../src/lib/normalizeCodeIndentation";

const blocks: { path: string; code: string }[] = [];
function collect(value: unknown, path = "root") {
  if (Array.isArray(value)) { value.forEach((entry, i) => collect(entry, `${path}/${i}`)); return; }
  if (!value || typeof value !== "object") return;
  const record = value as Record<string, unknown>;
  const language = record.codeLanguage || record.language;
  for (const [key, entry] of Object.entries(record)) {
    const location = `${path}/${record.id || ""}/${key}`;
    if (typeof entry !== "string") { collect(entry, location); continue; }
    // Remove Markdown blockquote prefixes before extracting fences.
    const markdown = entry.replace(/^> ?/gm, "");
    for (const match of markdown.matchAll(/```([^\n`]*)\n([\s\S]*?)```/g)) {
      if (["python", "py", "python3"].includes(match[1].trim())) {
        blocks.push({ path: location, code: normalizeCodeIndentation(match[2], "python") });
      }
    }
    if (key === "code" && (language === "python" || language === "py")) {
      blocks.push({ path: location, code: normalizeCodeIndentation(entry, "python") });
    }
  }
}
collect({ modules: allProgrammingModules, pathway: pythonLessons, flagship, extensions });
const result = spawnSync("python3", ["-c", `
import ast, json, sys
blocks = json.load(sys.stdin)
issues = []
for block in blocks:
    try:
        ast.parse(block["code"])
    except SyntaxError as error:
        issues.append(f'{block["path"]}:{error.lineno}: {error.msg}')
print(f'Checked {len(blocks)} Python samples: {len(issues)} syntax/indentation errors')
for issue in issues:
    print(issue)
sys.exit(1 if issues else 0)
`], { input: JSON.stringify(blocks), encoding: "utf8" });
process.stdout.write(result.stdout || "");
process.stderr.write(result.stderr || "");
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;