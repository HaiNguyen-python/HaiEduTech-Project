// Distinct content for each TOEIC Speaking & Writing practice test.
// Every set is unique so no two tests share prompts, photos or keyword pairs.
import mechanic from "@/assets/toeic/part1-mechanic-car.jpg";
import chef from "@/assets/toeic/part1-chef-chopping.jpg";
import barista from "@/assets/toeic/part1-barista-drink.jpg";
import waiter from "@/assets/toeic/part1-waiter-table.jpg";
import receptionist from "@/assets/toeic/part1-receptionist-phone.jpg";
import clerk from "@/assets/toeic/part1-clerk-receipt.jpg";
import typing from "@/assets/toeic/part1-woman-typing.jpg";
import meeting from "@/assets/toeic/part1-people-meeting-table.jpg";
import presenter from "@/assets/toeic/part1-man-presentation-materials.jpg";
import loading from "@/assets/toeic/part1-workers-loading.jpg";
import parcel from "@/assets/toeic/part1-delivery-parcel.jpg";
import doctor from "@/assets/toeic/part1-doctor-chart.jpg";
import pharmacist from "@/assets/toeic/part1-pharmacist-bottle.jpg";
import florist from "@/assets/toeic/part1-florist-flowers.jpg";
import scientist from "@/assets/toeic/part1-scientist-microscope.jpg";
import teacher from "@/assets/toeic/part1-teacher-chalkboard.jpg";
import teller from "@/assets/toeic/part1-bankteller-bills.jpg";
import hotel from "@/assets/toeic/part1-hotelclerk-key.jpg";
import helmet from "@/assets/toeic/part1-construction-helmet.jpg";
import gardener from "@/assets/toeic/part1-gardener-hedge.jpg";
import photographer from "@/assets/toeic/part1-photographer-camera.jpg";
import salesperson from "@/assets/toeic/part1-salesperson-product.jpg";
import vendor from "@/assets/toeic/part1-vendor-fruit.jpg";
import passengers from "@/assets/toeic/part1-passenger-board.jpg";
import newspaper from "@/assets/toeic/part1-man-newspaper.jpg";
import clipboard from "@/assets/toeic/part1-woman-clipboard.jpg";
import coach from "@/assets/toeic/part1-coach-players.jpg";
import guide from "@/assets/toeic/part1-tourguide-landmark.jpg";
import artist from "@/assets/toeic/part1-artist-canvas.jpg";
import journalist from "@/assets/toeic/part1-journalist-notes.jpg";
import pilot from "@/assets/toeic/part1-pilot-cockpit.jpg";
import stage from "@/assets/toeic/part1-musician-stage.jpg";
import shelves from "@/assets/toeic/part1-shelves-merchandise.jpg";
import whiteboard from "@/assets/toeic/part1-man-whiteboard.jpg";
import machine from "@/assets/toeic/part1-technician-machine.jpg";
import chart from "@/assets/toeic/part1-colleagues-chart-screen.jpg";
import pointing from "@/assets/toeic/part1-worker-pointing-display.jpg";
import goggles from "@/assets/toeic/part1-man-goggles.jpg";

export interface SWWritingPic { photo: string; keys: string; sample: string }
export interface SWEmail { from: string; subject: string; body: string; task: string; sample: string }
export interface SWContentSet {
  readAloud: [string, string];
  describePhotos: [string, string];
  describeSamples: [string, string];
  personalContext: string;
  personalQs: [string, string, string];
  personalSamples: [string, string, string];
  schedule: string;
  scheduleQs: [string, string, string];
  scheduleSamples: [string, string, string];
  opinion: string;
  opinionSample: string;
  pictures: [SWWritingPic, SWWritingPic, SWWritingPic, SWWritingPic, SWWritingPic];
  emails: [SWEmail, SWEmail];
  essay: string;
  essaySample: string;
}

export const SW_CONTENT_SETS: SWContentSet[] = [
  // 01 - Corporate events
  {
    readAloud: [
      "Welcome to Brightline Consulting. Visitors attending today's leadership forum should collect a name badge at the reception desk before entering the main hall. The opening session will begin promptly at nine o'clock, so please be seated by eight forty-five.",
      "Attention, all staff. The finance department will hold a short training session on the new expense software at two o'clock this afternoon in conference room B. Please bring your laptop, your login details, and any receipts you would like to submit.",
    ],
    describePhotos: [meeting, receptionist],
    describeSamples: [
      "This picture shows a group of colleagues sitting around a large table in a bright meeting room. Some of them are looking at documents, and one woman appears to be leading the discussion. There are laptops and coffee cups on the table, so it seems to be a regular planning meeting.",
      "In this picture, a receptionist is talking on the phone at a front desk. She is smiling and appears to be helping a caller. In front of her there is a computer screen and some paperwork, so she is probably checking a booking or an appointment.",
    ],
    personalContext: "Imagine that an English-speaking colleague is asking you about professional training.",
    personalQs: [
      "How often do you attend professional training, and when was the last time?",
      "Do you prefer training sessions online or in person? Why?",
      "Describe a skill you would like to improve this year and explain how you plan to develop it.",
    ],
    personalSamples: [
      "I attend training about twice a year. The last time was in March, when I took a short course on project management.",
      "I prefer in-person sessions because I can ask questions directly and practise with other participants.",
      "This year I would like to improve my presentation skills. I plan to join a weekly workshop, watch recordings of my talks, and ask my manager for feedback after each meeting.",
    ],
    schedule: "Brightline Consulting - Leadership Forum (May 14)\n\n09:00  Opening remarks - Ms. Daniels (CEO)\n10:00  Workshop: Customer Communication - Ms. Allen\n11:30  Coffee break\n13:30  Digital Tools for Teams - Mr. Park\n15:00  Panel: Managing Remote Staff - (cancelled)\n16:30  Closing keynote - Dr. Tran",
    scheduleQs: [
      "What time does the forum begin, and who gives the opening remarks?",
      "I heard there is a panel on managing remote staff at three o'clock. Is that correct?",
      "I can only attend in the afternoon. Could you tell me all the sessions I can join after lunch?",
    ],
    scheduleSamples: [
      "The forum begins at nine o'clock with opening remarks by Ms. Daniels, our CEO.",
      "Actually, I'm afraid that panel has been cancelled, so there is no session at three o'clock.",
      "Sure. After lunch there are two sessions. At one thirty Mr. Park will lead Digital Tools for Teams, and at four thirty Dr. Tran will give the closing keynote.",
    ],
    opinion: "Some companies allow employees to choose flexible working hours. Do you think this is a good policy? Give specific reasons and examples to support your opinion.",
    opinionSample: "In my opinion, flexible hours are a good policy. First, employees can work when they are most productive. For example, my colleague starts at seven and finishes her reports before lunch. Second, it reduces stress because people can avoid rush hour traffic. As a result, staff are usually happier and more loyal to the company.",
    pictures: [
      { photo: meeting, keys: "meeting / discuss", sample: "The colleagues are having a meeting to discuss the new project." },
      { photo: typing, keys: "employee / computer", sample: "An employee is typing a report on her computer." },
      { photo: clerk, keys: "customer / receive", sample: "The customer is receiving a receipt from the clerk." },
      { photo: mechanic, keys: "technician / repair", sample: "A technician is repairing the engine of a car." },
      { photo: presenter, keys: "presentation / explain", sample: "The man is explaining his ideas during a presentation." },
    ],
    emails: [
      { from: "Morgan Lee", subject: "Question about the leadership forum", body: "I have registered for the forum on May 14, but I need information about parking and the starting time. Could you also tell me whether lunch will be provided?", task: "Write a reply that answers ALL of Morgan's questions and offers ONE additional helpful detail.", sample: "Dear Morgan,\n\nThank you for registering for the forum. Free parking is available in the garage next to the main entrance, and the first session starts at 9:00 A.M. Lunch will be provided for all registered participants in the ground-floor cafe. In addition, we recommend arriving by 8:30 so you have time to collect your badge.\n\nBest regards,\nEvent Team" },
      { from: "Daniel Price, Customer", subject: "Delayed delivery", body: "I ordered ten office chairs two weeks ago, but they still have not arrived. We need them for new staff starting next Monday.", task: "Write a reply that APOLOGIZES, explains TWO actions you will take, and asks for ONE piece of information.", sample: "Dear Mr. Price,\n\nWe sincerely apologize for the delay with your order. First, I will contact our warehouse today to confirm the shipping status. Second, if the chairs cannot arrive before Monday, we will send them by express delivery at no extra cost. Could you please send me your order number so I can check it right away?\n\nKind regards,\nCustomer Service" },
    ],
    essay: "Do you agree or disagree with the following statement? Companies should spend more money on employee training than on advertising. Use specific reasons and examples to support your opinion.",
    essaySample: "Introduction: state a clear position (e.g. agree). Body 1: trained staff give better service, which keeps customers returning - example of a hotel that improved reviews after service training. Body 2: training lowers staff turnover and recruitment costs. Body 3 (concession): advertising is still needed for new products, but good word of mouth from satisfied customers is cheaper and more trusted. Conclusion: restate the opinion. Aim for 300+ words with linking words such as 'Furthermore', 'For instance', 'As a result'.",
  },
  // 02 - Hospitality
  {
    readAloud: [
      "Thank you for staying at the Harborview Hotel. Breakfast is served daily from six thirty to ten o'clock in the Garden Restaurant on the ground floor. Guests who need a late checkout should contact the front desk before eleven a.m.",
      "Good evening, passengers. Due to heavy rain, the eight fifteen ferry to Clearwater Island has been delayed by thirty minutes. Refreshments are available in the waiting lounge, and staff at the information counter can answer any questions.",
    ],
    describePhotos: [waiter, hotel],
    describeSamples: [
      "This picture was taken in a restaurant. A waiter wearing a uniform is serving food to customers at a table. The guests look relaxed and are talking to each other. In the background, I can see other tables and warm lighting, so it is probably dinner time.",
      "In this picture, a hotel clerk is standing behind a reception counter and handing a key card to a guest. The guest is holding a suitcase, so he has probably just arrived. The lobby looks modern and clean.",
    ],
    personalContext: "Imagine that a travel magazine is doing research about hotels and holidays. You agree to a telephone interview.",
    personalQs: [
      "When was the last time you stayed in a hotel, and where was it?",
      "What is the most important thing for you when choosing a hotel? Why?",
      "Would you prefer to stay in a large international hotel or a small local guesthouse? Explain why.",
    ],
    personalSamples: [
      "The last time I stayed in a hotel was last summer in Da Nang, for a family holiday.",
      "Location is the most important thing for me, because I want to walk to restaurants and attractions easily.",
      "I would prefer a small local guesthouse. The owners usually give useful local advice, the atmosphere is friendlier, and the price is often lower. For example, in Hoi An our host recommended a cooking class that was the highlight of our trip.",
    ],
    schedule: "Harborview Hotel - Wedding Package: Lin & Mark (Saturday, June 8)\n\n14:00  Guest check-in - Main lobby\n15:30  Ceremony - Rose Garden (Ballroom if raining)\n16:30  Photo session - Beach terrace\n18:00  Dinner reception - Grand Ballroom\n21:00  Live music - Ocean Lounge\nIncluded: free parking, welcome drink",
    scheduleQs: [
      "Where and when will the ceremony take place?",
      "I think the dinner reception is in the Ocean Lounge, right?",
      "Could you tell me what happens after the ceremony and what is included in the package?",
    ],
    scheduleSamples: [
      "The ceremony starts at three thirty in the Rose Garden. If it rains, it will move to the ballroom.",
      "Actually, the dinner reception is in the Grand Ballroom at six o'clock. The Ocean Lounge is for the live music at nine.",
      "After the ceremony there is a photo session on the beach terrace at four thirty, then dinner at six, and live music at nine. The package also includes free parking and a welcome drink.",
    ],
    opinion: "Some people think online reviews are the best way to choose a restaurant or hotel. Others prefer recommendations from friends. Which do you prefer and why?",
    opinionSample: "I prefer recommendations from friends. Online reviews can be fake or written by people with very different tastes. My friends know what I like, so their advice is more reliable. For instance, a friend recommended a small noodle shop that had few reviews online, and it became my favourite place.",
    pictures: [
      { photo: waiter, keys: "waiter / serve", sample: "The waiter is serving dinner to the guests at the table." },
      { photo: hotel, keys: "guest / key", sample: "The hotel guest is receiving a key from the clerk." },
      { photo: barista, keys: "coffee / prepare", sample: "A barista is preparing a cup of coffee behind the counter." },
      { photo: chef, keys: "chef / while", sample: "The chef is concentrating while he is chopping vegetables." },
      { photo: guide, keys: "tourists / point", sample: "The tour guide is pointing at the landmark while tourists listen." },
    ],
    emails: [
      { from: "Sofia Martins", subject: "Group booking", body: "Our company would like to book twelve rooms for a training trip from July 3 to July 6. Do you offer group discounts, and is there a meeting room we can use?", task: "Write a reply that gives TWO pieces of information and asks ONE question.", sample: "Dear Ms. Martins,\n\nThank you for choosing the Harborview Hotel. For groups of ten rooms or more, we offer a 15% discount, including breakfast. We also have a meeting room for up to 30 people, which you can use free of charge for two hours a day. Could you let me know what time your group expects to arrive on July 3?\n\nBest regards,\nReservations" },
      { from: "Hotel Manager", subject: "Guest complaint", body: "A guest complained that the air conditioning in her room did not work and the front desk did not respond quickly.", task: "Write to the guest. APOLOGIZE, describe TWO things you have done or will do, and make ONE offer.", sample: "Dear Ms. Nguyen,\n\nPlease accept our sincere apologies for the problem with your air conditioning. Our technician repaired the unit this morning, and we have reminded front-desk staff to respond to maintenance calls within fifteen minutes. As a gesture of goodwill, we would like to offer you a free dinner for two in our restaurant.\n\nYours sincerely,\nGuest Relations Manager" },
    ],
    essay: "Some people believe that tourism brings more benefits than problems to a local community. Do you agree or disagree? Give specific reasons and examples.",
    essaySample: "Position: mostly agree. Body 1: jobs and income for local people (hotels, guides, restaurants). Body 2: investment in roads, airports and cultural sites. Body 3: acknowledge problems such as pollution and rising prices, then suggest controlled tourism (visitor limits, eco-fees). Conclusion: benefits outweigh problems when tourism is managed well. Use 4-5 paragraphs and 300+ words.",
  },
  // 03 - Retail & customer service
  {
    readAloud: [
      "Welcome to Northway Bank. For your account balance, please press one. To speak with a customer representative, please press two. To report a lost or stolen card, please press three, and our team will assist you immediately.",
      "Shoppers, this week only, Greenfield Market is offering twenty percent off all fresh fruit, vegetables, and bakery items. Members of our rewards program will also receive double points on every purchase until Sunday evening.",
    ],
    describePhotos: [vendor, salesperson],
    describeSamples: [
      "This picture shows an outdoor market. A vendor is standing behind a stall full of colourful fruit, such as oranges and bananas. A customer is choosing some fruit, and the vendor seems to be helping her. It looks like a busy and sunny morning.",
      "In this picture, a salesperson is showing a product to a customer in a shop. She is holding the item and explaining its features. There are shelves with other products behind them, so this is probably an electronics or home goods store.",
    ],
    personalContext: "Imagine that a marketing company is doing research in your country. You agree to answer questions about shopping.",
    personalQs: [
      "How often do you shop online, and what do you usually buy?",
      "Where do you usually buy groceries? Why?",
      "When you buy an expensive item, do you prefer to shop online or in a store? Explain why.",
    ],
    personalSamples: [
      "I shop online about once a week, usually for books, clothes and household items.",
      "I usually buy groceries at a supermarket near my home because it is convenient and open late.",
      "For expensive items I prefer a store. I can see and test the product before paying, and I can ask the staff questions. For example, when I bought my laptop I compared the keyboards in person, which helped me choose the right model.",
    ],
    schedule: "Greenfield Market - Staff Training Week\n\nMon 08:00  Customer service basics - Ms. Ortiz (Room 1)\nTue 08:00  New payment system - Mr. Chen (Room 2)\nWed  -     No training (store inventory)\nThu 08:00  Handling complaints - Ms. Ortiz (Room 1)\nFri 14:00  Food safety - Dr. Bell (Room 3)",
    scheduleQs: [
      "Who is leading the training on the new payment system, and when?",
      "There is a training session on Wednesday morning, right?",
      "I'm interested in customer service. Which sessions does Ms. Ortiz lead?",
    ],
    scheduleSamples: [
      "Mr. Chen will lead it on Tuesday at eight o'clock in Room 2.",
      "No, there is no training on Wednesday because the store is doing its inventory.",
      "Ms. Ortiz leads two sessions in Room 1: Customer service basics on Monday at eight, and Handling complaints on Thursday at eight.",
    ],
    opinion: "Some people think stores should stay open twenty-four hours a day. Do you agree or disagree? Explain your reasons.",
    opinionSample: "I agree, at least for supermarkets and pharmacies. Many people work night shifts and need to buy food or medicine late. Also, shopping at night is quieter, so customers avoid long lines. For example, nurses at the hospital near my home often shop after midnight.",
    pictures: [
      { photo: vendor, keys: "market / sell", sample: "A vendor is selling fresh fruit at the market." },
      { photo: salesperson, keys: "salesperson / show", sample: "The salesperson is showing a new product to a customer." },
      { photo: shelves, keys: "shelves / because", sample: "The shelves look full because the staff restocked them this morning." },
      { photo: teller, keys: "teller / count", sample: "The bank teller is counting the money carefully." },
      { photo: florist, keys: "florist / arrange", sample: "The florist is arranging flowers into a bouquet." },
    ],
    emails: [
      { from: "Mark Sullivan", subject: "Interview availability", body: "Thank you for inviting me to interview for the Store Supervisor position. Unfortunately, I cannot attend on the date you proposed. Could you suggest an alternative time?", task: "Write a reply that THANKS him, proposes TWO alternative time slots, and asks ONE question.", sample: "Dear Mr. Sullivan,\n\nThank you for letting us know. We can offer two alternative times: Thursday, June 12 at 10:00 A.M., or Friday, June 13 at 2:00 P.M. Both interviews will take place at our head office. Could you tell me which time suits you best and whether you would prefer an online interview?\n\nBest regards,\nHR Department" },
      { from: "Rewards Program Customer", subject: "Points missing", body: "I bought groceries last Saturday, but the reward points have not been added to my account.", task: "Write a reply that EXPLAINS a possible reason, describes ONE action you will take, and asks for TWO pieces of information.", sample: "Dear Customer,\n\nThank you for contacting us. Points can sometimes take up to five days to appear when our system is being updated. I will check your transaction manually and add the points myself if necessary. Could you please send me your membership number and a photo of your receipt?\n\nKind regards,\nRewards Team" },
    ],
    essay: "Some people believe that shopping online will completely replace shopping in physical stores in the future. Do you agree or disagree? Use specific reasons and examples.",
    essaySample: "Position: disagree. Body 1: people want to touch, try and test products such as clothes or furniture. Body 2: stores provide social experiences and immediate purchase. Body 3: online shopping will keep growing, so stores will combine both (click and collect). Conclusion: both will coexist. 300+ words with clear topic sentences.",
  },
  // 04 - Logistics & manufacturing
  {
    readAloud: [
      "Attention, warehouse staff. Starting next Monday, all deliveries must be scanned at loading dock three before they are moved to storage. Please wear your safety vest and helmet at all times, and report any damaged boxes to your shift supervisor.",
      "This is a reminder from Atlas Shipping. Your package is scheduled for delivery tomorrow between ten a.m. and two p.m. If no one is available to sign for it, you may choose a nearby pickup location on our website or mobile app.",
    ],
    describePhotos: [loading, helmet],
    describeSamples: [
      "In this picture, two workers are loading boxes into the back of a truck. One man is lifting a heavy box while the other is arranging the boxes inside. They are wearing work clothes, and the area looks like a warehouse loading zone.",
      "This picture shows a construction worker wearing a yellow helmet and a safety vest. He is standing at a building site and looking at something carefully, maybe a plan or the structure in front of him. In the background there is equipment and an unfinished building.",
    ],
    personalContext: "Imagine that a delivery company is researching customer habits. You agree to a short telephone interview.",
    personalQs: [
      "How often do you receive packages at home?",
      "Do you prefer home delivery or picking up packages yourself? Why?",
      "What could delivery companies do to improve their service? Explain.",
    ],
    personalSamples: [
      "I receive packages about two or three times a week, mostly from online shops.",
      "I prefer home delivery because it saves time, especially on busy weekdays.",
      "Delivery companies could give more precise delivery times. For example, a one-hour window instead of a whole day would let me plan better. They could also send a photo when the package is left at the door, so customers know it arrived safely.",
    ],
    schedule: "Atlas Shipping - New Warehouse Opening (Friday, Sept 20)\n\n09:30  Welcome speech - Mr. Ivanov (Director)\n10:00  Facility tour - Groups A & B\n11:30  Safety demonstration - Ms. Kaur\n12:30  Lunch - Staff canteen\n14:00  Robotics system presentation - Mr. Obi\n15:30  Q&A with management",
    scheduleQs: [
      "What time does the event begin, and who will speak first?",
      "The safety demonstration is after lunch, isn't it?",
      "I'm interested in technology. What can I attend in the afternoon?",
    ],
    scheduleSamples: [
      "The event begins at nine thirty with a welcome speech by Mr. Ivanov, the director.",
      "No, the safety demonstration is before lunch, at eleven thirty, with Ms. Kaur.",
      "In the afternoon, Mr. Obi will present the robotics system at two o'clock, and then you can ask questions at the Q&A session with management at three thirty.",
    ],
    opinion: "Do you think robots and automation will create more jobs than they replace? Give reasons and examples.",
    opinionSample: "I think automation will create many new jobs, but different ones. Companies will need people to program, repair and manage robots. For example, the warehouse in my city installed robots and then hired technicians and data analysts. However, workers need training to move into these new roles.",
    pictures: [
      { photo: loading, keys: "truck / load", sample: "The workers are loading boxes onto a truck." },
      { photo: parcel, keys: "package / deliver", sample: "A courier is delivering a package to a customer's door." },
      { photo: helmet, keys: "worker / wear", sample: "The worker is wearing a helmet for safety." },
      { photo: machine, keys: "technician / adjust", sample: "A technician is adjusting a part of the machine." },
      { photo: clipboard, keys: "clipboard / check", sample: "The woman is checking items on her clipboard." },
    ],
    emails: [
      { from: "Priya Shah, Purchasing Manager", subject: "Shipping quote", body: "We need to ship 200 boxes of electronics to Singapore next month. Could you tell me the price, the delivery time, and whether insurance is included?", task: "Write a reply that answers her THREE questions.", sample: "Dear Ms. Shah,\n\nThank you for your inquiry. Shipping 200 boxes to Singapore by sea would cost approximately 3,400 US dollars. The delivery time is usually 12 to 15 days from our port. Basic insurance is included, and full-value insurance is available for an additional 2% of the cargo value. Please let me know if you would like a formal quote.\n\nBest regards,\nSales Department" },
      { from: "Warehouse Supervisor", subject: "Late shipments", body: "Several shipments left the warehouse late last week, and two customers complained.", task: "Write to the warehouse team. Explain the PROBLEM and suggest TWO solutions.", sample: "Dear Team,\n\nLast week several shipments left late, and two customers have complained. To solve this, please prepare next-day orders before 4 P.M. each afternoon. In addition, we will add a second scanning station at Dock 3 to reduce waiting time. Thank you for your cooperation.\n\nBest regards,\nWarehouse Supervisor" },
    ],
    essay: "Some companies require employees to work in the office every day, while others allow them to work from home. Which policy do you think is better for a company? Give specific reasons and examples.",
    essaySample: "Position: a hybrid model is best, but if choosing, explain clearly. Body 1: working from home saves commuting time and increases focus. Body 2: office work improves teamwork and training of new staff. Body 3: example from a real or imagined company. Conclusion: restate. 300+ words.",
  },
  // 05 - Healthcare
  {
    readAloud: [
      "Welcome to Riverside Medical Center. Patients with appointments should check in at the front desk at least fifteen minutes early. Please bring your insurance card, a list of your current medications, and any recent test results.",
      "This is a reminder that the hospital pharmacy will be closed on Saturday for system upgrades. Prescriptions can be collected on Friday until eight p.m. or from Sunday morning. For urgent needs, please visit the pharmacy on Elm Street.",
    ],
    describePhotos: [doctor, pharmacist],
    describeSamples: [
      "This picture shows a doctor in a white coat reviewing a medical chart. She is concentrating and holding a pen, so she may be writing notes about a patient. The room looks like a hospital office with bright lighting.",
      "In this picture, a pharmacist is standing in a pharmacy and holding a medicine bottle. He is reading the label carefully. Behind him there are shelves full of boxes and bottles.",
    ],
    personalContext: "Imagine that a health magazine is doing research about exercise habits. You agree to a telephone interview.",
    personalQs: [
      "How many times a week do you exercise?",
      "What is your favourite way to stay healthy? Why?",
      "Do you think companies should offer free gym memberships to employees? Explain.",
    ],
    personalSamples: [
      "I exercise about three times a week, usually in the evening after work.",
      "My favourite way is jogging in the park because it is free and helps me relax.",
      "Yes, I think they should. Healthy employees take fewer sick days and have more energy at work. For example, my friend's company offers free yoga classes, and she says the team is happier and more productive.",
    ],
    schedule: "Riverside Medical Center - Health Fair (Sunday, Oct 6)\n\n09:00  Free blood pressure checks - Lobby\n10:00  Talk: Healthy eating - Dr. Lopez\n11:00  Talk: Sleep and stress - Dr. Kim\n12:00  Lunch break\n13:00  Children's dental check-ups - Room 4\n14:30  Yoga demonstration - Garden",
    scheduleQs: [
      "What time does the health fair start, and what is the first activity?",
      "Dr. Lopez is talking about sleep and stress, right?",
      "I'm bringing my children. What activities could we do together?",
    ],
    scheduleSamples: [
      "It starts at nine o'clock with free blood pressure checks in the lobby.",
      "Actually, Dr. Lopez is talking about healthy eating at ten. Dr. Kim gives the talk on sleep and stress at eleven.",
      "Your children can have free dental check-ups in Room 4 at one o'clock, and then you can all join the yoga demonstration in the garden at two thirty.",
    ],
    opinion: "Some people think the government should spend more money on preventing illness, such as health education, than on treating sick people. Do you agree? Why?",
    opinionSample: "I agree. Preventing illness is usually cheaper than treating it. If people learn about healthy food and exercise, fewer will develop diseases like diabetes. For example, school programs about nutrition in my country have reduced childhood obesity. Of course, hospitals still need enough funding for emergencies.",
    pictures: [
      { photo: doctor, keys: "doctor / chart", sample: "The doctor is studying a patient's chart." },
      { photo: pharmacist, keys: "pharmacist / medicine", sample: "The pharmacist is checking the label on a bottle of medicine." },
      { photo: scientist, keys: "scientist / examine", sample: "A scientist is examining a sample under the microscope." },
      { photo: goggles, keys: "goggles / so that", sample: "The man is wearing goggles so that his eyes are protected." },
      { photo: chart, keys: "colleagues / screen", sample: "The colleagues are looking at a chart on the screen." },
    ],
    emails: [
      { from: "Laura Bennett", subject: "Appointment change", body: "I have an appointment with Dr. Kim on Tuesday at 9 A.M., but I have to travel for work. Could I change it to later in the week?", task: "Write a reply that offers TWO alternative appointments and gives ONE instruction.", sample: "Dear Ms. Bennett,\n\nThank you for letting us know. Dr. Kim is available on Thursday at 11:00 A.M. or on Friday at 3:30 P.M. Please reply to this email by Wednesday to confirm which time you prefer. Also, remember to bring your recent test results to the appointment.\n\nBest regards,\nPatient Services" },
      { from: "Clinic Director", subject: "Long waiting times", body: "Patients have complained that they wait more than an hour in the waiting room.", task: "Write to the director. Give TWO reasons for the problem and suggest ONE solution.", sample: "Dear Director,\n\nI believe there are two main reasons for the long waiting times. First, many appointments are booked too close together. Second, we have only one receptionist in the mornings. I suggest leaving a ten-minute gap between appointments and hiring a part-time receptionist for the busiest hours.\n\nKind regards,\nOffice Manager" },
    ],
    essay: "Some people think that technology, such as smartphones and smartwatches, has improved people's health. Others think it has made health worse. What is your opinion? Give reasons and examples.",
    essaySample: "Position: overall improved. Body 1: fitness apps and smartwatches track steps, heart rate and sleep. Body 2: online appointments and medical information save time. Body 3: concession - screen time reduces sleep and physical activity; solution is balance. Conclusion. 300+ words.",
  },
  // 06 - Education
  {
    readAloud: [
      "Good morning, students. The library will extend its opening hours during the exam period. From Monday to Friday, it will be open from seven a.m. until midnight. Group study rooms can be reserved online for up to three hours per day.",
      "Welcome to the Lakeside Language Institute open day. Free trial lessons in English, Japanese, and Spanish will take place every hour in classrooms two, three, and four. Please visit the information desk to receive your timetable and a discount voucher.",
    ],
    describePhotos: [teacher, coach],
    describeSamples: [
      "This picture shows a classroom. A teacher is standing in front of a chalkboard and writing something on it. The board is covered with notes, so she is probably explaining a lesson to her students.",
      "In this picture, a coach is talking to a group of young players on a sports field. The players are listening carefully, and some of them are holding a ball. It looks like a training session on a sunny day.",
    ],
    personalContext: "Imagine that a university is researching how adults learn new skills. You agree to answer some questions.",
    personalQs: [
      "What was the last new skill you learned, and when did you learn it?",
      "Do you prefer studying alone or in a group? Why?",
      "If you could take any course for free, what would you choose and why?",
    ],
    personalSamples: [
      "The last new skill I learned was basic video editing, about two months ago.",
      "I prefer studying in a group because we can explain things to each other and stay motivated.",
      "I would choose a course in data analysis. More and more jobs require data skills, and it would help me make better decisions at work. I also think it would be interesting to understand statistics in the news.",
    ],
    schedule: "Lakeside Language Institute - Summer Courses\n\nBusiness English  Mon & Wed 18:00-19:30  Ms. Grant  $240\nIELTS Preparation  Tue & Thu 18:00-20:00  Mr. Hale  $320\nJapanese Beginner  Sat 09:00-12:00  Ms. Sato  $200\nSpanish Conversation  Fri 17:00-18:30  (full)\nAll courses start July 1 - 8 weeks",
    scheduleQs: [
      "When does the Business English course meet, and who teaches it?",
      "I'd like to join the Spanish conversation class on Friday. Is that possible?",
      "I can only study on weekdays after six. Which courses could I take and how much do they cost?",
    ],
    scheduleSamples: [
      "Business English meets on Mondays and Wednesdays from six to seven thirty, and Ms. Grant teaches it.",
      "I'm sorry, but the Spanish conversation class is already full.",
      "You could take Business English on Monday and Wednesday evenings for 240 dollars, or IELTS Preparation on Tuesday and Thursday evenings for 320 dollars. Both start on July first and last eight weeks.",
    ],
    opinion: "Do you think online classes are as effective as classes in a traditional classroom? Give reasons and examples.",
    opinionSample: "I think online classes can be effective, but not for everyone. They are flexible and let learners replay lessons. However, many students lose concentration at home. For example, during the pandemic my younger brother found it hard to focus without a teacher in the room. So a mix of both is ideal.",
    pictures: [
      { photo: teacher, keys: "teacher / write", sample: "The teacher is writing an explanation on the chalkboard." },
      { photo: coach, keys: "coach / players", sample: "The coach is giving instructions to the players." },
      { photo: whiteboard, keys: "whiteboard / draw", sample: "A man is drawing a diagram on the whiteboard." },
      { photo: journalist, keys: "notes / during", sample: "The reporter is taking notes during the interview." },
      { photo: newspaper, keys: "man / read", sample: "The man is reading a newspaper while he relaxes." },
    ],
    emails: [
      { from: "Kevin Doyle", subject: "Course information", body: "I'm interested in your IELTS course. Could you tell me about the class size and whether there is a placement test?", task: "Write a reply that answers his TWO questions and gives ONE additional piece of information.", sample: "Dear Kevin,\n\nThank you for your interest in our IELTS course. Each class has a maximum of twelve students, so everyone gets plenty of speaking practice. Yes, there is a short free placement test, which you can take online before the course begins. In addition, students who enrol before June 15 receive a 10% discount.\n\nBest regards,\nAdmissions" },
      { from: "Head of Training", subject: "Training feedback", body: "We are planning next year's staff training program and would like your suggestions.", task: "Write a reply that suggests TWO topics and explains WHY each would be useful.", sample: "Dear Head of Training,\n\nThank you for asking for our opinions. First, I suggest a course on time management, because many staff struggle with deadlines during busy periods. Second, a workshop on presentation skills would help team leaders communicate results more clearly to clients. I believe both topics would improve our daily work.\n\nBest regards,\nMinh" },
    ],
    essay: "Some people think it is better for children to start learning a foreign language at primary school. Others think they should start at secondary school. Which do you prefer? Give reasons and examples.",
    essaySample: "Position: primary school. Body 1: young children imitate pronunciation easily. Body 2: more years of study lead to higher fluency. Body 3: concession - teachers must be well trained and lessons must be fun. Conclusion. 300+ words.",
  },
  // 07 - Media, arts & events
  {
    readAloud: [
      "Thank you for visiting the City Art Museum. The new photography exhibition, Faces of the Coast, is now open on the second floor. Guided tours start every hour, and visitors under eighteen can enter free of charge on weekends.",
      "Tonight on Channel Seven News, we report on the opening of the new concert hall downtown, interview local musicians, and bring you the latest weather forecast. Stay with us after the news for a special documentary about street food.",
    ],
    describePhotos: [stage, photographer],
    describeSamples: [
      "This picture shows a live music performance. A band is playing on a stage with bright colourful lights. The musician in the front is singing into a microphone, and the audience seems excited. It looks like an evening concert.",
      "In this picture, a photographer is holding a professional camera and taking a photo. He is looking through the lens carefully. He might be working at an event or doing a photo shoot outdoors.",
    ],
    personalContext: "Imagine that a media company is doing research about entertainment. You agree to a telephone interview.",
    personalQs: [
      "How often do you go to the cinema or watch films at home?",
      "What kind of music do you listen to most often? Why?",
      "Would you rather attend a live concert or watch it online? Explain your choice.",
    ],
    personalSamples: [
      "I watch films at home about twice a week, but I go to the cinema only once a month.",
      "I mostly listen to pop music because it is energetic and helps me concentrate when I study.",
      "I would rather attend a live concert. The atmosphere is exciting, and you can share the experience with thousands of fans. For example, when I saw my favourite band live, I remembered it for years, but I forget online videos quickly.",
    ],
    schedule: "City Art Festival - Saturday Programme\n\n10:00  Children's painting workshop - Hall A ($5)\n11:30  Photography talk - Ms. Reyes - Hall B (free)\n13:00  Street food market - Main square\n15:00  Jazz concert - Open-air stage (free)\n19:00  Film screening: 'The Long Road' - Hall B ($8)",
    scheduleQs: [
      "What time is the photography talk, and how much does it cost?",
      "The film screening is in Hall A, isn't it?",
      "Could you tell me about all the free events in the programme?",
    ],
    scheduleSamples: [
      "The photography talk with Ms. Reyes is at eleven thirty in Hall B, and it is free.",
      "No, the film screening is in Hall B at seven p.m., and tickets cost eight dollars.",
      "There are two free events: the photography talk at eleven thirty in Hall B, and the jazz concert at three o'clock on the open-air stage. The street food market is also open to everyone.",
    ],
    opinion: "Some people think governments should spend money on arts such as museums and theatres. Others think the money should go to other public services. What is your opinion?",
    opinionSample: "I think governments should continue to fund the arts. Museums and theatres protect culture and attract tourists, which brings money to cities. For example, a new museum in my city increased visitor numbers and helped small cafes nearby. However, essential services like hospitals should always come first.",
    pictures: [
      { photo: stage, keys: "band / perform", sample: "The band is performing on stage in front of an audience." },
      { photo: photographer, keys: "photographer / take", sample: "A photographer is taking pictures with a large camera." },
      { photo: artist, keys: "artist / paint", sample: "The artist is painting a picture on a canvas." },
      { photo: journalist, keys: "journalist / write", sample: "The journalist is writing notes in a notebook." },
      { photo: guide, keys: "guide / explain", sample: "The tour guide is explaining the history of the landmark." },
    ],
    emails: [
      { from: "Emma Clarke, Event Organizer", subject: "Photographer needed", body: "We are looking for a photographer for our company's anniversary party on November 22. Are you available, and what are your prices?", task: "Write a reply that answers her questions and asks TWO questions about the event.", sample: "Dear Ms. Clarke,\n\nThank you for contacting me. I am available on November 22. My price for an evening event is 450 dollars for four hours, including edited digital photos within one week. Could you tell me how many guests you expect and whether you would like group photos of the staff?\n\nBest regards,\nTom Hughes Photography" },
      { from: "Theatre Customer", subject: "Cancelled show", body: "I bought two tickets for Saturday's show, but I heard it has been cancelled. What should I do?", task: "Write a reply that CONFIRMS the situation and offers TWO options.", sample: "Dear Customer,\n\nI can confirm that Saturday's performance has been cancelled because the lead actor is ill. We apologize for the inconvenience. You can either exchange your tickets for the new performance on December 3, or receive a full refund to your credit card within five working days. Please reply to tell us which option you prefer.\n\nSincerely,\nBox Office" },
    ],
    essay: "Some people think that social media has a positive effect on the way people receive news. Others believe it has a negative effect. What is your opinion? Give specific reasons and examples.",
    essaySample: "Position: mixed but mainly negative/positive - choose one. Body 1: speed and access to breaking news. Body 2: spread of false information and filter bubbles. Body 3: suggestion - check several reliable sources. Conclusion. 300+ words.",
  },
  // 08 - Travel & aviation
  {
    readAloud: [
      "Good afternoon, passengers. Flight two-four-seven to Tokyo is now boarding at gate twelve. Passengers travelling with small children or needing extra assistance are invited to board first. Please have your boarding pass and passport ready.",
      "Welcome aboard Skybridge Airlines. Please make sure your seat belt is fastened and your bags are stored under the seat in front of you. Our flight time today is approximately two hours and forty minutes, and snacks will be served shortly after takeoff.",
    ],
    describePhotos: [passengers, pilot],
    describeSamples: [
      "This picture was taken at an airport or station. Several passengers are standing and looking at a departure board. Some of them are carrying bags, so they are probably checking their departure times. The place looks busy.",
      "In this picture, a pilot is sitting in the cockpit of an airplane. He is wearing a uniform and headphones, and he is checking the controls in front of him. He is probably preparing for takeoff.",
    ],
    personalContext: "Imagine that a travel agency is doing research about travel habits. You agree to answer some questions.",
    personalQs: [
      "When was the last time you travelled by plane, and where did you go?",
      "What do you usually do during a long journey?",
      "Do you prefer travelling with a tour group or planning a trip yourself? Why?",
    ],
    personalSamples: [
      "The last time I travelled by plane was in April, when I flew to Bangkok for a conference.",
      "During a long journey I usually listen to podcasts or read a book.",
      "I prefer planning my own trips. I can choose what I want to see and change my schedule freely. For example, on my last trip I stayed an extra day in a small town I loved, which would be impossible on a group tour.",
    ],
    schedule: "Business Trip Itinerary - Ms. Hana Lee (Seoul)\n\nMon 07:15  Flight SB102 Hanoi -> Seoul (arrive 13:30)\nMon 15:00  Check in - Grand Plaza Hotel\nTue 10:00  Meeting with Kwon Electronics\nWed 09:00  Factory visit (moved from Tue)\nWed 19:00  Dinner with clients - Han River Restaurant\nThu 16:40  Return flight SB103",
    scheduleQs: [
      "What time does my flight leave on Monday, and when do I arrive?",
      "The factory visit is on Tuesday, right?",
      "What do I have planned for Wednesday?",
    ],
    scheduleSamples: [
      "Your flight leaves at seven fifteen on Monday morning, and you arrive in Seoul at one thirty in the afternoon.",
      "Actually, the factory visit has been moved to Wednesday at nine a.m.",
      "On Wednesday you will visit the factory at nine in the morning, and in the evening you have dinner with clients at seven at the Han River Restaurant.",
    ],
    opinion: "Some companies are replacing business trips with video meetings. Do you think this is a good idea? Give reasons and examples.",
    opinionSample: "I think it is a good idea for most meetings. Video calls save money and time, and they are better for the environment. However, important first meetings with new partners are better face to face, because trust is easier to build in person. So companies should travel only when it really matters.",
    pictures: [
      { photo: passengers, keys: "passengers / board", sample: "The passengers are checking the departure board." },
      { photo: pilot, keys: "pilot / cockpit", sample: "The pilot is preparing for the flight in the cockpit." },
      { photo: hotel, keys: "clerk / hand", sample: "The hotel clerk is handing a key card to a guest." },
      { photo: guide, keys: "tour guide / group", sample: "A tour guide is showing a famous building to a group." },
      { photo: receptionist, keys: "receptionist / answer", sample: "The receptionist is answering a phone call at the front desk." },
    ],
    emails: [
      { from: "Travel Desk", subject: "Your trip to Seoul", body: "Your flight and hotel for next week are confirmed. Please let us know if you have any special requests.", task: "Write a reply that makes TWO requests and asks ONE question.", sample: "Dear Travel Desk,\n\nThank you for arranging my trip. I have two requests: could you book an aisle seat on both flights, and could the hotel provide a quiet room away from the elevator? Also, could you tell me whether airport transfer is included?\n\nBest regards,\nHana Lee" },
      { from: "Airline Customer Service", subject: "Lost luggage", body: "We are sorry that your suitcase did not arrive on flight SB102. Please describe your bag and tell us where to deliver it.", task: "Write a reply that DESCRIBES the suitcase, gives a delivery address, and asks ONE question.", sample: "Dear Customer Service,\n\nThank you for your message. My suitcase is a large dark blue hard case with a red name tag and a small scratch on the front. Please deliver it to the Grand Plaza Hotel, 25 Sejong Road, Room 1208. Could you tell me approximately when it will arrive, as I have an important meeting on Tuesday?\n\nSincerely,\nHana Lee" },
    ],
    essay: "Some people prefer to spend their holidays at home, while others prefer to travel abroad. Which do you prefer? Use specific reasons and examples.",
    essaySample: "Position: travel abroad (or home). Body 1: new cultures, food and languages broaden your mind. Body 2: travel gives a real break from routine. Body 3: concession - cost and stress; holidays at home are cheaper and relaxing. Conclusion. 300+ words.",
  },
  // 09 - Finance & banking
  {
    readAloud: [
      "Thank you for calling Westgate Bank. Our branches are now open on Saturdays from nine a.m. to one p.m. You can also open a savings account, transfer money, and pay bills twenty-four hours a day using our free mobile banking app.",
      "Attention, all employees. The annual budget meeting has been moved from Thursday to Friday at ten o'clock. Department managers should submit their spending reports by Wednesday afternoon so that the finance team has time to review them.",
    ],
    describePhotos: [teller, chart],
    describeSamples: [
      "This picture shows a bank. A bank teller is sitting behind a counter and counting money. She looks focused and professional. There is a computer next to her, so she may be processing a customer's transaction.",
      "In this picture, a group of colleagues is looking at a chart on a large screen. One person is pointing at the data, and the others are listening. They are probably discussing sales results in a meeting.",
    ],
    personalContext: "Imagine that a bank is doing research about how people manage money. You agree to a short interview.",
    personalQs: [
      "How often do you use a mobile banking app?",
      "Do you prefer paying with cash or by card? Why?",
      "What advice would you give a young person who has just started their first job about saving money?",
    ],
    personalSamples: [
      "I use my mobile banking app almost every day to check my balance and pay bills.",
      "I prefer paying by card because it is fast and I can track my spending easily.",
      "I would advise them to save a fixed amount, maybe ten percent of their salary, as soon as they receive it. They should also track their expenses for a few months so they understand where their money goes, and avoid buying expensive items on credit.",
    ],
    schedule: "Westgate Bank - Financial Planning Seminar (Sat, Nov 9)\n\n09:00  Registration & coffee\n09:30  Budgeting basics - Mr. Ford\n10:30  Saving for a home - Ms. Ali\n11:30  Investing for beginners - Mr. Ford\n12:30  One-to-one advice sessions (booking required)\nLocation: Westgate Tower, 5th floor",
    scheduleQs: [
      "Where is the seminar, and what time should I arrive?",
      "Ms. Ali is giving the talk on investing, correct?",
      "Which sessions does Mr. Ford lead, and what happens at the end?",
    ],
    scheduleSamples: [
      "The seminar is on the fifth floor of Westgate Tower. Registration starts at nine o'clock.",
      "Actually, Mr. Ford is giving the talk on investing at eleven thirty. Ms. Ali talks about saving for a home at ten thirty.",
      "Mr. Ford leads two sessions: Budgeting basics at nine thirty and Investing for beginners at eleven thirty. At the end, from twelve thirty, there are one-to-one advice sessions, but you need to book in advance.",
    ],
    opinion: "Some people think schools should teach students how to manage money. Do you agree? Give reasons and examples.",
    opinionSample: "I strongly agree. Many young people get into debt because they don't understand credit cards or interest. If schools teach budgeting, students will make better decisions. For example, my cousin learned to plan a monthly budget in a school project, and now she saves regularly.",
    pictures: [
      { photo: teller, keys: "money / count", sample: "The bank teller is counting money at the counter." },
      { photo: chart, keys: "chart / analyze", sample: "The colleagues are analyzing a chart on the screen." },
      { photo: pointing, keys: "point / display", sample: "A worker is pointing at information on the display." },
      { photo: typing, keys: "report / finish", sample: "The woman is finishing a report on her laptop." },
      { photo: clerk, keys: "receipt / give", sample: "The clerk is giving a receipt to the customer." },
    ],
    emails: [
      { from: "Westgate Bank", subject: "New savings account", body: "Thank you for your interest in our new savings account. Please let us know what questions you have.", task: "Write a reply that asks THREE questions about the account.", sample: "Dear Westgate Bank,\n\nThank you for your message. I am interested in the new savings account and have three questions. First, what is the current interest rate? Second, is there a minimum amount I need to deposit each month? Finally, can I withdraw money at any time without paying a fee?\n\nBest regards,\nAnh Tran" },
      { from: "Finance Manager", subject: "Reducing office costs", body: "Our office expenses increased by 15% this year. I would like each team to suggest ways to save money.", task: "Write a reply that suggests TWO ways to reduce costs and explains the benefit of each.", sample: "Dear Finance Manager,\n\nThank you for asking for our ideas. First, we could switch to digital documents instead of printing reports, which would reduce paper and ink costs significantly. Second, we could hold more meetings online rather than travelling to clients, saving both transport costs and staff time. I hope these suggestions are helpful.\n\nKind regards,\nSales Team" },
    ],
    essay: "Some people think it is better to save money for the future. Others think it is better to spend money and enjoy life now. Which view do you agree with? Give reasons and examples.",
    essaySample: "Position: balanced but leaning to saving. Body 1: savings protect against emergencies (illness, job loss). Body 2: long-term goals such as a home or education. Body 3: concession - enjoying experiences matters; set a monthly fun budget. Conclusion. 300+ words.",
  },
  // 10 - Technology & green business
  {
    readAloud: [
      "Thank you for choosing Nova Tech support. To reset your password, please visit our website and click on Forgot Password. If your device is still not working, restart it, check your internet connection, and then call us again.",
      "Starting this month, Green Valley Offices will introduce a new recycling program. Separate bins for paper, plastic, and glass are now located on every floor. Employees who have questions can contact the facilities team at extension four-five-two.",
    ],
    describePhotos: [scientist, gardener],
    describeSamples: [
      "This picture shows a laboratory. A scientist wearing a white coat is looking into a microscope. She seems to be examining a sample very carefully. There is other equipment on the bench, so she is probably doing research.",
      "In this picture, a gardener is trimming a hedge outside a building. He is using large garden tools and wearing work clothes. The plants look green and well looked after, and it seems to be a sunny day.",
    ],
    personalContext: "Imagine that a technology company is researching how people use their phones. You agree to a telephone interview.",
    personalQs: [
      "How many hours a day do you use your smartphone?",
      "Which app do you use most often, and what for?",
      "Do you think children should be allowed to have smartphones before age twelve? Explain.",
    ],
    personalSamples: [
      "I use my smartphone about four hours a day, mostly for work messages and news.",
      "I use a messaging app most often because I communicate with my team and family there.",
      "I don't think children under twelve need their own smartphones. They should spend more time playing outside and reading. However, a basic phone for calling parents can be useful for safety, so parents should set clear rules and time limits.",
    ],
    schedule: "Nova Tech - Product Launch Week\n\nMon 10:00  Press conference - Main hall\nTue 14:00  Hands-on demo for retailers - Room 210\nWed 09:00  Developer workshop - Online\nThu 11:00  Customer Q&A livestream (postponed to Fri 11:00)\nFri 16:00  Staff celebration - Rooftop",
    scheduleQs: [
      "When and where is the press conference?",
      "The customer Q&A livestream is on Thursday, isn't it?",
      "I'm a retailer. Which events are useful for me, and are any online?",
    ],
    scheduleSamples: [
      "The press conference is on Monday at ten o'clock in the main hall.",
      "Actually, it has been postponed to Friday at eleven o'clock.",
      "The hands-on demo for retailers on Tuesday at two in Room 210 is designed for you. If you prefer online events, the developer workshop on Wednesday at nine is online, and the customer Q&A livestream is on Friday at eleven.",
    ],
    opinion: "Should companies be required to reduce their energy use and pollution, even if this increases their costs? Give reasons and examples.",
    opinionSample: "Yes, I believe they should. Pollution harms public health and the climate, and companies are major energy users. Saving energy can also lower costs over time; for example, an office in my city installed solar panels and cut its electricity bill by thirty percent. Governments could offer tax benefits to help.",
    pictures: [
      { photo: scientist, keys: "microscope / look", sample: "The scientist is looking through a microscope." },
      { photo: gardener, keys: "gardener / trim", sample: "A gardener is trimming the hedge with large shears." },
      { photo: machine, keys: "machine / repair", sample: "A technician is repairing a machine in the factory." },
      { photo: mechanic, keys: "car / inspect", sample: "The mechanic is inspecting the engine of a car." },
      { photo: whiteboard, keys: "idea / present", sample: "The man is presenting his idea on a whiteboard." },
    ],
    emails: [
      { from: "Nova Tech Support", subject: "Your repair request", body: "We received your request to repair your laptop. Please describe the problem and tell us when you can bring it to our service center.", task: "Write a reply that DESCRIBES TWO problems and gives your availability.", sample: "Dear Nova Tech Support,\n\nThank you for your quick reply. My laptop has two problems: the battery lasts only about thirty minutes, and the keyboard sometimes stops working. I can bring it to your service center on Thursday afternoon after 2 P.M. or on Saturday morning. Please let me know which time is better.\n\nBest regards,\nLinh Pham" },
      { from: "Facilities Team", subject: "Recycling program feedback", body: "We have started a new recycling program. We would like to hear your opinion and any suggestions.", task: "Write a reply that gives ONE positive comment and TWO suggestions.", sample: "Dear Facilities Team,\n\nThank you for starting the recycling program. I think the clear labels on each bin are very helpful. However, I have two suggestions. First, please add bins in the kitchen, where most plastic waste is produced. Second, a short monthly email showing how much we recycle would motivate staff.\n\nKind regards,\nQuang" },
    ],
    essay: "Some people think that artificial intelligence will make our working lives easier. Others worry it will cause many people to lose their jobs. What is your opinion? Give specific reasons and examples.",
    essaySample: "Position: easier overall with retraining. Body 1: AI automates repetitive tasks (data entry, scheduling). Body 2: new jobs in AI maintenance, data and creative work. Body 3: concession - some jobs disappear; governments and companies must retrain workers. Conclusion. 300+ words.",
  },
];
