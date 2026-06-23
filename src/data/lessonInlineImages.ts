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
import sqlJoin from "@/assets/programming-modules/lesson-sql-join.jpg";
import sqlWindow from "@/assets/programming-modules/lesson-sql-window.jpg";
import mlLinear from "@/assets/programming-modules/lesson-ml-linear-reg.jpg";
import mlTree from "@/assets/programming-modules/lesson-ml-decision-tree.jpg";
import mlKmeans from "@/assets/programming-modules/lesson-ml-kmeans.jpg";
import mlMlops from "@/assets/programming-modules/lesson-ml-mlops.jpg";
import cloudFund from "@/assets/programming-modules/lesson-cloud-fund.jpg";
import cloudServerless from "@/assets/programming-modules/lesson-cloud-serverless.jpg";
import deEtl from "@/assets/programming-modules/lesson-de-etl.jpg";
import deBatch from "@/assets/programming-modules/lesson-de-batch-stream.jpg";
import dlNn from "@/assets/programming-modules/lesson-dl-nn.jpg";
import cyberThreats from "@/assets/programming-modules/lesson-cyber-threats.jpg";
import pyVars from "@/assets/programming-modules/lesson-py-variables.jpg";
import pyOop from "@/assets/programming-modules/lesson-py-oop.jpg";
import nlpPipeline from "@/assets/programming-modules/lesson-nlp-pipeline.jpg";
import rlAgent from "@/assets/programming-modules/lesson-rl-agent.jpg";
import webStack from "@/assets/programming-modules/lesson-web-stack.jpg";
import edtechAi from "@/assets/programming-modules/lesson-edtech-ai.jpg";
import sparkCluster from "@/assets/programming-modules/lesson-spark-cluster.jpg";
import scratchBlocks from "@/assets/programming-modules/lesson-scratch-blocks.jpg";
import dsOverview from "@/assets/programming-modules/lesson-ds-overview.jpg";
import gamePygame from "@/assets/programming-modules/lesson-game-pygame.jpg";
import aiFoundation from "@/assets/programming-modules/lesson-ai-foundation.jpg";
import pyAdvanced from "@/assets/programming-modules/lesson-py-advanced.jpg";

export interface LessonImage {
  src: string;
  captionVi: string;
  captionEn: string;
}

// Exact lesson-id matches. Highest priority.
export const LESSON_INLINE_IMAGES: Record<string, LessonImage> = {
  // Software Engineering
  "se-sdlc":              { src: seSdlc,    captionVi: "Vòng lặp Scrum 2 tuần: Plan → Build → Test → Review → Deploy",                 captionEn: "A 2-week Scrum loop: Plan → Build → Test → Review → Deploy" },
  "se-system-design":     { src: seSystem,  captionVi: "Kiến trúc mở rộng: client → load balancer → microservices → DB/Cache/CDN",     captionEn: "Scalable architecture: client → load balancer → microservices → DB/Cache/CDN" },
  "se-git":               { src: seGit,     captionVi: "Git workflow: feature branch tách ra rồi merge về main qua Pull Request",      captionEn: "Git workflow: feature branches diverge then merge back via Pull Requests" },
  "se-clean-code":        { src: seClean,   captionVi: "Code rối spaghetti vs. code sạch xếp gọn như Lego theo SOLID",                  captionEn: "Spaghetti code vs. clean Lego-like blocks (SOLID principles)" },
  "se-testing":           { src: seTesting, captionVi: "Kim tự tháp test: nhiều unit, ít integration, vài E2E ở đỉnh",                  captionEn: "Test pyramid: many unit tests, fewer integration, a few E2E on top" },
  "se-cicd":              { src: seCicd,    captionVi: "Băng chuyền CI/CD: commit → build → test → deploy tự động",                     captionEn: "CI/CD conveyor: commit → build → test → automatic deploy" },
  "se-security-patterns": { src: seSecurity,captionVi: "Lá chắn bảo mật: OWASP Top 10, mã hoá, JWT, chặn SQL Injection",                captionEn: "Security shields: OWASP Top 10, encryption, JWT auth, blocking SQL Injection" },

  // SQL
  "sql-join-1":           { src: sqlJoin,   captionVi: "Venn diagram của INNER / LEFT / RIGHT / FULL OUTER JOIN",                       captionEn: "Venn diagram of INNER / LEFT / RIGHT / FULL OUTER JOIN" },
  "sql-win-1":            { src: sqlWindow, captionVi: "Window function: khung cửa sổ trượt qua các dòng để tính rank, running total",  captionEn: "Window function: a sliding frame computes rank and running totals across rows" },

  // Machine Learning
  "ml-lr-1":              { src: mlLinear,  captionVi: "Linear regression: tìm đường thẳng best-fit qua đám mây điểm dữ liệu",          captionEn: "Linear regression: best-fit line through a cloud of data points" },
  "ml-dt-1":              { src: mlTree,    captionVi: "Decision tree: đi từ câu hỏi gốc, rẽ Yes/No đến nhãn phân loại",                captionEn: "Decision tree: split from a root question, branch Yes/No down to class labels" },
  "ml-km-1":              { src: mlKmeans,  captionVi: "K-Means: nhóm điểm thành K cụm xung quanh centroid",                            captionEn: "K-Means: group points into K clusters around their centroids" },
  "ml-ops-1":             { src: mlMlops,   captionVi: "Vòng MLOps: data → training → registry → deploy → monitor → retrain",           captionEn: "MLOps loop: data → training → registry → deploy → monitor → retrain" },

  // Cloud
  "cloud-fund-1":         { src: cloudFund,      captionVi: "Tháp dịch vụ đám mây: IaaS (hạ tầng) - PaaS (nền tảng) - SaaS (ứng dụng)", captionEn: "Cloud service stack: IaaS (infra) - PaaS (platform) - SaaS (app)" },
  "cloud-serverless-1":   { src: cloudServerless,captionVi: "Serverless: event kích hoạt function, auto-scale, chỉ trả tiền khi chạy",  captionEn: "Serverless: events trigger functions that auto-scale - you only pay per invocation" },

  // Data Engineering
  "de-etl-1":             { src: deEtl,     captionVi: "ETL (transform trước khi load) vs. ELT (load thô rồi transform trong warehouse)",captionEn: "ETL (transform before load) vs. ELT (load raw then transform in the warehouse)" },
  "de-bs-1":              { src: deBatch,   captionVi: "Batch (xô lớn đổ định kỳ) vs. Streaming (dòng nước liên tục qua đường ống)",    captionEn: "Batch (a bucket dumped at intervals) vs. streaming (continuous flow through pipes)" },

  // Deep Learning
  "dl-1":                 { src: dlNn,      captionVi: "Mạng neural feedforward: input → hidden layers → output, kết nối có trọng số",  captionEn: "Feedforward neural network: input → hidden layers → output with weighted connections" },

  // Cybersecurity
  "cyber-1":              { src: cyberThreats, captionVi: "Bản đồ mối đe doạ: phishing, malware, ransomware, DDoS - và lá chắn phòng thủ", captionEn: "Threat map: phishing, malware, ransomware, DDoS - and the defending shield" },

  // Python Pathway
  "m1-l1-setup":          { src: pyVars,    captionVi: "Biến trong Python: ô nhớ có nhãn, chứa số, chuỗi, list, hay boolean",            captionEn: "Python variables: labelled memory boxes holding numbers, strings, lists, or booleans" },
  "m5-l1-classes":        { src: pyOop,     captionVi: "OOP: class là bản thiết kế, từ đó tạo ra nhiều object có thuộc tính và phương thức",captionEn: "OOP: a class is a blueprint that produces many objects with attributes and methods" },
};

// Prefix-based fallback so an entire module-family gets a reasonable
// illustration even if we have not authored a per-lesson image yet.
const PREFIX_FALLBACK: Array<{ prefix: string; img: LessonImage }> = [
  { prefix: "sql-join", img: { src: sqlJoin,    captionVi: "Trực quan hoá JOIN trong SQL",             captionEn: "SQL JOIN visualization" } },
  { prefix: "sql-win",  img: { src: sqlWindow,  captionVi: "Window function trượt qua các dòng",      captionEn: "Window function sliding over rows" } },
  { prefix: "sql-",     img: { src: sqlJoin,    captionVi: "Truy vấn SQL minh hoạ bằng tập hợp",      captionEn: "SQL query illustrated as set operations" } },
  { prefix: "ml-lr",    img: { src: mlLinear,   captionVi: "Đường thẳng best-fit qua đám mây điểm",   captionEn: "Best-fit line through scattered points" } },
  { prefix: "ml-log",   img: { src: mlLinear,   captionVi: "Phân loại nhị phân bằng đường biên",      captionEn: "Binary classification by a decision boundary" } },
  { prefix: "ml-dt",    img: { src: mlTree,     captionVi: "Decision tree rẽ nhánh Yes/No",           captionEn: "Decision tree branching Yes/No" } },
  { prefix: "ml-rf",    img: { src: mlTree,     captionVi: "Random Forest: nhiều cây bỏ phiếu",       captionEn: "Random Forest: many trees voting" } },
  { prefix: "ml-km",    img: { src: mlKmeans,   captionVi: "K-Means: cụm điểm quanh centroid",        captionEn: "K-Means clusters around centroids" } },
  { prefix: "ml-ops",   img: { src: mlMlops,    captionVi: "Vòng MLOps khép kín",                     captionEn: "Closed-loop MLOps pipeline" } },
  { prefix: "ml-",      img: { src: mlLinear,   captionVi: "Mô hình ML học từ dữ liệu",                captionEn: "An ML model learning from data" } },
  { prefix: "cloud-fund",     img: { src: cloudFund,       captionVi: "Mô hình IaaS / PaaS / SaaS",   captionEn: "IaaS / PaaS / SaaS model" } },
  { prefix: "cloud-serverless", img: { src: cloudServerless, captionVi: "Serverless function auto-scale", captionEn: "Auto-scaling serverless function" } },
  { prefix: "cloud-",   img: { src: cloudFund,  captionVi: "Dịch vụ đám mây chạy trên hạ tầng phân tán", captionEn: "Cloud services on distributed infrastructure" } },
  { prefix: "de-etl",   img: { src: deEtl,      captionVi: "Pipeline ETL/ELT giữa nguồn dữ liệu và warehouse", captionEn: "ETL/ELT pipeline between sources and the warehouse" } },
  { prefix: "de-bs",    img: { src: deBatch,    captionVi: "So sánh batch vs. streaming",             captionEn: "Batch vs. streaming comparison" } },
  { prefix: "de-",      img: { src: deEtl,      captionVi: "Đường ống dữ liệu doanh nghiệp",          captionEn: "An enterprise data pipeline" } },
  { prefix: "dl-",      img: { src: dlNn,       captionVi: "Mạng neural nhiều lớp",                   captionEn: "Multi-layer neural network" } },
  { prefix: "cyber-",   img: { src: cyberThreats, captionVi: "Bản đồ mối đe doạ và phòng thủ",        captionEn: "Threat & defense map" } },
  { prefix: "m1-",      img: { src: pyVars,     captionVi: "Biến và kiểu dữ liệu Python",             captionEn: "Python variables and data types" } },
  { prefix: "m2-",      img: { src: pyVars,     captionVi: "Điều khiển luồng: if và vòng lặp",        captionEn: "Control flow: if and loops" } },
  { prefix: "m5-",      img: { src: pyOop,      captionVi: "Lập trình hướng đối tượng trong Python",  captionEn: "Object-oriented programming in Python" } },
  { prefix: "m6-",      img: { src: pyAdvanced, captionVi: "Python nâng cao: decorator, generator, file I/O", captionEn: "Advanced Python: decorators, generators, file I/O" } },
  { prefix: "m3-",      img: { src: pyVars,     captionVi: "Cấu trúc dữ liệu Python: list, tuple, dict, set", captionEn: "Python data structures: list, tuple, dict, set" } },
  { prefix: "m4-",      img: { src: pyVars,     captionVi: "Hàm trong Python: tham số, return, scope",  captionEn: "Python functions: parameters, return, scope" } },

  // Advanced AI/ML extras
  { prefix: "ai-",      img: { src: aiFoundation, captionVi: "Nền tảng AI: mạng neural và thuật toán học",  captionEn: "AI foundations: neural networks and learning algorithms" } },
  { prefix: "nlp-",     img: { src: nlpPipeline,  captionVi: "Pipeline NLP: token → embedding → transformer → output", captionEn: "NLP pipeline: tokens → embeddings → transformer → output" } },
  { prefix: "rl-",      img: { src: rlAgent,      captionVi: "Agent RL học qua tương tác và phần thưởng",   captionEn: "RL agent learning through interaction and rewards" } },

  // Web / EdTech / Spark / Scratch / Game / Data Structures
  { prefix: "web-",     img: { src: webStack,     captionVi: "Stack web: HTML, CSS, JavaScript, React, Browser", captionEn: "Web stack: HTML, CSS, JavaScript, React, Browser" } },
  { prefix: "edtech-",  img: { src: edtechAi,     captionVi: "EdTech: AI tutor, lộ trình thích ứng, analytics", captionEn: "EdTech: AI tutor, adaptive paths, analytics" } },
  { prefix: "spark-",   img: { src: sparkCluster, captionVi: "Cụm Spark: driver phối hợp các worker xử lý song song", captionEn: "Spark cluster: driver orchestrating parallel workers" } },
  { prefix: "data-spark", img: { src: sparkCluster, captionVi: "Spark phân tán xử lý dữ liệu lớn",            captionEn: "Spark distributing big-data workloads" } },
  { prefix: "scratch-", img: { src: scratchBlocks, captionVi: "Lập trình Scratch: ghép khối lệnh điều khiển nhân vật", captionEn: "Scratch coding: snap blocks to drive sprites" } },
  { prefix: "game-",    img: { src: gamePygame,    captionVi: "Vòng lặp game: input → update → render mỗi frame", captionEn: "Game loop: input → update → render every frame" } },
  { prefix: "ds-",      img: { src: dsOverview,    captionVi: "Cấu trúc dữ liệu: array, linked list, tree, hash, stack", captionEn: "Data structures: array, linked list, tree, hash, stack" } },
  { prefix: "py-basic", img: { src: pyVars,        captionVi: "Python cơ bản: biến, kiểu dữ liệu, biểu thức", captionEn: "Python basics: variables, types, expressions" } },
  { prefix: "py-dec",   img: { src: pyAdvanced,    captionVi: "Decorator bọc và mở rộng hành vi của hàm",     captionEn: "Decorators wrap and extend function behavior" } },
  { prefix: "py-gen",   img: { src: pyAdvanced,    captionVi: "Generator sinh giá trị từng cái một, tiết kiệm bộ nhớ", captionEn: "Generators yield values one by one, memory efficient" } },
  { prefix: "py-oop",   img: { src: pyOop,         captionVi: "OOP nâng cao: inheritance, polymorphism",       captionEn: "Advanced OOP: inheritance, polymorphism" } },
  { prefix: "py-file",  img: { src: pyAdvanced,    captionVi: "File I/O trong Python: đọc/ghi an toàn với with",captionEn: "Python file I/O: safe read/write with context managers" } },
  { prefix: "py-pu",    img: { src: pyAdvanced,    captionVi: "Python Power-ups: kỹ thuật nâng cao",          captionEn: "Python power-ups: advanced techniques" } },
  { prefix: "rwp-",     img: { src: webStack,      captionVi: "Dự án thực tế kết hợp nhiều công nghệ",        captionEn: "Real-world project combining multiple technologies" } },
  { prefix: "pml-",     img: { src: mlMlops,       captionVi: "Triển khai ML vào sản phẩm thực tế",           captionEn: "Shipping ML into production products" } },
  { prefix: "etl-",     img: { src: deEtl,         captionVi: "Pipeline ETL: extract → transform → load",     captionEn: "ETL pipeline: extract → transform → load" } },
  { prefix: "pe-",      img: { src: aiFoundation,  captionVi: "Prompt Engineering: chỉ dẫn rõ ràng cho LLM",  captionEn: "Prompt engineering: clear instructions for LLMs" } },

function resolveImage(lessonId: string): LessonImage | undefined {
  if (LESSON_INLINE_IMAGES[lessonId]) return LESSON_INLINE_IMAGES[lessonId];
  const hit = PREFIX_FALLBACK.find(p => lessonId.startsWith(p.prefix));
  return hit?.img;
}

/**
 * Inject the per-lesson illustration into theory markdown right after the first
 * H2 heading. If no H2 exists, prepend the image at the top. Keeps existing
 * markdown untouched when no image is mapped.
 */
export function injectLessonImage(markdown: string, lessonId: string, lang: "vi" | "en"): string {
  const img = resolveImage(lessonId);
  if (!img) return markdown;
  // Don't double-inject if the AI-enhanced markdown already contains an image
  if (/!\[[^\]]*\]\([^)]+\)/.test(markdown)) return markdown;
  const caption = lang === "vi" ? img.captionVi : img.captionEn;
  const imgMd = `\n\n![${caption}](${img.src})\n\n`;
  const h2 = markdown.match(/^##\s+[^\n]+\n/m);
  if (h2 && h2.index !== undefined) {
    const end = h2.index + h2[0].length;
    return markdown.slice(0, end) + imgMd + markdown.slice(end);
  }
  return imgMd + markdown;
}
