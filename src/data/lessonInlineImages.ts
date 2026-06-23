// Per-lesson inline illustrations. Injected into theory markdown right after the
// first H2 so the picture sits next to the conceptual explanation rather than
// the intro paragraph. Captions are bilingual (EN used as alt for SEO).
import seSdlc from "@/assets/programming-modules/lesson-se-sdlc.jpg";
import seSystem from "@/assets/programming-modules/lesson-se-system-design.jpg";
import seGit from "@/assets/programming-modules/lesson-se-git.jpg";
import seClean from "@/assets/programming-modules/lesson-se-clean-code.jpg";
import seTesting from "@/assets/programming-modules/lesson-se-testing.jpg";
import seCicd from "@/assets/programming-modules/lesson-se-cicd.jpg";
import seSecurity from "@/assets/programming-modules/lesson-se-security-patterns.jpg";

export interface LessonImage {
  src: string;
  captionVi: string;
  captionEn: string;
}

export const LESSON_INLINE_IMAGES: Record<string, LessonImage> = {
  "se-sdlc": {
    src: seSdlc,
    captionVi: "Vòng lặp Scrum 2 tuần: Plan → Build → Test → Review → Deploy",
    captionEn: "A 2-week Scrum loop: Plan → Build → Test → Review → Deploy",
  },
  "se-system-design": {
    src: seSystem,
    captionVi: "Kiến trúc hệ thống mở rộng: client → load balancer → microservices → DB/Cache/CDN",
    captionEn: "Scalable architecture: client → load balancer → microservices → DB/Cache/CDN",
  },
  "se-git": {
    src: seGit,
    captionVi: "Git workflow: nhánh feature tách ra rồi merge về main qua Pull Request",
    captionEn: "Git workflow: feature branches diverge then merge back to main via Pull Requests",
  },
  "se-clean-code": {
    src: seClean,
    captionVi: "Code rối như mì spaghetti vs. code sạch xếp gọn như Lego (SOLID)",
    captionEn: "Spaghetti code vs. clean Lego-like blocks (SOLID principles)",
  },
  "se-testing": {
    src: seTesting,
    captionVi: "Kim tự tháp test: rất nhiều unit test, ít integration, vài E2E ở đỉnh",
    captionEn: "Test pyramid: many unit tests, fewer integration, a few E2E on top",
  },
  "se-cicd": {
    src: seCicd,
    captionVi: "Băng chuyền CI/CD: commit → build → test → deploy tự động lên production",
    captionEn: "CI/CD conveyor: commit → build → test → automatic deploy to production",
  },
  "se-security-patterns": {
    src: seSecurity,
    captionVi: "Lá chắn bảo mật: OWASP Top 10, mã hoá, xác thực JWT, chặn SQL Injection",
    captionEn: "Security shields: OWASP Top 10, encryption, JWT auth, blocking SQL Injection",
  },
};

/**
 * Inject the per-lesson illustration into theory markdown right after the first
 * H2 heading. If no H2 exists, prepend the image at the top. Keeps existing
 * markdown untouched when no image is mapped.
 */
export function injectLessonImage(markdown: string, lessonId: string, lang: "vi" | "en"): string {
  const img = LESSON_INLINE_IMAGES[lessonId];
  if (!img) return markdown;
  const caption = lang === "vi" ? img.captionVi : img.captionEn;
  const imgMd = `\n\n![${caption}](${img.src})\n\n`;
  // Insert right after the first H2 block (matches "## ...\n")
  const h2 = markdown.match(/^##\s+[^\n]+\n/m);
  if (h2 && h2.index !== undefined) {
    const end = h2.index + h2[0].length;
    return markdown.slice(0, end) + imgMd + markdown.slice(end);
  }
  return imgMd + markdown;
}
