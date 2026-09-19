/**
 * @file App.tsx
 * @description Root application component with routing for HaiEduTech Platform.
 * @author Teacher Hai (HaiEduTech)
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 * @license Private / Proprietary - No unauthorized copying or distribution.
 */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import VocabBadgeCelebration from "@/components/VocabBadgeCelebration";
import AuthGate from "@/components/AuthGate";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Suspense, useEffect, useState, type ReactNode } from "react";
import { RouteErrorBoundary } from "@/components/RouteErrorBoundary";
import { initVersionCheck } from "@/lib/versionCheck";
import { lazyWithRetry } from "@/lib/lazyWithRetry";

if (typeof window !== "undefined") initVersionCheck();

// Lazy-loaded route shells (off the critical path for first paint)
const Index = lazyWithRetry(() => import("./pages/Index.tsx"));
const Welcome = lazyWithRetry(() => import("./pages/Welcome.tsx"));
const NotFound = lazyWithRetry(() => import("./pages/NotFound.tsx"));
const PrivacyPolicy = lazyWithRetry(() => import("./pages/PrivacyPolicy.tsx"));
const TermsOfService = lazyWithRetry(() => import("./pages/TermsOfService.tsx"));
const CookieConsentBanner = lazyWithRetry(() => import("./components/gdpr/CookieConsentBanner.tsx"));

/** Decides whether to show the splash welcome or the home page on `/`. */
const RootEntry = () => {
  const welcomed = typeof window !== "undefined" && sessionStorage.getItem("haiedu_welcomed") === "1";
  return welcomed ? <Index /> : <Welcome />;
};

// Global floating widgets - lazy + deferred so they never block FCP
const ChatBot = lazyWithRetry(() => import("./components/ChatBot.tsx"));
const FloatingNotebook = lazyWithRetry(() => import("./components/FloatingNotebook.tsx"));
const LastSessionRecap = lazyWithRetry(() => import("./components/LastSessionRecap.tsx"));
const GlobalSuperDictionary = lazyWithRetry(() => import("./components/GlobalSuperDictionary.tsx"));
const SessionTracker = lazyWithRetry(() => import("./components/SessionTracker.tsx"));
const PageViewTracker = lazyWithRetry(() => import("./components/PageViewTracker.tsx"));
const LessonFeedback = lazyWithRetry(() => import("./components/LessonFeedback.tsx"));
const AssignmentReminderModal = lazyWithRetry(() => import("./components/AssignmentReminderModal.tsx"));
const PetXPToastListener = lazyWithRetry(() => import("./components/PetXPToastListener.tsx"));
const EnglishRouteParticles = lazyWithRetry(() => import("./components/EnglishRouteParticles.tsx"));
const ChineseRouteParticles = lazyWithRetry(() => import("./components/ChineseRouteParticles.tsx"));

/** Mounts children only after the browser is idle so first paint isn't blocked. */
const DeferredMount = ({ children, delay = 1200 }: { children: ReactNode; delay?: number }) => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const trigger = () => setReady(true);
    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(trigger, { timeout: delay + 1500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(trigger, delay);
    return () => window.clearTimeout(t);
  }, [delay]);
  // A failing widget chunk must never blank the page, so isolate it.
  return ready ? (
    <RouteErrorBoundary>
      <Suspense fallback={null}>{children}</Suspense>
    </RouteErrorBoundary>
  ) : null;
};

const DeferredGlobalWidgets = () => {
  const { pathname } = useLocation();
  const isAdminRoute = pathname === "/admin-dashboard" || pathname.startsWith("/admin/");

  if (isAdminRoute) {
    return (
      <DeferredMount>
        <PageViewTracker />
      </DeferredMount>
    );
  }

  return (
    <DeferredMount>
      <ChatBot />
      <FloatingNotebook />
      <LastSessionRecap />
      <GlobalSuperDictionary />
      <SessionTracker />
      <PageViewTracker />
      <LessonFeedback />
      <AssignmentReminderModal />
      <PetXPToastListener />
    </DeferredMount>
  );
};


// Lazy-load all heavy route components for optimal code splitting
const About = lazyWithRetry(() => import("./pages/About.tsx"));
const EdTechWebService = lazyWithRetry(() => import("./pages/EdTechWebService.tsx"));
const EdTechResearch = lazyWithRetry(() => import("./pages/EdTechResearch.tsx"));
const Insights = lazyWithRetry(() => import("./pages/Insights.tsx"));
const InsightPost = lazyWithRetry(() => import("./pages/InsightPost.tsx"));
const YourCorner = lazyWithRetry(() => import("./pages/YourCorner.tsx"));
const LifestyleAcademy = lazyWithRetry(() => import("./pages/LifestyleAcademy.tsx"));
const English = lazyWithRetry(() => import("./pages/English.tsx"));
const EnglishFunFacts = lazyWithRetry(() => import("./pages/EnglishFunFacts.tsx"));
const EnglishIdioms = lazyWithRetry(() => import("./pages/EnglishIdioms.tsx"));
const EnglishCourse = lazyWithRetry(() => import("./pages/EnglishCourse.tsx"));
const Chinese = lazyWithRetry(() => import("./pages/Chinese.tsx"));
const Japanese = lazyWithRetry(() => import("./pages/Japanese.tsx"));
const ChineseCourse = lazyWithRetry(() => import("./pages/ChineseCourse.tsx"));
const Programming = lazyWithRetry(() => import("./pages/Programming.tsx"));
const ProgrammingLesson = lazyWithRetry(() => import("./pages/ProgrammingLesson.tsx"));
const AIAcademy = lazyWithRetry(() => import("./pages/AIAcademy.tsx"));
const StartupHub = lazyWithRetry(() => import("./pages/StartupHub.tsx"));
const StartupRoadmap = lazyWithRetry(() => import("./pages/StartupRoadmap.tsx"));
const StartupCaseStudies = lazyWithRetry(() => import("./pages/StartupCaseStudies.tsx"));
const StartupToolkit = lazyWithRetry(() => import("./pages/StartupToolkit.tsx"));
const StartupPitchSimulator = lazyWithRetry(() => import("./pages/StartupPitchSimulator.tsx"));
const ScratchAdventure = lazyWithRetry(() => import("./pages/ScratchAdventure.tsx"));
const AIGrading = lazyWithRetry(() => import("./pages/AIGrading.tsx"));
const Dashboard = lazyWithRetry(() => import("./pages/Dashboard.tsx"));
const ActivityLog = lazyWithRetry(() => import("./pages/ActivityLog.tsx"));
const Register = lazyWithRetry(() => import("./pages/Register.tsx"));
const Contact = lazyWithRetry(() => import("./pages/Contact.tsx"));
const Unsubscribe = lazyWithRetry(() => import("./pages/Unsubscribe.tsx"));
const WorldPlayground = lazyWithRetry(() => import("./pages/WorldPlayground.tsx"));
const Login = lazyWithRetry(() => import("./pages/Login.tsx"));
const Signup = lazyWithRetry(() => import("./pages/Signup.tsx"));
const ForgotPassword = lazyWithRetry(() => import("./pages/ForgotPassword.tsx"));
const ResetPassword = lazyWithRetry(() => import("./pages/ResetPassword.tsx"));
const AILibrary = lazyWithRetry(() => import("./pages/AILibrary.tsx"));
const Vietnamese = lazyWithRetry(() => import("./pages/Vietnamese.tsx"));
const VietnameseLessonView = lazyWithRetry(() => import("./pages/VietnameseLessonView.tsx"));
const VietnameseHistoryLesson = lazyWithRetry(() => import("./pages/VietnameseHistoryLesson.tsx"));
const LessonDetail = lazyWithRetry(() => import("./pages/LessonDetail.tsx"));
const TeacherAdmin = lazyWithRetry(() => import("./pages/TeacherAdmin.tsx"));
const TeacherDashboard = lazyWithRetry(() => import("./pages/TeacherDashboard.tsx"));
const AssistantDashboard = lazyWithRetry(() => import("./pages/AssistantDashboard.tsx"));
const GeneratedLessonView = lazyWithRetry(() => import("./pages/GeneratedLessonView.tsx"));
const PythonChallengeList = lazyWithRetry(() => import("./pages/PythonChallengeList.tsx"));
const DsaCurriculum = lazyWithRetry(() => import("./pages/DsaCurriculum.tsx"));
const PythonChallengePage = lazyWithRetry(() => import("./pages/PythonChallenge.tsx"));
const InterviewQuestions = lazyWithRetry(() => import("./pages/InterviewQuestions.tsx"));
const IeltsWritingPractice = lazyWithRetry(() => import("./pages/IeltsWritingPractice.tsx"));
const IeltsSampleEssays = lazyWithRetry(() => import("./pages/IeltsSampleEssays.tsx"));
const IeltsSampleEssayDetail = lazyWithRetry(() => import("./pages/IeltsSampleEssayDetail.tsx"));
const SpeakingPractice = lazyWithRetry(() => import("./pages/SpeakingPractice.tsx"));
const IeltsVocabulary = lazyWithRetry(() => import("./pages/IeltsVocabulary.tsx"));
const FinnishVocabulary = lazyWithRetry(() => import("./pages/FinnishVocabulary.tsx"));
const VietnameseVocabulary = lazyWithRetry(() => import("./pages/VietnameseVocabulary.tsx"));
const SatVocabulary = lazyWithRetry(() => import("./pages/SatVocabulary.tsx"));
const SatExercises = lazyWithRetry(() => import("./pages/SatExercises.tsx"));
const SatExams = lazyWithRetry(() => import("./pages/SatExams.tsx"));
const SatCurriculum = lazyWithRetry(() => import("./pages/SatCurriculum.tsx"));
const SatMockExam = lazyWithRetry(() => import("./pages/SatMockExam.tsx"));
const SatErrorLog = lazyWithRetry(() => import("./pages/SatErrorLog.tsx"));
const SatDailyWarmup = lazyWithRetry(() => import("./pages/SatDailyWarmup.tsx"));
const SatReadingPace = lazyWithRetry(() => import("./pages/SatReadingPace.tsx"));
const SatTestDay = lazyWithRetry(() => import("./pages/SatTestDay.tsx"));
const VocabArena = lazyWithRetry(() => import("./pages/VocabArena.tsx"));
const NationalExamPrep = lazyWithRetry(() => import("./pages/NationalExamPrep.tsx"));
const NationalExamRoom = lazyWithRetry(() => import("./pages/NationalExamRoom.tsx"));
const ThptEssentialReview = lazyWithRetry(() => import("./pages/ThptEssentialReview.tsx"));
const AdminDashboard = lazyWithRetry(() => import("./pages/AdminDashboard.tsx"));
const AgencyAdmin = lazyWithRetry(() => import("./pages/AgencyAdmin.tsx"));
const AdminAssignments = lazyWithRetry(() => import("./pages/AdminAssignments.tsx"));
const AdminClasses = lazyWithRetry(() => import("./pages/AdminClasses.tsx"));
const AdminPlacementResults = lazyWithRetry(() => import("./pages/AdminPlacementResults.tsx"));
const PlacementTest = lazyWithRetry(() => import("./pages/PlacementTest.tsx"));
const LanguageLessonView = lazyWithRetry(() => import("./pages/LanguageLessonView.tsx"));
const ConversationalDashboard = lazyWithRetry(() => import("./pages/ConversationalDashboard.tsx"));
const ConversationalLessonView = lazyWithRetry(() => import("./pages/ConversationalLessonView.tsx"));
const ChineseConversationalDashboard = lazyWithRetry(() => import("./pages/ChineseConversationalDashboard.tsx"));
const ChineseConversationalLessonView = lazyWithRetry(() => import("./pages/ChineseConversationalLessonView.tsx"));
const ChineseCultureHub = lazyWithRetry(() => import("./pages/ChineseCultureHub.tsx"));
const HskVocabulary = lazyWithRetry(() => import("./pages/HskVocabulary.tsx"));
const ChineseArcade = lazyWithRetry(() => import("./pages/ChineseArcade.tsx"));
const ChineseReading = lazyWithRetry(() => import("./pages/ChineseReading.tsx"));
const ChineseListening = lazyWithRetry(() => import("./pages/ChineseListening.tsx"));
const VietnameseArcade = lazyWithRetry(() => import("./pages/VietnameseArcade.tsx"));
const CambridgeArcade = lazyWithRetry(() => import("./pages/CambridgeArcade.tsx"));
const ProgrammingArcade = lazyWithRetry(() => import("./pages/ProgrammingArcade.tsx"));
const PillarHub = lazyWithRetry(() => import("./pages/PillarHub.tsx"));

const FinnishArcade = lazyWithRetry(() => import("./pages/FinnishArcade.tsx"));
const MultiLangArcade = lazyWithRetry(() => import("./pages/MultiLangArcade.tsx"));
const HskHub = lazyWithRetry(() => import("./pages/HskHub.tsx"));
const HskLevelGuide = lazyWithRetry(() => import("./pages/HskLevelGuide.tsx"));
const HskGrammar = lazyWithRetry(() => import("./pages/HskGrammar.tsx"));
const HskTestHub = lazyWithRetry(() => import("./pages/HskTestHub.tsx"));
const HskTestRoom = lazyWithRetry(() => import("./pages/HskTestRoom.tsx"));
const HskkSpeakingRoom = lazyWithRetry(() => import("./pages/HskkSpeakingRoom.tsx"));
const ToneDrillRoom = lazyWithRetry(() => import("./pages/ToneDrillRoom.tsx"));
const ChinesePronunciation = lazyWithRetry(() => import("./pages/ChinesePronunciation.tsx"));
const ChineseStrokeGuide = lazyWithRetry(() => import("./pages/ChineseStrokeGuide.tsx"));
const KnowledgeHubPage = lazyWithRetry(() => import("./pages/KnowledgeHubPage.tsx"));
const FolkloreLibrary = lazyWithRetry(() => import("./pages/FolkloreLibrary.tsx"));
const VietnameseForForeigners = lazyWithRetry(() => import("./pages/VietnameseForForeigners.tsx"));
const VFFHubPro = lazyWithRetry(() => import("./pages/VFFHubPro.tsx"));
const VFFPlacementTest = lazyWithRetry(() => import("./pages/VFFPlacementTest.tsx"));
const VFFLevelPage = lazyWithRetry(() => import("./pages/VFFLevelPage.tsx"));
const VFFPronunciationLab = lazyWithRetry(() => import("./pages/VFFPronunciationLab.tsx"));
const VFFGrammarReference = lazyWithRetry(() => import("./pages/VFFGrammarReference.tsx"));
const VFFCertificate = lazyWithRetry(() => import("./pages/VFFCertificate.tsx"));
const VFFListeningLab = lazyWithRetry(() => import("./pages/VFFListeningLab.tsx"));
const VFFReadingLab = lazyWithRetry(() => import("./pages/VFFReadingLab.tsx"));
const VFFWritingLab = lazyWithRetry(() => import("./pages/VFFWritingLab.tsx"));
const VFFSpeakingRoleplay = lazyWithRetry(() => import("./pages/VFFSpeakingRoleplay.tsx"));
const VFFCultureHub = lazyWithRetry(() => import("./pages/VFFCultureHub.tsx"));
const VFFFlashcards = lazyWithRetry(() => import("./pages/VFFFlashcards.tsx"));
const VFFRoleplayAI = lazyWithRetry(() => import("./pages/VFFRoleplayAI.tsx"));
const VFFVideoLounge = lazyWithRetry(() => import("./pages/VFFVideoLounge.tsx"));
const VFFAnalytics = lazyWithRetry(() => import("./pages/VFFAnalytics.tsx"));
const VFFPlacementAdaptive = lazyWithRetry(() => import("./pages/VFFPlacementAdaptive.tsx"));

const VietnameseDictation = lazyWithRetry(() => import("./pages/VietnameseDictation.tsx"));
const VietnamesePoetry = lazyWithRetry(() => import("./pages/VietnamesePoetry.tsx"));
const VietnameseAlphabet = lazyWithRetry(() => import("./pages/VietnameseAlphabet.tsx"));
const NationalAnthem = lazyWithRetry(() => import("./pages/NationalAnthem.tsx"));
const VietnameseHolidays = lazyWithRetry(() => import("./pages/VietnameseHolidays.tsx"));
const VietnameseCuisine = lazyWithRetry(() => import("./pages/VietnameseCuisine.tsx"));
const VietnameseRegions = lazyWithRetry(() => import("./pages/VietnameseRegions.tsx"));
const VietnameseCulture = lazyWithRetry(() => import("./pages/VietnameseCulture.tsx"));
const VietnameseFilms = lazyWithRetry(() => import("./pages/VietnameseFilms.tsx"));
const VietnameseKids = lazyWithRetry(() => import("./pages/VietnameseKids.tsx"));
const VietnamesePhrasebook = lazyWithRetry(() => import("./pages/VietnamesePhrasebook.tsx"));
const VietnameseDaily = lazyWithRetry(() => import("./pages/VietnameseDaily.tsx"));
const IeltsLectures = lazyWithRetry(() => import("./pages/IeltsLectures.tsx"));
const IeltsListeningPractice = lazyWithRetry(() => import("./pages/IeltsListeningPractice.tsx"));
const IeltsReadingPractice = lazyWithRetry(() => import("./pages/IeltsReadingPractice.tsx"));
const IeltsSkillsPractice = lazyWithRetry(() => import("./pages/IeltsSkillsPractice.tsx"));
const IeltsPerformance = lazyWithRetry(() => import("./pages/IeltsPerformance.tsx"));
const MyPath = lazyWithRetry(() => import("./pages/MyPath.tsx"));
const MyPathOnboarding = lazyWithRetry(() => import("./pages/MyPathOnboarding.tsx"));


const IeltsLectureView = lazyWithRetry(() => import("./pages/IeltsLectureView.tsx"));
const IeltsLectureCategory = lazyWithRetry(() => import("./pages/IeltsLectureCategory.tsx"));
const IeltsMasterQuiz = lazyWithRetry(() => import("./pages/IeltsMasterQuiz.tsx"));
const ToeicLectures = lazyWithRetry(() => import("./pages/ToeicLectures.tsx"));
const ToeicHub = lazyWithRetry(() => import("./pages/ToeicHub.tsx"));
const ToeicLectureView = lazyWithRetry(() => import("./pages/ToeicLectureView.tsx"));
const CambridgeLectures = lazyWithRetry(() => import("./pages/CambridgeLectures.tsx"));
const CambridgeLectureView = lazyWithRetry(() => import("./pages/CambridgeLectureView.tsx"));
const ToeicVocabulary = lazyWithRetry(() => import("./pages/ToeicVocabulary.tsx"));
const ToeicExams = lazyWithRetry(() => import("./pages/ToeicExams.tsx"));
const ToeicExamRoom = lazyWithRetry(() => import("./pages/ToeicExamRoom.tsx"));
const Finnish = lazyWithRetry(() => import("./pages/Finnish.tsx"));
const Swedish = lazyWithRetry(() => import("./pages/Swedish.tsx"));
const SwedishBeginner = lazyWithRetry(() => import("./pages/SwedishBeginner.tsx"));
const SwedishYkiA2 = lazyWithRetry(() => import("./pages/SwedishYkiA2.tsx"));
const SwedishYkiB1 = lazyWithRetry(() => import("./pages/SwedishYkiB1.tsx"));
const SwedishSvenskfinland = lazyWithRetry(() => import("./pages/SwedishSvenskfinland.tsx"));
const SwedishInteractiveCurriculum = lazyWithRetry(() => import("./pages/SwedishInteractiveCurriculum.tsx"));
const SwedishVocabulary = lazyWithRetry(() => import("./pages/SwedishVocabulary.tsx"));
const SwedishWritingLab = lazyWithRetry(() => import("./pages/SwedishWritingLab.tsx"));
const SwedishSpeakingLab = lazyWithRetry(() => import("./pages/SwedishSpeakingLab.tsx"));
const SwedishListeningLab = lazyWithRetry(() => import("./pages/SwedishListeningLab.tsx"));
const SwedishReadingLab = lazyWithRetry(() => import("./pages/SwedishReadingLab.tsx"));
const SwedishSkillsLab = lazyWithRetry(() => import("./pages/SwedishSkillsLab.tsx"));
const SwedishPerformance = lazyWithRetry(() => import("./pages/SwedishPerformance.tsx"));
const YkiDashboard = lazyWithRetry(() => import("./pages/YkiDashboard.tsx"));
const FinnishBeginner = lazyWithRetry(() => import("./pages/FinnishBeginner.tsx"));
const YkiB1Dashboard = lazyWithRetry(() => import("./pages/YkiB1Dashboard.tsx"));
const LifeInFinland = lazyWithRetry(() => import("./pages/LifeInFinland.tsx"));
const SpeakingCoachPage = lazyWithRetry(() => import("./pages/SpeakingCoachPage.tsx"));
const PresentationStudio = lazyWithRetry(() => import("./pages/PresentationStudio.tsx"));
const EnglishGrammar = lazyWithRetry(() => import("./pages/EnglishGrammar.tsx"));
const NotebookPage = lazyWithRetry(() => import("./pages/Notebook.tsx"));
const CambridgeMockExamPage = lazyWithRetry(() => import("./pages/CambridgeMockExam.tsx"));
const CambridgeYleTestPrep = lazyWithRetry(() => import("./pages/CambridgeYleTestPrep.tsx"));
const CambridgeYleVocabulary = lazyWithRetry(() => import("./pages/CambridgeYleVocabulary.tsx"));
const CambridgeSpeakingPractice = lazyWithRetry(() => import("./pages/CambridgeSpeakingPractice.tsx"));
const JobOpportunities = lazyWithRetry(() => import("./pages/JobOpportunities.tsx"));
const CareerRoadmap = lazyWithRetry(() => import("./pages/CareerRoadmap.tsx"));
const PteHub = lazyWithRetry(() => import("./pages/PteHub.tsx"));
const PteSpeaking = lazyWithRetry(() => import("./pages/PteSpeaking.tsx"));
const PteWriting = lazyWithRetry(() => import("./pages/PteWriting.tsx"));
const PteReading = lazyWithRetry(() => import("./pages/PteReading.tsx"));
const PteListening = lazyWithRetry(() => import("./pages/PteListening.tsx"));
const PtePlaceholder = lazyWithRetry(() => import("./pages/PtePlaceholder.tsx"));
const PteVocabulary = lazyWithRetry(() => import("./pages/PteVocabulary.tsx"));
const PteLessons = lazyWithRetry(() => import("./pages/PteLessons.tsx"));
const PteLessonView = lazyWithRetry(() => import("./pages/PteLessonView.tsx"));
const PythonLessonView = lazyWithRetry(() => import("./pages/PythonLessonView.tsx"));
const StudyAbroadHub = lazyWithRetry(() => import("./pages/StudyAbroadHub.tsx"));
const StudentDocuments = lazyWithRetry(() => import("./pages/StudentDocuments.tsx"));
const MotivationLetterGuide = lazyWithRetry(() => import("./pages/MotivationLetterGuide.tsx"));
const CVBuilder = lazyWithRetry(() => import("./pages/CVBuilder.tsx"));
const SatRoadmap = lazyWithRetry(() => import("./pages/SatRoadmap.tsx"));
const PhdGlobalPathway = lazyWithRetry(() => import("./pages/PhdGlobalPathway.tsx"));
const MentorHub = lazyWithRetry(() => import("./pages/MentorHub.tsx"));
const PreDepartureChecklist = lazyWithRetry(() => import("./pages/PreDepartureChecklist.tsx"));
const UniversityShortlister = lazyWithRetry(() => import("./pages/UniversityShortlister.tsx"));
const InterviewPrep = lazyWithRetry(() => import("./pages/InterviewPrep.tsx"));
const CostCalculator = lazyWithRetry(() => import("./pages/CostCalculator.tsx"));
const JourneyDashboard = lazyWithRetry(() => import("./pages/JourneyDashboard.tsx"));
const SoftwareEngInterview = lazyWithRetry(() => import("./pages/SoftwareEngInterview.tsx"));
const SongsLibraryPage = lazyWithRetry(() => import("./pages/SongsLibraryPage.tsx"));
const SpecializedLanguage = lazyWithRetry(() => import("./pages/SpecializedLanguage.tsx"));
const EnglishPronunciation = lazyWithRetry(() => import("./pages/EnglishPronunciation.tsx"));
const EnglishEssentials = lazyWithRetry(() => import("./pages/EnglishEssentials.tsx"));
const BusinessEnglish = lazyWithRetry(() => import("./pages/BusinessEnglish.tsx"));
const PurposeEnglishCertificate = lazyWithRetry(() => import("./pages/PurposeEnglishCertificate.tsx"));
const CertificateVerify = lazyWithRetry(() => import("./pages/CertificateVerify.tsx"));
const AcademicEnglish = lazyWithRetry(() => import("./pages/AcademicEnglish.tsx"));

// Shared loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-3">
      <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
    </div>
  </div>
);

// Wrapper for lazy routes — Suspense for code-splitting + per-route error boundary
// so a single page crash never blacks out the whole app.
const LazyRoute = ({ children }: { children: React.ReactNode }) => (
  <RouteErrorBoundary>
    <Suspense fallback={<PageLoader />}>{children}</Suspense>
  </RouteErrorBoundary>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <VocabBadgeCelebration />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AuthGate>
          <Routes>
            <Route path="/" element={<LazyRoute><RootEntry /></LazyRoute>} />
            <Route path="/home" element={<LazyRoute><Index /></LazyRoute>} />
            <Route path="/welcome" element={<LazyRoute><Welcome /></LazyRoute>} />

            <Route path="/about" element={<LazyRoute><About /></LazyRoute>} />
            <Route path="/dich-vu-web" element={<LazyRoute><EdTechWebService /></LazyRoute>} />
            <Route path="/agency-admin" element={<LazyRoute><AgencyAdmin /></LazyRoute>} />
            <Route path="/edtech-research" element={<LazyRoute><EdTechResearch /></LazyRoute>} />
            <Route path="/insights" element={<LazyRoute><Insights /></LazyRoute>} />
            <Route path="/insights/:slug" element={<LazyRoute><InsightPost /></LazyRoute>} />
            <Route path="/your-corner" element={<LazyRoute><YourCorner /></LazyRoute>} />
            <Route path="/lifestyle-academy" element={<LazyRoute><LifestyleAcademy /></LazyRoute>} />
            <Route path="/english" element={<LazyRoute><English /></LazyRoute>} />
            <Route path="/english/fun-facts" element={<LazyRoute><EnglishFunFacts /></LazyRoute>} />
            <Route path="/english/idioms" element={<LazyRoute><EnglishIdioms /></LazyRoute>} />
            <Route path="/english/conversational/curriculum" element={<LazyRoute><ConversationalDashboard /></LazyRoute>} />
            <Route path="/english/conversational/learn/:lessonId" element={<LazyRoute><ConversationalLessonView /></LazyRoute>} />
           <Route path="/english/grammar" element={<LazyRoute><EnglishGrammar /></LazyRoute>} />
           <Route path="/english/pronunciation" element={<LazyRoute><EnglishPronunciation /></LazyRoute>} />
            <Route path="/english/essentials" element={<LazyRoute><EnglishEssentials /></LazyRoute>} />
            <Route path="/english/business" element={<LazyRoute><BusinessEnglish /></LazyRoute>} />
            <Route path="/english/academic" element={<LazyRoute><AcademicEnglish /></LazyRoute>} />
            <Route path="/english/business/certificate" element={<LazyRoute><PurposeEnglishCertificate track="business" /></LazyRoute>} />
            <Route path="/english/academic/certificate" element={<LazyRoute><PurposeEnglishCertificate track="academic" /></LazyRoute>} />
            <Route path="/english/:courseId" element={<LazyRoute><EnglishCourse /></LazyRoute>} />

            <Route path="/english/learn/:moduleId" element={<LazyRoute><LanguageLessonView /></LazyRoute>} />
            <Route path="/english/learn/:moduleId/:lessonId" element={<LazyRoute><LanguageLessonView /></LazyRoute>} />
            <Route path="/chinese" element={<LazyRoute><Chinese /></LazyRoute>} />
            <Route path="/japanese" element={<LazyRoute><Japanese /></LazyRoute>} />
            <Route path="/chinese/conversational/curriculum" element={<LazyRoute><ChineseConversationalDashboard /></LazyRoute>} />
            <Route path="/chinese/conversational/learn/:lessonId" element={<LazyRoute><ChineseConversationalLessonView /></LazyRoute>} />
            <Route path="/chinese/culture" element={<LazyRoute><ChineseCultureHub /></LazyRoute>} />
            <Route path="/chinese/:courseId" element={<LazyRoute><ChineseCourse /></LazyRoute>} />
            <Route path="/chinese/hsk/vocabulary" element={<LazyRoute><HskVocabulary /></LazyRoute>} />
            <Route path="/chinese/arcade" element={<LazyRoute><ChineseArcade /></LazyRoute>} />
            <Route path="/chinese/reading" element={<LazyRoute><ChineseReading /></LazyRoute>} />
            <Route path="/chinese/listening" element={<LazyRoute><ChineseListening /></LazyRoute>} />
            <Route path="/learn-vietnamese/arcade" element={<LazyRoute><VietnameseArcade /></LazyRoute>} />
            <Route path="/english/arcade" element={<Navigate to="/cambridge/arcade" replace />} />
            <Route path="/finnish/arcade" element={<LazyRoute><FinnishArcade /></LazyRoute>} />
            <Route path="/cambridge/arcade" element={<LazyRoute><CambridgeArcade /></LazyRoute>} />
            <Route path="/arcade-plus" element={<LazyRoute><MultiLangArcade /></LazyRoute>} />
            <Route path="/chinese/hsk-guide" element={<LazyRoute><HskHub /></LazyRoute>} />
            <Route path="/chinese/hsk-guide/:level" element={<LazyRoute><HskLevelGuide /></LazyRoute>} />
            <Route path="/chinese/hsk-grammar" element={<LazyRoute><HskGrammar /></LazyRoute>} />
            <Route path="/chinese/hsk/test" element={<LazyRoute><HskTestHub /></LazyRoute>} />
            <Route path="/chinese/hsk/test/:level" element={<LazyRoute><HskTestRoom /></LazyRoute>} />
            <Route path="/chinese/hsk/test/:level/:code" element={<LazyRoute><HskTestRoom /></LazyRoute>} />
            <Route path="/chinese/hskk" element={<LazyRoute><HskkSpeakingRoom /></LazyRoute>} />
            <Route path="/chinese/tone-drill" element={<LazyRoute><ToneDrillRoom /></LazyRoute>} />
            <Route path="/chinese/pronunciation" element={<LazyRoute><ChinesePronunciation /></LazyRoute>} />
            <Route path="/chinese/strokes" element={<LazyRoute><ChineseStrokeGuide /></LazyRoute>} />
            <Route path="/chinese/learn/:moduleId" element={<LazyRoute><LanguageLessonView /></LazyRoute>} />
            <Route path="/chinese/learn/:moduleId/:lessonId" element={<LazyRoute><LanguageLessonView /></LazyRoute>} />
            <Route path="/programming" element={<LazyRoute><Programming /></LazyRoute>} />
            <Route path="/programming/arcade" element={<LazyRoute><ProgrammingArcade /></LazyRoute>} />
            <Route path="/programming/ai-academy" element={<LazyRoute><AIAcademy /></LazyRoute>} />
            <Route path="/ai-academy" element={<Navigate to="/programming/ai-academy" replace />} />
            <Route path="/programming/startup" element={<LazyRoute><StartupHub /></LazyRoute>} />
            <Route path="/programming/startup/roadmap" element={<LazyRoute><StartupRoadmap /></LazyRoute>} />
            <Route path="/programming/startup/case-studies" element={<LazyRoute><StartupCaseStudies /></LazyRoute>} />
            <Route path="/programming/startup/toolkit" element={<LazyRoute><StartupToolkit /></LazyRoute>} />
            <Route path="/programming/startup/pitch-simulator" element={<LazyRoute><StartupPitchSimulator /></LazyRoute>} />
            <Route path="/programming/scratch-adventure" element={<LazyRoute><ScratchAdventure /></LazyRoute>} />
            <Route path="/programming/nlp" element={<LazyRoute><PillarHub /></LazyRoute>} />
            <Route path="/programming/edtech" element={<LazyRoute><PillarHub /></LazyRoute>} />
            <Route path="/programming/software-eng" element={<LazyRoute><PillarHub /></LazyRoute>} />
            <Route path="/programming/cybersecurity" element={<LazyRoute><PillarHub /></LazyRoute>} />
            {/* Specific routes MUST come before dynamic :moduleId to avoid shadowing */}
            <Route path="/programming/python/:lessonId" element={<LazyRoute><PythonLessonView /></LazyRoute>} />
            <Route path="/programming/:moduleId" element={<LazyRoute><ProgrammingLesson /></LazyRoute>} />
            <Route path="/programming/:moduleId/:lessonId" element={<LazyRoute><ProgrammingLesson /></LazyRoute>} />
            <Route path="/ai-grading" element={<LazyRoute><AIGrading /></LazyRoute>} />
            <Route path="/ielts-writing-practice" element={<LazyRoute><IeltsWritingPractice /></LazyRoute>} />
            <Route path="/ielts-sample-essays" element={<LazyRoute><IeltsSampleEssays /></LazyRoute>} />
            <Route path="/ielts-sample-essays/:essayId" element={<LazyRoute><IeltsSampleEssayDetail /></LazyRoute>} />
            <Route path="/ielts-speaking-practice" element={<LazyRoute><SpeakingPractice /></LazyRoute>} />
            <Route path="/ielts-vocabulary" element={<LazyRoute><IeltsVocabulary /></LazyRoute>} />
            <Route path="/finnish-vocabulary" element={<LazyRoute><FinnishVocabulary /></LazyRoute>} />
            <Route path="/sat-vocabulary" element={<LazyRoute><SatVocabulary /></LazyRoute>} />
            <Route path="/sat-exercises" element={<LazyRoute><SatExercises /></LazyRoute>} />
            <Route path="/sat-exams" element={<LazyRoute><SatExams /></LazyRoute>} />
            <Route path="/sat-curriculum" element={<LazyRoute><SatCurriculum /></LazyRoute>} />
            <Route path="/sat-exams/:examId" element={<LazyRoute><SatMockExam /></LazyRoute>} />
            <Route path="/sat/error-log" element={<LazyRoute><SatErrorLog /></LazyRoute>} />
            <Route path="/sat/daily-warmup" element={<LazyRoute><SatDailyWarmup /></LazyRoute>} />
            <Route path="/sat/reading-pace" element={<LazyRoute><SatReadingPace /></LazyRoute>} />
            <Route path="/sat/test-day" element={<LazyRoute><SatTestDay /></LazyRoute>} />
            <Route path="/ielts-lectures" element={<LazyRoute><IeltsLectures /></LazyRoute>} />
            <Route path="/ielts-lectures/master-quiz" element={<LazyRoute><IeltsMasterQuiz /></LazyRoute>} />
            <Route path="/ielts-lectures/category/:category" element={<LazyRoute><IeltsLectureCategory /></LazyRoute>} />
            <Route path="/ielts-lectures/:lectureId" element={<LazyRoute><IeltsLectureView /></LazyRoute>} />
            <Route path="/ielts-listening-practice" element={<LazyRoute><IeltsListeningPractice /></LazyRoute>} />
            <Route path="/ielts-reading-practice" element={<LazyRoute><IeltsReadingPractice /></LazyRoute>} />
            <Route path="/ielts-skills-practice" element={<LazyRoute><IeltsSkillsPractice /></LazyRoute>} />
            <Route path="/ielts-performance" element={<LazyRoute><IeltsPerformance /></LazyRoute>} />
            <Route path="/my-path" element={<LazyRoute><MyPath /></LazyRoute>} />
            <Route path="/my-path/start" element={<LazyRoute><MyPathOnboarding /></LazyRoute>} />


            <Route path="/toeic" element={<LazyRoute><ToeicHub /></LazyRoute>} />
            <Route path="/toeic-lectures" element={<LazyRoute><ToeicLectures /></LazyRoute>} />
            <Route path="/toeic-lectures/:lectureId" element={<LazyRoute><ToeicLectureView /></LazyRoute>} />
            <Route path="/toeic-vocabulary" element={<LazyRoute><ToeicVocabulary /></LazyRoute>} />
            <Route path="/toeic-exams" element={<LazyRoute><ToeicExams /></LazyRoute>} />
            <Route path="/toeic-exam/:examId" element={<LazyRoute><ToeicExamRoom /></LazyRoute>} />
            <Route path="/cambridge-lectures" element={<LazyRoute><CambridgeLectures /></LazyRoute>} />
            <Route path="/cambridge-lectures/:lectureId" element={<LazyRoute><CambridgeLectureView /></LazyRoute>} />
            <Route path="/cambridge-mock-exam/:examId" element={<LazyRoute><CambridgeMockExamPage /></LazyRoute>} />
            <Route path="/cambridge-yle-test-prep" element={<LazyRoute><CambridgeYleTestPrep /></LazyRoute>} />
            <Route path="/cambridge-yle-vocabulary" element={<LazyRoute><CambridgeYleVocabulary /></LazyRoute>} />
            <Route path="/cambridge-speaking-practice" element={<LazyRoute><CambridgeSpeakingPractice /></LazyRoute>} />
            <Route path="/vocab-arena" element={<LazyRoute><VocabArena /></LazyRoute>} />
            <Route path="/national-exam" element={<LazyRoute><NationalExamPrep /></LazyRoute>} />
            <Route path="/national-exam/essential-review" element={<LazyRoute><ThptEssentialReview /></LazyRoute>} />
            <Route path="/national-exam/:examId" element={<LazyRoute><NationalExamRoom /></LazyRoute>} />
            <Route path="/dashboard" element={<LazyRoute><Dashboard /></LazyRoute>} />
            <Route path="/activity-log" element={<LazyRoute><ActivityLog /></LazyRoute>} />
            <Route path="/register" element={<LazyRoute><Register /></LazyRoute>} />
            <Route path="/contact" element={<LazyRoute><Contact /></LazyRoute>} />
            <Route path="/unsubscribe" element={<LazyRoute><Unsubscribe /></LazyRoute>} />
            <Route path="/world-playground" element={<LazyRoute><WorldPlayground /></LazyRoute>} />
            <Route path="/for-vietnamese-children" element={<Navigate to="/world-playground" replace />} />
            <Route path="/login" element={<LazyRoute><Login /></LazyRoute>} />
            <Route path="/signup" element={<LazyRoute><Signup /></LazyRoute>} />
            <Route path="/forgot-password" element={<LazyRoute><ForgotPassword /></LazyRoute>} />
            <Route path="/reset-password" element={<LazyRoute><ResetPassword /></LazyRoute>} />
            <Route path="/ai-library" element={<LazyRoute><AILibrary /></LazyRoute>} />
            <Route path="/learn-vietnamese" element={<LazyRoute><Vietnamese /></LazyRoute>} />
            <Route path="/learn-vietnamese/vocabulary" element={<LazyRoute><VietnameseVocabulary /></LazyRoute>} />
            <Route path="/learn-vietnamese/module/:moduleId" element={<LazyRoute><VietnameseLessonView /></LazyRoute>} />
            <Route path="/learn-vietnamese/module/:moduleId/:lessonId" element={<LazyRoute><VietnameseLessonView /></LazyRoute>} />
            <Route path="/learn-vietnamese/history/:lessonId" element={<LazyRoute><VietnameseHistoryLesson /></LazyRoute>} />
            <Route path="/learn-vietnamese/folklore" element={<LazyRoute><FolkloreLibrary /></LazyRoute>} />
            <Route path="/learn-vietnamese/folklore/:storyId" element={<LazyRoute><FolkloreLibrary /></LazyRoute>} />
            <Route path="/learn-vietnamese/for-foreigners" element={<LazyRoute><VFFHubPro /></LazyRoute>} />
            <Route path="/learn-vietnamese/for-foreigners/placement" element={<LazyRoute><VFFPlacementTest /></LazyRoute>} />
            <Route path="/learn-vietnamese/for-foreigners/a1" element={<LazyRoute><VFFLevelPage levelKey="a1" /></LazyRoute>} />
            <Route path="/learn-vietnamese/for-foreigners/b1" element={<LazyRoute><VFFLevelPage levelKey="b1" /></LazyRoute>} />
            <Route path="/learn-vietnamese/for-foreigners/a2" element={<LazyRoute><VFFLevelPage levelKey="a2" /></LazyRoute>} />
            <Route path="/learn-vietnamese/for-foreigners/a2-legacy" element={<LazyRoute><VietnameseForForeigners /></LazyRoute>} />
            <Route path="/learn-vietnamese/for-foreigners/lab/pronunciation" element={<LazyRoute><VFFPronunciationLab /></LazyRoute>} />
            <Route path="/learn-vietnamese/for-foreigners/lab/grammar" element={<LazyRoute><VFFGrammarReference /></LazyRoute>} />
            <Route path="/learn-vietnamese/for-foreigners/lab/listening" element={<LazyRoute><VFFListeningLab /></LazyRoute>} />
            <Route path="/learn-vietnamese/for-foreigners/lab/reading" element={<LazyRoute><VFFReadingLab /></LazyRoute>} />
            <Route path="/learn-vietnamese/for-foreigners/lab/writing" element={<LazyRoute><VFFWritingLab /></LazyRoute>} />
            <Route path="/learn-vietnamese/for-foreigners/lab/roleplay" element={<LazyRoute><VFFSpeakingRoleplay /></LazyRoute>} />
            <Route path="/learn-vietnamese/for-foreigners/lab/culture" element={<LazyRoute><VFFCultureHub /></LazyRoute>} />
            <Route path="/learn-vietnamese/for-foreigners/lab/flashcards" element={<LazyRoute><VFFFlashcards /></LazyRoute>} />
            <Route path="/learn-vietnamese/for-foreigners/lab/roleplay-ai" element={<LazyRoute><VFFRoleplayAI /></LazyRoute>} />
            <Route path="/learn-vietnamese/for-foreigners/lab/video" element={<LazyRoute><VFFVideoLounge /></LazyRoute>} />
            <Route path="/learn-vietnamese/for-foreigners/analytics" element={<LazyRoute><VFFAnalytics /></LazyRoute>} />
            <Route path="/learn-vietnamese/for-foreigners/placement-adaptive" element={<LazyRoute><VFFPlacementAdaptive /></LazyRoute>} />
            <Route path="/learn-vietnamese/for-foreigners/certificate" element={<LazyRoute><VFFCertificate /></LazyRoute>} />

            <Route path="/learn-vietnamese/for-foreigners/legacy" element={<LazyRoute><VietnameseForForeigners /></LazyRoute>} />
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
            <Route path="/swedish" element={<LazyRoute><Swedish /></LazyRoute>} />
            <Route path="/swedish/beginner" element={<LazyRoute><SwedishBeginner /></LazyRoute>} />
            <Route path="/swedish/yki-a2" element={<LazyRoute><SwedishYkiA2 /></LazyRoute>} />
            <Route path="/swedish/yki-b1" element={<LazyRoute><SwedishYkiB1 /></LazyRoute>} />
            <Route path="/swedish/svenskfinland" element={<LazyRoute><SwedishSvenskfinland /></LazyRoute>} />
            <Route path="/swedish/curriculum" element={<LazyRoute><SwedishInteractiveCurriculum /></LazyRoute>} />
            <Route path="/swedish/vocabulary" element={<LazyRoute><SwedishVocabulary /></LazyRoute>} />
            <Route path="/swedish/writing" element={<LazyRoute><SwedishWritingLab /></LazyRoute>} />
            <Route path="/swedish/speaking" element={<LazyRoute><SwedishSpeakingLab /></LazyRoute>} />
            <Route path="/swedish/listening" element={<LazyRoute><SwedishListeningLab /></LazyRoute>} />
            <Route path="/swedish/reading" element={<LazyRoute><SwedishReadingLab /></LazyRoute>} />
            <Route path="/swedish/skills" element={<LazyRoute><SwedishSkillsLab /></LazyRoute>} />
            <Route path="/swedish/performance" element={<LazyRoute><SwedishPerformance /></LazyRoute>} />

            <Route path="/presentation-studio" element={<LazyRoute><PresentationStudio /></LazyRoute>} />
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
            <Route path="/admin" element={<LazyRoute><AdminDashboard /></LazyRoute>} />
            <Route path="/assistant" element={<LazyRoute><AssistantDashboard /></LazyRoute>} />
            <Route path="/admin/assignments" element={<LazyRoute><AdminAssignments /></LazyRoute>} />
            <Route path="/admin/classes" element={<LazyRoute><AdminClasses /></LazyRoute>} />
            <Route path="/admin/placement-test-results" element={<LazyRoute><AdminPlacementResults /></LazyRoute>} />
            <Route path="/placement-test" element={<LazyRoute><PlacementTest /></LazyRoute>} />
            <Route path="/lesson-library/:lessonId" element={<LazyRoute><GeneratedLessonView /></LazyRoute>} />
            <Route path="/python-challenges" element={<LazyRoute><PythonChallengeList /></LazyRoute>} />
            <Route path="/python-challenges/:challengeId" element={<LazyRoute><PythonChallengePage /></LazyRoute>} />
            <Route path="/programming/basic/dsa" element={<LazyRoute><DsaCurriculum /></LazyRoute>} />
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
            <Route path="/pte/lessons" element={<LazyRoute><PteLessons /></LazyRoute>} />
            <Route path="/pte/lessons/:lessonId" element={<LazyRoute><PteLessonView /></LazyRoute>} />
            <Route path="/pte/:skill" element={<LazyRoute><PtePlaceholder /></LazyRoute>} />
            <Route path="/study-abroad" element={<LazyRoute><StudyAbroadHub /></LazyRoute>} />
            <Route path="/study-abroad/documents" element={<LazyRoute><StudentDocuments /></LazyRoute>} />
            <Route path="/study-abroad/motivation-letter" element={<LazyRoute><MotivationLetterGuide /></LazyRoute>} />
            <Route path="/study-abroad/cv" element={<LazyRoute><CVBuilder /></LazyRoute>} />
            <Route path="/study-abroad/sat" element={<LazyRoute><SatRoadmap /></LazyRoute>} />
            <Route path="/study-abroad/phd" element={<LazyRoute><PhdGlobalPathway /></LazyRoute>} />
            <Route path="/study-abroad/mentor-hub" element={<LazyRoute><MentorHub /></LazyRoute>} />
            <Route path="/study-abroad/checklist" element={<LazyRoute><PreDepartureChecklist /></LazyRoute>} />
            <Route path="/study-abroad/shortlister" element={<LazyRoute><UniversityShortlister /></LazyRoute>} />
            <Route path="/study-abroad/interview-prep" element={<LazyRoute><InterviewPrep /></LazyRoute>} />
            <Route path="/study-abroad/cost-calculator" element={<LazyRoute><CostCalculator /></LazyRoute>} />
            <Route path="/study-abroad/journey" element={<LazyRoute><JourneyDashboard /></LazyRoute>} />
            <Route path="/songs/:lang" element={<LazyRoute><SongsLibraryPage /></LazyRoute>} />
            <Route path="/specialized-language" element={<LazyRoute><SpecializedLanguage /></LazyRoute>} />
            {/* /unsubscribe is registered earlier — duplicate removed */}
            <Route path="/privacy" element={<LazyRoute><PrivacyPolicy /></LazyRoute>} />
            <Route path="/terms" element={<LazyRoute><TermsOfService /></LazyRoute>} />
            <Route path="*" element={<LazyRoute><NotFound /></LazyRoute>} />
          </Routes>
          </AuthGate>
          <Suspense fallback={null}><EnglishRouteParticles /></Suspense>
          <Suspense fallback={null}><ChineseRouteParticles /></Suspense>
          <DeferredGlobalWidgets />
          <Suspense fallback={null}><CookieConsentBanner /></Suspense>


        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
