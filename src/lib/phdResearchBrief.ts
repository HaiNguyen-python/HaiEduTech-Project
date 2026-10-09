export interface ResearchBrief {
  topic: string;
  keywords: string;
  problem: string;
  population: string;
  objective: string;
  constraints: string;
}
export const EMPTY_RESEARCH_BRIEF: ResearchBrief = { topic: "", keywords: "", problem: "", population: "", objective: "", constraints: "" };
export const RESEARCH_BRIEF_TOPIC = "Research Brief";
export function parseResearchBrief(content: string): ResearchBrief {
  try {
    const data = JSON.parse(content);
    return Object.fromEntries(Object.keys(EMPTY_RESEARCH_BRIEF).map(key => [key, typeof data?.[key] === "string" ? data[key] : ""])) as unknown as ResearchBrief;
  } catch { return { ...EMPTY_RESEARCH_BRIEF }; }
}
export function hasResearchBrief(brief: ResearchBrief): boolean {
  return Boolean(brief.topic.trim() && brief.keywords.trim() && brief.problem.trim());
}
export function researchBriefContext(brief: ResearchBrief): string {
  return Object.entries(brief).filter(([, value]) => value.trim()).map(([key, value]) => `${key.toUpperCase()}: ${value.trim()}`).join("\n");
}