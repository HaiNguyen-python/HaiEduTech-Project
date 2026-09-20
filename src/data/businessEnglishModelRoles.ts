/**
 * Precise discourse functions for every line in the 24 Business English models.
 * The arrays deliberately mirror model.lines so labels teach structure rather
 * than merely describing a line's position.
 */
export interface BilingualModelRole {
  en: string;
  vi: string;
}

const role = (en: string, vi: string): BilingualModelRole => ({ en, vi });

export const businessEnglishModelRoles: Record<string, BilingualModelRole[]> = {
  "biz-email-1": [
    role("Subject line", "Tiêu đề email"), role("Greeting", "Lời chào"),
    role("Purpose + attachment", "Mục đích + tệp đính kèm"), role("Action + deadline", "Việc cần làm + hạn chót"),
    role("Alternative option", "Phương án thay thế"), role("Sign-off", "Lời kết thư"), role("Name + job title", "Tên + chức danh"),
  ],
  "biz-email-2": [
    role("Subject line", "Tiêu đề email"), role("Greeting", "Lời chào"), role("Request + reason", "Đề nghị + lý do"),
    role("Acknowledgement + flexibility", "Ghi nhận + linh hoạt"), role("Thanks", "Lời cảm ơn"), role("Sign-off", "Lời kết thư"), role("Sender's name", "Tên người gửi"),
  ],
  "biz-email-3": [
    role("Subject line", "Tiêu đề email"), role("Greeting", "Lời chào"), role("Apology + explanation", "Xin lỗi + giải thích"),
    role("Remedy + new date", "Cách khắc phục + thời hạn mới"), role("Update commitment", "Cam kết cập nhật"),
    role("Sign-off", "Lời kết thư"), role("Sender's name", "Tên người gửi"),
  ],
  "biz-email-4": [
    role("Subject line", "Tiêu đề email"), role("Greeting", "Lời chào"), role("Follow-up + context", "Nhắc việc + bối cảnh"),
    role("Request + deadline", "Đề nghị + hạn chót"), role("Thanks", "Lời cảm ơn"), role("Sender's name", "Tên người gửi"),
  ],
  "biz-meet-1": [
    role("Welcome + apologies", "Chào mừng + thông báo vắng mặt"), role("Objective + agenda", "Mục tiêu + chương trình"),
    role("First item + handover", "Nội dung đầu + chuyển lượt"), role("Summary + action owners", "Tổng kết + người phụ trách"),
  ],
  "biz-meet-2": [
    role("Opinion", "Ý kiến"), role("Request for evidence", "Yêu cầu dẫn chứng"), role("Evidence", "Dẫn chứng"),
    role("Agreement + added proposal", "Đồng ý + đề xuất bổ sung"), role("Invite another perspective", "Mời góc nhìn khác"),
  ],
  "biz-meet-3": [
    role("Proposal", "Đề xuất"), role("Polite disagreement + evidence", "Phản đối lịch sự + dẫn chứng"),
    role("Partial agreement + qualification", "Đồng ý một phần + bổ sung điều kiện"), role("Compromise", "Phương án dung hòa"),
    role("Agreement", "Thống nhất"),
  ],
  "biz-meet-4": [
    role("Decision summary", "Tóm tắt quyết định"), role("Actions + owners + deadlines", "Công việc + người phụ trách + hạn"),
    role("Confirmation check", "Kiểm tra xác nhận"), role("Minutes + close", "Biên bản + kết thúc"),
  ],
  "biz-pres-1": [
    role("Hook", "Câu thu hút"), role("Purpose", "Mục đích"), role("Roadmap + Q&A timing", "Bố cục + thời điểm hỏi đáp"),
    role("Core message", "Thông điệp chính"),
  ],
  "biz-pres-2": [
    role("Chart identification", "Giới thiệu biểu đồ"), role("Overall trend", "Xu hướng tổng quát"), role("Key figures", "Số liệu chính"),
    role("Breakdown + comparison", "Phân tích + so sánh"), role("Business implication", "Ý nghĩa kinh doanh"),
  ],
  "biz-pres-3": [
    role("Challenge question", "Câu hỏi phản biện"), role("Acknowledge + reframe", "Ghi nhận + diễn giải lại"),
    role("Evidence + risk control", "Dẫn chứng + kiểm soát rủi ro"), role("Check understanding", "Kiểm tra mức độ giải đáp"),
  ],
  "biz-pres-4": [
    role("Key message", "Thông điệp chính"), role("Recommendation + benefit", "Đề xuất + lợi ích"),
    role("Urgency", "Tính cấp thiết"), role("Decision request + close", "Yêu cầu quyết định + kết thúc"),
  ],
  "biz-call-1": [
    role("Company greeting", "Lời chào của công ty"), role("Caller identification + request", "Giới thiệu người gọi + yêu cầu"),
    role("Transfer attempt + option", "Thử nối máy + đưa lựa chọn"), role("Message + callback details", "Lời nhắn + thông tin gọi lại"),
    role("Clarification request", "Yêu cầu làm rõ"), role("Spelling", "Đánh vần"),
  ],
  "biz-call-2": [
    role("Audio check + issue", "Kiểm tra âm thanh + sự cố"), role("Apology + recheck", "Xin lỗi + kiểm tra lại"),
    role("Problem + solution", "Vấn đề + cách xử lý"), role("Status + speaking protocol", "Tình trạng + quy ước phát biểu"),
    role("Agenda + turn order", "Chương trình + thứ tự phát biểu"),
  ],
  "biz-call-3": [
    role("Welcome + open question", "Chào đón + câu hỏi mở"), role("Answer + detail", "Trả lời + chi tiết"),
    role("Follow-up question", "Câu hỏi tiếp nối"), role("Answer + context", "Trả lời + bối cảnh"),
    role("Common ground + transition", "Điểm chung + chuyển vào công việc"),
  ],
  "biz-call-4": [
    role("Two time options", "Hai lựa chọn thời gian"), role("Conflict + counterproposal", "Lịch trùng + đề xuất khác"),
    role("Confirmation + time zone", "Xác nhận + múi giờ"), role("Acceptance + request", "Đồng ý + đề nghị"),
    role("Written follow-up", "Xác nhận bằng văn bản"),
  ],
  "biz-nego-1": [
    role("Subject line", "Tiêu đề email"), role("Greeting", "Lời chào"), role("Acknowledgement + purpose", "Ghi nhận + mục đích"),
    role("Scope + pricing", "Phạm vi + giá"), role("Delivery + payment terms", "Giao hàng + thanh toán"),
    role("Validity + support", "Hiệu lực + hỗ trợ"), role("Sign-off", "Lời kết thư"), role("Sender's name", "Tên người gửi"),
  ],
  "biz-nego-2": [
    role("Opening position", "Lập trường ban đầu"), role("Acknowledge + conditional offer", "Ghi nhận + đề nghị có điều kiện"),
    role("Counteroffer", "Đề nghị đối ứng"), role("Limit + added value", "Giới hạn + giá trị bổ sung"),
    role("Provisional agreement", "Đồng ý sơ bộ"), role("Next step", "Bước tiếp theo"),
  ],
  "biz-nego-3": [
    role("Problem + impact + requested remedy", "Vấn đề + ảnh hưởng + yêu cầu xử lý"),
    role("Acknowledgement + apology + ownership", "Ghi nhận + xin lỗi + nhận trách nhiệm"),
    role("Root cause + corrective action", "Nguyên nhân + hành động khắc phục"), role("Goodwill + follow-up", "Thiện chí + theo dõi"),
  ],
  "biz-nego-4": [
    role("Delivery obligation", "Nghĩa vụ giao hàng"), role("Price + discount condition", "Giá + điều kiện giảm giá"),
    role("Payment condition", "Điều kiện thanh toán"), role("Force majeure", "Điều khoản bất khả kháng"),
    role("Amendment requirement", "Yêu cầu sửa đổi"),
  ],
  "biz-career-1": [
    role("Role heading", "Vị trí công việc"), role("Achievement + metric", "Thành tích + số liệu"),
    role("Leadership + efficiency", "Vai trò dẫn dắt + hiệu quả"), role("Process improvement + result", "Cải tiến quy trình + kết quả"),
    role("Target achievement", "Kết quả vượt mục tiêu"), role("Skills + languages", "Kỹ năng + ngôn ngữ"),
  ],
  "biz-career-2": [
    role("Greeting", "Lời chào"), role("Role + motivation", "Vị trí + động lực ứng tuyển"),
    role("Evidence of fit", "Dẫn chứng phù hợp"), role("Availability + call to action", "Khả năng bắt đầu + đề nghị trao đổi"),
    role("Formal sign-off", "Lời kết trang trọng"), role("Applicant's name", "Tên ứng viên"),
  ],
  "biz-career-3": [
    role("Interview question", "Câu hỏi phỏng vấn"), role("Situation", "Tình huống"), role("Task", "Nhiệm vụ"),
    role("Action", "Hành động"), role("Result + learning", "Kết quả + bài học"),
  ],
  "biz-career-4": [
    role("Greeting", "Lời chào"), role("Shared context", "Bối cảnh chung"), role("Relevance + value", "Mức độ liên quan + giá trị"),
    role("Specific request + respectful follow-up", "Đề nghị cụ thể + cách theo dõi lịch sự"),
    role("Sign-off", "Lời kết thư"), role("Sender's name", "Tên người gửi"),
  ],
};