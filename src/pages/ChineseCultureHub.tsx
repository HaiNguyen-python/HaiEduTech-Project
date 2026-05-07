/**
 * @file ChineseCultureHub.tsx
 * @description Trung tâm "Văn hóa Giao tiếp Trung Quốc" - tổng hợp các bài học
 *              văn hóa, lễ hội, phong tục, triết học và quy tắc giao tiếp.
 *              Mỗi trụ cột đi kèm hình minh họa và bài học deep-dive mở rộng.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Heart, Lightbulb, PartyPopper, Sparkles, Users, ScrollText, Globe2, GraduationCap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { chineseConversationalPillars, type ChineseConvLesson } from "@/data/chineseConversationalCurriculum";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

// Hiển thị nội dung bài học có cấu trúc: tự tách danh sách (1)(2)... và xuống dòng giữa các câu
const FormattedBody = ({ text }: { text: string }) => {
  if (!text) return null;
  // Detect numbered list markers like (1), (2)...
  const hasNumbered = /\(1\)\s/.test(text) && /\(2\)\s/.test(text);

  if (hasNumbered) {
    // Split into intro + items
    const firstIdx = text.indexOf("(1)");
    const intro = text.slice(0, firstIdx).trim();
    const rest = text.slice(firstIdx);
    const parts = rest.split(/(?=\(\d+\)\s)/g).map((s) => s.trim()).filter(Boolean);
    return (
      <div className="space-y-3 text-[15px] text-foreground/85 leading-[1.85] [word-spacing:0.06em]">
        {intro && <p>{intro}</p>}
        <ul className="space-y-2.5 pl-1">
          {parts.map((p, i) => {
            const m = p.match(/^\((\d+)\)\s*(.*)$/s);
            return (
              <li key={i} className="flex gap-2.5">
                <span className="font-semibold text-red-500 shrink-0">{m ? `${m[1]}.` : "•"}</span>
                <span className="flex-1">{m ? m[2] : p}</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  // Otherwise: split into sentence paragraphs (group every 2 sentences)
  const sentences = text.match(/[^.!?]+[.!?]+(?:\s|$)/g) || [text];
  const groups: string[] = [];
  for (let i = 0; i < sentences.length; i += 2) {
    groups.push(sentences.slice(i, i + 2).join("").trim());
  }
  return (
    <div className="space-y-3 text-[15px] text-foreground/85 leading-[1.85] [word-spacing:0.06em]">
      {groups.map((g, i) => (
        <p key={i}>{g}</p>
      ))}
    </div>
  );
};

// 6 hình minh họa văn hóa
import imgMianzi from "@/assets/cn-culture/mianzi-guanxi.jpg";
import imgFestivals from "@/assets/cn-culture/festivals.jpg";
import imgPhilosophy from "@/assets/cn-culture/philosophy.jpg";
import imgBanquet from "@/assets/cn-culture/banquet.jpg";
import imgEtiquette from "@/assets/cn-culture/etiquette.jpg";
import imgIdioms from "@/assets/cn-culture/idioms.jpg";

// IDs các bài học mang đậm yếu tố văn hóa Trung Quốc trong curriculum hội thoại
const CULTURE_LESSON_IDS = [
  "cn-sc-04-festivals",
  "cn-sc-11-philosophy",
  "cn-dl-01-greetings",
  "cn-bz-03-office",
  "cn-sc-02-opinions",
  "cn-sc-13-storytelling",
];

// ========== CULTURAL THEMES với deep-dive lessons ==========
type DeepLesson = {
  titleVi: string;
  titleEn: string;
  zh?: string;
  pinyin?: string;
  bodyVi: string;
  bodyEn: string;
};

type Theme = {
  icon: typeof Users;
  color: string;
  image: string;
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
  tips: { vi: string; en: string }[];
  lessons: DeepLesson[];
};

const culturalThemes: Theme[] = [
  {
    icon: Users,
    color: "from-red-500 to-rose-500",
    image: imgMianzi,
    titleVi: "Thể diện & Quan hệ (面子 & 关系)",
    titleEn: "Mianzi & Guanxi",
    descVi: "面子 (miànzi - thể diện) và 关系 (guānxi - mối quan hệ) là 2 cột trụ trong giao tiếp Trung Hoa. Người Trung không nói 'không' trực tiếp, ưa dùng cách nói vòng để giữ thể diện cho cả hai bên.",
    descEn: "Mianzi (face) and Guanxi (relationships) are the two pillars of Chinese communication. The Chinese rarely say 'no' directly, preferring indirect language to preserve face for both parties.",
    tips: [
      { vi: "Tránh phê bình thẳng trước đám đông", en: "Avoid public criticism" },
      { vi: "Khen ngợi gián tiếp qua bên thứ 3", en: "Compliment indirectly via a third party" },
      { vi: "Tặng quà đáp lễ kịp thời để duy trì 关系", en: "Reciprocate gifts promptly to maintain Guanxi" },
    ],
    lessons: [
      {
        titleVi: "Hiểu sâu về 'Mianzi' - Thể diện",
        titleEn: "Understanding 'Mianzi' - Face Concept",
        zh: "面子",
        pinyin: "miànzi",
        bodyVi: "Mianzi gồm 2 lớp: 脸 (liǎn - phẩm giá đạo đức) và 面子 (miànzi - danh dự xã hội). Mất 'liǎn' = mất nhân cách (rất nghiêm trọng), mất 'miànzi' = mất sĩ diện trước xã hội. Người Trung sẵn sàng chi tiền lớn (tiệc tùng, quà cáp) để 'giữ mianzi' (留面子) hoặc 'cho mianzi' (给面子) cho người khác. Khi từ chối lời mời, đừng nói thẳng 'không' - hãy dùng '我考虑一下' (để tôi suy nghĩ) hoặc '可能有点困难' (có thể hơi khó).",
        bodyEn: "Mianzi has 2 layers: 脸 (liǎn - moral dignity) and 面子 (miànzi - social honor). Losing 'liǎn' = losing personhood (very serious), losing 'miànzi' = losing social pride. The Chinese spend big on banquets and gifts to 'keep mianzi' (留面子) or 'give mianzi' (给面子) to others. When declining, never say 'no' directly - use '我考虑一下' (let me think) or '可能有点困难' (might be a bit difficult).",
      },
      {
        titleVi: "Nghệ thuật xây dựng 'Guanxi' - Quan hệ",
        titleEn: "The Art of Building 'Guanxi'",
        zh: "关系",
        pinyin: "guānxi",
        bodyVi: "Guanxi là mạng lưới quan hệ cá nhân tin cậy lẫn nhau, vận hành dựa trên 人情 (rénqíng - ơn nghĩa). Khi ai đó giúp bạn, bạn 欠人情 (nợ ơn nghĩa) và phải trả lại đúng thời điểm. 3 cách xây Guanxi: (1) Cùng ăn uống - 'Có việc gì cứ ra bàn ăn nói', (2) Tặng quà đúng dịp (Trung thu, Tết), (3) Giới thiệu người - 'Tôi có một người bạn rất giỏi về việc này'. Guanxi mạnh giúp việc khó thành dễ, không có Guanxi thì việc dễ cũng thành khó.",
        bodyEn: "Guanxi is a network of trusted personal relationships running on 人情 (rénqíng - reciprocal favors). When someone helps you, you 欠人情 (owe a favor) and must repay at the right time. 3 ways to build Guanxi: (1) Share meals - 'business is done at the dining table', (2) Gift on right occasions (Mid-Autumn, New Year), (3) Make introductions. Strong Guanxi turns hard things easy; without it even easy things become hard.",
      },
      {
        titleVi: "Cách từ chối tinh tế kiểu Trung Hoa",
        titleEn: "The Subtle Chinese Way to Decline",
        bodyVi: "10 cách nói 'không' mà không thật sự nói 'không': 不太方便 (không tiện lắm), 再说吧 (bàn sau), 让我想想 (để tôi suy nghĩ), 看情况 (tùy tình hình), 有点难 (hơi khó), 改天吧 (hôm khác), 我尽量 (tôi cố gắng - thường = không), 应该可以 (chắc có thể), 不一定 (chưa chắc), 我问一下 (để tôi hỏi). Khi nghe những câu này từ người Trung, hiểu là họ đang lịch sự từ chối.",
        bodyEn: "10 ways to say 'no' without actually saying it: 不太方便 (not very convenient), 再说吧 (talk later), 让我想想 (let me think), 看情况 (depends), 有点难 (a bit hard), 改天吧 (another day), 我尽量 (I'll try - usually = no), 应该可以 (probably can), 不一定 (not certain), 我问一下 (let me ask). When you hear these from Chinese people, understand they are politely refusing.",
      },
      {
        titleVi: "Hệ thống Xưng hô trong Gia đình & Công việc",
        titleEn: "Address System: Family & Workplace",
        zh: "称呼系统",
        pinyin: "chēnghu xìtǒng",
        bodyVi: "Người Trung CỰC KỲ chú trọng xưng hô đúng vai vế. Trong gia đình: 爷爷/奶奶 (ông bà nội), 外公/外婆 (ông bà ngoại), 叔叔 (chú - em trai bố), 伯伯 (bác trai - anh trai bố), 姑姑 (cô - chị/em gái bố), 舅舅 (cậu - anh/em trai mẹ), 阿姨 (dì - chị/em gái mẹ). Trong công việc: gọi 姓 + chức danh = lịch sự nhất, ví dụ 王经理 (Vương giám đốc), 李老师 (Lý giáo viên), 张总 (Trương tổng - viết tắt 总经理). Người lớn tuổi không thân: 大哥/大姐 (anh/chị lớn), 师傅 (sư phụ - dùng cho tài xế, thợ). TRÁNH gọi tên trống không với người mới quen hoặc cấp trên - bị coi là thô lỗ.",
        bodyEn: "Chinese people care DEEPLY about correct address by hierarchy. Family: 爷爷/奶奶 (paternal grandparents), 外公/外婆 (maternal), 叔叔 (father's younger brother), 伯伯 (father's older brother), 姑姑 (father's sister), 舅舅 (mother's brother), 阿姨 (mother's sister). Workplace: surname + title is most polite, e.g. 王经理 (Manager Wang), 李老师 (Teacher Li), 张总 (Director Zhang). Older strangers: 大哥/大姐 (big brother/sister), 师傅 (master - for drivers, craftsmen). NEVER use bare first name with new acquaintances or superiors - considered rude.",
      },
      {
        titleVi: "Văn hóa khen ngợi & nhận lời khen",
        titleEn: "Praising & Receiving Praise",
        zh: "谦虚文化",
        pinyin: "qiānxū wénhuà",
        bodyVi: "Người Trung theo văn hóa khiêm tốn (谦虚) - khi được khen, KHÔNG nói 'cảm ơn' mà phải hạ thấp bản thân: '哪里哪里' (đâu có đâu có), '过奖了' (quá khen rồi), '马马虎虎' (cũng tàm tạm thôi), '还差得远' (còn xa lắm). Nếu bạn nói 'thank you' khi được khen tiếng Trung, sẽ bị coi là kiêu ngạo. Khi khen người khác: khen cụ thể (không khen chung chung), khen công việc/con cái/sự nghiệp (không khen ngoại hình phụ nữ với người mới quen). Mẹo: thay vì khen trực tiếp, hãy khen qua bên thứ 3 - lời khen đến tai sẽ ngọt gấp đôi.",
        bodyEn: "Chinese culture values modesty (谦虚) - when praised, DON'T say 'thank you'; instead deflect: '哪里哪里' (not at all), '过奖了' (over-praised), '马马虎虎' (just so-so), '还差得远' (still far from it). Saying 'thank you' to a Chinese compliment can seem arrogant. When praising: be specific (not generic), praise work/children/career (avoid praising women's looks with new acquaintances). Tip: instead of direct praise, compliment via a third party - praise reaching ears tastes twice as sweet.",
      },
    ],
  },
  {
    icon: PartyPopper,
    color: "from-orange-500 to-amber-500",
    image: imgFestivals,
    titleVi: "Lễ hội Truyền thống",
    titleEn: "Traditional Festivals",
    descVi: "Tết Nguyên đán (春节), Trung thu (中秋节), Đoan ngọ (端午节), Thanh minh (清明节)... mỗi lễ hội có nghi thức, ẩm thực và lời chúc riêng. Hiểu lễ hội = mở cánh cửa văn hóa.",
    descEn: "Spring Festival, Mid-Autumn, Dragon Boat, Qingming... each festival has its own rituals, foods and greetings. Knowing the festivals opens the door to the culture.",
    tips: [
      { vi: "新年快乐 - Lời chúc Tết phổ thông nhất", en: "Most common New Year greeting" },
      { vi: "Tặng 红包 (lì xì) bằng cả 2 tay", en: "Hand red envelopes with both hands" },
      { vi: "Số 4 (四) kiêng kỵ - tránh khi tặng quà", en: "Number 4 is taboo - avoid in gifting" },
    ],
    lessons: [
      {
        titleVi: "Tết Nguyên Đán - Xuân Tiết",
        titleEn: "Chinese New Year - Spring Festival",
        zh: "春节",
        pinyin: "Chūnjié",
        bodyVi: "Lễ hội lớn nhất năm, kéo dài 15 ngày từ mùng 1 đến Rằm tháng Giêng (Tết Nguyên Tiêu - 元宵节). Đêm 30 (除夕) cả nhà ăn 年夜饭 (cơm tất niên), xem 春晚 (Xuân Vãn - chương trình Gala). Mùng 1 mặc đồ đỏ, đốt pháo, nhận 红包 (hồng bao). Món ăn truyền thống: 饺子 (sủi cảo - hình nén bạc), 鱼 (cá - 'năm năm có dư'), 年糕 (bánh tổ - 'năm cao hơn năm'). Lời chúc: 新年快乐 (chúc mừng năm mới), 恭喜发财 (chúc phát tài), 万事如意 (vạn sự như ý).",
        bodyEn: "The biggest festival, lasting 15 days from day 1 to Lantern Festival (元宵节). On New Year's Eve (除夕) families eat 年夜饭 (reunion dinner) and watch 春晚 (Spring Gala). Day 1: wear red, light firecrackers, receive 红包 (red envelopes). Traditional foods: 饺子 (dumplings - shaped like ingots), 鱼 (fish - 'surplus year after year'), 年糕 (rice cake - 'higher year by year'). Greetings: 新年快乐, 恭喜发财, 万事如意.",
      },
      {
        titleVi: "Trung Thu - Lễ đoàn viên",
        titleEn: "Mid-Autumn - Reunion Festival",
        zh: "中秋节",
        pinyin: "Zhōngqiū jié",
        bodyVi: "Rằm tháng 8 âm lịch - lễ hội lớn thứ 2 sau Tết. Trăng tròn = biểu tượng đoàn viên gia đình. Cả nhà cùng ngắm trăng, ăn 月饼 (mooncake - bánh trung thu) và uống trà. Sự tích nổi tiếng: 嫦娥奔月 (Hằng Nga bay lên cung trăng). Mooncake có nhiều vị: nhân thập cẩm, đậu đỏ, hạt sen, lòng đỏ trứng muối (1 lòng đỏ = trăng tròn). Lời chúc: 中秋节快乐 (chúc Trung thu vui), 月圆人团圆 (trăng tròn người đoàn tụ).",
        bodyEn: "15th day of 8th lunar month - 2nd biggest festival. Full moon symbolizes family reunion. Families gaze at moon, eat 月饼 (mooncakes) and drink tea. Famous legend: 嫦娥奔月 (Chang'e flies to the moon). Mooncake fillings: mixed nuts, red bean, lotus seed, salted egg yolk (yolk = full moon). Greetings: 中秋节快乐, 月圆人团圆 (full moon, reunited family).",
      },
      {
        titleVi: "Tết Đoan Ngọ - Đua thuyền rồng",
        titleEn: "Dragon Boat Festival",
        zh: "端午节",
        pinyin: "Duānwǔ jié",
        bodyVi: "Mùng 5 tháng 5 âm lịch - tưởng nhớ thi hào yêu nước Khuất Nguyên (屈原) thời Chiến Quốc nhảy sông Mịch La tự vẫn. Dân chúng thả 粽子 (bánh ú nếp gói lá tre) xuống sông để cá không ăn xác ông, đua thuyền rồng để cứu ông. Phong tục: ăn bánh ú, đeo túi thơm 香囊 trừ tà, treo lá ngải cứu (艾草) ở cửa, uống rượu hùng hoàng. Lời chúc: 端午安康 (chúc Đoan ngọ an khang - LƯU Ý: không nói 'vui' vì là ngày tưởng niệm).",
        bodyEn: "5th day of 5th lunar month - commemorates patriot poet Qu Yuan (屈原) who drowned himself in Miluo River. People throw 粽子 (sticky rice in bamboo leaves) into the river so fish won't eat his body, and race dragon boats to save him. Customs: eat zongzi, wear scented sachets, hang mugwort at doors. Greeting: 端午安康 (Duānwǔ ānkāng - peace - NOT 'happy' since it's commemorative).",
      },
      {
        titleVi: "Thanh Minh - Tảo mộ tổ tiên",
        titleEn: "Qingming - Tomb Sweeping",
        zh: "清明节",
        pinyin: "Qīngmíng jié",
        bodyVi: "Khoảng mùng 4-6 tháng 4 dương lịch. Cả gia đình đi tảo mộ (扫墓), dâng hoa, đốt vàng mã, dọn cỏ mộ tổ tiên. Cũng là dịp đi chơi xuân (踏青 - đạp thanh). Bài thơ nổi tiếng của Đỗ Mục (杜牧): '清明时节雨纷纷，路上行人欲断魂' (Tiết Thanh minh mưa lất phất, người trên đường lòng tan nát).",
        bodyEn: "Around April 4-6. Families visit ancestral graves (扫墓), offer flowers, burn paper money, clean tombs. Also spring outing day (踏青). Famous poem by Du Mu: '清明时节雨纷纷，路上行人欲断魂' (Drizzling rain on Qingming day, travelers' hearts are torn).",
      },
      {
        titleVi: "Tết Nguyên Tiêu - Hội đèn lồng",
        titleEn: "Lantern Festival",
        zh: "元宵节",
        pinyin: "Yuánxiāo jié",
        bodyVi: "Rằm tháng Giêng - kết thúc 15 ngày Tết. Đêm này trăng tròn đầu tiên trong năm, cả nhà đi xem hội đèn lồng (灯会), ăn 元宵 / 汤圆 (chè trôi nước nhân ngọt - tròn = đoàn viên). Phong tục đặc sắc: 猜灯谜 (đoán câu đố treo trên đèn lồng) - vừa vui vừa rèn trí tuệ. Đây cũng được coi là 'Lễ tình nhân Trung Hoa' xưa - đêm duy nhất phụ nữ được tự do ra đường ngắm cảnh. Lời chúc: 元宵节快乐, 团团圆圆 (tròn đầy đoàn viên).",
        bodyEn: "15th day of Lunar Month 1 - ending of 15-day Spring Festival. The first full moon of the year - families enjoy lantern fairs (灯会) and eat 元宵 / 汤圆 (sweet glutinous rice balls - round = reunion). Special custom: 猜灯谜 (guess riddles attached to lanterns) - fun and brain-training. Considered ancient China's 'Valentine's Day' - the one night women could roam freely. Greetings: 元宵节快乐, 团团圆圆 (full and reunited).",
      },
      {
        titleVi: "Thất Tịch - Valentine của người Trung",
        titleEn: "Qixi - Chinese Valentine's Day",
        zh: "七夕节",
        pinyin: "Qīxī jié",
        bodyVi: "Mùng 7 tháng 7 âm lịch. Sự tích Ngưu Lang Chức Nữ (牛郎织女): nàng tiên dệt vải kết duyên với chàng chăn trâu, bị Ngọc Hoàng chia cắt bằng dải Ngân Hà (银河). Mỗi năm chỉ được gặp nhau 1 lần khi đàn quạ ô (喜鹊) bắc cầu qua sông Ngân. Phong tục: con gái xin tài khéo léo (乞巧节), bày trái cây ngoài sân, xâu kim dưới ánh trăng. Hiện đại: cặp đôi tặng hoa, sô-cô-la, đi ăn tối lãng mạn - tương tự Valentine 14/2 phương Tây.",
        bodyEn: "7th day of 7th lunar month. Legend of Cowherd & Weaver Girl (牛郎织女): a heavenly weaver fell for a cowherd, separated by the Jade Emperor with the Milky Way (银河). They meet once a year when magpies (喜鹊) form a bridge. Custom: girls pray for craftsmanship (乞巧节), display fruit, thread needles under moonlight. Modern: couples give flowers, chocolates, romantic dinners - like Western Valentine's.",
      },
      {
        titleVi: "Trùng Dương - Lễ kính lão",
        titleEn: "Double Ninth - Respect the Elderly",
        zh: "重阳节",
        pinyin: "Chóngyáng jié",
        bodyVi: "Mùng 9 tháng 9 âm lịch - 'cửu cửu trùng dương', số 9 dương cao nhất nên gọi 'trùng dương'. Đồng âm 久久 (lâu dài) → biểu tượng trường thọ. Năm 1989 chính thức thành 'Ngày Người Cao Tuổi' Trung Quốc (老人节). Phong tục: leo núi (登高 - cầu sức khỏe), ngắm hoa cúc (赏菊), uống rượu cúc, ăn bánh trùng dương (重阳糕). Bài thơ nổi tiếng của Vương Duy: '独在异乡为异客，每逢佳节倍思亲' (Một mình nơi đất khách, mỗi dịp lễ càng nhớ người thân).",
        bodyEn: "9th day of 9th lunar month - 'double yang', highest yang number. Homophone 久久 (long-lasting) → longevity symbol. Officially 'Senior Citizens Day' (老人节) since 1989. Customs: climb mountains (登高 for health), admire chrysanthemums (赏菊), drink chrysanthemum wine, eat 重阳糕 (Chongyang cake). Famous poem by Wang Wei: '独在异乡为异客，每逢佳节倍思亲' (Alone in a foreign land, on each festival I miss my family more).",
      },
    ],
  },
  {
    icon: ScrollText,
    color: "from-amber-500 to-yellow-500",
    image: imgPhilosophy,
    titleVi: "Triết học cổ điển",
    titleEn: "Classical Philosophy",
    descVi: "Nho giáo (儒家) đề cao lễ nghi, hiếu thảo. Đạo giáo (道家) hướng đến thuận tự nhiên (无为). Phật giáo Hán hóa (禅宗) nhấn mạnh tỉnh thức. Ba trường phái này định hình tư duy người Trung.",
    descEn: "Confucianism values ritual & filial piety. Taoism embraces wu wei (effortless action). Chan Buddhism stresses mindfulness. These three schools shape Chinese thinking.",
    tips: [
      { vi: "已所不欲，勿施于人 - 'Kỷ sở bất dục, vật thi ư nhân'", en: "Confucian Golden Rule" },
      { vi: "上善若水 - Đức cao như nước (Lão Tử)", en: "Highest virtue is like water" },
      { vi: "Tôn trọng cấp trên, người lớn tuổi", en: "Respect seniors and elders" },
    ],
    lessons: [
      {
        titleVi: "Nho Giáo - Khổng Tử & Ngũ Thường",
        titleEn: "Confucianism - Confucius & Five Constants",
        zh: "儒家",
        pinyin: "Rújiā",
        bodyVi: "Khổng Tử (孔子, 551-479 TCN) sáng lập Nho giáo - hệ tư tưởng nền tảng văn hóa Đông Á 2500 năm. Ngũ Thường (五常) - 5 đức tính cốt lõi: 仁 (Nhân - lòng nhân ái), 义 (Nghĩa - chính nghĩa), 礼 (Lễ - lễ nghi), 智 (Trí - trí tuệ), 信 (Tín - chữ tín). Tam Cương (三纲): vua-tôi, cha-con, vợ-chồng. Đề cao 孝 (Hiếu - hiếu thảo) và 忠 (Trung - trung thành). Câu nói nổi tiếng: '学而时习之，不亦说乎' (Học rồi thường ôn luyện, há chẳng vui sao).",
        bodyEn: "Confucius (孔子, 551-479 BCE) founded Confucianism - the East Asian cultural foundation for 2,500 years. Five Constants (五常): 仁 (Ren - benevolence), 义 (Yi - righteousness), 礼 (Li - ritual propriety), 智 (Zhi - wisdom), 信 (Xin - trustworthiness). Three Bonds: ruler-subject, father-son, husband-wife. Values 孝 (filial piety) and 忠 (loyalty). Famous: '学而时习之，不亦说乎' (Learning and practicing - what a joy).",
      },
      {
        titleVi: "Đạo Giáo - Lão Tử & Vô Vi",
        titleEn: "Taoism - Laozi & Wu Wei",
        zh: "道家",
        pinyin: "Dàojiā",
        bodyVi: "Lão Tử (老子) viết 道德经 (Đạo Đức Kinh - 5000 chữ). Tư tưởng cốt lõi: 道 (Đạo - quy luật vũ trụ tự nhiên), 无为 (Vô vi - không can thiệp, thuận theo tự nhiên), 阴阳 (Âm Dương - hai mặt đối lập bổ sung nhau). 'Vô vi' không phải lười biếng mà là hành động đúng thời điểm, không cưỡng ép. Câu nổi tiếng: '上善若水，水善利万物而不争' (Đức cao như nước, nước nuôi vạn vật mà không tranh giành), '千里之行，始于足下' (Hành trình ngàn dặm bắt đầu từ một bước chân).",
        bodyEn: "Laozi (老子) wrote 道德经 (Tao Te Ching - 5,000 characters). Core ideas: 道 (Tao - natural order), 无为 (Wu Wei - non-action, flowing with nature), 阴阳 (Yin-Yang - complementary opposites). 'Wu Wei' isn't laziness but acting at the right moment without force. Famous: '上善若水' (highest good is like water), '千里之行，始于足下' (a journey of a thousand miles begins with one step).",
      },
      {
        titleVi: "Thiền Tông - Phật giáo Hán hóa",
        titleEn: "Chan/Zen Buddhism in China",
        zh: "禅宗",
        pinyin: "Chánzōng",
        bodyVi: "Bồ Đề Đạt Ma (达摩) từ Ấn Độ sang Trung Quốc thế kỷ 6, sáng lập Thiền Tông - dòng Phật giáo Trung Hoa hóa, ảnh hưởng sang Nhật Bản (Zen). Đặc điểm: 不立文字 (không lập văn tự - không bám chữ nghĩa), 直指人心 (chỉ thẳng vào tâm), 见性成佛 (thấy bản tính = thành Phật). Thiền không cần tụng nhiều kinh, chỉ cần thiền định (打坐) và 'công án' (công án thiền). Câu nổi tiếng: '菩提本无树，明镜亦非台' (Bồ đề vốn không cây, gương sáng cũng chẳng đài) - Lục Tổ Huệ Năng.",
        bodyEn: "Bodhidharma (达摩) came from India to China in 6th century, founded Chan Buddhism - Sinicized form that later spread to Japan as Zen. Features: 不立文字 (no reliance on scripture), 直指人心 (point directly to mind), 见性成佛 (see your nature, become Buddha). Less chanting, more meditation (打坐) and koans. Famous quote by Hui-neng: '菩提本无树，明镜亦非台' (Bodhi has no tree, the mirror has no stand).",
      },
      {
        titleVi: "Pháp Gia & Binh Pháp Tôn Tử",
        titleEn: "Legalism & Sun Tzu's Art of War",
        zh: "法家 & 孙子兵法",
        pinyin: "Fǎjiā & Sūnzǐ Bīngfǎ",
        bodyVi: "Pháp Gia (法家) do Hàn Phi Tử (韩非子) đại diện, đề cao 法 (luật pháp), 术 (thuật trị quan), 势 (uy thế) - dùng pháp luật nghiêm minh thay đạo đức. Tần Thủy Hoàng dùng Pháp Gia thống nhất Trung Hoa năm 221 TCN. Tôn Tử Binh Pháp (孙子兵法) - 13 thiên, 6000 chữ, viết cách đây 2500 năm nhưng vẫn được Harvard Business School giảng dạy. Tư tưởng cốt lõi: '不战而屈人之兵' (không đánh mà khuất phục được địch = thắng cao nhất), '知己知彼，百战不殆' (biết mình biết người, trăm trận không nguy), '兵者，诡道也' (chiến tranh là đạo lừa dối).",
        bodyEn: "Legalism (法家), led by Han Feizi, emphasized 法 (law), 术 (technique of rule), 势 (power) - strict laws over morality. Qin Shi Huang used Legalism to unify China in 221 BCE. Sun Tzu's Art of War (孙子兵法) - 13 chapters, 6,000 characters, written 2,500 years ago but still taught at Harvard Business School. Core: '不战而屈人之兵' (subdue the enemy without fighting = highest victory), '知己知彼，百战不殆' (know yourself and enemy, 100 battles no peril), '兵者，诡道也' (war is the way of deception).",
      },
      {
        titleVi: "Mặc Gia - Triết lý Yêu Thương Phổ Quát",
        titleEn: "Mohism - Universal Love",
        zh: "墨家",
        pinyin: "Mòjiā",
        bodyVi: "Mặc Tử (墨子, 470-391 TCN) sáng lập Mặc Gia - đối thủ lớn của Nho gia thời Chiến Quốc. Tư tưởng cốt lõi: 兼爱 (kiêm ái - yêu thương mọi người như nhau, không phân biệt thân sơ - khác Nho gia chỉ yêu người thân trước), 非攻 (phi công - phản đối chiến tranh xâm lược), 节用 (tiết dụng - tiết kiệm), 尚贤 (thượng hiền - trọng người tài, không trọng quý tộc). Mặc Tử cũng là nhà khoa học sớm nhất Trung Hoa - phát hiện camera obscura (mô hình chụp ảnh nguyên thủy) và định luật quang học. Mặc Gia suy tàn sau Tần, nhưng tư tưởng nhân đạo của ông được hồi sinh trong xã hội hiện đại.",
        bodyEn: "Mozi (墨子, 470-391 BCE) founded Mohism - a major rival to Confucianism. Core ideas: 兼爱 (universal love - love all equally, unlike Confucian preference for kin), 非攻 (anti-aggression - oppose offensive war), 节用 (frugality), 尚贤 (meritocracy - promote talent over aristocracy). Mozi was also China's earliest scientist - discovered camera obscura and optics laws. Mohism faded after Qin, but his humanitarian ideas have been revived in modern times.",
      },
    ],
  },
  {
    icon: Heart,
    color: "from-rose-500 to-pink-500",
    image: imgBanquet,
    titleVi: "Văn hóa Ẩm thực & Tiệc tùng",
    titleEn: "Dining & Banquet Culture",
    descVi: "Bữa tiệc Trung Quốc xoay quanh bàn tròn (圆桌). Chủ tiệc ngồi đối diện cửa, khách quý ngồi bên phải. 干杯 (cạn ly) là nghi thức quan trọng, cần biết cách từ chối lịch sự nếu không uống được.",
    descEn: "Chinese banquets revolve around the round table. The host sits facing the door, the guest of honor on the right. 'Ganbei' (bottoms up) is essential - know how to politely decline if you can't drink.",
    tips: [
      { vi: "Không cắm đũa thẳng vào bát cơm", en: "Never stick chopsticks upright in rice" },
      { vi: "Rót trà cho người khác trước khi rót cho mình", en: "Pour tea for others first" },
      { vi: "Gõ nhẹ ngón tay = lời cảm ơn khi được rót trà", en: "Tap fingers to say thank you for tea" },
    ],
    lessons: [
      {
        titleVi: "Vị trí ngồi tại bàn tròn",
        titleEn: "Seating Order at Round Table",
        zh: "座次礼仪",
        pinyin: "zuòcì lǐyí",
        bodyVi: "Vị trí ngồi cực kỳ quan trọng và có nghi thức rõ ràng: (1) Chủ tiệc (主人) ngồi đối diện cửa ra vào - vị trí 'nhìn thấy mọi thứ', (2) Khách quý nhất (主宾) ngồi bên phải chủ tiệc, (3) Khách quan trọng thứ 2 ngồi bên trái chủ tiệc, (4) Phó chủ tiệc (副主人) ngồi đối diện chủ tiệc, lưng quay ra cửa - lo việc gọi món, kết toán. Đừng tự ý ngồi - hãy đợi chủ mời. Khi chủ chưa cầm đũa, không ai được ăn trước.",
        bodyEn: "Seating is highly ritualized: (1) Host (主人) sits facing the door - sees everything, (2) Guest of honor (主宾) sits to host's right, (3) Second VIP sits to host's left, (4) Co-host (副主人) sits opposite host with back to door - handles ordering and bills. Never sit until invited. Never start eating until the host picks up chopsticks.",
      },
      {
        titleVi: "Văn hóa 干杯 - Cạn ly",
        titleEn: "Ganbei - The Toast Culture",
        zh: "干杯",
        pinyin: "gānbēi",
        bodyVi: "干杯 (gānbēi - 'làm khô ly') = uống cạn 100%. Đây là biểu tượng tin cậy và tôn trọng. Nguyên tắc: (1) Khi cụng ly với cấp trên/người lớn tuổi, ly bạn phải THẤP HƠN ly họ một chút, (2) Cầm ly bằng cả 2 tay, (3) Nhìn vào mắt người cụng, (4) Sau khi cạn, dốc ly cho thấy đã hết. Cách từ chối lịch sự: '我不太能喝，以茶代酒可以吗?' (Tôi không uống được nhiều, dùng trà thay rượu được không?). Không bao giờ uống một mình - luôn mời người khác.",
        bodyEn: "干杯 (gānbēi - 'dry the cup') = drink 100%. A symbol of trust and respect. Rules: (1) Toast with seniors - your glass MUST BE LOWER than theirs, (2) Hold glass with both hands, (3) Make eye contact, (4) After draining, tip glass to show it's empty. Polite decline: '我不太能喝，以茶代酒可以吗?' (I can't drink much, may I use tea instead?). Never drink alone - always invite others.",
      },
      {
        titleVi: "10 điều kiêng kỵ với đũa",
        titleEn: "10 Chopstick Taboos",
        bodyVi: "(1) Cắm đũa thẳng vào bát cơm = giống nhang cúng người chết - ĐẠI KỴ, (2) Gõ đũa vào bát = ăn xin, (3) Chỉ đũa vào người khác = vô lễ, (4) Mút đũa = bẩn, (5) Bới món ăn tìm miếng ngon, (6) Dùng đũa đâm xiên thức ăn, (7) Bắt chéo đũa trên bàn = xui, (8) Để đũa lệch = dấu hiệu xấu, (9) Đưa thức ăn từ đũa sang đũa người khác = giống tang lễ, (10) Liếm đũa. An toàn: đặt đũa ngang miệng bát hoặc trên kê đũa.",
        bodyEn: "(1) Sticking chopsticks upright in rice = looks like funeral incense - BIG TABOO, (2) Tapping bowl with chopsticks = beggar gesture, (3) Pointing at people, (4) Sucking chopsticks, (5) Digging through dishes, (6) Stabbing food, (7) Crossing chopsticks on table = bad luck, (8) Uneven placement, (9) Passing food chopstick-to-chopstick = funeral ritual, (10) Licking chopsticks. Safe: rest across bowl rim or on chopstick holder.",
      },
      {
        titleVi: "Văn hóa trà - Cách rót & cảm ơn",
        titleEn: "Tea Culture - Pouring & Thanking",
        zh: "茶文化",
        pinyin: "chá wénhuà",
        bodyVi: "Trà là 'đồ uống quốc dân' - mọi cuộc gặp đều có trà. Quy tắc: (1) Rót trà cho người khác TRƯỚC, mình rót sau cùng, (2) Rót đầy 7/10 ly (trà đầy = không trân trọng khách), (3) Khi được rót trà, gõ NHẸ 2 ngón tay (trỏ + giữa) lên bàn 3 lần = lời cảm ơn (典故 từ Càn Long vi hành), (4) Tay trẻ thì gõ 3 ngón = tỏ kính trọng cao hơn. Trà phổ biến: 龙井 (Long Tỉnh - xanh), 普洱 (Phổ Nhĩ - đen), 铁观音 (Thiết Quan Âm - Ô long), 茉莉花茶 (trà nhài).",
        bodyEn: "Tea is the national drink - every meeting has tea. Rules: (1) Pour for OTHERS first, yourself last, (2) Fill only 7/10 (full cup = not respecting guest), (3) When tea is poured for you, lightly tap table 3 times with index + middle finger = thank you (legend from Emperor Qianlong's incognito tour), (4) Younger people tap with 3 fingers = higher respect. Popular teas: 龙井 (Longjing green), 普洱 (Pu'er black), 铁观音 (Tieguanyin oolong), 茉莉花茶 (jasmine).",
      },
    ],
  },
  {
    icon: Globe2,
    color: "from-emerald-500 to-teal-500",
    image: imgEtiquette,
    titleVi: "Ngôn ngữ Cơ thể & Tabu",
    titleEn: "Body Language & Taboos",
    descVi: "Bắt tay nhẹ (không nắm chặt), tránh ôm trừ khi rất thân. Đưa danh thiếp bằng 2 tay, mặt chữ hướng về người nhận. Tránh nói chuyện chính trị nhạy cảm như Đài Loan, Tây Tạng với người mới quen.",
    descEn: "Light handshakes, avoid hugs unless very close. Present business cards with both hands, text facing the receiver. Avoid sensitive political topics like Taiwan, Tibet with new acquaintances.",
    tips: [
      { vi: "Không chỉ tay bằng 1 ngón - dùng cả bàn tay", en: "Don't point with one finger - use whole hand" },
      { vi: "Màu trắng = tang lễ (tránh tặng hoa trắng)", en: "White = funeral (avoid white flowers)" },
      { vi: "Đồng hồ (送钟) đồng âm với 'tiễn cuối cùng' - không tặng", en: "Don't gift clocks - homophone for funeral" },
    ],
    lessons: [
      {
        titleVi: "Nghi thức trao danh thiếp",
        titleEn: "Business Card Etiquette",
        zh: "名片礼仪",
        pinyin: "míngpiàn lǐyí",
        bodyVi: "Danh thiếp (名片 míngpiàn) = mặt mũi cá nhân và công ty. Quy tắc: (1) Cầm danh thiếp bằng 2 tay, mặt chữ hướng về người nhận, (2) Hơi cúi đầu khi đưa, (3) Khi nhận, cũng dùng 2 tay, đọc kỹ 5-10 giây thể hiện tôn trọng, (4) ĐỪNG nhét vào túi sau (mông) - bất kính, hãy để vào ví hoặc hộp danh thiếp, (5) Trong cuộc họp, đặt danh thiếp lên bàn theo sơ đồ chỗ ngồi để dễ nhớ tên. Danh thiếp lý tưởng có 1 mặt tiếng Trung.",
        bodyEn: "Name card (名片 míngpiàn) = personal & company face. Rules: (1) Hold with both hands, text facing recipient, (2) Slight bow when presenting, (3) Receive with both hands too, read carefully 5-10 seconds to show respect, (4) NEVER put in back pocket - disrespectful; use a wallet or card holder, (5) In meetings, place cards on table matching seating arrangement to remember names. Ideal cards have one side in Chinese.",
      },
      {
        titleVi: "Quà tặng - Nên & Không nên",
        titleEn: "Gift Giving - Do's & Don'ts",
        zh: "送礼禁忌",
        pinyin: "sònglǐ jìnjì",
        bodyVi: "NÊN tặng: trà ngon, rượu Mao Đài (茅台), bánh trung thu, trái cây (số lẻ), đồ thủ công nghệ thuật, hộp gấm có chữ 福 (phúc). KHÔNG tặng: (1) Đồng hồ to (送钟 zhōng đồng âm 送终 = tiễn người chết), (2) Ô (伞 sǎn đồng âm 散 = chia tay), (3) Lê (梨 lí đồng âm 离 = chia ly - tránh tặng cặp đôi), (4) Giày (鞋 xié đồng âm 邪 = ác), (5) Khăn tay = chia tay nước mắt, (6) Hoa cúc trắng = tang lễ, (7) Số 4 (四 sì đồng âm 死 = chết). Gói quà bằng giấy đỏ/vàng (kiêng giấy trắng/đen). Khách thường từ chối 2-3 lần trước khi nhận - đây là phép lịch sự, hãy kiên trì mời.",
        bodyEn: "DO gift: quality tea, Maotai liquor, mooncakes, fruit (odd numbers), handicrafts, brocade boxes with 福 (luck). DON'T gift: (1) Clocks (送钟 zhōng = sending to funeral), (2) Umbrellas (伞 sǎn = breakup), (3) Pears (梨 lí = separation - avoid for couples), (4) Shoes (鞋 xié = evil), (5) Handkerchiefs = farewell tears, (6) White chrysanthemums = funeral, (7) Number 4 (四 sì = death). Wrap in red/gold paper (avoid white/black). Recipients often decline 2-3 times before accepting - politeness; keep insisting.",
      },
      {
        titleVi: "Con số May & Xui",
        titleEn: "Lucky & Unlucky Numbers",
        bodyVi: "MAY: 8 (八 bā ~ 发 fā = phát tài) - cực may, biển số xe có 8 đắt gấp đôi. 6 (六 liù ~ 流 = thuận lợi). 9 (九 jiǔ ~ 久 = lâu dài). XUI: 4 (四 sì ~ 死 sǐ = chết) - bệnh viện không có tầng 4, số phòng tránh. 7 trong tang lễ (làm 7 ngày). Sự kiện trọng đại: chọn ngày có 8 (8/8, 18/8). Khi tặng tiền hồng bao Tết, tránh số 4: 100, 200, 500, 600, 800, 888 nguyên (tốt nhất). Olympic Bắc Kinh khai mạc 8/8/2008 lúc 8:08 tối - hoàn toàn không ngẫu nhiên.",
        bodyEn: "LUCKY: 8 (八 bā ~ 发 fā = wealth) - extremely lucky, car plates with 8 cost double. 6 (六 ~ smooth flow). 9 (九 ~ longevity). UNLUCKY: 4 (四 sì ~ 死 sǐ = death) - hospitals skip 4th floor. 7 in funerals (7-day rituals). Big events: pick dates with 8 (8/8, 18/8). For New Year red envelopes, avoid 4: prefer 100, 200, 500, 600, 800, 888. The Beijing Olympics opened on 8/8/2008 at 8:08 pm - not coincidence.",
      },
      {
        titleVi: "Ý nghĩa Màu sắc trong văn hóa Trung",
        titleEn: "Color Symbolism in Chinese Culture",
        zh: "颜色象征",
        pinyin: "yánsè xiàngzhēng",
        bodyVi: "ĐỎ (红 hóng): may mắn, hỉ sự, đám cưới, Tết - dùng cho mọi dịp vui. Cô dâu mặc đỏ, hồng bao đỏ, đèn lồng đỏ. VÀNG (黄 huáng): hoàng tộc, quyền lực - xưa chỉ vua được mặc vàng. Cũng là màu Phật giáo. XANH LÁ (绿): sức sống, mùa xuân - NHƯNG đội mũ xanh (戴绿帽子) = bị vợ ngoại tình (đại kỵ với đàn ông!). TRẮNG (白): tang lễ, cái chết, sự thuần khiết - tránh tặng quà gói trắng. ĐEN (黑): nghiêm trang, trang trọng nhưng cũng mang nghĩa tang tóc. XANH LAM (蓝): tĩnh tại, ổn định. TÍM (紫): cao quý, may mắn (紫气东来 = khí tím từ phương đông tới = điềm lành).",
        bodyEn: "RED (红 hóng): luck, joy, weddings, New Year - all happy occasions. Brides wear red, red envelopes, red lanterns. YELLOW (黄): royalty, power - only emperors could wear yellow historically. Also Buddhism color. GREEN (绿): vitality, spring - BUT a green hat (戴绿帽子) means a wife is unfaithful (BIG taboo for men!). WHITE (白): funerals, death, purity - never wrap gifts in white. BLACK (黑): formality but also mourning. BLUE (蓝): calm, stability. PURPLE (紫): nobility, luck (紫气东来 = purple aura from the east = auspicious omen).",
      },
      {
        titleVi: "12 Con Giáp - 十二生肖",
        titleEn: "The 12 Chinese Zodiac Animals",
        zh: "十二生肖",
        pinyin: "shí'èr shēngxiào",
        bodyVi: "Theo truyền thuyết, Ngọc Hoàng tổ chức cuộc đua, 12 con vật về đích đầu tiên trở thành con giáp: Tý 鼠 (chuột), Sửu 牛 (trâu), Dần 虎 (hổ), Mão 兔 (thỏ - VN dùng mèo), Thìn 龙 (rồng), Tỵ 蛇 (rắn), Ngọ 马 (ngựa), Mùi 羊 (dê), Thân 猴 (khỉ), Dậu 鸡 (gà), Tuất 狗 (chó), Hợi 猪 (heo). Câu hỏi xã giao thường gặp: '你属什么?' (bạn cầm tinh con gì?) - thay vì hỏi tuổi (vô lễ). Cách tính: mỗi 12 năm lặp lại 1 chu kỳ. Năm con giáp của mình (本命年 běnmìngnián) được coi là năm xui - phải đeo đồ ĐỎ (thắt lưng đỏ, vớ đỏ) để hóa giải!",
        bodyEn: "Legend: the Jade Emperor held a race; 12 winning animals became zodiac signs: 鼠 (Rat), 牛 (Ox), 虎 (Tiger), 兔 (Rabbit - cat in Vietnam), 龙 (Dragon), 蛇 (Snake), 马 (Horse), 羊 (Goat), 猴 (Monkey), 鸡 (Rooster), 狗 (Dog), 猪 (Pig). Common social question: '你属什么?' (What's your zodiac?) - polite alternative to asking age. Cycle: 12-year repeating. Your zodiac year (本命年 běnmìngnián) is considered unlucky - wear RED (red belt, red socks) to ward off bad luck!",
      },
    ],
  },
  {
    icon: Sparkles,
    color: "from-purple-500 to-indigo-500",
    image: imgIdioms,
    titleVi: "Thành ngữ & Tục ngữ Vàng",
    titleEn: "Golden Idioms & Proverbs",
    descVi: "Thành ngữ 4 chữ (成语) là tinh hoa văn hóa Hán. Sử dụng đúng thành ngữ trong hội thoại sẽ khiến đối phương đánh giá cao trình độ và sự am hiểu văn hóa của bạn.",
    descEn: "Four-character idioms (chengyu) are the essence of Chinese culture. Using them correctly in conversation earns immediate respect and demonstrates cultural depth.",
    tips: [
      { vi: "入乡随俗 - Nhập gia tùy tục", en: "When in Rome, do as Romans" },
      { vi: "一举两得 - Một công đôi việc", en: "Kill two birds with one stone" },
      { vi: "活到老学到老 - Học cả đời", en: "Learning is lifelong" },
    ],
    lessons: [
      {
        titleVi: "Top 10 Thành ngữ về Học tập & Kiên trì",
        titleEn: "Top 10 Idioms about Learning & Perseverance",
        bodyVi: "(1) 学无止境 (xué wú zhǐ jìng) - Học không có giới hạn. (2) 温故知新 (wēn gù zhī xīn) - Ôn cũ biết mới. (3) 滴水穿石 (dī shuǐ chuān shí) - Nước chảy đá mòn. (4) 锲而不舍 (qiè ér bù shě) - Khắc mãi không bỏ = kiên trì. (5) 闻鸡起舞 (wén jī qǐ wǔ) - Nghe gà gáy dậy múa = chăm chỉ rèn luyện. (6) 悬梁刺股 (xuán liáng cì gǔ) - Treo tóc trên xà, đâm đùi chống buồn ngủ. (7) 凿壁偷光 (záo bì tōu guāng) - Đục tường trộm ánh sáng học. (8) 业精于勤 (yè jīng yú qín) - Nghiệp tinh vì siêng. (9) 厚积薄发 (hòu jī bó fā) - Tích lũy nhiều, phát huy ít (ý: chuẩn bị kỹ trước khi xuất chiêu). (10) 持之以恒 (chí zhī yǐ héng) - Kiên trì bền bỉ.",
        bodyEn: "(1) 学无止境 - Learning has no end. (2) 温故知新 - Reviewing old to know new. (3) 滴水穿石 - Dripping water bores through stone. (4) 锲而不舍 - Engrave without stopping = perseverance. (5) 闻鸡起舞 - Rise with rooster's crow to practice. (6) 悬梁刺股 - Hair tied to beam, awl piercing thigh to stay awake studying. (7) 凿壁偷光 - Drilled the wall to steal neighbor's light to study. (8) 业精于勤 - Mastery comes from diligence. (9) 厚积薄发 - Accumulate deeply, release sparingly. (10) 持之以恒 - Persevere consistently.",
      },
      {
        titleVi: "Top 10 Thành ngữ về Giao tiếp & Quan hệ",
        titleEn: "Top 10 Idioms about Communication & Relationships",
        bodyVi: "(1) 一见如故 (yī jiàn rú gù) - Vừa gặp đã như bạn cũ. (2) 心心相印 (xīn xīn xiāng yìn) - Lòng với lòng in nhau = đồng điệu. (3) 同舟共济 (tóng zhōu gòng jì) - Cùng thuyền cùng vượt = đoàn kết. (4) 患难与共 (huàn nàn yǔ gòng) - Cùng chia hoạn nạn. (5) 推心置腹 (tuī xīn zhì fù) - Đặt lòng vào bụng = chân thành. (6) 言而有信 (yán ér yǒu xìn) - Nói lời giữ lời. (7) 和气生财 (hé qì shēng cái) - Hòa khí sinh tài lộc. (8) 入乡随俗 (rù xiāng suí sú) - Nhập gia tùy tục. (9) 知己知彼 (zhī jǐ zhī bǐ) - Biết mình biết người. (10) 礼尚往来 (lǐ shàng wǎng lái) - Có qua có lại mới toại lòng nhau.",
        bodyEn: "(1) 一见如故 - Meet once, feel like old friends. (2) 心心相印 - Hearts mirror each other = in sync. (3) 同舟共济 - Same boat, cross together = unity. (4) 患难与共 - Share hardship together. (5) 推心置腹 - Place heart in belly = utter sincerity. (6) 言而有信 - Words backed by trust. (7) 和气生财 - Harmony brings wealth. (8) 入乡随俗 - When in Rome. (9) 知己知彼 - Know self and other. (10) 礼尚往来 - Courtesy demands reciprocity.",
      },
      {
        titleVi: "Top 10 Thành ngữ về Trí tuệ & Chiến lược",
        titleEn: "Top 10 Idioms about Wisdom & Strategy",
        bodyVi: "(1) 三思而行 (sān sī ér xíng) - Nghĩ 3 lần rồi hành. (2) 未雨绸缪 (wèi yǔ chóu móu) - Chưa mưa đã chuẩn bị che. (3) 居安思危 (jū ān sī wēi) - Ở yên nghĩ đến nguy. (4) 防微杜渐 (fáng wēi dù jiàn) - Ngăn từ nhỏ, chặn từ đầu. (5) 杀鸡儆猴 (shā jī jǐng hóu) - Giết gà dọa khỉ = răn đe. (6) 隔岸观火 (gé àn guān huǒ) - Đứng bờ bên xem lửa = ngồi xem đối thủ tự diệt. (7) 借刀杀人 (jiè dāo shā rén) - Mượn dao giết người = dùng tay người khác. (8) 围魏救赵 (wéi wèi jiù zhào) - Vây Ngụy cứu Triệu = đánh vào điểm yếu. (9) 声东击西 (shēng dōng jī xī) - Hô đông đánh tây = nghi binh. (10) 守株待兔 (shǒu zhū dài tù) - Ôm cây đợi thỏ = ngồi không hưởng (mỉa mai).",
        bodyEn: "(1) 三思而行 - Think 3 times before acting. (2) 未雨绸缪 - Prepare before the rain. (3) 居安思危 - In peace, think of danger. (4) 防微杜渐 - Stop small, block early. (5) 杀鸡儆猴 - Kill chicken to warn monkey. (6) 隔岸观火 - Watch fire from across the river. (7) 借刀杀人 - Borrow knife to kill. (8) 围魏救赵 - Besiege Wei to save Zhao = attack the weak point. (9) 声东击西 - Shout east, strike west. (10) 守株待兔 - Wait by stump for rabbit (mockingly: passive).",
      },
      {
        titleVi: "Cách dùng thành ngữ để gây ấn tượng",
        titleEn: "How to Use Chengyu to Impress",
        bodyVi: "Mẹo vàng của thầy Hải: (1) Học 1 thành ngữ mỗi ngày + dùng ngay trong ngày, (2) Dùng đúng ngữ cảnh, không gượng ép - chèn vào chỗ phù hợp, (3) Khi gặp người Trung lần đầu, dùng 一见如故 (yī jiàn rú gù) = họ sẽ rất cảm động, (4) Khi từ chối: '心有余而力不足' (lòng có thừa mà sức không đủ) = lịch sự gấp 10 lần 'không', (5) Khen sếp: '高瞻远瞻' (cái nhìn xa rộng), (6) Cảm ơn sâu: '感激不尽' (cảm kích vô cùng), (7) Khi sai: '我深感惭愧' (tôi cảm thấy hổ thẹn sâu sắc) = chân thành. Đừng học thuộc 100 thành ngữ rồi không dùng - học 10 và dùng thành thạo còn hơn.",
        bodyEn: "Teacher Hai's golden tip: (1) Learn 1 idiom/day + use it the same day, (2) Use in proper context - don't force, (3) Meeting Chinese person 1st time, use 一见如故 = they'll be touched, (4) Declining: '心有余而力不足' (heart willing but strength lacking) = 10x more polite than 'no', (5) Praise boss: '高瞻远瞻' (far-sighted vision), (6) Deep thanks: '感激不尽' (endless gratitude), (7) Apologizing: '我深感惭愧' (I feel deep shame) = sincere. Don't memorize 100 idioms unused - master 10 and use them well.",
      },
      {
        titleVi: "Top 10 Tục ngữ Dân gian (谚语)",
        titleEn: "Top 10 Folk Proverbs (Yanyu)",
        bodyVi: "Khác chengyu (4 chữ trang trọng), tục ngữ (谚语 yànyǔ) là lời dân gian dễ nhớ: (1) 不怕慢，只怕站 - Không sợ chậm, chỉ sợ đứng yên. (2) 活到老，学到老 - Sống đến già, học đến già. (3) 吃一堑，长一智 - Vấp 1 lần, khôn 1 lần. (4) 笨鸟先飞 - Chim vụng bay trước (cần cù bù thông minh). (5) 一分耕耘，一分收获 - Một phần cày cuốc, một phần thu hoạch. (6) 失败是成功之母 - Thất bại là mẹ thành công. (7) 远亲不如近邻 - Bà con xa không bằng láng giềng gần. (8) 良药苦口 - Thuốc đắng giã tật. (9) 金窝银窝不如自己的狗窝 - Tổ vàng tổ bạc không bằng tổ chó của mình. (10) 早起的鸟儿有虫吃 - Chim dậy sớm bắt được sâu.",
        bodyEn: "Unlike chengyu (4-char formal), proverbs (谚语 yànyǔ) are folksy and memorable: (1) 不怕慢，只怕站 - Don't fear slow, only fear standing still. (2) 活到老，学到老 - Live old, learn old. (3) 吃一堑，长一智 - Trip once, gain wisdom. (4) 笨鸟先飞 - The clumsy bird flies early (effort beats talent). (5) 一分耕耘，一分收获 - One bit of plowing, one bit of harvest. (6) 失败是成功之母 - Failure is the mother of success. (7) 远亲不如近邻 - Distant relatives less than close neighbors. (8) 良药苦口 - Good medicine tastes bitter. (9) 金窝银窝不如自己的狗窝 - No nest like your own. (10) 早起的鸟儿有虫吃 - Early bird catches the worm.",
      },
      {
        titleVi: "Yết Hậu Ngữ - Câu nói nửa chừng (歇后语)",
        titleEn: "Xiehouyu - Two-Part Allegorical Sayings",
        zh: "歇后语",
        pinyin: "xiēhòuyǔ",
        bodyVi: "Yết Hậu Ngữ (歇后语) là dạng câu đặc biệt: vế 1 nêu hình ảnh, vế 2 (thường ẩn đi để người nghe đoán) nêu ý nghĩa. Cực kỳ thông minh và hài hước - người Trung dùng để 'show off' trí tuệ. Ví dụ: (1) 哑巴吃饺子 — 心里有数 (Người câm ăn sủi cảo — trong lòng đếm được số). (2) 泥菩萨过河 — 自身难保 (Bồ tát đất qua sông — tự lo thân chưa xong). (3) 八仙过海 — 各显神通 (Bát Tiên qua biển — ai có tài nấy). (4) 黄鼠狼给鸡拜年 — 没安好心 (Chồn tới chúc Tết gà — không có ý tốt). (5) 兔子的尾巴 — 长不了 (Đuôi thỏ — dài không nổi = không lâu đâu). (6) 竹篮打水 — 一场空 (Lấy giỏ tre múc nước — uổng công). Học vài câu, dùng đúng lúc = người Trung sẽ thán phục bạn!",
        bodyEn: "Xiehouyu (歇后语) is a unique form: part 1 paints an image, part 2 (often left unsaid for the listener to guess) gives the meaning. Extremely clever and humorous - Chinese use them to 'show off' wit. Examples: (1) 哑巴吃饺子 — 心里有数 (A mute eats dumplings — counts them in his heart = knows what's up). (2) 泥菩萨过河 — 自身难保 (Clay Buddha crossing river — can't even save itself). (3) 八仙过海 — 各显神通 (Eight Immortals cross the sea — each shows their power). (4) 黄鼠狼给鸡拜年 — 没安好心 (Weasel pays New Year visit to chicken — no good intentions). (5) 兔子的尾巴 — 长不了 (Rabbit's tail — won't grow long = won't last). (6) 竹篮打水 — 一场空 (Catching water with a bamboo basket — total emptiness). Learn a few and use them right - Chinese will be impressed!",
      },
    ],
  },
];

// Lấy bài học theo ID từ pillars
const getLessonsByIds = (ids: string[]): ChineseConvLesson[] => {
  const all = chineseConversationalPillars.flatMap(p => p.lessons);
  return ids.map(id => all.find(l => l.id === id)).filter(Boolean) as ChineseConvLesson[];
};

const ChineseCultureHub = () => {
  const { t } = useLanguage();
  const cultureLessons = getLessonsByIds(CULTURE_LESSON_IDS);
  const totalDeepLessons = culturalThemes.reduce((sum, t) => sum + t.lessons.length, 0);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={t("Văn hóa Giao tiếp Trung Quốc | HaiEduTech", "Chinese Communication Culture | HaiEduTech")}
        description={t(
          "Khám phá văn hóa giao tiếp Trung Quốc: thể diện, quan hệ, lễ hội, triết học cổ điển và các bài học giao tiếp văn hóa.",
          "Explore Chinese communication culture: Mianzi, Guanxi, festivals, classical philosophy and cultural lessons."
        )}
      />
      <Navbar />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <Link to="/chinese" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4" />
          {t("Quay lại Tiếng Trung", "Back to Chinese")}
        </Link>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 mb-4">
            <Sparkles className="h-4 w-4 text-red-500" />
            <span className="text-xs font-medium text-red-700">
              {t("Văn hóa Giao tiếp", "Communication Culture")}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-3">
            {t("Văn hóa Giao tiếp ", "Chinese ")}
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 bg-clip-text text-transparent">
              {t("中国文化", "Communication 文化")}
            </span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
            {t(
              "Hiểu văn hóa = Nói tiếng Trung tự nhiên. Khám phá thể diện (面子), mối quan hệ (关系), lễ hội, triết học cổ điển và quy tắc ứng xử để giao tiếp hiệu quả với người Trung Quốc.",
              "Understanding culture = speaking Chinese naturally. Discover face (Mianzi), relationships (Guanxi), festivals, classical philosophy and etiquette to communicate effectively."
            )}
          </p>
          <div className="flex justify-center gap-4 mt-5 text-sm">
            <Badge className="bg-red-500/10 text-red-700 border-red-500/30">
              {culturalThemes.length} {t("Trụ cột", "Pillars")}
            </Badge>
            <Badge className="bg-orange-500/10 text-orange-700 border-orange-500/30">
              {totalDeepLessons} {t("Bài học chuyên sâu", "Deep-Dive Lessons")}
            </Badge>
            <Badge className="bg-amber-500/10 text-amber-700 border-amber-500/30">
              {cultureLessons.length} {t("Bài tương tác", "Interactive")}
            </Badge>
          </div>
        </motion.div>

        {/* 6 chủ đề văn hóa với hình minh họa + deep-dive */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-amber-500" />
            {t("6 Trụ cột Văn hóa Giao tiếp", "6 Pillars of Communication Culture")}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {culturalThemes.map((theme, i) => {
              const Icon = theme.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Card className="overflow-hidden h-full hover:shadow-xl transition-shadow border-2 hover:border-red-500/30">
                    {/* Hình minh họa */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                      <img
                        src={theme.image}
                        alt={theme.titleEn}
                        loading="lazy"
                        width={1024}
                        height={640}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className={`absolute top-4 left-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${theme.color} text-white shadow-lg`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="absolute bottom-3 left-4 right-4 text-xl font-bold text-white drop-shadow-lg">
                        {t(theme.titleVi, theme.titleEn)}
                      </h3>
                    </div>

                    <div className="p-6">
                      <p className="text-base text-muted-foreground mb-5 leading-[1.85]">
                        {t(theme.descVi, theme.descEn)}
                      </p>

                      {/* Quick tips */}
                      <div className="space-y-3 pb-5 mb-5 border-b">
                        {theme.tips.map((tip, j) => (
                          <div key={j} className="flex items-start gap-3 text-sm leading-[1.7]">
                            <span className="text-red-500 mt-1 text-base leading-none">•</span>
                            <span className="text-foreground/90">{t(tip.vi, tip.en)}</span>
                          </div>
                        ))}
                      </div>

                      {/* Deep-dive lessons accordion */}
                      <div className="flex items-center gap-2 mb-3">
                        <GraduationCap className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-semibold">
                          {theme.lessons.length} {t("bài học chuyên sâu", "deep-dive lessons")}
                        </span>
                      </div>
                      <Accordion type="single" collapsible className="w-full">
                        {theme.lessons.map((lesson, k) => (
                          <AccordionItem key={k} value={`item-${i}-${k}`} className="border-b-0 border-t">
                            <AccordionTrigger className="text-base font-semibold hover:no-underline py-4 text-left">
                              <div className="flex items-start gap-2 pr-2">
                                <span className="text-sm text-red-500 mt-0.5 font-bold">{k + 1}.</span>
                                <span className="flex-1 leading-snug">{t(lesson.titleVi, lesson.titleEn)}</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="pb-5 pt-1">
                              {lesson.zh && (
                                <div className="mb-3 text-base">
                                  <span className="font-bold text-red-600">{lesson.zh}</span>
                                  {lesson.pinyin && <span className="text-muted-foreground italic ml-2">({lesson.pinyin})</span>}
                                </div>
                              )}
                              <FormattedBody text={t(lesson.bodyVi, lesson.bodyEn)} />
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Bài học liên quan đến văn hóa từ Curriculum */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-red-500" />
            {t("Bài học Văn hóa Tương tác", "Interactive Culture Lessons")}
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            {t(
              "Các bài học tương tác (HSK 1-5) tập trung vào tình huống giao tiếp đậm chất văn hóa Trung Quốc.",
              "Interactive lessons (HSK 1-5) focused on culturally-rich communication situations."
            )}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cultureLessons.map((lesson, i) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={`/chinese/conversational/learn/${lesson.id}`}>
                  <Card className="p-4 hover:shadow-md transition-all hover:border-red-500/40 border-2 group cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                        {lesson.titleZh.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-semibold text-base group-hover:text-red-500 transition-colors">
                            {t(lesson.titleVi, lesson.title)}
                          </h3>
                          <Badge variant="outline" className="text-[10px]">HSK {lesson.hskLevel}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{lesson.titleZh}</p>
                        <p className="text-xs text-foreground/70 line-clamp-2">
                          {t(lesson.descriptionVi, lesson.description)}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center p-8 rounded-2xl bg-gradient-to-r from-red-500/10 via-orange-500/10 to-amber-500/10 border border-red-500/20">
          <h3 className="text-xl font-bold mb-2">
            {t("Sẵn sàng học sâu hơn?", "Ready to dive deeper?")}
          </h3>
          <p className="text-sm text-muted-foreground mb-5 max-w-xl mx-auto">
            {t(
              "Khám phá toàn bộ 38+ bài hội thoại tương tác, luyện AI Roleplay và bài tập văn hóa.",
              "Explore all 38+ interactive conversation lessons, AI Roleplay practice and culture exercises."
            )}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
              <Link to="/chinese/conversational/curriculum">
                <BookOpen className="h-4 w-4 mr-2" />
                {t("Chương trình Tương tác", "Interactive Curriculum")}
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/speaking-coach/chinese">
                {t("🎙️ AI Speaking Coach", "🎙️ AI Speaking Coach")}
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ChineseCultureHub;
