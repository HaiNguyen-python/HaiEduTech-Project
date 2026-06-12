/**
 * @file ieltsFullReadingExamsExpansion3.ts
 * @description Wave 3 - 2 more Cambridge-style IELTS Academic Reading
 * exams (rx-cam-5, rx-cam-6). Every question has been fact-checked
 * line-by-line against the passage. MCQ `answer` is a string copied
 * verbatim from `options`; fill-blank `answer` is the exact word from
 * the passage (max 2 words / a number).
 *
 * @copyright 2026 HaiEduTech
 */
import type { ReadingExam } from "./ieltsFullReadingExams";

export const IELTS_FULL_READING_EXAMS_EXPANSION3: ReadingExam[] = [
  {
    id: "rx-cam-5",
    title: "Test 9 - The Return of the Wolf to European Forests",
    level: "Medium",
    durationMinutes: 20,
    passageTitle: "The Return of the Wolf to European Forests",
    passage:
`A. For more than a century, the grey wolf was effectively absent from most of Western Europe. Sustained hunting, government bounty schemes and the conversion of forest into farmland reduced the continent's wolf population to a handful of isolated pockets in remote mountain regions such as the Apennines in Italy and the Cantabrian range in Spain. By the 1970s, ecologists openly feared the species would never recover.

B. The turning point came with formal legal protection. The 1979 Bern Convention listed the wolf as a strictly protected species across most member states, and the 1992 European Union Habitats Directive reinforced these safeguards. Crucially, the directive also required member states to maintain a "favourable conservation status" for listed species, which forced governments to plan in terms of population recovery rather than mere survival.

C. The recovery has been faster than almost anyone predicted. From the surviving Italian and Iberian strongholds, wolves have steadily expanded northwards. Germany recorded its first reproducing pack in 2000, after more than 150 years of absence; today the country has more than 160 packs. France, Belgium, the Netherlands and Denmark have all reported returning wolves within the past decade.

D. The driving forces behind the comeback are not only legal. The widespread abandonment of remote farmland after the Second World War allowed forests to regrow, restoring suitable habitat for large mammals. Populations of wild prey such as red deer and wild boar have also recovered strongly, in some regions reaching levels not seen since the Middle Ages.

E. Not everyone welcomes the wolf's return. Sheep farmers in the Alps and the Pyrenees have reported rising losses to wolf attacks, and political pressure to relax protection has grown. The European Commission proposed in 2023 to downgrade the wolf's status from "strictly protected" to "protected", a change that would allow controlled hunting in any member state that requested it.

F. Conservationists argue that the right response is better coexistence rather than fewer wolves. Tools such as electric fencing, livestock guardian dogs and rapid compensation schemes have all been shown to cut livestock losses sharply where they are properly funded. Whether Europe can sustain its newly recovered wolf population is likely to depend less on biology and more on whether rural communities feel adequately supported.`,
    questions: [
      { number: 1, type: "matching-headings", prompt: "Choose the best heading for Paragraph A.",
        headings: [
          { label: "i", text: "A century of near-disappearance" },
          { label: "ii", text: "A legal turning point" },
          { label: "iii", text: "Faster than ecologists predicted" },
          { label: "iv", text: "The case for coexistence" },
        ], answer: "i" },
      { number: 2, type: "matching-headings", prompt: "Choose the best heading for Paragraph B.",
        headings: [
          { label: "i", text: "Forces beyond the law" },
          { label: "ii", text: "Legal protection as the turning point" },
          { label: "iii", text: "Sheep farmers push back" },
          { label: "iv", text: "Abandoned farmland regrows" },
        ], answer: "ii" },
      { number: 3, type: "matching-headings", prompt: "Choose the best heading for Paragraph C.",
        headings: [
          { label: "i", text: "Rapid northward recovery" },
          { label: "ii", text: "Italian and Iberian origins" },
          { label: "iii", text: "EU compensation schemes" },
          { label: "iv", text: "The Bern Convention explained" },
        ], answer: "i" },
      { number: 4, type: "matching-headings", prompt: "Choose the best heading for Paragraph D.",
        headings: [
          { label: "i", text: "Habitat and prey return" },
          { label: "ii", text: "Political backlash in Europe" },
          { label: "iii", text: "Hunting bans in detail" },
          { label: "iv", text: "Mountain refuges in the 1970s" },
        ], answer: "i" },
      { number: 5, type: "matching-headings", prompt: "Choose the best heading for Paragraph E.",
        headings: [
          { label: "i", text: "Farmer opposition and an EU response" },
          { label: "ii", text: "Better coexistence in practice" },
          { label: "iii", text: "Recovery in Germany" },
          { label: "iv", text: "The 1992 directive" },
        ], answer: "i" },
      { number: 6, type: "multiple-choice", prompt: "By which decade did ecologists openly fear the wolf would never recover?",
        options: ["1950s", "1970s", "1980s", "1990s"],
        answer: "1970s" },
      { number: 7, type: "multiple-choice", prompt: "When did Germany record its first reproducing wolf pack again?",
        options: ["1992", "2000", "2010", "2018"],
        answer: "2000" },
      { number: 8, type: "multiple-choice", prompt: "What did the European Commission propose in 2023?",
        options: ["Ban wolf hunting entirely", "Downgrade the wolf from 'strictly protected' to 'protected'", "Restore farmland in the Alps", "Remove all wolf protection"],
        answer: "Downgrade the wolf from 'strictly protected' to 'protected'" },
      { number: 9, type: "fill-blank", prompt: "The 1979 ___ Convention first listed the wolf as strictly protected.", answer: "Bern" },
      { number: 10, type: "fill-blank", prompt: "Today Germany has more than ___ wolf packs.", answer: "160" },
      { number: 11, type: "fill-blank", prompt: "After World War II, abandoned farmland allowed ___ to regrow.", answer: "forests" },
      { number: 12, type: "fill-blank", prompt: "Conservationists promote electric fencing and livestock guardian ___.", answer: "dogs" },
      { number: 13, type: "multiple-choice", prompt: "According to the writer, the long-term future of the wolf depends mainly on:",
        options: ["military protection", "support from rural communities", "reintroducing prey species", "banning sheep farming"],
        answer: "support from rural communities" },
    ],
  },

  {
    id: "rx-cam-6",
    title: "Test 10 - How Coffee Reshaped the World",
    level: "Medium",
    durationMinutes: 20,
    passageTitle: "How Coffee Reshaped the World",
    passage:
`A. Coffee is now the world's second most-traded commodity by value, surpassed only by oil, yet its rise from a regional drink to a global staple is barely four centuries old. The plant was first cultivated systematically in the highlands of Yemen in the fifteenth century, where Sufi monasteries used the brew to stay alert during long nights of prayer.

B. From Yemen, coffee spread quickly through the Ottoman Empire. The first dedicated coffee house opened in Istanbul in 1554, and within fifty years similar establishments could be found from Cairo to Damascus. These spaces became known as "schools of the wise" because customers would debate news, politics and poetry there for hours on end.

C. Coffee reached Western Europe in the seventeenth century, mainly through Venetian merchants. Once again, the coffee house played a transformative role: London alone had more than 500 of them by 1700. They functioned as informal news exchanges, and several major institutions, including the insurance market Lloyd's of London, trace their origins to gatherings in specific coffee houses.

D. The colonial era industrialised coffee production. Dutch traders smuggled live coffee plants out of Yemen in the late seventeenth century and established plantations in Java; the French and Portuguese followed with operations in the Caribbean and Brazil. By the early nineteenth century, Brazil alone supplied more than a third of the world's coffee.

E. This expansion came at a heavy human cost. Coffee plantations relied extensively on enslaved labour for almost two centuries, and even after abolition the conditions of workers on many estates remained extremely poor. Modern Fairtrade certification, introduced in the late 1980s, was a direct attempt to address the long-standing gap between the price of beans paid to farmers and the price of coffee paid by consumers.

F. The twenty-first century has brought a fresh wave of change. Climate scientists warn that rising temperatures could halve the area suitable for high-quality Arabica beans by 2050, pushing cultivation to ever higher altitudes and threatening livelihoods in many traditional producing countries. The story of coffee, which began as a niche religious drink, may well end as one of the clearest tests of how the world responds to climate change.`,
    questions: [
      { number: 1, type: "matching-headings", prompt: "Choose the best heading for Paragraph A.",
        headings: [
          { label: "i", text: "Origins in Yemen's highlands" },
          { label: "ii", text: "Spread through the Ottoman Empire" },
          { label: "iii", text: "Colonial plantations and slavery" },
          { label: "iv", text: "The threat of climate change" },
        ], answer: "i" },
      { number: 2, type: "matching-headings", prompt: "Choose the best heading for Paragraph B.",
        headings: [
          { label: "i", text: "London's 500 coffee houses" },
          { label: "ii", text: "Coffee houses as 'schools of the wise'" },
          { label: "iii", text: "Fairtrade certification explained" },
          { label: "iv", text: "Brazil's nineteenth-century dominance" },
        ], answer: "ii" },
      { number: 3, type: "matching-headings", prompt: "Choose the best heading for Paragraph C.",
        headings: [
          { label: "i", text: "Coffee arrives in Western Europe" },
          { label: "ii", text: "Plantations in Java" },
          { label: "iii", text: "The role of Sufi monks" },
          { label: "iv", text: "Climate-driven migration of crops" },
        ], answer: "i" },
      { number: 4, type: "matching-headings", prompt: "Choose the best heading for Paragraph D.",
        headings: [
          { label: "i", text: "Industrialisation under colonial rule" },
          { label: "ii", text: "Enslaved labour and abolition" },
          { label: "iii", text: "The rise of Lloyd's of London" },
          { label: "iv", text: "Coffee culture in Istanbul" },
        ], answer: "i" },
      { number: 5, type: "matching-headings", prompt: "Choose the best heading for Paragraph E.",
        headings: [
          { label: "i", text: "The human cost of expansion" },
          { label: "ii", text: "Coffee reaches Venice" },
          { label: "iii", text: "Yemeni monasteries reconsidered" },
          { label: "iv", text: "Adapting to climate change" },
        ], answer: "i" },
      { number: 6, type: "multiple-choice", prompt: "Coffee is now the world's ___ most-traded commodity by value.",
        options: ["first", "second", "third", "fifth"],
        answer: "second" },
      { number: 7, type: "multiple-choice", prompt: "In which year did the first dedicated coffee house open in Istanbul?",
        options: ["1453", "1554", "1654", "1700"],
        answer: "1554" },
      { number: 8, type: "multiple-choice", prompt: "How many coffee houses did London alone have by 1700?",
        options: ["more than 100", "more than 250", "more than 500", "more than 1,000"],
        answer: "more than 500" },
      { number: 9, type: "fill-blank", prompt: "Dutch traders established the first colonial coffee plantations in ___.", answer: "Java" },
      { number: 10, type: "fill-blank", prompt: "By the early 19th century, ___ alone supplied more than a third of the world's coffee.", answer: "Brazil" },
      { number: 11, type: "fill-blank", prompt: "Fairtrade certification was introduced in the late ___.", answer: "1980s" },
      { number: 12, type: "fill-blank", prompt: "Climate change could halve the area suitable for high-quality ___ beans by 2050.", answer: "Arabica" },
      { number: 13, type: "multiple-choice", prompt: "The writer suggests coffee's future will be shaped most strongly by:",
        options: ["religious traditions", "colonial trade patterns", "climate change", "new technology"],
        answer: "climate change" },
    ],
  },
];
