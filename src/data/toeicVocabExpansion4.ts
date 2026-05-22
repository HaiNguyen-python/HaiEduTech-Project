/**
 * @file toeicVocabExpansion4.ts
 * @description TOEIC Vocabulary Expansion #4 — meetings, travel, marketing,
 *              negotiation, HR, IT, customer service.
 */
import type { ToeicWord } from "./toeicVocabTypes";

export const toeicVocabExpansion4: ToeicWord[] = [
  // Meetings
  { word: "agenda", wordClass: "n", ipa: "/əˈdʒen.də/", level: "basic", definition: { en: "A list of items to discuss", vi: "Chương trình họp" }, example: "Please add the budget review to the agenda.", synonyms: ["schedule", "plan"], collocations: ["set the agenda", "hidden agenda"], category: "Meetings & Conferences" },
  { word: "minutes", wordClass: "n", ipa: "/ˈmɪn.ɪts/", level: "intermediate", definition: { en: "Official written record of a meeting", vi: "Biên bản họp" }, example: "Please email the minutes to all attendees.", synonyms: ["record", "transcript"], collocations: ["take minutes", "circulate the minutes"], category: "Meetings & Conferences" },
  { word: "quorum", wordClass: "n", ipa: "/ˈkwɔː.rəm/", level: "advanced", definition: { en: "Minimum attendees required for a meeting to be valid", vi: "Số đại biểu tối thiểu" }, example: "Without a quorum, the vote cannot proceed.", synonyms: ["minimum"], collocations: ["reach a quorum"], category: "Meetings & Conferences" },
  { word: "adjourn", wordClass: "v", ipa: "/əˈdʒɜːn/", level: "advanced", definition: { en: "To pause or end a meeting", vi: "Hoãn lại / kết thúc" }, example: "The chair adjourned the meeting at noon.", synonyms: ["postpone"], collocations: ["adjourn the session"], category: "Meetings & Conferences" },

  // Marketing
  { word: "campaign", wordClass: "n", ipa: "/kæmˈpeɪn/", level: "basic", definition: { en: "Organised activities to achieve a goal", vi: "Chiến dịch" }, example: "Our spring campaign boosted sales by 14%.", synonyms: ["initiative"], collocations: ["launch a campaign"], category: "Marketing & Sales" },
  { word: "branding", wordClass: "n", ipa: "/ˈbræn.dɪŋ/", level: "intermediate", definition: { en: "Creating a distinct identity for a product", vi: "Xây dựng thương hiệu" }, example: "Strong branding sets the company apart.", synonyms: ["identity"], collocations: ["consistent branding"], category: "Marketing & Sales" },
  { word: "demographic", wordClass: "n", ipa: "/ˌdem.əˈɡræf.ɪk/", level: "intermediate", definition: { en: "A specific section of a population", vi: "Phân khúc nhân khẩu" }, example: "The product targets the under-25 demographic.", synonyms: ["segment"], collocations: ["key demographic"], category: "Marketing & Sales" },
  { word: "endorsement", wordClass: "n", ipa: "/ɪnˈdɔːs.mənt/", level: "advanced", definition: { en: "Public statement of support", vi: "Sự ủng hộ / chứng thực" }, example: "A celebrity endorsement boosted the brand's image.", synonyms: ["approval"], collocations: ["celebrity endorsement"], category: "Marketing & Sales" },
  { word: "outreach", wordClass: "n", ipa: "/ˈaʊt.riːtʃ/", level: "intermediate", definition: { en: "Efforts to engage new audiences", vi: "Tiếp cận khách hàng mới" }, example: "Community outreach grew our customer base.", synonyms: ["engagement"], collocations: ["outreach programme"], category: "Marketing & Sales" },

  // Negotiation
  { word: "leverage", wordClass: "n", ipa: "/ˈliː.vər.ɪdʒ/", level: "advanced", definition: { en: "Power to influence a situation", vi: "Đòn bẩy" }, example: "Bulk orders give us leverage in negotiations.", synonyms: ["influence"], collocations: ["gain leverage"], category: "Negotiation" },
  { word: "concession", wordClass: "n", ipa: "/kənˈseʃ.ən/", level: "advanced", definition: { en: "Something granted in negotiation", vi: "Nhượng bộ" }, example: "Both sides made concessions to close the deal.", synonyms: ["compromise"], collocations: ["make a concession"], category: "Negotiation" },
  { word: "stipulate", wordClass: "v", ipa: "/ˈstɪp.jə.leɪt/", level: "advanced", definition: { en: "To specify as a requirement", vi: "Quy định, nêu rõ" }, example: "The contract stipulates a 30-day notice period.", synonyms: ["specify"], collocations: ["stipulate that"], category: "Negotiation" },

  // HR
  { word: "onboarding", wordClass: "n", ipa: "/ˈɒnˌbɔː.dɪŋ/", level: "intermediate", definition: { en: "Process of integrating new employees", vi: "Hội nhập nhân viên mới" }, example: "Our onboarding programme lasts two weeks.", synonyms: ["orientation"], collocations: ["onboarding process"], category: "Human Resources" },
  { word: "appraisal", wordClass: "n", ipa: "/əˈpreɪ.zəl/", level: "intermediate", definition: { en: "Formal performance review", vi: "Đánh giá nhân viên" }, example: "Annual appraisals determine bonuses.", synonyms: ["evaluation"], collocations: ["performance appraisal"], category: "Human Resources" },
  { word: "attrition", wordClass: "n", ipa: "/əˈtrɪʃ.ən/", level: "advanced", definition: { en: "Gradual loss of employees", vi: "Tỷ lệ nghỉ việc" }, example: "Lower attrition saves significant hiring costs.", synonyms: ["turnover"], collocations: ["staff attrition"], category: "Human Resources" },

  // Travel & Logistics
  { word: "itinerary", wordClass: "n", ipa: "/aɪˈtɪn.ər.ər.i/", level: "intermediate", definition: { en: "Planned travel route and schedule", vi: "Lịch trình chuyến đi" }, example: "Please confirm the revised itinerary by tomorrow.", synonyms: ["schedule"], collocations: ["travel itinerary"], category: "Travel & Transportation" },
  { word: "reschedule", wordClass: "v", ipa: "/ˌriːˈʃed.juːl/", level: "basic", definition: { en: "To change the time of an event", vi: "Đổi lịch" }, example: "We had to reschedule the meeting twice.", synonyms: ["postpone"], collocations: ["reschedule a flight"], category: "Travel & Transportation" },
  { word: "courier", wordClass: "n", ipa: "/ˈkʊr.i.ər/", level: "intermediate", definition: { en: "A person or company that delivers packages", vi: "Người chuyển phát" }, example: "The courier will arrive before 5 pm.", synonyms: ["delivery service"], collocations: ["express courier"], category: "Travel & Transportation" },

  // Customer service
  { word: "feedback", wordClass: "n", ipa: "/ˈfiːd.bæk/", level: "basic", definition: { en: "Comments about performance", vi: "Phản hồi" }, example: "Customer feedback shapes our roadmap.", synonyms: ["response"], collocations: ["collect feedback"], category: "Customer Service" },
  { word: "complaint", wordClass: "n", ipa: "/kəmˈpleɪnt/", level: "basic", definition: { en: "An expression of dissatisfaction", vi: "Khiếu nại" }, example: "Please log each customer complaint in the system.", synonyms: ["grievance"], collocations: ["file a complaint"], category: "Customer Service" },
  { word: "resolution", wordClass: "n", ipa: "/ˌrez.əˈluː.ʃən/", level: "intermediate", definition: { en: "A solution to a problem", vi: "Giải pháp" }, example: "Our team aims for first-call resolution.", synonyms: ["solution"], collocations: ["dispute resolution"], category: "Customer Service" },

  // IT & Office
  { word: "spreadsheet", wordClass: "n", ipa: "/ˈspred.ʃiːt/", level: "basic", definition: { en: "Software for organising data in rows and columns", vi: "Bảng tính" }, example: "She built the forecast in an Excel spreadsheet.", synonyms: ["worksheet"], collocations: ["update the spreadsheet"], category: "IT & Office Tools" },
  { word: "deadline", wordClass: "n", ipa: "/ˈded.laɪn/", level: "basic", definition: { en: "Latest time something must be completed", vi: "Hạn chót" }, example: "We met every deadline this quarter.", synonyms: ["due date"], collocations: ["tight deadline"], category: "Project Management" },
  { word: "milestone", wordClass: "n", ipa: "/ˈmaɪl.stəʊn/", level: "intermediate", definition: { en: "A significant project checkpoint", vi: "Cột mốc dự án" }, example: "Launching the beta was a key milestone.", synonyms: ["benchmark"], collocations: ["reach a milestone"], category: "Project Management" },
];

export default toeicVocabExpansion4;
