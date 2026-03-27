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
  ],

  "hist-1-4": [
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
  ],

  "hist-1-10": [
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
  ],

  // ==================== MONTH 2: GOLDEN DYNASTIES ====================

  "hist-2-1": [
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
  ],

  "hist-2-2": [
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
  ],

  "hist-2-4": [
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
  ],

  "hist-2-5": [
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
  ],

  "hist-2-6": [
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
  ],

  "hist-2-7": [
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
  ],

  "hist-2-8": [
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
  ],

  "hist-2-9": [
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
  ],

  "hist-2-10": [
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
  ],

  // ==================== MONTH 3: MODERN HISTORY ====================

  "hist-3-1": [
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
  ],

  "hist-3-2": [
    {
      title: "🏯 Triều đại cuối cùng",
      titleEn: "🏯 The Last Dynasty",
      text: "**Năm 1802**, **Nguyễn Ánh** thống nhất đất nước, lên ngôi **Gia Long**, lập nhà Nguyễn – triều đại phong kiến cuối cùng, đóng đô ở **Phú Xuân** (Huế). Ông xây dựng **Kinh thành Huế** nguy nga (nay là Di sản UNESCO). Tuy nhiên, các vua sau thực hiện chính sách **'bế quan tỏa cảng'**, cấm đạo, từ chối hiện đại hóa.",
      textEn: "In **1802**, **Nguyen Anh** unified the country as Emperor **Gia Long**, founding the Nguyen Dynasty – the last feudal dynasty, capital at **Phu Xuan** (Hue). He built the magnificent **Hue Imperial Citadel** (now UNESCO Heritage). However, later kings pursued **isolationism**, banning Christianity and refusing modernization.",
    },
    {
      title: "🇫🇷 80 năm đô hộ",
      titleEn: "🇫🇷 80 Years of Colonial Rule",
      text: "**Năm 1858**, liên quân Pháp-Tây Ban Nha tấn công Đà Nẵng. Các triều vua yếu đuối lần lượt **ký hiệp ước nhượng đất** cho đến khi VN trở thành thuộc địa hoàn toàn (*1884*). Pháp chia VN thành **3 kỳ**: Bắc Kỳ, Trung Kỳ, Nam Kỳ. Gần 80 năm đô hộ là thời kỳ đau thương nhưng cũng mang lại biến chuyển: **đường sắt, trường học, chữ Quốc ngữ** được phổ biến.",
      textEn: "In **1858**, French-Spanish forces attacked Da Nang. Weak kings signed away territory until Vietnam became a full colony (*1884*). France divided it into **3 regions**. Nearly 80 years of rule brought pain but also change: **railways, schools**, and the **romanized Vietnamese script** spread widely.",
    },
  ],

  "hist-3-3": [
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
  ],

  "hist-3-4": [
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
  ],

  "hist-3-5": [
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
  ],

  "hist-3-6": [
    {
      title: "👑 Vua 13 tuổi xuất bôn",
      titleEn: "👑 The 13-Year-Old King in Exile",
      text: "Sau khi Pháp hoàn tất chiếm đóng (*1884*), vua **Hàm Nghi** – khi đó mới **13 tuổi** – dưới sự phò tá của **Tôn Thất Thuyết**, bí mật rời Huế sau cuộc phản công thất bại. Từ vùng rừng núi Quảng Bình, vua ban **chiếu Cần Vương** kêu gọi toàn dân kháng chiến – tiếng gọi non sông vang vọng khắp nước.",
      textEn: "After France completed its conquest (*1884*), 13-year-old King **Ham Nghi**, under **Ton That Thuyet's** protection, secretly fled Hue after a failed counterattack. From the mountains of Quang Binh, he issued the **Can Vuong Edict** calling for national resistance – a clarion call echoing across the land.",
    },
    {
      title: "🏔️ 30 năm kháng chiến",
      titleEn: "🏔️ 30 Years of Resistance",
      text: "Phong trào bùng nổ khắp nơi: **Phan Đình Phùng** ở Hà Tĩnh suốt 10 năm; **Hoàng Hoa Thám** (Đề Thám) ở Yên Thế kéo dài gần **30 năm** (*1884-1913*). Vua Hàm Nghi bị bắt năm 1888 và bị đày sang **Algeria**. Phong trào tuy thất bại trước hỏa lực áp đảo, nhưng đã thắp lên ngọn lửa **bất khuất** không bao giờ tắt.",
      textEn: "The movement erupted everywhere: **Phan Dinh Phung** fought for 10 years; **Hoang Hoa Tham** led a nearly **30-year** uprising (*1884-1913*). King Ham Nghi was captured in 1888 and exiled to **Algeria**. Though the movement failed against overwhelming firepower, it lit an **inextinguishable flame** of resistance.",
    },
  ],

  "hist-3-7": [
    {
      title: "🇯🇵 Phong trào Đông Du",
      titleEn: "🇯🇵 The Eastward Movement",
      text: "**Phan Bội Châu** (*1867-1940*) – nhà cách mạng tiêu biểu nhất đầu thế kỷ 20. **Năm 1905**, ông sang **Nhật Bản** – đất nước châu Á duy nhất canh tân thành công – lập phong trào **Đông Du**, bí mật đưa khoảng **200 thanh niên** VN sang Nhật du học về kỹ thuật, quân sự. Ông viết **'Việt Nam vong quốc sử'** để thức tỉnh lòng yêu nước.",
      textEn: "**Phan Boi Chau** (*1867-1940*) – the most prominent revolutionary of early 20th century. In **1905**, he traveled to **Japan** and founded the **Dong Du** movement, secretly sending about **200 Vietnamese youth** to study technology and military there. He wrote **'History of Vietnam's Loss'** to awaken patriotism.",
    },
    {
      title: "💡 Gieo mầm cách mạng",
      titleEn: "💡 Planting Seeds of Revolution",
      text: "**Năm 1909**, Nhật hợp tác với Pháp trục xuất du học sinh. Phong trào tan rã, Phan Bội Châu bị Pháp bắt và quản thúc tại Huế. Nhưng tư tưởng **duy tân** đã **gieo mầm** cho các phong trào sau – chứng minh rằng muốn cứu nước, phải **học hỏi thế giới** và hiện đại hóa.",
      textEn: "In **1909**, Japan cooperated with France and expelled the students. The movement dissolved, and Phan Boi Chau was arrested. But the **modernization ideals** had **planted seeds** for later movements – proving that saving a nation requires **learning from the world** and modernizing.",
    },
  ],

  "hist-3-8": [
    {
      title: "✊ Tổng diễn tập",
      titleEn: "✊ The General Rehearsal",
      text: "**Năm 1930**, Đảng Cộng sản VN vừa thành lập, cách mạng bùng nổ mạnh nhất tại **Nghệ An và Hà Tĩnh**. Công nhân đình công, nông dân biểu tình. Ở nhiều huyện, chính quyền thực dân sụp đổ, nhân dân tự lập **chính quyền Xô Viết**: chia ruộng, xóa nợ, mở trường – lần đầu tiên ở Đông Dương có chính quyền cách mạng do **nông dân tự quản lý**.",
      textEn: "In **1930**, the Communist Party had just been founded, and revolution erupted in **Nghe An and Ha Tinh**. Workers struck, peasants demonstrated. In many districts, colonial authority collapsed and people established **Soviet-style councils**: redistributing land, canceling debts, opening schools – the first **self-governing revolutionary government** in Indochina.",
    },
    {
      title: "🔥 Bài học cho tương lai",
      titleEn: "🔥 Lessons for the Future",
      text: "Pháp đàn áp **dã man** nhưng phong trào đã chứng minh sức mạnh quần chúng. Hàng nghìn người bị bắt, nhiều lãnh đạo hy sinh. Nhưng như một hạt giống gieo xuống đất, phong trào Xô Viết Nghệ Tĩnh trở thành **'tổng diễn tập'** cho Cách mạng Tháng Tám 1945 – chứng minh rằng khi nhân dân đoàn kết, không sức mạnh nào ngăn cản được.",
      textEn: "France suppressed it **brutally**, but the movement proved the people's power. Thousands were arrested, many leaders sacrificed. But like a seed planted in soil, the Nghe Tinh Soviets became the **'general rehearsal'** for the 1945 August Revolution – proving that when the people unite, nothing can stop them.",
    },
  ],

  "hist-3-9": [
    {
      title: "⚡ Tổng khởi nghĩa",
      titleEn: "⚡ The General Uprising",
      text: "**Tháng 8/1945**, Nhật đầu hàng Đồng Minh sau bom nguyên tử. Thời cơ ngàn năm có một đã đến! Ngày **19/8**, hàng chục vạn nhân dân Hà Nội chiếm các cơ quan chính quyền – **không đổ máu**. Các tỉnh nhanh chóng theo sau: **Huế** (23/8), **Sài Gòn** (25/8).",
      textEn: "In **August 1945**, Japan surrendered after the atomic bombs. The once-in-a-millennium moment had arrived! On **August 19**, hundreds of thousands seized power in Hanoi – **without bloodshed**. Provinces followed swiftly: **Hue** (23/8), **Saigon** (25/8).",
    },
    {
      title: "👑 Vua cuối cùng thoái vị",
      titleEn: "👑 The Last Emperor Abdicates",
      text: "Ngày **25/8**, vua **Bảo Đại** – hoàng đế cuối cùng của Việt Nam – tuyên bố thoái vị với câu nói bất hủ: *'Thà làm dân một nước tự do còn hơn làm vua một nước nô lệ!'* Chế độ phong kiến tồn tại **hàng ngàn năm** chấm dứt. Cách mạng Tháng Tám thành công là kết quả **15 năm** chuẩn bị và đấu tranh kiên cường.",
      textEn: "On **August 25**, Emperor **Bao Dai** – Vietnam's last emperor – abdicated with immortal words: *'I would rather be a citizen of a free nation than the king of an enslaved one!'* The feudal system spanning **thousands of years** ended. The August Revolution's success was the fruit of **15 years** of preparation and struggle.",
    },
  ],

  "hist-3-10": [
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
  ],

  // ==================== MONTH 4: CONTEMPORARY VIETNAM ====================

  "hist-4-1": [
    {
      title: "📉 Khủng hoảng",
      titleEn: "📉 Crisis",
      text: "Sau 1975, VN thống nhất nhưng kinh tế **kiệt quệ**: lệnh cấm vận của Mỹ, chiến tranh biên giới. Mô hình kinh tế kế hoạch gây thiếu lương thực trầm trọng – người dân **xếp hàng mua gạo bằng tem phiếu**, lạm phát lên đến **700%/năm**. Đất nước đứng bên bờ vực.",
      textEn: "After 1975, Vietnam was unified but economically **devastated**: US embargo, border wars. The planned economy caused severe food shortages – people **queued for rice with ration coupons**, inflation reached **700%/year**. The nation teetered on the edge.",
      imageUrl: doiMoi,
    },
    {
      title: "🌱 Đổi Mới – Bước ngoặt lịch sử",
      titleEn: "🌱 Doi Moi – A Historic Turning Point",
      text: "**Đại hội Đảng VI** (12/1986) đưa ra quyết định lịch sử: **Đổi Mới** – chuyển sang **kinh tế thị trường**. Nông dân được giao quyền sử dụng đất, doanh nghiệp tư nhân được phép hoạt động, cửa mở cho đầu tư nước ngoài. Kết quả **ngoạn mục**: từ nước thiếu lương thực, VN thành nước xuất khẩu gạo **lớn thứ 2-3 thế giới**. Đổi Mới là bước ngoặt vĩ đại nhất trong lịch sử VN hiện đại.",
      textEn: "The **6th Party Congress** (December 1986) made a historic decision: **Doi Moi** – transitioning to a **market economy**. Farmers received land rights, private enterprise was permitted, foreign investment welcomed. The results were **spectacular**: from food deficit to the world's **2nd-3rd largest rice exporter**. Doi Moi is modern Vietnam's greatest turning point.",
    },
  ],

  "hist-4-2": [
    {
      title: "🤝 Bình thường hóa và ASEAN",
      titleEn: "🤝 Normalization and ASEAN",
      text: "**Năm 1995** là bước ngoặt: VN gia nhập **ASEAN** và **bình thường hóa quan hệ với Mỹ** – chấm dứt hai thập kỷ thù địch. Tổng thống **Bill Clinton** thăm VN năm 2000 – hình ảnh cựu thù trở thành bạn bè khiến cả thế giới cảm phục.",
      textEn: "**1995** was a watershed: Vietnam joined **ASEAN** and **normalized US relations** – ending two decades of hostility. President **Bill Clinton** visited in 2000 – former enemies becoming friends inspired the world.",
    },
    {
      title: "🌐 Hội nhập toàn cầu",
      titleEn: "🌐 Global Integration",
      text: "**Năm 2007**, sau **11 năm** đàm phán, VN gia nhập **WTO** – thành viên thứ 150. Xuất khẩu tăng vọt, hàng triệu việc làm mới. VN tiếp tục ký **CPTPP, EVFTA, RCEP**. Hiện có quan hệ thương mại với hơn **200 quốc gia**, là **đối tác chiến lược** của nhiều cường quốc – một vị thế ngoại giao cân bằng hiếm có trên thế giới.",
      textEn: "In **2007**, after **11 years** of negotiation, Vietnam joined the **WTO** as its 150th member. Exports soared, millions of new jobs created. Vietnam signed **CPTPP, EVFTA, RCEP**, now trading with over **200 countries** – a remarkably **balanced diplomatic position** on the world stage.",
    },
  ],

  "hist-4-3": [
    {
      title: "💻 Kết nối Internet",
      titleEn: "💻 Connecting to the Internet",
      text: "**19/11/1997**, VN chính thức kết nối **Internet**. Từ vài trăm người dùng, nay hơn **77 triệu người** (78% dân số). **FPT** trở thành tập đoàn công nghệ lớn nhất, xuất khẩu phần mềm ra 30+ quốc gia. **VNG** phát triển Zalo (75 triệu người dùng). **Viettel** đầu tư viễn thông ở 10 nước.",
      textEn: "On **November 19, 1997**, Vietnam connected to the **Internet**. From a few hundred users, now over **77 million** (78% of population). **FPT** became the largest tech corporation. **VNG** developed Zalo (75 million users). **Viettel** invested in telecoms across 10 countries.",
    },
    {
      title: "📱 Quốc gia số hóa",
      titleEn: "📱 A Digital Nation",
      text: "Thanh toán không tiền mặt bùng nổ: **MoMo, ZaloPay, VNPay**. Thương mại điện tử phát triển mạnh. VN thu hút **Samsung** (đầu tư hơn 20 tỷ USD), **Intel, LG** – đang trở thành **trung tâm công nghệ khu vực**. Từ quốc gia nông nghiệp, VN đang chuyển mình thành nền kinh tế số hóa nhanh nhất Đông Nam Á.",
      textEn: "Cashless payment exploded: **MoMo, ZaloPay, VNPay**. E-commerce boomed. Vietnam attracted **Samsung** ($20B+ investment), **Intel, LG** – becoming a **regional tech hub**. From an agricultural nation, Vietnam is transforming into Southeast Asia's fastest-digitalizing economy.",
    },
  ],

  "hist-4-4": [
    {
      title: "🏛️ Vị thế quốc tế",
      titleEn: "🏛️ International Standing",
      text: "Từ quốc gia bị cô lập, VN vươn lên thành **thành viên tích cực** trên trường quốc tế. Hai lần được bầu **Ủy viên không thường trực HĐBA LHQ** (*2008, 2020*) với phiếu gần tuyệt đối. **Chủ tịch ASEAN** hai lần (*2010, 2020*), tổ chức **APEC 2017** tại Đà Nẵng.",
      textEn: "From isolation, Vietnam rose to become an **active international member**. Twice elected to the **UN Security Council** (*2008, 2020*) with near-unanimous votes. **ASEAN Chair** twice (*2010, 2020*), hosted **APEC 2017** in Da Nang.",
    },
    {
      title: "🌍 Ngoại giao cân bằng",
      titleEn: "🌍 Balanced Diplomacy",
      text: "VN tổ chức **Hội nghị Thượng đỉnh Mỹ-Triều** lần 2 (*2019*) tại Hà Nội – chứng tỏ vị thế trung gian đáng tin cậy. Tham gia **gìn giữ hòa bình LHQ** từ 2014. Hiện là **đối tác chiến lược toàn diện** của Mỹ, Trung Quốc, Nhật, Hàn, Ấn Độ – vị thế ngoại giao cân bằng **hiếm có** trên thế giới.",
      textEn: "Vietnam hosted the **2nd US-DPRK Summit** (*2019*) in Hanoi – proving its reliable mediator status. Joined **UN peacekeeping** since 2014. Now a **comprehensive strategic partner** of the US, China, Japan, South Korea, India – a **remarkably balanced** diplomatic position globally.",
    },
  ],

  "hist-4-5": [
    {
      title: "🌊 Cơ hội và thách thức",
      titleEn: "🌊 Opportunities and Challenges",
      text: "Bước vào thập niên 2020, VN đứng trước cả cơ hội lẫn thách thức lớn. **Biến đổi khí hậu**: đồng bằng sông Cửu Long đang chìm dần do nước biển dâng. **Bẫy thu nhập trung bình** đe dọa. Nhưng VN có lợi thế: dân số trẻ (trung bình **32 tuổi**), tỷ lệ biết chữ trên **97%**, vị trí **địa chiến lược** thuận lợi.",
      textEn: "Entering the 2020s, Vietnam faces both opportunities and challenges. **Climate change**: the Mekong Delta is sinking from rising seas. The **middle-income trap** looms. But Vietnam has advantages: young population (average age **32**), **97%+** literacy, favorable **geostrategic** position.",
    },
    {
      title: "🚀 Tầm nhìn 2045",
      titleEn: "🚀 Vision 2045",
      text: "Mục tiêu **2045** – đúng **100 năm** Quốc khánh – trở thành **nước phát triển, thu nhập cao**. Trọng tâm: chuyển đổi số, năng lượng sạch (**net-zero 2050**), nâng cao giáo dục. Câu chuyện Việt Nam – từ chiến tranh đến phát triển – là một trong những **câu chuyện truyền cảm hứng nhất** thế kỷ 21.",
      textEn: "The **2045** goal – exactly **100 years** of National Day – is to become a **developed, high-income nation**. Focus: digital transformation, clean energy (**net-zero by 2050**), education. Vietnam's story – from war to prosperity – is one of the **most inspiring narratives** of the 21st century.",
    },
  ],

  "hist-4-6": [
    {
      title: "📈 Phép màu kinh tế",
      titleEn: "📈 The Economic Miracle",
      text: "Đổi Mới tạo **phép màu**: GDP tăng **6-7%/năm** suốt hàng thập kỷ. GDP đầu người từ **~100 USD** (*1986*) lên **~4.200 USD** (*2023*). Tỷ lệ nghèo giảm từ **58%** (*1993*) xuống dưới **5%** – Ngân hàng Thế giới gọi là **'câu chuyện phát triển thần kỳ'**.",
      textEn: "Doi Moi created a **miracle**: GDP grew **6-7%/year** for decades. Per capita GDP rose from **~$100** (*1986*) to **~$4,200** (*2023*). Poverty dropped from **58%** (*1993*) to under **5%** – the World Bank called it a **'development miracle.'**",
    },
    {
      title: "🏭 Cơ sở sản xuất toàn cầu",
      titleEn: "🏭 A Global Manufacturing Base",
      text: "**Samsung** đầu tư hơn **20 tỷ USD**, biến VN thành cơ sở sản xuất smartphone **lớn nhất thế giới**. Intel, LG, Toyota, Honda cũng có nhà máy. VN xuất khẩu **lớn thứ 2-3 thế giới** về cà phê, hồ tiêu, hạt điều, thủy sản. Thách thức còn lại: nâng cao **năng suất lao động** và thoát khỏi gia công lắp ráp.",
      textEn: "**Samsung** invested over **$20 billion**, making Vietnam the world's **largest smartphone manufacturing base**. Vietnam is among the **top 2-3 exporters** globally for coffee, pepper, cashews, and seafood. Remaining challenge: improving **labor productivity** and moving beyond assembly.",
    },
  ],

  "hist-4-7": [
    {
      title: "🦠 Hình mẫu toàn cầu",
      titleEn: "🦠 A Global Model",
      text: "Đầu **2020**, VN – sát biên giới Trung Quốc, hệ thống y tế hạn chế – được cho sẽ bị ảnh hưởng nặng. Nhưng ngược lại: **đóng biên sớm**, truy vết chặt, cách ly tập trung miễn phí, ứng dụng **Bluezone**. Năm 2020, với 97 triệu dân, chỉ **~1.500 ca** và 35 tử vong. **BBC, CNN, Bloomberg** ca ngợi *'mô hình Việt Nam'*.",
      textEn: "In early **2020**, Vietnam was expected to suffer badly. Instead: **early border closure**, rigorous tracing, free quarantine, **Bluezone** app. In 2020, with 97 million people, only **~1,500 cases** and 35 deaths. **BBC, CNN, Bloomberg** praised the *'Vietnam model.'*",
    },
    {
      title: "🔄 Thích ứng và vượt qua",
      titleEn: "🔄 Adapting and Overcoming",
      text: "Tuy nhiên, làn sóng **Delta** (giữa 2021) gây thiệt hại nặng tại TP.HCM, buộc chuyển sang **'sống chung với COVID'** và đẩy mạnh **tiêm vaccine**. VN đạt tỷ lệ tiêm chủng cao nhất khu vực, kinh tế phục hồi nhanh. Bài học: **linh hoạt, thích ứng** là chìa khóa sống còn.",
      textEn: "However, the **Delta wave** (mid-2021) hit Ho Chi Minh City hard, forcing a shift to **'living with COVID'** and accelerating **vaccination**. Vietnam achieved the region's highest vaccination rate and rapid economic recovery. The lesson: **flexibility and adaptation** are keys to survival.",
    },
  ],

  "hist-4-8": [
    {
      title: "📊 Gây chấn động PISA",
      titleEn: "📊 Stunning the World at PISA",
      text: "**Năm 2012**, VN lần đầu tham gia **PISA** – kỳ thi đánh giá học sinh quốc tế của OECD. Kết quả gây **chấn động**: học sinh 15 tuổi xếp thứ **17 về Toán** (trên Mỹ, Anh, Pháp!), thứ **8 về Khoa học**. Với GDP chỉ bằng **1/20 Mỹ**, thành tích này khiến giới giáo dục thế giới **kinh ngạc**.",
      textEn: "In **2012**, Vietnam first joined **PISA** – the OECD international assessment. Results were **stunning**: 15-year-olds ranked **17th in Math** (above the US, UK, France!), **8th in Science**. With GDP just **1/20th** of the US, this **astonished** the global education community.",
    },
    {
      title: "📚 Bí quyết và thách thức",
      titleEn: "📚 Secrets and Challenges",
      text: "Ngân hàng Thế giới gọi đây là **'hiện tượng giáo dục'**. Bí quyết: truyền thống **hiếu học** từ thời Văn Miếu, kỳ vọng cao của gia đình, giáo viên tận tụy, chương trình **Toán-Khoa học chặt chẽ**. Tuy nhiên hệ thống cũng bị phê bình vì quá thiên về **thi cử**, ít sáng tạo – một thách thức cần cải cách.",
      textEn: "The World Bank called it an **'education phenomenon.'** Secrets: deep **scholarly tradition** from the Temple of Literature era, high family expectations, dedicated teachers, rigorous **Math-Science curricula**. However, the system is criticized for being too **exam-focused** with little creativity – a challenge requiring reform.",
    },
  ],

  "hist-4-9": [
    {
      title: "🍜 Ẩm thực chinh phục thế giới",
      titleEn: "🍜 Cuisine Conquering the World",
      text: "Trong thế kỷ 21, văn hóa VN ngày càng được thế giới yêu mến. **Phở** có mặt ở hầu hết thành phố lớn từ New York đến Tokyo. **Năm 2011**, bánh mì vào **từ điển Oxford**; **2020**, Google tôn vinh bằng **Google Doodle**. **Cà phê VN** (đặc biệt cà phê sữa đá, cà phê trứng) trở thành **hiện tượng toàn cầu**.",
      textEn: "In the 21st century, Vietnamese culture has gained worldwide love. **Pho** can be found in virtually every major city. **Banh mi** entered the **Oxford Dictionary** (2011); Google honored it with a **Doodle** (2020). **Vietnamese coffee** (especially iced milk coffee and egg coffee) became a **global phenomenon**.",
    },
    {
      title: "🌏 Văn hóa Việt toàn cầu",
      titleEn: "🌏 Vietnamese Culture Goes Global",
      text: "**Áo dài** xuất hiện tại sự kiện thời trang quốc tế. Điện ảnh VN ghi dấu ấn tại **liên hoan phim quốc tế**. Giới trẻ VN tạo xu hướng riêng trên **TikTok, YouTube** – giới thiệu ẩm thực, du lịch, văn hóa Việt đến hàng triệu người xem quốc tế. Từ một quốc gia ít được biết đến, VN đang trở thành **điểm đến mơ ước** của du khách toàn cầu.",
      textEn: "**Ao dai** appears at international fashion events. Vietnamese cinema marks its presence at **international film festivals**. Vietnamese youth create trends on **TikTok, YouTube** – introducing cuisine, travel, and culture to millions of international viewers. From a little-known country, Vietnam is becoming a **dream destination** for global travelers.",
    },
  ],

  "hist-4-10": [
    {
      title: "🎯 Chiến lược 2045",
      titleEn: "🎯 Strategy for 2045",
      text: "**Năm 2045** đánh dấu **100 năm** Quốc khánh (2/9/1945). VN đặt mục tiêu đầy tham vọng: nước **phát triển, thu nhập cao**. Chiến lược: chuyển đổi số (kinh tế số **30% GDP** vào 2030), năng lượng sạch (**net-zero 2050** cam kết tại COP26), cải cách giáo dục (**STEM**), xây dựng **đường sắt tốc độ cao** Bắc-Nam.",
      textEn: "**2045** marks **100 years** of National Day (Sep 2, 1945). Vietnam aims ambitiously: a **developed, high-income nation**. Strategies: digital transformation (digital economy **30% of GDP** by 2030), clean energy (**net-zero 2050** pledged at COP26), education reform (**STEM**), **high-speed railway** from North to South.",
    },
    {
      title: "🌟 Câu chuyện truyền cảm hứng",
      titleEn: "🌟 An Inspiring Story",
      text: "Ngoại giao: **'đa phương hóa, đa dạng hóa'**, làm bạn với tất cả các nước. Hành trình từ **chiến tranh đến thịnh vượng** – nếu thành công – sẽ là một trong những **câu chuyện vĩ đại nhất** của nhân loại. Từ vùng đất bị tàn phá bởi bom đạn, VN đang vươn mình trở thành **ngôi sao mới** của châu Á.",
      textEn: "Diplomacy: **'multilateralization and diversification'**, befriending all nations. The journey from **war to prosperity** – if successful – will be one of **humanity's greatest stories**. From a land devastated by bombs, Vietnam is rising as **Asia's new star**.",
    },
  ],
};
