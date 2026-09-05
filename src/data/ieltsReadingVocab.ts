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
    { word: "emancipate", pos: "v", meaningVi: "giải phóng", exampleEn: "She said the bicycle would emancipate women." },
  ],
  "rx-4": [
    { word: "symbiosis", pos: "n", ipa: "/ˌsɪmbaɪˈəʊsɪs/", meaningVi: "quan hệ cộng sinh", exampleEn: "The coral's success rests on a symbiosis with algae." },
    { word: "secretes", pos: "v", meaningVi: "tiết ra", exampleEn: "Each polyp secretes a calcium-carbonate skeleton." },
    { word: "heat-tolerant", pos: "adj", meaningVi: "chịu được nhiệt", exampleEn: "Scientists are breeding heat-tolerant corals." },
    { word: "transplanting", pos: "n", meaningVi: "việc cấy ghép", exampleEn: "Transplanting fragments can restore damaged reefs." },
  ],
  "rx-5": [
    { word: "telecommuting", pos: "n", meaningVi: "làm việc từ xa (qua viễn thông)", exampleEn: "An engineer coined the word telecommuting in the 1970s." },
    { word: "centralised", pos: "adj", meaningVi: "tập trung một chỗ", exampleEn: "Factories created centralised workplaces." },
    { word: "supervision", pos: "n", meaningVi: "sự giám sát", exampleEn: "Managers believed productivity required physical supervision." },
    { word: "burnout", pos: "n", meaningVi: "sự kiệt sức vì công việc", exampleEn: "Some remote workers reported more burnout." },
  ],
  "rx-cam-1": [
    { word: "glymphatic", pos: "adj", meaningVi: "hệ thải độc não (glymphatic)", exampleEn: "The glymphatic system clears waste during sleep." },
    { word: "cerebrospinal", pos: "adj", meaningVi: "dịch não tủy", exampleEn: "Cerebrospinal fluid flows more freely in deep sleep." },
    { word: "beta-amyloid", pos: "n", meaningVi: "protein beta-amyloid", exampleEn: "Beta-amyloid is implicated in Alzheimer's disease." },
  ],
  "rx-cam-2": [
    { word: "hydroponic", pos: "adj", meaningVi: "thủy canh", exampleEn: "Hydroponic systems deliver nutrients in water." },
    { word: "closed-loop", pos: "adj", meaningVi: "tuần hoàn kín", exampleEn: "Closed-loop recirculation cuts water use." },
    { word: "staples", pos: "n", meaningVi: "cây lương thực chủ lực", exampleEn: "Staples are still cheaper grown conventionally." },
  ],
};
