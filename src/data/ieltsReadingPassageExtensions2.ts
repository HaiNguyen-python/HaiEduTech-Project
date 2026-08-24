/**
 * @file ieltsReadingPassageExtensions2.ts
 * @description Wave 7 depth extensions. Adds two further academic paragraphs to
 *   each legacy passage that still fell below the Cambridge length band, so that
 *   every passage in the library reaches roughly 700 words with the register,
 *   qualification and counter-argument of a real IELTS Academic text.
 *   Merged at load time after READING_PASSAGE_EXTENSIONS.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export const READING_PASSAGE_EXTENSIONS_2: Record<string, string> = {
  "rx-1": `

H. Grid architecture has emerged as the constraint that costs are least able to solve on their own. A solar farm can be built in eighteen months; the transmission line required to move its output to a city may take a decade to permit. Analysts at several system operators now report interconnection queues in which the capacity awaiting connection exceeds the capacity already installed, and the delay is administrative rather than technical. Where reform has been attempted, chiefly by allowing projects to share a single connection or by charging developers for the studies they trigger, waiting times have fallen without any new hardware being built.

I. There is also a measurement problem that complicates public argument. Comparisons of generating cost usually quote the levelised cost of energy, which divides lifetime expenditure by lifetime output and therefore treats a kilowatt-hour delivered at midday as equivalent to one delivered at dusk. For a system with little storage this understates the value of dispatchable plant and overstates the value of intermittent supply. Economists have proposed value-adjusted measures that price output according to when it arrives, and on those measures the advantage of renewables narrows, though it does not disappear, as their share of a market rises.`,

  "rx-2": `

I. The mechanisms linking short sleep to physical illness are now partly understood, and they are not confined to fatigue. Restriction to five hours a night for a week measurably impairs glucose tolerance in healthy young adults, producing values that in a clinic would prompt investigation for pre-diabetes, and the effect reverses when normal sleep is restored. Appetite regulation shifts in the same direction, with higher circulating ghrelin and lower leptin, which is consistent with the modest but repeated association between short sleep and weight gain in population studies.

J. Whether the association runs in the direction usually assumed remains disputed. Pain, anxiety and untreated respiratory disorders all shorten sleep, so a study that finds poor sleepers less healthy has not thereby shown that sleep loss caused the illness. The most persuasive evidence therefore comes from experiments in which sleep is manipulated deliberately and from natural experiments such as the shift to later school start times, where the exposure changes for reasons unconnected with the health of the individuals affected. Both lines of evidence support a causal role, but they describe effects smaller than the more confident popular accounts imply.`,

  "rx-3": `

I. The bicycle also altered the economics of the towns it passed through, in ways local historians have documented in detail. Rural cycling clubs of the 1890s created the first significant demand for roadside refreshment, for printed route maps and for surfaced minor roads, and the pressure groups they formed were the direct ancestors of the motoring associations that later campaigned for tarmac. It is one of the ironies of transport history that the lobbying which produced smooth roads for cyclists produced the conditions in which the motor car could displace them.

J. Contemporary policy debate turns less on the machine than on the space it requires. Studies of cities that have built protected lanes consistently find that use rises steeply once a network, rather than an isolated route, is complete, since a cyclist requires safety along an entire journey and will abandon a trip that includes one hostile junction. This threshold effect explains why modest investment often appears to fail: a fragmentary network carries little traffic and is then judged unnecessary, while the same expenditure concentrated on a connected corridor can shift a measurable share of commuting within a few years.`,

  "rx-4": `

H. Reef accretion is best understood as a balance rather than a process of simple growth. Corals and coralline algae add calcium carbonate; boring sponges, urchins and parrotfish continuously remove it, and a healthy reef sits only slightly on the positive side of that ledger. This is why relatively small reductions in growth rate can turn a reef from a structure that keeps pace with rising sea level into one that erodes, and why surveys now report net carbonate loss on reefs that still look superficially intact. The visible cover of living coral is a poor guide to whether the framework beneath it is being built or dismantled.

I. Ocean chemistry adds a second pressure that bleaching statistics do not capture. As seawater absorbs carbon dioxide its pH falls and the concentration of carbonate ions available for skeleton formation declines, so that the same coral must spend more energy to deposit the same amount of skeleton. Laboratory work suggests the effect on adult colonies is modest compared with heat stress, but the larval and juvenile stages appear considerably more sensitive, which matters because recovery after a bleaching event depends entirely on the survival of new recruits.`,

  "rx-5": `

H. The productivity evidence remains contested for a reason that is methodological rather than ideological. Most early studies compared workers who chose to work remotely with those who did not, a design that cannot separate the effect of the arrangement from the characteristics of the people selecting it. The small number of randomised trials, including a well known experiment at a Chinese travel agency, found modest gains in output and a substantial fall in attrition, but they examined narrowly defined tasks whose results are hard to generalise to collaborative or creative work.

I. What has changed most is the geography of labour markets rather than the volume of work performed. Firms recruiting for remote roles draw candidates from a national rather than a metropolitan pool, which raises competition for each vacancy while widening the range of employers available to a worker in a smaller city. Early evidence suggests this compresses wage differences between regions and puts upward pressure on housing costs in places that were previously insulated from them, so that the benefits of the arrangement are distributed unevenly and not always to the people it was expected to help.`,

  "rx-cam-1": `

I. Sleep architecture changes with age in ways that are often mistaken for insomnia. The proportion of deep slow-wave sleep declines from adolescence onwards, so that a healthy person of seventy obtains substantially less of it than the same person did at twenty, and night-time waking becomes more frequent. Clinicians distinguish this normal change from a disorder by asking about daytime consequences rather than about hours recorded, since a shorter and lighter night that leaves the person alert requires reassurance rather than medication.

J. Treatment practice has moved accordingly. Cognitive behavioural therapy for insomnia, which combines restriction of time in bed with the correction of unhelpful beliefs about sleep, now outperforms hypnotic drugs in trials over periods longer than a few weeks, and its effects persist after the course ends while those of medication do not. The obstacle to wider use is supply: the therapy requires several sessions with a trained practitioner, and the shortage of practitioners has driven interest in digital versions whose results, while promising, are weaker than those delivered in person.`,

  "rx-cam-2": `

I. The energy accounting behind vertical farming deserves closer attention than it usually receives. A field crop is grown with sunlight that arrives free; an indoor crop is grown with electricity, and the conversion from grid power through a light emitting diode into plant tissue is efficient by the standards of horticultural lighting but poor by comparison with a photon that fell on a leaf without being generated. This is why the economics of the sector track the price of electricity more closely than the price of land, and why the operations that have survived tend to be those sited where power is cheap and clean.

J. Crop choice follows from the same arithmetic. Leafy greens and herbs are viable because they are light, quick to mature, sold fresh at a premium and largely edible, so that little of the energy invested is discarded. Wheat, rice and potatoes fail every one of those tests, and no serious analysis proposes growing staples indoors. The realistic contribution of the sector to food security is therefore not the replacement of arable farming but the local supply of perishable produce to cities that currently import it over long distances.`,

  "rx-cam-3": `

I. The financial obstacle to electrification has been less the vehicle than the depot. A diesel bus is refuelled in minutes from infrastructure the operator already owns; a battery fleet requires a substantial grid connection, chargers, and often a rebuilt yard, and the connection is frequently the item with the longest lead time and the least predictable cost. Cities that treated the change as a procurement exercise for vehicles have repeatedly found buses standing idle while the electrical work was completed.

J. Operational experience has also refined the engineering. Early fleets suffered from range estimates derived from steady-speed testing, which flattered the vehicles because urban duty cycles involve constant acceleration and, in cold climates, cabin heating drawn from the same battery. Operators now specify range at the coldest expected temperature with heating in use, a figure typically a third below the headline number. Opportunity charging at termini, using high-power connections during scheduled layovers, has emerged as the compromise that allows smaller and lighter batteries without the loss of a service.`,

  "rx-cam-4": `

I. The health case for cycling has been examined carefully because it involves a genuine trade-off. Cyclists inhale more air per kilometre than motorists and are exposed to a higher risk of collision, so a complete assessment must weigh those costs against the benefit of daily physical activity. Studies conducted in several European cities have concluded that the benefit exceeds the combined costs by roughly an order of magnitude at present levels of air quality and infrastructure, but the margin narrows sharply where pollution is severe or protected routes absent, which is precisely where the intervention is most often proposed.

J. Distributional questions have moved to the centre of the debate. Cycling investment has historically been concentrated in central districts, where trips are short and the political constituency is organised, while the households most dependent on cheap transport live further out and cycle least. Several cities have responded by prioritising outer radial corridors and by subsidising cycle purchase for low-income residents, on the argument that a network which serves only the commuting patterns of the affluent will reproduce the inequalities of the system it replaces.`,

  "rx-cam-5": `

I. Compensation schemes have proved to be the decisive instrument, and their design matters more than their generosity. Payments made only for carcasses that can be positively identified as wolf kills exclude the larger part of the real loss, since scavengers remove evidence quickly and animals that scatter may die unfound. Schemes that pay instead for demonstrated prevention, funding electric fencing and guardian dogs whether or not an attack has occurred, have achieved better outcomes at similar cost and, importantly, have shifted the farmer's incentive from documenting damage to avoiding it.

J. The ecological claims made for wolves have meanwhile been trimmed by further research. The much cited account of Yellowstone, in which returning wolves reduced elk browsing and thereby restored willow and beaver, has been shown to involve several other changes occurring simultaneously, including drought, bear predation and human hunting. Most ecologists now describe the wolf as one influence among several rather than the engine of a cascade, a more modest claim that is also more defensible when a landowner asks what the animal is for.`,

  "rx-cam-6": `

I. The economics of the crop have always been uncomfortable for the people who grow it. Coffee is a perennial requiring three to four years from planting before first harvest, which makes supply slow to respond to price and produces the long cycles familiar from commodity markets: a period of high prices prompts planting, the planting matures together, and the resulting glut depresses prices for years. Because the growers are numerous and unorganised while the roasters are few, the share of the retail price reaching the farm has remained a small fraction of the total throughout the modern period.

J. Certification schemes were designed to correct this and have had measurable but limited effects. Evaluations generally find modest income gains for certified households, concentrated among those who were already better organised and better capitalised, and little effect on the poorest producers who cannot meet the standards or afford the audit. Climate projections complicate the picture further: the area suitable for arabica cultivation is expected to contract substantially by mid-century, and adaptation, whether by moving uphill, shading with trees or switching varieties, requires exactly the investment that low farm-gate prices prevent.`,

  "rx-cam-7": `

I. Nutritional claims for ancient grains have proved harder to substantiate than their marketing suggests. Whole grains of any species are, as a class, richer in fibre and micronutrients than refined flour, and much of the measured advantage of an ancient variety disappears once the comparison is made against modern wheat consumed whole rather than as white bread. Where genuine differences exist, as in the higher protein content of certain emmer and spelt lines or the amino acid profile of quinoa, they are matters of degree rather than of kind.

J. Agronomy provides a better argument. Landrace and minor species tend to be more variable genetically, which lowers yield in a good year but makes a crop failure less likely in a poor one, and several perform acceptably on soils and rainfall regimes where modern high-input varieties do not. In regions facing more erratic seasons this insurance value may matter more than absolute output, and it has prompted breeding programmes that aim to transfer such traits into commercial varieties rather than to expand the cultivation of the ancient ones themselves.`,

  "rx-cam-8": `

I. The most contested element of the argument is not whether trees are connected but what the connection is for. Fungi that link roots are themselves organisms with interests, obtaining carbon from the plants they colonise, and a network that moves resources between trees may be doing so because it benefits the fungus rather than because the trees cooperate. Several researchers have pointed out that transfers measured with isotope tracers are small relative to a tree's total budget, and that flows towards seedlings are as consistent with fungal foraging as with anything resembling parental support.

J. The dispute matters for forestry practice, which is where the science is increasingly cited. Recommendations to retain mature trees at harvest, to avoid deep soil disturbance and to favour mixed species stands are well supported by ordinary silvicultural evidence about seed sources, water retention and pest resistance, and they do not depend on the stronger claims about communication. Presenting them as consequences of a contested hypothesis risks tying sound management to a theory that may yet be revised.`,

  "rx-cam-9": `

I. The environmental case for second-hand clothing rests on displacement, and displacement is difficult to demonstrate. A garment bought used avoids the manufacture of a new one only if it substitutes for that purchase, and survey evidence suggests that a substantial share of second-hand buying is additional consumption rather than replacement, encouraged by low prices and the entertainment of the search. On that basis the sector's benefit is real but smaller than its own estimates, which typically assume complete substitution.

J. The export trade raises separate questions. A large fraction of clothing donated in high-income countries is baled and shipped to markets in West Africa and South Asia, where it supports substantial employment in sorting, repair and resale while competing with local manufacturing and generating waste that local systems cannot absorb. Import restrictions introduced by several East African governments were criticised abroad and defended at home as industrial policy, and the episode illustrates that a flow described as recycling in one country is a trade dispute in another.`,

  "rx-cam-10": `

I. Vaccination has always depended on a logistical achievement as much as a scientific one. A vaccine that requires storage at low temperature must be moved from factory to clinic through an unbroken chain of refrigeration, and in much of the world the last stage of that chain is a container of ice packs carried by a health worker on foot. Estimates of wastage attributable to temperature failure have run to a substantial share of doses distributed, which is why heat-stable formulations and simple electronic indicators that record whether a vial has been exposed have had effects on coverage comparable to improvements in the vaccines themselves.

J. Hesitancy, meanwhile, has been studied enough to correct some early assumptions about it. It is not well predicted by education or by scientific literacy, it varies sharply between vaccines within the same population, and it responds poorly to the provision of additional information. What does predict acceptance is the recommendation of a familiar clinician and the ease of obtaining the injection, findings that have shifted programme design away from campaigns of persuasion and towards the removal of practical obstacles.`,

  "rx-cam-11": `

I. Electric assistance changes the geometry of a city rather than merely the effort of a journey. Because a rider maintains speed on gradients and against wind, the distance that can be covered in a given time roughly doubles, and surveys of new owners consistently show trips replacing car journeys of five to fifteen kilometres, a band in which conventional cycling was rare and public transport often indirect. The effect on commuting distance is large enough that planners have begun to model catchment areas for stations and workplaces differently.

J. Two problems have accompanied the growth. The first is safety: higher average speeds among riders who are on average older change the pattern of injury, and infrastructure designed for a cyclist travelling at fifteen kilometres an hour performs poorly at twenty-five. The second is fire risk from lithium batteries, which has prompted restrictions on charging in shared residential buildings in several cities after a series of serious incidents traced largely to damaged cells and uncertified aftermarket chargers rather than to the machines as sold.`,
};
