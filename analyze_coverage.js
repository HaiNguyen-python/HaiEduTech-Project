const fs = require('fs');
const path = require('path');

// Mocking the resolveDialogueKeyPhrases logic
const DIALOGUE_KEY_PHRASES = [
  "Excuse me", "I was wondering if", "Would it be possible to", "Do you happen to know",
  "Could you tell me", "Could you please", "Would you mind", "Is there any chance",
  "May I ask", "Sorry to bother you", "Just a quick question", "Do you have a moment",
  "I'd like to", "I would like to", "I'm looking for", "I'm here to", "I'm calling about",
  "I'm calling to", "Can I get", "Can I have", "Could I have", "Let me know if",
  "Did you manage to", "Have you managed to", "Would you be able to",
  "Would you like", "Would you like me to", "Shall I", "How about", "What about",
  "Why don't we", "Why don't you", "Feel free to", "Let me check", "Let me see",
  "Let me take a look", "I'll be happy to", "I'd be happy to", "I can do that for you",
  "Do you want me to", "If you like", "If that works for you",
  "What did you have in mind", "That works for me", "that works for both of us",
  "I see your point", "I understand your concern", "from our side", "on our end",
  "meet in the middle", "meet you halfway", "come down on the price", "the best I can do",
  "commit to", "on one condition", "in exchange for", "we could offer", "we can offer",
  "how does that sound", "that sounds reasonable", "that sounds fair", "let's say",
  "in writing", "sign off on", "close the deal", "finalize the deal", "seal the deal",
  "sweeten the deal", "a win-win", "walk away", "bottom line", "ballpark figure",
  "within our budget", "over our budget", "at that price point", "long term",
  "I'm afraid", "To be honest", "Actually", "I'm not sure about", "I see what you mean, but",
  "That may be true, but", "I'd rather", "I would prefer", "If I'm honest",
  "with all due respect", "having said that", "on the other hand", "That depends on",
  "It's a bit tricky", "unfortunately",
  "Sorry, could you repeat that", "Do you mean", "Just to be clear", "Let me make sure",
  "Correct me if I'm wrong", "If I understood correctly", "In other words",
  "What exactly", "Could you explain", "Does that make sense", "Are you saying that",
  "Just to confirm", "so you're saying",
  "It looks like", "It seems that", "According to", "as far as I know", "in my experience",
  "The reason is", "That's because", "What happened was", "It turns out",
  "The good news is", "The problem is", "One issue is", "at the moment", "right now",
  "as soon as possible", "by the end of the day", "later today", "first thing tomorrow",
  "There seems to be a problem", "I'm sorry to hear that", "I apologize for", "Sorry about that",
  "Can we sort this out", "sort it out", "take care of it", "look into it", "follow up on",
  "get back to you", "keep you posted", "make it right", "no harm done", "It's not a big deal",
  "That's fine", "That's perfect", "Sounds good", "Fair enough", "Absolutely",
  "Of course", "No problem", "Definitely", "I couldn't agree more", "You're right",
  "Exactly", "That makes sense", "Count me in",
  "touch base", "circle back", "run it by", "loop me in", "keep me in the loop",
  "set up a meeting", "push back the deadline", "on the same page", "take the lead",
  "hand over", "hand in", "go over the details", "walk me through", "break it down",
  "put together", "work on", "deal with", "figure out", "sign up for", "fill out",
  "drop by", "stop by", "check in", "check out", "line up",
  "send it for review", "make sure", "waiting on", "before the end of the day",
  "anything blocking you", "include the projections", "give an update", "provide an update",
  "Thanks for your help", "Thank you for your time", "I appreciate it",
  "Thanks a lot", "You're welcome", "Have a nice day", "Have a good one",
  "Talk to you soon", "Looking forward to", "See you then", "Take care",
  "That's a great point", "I'd add that", "I'd like to add", "Building on that",
  "To add to that", "Picking up on", "If I could just come in here",
  "Going back to what you said", "as you mentioned", "as we discussed",
  "I'd argue that", "I take your point", "I'm inclined to think",
  "I see it differently", "I'm not entirely convinced", "I partly agree",
  "That's one way of looking at it", "Let's not forget that",
  "Could I just clarify", "Sorry to interrupt", "Please go ahead",
  "What are your thoughts on", "Shall we move on to", "Let's come back to",
  "To sum up", "To wrap up", "In short", "Overall",
  "It could be argued that", "This suggests that", "This indicates that",
  "It is likely that", "It appears that", "tends to", "to some extent",
  "in most cases", "broadly speaking", "generally speaking",
  "There is evidence that", "The data suggest", "The findings show",
  "One limitation is", "further research is needed",
  "According to the study", "in her paper", "in his paper", "the authors argue",
  "the study found", "a recent study", "research shows", "the results indicate",
  "as cited in", "based on the data", "In terms of", "compared with",
  "significantly higher", "significantly lower", "a sharp increase",
  "a steady decline", "roughly", "approximately", "accounted for",
  "Let's get started", "The purpose of this meeting is", "First of all",
  "Moving on to", "Just to recap", "Any questions so far",
  "I'll take that away", "I'll follow up with", "Let's set a deadline",
  "by the end of the week", "as agreed", "please find attached",
  "I'm writing to", "I'd appreciate it if", "at your earliest convenience",
  "Let me know your thoughts", "Thanks in advance",
  "I was hoping you could", "Would it be alright if", "If you don't mind",
  "Do you think we could", "I wonder whether", "Perhaps we could",
  "It might be better to", "One option would be", "we may need to",
  "Today I'm going to talk about", "I'm going to talk about", "we will look at",
  "By the end of this presentation", "let's dive into", "To start",
  "let's look at", "Great question", "How did you arrive at",
  "Does that account for", "I can share the full data", "That sounds reliable",
  "Can we see the breakdown", "share my screen", "Can everyone hear me",
  "Thanks for letting me know", "No problem at all", "could you please",
  "I hope this email finds you well", "I am reaching out to", "I'm reaching out to",
  "In particular", "I would appreciate your reply", "Please find below",
  "Please reply to this email", "Best regards", "status update",
  "Waiting for", "Blocked on", "I noticed", "signing off", "made progress on",
  "Based on my experience", "I am targeting", "I'm targeting", "I understand that",
  "I am flexible", "I'm flexible", "I look forward to", "let's discuss",
  "That works for me", "I've decided to", "I wanted to let you know",
  "I appreciate the opportunity", "What could we have done better",
  "Can you give me a specific example", "That's a very clear example",
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
  "Have you looked at", "I suppose", "Won't that hurt"
];

const PHRASE_PATTERNS = [
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
];

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const matchesLine = (phrase, text) =>
  new RegExp(`(?<![\\p{L}])${escapeRegExp(phrase)}(?![\\p{L}])`, "iu").test(text);

const extractPatternPhrases = (text) => {
  const found = new Set();
  for (const pattern of PHRASE_PATTERNS) {
    const re = new RegExp(pattern.source, pattern.flags.includes("g") ? pattern.flags : `${pattern.flags}g`);
    let m;
    while ((m = re.exec(text)) !== null) {
      const hit = m[0].trim();
      if (hit.length >= 4) found.add(hit);
      if (m.index === re.lastIndex) re.lastIndex += 1;
    }
  }
  return Array.from(found);
};

const resolveDialogueKeyPhrases = (lines) => {
  const text = lines.join(" \n ");
  const hits = DIALOGUE_KEY_PHRASES.filter((phrase) => matchesLine(phrase, text));
  const patterned = extractPatternPhrases(text);
  const seen = new Set();
  const result = [];
  for (const phrase of [...hits, ...patterned].sort((a, b) => b.length - a.length)) {
    const key = phrase.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(phrase);
  }
  return result;
};

const files = [
  'src/data/conversationalCurriculum.ts',
  'src/data/conversationalCurriculumExpansion.ts',
  'src/data/conversationalCurriculumExpansion2.ts'
];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // Simple extraction of keySituations from the file content
  // Since we can't easily parse TS, we use regex to find sampleDialogues
  const situRegex = /title: "([^"]+)",[\s\S]*?sampleDialogue: (\[[\s\S]*?\])/g;
  let match;
  console.log(`\n--- Analysis for ${file} ---`);
  while ((match = situRegex.exec(content)) !== null) {
    const title = match[1];
    const dialogueStr = match[2];
    
    // Convert string array-like to actual lines
    const lineRegex = /line: "([^"]+)"/g;
    const lines = [];
    let lineMatch;
    while ((lineMatch = lineRegex.exec(dialogueStr)) !== null) {
      lines.push(lineMatch[1]);
    }

    const matches = resolveDialogueKeyPhrases(lines);
    if (matches.length < 3) {
      console.log(`\nSituation: ${title} (${matches.length} matches)`);
      console.log(`Matches found: ${matches.join(', ')}`);
      console.log("Dialogue:");
      lines.forEach(l => console.log(`  ${l}`));
    }
  }
});
