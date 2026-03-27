// Story segments for illustrated history lesson cards
import type { StorySegment } from "./types";

// Month 1 images
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
import lyNamDe from "@/assets/history/ly-nam-de.jpg";
import dinhBoLinh from "@/assets/history/dinh-bo-linh.jpg";
import dongSonDrum from "@/assets/history/dong-son-drum.jpg";

// Month 2 images
import thangLongDragon from "@/assets/history/thang-long-dragon.jpg";
import lyThuongKiet from "@/assets/history/ly-thuong-kiet.jpg";
import tranMongol from "@/assets/history/tran-mongol.jpg";
import leLoiLamSon from "@/assets/history/le-loi-lam-son.jpg";
import tranHungDao from "@/assets/history/tran-hung-dao.jpg";
import hoGuomLegend from "@/assets/history/ho-guom-legend.jpg";
import hoiAnTrade from "@/assets/history/hoi-an-trade.jpg";
import vanMieu from "@/assets/history/van-mieu.jpg";

// Month 1 extra images
import khucThuaDu from "@/assets/history/khuc-thua-du.jpg";
import maiThucLoan from "@/assets/history/mai-thuc-loan.jpg";

// Month 2 extra images
import leThanhTong from "@/assets/history/le-thanh-tong.jpg";
import hoQuyLy from "@/assets/history/ho-quy-ly.jpg";

// Month 3 images
import quangTrung from "@/assets/history/quang-trung.jpg";
import hueCitadel from "@/assets/history/hue-citadel.jpg";
import hoChiMinhDeclaration from "@/assets/history/ho-chi-minh-declaration.jpg";
import dienBienPhu from "@/assets/history/dien-bien-phu.jpg";
import reunification1975 from "@/assets/history/reunification-1975.jpg";
import canVuong from "@/assets/history/can-vuong.jpg";
import phanBoiChau from "@/assets/history/phan-boi-chau.jpg";
import xoVietNgheTinh from "@/assets/history/xo-viet-nghe-tinh.jpg";
import augustRevolution from "@/assets/history/august-revolution.jpg";

// Month 4 images
import doiMoi from "@/assets/history/doi-moi.jpg";
import vietnamAsean from "@/assets/history/vietnam-asean.jpg";
import vietnamDigital from "@/assets/history/vietnam-digital.jpg";
import vietnamCuisine from "@/assets/history/vietnam-cuisine.jpg";
import vietnamEducation from "@/assets/history/vietnam-education.jpg";
import vietnamEconomy from "@/assets/history/vietnam-economy.jpg";
import vietnamFuture from "@/assets/history/vietnam-future.jpg";

// Map lesson IDs to their story segments
export const historyStorySegments: Record<string, StorySegment[]> = {
  // ==================== MONTH 1: EARLY KINGDOMS ====================

  "hist-1-1": [
    {
      title: "🐉 Nguồn gốc huyền thoại",
      titleEn: "🐉 The Legendary Origin",
      text: "Thuở hồng hoang, khi đất trời còn mờ mịt sương, **Lạc Long Quân** – vị thần rồng uy nghiêm cai quản biển cả mênh mông – đem lòng yêu **Âu Cơ**, nàng tiên xinh đẹp tuyệt trần từ miền núi cao. Tình yêu giữa Rồng và Tiên đã sinh ra điều kỳ diệu: Âu Cơ mang thai và sinh ra một **bọc trăm trứng**, nở thành **100 người con trai** khôi ngô tuấn tú. Nhưng Rồng thuộc về biển sâu, Tiên thuộc về núi cao – hai người không thể mãi bên nhau.",
      textEn: "In the mists of ancient times, **Lac Long Quan** – the mighty Dragon Lord who ruled the vast seas – fell in love with **Au Co**, a breathtakingly beautiful fairy from the mountain peaks. Their love between Dragon and Fairy created a miracle: Au Co bore a **sac of one hundred eggs**, which hatched into **100 handsome sons**. But the Dragon belonged to the deep sea, and the Fairy to the high mountains – they could not stay together forever.",
      imageUrl: hungVuongOrigin,
    },
    {
      title: "👑 Vua Hùng lập nước",
      titleEn: "👑 Founding the Nation",
      text: "Với lòng nặng trĩu nhưng đầy trách nhiệm, họ chia con: **50 người theo mẹ lên rừng núi**, 50 người theo cha về miền biển. Người con trưởng theo mẹ đến vùng đất **Phong Châu** (Phú Thọ ngày nay), nơi đồng bằng xanh mướt trải dài bên dòng sông Hồng. Tại đây, ông được tôn làm **Hùng Vương thứ nhất**, khai sinh nước **Văn Lang** – quốc gia đầu tiên của người Việt, bắt đầu một trang sử kéo dài hơn **2.600 năm**.",
      textEn: "With heavy but responsible hearts, they divided: **50 sons went with their mother** to the highlands, and 50 followed their father to the coast. The eldest traveled with his mother to **Phong Chau** (modern Phu Tho), where lush plains stretched along the Red River. There, he was crowned **the first Hung King**, founding **Van Lang** – the first nation of the Vietnamese people, beginning a history spanning over **2,600 years**.",
      imageUrl: vanLangKingdom,
    },
    {
      title: "🏛️ Di sản nghìn năm",
      titleEn: "🏛️ A Lasting Legacy",
      text: "Nước Văn Lang trải qua **18 đời vua Hùng**, chia thành 15 bộ, lấy Phong Châu làm kinh đô. Người dân **trồng lúa nước** trên cánh đồng phì nhiêu, **đúc trống đồng** tinh xảo với hoa văn tuyệt đẹp, và tổ chức những lễ hội tưng bừng. Đây chính là lý do người Việt tự hào gọi mình là **'con Rồng cháu Tiên'** – nhắc nhở rằng dòng máu thiêng liêng của Rồng và Tiên chảy trong huyết quản mỗi người. Ngày **Giỗ Tổ Hùng Vương** (*10/3 âm lịch*) trở thành ngày lễ quốc gia thiêng liêng.",
      textEn: "Van Lang spanned **18 generations** of Hung Kings, divided into 15 regions with Phong Chau as the capital. The people **cultivated wet rice** on fertile plains, **cast exquisite bronze drums** with magnificent patterns, and held grand festivals. This is why Vietnamese proudly call themselves **'Children of the Dragon, Grandchildren of the Fairy'** – a reminder of the sacred bloodline flowing through every Vietnamese. **Hung Kings' Commemoration Day** (*10th of March, lunar calendar*) became a sacred national holiday.",
    },
    {
      title: "🏛️ Di sản sống mãi",
      titleEn: "🏛️ An Enduring Legacy",
      text: "Dù bao thế kỷ đã qua đi, di sản của các **Vua Hùng** vẫn sống động trong huyết quản mỗi người Việt. Hàng năm, vào ngày *mùng 10 tháng 3 âm lịch*, hàng triệu con dân lại nô nức hành hương về **Đền Hùng**, tham dự **Giỗ Tổ Hùng Vương** để tưởng nhớ công lao dựng nước. Niềm tự hào *\"Con Rồng cháu Tiên\"* không chỉ là một huyền thoại mà trở thành sợi dây tinh thần, gắn kết dân tộc thành một khối bền chặt, nhắc nhở về cội nguồn và lòng biết ơn sâu sắc.",
      textEn: "Though centuries have passed, the legacy of the **Hung Kings** lives vibrantly in the veins of every Vietnamese person. Annually, on the *10th day of the 3rd lunar month*, millions of pilgrims eagerly journey to **Hung Temple** to attend the **Hung Kings' Commemoration Day**, honoring their nation-founding merits. The pride of being *\"Children of the Dragon, Grandchildren of the Immortal\"* is not merely a myth but a spiritual thread, binding the nation into a steadfast unity, reminding all of their origins and profound gratitude.",
    },
  
  ],

  "hist-1-2": [
    {
      title: "⚔️ Thống nhất hai bộ tộc",
      titleEn: "⚔️ Unifying Two Tribes",
      text: "Khi nước Văn Lang dần suy yếu, từ phía bắc xuất hiện một vị thủ lĩnh tài ba – **Thục Phán**, người đứng đầu bộ tộc **Âu Việt**. Bằng tài thao lược và ý chí sắt đá, ông đánh bại **Hùng Vương thứ 18** rồi thống nhất hai bộ tộc Âu Việt và Lạc Việt thành một. Năm **257 TCN**, ông lấy hiệu **An Dương Vương**, khai sinh nước **Âu Lạc** – đánh dấu một chương mới trong lịch sử dân tộc.",
      textEn: "As Van Lang gradually weakened, a brilliant leader emerged from the north – **Thuc Phan**, chief of the **Au Viet** tribe. With military genius and iron will, he defeated the **18th Hung King** and united the Au Viet and Lac Viet peoples. In **257 BCE**, he took the title **An Duong Vuong** and founded **Au Lac** – marking a new chapter in national history.",
      imageUrl: coLoaCitadel,
    },
    {
      title: "🐢 Thần Kim Quy và nỏ thần",
      titleEn: "🐢 The Golden Turtle & Divine Crossbow",
      text: "An Dương Vương cho xây dựng **thành Cổ Loa** – một kỳ quan quân sự với **9 vòng thành** xoáy ốc lồng nhau như mê cung, được coi là tòa thành cổ nhất Đông Nam Á. Nhưng thành xây mãi không xong vì có yêu quái phá hoại. Một đêm, **thần Kim Quy** – Rùa Vàng linh thiêng – từ biển khơi bò lên, giúp xua đuổi yêu quái và hoàn thành thành trì. Trước khi đi, thần tặng An Dương Vương **chiếc nỏ thần** bắn một phát hàng ngàn mũi tên, khiến kẻ thù nghe tên đã khiếp sợ.",
      textEn: "An Duong Vuong built the legendary **Co Loa Citadel** – a military marvel of **9 concentric spiral walls** like a labyrinth, the oldest citadel in Southeast Asia. But construction kept failing due to evil spirits. One night, the **Golden Turtle God** crawled from the sea, banished the spirits, and helped complete the fortress. Before departing, the god gifted a **magical crossbow** that fired thousands of arrows at once, terrifying all enemies.",
      imageUrl: goldenTurtle,
    },
    {
      title: "💔 Bi kịch Mỵ Châu – Trọng Thủy",
      titleEn: "💔 The Tragedy of My Chau",
      text: "**Triệu Đà** từ phương Bắc không dám đánh thẳng, bèn dùng mưu thâm: cài con trai **Trọng Thủy** sang làm rể. Công chúa **Mỵ Châu** ngây thơ, yêu chồng tha thiết, vô tình để lộ bí mật nỏ thần. Trọng Thủy lén đánh tráo lẫy nỏ. Khi Triệu Đà tấn công, nỏ thần thành vô dụng. An Dương Vương ôm con gái chạy ra biển. Thần Kim Quy hiện lên gầm lên: *'Kẻ ngồi sau ngựa chính là giặc!'* Máu Mỵ Châu rơi xuống biển, trai ăn phải hóa **ngọc trai** lấp lánh. Câu chuyện bi thương mãi mãi nhắc nhở: **đừng bao giờ mù quáng tin người**.",
      textEn: "**Trieu Da** from the north dared not attack directly, so he used cunning: sending his son **Trong Thuy** as a son-in-law. The innocent princess **My Chau**, deeply in love, unwittingly revealed the crossbow's secret. Trong Thuy secretly swapped the trigger. When Trieu Da attacked, the crossbow was useless. The Golden Turtle roared: *'The one behind you is the enemy!'* My Chau's blood fell into the sea, turning into gleaming **pearls**. This tragic tale forever reminds us: **never trust blindly**.",
      imageUrl: myChauTragedy,
    },
    {
      title: "🎯 Bài học muôn đời",
      titleEn: "🎯 An Eternal Lesson",
      text: "Bi kịch **An Dương Vương** và **Mỵ Châu – Trọng Thủy** mãi là một bài học đắt giá cho muôn đời con cháu. Nó nhắc nhở chúng ta về tầm quan trọng của cảnh giác, về sự hiểm nguy của lòng tin đặt nhầm chỗ, và hậu quả khôn lường của sự chủ quan, mất cảnh giác trước kẻ thù. Câu chuyện về mất nước vì sơ hở đã trở thành lời răn dạy thấm thía, khắc sâu vào tâm trí người Việt về ý chí độc lập và tinh thần tự cường để bảo vệ non sông, gấm vóc.",
      textEn: "The tragedy of **An Duong Vuong** and **My Chau – Trong Thuy** remains a costly lesson for generations to come. It reminds us of the importance of vigilance, the peril of misplaced trust, and the unpredictable consequences of complacency and lack of caution against enemies. This story of losing a nation due to oversight has become a profound admonition, deeply etched into the Vietnamese psyche, urging self-reliance and the will for independence to protect their homeland.",
    },
  
  ],

  "hist-1-3": [
    {
      title: "🔥 Ngọn lửa khởi nghĩa",
      titleEn: "🔥 The Spark of Uprising",
      text: "**Năm 40** sau Công nguyên, đất Việt rên xiết dưới gót giày nhà Hán. Thái thú **Tô Định** – tên quan tàn bạo – đã giết chồng **Trưng Trắc** là **Thi Sách** để dập tắt mọi mầm phản kháng. Nhưng hắn không ngờ rằng hành động đó đã châm ngòi cho ngọn lửa dữ dội nhất. **Trưng Trắc** – con gái Lạc tướng huyện **Mê Linh** – không khóc than mà nắm chặt thanh gươm, cùng em gái **Trưng Nhị** phất cờ khởi nghĩa.",
      textEn: "In **40 CE**, Vietnam groaned under the Han Dynasty's iron heel. Prefect **To Dinh** – a brutal governor – murdered **Trung Trac's** husband **Thi Sach** to crush all resistance. But he never imagined his act would ignite the fiercest flame. **Trung Trac** – daughter of a Lac lord from **Me Linh** – did not weep, but gripped her sword. Together with her sister **Trung Nhi**, she raised the banner of revolt.",
      imageUrl: trungSisters,
    },
    {
      title: "⚔️ Giải phóng 65 thành",
      titleEn: "⚔️ Liberating 65 Citadels",
      text: "Điều phi thường là đội quân của Hai Bà Trưng có rất nhiều **nữ tướng** – điều chưa từng thấy trong lịch sử thế giới cổ đại. Như cơn bão quét qua, nghĩa quân **giải phóng 65 thành trì** chỉ trong thời gian ngắn, đuổi Tô Định chạy bán sống bán chết về nước. **Trưng Trắc** lên làm vua, đóng đô tại **Mê Linh**. Đây là cuộc khởi nghĩa đầu tiên trên thế giới do **phụ nữ lãnh đạo** – một kỳ tích mà hàng nghìn năm sau vẫn khiến thế giới ngưỡng mộ.",
      textEn: "Remarkably, the Trung Sisters' army included many **female generals** – unprecedented in the ancient world. Like a storm sweeping through, they **liberated 65 citadels** in short order, chasing To Dinh fleeing for his life. **Trung Trac** became queen at **Me Linh**. This was the world's first **female-led uprising** – a feat that still inspires admiration thousands of years later.",
    },
    {
      title: "🌊 Hy sinh bất khuất",
      titleEn: "🌊 An Immortal Sacrifice",
      text: "Ba năm sau (*43 SCN*), nhà Hán cử **Mã Viện** đem đại quân sang đàn áp. Dù chiến đấu như những nữ thần chiến trận, Hai Bà Trưng cuối cùng bị áp đảo bởi lực lượng gấp nhiều lần. Thay vì đầu hàng, hai chị em **gieo mình xuống sông Hát Giang** – chọn cái chết vinh quang hơn sống nhục. Ngày nay, đền thờ Hai Bà Trưng tọa lạc khắp nơi trên đất Việt, và mỗi năm vào ngày **mùng 6 tháng 2 âm lịch**, cả dân tộc cùng tưởng nhớ hai vị nữ anh hùng đầu tiên.",
      textEn: "Three years later (*43 CE*), General **Ma Yuan** invaded with an overwhelming army. Though they fought like warrior goddesses, the Trung Sisters were finally outnumbered. Rather than surrender, they **threw themselves into the Hat Giang River** – choosing glorious death over disgrace. Today, temples honoring them stand across Vietnam, and every year on the **6th day of the 2nd lunar month**, the entire nation remembers its first heroines.",
    },
    {
      title: "🏛️ Di sản và biểu tượng",
      titleEn: "🏛️ Legacy and Symbol",
      text: "Khởi nghĩa **Hai Bà Trưng** và sự hy sinh lẫm liệt của họ không chỉ in sâu vào lịch sử mà còn trở thành biểu tượng vĩ đại cho tinh thần bất khuất của người phụ nữ Việt Nam. Nhiều đền thờ **Hai Bà Trưng** được dựng khắp nơi, đặc biệt là **Đền Đồng Nhân** ở Hà Nội, nơi người dân tưởng nhớ công ơn của họ. Sự kiện này là minh chứng hùng hồn cho vai trò và khả năng lãnh đạo của phụ nữ Việt, truyền cảm hứng cho nhiều thế hệ về lòng yêu nước và ý chí tự cường dân tộc.",
      textEn: "The **Trung Sisters'** uprising and their heroic sacrifice are not only deeply etched in history but have also become a magnificent symbol of the indomitable spirit of Vietnamese women. Numerous temples dedicated to the **Trung Sisters** have been erected throughout the country, especially **Dong Nhan Temple** in Hanoi, where people commemorate their contributions. This event stands as a powerful testament to the role and leadership capabilities of Vietnamese women, inspiring many generations with patriotism and the will for national self-reliance.",
    },
  
  ],

  "hist-1-4": [
    {
      title: "🏔️ Bối cảnh - Đêm trường Bắc thuộc",
      titleEn: "🏔️ Context - The Dark Age of Northern Domination",
      text: "Vào thế kỷ thứ 3, xứ **Giao Châu** (tên gọi Việt Nam dưới thời Bắc thuộc) đang chìm trong đêm trường đô hộ tàn khốc của nhà **Đông Ngô**. Nhân dân oằn mình dưới ách thống trị khắc nghiệt, sưu thuế nặng nề và những chính sách đồng hóa dã man. Cuộc sống nô lệ đầy bi thương khơi dậy trong lòng mỗi người Việt khát vọng cháy bỏng về độc lập, tự do. Chính trong bối cảnh ấy, một nữ anh hùng đã đứng lên, châm ngọn lửa hy vọng, đó chính là **Bà Triệu**.",
      textEn: "In the 3rd century, **Giao Chau** (the name for Vietnam under Northern domination) was engulfed in the brutal night of rule by the **Eastern Wu** dynasty. The people groaned under harsh tyranny, heavy taxes, and savage assimilation policies. A sorrowful life of slavery ignited a fervent desire for independence and freedom in every Vietnamese heart. It was in this context that a heroine rose, kindling a flame of hope – **Lady Trieu**.",
    },

    {
      title: "🗡️ Tuyên ngôn bất hủ",
      titleEn: "🗡️ An Immortal Declaration",
      text: "**Năm 248**, đất Việt quằn quại dưới ách nhà Ngô. Giữa bóng tối áp bức, một cô gái mới **23 tuổi** – **Triệu Thị Trinh** – bước ra ánh sáng. Khi anh trai khuyên em hãy yên phận lấy chồng, Bà Triệu ngẩng đầu đáp lại bằng câu nói vang vọng nghìn năm: *'Tôi muốn cưỡi cơn gió mạnh, đạp luồng sóng dữ, chém cá kình ở biển Đông, chứ không chịu khom lưng làm tì thiếp người ta!'*",
      textEn: "In **248 CE**, Vietnam writhed under Wu Dynasty oppression. From the darkness, a girl of only **23** – **Trieu Thi Trinh** – stepped into the light. When her brother urged her to marry quietly, Lady Trieu raised her head and answered with words that echo through millennia: *'I want to ride the fierce wind, tread the dangerous waves, slay the great whales – I refuse to bow as a concubine!'*",
      imageUrl: baTrieu,
    },
    {
      title: "🐘 Nữ tướng cưỡi voi trắng",
      titleEn: "🐘 The Warrior on the White Elephant",
      text: "Hình ảnh Bà Triệu cưỡi **voi trắng** xông trận, mặc **giáp vàng** rực rỡ, tóc dài bay phấp phới, đã khiến quân Ngô khiếp đảm đến mức gọi bà là **'Nhụy Kiều Tướng Quân'** – Vị nữ tướng xinh đẹp. Hàng chục trận đánh, bà luôn ở tuyến đầu, khiến kẻ thù run sợ. Cuộc khởi nghĩa kéo dài nhiều tháng nhưng cuối cùng sụp đổ trước lực lượng áp đảo. Bà Triệu hy sinh trên **núi Tùng** (Thanh Hóa) khi tuổi đời còn quá trẻ. Nhưng hình ảnh người con gái cưỡi voi xông trận đã mãi mãi trở thành **biểu tượng bất khuất** của phụ nữ Việt Nam.",
      textEn: "The image of Lady Trieu riding a **white elephant** into battle, clad in **gleaming golden armor**, her long hair streaming behind – it terrified the Wu army so much they called her **'Lady General of Graceful Beauty.'** In dozens of battles, she always led from the front. The uprising lasted months but ultimately fell. Lady Trieu perished on **Tung Mountain** (Thanh Hoa), still so young. Yet the image of a girl charging on an elephant became an **eternal symbol** of Vietnamese women's indomitable spirit.",
    },
    {
      title: "🏛️ Di sản - Biểu tượng nữ quyền",
      titleEn: "🏛️ Legacy - A Symbol of Female Power",
      text: "**Bà Triệu** không chỉ là một nữ tướng tài ba mà còn là biểu tượng kiêu hãnh của ý chí và sức mạnh phụ nữ Việt Nam xuyên suốt lịch sử. Tuyên ngôn bất hủ của bà đã truyền cảm hứng mạnh mẽ cho nhiều thế hệ. Sự ra đi bi tráng của bà không phải là dấu chấm hết, mà nó càng khẳng định tinh thần bất khuất, không cam chịu làm nô lệ. Đến ngày nay, bà vẫn được tôn thờ tại nhiều đền miếu, là nguồn cảm hứng vĩnh cửu về lòng yêu nước và tinh thần đấu tranh vì tự do.",
      textEn: "**Lady Trieu** was not merely a talented female general but also a proud symbol of the will and strength of Vietnamese women throughout history. Her immortal declaration powerfully inspired many generations. Her tragic death was not an end but rather an affirmation of an indomitable spirit, unwilling to live in servitude. To this day, she is revered in many temples, serving as an eternal source of inspiration for patriotism and the spirit of fighting for freedom.",
    },
  
  ],

  "hist-1-5": [
    {
      title: "🌊 Bối cảnh lịch sử",
      titleEn: "🌊 Historical Context",
      text: "**Năm 938** – hơn một nghìn năm nô lệ đã trôi qua. Bao thế hệ người Việt đã sống, đã chết, đã đấu tranh mà chưa bao giờ biết tự do thực sự là gì. Giữa thời khắc đen tối nhất ấy, **Ngô Quyền** – một vị tướng tài ba quê ở **Đường Lâm** (Hà Nội ngày nay) – nhìn ra cơ hội ngàn năm có một khi quân **Nam Hán** kéo sang xâm lược.",
      textEn: "**Year 938** – over a thousand years of subjugation had passed. Generations had lived, died, and fought without knowing true freedom. In this darkest hour, **Ngo Quyen** – a brilliant general from **Duong Lam** (modern Hanoi) – saw a once-in-a-millennium opportunity as the **Southern Han** army invaded.",
      imageUrl: bachDangPreparation,
    },
    {
      title: "⚒️ Mưu kế thiên tài",
      titleEn: "⚒️ A Genius Strategy",
      text: "Ngô Quyền nghĩ ra mưu kế mà cả nghìn năm sau vẫn được ca ngợi. Ông cho quân đóng hàng ngàn **cọc gỗ bọc sắt nhọn** xuống lòng sông **Bạch Đằng**, tính toán chính xác theo **con nước thủy triều**. Khi triều lên, cọc chìm khuất dưới mặt nước. Ông cho quân **giả vờ thua**, hoảng hốt rút chạy, dụ đoàn chiến thuyền Nam Hán đuổi theo hăm hở vào vùng tử địa mà không hề hay biết.",
      textEn: "Ngo Quyen devised a strategy praised for millennia. He ordered thousands of **iron-tipped wooden stakes** planted in the **Bach Dang River**, precisely calculated with the **tides**. At high tide, the stakes lay hidden. His troops **feigned panic and retreat**, luring the Southern Han warships eagerly into the death zone without suspecting a thing.",
      imageUrl: bachDang938,
    },
    {
      title: "🏆 Kỷ nguyên độc lập",
      titleEn: "🏆 The Era of Independence",
      text: "Khi thủy triều rút, hàng ngàn cọc nhọn đồng loạt nhô lên như **bãi chông khổng lồ** – xuyên thủng, mắc kẹt, lật úp toàn bộ chiến thuyền giặc. Tướng giặc **Lưu Hoằng Tháo** tử trận ngay trên sông. Ngô Quyền quay lại tấn công, đánh tan nát đoàn quân xâm lược. Chiến thắng **Bạch Đằng 938** chấn động trời đất: **chấm dứt hơn 1.000 năm Bắc thuộc**, mở ra kỷ nguyên độc lập lâu dài cho dân tộc Việt Nam. Sau đêm dài nhất, bình minh cuối cùng đã ló dạng.",
      textEn: "As the tide fell, thousands of sharp stakes surged upward like a **massive field of spikes** – piercing, trapping, and capsizing the entire enemy fleet. Commander **Liu Hongcao** was killed on the river. Ngo Quyen turned and annihilated the invaders. The **Bach Dang 938** victory shook heaven and earth: **ending over 1,000 years of Chinese domination**, opening an era of lasting independence. After the longest night, dawn finally broke.",
      imageUrl: ngoQuyenVictory,
    },
    {
      title: "🏛️ Di sản - Cha đẻ độc lập",
      titleEn: "🏛️ Legacy - Father of Independence",
      text: "Chiến thắng **Bạch Đằng** năm *938* đã đưa **Ngô Quyền** trở thành người đặt nền móng vĩ đại cho nền độc lập lâu dài của dân tộc Việt Nam, có thể gọi ông là vị *Cha đẻ của nền độc lập dân tộc*. Triều đại **Ngô** tuy ngắn ngủi nhưng đã khẳng định chủ quyền quốc gia sau hơn nghìn năm Bắc thuộc. Chiến công này không chỉ chấm dứt sự đô hộ mà còn khơi dậy mạnh mẽ ý thức tự chủ, tự cường, là bước đệm vững chắc cho sự phát triển của các triều đại **Đinh, Lê, Lý** sau này, mở ra một kỷ nguyên huy hoàng cho **Đại Việt**.",
      textEn: "The **Bach Dang** victory in *938* established **Ngo Quyen** as the great founder of Vietnam's long-lasting independence, truly the *Father of National Independence*. The **Ngo** dynasty, though short-lived, affirmed national sovereignty after over a millennium of Northern domination. This triumph not only ended foreign rule but also powerfully awakened the spirit of self-reliance, serving as a firm stepping stone for the development of later **Dinh, Le, Ly** dynasties, inaugurating a glorious era for **Dai Viet**.",
    },
  
  ],

  "hist-1-6": [
    {
      title: "🌸 Khát vọng tự chủ",
      titleEn: "🌸 The Dream of Independence",
      text: "**Năm 544**, giữa đêm trường Bắc thuộc, **Lý Bí** – một hào trưởng người Việt vùng Thái Bình – đã đứng lên. Không còn chịu nổi cảnh nhân dân bị bóc lột, ông tập hợp quân sĩ, lãnh đạo cuộc khởi nghĩa chống nhà Lương. Sau những trận đánh quyết liệt, quân Lương bị đuổi sạch. Lý Bí lên ngôi Hoàng đế – lấy hiệu **Lý Nam Đế** – và đặt tên nước là **Vạn Xuân**, nghĩa là *'muôn mùa xuân'*, gửi gắm ước vọng đất nước trường tồn.",
      textEn: "In **544**, amid the long night of Chinese rule, **Ly Bi** – a Vietnamese chieftain from Thai Binh – rose up. Unable to bear the people's suffering, he rallied soldiers and led an uprising against the Liang Dynasty. After fierce battles, the Liang forces were expelled. Ly Bi crowned himself Emperor – taking the title **Ly Nam De** – and named his country **Van Xuan** ('Ten Thousand Springs'), expressing the wish for eternal prosperity.",
      imageUrl: lyNamDe,
    },
    {
      title: "👑 Xưng Đế – Hành động táo bạo",
      titleEn: "👑 Claiming the Emperor Title",
      text: "Điều **chưa từng có tiền lệ**: Lý Nam Đế dám xưng **'Đế'** (Hoàng đế) thay vì chỉ xưng **'Vương'** (Vua) – ngang hàng với hoàng đế Trung Hoa! Ở thời đại mà thiên triều Trung Hoa được coi là trung tâm thiên hạ, hành động này vô cùng **táo bạo và đầy kiêu hãnh**. Ông đặt niên hiệu **Thiên Đức**, xây dựng triều đình, mang lại hy vọng cho nhân dân. Dù nước Vạn Xuân chỉ tồn tại ngắn ngủi trước sức ép nhà Lương, nhưng nó đã **khẳng định mạnh mẽ**: người Việt xứng đáng có đất nước riêng, hoàng đế riêng.",
      textEn: "Something **unprecedented**: Ly Nam De dared to claim the title **'Emperor'** rather than merely **'King'** – placing himself equal to the Chinese emperor! In an era when the Chinese court was considered the center of the world, this was **extraordinarily bold and proud**. He adopted the reign name **Thien Duc**, built a court, and brought hope. Though Van Xuan was short-lived, it **powerfully declared**: the Vietnamese deserve their own country and their own emperor.",
    },
    {
      title: "⚔️ Cuộc chiến bảo vệ Vạn Xuân",
      titleEn: "⚔️ The War to Defend Van Xuan",
      text: "Niềm vui độc lập chỉ kéo dài trong chớp nhoáng. Năm *545*, nhà **Lương** (Trung Quốc) đem quân xâm lược, buộc **Lý Nam Đế** phải rút lui và sau đó ông lâm bệnh mất. Tuy nhiên, ngọn lửa Vạn Xuân không bao giờ tắt. Cháu của ông là **Lý Thiên Bảo** và đặc biệt là con nuôi **Triệu Quang Phục** (tức **Triệu Việt Vương**) đã tiếp tục cuộc kháng chiến bền bỉ, anh dũng. **Triệu Quang Phục** đã xây dựng căn cứ đầm lầy **Đa Trạch** hiểm yếu, dùng kế sách du kích để đánh bại quân Lương, giữ vững nền độc lập cho **Vạn Xuân**.",
      textEn: "The joy of independence was fleeting. In *545*, the **Liang** dynasty (China) invaded, forcing **Ly Nam De** to retreat, and he later died of illness. However, the flame of Van Xuan never extinguished. His nephew, **Ly Thien Bao**, and especially his adopted son, **Trieu Quang Phuc** (later **Trieu Viet Vuong**), continued the tenacious and courageous resistance. **Trieu Quang Phuc** established the strategically perilous **Da Trach** swamp base, employing guerrilla tactics to defeat the Liang army, thus maintaining **Van Xuan's** independence.",
    },
    {
      title: "🏛️ Di sản - Ý nghĩa Vạn Xuân",
      titleEn: "🏛️ Legacy - The Meaning of Van Xuan",
      text: "Nước **Vạn Xuân** của **Lý Nam Đế** là nhà nước độc lập đầu tiên sau thời kỳ Bắc thuộc kéo dài. Việc đặt quốc hiệu này mang ý nghĩa sâu sắc, thể hiện khát vọng vĩnh cửu, trường tồn của dân tộc Việt Nam trước giông bão của thời cuộc. Dù triều đại này không kéo dài được bao lâu, nhưng nó đã khẳng định mạnh mẽ chủ quyền, tiếp nối ý chí độc lập từ thời **An Dương Vương** và là lời tuyên ngôn đanh thép về bản lĩnh, sức sống mãnh liệt của một dân tộc kiên cường, không bao giờ chấp nhận làm nô lệ.",
      textEn: "**Ly Nam De's** state of **Van Xuan** was the first independent state after a prolonged period of Northern domination. The choice of this national name carried profound meaning, expressing the Vietnamese people's eternal aspiration for permanence amidst the storms of history. Although this dynasty did not last long, it strongly affirmed sovereignty, continued the will for independence from the time of **An Duong Vuong**, and served as a powerful declaration of the resilience and vibrant vitality of a steadfast nation, never accepting enslavement.",
    },
  
  ],

  "hist-1-7": [
    {
      title: "🔔 Nắm thời cơ",
      titleEn: "🔔 Seizing the Moment",
      text: "**Năm 905**, nhà Đường – đế chế hùng mạnh nhất châu Á – đang sụp đổ trong hỗn loạn. Hàng nghìn dặm xa, tại Hồng Châu (Hải Dương), một hào trưởng uy tín tên **Khúc Thừa Dụ** nhìn ra cơ hội ngàn năm có một. Ông tự xưng **Tiết độ sứ** – giành quyền cai trị An Nam từ tay người Trung Quốc mà không cần đổ máu. Bước ngoặt này **mở đầu thời kỳ tự chủ** của dân tộc Việt.",
      textEn: "In **905**, the mighty Tang Dynasty was collapsing into chaos. Thousands of miles away, in Hong Chau (Hai Duong), a respected chieftain named **Khuc Thua Du** saw a once-in-a-millennium opportunity. He declared himself **Governor**, wresting control of An Nam from Chinese hands without bloodshed. This turning point **began Vietnam's era of autonomy**.",
      imageUrl: khucThuaDu,
    },
    {
      title: "🌱 Ba đời xây nền tự chủ",
      titleEn: "🌱 Three Generations of Foundation",
      text: "Con ông – **Khúc Hạo** – tiếp nối sự nghiệp với tầm nhìn xa. Ông thực hiện nhiều **cải cách tiến bộ**: đơn giản hóa bộ máy hành chính, giảm thuế cho nông dân, lập sổ hộ khẩu để quản lý dân – những chính sách mà nhiều nước phương Tây mãi hàng trăm năm sau mới áp dụng. Cháu ông – **Khúc Thừa Mỹ** – tiếp tục giữ nền tự chủ. Ba đời họ Khúc tuy chưa xưng vương, nhưng đã **đặt viên gạch đầu tiên** cho nền độc lập hoàn toàn.",
      textEn: "His son **Khuc Hao** continued with visionary reforms: simplifying administration, reducing taxes, establishing household registration – policies many Western nations wouldn't adopt for centuries. His grandson **Khuc Thua My** maintained autonomy. Three generations of the Khuc family, though never claiming royal titles, **laid the first bricks** for complete independence.",
    },
    {
      title: "🌱 Cải cách tiến bộ",
      titleEn: "🌱 Progressive Reforms",
      text: "Sau khi **Khúc Thừa Dụ** đặt nền móng, con trai ông là **Khúc Hạo** đã kế tục sự nghiệp với những cải cách sâu rộng, đặt nền tảng vững chắc cho nền tự chủ. Ông tiến hành *\"bình quân thuế ruộng, tha bỏ lực dịch, lập sổ hộ khẩu, rõ ràng thôn xã\"*. Những chính sách này không chỉ giảm bớt gánh nặng cho nhân dân mà còn củng cố quyền lực của chính quyền tự chủ, tạo sự gắn kết lòng dân. Đây là những bước đi chiến lược, thể hiện tầm nhìn xa trông rộng, hướng tới xây dựng một quốc gia độc lập và thịnh vượng.",
      textEn: "After **Khúc Thừa Dụ** laid the foundation, his son **Khúc Hạo** continued the work with extensive reforms, establishing a firm base for autonomy. He implemented *\"equal land taxes, abolished forced labor, created household registers, and clarified village administration\"*. These policies not only eased the burden on the people but also strengthened the autonomous government's authority, fostering popular unity. These strategic steps demonstrated foresight, aiming to build an independent and prosperous nation.",
    },
    {
      title: "🏛️ Di sản - Nền móng độc lập",
      titleEn: "🏛️ Legacy - Foundation of Independence",
      text: "Ba đời họ **Khúc** (Khúc Thừa Dụ, Khúc Hạo, Khúc Thừa Mỹ) đã có công lớn trong việc duy trì và củng cố quyền tự chủ dân tộc trong bối cảnh Bắc thuộc đầy biến động. Dù không xưng đế, nhưng những gì họ làm được đã tạo ra một khoảng trống chính trị quan trọng, từng bước đưa đất nước thoát khỏi sự lệ thuộc. Họ chính là những người đặt nền móng vững chắc, là tiền đề quan trọng để **Ngô Quyền** có thể thực hiện chiến thắng **Bạch Đằng** lừng lẫy, chính thức khôi phục nền độc lập hoàn toàn cho dân tộc Việt Nam.",
      textEn: "Three generations of the **Khúc** family (Khúc Thừa Dụ, Khúc Hạo, Khúc Thừa Mỹ) made significant contributions to maintaining and strengthening national autonomy amidst the turbulent Northern domination. Although they did not claim emperorship, their achievements created a crucial political vacuum, gradually freeing the country from dependency. They were the ones who laid the firm foundation, serving as an important premise for **Ngo Quyen** to achieve the glorious **Bach Dang** victory, officially restoring complete independence for the Vietnamese nation.",
    },
  
  ],

  "hist-1-8": [
    {
      title: "🏴 Cậu bé chăn trâu",
      titleEn: "🏴 The Buffalo Boy",
      text: "Sau khi Ngô Quyền mất (*944*), đất nước rơi vào cảnh **loạn 12 sứ quân** – 12 thủ lĩnh quân sự chiếm cứ các vùng, giao tranh liên miên. Giữa thời loạn lạc, tại vùng **Hoa Lư** (Ninh Bình) – nơi núi đá vôi sừng sững như những bức tường thành thiên nhiên – có một cậu bé chăn trâu tên **Đinh Bộ Lĩnh**. Truyền thuyết kể rằng cậu thường cùng bạn chơi trò đánh trận, lấy **bông lau làm cờ**, chỉ huy 'quân đội' nhỏ tuổi. Từ trò chơi trẻ thơ ấy, một vị anh hùng đang hình thành.",
      textEn: "After Ngo Quyen's death (*944*), the country descended into the **chaos of 12 warlords**. Amid this turmoil, in **Hoa Lu** (Ninh Binh) – where limestone mountains stood like natural fortress walls – lived a buffalo-herding boy named **Dinh Bo Linh**. Legend says he played war games with friends, using **reed flowers as flags**. From these childhood games, a hero was being forged.",
      imageUrl: dinhBoLinh,
    },
    {
      title: "👑 Thống nhất giang sơn",
      titleEn: "👑 Unifying the Nation",
      text: "Lớn lên, Đinh Bộ Lĩnh rèn luyện binh mã, thu phục từng sứ quân bằng cả tài thao lược và ý chí sắt đá. **Năm 968**, sau khi dẹp yên tất cả 12 sứ quân, ông lên ngôi **Đinh Tiên Hoàng**, đặt quốc hiệu **Đại Cồ Việt**, đóng đô ở Hoa Lư. Ông xây dựng bộ máy nhà nước hoàn chỉnh, tổ chức quân đội **10 đạo**. Hoa Lư được chọn nhờ địa thế hiểm trở – núi đá vôi bao quanh như pháo đài thiên nhiên. Cậu bé chăn trâu ngày nào giờ đã là hoàng đế khai quốc.",
      textEn: "As he grew, Dinh Bo Linh trained soldiers and subdued each warlord through genius and iron will. In **968**, having pacified all 12 warlords, he ascended as **Emperor Dinh Tien Hoang**, naming the nation **Dai Co Viet** with its capital at Hoa Lu. He built a complete state apparatus and organized the military into **10 corps**. The buffalo boy had become a founding emperor.",
    },
    {
      title: "⚔️ Chiến thuật thu phục",
      titleEn: "⚔️ Tactics of Subjugation",
      text: "**Đinh Bộ Lĩnh** không chỉ là một dũng tướng mà còn là một nhà chính trị sắc sảo. Ông khéo léo dùng cả sức mạnh quân sự và tài ngoại giao để thu phục 12 sứ quân loạn lạc. Bằng việc đánh chiếm các vị trí hiểm yếu, bao vây cô lập đối phương, và đặc biệt là dùng uy thế quân sự áp đảo để thuyết phục các sứ quân quy thuận, **Đinh Bộ Lĩnh** đã lần lượt dẹp yên các thế lực cát cứ. Chỉ trong một thời gian ngắn, ông đã thống nhất giang sơn về một mối, lập công lớn cho đất nước.",
      textEn: "**Dinh Bo Linh** was not only a brave general but also a shrewd politician. He skillfully employed both military might and diplomatic prowess to subjugate the 12 unruly warlords. By seizing strategic positions, isolating adversaries, and especially by using overwhelming military prestige to persuade warlords to submit, **Dinh Bo Linh** successively pacified the splintered forces. In a short period, he unified the nation, making a great contribution to the country.",
    },
    {
      title: "🏛️ Di sản - Đại Cồ Việt vững bền",
      titleEn: "🏛️ Legacy - A Steadfast Dai Co Viet",
      text: "Sau khi thống nhất đất nước, **Đinh Bộ Lĩnh** lên ngôi Hoàng đế, hiệu là **Đinh Tiên Hoàng**, lập nên nhà **Đinh** vào năm *968*, đặt quốc hiệu là **Đại Cồ Việt**, đóng đô tại **Hoa Lư**. Đây là sự kiện lịch sử trọng đại, khẳng định nền độc lập tự chủ hoàn toàn của dân tộc sau nghìn năm Bắc thuộc. Ông đã xây dựng một nền móng quốc gia vững chắc, tạo tiền đề quan trọng cho sự phát triển hưng thịnh của các triều đại **Tiền Lê** và đặc biệt là **nhà Lý** sau này, mở ra một kỷ nguyên huy hoàng cho văn hóa và quyền lực của **Đại Việt**.",
      textEn: "After unifying the country, **Dinh Bo Linh** ascended the throne as Emperor, with the title **Dinh Tien Hoang**, establishing the **Dinh** dynasty in *968*, naming the nation **Dai Co Viet**, and setting the capital at **Hoa Lu**. This was a momentous historical event, affirming the complete independence and self-mastery of the nation after a millennium of Northern domination. He built a firm national foundation, creating an important premise for the prosperous development of the subsequent **Early Le** dynasty and especially the **Ly dynasty**, ushering in a glorious era for the culture and power of **Dai Viet**.",
    },
  
  ],

  "hist-1-9": [
    {
      title: "🔔 Nền văn minh rực rỡ",
      titleEn: "🔔 A Brilliant Civilization",
      text: "**Văn hóa Đông Sơn** (khoảng *700 TCN – 100 SCN*) là đỉnh cao rực rỡ nhất của người Việt cổ, phát triển mạnh mẽ ở đồng bằng sông Hồng. Biểu tượng nổi bật nhất là **trống đồng Đông Sơn** – những kiệt tác đúc đồng cho thấy trình độ kỹ thuật và thẩm mỹ phi thường mà cả thế giới cổ đại phải nghiêng mình khâm phục.",
      textEn: "**Dong Son Culture** (approximately *700 BCE – 100 CE*) was the most brilliant pinnacle of ancient Vietnam, flourishing in the Red River Delta. Its most iconic symbol: the **Dong Son bronze drums** – masterpieces of casting that demonstrated extraordinary technical skill admired across the ancient world.",
      imageUrl: dongSonDrum,
    },
    {
      title: "🌟 Trống đồng Ngọc Lũ",
      titleEn: "🌟 The Ngoc Lu Drum",
      text: "**Trống đồng Ngọc Lũ** – chiếc trống đẹp nhất được tìm thấy – có đường kính mặt trống **79cm**, được trang trí vô cùng tinh xảo: chính giữa là **ngôi sao nhiều cánh** tượng trưng cho mặt trời, xung quanh là hình ảnh cuộc sống người Việt cổ: lễ hội, giã gạo, chèo thuyền, **chim Lạc** bay lượn. Hàng trăm trống đồng Đông Sơn được tìm thấy khắp Đông Nam Á – từ Indonesia đến Trung Quốc – chứng tỏ sức ảnh hưởng rộng lớn. **UNESCO** đã công nhận đây là **di sản văn hóa quý giá** của nhân loại.",
      textEn: "The **Ngoc Lu drum** – the finest ever found – has a **79cm** surface diameter, elaborately decorated: at the center a **multi-pointed star** representing the sun, surrounded by scenes of ancient life: festivals, rice pounding, boat racing, and **Lac birds** in flight. Hundreds of Dong Son drums found across Southeast Asia proved this culture's vast influence. **UNESCO** recognized them as **precious cultural heritage** of humanity.",
    },
    {
      title: "🌱 Đời sống người Đông Sơn",
      titleEn: "🌱 Life of the Dong Son People",
      text: "Cuộc sống của người **Đông Sơn** gắn liền với nền văn minh lúa nước, họ là những bậc thầy trong việc trồng lúa, chăn nuôi gia súc. Họ sống trong những làng mạc trù phú ven sông, giỏi nghề rèn đúc đồng, chế tác ra những công cụ, vũ khí và đồ trang sức tinh xảo. Các nhà khảo cổ cũng tìm thấy nhiều bằng chứng về hoạt động giao thương sôi động, thậm chí là giao lưu hàng hải, cho thấy một xã hội phát triển rực rỡ, năng động và có sự kết nối với các nền văn hóa khác trong khu vực.",
      textEn: "The life of the **Dong Son** people was intrinsically linked to wet rice civilization; they were masters of rice cultivation and animal husbandry. They lived in fertile villages along rivers, skilled in bronze casting, crafting exquisite tools, weapons, and jewelry. Archaeologists have also found much evidence of vibrant trading activities, even maritime exchanges, revealing a brilliant, dynamic society actively connected with other cultures in the region.",
    },
    {
      title: "🏛️ Di sản và biểu tượng",
      titleEn: "🏛️ Legacy and Symbol",
      text: "Văn hóa **Đông Sơn** không chỉ là niềm tự hào của Việt Nam mà còn có ảnh hưởng sâu rộng sang nhiều quốc gia láng giềng ở Đông Nam Á. Ngày nay, chiếc **trống đồng Đông Sơn** đã trở thành biểu tượng quốc gia, được công nhận là Di sản văn hóa thế giới bởi **UNESCO**, là minh chứng sống động cho cội nguồn văn hóa lâu đời và rực rỡ của dân tộc Việt. Nó nhắc nhở mỗi người con đất Việt về một quá khứ hào hùng, về sự sáng tạo độc đáo của cha ông và ý chí dựng nước, giữ nước kiên cường.",
      textEn: "The **Dong Son** culture is not only a source of pride for Vietnam but also has a profound influence on many neighboring countries in Southeast Asia. Today, the **Dong Son bronze drum** has become a national symbol, recognized as a World Cultural Heritage by **UNESCO**, serving as a vivid testament to the ancient and brilliant cultural origins of the Vietnamese people. It reminds every Vietnamese descendent of a heroic past, the unique creativity of their ancestors, and the resilient will to build and defend the nation.",
    },
  
  ],

  "hist-1-10": [
    {
      title: "🏔️ Bối cảnh Bắc thuộc",
      titleEn: "🏔️ Context of Northern Domination",
      text: "Vào thế kỷ thứ 8, nước ta chìm dưới ách đô hộ tàn bạo của nhà **Đường**. Nhân dân **An Nam** phải gánh chịu sưu thuế nặng nề, lao dịch khổ sai triền miên. Các quan lại nhà Đường với sự tham lam và hà khắc đã bóc lột đến tận xương tủy, gây nên cuộc sống cùng cực cho người dân. Cuộc sống nô lệ đầy tủi nhục và sự áp bức chồng chất đã nung nấu trong lòng người Việt ngọn lửa căm thù, khát vọng tự do. Chính trong bối cảnh ấy, hai người anh hùng là **Mai Thúc Loan** và **Phùng Hưng** đã đứng lên phất cờ khởi nghĩa.",
      textEn: "In the 8th century, our country was submerged under the brutal rule of the **Tang** dynasty. The people of **An Nam** suffered heavy taxes and endless forced labor. Tang officials, with their greed and harshness, exploited the people to the bone, causing extreme hardship. This humiliating life of slavery and accumulated oppression ignited a fire of hatred and a longing for freedom in the hearts of the Vietnamese. It was in this context that two heroes, **Mai Thuc Loan** and **Phung Hung**, rose up to lead rebellions.",
    },

    {
      title: "⚔️ Mai Hắc Đế – Hoàng đế Đen",
      titleEn: "⚔️ The Black Emperor",
      text: "**Năm 722**, **Mai Thúc Loan** – xuất thân nghèo khó ở Hà Tĩnh, từng đi phu cống vải cho nhà Đường – đứng lên khởi nghĩa. Ông tập hợp hàng vạn người, **liên kết với Chăm Pa và Chân Lạp**, tự xưng **Mai Hắc Đế** (Hoàng đế Đen) vì nước da ngăm đen. Kinh đô đặt tại Vạn An (Nghệ An), nghĩa quân làm chủ đất nước trước khi nhà Đường cử **10 vạn quân** đàn áp.",
      textEn: "In **722**, **Mai Thuc Loan** – born poor in Ha Tinh, having toiled as a tribute laborer – rose in revolt. He rallied tens of thousands, **allied with Champa and Chenla**, and declared himself **Mai Hac De** (the Black Emperor) due to his dark complexion. His forces controlled the land before the Tang sent **100,000 troops** to suppress them.",
      imageUrl: maiThucLoan,
    },
    {
      title: "🐅 Phùng Hưng – Bố Cái Đại Vương",
      titleEn: "🐅 Phung Hung – The Father-Mother King",
      text: "Sau đó, **năm 791**, **Phùng Hưng** – hào trưởng giàu có, võ nghệ cao cường ở Đường Lâm – nổi dậy chống nhà Đường. Truyền thuyết kể ông có **sức mạnh phi thường**, từng đánh chết hổ bằng tay không! Phùng Hưng chiếm **phủ Tống Bình** (Hà Nội), cai trị 7 năm với lòng nhân từ. Khi mất, nhân dân tôn ông là **Bố Cái Đại Vương** – *'Vua Cha Mẹ'* – vì ông cai trị như cha mẹ yêu thương con cái.",
      textEn: "Later, in **791**, **Phung Hung** – a wealthy chieftain and martial arts master from Duong Lam – revolted against the Tang. Legend says he had **superhuman strength**, once killing a tiger with bare hands! He captured **Tong Binh** (Hanoi) and ruled for 7 years with benevolence. After death, the people honored him as **Bo Cai Dai Vuong** – *'Father-Mother King'* – for ruling like a loving parent.",
    },
    {
      title: "🏛️ Di sản - Ngọn lửa không tắt",
      titleEn: "🏛️ Legacy - An Unquenchable Flame",
      text: "Dù các cuộc khởi nghĩa của **Mai Thúc Loan** và **Phùng Hưng** không thể chấm dứt hoàn toàn ách đô hộ của nhà Đường, nhưng tinh thần quật cường của họ đã gieo mầm hy vọng, khẳng định ý chí độc lập bất diệt của dân tộc Việt. Các cuộc nổi dậy này chứng minh rằng dù bị áp bức đến đâu, ngọn lửa yêu nước luôn âm ỉ cháy và bùng lên mạnh mẽ khi có cơ hội. Hình ảnh **Mai Hắc Đế** và **Bố Cái Đại Vương** đã trở thành biểu tượng của lòng dũng cảm, truyền cảm hứng cho nhiều thế hệ sau tiếp tục đấu tranh giành lại chủ quyền.",
      textEn: "Although the uprisings of **Mai Thuc Loan** and **Phung Hung** could not completely end the Tang dynasty's domination, their resilient spirit sowed seeds of hope, affirming the indomitable will for freedom of the Vietnamese people. These revolts proved that no matter how oppressed, the flame of patriotism always smolders and ignites fiercely when given a chance. The images of **Mai Hac De** and **Bo Cai Dai Vuong** have become symbols of courage, inspiring many subsequent generations to continue fighting for sovereignty.",
    },
  
  ],

  // ==================== MONTH 2: GOLDEN DYNASTIES ====================

  "hist-2-1": [
    {
      title: "🏔️ Bối cảnh - Từ Hoa Lư đến Thăng Long",
      titleEn: "🏔️ Context - From Hoa Lư to Thăng Long",
      text: "Trước khi **Lý Công Uẩn** dời đô, kinh đô **Hoa Lư** (*Ninh Bình*) đã hoàn thành sứ mệnh lịch sử sau triều đại **Đinh** và **Tiền Lê**. Tuy nhiên, kinh thành này với địa thế hiểm trở, chật hẹp, không còn phù hợp để phát triển một quốc gia vững mạnh, mở rộng giao thương. Vị vua khai quốc của nhà **Lý** với tầm nhìn xa trông rộng, nhận thấy sự cấp thiết phải tìm một vị trí đắc địa hơn, nơi hội tụ linh khí đất trời, thuận lợi cho sự phồn vinh của muôn dân. Nỗi trăn trở về một kinh đô xứng tầm đã thôi thúc ông đưa ra quyết định lịch sử: rời đô về **Đại La**.",
      textEn: "Before **Lý Công Uẩn** moved the capital, **Hoa Lư** (*Ninh Bình*) had fulfilled its historical mission after the **Đinh** and **Early Lê** dynasties. However, with its rugged, narrow terrain, this capital was no longer suitable for developing a strong nation or expanding trade. The founding emperor of the **Lý** dynasty, with his far-sighted vision, recognized the urgent need for a more auspicious location, a place where the spiritual energy of heaven and earth converged, favorable for the prosperity of the people. The concern for a worthy capital spurred him to make the historic decision: to move the capital to **Đại La**.",
    },

    {
      title: "🐉 Chiếu dời đô",
      titleEn: "🐉 The Edict to Move the Capital",
      text: "**Năm 1009**, **Lý Công Uẩn** – một vị tướng tài năng xuất thân từ chùa – được triều thần tôn lên ngôi, lập ra nhà Lý. Một năm sau, ông ban **Chiếu dời đô** – bài văn nổi tiếng nhất trong lịch sử chính trị Việt Nam – quyết định rời kinh đô từ Hoa Lư (Ninh Bình) ra thành Đại La.",
      textEn: "In **1009**, **Ly Cong Uan** – a talented general raised in a Buddhist temple – was enthroned, founding the Ly Dynasty. One year later, he issued the **Edict to Move the Capital** – the most famous political document in Vietnamese history – relocating from Hoa Lu to Dai La Citadel.",
      imageUrl: thangLongDragon,
    },
    {
      title: "🏯 Thăng Long – Rồng bay lên",
      titleEn: "🏯 Thang Long – The Rising Dragon",
      text: "Truyền thuyết kể rằng khi thuyền rồng cập bến Đại La, bỗng **rồng vàng** hiện lên bay lượn trên trời cao – điềm lành vĩ đại! Vua liền đổi tên thành **Thăng Long** – *'Rồng bay lên'*. Nhà Lý trị vì **216 năm** (1009-1225), để lại di sản huy hoàng: **Văn Miếu** (1070) thờ Khổng Tử, **Quốc Tử Giám** (1076) – trường đại học đầu tiên của Việt Nam. Thăng Long từ đó trở thành trung tâm nghìn năm văn hiến – chính là **Hà Nội** ngày nay.",
      textEn: "Legend says that when the dragon boat arrived, a **golden dragon** appeared soaring across the sky – a magnificent omen! The king renamed the city **Thang Long** – *'Rising Dragon.'* The Ly Dynasty ruled for **216 years** (1009-1225), leaving magnificent legacies: the **Temple of Literature** (1070) and the **Imperial Academy** (1076) – Vietnam's first university. Thang Long became the millennial capital – today's **Hanoi**.",
    },
    {
      title: "🏛️ Di sản - Nghìn năm văn hiến",
      titleEn: "🏛️ Legacy - A Thousand Years of Civilization",
      text: "**Thăng Long** không chỉ là kinh đô mà còn là trái tim của nền văn minh Đại Việt suốt *hơn 1000 năm*. Từ đây, những công trình kiến trúc vĩ đại như **Văn Miếu – Quốc Tử Giám**, trường đại học đầu tiên của Việt Nam, được xây dựng, khẳng định tầm quan trọng của giáo dục. Ngày nay, **Hà Nội** vẫn giữ trọn vẹn hồn cốt của **Thăng Long**, là minh chứng sống động cho lịch sử vàng son, nơi lưu giữ bao giá trị văn hóa, tinh thần của dân tộc Việt. Mỗi con phố, dải đất đều thấm đẫm câu chuyện nghìn năm văn hiến không ngừng được bồi đắp.",
      textEn: "**Thăng Long** was not merely a capital but the very heart of Đại Việt civilization for *over 1000 years*. From here, grand architectural works like **Văn Miếu – Quốc Tử Giám**, Vietnam's first university, were built, affirming the importance of education. Today, **Hà Nội** fully retains the soul of **Thăng Long**, serving as a vivid testament to its golden history, preserving countless cultural and spiritual values of the Vietnamese people. Every street and piece of land is imbued with stories of a thousand years of continuously nurtured civilization.",
    },
  
  ],

  "hist-2-2": [
    {
      title: "🏔️ Bối cảnh - Mối đe dọa từ phương Bắc",
      titleEn: "🏔️ Context - The Threat from the North",
      text: "Dưới thời nhà **Lý**, đế quốc **Tống** phương Bắc luôn rình rập, gây hấn, muốn nuốt chửng Đại Việt. Các cuộc quấy nhiễu biên giới, động binh, cùng với những chính sách hà khắc đối với đất đai, tài nguyên ở vùng biên đã tạo nên một áp lực khủng khiếp. Tình hình căng thẳng đến mức **Lý Thường Kiệt** và triều đình nhận thức được rằng một cuộc xâm lược quy mô lớn chỉ còn là vấn đề thời gian. Chủ động ra tay để ngăn chặn họa xâm lăng đang cận kề là giải pháp duy nhất để bảo vệ chủ quyền và sự bình yên cho bờ cõi.",
      textEn: "Under the **Lý** dynasty, the northern **Song** empire constantly lurked and provoked, aiming to swallow Đại Việt. Border skirmishes, troop movements, and harsh policies regarding land and resources in border regions created immense pressure. The situation was so tense that **Lý Thường Kiệt** and the court realized a large-scale invasion was only a matter of time. Taking proactive action to prevent the imminent invasion was the only solution to protect sovereignty and peace for the nation.",
    },

    {
      title: "⚔️ Tiên phát chế nhân",
      titleEn: "⚔️ The Preemptive Strike",
      text: "**Lý Thường Kiệt** (1019-1105) – vị tướng thiên tài – biết rằng nhà Tống đang chuẩn bị xâm lược. Thay vì ngồi chờ, ông áp dụng chiến lược **'tiên phát chế nhân'** – đánh trước để giành thế chủ động. **Năm 1075**, ông dẫn **10 vạn quân** vượt biên giới, phá hủy căn cứ quân sự nhà Tống ở Ung Châu, Khâm Châu, Liêm Châu, rồi rút quân về – một đòn chí mạng khiến kẻ thù chưa kịp định thần.",
      textEn: "**Ly Thuong Kiet** (1019-1105) – a military genius – knew the Song Dynasty was preparing to invade. Instead of waiting, he employed **'preemptive strike'** strategy. In **1075**, he led **100,000 troops** across the border, destroying Song military bases at Yong Zhou, Qin Zhou, and Lian Zhou, then withdrew – a devastating blow before the enemy could react.",
      imageUrl: lyThuongKiet,
    },
    {
      title: "📜 Tuyên ngôn Độc lập đầu tiên",
      titleEn: "📜 The First Declaration of Independence",
      text: "**Năm 1077**, **30 vạn quân Tống** tràn sang trả thù. Lý Thường Kiệt xây phòng tuyến trên sông **Như Nguyệt**. Trong đêm khuya căng thẳng, từ đền thờ bên sông bỗng vang lên bài thơ bất hủ: *'Nam quốc sơn hà Nam đế cư, Tiệt nhiên định phận tại Thiên thư'* – **Tuyên ngôn Độc lập đầu tiên** của Việt Nam! Quân Tống nghe xong hồn bay phách lạc. Lý Thường Kiệt phản công, đại thắng, rồi **chủ động giảng hòa** – thể hiện tầm nhìn ngoại giao khôn khéo.",
      textEn: "In **1077**, **300,000 Song troops** invaded in retaliation. Ly Thuong Kiet fortified the **Nhu Nguyet River**. In a tense midnight, from a riverside temple rang out the immortal poem: *'Over mountains and rivers of the South, the Southern Emperor reigns'* – Vietnam's **first Declaration of Independence**! The Song troops panicked. Ly Thuong Kiet counterattacked, won decisively, then **proactively negotiated peace** – demonstrating brilliant diplomatic vision.",
    },
    {
      title: "🎯 Di sản - Bài học ngoại giao",
      titleEn: "🎯 Legacy - A Diplomatic Lesson",
      text: "Chiến công của **Lý Thường Kiệt** không chỉ là thắng lợi quân sự mà còn là một bài học ngoại giao sâu sắc, thể hiện trí tuệ linh hoạt của người Việt. Phương châm *'tiên phát chế nhân'* – chủ động tấn công để phòng ngự – đã được kết hợp nhuần nhuyễn với chính sách *'khoan thư sức dân, hòa hiếu với lân bang'*. Thay vì truy cùng diệt tận, ông đã chủ động gửi thư giảng hòa, mở ra con đường đàm phán, giữ gìn mối quan hệ hòa bình lâu dài. Đây là nền tảng cho nhiều sách lược đối ngoại sau này, khẳng định Việt Nam luôn ưa chuộng hòa bình nhưng sẵn sàng chiến đấu để bảo vệ độc lập.",
      textEn: "**Lý Thường Kiệt**'s victory was not just a military triumph but also a profound diplomatic lesson, demonstrating the flexible wisdom of the Vietnamese people. The strategy of *'tiên phát chế nhân'* – preemptive attack for defense – was subtly combined with the policy of *'recovering the people's strength and maintaining harmonious relations with neighbors'*. Instead of total annihilation, he proactively sent peace proposals, opening the path for negotiations and preserving long-term peaceful relations. This laid the foundation for many later foreign policy strategies, affirming that Vietnam always prefers peace but is ready to fight to protect its independence.",
    },
  
  ],

  "hist-2-3": [
    {
      title: "🌍 Đế chế lớn nhất thế giới",
      titleEn: "🌍 The World's Largest Empire",
      text: "Đế chế Nguyên Mông – **đế chế lớn nhất lịch sử nhân loại** – đã chinh phục gần như toàn bộ châu Á và một phần châu Âu: từ Trung Quốc, Ba Tư đến Nga, Hungary. Không ai chặn nổi kỵ binh Mông Cổ. Nhưng ba lần tấn công Đại Việt (*1258, 1285, 1288*), ba lần họ **thất bại thảm hại**.",
      textEn: "The Mongol Empire – the **largest empire in human history** – had conquered nearly all of Asia and parts of Europe. Nobody could stop the Mongol cavalry. Yet three times they attacked Dai Viet (*1258, 1285, 1288*), and three times they were **utterly defeated**.",
      imageUrl: tranMongol,
    },
    {
      title: "📝 Hịch tướng sĩ & Sát Thát",
      titleEn: "📝 The Proclamation & 'Kill the Mongols'",
      text: "Lần thứ hai (*1285*), **50 vạn quân Mông Cổ** tràn vào. **Trần Hưng Đạo** viết **'Hịch tướng sĩ'** – áng văn hào sảng lay động lòng người. Toàn quân xúc động đến mức **xăm hai chữ 'Sát Thát'** (Giết giặc Mông) lên cánh tay. Nghĩa quân áp dụng chiến thuật **'vườn không nhà trống'** – rút lui, cắt đứt lương thảo, rồi phản công khi giặc kiệt sức.",
      textEn: "The second time (*1285*), **500,000 Mongol troops** poured in. **Tran Hung Dao** wrote the **'Proclamation to Officers'** – a fiery masterpiece. Soldiers were so moved they **tattooed 'Sat That'** (Kill the Mongols) on their arms. They employed **'scorched earth'** tactics – retreating, cutting supply lines, then counterattacking when the enemy weakened.",
    },
    {
      title: "⚓ Bạch Đằng lần thứ ba",
      titleEn: "⚓ Bach Dang – The Third Time",
      text: "Lần thứ ba (*1288*), Trần Hưng Đạo lặp lại chiến thuật **cọc nhọn trên sông Bạch Đằng** – giống Ngô Quyền 350 năm trước. Hạm đội Mông Cổ bị tiêu diệt hoàn toàn, tướng **Ô Mã Nhi** bị bắt sống. Chiến thắng vang dội khiến Nguyên Mông **không bao giờ dám quay lại** – một kỳ tích mà cả thế giới phải thán phục.",
      textEn: "The third time (*1288*), Tran Hung Dao repeated the **iron-tipped stakes on the Bach Dang River** – mirroring Ngo Quyen 350 years earlier. The Mongol fleet was completely destroyed, general **Omar** captured alive. This resounding victory ensured the Mongols **never dared return** – a feat the entire world admires.",
    },
    {
      title: "🏛️ Di sản - Tinh thần Đông A",
      titleEn: "🏛️ Legacy - The Đông A Spirit",
      text: "Tinh thần **Đông A** – biểu tượng của nhà **Trần** – đã trở thành nguồn sức mạnh vô tận giúp Đại Việt ba lần đánh bại đế quốc Nguyên Mông hùng mạnh. Đó là tinh thần đoàn kết từ mọi tầng lớp nhân dân, từ **Hội nghị Diên Hồng** *năm 1284* với câu hỏi 'nên đánh hay nên hòa' vang vọng, đến kế sách 'vườn không nhà trống', tất cả tạo nên thế trận lòng dân vững chắc. Tinh thần này đã biến mỗi người dân thành một chiến binh, mỗi xóm làng thành một pháo đài, khắc sâu vào tâm trí người Việt bài học về sức mạnh của đại đoàn kết dân tộc trong mọi hoàn cảnh khó khăn.",
      textEn: "The **Đông A** spirit – the symbol of the **Trần** dynasty – became an endless source of strength that helped Đại Việt defeat the mighty Mongol Yuan empire three times. It was the spirit of unity from all strata of society, from the resounding question of 'fight or make peace' at the **Diên Hồng Conference** in *1284*, to the 'empty-field, empty-house' strategy, all creating a solid defense rooted in the people's hearts. This spirit transformed every citizen into a warrior, every village into a fortress, deeply imprinting on the Vietnamese mind the lesson of the power of national unity in all challenging circumstances.",
    },
  
  ],

  "hist-2-4": [
    {
      title: "💔 Bối cảnh - Đêm dài Minh thuộc",
      titleEn: "💔 Context - The Long Night of Ming Domination",
      text: "Sau sự sụp đổ của nhà **Hồ**, Đại Việt chìm trong *hai thập kỷ* đen tối dưới ách đô hộ của nhà **Minh** (*1407-1427*). Đây không chỉ là nỗi đau mất nước mà còn là sự tàn phá về văn hóa, tinh thần. Giặc **Minh** thực hiện chính sách 'diệt chủng văn hóa', đốt sách, cướp đoạt cổ vật, cấm đoán tiếng Việt, ép buộc phong tục tập quán Trung Quốc. Nhân dân bị bóc lột cùng cực, sống trong cảnh lầm than, oán hận chồng chất. Nỗi đau ấy trở thành ngọn lửa âm ỉ, thôi thúc những người con yêu nước đứng lên, mà tiêu biểu là khởi nghĩa **Lam Sơn** do **Lê Lợi** lãnh đạo.",
      textEn: "After the fall of the **Hồ** dynasty, Đại Việt plunged into *two decades* of darkness under **Ming** domination (*1407-1427*). This was not just the pain of losing the country, but also cultural and spiritual devastation. The **Ming** invaders carried out a policy of 'cultural genocide', burning books, looting artifacts, banning the Vietnamese language, and imposing Chinese customs. The people were exploited to the extreme, living in extreme suffering, with accumulated resentment. This pain became a smoldering fire, urging patriotic people to rise up, most notably the **Lam Sơn** uprising led by **Lê Lợi**.",
    },

    {
      title: "🔥 10 năm Lam Sơn",
      titleEn: "🔥 Ten Years at Lam Son",
      text: "**Năm 1407**, nhà Minh xâm lược, thực hiện chính sách **đồng hóa tàn bạo**: đốt sách, phá hủy văn hóa, bắt thợ giỏi. **Năm 1418**, **Lê Lợi** – hào trưởng vùng **Lam Sơn** (Thanh Hóa) – phất cờ khởi nghĩa. Những năm đầu cực kỳ gian khổ: quân ít, lương thiếu, nhiều lần suýt bị bắt. Có lần tướng **Lê Lai** phải **cải trang thành Lê Lợi**, xông vào giặc để đánh lạc hướng – hy sinh anh dũng để cứu chủ tướng.",
      textEn: "In **1407**, the Ming invaded with **brutal assimilation**: burning books, destroying culture, kidnapping artisans. In **1418**, **Le Loi** – a chieftain from **Lam Son** (Thanh Hoa) – raised the revolt banner. The early years were incredibly harsh. Once, general **Le Lai** had to **disguise himself as Le Loi**, charging into enemy lines as a decoy – sacrificing his life to save the leader.",
      imageUrl: leLoiLamSon,
    },
    {
      title: "📜 Bình Ngô Đại Cáo",
      titleEn: "📜 The Great Proclamation",
      text: "Mưu sĩ **Nguyễn Trãi** – thiên tài chính trị và quân sự – giúp Lê Lợi hoạch định chiến lược **'tâm công'** (đánh vào lòng người). Sau **10 năm** chiến đấu, nghĩa quân đại thắng trận **Chi Lăng – Xương Giang** (*1427*), tiêu diệt 10 vạn viện binh Minh. Lê Lợi lên ngôi, lập nhà Hậu Lê. Nguyễn Trãi viết **'Bình Ngô Đại Cáo'** – bản tuyên ngôn hùng hồn: *'Như nước Đại Việt ta từ trước, vốn xưng nền văn hiến đã lâu…'* – **Tuyên ngôn Độc lập thứ hai** của Việt Nam.",
      textEn: "Strategist **Nguyen Trai** – a political and military genius – devised the **'tam cong'** strategy (winning hearts and minds). After **10 years**, rebels won the decisive **Chi Lang – Xuong Giang** battles (*1427*). Le Loi founded the Later Le Dynasty. Nguyen Trai wrote the **'Great Proclamation'**: *'Our Dai Viet has long been a land of ancient civilization…'* – Vietnam's **second Declaration of Independence**.",
    },
    {
      title: "🏛️ Di sản - Nhà Hậu Lê và Nguyễn Trãi",
      titleEn: "🏛️ Legacy - The Later Lê Dynasty and Nguyễn Trãi",
      text: "Thắng lợi của khởi nghĩa giải phóng mở ra triều đại **Hậu Lê**, một trong những kỷ nguyên rực rỡ nhất trong lịch sử Việt Nam. Bên cạnh **Lê Lợi**, không thể không nhắc đến công lao to lớn của **Nguyễn Trãi**. Là một bậc đại anh hùng dân tộc, ông đã đóng góp không chỉ về mặt quân sự mà còn là người đề ra chiến lược ngoại giao, văn học vang dội. Tuy nhiên, cuộc đời **Nguyễn Trãi** khép lại bi thảm trong vụ án **Lệ Chi Viên** (*năm 1442*), để lại một vết thương lòng sâu sắc cho hậu thế, mãi mãi là uẩn khúc trong lịch sử, nhưng tài đức của ông vẫn sáng mãi.",
      textEn: "The victory of the liberation uprising inaugurated the **Later Lê** dynasty, one of the most brilliant eras in Vietnamese history. Besides **Lê Lợi**, the immense contributions of **Nguyễn Trãi** cannot be overlooked. As a great national hero, he contributed not only militarily but also devised brilliant diplomatic and literary strategies. However, **Nguyễn Trãi**'s life ended tragically in the **Lệ Chi Viên** incident (*1442*), leaving a deep wound for posterity, forever a historical enigma, yet his talent and virtue shine eternally.",
    },
  
  ],

  "hist-2-5": [
    {
      title: "👑 Bối cảnh - Vị vua anh minh",
      titleEn: "👑 Context - The Enlightened Monarch",
      text: "Lên ngôi sau những sóng gió của triều đình, **Lê Thánh Tông** (*trị vì 1460-1497*) đã tiếp nhận một nền tảng vững chắc từ các bậc tiền bối nhưng cũng đứng trước nhiều thách thức. Ông là một vị vua thông minh, uyên bác, thấu hiểu lòng dân và ôm ấp hoài bão xây dựng một quốc gia cường thịnh. Với tầm nhìn kiệt xuất, **Lê Thánh Tông** đã quyết tâm củng cố quyền lực tập trung, chấn chỉnh bộ máy hành chính, và thúc đẩy các cải cách toàn diện trên mọi lĩnh vực, từ pháp luật, giáo dục đến quân sự, tạo tiền đề cho một thời đại vàng son.",
      textEn: "Ascending the throne after court turbulence, **Lê Thánh Tông** (*reigned 1460-1497*) inherited a strong foundation from his predecessors but also faced many challenges. He was an intelligent, learned monarch, understanding the people's will and harboring ambitions to build a prosperous nation. With outstanding vision, **Lê Thánh Tông** was determined to consolidate centralized power, rectify the administrative apparatus, and promote comprehensive reforms in all areas, from law and education to military, setting the stage for a golden age.",
    },

    {
      title: "⚖️ Bộ luật Hồng Đức",
      titleEn: "⚖️ The Hong Duc Legal Code",
      text: "**Lê Thánh Tông** (trị vì *1460-1497*) – vị vua anh minh nhất nhà Hậu Lê – ban hành **Bộ luật Hồng Đức**, bộ luật hoàn chỉnh và tiến bộ nhất thời phong kiến. Điều đặc biệt: luật có nhiều điều khoản **bảo vệ quyền phụ nữ, trẻ em và người yếu thế** – tiến bộ hơn nhiều so với luật pháp phương Tây cùng thời. Ông chia cả nước thành **13 đạo**, tổ chức thi cử đều đặn để tuyển chọn nhân tài.",
      textEn: "**Le Thanh Tong** (reigned *1460-1497*) – the most enlightened Later Le king – issued the **Hong Duc Legal Code**, the most complete and progressive feudal code. Remarkably, it included provisions **protecting women's rights, children, and the vulnerable** – far more advanced than contemporary Western law. He divided the country into **13 regions** and organized regular examinations to select talent.",
      imageUrl: leThanhTong,
    },
    {
      title: "🌟 Thời kỳ hoàng kim",
      titleEn: "🌟 The Golden Age",
      text: "Lê Thánh Tông còn là **nhà thơ tài hoa**, sáng lập hội thơ **Tao Đàn** với 28 thành viên. Dưới triều ông, Đại Việt **mở rộng lãnh thổ** về phía nam, kinh tế phồn thịnh, văn hóa rực rỡ như ánh mặt trời giữa trưa. Đây được xem là **thời kỳ hoàng kim nhất** trong lịch sử phong kiến Việt Nam – khi công lý, văn hóa và thịnh vượng hòa quyện.",
      textEn: "Le Thanh Tong was also a **gifted poet**, founding the **Tao Dan** poetry society with 28 members. Under his reign, Dai Viet **expanded southward**, the economy prospered, and culture flourished like the noonday sun. This is regarded as the **absolute golden age** of feudal Vietnamese history – when justice, culture, and prosperity harmonized.",
    },
    {
      title: "⚖️ Di sản - Ảnh hưởng lâu dài",
      titleEn: "⚖️ Legacy - Lasting Impact",
      text: "**Bộ luật Hồng Đức** không chỉ là một đỉnh cao pháp quyền mà còn là biểu tượng của tinh thần thượng tôn pháp luật thời **Lê Thánh Tông**. Những điều khoản tiến bộ về quyền phụ nữ, bảo vệ tài sản, và sự minh bạch trong xét xử đã vượt xa nhiều hệ thống pháp luật đương thời. Ảnh hưởng của nó kéo dài đến các triều đại sau, đặt nền móng cho nền pháp chế Việt Nam. Cùng với mở rộng lãnh thổ về phía Nam, các cải cách của ông đã định hình một Đại Việt hùng cường, để lại dấu ấn sâu đậm trong lịch sử dân tộc và kiến tạo một di sản pháp lý trường tồn.",
      textEn: "The **Hồng Đức Code** was not only a legal pinnacle but also a symbol of the rule of law during **Lê Thánh Tông**'s era. Its progressive provisions on women's rights, property protection, and judicial transparency far surpassed many contemporary legal systems. Its influence extended to later dynasties, laying the foundation for Vietnamese jurisprudence. Along with territorial expansion southward, his reforms shaped a powerful Đại Việt, leaving a deep mark on national history and creating an enduring legal legacy.",
    },
  
  ],

  "hist-2-6": [
    {
      title: "👑 Bối cảnh - Con người Trần Quốc Tuấn",
      titleEn: "👑 Context - The Man Trần Quốc Tuấn",
      text: "**Trần Quốc Tuấn**, hay **Hưng Đạo Đại Vương**, sinh ra trong hoàng tộc, là cháu nội của **Trần Thái Tổ**. Ông từng đối mặt với mối thù gia tộc sâu sắc với Thượng hoàng **Trần Thánh Tông** và vua **Trần Nhân Tông**. Thế nhưng, vượt lên trên mọi hiềm khích cá nhân, ông đã đặt lợi ích của quốc gia lên trên hết, sẵn sàng cống hiến tài năng và trí lực cho sự nghiệp giữ nước. Tình yêu nước và ý chí phụng sự dân tộc đã khiến ông trở thành một tấm gương sáng ngời về lòng đại nghĩa, sự hy sinh vì đại cục, được muôn đời ngưỡng vọng.",
      textEn: "**Trần Quốc Tuấn**, also known as **Prince Hưng Đạo**, was born into the royal family, a grandson of **Trần Thái Tổ**. He once faced a deep family feud with Emperor Emeritus **Trần Thánh Tông** and King **Trần Nhân Tông**. However, rising above all personal grudges, he prioritized the national interest, ready to dedicate his talent and intellect to the cause of defending the country. His patriotism and will to serve the nation made him a shining example of great righteousness, self-sacrifice for the greater good, revered for generations.",
    },

    {
      title: "📜 Hịch tướng sĩ",
      titleEn: "📜 The Proclamation to Officers",
      text: "**Trần Hưng Đạo** (tên thật Trần Quốc Tuấn, *1228-1300*) – danh tướng vĩ đại nhất lịch sử Việt Nam. Trước cuộc xâm lược lần hai (*1285*), ông viết **'Hịch tướng sĩ'**: *'Ta thường tới bữa quên ăn, nửa đêm vỗ gối, ruột đau như cắt, nước mắt đầm đìa; chỉ căm tức chưa xé xác quân thù…'* Lời hịch cháy bỏng khiến toàn quân **thích hai chữ 'Sát Thát'** (Giết giặc Mông) lên cánh tay – thể hiện quyết tâm sống chết với kẻ thù.",
      textEn: "**Tran Hung Dao** (born Tran Quoc Tuan, *1228-1300*) – Vietnam's greatest military commander. Before the second Mongol invasion (*1285*), he wrote the **'Proclamation to Officers'**: *'I often forget meals, pound my pillow at midnight, tears streaming; burning with fury that I have not yet torn the enemy apart…'* The entire army **tattooed 'Sat That'** (Kill the Mongols) on their arms.",
      imageUrl: tranHungDao,
    },
    {
      title: "🛡️ Di huấn muôn đời",
      titleEn: "🛡️ An Eternal Legacy",
      text: "Chiến lược của ông vô cùng **linh hoạt**: khi giặc mạnh thì rút lui bảo toàn, khi giặc kiệt sức thì phản công dữ dội. Ông tiên phong áp dụng **chiến tranh nhân dân** – toàn dân đánh giặc. Trước khi qua đời, khi vua hỏi kế giữ nước, ông để lại lời dặn bất hủ: *'Khoan thư sức dân để làm kế sâu rễ bền gốc – đó là thượng sách giữ nước.'* Lời dặn ấy vẫn còn nguyên giá trị cho đến ngày nay.",
      textEn: "His strategy was **remarkably flexible**: retreating when the enemy was strong, counterattacking when they weakened. He pioneered **people's warfare**. Before death, when the king asked for national defense advice, he left immortal words: *'Be lenient with the people to build deep roots and strong foundations – that is the supreme strategy.'* These words remain relevant today.",
    },
    {
      title: "🌟 Di sản - Vị thánh trong lòng dân",
      titleEn: "🌟 Legacy - A Saint in the People's Hearts",
      text: "**Trần Hưng Đạo** không chỉ là một vị tướng lỗi lạc mà còn được nhân dân suy tôn là Đức Thánh Trần, một vị thánh hộ quốc an dân. Hàng trăm đền thờ, miếu mạo trên khắp đất nước, đặc biệt là **Kiếp Bạc** (*Hải Dương*), là minh chứng sống động cho lòng thành kính của người Việt. Tên tuổi và công lao của ông đã vượt ra khỏi biên giới, được thế giới công nhận là một trong 10 danh tướng vĩ đại nhất mọi thời đại. Mỗi khi đất nước lâm nguy, hình ảnh đức **Thánh Trần** lại hiện lên như một nguồn động lực, là niềm tin bất diệt trong tâm hồn dân tộc.",
      textEn: "**Trần Hưng Đạo** was not only a brilliant general but also venerated by the people as Saint Trần, a guardian saint of the nation. Hundreds of temples and shrines across the country, especially **Kiếp Bạc** (*Hải Dương*), are vivid testaments to the reverence of the Vietnamese people. His name and contributions have transcended borders, recognized worldwide as one of the 10 greatest generals of all time. Whenever the nation faces peril, the image of Saint Trần resurfaces as a source of motivation, an eternal faith in the national soul.",
    },
  
  ],

  "hist-2-7": [
    {
      title: "💔 Bối cảnh - Nhà Trần suy vong",
      titleEn: "💔 Context - The Decline of the Trần Dynasty",
      text: "Cuối thế kỷ *XIV*, nhà **Trần** chìm sâu trong khủng hoảng. Vua yếu, quan tham, quyền thần thao túng triều chính, khiến lòng dân ly tán, quốc khố cạn kiệt. Những cuộc khởi nghĩa nông dân nổ ra khắp nơi, báo hiệu sự suy yếu không thể cứu vãn. Trong bối cảnh ấy, **Hồ Quý Ly**, với tài năng và tham vọng lớn, đã từng bước thâu tóm quyền lực. Ông nhận thấy sự cần thiết phải cải cách triệt để để vực dậy đất nước, dù điều đó có nghĩa là phải đoạn tuyệt với một triều đại đã suy tàn, mở đường cho những thay đổi đầy kịch tính.",
      textEn: "By the late *14th century*, the **Trần** dynasty was deeply mired in crisis. Weak kings, corrupt officials, and powerful regents manipulated the court, leading to widespread popular discontent and a depleted national treasury. Peasant uprisings erupted everywhere, signaling an irreversible decline. In this context, **Hồ Quý Ly**, with great talent and ambition, gradually seized power. He recognized the urgent need for comprehensive reforms to revive the nation, even if it meant breaking with a decaying dynasty, paving the way for dramatic changes.",
    },

    {
      title: "💰 Nhà cải cách đi trước thời đại",
      titleEn: "💰 A Reformer Ahead of His Time",
      text: "**Hồ Quý Ly** (*1336-1407*) – nhân vật gây tranh cãi nhất lịch sử Việt Nam. Dù **cướp ngôi** nhà Trần (*năm 1400*), ông lại thực hiện những cải cách cách mạng: phát hành **tiền giấy** (đầu tiên ở Đông Nam Á!), hạn chế ruộng đất quý tộc, cải cách giáo dục sang **chữ Nôm**, xây **thành nhà Hồ** bằng đá khổng lồ (nay là Di sản UNESCO).",
      textEn: "**Ho Quy Ly** (*1336-1407*) – Vietnam's most controversial figure. Despite **usurping** the Tran throne (*1400*), he implemented revolutionary reforms: issuing **paper currency** (first in Southeast Asia!), limiting aristocratic land, reforming education to **Nom script**, and building the massive **Ho Citadel** (now UNESCO World Heritage).",
      imageUrl: hoQuyLy,
    },
    {
      title: "⚡ Thất bại và bài học",
      titleEn: "⚡ Failure and Lessons",
      text: "Nhiều cải cách **quá vội vàng** khiến lòng dân chưa thuận. Nhà Minh lấy cớ *'phù Trần diệt Hồ'* kéo quân sang. Hồ Quý Ly thua trận, bị bắt đưa về Trung Quốc (*1407*). Lịch sử đánh giá ông vừa là **kẻ cướp ngôi** vừa là **nhà cải cách tiên phong** – một bài học muôn đời: ý tưởng hay chưa đủ, còn cần **lòng dân** ủng hộ.",
      textEn: "Many reforms were **too hasty**, failing to win popular support. The Ming used the pretext of *'supporting the Tran'* to invade. Ho Quy Ly was captured (*1407*). History judges him as both **usurper** and **visionary reformer** – an eternal lesson: good ideas aren't enough, you also need **the people's hearts**.",
    },
    {
      title: "🏛️ Di sản - Thành nhà Hồ UNESCO",
      titleEn: "🏛️ Legacy - Hồ Citadel UNESCO",
      text: "Bất chấp những tranh cãi về vai trò và số phận của ông, **Hồ Quý Ly** đã để lại một di sản kiến trúc độc đáo – **Thành nhà Hồ** ở **Thanh Hóa**. Công trình này, với kỹ thuật xây dựng đá khổng lồ, đã được **UNESCO** công nhận là Di sản Văn hóa Thế giới *năm 2011*, minh chứng cho trình độ và sự sáng tạo đỉnh cao của kiến trúc Việt Nam thời bấy giờ. Ngày nay, các nhà sử học nhìn nhận lại vai trò của ông như một nhà cải cách táo bạo, dù thất bại nhưng đã để lại nhiều bài học quý giá và dấu ấn không thể phủ nhận trong dòng chảy lịch sử dân tộc.",
      textEn: "Despite controversies surrounding his role and fate, **Hồ Quý Ly** left a unique architectural legacy – the **Hồ Citadel** in **Thanh Hóa**. This structure, built with massive stone techniques, was recognized by **UNESCO** as a World Cultural Heritage site in *2011*, demonstrating the peak of Vietnamese architectural skill and creativity at the time. Today, historians re-evaluate his role as a bold reformer who, despite his failure, left behind valuable lessons and an undeniable mark on the nation's historical trajectory.",
    },
  
  ],

  "hist-2-8": [
    {
      title: "🌱 Bối cảnh - Khát vọng giáo dục",
      titleEn: "🌱 Context - Aspiration for Education",
      text: "Ngay từ những ngày đầu dựng nước, các vị vua nhà **Lý** đã sớm nhận ra tầm quan trọng của việc bồi dưỡng nhân tài để xây dựng và quản lý đất nước. Khát vọng phát triển giáo dục không chỉ hướng đến việc đào tạo quan lại mà còn là nâng cao dân trí, hình thành một xã hội văn minh. Việc thành lập **Văn Miếu** (*năm 1070*) và sau đó là **Quốc Tử Giám** (*năm 1076*) chính là minh chứng hùng hồn cho tầm nhìn ấy. Đây là nơi hội tụ tinh hoa tri thức, sản sinh ra những bậc hiền tài, làm rường cột cho quốc gia Đại Việt phồn vinh.",
      textEn: "From the earliest days of nation-building, the **Lý** dynasty emperors quickly recognized the importance of nurturing talented individuals to build and administer the country. The aspiration for educational development was not just about training officials but also about enlightening the populace and forming a civilized society. The establishment of **Văn Miếu** (*1070*) and later **Quốc Tử Giám** (*1076*) is a powerful testament to this vision. This was a place where intellectual elites gathered, producing brilliant scholars who served as pillars for the prosperous Đại Việt nation.",
    },

    {
      title: "🏛️ Nơi thờ Khổng Tử",
      titleEn: "🏛️ Honoring Confucius",
      text: "**Năm 1070**, vua Lý Thánh Tông cho xây **Văn Miếu** – nơi thờ Khổng Tử và các bậc hiền triết. Sáu năm sau (*1076*), vua Lý Nhân Tông lập **Quốc Tử Giám** ngay bên cạnh – **trường đại học đầu tiên** của Việt Nam, chuyên đào tạo nhân tài cho đất nước. Trải qua các triều đại, nơi đây đã đào tạo hàng ngàn tiến sĩ phục vụ triều đình.",
      textEn: "In **1070**, King Ly Thanh Tong built the **Temple of Literature** to honor Confucius. Six years later (*1076*), King Ly Nhan Tong established the **Imperial Academy** beside it – Vietnam's **first university**, training talent for the nation. Across dynasties, it produced thousands of doctoral scholars serving the court.",
      imageUrl: vanMieu,
    },
    {
      title: "🐢 82 bia tiến sĩ",
      titleEn: "🐢 82 Doctoral Stelae",
      text: "**82 tấm bia tiến sĩ** dựng từ *1442 đến 1779*, ghi danh **1.307 vị tiến sĩ** qua 82 kỳ thi. Mỗi tấm bia đặt trên lưng **rùa đá** – tượng trưng cho sự trường tồn của tri thức. **Năm 2010**, UNESCO công nhận 82 bia tiến sĩ là **Di sản Tư liệu Thế giới**. Ngày nay, mỗi mùa thi, hàng ngàn học sinh đến đây sờ đầu rùa đá để **lấy hên** – truyền thống hiếu học nghìn năm vẫn sống mãi.",
      textEn: "**82 doctoral stelae** erected from *1442 to 1779* record **1,307 scholars** from 82 examinations. Each stele stands on a **stone turtle** symbolizing knowledge's permanence. In **2010**, UNESCO recognized them as **Memory of the World**. Today, each exam season, thousands of students rub the turtles' heads for **good luck** – a thousand-year scholarly tradition lives on.",
    },
    {
      title: "🐘 Di sản - Biểu tượng giáo dục Việt Nam",
      titleEn: "🐘 Legacy - Symbol of Vietnamese Education",
      text: "Ngày nay, **Văn Miếu – Quốc Tử Giám** không chỉ là một di tích lịch sử mà còn là biểu tượng sống động của truyền thống hiếu học, tôn sư trọng đạo của dân tộc Việt Nam. Hàng năm, nơi đây đón hàng triệu lượt du khách và học sinh, sinh viên đến chiêm ngưỡng, tìm hiểu và cầu may mắn trong học tập. Hình ảnh các bia tiến sĩ uy nghi, cùng với kiến trúc cổ kính, đã trở thành dấu ấn đặc trưng của **Hà Nội**, nhắc nhở mỗi thế hệ về giá trị vĩnh cửu của tri thức và sự cống hiến cho đất nước, là ngọn đuốc soi đường cho khát vọng học tập không ngừng.",
      textEn: "Today, **Văn Miếu – Quốc Tử Giám** is not only a historical relic but also a living symbol of the Vietnamese people's tradition of valuing learning and respecting teachers. Annually, it welcomes millions of tourists and students who come to admire, learn, and seek good fortune in their studies. The majestic steles celebrating doctorate holders, alongside the ancient architecture, have become a distinctive hallmark of **Hà Nội**, reminding every generation of the eternal value of knowledge and dedication to the nation, acting as a guiding light for unceasing educational aspirations.",
    },
  
  ],

  "hist-2-9": [
    {
      title: "💔 Bối cảnh - Nỗi đau chia cắt",
      titleEn: "💔 Context - The Pain of Division",
      text: "Hơn *hai thế kỷ* **Trịnh-Nguyễn phân tranh** (*thế kỷ 17 - 18*) là một vết thương sâu sắc trong lịch sử dân tộc. Đất nước bị chia cắt thành **Đàng Ngoài** (do chúa **Trịnh** cai quản) và **Đàng Trong** (chúa **Nguyễn** cai quản), ngăn cách bởi sông **Gianh**. Những cuộc chiến nồi da xáo thịt kéo dài đã gieo rắc bao đau thương, mất mát cho người dân, đình trệ sự phát triển của quốc gia. Các thế lực ngoại bang, đặc biệt là thương nhân và giáo sĩ phương Tây, lợi dụng tình hình chia cắt để thâm nhập, càng làm phức tạp thêm cục diện chính trị và xã hội Đại Việt.",
      textEn: "Over *two centuries* of **Trịnh-Nguyễn conflict** (*17th - 18th centuries*) was a deep wound in national history. The country was divided into **Đàng Ngoài** (ruled by the **Trịnh** lords) and **Đàng Trong** (ruled by the **Nguyễn** lords), separated by the **Gianh** River. Prolonged internecine wars inflicted immense suffering and loss on the people, hindering national development. Foreign powers, particularly Western merchants and missionaries, exploited the division to penetrate, further complicating Đại Việt's political and social landscape.",
    },

    {
      title: "🗡️ Đất nước chia đôi",
      titleEn: "🗡️ A Nation Divided",
      text: "Từ đầu thế kỷ 17, Việt Nam bị xé làm hai bởi cuộc tranh giành quyền lực: **chúa Trịnh** cai trị miền Bắc (*Đàng Ngoài*), **chúa Nguyễn** cai trị miền Nam (*Đàng Trong*). Sông **Gianh** (Quảng Bình) trở thành ranh giới chia đôi đất nước suốt gần **200 năm** (1627-1789). Vua Lê vẫn tồn tại nhưng thực chất chỉ là **bù nhìn** – quyền lực thực sự nằm trong tay hai chúa.",
      textEn: "From the early 17th century, Vietnam was torn in two by a power struggle: **Trinh Lords** ruled the North (*Dang Ngoai*), **Nguyen Lords** ruled the South (*Dang Trong*). The **Gianh River** (Quang Binh) became the border for nearly **200 years** (1627-1789). The Le king was merely a **figurehead** – real power lay with the two lords.",
    },
    {
      title: "⛵ Hội An – Thương cảng quốc tế",
      titleEn: "⛵ Hoi An – International Trading Port",
      text: "Dù chiến tranh liên miên, mỗi miền phát triển theo hướng riêng. Đàng Trong mở mang lãnh thổ về phía nam, giao thương với **Nhật Bản, Bồ Đào Nha, Hà Lan**. **Hội An** (Quảng Nam) trở thành thương cảng quốc tế sầm uất – nơi lái buôn từ khắp châu Á và châu Âu tụ hội. Cuộc phân tranh chỉ kết thúc khi phong trào **Tây Sơn** nổi lên như vũ bão, đánh đổ cả chúa Nguyễn, chúa Trịnh và vua Lê.",
      textEn: "Despite constant war, each region developed uniquely. Dang Trong expanded south, trading with **Japan, Portugal, and the Netherlands**. **Hoi An** became a thriving international port where merchants from across Asia and Europe gathered. The civil war only ended when the **Tay Son** movement swept in, overthrowing both lords and the Le king.",
      imageUrl: hoiAnTrade,
    },
    {
      title: "🏛️ Di sản - Hội An ngày nay",
      titleEn: "🏛️ Legacy - Hội An Today",
      text: "**Hội An**, ngày nay là Di sản Thế giới được **UNESCO** công nhận, là minh chứng sống động cho một giai đoạn lịch sử đầy biến động nhưng cũng rất huy hoàng. Nơi đây từng là thương cảng quốc tế sầm uất nhất **Đàng Trong**, hội tụ nền văn hóa đa dạng từ Nhật Bản, Trung Quốc và phương Tây. Với những ngôi nhà cổ, phố phường rêu phong và kiến trúc độc đáo, **Hội An** còn là bài học về sự giao thoa văn hóa, vượt qua mọi chia cắt chính trị để trở thành điểm đến hòa bình, nơi quá khứ và hiện tại hòa quyện, kể câu chuyện về sự bền bỉ và sáng tạo của con người.",
      textEn: "**Hội An**, now a **UNESCO** World Heritage site, is a vivid testament to a tumultuous yet glorious historical period. It was once the busiest international trading port in **Đàng Trong**, where diverse cultures from Japan, China, and the West converged. With its ancient houses, moss-covered streets, and unique architecture, **Hội An** also serves as a lesson in cultural exchange, overcoming political divisions to become a peaceful destination where past and present blend, telling a story of human resilience and creativity.",
    },
  
  ],

  "hist-2-10": [
    {
      title: "🏔️ Bối cảnh - Cuộc kháng chiến chống Minh",
      titleEn: "🏔️ Context - The Resistance against the Ming",
      text: "Câu chuyện **Hồ Gươm** gắn liền với khởi nghĩa **Lam Sơn**, diễn ra trong bối cảnh toàn dân đang oằn mình dưới ách đô hộ của nhà **Minh**. Quân **Minh** cai trị hà khắc, bóc lột cạn kiệt tài nguyên, đàn áp văn hóa, khiến lòng dân sục sôi căm hờn. Trong tình cảnh 'ngàn cân treo sợi tóc', khi lực lượng nghĩa quân còn non yếu, **Lê Lợi** cùng tướng sĩ đã phải vượt qua muôn vàn gian khó tại **Lam Sơn** (*Thanh Hóa*). Thanh gươm thần huyền thoại xuất hiện như một lời hiệu triệu, củng cố ý chí chiến đấu, khẳng định ý chí quật cường của dân tộc trong cuộc chiến giành lại độc lập.",
      textEn: "The **Hồ Gươm** story is closely tied to the **Lam Sơn** uprising, taking place as the entire nation groaned under **Ming** occupation. The **Ming** army ruled harshly, depleting resources, and suppressing culture, igniting intense hatred among the people. In this 'hanging by a thread' situation, with the rebel forces still weak, **Lê Lợi** and his generals had to overcome countless hardships in **Lam Sơn** (*Thanh Hóa*). The legendary magical sword appeared as a rallying cry, strengthening the will to fight and affirming the nation's indomitable spirit in the struggle for independence.",
    },

    {
      title: "⚔️ Thanh gươm Thuận Thiên",
      titleEn: "⚔️ The Sword of Heaven's Will",
      text: "Truyền thuyết kể rằng trong cuộc kháng chiến chống nhà Minh, **Long Vương** đã ban cho Lê Lợi một thanh gươm thần qua **Rùa Vàng**. Trên lưỡi gươm khắc hai chữ **'Thuận Thiên'** (*thuận theo ý trời*), phát sáng rực rỡ trong đêm tối. Với thanh gươm thần, Lê Lợi bách chiến bách thắng suốt 10 năm, cuối cùng đuổi sạch quân Minh.",
      textEn: "Legend tells that during the resistance against the Ming, the **Dragon King** gifted Le Loi a divine sword through the **Golden Turtle**. Engraved with **'Thuan Thien'** (*By Heaven's Will*), the sword glowed brilliantly in darkness. With it, Le Loi fought invincibly for 10 years, ultimately driving out the Ming.",
      imageUrl: hoGuomLegend,
    },
    {
      title: "🐢 Trả gươm – Hồ Hoàn Kiếm",
      titleEn: "🐢 Returning the Sword – Hoan Kiem Lake",
      text: "Sau khi lên ngôi, Lê Lợi dạo thuyền trên **hồ Lục Thủy** giữa lòng Thăng Long. Bỗng một **con rùa vàng khổng lồ** nổi lên mặt nước: *'Xin bệ hạ trả gươm lại cho Long Vương!'* Thanh gươm bay khỏi tay vua, Rùa Vàng ngậm gươm lặn xuống đáy hồ biến mất. Từ đó, hồ mang tên **Hồ Hoàn Kiếm** (*Hồ trả gươm*). Ngày nay, **Tháp Rùa** cổ kính giữa hồ là **biểu tượng thiêng liêng nhất** của thủ đô Hà Nội.",
      textEn: "After coronation, Le Loi took a boat ride on **Luc Thuy Lake** in Thang Long's heart. Suddenly, a **giant golden turtle** surfaced: *'Your Majesty, please return the sword!'* The sword flew from his hand; the turtle caught it and vanished into the depths. The lake was renamed **Hoan Kiem** (*Returned Sword Lake*). Today, the ancient **Turtle Tower** at its center is **Hanoi's most sacred symbol**.",
    },
    {
      title: "🐘 Di sản - Biểu tượng Hà Nội",
      titleEn: "🐘 Legacy - Symbol of Hà Nội",
      text: "**Hồ Hoàn Kiếm** và **Tháp Rùa** ngày nay không chỉ là thắng cảnh du lịch mà còn là trái tim, là biểu tượng linh thiêng của thủ đô **Hà Nội**. Truyền thuyết **Trả gươm** đã gieo vào lòng người Việt niềm tin mãnh liệt vào chính nghĩa, vào sự phù hộ của thần linh cho những ai biết đoàn kết, chiến đấu vì độc lập, hòa bình. Hồ Gươm trở thành không gian văn hóa, nơi mỗi con người Hà Nội tìm thấy sự bình yên và tự hào về lịch sử. Hình ảnh rùa vàng và thanh gươm thần mãi mãi là biểu tượng cho khát vọng hòa bình và công lý của dân tộc Việt Nam.",
      textEn: "**Hoàn Kiếm Lake** and **Turtle Tower** are not merely tourist attractions today, but also the heart and sacred symbol of the capital **Hà Nội**. The legend of **Returning the Sword** has instilled in the Vietnamese people a strong belief in righteousness, and in divine blessings for those who unite and fight for independence and peace. **Hoàn Kiếm Lake** has become a cultural space where every Hà Nội resident finds peace and pride in their history. The image of the golden turtle and the magical sword will forever symbolize the Vietnamese people's aspiration for peace and justice.",
    },
  
  ],

  // ==================== MONTH 3: MODERN HISTORY ====================

  "hist-3-1": [
    {
      title: "Bối cảnh - Tây Sơn Tam Kiệt",
      titleEn: "Context - The Tây Sơn Triad",
      text: "Trên dải đất miền Trung khô cằn, ba anh em **Nguyễn Nhạc**, **Nguyễn Huệ** và **Nguyễn Lữ** đã dấy lên ngọn cờ khởi nghĩa áo vải, thắp sáng hy vọng cho muôn dân. Từ một cuộc nổi dậy của nông dân ở ấp Tây Sơn, họ đã viết nên những trang sử chói lọi, thách thức cả hai thế lực **Lê – Trịnh** ở Đàng Ngoài và **Nguyễn** ở Đàng Trong, mở ra một kỷ nguyên mới đầy biến động cho **Đại Việt** vào khoảng *những năm 1770*.",
      textEn: "In the arid central region, the three brothers **Nguyễn Nhạc**, **Nguyễn Huệ**, and **Nguyễn Lữ** raised the banner of the peasant uprising, igniting hope for the populace. From a farmer's rebellion in Tây Sơn hamlet, they penned glorious historical chapters, challenging both the **Lê – Trịnh** power in the North and **Nguyễn** in the South, ushering in a tumultuous new era for **Đại Việt** around *the 1770s*.",
    },

    {
      title: "🐘 Hoàng đế áo vải",
      titleEn: "🐘 The Peasant Emperor",
      text: "Cuối năm **1788**, vua Lê Chiêu Thống cầu cứu nhà Thanh. Tôn Sĩ Nghị dẫn **29 vạn quân** tràn vào chiếm Thăng Long. Giữa cơn nguy, **Nguyễn Huệ** – vị anh hùng áo vải đất **Tây Sơn** (Bình Định) – lập tức lên ngôi Hoàng đế, lấy hiệu **Quang Trung**, rồi **thần tốc hành quân** hơn 600km từ Phú Xuân ra Bắc chỉ trong khoảng 40 ngày, vừa đi vừa tuyển quân.",
      textEn: "In late **1788**, the Le king invited the Qing. Sun Shiyi led **290,000 troops** into Thang Long. Amid crisis, **Nguyen Hue** – the peasant hero from **Tay Son** (Binh Dinh) – proclaimed himself Emperor **Quang Trung** and **lightning-marched** over 600km from Phu Xuan northward in about 40 days, recruiting soldiers along the way.",
      imageUrl: quangTrung,
    },
    {
      title: "🔥 Đại phá đêm giao thừa",
      titleEn: "🔥 The Tet Eve Blitzkrieg",
      text: "**Đêm 30 Tết** Kỷ Dậu (*1789*), khi quân Thanh đang mở tiệc ăn Tết, Quang Trung bất ngờ **tổng tấn công**. Ông chia quân 5 đạo, đánh đồng loạt Hà Hồi, Ngọc Hồi, Đống Đa. Tại Ngọc Hồi, Quang Trung đích thân **cưỡi voi chỉ huy**, cho quân lấy rơm cuốn quanh ván gỗ làm khiên. Tướng giặc **Sầm Nghi Đống** tự vẫn, **Tôn Sĩ Nghị** bỏ chạy không kịp mặc giáp. Chỉ trong **5 ngày**, 29 vạn quân Thanh bị đánh tan – một trong những **chiến thắng chớp nhoáng vĩ đại nhất** lịch sử quân sự thế giới.",
      textEn: "On **Tet Eve** (*1789*), while Qing troops feasted, Quang Trung launched a **total surprise assault** in 5 columns. He personally **rode an elephant** into battle at Ngoc Hoi. Qing general **Sam Nghi Dong** hanged himself; **Sun Shiyi** fled without armor. In just **5 days**, 290,000 Qing troops were annihilated – one of the **greatest blitzkrieg victories** in world military history.",
    },
    {
      title: "Di sản - Vị Hoàng đế vĩ đại nhất",
      titleEn: "Legacy - The Greatest Emperor",
      text: "**Quang Trung – Nguyễn Huệ** được mệnh danh là một trong những vị hoàng đế vĩ đại nhất lịch sử Việt Nam. Ông không chỉ tài ba trên chiến trường mà còn ôm ấp tầm nhìn cải cách sâu rộng về kinh tế, giáo dục. Cái chết đột ngột của ông ở tuổi *40* vào năm *1792* là một bi kịch lớn của dân tộc, khiến bao kế hoạch dang dở. Người đời mãi tiếc nuối về một tương lai xán lạn đã không thành hiện thực, nếu như ông có thêm thời gian để thực hiện hoài bão của mình.",
      textEn: "**Quang Trung – Nguyễn Huệ** is hailed as one of Vietnam's greatest emperors. He was not only brilliant on the battlefield but also harbored a profound vision for economic and educational reforms. His sudden death at the age of *40* in *1792* was a great national tragedy, leaving many plans unfinished. People forever rue the bright future that never materialized, had he only had more time to fulfill his ambitions.",
    },
  
  ],

  "hist-3-2": [
    {
      title: "Bối cảnh - Thống nhất giang sơn",
      titleEn: "Context - Unifying the Nation",
      text: "Sau gần ba thập kỷ chiến tranh tiêu hao, **Nguyễn Ánh** với sự kiên trì phi thường đã chiến thắng và thống nhất giang sơn, lập nên nhà **Nguyễn** vào năm *1802*. Cuộc trường chinh đầy gian khổ kéo dài *hơn 25 năm* của ông, có lúc phải cầu viện đến sự hỗ trợ quân sự và kỹ thuật từ người **Pháp**, đã đặt dấu chấm hết cho thời kỳ chia cắt **Lê – Trịnh – Nguyễn**. Tuy nhiên, chính sự 'giúp đỡ' này đã gieo mầm cho những rắc rối sau này, khi Pháp dần bộc lộ dã tâm xâm lược.",
      textEn: "After nearly three decades of attrition warfare, **Nguyễn Ánh**, with extraordinary perseverance, triumphed and unified the nation, establishing the **Nguyễn** Dynasty in *1802*. His arduous *25-year* campaign, at times requiring military and technical aid from the **French**, ended the **Lê – Trịnh – Nguyễn** divided era. However, this 'assistance' inadvertently sowed the seeds for future troubles as France gradually revealed its expansionist ambitions.",
    },

    {
      title: "🏯 Triều đại cuối cùng",
      titleEn: "🏯 The Last Dynasty",
      text: "**Năm 1802**, **Nguyễn Ánh** thống nhất đất nước, lên ngôi **Gia Long**, lập nhà Nguyễn – triều đại phong kiến cuối cùng, đóng đô ở **Phú Xuân** (Huế). Ông xây dựng **Kinh thành Huế** nguy nga (nay là Di sản UNESCO). Tuy nhiên, các vua sau thực hiện chính sách **'bế quan tỏa cảng'**, cấm đạo, từ chối hiện đại hóa.",
      textEn: "In **1802**, **Nguyen Anh** unified the country as Emperor **Gia Long**, founding the Nguyen Dynasty – the last feudal dynasty, capital at **Phu Xuan** (Hue). He built the magnificent **Hue Imperial Citadel** (now UNESCO Heritage). However, later kings pursued **isolationism**, banning Christianity and refusing modernization.",
      imageUrl: hueCitadel,
    },
    {
      title: "🇫🇷 80 năm đô hộ",
      titleEn: "🇫🇷 80 Years of Colonial Rule",
      text: "**Năm 1858**, liên quân Pháp-Tây Ban Nha tấn công Đà Nẵng. Các triều vua yếu đuối lần lượt **ký hiệp ước nhượng đất** cho đến khi VN trở thành thuộc địa hoàn toàn (*1884*). Pháp chia VN thành **3 kỳ**: Bắc Kỳ, Trung Kỳ, Nam Kỳ. Gần 80 năm đô hộ là thời kỳ đau thương nhưng cũng mang lại biến chuyển: **đường sắt, trường học, chữ Quốc ngữ** được phổ biến.",
      textEn: "In **1858**, French-Spanish forces attacked Da Nang. Weak kings signed away territory until Vietnam became a full colony (*1884*). France divided it into **3 regions**. Nearly 80 years of rule brought pain but also change: **railways, schools**, and the **romanized Vietnamese script** spread widely.",
    },
    {
      title: "Di sản - Nỗi đau và bài học",
      titleEn: "Legacy - Pain and Lessons",
      text: "Di sản của nhà **Nguyễn** là một bức tranh đa chiều. Từ **kinh thành Huế** tráng lệ – nay là **Di sản Thế giới UNESCO**, đến những nỗi đau sâu sắc từ chính sách bế quan tỏa cảng, đẩy đất nước vào thế yếu trước tham vọng của phương Tây. Bài học về sự tự mãn và thiếu tầm nhìn chiến lược vẫn còn nguyên giá trị. Nó nhắc nhở chúng ta về tầm quan trọng của việc hội nhập quốc tế để không bao giờ lặp lại bi kịch của *một thế kỷ mất nước* vì sự chậm trễ trong canh tân và thích nghi.",
      textEn: "The **Nguyễn** Dynasty's legacy is a multifaceted tapestry. From the magnificent **Hue Citadel** – now a **UNESCO World Heritage site** – to the profound pain stemming from isolationist policies that left the nation vulnerable to Western ambitions. The lesson of complacency and lack of strategic foresight remains pertinent. It reminds us of the crucial importance of international integration, ensuring we never repeat the tragedy of *a century of lost sovereignty* due to delayed reform and adaptation.",
    },
  
  ],

  "hist-3-3": [
    {
      title: "Bối cảnh - Chàng thanh niên yêu nước",
      titleEn: "Context - The Young Patriot",
      text: "Từ thuở ấu thơ ở làng **Kim Liên**, cậu bé **Nguyễn Sinh Cung**, sau này là **Hồ Chí Minh**, đã chứng kiến cảnh nước nhà lầm than dưới ách đô hộ. Nỗi đau mất nước và hình ảnh những cuộc khởi nghĩa thất bại đã nung nấu trong tâm khảm cậu một hoài bão lớn lao. Với ý chí mạnh mẽ và khát vọng cháy bỏng tìm đường cứu dân tộc, vào *ngày 5 tháng 6 năm 1911*, người thanh niên trẻ tuổi đã rời bến **Nhà Rồng**, bắt đầu cuộc hành trình lênh đênh khắp năm châu, tìm kiếm ánh sáng chân lý.",
      textEn: "From his childhood in **Kim Liên** village, young **Nguyễn Sinh Cung**, later **Ho Chi Minh**, witnessed his nation's suffering under foreign rule. The agony of national subjugation and the sight of failed uprisings forged within him a great ambition. With strong will and a burning desire to find a path to save his people, on *June 5, 1911*, the young man departed from **Nhà Rồng** harbor, embarking on an arduous journey across continents, in search of truth and liberation.",
    },

    {
      title: "🚢 30 năm tìm đường cứu nước",
      titleEn: "🚢 30 Years Seeking National Salvation",
      text: "**Hồ Chí Minh** (*1890-1969*), tên thật Nguyễn Sinh Cung, sinh tại Nghệ An. **Năm 1911**, ở tuổi 21, ông rời bến cảng **Nhà Rồng** (Sài Gòn) ra đi tìm đường cứu nước. Suốt **30 năm** bôn ba qua Pháp, Anh, Mỹ, Liên Xô, Trung Quốc, ông tìm ra con đường giải phóng dân tộc và sáng lập **Đảng Cộng sản Việt Nam** (*1930*).",
      textEn: "**Ho Chi Minh** (*1890-1969*), born Nguyen Sinh Cung in Nghe An. In **1911**, at age 21, he left from **Nha Rong** Port (Saigon) to seek national salvation. For **30 years** he traveled through France, England, America, the Soviet Union, and China, founding the **Communist Party** (*1930*).",
      imageUrl: hoChiMinhDeclaration,
    },
    {
      title: "🎌 Tuyên ngôn Độc lập",
      titleEn: "🎌 The Declaration of Independence",
      text: "Ngày **2/9/1945**, tại **Quảng trường Ba Đình** (Hà Nội), trước hàng vạn đồng bào, Chủ tịch Hồ Chí Minh đọc **Tuyên ngôn Độc lập**, khai sinh nước Việt Nam Dân chủ Cộng hòa. Bản tuyên ngôn mở đầu bằng trích dẫn Tuyên ngôn Độc lập của Mỹ: *'Tất cả mọi người đều sinh ra có quyền bình đẳng.'* Ngày **2/9** trở thành **Ngày Quốc khánh** – ngày thiêng liêng nhất của dân tộc.",
      textEn: "On **September 2, 1945**, at **Ba Dinh Square** (Hanoi), before tens of thousands, Ho Chi Minh read the **Declaration of Independence**, founding the Democratic Republic of Vietnam. It opened with the American Declaration: *'All men are created equal.'* **September 2** became **National Day** – the nation's most sacred date.",
    },
    {
      title: "Di sản - Di sản của Bác Hồ",
      titleEn: "Legacy - Uncle Ho's Heritage",
      text: "Di sản của **Chủ tịch Hồ Chí Minh** là vô giá, không chỉ cho riêng Việt Nam mà còn cho cả các dân tộc bị áp bức trên thế giới. Tư tưởng của Người về độc lập dân tộc gắn liền với chủ nghĩa xã hội, về đại đoàn kết dân tộc vẫn còn nguyên giá trị. Bản **Di chúc** thiêng liêng của Người là kim chỉ nam cho sự nghiệp xây dựng đất nước. Hình ảnh **Bác Hồ** đã trở thành biểu tượng cho lòng yêu nước, ý chí tự lực tự cường và khát vọng hòa bình, được bạn bè quốc tế ngưỡng mộ và vinh danh.",
      textEn: "The legacy of **President Ho Chi Minh** is invaluable, not only for Vietnam but also for all oppressed nations worldwide. His ideology of national independence associated with socialism, and of national unity, remains profoundly relevant. His sacred **Testament** serves as a guiding star for the nation-building endeavor. The image of **Uncle Ho** has become a symbol of patriotism, self-reliance, and the aspiration for peace, admired and honored by international friends.",
    },
  
  ],

  "hist-3-4": [
    {
      title: "Bối cảnh - Chín năm kháng chiến",
      titleEn: "Context - Nine Years of Resistance",
      text: "Sau *Tuyên ngôn Độc lập năm 1945*, dân tộc ta tưởng chừng đã giành được hòa bình. Nhưng thực dân **Pháp** với dã tâm tái chiếm đã quay trở lại, buộc nhân dân ta phải tiếp tục cuộc kháng chiến trường kỳ. Từ *năm 1946 đến 1954*, cả nước đã đồng lòng đứng lên, ‘thà hy sinh tất cả chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ’. Mỗi tấc đất, mỗi con người đều trở thành chiến sĩ, quyết tâm bảo vệ nền độc lập non trẻ của Tổ quốc.",
      textEn: "After the *1945 Declaration of Independence*, our nation seemingly achieved peace. However, the colonial **French**, with their intent to re-occupy, returned, forcing our people into a prolonged resistance war. From *1946 to 1954*, the entire country united, 'preferring to sacrifice everything rather than lose our country, determined not to be slaves'. Every inch of land, every person became a soldier, resolute in defending the young independence of the Fatherland.",
    },

    {
      title: "🏔️ Pháo đài bất khả xâm phạm?",
      titleEn: "🏔️ An Impregnable Fortress?",
      text: "Pháp xây **'pháo đài bất khả xâm phạm'** ở thung lũng **Điện Biên Phủ** (Tây Bắc): **16.000 quân** tinh nhuệ, sân bay, xe tăng, pháo hạng nặng. Họ tin chắc Việt Minh không thể kéo pháo qua núi rừng hiểm trở. Nhưng **Đại tướng Võ Nguyên Giáp** thay đổi kế hoạch từ *'đánh nhanh'* sang **'đánh chắc tiến chắc'** – một quyết định lịch sử.",
      textEn: "France built an *'impregnable fortress'* in the **Dien Bien Phu** valley: **16,000 elite troops**, airstrip, tanks, heavy artillery. They were certain the Viet Minh couldn't haul cannons through rugged mountains. But **General Vo Nguyen Giap** changed strategy from *'quick strike'* to **'steady advance'** – a historic decision.",
      imageUrl: dienBienPhu,
    },
    {
      title: "🏆 56 ngày lừng lẫy",
      titleEn: "🏆 56 Glorious Days",
      text: "Hàng vạn dân công dùng **sức người** kéo pháo nặng hàng tấn qua núi cao, đào hàng trăm km hào. Từ **13/3 đến 7/5/1954**, suốt **56 ngày đêm**, 3 đợt tấn công ác liệt. Chiều **7/5**, lá cờ **Quyết chiến Quyết thắng** tung bay trên nóc hầm De Castries. Toàn bộ quân Pháp đầu hàng. Chiến thắng *'lừng lẫy năm châu, chấn động địa cầu'* dẫn đến **Hiệp định Genève**, chấm dứt đô hộ Pháp tại Đông Dương.",
      textEn: "Tens of thousands of porters **hauled multi-ton cannons** over mountains and dug hundreds of km of trenches. Over **56 days** (March 13 to May 7, 1954), three fierce assault waves. On **May 7**, the Victory flag flew atop De Castries' bunker. All French forces surrendered. This victory *'resounded across five continents'* and led to the **Geneva Accords**, ending French colonial rule.",
    },
    {
      title: "Di sản - Chấn động địa cầu",
      titleEn: "Legacy - Earth-shattering Impact",
      text: "Chiến thắng **Điện Biên Phủ** vang dội *năm 1954* không chỉ kết thúc cuộc kháng chiến chống Pháp của Việt Nam mà còn ‘chấn động địa cầu’. Nó giáng một đòn chí mạng vào chủ nghĩa thực dân cũ, thức tỉnh các dân tộc bị áp bức đứng lên đấu tranh giành độc lập. Từ châu Á đến châu Phi, hàng loạt quốc gia đã noi gương Việt Nam. Hiệp định **Giơ-ne-vơ** sau đó đã công nhận độc lập, chủ quyền, thống nhất và toàn vẹn lãnh thổ của Việt Nam, mở ra một trang sử mới cho thế giới.",
      textEn: "The resounding victory at **Dien Bien Phu** in *1954* not only ended Vietnam's resistance against France but also 'shook the world'. It delivered a fatal blow to old colonialism, awakening oppressed nations to rise and fight for independence. From Asia to Africa, numerous countries followed Vietnam's example. The subsequent **Geneva Accords** recognized Vietnam's independence, sovereignty, unity, and territorial integrity, ushering in a new chapter in world history.",
    },
  
  ],

  "hist-3-5": [
    {
      title: "Bối cảnh - Đất nước bị chia cắt",
      titleEn: "Context - A Divided Nation",
      text: "Sau thắng lợi **Điện Biên Phủ** và **Hiệp định Giơ-ne-vơ** *năm 1954*, mong ước hòa bình chưa trọn vẹn, đất nước ta lại rơi vào cảnh chia cắt. Vĩ tuyến *17* không chỉ là một đường ranh giới địa lý mà còn là vết cắt sâu hoắm trong lòng dân tộc, chia lìa bao gia đình, xóm làng. *Hơn hai thập kỷ* ròng rã, nỗi đau chia cắt và tiếng súng không ngừng đã hằn sâu vào ký ức của biết bao thế hệ người Việt, tạo nên một chương bi tráng trong lịch sử dân tộc.",
      textEn: "After the **Dien Bien Phu** victory and the *1954* **Geneva Accords**, the aspiration for complete peace was unfulfilled as our nation fell into division. The *17th parallel* was not merely a geographical boundary but a deep wound in the heart of the nation, separating countless families and villages. For *over two decades*, the pain of division and incessant gunfire deeply scarred the memories of generations of Vietnamese people, creating a tragic and heroic chapter in national history.",
    },

    {
      title: "🔥 21 năm chia cắt",
      titleEn: "🔥 21 Years of Division",
      text: "Sau Hiệp định Genève (*1954*), VN bị chia cắt tại **vĩ tuyến 17**. Cuộc chiến kéo dài **21 năm** với sự can thiệp của Mỹ – lúc cao điểm hơn **500.000 lính Mỹ** tại VN. Tết Mậu Thân (*1968*) gây chấn động dư luận Mỹ. Năm 1973, Mỹ rút quân.",
      textEn: "After the Geneva Accords (*1954*), Vietnam was divided at the **17th parallel**. The war lasted **21 years** with US intervention – over **500,000 American troops** at peak. The 1968 Tet Offensive shocked American opinion. The US withdrew in 1973.",
    },
    {
      title: "🏛️ 30/4/1975 – Thống nhất",
      titleEn: "🏛️ April 30, 1975 – Reunification",
      text: "Mùa Xuân **1975**, Chiến dịch Hồ Chí Minh bắt đầu như cơn bão: **10/3** giải phóng Buôn Ma Thuột, **26/3** Huế, **29/3** Đà Nẵng. Lúc **10h45 ngày 30/4**, xe tăng **843** húc đổ cổng Dinh Độc Lập. **11h30**, Tổng thống Dương Văn Minh đầu hàng vô điều kiện. Đất nước **thống nhất** sau 21 năm chia cắt. Sài Gòn đổi tên thành **TP Hồ Chí Minh** – theo tên vị lãnh tụ đã mất năm 1969, không kịp nhìn thấy ngày đoàn viên.",
      textEn: "Spring **1975**, the Ho Chi Minh Campaign swept like a storm: **March 10** liberated Buon Ma Thuot, **March 26** Hue, **March 29** Da Nang. At **10:45 AM on April 30**, Tank **#843** crashed through Independence Palace gates. At **11:30 AM**, President Duong Van Minh surrendered unconditionally. The country was **reunified** after 21 years. Saigon became **Ho Chi Minh City** – named after the leader who died in 1969 without seeing this day.",
      imageUrl: reunification1975,
    },
    {
      title: "Di sản - Hòa bình và thống nhất",
      titleEn: "Legacy - Peace and Reunification",
      text: "*Ngày 30 tháng 4 năm 1975* không chỉ đánh dấu chiến thắng quân sự vĩ đại mà còn là ngày đất nước Việt Nam vĩnh viễn xóa bỏ vết thương chia cắt. Từ nay, non sông liền một dải, Bắc – Nam sum họp một nhà. Việc đặt tên **Sài Gòn** thành **Thành phố Hồ Chí Minh** là biểu tượng của ý chí thống nhất, hòa giải dân tộc. Di sản của ngày này là niềm tự hào về hòa bình, độc lập, và nghị lực phi thường của nhân dân Việt Nam trong hành trình hàn gắn vết thương chiến tranh, xây dựng tương lai.",
      textEn: "*April 30, 1975*, not only marked a great military victory but also the day Vietnam forever healed the wounds of division. From then on, the country was reunified, North and South united. The naming of **Saigon** as **Ho Chi Minh City** symbolizes the will for national unity and reconciliation. The legacy of this day is the pride in peace, independence, and the extraordinary resilience of the Vietnamese people in the journey of healing war wounds and building a future.",
    },
  
  ],

  "hist-3-6": [
    {
      title: "Bối cảnh - Mất nước",
      titleEn: "Context - Losing the Country",
      text: "Từ *năm 1858*, tiếng súng xâm lược của thực dân **Pháp** bắt đầu nổ ra ở **Đà Nẵng**, mở màn cho một bi kịch kéo dài. Từng bước một, với ưu thế vũ khí vượt trội, quân Pháp đã chiếm đóng các tỉnh Nam Kỳ, rồi tiến ra Bắc Kỳ. Các hiệp ước bất bình đẳng, từ **Giáp Tuất** *1874* đến **Quý Mùi** *1883* và **Patenôtre** *1884*, đã biến Việt Nam thành thuộc địa và nửa bảo hộ. Nỗi đau mất nước dần dần bao trùm lên toàn cõi, khiến trái tim mỗi người con đất Việt quặn thắt.",
      textEn: "From *1858*, the invasion cannons of colonial **France** first fired in **Da Nang**, initiating a prolonged tragedy. Step by step, with superior weaponry, French forces occupied the southern provinces, then advanced north. Unequal treaties, from **Giáp Tuất** *1874* to **Quý Mùi** *1883* and **Patenôtre** *1884*, transformed Vietnam into a colony and a protectorate. The agony of losing the country gradually enveloped the entire realm, deeply affecting every Vietnamese heart.",
    },

    {
      title: "👑 Vua 13 tuổi xuất bôn",
      titleEn: "👑 The 13-Year-Old King in Exile",
      text: "Sau khi Pháp hoàn tất chiếm đóng (*1884*), vua **Hàm Nghi** – khi đó mới **13 tuổi** – dưới sự phò tá của **Tôn Thất Thuyết**, bí mật rời Huế sau cuộc phản công thất bại. Từ vùng rừng núi Quảng Bình, vua ban **chiếu Cần Vương** kêu gọi toàn dân kháng chiến – tiếng gọi non sông vang vọng khắp nước.",
      textEn: "After France completed its conquest (*1884*), 13-year-old King **Ham Nghi**, under **Ton That Thuyet's** protection, secretly fled Hue after a failed counterattack. From the mountains of Quang Binh, he issued the **Can Vuong Edict** calling for national resistance – a clarion call echoing across the land.",
      imageUrl: canVuong,
    },
    {
      title: "🏔️ 30 năm kháng chiến",
      titleEn: "🏔️ 30 Years of Resistance",
      text: "Phong trào bùng nổ khắp nơi: **Phan Đình Phùng** ở Hà Tĩnh suốt 10 năm; **Hoàng Hoa Thám** (Đề Thám) ở Yên Thế kéo dài gần **30 năm** (*1884-1913*). Vua Hàm Nghi bị bắt năm 1888 và bị đày sang **Algeria**. Phong trào tuy thất bại trước hỏa lực áp đảo, nhưng đã thắp lên ngọn lửa **bất khuất** không bao giờ tắt.",
      textEn: "The movement erupted everywhere: **Phan Dinh Phung** fought for 10 years; **Hoang Hoa Tham** led a nearly **30-year** uprising (*1884-1913*). King Ham Nghi was captured in 1888 and exiled to **Algeria**. Though the movement failed against overwhelming firepower, it lit an **inextinguishable flame** of resistance.",
    },
    {
      title: "Di sản - Tinh thần bất khuất",
      titleEn: "Legacy - Indomitable Spirit",
      text: "Phong trào **Cần Vương** dưới sự lãnh đạo của **Tôn Thất Thuyết** và chiếu dụ của *Vua Hàm Nghi* đã thổi bùng lên ngọn lửa yêu nước trong dân chúng, dù cuối cùng không thành công. Nó chứng minh cho tinh thần quật cường, không cam chịu làm nô lệ của dân tộc Việt Nam. Dù **Vua Hàm Nghi** phải chịu cảnh lưu đày sang **Algeria**, tinh thần 'phù vua cứu nước' của cuộc khởi nghĩa vẫn là nguồn cảm hứng lớn lao cho các phong trào yêu nước sau này, hun đúc nên ý chí đấu tranh bất khuất suốt những thập kỷ tiếp theo.",
      textEn: "The **Cần Vương** movement, led by **Tôn Thất Thuyết** and spurred by *King Hàm Nghi's* decree, ignited a patriotic fire among the people, though ultimately unsuccessful. It demonstrated the resilient spirit of the Vietnamese nation, refusing to be enslaved. Although **King Hàm Nghi** was exiled to **Algeria**, the 'aid the king, save the country' spirit of the uprising remained a great source of inspiration for later patriotic movements, fostering an indomitable fighting will throughout subsequent decades.",
    },
  
  ],

  "hist-3-7": [
    {
      title: "Bối cảnh - Tìm con đường mới",
      titleEn: "Context - Finding a New Path",
      text: "Trước sự thất bại của các cuộc khởi nghĩa vũ trang truyền thống, giới sĩ phu yêu nước nhận ra cần phải có một lối đi khác. Cuối thế kỷ *19*, đầu thế kỷ *20*, khi Nhật Bản trỗi dậy mạnh mẽ sau công cuộc Duy tân, nhiều người Việt đã xem đây là tấm gương để học hỏi. Các nhà nho tiến bộ như **Phan Bội Châu** đã từ bỏ con đường cũ, quyết tâm tìm kiếm một con đường mới. Họ tin rằng phải thay đổi tư duy, học hỏi văn minh phương Đông đã canh tân để cứu nước, thay vì chỉ trông chờ vào vũ lực đơn thuần.",
      textEn: "Confronted with the failure of traditional armed uprisings, patriotic scholars recognized the need for an alternative path. In the late *19th* and early *20th* centuries, as Japan vigorously rose after the Meiji Restoration, many Vietnamese looked to it as a model. Progressive Confucian scholars like **Phan Bội Châu** abandoned old ways, determined to seek a new path. They believed a change in mindset was essential, learning from modernized Eastern civilizations to save the country, rather than solely relying on brute force.",
    },

    {
      title: "🇯🇵 Phong trào Đông Du",
      titleEn: "🇯🇵 The Eastward Movement",
      text: "**Phan Bội Châu** (*1867-1940*) – nhà cách mạng tiêu biểu nhất đầu thế kỷ 20. **Năm 1905**, ông sang **Nhật Bản** – đất nước châu Á duy nhất canh tân thành công – lập phong trào **Đông Du**, bí mật đưa khoảng **200 thanh niên** VN sang Nhật du học về kỹ thuật, quân sự. Ông viết **'Việt Nam vong quốc sử'** để thức tỉnh lòng yêu nước.",
      textEn: "**Phan Boi Chau** (*1867-1940*) – the most prominent revolutionary of early 20th century. In **1905**, he traveled to **Japan** and founded the **Dong Du** movement, secretly sending about **200 Vietnamese youth** to study technology and military there. He wrote **'History of Vietnam's Loss'** to awaken patriotism.",
      imageUrl: phanBoiChau,
    },
    {
      title: "💡 Gieo mầm cách mạng",
      titleEn: "💡 Planting Seeds of Revolution",
      text: "**Năm 1909**, Nhật hợp tác với Pháp trục xuất du học sinh. Phong trào tan rã, Phan Bội Châu bị Pháp bắt và quản thúc tại Huế. Nhưng tư tưởng **duy tân** đã **gieo mầm** cho các phong trào sau – chứng minh rằng muốn cứu nước, phải **học hỏi thế giới** và hiện đại hóa.",
      textEn: "In **1909**, Japan cooperated with France and expelled the students. The movement dissolved, and Phan Boi Chau was arrested. But the **modernization ideals** had **planted seeds** for later movements – proving that saving a nation requires **learning from the world** and modernizing.",
    },
    {
      title: "Di sản - Thức tỉnh dân tộc",
      titleEn: "Legacy - National Awakening",
      text: "Phong trào **Đông Du** của **Phan Bội Châu** cùng với các tư tưởng canh tân của **Phan Chu Trinh** đã tạo nên một làn sóng thức tỉnh mạnh mẽ trong lòng dân tộc. Dù hai nhà cách mạng có những quan điểm khác nhau về phương pháp cứu nước – *bạo động* hay *cải cách* – nhưng họ đều hướng đến một mục tiêu chung: giành lại độc lập, khai sáng dân trí. Di sản lớn nhất là việc họ đã gieo mầm cho tinh thần tự cường, độc lập suy nghĩ và khát khao canh tân, định hình nên ý thức dân tộc Việt trong những thập kỷ sau đó.",
      textEn: "**Phan Bội Châu's** **Đông Du** movement, alongside **Phan Chu Trinh's** reformist ideas, created a powerful wave of national awakening. Although the two revolutionaries held differing views on the method of national salvation – *armed struggle* or *reform* – they shared a common goal: regaining independence and enlightening the populace. Their greatest legacy is having sowed the seeds of self-reliance, independent thought, and the desire for modernization, shaping Vietnamese national consciousness in subsequent decades.",
    },
  
  ],

  "hist-3-8": [
    {
      title: "Bối cảnh - Đảng ra đời",
      titleEn: "Context - The Party's Birth",
      text: "Trong bối cảnh nền kinh tế thế giới chìm trong **đại suy thoái** *những năm 1929-1933*, Việt Nam dưới ách đô hộ của thực dân Pháp cũng oằn mình chịu đựng. Nông dân, công nhân lâm vào cảnh bần cùng, bị áp bức bóc lột đến tận xương tủy. Chính trong hoàn cảnh ấy, nhu cầu về một tổ chức chính trị đủ mạnh để lãnh đạo phong trào đấu tranh đã trở nên cấp thiết. *Đầu năm 1930*, **Đảng Cộng sản Việt Nam** ra đời, một sự kiện lịch sử trọng đại, thống nhất các tổ chức cộng sản, châm ngòi cho ngọn lửa cách mạng bùng cháy mạnh mẽ hơn.",
      textEn: "Amidst the **Great Depression** *of 1929-1933*, Vietnam, under French colonial rule, suffered immensely. Farmers and workers plunged into destitution, brutally exploited to the core. In this context, the need for a strong political organization to lead the struggle became urgent. In *early 1930*, the **Communist Party of Vietnam** was founded, a pivotal historical event that unified communist organizations and ignited a more powerful revolutionary flame.",
    },

    {
      title: "✊ Tổng diễn tập",
      titleEn: "✊ The General Rehearsal",
      text: "**Năm 1930**, Đảng Cộng sản VN vừa thành lập, cách mạng bùng nổ mạnh nhất tại **Nghệ An và Hà Tĩnh**. Công nhân đình công, nông dân biểu tình. Ở nhiều huyện, chính quyền thực dân sụp đổ, nhân dân tự lập **chính quyền Xô Viết**: chia ruộng, xóa nợ, mở trường – lần đầu tiên ở Đông Dương có chính quyền cách mạng do **nông dân tự quản lý**.",
      textEn: "In **1930**, the Communist Party had just been founded, and revolution erupted in **Nghe An and Ha Tinh**. Workers struck, peasants demonstrated. In many districts, colonial authority collapsed and people established **Soviet-style councils**: redistributing land, canceling debts, opening schools – the first **self-governing revolutionary government** in Indochina.",
      imageUrl: xoVietNgheTinh,
    },
    {
      title: "🔥 Bài học cho tương lai",
      titleEn: "🔥 Lessons for the Future",
      text: "Pháp đàn áp **dã man** nhưng phong trào đã chứng minh sức mạnh quần chúng. Hàng nghìn người bị bắt, nhiều lãnh đạo hy sinh. Nhưng như một hạt giống gieo xuống đất, phong trào Xô Viết Nghệ Tĩnh trở thành **'tổng diễn tập'** cho Cách mạng Tháng Tám 1945 – chứng minh rằng khi nhân dân đoàn kết, không sức mạnh nào ngăn cản được.",
      textEn: "France suppressed it **brutally**, but the movement proved the people's power. Thousands were arrested, many leaders sacrificed. But like a seed planted in soil, the Nghe Tinh Soviets became the **'general rehearsal'** for the 1945 August Revolution – proving that when the people unite, nothing can stop them.",
    },
    {
      title: "Di sản - Hạt giống cách mạng",
      titleEn: "Legacy - Seeds of Revolution",
      text: "Phong trào **Xô Viết Nghệ Tĩnh** như một luồng gió mạnh, chứng tỏ sức mạnh đoàn kết của công nông và khả năng lãnh đạo của Đảng Cộng sản Việt Nam. Dù bị đàn áp dã man, nhưng tinh thần quật cường, lòng yêu nước sục sôi của nhân dân Nghệ Tĩnh đã trở thành biểu tượng, là 'hạt giống cách mạng' cho sự nghiệp giải phóng dân tộc. Thắng lợi của *Cách mạng tháng Tám 1945* sau này mang đậm dấu ấn và bài học quý giá từ cuộc tổng diễn tập lịch sử này, khắc sâu vào tâm trí mỗi người con **Nghệ Tĩnh** về một ý chí sắt đá.",
      textEn: "The **Soviet Nghệ Tĩnh** movement, like a strong gust of wind, demonstrated the united strength of workers and peasants and the leadership capability of the Communist Party of Vietnam. Despite brutal suppression, the resilient spirit and fervent patriotism of the Nghệ Tĩnh people became a symbol, 'seeds of revolution' for national liberation. The later success of the *August Revolution 1945* bore strong imprints of and drew valuable lessons from this historic dress rehearsal, deeply embedding an iron will in the minds of every **Nghệ Tĩnh** descendant.",
    },
  
  ],

  "hist-3-9": [
    {
      title: "Bối cảnh - Thời cơ ngàn năm có một",
      titleEn: "Context - A Once-in-a-Millennium Opportunity",
      text: "Sau *năm 1940*, Việt Nam rơi vào cảnh 'một cổ hai tròng', vừa chịu sự thống trị của thực dân Pháp, vừa bị phát xít Nhật chèn ép. Tuy nhiên, sự kiện **Nhật Bản đầu hàng Đồng minh** *ngày 15 tháng 8 năm 1945* đã tạo ra một khoảng trống quyền lực vô cùng quý giá. **Hồ Chí Minh** và **Việt Minh** đã nhanh chóng nắm bắt 'thời cơ ngàn năm có một' này. Với sự chuẩn bị chu đáo và lòng dân đồng thuận, cuộc Tổng khởi nghĩa đã diễn ra thần tốc, lan rộng khắp cả nước, đưa dân tộc Việt Nam đến một bước ngoặt lịch sử.",
      textEn: "After *1940*, Vietnam found itself under a 'dual yoke', subjugated by both French colonialism and Japanese fascism. However, Japan's surrender to the Allies on *August 15, 1945*, created an invaluable power vacuum. **Ho Chi Minh** and the **Việt Minh** swiftly seized this 'once-in-a-millennium opportunity'. With meticulous preparation and popular consensus, the General Uprising unfolded rapidly, spreading nationwide, bringing the Vietnamese people to a historical turning point.",
    },

    {
      title: "⚡ Tổng khởi nghĩa",
      titleEn: "⚡ The General Uprising",
      text: "**Tháng 8/1945**, Nhật đầu hàng Đồng Minh sau bom nguyên tử. Thời cơ ngàn năm có một đã đến! Ngày **19/8**, hàng chục vạn nhân dân Hà Nội chiếm các cơ quan chính quyền – **không đổ máu**. Các tỉnh nhanh chóng theo sau: **Huế** (23/8), **Sài Gòn** (25/8).",
      textEn: "In **August 1945**, Japan surrendered after the atomic bombs. The once-in-a-millennium moment had arrived! On **August 19**, hundreds of thousands seized power in Hanoi – **without bloodshed**. Provinces followed swiftly: **Hue** (23/8), **Saigon** (25/8).",
      imageUrl: augustRevolution,
    },
    {
      title: "👑 Vua cuối cùng thoái vị",
      titleEn: "👑 The Last Emperor Abdicates",
      text: "Ngày **25/8**, vua **Bảo Đại** – hoàng đế cuối cùng của Việt Nam – tuyên bố thoái vị với câu nói bất hủ: *'Thà làm dân một nước tự do còn hơn làm vua một nước nô lệ!'* Chế độ phong kiến tồn tại **hàng ngàn năm** chấm dứt. Cách mạng Tháng Tám thành công là kết quả **15 năm** chuẩn bị và đấu tranh kiên cường.",
      textEn: "On **August 25**, Emperor **Bao Dai** – Vietnam's last emperor – abdicated with immortal words: *'I would rather be a citizen of a free nation than the king of an enslaved one!'* The feudal system spanning **thousands of years** ended. The August Revolution's success was the fruit of **15 years** of preparation and struggle.",
    },
    {
      title: "Di sản - Khai sinh nước mới",
      titleEn: "Legacy - Birth of a New Nation",
      text: "*Cách mạng Tháng Tám năm 1945* là sự kiện khai sinh ra nước **Việt Nam Dân chủ Cộng hòa**, chấm dứt chế độ phong kiến ngàn năm và đạp đổ ách thống trị của thực dân. Nó không chỉ mang lại độc lập, tự do cho dân tộc mà còn mở ra một kỷ nguyên mới – kỷ nguyên dân chủ, cộng hòa. Di sản của nó là niềm tự hào về khả năng tự vùng dậy của một dân tộc, khẳng định chủ quyền và vị thế của Việt Nam trên bản đồ thế giới, đặt nền móng vững chắc cho các cuộc kháng chiến bảo vệ Tổ quốc sau này.",
      textEn: "The *August Revolution of 1945* marked the birth of the **Democratic Republic of Vietnam**, ending a millennium of feudalism and overthrowing colonial rule. It not only brought independence and freedom to the nation but also ushered in a new era – an era of democracy and republicanism. Its legacy is the pride in a nation's ability to rise up, affirming Vietnam's sovereignty and position on the world map, laying a solid foundation for subsequent wars of national defense.",
    },
  
  ],

  "hist-3-10": [
    {
      title: "Bối cảnh - Hiệp định Paris và vi phạm",
      titleEn: "Context - Paris Accords and Violations",
      text: "Sau nhiều năm đàm phán, **Hiệp định Paris** được ký kết *tháng 1 năm 1973*, hứa hẹn chấm dứt chiến tranh và lập lại hòa bình ở Việt Nam. Quân đội Hoa Kỳ rút khỏi miền Nam, nhưng hòa bình vẫn còn xa. Chính quyền **Sài Gòn** liên tiếp vi phạm các điều khoản, khước từ hòa hợp dân tộc, đẩy tình hình vào nguy cơ bùng nổ trở lại. Trước tình hình đó, quân và dân ta buộc phải có những kế hoạch táo bạo, nhằm chấm dứt hoàn toàn cuộc chiến tranh dai dẳng, thống nhất đất nước bằng vũ lực.",
      textEn: "After years of negotiation, the **Paris Accords** were signed in *January 1973*, promising an end to the war and restoration of peace in Vietnam. US troops withdrew from the South, yet peace remained elusive. The **Saigon** government continuously violated the terms, refusing national reconciliation, pushing the situation back to the brink of eruption. Faced with this, our military and people were compelled to formulate daring plans to definitively end the protracted war and unify the nation by force.",
    },

    {
      title: "⚡ Chiến dịch như cơn bão",
      titleEn: "⚡ A Campaign Like a Storm",
      text: "Đầu **1975**, sau khi Mỹ rút quân, Bộ Chính trị quyết định giải phóng miền Nam. **10/3**, bất ngờ giải phóng **Buôn Ma Thuột** – tạo hiệu ứng domino: Tổng thống Thiệu ra lệnh rút quân khỏi Tây Nguyên nhưng biến thành hỗn loạn. **26/3** giải phóng Huế, **29/3** giải phóng Đà Nẵng.",
      textEn: "In early **1975**, after the US withdrawal, the final campaign began. **March 10**: **Buon Ma Thuot** fell, creating a domino effect. President Thieu ordered retreat from the Highlands – which became chaos. **March 26**: Hue; **March 29**: Da Nang.",
    },
    {
      title: "🏛️ Xe tăng 843 – Khoảnh khắc lịch sử",
      titleEn: "🏛️ Tank 843 – The Historic Moment",
      text: "5 cánh quân tiến về Sài Gòn. Sáng **30/4**, xe tăng **T-54 số hiệu 843** húc đổ cổng **Dinh Độc Lập**. Đại úy **Bùi Quang Thận** cầm cờ chạy lên nóc dinh. **11h30**, Tổng thống **Dương Văn Minh** (nhậm chức 2 ngày trước) đầu hàng vô điều kiện. Sài Gòn đổi tên **TP Hồ Chí Minh** – theo tên vị lãnh tụ đã mất **năm 1969**, không kịp nhìn thấy ngày thống nhất.",
      textEn: "Five army columns advanced on Saigon. On **April 30**, Tank **T-54 #843** crashed through **Independence Palace** gates. Captain **Bui Quang Than** planted the flag on the rooftop. At **11:30 AM**, President **Duong Van Minh** surrendered unconditionally. Saigon became **Ho Chi Minh City** – after the leader who died in **1969** without seeing reunification.",
      imageUrl: reunification1975,
    },
    {
      title: "Di sản - Ý nghĩa thống nhất",
      titleEn: "Legacy - The Meaning of Reunification",
      text: "**Chiến dịch Hồ Chí Minh** là đỉnh cao của cuộc kháng chiến chống Mỹ, cứu nước, mang lại hòa bình và sự toàn vẹn lãnh thổ cho Việt Nam. Di sản lớn nhất là ý nghĩa thống nhất: kết thúc nỗi đau chia cắt kéo dài *hơn hai thập kỷ*, hàn gắn vết thương chiến tranh và mở ra kỷ nguyên độc lập, tự chủ. Từ một đất nước bị xé nát bởi chiến tranh, Việt Nam đã vươn mình đứng dậy, khẳng định khát vọng hòa bình, phát triển, trở thành một bài học về lòng kiên cường và ý chí vươn lên mãnh liệt trong lịch sử nhân loại.",
      textEn: "**Ho Chi Minh Campaign** was the pinnacle of the anti-American resistance war for national salvation, bringing peace and territorial integrity to Vietnam. Its greatest legacy is the meaning of reunification: ending the pain of division that lasted for *over two decades*, healing war wounds, and ushering in an era of independence and self-reliance. From a nation torn by war, Vietnam rose, asserting its aspirations for peace and development, becoming a lesson in resilience and strong will to overcome in human history.",
    },
  
  ],

  // ==================== MONTH 4: CONTEMPORARY VIETNAM ====================

  "hist-4-1": [
    {
      title: "🏔️ Bối cảnh – Đất nước kiệt quệ sau chiến tranh",
      titleEn: "🏔️ Context – A Nation Exhausted by War",
      text: "Ngày **30 tháng 4 năm 1975**, chiến tranh kết thúc, đất nước thống nhất sau hơn ba thập kỷ chia cắt. Nhưng **hòa bình** không đồng nghĩa với **thịnh vượng**. Việt Nam bước ra từ cuộc chiến với cơ sở hạ tầng **tan hoang**, hàng triệu hecta đất nhiễm **chất độc da cam**, và một nền kinh tế gần như **đổ nát hoàn toàn**. Lệnh **cấm vận** của Mỹ siết chặt mọi nguồn lực bên ngoài. Cuộc chiến tranh biên giới **Tây Nam** (1978) và cuộc xung đột với Trung Quốc ở **biên giới phía Bắc** (1979) càng bào mòn thêm sức lực quốc gia. Mô hình **kinh tế kế hoạch tập trung** – vốn phù hợp cho thời chiến – nay bộc lộ những **khuyết điểm nghiêm trọng** trong thời bình.",
      textEn: "On **April 30, 1975**, the war ended and the country was reunified after three decades of division. But **peace** did not mean **prosperity**. Vietnam emerged with **devastated** infrastructure, millions of hectares contaminated by **Agent Orange**, and an economy nearly **in ruins**. The US **embargo** cut off all external resources. Border conflicts with Cambodia (**1978**) and China (**1979**) further drained the nation. The **centrally planned economy** – suited for wartime – now revealed **serious flaws** in peacetime.",
    },
    {
      title: "📉 Khủng hoảng – Tem phiếu và lạm phát",
      titleEn: "📉 Crisis – Ration Coupons and Hyperinflation",
      text: "Đời sống người dân **cùng cực**. Hệ thống **tem phiếu** kiểm soát mọi nhu yếu phẩm – từ gạo, thịt đến vải vóc. Người dân xếp hàng dài từ **4 giờ sáng** để mua vài lạng thịt. Lạm phát phi mã lên đến **700%/năm** – đồng tiền mất giá theo từng ngày. Sản xuất nông nghiệp trì trệ vì nông dân **không có động lực** khi mọi sản phẩm đều bị thu mua theo giá Nhà nước. Hàng triệu người liều mình **vượt biên** trên những chiếc thuyền mong manh – thảm kịch **thuyền nhân** gây chấn động thế giới. Đất nước đứng trước **bờ vực sụp đổ** kinh tế.",
      textEn: "Life was **desperate**. The **ration coupon** system controlled all necessities – rice, meat, even fabric. People queued from **4 AM** to buy a few ounces of meat. Inflation skyrocketed to **700%/year** – currency lost value daily. Agricultural production stagnated as farmers had **no incentive** when all products were purchased at state-set prices. Millions risked their lives **fleeing by sea** on fragile boats – the **boat people** tragedy that shocked the world. The country stood on the **brink of economic collapse**.",
      imageUrl: doiMoi,
    },
    {
      title: "🌱 Đổi Mới – Bước ngoặt vĩ đại nhất",
      titleEn: "🌱 Doi Moi – The Greatest Turning Point",
      text: "Tháng **12 năm 1986**, **Đại hội Đảng lần thứ VI** họp tại Hà Nội đưa ra quyết định **lịch sử**: thực hiện **Đổi Mới** – chuyển đổi từ kinh tế kế hoạch sang **kinh tế thị trường** định hướng xã hội chủ nghĩa. Đây là cuộc **cách mạng tư duy** sâu sắc nhất kể từ 1945. Nông dân được **giao quyền sử dụng đất**, tự quyết định trồng gì, bán cho ai. Doanh nghiệp tư nhân được phép **thành lập và hoạt động**. Cánh cửa mở rộng cho **đầu tư nước ngoài**. Kết quả đến **nhanh chóng và ngoạn mục**: từ nước thiếu lương thực triền miên, Việt Nam vươn lên thành nước **xuất khẩu gạo lớn thứ 2-3 thế giới** chỉ trong vài năm.",
      textEn: "In **December 1986**, the **6th Party Congress** in Hanoi made a **historic** decision: implement **Doi Moi** – transitioning from a planned economy to a socialist-oriented **market economy**. This was the most profound **revolution in thinking** since 1945. Farmers received **land use rights**, deciding what to grow and to whom to sell. Private businesses could **legally form and operate**. Doors opened wide for **foreign investment**. Results came **quickly and spectacularly**: from chronic food shortages, Vietnam rose to become the world's **2nd-3rd largest rice exporter** within just a few years.",
    },
    {
      title: "🏛️ Di sản – Phép màu thay đổi vận mệnh dân tộc",
      titleEn: "🏛️ Legacy – The Miracle That Changed a Nation's Destiny",
      text: "Đổi Mới không chỉ là một chính sách kinh tế – đó là **bước ngoặt vận mệnh** của cả dân tộc. Từ một trong những quốc gia nghèo nhất thế giới, Việt Nam trở thành **câu chuyện phát triển thần kỳ** được Ngân hàng Thế giới ca ngợi. GDP đầu người tăng gấp **40 lần** trong ba thập kỷ. Tỷ lệ nghèo giảm từ **58%** xuống dưới **5%**. Quan trọng hơn, Đổi Mới chứng minh rằng một quốc gia có thể **thay đổi hoàn toàn** vận mệnh thông qua **dũng khí cải cách** và ý chí **tự cường**. Bài học này vẫn đang truyền cảm hứng cho nhiều quốc gia đang phát triển trên khắp thế giới ngày nay.",
      textEn: "Doi Moi was not merely an economic policy – it was a **turning point in the nation's destiny**. From one of the world's poorest countries, Vietnam became a **development miracle** praised by the World Bank. Per capita GDP increased **40-fold** in three decades. Poverty dropped from **58%** to under **5%**. More importantly, Doi Moi proved that a nation can **completely change** its destiny through the **courage to reform** and the will for **self-reliance**. This lesson continues to inspire developing nations worldwide today.",
    },
  ],

  "hist-4-2": [
    {
      title: "🏔️ Bối cảnh – Từ cô lập đến mở cửa",
      titleEn: "🏔️ Context – From Isolation to Opening Up",
      text: "Sau **Đổi Mới 1986**, Việt Nam bắt đầu xoay chuyển chính sách đối ngoại từ **đối đầu** sang **đối thoại**. Suốt gần hai thập kỷ, đất nước bị **cô lập** về mặt ngoại giao – lệnh cấm vận của Mỹ kéo dài, quan hệ với Trung Quốc **căng thẳng** sau chiến tranh biên giới 1979, và sự sụp đổ của **Liên Xô** (1991) khiến Việt Nam mất đi chỗ dựa kinh tế lớn nhất. Trong bối cảnh đó, ban lãnh đạo nhận ra rằng **hội nhập quốc tế** không chỉ là lựa chọn – mà là **điều kiện sống còn**. Chính sách **'làm bạn với tất cả các nước'** được xác lập, mở ra chương mới cho ngoại giao Việt Nam.",
      textEn: "After **Doi Moi in 1986**, Vietnam began shifting its foreign policy from **confrontation** to **dialogue**. For nearly two decades, the country had been **diplomatically isolated** – the US embargo persisted, China relations were **tense** after the 1979 border war, and the **Soviet Union's collapse** (1991) eliminated Vietnam's largest economic support. In this context, leadership realized that **international integration** was not just a choice – but a **matter of survival**. The policy of **'befriending all nations'** was established, opening a new chapter for Vietnamese diplomacy.",
    },
    {
      title: "🤝 Bình thường hóa – Cựu thù thành bạn",
      titleEn: "🤝 Normalization – Enemies Become Friends",
      text: "**Năm 1995** trở thành bước ngoặt ngoại giao lịch sử: Việt Nam **gia nhập ASEAN** và **bình thường hóa quan hệ với Mỹ** – chấm dứt hai thập kỷ thù địch. Hình ảnh cựu Ngoại trưởng **Warren Christopher** bắt tay Bộ trưởng Nguyễn Mạnh Cầm tại Washington trở thành **biểu tượng hòa giải** của thế kỷ 20. Năm **2000**, Tổng thống **Bill Clinton** thăm Việt Nam – chuyến thăm đầu tiên của một tổng thống Mỹ kể từ chiến tranh. Hàng triệu người Việt đổ ra đường **chào đón** – cựu thù trở thành bạn bè, minh chứng cho sức mạnh của **hòa giải và tha thứ**.",
      textEn: "**1995** became a historic diplomatic watershed: Vietnam **joined ASEAN** and **normalized relations with the US** – ending two decades of hostility. The image of former Secretary of State **Warren Christopher** shaking hands with Minister Nguyen Manh Cam in Washington became a **symbol of reconciliation** of the 20th century. In **2000**, President **Bill Clinton** visited Vietnam – the first US presidential visit since the war. Millions of Vietnamese took to the streets to **welcome** him – enemies became friends, proving the power of **reconciliation and forgiveness**.",
      imageUrl: vietnamAsean,
    },
    {
      title: "🌐 WTO – Cánh cửa thương mại mở toang",
      titleEn: "🌐 WTO – Trade Doors Wide Open",
      text: "**Năm 2007**, sau **11 năm** đàm phán gian khổ, Việt Nam chính thức gia nhập **Tổ chức Thương mại Thế giới (WTO)** – thành viên thứ **150**. Đây là thành quả của hàng nghìn phiên đàm phán, hàng trăm **cải cách luật pháp**, và quyết tâm **hội nhập sâu rộng**. Xuất khẩu tăng vọt, hàng triệu **việc làm mới** được tạo ra. Tiếp nối thành công, Việt Nam ký kết hàng loạt hiệp định thương mại tự do thế hệ mới: **CPTPP** (2018), **EVFTA** (2020), **RCEP** (2020) – mở ra thị trường hàng tỷ người tiêu dùng.",
      textEn: "In **2007**, after **11 years** of arduous negotiation, Vietnam officially joined the **World Trade Organization (WTO)** as its **150th** member. This was the result of thousands of negotiation sessions, hundreds of **legal reforms**, and a determination for **deep integration**. Exports surged, millions of **new jobs** were created. Building on this success, Vietnam signed a series of new-generation free trade agreements: **CPTPP** (2018), **EVFTA** (2020), **RCEP** (2020) – opening markets of billions of consumers.",
    },
    {
      title: "🏛️ Di sản – Vị thế ngoại giao cân bằng hiếm có",
      titleEn: "🏛️ Legacy – A Remarkably Balanced Diplomatic Position",
      text: "Ngày nay, Việt Nam có quan hệ thương mại với hơn **200 quốc gia** và vùng lãnh thổ. Điều đáng kinh ngạc hơn là Việt Nam đồng thời là **đối tác chiến lược toàn diện** của cả **Mỹ, Trung Quốc, Nhật Bản, Hàn Quốc** và **Ấn Độ** – một vị thế ngoại giao **cân bằng hiếm có** trên thế giới. Từ quốc gia bị cô lập, Việt Nam đã **chứng minh** rằng một nước nhỏ hoàn toàn có thể trở thành **đối tác tin cậy** của tất cả các cường quốc bằng sự **khéo léo, kiên nhẫn** và tầm nhìn chiến lược dài hạn.",
      textEn: "Today, Vietnam trades with over **200 countries** and territories. What's more remarkable is that Vietnam is simultaneously a **comprehensive strategic partner** of the **US, China, Japan, South Korea**, and **India** – a **rarely balanced** diplomatic position globally. From an isolated nation, Vietnam has **proven** that a small country can become a **trusted partner** of all major powers through **skillful, patient** diplomacy and long-term strategic vision.",
    },
  ],

  "hist-4-3": [
    {
      title: "🏔️ Bối cảnh – Thế giới bước vào kỷ nguyên Internet",
      titleEn: "🏔️ Context – The World Enters the Internet Age",
      text: "Giữa thập niên **1990**, cuộc cách mạng **Internet** đang thay đổi toàn bộ thế giới – từ cách con người giao tiếp, kinh doanh đến tiếp cận tri thức. Trong khi **Mỹ và châu Âu** đã phổ cập Internet từ đầu thập kỷ, Việt Nam – vẫn đang trong giai đoạn đầu của **Đổi Mới** – phải đối mặt với câu hỏi lớn: liệu có nên **mở cửa** không gian mạng cho 80 triệu người dân? Những lo ngại về **an ninh thông tin**, ảnh hưởng văn hóa nước ngoài và khả năng **kiểm soát** khiến nhiều người e dè. Nhưng ban lãnh đạo nhận ra: **bỏ lỡ Internet** nghĩa là bỏ lỡ tương lai.",
      textEn: "In the mid-**1990s**, the **Internet** revolution was transforming the entire world – from communication and business to knowledge access. While the **US and Europe** had already popularized the Internet early in the decade, Vietnam – still in the early stages of **Doi Moi** – faced a crucial question: should it **open** cyberspace to 80 million people? Concerns about **information security**, foreign cultural influence, and **control** made many hesitant. But leadership realized: **missing the Internet** meant missing the future.",
    },
    {
      title: "💻 Ngày kết nối lịch sử",
      titleEn: "💻 The Historic Connection Day",
      text: "**Ngày 19 tháng 11 năm 1997**, Việt Nam chính thức kết nối **Internet toàn cầu**. Ban đầu chỉ có vài trăm người dùng – chủ yếu là các viện nghiên cứu và cơ quan nhà nước. Tốc độ **56 kbps** – chậm đến mức tải một bức ảnh mất vài phút. Nhưng hạt giống đã được **gieo xuống**. **FPT** – từ một công ty nhỏ – trở thành tập đoàn công nghệ lớn nhất, xuất khẩu phần mềm ra **30+ quốc gia**. **VNG** phát triển **Zalo** – ứng dụng nhắn tin với **75 triệu người dùng**. **Viettel** – từ doanh nghiệp quân đội – vươn ra đầu tư viễn thông ở **10 quốc gia**.",
      textEn: "On **November 19, 1997**, Vietnam officially connected to the **global Internet**. Initially only a few hundred users – mainly research institutes and government agencies. Speed was **56 kbps** – so slow that loading a photo took minutes. But the seed had been **planted**. **FPT** – from a small company – became the largest tech corporation, exporting software to **30+ countries**. **VNG** developed **Zalo** – a messaging app with **75 million users**. **Viettel** – from a military enterprise – expanded to invest in telecoms across **10 countries**.",
      imageUrl: vietnamDigital,
    },
    {
      title: "📱 Quốc gia số hóa nhanh nhất Đông Nam Á",
      titleEn: "📱 Southeast Asia's Fastest-Digitalizing Nation",
      text: "Từ vài trăm người dùng năm 1997, đến nay hơn **77 triệu người** Việt Nam sử dụng Internet – chiếm **78% dân số**. Thanh toán không tiền mặt **bùng nổ**: **MoMo, ZaloPay, VNPay** trở thành phần không thể thiếu trong cuộc sống hàng ngày. Thương mại điện tử phát triển **chóng mặt** – từ chợ truyền thống đến **Shopee, Lazada, TikTok Shop**. Việt Nam thu hút những **gã khổng lồ** công nghệ: **Samsung** đầu tư hơn 20 tỷ USD, **Intel** xây nhà máy chip, **LG** đặt cơ sở sản xuất – biến đất nước thành **trung tâm sản xuất công nghệ** của khu vực.",
      textEn: "From a few hundred users in 1997, today over **77 million** Vietnamese use the Internet – **78% of the population**. Cashless payment **exploded**: **MoMo, ZaloPay, VNPay** became indispensable in daily life. E-commerce developed **dizzingly** – from traditional markets to **Shopee, Lazada, TikTok Shop**. Vietnam attracted tech **giants**: **Samsung** invested over $20 billion, **Intel** built a chip factory, **LG** established manufacturing – transforming the country into a **regional tech manufacturing hub**.",
    },
    {
      title: "🏛️ Di sản – Từ nông nghiệp đến nền kinh tế số",
      titleEn: "🏛️ Legacy – From Agriculture to Digital Economy",
      text: "Chỉ trong **25 năm**, Việt Nam đã hoàn thành cuộc chuyển đổi mà nhiều quốc gia mất **nửa thế kỷ**: từ nền kinh tế **nông nghiệp thuần túy** sang quốc gia **số hóa hàng đầu** khu vực. Mục tiêu **kinh tế số đạt 30% GDP** vào năm 2030 không còn viển vông. Câu chuyện số hóa của Việt Nam chứng minh rằng: một quốc gia **đi sau** hoàn toàn có thể **nhảy vọt** – bỏ qua các giai đoạn trung gian – để đến thẳng **tương lai số**, nếu có đủ **quyết tâm và tầm nhìn**.",
      textEn: "In just **25 years**, Vietnam completed a transformation that took many nations **half a century**: from a **purely agricultural** economy to a **leading digital** nation in the region. The target of a **digital economy reaching 30% of GDP** by 2030 is no longer far-fetched. Vietnam's digital story proves that a **latecomer** nation can absolutely **leapfrog** – skipping intermediate stages – to reach the **digital future** directly, with enough **determination and vision**.",
    },
  ],

  "hist-4-4": [
    {
      title: "🏔️ Bối cảnh – Từ cô lập đến sân khấu thế giới",
      titleEn: "🏔️ Context – From Isolation to the World Stage",
      text: "Trong suốt thập niên **1980**, Việt Nam gần như **vắng bóng** trên trường quốc tế. Bị cô lập bởi **lệnh cấm vận**, không có ghế trong hầu hết các tổ chức quốc tế quan trọng, và bị phương Tây **xa lánh** vì cuộc xung đột ở Campuchia. Nhưng sau Đổi Mới và đặc biệt sau khi **rút quân khỏi Campuchia** (1989), cánh cửa ngoại giao bắt đầu **hé mở**. Việt Nam cần chứng minh với thế giới rằng mình không chỉ là một quốc gia chiến tranh, mà có thể trở thành **đối tác hòa bình tin cậy** trên trường quốc tế.",
      textEn: "Throughout the **1980s**, Vietnam was virtually **absent** from the international stage. Isolated by **embargoes**, excluded from most major international organizations, and **shunned** by the West due to the Cambodia conflict. But after Doi Moi and especially after **withdrawing from Cambodia** (1989), diplomatic doors began to **crack open**. Vietnam needed to prove to the world it was not just a war-torn nation, but could become a **trusted peaceful partner** on the international stage.",
    },
    {
      title: "🏛️ Hai lần ngồi ghế Hội đồng Bảo an",
      titleEn: "🏛️ Twice on the Security Council",
      text: "Sự trỗi dậy ngoại giao của Việt Nam được đánh dấu bằng hai lần được bầu làm **Ủy viên không thường trực Hội đồng Bảo an Liên Hợp Quốc** – năm **2008** và **2020** – cả hai lần đều với phiếu bầu **gần như tuyệt đối**. Đây là sự công nhận cao nhất cho uy tín quốc tế của một quốc gia nhỏ. Việt Nam giữ vai trò **Chủ tịch ASEAN** hai lần (2010, 2020), tổ chức thành công **APEC 2017** tại Đà Nẵng với sự tham dự của các nhà lãnh đạo hàng đầu thế giới.",
      textEn: "Vietnam's diplomatic rise was marked by twice being elected as a **non-permanent member of the UN Security Council** – in **2008** and **2020** – both times with **near-unanimous** votes. This is the highest recognition of international credibility for a small nation. Vietnam served as **ASEAN Chair** twice (2010, 2020), successfully hosted **APEC 2017** in Da Nang with attendance from the world's top leaders.",
    },
    {
      title: "🌍 Trung gian đáng tin cậy",
      titleEn: "🌍 A Trusted Mediator",
      text: "Đỉnh cao của vị thế mới là khi Việt Nam được chọn làm nơi tổ chức **Hội nghị Thượng đỉnh Mỹ-Triều Tiên** lần thứ 2 (**2019**) tại Hà Nội. Tổng thống **Donald Trump** và Chủ tịch **Kim Jong-un** gặp nhau tại khách sạn Metropole lịch sử – nơi mà vài thập kỷ trước, bom Mỹ từng rơi xuống. Hình ảnh này chứng tỏ Việt Nam đã trở thành **trung gian đáng tin cậy** trong các vấn đề quốc tế. Từ năm 2014, Việt Nam còn tham gia **lực lượng gìn giữ hòa bình** Liên Hợp Quốc – đóng góp trực tiếp cho hòa bình thế giới.",
      textEn: "The pinnacle of this new status was when Vietnam was chosen to host the **2nd US-North Korea Summit** (**2019**) in Hanoi. President **Donald Trump** and Chairman **Kim Jong-un** met at the historic Metropole Hotel – where decades earlier, American bombs had once fallen. This image proved Vietnam had become a **trusted mediator** in international affairs. Since 2014, Vietnam has also participated in **UN peacekeeping forces** – directly contributing to world peace.",
    },
    {
      title: "🏛️ Di sản – Nước nhỏ, tầm vóc lớn",
      titleEn: "🏛️ Legacy – Small Country, Grand Stature",
      text: "Ngày nay, Việt Nam là **đối tác chiến lược toàn diện** đồng thời của **Mỹ, Trung Quốc, Nhật Bản, Hàn Quốc** và **Ấn Độ** – một vị thế mà rất ít quốc gia trên thế giới đạt được. Bí quyết: chính sách **'đa phương hóa, đa dạng hóa'** – không nghiêng về bất cứ phe nào, làm bạn với tất cả. Từ quốc gia bị cô lập hoàn toàn, Việt Nam đã chứng minh rằng **sự khéo léo ngoại giao** và **kiên nhẫn chiến lược** có thể đưa một nước nhỏ lên vị thế **lớn lao** trên trường quốc tế.",
      textEn: "Today, Vietnam is simultaneously a **comprehensive strategic partner** of the **US, China, Japan, South Korea**, and **India** – a position very few countries in the world have achieved. The secret: a policy of **'multilateralization and diversification'** – not leaning toward any side, befriending all. From a completely isolated nation, Vietnam has proven that **diplomatic finesse** and **strategic patience** can elevate a small country to a **grand stature** on the international stage.",
    },
  ],

  "hist-4-5": [
    {
      title: "🏔️ Bối cảnh – Đứng trước ngã rẽ lịch sử",
      titleEn: "🏔️ Context – Standing at a Historic Crossroads",
      text: "Bước vào thập niên **2020**, Việt Nam đã đạt được những **thành tựu phi thường**: thoát nghèo, hội nhập sâu rộng, vị thế quốc tế vững chắc. Nhưng thành công trong quá khứ không **bảo đảm** cho tương lai. Đất nước đang đứng trước **ngã rẽ** quan trọng nhất kể từ Đổi Mới: hoặc **bứt phá** để gia nhập hàng ngũ các quốc gia phát triển, hoặc **sa vào** bẫy thu nhập trung bình – nơi nhiều quốc gia đã **mắc kẹt** hàng thập kỷ mà không thể tiến lên. Thời gian không chờ đợi – dân số đang **già hóa** nhanh, và cửa sổ cơ hội **lợi thế dân số vàng** đang dần khép lại.",
      textEn: "Entering the **2020s**, Vietnam had achieved **extraordinary** accomplishments: escaping poverty, deep integration, and a solid international standing. But past success doesn't **guarantee** the future. The country faces its most critical **crossroads** since Doi Moi: either **break through** to join developed nations, or **fall into** the middle-income trap – where many countries have been **stuck** for decades without progressing. Time waits for no one – the population is **aging** rapidly, and the window of **golden demographic advantage** is gradually closing.",
    },
    {
      title: "🌊 Những thách thức chưa từng có",
      titleEn: "🌊 Unprecedented Challenges",
      text: "**Biến đổi khí hậu** đe dọa trực tiếp: đồng bằng sông **Cửu Long** – vựa lúa của cả nước – đang **chìm dần** do nước biển dâng. Theo dự báo, đến năm 2050, gần **40% diện tích** có thể bị ngập. Ô nhiễm môi trường tại các đô thị lớn ở mức **báo động**. Bất bình đẳng giàu nghèo giữa **thành thị và nông thôn** gia tăng. Năng suất lao động vẫn **thấp** so với khu vực – chỉ bằng 1/15 Singapore. Hệ thống giáo dục cần **cải cách toàn diện** để đào tạo nguồn nhân lực cho kỷ nguyên AI và công nghệ.",
      textEn: "**Climate change** poses a direct threat: the **Mekong Delta** – the nation's rice bowl – is **gradually sinking** from rising seas. By 2050 projections, nearly **40% of the area** could be flooded. Environmental pollution in major cities is at **alarming** levels. The wealth gap between **urban and rural** areas is growing. Labor productivity remains **low** regionally – just 1/15th of Singapore. The education system needs **comprehensive reform** to train human resources for the AI and technology era.",
    },
    {
      title: "💪 Những lợi thế mang tính quyết định",
      titleEn: "💪 Decisive Advantages",
      text: "Tuy nhiên, Việt Nam sở hữu những lợi thế mà nhiều quốc gia **khao khát**: dân số **trẻ** với độ tuổi trung bình chỉ **32** – đầy năng động và ham học hỏi. Tỷ lệ biết chữ trên **97%** – cao hơn nhiều nước có GDP cao hơn. Vị trí **địa chiến lược** tại trung tâm Đông Nam Á, nằm trên các tuyến hàng hải quốc tế quan trọng nhất. Chi phí nhân công **cạnh tranh** nhưng tay nghề ngày càng cao. Và quan trọng nhất: tinh thần **kiên cường, không khuất phục** đã được tôi luyện qua hàng nghìn năm lịch sử.",
      textEn: "However, Vietnam possesses advantages many nations **envy**: a **young** population with an average age of just **32** – dynamic and eager to learn. Literacy rate above **97%** – higher than many countries with higher GDP. **Geostrategic** position at the heart of Southeast Asia, on the most critical international shipping lanes. **Competitive** labor costs with increasingly skilled workers. And most importantly: the spirit of **resilience and indomitability** forged through thousands of years of history.",
    },
    {
      title: "🚀 Di sản – Tầm nhìn 2045",
      titleEn: "🚀 Legacy – Vision 2045",
      text: "Mục tiêu **2045** – đúng **100 năm** ngày Quốc khánh – là trở thành **nước phát triển, thu nhập cao**. Chiến lược xoay quanh ba trụ cột: **chuyển đổi số** (kinh tế số đạt 30% GDP), **năng lượng sạch** (cam kết net-zero 2050 tại COP26), và **nâng cao giáo dục** theo hướng STEM và sáng tạo. Nếu thành công, Việt Nam sẽ viết nên một trong những **câu chuyện vĩ đại nhất** của nhân loại: từ quốc gia bị chiến tranh tàn phá đến **cường quốc thịnh vượng** – chỉ trong **100 năm**.",
      textEn: "The **2045** goal – exactly **100 years** of National Day – is to become a **developed, high-income nation**. The strategy revolves around three pillars: **digital transformation** (digital economy at 30% of GDP), **clean energy** (net-zero 2050 commitment at COP26), and **elevating education** toward STEM and creativity. If successful, Vietnam will write one of **humanity's greatest stories**: from a war-devastated nation to a **prosperous power** – in just **100 years**.",
    },
  ],

  "hist-4-6": [
    {
      title: "🏔️ Bối cảnh – Nền kinh tế bên bờ vực",
      titleEn: "🏔️ Context – An Economy on the Brink",
      text: "Trước Đổi Mới, nền kinh tế Việt Nam **chìm sâu** trong khủng hoảng. GDP đầu người chỉ khoảng **100 USD/năm** – thuộc nhóm nghèo nhất thế giới. **58% dân số** sống dưới ngưỡng nghèo. Hệ thống kinh tế kế hoạch **trì trệ**: nhà máy hoạt động cầm chừng, nông dân không có động lực sản xuất, thị trường chợ đen **tràn lan**. Mỗi gia đình phải dùng **sổ gạo** để mua lương thực – và nhiều khi sổ gạo cũng **không đủ**. Trong bối cảnh ảm đạm ấy, không ai dám nghĩ rằng chỉ vài thập kỷ sau, Việt Nam sẽ trở thành **phép màu kinh tế** của châu Á.",
      textEn: "Before Doi Moi, Vietnam's economy was **deeply mired** in crisis. Per capita GDP was only about **$100/year** – among the world's poorest. **58% of the population** lived below the poverty line. The planned economic system was **stagnant**: factories barely operating, farmers without production incentive, black markets **rampant**. Each family used **rice books** to buy food – and often the rice books **weren't enough**. In that bleak context, nobody dared imagine that just decades later, Vietnam would become Asia's **economic miracle**.",
    },
    {
      title: "📈 Phép màu tăng trưởng",
      titleEn: "📈 The Growth Miracle",
      text: "Đổi Mới giải phóng năng lượng **tiềm ẩn** của hàng triệu người Việt. GDP tăng trưởng **6-7%/năm** suốt hàng thập kỷ – thuộc nhóm tăng trưởng **nhanh nhất** thế giới. GDP đầu người tăng từ **~100 USD** (1986) lên **~4.200 USD** (2023) – gấp **40 lần**. Tỷ lệ nghèo giảm **kỷ lục**: từ 58% (1993) xuống dưới **5%** – hàng chục triệu người thoát nghèo. **Ngân hàng Thế giới** gọi đây là *'câu chuyện phát triển thần kỳ'* và xếp Việt Nam vào nhóm các quốc gia **giảm nghèo thành công nhất** trong lịch sử.",
      textEn: "Doi Moi unleashed the **latent** energy of millions of Vietnamese. GDP grew **6-7%/year** for decades – among the world's **fastest** growth rates. Per capita GDP rose from **~$100** (1986) to **~$4,200** (2023) – a **40-fold** increase. Poverty dropped **record-breakingly**: from 58% (1993) to under **5%** – tens of millions lifted out of poverty. The **World Bank** called it a *'development miracle'* and ranked Vietnam among the **most successful poverty-reduction** stories in history.",
      imageUrl: vietnamEconomy,
    },
    {
      title: "🏭 Cơ sở sản xuất toàn cầu",
      titleEn: "🏭 A Global Manufacturing Base",
      text: "**Samsung** chọn Việt Nam làm **cứ điểm sản xuất** lớn nhất toàn cầu – đầu tư hơn **20 tỷ USD**, tạo ra hàng trăm nghìn việc làm. Gần **50% smartphone Samsung** trên thế giới được sản xuất tại Bắc Ninh và Thái Nguyên. **Intel** xây nhà máy chip ở TP.HCM; **Toyota, Honda, LG** đều có cơ sở sản xuất lớn. Về nông sản, Việt Nam xuất khẩu **lớn thứ 2-3 thế giới** về cà phê, hồ tiêu, hạt điều, gạo, thủy sản – từ nước thiếu lương thực trở thành **cường quốc nông nghiệp**.",
      textEn: "**Samsung** chose Vietnam as its **largest** global manufacturing base – investing over **$20 billion**, creating hundreds of thousands of jobs. Nearly **50% of Samsung smartphones** worldwide are produced in Bac Ninh and Thai Nguyen. **Intel** built a chip factory in HCMC; **Toyota, Honda, LG** all have major manufacturing bases. In agriculture, Vietnam is the world's **2nd-3rd largest exporter** of coffee, pepper, cashews, rice, and seafood – from food-deficit to **agricultural powerhouse**.",
    },
    {
      title: "🏛️ Di sản – Thách thức của sự thành công",
      titleEn: "🏛️ Legacy – The Challenges of Success",
      text: "Phép màu kinh tế đem lại niềm tự hào, nhưng cũng đặt ra **thách thức mới**. Năng suất lao động vẫn **thấp** – chỉ bằng 1/15 Singapore, 1/4 Thái Lan. Nền kinh tế **phụ thuộc** quá nhiều vào gia công, lắp ráp cho doanh nghiệp nước ngoài. Giá trị gia tăng trong nước **chưa cao**. Bài toán tiếp theo là **bứt phá** lên chuỗi giá trị cao hơn: công nghệ, thiết kế, thương hiệu **Made in Vietnam**. Câu chuyện kinh tế Việt Nam chứng minh rằng **thoát nghèo** mới chỉ là bước đầu – **giàu mạnh bền vững** mới là đích đến thực sự.",
      textEn: "The economic miracle brought pride but also posed **new challenges**. Labor productivity remains **low** – just 1/15th of Singapore, 1/4th of Thailand. The economy **depends** too heavily on processing and assembly for foreign companies. Domestic **value-added** is still limited. The next challenge is **breaking through** to higher value chains: technology, design, and the **Made in Vietnam** brand. Vietnam's economic story proves that **escaping poverty** is only the first step – **sustainable prosperity** is the true destination.",
    },
  ],

  "hist-4-7": [
    {
      title: "🏔️ Bối cảnh – Mối đe dọa từ biên giới",
      titleEn: "🏔️ Context – A Threat from the Border",
      text: "Cuối năm **2019**, tin tức về một loại virus bí ẩn tại **Vũ Hán, Trung Quốc** – chỉ cách biên giới Việt Nam vài trăm km – bắt đầu lan truyền. Việt Nam chia sẻ đường biên giới dài **1.450 km** với Trung Quốc, hàng ngày có hàng nghìn người **qua lại**. Hệ thống y tế **hạn chế** – chỉ có vài trăm máy thở, phòng ICU thiếu trầm trọng. Các chuyên gia quốc tế dự đoán Việt Nam sẽ là một trong những nước bị ảnh hưởng **nặng nề nhất**. Nhưng điều xảy ra tiếp theo khiến cả thế giới **kinh ngạc**.",
      textEn: "In late **2019**, news of a mysterious virus in **Wuhan, China** – just a few hundred km from Vietnam's border – began spreading. Vietnam shares a **1,450 km** border with China, with thousands crossing **daily**. The healthcare system was **limited** – only a few hundred ventilators, severe ICU shortages. International experts predicted Vietnam would be among the **hardest hit**. But what happened next **astonished** the world.",
    },
    {
      title: "🦠 Hình mẫu kiểm soát đại dịch",
      titleEn: "🦠 A Model of Pandemic Control",
      text: "Ngay từ **tháng 1 năm 2020**, khi WHO chưa tuyên bố đại dịch, Việt Nam đã hành động **quyết liệt**: đóng biên giới với Trung Quốc, hủy mọi chuyến bay, thiết lập hệ thống **truy vết** nghiêm ngặt – mỗi ca nhiễm truy ra hàng trăm **F1, F2, F3**. Cách ly tập trung **miễn phí** cho hàng chục nghìn người. Ứng dụng **Bluezone** giúp theo dõi tiếp xúc. Quân đội được huy động **hỗ trợ y tế**. Kết quả: năm 2020, với **97 triệu dân**, chỉ có **~1.500 ca** nhiễm và **35 tử vong**. **BBC, CNN, Bloomberg** đồng loạt ca ngợi *'mô hình Việt Nam'*.",
      textEn: "From **January 2020**, before WHO declared a pandemic, Vietnam acted **decisively**: closing borders with China, canceling all flights, establishing a rigorous **contact tracing** system – each case traced to hundreds of **F1, F2, F3** contacts. **Free** centralized quarantine for tens of thousands. The **Bluezone** app tracked contacts. The military was mobilized for **medical support**. Result: in 2020, with **97 million people**, only **~1,500 cases** and **35 deaths**. **BBC, CNN, Bloomberg** unanimously praised the *'Vietnam model.'*",
    },
    {
      title: "🔄 Sóng Delta và bài học thích ứng",
      titleEn: "🔄 The Delta Wave and Lessons in Adaptation",
      text: "Tuy nhiên, mô hình **'zero-COVID'** không thể duy trì mãi. Giữa năm **2021**, biến thể **Delta** cực kỳ lây lan tấn công TP.HCM và các tỉnh phía Nam. Số ca nhiễm **tăng vọt** – từ vài chục lên hàng chục nghìn ca mỗi ngày. Thành phố 10 triệu dân phải **phong tỏa** nghiêm ngặt trong nhiều tháng. Đây là giai đoạn **đen tối nhất** – nhưng cũng thể hiện tinh thần **đoàn kết**: hàng triệu suất ăn được gửi đến người nghèo, bác sĩ từ mọi miền **chi viện** cho miền Nam.",
      textEn: "However, the **'zero-COVID'** model couldn't be maintained forever. In mid-**2021**, the extremely contagious **Delta** variant struck HCMC and southern provinces. Cases **surged** – from dozens to tens of thousands per day. A city of 10 million had to **lock down** strictly for months. This was the **darkest period** – but also showcased the spirit of **solidarity**: millions of meals delivered to the poor, doctors from across the country **reinforced** the South.",
    },
    {
      title: "🏛️ Di sản – Linh hoạt là chìa khóa sống còn",
      titleEn: "🏛️ Legacy – Flexibility Is the Key to Survival",
      text: "Bài học lớn nhất từ COVID-19 là **sự linh hoạt**. Việt Nam nhanh chóng chuyển sang chiến lược **'sống chung với COVID'**, đẩy mạnh **tiêm vaccine** với tốc độ kỷ lục – đạt tỷ lệ tiêm chủng **cao nhất khu vực**. Kinh tế phục hồi **nhanh chóng**: GDP tăng trưởng **8%** năm 2022 – thuộc nhóm cao nhất thế giới. Trải qua đại dịch, Việt Nam rút ra bài học sâu sắc: thành công không nằm ở việc có **kế hoạch hoàn hảo**, mà ở khả năng **thích ứng nhanh chóng** khi thực tế thay đổi. Tinh thần **kiên cường** của dân tộc một lần nữa được **tôi luyện** qua thử thách.",
      textEn: "The greatest lesson from COVID-19 was **flexibility**. Vietnam quickly shifted to a **'living with COVID'** strategy, accelerating **vaccination** at record speed – achieving the region's **highest** vaccination rate. The economy recovered **rapidly**: GDP grew **8%** in 2022 – among the world's highest. Through the pandemic, Vietnam drew a profound lesson: success lies not in having a **perfect plan**, but in the ability to **adapt quickly** when reality changes. The nation's spirit of **resilience** was once again **forged** through trial.",
    },
  ],

  "hist-4-8": [
    {
      title: "🏔️ Bối cảnh – Nghịch lý giáo dục",
      titleEn: "🏔️ Context – The Education Paradox",
      text: "Trong thế giới giáo dục quốc tế, có một **nghịch lý** nổi tiếng: các quốc gia giàu nhất thường có kết quả giáo dục **tốt nhất**. Mỹ, Nhật Bản, Singapore – với GDP đầu người hàng chục nghìn USD – đầu tư **khổng lồ** vào giáo dục và gặt hái thành quả. Nhưng năm **2012**, một quốc gia với GDP đầu người chỉ hơn **1.000 USD** – bằng 1/50 Mỹ – quyết định tham gia kỳ thi **PISA** (Programme for International Student Assessment) của OECD. Đó là Việt Nam. Không ai kỳ vọng gì nhiều từ **tân binh** này.",
      textEn: "In the world of international education, there's a famous **paradox**: the richest countries typically achieve the **best** educational outcomes. The US, Japan, Singapore – with per capita GDP of tens of thousands of dollars – invest **enormously** in education and reap the results. But in **2012**, a country with per capita GDP of just over **$1,000** – 1/50th of the US – decided to take the **PISA** (Programme for International Student Assessment) exam from the OECD. That country was Vietnam. Nobody expected much from this **newcomer**.",
    },
    {
      title: "📊 Kết quả gây chấn động thế giới",
      titleEn: "📊 Results That Shocked the World",
      text: "Kết quả PISA 2012 được công bố và giới giáo dục toàn cầu **sững sờ**. Học sinh 15 tuổi Việt Nam xếp thứ **17 về Toán** – trên cả **Mỹ** (thứ 36), **Anh** (thứ 26), **Pháp** (thứ 25). Về **Khoa học**, xếp thứ **8** – trên cả Đức và Thụy Sĩ. Về **Đọc hiểu**, cũng thuộc nhóm trên. **Ngân hàng Thế giới** gọi đây là *'hiện tượng giáo dục'* – một quốc gia với nguồn lực **hạn chế** nhưng đạt kết quả ngang bằng hoặc vượt trội các **cường quốc giáo dục** giàu có nhất thế giới.",
      textEn: "The 2012 PISA results were released and the global education community was **stunned**. Vietnamese 15-year-olds ranked **17th in Math** – above the **US** (36th), **UK** (26th), **France** (25th). In **Science**, ranked **8th** – above Germany and Switzerland. In **Reading**, also among the top group. The **World Bank** called it an *'education phenomenon'* – a country with **limited** resources achieving results matching or surpassing the world's wealthiest **educational powerhouses**.",
      imageUrl: vietnamEducation,
    },
    {
      title: "📚 Bí quyết ngàn năm hiếu học",
      titleEn: "📚 A Thousand-Year Secret of Scholarly Tradition",
      text: "Giới nghiên cứu **đổ xô** tìm hiểu bí quyết Việt Nam. Câu trả lời nằm ở **truyền thống ngàn năm**: từ thời **Văn Miếu – Quốc Tử Giám** (1070), học hành đã là **con đường** được cả xã hội tôn vinh. Gia đình Việt Nam dành ưu tiên **số một** cho giáo dục con cái – dù nghèo đến đâu cũng phải cho con **đi học**. Giáo viên được xã hội **kính trọng** – câu *'Nhất tự vi sư, bán tự vi sư'* (Một chữ cũng là thầy, nửa chữ cũng là thầy) ăn sâu vào văn hóa. Chương trình **Toán và Khoa học** được thiết kế **chặt chẽ**, đòi hỏi học sinh phải nắm vững kiến thức nền tảng.",
      textEn: "Researchers **rushed** to uncover Vietnam's secret. The answer lies in a **thousand-year tradition**: from the time of the **Temple of Literature – Quoc Tu Giam** (1070), learning has been a **path** honored by all of society. Vietnamese families make education their **number one** priority – no matter how poor, children must **attend school**. Teachers are socially **revered** – the saying *'One word makes a teacher, half a word makes a teacher'* is deeply embedded in culture. **Math and Science** curricula are designed **rigorously**, requiring students to master fundamental knowledge.",
    },
    {
      title: "🏛️ Di sản – Hiện tượng giáo dục và thách thức cải cách",
      titleEn: "🏛️ Legacy – Education Phenomenon and Reform Challenges",
      text: "Thành công PISA đem lại **niềm tự hào** to lớn, nhưng cũng phơi bày **hạn chế**: hệ thống giáo dục quá thiên về **thi cử** và ghi nhớ, ít khuyến khích **sáng tạo** và tư duy phản biện. Học sinh giỏi giải bài nhưng **thiếu** kỹ năng thực hành, làm việc nhóm, và khởi nghiệp. Đây là thách thức lớn trong kỷ nguyên **AI** và **công nghệ 4.0**. Việt Nam đang nỗ lực **cải cách** giáo dục – chuyển từ *'học để thi'* sang *'học để làm, học để sáng tạo'*. Nếu kết hợp được truyền thống **hiếu học** với tư duy **đổi mới**, Việt Nam có thể trở thành **cường quốc giáo dục** đích thực.",
      textEn: "PISA success brought immense **pride** but also exposed **limitations**: the education system is too focused on **exams** and memorization, with little encouragement for **creativity** and critical thinking. Students excel at solving problems but **lack** practical skills, teamwork, and entrepreneurship. This is a major challenge in the era of **AI** and **Industry 4.0**. Vietnam is striving to **reform** education – shifting from *'learning to test'* to *'learning to do, learning to create.'* If it combines the **scholarly tradition** with **innovative** thinking, Vietnam can become a true **educational powerhouse**.",
    },
  ],

  "hist-4-9": [
    {
      title: "🏔️ Bối cảnh – Ẩm thực như sức mạnh mềm",
      titleEn: "🏔️ Context – Cuisine as Soft Power",
      text: "Trong thế kỷ 21, **sức mạnh mềm** (soft power) trở thành vũ khí ngoại giao hiệu quả nhất. Nhật Bản có **sushi và anime**, Hàn Quốc có **K-pop và kimchi**, Thái Lan có **pad thai và du lịch**. Còn Việt Nam? Trong nhiều thập kỷ, hình ảnh Việt Nam trong mắt thế giới gắn liền với **chiến tranh** – bom đạn, napalm, và thảm kịch. Nhưng từ đầu thế kỷ 21, một **cuộc cách mạng âm thầm** đang diễn ra: ẩm thực Việt Nam bắt đầu **chinh phục** thế giới, thay đổi hoàn toàn cách nhìn của thế giới về đất nước hình chữ S.",
      textEn: "In the 21st century, **soft power** became the most effective diplomatic weapon. Japan has **sushi and anime**, South Korea has **K-pop and kimchi**, Thailand has **pad thai and tourism**. And Vietnam? For decades, Vietnam's image abroad was linked to **war** – bombs, napalm, and tragedy. But from the early 21st century, a **quiet revolution** was underway: Vietnamese cuisine began **conquering** the world, completely changing how the world views the S-shaped country.",
    },
    {
      title: "🍜 Phở, Bánh mì và Cà phê – Ba đại sứ văn hóa",
      titleEn: "🍜 Pho, Banh Mi, and Coffee – Three Cultural Ambassadors",
      text: "**Phở** – món soup quốc hồn quốc túy – có mặt ở hầu hết thành phố lớn từ **New York** đến **Tokyo**, từ **Paris** đến **Sydney**. Năm **2011**, **bánh mì** chính thức được đưa vào **từ điển Oxford** – công nhận toàn cầu cho một món ăn đường phố Việt Nam. Năm **2020**, **Google** tôn vinh bánh mì bằng **Google Doodle** – hiển thị trên trang chủ Google cho hàng tỷ người xem. **Cà phê Việt Nam** – đặc biệt **cà phê sữa đá** và **cà phê trứng** – trở thành **hiện tượng toàn cầu**, xuất hiện trên **CNN, BBC, Netflix** và hàng nghìn video viral trên TikTok.",
      textEn: "**Pho** – the quintessential national soup – can be found in almost every major city from **New York** to **Tokyo**, **Paris** to **Sydney**. In **2011**, **banh mi** was officially added to the **Oxford Dictionary** – global recognition for a Vietnamese street food. In **2020**, **Google** honored banh mi with a **Google Doodle** – displayed on Google's homepage for billions to see. **Vietnamese coffee** – especially **iced milk coffee** and **egg coffee** – became a **global phenomenon**, featured on **CNN, BBC, Netflix** and thousands of viral TikTok videos.",
      imageUrl: vietnamCuisine,
    },
    {
      title: "🌏 Áo dài, Điện ảnh và Giới trẻ toàn cầu",
      titleEn: "🌏 Ao Dai, Cinema, and Global Youth",
      text: "Không chỉ ẩm thực – **văn hóa Việt** tỏa sáng trên mọi lĩnh vực. **Áo dài** xuất hiện tại các **tuần lễ thời trang** quốc tế – từ Milan đến New York. Điện ảnh Việt Nam ghi dấu ấn tại **liên hoan phim Cannes, Venice, Berlin**. Và đặc biệt, **giới trẻ Việt Nam** trở thành hiện tượng trên mạng xã hội: hàng triệu người xem quốc tế theo dõi các TikToker, YouTuber Việt giới thiệu **ẩm thực, du lịch, văn hóa** – từ *'Bún Bò Huế Review'* đến *'24 giờ ở Sapa'*.",
      textEn: "Beyond cuisine – **Vietnamese culture** shines across all fields. **Ao dai** appears at international **fashion weeks** – from Milan to New York. Vietnamese cinema marks its presence at **Cannes, Venice, Berlin** film festivals. And notably, **Vietnamese youth** have become a social media phenomenon: millions of international viewers follow Vietnamese TikTokers and YouTubers showcasing **food, travel, culture** – from *'Bun Bo Hue Review'* to *'24 Hours in Sapa.'*",
    },
    {
      title: "🏛️ Di sản – Từ hình ảnh chiến tranh đến điểm đến mơ ước",
      titleEn: "🏛️ Legacy – From War Image to Dream Destination",
      text: "Cuộc **cách mạng văn hóa** âm thầm nhưng sâu sắc đã thay đổi hoàn toàn hình ảnh Việt Nam trên thế giới. Từ một quốc gia gắn liền với **chiến tranh và khổ đau**, Việt Nam nay trở thành **điểm đến mơ ước** của du khách toàn cầu – được **Lonely Planet, Travel + Leisure, Condé Nast Traveler** bình chọn là một trong những nơi **đáng đến nhất** thế giới. Bài học sâu sắc: **sức mạnh mềm** – ẩm thực, văn hóa, con người – có thể thay đổi vận mệnh của một quốc gia **hiệu quả hơn** cả vũ khí và kinh tế. Và Việt Nam mới chỉ **bắt đầu** hành trình này.",
      textEn: "The quiet but profound **cultural revolution** has completely transformed Vietnam's global image. From a country associated with **war and suffering**, Vietnam is now a **dream destination** for global travelers – voted by **Lonely Planet, Travel + Leisure, Condé Nast Traveler** as one of the world's **most worth-visiting** places. The profound lesson: **soft power** – cuisine, culture, people – can change a nation's destiny **more effectively** than weapons or economics. And Vietnam has only just **begun** this journey.",
    },
  ],

  "hist-4-10": [
    {
      title: "🏔️ Bối cảnh – 100 năm nhìn lại",
      titleEn: "🏔️ Context – Looking Back at 100 Years",
      text: "Vào ngày **2 tháng 9 năm 2045**, Việt Nam sẽ kỷ niệm **100 năm** Quốc khánh – ngày Chủ tịch **Hồ Chí Minh** đọc Tuyên ngôn Độc lập tại **Quảng trường Ba Đình** năm 1945. Nhìn lại một thế kỷ: từ quốc gia **thuộc địa** bị nô dịch, trải qua hai cuộc kháng chiến **khốc liệt**, vượt qua nghèo đói và cô lập, Việt Nam đã **vươn lên** trở thành một quốc gia có vị thế trên trường quốc tế. Nhưng liệu 20 năm tới có đủ để hoàn thành giấc mơ **nước phát triển, thu nhập cao**? Đây là câu hỏi mà cả dân tộc đang cùng tìm lời giải.",
      textEn: "On **September 2, 2045**, Vietnam will celebrate **100 years** of National Day – the day President **Ho Chi Minh** read the Declaration of Independence at **Ba Dinh Square** in 1945. Looking back at a century: from a **colonized** nation under subjugation, through two **fierce** resistance wars, overcoming poverty and isolation, Vietnam has **risen** to become a nation of international standing. But will the next 20 years be enough to fulfill the dream of a **developed, high-income nation**? This is the question the entire nation is seeking to answer.",
      imageUrl: vietnamFuture,
    },
    {
      title: "🎯 Ba trụ cột chiến lược",
      titleEn: "🎯 Three Strategic Pillars",
      text: "Chiến lược hướng đến 2045 xoay quanh **ba trụ cột** then chốt. **Thứ nhất – Chuyển đổi số**: mục tiêu kinh tế số đạt **30% GDP** vào năm 2030, xây dựng chính phủ số, đô thị thông minh, AI ứng dụng trong mọi lĩnh vực. **Thứ hai – Năng lượng sạch**: cam kết **net-zero vào 2050** tại COP26, phát triển **điện gió, điện mặt trời**, giảm phụ thuộc nhiên liệu hóa thạch. **Thứ ba – Giáo dục và Nhân tài**: cải cách giáo dục theo hướng **STEM**, sáng tạo, khởi nghiệp; thu hút người Việt ở nước ngoài về đóng góp. Xây dựng **đường sắt tốc độ cao** Bắc-Nam – kết nối đất nước trong vài giờ thay vì vài ngày.",
      textEn: "The strategy toward 2045 revolves around **three key pillars**. **First – Digital Transformation**: target digital economy at **30% of GDP** by 2030, building e-government, smart cities, AI applications across all sectors. **Second – Clean Energy**: committing to **net-zero by 2050** at COP26, developing **wind and solar power**, reducing fossil fuel dependence. **Third – Education and Talent**: reforming education toward **STEM**, creativity, entrepreneurship; attracting overseas Vietnamese to contribute. Building a **high-speed railway** from North to South – connecting the country in hours instead of days.",
    },
    {
      title: "🌍 Ngoại giao đa phương và vị thế mới",
      titleEn: "🌍 Multilateral Diplomacy and New Status",
      text: "Trên trường quốc tế, Việt Nam tiếp tục chiến lược **'đa phương hóa, đa dạng hóa'** – không nghiêng về bất cứ **cường quốc** nào, kiên quyết bảo vệ **chủ quyền** ở Biển Đông bằng luật pháp quốc tế, đồng thời duy trì quan hệ **hòa bình** với tất cả các bên. Mô hình phát triển của Việt Nam – kết hợp **kinh tế thị trường** với ổn định chính trị, hội nhập sâu rộng với **bản sắc dân tộc** – đang được nhiều quốc gia đang phát triển **nghiên cứu và học hỏi**.",
      textEn: "On the international stage, Vietnam continues its strategy of **'multilateralization and diversification'** – not leaning toward any **major power**, firmly defending **sovereignty** in the South China Sea through international law while maintaining **peaceful** relations with all parties. Vietnam's development model – combining a **market economy** with political stability, deep integration with **national identity** – is being **studied and emulated** by many developing nations.",
    },
    {
      title: "🌟 Di sản – Câu chuyện vĩ đại nhất thế kỷ 21",
      titleEn: "🌟 Legacy – The Greatest Story of the 21st Century",
      text: "Hành trình **từ chiến tranh đến thịnh vượng** của Việt Nam – nếu hoàn thành mục tiêu 2045 – sẽ là một trong những **câu chuyện vĩ đại nhất** của nhân loại. Từ vùng đất bị **tàn phá bởi bom đạn**, nơi hàng triệu người phải **xếp hàng mua gạo** bằng tem phiếu, Việt Nam đang vươn mình trở thành **ngôi sao mới** của châu Á. Câu chuyện ấy không chỉ thuộc về **lịch sử** – mà đang được viết tiếp **mỗi ngày**, bởi chính **100 triệu** người Việt Nam hôm nay. Và thế hệ trẻ – những người đang đọc bài học này – chính là những người sẽ **viết nên chương tiếp theo** của câu chuyện phi thường ấy.",
      textEn: "Vietnam's journey **from war to prosperity** – if the 2045 goal is achieved – will be one of **humanity's greatest stories**. From a land **devastated by bombs**, where millions had to **queue for rice** with ration coupons, Vietnam is rising as **Asia's new star**. This story doesn't just belong to **history** – it's being written **every day**, by the very **100 million** Vietnamese people of today. And the young generation – those reading this lesson – are the ones who will **write the next chapter** of this extraordinary story.",
    },
  ],
};
