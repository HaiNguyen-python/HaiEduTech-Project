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
import NotFound from "./pages/NotFound.tsx";
import ChatBot from "./components/ChatBot.tsx";

// Lazy-load all heavy route components for optimal code splitting
const About = lazy(() => import("./pages/About.tsx"));
const English = lazy(() => import("./pages/English.tsx"));
const EnglishCourse = lazy(() => import("./pages/EnglishCourse.tsx"));
const Chinese = lazy(() => import("./pages/Chinese.tsx"));
const ChineseCourse = lazy(() => import("./pages/ChineseCourse.tsx"));
const Programming = lazy(() => import("./pages/Programming.tsx"));
const ProgrammingLesson = lazy(() => import("./pages/ProgrammingLesson.tsx"));
const AIGrading = lazy(() => import("./pages/AIGrading.tsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.tsx"));
const Register = lazy(() => import("./pages/Register.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
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
const IeltsWritingPractice = lazy(() => import("./pages/IeltsWritingPractice.tsx"));
const IeltsSampleEssays = lazy(() => import("./pages/IeltsSampleEssays.tsx"));
const IeltsSampleEssayDetail = lazy(() => import("./pages/IeltsSampleEssayDetail.tsx"));
const SpeakingPractice = lazy(() => import("./pages/SpeakingPractice.tsx"));
const IeltsVocabulary = lazy(() => import("./pages/IeltsVocabulary.tsx"));
const VocabArena = lazy(() => import("./pages/VocabArena.tsx"));
const NationalExamPrep = lazy(() => import("./pages/NationalExamPrep.tsx"));
const NationalExamRoom = lazy(() => import("./pages/NationalExamRoom.tsx"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard.tsx"));
const LanguageLessonView = lazy(() => import("./pages/LanguageLessonView.tsx"));
const ConversationalDashboard = lazy(() => import("./pages/ConversationalDashboard.tsx"));
const ConversationalLessonView = lazy(() => import("./pages/ConversationalLessonView.tsx"));
const ChineseConversationalDashboard = lazy(() => import("./pages/ChineseConversationalDashboard.tsx"));
const ChineseConversationalLessonView = lazy(() => import("./pages/ChineseConversationalLessonView.tsx"));
const HskVocabulary = lazy(() => import("./pages/HskVocabulary.tsx"));
const KnowledgeHubPage = lazy(() => import("./pages/KnowledgeHubPage.tsx"));
const FolkloreLibrary = lazy(() => import("./pages/FolkloreLibrary.tsx"));
const VietnameseForForeigners = lazy(() => import("./pages/VietnameseForForeigners.tsx"));
const VietnameseDictation = lazy(() => import("./pages/VietnameseDictation.tsx"));
const VietnamesePoetry = lazy(() => import("./pages/VietnamesePoetry.tsx"));
const IeltsLectures = lazy(() => import("./pages/IeltsLectures.tsx"));
const IeltsLectureView = lazy(() => import("./pages/IeltsLectureView.tsx"));
const ToeicLectures = lazy(() => import("./pages/ToeicLectures.tsx"));
const ToeicLectureView = lazy(() => import("./pages/ToeicLectureView.tsx"));
const CambridgeLectures = lazy(() => import("./pages/CambridgeLectures.tsx"));
const CambridgeLectureView = lazy(() => import("./pages/CambridgeLectureView.tsx"));
const ToeicVocabulary = lazy(() => import("./pages/ToeicVocabulary.tsx"));
const Finnish = lazy(() => import("./pages/Finnish.tsx"));
const YkiDashboard = lazy(() => import("./pages/YkiDashboard.tsx"));
const SpeakingCoachPage = lazy(() => import("./pages/SpeakingCoachPage.tsx"));

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
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<LazyRoute><About /></LazyRoute>} />
            <Route path="/english" element={<LazyRoute><English /></LazyRoute>} />
            <Route path="/english/conversational/curriculum" element={<LazyRoute><ConversationalDashboard /></LazyRoute>} />
            <Route path="/english/conversational/learn/:lessonId" element={<LazyRoute><ConversationalLessonView /></LazyRoute>} />
            <Route path="/english/:courseId" element={<LazyRoute><EnglishCourse /></LazyRoute>} />
            <Route path="/english/learn/:moduleId" element={<LazyRoute><LanguageLessonView /></LazyRoute>} />
            <Route path="/english/learn/:moduleId/:lessonId" element={<LazyRoute><LanguageLessonView /></LazyRoute>} />
            <Route path="/chinese" element={<LazyRoute><Chinese /></LazyRoute>} />
            <Route path="/chinese/conversational/curriculum" element={<LazyRoute><ChineseConversationalDashboard /></LazyRoute>} />
            <Route path="/chinese/conversational/learn/:lessonId" element={<LazyRoute><ChineseConversationalLessonView /></LazyRoute>} />
            <Route path="/chinese/:courseId" element={<LazyRoute><ChineseCourse /></LazyRoute>} />
            <Route path="/chinese/hsk/vocabulary" element={<LazyRoute><HskVocabulary /></LazyRoute>} />
            <Route path="/chinese/learn/:moduleId" element={<LazyRoute><LanguageLessonView /></LazyRoute>} />
            <Route path="/chinese/learn/:moduleId/:lessonId" element={<LazyRoute><LanguageLessonView /></LazyRoute>} />
            <Route path="/programming" element={<LazyRoute><Programming /></LazyRoute>} />
            <Route path="/programming/:moduleId" element={<LazyRoute><ProgrammingLesson /></LazyRoute>} />
            <Route path="/programming/:moduleId/:lessonId" element={<LazyRoute><ProgrammingLesson /></LazyRoute>} />
            <Route path="/ai-grading" element={<LazyRoute><AIGrading /></LazyRoute>} />
            <Route path="/ielts-writing-practice" element={<LazyRoute><IeltsWritingPractice /></LazyRoute>} />
            <Route path="/ielts-sample-essays" element={<LazyRoute><IeltsSampleEssays /></LazyRoute>} />
            <Route path="/ielts-sample-essays/:essayId" element={<LazyRoute><IeltsSampleEssayDetail /></LazyRoute>} />
            <Route path="/ielts-speaking-practice" element={<LazyRoute><SpeakingPractice /></LazyRoute>} />
            <Route path="/ielts-vocabulary" element={<LazyRoute><IeltsVocabulary /></LazyRoute>} />
            <Route path="/ielts-lectures" element={<LazyRoute><IeltsLectures /></LazyRoute>} />
            <Route path="/ielts-lectures/:lectureId" element={<LazyRoute><IeltsLectureView /></LazyRoute>} />
            <Route path="/toeic-lectures" element={<LazyRoute><ToeicLectures /></LazyRoute>} />
            <Route path="/toeic-lectures/:lectureId" element={<LazyRoute><ToeicLectureView /></LazyRoute>} />
            <Route path="/toeic-vocabulary" element={<LazyRoute><ToeicVocabulary /></LazyRoute>} />
            <Route path="/cambridge-lectures" element={<LazyRoute><CambridgeLectures /></LazyRoute>} />
            <Route path="/cambridge-lectures/:lectureId" element={<LazyRoute><CambridgeLectureView /></LazyRoute>} />
            <Route path="/vocab-arena" element={<LazyRoute><VocabArena /></LazyRoute>} />
            <Route path="/national-exam" element={<LazyRoute><NationalExamPrep /></LazyRoute>} />
            <Route path="/national-exam/:examId" element={<LazyRoute><NationalExamRoom /></LazyRoute>} />
            <Route path="/dashboard" element={<LazyRoute><Dashboard /></LazyRoute>} />
            <Route path="/register" element={<LazyRoute><Register /></LazyRoute>} />
            <Route path="/contact" element={<LazyRoute><Contact /></LazyRoute>} />
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
            <Route path="/learn-vietnamese/for-foreigners/:moduleId/:lessonId" element={<LazyRoute><VietnameseForForeigners /></LazyRoute>} />
            <Route path="/knowledge-hub" element={<LazyRoute><KnowledgeHubPage /></LazyRoute>} />
            <Route path="/finnish" element={<LazyRoute><Finnish /></LazyRoute>} />
            <Route path="/finnish/yki-dashboard" element={<LazyRoute><YkiDashboard /></LazyRoute>} />
            <Route path="/speaking-coach/:language" element={<LazyRoute><SpeakingCoachPage /></LazyRoute>} />
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
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatBot />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
