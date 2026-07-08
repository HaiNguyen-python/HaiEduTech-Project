// Swedish Speaking Coach — expansion 4: 2 new themes (B1 travel + B2 climate)
// 20 new sentences with authentic vocabulary, natural word order, and cultural
// context (SL kort, klimatomställning, kollektivtrafik).
import type { SpeakingTheme } from "./speakingCoachData";

const b1Travel: SpeakingTheme = {
  id: "sv-travel-transport", name: "Resa & kollektivtrafik", nameVi: "Du lịch & giao thông công cộng", icon: "🚆", level: "B1",
  sentences: [
    { id: "sv-tt1", text: "Jag åker tåg från Stockholm till Göteborg nästa fredag.", translation: "Tôi đi tàu từ Stockholm đến Göteborg thứ Sáu tới.", difficulty: "medium", theme: "travel" },
    { id: "sv-tt2", text: "Var kan jag köpa ett SL-kort för hela månaden?", translation: "Tôi có thể mua vé tháng SL ở đâu?", difficulty: "medium", theme: "travel" },
    { id: "sv-tt3", text: "Bussen är försenad på grund av vägarbete.", translation: "Xe buýt trễ do đang thi công đường.", difficulty: "medium", theme: "travel" },
    { id: "sv-tt4", text: "Jag föredrar att cykla när vädret är fint.", translation: "Tôi thích đạp xe khi trời đẹp.", difficulty: "medium", theme: "travel" },
    { id: "sv-tt5", text: "Kan du visa mig vägen till närmaste tunnelbanestation?", translation: "Bạn chỉ giúp tôi đường tới ga tàu điện ngầm gần nhất được không?", difficulty: "medium", theme: "travel" },
    { id: "sv-tt6", text: "Vi bytte tåg i Malmö och kom fram sent på kvällen.", translation: "Chúng tôi đổi tàu ở Malmö và đến nơi lúc khuya.", difficulty: "medium", theme: "travel" },
    { id: "sv-tt7", text: "Har den här bussen wifi och laddare vid sätena?", translation: "Xe buýt này có wifi và sạc ở ghế không?", difficulty: "medium", theme: "travel" },
    { id: "sv-tt8", text: "Jag glömde min biljett hemma, vad ska jag göra?", translation: "Tôi để quên vé ở nhà, tôi nên làm gì?", difficulty: "medium", theme: "travel" },
    { id: "sv-tt9", text: "På sommaren tar många svenskar tåget till fjällen.", translation: "Mùa hè nhiều người Thụy Điển đi tàu lên vùng núi.", difficulty: "medium", theme: "travel" },
    { id: "sv-tt10", text: "Kollektivtrafiken i Sverige är oftast pålitlig men ganska dyr.", translation: "Giao thông công cộng ở Thụy Điển thường tin cậy nhưng khá đắt.", difficulty: "medium", theme: "travel" },
  ],
};

const b2Climate: SpeakingTheme = {
  id: "sv-climate", name: "Klimat & miljö", nameVi: "Khí hậu & môi trường", icon: "🌍", level: "B2",
  sentences: [
    { id: "sv-cl1", text: "Klimatförändringarna påverkar redan svenska vintrar tydligt.", translation: "Biến đổi khí hậu đã rõ rệt ảnh hưởng đến mùa đông Thụy Điển.", difficulty: "hard", theme: "environment" },
    { id: "sv-cl2", text: "Vi måste minska våra utsläpp av växthusgaser drastiskt.", translation: "Chúng ta phải giảm mạnh phát thải khí nhà kính.", difficulty: "hard", theme: "environment" },
    { id: "sv-cl3", text: "Att källsortera hemma är ett litet men viktigt bidrag.", translation: "Phân loại rác tại nhà là đóng góp nhỏ nhưng quan trọng.", difficulty: "hard", theme: "environment" },
    { id: "sv-cl4", text: "Sverige satsar mycket på förnybar energi som vindkraft.", translation: "Thụy Điển đầu tư mạnh vào năng lượng tái tạo như điện gió.", difficulty: "hard", theme: "environment" },
    { id: "sv-cl5", text: "Jag försöker äta mindre kött för miljöns skull.", translation: "Tôi cố ăn ít thịt vì môi trường.", difficulty: "hard", theme: "environment" },
    { id: "sv-cl6", text: "Många ungdomar engagerar sig i klimatfrågor genom aktivism.", translation: "Nhiều người trẻ tham gia các vấn đề khí hậu qua hoạt động xã hội.", difficulty: "hard", theme: "environment" },
    { id: "sv-cl7", text: "Elbilar blir allt vanligare på svenska vägar.", translation: "Xe điện ngày càng phổ biến trên đường Thụy Điển.", difficulty: "hard", theme: "environment" },
    { id: "sv-cl8", text: "Vi behöver både politiska beslut och individuellt ansvar.", translation: "Chúng ta cần cả quyết định chính trị lẫn trách nhiệm cá nhân.", difficulty: "hard", theme: "environment" },
    { id: "sv-cl9", text: "Skogsbränder har blivit vanligare under de senaste somrarna.", translation: "Cháy rừng đã phổ biến hơn trong những mùa hè gần đây.", difficulty: "hard", theme: "environment" },
    { id: "sv-cl10", text: "Klimatomställningen är kanske vår tids största utmaning.", translation: "Chuyển đổi khí hậu có lẽ là thách thức lớn nhất thời đại chúng ta.", difficulty: "hard", theme: "environment" },
  ],
};

export const swedishExtra4: SpeakingTheme[] = [b1Travel, b2Climate];
