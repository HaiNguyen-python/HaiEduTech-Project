// Mega5: Final batch to bring total > 5000.
import fs from "node:fs";
import { vietnameseVocabBank } from "../src/data/vietnamese/vocabularyBank.ts";

const existing = new Set(vietnameseVocabBank.map(w => w.word.toLowerCase()));

const T = (vi, en, viM, pos = "noun") => [
  vi, en, viM,
  `${vi.charAt(0).toUpperCase() + vi.slice(1)} thường gặp trong cuộc sống hàng ngày.`,
  `${en.charAt(0).toUpperCase() + en.slice(1)} is commonly encountered in daily life.`,
  pos
];

const themes = [
  ["vm5-weather-climate", "Thời tiết và khí hậu", "Weather & Climate", "🌦️", "from-sky-400 to-blue-500", [
    T("mưa rào","heavy shower","mưa to ngắn"),
    T("mưa phùn","drizzle","mưa nhỏ"),
    T("mưa đá","hailstorm","mưa có đá"),
    T("mưa axit","acid rain","mưa hóa chất"),
    T("mưa dầm","prolonged rain","mưa dai"),
    T("sương mù dày đặc","dense fog","sương dày"),
    T("sương giá","frost","sương đông"),
    T("băng tuyết","ice and snow","băng tuyết"),
    T("bão tuyết","blizzard","bão tuyết"),
    T("bão nhiệt đới","tropical storm","bão nhiệt đới"),
    T("siêu bão","super typhoon","bão cấp cao"),
    T("áp thấp nhiệt đới","tropical depression","ATNĐ"),
    T("không khí lạnh","cold air mass","KKL"),
    T("gió mùa đông bắc","northeast monsoon","gió mùa ĐB"),
    T("gió mùa tây nam","southwest monsoon","gió mùa TN"),
    T("gió Lào","Laos wind","gió Lào"),
    T("nắng nóng gay gắt","scorching heat","nắng gay gắt"),
    T("nắng dịu","mild sunshine","nắng nhẹ"),
    T("se lạnh","chilly","se se lạnh","adjective"),
    T("rét đậm","severe cold","rét đậm","adjective"),
    T("rét hại","damaging cold","rét hại","adjective"),
    T("nồm ẩm","humid weather","nồm ẩm","adjective"),
    T("khô hanh","dry weather","hanh khô","adjective"),
    T("oi bức","muggy","oi nồng","adjective"),
    T("dịu mát","pleasantly cool","dịu mát","adjective"),
    T("biển động","rough sea","biển động"),
    T("sóng thần","tsunami","sóng thần"),
    T("triều cường","high tide","triều cao"),
    T("lốc xoáy","tornado","lốc"),
    T("vòi rồng","waterspout","vòi rồng"),
    T("sấm chớp","thunder and lightning","sấm sét"),
    T("cầu vồng","rainbow","cầu vồng"),
    T("nhật quang","sunlight","ánh nắng"),
    T("ánh trăng rằm","full moon light","ánh trăng rằm"),
    T("sao băng","shooting star","sao băng"),
    T("nguyệt thực toàn phần","total lunar eclipse","nguyệt thực TP"),
    T("nhật thực một phần","partial solar eclipse","nhật thực 1 phần"),
    T("dự báo thời tiết","weather forecast","dự báo TT"),
    T("biến đổi mùa","seasonal change","đổi mùa"),
    T("xuân phân","spring equinox","xuân phân"),
    T("hạ chí","summer solstice","hạ chí"),
    T("thu phân","autumn equinox","thu phân"),
    T("đông chí","winter solstice","đông chí"),
  ]],
  ["vm5-body-anatomy", "Cơ thể và giải phẫu", "Body & Anatomy", "🫀", "from-red-400 to-pink-500", [
    T("hộp sọ","skull","sọ đầu"),
    T("xương sống","spine","cột sống"),
    T("xương sườn","rib","xương sườn"),
    T("xương đòn","collarbone","xương quai xanh"),
    T("xương bả vai","shoulder blade","xương bả vai"),
    T("xương cánh tay","humerus","xương cánh tay"),
    T("xương cẳng tay","forearm bone","xương tay dưới"),
    T("xương đùi","femur","xương đùi"),
    T("xương ống chân","tibia","xương ống chân"),
    T("xương bàn chân","foot bone","xương bàn chân"),
    T("khớp gối","knee joint","khớp gối"),
    T("khớp háng","hip joint","khớp háng"),
    T("khớp khuỷu tay","elbow joint","khớp khuỷu"),
    T("khớp cổ tay","wrist joint","khớp cổ tay"),
    T("khớp cổ chân","ankle joint","khớp cổ chân"),
    T("dây chằng","ligament","dây chằng"),
    T("gân Achilles","Achilles tendon","gân Achilles"),
    T("cơ tim","cardiac muscle","cơ tim"),
    T("cơ trơn","smooth muscle","cơ trơn"),
    T("cơ vân","skeletal muscle","cơ vân"),
    T("động mạch chủ","aorta","ĐM chủ"),
    T("động mạch vành","coronary artery","ĐM vành"),
    T("tĩnh mạch chủ","vena cava","TM chủ"),
    T("mao mạch","capillary","mạch máu nhỏ"),
    T("hồng cầu","red blood cell","HC"),
    T("bạch cầu","white blood cell","BC"),
    T("tiểu cầu","platelet","TC"),
    T("huyết tương","plasma","huyết tương"),
    T("tủy xương","bone marrow","tủy xương"),
    T("hạch bạch huyết","lymph node","hạch BH"),
    T("hệ tuần hoàn","circulatory system","HTH"),
    T("hệ tiêu hóa","digestive system","HTH"),
    T("hệ hô hấp","respiratory system","HHH"),
    T("hệ bài tiết","excretory system","HBT"),
    T("hệ nội tiết","endocrine system","HNT"),
    T("hệ thần kinh trung ương","central nervous system","TKTW"),
    T("hệ thần kinh ngoại biên","peripheral nervous system","TKNB"),
    T("tiểu não","cerebellum","tiểu não"),
    T("đại não","cerebrum","đại não"),
    T("hành tủy","medulla","hành tủy"),
    T("đồi thị","thalamus","đồi thị"),
    T("vỏ não","cerebral cortex","vỏ não"),
    T("dây thần kinh","nerve","dây TK"),
    T("tuyến giáp","thyroid gland","tuyến giáp"),
    T("tuyến yên","pituitary gland","tuyến yên"),
    T("tuyến thượng thận","adrenal gland","tuyến TT"),
    T("tuyến tụy","pancreas","tụy"),
    T("tuyến nước bọt","salivary gland","tuyến NB"),
    T("ruột non","small intestine","ruột non"),
    T("ruột già","large intestine","ruột già"),
    T("trực tràng","rectum","trực tràng"),
    T("bàng quang","bladder","bọng đái"),
    T("niệu đạo","urethra","niệu đạo"),
    T("niệu quản","ureter","niệu quản"),
  ]],
  ["vm5-plants-herbs", "Thực vật và dược liệu", "Plants & Herbs", "🌿", "from-green-500 to-emerald-600", [
    T("cây thảo dược","medicinal plant","cây thuốc"),
    T("nhân sâm","ginseng","sâm"),
    T("đông trùng hạ thảo","cordyceps","ĐTHT"),
    T("linh chi","reishi mushroom","nấm linh chi"),
    T("đinh lăng","đinh lăng plant","đinh lăng"),
    T("cỏ ngọt","stevia","cỏ ngọt"),
    T("rau diếp cá","fish mint","diếp cá"),
    T("kinh giới","lemon balm","kinh giới"),
    T("tía tô","perilla","tía tô"),
    T("húng quế","Thai basil","húng quế"),
    T("rau mùi","cilantro","ngò"),
    T("rau ngò gai","sawtooth coriander","ngò gai"),
    T("rau răm","Vietnamese coriander","rau răm"),
    T("rau đắng","bitter herb","rau đắng"),
    T("lá lốt","wild betel leaf","lá lốt"),
    T("lá chanh","kaffir lime leaf","lá chanh"),
    T("nghệ tươi","fresh turmeric","nghệ tươi"),
    T("riềng","galangal","riềng"),
    T("sả","lemongrass","sả"),
    T("gừng tươi","fresh ginger","gừng"),
    T("hành tím","shallot","hành tím"),
    T("tỏi","garlic","tỏi"),
    T("ớt sừng","chili","ớt sừng"),
    T("hạt sen","lotus seed","hạt sen"),
    T("củ sen","lotus root","củ sen"),
    T("măng tre","bamboo shoot","măng"),
    T("nấm rơm","straw mushroom","nấm rơm"),
    T("nấm hương","shiitake","nấm hương"),
    T("nấm kim châm","enoki","nấm kim châm"),
    T("rong biển","seaweed","rong biển"),
    T("tảo xoắn","spirulina","tảo xoắn"),
    T("cây xương rồng","cactus","xương rồng"),
    T("cây tre","bamboo","cây tre"),
    T("cây trúc","slender bamboo","cây trúc"),
    T("cây dừa","coconut tree","cây dừa"),
    T("cây cau","areca tree","cây cau"),
    T("cây phượng vĩ","flame tree","cây phượng"),
    T("cây bàng","almond tree","cây bàng"),
    T("cây đa","banyan tree","cây đa"),
    T("cây sồi","oak tree","cây sồi"),
    T("cây thông","pine tree","cây thông"),
    T("hoa mai vàng","yellow apricot blossom","mai vàng"),
    T("hoa đào hồng","pink peach blossom","đào hồng"),
    T("hoa ly","lily","hoa ly"),
    T("hoa hồng nhung","velvet rose","hồng nhung"),
    T("hoa cúc vàng","yellow daisy","cúc vàng"),
    T("hoa lan","orchid","hoa lan"),
    T("hoa sen hồng","pink lotus","sen hồng"),
    T("hoa súng","water lily","hoa súng"),
    T("hoa nhài","jasmine","hoa nhài"),
    T("hoa ngọc lan","magnolia","ngọc lan"),
    T("hoa bưởi","pomelo blossom","hoa bưởi"),
    T("hoa thiên lý","tonkin jasmine","thiên lý"),
  ]],
  ["vm5-tools-objects", "Đồ vật và công cụ", "Tools & Objects", "🛠️", "from-gray-500 to-zinc-600", [
    T("búa tạ","sledgehammer","búa lớn"),
    T("búa đinh","claw hammer","búa đóng đinh"),
    T("cờ lê","wrench","cờ lê"),
    T("mỏ lết","adjustable wrench","mỏ lết"),
    T("tua vít","screwdriver","tua vít"),
    T("kìm","pliers","kìm"),
    T("kéo cắt sắt","metal shears","kéo sắt"),
    T("máy khoan","drill","máy khoan"),
    T("máy mài","grinder","máy mài"),
    T("máy cưa","saw machine","máy cưa"),
    T("cưa tay","handsaw","cưa tay"),
    T("đục","chisel","đục"),
    T("thước đo","measuring tape","thước đo"),
    T("thước kẹp","caliper","thước kẹp"),
    T("máy hàn","welding machine","máy hàn"),
    T("máy phát điện","generator","máy phát điện"),
    T("máy nén khí","air compressor","máy nén khí"),
    T("đèn pin","flashlight","đèn pin"),
    T("ổ khóa","padlock","ổ khóa"),
    T("chìa khóa","key","chìa khóa"),
    T("bản lề","hinge","bản lề"),
    T("ốc vít","screw","ốc vít"),
    T("đinh tán","rivet","đinh tán"),
    T("dây thừng","rope","dây thừng"),
    T("dây cáp","cable","dây cáp"),
    T("xích","chain","xích"),
    T("túi đựng dụng cụ","tool bag","túi dụng cụ"),
    T("hộp dụng cụ","toolbox","hộp dụng cụ"),
    T("thang gấp","folding ladder","thang xếp"),
    T("xe đẩy hàng","cart","xe đẩy"),
    T("xe rùa","wheelbarrow","xe rùa"),
    T("máy hút bụi","vacuum cleaner","máy hút bụi"),
    T("máy lau nhà","floor cleaner","máy lau nhà"),
    T("máy giặt","washing machine","máy giặt"),
    T("máy sấy quần áo","clothes dryer","máy sấy"),
    T("bàn ủi hơi nước","steam iron","bàn ủi hơi"),
    T("nồi cơm điện","rice cooker","nồi cơm điện"),
    T("nồi áp suất","pressure cooker","nồi áp suất"),
    T("bếp từ","induction stove","bếp từ"),
    T("bếp ga","gas stove","bếp ga"),
    T("lò nướng","oven","lò nướng"),
    T("lò vi sóng","microwave","lò vi sóng"),
    T("máy xay sinh tố","blender","máy xay"),
    T("máy ép trái cây","juicer","máy ép"),
    T("máy pha cà phê","coffee machine","máy pha cà phê"),
    T("máy lọc nước","water purifier","máy lọc nước"),
    T("máy điều hòa","air conditioner","máy lạnh"),
    T("quạt trần","ceiling fan","quạt trần"),
    T("quạt đứng","stand fan","quạt đứng"),
    T("máy sưởi","heater","máy sưởi"),
    T("đèn ngủ","night lamp","đèn ngủ"),
    T("đèn bàn","desk lamp","đèn bàn"),
    T("đèn chùm","chandelier","đèn chùm"),
  ]],
  ["vm5-actions-verbs", "Động từ hành động", "Action Verbs", "🏃", "from-amber-500 to-orange-500", [
    T("chạy nước rút","sprint","chạy nhanh hết sức", "verb"),
    T("đi bộ nhanh","brisk walk","đi nhanh", "verb"),
    T("leo trèo","clamber","trèo lên","verb"),
    T("nhảy cao","high jump","nhảy lên cao","verb"),
    T("nhảy xa","long jump","nhảy ra xa","verb"),
    T("ném bóng","throw a ball","ném bóng","verb"),
    T("đỡ bóng","catch a ball","đỡ","verb"),
    T("đá bóng","kick a ball","đá","verb"),
    T("đập bóng","hit the ball","đập bóng","verb"),
    T("vẽ tranh","paint","vẽ","verb"),
    T("phác họa","sketch","phác họa","verb"),
    T("tô màu","color in","tô màu","verb"),
    T("cắt giấy","cut paper","cắt","verb"),
    T("dán keo","glue","dán","verb"),
    T("gấp giấy","fold paper","gấp","verb"),
    T("uốn cong","bend","uốn","verb"),
    T("kéo căng","stretch","kéo căng","verb"),
    T("co lại","contract","co","verb"),
    T("xoay tròn","rotate","quay tròn","verb"),
    T("lật úp","flip over","lật úp","verb"),
    T("đảo ngược","reverse","đảo","verb"),
    T("xếp chồng","stack","chồng lên","verb"),
    T("sắp xếp","arrange","sắp","verb"),
    T("phân loại","categorize","phân loại","verb"),
    T("đếm số","count","đếm","verb"),
    T("đo lường","measure","đo","verb"),
    T("cân","weigh","cân","verb"),
    T("đong","scoop","đong","verb"),
    T("ước lượng","estimate","ước tính","verb"),
    T("tính toán","calculate","tính","verb"),
    T("phân tích","analyze","phân tích","verb"),
    T("tổng hợp","synthesize","tổng hợp","verb"),
    T("so sánh","compare","so sánh","verb"),
    T("đối chiếu","contrast","đối chiếu","verb"),
    T("ghi chép","note down","ghi","verb"),
    T("đánh máy","type","gõ máy","verb"),
    T("chỉnh sửa","edit","sửa","verb"),
    T("kiểm duyệt","censor","duyệt","verb"),
    T("phê duyệt","approve","phê duyệt","verb"),
    T("từ chối","reject","từ chối","verb"),
    T("hoãn lại","postpone","hoãn","verb"),
    T("hủy bỏ","cancel","hủy","verb"),
    T("rút lui","withdraw","rút","verb"),
    T("rút lại","retract","rút lại","verb"),
    T("bổ sung","supplement","thêm","verb"),
    T("đề xuất","propose","đề nghị","verb"),
    T("biểu quyết","vote","bỏ phiếu","verb"),
    T("thảo luận","discuss","bàn","verb"),
    T("tranh luận","debate","tranh luận","verb"),
    T("thương lượng","negotiate","thương lượng","verb"),
    T("đàm phán","negotiate (formal)","đàm phán","verb"),
    T("hòa giải","mediate","hòa giải","verb"),
    T("phân xử","arbitrate","phân xử","verb"),
    T("hợp tác","cooperate","hợp tác","verb"),
    T("phối hợp","coordinate","phối hợp","verb"),
    T("đoàn kết","unite","đoàn kết","verb"),
    T("chia rẽ","divide","chia rẽ","verb"),
    T("ly khai","secede","tách ra","verb"),
  ]],
];

const out = [];
let added = 0;
for (const [id, titleVi, titleEn, icon, color, entries] of themes) {
  const seen = new Set();
  const valid = entries.filter(e => {
    const w = e[0].toLowerCase();
    if (existing.has(w) || seen.has(w)) return false;
    seen.add(w);
    existing.add(w);
    return true;
  });
  added += valid.length;
  out.push({ id, titleVi, titleEn, icon, color, entries: valid });
}

const lines = [];
lines.push('// AUTO-GENERATED Vietnamese mega-5 vocabulary (final expansion past 5000).');
lines.push('import type { VietnameseModule } from "./types";');
lines.push('');
lines.push('export const vocabularyMega5Modules: VietnameseModule[] = [');
for (const t of out) {
  lines.push('  {');
  lines.push(`    id: ${JSON.stringify(t.id)},`);
  lines.push(`    title: ${JSON.stringify(t.titleVi)},`);
  lines.push(`    titleEn: ${JSON.stringify(t.titleEn)},`);
  lines.push(`    icon: ${JSON.stringify(t.icon)},`);
  lines.push(`    color: ${JSON.stringify(t.color)},`);
  lines.push(`    description: ${JSON.stringify("Từ vựng " + t.titleVi.toLowerCase() + ".")},`);
  lines.push(`    descriptionEn: ${JSON.stringify("Vocabulary on " + t.titleEn.toLowerCase() + ".")},`);
  lines.push(`    category: "vocabulary",`);
  lines.push(`    lessons: [{`);
  lines.push(`      id: ${JSON.stringify(t.id + "-l1")},`);
  lines.push(`      title: ${JSON.stringify(t.titleVi)},`);
  lines.push(`      titleEn: ${JSON.stringify(t.titleEn)},`);
  lines.push(`      level: "advanced",`);
  lines.push(`      theory: ${JSON.stringify("Mở rộng " + t.titleVi.toLowerCase() + ".")},`);
  lines.push(`      theoryEn: ${JSON.stringify("Expansion: " + t.titleEn.toLowerCase() + ".")},`);
  lines.push(`      vocabulary: [`);
  for (const [vi, en, viM, viEx, enEx, pos] of t.entries) {
    lines.push(`        { word: ${JSON.stringify(vi)}, meaning: ${JSON.stringify(viM)}, meaningEn: ${JSON.stringify(en)}, example: ${JSON.stringify(viEx)}, exampleEn: ${JSON.stringify(enEx)}, partOfSpeech: ${JSON.stringify(pos)} },`);
  }
  lines.push(`      ],`);
  lines.push(`      quiz: [],`);
  lines.push(`    }],`);
  lines.push(`  },`);
}
lines.push('];');
lines.push('');

fs.writeFileSync('src/data/vietnamese/vocabularyMega5.ts', lines.join('\n'));
console.log(`Mega5: added ${added} new entries across ${out.length} modules.`);
