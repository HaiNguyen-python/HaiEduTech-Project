import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const VFF = {
  hubUrl: "/learn-vietnamese/for-foreigners",
  levels: [
    { key: "a1", cefr: "A1", title: "Beginner", topics: ["Greetings", "Numbers", "Family", "Food basics", "Directions"] },
    { key: "a2", cefr: "A2", title: "Elementary", topics: ["Restaurant", "Grab/Taxi", "Shopping", "Directions", "Health", "Weather"] },
    { key: "b1", cefr: "B1", title: "Intermediate", topics: ["Work", "Travel", "Opinions", "News", "Culture"] },
  ],
  labs: [
    { id: "pronunciation", url: "/learn-vietnamese/for-foreigners/lab/pronunciation", title: "Pronunciation Lab (tones + minimal pairs)" },
    { id: "listening", url: "/learn-vietnamese/for-foreigners/lab/listening", title: "Listening Lab (3-speed dialogues)" },
    { id: "reading", url: "/learn-vietnamese/for-foreigners/lab/reading", title: "Reading Lab (graded passages)" },
    { id: "writing", url: "/learn-vietnamese/for-foreigners/lab/writing", title: "Writing Lab + AI Grader" },
    { id: "roleplay-ai", url: "/learn-vietnamese/for-foreigners/lab/roleplay-ai", title: "AI Roleplay (voice with NPCs)" },
    { id: "flashcards", url: "/learn-vietnamese/for-foreigners/lab/flashcards", title: "SRS Flashcards" },
    { id: "video", url: "/learn-vietnamese/for-foreigners/lab/video", title: "Video Immersion Lounge" },
    { id: "culture", url: "/learn-vietnamese/for-foreigners/lab/culture", title: "Culture Hub" },
    { id: "placement-adaptive", url: "/learn-vietnamese/for-foreigners/placement-adaptive", title: "Adaptive Placement Test" },
    { id: "analytics", url: "/learn-vietnamese/for-foreigners/analytics", title: "Skill Analytics Radar" },
    { id: "certificate", url: "/learn-vietnamese/for-foreigners/certificate", title: "Course Certificate" },
  ],
};

export default defineTool({
  name: "get_vff_curriculum",
  title: "Vietnamese for Foreigners curriculum",
  description: "Return the Vietnamese for Foreigners (VFF) curriculum overview: CEFR levels A1/A2/B1 with topics, plus all skill labs (pronunciation, listening, reading, writing, roleplay AI, flashcards, culture, video, placement, analytics).",
  inputSchema: {
    level: z.enum(["a1", "a2", "b1"]).optional().describe("Optional: return only one CEFR level."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ level }) => {
    const data = level ? { ...VFF, levels: VFF.levels.filter((l) => l.key === level) } : VFF;
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: data,
    };
  },
});
