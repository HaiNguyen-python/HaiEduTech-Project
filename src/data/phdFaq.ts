/**
 * @file phdFaq.ts
 * @description 10 most-asked PhD FAQs (Vietnamese + English).
 */

export interface PhdFaqItem {
  id: string;
  questionVi: string;
  questionEn: string;
  answerVi: string;
  answerEn: string;
}

export const PHD_FAQ: PhdFaqItem[] = [
  {
    id: "stipend",
    questionVi: "Lương PhD có đủ sống không?",
    questionEn: "Can a PhD stipend cover living costs?",
    answerVi:
      "Tùy quốc gia. Stipend EU/Bắc Âu (€1.800-2.500/tháng) và Singapore (S$3.000-5.000) sống thoải mái. Mỹ (US$25k-40k/năm) đủ ở các thành phố vừa, hơi chật ở Bay Area/Boston. Nhật MEXT ¥143k–¥147k/tháng đủ ở Tokyo nếu ở dorm. Châu Á – Đông Nam Á dư dả; UK London hơi căng.",
    answerEn:
      "Depends on country. EU/Nordic (€1,800-2,500/mo) and Singapore (S$3,000-5,000) live comfortably. US $25k-40k/yr is fine in mid-cost cities, tight in Bay Area/Boston. Japan MEXT ¥143k–¥147k/mo is enough in Tokyo with dorms. East/SE Asia stipends go far; UK London is tight.",
  },
  {
    id: "quit-job",
    questionVi: "Có nên bỏ việc full-time đi PhD?",
    questionEn: "Should I quit my full-time job to do a PhD?",
    answerVi:
      "Chỉ nên bỏ khi: (1) em chắc chắn muốn đi sâu nghiên cứu hoặc nghề academia/R&D, (2) đã có funding 4 năm, (3) chấp nhận 'mất' US$200k-400k chi phí cơ hội. Nếu chỉ muốn ‘nâng cao kiến thức’ → học Master + tự học, đừng làm PhD.",
    answerEn:
      "Only quit if: (1) you are sure you want deep research or an academic/R&D career, (2) you have 4-year funding secured, (3) you accept the US$200k–400k opportunity cost. If you only want 'more knowledge', do a Master + self-study instead of a PhD.",
  },
  {
    id: "phd-vs-master",
    questionVi: "PhD và Master khác nhau ra sao?",
    questionEn: "PhD vs Master — what is the real difference?",
    answerVi:
      "Master = học sâu hơn một chủ đề, 1–2 năm, học là chính, có thể có thesis nhỏ. PhD = tạo ra tri thức MỚI, 3–6 năm, nghiên cứu là chính, kết thúc bằng luận án + publications. PhD đào tạo em thành một researcher độc lập, không phải 'học sinh giỏi hơn'.",
    answerEn:
      "Master = deeper study of a topic, 1–2 years, coursework-heavy, possibly a small thesis. PhD = produce NEW knowledge, 3–6 years, research-heavy, ends with a dissertation + publications. A PhD trains you to be an independent researcher, not just a 'better student'.",
  },
  {
    id: "gre",
    questionVi: "Có cần thi GRE không?",
    questionEn: "Do I need to take the GRE?",
    answerVi:
      "Ngày càng nhiều trường Mỹ bỏ GRE sau COVID, nhất là CS/Engineering. Vẫn cần cho nhiều ngành Sci/SocSci ở top US. EU/UK/Úc/Singapore/Hàn/Nhật phần lớn KHÔNG yêu cầu. Check website từng program — 'GRE optional' nghĩa là nộp điểm cao sẽ có lợi.",
    answerEn:
      "Many US programs dropped GRE after COVID, especially CS/Engineering. Still required for many Science/SocSci programs at top US schools. Most EU/UK/AU/Singapore/Korea/Japan programs do NOT need it. Check each program — 'GRE optional' means a high score still helps.",
  },
  {
    id: "duration",
    questionVi: "PhD bao lâu thì xong?",
    questionEn: "How long does a PhD take?",
    answerVi:
      "UK/EU/Úc/Singapore: 3–4 năm (đã có Master). Mỹ: 5–6 năm (kèm 2 năm coursework, không cần Master). Nhật/Hàn: 3 năm (sau Master). Trung bình thực tế hay kéo dài thêm 6–12 tháng để hoàn thiện thesis.",
    answerEn:
      "UK/EU/AU/Singapore: 3–4 years (requires Master). US: 5–6 years (includes ~2 years coursework, no Master needed). Japan/Korea: 3 years (after Master). In practice add 6–12 months for thesis finalization.",
  },
  {
    id: "self-funded",
    questionVi: "Self-funded vs sponsored PhD — chọn cái nào?",
    questionEn: "Self-funded vs sponsored PhD — which to choose?",
    answerVi:
      "LUÔN ưu tiên sponsored (full scholarship, RA/TA). Tự bỏ tiền PhD ở nước ngoài (~US$30k-60k/năm × 4) thường là quyết định tài chính tệ trừ khi gia đình giàu hoặc đã có thu nhập thụ động. Nếu chưa có funding, hoãn 1 năm để apply lại còn hơn nợ.",
    answerEn:
      "ALWAYS prioritize sponsored offers (full scholarship, RA/TA). Self-funding abroad (~US$30k-60k/yr × 4) is usually a bad financial decision unless family is wealthy or you have passive income. If no funding, defer a year and re-apply rather than going into debt.",
  },
  {
    id: "change-supervisor",
    questionVi: "Đổi supervisor giữa chừng có được không?",
    questionEn: "Can I change supervisor mid-PhD?",
    answerVi:
      "Được, nhưng phức tạp. EU/UK dễ hơn (program admin sẽ giúp). Mỹ khó hơn nếu funding đến từ grant của supervisor cũ. Quy tắc: nói chuyện thẳng với DGS/program director trước, đừng để xung đột rò rỉ. Đổi sớm tốt hơn đổi sau năm 3.",
    answerEn:
      "Yes, but messy. Easier in EU/UK (program admin helps). Harder in US if funding comes from your supervisor's grant. Rule: talk to your DGS/program director first; don't let conflict leak. Switching early is far better than switching after year 3.",
  },
  {
    id: "after-phd",
    questionVi: "PhD xong làm gì ngoài academia?",
    questionEn: "What can I do with a PhD besides academia?",
    answerVi:
      "Industry R&D (Google, OpenAI, Pfizer, McKinsey…), data scientist senior, quant finance, consulting, policy, deep-tech founder, big-tech research scientist. Nhiều ngành (ML, biotech, climate) lương industry > academia. Academia chỉ là một trong nhiều con đường.",
    answerEn:
      "Industry R&D (Google, OpenAI, Pfizer, McKinsey…), senior data scientist, quant finance, consulting, policy, deep-tech founder, big-tech research scientist. In many fields (ML, biotech, climate) industry pay > academia. Academia is just one of many tracks.",
  },
  {
    id: "too-old",
    questionVi: "Bao nhiêu tuổi là quá muộn để làm PhD?",
    questionEn: "Am I too old to start a PhD?",
    answerVi:
      "Không có 'quá muộn'. EU/UK/Úc thường thấy người 30-40 tuổi bắt đầu PhD. Mỹ trẻ hơn (22-28) nhưng vẫn nhận. Tuổi không phải tiêu chí xét tuyển — research fit + funding + động lực rõ ràng quan trọng hơn nhiều.",
    answerEn:
      "There is no 'too old'. EU/UK/AU regularly admit PhDs aged 30-40. US programs skew younger (22-28) but still accept. Age is not an admission criterion — research fit + funding + clear motivation matter far more.",
  },
  {
    id: "publications",
    questionVi: "Cần publication trước khi apply không?",
    questionEn: "Do I need publications before applying?",
    answerVi:
      "Không bắt buộc với ứng viên fresh Master, nhưng có 1 paper (workshop, conference, hoặc preprint arXiv) tăng tỉ lệ đậu top program rất nhiều. Nếu đã đi làm 3+ năm thì gần như BẮT BUỘC phải có bằng chứng nghiên cứu (paper, patent, technical report).",
    answerEn:
      "Not required for fresh Master applicants, but 1 paper (workshop, conference, or arXiv preprint) significantly boosts admission to top programs. If you have 3+ years of work experience, some form of research evidence (paper, patent, technical report) is almost MANDATORY.",
  },
];
