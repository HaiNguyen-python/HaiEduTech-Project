import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp, History, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface WritingAttempt {
  id: string;
  created_at: string;
  task_type: number;
  prompt: string;
  essay: string;
  word_count: number;
  overall_score: number | null;
  result: any;
}

const WritingHistory = () => {
  const { t } = useLanguage();
  const [attempts, setAttempts] = useState<WritingAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetchAttempts();
  }, []);

  const fetchAttempts = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoading(false); return; }

      const { data, error } = await supabase
        .from("writing_attempts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) throw error;
      setAttempts((data as WritingAttempt[]) || []);
    } catch (e) {
      console.error("Error fetching writing history:", e);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number | null) => {
    if (!score) return "text-muted-foreground";
    if (score >= 7) return "text-green-500";
    if (score >= 6) return "text-yellow-500";
    return "text-red-500";
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          {t("Đang tải...", "Loading...")}
        </CardContent>
      </Card>
    );
  }

  if (attempts.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          <History className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p>{t("Chưa có bài viết nào. Hãy bắt đầu luyện tập!", "No attempts yet. Start practicing!")}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <History className="w-5 h-5" />
          {t("Lịch sử luyện viết", "Writing History")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {attempts.map((attempt) => (
          <div key={attempt.id} className="border rounded-lg overflow-hidden">
            <button
              className="w-full flex items-center justify-between p-3 hover:bg-muted/50 transition-colors text-left"
              onClick={() => setExpandedId(expandedId === attempt.id ? null : attempt.id)}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">
                    Task {attempt.task_type} - {attempt.word_count} {t("từ", "words")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(attempt.created_at).toLocaleDateString("vi-VN", {
                      day: "2-digit", month: "2-digit", year: "numeric",
                      hour: "2-digit", minute: "2-digit"
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {attempt.overall_score && (
                  <span className={`text-sm font-bold ${getScoreColor(attempt.overall_score)}`}>
                    Band {attempt.overall_score}
                  </span>
                )}
                {expandedId === attempt.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>
            <AnimatePresence>
              {expandedId === attempt.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t"
                >
                  <div className="p-3 space-y-3 text-sm">
                    <div>
                      <p className="font-medium text-muted-foreground mb-1">{t("Đề bài:", "Prompt:")}</p>
                      <p className="text-xs">{attempt.prompt.slice(0, 200)}...</p>
                    </div>
                    <div>
                      <p className="font-medium text-muted-foreground mb-1">{t("Bài viết:", "Essay:")}</p>
                      <p className="text-xs whitespace-pre-wrap">{attempt.essay.slice(0, 300)}...</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default WritingHistory;
