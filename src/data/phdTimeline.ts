/**
 * @file phdTimeline.ts
 * @description 12-month PhD application timeline with bilingual tasks per month.
 * @author HaiEduTech
 */

export interface PhdTimelineMonth {
  month: number; // T-12 ... T-1
  labelEn: string;
  labelVi: string;
  icon: string;
  taskEn: string;
  taskVi: string;
  detailEn: string;
  detailVi: string;
}

export const PHD_TIMELINE: PhdTimelineMonth[] = [
  { month: 12, labelEn: "Month T-12", labelVi: "Tháng T-12", icon: "🎯",
    taskEn: "Define your research niche", taskVi: "Khoanh vùng đề tài nghiên cứu",
    detailEn: "Pick 2–3 keywords you can defend for the next 4 years.",
    detailVi: "Chọn 2–3 từ khoá em có thể bảo vệ trong 4 năm tới." },
  { month: 11, labelEn: "Month T-11", labelVi: "Tháng T-11", icon: "🗺️",
    taskEn: "Map 25–40 candidate supervisors", taskVi: "Lập danh sách 25–40 supervisor tiềm năng",
    detailEn: "Use Google Scholar + lab websites; tag by country + funding signal.",
    detailVi: "Dùng Google Scholar + web lab; gắn tag theo quốc gia + tín hiệu funding." },
  { month: 10, labelEn: "Month T-10", labelVi: "Tháng T-10", icon: "📚",
    taskEn: "Read their 3 latest papers", taskVi: "Đọc 3 paper mới nhất của họ",
    detailEn: "Write a 5-line note per paper: question, method, gap.",
    detailVi: "Ghi 5 dòng mỗi paper: câu hỏi, phương pháp, lỗ hổng." },
  { month: 9, labelEn: "Month T-9", labelVi: "Tháng T-9", icon: "📝",
    taskEn: "Take IELTS / TOEFL / GRE", taskVi: "Thi IELTS / TOEFL / GRE",
    detailEn: "Target IELTS 7.0 / TOEFL 100 / GRE 320 if needed.",
    detailVi: "Mục tiêu IELTS 7.0 / TOEFL 100 / GRE 320 nếu cần." },
  { month: 8, labelEn: "Month T-8", labelVi: "Tháng T-8", icon: "✉️",
    taskEn: "First cold email batch (10)", taskVi: "Đợt cold email đầu (10 supervisor)",
    detailEn: "Use the AI Cold Email Studio below; track replies in a sheet.",
    detailVi: "Dùng AI Cold Email Studio bên dưới; theo dõi reply trong sheet." },
  { month: 7, labelEn: "Month T-7", labelVi: "Tháng T-7", icon: "🧪",
    taskEn: "Build research proposal v0.1", taskVi: "Viết bản proposal v0.1",
    detailEn: "Use the 7-step Builder; aim for 1500–2000 words.",
    detailVi: "Dùng Builder 7 bước; nhắm 1500–2000 từ." },
  { month: 6, labelEn: "Month T-6", labelVi: "Tháng T-6", icon: "🤝",
    taskEn: "Refine 2 LoR relationships", taskVi: "Vun đắp 2 mối quan hệ LoR",
    detailEn: "Share your proposal with recommenders; brief them.",
    detailVi: "Chia sẻ proposal với người viết LoR; brief rõ ràng." },
  { month: 5, labelEn: "Month T-5", labelVi: "Tháng T-5", icon: "🪞",
    taskEn: "Get supervisor commitment signals", taskVi: "Lấy tín hiệu commitment từ supervisor",
    detailEn: "Aim for at least one Zoom interview; ask 'Are you taking students?'",
    detailVi: "Có ít nhất 1 cuộc Zoom; hỏi thẳng 'Are you taking students?'." },
  { month: 4, labelEn: "Month T-4", labelVi: "Tháng T-4", icon: "📄",
    taskEn: "Polish SOP / motivation / proposal", taskVi: "Hoàn thiện SOP / motivation / proposal",
    detailEn: "3 editing rounds — peer + mentor + professional editor.",
    detailVi: "3 vòng edit — peer + mentor + biên tập chuyên nghiệp." },
  { month: 3, labelEn: "Month T-3", labelVi: "Tháng T-3", icon: "🚀",
    taskEn: "Submit applications", taskVi: "Nộp hồ sơ",
    detailEn: "Apply to 6–10 programs; double-check deadlines per country.",
    detailVi: "Apply 6–10 chương trình; check kỹ deadline từng nước." },
  { month: 2, labelEn: "Month T-2", labelVi: "Tháng T-2", icon: "🎤",
    taskEn: "Prepare for interviews", taskVi: "Chuẩn bị phỏng vấn",
    detailEn: "Mock with mentor; rehearse 10 common PhD interview questions.",
    detailVi: "Mock với mentor; luyện 10 câu phỏng vấn PhD phổ biến." },
  { month: 1, labelEn: "Month T-1", labelVi: "Tháng T-1", icon: "🛂",
    taskEn: "Visa & funding paperwork", taskVi: "Hồ sơ visa & funding",
    detailEn: "Health check, financial proof, accommodation deposit.",
    detailVi: "Khám sức khoẻ, chứng minh tài chính, đặt cọc chỗ ở." },
];
