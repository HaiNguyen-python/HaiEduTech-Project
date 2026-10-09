/** Topic-specific unused headings for legacy papers with no authored extras. */
export const READING_HEADING_DISTRACTORS: Record<string, string[]> = {
  "rx-1": ["A complete end to fossil-fuel electricity", "Why storage removes the need for grid investment", "Opposition to every form of renewable power"],
  "rx-2": ["Why tracking guarantees perfect sleep", "A medicine that replaces the need for rest", "Identical sleep needs at every age"],
  "rx-3": ["A transport invention reserved for racing", "The disappearance of cycling in every country", "Why electric bicycles require no physical effort"],
  "rx-4": ["Restoration as a substitute for emissions cuts", "Why all coral colonies respond identically", "The benefits of permanently losing symbiotic algae"],
  "rx-5": ["Environmental savings in every remote workplace", "Replacing written decisions with constant meetings", "The end of demand for office-based work"],
};

/** A reviewed shared task: separate present wave damping (B) from long-term
 * adaptability under uncertainty (G), rather than offering synonymous keys. */
export const READING_HEADING_OVERRIDES: Record<string, { byParagraph: Record<string, string>; distractors: string[] }> = {
  "rx-hard-4": {
    byParagraph: {
      A: "How hard barriers undermine their own protection",
      B: "The physical mechanisms of a living wave barrier",
      C: "Why returning farmland to the sea is politically difficult",
      F: "The conditions that limit marsh-based protection",
      G: "Adaptability as a response to an uncertain future",
    },
    distractors: ["The financial challenge of savings across generations", "Ecological recovery that remains incomplete", "Historical causes of wetland drainage"],
  },
};