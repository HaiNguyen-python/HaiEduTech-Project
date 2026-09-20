/**
 * @file searchIndex.ts
 * @description Full route catalogue + diacritic-insensitive matching/ranking for
 * the global Ctrl+K search palette.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */

export type SearchGroupId =
  | "recent"
  | "quick"
  | "abroad"
  | "english"
  | "chinese"
  | "vietnamese"
  | "nordic"
  | "programming"
  | "exams"
  | "vocab"
  | "life"
  | "me"
  | "admin"
  | "lesson";

export interface SearchEntry {
  to: string;
  vi: string;
  en: string;
  group: SearchGroupId;
  /** Extra search terms (accent-free forms, abbreviations, synonyms). */
  keywords?: string;
  /** Only visible to teachers/admins. */
  adminOnly?: boolean;
}

export const GROUP_LABELS: Record<SearchGroupId, { vi: string; en: string }> = {
  recent: { vi: "🕘 Vừa xem", en: "🕘 Recently viewed" },
  quick: { vi: "⚡ Truy cập nhanh", en: "⚡ Quick access" },
  abroad: { vi: "🌍 Du học", en: "🌍 Study Abroad" },
  english: { vi: "🇬🇧 Tiếng Anh", en: "🇬🇧 English" },
  chinese: { vi: "🇨🇳 Tiếng Trung & Nhật", en: "🇨🇳 Chinese & Japanese" },
  vietnamese: { vi: "🇻🇳 Tiếng Việt", en: "🇻🇳 Vietnamese" },
  nordic: { vi: "🇫🇮 Phần Lan & Thụy Điển", en: "🇫🇮 Finnish & Swedish" },
  programming: { vi: "💻 Lập trình & AI", en: "💻 Programming & AI" },
  exams: { vi: "🎯 Luyện thi", en: "🎯 Test prep" },
  vocab: { vi: "📚 Từ vựng & Game", en: "📚 Vocabulary & Games" },
  life: { vi: "🌱 Lifestyle & Cộng đồng", en: "🌱 Lifestyle & Community" },
  me: { vi: "👤 Cá nhân", en: "👤 My space" },
  admin: { vi: "🛠️ Quản trị", en: "🛠️ Admin" },
  lesson: { vi: "📖 Bài học", en: "📖 Lessons" },
};

export const GROUP_ORDER: SearchGroupId[] = [
  "quick",
  "abroad",
  "english",
  "chinese",
  "vietnamese",
  "nordic",
  "programming",
  "exams",
  "vocab",
  "life",
  "me",
  "admin",
  "lesson",
];

export const SEARCH_ENTRIES: SearchEntry[] = [
  // ---------- Study Abroad ----------
  { to: "/study-abroad", vi: "Cổng du học", en: "Study Abroad Hub", group: "abroad", keywords: "du hoc study abroad portal cong" },
  { to: "/study-abroad/documents", vi: "Hồ sơ của tôi (Vault)", en: "My Documents Vault", group: "abroad", keywords: "ho so documents vault transcript bang diem" },
  { to: "/study-abroad/motivation-letter", vi: "Motivation Letter", en: "Motivation Letter Guide", group: "abroad", keywords: "motivation letter ml thu dong luc" },
  { to: "/study-abroad/cv", vi: "CV & Resume", en: "CV & Resume Builder", group: "abroad", keywords: "cv resume so yeu ly lich" },
  { to: "/study-abroad/phd", vi: "Lộ trình PhD", en: "PhD Pathway", group: "abroad", keywords: "phd tien si research proposal cold email" },
  { to: "/study-abroad/sat", vi: "SAT cho du học", en: "SAT for Study Abroad", group: "abroad", keywords: "sat du hoc" },
  { to: "/study-abroad/mentor-hub", vi: "Mentor Hub", en: "Mentor Hub", group: "abroad", keywords: "mentor co van" },
  { to: "/study-abroad/checklist", vi: "Checklist hồ sơ", en: "Application Checklist", group: "abroad", keywords: "checklist ho so kiem tra" },
  { to: "/study-abroad/shortlister", vi: "Chọn trường (Shortlist)", en: "University Shortlister", group: "abroad", keywords: "shortlist chon truong university" },
  { to: "/study-abroad/interview-prep", vi: "Luyện phỏng vấn du học", en: "Interview Prep", group: "abroad", keywords: "interview phong van" },
  { to: "/study-abroad/cost-calculator", vi: "Tính chi phí du học", en: "Cost Calculator", group: "abroad", keywords: "chi phi cost hoc phi tinh toan" },
  { to: "/study-abroad/journey", vi: "Hành trình du học", en: "Study Abroad Journey", group: "abroad", keywords: "hanh trinh journey timeline" },
  { to: "/global-scholarship", vi: "Tư vấn học bổng cùng Mr. Hai", en: "Scholarship Consulting with Mr. Hai", group: "abroad", keywords: "hoc bong scholarship advisor mr hai" },

  // ---------- English ----------
  { to: "/english", vi: "Học Tiếng Anh", en: "Learn English", group: "english", keywords: "tieng anh english hub" },
  { to: "/english/grammar", vi: "Ngữ pháp tiếng Anh", en: "English Grammar", group: "english", keywords: "ngu phap grammar npa" },
  { to: "/english/pronunciation", vi: "Phát âm & IPA", en: "Pronunciation & IPA", group: "english", keywords: "phat am ipa pronunciation phien am" },
  { to: "/english/essentials", vi: "Tiếng Anh nền tảng", en: "English Essentials", group: "english", keywords: "nen tang essentials co ban" },
  { to: "/english/business", vi: "Business English", en: "Business English", group: "english", keywords: "business english cong so thuong mai" },
  { to: "/english/academic", vi: "Academic English", en: "Academic English", group: "english", keywords: "academic hoc thuat" },
  { to: "/english/conversational/curriculum", vi: "Hội thoại tiếng Anh", en: "Conversational English", group: "english", keywords: "hoi thoai conversation noi" },
  { to: "/english/idioms", vi: "Thành ngữ tiếng Anh", en: "English Idioms", group: "english", keywords: "thanh ngu idiom" },
  { to: "/english/fun-facts", vi: "Fun Facts tiếng Anh", en: "English Fun Facts", group: "english", keywords: "fun facts thu vi" },
  { to: "/specialized-language", vi: "Tiếng Anh chuyên ngành", en: "Specialized Language", group: "english", keywords: "chuyen nganh specialized esp" },
  { to: "/presentation-studio", vi: "Luyện thuyết trình", en: "Presentation Studio", group: "english", keywords: "thuyet trinh presentation" },
  { to: "/speaking-coach/english", vi: "Speaking Coach tiếng Anh", en: "English Speaking Coach", group: "english", keywords: "speaking coach luyen noi" },
  { to: "/songs/english", vi: "Học qua bài hát (Anh)", en: "Learn through songs (English)", group: "english", keywords: "bai hat song nhac" },

  // ---------- Chinese & Japanese ----------
  { to: "/chinese", vi: "Học Tiếng Trung", en: "Learn Chinese", group: "chinese", keywords: "tieng trung chinese hub" },
  { to: "/chinese/hsk-guide", vi: "Hướng dẫn HSK", en: "HSK Guide", group: "chinese", keywords: "hsk guide huong dan" },
  { to: "/chinese/hsk-grammar", vi: "Ngữ pháp HSK", en: "HSK Grammar", group: "chinese", keywords: "hsk ngu phap grammar" },
  { to: "/chinese/hsk/test", vi: "Thi thử HSK", en: "HSK Mock Tests", group: "chinese", keywords: "hsk test thi thu de" },
  { to: "/chinese/hskk", vi: "HSKK - Nói tiếng Trung", en: "HSKK Speaking", group: "chinese", keywords: "hskk noi speaking" },
  { to: "/chinese/reading", vi: "Đọc hiểu tiếng Trung", en: "Chinese Reading", group: "chinese", keywords: "doc hieu reading bai doc" },
  { to: "/chinese/listening", vi: "Nghe tiếng Trung", en: "Chinese Listening", group: "chinese", keywords: "nghe listening" },
  { to: "/chinese/conversational/curriculum", vi: "Hội thoại tiếng Trung", en: "Conversational Chinese", group: "chinese", keywords: "hoi thoai conversation" },
  { to: "/chinese/pronunciation", vi: "Phát âm tiếng Trung", en: "Chinese Pronunciation", group: "chinese", keywords: "phat am pinyin" },
  { to: "/chinese/tone-drill", vi: "Luyện thanh điệu", en: "Tone Drill", group: "chinese", keywords: "thanh dieu tone" },
  { to: "/chinese/strokes", vi: "Luyện viết chữ Hán", en: "Hanzi Strokes", group: "chinese", keywords: "chu han stroke viet hanzi" },
  { to: "/chinese/culture", vi: "Văn hóa Trung Hoa", en: "Chinese Culture", group: "chinese", keywords: "van hoa culture" },
  { to: "/speaking-coach/chinese", vi: "Speaking Coach tiếng Trung", en: "Chinese Speaking Coach", group: "chinese", keywords: "speaking coach noi" },
  { to: "/japanese", vi: "Học Tiếng Nhật", en: "Learn Japanese", group: "chinese", keywords: "tieng nhat japanese jlpt kanji" },
  { to: "/songs/chinese", vi: "Học qua bài hát (Trung)", en: "Learn through songs (Chinese)", group: "chinese", keywords: "bai hat song" },

  // ---------- Vietnamese ----------
  { to: "/learn-vietnamese", vi: "Học Tiếng Việt", en: "Learn Vietnamese", group: "vietnamese", keywords: "tieng viet vietnamese hub" },
  { to: "/learn-vietnamese/vocabulary", vi: "Từ vựng tiếng Việt", en: "Vietnamese Vocabulary", group: "vietnamese", keywords: "tu vung vocabulary" },
  { to: "/learn-vietnamese/alphabet", vi: "Bảng chữ cái", en: "Vietnamese Alphabet", group: "vietnamese", keywords: "bang chu cai alphabet" },
  { to: "/learn-vietnamese/dictation", vi: "Chính tả - Nghe viết", en: "Vietnamese Dictation", group: "vietnamese", keywords: "chinh ta dictation nghe viet" },
  { to: "/learn-vietnamese/poetry", vi: "Thơ Việt Nam", en: "Vietnamese Poetry", group: "vietnamese", keywords: "tho poetry" },
  { to: "/learn-vietnamese/folklore", vi: "Truyện dân gian", en: "Vietnamese Folklore", group: "vietnamese", keywords: "truyen dan gian folklore co tich" },
  { to: "/learn-vietnamese/culture", vi: "Văn hóa Việt Nam", en: "Vietnamese Culture", group: "vietnamese", keywords: "van hoa culture" },
  { to: "/learn-vietnamese/cuisine", vi: "Ẩm thực Việt Nam", en: "Vietnamese Cuisine", group: "vietnamese", keywords: "am thuc cuisine mon an" },
  { to: "/learn-vietnamese/regions", vi: "Các vùng miền", en: "Regions of Vietnam", group: "vietnamese", keywords: "vung mien regions" },
  { to: "/learn-vietnamese/films", vi: "Phim Việt Nam", en: "Vietnamese Films", group: "vietnamese", keywords: "phim film movie" },
  { to: "/learn-vietnamese/holidays", vi: "Lễ hội & ngày lễ", en: "Holidays & Festivals", group: "vietnamese", keywords: "le hoi holiday tet" },
  { to: "/learn-vietnamese/phrasebook", vi: "Sổ tay câu giao tiếp", en: "Vietnamese Phrasebook", group: "vietnamese", keywords: "phrasebook cau giao tiep" },
  { to: "/learn-vietnamese/daily", vi: "Tiếng Việt mỗi ngày", en: "Daily Vietnamese", group: "vietnamese", keywords: "moi ngay daily" },
  { to: "/learn-vietnamese/national-anthem", vi: "Quốc ca Việt Nam", en: "Vietnamese National Anthem", group: "vietnamese", keywords: "quoc ca anthem" },
  { to: "/learn-vietnamese/kids-overseas", vi: "Tiếng Việt cho trẻ ở nước ngoài", en: "Vietnamese for kids overseas", group: "vietnamese", keywords: "tre em kids overseas viet kieu" },
  { to: "/learn-vietnamese/for-foreigners", vi: "Tiếng Việt cho người nước ngoài (VFF)", en: "Vietnamese for Foreigners", group: "vietnamese", keywords: "vff nguoi nuoc ngoai foreigners" },
  { to: "/learn-vietnamese/for-foreigners/placement", vi: "VFF - Kiểm tra trình độ", en: "VFF Placement Test", group: "vietnamese", keywords: "vff placement kiem tra trinh do" },
  { to: "/learn-vietnamese/for-foreigners/a1", vi: "VFF - Trình độ A1", en: "VFF Level A1", group: "vietnamese", keywords: "vff a1" },
  { to: "/learn-vietnamese/for-foreigners/a2", vi: "VFF - Trình độ A2", en: "VFF Level A2", group: "vietnamese", keywords: "vff a2" },
  { to: "/learn-vietnamese/for-foreigners/b1", vi: "VFF - Trình độ B1", en: "VFF Level B1", group: "vietnamese", keywords: "vff b1" },
  { to: "/learn-vietnamese/for-foreigners/lab/pronunciation", vi: "VFF - Lab phát âm", en: "VFF Pronunciation Lab", group: "vietnamese", keywords: "vff lab phat am" },
  { to: "/learn-vietnamese/for-foreigners/lab/grammar", vi: "VFF - Lab ngữ pháp", en: "VFF Grammar Lab", group: "vietnamese", keywords: "vff lab ngu phap" },
  { to: "/learn-vietnamese/for-foreigners/lab/listening", vi: "VFF - Lab nghe", en: "VFF Listening Lab", group: "vietnamese", keywords: "vff lab nghe" },
  { to: "/learn-vietnamese/for-foreigners/lab/reading", vi: "VFF - Lab đọc", en: "VFF Reading Lab", group: "vietnamese", keywords: "vff lab doc" },
  { to: "/learn-vietnamese/for-foreigners/lab/writing", vi: "VFF - Lab viết", en: "VFF Writing Lab", group: "vietnamese", keywords: "vff lab viet" },
  { to: "/learn-vietnamese/for-foreigners/lab/roleplay", vi: "VFF - Nhập vai", en: "VFF Roleplay", group: "vietnamese", keywords: "vff roleplay nhap vai" },
  { to: "/learn-vietnamese/for-foreigners/lab/roleplay-ai", vi: "VFF - Nhập vai với AI", en: "VFF AI Roleplay", group: "vietnamese", keywords: "vff roleplay ai" },
  { to: "/learn-vietnamese/for-foreigners/lab/flashcards", vi: "VFF - Flashcards", en: "VFF Flashcards", group: "vietnamese", keywords: "vff flashcard the tu" },
  { to: "/learn-vietnamese/for-foreigners/lab/culture", vi: "VFF - Văn hóa", en: "VFF Culture Hub", group: "vietnamese", keywords: "vff van hoa culture" },
  { to: "/learn-vietnamese/for-foreigners/lab/video", vi: "VFF - Video Lounge", en: "VFF Video Lounge", group: "vietnamese", keywords: "vff video" },
  { to: "/learn-vietnamese/for-foreigners/analytics", vi: "VFF - Phân tích tiến độ", en: "VFF Analytics", group: "vietnamese", keywords: "vff analytics tien do" },
  { to: "/learn-vietnamese/for-foreigners/certificate", vi: "VFF - Chứng chỉ", en: "VFF Certificate", group: "vietnamese", keywords: "vff certificate chung chi" },
  { to: "/songs/vietnamese", vi: "Học qua bài hát (Việt)", en: "Learn through songs (Vietnamese)", group: "vietnamese", keywords: "bai hat song" },
  { to: "/speaking-coach/vietnamese", vi: "Speaking Coach tiếng Việt", en: "Vietnamese Speaking Coach", group: "vietnamese", keywords: "speaking coach noi" },

  // ---------- Finnish & Swedish ----------
  { to: "/finnish", vi: "Học Tiếng Phần Lan", en: "Learn Finnish", group: "nordic", keywords: "phan lan finnish suomi" },
  { to: "/finnish/beginner", vi: "Phần Lan cho người mới", en: "Finnish for Beginners", group: "nordic", keywords: "phan lan beginner co ban" },
  { to: "/finnish/yki-dashboard", vi: "YKI A2 Dashboard", en: "YKI A2 Dashboard", group: "nordic", keywords: "yki a2 dashboard" },
  { to: "/finnish/yki-b1", vi: "YKI B1", en: "YKI B1", group: "nordic", keywords: "yki b1" },
  { to: "/finnish/life-in-finland", vi: "Cuộc sống ở Phần Lan", en: "Life in Finland", group: "nordic", keywords: "cuoc song life finland" },
  { to: "/finnish-vocabulary", vi: "Từ vựng tiếng Phần Lan", en: "Finnish Vocabulary", group: "nordic", keywords: "tu vung vocabulary word quest" },
  { to: "/speaking-coach/finnish", vi: "Speaking Coach tiếng Phần Lan", en: "Finnish Speaking Coach", group: "nordic", keywords: "speaking coach noi" },
  { to: "/swedish", vi: "Học Tiếng Thụy Điển", en: "Learn Swedish", group: "nordic", keywords: "thuy dien swedish svenska" },
  { to: "/swedish/beginner", vi: "Thụy Điển cho người mới", en: "Swedish for Beginners", group: "nordic", keywords: "thuy dien beginner" },
  { to: "/swedish/curriculum", vi: "Chương trình tiếng Thụy Điển", en: "Swedish Curriculum", group: "nordic", keywords: "chuong trinh curriculum" },
  { to: "/swedish/vocabulary", vi: "Từ vựng Thụy Điển", en: "Swedish Vocabulary", group: "nordic", keywords: "tu vung vocabulary" },
  { to: "/swedish/speaking", vi: "Nói tiếng Thụy Điển", en: "Swedish Speaking", group: "nordic", keywords: "noi speaking" },
  { to: "/swedish/listening", vi: "Nghe tiếng Thụy Điển", en: "Swedish Listening", group: "nordic", keywords: "nghe listening" },
  { to: "/swedish/reading", vi: "Đọc tiếng Thụy Điển", en: "Swedish Reading", group: "nordic", keywords: "doc reading" },
  { to: "/swedish/writing", vi: "Viết tiếng Thụy Điển", en: "Swedish Writing", group: "nordic", keywords: "viet writing" },
  { to: "/swedish/skills", vi: "Swedish Skills Lab", en: "Swedish Skills Lab", group: "nordic", keywords: "skills lab" },
  { to: "/swedish/yki-a2", vi: "Thụy Điển YKI A2", en: "Swedish YKI A2", group: "nordic", keywords: "yki a2" },
  { to: "/swedish/yki-b1", vi: "Thụy Điển YKI B1", en: "Swedish YKI B1", group: "nordic", keywords: "yki b1" },
  { to: "/swedish/svenskfinland", vi: "Svenskfinland", en: "Svenskfinland", group: "nordic", keywords: "svenskfinland" },
  { to: "/swedish/performance", vi: "Tiến độ Thụy Điển", en: "Swedish Performance", group: "nordic", keywords: "tien do performance" },
  { to: "/speaking-coach/swedish", vi: "Speaking Coach tiếng Thụy Điển", en: "Swedish Speaking Coach", group: "nordic", keywords: "speaking coach noi" },

  // ---------- Programming & AI ----------
  { to: "/programming", vi: "Học Lập Trình", en: "Learn Programming", group: "programming", keywords: "lap trinh programming code" },
  { to: "/python-challenges", vi: "150 Thử thách Python", en: "150 Python Challenges", group: "programming", keywords: "python challenge thu thach" },
  { to: "/programming/basic/dsa", vi: "Cấu trúc dữ liệu & giải thuật", en: "Data Structures & Algorithms", group: "programming", keywords: "dsa cau truc du lieu giai thuat algorithm" },
  { to: "/programming/ai-academy", vi: "AI Academy", en: "AI Academy", group: "programming", keywords: "ai academy" },
  { to: "/programming/nlp", vi: "Xử lý ngôn ngữ tự nhiên", en: "NLP", group: "programming", keywords: "nlp ngon ngu tu nhien" },
  { to: "/programming/edtech", vi: "EdTech", en: "EdTech", group: "programming", keywords: "edtech giao duc cong nghe" },
  { to: "/programming/software-eng", vi: "Kỹ thuật phần mềm", en: "Software Engineering", group: "programming", keywords: "phan mem software engineering" },
  { to: "/programming/cybersecurity", vi: "An toàn thông tin", en: "Cybersecurity", group: "programming", keywords: "an toan thong tin cybersecurity bao mat" },
  { to: "/programming/interview-questions", vi: "Câu hỏi phỏng vấn", en: "Interview Questions", group: "programming", keywords: "phong van interview cau hoi" },
  { to: "/programming/software-eng-interview", vi: "Phỏng vấn Software Engineer", en: "Software Engineer Interview", group: "programming", keywords: "phong van interview software" },
  { to: "/programming/job-opportunities", vi: "Cơ hội việc làm", en: "Job Opportunities", group: "programming", keywords: "viec lam job tuyen dung" },
  { to: "/programming/career-roadmap", vi: "Lộ trình nghề nghiệp", en: "Career Roadmap", group: "programming", keywords: "lo trinh career roadmap nghe nghiep" },
  { to: "/programming/startup", vi: "Startup Hub", en: "Startup Hub", group: "programming", keywords: "startup khoi nghiep" },
  { to: "/programming/startup/roadmap", vi: "Lộ trình khởi nghiệp", en: "Startup Roadmap", group: "programming", keywords: "startup roadmap lo trinh" },
  { to: "/programming/startup/case-studies", vi: "Case study khởi nghiệp", en: "Startup Case Studies", group: "programming", keywords: "case study startup" },
  { to: "/programming/startup/toolkit", vi: "Bộ công cụ khởi nghiệp", en: "Startup Toolkit", group: "programming", keywords: "toolkit cong cu startup" },
  { to: "/programming/startup/pitch-simulator", vi: "Luyện pitch khởi nghiệp", en: "Pitch Simulator", group: "programming", keywords: "pitch simulator thuyet trinh" },
  { to: "/programming/scratch-adventure", vi: "Scratch Adventure", en: "Scratch Adventure", group: "programming", keywords: "scratch tre em kids" },
  { to: "/ai-library", vi: "Thư viện AI", en: "AI Library", group: "programming", keywords: "ai library thu vien cong cu" },
  { to: "/edtech-research", vi: "Nghiên cứu EdTech", en: "EdTech Research", group: "programming", keywords: "nghien cuu research edtech" },

  // ---------- Test prep ----------
  { to: "/english/ielts", vi: "IELTS - Tổng quan", en: "IELTS Overview", group: "exams", keywords: "ielts" },
  { to: "/ielts-lectures", vi: "Bài giảng IELTS", en: "IELTS Lectures", group: "exams", keywords: "ielts bai giang lecture" },
  { to: "/ielts-writing-practice", vi: "Luyện viết IELTS", en: "IELTS Writing Practice", group: "exams", keywords: "ielts writing viet task 1 task 2" },
  { to: "/ielts-speaking-practice", vi: "Luyện nói IELTS", en: "IELTS Speaking Practice", group: "exams", keywords: "ielts speaking noi part 1 2 3" },
  { to: "/ielts-reading-practice", vi: "Luyện đọc IELTS", en: "IELTS Reading Practice", group: "exams", keywords: "ielts reading doc" },
  { to: "/ielts-listening-practice", vi: "Luyện nghe IELTS", en: "IELTS Listening Practice", group: "exams", keywords: "ielts listening nghe" },
  { to: "/ielts-skills-practice", vi: "Luyện kỹ năng IELTS", en: "IELTS Skills Practice", group: "exams", keywords: "ielts skills ky nang" },
  { to: "/ielts-sample-essays", vi: "Bài mẫu IELTS Writing", en: "IELTS Sample Essays", group: "exams", keywords: "ielts bai mau sample essay band 8" },
  { to: "/ielts-performance", vi: "Tiến độ IELTS", en: "IELTS Performance", group: "exams", keywords: "ielts tien do performance band" },
  { to: "/ai-grading", vi: "IELTS Smart Grading", en: "IELTS Smart Grading", group: "exams", keywords: "grading cham bai ai smart" },
  { to: "/toeic", vi: "TOEIC - Tổng quan", en: "TOEIC Overview", group: "exams", keywords: "toeic" },
  { to: "/toeic-lectures", vi: "Bài giảng TOEIC", en: "TOEIC Lectures", group: "exams", keywords: "toeic bai giang lecture" },
  { to: "/toeic-exams", vi: "Đề thi TOEIC", en: "TOEIC Exams", group: "exams", keywords: "toeic de thi exam" },
  { to: "/pte", vi: "PTE - Tổng quan", en: "PTE Overview", group: "exams", keywords: "pte" },
  { to: "/pte/lessons", vi: "Bài học PTE", en: "PTE Lessons", group: "exams", keywords: "pte bai hoc lesson" },
  { to: "/pte/speaking", vi: "PTE Speaking", en: "PTE Speaking", group: "exams", keywords: "pte speaking noi" },
  { to: "/pte/writing", vi: "PTE Writing", en: "PTE Writing", group: "exams", keywords: "pte writing viet" },
  { to: "/pte/reading", vi: "PTE Reading", en: "PTE Reading", group: "exams", keywords: "pte reading doc" },
  { to: "/pte/listening", vi: "PTE Listening", en: "PTE Listening", group: "exams", keywords: "pte listening nghe" },
  { to: "/sat-curriculum", vi: "Chương trình SAT", en: "SAT Curriculum", group: "exams", keywords: "sat chuong trinh curriculum" },
  { to: "/sat-exams", vi: "Đề thi SAT", en: "SAT Exams", group: "exams", keywords: "sat de thi exam" },
  { to: "/sat-exercises", vi: "Bài tập SAT", en: "SAT Exercises", group: "exams", keywords: "sat bai tap exercise" },
  { to: "/sat/daily-warmup", vi: "SAT khởi động mỗi ngày", en: "SAT Daily Warmup", group: "exams", keywords: "sat warmup khoi dong" },
  { to: "/sat/reading-pace", vi: "SAT luyện tốc độ đọc", en: "SAT Reading Pace", group: "exams", keywords: "sat reading pace toc do" },
  { to: "/sat/test-day", vi: "SAT ngày thi", en: "SAT Test Day", group: "exams", keywords: "sat test day ngay thi" },
  { to: "/sat/error-log", vi: "SAT sổ lỗi", en: "SAT Error Log", group: "exams", keywords: "sat error log so loi" },
  { to: "/cambridge-lectures", vi: "Bài giảng Cambridge YLE", en: "Cambridge Lectures", group: "exams", keywords: "cambridge yle starters movers flyers ket pet" },
  { to: "/cambridge-yle-test-prep", vi: "Thi thử Cambridge YLE", en: "Cambridge Mock Tests", group: "exams", keywords: "cambridge yle mock test de thi thu" },
  { to: "/cambridge-speaking-practice", vi: "Cambridge luyện nói", en: "Cambridge Speaking Practice", group: "exams", keywords: "cambridge speaking noi" },
  { to: "/national-exam", vi: "Ôn thi THPT Quốc gia", en: "National High School Exam", group: "exams", keywords: "thpt quoc gia national exam tot nghiep" },
  { to: "/national-exam/essential-review", vi: "THPT - Ôn tập trọng tâm", en: "THPT Essential Review", group: "exams", keywords: "thpt on tap trong tam review" },
  { to: "/placement-test", vi: "Kiểm tra trình độ", en: "Placement Test", group: "exams", keywords: "placement test kiem tra trinh do xep lop" },

  // ---------- Vocabulary & games ----------
  { to: "/ielts-vocabulary", vi: "Từ vựng IELTS", en: "IELTS Vocabulary", group: "vocab", keywords: "tu vung ielts vocabulary" },
  { to: "/toeic-vocabulary", vi: "Từ vựng TOEIC", en: "TOEIC Vocabulary", group: "vocab", keywords: "tu vung toeic vocabulary" },
  { to: "/chinese/hsk/vocabulary", vi: "Từ vựng HSK", en: "HSK Vocabulary", group: "vocab", keywords: "tu vung hsk vocabulary hanzi" },
  { to: "/sat-vocabulary", vi: "Từ vựng SAT", en: "SAT Vocabulary", group: "vocab", keywords: "tu vung sat vocabulary" },
  { to: "/cambridge-yle-vocabulary", vi: "Từ vựng Cambridge YLE", en: "Cambridge YLE Vocabulary", group: "vocab", keywords: "tu vung cambridge yle" },
  { to: "/pte/vocabulary", vi: "Từ vựng PTE", en: "PTE Vocabulary", group: "vocab", keywords: "tu vung pte" },
  { to: "/vocab-arena", vi: "Vocab Arena", en: "Vocab Arena", group: "vocab", keywords: "vocab arena dau truong game" },
  { to: "/arcade-plus", vi: "Khu trò chơi Arcade+", en: "Arcade Plus", group: "vocab", keywords: "game arcade tro choi" },
  { to: "/english/arcade", vi: "Arcade tiếng Anh", en: "English Arcade", group: "vocab", keywords: "game arcade tro choi english" },
  { to: "/chinese/arcade", vi: "Arcade tiếng Trung", en: "Chinese Arcade", group: "vocab", keywords: "game arcade tro choi chinese" },
  { to: "/finnish/arcade", vi: "Arcade tiếng Phần Lan", en: "Finnish Arcade", group: "vocab", keywords: "game arcade tro choi finnish" },
  { to: "/learn-vietnamese/arcade", vi: "Arcade tiếng Việt", en: "Vietnamese Arcade", group: "vocab", keywords: "game arcade tro choi vietnamese" },
  { to: "/cambridge/arcade", vi: "Arcade Cambridge", en: "Cambridge Arcade", group: "vocab", keywords: "game arcade tro choi cambridge" },
  { to: "/programming/arcade", vi: "Arcade lập trình", en: "Programming Arcade", group: "vocab", keywords: "game arcade tro choi code" },

  // ---------- Lifestyle & community ----------
  { to: "/lifestyle-academy", vi: "Lifestyle Academy", en: "Lifestyle Academy", group: "life", keywords: "lifestyle academy ky nang song" },
  { to: "/your-corner", vi: "Góc của bạn", en: "Your Corner", group: "life", keywords: "goc cua ban your corner cong dong" },
  { to: "/world-playground", vi: "Thế giới quanh ta", en: "World Playground", group: "life", keywords: "the gioi world playground ban do" },
  { to: "/insights", vi: "Bài viết & Insights", en: "Insights & Blog", group: "life", keywords: "bai viet blog insights tin tuc" },
  { to: "/for-vietnamese-children", vi: "Vì trẻ em Việt Nam", en: "For Vietnamese Children", group: "life", keywords: "tre em charity thien nguyen sos" },
  { to: "/about", vi: "Giới thiệu HaiEduTech", en: "About HaiEduTech", group: "life", keywords: "gioi thieu about thay hai" },
  { to: "/contact", vi: "Liên hệ", en: "Contact", group: "life", keywords: "lien he contact" },
  { to: "/register", vi: "Đăng ký khóa học", en: "Course Registration", group: "life", keywords: "dang ky register khoa hoc hoc phi" },
  { to: "/dich-vu-web", vi: "Dịch vụ thiết kế web", en: "Web Design Services", group: "life", keywords: "dich vu web website thiet ke" },

  // ---------- My space ----------
  { to: "/dashboard", vi: "Bảng điều khiển", en: "Dashboard", group: "me", keywords: "dashboard bang dieu khien trang ca nhan" },
  { to: "/notebook", vi: "Sổ tay học tập", en: "Study Notebook", group: "me", keywords: "so tay notebook ghi chu bai tap" },
  { to: "/my-path", vi: "Lộ trình của tôi", en: "My Learning Path", group: "me", keywords: "lo trinh my path ca nhan hoa" },
  { to: "/my-path/start", vi: "Bắt đầu lộ trình", en: "Start My Path", group: "me", keywords: "lo trinh bat dau start" },
  { to: "/activity-log", vi: "Lịch sử hoạt động", en: "Activity Log", group: "me", keywords: "lich su activity log hoat dong" },
  { to: "/lesson-library", vi: "Thư viện bài học", en: "Lesson Library", group: "me", keywords: "thu vien lesson library tai lieu" },
  { to: "/smart-resources", vi: "Tài nguyên thông minh", en: "Smart Resources", group: "me", keywords: "tai nguyen resources tai lieu" },

  // ---------- Admin ----------
  { to: "/admin", vi: "Khu quản trị", en: "Admin Dashboard", group: "admin", adminOnly: true, keywords: "admin quan tri dashboard" },
  { to: "/admin/assignments", vi: "Quản lý bài tập", en: "Assignments Manager", group: "admin", adminOnly: true, keywords: "bai tap assignment giao bai" },
  { to: "/admin/classes", vi: "Quản lý lớp học", en: "Classes Manager", group: "admin", adminOnly: true, keywords: "lop hoc class quan ly" },
  { to: "/admin/placement-test-results", vi: "Kết quả kiểm tra trình độ", en: "Placement Test Results", group: "admin", adminOnly: true, keywords: "placement ket qua trinh do" },
  { to: "/teacher-dashboard", vi: "Bảng giáo viên", en: "Teacher Dashboard", group: "admin", adminOnly: true, keywords: "giao vien teacher dashboard" },
  { to: "/assistant", vi: "Khu trợ giảng", en: "Assistant Dashboard", group: "admin", adminOnly: true, keywords: "tro giang assistant" },
];

/** Quick-access shortcuts shown when the query is empty. */
export const QUICK_PATHS = [
  "/dashboard",
  "/notebook",
  "/my-path",
  "/ielts-vocabulary",
  "/english/grammar",
  "/study-abroad",
];

/** Strip Vietnamese diacritics + lowercase for accent-insensitive matching. */
export const normalize = (input: string): string =>
  (input || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();

export interface RankedEntry<T> {
  entry: T;
  score: number;
}

/**
 * Score an entry against a normalized query.
 * 100 = label starts with query, 70 = label contains it,
 * 40 = keyword/path hit, 25 = all query words found somewhere. 0 = no match.
 */
export const scoreEntry = (
  haystackLabels: string[],
  haystackExtra: string[],
  normalizedQuery: string,
): number => {
  if (!normalizedQuery) return 0;
  const labels = haystackLabels.map(normalize);
  const extra = haystackExtra.map(normalize);

  if (labels.some((l) => l.startsWith(normalizedQuery))) return 100;
  if (labels.some((l) => l.split(/\s+/).some((w) => w.startsWith(normalizedQuery)))) return 85;
  if (labels.some((l) => l.includes(normalizedQuery))) return 70;
  if (extra.some((e) => e.includes(normalizedQuery))) return 40;

  const words = normalizedQuery.split(/\s+/).filter(Boolean);
  if (words.length > 1) {
    const all = [...labels, ...extra].join(" ");
    if (words.every((w) => all.includes(w))) return 25;
  }

  // Typed without spaces ("nguphap", "tuvung", "sotay"): compare squashed forms.
  const squashedQuery = normalizedQuery.replace(/\s+/g, "");
  if (squashedQuery.length >= 4) {
    const squash = (s: string) => s.replace(/\s+/g, "");
    if (labels.some((l) => squash(l).startsWith(squashedQuery))) return 80;
    if (labels.some((l) => squash(l).includes(squashedQuery))) return 60;
    if (extra.some((e) => squash(e).includes(squashedQuery))) return 35;
  }
  return 0;
};

export const MAX_PER_GROUP = 6;
