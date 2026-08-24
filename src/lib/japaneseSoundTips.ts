/**
 * @file japaneseSoundTips.ts
 * @description Japanese pronunciation coaching helpers for the Speaking Coach.
 *  Detects the sound patterns Vietnamese learners most often get wrong in a
 *  sentence and returns short bilingual tips.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export interface JapaneseSoundTip {
  id: string;
  symbol: string;
  labelVi: string;
  labelEn: string;
  tipVi: string;
  tipEn: string;
}

interface Rule extends JapaneseSoundTip {
  test: (text: string) => boolean;
}

const has = (re: RegExp) => (text: string) => re.test(text);

const RULES: Rule[] = [
  {
    id: "sokuon",
    symbol: "っ / ッ",
    labelVi: "Âm ngắt (sokuon)",
    labelEn: "Small tsu (sokuon)",
    tipVi: "Nín hơi đúng một nhịp trước phụ âm sau: がっこう đọc \"gak-kou\", ちょっと đọc \"chot-to\". Bỏ nhịp này là sai nghĩa.",
    tipEn: "Hold a full silent beat before the next consonant: がっこう is \"gak-kou\", ちょっと is \"chot-to\". Skipping the beat changes the word.",
    test: has(/[っッ]/),
  },
  {
    id: "chouon",
    symbol: "ー / おう / えい",
    labelVi: "Trường âm (2 nhịp)",
    labelEn: "Long vowels (2 beats)",
    tipVi: "Kéo nguyên âm đủ 2 nhịp: せんせい = \"sensee\", とうきょう = \"tookyoo\". Đọc ngắn sẽ thành từ khác (こうこう vs ここ).",
    tipEn: "Stretch the vowel for two beats: せんせい = \"sensee\", とうきょう = \"tookyoo\". A short vowel makes a different word.",
    test: has(/[ー]|おう|こう|そう|とう|ょう|えい|せい|ゅう|うう/),
  },
  {
    id: "moraic-n",
    symbol: "ん",
    labelVi: "Âm mũi ん",
    labelEn: "Moraic n (ん)",
    tipVi: "ん là một nhịp riêng. Trước b/p/m đọc như \"m\" (しんぶん → shim-bun), trước k/g đọc như \"ng\" (にほんご → nihong-go).",
    tipEn: "ん is its own beat: like \"m\" before b/p/m (しんぶん → shim-bun) and like \"ng\" before k/g (にほんご → nihong-go).",
    test: has(/ん/),
  },
  {
    id: "fu",
    symbol: "ふ",
    labelVi: "Âm ふ (fu)",
    labelEn: "The ふ sound",
    tipVi: "Không dùng răng như \"f\" tiếng Anh. Chụm môi và thổi nhẹ như thổi nến: ふ gần \"hu\" hơn \"phu\".",
    tipEn: "Do not use your teeth like English \"f\". Round the lips and blow gently, closer to \"hu\" than \"foo\".",
    test: has(/[ふフ]/),
  },
  {
    id: "r-sound",
    symbol: "ら り る れ ろ",
    labelVi: "Âm r (một lần đập lưỡi)",
    labelEn: "Japanese r (single tap)",
    tipVi: "Đặt đầu lưỡi chạm nhẹ nướu trên một lần, giống \"l\" pha \"d\" - đừng rung như \"r\" tiếng Việt.",
    tipEn: "Tap the tongue tip once on the ridge behind the teeth - between English \"l\" and \"d\", never a rolled r.",
    test: has(/[らりるれろラリルレロ]/),
  },
  {
    id: "desu",
    symbol: "です / ます",
    labelVi: "Giảm âm cuối",
    labelEn: "Devoiced endings",
    tipVi: "です đọc \"des\", ます đọc \"mas\" - nguyên âm u gần như tắt. Đừng đọc rõ \"de-su\".",
    tipEn: "です sounds like \"des\" and ます like \"mas\" - the final u is nearly silent, not \"de-su\".",
    test: has(/(です|ます)/),
  },
  {
    id: "shi-chi",
    symbol: "し / ち / じ",
    labelVi: "Âm xì mềm",
    labelEn: "Soft sibilants",
    tipVi: "し nhẹ hơn \"shi\" tiếng Anh, ち gần \"chi\", じ gần \"ji\" - lưỡi phẳng, không bật hơi mạnh.",
    tipEn: "し is softer than English \"shi\", ち is close to \"chi\", じ to \"ji\" - flat tongue, no strong puff.",
    test: has(/[しちじシチジ]/),
  },
  {
    id: "pitch",
    symbol: "↗↘",
    labelVi: "Trọng âm cao thấp",
    labelEn: "Pitch accent",
    tipVi: "Tiếng Nhật không nhấn mạnh như tiếng Anh: giữ âm lượng đều và chỉ đổi cao độ. Câu kể hạ giọng ở cuối, câu hỏi か nâng nhẹ.",
    tipEn: "Japanese does not stress loudly: keep the volume even and move the pitch instead. Statements fall at the end, か questions rise slightly.",
    test: () => true,
  },
  {
    id: "question-ka",
    symbol: "か？",
    labelVi: "Ngữ điệu câu hỏi",
    labelEn: "Question intonation",
    tipVi: "Kết thúc bằng か thì nâng cao độ nhẹ ở âm cuối, không kéo dài như tiếng Việt.",
    tipEn: "When a sentence ends in か, lift the pitch slightly on the last mora without dragging it out.",
    test: has(/か[。？?]?\s*$/),
  },
];

/** Returns up to `max` pronunciation tips relevant to the sentence. */
export function japaneseSoundTipsFor(text: string, max = 2): JapaneseSoundTip[] {
  const matched = RULES.filter((r) => r.test(text));
  // Keep the specific rules first; the generic pitch rule is the fallback.
  const specific = matched.filter((r) => r.id !== "pitch");
  const ordered = specific.length > 0 ? specific : matched;
  return ordered.slice(0, max).map(({ test, ...tip }) => tip);
}
