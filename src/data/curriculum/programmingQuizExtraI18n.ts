/**
 * @file programmingQuizExtraI18n.ts
 * @description English translations for Knowledge Check questions across
 *              web dev, software engineering, NLP advanced/production, and
 *              EdTech advanced/expansion lessons. Keyed by the Vietnamese
 *              question string. The renderer falls back to the original
 *              Vietnamese when a key is missing.
 */
export interface QuizEn {
  q: string;
  opts: string[];
  exp: string;
}

export const programmingQuizExtraEn: Record<string, QuizEn> = {
  // ===== NLP Advanced =====
  "ReAct loop khác CoT (chain-of-thought) ở chỗ?": {
    q: "How does the ReAct loop differ from chain-of-thought (CoT)?",
    opts: [
      "No difference",
      "ReAct interleaves real tool actions with reasoning; CoT only reasons internally",
      "ReAct is faster",
      "CoT needs a GPU",
    ],
    exp: "ReAct = Reason + Act; CoT is reason-only.",
  },
  "Trường quan trọng nhất trong tool description là?": {
    q: "What is the most important field in a tool description?",
    opts: [
      "A short name",
      "A description of WHEN to use the tool, not only what it does",
      "Parameter count",
      "Return type",
    ],
    exp: "The LLM picks tools based on the 'when to use' text - vague wording leads to wrong choices.",
  },
  "Vì sao phải validate args trước khi exec?": {
    q: "Why must you validate args before executing a tool?",
    opts: [
      "For aesthetics",
      "LLMs can hallucinate parameters/values that crash or harm the system",
      "To save RAM",
      "It's unnecessary",
    ],
    exp: "Schema validation is the firewall between the LLM and your real system.",
  },
  "Production agent nên temperature?": {
    q: "What temperature should a production agent use?",
    opts: [
      "1.0 for creativity",
      "0 for deterministic, reproducible debugging",
      "0.7 like a standard chat",
      "Random",
    ],
    exp: "Determinism matters more than creativity in action-taking tasks.",
  },
  "Khi nào nên dùng multi-agent thay vì 1 agent?": {
    q: "When should you use multi-agent instead of a single agent?",
    opts: [
      "Always",
      "When the task is complex and needs role specialization (planner/coder/reviewer)",
      "To save tokens",
      "Never",
    ],
    exp: "Multi-agent is more expensive - only use it when role specialization clearly raises quality.",
  },
  "RAG KHÔNG giải quyết được vấn đề nào?": {
    q: "Which problem does RAG NOT solve?",
    opts: ["New knowledge", "Personal writing style", "Private documents", "Real-time updates"],
    exp: "Style requires fine-tuning; RAG only injects knowledge.",
  },
  "Ưu điểm chính của LoRA là?": {
    q: "What is the main advantage of LoRA?",
    opts: [
      "More accurate than full fine-tuning",
      "Trains <1% of parameters, swap many adapters on one base model",
      "Needs no data",
      "Free",
    ],
    exp: "LoRA is parameter-efficient and can run on consumer GPUs.",
  },
  "Fine-tune trên <200 ví dụ thường?": {
    q: "Fine-tuning on fewer than 200 examples usually...",
    opts: ["Is optimal", "Overfits and loses generalization", "Is free", "Is best for every task"],
    exp: "You need hundreds to thousands of high-quality examples.",
  },
  "Thứ tự ưu tiên thử nghiệm hợp lý là?": {
    q: "What is the sensible experimentation order?",
    opts: [
      "Fine-tune -> RAG -> Prompt",
      "Prompt -> RAG -> Fine-tune",
      "Whatever you feel like",
      "Always fine-tune",
    ],
    exp: "Start with the cheapest approach and escalate only when needed.",
  },
  "Khi cần trả lời sự kiện sau training cutoff, chọn?": {
    q: "To answer about events after the training cutoff, choose:",
    opts: ["Refine-tune", "RAG / web search", "Raise temperature", "Use a bigger model"],
    exp: "Up-to-date knowledge means lookup, not baking it into weights.",
  },
  "OWASP LLM Top 1 năm 2024–2026 là?": {
    q: "What is the #1 OWASP LLM risk for 2024-2026?",
    opts: ["Hallucination", "Prompt Injection", "Cost overrun", "Slow inference"],
    exp: "Prompt injection ranks #1 because no defense is 100% effective yet.",
  },
  "Indirect prompt injection nguy hiểm vì?": {
    q: "Indirect prompt injection is dangerous because...",
    opts: [
      "It's hard to debug",
      "Instructions hide in documents/web pages the LLM reads via RAG/tools - no user typing required",
      "It uses many tokens",
      "It's slow",
    ],
    exp: "Users unintentionally invite injections via external content.",
  },
  "Vì sao phải scrub PII trước khi gửi LLM bên thứ 3?": {
    q: "Why must you scrub PII before sending to a third-party LLM?",
    opts: [
      "Speed",
      "Protect user data + comply with GDPR/privacy laws, avoid provider logs",
      "Save tokens",
      "Unnecessary",
    ],
    exp: "Providers may log requests; PII in prompts equals legal leakage.",
  },
  "Self-consistency giảm hallucination bằng cách?": {
    q: "How does self-consistency reduce hallucinations?",
    opts: [
      "Raise temperature",
      "Sample N times and pick the stable majority answer",
      "Switch models",
      "Cache",
    ],
    exp: "Correct answers tend to repeat; fabrications usually do not converge.",
  },
  "Action không-undo (xoá data, chuyển tiền) cần?": {
    q: "Non-undoable actions (delete data, transfer money) require?",
    opts: [
      "Let the LLM decide",
      "Human-in-the-loop approval + allowlist",
      "Higher temperature",
      "Disable logging",
    ],
    exp: "Assume the LLM can be compromised - the human approver is the last line of defense.",
  },

  // ===== Web Dev =====
  "Mỗi trang HTML chuẩn nên có bao nhiêu thẻ <h1>?": {
    q: "How many <h1> tags should a standard HTML page have?",
    opts: ["0", "1", "2-3", "Any number"],
    exp: "Exactly one <h1> indicates the page's main title - best for SEO and screen readers.",
  },
  "Thẻ nào dùng cho menu chính của site?": {
    q: "Which tag is used for the site's main menu?",
    opts: ["<menu>", "<nav>", "<ul>", "<div role='nav'>"],
    exp: "<nav> is the semantic standard for primary navigation regions.",
  },
  "Thuộc tính nào BẮT BUỘC cho thẻ <img>?": {
    q: "Which attribute is REQUIRED on an <img> tag?",
    opts: ["src", "alt", "title", "width"],
    exp: "src loads the image, but alt is an accessibility requirement mandated by WCAG.",
  },
  "Để gắn nhãn cho input, dùng cách nào?": {
    q: "What's the right way to label an input?",
    opts: [
      "<p>Name</p><input>",
      "<label for='name'>Name</label><input id='name'>",
      "<div>Name<input></div>",
      "placeholder='Name'",
    ],
    exp: "<label for> + input id lets screen readers announce the field correctly and expands the click target.",
  },
  "Phát biểu nào ĐÚNG về <strong> vs <b>?": {
    q: "Which statement is TRUE about <strong> vs <b>?",
    opts: [
      "They're identical",
      "<b> carries importance",
      "<strong> conveys importance; <b> is purely visual bold",
      "<strong> is deprecated",
    ],
    exp: "<strong> has semantic meaning; <b> is decorative - screen readers emphasize <strong>.",
  },
  "Selector nào có specificity CAO NHẤT?": {
    q: "Which selector has the HIGHEST specificity?",
    opts: [".btn.primary", "#header .btn", "div.btn", "button:hover"],
    exp: "#header (100) + .btn (10) = 110, the highest of the options.",
  },
  "Đơn vị nào tốt nhất cho responsive font?": {
    q: "Which unit is best for responsive font sizes?",
    opts: ["px", "pt", "rem", "cm"],
    exp: "rem scales with the root font-size and respects user zoom.",
  },
  "CSS Custom Property khai báo đúng cú pháp?": {
    q: "Which is the correct syntax for a CSS custom property?",
    opts: ["$brand: blue;", "@brand: blue;", "--brand: blue;", "var brand = blue;"],
    exp: "CSS variables use the -- prefix, e.g. --brand: blue; then var(--brand).",
  },
  "Khi nào nên dùng !important?": {
    q: "When should you use !important?",
    opts: [
      "Always, to be safe",
      "Only in utility classes or to override 3rd-party CSS",
      "When you forget about specificity",
      "In every animation",
    ],
    exp: "Legitimate uses are utility classes (e.g. Tailwind) or overriding library CSS you can't control.",
  },
  "@container query khác @media ở điểm nào?": {
    q: "How does @container differ from @media?",
    opts: [
      "No difference",
      "Reacts to the parent container's size instead of the viewport",
      "Only for print",
      "It's deprecated",
    ],
    exp: "Container queries let components adapt to their parent - ideal for viewport-independent design systems.",
  },
  "Để căn giữa cả 2 chiều bằng Flexbox, cần khai báo gì?": {
    q: "To center on both axes with Flexbox, you need:",
    opts: [
      "text-align: center",
      "margin: auto",
      "justify-content: center; align-items: center",
      "place-content: middle",
    ],
    exp: "justify-content centers the main axis, align-items the cross axis. Both = center = perfect centering.",
  },
  "Khi nào nên dùng Grid thay vì Flexbox?": {
    q: "When should you use Grid instead of Flexbox?",
    opts: [
      "Single-row navbar",
      "When you need 2D layout (rows + columns)",
      "For responsive design",
      "For dark mode",
    ],
    exp: "Grid excels at 2D layouts; Flex is optimal for 1D.",
  },
  "repeat(auto-fit, minmax(260px, 1fr)) có tác dụng gì?": {
    q: "What does repeat(auto-fit, minmax(260px, 1fr)) do?",
    opts: [
      "Always 3 columns",
      "Auto-adjusts column count by viewport, with each column at least 260px",
      "Mobile-only",
      "Syntax error",
    ],
    exp: "auto-fit + minmax = responsive grid without media queries.",
  },
  "Để các Flex items cách nhau 16px, dùng gì?": {
    q: "To space Flex items 16px apart, use:",
    opts: ["margin-right: 16px", "padding: 16px", "gap: 16px", "spacing: 16px"],
    exp: "gap is the modern way and avoids leftover margin on the last item.",
  },
  "Kỹ thuật nào ĐÃ LỖI THỜI để layout trang?": {
    q: "Which technique is OUTDATED for page layout?",
    opts: ["Flexbox", "Grid", "Float", "Container queries"],
    exp: "Float was used for layout in the 2010s; today it's only for wrapping text around images.",
  },
  "Khai báo nào KHÔNG thể gán lại giá trị?": {
    q: "Which declaration CANNOT be reassigned?",
    opts: ["var x = 1", "let x = 1", "const x = 1", "x = 1"],
    exp: "const creates an immutable binding - reassignment throws a TypeError.",
  },
  "So sánh nào nên dùng MẶC ĐỊNH?": {
    q: "Which comparison should be used BY DEFAULT?",
    opts: ["==", "===", "!=", "<="],
    exp: "=== compares value and type, avoiding implicit coercion bugs.",
  },
  "Async function trả về gì?": {
    q: "An async function returns what?",
    opts: ["A regular value", "A Promise", "A callback", "null"],
    exp: "Every async function returns a Promise, even when returning a static value.",
  },
  "user?.address?.city ?? 'N/A' nghĩa là gì?": {
    q: "What does user?.address?.city ?? 'N/A' mean?",
    opts: [
      "Syntax error",
      "Read city; if null/undefined, return 'N/A'",
      "Always returns 'N/A'",
      "Works only on arrays",
    ],
    exp: "Optional chaining (?.) plus nullish coalescing (??) - safe deep property access.",
  },
  "Cách hủy 1 fetch đang chạy là gì?": {
    q: "How do you cancel an in-flight fetch?",
    opts: ["fetch.cancel()", "AbortController", "clearTimeout", "You can't"],
    exp: "Pass AbortController.signal to fetch, then call controller.abort() to cancel.",
  },
  "API nào tìm element theo CSS selector?": {
    q: "Which API finds an element by CSS selector?",
    opts: [
      "document.find()",
      "document.querySelector()",
      "document.getElement()",
      "document.search()",
    ],
    exp: "querySelector accepts any valid CSS selector.",
  },
  "Cách nào AN TOÀN nhất để hiển thị text từ user?": {
    q: "Safest way to display user-supplied text?",
    opts: ["innerHTML", "textContent", "outerHTML", "insertAdjacentHTML"],
    exp: "textContent assigns plain text only, completely preventing XSS.",
  },
  "Event delegation nghĩa là gì?": {
    q: "What is event delegation?",
    opts: [
      "Cancelling an event",
      "Attaching a listener to a parent instead of each child",
      "Auto-reattaching listeners",
      "Forwarding the event to the server",
    ],
    exp: "One parent listener handles bubbled events - less memory and it works for children added later.",
  },
  "e.preventDefault() trong handler 'submit' để làm gì?": {
    q: "What does e.preventDefault() do in a 'submit' handler?",
    opts: [
      "Submit immediately",
      "Stop default behavior (page reload)",
      "Clear the form",
      "Skip validation",
    ],
    exp: "Form submit reloads the page by default - preventDefault keeps the page so JS can handle it.",
  },
  "Phát biểu nào ĐÚNG về innerHTML?": {
    q: "Which statement is TRUE about innerHTML?",
    opts: [
      "Always safe",
      "Can cause XSS when fed user input",
      "Faster than textContent",
      "Removed from the spec",
    ],
    exp: "innerHTML parses HTML - injecting <script> or onerror= from input can execute malicious code.",
  },
  "Lớp nào chịu trách nhiệm CẤU TRÚC trang web?": {
    q: "Which layer is responsible for the page STRUCTURE?",
    opts: ["CSS", "HTML", "JS", "JSON"],
    exp: "HTML defines structure and semantics; CSS handles presentation; JS handles behavior.",
  },
  "Progressive enhancement nghĩa là gì?": {
    q: "What is progressive enhancement?",
    opts: [
      "Page only works with JS",
      "Page works even when JS fails or is disabled",
      "Build for desktop first",
      "Gradually increase font size",
    ],
    exp: "Start with usable HTML content; CSS and JS only enhance the experience.",
  },
  "API nào lưu dữ liệu offline trong trình duyệt?": {
    q: "Which API stores data offline in the browser?",
    opts: ["sessionStorage", "localStorage", "Cookies", "All of them can"],
    exp: "All three can store data; localStorage is the most common for small, non-expiring data.",
  },
  "Vì sao nên tách JS thành nhiều module?": {
    q: "Why split JS into multiple modules?",
    opts: [
      "The browser requires it",
      "Easier to test, reuse, and read",
      "Speeds up runtime",
      "Required by ESLint",
    ],
    exp: "Modularization = single responsibility, isolated tests, easy reuse - core Clean Code.",
  },
  "Bước nào THƯỜNG bị bỏ qua khi build dự án cá nhân?": {
    q: "Which step is OFTEN skipped on personal projects?",
    opts: ["Writing HTML", "Testing on a real mobile device", "Writing JS", "Opening DevTools"],
    exp: "Real-device testing surfaces issues DevTools simulators miss: keyboards, touch lag, viewport quirks.",
  },
  "Component name trong React BẮT BUỘC phải:": {
    q: "A React component name MUST:",
    opts: ["Be lowercase", "Start with a CAPITAL letter", "Contain a dash", "No rule"],
    exp: "JSX uses lowercase for HTML tags (<div>) and CapitalCase for components (<MyButton>); otherwise React treats it as HTML.",
  },
  "Cách nào đúng để tăng count trong useState?": {
    q: "Correct way to increment count from useState?",
    opts: [
      "count = count + 1",
      "count++",
      "setCount(count + 1) or setCount(c => c + 1)",
      "this.setState({count: count+1})",
    ],
    exp: "Always use the setter; the functional form `c => c+1` is safer when updating from the previous value.",
  },
  "useEffect không có dependency array sẽ:": {
    q: "useEffect without a dependency array will:",
    opts: [
      "Run exactly once",
      "Run on every render -> risk infinite loops",
      "Never run",
      "Cause a compile error",
    ],
    exp: "Omitting the array runs the effect after EVERY render. `[]` = run once on mount.",
  },
  "Khi render list, `key` nên là:": {
    q: "When rendering a list, `key` should be:",
    opts: [
      "The map index",
      "A stable, unique ID for the item",
      "Math.random()",
      "Not needed",
    ],
    exp: "Keys help React diff efficiently. Indexes cause bugs on reorder; random keys lose state inside items.",
  },
  "Server state (data fetch từ API) nên quản lý bằng:": {
    q: "Server state (data fetched from APIs) should be managed with:",
    opts: [
      "Manual useState + useEffect",
      "TanStack Query / SWR",
      "Global Redux",
      "localStorage",
    ],
    exp: "TanStack Query handles cache, retry, dedupe and invalidation - the 2026 standard for server state.",
  },

  // ===== Software Engineering =====
  "Sprint mặc định trong Scrum dài bao lâu?": {
    q: "How long is a default Scrum sprint?",
    opts: ["1 day", "2 weeks", "2 months", "6 months"],
    exp: "A standard sprint is 2 weeks - short enough to adapt, long enough to deliver meaningful work.",
  },
  "Vai trò nào QUYẾT ĐỊNH sản phẩm sẽ làm gì?": {
    q: "Which role DECIDES what the product will do?",
    opts: ["Scrum Master", "Product Owner", "Tech Lead", "QA"],
    exp: "The Product Owner owns the Product Backlog and prioritizes - they decide 'what to build'.",
  },
  "Mô hình nào phù hợp dự án có yêu cầu CỐ ĐỊNH (vd: phần mềm máy bay)?": {
    q: "Which model fits projects with FIXED requirements (e.g. avionics software)?",
    opts: ["Agile", "Scrum", "Waterfall", "Kanban"],
    exp: "Waterfall is sequential and document-heavy - well suited to safety-critical systems with stable requirements.",
  },
  "Definition of Done KHÔNG bao gồm điều nào sau đây?": {
    q: "Definition of Done does NOT include which of the following?",
    opts: ["Code is written", "Code is tested", "Code is reviewed", "Has 1000 users"],
    exp: "DoD is an internal standard: code + tests + review + staging deploy - it doesn't depend on market results.",
  },
  "Daily Standup dài tối đa bao nhiêu phút?": {
    q: "Maximum length of a Daily Standup?",
    opts: ["5", "15", "30", "60"],
    exp: "Standup is 15 minutes max; each person answers 3 questions: yesterday, today, blockers.",
  },
  "Lợi ích LỚN NHẤT của microservices?": {
    q: "BIGGEST benefit of microservices?",
    opts: [
      "Less code",
      "Scale each part independently",
      "Deploy once",
      "No need for Docker",
    ],
    exp: "You can scale the Order service 10x without touching Auth - that's the core difference from a monolith.",
  },
  "Trong CAP Theorem, hệ thống ngân hàng ưu tiên gì?": {
    q: "In CAP Theorem, what does a banking system prioritize?",
    opts: [
      "Consistency + Availability",
      "Consistency + Partition tolerance",
      "Availability + Partition tolerance",
      "All three",
    ],
    exp: "Banks cannot allow wrong balances -> prioritize CP. Social networks usually prefer AP.",
  },
  "Khi nào nên DỪNG dùng microservices?": {
    q: "When should you STOP using microservices?",
    opts: [
      "Team <10 with no DevOps",
      "When users > 1M",
      "When you have Kubernetes",
      "Never",
    ],
    exp: "Microservices need observability, CI/CD, and container orchestration. Small teams drown in overhead.",
  },
  "Sequence Diagram dùng để mô tả gì?": {
    q: "What does a Sequence Diagram describe?",
    opts: [
      "Class hierarchy",
      "Order of calls between components over time",
      "Database schema",
      "UI flow",
    ],
    exp: "Sequence diagrams use time as the vertical axis and services/actors as columns - great for debugging complex interactions.",
  },
  "Modular Monolith khác Monolith truyền thống ở điểm nào?": {
    q: "How does a Modular Monolith differ from a traditional monolith?",
    opts: [
      "No difference",
      "Code is split into modules with clear boundaries, easy to split into microservices later",
      "No database",
      "Runs in the cloud",
    ],
    exp: "Modular Monoliths keep deployment simple while organizing code by bounded contexts - microservice seams are already drawn.",
  },
  "Conventional Commit nào ĐÚNG cho việc thêm tính năng mới?": {
    q: "Which Conventional Commit is CORRECT for adding a new feature?",
    opts: ["new: add login", "feat: add login", "added login", "fix: login"],
    exp: "feat: for new features. fix: for bugs, refactor: for cleanup, docs: for documentation.",
  },
  "Khi nào KHÔNG nên dùng git push --force?": {
    q: "When should you NOT use git push --force?",
    opts: [
      "On your own feature branch",
      "On main/develop",
      "After rebasing your private branch",
      "On a branch only you use",
    ],
    exp: "Force-pushing shared branches (main, develop) overwrites others' history. Only use force-with-lease on private branches.",
  },
  "PR lý tưởng dài bao nhiêu dòng?": {
    q: "Ideal PR size in lines of code?",
    opts: ["<50", "<400", "<2000", "Doesn't matter"],
    exp: "Studies show PRs under 400 lines catch the most bugs. Past ~1000 lines, reviewers only skim.",
  },
  "Lệnh nào xem lịch sử commit dưới dạng cây?": {
    q: "Which command shows commit history as a tree?",
    opts: ["git history", "git log --oneline --graph", "git tree", "git show"],
    exp: "git log --oneline --graph renders history as an ASCII tree, great for understanding branch topology.",
  },
  "Khi merge conflict xảy ra, ai quyết định giữ phiên bản nào?": {
    q: "When a merge conflict happens, who decides which version to keep?",
    opts: [
      "Git decides automatically",
      "A senior dev via chat",
      "A human, by editing the file",
      "AI",
    ],
    exp: "Git marks conflicts with <<<<<<< and =======; a human must open the file, choose/merge code, then git add + commit.",
  },
  "Chữ 'S' trong SOLID nghĩa là gì?": {
    q: "What does the 'S' in SOLID mean?",
    opts: ["Simple", "Single Responsibility", "Static", "Synchronous"],
    exp: "Single Responsibility Principle - a class should have only one reason to change.",
  },
  "Hàm CLEAN nên dài tối đa bao nhiêu dòng?": {
    q: "A CLEAN function should be at most how many lines?",
    opts: ["~20", "~100", "~500", "No limit"],
    exp: "Robert C. Martin (Clean Code) recommends functions under ~20 lines that do exactly one thing.",
  },
  "Comment KIỂU NÀO là tốt nhất?": {
    q: "Which KIND of comment is best?",
    opts: [
      "Explain every line",
      "Describe the WHY (reasons behind decisions)",
      "Describe the WHAT (what the code does)",
      "The more, the better",
    ],
    exp: "Code already says WHAT. The most useful comments explain WHY (algorithm choice, business rules...).",
  },
  "DIP (Dependency Inversion Principle) nghĩa là gì?": {
    q: "What does DIP (Dependency Inversion Principle) mean?",
    opts: [
      "Reverse the lifecycle",
      "High-level modules depend on abstractions, not concretes",
      "Remove dependencies",
      "Depend on AI",
    ],
    exp: "Classes should depend on interfaces/abstractions, not concrete implementations - easier to test and swap.",
  },
  "Quy tắc Boy Scout trong Clean Code?": {
    q: "The Boy Scout rule in Clean Code?",
    opts: [
      "Code must contain a bear",
      "Leave the codebase CLEANER than you found it",
      "Every commit needs a badge",
      "Unrelated",
    ],
    exp: "Every time you touch a file, improve it a little (rename, extract). Over time, the codebase heals itself.",
  },
  "Tỷ lệ Unit/Integration/E2E lý tưởng?": {
    q: "Ideal Unit/Integration/E2E ratio?",
    opts: ["10/20/70", "70/20/10", "50/30/20", "100/0/0"],
    exp: "Test Pyramid: ~70% unit (fast, cheap), ~20% integration, ~10% E2E (slow, expensive).",
  },
  "Bước đầu tiên của TDD?": {
    q: "First step of TDD?",
    opts: ["Code", "Write a FAILING test (Red)", "Refactor", "Deploy"],
    exp: "Red -> Green -> Refactor. Write a failing test first so you know the target before coding.",
  },
  "AAA Pattern là gì?": {
    q: "What is the AAA Pattern?",
    opts: [
      "Arrange-Act-Assert",
      "Always-Already-Asynchronous",
      "Auto-AI-Async",
      "Apple-Amazon-Adobe",
    ],
    exp: "Arrange (set up data) -> Act (call function) -> Assert (check result). A clear, readable test structure.",
  },
  "100% test coverage có đảm bảo không có bug?": {
    q: "Does 100% test coverage guarantee zero bugs?",
    opts: [
      "Yes, completely",
      "No - it only proves the code ran, not that it's correct",
      "Depends on the language",
      "Only with Python",
    ],
    exp: "Coverage = % of lines executed by tests. You can hit 100% and still miss edge cases (null input, race conditions...).",
  },
  "Loại test nào CHẬM nhất nhưng GẦN với user nhất?": {
    q: "Which test type is SLOWEST but CLOSEST to the user?",
    opts: ["Unit", "Integration", "E2E", "Smoke"],
    exp: "E2E runs through a real browser (Playwright, Cypress) - closest to users but the slowest and most brittle.",
  },
  "CI viết tắt của gì?": {
    q: "What does CI stand for?",
    opts: [
      "Code Inspection",
      "Continuous Integration",
      "Cloud Infrastructure",
      "Container Image",
    ],
    exp: "Continuous Integration - every commit auto-builds and tests to catch bugs early.",
  },
  "Stage nào nên chạy SỚM nhất trong pipeline?": {
    q: "Which stage should run EARLIEST in the pipeline?",
    opts: ["Deploy", "Build", "Lint + Unit Test (cheap + fast)", "Security scan"],
    exp: "Fail Fast: lint + unit tests are cheap and fast -> fail early -> save CI minutes.",
  },
  "Secrets (API key, password) NÊN lưu ở đâu trong CI/CD?": {
    q: "Where should secrets (API keys, passwords) live in CI/CD?",
    opts: ["Hardcoded in .yaml", ".env committed to git", "GitHub Secrets / Vault", "README"],
    exp: "Use a dedicated vault (GitHub Secrets, AWS Secrets Manager, HashiCorp Vault) - never hardcode or commit secrets.",
  },
  "Canary Deployment là gì?": {
    q: "What is a Canary Deployment?",
    opts: [
      "Deploy to a canary bird",
      "Roll out the new version to 5% of users first, watch metrics, then expand",
      "Deploy only on weekends",
      "Manual deploy",
    ],
    exp: "Canary release: gradual rollout (5% -> 25% -> 100%) so production issues are caught on fewer users first.",
  },
  "Continuous Deployment khác Continuous Delivery?": {
    q: "How does Continuous Deployment differ from Continuous Delivery?",
    opts: [
      "No difference",
      "Deployment auto-pushes to PRODUCTION; Delivery stops at staging awaiting approval",
      "Deployment is mobile-only",
      "Delivery is faster",
    ],
    exp: "Continuous Delivery: auto to staging, human approval to prod. Continuous Deployment: fully automated to prod.",
  },
  "Cách CHẮC CHẮN phòng SQL Injection?": {
    q: "Surest way to prevent SQL Injection?",
    opts: [
      "Manual escaping",
      "Parameterized queries / prepared statements",
      "Rename the table",
      "Use NoSQL",
    ],
    exp: "Parameterized queries let the driver escape; input is treated as pure data, never SQL code.",
  },
  "Pattern nào dùng cho 1 instance toàn app?": {
    q: "Which pattern provides a single instance for the whole app?",
    opts: ["Factory", "Observer", "Singleton", "Strategy"],
    exp: "Singleton ensures a class has exactly one instance - suitable for DB pools, Config, Logger.",
  },
  "OWASP Top 10 là gì?": {
    q: "What is the OWASP Top 10?",
    opts: [
      "Top 10 OWASP games",
      "A list of the 10 most dangerous web vulnerabilities",
      "Top 10 frameworks",
      "Top 10 languages",
    ],
    exp: "OWASP Top 10 is a document updated every 3-4 years listing the most common and dangerous web vulnerabilities.",
  },
  "Hash password NÊN dùng thuật toán nào?": {
    q: "Which algorithm SHOULD you use to hash passwords?",
    opts: ["MD5", "SHA1", "bcrypt / argon2", "Base64"],
    exp: "bcrypt and argon2 are intentionally slow and salted - resistant to brute force and rainbow tables. MD5/SHA1 are obsolete.",
  },
  "Strategy Pattern hữu ích KHI nào?": {
    q: "When is the Strategy Pattern useful?",
    opts: [
      "When you need to swap algorithms at runtime without changing the client",
      "When you need only one instance",
      "When you need a singleton",
      "When there are no tests",
    ],
    exp: "Strategy encapsulates multiple algorithms behind one interface; the client picks an instance at runtime - e.g. three payment gateways all returning boolean pay().",
  },

  // ===== EdTech Expansion (Helsinki) =====
  "Ai là tác giả của mô hình 'Phenomenon-Based Learning' nổi tiếng của Phần Lan?": {
    q: "Who authored Finland's well-known 'Phenomenon-Based Learning' model?",
    opts: ["Hannele Niemi", "Kirsti Lonka", "Sami Paavola", "Auli Toom"],
    exp: "Kirsti Lonka (UH) is one of the strongest proponents of phenomenon-based learning.",
  },
  "Ẩn dụ 'Knowledge Creation' (kiến tạo tri thức) thuộc về cặp tác giả nào?": {
    q: "The 'Knowledge Creation' metaphor was proposed by which pair of authors?",
    opts: ["Niemi & Toom", "Paavola & Hakkarainen", "Lonka & Salmela-Aro", "Löfström & Nevgi"],
    exp: "Sami Paavola and Kai Hakkarainen proposed the 'third metaphor' alongside acquisition and participation.",
  },
  "Thang đo EDA và SBI dùng để đo điều gì trong học tập?": {
    q: "What do the EDA and SBI scales measure in learning?",
    opts: ["Student IQ", "Engagement and burnout", "Reading speed", "Coding ability"],
    exp: "Katariina Salmela-Aro developed EDA (Engagement) and SBI (Study Burnout Inventory).",
  },
  "Vì sao giáo viên Phần Lan đều phải có bằng Thạc sĩ?": {
    q: "Why must Finnish teachers all hold a Master's degree?",
    opts: [
      "It's a law without scientific grounds",
      "Because of the 'research-based teacher education' model (Toom, Husu)",
      "For high salaries",
      "Religious tradition",
    ],
    exp: "Toom & Husu's model requires teachers to have practical research competence.",
  },
  "Cổng nào dưới đây là kho công bố chính thức của Đại học Helsinki?": {
    q: "Which portal is the official publication repository of the University of Helsinki?",
    opts: ["arxiv.org", "helda.helsinki.fi", "pubmed.gov", "jstor.org"],
    exp: "HELDA is UH's repository of theses and academic papers.",
  },

  // ===== EdTech Advanced =====
  "Mục tiêu recommender EdTech khác Netflix ở chỗ?": {
    q: "How does an EdTech recommender's goal differ from Netflix's?",
    opts: [
      "No difference",
      "Maximize mastery growth + motivation, not click/watch time",
      "More diverse",
      "Cheaper",
    ],
    exp: "Educational goals differ from commercial ones - optimizing CTR would just push super-easy content.",
  },
  "ZPD nói rằng bài nên có pass_prob ≈?": {
    q: "ZPD says items should have a pass_prob of about?",
    opts: ["0.1", "0.6-0.8", "0.95", "Exactly 0.5"],
    exp: "Just-right difficulty = the 60-80% sweet spot.",
  },
  "Filter bubble sư phạm là?": {
    q: "What is a pedagogical filter bubble?",
    opts: [
      "A UI bug",
      "Only recommending strengths -> the learner never grows weak skills",
      "Lectures that are too long",
      "Caching",
    ],
    exp: "Inject ~20% items targeting weak skills to break the bubble.",
  },
  "Cold-start tốt cho EdTech là?": {
    q: "A good cold-start for EdTech is?",
    opts: [
      "Random guessing",
      "Survey + adaptive IRT placement quiz to estimate θ",
      "Wait one month",
      "Ask the teacher",
    ],
    exp: "A few IRT items beat long pure surveys.",
  },
  "Popularity bias khắc phục bằng?": {
    q: "How do you mitigate popularity bias?",
    opts: [
      "Don't recommend hot items",
      "ε-greedy / 5% random so new items get a chance",
      "Charge more for hot items",
      "No fix",
    ],
    exp: "Random exploration avoids the winner-takes-all trap.",
  },
  "COPPA bảo vệ trẻ em dưới?": {
    q: "COPPA protects children under what age?",
    opts: ["10", "13", "16", "18"],
    exp: "Under 13 in the US, requiring Verifiable Parental Consent.",
  },
  "GDPR-K có thể hạ tuổi consent xuống tối thiểu?": {
    q: "GDPR-K can lower the consent age to a minimum of?",
    opts: ["10", "13 (each EU country picks 13-16)", "16 everywhere", "18"],
    exp: "Default is 16; each country may lower it to a minimum of 13.",
  },
  "Bẫy 'anonymous' tệ nhất là?": {
    q: "The worst 'anonymous' pitfall is?",
    opts: [
      "Ugly UI",
      "Quasi-identifiers (zip + age + gender) re-identify ~87% of people",
      "DB cost",
      "None",
    ],
    exp: "Latanya Sweeney 2000 and later studies confirm this.",
  },
  "Parent gate (phép tính nhân) dùng để?": {
    q: "A parent gate (multiplication problem) is used to?",
    opts: [
      "Be fun",
      "Stop children from changing consent / making purchases",
      "Test math",
      "Server security",
    ],
    exp: "A quick adult-check gate without collecting PII.",
  },
  "Khi user xoá tài khoản, EdTech nên?": {
    q: "When a user deletes their account, EdTech should?",
    opts: [
      "Permanent soft delete",
      "Cascade hard delete within the legal time window + keep an audit log",
      "Keep for reporting",
      "Sell to a third party",
    ],
    exp: "Right to be forgotten is mandatory; indefinite soft-delete violates it.",
  },
};
