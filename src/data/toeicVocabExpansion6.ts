/**
 * @file toeicVocabExpansion6.ts
 * @description TOEIC Vocabulary Expansion #6 — extra 60+ high-frequency
 * business words across all 10 TOEIC categories. Each entry includes a
 * realistic example sentence designed for typing-practice drills.
 */
import type { ToeicWord } from "./toeicVocabTypes";

const w = (
  word: string, wordClass: string, ipa: string, level: ToeicWord["level"],
  vi: string, en: string, example: string,
  synonyms: string[], collocations: string[], category: string,
): ToeicWord => ({
  word, wordClass, ipa, level, definition: { en, vi },
  example, synonyms, collocations, category,
});

export const toeicVocabExpansion6: ToeicWord[] = [
  // Office & Workplace
  w("workload", "n", "/ˈwɜːk.ləʊd/", "basic", "Khối lượng công việc", "The amount of work assigned", "The new software helps balance the team's workload.", ["task load"], ["heavy workload", "manage workload"], "Office & Workplace"),
  w("ergonomic", "adj", "/ˌɜː.ɡəˈnɒm.ɪk/", "intermediate", "Tiện dụng, công thái học", "Designed for comfort and efficiency", "Each desk is equipped with an ergonomic chair.", [], ["ergonomic design"], "Office & Workplace"),
  w("clutter", "n", "/ˈklʌt.ər/", "intermediate", "Sự bừa bộn", "A messy collection of things", "Please remove the clutter from the shared workspace.", ["mess"], ["reduce clutter"], "Office & Workplace"),
  w("hot-desking", "n", "/ˌhɒtˈdes.kɪŋ/", "advanced", "Sử dụng bàn linh hoạt", "Sharing desks among employees", "Hot-desking has lowered our office rental costs.", [], ["hot-desking policy"], "Office & Workplace"),
  w("memo", "n", "/ˈmem.əʊ/", "basic", "Bản ghi nhớ", "A short written message in business", "A memo was circulated about the dress code change.", ["note"], ["send a memo"], "Office & Workplace"),

  // Personnel & Human Resources
  w("headhunter", "n", "/ˈhedˌhʌn.tər/", "intermediate", "Người săn nhân tài", "A recruiter for senior positions", "A headhunter approached her about a director role.", ["recruiter"], ["executive headhunter"], "Personnel & Human Resources"),
  w("probation", "n", "/prəˈbeɪ.ʃən/", "intermediate", "Thời gian thử việc", "A trial period for a new employee", "New hires are on probation for three months.", ["trial period"], ["probation period"], "Personnel & Human Resources"),
  w("workforce", "n", "/ˈwɜːk.fɔːs/", "basic", "Lực lượng lao động", "The total number of workers", "The company is expanding its workforce in Asia.", ["staff"], ["skilled workforce"], "Personnel & Human Resources"),
  w("morale", "n", "/məˈrɑːl/", "intermediate", "Tinh thần làm việc", "Confidence and enthusiasm of staff", "Team outings have boosted employee morale.", ["spirit"], ["boost morale"], "Personnel & Human Resources"),
  w("turnover", "n", "/ˈtɜːnˌəʊ.vər/", "intermediate", "Tỉ lệ nghỉ việc / doanh thu", "Rate at which employees leave or revenue", "High staff turnover increases training costs.", [], ["employee turnover"], "Personnel & Human Resources"),
  w("competency", "n", "/ˈkɒm.pə.tən.si/", "advanced", "Năng lực", "The ability to do something well", "Each role requires a clear set of competencies.", ["skill"], ["core competency"], "Personnel & Human Resources"),

  // Meetings & Presentations
  w("agenda", "n", "/əˈdʒen.də/", "basic", "Chương trình nghị sự", "A list of items to discuss", "Please send the agenda before the meeting starts.", ["program"], ["set the agenda"], "Meetings & Presentations"),
  w("minutes", "n", "/ˈmɪn.ɪts/", "intermediate", "Biên bản họp", "The written record of a meeting", "Could you take the minutes during today's call?", ["record"], ["take minutes"], "Meetings & Presentations"),
  w("brainstorm", "v", "/ˈbreɪn.stɔːm/", "basic", "Động não", "To produce many ideas quickly", "Let's brainstorm ideas for the new campaign.", [], ["brainstorm ideas"], "Meetings & Presentations"),
  w("adjourn", "v", "/əˈdʒɜːn/", "advanced", "Hoãn họp", "To pause or end a meeting", "The chair adjourned the meeting until next Monday.", ["postpone"], ["adjourn a session"], "Meetings & Presentations"),
  w("handout", "n", "/ˈhænd.aʊt/", "basic", "Tài liệu phát tay", "A document given to attendees", "Each participant received a handout with the slides.", ["leaflet"], ["distribute handouts"], "Meetings & Presentations"),
  w("facilitator", "n", "/fəˈsɪl.ɪ.teɪ.tər/", "intermediate", "Người điều phối", "A person who leads a discussion", "The workshop facilitator kept everyone on track.", ["moderator"], ["workshop facilitator"], "Meetings & Presentations"),

  // Sales & Marketing
  w("lead", "n", "/liːd/", "basic", "Khách hàng tiềm năng", "A potential customer", "The campaign generated 500 new leads last week.", ["prospect"], ["qualified lead"], "Sales & Marketing"),
  w("conversion", "n", "/kənˈvɜː.ʃən/", "intermediate", "Tỉ lệ chuyển đổi", "Turning prospects into customers", "We improved the conversion rate by 12 percent.", [], ["conversion rate"], "Sales & Marketing"),
  w("upsell", "v", "/ʌpˈsel/", "intermediate", "Bán thêm sản phẩm cao hơn", "To persuade a customer to buy a more expensive item", "Train staff to upsell premium plans politely.", [], ["upsell to customers"], "Sales & Marketing"),
  w("segmentation", "n", "/ˌseɡ.menˈteɪ.ʃən/", "advanced", "Phân khúc thị trường", "Dividing customers into groups", "Market segmentation helps target the right audience.", [], ["market segmentation"], "Sales & Marketing"),
  w("endorsement", "n", "/ɪnˈdɔːs.mənt/", "intermediate", "Sự bảo chứng", "Public support of a product", "A celebrity endorsement doubled the brand's sales.", ["backing"], ["product endorsement"], "Sales & Marketing"),
  w("pitch", "n", "/pɪtʃ/", "basic", "Bài chào hàng", "A persuasive presentation", "Her pitch to investors went very smoothly.", [], ["sales pitch", "elevator pitch"], "Sales & Marketing"),

  // Finance & Budgeting
  w("forecast", "n", "/ˈfɔː.kɑːst/", "intermediate", "Dự báo", "A prediction of future figures", "The sales forecast for Q4 looks promising.", ["projection"], ["financial forecast"], "Finance & Budgeting"),
  w("expenditure", "n", "/ɪkˈspen.dɪ.tʃər/", "advanced", "Khoản chi tiêu", "An amount of money spent", "Capital expenditure rose sharply this year.", ["spending"], ["capital expenditure"], "Finance & Budgeting"),
  w("revenue", "n", "/ˈrev.ə.njuː/", "basic", "Doanh thu", "Income from business activities", "Annual revenue exceeded all expectations.", ["income"], ["revenue growth"], "Finance & Budgeting"),
  w("overhead", "n", "/ˈəʊ.və.hed/", "intermediate", "Chi phí vận hành", "Ongoing business costs", "Remote work has reduced our overhead significantly.", [], ["overhead costs"], "Finance & Budgeting"),
  w("margin", "n", "/ˈmɑː.dʒɪn/", "intermediate", "Biên lợi nhuận", "Profit relative to revenue", "Higher production costs squeezed our profit margin.", [], ["profit margin"], "Finance & Budgeting"),

  // Travel & Transportation
  w("itinerary", "n", "/aɪˈtɪn.ər.ər.i/", "intermediate", "Lịch trình", "A planned travel schedule", "Your itinerary has been emailed to your inbox.", ["schedule"], ["travel itinerary"], "Travel & Transportation"),
  w("layover", "n", "/ˈleɪˌəʊ.vər/", "intermediate", "Thời gian quá cảnh", "A short stop between flights", "We had a four-hour layover in Singapore.", ["stopover"], ["short layover"], "Travel & Transportation"),
  w("voucher", "n", "/ˈvaʊ.tʃər/", "basic", "Phiếu giảm giá", "A document exchangeable for goods", "Each delegate received a hotel voucher.", ["coupon"], ["meal voucher"], "Travel & Transportation"),
  w("freight", "n", "/freɪt/", "intermediate", "Hàng hóa vận chuyển", "Goods transported in bulk", "Air freight is faster but more expensive.", ["cargo"], ["freight charges"], "Travel & Transportation"),
  w("shuttle", "n", "/ˈʃʌt.əl/", "basic", "Xe đưa đón", "A vehicle running short regular trips", "A free shuttle runs between the hotel and the venue.", [], ["shuttle service"], "Travel & Transportation"),

  // Contracts & Legal
  w("waiver", "n", "/ˈweɪ.vər/", "advanced", "Sự khước từ quyền", "An agreement to give up a right", "Please sign the liability waiver before entering the site.", [], ["sign a waiver"], "Contracts & Legal"),
  w("addendum", "n", "/əˈden.dəm/", "advanced", "Phụ lục hợp đồng", "An additional section in a document", "The addendum clarifies the payment schedule.", ["appendix"], ["contract addendum"], "Contracts & Legal"),
  w("indemnity", "n", "/ɪnˈdem.nə.ti/", "advanced", "Sự bồi thường", "Protection against loss", "The contract includes a standard indemnity clause.", ["compensation"], ["indemnity clause"], "Contracts & Legal"),
  w("notarize", "v", "/ˈnəʊ.tə.raɪz/", "advanced", "Công chứng", "To certify a document officially", "You must notarize the agreement before submission.", [], ["notarize a document"], "Contracts & Legal"),
  w("renewal", "n", "/rɪˈnjuː.əl/", "intermediate", "Sự gia hạn", "Extending an agreement", "The contract is up for renewal next month.", [], ["contract renewal"], "Contracts & Legal"),

  // Technology & IT
  w("downtime", "n", "/ˈdaʊn.taɪm/", "intermediate", "Thời gian gián đoạn hệ thống", "Time when a system is unavailable", "Server downtime will be limited to one hour tonight.", [], ["system downtime"], "Technology & IT"),
  w("encryption", "n", "/ɪnˈkrɪp.ʃən/", "advanced", "Sự mã hóa", "Converting data into secure code", "All customer data is protected by strong encryption.", [], ["data encryption"], "Technology & IT"),
  w("dashboard", "n", "/ˈdæʃ.bɔːd/", "intermediate", "Bảng điều khiển", "A visual interface showing key data", "The new dashboard displays real-time sales figures.", [], ["analytics dashboard"], "Technology & IT"),
  w("scalable", "adj", "/ˈskeɪ.lə.bəl/", "advanced", "Có khả năng mở rộng", "Able to grow easily", "Our cloud platform is highly scalable.", [], ["scalable solution"], "Technology & IT"),
  w("firewall", "n", "/ˈfaɪə.wɔːl/", "intermediate", "Tường lửa", "A system that blocks unwanted network access", "The new firewall blocks suspicious traffic automatically.", [], ["corporate firewall"], "Technology & IT"),
  w("patch", "n", "/pætʃ/", "intermediate", "Bản vá lỗi", "A software update fixing issues", "The IT team released a security patch this morning.", ["update"], ["security patch"], "Technology & IT"),

  // Customer Service
  w("escalate", "v", "/ˈes.kə.leɪt/", "intermediate", "Chuyển lên cấp cao hơn", "To pass an issue to a higher level", "Please escalate this complaint to the supervisor.", [], ["escalate an issue"], "Customer Service"),
  w("feedback", "n", "/ˈfiːd.bæk/", "basic", "Phản hồi", "Comments about a service or product", "Customer feedback helps us improve our products.", ["response"], ["positive feedback"], "Customer Service"),
  w("warranty", "n", "/ˈwɒr.ən.ti/", "basic", "Bảo hành", "A written guarantee", "All laptops come with a two-year warranty.", ["guarantee"], ["extended warranty"], "Customer Service"),
  w("resolution", "n", "/ˌrez.əˈluː.ʃən/", "intermediate", "Giải pháp", "The solving of a problem", "We aim for a quick resolution to every issue.", [], ["dispute resolution"], "Customer Service"),
  w("courteous", "adj", "/ˈkɜː.ti.əs/", "intermediate", "Lịch sự", "Polite and respectful", "Always remain courteous when handling complaints.", ["polite"], ["courteous reply"], "Customer Service"),

  // Events & Hospitality
  w("RSVP", "v", "/ˌɑːr.es.viːˈpiː/", "basic", "Xác nhận tham dự", "To reply to an invitation", "Please RSVP by Friday so we can confirm catering.", [], ["RSVP by"], "Events & Hospitality"),
  w("venue", "n", "/ˈven.juː/", "basic", "Địa điểm tổ chức", "Place where an event is held", "The conference venue is just opposite the airport.", ["site"], ["event venue"], "Events & Hospitality"),
  w("catering", "n", "/ˈkeɪ.tər.ɪŋ/", "basic", "Dịch vụ ăn uống", "Food and drink service", "Catering will be provided during the workshop break.", [], ["catering service"], "Events & Hospitality"),
  w("delegate", "n", "/ˈdel.ɪ.ɡət/", "intermediate", "Đại biểu", "A representative at a meeting", "Each delegate received a welcome pack at check-in.", ["representative"], ["conference delegate"], "Events & Hospitality"),
  w("registration", "n", "/ˌredʒ.ɪˈstreɪ.ʃən/", "basic", "Sự đăng ký", "Signing up for an event", "Registration opens at eight in the morning.", ["sign-up"], ["registration desk"], "Events & Hospitality"),
  w("amenities", "n", "/əˈmen.ə.tiz/", "intermediate", "Tiện nghi", "Useful facilities provided", "The hotel offers premium amenities for business guests.", ["facilities"], ["hotel amenities"], "Events & Hospitality"),
];

export default toeicVocabExpansion6;
