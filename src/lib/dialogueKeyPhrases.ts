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
  "Did you manage to", "Have you managed to", "Would you be able to",

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
  "send it for review", "make sure", "waiting on", "before the end of the day",
  "anything blocking you", "include the projections", "give an update", "provide an update",

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

  // B1+ presenting and Q&A
  "Today I'm going to talk about", "I'm going to talk about", "we will look at",
  "By the end of this presentation", "let's dive into", "To start",
  "let's look at", "Great question", "How did you arrive at",
  "Does that account for", "I can share the full data", "That sounds reliable",
  "Can we see the breakdown", "share my screen", "Can everyone hear me",
  "Thanks for letting me know", "No problem at all", "could you please",

  // B1+ written and async updates
  "I hope this email finds you well", "I am reaching out to", "I'm reaching out to",
  "In particular", "I would appreciate your reply", "Please find below",
  "Please reply to this email", "Best regards", "status update",
  "Waiting for", "Blocked on", "I noticed", "signing off", "made progress on",

  // B1+ negotiating pay and career moves
  "Based on my experience", "I am targeting", "I'm targeting", "I understand that",
  "I am flexible", "I'm flexible", "I look forward to", "let's discuss",
  "That works for me", "I've decided to", "I wanted to let you know",
  "I appreciate the opportunity", "What could we have done better",
  "Can you give me a specific example", "That's a very clear example",

  // B1+ discussion, research and support
  "Studies show that", "Can you elaborate on", "I partially agree",
  "Could you tell us how", "What specific measures", "That sounds promising",
  "we've implemented", "Where should I start", "Remember to filter by",
  "How do I narrow down", "That's very helpful", "Not necessarily",
  "Be careful with", "I'm not sure", "Check the author's credentials",
  "That is usually a red flag", "How will you track progress",
  "What did you learn from", "That's a valuable lesson", "Do you think",
  "That is understandable", "What kind of", "Do you want to talk about it",
  "That sounds really hard", "How long have you felt this way",
  "Thanks for listening", "I am always here for you", "I'm here for you",
  "That sounds exhausting", "Is there anything I can do to help",
  "What's the plan", "I'm torn", "I'll decide by", "You should talk to",
  "Have you looked at", "I suppose", "Won't that hurt",

  // Everyday service, travel, health and social interaction
  "What seems to be the problem", "What brings you in today", "Are you experiencing",
  "Have you tried", "Has there been", "How long have you", "How often should I",
  "What do you recommend", "I suggest", "I recommend", "You will need to",
  "Please have a seat", "Please send", "Stay on the line", "Help is on the way",
  "Is anyone injured", "What is the exact location", "I'm at the main entrance",
  "Is that correct", "Got it", "give or take", "I'll wait here",
  "How much is", "Does that price include", "When is the earliest",
  "move in", "pay for separately", "What time were you considering",
  "I have a reservation under", "Does the room have", "Could I also request",
  "How can I help you today", "Which documents do you require",
  "proof of address", "take a number", "customer service desk",
  "What food do you recommend", "How often should", "three times a day",
  "What brings you", "I hope it is nothing serious", "Don't worry",
  "Is it supposed to be", "Should I", "Are we expecting",
  "Did you see", "Can you believe", "I know, right", "a dream come true",
  "I've always wanted to", "How did you get into", "What was the highlight",
  "Do you still", "That sounds lovely", "What do people usually do",

  // Reusable workplace and career chunks
  "Thanks for joining", "Let's touch base", "Let's move on", "Let's head",
  "How would you handle", "How do you prioritize", "What would you do if",
  "Could you describe a time when", "The outcome was", "I learned that",
  "I'm confident that", "I'd be a good fit", "I bring experience in",
  "What are the next steps", "When can I expect", "I'd like your input",
  "Could we schedule", "Does that work for you", "I'll send you",
  "I wanted to check in", "We're on track", "We're running behind",
  "What can I do to help", "How can we prevent", "going forward",
  "Could we compromise", "That would allow us to", "reach an agreement",
  "Thank you for bringing this up", "I value your feedback", "I take responsibility",
  "from now on", "What could we do differently", "What do you suggest",

  // Reusable academic discussion and study chunks
  "What is your view on", "How would you respond to", "What evidence supports",
  "The evidence suggests", "The results show", "This can be explained by",
  "A possible explanation is", "The key point is", "The main finding is",
  "The aim of this study", "The purpose of this study", "The research focuses on",
  "Could you clarify what you mean", "Could you expand on that", "Let me rephrase that",
  "I agree up to a point", "I disagree because", "Another perspective is",
  "That raises an important question", "There are two main reasons",
  "The first point is", "The second point is", "In contrast",
  "On balance", "In conclusion", "From an academic perspective",
  "Would you recommend", "Where can I find", "How do I narrow down",
  "Could you give me some feedback", "One area to improve", "You've made good progress",

];

/** Matches reusable chunks without selecting isolated vocabulary words. */
const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const matchesLine = (phrase: string, text: string) =>
  new RegExp(`(?<![\\p{L}])${escapeRegExp(phrase)}(?![\\p{L}])`, "iu").test(text);

/**
 * Returns phrases that should be printed in bold for a dialogue.
 */
/**
 * Generic chunk patterns. The fixed bank above cannot list every useful
 * collocation, so these frames catch the recurring functional language that
 * appears in interview, seminar and business dialogues.
 */
const PHRASE_PATTERNS: RegExp[] = [
  /\b(?:I|we)(?:'m| am) (?:a|an) [a-z]+(?: [a-z]+)? (?:professional|specialist|engineer|manager|student|teacher|developer|analyst|designer|researcher|consultant)\b/gi,
  /\b\d+ years? of experience\b/gi,
  /\bI (?:specialize|specialise) in\b/gi,
  /\bI (?:have )?(?:focused|worked|studied|majored|concentrated) (?:primarily |mainly )?(?:on|in|at|with)\b/gi,
  /\bmy (?:greatest|biggest|main|key) (?:strength|weakness|challenge|goal|concern)s? (?:is|are)\b/gi,
  /\b(?:my|the) ability to\b/gi,
  /\bI'?m (?:responsible|known|grateful|excited) for\b/gi,
  /\bwhat (?:specific|kind of|sort of|type of) [a-z]+\b/gi,
  /\bbased on (?:that|your|my|the) [a-z]+\b/gi,
  /\bthat sounds [a-z]+\b/gi,
  /\bI appreciate (?:that|your|it|the)\b/gi,
  /\bit shows (?:real )?[a-z]+\b/gi,
  /\btell me (?:more )?about\b/gi,
  /\bhow do you (?:handle|deal with|approach|feel about|see)\b/gi,
  /\bcould you (?:give|share|walk|tell|describe)\b/gi,
  /\bI (?:believe|think|feel|would say) that\b/gi,
  /\bone of (?:my|the) [a-z]+\b/gi,
  /\bthe main (?:reason|point|issue|goal|challenge|advantage)\b/gi,
  /\b(?:for example|for instance|as a result|in addition|on top of that|in fact|in short|in terms of|at the same time|more importantly)\b/gi,
  /\bI'?m (?:interested|involved) in\b/gi,
  /\bI'?m (?:planning|hoping|trying|willing|about) to\b/gi,
  /\bI used to\b/gi,
  /\bI'?ve been [a-z]+ing\b/gi,
  /\bwe (?:need|want|have) to\b/gi,
  /\b(?:let's|let us) [a-z]+\b/gi,
  /\bthanks? (?:a lot )?for [a-z]+\b/gi,
  /\bI'?d love to\b/gi,
  /\bmake sure (?:that|to)\b/gi,
  /\bkeep (?:me|us|you) (?:updated|posted|informed)\b/gi,
  /\bin my (?:opinion|view|experience)\b/gi,
  /\bfrom my point of view\b/gi,
  /\b(?:can|could|would|will) you (?:please )?(?:tell|show|explain|describe|recommend|confirm|check|send|help|share|give|repeat|clarify|arrange|provide) (?:me |us )?(?:the |a |an |your |that |this )?[a-z]+(?: [a-z]+){0,3}\b/gi,
  /\b(?:do|did|have|has|are|is|will|would|should) you (?:have|know|need|want|think|feel|agree|prefer|remember|mean|recommend|expect|plan|consider|notice|see|mind|suggest|understand)(?: (?:the|a|an|any|that|this|your|my|it|to|about|with|if|whether) [a-z]+(?: [a-z]+){0,2})?\b/gi,
  /\bhow (?:can|could|do|did|would|should|will) (?:I|we|you) (?:get|find|handle|solve|improve|prepare|apply|choose|decide|know|make|avoid|check|start|continue|respond|explain|support|measure|track|prevent|deal)(?: (?:the|a|an|this|that|it|with|for|to) [a-z]+(?: [a-z]+){0,2})?\b/gi,
  /\bwhat (?:can|could|do|did|would|should|will) (?:I|we|you) (?:do|expect|bring|say|use|change|improve|choose|recommend|suggest|need|prepare|learn)(?: (?:about|with|to|for|next|instead) [a-z]+(?: [a-z]+){0,2})?\b/gi,
  /\b(?:I|we)(?:'d| would) (?:like|love|prefer|recommend|suggest) (?:to )?[a-z]+(?: [a-z]+){0,3}\b/gi,
  /\b(?:I|we)(?:'ll| will) (?:check|send|call|wait|stay|follow|look|take|arrange|review|confirm|update|prepare|make|try|ask|decide)(?: (?:the|a|an|for|on|into|here|there|you|it|this|that) [a-z]+(?: [a-z]+){0,2})?\b/gi,
  /\b(?:I|we)(?:'ve| have) (?:already )?(?:tried|noticed|learned|found|decided|completed|finished|worked|studied|prepared|included|reviewed|considered)(?: (?:the|a|an|that|this|it|to|on|in|with|for) [a-z]+(?: [a-z]+){0,2})?\b/gi,
  /\b(?:you|we) (?:can|could|should|need to|have to|might want to) (?:also )?[a-z]+(?: [a-z]+){0,4}\b/gi,
  /\b(?:it|that|this) (?:sounds|looks|seems|feels) (?:like )?(?:a |an |the |very |really |quite )?[a-z]+(?: [a-z]+){0,2}\b/gi,
  /\b(?:that|this|it) (?:would|could|might|should|can) (?:be|help|allow|make|give|reduce|improve|explain|mean) (?:a |an |the |us |you |it )?[a-z]+(?: [a-z]+){0,3}\b/gi,
  /\b(?:thank you|thanks) for (?:your |the |being |taking |letting |bringing |helping |checking |explaining |sharing |joining |listening)[a-z]*(?: [a-z]+){0,3}\b/gi,
  /\bI(?:'m| am) sorry (?:to hear that|about that|for [a-z]+(?: [a-z]+){0,2})\b/gi,
  /\bI hope (?:we|you|it|that|this) [a-z]+(?: [a-z]+){0,4}\b/gi,
  /\b(?:the|my|our|your) (?:main|biggest|greatest|key|first|next) (?:point|reason|goal|priority|concern|challenge|advantage|step|question|finding|issue) (?:is|would be|should be)\b/gi,
  /\b(?:one|two|three) (?:of the|of my|of our|main|important|possible|key) [a-z]+(?: [a-z]+){0,2}\b/gi,
  /\b(?:according to|based on|in light of|as shown by) (?:the|this|these|our|your|my|a|an) [a-z]+(?: [a-z]+){0,2}\b/gi,
];

const extractPatternPhrases = (text: string): string[] => {
  const found = new Set<string>();
  for (const pattern of PHRASE_PATTERNS) {
    const re = new RegExp(pattern.source, pattern.flags.includes("g") ? pattern.flags : `${pattern.flags}g`);
    let m: RegExpExecArray | null;
    while ((m = re.exec(text)) !== null) {
      const hit = m[0].trim();
      if (hit.length >= 4) found.add(hit);
      if (m.index === re.lastIndex) re.lastIndex += 1;
    }
  }
  return Array.from(found);
};

/**
 * Returns the phrases that should be printed in bold for a dialogue: bank
 * matches, generic pattern matches and the lesson's own target phrases.
 */
export const resolveDialogueKeyPhrases = (lines: string[], _lessonPhrases: string[] = []): string[] => {
  const text = lines.join(" \n ");
  const hits = DIALOGUE_KEY_PHRASES.filter(
    (phrase) => phrase.trim().split(/\s+/).length >= 2 && matchesLine(phrase, text),
  );
  const patterned = extractPatternPhrases(text);
  const seen = new Set<string>();
  const result: string[] = [];
  for (const phrase of [...hits, ...patterned].sort((a, b) => b.length - a.length)) {
    const key = phrase.toLowerCase();
    if (seen.has(key)) continue;
    if (result.some((longer) => longer.toLowerCase().includes(key))) continue;
    seen.add(key);
    result.push(phrase);
  }
  return result;
};
