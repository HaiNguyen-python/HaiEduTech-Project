/**
 * @file toeicVocabExpansion8.ts
 * @description TOEIC Vocabulary Expansion #8 — final batch of 80 words
 * to bring the TOEIC vocabulary bank to a clean 800-word total.
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

export const toeicVocabExpansion8: ToeicWord[] = [
  // Office & Workplace
  w("supplies", "n", "/səˈplaɪz/", "basic", "Vật dụng văn phòng", "Items needed for daily work", "Please order more office supplies before Friday.", ["materials"], ["office supplies"], "Office & Workplace"),
  w("ventilation", "n", "/ˌven.tɪˈleɪ.ʃən/", "intermediate", "Thông gió", "The flow of fresh air in a room", "Good ventilation keeps the workspace healthy.", [], ["proper ventilation"], "Office & Workplace"),
  w("teleworking", "n", "/ˈtel.iˌwɜː.kɪŋ/", "advanced", "Làm việc từ xa", "Working away from the main office", "Teleworking has become standard since the pandemic.", ["remote work"], ["teleworking policy"], "Office & Workplace"),
  w("punctual", "adj", "/ˈpʌŋk.tʃu.əl/", "intermediate", "Đúng giờ", "Arriving on time", "Mr. Tan is always punctual for meetings.", ["on time"], ["punctual employee"], "Office & Workplace"),
  w("attire", "n", "/əˈtaɪər/", "intermediate", "Trang phục", "Clothing, especially formal", "Business attire is required at the conference.", ["clothing"], ["formal attire"], "Office & Workplace"),
  w("stationery", "n", "/ˈsteɪ.ʃən.ər.i/", "basic", "Văn phòng phẩm", "Writing materials and office tools", "We ran out of stationery this morning.", [], ["stationery cabinet"], "Office & Workplace"),
  w("colleague", "n", "/ˈkɒl.iːɡ/", "basic", "Đồng nghiệp", "A person you work with", "My colleague helped me finish the report.", ["coworker"], ["close colleague"], "Office & Workplace"),
  w("workflow", "n", "/ˈwɜːk.fləʊ/", "intermediate", "Quy trình công việc", "The sequence of tasks in a job", "Automation has improved our daily workflow.", ["process"], ["streamline workflow"], "Office & Workplace"),

  // Personnel & Human Resources
  w("incentive", "n", "/ɪnˈsen.tɪv/", "intermediate", "Khuyến khích, thưởng", "Something that motivates action", "Bonuses are a strong incentive for performance.", ["motivation"], ["financial incentive"], "Personnel & Human Resources"),
  w("relocate", "v", "/ˌriː.ləʊˈkeɪt/", "intermediate", "Chuyển công tác", "To move to a new location", "She will relocate to Tokyo for the new project.", ["move"], ["relocate employees"], "Personnel & Human Resources"),
  w("compensate", "v", "/ˈkɒm.pən.seɪt/", "intermediate", "Bồi thường, trả công", "To pay someone for work or loss", "We will compensate staff for overtime hours.", ["pay"], ["compensate fairly"], "Personnel & Human Resources"),
  w("layoff", "n", "/ˈleɪ.ɒf/", "intermediate", "Sa thải", "Termination of employment", "The layoffs affected the entire marketing team.", ["dismissal"], ["mass layoff"], "Personnel & Human Resources"),
  w("internship", "n", "/ˈɪn.tɜːn.ʃɪp/", "basic", "Kỳ thực tập", "A period of work experience", "He completed a six-month internship at our firm.", [], ["paid internship"], "Personnel & Human Resources"),
  w("workforce planning", "n", "/ˈwɜːk.fɔːs ˈplæn.ɪŋ/", "advanced", "Hoạch định nhân sự", "Strategy to manage staffing needs", "Workforce planning helps avoid skill shortages.", [], [], "Personnel & Human Resources"),
  w("subordinate", "n", "/səˈbɔː.dɪ.nət/", "advanced", "Cấp dưới", "A person of lower rank", "She treats every subordinate with respect.", [], ["direct subordinate"], "Personnel & Human Resources"),
  w("payslip", "n", "/ˈpeɪ.slɪp/", "basic", "Phiếu lương", "A document showing salary details", "Check your payslip for the new tax deduction.", [], ["monthly payslip"], "Personnel & Human Resources"),

  // Meetings & Presentations
  w("attendance", "n", "/əˈten.dəns/", "basic", "Sự tham dự", "The act of being present", "Attendance at the kickoff meeting is mandatory.", [], ["meeting attendance"], "Meetings & Presentations"),
  w("moderate", "v", "/ˈmɒd.ər.eɪt/", "intermediate", "Điều phối", "To lead a discussion", "She moderated the panel with confidence.", ["chair"], ["moderate a panel"], "Meetings & Presentations"),
  w("slide", "n", "/slaɪd/", "basic", "Trang chiếu", "A page of a presentation", "Each slide should highlight one key idea.", [], ["presentation slide"], "Meetings & Presentations"),
  w("Q&A", "n", "/ˌkjuː ən ˈeɪ/", "basic", "Hỏi và đáp", "Question and answer session", "The Q&A will follow the keynote speech.", [], ["Q&A session"], "Meetings & Presentations"),
  w("preliminary", "adj", "/prɪˈlɪm.ɪ.nər.i/", "advanced", "Sơ bộ", "Coming before the main part", "These are only the preliminary results.", ["initial"], ["preliminary report"], "Meetings & Presentations"),
  w("postpone", "v", "/pəʊstˈpəʊn/", "intermediate", "Hoãn lại", "To delay an event", "Let's postpone the review meeting to Thursday.", ["delay"], ["postpone a meeting"], "Meetings & Presentations"),
  w("annotate", "v", "/ˈæn.ə.teɪt/", "advanced", "Chú thích", "To add explanatory notes", "Please annotate the slides before sharing them.", [], ["annotate a document"], "Meetings & Presentations"),
  w("follow-up", "n", "/ˈfɒl.əʊ ʌp/", "basic", "Việc theo dõi sau đó", "An action taken after an event", "I'll send a follow-up email this afternoon.", [], ["follow-up call"], "Meetings & Presentations"),

  // Sales & Marketing
  w("campaign", "n", "/kæmˈpeɪn/", "basic", "Chiến dịch", "An organised set of activities", "The new ad campaign launches next month.", [], ["marketing campaign"], "Sales & Marketing"),
  w("market share", "n", "/ˈmɑː.kɪt ʃeər/", "intermediate", "Thị phần", "A company's portion of a market", "Our market share grew by 5% this year.", [], ["gain market share"], "Sales & Marketing"),
  w("testimonial", "n", "/ˌtes.tɪˈməʊ.ni.əl/", "intermediate", "Lời chứng thực", "A positive customer statement", "Customer testimonials boost online sales.", ["review"], ["video testimonial"], "Sales & Marketing"),
  w("retailer", "n", "/ˈriː.teɪ.lər/", "basic", "Nhà bán lẻ", "A business that sells to consumers", "Major retailers stock our products nationwide.", [], ["online retailer"], "Sales & Marketing"),
  w("wholesale", "adj", "/ˈhəʊl.seɪl/", "intermediate", "Bán sỉ", "Selling in large quantities", "Wholesale prices are lower than retail.", [], ["wholesale price"], "Sales & Marketing"),
  w("affiliate", "n", "/əˈfɪl.i.ət/", "advanced", "Đối tác liên kết", "A partner who promotes products", "Affiliate marketing brings 20% of our revenue.", [], ["affiliate program"], "Sales & Marketing"),
  w("incentive", "n", "/ɪnˈsen.tɪv/", "intermediate", "Ưu đãi mua hàng", "Something offered to encourage buying", "We offer free shipping as a purchase incentive.", [], ["purchase incentive"], "Sales & Marketing"),
  w("benchmark", "n", "/ˈbentʃ.mɑːk/", "intermediate", "Chuẩn so sánh", "A standard for comparison", "Our service times set the industry benchmark.", ["standard"], ["benchmark performance"], "Sales & Marketing"),

  // Finance & Budgeting
  w("revenue", "n", "/ˈrev.ən.juː/", "basic", "Doanh thu", "Total income earned", "Annual revenue exceeded one billion dollars.", ["income"], ["total revenue"], "Finance & Budgeting"),
  w("equity", "n", "/ˈek.wɪ.ti/", "advanced", "Vốn chủ sở hữu", "Ownership value in a company", "She owns 10% equity in the startup.", [], ["private equity"], "Finance & Budgeting"),
  w("interest rate", "n", "/ˈɪn.trəst reɪt/", "intermediate", "Lãi suất", "Percentage charged on a loan", "Interest rates have risen sharply this year.", [], ["fixed interest rate"], "Finance & Budgeting"),
  w("withdraw", "v", "/wɪðˈdrɔː/", "basic", "Rút tiền", "To take money from an account", "You can withdraw cash at any ATM.", [], ["withdraw funds"], "Finance & Budgeting"),
  w("deposit", "n", "/dɪˈpɒz.ɪt/", "basic", "Tiền đặt cọc / gửi", "Money paid in advance", "A 20% deposit is required to book.", [], ["security deposit"], "Finance & Budgeting"),
  w("loan", "n", "/ləʊn/", "basic", "Khoản vay", "Money borrowed and repaid", "We applied for a small business loan.", ["credit"], ["bank loan"], "Finance & Budgeting"),
  w("portfolio", "n", "/pɔːtˈfəʊ.li.əʊ/", "intermediate", "Danh mục đầu tư", "A collection of investments", "A diverse portfolio reduces financial risk.", [], ["investment portfolio"], "Finance & Budgeting"),
  w("inflation", "n", "/ɪnˈfleɪ.ʃən/", "intermediate", "Lạm phát", "A general rise in prices", "Inflation has increased the cost of supplies.", [], ["high inflation"], "Finance & Budgeting"),

  // Travel & Transportation
  w("terminal", "n", "/ˈtɜː.mɪ.nəl/", "basic", "Nhà ga", "A building for transport passengers", "Our flight departs from Terminal 3.", [], ["airport terminal"], "Travel & Transportation"),
  w("transfer", "n", "/ˈtræns.fɜːr/", "basic", "Chuyến chuyển tiếp", "A change between vehicles", "Your hotel transfer is included in the booking.", [], ["airport transfer"], "Travel & Transportation"),
  w("expedite", "v", "/ˈek.spə.daɪt/", "advanced", "Đẩy nhanh", "To make happen faster", "Please expedite the delivery of these packages.", ["speed up"], ["expedite shipping"], "Travel & Transportation"),
  w("customs", "n", "/ˈkʌs.təmz/", "intermediate", "Hải quan", "Border duties and inspection", "Declare all items at customs upon arrival.", [], ["clear customs"], "Travel & Transportation"),
  w("voucher", "n", "/ˈvaʊ.tʃər/", "basic", "Phiếu giảm giá", "A document exchanged for goods", "Use the voucher for a free breakfast.", ["coupon"], ["travel voucher"], "Travel & Transportation"),
  w("freight", "n", "/freɪt/", "intermediate", "Hàng hóa vận chuyển", "Goods transported in bulk", "Freight charges depend on weight.", ["cargo"], ["freight forwarder"], "Travel & Transportation"),
  w("destination", "n", "/ˌdes.tɪˈneɪ.ʃən/", "basic", "Điểm đến", "The place one is traveling to", "Paris is a popular tourist destination.", [], ["final destination"], "Travel & Transportation"),
  w("shuttle", "n", "/ˈʃʌt.əl/", "basic", "Xe đưa đón", "A bus running short, fixed routes", "A free shuttle runs to the convention center.", [], ["shuttle service"], "Travel & Transportation"),

  // Contracts & Legal
  w("agreement", "n", "/əˈɡriː.mənt/", "basic", "Thỏa thuận", "An arrangement between parties", "Both sides signed the agreement yesterday.", ["contract"], ["mutual agreement"], "Contracts & Legal"),
  w("jurisdiction", "n", "/ˌdʒʊə.rɪsˈdɪk.ʃən/", "advanced", "Quyền tài phán", "Legal authority over an area", "This case is outside our jurisdiction.", [], ["legal jurisdiction"], "Contracts & Legal"),
  w("warranty", "n", "/ˈwɒr.ən.ti/", "intermediate", "Bảo hành", "A guarantee for products", "The laptop comes with a two-year warranty.", ["guarantee"], ["extended warranty"], "Contracts & Legal"),
  w("indemnity", "n", "/ɪnˈdem.nə.ti/", "advanced", "Sự bồi thường", "Protection against loss", "The contract includes an indemnity clause.", [], ["indemnity insurance"], "Contracts & Legal"),
  w("counterpart", "n", "/ˈkaʊn.tə.pɑːt/", "advanced", "Bên đối tác tương ứng", "A person with a matching role", "Each signed copy must reach its counterpart.", [], ["signed in counterparts"], "Contracts & Legal"),
  w("dispute", "n", "/dɪˈspjuːt/", "intermediate", "Tranh chấp", "A disagreement", "Any dispute will be settled by arbitration.", ["conflict"], ["legal dispute"], "Contracts & Legal"),
  w("compliance", "n", "/kəmˈplaɪ.əns/", "intermediate", "Sự tuân thủ", "Following rules or laws", "Compliance with safety standards is essential.", [], ["regulatory compliance"], "Contracts & Legal"),
  w("nullify", "v", "/ˈnʌl.ɪ.faɪ/", "advanced", "Hủy bỏ", "To make legally invalid", "Late payment may nullify the warranty.", ["void"], ["nullify a contract"], "Contracts & Legal"),

  // Technology & IT
  w("server", "n", "/ˈsɜː.vər/", "basic", "Máy chủ", "A computer that hosts data", "All emails are stored on the company server.", [], ["cloud server"], "Technology & IT"),
  w("bandwidth", "n", "/ˈbænd.wɪdθ/", "intermediate", "Băng thông", "Data transfer capacity", "Higher bandwidth speeds up video calls.", [], ["limited bandwidth"], "Technology & IT"),
  w("integrate", "v", "/ˈɪn.tɪ.ɡreɪt/", "intermediate", "Tích hợp", "To combine systems together", "We integrate sales data into the dashboard.", ["combine"], ["integrate APIs"], "Technology & IT"),
  w("interface", "n", "/ˈɪn.tə.feɪs/", "intermediate", "Giao diện", "How users interact with software", "The new interface is much easier to use.", [], ["user interface"], "Technology & IT"),
  w("malware", "n", "/ˈmæl.weər/", "intermediate", "Phần mềm độc hại", "Software designed to harm devices", "Antivirus tools block most known malware.", [], ["detect malware"], "Technology & IT"),
  w("upgrade", "v", "/ˈʌp.ɡreɪd/", "basic", "Nâng cấp", "To improve a system", "We will upgrade the software next weekend.", [], ["upgrade plan"], "Technology & IT"),
  w("prototype", "n", "/ˈprəʊ.tə.taɪp/", "intermediate", "Bản mẫu", "An early model of a product", "The prototype impressed our investors.", ["mockup"], ["working prototype"], "Technology & IT"),
  w("latency", "n", "/ˈleɪ.tən.si/", "advanced", "Độ trễ", "Delay in data transmission", "Low latency is critical for online gaming.", [], ["network latency"], "Technology & IT"),

  // Customer Service
  w("refund", "n", "/ˈriː.fʌnd/", "basic", "Hoàn tiền", "Money returned to a customer", "We issued a full refund for the defective item.", [], ["full refund"], "Customer Service"),
  w("inquiry", "n", "/ɪnˈkwaɪə.ri/", "basic", "Yêu cầu thông tin", "A request for information", "Please direct your inquiry to our help desk.", ["question"], ["customer inquiry"], "Customer Service"),
  w("guarantee", "n", "/ˌɡær.ənˈtiː/", "basic", "Sự đảm bảo", "A promise of quality", "We offer a 30-day money-back guarantee.", ["assurance"], ["satisfaction guarantee"], "Customer Service"),
  w("loyalty card", "n", "/ˈlɔɪ.əl.ti kɑːd/", "basic", "Thẻ khách hàng thân thiết", "A card that gives rewards", "Show your loyalty card to earn points.", [], [], "Customer Service"),
  w("feedback", "n", "/ˈfiːd.bæk/", "basic", "Phản hồi", "Comments on a product or service", "Customer feedback helps us improve.", [], ["positive feedback"], "Customer Service"),
  w("ticket", "n", "/ˈtɪk.ɪt/", "basic", "Phiếu yêu cầu hỗ trợ", "A support request log", "Open a ticket so the team can follow up.", [], ["support ticket"], "Customer Service"),
  w("apologise", "v", "/əˈpɒl.ə.dʒaɪz/", "basic", "Xin lỗi", "To say you are sorry", "We sincerely apologise for the inconvenience.", ["say sorry"], ["apologise to customers"], "Customer Service"),
  w("after-sales", "adj", "/ˌɑːf.təˈseɪlz/", "intermediate", "Hậu mãi", "Service provided after purchase", "Our after-sales support is available 24/7.", [], ["after-sales service"], "Customer Service"),

  // Events & Hospitality
  w("reservation", "n", "/ˌrez.əˈveɪ.ʃən/", "basic", "Đặt chỗ", "An arrangement to hold a place", "I made a reservation for two at 7 p.m.", ["booking"], ["hotel reservation"], "Events & Hospitality"),
  w("registration", "n", "/ˌredʒ.ɪˈstreɪ.ʃən/", "basic", "Đăng ký", "Signing up for an event", "Online registration opens next Monday.", [], ["event registration"], "Events & Hospitality"),
  w("itinerary", "n", "/aɪˈtɪn.ər.ər.i/", "intermediate", "Lịch trình sự kiện", "A schedule of activities", "Each guest received a printed itinerary.", ["schedule"], ["event itinerary"], "Events & Hospitality"),
  w("souvenir", "n", "/ˌsuː.vənˈɪər/", "basic", "Quà lưu niệm", "An item kept as a reminder", "Every attendee got a souvenir mug.", [], ["souvenir gift"], "Events & Hospitality"),
  w("vendor", "n", "/ˈven.dər/", "intermediate", "Nhà cung cấp", "A person who sells goods", "We hired three vendors for the food court.", ["supplier"], ["event vendor"], "Events & Hospitality"),
  w("decor", "n", "/ˈdeɪ.kɔːr/", "intermediate", "Trang trí", "Style of decoration", "The elegant decor wowed all the guests.", ["decoration"], ["event decor"], "Events & Hospitality"),
  w("toast", "n", "/təʊst/", "basic", "Lời chúc mừng", "A short speech with raised glasses", "He gave a heartfelt toast to the bride.", [], ["raise a toast"], "Events & Hospitality"),
  w("dress code", "n", "/ˈdres kəʊd/", "basic", "Quy định trang phục", "Required style of clothing", "The dress code for the gala is black tie.", [], ["formal dress code"], "Events & Hospitality"),
];
