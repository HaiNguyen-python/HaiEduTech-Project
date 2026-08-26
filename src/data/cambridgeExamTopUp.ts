/**
 * @file cambridgeExamTopUp.ts
 * @description The newest Cambridge papers (Flyers 16-20, KET 16-20, PET 17-21)
 *              were authored with 15 Reading & Writing items, while the official
 *              shape used by the equalizer is 18 (Flyers), 20 (KET) and 21 (PET).
 *              Unequal counts inside one level make best-score percentages
 *              incomparable, which distorts the CEFR chart. This module adds the
 *              missing on-topic Reading & Writing items before the equalizer runs.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import type { CambridgeMockExam, CambridgeMockQuestion } from "./cambridgeMockExamData";

/** question, options, correct index, explanation EN, explanation VI */
type Extra = [string, string[], number, string, string];

const EXTRA_RW: Record<string, Extra[]> = {
  /* ---------------- FLYERS: +3 each ---------------- */
  "cambridge-flyers-16": [
    ["Scientists write what they see in a ___.", ["recipe", "report", "poem", "letter"], 1, "Observations go into a report.", "Những gì quan sát được viết vào bản báo cáo."],
    ["We ___ the plants every second day.", ["water", "waters", "watering", "watered yesterday and tomorrow"], 0, "With 'we' the present simple is 'water'.", "Với 'we' thì hiện tại đơn là 'water'."],
    ["A machine that shows wind speed is at the weather ___.", ["station", "shop", "school", "kitchen"], 0, "It is part of the weather station.", "Nó thuộc trạm khí tượng."],
  ],
  "cambridge-flyers-17": [
    ["The Earth ___ around the Sun.", ["move", "moves", "moved", "moving"], 1, "'The Earth' is singular, so we use 'moves'.", "'The Earth' là số ít nên dùng 'moves'."],
    ["A person who travels into space is an ___.", ["engineer", "astronaut", "athlete", "artist"], 1, "An astronaut travels into space.", "Nhà du hành vũ trụ là người bay vào không gian."],
    ["Mars looks red because of ___ in the dust.", ["ice", "iron", "grass", "smoke"], 1, "Iron in the dust makes the ground look red.", "Sắt trong lớp bụi làm mặt đất trông đỏ."],
  ],
  "cambridge-flyers-18": [
    ["You wait for a train at a ___.", ["station", "garage", "market", "museum"], 0, "Trains stop at a station.", "Tàu dừng ở nhà ga."],
    ["The streets are ___ than in my village.", ["busy", "busier", "busiest", "most busy"], 1, "'Than' needs the comparative 'busier'.", "Có 'than' nên dùng so sánh hơn 'busier'."],
    ["Please cross the road at the ___.", ["corner shop", "zebra crossing", "bus seat", "traffic jam"], 1, "You cross safely at a zebra crossing.", "Bạn qua đường an toàn ở vạch kẻ dành cho người đi bộ."],
  ],
  "cambridge-flyers-19": [
    ["Fruit and vegetables are ___ for you.", ["healthy", "dangerous", "noisy", "expensive"], 0, "Fruit and vegetables are healthy food.", "Trái cây và rau củ là thức ăn tốt cho sức khỏe."],
    ["I always ___ my teeth before bed.", ["brush", "wash", "cut", "wear"], 0, "We brush our teeth.", "Chúng ta đánh răng."],
    ["Children need about nine hours of ___ every night.", ["sleep", "homework", "sport", "sugar"], 0, "Children need nine hours of sleep.", "Trẻ em cần khoảng chín giờ ngủ."],
  ],
  "cambridge-flyers-20": [
    ["When it rains hard we take an ___.", ["umbrella", "apron", "envelope", "onion"], 0, "An umbrella keeps the rain off.", "Cái dù giúp che mưa."],
    ["In winter the weather is often ___.", ["hot", "cold", "sunny all day", "dry and dusty"], 1, "Winter weather is cold.", "Thời tiết mùa đông thì lạnh."],
    ["Yesterday it ___ all afternoon.", ["snow", "snows", "snowed", "snowing"], 2, "'Yesterday' needs the past simple 'snowed'.", "Có 'yesterday' nên dùng quá khứ đơn 'snowed'."],
  ],

  /* ---------------- KET: +5 each ---------------- */
  "cambridge-ket-16": [
    ["I earn some money by ___ dogs after school.", ["walk", "walking", "walked", "to walking"], 1, "After 'by' we use the -ing form.", "Sau 'by' dùng dạng -ing."],
    ["A person who serves customers in a cafe is a ___.", ["waiter", "driver", "farmer", "painter"], 0, "A waiter serves customers.", "Người phục vụ khách trong quán cà phê là waiter."],
    ["She works ___ Saturdays only.", ["in", "at", "on", "of"], 2, "We use 'on' with days.", "Dùng 'on' với các ngày trong tuần."],
    ["My first job ___ hard but interesting.", ["is", "was", "were", "been"], 1, "'My first job' in the past takes 'was'.", "Nói về quá khứ với chủ ngữ số ít nên dùng 'was'."],
    ["Money you get for your work is your ___.", ["ticket", "salary", "receipt", "hobby"], 1, "Money for work is a salary.", "Tiền nhận được cho công việc là tiền lương."],
  ],
  "cambridge-ket-17": [
    ["We ___ to Da Nang next Friday.", ["fly", "are flying", "flew", "have flown"], 1, "A fixed future plan uses the present continuous.", "Kế hoạch tương lai đã định dùng hiện tại tiếp diễn."],
    ["You need a ___ to travel to another country.", ["passport", "postcard", "poster", "password"], 0, "A passport is needed to travel abroad.", "Cần hộ chiếu để đi nước khác."],
    ["The hotel is ___ the beach.", ["next", "close to", "far", "between"], 1, "'Close to' means near.", "'Close to' nghĩa là gần."],
    ["How ___ does the train ticket cost?", ["many", "much", "long", "often"], 1, "'Money' is uncountable, so we ask 'how much'.", "Tiền là không đếm được nên hỏi 'how much'."],
    ["We stayed in a small ___ near the airport.", ["guesthouse", "greenhouse", "warehouse", "lighthouse"], 0, "Travellers sleep in a guesthouse.", "Khách du lịch ngủ ở nhà nghỉ."],
  ],
  "cambridge-ket-18": [
    ["I bought these shoes ___ the internet.", ["in", "at", "on", "by"], 2, "We buy things 'on the internet'.", "Chúng ta mua hàng 'on the internet'."],
    ["If the size is wrong, you can ___ the item.", ["return", "repeat", "remove", "repair"], 0, "You return an item that does not fit.", "Bạn trả lại món hàng không đúng cỡ."],
    ["The parcel ___ yesterday morning.", ["arrive", "arrives", "arrived", "arriving"], 2, "'Yesterday' needs the past simple.", "Có 'yesterday' nên dùng quá khứ đơn."],
    ["Paper you get after paying is a ___.", ["receipt", "recipe", "report", "ribbon"], 0, "A receipt proves you paid.", "Hóa đơn chứng minh bạn đã trả tiền."],
    ["This shop has ___ prices than the one in town.", ["cheap", "cheaper", "cheapest", "more cheap"], 1, "'Than' needs the comparative 'cheaper'.", "Có 'than' nên dùng so sánh hơn 'cheaper'."],
  ],
  "cambridge-ket-19": [
    ["The concert ___ at eight o'clock.", ["start", "starts", "starting", "started tomorrow"], 1, "A timetable uses the present simple 'starts'.", "Lịch trình dùng hiện tại đơn 'starts'."],
    ["A group of people who play music together is a ___.", ["band", "team", "class", "crowd"], 0, "Musicians play in a band.", "Những người chơi nhạc cùng nhau gọi là band."],
    ["I play the guitar, but I ___ sing well.", ["can", "cannot", "must", "should not"], 1, "The contrast with 'but' needs 'cannot'.", "Sự đối lập với 'but' cần 'cannot'."],
    ["We listened ___ the new song twice.", ["at", "to", "for", "on"], 1, "We listen 'to' something.", "Chúng ta 'listen to' cái gì đó."],
    ["The person who sings in front of the band is the ___.", ["singer", "sender", "seller", "swimmer"], 0, "The singer sings in front of the band.", "Người hát trước ban nhạc là ca sĩ."],
  ],
  "cambridge-ket-20": [
    ["People who help without money are ___.", ["volunteers", "visitors", "vets", "victims"], 0, "Volunteers help without pay.", "Tình nguyện viên giúp đỡ mà không nhận tiền."],
    ["We collected clothes ___ the families in the village.", ["for", "of", "about", "from"], 0, "We collect things 'for' people.", "Chúng ta quyên góp 'for' ai đó."],
    ["Last Sunday we ___ the park with our class.", ["clean", "cleans", "cleaned", "cleaning"], 2, "'Last Sunday' needs the past simple 'cleaned'.", "Có 'last Sunday' nên dùng quá khứ đơn 'cleaned'."],
    ["Would you like ___ us next weekend?", ["join", "joining", "to join", "joined"], 2, "'Would you like' takes 'to join'.", "'Would you like' đi với 'to join'."],
    ["Giving money to help others is a ___.", ["donation", "decision", "direction", "discussion"], 0, "Money given to help is a donation.", "Tiền cho đi để giúp đỡ gọi là khoản quyên góp."],
  ],

  /* ---------------- PET: +6 each ---------------- */
  "cambridge-pet-17": [
    ["Students ___ used tablets in class since last year.", ["are", "have", "had", "were"], 1, "'Since last year' needs the present perfect 'have used'.", "Có 'since last year' nên dùng hiện tại hoàn thành 'have used'."],
    ["The app is easy to use, ___ it saves a lot of time.", ["although", "so", "unless", "despite"], 1, "'So' shows the result.", "'So' diễn tả kết quả."],
    ["Please ___ the file before you close the program.", ["safe", "save", "serve", "solve"], 1, "You save a file.", "Bạn lưu tệp lại."],
    ["Technology can be useful ___ students use it carefully.", ["unless", "if", "however", "instead"], 1, "'If' introduces the condition.", "'If' mở đầu điều kiện."],
    ["A short online lesson video is called a ___.", ["tutorial", "tunnel", "textbook", "timetable"], 0, "A teaching video is a tutorial.", "Video hướng dẫn gọi là tutorial."],
    ["The teacher suggested ___ notes by hand as well.", ["take", "taking", "to take", "took"], 1, "'Suggest' is followed by the -ing form.", "'Suggest' đi với dạng -ing."],
  ],
  "cambridge-pet-18": [
    ["He trains every day ___ he wants to win the race.", ["because", "although", "unless", "while"], 0, "'Because' gives the reason.", "'Because' nêu lý do."],
    ["If she ___ harder, she would improve faster.", ["train", "trains", "trained", "training"], 2, "The second conditional uses the past simple.", "Câu điều kiện loại hai dùng quá khứ đơn."],
    ["A feeling that makes you keep trying is ___.", ["motivation", "invitation", "information", "imagination"], 0, "Motivation keeps you trying.", "Động lực giúp bạn tiếp tục cố gắng."],
    ["The team lost, ___ the players were proud of the match.", ["so", "but", "because", "unless"], 1, "'But' shows the contrast.", "'But' thể hiện sự đối lập."],
    ["Warming up helps you ___ injuries.", ["avoid", "affect", "allow", "attend"], 0, "Warming up helps you avoid injuries.", "Khởi động giúp bạn tránh chấn thương."],
    ["She is used ___ early in the morning.", ["run", "to run", "to running", "running to"], 2, "'Be used to' is followed by the -ing form.", "'Be used to' đi với dạng -ing."],
  ],
  "cambridge-pet-19": [
    ["This dish ___ with rice and fresh herbs.", ["serves", "is served", "serving", "has serve"], 1, "The passive 'is served' fits the dish.", "Câu bị động 'is served' phù hợp với món ăn."],
    ["Food that comes from the local area is ___.", ["local", "loyal", "lonely", "legal"], 0, "Food from the area is local.", "Thực phẩm của vùng đó gọi là local."],
    ["I would rather ___ at home than eat out.", ["cook", "cooking", "to cook", "cooked"], 0, "'Would rather' takes the bare infinitive.", "'Would rather' đi với động từ nguyên mẫu không 'to'."],
    ["The soup tastes ___ salty for me.", ["too", "enough", "such", "very much"], 0, "'Too salty' means more than you want.", "'Too salty' nghĩa là mặn quá mức mong muốn."],
    ["A list of dishes in a restaurant is a ___.", ["menu", "medal", "manual", "message"], 0, "The list of dishes is the menu.", "Danh sách món ăn là thực đơn."],
    ["Street food is popular ___ it is quick and cheap.", ["although", "because", "unless", "however"], 1, "'Because' gives the reason.", "'Because' nêu lý do."],
  ],
  "cambridge-pet-20": [
    ["We should ___ less water when we wash up.", ["waste", "wear", "warn", "weigh"], 0, "We should waste less water.", "Chúng ta nên làm hao ít nước hơn."],
    ["Glass and paper can be ___.", ["recycled", "reminded", "replied", "repeated"], 0, "Glass and paper are recycled.", "Thủy tinh và giấy có thể được tái chế."],
    ["Turn off the lights ___ you leave the room.", ["unless", "when", "although", "so that"], 1, "'When' fits the time clause.", "'When' phù hợp với mệnh đề thời gian."],
    ["If everybody helped, our street ___ much cleaner.", ["is", "was", "would be", "will being"], 2, "The second conditional uses 'would be'.", "Câu điều kiện loại hai dùng 'would be'."],
    ["Energy from the sun is called ___ energy.", ["solar", "social", "single", "silent"], 0, "Energy from the sun is solar energy.", "Năng lượng từ mặt trời là năng lượng mặt trời."],
    ["Using a cloth bag ___ plastic waste.", ["reduces", "raises", "returns", "repairs"], 0, "A cloth bag reduces plastic waste.", "Túi vải làm giảm rác nhựa."],
  ],
  "cambridge-pet-21": [
    ["Too much screen time can ___ your concentration.", ["affect", "effect", "afford", "offer"], 0, "The verb is 'affect'.", "Động từ đúng là 'affect'."],
    ["He kept checking his phone ___ the film.", ["while", "during", "when", "meanwhile"], 1, "'During' comes before a noun.", "'During' đứng trước danh từ."],
    ["News that is not true is called ___ news.", ["fake", "final", "formal", "future"], 0, "Untrue news is fake news.", "Tin không đúng gọi là tin giả."],
    ["I wish I ___ less time on social media.", ["spend", "spent", "will spend", "spending"], 1, "'I wish' about now uses the past simple.", "'I wish' nói về hiện tại dùng quá khứ đơn."],
    ["She turned off notifications ___ concentrate better.", ["for", "to", "so", "because"], 1, "'To' expresses purpose.", "'To' diễn tả mục đích."],
    ["Reading long articles ___ your attention span.", ["trains", "trainers", "training", "trained soon"], 0, "The present simple 'trains' fits the general fact.", "Sự thật chung dùng hiện tại đơn 'trains'."],
  ],
};

/** Insert the missing Reading & Writing items and renumber the whole paper. */
export const withCambridgeExamTopUp = (exam: CambridgeMockExam): CambridgeMockExam => {
  const extras = EXTRA_RW[exam.id];
  if (!extras || extras.length === 0) return exam;

  const reading = exam.questions.filter((q) => q.section === "Reading & Writing");
  const listening = exam.questions.filter((q) => q.section !== "Reading & Writing");

  const added: CambridgeMockQuestion[] = extras.map((e, i) => ({
    id: reading.length + i + 1,
    section: "Reading & Writing" as const,
    question: e[0],
    options: e[1],
    correctAnswer: e[2],
    explanation: e[3],
    explanationVi: e[4],
  }));

  const questions = [...reading, ...added, ...listening].map((q, i) => ({ ...q, id: i + 1 }));
  return { ...exam, questions, totalQuestions: questions.length };
};
