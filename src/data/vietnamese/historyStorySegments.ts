// Story segments for illustrated history lesson cards
import type { StorySegment } from "./types";

import hungVuongOrigin from "@/assets/history/hung-vuong-origin.jpg";
import vanLangKingdom from "@/assets/history/van-lang-kingdom.jpg";
import coLoaCitadel from "@/assets/history/co-loa-citadel.jpg";
import goldenTurtle from "@/assets/history/golden-turtle.jpg";
import myChauTragedy from "@/assets/history/my-chau-tragedy.jpg";
import trungSisters from "@/assets/history/trung-sisters.jpg";
import baTrieu from "@/assets/history/ba-trieu.jpg";
import bachDangPreparation from "@/assets/history/bach-dang-preparation.jpg";
import bachDang938 from "@/assets/history/bach-dang-938.jpg";
import ngoQuyenVictory from "@/assets/history/ngo-quyen-victory.jpg";

// Map lesson IDs to their story segments
export const historyStorySegments: Record<string, StorySegment[]> = {
  "hist-1-1": [
    {
      title: "🐉 Nguồn gốc huyền thoại",
      titleEn: "🐉 The Legendary Origin",
      text: "Theo truyền thuyết, **Lạc Long Quân** – vị thần rồng cai quản vùng biển – kết duyên cùng **Âu Cơ** – nàng tiên xinh đẹp từ miền núi. Âu Cơ sinh ra một bọc trăm trứng, nở thành **100 người con trai** khôi ngô tuấn tú. Tuy nhiên, Lạc Long Quân thuộc về biển cả, Âu Cơ thuộc về núi rừng – hai người không thể sống mãi bên nhau.",
      textEn: "According to legend, **Lac Long Quan** – the Dragon Lord who ruled the seas – married **Au Co** – a beautiful fairy from the mountains. Au Co gave birth to a sac of 100 eggs, which hatched into **100 handsome sons**. However, the Dragon Lord belonged to the sea, and Au Co belonged to the mountains – they could not stay together forever.",
      imageUrl: hungVuongOrigin,
    },
    {
      title: "👑 Vua Hùng lập nước",
      titleEn: "👑 Founding the Nation",
      text: "Họ quyết định chia con: **50 người theo mẹ lên núi**, 50 người theo cha xuống biển. Người con trưởng theo mẹ lên vùng đất **Phong Châu** (Phú Thọ ngày nay), được tôn làm **Hùng Vương thứ nhất**, lập nên nước **Văn Lang** – quốc gia đầu tiên của người Việt.",
      textEn: "They decided to split: **50 sons went with their mother** to the highlands, and 50 followed their father to the coast. The eldest son followed his mother to **Phong Chau** (modern Phu Tho), was crowned as the **first Hung King**, and founded **Van Lang** – the first nation of the Vietnamese people.",
      imageUrl: vanLangKingdom,
    },
    {
      title: "🏛️ Di sản nghìn năm",
      titleEn: "🏛️ A Lasting Legacy",
      text: "Nước Văn Lang tồn tại suốt **2.600 năm** với **18 đời vua Hùng**, chia thành 15 bộ. Người dân trồng lúa nước, đúc trống đồng, và tổ chức lễ hội. Đây là lý do người Việt tự hào gọi mình là **'con Rồng cháu Tiên'** và ngày **Giỗ Tổ Hùng Vương** (*10/3 âm lịch*) trở thành ngày lễ quốc gia.",
      textEn: "Van Lang lasted **2,600 years** across **18 generations** of Hung Kings, divided into 15 regions. The people cultivated wet rice, cast bronze drums, and held festivals. This is why Vietnamese proudly call themselves **'Children of the Dragon, Grandchildren of the Fairy,'** and **Hung Kings' Day** (*10th of March, lunar calendar*) became a national holiday.",
    },
  ],

  "hist-1-2": [
    {
      title: "⚔️ Thống nhất hai bộ tộc",
      titleEn: "⚔️ Unifying Two Tribes",
      text: "Sau khi nước Văn Lang suy yếu, **Thục Phán** – thủ lĩnh bộ tộc Âu Việt – đã đánh bại **Hùng Vương thứ 18** và thống nhất hai bộ tộc Âu Việt và Lạc Việt, lập nên nước **Âu Lạc** vào năm **257 TCN**. Ông lấy hiệu là **An Dương Vương**.",
      textEn: "After Van Lang weakened, **Thuc Phan** – chief of the Au Viet tribe – defeated the **18th Hung King** and united the Au Viet and Lac Viet peoples, founding **Au Lac** in **257 BCE**. He took the title **An Duong Vuong**.",
      imageUrl: coLoaCitadel,
    },
    {
      title: "🐢 Thần Kim Quy và nỏ thần",
      titleEn: "🐢 The Golden Turtle & Divine Crossbow",
      text: "An Dương Vương cho xây dựng **thành Cổ Loa** – kiến trúc hình xoáy ốc gồm **9 vòng thành** lồng nhau, tòa thành cổ nhất Đông Nam Á. Truyền thuyết kể rằng **thần Kim Quy** (Rùa Vàng) đã hiện lên giúp xây thành và tặng ông **chiếc nỏ thần** bắn một phát ra hàng ngàn mũi tên.",
      textEn: "He built the legendary **Co Loa Citadel** – a spiral design of **9 concentric walls**, considered the oldest citadel in Southeast Asia. Legend tells that the **Golden Turtle God** appeared to help build the citadel and gifted a **magical crossbow** that fired thousands of arrows at once.",
      imageUrl: goldenTurtle,
    },
    {
      title: "💔 Bi kịch Mỵ Châu – Trọng Thủy",
      titleEn: "💔 The Tragedy of My Chau",
      text: "**Triệu Đà** dùng mưu kế, cài con trai **Trọng Thủy** sang làm rể. **Mỵ Châu** – con gái An Dương Vương – vì ngây thơ đã để lộ bí mật nỏ thần. Trọng Thủy đánh tráo lẫy nỏ. An Dương Vương thua trận, ôm con gái chạy ra biển. Thần Kim Quy nói: *'Kẻ ngồi sau ngựa chính là giặc!'* Máu Mỵ Châu chảy xuống biển, trai ăn phải hóa **ngọc trai**. Câu chuyện bi thương về lòng tin mù quáng đã trở thành bài học muôn đời.",
      textEn: "**Trieu Da** used cunning – sending his son **Trong Thuy** to marry the princess. The innocent **My Chau** revealed the crossbow's secret. An Duong Vuong fled to the sea. The Golden Turtle said: *'The one behind you is the enemy!'* My Chau's blood turned into **pearls** in the ocean. This tragic story of blind trust became an eternal lesson.",
      imageUrl: myChauTragedy,
    },
  ],

  "hist-1-3": [
    {
      title: "🔥 Ngọn lửa khởi nghĩa",
      titleEn: "🔥 The Spark of Uprising",
      text: "**Năm 40** sau Công nguyên, dưới ách đô hộ tàn bạo của nhà Hán, thái thú **Tô Định** giết chồng **Trưng Trắc** là **Thi Sách** để dập tắt mầm phản kháng. Nhưng thay vì khuất phục, **Trưng Trắc** cùng em gái **Trưng Nhị** – con gái Lạc tướng huyện **Mê Linh** – đã phất cờ khởi nghĩa.",
      textEn: "In **40 CE**, under brutal Han Dynasty oppression, Prefect **To Dinh** murdered **Trung Trac's** husband, **Thi Sach**, to suppress resistance. But instead of submitting, **Trung Trac** and her sister **Trung Nhi** – daughters of a Lac lord from **Me Linh** – raised the banner of revolt.",
      imageUrl: trungSisters,
    },
    {
      title: "⚔️ Giải phóng 65 thành",
      titleEn: "⚔️ Liberating 65 Citadels",
      text: "Đáng chú ý, đội quân của Hai Bà Trưng có rất nhiều **nữ tướng** – điều hiếm có trong lịch sử thế giới cổ đại. Chỉ trong thời gian ngắn, nghĩa quân đã **giải phóng 65 thành trì**, đuổi Tô Định chạy về nước. **Trưng Trắc** lên làm vua, đóng đô ở **Mê Linh**. Đây là cuộc khởi nghĩa đầu tiên do **phụ nữ lãnh đạo** trên toàn thế giới.",
      textEn: "Remarkably, the Trung Sisters' army included many **female generals** – extremely rare in the ancient world. In a short time, the uprising **liberated 65 citadels** and chased To Dinh back to China. **Trung Trac** became queen at **Me Linh**. This was the **first female-led uprising** in world history.",
    },
    {
      title: "🌊 Hy sinh bất khuất",
      titleEn: "🌊 An Immortal Sacrifice",
      text: "Ba năm sau (*43 SCN*), nhà Hán cử **Mã Viện** đem đại quân sang đàn áp. Hai Bà Trưng chiến đấu anh dũng nhưng quân ít thế cô, cuối cùng gieo mình xuống **sông Hát Giang** để bảo toàn khí tiết. Ngày nay, đền thờ Hai Bà Trưng ở khắp nơi và ngày **mùng 6 tháng 2 âm lịch** hàng năm được tổ chức lễ tưởng nhớ.",
      textEn: "Three years later (*43 CE*), General **Ma Yuan** invaded with a massive army. The Trung Sisters fought valiantly but were outnumbered, ultimately throwing themselves into the **Hat Giang River** to preserve their honor. Today, temples honoring them stand across Vietnam.",
    },
  ],

  "hist-1-4": [
    {
      title: "🗡️ Tuyên ngôn bất hủ",
      titleEn: "🗡️ An Immortal Declaration",
      text: "**Năm 248**, khi đất Việt đang chịu ách đô hộ của nhà Ngô, **Triệu Thị Trinh** (Bà Triệu) mới **23 tuổi** đã đứng lên khởi nghĩa. Khi anh trai khuyên em nên lấy chồng, Bà Triệu đáp: *'Tôi muốn cưỡi cơn gió mạnh, đạp luồng sóng dữ, chém cá kình ở biển Đông, chứ không chịu khom lưng làm tì thiếp người ta!'*",
      textEn: "In **248 CE**, while Vietnam suffered under Wu Dynasty rule, **Trieu Thi Trinh** (Lady Trieu), only **23 years old**, rose up in revolt. When her brother suggested she marry, she declared: *'I want to ride the fierce wind, tread the dangerous waves, slay the great whales – I refuse to bow as a concubine!'*",
      imageUrl: baTrieu,
    },
    {
      title: "🐘 Nữ tướng cưỡi voi trắng",
      titleEn: "🐘 The Warrior on the White Elephant",
      text: "Bà cưỡi **voi trắng** ra trận, mặc **giáp vàng**, chỉ huy nghĩa quân đánh hàng chục trận khiến quân Ngô khiếp sợ. Quân giặc gọi bà là **'Nhụy Kiều Tướng Quân'** (Vị nữ tướng xinh đẹp). Cuộc khởi nghĩa kéo dài nhiều tháng nhưng cuối cùng thất bại trước lực lượng áp đảo. Bà Triệu hy sinh trên **núi Tùng** (Thanh Hóa), khi mới 23 tuổi. Hình ảnh Bà Triệu cưỡi voi xông trận đã trở thành **biểu tượng bất khuất** của người phụ nữ Việt Nam.",
      textEn: "She rode a **white elephant** into battle, wore **golden armor**, and commanded her troops in dozens of battles. The enemy called her **'Lady General of Graceful Beauty.'** The uprising ultimately fell before overwhelming forces. Lady Trieu died on **Tung Mountain** at just 23. Her image charging on an elephant became an **enduring symbol** of Vietnamese women's indomitable spirit.",
    },
  ],

  "hist-1-5": [
    {
      title: "🌊 Bối cảnh lịch sử",
      titleEn: "🌊 Historical Context",
      text: "**Năm 938**, **Ngô Quyền** – một vị tướng tài ba quê ở **Đường Lâm** (Hà Nội ngày nay) – đối mặt với cuộc xâm lược của quân **Nam Hán**. Lúc này, người Việt đã chịu hơn **1.000 năm** Bắc thuộc, và đây là cơ hội quyết định để giành lại độc lập hoàn toàn.",
      textEn: "In **938**, **Ngo Quyen** – a brilliant general from **Duong Lam** (modern Hanoi) – faced the **Southern Han** invasion. The Vietnamese had endured over **1,000 years** of Chinese rule, and this was the decisive moment to reclaim full independence.",
      imageUrl: bachDangPreparation,
    },
    {
      title: "⚒️ Mưu kế thiên tài",
      titleEn: "⚒️ A Genius Strategy",
      text: "Ngô Quyền đã nghĩ ra một mưu kế thiên tài. Ông cho quân sĩ đóng hàng ngàn **cọc gỗ bọc sắt nhọn** xuống lòng sông **Bạch Đằng**, tính toán chính xác theo **thủy triều**. Khi thủy triều lên cao, cọc ngập dưới nước, ông cho quân ra khiêu chiến rồi **giả thua** rút lui, dụ đoàn thuyền chiến Nam Hán đuổi theo vào vùng cọc.",
      textEn: "Ngo Quyen devised a genius strategy. He ordered thousands of **iron-tipped wooden stakes** planted in the **Bach Dang River**, precisely calculated with the **tides**. At high tide, the stakes were submerged. His troops **feigned retreat**, luring the Southern Han warships into the staked zone.",
      imageUrl: bachDang938,
    },
    {
      title: "🏆 Kỷ nguyên độc lập",
      titleEn: "🏆 The Era of Independence",
      text: "Khi thủy triều rút, hàng ngàn cọc nhọn nhô lên như **bãi chông khổng lồ**, xuyên thủng toàn bộ chiến thuyền giặc. Tướng giặc **Lưu Hoằng Tháo** tử trận ngay trên sông. Chiến thắng **Bạch Đằng 938** có ý nghĩa lịch sử vô cùng to lớn: **chấm dứt hơn 1.000 năm Bắc thuộc**, mở ra kỷ nguyên độc lập lâu dài cho dân tộc Việt Nam.",
      textEn: "As the tide fell, thousands of sharp stakes emerged like a **massive field of spikes**, piercing the entire enemy fleet. Commander **Liu Hongcao** was killed on the river. The **Bach Dang 938** victory held immense significance: **ending over 1,000 years of Chinese domination**, opening an era of lasting independence.",
      imageUrl: ngoQuyenVictory,
    },
  ],
};
