/**
 * @file hskkPromptsExpansion.ts
 * @description Mở rộng bộ đề HSKK Speaking - bổ sung số lượng câu cho cả 3 cấp,
 * thêm Part 3 cho HSKK Sơ cấp (2 câu trả lời câu hỏi mở), và bổ sung
 * Part 3 cho Trung cấp (thuật lại đoạn văn).
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech. All rights reserved.
 */

import type { HskkPrompt } from "./hskkPrompts";

// ============ BỔ SUNG HSKK SƠ CẤP ============
const beginnerExtra: HskkPrompt[] = [
  // Part 1 thêm 10 câu
  { id: "b1-16", level: "beginner", part: 1, hanzi: "我每个星期六去图书馆看书。", pinyin: "Wǒ měi gè xīngqīliù qù túshūguǎn kàn shū.", vi: "Mỗi thứ bảy tôi đến thư viện đọc sách.", prepSeconds: 0, answerSeconds: 5 },
  { id: "b1-17", level: "beginner", part: 1, hanzi: "请问,银行在哪儿?", pinyin: "Qǐngwèn, yínháng zài nǎr?", vi: "Xin hỏi, ngân hàng ở đâu?", prepSeconds: 0, answerSeconds: 5 },
  { id: "b1-18", level: "beginner", part: 1, hanzi: "我感冒了,头有点儿疼。", pinyin: "Wǒ gǎnmào le, tóu yǒu diǎnr téng.", vi: "Tôi bị cảm, đầu hơi đau.", prepSeconds: 0, answerSeconds: 5 },
  { id: "b1-19", level: "beginner", part: 1, hanzi: "这件衣服太贵了,便宜一点儿吧。", pinyin: "Zhè jiàn yīfu tài guì le, piányi yìdiǎnr ba.", vi: "Bộ quần áo này đắt quá, rẻ hơn chút đi.", prepSeconds: 0, answerSeconds: 5 },
  { id: "b1-20", level: "beginner", part: 1, hanzi: "服务员,请给我一杯水。", pinyin: "Fúwùyuán, qǐng gěi wǒ yì bēi shuǐ.", vi: "Phục vụ ơi, cho tôi một cốc nước.", prepSeconds: 0, answerSeconds: 5 },
  { id: "b1-21", level: "beginner", part: 1, hanzi: "我哥哥比我高两公分。", pinyin: "Wǒ gēge bǐ wǒ gāo liǎng gōngfēn.", vi: "Anh trai tôi cao hơn tôi hai phân.", prepSeconds: 0, answerSeconds: 5 },
  { id: "b1-22", level: "beginner", part: 1, hanzi: "我的手机不见了,你看见了吗?", pinyin: "Wǒ de shǒujī bú jiàn le, nǐ kànjiàn le ma?", vi: "Điện thoại của tôi không thấy nữa, bạn có thấy không?", prepSeconds: 0, answerSeconds: 5 },
  { id: "b1-23", level: "beginner", part: 1, hanzi: "下雨了,记得带伞。", pinyin: "Xià yǔ le, jìde dài sǎn.", vi: "Trời mưa rồi, nhớ mang ô nhé.", prepSeconds: 0, answerSeconds: 5 },
  { id: "b1-24", level: "beginner", part: 1, hanzi: "我们一起去公园散步,好吗?", pinyin: "Wǒmen yìqǐ qù gōngyuán sànbù, hǎo ma?", vi: "Chúng ta cùng đi dạo công viên, được không?", prepSeconds: 0, answerSeconds: 5 },
  { id: "b1-25", level: "beginner", part: 1, hanzi: "我会做菜,但是做得不太好。", pinyin: "Wǒ huì zuò cài, dànshì zuò de bú tài hǎo.", vi: "Tôi biết nấu ăn, nhưng nấu không ngon lắm.", prepSeconds: 0, answerSeconds: 5 },

  // Part 2 thêm 8 câu
  { id: "b2-11", level: "beginner", part: 2, hanzi: "你每天几点睡觉?", pinyin: "Nǐ měitiān jǐ diǎn shuìjiào?", vi: "Mỗi ngày bạn đi ngủ lúc mấy giờ?", prepSeconds: 10, answerSeconds: 15, hint: "Trả lời: 我每天...点睡觉。" },
  { id: "b2-12", level: "beginner", part: 2, hanzi: "你喜欢什么季节?为什么?", pinyin: "Nǐ xǐhuān shénme jìjié? Wèishéme?", vi: "Bạn thích mùa nào? Vì sao?", prepSeconds: 10, answerSeconds: 20, hint: "Nêu mùa + 1-2 lý do (thời tiết, hoạt động)." },
  { id: "b2-13", level: "beginner", part: 2, hanzi: "你家附近有什么?", pinyin: "Nǐ jiā fùjìn yǒu shénme?", vi: "Gần nhà bạn có những gì?", prepSeconds: 10, answerSeconds: 20 },
  { id: "b2-14", level: "beginner", part: 2, hanzi: "你常常和谁一起吃饭?", pinyin: "Nǐ chángcháng hé shéi yìqǐ chīfàn?", vi: "Bạn thường ăn cơm với ai?", prepSeconds: 10, answerSeconds: 15 },
  { id: "b2-15", level: "beginner", part: 2, hanzi: "你喜欢看什么样的电影?", pinyin: "Nǐ xǐhuān kàn shénme yàng de diànyǐng?", vi: "Bạn thích xem loại phim gì?", prepSeconds: 10, answerSeconds: 20 },
  { id: "b2-16", level: "beginner", part: 2, hanzi: "你学过哪些外语?", pinyin: "Nǐ xué guò nǎxiē wàiyǔ?", vi: "Bạn đã học những ngoại ngữ nào?", prepSeconds: 10, answerSeconds: 20 },
  { id: "b2-17", level: "beginner", part: 2, hanzi: "请说一说你今天做了什么。", pinyin: "Qǐng shuō yi shuō nǐ jīntiān zuò le shénme.", vi: "Hãy kể hôm nay bạn đã làm những gì.", prepSeconds: 10, answerSeconds: 25, hint: "Sáng / trưa / chiều - dùng 然后, 后来." },
  { id: "b2-18", level: "beginner", part: 2, hanzi: "你想去中国哪个城市旅游?", pinyin: "Nǐ xiǎng qù Zhōngguó nǎ ge chéngshì lǚyóu?", vi: "Bạn muốn đi du lịch thành phố nào ở Trung Quốc?", prepSeconds: 10, answerSeconds: 20 },

  // Part 3 - thêm mới cho Sơ cấp (2 câu nói liên tục ~30s)
  { id: "b3-1", level: "beginner", part: 3, hanzi: "请说一说你的学校。", pinyin: "Qǐng shuō yi shuō nǐ de xuéxiào.", vi: "Hãy nói về trường học của bạn.", prepSeconds: 10, answerSeconds: 30, hint: "Tên trường + vị trí + 1-2 điểm bạn thích." },
  { id: "b3-2", level: "beginner", part: 3, hanzi: "介绍一下你最好的朋友。", pinyin: "Jièshào yíxià nǐ zuì hǎo de péngyǒu.", vi: "Hãy giới thiệu về người bạn thân nhất của bạn.", prepSeconds: 10, answerSeconds: 30, hint: "Tên + tuổi + tính cách + lý do thân nhau." },
  { id: "b3-3", level: "beginner", part: 3, hanzi: "说说你一天的安排。", pinyin: "Shuō shuo nǐ yì tiān de ānpái.", vi: "Hãy kể lịch sinh hoạt một ngày của bạn.", prepSeconds: 10, answerSeconds: 30, hint: "Dùng 早上, 中午, 下午, 晚上." },
  { id: "b3-4", level: "beginner", part: 3, hanzi: "你喜欢什么运动?请说一说。", pinyin: "Nǐ xǐhuān shénme yùndòng? Qǐng shuō yi shuō.", vi: "Bạn thích môn thể thao nào? Hãy nói về nó.", prepSeconds: 10, answerSeconds: 30, hint: "Môn + tần suất + cảm giác." },
];

// ============ BỔ SUNG HSKK TRUNG CẤP ============
const intermediateExtra: HskkPrompt[] = [
  // Part 1 thêm 6 câu
  { id: "i1-11", level: "intermediate", part: 1, hanzi: "他从小就对音乐感兴趣,现在已经成为了一名出色的钢琴家。", pinyin: "Tā cóng xiǎo jiù duì yīnyuè gǎn xìngqù, xiànzài yǐjīng chéngwéi le yì míng chūsè de gāngqínjiā.", vi: "Anh ấy thích nhạc từ nhỏ, nay đã trở thành một nghệ sĩ piano xuất sắc.", prepSeconds: 0, answerSeconds: 10 },
  { id: "i1-12", level: "intermediate", part: 1, hanzi: "如果你想把汉语说得更地道,就要多和中国朋友交流。", pinyin: "Rúguǒ nǐ xiǎng bǎ Hànyǔ shuō de gèng dìdao, jiù yào duō hé Zhōngguó péngyǒu jiāoliú.", vi: "Nếu muốn nói tiếng Hán bản địa hơn, bạn nên giao lưu nhiều với bạn Trung Quốc.", prepSeconds: 0, answerSeconds: 10 },
  { id: "i1-13", level: "intermediate", part: 1, hanzi: "近年来,越来越多的年轻人选择创业,而不是去大公司工作。", pinyin: "Jìnnián lái, yuè lái yuè duō de niánqīng rén xuǎnzé chuàngyè, ér bú shì qù dà gōngsī gōngzuò.", vi: "Những năm gần đây, ngày càng nhiều người trẻ chọn khởi nghiệp thay vì làm cho công ty lớn.", prepSeconds: 0, answerSeconds: 10 },
  { id: "i1-14", level: "intermediate", part: 1, hanzi: "健康的生活方式包括合理饮食、适量运动和充足睡眠。", pinyin: "Jiànkāng de shēnghuó fāngshì bāokuò hélǐ yǐnshí, shìliàng yùndòng hé chōngzú shuìmián.", vi: "Lối sống lành mạnh gồm ăn uống hợp lý, vận động vừa phải và ngủ đủ giấc.", prepSeconds: 0, answerSeconds: 10 },
  { id: "i1-15", level: "intermediate", part: 1, hanzi: "旅游不仅能让人开阔眼界,也能让人放松心情。", pinyin: "Lǚyóu bùjǐn néng ràng rén kāikuò yǎnjiè, yě néng ràng rén fàngsōng xīnqíng.", vi: "Du lịch không chỉ giúp mở mang tầm mắt mà còn giúp thư giãn tinh thần.", prepSeconds: 0, answerSeconds: 10 },
  { id: "i1-16", level: "intermediate", part: 1, hanzi: "在团队合作中,沟通和信任比个人能力更重要。", pinyin: "Zài tuánduì hézuò zhōng, gōutōng hé xìnrèn bǐ gèrén nénglì gèng zhòngyào.", vi: "Trong làm việc nhóm, giao tiếp và tin tưởng quan trọng hơn năng lực cá nhân.", prepSeconds: 0, answerSeconds: 10 },

  // Part 2 thêm 6 câu
  { id: "i2-11", level: "intermediate", part: 2, hanzi: "请谈谈你理想中的工作环境。", pinyin: "Qǐng tántan nǐ lǐxiǎng zhōng de gōngzuò huánjìng.", vi: "Hãy nói về môi trường làm việc lý tưởng của bạn.", prepSeconds: 10, answerSeconds: 60, hint: "Đồng nghiệp, không gian, văn hoá công ty." },
  { id: "i2-12", level: "intermediate", part: 2, hanzi: "你认为读书和旅行哪个更重要?", pinyin: "Nǐ rènwéi dúshū hé lǚxíng nǎ ge gèng zhòngyào?", vi: "Bạn cho rằng đọc sách và du lịch, cái nào quan trọng hơn?", prepSeconds: 10, answerSeconds: 60 },
  { id: "i2-13", level: "intermediate", part: 2, hanzi: "请说一说你学过的让你印象最深的一节课。", pinyin: "Qǐng shuō yi shuō nǐ xué guò de ràng nǐ yìnxiàng zuì shēn de yì jié kè.", vi: "Hãy kể một tiết học để lại ấn tượng sâu sắc nhất với bạn.", prepSeconds: 10, answerSeconds: 60 },
  { id: "i2-14", level: "intermediate", part: 2, hanzi: "你怎么平衡工作和生活?", pinyin: "Nǐ zěnme pínghéng gōngzuò hé shēnghuó?", vi: "Bạn cân bằng công việc và cuộc sống thế nào?", prepSeconds: 10, answerSeconds: 60 },
  { id: "i2-15", level: "intermediate", part: 2, hanzi: "你觉得社交媒体对人际关系有什么影响?", pinyin: "Nǐ juéde shèjiāo méitǐ duì rénjì guānxi yǒu shénme yǐngxiǎng?", vi: "Bạn thấy mạng xã hội tác động thế nào tới quan hệ giữa người với người?", prepSeconds: 10, answerSeconds: 60, hint: "Tích cực + tiêu cực + ví dụ." },
  { id: "i2-16", level: "intermediate", part: 2, hanzi: "请讲一次你克服困难的经历。", pinyin: "Qǐng jiǎng yí cì nǐ kèfú kùnnan de jīnglì.", vi: "Hãy kể một lần bạn vượt qua khó khăn.", prepSeconds: 10, answerSeconds: 60, hint: "Hoàn cảnh - hành động - kết quả - bài học." },

  // Part 3 thêm mới cho Trung cấp (thuật lại / nêu quan điểm dài ~90s)
  { id: "i3-1", level: "intermediate", part: 3, hanzi: "请讲一个你看过的电影或读过的书,并说说你的感想。", pinyin: "Qǐng jiǎng yí gè nǐ kàn guò de diànyǐng huò dú guò de shū, bìng shuō shuo nǐ de gǎnxiǎng.", vi: "Hãy kể một bộ phim đã xem hoặc cuốn sách đã đọc và nêu cảm nghĩ.", prepSeconds: 15, answerSeconds: 90, hint: "Giới thiệu - nội dung chính - thông điệp - cảm nghĩ cá nhân." },
  { id: "i3-2", level: "intermediate", part: 3, hanzi: "请说一说你心目中的好老师是什么样的。", pinyin: "Qǐng shuō yi shuō nǐ xīnmù zhōng de hǎo lǎoshī shì shénme yàng de.", vi: "Hãy nói về hình mẫu thầy cô tốt trong lòng bạn.", prepSeconds: 15, answerSeconds: 90, hint: "3 đặc điểm + ví dụ thực tế." },
  { id: "i3-3", level: "intermediate", part: 3, hanzi: "请谈谈你对\"活到老,学到老\"这句话的理解。", pinyin: "Qǐng tántan nǐ duì \"huó dào lǎo, xué dào lǎo\" zhè jù huà de lǐjiě.", vi: "Hãy nói cách bạn hiểu câu \"học suốt đời\".", prepSeconds: 15, answerSeconds: 90 },
];

// ============ BỔ SUNG HSKK CAO CẤP ============
const advancedExtra: HskkPrompt[] = [
  // Part 1 thêm 3 đoạn
  { id: "a1-4", level: "advanced", part: 1, hanzi: "在信息爆炸的时代,如何辨别真假信息已经成为每个现代人必备的能力。", pinyin: "Zài xìnxī bàozhà de shídài, rúhé biànbié zhēn jiǎ xìnxī yǐjīng chéngwéi měi gè xiàndài rén bìbèi de nénglì.", vi: "Trong thời đại bùng nổ thông tin, biết phân biệt thông tin thật giả đã trở thành kỹ năng thiết yếu của mỗi người hiện đại.", prepSeconds: 10, answerSeconds: 30, hint: "Tóm tắt + đưa 1 ví dụ minh hoạ." },
  { id: "a1-5", level: "advanced", part: 1, hanzi: "城市化进程在带来经济繁荣的同时,也加剧了交通拥堵、环境污染等社会问题。", pinyin: "Chéngshìhuà jìnchéng zài dài lái jīngjì fánróng de tóngshí, yě jiājù le jiāotōng yōngdǔ, huánjìng wūrǎn děng shèhuì wèntí.", vi: "Quá trình đô thị hoá vừa mang lại phồn vinh kinh tế vừa làm trầm trọng thêm các vấn đề như kẹt xe, ô nhiễm môi trường.", prepSeconds: 10, answerSeconds: 30 },
  { id: "a1-6", level: "advanced", part: 1, hanzi: "终身学习已经不再是一种选择,而是当今职场人保持竞争力的必要条件。", pinyin: "Zhōngshēn xuéxí yǐjīng bú zài shì yì zhǒng xuǎnzé, ér shì dāngjīn zhíchǎng rén bǎochí jìngzhēnglì de bìyào tiáojiàn.", vi: "Học tập suốt đời không còn là lựa chọn, mà là điều kiện cần thiết để người đi làm giữ vững khả năng cạnh tranh.", prepSeconds: 10, answerSeconds: 30 },

  // Part 2 thêm 4 đề luận
  { id: "a2-7", level: "advanced", part: 2, hanzi: "请就\"人工智能会不会取代人类的工作\"发表你的看法。", pinyin: "Qǐng jiù \"réngōng zhìnéng huì bu huì qǔdài rénlèi de gōngzuò\" fābiǎo nǐ de kànfǎ.", vi: "Hãy nêu quan điểm về việc \"AI có thay thế công việc của con người không\".", prepSeconds: 30, answerSeconds: 150, hint: "Quan điểm rõ + 2 lý do + ví dụ ngành nghề + kết luận." },
  { id: "a2-8", level: "advanced", part: 2, hanzi: "请谈谈你认为父母在孩子成长过程中应该扮演什么样的角色。", pinyin: "Qǐng tántan nǐ rènwéi fùmǔ zài háizi chéngzhǎng guòchéng zhōng yīnggāi bànyǎn shénme yàng de juésè.", vi: "Hãy nói vai trò mà bạn cho rằng cha mẹ nên đảm nhận trong quá trình trưởng thành của con.", prepSeconds: 30, answerSeconds: 150 },
  { id: "a2-9", level: "advanced", part: 2, hanzi: "请就\"金钱与幸福的关系\"谈谈你的观点。", pinyin: "Qǐng jiù \"jīnqián yǔ xìngfú de guānxi\" tántan nǐ de guāndiǎn.", vi: "Hãy nêu quan điểm về \"mối quan hệ giữa tiền bạc và hạnh phúc\".", prepSeconds: 30, answerSeconds: 150 },
  { id: "a2-10", level: "advanced", part: 2, hanzi: "请谈谈跨文化交流的重要性以及面临的挑战。", pinyin: "Qǐng tántan kuà wénhuà jiāoliú de zhòngyàoxìng yǐjí miànlín de tiǎozhàn.", vi: "Hãy nói về tầm quan trọng và thách thức của giao lưu xuyên văn hoá.", prepSeconds: 30, answerSeconds: 150 },
];

export const HSKK_PROMPTS_EXTRA: HskkPrompt[] = [
  ...beginnerExtra,
  ...intermediateExtra,
  ...advancedExtra,
];
