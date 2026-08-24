/**
 * @file ieltsListeningPracticeExpansion8.ts
 * @description Wave 8 - 17 new Section 1 sets (form / note completion, 10 questions each) so IELTS Listening reaches 30 unique Section 1 recordings.
 *
 * Generated content, hand-curated topics. Every fill-in answer appears
 * verbatim in the transcript; MCQ keys and matching letters are balanced.
 *
 * @copyright 2026 HaiEduTech
 */
import type { ListeningPracticeSet } from "./ieltsListeningPractice";

export const ieltsListeningPracticeSetsExpansion8: ListeningPracticeSet[] = [
  {
    id: "form-clinic-appointment",
    section: 1,
    questionType: "Form / Note Completion",
    questionTypeVi: "Điền form / ghi chú",
    title: "Booking an Appointment at a Health Centre",
    titleVi: "Đặt hẹn tại trung tâm y tế",
    context: "You will hear a telephone conversation with Riverside Health Centre. Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    contextVi: "Bạn sẽ nghe cuộc gọi với Riverside Health Centre. Hoàn thành form bên dưới. Viết KHÔNG QUÁ HAI TỪ VÀ/HOẶC MỘT SỐ cho mỗi đáp án.",
    transcript:
      "Receptionist: Good morning, Riverside Health Centre. How can I help you today?\n" +
      "Caller: Hello. I'd like to register as a new patient and book a first appointment, please.\n" +
      "Receptionist: Of course. Could I start with your full name?\n" +
      "Caller: Yes, it's Daniel Whitfield. That's W-H-I-T-F-I-E-L-D.\n" +
      "Receptionist: Thank you. And your date of birth?\n" +
      "Caller: The ninth of April, nineteen ninety-three.\n" +
      "Receptionist: We have three options - a morning slot, an afternoon slot and an evening slot. Which would suit you best?\n" +
      "Caller: I'll take the evening option, please. What exactly does that include?\n" +
      "Receptionist: With the evening option you get twenty minutes with the nurse, and it also includes a free blood-pressure check. The annual charge for the travel-clinic service is twenty-five pounds.\n" +
      "Caller: That sounds reasonable, thank you.\n" +
      "Receptionist: Could I take your address as well?\n" +
      "Caller: It's 18 Ashgrove Road. The postcode is R-H-four, two-L-P.\n" +
      "Receptionist: And the best mobile number to reach you on?\n" +
      "Caller: It's oh-seven-eight-four-five, double-three, six-one-two.\n" +
      "Receptionist: Lovely. Is there anything else before I confirm everything?\n" +
      "Caller: Yes - could you also put me down for the flu vaccination clinic on Thursday?\n" +
      "Receptionist: That's all done. I'll email your confirmation this afternoon.",
    rate: 0.85,
    formTitle: "RIVERSIDE HEALTH CENTRE - BOOKING FORM",
    formLayout:
      "APPLICANT\n" +
      "  First name:            Daniel\n" +
      "  Surname:               {1}\n" +
      "  Date of birth:         9 April {2}\n" +
      "\n" +
      "BOOKING DETAILS\n" +
      "  Option chosen:         {3}\n" +
      "  Appointment length (minutes): {4}\n" +
      "  Price / fee:           £ {5}\n" +
      "  Also included:         {10}\n" +
      "\n" +
      "CONTACT\n" +
      "  Address:               18 {6} Road\n" +
      "  Postcode:              {7}\n" +
      "  Mobile:                07845 {8} 612\n" +
      "\n" +
      "EXTRAS\n" +
      "  Additional item:       {9}",
    questions: [
      { type: "fill-in", prompt: "Surname: ___", answer: "Whitfield", maxWords: 1 },
      { type: "fill-in", prompt: "Date of birth: 9 April ___", answer: "1993", maxWords: 1 },
      { type: "fill-in", prompt: "Option chosen: ___", answer: "evening", maxWords: 2 },
      { type: "fill-in", prompt: "Appointment length: ___ minutes", answer: "20", maxWords: 1 },
      { type: "fill-in", prompt: "annual charge for the travel-clinic service: £___", answer: "25", maxWords: 1 },
      { type: "fill-in", prompt: "Address: 18 ___ Road", answer: "Ashgrove", maxWords: 1 },
      { type: "fill-in", prompt: "Postcode: ___", answer: "RH4 2LP", maxWords: 2 },
      { type: "fill-in", prompt: "Mobile: 07845 ___ 612", answer: "33", maxWords: 1 },
      { type: "fill-in", prompt: "Also booked onto the ___ clinic", answer: "flu vaccination", maxWords: 2 },
      { type: "fill-in", prompt: "Free service included: ___", answer: "blood-pressure check", maxWords: 2 },
    ],
  },

  {
    id: "form-bike-rental",
    section: 1,
    questionType: "Form / Note Completion",
    questionTypeVi: "Điền form / ghi chú",
    title: "Hiring a Bicycle for a Week",
    titleVi: "Thuê xe đạp một tuần",
    context: "You will hear a telephone conversation with Harbour Cycle Hire. Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    contextVi: "Bạn sẽ nghe cuộc gọi với Harbour Cycle Hire. Hoàn thành form bên dưới. Viết KHÔNG QUÁ HAI TỪ VÀ/HOẶC MỘT SỐ cho mỗi đáp án.",
    transcript:
      "Assistant: Good morning, Harbour Cycle Hire. How can I help you today?\n" +
      "Caller: Hello. I'd like to hire a bicycle for a week, please.\n" +
      "Assistant: Of course. Could I start with your full name?\n" +
      "Caller: Yes, it's Marta Kowalski. That's K-O-W-A-L-S-K-I.\n" +
      "Assistant: Thank you. And your date of birth?\n" +
      "Caller: The third of June, nineteen ninety-six.\n" +
      "Assistant: We have three options - the city bike, the mountain bike and the electric bike. Which would suit you best?\n" +
      "Caller: I'll take the electric option, please. What exactly does that include?\n" +
      "Assistant: With the electric option you get seven days of hire, and the price also includes a repair kit. The total price is eighty-four pounds.\n" +
      "Caller: That sounds reasonable, thank you.\n" +
      "Assistant: Could I take your address as well?\n" +
      "Caller: It's 62 Marine Road. The postcode is P-L-one, three-T-Q.\n" +
      "Assistant: And the best mobile number to reach you on?\n" +
      "Caller: It's oh-seven-nine-two-three, double-seven, four-eight-oh.\n" +
      "Assistant: Lovely. Is there anything else before I confirm everything?\n" +
      "Caller: Yes - could you also put me down for the guided coastal ride on Sunday?\n" +
      "Assistant: That's all done. I'll email your confirmation this afternoon.",
    rate: 0.85,
    formTitle: "HARBOUR CYCLE HIRE - BOOKING FORM",
    formLayout:
      "APPLICANT\n" +
      "  First name:            Marta\n" +
      "  Surname:               {1}\n" +
      "  Date of birth:         3 June {2}\n" +
      "\n" +
      "BOOKING DETAILS\n" +
      "  Option chosen:         {3}\n" +
      "  Days of hire:          {4}\n" +
      "  Price / fee:           £ {5}\n" +
      "  Also included:         {10}\n" +
      "\n" +
      "CONTACT\n" +
      "  Address:               62 {6} Road\n" +
      "  Postcode:              {7}\n" +
      "  Mobile:                07923 {8} 480\n" +
      "\n" +
      "EXTRAS\n" +
      "  Additional item:       {9}",
    questions: [
      { type: "fill-in", prompt: "Surname: ___", answer: "Kowalski", maxWords: 1 },
      { type: "fill-in", prompt: "Date of birth: 3 June ___", answer: "1996", maxWords: 1 },
      { type: "fill-in", prompt: "Option chosen: ___", answer: "electric", maxWords: 2 },
      { type: "fill-in", prompt: "Number of days of hire: ___", answer: "7", maxWords: 1 },
      { type: "fill-in", prompt: "total price: £___", answer: "84", maxWords: 1 },
      { type: "fill-in", prompt: "Address: 62 ___ Road", answer: "Marine", maxWords: 1 },
      { type: "fill-in", prompt: "Postcode: ___", answer: "PL1 3TQ", maxWords: 2 },
      { type: "fill-in", prompt: "Mobile: 07923 ___ 480", answer: "77", maxWords: 1 },
      { type: "fill-in", prompt: "Also booked: guided ___ on Sunday", answer: "coastal ride", maxWords: 2 },
      { type: "fill-in", prompt: "Included with the bike: ___", answer: "repair kit", maxWords: 2 },
    ],
  },

  {
    id: "form-catering-order",
    section: 1,
    questionType: "Form / Note Completion",
    questionTypeVi: "Điền form / ghi chú",
    title: "Ordering Catering for an Office Event",
    titleVi: "Đặt tiệc cho sự kiện công ty",
    context: "You will hear a telephone conversation with Greenleaf Catering. Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    contextVi: "Bạn sẽ nghe cuộc gọi với Greenleaf Catering. Hoàn thành form bên dưới. Viết KHÔNG QUÁ HAI TỪ VÀ/HOẶC MỘT SỐ cho mỗi đáp án.",
    transcript:
      "Agent: Good morning, Greenleaf Catering. How can I help you today?\n" +
      "Caller: Hello. I'd like to order catering for a small office event, please.\n" +
      "Agent: Of course. Could I start with your full name?\n" +
      "Caller: Yes, it's Peter Ahmadi. That's A-H-M-A-D-I.\n" +
      "Agent: Thank you. And your date of birth?\n" +
      "Caller: The fourteenth of October, nineteen eighty-eight.\n" +
      "Agent: We have three options - the sandwich platter, the hot buffet and the finger buffet. Which would suit you best?\n" +
      "Caller: I'll take the hot buffet option, please. What exactly does that include?\n" +
      "Agent: With the hot buffet option you get thirty-five guests, and we also provide paper plates at no extra cost. The deposit is ninety pounds.\n" +
      "Caller: That sounds reasonable, thank you.\n" +
      "Agent: Could I take your address as well?\n" +
      "Caller: It's 7 Sterling Road. The postcode is L-S-nine, six-B-D.\n" +
      "Agent: And the best mobile number to reach you on?\n" +
      "Caller: It's oh-seven-six-one-oh, double-two, nine-oh-five.\n" +
      "Agent: Lovely. Is there anything else before I confirm everything?\n" +
      "Caller: Yes - could you also put me down for the vegetarian dessert tray?\n" +
      "Agent: That's all done. I'll email your confirmation this afternoon.",
    rate: 0.85,
    formTitle: "GREENLEAF CATERING - BOOKING FORM",
    formLayout:
      "APPLICANT\n" +
      "  First name:            Peter\n" +
      "  Surname:               {1}\n" +
      "  Date of birth:         14 October {2}\n" +
      "\n" +
      "BOOKING DETAILS\n" +
      "  Option chosen:         {3}\n" +
      "  Number of guests:      {4}\n" +
      "  Price / fee:           £ {5}\n" +
      "  Also included:         {10}\n" +
      "\n" +
      "CONTACT\n" +
      "  Address:               7 {6} Road\n" +
      "  Postcode:              {7}\n" +
      "  Mobile:                07610 {8} 905\n" +
      "\n" +
      "EXTRAS\n" +
      "  Additional item:       {9}",
    questions: [
      { type: "fill-in", prompt: "Surname: ___", answer: "Ahmadi", maxWords: 1 },
      { type: "fill-in", prompt: "Date of birth: 14 October ___", answer: "1988", maxWords: 1 },
      { type: "fill-in", prompt: "Option chosen: ___", answer: "hot buffet", maxWords: 2 },
      { type: "fill-in", prompt: "Number of guests: ___", answer: "35", maxWords: 1 },
      { type: "fill-in", prompt: "deposit: £___", answer: "90", maxWords: 1 },
      { type: "fill-in", prompt: "Address: 7 ___ Road", answer: "Sterling", maxWords: 1 },
      { type: "fill-in", prompt: "Postcode: ___", answer: "LS9 6BD", maxWords: 2 },
      { type: "fill-in", prompt: "Mobile: 07610 ___ 905", answer: "22", maxWords: 1 },
      { type: "fill-in", prompt: "Extra ordered: vegetarian ___", answer: "dessert tray", maxWords: 2 },
      { type: "fill-in", prompt: "Provided free of charge: ___", answer: "paper plates", maxWords: 2 },
    ],
  },

  {
    id: "form-removals-quote",
    section: 1,
    questionType: "Form / Note Completion",
    questionTypeVi: "Điền form / ghi chú",
    title: "Getting a Quote from a Removals Company",
    titleVi: "Xin báo giá công ty chuyển nhà",
    context: "You will hear a telephone conversation with Swift Move Removals. Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    contextVi: "Bạn sẽ nghe cuộc gọi với Swift Move Removals. Hoàn thành form bên dưới. Viết KHÔNG QUÁ HAI TỪ VÀ/HOẶC MỘT SỐ cho mỗi đáp án.",
    transcript:
      "Adviser: Good morning, Swift Move Removals. How can I help you today?\n" +
      "Caller: Hello. I'd like to get a quote for moving to a new flat, please.\n" +
      "Adviser: Of course. Could I start with your full name?\n" +
      "Caller: Yes, it's Grace Ellington. That's E-L-L-I-N-G-T-O-N.\n" +
      "Adviser: Thank you. And your date of birth?\n" +
      "Caller: The twenty-second of February, nineteen ninety-one.\n" +
      "Adviser: We have three options - the basic van, the standard service and the full packing service. Which would suit you best?\n" +
      "Caller: I'll take the full packing option, please. What exactly does that include?\n" +
      "Adviser: With the full packing option you get three removal staff, and the quote also covers basic insurance. The estimate is four hundred and twenty pounds.\n" +
      "Caller: That sounds reasonable, thank you.\n" +
      "Adviser: Could I take your address as well?\n" +
      "Caller: It's 44 Bramble Road. The postcode is N-G-seven, one-W-E.\n" +
      "Adviser: And the best mobile number to reach you on?\n" +
      "Caller: It's oh-seven-seven-three-three, five-eight, two-one-four.\n" +
      "Adviser: Lovely. Is there anything else before I confirm everything?\n" +
      "Caller: Yes - could you also put me down for the storage unit for two weeks?\n" +
      "Adviser: That's all done. I'll email your confirmation this afternoon.",
    rate: 0.85,
    formTitle: "SWIFT MOVE REMOVALS - BOOKING FORM",
    formLayout:
      "APPLICANT\n" +
      "  First name:            Grace\n" +
      "  Surname:               {1}\n" +
      "  Date of birth:         22 February {2}\n" +
      "\n" +
      "BOOKING DETAILS\n" +
      "  Option chosen:         {3}\n" +
      "  Number of staff:       {4}\n" +
      "  Price / fee:           £ {5}\n" +
      "  Also included:         {10}\n" +
      "\n" +
      "CONTACT\n" +
      "  Address:               44 {6} Road\n" +
      "  Postcode:              {7}\n" +
      "  Mobile:                07733 {8} 214\n" +
      "\n" +
      "EXTRAS\n" +
      "  Additional item:       {9}",
    questions: [
      { type: "fill-in", prompt: "Surname: ___", answer: "Ellington", maxWords: 1 },
      { type: "fill-in", prompt: "Date of birth: 22 February ___", answer: "1991", maxWords: 1 },
      { type: "fill-in", prompt: "Option chosen: ___", answer: "full packing", maxWords: 2 },
      { type: "fill-in", prompt: "Number of removal staff: ___", answer: "3", maxWords: 1 },
      { type: "fill-in", prompt: "estimate: £___", answer: "420", maxWords: 1 },
      { type: "fill-in", prompt: "Address: 44 ___ Road", answer: "Bramble", maxWords: 1 },
      { type: "fill-in", prompt: "Postcode: ___", answer: "NG7 1WE", maxWords: 2 },
      { type: "fill-in", prompt: "Mobile: 07733 ___ 214", answer: "58", maxWords: 1 },
      { type: "fill-in", prompt: "Extra requested: ___ for two weeks", answer: "storage unit", maxWords: 2 },
      { type: "fill-in", prompt: "Covered by the quote: ___", answer: "basic insurance", maxWords: 2 },
    ],
  },

  {
    id: "form-sports-club",
    section: 1,
    questionType: "Form / Note Completion",
    questionTypeVi: "Điền form / ghi chú",
    title: "Joining a Community Sports Club",
    titleVi: "Tham gia câu lạc bộ thể thao",
    context: "You will hear a telephone conversation with Fairview Sports Club. Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    contextVi: "Bạn sẽ nghe cuộc gọi với Fairview Sports Club. Hoàn thành form bên dưới. Viết KHÔNG QUÁ HAI TỪ VÀ/HOẶC MỘT SỐ cho mỗi đáp án.",
    transcript:
      "Officer: Good morning, Fairview Sports Club. How can I help you today?\n" +
      "Caller: Hello. I'd like to join the club and book a trial session, please.\n" +
      "Officer: Of course. Could I start with your full name?\n" +
      "Caller: Yes, it's Omar Haddad. That's H-A-D-D-A-D.\n" +
      "Officer: Thank you. And your date of birth?\n" +
      "Caller: The fifth of January, nineteen ninety-nine.\n" +
      "Officer: We have three options - the badminton section, the tennis section and the swimming section. Which would suit you best?\n" +
      "Caller: I'll take the tennis option, please. What exactly does that include?\n" +
      "Officer: With the tennis option you get two coaching sessions each week, and members also get free court booking. The monthly subscription is thirty-two pounds.\n" +
      "Caller: That sounds reasonable, thank you.\n" +
      "Officer: Could I take your address as well?\n" +
      "Caller: It's 91 Falcon Road. The postcode is C-V-two, four-H-G.\n" +
      "Officer: And the best mobile number to reach you on?\n" +
      "Caller: It's oh-seven-five-oh-eight, double-six, three-seven-one.\n" +
      "Officer: Lovely. Is there anything else before I confirm everything?\n" +
      "Caller: Yes - could you also put me down for the junior coaching course in August?\n" +
      "Officer: That's all done. I'll email your confirmation this afternoon.",
    rate: 0.85,
    formTitle: "FAIRVIEW SPORTS CLUB - BOOKING FORM",
    formLayout:
      "APPLICANT\n" +
      "  First name:            Omar\n" +
      "  Surname:               {1}\n" +
      "  Date of birth:         5 January {2}\n" +
      "\n" +
      "BOOKING DETAILS\n" +
      "  Option chosen:         {3}\n" +
      "  Coaching sessions per week: {4}\n" +
      "  Price / fee:           £ {5}\n" +
      "  Also included:         {10}\n" +
      "\n" +
      "CONTACT\n" +
      "  Address:               91 {6} Road\n" +
      "  Postcode:              {7}\n" +
      "  Mobile:                07508 {8} 371\n" +
      "\n" +
      "EXTRAS\n" +
      "  Additional item:       {9}",
    questions: [
      { type: "fill-in", prompt: "Surname: ___", answer: "Haddad", maxWords: 1 },
      { type: "fill-in", prompt: "Date of birth: 5 January ___", answer: "1999", maxWords: 1 },
      { type: "fill-in", prompt: "Option chosen: ___", answer: "tennis", maxWords: 2 },
      { type: "fill-in", prompt: "Coaching sessions each week: ___", answer: "2", maxWords: 1 },
      { type: "fill-in", prompt: "monthly subscription: £___", answer: "32", maxWords: 1 },
      { type: "fill-in", prompt: "Address: 91 ___ Road", answer: "Falcon", maxWords: 1 },
      { type: "fill-in", prompt: "Postcode: ___", answer: "CV2 4HG", maxWords: 2 },
      { type: "fill-in", prompt: "Mobile: 07508 ___ 371", answer: "66", maxWords: 1 },
      { type: "fill-in", prompt: "Also joining: junior ___ in August", answer: "coaching course", maxWords: 2 },
      { type: "fill-in", prompt: "Free for members: ___", answer: "court booking", maxWords: 2 },
    ],
  },

  {
    id: "form-ferry-tickets",
    section: 1,
    questionType: "Form / Note Completion",
    questionTypeVi: "Điền form / ghi chú",
    title: "Buying Ferry Tickets by Phone",
    titleVi: "Mua vé phà qua điện thoại",
    context: "You will hear a telephone conversation with Island Line Ferries. Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    contextVi: "Bạn sẽ nghe cuộc gọi với Island Line Ferries. Hoàn thành form bên dưới. Viết KHÔNG QUÁ HAI TỪ VÀ/HOẶC MỘT SỐ cho mỗi đáp án.",
    transcript:
      "Receptionist: Good morning, Island Line Ferries. How can I help you today?\n" +
      "Caller: Hello. I'd like to book return ferry tickets for a family trip, please.\n" +
      "Receptionist: Of course. Could I start with your full name?\n" +
      "Caller: Yes, it's Lucy Osborne. That's O-S-B-O-R-N-E.\n" +
      "Receptionist: Thank you. And your date of birth?\n" +
      "Caller: The twenty-seventh of July, nineteen eighty-five.\n" +
      "Receptionist: We have three options - the foot-passenger fare, the car fare and the campervan fare. Which would suit you best?\n" +
      "Caller: I'll take the car option, please. What exactly does that include?\n" +
      "Receptionist: With the car option you get four passengers, and the fare also includes seat reservations. The return fare is seventy-six pounds.\n" +
      "Caller: That sounds reasonable, thank you.\n" +
      "Receptionist: Could I take your address as well?\n" +
      "Caller: It's 12 Pembroke Road. The postcode is S-O-one-five, two-R-J.\n" +
      "Receptionist: And the best mobile number to reach you on?\n" +
      "Caller: It's oh-seven-four-six-one, double-nine, five-three-oh.\n" +
      "Receptionist: Lovely. Is there anything else before I confirm everything?\n" +
      "Caller: Yes - could you also put me down for the breakfast voucher for the crossing?\n" +
      "Receptionist: That's all done. I'll email your confirmation this afternoon.",
    rate: 0.85,
    formTitle: "ISLAND LINE FERRIES - BOOKING FORM",
    formLayout:
      "APPLICANT\n" +
      "  First name:            Lucy\n" +
      "  Surname:               {1}\n" +
      "  Date of birth:         27 July {2}\n" +
      "\n" +
      "BOOKING DETAILS\n" +
      "  Option chosen:         {3}\n" +
      "  Number of passengers:  {4}\n" +
      "  Price / fee:           £ {5}\n" +
      "  Also included:         {10}\n" +
      "\n" +
      "CONTACT\n" +
      "  Address:               12 {6} Road\n" +
      "  Postcode:              {7}\n" +
      "  Mobile:                07461 {8} 530\n" +
      "\n" +
      "EXTRAS\n" +
      "  Additional item:       {9}",
    questions: [
      { type: "fill-in", prompt: "Surname: ___", answer: "Osborne", maxWords: 1 },
      { type: "fill-in", prompt: "Date of birth: 27 July ___", answer: "1985", maxWords: 1 },
      { type: "fill-in", prompt: "Option chosen: ___", answer: "car", maxWords: 2 },
      { type: "fill-in", prompt: "Number of passengers: ___", answer: "4", maxWords: 1 },
      { type: "fill-in", prompt: "return fare: £___", answer: "76", maxWords: 1 },
      { type: "fill-in", prompt: "Address: 12 ___ Road", answer: "Pembroke", maxWords: 1 },
      { type: "fill-in", prompt: "Postcode: ___", answer: "SO15 2RJ", maxWords: 2 },
      { type: "fill-in", prompt: "Mobile: 07461 ___ 530", answer: "99", maxWords: 1 },
      { type: "fill-in", prompt: "Extra added: ___ for the crossing", answer: "breakfast voucher", maxWords: 2 },
      { type: "fill-in", prompt: "Included in the fare: ___", answer: "seat reservations", maxWords: 2 },
    ],
  },

  {
    id: "form-evening-class",
    section: 1,
    questionType: "Form / Note Completion",
    questionTypeVi: "Điền form / ghi chú",
    title: "Enrolling on an Evening Class",
    titleVi: "Đăng ký lớp học buổi tối",
    context: "You will hear a telephone conversation with Northgate Adult Education. Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    contextVi: "Bạn sẽ nghe cuộc gọi với Northgate Adult Education. Hoàn thành form bên dưới. Viết KHÔNG QUÁ HAI TỪ VÀ/HOẶC MỘT SỐ cho mỗi đáp án.",
    transcript:
      "Assistant: Good morning, Northgate Adult Education. How can I help you today?\n" +
      "Caller: Hello. I'd like to enrol on an evening course, please.\n" +
      "Assistant: Of course. Could I start with your full name?\n" +
      "Caller: Yes, it's Adam Petrov. That's P-E-T-R-O-V.\n" +
      "Assistant: Thank you. And your date of birth?\n" +
      "Caller: The sixteenth of September, nineteen ninety-four.\n" +
      "Assistant: We have three options - the photography course, the pottery course and the creative writing course. Which would suit you best?\n" +
      "Caller: I'll take the pottery option, please. What exactly does that include?\n" +
      "Assistant: With the pottery option you get ten weekly sessions, and the fee also covers all the clay. The course fee is one hundred and forty-five pounds.\n" +
      "Caller: That sounds reasonable, thank you.\n" +
      "Assistant: Could I take your address as well?\n" +
      "Caller: It's 29 Kestrel Road. The postcode is M-two-zero, five-D-F.\n" +
      "Assistant: And the best mobile number to reach you on?\n" +
      "Caller: It's oh-seven-three-nine-four, four-one, seven-two-eight.\n" +
      "Assistant: Lovely. Is there anything else before I confirm everything?\n" +
      "Caller: Yes - could you also put me down for the open studio on Saturday mornings?\n" +
      "Assistant: That's all done. I'll email your confirmation this afternoon.",
    rate: 0.85,
    formTitle: "NORTHGATE ADULT EDUCATION - BOOKING FORM",
    formLayout:
      "APPLICANT\n" +
      "  First name:            Adam\n" +
      "  Surname:               {1}\n" +
      "  Date of birth:         16 September {2}\n" +
      "\n" +
      "BOOKING DETAILS\n" +
      "  Option chosen:         {3}\n" +
      "  Number of sessions:    {4}\n" +
      "  Price / fee:           £ {5}\n" +
      "  Also included:         {10}\n" +
      "\n" +
      "CONTACT\n" +
      "  Address:               29 {6} Road\n" +
      "  Postcode:              {7}\n" +
      "  Mobile:                07394 {8} 728\n" +
      "\n" +
      "EXTRAS\n" +
      "  Additional item:       {9}",
    questions: [
      { type: "fill-in", prompt: "Surname: ___", answer: "Petrov", maxWords: 1 },
      { type: "fill-in", prompt: "Date of birth: 16 September ___", answer: "1994", maxWords: 1 },
      { type: "fill-in", prompt: "Option chosen: ___", answer: "pottery", maxWords: 2 },
      { type: "fill-in", prompt: "Number of weekly sessions: ___", answer: "10", maxWords: 1 },
      { type: "fill-in", prompt: "course fee: £___", answer: "145", maxWords: 1 },
      { type: "fill-in", prompt: "Address: 29 ___ Road", answer: "Kestrel", maxWords: 1 },
      { type: "fill-in", prompt: "Postcode: ___", answer: "M20 5DF", maxWords: 2 },
      { type: "fill-in", prompt: "Mobile: 07394 ___ 728", answer: "41", maxWords: 1 },
      { type: "fill-in", prompt: "Also attending: ___ on Saturdays", answer: "open studio", maxWords: 2 },
      { type: "fill-in", prompt: "Covered by the fee: all ___", answer: "the clay", maxWords: 2 },
    ],
  },

  {
    id: "form-lost-property",
    section: 1,
    questionType: "Form / Note Completion",
    questionTypeVi: "Điền form / ghi chú",
    title: "Reporting Lost Property at a Station",
    titleVi: "Khai báo mất đồ ở nhà ga",
    context: "You will hear a telephone conversation with Central Station Lost Property. Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    contextVi: "Bạn sẽ nghe cuộc gọi với Central Station Lost Property. Hoàn thành form bên dưới. Viết KHÔNG QUÁ HAI TỪ VÀ/HOẶC MỘT SỐ cho mỗi đáp án.",
    transcript:
      "Agent: Good morning, Central Station Lost Property. How can I help you today?\n" +
      "Caller: Hello. I'd like to report a bag I left on a train, please.\n" +
      "Agent: Of course. Could I start with your full name?\n" +
      "Caller: Yes, it's Hannah Fitzgerald. That's F-I-T-Z-G-E-R-A-L-D.\n" +
      "Agent: Thank you. And your date of birth?\n" +
      "Caller: The eighth of May, nineteen ninety-seven.\n" +
      "Agent: We have three options - collection in person, delivery by courier and collection by a friend. Which would suit you best?\n" +
      "Caller: I'll take the courier delivery option, please. What exactly does that include?\n" +
      "Agent: With the courier delivery option you get fourteen days that items are stored, and we also send a text message when it arrives. The handling charge is twelve pounds.\n" +
      "Caller: That sounds reasonable, thank you.\n" +
      "Agent: Could I take your address as well?\n" +
      "Caller: It's 5 Cavendish Road. The postcode is B-one-five, three-Q-E.\n" +
      "Agent: And the best mobile number to reach you on?\n" +
      "Caller: It's oh-seven-two-one-nine, double-eight, one-four-six.\n" +
      "Agent: Lovely. Is there anything else before I confirm everything?\n" +
      "Caller: Yes - could you also put me down for the reference number by email?\n" +
      "Agent: That's all done. I'll email your confirmation this afternoon.",
    rate: 0.85,
    formTitle: "CENTRAL STATION LOST PROPERTY - BOOKING FORM",
    formLayout:
      "APPLICANT\n" +
      "  First name:            Hannah\n" +
      "  Surname:               {1}\n" +
      "  Date of birth:         8 May {2}\n" +
      "\n" +
      "BOOKING DETAILS\n" +
      "  Option chosen:         {3}\n" +
      "  Storage period (days): {4}\n" +
      "  Price / fee:           £ {5}\n" +
      "  Also included:         {10}\n" +
      "\n" +
      "CONTACT\n" +
      "  Address:               5 {6} Road\n" +
      "  Postcode:              {7}\n" +
      "  Mobile:                07219 {8} 146\n" +
      "\n" +
      "EXTRAS\n" +
      "  Additional item:       {9}",
    questions: [
      { type: "fill-in", prompt: "Surname: ___", answer: "Fitzgerald", maxWords: 1 },
      { type: "fill-in", prompt: "Date of birth: 8 May ___", answer: "1997", maxWords: 1 },
      { type: "fill-in", prompt: "Option chosen: ___", answer: "courier delivery", maxWords: 2 },
      { type: "fill-in", prompt: "Items are stored for ___ days", answer: "14", maxWords: 1 },
      { type: "fill-in", prompt: "handling charge: £___", answer: "12", maxWords: 1 },
      { type: "fill-in", prompt: "Address: 5 ___ Road", answer: "Cavendish", maxWords: 1 },
      { type: "fill-in", prompt: "Postcode: ___", answer: "B15 3QE", maxWords: 2 },
      { type: "fill-in", prompt: "Mobile: 07219 ___ 146", answer: "88", maxWords: 1 },
      { type: "fill-in", prompt: "Also requested: ___ by email", answer: "reference number", maxWords: 2 },
      { type: "fill-in", prompt: "Notification method: ___", answer: "text message", maxWords: 2 },
    ],
  },

  {
    id: "form-bank-account",
    section: 1,
    questionType: "Form / Note Completion",
    questionTypeVi: "Điền form / ghi chú",
    title: "Opening a Student Bank Account",
    titleVi: "Mở tài khoản ngân hàng sinh viên",
    context: "You will hear a telephone conversation with Meridian Bank. Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    contextVi: "Bạn sẽ nghe cuộc gọi với Meridian Bank. Hoàn thành form bên dưới. Viết KHÔNG QUÁ HAI TỪ VÀ/HOẶC MỘT SỐ cho mỗi đáp án.",
    transcript:
      "Adviser: Good morning, Meridian Bank. How can I help you today?\n" +
      "Caller: Hello. I'd like to open a student bank account, please.\n" +
      "Adviser: Of course. Could I start with your full name?\n" +
      "Caller: Yes, it's Chen Liang. That's L-I-A-N-G.\n" +
      "Adviser: Thank you. And your date of birth?\n" +
      "Caller: The thirtieth of November, two thousand and zero.\n" +
      "Adviser: We have three options - the basic account, the student account and the graduate account. Which would suit you best?\n" +
      "Caller: I'll take the student option, please. What exactly does that include?\n" +
      "Adviser: With the student option you get five hundred pounds of interest-free overdraft, and the account also comes with a travel card. The replacement card fee is six pounds.\n" +
      "Caller: That sounds reasonable, thank you.\n" +
      "Adviser: Could I take your address as well?\n" +
      "Caller: It's 73 Wellington Road. The postcode is E-H-eight, nine-Y-T.\n" +
      "Adviser: And the best mobile number to reach you on?\n" +
      "Caller: It's oh-seven-one-eight-two, double-five, six-oh-three.\n" +
      "Adviser: Lovely. Is there anything else before I confirm everything?\n" +
      "Caller: Yes - could you also put me down for the budgeting workshop in Freshers' Week?\n" +
      "Adviser: That's all done. I'll email your confirmation this afternoon.",
    rate: 0.85,
    formTitle: "MERIDIAN BANK - BOOKING FORM",
    formLayout:
      "APPLICANT\n" +
      "  First name:            Chen\n" +
      "  Surname:               {1}\n" +
      "  Date of birth:         30 November {2}\n" +
      "\n" +
      "BOOKING DETAILS\n" +
      "  Option chosen:         {3}\n" +
      "  Interest-free overdraft (£): {4}\n" +
      "  Price / fee:           £ {5}\n" +
      "  Also included:         {10}\n" +
      "\n" +
      "CONTACT\n" +
      "  Address:               73 {6} Road\n" +
      "  Postcode:              {7}\n" +
      "  Mobile:                07182 {8} 603\n" +
      "\n" +
      "EXTRAS\n" +
      "  Additional item:       {9}",
    questions: [
      { type: "fill-in", prompt: "Surname: ___", answer: "Liang", maxWords: 1 },
      { type: "fill-in", prompt: "Date of birth: 30 November ___", answer: "2000", maxWords: 1 },
      { type: "fill-in", prompt: "Option chosen: ___", answer: "student", maxWords: 2 },
      { type: "fill-in", prompt: "Interest-free overdraft: £___", answer: "500", maxWords: 1 },
      { type: "fill-in", prompt: "replacement card fee: £___", answer: "6", maxWords: 1 },
      { type: "fill-in", prompt: "Address: 73 ___ Road", answer: "Wellington", maxWords: 1 },
      { type: "fill-in", prompt: "Postcode: ___", answer: "EH8 9YT", maxWords: 2 },
      { type: "fill-in", prompt: "Mobile: 07182 ___ 603", answer: "55", maxWords: 1 },
      { type: "fill-in", prompt: "Also signed up for: ___", answer: "budgeting workshop", maxWords: 2 },
      { type: "fill-in", prompt: "Comes with the account: ___", answer: "travel card", maxWords: 2 },
    ],
  },

  {
    id: "form-dentist-registration",
    section: 1,
    questionType: "Form / Note Completion",
    questionTypeVi: "Điền form / ghi chú",
    title: "Registering with a Dental Practice",
    titleVi: "Đăng ký phòng khám nha khoa",
    context: "You will hear a telephone conversation with Bridgeway Dental Practice. Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    contextVi: "Bạn sẽ nghe cuộc gọi với Bridgeway Dental Practice. Hoàn thành form bên dưới. Viết KHÔNG QUÁ HAI TỪ VÀ/HOẶC MỘT SỐ cho mỗi đáp án.",
    transcript:
      "Officer: Good morning, Bridgeway Dental Practice. How can I help you today?\n" +
      "Caller: Hello. I'd like to register with the practice for a check-up, please.\n" +
      "Officer: Of course. Could I start with your full name?\n" +
      "Caller: Yes, it's Sofia Marchetti. That's M-A-R-C-H-E-T-T-I.\n" +
      "Officer: Thank you. And your date of birth?\n" +
      "Caller: The eleventh of March, nineteen ninety.\n" +
      "Officer: We have three options - the pay-as-you-go option, the monthly plan and the family plan. Which would suit you best?\n" +
      "Caller: I'll take the monthly plan option, please. What exactly does that include?\n" +
      "Officer: With the monthly plan option you get six months between check-ups, and the plan also includes emergency cover. The first check-up fee is forty-eight pounds.\n" +
      "Caller: That sounds reasonable, thank you.\n" +
      "Officer: Could I take your address as well?\n" +
      "Caller: It's 36 Linden Road. The postcode is T-N-one, five-A-F.\n" +
      "Officer: And the best mobile number to reach you on?\n" +
      "Caller: It's oh-seven-nine-four-six, two-seven, eight-five-nine.\n" +
      "Officer: Lovely. Is there anything else before I confirm everything?\n" +
      "Caller: Yes - could you also put me down for the hygienist appointment in April?\n" +
      "Officer: That's all done. I'll email your confirmation this afternoon.",
    rate: 0.85,
    formTitle: "BRIDGEWAY DENTAL PRACTICE - BOOKING FORM",
    formLayout:
      "APPLICANT\n" +
      "  First name:            Sofia\n" +
      "  Surname:               {1}\n" +
      "  Date of birth:         11 March {2}\n" +
      "\n" +
      "BOOKING DETAILS\n" +
      "  Option chosen:         {3}\n" +
      "  Months between check-ups: {4}\n" +
      "  Price / fee:           £ {5}\n" +
      "  Also included:         {10}\n" +
      "\n" +
      "CONTACT\n" +
      "  Address:               36 {6} Road\n" +
      "  Postcode:              {7}\n" +
      "  Mobile:                07946 {8} 859\n" +
      "\n" +
      "EXTRAS\n" +
      "  Additional item:       {9}",
    questions: [
      { type: "fill-in", prompt: "Surname: ___", answer: "Marchetti", maxWords: 1 },
      { type: "fill-in", prompt: "Date of birth: 11 March ___", answer: "1990", maxWords: 1 },
      { type: "fill-in", prompt: "Option chosen: ___", answer: "monthly plan", maxWords: 2 },
      { type: "fill-in", prompt: "Check-ups take place every ___ months", answer: "6", maxWords: 1 },
      { type: "fill-in", prompt: "first check-up fee: £___", answer: "48", maxWords: 1 },
      { type: "fill-in", prompt: "Address: 36 ___ Road", answer: "Linden", maxWords: 1 },
      { type: "fill-in", prompt: "Postcode: ___", answer: "TN1 5AF", maxWords: 2 },
      { type: "fill-in", prompt: "Mobile: 07946 ___ 859", answer: "27", maxWords: 1 },
      { type: "fill-in", prompt: "Also booked: ___", answer: "hygienist appointment", maxWords: 2 },
      { type: "fill-in", prompt: "Included in the plan: ___", answer: "emergency cover", maxWords: 2 },
    ],
  },

  {
    id: "form-car-service",
    section: 1,
    questionType: "Form / Note Completion",
    questionTypeVi: "Điền form / ghi chú",
    title: "Booking a Car Service and MOT",
    titleVi: "Đặt lịch bảo dưỡng xe",
    context: "You will hear a telephone conversation with Hilltop Garage. Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    contextVi: "Bạn sẽ nghe cuộc gọi với Hilltop Garage. Hoàn thành form bên dưới. Viết KHÔNG QUÁ HAI TỪ VÀ/HOẶC MỘT SỐ cho mỗi đáp án.",
    transcript:
      "Receptionist: Good morning, Hilltop Garage. How can I help you today?\n" +
      "Caller: Hello. I'd like to book a service and an MOT test for my car, please.\n" +
      "Receptionist: Of course. Could I start with your full name?\n" +
      "Caller: Yes, it's Ryan Docherty. That's D-O-C-H-E-R-T-Y.\n" +
      "Receptionist: Thank you. And your date of birth?\n" +
      "Caller: The nineteenth of August, nineteen eighty-seven.\n" +
      "Receptionist: We have three options - the interim service, the full service and the major service. Which would suit you best?\n" +
      "Caller: I'll take the full service option, please. What exactly does that include?\n" +
      "Receptionist: With the full service option you get ninety minutes for the whole job, and the price also includes a courtesy car. The combined price is one hundred and sixty-five pounds.\n" +
      "Caller: That sounds reasonable, thank you.\n" +
      "Receptionist: Could I take your address as well?\n" +
      "Caller: It's 54 Hazelwood Road. The postcode is D-E-one, two-S-N.\n" +
      "Receptionist: And the best mobile number to reach you on?\n" +
      "Caller: It's oh-seven-five-seven-five, three-one, four-nine-two.\n" +
      "Receptionist: Lovely. Is there anything else before I confirm everything?\n" +
      "Caller: Yes - could you also put me down for the wheel alignment check?\n" +
      "Receptionist: That's all done. I'll email your confirmation this afternoon.",
    rate: 0.85,
    formTitle: "HILLTOP GARAGE - BOOKING FORM",
    formLayout:
      "APPLICANT\n" +
      "  First name:            Ryan\n" +
      "  Surname:               {1}\n" +
      "  Date of birth:         19 August {2}\n" +
      "\n" +
      "BOOKING DETAILS\n" +
      "  Option chosen:         {3}\n" +
      "  Time needed (minutes): {4}\n" +
      "  Price / fee:           £ {5}\n" +
      "  Also included:         {10}\n" +
      "\n" +
      "CONTACT\n" +
      "  Address:               54 {6} Road\n" +
      "  Postcode:              {7}\n" +
      "  Mobile:                07575 {8} 492\n" +
      "\n" +
      "EXTRAS\n" +
      "  Additional item:       {9}",
    questions: [
      { type: "fill-in", prompt: "Surname: ___", answer: "Docherty", maxWords: 1 },
      { type: "fill-in", prompt: "Date of birth: 19 August ___", answer: "1987", maxWords: 1 },
      { type: "fill-in", prompt: "Option chosen: ___", answer: "full service", maxWords: 2 },
      { type: "fill-in", prompt: "Total time needed: ___ minutes", answer: "90", maxWords: 1 },
      { type: "fill-in", prompt: "combined price: £___", answer: "165", maxWords: 1 },
      { type: "fill-in", prompt: "Address: 54 ___ Road", answer: "Hazelwood", maxWords: 1 },
      { type: "fill-in", prompt: "Postcode: ___", answer: "DE1 2SN", maxWords: 2 },
      { type: "fill-in", prompt: "Mobile: 07575 ___ 492", answer: "31", maxWords: 1 },
      { type: "fill-in", prompt: "Extra work agreed: ___ check", answer: "wheel alignment", maxWords: 2 },
      { type: "fill-in", prompt: "Included in the price: ___", answer: "courtesy car", maxWords: 2 },
    ],
  },

  {
    id: "form-festival-stall",
    section: 1,
    questionType: "Form / Note Completion",
    questionTypeVi: "Điền form / ghi chú",
    title: "Applying for a Stall at a Food Festival",
    titleVi: "Đăng ký gian hàng tại lễ hội đồ ăn",
    context: "You will hear a telephone conversation with Harbourside Food Festival. Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    contextVi: "Bạn sẽ nghe cuộc gọi với Harbourside Food Festival. Hoàn thành form bên dưới. Viết KHÔNG QUÁ HAI TỪ VÀ/HOẶC MỘT SỐ cho mỗi đáp án.",
    transcript:
      "Assistant: Good morning, Harbourside Food Festival. How can I help you today?\n" +
      "Caller: Hello. I'd like to apply for a stall at the festival, please.\n" +
      "Assistant: Of course. Could I start with your full name?\n" +
      "Caller: Yes, it's Nadia Belhadj. That's B-E-L-H-A-D-J.\n" +
      "Assistant: Thank you. And your date of birth?\n" +
      "Caller: The twenty-fifth of April, nineteen ninety-two.\n" +
      "Assistant: We have three options - the small pitch, the medium pitch and the corner pitch. Which would suit you best?\n" +
      "Caller: I'll take the corner pitch option, please. What exactly does that include?\n" +
      "Assistant: With the corner pitch option you get three metres of frontage, and the fee also covers the power supply. The pitch fee is one hundred and ten pounds.\n" +
      "Caller: That sounds reasonable, thank you.\n" +
      "Assistant: Could I take your address as well?\n" +
      "Caller: It's 8 Trafalgar Road. The postcode is B-S-three, four-X-P.\n" +
      "Assistant: And the best mobile number to reach you on?\n" +
      "Caller: It's oh-seven-eight-oh-two, six-four, three-one-seven.\n" +
      "Assistant: Lovely. Is there anything else before I confirm everything?\n" +
      "Caller: Yes - could you also put me down for the waste collection service?\n" +
      "Assistant: That's all done. I'll email your confirmation this afternoon.",
    rate: 0.85,
    formTitle: "HARBOURSIDE FOOD FESTIVAL - BOOKING FORM",
    formLayout:
      "APPLICANT\n" +
      "  First name:            Nadia\n" +
      "  Surname:               {1}\n" +
      "  Date of birth:         25 April {2}\n" +
      "\n" +
      "BOOKING DETAILS\n" +
      "  Option chosen:         {3}\n" +
      "  Frontage (metres):     {4}\n" +
      "  Price / fee:           £ {5}\n" +
      "  Also included:         {10}\n" +
      "\n" +
      "CONTACT\n" +
      "  Address:               8 {6} Road\n" +
      "  Postcode:              {7}\n" +
      "  Mobile:                07802 {8} 317\n" +
      "\n" +
      "EXTRAS\n" +
      "  Additional item:       {9}",
    questions: [
      { type: "fill-in", prompt: "Surname: ___", answer: "Belhadj", maxWords: 1 },
      { type: "fill-in", prompt: "Date of birth: 25 April ___", answer: "1992", maxWords: 1 },
      { type: "fill-in", prompt: "Option chosen: ___", answer: "corner pitch", maxWords: 2 },
      { type: "fill-in", prompt: "Width of frontage: ___ metres", answer: "3", maxWords: 1 },
      { type: "fill-in", prompt: "pitch fee: £___", answer: "110", maxWords: 1 },
      { type: "fill-in", prompt: "Address: 8 ___ Road", answer: "Trafalgar", maxWords: 1 },
      { type: "fill-in", prompt: "Postcode: ___", answer: "BS3 4XP", maxWords: 2 },
      { type: "fill-in", prompt: "Mobile: 07802 ___ 317", answer: "64", maxWords: 1 },
      { type: "fill-in", prompt: "Extra requested: ___ service", answer: "waste collection", maxWords: 2 },
      { type: "fill-in", prompt: "Covered by the fee: ___", answer: "power supply", maxWords: 2 },
    ],
  },

  {
    id: "form-homestay-booking",
    section: 1,
    questionType: "Form / Note Completion",
    questionTypeVi: "Điền form / ghi chú",
    title: "Arranging a Homestay for a Language Trip",
    titleVi: "Sắp xếp homestay cho chuyến học ngoại ngữ",
    context: "You will hear a telephone conversation with Bayside Homestay Office. Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    contextVi: "Bạn sẽ nghe cuộc gọi với Bayside Homestay Office. Hoàn thành form bên dưới. Viết KHÔNG QUÁ HAI TỪ VÀ/HOẶC MỘT SỐ cho mỗi đáp án.",
    transcript:
      "Agent: Good morning, Bayside Homestay Office. How can I help you today?\n" +
      "Caller: Hello. I'd like to arrange a homestay place for a language course, please.\n" +
      "Agent: Of course. Could I start with your full name?\n" +
      "Caller: Yes, it's Tomas Nyberg. That's N-Y-B-E-R-G.\n" +
      "Agent: Thank you. And your date of birth?\n" +
      "Caller: The second of October, nineteen ninety-eight.\n" +
      "Agent: We have three options - a single room, a twin room and a studio flat. Which would suit you best?\n" +
      "Caller: I'll take the single room option, please. What exactly does that include?\n" +
      "Agent: With the single room option you get five weeks of accommodation, and the rate also includes two meals a day. The weekly rate is two hundred and fifteen pounds.\n" +
      "Caller: That sounds reasonable, thank you.\n" +
      "Agent: Could I take your address as well?\n" +
      "Caller: It's 21 Beaumont Road. The postcode is B-N-two, one-Q-D.\n" +
      "Agent: And the best mobile number to reach you on?\n" +
      "Caller: It's oh-seven-three-two-seven, one-nine, seven-oh-four.\n" +
      "Agent: Lovely. Is there anything else before I confirm everything?\n" +
      "Caller: Yes - could you also put me down for the airport pick-up on arrival?\n" +
      "Agent: That's all done. I'll email your confirmation this afternoon.",
    rate: 0.85,
    formTitle: "BAYSIDE HOMESTAY OFFICE - BOOKING FORM",
    formLayout:
      "APPLICANT\n" +
      "  First name:            Tomas\n" +
      "  Surname:               {1}\n" +
      "  Date of birth:         2 October {2}\n" +
      "\n" +
      "BOOKING DETAILS\n" +
      "  Option chosen:         {3}\n" +
      "  Length of stay (weeks): {4}\n" +
      "  Price / fee:           £ {5}\n" +
      "  Also included:         {10}\n" +
      "\n" +
      "CONTACT\n" +
      "  Address:               21 {6} Road\n" +
      "  Postcode:              {7}\n" +
      "  Mobile:                07327 {8} 704\n" +
      "\n" +
      "EXTRAS\n" +
      "  Additional item:       {9}",
    questions: [
      { type: "fill-in", prompt: "Surname: ___", answer: "Nyberg", maxWords: 1 },
      { type: "fill-in", prompt: "Date of birth: 2 October ___", answer: "1998", maxWords: 1 },
      { type: "fill-in", prompt: "Option chosen: ___", answer: "single room", maxWords: 2 },
      { type: "fill-in", prompt: "Length of stay: ___ weeks", answer: "5", maxWords: 1 },
      { type: "fill-in", prompt: "weekly rate: £___", answer: "215", maxWords: 1 },
      { type: "fill-in", prompt: "Address: 21 ___ Road", answer: "Beaumont", maxWords: 1 },
      { type: "fill-in", prompt: "Postcode: ___", answer: "BN2 1QD", maxWords: 2 },
      { type: "fill-in", prompt: "Mobile: 07327 ___ 704", answer: "19", maxWords: 1 },
      { type: "fill-in", prompt: "Extra arranged: ___", answer: "airport pick-up", maxWords: 2 },
      { type: "fill-in", prompt: "Included in the rate: ___ a day", answer: "two meals", maxWords: 2 },
    ],
  },

  {
    id: "form-museum-group-booking",
    section: 1,
    questionType: "Form / Note Completion",
    questionTypeVi: "Điền form / ghi chú",
    title: "Booking a School Group Visit to a Museum",
    titleVi: "Đặt lịch tham quan bảo tàng cho nhóm học sinh",
    context: "You will hear a telephone conversation with City Science Museum. Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    contextVi: "Bạn sẽ nghe cuộc gọi với City Science Museum. Hoàn thành form bên dưới. Viết KHÔNG QUÁ HAI TỪ VÀ/HOẶC MỘT SỐ cho mỗi đáp án.",
    transcript:
      "Adviser: Good morning, City Science Museum. How can I help you today?\n" +
      "Caller: Hello. I'd like to book a group visit for a school class, please.\n" +
      "Adviser: Of course. Could I start with your full name?\n" +
      "Caller: Yes, it's Elaine Kirkpatrick. That's K-I-R-K-P-A-T-R-I-C-K.\n" +
      "Adviser: Thank you. And your date of birth?\n" +
      "Caller: The sixth of December, nineteen eighty-four.\n" +
      "Adviser: We have three options - the self-guided visit, the guided tour and the workshop package. Which would suit you best?\n" +
      "Caller: I'll take the workshop package option, please. What exactly does that include?\n" +
      "Adviser: With the workshop package option you get twenty-eight pupils in the group, and the package also includes a lunch room. The price per pupil is nine pounds.\n" +
      "Caller: That sounds reasonable, thank you.\n" +
      "Adviser: Could I take your address as well?\n" +
      "Caller: It's 3 Sycamore Road. The postcode is L-one-eight, seven-G-H.\n" +
      "Adviser: And the best mobile number to reach you on?\n" +
      "Caller: It's oh-seven-six-five-five, four-two, nine-eight-oh.\n" +
      "Adviser: Lovely. Is there anything else before I confirm everything?\n" +
      "Caller: Yes - could you also put me down for the planetarium show at eleven?\n" +
      "Adviser: That's all done. I'll email your confirmation this afternoon.",
    rate: 0.85,
    formTitle: "CITY SCIENCE MUSEUM - BOOKING FORM",
    formLayout:
      "APPLICANT\n" +
      "  First name:            Elaine\n" +
      "  Surname:               {1}\n" +
      "  Date of birth:         6 December {2}\n" +
      "\n" +
      "BOOKING DETAILS\n" +
      "  Option chosen:         {3}\n" +
      "  Number of pupils:      {4}\n" +
      "  Price / fee:           £ {5}\n" +
      "  Also included:         {10}\n" +
      "\n" +
      "CONTACT\n" +
      "  Address:               3 {6} Road\n" +
      "  Postcode:              {7}\n" +
      "  Mobile:                07655 {8} 980\n" +
      "\n" +
      "EXTRAS\n" +
      "  Additional item:       {9}",
    questions: [
      { type: "fill-in", prompt: "Surname: ___", answer: "Kirkpatrick", maxWords: 1 },
      { type: "fill-in", prompt: "Date of birth: 6 December ___", answer: "1984", maxWords: 1 },
      { type: "fill-in", prompt: "Option chosen: ___", answer: "workshop package", maxWords: 2 },
      { type: "fill-in", prompt: "Number of pupils: ___", answer: "28", maxWords: 1 },
      { type: "fill-in", prompt: "price per pupil: £___", answer: "9", maxWords: 1 },
      { type: "fill-in", prompt: "Address: 3 ___ Road", answer: "Sycamore", maxWords: 1 },
      { type: "fill-in", prompt: "Postcode: ___", answer: "L18 7GH", maxWords: 2 },
      { type: "fill-in", prompt: "Mobile: 07655 ___ 980", answer: "42", maxWords: 1 },
      { type: "fill-in", prompt: "Also booked: ___ at eleven", answer: "planetarium show", maxWords: 2 },
      { type: "fill-in", prompt: "Included in the package: ___", answer: "lunch room", maxWords: 2 },
    ],
  },

  {
    id: "form-gym-induction",
    section: 1,
    questionType: "Form / Note Completion",
    questionTypeVi: "Điền form / ghi chú",
    title: "Arranging a Gym Induction",
    titleVi: "Sắp xếp buổi hướng dẫn phòng gym",
    context: "You will hear a telephone conversation with Pulse Fitness Centre. Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    contextVi: "Bạn sẽ nghe cuộc gọi với Pulse Fitness Centre. Hoàn thành form bên dưới. Viết KHÔNG QUÁ HAI TỪ VÀ/HOẶC MỘT SỐ cho mỗi đáp án.",
    transcript:
      "Officer: Good morning, Pulse Fitness Centre. How can I help you today?\n" +
      "Caller: Hello. I'd like to arrange an induction session at the gym, please.\n" +
      "Officer: Of course. Could I start with your full name?\n" +
      "Caller: Yes, it's Jonas Wexler. That's W-E-X-L-E-R.\n" +
      "Officer: Thank you. And your date of birth?\n" +
      "Caller: The thirteenth of February, nineteen ninety-five.\n" +
      "Officer: We have three options - the off-peak membership, the anytime membership and the weekend membership. Which would suit you best?\n" +
      "Caller: I'll take the anytime option, please. What exactly does that include?\n" +
      "Officer: With the anytime option you get forty-five minutes for the induction, and members also receive a training plan. The joining fee is twenty pounds.\n" +
      "Caller: That sounds reasonable, thank you.\n" +
      "Officer: Could I take your address as well?\n" +
      "Caller: It's 67 Rosemary Road. The postcode is C-F-one-zero, three-N-B.\n" +
      "Officer: And the best mobile number to reach you on?\n" +
      "Caller: It's oh-seven-oh-three-one, seven-three, two-six-five.\n" +
      "Officer: Lovely. Is there anything else before I confirm everything?\n" +
      "Caller: Yes - could you also put me down for the spin class on Monday evening?\n" +
      "Officer: That's all done. I'll email your confirmation this afternoon.",
    rate: 0.85,
    formTitle: "PULSE FITNESS CENTRE - BOOKING FORM",
    formLayout:
      "APPLICANT\n" +
      "  First name:            Jonas\n" +
      "  Surname:               {1}\n" +
      "  Date of birth:         13 February {2}\n" +
      "\n" +
      "BOOKING DETAILS\n" +
      "  Option chosen:         {3}\n" +
      "  Induction length (minutes): {4}\n" +
      "  Price / fee:           £ {5}\n" +
      "  Also included:         {10}\n" +
      "\n" +
      "CONTACT\n" +
      "  Address:               67 {6} Road\n" +
      "  Postcode:              {7}\n" +
      "  Mobile:                07031 {8} 265\n" +
      "\n" +
      "EXTRAS\n" +
      "  Additional item:       {9}",
    questions: [
      { type: "fill-in", prompt: "Surname: ___", answer: "Wexler", maxWords: 1 },
      { type: "fill-in", prompt: "Date of birth: 13 February ___", answer: "1995", maxWords: 1 },
      { type: "fill-in", prompt: "Option chosen: ___", answer: "anytime", maxWords: 2 },
      { type: "fill-in", prompt: "Induction length: ___ minutes", answer: "45", maxWords: 1 },
      { type: "fill-in", prompt: "joining fee: £___", answer: "20", maxWords: 1 },
      { type: "fill-in", prompt: "Address: 67 ___ Road", answer: "Rosemary", maxWords: 1 },
      { type: "fill-in", prompt: "Postcode: ___", answer: "CF10 3NB", maxWords: 2 },
      { type: "fill-in", prompt: "Mobile: 07031 ___ 265", answer: "73", maxWords: 1 },
      { type: "fill-in", prompt: "Also booked: ___ on Monday", answer: "spin class", maxWords: 2 },
      { type: "fill-in", prompt: "Members receive: ___", answer: "training plan", maxWords: 2 },
    ],
  },

  {
    id: "form-laundry-service",
    section: 1,
    questionType: "Form / Note Completion",
    questionTypeVi: "Điền form / ghi chú",
    title: "Setting Up a Laundry Collection Service",
    titleVi: "Đăng ký dịch vụ giặt là",
    context: "You will hear a telephone conversation with Fresh Fold Laundry. Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    contextVi: "Bạn sẽ nghe cuộc gọi với Fresh Fold Laundry. Hoàn thành form bên dưới. Viết KHÔNG QUÁ HAI TỪ VÀ/HOẶC MỘT SỐ cho mỗi đáp án.",
    transcript:
      "Receptionist: Good morning, Fresh Fold Laundry. How can I help you today?\n" +
      "Caller: Hello. I'd like to set up a weekly laundry collection, please.\n" +
      "Receptionist: Of course. Could I start with your full name?\n" +
      "Caller: Yes, it's Priya Raghavan. That's R-A-G-H-A-V-A-N.\n" +
      "Receptionist: Thank you. And your date of birth?\n" +
      "Caller: The fourth of July, nineteen ninety-three.\n" +
      "Receptionist: We have three options - the wash-only service, the wash-and-iron service and the dry-cleaning service. Which would suit you best?\n" +
      "Caller: I'll take the wash-and-iron option, please. What exactly does that include?\n" +
      "Receptionist: With the wash-and-iron option you get eight kilos in each bag, and the service also provides a reusable bag. The price per bag is eighteen pounds.\n" +
      "Caller: That sounds reasonable, thank you.\n" +
      "Receptionist: Could I take your address as well?\n" +
      "Caller: It's 15 Chestnut Road. The postcode is O-X-four, one-P-A.\n" +
      "Receptionist: And the best mobile number to reach you on?\n" +
      "Caller: It's oh-seven-two-five-four, eight-six, one-three-nine.\n" +
      "Receptionist: Lovely. Is there anything else before I confirm everything?\n" +
      "Caller: Yes - could you also put me down for the Tuesday morning collection?\n" +
      "Receptionist: That's all done. I'll email your confirmation this afternoon.",
    rate: 0.85,
    formTitle: "FRESH FOLD LAUNDRY - BOOKING FORM",
    formLayout:
      "APPLICANT\n" +
      "  First name:            Priya\n" +
      "  Surname:               {1}\n" +
      "  Date of birth:         4 July {2}\n" +
      "\n" +
      "BOOKING DETAILS\n" +
      "  Option chosen:         {3}\n" +
      "  Bag size (kilos):      {4}\n" +
      "  Price / fee:           £ {5}\n" +
      "  Also included:         {10}\n" +
      "\n" +
      "CONTACT\n" +
      "  Address:               15 {6} Road\n" +
      "  Postcode:              {7}\n" +
      "  Mobile:                07254 {8} 139\n" +
      "\n" +
      "EXTRAS\n" +
      "  Additional item:       {9}",
    questions: [
      { type: "fill-in", prompt: "Surname: ___", answer: "Raghavan", maxWords: 1 },
      { type: "fill-in", prompt: "Date of birth: 4 July ___", answer: "1993", maxWords: 1 },
      { type: "fill-in", prompt: "Option chosen: ___", answer: "wash-and-iron", maxWords: 2 },
      { type: "fill-in", prompt: "Weight allowed per bag: ___ kilos", answer: "8", maxWords: 1 },
      { type: "fill-in", prompt: "price per bag: £___", answer: "18", maxWords: 1 },
      { type: "fill-in", prompt: "Address: 15 ___ Road", answer: "Chestnut", maxWords: 1 },
      { type: "fill-in", prompt: "Postcode: ___", answer: "OX4 1PA", maxWords: 2 },
      { type: "fill-in", prompt: "Mobile: 07254 ___ 139", answer: "86", maxWords: 1 },
      { type: "fill-in", prompt: "Collection time chosen: ___", answer: "Tuesday morning", maxWords: 2 },
      { type: "fill-in", prompt: "Provided by the service: ___", answer: "reusable bag", maxWords: 2 },
    ],
  },

  {
    id: "form-conference-registration",
    section: 1,
    questionType: "Form / Note Completion",
    questionTypeVi: "Điền form / ghi chú",
    title: "Registering for an Education Conference",
    titleVi: "Đăng ký hội thảo giáo dục",
    context: "You will hear a telephone conversation with Learning Futures Conference. Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    contextVi: "Bạn sẽ nghe cuộc gọi với Learning Futures Conference. Hoàn thành form bên dưới. Viết KHÔNG QUÁ HAI TỪ VÀ/HOẶC MỘT SỐ cho mỗi đáp án.",
    transcript:
      "Assistant: Good morning, Learning Futures Conference. How can I help you today?\n" +
      "Caller: Hello. I'd like to register for the two-day conference, please.\n" +
      "Assistant: Of course. Could I start with your full name?\n" +
      "Caller: Yes, it's Miguel Santoro. That's S-A-N-T-O-R-O.\n" +
      "Assistant: Thank you. And your date of birth?\n" +
      "Caller: The twenty-first of May, nineteen eighty-nine.\n" +
      "Assistant: We have three options - the one-day pass, the two-day pass and the online pass. Which would suit you best?\n" +
      "Caller: I'll take the two-day option, please. What exactly does that include?\n" +
      "Assistant: With the two-day option you get two workshop places, and the rate also includes conference lunches. The early-bird rate is one hundred and thirty-five pounds.\n" +
      "Caller: That sounds reasonable, thank you.\n" +
      "Assistant: Could I take your address as well?\n" +
      "Caller: It's 48 Northfield Road. The postcode is G-one-two, eight-Q-Q.\n" +
      "Assistant: And the best mobile number to reach you on?\n" +
      "Caller: It's oh-seven-eight-six-nine, five-oh, eight-two-three.\n" +
      "Assistant: Lovely. Is there anything else before I confirm everything?\n" +
      "Caller: Yes - could you also put me down for the poster session on day two?\n" +
      "Assistant: That's all done. I'll email your confirmation this afternoon.",
    rate: 0.85,
    formTitle: "LEARNING FUTURES CONFERENCE - BOOKING FORM",
    formLayout:
      "APPLICANT\n" +
      "  First name:            Miguel\n" +
      "  Surname:               {1}\n" +
      "  Date of birth:         21 May {2}\n" +
      "\n" +
      "BOOKING DETAILS\n" +
      "  Option chosen:         {3}\n" +
      "  Workshop places:       {4}\n" +
      "  Price / fee:           £ {5}\n" +
      "  Also included:         {10}\n" +
      "\n" +
      "CONTACT\n" +
      "  Address:               48 {6} Road\n" +
      "  Postcode:              {7}\n" +
      "  Mobile:                07869 {8} 823\n" +
      "\n" +
      "EXTRAS\n" +
      "  Additional item:       {9}",
    questions: [
      { type: "fill-in", prompt: "Surname: ___", answer: "Santoro", maxWords: 1 },
      { type: "fill-in", prompt: "Date of birth: 21 May ___", answer: "1989", maxWords: 1 },
      { type: "fill-in", prompt: "Option chosen: ___", answer: "two-day", maxWords: 2 },
      { type: "fill-in", prompt: "Number of workshop places: ___", answer: "2", maxWords: 1 },
      { type: "fill-in", prompt: "early-bird rate: £___", answer: "135", maxWords: 1 },
      { type: "fill-in", prompt: "Address: 48 ___ Road", answer: "Northfield", maxWords: 1 },
      { type: "fill-in", prompt: "Postcode: ___", answer: "G12 8QQ", maxWords: 2 },
      { type: "fill-in", prompt: "Mobile: 07869 ___ 823", answer: "50", maxWords: 1 },
      { type: "fill-in", prompt: "Also attending: ___ on day two", answer: "poster session", maxWords: 2 },
      { type: "fill-in", prompt: "Included in the rate: ___", answer: "conference lunches", maxWords: 2 },
    ],
  },
];
