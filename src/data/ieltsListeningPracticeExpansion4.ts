/**
 * @file ieltsListeningPracticeExpansion4.ts
 * @description Fifth batch of IELTS Listening practice sets - brings every
 * section to 10 sets total. Each set has 10 Cambridge-style questions, a
 * realistic transcript, and TTS-friendly pacing (short sentences, clear
 * speaker tags, deliberate spelling lines).
 *
 * Counts added: Section 1 ×6, Section 2 ×5, Section 3 ×6, Section 4 ×5 = 22.
 */
import type { ListeningPracticeSet } from "./ieltsListeningPractice";

export const ieltsListeningPracticeSetsExpansion4: ListeningPracticeSet[] = [
  // ============================================================
  // SECTION 1 - six everyday transactional dialogues
  // ============================================================
  {
    id: "form-gym-membership-2",
    section: 1,
    questionType: "Form / Note Completion",
    questionTypeVi: "Điền form / ghi chú",
    title: "Gym Membership Sign-up",
    titleVi: "Đăng ký thành viên phòng gym",
    context: "You will hear a conversation between a new customer and a gym receptionist. Complete the form. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    contextVi: "Bạn sẽ nghe cuộc trao đổi giữa khách mới và lễ tân phòng gym. Hoàn thành form.",
    transcript:
      "Receptionist: Good afternoon, Riverside Fitness, how can I help?\n" +
      "Customer: Hi, I'd like to join the gym, please.\n" +
      "Receptionist: Of course. Can I take your full name?\n" +
      "Customer: Yes - Megan Carter. C-A-R-T-E-R.\n" +
      "Receptionist: Thank you. And your date of birth?\n" +
      "Customer: The fifth of March, nineteen ninety-eight.\n" +
      "Receptionist: We have three plans - Basic, Standard and Premium. Which would you prefer?\n" +
      "Customer: I'll go with the Standard one.\n" +
      "Receptionist: That's thirty-five pounds per month, paid by direct debit.\n" +
      "Customer: That's fine.\n" +
      "Receptionist: How did you hear about us?\n" +
      "Customer: A friend recommended you.\n" +
      "Receptionist: Lovely. Any health conditions we should know about?\n" +
      "Customer: I've had some knee trouble in the past.\n" +
      "Receptionist: I'll note that down. Could I have a contact number?\n" +
      "Customer: It's oh seven seven, four four six, two three nine eight.\n" +
      "Receptionist: And an email?\n" +
      "Customer: megan dot carter at quickmail dot net.\n" +
      "Receptionist: Would you like a locker?\n" +
      "Customer: Yes please, a small one.\n" +
      "Receptionist: Perfect. Your membership number is R-F-three-eight-one-two.",
    rate: 0.78,
    formTitle: "RIVERSIDE FITNESS - MEMBERSHIP FORM",
    formLayout:
      "MEMBER\n" +
      "  First name:       Megan\n" +
      "  Surname:          {1}\n" +
      "  Date of birth:    {2} March 1998\n" +
      "\n" +
      "MEMBERSHIP\n" +
      "  Plan:                  {3}\n" +
      "  Monthly fee:           £ {4}\n" +
      "  Payment method:        {5}\n" +
      "\n" +
      "REFERRAL & HEALTH\n" +
      "  Heard about gym from:  a {6}\n" +
      "  Past health issue:     {7} trouble\n" +
      "\n" +
      "CONTACT & EXTRAS\n" +
      "  Phone (last 4):        {8}\n" +
      "  Locker size:           {9}\n" +
      "  Membership number:     RF {10}",
    questions: [
      { type: "fill-in", prompt: "Surname: ___", answer: "Carter" },
      { type: "fill-in", prompt: "Date of birth: ___ March 1998", answer: "5" },
      { type: "fill-in", prompt: "Membership plan: ___", answer: "Standard" },
      { type: "fill-in", prompt: "Monthly fee: £___", answer: "35" },
      { type: "fill-in", prompt: "Payment method: ___", answer: "direct debit" },
      { type: "fill-in", prompt: "Heard about gym from: a ___", answer: "friend" },
      { type: "fill-in", prompt: "Past health issue: ___ trouble", answer: "knee" },
      { type: "fill-in", prompt: "Phone number ends in: ___", answer: "2398" },
      { type: "fill-in", prompt: "Locker size requested: ___", answer: "small" },
      { type: "fill-in", prompt: "Membership number: RF___", answer: "3812" },
    ],
  },
  {
    id: "form-driving-school",
    section: 1,
    questionType: "Form / Note Completion",
    questionTypeVi: "Điền form / ghi chú",
    title: "Booking Driving Lessons",
    titleVi: "Đặt lịch học lái xe",
    context: "You will hear a phone call between a learner and a driving school. Complete the booking form. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    contextVi: "Bạn sẽ nghe học viên gọi điện cho trung tâm dạy lái xe. Hoàn thành form.",
    transcript:
      "Instructor: Greenway Driving School, James speaking.\n" +
      "Learner: Hello, I'd like to book some lessons, please.\n" +
      "Instructor: Sure. Could I take your name?\n" +
      "Learner: Yes, it's Thomas Walker. W-A-L-K-E-R.\n" +
      "Instructor: And how old are you, Thomas?\n" +
      "Learner: I'm nineteen.\n" +
      "Instructor: Do you have a provisional licence already?\n" +
      "Learner: Yes, I got it last month.\n" +
      "Instructor: Great. Are you looking for manual or automatic?\n" +
      "Learner: Automatic, please.\n" +
      "Instructor: We charge thirty-two pounds per hour, or a block of ten for two hundred and ninety pounds.\n" +
      "Learner: I'll take the block of ten.\n" +
      "Instructor: When would you like your first lesson?\n" +
      "Learner: Could we start on Thursday morning?\n" +
      "Instructor: Thursday at nine works. Where would you like to be picked up?\n" +
      "Learner: From my home in Mill Street.\n" +
      "Instructor: Lovely. Could I take a contact number?\n" +
      "Learner: It's oh seven eight, three two one, four nine five seven.\n" +
      "Instructor: And which test centre are you hoping to use?\n" +
      "Learner: The Eastfield centre, please.\n" +
      "Instructor: All booked. Your reference is G-W-five-oh-six-three.",
    rate: 0.78,
    formTitle: "GREENWAY DRIVING SCHOOL - LESSON BOOKING",
    formLayout:
      "LEARNER\n" +
      "  First name:                Thomas\n" +
      "  Surname:                   {1}\n" +
      "  Age:                       {2}\n" +
      "  Provisional licence:       got it {3} month\n" +
      "\n" +
      "LESSONS\n" +
      "  Car type:                  {4}\n" +
      "  Cost per hour:             £ {5}\n" +
      "  Block of 10 lessons:       £ {6}\n" +
      "  First lesson day:          {7} (at 9 a.m.)\n" +
      "  Pick-up address:           {8} Street\n" +
      "\n" +
      "TEST & REF\n" +
      "  Test centre:               {9}\n" +
      "  Reference:                 GW {10}",
    questions: [
      { type: "fill-in", prompt: "Surname: ___", answer: "Walker" },
      { type: "fill-in", prompt: "Age: ___", answer: "19" },
      { type: "fill-in", prompt: "Provisional licence obtained: ___ month", answer: "last" },
      { type: "fill-in", prompt: "Type of car requested: ___", answer: "automatic" },
      { type: "fill-in", prompt: "Cost per hour: £___", answer: "32" },
      { type: "fill-in", prompt: "Cost of block of ten: £___", answer: "290" },
      { type: "fill-in", prompt: "First lesson day: ___", answer: "Thursday" },
      { type: "fill-in", prompt: "Pick-up address: ___ Street", answer: "Mill" },
      { type: "fill-in", prompt: "Test centre: ___", answer: "Eastfield" },
      { type: "fill-in", prompt: "Reference: GW___", answer: "5063" },
    ],
  },
  {
    id: "form-language-course",
    section: 1,
    questionType: "Form / Note Completion",
    questionTypeVi: "Điền form / ghi chú",
    title: "Enrolling in a Language Course",
    titleVi: "Đăng ký khoá học tiếng",
    context: "You will hear a student enrolling at a language school. Complete the registration form. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    contextVi: "Bạn sẽ nghe sinh viên đăng ký tại trung tâm ngoại ngữ. Hoàn thành form.",
    transcript:
      "Staff: Good morning, Brightside Languages, how may I help?\n" +
      "Student: Hi, I'd like to sign up for the evening Spanish course.\n" +
      "Staff: Lovely. Can I take your name?\n" +
      "Student: Aisha Khan - K-H-A-N.\n" +
      "Staff: Thank you. Have you studied Spanish before?\n" +
      "Student: Yes, I did about a year of beginner lessons at university.\n" +
      "Staff: Then I'd recommend our pre-intermediate group.\n" +
      "Student: Sounds perfect.\n" +
      "Staff: Classes meet on Tuesdays and Thursdays, from seven to nine in the evening.\n" +
      "Student: That works for me.\n" +
      "Staff: The course lasts twelve weeks and the fee is four hundred and twenty pounds, including all materials.\n" +
      "Student: How can I pay?\n" +
      "Staff: Either by card today or in two instalments.\n" +
      "Student: I'll do two instalments, please.\n" +
      "Staff: Fine. Could I have your nationality?\n" +
      "Student: Pakistani.\n" +
      "Staff: And a postal address?\n" +
      "Student: Forty-two Oak Avenue, Manchester.\n" +
      "Staff: And what's your reason for studying with us?\n" +
      "Student: It's mainly for travel - I'm planning a trip to Argentina.\n" +
      "Staff: Wonderful. Your student number will be B-L-seven-two-nine-four.",
    rate: 0.78,
    formTitle: "BRIGHTSIDE LANGUAGES - REGISTRATION FORM",
    formLayout:
      "STUDENT\n" +
      "  First name:           Aisha\n" +
      "  Surname:              {1}\n" +
      "  Nationality:          {8}\n" +
      "  Address:              42 {9} Avenue, Manchester\n" +
      "\n" +
      "COURSE\n" +
      "  Language:             Spanish\n" +
      "  Recommended level:    {2}\n" +
      "  Class days:           Tuesdays and {3}\n" +
      "  Class finishes:       {4} p.m.\n" +
      "  Course length:        {5} weeks\n" +
      "  Course fee:           £ {6} (incl. materials)\n" +
      "  Payment chosen:       {7} instalments\n" +
      "  Reason for study:     {10}",
    questions: [
      { type: "fill-in", prompt: "Surname: ___", answer: "Khan" },
      { type: "fill-in", prompt: "Recommended level: ___", answer: "pre-intermediate" },
      { type: "fill-in", prompt: "Class days: Tuesdays and ___", answer: "Thursdays" },
      { type: "fill-in", prompt: "Class finishes at ___ p.m.", answer: "9" },
      { type: "fill-in", prompt: "Course length: ___ weeks", answer: "12" },
      { type: "fill-in", prompt: "Course fee: £___", answer: "420" },
      { type: "fill-in", prompt: "Payment chosen: ___ instalments", answer: "two" },
      { type: "fill-in", prompt: "Nationality: ___", answer: "Pakistani" },
      { type: "fill-in", prompt: "Address: 42 ___ Avenue", answer: "Oak" },
      { type: "fill-in", prompt: "Reason for study: ___", answer: "travel" },
    ],
  },
  {
    id: "form-apartment-rental",
    section: 1,
    questionType: "Form / Note Completion",
    questionTypeVi: "Điền form / ghi chú",
    title: "Apartment Rental Enquiry",
    titleVi: "Hỏi thuê căn hộ",
    context: "You will hear a tenant asking about a rental flat. Complete the agency form. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    contextVi: "Bạn sẽ nghe khách thuê hỏi thông tin căn hộ. Hoàn thành form đại lý.",
    transcript:
      "Agent: Brookline Lettings, Sarah speaking.\n" +
      "Tenant: Hello, I'm calling about the flat on Elm Road.\n" +
      "Agent: Yes, the two-bedroom on the second floor. Can I take your name?\n" +
      "Tenant: Yes, Robert Singh - S-I-N-G-H.\n" +
      "Agent: Thank you. What's your occupation, Robert?\n" +
      "Tenant: I'm a teacher.\n" +
      "Agent: And when would you like to move in?\n" +
      "Tenant: As soon as possible - ideally the first of next month.\n" +
      "Agent: That's fine. The rent is nine hundred and fifty pounds per month, plus bills.\n" +
      "Tenant: Is there a deposit?\n" +
      "Agent: Yes, the deposit is six weeks' rent.\n" +
      "Tenant: Are pets allowed?\n" +
      "Agent: Cats are allowed, but no dogs.\n" +
      "Tenant: Good - I have one cat.\n" +
      "Agent: Is there off-street parking?\n" +
      "Tenant: That's what I wanted to ask.\n" +
      "Agent: Yes, one allocated space at the rear.\n" +
      "Tenant: And how long is the contract?\n" +
      "Agent: It's a twelve-month tenancy.\n" +
      "Tenant: When could I view it?\n" +
      "Agent: Tomorrow at four works. The reference number is E-L-three-three-seven-one.",
    rate: 0.78,
    formTitle: "BROOKLINE LETTINGS - RENTAL ENQUIRY",
    formLayout:
      "APPLICANT\n" +
      "  First name:               Robert\n" +
      "  Surname:                  {1}\n" +
      "  Occupation:               {2}\n" +
      "\n" +
      "PROPERTY (Elm Road, 2nd floor)\n" +
      "  Bedrooms:                 {3}\n" +
      "  Monthly rent:             £ {4} (plus bills)\n" +
      "  Deposit:                  {5} weeks' rent\n" +
      "  Pets allowed:             {6}\n" +
      "  Parking:                  one space at the {7}\n" +
      "  Tenancy length:           {8} months\n" +
      "\n" +
      "VIEWING\n" +
      "  Day:                      {9} (4 p.m.)\n" +
      "  Reference number:         EL {10}",
    questions: [
      { type: "fill-in", prompt: "Surname: ___", answer: "Singh" },
      { type: "fill-in", prompt: "Occupation: ___", answer: "teacher" },
      { type: "fill-in", prompt: "Number of bedrooms: ___", answer: "2" },
      { type: "fill-in", prompt: "Monthly rent: £___", answer: "950" },
      { type: "fill-in", prompt: "Deposit: ___ weeks' rent", answer: "6" },
      { type: "fill-in", prompt: "Pet allowed: ___", answer: "cats" },
      { type: "fill-in", prompt: "Parking: one allocated space at the ___", answer: "rear" },
      { type: "fill-in", prompt: "Tenancy length: ___ months", answer: "12" },
      { type: "fill-in", prompt: "Viewing day: ___", answer: "Tomorrow" },
      { type: "fill-in", prompt: "Reference number: EL___", answer: "3371" },
    ],
  },
  {
    id: "form-travel-insurance",
    section: 1,
    questionType: "Form / Note Completion",
    questionTypeVi: "Điền form / ghi chú",
    title: "Travel Insurance Application",
    titleVi: "Đăng ký bảo hiểm du lịch",
    context: "You will hear a customer applying for travel insurance. Complete the application form. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    contextVi: "Bạn sẽ nghe khách hàng đăng ký bảo hiểm du lịch. Hoàn thành form.",
    transcript:
      "Agent: SafeGo Insurance, how can I help?\n" +
      "Customer: Hi, I'd like a quote for travel insurance, please.\n" +
      "Agent: Of course. Your name?\n" +
      "Customer: Emily Foster. F-O-S-T-E-R.\n" +
      "Agent: Where are you travelling to?\n" +
      "Customer: I'm going to Japan.\n" +
      "Agent: For how many days?\n" +
      "Customer: Twenty-one days in total.\n" +
      "Agent: And the date of departure?\n" +
      "Customer: The twelfth of November.\n" +
      "Agent: Will you be doing any sports?\n" +
      "Customer: Some skiing, yes.\n" +
      "Agent: I'll add winter sports cover then.\n" +
      "Customer: Good. What's the price?\n" +
      "Agent: With winter sports it comes to one hundred and forty-five pounds.\n" +
      "Customer: Fine.\n" +
      "Agent: Do you have any pre-existing medical conditions?\n" +
      "Customer: I have asthma, but it's well controlled.\n" +
      "Agent: I'll note that. Are you taking any electronic equipment?\n" +
      "Customer: Yes - a laptop worth about nine hundred pounds.\n" +
      "Agent: I'll list that too. And the emergency contact?\n" +
      "Customer: My sister - her number is oh seven nine, two one three, four eight oh six.\n" +
      "Agent: Perfect. Your policy number is S-G-eight-four-five-two.",
    rate: 0.78,
    formTitle: "SAFEGO INSURANCE - TRAVEL POLICY APPLICATION",
    formLayout:
      "POLICY HOLDER\n" +
      "  First name:           Emily\n" +
      "  Surname:              {1}\n" +
      "\n" +
      "TRIP\n" +
      "  Destination:          {2}\n" +
      "  Length of trip:       {3} days\n" +
      "  Departure date:       {4} November\n" +
      "  Extra cover:          {5} sports\n" +
      "  Total price:          £ {6}\n" +
      "\n" +
      "MEDICAL & ITEMS\n" +
      "  Medical condition:    {7}\n" +
      "  Item to insure:       a {8}\n" +
      "  Value of laptop:      £ {9}\n" +
      "\n" +
      "POLICY\n" +
      "  Policy number:        SG {10}",
    questions: [
      { type: "fill-in", prompt: "Surname: ___", answer: "Foster" },
      { type: "fill-in", prompt: "Destination: ___", answer: "Japan" },
      { type: "fill-in", prompt: "Trip length: ___ days", answer: "21" },
      { type: "fill-in", prompt: "Departure date: ___ November", answer: "12" },
      { type: "fill-in", prompt: "Extra cover added for: ___ sports", answer: "winter" },
      { type: "fill-in", prompt: "Total price: £___", answer: "145" },
      { type: "fill-in", prompt: "Medical condition: ___", answer: "asthma" },
      { type: "fill-in", prompt: "Item to insure: a ___", answer: "laptop" },
      { type: "fill-in", prompt: "Value of laptop: £___", answer: "900" },
      { type: "fill-in", prompt: "Policy number: SG___", answer: "8452" },
    ],
  },
  {
    id: "form-summer-camp",
    section: 1,
    questionType: "Form / Note Completion",
    questionTypeVi: "Điền form / ghi chú",
    title: "Summer Camp Registration",
    titleVi: "Đăng ký trại hè cho trẻ",
    context: "You will hear a parent registering a child for a summer camp. Complete the form. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.",
    contextVi: "Bạn sẽ nghe phụ huynh đăng ký trại hè. Hoàn thành form.",
    transcript:
      "Organiser: Pinewood Summer Camp, Daniel speaking.\n" +
      "Parent: Hi, I'd like to register my daughter, please.\n" +
      "Organiser: Of course. What's her name?\n" +
      "Parent: Lily Brooks - B-R-O-O-K-S.\n" +
      "Organiser: And how old is she?\n" +
      "Parent: She's just turned ten.\n" +
      "Organiser: Lovely. Which week would you like?\n" +
      "Parent: The second week of August.\n" +
      "Organiser: Camp runs Monday to Friday, nine to four.\n" +
      "Parent: That's fine.\n" +
      "Organiser: The fee for the week is one hundred and eighty pounds, lunch included.\n" +
      "Parent: Are there any extras?\n" +
      "Organiser: There's an optional horse-riding session on Wednesday for twenty pounds.\n" +
      "Parent: Yes, please add that.\n" +
      "Organiser: Any allergies?\n" +
      "Parent: She's allergic to peanuts.\n" +
      "Organiser: I'll flag that. Anything else?\n" +
      "Parent: She can't swim very well yet.\n" +
      "Organiser: We'll put her in the beginners' group for the pool. Emergency contact?\n" +
      "Parent: My number - oh seven seven, three three nine, five one six four.\n" +
      "Organiser: Perfect. Her camper ID is P-W-two-six-one-eight.",
    rate: 0.78,
    formTitle: "PINEWOOD SUMMER CAMP - CHILD REGISTRATION",
    formLayout:
      "CAMPER\n" +
      "  First name:             Lily\n" +
      "  Surname:                {1}\n" +
      "  Age:                    {2}\n" +
      "\n" +
      "WEEK & TIMING\n" +
      "  Chosen week:            {3} week of August\n" +
      "  Hours:                  Monday-Friday, 9 a.m. - {4} p.m.\n" +
      "\n" +
      "FEES & ACTIVITIES\n" +
      "  Weekly fee:             £ {5} (lunch incl.)\n" +
      "  Optional activity:      {6} (Wednesday)\n" +
      "  Cost of optional:       £ {7}\n" +
      "\n" +
      "MEDICAL & GROUP\n" +
      "  Allergy:                {8}\n" +
      "  Swim group:             {9}\n" +
      "  Camper ID:              PW {10}",
    questions: [
      { type: "fill-in", prompt: "Child's surname: ___", answer: "Brooks" },
      { type: "fill-in", prompt: "Age: ___", answer: "10" },
      { type: "fill-in", prompt: "Chosen week: ___ week of August", answer: "second" },
      { type: "fill-in", prompt: "Daily finish time: ___ p.m.", answer: "4" },
      { type: "fill-in", prompt: "Weekly fee: £___", answer: "180" },
      { type: "fill-in", prompt: "Optional activity: ___", answer: "horse-riding" },
      { type: "fill-in", prompt: "Cost of optional activity: £___", answer: "20" },
      { type: "fill-in", prompt: "Allergy: ___", answer: "peanuts" },
      { type: "fill-in", prompt: "Swim group: ___", answer: "beginners" },
      { type: "fill-in", prompt: "Camper ID: PW___", answer: "2618" },
    ],
  },

  // ============================================================
  // SECTION 2 - five monologues / semi-formal talks
  // ============================================================
  {
    id: "monologue-community-radio",
    section: 2,
    questionType: "Multiple Choice + Sentence Completion",
    questionTypeVi: "Trắc nghiệm + điền câu",
    title: "Community Radio Announcement",
    titleVi: "Thông báo trên đài phát thanh cộng đồng",
    context: "You will hear a radio host announcing weekend events in a small town. Answer the questions.",
    contextVi: "Bạn sẽ nghe MC đài phát thanh thông báo sự kiện cuối tuần. Trả lời câu hỏi.",
    transcript:
      "Host: Good morning listeners, you're with Westbury FM and here's what's happening this weekend.\n" +
      "First, the annual food festival returns to Market Square on Saturday from ten in the morning until six in the evening.\n" +
      "Over forty local producers will be there, and entry is completely free.\n" +
      "Children under twelve get a free cupcake at the welcome desk.\n" +
      "On Sunday, the cycling club is hosting a charity ride starting at Riverside Park.\n" +
      "The route is thirty kilometres long and is suitable for ages fourteen and over.\n" +
      "Registration costs ten pounds, and all proceeds go to the new children's hospital wing.\n" +
      "If cycling isn't your thing, the open-air cinema is showing a classic comedy in Heritage Gardens.\n" +
      "Gates open at seven, film starts at eight, and please bring your own blanket.\n" +
      "Looking further ahead, our town library has just opened a brand-new study space on the first floor with sixty additional seats.\n" +
      "And finally, a quick reminder - the Saturday morning bus from Westbury to Greenport now leaves twenty minutes earlier, at seven forty.\n" +
      "Stay tuned, the weather is up next.",
    rate: 0.78,
    questions: [
      { type: "fill-in", prompt: "Food festival venue: ___ Square", answer: "Market" },
      { type: "fill-in", prompt: "Food festival finishes at ___ p.m.", answer: "6" },
      { type: "mcq", prompt: "Number of local producers attending:", options: ["over twenty", "over forty", "over sixty"], answer: 1 },
      { type: "fill-in", prompt: "Free treat for under-12s: a ___", answer: "cupcake" },
      { type: "fill-in", prompt: "Length of charity ride: ___ km", answer: "30" },
      { type: "mcq", prompt: "Minimum age for the ride:", options: ["12", "14", "16"], answer: 1 },
      { type: "fill-in", prompt: "Charity ride supports the children's ___ wing.", answer: "hospital" },
      { type: "fill-in", prompt: "Open-air cinema film starts at ___ p.m.", answer: "8" },
      { type: "fill-in", prompt: "New study space added ___ seats.", answer: "60" },
      { type: "fill-in", prompt: "New Saturday bus departure time: ___", answer: "7:40" },
    ],
  },
  {
    id: "monologue-park-tour",
    section: 2,
    questionType: "Multiple Choice + Map / Note Completion",
    questionTypeVi: "Trắc nghiệm + ghi chú bản đồ",
    title: "Welcome Walk Around the Nature Park",
    titleVi: "Đi dạo giới thiệu công viên thiên nhiên",
    context: "You will hear a ranger introducing visitors to a nature park. Answer the questions.",
    contextVi: "Bạn sẽ nghe kiểm lâm giới thiệu công viên. Trả lời câu hỏi.",
    transcript:
      "Ranger: Welcome everyone to Wildmeadow Nature Park.\n" +
      "I'm Hannah, and I'll walk you through the layout before you set off on your own.\n" +
      "The park covers around two hundred and fifty hectares of woodland and wetland.\n" +
      "It was established in two thousand and four.\n" +
      "Right next to the entrance is the visitor centre, where you can pick up free trail maps.\n" +
      "Just behind the visitor centre is the café - it serves drinks until five.\n" +
      "If you turn left from the entrance, you'll reach the bird hide after a five-minute walk.\n" +
      "The hide is the best place to see kingfishers, especially in early morning.\n" +
      "Straight ahead from the entrance is the main woodland trail - it's two and a half kilometres long.\n" +
      "Look out for the old oak tree at the halfway point - it's over three hundred years old.\n" +
      "If you take the right-hand path instead, you'll come to the wetland boardwalk.\n" +
      "Please stay on the boardwalk, as the marsh is very fragile.\n" +
      "Dogs are welcome but must be kept on a lead at all times.\n" +
      "Cycling is allowed only on the gravel path, never on the boardwalk.\n" +
      "Finally - the last guided walk leaves at three thirty, lasts ninety minutes, and costs four pounds.",
    rate: 0.78,
    questions: [
      { type: "fill-in", prompt: "Park size: ___ hectares", answer: "250" },
      { type: "fill-in", prompt: "Year park established: ___", answer: "2004" },
      { type: "fill-in", prompt: "Free items at visitor centre: trail ___", answer: "maps" },
      { type: "fill-in", prompt: "Café closes at ___ p.m.", answer: "5" },
      { type: "mcq", prompt: "Best time to see kingfishers:", options: ["early morning", "midday", "evening"], answer: 0 },
      { type: "fill-in", prompt: "Length of main woodland trail: ___ km", answer: "2.5" },
      { type: "fill-in", prompt: "Age of old oak tree: over ___ years", answer: "300" },
      { type: "mcq", prompt: "Rule for dogs:", options: ["must be left at car park", "must be kept on a lead", "not allowed at all"], answer: 1 },
      { type: "fill-in", prompt: "Cycling allowed only on the ___ path", answer: "gravel" },
      { type: "fill-in", prompt: "Guided walk cost: £___", answer: "4" },
    ],
  },
  {
    id: "monologue-volunteer-briefing",
    section: 2,
    questionType: "Sentence Completion + Multiple Choice",
    questionTypeVi: "Hoàn thành câu + trắc nghiệm",
    title: "Briefing for New Volunteers",
    titleVi: "Hướng dẫn cho tình nguyện viên mới",
    context: "You will hear a coordinator briefing new volunteers at a community kitchen. Answer the questions.",
    contextVi: "Bạn sẽ nghe điều phối viên hướng dẫn tình nguyện viên mới. Trả lời câu hỏi.",
    transcript:
      "Coordinator: Welcome, everyone, and thank you for joining our community kitchen team.\n" +
      "My name is Daniel and I'm the volunteer coordinator.\n" +
      "We've been running this kitchen for eight years and serve about two hundred meals every weekday.\n" +
      "Most volunteers do one shift a week, which is four hours long.\n" +
      "Shifts run from ten in the morning until two in the afternoon.\n" +
      "Please always come in through the side door - never the main entrance, which is for guests only.\n" +
      "Aprons are provided, but you should wear closed-toe shoes for safety.\n" +
      "Long hair must be tied back, and please remove rings before food handling.\n" +
      "There are three main roles - chopping vegetables, serving food, and washing up.\n" +
      "Most newcomers start in the wash-up area, where mistakes are easy to fix.\n" +
      "Once you've done five shifts, you can train as a kitchen lead.\n" +
      "If you can't make a shift, please let us know at least twenty-four hours in advance.\n" +
      "There's a small kitchen for volunteers upstairs where tea and coffee are free.\n" +
      "And every Friday after the lunch service we hold a short team meeting - attendance is optional but encouraged.",
    rate: 0.78,
    questions: [
      { type: "fill-in", prompt: "Years the kitchen has been running: ___", answer: "8" },
      { type: "fill-in", prompt: "Meals served per weekday: ___", answer: "200" },
      { type: "fill-in", prompt: "Shift length: ___ hours", answer: "4" },
      { type: "fill-in", prompt: "Entrance for volunteers: ___ door", answer: "side" },
      { type: "mcq", prompt: "Required footwear:", options: ["sandals", "closed-toe shoes", "trainers only"], answer: 1 },
      { type: "fill-in", prompt: "Most newcomers start in the ___ area.", answer: "wash-up" },
      { type: "fill-in", prompt: "Shifts needed before training as lead: ___", answer: "5" },
      { type: "fill-in", prompt: "Cancellation notice: at least ___ hours", answer: "24" },
      { type: "fill-in", prompt: "Free drinks available in the ___ kitchen.", answer: "volunteers'" },
      { type: "mcq", prompt: "The Friday team meeting is:", options: ["compulsory", "encouraged but optional", "online only"], answer: 1 },
    ],
  },
  {
    id: "monologue-art-gallery",
    section: 2,
    questionType: "Multiple Choice + Note Completion",
    questionTypeVi: "Trắc nghiệm + điền ghi chú",
    title: "Audio Guide at the Art Gallery",
    titleVi: "Audio guide tại phòng tranh",
    context: "You will hear an audio guide introducing visitors to an art gallery. Answer the questions.",
    contextVi: "Bạn sẽ nghe audio guide giới thiệu phòng tranh. Trả lời câu hỏi.",
    transcript:
      "Curator: Welcome to the Northgate Art Gallery.\n" +
      "Our building was once a textile factory, and it was converted in two thousand and ten.\n" +
      "Today we hold around three thousand works across four floors.\n" +
      "On the ground floor you'll find our permanent collection of modern sculpture.\n" +
      "The first floor is dedicated to nineteenth-century landscape painting from across Europe.\n" +
      "On the second floor we show contemporary photography, with exhibitions changing every three months.\n" +
      "The top floor is reserved for our temporary blockbuster exhibitions.\n" +
      "Right now we're showing a major retrospective of the Mexican artist Frida Garcia, on until the end of January.\n" +
      "Entry to the permanent collection is always free, but the top-floor exhibition costs twelve pounds, or eight with a student card.\n" +
      "Children under eighteen go free everywhere.\n" +
      "Photography without flash is permitted, except in the photography gallery itself.\n" +
      "Please don't touch the sculptures - even clean hands leave oils that damage the surface.\n" +
      "Our shop and café are on the ground floor and both close at six.\n" +
      "Enjoy your visit.",
    rate: 0.78,
    questions: [
      { type: "fill-in", prompt: "The building used to be a ___ factory.", answer: "textile" },
      { type: "fill-in", prompt: "Year of conversion: ___", answer: "2010" },
      { type: "fill-in", prompt: "Total works in collection: about ___", answer: "3000" },
      { type: "mcq", prompt: "Ground-floor collection focuses on:", options: ["sculpture", "photography", "landscape painting"], answer: 0 },
      { type: "fill-in", prompt: "Photography exhibitions change every ___ months.", answer: "3" },
      { type: "fill-in", prompt: "Current top-floor artist: Frida ___", answer: "Garcia" },
      { type: "fill-in", prompt: "Temporary exhibition ends in: ___", answer: "January" },
      { type: "fill-in", prompt: "Student ticket price: £___", answer: "8" },
      { type: "mcq", prompt: "Photography is NOT allowed in the:", options: ["sculpture floor", "landscape floor", "photography gallery"], answer: 2 },
      { type: "fill-in", prompt: "Shop and café close at ___ p.m.", answer: "6" },
    ],
  },
  {
    id: "monologue-festival-info",
    section: 2,
    questionType: "Multiple Choice + Sentence Completion",
    questionTypeVi: "Trắc nghiệm + điền câu",
    title: "Music Festival Information Talk",
    titleVi: "Thông tin lễ hội âm nhạc",
    context: "You will hear a member of staff briefing visitors at a music festival entrance. Answer the questions.",
    contextVi: "Bạn sẽ nghe nhân viên giới thiệu lễ hội âm nhạc tại cổng. Trả lời câu hỏi.",
    transcript:
      "Announcer: Hello everyone and welcome to the Riverstone Music Festival.\n" +
      "This is our seventh year, and we're expecting around twenty-five thousand visitors over the three days.\n" +
      "There are four stages in total - the Main Stage, the Acoustic Tent, the Dance Arena and our new Jazz Stage.\n" +
      "The Jazz Stage is the smallest, with a capacity of just five hundred, so please arrive early.\n" +
      "Headliners on Friday and Saturday play at ten p.m. on the Main Stage.\n" +
      "Sunday's main act starts a little earlier, at nine, because there is a public-transport curfew.\n" +
      "Food stalls accept card payments only - there are no cash machines on site.\n" +
      "Free drinking water is available at six refill stations marked in blue on your map.\n" +
      "The lost-property tent is next to the medical tent, near the south entrance.\n" +
      "If you lose your wristband you'll need to pay a replacement fee of fifteen pounds.\n" +
      "Camping is included in your ticket, but car parking costs an extra ten pounds per day.\n" +
      "And finally, please - no glass bottles, no fireworks and no professional cameras inside the arena.\n" +
      "Enjoy the festival.",
    rate: 0.78,
    questions: [
      { type: "fill-in", prompt: "Festival edition: ___ year", answer: "seventh" },
      { type: "fill-in", prompt: "Expected visitors: ___", answer: "25000" },
      { type: "fill-in", prompt: "Number of stages: ___", answer: "4" },
      { type: "fill-in", prompt: "Capacity of Jazz Stage: ___", answer: "500" },
      { type: "fill-in", prompt: "Sunday main act starts at ___ p.m.", answer: "9" },
      { type: "mcq", prompt: "Food stalls accept:", options: ["cash only", "card only", "both cash and card"], answer: 1 },
      { type: "fill-in", prompt: "Water refill stations shown in ___ on map.", answer: "blue" },
      { type: "fill-in", prompt: "Lost property is next to the ___ tent.", answer: "medical" },
      { type: "fill-in", prompt: "Wristband replacement fee: £___", answer: "15" },
      { type: "mcq", prompt: "Banned items include:", options: ["glass bottles", "snacks", "umbrellas"], answer: 0 },
    ],
  },

  // ============================================================
  // SECTION 3 - six academic discussions (2-3 speakers)
  // ============================================================
  {
    id: "discussion-presentation-feedback",
    section: 3,
    questionType: "Multiple Choice + Matching",
    questionTypeVi: "Trắc nghiệm + nối",
    title: "Feedback on a Group Presentation",
    titleVi: "Phản hồi về bài thuyết trình nhóm",
    context: "You will hear two students, Olivia and Ben, discussing a group presentation with their tutor.",
    contextVi: "Bạn sẽ nghe hai sinh viên trao đổi với giảng viên về bài thuyết trình nhóm.",
    transcript:
      "Tutor: Right, let's talk about yesterday's presentation. Overall, very good.\n" +
      "Olivia: Thanks. We were quite nervous, actually.\n" +
      "Tutor: That didn't come across. The structure was clear and the visuals were strong.\n" +
      "Ben: That was Olivia - she made all the slides.\n" +
      "Tutor: The introduction in particular was excellent - short and engaging.\n" +
      "Olivia: We rehearsed it about ten times.\n" +
      "Tutor: It showed. However, the section on methodology felt a bit rushed.\n" +
      "Ben: Yes, we ran short on time.\n" +
      "Tutor: Next time, cut one example from the conclusion and use that minute on methods.\n" +
      "Olivia: That's a good idea.\n" +
      "Tutor: I also liked your use of survey data. How many respondents did you have?\n" +
      "Ben: Eighty-seven in total.\n" +
      "Tutor: Respectable. Just remember to round percentages to one decimal place.\n" +
      "Olivia: Noted.\n" +
      "Tutor: The Q and A was handled well, although you both relied too much on one source - that book by Hartley.\n" +
      "Ben: I'll bring in a wider range of references next time.\n" +
      "Tutor: For the final report, please add a glossary of technical terms.\n" +
      "Olivia: Will do. When is the report due?\n" +
      "Tutor: The fifteenth of May, by five p.m.",
    rate: 0.78,
    questions: [
      { type: "mcq", prompt: "The tutor's overall opinion was:", options: ["mixed", "very good", "disappointing"], answer: 1 },
      { type: "fill-in", prompt: "Slides were made by ___.", answer: "Olivia" },
      { type: "fill-in", prompt: "Section that felt rushed: ___", answer: "methodology" },
      { type: "fill-in", prompt: "Cut one example from the ___.", answer: "conclusion" },
      { type: "fill-in", prompt: "Number of survey respondents: ___", answer: "87" },
      { type: "fill-in", prompt: "Round percentages to ___ decimal place.", answer: "one" },
      { type: "mcq", prompt: "Main weakness of the Q and A:", options: ["unclear answers", "too much reliance on one source", "going over time"], answer: 1 },
      { type: "fill-in", prompt: "Author over-cited: ___", answer: "Hartley" },
      { type: "fill-in", prompt: "Final report must include a ___.", answer: "glossary" },
      { type: "fill-in", prompt: "Report deadline: ___ May, 5 p.m.", answer: "15" },
    ],
  },
  {
    id: "discussion-field-trip-plan",
    section: 3,
    questionType: "Matching + Multiple Choice",
    questionTypeVi: "Nối + Trắc nghiệm",
    title: "Planning a Geography Field Trip",
    titleVi: "Lên kế hoạch chuyến đi thực địa địa lý",
    context: "You will hear two students, Mia and Carlos, planning a field trip with their tutor.",
    contextVi: "Bạn sẽ nghe hai sinh viên lên kế hoạch chuyến đi thực địa với giảng viên.",
    transcript:
      "Tutor: So, where are we thinking for the field trip?\n" +
      "Mia: We'd like to go to the coastal cliffs at Sandown.\n" +
      "Carlos: Yes, the rock formations there are perfect for our project.\n" +
      "Tutor: Good choice. How long will you stay?\n" +
      "Mia: Three nights, leaving on Monday morning.\n" +
      "Tutor: And how many students in total?\n" +
      "Carlos: Twelve so far, though two more might join.\n" +
      "Tutor: That's manageable. Have you arranged accommodation?\n" +
      "Mia: Yes, the youth hostel on Marine Road. It works out at twenty-two pounds per person per night.\n" +
      "Tutor: Fine. What about transport?\n" +
      "Carlos: We're hiring a minibus, which will cost about one hundred and eighty pounds for the week.\n" +
      "Tutor: And equipment?\n" +
      "Mia: We'll need GPS units, sample bags and a couple of cameras.\n" +
      "Tutor: I can lend you the GPS units, but you'll have to borrow the cameras from the media department.\n" +
      "Carlos: We've already emailed them.\n" +
      "Tutor: Risk assessment - please remember it's due Friday.\n" +
      "Mia: We've drafted it. Carlos is checking the tide times.\n" +
      "Tutor: Crucial. Never sample on a rising tide.\n" +
      "Carlos: Understood.\n" +
      "Tutor: Final report: word limit is three thousand words, plus appendices.\n" +
      "Mia: Right.\n" +
      "Tutor: Deadline is the tenth of June.",
    rate: 0.78,
    questions: [
      { type: "fill-in", prompt: "Field trip destination: ___ cliffs", answer: "Sandown" },
      { type: "fill-in", prompt: "Number of nights: ___", answer: "3" },
      { type: "fill-in", prompt: "Confirmed student count: ___", answer: "12" },
      { type: "fill-in", prompt: "Accommodation: youth hostel on ___ Road", answer: "Marine" },
      { type: "fill-in", prompt: "Cost per person per night: £___", answer: "22" },
      { type: "fill-in", prompt: "Minibus hire cost: £___", answer: "180" },
      { type: "mcq", prompt: "Tutor will lend the group:", options: ["sample bags", "GPS units", "cameras"], answer: 1 },
      { type: "fill-in", prompt: "Cameras must be borrowed from the ___ department.", answer: "media" },
      { type: "fill-in", prompt: "Word limit for final report: ___", answer: "3000" },
      { type: "fill-in", prompt: "Report deadline: ___ June", answer: "10" },
    ],
  },
  {
    id: "discussion-dissertation-topic",
    section: 3,
    questionType: "Multiple Choice + Sentence Completion",
    questionTypeVi: "Trắc nghiệm + điền câu",
    title: "Choosing a Dissertation Topic",
    titleVi: "Chọn đề tài luận văn",
    context: "You will hear a student, Hannah, discussing a possible dissertation topic with her supervisor.",
    contextVi: "Bạn sẽ nghe sinh viên Hannah trao đổi đề tài luận văn với giáo viên hướng dẫn.",
    transcript:
      "Supervisor: So Hannah, you said you wanted to talk about your dissertation.\n" +
      "Hannah: Yes - I'm torn between two topics.\n" +
      "Supervisor: Tell me about them.\n" +
      "Hannah: The first is renewable energy use in rural villages. The second is consumer attitudes to electric cars in cities.\n" +
      "Supervisor: Both are timely. Which interests you more?\n" +
      "Hannah: Honestly, the second one - but I'm worried it's been done a lot.\n" +
      "Supervisor: There's plenty of literature, yes, but most of it is from Europe. What if you compared two cities in Asia?\n" +
      "Hannah: That could work. Maybe Singapore and Bangkok.\n" +
      "Supervisor: Excellent contrast. One is wealthy with strong infrastructure; the other is still developing networks.\n" +
      "Hannah: Right.\n" +
      "Supervisor: How would you collect data?\n" +
      "Hannah: I was thinking online surveys for both cities, plus a few interviews.\n" +
      "Supervisor: Aim for around three hundred survey responses per city.\n" +
      "Hannah: That's a lot.\n" +
      "Supervisor: Use the alumni networks - both universities have active groups.\n" +
      "Hannah: Good idea.\n" +
      "Supervisor: For interviews, ten per city is plenty.\n" +
      "Hannah: And what about the literature review?\n" +
      "Supervisor: Six thousand words is the upper limit.\n" +
      "Hannah: Right. When should we meet next?\n" +
      "Supervisor: Send me a proposal by the twenty-fifth, then we'll meet on the second of next month.",
    rate: 0.78,
    questions: [
      { type: "mcq", prompt: "Hannah is more interested in the topic about:", options: ["renewable energy", "electric cars", "rural villages"], answer: 1 },
      { type: "fill-in", prompt: "Most existing literature comes from: ___", answer: "Europe" },
      { type: "fill-in", prompt: "First chosen city: ___", answer: "Singapore" },
      { type: "fill-in", prompt: "Second chosen city: ___", answer: "Bangkok" },
      { type: "fill-in", prompt: "Target survey responses per city: ___", answer: "300" },
      { type: "fill-in", prompt: "Recruitment route: ___ networks", answer: "alumni" },
      { type: "fill-in", prompt: "Number of interviews per city: ___", answer: "10" },
      { type: "fill-in", prompt: "Literature review word limit: ___", answer: "6000" },
      { type: "fill-in", prompt: "Proposal due on the ___", answer: "25th" },
      { type: "mcq", prompt: "The next meeting will be on:", options: ["the 25th of this month", "the 2nd of next month", "the 10th of next month"], answer: 1 },
    ],
  },
  {
    id: "discussion-lab-experiment",
    section: 3,
    questionType: "Matching + Sentence Completion",
    questionTypeVi: "Nối + điền câu",
    title: "Reviewing a Chemistry Experiment",
    titleVi: "Đánh giá thí nghiệm hoá học",
    context: "You will hear two students, Priya and Marcus, reviewing a chemistry experiment with their lab demonstrator.",
    contextVi: "Bạn sẽ nghe hai sinh viên rà soát thí nghiệm hoá học cùng trợ giảng phòng lab.",
    transcript:
      "Demonstrator: So, how did the titration go?\n" +
      "Priya: The first run was fine, but the second was way off.\n" +
      "Marcus: I think I rinsed the burette wrongly.\n" +
      "Demonstrator: That would do it. Always rinse with the solution you're using, not water.\n" +
      "Marcus: Lesson learned.\n" +
      "Demonstrator: What was your average titre, ignoring the second run?\n" +
      "Priya: Twenty-four point eight millilitres.\n" +
      "Demonstrator: And the indicator?\n" +
      "Marcus: Phenolphthalein.\n" +
      "Demonstrator: Fine for a strong-acid, strong-base titration. Did the colour change cleanly?\n" +
      "Priya: Yes, very sharp from colourless to pink.\n" +
      "Demonstrator: Good. Now for safety - Marcus, your goggles were on top of your head, not over your eyes.\n" +
      "Marcus: Sorry about that.\n" +
      "Demonstrator: It's a recurring issue. Lab safety is non-negotiable.\n" +
      "Marcus: Understood.\n" +
      "Demonstrator: For the write-up, focus on uncertainty. Calculate the percentage error.\n" +
      "Priya: How do we present the data?\n" +
      "Demonstrator: One table for raw data, one graph for trends.\n" +
      "Priya: Got it.\n" +
      "Demonstrator: Word limit for the discussion section is eight hundred words.\n" +
      "Marcus: And the deadline?\n" +
      "Demonstrator: Hand it in by next Wednesday at four.",
    rate: 0.78,
    questions: [
      { type: "fill-in", prompt: "Mistake in the second run: rinsed the ___ wrongly", answer: "burette" },
      { type: "fill-in", prompt: "Should rinse with the ___, not water", answer: "solution" },
      { type: "fill-in", prompt: "Average titre: ___ mL", answer: "24.8" },
      { type: "fill-in", prompt: "Indicator used: ___", answer: "phenolphthalein" },
      { type: "fill-in", prompt: "Final colour after change: ___", answer: "pink" },
      { type: "mcq", prompt: "Safety issue raised was about:", options: ["spilled acid", "missing gloves", "goggles position"], answer: 2 },
      { type: "fill-in", prompt: "Calculation focus: percentage ___", answer: "error" },
      { type: "fill-in", prompt: "Number of tables for raw data: ___", answer: "1" },
      { type: "fill-in", prompt: "Word limit for discussion: ___", answer: "800" },
      { type: "fill-in", prompt: "Deadline: next ___ at 4 p.m.", answer: "Wednesday" },
    ],
  },
  {
    id: "discussion-internship-options",
    section: 3,
    questionType: "Matching + Multiple Choice",
    questionTypeVi: "Nối + trắc nghiệm",
    title: "Comparing Two Internship Offers",
    titleVi: "So sánh hai lời mời thực tập",
    context: "You will hear two students, Lara and Sam, discussing internship offers with their careers advisor.",
    contextVi: "Bạn sẽ nghe hai sinh viên trao đổi cơ hội thực tập với cố vấn nghề nghiệp.",
    transcript:
      "Advisor: So you've both had offers - congratulations. Let's compare them.\n" +
      "Lara: My first is with a tech start-up. Twelve weeks, paid at eleven pounds an hour.\n" +
      "Sam: Mine is with a large bank. Eight weeks, paid at fifteen pounds an hour.\n" +
      "Advisor: Both reasonable. What appeals to each of you?\n" +
      "Lara: At the start-up I'd get a lot of responsibility quickly.\n" +
      "Sam: At the bank I'd see structured training programmes.\n" +
      "Advisor: That's a classic trade-off.\n" +
      "Lara: I'm also worried - the start-up only has fifteen staff.\n" +
      "Advisor: Small teams move fast, but mentorship can be thinner. Ask about their internship history.\n" +
      "Sam: My only concern is the dress code at the bank - very formal.\n" +
      "Advisor: That's the easy part. Stick to a dark suit and you'll be fine.\n" +
      "Lara: What about the projects on offer?\n" +
      "Advisor: The start-up will let you ship real code. The bank will likely give you research tasks.\n" +
      "Sam: I prefer hands-on work, actually.\n" +
      "Advisor: Then ask the bank if a rotation through their digital team is possible.\n" +
      "Sam: I will.\n" +
      "Advisor: One last thing - both offers expect a decision by the end of the month.\n" +
      "Lara: We'll send our acceptances by the twenty-eighth.",
    rate: 0.78,
    questions: [
      { type: "fill-in", prompt: "Tech start-up duration: ___ weeks", answer: "12" },
      { type: "fill-in", prompt: "Bank hourly pay: £___", answer: "15" },
      { type: "mcq", prompt: "Main appeal of the start-up:", options: ["high salary", "responsibility", "international travel"], answer: 1 },
      { type: "mcq", prompt: "Main appeal of the bank:", options: ["dress code", "structured training", "remote work"], answer: 1 },
      { type: "fill-in", prompt: "Start-up staff count: ___", answer: "15" },
      { type: "fill-in", prompt: "Ask start-up about internship ___", answer: "history" },
      { type: "fill-in", prompt: "Recommended bank outfit: a dark ___", answer: "suit" },
      { type: "fill-in", prompt: "Sam should request a rotation through the ___ team.", answer: "digital" },
      { type: "fill-in", prompt: "Tasks at the bank will mostly be ___ tasks.", answer: "research" },
      { type: "fill-in", prompt: "Acceptance deadline: ___ of the month", answer: "28th" },
    ],
  },
  {
    id: "discussion-thesis-edits",
    section: 3,
    questionType: "Sentence Completion + Matching",
    questionTypeVi: "Điền câu + nối",
    title: "Thesis Editing Meeting",
    titleVi: "Buổi chỉnh sửa luận văn",
    context: "You will hear a postgraduate student, Karim, discussing edits to his thesis with his supervisor.",
    contextVi: "Bạn sẽ nghe học viên sau đại học Karim trao đổi chỉnh sửa luận văn.",
    transcript:
      "Supervisor: Karim, your draft is improving but there are still several things to fix.\n" +
      "Karim: Of course. Where shall we start?\n" +
      "Supervisor: Chapter one is too long - bring it down by about a thousand words.\n" +
      "Karim: I'll cut the historical background.\n" +
      "Supervisor: Good. Chapter two is fine, but you need clearer signposting between sections.\n" +
      "Karim: Right.\n" +
      "Supervisor: In chapter three the figures are too small. Use a minimum font size of ten in axis labels.\n" +
      "Karim: I'll redo them.\n" +
      "Supervisor: Chapter four is your strongest - well argued. Just add one more case study from outside Europe.\n" +
      "Karim: I was thinking of using Brazil.\n" +
      "Supervisor: Perfect choice. Chapter five - the discussion - needs more critical voice. Don't just describe, evaluate.\n" +
      "Karim: Understood.\n" +
      "Supervisor: For the reference list, switch to Harvard style throughout. You've mixed APA and Harvard.\n" +
      "Karim: I'll standardise that.\n" +
      "Supervisor: Finally, the abstract - keep it under three hundred words and put the research question right at the start.\n" +
      "Karim: When do you need the next draft?\n" +
      "Supervisor: Two weeks from today.\n" +
      "Karim: That's tight but doable. Thank you.\n" +
      "Supervisor: And book a slot with the library for help with formatting - they run sessions on Tuesdays.",
    rate: 0.78,
    questions: [
      { type: "fill-in", prompt: "Words to cut from chapter one: about ___", answer: "1000" },
      { type: "fill-in", prompt: "Section to cut: the historical ___", answer: "background" },
      { type: "fill-in", prompt: "Chapter two needs clearer ___ between sections.", answer: "signposting" },
      { type: "fill-in", prompt: "Minimum font size in chapter-three figures: ___", answer: "10" },
      { type: "fill-in", prompt: "New case-study country: ___", answer: "Brazil" },
      { type: "mcq", prompt: "Chapter five needs more:", options: ["data", "critical voice", "diagrams"], answer: 1 },
      { type: "fill-in", prompt: "Referencing style to use throughout: ___", answer: "Harvard" },
      { type: "fill-in", prompt: "Abstract word limit: ___", answer: "300" },
      { type: "fill-in", prompt: "Next draft due in: ___ weeks", answer: "2" },
      { type: "fill-in", prompt: "Library formatting sessions: ___s", answer: "Tuesday" },
    ],
  },

  // ============================================================
  // SECTION 4 - five academic lectures (single speaker)
  // ============================================================
  {
    id: "lecture-sleep-science",
    section: 4,
    questionType: "Note Completion",
    questionTypeVi: "Điền ghi chú học thuật",
    title: "The Science of Sleep",
    titleVi: "Khoa học về giấc ngủ",
    context: "You will hear part of a university lecture about sleep. Complete the notes. Write NO MORE THAN TWO WORDS for each answer.",
    contextVi: "Bạn sẽ nghe bài giảng đại học về giấc ngủ. Điền vào ghi chú.",
    transcript:
      "Lecturer: Good morning. Today we'll look at why sleep matters for both brain and body.\n" +
      "On average, adults need between seven and nine hours of sleep each night.\n" +
      "Sleep is divided into cycles of about ninety minutes, each containing both light and deep stages.\n" +
      "The deep stage is when the body releases the most growth hormone, supporting tissue repair.\n" +
      "Later in the cycle comes REM sleep, when most vivid dreaming occurs.\n" +
      "REM is essential for memory consolidation, particularly for emotional memories.\n" +
      "Chronic lack of sleep - less than six hours a night - has been linked to a thirty percent higher risk of heart disease.\n" +
      "It also impairs the immune system; people who sleep poorly are around three times more likely to catch a cold.\n" +
      "Now, a few practical points. Caffeine has a half-life of around five hours, so an afternoon coffee can disrupt sleep at night.\n" +
      "Blue light from screens suppresses the hormone melatonin, delaying sleep onset.\n" +
      "Experts therefore recommend stopping screen use at least one hour before bedtime.\n" +
      "Surprisingly, regular bedtime routines help adults as much as children.\n" +
      "A short nap of around twenty minutes can boost alertness without causing sleep inertia.\n" +
      "Naps longer than thirty minutes risk leaving you groggy.\n" +
      "Finally, exercise improves sleep quality - but vigorous training within two hours of bedtime can have the opposite effect.",
    rate: 0.78,
    questions: [
      { type: "fill-in", prompt: "Recommended sleep for adults: ___ to 9 hours", answer: "7" },
      { type: "fill-in", prompt: "Sleep cycle length: ___ minutes", answer: "90" },
      { type: "fill-in", prompt: "Hormone released in deep sleep: ___ hormone", answer: "growth" },
      { type: "fill-in", prompt: "REM is key for memory ___.", answer: "consolidation" },
      { type: "fill-in", prompt: "Heart-disease risk increase with little sleep: ___ %", answer: "30" },
      { type: "fill-in", prompt: "Cold-catching odds: about ___ times higher", answer: "3" },
      { type: "fill-in", prompt: "Caffeine half-life: ___ hours", answer: "5" },
      { type: "fill-in", prompt: "Blue light suppresses ___.", answer: "melatonin" },
      { type: "fill-in", prompt: "Stop screens at least ___ hour before bed.", answer: "1" },
      { type: "fill-in", prompt: "Ideal nap length: about ___ minutes", answer: "20" },
    ],
  },
  {
    id: "lecture-honeybee-decline",
    section: 4,
    questionType: "Note Completion",
    questionTypeVi: "Điền ghi chú học thuật",
    title: "Why Honeybees Are in Decline",
    titleVi: "Vì sao đàn ong mật suy giảm",
    context: "You will hear a lecture on honeybee populations. Complete the notes. Write NO MORE THAN TWO WORDS for each answer.",
    contextVi: "Bạn sẽ nghe bài giảng về đàn ong mật. Điền vào ghi chú.",
    transcript:
      "Professor: Good afternoon. Today's lecture is about honeybees and the multiple pressures they face.\n" +
      "Honeybees pollinate roughly one third of the food crops humans eat.\n" +
      "Globally, beekeepers have reported colony losses of around forty percent in some recent winters.\n" +
      "Researchers identify four main causes - sometimes called the four P's.\n" +
      "The first is pests, particularly the varroa mite, which weakens adult bees and spreads viruses.\n" +
      "The second is pathogens - fungal and bacterial diseases such as nosema.\n" +
      "The third is pesticides, especially a class called neonicotinoids, which damage bees' navigation.\n" +
      "The fourth is poor nutrition, caused by large monoculture farms providing only one type of pollen.\n" +
      "On the positive side, several countries now restrict the most harmful pesticides.\n" +
      "The European Union banned outdoor use of three neonicotinoids in twenty eighteen.\n" +
      "Urban beekeeping is also growing - cities can actually offer more diverse flowering plants than the countryside.\n" +
      "Researchers at the University of Reading have shown that planting wildflower strips along field edges can increase wild bee numbers by up to thirty percent.\n" +
      "Citizen science is helping too - over fifty thousand volunteers in the UK now record bee sightings each year.\n" +
      "To conclude, saving bees requires combined action: better farming, fewer chemicals, and protected habitat.",
    rate: 0.78,
    questions: [
      { type: "fill-in", prompt: "Bees pollinate about ___ of human food crops.", answer: "one third" },
      { type: "fill-in", prompt: "Recent winter colony losses: about ___ %", answer: "40" },
      { type: "fill-in", prompt: "Number of main causes: ___", answer: "4" },
      { type: "fill-in", prompt: "First cause - main pest: the ___ mite", answer: "varroa" },
      { type: "fill-in", prompt: "Example pathogen mentioned: ___", answer: "nosema" },
      { type: "fill-in", prompt: "Harmful pesticide class: ___", answer: "neonicotinoids" },
      { type: "fill-in", prompt: "Fourth cause: poor ___", answer: "nutrition" },
      { type: "fill-in", prompt: "EU outdoor ban year: ___", answer: "2018" },
      { type: "fill-in", prompt: "Wildflower strips can boost wild bees by up to ___ %", answer: "30" },
      { type: "fill-in", prompt: "UK citizen-science volunteers: over ___", answer: "50000" },
    ],
  },
  {
    id: "lecture-volcanoes-2",
    section: 4,
    questionType: "Note Completion",
    questionTypeVi: "Điền ghi chú học thuật",
    title: "Understanding Volcanoes",
    titleVi: "Tìm hiểu núi lửa",
    context: "You will hear part of a geology lecture on volcanoes. Complete the notes. Write NO MORE THAN TWO WORDS for each answer.",
    contextVi: "Bạn sẽ nghe bài giảng địa chất về núi lửa. Điền vào ghi chú.",
    transcript:
      "Lecturer: Welcome to today's lecture on volcanoes.\n" +
      "There are roughly fifteen hundred active volcanoes on Earth, most of them along the Pacific Ring of Fire.\n" +
      "Volcanoes form where tectonic plates meet - either pulling apart, pushing together, or sliding past each other.\n" +
      "There are three main shapes: shield, composite and cinder cone.\n" +
      "Shield volcanoes have gentle slopes and produce runny lava - Hawaii is the classic example.\n" +
      "Composite volcanoes are tall and steep, formed by alternating layers of lava and ash.\n" +
      "Cinder cones are the smallest and shortest-lived.\n" +
      "Eruptions are ranked on the Volcanic Explosivity Index, or VEI, from zero to eight.\n" +
      "An eruption of VEI four can send ash ten kilometres into the air.\n" +
      "The Tambora eruption of eighteen fifteen - a VEI seven - caused the year without a summer in eighteen sixteen.\n" +
      "Predicting eruptions is improving. Scientists watch for three main warning signs: ground swelling, increased gas emissions and small earthquakes.\n" +
      "Modern satellites can detect ground deformation of less than one centimetre.\n" +
      "Despite the dangers, volcanic soil is exceptionally fertile, which is why so many people live near volcanoes.\n" +
      "Today, around five hundred million people live within range of an active volcano.\n" +
      "We'll finish with one practical point: evacuation plans, not lava barriers, save the most lives.",
    rate: 0.78,
    questions: [
      { type: "fill-in", prompt: "Active volcanoes on Earth: about ___", answer: "1500" },
      { type: "fill-in", prompt: "Most are along the Pacific ___", answer: "Ring of Fire" },
      { type: "fill-in", prompt: "Number of main shapes: ___", answer: "3" },
      { type: "fill-in", prompt: "Classic shield-volcano example: ___", answer: "Hawaii" },
      { type: "fill-in", prompt: "Composite volcanoes alternate lava and ___.", answer: "ash" },
      { type: "fill-in", prompt: "VEI scale top value: ___", answer: "8" },
      { type: "fill-in", prompt: "VEI 4 ash height: ___ km", answer: "10" },
      { type: "fill-in", prompt: "Tambora eruption year: ___", answer: "1815" },
      { type: "fill-in", prompt: "Satellites detect deformation under ___ cm.", answer: "1" },
      { type: "fill-in", prompt: "People near active volcanoes: about ___ million", answer: "500" },
    ],
  },
  {
    id: "lecture-printing-press",
    section: 4,
    questionType: "Note Completion",
    questionTypeVi: "Điền ghi chú học thuật",
    title: "The Impact of the Printing Press",
    titleVi: "Tác động của máy in",
    context: "You will hear a history lecture on the printing press. Complete the notes. Write NO MORE THAN TWO WORDS for each answer.",
    contextVi: "Bạn sẽ nghe bài giảng lịch sử về máy in. Điền vào ghi chú.",
    transcript:
      "Professor: Good morning. Today we look at one of history's great turning points: Gutenberg's printing press.\n" +
      "Johannes Gutenberg, a German goldsmith, completed his press in the German city of Mainz around fourteen fifty.\n" +
      "His key innovation was movable metal type - letters that could be rearranged and reused.\n" +
      "Before this, books were copied by hand, taking months and costing the equivalent of a small house.\n" +
      "Within fifty years of Gutenberg's press, an estimated twenty million books had been printed in Europe.\n" +
      "Literacy rates began to climb, especially in northern Europe.\n" +
      "The press also transformed religion. Martin Luther's ninety-five theses, printed in fifteen seventeen, spread across Europe in weeks rather than years.\n" +
      "Science benefitted enormously too. Scientists could now share results quickly and accurately.\n" +
      "One famous example is the work of Copernicus, whose model of the solar system was published in fifteen forty-three.\n" +
      "Newspapers emerged in the seventeenth century, with the first daily paper appearing in Leipzig in sixteen fifty.\n" +
      "Beyond Europe, similar techniques existed in East Asia for centuries - but printing in Chinese was harder because of the thousands of characters needed.\n" +
      "Gutenberg himself died in relative poverty, having lost his workshop to a creditor in fourteen fifty-five.\n" +
      "Yet his invention is widely credited as the foundation for the modern information age.",
    rate: 0.78,
    questions: [
      { type: "fill-in", prompt: "Gutenberg's original trade: ___", answer: "goldsmith" },
      { type: "fill-in", prompt: "City where the press was completed: ___", answer: "Mainz" },
      { type: "fill-in", prompt: "Approximate year: ___", answer: "1450" },
      { type: "fill-in", prompt: "Key innovation: movable ___ type", answer: "metal" },
      { type: "fill-in", prompt: "Books printed in 50 years: about ___ million", answer: "20" },
      { type: "fill-in", prompt: "Luther's theses printed in: ___", answer: "1517" },
      { type: "fill-in", prompt: "Copernicus published in: ___", answer: "1543" },
      { type: "fill-in", prompt: "First daily paper city: ___", answer: "Leipzig" },
      { type: "fill-in", prompt: "Chinese printing limited by thousands of ___.", answer: "characters" },
      { type: "fill-in", prompt: "Gutenberg lost workshop in: ___", answer: "1455" },
    ],
  },
  {
    id: "lecture-ocean-plastics",
    section: 4,
    questionType: "Note Completion",
    questionTypeVi: "Điền ghi chú học thuật",
    title: "Plastics in the Ocean",
    titleVi: "Rác thải nhựa trong đại dương",
    context: "You will hear a lecture on plastic pollution in the ocean. Complete the notes. Write NO MORE THAN TWO WORDS for each answer.",
    contextVi: "Bạn sẽ nghe bài giảng về ô nhiễm nhựa biển. Điền vào ghi chú.",
    transcript:
      "Lecturer: Good afternoon. Today's lecture is on plastics in our oceans - both the scale of the problem and possible responses.\n" +
      "Each year, around eight million tonnes of plastic enter the sea.\n" +
      "About eighty percent of this comes from land-based sources - primarily rivers and coastal cities.\n" +
      "Once in the water, sunlight and waves break large plastics into tiny fragments called microplastics, smaller than five millimetres across.\n" +
      "Microplastics have been found in the deepest ocean trench, the Mariana Trench, more than ten thousand metres deep.\n" +
      "They have also been detected in the stomachs of over one hundred and seventy marine species.\n" +
      "The economic cost is large too - global damage to fishing and tourism is estimated at thirteen billion dollars a year.\n" +
      "On the positive side, several solutions are emerging.\n" +
      "Deposit-return schemes for plastic bottles can lift recycling rates above ninety percent, as seen in Germany.\n" +
      "Better river-mouth interceptors can capture plastic before it ever reaches the open sea.\n" +
      "Engineers have developed barge-based devices that filter floating debris in slow-moving rivers.\n" +
      "Behaviour change matters too - single-use plastic bags have been banned or taxed in over one hundred countries.\n" +
      "And finally, biodegradable alternatives are improving, though they still represent less than two percent of the global plastics market.\n" +
      "The take-home message: solving ocean plastic requires action on land, on rivers and in policy, not just at sea.",
    rate: 0.78,
    questions: [
      { type: "fill-in", prompt: "Annual plastic entering sea: ___ million tonnes", answer: "8" },
      { type: "fill-in", prompt: "Land-based share: ___ %", answer: "80" },
      { type: "fill-in", prompt: "Microplastics are smaller than ___ mm.", answer: "5" },
      { type: "fill-in", prompt: "Deepest trench surveyed: ___ Trench", answer: "Mariana" },
      { type: "fill-in", prompt: "Trench depth: over ___ metres", answer: "10000" },
      { type: "fill-in", prompt: "Species with plastic in stomach: over ___", answer: "170" },
      { type: "fill-in", prompt: "Annual economic damage: $___ billion", answer: "13" },
      { type: "fill-in", prompt: "Country example for deposit-return: ___", answer: "Germany" },
      { type: "fill-in", prompt: "Countries with bag bans/taxes: over ___", answer: "100" },
      { type: "fill-in", prompt: "Biodegradable share of market: under ___ %", answer: "2" },
    ],
  },
];
