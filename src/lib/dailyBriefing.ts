/**
 * @file dailyBriefing.ts
 * @description Helpers for the single daily briefing popup shown after login:
 *              contextual Vietnamese motivation lines, activity labels and
 *              relative-time formatting.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export type BriefingMood = "empty" | "pending" | "deadline" | "allDone";

const MOTIVATION: Record<BriefingMood, string[]> = {
  empty: [
    "Hôm nay chưa có bài tập nào, vậy thì tự tặng mình một bài học nhỏ nhé!",
    "Không có bài tập vẫn học được: 10 từ mới hôm nay là một thắng lợi.",
    "Thầy Hải gợi ý: mở một bài luyện nghe ngắn và bắt đầu thật nhẹ nhàng.",
    "Ngày rảnh là ngày vàng để ôn lại những gì đã học.",
    "Học vì mình, không vì điểm. Bắt đầu 15 phút thôi!",
    "Mỗi ngày một chút, một năm sau bạn sẽ bất ngờ về chính mình.",
  ],
  pending: [
    "Mỗi bài hôm nay là một bước gần hơn tới mục tiêu của bạn!",
    "Học đều mỗi ngày, kết quả sẽ tự đến.",
    "Thầy Hải tin bạn làm được. Cùng chinh phục nhé!",
    "Kỷ luật hôm nay, tự do ngày mai. Bắt đầu nào!",
    "Bắt đầu là phần khó nhất, và bạn đang ở đây rồi!",
    "Làm xong một bài thôi, cảm giác sẽ rất khác.",
    "Bạn không cần hoàn hảo, bạn chỉ cần bắt đầu.",
    "Não bạn thích được thử thách. Cho nó một bài tập nhé!",
    "Học chậm mà đều vẫn nhanh hơn học dồn rồi bỏ.",
    "Một bài hôm nay bằng ba bài lúc sát hạn. Cùng làm nhé!",
    "Tiến bộ nhỏ vẫn là tiến bộ. Cứ tiến lên!",
    "Bạn đang xây một phiên bản giỏi hơn của chính mình.",
  ],
  deadline: [
    "Có bài sắp tới hạn rồi, làm sớm để tối nay ngủ ngon nhé!",
    "Hạn nộp đang tới gần. Xử lý ngay cho nhẹ đầu!",
    "Làm trước deadline một ngày, bạn sẽ thấy mình rất bản lĩnh.",
    "Thầy Hải nhắc nhẹ: bài sắp tới hạn đang chờ bạn.",
    "Hoàn thành sớm, còn thời gian để kiểm tra lại cho chắc.",
    "Đừng để deadline chạy theo bạn, hãy chạy trước nó!",
  ],
  allDone: [
    "Tuyệt vời! Bạn đã hoàn thành hết bài tập tháng này!",
    "Xuất sắc! Thầy Hải rất tự hào về bạn!",
    "Sạch bài tập! Giờ là lúc học thêm phần mình thích.",
    "Bạn vừa chứng minh mình làm được. Giữ đà nhé!",
    "Hoàn thành 100%: đúng chuẩn học sinh bản lĩnh!",
    "Nghỉ một chút rồi quay lại, bạn xứng đáng được khen!",
  ],
};

/** Stable per-day pick so re-renders do not shuffle the text. */
export const pickMotivation = (mood: BriefingMood, date = new Date()) => {
  const pool = MOTIVATION[mood];
  const dayIndex = Math.floor(date.getTime() / 86_400_000);
  return pool[dayIndex % pool.length];
};

export const ACTIVITY_LABELS: Record<string, string> = {
  ielts_lecture_quiz: "IELTS Quiz",
  toeic_lecture_quiz: "TOEIC Quiz",
  cambridge_lecture_quiz: "Cambridge Quiz",
  language_quiz: "Quiz ngôn ngữ",
  python_challenge: "Thử thách Python",
  vocab_mastery: "Từ vựng đã thuộc",
  vocab_mastered: "Từ vựng đã thuộc",
  vocab_mastered_group: "Từ vựng đã thuộc",
  speaking_coach_group: "Speaking Coach",
  writing_practice: "Luyện viết",
  speaking_practice: "Luyện nói",
  conv_chinese: "Hội thoại Tiếng Trung",
  conv_chinese_exercise: "Bài tập Tiếng Trung",
  conv_english: "Hội thoại Tiếng Anh",
  conv_english_exercise: "Bài tập Tiếng Anh",
  thpt_exam: "Thi thử THPT",
  ielts_writing: "IELTS Writing",
  ielts_speaking: "IELTS Speaking",
  ielts_vocab: "IELTS Vocab",
  hsk_vocab: "HSK Vocab",
};

export const activityLabel = (type: string) =>
  ACTIVITY_LABELS[type] ?? type.replace(/_/g, " ");

export const timeAgoVi = (dateStr: string, now = Date.now()) => {
  const mins = Math.floor((now - new Date(dateStr).getTime()) / 60000);
  if (mins < 1) return "vừa xong";
  if (mins < 60) return `${mins} phút trước`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  return `${days} ngày trước`;
};
