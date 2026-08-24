/**
 * Extends the 12 legacy listening sets that had fewer than 10 questions so that
 * every set contains exactly 10 questions and every new answer is spoken in
 * the transcript. Idempotent: skips a set that already has the new lines.
 * @copyright 2026 HaiEduTech
 */
import fs from "fs";

const files = [
  "src/data/ieltsListeningPracticeExpansion2.ts",
  "src/data/ieltsListeningPracticeExpansion5.ts",
  "src/data/ieltsListeningPracticeExpansion6.ts",
  "src/data/ieltsListeningPracticeExpansion7.ts",
];

/** mcq(prompt, options, answerIndex) */
const mcq = (prompt, options, answer) =>
  `      { type: "mcq", prompt: ${JSON.stringify(prompt)}, options: [${options
    .map(o => JSON.stringify(o))
    .join(", ")}], answer: ${answer} },`;
const fill = (prompt, answer, maxWords) =>
  `      { type: "fill-in", prompt: ${JSON.stringify(prompt)}, answer: ${JSON.stringify(
    answer
  )}, maxWords: ${maxWords} },`;
const match = (prompt, answer) =>
  `      { type: "matching", prompt: ${JSON.stringify(prompt)}, answer: ${JSON.stringify(answer)} },`;

const patches = {
  "monologue-museum-tour": {
    lines: [
      "A word about tickets: your ticket also gives you free entry for a second visit within one month.",
      "The lift is out of order today, so the upper gallery must be reached by the main staircase.",
      "In the shop, the most popular souvenir with our visitors is the replica navigation chart.",
      "If you lose anything during your visit, lost property is kept at the ticket desk.",
      "Guide: And do try the model-boat workshop in the basement - it starts every hour.",
    ],
    questions: [
      mcq("A ticket allows a free second visit within:", ["one week", "one month", "three months", "one year"], 1),
      mcq("Today the upper gallery must be reached by:", ["the lift", "the main staircase", "the ramp", "the side entrance"], 1),
      mcq("The most popular souvenir is a replica:", ["ship model", "poster", "navigation chart", "medal"], 2),
      mcq("Lost property is kept at the:", ["café", "gift shop", "East Wing", "ticket desk"], 3),
      mcq("The model-boat workshop starts:", ["every hour", "twice a day", "at two thirty", "on request"], 0),
    ],
  },
  "monologue-community-garden": {
    lines: [
      "Before I forget, all the water we use comes from the rainwater tanks behind the shed.",
      "We also keep two beehives, and our own honey is sold in the café each September.",
      "The garden itself is open to the public from dawn until dusk, seven days a week.",
      "Volunteer: And if you'd like to help, our volunteer work party meets on Wednesday mornings.",
    ],
    questions: [
      mcq("The water used in the garden comes from:", ["the mains supply", "a well", "rainwater tanks", "the river"], 2),
      mcq("The garden's own honey is sold in the café in:", ["June", "July", "August", "September"], 3),
      mcq("The garden is open to the public:", ["seven days a week", "at weekends only", "on weekdays", "by appointment"], 0),
      mcq("The volunteer work party meets on:", ["Monday mornings", "Wednesday mornings", "Friday afternoons", "Saturday mornings"], 1),
    ],
  },
  "monologue-art-gallery-v2": {
    lines: [
      "One more thing: the gallery is closed to the public every Monday for conservation work.",
      "Our new sculpture garden opened last spring, and entry to it is completely free.",
      "Priya: Large bags must be left in the lockers beside the cloakroom before you go upstairs.",
    ],
    questions: [
      mcq("The gallery is closed to the public every:", ["Monday", "Tuesday", "Wednesday", "Sunday"], 0),
      mcq("Entry to the new sculpture garden is:", ["£3", "half price", "free", "for members only"], 2),
      mcq("Large bags must be left in the:", ["café", "reception", "courtyard", "lockers"], 3),
    ],
  },
  "monologue-farmers-market": {
    lines: [
      "A word on waste: every stall here now uses compostable packaging.",
      "You'll find the flower stall right beside the main entrance, so it's easy to find on the way out.",
      "If it rains heavily, the whole market moves into the covered hall next door.",
      "Coordinator: And traders who would like a stall next season should email the market office.",
    ],
    questions: [
      mcq("All the stalls now use packaging that is:", ["recycled", "compostable", "reusable", "paper only"], 1),
      mcq("The flower stall is beside the:", ["clock tower", "yellow tent", "main entrance", "library"], 2),
      mcq("In heavy rain the market moves into:", ["the covered hall", "the library", "the car park", "the yellow tent"], 0),
      mcq("New traders should contact the market office:", ["in person", "by phone", "by email", "through a form"], 2),
    ],
  },
  "discussion-research-project": {
    lines: [
      "Tutor: One more thing - who is checking the references?",
      "Daniel: I'll check the references, since I collected most of them.",
      "Mark: I can also book the meeting room each week.",
      "Priya: Then I'll write the ethics form.",
      "Daniel: And I'll email the tutor with the weekly update.",
    ],
    questions: [
      match("Checking the references: ___", "C"),
      match("Booking the weekly meeting room: ___", "A"),
      match("Writing the ethics form: ___", "B"),
      match("Emailing the weekly update: ___", "C"),
    ],
  },
  "discussion-history-project": {
    lines: [
      "Tutor: And who is contacting the local museum?",
      "Oliver: I'll contact the museum - my aunt works in their archive.",
      "Liam: I'll book the room at the community centre.",
      "Hana: I'll design the short questionnaire for residents.",
      "Oliver: And I'll scan the old documents so we have digital copies.",
    ],
    questions: [
      match("Contacting the local museum: ___", "C"),
      match("Booking the community centre room: ___", "A"),
      match("Designing the residents' questionnaire: ___", "B"),
      match("Scanning the old documents: ___", "C"),
    ],
  },
  "discussion-marketing-pitch": {
    lines: [
      "Tutor: Who is doing the market-size estimate?",
      "Tom: I'll do the market-size estimate - it fits with the competitor work.",
      "Sara: I'll prepare the question-and-answer notes for the panel.",
      "Maya: I'll print the handouts on Thursday evening.",
      "Sara: And I'll time the rehearsal so we don't overrun.",
    ],
    questions: [
      match("Estimating the market size: ___", "B"),
      match("Preparing the question-and-answer notes: ___", "C"),
      match("Printing the handouts: ___", "A"),
      match("Timing the rehearsal: ___", "C"),
    ],
  },
  "discussion-video-project": {
    lines: [
      "Emma: I'll also write the subtitles, so the film is accessible.",
      "Tutor: And I'll book the editing suite for you both.",
    ],
    questions: [
      match("Writing the subtitles: ___", "A"),
      match("Booking the editing suite: ___", "C"),
    ],
  },
  "lecture-urban-trees": {
    lines: [
      "There is a benefit for water, too. Tree roots slow rainfall run-off, which reduces the risk of flash flooding after heavy storms.",
      "Species choice matters as well: the most reliable street species in northern Europe remains the lime.",
      "Newly planted trees are vulnerable, and they need regular watering for their first three summers.",
      "Lecturer: The main obstacle for city councils, then, is not planting but the long-term cost of maintenance.",
    ],
    questions: [
      fill("Tree roots slow run-off and reduce the risk of ___ flooding.", "flash", 1),
      fill("The most reliable street species in northern Europe is the ___.", "lime", 1),
      fill("New trees need watering for their first ___ summers.", "three", 1),
      fill("The main obstacle for councils is the long-term cost of ___.", "maintenance", 1),
    ],
  },
  "lecture-bees-decline": {
    lines: [
      "Climate change is a fourth pressure, because flowers now open before the bees emerge, creating a mismatch in timing.",
      "Professor: Farmers can help immediately by leaving field margins uncut until late summer.",
    ],
    questions: [
      fill("Climate change creates a ___ in timing between flowers and bees.", "mismatch", 1),
      fill("Farmers can help by leaving field ___ uncut until late summer.", "margins", 1),
    ],
  },
  "lecture-microplastics": {
    lines: [
      "It is also worth remembering where the plastic comes from: most ocean plastic arrives from the land, carried down by rivers.",
      "Lecturer: One promising line of research uses bacteria that are able to digest plastic.",
    ],
    questions: [
      fill("Most ocean plastic arrives from land, carried by ___.", "rivers", 1),
      fill("One promising line of research uses ___ that digest plastic.", "bacteria", 1),
    ],
  },
  "lecture-coral-reefs": {
    lines: [
      "Reefs also support tourism, and in some island states reef tourism provides most of the national income.",
      "Lecturer: Finally, restoration projects now grow young corals in underwater nurseries before replanting them.",
    ],
    questions: [
      fill("In some island states reef tourism provides most of the national ___.", "income", 1),
      fill("Young corals are grown in underwater ___ before replanting.", "nurseries", 1),
    ],
  },
};

let changed = 0;
for (const file of files) {
  let src = fs.readFileSync(file, "utf8");
  for (const [id, patch] of Object.entries(patches)) {
    const idIdx = src.indexOf(`id: "${id}",`);
    if (idIdx === -1) continue;
    // Block ends at the first "\n  },\n" after the id.
    const endIdx = src.indexOf("\n  },", idIdx);
    let block = src.slice(idIdx, endIdx);
    if (block.includes(patch.questions[0].trim())) continue; // already patched

    // --- transcript: append new spoken lines ---
    const tStart = block.indexOf("transcript:\n");
    const tLinesStart = tStart + "transcript:\n".length;
    const tEnd = block.indexOf('",\n', tLinesStart) + 1; // position of closing quote
    const tBody = block.slice(tLinesStart, tEnd);
    const extra = patch.lines
      .map(l => `      ${JSON.stringify(l + "\n")} +`)
      .join("\n");
    // Existing final line has no trailing "\n" inside the quotes; add one.
    const patchedBody =
      tBody.replace(/"$/, '\\n" +') +
      "\n" +
      extra.replace(/ \+$/, "").replace(/\\n" \+$/, '\\n" +') +
      "";
    // Remove the trailing " +" from the very last appended line.
    const bodyLines = patchedBody.split("\n");
    const last = bodyLines.length - 1;
    bodyLines[last] = bodyLines[last].replace(/\\n" \+$/, '"').replace(/" \+$/, '"');
    block = block.slice(0, tLinesStart) + bodyLines.join("\n") + block.slice(tEnd);

    // --- questions: append new question objects ---
    const qClose = block.lastIndexOf("    ],");
    block = block.slice(0, qClose) + patch.questions.join("\n") + "\n" + block.slice(qClose);

    src = src.slice(0, idIdx) + block + src.slice(endIdx);
    changed++;
    console.log("patched", id, "in", file);
  }
  fs.writeFileSync(file, src);
}
console.log("sets patched:", changed);
