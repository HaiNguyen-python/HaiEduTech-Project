// Dedicated Songs Library page — wraps SongLibrary with Navbar/Footer
import { useParams, Navigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SongLibrary from "@/components/songs/SongLibrary";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const VALID = ["english", "chinese", "finnish", "vietnamese"] as const;
type Lang = (typeof VALID)[number];

const BACK_TO: Record<Lang, { to: string; viLabel: string; enLabel: string }> = {
  english: { to: "/english", viLabel: "Quay lại Tiếng Anh", enLabel: "Back to English" },
  chinese: { to: "/chinese", viLabel: "Quay lại Tiếng Trung", enLabel: "Back to Chinese" },
  finnish: { to: "/finnish", viLabel: "Quay lại Tiếng Phần Lan", enLabel: "Back to Finnish" },
  vietnamese: { to: "/learn-vietnamese", viLabel: "Quay lại Tiếng Việt", enLabel: "Back to Vietnamese" },
};

const SongsLibraryPage = () => {
  const { lang } = useParams<{ lang: string }>();
  const { t } = useLanguage();
  if (!lang || !(VALID as readonly string[]).includes(lang)) {
    return <Navigate to="/" replace />;
  }
  const language = lang as Lang;
  const back = BACK_TO[language];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 lg:pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <Link to={back.to}>
            <Button variant="ghost" size="sm" className="mb-4 gap-2">
              <ArrowLeft className="w-4 h-4" />
              {t(back.viLabel, back.enLabel)}
            </Button>
          </Link>
          <SongLibrary key={language} language={language} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SongsLibraryPage;
