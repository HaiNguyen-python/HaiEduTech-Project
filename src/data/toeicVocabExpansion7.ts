/**
 * @file toeicVocabExpansion7.ts
 * @description TOEIC Vocabulary Expansion #7 - extra 80 high-frequency
 * business words across all 10 TOEIC categories. Designed for typing-practice drills.
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

export const toeicVocabExpansion7: ToeicWord[] = [
  // Office & Workplace
  w("cubicle", "n", "/ˈkjuː.bɪ.kəl/", "basic", "Buồng làm việc nhỏ", "A small partitioned workspace", "Each new employee was assigned a cubicle near the window.", ["workspace"], ["office cubicle"], "Office & Workplace"),
  w("breakroom", "n", "/ˈbreɪk.ruːm/", "basic", "Phòng nghỉ", "A room where staff can relax during breaks", "Coffee and snacks are always available in the breakroom.", ["lounge"], ["staff breakroom"], "Office & Workplace"),
  w("amenity", "n", "/əˈmiː.nə.ti/", "intermediate", "Tiện ích", "A desirable or useful feature of a place", "The new office offers many amenities, including a gym.", ["facility"], ["modern amenities"], "Office & Workplace"),
  w("workspace", "n", "/ˈwɜːk.speɪs/", "basic", "Không gian làm việc", "An area used for working", "A tidy workspace improves focus and productivity.", ["work area"], ["personal workspace"], "Office & Workplace"),
  w("layout", "n", "/ˈleɪ.aʊt/", "basic", "Bố cục, sơ đồ", "The way something is arranged", "The new office layout encourages collaboration.", ["arrangement"], ["floor layout"], "Office & Workplace"),
  w("renovate", "v", "/ˈren.ə.veɪt/", "intermediate", "Tân trang, cải tạo", "To repair and improve a building", "We plan to renovate the lobby next quarter.", ["refurbish"], ["renovate offices"], "Office & Workplace"),
  w("flex hours", "n", "/fleks aʊəz/", "intermediate", "Giờ làm linh hoạt", "Flexible working hours", "Flex hours help employees balance family and work.", ["flexitime"], ["work flex hours"], "Office & Workplace"),
  w("janitor", "n", "/ˈdʒæn.ɪ.tər/", "basic", "Lao công", "A person who cleans a building", "The janitor locks the office every evening.", ["custodian"], ["building janitor"], "Office & Workplace"),

  // Personnel & Human Resources
  w("onboarding", "n", "/ˈɒnˌbɔː.dɪŋ/", "intermediate", "Hội nhập nhân viên mới", "The process of integrating new employees", "Our onboarding program lasts two weeks.", ["induction"], ["onboarding process"], "Personnel & Human Resources"),
  w("retention", "n", "/rɪˈten.ʃən/", "intermediate", "Sự giữ chân nhân viên", "The ability to keep employees", "Higher salaries have improved our retention rate.", [], ["staff retention"], "Personnel & Human Resources"),
  w("appraisal", "n", "/əˈpreɪ.zəl/", "intermediate", "Đánh giá năng lực", "A formal performance assessment", "Annual appraisals determine promotions and bonuses.", ["review"], ["performance appraisal"], "Personnel & Human Resources"),
  w("perk", "n", "/pɜːk/", "basic", "Đãi ngộ, phúc lợi nhỏ", "An extra benefit given to employees", "Free lunch is one of the best perks of the job.", ["benefit"], ["company perks"], "Personnel & Human Resources"),
  w("severance", "n", "/ˈsev.ər.əns/", "advanced", "Trợ cấp thôi việc", "Money paid when employment ends", "She received six months of severance after the layoff.", [], ["severance package"], "Personnel & Human Resources"),
  w("delegate", "v", "/ˈdel.ɪ.ɡeɪt/", "intermediate", "Ủy quyền", "To give a task to another person", "Good managers delegate tasks to develop their team.", ["assign"], ["delegate authority"], "Personnel & Human Resources"),
  w("mentor", "n", "/ˈmen.tɔːr/", "basic", "Người cố vấn", "An experienced advisor", "Every new hire is paired with a senior mentor.", ["advisor"], ["assign a mentor"], "Personnel & Human Resources"),
  w("downsize", "v", "/ˌdaʊnˈsaɪz/", "advanced", "Cắt giảm nhân sự", "To reduce the number of employees", "The firm had to downsize after losing key clients.", ["lay off"], ["downsize operations"], "Personnel & Human Resources"),

  // Meetings & Presentations
  w("quorum", "n", "/ˈkwɔː.rəm/", "advanced", "Số lượng tối thiểu để họp", "Minimum attendees needed for a valid meeting", "Without a quorum, no decisions can be made.", [], ["reach a quorum"], "Meetings & Presentations"),
  w("rapport", "n", "/ræˈpɔːr/", "intermediate", "Mối quan hệ tốt", "A good understanding between people", "She built quick rapport with the client team.", ["bond"], ["build rapport"], "Meetings & Presentations"),
  w("pitch", "n", "/pɪtʃ/", "basic", "Bài thuyết trình bán hàng", "A short persuasive presentation", "His pitch convinced investors within ten minutes.", ["sales talk"], ["sales pitch"], "Meetings & Presentations"),
  w("recap", "v", "/ˈriː.kæp/", "basic", "Tóm tắt lại", "To summarise main points", "Let me recap what we agreed on today.", ["summarise"], ["quick recap"], "Meetings & Presentations"),
  w("breakout", "n", "/ˈbreɪk.aʊt/", "intermediate", "Phòng họp nhóm nhỏ", "A small group session within a larger meeting", "After lunch we'll move into breakout rooms.", [], ["breakout session"], "Meetings & Presentations"),
  w("convene", "v", "/kənˈviːn/", "advanced", "Triệu tập họp", "To bring people together for a meeting", "The board will convene at 10 a.m. tomorrow.", ["assemble"], ["convene a meeting"], "Meetings & Presentations"),
  w("articulate", "v", "/ɑːˈtɪk.jə.leɪt/", "intermediate", "Diễn đạt rõ ràng", "To express ideas clearly", "She articulated the strategy with great confidence.", ["express"], ["articulate ideas"], "Meetings & Presentations"),
  w("visual aid", "n", "/ˈvɪʒ.u.əl eɪd/", "basic", "Phương tiện trực quan", "An item used to support a talk", "Charts and slides are common visual aids.", [], ["use visual aids"], "Meetings & Presentations"),

  // Sales & Marketing
  w("lead", "n", "/liːd/", "basic", "Khách hàng tiềm năng", "A potential customer", "Marketing generated over 200 leads this month.", ["prospect"], ["sales lead"], "Sales & Marketing"),
  w("conversion", "n", "/kənˈvɜː.ʃən/", "intermediate", "Tỷ lệ chuyển đổi", "Turning a visitor into a customer", "Our website's conversion rate has doubled.", [], ["conversion rate"], "Sales & Marketing"),
  w("outreach", "n", "/ˈaʊt.riːtʃ/", "intermediate", "Tiếp cận khách hàng", "Effort to communicate with audiences", "Email outreach is part of our growth strategy.", [], ["customer outreach"], "Sales & Marketing"),
  w("upsell", "v", "/ˌʌpˈsel/", "intermediate", "Bán thêm sản phẩm cao cấp", "To sell a more expensive product", "Train your staff to upsell premium packages.", [], ["upsell to clients"], "Sales & Marketing"),
  w("loyalty", "n", "/ˈlɔɪ.əl.ti/", "basic", "Sự trung thành", "Strong support for a brand", "Our loyalty program rewards repeat purchases.", ["devotion"], ["customer loyalty"], "Sales & Marketing"),
  w("segment", "n", "/ˈseɡ.mənt/", "intermediate", "Phân khúc thị trường", "A specific group of customers", "Young professionals are our fastest-growing segment.", ["niche"], ["market segment"], "Sales & Marketing"),
  w("endorsement", "n", "/ɪnˈdɔːs.mənt/", "advanced", "Sự ủng hộ, quảng bá", "Public support, often by a celebrity", "The product gained popularity after a celebrity endorsement.", [], ["brand endorsement"], "Sales & Marketing"),
  w("billboard", "n", "/ˈbɪl.bɔːd/", "basic", "Biển quảng cáo lớn", "A large outdoor advertisement", "A new billboard was placed near the highway.", [], ["billboard ad"], "Sales & Marketing"),

  // Finance & Budgeting
  w("expenditure", "n", "/ɪkˈspen.dɪ.tʃər/", "advanced", "Chi tiêu", "The amount of money spent", "We must reduce expenditure on travel this quarter.", ["spending"], ["public expenditure"], "Finance & Budgeting"),
  w("liquidity", "n", "/lɪˈkwɪd.ə.ti/", "advanced", "Tính thanh khoản", "Availability of cash", "The company maintains strong liquidity for emergencies.", [], ["cash liquidity"], "Finance & Budgeting"),
  w("payroll", "n", "/ˈpeɪ.rəʊl/", "basic", "Bảng lương", "List of employees and their pay", "Payroll is processed on the 25th of every month.", [], ["payroll system"], "Finance & Budgeting"),
  w("invoice", "n", "/ˈɪn.vɔɪs/", "basic", "Hóa đơn", "A bill for goods or services", "Please pay the invoice within 30 days.", ["bill"], ["issue an invoice"], "Finance & Budgeting"),
  w("reimburse", "v", "/ˌriː.ɪmˈbɜːs/", "intermediate", "Hoàn trả chi phí", "To pay back money spent", "The company will reimburse all travel expenses.", ["refund"], ["reimburse costs"], "Finance & Budgeting"),
  w("forecast", "n", "/ˈfɔː.kɑːst/", "intermediate", "Dự báo", "A prediction of future trends", "The Q3 sales forecast looks very promising.", ["projection"], ["financial forecast"], "Finance & Budgeting"),
  w("dividend", "n", "/ˈdɪv.ɪ.dend/", "advanced", "Cổ tức", "A share of profits paid to shareholders", "Investors received a higher dividend this year.", [], ["pay a dividend"], "Finance & Budgeting"),
  w("audit", "v", "/ˈɔː.dɪt/", "intermediate", "Kiểm toán", "To officially examine accounts", "An external firm will audit our records next month.", ["inspect"], ["audit accounts"], "Finance & Budgeting"),

  // Travel & Transportation
  w("itinerary", "n", "/aɪˈtɪn.ər.ər.i/", "intermediate", "Lịch trình", "A planned route or schedule", "Please review the itinerary before the trip.", ["schedule"], ["travel itinerary"], "Travel & Transportation"),
  w("layover", "n", "/ˈleɪˌəʊ.vər/", "intermediate", "Thời gian quá cảnh", "A short stop between flights", "We had a five-hour layover in Singapore.", ["stopover"], ["long layover"], "Travel & Transportation"),
  w("boarding pass", "n", "/ˈbɔː.dɪŋ pɑːs/", "basic", "Thẻ lên máy bay", "A document to board a flight", "Please have your boarding pass ready.", [], ["mobile boarding pass"], "Travel & Transportation"),
  w("excursion", "n", "/ɪkˈskɜː.ʃən/", "intermediate", "Chuyến tham quan ngắn", "A short organised trip", "The conference includes a city excursion.", ["trip"], ["guided excursion"], "Travel & Transportation"),
  w("commute", "v", "/kəˈmjuːt/", "basic", "Đi làm hàng ngày", "To travel regularly to work", "Many employees commute by train each day.", [], ["daily commute"], "Travel & Transportation"),
  w("rental", "n", "/ˈren.təl/", "basic", "Việc thuê", "Something rented for use", "I booked a car rental for the airport pickup.", ["hire"], ["car rental"], "Travel & Transportation"),
  w("baggage claim", "n", "/ˈbæɡ.ɪdʒ kleɪm/", "basic", "Khu lấy hành lý", "Area to collect luggage at airports", "Meet me at baggage claim after you land.", [], [], "Travel & Transportation"),
  w("disembark", "v", "/ˌdɪs.ɪmˈbɑːk/", "advanced", "Xuống máy bay / tàu", "To leave a vehicle after a trip", "Passengers should disembark through the rear door.", [], ["disembark a plane"], "Travel & Transportation"),

  // Contracts & Legal
  w("clause", "n", "/klɔːz/", "intermediate", "Điều khoản", "A specific section of a contract", "Read the confidentiality clause carefully.", ["provision"], ["contract clause"], "Contracts & Legal"),
  w("breach", "n", "/briːtʃ/", "intermediate", "Sự vi phạm", "Failure to follow an agreement", "Late delivery may be considered a breach of contract.", ["violation"], ["breach of contract"], "Contracts & Legal"),
  w("liability", "n", "/ˌlaɪ.əˈbɪl.ə.ti/", "advanced", "Trách nhiệm pháp lý", "Legal responsibility", "Insurance covers any liability for accidents.", ["responsibility"], ["legal liability"], "Contracts & Legal"),
  w("amend", "v", "/əˈmend/", "intermediate", "Sửa đổi", "To make small changes to a document", "We need to amend Section 3 of the agreement.", ["modify"], ["amend a contract"], "Contracts & Legal"),
  w("waiver", "n", "/ˈweɪ.vər/", "advanced", "Sự miễn trừ", "Giving up a right voluntarily", "Sign the waiver before the activity begins.", [], ["sign a waiver"], "Contracts & Legal"),
  w("notarise", "v", "/ˈnəʊ.tər.aɪz/", "advanced", "Công chứng", "To officially certify a document", "Please notarise the document before submission.", [], ["notarise a contract"], "Contracts & Legal"),
  w("binding", "adj", "/ˈbaɪn.dɪŋ/", "intermediate", "Có hiệu lực bắt buộc", "Legally enforceable", "Once signed, this offer becomes legally binding.", ["enforceable"], ["binding agreement"], "Contracts & Legal"),
  w("plaintiff", "n", "/ˈpleɪn.tɪf/", "advanced", "Nguyên đơn", "The person bringing a lawsuit", "The plaintiff demands damages of one million dollars.", [], [], "Contracts & Legal"),

  // Technology & IT
  w("backup", "n", "/ˈbæk.ʌp/", "basic", "Bản sao lưu", "A copy kept for safety", "Always create a backup before updating software.", ["copy"], ["data backup"], "Technology & IT"),
  w("firewall", "n", "/ˈfaɪə.wɔːl/", "intermediate", "Tường lửa", "A network security barrier", "The firewall blocks unauthorised access.", [], ["network firewall"], "Technology & IT"),
  w("downtime", "n", "/ˈdaʊn.taɪm/", "intermediate", "Thời gian ngưng hoạt động", "Time when a system is unavailable", "Server maintenance will cause two hours of downtime.", [], ["system downtime"], "Technology & IT"),
  w("encryption", "n", "/ɪnˈkrɪp.ʃən/", "advanced", "Mã hóa", "Converting data into a secret code", "Our files use end-to-end encryption.", [], ["data encryption"], "Technology & IT"),
  w("debug", "v", "/ˌdiːˈbʌɡ/", "intermediate", "Sửa lỗi", "To find and fix software errors", "The team will debug the app before launch.", ["fix"], ["debug code"], "Technology & IT"),
  w("scalable", "adj", "/ˈskeɪ.lə.bəl/", "advanced", "Có thể mở rộng", "Able to handle growing demand", "We need a scalable cloud solution.", [], ["scalable system"], "Technology & IT"),
  w("dashboard", "n", "/ˈdæʃ.bɔːd/", "basic", "Bảng điều khiển", "A screen showing key information", "The dashboard displays real-time sales figures.", ["panel"], ["admin dashboard"], "Technology & IT"),
  w("phishing", "n", "/ˈfɪʃ.ɪŋ/", "intermediate", "Lừa đảo trực tuyến", "Fraud to steal personal data online", "Beware of phishing emails asking for passwords.", [], ["phishing scam"], "Technology & IT"),

  // Customer Service
  w("complaint", "n", "/kəmˈpleɪnt/", "basic", "Lời phàn nàn", "An expression of dissatisfaction", "We received a complaint about the late delivery.", ["grievance"], ["customer complaint"], "Customer Service"),
  w("courteous", "adj", "/ˈkɜː.ti.əs/", "intermediate", "Lịch sự", "Polite and respectful", "All staff are trained to be courteous to clients.", ["polite"], ["courteous behavior"], "Customer Service"),
  w("resolve", "v", "/rɪˈzɒlv/", "basic", "Giải quyết", "To find a solution", "We aim to resolve every issue within 24 hours.", ["solve"], ["resolve a complaint"], "Customer Service"),
  w("hotline", "n", "/ˈhɒt.laɪn/", "basic", "Đường dây nóng", "A direct phone line for help", "Call our 24/7 customer hotline for assistance.", [], ["support hotline"], "Customer Service"),
  w("escalate", "v", "/ˈes.kə.leɪt/", "intermediate", "Chuyển lên cấp cao hơn", "To pass an issue to a higher level", "Please escalate this case to your supervisor.", [], ["escalate an issue"], "Customer Service"),
  w("FAQ", "n", "/ˌefˌeɪˈkjuː/", "basic", "Câu hỏi thường gặp", "Frequently asked questions", "Check the FAQ page before contacting support.", [], ["FAQ section"], "Customer Service"),
  w("empathy", "n", "/ˈem.pə.θi/", "intermediate", "Sự thấu cảm", "Understanding someone's feelings", "Showing empathy helps calm upset customers.", [], ["show empathy"], "Customer Service"),
  w("retention", "n", "/rɪˈten.ʃən/", "intermediate", "Giữ chân khách hàng", "Keeping customers loyal", "Excellent service improves customer retention.", [], ["customer retention"], "Customer Service"),

  // Events & Hospitality
  w("venue", "n", "/ˈven.juː/", "basic", "Địa điểm tổ chức", "A place where an event happens", "The hotel is the venue for the annual gala.", ["location"], ["event venue"], "Events & Hospitality"),
  w("RSVP", "v", "/ˌɑːr.esˌviːˈpiː/", "basic", "Phản hồi xác nhận tham dự", "To confirm attendance", "Please RSVP by Friday so we can prepare seating.", [], [], "Events & Hospitality"),
  w("catering", "n", "/ˈkeɪ.tər.ɪŋ/", "basic", "Dịch vụ ăn uống", "Providing food at events", "The catering company offers a vegetarian menu.", [], ["catering service"], "Events & Hospitality"),
  w("hospitality", "n", "/ˌhɒs.pɪˈtæl.ə.ti/", "intermediate", "Sự tiếp đãi", "Friendly treatment of guests", "Their hospitality made our stay unforgettable.", [], ["hospitality industry"], "Events & Hospitality"),
  w("banquet", "n", "/ˈbæŋ.kwɪt/", "intermediate", "Tiệc lớn", "A formal large dinner", "A banquet will be held to honor retiring staff.", ["feast"], ["wedding banquet"], "Events & Hospitality"),
  w("amenities", "n", "/əˈmiː.nə.tiz/", "intermediate", "Tiện nghi", "Comfort features of a place", "The hotel offers world-class amenities.", [], ["hotel amenities"], "Events & Hospitality"),
  w("ballroom", "n", "/ˈbɔːl.ruːm/", "basic", "Phòng khiêu vũ lớn", "A large hall for events", "The ballroom can host up to 500 guests.", [], ["grand ballroom"], "Events & Hospitality"),
  w("attendee", "n", "/əˌtenˈdiː/", "intermediate", "Người tham dự", "Someone who attends an event", "Each attendee received a welcome gift bag.", ["participant"], ["event attendee"], "Events & Hospitality"),
];
