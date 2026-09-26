// Extra IELTS Writing Task 1 prompts. Every prompt carries its own drawn visual.
import type { ChartDataConfig } from "@/components/Task1Chart";
import type { MapElement, ProcessStep } from "@/components/Task1Visual";
import type { WritingPrompt } from "./ieltsWritingPrompts";

const SUFFIX = " Summarise the information by selecting and reporting the main features and make comparisons where relevant.";

const GUIDE: Record<string, string[]> = {
  bar: ["Introduction: Paraphrase what the bar chart compares.", "Overview: Name the highest and lowest categories and the biggest difference.", "Body 1: Describe the leading categories with figures.", "Body 2: Describe the remaining categories and compare."],
  line: ["Introduction: Paraphrase what the graph shows and the time period.", "Overview: Give the overall trend of each line and any crossover.", "Body 1: Describe the lines that rose, with start and end figures.", "Body 2: Describe the lines that fell or fluctuated."],
  pie: ["Introduction: Paraphrase what the pie charts show.", "Overview: State the largest share and the main change between the charts.", "Body 1: Describe the largest segments and how they changed.", "Body 2: Describe the smaller segments and compare."],
  table: ["Introduction: Paraphrase what the table presents.", "Overview: Pick out the highest, lowest and the clearest trend.", "Body 1: Group rows with similar patterns and give figures.", "Body 2: Describe the remaining rows and any exceptions."],
  map: ["Introduction: Paraphrase what the maps compare and the years.", "Overview: State the two or three most significant changes.", "Body 1: Describe changes in one part of the area.", "Body 2: Describe changes in the other part and what stayed the same."],
  process: ["Introduction: Paraphrase what the diagram illustrates.", "Overview: State the number of stages, the start and end point, and whether it is linear or cyclical.", "Body 1: Describe the first half of the process in the passive voice.", "Body 2: Describe the second half using sequencing words."],
};

const VOCAB: Record<string, string[]> = {
  bar: ["by far the highest (cao nhất vượt trội)", "was roughly double (gần gấp đôi)", "the lowest figure was recorded (con số thấp nhất được ghi nhận)", "in comparison with (so với)", "a considerable gap (khoảng cách đáng kể)", "ranked second (đứng thứ hai)", "respectively (lần lượt)", "exceeded (vượt quá)"],
  line: ["rose steadily (tăng đều)", "peaked at (đạt đỉnh ở)", "fluctuated around (dao động quanh)", "declined sharply (giảm mạnh)", "levelled off (chững lại)", "overtook (vượt qua)", "over the period shown (trong giai đoạn được nêu)", "a threefold increase (tăng gấp ba)"],
  pie: ["accounted for (chiếm)", "the largest proportion (tỷ lệ lớn nhất)", "a quarter of (một phần tư)", "shrank from ... to (giảm từ ... xuống)", "doubled its share (tăng gấp đôi tỷ trọng)", "the remaining (phần còn lại)", "a negligible share (tỷ trọng không đáng kể)", "was the dominant (chiếm ưu thế)"],
  table: ["stood at (đạt mức)", "the highest figure (con số cao nhất)", "a similar pattern (xu hướng tương tự)", "in contrast (ngược lại)", "the most dramatic change (thay đổi rõ rệt nhất)", "lagged behind (tụt hậu)", "by the end of the period (cuối giai đoạn)", "compared to (so với)"],
  map: ["was replaced by (được thay thế bởi)", "was converted into (được chuyển đổi thành)", "was demolished (bị phá bỏ)", "was extended (được mở rộng)", "a new ... was constructed (một ... mới được xây)", "remained unchanged (giữ nguyên)", "to the north of (phía bắc của)", "adjacent to (liền kề với)"],
  process: ["the process begins with (quy trình bắt đầu với)", "is then transferred to (sau đó được chuyển đến)", "subsequently (sau đó)", "at the following stage (ở giai đoạn tiếp theo)", "is heated to (được làm nóng đến)", "once ... has been (khi ... đã được)", "the final stage involves (giai đoạn cuối bao gồm)", "the cycle then repeats (chu trình lặp lại)"],
};

type CT = "bar" | "line" | "pie" | "table" | "map" | "process";

function base(id: string, chartType: CT, prompt: string, desc: string, ideas: string[]): WritingPrompt {
  return {
    id, taskType: 1, chartType,
    prompt: prompt + SUFFIX,
    imageDescription: desc,
    writingGuide: GUIDE[chartType],
    vocabularyBank: VOCAB[chartType],
    brainstormingIdeas: ideas,
  };
}

function chart(type: ChartDataConfig["chart_type"], title: string, x: string, y: string, series: string[], rows: (string | number)[][]): ChartDataConfig {
  return {
    chart_type: type, title, x_axis: x, y_axis: y, series,
    data: rows.map((r) => {
      const o: Record<string, string | number> = { [x]: r[0] };
      series.forEach((s, i) => { o[s] = r[i + 1]; });
      return o;
    }),
  };
}

function pie(title: string, items: [string, number][]): ChartDataConfig {
  return chart("pie", title, "Category", "Percentage", ["Percentage"], items.map(([k, v]) => [k, v]));
}

function proc(id: string, prompt: string, title: string, cyclical: boolean, steps: [string, string, string?][], ideas: string[]): WritingPrompt {
  const s: ProcessStep[] = steps.map(([icon, t, d]) => ({ icon, title: t, ...(d ? { detail: d } : {}) }));
  return {
    ...base(id, "process", prompt, `${cyclical ? "Cyclical" : "Linear"} process with ${s.length} stages: ${s.map((x) => x.title).join(" > ")}.`, ideas),
    processData: { title, cyclical, steps: s },
  };
}

// Map element shorthands
const road = (x: number, y: number, w: number, h: number, label?: string): MapElement => ({ type: "road", x, y, w, h, orientation: w >= h ? "h" : "v", ...(label ? { label } : {}) });
const b = (x: number, y: number, w: number, h: number, label: string, variant: MapElement["variant"] = "default"): MapElement => ({ type: "building", x, y, w, h, label, variant });
const field = (x: number, y: number, w: number, h: number, label: string): MapElement => ({ type: "field", x, y, w, h, label });
const water = (x: number, y: number, w: number, h: number, label: string): MapElement => ({ type: "water", x, y, w, h, label });
const trees = (x: number, y: number, w = 18, h = 10): MapElement => ({ type: "trees", x, y, w, h });
const park = (x: number, y: number, w: number, h: number, label = "Car Park"): MapElement => ({ type: "carpark", x, y, w, h, label });

function map(id: string, prompt: string, y1: string, y2: string, before: MapElement[], after: MapElement[], desc: string, ideas: string[]): WritingPrompt {
  return {
    ...base(id, "map", prompt, desc, ideas),
    mapData: { before: { title: `Before (${y1})`, elements: before }, after: { title: `After (${y2})`, elements: after } },
  };
}

export const task1ExtraPrompts: WritingPrompt[] = [
  // ===== BAR =====
  { ...base("t1-bar-4", "bar", "The bar chart below shows the number of new cars sold (in thousands) by fuel type in a European country in 2015 and 2025.", "Grouped bar chart, four fuel types, two years.", ["Petrol remained the largest but fell.", "Electric sales rose dramatically.", "Diesel collapsed.", "Hybrids grew steadily."]),
    chartData: chart("bar", "New Car Sales by Fuel Type (thousands)", "Fuel", "Thousands", ["2015", "2025"], [["Petrol", 820, 540], ["Diesel", 610, 90], ["Hybrid", 40, 310], ["Electric", 12, 460]]) },
  { ...base("t1-bar-5", "bar", "The bar chart below compares the average number of hours per week that people in four age groups spent on different leisure activities in 2023.", "Grouped bar chart, four age groups, three activities.", ["Young people spent most time gaming.", "Reading rose with age.", "TV viewing peaked among over-60s.", "Sport declined with age."]),
    chartData: chart("bar", "Weekly Leisure Hours by Age Group", "Age", "Hours per week", ["Watching TV", "Gaming", "Reading", "Sport"], [["16-24", 6, 12, 2, 5], ["25-39", 9, 6, 3, 4], ["40-59", 12, 2, 5, 3], ["60+", 18, 1, 8, 2]]) },
  { ...base("t1-bar-6", "bar", "The bar chart below shows the percentage of households in a European country that owned selected electronic devices in 2005, 2015 and 2025.", "Grouped bar chart, four devices, three years.", ["Smartphones rose from very low to near universal.", "Desktop computers declined.", "Tablets appeared after 2005.", "Smart speakers are the newest device."]),
    chartData: chart("bar", "Household Device Ownership (%)", "Device", "Percentage", ["2005", "2015", "2025"], [["Desktop PC", 68, 55, 31], ["Smartphone", 4, 72, 96], ["Tablet", 0, 48, 63], ["Smart speaker", 0, 6, 41]]) },
  { ...base("t1-bar-7", "bar", "The bar chart below shows the amount of waste (in million tonnes) recycled, burned and sent to landfill in four countries in 2020.", "Stacked-style grouped bars, four countries, three methods.", ["Germany recycled the most.", "Landfill dominated in one country.", "Burning was common in Sweden.", "Totals varied widely."]),
    chartData: chart("bar", "Waste Treatment by Method (million tonnes), 2020", "Country", "Million tonnes", ["Recycled", "Burned", "Landfill"], [["Germany", 32, 15, 1], ["Sweden", 2, 3, 0.1], ["Italy", 15, 6, 9], ["Greece", 1, 0.2, 4]]) },
  { ...base("t1-bar-8", "bar", "The bar chart below shows the average monthly spending (in euros) of students in a city on five categories in 2015 and 2025.", "Grouped bar chart, five spending categories, two years.", ["Rent was the largest cost in both years.", "Food rose moderately.", "Transport fell slightly.", "Entertainment doubled."]),
    chartData: chart("bar", "Average Monthly Student Spending (EUR)", "Category", "Euros", ["2015", "2025"], [["Rent", 380, 560], ["Food", 190, 250], ["Transport", 60, 45], ["Books", 40, 25], ["Entertainment", 45, 90]]) },

  // ===== LINE =====
  { ...base("t1-line-3", "line", "The line graph below shows the number of visitors (in millions) to three types of museum in a country between 2000 and 2020.", "Line graph, three museum types, 2000-2020.", ["Art museums grew steadily.", "Science museums peaked in 2010.", "History museums declined then recovered.", "Numbers fell in 2020."]),
    chartData: chart("line", "Museum Visitors (millions)", "Year", "Millions", ["Art", "Science", "History"], [["2000", 4, 6, 8], ["2005", 5, 8, 7], ["2010", 6.5, 10, 6], ["2015", 8, 9, 6.5], ["2020", 5, 5, 4]]) },
  { ...base("t1-line-4", "line", "The graph below shows the average price (in US dollars per kilogram) of coffee, tea and cocoa on the world market from 1995 to 2025.", "Line graph, three commodities, 1995-2025.", ["Cocoa rose sharply at the end.", "Tea remained the cheapest and most stable.", "Coffee fluctuated.", "All three ended higher."]),
    chartData: chart("line", "World Commodity Prices (USD/kg)", "Year", "USD per kg", ["Coffee", "Tea", "Cocoa"], [["1995", 3.2, 1.8, 1.4], ["2000", 1.9, 1.9, 0.9], ["2005", 2.4, 2.0, 1.6], ["2010", 4.3, 2.9, 3.1], ["2015", 3.5, 2.7, 3.1], ["2020", 3.0, 2.8, 2.4], ["2025", 7.5, 3.0, 8.2]]) },
  { ...base("t1-line-5", "line", "The line graph below shows the percentage of people using three different methods to pay for goods in a country from 2010 to 2025.", "Line graph, three payment methods, 2010-2025.", ["Cash fell dramatically.", "Mobile payments rose from almost zero.", "Cards peaked then levelled off.", "Mobile overtook cash around 2020."]),
    chartData: chart("line", "Payment Methods Used (%)", "Year", "Percentage", ["Cash", "Card", "Mobile"], [["2010", 62, 35, 1], ["2013", 55, 41, 3], ["2016", 44, 47, 8], ["2019", 30, 50, 19], ["2022", 18, 49, 32], ["2025", 11, 47, 41]]) },
  { ...base("t1-line-6", "line", "The graph below shows the average daily temperature (in degrees Celsius) in three cities over a twelve-month period.", "Line graph, twelve months, three cities.", ["Sydney has the opposite seasons.", "Helsinki has the widest range.", "Singapore stays almost constant.", "Lines cross in spring and autumn."]),
    chartData: chart("line", "Average Monthly Temperature (C)", "Month", "Degrees C", ["Helsinki", "Singapore", "Sydney"], [["Jan", -4, 27, 23], ["Mar", -1, 28, 22], ["May", 10, 28, 16], ["Jul", 18, 28, 13], ["Sep", 11, 27, 17], ["Nov", 1, 27, 20], ["Dec", -2, 27, 22]]) },
  { ...base("t1-line-7", "line", "The line graph below shows the proportion of electricity generated from renewable sources in four countries between 2000 and 2025.", "Line graph, four countries, 2000-2025.", ["Denmark rose the most.", "Norway was consistently near 100%.", "Poland stayed low but grew.", "The UK saw a sharp rise after 2010."]),
    chartData: chart("line", "Renewable Electricity Share (%)", "Year", "Percentage", ["Norway", "Denmark", "UK", "Poland"], [["2000", 99, 16, 3, 2], ["2005", 98, 27, 4, 3], ["2010", 96, 33, 7, 7], ["2015", 97, 60, 25, 13], ["2020", 98, 78, 43, 18], ["2025", 98, 86, 52, 29]]) },

  // ===== PIE =====
  { ...base("t1-pie-3", "pie", "The pie charts below show how the average household in a country spent its income in 1980 and 2020.", "Two pie charts, household spending, 1980 and 2020.", ["Food share halved.", "Housing became the largest item.", "Leisure grew.", "Clothing fell."]),
    chartData: pie("Household Spending - 1980", [["Food", 34], ["Housing", 22], ["Clothing", 12], ["Transport", 14], ["Leisure", 8], ["Other", 10]]),
    chartData2: pie("Household Spending - 2020", [["Food", 16], ["Housing", 33], ["Clothing", 5], ["Transport", 15], ["Leisure", 17], ["Other", 14]]) },
  { ...base("t1-pie-4", "pie", "The pie charts below show the main reasons why people in a city travelled by car in 2010 and 2024.", "Two pie charts, reasons for car travel.", ["Commuting remained the main reason.", "Shopping trips declined.", "School runs grew.", "Leisure trips rose."]),
    chartData: pie("Reasons for Car Travel - 2010", [["Commuting", 42], ["Shopping", 25], ["School run", 10], ["Leisure", 15], ["Other", 8]]),
    chartData2: pie("Reasons for Car Travel - 2024", [["Commuting", 35], ["Shopping", 14], ["School run", 17], ["Leisure", 26], ["Other", 8]]) },
  { ...base("t1-pie-5", "pie", "The pie charts below show the proportion of water used for different purposes in a developed country and a developing country.", "Two pie charts comparing water use.", ["Agriculture dominates in the developing country.", "Industry is largest in the developed country.", "Domestic use is higher in the developed country.", "Opposite patterns overall."]),
    chartData: pie("Water Use - Developed Country", [["Agriculture", 30], ["Industry", 52], ["Domestic", 18]]),
    chartData2: pie("Water Use - Developing Country", [["Agriculture", 81], ["Industry", 11], ["Domestic", 8]]) },
  { ...base("t1-pie-6", "pie", "The pie charts below show the age profile of the population of a country in 1970 and projected for 2050.", "Two pie charts, age structure 1970 and 2050.", ["Under-15s will shrink sharply.", "Over-65s will triple.", "Working-age share falls slightly.", "An ageing population overall."]),
    chartData: pie("Population by Age - 1970", [["0-14", 35], ["15-64", 58], ["65+", 7]]),
    chartData2: pie("Population by Age - 2050 (projected)", [["0-14", 14], ["15-64", 60], ["65+", 26]]) },
  { ...base("t1-pie-7", "pie", "The pie charts below show the sources of revenue for a public transport company in 2005 and 2025.", "Two pie charts, company revenue sources.", ["Ticket sales fell as a share.", "Government subsidy rose.", "Advertising increased.", "Season passes grew."]),
    chartData: pie("Transport Company Revenue - 2005", [["Single tickets", 48], ["Season passes", 22], ["Subsidy", 20], ["Advertising", 6], ["Other", 4]]),
    chartData2: pie("Transport Company Revenue - 2025", [["Single tickets", 24], ["Season passes", 30], ["Subsidy", 31], ["Advertising", 11], ["Other", 4]]) },
  { ...base("t1-pie-8", "pie", "The pie charts below show the main causes of land degradation worldwide and in Europe.", "Two pie charts, causes of land degradation.", ["Overgrazing leads worldwide.", "Farming is the main cause in Europe.", "Deforestation is larger in Europe.", "Other causes are minor."]),
    chartData: pie("Causes of Land Degradation - World", [["Over-grazing", 35], ["Deforestation", 30], ["Over-cultivation", 28], ["Other", 7]]),
    chartData2: pie("Causes of Land Degradation - Europe", [["Over-grazing", 23], ["Deforestation", 39], ["Over-cultivation", 29], ["Other", 9]]) },

  // ===== TABLE =====
  { ...base("t1-table-2", "table", "The table below shows the percentage of adults who did regular physical exercise in five countries in 2000, 2010 and 2020.", "Table, five countries, three years.", ["Finland highest throughout.", "Brazil rose the most.", "Italy stayed low.", "Upward trend in most countries."]),
    chartData: chart("table", "Adults Exercising Regularly (%)", "Country", "Percentage", ["2000", "2010", "2020"], [["Finland", 52, 58, 64], ["Canada", 41, 47, 50], ["Brazil", 18, 29, 41], ["Italy", 22, 24, 26], ["Japan", 35, 33, 38]]) },
  { ...base("t1-table-3", "table", "The table below gives information about the underground railway systems in six cities.", "Table, six cities, opening year, length and passengers.", ["London is the oldest.", "Shanghai carries the most passengers.", "Kyoto is the smallest.", "Newer systems are often larger."]),
    chartData: chart("table", "Underground Railway Systems", "City", "Figures", ["Opened", "Length (km)", "Passengers per year (millions)"], [["London", 1863, 402, 1350], ["Paris", 1900, 245, 1500], ["Tokyo", 1927, 304, 2900], ["Shanghai", 1993, 831, 2830], ["Los Angeles", 2001, 28, 50], ["Kyoto", 1981, 31, 125]]) },
  { ...base("t1-table-4", "table", "The table below shows the average hours worked per week and average annual income in five professions in 2024.", "Table, five professions, hours and income.", ["Doctors work longest and earn most.", "Teachers earn least per hour.", "Software engineers have high pay for moderate hours.", "No simple link between hours and pay."]),
    chartData: chart("table", "Working Hours and Income by Profession, 2024", "Profession", "Figures", ["Hours per week", "Annual income (EUR)"], [["Doctor", 52, 98000], ["Teacher", 44, 41000], ["Software engineer", 40, 72000], ["Nurse", 38, 39000], ["Lawyer", 48, 85000]]) },
  { ...base("t1-table-5", "table", "The table below shows the consumption of three kinds of fast food (in grams per person per week) in a country from 1990 to 2020.", "Table, three foods, four years.", ["Pizza rose steadily.", "Fish and chips declined.", "Burgers peaked in 2010.", "Pizza became the most popular."]),
    chartData: chart("table", "Fast Food Consumption (grams per person per week)", "Food", "Grams", ["1990", "2000", "2010", "2020"], [["Fish and chips", 300, 230, 180, 150], ["Burgers", 120, 250, 310, 270], ["Pizza", 60, 180, 290, 340]]) },
  { ...base("t1-table-6", "table", "The table below shows the proportion of the population aged 25-34 with a university degree in five countries in 2005 and 2025.", "Table, five countries, two years.", ["South Korea leads.", "Every country increased.", "Mexico remains lowest.", "Poland improved the most."]),
    chartData: chart("table", "Population Aged 25-34 with a Degree (%)", "Country", "Percentage", ["2005", "2025"], [["South Korea", 51, 71], ["Canada", 53, 67], ["Poland", 25, 43], ["Germany", 22, 38], ["Mexico", 18, 28]]) },
  { ...base("t1-table-7", "table", "The table below shows the number of tourists (in millions) visiting four regions of a country in each season of 2024.", "Table, four regions, four seasons.", ["The coast peaks in summer.", "Mountains peak in winter.", "The capital is stable.", "The lakes are smallest."]),
    chartData: chart("table", "Tourists by Region and Season, 2024 (millions)", "Region", "Millions", ["Spring", "Summer", "Autumn", "Winter"], [["Coast", 2.1, 6.8, 1.9, 0.6], ["Mountains", 0.9, 1.5, 0.8, 3.4], ["Capital", 2.4, 2.9, 2.5, 2.2], ["Lakes", 0.5, 1.6, 0.4, 0.2]]) },
  { ...base("t1-table-8", "table", "The table below shows the percentage of journeys made by different forms of transport in three cities in 2024.", "Table, three cities, five transport modes.", ["Amsterdam dominated by cycling.", "Houston relies on cars.", "Tokyo on public transport.", "Walking similar in all three."]),
    chartData: chart("table", "Share of Journeys by Transport Mode (%), 2024", "City", "Percentage", ["Car", "Public transport", "Bicycle", "Walking", "Other"], [["Amsterdam", 22, 17, 38, 20, 3], ["Tokyo", 12, 51, 14, 21, 2], ["Houston", 81, 4, 1, 11, 3]]) },

  // ===== MAP =====
  map("t1-map-2", "The maps below show the changes to a village called Westmere between 1995 and 2025.", "1995", "2025",
    [road(0, 45, 100, 8, "Main Road"), field(4, 6, 40, 34, "Farmland"), b(56, 10, 14, 12, "Shop", "shop"), b(74, 10, 14, 12, "School", "school"), b(56, 60, 12, 10, "House", "house"), b(72, 60, 12, 10, "House", "house"), trees(10, 64, 30, 16), water(0, 86, 100, 10, "River")],
    [road(0, 45, 100, 8, "Main Road"), road(40, 0, 6, 45), b(4, 6, 12, 10, "House", "house"), b(20, 6, 12, 10, "House", "house"), b(4, 22, 12, 10, "House", "house"), b(20, 22, 12, 10, "House", "house"), b(56, 10, 14, 12, "Supermarket", "shop"), b(74, 10, 20, 12, "School (extended)", "school"), park(56, 60, 28, 12), trees(10, 64, 18, 12), water(0, 86, 100, 10, "River")],
    "Farmland became housing, the shop became a supermarket, the school was extended and houses were replaced by a car park.", ["Farmland replaced by housing.", "School extended.", "Houses demolished for a car park.", "Some woodland lost."]),
  map("t1-map-3", "The maps below show a university campus in 2000 and today.", "2000", "2025",
    [road(0, 46, 100, 8, "Campus Road"), b(6, 8, 24, 16, "Library"), b(40, 8, 22, 16, "Lecture Hall", "school"), field(70, 6, 26, 36, "Sports Field"), b(6, 62, 20, 14, "Student Housing", "house"), park(40, 62, 26, 14), trees(72, 62, 22, 14)],
    [road(0, 46, 100, 8, "Campus Road"), b(6, 8, 24, 16, "Library + Study Centre"), b(40, 8, 22, 16, "Lecture Hall", "school"), b(70, 6, 26, 18, "Sports Centre"), field(70, 26, 26, 16, "Small Pitch"), b(6, 62, 20, 14, "Student Housing", "house"), b(40, 62, 26, 14, "Research Lab", "office"), trees(72, 62, 22, 14)],
    "The sports field became a sports centre and small pitch, the car park became a research lab, the library gained a study centre.", ["Car park replaced by research lab.", "Sports field built on.", "Library expanded.", "Housing and trees unchanged."]),
  map("t1-map-4", "The maps below show a seaside area before and after it was developed for tourism.", "1980", "2025",
    [water(0, 0, 100, 20, "Sea"), field(4, 26, 50, 30, "Beach and dunes"), trees(60, 28, 34, 26), b(10, 66, 14, 10, "Fishing Hut", "house"), road(0, 84, 100, 8, "Coastal Road")],
    [water(0, 0, 100, 20, "Sea"), field(4, 22, 40, 12, "Beach"), b(4, 38, 22, 16, "Hotel"), b(30, 38, 18, 16, "Restaurant", "shop"), b(58, 28, 16, 12, "Reception", "office"), b(58, 44, 12, 10, "Villa", "house"), b(74, 44, 12, 10, "Villa", "house"), park(10, 64, 30, 12), road(0, 84, 100, 8, "Coastal Road"), road(50, 20, 4, 64)],
    "Dunes and woodland were replaced by a hotel, restaurant, villas and a car park; a new access road was added.", ["Natural area largely lost.", "Hotel and restaurant near beach.", "Villas replaced trees.", "New road to the beach."]),
  map("t1-map-5", "The maps below show the changes to the main shopping street of Ashford between 2005 and 2025.", "2005", "2025",
    [road(0, 44, 100, 10, "High Street"), b(4, 8, 18, 14, "Bank", "office"), b(26, 8, 18, 14, "Post Office", "office"), b(50, 8, 20, 14, "Department Store", "shop"), b(76, 8, 20, 14, "Cinema"), park(4, 62, 40, 16), b(52, 62, 20, 14, "Market Hall", "shop")],
    [road(0, 44, 100, 10, "Pedestrian Zone"), b(4, 8, 18, 14, "Cafe", "shop"), b(26, 8, 18, 14, "Post Office", "office"), b(50, 8, 20, 14, "Apartments", "house"), b(76, 8, 20, 14, "Cinema"), field(4, 62, 40, 16, "Town Square"), b(52, 62, 20, 14, "Market Hall", "shop"), b(78, 62, 18, 14, "Bus Stop", "bus")],
    "The high street was pedestrianised, the bank became a cafe, the store became apartments and the car park became a square.", ["Traffic removed from centre.", "Car park replaced by square.", "Retail replaced by housing.", "Bus stop added."]),
  map("t1-map-6", "The maps below show an industrial area by a river in 1990 and after redevelopment in 2025.", "1990", "2025",
    [water(0, 82, 100, 14, "River"), b(4, 8, 30, 24, "Factory", "office"), b(40, 8, 22, 24, "Warehouse", "office"), b(68, 8, 28, 24, "Warehouse", "office"), road(0, 40, 100, 8, "Industrial Road"), b(4, 56, 30, 18, "Rail Yard", "office")],
    [water(0, 82, 100, 14, "River"), b(4, 8, 30, 24, "Arts Centre (former factory)"), b(40, 8, 22, 24, "Apartments", "house"), b(68, 8, 28, 24, "Offices", "office"), road(0, 40, 100, 8, "Riverside Avenue"), field(4, 56, 40, 18, "Park"), trees(50, 58, 20, 12), b(76, 58, 20, 14, "Tram Stop", "bus")],
    "The factory became an arts centre, warehouses became flats and offices, the rail yard became a park, a tram stop was added.", ["Industrial to residential and leisure.", "Factory building kept but reused.", "Green space added.", "Public transport improved."]),
  map("t1-map-7", "The maps below show a public park in 1970 and in 2025.", "1970", "2025",
    [field(4, 6, 92, 70, "Open Grass"), water(36, 30, 26, 18, "Pond"), trees(6, 8, 24, 14), road(0, 82, 100, 8, "Park Road"), b(78, 8, 16, 10, "Bandstand")],
    [field(4, 6, 92, 70, "Grass"), water(36, 30, 26, 18, "Pond"), trees(6, 8, 24, 14), b(6, 50, 20, 14, "Playground"), b(70, 50, 22, 14, "Cafe and Toilets", "shop"), field(70, 8, 24, 20, "Tennis Courts"), road(0, 82, 100, 8, "Park Road"), park(30, 70, 30, 10)],
    "The bandstand was replaced by tennis courts; a playground, cafe and small car park were added; the pond and trees remained.", ["Bandstand removed.", "More facilities for families.", "Pond unchanged.", "Car park added on grass."]),
  map("t1-map-8", "The maps below show an island before and after the construction of tourist facilities.", "2000", "2025",
    [water(0, 0, 100, 100, "Sea"), field(15, 15, 70, 70, "Island"), trees(25, 25, 50, 40)],
    [water(0, 0, 100, 100, "Sea"), field(15, 15, 70, 70, "Island"), trees(55, 25, 24, 16), b(22, 22, 12, 10, "Hut", "house"), b(36, 22, 12, 10, "Hut", "house"), b(22, 40, 20, 14, "Reception", "office"), b(50, 50, 18, 12, "Restaurant", "shop"), road(40, 36, 4, 40), b(40, 78, 18, 8, "Pier")],
    "The uninhabited island gained huts, a reception, restaurant, footpaths and a pier; most trees on the west were cleared.", ["Island was empty before.", "Accommodation in the west.", "Pier allows boat access.", "Some trees kept in the east."]),

  // ===== PROCESS =====
  proc("t1-process-2", "The diagram below shows the water cycle, the continuous movement of water on, above and below the surface of the Earth.", "The Water Cycle", true,
    [["🌊", "Evaporation", "from oceans"], ["☁️", "Condensation", "forms clouds"], ["🌧️", "Precipitation", "rain and snow"], ["⛰️", "Surface runoff", "into rivers"], ["💧", "Infiltration", "into the ground"], ["🏞️", "Groundwater flow", "back to the sea"]],
    ["Natural cyclical process.", "Driven by the sun's heat.", "Two routes back to the sea.", "Six stages."]),
  proc("t1-process-3", "The diagram below shows how bricks are manufactured for the building industry.", "Brick Manufacturing", false,
    [["⛏️", "Digging", "clay extracted"], ["🪨", "Sieving", "through a metal grid"], ["💦", "Mixing", "with sand and water"], ["🧱", "Moulding", "or wire cutting"], ["🌬️", "Drying", "24-48 hours"], ["🔥", "Firing", "in a kiln, up to 1300C"], ["❄️", "Cooling", "48-72 hours"], ["📦", "Packaging"], ["🚚", "Delivery"]],
    ["Linear process of nine stages.", "Starts with extraction of clay.", "Heating then cooling.", "Ends with delivery."]),
  proc("t1-process-4", "The diagram below shows the process of producing instant coffee.", "Instant Coffee Production", false,
    [["🌱", "Harvesting", "coffee cherries picked"], ["☀️", "Drying", "in the sun"], ["🫘", "Hulling", "beans removed"], ["🔥", "Roasting"], ["⚙️", "Grinding"], ["💧", "Brewing", "with hot water"], ["🧊", "Freeze-drying", "into granules"], ["🫙", "Packing", "into jars"]],
    ["Eight stages from farm to jar.", "Agricultural then industrial.", "Water added then removed.", "Linear process."]),
  proc("t1-process-5", "The diagram below shows how glass bottles are recycled.", "Glass Bottle Recycling", true,
    [["🍾", "Collection", "bottle banks"], ["🚛", "Transport", "to plant"], ["🔍", "Sorting", "by colour"], ["🧼", "Cleaning", "high-pressure water"], ["🔨", "Crushing", "into cullet"], ["🔥", "Melting", "with sand"], ["🫙", "Moulding", "new bottles"], ["🏪", "Filling and sale"]],
    ["Cyclical, eight stages.", "Sorting by colour is key.", "Glass is melted and remoulded.", "Returns to consumers."]),
  proc("t1-process-6", "The diagram below shows the life cycle of the silkworm and the production of silk cloth.", "Silkworm Life Cycle and Silk Production", false,
    [["🦋", "Moth lays eggs", "on mulberry leaves"], ["🐛", "Larva hatches", "10 days"], ["🍃", "Feeding", "4-6 weeks"], ["🧶", "Cocoon spun", "3-8 days"], ["♨️", "Boiling", "cocoons softened"], ["🧵", "Unwinding", "into thread"], ["🎨", "Dyeing"], ["👘", "Weaving", "silk cloth"]],
    ["Natural stages then manufacturing.", "Cocoon links the two parts.", "Takes several weeks.", "Ends with silk cloth."]),
  proc("t1-process-7", "The diagram below shows how electricity is generated in a hydroelectric power station.", "Hydroelectric Power Generation", false,
    [["🏞️", "Reservoir", "water stored behind a dam"], ["🚪", "Intake gates open", "during the day"], ["⬇️", "Water flows down", "through a tunnel"], ["🌀", "Turbine spins"], ["⚡", "Generator", "produces electricity"], ["🗼", "Power lines", "to homes"], ["🔁", "Pumped back", "at night to reservoir"]],
    ["Day and night stages.", "Gravity drives the turbine.", "Water reused by pumping.", "Seven stages."]),
  proc("t1-process-8", "The diagram below shows how olive oil is produced.", "Olive Oil Production", false,
    [["🫒", "Harvesting", "by hand or machine"], ["🚿", "Washing", "leaves removed"], ["⚙️", "Crushing", "into a paste"], ["🔄", "Mixing", "30-40 minutes"], ["🌀", "Centrifuge", "oil separated from water"], ["🏺", "Storage", "in steel tanks"], ["🍶", "Bottling"]],
    ["Seven linear stages.", "Mechanical, not chemical.", "Separation is the key step.", "Ends with bottling."]),
];
