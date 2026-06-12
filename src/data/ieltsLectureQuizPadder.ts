/**
 * @file ieltsLectureQuizPadder.ts
 * @description Guarantees every IELTS lecture exposes ≥5 quiz questions.
 *
 * Many legacy lectures were authored with only 1–4 questions. Instead of
 * hand-editing 190+ records, we derive additional questions from existing
 * lecture fields (goldenSecret, cheatSheetPoints, strategySteps,
 * mistakesToAvoid, practicalExamples, vocabHighlights). The result is a
 * lecture-specific, never-empty quiz tail.
 */
import type { IeltsLecture, LectureQuizQuestion } from "./ieltsLecturesData";

const TARGET = 5;

const truncate = (s: string, n = 140) => (s && s.length > n ? s.slice(0, n - 1) + "…" : s);

function generic(distractorSet: string[][]): string[] {
  // Pick 3 distractors deterministically – first option from each row.
  return distractorSet.slice(0, 3).map(row => row[0]);
}

function buildExtras(l: IeltsLecture, need: number): LectureQuizQuestion[] {
  const out: LectureQuizQuestion[] = [];

  if (l.goldenSecret && out.length < need) {
    out.push({
      question: `Bí quyết VÀNG (Golden Secret) của bài "${l.title}" nhấn mạnh điều gì?`,
      options: [
        truncate(l.goldenSecret),
        "Học thuộc một bài mẫu duy nhất rồi áp dụng cho mọi đề thi.",
        "Bỏ qua bước lập dàn ý để có thêm thời gian viết/nói.",
        "Sao chép nguyên văn câu hỏi vào câu trả lời.",
      ],
      answer: 0,
      explanation: l.goldenSecretVi || l.goldenSecret,
    });
  }

  if (l.cheatSheetPoints?.length && out.length < need) {
    out.push({
      question: "Đâu là điểm chốt quan trọng trong Cheat Sheet của bài học này?",
      options: [
        truncate(l.cheatSheetPoints[0]),
        "Luôn nhồi nhét càng nhiều idiom càng tốt, kể cả khi không phù hợp.",
        "Viết câu trả lời thật ngắn gọn để tránh mọi lỗi ngữ pháp.",
        "Tránh đưa ví dụ cụ thể vì sợ mất thời gian.",
      ],
      answer: 0,
      explanation: "Điểm này được liệt kê trực tiếp trong phần Cheat Sheet của bài giảng.",
    });
  }

  if (l.mistakesToAvoid?.length && out.length < need) {
    const m = l.mistakesToAvoid[0];
    out.push({
      question: "Đâu là LỖI cần tránh theo bài học này?",
      options: [
        truncate(m.mistake),
        "Lập dàn ý ngắn 60-90 giây trước khi viết hoặc nói.",
        "Dùng từ nối đa dạng giữa các câu để tăng coherence.",
        "Đưa ra ví dụ cụ thể để minh họa cho quan điểm của mình.",
      ],
      answer: 0,
      explanation: m.whyVi || m.why,
    });
  }

  if (l.strategySteps?.length && out.length < need) {
    const s = l.strategySteps[0];
    out.push({
      question: "Bước chiến lược ĐẦU TIÊN trong bài học này là gì?",
      options: [
        truncate(`${s.title} - ${s.description}`),
        "Bắt đầu viết/nói ngay lập tức để tiết kiệm thời gian.",
        "Học thuộc một bài mẫu cố định cho mọi đề.",
        "Bỏ qua đề bài và trả lời dựa trên cảm tính.",
      ],
      answer: 0,
      explanation: s.descriptionVi || s.description,
    });
  }

  if (l.vocabHighlights?.length && out.length < need) {
    const v = l.vocabHighlights[0];
    out.push({
      question: `Từ "${v.word}" trong bài giảng được dùng với nghĩa gì?`,
      options: [
        truncate(v.definition),
        "Một từ lóng chỉ dùng trong giao tiếp suồng sã hằng ngày.",
        "Một thuật ngữ chuyên ngành y khoa, không phù hợp IELTS.",
        "Một thán từ thể hiện cảm xúc ngạc nhiên.",
      ],
      answer: 0,
      explanation: `${v.word} - ${v.definitionVi || v.definition} (Band ${v.band || "7.0+"}).`,
    });
  }

  if (l.practicalExamples?.length && out.length < need) {
    const e = l.practicalExamples[0];
    out.push({
      question: "Ví dụ thực tế trong bài được đặt trong bối cảnh nào?",
      options: [
        truncate(e.context),
        "Chỉ áp dụng cho thí sinh đã đạt Band 9.0.",
        "Chỉ áp dụng cho phần Listening Section 1 mà thôi.",
        "Chỉ áp dụng cho học sinh phổ thông, không cho IELTS.",
      ],
      answer: 0,
      explanation: e.explanation || "Bối cảnh thực tế giúp bạn hình dung cách áp dụng kỹ thuật.",
    });
  }

  // Final safety filler – ensure we always reach TARGET.
  while (out.length < need) {
    out.push({
      question: `Theo bài giảng "${l.title}", đâu là cách tiếp cận hiệu quả nhất?`,
      options: [
        "Áp dụng đúng quy trình và khung được nêu trong bài, kết hợp luyện tập có ý thức.",
        "Học vẹt câu trả lời mẫu rồi tái sử dụng cho mọi đề.",
        "Bỏ qua chiến lược và làm theo cảm tính cá nhân.",
        "Chỉ tập trung học từ vựng, bỏ qua kỹ năng còn lại.",
      ],
      answer: 0,
      explanation:
        l.goldenSecretVi ||
        l.goldenSecret ||
        "Áp dụng đúng khung của bài + luyện có ý thức là cách lên Band bền vững nhất.",
    });
  }

  return out.slice(0, need);
}

export function padLectureQuizzes(lectures: IeltsLecture[]): IeltsLecture[] {
  return lectures.map(l => {
    const current = l.quiz?.length || 0;
    if (current >= TARGET) return l;
    const need = TARGET - current;
    const seenQ = new Set((l.quiz || []).map(q => q.question));
    const extras = buildExtras(l, need + 2).filter(q => !seenQ.has(q.question)).slice(0, need);
    return { ...l, quiz: [...(l.quiz || []), ...extras] };
  });
}
