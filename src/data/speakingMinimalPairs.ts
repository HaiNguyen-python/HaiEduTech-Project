// Minimal-pair sound drills per language. The learner says the highlighted
// word; the recogniser result decides which of the two words was heard.
export interface MinimalPair {
  id: string;
  sound: string; // label of the contrast, e.g. "/ɪ/ vs /iː/"
  a: string;
  b: string;
  aIpa?: string;
  bIpa?: string;
  tipVi: string;
  tipEn: string;
}

const english: MinimalPair[] = [
  { id: "en-mp1", sound: "/ɪ/ vs /iː/", a: "ship", b: "sheep", aIpa: "/ʃɪp/", bIpa: "/ʃiːp/", tipVi: "/ɪ/ ngắn, môi thả lỏng; /iː/ dài, môi kéo ngang.", tipEn: "/ɪ/ is short and relaxed; /iː/ is long with spread lips." },
  { id: "en-mp2", sound: "/ɪ/ vs /iː/", a: "fill", b: "feel", aIpa: "/fɪl/", bIpa: "/fiːl/", tipVi: "Giữ nguyên âm dài hơn cho 'feel'.", tipEn: "Hold the vowel longer for 'feel'." },
  { id: "en-mp3", sound: "/θ/ vs /t/", a: "thin", b: "tin", aIpa: "/θɪn/", bIpa: "/tɪn/", tipVi: "Đặt đầu lưỡi giữa hai hàng răng cho /θ/.", tipEn: "Put your tongue tip between your teeth for /θ/." },
  { id: "en-mp4", sound: "/θ/ vs /s/", a: "think", b: "sink", aIpa: "/θɪŋk/", bIpa: "/sɪŋk/", tipVi: "/s/ luồng hơi qua rãnh lưỡi, /θ/ qua răng.", tipEn: "/s/ hisses along the tongue groove, /θ/ over the teeth." },
  { id: "en-mp5", sound: "/l/ vs /r/", a: "light", b: "right", aIpa: "/laɪt/", bIpa: "/raɪt/", tipVi: "/l/ chạm lưỡi vào nướu, /r/ lưỡi cuộn không chạm.", tipEn: "/l/ touches the gum ridge, /r/ curls without touching." },
  { id: "en-mp6", sound: "/v/ vs /b/", a: "very", b: "berry", aIpa: "/ˈvɛri/", bIpa: "/ˈbɛri/", tipVi: "/v/ răng trên chạm môi dưới, /b/ hai môi.", tipEn: "/v/ is teeth on lip, /b/ is lip on lip." },
  { id: "en-mp7", sound: "/æ/ vs /e/", a: "bad", b: "bed", aIpa: "/bæd/", bIpa: "/bɛd/", tipVi: "/æ/ mở miệng rộng hơn.", tipEn: "Open your mouth wider for /æ/." },
  { id: "en-mp8", sound: "/ʃ/ vs /s/", a: "she", b: "see", aIpa: "/ʃiː/", bIpa: "/siː/", tipVi: "/ʃ/ tròn môi, lưỡi lùi về sau.", tipEn: "Round your lips and pull the tongue back for /ʃ/." },
  { id: "en-mp9", sound: "final /d/ vs /t/", a: "hard", b: "heart", aIpa: "/hɑːrd/", bIpa: "/hɑːrt/", tipVi: "Âm cuối /d/ rung, /t/ không rung.", tipEn: "Final /d/ is voiced, /t/ is voiceless." },
  { id: "en-mp10", sound: "/ʌ/ vs /ɑː/", a: "cut", b: "cart", aIpa: "/kʌt/", bIpa: "/kɑːrt/", tipVi: "/ʌ/ ngắn và trung tính, /ɑː/ dài mở.", tipEn: "/ʌ/ is short and central, /ɑː/ is long and open." },
  { id: "en-mp11", sound: "/w/ vs /v/", a: "wine", b: "vine", aIpa: "/waɪn/", bIpa: "/vaɪn/", tipVi: "/w/ chỉ tròn môi, không chạm răng.", tipEn: "/w/ only rounds the lips, no teeth contact." },
  { id: "en-mp12", sound: "/n/ vs /ŋ/", a: "thin", b: "thing", aIpa: "/θɪn/", bIpa: "/θɪŋ/", tipVi: "/ŋ/ âm mũi phía sau, lưỡi không chạm nướu.", tipEn: "/ŋ/ is nasal at the back, tongue tip stays down." },
];

const chinese: MinimalPair[] = [
  { id: "zh-mp1", sound: "shi vs si", a: "是", b: "四", aIpa: "shì", bIpa: "sì", tipVi: "shi cuộn lưỡi, si lưỡi phẳng.", tipEn: "shi is retroflex, si is flat." },
  { id: "zh-mp2", sound: "zhi vs zi", a: "只", b: "字", aIpa: "zhǐ", bIpa: "zì", tipVi: "zh cuộn lưỡi lên vòm.", tipEn: "zh curls the tongue up." },
  { id: "zh-mp3", sound: "chi vs ci", a: "吃", b: "词", aIpa: "chī", bIpa: "cí", tipVi: "ch bật hơi kèm cuộn lưỡi.", tipEn: "ch is aspirated and retroflex." },
  { id: "zh-mp4", sound: "tone 1 vs tone 4", a: "妈", b: "骂", aIpa: "mā", bIpa: "mà", tipVi: "Thanh 1 giữ cao đều, thanh 4 hạ mạnh.", tipEn: "Tone 1 stays high, tone 4 falls sharply." },
  { id: "zh-mp5", sound: "tone 2 vs tone 3", a: "麻", b: "马", aIpa: "má", bIpa: "mǎ", tipVi: "Thanh 2 lên, thanh 3 xuống rồi lên.", tipEn: "Tone 2 rises, tone 3 dips then rises." },
  { id: "zh-mp6", sound: "j vs zh", a: "鸡", b: "知", aIpa: "jī", bIpa: "zhī", tipVi: "j lưỡi trước, zh lưỡi cuộn.", tipEn: "j is front, zh is retroflex." },
  { id: "zh-mp7", sound: "n vs ng", a: "安", b: "昂", aIpa: "ān", bIpa: "áng", tipVi: "ng đóng ở cuống lưỡi.", tipEn: "ng closes at the back of the tongue." },
  { id: "zh-mp8", sound: "u vs ü", a: "路", b: "绿", aIpa: "lù", bIpa: "lǜ", tipVi: "ü tròn môi nhưng lưỡi trước.", tipEn: "ü rounds the lips with a front tongue." },
  { id: "zh-mp9", sound: "b vs p", a: "爸", b: "怕", aIpa: "bà", bIpa: "pà", tipVi: "p bật hơi mạnh.", tipEn: "p is strongly aspirated." },
  { id: "zh-mp10", sound: "d vs t", a: "大", b: "太", aIpa: "dà", bIpa: "tài", tipVi: "t bật hơi, d không.", tipEn: "t is aspirated, d is not." },
];

const japanese: MinimalPair[] = [
  { id: "ja-mp1", sound: "short vs long vowel", a: "おじさん", b: "おじいさん", aIpa: "ojisan", bIpa: "ojiisan", tipVi: "Trường âm dài gấp đôi.", tipEn: "The long vowel lasts twice as long." },
  { id: "ja-mp2", sound: "short vs long vowel", a: "ここ", b: "こうこう", aIpa: "koko", bIpa: "koukou", tipVi: "Giữ nguyên âm đủ 2 nhịp.", tipEn: "Hold the vowel for two beats." },
  { id: "ja-mp3", sound: "small tsu", a: "きて", b: "きって", aIpa: "kite", bIpa: "kitte", tipVi: "Âm ngắt là một nhịp im lặng.", tipEn: "The small tsu is one silent beat." },
  { id: "ja-mp4", sound: "small tsu", a: "さか", b: "さっか", aIpa: "saka", bIpa: "sakka", tipVi: "Dừng hơi trước phụ âm đôi.", tipEn: "Stop the air before the double consonant." },
  { id: "ja-mp5", sound: "r vs d", a: "ろく", b: "どく", aIpa: "roku", bIpa: "doku", tipVi: "R Nhật là một cú chạm nhẹ, D là đóng hoàn toàn.", tipEn: "Japanese r is a single light tap, d is a full closure." },
  { id: "ja-mp6", sound: "tsu vs su", a: "つき", b: "すき", aIpa: "tsuki", bIpa: "suki", tipVi: "tsu bắt đầu bằng t.", tipEn: "tsu starts with a t closure." },
  { id: "ja-mp7", sound: "long vowel meaning", a: "びょういん", b: "びよういん", aIpa: "byouin (hospital)", bIpa: "biyouin (salon)", tipVi: "Trường âm đổi hẳn nghĩa.", tipEn: "Vowel length changes the whole meaning." },
  { id: "ja-mp8", sound: "long o", a: "とる", b: "とおる", aIpa: "toru", bIpa: "tooru", tipVi: "Nghe rõ độ dài của o.", tipEn: "Listen for the length of the o." },
  { id: "ja-mp9", sound: "n before vowel", a: "きんえん", b: "きねん", aIpa: "kin'en", bIpa: "kinen", tipVi: "ん là một nhịp riêng.", tipEn: "ん takes its own beat." },
  { id: "ja-mp10", sound: "pitch accent", a: "はし (chopsticks)", b: "はし (bridge)", aIpa: "hashi (HA-shi)", bIpa: "hashi (ha-SHI)", tipVi: "Cao độ quyết định nghĩa.", tipEn: "Pitch decides the meaning." },
];

const finnish: MinimalPair[] = [
  { id: "fi-mp1", sound: "single vs double consonant", a: "tuli", b: "tulli", tipVi: "Phụ âm đôi giữ lâu hơn.", tipEn: "Hold the double consonant longer." },
  { id: "fi-mp2", sound: "single vs double vowel", a: "tuli", b: "tuuli", tipVi: "uu dài gấp đôi.", tipEn: "uu lasts twice as long." },
  { id: "fi-mp3", sound: "u vs y", a: "suu", b: "syy", tipVi: "y là u tròn môi nhưng lưỡi trước.", tipEn: "y is a rounded u with a front tongue." },
  { id: "fi-mp4", sound: "a vs ä", a: "kansa", b: "känsä", tipVi: "ä mở và trước hơn (kansa = dân, känsä = chai tay).", tipEn: "ä is more open and front (kansa = people, känsä = callus)." },
  { id: "fi-mp5", sound: "e vs ä", a: "veri", b: "väri", tipVi: "ä mở hơn e (veri = máu, väri = màu).", tipEn: "ä is more open than e (veri = blood, väri = colour)." },
  { id: "fi-mp6", sound: "double k", a: "kuka", b: "kukka", tipVi: "kk có khoảng dừng ngắn.", tipEn: "kk has a short hold." },
  { id: "fi-mp7", sound: "double t", a: "mato", b: "matto", tipVi: "tt dài rõ.", tipEn: "tt is clearly longer." },
  { id: "fi-mp8", sound: "short vs long vowel", a: "muta", b: "muuta", tipVi: "uu giữ hai nhịp (muta = bùn, muuta = khác).", tipEn: "uu takes two beats (muta = mud, muuta = other)." },
  { id: "fi-mp9", sound: "s vs ss", a: "kasa", b: "kassa", tipVi: "ss dài hơn hẳn.", tipEn: "ss is noticeably longer." },
  { id: "fi-mp10", sound: "vowel harmony", a: "talossa", b: "kylässä", tipVi: "Từ có a/o/u dùng -ssa, từ có ä/ö/y dùng -ssä.", tipEn: "Words with a/o/u take -ssa, words with ä/ö/y take -ssä." },
];

const swedish: MinimalPair[] = [
  { id: "sv-mp1", sound: "sj- vs tj-", a: "sju", b: "tjugo", tipVi: "sj- là hơi sâu, tj- là ch nhẹ.", tipEn: "sj- is a deep breathy sound, tj- is a light ch." },
  { id: "sv-mp2", sound: "u vs y", a: "full", b: "fyll", tipVi: "y tròn môi chặt hơn u.", tipEn: "y has tighter lip rounding than u." },
  { id: "sv-mp3", sound: "long vs short vowel", a: "vit", b: "vitt", tipVi: "Nguyên âm ngắn khi có phụ âm đôi.", tipEn: "The vowel shortens before a double consonant." },
  { id: "sv-mp4", sound: "ä vs ö", a: "läsa", b: "lösa", tipVi: "läsa = đọc, lösa = giải quyết.", tipEn: "läsa = read, lösa = solve." },
  { id: "sv-mp5", sound: "å vs o", a: "får", b: "for", tipVi: "får = con cừu, for = đã đi.", tipEn: "får = sheep, for = went." },
  { id: "sv-mp6", sound: "short vs long vowel", a: "glas", b: "glass", tipVi: "glas = cái ly, glass = kem.", tipEn: "glas = a glass, glass = ice cream." },
  { id: "sv-mp7", sound: "sk- before front vowel", a: "sked", b: "skada", tipVi: "sk trước e/i đọc như sj.", tipEn: "sk before e/i sounds like sj." },
  { id: "sv-mp8", sound: "retroflex rs", a: "kors", b: "kos", tipVi: "rs hòa thành âm sh nhẹ (kors = cây thánh giá).", tipEn: "rs merges into a soft sh (kors = cross)." },
  { id: "sv-mp9", sound: "pitch accent", a: "anden (the duck)", b: "anden (the spirit)", tipVi: "Trọng âm kép đổi nghĩa.", tipEn: "The double accent changes the meaning." },
  { id: "sv-mp10", sound: "g soft vs hard", a: "ge", b: "gata", tipVi: "g trước e/i đọc như 'y'.", tipEn: "g before e/i sounds like 'y'." },
];

const vietnamese: MinimalPair[] = [
  { id: "vi-mp1", sound: "thanh ngang vs thanh huyền", a: "ma", b: "mà", tipVi: "Thanh huyền hạ thấp và nhẹ.", tipEn: "The huyen tone falls low and soft." },
  { id: "vi-mp2", sound: "thanh sắc vs thanh hỏi", a: "má", b: "mả", tipVi: "Thanh hỏi xuống rồi lên.", tipEn: "The hoi tone dips then rises." },
  { id: "vi-mp3", sound: "thanh ngã vs thanh sắc", a: "mã", b: "má", tipVi: "Thanh ngã có ngắt giọng.", tipEn: "The nga tone has a glottal break." },
  { id: "vi-mp4", sound: "thanh nặng", a: "mạ", b: "ma", tipVi: "Thanh nặng ngắn và đóng.", tipEn: "The nang tone is short and closed." },
  { id: "vi-mp5", sound: "tr vs ch", a: "trà", b: "chà", tipVi: "tr cuộn lưỡi, ch lưỡi phẳng.", tipEn: "tr curls the tongue, ch is flat." },
  { id: "vi-mp6", sound: "s vs x", a: "sa", b: "xa", tipVi: "s cuộn nhẹ, x như 's' tiếng Anh.", tipEn: "s is retroflex, x is like English s." },
  { id: "vi-mp7", sound: "d vs gi", a: "da", b: "gia", tipVi: "Miền Bắc đọc gần nhau, chú ý ngữ cảnh.", tipEn: "Northern speech merges these - use context." },
  { id: "vi-mp8", sound: "n vs ng cuối", a: "ban", b: "bang", tipVi: "ng đóng ở cuống lưỡi.", tipEn: "ng closes at the back." },
  { id: "vi-mp9", sound: "t vs c cuối", a: "mát", b: "mác", tipVi: "Âm cuối t ở đầu lưỡi.", tipEn: "Final t is at the tongue tip." },
  { id: "vi-mp10", sound: "ê vs e", a: "bê", b: "be", tipVi: "ê hẹp hơn, e mở hơn.", tipEn: "ê is closer, e is more open." },
];

export const speakingMinimalPairs: Record<string, MinimalPair[]> = {
  english,
  chinese,
  japanese,
  finnish,
  swedish,
  vietnamese,
};
