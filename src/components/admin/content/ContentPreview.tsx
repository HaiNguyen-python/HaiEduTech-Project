/**
 * @file ContentPreview.tsx
 * @description Learner-facing preview for articles, lessons and resources.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import DOMPurify from "dompurify";
import { FileDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  BLOCK_LABEL, type ArticleBody, type ContentDraft, type LessonBody, type ResourceBody,
} from "@/lib/contentStudio";

interface Props {
  draft: ContentDraft;
}

export default function ContentPreview({ draft }: Props) {
  const { t, lang } = useLanguage();
  const title = (lang === "en" && draft.title_en) || draft.title;

  return (
    <article className="space-y-5 text-[16px] leading-relaxed text-foreground">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold sm:text-3xl">{title || t("(chưa có tiêu đề)", "(untitled)")}</h1>
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          {draft.subject && <Badge variant="secondary">{draft.subject}</Badge>}
          {draft.level && <Badge variant="outline">{draft.level}</Badge>}
          {draft.tags?.map((tag) => (
            <Badge key={tag} variant="outline">#{tag}</Badge>
          ))}
        </div>
        {(draft.summary || draft.summary_en) && (
          <p className="text-muted-foreground">
            {(lang === "en" && draft.summary_en) || draft.summary}
          </p>
        )}
      </header>

      {draft.cover_url && (
        <img src={draft.cover_url} alt={title || ""} className="w-full rounded-lg object-cover" loading="lazy" />
      )}

      {draft.kind === "article" && (
        <div
          className="prose prose-sm max-w-none text-foreground sm:prose-base"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              ((lang === "en" && (draft.body as ArticleBody)?.html_en) ||
                (draft.body as ArticleBody)?.html ||
                "") as string,
            ),
          }}
        />
      )}

      {draft.kind === "lesson" && (
        <div className="space-y-5">
          {((draft.body as LessonBody)?.blocks ?? []).map((block, idx) => (
            <section key={block.id} className="space-y-2 rounded-lg border border-border p-4">
              <h2 className="text-lg font-semibold">
                {idx + 1}. {(lang === "en" && block.heading_en) || block.heading || (lang === "vi" ? BLOCK_LABEL[block.type].vi : BLOCK_LABEL[block.type].en)}
              </h2>
              {block.text && (
                <p className="whitespace-pre-wrap">
                  {(lang === "en" && block.text_en) || block.text}
                </p>
              )}
              {block.vocabulary && block.vocabulary.length > 0 && (
                <ul className="space-y-1.5">
                  {block.vocabulary.filter((v) => v.term).map((v, i) => (
                    <li key={i}>
                      <strong>{v.term}</strong> - {v.meaning}
                      {v.example && <em className="block text-sm text-muted-foreground">{v.example}</em>}
                    </li>
                  ))}
                </ul>
              )}
              {block.dialogue && block.dialogue.length > 0 && (
                <div className="space-y-2">
                  {block.dialogue.filter((d) => d.line).map((d, i) => (
                    <div key={i}>
                      <p><strong>{d.speaker}:</strong> {d.line}</p>
                      {d.translation && (
                        <p className="text-sm text-muted-foreground">{d.translation}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {block.quiz && block.quiz.length > 0 && (
                <ol className="space-y-3">
                  {block.quiz.filter((q) => q.question).map((q, i) => (
                    <li key={i} className="space-y-1">
                      <p className="font-medium">{i + 1}. {q.question}</p>
                      <ul className="space-y-1 pl-4">
                        {(q.options ?? []).map((o, oi) => (
                          <li key={oi} className={oi === q.correctIndex ? "font-semibold text-primary" : ""}>
                            {String.fromCharCode(65 + oi)}. {o}
                          </li>
                        ))}
                      </ul>
                      {q.explanation && (
                        <p className="text-sm text-muted-foreground">{q.explanation}</p>
                      )}
                    </li>
                  ))}
                </ol>
              )}
            </section>
          ))}
        </div>
      )}

      {draft.kind === "resource" && (
        <div className="space-y-3">
          <p className="whitespace-pre-wrap">
            {(lang === "en" && (draft.body as ResourceBody)?.description_en) ||
              (draft.body as ResourceBody)?.description ||
              ""}
          </p>
          <div className="flex items-center gap-2 rounded-md border border-border p-3">
            <FileDown className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">
              {(draft.body as ResourceBody)?.file_name || t("Chưa có tệp", "No file yet")}
            </span>
          </div>
        </div>
      )}
    </article>
  );
}
