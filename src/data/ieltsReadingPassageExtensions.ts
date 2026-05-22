/**
 * @file ieltsReadingPassageExtensions.ts
 * @description Extends the base IELTS reading passages with additional
 * paragraphs so each passage reaches a length closer to a real Cambridge
 * IELTS Academic Reading passage (~700–900 words). Stored separately so
 * the original data file stays readable. Merged at load time by the page.
 */

export const READING_PASSAGE_EXTENSIONS: Record<string, string> = {
  "rx-1": `

E. The geographic distribution of new renewable capacity is also striking. China and India together accounted for more than half of all solar installations in 2023, while the United States and the European Union are racing to scale up domestic supply chains in response to concerns about energy independence. In Africa, decentralised solar mini-grids are now bringing electricity to villages that traditional grids never reached, leapfrogging the fossil-fuel era in much the same way mobile phones leapfrogged landlines.

F. The labour-market implications are still being worked out. The International Labour Organization estimates that the global energy transition could create as many as 24 million new jobs by 2030 — in solar installation, wind turbine maintenance, grid engineering and battery manufacturing — while displacing around 6 million workers in coal, oil and gas. Whether this turns out to be a net positive in any given country depends heavily on retraining programmes and on whether new green jobs are located in the same regions as the old fossil-fuel ones.

G. Looking forward, most independent forecasters now agree that the share of electricity generated from renewables will continue to climb rapidly. The disagreement is about pace and politics, not direction. Even oil majors that long downplayed the energy transition have begun to publish scenarios in which fossil-fuel demand peaks within the next decade. The remaining question is whether governments, utilities and households can move fast enough on storage, grid upgrades and demand management to convert that potential into reality.`,

  "rx-2": `

F. The cultural framing of sleep has also shifted. Where once the popular image of the successful executive included a four-hour-a-night schedule, leading business publications now routinely profile chief executives who prioritise eight hours and use sleep-tracking devices. Athletes and elite musicians have followed a similar trajectory, with sleep extension now considered a basic component of high-performance training rather than a luxury.

G. Researchers caution, however, against treating sleep purely as an optimisation problem. Obsessive tracking of every metric can itself disturb rest, a phenomenon clinicians have begun calling "orthosomnia" — anxiety about not sleeping perfectly. Most sleep scientists now advise focusing on simple, sustainable habits rather than on chasing nightly perfection: regular bed and wake times, exposure to morning daylight, and an unhurried wind-down routine.

H. Children and adolescents remain a particular concern. Teenagers' natural circadian rhythms shift later during puberty, meaning that early school start times conflict directly with their biology. Numerous studies have linked chronic adolescent sleep loss to higher rates of depression, lower academic achievement and a measurable increase in road accidents involving young drivers. The growing list of school districts moving to later start times reflects a slow but real translation of this research into policy.`,

  "rx-3": `

F. The bicycle's impact on women's lives in the late nineteenth century was particularly dramatic. As the historian Susan B. Anthony famously remarked, the bicycle "did more to emancipate women than anything else in the world." It demanded practical clothing, undermining the rigid Victorian wardrobe; it offered independent mobility without a chaperone; and it gave women a public, athletic identity that society had previously denied them.

G. In the early twentieth century the bicycle was rapidly overshadowed in wealthy countries by the motor car, but it never disappeared. In the Netherlands and Denmark, deliberate post-war planning decisions kept cycling at the heart of urban transport, creating today's enviable networks of protected lanes. Elsewhere, the bicycle survived primarily as a children's toy and a tool for couriers, rather than as serious transport for adults.

H. The twenty-first century has brought an unexpected revival. Cities from Paris to Bogotá have built hundreds of kilometres of new cycle lanes, often by repurposing road space taken from cars during the pandemic. Electric bicycles have widened the appeal still further, removing the barriers of hills, distance and physical fitness. For the first time in a century, the bicycle is once again being treated by mainstream planners as a central rather than marginal mode of urban transport.`,

  "rx-4": `

E. Coral bleaching, now familiar from news reports, is the visible signature of reefs in distress. When sea temperatures rise even one or two degrees above the long-term average for an extended period, corals expel the symbiotic algae that give them both their colour and most of their food. If conditions return to normal quickly the corals can recover; if not, they starve. Repeat bleaching events have struck the Great Barrier Reef four times since 2016, a frequency considered unprecedented in the geological record.

F. Yet not all reefs respond identically. Field studies in the central Pacific have identified individual colonies that survive temperatures lethal to their neighbours, apparently thanks to particular strains of symbiotic algae or to inherited heat-tolerance genes. This natural variation is now the basis of "assisted evolution" programmes, in which scientists selectively breed heat-tolerant corals in nurseries and outplant them onto degraded reefs.

G. Restoration alone, however, cannot keep pace with the rate of loss. Most marine biologists agree that the long-term survival of coral reefs depends on cutting global greenhouse-gas emissions quickly enough to limit further ocean warming. Local actions — reducing pollution, protecting fish stocks, banning destructive fishing gear — can buy reefs valuable decades, but no amount of local management can compensate indefinitely for a warming sea.`,

  "rx-5": `

E. The environmental implications are less clear-cut than they first appear. Eliminating long commutes does reduce transport emissions, but those savings are partially offset by higher household energy use and by employees relocating to larger, more carbon-intensive homes further from city centres. Net effects depend heavily on local energy mixes and on how often workers still visit the office.

F. For employers, the management challenge has shifted from monitoring presence to designing meaningful outputs. The most successful remote organisations have moved towards written, asynchronous communication; they document decisions thoroughly; and they invest deliberately in occasional in-person gatherings that compensate for the loss of casual office contact. Companies that have simply tried to replicate the office on Zoom report higher rates of burnout and lower engagement than companies that have rethought the work itself.

G. The longer-term geographic consequences are still unfolding. Mid-sized cities and smaller towns that can offer affordable housing, fast internet and good schools have begun to attract significant numbers of remote workers, easing pressure on the most expensive metropolitan areas. Whether this constitutes a durable rebalancing of population, or simply a temporary shift, will depend on how flexibly employers, planners and infrastructure providers respond over the coming decade.`,

  "rx-cam-1": `

F. The economic costs of widespread sleep loss have begun to attract serious analysis. A frequently cited RAND Corporation study estimated that insufficient sleep cost the United States economy up to USD 411 billion annually in lost productivity, with Japan and the United Kingdom showing comparable per-capita figures. Such headline numbers should be treated cautiously, but the broad direction — that chronic short sleep is a measurable drag on national economies — is no longer seriously disputed.

G. The pharmaceutical response has been mixed. Sales of sleep medication have grown steadily, yet most sleep specialists discourage long-term reliance on hypnotic drugs, citing limited gains in objectively measured sleep quality and significant risks of dependence. Cognitive behavioural therapy for insomnia, which targets the thoughts and behaviours that maintain poor sleep, now has a stronger evidence base than any drug for chronic insomnia and is increasingly recommended as first-line treatment.

H. None of this means that individuals are powerless. The same surveys that document widespread sleep loss also show that people who follow even a handful of basic habits — consistent timing, a dark and cool bedroom, limited evening caffeine and a wind-down routine — report substantially better sleep within a few weeks. As one researcher put it, "Sleep is one of the few areas of health where the cheapest, simplest interventions also happen to be the most effective."`,

  "rx-cam-2": `

F. Public perception of indoor produce has also evolved. Early surveys suggested consumers were sceptical of vegetables grown without soil and natural sunlight, but more recent research finds that pesticide-free certification, traceable supply chains and visibly fresh appearance can outweigh these concerns. Supermarket trials in Japan and Singapore have repeatedly shown that consumers will pay a modest premium for produce labelled as locally grown and chemical-free.

G. Investment patterns have followed this changing perception. Between 2019 and 2024, venture capital flowing into vertical farming startups exceeded USD 4 billion, with notable funding rounds for operators in the United States, the Netherlands and the UAE. Several high-profile bankruptcies during the same period, however, served as a reminder that the underlying economics remain delicate: rising electricity prices and over-ambitious expansion plans have already pushed some early leaders out of business.

H. Looking ahead, the most credible projections see vertical farming becoming a meaningful but specialised part of the global food system. As renewable electricity becomes both cheaper and more abundant, the cost basis for indoor agriculture should improve. The most likely outcome is a hybrid model in which traditional field agriculture continues to supply the bulk of the world's calories, while vertical farms increasingly provide the perishable, high-value produce that benefits most from being grown close to its consumers.`,
};
