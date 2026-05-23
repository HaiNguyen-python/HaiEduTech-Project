/**
 * @file chineseReadingQuestionsZh.ts
 * @description Chinese (Hanzi) translations for reading comprehension questions.
 * Keyed by `${passageId}#${questionIndex}`.
 */

export interface ZhQuestion {
  qZh: string;
  optionsZh: string[];
}

export const chineseReadingQuestionsZh: Record<string, ZhQuestion> = {
  // ===== HSK 1 =====
  "hsk1-my-family#0": { qZh: "小明家有几口人？", optionsZh: ["3口人", "4口人", "5口人", "6口人"] },
  "hsk1-my-family#1": { qZh: "爸爸做什么工作？", optionsZh: ["老师", "医生", "学生", "司机"] },
  "hsk1-my-family#2": { qZh: "谁也是学生？", optionsZh: ["妈妈", "爸爸", "姐姐", "没有人"] },

  "hsk1-my-day#0": { qZh: "今天星期几？", optionsZh: ["星期天", "星期一", "星期二", "星期五"] },
  "hsk1-my-day#1": { qZh: "作者什么时候和朋友吃饭？", optionsZh: ["早上", "中午", "下午", "晚上"] },
  "hsk1-my-day#2": { qZh: "作者晚上做什么？", optionsZh: ["去学校", "学汉语", "看书然后睡觉", "和朋友吃饭"] },

  "hsk1-buying-fruit#0": { qZh: "苹果一斤多少钱？", optionsZh: ["三块", "五块", "十块", "十三块"] },
  "hsk1-buying-fruit#1": { qZh: "作者买了几斤香蕉？", optionsZh: ["0斤", "1斤", "2斤", "3斤"] },
  "hsk1-buying-fruit#2": { qZh: "一共多少钱？", optionsZh: ["八块", "十块", "十三块", "十五块"] },

  "hsk1-my-cat#0": { qZh: "小猫叫什么名字？", optionsZh: ["妈妈", "米米", "木木", "丽丽"] },
  "hsk1-my-cat#1": { qZh: "小猫喜欢吃什么？", optionsZh: ["米饭", "鱼", "面包", "肉"] },
  "hsk1-my-cat#2": { qZh: "小猫什么时候玩？", optionsZh: ["早上", "中午", "晚上", "一整天"] },

  "hsk1-weather-today#0": { qZh: "今天天气怎么样？", optionsZh: ["下雨", "很好", "很冷", "下雪"] },
  "hsk1-weather-today#1": { qZh: "他们去了哪儿？", optionsZh: ["学校", "公园", "商店", "家"] },
  "hsk1-weather-today#2": { qZh: "他们在公园里看到了什么？", optionsZh: ["猫", "汽车", "花", "书"] },

  // ===== HSK 2 =====
  "hsk2-weekend-park#0": { qZh: "周末家人做什么？", optionsZh: ["去学校", "去公园", "在家", "去购物"] },
  "hsk2-weekend-park#1": { qZh: "作者最喜欢什么？", optionsZh: ["跑步", "跳舞", "骑自行车", "吃东西"] },
  "hsk2-weekend-park#2": { qZh: "他们几点回家？", optionsZh: ["十二点", "下午两点", "下午三点", "下午五点"] },

  "hsk2-learning-chinese#0": { qZh: "作者学汉语多长时间了？", optionsZh: ["六个月", "一年", "两年", "三年"] },
  "hsk2-learning-chinese#1": { qZh: "刚开始什么很难？", optionsZh: ["听力", "写汉字和发音", "阅读", "口语"] },
  "hsk2-learning-chinese#2": { qZh: "作者明年希望做什么？", optionsZh: ["通过HSK 5", "去中国旅游", "找工作", "搬去北京"] },

  "hsk2-restaurant#0": { qZh: "作者什么时候去的饭馆？", optionsZh: ["今天早上", "昨天晚上", "上个星期", "今天中午"] },
  "hsk2-restaurant#1": { qZh: "作者点了什么？", optionsZh: ["米饭和鱼", "牛肉面", "饺子", "汤"] },
  "hsk2-restaurant#2": { qZh: "他们觉得菜怎么样？", optionsZh: ["不好吃又贵", "好吃又便宜", "好吃但贵", "不好吃但便宜"] },

  "hsk2-birthday-party#0": { qZh: "作者过几岁生日？", optionsZh: ["10岁", "11岁", "12岁", "13岁"] },
  "hsk2-birthday-party#1": { qZh: "来了几个朋友？", optionsZh: ["3个", "4个", "5个", "6个"] },
  "hsk2-birthday-party#2": { qZh: "最喜欢的礼物是什么？", optionsZh: ["玩具", "一本中文书", "蛋糕", "衣服"] },

  "hsk2-my-hometown#0": { qZh: "作者的家乡是什么样的？", optionsZh: ["大又热闹", "小但人很热情", "人很多", "离城市很远"] },
  "hsk2-my-hometown#1": { qZh: "作者家附近有什么？", optionsZh: ["一座山", "一条小河", "一所学校", "一家商店"] },
  "hsk2-my-hometown#2": { qZh: "作者多久回家一次？", optionsZh: ["每个月", "每年", "每五年", "从不"] },

  // ===== HSK 3 =====
  "hsk3-trip-beijing#0": { qZh: "作者在飞机上感觉怎么样？", optionsZh: ["无聊", "又兴奋又紧张", "又累又困", "难过"] },
  "hsk3-trip-beijing#1": { qZh: "第二天他们做了什么？", optionsZh: ["去了天安门", "爬了长城", "去购物", "坐飞机回家"] },
  "hsk3-trip-beijing#2": { qZh: "作者买了什么礼物？", optionsZh: ["茶", "丝绸", "北京烤鸭", "明信片"] },

  "hsk3-online-shopping#0": { qZh: "网上购物的一个优点是什么？", optionsZh: ["比商店便宜", "颜色总是完美", "送货总是很快", "不需要手机"] },
  "hsk3-online-shopping#1": { qZh: "文章中提到了什么缺点？", optionsZh: ["价格高", "颜色或大小和图片不一样", "太慢", "很难下单"] },
  "hsk3-online-shopping#2": { qZh: "作者建议什么？", optionsZh: ["别网购", "先看别人的评价", "只在商店买", "总是买最便宜的"] },

  "hsk3-healthy-life#0": { qZh: "应该少吃什么？", optionsZh: ["水果", "蔬菜", "肉和甜食", "米饭"] },
  "hsk3-healthy-life#1": { qZh: "老人适合什么运动？", optionsZh: ["跑步", "游泳", "走路或者打太极拳", "踢足球"] },
  "hsk3-healthy-life#2": { qZh: "第三个建议是什么？", optionsZh: ["少睡觉", "多吃肉", "保持好心情", "一个人运动"] },

  "hsk3-learning-cook#0": { qZh: "作者为什么不再吃外卖？", optionsZh: ["太凉", "又贵又不健康", "太慢", "不好吃"] },
  "hsk3-learning-cook#1": { qZh: "作者从什么菜开始学？", optionsZh: ["饺子", "西红柿炒鸡蛋", "牛肉面", "米饭"] },
  "hsk3-learning-cook#2": { qZh: "现在能做几个菜？", optionsZh: ["几个", "十几个", "大约五十个", "上百个"] },

  "hsk3-pets-and-people#0": { qZh: "最受欢迎的宠物是什么？", optionsZh: ["鸟和鱼", "猫和狗", "兔子", "仓鼠"] },
  "hsk3-pets-and-people#1": { qZh: "年轻人把宠物当作什么？", optionsZh: ["玩具", "投资", "家人", "工人"] },
  "hsk3-pets-and-people#2": { qZh: "文章的主要意思是什么？", optionsZh: ["不要养宠物", "爱就要负责", "宠物很贵", "猫比狗好"] },

  // ===== HSK 4 =====
  "hsk4-environment#0": { qZh: "是什么让环境问题更严重？", optionsZh: ["战争", "经济快速发展", "人口减少", "天气寒冷"] },
  "hsk4-environment#1": { qZh: "保护环境是谁的责任？", optionsZh: ["只是政府", "只是企业", "每个人", "只是科学家"] },
  "hsk4-environment#2": { qZh: "哪一项没有被建议？", optionsZh: ["坐公共交通", "垃圾分类", "使用一次性用品", "少开车"] },

  "hsk4-friendship-distance#0": { qZh: "小李毕业后去了哪里？", optionsZh: ["北京", "上海", "广州", "老家"] },
  "hsk4-friendship-distance#1": { qZh: "她们为什么联系变少了？", optionsZh: ["吵架了", "都越来越忙", "微信不能用了", "她搬到了国外"] },
  "hsk4-friendship-distance#2": { qZh: "文章的主要意思是什么？", optionsZh: ["朋友必须常见面", "真正的友谊不在于距离", "写信比微信好", "城市不利于友谊"] },

  "hsk4-job-interview#0": { qZh: "作者提前多久到的公司？", optionsZh: ["十分钟", "三十分钟", "一个小时", "两个小时"] },
  "hsk4-job-interview#1": { qZh: "面试官先问了什么？", optionsZh: ["期望薪水", "自我介绍", "爱好", "未来计划"] },
  "hsk4-job-interview#2": { qZh: "面试官给了什么建议？", optionsZh: ["更努力工作", "相信自己", "说慢一点", "多读书"] },

  "hsk4-social-media#0": { qZh: "文章提到了什么负面影响？", optionsZh: ["视力问题", "觉得自己不够好且没精神", "花太多钱", "忘记朋友"] },
  "hsk4-social-media#1": { qZh: "作者认为手机是什么？", optionsZh: ["玩具", "敌人", "工具", "老师"] },
  "hsk4-social-media#2": { qZh: "作者给了什么建议？", optionsZh: ["删掉所有应用", "永远不上网", "留一些不看手机的时间", "只用微信"] },

  "hsk4-volunteer-trip#0": { qZh: "志愿活动在哪里进行？", optionsZh: ["城市的学校", "山区的一所小学", "图书馆", "医院"] },
  "hsk4-volunteer-trip#1": { qZh: "作者教孩子们什么？", optionsZh: ["数学和音乐", "英语和画画", "汉语和体育", "做饭"] },
  "hsk4-volunteer-trip#2": { qZh: "作者最后明白了什么？", optionsZh: ["城市不好", "帮助别人也是在治愈自己", "孩子不需要上学", "教书很容易"] },

  // ===== HSK 5 =====
  "hsk5-traditional-culture#0": { qZh: "传统文化面临什么危险？", optionsZh: ["变得太流行", "被遗忘", "被禁止", "变得昂贵"] },
  "hsk5-traditional-culture#1": { qZh: "根据文章，春节表达了什么？", optionsZh: ["财富与权力", "感恩与希望", "只是宗教", "政治"] },
  "hsk5-traditional-culture#2": { qZh: "哪一项没有被建议？", optionsZh: ["学校开设相关课程", "媒体生动地介绍", "只放在博物馆里", "年轻人主动分享"] },

  "hsk5-ai-future#0": { qZh: "AI怎样帮助医生？", optionsZh: ["完全取代他们", "更准确地诊断疾病", "给他们更高的工资", "减少病人数量"] },
  "hsk5-ai-future#1": { qZh: "关于AI的一个担忧是什么？", optionsZh: ["费用太高", "可能取代工作并降低思考能力", "太慢", "难以使用"] },
  "hsk5-ai-future#2": { qZh: "作者推荐什么态度？", optionsZh: ["害怕AI", "抗拒AI", "与AI合作并不断学习", "忽视AI"] },

  "hsk5-mountain-village#0": { qZh: "十年前村子为什么很安静？", optionsZh: ["疾病", "年轻人都去了城市", "战争", "地震"] },
  "hsk5-mountain-village#1": { qZh: "设计师姑娘先做了什么？", optionsZh: ["盖了一所学校", "把老房子改造成了客栈", "开了一家工厂", "写了一本书"] },
  "hsk5-mountain-village#2": { qZh: "故事的寓意是什么？", optionsZh: ["城市总是更好", "付出能让偏远的地方重新焕发光彩", "旅游有害", "老房子没用"] },

  "hsk5-slow-living#0": { qZh: "文章描述了什么问题？", optionsZh: ["人们工作太少", "现代生活太快", "城市太安静", "茶太贵"] },
  "hsk5-slow-living#1": { qZh: "作者眼中的「慢生活」是什么？", optionsZh: ["懒惰", "辞掉工作", "为自己留一个能呼吸的角落", "多睡觉"] },
  "hsk5-slow-living#2": { qZh: "结尾的话暗示什么？", optionsZh: ["时间抛弃了我们", "我们跑得太快错过了时间", "时间就是金钱", "时间不等人"] },

  "hsk5-language-power#0": { qZh: "语言被比作什么？", optionsZh: ["一条路", "一扇窗户", "一条河", "一本书"] },
  "hsk5-language-power#1": { qZh: "中国人如何表达情感？", optionsZh: ["非常大声", "含蓄地，藏在沉默与微笑之间", "通过写信", "通过音乐"] },
  "hsk5-language-power#2": { qZh: "最后的比喻是什么？", optionsZh: ["建一堵墙", "在心里种下另一棵树", "买新衣服", "爬山"] },
};
