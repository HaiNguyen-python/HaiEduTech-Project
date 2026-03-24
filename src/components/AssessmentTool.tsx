import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, CheckCircle, ArrowRight, X, Send } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

/** Quiz question data */
interface QuizQ {
  questionVi: string;
  questionEn: string;
  options: string[];
  correct: number;
}

const englishQuestions: QuizQ[] = [
  { questionVi: "Choose the correct form: She ___ to the office every day.", questionEn: "Choose the correct form: She ___ to the office every day.", options: ["go", "goes", "going", "gone"], correct: 1 },
  { questionVi: "Which word is a synonym of 'significant'?", questionEn: "Which word is a synonym of 'significant'?", options: ["trivial", "notable", "ordinary", "minor"], correct: 1 },
  { questionVi: "Complete: If I ___ rich, I would travel the world.", questionEn: "Complete: If I ___ rich, I would travel the world.", options: ["am", "was", "were", "be"], correct: 2 },
  { questionVi: "Choose the correct spelling:", questionEn: "Choose the correct spelling:", options: ["accomodation", "accommodation", "acomodation", "acommodation"], correct: 1 },
  { questionVi: "Which sentence is grammatically correct?", questionEn: "Which sentence is grammatically correct?", options: ["He don't like coffee.", "He doesn't likes coffee.", "He doesn't like coffee.", "He not like coffee."], correct: 2 },
];

const logicQuestions: QuizQ[] = [
  { questionVi: "What is the output of: print(type([1,2,3]))", questionEn: "What is the output of: print(type([1,2,3]))", options: ["<class 'tuple'>", "<class 'list'>", "<class 'dict'>", "<class 'set'>"], correct: 1 },
  { questionVi: "In SQL, which clause filters grouped results?", questionEn: "In SQL, which clause filters grouped results?", options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"], correct: 1 },
  { questionVi: "What does ETL stand for?", questionEn: "What does ETL stand for?", options: ["Extract, Test, Load", "Extract, Transform, Load", "Export, Transform, Link", "Extract, Transfer, Log"], correct: 1 },
];

type Phase = "intro" | "english" | "logic" | "result" | "leadgen";

const AssessmentTool = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [engScore, setEngScore] = useState(0);
  const [logicScore, setLogicScore] = useState(0);
  const [email, setEmail] = useState("");

  const reset = () => {
    setPhase("intro");
    setCurrentQ(0);
    setEngScore(0);
    setLogicScore(0);
    setEmail("");
  };

  const handleOpen = () => { reset(); setOpen(true); };

  const handleAnswer = (selected: number) => {
    if (phase === "english") {
      if (selected === englishQuestions[currentQ].correct) setEngScore((s) => s + 1);
      if (currentQ + 1 < englishQuestions.length) {
        setCurrentQ((q) => q + 1);
      } else {
        setCurrentQ(0);
        setPhase("logic");
      }
    } else if (phase === "logic") {
      if (selected === logicQuestions[currentQ].correct) setLogicScore((s) => s + 1);
      if (currentQ + 1 < logicQuestions.length) {
        setCurrentQ((q) => q + 1);
      } else {
        setPhase("result");
      }
    }
  };

  const getLevel = () => {
    const total = engScore + logicScore;
    if (total >= 7) return { levelVi: "Upper-Intermediate", levelEn: "Upper-Intermediate", monthsVi: "2 tháng", monthsEn: "2 months" };
    if (total >= 5) return { levelVi: "Intermediate", levelEn: "Intermediate", monthsVi: "3 tháng", monthsEn: "3 months" };
    if (total >= 3) return { levelVi: "Pre-Intermediate", levelEn: "Pre-Intermediate", monthsVi: "4 tháng", monthsEn: "4 months" };
    return { levelVi: "Elementary", levelEn: "Elementary", monthsVi: "6 tháng", monthsEn: "6 months" };
  };

  const handleLeadSubmit = () => {
    if (!email.trim()) { toast.error(t("Vui lòng nhập email", "Please enter your email")); return; }
    toast.success(t("Đã gửi! Chúng tôi sẽ liên hệ sớm.", "Submitted! We'll contact you soon."));
    setPhase("leadgen");
  };

  const questions = phase === "english" ? englishQuestions : logicQuestions;
  const totalQ = phase === "english" ? englishQuestions.length : logicQuestions.length;
  const progress = phase === "english"
    ? ((currentQ + 1) / englishQuestions.length) * 50
    : 50 + ((currentQ + 1) / logicQuestions.length) * 50;

  return (
    <>
      {/* CTA Section */}
      <section className="relative py-20 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="container relative mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-emerald-500 shadow-lg shadow-primary/20">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h2 className="mb-4 font-display text-2xl font-bold sm:text-3xl md:text-4xl">
              {t("Đánh Giá Năng Lực ", "Free Skill ")}
              <span className="text-gradient">{t("Miễn Phí", "Assessment")}</span>
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
              {t(
                "Làm bài kiểm tra nhanh 3 phút để biết trình độ hiện tại và nhận lộ trình học tập cá nhân hóa",
                "Take a quick 3-minute test to discover your current level and receive a personalized learning roadmap"
              )}
            </p>
            <Button
              onClick={handleOpen}
              size="lg"
              className="gap-2 rounded-xl bg-gradient-to-r from-primary to-emerald-500 px-8 py-6 text-base font-semibold shadow-lg shadow-primary/20 transition-all hover:brightness-110"
            >
              <Zap className="h-5 w-5" />
              {t("Thử thách năng lực ngay", "Take the Challenge Now")}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Quiz Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              {phase === "intro" && t("Đánh giá năng lực", "Skill Assessment")}
              {phase === "english" && t("Phần 1: Tiếng Anh", "Part 1: English")}
              {phase === "logic" && t("Phần 2: Data & Logic", "Part 2: Data & Logic")}
              {phase === "result" && t("Kết quả của bạn", "Your Results")}
              {phase === "leadgen" && t("Cảm ơn bạn!", "Thank You!")}
            </DialogTitle>
          </DialogHeader>

          {/* Progress bar (during quiz) */}
          {(phase === "english" || phase === "logic") && (
            <Progress value={progress} className="mb-4 h-2" />
          )}

          <AnimatePresence mode="wait">
            {/* Intro */}
            {phase === "intro" && (
              <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4 py-2">
                <p className="text-sm leading-7 text-muted-foreground">
                  {t(
                    "Bài kiểm tra gồm 2 phần: 5 câu Tiếng Anh và 3 câu Logic/Data. Hoàn thành trong khoảng 3 phút.",
                    "The test consists of 2 parts: 5 English questions and 3 Logic/Data questions. Takes about 3 minutes."
                  )}
                </p>
                <Button onClick={() => { setPhase("english"); setCurrentQ(0); }} className="w-full gap-2">
                  {t("Bắt đầu", "Start")} <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            )}

            {/* Quiz questions */}
            {(phase === "english" || phase === "logic") && (
              <motion.div key={`${phase}-${currentQ}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4 py-2">
                <p className="text-xs text-muted-foreground">
                  {t("Câu", "Question")} {currentQ + 1} / {totalQ}
                </p>
                <p className="font-medium text-foreground">
                  {t(questions[currentQ].questionVi, questions[currentQ].questionEn)}
                </p>
                <div className="grid gap-2">
                  {questions[currentQ].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      className="w-full rounded-lg border border-border px-4 py-3 text-left text-sm transition-all hover:border-primary/50 hover:bg-primary/5"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Results */}
            {phase === "result" && (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-5 py-2">
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 text-center">
                  <CheckCircle className="mx-auto mb-3 h-10 w-10 text-primary" />
                  <div className="mb-1 text-sm text-muted-foreground">
                    {t("Trình độ hiện tại", "Current Level")}
                  </div>
                  <div className="font-display text-2xl font-bold text-primary">
                    {t(getLevel().levelVi, getLevel().levelEn)}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t("Tiếng Anh", "English")}: {engScore}/{englishQuestions.length} • {t("Logic", "Logic")}: {logicScore}/{logicQuestions.length}
                  </p>
                </div>

                <p className="text-center text-sm leading-relaxed text-foreground">
                  {t(
                    `Hệ thống RL gợi ý lộ trình ${getLevel().monthsVi} để đạt Target của bạn.`,
                    `Our RL Engine recommends a ${getLevel().monthsEn} roadmap to reach your Target.`
                  )}
                </p>

                {/* Lead gen form */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-foreground">
                    {t("Nhận lộ trình chi tiết qua email:", "Get your detailed roadmap via email:")}
                  </p>
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder={t("Email hoặc SĐT", "Email or Phone")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleLeadSubmit} className="gap-1.5 shrink-0">
                      <Send className="h-4 w-4" />
                      {t("Gửi", "Send")}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Thank you */}
            {phase === "leadgen" && (
              <motion.div key="thanks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-6 text-center">
                <CheckCircle className="mx-auto mb-4 h-12 w-12 text-primary" />
                <p className="text-sm text-muted-foreground">
                  {t(
                    "Chúng tôi sẽ gửi lộ trình chi tiết trong 24 giờ.",
                    "We'll send your detailed roadmap within 24 hours."
                  )}
                </p>
                <Button variant="outline" onClick={() => setOpen(false)} className="mt-4">
                  {t("Đóng", "Close")}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AssessmentTool;
