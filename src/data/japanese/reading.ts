/**
 * @file reading.ts
 * @description Reading Lab passages (N5 - N3) with bilingual translations and
 *  comprehension questions whose answers are grounded in the passage.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export interface JaReadingQuestion {
  q_vi: string;
  q_en: string;
  options: string[];
  answer: number;
  /** Sentence from the passage that proves the answer. */
  evidence: string;
  explain_vi: string;
  explain_en: string;
}

export interface JaReadingPassage {
  id: string;
  level: "N5" | "N4" | "N3";
  title_vi: string;
  title_en: string;
  /** Passage split into paragraphs so it stays readable on phones. */
  body: string[];
  romaji: string[];
  trans_vi: string[];
  trans_en: string[];
  vocab: Array<{ jp: string; romaji: string; vi: string; en: string }>;
  questions: JaReadingQuestion[];
}

export const JA_READING: JaReadingPassage[] = [
  {
    id: "rd-01", level: "N5",
    title_vi: "Một ngày của tôi", title_en: "My day",
    body: [
      "わたしは まいあさ ろくじに おきます。かおを あらって、あさごはんを たべます。",
      "しちじ はんに いえを でて、でんしゃで がっこうへ いきます。がっこうまで さんじゅっぷん かかります。",
      "ごごは としょかんで にほんごを べんきょうします。ろくじごろ いえに かえります。",
    ],
    romaji: [
      "Watashi wa maiasa roku-ji ni okimasu. Kao o aratte, asagohan o tabemasu.",
      "Shichi-ji han ni ie o dete, densha de gakkō e ikimasu. Gakkō made sanjuppun kakarimasu.",
      "Gogo wa toshokan de nihongo o benkyō shimasu. Roku-ji goro ie ni kaerimasu.",
    ],
    trans_vi: [
      "Mỗi sáng tôi thức dậy lúc 6 giờ. Tôi rửa mặt rồi ăn sáng.",
      "7 giờ 30 tôi ra khỏi nhà, đi tàu tới trường. Tới trường mất 30 phút.",
      "Buổi chiều tôi học tiếng Nhật ở thư viện. Khoảng 6 giờ tôi về nhà.",
    ],
    trans_en: [
      "I get up at six every morning. I wash my face and eat breakfast.",
      "I leave home at seven thirty and take the train to school. It takes thirty minutes.",
      "In the afternoon I study Japanese in the library. I go home around six.",
    ],
    vocab: [
      { jp: "起きる（おきる）", romaji: "okiru", vi: "thức dậy", en: "to get up" },
      { jp: "出る（でる）", romaji: "deru", vi: "ra khỏi", en: "to leave" },
      { jp: "かかる", romaji: "kakaru", vi: "mất (thời gian)", en: "to take (time)" },
      { jp: "図書館（としょかん）", romaji: "toshokan", vi: "thư viện", en: "library" },
    ],
    questions: [
      { q_vi: "Người viết thức dậy lúc mấy giờ?", q_en: "What time does the writer get up?", options: ["6 giờ / six", "7 giờ / seven", "7 giờ 30 / seven thirty", "8 giờ / eight"], answer: 0, evidence: "わたしは まいあさ ろくじに おきます。", explain_vi: "ろくじに おきます = thức dậy lúc 6 giờ.", explain_en: "ろくじに おきます means gets up at six." },
      { q_vi: "Tới trường mất bao lâu?", q_en: "How long does it take to school?", options: ["10 phút / ten minutes", "30 phút / thirty minutes", "1 tiếng / one hour", "15 phút / fifteen minutes"], answer: 1, evidence: "がっこうまで さんじゅっぷん かかります。", explain_vi: "さんじゅっぷん = 30 phút.", explain_en: "さんじゅっぷん means thirty minutes." },
      { q_vi: "Buổi chiều người viết làm gì?", q_en: "What does the writer do in the afternoon?", options: ["Đi làm / works", "Chơi thể thao / plays sport", "Học tiếng Nhật ở thư viện / studies Japanese in the library", "Về nhà ngủ / sleeps at home"], answer: 2, evidence: "ごごは としょかんで にほんごを べんきょうします。", explain_vi: "としょかんで べんきょうします = học ở thư viện.", explain_en: "Studies in the library." },
    ],
  },
  {
    id: "rd-02", level: "N5",
    title_vi: "Thư mời đi ăn", title_en: "An invitation to eat out",
    body: [
      "マイさん、こんにちは。あしたの よる、じかんが ありますか。",
      "えきの ちかくに あたらしい ラーメンやが できました。とても おいしいと ききました。",
      "ろくじに えきの みなみぐちで あいましょう。へんじを ください。",
    ],
    romaji: [
      "Mai-san, konnichiwa. Ashita no yoru, jikan ga arimasu ka.",
      "Eki no chikaku ni atarashii rāmen-ya ga dekimashita. Totemo oishii to kikimashita.",
      "Roku-ji ni eki no minamiguchi de aimashō. Henji o kudasai.",
    ],
    trans_vi: [
      "Chào Mai. Tối mai bạn có thời gian không?",
      "Gần ga có tiệm ramen mới mở. Mình nghe nói rất ngon.",
      "6 giờ gặp nhau ở cửa Nam của ga nhé. Cho mình câu trả lời nha.",
    ],
    trans_en: [
      "Hello Mai. Do you have time tomorrow evening?",
      "A new ramen shop has opened near the station. I hear it is very tasty.",
      "Let's meet at six at the south exit. Please reply.",
    ],
    vocab: [
      { jp: "近く（ちかく）", romaji: "chikaku", vi: "gần", en: "nearby" },
      { jp: "できる", romaji: "dekiru", vi: "mở ra, hình thành", en: "to open, to come into being" },
      { jp: "南口（みなみぐち）", romaji: "minamiguchi", vi: "cửa Nam", en: "south exit" },
      { jp: "返事（へんじ）", romaji: "henji", vi: "câu trả lời", en: "reply" },
    ],
    questions: [
      { q_vi: "Hai người hẹn gặp ở đâu?", q_en: "Where will they meet?", options: ["Trong tiệm ramen / inside the ramen shop", "Cửa Bắc của ga / the north exit", "Cửa Nam của ga / the south exit", "Ở trường / at school"], answer: 2, evidence: "えきの みなみぐちで あいましょう。", explain_vi: "みなみぐち = cửa Nam.", explain_en: "みなみぐち means south exit." },
      { q_vi: "Tiệm ramen thế nào?", q_en: "What is said about the ramen shop?", options: ["Mới mở và nghe nói rất ngon / newly opened and said to be tasty", "Rất đắt / very expensive", "Đã đóng cửa / has closed", "Xa nhà ga / far from the station"], answer: 0, evidence: "あたらしい ラーメンやが できました。とても おいしいと ききました。", explain_vi: "あたらしい ... おいしいと ききました.", explain_en: "It is new and reportedly delicious." },
      { q_vi: "Người viết mong nhận điều gì?", q_en: "What does the writer ask for?", options: ["Tiền / money", "Câu trả lời / a reply", "Địa chỉ / an address", "Số điện thoại / a phone number"], answer: 1, evidence: "へんじを ください。", explain_vi: "返事をください = xin cho câu trả lời.", explain_en: "返事をください asks for a reply." },
    ],
  },
  {
    id: "rd-03", level: "N4",
    title_vi: "Thông báo của toà nhà", title_en: "A building notice",
    body: [
      "お知らせ：来週の水曜日、午前九時から午後三時まで、水道の工事を行います。",
      "その間、水が使えません。前の日に水を用意しておいてください。",
      "エレベーターは使えますが、大きい音がするかもしれません。ご協力をお願いします。",
    ],
    romaji: [
      "Oshirase: raishū no suiyōbi, gozen ku-ji kara gogo san-ji made, suidō no kōji o okonaimasu.",
      "Sono aida, mizu ga tsukaemasen. Mae no hi ni mizu o yōi shite oite kudasai.",
      "Erebētā wa tsukaemasu ga, ōkii oto ga suru kamo shiremasen. Gokyōryoku o onegai shimasu.",
    ],
    trans_vi: [
      "Thông báo: thứ Tư tuần sau, từ 9 giờ sáng đến 3 giờ chiều, chúng tôi thi công đường nước.",
      "Trong thời gian đó không dùng được nước. Xin chuẩn bị sẵn nước từ ngày hôm trước.",
      "Thang máy vẫn dùng được nhưng có thể ồn. Mong quý vị hợp tác.",
    ],
    trans_en: [
      "Notice: next Wednesday from 9 a.m. to 3 p.m. we will carry out water pipe work.",
      "During that time water cannot be used. Please prepare water the day before.",
      "The lift will work but may be noisy. Thank you for your cooperation.",
    ],
    vocab: [
      { jp: "工事（こうじ）", romaji: "kōji", vi: "thi công", en: "construction work" },
      { jp: "水道（すいどう）", romaji: "suidō", vi: "đường nước", en: "water supply" },
      { jp: "用意（ようい）", romaji: "yōi", vi: "chuẩn bị", en: "preparation" },
      { jp: "協力（きょうりょく）", romaji: "kyōryoku", vi: "hợp tác", en: "cooperation" },
    ],
    questions: [
      { q_vi: "Không dùng được nước trong khoảng nào?", q_en: "When is water unavailable?", options: ["Cả ngày thứ Tư / all Wednesday", "9:00 - 15:00 thứ Tư / 9 a.m. to 3 p.m. Wednesday", "9:00 - 15:00 thứ Năm / Thursday 9 to 3", "Từ tối thứ Ba / from Tuesday evening"], answer: 1, evidence: "午前九時から午後三時まで、水道の工事を行います。", explain_vi: "Từ 9 giờ sáng đến 3 giờ chiều thứ Tư.", explain_en: "From 9 a.m. to 3 p.m. on Wednesday." },
      { q_vi: "Cư dân nên làm gì trước đó?", q_en: "What should residents do beforehand?", options: ["Chuẩn bị nước từ hôm trước / prepare water the day before", "Không dùng thang máy / avoid the lift", "Ra khỏi toà nhà / leave the building", "Gọi cho ban quản lý / call the management"], answer: 0, evidence: "前の日に水を用意しておいてください。", explain_vi: "用意しておいてください = hãy chuẩn bị sẵn.", explain_en: "Please prepare it in advance." },
      { q_vi: "Thang máy thì sao?", q_en: "What about the lift?", options: ["Dừng hoạt động / stopped", "Chỉ dùng buổi sáng / mornings only", "Dùng được nhưng có thể ồn / usable but possibly noisy", "Chỉ dành cho nhân viên / staff only"], answer: 2, evidence: "エレベーターは使えますが、大きい音がするかもしれません。", explain_vi: "使えますが = dùng được nhưng ...", explain_en: "It works but may be loud." },
    ],
  },
  {
    id: "rd-04", level: "N4",
    title_vi: "Blog: học tiếng Nhật bằng phim", title_en: "Blog: learning Japanese with films",
    body: [
      "わたしは半年前から、日本の映画を見ながら日本語を勉強しています。",
      "はじめは字幕を見ないと分かりませんでしたが、今は短い会話なら聞き取れるようになりました。",
      "コツは同じ場面を三回見ることです。一回目は字幕なし、二回目は日本語字幕、三回目は声を出して真似します。",
      "話す練習にもなるので、教科書だけの勉強より楽しく続けられます。",
    ],
    romaji: [
      "Watashi wa hantoshi mae kara, Nihon no eiga o minagara nihongo o benkyō shite imasu.",
      "Hajime wa jimaku o minai to wakarimasen deshita ga, ima wa mijikai kaiwa nara kikitoreru yō ni narimashita.",
      "Kotsu wa onaji bamen o sankai miru koto desu. Ikkai-me wa jimaku nashi, nikai-me wa nihongo jimaku, sankai-me wa koe o dashite mane shimasu.",
      "Hanasu renshū ni mo naru no de, kyōkasho dake no benkyō yori tanoshiku tsuzukeraremasu.",
    ],
    trans_vi: [
      "Từ nửa năm trước, tôi vừa xem phim Nhật vừa học tiếng Nhật.",
      "Ban đầu không xem phụ đề thì không hiểu, nhưng giờ hội thoại ngắn thì tôi nghe được.",
      "Bí quyết là xem cùng một cảnh ba lần: lần đầu không phụ đề, lần hai phụ đề tiếng Nhật, lần ba đọc to bắt chước.",
      "Cách này cũng là luyện nói, nên vui và duy trì được lâu hơn học chỉ bằng sách.",
    ],
    trans_en: [
      "For the past six months I have studied Japanese while watching Japanese films.",
      "At first I could not understand without subtitles, but now I can catch short conversations.",
      "The trick is to watch the same scene three times: first without subtitles, then with Japanese subtitles, then imitating aloud.",
      "It doubles as speaking practice, so it is more fun to keep up than textbooks alone.",
    ],
    vocab: [
      { jp: "字幕（じまく）", romaji: "jimaku", vi: "phụ đề", en: "subtitles" },
      { jp: "聞き取る（ききとる）", romaji: "kikitoru", vi: "nghe ra, nghe hiểu", en: "to catch, to make out" },
      { jp: "場面（ばめん）", romaji: "bamen", vi: "cảnh", en: "scene" },
      { jp: "真似する（まねする）", romaji: "mane suru", vi: "bắt chước", en: "to imitate" },
    ],
    questions: [
      { q_vi: "Lần xem thứ hai người viết làm gì?", q_en: "What does the writer do on the second viewing?", options: ["Không phụ đề / no subtitles", "Đọc to bắt chước / imitate aloud", "Ghi chép từ mới / write new words", "Xem có phụ đề tiếng Nhật / watch with Japanese subtitles"], answer: 3, evidence: "二回目は日本語字幕", explain_vi: "二回目 = lần hai, có phụ đề tiếng Nhật.", explain_en: "The second time uses Japanese subtitles." },
      { q_vi: "Kỹ năng nào đã tiến bộ?", q_en: "Which skill improved?", options: ["Nghe hội thoại ngắn / catching short conversations", "Viết chữ kanji / writing kanji", "Đọc báo / reading newspapers", "Dịch thuật / translation"], answer: 0, evidence: "今は短い会話なら聞き取れるようになりました。", explain_vi: "聞き取れるようになりました = đã nghe hiểu được.", explain_en: "They became able to catch short talk." },
      { q_vi: "Vì sao cách này duy trì được?", q_en: "Why is this method sustainable?", options: ["Vì nhanh hơn / it is faster", "Vì vui hơn học chỉ bằng sách / it is more fun than textbooks alone", "Vì rẻ hơn / it is cheaper", "Vì có giáo viên kèm / a teacher helps"], answer: 1, evidence: "教科書だけの勉強より楽しく続けられます。", explain_vi: "より楽しく続けられます = duy trì vui hơn.", explain_en: "It is more enjoyable to continue." },
    ],
  },
  {
    id: "rd-05", level: "N3",
    title_vi: "Email công việc", title_en: "A work email",
    body: [
      "田中様、いつもお世話になっております。ハイエデュテックのグエンです。",
      "先日ご相談した新しい教材について、来週の火曜日か木曜日にお打ち合わせをお願いできないでしょうか。",
      "オンラインでも構いません。ご都合のよい時間を二つほど教えていただけると助かります。",
      "なお、資料は前日までにメールでお送りしておきます。よろしくお願いいたします。",
    ],
    romaji: [
      "Tanaka-sama, itsumo osewa ni natte orimasu. HaiEduTech no Guen desu.",
      "Senjitsu gosōdan shita atarashii kyōzai ni tsuite, raishū no kayōbi ka mokuyōbi ni ouchiawase o onegai dekinai deshō ka.",
      "Onrain de mo kamaimasen. Gotsugō no yoi jikan o futatsu hodo oshiete itadakeru to tasukarimasu.",
      "Nao, shiryō wa zenjitsu made ni mēru de ookuri shite okimasu. Yoroshiku onegai itashimasu.",
    ],
    trans_vi: [
      "Kính gửi anh Tanaka, cảm ơn anh đã luôn giúp đỡ. Tôi là Nguyễn ở HaiEduTech.",
      "Về tài liệu mới đã trao đổi hôm trước, không biết tôi có thể xin một buổi họp vào thứ Ba hoặc thứ Năm tuần sau không?",
      "Họp trực tuyến cũng không sao. Nếu anh cho tôi khoảng hai khung giờ thuận tiện thì rất tốt.",
      "Ngoài ra, tài liệu tôi sẽ gửi email trước một ngày. Rất mong được anh giúp đỡ.",
    ],
    trans_en: [
      "Dear Mr Tanaka, thank you for your continued support. This is Nguyen from HaiEduTech.",
      "Regarding the new teaching materials we discussed, may I ask for a meeting next Tuesday or Thursday?",
      "Online is fine. It would help if you could give me about two convenient time slots.",
      "I will also email the materials the day before. Thank you very much.",
    ],
    vocab: [
      { jp: "打ち合わせ（うちあわせ）", romaji: "uchiawase", vi: "buổi họp bàn", en: "meeting, briefing" },
      { jp: "都合（つごう）", romaji: "tsugō", vi: "sự thuận tiện", en: "convenience" },
      { jp: "構いません（かまいません）", romaji: "kamaimasen", vi: "không sao cả", en: "it does not matter" },
      { jp: "なお", romaji: "nao", vi: "ngoài ra", en: "furthermore" },
    ],
    questions: [
      { q_vi: "Người viết đề nghị họp hôm nào?", q_en: "Which days are proposed?", options: ["Thứ Hai hoặc thứ Ba / Monday or Tuesday", "Thứ Tư hoặc thứ Sáu / Wednesday or Friday", "Thứ Ba hoặc thứ Năm tuần sau / next Tuesday or Thursday", "Cuối tuần / the weekend"], answer: 2, evidence: "来週の火曜日か木曜日にお打ち合わせをお願いできないでしょうか。", explain_vi: "火曜日か木曜日 = thứ Ba hoặc thứ Năm.", explain_en: "Tuesday or Thursday." },
      { q_vi: "Người viết xin điều gì từ anh Tanaka?", q_en: "What does the writer request?", options: ["Hai khung giờ thuận tiện / two convenient time slots", "Địa chỉ công ty / the office address", "Bản hợp đồng / a contract", "Số điện thoại / a phone number"], answer: 0, evidence: "ご都合のよい時間を二つほど教えていただけると助かります。", explain_vi: "時間を二つほど = khoảng hai khung giờ.", explain_en: "About two time slots." },
      { q_vi: "Tài liệu sẽ được gửi khi nào?", q_en: "When will the materials be sent?", options: ["Ngay hôm nay / today", "Trước ngày họp một ngày / the day before the meeting", "Sau buổi họp / after the meeting", "Không gửi / they will not be sent"], answer: 1, evidence: "資料は前日までにメールでお送りしておきます。", explain_vi: "前日までに = trước ngày hôm đó.", explain_en: "By the previous day." },
    ],
  },
  {
    id: "rd-06", level: "N3",
    title_vi: "Bài báo ngắn: làm việc từ xa", title_en: "Short article: remote work",
    body: [
      "ある調査によると、日本の会社員のうち約三割が週に一日以上、家で仕事をしている。",
      "通勤時間がなくなるため、家族と過ごす時間が増えたという声が多い。一方で、仕事と生活の区別がつきにくいという問題もある。",
      "専門家は「働く時間を決めて、終わったらパソコンを閉じることが大切だ」と話している。",
      "会社側も、成果で評価する仕組みを整える必要があるだろう。",
    ],
    romaji: [
      "Aru chōsa ni yoru to, Nihon no kaishain no uchi yaku sanwari ga shū ni ichinichi ijō, ie de shigoto o shite iru.",
      "Tsūkin jikan ga nakunaru tame, kazoku to sugosu jikan ga fueta to iu koe ga ōi. Ippō de, shigoto to seikatsu no kubetsu ga tsukinikui to iu mondai mo aru.",
      "Senmonka wa hataraku jikan o kimete, owattara pasokon o tojiru koto ga taisetsu da to hanashite iru.",
      "Kaisha-gawa mo, seika de hyōka suru shikumi o totonoeru hitsuyō ga aru darō.",
    ],
    trans_vi: [
      "Theo một khảo sát, khoảng 30% nhân viên công ty ở Nhật làm việc ở nhà từ một ngày mỗi tuần trở lên.",
      "Vì không mất thời gian đi lại, nhiều người nói thời gian bên gia đình tăng lên. Mặt khác, có vấn đề khó phân biệt công việc và sinh hoạt.",
      "Chuyên gia nói: quan trọng là ấn định giờ làm và đóng máy tính khi xong việc.",
      "Phía công ty cũng cần xây dựng cơ chế đánh giá theo kết quả.",
    ],
    trans_en: [
      "According to a survey, about thirty percent of Japanese company employees work from home at least one day a week.",
      "Since commuting disappears, many say time with family has increased. On the other hand, work and private life become hard to separate.",
      "Experts say it matters to fix working hours and close the laptop when done.",
      "Companies, too, will need systems that evaluate results.",
    ],
    vocab: [
      { jp: "調査（ちょうさ）", romaji: "chōsa", vi: "khảo sát", en: "survey" },
      { jp: "通勤（つうきん）", romaji: "tsūkin", vi: "đi làm", en: "commuting" },
      { jp: "区別（くべつ）", romaji: "kubetsu", vi: "sự phân biệt", en: "distinction" },
      { jp: "成果（せいか）", romaji: "seika", vi: "thành quả", en: "results" },
    ],
    questions: [
      { q_vi: "Bao nhiêu phần trăm làm việc ở nhà?", q_en: "What share work from home?", options: ["Khoảng 10% / about ten percent", "Khoảng 50% / about fifty percent", "Khoảng 70% / about seventy percent", "Khoảng 30% / about thirty percent"], answer: 3, evidence: "約三割が週に一日以上、家で仕事をしている。", explain_vi: "三割 = 30%.", explain_en: "三割 means thirty percent." },
      { q_vi: "Vấn đề được nêu là gì?", q_en: "What problem is mentioned?", options: ["Khó phân biệt công việc và sinh hoạt / difficulty separating work and life", "Internet chậm / slow internet", "Lương giảm / lower pay", "Thiếu chỗ ngồi / lack of desks"], answer: 0, evidence: "仕事と生活の区別がつきにくいという問題もある。", explain_vi: "区別がつきにくい = khó phân biệt.", explain_en: "Hard to distinguish." },
      { q_vi: "Chuyên gia khuyên gì?", q_en: "What do experts advise?", options: ["Làm thêm giờ / work overtime", "Ấn định giờ làm và đóng máy khi xong / set hours and close the laptop when done", "Đến công ty mỗi ngày / go to the office daily", "Đổi công việc / change jobs"], answer: 1, evidence: "働く時間を決めて、終わったらパソコンを閉じることが大切だ", explain_vi: "決めて ... 閉じる = ấn định và đóng máy.", explain_en: "Fix hours and shut the computer." },
    ],
  },
  {
    id: "rd-07", level: "N4",
    title_vi: "Hướng dẫn đổ rác", title_en: "Rubbish sorting guide",
    body: [
      "このマンションでは、ゴミを三つに分けます。燃えるゴミ、燃えないゴミ、資源ゴミです。",
      "燃えるゴミは月曜日と木曜日の朝八時までに出してください。ペットボトルとびんは水曜日です。",
      "ダンボールはひもでしばってから、資源ゴミの日に出します。夜のうちに出すと、カラスに荒らされることがあります。",
    ],
    romaji: [
      "Kono manshon de wa, gomi o mittsu ni wakemasu. Moeru gomi, moenai gomi, shigen gomi desu.",
      "Moeru gomi wa getsuyōbi to mokuyōbi no asa hachi-ji made ni dashite kudasai. Petto botoru to bin wa suiyōbi desu.",
      "Danbōru wa himo de shibatte kara, shigen gomi no hi ni dashimasu. Yoru no uchi ni dasu to, karasu ni arasareru koto ga arimasu.",
    ],
    trans_vi: [
      "Ở chung cư này, rác được chia làm ba loại: rác cháy được, rác không cháy được và rác tái chế.",
      "Rác cháy được xin bỏ trước 8 giờ sáng thứ Hai và thứ Năm. Chai nhựa và chai thuỷ tinh là thứ Tư.",
      "Thùng giấy phải buộc dây rồi bỏ vào ngày rác tái chế. Nếu bỏ từ đêm, có khi bị quạ phá.",
    ],
    trans_en: [
      "In this building rubbish is split into three: burnable, non-burnable and recyclable.",
      "Put burnable rubbish out by 8 a.m. on Monday and Thursday. Plastic bottles and glass go out on Wednesday.",
      "Tie cardboard with string and put it out on recycling day. If you put it out overnight, crows may tear it open.",
    ],
    vocab: [
      { jp: "分ける（わける）", romaji: "wakeru", vi: "phân loại", en: "to separate" },
      { jp: "資源（しげん）", romaji: "shigen", vi: "tài nguyên, tái chế", en: "resources, recyclables" },
      { jp: "しばる", romaji: "shibaru", vi: "buộc", en: "to tie" },
      { jp: "荒らす（あらす）", romaji: "arasu", vi: "phá, làm bừa", en: "to ravage" },
    ],
    questions: [
      { q_vi: "Chai nhựa bỏ hôm nào?", q_en: "When do plastic bottles go out?", options: ["Thứ Hai / Monday", "Thứ Tư / Wednesday", "Thứ Năm / Thursday", "Chủ nhật / Sunday"], answer: 1, evidence: "ペットボトルとびんは水曜日です。", explain_vi: "水曜日 = thứ Tư.", explain_en: "水曜日 means Wednesday." },
      { q_vi: "Thùng giấy cần làm gì trước khi bỏ?", q_en: "What must be done with cardboard first?", options: ["Cắt nhỏ / cut it up", "Cho vào túi nhựa / bag it", "Buộc bằng dây / tie it with string", "Rửa sạch / wash it"], answer: 2, evidence: "ダンボールはひもでしばってから", explain_vi: "ひもでしばってから = sau khi buộc dây.", explain_en: "After tying it with string." },
      { q_vi: "Vì sao không nên bỏ rác từ đêm?", q_en: "Why avoid putting rubbish out overnight?", options: ["Có thể bị quạ phá / crows may tear it open", "Trời tối khó thấy / it is dark", "Bị phạt tiền / there is a fine", "Xe rác đến sớm / the truck comes early"], answer: 0, evidence: "夜のうちに出すと、カラスに荒らされることがあります。", explain_vi: "カラスに荒らされる = bị quạ phá (bị động).", explain_en: "It may be ravaged by crows (passive)." },
    ],
  },
  {
    id: "rd-08", level: "N3",
    title_vi: "Nhật ký du học",
    title_en: "Study-abroad diary",
    body: [
      "日本に来て三か月が過ぎた。最初の一か月は、コンビニで買い物をするだけでも緊張していた。",
      "アルバイトを始めてから、話す機会が増えて、少しずつ自信がついてきた。店長は私の日本語をよく直してくれる。",
      "先週は、初めて敬語で電話を取ることができた。うまくはなかったが、相手が「ゆっくりで大丈夫ですよ」と言ってくれた。",
      "来年は日本語能力試験のN3に合格したい。そのために、毎日新しい言葉を五つ覚えることにした。",
    ],
    romaji: [
      "Nihon ni kite sankagetsu ga sugita. Saisho no ikkagetsu wa, konbini de kaimono o suru dake de mo kinchō shite ita.",
      "Arubaito o hajimete kara, hanasu kikai ga fuete, sukoshi zutsu jishin ga tsuite kita. Tenchō wa watashi no nihongo o yoku naoshite kureru.",
      "Senshū wa, hajimete keigo de denwa o toru koto ga dekita. Umaku wa nakatta ga, aite ga yukkuri de daijōbu desu yo to itte kureta.",
      "Rainen wa Nihongo Nōryoku Shiken no N3 ni gōkaku shitai. Sono tame ni, mainichi atarashii kotoba o itsutsu oboeru koto ni shita.",
    ],
    trans_vi: [
      "Đã ba tháng kể từ khi tôi sang Nhật. Tháng đầu, chỉ mua hàng ở cửa hàng tiện lợi thôi tôi cũng căng thẳng.",
      "Từ khi làm thêm, cơ hội nói tăng lên và tôi dần tự tin hơn. Anh quản lý thường sửa tiếng Nhật cho tôi.",
      "Tuần trước, lần đầu tôi nghe điện thoại bằng kính ngữ. Không giỏi lắm, nhưng người bên kia nói: nói chậm cũng không sao.",
      "Sang năm tôi muốn đỗ N3 của kỳ thi năng lực tiếng Nhật. Vì thế, tôi quyết định mỗi ngày học năm từ mới.",
    ],
    trans_en: [
      "Three months have passed since I came to Japan. In the first month even shopping at a convenience store made me nervous.",
      "Since starting a part-time job I speak more and have gradually gained confidence. My manager often corrects my Japanese.",
      "Last week I answered the phone in honorific language for the first time. It was not smooth, but the caller said slowly is fine.",
      "Next year I want to pass N3 of the Japanese Language Proficiency Test, so I decided to learn five new words a day.",
    ],
    vocab: [
      { jp: "緊張（きんちょう）", romaji: "kinchō", vi: "căng thẳng", en: "nervousness" },
      { jp: "自信（じしん）", romaji: "jishin", vi: "sự tự tin", en: "confidence" },
      { jp: "直す（なおす）", romaji: "naosu", vi: "sửa", en: "to correct" },
      { jp: "合格（ごうかく）", romaji: "gōkaku", vi: "đỗ, đậu", en: "to pass an exam" },
    ],
    questions: [
      { q_vi: "Nhờ đâu người viết tự tin hơn?", q_en: "What built the writer's confidence?", options: ["Nhờ đi làm thêm nên nói nhiều hơn / speaking more thanks to a part-time job", "Nhờ học ở trường / classes at school", "Nhờ xem phim / watching films", "Nhờ bạn cùng phòng / a roommate"], answer: 0, evidence: "アルバイトを始めてから、話す機会が増えて、少しずつ自信がついてきた。", explain_vi: "アルバイトを始めてから ... 自信がついてきた.", explain_en: "Confidence came after starting the job." },
      { q_vi: "Tuần trước người viết làm được gì?", q_en: "What did the writer manage last week?", options: ["Viết email dài / write a long email", "Nghe điện thoại bằng kính ngữ / answer the phone in honorific Japanese", "Dịch tài liệu / translate a document", "Thuyết trình / give a presentation"], answer: 1, evidence: "初めて敬語で電話を取ることができた。", explain_vi: "敬語で電話を取る = nghe điện thoại bằng kính ngữ.", explain_en: "Answering the phone using keigo." },
      { q_vi: "Kế hoạch học từ mới thế nào?", q_en: "What is the vocabulary plan?", options: ["Ba từ mỗi tuần / three words a week", "Mười từ mỗi ngày / ten words a day", "Năm từ mỗi ngày / five words a day", "Không có kế hoạch / no plan"], answer: 2, evidence: "毎日新しい言葉を五つ覚えることにした。", explain_vi: "毎日 ... 五つ = mỗi ngày năm từ.", explain_en: "Five words every day." },
    ],
  },
];
