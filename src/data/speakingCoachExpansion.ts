// Additional themes & sentences for Speaking Coach (all 4 languages).
// Merged into speakingCoachLanguages at runtime.
import type { SpeakingTheme } from "./speakingCoachData";

// ---------------- ENGLISH ----------------
export const englishExtraThemes: SpeakingTheme[] = [
  {
    id: "en-restaurant", name: "Restaurant & Food", nameVi: "Nhà hàng & Ẩm thực", icon: "🍽️",
    sentences: [
      { id: "en-rs1", text: "I would like to order the chef's special, please.", translation: "Tôi muốn gọi món đặc biệt của đầu bếp.", difficulty: "easy", theme: "restaurant" },
      { id: "en-rs2", text: "Could we have the bill, please?", translation: "Cho chúng tôi thanh toán nhé?", difficulty: "easy", theme: "restaurant" },
      { id: "en-rs3", text: "Is this dish vegetarian or does it contain meat?", translation: "Món này chay hay có thịt?", difficulty: "easy", theme: "restaurant" },
      { id: "en-rs4", text: "I am allergic to peanuts and shellfish.", translation: "Tôi bị dị ứng với đậu phộng và hải sản.", difficulty: "medium", theme: "restaurant" },
      { id: "en-rs5", text: "The service here is excellent and the food tastes amazing.", translation: "Dịch vụ ở đây tuyệt vời và đồ ăn rất ngon.", difficulty: "medium", theme: "restaurant" },
      { id: "en-rs6", text: "Could you please recommend a good local wine to pair with this meal?", translation: "Bạn có thể gợi ý loại rượu địa phương hợp với bữa ăn này không?", difficulty: "hard", theme: "restaurant" },
      { id: "en-rs7", text: "We would like to make a reservation for four people at seven o'clock.", translation: "Chúng tôi muốn đặt bàn cho bốn người lúc bảy giờ.", difficulty: "medium", theme: "restaurant" },
      { id: "en-rs8", text: "What is included in the breakfast buffet?", translation: "Bữa sáng buffet bao gồm những gì?", difficulty: "easy", theme: "restaurant" },
    ],
  },
  {
    id: "en-health", name: "Health & Wellness", nameVi: "Sức khỏe & Thể chất", icon: "💪",
    sentences: [
      { id: "en-hl1", text: "I try to exercise at least three times a week.", translation: "Tôi cố gắng tập thể dục ít nhất ba lần một tuần.", difficulty: "easy", theme: "health" },
      { id: "en-hl2", text: "Drinking enough water is essential for good health.", translation: "Uống đủ nước rất quan trọng cho sức khỏe.", difficulty: "easy", theme: "health" },
      { id: "en-hl3", text: "I have a headache and a slight fever.", translation: "Tôi bị đau đầu và sốt nhẹ.", difficulty: "easy", theme: "health" },
      { id: "en-hl4", text: "Regular sleep helps the body recover from daily stress.", translation: "Ngủ đều đặn giúp cơ thể hồi phục sau căng thẳng hằng ngày.", difficulty: "medium", theme: "health" },
      { id: "en-hl5", text: "Meditation has been shown to reduce anxiety and improve focus.", translation: "Thiền đã được chứng minh là giúp giảm lo âu và cải thiện sự tập trung.", difficulty: "medium", theme: "health" },
      { id: "en-hl6", text: "A balanced diet rich in vegetables strengthens the immune system.", translation: "Chế độ ăn cân bằng nhiều rau giúp tăng cường hệ miễn dịch.", difficulty: "medium", theme: "health" },
      { id: "en-hl7", text: "Mental health is just as important as physical health.", translation: "Sức khỏe tinh thần cũng quan trọng như sức khỏe thể chất.", difficulty: "medium", theme: "health" },
      { id: "en-hl8", text: "Preventive checkups can detect problems before they become serious.", translation: "Khám định kỳ có thể phát hiện vấn đề trước khi nghiêm trọng.", difficulty: "hard", theme: "health" },
    ],
  },
  {
    id: "en-hobbies", name: "Hobbies & Interests", nameVi: "Sở thích", icon: "🎨",
    sentences: [
      { id: "en-hb1", text: "I love painting in my free time.", translation: "Tôi thích vẽ tranh trong thời gian rảnh.", difficulty: "easy", theme: "hobbies" },
      { id: "en-hb2", text: "Do you play any musical instruments?", translation: "Bạn có chơi nhạc cụ nào không?", difficulty: "easy", theme: "hobbies" },
      { id: "en-hb3", text: "I started learning photography last summer.", translation: "Tôi bắt đầu học chụp ảnh từ mùa hè năm ngoái.", difficulty: "easy", theme: "hobbies" },
      { id: "en-hb4", text: "Reading novels helps me relax after a long day.", translation: "Đọc tiểu thuyết giúp tôi thư giãn sau một ngày dài.", difficulty: "medium", theme: "hobbies" },
      { id: "en-hb5", text: "Hiking in the mountains gives me a sense of freedom.", translation: "Đi bộ đường dài trên núi mang lại cho tôi cảm giác tự do.", difficulty: "medium", theme: "hobbies" },
      { id: "en-hb6", text: "I find gardening therapeutic and very rewarding.", translation: "Tôi thấy làm vườn rất thư giãn và đáng giá.", difficulty: "medium", theme: "hobbies" },
      { id: "en-hb7", text: "Learning a new language opens up many cultural opportunities.", translation: "Học một ngôn ngữ mới mở ra nhiều cơ hội văn hóa.", difficulty: "hard", theme: "hobbies" },
    ],
  },
  {
    id: "en-feelings", name: "Feelings & Opinions", nameVi: "Cảm xúc & Quan điểm", icon: "💬",
    sentences: [
      { id: "en-fl1", text: "I feel really happy today.", translation: "Hôm nay tôi cảm thấy rất vui.", difficulty: "easy", theme: "feelings" },
      { id: "en-fl2", text: "Honestly, I am not sure about that.", translation: "Thật ra tôi không chắc về điều đó.", difficulty: "easy", theme: "feelings" },
      { id: "en-fl3", text: "In my opinion, education is the most important investment.", translation: "Theo tôi, giáo dục là khoản đầu tư quan trọng nhất.", difficulty: "medium", theme: "feelings" },
      { id: "en-fl4", text: "I completely agree with what you just said.", translation: "Tôi hoàn toàn đồng ý với điều bạn vừa nói.", difficulty: "medium", theme: "feelings" },
      { id: "en-fl5", text: "It seems to me that we need a different approach.", translation: "Tôi thấy chúng ta cần cách tiếp cận khác.", difficulty: "medium", theme: "feelings" },
      { id: "en-fl6", text: "I appreciate your thoughtful feedback on this matter.", translation: "Tôi rất trân trọng phản hồi sâu sắc của bạn về vấn đề này.", difficulty: "hard", theme: "feelings" },
    ],
  },
];

// ---------------- CHINESE ----------------
export const chineseExtraThemes: SpeakingTheme[] = [
  {
    id: "zh-shopping", name: "购物", nameVi: "Mua sắm", icon: "🛍️",
    sentences: [
      { id: "zh-sh1", text: "这个多少钱？", translation: "Cái này bao nhiêu tiền?", ipa: "Zhège duōshǎo qián?", difficulty: "easy", theme: "shopping" },
      { id: "zh-sh2", text: "可以便宜一点吗？", translation: "Có thể rẻ hơn một chút không?", ipa: "Kěyǐ piányí yīdiǎn ma?", difficulty: "easy", theme: "shopping" },
      { id: "zh-sh3", text: "我要这个，谢谢。", translation: "Tôi lấy cái này, cảm ơn.", ipa: "Wǒ yào zhège, xièxie.", difficulty: "easy", theme: "shopping" },
      { id: "zh-sh4", text: "请问试衣间在哪里？", translation: "Phòng thử đồ ở đâu ạ?", ipa: "Qǐngwèn shìyījiān zài nǎlǐ?", difficulty: "medium", theme: "shopping" },
      { id: "zh-sh5", text: "我可以刷卡吗？", translation: "Tôi có thể quẹt thẻ không?", ipa: "Wǒ kěyǐ shuākǎ ma?", difficulty: "easy", theme: "shopping" },
      { id: "zh-sh6", text: "这件衣服有别的颜色吗？", translation: "Áo này có màu khác không?", ipa: "Zhè jiàn yīfu yǒu bié de yánsè ma?", difficulty: "medium", theme: "shopping" },
      { id: "zh-sh7", text: "请帮我打包，谢谢。", translation: "Làm ơn gói lại giúp tôi, cảm ơn.", ipa: "Qǐng bāng wǒ dǎbāo, xièxie.", difficulty: "medium", theme: "shopping" },
    ],
  },
  {
    id: "zh-restaurant", name: "餐厅", nameVi: "Nhà hàng", icon: "🍜",
    sentences: [
      { id: "zh-rs1", text: "请给我菜单。", translation: "Cho tôi xin thực đơn.", ipa: "Qǐng gěi wǒ càidān.", difficulty: "easy", theme: "restaurant" },
      { id: "zh-rs2", text: "我要一碗牛肉面。", translation: "Tôi gọi một bát mì bò.", ipa: "Wǒ yào yī wǎn niúròu miàn.", difficulty: "easy", theme: "restaurant" },
      { id: "zh-rs3", text: "不要太辣，谢谢。", translation: "Đừng cay quá nhé, cảm ơn.", ipa: "Bùyào tài là, xièxie.", difficulty: "easy", theme: "restaurant" },
      { id: "zh-rs4", text: "服务员，买单！", translation: "Phục vụ ơi, tính tiền!", ipa: "Fúwùyuán, mǎidān!", difficulty: "easy", theme: "restaurant" },
      { id: "zh-rs5", text: "请问这道菜怎么做？", translation: "Món này được làm thế nào?", ipa: "Qǐngwèn zhè dào cài zěnme zuò?", difficulty: "medium", theme: "restaurant" },
      { id: "zh-rs6", text: "我对海鲜过敏。", translation: "Tôi bị dị ứng với hải sản.", ipa: "Wǒ duì hǎixiān guòmǐn.", difficulty: "medium", theme: "restaurant" },
    ],
  },
  {
    id: "zh-hobbies", name: "兴趣爱好", nameVi: "Sở thích", icon: "🎨",
    sentences: [
      { id: "zh-hb1", text: "我喜欢听音乐。", translation: "Tôi thích nghe nhạc.", ipa: "Wǒ xǐhuān tīng yīnyuè.", difficulty: "easy", theme: "hobbies" },
      { id: "zh-hb2", text: "你的爱好是什么？", translation: "Sở thích của bạn là gì?", ipa: "Nǐ de àihào shì shénme?", difficulty: "easy", theme: "hobbies" },
      { id: "zh-hb3", text: "周末我常常去爬山。", translation: "Cuối tuần tôi thường đi leo núi.", ipa: "Zhōumò wǒ chángcháng qù páshān.", difficulty: "medium", theme: "hobbies" },
      { id: "zh-hb4", text: "我喜欢看中国电影学习汉语。", translation: "Tôi thích xem phim Trung Quốc để học tiếng.", ipa: "Wǒ xǐhuān kàn Zhōngguó diànyǐng xuéxí Hànyǔ.", difficulty: "medium", theme: "hobbies" },
      { id: "zh-hb5", text: "每天晚上我都练习书法。", translation: "Mỗi tối tôi đều luyện thư pháp.", ipa: "Měitiān wǎnshàng wǒ dōu liànxí shūfǎ.", difficulty: "hard", theme: "hobbies" },
    ],
  },
  {
    id: "zh-health", name: "健康", nameVi: "Sức khỏe", icon: "💊",
    sentences: [
      { id: "zh-hl1", text: "我感冒了。", translation: "Tôi bị cảm rồi.", ipa: "Wǒ gǎnmào le.", difficulty: "easy", theme: "health" },
      { id: "zh-hl2", text: "我头疼，想休息一下。", translation: "Tôi đau đầu, muốn nghỉ một chút.", ipa: "Wǒ tóuténg, xiǎng xiūxí yīxià.", difficulty: "medium", theme: "health" },
      { id: "zh-hl3", text: "你应该多喝水，多运动。", translation: "Bạn nên uống nhiều nước và vận động nhiều.", ipa: "Nǐ yīnggāi duō hē shuǐ, duō yùndòng.", difficulty: "medium", theme: "health" },
      { id: "zh-hl4", text: "请问医院在哪里？", translation: "Xin hỏi bệnh viện ở đâu?", ipa: "Qǐngwèn yīyuàn zài nǎlǐ?", difficulty: "easy", theme: "health" },
      { id: "zh-hl5", text: "保持良好的睡眠习惯非常重要。", translation: "Giữ thói quen ngủ tốt rất quan trọng.", ipa: "Bǎochí liánghǎo de shuìmián xíguàn fēicháng zhòngyào.", difficulty: "hard", theme: "health" },
    ],
  },
];

// ---------------- VIETNAMESE ----------------
export const vietnameseExtraThemes: SpeakingTheme[] = [
  {
    id: "vi-restaurant", name: "Nhà hàng", nameVi: "Nhà hàng", icon: "🍜",
    sentences: [
      { id: "vi-rs1", text: "Cho tôi xin thực đơn.", translation: "May I have the menu, please?", difficulty: "easy", theme: "restaurant" },
      { id: "vi-rs2", text: "Một bát phở bò, không hành.", translation: "One bowl of beef pho, no onion.", difficulty: "easy", theme: "restaurant" },
      { id: "vi-rs3", text: "Món này có cay không?", translation: "Is this dish spicy?", difficulty: "easy", theme: "restaurant" },
      { id: "vi-rs4", text: "Tính tiền giúp tôi với.", translation: "May I have the bill, please?", difficulty: "easy", theme: "restaurant" },
      { id: "vi-rs5", text: "Tôi bị dị ứng với hải sản.", translation: "I am allergic to seafood.", difficulty: "medium", theme: "restaurant" },
      { id: "vi-rs6", text: "Đồ ăn ở đây rất ngon và giá hợp lý.", translation: "The food here is delicious and reasonably priced.", difficulty: "medium", theme: "restaurant" },
    ],
  },
  {
    id: "vi-shopping", name: "Mua sắm", nameVi: "Mua sắm", icon: "🛒",
    sentences: [
      { id: "vi-sh1", text: "Cái này bao nhiêu tiền?", translation: "How much is this?", difficulty: "easy", theme: "shopping" },
      { id: "vi-sh2", text: "Có giảm giá không ạ?", translation: "Is there a discount?", difficulty: "easy", theme: "shopping" },
      { id: "vi-sh3", text: "Tôi muốn thử cái này.", translation: "I would like to try this on.", difficulty: "easy", theme: "shopping" },
      { id: "vi-sh4", text: "Cho tôi xem mẫu khác đi.", translation: "Show me another model, please.", difficulty: "medium", theme: "shopping" },
      { id: "vi-sh5", text: "Tôi sẽ thanh toán bằng thẻ.", translation: "I will pay by card.", difficulty: "medium", theme: "shopping" },
      { id: "vi-sh6", text: "Sản phẩm này có bảo hành bao lâu?", translation: "How long is the warranty for this product?", difficulty: "hard", theme: "shopping" },
    ],
  },
  {
    id: "vi-family", name: "Gia đình", nameVi: "Gia đình", icon: "👨‍👩‍👧",
    sentences: [
      { id: "vi-fm1", text: "Gia đình tôi có bốn người.", translation: "My family has four people.", difficulty: "easy", theme: "family" },
      { id: "vi-fm2", text: "Tôi có một anh trai và một em gái.", translation: "I have an older brother and a younger sister.", difficulty: "easy", theme: "family" },
      { id: "vi-fm3", text: "Bố mẹ tôi là giáo viên.", translation: "My parents are teachers.", difficulty: "easy", theme: "family" },
      { id: "vi-fm4", text: "Cuối tuần cả nhà thường ăn cơm cùng nhau.", translation: "On weekends, my whole family usually eats together.", difficulty: "medium", theme: "family" },
      { id: "vi-fm5", text: "Tôi rất yêu và biết ơn ba mẹ.", translation: "I really love and am grateful to my parents.", difficulty: "medium", theme: "family" },
    ],
  },
  {
    id: "vi-feelings", name: "Cảm xúc", nameVi: "Cảm xúc", icon: "💬",
    sentences: [
      { id: "vi-fl1", text: "Hôm nay tôi rất vui.", translation: "I am very happy today.", difficulty: "easy", theme: "feelings" },
      { id: "vi-fl2", text: "Tôi cảm thấy hơi mệt.", translation: "I feel a bit tired.", difficulty: "easy", theme: "feelings" },
      { id: "vi-fl3", text: "Theo tôi thì ý kiến đó rất hay.", translation: "In my opinion, that idea is very good.", difficulty: "medium", theme: "feelings" },
      { id: "vi-fl4", text: "Tôi đồng ý với bạn hoàn toàn.", translation: "I completely agree with you.", difficulty: "medium", theme: "feelings" },
      { id: "vi-fl5", text: "Tôi rất biết ơn sự giúp đỡ của bạn.", translation: "I am very grateful for your help.", difficulty: "medium", theme: "feelings" },
    ],
  },
];

// ---------------- FINNISH ----------------
export const finnishExtraThemes: SpeakingTheme[] = [
  {
    id: "fi-restaurant", name: "Ravintolassa", nameVi: "Ở nhà hàng", icon: "🍽️", level: "A2",
    sentences: [
      { id: "fi-rs1", text: "Saisinko ruokalistan, kiitos?", translation: "Cho tôi xin thực đơn được không?", difficulty: "easy", theme: "restaurant" },
      { id: "fi-rs2", text: "Otan kahvin ja korvapuustin.", translation: "Tôi gọi một cà phê và một bánh quế.", difficulty: "easy", theme: "restaurant" },
      { id: "fi-rs3", text: "Olen kasvissyöjä.", translation: "Tôi ăn chay.", difficulty: "easy", theme: "restaurant" },
      { id: "fi-rs4", text: "Saisinko laskun, kiitos?", translation: "Cho tôi thanh toán nhé?", difficulty: "easy", theme: "restaurant" },
      { id: "fi-rs5", text: "Ruoka oli erittäin maukasta.", translation: "Đồ ăn rất ngon.", difficulty: "medium", theme: "restaurant" },
      { id: "fi-rs6", text: "Voitteko suositella jotain perinteistä?", translation: "Bạn có thể gợi ý món truyền thống không?", difficulty: "hard", theme: "restaurant" },
    ],
  },
  {
    id: "fi-shopping-ext", name: "Kaupassa (jatko)", nameVi: "Đi mua sắm (tiếp)", icon: "🛒", level: "A2",
    sentences: [
      { id: "fi-shex1", text: "Paljonko tämä maksaa?", translation: "Cái này bao nhiêu?", difficulty: "easy", theme: "shopping" },
      { id: "fi-shex2", text: "Voinko maksaa kortilla?", translation: "Tôi có thể trả bằng thẻ không?", difficulty: "easy", theme: "shopping" },
      { id: "fi-shex3", text: "Onko teillä tätä isompaa kokoa?", translation: "Bạn có size lớn hơn không?", difficulty: "medium", theme: "shopping" },
      { id: "fi-shex4", text: "Haluaisin palauttaa tämän tuotteen.", translation: "Tôi muốn trả lại sản phẩm này.", difficulty: "medium", theme: "shopping" },
      { id: "fi-shex5", text: "Onko alennusta saatavilla?", translation: "Có giảm giá không?", difficulty: "easy", theme: "shopping" },
    ],
  },
  {
    id: "fi-weather", name: "Sää", nameVi: "Thời tiết", icon: "⛅", level: "A1",
    sentences: [
      { id: "fi-w1", text: "Tänään on kaunis päivä.", translation: "Hôm nay là một ngày đẹp.", difficulty: "easy", theme: "weather" },
      { id: "fi-w2", text: "Sataa lunta paljon.", translation: "Tuyết rơi rất nhiều.", difficulty: "easy", theme: "weather" },
      { id: "fi-w3", text: "Talvella on kylmää ja pimeää.", translation: "Mùa đông trời lạnh và tối.", difficulty: "medium", theme: "weather" },
      { id: "fi-w4", text: "Kesällä aurinko paistaa myöhään.", translation: "Mùa hè mặt trời chiếu đến tận khuya.", difficulty: "medium", theme: "weather" },
      { id: "fi-w5", text: "Pidän syksyn väreistä.", translation: "Tôi thích màu sắc mùa thu.", difficulty: "medium", theme: "weather" },
    ],
  },
  {
    id: "fi-feelings-ext", name: "Tunteet (jatko)", nameVi: "Cảm xúc (tiếp)", icon: "💬", level: "A2",
    sentences: [
      { id: "fi-flex1", text: "Olen iloinen tänään.", translation: "Hôm nay tôi vui.", difficulty: "easy", theme: "feelings" },
      { id: "fi-flex2", text: "Olen vähän väsynyt.", translation: "Tôi hơi mệt.", difficulty: "easy", theme: "feelings" },
      { id: "fi-flex3", text: "Mielestäni se on hyvä ajatus.", translation: "Theo tôi đó là ý hay.", difficulty: "medium", theme: "feelings" },
      { id: "fi-flex4", text: "Olen samaa mieltä kanssasi.", translation: "Tôi đồng ý với bạn.", difficulty: "medium", theme: "feelings" },
      { id: "fi-flex5", text: "Kiitos avustasi, arvostan sitä todella.", translation: "Cảm ơn sự giúp đỡ của bạn, tôi rất trân trọng.", difficulty: "hard", theme: "feelings" },
    ],
  },
];
