/**
 * @file ykiB1GrammarExpansion3.ts
 * @description B1 grammar expansion #3 - reported speech, comparative/superlative
 *              and connectors used in YKI B1 writing/listening sections.
 * @author Teacher Hai (HaiEduTech)
 */

import type { B1GrammarModule, B1GrammarPoint } from "./ykiB1Grammar";

const advancedDiscourse: B1GrammarPoint[] = [
  {
    id: "g-reported-speech",
    emoji: "🗨️",
    titleFi: "Epäsuora esitys",
    titleEn: "Reported speech",
    titleVi: "Lời nói gián tiếp",
    explanationFi: "Käytetään, kun kerrotaan mitä joku on sanonut. Pääverbi: sanoa, kertoa, kysyä + että-lause.",
    explanationEn: "Used to report what someone said. Main verb (sanoa/kertoa/kysyä) + että-clause.",
    explanationVi: "Dùng khi tường thuật điều ai đó đã nói: sanoa/kertoa/kysyä + mệnh đề 'että'.",
    formula: "Hän sanoi, että + lause   (Hän kysyi, tulenko mukaan.)",
    examples: [
      { fi: "Anna sanoi, että hän on väsynyt.", en: "Anna said that she is tired.", vi: "Anna nói rằng cô ấy mệt." },
      { fi: "Opettaja kertoi, että koe on huomenna.", en: "The teacher said the exam is tomorrow.", vi: "Giáo viên nói bài thi vào ngày mai." },
      { fi: "Hän kysyi, missä asun.", en: "He asked where I live.", vi: "Anh ấy hỏi tôi sống ở đâu." },
    ],
    teacherTipEn: "In Finnish the tense usually stays the same when reporting - unlike English back-shifting.",
    teacherTipVi: "Khác tiếng Anh, thì trong câu gián tiếp tiếng Phần thường giữ nguyên.",
  },
  {
    id: "g-comparative",
    emoji: "📊",
    titleFi: "Vertailumuodot",
    titleEn: "Comparative & superlative",
    titleVi: "So sánh hơn / nhất",
    explanationFi: "Komparatiivi (-mpi) kuvaa 'enemmän kuin', superlatiivi (-in) kuvaa 'eniten'.",
    explanationEn: "Comparative (-mpi) = 'more than'; superlative (-in) = 'the most'.",
    explanationVi: "So sánh hơn (-mpi); so sánh nhất (-in).",
    formula: "adj + -mpi → komparatiivi    |    adj + -in → superlatiivi",
    examples: [
      { fi: "Helsinki on suurempi kuin Tampere.", en: "Helsinki is bigger than Tampere.", vi: "Helsinki lớn hơn Tampere." },
      { fi: "Tämä on paras ravintola kaupungissa.", en: "This is the best restaurant in town.", vi: "Đây là nhà hàng ngon nhất thành phố." },
      { fi: "Pohjoinen on kylmin osa Suomea.", en: "The north is the coldest part of Finland.", vi: "Phía Bắc là vùng lạnh nhất Phần Lan." },
    ],
    teacherTipEn: "Irregular: hyvä → parempi → paras; pitkä → pidempi → pisin.",
    teacherTipVi: "Bất quy tắc: hyvä → parempi → paras; pitkä → pidempi → pisin.",
  },
  {
    id: "g-connectors",
    emoji: "🔗",
    titleFi: "Sidesanat ja konnektorit",
    titleEn: "Conjunctions & connectors",
    titleVi: "Liên từ và từ nối",
    explanationFi: "Konnektorit yhdistävät virkkeitä ja antavat tekstille luonnollisen rakenteen YKI-kirjoituksessa.",
    explanationEn: "Connectors link sentences and give your YKI writing a natural flow.",
    explanationVi: "Từ nối kết câu, giúp bài viết YKI mạch lạc.",
    formula: "koska (because) · vaikka (although) · siksi (therefore) · kuitenkin (however) · lisäksi (in addition)",
    examples: [
      { fi: "En tullut, koska sain flunssan.", en: "I didn't come because I got the flu.", vi: "Tôi không đến vì bị cúm." },
      { fi: "Vaikka oli kylmä, menimme ulos.", en: "Although it was cold, we went out.", vi: "Dù trời lạnh, chúng tôi vẫn ra ngoài." },
      { fi: "Sade jatkui, siksi peruimme retken.", en: "The rain continued, so we cancelled the trip.", vi: "Mưa kéo dài nên chúng tôi huỷ chuyến đi." },
      { fi: "Hän on lahjakas. Lisäksi hän on ahkera.", en: "He is talented. In addition, he is diligent.", vi: "Anh ấy tài năng. Hơn nữa, rất chăm chỉ." },
    ],
    teacherTipEn: "YKI examiners reward variety: aim for at least 3 different connectors per paragraph.",
    teacherTipVi: "Giám khảo YKI đánh giá cao sự đa dạng - dùng tối thiểu 3 từ nối khác nhau mỗi đoạn.",
  },
];

export const B1_GRAMMAR_EXPANSION_MODULES_3: B1GrammarModule[] = [
  {
    id: "grammar3-discourse",
    emoji: "🧩",
    titleFi: "Lauseiden yhdistäminen",
    titleEn: "Linking sentences",
    titleVi: "Liên kết câu",
    description: "Reported speech, comparison and discourse connectors.",
    descriptionVi: "Lời gián tiếp, so sánh, từ nối.",
    points: advancedDiscourse,
  },
];
