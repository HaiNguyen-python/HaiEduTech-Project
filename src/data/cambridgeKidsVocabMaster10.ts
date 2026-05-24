/**
 * @file cambridgeKidsVocabMaster10.ts
 * @description Additional Cambridge YLE vocabulary across all levels.
 */
import type { CambridgeKidsLevel, CambridgeKidsWord } from "./cambridgeKidsVocab";

type W = Required<Pick<CambridgeKidsWord, "word" | "vi" | "emoji" | "level" | "example" | "exampleVi">>;
const mk = (word: string, vi: string, emoji: string, level: CambridgeKidsLevel, example: string, exampleVi: string): W =>
  ({ word, vi, emoji, level, example, exampleVi });

export const CAMBRIDGE_KIDS_WORDS_MASTER_10: W[] = [
  // STARTERS
  mk("kite", "diều", "🪁", "Starters", "My kite flies high.", "Diều của em bay cao."),
  mk("drum", "cái trống", "🥁", "Starters", "I play the drum.", "Em chơi trống."),
  mk("snail", "ốc sên", "🐌", "Starters", "A snail moves slowly.", "Ốc sên di chuyển chậm."),
  mk("ladybug", "bọ rùa", "🐞", "Starters", "A ladybug is red.", "Bọ rùa màu đỏ."),
  mk("rainbow", "cầu vồng", "🌈", "Starters", "Look at the rainbow!", "Hãy nhìn cầu vồng kìa!"),
  mk("snow", "tuyết", "❄️", "Starters", "Snow is white and cold.", "Tuyết trắng và lạnh."),
  mk("sun", "mặt trời", "☀️", "Starters", "The sun is bright.", "Mặt trời rất sáng."),
  mk("moon", "mặt trăng", "🌙", "Starters", "The moon is round tonight.", "Đêm nay trăng tròn."),
  mk("star", "ngôi sao", "⭐", "Starters", "I see many stars.", "Em thấy nhiều ngôi sao."),
  mk("ice", "đá", "🧊", "Starters", "Ice is very cold.", "Đá rất lạnh."),
  mk("juice", "nước trái cây", "🧃", "Starters", "I drink orange juice.", "Em uống nước cam."),
  mk("milk", "sữa", "🥛", "Starters", "Drink your milk.", "Hãy uống sữa của em."),
  mk("pizza", "pizza", "🍕", "Starters", "Pizza is yummy.", "Pizza rất ngon."),
  mk("ice cream", "kem", "🍦", "Starters", "I love ice cream.", "Em thích kem."),

  // MOVERS
  mk("library", "thư viện", "📚", "Movers", "We read in the library.", "Chúng em đọc sách trong thư viện."),
  mk("hospital", "bệnh viện", "🏥", "Movers", "The hospital helps sick people.", "Bệnh viện giúp người bệnh."),
  mk("station", "trạm/ga", "🚉", "Movers", "We wait at the station.", "Chúng em chờ ở ga."),
  mk("village", "ngôi làng", "🏘️", "Movers", "Grandma lives in a village.", "Bà sống ở một ngôi làng."),
  mk("hill", "ngọn đồi", "⛰️", "Movers", "We climb the hill.", "Chúng em leo đồi."),
  mk("river", "dòng sông", "🌊", "Movers", "Fish live in the river.", "Cá sống ở sông."),
  mk("forest", "khu rừng", "🌲", "Movers", "The forest is green.", "Khu rừng xanh tươi."),
  mk("island", "hòn đảo", "🏝️", "Movers", "We visit a small island.", "Chúng em thăm một hòn đảo nhỏ."),
  mk("brave", "dũng cảm", "🦁", "Movers", "He is a brave boy.", "Cậu ấy là một cậu bé dũng cảm."),
  mk("clever", "thông minh", "🧠", "Movers", "She is clever at maths.", "Bạn ấy giỏi toán."),
  mk("quiet", "yên tĩnh", "🤫", "Movers", "Please be quiet.", "Hãy im lặng."),
  mk("noisy", "ồn ào", "📢", "Movers", "The market is noisy.", "Chợ rất ồn."),

  // FLYERS
  mk("adventure", "cuộc phiêu lưu", "🗺️", "Flyers", "We had a great adventure.", "Chúng em có cuộc phiêu lưu tuyệt vời."),
  mk("treasure", "kho báu", "💎", "Flyers", "Pirates look for treasure.", "Cướp biển tìm kho báu."),
  mk("journey", "hành trình", "✈️", "Flyers", "The journey was long.", "Hành trình rất dài."),
  mk("imagine", "tưởng tượng", "💭", "Flyers", "Imagine a flying car.", "Hãy tưởng tượng một chiếc ô tô bay."),
  mk("invent", "phát minh", "🧪", "Flyers", "She wants to invent a robot.", "Bạn ấy muốn phát minh một con robot."),
  mk("discover", "khám phá", "🔍", "Flyers", "We discover new ideas.", "Chúng em khám phá ý tưởng mới."),
  mk("explore", "thám hiểm", "🧭", "Flyers", "Let's explore the cave.", "Cùng thám hiểm hang động."),
  mk("environment", "môi trường", "🌍", "Flyers", "We protect our environment.", "Chúng em bảo vệ môi trường."),
  mk("recycle", "tái chế", "♻️", "Flyers", "We recycle paper at school.", "Chúng em tái chế giấy ở trường."),

  // KET
  mk("appointment", "cuộc hẹn", "📅", "KET", "I have an appointment at 3pm.", "Em có hẹn lúc 3 giờ chiều."),
  mk("instructions", "hướng dẫn", "📋", "KET", "Read the instructions carefully.", "Hãy đọc hướng dẫn cẩn thận."),
  mk("opportunity", "cơ hội", "🎯", "KET", "It's a great opportunity to learn.", "Đây là cơ hội học hỏi tuyệt vời."),
  mk("recommend", "giới thiệu", "👍", "KET", "I recommend this book.", "Em giới thiệu cuốn sách này."),
  mk("organise", "tổ chức", "🗂️", "KET", "Let's organise the party.", "Hãy cùng tổ chức bữa tiệc."),
  mk("celebrate", "kỷ niệm", "🎉", "KET", "We celebrate her birthday.", "Chúng em kỷ niệm sinh nhật bạn ấy."),
  mk("complain", "phàn nàn", "😠", "KET", "Don't complain about small things.", "Đừng phàn nàn chuyện nhỏ."),
  mk("describe", "mô tả", "✏️", "KET", "Can you describe the picture?", "Bạn có thể mô tả bức tranh không?"),

  // PET
  mk("achievement", "thành tựu", "🏅", "PET", "Winning was a big achievement.", "Chiến thắng là một thành tựu lớn."),
  mk("argument", "tranh luận", "💬", "PET", "They had a small argument.", "Họ có một cuộc tranh luận nhỏ."),
  mk("benefit", "lợi ích", "✅", "PET", "Exercise has many benefits.", "Tập thể dục có nhiều lợi ích."),
  mk("courage", "lòng dũng cảm", "🛡️", "PET", "She showed great courage.", "Bạn ấy thể hiện lòng dũng cảm."),
  mk("determined", "quyết tâm", "💪", "PET", "He is determined to win.", "Anh ấy quyết tâm chiến thắng."),
  mk("influence", "ảnh hưởng", "🔗", "PET", "Friends influence our choices.", "Bạn bè ảnh hưởng đến lựa chọn của ta."),
  mk("solution", "giải pháp", "💡", "PET", "We found a clever solution.", "Chúng em tìm ra giải pháp thông minh."),
  mk("respect", "tôn trọng", "🙏", "PET", "We respect our teachers.", "Chúng em tôn trọng thầy cô."),
  mk("responsible", "có trách nhiệm", "👔", "PET", "Be responsible for your work.", "Hãy có trách nhiệm với công việc."),
  mk("opportunity", "cơ hội", "🌟", "PET", "Travel is a great opportunity.", "Du lịch là cơ hội tuyệt vời."),
];
