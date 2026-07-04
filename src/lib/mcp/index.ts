import { defineMcp } from "@lovable.dev/mcp-js";
import echoTool from "./tools/echo";
import listCoursesTool from "./tools/list-courses";
import vffCurriculumTool from "./tools/vff-curriculum";

export default defineMcp({
  name: "haiedutech-mcp",
  title: "HaiEduTech MCP",
  version: "0.1.0",
  instructions:
    "Tools for HaiEduTech - a multi-language learning platform (IELTS, TOEIC, HSK, Cambridge, SAT, PTE, THPT, Vietnamese for Foreigners, Finnish/YKI, Swedish, programming). Use `list_courses` to discover tracks, `get_vff_curriculum` for the Vietnamese-for-Foreigners program, and `echo` to verify connectivity.",
  tools: [echoTool, listCoursesTool, vffCurriculumTool],
});
