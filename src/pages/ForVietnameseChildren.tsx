/**
 * @file ForVietnameseChildren.tsx
 * @description Page expressing gratitude and providing donation info for Vietnamese children's charities.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Copy, ExternalLink, BookOpen, Gift, Sparkles, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import confetti from "canvas-confetti";


const funds = [
  {
    name: "Quỹ Bảo trợ trẻ em Việt Nam",
    nameEn: "Vietnam Fund for Children's Protection",
    desc: "Thuộc Bộ Lao động – Thương binh và Xã hội",
    descEn: "Under the Ministry of Labour, Invalids and Social Affairs",
    website: "https://quybaotrotreemvietnam.org.vn",
    accounts: [
      {
        bank: "Sở Giao dịch Ngân hàng Nhà nước Việt Nam",
        bankEn: "State Bank of Vietnam – Transaction Office",
        number: "001.0.00.0000355",
        holder: "Quỹ Bảo trợ trẻ em Việt Nam",
      },
    ],
  },
  {
    name: "Làng trẻ em SOS Việt Nam",
    nameEn: "SOS Children's Villages Vietnam",
    desc: "Tổ chức phi chính phủ quốc tế chăm sóc trẻ em mồ côi",
    descEn: "International NGO caring for orphaned children",
    website: "https://sosvietnam.org",
    accounts: [
      {
        bank: "Vietcombank – Sở Giao dịch",
        bankEn: "Vietcombank – Transaction Office",
        number: "001 100 0284 889",
        holder: "Làng trẻ em SOS Việt Nam",
      },
      {
        bank: "Techcombank – Chi nhánh Hoàng Quốc Việt",
        bankEn: "Techcombank – Hoang Quoc Viet Branch",
        number: "191 345 522 840 19",
        holder: "Làng trẻ em SOS Việt Nam",
      },
    ],
  },
  {
    name: "Bệnh viện Nhi Đồng 1",
    nameEn: "Children's Hospital 1 (Ho Chi Minh City)",
    desc: "Hỗ trợ viện phí cho bệnh nhi có hoàn cảnh khó khăn",
    descEn: "Supporting hospital fees for children from disadvantaged families",
    website: "https://nhidong.org.vn",
    accounts: [
      {
        bank: "Ngân hàng Công Thương (VietinBank) – Chi nhánh 10, Ngô Gia Tự",
        bankEn: "VietinBank – Branch 10, Ngo Gia Tu",
        number: "113000008065",
        holder: "Bệnh viện Nhi Đồng 1",
      },
    ],
  },
];

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success("Đã sao chép số tài khoản!");
};

const fireHeartsConfetti = () => {
  const defaults = { spread: 360, ticks: 100, gravity: 0.4, decay: 0.94, startVelocity: 20, zIndex: 9999 };
  confetti({ ...defaults, particleCount: 50, origin: { x: 0.3, y: 0.5 }, colors: ["#ff6b6b", "#ee5a24", "#f8a5c2", "#ff4757"] });
  confetti({ ...defaults, particleCount: 50, origin: { x: 0.7, y: 0.5 }, colors: ["#ff6b6b", "#ee5a24", "#f8a5c2", "#ff4757"] });
  setTimeout(() => {
    confetti({ ...defaults, particleCount: 30, origin: { x: 0.5, y: 0.3 }, colors: ["#ffd32a", "#ff6b6b", "#f8a5c2"] });
  }, 300);
};

const ForVietnameseChildren = () => {
  const { t } = useLanguage();
  const [showThanks, setShowThanks] = useState(false);

  const handleDonated = () => {
    setShowThanks(true);
    fireHeartsConfetti();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative py-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Heart className="w-5 h-5" />
              <span className="font-medium">{t("Vì Trẻ Em Việt Nam", "For Vietnamese Children")}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              {t("Cảm ơn bạn đã ghé thăm!", "Thank you for visiting!")}
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              {t(
                "Xin chân thành cảm ơn tất cả các bạn đã ghé thăm HaiEduTech và tham gia học tập cùng chúng tôi. Mỗi bài học các bạn hoàn thành là một bước tiến trên con đường tri thức.",
                "Thank you sincerely for visiting HaiEduTech and learning with us. Every lesson you complete is a step forward on your knowledge journey."
              )}
            </p>
          </motion.div>
        </div>
      </section>



      {/* Free Education Message */}
      <section className="py-3">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="glass-card p-8 md:p-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                {t("100% Miễn phí", "100% Free")}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t(
                  "Tất cả các bài học, chương trình luyện tập, công cụ AI và tài nguyên học tập có sẵn trên HaiEduTech đều hoàn toàn MIỄN PHÍ. Thầy Hải tin rằng giáo dục chất lượng nên được tiếp cận bởi mọi người, không phân biệt hoàn cảnh.",
                  "All lessons, practice programs, AI tools, and learning resources available on HaiEduTech are completely FREE. Teacher Hai believes that quality education should be accessible to everyone, regardless of circumstances."
                )}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t(
                  "Từ Tiếng Anh (IELTS, TOEIC, Cambridge), Tiếng Trung, Tiếng Phần Lan, Tiếng Việt cho đến Lập trình & AI — tất cả đều mở cho mọi người.",
                  "From English (IELTS, TOEIC, Cambridge), Chinese, Finnish, Vietnamese to Programming & AI — everything is open for everyone."
                )}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Donation Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent-foreground px-4 py-2 rounded-full mb-4">
              <Gift className="w-5 h-5 text-primary" />
              <span className="font-medium text-primary">{t("Đồng hành cùng trẻ em", "Walk alongside children")}</span>
            </div>
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              {t("Hướng tới Trẻ em Việt Nam", "For the Children of Vietnam")}
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {t(
                "Nếu bạn muốn đồng hành cùng thầy Hải hướng tới trẻ em Việt Nam, bạn có thể đóng góp qua các quỹ trẻ em uy tín dưới đây. Mọi đóng góp, dù nhỏ, đều tạo nên sự khác biệt.",
                "If you'd like to join Teacher Hai in supporting Vietnamese children, you can donate through the reputable children's funds below. Every contribution, no matter how small, makes a difference."
              )}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {funds.map((fund, idx) => (
              <motion.div
                key={fund.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-6 flex flex-col"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground text-sm leading-tight">
                      {t(fund.name, fund.nameEn)}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">{t(fund.desc, fund.descEn)}</p>
                  </div>
                </div>

                {fund.accounts.length > 0 ? (
                  <div className="space-y-3 flex-1">
                    {fund.accounts.map((acc) => (
                      <div key={acc.number} className="bg-secondary/50 rounded-lg p-3">
                        <p className="text-xs text-muted-foreground mb-1">{t(acc.bank, acc.bankEn)}</p>
                        <div className="flex items-center justify-between gap-2">
                          <code className="text-sm font-mono font-bold text-foreground">{acc.number}</code>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2"
                            onClick={() => copyToClipboard(acc.number)}
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{acc.holder}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex-1 flex items-center">
                    <p className="text-sm text-muted-foreground">
                      {t("Đóng góp trực tuyến qua website chính thức", "Donate online via the official website")}
                    </p>
                  </div>
                )}

                <a
                  href={fund.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <ExternalLink className="w-4 h-4" />
                  {t("Trang chính thức", "Official website")}
                </a>
              </motion.div>
            ))}
          </div>

          {/* Donated Button */}
          <div className="max-w-2xl mx-auto mt-10 text-center">
            <AnimatePresence mode="wait">
              {!showThanks ? (
                <motion.div key="btn" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
                  <Button
                    size="lg"
                    onClick={handleDonated}
                    className="gap-2 text-base px-8 py-6"
                  >
                    <Heart className="w-5 h-5" />
                    {t("Tôi đã đóng góp qua quỹ trẻ em ở trên", "I donated through above children's fund.")}
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="glass-card p-8"
                >
                  <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                    {t("Cảm ơn tấm lòng vàng của bạn! ❤️", "Thank you for your golden heart! ❤️")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(
                      "Sự đóng góp của bạn sẽ mang lại nụ cười cho trẻ em Việt Nam. Mỗi đồng bạn trao đi là một tia hy vọng cho tương lai của các em. Xin chân thành cảm ơn! 🇻🇳",
                      "Your contribution will bring smiles to Vietnamese children. Every amount you give is a ray of hope for their future. Thank you from the bottom of our hearts! 🇻🇳"
                    )}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
            <p className="text-lg text-muted-foreground italic leading-relaxed">
              {t(
                '"Giáo dục là vũ khí mạnh nhất mà bạn có thể dùng để thay đổi thế giới." — Nelson Mandela',
                '"Education is the most powerful weapon which you can use to change the world." — Nelson Mandela'
              )}
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ForVietnameseChildren;
