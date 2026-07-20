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

F. The labour-market implications are still being worked out. The International Labour Organization estimates that the global energy transition could create as many as 24 million new jobs by 2030 - in solar installation, wind turbine maintenance, grid engineering and battery manufacturing - while displacing around 6 million workers in coal, oil and gas. Whether this turns out to be a net positive in any given country depends heavily on retraining programmes and on whether new green jobs are located in the same regions as the old fossil-fuel ones.

G. Looking forward, most independent forecasters now agree that the share of electricity generated from renewables will continue to climb rapidly. The disagreement is about pace and politics, not direction. Even oil majors that long downplayed the energy transition have begun to publish scenarios in which fossil-fuel demand peaks within the next decade. The remaining question is whether governments, utilities and households can move fast enough on storage, grid upgrades and demand management to convert that potential into reality.`,

  "rx-2": `

F. The cultural framing of sleep has also shifted. Where once the popular image of the successful executive included a four-hour-a-night schedule, leading business publications now routinely profile chief executives who prioritise eight hours and use sleep-tracking devices. Athletes and elite musicians have followed a similar trajectory, with sleep extension now considered a basic component of high-performance training rather than a luxury.

G. Researchers caution, however, against treating sleep purely as an optimisation problem. Obsessive tracking of every metric can itself disturb rest, a phenomenon clinicians have begun calling "orthosomnia" - anxiety about not sleeping perfectly. Most sleep scientists now advise focusing on simple, sustainable habits rather than on chasing nightly perfection: regular bed and wake times, exposure to morning daylight, and an unhurried wind-down routine.

H. Children and adolescents remain a particular concern. Teenagers' natural circadian rhythms shift later during puberty, meaning that early school start times conflict directly with their biology. Numerous studies have linked chronic adolescent sleep loss to higher rates of depression, lower academic achievement and a measurable increase in road accidents involving young drivers. The growing list of school districts moving to later start times reflects a slow but real translation of this research into policy.`,

  "rx-3": `

F. The bicycle's impact on women's lives in the late nineteenth century was particularly dramatic. As the historian Susan B. Anthony famously remarked, the bicycle "did more to emancipate women than anything else in the world." It demanded practical clothing, undermining the rigid Victorian wardrobe; it offered independent mobility without a chaperone; and it gave women a public, athletic identity that society had previously denied them.

G. In the early twentieth century the bicycle was rapidly overshadowed in wealthy countries by the motor car, but it never disappeared. In the Netherlands and Denmark, deliberate post-war planning decisions kept cycling at the heart of urban transport, creating today's enviable networks of protected lanes. Elsewhere, the bicycle survived primarily as a children's toy and a tool for couriers, rather than as serious transport for adults.

H. The twenty-first century has brought an unexpected revival. Cities from Paris to Bogotá have built hundreds of kilometres of new cycle lanes, often by repurposing road space taken from cars during the pandemic. Electric bicycles have widened the appeal still further, removing the barriers of hills, distance and physical fitness. For the first time in a century, the bicycle is once again being treated by mainstream planners as a central rather than marginal mode of urban transport.`,

  "rx-4": `

E. Coral bleaching, now familiar from news reports, is the visible signature of reefs in distress. When sea temperatures rise even one or two degrees above the long-term average for an extended period, corals expel the symbiotic algae that give them both their colour and most of their food. If conditions return to normal quickly the corals can recover; if not, they starve. Repeat bleaching events have struck the Great Barrier Reef four times since 2016, a frequency considered unprecedented in the geological record.

F. Yet not all reefs respond identically. Field studies in the central Pacific have identified individual colonies that survive temperatures lethal to their neighbours, apparently thanks to particular strains of symbiotic algae or to inherited heat-tolerance genes. This natural variation is now the basis of "assisted evolution" programmes, in which scientists selectively breed heat-tolerant corals in nurseries and outplant them onto degraded reefs.

G. Restoration alone, however, cannot keep pace with the rate of loss. Most marine biologists agree that the long-term survival of coral reefs depends on cutting global greenhouse-gas emissions quickly enough to limit further ocean warming. Local actions - reducing pollution, protecting fish stocks, banning destructive fishing gear - can buy reefs valuable decades, but no amount of local management can compensate indefinitely for a warming sea.`,

  "rx-5": `

E. The environmental implications are less clear-cut than they first appear. Eliminating long commutes does reduce transport emissions, but those savings are partially offset by higher household energy use and by employees relocating to larger, more carbon-intensive homes further from city centres. Net effects depend heavily on local energy mixes and on how often workers still visit the office.

F. For employers, the management challenge has shifted from monitoring presence to designing meaningful outputs. The most successful remote organisations have moved towards written, asynchronous communication; they document decisions thoroughly; and they invest deliberately in occasional in-person gatherings that compensate for the loss of casual office contact. Companies that have simply tried to replicate the office on Zoom report higher rates of burnout and lower engagement than companies that have rethought the work itself.

G. The longer-term geographic consequences are still unfolding. Mid-sized cities and smaller towns that can offer affordable housing, fast internet and good schools have begun to attract significant numbers of remote workers, easing pressure on the most expensive metropolitan areas. Whether this constitutes a durable rebalancing of population, or simply a temporary shift, will depend on how flexibly employers, planners and infrastructure providers respond over the coming decade.`,

  "rx-cam-1": `

F. The economic costs of widespread sleep loss have begun to attract serious analysis. A frequently cited RAND Corporation study estimated that insufficient sleep cost the United States economy up to USD 411 billion annually in lost productivity, with Japan and the United Kingdom showing comparable per-capita figures. Such headline numbers should be treated cautiously, but the broad direction - that chronic short sleep is a measurable drag on national economies - is no longer seriously disputed.

G. The pharmaceutical response has been mixed. Sales of sleep medication have grown steadily, yet most sleep specialists discourage long-term reliance on hypnotic drugs, citing limited gains in objectively measured sleep quality and significant risks of dependence. Cognitive behavioural therapy for insomnia, which targets the thoughts and behaviours that maintain poor sleep, now has a stronger evidence base than any drug for chronic insomnia and is increasingly recommended as first-line treatment.

H. None of this means that individuals are powerless. The same surveys that document widespread sleep loss also show that people who follow even a handful of basic habits - consistent timing, a dark and cool bedroom, limited evening caffeine and a wind-down routine - report substantially better sleep within a few weeks. As one researcher put it, "Sleep is one of the few areas of health where the cheapest, simplest interventions also happen to be the most effective."`,

  "rx-cam-2": `

F. Public perception of indoor produce has also evolved. Early surveys suggested consumers were sceptical of vegetables grown without soil and natural sunlight, but more recent research finds that pesticide-free certification, traceable supply chains and visibly fresh appearance can outweigh these concerns. Supermarket trials in Japan and Singapore have repeatedly shown that consumers will pay a modest premium for produce labelled as locally grown and chemical-free.

G. Investment patterns have followed this changing perception. Between 2019 and 2024, venture capital flowing into vertical farming startups exceeded USD 4 billion, with notable funding rounds for operators in the United States, the Netherlands and the UAE. Several high-profile bankruptcies during the same period, however, served as a reminder that the underlying economics remain delicate: rising electricity prices and over-ambitious expansion plans have already pushed some early leaders out of business.

H. Looking ahead, the most credible projections see vertical farming becoming a meaningful but specialised part of the global food system. As renewable electricity becomes both cheaper and more abundant, the cost basis for indoor agriculture should improve. The most likely outcome is a hybrid model in which traditional field agriculture continues to supply the bulk of the world's calories, while vertical farms increasingly provide the perishable, high-value produce that benefits most from being grown close to its consumers.`,

  "rx-cam-3": `

F. The financial calculation behind electric buses has shifted decisively over the last decade. Although a battery-electric bus can still cost thirty to fifty per cent more to buy than a diesel equivalent, operators typically recoup the difference within six to eight years through lower fuel and maintenance bills. Electric motors have far fewer moving parts than internal-combustion engines, and regenerative braking dramatically reduces wear on brake pads in the stop-start environment of city driving.

G. Charging strategy has emerged as a defining choice for transit authorities. Overnight depot charging is simplest and cheapest, but it forces operators to buy larger, heavier batteries so each bus can complete a full day of service on a single charge. Opportunity charging, in which buses receive short high-power top-ups at end-of-line stops, allows smaller batteries and lighter vehicles but requires substantial investment in on-street infrastructure.

H. The public-health argument may ultimately prove as important as the climate one. Diesel buses idling at busy stops have historically been significant sources of the fine particulate matter now linked to respiratory disease, cardiovascular problems and impaired cognitive development in children. City-level studies from London and Los Angeles have already shown measurable drops in roadside pollution along corridors converted to electric operation, offering a rare policy win that is both visible to voters and defensible on strict cost-benefit grounds.`,

  "rx-cam-4": `

F. Behind the visible growth in cycling lies a quieter revolution in street engineering. Modern protected lanes, separated from motor traffic by kerbs or planters, produce cycling rates several times higher than painted lines on the road. Junction design has proved equally decisive: countries that have widely adopted "Dutch-style" intersections, in which cyclists cross ahead of turning cars, consistently record lower rates of serious collisions.

G. Cycling has also become a tool of economic policy. Retailers along newly pedestrianised or cycle-friendly streets in Paris, New York and Seoul have generally reported higher, not lower, footfall and turnover after initial adjustment periods, contradicting the fear that removing car parking would harm local business. Property values along well-designed cycle corridors have followed a similar upward trend.

H. Electric-assist bicycles have widened the demographic reach of cycling further than any policy measure alone could. Older commuters, parents carrying children and workers arriving at meetings without wanting to change clothes now form a visible share of urban cyclists in the leading cycling cities. In several European countries, sales of electric bicycles have already overtaken sales of conventional models, a symbolic tipping point that would have seemed implausible a decade ago.`,

  "rx-cam-5": `

F. The reintroduction of large predators has not been without controversy. Livestock farmers in Alpine valleys, Scandinavian forests and remote Iberian regions have organised sustained protests, arguing that compensation schemes rarely cover the full economic and psychological cost of losing animals. Governments have responded with a patchwork of measures including subsidised guarding dogs, electric fences and, in a few countries, tightly controlled culling quotas.

G. Ecologists point out that wolves rarely act alone in reshaping landscapes. Their return has been most visible where deer and wild-boar populations had grown far beyond historical densities, damaging young forests and farmland. By exerting a persistent pressure on those populations, wolves indirectly support tree regeneration, songbird diversity and even river-bank stability in the way famously documented in Yellowstone National Park.

H. Public attitudes have shifted more quickly than many observers expected. Surveys across France, Germany and Poland now show consistent majority support for the presence of wolves in principle, even in rural regions, though acceptance falls sharply among those directly affected by livestock losses. The long-term future of Europe's wolves is therefore likely to depend less on biology than on the political skill with which governments manage conflict at the local level.`,

  "rx-cam-6": `

F. Coffee's transformation from luxury to daily habit shaped labour patterns as much as diets. In the industrialising cities of the nineteenth century, caffeinated workers stayed alert through long factory shifts that would once have been broken by long midday rests. Employers recognised the pattern, and the institution of the "coffee break" became formalised in the early twentieth century, first in Scandinavian offices and then internationally.

G. The economics of the modern coffee trade are unusually concentrated. A handful of trading houses handle the bulk of the world's exported beans, while retail prices are set thousands of miles from the farms that produced them. Fair-trade and direct-trade movements have grown as a response, promising higher and more predictable prices to small growers, though independent studies suggest the benefits vary considerably from cooperative to cooperative.

H. Climate change now poses perhaps the most serious threat to coffee production in its long history. Rising temperatures are pushing the optimal growing zone for arabica coffee to higher altitudes, squeezing producers in Central America and East Africa in particular. Research institutes are racing to breed heat- and disease-resistant varieties, but the changes underway may still force a significant relocation of production over the coming decades.`,

  "rx-cam-7": `

F. Nutritional research has helped to explain the renewed interest in ancient grains. Compared with modern refined wheat, varieties such as spelt, emmer and einkorn tend to be richer in protein, minerals and certain B vitamins, and their more complex gluten structure appears easier to digest for some people who otherwise struggle with modern bread. These qualities have made ancient grains particularly attractive to artisan bakers targeting health-conscious urban consumers.

G. The economics for farmers remain challenging. Yields per hectare are typically lower than for modern wheat, and specialised milling equipment is often needed to process husked ancient grains efficiently. Where cooperatives have managed to combine longer contracts, price premiums and shared processing facilities, however, ancient grains have proved a viable niche crop and a useful diversification in the face of increasingly volatile commodity markets.

H. Ancient grains have also become a marker in a wider cultural debate about food identity. In several Mediterranean regions, growers argue that reviving traditional varieties is not only economically sensible but a way of protecting a form of regional heritage that industrial agriculture had come close to erasing altogether.`,

  "rx-cam-8": `

F. The idea that trees "communicate" has captured public imagination, but scientists continue to debate exactly what the underground signals mean. Some researchers describe the mycorrhizal network as a genuine cooperative system, in which older, larger trees actively subsidise younger neighbours. Others caution that most of the observed transfers may simply reflect chemical gradients rather than anything resembling intent, and that the popular metaphor of a "wood-wide web" risks running well ahead of the evidence.

G. Whatever their exact mechanism, these networks have practical implications for forestry. Selective logging that leaves the oldest and largest trees standing appears to preserve far more of the underground infrastructure than clear-cutting, which severs most of the fungal connections at once. Foresters trained in the new ecology increasingly design harvests around retaining these "mother trees" as biological anchors for the recovering stand.

H. Beyond the forestry sector, the discovery of tree-to-tree signalling has fed a broader public re-evaluation of what forests are for. Where once they were counted almost exclusively as sources of timber, they are now widely valued for the invisible services they provide - carbon storage, watershed protection and the complex ecological life beneath the soil that scientists are only beginning to describe.`,

  "rx-cam-9": `

F. The economics of second-hand fashion have been transformed by online resale platforms. Sites and apps that authenticate, photograph and ship pre-owned garments have made it feasible for casual sellers to reach an international audience, and have created liquid resale markets even for mid-range brands that would once have ended up in charity shops or landfills.

G. Environmental analysts stress that the sustainability case for second-hand clothing depends on what it displaces. A well-worn coat bought instead of a new one clearly reduces demand for virgin materials, but researchers have begun documenting a "rebound" pattern in which some shoppers use their resale earnings to buy still more clothing overall. Net environmental benefits are therefore easier to demonstrate in aggregate than at the level of any individual wardrobe.

H. Traditional retailers have moved from resisting the trend to embracing it. Several major brands now operate their own resale channels, offering customers store credit in exchange for returned garments and repackaging the result as a form of loyalty programme. Whether this represents a genuine break with fast-fashion logic, or simply a more sophisticated way of encouraging continued consumption, remains a matter of active debate among sustainability researchers.`,

  "rx-cam-10": `

F. The twentieth century transformed vaccination from a single procedure against smallpox into a coordinated global programme against dozens of diseases. Childhood schedules that once seemed impossibly ambitious - covering diphtheria, tetanus, whooping cough, polio, measles, mumps and rubella - became routine in wealthy countries within a few decades, and were gradually extended to lower-income countries through UNICEF and, later, Gavi, the Vaccine Alliance.

G. Public trust in vaccines has never been uniform. Even in the earliest days of smallpox inoculation, religious, political and pseudo-scientific arguments were mobilised against the procedure. Modern vaccine hesitancy draws on some of the same rhetorical patterns, amplified by social media and reinforced by legitimate concerns about the pace of pharmaceutical decision-making. Public-health officials increasingly stress that responding to hesitancy requires listening to specific local worries rather than dismissing critics as irrational.

H. The Covid-19 pandemic served as both a triumph and a stress-test for the field. Multiple effective vaccines were developed, tested and deployed in under a year, an achievement without precedent in medical history. At the same time, sharp inequities in global distribution and heated political disputes over mandates highlighted the extent to which vaccination remains as much a social and political enterprise as a scientific one.`,

  "rx-cam-11": `

F. The safety record of electric bicycles has attracted growing attention as their numbers rise. Faster average speeds mean that collisions, when they occur, tend to be more serious than those involving conventional bicycles, and helmet-use campaigns aimed specifically at e-bike riders are becoming more common. Regulators in several countries have responded by capping motor assistance at 25 kilometres per hour and requiring insurance for the fastest speed-pedelec category.

G. Battery-related risks have proved a second area of concern. A small but well-publicised number of fires involving low-quality lithium-ion packs, particularly in delivery-worker communities where high-capacity aftermarket batteries are common, has pushed cities such as New York to introduce mandatory certification standards for batteries sold within their limits.

H. Despite these challenges, planners see electric bicycles as one of the most promising tools for reducing urban car use. Modelling studies commissioned by several European cities suggest that even a modest continued growth in e-bike ownership could displace millions of car trips per year, lowering both emissions and congestion while extending the practical reach of cycling to a much broader share of the population.`,
};
