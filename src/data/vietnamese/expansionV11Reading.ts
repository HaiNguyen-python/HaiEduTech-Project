/**
 * @file expansionV11Reading.ts
 * @description Giai đoạn 2 (phần 3) - 12 bài đọc hiểu mới cho vn-adv-reading và vn-reading-adv.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { readingModules } from "./readingLessons";
import { vietnameseLessonsExpansionModules } from "./lessonsExpansion";
import type { VietnameseLesson, VietnameseQuizQuestion, VietnameseVocabEntry } from "./types";

const v = (
  word: string,
  meaning: string,
  meaningEn: string,
  example: string,
  exampleEn: string,
  partOfSpeech?: string,
): VietnameseVocabEntry => ({ word, meaning, meaningEn, example, exampleEn, partOfSpeech });

const q = (
  question: string,
  questionEn: string,
  options: string[],
  answer: number,
  explanation: string,
  explanationEn: string,
): VietnameseQuizQuestion => ({ question, questionEn, options, answer, explanation, explanationEn });

const groupA: VietnameseLesson[] = [
  {
    id: "vn-v11-read-caphe",
    title: "Đọc hiểu: Cà phê Việt Nam ra thế giới",
    titleEn: "Reading: Vietnamese Coffee Goes Global",
    level: "intermediate",
    theory: `## Bài đọc

Việt Nam là một trong những nước xuất khẩu cà phê lớn nhất thế giới, chủ yếu là giống Robusta trồng ở Tây Nguyên. Từ những năm 1990, diện tích cà phê ở Đắk Lắk, Gia Lai và Lâm Đồng mở rộng rất nhanh, giúp hàng trăm nghìn hộ dân có thu nhập ổn định.

Tuy nhiên, phần lớn cà phê xuất khẩu vẫn ở dạng hạt thô. Giá hạt thô phụ thuộc vào thị trường thế giới và biến động mạnh, nên người trồng dễ chịu rủi ro khi giá giảm. Nhiều doanh nghiệp vì thế chuyển sang chế biến sâu: rang xay, cà phê hòa tan và cà phê đặc sản có truy xuất nguồn gốc.

Song song đó, văn hóa uống cà phê trong nước cũng thay đổi. Bên cạnh cà phê phin truyền thống và cà phê sữa đá, người trẻ ở thành phố tìm đến cà phê pha thủ công và các quán nhỏ chú trọng nguồn hạt. Một số nông hộ đã tự xây thương hiệu, bán trực tiếp cho khách thay vì chỉ bán cho thương lái.

Hướng đi bền vững đòi hỏi ba điều: giữ chất lượng hạt, minh bạch nguồn gốc và trồng xen cây che bóng để giảm tác động của biến đổi khí hậu.

### Gợi ý đọc
Chú ý các cụm chỉ nguyên nhân và kết quả: "vì thế", "nên", "song song đó".`,
    theoryEn: `## Reading passage

Vietnam is among the world's largest coffee exporters, mainly Robusta grown in the Central Highlands. Since the 1990s, plantations in Dak Lak, Gia Lai and Lam Dong expanded quickly, giving hundreds of thousands of households stable income.

Most exports, however, remain raw beans whose price swings with the world market, exposing farmers to risk. Many companies have therefore moved into deeper processing: roasting, instant coffee and traceable speciality coffee.

Domestic coffee culture is also shifting. Alongside traditional phin coffee and iced milk coffee, urban young people seek hand-brewed coffee from small shops that care about sourcing. Some farming households now build their own brands and sell directly instead of only to traders.

A sustainable path needs three things: consistent bean quality, transparent origin, and shade trees to soften the impact of climate change.`,
    vocabulary: [
      v("xuất khẩu", "bán hàng ra nước ngoài", "to export", "Việt Nam xuất khẩu nhiều cà phê.", "Vietnam exports a lot of coffee.", "động từ"),
      v("hạt thô", "hạt chưa qua chế biến sâu", "raw bean", "Hạt thô có giá thấp hơn.", "Raw beans fetch lower prices.", "danh từ"),
      v("chế biến sâu", "làm thành sản phẩm giá trị cao", "deep processing", "Chế biến sâu giúp tăng lợi nhuận.", "Deep processing raises profit.", "danh từ"),
      v("truy xuất nguồn gốc", "biết rõ hàng từ đâu", "traceability", "Khách hàng cần truy xuất nguồn gốc.", "Customers want traceability.", "danh từ"),
      v("thương lái", "người mua đi bán lại", "trader, middleman", "Nông hộ bán cho thương lái.", "Farmers sell to traders.", "danh từ"),
      v("biến động", "thay đổi lên xuống", "to fluctuate", "Giá cà phê biến động mạnh.", "Coffee prices fluctuate sharply.", "động từ"),
      v("cây che bóng", "cây trồng xen để tạo bóng mát", "shade tree", "Cây che bóng giữ độ ẩm cho đất.", "Shade trees keep soil moisture.", "danh từ"),
      v("thương hiệu", "tên và uy tín của sản phẩm", "brand", "Nông hộ tự xây thương hiệu.", "Households build their own brands.", "danh từ"),
      v("minh bạch", "rõ ràng, công khai", "transparent", "Chuỗi cung ứng cần minh bạch.", "The supply chain must be transparent.", "tính từ"),
      v("cà phê đặc sản", "cà phê chất lượng cao có nguồn gốc rõ", "speciality coffee", "Cà phê đặc sản bán giá cao hơn.", "Speciality coffee sells at a premium.", "danh từ"),
    ],
    quiz: [
      q("Giống cà phê chính của Việt Nam là gì?", "What is Vietnam's main coffee variety?", ["Robusta", "Arabica", "Liberica", "Excelsa"], 0, "Bài đọc nêu rõ Việt Nam trồng chủ yếu giống Robusta ở Tây Nguyên.", "The passage states Robusta dominates in the Central Highlands."),
      q("Vì sao người trồng dễ chịu rủi ro?", "Why are growers exposed to risk?", ["Vì giá hạt thô phụ thuộc thị trường thế giới và biến động mạnh", "Vì không có đất trồng", "Vì thiếu lao động", "Vì không ai mua cà phê"], 0, "Bài nói giá hạt thô phụ thuộc thị trường thế giới và biến động mạnh.", "The text says raw bean prices follow the volatile world market."),
      q("Doanh nghiệp chuyển hướng bằng cách nào?", "How are companies shifting?", ["Chuyển sang chế biến sâu", "Ngừng xuất khẩu", "Chỉ bán cho thương lái", "Giảm diện tích trồng"], 0, "Bài nêu doanh nghiệp chuyển sang rang xay, hòa tan và cà phê đặc sản.", "They moved into roasting, instant and speciality coffee."),
      q("Ba điều cần cho hướng bền vững là gì?", "What three things does sustainability need?", ["Chất lượng hạt, minh bạch nguồn gốc, cây che bóng", "Giá cao, nhiều đất, nhiều nước", "Xuất khẩu, thương lái, hòa tan", "Quán nhỏ, phin, sữa đá"], 0, "Đoạn cuối liệt kê đúng ba yếu tố này.", "The final paragraph lists exactly these three."),
      q("Thay đổi nào diễn ra trong nước?", "What change is happening domestically?", ["Người trẻ tìm đến cà phê pha thủ công chú trọng nguồn hạt", "Người Việt ngừng uống cà phê", "Cà phê phin bị cấm", "Chỉ còn cà phê hòa tan"], 0, "Bài nêu người trẻ thành phố tìm đến cà phê pha thủ công.", "The passage notes urban youth turning to hand-brewed coffee."),
    ],
  },
  {
    id: "vn-v11-read-metro",
    title: "Đọc hiểu: Tàu điện đô thị và đời sống thành phố",
    titleEn: "Reading: Urban Metro and City Life",
    level: "intermediate",
    theory: `## Bài đọc

Khi tuyến tàu điện đầu tiên ở Hà Nội và Thành phố Hồ Chí Minh đi vào hoạt động, nhiều người lo rằng người dân đã quen đi xe máy sẽ không đổi thói quen. Thực tế cho thấy lượng khách tăng dần, đặc biệt vào giờ cao điểm và những ngày mưa, khi việc đi xe máy trở nên vất vả.

Tàu điện có ba lợi ích rõ. Thứ nhất, thời gian di chuyển ổn định vì không phụ thuộc tắc đường. Thứ hai, chi phí mỗi chuyến thấp hơn xe công nghệ. Thứ ba, nhà ga trở thành điểm hẹn mới, kéo theo hàng quán và dịch vụ quanh đó.

Tuy vậy, tàu điện chỉ phát huy hiệu quả khi kết nối tốt với xe buýt và lối đi bộ. Nếu từ nhà tới ga phải đi hai cây số dưới nắng, người dân sẽ quay lại xe máy. Vì thế các thành phố đang mở thêm tuyến buýt gom khách, làm mái che và vạch kẻ đường quanh nhà ga.

Bài học lớn nhất là hạ tầng chỉ thay đổi thói quen khi trải nghiệm cả chặng đường, từ cửa nhà tới cửa cơ quan, thực sự dễ dàng hơn.

### Gợi ý đọc
Tìm ba lợi ích được đánh dấu bằng "thứ nhất", "thứ hai", "thứ ba".`,
    theoryEn: `## Reading passage

When the first metro lines opened in Hanoi and Ho Chi Minh City, many feared motorbike-accustomed residents would not change habits. In practice ridership rose steadily, especially in rush hour and on rainy days.

The metro offers three clear benefits: predictable travel time free of jams, a lower fare than ride-hailing, and stations that become new meeting points attracting shops and services.

Yet the metro only works when it connects well with buses and walkable paths. If reaching the station means two kilometres under the sun, people return to motorbikes. Cities are therefore adding feeder bus routes, canopies and crossings around stations.

The key lesson: infrastructure changes habits only when the whole door-to-door journey genuinely becomes easier.`,
    vocabulary: [
      v("tàu điện", "phương tiện chạy trên đường ray điện", "metro, urban rail", "Tàu điện chạy đúng giờ.", "The metro runs on time.", "danh từ"),
      v("nhà ga", "nơi tàu đón trả khách", "station", "Nhà ga mới rất rộng.", "The new station is spacious.", "danh từ"),
      v("giờ cao điểm", "giờ đông người đi lại", "rush hour", "Tàu đông vào giờ cao điểm.", "Trains are crowded in rush hour.", "danh từ"),
      v("hạ tầng", "công trình nền tảng như đường, cầu", "infrastructure", "Hạ tầng quyết định thói quen đi lại.", "Infrastructure shapes travel habits.", "danh từ"),
      v("kết nối", "nối các phần với nhau", "to connect", "Tàu cần kết nối với xe buýt.", "The metro must connect with buses.", "động từ"),
      v("tuyến buýt gom khách", "tuyến chở khách tới nhà ga", "feeder bus route", "Thành phố mở tuyến buýt gom khách.", "The city opened feeder bus routes.", "danh từ"),
      v("trải nghiệm", "cảm nhận khi sử dụng", "experience", "Trải nghiệm cả chặng đường rất quan trọng.", "The whole-journey experience matters.", "danh từ"),
      v("ổn định", "không thay đổi bất thường", "stable, predictable", "Thời gian đi tàu rất ổn định.", "Metro travel time is predictable.", "tính từ"),
      v("mái che", "phần che nắng mưa", "canopy", "Mái che giúp khách đi bộ dễ hơn.", "Canopies make walking easier.", "danh từ"),
      v("thói quen", "cách làm lặp lại thường ngày", "habit", "Đổi thói quen đi lại cần thời gian.", "Changing travel habits takes time.", "danh từ"),
    ],
    quiz: [
      q("Vì sao lượng khách tàu điện tăng vào ngày mưa?", "Why does metro ridership rise on rainy days?", ["Vì đi xe máy trở nên vất vả", "Vì vé rẻ hơn ngày thường", "Vì tàu chạy nhanh hơn", "Vì xe buýt nghỉ"], 0, "Bài nêu ngày mưa việc đi xe máy vất vả nên nhiều người chọn tàu.", "The text says motorbiking becomes hard in the rain."),
      q("Lợi ích thứ nhất của tàu điện là gì?", "What is the first benefit listed?", ["Thời gian di chuyển ổn định", "Nhà ga có hàng quán", "Chi phí thấp", "Có mái che"], 0, "Lợi ích thứ nhất là thời gian ổn định vì không phụ thuộc tắc đường.", "The first benefit is predictable travel time."),
      q("Điều gì khiến người dân quay lại xe máy?", "What makes residents return to motorbikes?", ["Đường từ nhà tới ga quá xa và thiếu che chắn", "Tàu quá nhanh", "Vé quá rẻ", "Nhà ga quá rộng"], 0, "Bài nêu ví dụ phải đi hai cây số dưới nắng để tới ga.", "The example is walking two kilometres in the sun to the station."),
      q("Các thành phố đang làm gì quanh nhà ga?", "What are cities doing around stations?", ["Mở tuyến buýt gom khách, làm mái che và vạch kẻ đường", "Cấm xe buýt", "Xây thêm bãi xe máy trong ga", "Giảm số chuyến tàu"], 0, "Đoạn ba liệt kê đúng ba việc này.", "The third paragraph lists exactly these measures."),
      q("Bài học lớn nhất của bài đọc là gì?", "What is the passage's main lesson?", ["Hạ tầng đổi thói quen khi cả chặng đường dễ hơn", "Người Việt không thích tàu điện", "Xe máy luôn tiện hơn", "Nhà ga nên xây xa trung tâm"], 0, "Đoạn cuối nêu trải nghiệm cả chặng từ cửa nhà tới cơ quan phải dễ hơn.", "The closing paragraph stresses the whole door-to-door journey."),
    ],
  },
  {
    id: "vn-v11-read-craft",
    title: "Đọc hiểu: Làng nghề truyền thống thời hiện đại",
    titleEn: "Reading: Traditional Craft Villages Today",
    level: "advanced",
    theory: `## Bài đọc

Việt Nam có hàng nghìn làng nghề, từ gốm Bát Tràng, lụa Vạn Phúc đến nước mắm Phú Quốc. Mỗi làng nghề là một hệ thống tri thức được truyền qua nhiều đời: cách chọn nguyên liệu, cách pha men, cách kiểm tra độ chín của lò.

Thách thức lớn nhất hiện nay không phải là thiếu người mua mà là thiếu người kế nghiệp. Lớp trẻ thường chọn công việc ở thành phố vì thu nhập rõ ràng hơn. Khi một nghệ nhân qua đời mà chưa truyền hết bí quyết, một phần tri thức mất theo, không thể phục dựng chỉ bằng máy móc.

Một số làng đã tìm được cách thích nghi. Họ giữ phần tinh xảo do người làm thủ công, đưa máy vào các bước nặng và lặp lại, mở xưởng cho khách tham quan trải nghiệm, bán hàng qua mạng và hợp tác với nhà thiết kế để sản phẩm phù hợp nhà ở hiện đại.

Bảo tồn làng nghề vì thế không phải là giữ mọi thứ y nguyên, mà là giữ được tri thức cốt lõi trong khi cho phép hình thức sản phẩm thay đổi.

### Gợi ý đọc
Phân biệt ý kiến của tác giả với thông tin thực tế trong bài.`,
    theoryEn: `## Reading passage

Vietnam has thousands of craft villages, from Bat Trang pottery and Van Phuc silk to Phu Quoc fish sauce. Each village holds a body of knowledge passed down for generations: selecting materials, mixing glaze, judging when a kiln is ready.

The biggest challenge today is not a lack of buyers but a lack of successors. Young people often choose city jobs with clearer income. When an artisan dies before passing on every secret, part of that knowledge disappears and machines cannot restore it.

Some villages have adapted: humans keep the delicate steps, machines take the heavy repetitive ones, workshops open to visitors, goods sell online, and designers help products suit modern homes.

Preserving a craft village therefore does not mean freezing everything, but keeping the core knowledge while letting product forms change.`,
    vocabulary: [
      v("làng nghề", "làng chuyên một nghề thủ công", "craft village", "Bát Tràng là làng nghề gốm nổi tiếng.", "Bat Trang is a famous pottery village.", "danh từ"),
      v("nghệ nhân", "người làm nghề rất giỏi", "artisan, master craftsman", "Nghệ nhân truyền nghề cho học trò.", "The artisan trains apprentices.", "danh từ"),
      v("kế nghiệp", "nối tiếp nghề của người trước", "to take over the trade", "Thiếu người kế nghiệp là vấn đề lớn.", "Lacking successors is a big issue.", "động từ"),
      v("bí quyết", "kinh nghiệm riêng ít người biết", "secret know-how", "Bí quyết pha men không có trong sách.", "The glaze know-how is not in books.", "danh từ"),
      v("tinh xảo", "làm rất tỉ mỉ, đẹp", "exquisite, finely made", "Chi tiết tinh xảo do tay người làm.", "The exquisite details are handmade.", "tính từ"),
      v("thích nghi", "thay đổi để phù hợp hoàn cảnh", "to adapt", "Làng nghề phải thích nghi với thị trường.", "Craft villages must adapt to the market.", "động từ"),
      v("bảo tồn", "giữ gìn không để mất", "to preserve", "Bảo tồn cần cả tri thức và thị trường.", "Preservation needs knowledge and a market.", "động từ"),
      v("tri thức", "hiểu biết được tích lũy", "knowledge", "Tri thức làng nghề truyền qua nhiều đời.", "Village knowledge passes down generations.", "danh từ"),
      v("phục dựng", "làm lại như cũ", "to restore, reconstruct", "Có tri thức mất đi không thể phục dựng.", "Some lost knowledge cannot be restored.", "động từ"),
      v("cốt lõi", "phần quan trọng nhất", "core", "Giữ phần cốt lõi, đổi phần hình thức.", "Keep the core, change the form.", "tính từ"),
    ],
    quiz: [
      q("Theo bài, thách thức lớn nhất của làng nghề là gì?", "What is the biggest challenge according to the passage?", ["Thiếu người kế nghiệp", "Thiếu người mua", "Thiếu nguyên liệu", "Thiếu máy móc"], 0, "Bài nói rõ thách thức không phải thiếu người mua mà là thiếu người kế nghiệp.", "The text says the issue is successors, not buyers."),
      q("Vì sao tri thức có thể mất hẳn?", "Why can knowledge be lost entirely?", ["Vì nghệ nhân qua đời trước khi truyền hết bí quyết", "Vì sách bị thất lạc", "Vì máy móc quá đắt", "Vì khách không mua"], 0, "Khi nghệ nhân qua đời mà chưa truyền hết, phần tri thức đó mất theo.", "When an artisan dies before passing it on, that knowledge goes too."),
      q("Cách thích nghi nào được nêu trong bài?", "Which adaptation does the passage mention?", ["Giữ phần tinh xảo thủ công, đưa máy vào bước nặng và lặp lại", "Chuyển toàn bộ sang máy", "Ngừng bán hàng qua mạng", "Đóng cửa xưởng với khách"], 0, "Bài nêu chia việc giữa tay người và máy theo tính chất công đoạn.", "The text describes splitting delicate and heavy steps."),
      q("Quan điểm của tác giả về bảo tồn là gì?", "What is the author's view on preservation?", ["Giữ tri thức cốt lõi nhưng cho phép hình thức sản phẩm thay đổi", "Giữ mọi thứ y nguyên", "Bỏ nghề cũ để làm nghề mới", "Chỉ cần bán hàng qua mạng"], 0, "Đoạn cuối nêu đúng quan điểm này của tác giả.", "The closing paragraph states exactly this view."),
      q("Ví dụ nào KHÔNG được nhắc trong bài?", "Which example is NOT mentioned?", ["Tranh Đông Hồ", "Gốm Bát Tràng", "Lụa Vạn Phúc", "Nước mắm Phú Quốc"], 0, "Bài chỉ nhắc gốm Bát Tràng, lụa Vạn Phúc và nước mắm Phú Quốc.", "Only Bat Trang, Van Phuc and Phu Quoc are named."),
    ],
  },
  {
    id: "vn-v11-read-flood",
    title: "Đọc hiểu: Sống chung với mùa nước nổi",
    titleEn: "Reading: Living with the Flood Season",
    level: "intermediate",
    theory: `## Bài đọc

Ở đồng bằng sông Cửu Long, mùa nước nổi kéo dài từ khoảng tháng Tám tới tháng Mười một. Nước từ thượng nguồn tràn về, ngập đồng, mang theo phù sa và nhiều loại cá.

Người dân không gọi đó là thiên tai. Họ gọi là mùa nước nổi, vì nước đem lại nguồn lợi: cá linh, bông điên điển, hẹ nước. Nhà cửa được làm sàn cao, xuồng thay xe, trẻ em học cách nhận biết dòng chảy từ nhỏ. Khi nước rút, ruộng nhận lớp phù sa mới nên vụ lúa sau đỡ tốn phân bón.

Những năm gần đây, nước về ít và thất thường hơn do các đập thủy điện ở thượng nguồn và tình trạng biến đổi khí hậu. Ít nước nghĩa là ít phù sa, ít cá, và nước biển dễ xâm nhập sâu hơn vào đất liền.

Vì thế, nhiều địa phương chuyển sang mô hình thích ứng: luân canh lúa và tôm, trồng cây chịu mặn, làm hồ trữ nước ngọt. Kinh nghiệm dân gian được kết hợp với dự báo khí tượng để quyết định thời điểm xuống giống.

### Gợi ý đọc
Chú ý cách bài trình bày quan hệ nguyên nhân kết quả nhiều bước.`,
    theoryEn: `## Reading passage

In the Mekong Delta, the flood season runs roughly from August to November. Upstream water spreads across the fields, carrying silt and many kinds of fish.

Locals do not call it a disaster. They call it the rising-water season because the water brings gifts: linh fish, sesbania flowers, water chives. Houses stand on raised floors, boats replace vehicles, and children learn to read currents early. When the water recedes, fresh silt reduces fertiliser needs for the next rice crop.

In recent years the flood has arrived smaller and more erratically because of upstream dams and climate change. Less water means less silt, fewer fish, and deeper saline intrusion.

Many localities now adapt: rotating rice with shrimp, planting salt-tolerant crops, and building freshwater reservoirs. Folk experience is combined with weather forecasts to decide sowing dates.`,
    vocabulary: [
      v("mùa nước nổi", "mùa nước dâng ngập đồng", "rising-water season", "Mùa nước nổi bắt đầu tháng Tám.", "The rising-water season starts in August.", "danh từ"),
      v("phù sa", "lớp đất mịn nước mang về", "silt, alluvium", "Phù sa làm đất thêm tốt.", "Silt enriches the soil.", "danh từ"),
      v("thượng nguồn", "phần đầu của dòng sông", "upstream", "Nước từ thượng nguồn tràn về.", "Water flows down from upstream.", "danh từ"),
      v("cá linh", "loài cá đặc trưng mùa nước nổi", "linh fish", "Cá linh nấu với bông điên điển.", "Linh fish is cooked with sesbania flowers.", "danh từ"),
      v("xuồng", "thuyền nhỏ", "small boat", "Mùa nước, xuồng thay xe.", "In flood season boats replace vehicles.", "danh từ"),
      v("luân canh", "trồng nuôi xen theo mùa", "crop rotation", "Nông dân luân canh lúa và tôm.", "Farmers rotate rice and shrimp.", "động từ"),
      v("chịu mặn", "sống được trong nước mặn", "salt-tolerant", "Cây chịu mặn giúp giảm thiệt hại.", "Salt-tolerant crops reduce losses.", "tính từ"),
      v("trữ nước", "giữ nước để dùng sau", "to store water", "Hồ trữ nước ngọt cho mùa khô.", "Reservoirs store fresh water for the dry season.", "động từ"),
      v("thất thường", "không theo quy luật", "erratic", "Nước về thất thường hơn trước.", "The flood arrives more erratically now.", "tính từ"),
      v("xuống giống", "bắt đầu gieo trồng", "to sow a crop", "Nông dân chờ dự báo rồi xuống giống.", "Farmers wait for forecasts before sowing.", "động từ"),
    ],
    quiz: [
      q("Vì sao người dân không gọi mùa nước nổi là thiên tai?", "Why do locals not call the flood a disaster?", ["Vì nước mang lại phù sa và nguồn cá", "Vì nước không ngập nhà", "Vì mùa nước rất ngắn", "Vì có đập chắn nước"], 0, "Bài nêu nước đem lại nguồn lợi như cá linh, bông điên điển, phù sa.", "The text lists gifts such as linh fish, sesbania flowers and silt."),
      q("Nước về ít gây hậu quả nào?", "What follows from less floodwater?", ["Ít phù sa, ít cá và nước biển xâm nhập sâu hơn", "Lúa tốt hơn", "Nhiều cá hơn", "Đất bớt mặn"], 0, "Đoạn ba nêu đúng ba hậu quả này.", "The third paragraph lists exactly these consequences."),
      q("Mô hình thích ứng nào được nhắc tới?", "Which adaptation is mentioned?", ["Luân canh lúa và tôm", "Chỉ trồng lúa ba vụ", "Bỏ hẳn nông nghiệp", "Ngừng dùng dự báo"], 0, "Bài nêu luân canh lúa tôm, cây chịu mặn và hồ trữ nước.", "It lists rice-shrimp rotation, salt-tolerant crops and reservoirs."),
      q("Điều gì giúp quyết định thời điểm xuống giống?", "What guides the sowing date?", ["Kinh nghiệm dân gian kết hợp dự báo khí tượng", "Chỉ kinh nghiệm dân gian", "Chỉ lịch âm", "Giá lúa trên thị trường"], 0, "Đoạn cuối nêu sự kết hợp của hai nguồn thông tin này.", "The closing paragraph combines both sources."),
      q("Mùa nước nổi thường kéo dài khi nào?", "When does the flood season usually run?", ["Khoảng tháng Tám tới tháng Mười một", "Tháng Một tới tháng Ba", "Tháng Tư tới tháng Sáu", "Suốt cả năm"], 0, "Câu đầu bài nêu mốc thời gian này.", "The opening sentence gives this time frame."),
    ],
  },
  {
    id: "vn-v11-read-remote",
    title: "Đọc hiểu: Làm việc từ xa ở Việt Nam",
    titleEn: "Reading: Remote Work in Vietnam",
    level: "advanced",
    theory: `## Bài đọc

Sau giai đoạn giãn cách, làm việc từ xa không còn là chuyện lạ ở Việt Nam. Nhiều công ty công nghệ giữ mô hình kết hợp: vài ngày ở công ty, vài ngày ở nhà. Nhân viên tiết kiệm thời gian đi lại, còn doanh nghiệp giảm diện tích thuê mặt bằng.

Nhưng mô hình này đặt ra ba vấn đề. Thứ nhất, ranh giới giữa giờ làm và giờ nghỉ mờ đi, dễ dẫn tới kiệt sức. Thứ hai, người mới vào nghề học được ít hơn vì thiếu những lần quan sát đồng nghiệp xử lý việc thật. Thứ ba, việc đánh giá kết quả phải chuyển từ đếm giờ sang đo sản phẩm, điều mà không phải người quản lý nào cũng quen.

Các công ty làm tốt thường có quy ước rõ ràng: khung giờ cùng trực tuyến, biên bản họp viết lại cho người không dự, và cam kết không nhắn việc sau giờ làm trừ khi khẩn cấp.

Làm việc từ xa vì thế là bài toán quản trị và văn hóa, không chỉ là bài toán đường truyền và thiết bị.

### Gợi ý đọc
Xác định luận điểm chính của tác giả ở câu cuối.`,
    theoryEn: `## Reading passage

After the lockdown period, remote work is no longer unusual in Vietnam. Many tech companies keep a hybrid model: some days in the office, some at home. Staff save commuting time while firms rent less space.

The model raises three issues. First, the line between work and rest blurs, inviting burnout. Second, juniors learn less because they no longer watch colleagues handle real problems. Third, evaluation must move from counting hours to measuring output, which not every manager is used to.

Companies that do it well set clear conventions: shared online hours, written minutes for absentees, and a promise not to message about work after hours unless urgent.

Remote work is therefore a management and culture problem, not merely a bandwidth and device problem.`,
    vocabulary: [
      v("làm việc từ xa", "làm việc không ở công ty", "remote work", "Công ty cho làm việc từ xa hai ngày.", "The company allows two remote days.", "danh từ"),
      v("mô hình kết hợp", "vừa ở công ty vừa ở nhà", "hybrid model", "Mô hình kết hợp đang phổ biến.", "The hybrid model is now common.", "danh từ"),
      v("ranh giới", "đường phân chia", "boundary", "Ranh giới giờ làm và giờ nghỉ mờ đi.", "The work-rest boundary blurs.", "danh từ"),
      v("kiệt sức", "cạn hết năng lượng", "burnout", "Thiếu ranh giới dễ gây kiệt sức.", "No boundary invites burnout.", "danh từ"),
      v("quy ước", "điều thống nhất để cùng làm theo", "convention, agreed rule", "Nhóm có quy ước giờ trực tuyến.", "The team agreed on online hours.", "danh từ"),
      v("biên bản họp", "văn bản ghi lại nội dung họp", "meeting minutes", "Biên bản họp gửi cho người vắng.", "Minutes go to absentees.", "danh từ"),
      v("đánh giá", "xem xét để kết luận về kết quả", "to evaluate", "Đánh giá theo sản phẩm thay vì giờ.", "Evaluate output rather than hours.", "động từ"),
      v("quản trị", "việc điều hành tổ chức", "management, governance", "Đây là bài toán quản trị.", "This is a management problem.", "danh từ"),
      v("mặt bằng", "diện tích thuê để làm việc", "office space", "Công ty giảm diện tích mặt bằng.", "The firm reduced office space.", "danh từ"),
      v("khẩn cấp", "rất gấp, cần xử lý ngay", "urgent", "Chỉ nhắn sau giờ khi khẩn cấp.", "Message after hours only when urgent.", "tính từ"),
    ],
    quiz: [
      q("Luận điểm chính của tác giả là gì?", "What is the author's main claim?", ["Làm việc từ xa là bài toán quản trị và văn hóa", "Làm việc từ xa chỉ cần đường truyền tốt", "Làm việc từ xa nên bị bỏ", "Làm việc từ xa chỉ phù hợp người mới"], 0, "Câu cuối bài nêu rõ đây là bài toán quản trị và văn hóa.", "The final sentence states this explicitly."),
      q("Vì sao người mới vào nghề học được ít hơn?", "Why do juniors learn less?", ["Thiếu dịp quan sát đồng nghiệp xử lý việc thật", "Vì không có máy tính", "Vì không được trả lương", "Vì ít họp trực tuyến"], 0, "Bài nêu họ mất những lần quan sát đồng nghiệp làm việc thật.", "They lose chances to observe colleagues at work."),
      q("Cách đánh giá cần chuyển thành gì?", "What must evaluation shift to?", ["Đo sản phẩm thay vì đếm giờ", "Đếm số buổi họp", "Đếm số tin nhắn", "Đo thời gian trực tuyến"], 0, "Bài nói phải chuyển từ đếm giờ sang đo sản phẩm.", "The text calls for measuring output, not hours."),
      q("Quy ước nào giúp bảo vệ thời gian nghỉ?", "Which convention protects rest time?", ["Không nhắn việc sau giờ làm trừ khi khẩn cấp", "Họp thêm buổi tối", "Trực tuyến cả ngày", "Bỏ biên bản họp"], 0, "Đây là một trong ba quy ước được nêu.", "It is one of the three conventions listed."),
      q("Doanh nghiệp được lợi gì từ mô hình kết hợp?", "How do firms benefit from hybrid work?", ["Giảm diện tích thuê mặt bằng", "Tăng số giờ họp", "Tăng chi phí đi lại", "Giảm chất lượng sản phẩm"], 0, "Đoạn đầu nêu doanh nghiệp giảm diện tích thuê mặt bằng.", "The first paragraph notes reduced office space."),
    ],
  },
  {
    id: "vn-v11-read-museum",
    title: "Đọc hiểu: Bảo tàng và cách kể chuyện lịch sử",
    titleEn: "Reading: Museums and Telling History",
    level: "advanced",
    theory: `## Bài đọc

Một bảo tàng không chỉ là nơi trưng bày đồ cổ. Cách sắp xếp hiện vật, dòng chú thích và thứ tự phòng đều là một cách kể chuyện. Cùng một chiếc nồi đất, nếu đặt trong phòng nói về nông nghiệp thì người xem nghĩ tới mùa vụ; nếu đặt cạnh đồ dùng gia đình thì lại gợi tới bữa cơm và người mẹ.

Các bảo tàng ở Việt Nam đang thay đổi theo hướng cho khách tham gia nhiều hơn. Ngoài tủ kính, có khu cho khách chạm vào bản sao hiện vật, có màn hình nghe lời kể của người trong cuộc, có bàn cho trẻ thử in tranh dân gian.

Điều khó nhất là cân bằng giữa hấp dẫn và chính xác. Nếu chỉ chạy theo trải nghiệm, nội dung dễ thành hời hợt. Nếu chỉ trình bày dày đặc chữ, phần lớn khách sẽ đi qua rất nhanh mà không đọc.

Một chú thích tốt thường có ba lớp: một câu ngắn để ai cũng hiểu, vài dòng cho người tò mò, và mã liên kết tới tư liệu cho người muốn nghiên cứu sâu.

### Gợi ý đọc
Tìm ví dụ mà tác giả dùng để chứng minh cùng một hiện vật kể được nhiều câu chuyện.`,
    theoryEn: `## Reading passage

A museum is more than a display of old objects. The arrangement, the captions and the order of rooms all tell a story. The same clay pot placed in an agriculture room evokes harvests; placed beside household utensils it evokes family meals and mothers.

Vietnamese museums are moving towards participation. Beyond glass cases there are replicas visitors may touch, screens carrying first-hand testimony, and tables where children try folk woodblock printing.

The hardest part is balancing appeal with accuracy. Chase experience alone and content turns shallow; present dense text alone and most visitors walk past unread.

A good caption has three layers: one short sentence anyone can grasp, a few lines for the curious, and a link to source material for researchers.`,
    vocabulary: [
      v("bảo tàng", "nơi trưng bày và gìn giữ hiện vật", "museum", "Bảo tàng mở thêm khu trải nghiệm.", "The museum added an interactive area.", "danh từ"),
      v("hiện vật", "đồ vật thật được trưng bày", "artefact", "Hiện vật này có từ thế kỷ 15.", "This artefact dates to the 15th century.", "danh từ"),
      v("trưng bày", "đặt ra cho người xem", "to display", "Phòng này trưng bày đồ gốm.", "This room displays ceramics.", "động từ"),
      v("chú thích", "dòng ghi giải thích", "caption", "Chú thích nên ngắn và rõ.", "Captions should be short and clear.", "danh từ"),
      v("bản sao", "vật làm giống vật gốc", "replica", "Khách được chạm vào bản sao.", "Visitors may touch the replica.", "danh từ"),
      v("người trong cuộc", "người trực tiếp trải qua sự việc", "first-hand witness", "Màn hình phát lời kể của người trong cuộc.", "Screens play first-hand testimony.", "danh từ"),
      v("hời hợt", "chỉ bề ngoài, thiếu sâu sắc", "shallow, superficial", "Nội dung hời hợt làm mất giá trị bảo tàng.", "Shallow content devalues a museum.", "tính từ"),
      v("tư liệu", "tài liệu gốc để nghiên cứu", "source material", "Mã liên kết dẫn tới tư liệu.", "The code links to source material.", "danh từ"),
      v("tranh dân gian", "tranh truyền thống của dân gian", "folk painting", "Trẻ em thử in tranh dân gian.", "Children try printing folk paintings.", "danh từ"),
      v("cân bằng", "giữ mức hợp lý giữa hai bên", "to balance", "Cần cân bằng hấp dẫn và chính xác.", "Appeal and accuracy must be balanced.", "động từ"),
    ],
    quiz: [
      q("Ví dụ chiếc nồi đất chứng minh điều gì?", "What does the clay pot example prove?", ["Cùng một hiện vật có thể kể nhiều câu chuyện tùy cách đặt", "Nồi đất là hiện vật quý nhất", "Bảo tàng nên bỏ tủ kính", "Chú thích không quan trọng"], 0, "Bài dùng ví dụ này để cho thấy bối cảnh trưng bày quyết định câu chuyện.", "The example shows context decides the story."),
      q("Thay đổi nào đang diễn ra ở bảo tàng Việt Nam?", "What change is happening in Vietnamese museums?", ["Cho khách tham gia và trải nghiệm nhiều hơn", "Giảm số hiện vật", "Bỏ toàn bộ chú thích", "Chỉ trưng bày bản sao"], 0, "Bài nêu khu chạm bản sao, màn hình lời kể, bàn in tranh.", "It lists touchable replicas, testimony screens and printing tables."),
      q("Rủi ro khi chỉ chạy theo trải nghiệm là gì?", "What is the risk of chasing experience alone?", ["Nội dung trở nên hời hợt", "Khách không vào bảo tàng", "Hiện vật bị mất", "Chú thích quá dài"], 0, "Bài nói nếu chỉ chạy theo trải nghiệm, nội dung dễ thành hời hợt.", "The text warns content turns shallow."),
      q("Chú thích tốt gồm mấy lớp?", "How many layers does a good caption have?", ["Ba lớp", "Một lớp", "Hai lớp", "Bốn lớp"], 0, "Đoạn cuối nêu ba lớp: câu ngắn, vài dòng, mã liên kết tư liệu.", "The closing paragraph lists three layers."),
      q("Lớp thứ ba của chú thích dành cho ai?", "Who is the third caption layer for?", ["Người muốn nghiên cứu sâu", "Trẻ nhỏ", "Khách đi nhanh", "Nhân viên bảo tàng"], 0, "Mã liên kết tới tư liệu dành cho người nghiên cứu sâu.", "The source link serves deep researchers."),
    ],
  },
];

const groupB: VietnameseLesson[] = [
  {
    id: "vn-v11-read-market",
    title: "Đọc hiểu: Một buổi sáng ở chợ quê",
    titleEn: "Reading: A Morning at a Country Market",
    level: "beginner",
    theory: `## Bài đọc

Chợ quê mở từ khi trời còn mờ sáng. Bốn giờ, những chiếc xe đạp chở rau đã tới. Năm giờ, hàng cá bày ra trên tấm nilon ướt, cá còn quẫy trong thau nước.

Bà Tư bán rau ở góc chợ đã ba mươi năm. Bà biết ai thích rau muống non, ai cần lá chuối gói bánh. Khách không cần hỏi giá, bà tự nói: "Rau hôm nay tươi, chị lấy hai bó nhé."

Ở chợ quê, người ta mua bằng lời chào. Người bán cho thêm nhánh hành, người mua hỏi thăm chuyện nhà. Có người quên tiền, bán hàng vẫn gói: "Mai trả cũng được."

Bảy giờ, chợ bắt đầu vãn. Bà Tư dọn hàng, để lại mấy bó rau cuối cho bà cụ bán chè. Chợ nhỏ, chỉ vài chục hàng, nhưng đủ cho cả xã một ngày.

### Gợi ý đọc
Chú ý các mốc thời gian để hiểu trình tự sự việc.`,
    theoryEn: `## Reading passage

The country market opens while the sky is still dim. At four, bicycles loaded with vegetables arrive. At five, fish stalls spread onto wet plastic sheets, the fish still flapping in basins.

Mrs Tu has sold vegetables in the corner for thirty years. She knows who likes tender water spinach and who needs banana leaves for wrapping cakes. Customers need not ask prices; she offers them herself.

At a country market people buy with greetings. Sellers add a free spring onion, buyers ask after the family. If someone forgets their money, the seller still wraps the goods: pay tomorrow is fine.

By seven the market thins. Mrs Tu packs up, leaving the last bunches for the old sweet-soup seller. The market is small, a few dozen stalls, yet enough for the whole commune for a day.`,
    vocabulary: [
      v("chợ quê", "chợ nhỏ ở vùng nông thôn", "country market", "Chợ quê mở rất sớm.", "The country market opens very early.", "danh từ"),
      v("mờ sáng", "lúc trời chưa sáng rõ", "dim early morning", "Bốn giờ, trời còn mờ sáng.", "At four the sky is still dim.", "danh từ"),
      v("quẫy", "động mạnh trong nước", "to flap, thrash", "Cá còn quẫy trong thau.", "The fish still flaps in the basin.", "động từ"),
      v("rau muống", "loại rau phổ biến ở Việt Nam", "water spinach", "Bà thích rau muống non.", "She likes tender water spinach.", "danh từ"),
      v("lá chuối", "lá cây chuối dùng để gói", "banana leaf", "Lá chuối dùng gói bánh.", "Banana leaves wrap cakes.", "danh từ"),
      v("bó", "nhóm rau buộc lại", "bunch", "Chị lấy hai bó rau nhé.", "Take two bunches, please.", "danh từ"),
      v("vãn", "bớt đông, gần tan", "to thin out", "Bảy giờ chợ đã vãn.", "By seven the market has thinned.", "động từ"),
      v("hỏi thăm", "hỏi về sức khỏe, chuyện nhà", "to ask after someone", "Khách hỏi thăm chuyện nhà.", "Customers ask after the family.", "động từ"),
      v("dọn hàng", "thu xếp hàng để về", "to pack up a stall", "Bà Tư dọn hàng lúc bảy giờ.", "Mrs Tu packs up at seven.", "động từ"),
      v("cả xã", "toàn bộ đơn vị xã", "the whole commune", "Chợ đủ cho cả xã một ngày.", "The market serves the whole commune for a day.", "danh từ"),
    ],
    quiz: [
      q("Hàng cá bày ra lúc mấy giờ?", "When do the fish stalls open?", ["Năm giờ", "Bốn giờ", "Sáu giờ", "Bảy giờ"], 0, "Bài nêu năm giờ hàng cá bày ra trên tấm nilon.", "The text says fish stalls spread out at five."),
      q("Bà Tư bán gì?", "What does Mrs Tu sell?", ["Rau", "Cá", "Chè", "Bánh"], 0, "Bà Tư bán rau ở góc chợ.", "Mrs Tu sells vegetables in the corner."),
      q("Chi tiết nào cho thấy tình cảm ở chợ quê?", "Which detail shows warmth at the market?", ["Người bán cho thêm nhánh hành và cho trả tiền sau", "Người bán nói giá rất cao", "Khách trả tiền rồi đi ngay", "Chợ chỉ bán buổi chiều"], 0, "Bài nêu người bán cho thêm hành và đồng ý cho trả sau.", "Sellers add free spring onion and allow paying later."),
      q("Bảy giờ, chợ thế nào?", "What happens at seven?", ["Chợ bắt đầu vãn", "Chợ mới mở", "Chợ đông nhất", "Chợ đóng hẳn"], 0, "Bài nói bảy giờ chợ bắt đầu vãn.", "The text says the market thins at seven."),
      q("Bà Tư để lại mấy bó rau cuối cho ai?", "Whom does Mrs Tu leave the last bunches for?", ["Bà cụ bán chè", "Người bán cá", "Trẻ em trong xã", "Chủ chợ"], 0, "Bài nêu bà để lại cho bà cụ bán chè.", "She leaves them for the old sweet-soup seller."),
    ],
  },
  {
    id: "vn-v11-read-student-letter",
    title: "Đọc hiểu: Thư của một du học sinh",
    titleEn: "Reading: Letter from a Student Abroad",
    level: "intermediate",
    theory: `## Bài đọc

Kính gửi thầy,

Em viết thư này khi bên này đã vào đông. Tuyết rơi từ tháng Mười một, sáng ra cửa sổ mờ hết. Em nhớ nhất cái nắng buổi chiều ở sân trường mình.

Sáu tháng đầu khó hơn em nghĩ. Không phải vì bài học, mà vì cách học. Ở đây thầy cô không đọc cho ghi, họ hỏi "em nghĩ thế nào" ngay từ buổi đầu. Em từng ngồi im vì sợ nói sai. Sau em hiểu, nói chưa đúng còn hơn không nói gì, vì có nói thì mới được sửa.

Em cũng học được cách quản lý thời gian. Mỗi tuần em ghi lại ba việc quan trọng nhất, việc nào chưa xong thì chuyển sang tuần sau chứ không tự trách mình.

Em xin cảm ơn thầy vì câu thầy nói hồi lớp 12: đi xa không phải để trở thành người khác, mà để hiểu mình rõ hơn. Bây giờ em mới thấy đúng.

Em kính chúc thầy nhiều sức khỏe.

Học sinh của thầy,
Linh

### Gợi ý đọc
Chú ý bố cục thư: lời chào, nội dung, lời cảm ơn, lời chúc, ký tên.`,
    theoryEn: `## Reading passage

Dear teacher,

I write as winter has arrived here. Snow has fallen since November and the window fogs over each morning. What I miss most is the afternoon sun in our schoolyard.

The first six months were harder than expected, not because of the lessons but because of how learning works. Teachers here do not dictate notes; they ask what you think from day one. I once sat silent for fear of being wrong. Later I understood that speaking imperfectly beats silence, because only then can you be corrected.

I also learned time management. Each week I write the three most important tasks, and anything unfinished simply moves to the next week without self-blame.

Thank you for what you said in grade 12: going far is not to become someone else, but to understand yourself better. Only now do I see it is true.

Wishing you good health,
Your student, Linh`,
    vocabulary: [
      v("du học sinh", "học sinh đi học ở nước ngoài", "student studying abroad", "Em là du học sinh năm thứ hai.", "I am a second-year student abroad.", "danh từ"),
      v("vào đông", "bắt đầu mùa đông", "winter has begun", "Bên này đã vào đông.", "Winter has begun here.", "cụm động từ"),
      v("cách học", "phương pháp học tập", "way of learning", "Cách học ở đây rất khác.", "The way of learning here differs greatly.", "danh từ"),
      v("đọc cho ghi", "thầy đọc, học sinh chép", "to dictate notes", "Thầy cô ở đây không đọc cho ghi.", "Teachers here do not dictate notes.", "cụm động từ"),
      v("sợ nói sai", "lo bị sai khi phát biểu", "fear of speaking wrongly", "Em từng ngồi im vì sợ nói sai.", "I once sat silent for fear of speaking wrongly.", "cụm từ"),
      v("quản lý thời gian", "sắp xếp thời gian hợp lý", "time management", "Em học cách quản lý thời gian.", "I learned time management.", "danh từ"),
      v("tự trách", "tự giận chính mình", "to blame oneself", "Việc chưa xong thì không tự trách.", "Unfinished tasks are no cause for self-blame.", "động từ"),
      v("kính chúc", "chúc một cách trang trọng", "to respectfully wish", "Em kính chúc thầy sức khỏe.", "I respectfully wish you good health.", "động từ"),
      v("nhớ nhất", "nhớ nhiều hơn tất cả", "miss the most", "Em nhớ nhất nắng chiều sân trường.", "I miss the schoolyard sun most.", "cụm động từ"),
      v("hiểu mình", "biết rõ bản thân", "to understand oneself", "Đi xa để hiểu mình rõ hơn.", "Going far helps you understand yourself.", "cụm động từ"),
    ],
    quiz: [
      q("Điều gì khiến Linh thấy khó nhất?", "What did Linh find hardest?", ["Cách học khác với ở nhà", "Bài học quá nặng", "Thời tiết quá nóng", "Không có bạn"], 0, "Linh viết khó không phải vì bài học mà vì cách học.", "Linh says it was the way of learning, not the lessons."),
      q("Linh rút ra điều gì về việc phát biểu?", "What did Linh conclude about speaking up?", ["Nói chưa đúng còn hơn không nói gì", "Nên im lặng cho an toàn", "Chỉ nói khi chắc chắn đúng", "Không cần phát biểu"], 0, "Linh hiểu có nói thì mới được sửa.", "Linh realised speaking allows correction."),
      q("Cách quản lý thời gian của Linh là gì?", "What is Linh's time-management method?", ["Ghi ba việc quan trọng nhất mỗi tuần", "Ghi hết mọi việc mỗi ngày", "Học liên tục không nghỉ", "Chỉ học vào cuối tuần"], 0, "Linh ghi ba việc quan trọng nhất mỗi tuần.", "Linh writes the three most important weekly tasks."),
      q("Câu nói của thầy mang ý nghĩa gì?", "What does the teacher's saying mean?", ["Đi xa để hiểu mình rõ hơn", "Đi xa để thành người khác", "Đi xa để kiếm tiền", "Đi xa để quên quê nhà"], 0, "Thư dẫn lại câu của thầy đúng theo nghĩa này.", "The letter quotes exactly this meaning."),
      q("Thư này thuộc loại văn bản nào?", "What text type is this?", ["Thư cá nhân trang trọng", "Hợp đồng", "Báo cáo khoa học", "Đơn xin việc"], 0, "Đây là thư cá nhân viết cho thầy, có lời chào và lời chúc trang trọng.", "It is a personal yet respectful letter to a teacher."),
    ],
  },
  {
    id: "vn-v11-read-grandma-radio",
    title: "Đọc hiểu: Chiếc radio của ngoại",
    titleEn: "Reading: Grandmother's Radio",
    level: "intermediate",
    theory: `## Bài đọc

Ngoại tôi có một chiếc radio cũ, vỏ nhựa đã ngả vàng. Mỗi sáng, ngoại bật radio lúc năm giờ để nghe tin thời tiết, rồi để đó suốt ngày như một người bạn nói chuyện trong nhà.

Tôi từng tặng ngoại một chiếc điện thoại có loa to. Ngoại cảm ơn, nhưng chiếc radio vẫn nằm trên bàn. Ngoại nói: "Cái này có tiếng rè, nghe là biết trời sắp mưa."

Sau này tôi hiểu, ngoại không giữ chiếc radio vì âm thanh. Ngoại giữ vì nó gắn với những buổi ông ngồi sửa dây, với giọng phát thanh viên thời ngoại còn trẻ, với thói quen của một đời người.

Đồ vật cũ trong nhà không chỉ là đồ vật. Chúng là những cái mốc để người già neo lại ký ức của mình. Khi ta quá nhanh thay cái mới, có khi ta lấy đi của họ một phần thời gian đã sống.

### Gợi ý đọc
Xác định câu nào là chi tiết, câu nào là suy ngẫm của người kể.`,
    theoryEn: `## Reading passage

My grandmother has an old radio with a yellowed plastic shell. Each morning she switches it on at five for the weather, then leaves it talking all day like a companion.

I once gave her a phone with loud speakers. She thanked me, yet the radio stayed on the table. She said the crackle tells her when rain is coming.

Later I understood she did not keep the radio for its sound. She kept it because it held the evenings grandfather spent fixing its wire, the announcer's voice from her youth, the habit of a lifetime.

Old objects at home are not merely objects. They are markers where older people anchor their memories. Replacing them too quickly may take away part of the time they have lived.`,
    vocabulary: [
      v("ngả vàng", "chuyển sang màu vàng do cũ", "yellowed with age", "Vỏ nhựa đã ngả vàng.", "The plastic shell has yellowed.", "động từ"),
      v("tiếng rè", "âm thanh nhiễu, không trong", "crackle, static", "Tiếng rè báo trời sắp mưa.", "The crackle warns of rain.", "danh từ"),
      v("phát thanh viên", "người nói trên radio", "radio announcer", "Giọng phát thanh viên rất quen.", "The announcer's voice is familiar.", "danh từ"),
      v("ký ức", "điều còn nhớ về quá khứ", "memory", "Đồ cũ neo lại ký ức.", "Old objects anchor memories.", "danh từ"),
      v("neo lại", "giữ cho khỏi trôi đi", "to anchor", "Những cái mốc neo lại ký ức.", "Markers anchor memories.", "động từ"),
      v("thói quen của một đời người", "việc làm suốt cuộc đời", "a lifetime habit", "Đó là thói quen của một đời người.", "It is a lifetime habit.", "cụm từ"),
      v("suy ngẫm", "nghĩ sâu về điều gì", "reflection", "Đoạn cuối là lời suy ngẫm.", "The final paragraph is a reflection.", "danh từ"),
      v("gắn với", "liên quan chặt chẽ với", "to be tied to", "Chiếc radio gắn với nhiều kỷ niệm.", "The radio is tied to many memories.", "động từ"),
      v("đồ vật", "vật dùng trong nhà", "object, item", "Đồ vật cũ mang nhiều ý nghĩa.", "Old objects carry meaning.", "danh từ"),
      v("thay cái mới", "đổi sang vật mới hơn", "to replace with something new", "Đừng vội thay cái mới.", "Do not rush to replace things.", "cụm động từ"),
    ],
    quiz: [
      q("Ngoại bật radio lúc mấy giờ?", "When does grandmother switch on the radio?", ["Năm giờ sáng", "Sáu giờ sáng", "Bảy giờ sáng", "Buổi tối"], 0, "Bài nêu ngoại bật radio lúc năm giờ để nghe tin thời tiết.", "The text says five in the morning for the weather."),
      q("Vì sao ngoại không dùng chiếc điện thoại mới?", "Why does grandmother not use the new phone?", ["Vì chiếc radio gắn với ký ức của ngoại", "Vì điện thoại quá nhỏ", "Vì không biết bật", "Vì không có điện"], 0, "Bài cho thấy ngoại giữ radio vì nó gắn với ký ức, không vì âm thanh.", "She keeps the radio for its memories, not its sound."),
      q("Câu nào là suy ngẫm của người kể?", "Which sentence is the narrator's reflection?", ["Đồ vật cũ là những cái mốc để người già neo lại ký ức.", "Ngoại bật radio lúc năm giờ.", "Vỏ nhựa đã ngả vàng.", "Tôi tặng ngoại một chiếc điện thoại."], 0, "Đây là nhận xét khái quát, không phải chi tiết sự việc.", "It is a general observation, not a factual detail."),
      q("'Tiếng rè' với ngoại có ý nghĩa gì?", "What does the crackle mean to grandmother?", ["Dấu hiệu trời sắp mưa", "Radio bị hỏng", "Cần thay pin", "Đài hết sóng"], 0, "Ngoại nói nghe tiếng rè là biết trời sắp mưa.", "She says the crackle tells her rain is coming."),
      q("Thông điệp chính của bài là gì?", "What is the main message?", ["Đồ cũ gắn với thời gian đã sống của người già", "Nên mua đồ mới thường xuyên", "Radio tốt hơn điện thoại", "Người già không thích công nghệ"], 0, "Đoạn cuối nêu thay cái mới quá nhanh có thể lấy đi phần thời gian đã sống của họ.", "The closing paragraph makes exactly this point."),
    ],
  },
  {
    id: "vn-v11-read-bus-kindness",
    title: "Đọc hiểu: Chuyến xe buýt số 8",
    titleEn: "Reading: Bus Number 8",
    level: "beginner",
    theory: `## Bài đọc

Chiều thứ Sáu, xe buýt số 8 chật kín người. Tôi đứng gần cửa, tay giữ thanh ngang.

Một bà cụ lên xe, tay cầm giỏ nhãn. Không còn ghế trống. Một bạn học sinh mặc áo trắng đứng lên: "Bà ngồi đây ạ." Bà cụ ngồi xuống, đặt giỏ nhãn dưới chân, rồi lấy ra một chùm nhãn đưa cho bạn ấy. Bạn học sinh lắc đầu cười: "Cháu cảm ơn, bà cứ để ăn ạ."

Đến gần chợ, một người mẹ bế con nhỏ lên xe. Lần này ba người cùng đứng lên một lúc. Cả xe cười.

Tôi xuống xe ở trạm cuối. Trời vẫn nóng, đường vẫn đông, nhưng tự nhiên tôi thấy nhẹ. Có những chuyến xe chở người, và có những chuyến xe chở cả thói quen tử tế của một thành phố.

### Gợi ý đọc
Đếm số nhân vật xuất hiện và việc làm của từng người.`,
    theoryEn: `## Reading passage

On Friday afternoon bus number 8 was packed. I stood near the door holding the bar.

An old woman boarded with a basket of longans. No seats were free. A student in a white shirt stood up and offered her his place. She sat down, set the basket at her feet, then held out a bunch of longans. The student shook his head with a smile and told her to keep them.

Near the market a mother carrying a small child boarded. This time three people rose at once. The whole bus laughed.

I got off at the last stop. The heat stayed, the traffic stayed, yet I felt lighter. Some buses carry people; some carry a city's habit of kindness.`,
    vocabulary: [
      v("chật kín", "rất đông, không còn chỗ", "packed full", "Xe buýt chật kín người.", "The bus was packed.", "tính từ"),
      v("thanh ngang", "thanh để tay giữ trên xe", "handrail", "Tôi giữ thanh ngang cho vững.", "I held the handrail for balance.", "danh từ"),
      v("nhãn", "một loại quả ngọt", "longan", "Bà cụ cầm giỏ nhãn.", "The old woman held a basket of longans.", "danh từ"),
      v("nhường ghế", "để người khác ngồi chỗ mình", "to give up a seat", "Bạn học sinh nhường ghế cho bà cụ.", "The student gave up his seat.", "động từ"),
      v("chùm", "nhiều quả dính liền nhau", "bunch", "Bà đưa một chùm nhãn.", "She offered a bunch of longans.", "danh từ"),
      v("bế", "giữ em nhỏ trên tay", "to carry a child", "Người mẹ bế con nhỏ lên xe.", "The mother boarded carrying her child.", "động từ"),
      v("trạm cuối", "điểm dừng cuối của tuyến", "last stop", "Tôi xuống ở trạm cuối.", "I got off at the last stop.", "danh từ"),
      v("tử tế", "tốt bụng với người khác", "kind", "Thói quen tử tế của thành phố.", "The city's habit of kindness.", "tính từ"),
      v("thấy nhẹ", "cảm thấy dễ chịu trong lòng", "to feel lighter", "Tôi tự nhiên thấy nhẹ.", "I suddenly felt lighter.", "cụm động từ"),
      v("giờ tan tầm", "giờ mọi người về nhà", "end-of-work rush", "Giờ tan tầm xe rất đông.", "Buses are crowded at the end-of-work rush.", "danh từ"),
    ],
    quiz: [
      q("Ai nhường ghế cho bà cụ?", "Who gave up a seat for the old woman?", ["Một bạn học sinh", "Người mẹ bế con", "Người kể chuyện", "Tài xế"], 0, "Bài nêu một bạn học sinh mặc áo trắng đứng lên nhường ghế.", "A student in a white shirt stood up."),
      q("Bà cụ làm gì để cảm ơn?", "How did the old woman say thanks?", ["Đưa một chùm nhãn", "Cho tiền", "Gọi tài xế", "Viết lời cảm ơn"], 0, "Bà lấy ra một chùm nhãn đưa cho bạn học sinh.", "She offered a bunch of longans."),
      q("Khi người mẹ bế con lên xe, điều gì xảy ra?", "What happened when the mother boarded?", ["Ba người cùng đứng lên nhường chỗ", "Không ai nhường", "Xe dừng lại", "Bà cụ xuống xe"], 0, "Bài nêu lần này ba người cùng đứng lên một lúc.", "Three people rose at once."),
      q("Người kể xuống xe ở đâu?", "Where did the narrator get off?", ["Trạm cuối", "Gần chợ", "Trạm đầu", "Trước cổng trường"], 0, "Bài nêu người kể xuống xe ở trạm cuối.", "The narrator got off at the last stop."),
      q("Câu cuối bài muốn nói điều gì?", "What does the last sentence suggest?", ["Xe buýt chở cả thói quen tử tế của thành phố", "Xe buýt luôn quá đông", "Nên đi xe máy hơn", "Trời nóng làm người ta khó tính"], 0, "Câu cuối khái quát về sự tử tế lan trong thành phố.", "It generalises about kindness spreading in the city."),
    ],
  },
  {
    id: "vn-v11-read-tet-return",
    title: "Đọc hiểu: Chuyến về quê ngày giáp Tết",
    titleEn: "Reading: Going Home Just Before Tet",
    level: "intermediate",
    theory: `## Bài đọc

Hai mươi tám tháng Chạp, bến xe đông như một cái chợ. Người nào cũng mang theo túi lớn túi nhỏ: bánh, trà, quần áo mới, một thùng sữa cho cháu.

Anh Hòa làm thợ hàn ở thành phố, năm nay về muộn vì công trình chậm tiến độ. Anh mua vé đứng, chịu chen sáu tiếng. Trên xe, người ta đổi chỗ cho nhau: người khỏe đứng, người say xe được ngồi cạnh cửa sổ.

Về tới đầu làng thì trời đã tối. Mẹ anh đứng chờ ở cổng, tay che đèn pin. Nồi nước lá mùi đã đun sẵn, thơm khắp sân.

Tết với nhiều người không phải là mấy ngày nghỉ, mà là khoảng thời gian để trở về đúng chỗ của mình, ngồi xuống bên nồi nước nóng và nghe mẹ hỏi: "Năm nay gầy hơn năm ngoái, ăn uống có tử tế không con?"

### Gợi ý đọc
Chú ý những chi tiết vật chất nhỏ gợi ra tình cảm gia đình.`,
    theoryEn: `## Reading passage

On the twenty-eighth of the twelfth lunar month the coach station teems like a market. Everyone carries bags: cakes, tea, new clothes, a carton of milk for a nephew.

Hoa, a welder in the city, returns late this year because his site fell behind. He buys a standing ticket and endures six hours. On board people swap places: the strong stand, the travel-sick sit by the window.

He reaches the village edge after dark. His mother waits at the gate, shading a torch with her hand. A pot of fragrant herb water is already boiling, scenting the whole yard.

For many, Tet is not a few days off but the time to return to one's proper place, sit by the hot pot and hear a mother ask whether you have been eating properly.`,
    vocabulary: [
      v("tháng Chạp", "tháng mười hai âm lịch", "twelfth lunar month", "Hai mươi tám tháng Chạp bến xe rất đông.", "The station is packed on the 28th of the twelfth lunar month.", "danh từ"),
      v("giáp Tết", "gần tới Tết", "just before Tet", "Ngày giáp Tết ai cũng bận.", "Everyone is busy just before Tet.", "cụm từ"),
      v("thợ hàn", "người làm nghề hàn kim loại", "welder", "Anh Hòa làm thợ hàn.", "Hoa works as a welder.", "danh từ"),
      v("vé đứng", "vé không có ghế", "standing ticket", "Anh mua vé đứng vì hết ghế.", "He bought a standing ticket as seats sold out.", "danh từ"),
      v("say xe", "buồn nôn khi đi xe", "travel-sick", "Người say xe được ngồi cạnh cửa sổ.", "The travel-sick sit by the window.", "tính từ"),
      v("chậm tiến độ", "trễ so với kế hoạch", "behind schedule", "Công trình chậm tiến độ.", "The site fell behind schedule.", "cụm từ"),
      v("nước lá mùi", "nước đun lá thơm dùng tắm cuối năm", "fragrant herb water", "Nồi nước lá mùi thơm khắp sân.", "The herb water scents the whole yard.", "danh từ"),
      v("đầu làng", "phía ngoài của làng", "the edge of the village", "Về tới đầu làng thì trời tối.", "It was dark when he reached the village edge.", "danh từ"),
      v("đèn pin", "đèn cầm tay", "torch, flashlight", "Mẹ anh che đèn pin đứng chờ.", "His mother waited shading a torch.", "danh từ"),
      v("trở về", "về lại nơi của mình", "to return", "Tết là khoảng thời gian để trở về.", "Tet is a time to return.", "động từ"),
    ],
    quiz: [
      q("Vì sao anh Hòa về quê muộn?", "Why does Hoa return home late?", ["Vì công trình chậm tiến độ", "Vì hết tiền", "Vì bị say xe", "Vì mẹ anh bận"], 0, "Bài nêu anh về muộn vì công trình chậm tiến độ.", "The text says his construction site fell behind."),
      q("Trên xe, mọi người làm gì để giúp nhau?", "How do passengers help each other?", ["Đổi chỗ cho người say xe được ngồi", "Chia nhau vé", "Đổi hành lý", "Xuống xe sớm"], 0, "Bài nêu người khỏe đứng, người say xe được ngồi cạnh cửa sổ.", "The strong stand so the travel-sick can sit by the window."),
      q("Mẹ anh Hòa chuẩn bị gì?", "What did Hoa's mother prepare?", ["Nồi nước lá mùi", "Bánh chưng", "Một chiếc xe", "Vé về quê"], 0, "Bài nêu nồi nước lá mùi đã đun sẵn.", "A pot of fragrant herb water was already boiling."),
      q("Chi tiết 'che đèn pin' gợi lên điều gì?", "What does 'shading a torch' suggest?", ["Sự chờ đợi chu đáo của người mẹ", "Làng mất điện hoàn toàn", "Mẹ anh sợ tối", "Đường rất rộng"], 0, "Chi tiết nhỏ này cho thấy mẹ đứng chờ con từ trước, rất chu đáo.", "The small detail shows a mother's attentive waiting."),
      q("Theo bài, Tết có ý nghĩa gì với nhiều người?", "What does Tet mean to many people?", ["Khoảng thời gian trở về đúng chỗ của mình", "Mấy ngày nghỉ để đi du lịch", "Dịp mua sắm nhiều nhất", "Thời điểm đổi việc"], 0, "Đoạn cuối nêu rõ ý nghĩa trở về này.", "The closing paragraph states this meaning."),
    ],
  },
  {
    id: "vn-v11-read-night-class",
    title: "Đọc hiểu: Lớp học buổi tối",
    titleEn: "Reading: The Evening Class",
    level: "advanced",
    theory: `## Bài đọc

Lớp học buổi tối ở nhà văn hóa phường mở từ bảy giờ. Học viên là công nhân, người giúp việc, thợ xây và mấy chị bán hàng ngoài chợ. Người trẻ nhất mười tám, người lớn nhất năm mươi bốn.

Chị Thu học vì con vào lớp một. Chị nói: "Con hỏi bài mà mẹ không đọc được thì con nghĩ học không quan trọng." Anh Bảy học vì muốn tự ký tên trên giấy tờ, không phải lăn tay.

Lớp không có giáo trình đẹp. Bảng là tấm gỗ sơn lại, phấn mua chung. Nhưng cách dạy rất thực tế: đọc bảng giá ngoài chợ, viết tin nhắn cho con, điền mẫu đơn ở phường, đọc đơn thuốc.

Sau sáu tháng, mười chín trong hai mươi ba học viên đọc được một đoạn báo ngắn. Cô giáo tình nguyện nói rằng điều thay đổi rõ nhất không phải mặt chữ, mà là cách họ bước vào cơ quan hành chính: không còn nhìn xuống, không còn đưa giấy cho người khác đọc hộ.

### Gợi ý đọc
So sánh lý do học của các nhân vật và kết quả cuối bài.`,
    theoryEn: `## Reading passage

The evening class at the ward culture house starts at seven. Learners are factory workers, domestic helpers, builders and market vendors. The youngest is eighteen, the oldest fifty-four.

Thu studies because her child entered grade one: if a mother cannot read her child's homework, the child concludes school does not matter. Bay studies to sign his own name instead of pressing a thumbprint.

The class has no polished textbook. The board is repainted wood, chalk is bought collectively. Yet the teaching is practical: reading market price boards, texting one's children, filling ward forms, reading prescriptions.

After six months, nineteen of twenty-three learners can read a short news paragraph. The volunteer teacher says the clearest change is not the letters but how they walk into an office: no longer looking down, no longer handing papers to someone else to read.`,
    vocabulary: [
      v("nhà văn hóa", "nơi sinh hoạt chung của phường xã", "community culture house", "Lớp học mở ở nhà văn hóa phường.", "The class runs at the ward culture house.", "danh từ"),
      v("học viên", "người theo học một lớp", "learner, course participant", "Lớp có hai mươi ba học viên.", "The class has twenty-three learners.", "danh từ"),
      v("lăn tay", "in dấu ngón tay thay chữ ký", "to give a thumbprint", "Anh Bảy không muốn lăn tay nữa.", "Bay no longer wants to use a thumbprint.", "động từ"),
      v("giáo trình", "sách dùng để dạy học", "textbook, syllabus", "Lớp không có giáo trình đẹp.", "The class has no polished textbook.", "danh từ"),
      v("thiết thực", "có ích ngay trong đời sống", "practical, useful", "Cách dạy rất thiết thực.", "The teaching is very practical.", "tính từ"),
      v("mẫu đơn", "tờ giấy có sẵn mục để điền", "form", "Học viên tập điền mẫu đơn.", "Learners practise filling forms.", "danh từ"),
      v("tình nguyện", "làm không lấy tiền", "voluntary", "Cô giáo tình nguyện dạy buổi tối.", "The teacher volunteers in the evenings.", "tính từ"),
      v("mặt chữ", "khả năng nhận biết chữ", "literacy in letters", "Thay đổi lớn hơn cả mặt chữ.", "The change goes beyond letters.", "danh từ"),
      v("tự tin", "tin vào bản thân", "confident", "Học viên bước vào cơ quan tự tin hơn.", "Learners enter offices more confidently.", "tính từ"),
      v("xóa mù chữ", "dạy cho người chưa biết chữ", "literacy education", "Lớp này góp phần xóa mù chữ.", "This class supports literacy education.", "danh từ"),
    ],
    quiz: [
      q("Vì sao chị Thu đi học?", "Why does Thu attend the class?", ["Vì con vào lớp một và chị muốn đọc được bài của con", "Vì muốn đổi việc", "Vì lớp học miễn phí", "Vì được thưởng tiền"], 0, "Chị nói nếu mẹ không đọc được thì con nghĩ học không quan trọng.", "She fears her child will think school does not matter."),
      q("Anh Bảy học để làm gì?", "Why does Bay study?", ["Để tự ký tên thay vì lăn tay", "Để dạy lại cho con", "Để đọc báo mỗi ngày", "Để thi lấy bằng"], 0, "Bài nêu anh muốn tự ký tên trên giấy tờ.", "He wants to sign his own name."),
      q("Cách dạy của lớp có đặc điểm gì?", "What characterises the teaching?", ["Gắn với việc thật như đọc bảng giá, điền mẫu đơn", "Chỉ học ngữ pháp", "Chỉ học thuộc lòng", "Chỉ luyện viết chính tả"], 0, "Bài liệt kê đọc bảng giá, viết tin nhắn, điền mẫu đơn, đọc đơn thuốc.", "The text lists price boards, texting, forms and prescriptions."),
      q("Kết quả sau sáu tháng là gì?", "What was the six-month result?", ["Mười chín trong hai mươi ba học viên đọc được đoạn báo ngắn", "Tất cả học viên tốt nghiệp", "Lớp phải đóng cửa", "Chỉ hai người tiến bộ"], 0, "Bài nêu con số cụ thể mười chín trên hai mươi ba.", "The text gives nineteen of twenty-three."),
      q("Theo cô giáo, thay đổi rõ nhất là gì?", "What does the teacher see as the clearest change?", ["Cách học viên bước vào cơ quan hành chính, không còn nhìn xuống", "Điểm kiểm tra cao hơn", "Số buổi đi học nhiều hơn", "Chữ viết đẹp hơn"], 0, "Cô giáo nói thay đổi lớn nhất là ở sự tự tin, không phải mặt chữ.", "The teacher points to confidence, not letters."),
    ],
  },
];

const advReadModule = vietnameseLessonsExpansionModules.find((mod) => mod.id === "vn-adv-reading");
if (advReadModule) advReadModule.lessons.push(...groupA);

const readAdvModule = readingModules.find((mod) => mod.id === "vn-reading-adv");
if (readAdvModule) readAdvModule.lessons.push(...groupB);
