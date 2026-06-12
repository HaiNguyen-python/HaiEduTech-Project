/**
 * @file ieltsFullReadingExamsExpansion2.ts
 * @description Wave 2 — 2 additional Cambridge-style IELTS Academic
 * Reading exams (rx-cam-3, rx-cam-4). Each has 13 questions across all
 * three legacy types (matching-headings, multiple-choice, fill-blank)
 * and is fact-checked against the passage line-by-line for logic.
 *
 * @copyright 2026 HaiEduTech
 */
import type { ReadingExam } from "./ieltsFullReadingExams";

export const IELTS_FULL_READING_EXAMS_EXPANSION2: ReadingExam[] = [
  {
    id: "rx-cam-3",
    title: "Test 7 - The Quiet Revolution of Electric Buses",
    level: "Medium",
    durationMinutes: 20,
    passageTitle: "The Quiet Revolution of Electric Buses",
    passage:
`A. Public transport has long been promoted as the most realistic answer to urban air pollution, yet for decades the buses themselves were part of the problem. Older diesel fleets emitted significant amounts of nitrogen oxides and fine particles, both of which are linked to respiratory illness in dense neighbourhoods. The arrival of mass-produced electric buses, first in China in the early 2010s and now across Europe and Latin America, is quietly reshaping that picture.

B. The leading example is the city of Shenzhen, which by 2018 had become the first major city in the world to electrify its entire public bus fleet of more than 16,000 vehicles. Transport officials reported a measurable drop in roadside levels of nitrogen oxides within two years of the changeover, although other policies such as restrictions on private cars also contributed.

C. Cost has been the central obstacle elsewhere. An electric bus typically costs around 30 per cent more to purchase than a diesel equivalent, even though the running cost per kilometre is significantly lower. To bridge this gap, several European cities have turned to leasing arrangements in which the battery, the most expensive single component, is owned separately and replaced on a fixed schedule.

D. Infrastructure has been the second major hurdle. Cities such as Bogota and Santiago have invested heavily in depot-based overnight charging, while London has experimented with smaller "opportunity charging" stations at the end of selected routes. Engineers point out that the choice between the two approaches depends heavily on local geography and grid capacity, and there is no single solution suitable for every city.

E. Critics caution that electric buses are not automatically green. The environmental benefit depends on how the electricity itself is generated. In regions where the grid still relies heavily on coal, the lifetime carbon savings can be modest. Even so, most independent studies conclude that the air-quality benefits at street level are substantial in every case, since emissions are at least removed from the immediate environment of pedestrians and cyclists.

F. Looking ahead, manufacturers expect the purchase-price gap to close by around 2027 as battery production scales further. If forecasts hold, electric buses will then become the cheaper option over their lifetime in almost every major market, accelerating a transition that is already well underway.`,
    questions: [
      { number: 1, type: "matching-headings", prompt: "Choose the best heading for Paragraph A.",
        headings: [
          { label: "i", text: "The infrastructure puzzle" },
          { label: "ii", text: "Older buses were part of the pollution problem" },
          { label: "iii", text: "The world's first all-electric city fleet" },
          { label: "iv", text: "Future cost trends" },
        ], answer: "ii" },
      { number: 2, type: "matching-headings", prompt: "Choose the best heading for Paragraph B.",
        headings: [
          { label: "i", text: "Shenzhen as a flagship case" },
          { label: "ii", text: "Doubts about real benefits" },
          { label: "iii", text: "Leasing the battery separately" },
          { label: "iv", text: "Overnight versus opportunity charging" },
        ], answer: "i" },
      { number: 3, type: "matching-headings", prompt: "Choose the best heading for Paragraph C.",
        headings: [
          { label: "i", text: "The upfront cost barrier" },
          { label: "ii", text: "Grid dependence" },
          { label: "iii", text: "Closing the price gap by 2027" },
          { label: "iv", text: "Pollution and public health" },
        ], answer: "i" },
      { number: 4, type: "matching-headings", prompt: "Choose the best heading for Paragraph D.",
        headings: [
          { label: "i", text: "Two competing charging models" },
          { label: "ii", text: "Battery leasing in Europe" },
          { label: "iii", text: "Doubts about green claims" },
          { label: "iv", text: "The role of private cars" },
        ], answer: "i" },
      { number: 5, type: "multiple-choice", prompt: "Why were older diesel buses considered part of the pollution problem?",
        options: ["They were too quiet to be noticed", "They emitted nitrogen oxides and fine particles linked to respiratory illness", "They were too expensive for most cities", "They had short service lives"],
        answer: "They emitted nitrogen oxides and fine particles linked to respiratory illness" },
      { number: 6, type: "multiple-choice", prompt: "By what year had Shenzhen electrified its entire public bus fleet?",
        options: ["2012", "2015", "2018", "2020"],
        answer: "2018" },
      { number: 7, type: "multiple-choice", prompt: "Roughly how much more expensive is an electric bus to purchase than a diesel equivalent?",
        options: ["About 5% more", "About 15% more", "About 30% more", "About 70% more"],
        answer: "About 30% more" },
      { number: 8, type: "multiple-choice", prompt: "Which city has experimented with 'opportunity charging' stations at the ends of selected routes?",
        options: ["Bogota", "Santiago", "London", "Shenzhen"],
        answer: "London" },
      { number: 9, type: "fill-blank", prompt: "Battery leasing helps cities because the battery is the most expensive single ___.", answer: "component" },
      { number: 10, type: "fill-blank", prompt: "Where the grid relies heavily on ___, lifetime carbon savings may be modest.", answer: "coal" },
      { number: 11, type: "fill-blank", prompt: "Independent studies say air-quality benefits at ___ level are substantial in every case.", answer: "street" },
      { number: 12, type: "fill-blank", prompt: "Manufacturers expect the price gap to close by around ___.", answer: "2027" },
      { number: 13, type: "multiple-choice", prompt: "Which statement best reflects the writer's overall view?",
        options: ["Electric buses are flawless", "Electric buses will probably remain niche", "Electric buses are imperfect but represent a clear net improvement", "Electric buses should be banned in coal-reliant regions"],
        answer: "Electric buses are imperfect but represent a clear net improvement" },
    ],
  },

  {
    id: "rx-cam-4",
    title: "Test 8 - Why Cities Rediscovered the Bicycle",
    level: "Medium",
    durationMinutes: 20,
    passageTitle: "Why Cities Rediscovered the Bicycle",
    passage:
`A. For most of the twentieth century, the bicycle was treated as a children's toy or a hobby. Urban planning in Europe and North America was dominated by the private car, and entire neighbourhoods were redesigned around wide roads and large parking facilities. Cycling was often seen as something that adults grew out of when they could afford a vehicle of their own.

B. The first cracks in that consensus appeared during the oil crisis of the mid-1970s. Faced with sudden fuel shortages, cities such as Amsterdam and Copenhagen began experimenting with protected bike lanes and lower urban speed limits. What started as an emergency response gradually became a long-term planning principle, partly because the experiments coincided with sharp falls in road deaths.

C. The benefits go well beyond emissions. A growing body of medical research links regular cycling to lower rates of cardiovascular disease, type-2 diabetes and certain cancers. A long-term study in Glasgow tracking more than 250,000 commuters found that those who cycled to work had a 45 per cent lower risk of developing heart disease than colleagues who travelled by car.

D. Economists have also begun to take notice. Studies in Berlin and Seville suggest that streets redesigned to favour cyclists and pedestrians see retail sales rise rather than fall, contradicting earlier fears from shopkeepers. Customers, it turns out, tend to visit more often and spend more in total even though each individual visit is smaller.

E. Critics argue that the cycling revival mainly benefits wealthier residents who can afford to live near city centres. There is some evidence for this concern: in many cities, cycle networks expanded earliest in the most affluent districts. In response, planners in Paris, Bogota and Sydney have deliberately routed new bike lanes through working-class neighbourhoods first.

F. The next frontier is electric bikes, which dramatically extend the realistic commuting range and make cycling viable for older riders or hilly cities such as Lisbon. Sales of e-bikes in the European Union overtook sales of electric cars in 2021 and have continued to climb, hinting that the quiet revolution of the bicycle is far from finished.`,
    questions: [
      { number: 1, type: "matching-headings", prompt: "Choose the best heading for Paragraph A.",
        headings: [
          { label: "i", text: "How the oil crisis reshaped streets" },
          { label: "ii", text: "Bicycles dismissed as toys" },
          { label: "iii", text: "Medical evidence for cycling" },
          { label: "iv", text: "The rise of the electric bike" },
        ], answer: "ii" },
      { number: 2, type: "matching-headings", prompt: "Choose the best heading for Paragraph B.",
        headings: [
          { label: "i", text: "Emergency response becomes policy" },
          { label: "ii", text: "Health benefits in Glasgow" },
          { label: "iii", text: "E-bikes outpace electric cars" },
          { label: "iv", text: "Concerns about social equity" },
        ], answer: "i" },
      { number: 3, type: "matching-headings", prompt: "Choose the best heading for Paragraph C.",
        headings: [
          { label: "i", text: "Health benefits documented by research" },
          { label: "ii", text: "Children and cycling habits" },
          { label: "iii", text: "Retail sales rise with bike lanes" },
          { label: "iv", text: "Lower urban speed limits" },
        ], answer: "i" },
      { number: 4, type: "matching-headings", prompt: "Choose the best heading for Paragraph D.",
        headings: [
          { label: "i", text: "Shopkeepers' fears proved wrong" },
          { label: "ii", text: "Children and cycling habits" },
          { label: "iii", text: "Climate emissions" },
          { label: "iv", text: "Hilly cities and assistance" },
        ], answer: "i" },
      { number: 5, type: "matching-headings", prompt: "Choose the best heading for Paragraph E.",
        headings: [
          { label: "i", text: "Addressing inequality in cycle networks" },
          { label: "ii", text: "Cycling as exercise" },
          { label: "iii", text: "Sales of electric bikes" },
          { label: "iv", text: "Speed limits in Copenhagen" },
        ], answer: "i" },
      { number: 6, type: "multiple-choice", prompt: "What event first triggered serious cycling experiments in Amsterdam and Copenhagen?",
        options: ["The 1929 stock-market crash", "The oil crisis of the mid-1970s", "The fall of the Berlin Wall", "The 2008 financial crisis"],
        answer: "The oil crisis of the mid-1970s" },
      { number: 7, type: "multiple-choice", prompt: "According to the Glasgow study, cycling commuters had a 45% lower risk of developing:",
        options: ["lung cancer", "type-2 diabetes", "heart disease", "depression"],
        answer: "heart disease" },
      { number: 8, type: "multiple-choice", prompt: "Studies in Berlin and Seville contradicted the fear that:",
        options: ["bike lanes are unsafe", "bike lanes would harm retail sales", "bike lanes are too expensive", "bike lanes worsen pollution"],
        answer: "bike lanes would harm retail sales" },
      { number: 9, type: "fill-blank", prompt: "Cycle networks initially expanded in the most ___ districts of many cities.", answer: "affluent" },
      { number: 10, type: "fill-blank", prompt: "Paris, Bogota and Sydney are now routing new lanes through ___ neighbourhoods first.", answer: "working-class" },
      { number: 11, type: "fill-blank", prompt: "Electric bikes are particularly useful for older riders and in ___ cities.", answer: "hilly" },
      { number: 12, type: "fill-blank", prompt: "In the EU, e-bike sales overtook electric car sales in ___.", answer: "2021" },
      { number: 13, type: "multiple-choice", prompt: "The writer's overall tone toward the cycling revival is:",
        options: ["Strongly negative", "Cautiously optimistic", "Indifferent", "Nostalgic"],
        answer: "Cautiously optimistic" },
    ],
  },
];
