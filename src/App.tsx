/**
 * @file App.tsx
 * @description Root application component with routing for HaiEduTech Platform.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 * @license Private / Proprietary - No unauthorized copying or distribution.
 */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { lazy, Suspense } from "react";
import Index from "./pages/Index.tsx";
import Welcome from "./pages/Welcome.tsx";
import NotFound from "./pages/NotFound.tsx";

/** Decides whether to show the splash welcome or the home page on `/`. */
const RootEntry = () => {
  const welcomed = typeof window !== "undefined" && sessionStorage.getItem("haiedu_welcomed") === "1";
  return welcomed ? <Index /> : <Welcome />;
};
import ChatBot from "./components/ChatBot.tsx";
import FloatingNotebook from "./components/FloatingNotebook.tsx";
import LastSessionRecap from "./components/LastSessionRecap.tsx";
import GlobalSuperDictionary from "./components/GlobalSuperDictionary.tsx";
import SessionTracker from "./components/SessionTracker.tsx";
import PageViewTracker from "./components/PageViewTracker.tsx";

// Lazy-load all heavy route components for optimal code splitting
const About = lazy(() => import("./pages/About.tsx"));
const English = lazy(() => import("./pages/English.tsx"));
const EnglishFunFacts = lazy(() => import("./pages/EnglishFunFacts.tsx"));
const EnglishIdioms = lazy(() => import("./pages/EnglishIdioms.tsx"));
const EnglishCourse = lazy(() => import("./pages/EnglishCourse.tsx"));
const Chinese = lazy(() => import("./pages/Chinese.tsx"));
const ChineseCourse = lazy(() => import("./pages/ChineseCourse.tsx"));
const Programming = lazy(() => import("./pages/Programming.tsx"));
const ProgrammingLesson = lazy(() => import("./pages/ProgrammingLesson.tsx"));
const AIGrading = lazy(() => import("./pages/AIGrading.tsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.tsx"));
const ActivityLog = lazy(() => import("./pages/ActivityLog.tsx"));
const Register = lazy(() => import("./pages/Register.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const WorldPlayground = lazy(() => import("./pages/WorldPlayground.tsx"));
const Login = lazy(() => import("./pages/Login.tsx"));
const Signup = lazy(() => import("./pages/Signup.tsx"));
const AILibrary = lazy(() => import("./pages/AILibrary.tsx"));
const Vietnamese = lazy(() => import("./pages/Vietnamese.tsx"));
const VietnameseLessonView = lazy(() => import("./pages/VietnameseLessonView.tsx"));
const VietnameseHistoryLesson = lazy(() => import("./pages/VietnameseHistoryLesson.tsx"));
const LessonDetail = lazy(() => import("./pages/LessonDetail.tsx"));
const TeacherAdmin = lazy(() => import("./pages/TeacherAdmin.tsx"));
const TeacherDashboard = lazy(() => import("./pages/TeacherDashboard.tsx"));
const GeneratedLessonView = lazy(() => import("./pages/GeneratedLessonView.tsx"));
const PythonChallengeList = lazy(() => import("./pages/PythonChallengeList.tsx"));
const PythonChallengePage = lazy(() => import("./pages/PythonChallenge.tsx"));
const InterviewQuestions = lazy(() => import("./pages/InterviewQuestions.tsx"));
const IeltsWritingPractice = lazy(() => import("./pages/IeltsWritingPractice.tsx"));
const IeltsSampleEssays = lazy(() => import("./pages/IeltsSampleEssays.tsx"));
const IeltsSampleEssayDetail = lazy(() => import("./pages/IeltsSampleEssayDetail.tsx"));
const SpeakingPractice = lazy(() => import("./pages/SpeakingPractice.tsx"));
const IeltsVocabulary = lazy(() => import("./pages/IeltsVocabulary.tsx"));
const SatVocabulary = lazy(() => import("./pages/SatVocabulary.tsx"));
const SatExercises = lazy(() => import("./pages/SatExercises.tsx"));
const SatExams = lazy(() => import("./pages/SatExams.tsx"));
const SatMockExam = lazy(() => import("./pages/SatMockExam.tsx"));
const VocabArena = lazy(() => import("./pages/VocabArena.tsx"));
const NationalExamPrep = lazy(() => import("./pages/NationalExamPrep.tsx"));
const NationalExamRoom = lazy(() => import("./pages/NationalExamRoom.tsx"));
const ThptEssentialReview = lazy(() => import("./pages/ThptEssentialReview.tsx"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard.tsx"));
const LanguageLessonView = lazy(() => import("./pages/LanguageLessonView.tsx"));
const ConversationalDashboard = lazy(() => import("./pages/ConversationalDashboard.tsx"));
const ConversationalLessonView = lazy(() => import("./pages/ConversationalLessonView.tsx"));
const ChineseConversationalDashboard = lazy(() => import("./pages/ChineseConversationalDashboard.tsx"));
const ChineseConversationalLessonView = lazy(() => import("./pages/ChineseConversationalLessonView.tsx"));
const ChineseCultureHub = lazy(() => import("./pages/ChineseCultureHub.tsx"));
const HskVocabulary = lazy(() => import("./pages/HskVocabulary.tsx"));
const HskHub = lazy(() => import("./pages/HskHub.tsx"));
const HskLevelGuide = lazy(() => import("./pages/HskLevelGuide.tsx"));
const HskGrammar = lazy(() => import("./pages/HskGrammar.tsx"));
const KnowledgeHubPage = lazy(() => import("./pages/KnowledgeHubPage.tsx"));
const FolkloreLibrary = lazy(() => import("./pages/FolkloreLibrary.tsx"));
const VietnameseForForeigners = lazy(() => import("./pages/VietnameseForForeigners.tsx"));
const VietnameseDictation = lazy(() => import("./pages/VietnameseDictation.tsx"));
const VietnamesePoetry = lazy(() => import("./pages/VietnamesePoetry.tsx"));
const VietnameseAlphabet = lazy(() => import("./pages/VietnameseAlphabet.tsx"));
const NationalAnthem = lazy(() => import("./pages/NationalAnthem.tsx"));
const VietnameseHolidays = lazy(() => import("./pages/VietnameseHolidays.tsx"));
const VietnameseCuisine = lazy(() => import("./pages/VietnameseCuisine.tsx"));
const VietnameseRegions = lazy(() => import("./pages/VietnameseRegions.tsx"));
const VietnameseCulture = lazy(() => import("./pages/VietnameseCulture.tsx"));
const VietnameseFilms = lazy(() => import("./pages/VietnameseFilms.tsx"));
const VietnameseKids = lazy(() => import("./pages/VietnameseKids.tsx"));
const VietnamesePhrasebook = lazy(() => import("./pages/VietnamesePhrasebook.tsx"));
const VietnameseDaily = lazy(() => import("./pages/VietnameseDaily.tsx"));
const IeltsLectures = lazy(() => import("./pages/IeltsLectures.tsx"));
const IeltsListeningPractice = lazy(() => import("./pages/IeltsListeningPractice.tsx"));
const IeltsLectureView = lazy(() => import("./pages/IeltsLectureView.tsx"));
const ToeicLectures = lazy(() => import("./pages/ToeicLectures.tsx"));
const ToeicHub = lazy(() => import("./pages/ToeicHub.tsx"));
const ToeicLectureView = lazy(() => import("./pages/ToeicLectureView.tsx"));
const CambridgeLectures = lazy(() => import("./pages/CambridgeLectures.tsx"));
const CambridgeLectureView = lazy(() => import("./pages/CambridgeLectureView.tsx"));
const ToeicVocabulary = lazy(() => import("./pages/ToeicVocabulary.tsx"));
const ToeicExams = lazy(() => import("./pages/ToeicExams.tsx"));
const ToeicExamRoom = lazy(() => import("./pages/ToeicExamRoom.tsx"));
const Finnish = lazy(() => import("./pages/Finnish.tsx"));
const YkiDashboard = lazy(() => import("./pages/YkiDashboard.tsx"));
const FinnishBeginner = lazy(() => import("./pages/FinnishBeginner.tsx"));
const YkiB1Dashboard = lazy(() => import("./pages/YkiB1Dashboard.tsx"));
const LifeInFinland = lazy(() => import("./pages/LifeInFinland.tsx"));
const SpeakingCoachPage = lazy(() => import("./pages/SpeakingCoachPage.tsx"));
const EnglishGrammar = lazy(() => import("./pages/EnglishGrammar.tsx"));
const NotebookPage = lazy(() => import("./pages/Notebook.tsx"));
const CambridgeMockExamPage = lazy(() => import("./pages/CambridgeMockExam.tsx"));
const JobOpportunities = lazy(() => import("./pages/JobOpportunities.tsx"));
const CareerRoadmap = lazy(() => import("./pages/CareerRoadmap.tsx"));
const PteHub = lazy(() => import("./pages/PteHub.tsx"));
const PteSpeaking = lazy(() => import("./pages/PteSpeaking.tsx"));
const PteWriting = lazy(() => import("./pages/PteWriting.tsx"));
const PteReading = lazy(() => import("./pages/PteReading.tsx"));
const PteListening = lazy(() => import("./pages/PteListening.tsx"));
const PtePlaceholder = lazy(() => import("./pages/PtePlaceholder.tsx"));
const PteVocabulary = lazy(() => import("./pages/PteVocabulary.tsx"));
const PythonLessonView = lazy(() => import("./pages/PythonLessonView.tsx"));
const StudyAbroadHub = lazy(() => import("./pages/StudyAbroadHub.tsx"));
const StudentDocuments = lazy(() => import("./pages/StudentDocuments.tsx"));
const MotivationLetterGuide = lazy(() => import("./pages/MotivationLetterGuide.tsx"));
const SatRoadmap = lazy(() => import("./pages/SatRoadmap.tsx"));
const PhdGlobalPathway = lazy(() => import("./pages/PhdGlobalPathway.tsx"));
const MentorHub = lazy(() => import("./pages/MentorHub.tsx"));
const PreDepartureChecklist = lazy(() => import("./pages/PreDepartureChecklist.tsx"));
const SoftwareEngInterview = lazy(() => import("./pages/SoftwareEngInterview.tsx"));
const SongsLibraryPage = lazy(() => import("./pages/SongsLibraryPage.tsx"));
const SpecializedLanguage = lazy(() => import("./pages/SpecializedLanguage.tsx"));
const EnglishPronunciation = lazy(() => import("./pages/EnglishPronunciation.tsx"));

// Shared loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-3">
      <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
    </div>
  </div>
);

// Wrapper for lazy routes
const LazyRoute = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<PageLoader />}>{children}</Suspense>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootEntry />} />
            <Route path="/home" element={<Index />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/about" element={<LazyRoute><About /></LazyRoute>} />
            <Route path="/english" element={<LazyRoute><English /></LazyRoute>} />
            <Route path="/english/fun-facts" element={<LazyRoute><EnglishFunFacts /></LazyRoute>} />
            <Route path="/english/idioms" element={<LazyRoute><EnglishIdioms /></LazyRoute>} />
            <Route path="/english/conversational/curriculum" element={<LazyRoute><ConversationalDashboard /></LazyRoute>} />
            <Route path="/english/conversational/learn/:lessonId" element={<LazyRoute><ConversationalLessonView /></LazyRoute>} />
           <Route path="/english/grammar" element={<LazyRoute><EnglishGrammar /></LazyRoute>} />
           <Route path="/english/pronunciation" element={<LazyRoute><EnglishPronunciation /></LazyRoute>} />
            <Route path="/english/:courseId" element={<LazyRoute><EnglishCourse /></LazyRoute>} />
            <Route path="/english/learn/:moduleId" element={<LazyRoute><LanguageLessonView /></LazyRoute>} />
            <Route path="/english/learn/:moduleId/:lessonId" element={<LazyRoute><LanguageLessonView /></LazyRoute>} />
            <Route path="/chinese" element={<LazyRoute><Chinese /></LazyRoute>} />
            <Route path="/chinese/conversational/curriculum" element={<LazyRoute><ChineseConversationalDashboard /></LazyRoute>} />
            <Route path="/chinese/conversational/learn/:lessonId" element={<LazyRoute><ChineseConversationalLessonView /></LazyRoute>} />
            <Route path="/chinese/culture" element={<LazyRoute><ChineseCultureHub /></LazyRoute>} />
            <Route path="/chinese/:courseId" element={<LazyRoute><ChineseCourse /></LazyRoute>} />
            <Route path="/chinese/hsk/vocabulary" element={<LazyRoute><HskVocabulary /></LazyRoute>} />
            <Route path="/chinese/hsk-guide" element={<LazyRoute><HskHub /></LazyRoute>} />
            <Route path="/chinese/hsk-guide/:level" element={<LazyRoute><HskLevelGuide /></LazyRoute>} />
            <Route path="/chinese/hsk-grammar" element={<LazyRoute><HskGrammar /></LazyRoute>} />
            <Route path="/chinese/learn/:moduleId" element={<LazyRoute><LanguageLessonView /></LazyRoute>} />
            <Route path="/chinese/learn/:moduleId/:lessonId" element={<LazyRoute><LanguageLessonView /></LazyRoute>} />
            <Route path="/programming" element={<LazyRoute><Programming /></LazyRoute>} />
            <Route path="/programming/:moduleId" element={<LazyRoute><ProgrammingLesson /></LazyRoute>} />
            <Route path="/programming/python/:lessonId" element={<LazyRoute><PythonLessonView /></LazyRoute>} />
            <Route path="/programming/:moduleId/:lessonId" element={<LazyRoute><ProgrammingLesson /></LazyRoute>} />
            <Route path="/ai-grading" element={<LazyRoute><AIGrading /></LazyRoute>} />
            <Route path="/ielts-writing-practice" element={<LazyRoute><IeltsWritingPractice /></LazyRoute>} />
            <Route path="/ielts-sample-essays" element={<LazyRoute><IeltsSampleEssays /></LazyRoute>} />
            <Route path="/ielts-sample-essays/:essayId" element={<LazyRoute><IeltsSampleEssayDetail /></LazyRoute>} />
            <Route path="/ielts-speaking-practice" element={<LazyRoute><SpeakingPractice /></LazyRoute>} />
            <Route path="/ielts-vocabulary" element={<LazyRoute><IeltsVocabulary /></LazyRoute>} />
            <Route path="/sat-vocabulary" element={<LazyRoute><SatVocabulary /></LazyRoute>} />
            <Route path="/sat-exercises" element={<LazyRoute><SatExercises /></LazyRoute>} />
            <Route path="/sat-exams" element={<LazyRoute><SatExams /></LazyRoute>} />
            <Route path="/sat-exams/:examId" element={<LazyRoute><SatMockExam /></LazyRoute>} />
            <Route path="/ielts-lectures" element={<LazyRoute><IeltsLectures /></LazyRoute>} />
            <Route path="/ielts-lectures/:lectureId" element={<LazyRoute><IeltsLectureView /></LazyRoute>} />
            <Route path="/ielts-listening-practice" element={<LazyRoute><IeltsListeningPractice /></LazyRoute>} />
            <Route path="/toeic" element={<LazyRoute><ToeicHub /></LazyRoute>} />
            <Route path="/toeic-lectures" element={<LazyRoute><ToeicLectures /></LazyRoute>} />
            <Route path="/toeic-lectures/:lectureId" element={<LazyRoute><ToeicLectureView /></LazyRoute>} />
            <Route path="/toeic-vocabulary" element={<LazyRoute><ToeicVocabulary /></LazyRoute>} />
            <Route path="/toeic-exams" element={<LazyRoute><ToeicExams /></LazyRoute>} />
            <Route path="/toeic-exam/:examId" element={<LazyRoute><ToeicExamRoom /></LazyRoute>} />
            <Route path="/cambridge-lectures" element={<LazyRoute><CambridgeLectures /></LazyRoute>} />
            <Route path="/cambridge-lectures/:lectureId" element={<LazyRoute><CambridgeLectureView /></LazyRoute>} />
            <Route path="/cambridge-mock-exam/:examId" element={<LazyRoute><CambridgeMockExamPage /></LazyRoute>} />
            <Route path="/vocab-arena" element={<LazyRoute><VocabArena /></LazyRoute>} />
            <Route path="/national-exam" element={<LazyRoute><NationalExamPrep /></LazyRoute>} />
            <Route path="/national-exam/essential-review" element={<LazyRoute><ThptEssentialReview /></LazyRoute>} />
            <Route path="/national-exam/:examId" element={<LazyRoute><NationalExamRoom /></LazyRoute>} />
            <Route path="/dashboard" element={<LazyRoute><Dashboard /></LazyRoute>} />
            <Route path="/activity-log" element={<LazyRoute><ActivityLog /></LazyRoute>} />
            <Route path="/register" element={<LazyRoute><Register /></LazyRoute>} />
            <Route path="/contact" element={<LazyRoute><Contact /></LazyRoute>} />
            <Route path="/world-playground" element={<LazyRoute><WorldPlayground /></LazyRoute>} />
            <Route path="/for-vietnamese-children" element={<Navigate to="/world-playground" replace />} />
            <Route path="/login" element={<LazyRoute><Login /></LazyRoute>} />
            <Route path="/signup" element={<LazyRoute><Signup /></LazyRoute>} />
            <Route path="/ai-library" element={<LazyRoute><AILibrary /></LazyRoute>} />
            <Route path="/learn-vietnamese" element={<LazyRoute><Vietnamese /></LazyRoute>} />
            <Route path="/learn-vietnamese/module/:moduleId" element={<LazyRoute><VietnameseLessonView /></LazyRoute>} />
            <Route path="/learn-vietnamese/module/:moduleId/:lessonId" element={<LazyRoute><VietnameseLessonView /></LazyRoute>} />
            <Route path="/learn-vietnamese/history/:lessonId" element={<LazyRoute><VietnameseHistoryLesson /></LazyRoute>} />
            <Route path="/learn-vietnamese/folklore" element={<LazyRoute><FolkloreLibrary /></LazyRoute>} />
            <Route path="/learn-vietnamese/folklore/:storyId" element={<LazyRoute><FolkloreLibrary /></LazyRoute>} />
            <Route path="/learn-vietnamese/for-foreigners" element={<LazyRoute><VietnameseForForeigners /></LazyRoute>} />
            <Route path="/learn-vietnamese/national-anthem" element={<LazyRoute><NationalAnthem /></LazyRoute>} />
            <Route path="/learn-vietnamese/dictation" element={<LazyRoute><VietnameseDictation /></LazyRoute>} />
            <Route path="/learn-vietnamese/poetry" element={<LazyRoute><VietnamesePoetry /></LazyRoute>} />
            <Route path="/learn-vietnamese/alphabet" element={<LazyRoute><VietnameseAlphabet /></LazyRoute>} />
            <Route path="/learn-vietnamese/holidays" element={<LazyRoute><VietnameseHolidays /></LazyRoute>} />
            <Route path="/learn-vietnamese/holidays/:holidayId" element={<LazyRoute><VietnameseHolidays /></LazyRoute>} />
            <Route path="/learn-vietnamese/cuisine" element={<LazyRoute><VietnameseCuisine /></LazyRoute>} />
            <Route path="/learn-vietnamese/regions" element={<LazyRoute><VietnameseRegions /></LazyRoute>} />
            <Route path="/learn-vietnamese/culture" element={<LazyRoute><VietnameseCulture /></LazyRoute>} />
            <Route path="/learn-vietnamese/films" element={<LazyRoute><VietnameseFilms /></LazyRoute>} />
            <Route path="/learn-vietnamese/kids-overseas" element={<LazyRoute><VietnameseKids /></LazyRoute>} />
            <Route path="/learn-vietnamese/phrasebook" element={<LazyRoute><VietnamesePhrasebook /></LazyRoute>} />
            <Route path="/learn-vietnamese/daily" element={<LazyRoute><VietnameseDaily /></LazyRoute>} />
            <Route path="/learn-vietnamese/for-foreigners/:moduleId/:lessonId" element={<LazyRoute><VietnameseForForeigners /></LazyRoute>} />
            <Route path="/global-scholarship" element={<LazyRoute><KnowledgeHubPage /></LazyRoute>} />
            <Route path="/knowledge-hub" element={<Navigate to="/global-scholarship" replace />} />
            <Route path="/finnish" element={<LazyRoute><Finnish /></LazyRoute>} />
            <Route path="/finnish/yki-dashboard" element={<LazyRoute><YkiDashboard /></LazyRoute>} />
            <Route path="/finnish/beginner" element={<LazyRoute><FinnishBeginner /></LazyRoute>} />
            <Route path="/finnish/yki-b1" element={<LazyRoute><YkiB1Dashboard /></LazyRoute>} />
            <Route path="/finnish/life-in-finland" element={<LazyRoute><LifeInFinland /></LazyRoute>} />
            <Route path="/speaking-coach/:language" element={<LazyRoute><SpeakingCoachPage /></LazyRoute>} />
            <Route path="/notebook" element={<LazyRoute><NotebookPage /></LazyRoute>} />
            {/* Redirects for old routes */}
            <Route path="/smart-resources" element={<Navigate to="/ai-library" replace />} />
            <Route path="/lesson-library" element={<Navigate to="/ai-library" replace />} />
            <Route path="/lesson/:resourceId" element={<LazyRoute><LessonDetail /></LazyRoute>} />
            <Route path="/lesson/:resourceId/:lessonId" element={<LazyRoute><LessonDetail /></LazyRoute>} />
            <Route path="/teacher-admin" element={<LazyRoute><TeacherAdmin /></LazyRoute>} />
            <Route path="/teacher-dashboard" element={<LazyRoute><TeacherDashboard /></LazyRoute>} />
            <Route path="/admin-dashboard" element={<LazyRoute><AdminDashboard /></LazyRoute>} />
            <Route path="/lesson-library/:lessonId" element={<LazyRoute><GeneratedLessonView /></LazyRoute>} />
            <Route path="/python-challenges" element={<LazyRoute><PythonChallengeList /></LazyRoute>} />
            <Route path="/python-challenges/:challengeId" element={<LazyRoute><PythonChallengePage /></LazyRoute>} />
            <Route path="/programming/interview-questions" element={<LazyRoute><InterviewQuestions /></LazyRoute>} />
            <Route path="/programming/software-eng-interview" element={<LazyRoute><SoftwareEngInterview /></LazyRoute>} />
            <Route path="/programming/job-opportunities" element={<LazyRoute><JobOpportunities /></LazyRoute>} />
            <Route path="/programming/career-roadmap" element={<LazyRoute><CareerRoadmap /></LazyRoute>} />
            <Route path="/pte" element={<LazyRoute><PteHub /></LazyRoute>} />
            <Route path="/pte/speaking" element={<LazyRoute><PteSpeaking /></LazyRoute>} />
            <Route path="/pte/writing" element={<LazyRoute><PteWriting /></LazyRoute>} />
            <Route path="/pte/reading" element={<LazyRoute><PteReading /></LazyRoute>} />
            <Route path="/pte/listening" element={<LazyRoute><PteListening /></LazyRoute>} />
            <Route path="/pte/vocabulary" element={<LazyRoute><PteVocabulary /></LazyRoute>} />
            <Route path="/pte/:skill" element={<LazyRoute><PtePlaceholder /></LazyRoute>} />
            <Route path="/study-abroad" element={<LazyRoute><StudyAbroadHub /></LazyRoute>} />
            <Route path="/study-abroad/documents" element={<LazyRoute><StudentDocuments /></LazyRoute>} />
            <Route path="/study-abroad/motivation-letter" element={<LazyRoute><MotivationLetterGuide /></LazyRoute>} />
            <Route path="/study-abroad/sat" element={<LazyRoute><SatRoadmap /></LazyRoute>} />
            <Route path="/study-abroad/phd" element={<LazyRoute><PhdGlobalPathway /></LazyRoute>} />
            <Route path="/study-abroad/mentor-hub" element={<LazyRoute><MentorHub /></LazyRoute>} />
            <Route path="/study-abroad/checklist" element={<LazyRoute><PreDepartureChecklist /></LazyRoute>} />
            <Route path="/songs/:lang" element={<LazyRoute><SongsLibraryPage /></LazyRoute>} />
            <Route path="/specialized-language" element={<LazyRoute><SpecializedLanguage /></LazyRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatBot />
          <FloatingNotebook />
          <LastSessionRecap />
          <GlobalSuperDictionary />
          <SessionTracker />
          <PageViewTracker />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
