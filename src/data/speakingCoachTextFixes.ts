/**
 * @file speakingCoachTextFixes.ts
 * @description Rewrites practice sentences whose text duplicated another
 * sentence in the same language. Keys are the FINAL (post-dedupe) sentence ids,
 * so applying these fixes never changes an id - saved scores and progress stay
 * attached to the same sentence.
 */

interface FixableSentence {
  id: string;
  text: string;
  translation: string;
  ipa?: string;
}

interface FixableTheme {
  sentences: FixableSentence[];
}

type TextFix = { text: string; translation: string; ipa?: string };

export const speakingCoachTextFixes: Record<string, TextFix> = {
  // English
  "tu-en-em5": {
    text: "Please call an ambulance right away.",
    translation: "Hãy gọi xe cấp cứu ngay lập tức.",
  },
  "tu-en-sh1": {
    text: "Could you give me a small discount?",
    translation: "Anh/chị giảm giá một chút được không?",
  },
  "en-health-v3--en-h1": {
    text: "The doctor advised me to rest for a few days.",
    translation: "Bác sĩ khuyên tôi nghỉ ngơi vài ngày.",
  },
  "en-health-v3--en-h5": {
    text: "Regular exercise helps me sleep much better.",
    translation: "Tập thể dục đều đặn giúp tôi ngủ ngon hơn nhiều.",
  },
  "en4-t2": {
    text: "Many companies now use chatbots to answer customer questions.",
    translation: "Nhiều công ty hiện dùng chatbot để trả lời câu hỏi của khách.",
  },
  "en6-fa1": {
    text: "My cousin and I grew up in the same neighbourhood.",
    translation: "Tôi và anh họ lớn lên trong cùng một khu phố.",
  },
  "en6-fa2": {
    text: "My best friend always supports me when I feel stressed.",
    translation: "Người bạn thân nhất luôn ủng hộ tôi khi tôi căng thẳng.",
  },

  // Finnish
  "tu-fi-re4": {
    text: "Onko teillä kasvisruokia?",
    translation: "Nhà hàng có món chay không?",
  },
  "fi-shex1": {
    text: "Missä on kassa?",
    translation: "Quầy thu ngân ở đâu?",
  },
  "fi-shex2": {
    text: "Saanko kuitin, kiitos?",
    translation: "Cho tôi xin hóa đơn nhé.",
  },
  "tu-fi-se2": {
    text: "Onko teillä tätä isommassa koossa?",
    translation: "Cái này có cỡ lớn hơn không?",
  },
  "fi-m1": {
    text: "Haluaisin vaihtaa rahaa euroiksi.",
    translation: "Tôi muốn đổi tiền sang euro.",
  },
  "fi-m2": {
    text: "Säästän joka kuukausi pienen summan.",
    translation: "Mỗi tháng tôi tiết kiệm một khoản nhỏ.",
  },
  "fi-shadv5": {
    text: "Vertailen hintoja ennen kuin ostan mitään.",
    translation: "Tôi so sánh giá trước khi mua bất cứ thứ gì.",
  },
  "fi-hadv2": {
    text: "Minulla on ollut kuumetta parin päivän ajan.",
    translation: "Tôi bị sốt đã hai ngày nay.",
  },
  "fi-bh7": {
    text: "Minulla on kipeä kurkku.",
    translation: "Tôi bị đau họng.",
  },
  "fi-bh8": {
    text: "Menen aina aikaisin nukkumaan.",
    translation: "Tôi luôn đi ngủ sớm.",
  },
  "fi5-t2": {
    text: "Käytän puhelinta lähes kaikkeen työssäni.",
    translation: "Tôi dùng điện thoại cho hầu hết công việc của mình.",
  },
  "tu-fi-te2": {
    text: "Opettelen uusia ohjelmia verkkokursseilla.",
    translation: "Tôi học các phần mềm mới qua khóa học trực tuyến.",
  },
  "tu-fi-ed2": {
    text: "Opiskelen suomea kolme kertaa viikossa.",
    translation: "Tôi học tiếng Phần Lan ba lần mỗi tuần.",
  },
  "fi5-c5": {
    text: "Juhannusta juhlitaan kokkojen äärellä.",
    translation: "Lễ giữa hè được tổ chức bên những đống lửa.",
  },

  // Chinese
  "tu-zh-re1": {
    text: "服务员，请过来一下。",
    translation: "Bạn phục vụ ơi, qua đây một chút.",
    ipa: "fú wù yuán, qǐng guò lái yí xià",
  },
  "zh-hb1": {
    text: "我周末喜欢打羽毛球。",
    translation: "Cuối tuần tôi thích chơi cầu lông.",
    ipa: "Wǒ zhōumò xǐhuān dǎ yǔmáoqiú.",
  },
  "zh-m1": {
    text: "请问哪里可以取钱？",
    translation: "Xin hỏi rút tiền ở đâu được?",
    ipa: "Qǐngwèn nǎlǐ kěyǐ qǔ qián?",
  },
};

export function applySpeakingTextFixes<T extends FixableTheme>(themes: T[]): T[] {
  return themes.map((theme) => {
    let changed = false;
    const sentences = theme.sentences.map((sentence) => {
      const fix = speakingCoachTextFixes[sentence.id];
      if (!fix) return sentence;
      changed = true;
      return {
        ...sentence,
        text: fix.text,
        translation: fix.translation,
        ...(fix.ipa ? { ipa: fix.ipa } : {}),
      };
    });
    return changed ? ({ ...theme, sentences } as T) : theme;
  });
}
