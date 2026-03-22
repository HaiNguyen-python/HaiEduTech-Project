import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import English from "./pages/English.tsx";
import Chinese from "./pages/Chinese.tsx";
import Programming from "./pages/Programming.tsx";
import ProgrammingLesson from "./pages/ProgrammingLesson.tsx";
import AIGrading from "./pages/AIGrading.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Register from "./pages/Register.tsx";
import Contact from "./pages/Contact.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import SmartResources from "./pages/SmartResources.tsx";
import LessonDetail from "./pages/LessonDetail.tsx";
import NotFound from "./pages/NotFound.tsx";
import ChatBot from "./components/ChatBot.tsx";

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
            <Route path="/chinese" element={<Chinese />} />
            <Route path="/programming" element={<Programming />} />
            <Route path="/programming/:moduleId" element={<ProgrammingLesson />} />
            <Route path="/programming/:moduleId/:lessonId" element={<ProgrammingLesson />} />
            <Route path="/ai-grading" element={<AIGrading />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/smart-resources" element={<SmartResources />} />
            <Route path="/lesson/:resourceId" element={<LessonDetail />} />
            <Route path="/lesson/:resourceId/:lessonId" element={<LessonDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ChatBot />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
