/**
 * Speaking Roleplay scenarios - fixed dialogue trees for offline practice.
 */
export interface RoleplayScenario {
  id: string;
  emoji: string;
  title: string;
  titleEn: string;
  context: string;
  contextEn: string;
  npc: string;
  turns: {
    npc: string;
    npcEn: string;
    options: { vi: string; en: string; good: boolean; feedback: string }[];
  }[];
}

export const vffRoleplayScenarios: RoleplayScenario[] = [
  {
    id: "rp-cafe",
    emoji: "☕",
    title: "Gọi cà phê",
    titleEn: "Ordering coffee",
    context: "Bạn vào quán cà phê buổi sáng.",
    contextEn: "You walk into a cafe in the morning.",
    npc: "Cô chủ quán",
    turns: [
      {
        npc: "Chào anh, anh dùng gì ạ?",
        npcEn: "Hello sir, what would you like?",
        options: [
          { vi: "Cho tôi một cà phê sữa đá.", en: "One iced milk coffee please.", good: true, feedback: "Hoàn hảo - dùng ‘cho tôi’ rất lịch sự." },
          { vi: "Tôi muốn cà phê.", en: "I want coffee.", good: false, feedback: "Đúng nghĩa nhưng nghe hơi thẳng - dùng ‘cho tôi’ tự nhiên hơn." },
          { vi: "Cà phê!", en: "Coffee!", good: false, feedback: "Quá cụt - thiếu chủ ngữ và lịch sự." },
        ],
      },
      {
        npc: "Ít đường hay nhiều đường?",
        npcEn: "Less or more sugar?",
        options: [
          { vi: "Ít đường thôi ạ.", en: "Just a little sugar please.", good: true, feedback: "Chuẩn - ‘thôi ạ’ mềm và lịch sự." },
          { vi: "Không có đường.", en: "No sugar.", good: true, feedback: "Cũng OK - rõ ràng." },
          { vi: "Đường nhiều.", en: "Lots of sugar.", good: false, feedback: "Nên đổi thứ tự: ‘Nhiều đường ạ.’" },
        ],
      },
      {
        npc: "Của anh 25 nghìn ạ.",
        npcEn: "That's 25,000 VND.",
        options: [
          { vi: "Đây, cảm ơn chị.", en: "Here, thank you.", good: true, feedback: "Rất tự nhiên - luôn nói ‘cảm ơn’." },
          { vi: "OK.", en: "OK.", good: false, feedback: "Thiếu lịch sự - nên có ‘cảm ơn’." },
        ],
      },
    ],
  },
  {
    id: "rp-grab",
    emoji: "🛵",
    title: "Đi Grab bike",
    titleEn: "Grab bike ride",
    context: "Bạn đón Grab Bike đến khách sạn.",
    contextEn: "You catch a Grab Bike to your hotel.",
    npc: "Tài xế",
    turns: [
      {
        npc: "Anh David phải không? Đi khách sạn Rex?",
        npcEn: "Mr. David, right? To Rex Hotel?",
        options: [
          { vi: "Đúng rồi, cảm ơn anh.", en: "Correct, thank you.", good: true, feedback: "Rõ ràng và lịch sự." },
          { vi: "Vâng.", en: "Yes.", good: true, feedback: "Đúng nhưng có thể thêm cảm ơn." },
          { vi: "David.", en: "David.", good: false, feedback: "Cụt - nên xác nhận đầy đủ." },
        ],
      },
      {
        npc: "Cho mũ bảo hiểm, đội vào giúp em nhé.",
        npcEn: "Here's the helmet, please put it on.",
        options: [
          { vi: "Dạ được, cảm ơn.", en: "Sure, thanks.", good: true, feedback: "Chuẩn." },
          { vi: "Không cần.", en: "Don't need.", good: false, feedback: "Phải đội mũ - luật bắt buộc!" },
        ],
      },
      {
        npc: "Đường đông, mình đi tắt qua hẻm nhé?",
        npcEn: "Traffic's heavy, take a shortcut through the alley?",
        options: [
          { vi: "Anh đi đường nào nhanh nhất cũng được.", en: "Whatever's fastest.", good: true, feedback: "Rất tự nhiên - tin tưởng tài xế." },
          { vi: "Không, đi đường chính.", en: "No, main road only.", good: true, feedback: "Cũng OK nếu bạn ngại hẻm." },
        ],
      },
    ],
  },
  {
    id: "rp-market",
    emoji: "🛍️",
    title: "Mặc cả ở chợ",
    titleEn: "Bargaining at market",
    context: "Bạn xem một chiếc áo dài ở chợ Bến Thành.",
    contextEn: "You browse an áo dài at Ben Thanh market.",
    npc: "Cô bán hàng",
    turns: [
      {
        npc: "Áo này đẹp lắm, 800 nghìn thôi em.",
        npcEn: "This dress is lovely, only 800k.",
        options: [
          { vi: "Đắt quá cô ơi! Bớt chút được không?", en: "Too expensive! Can you lower it?", good: true, feedback: "Hoàn hảo - có xưng hô ‘cô ơi’." },
          { vi: "Đắt.", en: "Expensive.", good: false, feedback: "Quá cụt - cần biểu lộ và xin bớt." },
          { vi: "Cho tôi.", en: "Give me.", good: false, feedback: "Chưa hợp bối cảnh mặc cả." },
        ],
      },
      {
        npc: "Vậy cô bớt 100, còn 700 nhé.",
        npcEn: "OK, I'll take off 100, 700.",
        options: [
          { vi: "Cô ơi, 500 được không? Em lấy hai cái.", en: "How about 500? I'll take two.", good: true, feedback: "Chiến thuật hay - mua nhiều để giảm nhiều." },
          { vi: "Được rồi.", en: "OK deal.", good: true, feedback: "Cũng được nếu bạn không muốn mặc cả tiếp." },
        ],
      },
      {
        npc: "Thôi được, 550 hai cái, em lấy đi!",
        npcEn: "OK 550 for two, take them!",
        options: [
          { vi: "Cảm ơn cô! Gói giúp em.", en: "Thanks! Please wrap them.", good: true, feedback: "Kết thúc đẹp." },
        ],
      },
    ],
  },
  {
    id: "rp-clinic",
    emoji: "🏥",
    title: "Ở phòng khám",
    titleEn: "At the clinic",
    context: "Bạn bị sốt và tới phòng khám.",
    contextEn: "You have a fever and visit a clinic.",
    npc: "Bác sĩ",
    turns: [
      {
        npc: "Anh bị sao?",
        npcEn: "What's wrong?",
        options: [
          { vi: "Tôi bị sốt và đau đầu từ hôm qua.", en: "Fever and headache since yesterday.", good: true, feedback: "Rõ ràng - có mốc thời gian." },
          { vi: "Không khỏe.", en: "Not well.", good: false, feedback: "Quá mơ hồ - hãy mô tả triệu chứng." },
        ],
      },
      {
        npc: "Anh có dị ứng thuốc gì không?",
        npcEn: "Any drug allergies?",
        options: [
          { vi: "Tôi dị ứng penicillin.", en: "I'm allergic to penicillin.", good: true, feedback: "Chuẩn - thông tin quan trọng." },
          { vi: "Không.", en: "No.", good: true, feedback: "Ngắn gọn cũng OK." },
          { vi: "Chắc là không.", en: "Probably not.", good: false, feedback: "‘Chắc’ không đủ chắc - phải trả lời rõ." },
        ],
      },
      {
        npc: "Uống thuốc này 3 ngày. Nếu chưa hết thì quay lại.",
        npcEn: "Take this for 3 days. Come back if it doesn't clear.",
        options: [
          { vi: "Dạ, cảm ơn bác sĩ.", en: "Yes, thank you doctor.", good: true, feedback: "Chuẩn." },
          { vi: "OK.", en: "OK.", good: false, feedback: "Nên xưng ‘dạ’ và cảm ơn." },
        ],
      },
    ],
  },
];
