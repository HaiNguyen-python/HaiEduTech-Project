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
    "essayBody": "The two pie charts compare the sectoral distribution of employment across agriculture, manufacturing, services, and technology in Country A at two snapshots three decades apart: 1995 and 2025.\n\nOverall, the data encapsulate a classic **structural transformation** of the kind theorised by Kuznets and documented by the World Bank across middle-income economies: a **secular contraction** of primary-sector employment, a relative **stagnation** of manufacturing, and a **proliferation** of services and technology roles that collectively came to dominate the labour market.\n\nAgriculture experienced the most dramatic **retrenchment**, collapsing from 35 per cent of total employment in 1995 to a mere 10 per cent by 2025—a 25-percentage-point **evaporation** that signals the crossing of a **Lewis turning point**, whereby surplus rural labour has been largely **absorbed** into urban, industrial, and knowledge-based activities. Manufacturing, by contrast, exhibited only modest **erosion**, slipping from 25 to 20 per cent; its resilience suggests a degree of **automation-led consolidation** rather than wholesale offshoring.\n\nThe most **consequential rebalancing** occurred in services and technology. Services surged from 30 to 45 per cent, cementing its status as the **predominant employer**, while technology—**nascent** at 10 per cent in 1995—**ballooned** to 25 per cent, effectively **eclipsing** agriculture and drawing close to manufacturing. This **diversification** into high-value-added, knowledge-intensive roles underscores a national **reorientation** away from labour-intensive extraction and assembly toward innovation-driven output, a trajectory paralleling the evolution of South Korea and Estonia between 1990 and 2010.",
    "glossary": [
      {
        "term": "structural transformation",
        "vietnamese": "chuyển đổi cơ cấu",
        "context": "The data encapsulate a classic structural transformation of the kind theorised by Kuznets."
      },
      {
        "term": "secular contraction",
        "vietnamese": "sự thu hẹp dài hạn",
        "context": "A secular contraction of primary-sector employment over three decades."
      },
      {
        "term": "stagnation",
        "vietnamese": "sự đình trệ",
        "context": "A relative stagnation of manufacturing's share of total employment."
      },
      {
        "term": "proliferation",
        "vietnamese": "sự bùng nổ/sinh sôi",
        "context": "A proliferation of services and technology roles that came to dominate the labour market."
      },
      {
        "term": "retrenchment",
        "vietnamese": "sự thu hẹp mạnh",
        "context": "Agriculture experienced the most dramatic retrenchment, collapsing from 35% to 10%."
      },
      {
        "term": "evaporation",
        "vietnamese": "sự tan biến/bốc hơi",
        "context": "A 25-percentage-point evaporation of agricultural employment over three decades."
      },
      {
        "term": "Lewis turning point",
        "vietnamese": "điểm uốn Lewis (điểm cạn kiệt lao động thừa nông thôn)",
        "context": "Signals the crossing of a Lewis turning point, whereby surplus rural labour has been absorbed."
      },
      {
        "term": "absorbed",
        "vietnamese": "được hấp thụ/tiếp nhận",
        "context": "Surplus rural labour has been largely absorbed into urban and knowledge-based activities."
      },
      {
        "term": "automation-led consolidation",
        "vietnamese": "sự củng cố dẫn dắt bởi tự động hóa",
        "context": "Manufacturing's resilience suggests automation-led consolidation rather than wholesale offshoring."
      },
      {
        "term": "consequential rebalancing",
        "vietnamese": "sự tái cân bằng có ý nghĩa quan trọng",
        "context": "The most consequential rebalancing occurred in services and technology."
      },
      {
        "term": "predominant employer",
        "vietnamese": "ngành tuyển dụng chính/chiếm ưu thế",
        "context": "Services cemented its status as the predominant employer by 2025."
      },
      {
        "term": "ballooned",
        "vietnamese": "tăng vọt/phình to",
        "context": "Technology ballooned to 25%, effectively eclipsing agriculture."
      },
      {
        "term": "eclipsed",
        "vietnamese": "vượt qua/che khuất",
        "context": "Technology eclipsed agriculture and drew close to manufacturing."
      },
      {
        "term": "reorientation",
        "vietnamese": "tái định hướng",
        "context": "A national reorientation away from labour-intensive extraction toward innovation-driven output."
      }
    ],
    "reviewExercise": {
      "type": "gap-fill",
      "instruction": "Fill in the blanks with appropriate words from the essay.",
      "items": [
        {
          "sentence": "The data show a classic ___ away from agriculture toward services.",
          "answer": "structural transformation",
          "explanation": "A fundamental shift in the composition of an economy's output and employment."
        },
        {
          "sentence": "Agriculture saw a dramatic ___ from 35% to just 10% over three decades.",
          "answer": "retrenchment",
          "explanation": "'Retrenchment' means a significant reduction or cutback."
        },
        {
          "sentence": "Manufacturing showed only modest ___ rather than wholesale decline.",
          "answer": "erosion",
          "explanation": "'Erosion' means a gradual wearing away or reduction."
        },
        {
          "sentence": "Technology's share ___ to 25%, surpassing agriculture completely.",
          "answer": "ballooned",
          "explanation": "'Ballooned' means increased rapidly and dramatically."
        },
        {
          "sentence": "The economy underwent a national ___ toward knowledge-based industries.",
          "answer": "reorientation",
          "explanation": "'Reorientation' means a fundamental change in direction or focus."
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
    "essayBody": "The table juxtaposes four pivotal health indicators—life expectancy at birth, infant mortality per 1,000 live births, physicians per 1,000 population, and health expenditure as a percentage of GDP—for four countries (Q, R, S, and T) at two reference points, 2010 and 2020, in a manner reminiscent of the OECD's periodic *Health at a Glance* benchmarking reports.\n\nOverall, every country registered **sustained improvement** across the decade, yet the **velocity** and **dimensionality** of progress varied markedly. A clear **gradient** emerges: countries with higher physician density and greater fiscal commitment to health consistently **outperformed** their peers on longevity and child-survival metrics, though one **outlier** demonstrates that targeted, efficient interventions can **decouple** outcomes from expenditure growth.\n\nLife expectancy rose almost universally, with Country Q posting the most dramatic gain—from 68 to 75 years—an **appreciation** of seven years that almost certainly reflects a **confluence** of improved maternal care, sanitation, and communicable-disease control. Country R, already a **benchmark** at 82 years, advanced more modestly to 84, consistent with the **diminishing marginal returns** observable in high-income systems where baseline longevity approaches biological limits.\n\nInfant mortality fell **precipitously** across the board, with the steepest declines recorded in Countries Q and S—from 35 to 18 and from 28 to 12 per 1,000 respectively—suggesting effective primary-care **outreach** and vaccination coverage in line with WHO SDG targets. Physician density increased in each jurisdiction, albeit **incrementally** in lower-income states and more substantially where medical-school **training capacity** expanded. Health spending as a share of GDP diverged: some systems saw a mild uptick aligned with reforms, while others **plateaued**, prioritising allocative efficiency. Country T constitutes a **salient outlier**, achieving notable mortality declines—from 32 to 15 per 1,000—without proportionate spending growth, implying that **front-loaded** preventive interventions and community-health-worker networks can be remarkably **cost-effective**.",
    "glossary": [
      {
        "term": "sustained improvement",
        "vietnamese": "cải thiện bền vững",
        "context": "Every country registered sustained improvement across the decade."
      },
      {
        "term": "velocity",
        "vietnamese": "tốc độ",
        "context": "The velocity and dimensionality of progress varied markedly."
      },
      {
        "term": "dimensionality",
        "vietnamese": "số chiều/phạm vi",
        "context": "The dimensionality of progress varied by indicator and nation."
      },
      {
        "term": "gradient",
        "vietnamese": "gradient/thang phân cấp",
        "context": "A clear gradient emerges between physician density and health outcomes."
      },
      {
        "term": "outperformed",
        "vietnamese": "vượt trội hơn",
        "context": "Countries with higher physician density consistently outperformed their peers."
      },
      {
        "term": "outlier",
        "vietnamese": "trường hợp ngoại lai",
        "context": "One outlier demonstrates that targeted interventions can decouple outcomes from spending."
      },
      {
        "term": "decouple",
        "vietnamese": "tách rời",
        "context": "Targeted interventions can decouple outcomes from expenditure growth."
      },
      {
        "term": "appreciation",
        "vietnamese": "sự gia tăng",
        "context": "An appreciation of seven years in life expectancy."
      },
      {
        "term": "confluence",
        "vietnamese": "sự hội tụ",
        "context": "A confluence of improved maternal care, sanitation, and disease control."
      },
      {
        "term": "benchmark",
        "vietnamese": "chuẩn mực/điểm tham chiếu",
        "context": "Country R, already a benchmark at 82 years, advanced modestly to 84."
      },
      {
        "term": "diminishing marginal returns",
        "vietnamese": "lợi ích cận biên giảm dần",
        "context": "Consistent with diminishing marginal returns in high-income systems."
      },
      {
        "term": "precipitously",
        "vietnamese": "mạnh mẽ/đột ngột",
        "context": "Infant mortality fell precipitously across the board."
      },
      {
        "term": "outreach",
        "vietnamese": "tiếp cận cộng đồng",
        "context": "Effective primary-care outreach and vaccination coverage."
      },
      {
        "term": "plateaued",
        "vietnamese": "đi ngang/ổn định",
        "context": "Some systems plateaued, prioritising allocative efficiency."
      },
      {
        "term": "front-loaded",
        "vietnamese": "tập trung đầu vào",
        "context": "Front-loaded preventive interventions and community-health-worker networks."
      },
      {
        "term": "cost-effective",
        "vietnamese": "hiệu quả về chi phí",
        "context": "Community-health-worker networks can be remarkably cost-effective."
      }
    ],
    "reviewExercise": {
      "type": "gap-fill",
      "instruction": "Fill in the blanks with appropriate words from the essay.",
      "items": [
        {
          "sentence": "Every country showed ___ across all health indicators.",
          "answer": "sustained improvement",
          "explanation": "Continuous, lasting progress over the entire decade."
        },
        {
          "sentence": "Country R was already a ___ at 82 years of life expectancy.",
          "answer": "benchmark",
          "explanation": "A standard or point of reference against which others are measured."
        },
        {
          "sentence": "Infant mortality fell ___ in Countries Q and S.",
          "answer": "precipitously",
          "explanation": "'Precipitously' means sharply, suddenly, or dramatically."
        },
        {
          "sentence": "Country T is a ___ because it improved outcomes without spending more.",
          "answer": "salient outlier",
          "explanation": "A noticeable exception that stands out from the general pattern."
        },
        {
          "sentence": "High-income systems face ___ as longevity approaches biological limits.",
          "answer": "diminishing marginal returns",
          "explanation": "Each additional unit of input yields progressively smaller gains."
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
    "essayBody": "The two maps compare the spatial layout of Riverdale in 1990 and 2020, documenting the **morphological transformation** of what was originally a semi-rural settlement into a comparatively dense, transit-oriented urban centre over a thirty-year **horizon**.\n\nOverall, the most **salient** changes encompass a **profound densification** of formerly agricultural land, the **proliferation** of arterial road infrastructure, and a deliberate **repositioning** of industrial and civic functions away from the waterfront toward peripheral and central nodes respectively. Collectively, these shifts exemplify the **new-urbanist** principles of **transit-oriented development** (TOD) and **smart-growth** planning that have gained **traction** across OECD municipalities since the 1990s.\n\nIn 1990, extensive farmland **abutted** the northern and eastern **periphery**, constituting the dominant land use. By 2020, this acreage had been comprehensively **rezoned** for high-density housing estates, producing a **steep uptick** in residential **footprint** and population capacity. A newly constructed ring road and expanded **arterial grid** dramatically improved **connectivity** across previously isolated neighbourhoods, while the school was **relocated** closer to the new residential clusters to minimise **commute burdens** on families.\n\nPerhaps the most **emblematic** intervention concerned the town centre and waterfront. The former high-street core was **pedestrianised**, with vehicular traffic **diverted** onto the ring road, thereby prioritising foot traffic and **street-level commerce**. Meanwhile, industrial activity was **deconcentrated** from the riverside to a purpose-built business park in the south, substantially reducing **ecological encroachment** on the waterfront. A landscaped **greenbelt** was established along the western **fringe**, providing recreational **amenities** for the expanding population. Commercial uses intensified through mixed-use **infill** that replaced surface parking lots, as the spatial logic pivoted unequivocally from car-centric **sprawl** to compact, walkable development.",
    "glossary": [
      {
        "term": "morphological transformation",
        "vietnamese": "chuyển đổi hình thái",
        "context": "The morphological transformation of a semi-rural settlement into a transit-oriented urban centre."
      },
      {
        "term": "horizon",
        "vietnamese": "chặng thời gian/tầm nhìn",
        "context": "Over a thirty-year horizon."
      },
      {
        "term": "salient",
        "vietnamese": "nổi bật",
        "context": "The most salient changes encompass profound densification."
      },
      {
        "term": "profound densification",
        "vietnamese": "sự tăng mật độ sâu rộng",
        "context": "A profound densification of formerly agricultural land."
      },
      {
        "term": "proliferation",
        "vietnamese": "sự bùng nổ/sinh sôi",
        "context": "The proliferation of arterial road infrastructure."
      },
      {
        "term": "repositioning",
        "vietnamese": "tái định vị",
        "context": "A deliberate repositioning of industrial and civic functions."
      },
      {
        "term": "new-urbanist",
        "vietnamese": "theo trường phái đô thị mới",
        "context": "These shifts exemplify new-urbanist principles of transit-oriented development."
      },
      {
        "term": "transit-oriented development",
        "vietnamese": "phát triển theo hướng giao thông công cộng",
        "context": "Transit-oriented development (TOD) principles have gained traction across OECD municipalities."
      },
      {
        "term": "traction",
        "vietnamese": "được đón nhận/lan tỏa",
        "context": "Smart-growth planning has gained traction across OECD municipalities."
      },
      {
        "term": "abutted",
        "vietnamese": "tiếp giáp/giáp ranh",
        "context": "Extensive farmland abutted the northern and eastern periphery."
      },
      {
        "term": "periphery",
        "vietnamese": "vùng ngoại vi/rìa",
        "context": "Farmland abutted the northern and eastern periphery."
      },
      {
        "term": "rezoned",
        "vietnamese": "tái phân khu",
        "context": "This acreage had been comprehensively rezoned for high-density housing estates."
      },
      {
        "term": "steep uptick",
        "vietnamese": "sự tăng mạnh",
        "context": "Producing a steep uptick in residential footprint and population capacity."
      },
      {
        "term": "arterial grid",
        "vietnamese": "mạng lưới đường trục",
        "context": "An expanded arterial grid dramatically improved connectivity."
      },
      {
        "term": "relocated",
        "vietnamese": "di dời",
        "context": "The school was relocated closer to the new residential clusters."
      },
      {
        "term": "emblematic",
        "vietnamese": "mang tính biểu tượng",
        "context": "The most emblematic intervention concerned the town centre and waterfront."
      },
      {
        "term": "pedestrianised",
        "vietnamese": "biến thành phố đi bộ",
        "context": "The former high-street core was pedestrianised."
      },
      {
        "term": "diverted",
        "vietnamese": "được chuyển hướng",
        "context": "Vehicular traffic was diverted onto the ring road."
      },
      {
        "term": "deconcentrated",
        "vietnamese": "được phân tán/giãn ra",
        "context": "Industrial activity was deconcentrated from the riverside to a business park."
      },
      {
        "term": "ecological encroachment",
        "vietnamese": "sự xâm lấn sinh thái",
        "context": "Substantially reducing ecological encroachment on the waterfront."
      },
      {
        "term": "greenbelt",
        "vietnamese": "vành đai xanh",
        "context": "A landscaped greenbelt was established along the western fringe."
      },
      {
        "term": "fringe",
        "vietnamese": "rìa/bìa",
        "context": "Along the western fringe of the town."
      },
      {
        "term": "amenities",
        "vietnamese": "tiện ích/cơ sở vật chất",
        "context": "Providing recreational amenities for the expanding population."
      },
      {
        "term": "infill",
        "vietnamese": "xây chen",
        "context": "Mixed-use infill replaced surface parking lots."
      },
      {
        "term": "sprawl",
        "vietnamese": "sự bành trướng đô thị",
        "context": "The spatial logic pivoted from car-centric sprawl to compact, walkable development."
      }
    ],
    "reviewExercise": {
      "type": "gap-fill",
      "instruction": "Fill in the blanks with appropriate words from the essay.",
      "items": [
        {
          "sentence": "The settlement underwent a ___ from rural to urban.",
          "answer": "morphological transformation",
          "explanation": "A fundamental change in physical form and structure."
        },
        {
          "sentence": "Farmland was ___ for high-density housing estates.",
          "answer": "rezoned",
          "explanation": "Officially redesignated for a different land use."
        },
        {
          "sentence": "The town centre was ___ to prioritise walkers.",
          "answer": "pedestrianised",
          "explanation": "Converted into an area for foot traffic only."
        },
        {
          "sentence": "Industry was ___ from the waterfront to a business park.",
          "answer": "deconcentrated",
          "explanation": "Redistributed or spread away from a concentrated area."
        },
        {
          "sentence": "The plan moved away from car-centric ___ toward compact development.",
          "answer": "sprawl",
          "explanation": "'Sprawl' is the uncontrolled expansion of urban areas."
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
    "essayBody": "The diagram illustrates a **multi-stage pipeline** for cloud data backup and recovery, architected across geographically dispersed availability zones in a manner analogous to the **resilience patterns** employed by hyperscale providers such as AWS, Azure, and Google Cloud.\n\nOverall, the process adheres to a **sequential yet fault-tolerant** workflow designed to safeguard user data from catastrophic loss through layered redundancy, cryptographic protection, and automated **failover orchestration**. The entire system is predicated on eliminating single points of failure while maintaining **sub-second recovery-time objectives** (RTO) for critical workloads.\n\nInitially, files undergo **client-side encryption**—typically leveraging AES-256—during the **ingestion** phase, ensuring that data remains **opaque** to the provider even before transit. The encrypted payload is then transmitted to a regional gateway, where it undergoes **deduplication** and **content-addressed indexing** to minimise storage **overhead**. The system subsequently performs **multi-zone replication** to at least three independent availability zones, creating **geographic redundancy** that can withstand **regional outages**. Each block is accompanied by **checksum** validation and periodic integrity audits to detect **bit-rot** or silent corruption.\n\nA central **orchestration plane**—functionally equivalent to a Kubernetes control loop—continuously monitors health metrics across all zones via **heartbeat probes**. Should one zone exhibit **degraded performance** or complete unavailability, the plane automatically triggers **failover**, rerouting write and read operations to the healthiest replica without manual intervention. During recovery, authenticated requests query the **immutable catalog** and pull blocks in parallel for rapid **retrieval**, with latency-aware routing ensuring that traffic is always directed to the nearest **synchronised** copy. Compared with legacy single-site **tape-based** archives, this distributed architecture delivers near-zero **recovery-point objectives** (RPO) and accelerates restoration from hours to minutes.",
    "glossary": [
      {
        "term": "multi-stage pipeline",
        "vietnamese": "quy trình đa giai đoạn",
        "context": "A multi-stage pipeline for cloud data backup and recovery."
      },
      {
        "term": "resilience patterns",
        "vietnamese": "các mẫu thiết kế đàn hồi",
        "context": "Resilience patterns employed by hyperscale providers such as AWS and Azure."
      },
      {
        "term": "fault-tolerant",
        "vietnamese": "chịu lỗi",
        "context": "A sequential yet fault-tolerant workflow designed to safeguard user data."
      },
      {
        "term": "failover orchestration",
        "vietnamese": "điều phối chuyển đổi dự phòng",
        "context": "Automated failover orchestration ensures continuity during zone outages."
      },
      {
        "term": "opaque",
        "vietnamese": "không thể đọc được/mờ",
        "context": "Data remains opaque to the provider even before transit."
      },
      {
        "term": "ingestion",
        "vietnamese": "tiếp nhận/hấp thụ dữ liệu",
        "context": "Files undergo client-side encryption during the ingestion phase."
      },
      {
        "term": "deduplication",
        "vietnamese": "loại bỏ trùng lặp",
        "context": "The encrypted payload undergoes deduplication at the regional gateway."
      },
      {
        "term": "content-addressed indexing",
        "vietnamese": "lập chỉ mục theo nội dung",
        "context": "Content-addressed indexing minimises storage overhead."
      },
      {
        "term": "overhead",
        "vietnamese": "chi phí/phí tổn phụ",
        "context": "Minimise storage overhead through deduplication."
      },
      {
        "term": "multi-zone replication",
        "vietnamese": "sao chép đa vùng",
        "context": "Multi-zone replication to at least three independent availability zones."
      },
      {
        "term": "geographic redundancy",
        "vietnamese": "dự phòng địa lý",
        "context": "Creating geographic redundancy that can withstand regional outages."
      },
      {
        "term": "regional outages",
        "vietnamese": "sự cố ngừng hoạt động khu vực",
        "context": "Geographic redundancy can withstand regional outages."
      },
      {
        "term": "bit-rot",
        "vietnamese": "lỗi dữ liệu ngầm theo thời gian",
        "context": "Checksum validation detects bit-rot or silent corruption."
      },
      {
        "term": "orchestration plane",
        "vietnamese": "tầng điều phối",
        "context": "A central orchestration plane monitors health metrics across all zones."
      },
      {
        "term": "heartbeat probes",
        "vietnamese": "tín hiệu kiểm tra định kỳ",
        "context": "Monitoring health metrics across all zones via heartbeat probes."
      },
      {
        "term": "degraded performance",
        "vietnamese": "hiệu suất suy giảm",
        "context": "Should one zone exhibit degraded performance or complete unavailability."
      },
      {
        "term": "immutable catalog",
        "vietnamese": "danh mục bất biến",
        "context": "Authenticated requests query the immutable catalog during recovery."
      },
      {
        "term": "retrieval",
        "vietnamese": "truy xuất",
        "context": "Pull blocks in parallel for rapid retrieval."
      },
      {
        "term": "synchronised",
        "vietnamese": "được đồng bộ",
        "context": "Traffic is directed to the nearest synchronised copy."
      },
      {
        "term": "tape-based",
        "vietnamese": "dựa trên băng từ",
        "context": "Compared with legacy single-site tape-based archives."
      },
      {
        "term": "recovery-point objectives",
        "vietnamese": "mục tiêu điểm phục hồi",
        "context": "Delivering near-zero recovery-point objectives (RPO)."
      }
    ],
    "reviewExercise": {
      "type": "gap-fill",
      "instruction": "Fill in the blanks with appropriate words from the essay.",
      "items": [
        {
          "sentence": "The system uses ___ to survive regional failures.",
          "answer": "geographic redundancy",
          "explanation": "Storing copies across multiple distant locations for resilience."
        },
        {
          "sentence": "Client-side ___ ensures the provider cannot read the data.",
          "answer": "encryption",
          "explanation": "Scrambling data so only authorised parties can decipher it."
        },
        {
          "sentence": "The gateway removes duplicates through ___.",
          "answer": "deduplication",
          "explanation": "Eliminating redundant copies to save storage space."
        },
        {
          "sentence": "A central ___ monitors health and triggers automatic failover.",
          "answer": "orchestration plane",
          "explanation": "The control layer that coordinates distributed components."
        },
        {
          "sentence": "Parallel block pulling enables rapid ___ during recovery.",
          "answer": "retrieval",
          "explanation": "The act of fetching or recovering stored data."
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
    "essayBody": "The mixed chart presents export values across three sectors—agriculture, manufacturing, and services—as clustered bars, alongside the overall trade balance depicted as a continuous line, for the six-year interval from 2015 to 2020.\n\nOverall, the data reveal a **secular recomposition** of export revenue, with manufacturing **ceding** relative dominance to services while agriculture remained a **persistent underperformer**. The trade balance line, though **volatile**, traced a **V-shaped recovery** that **bottomed out** in 2017 before rallying to its **zenith** by 2020, underscoring the **counter-cyclical buffer** that a robust services sector can provide against goods-sector **softness**.\n\nManufacturing remained the **predominant** contributor in absolute terms, generating between $45 and $55 billion annually, yet its trajectory was **uneven**: after peaking at $52 billion in 2015, it suffered a **pronounced contraction** to $45 billion in 2017—likely reflecting global **supply-chain disruptions** or **commodity-price troughs**—before staging a **gradual convalescence** to $55 billion by 2020. Services, by contrast, exhibited consistent **outperformance**, posting a **monotonic uptick** from $30 billion to $45 billion across every single year, a trajectory that helped **countervail** manufacturing's mid-period slump and suggests strong **terms-of-trade** advantages in knowledge-intensive exports.\n\nAgricultural exports were comparatively **anaemic**, fluctuating narrowly between $14 and $16 billion and, at times, acting as a **drag** on aggregate momentum. Correspondingly, the trade balance line **mirrored** these sectoral movements with **fidelity**: it plunged from a $8 billion surplus in 2015 to a **razor-thin** $2 billion surplus in 2017, then **rebounded** robustly as both manufacturing and services advanced in tandem, closing at a **plenary** $12 billion surplus in 2020. The strongest year coincided with **synchronised gains** across all three pillars, reinforcing the **prudence** of export **diversification** as a hedge against sector-specific shocks—a principle **espoused** by the WTO and IMF in their respective trade-resilience frameworks.",
    "glossary": [
      {
        "term": "secular recomposition",
        "vietnamese": "tái cơ cấu dài hạn",
        "context": "A secular recomposition of export revenue over the six-year interval."
      },
      {
        "term": "ceding",
        "vietnamese": "nhường chỗ",
        "context": "Manufacturing ceding relative dominance to services."
      },
      {
        "term": "persistent underperformer",
        "vietnamese": "lĩnh vực liên tục kém phát triển",
        "context": "Agriculture remained a persistent underperformer."
      },
      {
        "term": "volatile",
        "vietnamese": "biến động",
        "context": "The trade balance line, though volatile, traced a V-shaped recovery."
      },
      {
        "term": "V-shaped recovery",
        "vietnamese": "phục hồi hình chữ V",
        "context": "A V-shaped recovery that bottomed out in 2017 before rallying."
      },
      {
        "term": "bottomed out",
        "vietnamese": "chạm đáy",
        "context": "The trade balance bottomed out in 2017 before rallying to its zenith."
      },
      {
        "term": "zenith",
        "vietnamese": "đỉnh cao nhất",
        "context": "Rallying to its zenith by 2020."
      },
      {
        "term": "counter-cyclical buffer",
        "vietnamese": "vùng đệm chống chu kỳ suy thoái",
        "context": "The counter-cyclical buffer that a robust services sector provides."
      },
      {
        "term": "softness",
        "vietnamese": "sự yếu đi",
        "context": "Protection against goods-sector softness."
      },
      {
        "term": "predominant",
        "vietnamese": "chiếm ưu thế/chủ đạo",
        "context": "Manufacturing remained the predominant contributor in absolute terms."
      },
      {
        "term": "pronounced contraction",
        "vietnamese": "sự thu hẹp rõ rệt",
        "context": "It suffered a pronounced contraction to $45 billion in 2017."
      },
      {
        "term": "supply-chain disruptions",
        "vietnamese": "gián đoạn chuỗi cung ứng",
        "context": "Likely reflecting global supply-chain disruptions or commodity-price troughs."
      },
      {
        "term": "commodity-price troughs",
        "vietnamese": "đáy giá hàng hóa",
        "context": "Reflecting commodity-price troughs before staging a gradual convalescence."
      },
      {
        "term": "convalescence",
        "vietnamese": "sự hồi phục",
        "context": "Staging a gradual convalescence to $55 billion by 2020."
      },
      {
        "term": "monotonic uptick",
        "vietnamese": "tăng liên tục không gián đoạn",
        "context": "Services posted a monotonic uptick from $30 billion to $45 billion."
      },
      {
        "term": "countervail",
        "vietnamese": "khắc chế/đối trọng",
        "context": "A trajectory that helped countervail manufacturing's mid-period slump."
      },
      {
        "term": "terms-of-trade",
        "vietnamese": "điều kiện thương mại",
        "context": "Strong terms-of-trade advantages in knowledge-intensive exports."
      },
      {
        "term": "anaemic",
        "vietnamese": "yếu ớt/thiếu sức sống",
        "context": "Agricultural exports were comparatively anaemic, fluctuating narrowly."
      },
      {
        "term": "drag",
        "vietnamese": "gánh nặng/kéo lùi",
        "context": "At times acting as a drag on aggregate momentum."
      },
      {
        "term": "mirrored",
        "vietnamese": "phản ánh",
        "context": "The trade balance line mirrored these sectoral movements with fidelity."
      },
      {
        "term": "fidelity",
        "vietnamese": "độ trung thực/sát sao",
        "context": "Mirrored these sectoral movements with fidelity."
      },
      {
        "term": "razor-thin",
        "vietnamese": "mong manh/sít sao",
        "context": "A razor-thin $2 billion surplus in 2017."
      },
      {
        "term": "rebounded",
        "vietnamese": "phục hồi",
        "context": "It rebounded robustly as both manufacturing and services advanced."
      },
      {
        "term": "plenary",
        "vietnamese": "toàn phần/đầy đủ",
        "context": "Closing at a plenary $12 billion surplus in 2020."
      },
      {
        "term": "synchronised gains",
        "vietnamese": "tăng trưởng đồng bộ",
        "context": "The strongest year coincided with synchronised gains across all three pillars."
      },
      {
        "term": "prudence",
        "vietnamese": "sự thận trọng khôn ngoan",
        "context": "Reinforcing the prudence of export diversification."
      },
      {
        "term": "diversification",
        "vietnamese": "đa dạng hóa",
        "context": "Export diversification as a hedge against sector-specific shocks."
      },
      {
        "term": "espoused",
        "vietnamese": "được ủng hộ/chấp nhận",
        "context": "A principle espoused by the WTO and IMF."
      }
    ],
    "reviewExercise": {
      "type": "gap-fill",
      "instruction": "Fill in the blanks with appropriate words from the essay.",
      "items": [
        {
          "sentence": "The trade balance traced a ___ after hitting its lowest point in 2017.",
          "answer": "V-shaped recovery",
          "explanation": "A rapid rebound following a sharp decline, forming a V on a chart."
        },
        {
          "sentence": "Manufacturing suffered a ___ in 2017 before recovering.",
          "answer": "pronounced contraction",
          "explanation": "A significant and noticeable reduction in output or size."
        },
        {
          "sentence": "Services showed a ___ uptick every single year without exception.",
          "answer": "monotonic",
          "explanation": "'Monotonic' means consistently increasing (or decreasing) without reversals."
        },
        {
          "sentence": "Agricultural exports were ___ compared to the other two sectors.",
          "answer": "anaemic",
          "explanation": "'Anaemic' means weak, lacking vitality or strength."
        },
        {
          "sentence": "The WTO and IMF both ___ export diversification as a resilience strategy.",
          "answer": "espoused",
          "explanation": "'Espoused' means advocated, supported, or adopted as a principle."
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
