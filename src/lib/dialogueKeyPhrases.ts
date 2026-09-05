/**
 * @file dialogueKeyPhrases.ts
 * @description Bank of high value functional chunks that appear in the
 *   Interactive Curriculum dialogues. These are the phrases a learner should
 *   copy verbatim (asking, offering, negotiating, softening, confirming,
 *   closing), so the dialogue view prints them in bold.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export const DIALOGUE_KEY_PHRASES: string[] = [
  // Asking politely / opening
  "Excuse me", "I was wondering if", "Would it be possible to", "Do you happen to know",
  "Could you tell me", "Could you please", "Would you mind", "Is there any chance",
  "May I ask", "Sorry to bother you", "Just a quick question", "Do you have a moment",
  "I'd like to", "I would like to", "I'm looking for", "I'm here to", "I'm calling about",
  "I'm calling to", "Can I get", "Can I have", "Could I have", "Let me know if",

  // Offering and inviting
  "Would you like", "Would you like me to", "Shall I", "How about", "What about",
  "Why don't we", "Why don't you", "Feel free to", "Let me check", "Let me see",
  "Let me take a look", "I'll be happy to", "I'd be happy to", "I can do that for you",
  "Do you want me to", "If you like", "If that works for you",

  // Negotiating and bargaining
  "What did you have in mind", "That works for me", "that works for both of us",
  "I see your point", "I understand your concern", "from our side", "on our end",
  "meet in the middle", "meet you halfway", "come down on the price", "the best I can do",
  "commit to", "on one condition", "in exchange for", "we could offer", "we can offer",
  "how does that sound", "that sounds reasonable", "that sounds fair", "let's say",
  "in writing", "sign off on", "close the deal", "finalize the deal", "seal the deal",
  "sweeten the deal", "a win-win", "walk away", "bottom line", "ballpark figure",
  "within our budget", "over our budget", "at that price point", "long term",

  // Softening and disagreeing politely
  "I'm afraid", "To be honest", "Actually", "I'm not sure about", "I see what you mean, but",
  "That may be true, but", "I'd rather", "I would prefer", "If I'm honest",
  "with all due respect", "having said that", "on the other hand", "That depends on",
  "It's a bit tricky", "unfortunately",

  // Clarifying and checking
  "Sorry, could you repeat that", "Do you mean", "Just to be clear", "Let me make sure",
  "Correct me if I'm wrong", "If I understood correctly", "In other words",
  "What exactly", "Could you explain", "Does that make sense", "Are you saying that",
  "Just to confirm", "so you're saying",

  // Giving information and describing
  "It looks like", "It seems that", "According to", "as far as I know", "in my experience",
  "The reason is", "That's because", "What happened was", "It turns out",
  "The good news is", "The problem is", "One issue is", "at the moment", "right now",
  "as soon as possible", "by the end of the day", "later today", "first thing tomorrow",

  // Problems and complaints
  "There seems to be a problem", "I'm sorry to hear that", "I apologize for", "Sorry about that",
  "Can we sort this out", "sort it out", "take care of it", "look into it", "follow up on",
  "get back to you", "keep you posted", "make it right", "no harm done", "It's not a big deal",

  // Agreeing and confirming
  "That's fine", "That's perfect", "Sounds good", "Fair enough", "Absolutely",
  "Of course", "No problem", "Definitely", "I couldn't agree more", "You're right",
  "Exactly", "That makes sense", "Count me in",

  // Work and meetings
  "touch base", "circle back", "run it by", "loop me in", "keep me in the loop",
  "set up a meeting", "push back the deadline", "on the same page", "take the lead",
  "hand over", "hand in", "go over the details", "walk me through", "break it down",
  "put together", "work on", "deal with", "figure out", "sign up for", "fill out",
  "drop by", "stop by", "check in", "check out", "line up",

  // Closing and thanking
  "Thanks for your help", "Thank you for your time", "I appreciate it",
  "Thanks a lot", "You're welcome", "Have a nice day", "Have a good one",
  "Talk to you soon", "Looking forward to", "See you then", "Take care",

  // B1+ discussion moves (seminars, tutorials, group work)
  "That's a great point", "I'd add that", "I'd like to add", "Building on that",
  "To add to that", "Picking up on", "If I could just come in here",
  "Going back to what you said", "as you mentioned", "as we discussed",
  "I'd argue that", "I take your point", "I'm inclined to think",
  "I see it differently", "I'm not entirely convinced", "I partly agree",
  "That's one way of looking at it", "Let's not forget that",
  "Could I just clarify", "Sorry to interrupt", "Please go ahead",
  "What are your thoughts on", "Shall we move on to", "Let's come back to",
  "To sum up", "To wrap up", "In short", "Overall",

  // B1+ hedging and academic caution
  "It could be argued that", "This suggests that", "This indicates that",
  "It is likely that", "It appears that", "tends to", "to some extent",
  "in most cases", "broadly speaking", "generally speaking",
  "There is evidence that", "The data suggest", "The findings show",
  "One limitation is", "further research is needed",

  // B1+ evidence, sources and citation
  "According to the study", "in her paper", "in his paper", "the authors argue",
  "the study found", "a recent study", "research shows", "the results indicate",
  "as cited in", "based on the data", "In terms of", "compared with",
  "significantly higher", "significantly lower", "a sharp increase",
  "a steady decline", "roughly", "approximately", "accounted for",

  // B1+ chairing, reporting and business follow-up
  "Let's get started", "The purpose of this meeting is", "First of all",
  "Moving on to", "Just to recap", "Any questions so far",
  "I'll take that away", "I'll follow up with", "Let's set a deadline",
  "by the end of the week", "as agreed", "please find attached",
  "I'm writing to", "I'd appreciate it if", "at your earliest convenience",
  "Let me know your thoughts", "Thanks in advance",

  // B1+ softening and requesting
  "I was hoping you could", "Would it be alright if", "If you don't mind",
  "Do you think we could", "I wonder whether", "Perhaps we could",
  "It might be better to", "One option would be", "we may need to",
];

/** Ensures every dialogue shows some bold chunks, even when the bank misses. */
const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const matchesLine = (phrase: string, text: string) =>
  new RegExp(`(?<![\\p{L}])${escapeRegExp(phrase)}(?![\\p{L}])`, "iu").test(text);

/**
 * Returns the phrases that should be printed in bold for a dialogue.
 * Falls back to the lesson's own target phrases when nothing in the shared
 * bank appears in the conversation, so no lesson is left without emphasis.
 */
export const resolveDialogueKeyPhrases = (lines: string[], lessonPhrases: string[] = []): string[] => {
  const text = lines.join(" \n ");
  const hits = DIALOGUE_KEY_PHRASES.filter((phrase) => matchesLine(phrase, text));
  if (hits.length >= 2) return hits;
  const fallback = lessonPhrases.filter((phrase) => phrase.trim().length >= 3 && matchesLine(phrase, text));
  return Array.from(new Set([...hits, ...fallback]));
};

