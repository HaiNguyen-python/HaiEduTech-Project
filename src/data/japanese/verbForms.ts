/**
 * @file verbForms.ts
 * @description Verb conjugation bank for the Verb Trainer: 40 common verbs with
 *  every core form, plus the form labels used by the drill.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export type JaVerbGroup = "1" | "2" | "irregular";

export type JaVerbFormKey =
  | "masu" | "te" | "ta" | "nai" | "potential" | "volitional" | "passive" | "causative" | "imperative" | "ba";

export interface JaVerb {
  dict: string;
  kana: string;
  romaji: string;
  vi: string;
  en: string;
  group: JaVerbGroup;
  forms: Record<JaVerbFormKey, string>;
}

export const JA_VERB_FORM_LABELS: Array<{ key: JaVerbFormKey; vi: string; en: string; hint_vi: string; hint_en: string }> = [
  { key: "masu", vi: "Thể ます (lịch sự)", en: "ます form (polite)", hint_vi: "Nhóm 1: う → います. Nhóm 2: る → ます.", hint_en: "Group 1: う → います. Group 2: drop る, add ます." },
  { key: "te", vi: "Thể て", en: "て form", hint_vi: "Dùng để nối câu, nhờ vả, đang làm.", hint_en: "Used to link clauses, request, and form the progressive." },
  { key: "ta", vi: "Thể た (quá khứ)", en: "た form (past)", hint_vi: "Cùng biến đổi như thể て, đổi て thành た.", hint_en: "Same change as て, with て becoming た." },
  { key: "nai", vi: "Thể ない (phủ định)", en: "ない form (negative)", hint_vi: "Nhóm 1: う → あない. Nhóm 2: る → ない.", hint_en: "Group 1: う → あない. Group 2: drop る, add ない." },
  { key: "potential", vi: "Thể khả năng", en: "Potential form", hint_vi: "Nhóm 1: う → える. Nhóm 2: る → られる.", hint_en: "Group 1: う → える. Group 2: る → られる." },
  { key: "volitional", vi: "Thể ý chí", en: "Volitional form", hint_vi: "Nhóm 1: う → おう. Nhóm 2: る → よう.", hint_en: "Group 1: う → おう. Group 2: る → よう." },
  { key: "passive", vi: "Thể bị động", en: "Passive form", hint_vi: "Nhóm 1: う → あれる. Nhóm 2: る → られる.", hint_en: "Group 1: う → あれる. Group 2: る → られる." },
  { key: "causative", vi: "Thể sai bảo", en: "Causative form", hint_vi: "Nhóm 1: う → あせる. Nhóm 2: る → させる.", hint_en: "Group 1: う → あせる. Group 2: る → させる." },
  { key: "imperative", vi: "Thể mệnh lệnh", en: "Imperative form", hint_vi: "Chỉ dùng khi thân mật hoặc trong biển báo.", hint_en: "Only for close friends, coaching or signage." },
  { key: "ba", vi: "Thể điều kiện ば", en: "Conditional ば", hint_vi: "Nhóm 1: う → えば. Nhóm 2: る → れば.", hint_en: "Group 1: う → えば. Group 2: る → れば." },
];

const v = (
  dict: string, kana: string, romaji: string, vi: string, en: string, group: JaVerbGroup,
  forms: [string, string, string, string, string, string, string, string, string, string],
): JaVerb => ({
  dict, kana, romaji, vi, en, group,
  forms: {
    masu: forms[0], te: forms[1], ta: forms[2], nai: forms[3], potential: forms[4],
    volitional: forms[5], passive: forms[6], causative: forms[7], imperative: forms[8], ba: forms[9],
  },
});

export const JA_VERBS: JaVerb[] = [
  v("書く", "かく", "kaku", "viết", "to write", "1", ["書きます", "書いて", "書いた", "書かない", "書ける", "書こう", "書かれる", "書かせる", "書け", "書けば"]),
  v("読む", "よむ", "yomu", "đọc", "to read", "1", ["読みます", "読んで", "読んだ", "読まない", "読める", "読もう", "読まれる", "読ませる", "読め", "読めば"]),
  v("飲む", "のむ", "nomu", "uống", "to drink", "1", ["飲みます", "飲んで", "飲んだ", "飲まない", "飲める", "飲もう", "飲まれる", "飲ませる", "飲め", "飲めば"]),
  v("話す", "はなす", "hanasu", "nói", "to speak", "1", ["話します", "話して", "話した", "話さない", "話せる", "話そう", "話される", "話させる", "話せ", "話せば"]),
  v("待つ", "まつ", "matsu", "đợi", "to wait", "1", ["待ちます", "待って", "待った", "待たない", "待てる", "待とう", "待たれる", "待たせる", "待て", "待てば"]),
  v("買う", "かう", "kau", "mua", "to buy", "1", ["買います", "買って", "買った", "買わない", "買える", "買おう", "買われる", "買わせる", "買え", "買えば"]),
  v("行く", "いく", "iku", "đi", "to go", "1", ["行きます", "行って", "行った", "行かない", "行ける", "行こう", "行かれる", "行かせる", "行け", "行けば"]),
  v("帰る", "かえる", "kaeru", "về", "to return home", "1", ["帰ります", "帰って", "帰った", "帰らない", "帰れる", "帰ろう", "帰られる", "帰らせる", "帰れ", "帰れば"]),
  v("泳ぐ", "およぐ", "oyogu", "bơi", "to swim", "1", ["泳ぎます", "泳いで", "泳いだ", "泳がない", "泳げる", "泳ごう", "泳がれる", "泳がせる", "泳げ", "泳げば"]),
  v("遊ぶ", "あそぶ", "asobu", "chơi", "to play", "1", ["遊びます", "遊んで", "遊んだ", "遊ばない", "遊べる", "遊ぼう", "遊ばれる", "遊ばせる", "遊べ", "遊べば"]),
  v("死ぬ", "しぬ", "shinu", "chết", "to die", "1", ["死にます", "死んで", "死んだ", "死なない", "死ねる", "死のう", "死なれる", "死なせる", "死ね", "死ねば"]),
  v("作る", "つくる", "tsukuru", "làm, chế tạo", "to make", "1", ["作ります", "作って", "作った", "作らない", "作れる", "作ろう", "作られる", "作らせる", "作れ", "作れば"]),
  v("使う", "つかう", "tsukau", "dùng", "to use", "1", ["使います", "使って", "使った", "使わない", "使える", "使おう", "使われる", "使わせる", "使え", "使えば"]),
  v("работать".slice(0, 0) + "手伝う", "てつだう", "tetsudau", "giúp đỡ", "to help", "1", ["手伝います", "手伝って", "手伝った", "手伝わない", "手伝える", "手伝おう", "手伝われる", "手伝わせる", "手伝え", "手伝えば"]),
  v("急ぐ", "いそぐ", "isogu", "gấp, nhanh", "to hurry", "1", ["急ぎます", "急いで", "急いだ", "急がない", "急げる", "急ごう", "急がれる", "急がせる", "急げ", "急げば"]),
  v("休む", "やすむ", "yasumu", "nghỉ", "to rest", "1", ["休みます", "休んで", "休んだ", "休まない", "休める", "休もう", "休まれる", "休ませる", "休め", "休めば"]),
  v("洗う", "あらう", "arau", "rửa, giặt", "to wash", "1", ["洗います", "洗って", "洗った", "洗わない", "洗える", "洗おう", "洗われる", "洗わせる", "洗え", "洗えば"]),
  v("運ぶ", "はこぶ", "hakobu", "vận chuyển", "to carry", "1", ["運びます", "運んで", "運んだ", "運ばない", "運べる", "運ぼう", "運ばれる", "運ばせる", "運べ", "運べば"]),
  v("直す", "なおす", "naosu", "sửa", "to fix", "1", ["直します", "直して", "直した", "直さない", "直せる", "直そう", "直される", "直させる", "直せ", "直せば"]),
  v("送る", "おくる", "okuru", "gửi", "to send", "1", ["送ります", "送って", "送った", "送らない", "送れる", "送ろう", "送られる", "送らせる", "送れ", "送れば"]),
  v("頑張る", "がんばる", "ganbaru", "cố gắng", "to do one's best", "1", ["頑張ります", "頑張って", "頑張った", "頑張らない", "頑張れる", "頑張ろう", "頑張られる", "頑張らせる", "頑張れ", "頑張れば"]),
  v("見る", "みる", "miru", "xem, nhìn", "to see", "2", ["見ます", "見て", "見た", "見ない", "見られる", "見よう", "見られる", "見させる", "見て", "見れば"]),
  v("食べる", "たべる", "taberu", "ăn", "to eat", "2", ["食べます", "食べて", "食べた", "食べない", "食べられる", "食べよう", "食べられる", "食べさせる", "食べて", "食べれば"]),
  v("起きる", "おきる", "okiru", "thức dậy", "to get up", "2", ["起きます", "起きて", "起きた", "起きない", "起きられる", "起きよう", "起きられる", "起きさせる", "起きて", "起きれば"]),
  v("寝る", "ねる", "neru", "ngủ", "to sleep", "2", ["寝ます", "寝て", "寝た", "寝ない", "寝られる", "寝よう", "寝られる", "寝させる", "寝て", "寝れば"]),
  v("教える", "おしえる", "oshieru", "dạy", "to teach", "2", ["教えます", "教えて", "教えた", "教えない", "教えられる", "教えよう", "教えられる", "教えさせる", "教えて", "教えれば"]),
  v("覚える", "おぼえる", "oboeru", "ghi nhớ", "to memorise", "2", ["覚えます", "覚えて", "覚えた", "覚えない", "覚えられる", "覚えよう", "覚えられる", "覚えさせる", "覚えて", "覚えれば"]),
  v("開ける", "あける", "akeru", "mở", "to open", "2", ["開けます", "開けて", "開けた", "開けない", "開けられる", "開けよう", "開けられる", "開けさせる", "開けて", "開ければ"]),
  v("閉める", "しめる", "shimeru", "đóng", "to close", "2", ["閉めます", "閉めて", "閉めた", "閉めない", "閉められる", "閉めよう", "閉められる", "閉めさせる", "閉めて", "閉めれば"]),
  v("借りる", "かりる", "kariru", "vay, mượn", "to borrow", "2", ["借ります", "借りて", "借りた", "借りない", "借りられる", "借りよう", "借りられる", "借りさせる", "借りて", "借りれば"]),
  v("降りる", "おりる", "oriru", "xuống (xe)", "to get off", "2", ["降ります", "降りて", "降りた", "降りない", "降りられる", "降りよう", "降りられる", "降りさせる", "降りて", "降りれば"]),
  v("片付ける", "かたづける", "katazukeru", "dọn dẹp", "to tidy up", "2", ["片付けます", "片付けて", "片付けた", "片付けない", "片付けられる", "片付けよう", "片付けられる", "片付けさせる", "片付けて", "片付ければ"]),
  v("集める", "あつめる", "atsumeru", "thu thập", "to collect", "2", ["集めます", "集めて", "集めた", "集めない", "集められる", "集めよう", "集められる", "集めさせる", "集めて", "集めれば"]),
  v("調べる", "しらべる", "shiraberu", "tra cứu", "to look up", "2", ["調べます", "調べて", "調べた", "調べない", "調べられる", "調べよう", "調べられる", "調べさせる", "調べて", "調べれば"]),
  v("届ける", "とどける", "todokeru", "khai báo, giao", "to deliver, to report", "2", ["届けます", "届けて", "届けた", "届けない", "届けられる", "届けよう", "届けられる", "届けさせる", "届けて", "届ければ"]),
  v("する", "する", "suru", "làm", "to do", "irregular", ["します", "して", "した", "しない", "できる", "しよう", "される", "させる", "しろ", "すれば"]),
  v("来る", "くる", "kuru", "đến", "to come", "irregular", ["来ます", "来て", "来た", "来ない", "来られる", "来よう", "来られる", "来させる", "来い", "来れば"]),
  v("勉強する", "べんきょうする", "benkyō suru", "học", "to study", "irregular", ["勉強します", "勉強して", "勉強した", "勉強しない", "勉強できる", "勉強しよう", "勉強される", "勉強させる", "勉強しろ", "勉強すれば"]),
  v("持ってくる", "もってくる", "motte kuru", "mang đến", "to bring", "irregular", ["持ってきます", "持ってきて", "持ってきた", "持ってこない", "持ってこられる", "持ってこよう", "持ってこられる", "持ってこさせる", "持ってこい", "持ってくれば"]),
  v("연습".slice(0, 0) + "電話する", "でんわする", "denwa suru", "gọi điện", "to phone", "irregular", ["電話します", "電話して", "電話した", "電話しない", "電話できる", "電話しよう", "電話される", "電話させる", "電話しろ", "電話すれば"]),
];
