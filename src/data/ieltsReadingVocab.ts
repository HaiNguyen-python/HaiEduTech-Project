/**
 * @file ieltsReadingVocab.ts
 * @description Curated key vocabulary for every IELTS reading exam.
 *   Shown to the student after submitting an exam, and savable to their
 *   personal notebook under the title "IELTS Reading Vocabulary".
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export interface ReadingVocabItem {
  word: string;
  pos?: string;          // part of speech: n, v, adj, adv...
  ipa?: string;
  meaningVi: string;
  exampleEn?: string;
}

export const READING_VOCAB: Record<string, ReadingVocabItem[]> = {
  "rx-1": [
    { word: "renewable", pos: "adj", ipa: "/rɪˈnjuːəbl/", meaningVi: "tái tạo (được)", exampleEn: "Renewable energy overtook coal in 2023." },
    { word: "photovoltaic", pos: "adj", ipa: "/ˌfəʊtəʊvɒlˈteɪɪk/", meaningVi: "quang điện (chuyển ánh sáng thành điện)", exampleEn: "Solar photovoltaic capacity grew by 32%." },
    { word: "intermittent", pos: "adj", ipa: "/ˌɪntəˈmɪtənt/", meaningVi: "không liên tục, chập chờn", exampleEn: "Wind and solar are intermittent sources." },
    { word: "emboldened", pos: "v (past)", meaningVi: "được tiếp thêm dũng khí", exampleEn: "Public sentiment has emboldened politicians." },
    { word: "deploy (at scale)", pos: "v", meaningVi: "triển khai (quy mô lớn)", exampleEn: "These technologies have not been deployed at scale." },
    { word: "disproportionately", pos: "adv", ipa: "/ˌdɪsprəˈpɔːʃənətli/", meaningVi: "một cách không cân xứng", exampleEn: "Costs may fall disproportionately on the poor." },
    { word: "tariff", pos: "n", meaningVi: "biểu giá / thuế quan", exampleEn: "Governments must redesign electricity tariffs." },
    { word: "outlay", pos: "n", ipa: "/ˈaʊtleɪ/", meaningVi: "khoản chi (ban đầu)", exampleEn: "Long-term savings outweigh the initial outlay." },
  ],
  "rx-2": [
    { word: "governed (by)", pos: "v", meaningVi: "bị chi phối bởi", exampleEn: "Sleep was governed by sunlight." },
    { word: "sever", pos: "v", ipa: "/ˈsevə/", meaningVi: "cắt đứt", exampleEn: "Artificial lighting severed the ancient connection." },
    { word: "industrialised", pos: "adj", meaningVi: "đã công nghiệp hóa", exampleEn: "Adults in industrialised societies sleep less." },
    { word: "consolidation", pos: "n", meaningVi: "sự củng cố (ký ức)", exampleEn: "Sleep loss impairs memory consolidation." },
    { word: "intoxication", pos: "n", meaningVi: "tình trạng say (rượu/chất)", exampleEn: "Effects comparable to mild alcohol intoxication." },
    { word: "stubbornly", pos: "adv", meaningVi: "một cách dai dẳng/cứng đầu", exampleEn: "Sleep remains stubbornly undervalued." },
    { word: "alarmist", pos: "adj", meaningVi: "gây hoang mang quá mức", exampleEn: "Some find his language unnecessarily alarmist." },
    { word: "non-negotiable", pos: "adj", meaningVi: "không thể thương lượng", exampleEn: "Sleep is biologically non-negotiable." },
  ],
  "rx-3": [
    { word: "propelled", pos: "v", meaningVi: "được đẩy đi", exampleEn: "Running machines were propelled by pushing feet." },
    { word: "decisive", pos: "adj", meaningVi: "mang tính quyết định", exampleEn: "The decisive breakthrough came in 1864." },
    { word: "boneshaker", pos: "n", meaningVi: "xe đạp rung lắc (biệt danh cũ)", exampleEn: "The new design was nicknamed 'boneshaker'." },
    { word: "preserve (of)", pos: "n", meaningVi: "đặc quyền của ai", exampleEn: "Cycling was the preserve of athletic young men." },
    { word: "nimble", pos: "adj", meaningVi: "nhanh nhẹn, linh hoạt", exampleEn: "The safety bicycle was nimble and stable." },
  ],
  "rx-4": [
    { word: "ubiquitous", pos: "adj", ipa: "/juːˈbɪkwɪtəs/", meaningVi: "có mặt khắp nơi", exampleEn: "Smartphones are now ubiquitous." },
    { word: "displace", pos: "v", meaningVi: "thay thế, di dời", exampleEn: "New tech displaces older industries." },
    { word: "ostensibly", pos: "adv", meaningVi: "bề ngoài là", exampleEn: "The app was ostensibly free." },
    { word: "scrutiny", pos: "n", meaningVi: "sự xem xét kỹ", exampleEn: "Platforms face growing regulatory scrutiny." },
  ],
  "rx-5": [
    { word: "biodiversity", pos: "n", meaningVi: "đa dạng sinh học", exampleEn: "Coral reefs host immense biodiversity." },
    { word: "resilience", pos: "n", meaningVi: "khả năng phục hồi", exampleEn: "Ecosystem resilience is declining." },
    { word: "mitigation", pos: "n", meaningVi: "sự giảm thiểu", exampleEn: "Mitigation strategies require global cooperation." },
    { word: "exacerbate", pos: "v", ipa: "/ɪɡˈzæsəbeɪt/", meaningVi: "làm trầm trọng hơn", exampleEn: "Pollution exacerbates climate stress." },
  ],
  "rx-cam-1": [
    { word: "exemplify", pos: "v", meaningVi: "minh họa điển hình", exampleEn: "This case exemplifies the broader trend." },
    { word: "incremental", pos: "adj", meaningVi: "tăng dần, từng bước", exampleEn: "Progress was incremental but steady." },
    { word: "compelling", pos: "adj", meaningVi: "thuyết phục, hấp dẫn", exampleEn: "The evidence is compelling." },
  ],
  "rx-cam-2": [
    { word: "discrepancy", pos: "n", meaningVi: "sự khác biệt/chênh lệch", exampleEn: "There is a discrepancy in the data." },
    { word: "underpin", pos: "v", meaningVi: "làm nền tảng cho", exampleEn: "Trust underpins democratic institutions." },
    { word: "plausible", pos: "adj", meaningVi: "có vẻ hợp lý", exampleEn: "A plausible explanation was offered." },
  ],
};
