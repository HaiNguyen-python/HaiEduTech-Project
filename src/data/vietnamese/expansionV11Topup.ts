/**
 * @file expansionV11Topup.ts
 * @description Giai đoạn 1 của đợt mở rộng V11 - chuẩn hoá 26 bài đang thiếu chuẩn
 * (tối thiểu 10 từ vựng có ví dụ song ngữ và 5 câu hỏi trắc nghiệm có giải thích).
 * Giữ nguyên toàn bộ id bài học nên tiến độ đã lưu của học viên không bị ảnh hưởng.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { folkloreLanguageModules } from "./folkloreLessons";
import { vietnameseLessonsExpansionModules } from "./lessonsExpansion";
import type { VietnameseLesson, VietnameseQuizQuestion, VietnameseVocabEntry } from "./types";

const lessonIndex = new Map<string, VietnameseLesson>();
[...folkloreLanguageModules, ...vietnameseLessonsExpansionModules].forEach((mod) =>
  mod.lessons.forEach((lesson) => lessonIndex.set(lesson.id, lesson)),
);

const v = (
  word: string,
  meaning: string,
  meaningEn: string,
  example: string,
  exampleEn: string,
  partOfSpeech?: string,
): VietnameseVocabEntry => ({ word, meaning, meaningEn, example, exampleEn, partOfSpeech });

const q = (
  question: string,
  questionEn: string,
  options: string[],
  answer: number,
  explanation: string,
  explanationEn: string,
): VietnameseQuizQuestion => ({ question, questionEn, options, answer, explanation, explanationEn });

/** Thêm từ vựng và câu hỏi mới, bỏ qua mục đã tồn tại để không tạo trùng lặp. */
const topUp = (id: string, vocab: VietnameseVocabEntry[], quiz: VietnameseQuizQuestion[]) => {
  const lesson = lessonIndex.get(id);
  if (!lesson) return;
  const words = new Set(lesson.vocabulary.map((entry) => entry.word.toLowerCase()));
  vocab.forEach((entry) => {
    if (words.has(entry.word.toLowerCase())) return;
    words.add(entry.word.toLowerCase());
    lesson.vocabulary.push(entry);
  });
  const questions = new Set(lesson.quiz.map((item) => item.question.toLowerCase()));
  quiz.forEach((item) => {
    if (questions.has(item.question.toLowerCase())) return;
    questions.add(item.question.toLowerCase());
    lesson.quiz.push(item);
  });
};

/* ════════════════════════════════════════════════════════════════════════════
 * FOLKLORE - vn-folklore (12 bài, 10 bài cần bổ sung)
 * ════════════════════════════════════════════════════════════════════════════ */

topUp(
  "vn-folk-1",
  [],
  [
    q("Ca dao về gia đình thường dùng hình ảnh nào để nói về mẹ?", "Which image do family folk verses use for a mother?", ["Nước trong nguồn", "Núi Thái Sơn", "Biển cả", "Rừng sâu"], 0, "Cha được ví với núi Thái Sơn, mẹ được ví với nước trong nguồn chảy ra.", "The father is likened to Mount Thai Son, the mother to spring water flowing out."),
    q("'Hiếu thảo' nghĩa là gì?", "What does 'hiếu thảo' mean?", ["Giàu có", "Kính yêu và chăm sóc cha mẹ", "Thông minh", "Chăm chỉ làm việc"], 1, "Hiếu thảo là lòng kính yêu, biết ơn và chăm sóc cha mẹ.", "'Hiếu thảo' is filial love, gratitude and care for one's parents."),
    q("Câu 'Một lòng thờ mẹ kính cha' nhấn mạnh điều gì?", "What does 'Một lòng thờ mẹ kính cha' emphasise?", ["Sự trọn vẹn, không thay đổi", "Sự giàu sang", "Sự nổi tiếng", "Sự may mắn"], 0, "'Một lòng' nghĩa là trọn vẹn, kiên định trong lòng hiếu kính.", "'Một lòng' means whole-hearted, unwavering devotion."),
    q("Ca dao gia đình chủ yếu được truyền lại bằng cách nào?", "How were family folk verses mainly passed down?", ["Sách giáo khoa", "Truyền miệng qua các thế hệ", "Báo chí", "Phim ảnh"], 1, "Ca dao là văn học dân gian, được truyền miệng từ đời này sang đời khác.", "Folk verse is oral literature handed down by word of mouth."),
  ],
);

topUp(
  "vn-folk-2",
  [],
  [
    q("'Không thầy đố mày làm nên' đề cao ai?", "Whom does 'Không thầy đố mày làm nên' honour?", ["Cha mẹ", "Người thầy", "Bạn bè", "Nhà vua"], 1, "Câu tục ngữ khẳng định vai trò của người thầy trong sự thành công của học trò.", "The proverb affirms the teacher's role in a student's success."),
    q("'Tôn sư trọng đạo' nghĩa là gì?", "What does 'tôn sư trọng đạo' mean?", ["Kính thầy, trọng đạo lý", "Giữ của cải", "Thích đi xa", "Học thuộc lòng"], 0, "Tôn sư trọng đạo là kính trọng người dạy và coi trọng đạo lý học tập.", "It means honouring teachers and valuing the moral path of learning."),
    q("'Học một sàng khôn' trong câu tục ngữ chỉ điều gì?", "What does 'một sàng khôn' refer to?", ["Một cái sàng gạo", "Rất nhiều hiểu biết", "Một quyển sách", "Một bữa ăn"], 1, "'Sàng khôn' là cách nói hình ảnh cho lượng hiểu biết lớn thu được từ trải nghiệm.", "'A winnowing tray of wisdom' figuratively means a great deal of knowledge gained from experience."),
    q("Tục ngữ về học tập thường có đặc điểm nào?", "What is typical of proverbs about learning?", ["Rất dài và phức tạp", "Ngắn gọn, có nhịp và dễ nhớ", "Chỉ dùng trong thơ", "Không có hình ảnh"], 1, "Tục ngữ ngắn gọn, giàu nhịp điệu và hình ảnh nên dễ nhớ, dễ truyền miệng.", "Proverbs are short, rhythmic and image-rich, so they are easy to remember and repeat."),
  ],
);

topUp(
  "vn-folk-3",
  [],
  [
    q("'Bến' trong ca dao tình yêu tượng trưng cho ai?", "In love folk verse, whom does 'bến' (wharf) symbolise?", ["Người con gái chờ đợi", "Người lái thuyền", "Người cha", "Người khách lạ"], 0, "Thuyền chỉ người con trai đi xa, bến chỉ người con gái ở lại chờ đợi.", "The boat stands for the man who travels, the wharf for the woman who waits."),
    q("'Chung thủy' nghĩa là gì?", "What does 'chung thủy' mean?", ["Hay thay đổi", "Trước sau như một trong tình cảm", "Rất giàu", "Sống một mình"], 1, "Chung thủy là giữ tình cảm trước sau như một.", "'Chung thủy' means remaining faithful from beginning to end."),
    q("'Tương tư' miêu tả trạng thái nào?", "What state does 'tương tư' describe?", ["Nhớ nhau da diết", "Giận nhau", "Quên nhau", "Chia tay"], 0, "Tương tư là nhớ nhau, thường dùng cho tình cảm nam nữ.", "'Tương tư' is lovesick longing between two people."),
    q("Vì sao ca dao tình yêu hay dùng ẩn dụ?", "Why does love folk verse rely on metaphor?", ["Vì bắt buộc phải có", "Vì nói tình cảm trực tiếp bị coi là không tế nhị", "Vì thiếu từ vựng", "Vì dễ dịch"], 1, "Trong xã hội xưa, bày tỏ tình cảm trực tiếp bị coi là thiếu tế nhị nên người ta dùng hình ảnh thuyền, bến, trăng, gió.", "In traditional society, direct declarations were seen as indelicate, so images like boat, wharf, moon and wind were used."),
  ],
);

topUp(
  "vn-folk-4",
  [],
  [
    q("'Ráng mỡ gà, có nhà thì giữ' báo hiệu điều gì?", "What does 'Ráng mỡ gà, có nhà thì giữ' warn about?", ["Trời sẽ nắng lâu", "Sắp có bão", "Sắp có tuyết", "Sắp có sương mù"], 1, "Ráng vàng như mỡ gà là dấu hiệu sắp có bão, cần giữ gìn nhà cửa.", "A yellow, fatty-looking sky signals a coming storm, so houses must be secured."),
    q("Tục ngữ thiên nhiên chủ yếu phục vụ nghề nào?", "Which occupation do weather proverbs mainly serve?", ["Nghề nông", "Nghề buôn vàng", "Nghề dạy học", "Nghề thợ may"], 0, "Người Việt làm nông nên quan sát thời tiết để gieo trồng và thu hoạch.", "Vietnamese farming life required weather observation for sowing and harvest."),
    q("'Dự báo' nghĩa là gì?", "What does 'dự báo' mean?", ["Báo trước điều sắp xảy ra", "Nhớ lại việc cũ", "Làm ruộng", "Kể chuyện"], 0, "Dự báo là báo trước về điều sắp xảy ra, ví dụ dự báo thời tiết.", "'Dự báo' means to forecast something that is about to happen."),
    q("Chuồn chuồn bay cao thì thời tiết thế nào?", "If dragonflies fly high, what is the weather?", ["Mưa to", "Râm mát", "Nắng", "Bão"], 2, "Câu đầy đủ là 'Chuồn chuồn bay thấp thì mưa, bay cao thì nắng, bay vừa thì râm'.", "The full proverb says low flight means rain, high flight means sun, middling flight means overcast."),
  ],
);

topUp(
  "vn-folk-5",
  [],
  [
    q("Truyện cổ tích Việt Nam thường kết thúc thế nào?", "How do Vietnamese fairy tales usually end?", ["Người thiện được đền đáp", "Người ác thắng", "Không có kết thúc", "Tất cả đều thất bại"], 0, "Cổ tích Việt Nam theo mô hình ở hiền gặp lành, ác giả ác báo.", "Vietnamese tales follow the pattern that goodness is rewarded and evil punished."),
    q("Nhân vật 'Bụt' trong cổ tích có vai trò gì?", "What role does 'Bụt' play in the tales?", ["Kẻ phản diện", "Người giúp đỡ người tốt", "Nhà vua", "Người kể chuyện"], 1, "Bụt là nhân vật siêu nhiên xuất hiện giúp đỡ người lương thiện đang gặp khó.", "Bụt is a supernatural helper who appears to aid the virtuous in distress."),
    q("'Truyền thuyết' khác 'cổ tích' ở điểm nào?", "How does a legend differ from a fairy tale?", ["Truyền thuyết gắn với nhân vật, địa danh lịch sử", "Truyền thuyết không có phép thuật", "Cổ tích dài hơn", "Không khác gì nhau"], 0, "Truyền thuyết gắn với nhân vật hoặc địa danh lịch sử, còn cổ tích hư cấu hoàn toàn.", "Legends attach to historical figures or places, while fairy tales are wholly fictional."),
    q("'Trừng phạt' nghĩa là gì?", "What does 'trừng phạt' mean?", ["Khen thưởng", "Xử phạt kẻ làm điều sai", "Tha thứ", "Giúp đỡ"], 1, "Trừng phạt là xử phạt người làm điều sai trái.", "'Trừng phạt' means to punish a wrongdoer."),
  ],
);

topUp(
  "vn-folk-11",
  [
    v("da diết", "rất tha thiết, sâu sắc", "intense, aching", "Nỗi nhớ quê da diết trong lòng người đi xa.", "An aching homesickness fills those living far away.", "tính từ"),
    v("thắm thiết", "tình cảm sâu đậm", "deeply affectionate", "Tình quê thắm thiết không bao giờ phai.", "Love for one's homeland stays deeply affectionate forever.", "tính từ"),
  ],
  [
    q("'Hoài niệm' nghĩa là gì?", "What does 'hoài niệm' mean?", ["Nhớ về quá khứ", "Lo cho tương lai", "Giận dữ", "Vui vẻ"], 0, "Hoài niệm là nhớ và thương về những gì đã qua.", "'Hoài niệm' is fond remembrance of the past."),
    q("Ca dao quê hương thường nhắc tới món ăn nào?", "Which dish do homeland verses often mention?", ["Canh rau muống, cà dầm tương", "Sushi", "Pizza", "Bánh mì Pháp"], 0, "Câu ca dao nổi tiếng nhắc 'canh rau muống, cà dầm tương' như hương vị quê nhà.", "The famous verse names water-spinach soup and soy-pickled eggplant as the taste of home."),
    q("Từ 'xứ' trong ca dao chỉ điều gì?", "What does 'xứ' refer to?", ["Một vùng, một miền", "Một người", "Một mùa", "Một con thuyền"], 0, "'Xứ' chỉ một vùng đất, một miền quê.", "'Xứ' refers to a region or native land."),
    q("Vì sao ca dao quê hương thường tả cảnh vật rất cụ thể?", "Why do homeland verses describe scenery so concretely?", ["Để dạy địa lý", "Để gợi cảm xúc gắn bó qua hình ảnh quen thuộc", "Để đếm số ruộng", "Để khoe giàu"], 1, "Hình ảnh quen thuộc như con đò, bờ tre, cánh đồng gợi ngay cảm xúc gắn bó.", "Familiar images such as ferries, bamboo hedges and rice fields instantly evoke attachment."),
  ],
);

topUp(
  "vn-folk-12",
  [
    v("nhân nghĩa", "lòng thương người và cách đối xử đúng đạo lý", "humanity and righteousness", "Người Việt coi nhân nghĩa là gốc của cách sống.", "Vietnamese see humanity and righteousness as the root of how to live.", "danh từ"),
    v("tương trợ", "giúp đỡ lẫn nhau", "to support one another", "Dân làng tương trợ nhau sau bão.", "Villagers supported one another after the storm.", "động từ"),
  ],
  [
    q("'Uống nước nhớ nguồn' dạy điều gì?", "What does 'Uống nước nhớ nguồn' teach?", ["Biết ơn người đã giúp mình", "Tiết kiệm nước", "Đi xa lập nghiệp", "Học thật nhiều"], 0, "Câu này dạy lòng biết ơn cội nguồn và những người đi trước.", "It teaches gratitude toward one's origins and those who came before."),
    q("'Đoàn kết' mang lại điều gì theo tục ngữ Việt?", "According to Vietnamese proverbs, what does unity bring?", ["Sức mạnh", "Sự giàu có nhanh", "Sự nổi tiếng", "Sự may mắn"], 0, "Tục ngữ nhấn mạnh đoàn kết tạo nên sức mạnh của tập thể.", "Proverbs stress that unity creates collective strength."),
    q("Câu nào cùng chủ đề với 'Lá lành đùm lá rách'?", "Which proverb shares the theme of 'Lá lành đùm lá rách'?", ["Thương người như thể thương thân", "Đi một ngày đàng học một sàng khôn", "Nước đến chân mới nhảy", "Có công mài sắt có ngày nên kim"], 0, "Cả hai câu đều nói về lòng thương người và sự chia sẻ.", "Both proverbs speak of compassion and sharing."),
    q("'Tương trợ' khác 'giúp đỡ' ở điểm nào?", "How does 'tương trợ' differ from simply helping?", ["Nhấn mạnh sự hai chiều, lẫn nhau", "Chỉ dùng cho tiền bạc", "Chỉ dùng trong gia đình", "Không khác gì"], 0, "'Tương' nghĩa là lẫn nhau, nên tương trợ là giúp đỡ hai chiều.", "'Tương' means mutual, so 'tương trợ' is two-way support."),
  ],
);

topUp(
  "vn-folk-13",
  [
    v("nhọc nhằn", "vất vả, khó khăn", "toilsome", "Nghề nông nhọc nhằn nhưng đáng tự hào.", "Farming is toilsome yet worthy of pride.", "tính từ"),
    v("một nắng hai sương", "làm việc rất vất vả ngoài đồng", "to toil from dawn to dusk", "Cha mẹ một nắng hai sương nuôi con ăn học.", "Parents toiled from dawn to dusk to send their children to school.", "thành ngữ"),
  ],
  [
    q("'Ai ơi bưng bát cơm đầy' nhắc người ăn điều gì?", "What does 'Ai ơi bưng bát cơm đầy' remind eaters of?", ["Công sức người trồng lúa", "Giá gạo", "Cách nấu cơm", "Mùa gặt"], 0, "Câu ca dao nhắc mỗi hạt cơm dẻo thơm đều chứa 'muôn phần đắng cay' của người nông dân.", "The verse reminds us each fragrant grain holds the farmer's bitter effort."),
    q("'Tay làm hàm nhai, tay quai miệng trễ' nhấn mạnh điều gì?", "What does 'Tay làm hàm nhai' stress?", ["Có làm mới có ăn", "Nên nghỉ nhiều", "Nên đi xa", "Nên tiết kiệm"], 0, "Ai lao động thì có ăn, ai bỏ tay xuống thì đói.", "Those who work eat; those who fold their hands go hungry."),
    q("'Cần cù' nghĩa là gì?", "What does 'cần cù' mean?", ["Chăm chỉ, bền bỉ", "Nhanh nhẹn", "Thông minh", "Cẩn thận"], 0, "Cần cù là chăm chỉ và bền bỉ trong công việc.", "'Cần cù' means diligent and persevering."),
    q("'Một nắng hai sương' miêu tả ai rõ nhất?", "Whom does 'một nắng hai sương' best describe?", ["Người nông dân làm đồng", "Học sinh đi thi", "Thương nhân", "Nghệ sĩ"], 0, "Thành ngữ tả người làm đồng từ sớm tinh sương đến lúc nắng gắt.", "The idiom depicts field workers from early dew until harsh sun."),
  ],
);

topUp(
  "vn-folk-14",
  [
    v("trì hoãn", "để việc lại làm sau", "to procrastinate", "Trì hoãn khiến cơ hội trôi qua.", "Procrastination lets opportunities slip away.", "động từ"),
    v("đúng lúc", "vào thời điểm thích hợp", "at the right moment", "Lời khuyên đến đúng lúc thì rất quý.", "Advice given at the right moment is precious.", "trạng từ"),
  ],
  [
    q("'Thời gian là vàng' hàm ý gì?", "What does 'time is gold' imply?", ["Thời gian rất quý, cần dùng hợp lý", "Vàng rẻ hơn thời gian", "Nên mua vàng", "Nên ngủ nhiều"], 0, "Câu này nhấn mạnh giá trị của thời gian và việc dùng nó hợp lý.", "It stresses the value of time and using it wisely."),
    q("'Quyết đoán' nghĩa là gì?", "What does 'quyết đoán' mean?", ["Dám quyết định rõ ràng, nhanh chóng", "Do dự", "Nói nhiều", "Chờ người khác quyết"], 0, "Quyết đoán là dám đưa ra quyết định rõ ràng, không chần chừ.", "'Quyết đoán' means deciding clearly and without hesitation."),
    q("Câu nào trái nghĩa với 'Nước đến chân mới nhảy'?", "Which idea opposes 'waiting until water reaches your feet'?", ["Chuẩn bị từ sớm", "Ngủ muộn", "Đi chậm", "Nói ít"], 0, "Chuẩn bị từ sớm là thái độ trái ngược với việc chờ sát hạn mới hành động.", "Preparing early is the opposite of acting only at the last moment."),
    q("'Kiên nhẫn' và 'trì hoãn' khác nhau thế nào?", "How do patience and procrastination differ?", ["Kiên nhẫn là chờ có mục đích, trì hoãn là tránh việc", "Hai từ giống nhau", "Kiên nhẫn là nhanh hơn", "Trì hoãn là tốt hơn"], 0, "Kiên nhẫn là chờ đúng thời điểm với mục đích rõ ràng; trì hoãn là né tránh công việc.", "Patience is purposeful waiting; procrastination is avoiding the task."),
  ],
);

topUp(
  "vn-folk-15",
  [
    v("phận", "số phận, vị trí trong xã hội", "lot, station in life", "Ca dao xưa nói nhiều về phận người con gái.", "Old folk verse often speaks of a woman's lot.", "danh từ"),
    v("chịu thương chịu khó", "nhẫn nại, siêng năng, hay chịu đựng", "enduring and hard-working", "Người mẹ Việt chịu thương chịu khó suốt đời.", "Vietnamese mothers are enduring and hard-working all their lives.", "thành ngữ"),
  ],
  [
    q("'Thân em như tấm lụa đào' dùng biện pháp nào?", "Which device does 'Thân em như tấm lụa đào' use?", ["So sánh", "Nói quá", "Nhân hóa", "Điệp từ"], 0, "Câu ca dao so sánh thân phận người con gái với tấm lụa đào.", "The verse compares a young woman's lot to a piece of pink silk."),
    q("'Phất phơ giữa chợ' gợi cảm giác gì?", "What feeling does 'phất phơ giữa chợ' evoke?", ["Bấp bênh, không tự quyết", "An toàn", "Giàu có", "Tự do hoàn toàn"], 0, "Hình ảnh gợi sự bấp bênh, phụ thuộc vào 'tay ai' chọn lấy.", "The image suggests precariousness, depending on whose hand picks it up."),
    q("Xã hội phong kiến ảnh hưởng thế nào tới ca dao về phụ nữ?", "How did feudal society shape verses about women?", ["Nhiều câu nói về cam chịu và may rủi", "Chỉ nói về chiến tranh", "Không đề cập phụ nữ", "Chỉ ca ngợi giàu sang"], 0, "Do ít quyền tự quyết, nhiều câu ca dao nói về cam chịu và sự may rủi của số phận.", "With little agency, many verses speak of endurance and the luck of fate."),
    q("Ca dao về phụ nữ ngày nay được đọc với thái độ nào là phù hợp?", "How should we read these verses today?", ["Hiểu bối cảnh lịch sử và trân trọng sự bền bỉ", "Coi là luật lệ phải theo", "Bỏ qua hoàn toàn", "Chỉ học thuộc lòng"], 0, "Nên đặt trong bối cảnh lịch sử để hiểu và trân trọng sự bền bỉ của người xưa.", "Read them in historical context to understand and honour past resilience."),
  ],
);

/* ════════════════════════════════════════════════════════════════════════════
 * FOLKLORE - vn-folklore-advanced (10 bài)
 * ════════════════════════════════════════════════════════════════════════════ */

topUp(
  "vn-folk-6",
  [
    v("nói vống", "nói quá sự thật", "to exaggerate", "Đừng nói vống lên khi kể lại sự việc.", "Do not exaggerate when retelling the event.", "động từ"),
    v("lệch pha", "không khớp nhau trong cách hiểu", "out of sync", "Hai bên lệch pha nên bàn mãi không xong.", "The two sides were out of sync, so the discussion dragged on.", "tính từ"),
  ],
  [
    q("'Nói có sách, mách có chứng' yêu cầu điều gì?", "What does 'Nói có sách, mách có chứng' require?", ["Nói phải có bằng chứng", "Nói to hơn", "Nói nhanh hơn", "Nói ít lại"], 0, "Thành ngữ yêu cầu phát biểu phải dựa trên bằng chứng rõ ràng.", "The idiom demands that statements rest on clear evidence."),
    q("'Ăn nhập' nghĩa là gì?", "What does 'ăn nhập' mean?", ["Có liên quan, khớp với nhau", "Ăn nhiều", "Đi vào nhà", "Tranh luận"], 0, "'Ăn nhập' là có liên quan, khớp với nội dung đang nói.", "'Ăn nhập' means relevant, fitting with what is being discussed."),
    q("Thành ngữ giao tiếp thường có sức mạnh nào?", "What strength do conversational idioms have?", ["Diễn đạt nhanh một ý phức tạp bằng hình ảnh", "Làm câu dài hơn", "Thay thế ngữ pháp", "Khiến người nghe khó hiểu"], 0, "Thành ngữ nén một ý phức tạp vào hình ảnh ngắn gọn, dễ hình dung.", "Idioms compress a complex idea into a short, vivid image."),
    q("Khi nào nên tránh dùng thành ngữ dân gian?", "When should folk idioms be avoided?", ["Trong văn bản hành chính, hợp đồng", "Khi nói với bạn bè", "Khi kể chuyện", "Khi dạy học"], 0, "Văn bản hành chính và hợp đồng cần diễn đạt chính xác, tránh hình ảnh đa nghĩa.", "Administrative texts and contracts need precision, not ambiguous imagery."),
  ],
);

topUp(
  "vn-folk-7",
  [
    v("hàm ý", "ý nghĩa ẩn bên trong", "implied meaning", "Mỗi truyện ngụ ngôn đều có hàm ý đạo đức.", "Every fable carries an implied moral.", "danh từ"),
    v("châm biếm", "phê phán nhẹ nhàng bằng cách cười", "satirical", "Truyện ngụ ngôn châm biếm thói tự cao.", "The fable satirises arrogance.", "tính từ"),
  ],
  [
    q("Truyện ngụ ngôn thường dùng nhân vật nào?", "What characters do fables typically use?", ["Loài vật hoặc đồ vật được nhân hóa", "Chỉ các vị vua", "Chỉ trẻ em", "Chỉ thần linh"], 0, "Ngụ ngôn hay dùng loài vật, đồ vật nhân hóa để nói về con người.", "Fables personify animals or objects to speak about people."),
    q("Truyện 'Ếch ngồi đáy giếng' phê phán điều gì?", "What does 'The frog at the bottom of the well' criticise?", ["Hiểu biết hẹp mà tự cao", "Sự siêng năng", "Lòng thương người", "Tính tiết kiệm"], 0, "Con ếch chỉ thấy khoảng trời nhỏ nên tưởng mình lớn, tượng trưng cho hiểu biết hẹp mà tự cao.", "The frog sees only a patch of sky and thinks itself great: narrow knowledge with great arrogance."),
    q("'Đẽo cày giữa đường' dạy bài học gì?", "What is the lesson of 'carving a plough in the middle of the road'?", ["Cần có chính kiến", "Cần đi nhanh hơn", "Cần nhiều bạn", "Cần nhiều tiền"], 0, "Nghe theo mọi người mà không có chính kiến thì việc sẽ hỏng.", "Following every opinion without conviction ruins the work."),
    q("Khác biệt chính giữa ngụ ngôn và cổ tích là gì?", "What mainly separates a fable from a fairy tale?", ["Ngụ ngôn ngắn, tập trung một bài học", "Ngụ ngôn dài hơn", "Cổ tích không có nhân vật", "Không có khác biệt"], 0, "Ngụ ngôn thường rất ngắn và hướng tới một bài học duy nhất.", "Fables are short and aim at a single moral lesson."),
  ],
);

topUp(
  "vn-folk-8",
  [
    v("cầu hôn", "xin cưới làm vợ", "to propose marriage", "Hai vị thần cùng đến cầu hôn Mỵ Nương.", "Both gods came to propose to My Nuong.", "động từ"),
    v("dâng nước", "làm nước lên cao", "to raise the waters", "Thủy Tinh dâng nước đánh Sơn Tinh.", "Thuy Tinh raised the waters to attack Son Tinh.", "động từ"),
  ],
  [
    q("Sơn Tinh là thần của gì?", "Son Tinh is the god of what?", ["Núi", "Biển", "Lửa", "Gió"], 0, "Sơn Tinh là thần núi, Thủy Tinh là thần nước.", "Son Tinh is god of the mountains, Thuy Tinh god of the waters."),
    q("Vì sao Thủy Tinh tức giận?", "Why was Thuy Tinh angry?", ["Đến sau nên không cưới được Mỵ Nương", "Bị mất nhà", "Không có lễ vật", "Bị vua phạt"], 0, "Thủy Tinh đến sau, Sơn Tinh đã mang đủ lễ vật và rước Mỵ Nương đi.", "He arrived later; Son Tinh had already brought the gifts and taken My Nuong."),
    q("Chi tiết Sơn Tinh nâng núi cao lên tượng trưng cho điều gì?", "What does Son Tinh raising the mountains symbolise?", ["Người Việt chống lũ, đắp đê", "Việc xây thành", "Nghề đánh cá", "Việc buôn bán"], 0, "Đây là cách dân gian giải thích và ca ngợi công cuộc chống lũ, đắp đê của người Việt.", "It is the folk way of explaining and praising Vietnamese flood control and dyke building."),
    q("'Lễ vật' trong truyện gồm những gì?", "What were the betrothal gifts in the tale?", ["Voi chín ngà, gà chín cựa, ngựa chín hồng mao", "Vàng và bạc", "Lụa và gạo", "Thuyền và lưới"], 0, "Vua Hùng yêu cầu voi chín ngà, gà chín cựa, ngựa chín hồng mao, những thứ có ở vùng núi.", "King Hung asked for a nine-tusked elephant, nine-spurred rooster and nine-maned horse, all found in the mountains."),
  ],
);

topUp(
  "vn-folk-9",
  [
    v("hiền lành", "tốt tính, không hại ai", "kind-hearted", "Thạch Sanh hiền lành nên được thần giúp.", "Thach Sanh was kind-hearted, so the gods helped him.", "tính từ"),
    v("vu oan", "đổ tội sai cho người khác", "to falsely accuse", "Lý Thông vu oan cho Thạch Sanh.", "Ly Thong falsely accused Thach Sanh.", "động từ"),
  ],
  [
    q("Ai là kẻ phản bội Thạch Sanh?", "Who betrays Thach Sanh?", ["Lý Thông", "Công chúa", "Nhà vua", "Chằn tinh"], 0, "Lý Thông lợi dụng rồi vu oan cho Thạch Sanh để giành công.", "Ly Thong exploits him and then falsely accuses him to steal the credit."),
    q("Niêu cơm của Thạch Sanh có điều kỳ lạ gì?", "What is magical about Thach Sanh's rice pot?", ["Ăn hết lại đầy", "Biết bay", "Phát ra ánh sáng", "Nói được"], 0, "Niêu cơm ăn hết lại đầy, tượng trưng cho lòng khoan dung và sự no đủ.", "The pot refills endlessly, symbolising generosity and abundance."),
    q("Tiếng đàn thần của Thạch Sanh có tác dụng gì?", "What does the magic lute do?", ["Giúp minh oan và làm quân giặc rã lòng", "Gọi mưa", "Chữa bệnh", "Mở cửa thành"], 0, "Tiếng đàn giúp Thạch Sanh được minh oan và khiến quân mười tám nước rã lòng xin về.", "The lute clears his name and saps the will of the eighteen invading armies."),
    q("Truyện Thạch Sanh thể hiện quan niệm nào của người Việt?", "Which Vietnamese belief does the tale express?", ["Chính nghĩa và khoan dung sẽ thắng", "Kẻ mạnh luôn đúng", "Giàu sang là quan trọng nhất", "Không nên giúp ai"], 0, "Truyện đề cao chính nghĩa, lòng khoan dung và tinh thần yêu hòa bình.", "The tale exalts righteousness, forgiveness and a love of peace."),
  ],
);

topUp(
  "vn-folk-10",
  [
    v("nghĩa tình", "tình cảm gắn bó và đạo nghĩa", "loyal affection", "Sự tích trầu cau đề cao nghĩa tình.", "The betel and areca legend honours loyal affection.", "danh từ"),
    v("cưới hỏi", "việc tổ chức lễ cưới", "wedding rites", "Trầu cau không thể thiếu trong cưới hỏi.", "Betel and areca are indispensable in wedding rites.", "danh từ"),
  ],
  [
    q("Trong truyện, người em hóa thành gì?", "In the legend, what does the younger brother become?", ["Cây cau", "Tảng đá", "Dây trầu", "Con suối"], 0, "Người em hóa thành cây cau, người anh hóa thành tảng đá, người vợ hóa thành dây trầu.", "The younger brother becomes the areca tree, the elder a stone, the wife the betel vine."),
    q("Vì sao ăn trầu lại có màu đỏ?", "Why does chewing betel turn red?", ["Trầu, cau và vôi hòa lại thành màu đỏ", "Vì nhuộm phẩm", "Vì có máu", "Vì nắng"], 0, "Lá trầu, quả cau và vôi kết hợp tạo màu đỏ thắm, tượng trưng cho tình nghĩa bền chặt.", "Betel leaf, areca nut and lime combine into a deep red symbolising enduring bonds."),
    q("Miếng trầu trong văn hóa Việt mở đầu cho việc gì?", "What does offering betel open in Vietnamese culture?", ["Câu chuyện, cuộc gặp và chuyện cưới hỏi", "Việc buôn bán", "Việc đi học", "Việc làm ruộng"], 0, "Người xưa nói 'miếng trầu là đầu câu chuyện', trầu cau cũng mở đầu lễ cưới hỏi.", "As the saying goes, betel begins a conversation, and betel also opens wedding rites."),
    q("'Hóa' trong truyện cổ mang nghĩa gì?", "What does 'hóa' mean in old tales?", ["Biến thành hình dạng khác", "Chết hẳn", "Đi xa", "Ngủ say"], 0, "'Hóa' là biến thành một hình dạng khác, thường mang ý nghĩa bất tử của tình cảm.", "'Hóa' means transforming into another form, often implying that the bond lives on."),
  ],
);

topUp(
  "vn-folk-16",
  [
    v("từng trải", "có nhiều kinh nghiệm sống", "seasoned by experience", "Người từng trải nói năng thận trọng.", "Someone seasoned by experience speaks cautiously.", "tính từ"),
    v("thấm thía", "hiểu sâu sau khi trải qua", "deeply felt", "Bài học này thật thấm thía.", "This lesson is deeply felt.", "tính từ"),
  ],
  [
    q("'Gần mực thì đen, gần đèn thì sáng' nói về điều gì?", "What is 'Gần mực thì đen, gần đèn thì sáng' about?", ["Ảnh hưởng của môi trường", "Cách viết chữ", "Cách thắp đèn", "Cách nuôi cá"], 0, "Câu tục ngữ nói môi trường và bạn bè ảnh hưởng tới con người.", "The proverb says environment and company shape a person."),
    q("'Cái khó ló cái khôn' hàm ý gì?", "What does 'Cái khó ló cái khôn' imply?", ["Hoàn cảnh khó làm nảy sinh sáng kiến", "Khó thì nên bỏ", "Khôn thì không khó", "Không nên thử việc mới"], 0, "Khi bị đặt vào hoàn cảnh khó, con người nảy sinh cách giải quyết sáng tạo.", "Hard circumstances spark inventive solutions."),
    q("'Có công mài sắt, có ngày nên kim' đề cao đức tính nào?", "Which virtue does 'grinding iron into a needle' praise?", ["Kiên trì", "Nhanh nhẹn", "Hài hước", "Cẩn thận"], 0, "Câu này đề cao sự kiên trì bền bỉ.", "It praises steady perseverance."),
    q("'Trồng cây' trong câu 'Ăn quả nhớ kẻ trồng cây' chỉ ai?", "Who are the 'planters' in 'eat the fruit, remember the planter'?", ["Người đã tạo ra thành quả cho ta hưởng", "Người bán trái cây", "Người làm vườn thuê", "Người đi chợ"], 0, "Đó là những người đã tạo ra thành quả mà ta đang hưởng, nên cần biết ơn.", "They are those who created what we now enjoy, so gratitude is due."),
  ],
);

topUp(
  "vn-folk-17",
  [
    v("bất công", "không công bằng", "unjust", "Tấm chịu nhiều bất công từ mẹ kế.", "Tam suffered much injustice from her stepmother.", "tính từ"),
    v("đền đáp", "trả lại điều tốt cho người xứng đáng", "to requite", "Cuối truyện, lòng tốt của Tấm được đền đáp.", "In the end Tam's goodness is requited.", "động từ"),
  ],
  [
    q("Tấm hóa thân qua những hình nào trong truyện?", "Through which forms does Tam transform?", ["Chim vàng anh, cây xoan đào, quả thị", "Cá chép, hổ, đại bàng", "Hoa sen, mây, gió", "Trâu, ngựa, voi"], 0, "Tấm lần lượt hóa thành chim vàng anh, cây xoan đào và quả thị trước khi trở lại làm người.", "Tam becomes an oriole, a xoan tree and a persimmon before returning to human form."),
    q("Chi tiết hóa thân nhiều lần thể hiện điều gì?", "What do the repeated transformations show?", ["Sức sống bền bỉ của người lương thiện", "Phép thuật của mẹ kế", "Sự giàu có", "Sức mạnh của nhà vua"], 0, "Đây là cách dân gian thể hiện sức sống bền bỉ và niềm tin cái thiện không bị diệt.", "It is the folk way of showing that goodness cannot be destroyed."),
    q("'Mẹ kế' trong truyện đóng vai trò gì?", "What role does the stepmother play?", ["Nhân vật phản diện gây xung đột", "Người giúp đỡ", "Người kể chuyện", "Nhân vật phụ không quan trọng"], 0, "Mẹ kế và Cám là tuyến phản diện tạo xung đột chính của truyện.", "The stepmother and Cam form the antagonist line driving the central conflict."),
    q("So với các bản kể khác, điểm chung của Tấm Cám là gì?", "What is common across versions of Tam Cam?", ["Thiện thắng ác sau nhiều thử thách", "Kết thúc bỏ ngỏ", "Không có yếu tố kỳ ảo", "Nhân vật chính là nam"], 0, "Mọi bản kể đều theo mô hình thiện thắng ác sau chuỗi thử thách.", "Every version follows the pattern of good triumphing after a chain of trials."),
  ],
);

topUp(
  "vn-folk-18",
  [
    v("giao duyên", "hát đối đáp để bày tỏ tình cảm", "courtship singing", "Quan họ là lối hát giao duyên đặc sắc.", "Quan ho is a distinctive form of courtship singing.", "danh từ"),
    v("làng quan họ", "làng có truyền thống hát quan họ", "quan ho village", "Bắc Ninh có nhiều làng quan họ cổ.", "Bac Ninh has many ancient quan ho villages.", "danh từ"),
  ],
  [
    q("Hát quan họ được biểu diễn theo hình thức nào?", "How is quan ho performed?", ["Đối đáp giữa liền anh và liền chị", "Đơn ca có nhạc điện tử", "Hợp xướng nhà thờ", "Độc tấu đàn"], 0, "Quan họ hát đối đáp giữa liền anh và liền chị, thường không có nhạc đệm.", "Quan ho is sung in answering pairs of male and female singers, usually unaccompanied."),
    q("UNESCO ghi danh dân ca quan họ vào năm nào?", "When did UNESCO recognise quan ho?", ["2009", "1999", "2015", "2020"], 0, "Dân ca quan họ Bắc Ninh được UNESCO ghi danh là di sản văn hóa phi vật thể năm 2009.", "Bac Ninh quan ho was inscribed as intangible cultural heritage in 2009."),
    q("'Liền chị' chỉ ai?", "Who are the 'liền chị'?", ["Nữ nghệ nhân hát quan họ", "Nam nghệ nhân", "Người đánh trống", "Khán giả"], 0, "Liền chị là các nữ nghệ nhân, liền anh là nam nghệ nhân.", "'Liền chị' are the female singers, 'liền anh' the male singers."),
    q("Lời mời nước, mời trầu trong quan họ thể hiện điều gì?", "What do the water and betel invitations express?", ["Sự lịch thiệp và mến khách", "Việc buôn bán", "Lời thách đố", "Nghi lễ tôn giáo"], 0, "Đó là nét lịch thiệp, mến khách rất đặc trưng của văn hóa quan họ.", "They reflect the courteous hospitality central to quan ho culture."),
  ],
);

topUp(
  "vn-folk-19",
  [
    v("tích chèo", "câu chuyện dùng làm nội dung vở chèo", "cheo story", "Nhiều tích chèo lấy từ truyện cổ.", "Many cheo stories come from old tales.", "danh từ"),
    v("mõ làng", "người rao tin trong làng, cũng là vai chèo", "village crier role", "Vai mõ làng trong chèo rất hài hước.", "The village crier role in cheo is very comic.", "danh từ"),
  ],
  [
    q("Chèo phát triển mạnh nhất ở vùng nào?", "Where did cheo develop most strongly?", ["Đồng bằng Bắc Bộ", "Tây Nguyên", "Nam Bộ", "Duyên hải miền Trung"], 0, "Chèo là sân khấu dân gian của đồng bằng Bắc Bộ.", "Cheo is the folk theatre of the northern delta."),
    q("Vai 'thị mầu' hay 'mẹ Đốp' trong chèo thuộc loại nhân vật nào?", "What character type are roles like Thi Mau or Me Dop?", ["Vai hài, châm biếm", "Vai vua", "Vai thần linh", "Vai người kể chuyện nghiêm trang"], 0, "Đây là các vai hài, dùng tiếng cười để châm biếm lễ giáo cứng nhắc.", "These are comic roles using laughter to satirise rigid conventions."),
    q("Chèo thường kết hợp những yếu tố nào?", "What elements does cheo combine?", ["Hát, múa, diễn và nhạc dân tộc", "Chỉ hát", "Chỉ múa", "Chỉ đối thoại"], 0, "Chèo kết hợp hát, múa, diễn xuất và nhạc cụ dân tộc.", "Cheo blends singing, dance, acting and traditional instruments."),
    q("Sân khấu chèo truyền thống thường dựng ở đâu?", "Where was traditional cheo staged?", ["Sân đình làng", "Nhà hát lớn", "Trong cung vua", "Trên thuyền"], 0, "Chèo truyền thống diễn ở sân đình, khán giả ngồi quanh rất gần diễn viên.", "Traditional cheo played in the communal-house yard with the audience seated close by."),
  ],
);

topUp(
  "vn-folk-20",
  [
    v("thanh đồng", "người thực hành nghi lễ hầu đồng", "spirit medium", "Thanh đồng mặc trang phục theo từng vị thánh.", "The medium dresses according to each deity.", "danh từ"),
    v("chầu văn", "lối hát dùng trong nghi lễ thờ Mẫu", "chau van ritual singing", "Hát chầu văn đi cùng nghi lễ hầu đồng.", "Chau van singing accompanies the possession ritual.", "danh từ"),
  ],
  [
    q("Tín ngưỡng thờ Mẫu tôn vinh ai?", "Whom does Mother Goddess worship honour?", ["Các vị Thánh Mẫu, gắn với thiên nhiên", "Các vị vua Hùng", "Đức Phật", "Các tướng lĩnh"], 0, "Tín ngưỡng thờ Mẫu tôn vinh các Thánh Mẫu, gắn với trời, rừng, nước.", "It honours Mother Goddesses associated with sky, forest and water."),
    q("'Hầu đồng' là gì?", "What is 'hầu đồng'?", ["Nghi lễ nhập vai thánh có hát và múa", "Một điệu hát ru", "Một lễ cưới", "Một loại kịch nói"], 0, "Hầu đồng là nghi lễ trong đó thanh đồng nhập vai các vị thánh, kèm hát chầu văn và múa.", "It is a ritual in which a medium embodies deities, with chau van singing and dance."),
    q("Trang phục trong nghi lễ có ý nghĩa gì?", "What is the role of the costumes?", ["Phân biệt từng vị thánh được thỉnh", "Chỉ để đẹp", "Theo mùa", "Theo tuổi người hát"], 0, "Mỗi vị thánh có màu sắc và trang phục riêng nên trang phục giúp nhận biết vị thánh.", "Each deity has distinct colours and dress, so costume identifies the deity."),
    q("Vì sao thờ Mẫu được coi là di sản đáng bảo tồn?", "Why is Mother Goddess worship seen as heritage worth safeguarding?", ["Gắn kết cộng đồng và lưu giữ âm nhạc, trang phục dân gian", "Vì mới xuất hiện", "Vì chỉ có ở thành phố", "Vì không có nghi lễ"], 0, "Thực hành này gắn kết cộng đồng và bảo tồn cả âm nhạc, trang phục, ngôn ngữ dân gian.", "The practice binds communities and preserves folk music, costume and language."),
  ],
);

/* ════════════════════════════════════════════════════════════════════════════
 * 3 NHÓM MỎNG - vn-adv-reading, vn-adv-grammar, vn-culture-expanded
 * ════════════════════════════════════════════════════════════════════════════ */

topUp(
  "vn-adv-journalism",
  [
    v("tít bài", "tiêu đề của bài báo", "headline", "Tít bài cần ngắn và chính xác.", "A headline must be short and accurate.", "danh từ"),
    v("sapo", "đoạn mở đầu tóm ý chính", "lead paragraph", "Sapo tóm gọn nội dung trong hai ba câu.", "The lead sums up the story in two or three sentences.", "danh từ"),
    v("nguồn tin", "nơi cung cấp thông tin", "source", "Bài báo tốt luôn dẫn nguồn tin rõ ràng.", "A good article always cites clear sources.", "danh từ"),
    v("phỏng vấn", "hỏi đáp với nhân vật để lấy thông tin", "interview", "Phóng viên phỏng vấn người dân tại hiện trường.", "The reporter interviewed residents at the scene.", "danh từ"),
    v("khách quan", "không thiên vị, dựa trên sự thật", "objective", "Tin tức cần viết khách quan.", "News should be written objectively.", "tính từ"),
    v("số liệu", "dữ liệu bằng con số", "figures, data", "Bài viết dùng số liệu của cơ quan thống kê.", "The article uses figures from the statistics office.", "danh từ"),
  ],
  [
    q("'Trích dẫn' trong bài báo dùng để làm gì?", "What is a quotation used for in an article?", ["Dẫn lại nguyên văn lời người khác", "Tóm tắt bài", "Đặt tiêu đề", "Kết bài"], 0, "Trích dẫn là dẫn lại nguyên văn lời nói của nhân vật, đặt trong ngoặc kép.", "A quotation reproduces someone's exact words inside quotation marks."),
    q("Tin tức khác bình luận ở điểm nào?", "How does a news report differ from commentary?", ["Tin tức thuật lại sự việc, bình luận nêu quan điểm", "Tin tức dài hơn", "Bình luận không có tiêu đề", "Không khác nhau"], 0, "Tin tức thuật lại sự việc một cách khách quan; bình luận nêu quan điểm, phân tích.", "News reports events objectively; commentary offers opinion and analysis."),
    q("Đọc báo tiếng Việt nên bắt đầu từ đâu để nắm ý nhanh?", "Where should you start to grasp a Vietnamese article quickly?", ["Tít bài và sapo", "Đoạn cuối", "Phần trích dẫn", "Chú thích ảnh"], 0, "Tít bài và sapo cho biết ngay chủ đề và ý chính.", "The headline and lead immediately reveal topic and main point."),
  ],
);

topUp(
  "vn-adv-literature",
  [
    v("nhân vật điển hình", "nhân vật đại diện cho một tầng lớp", "representative character", "Chị Dậu là nhân vật điển hình của người nông dân.", "Chi Dau is a representative character of the peasantry.", "danh từ"),
    v("cốt truyện", "chuỗi sự việc chính của tác phẩm", "plot", "Cốt truyện đơn giản nhưng ý nghĩa sâu.", "The plot is simple yet deeply meaningful.", "danh từ"),
    v("bút pháp", "cách viết riêng của tác giả", "writing style", "Bút pháp Nam Cao lạnh mà thấm.", "Nam Cao's style is cool yet piercing.", "danh từ"),
    v("tự sự", "kể lại sự việc", "narrative", "Truyện ngắn thuộc thể loại tự sự.", "The short story belongs to the narrative genre.", "danh từ"),
    v("thi ca", "thơ và nghệ thuật thơ", "poetry", "Thi ca hiện đại phá bỏ nhiều niêm luật cũ.", "Modern poetry broke many old rules.", "danh từ"),
    v("phản ánh", "thể hiện lại hiện thực", "to reflect", "Tác phẩm phản ánh đời sống nông thôn trước 1945.", "The work reflects rural life before 1945.", "động từ"),
  ],
  [
    q("'Hiện thực phê phán' là trào lưu văn học thế nào?", "What is the critical realism movement?", ["Phản ánh và phê phán bất công xã hội", "Chỉ viết về thiên nhiên", "Chỉ viết thơ tình", "Chỉ viết cho trẻ em"], 0, "Hiện thực phê phán phản ánh đời sống và phê phán bất công xã hội, tiêu biểu là Nam Cao, Ngô Tất Tố.", "Critical realism depicts life while criticising social injustice, as in Nam Cao and Ngo Tat To."),
    q("'Biện pháp tu từ' là gì?", "What is a rhetorical device?", ["Cách dùng từ tạo hiệu quả biểu cảm", "Cách chia câu", "Cách đặt tên nhân vật", "Cách in sách"], 0, "Biện pháp tu từ như so sánh, ẩn dụ, nhân hóa giúp câu văn giàu sức biểu cảm.", "Devices such as simile, metaphor and personification make writing expressive."),
    q("Khi đọc văn học hiện đại, nên chú ý điều gì để hiểu sâu?", "What should you attend to when reading modern literature?", ["Bối cảnh lịch sử và giọng điệu tác giả", "Số trang", "Giá sách", "Nhà in"], 0, "Hiểu bối cảnh lịch sử và giọng điệu tác giả giúp nắm được tầng nghĩa sâu.", "Historical context and authorial tone unlock deeper layers of meaning."),
  ],
);

topUp(
  "vn-adv-complex-sent",
  [
    v("mệnh đề", "phần câu có chủ ngữ và vị ngữ", "clause", "Câu ghép có từ hai mệnh đề trở lên.", "A compound sentence has two or more clauses.", "danh từ"),
    v("quan hệ từ", "từ nối các mệnh đề", "connective", "'Vì', 'nên', 'mà' là quan hệ từ.", "'Vì', 'nên' and 'mà' are connectives.", "danh từ"),
    v("nguyên nhân", "lý do dẫn tới kết quả", "cause", "Mệnh đề nguyên nhân thường mở đầu bằng 'vì'.", "A cause clause usually begins with 'vì'.", "danh từ"),
    v("kết quả", "điều xảy ra do nguyên nhân", "result", "Mệnh đề kết quả thường có 'nên'.", "A result clause usually uses 'nên'.", "danh từ"),
    v("điều kiện", "tình huống cần có để việc xảy ra", "condition", "'Nếu... thì...' diễn tả điều kiện.", "'Nếu... thì...' expresses a condition.", "danh từ"),
    v("tương phản", "hai ý trái ngược nhau", "contrast", "'Tuy... nhưng...' diễn tả sự tương phản.", "'Tuy... nhưng...' expresses contrast.", "danh từ"),
    v("liệt kê", "kể ra nhiều ý ngang hàng", "to list", "Câu ghép đẳng lập thường dùng để liệt kê.", "Coordinate compound sentences often list items.", "động từ"),
  ],
  [
    q("Cặp quan hệ từ nào diễn tả điều kiện?", "Which pair expresses a condition?", ["Nếu... thì...", "Tuy... nhưng...", "Vì... nên...", "Không chỉ... mà còn..."], 0, "'Nếu... thì...' là cặp quan hệ từ chỉ điều kiện và kết quả.", "'Nếu... thì...' marks condition and consequence."),
    q("'Tôi học tiếng Việt và em tôi học tiếng Nhật' là câu ghép loại nào?", "What kind of compound sentence is this?", ["Đẳng lập", "Chính phụ", "Nhượng bộ", "Điều kiện"], 0, "Hai mệnh đề ngang hàng, nối bằng 'và', nên là câu ghép đẳng lập.", "Two equal clauses joined by 'và' make a coordinate compound sentence."),
    q("Lỗi thường gặp khi viết câu phức tiếng Việt là gì?", "What is a common error in Vietnamese complex sentences?", ["Dùng nửa cặp quan hệ từ hoặc thiếu chủ ngữ mệnh đề", "Dùng quá ít dấu phẩy", "Viết hoa sai", "Dùng số thay chữ"], 0, "Nhiều người viết 'Vì trời mưa, tôi ở nhà' rồi bỏ 'nên', hoặc để mệnh đề thiếu chủ ngữ gây tối nghĩa.", "Writers often drop the second half of a connective pair or leave a clause without a subject."),
  ],
);

topUp(
  "vn-adv-academic",
  [
    v("luận điểm", "ý chính cần chứng minh", "thesis point", "Mỗi đoạn nên có một luận điểm rõ ràng.", "Each paragraph should carry one clear thesis point.", "danh từ"),
    v("luận cứ", "bằng chứng cho luận điểm", "supporting evidence", "Luận cứ phải có nguồn đáng tin.", "Supporting evidence must come from reliable sources.", "danh từ"),
    v("dẫn nguồn", "ghi rõ nơi lấy thông tin", "to cite", "Bài viết học thuật luôn dẫn nguồn.", "Academic writing always cites sources.", "động từ"),
    v("khảo sát", "tìm hiểu, thu thập dữ liệu", "to survey", "Nhóm đã khảo sát 300 học sinh.", "The team surveyed 300 students.", "động từ"),
    v("kết luận", "phần chốt lại kết quả", "conclusion", "Kết luận cần trả lời câu hỏi nghiên cứu.", "The conclusion must answer the research question.", "danh từ"),
    v("thuật ngữ", "từ chuyên ngành", "technical term", "Cần giải thích thuật ngữ khi dùng lần đầu.", "Explain a technical term at first use.", "danh từ"),
  ],
  [
    q("Văn phong học thuật tránh điều gì?", "What does academic style avoid?", ["Từ ngữ cảm tính và khẩu ngữ", "Số liệu", "Bảng biểu", "Trích dẫn"], 0, "Văn học thuật tránh từ cảm tính, khẩu ngữ và những khẳng định không có bằng chứng.", "Academic style avoids emotive wording, colloquialism and unsupported claims."),
    q("'Kiến nghị' thường xuất hiện ở phần nào?", "Where do recommendations usually appear?", ["Cuối bài, sau kết luận", "Ngay tiêu đề", "Trong phần mở đầu", "Trong tài liệu tham khảo"], 0, "Kiến nghị thường nằm cuối bài, sau khi đã kết luận từ kết quả.", "Recommendations follow the conclusion at the end of the paper."),
    q("Cách diễn đạt nào phù hợp văn phong học thuật hơn?", "Which phrasing suits academic style better?", ["'Kết quả cho thấy có sự khác biệt đáng kể'", "'Cái này khác hẳn luôn'", "'Ai cũng biết điều đó'", "'Tôi nghĩ chắc là vậy'"], 0, "Cách diễn đạt trung tính, dựa trên kết quả là phù hợp nhất.", "Neutral, results-based phrasing is the most appropriate."),
  ],
);

topUp(
  "vn-culture-festivals",
  [
    v("lễ hội", "hoạt động cộng đồng theo truyền thống", "festival", "Mỗi vùng có lễ hội riêng vào mùa xuân.", "Each region holds its own spring festival.", "danh từ"),
    v("cúng", "dâng lễ vật lên tổ tiên hoặc thần linh", "to make offerings", "Gia đình cúng ông bà vào chiều ba mươi.", "Families make offerings to ancestors on the eve of Tet.", "động từ"),
    v("giao thừa", "thời điểm chuyển sang năm mới", "New Year's Eve moment", "Cả nhà thức đón giao thừa.", "The whole family stays up for the New Year moment.", "danh từ"),
    v("mâm ngũ quả", "mâm năm loại quả bày ngày Tết", "five-fruit tray", "Mâm ngũ quả đặt trên bàn thờ.", "The five-fruit tray sits on the altar.", "danh từ"),
    v("hội làng", "lễ hội của một làng", "village festival", "Hội làng có hát chèo và trò chơi dân gian.", "The village festival features cheo singing and folk games.", "danh từ"),
    v("kiêng", "tránh làm điều được cho là không may", "to avoid as taboo", "Nhiều người kiêng quét nhà ngày mùng một.", "Many people avoid sweeping the house on the first day of Tet.", "động từ"),
  ],
  [
    q("'Lì xì' mang ý nghĩa gì?", "What does 'lì xì' mean?", ["Tặng tiền mừng tuổi cầu may", "Trả nợ", "Mua quà Tết", "Đóng góp cho làng"], 0, "Lì xì là tặng tiền mừng tuổi, mang ý nghĩa cầu may cho năm mới.", "'Lì xì' is giving lucky money to wish a fortunate new year."),
    q("'Rước đèn' diễn ra trong dịp nào?", "When does lantern parading take place?", ["Tết Trung Thu", "Tết Nguyên Đán", "Giỗ Tổ Hùng Vương", "Tết Thanh Minh"], 0, "Rước đèn là hoạt động đặc trưng của Tết Trung Thu.", "Lantern parading is characteristic of the Mid-Autumn Festival."),
    q("Vì sao lễ hội Việt Nam thường gắn với đình, chùa?", "Why are Vietnamese festivals often centred on communal houses and pagodas?", ["Đó là trung tâm sinh hoạt cộng đồng và thờ tự", "Vì ở đó rộng nhất", "Vì gần chợ", "Vì có nhiều cây"], 0, "Đình và chùa là trung tâm thờ tự, cũng là nơi sinh hoạt chung của cả làng.", "Communal houses and pagodas were both places of worship and hubs of village life."),
  ],
);

topUp(
  "vn-culture-cuisine",
  [
    v("nước chấm", "nước pha để chấm thức ăn", "dipping sauce", "Mỗi món có nước chấm riêng.", "Each dish has its own dipping sauce.", "danh từ"),
    v("rau thơm", "các loại rau có mùi thơm ăn kèm", "fresh herbs", "Phở ăn kèm rau thơm và giá.", "Pho is served with fresh herbs and bean sprouts.", "danh từ"),
    v("hầm", "nấu lâu cho mềm", "to stew, to simmer long", "Xương được hầm nhiều giờ cho ngọt nước.", "Bones are simmered for hours to sweeten the broth.", "động từ"),
    v("cay nồng", "vị cay mạnh", "pungently spicy", "Món Huế thường cay nồng.", "Hue dishes are often pungently spicy.", "tính từ"),
    v("ngọt thanh", "ngọt nhẹ, không gắt", "lightly sweet", "Canh miền Nam thường ngọt thanh.", "Southern soups are often lightly sweet.", "tính từ"),
    v("món cuốn", "món ăn dùng bánh tráng cuốn lại", "rolled dish", "Món cuốn ăn kèm nước chấm chua ngọt.", "Rolled dishes come with a sweet-and-sour dip.", "danh từ"),
  ],
  [
    q("Ẩm thực miền Bắc thường có đặc điểm nào?", "What characterises northern Vietnamese food?", ["Thanh đạm, ít ngọt, cân bằng vị", "Rất ngọt", "Rất cay", "Nhiều nước cốt dừa"], 0, "Món Bắc chú trọng vị thanh, cân bằng, ít ngọt và ít cay.", "Northern cooking favours light, balanced flavours with little sugar or chilli."),
    q("Vì sao món miền Nam thường ngọt hơn?", "Why is southern food often sweeter?", ["Vùng đất trù phú, sẵn đường và nước cốt dừa", "Vì trời lạnh", "Vì ít gia vị", "Vì thiếu rau"], 0, "Miền Nam trù phú, sẵn đường mía và nước cốt dừa nên vị ngọt đậm hơn.", "The fertile south has abundant cane sugar and coconut milk, giving sweeter flavours."),
    q("'Đặc sản' nghĩa là gì?", "What does 'đặc sản' mean?", ["Sản phẩm nổi tiếng riêng của một vùng", "Món ăn nhanh", "Món ăn chay", "Món nhập khẩu"], 0, "Đặc sản là sản phẩm hoặc món ăn nổi tiếng riêng của một vùng.", "'Đặc sản' is a product or dish for which a region is famous."),
  ],
);
