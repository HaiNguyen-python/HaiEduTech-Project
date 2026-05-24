/**
 * @file cambridgeKidsExamples.ts
 * @description Provides example sentences (English + Vietnamese) for each
 * Cambridge YLE vocabulary word. Curated map for common kid-friendly words,
 * with sensible template fallbacks based on simple part-of-speech heuristics.
 */
import type { CambridgeKidsWord } from "./cambridgeKidsVocab";

// Hand-picked examples (kid-friendly, level-appropriate).
const CURATED: Record<string, { en: string; vi: string }> = {
  apple: { en: "I eat a red apple every day.", vi: "Mỗi ngày em ăn một quả táo đỏ." },
  banana: { en: "The monkey loves bananas.", vi: "Chú khỉ rất thích chuối." },
  cat: { en: "My cat sleeps on the sofa.", vi: "Con mèo của em ngủ trên ghế sofa." },
  dog: { en: "The dog runs in the park.", vi: "Con chó chạy trong công viên." },
  elephant: { en: "An elephant has a long trunk.", vi: "Con voi có chiếc vòi dài." },
  fish: { en: "Fish swim in the sea.", vi: "Cá bơi trong biển." },
  girl: { en: "The girl is reading a book.", vi: "Bạn nữ đang đọc sách." },
  boy: { en: "The boy is playing football.", vi: "Bạn nam đang đá bóng." },
  house: { en: "My house is big and warm.", vi: "Nhà của em to và ấm áp." },
  "ice cream": { en: "I want a chocolate ice cream.", vi: "Em muốn ăn một cây kem sô-cô-la." },
  jump: { en: "Frogs can jump very high.", vi: "Con ếch có thể nhảy rất cao." },
  kite: { en: "We fly a kite on windy days.", vi: "Chúng em thả diều vào ngày có gió." },
  lion: { en: "The lion is the king of the jungle.", vi: "Sư tử là chúa tể rừng xanh." },
  monkey: { en: "The monkey eats a banana.", vi: "Con khỉ ăn một quả chuối." },
  nose: { en: "I can smell with my nose.", vi: "Em có thể ngửi bằng mũi." },
  orange: { en: "Orange juice is sweet.", vi: "Nước cam rất ngọt." },
  pen: { en: "I write with a blue pen.", vi: "Em viết bằng bút màu xanh." },
  queen: { en: "The queen lives in a castle.", vi: "Nữ hoàng sống trong lâu đài." },
  rabbit: { en: "A rabbit likes carrots.", vi: "Con thỏ thích cà rốt." },
  sun: { en: "The sun is shining today.", vi: "Hôm nay trời nắng." },
  tree: { en: "The bird sits on the tree.", vi: "Con chim đậu trên cây." },
  ball: { en: "Let's play with the ball!", vi: "Cùng chơi bóng nào!" },
  bed: { en: "I sleep in my bed at night.", vi: "Em ngủ trên giường vào buổi tối." },
  bird: { en: "A small bird is singing.", vi: "Một chú chim nhỏ đang hót." },
  book: { en: "I read a story book.", vi: "Em đọc một cuốn truyện." },
  car: { en: "Dad drives a red car.", vi: "Bố lái một chiếc xe màu đỏ." },
  chair: { en: "Sit on the chair, please.", vi: "Mời bạn ngồi trên ghế." },
  cow: { en: "The cow gives us milk.", vi: "Con bò cho chúng ta sữa." },
  duck: { en: "Ducks swim on the pond.", vi: "Vịt bơi trên ao." },
  egg: { en: "I eat an egg for breakfast.", vi: "Em ăn một quả trứng vào bữa sáng." },
  eye: { en: "Close your eyes and rest.", vi: "Hãy nhắm mắt lại và nghỉ ngơi." },
  fox: { en: "The fox is clever.", vi: "Con cáo rất thông minh." },
  frog: { en: "The green frog jumps high.", vi: "Con ếch xanh nhảy cao." },
  grape: { en: "Grapes are sweet and small.", vi: "Quả nho ngọt và nhỏ." },
  hand: { en: "Wash your hands before eating.", vi: "Rửa tay trước khi ăn." },
  hat: { en: "I wear a hat when it's sunny.", vi: "Em đội mũ khi trời nắng." },
  horse: { en: "The horse runs very fast.", vi: "Con ngựa chạy rất nhanh." },
  ice: { en: "Ice is cold and slippery.", vi: "Băng thì lạnh và trơn." },
  key: { en: "Where is the door key?", vi: "Chìa khoá cửa ở đâu?" },
  leg: { en: "I have two legs.", vi: "Em có hai chân." },
  milk: { en: "I drink milk every morning.", vi: "Em uống sữa mỗi sáng." },
  moon: { en: "The moon is bright tonight.", vi: "Tối nay trăng rất sáng." },
  mouth: { en: "Open your mouth and say 'aah'.", vi: "Hãy há miệng và nói 'a'." },
  pig: { en: "The pig is pink and fat.", vi: "Con lợn màu hồng và mập." },
  pizza: { en: "We share a big pizza.", vi: "Chúng ta chia nhau cái pizza to." },
  red: { en: "I like the red flower.", vi: "Em thích bông hoa màu đỏ." },
  blue: { en: "The sky is blue today.", vi: "Hôm nay bầu trời xanh." },
  green: { en: "Leaves are green in summer.", vi: "Lá cây màu xanh vào mùa hè." },
  yellow: { en: "Bananas are yellow.", vi: "Chuối có màu vàng." },
  school: { en: "I go to school by bus.", vi: "Em đi học bằng xe buýt." },
  shoe: { en: "Put on your shoes, please.", vi: "Làm ơn đi giày vào." },
  star: { en: "Stars shine in the night sky.", vi: "Sao chiếu sáng trên bầu trời đêm." },
  table: { en: "Dinner is on the table.", vi: "Bữa tối đã có trên bàn." },
  toy: { en: "This toy is my favourite.", vi: "Món đồ chơi này là yêu thích của em." },
  water: { en: "Drink lots of water every day.", vi: "Hãy uống nhiều nước mỗi ngày." },
  rainbow: { en: "A rainbow has seven colours.", vi: "Cầu vồng có bảy màu." },
  butterfly: { en: "A butterfly flies in the garden.", vi: "Một con bướm bay trong vườn." },
  castle: { en: "The princess lives in a castle.", vi: "Công chúa sống trong lâu đài." },
  dragon: { en: "The dragon can breathe fire.", vi: "Con rồng có thể phun lửa." },
  rocket: { en: "The rocket flies to the moon.", vi: "Tên lửa bay lên mặt trăng." },
  robot: { en: "My robot can dance!", vi: "Robot của em biết nhảy!" },
  dinosaur: { en: "Dinosaurs lived long ago.", vi: "Khủng long sống cách đây rất lâu." },
  astronaut: { en: "An astronaut works in space.", vi: "Phi hành gia làm việc trong vũ trụ." },
  hospital: { en: "Doctors work in the hospital.", vi: "Bác sĩ làm việc trong bệnh viện." },
  museum: { en: "We visit the museum on Sunday.", vi: "Chúng em đi bảo tàng vào Chủ nhật." },
  delicious: { en: "This cake is delicious!", vi: "Cái bánh này rất ngon!" },
  exciting: { en: "The film was very exciting.", vi: "Bộ phim rất hấp dẫn." },
  favourite: { en: "Pizza is my favourite food.", vi: "Pizza là món em yêu thích nhất." },
  friendly: { en: "My neighbour is very friendly.", vi: "Hàng xóm của em rất thân thiện." },
  healthy: { en: "Vegetables keep us healthy.", vi: "Rau xanh giúp chúng ta khoẻ mạnh." },
  imagine: { en: "Imagine you can fly!", vi: "Hãy tưởng tượng bạn có thể bay!" },
  achievement: { en: "Winning was a great achievement.", vi: "Chiến thắng là một thành tựu lớn." },
  challenge: { en: "Learning English is a fun challenge.", vi: "Học tiếng Anh là một thử thách thú vị." },
  environment: { en: "We must protect the environment.", vi: "Chúng ta phải bảo vệ môi trường." },
  opportunity: { en: "This is a great opportunity to learn.", vi: "Đây là một cơ hội tuyệt vời để học." },
  technology: { en: "Technology helps us every day.", vi: "Công nghệ giúp chúng ta mỗi ngày." },
  volunteer: { en: "I volunteer at the library.", vi: "Em làm tình nguyện ở thư viện." },
};

const VERBS = new Set([
  "jump","borrow","celebrate","remember","decide","describe","compare","explain","imagine","improve","introduce",
  "promise","recommend","share","argue","arrange","believe","explore","afford","discover","develop","donate",
  "encourage","appreciate","concentrate",
]);

const ADJECTIVES = new Set([
  "delicious","exciting","favourite","friendly","healthy","popular","famous","modern","polite","comfortable","careful",
  "successful","important","creative","anxious","independent","negative","responsible",
]);

const titleCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const getExample = (w: CambridgeKidsWord): { en: string; vi: string } => {
  if (w.example && w.exampleVi) return { en: w.example, vi: w.exampleVi };
  const key = w.word.toLowerCase();
  if (CURATED[key]) return CURATED[key];

  if (VERBS.has(key)) {
    return { en: `I like to ${key} every day.`, vi: `Em thích ${w.vi} mỗi ngày.` };
  }
  if (ADJECTIVES.has(key)) {
    return { en: `This is a ${key} idea.`, vi: `Đây là một ý tưởng ${w.vi}.` };
  }
  const article = /^[aeiou]/i.test(w.word) ? "an" : "a";
  return {
    en: `${titleCase(article)} ${w.word} can be amazing!`,
    vi: `${titleCase(w.vi)} thật tuyệt vời!`,
  };
};
