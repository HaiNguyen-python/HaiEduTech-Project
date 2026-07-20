/**
 * @file ieltsFullReadingExamsExpansion4.ts
 * @description Wave 4 - 5 new Cambridge-style IELTS Academic Reading passages
 * (rx-cam-7 … rx-cam-11). Each has ~13 questions across matching-headings,
 * multiple-choice and fill-blank types, mirroring real Cambridge IELTS papers.
 * @copyright 2026 HaiEduTech
 */
import type { ReadingExam } from "./ieltsFullReadingExams";

export const IELTS_FULL_READING_EXAMS_EXPANSION4: ReadingExam[] = [
  {
    id: "rx-cam-7",
    title: "Test 11 - The Rediscovery of Ancient Grains",
    level: "Medium",
    durationMinutes: 20,
    passageTitle: "The Rediscovery of Ancient Grains",
    passage:
`A. For most of the twentieth century, three cereals - wheat, rice and maize - supplied more than half of the calories consumed by the human species. Plant breeders concentrated on maximising the yield of a handful of high-performance varieties, and thousands of older, regional grains were quietly abandoned by farmers. By the 1980s, agronomists were warning that the global food system had become alarmingly narrow.

B. In recent decades, a small but influential group of chefs, nutritionists and seed banks has begun to reverse this trend. Grains once dismissed as "peasant food" - spelt, einkorn, teff, freekeh, sorghum, millet and amaranth - are now marketed as premium ingredients in bakeries and restaurants from Copenhagen to Melbourne. Sales of ancient grain products in North America alone tripled between 2013 and 2023.

C. The nutritional case for these grains is often overstated in advertising, but it is not without foundation. Many ancient varieties contain higher levels of protein, iron and dietary fibre than modern bread wheat, and some, such as teff, are naturally gluten-free. Independent laboratory analyses in Italy and Ethiopia have confirmed that a slice of wholegrain spelt bread carries roughly 20% more magnesium than a comparable slice made from conventional wheat.

D. From a farming perspective, the appeal is different. Ancient grains generally tolerate poor soils, drought and pest pressure better than modern hybrids, which have been bred to depend on regular fertiliser and irrigation. In Ethiopia, teff is grown across altitudes and climates where wheat simply will not thrive. In the Italian Alps, small farms have found that spelt requires roughly a third less fertiliser than conventional wheat.

E. Critics warn against romanticising the past. Yields from ancient grains are typically 20-40% lower than from modern cereals, meaning that a wholesale return to them would require significantly more farmland to feed the same number of people. Some researchers argue that the real value lies in cross-breeding: transferring drought or disease-tolerance genes from ancient varieties into high-yielding modern lines.

F. Seed banks have become quietly central to this work. The Svalbard Global Seed Vault, buried in Arctic permafrost, now holds samples of more than 1.2 million crop varieties, a substantial share of them ancient grains collected from smallholder farms. Without such collections, the genetic diversity built up by farmers over ten thousand years might disappear within a single generation.

G. The commercial revival of ancient grains has already changed rural economies in unexpected places. In parts of southern Italy that were experiencing rural depopulation, the return of durum wheat landraces has supported a small but visible wave of returning young farmers. Whether this niche demand can be scaled without diluting quality is the question now facing the sector.`,
    questions: [
      { number: 1, type: "matching-headings", prompt: "Choose the best heading for Paragraph A.",
        headings: [
          { label: "i", text: "A narrow modern food base" },
          { label: "ii", text: "Old grains return to fashion" },
          { label: "iii", text: "Genes worth preserving" },
          { label: "iv", text: "Farming in harsh conditions" },
        ], answer: "i" },
      { number: 2, type: "matching-headings", prompt: "Choose the best heading for Paragraph B.",
        headings: [
          { label: "i", text: "A narrow modern food base" },
          { label: "ii", text: "Old grains return to fashion" },
          { label: "iii", text: "The nutrition debate" },
          { label: "iv", text: "The seed vault" },
        ], answer: "ii" },
      { number: 3, type: "matching-headings", prompt: "Choose the best heading for Paragraph D.",
        headings: [
          { label: "i", text: "Farming in harsh conditions" },
          { label: "ii", text: "Cross-breeding as a compromise" },
          { label: "iii", text: "Rural revival" },
          { label: "iv", text: "Higher magnesium content" },
        ], answer: "i" },
      { number: 4, type: "matching-headings", prompt: "Choose the best heading for Paragraph E.",
        headings: [
          { label: "i", text: "Lower yields and a compromise" },
          { label: "ii", text: "A tripling of sales" },
          { label: "iii", text: "The Svalbard collection" },
          { label: "iv", text: "Italian rural revival" },
        ], answer: "i" },
      { number: 5, type: "matching-headings", prompt: "Choose the best heading for Paragraph F.",
        headings: [
          { label: "i", text: "The role of seed banks" },
          { label: "ii", text: "Southern Italian farms" },
          { label: "iii", text: "Better protein content" },
          { label: "iv", text: "Chefs lead the way" },
        ], answer: "i" },
      { number: 6, type: "multiple-choice", prompt: "By what factor did North American ancient-grain sales grow between 2013 and 2023?",
        options: ["Doubled", "Tripled", "Quadrupled", "Grew by 20%"],
        answer: "Tripled" },
      { number: 7, type: "multiple-choice", prompt: "Which grain does the passage identify as naturally gluten-free?",
        options: ["Spelt", "Einkorn", "Teff", "Freekeh"],
        answer: "Teff" },
      { number: 8, type: "multiple-choice", prompt: "According to the passage, wholegrain spelt bread contains roughly 20% more:",
        options: ["Protein", "Iron", "Magnesium", "Fibre"],
        answer: "Magnesium" },
      { number: 9, type: "multiple-choice", prompt: "What do critics say about ancient grains?",
        options: [
          "They cause allergies",
          "Their yields are typically 20-40% lower",
          "They cannot be stored",
          "They are less nutritious",
        ], answer: "Their yields are typically 20-40% lower" },
      { number: 10, type: "fill-blank", prompt: "The Svalbard Global Seed Vault holds more than ___ million crop varieties.", answer: "1.2" },
      { number: 11, type: "fill-blank", prompt: "In the Italian Alps, spelt requires around a ___ less fertiliser than modern wheat.", answer: "third" },
      { number: 12, type: "fill-blank", prompt: "Three cereals - wheat, rice and ___ - supplied over half of human calories.", answer: "maize" },
      { number: 13, type: "fill-blank", prompt: "The revival has supported returning young ___ in southern Italy.", answer: "farmers" },
    ],
  },

  {
    id: "rx-cam-8",
    title: "Test 12 - The Silent Language of Trees",
    level: "Hard",
    durationMinutes: 20,
    passageTitle: "The Silent Language of Trees",
    passage:
`A. For centuries, forests were regarded as collections of individual trees competing for light, water and nutrients. This view, deeply rooted in nineteenth-century biology, framed the forest as a slow-motion battle in which the fittest specimens survived. Recent research has forced a substantial revision of this picture.

B. The turning point came with the work of Canadian forest ecologist Suzanne Simard, whose experiments with radioactive carbon tracers in the 1990s showed that trees of different species were quietly exchanging sugars underground. The channel was not roots directly touching one another, but a vast, largely invisible network of soil fungi known as mycorrhizae, which link the fine roots of neighbouring trees.

C. In this "wood-wide web", larger, older trees - often called mother trees - typically send more carbon into the network than they receive, subsidising nearby saplings that are still too short to reach the canopy. In one striking study, mother trees were shown to preferentially channel resources to their own offspring, identified by shared root chemistry, over unrelated seedlings.

D. The mycorrhizal network appears to transmit more than carbon. Alarm signals, in the form of chemical messengers released after insect attack, can travel from a bitten tree to its neighbours, prompting them to raise defensive compounds in their own leaves before the herbivores arrive. Such findings have persuaded ecologists to describe forests as loose "communities" rather than mere assemblages.

E. The practical implications are significant. Conventional forestry, focused on maximising the growth of a single commercial species, often removes mother trees first as they represent the highest short-term timber value. Replacing them with young seedlings without the surrounding fungal network in place appears to slow recovery of the whole stand.

F. Not every scientist accepts every claim. Some critics argue that the strongest interpretations of the mother-tree story rest on a handful of experiments that have not always been easy to replicate. Others accept the general picture but caution against turning trees into anthropomorphic figures. The underlying biochemistry, they stress, does not require intent - only chemistry and evolution.

G. Even the most cautious researchers now agree, however, that a mature forest is more than the sum of its trees. Management policies in Germany, Canada and the UK have quietly begun to reflect this: retention forestry, in which patches of old trees and their fungal networks are deliberately preserved during logging, is becoming more common. The forest, it seems, is finally being heard.`,
    questions: [
      { number: 1, type: "matching-headings", prompt: "Choose the best heading for Paragraph A.",
        headings: [
          { label: "i", text: "A view of trees as rivals" },
          { label: "ii", text: "Radioactive tracers reveal sharing" },
          { label: "iii", text: "Beyond carbon: alarm signals" },
          { label: "iv", text: "A cautious note from critics" },
        ], answer: "i" },
      { number: 2, type: "matching-headings", prompt: "Choose the best heading for Paragraph B.",
        headings: [
          { label: "i", text: "A view of trees as rivals" },
          { label: "ii", text: "Radioactive tracers reveal sharing" },
          { label: "iii", text: "Mother trees favour their own" },
          { label: "iv", text: "The commercial cost of ignorance" },
        ], answer: "ii" },
      { number: 3, type: "matching-headings", prompt: "Choose the best heading for Paragraph D.",
        headings: [
          { label: "i", text: "Chemical warnings between trees" },
          { label: "ii", text: "The end of individual competition" },
          { label: "iii", text: "Roots touching directly" },
          { label: "iv", text: "New forestry policies" },
        ], answer: "i" },
      { number: 4, type: "matching-headings", prompt: "Choose the best heading for Paragraph E.",
        headings: [
          { label: "i", text: "Practical costs of removing mother trees" },
          { label: "ii", text: "The critics respond" },
          { label: "iii", text: "Radioactive experiments" },
          { label: "iv", text: "A shared community" },
        ], answer: "i" },
      { number: 5, type: "matching-headings", prompt: "Choose the best heading for Paragraph G.",
        headings: [
          { label: "i", text: "Retention forestry catches on" },
          { label: "ii", text: "Anthropomorphism warned against" },
          { label: "iii", text: "A wood-wide web" },
          { label: "iv", text: "Nineteenth-century biology" },
        ], answer: "i" },
      { number: 6, type: "multiple-choice", prompt: "What did Suzanne Simard use in her 1990s experiments?",
        options: ["Infrared cameras", "Radioactive carbon tracers", "Root-cutting", "Aerial photographs"],
        answer: "Radioactive carbon tracers" },
      { number: 7, type: "multiple-choice", prompt: "Mother trees preferentially channel resources to:",
        options: ["The tallest trees", "Any nearby seedling", "Their own offspring", "Rival species"],
        answer: "Their own offspring" },
      { number: 8, type: "multiple-choice", prompt: "Alarm signals travel through the network as:",
        options: ["Electrical pulses", "Chemical messengers", "Sound waves", "Water pressure"],
        answer: "Chemical messengers" },
      { number: 9, type: "multiple-choice", prompt: "What is a common critique of the mother-tree story?",
        options: [
          "It is politically motivated",
          "It rests on hard-to-replicate experiments",
          "It ignores climate change",
          "It only applies to tropical forests",
        ], answer: "It rests on hard-to-replicate experiments" },
      { number: 10, type: "fill-blank", prompt: "The underground fungal partners of tree roots are called ___.", answer: "mycorrhizae" },
      { number: 11, type: "fill-blank", prompt: "Journalists nicknamed the network the wood-___ web.", answer: "wide" },
      { number: 12, type: "fill-blank", prompt: "Neighbouring trees raise defensive ___ after receiving alarm signals.", answer: "compounds" },
      { number: 13, type: "fill-blank", prompt: "The forestry approach that preserves old trees during logging is called ___ forestry.", answer: "retention" },
    ],
  },

  {
    id: "rx-cam-9",
    title: "Test 13 - The Economics of Second-Hand Fashion",
    level: "Medium",
    durationMinutes: 20,
    passageTitle: "The Economics of Second-Hand Fashion",
    passage:
`A. For most of the twentieth century, buying used clothing carried a social stigma in wealthy countries. Charity shops and jumble sales served a small clientele of low-income shoppers and eccentric collectors. That picture has changed dramatically. Second-hand fashion is now one of the fastest-growing segments of the global apparel market, worth an estimated USD 197 billion in 2023, and forecast to overtake fast fashion in total value before 2030.

B. Several forces have combined to drive the change. Environmental concern about textile waste is the most cited: the fashion industry is responsible for roughly 8% of global carbon emissions and produces around 92 million tonnes of textile waste each year. Younger consumers, in particular, increasingly regard visible fast-fashion consumption as socially uncomfortable, in much the same way that visible fur once became.

C. Digital platforms have played an equally important role. Vinted, Depop and ThredUp have removed most of the practical inconveniences of buying second-hand: uncertainty about condition, difficulty of finding specific sizes, and the awkwardness of negotiating in person. Photographic listings, verified reviews and standardised shipping have turned resale into a smooth online experience roughly comparable to buying new.

D. Not everyone benefits equally from the boom. In several African countries that historically imported bulk second-hand clothes from Europe and North America, domestic textile industries have struggled to compete. Rwanda, Kenya and Uganda have all attempted at various points to restrict or tax such imports, arguing that a flood of cheap used garments undermines local jobs. The trade-off between environmental gains in one region and industrial losses in another remains politically sensitive.

E. Luxury resale has become a particularly active segment. Platforms specialising in verified designer goods, such as Vestiaire Collective and The RealReal, have grown rapidly by combining human authenticators with algorithmic price-setting. Second-hand handbags from certain heritage brands now command higher prices than the equivalent new items, a phenomenon that would have been unthinkable a generation ago.

F. The industry's environmental credentials, however, are not automatic. A dress bought used but worn only twice before disposal may have a larger carbon footprint per wear than a new dress worn fifty times. Researchers therefore emphasise that the environmental case for second-hand fashion depends heavily on how much a garment is actually used, not on where it was purchased.

G. Looking forward, the boundary between "new" and "used" is likely to blur further. Several major brands now operate their own resale platforms alongside their traditional retail channels, buying back their own products and reselling them at reduced prices. Whether this represents a genuine environmental shift or a sophisticated marketing exercise will be debated for years.`,
    questions: [
      { number: 1, type: "matching-headings", prompt: "Choose the best heading for Paragraph A.",
        headings: [
          { label: "i", text: "From stigma to mainstream" },
          { label: "ii", text: "Environmental and cultural drivers" },
          { label: "iii", text: "Luxury resale surges" },
          { label: "iv", text: "Second-hand imports and African industry" },
        ], answer: "i" },
      { number: 2, type: "matching-headings", prompt: "Choose the best heading for Paragraph B.",
        headings: [
          { label: "i", text: "Environmental and cultural drivers" },
          { label: "ii", text: "How platforms remove friction" },
          { label: "iii", text: "The paradox of low use" },
          { label: "iv", text: "Brands enter resale" },
        ], answer: "i" },
      { number: 3, type: "matching-headings", prompt: "Choose the best heading for Paragraph D.",
        headings: [
          { label: "i", text: "African textile industries under pressure" },
          { label: "ii", text: "Vestiaire and The RealReal" },
          { label: "iii", text: "How platforms remove friction" },
          { label: "iv", text: "Luxury resale prices" },
        ], answer: "i" },
      { number: 4, type: "matching-headings", prompt: "Choose the best heading for Paragraph F.",
        headings: [
          { label: "i", text: "Use is what matters" },
          { label: "ii", text: "African tariffs" },
          { label: "iii", text: "From stigma to mainstream" },
          { label: "iv", text: "Verified luxury goods" },
        ], answer: "i" },
      { number: 5, type: "matching-headings", prompt: "Choose the best heading for Paragraph G.",
        headings: [
          { label: "i", text: "Brands run their own resale" },
          { label: "ii", text: "African textile industries" },
          { label: "iii", text: "Environmental drivers" },
          { label: "iv", text: "Digital reviews change trust" },
        ], answer: "i" },
      { number: 6, type: "multiple-choice", prompt: "What was the estimated value of second-hand fashion in 2023?",
        options: ["USD 97 billion", "USD 150 billion", "USD 197 billion", "USD 300 billion"],
        answer: "USD 197 billion" },
      { number: 7, type: "multiple-choice", prompt: "According to the passage, the fashion industry is responsible for roughly what share of global carbon emissions?",
        options: ["3%", "5%", "8%", "15%"],
        answer: "8%" },
      { number: 8, type: "multiple-choice", prompt: "Which countries have attempted to restrict second-hand clothing imports?",
        options: [
          "France, Germany and Italy",
          "Rwanda, Kenya and Uganda",
          "China, India and Vietnam",
          "Brazil, Peru and Chile",
        ], answer: "Rwanda, Kenya and Uganda" },
      { number: 9, type: "multiple-choice", prompt: "What does the passage say about resale luxury handbags?",
        options: [
          "They are worth less than new ones",
          "They can command higher prices than new equivalents",
          "They are illegal in Europe",
          "They cannot be authenticated",
        ], answer: "They can command higher prices than new equivalents" },
      { number: 10, type: "fill-blank", prompt: "The fashion industry produces around ___ million tonnes of textile waste per year.", answer: "92" },
      { number: 11, type: "fill-blank", prompt: "Platforms such as Vinted, Depop and ___ have made second-hand shopping frictionless.", answer: "ThredUp" },
      { number: 12, type: "fill-blank", prompt: "Environmental benefits depend on how much a garment is actually ___.", answer: "used" },
      { number: 13, type: "fill-blank", prompt: "Second-hand fashion is forecast to overtake ___ fashion in value before 2030.", answer: "fast" },
    ],
  },

  {
    id: "rx-cam-10",
    title: "Test 14 - The Long History of Vaccination",
    level: "Hard",
    durationMinutes: 20,
    passageTitle: "The Long History of Vaccination",
    passage:
`A. Long before Edward Jenner's celebrated cowpox experiment of 1796, communities across the world had recognised that survivors of certain diseases rarely caught them a second time. In China, dried scabs from mild smallpox cases were being ground into powder and blown into the nostrils of healthy children as early as the sixteenth century, a practice known as variolation. Similar techniques were recorded in Ottoman Turkey, West Africa and India.

B. The results of variolation were mixed. Perhaps 1-2% of those inoculated died of the deliberately induced infection, but the resulting mortality rate was still far below that of naturally acquired smallpox, which could kill up to 30% of those it infected. In 1721, Lady Mary Wortley Montagu, having observed the practice in Constantinople, introduced it to England, where it was cautiously adopted by parts of the aristocracy and the royal family.

C. Jenner's contribution in 1796 was to show that inoculation with cowpox - a related but far milder disease that dairymaids frequently caught - could protect against smallpox without carrying the same risk of death. The word "vaccine" itself derives from the Latin vacca, meaning cow. Within two decades, the technique had spread across Europe and, by the middle of the nineteenth century, laws requiring routine infant vaccination were being adopted in several countries.

D. The nineteenth century also saw the emergence of the first organised anti-vaccination movements, particularly in Britain. Objectors argued that compulsion violated bodily autonomy and religious conscience, and that state medicine amounted to an overreach of government power. Some of these arguments would echo strongly across the following two centuries.

E. The transformation of vaccinology accelerated in the twentieth century with the identification of the microbes responsible for individual diseases. Vaccines for diphtheria, tetanus, whooping cough, polio, measles and rubella were successively developed, and by the early 1980s the World Health Organization was able to declare smallpox eradicated - the first, and so far the only, human disease to be eliminated through deliberate action.

F. Progress has not been uniform. Vaccines against malaria and tuberculosis have proved far harder to develop, partly because these pathogens have evolved sophisticated ways of evading the immune system. The COVID-19 pandemic demonstrated both the astonishing speed at which new vaccines can now be brought to market, using mRNA technology, and the persistent fragility of public trust when they are.

G. Historians of medicine tend to caution against triumphalist narratives. Every wave of vaccination has been shadowed by scepticism, and the reasons for that scepticism have varied enormously - from genuine early risks, through religious objection, to modern misinformation. The technology has changed profoundly; the social conversation surrounding it has changed rather less.`,
    questions: [
      { number: 1, type: "matching-headings", prompt: "Choose the best heading for Paragraph A.",
        headings: [
          { label: "i", text: "Immunity noticed before Jenner" },
          { label: "ii", text: "Jenner and the milkmaids" },
          { label: "iii", text: "A cautious social conversation" },
          { label: "iv", text: "Mixed results of variolation" },
        ], answer: "i" },
      { number: 2, type: "matching-headings", prompt: "Choose the best heading for Paragraph B.",
        headings: [
          { label: "i", text: "Immunity noticed before Jenner" },
          { label: "ii", text: "Mixed results of variolation" },
          { label: "iii", text: "The birth of the modern vaccine" },
          { label: "iv", text: "Early anti-vaccine movements" },
        ], answer: "ii" },
      { number: 3, type: "matching-headings", prompt: "Choose the best heading for Paragraph C.",
        headings: [
          { label: "i", text: "The birth of the modern vaccine" },
          { label: "ii", text: "Twentieth-century breakthroughs" },
          { label: "iii", text: "Malaria and TB remain hard" },
          { label: "iv", text: "Compulsion and its critics" },
        ], answer: "i" },
      { number: 4, type: "matching-headings", prompt: "Choose the best heading for Paragraph D.",
        headings: [
          { label: "i", text: "Compulsion and its critics" },
          { label: "ii", text: "Smallpox eradicated" },
          { label: "iii", text: "mRNA arrives" },
          { label: "iv", text: "Variolation reaches England" },
        ], answer: "i" },
      { number: 5, type: "matching-headings", prompt: "Choose the best heading for Paragraph E.",
        headings: [
          { label: "i", text: "Twentieth-century breakthroughs" },
          { label: "ii", text: "Ancient practices in China" },
          { label: "iii", text: "A cautious social conversation" },
          { label: "iv", text: "Cowpox as a substitute" },
        ], answer: "i" },
      { number: 6, type: "multiple-choice", prompt: "In sixteenth-century China, dried scabs were used by:",
        options: [
          "Injecting them into the arm",
          "Blowing the powder into the nostrils",
          "Adding them to drinking water",
          "Applying them to open wounds",
        ], answer: "Blowing the powder into the nostrils" },
      { number: 7, type: "multiple-choice", prompt: "Who introduced variolation to England in 1721?",
        options: [
          "Edward Jenner",
          "Louis Pasteur",
          "Lady Mary Wortley Montagu",
          "Florence Nightingale",
        ], answer: "Lady Mary Wortley Montagu" },
      { number: 8, type: "multiple-choice", prompt: "Which was the first and, so far, only disease to be eradicated in humans?",
        options: ["Polio", "Measles", "Smallpox", "Diphtheria"],
        answer: "Smallpox" },
      { number: 9, type: "multiple-choice", prompt: "According to the passage, which two diseases have proved especially hard to vaccinate against?",
        options: [
          "Measles and rubella",
          "Malaria and tuberculosis",
          "Polio and mumps",
          "Cholera and typhoid",
        ], answer: "Malaria and tuberculosis" },
      { number: 10, type: "fill-blank", prompt: "The word vaccine derives from the Latin ___, meaning cow.", answer: "vacca" },
      { number: 11, type: "fill-blank", prompt: "Untreated smallpox could kill up to ___% of those it infected.", answer: "30" },
      { number: 12, type: "fill-blank", prompt: "COVID-19 vaccines used the new ___ technology to reach market rapidly.", answer: "mRNA" },
      { number: 13, type: "fill-blank", prompt: "Jenner's cowpox experiment took place in the year ___.", answer: "1796" },
    ],
  },

  {
    id: "rx-cam-11",
    title: "Test 15 - The Quiet Revolution of Electric Bicycles",
    level: "Medium",
    durationMinutes: 20,
    passageTitle: "The Quiet Revolution of Electric Bicycles",
    passage:
`A. The electric bicycle is, in engineering terms, an unremarkable machine: a conventional bicycle to which a small electric motor and a rechargeable battery have been added. Yet in cities from Amsterdam to Shenzhen, this modest device is quietly reshaping urban transport in ways that noisier and more expensive technologies have failed to achieve.

B. Global sales of electric bicycles now exceed those of electric cars by a factor of roughly four to one. In 2023, industry analysts estimated that more than 50 million e-bikes were sold worldwide, compared with around 14 million electric cars. The gap is even wider in unit terms for private transport in Chinese cities, where an established fleet of shared and privately owned e-bikes has been operating for over a decade.

C. Their appeal is easy to explain. A modern e-bike allows a rider to cover eight or ten kilometres of city distance in roughly the same time as a car during peak-hour congestion, without arriving out of breath. Batteries recharge from a standard household socket for pennies rather than pounds, and legal top speeds in most jurisdictions - typically 25 km/h in the European Union - keep insurance and licensing requirements minimal.

D. For older riders, the small motor is transformative. Studies from the Netherlands and Denmark have shown that cyclists over sixty are considerably more likely to keep riding into their seventies and eighties if they switch to an e-bike, extending independent mobility by years. Physiotherapists have begun recommending e-bikes as a low-impact alternative to conventional exercise for patients recovering from joint injuries.

E. The environmental case is more nuanced than early advertising suggested. Producing an e-bike battery does carry a modest carbon cost, and the electricity used for charging is only as clean as the local grid. Even so, life-cycle analyses agree that e-bikes emit roughly 10-15 grams of carbon dioxide per kilometre, compared with roughly 200 grams for a typical small car - a reduction of well over 90%.

F. Regulation has struggled to keep pace with innovation. Powerful "throttle" e-bikes, capable of reaching 45 km/h, sit awkwardly between traditional bicycles and mopeds, and different jurisdictions have taken very different views on whether they belong on cycle paths, roads or neither. Fire risks from cheap, uncertified lithium-ion batteries have also prompted new safety regulations in London, New York and elsewhere.

G. The most important effect of the e-bike may prove to be political. As soon as significant numbers of voters commute by bicycle, demand for safer cycle infrastructure grows in a way that no environmental report can match. Cities that have installed protected lanes have consistently reported both rising cycling rates and falling fatalities. In the medium term, the electric bicycle may do more to reshape urban streets than any single policy initiative.`,
    questions: [
      { number: 1, type: "matching-headings", prompt: "Choose the best heading for Paragraph A.",
        headings: [
          { label: "i", text: "A simple machine with outsized impact" },
          { label: "ii", text: "Sales far outpace electric cars" },
          { label: "iii", text: "Fire risk and regulation" },
          { label: "iv", text: "Environmental fine print" },
        ], answer: "i" },
      { number: 2, type: "matching-headings", prompt: "Choose the best heading for Paragraph B.",
        headings: [
          { label: "i", text: "A simple machine with outsized impact" },
          { label: "ii", text: "Sales far outpace electric cars" },
          { label: "iii", text: "Older riders stay mobile" },
          { label: "iv", text: "Reshaping urban politics" },
        ], answer: "ii" },
      { number: 3, type: "matching-headings", prompt: "Choose the best heading for Paragraph D.",
        headings: [
          { label: "i", text: "Older riders stay mobile" },
          { label: "ii", text: "The regulatory grey zone" },
          { label: "iii", text: "Chinese fleets lead the way" },
          { label: "iv", text: "Recharging costs" },
        ], answer: "i" },
      { number: 4, type: "matching-headings", prompt: "Choose the best heading for Paragraph E.",
        headings: [
          { label: "i", text: "Environmental fine print" },
          { label: "ii", text: "The commuter's friend" },
          { label: "iii", text: "Political pressure on cities" },
          { label: "iv", text: "Older riders stay mobile" },
        ], answer: "i" },
      { number: 5, type: "matching-headings", prompt: "Choose the best heading for Paragraph G.",
        headings: [
          { label: "i", text: "Reshaping urban politics" },
          { label: "ii", text: "Regulation catches up" },
          { label: "iii", text: "A simple machine with outsized impact" },
          { label: "iv", text: "The commuter's friend" },
        ], answer: "i" },
      { number: 6, type: "multiple-choice", prompt: "According to the passage, in 2023 e-bikes outsold electric cars by roughly:",
        options: ["Two to one", "Three to one", "Four to one", "Ten to one"],
        answer: "Four to one" },
      { number: 7, type: "multiple-choice", prompt: "In the European Union, the typical legal top speed for an e-bike is:",
        options: ["15 km/h", "20 km/h", "25 km/h", "45 km/h"],
        answer: "25 km/h" },
      { number: 8, type: "multiple-choice", prompt: "Studies from the Netherlands and Denmark show that older cyclists on e-bikes:",
        options: [
          "Ride less than younger cyclists",
          "Are more likely to keep riding into their seventies and eighties",
          "Suffer more falls",
          "Prefer cars to bicycles",
        ], answer: "Are more likely to keep riding into their seventies and eighties" },
      { number: 9, type: "multiple-choice", prompt: "The main risk that has prompted new safety regulations in London and New York is:",
        options: [
          "Speeding on cycle paths",
          "Fires from uncertified lithium-ion batteries",
          "Uninsured drivers",
          "Air pollution from motors",
        ], answer: "Fires from uncertified lithium-ion batteries" },
      { number: 10, type: "fill-blank", prompt: "E-bikes emit roughly 10-15 grams of ___ dioxide per kilometre.", answer: "carbon" },
      { number: 11, type: "fill-blank", prompt: "A typical small car emits around ___ grams per kilometre, by contrast.", answer: "200" },
      { number: 12, type: "fill-blank", prompt: "More than ___ million e-bikes were sold worldwide in 2023.", answer: "50" },
      { number: 13, type: "fill-blank", prompt: "Protected cycle ___ correlate with rising cycling and falling fatalities.", answer: "lanes" },
    ],
  },
];
