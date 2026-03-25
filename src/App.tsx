import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { lazy, Suspense } from "react";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import English from "./pages/English.tsx";
import EnglishCourse from "./pages/EnglishCourse.tsx";
import Chinese from "./pages/Chinese.tsx";
import ChineseCourse from "./pages/ChineseCourse.tsx";
import Programming from "./pages/Programming.tsx";
import ProgrammingLesson from "./pages/ProgrammingLesson.tsx";
import AIGrading from "./pages/AIGrading.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Register from "./pages/Register.tsx";
import Contact from "./pages/Contact.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import AILibrary from "./pages/AILibrary.tsx";
import LessonDetail from "./pages/LessonDetail.tsx";
import TeacherAdmin from "./pages/TeacherAdmin.tsx";
import TeacherDashboard from "./pages/TeacherDashboard.tsx";
import GeneratedLessonView from "./pages/GeneratedLessonView.tsx";
import PythonChallengeList from "./pages/PythonChallengeList.tsx";
import PythonChallengePage from "./pages/PythonChallenge.tsx";
import IeltsWritingPractice from "./pages/IeltsWritingPractice.tsx";
import IeltsSampleEssays from "./pages/IeltsSampleEssays.tsx";
import IeltsSampleEssayDetail from "./pages/IeltsSampleEssayDetail.tsx";
import SpeakingPractice from "./pages/SpeakingPractice.tsx";
import NationalExamPrep from "./pages/NationalExamPrep.tsx";
import NotFound from "./pages/NotFound.tsx";
import LanguageLessonView from "./pages/LanguageLessonView.tsx";
import ChatBot from "./components/ChatBot.tsx";

// Lazy-load heavy exam room component to keep main bundle small
const NationalExamRoom = lazy(() => import("./pages/NationalExamRoom.tsx"));

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
            <Route path="/about" element={<About />} />
            <Route path="/english" element={<English />} />
            <Route path="/english/:courseId" element={<EnglishCourse />} />
            <Route path="/english/learn/:moduleId" element={<LanguageLessonView />} />
            <Route path="/english/learn/:moduleId/:lessonId" element={<LanguageLessonView />} />
            <Route path="/chinese" element={<Chinese />} />
            <Route path="/chinese/:courseId" element={<ChineseCourse />} />
            <Route path="/chinese/learn/:moduleId" element={<LanguageLessonView />} />
            <Route path="/chinese/learn/:moduleId/:lessonId" element={<LanguageLessonView />} />
            <Route path="/programming" element={<Programming />} />
            <Route path="/programming/:moduleId" element={<ProgrammingLesson />} />
            <Route path="/programming/:moduleId/:lessonId" element={<ProgrammingLesson />} />
            <Route path="/ai-grading" element={<AIGrading />} />
            <Route path="/ielts-writing-practice" element={<IeltsWritingPractice />} />
            <Route path="/ielts-sample-essays" element={<IeltsSampleEssays />} />
            <Route path="/ielts-sample-essays/:essayId" element={<IeltsSampleEssayDetail />} />
            <Route path="/ielts-speaking-practice" element={<SpeakingPractice />} />
            <Route path="/national-exam" element={<NationalExamPrep />} />
            <Route path="/national-exam/:examId" element={<NationalExamRoom />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/ai-library" element={<AILibrary />} />
            {/* Redirects for old routes */}
            <Route path="/smart-resources" element={<Navigate to="/ai-library" replace />} />
            <Route path="/lesson-library" element={<Navigate to="/ai-library" replace />} />
            <Route path="/lesson/:resourceId" element={<LessonDetail />} />
            <Route path="/lesson/:resourceId/:lessonId" element={<LessonDetail />} />
            <Route path="/teacher-admin" element={<TeacherAdmin />} />
            <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
            <Route path="/lesson-library/:lessonId" element={<GeneratedLessonView />} />
            <Route path="/python-challenges" element={<PythonChallengeList />} />
            <Route path="/python-challenges/:challengeId" element={<PythonChallengePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatBot />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
