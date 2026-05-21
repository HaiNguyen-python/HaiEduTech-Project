// IELTS Sample Essays Database - Band 7.0+ level
// Auto-generated content with bilingual glossary and review exercises

export interface GlossaryEntry {
  term: string;
  vietnamese: string;
  context: string;
}

export interface ReviewItem {
  sentence: string;
  answer: string;
  explanation?: string;
}

export interface ReviewExercise {
  type: string;
  instruction: string;
  items: ReviewItem[];
}

// Chart data point for dynamic visualization
export interface ChartDataPoint {
  [key: string]: string | number;
}

// Configuration for rendering the correct chart type
export interface ChartConfig {
  type: "line" | "bar" | "pie" | "table" | "map" | "process" | "mixed";
  xKey?: string;
  yKeys?: string[];
  colors?: string[];
  yLabel?: string;
  xLabel?: string;
  data?: ChartDataPoint[];
  // For pie charts: which key is the label vs the value
  pieNameKey?: string;
  pieValueKey?: string;
  // For dual-year pie charts
  data2?: ChartDataPoint[];
  labels?: [string, string];
  // For table type
  columns?: string[];
  rows?: string[][];
  // For map/process: descriptive stages
  stages?: { title: string; description: string; icon?: string }[];
  // For mixed: which keys are bars vs line
  barKeys?: string[];
  lineKey?: string;
}

export interface SampleEssay {
  id: string;
  taskType: 1 | 2;
  chartType?: string;
  essayType?: string;
  topic: string;
  prompt: string;
  essayBody: string;
  glossary: GlossaryEntry[];
  reviewExercise: ReviewExercise;
  chartConfig?: ChartConfig;
}

import { sampleEssaysExpansion } from "./ieltsSampleEssaysExpansion";

const baseSampleEssays: SampleEssay[] = [
  {
    "id": "t1-1",
    "taskType": 1,
    "chartType": "line",
    "topic": "energy",
    "prompt": "The line graph below shows changes in electricity generation by source (coal, natural gas, renewables, and nuclear) in Country X from 1990 to 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    "essayBody": "The line graph delineates the evolution of electricity generation from four sources—coal, natural gas, renewables, and nuclear—in Country X across the three decades from 1990 to 2020, with output measured in terawatt-hours.\n\nOverall, the most **salient features** are the secular decline of coal, which had once **constituted** the backbone of the grid, and the meteoric ascent of renewables, which **all but closed the gap** with gas by the end of the period. Nuclear, meanwhile, functioned as a stable **baseload** throughout, fluctuating only marginally around the 30 TWh mark.\n\nCoal embarked on a **protracted** downward trajectory from a commanding 150 TWh in 1990, **contracting** to roughly 95 TWh by 2010 before the slide accelerated to a mere 60 TWh in 2020—a cumulative **erosion** of approximately 60 per cent. Natural gas, by contrast, charted a near-linear ascent from 50 TWh to 120 TWh, **overtaking** coal in the mid-2010s as cleaner combustion and gas-fired plants were prioritised under decarbonisation policies such as the EU Emissions Trading Scheme.\n\nThe most **striking trajectory**, however, belonged to renewables. Starting from a **negligible** base of 10 TWh, output remained subdued until 2005, after which subsidies, falling levelised costs (LCOE) for solar PV, and IEA-documented grid-integration reforms triggered a **precipitous** climb to 115 TWh by 2020—effectively **converging** with gas. Nuclear, by way of comparison, demonstrated only **incremental** oscillation, never exceeding 33 TWh nor dropping below 30 TWh, thereby serving as a **dispatchable** counterweight to the volatility inherent in intermittent renewables.",
    "glossary": [
      {
        "term": "salient features",
        "vietnamese": "đặc điểm nổi bật",
        "context": "Overall, the most salient features are the secular decline of coal."
      },
      {
        "term": "constituted",
        "vietnamese": "đã từng cấu thành nên",
        "context": "Coal, which had once constituted the backbone of the grid."
      },
      {
        "term": "all but closed the gap",
        "vietnamese": "gần như đã thu hẹp khoảng cách",
        "context": "Renewables all but closed the gap with gas by the end of the period."
      },
      {
        "term": "baseload",
        "vietnamese": "nguồn phụ tải nền",
        "context": "Nuclear functioned as a stable baseload throughout."
      },
      {
        "term": "protracted",
        "vietnamese": "kéo dài",
        "context": "Coal embarked on a protracted downward trajectory from 150 TWh in 1990."
      },
      {
        "term": "erosion",
        "vietnamese": "sự xói mòn/suy giảm dần",
        "context": "A cumulative erosion of approximately 60 per cent."
      },
      {
        "term": "overtaking",
        "vietnamese": "vượt qua",
        "context": "Natural gas charted a near-linear ascent, overtaking coal in the mid-2010s."
      },
      {
        "term": "striking trajectory",
        "vietnamese": "quỹ đạo ấn tượng",
        "context": "The most striking trajectory belonged to renewables."
      },
      {
        "term": "precipitous",
        "vietnamese": "dốc đứng/đột ngột",
        "context": "Subsidies and grid-integration reforms triggered a precipitous climb to 115 TWh."
      },
      {
        "term": "dispatchable",
        "vietnamese": "có thể điều phối được",
        "context": "Nuclear served as a dispatchable counterweight to the volatility of intermittent renewables."
      }
    ],
    "reviewExercise": {
      "type": "gap-fill",
      "instruction": "Fill in the blanks with appropriate words from the essay.",
      "items": [
        {
          "sentence": "Coal had once ___ the backbone of the national grid before its long-run decline.",
          "answer": "constituted",
          "explanation": "'Constituted' means formed or made up — a more academic synonym for 'made up'."
        },
        {
          "sentence": "Coal embarked on a ___ downward trajectory that lasted three decades.",
          "answer": "protracted",
          "explanation": "'Protracted' means prolonged or drawn out over a long period."
        },
        {
          "sentence": "Renewables exhibited a ___ climb after 2005 as costs collapsed.",
          "answer": "precipitous",
          "explanation": "'Precipitous' describes an extremely steep or sudden rise."
        },
        {
          "sentence": "Nuclear served as a stable ___, fluctuating only marginally around 30 TWh.",
          "answer": "baseload",
          "explanation": "'Baseload' refers to the constant minimum supply that grids rely on."
        },
        {
          "sentence": "By 2020, renewables had ___ with gas, both supplying over 110 TWh.",
          "answer": "converging",
          "explanation": "'Converging' indicates two trends moving toward the same level."
        }
      ]
    },
    "chartConfig": {
      "type": "line",
      "xKey": "year",
      "yKeys": ["Coal", "Natural Gas", "Renewables", "Nuclear"],
      "yLabel": "TWh",
      "data": [
        {"year": 1990, "Coal": 150, "Natural Gas": 50, "Renewables": 10, "Nuclear": 30},
        {"year": 1995, "Coal": 140, "Natural Gas": 60, "Renewables": 12, "Nuclear": 32},
        {"year": 2000, "Coal": 130, "Natural Gas": 75, "Renewables": 18, "Nuclear": 33},
        {"year": 2005, "Coal": 115, "Natural Gas": 90, "Renewables": 30, "Nuclear": 31},
        {"year": 2010, "Coal": 95, "Natural Gas": 100, "Renewables": 55, "Nuclear": 30},
        {"year": 2015, "Coal": 80, "Natural Gas": 110, "Renewables": 85, "Nuclear": 32},
        {"year": 2020, "Coal": 60, "Natural Gas": 120, "Renewables": 115, "Nuclear": 31}
      ]
    }
  },
  {
    "id": "t1-2",
    "taskType": 1,
    "chartType": "line",
    "topic": "population",
    "prompt": "The line graph below shows the proportion of the population in three age groups (0–14, 15–64, 65+) in Country Y from 1970 to 2030. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    "essayBody": "The line graph charts the percentage share of three age cohorts—0–14, 15–64, and 65+—within Country Y's population across a six-decade span from 1970 to 2030, with the final decade representing UN-style projections.\n\nOverall, the figures encapsulate a textbook **demographic transition**: the youth share has contracted persistently, the working-age bracket peaked at mid-period before plateauing, and the elderly **cohort** is on course to **swell** to unprecedented proportions, signalling pronounced population ageing of the kind documented by the OECD across high-income economies.\n\nThe 0–14 segment declined steadily from 35 per cent in 1970 to a projected 13 per cent by 2030, with the steepest **decade-on-decade** fall occurring between 1970 and 1990 as the total fertility rate **dipped** below replacement level. The working-age band (15–64), by contrast, expanded modestly from 58 per cent to a high-water mark of 65 per cent in 2010, before commencing a gentle **taper** to 60 per cent in 2030 as successive **birth cohorts** moved into retirement.\n\nThe most consequential shift lies with those aged 65 and over, whose share **almost quadrupled**, climbing from a mere 7 per cent in 1970 to a projected 27 per cent by 2030. This **inversion** of the traditional age pyramid is poised to **outstrip** the youth share by a factor of two, with the **old-age dependency ratio** rising in tandem. Such structural change, **underpinned** by rising life expectancy and persistent sub-replacement fertility, foreshadows mounting fiscal pressure on pension and healthcare systems—a phenomenon mirrored across Japan, Italy, and South Korea.",
    "glossary": [
      {
        "term": "demographic transition",
        "vietnamese": "quá trình chuyển đổi dân số",
        "context": "The figures encapsulate a textbook demographic transition."
      },
      {
        "term": "cohort",
        "vietnamese": "nhóm/thế hệ cùng tuổi",
        "context": "The elderly cohort is on course to swell to unprecedented proportions."
      },
      {
        "term": "swell",
        "vietnamese": "phình to/tăng mạnh",
        "context": "The elderly cohort is on course to swell to unprecedented proportions."
      },
      {
        "term": "decade-on-decade",
        "vietnamese": "thập kỷ này so với thập kỷ trước",
        "context": "The steepest decade-on-decade fall occurred between 1970 and 1990."
      },
      {
        "term": "dipped",
        "vietnamese": "tụt xuống",
        "context": "The total fertility rate dipped below replacement level."
      },
      {
        "term": "taper",
        "vietnamese": "giảm dần",
        "context": "The band commenced a gentle taper to 60 per cent in 2030."
      },
      {
        "term": "almost quadrupled",
        "vietnamese": "tăng gần gấp bốn lần",
        "context": "Their share almost quadrupled, climbing from 7 per cent to 27 per cent."
      },
      {
        "term": "inversion",
        "vietnamese": "sự đảo ngược",
        "context": "This inversion of the traditional age pyramid is poised to outstrip the youth share."
      },
      {
        "term": "outstrip",
        "vietnamese": "vượt xa",
        "context": "It is poised to outstrip the youth share by a factor of two."
      },
      {
        "term": "old-age dependency ratio",
        "vietnamese": "tỷ lệ phụ thuộc của người cao tuổi",
        "context": "The old-age dependency ratio is rising in tandem."
      },
      {
        "term": "underpinned",
        "vietnamese": "được củng cố bởi",
        "context": "Such structural change, underpinned by rising life expectancy and sub-replacement fertility."
      }
    ],
    "reviewExercise": {
      "type": "gap-fill",
      "instruction": "Fill in the blanks with appropriate words from the essay.",
      "items": [
        {
          "sentence": "The graph captures a textbook ___ unfolding over six decades.",
          "answer": "demographic transition",
          "explanation": "A 'demographic transition' describes the shift from high to low birth and death rates."
        },
        {
          "sentence": "The working-age band reached a peak in 2010 before commencing a gentle ___.",
          "answer": "taper",
          "explanation": "'Taper' means a gradual decrease or narrowing."
        },
        {
          "sentence": "The 65+ share ___ between 1970 and 2030, rising from 7% to 27%.",
          "answer": "almost quadrupled",
          "explanation": "'Almost quadrupled' means increased by nearly four times."
        },
        {
          "sentence": "By 2030, the elderly will ___ the youth share by a factor of two.",
          "answer": "outstrip",
          "explanation": "'Outstrip' means to greatly exceed or surpass."
        },
        {
          "sentence": "This shift is ___ by rising life expectancy and low fertility.",
          "answer": "underpinned",
          "explanation": "'Underpinned' means supported or caused by."
        }
      ]
    },
    "chartConfig": {
      "type": "line",
      "xKey": "year",
      "yKeys": ["0-14", "15-64", "65+"],
      "yLabel": "% of population",
      "data": [
        {"year": 1970, "0-14": 35, "15-64": 58, "65+": 7},
        {"year": 1980, "0-14": 30, "15-64": 61, "65+": 9},
        {"year": 1990, "0-14": 25, "15-64": 63, "65+": 12},
        {"year": 2000, "0-14": 22, "15-64": 64, "65+": 14},
        {"year": 2010, "0-14": 18, "15-64": 65, "65+": 17},
        {"year": 2020, "0-14": 15, "15-64": 63, "65+": 22},
        {"year": 2030, "0-14": 13, "15-64": 60, "65+": 27}
      ]
    }
  },
  {
    "id": "t1-3",
    "taskType": 1,
    "chartType": "bar",
    "topic": "education",
    "prompt": "The bar chart below compares the percentage of adults with a university degree in five countries in 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    "essayBody": "The bar chart juxtaposes the proportion of adults holding a tertiary qualification across five nations—labelled A to E—at two reference points, namely 2000 and 2020, mirroring the kind of cross-national benchmarking conducted by the OECD in its annual *Education at a Glance* series.\n\nOverall, every country registered a net uplift in **tertiary attainment**, yet the magnitude of progress varied dramatically: Nation A engineered a transformational leap, Nations C and D consolidated their established lead, whereas Nation B remained a **conspicuous laggard** with only a marginal advance.\n\nNation A executed the most spectacular **catch-up**, vaulting from a modest 10 per cent in 2000 to 36 per cent two decades later—a near-quadrupling that almost certainly reflects deliberate expansion of public universities and **mass-access reforms** of the kind pursued by South Korea and Ireland. Nations C and D, already operating from a comparatively elevated baseline of around 30 per cent, posted **incremental yet sustained gains** to settle at 40 and 39 per cent respectively, thereby **consolidating** their position at the apex.\n\nAt the opposite end, Nation B languished, **inching up** from 8 to a mere 12 per cent and thus widening, in absolute terms, the **attainment gap** that separates it from the front runners. Nation E occupied a middle ground, climbing from 15 to 28 per cent—a respectable trajectory that **narrowed**, without **eliminating**, the chasm with Nations C and D. The aggregate pattern thus suggests that, while the global push for **human-capital accumulation** has lifted all boats, structural constraints continue to **perpetuate** divergence between leading and trailing systems.",
    "glossary": [
      {
        "term": "tertiary attainment",
        "vietnamese": "trình độ giáo dục bậc đại học",
        "context": "Every country registered a net uplift in tertiary attainment."
      },
      {
        "term": "conspicuous laggard",
        "vietnamese": "kẻ tụt hậu rõ rệt",
        "context": "Nation B remained a conspicuous laggard with only a marginal advance."
      },
      {
        "term": "catch-up",
        "vietnamese": "sự bắt kịp",
        "context": "Nation A executed the most spectacular catch-up."
      },
      {
        "term": "mass-access reforms",
        "vietnamese": "cải cách mở rộng tiếp cận đại trà",
        "context": "Deliberate expansion of public universities and mass-access reforms."
      },
      {
        "term": "incremental yet sustained gains",
        "vietnamese": "những bước tiến nhỏ nhưng bền vững",
        "context": "Nations C and D posted incremental yet sustained gains."
      },
      {
        "term": "consolidating",
        "vietnamese": "củng cố",
        "context": "Thereby consolidating their position at the apex."
      },
      {
        "term": "inching up",
        "vietnamese": "nhích lên từ từ",
        "context": "Nation B languished, inching up from 8 to a mere 12 per cent."
      },
      {
        "term": "attainment gap",
        "vietnamese": "khoảng cách về trình độ",
        "context": "Widening the attainment gap that separates it from the front runners."
      },
      {
        "term": "narrowed",
        "vietnamese": "thu hẹp",
        "context": "A respectable trajectory that narrowed the chasm with Nations C and D."
      },
      {
        "term": "human-capital accumulation",
        "vietnamese": "tích lũy vốn con người",
        "context": "The global push for human-capital accumulation has lifted all boats."
      },
      {
        "term": "perpetuate",
        "vietnamese": "duy trì/kéo dài",
        "context": "Structural constraints continue to perpetuate divergence between systems."
      }
    ],
    "reviewExercise": {
      "type": "gap-fill",
      "instruction": "Fill in the blanks with appropriate words from the essay.",
      "items": [
        {
          "sentence": "Every country registered a net uplift in ___.",
          "answer": "tertiary attainment",
          "explanation": "'Tertiary attainment' means the share of adults completing higher education."
        },
        {
          "sentence": "Nation B remained a ___, advancing only marginally.",
          "answer": "conspicuous laggard",
          "explanation": "A 'conspicuous laggard' is an obviously slow performer compared to peers."
        },
        {
          "sentence": "Nation A executed a spectacular ___, almost quadrupling its rate.",
          "answer": "catch-up",
          "explanation": "'Catch-up' refers to closing the gap with leaders."
        },
        {
          "sentence": "Nations C and D made ___ that kept them at the top.",
          "answer": "incremental yet sustained gains",
          "explanation": "Small but consistent improvements over time."
        },
        {
          "sentence": "Structural constraints continue to ___ divergence between systems.",
          "answer": "perpetuate",
          "explanation": "'Perpetuate' means to cause something to continue indefinitely."
        }
      ]
    },
    "chartConfig": {
      "type": "bar",
      "xKey": "country",
      "yKeys": ["2000", "2020"],
      "yLabel": "% with degree",
      "data": [
        {"country": "Nation A", "2000": 10, "2020": 36},
        {"country": "Nation B", "2000": 8, "2020": 12},
        {"country": "Nation C", "2000": 30, "2020": 40},
        {"country": "Nation D", "2000": 28, "2020": 39},
        {"country": "Nation E", "2000": 15, "2020": 28}
      ]
    }
  },
  {
    "id": "t1-4",
    "taskType": 1,
    "chartType": "bar",
    "topic": "transport",
    "prompt": "The bar chart below shows the average number of daily commuters by transport mode (car, bus, metro, bicycle) in three cities in 2015. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    "essayBody": "The bar chart compares the average daily commuter volume across four transport modes—private car, bus, metro, and bicycle—in three unnamed cities (X, Y, and Z) during 2015, with figures expressed in thousands.\n\nOverall, the three cities exhibit strikingly divergent **modal splits**: City X is **emphatically car-centric**, City Y leans on a mature underground network, while City Z stands out as a model of **active-mobility uptake**, echoing the **Copenhagenisation** trend visible in cities such as Amsterdam, Utrecht and Bogotá.\n\nIn City X, private vehicles **dwarfed** every alternative, with roughly 50,000 daily car commuters—more than double the bus ridership (20,000) and over triple the metro figure (15,000). Cycling was virtually **negligible** at just 5,000, suggesting an **auto-dependent** urban fabric typical of low-density North American metropolises. City Y painted a markedly different picture: metro patronage soared to 45,000, eclipsing cars (30,000) by 50 per cent, while the bus network served a steady 25,000—indicative of substantial **modal-shift** policies and dense rail coverage.\n\nCity Z provided the most progressive snapshot. Cycling attracted 28,000 daily commuters, narrowly outpacing buses (22,000) and metro (18,000), with car use **dialled back** to a comparatively modest 20,000. This **inversion**, in which non-motorised travel **outranked** every motorised alternative, is often associated with **dedicated cycle infrastructure**, **congestion-charging schemes** and compact land use. Taken together, the chart underscores that municipal investment in mass transit and bicycle networks can decisively **decouple** mobility from car dependency.",
    "glossary": [
      {
        "term": "modal splits",
        "vietnamese": "cơ cấu phương thức di chuyển",
        "context": "The three cities exhibit strikingly divergent modal splits."
      },
      {
        "term": "emphatically car-centric",
        "vietnamese": "phụ thuộc rõ rệt vào ô tô",
        "context": "City X is emphatically car-centric."
      },
      {
        "term": "active-mobility uptake",
        "vietnamese": "mức độ sử dụng phương tiện chủ động",
        "context": "City Z stands out as a model of active-mobility uptake."
      },
      {
        "term": "Copenhagenisation",
        "vietnamese": "xu hướng kiểu Copenhagen (đô thị hóa xe đạp)",
        "context": "Echoing the Copenhagenisation trend visible in cities such as Amsterdam."
      },
      {
        "term": "dwarfed",
        "vietnamese": "lấn át hoàn toàn",
        "context": "Private vehicles dwarfed every alternative, with roughly 50,000 daily commuters."
      },
      {
        "term": "negligible",
        "vietnamese": "không đáng kể",
        "context": "Cycling was virtually negligible at just 5,000."
      },
      {
        "term": "auto-dependent",
        "vietnamese": "phụ thuộc vào ô tô",
        "context": "Suggesting an auto-dependent urban fabric typical of low-density metropolises."
      },
      {
        "term": "modal-shift",
        "vietnamese": "chuyển đổi phương thức",
        "context": "Indicative of substantial modal-shift policies and dense rail coverage."
      },
      {
        "term": "dialled back",
        "vietnamese": "được giảm bớt",
        "context": "Car use was dialled back to a comparatively modest 20,000."
      },
      {
        "term": "inversion",
        "vietnamese": "sự đảo ngược",
        "context": "This inversion, in which non-motorised travel outranked every motorised alternative."
      },
      {
        "term": "outranked",
        "vietnamese": "xếp trên/vượt hơn",
        "context": "Non-motorised travel outranked every motorised alternative."
      },
      {
        "term": "decouple",
        "vietnamese": "tách rời",
        "context": "Investment in mass transit can decouple mobility from car dependency."
      }
    ],
    "reviewExercise": {
      "type": "gap-fill",
      "instruction": "Fill in the blanks with appropriate words from the essay.",
      "items": [
        {
          "sentence": "The three cities exhibit strikingly divergent ___.",
          "answer": "modal splits",
          "explanation": "'Modal splits' refer to how commuters are distributed across transport types."
        },
        {
          "sentence": "In City X, private vehicles ___ every alternative.",
          "answer": "dwarfed",
          "explanation": "'Dwarfed' means made others appear small by comparison."
        },
        {
          "sentence": "Cycling in City X was virtually ___ at only 5,000 riders.",
          "answer": "negligible",
          "explanation": "'Negligible' means so small as to be insignificant."
        },
        {
          "sentence": "City Z showed an ___ in which bicycles outranked cars.",
          "answer": "inversion",
          "explanation": "'Inversion' means a reversal of the usual order."
        },
        {
          "sentence": "Good infrastructure can ___ mobility from car dependency.",
          "answer": "decouple",
          "explanation": "'Decouple' means to separate two things previously linked together."
        }
      ]
    },
    "chartConfig": {
      "type": "bar",
      "xKey": "city",
      "yKeys": ["Car", "Bus", "Metro", "Bicycle"],
      "yLabel": "Commuters (thousands)",
      "data": [
        {"city": "City X", "Car": 50, "Bus": 20, "Metro": 15, "Bicycle": 5},
        {"city": "City Y", "Car": 30, "Bus": 25, "Metro": 45, "Bicycle": 8},
        {"city": "City Z", "Car": 20, "Bus": 22, "Metro": 18, "Bicycle": 28}
      ]
    }
  },
  {
    "id": "t1-5",
    "taskType": 1,
    "chartType": "pie",
    "topic": "tourism",
    "prompt": "The pie charts below show the allocation of tourist expenditure by category in City Z in 2010 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    "essayBody": "The two pie charts compare the **composition** of tourist expenditure across five categories—accommodation, food, entertainment, transport, and shopping—in City Z at two snapshots a decade apart, namely 2010 and 2020.\n\nOverall, the charts capture a clear **reallocation of discretionary spending** away from fixed-cost items (accommodation, transport) and toward **experiential consumption** (entertainment, shopping, and food), mirroring the global **experience-economy** trend popularised by Pine and Gilmore and amplified by post-2015 platforms such as Airbnb Experiences and GetYourGuide.\n\nAccommodation, while remaining the **single largest budget line**, saw its share **erode** from 40 per cent in 2010 to 30 per cent in 2020—a ten-point retreat largely attributable to the proliferation of peer-to-peer lodging that **drove down nightly rates**. Transport followed a similar **downward trajectory**, contracting from 20 to 15 per cent, in line with cheaper urban-pass systems and the rise of low-cost carriers documented by UNWTO data.\n\nConversely, every **experiential category** registered notable gains. Food expenditure climbed five points to 20 per cent, entertainment **rose by half** from 10 to 15 per cent, and shopping advanced from 15 to 20 per cent, narrowly **edging out** transport. Collectively, the three experience-led headings absorbed 55 per cent of tourist wallets in 2020 versus only 40 per cent a decade earlier—a fifteen-point swing that constitutes the most **consequential shift** in the dataset and confirms a structural pivot toward **memory-making expenditure**.",
    "glossary": [
      {
        "term": "composition",
        "vietnamese": "cơ cấu/thành phần",
        "context": "The two pie charts compare the composition of tourist expenditure across five categories."
      },
      {
        "term": "reallocation of discretionary spending",
        "vietnamese": "tái phân bổ chi tiêu tùy ý",
        "context": "The charts capture a clear reallocation of discretionary spending away from fixed-cost items."
      },
      {
        "term": "experiential consumption",
        "vietnamese": "tiêu dùng trải nghiệm",
        "context": "A shift toward experiential consumption."
      },
      {
        "term": "experience-economy",
        "vietnamese": "kinh tế trải nghiệm",
        "context": "Mirroring the global experience-economy trend popularised by Pine and Gilmore."
      },
      {
        "term": "single largest budget line",
        "vietnamese": "khoản chi lớn nhất",
        "context": "Accommodation remained the single largest budget line."
      },
      {
        "term": "erode",
        "vietnamese": "xói mòn/giảm dần",
        "context": "Its share saw its share erode from 40 per cent to 30 per cent."
      },
      {
        "term": "drove down nightly rates",
        "vietnamese": "kéo giảm giá thuê phòng theo đêm",
        "context": "The proliferation of peer-to-peer lodging that drove down nightly rates."
      },
      {
        "term": "downward trajectory",
        "vietnamese": "xu hướng đi xuống",
        "context": "Transport followed a similar downward trajectory, contracting from 20 to 15 per cent."
      },
      {
        "term": "experiential category",
        "vietnamese": "hạng mục trải nghiệm",
        "context": "Conversely, every experiential category registered notable gains."
      },
      {
        "term": "rose by half",
        "vietnamese": "tăng thêm một nửa",
        "context": "Entertainment rose by half from 10 to 15 per cent."
      },
      {
        "term": "edging out",
        "vietnamese": "vượt sát/qua mặt nhẹ",
        "context": "Shopping advanced from 15 to 20 per cent, narrowly edging out transport."
      },
      {
        "term": "consequential shift",
        "vietnamese": "sự thay đổi có ý nghĩa quan trọng",
        "context": "A fifteen-point swing that constitutes the most consequential shift in the dataset."
      },
      {
        "term": "memory-making expenditure",
        "vietnamese": "chi tiêu tạo kỷ niệm",
        "context": "A structural pivot toward memory-making expenditure."
      }
    ],
    "reviewExercise": {
      "type": "gap-fill",
      "instruction": "Fill in the blanks with appropriate words from the essay.",
      "items": [
        {
          "sentence": "The charts show a clear ___ away from fixed-cost items.",
          "answer": "reallocation of discretionary spending",
          "explanation": "Redistributing optional spending across different categories."
        },
        {
          "sentence": "Accommodation remained the ___, though its share fell.",
          "answer": "single largest budget line",
          "explanation": "The biggest category of expenditure in the breakdown."
        },
        {
          "sentence": "Accommodation's share began to ___ as peer-to-peer lodging spread.",
          "answer": "erode",
          "explanation": "'Erode' means to gradually wear away or diminish."
        },
        {
          "sentence": "Shopping climbed five points, narrowly ___ transport in 2020.",
          "answer": "edging out",
          "explanation": "'Edging out' means narrowly surpassing or beating."
        },
        {
          "sentence": "The fifteen-point swing represents the most ___ in the dataset.",
          "answer": "consequential shift",
          "explanation": "A change with significant and far-reaching effects."
        }
      ]
    },
    "chartConfig": {
      "type": "pie",
      "pieNameKey": "name",
      "pieValueKey": "value",
      "labels": ["2010", "2020"],
      "data": [
        {"name": "Accommodation", "value": 40},
        {"name": "Food", "value": 15},
        {"name": "Entertainment", "value": 10},
        {"name": "Transport", "value": 20},
        {"name": "Shopping", "value": 15}
      ],
      "data2": [
        {"name": "Accommodation", "value": 30},
        {"name": "Food", "value": 20},
        {"name": "Entertainment", "value": 15},
        {"name": "Transport", "value": 15},
        {"name": "Shopping", "value": 20}
      ]
    }
  },
  {
    "id": "t1-6",
    "taskType": 1,
    "chartType": "pie",
    "topic": "employment",
    "prompt": "The pie charts below illustrate the distribution of employment by sector (agriculture, manufacturing, services, technology) in Country A in 1995 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    "essayBody": "The pie charts illustrate the distribution of employment across four sectors - agriculture, manufacturing, services, and technology - in Country A in the years 1995 and 2025.\n\nOverall, the figures suggest a pronounced **structural change** in the labor market, shifting away from traditional sectors toward knowledge-driven employment. Most notably, services **eclipsed** all other sectors by 2025 while agriculture experienced the steepest decline.\n\nAgriculture experienced a marked **contraction** from 35% of total employment in 1995 to just 10% by 2025, ceding ground to both services and technology. Manufacturing's share edged down from 25% to 20%, retaining a sizeable footprint but losing its former prominence. By 2025, services had risen from 30% to 45%, becoming the principal employer, with technology emerging as a **nascent** but fast-growing contributor at 25%.\n\nThe overall **sectoral composition** thus **rebalanced** away from **labor-intensive** activities toward **high-value-added** roles. The decline in agriculture, coupled with manufacturing's modest slip, underscores a national **reorientation** toward knowledge-driven employment. The expansion of technology created complementary roles within services, amplifying the shift and reshaping the country's economic landscape.",
    "glossary": [
      {
        "term": "structural change",
        "vietnamese": "thay đổi cơ cấu",
        "context": "a pronounced structural change in the labor market"
      },
      {
        "term": "contraction",
        "vietnamese": "sự thu hẹp",
        "context": "agriculture experienced a marked contraction"
      },
      {
        "term": "eclipsed",
        "vietnamese": "vượt trội/che khuất",
        "context": "services had eclipsed all other sectors"
      },
      {
        "term": "nascent",
        "vietnamese": "mới nổi",
        "context": "technology emerging as a nascent contributor"
      },
      {
        "term": "sectoral composition",
        "vietnamese": "cơ cấu ngành",
        "context": "overall sectoral composition rebalanced"
      },
      {
        "term": "rebalanced",
        "vietnamese": "tái cân bằng",
        "context": "composition thus rebalanced"
      },
      {
        "term": "labor-intensive",
        "vietnamese": "thâm dụng lao động",
        "context": "away from labor-intensive activities"
      },
      {
        "term": "high-value-added",
        "vietnamese": "giá trị gia tăng cao",
        "context": "toward high-value-added roles"
      },
      {
        "term": "reorientation",
        "vietnamese": "tái định hướng",
        "context": "a national reorientation toward knowledge-driven jobs"
      }
    ],
    "reviewExercise": {
      "type": "gap-fill",
      "instruction": "Fill in the blanks with appropriate words from the essay.",
      "items": [
        {
          "sentence": "Agriculture underwent a significant ___.",
          "answer": "contraction",
          "explanation": "'Contraction' means a decrease in size or scope."
        },
        {
          "sentence": "By 2025, services had ___ the other sectors.",
          "answer": "eclipsed",
          "explanation": "'Eclipsed' means surpassed and overshadowed."
        },
        {
          "sentence": "Technology appeared as a ___ but growing employer.",
          "answer": "nascent",
          "explanation": "'Nascent' means just beginning to develop."
        },
        {
          "sentence": "The economy ___ away from labor-intensive work.",
          "answer": "rebalanced",
          "explanation": "'Rebalanced' means adjusted to a new equilibrium."
        },
        {
          "sentence": "The shift indicates a national ___.",
          "answer": "reorientation",
          "explanation": "'Reorientation' means a fundamental change in direction."
        }
      ]
    },
    "chartConfig": {
      "type": "pie",
      "pieNameKey": "name",
      "pieValueKey": "value",
      "labels": ["1995", "2025"],
      "data": [
        {"name": "Agriculture", "value": 35},
        {"name": "Manufacturing", "value": 25},
        {"name": "Services", "value": 30},
        {"name": "Technology", "value": 10}
      ],
      "data2": [
        {"name": "Agriculture", "value": 10},
        {"name": "Manufacturing", "value": 20},
        {"name": "Services", "value": 45},
        {"name": "Technology", "value": 25}
      ]
    }
  },
  {
    "id": "t1-7",
    "taskType": 1,
    "chartType": "table",
    "topic": "health",
    "prompt": "The table below presents key health indicators (life expectancy, infant mortality per 1,000, doctors per 1,000, and health expenditure as % of GDP) for four countries in 2010 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    "essayBody": "The table presents four key health indicators - life expectancy, infant mortality per 1,000, doctors per 1,000, and health expenditure as a percentage of GDP - for four countries in 2010 and 2020.\n\nOverall, all countries registered **sustained improvement** across the decade, though the pace varied by metric and nation. Most significantly, a clear **correlation** emerges between higher doctor availability and reduced infant deaths.\n\nLife expectancy rose almost universally, with Country Q posting the largest gain from 68 to 75 years, while Country R - already a **benchmark** at 82 - advanced more modestly to 84. Infant mortality fell **markedly**, with the steepest drops in Countries Q and S from 35 to 18 and 28 to 12 per 1,000 respectively, indicating effective primary care and vaccination outreach. Physician density increased in each case, albeit **incrementally** in lower-income states and more substantially where training capacity expanded.\n\nHealth spending as a share of GDP diverged: some systems saw a mild uptick aligned with reforms, while others **plateaued**, prioritizing efficiency. Country T is an **outlier**, achieving notable mortality declines without proportionate spending growth, suggesting that targeted interventions can be cost-effective. Despite **concurrent** advances across indicators, cross-country **divergence** persists, reflecting heterogeneous baselines and policy choices.",
    "glossary": [
      {
        "term": "sustained improvement",
        "vietnamese": "cải thiện bền vững",
        "context": "registered sustained improvement"
      },
      {
        "term": "benchmark",
        "vietnamese": "chuẩn mực/điểm tham chiếu",
        "context": "Country R-already a benchmark"
      },
      {
        "term": "incrementally",
        "vietnamese": "từng bước/nhỏ",
        "context": "physician density increased incrementally"
      },
      {
        "term": "markedly",
        "vietnamese": "đáng kể/rõ rệt",
        "context": "increased more markedly"
      },
      {
        "term": "plateaued",
        "vietnamese": "ổn định không tăng",
        "context": "spending plateaued"
      },
      {
        "term": "correlation",
        "vietnamese": "tương quan",
        "context": "a clear correlation emerges"
      },
      {
        "term": "outlier",
        "vietnamese": "trường hợp khác biệt",
        "context": "Country T is an outlier"
      },
      {
        "term": "concurrent",
        "vietnamese": "đồng thời",
        "context": "concurrent advances across indicators"
      },
      {
        "term": "divergence",
        "vietnamese": "sự khác biệt/đi chệch",
        "context": "cross-country divergence persists"
      }
    ],
    "reviewExercise": {
      "type": "gap-fill",
      "instruction": "Fill in the blanks with appropriate words from the essay.",
      "items": [
        {
          "sentence": "All countries showed ___ across the decade.",
          "answer": "sustained improvement",
          "explanation": "'Sustained improvement' means continuous, lasting progress."
        },
        {
          "sentence": "In some cases, health spending ___ rather than rising.",
          "answer": "plateaued",
          "explanation": "'Plateaued' means leveled off without further increase."
        },
        {
          "sentence": "There is a clear ___ between doctors per 1,000 and infant mortality.",
          "answer": "correlation",
          "explanation": "'Correlation' is a statistical relationship between variables."
        },
        {
          "sentence": "Country T was an ___ in the pattern.",
          "answer": "outlier",
          "explanation": "An 'outlier' deviates from the expected pattern."
        },
        {
          "sentence": "Advances were ___ across multiple indicators.",
          "answer": "concurrent",
          "explanation": "'Concurrent' means happening at the same time."
        }
      ]
    },
    "chartConfig": {
      "type": "table",
      "columns": ["Country", "Life Exp. 2010", "Life Exp. 2020", "Infant Mort. 2010", "Infant Mort. 2020", "Doctors/1k 2010", "Doctors/1k 2020", "Health Exp. 2010", "Health Exp. 2020"],
      "rows": [
        ["Country Q", "68", "75", "35", "18", "1.2", "1.8", "4.5%", "5.8%"],
        ["Country R", "82", "84", "3", "2", "3.8", "4.2", "10.5%", "11.0%"],
        ["Country S", "72", "78", "28", "12", "1.5", "2.3", "5.0%", "6.2%"],
        ["Country T", "70", "77", "32", "15", "1.0", "1.4", "3.8%", "4.0%"]
      ],
      "data": []
    }
  },
  {
    "id": "t1-8",
    "taskType": 1,
    "chartType": "map",
    "topic": "urbanization",
    "prompt": "The maps below show changes to the town of Riverdale between 1990 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    "essayBody": "The two maps compare the layout of the town of Riverdale in 1990 and 2020, highlighting the changes that occurred over this thirty-year period.\n\nOverall, Riverdale underwent substantial **transformation**, evolving from a semi-rural settlement into a more compact, transit-oriented urban center. The most striking change was the conversion of farmland into residential and commercial zones, indicating marked **densification**.\n\nIn 1990, farmland dominated the northern and eastern outskirts, but by 2020 much of this had been **rezoned** for housing estates. A new ring road and expanded **arterial** connections improved **connectivity** across the town, linking previously isolated neighborhoods. Industrial activity shifted from the riverside to a peripheral business park in the south, reducing **encroachment** on the waterfront.\n\nA central square was **pedestrianized** to prioritize foot traffic, and the school relocated closer to the new residential clusters. A landscaped **greenbelt** was established along the western edge, providing recreational space for the growing population. Commercial uses intensified along the former high street, with mixed-use **infill** replacing parking lots as the spatial logic pivoted from car-centric sprawl to transit-oriented development.",
    "glossary": [
      {
        "term": "transformation",
        "vietnamese": "sự biến đổi",
        "context": "substantial transformation of Riverdale"
      },
      {
        "term": "rezoned",
        "vietnamese": "tái phân khu",
        "context": "farmland was rezoned for housing"
      },
      {
        "term": "densification",
        "vietnamese": "tăng mật độ xây dựng",
        "context": "indicating marked densification"
      },
      {
        "term": "arterial",
        "vietnamese": "trục giao thông chính",
        "context": "expanded arterial connections"
      },
      {
        "term": "connectivity",
        "vietnamese": "kết nối",
        "context": "improved connectivity"
      },
      {
        "term": "pedestrianized",
        "vietnamese": "biến thành phố đi bộ",
        "context": "central square was pedestrianized"
      },
      {
        "term": "encroachment",
        "vietnamese": "sự lấn chiếm",
        "context": "reducing encroachment on the waterfront"
      },
      {
        "term": "greenbelt",
        "vietnamese": "vành đai xanh",
        "context": "enabling a landscaped greenbelt"
      },
      {
        "term": "infill",
        "vietnamese": "xây chen",
        "context": "mixed-use infill replacing parking lots"
      }
    ],
    "reviewExercise": {
      "type": "gap-fill",
      "instruction": "Fill in the blanks with appropriate words from the essay.",
      "items": [
        {
          "sentence": "Farmland was ___ for new housing estates.",
          "answer": "rezoned",
          "explanation": "'Rezoned' means the land use designation was officially changed."
        },
        {
          "sentence": "The town experienced marked ___.",
          "answer": "densification",
          "explanation": "'Densification' means increasing the density of development."
        },
        {
          "sentence": "A central square was ___ to favor walkers.",
          "answer": "pedestrianized",
          "explanation": "'Pedestrianized' means converted for foot traffic only."
        },
        {
          "sentence": "A new business park reduced riverfront ___.",
          "answer": "encroachment",
          "explanation": "'Encroachment' means gradually intruding on an area."
        },
        {
          "sentence": "A landscaped ___ was created at the edge.",
          "answer": "greenbelt",
          "explanation": "A 'greenbelt' is a protected green area around a city."
        }
      ]
    },
    "chartConfig": {
      "type": "map",
      "stages": [
        {"title": "1990: Semi-rural Settlement", "description": "Farmland dominates the outskirts. Riverside industrial zone. Small town center with limited road network.", "icon": "map"},
        {"title": "Farmland → Housing Estates", "description": "Northern and eastern farmland rezoned for dense residential development.", "icon": "map"},
        {"title": "New Ring Road & Arterial Roads", "description": "Expanded road connections improve connectivity across neighborhoods.", "icon": "map"},
        {"title": "Central Square Pedestrianized", "description": "Town center converted to a pedestrian-friendly area with foot traffic priority.", "icon": "map"},
        {"title": "Industry Relocated to Peripheral Park", "description": "Industrial activity moves from the riverside to a southern business park.", "icon": "cog"},
        {"title": "2020: Transit-oriented Urban Center", "description": "Greenbelt established. Mixed-use infill replaces parking lots. School relocated near residents.", "icon": "map"}
      ],
      "data": []
    }
  },
  {
    "id": "t1-9",
    "taskType": 1,
    "chartType": "process",
    "topic": "technology",
    "prompt": "The diagram below shows the process of cloud data backup and recovery across multiple availability zones. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    "essayBody": "The diagram illustrates the step-by-step process of cloud data backup and recovery across multiple availability zones.\n\nOverall, the process follows a **sequential** workflow designed to safeguard user data from loss through redundancy, validation, and automated **failover** mechanisms. The entire system is built on a **fault-tolerant** architecture that minimizes downtime by avoiding single points of failure.\n\nInitially, files undergo client-side **encryption** during **intake**, after which they are transmitted to a regional gateway for deduplication and indexing. The system then performs **replication** to at least three independent zones to create **redundancy**, accompanied by **checksum** validation to detect corruption. A central **orchestration** layer continuously monitors health across all zones and automatically triggers failover if one zone degrades.\n\nPeriodic integrity audits and versioning provide additional resilience, allowing point-in-time restoration from any previous snapshot. During recovery, authenticated requests query the catalog and pull blocks in parallel for rapid **retrieval**, with traffic re-routed to the healthiest replica if latency spikes. Compared with single-site storage, this multi-zone approach ensures near-zero data loss and significantly faster recovery times.",
    "glossary": [
      {
        "term": "sequential",
        "vietnamese": "tuần tự",
        "context": "a sequential workflow"
      },
      {
        "term": "encryption",
        "vietnamese": "mã hóa",
        "context": "client-side encryption during intake"
      },
      {
        "term": "intake",
        "vietnamese": "khâu tiếp nhận",
        "context": "files during intake"
      },
      {
        "term": "replication",
        "vietnamese": "sao chép bản",
        "context": "replication to multiple zones"
      },
      {
        "term": "redundancy",
        "vietnamese": "dự phòng thừa",
        "context": "create redundancy"
      },
      {
        "term": "checksum",
        "vietnamese": "mã kiểm tra",
        "context": "checksum validation to detect corruption"
      },
      {
        "term": "orchestration",
        "vietnamese": "điều phối tự động",
        "context": "central orchestration layer"
      },
      {
        "term": "failover",
        "vietnamese": "chuyển đổi dự phòng",
        "context": "triggers failover if one zone degrades"
      },
      {
        "term": "retrieval",
        "vietnamese": "truy xuất",
        "context": "parallel retrieval during recovery"
      },
      {
        "term": "fault-tolerant",
        "vietnamese": "chịu lỗi",
        "context": "fault-tolerant architecture"
      }
    ],
    "reviewExercise": {
      "type": "gap-fill",
      "instruction": "Fill in the blanks with appropriate words from the essay.",
      "items": [
        {
          "sentence": "Client-side ___ protects files before upload.",
          "answer": "encryption",
          "explanation": "'Encryption' converts data into a secure coded format."
        },
        {
          "sentence": "Data are copied to several zones to ensure ___.",
          "answer": "redundancy",
          "explanation": "'Redundancy' means having backup copies for safety."
        },
        {
          "sentence": "A central layer provides automated ___.",
          "answer": "orchestration",
          "explanation": "'Orchestration' means automated coordination of processes."
        },
        {
          "sentence": "If a zone fails, traffic shifts via ___.",
          "answer": "failover",
          "explanation": "'Failover' is automatic switching to a backup system."
        },
        {
          "sentence": "Blocks are pulled in parallel for rapid ___.",
          "answer": "retrieval",
          "explanation": "'Retrieval' means recovering or accessing stored data."
        }
      ]
    },
    "chartConfig": {
      "type": "process",
      "stages": [
        {"title": "Client-side Encryption", "description": "Files are encrypted on the user's device before upload to ensure security during transmission.", "icon": "shield"},
        {"title": "Gateway Intake & Deduplication", "description": "Encrypted files are received by a regional gateway, which removes duplicate data and creates an index.", "icon": "server"},
        {"title": "Multi-zone Replication", "description": "Data is replicated to at least 3 independent availability zones with checksum validation.", "icon": "database"},
        {"title": "Orchestration & Health Monitoring", "description": "A central layer continuously monitors zone health and triggers automatic failover if degradation is detected.", "icon": "cog"},
        {"title": "Integrity Audits & Versioning", "description": "Periodic audits verify data integrity. Versioning enables point-in-time restoration from any snapshot.", "icon": "shield"},
        {"title": "Parallel Recovery & Retrieval", "description": "Authenticated requests pull data blocks in parallel from the healthiest replica for rapid recovery.", "icon": "database"}
      ],
      "data": []
    }
  },
  {
    "id": "t1-10",
    "taskType": 1,
    "chartType": "mixed",
    "topic": "trade",
    "prompt": "The mixed chart below shows export values by sector (agriculture, manufacturing, services) as bars and the overall trade balance as a line from 2015 to 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    "essayBody": "The mixed chart presents export values by sector - agriculture, manufacturing, and services - as bars, alongside the overall trade balance shown as a line, from 2015 to 2020.\n\nOverall, the data point to shifting export dynamics and a volatile **net balance** over the six-year period. Notably, services emerged as a stabilizing force while manufacturing experienced a mid-period **downturn** before recovering.\n\nManufacturing remained the **aggregate** driver of exports, contributing over $50 billion annually, though its growth was uneven with a notable dip in 2017. Services exhibited steady **outperformance**, posting a consistent **uptick** each year from $30 billion to $45 billion, which helped **counteract** manufacturing softness. Agricultural exports were relatively flat at around $15 billion and, at times, acted as a **drag** on overall momentum.\n\nCorrespondingly, the trade balance line mirrored these sectoral movements, dipping during the manufacturing slump before improving as both services and factories advanced. Despite episodic **volatility**, the account trended modestly upward by 2020, suggesting that competitive services can cushion cyclical goods sectors. The best overall year coincided with synchronized gains across all three pillars, underscoring the value of **diversification** in trade strategy.",
    "glossary": [
      {
        "term": "net balance",
        "vietnamese": "cán cân ròng",
        "context": "a volatile net balance"
      },
      {
        "term": "aggregate",
        "vietnamese": "tổng hợp/chung",
        "context": "aggregate driver of exports"
      },
      {
        "term": "downturn",
        "vietnamese": "suy giảm",
        "context": "a mid-period downturn"
      },
      {
        "term": "outperformance",
        "vietnamese": "vượt trội",
        "context": "services exhibited steady outperformance"
      },
      {
        "term": "uptick",
        "vietnamese": "tăng nhẹ",
        "context": "posting a consistent uptick"
      },
      {
        "term": "counteract",
        "vietnamese": "chống lại/giảm bớt",
        "context": "helped counteract manufacturing softness"
      },
      {
        "term": "drag",
        "vietnamese": "gánh nặng/kéo lùi",
        "context": "a drag on momentum"
      },
      {
        "term": "volatility",
        "vietnamese": "biến động",
        "context": "episodic volatility"
      },
      {
        "term": "diversification",
        "vietnamese": "đa dạng hóa",
        "context": "underscoring the value of diversification"
      }
    ],
    "reviewExercise": {
      "type": "gap-fill",
      "instruction": "Fill in the blanks with appropriate words from the essay.",
      "items": [
        {
          "sentence": "Services showed steady ___ over the period.",
          "answer": "outperformance",
          "explanation": "'Outperformance' means exceeding expectations or peers."
        },
        {
          "sentence": "Manufacturing faced a mid-period ___.",
          "answer": "downturn",
          "explanation": "A 'downturn' is a period of economic decline."
        },
        {
          "sentence": "The trade ___ improved as exports recovered.",
          "answer": "net balance",
          "explanation": "'Net balance' is the difference between exports and imports."
        },
        {
          "sentence": "Agriculture was at times a ___ on growth.",
          "answer": "drag",
          "explanation": "A 'drag' is something that slows progress."
        },
        {
          "sentence": "Gains in services helped ___ weakness elsewhere.",
          "answer": "counteract",
          "explanation": "'Counteract' means to work against or offset something."
        }
      ]
    },
    "chartConfig": {
      "type": "mixed",
      "xKey": "year",
      "barKeys": ["Agriculture", "Manufacturing", "Services"],
      "lineKey": "Trade Balance",
      "yLabel": "Billion $",
      "data": [
        {"year": 2015, "Agriculture": 15, "Manufacturing": 52, "Services": 30, "Trade Balance": 8},
        {"year": 2016, "Agriculture": 14, "Manufacturing": 50, "Services": 33, "Trade Balance": 5},
        {"year": 2017, "Agriculture": 15, "Manufacturing": 45, "Services": 35, "Trade Balance": 2},
        {"year": 2018, "Agriculture": 14, "Manufacturing": 48, "Services": 38, "Trade Balance": 6},
        {"year": 2019, "Agriculture": 16, "Manufacturing": 53, "Services": 42, "Trade Balance": 10},
        {"year": 2020, "Agriculture": 15, "Manufacturing": 55, "Services": 45, "Trade Balance": 12}
      ]
    }
  },
  {
    "id": "t2-1",
    "taskType": 2,
    "essayType": "opinion",
    "topic": "Education technology in classrooms",
    "prompt": "Some people believe that integrating technology into classrooms significantly improves learning outcomes, while others argue it distracts students from deep learning. To what extent do you agree or disagree?",
    "essayBody": "Technology, when thoughtfully deployed, can transform classrooms from passive lecture halls into vibrant ecosystems of inquiry. I strongly agree that integration improves learning outcomes, provided it is guided by sound **pedagogy** rather than novelty. Digital tools should serve clear objectives such as **formative assessment**, **personalization** and timely feedback - not simply add more **screen time** to an already saturated day.\n\nFirst, technology empowers teachers to run genuinely **blended learning** environments. Instead of one-size-fits-all lectures, students rotate between teacher-led explanation and adaptive platforms that diagnose misconceptions in real time. Through powerful **learning analytics**, educators can track progress at granular levels, spotting gaps early and tailoring support accordingly; OECD studies consistently associate well-implemented analytics with double-digit gains in assessment scores. This boosts both efficiency and mastery, especially when paired with a **flipped classroom** model that moves content delivery outside class, reserving precious lesson time for dialogue, practice and collaborative problem-solving.\n\nSecond, well-governed platforms can meaningfully enhance fairness. Properly designed systems widen **equity** by giving diverse learners multiple ways to access material - text, audio, video or interactive simulations - and by allowing pacing that genuinely suits individual needs. However, such benefits depend on bridging the persistent **digital divide**; without robust infrastructure and device access, edtech risks entrenching the very inequalities it claims to solve. Equally vital is strong **data privacy** protection, ensuring sensitive student records are safeguarded and used ethically through minimal collection and transparent algorithms.\n\nCritics rightly warn that personal devices can distract, yet this is fundamentally a design and classroom-culture problem, not an inherent flaw of the technology itself. With purposeful routines, low-friction interfaces and a sustained focus on meaningful learning rather than superficial gamification, technology cultivates depth without fragmentation. Ultimately, the question is not whether to use technology, but whether we use it to genuinely advance learning. When anchored in evidence-informed pedagogy, technology becomes a powerful amplifier of skilled human teaching.",
    "glossary": [
      {
        "term": "pedagogy",
        "vietnamese": "phương pháp sư phạm",
        "context": "I strongly agree that integration improves learning outcomes, provided it is guided by sound pedagogy rather than novelty."
      },
      {
        "term": "formative assessment",
        "vietnamese": "đánh giá định hình trong quá trình học",
        "context": "Digital tools should serve clear objectives such as formative assessment and timely feedback."
      },
      {
        "term": "personalization",
        "vietnamese": "cá nhân hóa trải nghiệm học",
        "context": "Adaptive platforms enable personalization by diagnosing misconceptions in real time."
      },
      {
        "term": "screen time",
        "vietnamese": "thời gian sử dụng màn hình",
        "context": "Technology should serve real objectives, not simply add more screen time to an already saturated day."
      },
      {
        "term": "blended learning",
        "vietnamese": "học kết hợp trực tiếp và trực tuyến",
        "context": "Technology empowers teachers to run genuinely blended learning environments."
      },
      {
        "term": "learning analytics",
        "vietnamese": "phân tích dữ liệu học tập",
        "context": "Through powerful learning analytics, educators can track progress at granular levels and spot gaps early."
      },
      {
        "term": "flipped classroom",
        "vietnamese": "lớp học đảo ngược",
        "context": "A flipped classroom model moves content delivery outside class, reserving lesson time for dialogue and practice."
      },
      {
        "term": "equity",
        "vietnamese": "sự công bằng",
        "context": "Well-designed systems widen equity by giving diverse learners multiple ways to access material."
      },
      {
        "term": "digital divide",
        "vietnamese": "khoảng cách số",
        "context": "Such benefits depend on bridging the persistent digital divide between students with and without devices."
      },
      {
        "term": "data privacy",
        "vietnamese": "quyền riêng tư dữ liệu",
        "context": "Equally vital is strong data privacy protection, ensuring sensitive student records are safeguarded ethically."
      }
    ],
    "reviewExercise": {
      "type": "gap-fill",
      "instruction": "Fill in the blanks.",
      "items": [
        {
          "sentence": "Teachers used real-time quizzes for ___ to adjust instruction.",
          "answer": "formative assessment"
        },
        {
          "sentence": "A ___ model mixes online modules with live workshops.",
          "answer": "blended learning"
        },
        {
          "sentence": "Schools must close the ___ so all students can benefit.",
          "answer": "digital divide"
        },
        {
          "sentence": "Strong ___, not flashy apps, should guide tech choices.",
          "answer": "pedagogy"
        },
        {
          "sentence": "Protecting student records requires strict ___ standards.",
          "answer": "data privacy"
        }
      ]
    }
  },
  {
    "id": "t2-2",
    "taskType": 2,
    "essayType": "discussion",
    "topic": "Carbon taxes vs renewable subsidies",
    "prompt": "Some argue that carbon taxes are the most effective way to address climate change, while others believe subsidies for renewable energy are better. Discuss both views and give your opinion.",
    "essayBody": "Advocates of carbon taxes contend that they internalise environmental **externalities** by embedding climate costs directly into market prices. A robust levy sends a clear, economy-wide **price signal** that steers both producers and consumers away from carbon-intensive goods. Because such taxes operate technology-neutrally, they reshape the entire **energy mix**, motivating both efficiency gains and rapid fuel switching. When set predictably along a rising trajectory, and paired with revenue dividends to households, they can be fiscally elegant and surprisingly socially palatable, as Canada and Sweden have shown.\n\nOpponents, however, worry about political feasibility and unintended outcomes. Where the **elasticity** of energy demand is low, taxes may blunt short-term emissions cuts while still burdening low-income households disproportionately. Poorly designed levies can also trigger **carbon leakage**, simply shifting emissions - and jobs - to less-regulated jurisdictions. Others highlight the risk of **regulatory capture**, where vested fossil-fuel interests dilute rates or secure generous exemptions. For these reasons, many policy experts prefer targeted subsidies that accelerate renewables, storage and grid upgrades, arguing that strategic public support drives technology learning curves and avoids the **rebound effect** seen when efficiency lowers costs and merely boosts overall use.\n\nIn my view, the debate is falsely binary. Carbon pricing usefully operationalises the **polluter pays** principle and provides genuine economy-wide incentives for **decarbonisation**; however, markets alone simply cannot overcome infrastructure bottlenecks or finance the early-stage 'valleys of death' that plague clean technologies. Strategic subsidies and patient public investment remain essential to build transmission, fund breakthrough innovation and ensure a credible **just transition** that protects vulnerable workers and regions. To work well, carbon taxes must rise along a transparent trajectory, be integrated with carbon-border adjustments to curb leakage, and have their revenue recycled through progressive rebates. Subsidies, meanwhile, should be sunset as technologies mature, preventing long-term dependency.\n\nUltimately, an efficient, fair climate package blends a rising carbon tax with smart subsidies, performance standards and targeted support for those most exposed. Climate policy should be judged not by ideological purity but by whether it cuts emissions quickly, equitably and at scale.",
    "glossary": [
      {
        "term": "externalities",
        "vietnamese": "tác động ngoại lai",
        "context": "Advocates contend that carbon taxes internalise environmental externalities by embedding climate costs into market prices."
      },
      {
        "term": "price signal",
        "vietnamese": "tín hiệu giá",
        "context": "A robust levy sends a clear, economy-wide price signal that steers producers away from carbon-intensive goods."
      },
      {
        "term": "energy mix",
        "vietnamese": "cơ cấu năng lượng",
        "context": "Because such taxes operate technology-neutrally, they reshape the entire energy mix."
      },
      {
        "term": "elasticity",
        "vietnamese": "độ co giãn của cầu",
        "context": "Where the elasticity of energy demand is low, taxes may blunt short-term emissions cuts."
      },
      {
        "term": "carbon leakage",
        "vietnamese": "rò rỉ carbon ra nước ngoài",
        "context": "Poorly designed levies can trigger carbon leakage, simply shifting emissions to less-regulated jurisdictions."
      },
      {
        "term": "regulatory capture",
        "vietnamese": "sự thâu tóm cơ quan quản lý",
        "context": "Others highlight the risk of regulatory capture, where vested fossil-fuel interests dilute rates."
      },
      {
        "term": "rebound effect",
        "vietnamese": "hiệu ứng dội ngược",
        "context": "Subsidies can avoid the rebound effect seen when efficiency lowers costs and boosts overall use."
      },
      {
        "term": "polluter pays",
        "vietnamese": "nguyên tắc người gây ô nhiễm phải trả",
        "context": "Carbon pricing usefully operationalises the polluter pays principle."
      },
      {
        "term": "decarbonisation",
        "vietnamese": "quá trình khử carbon",
        "context": "Carbon pricing provides genuine economy-wide incentives for decarbonisation."
      },
      {
        "term": "just transition",
        "vietnamese": "chuyển dịch công bằng",
        "context": "Public investment is essential to ensure a credible just transition that protects vulnerable workers and regions."
      }
    ],
    "reviewExercise": {
      "type": "gap-fill",
      "instruction": "Fill in the blanks.",
      "items": [
        {
          "sentence": "A clear ___ encourages firms to invest in clean tech.",
          "answer": "price signal"
        },
        {
          "sentence": "Weak domestic policy can cause ___ as factories relocate.",
          "answer": "carbon leakage"
        },
        {
          "sentence": "Subsidies help shift the ___ toward renewables.",
          "answer": "energy mix"
        },
        {
          "sentence": "Carbon taxes reflect the ___ associated with emissions.",
          "answer": "externalities"
        },
        {
          "sentence": "Protecting coal communities is part of a ___.",
          "answer": "just transition"
        }
      ]
    }
  },
  {
    "id": "t2-3",
    "taskType": 2,
    "essayType": "advantages-disadvantages",
    "topic": "Telemedicine in healthcare",
    "prompt": "Telemedicine has grown rapidly in recent years. Do the advantages of telemedicine outweigh the disadvantages?",
    "essayBody": "Telemedicine has shifted from a pandemic stopgap into a structural pillar of modern care. On balance, its advantages clearly outweigh the drawbacks, provided systems are deliberately designed for safety, equity and accountability.\n\nThe benefits are substantial and well documented. First, virtual access protects **continuity of care** for chronic conditions such as diabetes and hypertension, demonstrably reducing missed appointments and costly hospital readmissions. Effective digital **triage** directs patients to the appropriate level of service - from guided self-care to urgent intervention - easing pressure on overstretched emergency units. Integration with electronic records enhances **interoperability**, enabling clinicians to share data seamlessly across providers and avoid duplicated tests. For remote or underserved communities, telehealth meaningfully advances **health equity** by cutting travel time and out-of-pocket costs. It can also improve **diagnostic accuracy** in dermatology, radiology and stroke care by allowing rapid specialist input via store-and-forward images. For stable patients, **remote monitoring** devices transmit vital signs continuously, enabling proactive adjustments before crises occur, while **asynchronous consulting** lets clinicians handle non-urgent queries efficiently between in-person visits. Clearer **reimbursement** rules have finally made these services financially viable for providers, and robust **clinical governance** frameworks codify best practices that protect patient safety.\n\nNonetheless, genuine risks remain that policy must address. Digital exclusion and low **digital literacy** can marginalise the elderly, disabled and rural poor - precisely the groups telehealth was meant to help. Not all conditions are suited to virtual assessment; subtle physical cues and hands-on examinations may be missed, with potentially serious consequences. Privacy breaches and fragmented platforms undermine patient trust, and perverse fee-for-service incentives could drive overuse without improving outcomes.\n\nTo tip the balance decisively, policy should mandate accessibility features, multilingual support and well-funded community training to raise digital literacy. Clear clinical pathways must specify precisely when in-person review is essential. Interoperable standards, strong consent processes and value-based reimbursement will align incentives with genuine patient benefit. With these safeguards firmly in place, telemedicine complements rather than replaces face-to-face care, delivering the reach, timeliness and resilience that traditional models struggle to match.",
    "glossary": [
      {
        "term": "continuity of care",
        "vietnamese": "tính liên tục của chăm sóc y tế",
        "context": "Virtual access protects continuity of care for chronic conditions such as diabetes and hypertension."
      },
      {
        "term": "triage",
        "vietnamese": "phân loại mức độ ưu tiên y tế",
        "context": "Effective digital triage directs patients to the appropriate level of service."
      },
      {
        "term": "interoperability",
        "vietnamese": "khả năng tương tác giữa các hệ thống",
        "context": "Integration with electronic records enhances interoperability and avoids duplicated tests."
      },
      {
        "term": "health equity",
        "vietnamese": "sự công bằng trong y tế",
        "context": "Telehealth meaningfully advances health equity for remote and underserved communities."
      },
      {
        "term": "diagnostic accuracy",
        "vietnamese": "độ chính xác chẩn đoán",
        "context": "It can improve diagnostic accuracy in dermatology and stroke care via rapid specialist input."
      },
      {
        "term": "remote monitoring",
        "vietnamese": "giám sát bệnh nhân từ xa",
        "context": "Remote monitoring devices transmit vital signs continuously, enabling proactive adjustments."
      },
      {
        "term": "asynchronous consulting",
        "vietnamese": "tư vấn y tế không đồng bộ",
        "context": "Asynchronous consulting lets clinicians handle non-urgent queries efficiently between in-person visits."
      },
      {
        "term": "reimbursement",
        "vietnamese": "cơ chế chi trả bảo hiểm",
        "context": "Clearer reimbursement rules have finally made these services financially viable for providers."
      },
      {
        "term": "clinical governance",
        "vietnamese": "quản trị lâm sàng",
        "context": "Robust clinical governance frameworks codify best practices that protect patient safety."
      },
      {
        "term": "digital literacy",
        "vietnamese": "năng lực số",
        "context": "Digital exclusion and low digital literacy can marginalise the elderly, disabled and rural poor."
      }
    ],
    "reviewExercise": {
      "type": "gap-fill",
      "instruction": "Fill in the blanks.",
      "items": [
        {
          "sentence": "Virtual check-ins can preserve ___ for diabetics.",
          "answer": "continuity of care"
        },
        {
          "sentence": "Online ___ helps route minor cases away from ERs.",
          "answer": "triage"
        },
        {
          "sentence": "Systems must talk to each other to achieve ___.",
          "answer": "interoperability"
        },
        {
          "sentence": "Wearables enable ___ of blood pressure at home.",
          "answer": "remote monitoring"
        },
        {
          "sentence": "Fair ___ prevents perverse incentives and overuse.",
          "answer": "reimbursement"
        }
      ]
    }
  },
  {
    "id": "t2-4",
    "taskType": 2,
    "essayType": "problem-solution",
    "topic": "Urbanization: congestion and housing",
    "prompt": "In many cities, rapid urbanization leads to traffic congestion and housing shortages. What problems does this cause, and what measures can be taken to tackle them?",
    "essayBody": "Explosive urban growth has strained streets and stretched housing markets to breaking point across both rich and emerging economies. Chronic congestion erodes productivity, pollutes the air and frays social cohesion, while soaring rents systematically displace lower-income residents and push essential workers ever further from the jobs that cities offer.\n\nThe problems are mutually reinforcing. Car-dependent settlement patterns encourage **urban sprawl**, lengthening commutes and clogging arterial roads; scarce, unaffordable homes near jobs simultaneously intensify displacement, fuel community friction and create persistent workforce shortages in essential services such as healthcare and education. Public budgets groan under the rising cost of scattered, inefficient infrastructure even as residents' quality of life steadily declines.\n\nA coherent remedy begins with integrated land use and mobility policy. Cities should deliberately concentrate growth around high-capacity transit through **transit-oriented development**, mixing homes, jobs and services within walking distance of stations. Pricing is equally pivotal: well-designed **congestion pricing**, as proven in London, Stockholm and Singapore, can reduce peak-hour traffic by twenty percent or more while generating substantial revenue for better alternatives. Updating restrictive zoning codes to allow **mixed-use** and gentle density enables corner shops, apartments above cafés and compact neighborhoods that genuinely cut car dependence. To expand housing supply, cities should prioritise **infill development** on underused parcels and systematically convert contaminated **brownfield** sites into livable, well-connected districts.\n\nSocially, planners must work hard to curb displacement. Anti-speculation taxes and carefully calibrated **rent control** - designed to protect tenants without freezing new supply - can help. Targeted investment in safe **last-mile connectivity** such as protected cycling lanes and microtransit stitches outlying neighborhoods to trunk transit lines, while inclusionary zoning and well-funded public housing sustain genuine **housing affordability** near jobs.\n\nImplementation matters enormously. Streamlined permit approvals, robust design standards for walkability and transparent data-driven monitoring can align private incentives with public goals. When cities skilfully combine pricing, zoning reform and social safeguards, congestion eases, commutes shorten and housing becomes attainable - turning unchecked expansion into deliberate, human-scale urbanism.",
    "glossary": [
      {
        "term": "urban sprawl",
        "vietnamese": "sự lan tỏa đô thị thiếu kiểm soát",
        "context": "Car-dependent settlement patterns encourage urban sprawl, lengthening commutes and clogging arterial roads."
      },
      {
        "term": "transit-oriented development",
        "vietnamese": "phát triển định hướng giao thông công cộng",
        "context": "Cities should concentrate growth around high-capacity transit through transit-oriented development."
      },
      {
        "term": "congestion pricing",
        "vietnamese": "thu phí ùn tắc giao thông",
        "context": "Well-designed congestion pricing, as proven in London and Singapore, can reduce peak-hour traffic substantially."
      },
      {
        "term": "mixed-use",
        "vietnamese": "phát triển đa chức năng",
        "context": "Updating zoning codes to allow mixed-use and gentle density enables compact, walkable neighborhoods."
      },
      {
        "term": "infill development",
        "vietnamese": "phát triển chen cấy trên đất trống đô thị",
        "context": "To expand housing supply, cities should prioritise infill development on underused parcels."
      },
      {
        "term": "brownfield",
        "vietnamese": "khu đất công nghiệp bỏ hoang ô nhiễm",
        "context": "Cities should systematically convert contaminated brownfield sites into livable, well-connected districts."
      },
      {
        "term": "rent control",
        "vietnamese": "kiểm soát giá thuê nhà",
        "context": "Carefully calibrated rent control can protect tenants without freezing new supply."
      },
      {
        "term": "last-mile connectivity",
        "vietnamese": "kết nối chặng cuối tới giao thông công cộng",
        "context": "Investment in safe last-mile connectivity stitches outlying neighborhoods to trunk transit lines."
      },
      {
        "term": "housing affordability",
        "vietnamese": "khả năng chi trả nhà ở",
        "context": "Inclusionary zoning and public housing sustain genuine housing affordability near jobs."
      },
      {
        "term": "inclusionary zoning",
        "vietnamese": "quy hoạch đòi hỏi tỉ lệ nhà ở giá rẻ",
        "context": "Inclusionary zoning requires private developers to include affordable units alongside market-rate homes."
      }
    ],
    "reviewExercise": {
      "type": "gap-fill",
      "instruction": "Fill in the blanks.",
      "items": [
        {
          "sentence": "Charging drivers at peak hours is known as ___.",
          "answer": "congestion pricing"
        },
        {
          "sentence": "Building near rail hubs exemplifies ___.",
          "answer": "transit-oriented development"
        },
        {
          "sentence": "Redeveloping a disused factory is a ___ project.",
          "answer": "brownfield"
        },
        {
          "sentence": "Adding homes on vacant city parcels is ___.",
          "answer": "infill development"
        },
        {
          "sentence": "Policies must maintain ___ so key workers can live nearby.",
          "answer": "housing affordability"
        }
      ]
    }
  },
  {
    "id": "t2-5",
    "taskType": 2,
    "essayType": "two-part",
    "topic": "Globalisation and cultural identity",
    "prompt": "Globalisation has increased cultural exchange and economic interdependence. 1) How has globalisation changed local cultures? 2) What can governments do to preserve cultural identity while remaining open to the world?",
    "essayBody": "Globalisation has undeniably reconfigured local cultures over the past three decades. On one hand, global media platforms and multinational brands actively promote **cultural homogenisation**, flattening differences as the same film franchises, fashion labels and viral memes spread to virtually every market. Dominant languages, English above all, increasingly serve as a global **lingua franca** that enables trade and scholarship but also gradually crowds out smaller tongues. Consumer choice ostensibly prioritises **consumer sovereignty**, yet recommendation algorithms quietly narrow exposure, ironically standardising tastes across continents.\n\nOn the other hand, genuine cultural hybridity also flourishes in response. Through **glocalisation**, communities creatively adapt global influences to local sensibilities - street vendors fuse culinary traditions, musicians sample distant genres and designers remix heritage motifs for global markets. Expanding **diaspora networks** circulate ideas, remittances and capital that can revitalise **creative industries** back home, while cultural borrowing increasingly becomes a two-way street, amplifying both **soft power** and economic opportunity for smaller nations such as South Korea, whose K-pop industry alone is now valued at billions of dollars annually.\n\nGovernments need neither seal their borders nor surrender cultural identity. First, they should actively protect heritage through detailed inventories, sustained funding and living-tradition programmes underpinned by robust **heritage preservation** laws. Education can systematically cultivate **cultural capital** by teaching local histories, languages and arts alongside global literacy. Second, governments can set clear **regulatory standards** for cultural sectors - sensible quotas or fiscal incentives that ensure diverse domestic content in film, music and broadcasting without stifling creative innovation. Smart urban policy can provide genuinely affordable spaces for studios, galleries and artisan markets that incubate local makers and prevent gentrification from hollowing out creative districts.\n\nInternationally, cultural accords and artist-mobility schemes should enable rich exchange while safeguarding intellectual property and ensuring fair pay for creators. Finally, governments must adopt genuine **policy coherence**: tourism, trade and education policies should all align with cultural goals so that development funds, visa rules and school curricula reinforce - rather than quietly erode - local identity. Done well, openness need not dissolve distinctiveness; instead, it can confidently showcase that distinctiveness to the world.",
    "glossary": [
      {
        "term": "cultural homogenisation",
        "vietnamese": "sự đồng nhất hóa văn hóa",
        "context": "Global media platforms actively promote cultural homogenisation, flattening differences across markets."
      },
      {
        "term": "lingua franca",
        "vietnamese": "ngôn ngữ chung quốc tế",
        "context": "English increasingly serves as a global lingua franca that enables trade and scholarship."
      },
      {
        "term": "consumer sovereignty",
        "vietnamese": "quyền tối thượng của người tiêu dùng",
        "context": "Consumer choice ostensibly prioritises consumer sovereignty, yet algorithms quietly narrow exposure."
      },
      {
        "term": "glocalisation",
        "vietnamese": "toàn cầu hóa kết hợp bản địa hóa",
        "context": "Through glocalisation, communities creatively adapt global influences to local sensibilities."
      },
      {
        "term": "diaspora networks",
        "vietnamese": "mạng lưới kiều bào",
        "context": "Expanding diaspora networks circulate ideas, remittances and capital that revitalise creative industries."
      },
      {
        "term": "soft power",
        "vietnamese": "sức mạnh mềm",
        "context": "Cultural borrowing increasingly amplifies both soft power and economic opportunity for smaller nations."
      },
      {
        "term": "heritage preservation",
        "vietnamese": "bảo tồn di sản",
        "context": "Governments should actively protect heritage through detailed inventories and robust heritage preservation laws."
      },
      {
        "term": "cultural capital",
        "vietnamese": "vốn văn hóa",
        "context": "Education can systematically cultivate cultural capital by teaching local histories, languages and arts."
      },
      {
        "term": "regulatory standards",
        "vietnamese": "tiêu chuẩn quản lý nhà nước",
        "context": "Governments can set clear regulatory standards for cultural sectors through quotas or fiscal incentives."
      },
      {
        "term": "policy coherence",
        "vietnamese": "tính nhất quán trong chính sách",
        "context": "Governments must adopt genuine policy coherence so that tourism, trade and education reinforce cultural goals."
      }
    ],
    "reviewExercise": {
      "type": "gap-fill",
      "instruction": "Fill in the blanks.",
      "items": [
        {
          "sentence": "Streaming platforms may contribute to ___ by promoting the same hits worldwide.",
          "answer": "cultural homogenisation"
        },
        {
          "sentence": "English often serves as the global ___.",
          "answer": "lingua franca"
        },
        {
          "sentence": "Local adaptation of a global menu reflects ___.",
          "answer": "glocalisation"
        },
        {
          "sentence": "Funding museums is part of ___.",
          "answer": "heritage preservation"
        },
        {
          "sentence": "Aligning trade and culture goals requires ___.",
          "answer": "policy coherence"
        }
      ]
    }
  },
  {
    "id": "t2-6",
    "taskType": 2,
    "essayType": "opinion",
    "topic": "Crime reduction strategies",
    "prompt": "Some believe that imposing longer prison sentences is the best way to reduce crime, while others argue for prevention and rehabilitation. To what extent do you agree or disagree?",
    "essayBody": "Lengthy prison terms have intuitive political appeal, yet decades of criminological evidence consistently suggest that smart prevention and targeted rehabilitation reduce crime far more sustainably than simply extending sentences. I therefore firmly disagree that longer terms are the optimal tool for public safety.\n\nPunishment can certainly deter, but its marginal benefits diminish sharply beyond a threshold. Harsher penalties typically add little to actual **deterrence** because most offences are impulsive, occur under substance misuse or are committed by people who simply do not calculate long-term consequences. Lengthy incarceration may achieve short-term **incapacitation**, but it also disrupts family ties, employment prospects and housing, demonstrably heightening **recidivism** upon release; US Bureau of Justice statistics show roughly two-thirds of released prisoners are rearrested within three years. Moreover, blanket severity can violate the basic principle of **proportionality**, undermining institutional legitimacy and reducing the willingness of communities to cooperate with law enforcement.\n\nA genuinely effective public safety strategy should tackle root causes and carefully tailor responses to individual cases. Well-resourced **community policing** builds the trust required to gather intelligence and resolves minor conflicts before they escalate into serious crime. **Early intervention** programmes - from school mentoring to substance-misuse treatment - address risk factors while they are still malleable. Modern, transparently audited **risk assessment** tools can calibrate supervision and programmes to an individual's specific **criminogenic needs**, from vocational skills to cognitive-behavioural therapy. For suitable lower-risk cases, **diversion programs** and specialised problem-solving courts can break offending cycles without the scarring effects of imprisonment, reserving custody for genuinely serious, high-risk offenders.\n\nNone of this implies softness on crime. Indeed, swift, certain and procedurally fair sanctions consistently outperform purely severe ones in randomised evaluations. Prisons themselves should focus relentlessly on education, treatment and structured reentry planning, converting otherwise wasted time into measurable progress. Combining targeted incapacitation with serious investment in prevention and **rehabilitation** ultimately reduces harm at lower public cost and with fewer victims in the long run. Justice systems should be guided by what demonstrably works, not by what merely feels tough.",
    "glossary": [
      {
        "term": "deterrence",
        "vietnamese": "tác dụng răn đe",
        "context": "Harsher penalties typically add little to actual deterrence because most offences are impulsive."
      },
      {
        "term": "incapacitation",
        "vietnamese": "loại trừ khả năng phạm tội bằng giam giữ",
        "context": "Lengthy incarceration may achieve short-term incapacitation but disrupts family and employment."
      },
      {
        "term": "recidivism",
        "vietnamese": "tỉ lệ tái phạm",
        "context": "Disrupted social ties demonstrably heighten recidivism upon release from prison."
      },
      {
        "term": "proportionality",
        "vietnamese": "tính tương xứng trong hình phạt",
        "context": "Blanket severity can violate the basic principle of proportionality, undermining institutional legitimacy."
      },
      {
        "term": "community policing",
        "vietnamese": "mô hình cảnh sát cộng đồng",
        "context": "Well-resourced community policing builds the trust required to gather intelligence and resolve conflicts early."
      },
      {
        "term": "early intervention",
        "vietnamese": "can thiệp sớm",
        "context": "Early intervention programmes address risk factors while they are still malleable."
      },
      {
        "term": "risk assessment",
        "vietnamese": "đánh giá rủi ro tái phạm",
        "context": "Modern, transparently audited risk assessment tools can calibrate supervision to each individual."
      },
      {
        "term": "criminogenic needs",
        "vietnamese": "nhu cầu khắc phục yếu tố gây phạm tội",
        "context": "Programmes should target an individual's specific criminogenic needs, from vocational skills to therapy."
      },
      {
        "term": "diversion programs",
        "vietnamese": "chương trình chuyển hướng khỏi nhà tù",
        "context": "For suitable lower-risk cases, diversion programs can break offending cycles without imprisonment."
      },
      {
        "term": "rehabilitation",
        "vietnamese": "phục hồi và tái hòa nhập",
        "context": "Combining targeted incapacitation with serious investment in prevention and rehabilitation reduces harm."
      }
    ],
    "reviewExercise": {
      "type": "gap-fill",
      "instruction": "Fill in the blanks.",
      "items": [
        {
          "sentence": "Certainty of punishment often matters more for ___.",
          "answer": "deterrence"
        },
        {
          "sentence": "Removing a violent offender from the community achieves ___.",
          "answer": "incapacitation"
        },
        {
          "sentence": "Job training in prison can reduce ___.",
          "answer": "recidivism"
        },
        {
          "sentence": "Courts may use ___ to tailor supervision levels.",
          "answer": "risk assessment"
        },
        {
          "sentence": "For suitable cases, ___ can avoid the harms of custody.",
          "answer": "diversion programs"
        }
      ]
    }
  },
  {
    "id": "t2-7",
    "taskType": 2,
    "essayType": "discussion",
    "topic": "Traditional journalism vs social media",
    "prompt": "Some people believe social media has made news more democratic, while others argue it undermines reliable journalism. Discuss both views and give your opinion.",
    "essayBody": "Social media has decisively blown open the gates of public communication. Supporters argue convincingly that it decentralises the news, empowering ordinary witnesses and marginalised communities to bypass traditional editorial **gatekeeping** and spotlight long-neglected issues. Grassroots voices can now organise across borders within hours, and real-time citizen footage can powerfully counter sanitised official narratives - the Arab Spring uprisings and global Black Lives Matter movement both vividly illustrate this democratising potential. In this view, networks meaningfully expand civic participation and pressure institutions to be far more transparent.\n\nCritics warn, however, that virality systematically trades credibility for raw speed. Major platforms openly optimise engagement through opaque **algorithmic amplification**, consistently rewarding outrage, novelty and emotional intensity over factual nuance. This dynamic fosters self-reinforcing **echo chambers** in which users share existing beliefs unchallenged, while **misinformation** and orchestrated **disinformation** demonstrably spread far faster than any subsequent corrections - MIT researchers famously found false stories travel roughly six times quicker than true ones on Twitter. Without robust **verification protocols**, mere rumours can masquerade as established facts, while collapsing advertising revenue continues to erode the **editorial independence** of many legacy outlets. The combined result is rising public cynicism and genuine confusion about whom to trust.\n\nBoth claims hold significant truth. Citizen reporting is invaluable during crises and in repressive political contexts where professional journalists cannot operate freely. Nevertheless, traditional professional norms - source protection, factual context, legal scrutiny and ethical review - still matter enormously. My considered view is that the solution lies neither in romanticising social platforms nor in defending legacy outlets uncritically, but in deliberately blending their respective strengths. Platforms should consistently elevate authoritative sources, enforce strict transparency on political advertising and fund independent **fact-checking** at scale. Newsrooms, in turn, must engage their audiences interactively, correct errors swiftly and visibly, and publish their reporting methods. Most crucially, modern democracies need universal **media literacy** education so that citizens can rigorously interrogate claims, spot manipulation and demand genuine **accountability** from both platforms and publishers.\n\nA healthy information ecosystem therefore harnesses the unprecedented reach of digital networks while firmly upholding traditional standards of evidence. Only then can democracy enjoy the genuine benefits of openness without succumbing to the chaos of unvetted, viral claims.",
    "glossary": [
      {
        "term": "gatekeeping",
        "vietnamese": "vai trò gác cổng thông tin",
        "context": "Citizens can now bypass traditional editorial gatekeeping and spotlight long-neglected issues."
      },
      {
        "term": "algorithmic amplification",
        "vietnamese": "khuếch đại nội dung bằng thuật toán",
        "context": "Major platforms openly optimise engagement through opaque algorithmic amplification of emotive content."
      },
      {
        "term": "echo chambers",
        "vietnamese": "buồng vọng tư tưởng",
        "context": "This dynamic fosters self-reinforcing echo chambers in which users share existing beliefs unchallenged."
      },
      {
        "term": "misinformation",
        "vietnamese": "thông tin sai lệch không cố ý",
        "context": "Misinformation and orchestrated disinformation demonstrably spread far faster than any subsequent corrections."
      },
      {
        "term": "disinformation",
        "vietnamese": "thông tin sai lệch có chủ đích",
        "context": "Orchestrated disinformation campaigns now routinely target elections in dozens of countries."
      },
      {
        "term": "verification protocols",
        "vietnamese": "quy trình xác minh thông tin",
        "context": "Without robust verification protocols, mere rumours can masquerade as established facts."
      },
      {
        "term": "editorial independence",
        "vietnamese": "tính độc lập biên tập",
        "context": "Collapsing advertising revenue continues to erode the editorial independence of many legacy outlets."
      },
      {
        "term": "fact-checking",
        "vietnamese": "kiểm chứng dữ kiện",
        "context": "Platforms should fund independent fact-checking at scale across multiple languages."
      },
      {
        "term": "media literacy",
        "vietnamese": "năng lực hiểu và phản biện truyền thông",
        "context": "Modern democracies need universal media literacy education so citizens can rigorously interrogate claims."
      },
      {
        "term": "accountability",
        "vietnamese": "trách nhiệm giải trình",
        "context": "Citizens must demand genuine accountability from both platforms and publishers."
      }
    ],
    "reviewExercise": {
      "type": "gap-fill",
      "instruction": "Fill in the blanks.",
      "items": [
        {
          "sentence": "Virality driven by ___ can reward sensational stories.",
          "answer": "algorithmic amplification"
        },
        {
          "sentence": "Users trapped in ___ rarely encounter opposing facts.",
          "answer": "echo chambers"
        },
        {
          "sentence": "Newsrooms should strengthen ___ before publishing claims.",
          "answer": "verification protocols"
        },
        {
          "sentence": "Teaching ___ equips citizens to spot hoaxes.",
          "answer": "media literacy"
        },
        {
          "sentence": "Independent ___ organisations review political statements.",
          "answer": "fact-checking"
        }
      ]
    }
  },
  {
    "id": "t2-8",
    "taskType": 2,
    "essayType": "advantages-disadvantages",
    "topic": "Remote work and work-life balance",
    "prompt": "Many companies now allow employees to work remotely. What are the advantages and disadvantages of this trend?",
    "essayBody": "Remote work has shifted decisively from a marginal perk to a mainstream operating model in the post-pandemic era, with Stanford research suggesting that hybrid arrangements now cover roughly 30 percent of paid workdays in advanced economies. Its benefits are tangible and well documented. Employees gain substantial **autonomy** over their daily schedules and physical environments, enabling sustained deep focus when complex work demands it. Freed from gruelling commutes, they reclaim hours each week for family, exercise and rest, while firms can recruit across entire geographies, tapping a far broader talent pool. Teams that genuinely master **asynchronous coordination** and **output-based evaluation** consistently report productivity gains by aligning available time to actual task requirements rather than rigid office hours.\n\nYet the model brings genuine trade-offs that must be addressed honestly. Blurred boundaries can fuel chronic overwork wherever **boundary management** is weak, and the absence of natural office cues can revive **presenteeism** in a damaging digital form - being 'always on' simply to signal commitment to colleagues. Social isolation can quietly erode team cohesion and the informal learning that traditionally happened by osmosis around the water cooler. Poor home setups frequently harm long-term **ergonomics** and wellbeing, while new hires often struggle to absorb culture and tacit knowledge during remote **onboarding**. Persistent time-zone friction can slow critical feedback loops and, without deliberate rituals to restore connection, accumulated stress can spiral into serious **burnout**.\n\nMaximising the advantages therefore requires genuinely intentional organisational design rather than passive drift. Leaders should default to thorough written documentation and transparent workflows, set clear response-time norms and rigorously protect focus time for deep work. Regular in-person offsites and structured mentoring programmes can maintain meaningful community across distributed teams. Generous stipends for equipment significantly improve home ergonomics, while clearly defined performance goals anchor evaluation to genuine outcomes rather than visible hours. Rotating meeting times across time zones and pairing modest core hours with flexible **flexitime** can elegantly balance synchronous collaboration with personal autonomy.\n\nIn short, remote work can simultaneously enhance both efficiency and employee wellbeing, but only when organisations carefully architect the model rather than hoping it works itself out. The modern office is no longer a building; it is the deliberate set of practices that help people do their very best work, wherever they happen to be located.",
    "glossary": [
      {
        "term": "autonomy",
        "vietnamese": "quyền tự chủ trong công việc",
        "context": "Employees gain substantial autonomy over their daily schedules and physical environments."
      },
      {
        "term": "asynchronous coordination",
        "vietnamese": "phối hợp công việc không đồng bộ",
        "context": "Teams that genuinely master asynchronous coordination consistently report productivity gains."
      },
      {
        "term": "output-based evaluation",
        "vietnamese": "đánh giá dựa trên kết quả đầu ra",
        "context": "Output-based evaluation aligns available time to actual task requirements rather than rigid hours."
      },
      {
        "term": "boundary management",
        "vietnamese": "quản lý ranh giới giữa công việc và cuộc sống",
        "context": "Blurred boundaries can fuel chronic overwork wherever boundary management is weak."
      },
      {
        "term": "presenteeism",
        "vietnamese": "hành vi cố tỏ ra đang làm việc",
        "context": "The absence of office cues can revive presenteeism in a damaging digital form."
      },
      {
        "term": "ergonomics",
        "vietnamese": "công thái học",
        "context": "Poor home setups frequently harm long-term ergonomics and physical wellbeing."
      },
      {
        "term": "onboarding",
        "vietnamese": "quá trình hội nhập nhân viên mới",
        "context": "New hires often struggle to absorb culture and tacit knowledge during remote onboarding."
      },
      {
        "term": "burnout",
        "vietnamese": "kiệt sức nghề nghiệp",
        "context": "Without deliberate rituals to restore connection, accumulated stress can spiral into serious burnout."
      },
      {
        "term": "flexitime",
        "vietnamese": "giờ làm việc linh hoạt",
        "context": "Pairing modest core hours with flexible flexitime balances collaboration with personal autonomy."
      },
      {
        "term": "tacit knowledge",
        "vietnamese": "tri thức ẩn truyền miệng",
        "context": "New hires often struggle to absorb culture and tacit knowledge during remote onboarding."
      }
    ],
    "reviewExercise": {
      "type": "gap-fill",
      "instruction": "Fill in the blanks.",
      "items": [
        {
          "sentence": "Shifting to results encourages ___ rather than hours-watched.",
          "answer": "output-based evaluation"
        },
        {
          "sentence": "Clear rules for messages protect ___ between work and life.",
          "answer": "boundary management"
        },
        {
          "sentence": "Stipends for chairs and monitors improve ___.",
          "answer": "ergonomics"
        },
        {
          "sentence": "Allowing flexible schedules through ___ helps global teams.",
          "answer": "flexitime"
        },
        {
          "sentence": "Being constantly online to signal commitment is digital ___.",
          "answer": "presenteeism"
        }
      ]
    }
  },
  {
    "id": "t2-9",
    "taskType": 2,
    "essayType": "problem-solution",
    "topic": "Government: declining voter turnout and trust",
    "prompt": "In many democracies, voter turnout and trust in government are declining. What are the causes of this problem and what measures can be taken to address it?",
    "essayBody": "Falling electoral participation and collapsing institutional confidence together pose a serious threat to democratic resilience across the developed world. Several reinforcing forces drive the trend: deeply polarised media ecosystems, opaque governmental decision-making and unequal representation that steadily breeds cynicism among ordinary voters. Significant administrative hurdles and acute disengagement among younger generations further depress turnout, which in some recent national elections has fallen below 50 percent of eligible voters.\n\nReversing this dangerous trend requires patiently rebuilding meaningful pathways for citizen voice. First, governments must lower the practical cost of participation. Automatic voter registration, convenient multi-day voting windows and, where appropriate, **ranked-choice voting** can reduce wasted-vote anxiety and encourage more civil campaigns focused on consensus rather than mobilising the base. Some democracies, notably Australia and Belgium, also advocate carefully designed **compulsory voting** which, when paired with easy access and modest fines, consistently produces broader electoral mandates and gently nudges people into habitual **civic engagement**.\n\nSecond, leaders must demonstrably strengthen fairness and transparency. Genuinely independent commissions should draw electoral districts to prevent the **disenfranchisement** caused by partisan gerrymandering. Real-time **open data** on public budgets, contracts and performance enables citizen scrutiny, while robust **campaign finance** rules curb the outsized influence of wealthy donors. Routine, well-designed **public consultation** - citizens' assemblies, deliberative polls and participatory budgeting - invites communities into genuine agenda-setting rather than tokenistic feedback at the end of the process.\n\nFinally, democracies must invest seriously in the future electorate. High-quality **civics education** that is rigorously nonpartisan and genuinely experiential can cultivate the agency, deliberation skills and political efficacy that lifelong voters require. Coupled with national service programmes, this forms civic habits that endure into adulthood. Ensuring robust **electoral integrity** through secure voting systems, transparent post-election audits and clear public communication is also vital to combat misinformation and steadily rebuild trust.\n\nNo single reform will suffice on its own. But together, simplifying access, widening democratic voice and deepening institutional accountability can gradually reweave the civic fabric, making government feel both genuinely accessible and meaningfully answerable to the people it serves.",
    "glossary": [
      {
        "term": "ranked-choice voting",
        "vietnamese": "bỏ phiếu xếp hạng ưu tiên",
        "context": "Ranked-choice voting can reduce wasted-vote anxiety and encourage more civil campaigns."
      },
      {
        "term": "compulsory voting",
        "vietnamese": "bỏ phiếu bắt buộc theo luật",
        "context": "Carefully designed compulsory voting consistently produces broader electoral mandates."
      },
      {
        "term": "civic engagement",
        "vietnamese": "sự tham gia công dân",
        "context": "Easy access gently nudges people into habitual civic engagement."
      },
      {
        "term": "disenfranchisement",
        "vietnamese": "việc tước quyền bầu cử",
        "context": "Independent commissions should prevent the disenfranchisement caused by partisan gerrymandering."
      },
      {
        "term": "open data",
        "vietnamese": "dữ liệu mở của chính phủ",
        "context": "Real-time open data on public budgets, contracts and performance enables genuine citizen scrutiny."
      },
      {
        "term": "campaign finance",
        "vietnamese": "tài chính vận động tranh cử",
        "context": "Robust campaign finance rules curb the outsized influence of wealthy donors."
      },
      {
        "term": "public consultation",
        "vietnamese": "tham vấn công chúng trong xây dựng chính sách",
        "context": "Routine public consultation invites communities into genuine agenda-setting."
      },
      {
        "term": "civics education",
        "vietnamese": "giáo dục công dân",
        "context": "High-quality civics education can cultivate the agency and deliberation skills lifelong voters require."
      },
      {
        "term": "electoral integrity",
        "vietnamese": "tính liêm chính của bầu cử",
        "context": "Ensuring electoral integrity through secure systems and transparent audits is vital to rebuild trust."
      },
      {
        "term": "transparency",
        "vietnamese": "tính minh bạch của chính phủ",
        "context": "Leaders must demonstrably strengthen fairness and transparency to restore public confidence."
      }
    ],
    "reviewExercise": {
      "type": "gap-fill",
      "instruction": "Fill in the blanks.",
      "items": [
        {
          "sentence": "Letting voters rank candidates can reduce negativity through ___.",
          "answer": "ranked-choice voting"
        },
        {
          "sentence": "Mandatory participation is known as ___.",
          "answer": "compulsory voting"
        },
        {
          "sentence": "Publishing contracts online advances ___.",
          "answer": "transparency"
        },
        {
          "sentence": "Teaching debate and participation strengthens ___.",
          "answer": "civics education"
        },
        {
          "sentence": "Secure systems and audits bolster ___.",
          "answer": "electoral integrity"
        }
      ]
    }
  },
  {
    "id": "t2-10",
    "taskType": 2,
    "essayType": "two-part",
    "topic": "Artificial intelligence and jobs",
    "prompt": "Advances in artificial intelligence are changing the workplace. 1) In what ways will AI affect employment? 2) What should workers and governments do to prepare?",
    "essayBody": "Artificial intelligence will reshape employment over the coming decade through both **displacement** and **augmentation** working simultaneously. Routine tasks across clerical work, customer support and even substantial parts of professional services such as legal review and basic accounting are already being automated, compressing certain established roles while expanding demand for higher-order oversight and complex judgement. At the same time, well-designed AI can dramatically amplify human capability - drafting, summarising, forecasting and translating - pushing the **productivity frontier** outward and spawning entirely new occupations in data stewardship, prompt engineering and AI systems integration. McKinsey estimates that generative AI alone could add between $2.6 and $4.4 trillion to annual global productivity.\n\nIntelligent preparation hinges on three interlocking pillars: skills, safeguards and incentives. Workers themselves urgently need continuous **reskilling** in analytical reasoning, cross-functional collaboration and domain-specific digital fluency, since technical half-lives are shortening rapidly. Organisations deploying AI should adopt **human-in-the-loop** designs that keep accountable people firmly in charge of critical decisions and ensure meaningful **explainability** for high-stakes uses in finance, healthcare or justice. To protect basic fairness, rigorous independent audits must routinely test deployed systems for **algorithmic bias**, while clear **safety guardrails** govern deployment in any sector where mistakes can cause real human harm.\n\nGovernments, in turn, must actively align fast-moving AI markets with the broader public interest. Targeted tax policy and innovation grants can accelerate the diffusion of beneficial AI to small and medium firms, which otherwise risk being left behind by tech giants. Modernised **intellectual property** rules should clarify ownership of AI-assisted creative outputs, an area currently mired in litigation. Generously funded lifelong learning accounts, portable benefits that survive job changes and targeted wage subsidies can together smooth the difficult transitions for displaced workers. Finally, robust **data governance** - covering access, privacy, consent and quality - will simultaneously unlock genuine innovation and maintain the public trust on which voluntary AI adoption ultimately depends.\n\nHandled carelessly, AI could plausibly widen inequality, erode dignity at work and concentrate economic power in a handful of frontier labs. Managed wisely, however, it can liberate workers from drudgery, raise wages and create genuinely better jobs at scale. The future of work will be deliberately designed, not passively discovered.",
    "glossary": [
      {
        "term": "displacement",
        "vietnamese": "sự thay thế lao động",
        "context": "Artificial intelligence will reshape employment through both displacement and augmentation working simultaneously."
      },
      {
        "term": "augmentation",
        "vietnamese": "sự bổ trợ năng lực con người",
        "context": "Well-designed AI can dramatically amplify human capability through augmentation rather than pure replacement."
      },
      {
        "term": "productivity frontier",
        "vietnamese": "giới hạn hiệu suất kinh tế",
        "context": "Generative tools push the productivity frontier outward and spawn entirely new occupations."
      },
      {
        "term": "reskilling",
        "vietnamese": "đào tạo lại kỹ năng",
        "context": "Workers urgently need continuous reskilling in analytical reasoning and domain-specific digital fluency."
      },
      {
        "term": "human-in-the-loop",
        "vietnamese": "con người trong vòng lặp ra quyết định",
        "context": "Organisations should adopt human-in-the-loop designs that keep accountable people firmly in charge of critical decisions."
      },
      {
        "term": "explainability",
        "vietnamese": "khả năng giải thích quyết định của AI",
        "context": "Companies must ensure meaningful explainability for high-stakes uses in finance, healthcare or justice."
      },
      {
        "term": "algorithmic bias",
        "vietnamese": "thiên kiến thuật toán",
        "context": "Rigorous independent audits must routinely test deployed systems for algorithmic bias."
      },
      {
        "term": "safety guardrails",
        "vietnamese": "rào chắn an toàn cho AI",
        "context": "Clear safety guardrails should govern deployment in any sector where mistakes can cause real human harm."
      },
      {
        "term": "intellectual property",
        "vietnamese": "quyền sở hữu trí tuệ",
        "context": "Modernised intellectual property rules should clarify ownership of AI-assisted creative outputs."
      },
      {
        "term": "data governance",
        "vietnamese": "quản trị dữ liệu",
        "context": "Robust data governance covering access, privacy and quality will unlock innovation and maintain public trust."
      }
    ],
    "reviewExercise": {
      "type": "gap-fill",
      "instruction": "Fill in the blanks.",
      "items": [
        {
          "sentence": "AI that helps people rather than replaces them enables ___.",
          "answer": "augmentation"
        },
        {
          "sentence": "Workers will need continuous ___ to stay relevant.",
          "answer": "reskilling"
        },
        {
          "sentence": "Testing models for unfair patterns tackles ___.",
          "answer": "algorithmic bias"
        },
        {
          "sentence": "Keeping a person responsible for key calls is ___.",
          "answer": "human-in-the-loop"
        },
        {
          "sentence": "Rules for privacy and access are part of ___.",
          "answer": "data governance"
        }
      ]
    }
  }
];

export const sampleEssays: SampleEssay[] = [...baseSampleEssays, ...sampleEssaysExpansion];
