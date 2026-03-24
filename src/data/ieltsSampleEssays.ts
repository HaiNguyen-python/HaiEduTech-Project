// IELTS Sample Essays Database - Band 8.0+ level
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
}

export const sampleEssays: SampleEssay[] = [
  {
    "id": "t1-1",
    "taskType": 1,
    "chartType": "line",
    "topic": "energy",
    "prompt": "The line graph below shows changes in electricity generation by source (coal, natural gas, renewables, and nuclear) in Country X from 1990 to 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    "essayBody": "The line graph illustrates changes in electricity generation from four sources \u2014 coal, natural gas, renewables, and nuclear \u2014 in Country X over a thirty-year period from 1990 to 2020.\n\nOverall, the most **salient features** of the series are the long-run decline of coal and the pronounced rise of renewables, while gas steadily gained ground and nuclear remained broadly stable.\n\nThe **long-term trajectory** of coal moved downward from dominance in the early 1990s to a much reduced share by 2020, a slide that **decelerated** after 2010 when levels **plateaued** at roughly a quarter of total output. In contrast, natural gas advanced in near-linear fashion, and eventually **overtook** coal in the late 2010s as policy and market signals favored cleaner combustion.\n\nRenewable generation exhibited a **precipitous** upswing from a low base, accelerating post-2005 as subsidies and grid integration matured; despite short-term **volatility**, it closed the period almost on par with gas. Nuclear output showed only **incremental** variation, providing a consistent baseload. By the end of the timeframe, there was a clear **convergence** between gas and renewables, jointly displacing coal's earlier **dominant** position.",
    "glossary": [
      {
        "term": "salient features",
        "vietnamese": "đặc điểm nổi bật",
        "context": "the most salient features of the series"
      },
      {
        "term": "long-term trajectory",
        "vietnamese": "quỹ đạo dài hạn",
        "context": "the long-term trajectory of coal"
      },
      {
        "term": "decelerated",
        "vietnamese": "chậm lại/giảm tốc",
        "context": "the decline decelerated after 2010"
      },
      {
        "term": "plateaued",
        "vietnamese": "đạt mức ổn định",
        "context": "levels plateaued at roughly a quarter"
      },
      {
        "term": "overtook",
        "vietnamese": "vượt qua",
        "context": "gas overtook coal"
      },
      {
        "term": "precipitous",
        "vietnamese": "dốc/đột ngột",
        "context": "a precipitous upswing from a low base"
      },
      {
        "term": "volatility",
        "vietnamese": "biến động mạnh",
        "context": "despite short-term volatility"
      },
      {
        "term": "incremental",
        "vietnamese": "từng bước/nhỏ",
        "context": "incremental variation in nuclear"
      },
      {
        "term": "convergence",
        "vietnamese": "hội tụ",
        "context": "a clear convergence between gas and renewables"
      },
      {
        "term": "dominant",
        "vietnamese": "chi phối/chủ đạo",
        "context": "coal’s earlier dominant position"
      }
    ],
    "reviewExercise": {
      "type": "gap-fill",
      "instruction": "Fill in the blanks with appropriate words from the essay.",
      "items": [
        {
          "sentence": "Coal’s decline eventually ___ after 2010, settling at a lower level.",
          "answer": "decelerated",
          "explanation": "'Decelerated' means the rate of decline slowed down."
        },
        {
          "sentence": "Renewables experienced a ___ upswing from a low base.",
          "answer": "precipitous",
          "explanation": "'Precipitous' describes a very steep or dramatic increase."
        },
        {
          "sentence": "By the late 2010s, natural gas ___ coal.",
          "answer": "overtook",
          "explanation": "'Overtook' means gas surpassed coal to become a larger source."
        },
        {
          "sentence": "The two cleaner sources showed clear ___ by 2020.",
          "answer": "convergence",
          "explanation": "'Convergence' means the two sources moved toward similar levels."
        },
        {
          "sentence": "Nuclear changed only in an ___ manner over the period.",
          "answer": "incremental",
          "explanation": "'Incremental' means small, gradual changes."
        }
      ]
    }
  },
  {
    "id": "t1-2",
    "taskType": 1,
    "chartType": "line",
    "topic": "population",
    "prompt": "The line graph below shows the proportion of the population in three age groups (0–14, 15–64, 65+) in Country Y from 1970 to 2030. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    "essayBody": "The line graph depicts the proportion of the population in three age groups \u2014 0\u201314, 15\u201364, and 65+ \u2014 in Country Y over a sixty-year period from 1970 to 2030.\n\nOverall, the data reveal a classic **demographic transition**, with shrinking youth shares and a swelling elderly **cohort** alongside a maturing working-age population.\n\nFrom 1970, the 0\u201314 bracket contracted steadily, marking an early **inflection point** around the mid-1980s when fertility declines became more pronounced. Meanwhile, the 15\u201364 group expanded for several decades before beginning to **taper off** after 2010, suggesting labor-force ageing even as its absolute size remained substantial.\n\nThe 65+ category registered a persistent **uptick**, eventually set to **outpace** the youth share by 2030, a trend **underpinning** rising dependency ratios. Although the working-age group dominated throughout, its **proportionally** modest gains in the 1990s gave way to stagnation, while the seniors' curve steepened as longevity improved, underscoring the rapid emergence of an **ageing populace**.",
    "glossary": [
      {
        "term": "demographic transition",
        "vietnamese": "chuyển đổi dân số",
        "context": "a classic demographic transition"
      },
      {
        "term": "cohort",
        "vietnamese": "nhóm tuổi",
        "context": "a swelling elderly cohort"
      },
      {
        "term": "inflection point",
        "vietnamese": "điểm bẻ cong/xoay chiều",
        "context": "inflection point around the mid-1980s"
      },
      {
        "term": "taper off",
        "vietnamese": "giảm dần",
        "context": "working-age population began to taper off"
      },
      {
        "term": "uptick",
        "vietnamese": "tăng nhẹ/đi lên",
        "context": "registered a persistent uptick"
      },
      {
        "term": "outpace",
        "vietnamese": "vượt qua về tốc độ/tỷ lệ",
        "context": "elderly set to outpace the youth share"
      },
      {
        "term": "underpinning",
        "vietnamese": "làm nền tảng/hỗ trợ",
        "context": "underpinning rising dependency ratios"
      },
      {
        "term": "proportionally",
        "vietnamese": "về mặt tỷ lệ",
        "context": "proportionally modest gains"
      },
      {
        "term": "ageing populace",
        "vietnamese": "dân số già hóa",
        "context": "overarching pattern of an ageing populace"
      }
    ],
    "reviewExercise": {
      "type": "gap-fill",
      "instruction": "Fill in the blanks with appropriate words from the essay.",
      "items": [
        {
          "sentence": "The graph shows a classic ___ with falling youth shares.",
          "answer": "demographic transition",
          "explanation": "A 'demographic transition' describes the shift from high birth/death rates to low ones."
        },
        {
          "sentence": "The working-age group began to ___ after 2010.",
          "answer": "taper off",
          "explanation": "'Taper off' means to gradually decrease or level out."
        },
        {
          "sentence": "An ___ occurred in the mid-1980s as fertility dropped.",
          "answer": "inflection point",
          "explanation": "An 'inflection point' is where the trend changes direction or pace."
        },
        {
          "sentence": "By 2030, the elderly are expected to ___ the youth share.",
          "answer": "outpace",
          "explanation": "'Outpace' means to exceed in rate or proportion."
        },
        {
          "sentence": "These changes are ___ rising dependency ratios.",
          "answer": "underpinning",
          "explanation": "'Underpinning' means forming the foundation or basis for something."
        }
      ]
    }
  },
  {
    "id": "t1-3",
    "taskType": 1,
    "chartType": "bar",
    "topic": "education",
    "prompt": "The bar chart below compares the percentage of adults with a university degree in five countries in 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    "essayBody": "The bar chart compares the percentage of adults holding a university degree in five countries in the years 2000 and 2020.\n\nOverall, the chart reveals a broad uplift in tertiary attainment, albeit with marked **disparity** across countries.\n\nNation A posted a **steep ascent** from a relatively low starting point, whereas Nation B registered only **marginal** progress and remained an **outlier** at the bottom in both years. By contrast, Nations C and D, already strong performers in 2000, exhibited **incremental gains** that helped them **converge** near the top by 2020.\n\nNation E experienced a mid-range rise, sufficient to **compress** the gap with the leaders but not to **surpass** them. The most **comparative** insight is that improvements were uneven: while some systems capitalized on policy reforms and funding, others **lagged behind**, possibly due to quality bottlenecks or limited access pathways. Despite these differences, the aggregate picture points to a steady expansion of human capital.",
    "glossary": [
      {
        "term": "disparity",
        "vietnamese": "chênh lệch",
        "context": "marked disparity across countries"
      },
      {
        "term": "steep ascent",
        "vietnamese": "tăng mạnh/leo dốc",
        "context": "posted a steep ascent"
      },
      {
        "term": "marginal",
        "vietnamese": "nhỏ/không đáng kể",
        "context": "only marginal progress"
      },
      {
        "term": "outlier",
        "vietnamese": "giá trị ngoại lai/khác biệt",
        "context": "remained an outlier at the bottom"
      },
      {
        "term": "incremental gains",
        "vietnamese": "tăng dần/tăng nhỏ",
        "context": "exhibited incremental gains"
      },
      {
        "term": "converge",
        "vietnamese": "hội tụ",
        "context": "helped them converge near the top"
      },
      {
        "term": "compress",
        "vietnamese": "thu hẹp/nén lại",
        "context": "compress the gap with the leaders"
      },
      {
        "term": "surpass",
        "vietnamese": "vượt qua",
        "context": "not to surpass them"
      },
      {
        "term": "comparative",
        "vietnamese": "so sánh",
        "context": "The most comparative insight"
      },
      {
        "term": "lagged behind",
        "vietnamese": "tụt lại phía sau",
        "context": "others lagged behind"
      }
    ],
    "reviewExercise": {
      "type": "gap-fill",
      "instruction": "Fill in the blanks with appropriate words from the essay.",
      "items": [
        {
          "sentence": "Nation B remained an ___ with the lowest attainment.",
          "answer": "outlier",
          "explanation": "An 'outlier' is a data point far from the others."
        },
        {
          "sentence": "Nation A recorded a ___ from a low base.",
          "answer": "steep ascent",
          "explanation": "'Steep ascent' indicates a rapid, significant rise."
        },
        {
          "sentence": "Countries C and D made ___ that kept them near the top.",
          "answer": "incremental gains",
          "explanation": "'Incremental gains' are small, steady improvements."
        },
        {
          "sentence": "Nation E managed to ___ the gap but did not overtake.",
          "answer": "compress",
          "explanation": "'Compress' means to narrow or reduce a gap."
        },
        {
          "sentence": "Some systems ___ due to access bottlenecks.",
          "answer": "lagged behind",
          "explanation": "'Lagged behind' means failed to keep pace with others."
        }
      ]
    }
  },
  {
    "id": "t1-4",
    "taskType": 1,
    "chartType": "bar",
    "topic": "transport",
    "prompt": "The bar chart below shows the average number of daily commuters by transport mode (car, bus, metro, bicycle) in three cities in 2015. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    "essayBody": "The bar chart illustrates the average number of daily commuters using four transport modes \u2014 car, bus, metro, and bicycle \u2014 in three cities in 2015.\n\nIn general, the **modal split** differed sharply across the three cities, with car dominance in one, metro strength in another, and notable cycling culture in the third.\n\nCity X displayed a clear **predominance** of car travel, with bus and metro attracting fewer riders and cycling remaining **subdued**. By contrast, City Y's extensive underground network allowed metro to **surpass** private cars, while bus usage was solid and cycling modest.\n\nCity Z stood out for a strong bicycle **uptake**, reflecting compact urban form and dedicated lanes; this **pivot towards** active travel coincided with a measurable **contraction** in car commuting relative to the others. Across all cities, buses occupied an intermediate position, with volumes showing only **marginal** variation. The **trajectory** of sustainable modes was most favorable in Cities Y and Z.",
    "glossary": [
      {
        "term": "modal split",
        "vietnamese": "cơ cấu phương thức vận tải",
        "context": "the modal split differed sharply"
      },
      {
        "term": "predominance",
        "vietnamese": "sự áp đảo",
        "context": "predominance of car travel"
      },
      {
        "term": "subdued",
        "vietnamese": "yếu/không nổi bật",
        "context": "cycling remaining subdued"
      },
      {
        "term": "surpass",
        "vietnamese": "vượt qua",
        "context": "metro to surpass private cars"
      },
      {
        "term": "uptake",
        "vietnamese": "mức độ sử dụng",
        "context": "strong bicycle uptake"
      },
      {
        "term": "pivot towards",
        "vietnamese": "chuyển hướng sang",
        "context": "pivot towards active travel"
      },
      {
        "term": "contraction",
        "vietnamese": "sự thu hẹp/giảm",
        "context": "contraction in car commuting"
      },
      {
        "term": "marginal",
        "vietnamese": "nhỏ/không đáng kể",
        "context": "marginal variation in bus volumes"
      },
      {
        "term": "trajectory",
        "vietnamese": "xu hướng/quỹ đạo",
        "context": "trajectory of sustainable modes"
      }
    ],
    "reviewExercise": {
      "type": "gap-fill",
      "instruction": "Fill in the blanks with appropriate words from the essay.",
      "items": [
        {
          "sentence": "City X shows a clear ___ of car travel.",
          "answer": "predominance",
          "explanation": "'Predominance' means being the most common or dominant."
        },
        {
          "sentence": "In City Y, metro use managed to ___ cars.",
          "answer": "surpass",
          "explanation": "'Surpass' means to exceed or go beyond."
        },
        {
          "sentence": "City Z had notable bicycle ___.",
          "answer": "uptake",
          "explanation": "'Uptake' refers to the level of adoption or use."
        },
        {
          "sentence": "Cycling in City X was relatively ___.",
          "answer": "subdued",
          "explanation": "'Subdued' means quiet, restrained, or low-level."
        },
        {
          "sentence": "Car commuting saw a ___ in City Z.",
          "answer": "contraction",
          "explanation": "'Contraction' means a decrease or shrinking."
        }
      ]
    }
  },
  {
    "id": "t1-5",
    "taskType": 1,
    "chartType": "pie",
    "topic": "tourism",
    "prompt": "The pie charts below show the allocation of tourist expenditure by category in City Z in 2010 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    "essayBody": "The two pie charts compare the allocation of tourist expenditure across different categories in City Z in 2010 and 2020.\n\nOverall, the pies indicate a discernible **reallocation** of spending over the decade, with a shift from basic lodging toward experiential categories.\n\nWhile accommodation retained the largest **proportion**, its **dominance** eased as travelers diverted funds toward experiences. Food and entertainment together accounted for a growing **segment**, with the latter registering the most **salient shift** amid the rise of events and cultural attractions. By contrast, transport's share **compressed**, likely reflecting improved pass systems and competition from low-cost carriers.\n\nShopping remained broadly stable, suggesting a ceiling to souvenir-driven outlays. The **redistribution** favored more **discretionary** categories, implying that visitors prioritized memorable activities over basic lodging. Although accommodation still **outweighed** any single rival category, it no longer dominated them collectively as decisively as before.",
    "glossary": [
      {
        "term": "reallocation",
        "vietnamese": "tái phân bổ",
        "context": "reallocation of spending"
      },
      {
        "term": "proportion",
        "vietnamese": "tỷ trọng",
        "context": "retained the largest proportion"
      },
      {
        "term": "dominance",
        "vietnamese": "vị thế chi phối",
        "context": "its dominance eased"
      },
      {
        "term": "segment",
        "vietnamese": "phân khúc",
        "context": "a growing segment"
      },
      {
        "term": "salient shift",
        "vietnamese": "sự thay đổi nổi bật",
        "context": "the most salient shift in entertainment"
      },
      {
        "term": "compressed",
        "vietnamese": "bị thu hẹp",
        "context": "transport’s share compressed"
      },
      {
        "term": "redistribution",
        "vietnamese": "phân phối lại",
        "context": "the redistribution favored discretionary categories"
      },
      {
        "term": "discretionary",
        "vietnamese": "tùy ý/không bắt buộc",
        "context": "more discretionary categories"
      },
      {
        "term": "outweighed",
        "vietnamese": "vượt trội hơn",
        "context": "accommodation still outweighed any single rival"
      }
    ],
    "reviewExercise": {
      "type": "gap-fill",
      "instruction": "Fill in the blanks with appropriate words from the essay.",
      "items": [
        {
          "sentence": "Accommodation kept the largest ___ of spending.",
          "answer": "proportion",
          "explanation": "'Proportion' refers to the relative share of the whole."
        },
        {
          "sentence": "Entertainment saw the most ___ among categories.",
          "answer": "salient shift",
          "explanation": "'Salient shift' means a noticeable or prominent change."
        },
        {
          "sentence": "Transport’s share ___ over the decade.",
          "answer": "compressed",
          "explanation": "'Compressed' means reduced or squeezed smaller."
        },
        {
          "sentence": "Spending shows a ___ toward experiential items.",
          "answer": "reallocation",
          "explanation": "'Reallocation' means redistributing resources differently."
        },
        {
          "sentence": "The pattern favored more ___ categories.",
          "answer": "discretionary",
          "explanation": "'Discretionary' means optional, not essential spending."
        }
      ]
    }
  },
  {
    "id": "t1-6",
    "taskType": 1,
    "chartType": "pie",
    "topic": "employment",
    "prompt": "The pie charts below illustrate the distribution of employment by sector (agriculture, manufacturing, services, technology) in Country A in 1995 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    "essayBody": "The pie charts illustrate the distribution of employment across four sectors \u2014 agriculture, manufacturing, services, and technology \u2014 in Country A in the years 1995 and 2025.\n\nOverall, the figures suggest a pronounced **structural change** in the labor market, shifting away from traditional sectors toward knowledge-driven employment.\n\nAgriculture experienced a marked **contraction**, ceding ground to both services and technology, while manufacturing's share edged down. By 2025, services had **eclipsed** all other sectors, becoming the principal employer, with technology emerging as a **nascent** but fast-growing contributor.\n\nThe overall **sectoral composition** thus **rebalanced** away from **labor-intensive** activities toward **high-value-added** roles. Although manufacturing retained a sizeable footprint, its decline, coupled with the plunge in farm jobs, underscores a national **reorientation** toward knowledge-driven employment. The expansion of technology created complementary roles within services, amplifying the shift.",
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
    }
  },
  {
    "id": "t1-7",
    "taskType": 1,
    "chartType": "table",
    "topic": "health",
    "prompt": "The table below presents key health indicators (life expectancy, infant mortality per 1,000, doctors per 1,000, and health expenditure as % of GDP) for four countries in 2010 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    "essayBody": "The table presents four key health indicators — life expectancy, infant mortality per 1,000, doctors per 1,000, and health expenditure as a percentage of GDP — for four countries in 2010 and 2020.\n\nOverall, all countries registered **sustained improvement** across the decade, though the pace varied by metric and nation.\n\nLife expectancy rose almost universally, with Country Q posting the largest gain, while Country R — already a **benchmark** in 2010 — advanced more modestly. Infant mortality fell markedly, with the steepest drops in Countries Q and S, indicating effective primary care and vaccination outreach. Physician density increased in each case, albeit **incrementally** in lower-income states, and more **markedly** where training capacity expanded.\n\nHealth spending as a share of GDP diverged: some systems saw a mild uptick aligned with reforms, while others **plateaued**, prioritizing efficiency. A clear **correlation** emerges between higher doctor availability and reduced infant deaths, though Country T is an **outlier**, achieving notable mortality declines without proportionate spending growth. Despite **concurrent** advances across indicators, cross-country **divergence** persists, reflecting heterogeneous baselines and policy choices.",
    "glossary": [
      {
        "term": "sustained improvement",
        "vietnamese": "cải thiện bền vững",
        "context": "registered sustained improvement"
      },
      {
        "term": "benchmark",
        "vietnamese": "chuẩn mực/điểm tham chiếu",
        "context": "Country R—already a benchmark"
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
    }
  },
  {
    "id": "t1-8",
    "taskType": 1,
    "chartType": "map",
    "topic": "urbanization",
    "prompt": "The maps below show changes to the town of Riverdale between 1990 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    "essayBody": "The two maps compare the layout of the town of Riverdale in 1990 and 2020, highlighting the changes that occurred over this thirty-year period.\n\nOverall, Riverdale underwent substantial **transformation**, evolving from a semi-rural settlement into a more compact, transit-oriented urban center.\n\nIn 1990, farmland dominated the outskirts, but by 2020 much of this had been **rezoned** for housing estates, indicating marked **densification**. A new ring road and expanded **arterial** connections improved **connectivity**, while a central square was **pedestrianized** to prioritize foot traffic. Industrial activity shifted from the riverside to a peripheral business park, reducing **encroachment** on the waterfront.\n\nCivic amenities also multiplied: the school relocated closer to residential clusters, and a transit hub integrated bus and commuter rail. A landscaped **greenbelt** was established at the edge, and commercial uses intensified along the former high street, with mixed-use **infill** replacing parking lots. The spatial logic pivoted from car-centric sprawl to transit-oriented development.",
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
    }
  },
  {
    "id": "t1-9",
    "taskType": 1,
    "chartType": "process",
    "topic": "technology",
    "prompt": "The diagram below shows the process of cloud data backup and recovery across multiple availability zones. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    "essayBody": "The diagram illustrates the step-by-step process of cloud data backup and recovery across multiple availability zones.\n\nOverall, the process follows a **sequential** workflow designed to safeguard user data from loss through redundancy, validation, and automated failover mechanisms.\n\nInitially, files undergo client-side **encryption** during **intake**, after which they are transmitted to a regional gateway for deduplication and indexing. The system then performs **replication** to at least three independent zones to create **redundancy**, accompanied by **checksum** validation to detect corruption. A central **orchestration** layer continuously monitors health and automatically triggers **failover** if one zone degrades.\n\nPeriodic integrity audits and versioning provide additional resilience, allowing point-in-time restoration. During recovery, authenticated requests query the catalog, select the most recent consistent snapshot, and pull blocks in parallel for rapid **retrieval**; if latency spikes, traffic is re-routed to the healthiest replica. Compared with single-site storage, this **fault-tolerant** architecture minimizes downtime by avoiding single points of failure.",
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
    }
  },
  {
    "id": "t1-10",
    "taskType": 1,
    "chartType": "mixed",
    "topic": "trade",
    "prompt": "The mixed chart below shows export values by sector (agriculture, manufacturing, services) as bars and the overall trade balance as a line from 2015 to 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    "essayBody": "The mixed chart presents export values by sector — agriculture, manufacturing, and services — as bars, alongside the overall trade balance shown as a line, from 2015 to 2020.\n\nOverall, the bars and line point to shifting export dynamics and a volatile **net balance**, with services emerging as a stabilizing force.\n\nManufacturing remained the **aggregate** driver of exports, though its growth was uneven, with a mid-period **downturn** before recovering. Services exhibited steady **outperformance**, posting a consistent **uptick** each year, which helped **counteract** manufacturing softness. Agricultural exports were relatively flat and, at times, a **drag** on momentum.\n\nCorrespondingly, the trade balance line mirrored these movements: it dipped during the manufacturing slump, then improved as both services and factories advanced. Despite episodic **volatility**, the account trended modestly upward by 2020, suggesting that competitive services can cushion cyclical goods sectors. The best overall year coincided with synchronized gains across all three pillars, underscoring the value of diversification.",
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
    }
  },
  {
    "id": "t2-1",
    "taskType": 2,
    "essayType": "opinion",
    "topic": "Education technology in classrooms",
    "prompt": "Some people believe that integrating technology into classrooms significantly improves learning outcomes, while others argue it distracts students from deep learning. To what extent do you agree or disagree?",
    "essayBody": "Technology, when thoughtfully deployed, can transform classrooms from passive lecture halls into vibrant ecosystems of inquiry. I strongly agree that integration improves learning outcomes, provided it is guided by sound **pedagogy** rather than novelty. Digital tools should serve clear objectives such as **formative assessment**, **personalization**, and timely feedback—not simply add more **screen time**.\n\nFirst, technology empowers teachers to run truly **blended learning** environments. Instead of one-size-fits-all lectures, students rotate between teacher-led explanation and adaptive platforms that diagnose misconceptions in real time. Through **learning analytics**, educators can track progress at granular levels, spotting gaps early and tailoring support accordingly. This boosts both efficiency and mastery, especially when coupled with a **flipped classroom** model that moves content delivery outside class, reserving lesson time for dialogue, practice, and problem-solving.\n\nSecond, well-governed platforms enhance fairness. Properly designed systems can widen **equity** by giving diverse learners multiple ways to access material—text, audio, video, or simulations—and by allowing pacing that suits individual needs. However, such benefits depend on bridging the **digital divide**. Without robust infrastructure and device access, edtech risks entrenching inequality. Equally vital is strong **data privacy**, ensuring sensitive records are protected and used ethically. Clear consent, minimal data collection, and transparent algorithms should be non-negotiable.\n\nCritics rightly warn that devices can distract, yet this is a design and culture problem, not an inherent flaw. With purposeful routines, low-friction interfaces, and attention to **formative assessment** over superficial gamification, technology can cultivate **personalization** without fragmentation. Ultimately, tools that nurture **metacognition**—helping learners plan, monitor, and evaluate their own understanding—raise achievement and independence. The question is not whether to use technology, but whether we use it to advance learning rather than chase novelty. When anchored in evidence-informed **pedagogy**, technology is a powerful amplifier of human teaching.",
    "glossary": [
      {
        "term": "pedagogy",
        "vietnamese": "phương pháp sư phạm",
        "context": "Instruction must be driven by strong pedagogy, not gadgets."
      },
      {
        "term": "formative assessment",
        "vietnamese": "đánh giá định hình",
        "context": "Quizzes provide formative assessment to inform next steps."
      },
      {
        "term": "personalization",
        "vietnamese": "cá nhân hóa",
        "context": "Adaptive tasks enable personalization of learning pathways."
      },
      {
        "term": "screen time",
        "vietnamese": "thời gian sử dụng màn hình",
        "context": "Excessive screen time can sap attention if unmanaged."
      },
      {
        "term": "blended learning",
        "vietnamese": "học kết hợp",
        "context": "Blended learning mixes online modules with seminars."
      },
      {
        "term": "learning analytics",
        "vietnamese": "phân tích học tập",
        "context": "Learning analytics flags misconceptions early."
      },
      {
        "term": "flipped classroom",
        "vietnamese": "lớp học đảo ngược",
        "context": "The flipped classroom reserves time for problem-solving."
      },
      {
        "term": "equity",
        "vietnamese": "công bằng",
        "context": "Design for equity ensures access for all learners."
      },
      {
        "term": "digital divide",
        "vietnamese": "khoảng cách số",
        "context": "The digital divide can widen achievement gaps."
      },
      {
        "term": "data privacy",
        "vietnamese": "quyền riêng tư dữ liệu",
        "context": "Data privacy policies protect student records."
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
    "essayBody": "Advocates of carbon taxes contend they internalise environmental **externalities** by embedding climate costs into market prices. A robust levy sends a clear **price signal** across the economy, steering producers and consumers away from carbon-intensive goods. Because taxes operate technology-neutrally, they adjust the entire **energy mix**, motivating both efficiency gains and fuel switching. When set predictably and paired with dividends, they can be fiscally simple and socially palatable.\n\nOpponents worry about political feasibility and unintended outcomes. If demand for energy is inelastic, the **elasticity** of consumption may blunt short‑term emissions cuts and burden households. Poorly designed taxes can trigger **carbon leakage**, shifting emissions—and jobs—offshore. Others note potential **regulatory capture**, where vested interests dilute rates or carve out exemptions. For these reasons, some prefer targeted subsidies that accelerate renewables, storage, and grid upgrades, arguing that public support drives learning curves and avoids the **rebound effect** seen when efficiency lowers costs and boosts use.\n\nIn my view, the debate is falsely binary. Carbon pricing operationalises the **polluter pays** principle and provides economy‑wide incentives for **decarbonisation**; however, markets alone cannot overcome infrastructure bottlenecks or innovation valleys of death. Strategic subsidies and public investment are essential to build transmission, fund early‑stage technologies, and ensure a **just transition** that protects vulnerable workers and regions. To work, taxes must be nudged up along a transparent trajectory, integrated with border adjustments to curb leakage, and recycled through progressive rebates. Subsidies should be sunset as technologies mature to prevent dependency.\n\nUltimately, an efficient, fair package blends a rising tax with smart subsidies, standards, and support for those most exposed. Climate policy should be judged not by ideological purity but by whether it cuts emissions quickly, equitably, and at scale.",
    "glossary": [
      {
        "term": "externalities",
        "vietnamese": "tác động ngoại lai",
        "context": "Taxes can internalise negative externalities."
      },
      {
        "term": "price signal",
        "vietnamese": "tín hiệu giá",
        "context": "A carbon levy sends a price signal to cut emissions."
      },
      {
        "term": "energy mix",
        "vietnamese": "cơ cấu năng lượng",
        "context": "Carbon pricing reshapes the national energy mix."
      },
      {
        "term": "elasticity",
        "vietnamese": "độ co giãn",
        "context": "Low elasticity can limit short-term demand shifts."
      },
      {
        "term": "carbon leakage",
        "vietnamese": "rò rỉ carbon",
        "context": "Weak rules risk carbon leakage to other countries."
      },
      {
        "term": "regulatory capture",
        "vietnamese": "sự chi phối của lợi ích ngành",
        "context": "Exemptions may reflect regulatory capture."
      },
      {
        "term": "rebound effect",
        "vietnamese": "hiệu ứng bật ngược",
        "context": "Efficiency can trigger a rebound effect."
      },
      {
        "term": "polluter pays",
        "vietnamese": "nguyên tắc người gây ô nhiễm phải trả",
        "context": "Polluter pays underpins carbon taxation."
      },
      {
        "term": "decarbonisation",
        "vietnamese": "khử carbon",
        "context": "Pricing catalyses economy-wide decarbonisation."
      },
      {
        "term": "just transition",
        "vietnamese": "chuyển dịch công bằng",
        "context": "Policies must ensure a just transition for workers."
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
    "essayBody": "Telemedicine has shifted from a stopgap solution to a structural pillar of care. On balance, its advantages outweigh the drawbacks, provided systems are designed for safety, equity, and accountability.\n\nThe benefits are substantial. First, virtual access protects **continuity of care** for chronic conditions, reducing missed appointments and hospital readmissions. Effective digital **triage** directs patients to the right level of service—from self-care to urgent intervention—easing pressure on emergency units. Integration with electronic records enhances **interoperability**, enabling clinicians to share data seamlessly and avoid duplicated tests. For remote or underserved communities, telehealth advances **health equity** by cutting travel time and costs. It also improves **diagnostic accuracy** in certain fields by allowing rapid specialist input via store-and-forward images. For stable patients, **remote monitoring** devices transmit vital signs, enabling proactive adjustments. Meanwhile, **asynchronous consulting** lets clinicians handle non-urgent queries efficiently, and clearer **reimbursement** rules have made services financially viable. Robust **clinical governance** frameworks can codify best practices and protect patient safety.\n\nNonetheless, risks remain. Digital exclusion and low **digital literacy** can marginalise vulnerable groups. Not all conditions are suited to virtual assessment; subtle cues and physical exams may be missed. Privacy breaches and fragmented platforms undermine trust. And perverse incentives could drive overuse, increasing costs without improving outcomes.\n\nTo tip the balance, policy should mandate accessibility features, multilingual support, and community training to raise digital literacy. Clear pathways must specify when in‑person review is essential. Interoperable standards, strong consent processes, and fair reimbursement will align incentives with value. With these safeguards, telemedicine complements, rather than replaces, face‑to‑face care, delivering reach, timeliness, and resilience that traditional models struggle to match.",
    "glossary": [
      {
        "term": "continuity of care",
        "vietnamese": "tính liên tục của chăm sóc",
        "context": "Telehealth protects continuity of care for chronic patients."
      },
      {
        "term": "triage",
        "vietnamese": "phân loại mức độ ưu tiên",
        "context": "Digital triage directs patients to suitable services."
      },
      {
        "term": "interoperability",
        "vietnamese": "khả năng tương tác",
        "context": "Interoperability reduces duplicate testing."
      },
      {
        "term": "health equity",
        "vietnamese": "công bằng y tế",
        "context": "Telemedicine can advance health equity for rural areas."
      },
      {
        "term": "diagnostic accuracy",
        "vietnamese": "độ chính xác chẩn đoán",
        "context": "Specialist input may improve diagnostic accuracy."
      },
      {
        "term": "digital literacy",
        "vietnamese": "kỹ năng số",
        "context": "Low digital literacy can exclude patients."
      },
      {
        "term": "remote monitoring",
        "vietnamese": "giám sát từ xa",
        "context": "Remote monitoring alerts clinicians to risk spikes."
      },
      {
        "term": "asynchronous consulting",
        "vietnamese": "tư vấn không đồng bộ",
        "context": "Asynchronous consulting handles non-urgent queries."
      },
      {
        "term": "reimbursement",
        "vietnamese": "chi trả bảo hiểm",
        "context": "Clear reimbursement rules support sustainability."
      },
      {
        "term": "clinical governance",
        "vietnamese": "quản trị lâm sàng",
        "context": "Clinical governance codifies safe telehealth practice."
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
    "essayBody": "Explosive urban growth has strained streets and stretched housing markets to breaking point. Congestion erodes productivity, pollutes the air, and frays social cohesion, while soaring rents displace lower‑income residents and push workers far from jobs.\n\nThe problems are mutually reinforcing. Car‑dependent patterns encourage **urban sprawl**, lengthening commutes and clogging arterial roads. Scarce, unaffordable homes close to jobs intensify displacement, frictions with established communities, and workforce shortages in essential services. Public budgets groan under the weight of scattered infrastructure, yet quality of life declines.\n\nA coherent remedy begins with land use and mobility. Cities should concentrate growth around high‑capacity transit through **transit-oriented development**, mixing homes, jobs, and services near stations. Pricing is pivotal: **congestion pricing** can reduce peak‑hour traffic and fund better alternatives. Updating codes to allow **mixed-use** and gentle density enables corner shops, apartments over cafés, and compact neighborhoods that cut car dependence. To expand supply, prioritize **infill development** on underused parcels and convert **brownfield** sites into livable districts.\n\nSocially, planners must curb displacement. Anti‑speculation taxes and targeted **rent control**—carefully designed to protect tenants without freezing supply—can help. Investments in **last-mile connectivity** like safe cycling and microtransit stitch neighborhoods to trunk lines, while inclusionary zoning and public housing sustain **housing affordability** near jobs.\n\nImplementation matters. Streamlined approvals, design standards for walkability, and data‑driven monitoring can align private incentives with public goals. When cities unite pricing, zoning reform, and social safeguards, congestion eases, commutes shorten, and housing becomes attainable—turning unchecked expansion into intentional, human‑scale urbanism.",
    "glossary": [
      {
        "term": "urban sprawl",
        "vietnamese": "đô thị lan tỏa",
        "context": "Urban sprawl lengthens commutes and raises emissions."
      },
      {
        "term": "transit-oriented development",
        "vietnamese": "phát triển định hướng giao thông công cộng",
        "context": "Transit-oriented development clusters growth near stations."
      },
      {
        "term": "congestion pricing",
        "vietnamese": "thu phí ùn tắc",
        "context": "Congestion pricing manages peak traffic demand."
      },
      {
        "term": "mixed-use",
        "vietnamese": "đa chức năng",
        "context": "Mixed-use zones combine housing, retail, and offices."
      },
      {
        "term": "infill development",
        "vietnamese": "phát triển chen cấy",
        "context": "Infill development uses vacant urban lots."
      },
      {
        "term": "brownfield",
        "vietnamese": "khu đất công nghiệp cũ",
        "context": "Brownfield sites can be remediated for housing."
      },
      {
        "term": "rent control",
        "vietnamese": "kiểm soát tiền thuê",
        "context": "Rent control protects tenants from sudden spikes."
      },
      {
        "term": "last-mile connectivity",
        "vietnamese": "kết nối chặng cuối",
        "context": "Last-mile connectivity links homes to transit."
      },
      {
        "term": "housing affordability",
        "vietnamese": "khả năng chi trả nhà ở",
        "context": "Policies should preserve housing affordability near jobs."
      },
      {
        "term": "inclusionary zoning",
        "vietnamese": "quy hoạch bao trùm",
        "context": "Inclusionary zoning requires some units be affordable."
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
    "essayBody": "Globalisation has undeniably reconfigured local cultures. On one hand, media platforms and multinational brands can promote **cultural homogenisation**, flattening differences as the same franchises, fashions, and memes spread globally. Dominant languages serve as a **lingua franca**, enabling trade but also crowding out minority tongues. Consumer choice prioritises **consumer sovereignty**, yet algorithms often narrow exposure, ironically standardising tastes.\n\nOn the other hand, hybridity flourishes. Through **glocalisation**, communities adapt global influences to local sensibilities—street food fuses traditions, musicians sample distant genres, and entrepreneurs remix design motifs. Migrant flows expand **diaspora networks**, circulating ideas and capital that can energise **creative industries** at home. Cultural borrowing becomes a two-way street, amplifying **soft power** and economic opportunity.\n\nGovernments should neither seal borders nor surrender identity. First, protect heritage through inventories, funding, and living traditions programs under robust **heritage preservation** laws. Education can cultivate **cultural capital** by teaching local histories, languages, and arts alongside global literacy. Second, set clear **regulatory standards** for cultural sectors—quotas or incentives that ensure diverse domestic content in film, music, and broadcasting without stifling innovation. Urban policy can provide affordable spaces for studios, galleries, and markets that incubate local makers.\n\nInternationally, cultural accords and mobility schemes should enable exchange while safeguarding intellectual property and fair pay for artists. Finally, adopt **policy coherence**: tourism, trade, and education policies should align with cultural goals so that development funds, visas, and curricula reinforce, rather than erode, identity. Done well, openness need not dissolve distinctiveness; it can showcase it to the world.",
    "glossary": [
      {
        "term": "cultural homogenisation",
        "vietnamese": "đồng nhất văn hóa",
        "context": "Global brands can drive cultural homogenisation."
      },
      {
        "term": "lingua franca",
        "vietnamese": "ngôn ngữ chung",
        "context": "English functions as a lingua franca in trade."
      },
      {
        "term": "consumer sovereignty",
        "vietnamese": "quyền tối cao của người tiêu dùng",
        "context": "Platforms claim to reflect consumer sovereignty."
      },
      {
        "term": "glocalisation",
        "vietnamese": "bản địa hóa toàn cầu",
        "context": "Glocalisation blends global ideas with local tastes."
      },
      {
        "term": "diaspora networks",
        "vietnamese": "mạng lưới kiều bào",
        "context": "Diaspora networks channel skills and funding."
      },
      {
        "term": "soft power",
        "vietnamese": "sức mạnh mềm",
        "context": "Cultural exports build national soft power."
      },
      {
        "term": "heritage preservation",
        "vietnamese": "bảo tồn di sản",
        "context": "Grants support heritage preservation projects."
      },
      {
        "term": "cultural capital",
        "vietnamese": "vốn văn hóa",
        "context": "Schools transmit cultural capital to students."
      },
      {
        "term": "regulatory standards",
        "vietnamese": "tiêu chuẩn quản lý",
        "context": "Regulatory standards can require local content."
      },
      {
        "term": "policy coherence",
        "vietnamese": "tính nhất quán chính sách",
        "context": "Policy coherence aligns tourism with culture."
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
    "essayBody": "Lengthy prison terms have intuitive appeal, yet evidence suggests that smart prevention and targeted rehabilitation reduce crime more sustainably than simply extending sentences. I therefore disagree that longer terms are the optimal tool.\n\nPunishment can deter, but its marginal benefits diminish. Beyond a threshold, harsher penalties add little to **deterrence** because many offences are impulsive or occur under substance misuse. Lengthy incarceration may achieve **incapacitation**, but it also disrupts social ties and employment, heightening **recidivism** upon release. Moreover, blanket severity can violate **proportionality**, undermining legitimacy and cooperation with law enforcement.\n\nA public safety strategy should tackle root causes and tailor responses. Well‑resourced **community policing** builds trust, gathers intelligence, and resolves conflicts before they escalate. **Early intervention**—from mentoring to addiction treatment—addresses risks while they are malleable. Modern **risk assessment** tools, used transparently, can calibrate supervision and programmes to an individual’s **criminogenic needs**, from job skills to cognitive-behavioural therapy. For suitable cases, **diversion programs** and problem‑solving courts can break cycles without the scarring effects of prison, reserving custody for serious, high‑risk offenders.\n\nNone of this implies softness. Swift, certain, and fair sanctions can outperform purely severe ones. Prisons should focus on education, treatment, and reentry planning to convert dead time into progress. Combining targeted incapacitation with prevention and rehabilitation reduces harm at lower cost and with fewer victims in the long run. Justice systems should be guided by what works, not what merely feels tough.",
    "glossary": [
      {
        "term": "deterrence",
        "vietnamese": "răn đe",
        "context": "Increasing certainty of punishment strengthens deterrence."
      },
      {
        "term": "incapacitation",
        "vietnamese": "vô hiệu hóa",
        "context": "Incapacitation removes dangerous offenders from the street."
      },
      {
        "term": "recidivism",
        "vietnamese": "tái phạm",
        "context": "Education in prison can lower recidivism."
      },
      {
        "term": "proportionality",
        "vietnamese": "tính tương xứng",
        "context": "Punishment should respect proportionality."
      },
      {
        "term": "community policing",
        "vietnamese": "cảnh sát cộng đồng",
        "context": "Community policing improves trust and reporting."
      },
      {
        "term": "early intervention",
        "vietnamese": "can thiệp sớm",
        "context": "Early intervention can defuse risk factors."
      },
      {
        "term": "risk assessment",
        "vietnamese": "đánh giá rủi ro",
        "context": "Risk assessment tools inform supervision levels."
      },
      {
        "term": "criminogenic needs",
        "vietnamese": "nhu cầu gây tội phạm",
        "context": "Addressing criminogenic needs reduces reoffending."
      },
      {
        "term": "diversion programs",
        "vietnamese": "chương trình chuyển hướng",
        "context": "Diversion programs keep low-risk people out of prison."
      },
      {
        "term": "rehabilitation",
        "vietnamese": "cải tạo, phục hồi",
        "context": "Rehabilitation targets the causes of offending."
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
    "essayBody": "Social media has blown open the gates of communication. Supporters say it decentralises news, empowering witnesses and communities to bypass editorial **gatekeeping** and highlight neglected issues. Grassroots voices can organise rapidly, and real‑time footage can counter official narratives. In this view, networks expand participation and pressure institutions to be transparent.\n\nCritics warn, however, that virality trades credibility for speed. Platforms optimise engagement through **algorithmic amplification**, rewarding outrage and novelty over nuance. This dynamic fosters **echo chambers** where users share beliefs unchallenged, and **misinformation** or orchestrated **disinformation** spreads faster than corrections. Without robust **verification protocols**, rumours masquerade as facts, while economic pressures erode **editorial independence** in some outlets. The result can be cynicism and confusion, with citizens unsure whom to trust.\n\nBoth claims hold truth. Citizen reporting is invaluable during crises and in repressive contexts, yet professional norms—source protection, context, and legal scrutiny—still matter. My view is that the solution is not to romanticise either model but to blend their strengths. Platforms should elevate authoritative sources, enforce transparency on political ads, and fund independent **fact-checking**. Newsrooms must engage audiences interactively, correct swiftly, and publish methods. Most crucially, societies need universal **media literacy** so users can interrogate claims, spot manipulation, and demand **accountability** from both platforms and publishers.\n\nA healthy information ecosystem harnesses the reach of networks while upholding standards of evidence. Only then can democracy enjoy the benefits of openness without succumbing to the chaos of unvetted claims.",
    "glossary": [
      {
        "term": "gatekeeping",
        "vietnamese": "kiểm soát đầu vào thông tin",
        "context": "Social media weakens traditional gatekeeping."
      },
      {
        "term": "algorithmic amplification",
        "vietnamese": "khuếch đại bằng thuật toán",
        "context": "Algorithmic amplification favours emotive content."
      },
      {
        "term": "echo chambers",
        "vietnamese": "buồng dội âm (tư tưởng đồng thuận)",
        "context": "Echo chambers insulate users from opposing views."
      },
      {
        "term": "misinformation",
        "vietnamese": "thông tin sai lệch (không cố ý)",
        "context": "Misinformation can spread faster than corrections."
      },
      {
        "term": "disinformation",
        "vietnamese": "thông tin giả có chủ đích",
        "context": "Disinformation campaigns target elections."
      },
      {
        "term": "verification protocols",
        "vietnamese": "quy trình xác minh",
        "context": "Strong verification protocols reduce errors."
      },
      {
        "term": "editorial independence",
        "vietnamese": "độc lập biên tập",
        "context": "Advertisers can threaten editorial independence."
      },
      {
        "term": "fact-checking",
        "vietnamese": "kiểm chứng sự thật",
        "context": "Fact-checking debunks viral hoaxes."
      },
      {
        "term": "media literacy",
        "vietnamese": "hiểu biết truyền thông",
        "context": "Media literacy helps users judge credibility."
      },
      {
        "term": "accountability",
        "vietnamese": "trách nhiệm giải trình",
        "context": "Platforms must face accountability for harms."
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
    "essayBody": "Remote work has shifted from a perk to a mainstream operating model. Its benefits are tangible. Employees gain **autonomy** over their schedules and environments, enabling deep focus when needed. Freed from commuting, they reclaim hours for family and health, and firms can hire across geographies, tapping broader talent. Teams that master **asynchronous coordination** and **output-based evaluation** often boost productivity by aligning time to task.\n\nYet the model brings trade‑offs. Blurred boundaries can fuel overwork when **boundary management** is weak, and the absence of office cues can revive **presenteeism** in digital form—being “always on” to signal commitment. Social isolation can erode cohesion and learning by osmosis, while poor home setups harm **ergonomics** and well‑being. New hires may struggle with culture and tacit knowledge during **onboarding**, and time zone friction can slow feedback loops. Without deliberate rituals, stress accumulates into **burnout**.\n\nMaximising advantages requires intentional design. Leaders should default to documentation and transparent workflows, set response norms, and protect focus time. Regular in‑person offsites and mentoring can maintain community. Stipends for equipment improve ergonomics, while clear goals anchor performance to outcomes rather than hours. Rotating meeting times and pairing core hours with flexible **flexitime** balance collaboration and autonomy.\n\nIn short, remote work can enhance both efficiency and well‑being, but only when organisations architect it carefully. The office is no longer a building; it is the set of practices that help people do their best work, wherever they are.",
    "glossary": [
      {
        "term": "autonomy",
        "vietnamese": "tự chủ",
        "context": "Remote work increases worker autonomy."
      },
      {
        "term": "asynchronous coordination",
        "vietnamese": "phối hợp không đồng bộ",
        "context": "Async tools enable asynchronous coordination across time zones."
      },
      {
        "term": "output-based evaluation",
        "vietnamese": "đánh giá dựa trên kết quả",
        "context": "Managers should adopt output-based evaluation."
      },
      {
        "term": "boundary management",
        "vietnamese": "quản lý ranh giới",
        "context": "Boundary management prevents overwork."
      },
      {
        "term": "presenteeism",
        "vietnamese": "làm việc hình thức (hiện diện cho có)",
        "context": "Digital presenteeism can drain morale."
      },
      {
        "term": "ergonomics",
        "vietnamese": "công thái học",
        "context": "Ergonomics matter for long-term health."
      },
      {
        "term": "onboarding",
        "vietnamese": "hội nhập nhân viên mới",
        "context": "Remote onboarding needs structured support."
      },
      {
        "term": "burnout",
        "vietnamese": "kiệt sức",
        "context": "Poor boundaries can lead to burnout."
      },
      {
        "term": "flexitime",
        "vietnamese": "giờ làm linh hoạt",
        "context": "Flexitime balances collaboration and focus."
      },
      {
        "term": "isolation",
        "vietnamese": "cô lập",
        "context": "Remote isolation can weaken team bonds."
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
    "essayBody": "Falling participation and confidence threaten democratic resilience. Several forces drive this decline: polarised media ecosystems, opaque decision‑making, and unequal representation that breeds cynicism. Administrative hurdles and disengagement among youth further depress turnout.\n\nReversing the trend requires rebuilding pathways for meaningful voice. First, lower the cost of participation. Automatic registration, convenient voting windows, and, where appropriate, **ranked-choice voting** can reduce spoilers and encourage more civil campaigns. Some advocate **compulsory voting**, which, when paired with easy access and modest fines, produces broader mandates and nudges people into habitual **civic engagement**.\n\nSecond, strengthen fairness and transparency. Independent commissions should draw districts to prevent **disenfranchisement** by gerrymander. Real‑time **open data** on budgets, contracts, and performance enables scrutiny, while robust **campaign finance** rules reduce outsized influence. Routine **public consultation**—citizens’ panels, participatory budgeting—invites communities into agenda‑setting, not just feedback at the end.\n\nFinally, invest in the future electorate. High‑quality **civics education** that is nonpartisan and experiential can cultivate agency and skills for deliberation. Coupled with service programs, this forms habits that last into adulthood. Ensuring **electoral integrity** through secure systems, transparent audits, and clear communication combats misinformation and rebuilds confidence.\n\nNo single reform suffices. But together, simplifying access, widening voice, and deepening accountability can reweave the civic fabric, making government feel both accessible and answerable.",
    "glossary": [
      {
        "term": "ranked-choice voting",
        "vietnamese": "bỏ phiếu xếp hạng",
        "context": "Ranked-choice voting rewards broad appeal."
      },
      {
        "term": "compulsory voting",
        "vietnamese": "bỏ phiếu bắt buộc",
        "context": "Compulsory voting can raise turnout."
      },
      {
        "term": "civic engagement",
        "vietnamese": "tham gia công dân",
        "context": "Civic engagement includes voting and volunteering."
      },
      {
        "term": "disenfranchisement",
        "vietnamese": "tước quyền bầu cử",
        "context": "Barriers can cause de facto disenfranchisement."
      },
      {
        "term": "open data",
        "vietnamese": "dữ liệu mở",
        "context": "Open data lets citizens audit spending."
      },
      {
        "term": "campaign finance",
        "vietnamese": "tài chính vận động tranh cử",
        "context": "Campaign finance rules curb undue influence."
      },
      {
        "term": "public consultation",
        "vietnamese": "tham vấn công chúng",
        "context": "Public consultation improves policy legitimacy."
      },
      {
        "term": "civics education",
        "vietnamese": "giáo dục công dân",
        "context": "Civics education builds democratic skills."
      },
      {
        "term": "electoral integrity",
        "vietnamese": "tính liêm chính bầu cử",
        "context": "Audits help ensure electoral integrity."
      },
      {
        "term": "transparency",
        "vietnamese": "minh bạch",
        "context": "Transparency underpins trust in government."
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
    "essayBody": "AI will reshape employment through both **displacement** and **augmentation**. Routine tasks in clerical work, support, and even parts of professional services are automatable, compressing certain roles while expanding demand for oversight and complex judgment. At the same time, AI can amplify human capability—drafting, summarising, forecasting—pushing the **productivity frontier** outward and spawning new occupations in data stewardship, prompt design, and systems integration.\n\nPreparation hinges on skills, safeguards, and incentives. Workers need continuous **reskilling** for analytical reasoning, collaboration, and domain‑specific digital fluency. Organisations should adopt **human-in-the-loop** designs that keep people accountable for critical decisions and ensure **explainability** for high‑stakes uses. To protect fairness, rigorous audits must test for **algorithmic bias**, while clear **safety guardrails** govern deployment in sectors like finance, healthcare, and transport.\n\nGovernments must align markets with the public interest. Tax policy and grants can accelerate diffusion to small firms, while modernised **intellectual property** rules clarify ownership of AI‑assisted outputs. Funding lifelong learning, portable benefits, and targeted wage subsidies can smooth transitions for displaced workers. Finally, robust **data governance**—covering access, privacy, and quality—will both unlock innovation and maintain trust.\n\nHandled carelessly, AI could widen inequality and erode dignity at work. Managed wisely, it can liberate people from drudgery and create better jobs. The future of work will be designed, not discovered.",
    "glossary": [
      {
        "term": "displacement",
        "vietnamese": "thay thế lao động",
        "context": "Automation may cause job displacement."
      },
      {
        "term": "augmentation",
        "vietnamese": "tăng cường năng lực",
        "context": "AI offers augmentation of human tasks."
      },
      {
        "term": "productivity frontier",
        "vietnamese": "giới hạn năng suất",
        "context": "Tools can move the productivity frontier outward."
      },
      {
        "term": "reskilling",
        "vietnamese": "đào tạo lại kỹ năng",
        "context": "Reskilling helps workers shift roles."
      },
      {
        "term": "human-in-the-loop",
        "vietnamese": "con người trong vòng lặp",
        "context": "Human-in-the-loop keeps accountability with people."
      },
      {
        "term": "explainability",
        "vietnamese": "khả năng giải thích",
        "context": "Explainability is vital in high-stakes decisions."
      },
      {
        "term": "algorithmic bias",
        "vietnamese": "thiên lệch thuật toán",
        "context": "Audits can detect algorithmic bias."
      },
      {
        "term": "safety guardrails",
        "vietnamese": "hàng rào an toàn",
        "context": "Safety guardrails limit risky deployments."
      },
      {
        "term": "intellectual property",
        "vietnamese": "sở hữu trí tuệ",
        "context": "Clarify intellectual property for AI-generated work."
      },
      {
        "term": "data governance",
        "vietnamese": "quản trị dữ liệu",
        "context": "Data governance ensures privacy and quality."
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
