// Cybersecurity curriculum — 6 progressive lessons in a single module.
// Schema mirrors cloud/SQL/ML modules so the existing ProgrammingLesson UI
// renders theory, code, exercise and quiz exactly the same way.
import type { ExtendedProgrammingModule } from "./types";

export const cybersecurityModules: ExtendedProgrammingModule[] = [
  {
    id: "prog-cybersecurity",
    title: "Cybersecurity cho Lập trình viên",
    titleEn: "Cybersecurity for Developers",
    icon: "🛡️",
    color: "from-red-500/20 to-orange-500/20",
    description: "Tư duy bảo mật + thực hành: CIA, AuthN/AuthZ, OWASP, mật mã, secure API/Cloud và Incident Response.",
    descriptionEn: "Security mindset + hands-on: CIA, AuthN/AuthZ, OWASP, cryptography, secure API/Cloud and Incident Response.",
    course: "cybersecurity",
    lessons: [
      // ============ LESSON 1 ============
      {
        id: "cyber-1",
        title: "Nền tảng an toàn thông tin: CIA, Threat Model & Defense in Depth",
        titleEn: "Security Foundations: CIA Triad, Threat Modeling & Defense in Depth",
        level: 1,
        difficulty: "beginner",
        theory: `## 1. 🚦 Vì sao lập trình viên phải hiểu bảo mật?

Một dòng code sai có thể làm rò rỉ 10 triệu tài khoản. Bảo mật **không phải việc của riêng ai** — nó phải nằm trong tư duy của mỗi PR bạn viết. Phần này xây nền tảng đó cho cả người mới và dev đã có kinh nghiệm.

## 2. 💡 Tam giác CIA (Confidentiality – Integrity – Availability)

- **Confidentiality (Bảo mật)**: Chỉ người được phép mới đọc được dữ liệu. Ví dụ: mã hoá mật khẩu, RLS trong database.
- **Integrity (Toàn vẹn)**: Dữ liệu không bị sửa trái phép. Ví dụ: chữ ký số, hash SHA-256, audit log.
- **Availability (Sẵn sàng)**: Hệ thống luôn truy cập được khi cần. Ví dụ: rate limiting chống DDoS, backup, failover.

> 💡 **Mẹo của thầy Hải:** Mỗi tính năng mới, tự hỏi: *"Tính năng này phá hỏng C, I hay A nào không?"* Nếu có — bạn cần kiểm soát bù.

## 3. 🎯 Threat Modeling với STRIDE

Microsoft giới thiệu **STRIDE** — 6 loại đe doạ thường gặp:

| Chữ | Mối đe doạ | Phá hoại đến |
|-----|------------|--------------|
| **S**poofing | Giả danh người khác | Authentication |
| **T**ampering | Sửa dữ liệu | Integrity |
| **R**epudiation | Chối bỏ hành động | Audit log |
| **I**nformation disclosure | Lộ dữ liệu | Confidentiality |
| **D**enial of Service | Làm sập dịch vụ | Availability |
| **E**levation of Privilege | Leo thang đặc quyền | Authorization |

## 4. 🧱 Defense in Depth — Bảo mật theo nhiều lớp

Không có viên đạn bạc. Một hệ thống an toàn có **nhiều lớp** phòng thủ:

\`\`\`text
Người dùng → CDN/WAF → Load Balancer → API Gateway (rate limit)
          → App (validate input, AuthN, AuthZ) → DB (RLS, parameterized query)
          → Logs/Alerts → Backup
\`\`\`

Nếu 1 lớp thủng, các lớp khác vẫn chặn được kẻ tấn công. Đó là tinh thần **defense in depth**.

## 5. ⚠️ Nguyên tắc vàng khi viết code

1. **Least Privilege**: cấp đúng quyền tối thiểu cần thiết.
2. **Fail Securely**: lỗi xảy ra phải về trạng thái an toàn (deny by default).
3. **Trust No Input**: mọi input (kể cả từ admin) đều phải validate.
4. **Secure by Default**: cấu hình mặc định phải an toàn (HTTPS bật, cookies HttpOnly).`,
        theoryEn: `## 1. 🚦 Why every developer must understand security

A single bad line can leak 10 million accounts. Security **is everyone's job** — it must live in the mindset behind every PR. This lesson lays that foundation for both newcomers and experienced devs.

## 2. 💡 The CIA Triad

- **Confidentiality**: only authorized people can read the data (password hashing, database RLS).
- **Integrity**: data cannot be modified without authorization (digital signatures, SHA-256, audit logs).
- **Availability**: the system is reachable when needed (rate limiting against DDoS, backups, failover).

> 💡 **Tip from Mr. Hai:** For every new feature, ask *"does this break C, I, or A?"* If yes — add a compensating control.

## 3. 🎯 Threat Modeling with STRIDE

Microsoft's STRIDE lists six common threats:

| Letter | Threat | Breaks |
|--------|--------|--------|
| **S**poofing | Impersonation | Authentication |
| **T**ampering | Data modification | Integrity |
| **R**epudiation | Denying actions | Audit logs |
| **I**nformation disclosure | Data leakage | Confidentiality |
| **D**enial of Service | Crash the service | Availability |
| **E**levation of Privilege | Gain higher rights | Authorization |

## 4. 🧱 Defense in Depth

No silver bullet. A safe system has **layered defenses**:

\`\`\`text
User → CDN/WAF → Load Balancer → API Gateway (rate limit)
     → App (validate input, AuthN, AuthZ) → DB (RLS, parameterized queries)
     → Logs/Alerts → Backup
\`\`\`

If one layer fails, others still stop the attacker.

## 5. ⚠️ Golden coding principles

1. **Least Privilege** — grant the minimum rights needed.
2. **Fail Securely** — on error, default to deny.
3. **Trust No Input** — validate every input, including from admins.
4. **Secure by Default** — defaults must be safe (HTTPS on, HttpOnly cookies).`,
        code: `// Ví dụ: Threat Model nhanh cho tính năng "Đổi mật khẩu"
// Áp dụng STRIDE + CIA trước khi viết 1 dòng code.

const threatModel = {
  feature: "Change Password",
  threats: {
    Spoofing: "Attacker đoán session token → yêu cầu re-auth bằng mật khẩu cũ",
    Tampering: "Sửa request body → server hash + verify ở backend, không tin client",
    Repudiation: "Không log → ghi audit_log: user_id, ip, user_agent, ts",
    InformationDisclosure: "Lộ password mới qua log → KHÔNG log password, redact",
    DenialOfService: "Spam đổi password → rate limit 5 lần/giờ/IP + tài khoản",
    ElevationOfPrivilege: "Đổi pass user khác → kiểm tra session.user_id === target.user_id",
  },
  defenseInDepth: [
    "1. WAF chặn pattern injection",
    "2. API: validate schema (zod), rate limit",
    "3. Service: re-auth + bcrypt(12) hash",
    "4. DB: UPDATE ... WHERE id = $1 (parameterized)",
    "5. Audit: ghi log + alert nếu 3 fail liên tiếp",
  ],
};

console.log(JSON.stringify(threatModel, null, 2));`,
        codeLanguage: "typescript",
        exercise: "Chọn 1 tính năng trong dự án bạn đang làm (đăng nhập, upload file, gửi email…). Viết bảng STRIDE với 6 mối đe doạ và biện pháp giảm thiểu cho từng cái. Xác định lớp bảo vệ nào (WAF/App/DB) sẽ xử lý.",
        exerciseEn: "Pick a feature in your current project (login, file upload, email…). Build a STRIDE table with 6 threats and a mitigation for each. Specify which layer (WAF/App/DB) handles it.",
        quiz: [
          { question: "Trong CIA Triad, chữ 'I' đại diện cho?", questionEn: "In the CIA triad, what does the 'I' stand for?", options: ["Identity", "Integrity", "Isolation", "Inheritance"], optionsEn: ["Identity", "Integrity", "Isolation", "Inheritance"], answer: 1, explanation: "Integrity — đảm bảo dữ liệu không bị sửa đổi trái phép.", explanationEn: "Integrity — guaranteeing data is not modified without authorization." },
          { question: "Tấn công làm server không phục vụ được người dùng hợp lệ thuộc loại nào trong STRIDE?", questionEn: "Which STRIDE category covers an attack that prevents legitimate users from being served?", options: ["Spoofing", "Tampering", "Denial of Service", "Repudiation"], optionsEn: ["Spoofing", "Tampering", "Denial of Service", "Repudiation"], answer: 2, explanation: "DoS phá hoại Availability — chữ A trong CIA.", explanationEn: "DoS attacks the Availability pillar — the 'A' in CIA." },
          { question: "Defense in Depth có ý nghĩa gì?", questionEn: "What does Defense in Depth mean?", options: ["Chỉ cần 1 firewall mạnh là đủ", "Nhiều lớp phòng thủ, nếu 1 lớp thủng vẫn còn lớp khác", "Mã hoá mọi thứ", "Chỉ tin admin"], optionsEn: ["A single strong firewall is enough", "Multiple layers of defense so one breach does not collapse the system", "Encrypt everything", "Only trust admins"], answer: 1, explanation: "Defense in Depth = layered defense; mỗi lớp độc lập nên 1 lớp thủng không sụp toàn hệ thống.", explanationEn: "Defense in Depth = layered defense; each layer is independent, so one breach does not topple the system." },
          { question: "Nguyên tắc 'Least Privilege' nghĩa là?", questionEn: "What does the 'Least Privilege' principle mean?", options: ["Cho user quyền tối thiểu để làm việc", "Cho admin toàn quyền", "Bỏ hết quyền", "Cho phép guest đọc mọi thứ"], optionsEn: ["Grant users only the minimum permissions they need", "Give admins full power", "Strip all permissions", "Let guests read everything"], answer: 0, explanation: "Least Privilege: cấp đúng quyền cần thiết, không hơn — giới hạn thiệt hại nếu tài khoản bị chiếm.", explanationEn: "Least Privilege: grant just-enough permissions to limit blast radius if an account is compromised." },
          { question: "Khi xử lý lỗi không xác định, hệ thống an toàn nên?", questionEn: "When handling an unknown error, a secure system should?", options: ["Allow by default", "Deny by default (Fail Securely)", "Bỏ qua lỗi", "Ghi ra console rồi tiếp tục"], optionsEn: ["Allow by default", "Deny by default (Fail Securely)", "Ignore the error", "Log to console and continue"], answer: 1, explanation: "Fail Securely: lỗi → từ chối thao tác để tránh bypass kiểm soát.", explanationEn: "Fail Securely: on error, deny the action to avoid bypassing controls." },
        ],
      },

      // ============ LESSON 2 ============
      {
        id: "cyber-2",
        title: "Xác thực & Phân quyền: Password, JWT, OAuth & RBAC",
        titleEn: "Authentication & Authorization: Passwords, JWT, OAuth & RBAC",
        level: 2,
        difficulty: "beginner",
        theory: `## 1. 🆚 Authentication vs Authorization

- **Authentication (AuthN)**: *"Bạn là ai?"* — kiểm tra danh tính.
- **Authorization (AuthZ)**: *"Bạn được làm gì?"* — kiểm tra quyền.

> 💡 Đăng nhập đúng (AuthN) **không** có nghĩa được xem hồ sơ user khác (AuthZ).

## 2. 🔑 Lưu mật khẩu đúng cách

KHÔNG BAO GIỜ lưu mật khẩu dạng plain text hay MD5/SHA-1. Dùng **hàm hash chậm** chuyên cho password:

- **bcrypt** (cost ≥ 12): mặc định an toàn năm 2026.
- **argon2id**: chuẩn vàng OWASP, kháng GPU.
- **scrypt**: kháng ASIC.

Luôn có **salt ngẫu nhiên** đi kèm để chống rainbow table.

## 3. 🎫 JWT (JSON Web Token)

JWT = 3 phần \`header.payload.signature\` (Base64Url), được ký bằng secret/khoá. Server **không cần lưu session** — chỉ cần verify chữ ký.

**Đúng cách:**
- Access token sống ngắn (5–15 phút).
- Refresh token dài hơn, lưu ở **HttpOnly + Secure + SameSite=Strict cookie**.
- Có chiến lược **revoke/rotation**.
- KHÔNG để token trong localStorage nếu app có XSS (xem bài 3).

## 4. 🌐 OAuth 2.0 & OpenID Connect

OAuth = **uỷ quyền** (delegated authorization). Người dùng cấp quyền cho app A truy cập tài nguyên ở Google/Facebook mà **không lộ mật khẩu**.

Luồng phổ biến: **Authorization Code + PKCE** (cho SPA & mobile).

OpenID Connect = OAuth + **ID Token** để xác thực danh tính.

## 5. 🛂 Mô hình phân quyền

- **RBAC** (Role-Based): gán user vào role (admin, teacher, student). Đơn giản, dễ audit.
- **ABAC** (Attribute-Based): quyết định theo thuộc tính (giờ, IP, tag dữ liệu). Linh hoạt nhưng phức tạp.
- **ReBAC** (Relationship-Based): theo quan hệ ("owner", "collaborator").

> 🛡️ **Quy tắc vàng:** Roles **phải lưu ở bảng riêng có RLS** (ví dụ \`user_roles\`), không bao giờ lưu trong cookie hay JWT client-side để tránh privilege escalation.`,
        theoryEn: `## 1. 🆚 Authentication vs Authorization

- **AuthN**: *"Who are you?"* — identity.
- **AuthZ**: *"What can you do?"* — permissions.

> 💡 Logging in (AuthN) does **not** mean you may view someone else's profile (AuthZ).

## 2. 🔑 Storing passwords correctly

NEVER store passwords as plain text or MD5/SHA-1. Use a **slow password-hash**:

- **bcrypt** (cost ≥ 12): safe default in 2026.
- **argon2id**: OWASP gold standard, GPU-resistant.
- **scrypt**: ASIC-resistant.

Always include a random **salt** to defeat rainbow tables.

## 3. 🎫 JWT

A JWT is \`header.payload.signature\` (Base64Url) signed with a secret/key. The server is **stateless** — it just verifies the signature.

**Best practice:**
- Short-lived access tokens (5–15 min).
- Refresh tokens in **HttpOnly + Secure + SameSite=Strict cookies**.
- Implement **revoke/rotation**.
- DO NOT store tokens in localStorage if the app is at risk of XSS (see Lesson 3).

## 4. 🌐 OAuth 2.0 & OpenID Connect

OAuth is **delegated authorization** — users let app A access resources at Google/Facebook **without sharing their password**.

Standard flow: **Authorization Code + PKCE** for SPAs & mobile.

OIDC = OAuth + **ID Token** to authenticate identity.

## 5. 🛂 Authorization models

- **RBAC**: assign users to roles (admin, teacher, student). Simple, auditable.
- **ABAC**: decide by attributes (time, IP, data tags). Flexible but complex.
- **ReBAC**: by relationships ("owner", "collaborator").

> 🛡️ **Golden rule:** roles **must** live in a separate RLS-protected table (e.g. \`user_roles\`), never inside client cookies or client-side JWT — otherwise privilege escalation is trivial.`,
        code: `// Node.js: hash password an toàn + tạo JWT ngắn hạn
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 12;
const JWT_SECRET = process.env.JWT_SECRET!; // KHÔNG hardcode

// 1) Đăng ký
export async function register(email: string, password: string) {
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  // INSERT INTO users(email, password_hash) VALUES ($1, $2)
  return { email, password_hash: hash };
}

// 2) Đăng nhập
export async function login(email: string, password: string, storedHash: string) {
  const ok = await bcrypt.compare(password, storedHash);
  if (!ok) throw new Error("Invalid credentials"); // KHÔNG nói rõ "sai mật khẩu"
  const accessToken = jwt.sign({ sub: email }, JWT_SECRET, {
    expiresIn: "15m",          // access ngắn
    algorithm: "HS256",
  });
  return { accessToken };
}

// 3) Middleware kiểm AuthZ với RBAC (role lấy từ bảng user_roles có RLS)
export function requireRole(role: "admin" | "teacher" | "student") {
  return async (req: any, res: any, next: any) => {
    const userId = req.user?.sub;
    const hasIt = await db.has_role(userId, role); // SECURITY DEFINER function
    if (!hasIt) return res.status(403).json({ error: "Forbidden" });
    next();
  };
}`,
        codeLanguage: "typescript",
        exercise: "Triển khai luồng đăng ký + đăng nhập dùng bcrypt cost 12 và JWT 15 phút. Thêm endpoint /admin chỉ cho phép user có role 'admin' (đọc từ bảng user_roles có RLS, KHÔNG đọc từ JWT). Viết test cố tình truy cập /admin với role 'student' và xác nhận trả về 403.",
        exerciseEn: "Build a register + login flow with bcrypt cost 12 and 15-minute JWTs. Add an /admin endpoint that only allows users with role 'admin' (read from an RLS-protected user_roles table, NOT from the JWT). Write a test that hits /admin as 'student' and expects a 403.",
        quiz: [
          { question: "Authentication trả lời câu hỏi nào?", questionEn: "Authentication answers which question?", options: ["Bạn được làm gì?", "Bạn là ai?", "Khi nào bạn đăng nhập?", "Bạn ở đâu?"], optionsEn: ["What are you allowed to do?", "Who are you?", "When did you log in?", "Where are you?"], answer: 1, explanation: "AuthN = xác minh danh tính. AuthZ mới trả lời 'được làm gì'.", explanationEn: "AuthN verifies identity; AuthZ decides what you can do." },
          { question: "Hash nào KHÔNG nên dùng để lưu mật khẩu năm 2026?", questionEn: "Which hash should NOT be used to store passwords in 2026?", options: ["bcrypt cost 12", "argon2id", "MD5", "scrypt"], optionsEn: ["bcrypt cost 12", "argon2id", "MD5", "scrypt"], answer: 2, explanation: "MD5 và SHA-1 nhanh, dễ brute-force bằng GPU. Dùng bcrypt/argon2id/scrypt.", explanationEn: "MD5/SHA-1 are too fast and GPU-bruteforceable. Use bcrypt/argon2id/scrypt." },
          { question: "Refresh token nên được lưu ở đâu trong web app?", questionEn: "Where should a refresh token be stored in a web app?", options: ["localStorage", "URL query string", "HttpOnly + Secure cookie", "console.log để debug"], optionsEn: ["localStorage", "URL query string", "HttpOnly + Secure cookie", "console.log for debugging"], answer: 2, explanation: "HttpOnly + Secure + SameSite=Strict cookie giúp JavaScript không đọc được token → giảm rủi ro XSS.", explanationEn: "An HttpOnly + Secure + SameSite=Strict cookie keeps the token out of reach of JavaScript, reducing XSS risk." },
          { question: "OAuth 2.0 chủ yếu giải quyết bài toán gì?", questionEn: "What problem does OAuth 2.0 primarily solve?", options: ["Mã hoá đối xứng", "Uỷ quyền (delegated authorization)", "Tăng tốc DB", "Load balancing"], optionsEn: ["Symmetric encryption", "Delegated authorization", "DB speed-up", "Load balancing"], answer: 1, explanation: "OAuth cho phép cấp quyền truy cập tài nguyên mà không lộ mật khẩu.", explanationEn: "OAuth lets you grant resource access without exposing the password." },
          { question: "Role của user nên được lưu ở đâu để chống privilege escalation?", questionEn: "Where should user roles be stored to prevent privilege escalation?", options: ["Trong JWT payload do client gửi lên", "Trong cookie không bảo vệ", "Bảng riêng (vd user_roles) có RLS + SECURITY DEFINER", "Trong localStorage"], optionsEn: ["In a JWT payload sent by the client", "In an unprotected cookie", "A dedicated table (e.g. user_roles) with RLS + SECURITY DEFINER", "In localStorage"], answer: 2, explanation: "Roles phải ở bảng riêng có RLS; check qua hàm SECURITY DEFINER để tránh đệ quy và privilege escalation.", explanationEn: "Roles belong in a dedicated RLS-protected table, checked via a SECURITY DEFINER function to avoid recursion and escalation." },
        ],
      },

      // ============ LESSON 3 ============
      {
        id: "cyber-3",
        title: "OWASP Top 10 trong thực chiến: SQLi, XSS, CSRF, IDOR",
        titleEn: "OWASP Top 10 in Practice: SQLi, XSS, CSRF, IDOR",
        level: 3,
        difficulty: "intermediate",
        theory: `## 1. 📋 OWASP Top 10 là gì?

**OWASP Top 10** là danh sách 10 rủi ro bảo mật web phổ biến nhất, cập nhật vài năm/lần. Bài này tập trung 4 lỗ hổng dev gặp **hằng tuần**: SQLi, XSS, CSRF, IDOR.

## 2. 💉 SQL Injection (SQLi)

Xảy ra khi bạn nhét input người dùng trực tiếp vào câu SQL.

\`\`\`python
# ❌ Nguy hiểm
query = f"SELECT * FROM users WHERE name = '{name}'"
# Nếu name = "' OR 1=1 --" → trả về toàn bộ user!

# ✅ An toàn: parameterized
cursor.execute("SELECT * FROM users WHERE name = %s", (name,))
\`\`\`

**Phòng chống:** parameterized query, ORM (Prisma/SQLAlchemy), validate input, least-privilege DB user.

## 3. 🪧 Cross-Site Scripting (XSS)

Attacker chèn JS độc vào trang để chạy trên trình duyệt nạn nhân — đánh cắp cookie, keystroke, deface.

3 dạng: **Stored**, **Reflected**, **DOM-based**.

\`\`\`tsx
// ❌ Nguy hiểm trong React
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ An toàn
import DOMPurify from "dompurify";
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />
\`\`\`

**Phòng chống:** escape output theo context (HTML/JS/URL), **CSP** (Content-Security-Policy), DOMPurify, cookies HttpOnly.

## 4. 🎭 CSRF (Cross-Site Request Forgery)

Lừa nạn nhân đã đăng nhập click 1 link để trình duyệt **tự** gửi request kèm cookie sang site đích → thực hiện hành động ngoài ý muốn (chuyển tiền, xoá tài khoản).

**Phòng chống:**
- Cookie **SameSite=Lax / Strict** (mặc định an toàn cho 90% tình huống).
- **CSRF token** cho form đổi trạng thái.
- Kiểm tra header \`Origin\`/\`Referer\`.

## 5. 🔓 IDOR (Insecure Direct Object Reference)

Attacker đổi \`id\` trong URL/body để truy cập tài nguyên không thuộc về mình.

\`\`\`
GET /api/invoices/123  →  GET /api/invoices/124
\`\`\`

**Phòng chống bằng AuthZ ở mọi truy vấn:**

\`\`\`sql
-- ❌ Sai: chỉ kiểm tra ID
SELECT * FROM invoices WHERE id = $1;

-- ✅ Đúng: ràng buộc owner
SELECT * FROM invoices WHERE id = $1 AND user_id = auth.uid();
-- hoặc dùng RLS policy
\`\`\`

> 💡 **Mẹo của thầy Hải:** Với mỗi PR đụng vào dữ liệu, hỏi: *"Đã authenticated thì có authorized chưa? User X có xem được data của user Y không?"*`,
        theoryEn: `## 1. 📋 What is OWASP Top 10?

OWASP Top 10 lists the most common web security risks, refreshed every few years. This lesson focuses on the four bugs devs hit **weekly**: SQLi, XSS, CSRF, IDOR.

## 2. 💉 SQL Injection

Happens when user input is concatenated into SQL.

\`\`\`python
# ❌ Dangerous
query = f"SELECT * FROM users WHERE name = '{name}'"
# name = "' OR 1=1 --" returns every user!

# ✅ Safe: parameterized
cursor.execute("SELECT * FROM users WHERE name = %s", (name,))
\`\`\`

**Mitigation:** parameterized queries, ORM, input validation, a least-privileged DB user.

## 3. 🪧 Cross-Site Scripting (XSS)

Attacker injects JS that runs in the victim's browser — stealing cookies, keystrokes, defacing pages. Three flavours: **Stored**, **Reflected**, **DOM-based**.

\`\`\`tsx
// ❌ Dangerous in React
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ Safe
import DOMPurify from "dompurify";
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />
\`\`\`

**Mitigation:** context-aware output encoding, **CSP** headers, DOMPurify, HttpOnly cookies.

## 4. 🎭 CSRF

Tricks a logged-in victim into clicking a link so their browser **auto-sends** a request with cookies — performing actions they never intended.

**Mitigation:**
- Cookies with **SameSite=Lax / Strict** (safe default for 90% of cases).
- **CSRF tokens** on state-changing forms.
- Validate \`Origin\`/\`Referer\` headers.

## 5. 🔓 IDOR

Attacker changes an \`id\` in the URL/body to reach resources they don't own.

\`\`\`
GET /api/invoices/123  →  GET /api/invoices/124
\`\`\`

**Mitigation — enforce AuthZ on every query:**

\`\`\`sql
-- ❌ Wrong: only id check
SELECT * FROM invoices WHERE id = $1;

-- ✅ Right: owner constraint
SELECT * FROM invoices WHERE id = $1 AND user_id = auth.uid();
-- or rely on an RLS policy
\`\`\`

> 💡 **Tip from Mr. Hai:** for every PR touching data, ask *"once authenticated, are we authorized? Can user X see user Y's data?"*`,
        code: `// Express + PostgreSQL: 4 lỗi và bản sửa
import express from "express";
import DOMPurify from "isomorphic-dompurify";
import { db } from "./db";

const app = express();
app.use(express.json());

// ❌ SQLi
app.get("/bad/users", async (req, res) => {
  const r = await db.raw(\`SELECT * FROM users WHERE name = '\${req.query.name}'\`);
  res.json(r);
});
// ✅ SQLi fix
app.get("/users", async (req, res) => {
  const r = await db.query("SELECT id, name FROM users WHERE name = $1", [req.query.name]);
  res.json(r.rows);
});

// ❌ XSS — render thẳng comment
app.get("/bad/comment", (req, res) => {
  res.send(\`<div>\${req.query.text}</div>\`);
});
// ✅ XSS fix
app.get("/comment", (req, res) => {
  res.send(\`<div>\${DOMPurify.sanitize(String(req.query.text ?? ""))}</div>\`);
});

// ✅ CSRF: cookies + token + SameSite
app.use((req, res, next) => {
  res.cookie("sid", "abc", { httpOnly: true, secure: true, sameSite: "strict" });
  next();
});

// ❌ IDOR
app.get("/bad/invoice/:id", async (req, res) => {
  const r = await db.query("SELECT * FROM invoices WHERE id = $1", [req.params.id]);
  res.json(r.rows[0]);
});
// ✅ IDOR fix
app.get("/invoice/:id", async (req, res) => {
  const r = await db.query(
    "SELECT * FROM invoices WHERE id = $1 AND user_id = $2",
    [req.params.id, req.user.id]
  );
  if (!r.rowCount) return res.status(404).end(); // 404 thay vì 403 để tránh leak existence
  res.json(r.rows[0]);
});`,
        codeLanguage: "typescript",
        exercise: "Tìm 1 endpoint trong dự án của bạn có thể bị IDOR. Viết test cố tình truy cập tài nguyên của user khác và xác nhận trả 404. Sau đó thêm DOMPurify cho 1 chỗ render HTML do user nhập, và bật cookie HttpOnly + SameSite=Strict cho session.",
        exerciseEn: "Find one endpoint in your project that could leak via IDOR. Write a test that fetches another user's resource and expects a 404. Then add DOMPurify to one user-HTML render and switch your session cookie to HttpOnly + SameSite=Strict.",
        quiz: [
          { question: "Cách phòng SQL Injection đáng tin cậy nhất?", questionEn: "Most reliable defense against SQL Injection?", options: ["Escape ký tự ' bằng tay", "Parameterized queries / ORM", "Đặt DB ở mạng nội bộ", "Chỉ dùng SELECT, không UPDATE"], optionsEn: ["Manually escape quotes", "Parameterized queries / ORM", "Put the DB on an internal network", "Use only SELECT, never UPDATE"], answer: 1, explanation: "Parameterized queries tách lệnh khỏi dữ liệu — DB không bao giờ thực thi input như SQL.", explanationEn: "Parameterized queries separate code from data — the DB never executes input as SQL." },
          { question: "Trong React, render HTML do user nhập an toàn bằng cách nào?", questionEn: "How do you safely render user-supplied HTML in React?", options: ["dangerouslySetInnerHTML trực tiếp", "DOMPurify.sanitize trước khi dangerouslySetInnerHTML", "eval(userInput)", "Lưu vào DB rồi render"], optionsEn: ["dangerouslySetInnerHTML directly", "DOMPurify.sanitize before dangerouslySetInnerHTML", "eval(userInput)", "Save to DB then render"], answer: 1, explanation: "DOMPurify loại bỏ tag/attr/JS độc, sau đó mới gắn vào DOM.", explanationEn: "DOMPurify strips malicious tags/attrs/JS before the HTML reaches the DOM." },
          { question: "SameSite cookie giúp chặn loại tấn công nào nhiều nhất?", questionEn: "SameSite cookies most directly mitigate which attack?", options: ["SQL Injection", "XSS", "CSRF", "DDoS"], optionsEn: ["SQL Injection", "XSS", "CSRF", "DDoS"], answer: 2, explanation: "SameSite ngăn browser gửi cookie kèm request cross-site → chặn CSRF cơ bản.", explanationEn: "SameSite stops the browser from sending cookies on cross-site requests — blocks basic CSRF." },
          { question: "Lỗ hổng IDOR xảy ra khi?", questionEn: "An IDOR vulnerability happens when?", options: ["Mật khẩu yếu", "Không kiểm tra quyền sở hữu tài nguyên theo user", "Thiếu HTTPS", "Cache quá lâu"], optionsEn: ["Weak passwords", "Resource ownership is not checked per user", "Missing HTTPS", "Cache lives too long"], answer: 1, explanation: "IDOR = chỉ kiểm tra ID mà không kiểm tra user có sở hữu/được phép truy cập tài nguyên đó.", explanationEn: "IDOR = checking only the ID without verifying that the user owns or may access the resource." },
          { question: "Khi IDOR thất bại, response nên trả?", questionEn: "When an IDOR check fails, what should the response be?", options: ["403 chi tiết kèm message 'không phải của bạn'", "404 (giấu sự tồn tại tài nguyên)", "500", "200 với body rỗng"], optionsEn: ["Detailed 403 with a 'not yours' message", "404 (hide whether the resource exists)", "500", "200 with empty body"], answer: 1, explanation: "Trả 404 (hoặc 403 chung chung) để tránh leak thông tin có/không tồn tại tài nguyên.", explanationEn: "Return 404 (or generic 403) to avoid leaking the existence of the resource." },
        ],
      },

      // ============ LESSON 4 ============
      {
        id: "cyber-4",
        title: "Mật mã cho lập trình viên: Hashing, Symmetric, Asymmetric & TLS",
        titleEn: "Cryptography for Developers: Hashing, Symmetric, Asymmetric & TLS",
        level: 3,
        difficulty: "intermediate",
        theory: `## 1. 🧮 Hashing — Một chiều

Hash biến input → output có độ dài cố định, **không thể đảo ngược**.

| Mục đích | Hàm nên dùng | Tránh |
|----------|--------------|-------|
| Kiểm tra toàn vẹn file | SHA-256 / SHA-3 | MD5, SHA-1 |
| Lưu password | bcrypt / argon2id | MD5, SHA-1, SHA-256 trần |
| HMAC (chữ ký API) | HMAC-SHA256 | MD5 |

> ⚠️ SHA-256 **không** dùng cho password vì quá nhanh — kẻ tấn công brute-force hàng tỉ phép/giây trên GPU.

## 2. 🔐 Mã hoá đối xứng (Symmetric)

1 khoá duy nhất vừa mã hoá vừa giải mã. Nhanh, dùng cho dữ liệu lớn.

- **AES-256-GCM**: chuẩn vàng năm 2026 (vừa mã hoá vừa xác thực — AEAD).
- **ChaCha20-Poly1305**: thay thế tốt trên mobile.

**Nguyên tắc:**
- Luôn dùng **IV/nonce** ngẫu nhiên cho mỗi message.
- Không tự thiết kế thuật toán ("Don't roll your own crypto").

## 3. 🔑 Mã hoá bất đối xứng (Asymmetric)

Cặp khoá công khai/riêng tư:
- **Public key**: ai cũng có, dùng để mã hoá hoặc verify chữ ký.
- **Private key**: chỉ chủ sở hữu giữ, dùng để giải mã hoặc ký.

Dùng nhiều cho TLS, JWT (RS256/ES256), SSH, ký phần mềm.

- **RSA-2048/3072**: vẫn ổn nhưng chậm.
- **Ed25519 / ECDSA P-256**: nhanh, khoá ngắn.

## 4. 🌐 TLS 1.3 — HTTPS làm gì cho bạn?

TLS cung cấp:
1. **Mã hoá** kênh truyền (Confidentiality).
2. **Toàn vẹn** dữ liệu trên đường truyền (Integrity).
3. **Xác thực** server qua certificate (đôi khi cả client).

Năm 2026 dùng **TLS 1.3**, tắt TLS 1.0/1.1, ép HSTS \`max-age=31536000; includeSubDomains; preload\`.

## 5. 🗝️ Quản lý khoá (Key Management)

Khoá lộ = mọi thứ vô nghĩa. Nguyên tắc:
- KHÔNG commit khoá vào Git (dùng \`.env\`, secret manager).
- Lưu trong **KMS**/Vault (AWS KMS, GCP KMS, Azure Key Vault, HashiCorp Vault).
- **Rotation** định kỳ (90 ngày là chuẩn).
- Phân quyền theo least-privilege; audit log mỗi lần dùng khoá.`,
        theoryEn: `## 1. 🧮 Hashing — one-way

A hash maps an input to a fixed-length output that **cannot be reversed**.

| Use case | Use | Avoid |
|----------|-----|-------|
| File integrity | SHA-256 / SHA-3 | MD5, SHA-1 |
| Password storage | bcrypt / argon2id | MD5, SHA-1, raw SHA-256 |
| HMAC (API signing) | HMAC-SHA256 | MD5 |

> ⚠️ SHA-256 is **not** for passwords — it's too fast; attackers brute-force billions/sec on GPUs.

## 2. 🔐 Symmetric encryption

Same key for encrypt & decrypt. Fast, for bulk data.

- **AES-256-GCM**: gold standard in 2026 (authenticated encryption — AEAD).
- **ChaCha20-Poly1305**: great mobile alternative.

**Rules:**
- Always use a random **IV/nonce** per message.
- Don't roll your own crypto.

## 3. 🔑 Asymmetric encryption

Public/private key pair:
- **Public**: anyone can have it; encrypt or verify signature.
- **Private**: owner only; decrypt or sign.

Used for TLS, JWT (RS256/ES256), SSH, code signing.

- **RSA-2048/3072**: still OK but slow.
- **Ed25519 / ECDSA P-256**: fast, short keys.

## 4. 🌐 TLS 1.3

TLS gives you:
1. Channel **encryption** (Confidentiality).
2. **Integrity** on the wire.
3. Server **authentication** via certificate (sometimes client too).

In 2026 use **TLS 1.3**, disable 1.0/1.1, enforce HSTS \`max-age=31536000; includeSubDomains; preload\`.

## 5. 🗝️ Key management

If a key leaks, your crypto is meaningless.
- NEVER commit keys to Git (\`.env\`, secret managers).
- Store in **KMS**/Vault (AWS KMS, GCP KMS, Azure Key Vault, HashiCorp Vault).
- **Rotate** keys (90 days is the norm).
- Least-privilege access; audit log every use.`,
        code: `// Node.js: 4 use case mật mã thường gặp
import { createHash, randomBytes, createCipheriv, createDecipheriv, createSign, createVerify, generateKeyPairSync } from "crypto";

// 1) Hash file để check toàn vẹn
function fileHash(buf: Buffer) {
  return createHash("sha256").update(buf).digest("hex");
}

// 2) AES-256-GCM (AEAD) — mã hoá + xác thực
function aesEncrypt(plaintext: string, key: Buffer) {
  const iv = randomBytes(12); // 96-bit nonce cho GCM
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const enc = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return { iv: iv.toString("base64"), ct: enc.toString("base64"), tag: tag.toString("base64") };
}
function aesDecrypt({ iv, ct, tag }: any, key: Buffer) {
  const decipher = createDecipheriv("aes-256-gcm", key, Buffer.from(iv, "base64"));
  decipher.setAuthTag(Buffer.from(tag, "base64"));
  return Buffer.concat([decipher.update(Buffer.from(ct, "base64")), decipher.final()]).toString("utf8");
}

// 3) Ký & verify message với Ed25519
const { publicKey, privateKey } = generateKeyPairSync("ed25519");
function sign(msg: string) {
  return createSign("SHA256").update(msg).end().sign(privateKey).toString("base64");
}
function verify(msg: string, sigB64: string) {
  return createVerify("SHA256").update(msg).end().verify(publicKey, Buffer.from(sigB64, "base64"));
}

// 4) Sinh khoá AES an toàn (32 bytes = 256-bit) — đừng dùng Math.random!
const KEY = randomBytes(32);

const enc = aesEncrypt("secret message", KEY);
console.log(enc, "→", aesDecrypt(enc, KEY));
console.log("file hash:", fileHash(Buffer.from("hello")));`,
        codeLanguage: "typescript",
        exercise: "Xây 1 utility \`encryptField(plaintext)\` dùng AES-256-GCM, lưu \`{iv, ct, tag}\` vào Postgres ở 3 cột riêng. Viết test: (1) encrypt → decrypt round-trip, (2) đổi 1 byte trong ct và xác nhận decrypt **fail** (auth tag chặn). Lấy KEY từ env hoặc KMS, đừng hardcode.",
        exerciseEn: "Build a \`encryptField(plaintext)\` helper using AES-256-GCM, storing \`{iv, ct, tag}\` in three Postgres columns. Write tests: (1) round-trip encrypt → decrypt, (2) flip a byte in ct and confirm decrypt **fails** (auth tag catches it). Load KEY from env/KMS, no hardcode.",
        quiz: [
          { question: "Tại sao SHA-256 trần KHÔNG nên dùng để lưu mật khẩu?", questionEn: "Why is plain SHA-256 NOT suitable for storing passwords?", options: ["Cho output quá dài", "Tính toán quá nhanh → dễ brute-force trên GPU", "Không có salt", "Đã bị bẻ khoá"], optionsEn: ["Output is too long", "It is too fast → easy to brute-force on GPUs", "It has no salt", "It is broken"], answer: 1, explanation: "Hash mật khẩu cần **chậm có chủ ý** (bcrypt/argon2id) để chống brute-force.", explanationEn: "Password hashes must be **deliberately slow** (bcrypt/argon2id) to resist brute force." },
          { question: "AES-256-GCM khác AES-256-CBC điểm cốt lõi nào?", questionEn: "What is the core difference between AES-256-GCM and AES-256-CBC?", options: ["GCM nhanh hơn nên không cần IV", "GCM là AEAD — vừa mã hoá vừa xác thực, chặn tampering", "CBC mạnh hơn", "Không khác gì"], optionsEn: ["GCM is faster so it needs no IV", "GCM is AEAD — encrypts AND authenticates, blocking tampering", "CBC is stronger", "No difference"], answer: 1, explanation: "GCM tạo auth tag giúp phát hiện khi ciphertext bị sửa; CBC trần không có và dễ bị padding-oracle.", explanationEn: "GCM produces an auth tag that detects ciphertext tampering; plain CBC has none and is vulnerable to padding-oracle attacks." },
          { question: "Cùng 1 khoá AES-GCM, IV (nonce) nên được dùng thế nào?", questionEn: "With a single AES-GCM key, how should the IV (nonce) be used?", options: ["Hardcoded để dễ test", "Tăng dần", "Ngẫu nhiên/duy nhất cho mỗi message", "Lấy từ user input"], optionsEn: ["Hardcoded for easy testing", "Monotonic counter", "Random / unique per message", "Sourced from user input"], answer: 2, explanation: "Lặp IV trong GCM cùng key là thảm hoạ — kẻ tấn công có thể recover plaintext và forge tag.", explanationEn: "Reusing an IV with the same GCM key is catastrophic — attackers can recover plaintext and forge tags." },
          { question: "Trong TLS, certificate giúp giải quyết vấn đề gì?", questionEn: "In TLS, what problem does the certificate solve?", options: ["Xác thực server (chống MITM)", "Mã hoá nhanh hơn", "Giảm latency", "Không liên quan"], optionsEn: ["Server authentication (anti-MITM)", "Faster encryption", "Lower latency", "Unrelated"], answer: 0, explanation: "Certificate được CA ký, client verify → biết đang nói chuyện với server thật chứ không phải kẻ MITM.", explanationEn: "Certificates are CA-signed and client-verified, proving you're talking to the real server, not a MITM." },
          { question: "Quản lý khoá an toàn nên?", questionEn: "Safe key management should?", options: ["Commit .env có khoá vào private repo", "Lưu trong KMS/Vault, rotation định kỳ, audit log", "Gửi qua Slack cho team", "Hardcode trong source"], optionsEn: ["Commit a key-bearing .env to a private repo", "Store in KMS/Vault, rotate regularly, with audit logs", "Share over Slack with the team", "Hardcode in source"], answer: 1, explanation: "KMS/Vault + rotation + audit là chuẩn. Repo private vẫn không an toàn (lộ qua dev laptop, fork…).", explanationEn: "KMS/Vault + rotation + audit is the standard. Even private repos leak (dev laptops, forks…)." },
        ],
      },

      // ============ LESSON 5 ============
      {
        id: "cyber-5",
        title: "Bảo mật API & Cloud: Rate Limit, Secrets, CORS, CSP, RLS",
        titleEn: "Secure API & Cloud: Rate Limit, Secrets, CORS, CSP, RLS",
        level: 4,
        difficulty: "advanced",
        theory: `## 1. ⏱️ Rate Limiting & Quotas

Chống brute-force, scraping và DoS. Áp dụng đa tầng:

- **Per IP**: ví dụ 60 req/phút.
- **Per user**: 1000 req/giờ.
- **Per endpoint**: \`/login\` chặt hơn \`/search\`.

Triển khai bằng **token bucket / sliding window** trong Redis hoặc Cloudflare / Upstash / Supabase edge.

## 2. 🔒 Secrets Management

- Đặt secret trong **secret manager** (AWS Secrets Manager, Doppler, Vault).
- Không commit \`.env\`.
- **Rotation** + **revoke ngay** khi nghi lộ.
- Cấp scope tối thiểu (ví dụ token CI chỉ deploy được, không đọc DB).
- Edge function gọi API bên thứ 3 → giữ key ở server, **không** trả về client.

## 3. 🌐 CORS đúng cách

CORS không phải để bảo mật server — nó **giới hạn** trình duyệt khác origin gọi API của bạn. Cấu hình sai = mở toang.

\`\`\`ts
// ❌ Sai
app.use(cors({ origin: "*", credentials: true })); // 'Access-Control-Allow-Origin: *' + credentials bị browser TỪ CHỐI và là dấu hiệu cấu hình ẩu

// ✅ Đúng
app.use(cors({
  origin: ["https://haiedutech.com", "https://app.haiedutech.com"],
  credentials: true,
  methods: ["GET", "POST"],
}));
\`\`\`

## 4. 🛡️ Security Headers (must-have 2026)

\`\`\`http
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-RANDOM'; object-src 'none'
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), camera=()
\`\`\`

**CSP** đặc biệt mạnh — chặn XSS ngay cả khi DOMPurify thủng.

## 5. 🗃️ RLS — Row Level Security ở DB

Bảo vệ cuối cùng. Dù API tầng trên có bug, DB vẫn từ chối query không hợp lệ.

\`\`\`sql
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "owner read" ON notes
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "owner write" ON notes
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());
\`\`\`

> ⚠️ **GRANT trước, RLS sau.** Trên Supabase/PostgREST mới: bảng public không có default grant — phải \`GRANT SELECT, INSERT, UPDATE, DELETE ON public.notes TO authenticated;\` rồi mới bật RLS.

## 6. ☁️ Cloud: IAM theo Least Privilege

- Tách **role** theo môi trường (dev/stg/prod).
- Không dùng **root account** ngoài lúc tạo.
- Bật **MFA**, audit log (CloudTrail/Activity Log).
- VPC + Security Group chặt: cho phép từng port/IP cụ thể.
- Bật **automatic backup + encryption at rest** cho database & storage.`,
        theoryEn: `## 1. ⏱️ Rate Limiting & Quotas

Stops brute-force, scraping, DoS. Apply at multiple levels:

- **Per IP**: e.g. 60 req/min.
- **Per user**: 1000 req/hour.
- **Per endpoint**: \`/login\` stricter than \`/search\`.

Use **token bucket / sliding window** in Redis or Cloudflare / Upstash / Supabase edge.

## 2. 🔒 Secrets Management

- Store in a **secret manager** (AWS Secrets Manager, Doppler, Vault).
- Never commit \`.env\`.
- Rotate + **revoke immediately** on suspected leak.
- Minimum scope (CI token may deploy only, not read DB).
- Edge functions calling third-party APIs keep keys server-side — **never** return to the client.

## 3. 🌐 CORS done right

CORS isn't a server-side defense — it limits **other-origin browsers** from calling your API. Misconfig = wide open.

\`\`\`ts
// ❌ Wrong
app.use(cors({ origin: "*", credentials: true })); // browser rejects '*' + credentials anyway, and it signals sloppy config

// ✅ Right
app.use(cors({
  origin: ["https://haiedutech.com", "https://app.haiedutech.com"],
  credentials: true,
  methods: ["GET", "POST"],
}));
\`\`\`

## 4. 🛡️ Security headers (must-have in 2026)

\`\`\`http
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-RANDOM'; object-src 'none'
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), camera=()
\`\`\`

**CSP** is extremely powerful — blocks XSS even when DOMPurify slips.

## 5. 🗃️ RLS — Row Level Security

Last-line defense. Even with an app bug, the DB still refuses bad queries.

\`\`\`sql
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "owner read" ON notes
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "owner write" ON notes
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());
\`\`\`

> ⚠️ **GRANT first, then RLS.** Modern Supabase/PostgREST has no default public grants — you must \`GRANT SELECT, INSERT, UPDATE, DELETE ON public.notes TO authenticated;\` and then enable RLS.

## 6. ☁️ Cloud: least-privilege IAM

- Separate **roles** by environment (dev/stg/prod).
- Don't use the **root account** after setup.
- Enable **MFA**, audit logs (CloudTrail/Activity Log).
- Lock down VPC + Security Groups; allow specific ports/IPs only.
- Turn on **automatic backups + encryption at rest** for DB and storage.`,
        code: `// Edge Function (Deno) — pattern bảo mật chuẩn 2026
// Rate limit + CORS chặt + secret từ env + log có ích.
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const ALLOWED_ORIGINS = ["https://haiedutech.com", "https://app.haiedutech.com"];
const RATE = new Map<string, { count: number; reset: number }>();

function corsHeaders(origin: string | null) {
  const allow = ALLOWED_ORIGINS.includes(origin ?? "") ? origin! : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Headers": "authorization, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Vary": "Origin",
  };
}

function rateLimit(key: string, limit = 30, windowMs = 60_000) {
  const now = Date.now();
  const bucket = RATE.get(key);
  if (!bucket || now > bucket.reset) {
    RATE.set(key, { count: 1, reset: now + windowMs });
    return true;
  }
  if (bucket.count >= limit) return false;
  bucket.count++;
  return true;
}

serve(async (req) => {
  const origin = req.headers.get("origin");
  const cors = corsHeaders(origin);

  if (req.method === "OPTIONS") return new Response(null, { headers: cors });

  // Lấy IP qua header proxy (chuẩn hoá theo provider)
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  if (!rateLimit(ip, 30)) {
    return new Response(JSON.stringify({ error: "Too many requests" }), {
      status: 429,
      headers: { ...cors, "content-type": "application/json", "retry-after": "60" },
    });
  }

  const apiKey = Deno.env.get("OPENAI_API_KEY"); // ✅ ở server, không trả về client
  if (!apiKey) {
    console.error("missing OPENAI_API_KEY"); // không log secret
    return new Response("Server misconfigured", { status: 500, headers: cors });
  }

  // ... gọi API bên thứ 3 ở đây, đừng forward header Authorization của user ...

  return new Response(JSON.stringify({ ok: true }), {
    headers: { ...cors, "content-type": "application/json" },
  });
});`,
        codeLanguage: "typescript",
        exercise: "Đối với 1 bảng public mới (vd \`notes\`): (1) viết migration \`CREATE TABLE\` + \`GRANT\` cho \`authenticated\` và \`service_role\`, (2) bật RLS với 4 policy CRUD theo \`auth.uid()\`, (3) thêm rate limit 30 req/phút/IP cho endpoint POST /notes, (4) cấu hình CORS chỉ cho 2 origin production.",
        exerciseEn: "For a new public table (e.g. \`notes\`): (1) write a migration with \`CREATE TABLE\` + \`GRANT\` to \`authenticated\` and \`service_role\`, (2) enable RLS with 4 CRUD policies keyed on \`auth.uid()\`, (3) add a 30 req/min/IP rate limit to POST /notes, (4) lock CORS to two production origins only.",
        quiz: [
          { question: "Khi tạo bảng public mới trong Supabase/PostgREST, bước nào BẮT BUỘC sau CREATE TABLE?", questionEn: "After CREATE TABLE on a new public table in Supabase/PostgREST, which step is MANDATORY?", options: ["Chỉ cần bật RLS", "GRANT cho role tương ứng (authenticated, service_role) rồi mới bật RLS + policy", "Drop bảng cũ", "Tạo index"], optionsEn: ["Just enable RLS", "GRANT to the proper roles (authenticated, service_role), then enable RLS + policies", "Drop the old table", "Create an index"], answer: 1, explanation: "Không có default grant — không GRANT thì API sẽ báo permission denied dù policy đúng.", explanationEn: "There is no default grant — without GRANT the API returns permission denied even with correct policies." },
          { question: "Cấu hình `Access-Control-Allow-Origin: *` cùng `credentials: true` sẽ?", questionEn: "Configuring `Access-Control-Allow-Origin: *` together with `credentials: true` will?", options: ["Hoạt động bình thường", "Bị browser từ chối — và là dấu hiệu cấu hình ẩu", "Tăng tốc CORS", "Tự động bật HTTPS"], optionsEn: ["Work normally", "Be rejected by browsers — and signals sloppy config", "Speed up CORS", "Auto-enable HTTPS"], answer: 1, explanation: "Spec không cho phép '*' với credentials; phải liệt kê origin cụ thể.", explanationEn: "The spec forbids '*' with credentials — explicit origins are required." },
          { question: "API key của OpenAI/Stripe nên được gọi từ đâu?", questionEn: "Where should OpenAI/Stripe API keys be called from?", options: ["Frontend, gắn vào fetch()", "Server / edge function, đọc từ env / KMS", "URL query string", "Hardcode trong app mobile"], optionsEn: ["Frontend inside fetch()", "Server / edge function, read from env / KMS", "URL query string", "Hardcoded in the mobile app"], answer: 1, explanation: "Key ở backend giúp tránh leak qua DevTools, repo, mirror site.", explanationEn: "Backend-only keys avoid leaks via DevTools, repos, or mirrored sites." },
          { question: "Lợi ích lớn nhất của Content-Security-Policy?", questionEn: "Biggest benefit of Content-Security-Policy?", options: ["Tăng tốc trang", "Chặn script không cho phép → giảm tác động XSS dù sanitize sót", "Giảm size CSS", "Bật HTTP/3"], optionsEn: ["Page speed", "Block unauthorized scripts → mitigate XSS even when sanitization misses", "Reduce CSS size", "Enable HTTP/3"], answer: 1, explanation: "CSP whitelist nguồn script/style — XSS không có nguồn cho phép sẽ bị browser chặn.", explanationEn: "CSP whitelists script/style sources — XSS payloads from unapproved sources are blocked." },
          { question: "Rate limit /login khác /search ở chỗ?", questionEn: "How does rate-limiting /login differ from /search?", options: ["Không khác", "/login cần chặt hơn để chống brute-force credential", "/search cần chặt hơn vì tốn DB", "Cả hai phải bằng 1000 req/giây"], optionsEn: ["No difference", "/login needs tighter limits to stop credential brute force", "/search needs tighter limits because it hits the DB", "Both must be 1000 req/s"], answer: 1, explanation: "Endpoint nhạy cảm (login, password reset, OTP) cần limit thấp + lockout sau N lần fail.", explanationEn: "Sensitive endpoints (login, password reset, OTP) need low limits + lockout after N failures." },
        ],
      },

      // ============ LESSON 6 ============
      {
        id: "cyber-6",
        title: "Logging, Monitoring & Incident Response",
        titleEn: "Logging, Monitoring & Incident Response",
        level: 5,
        difficulty: "advanced",
        theory: `## 1. 📜 Log gì, KHÔNG log gì?

**Nên log:**
- Sự kiện auth: login success/fail, password reset, MFA, role change.
- Hành động đổi state: create/update/delete bản ghi nhạy cảm.
- Lỗi 4xx/5xx (kèm request id).
- Hành vi bất thường: rate limit hit, IP lạ.

**TUYỆT ĐỐI KHÔNG log:**
- Mật khẩu, OTP, session token, JWT, API key, số thẻ.
- PII vượt mức cần thiết.

Mỗi log dòng nên có **request id, user id, ip, ts, action, result, latency**.

## 2. 🚨 SIEM & Alerting

Tập trung log vào 1 hệ thống (Datadog, Grafana Loki, Elastic, BigQuery + Looker). Đặt **alert** cho:

- ≥ 5 login fail trong 10 phút từ 1 IP.
- Truy cập \`/admin\` ngoài giờ làm.
- Lỗi 5xx > 1% trong 5 phút.
- Token bị dùng từ 2 quốc gia trong 1 giờ.

> 💡 Alert mệt mỏi = alert bị bỏ qua. Tinh chỉnh threshold.

## 3. 🔥 Incident Response — Quy trình 6 bước (NIST)

1. **Preparation**: runbook, contact list, quyền tạm thời.
2. **Identification**: xác nhận có thực sự là sự cố? Severity 1–4?
3. **Containment**: cô lập — revoke token, đóng port, disable account.
4. **Eradication**: xoá malware, vá lỗ hổng, reset secret.
5. **Recovery**: khôi phục từ backup sạch, theo dõi tái phát.
6. **Lessons Learned**: post-mortem **blameless** trong 5 ngày.

## 4. 🧪 Bảo mật trong CI/CD (DevSecOps)

- **SAST**: Semgrep / CodeQL quét code mỗi PR.
- **Dependency scan**: \`npm audit\`, \`pip-audit\`, Dependabot.
- **Secret scanning**: gitleaks/truffleHog block commit chứa key.
- **Container scan**: Trivy/Grype quét image.
- **DAST**: OWASP ZAP test runtime trên staging.

Mỗi PR có **security checklist**: input validation, AuthZ, log, secret, test.

## 5. 🌍 Tuân thủ (Compliance) ngắn gọn

- **GDPR**: data minimization, quyền xoá, breach notify ≤ 72h.
- **PDPL VN 2023**: phải có cam kết bảo vệ dữ liệu cá nhân, DPO cho tổ chức xử lý lớn.
- **PCI DSS**: nếu lưu/xử lý thẻ — đa số dev nên outsource cho Stripe.
- **SOC 2**: chuẩn niềm tin với khách enterprise (security, availability, confidentiality…).

> 🛡️ **Mẹo của thầy Hải:** Tài liệu hoá quy trình ngay từ MVP — sau này muốn lấy SOC 2/ISO 27001 sẽ đỡ vất nhiều.`,
        theoryEn: `## 1. 📜 Log what, NOT what?

**Do log:**
- Auth events: login success/fail, password reset, MFA, role change.
- State-changing actions on sensitive records.
- 4xx/5xx errors with a request id.
- Anomalies: rate-limit hits, unknown IPs.

**NEVER log:**
- Passwords, OTPs, session tokens, JWTs, API keys, card numbers.
- PII beyond what's needed.

Each line should carry **request id, user id, IP, ts, action, result, latency**.

## 2. 🚨 SIEM & Alerting

Centralize logs (Datadog, Loki, Elastic, BigQuery + Looker). Alert on:

- ≥ 5 failed logins / 10 min / IP.
- \`/admin\` access outside business hours.
- 5xx error rate > 1% over 5 min.
- A token used from two countries within 1 hour.

> 💡 Alert fatigue = ignored alerts. Tune thresholds.

## 3. 🔥 Incident Response — NIST 6 steps

1. **Preparation** — runbook, contact list, break-glass access.
2. **Identification** — is it really an incident? Severity 1–4?
3. **Containment** — revoke tokens, close ports, disable accounts.
4. **Eradication** — remove malware, patch, rotate secrets.
5. **Recovery** — restore from clean backup, watch for recurrence.
6. **Lessons Learned** — **blameless** post-mortem within 5 days.

## 4. 🧪 DevSecOps in CI/CD

- **SAST**: Semgrep / CodeQL on each PR.
- **Dependency scan**: \`npm audit\`, \`pip-audit\`, Dependabot.
- **Secret scanning**: gitleaks/truffleHog block keys at commit.
- **Container scan**: Trivy/Grype.
- **DAST**: OWASP ZAP against staging.

Add a security checklist to PR templates: input validation, AuthZ, logging, secrets, tests.

## 5. 🌍 Compliance in a nutshell

- **GDPR**: data minimization, right to erasure, 72h breach notice.
- **Vietnam PDPL 2023**: data-protection commitment, DPO for large processors.
- **PCI DSS**: if you store/process cards — most devs should offload to Stripe.
- **SOC 2**: enterprise trust standard (security, availability, confidentiality…).

> 🛡️ **Tip from Mr. Hai:** Document the process from MVP — pursuing SOC 2 / ISO 27001 later becomes painless.`,
        code: `// Pattern logging an toàn — TypeScript
type LogLevel = "info" | "warn" | "error";

const REDACT = new Set([
  "password", "pwd", "token", "access_token", "refresh_token",
  "authorization", "apiKey", "api_key", "secret", "otp", "card_number",
]);

function redact<T>(input: T): T {
  if (input == null || typeof input !== "object") return input;
  const out: any = Array.isArray(input) ? [] : {};
  for (const [k, v] of Object.entries(input)) {
    if (REDACT.has(k.toLowerCase())) out[k] = "[REDACTED]";
    else if (typeof v === "object") out[k] = redact(v);
    else out[k] = v;
  }
  return out;
}

export function audit(level: LogLevel, action: string, ctx: Record<string, unknown>) {
  const line = {
    ts: new Date().toISOString(),
    level,
    action,
    request_id: ctx.request_id ?? crypto.randomUUID(),
    user_id: ctx.user_id ?? null,
    ip: ctx.ip ?? null,
    result: ctx.result ?? "ok",
    latency_ms: ctx.latency_ms ?? null,
    meta: redact(ctx.meta ?? {}),
  };
  // Gửi tới SIEM (Datadog/Loki/BigQuery). KHÔNG console.log secret.
  console.log(JSON.stringify(line));
}

// Ví dụ dùng
audit("info", "login.success", { user_id: "u_1", ip: "1.2.3.4", latency_ms: 87 });
audit("warn", "login.fail",   { ip: "1.2.3.4", meta: { reason: "wrong_password" } });
audit("error", "admin.access_denied", { user_id: "u_2", ip: "1.2.3.4", meta: { route: "/admin" } });`,
        codeLanguage: "typescript",
        exercise: "Thiết lập 1 alert thật (Datadog/Logflare/Supabase): cảnh báo khi có ≥ 5 lần \`login.fail\` từ cùng IP trong 10 phút. Viết runbook 1 trang gồm: ai trực, cách revoke token, lệnh chặn IP ở WAF, mẫu email thông báo breach 72h theo GDPR.",
        exerciseEn: "Set up a real alert (Datadog/Logflare/Supabase): ≥ 5 \`login.fail\` from one IP in 10 min. Write a one-page runbook: who's on call, how to revoke tokens, the WAF block command, and a GDPR 72h breach-notice email template.",
        quiz: [
          { question: "Trường nào TUYỆT ĐỐI không được log?", questionEn: "Which field must NEVER be logged?", options: ["request_id", "user_id ẩn danh", "password / token / OTP", "ip"], optionsEn: ["request_id", "anonymous user_id", "password / token / OTP", "ip"], answer: 2, explanation: "Bí mật xác thực không bao giờ log; nếu log file bị lộ là thảm hoạ.", explanationEn: "Never log auth secrets — if the log leaks it's catastrophic." },
          { question: "Bước nào đứng đầu trong quy trình Incident Response của NIST?", questionEn: "Which step comes first in the NIST Incident Response process?", options: ["Recovery", "Preparation", "Containment", "Lessons Learned"], optionsEn: ["Recovery", "Preparation", "Containment", "Lessons Learned"], answer: 1, explanation: "Preparation: có runbook, contact list, quyền tạm — trước khi sự cố xảy ra.", explanationEn: "Preparation: runbooks, contact lists, standby permissions — all before an incident hits." },
          { question: "SAST khác DAST ở điểm nào?", questionEn: "How does SAST differ from DAST?", options: ["SAST chạy ở production, DAST trên code", "SAST phân tích code tĩnh, DAST tấn công ứng dụng đang chạy", "Không khác", "SAST chỉ chạy thủ công"], optionsEn: ["SAST runs in production, DAST on code", "SAST is static code analysis, DAST attacks the running app", "No difference", "SAST is only manual"], answer: 1, explanation: "SAST = static (Semgrep, CodeQL). DAST = dynamic (ZAP, Burp) — tấn công thực tế trên staging.", explanationEn: "SAST = static (Semgrep, CodeQL). DAST = dynamic (ZAP, Burp) — real attacks against staging." },
          { question: "GDPR yêu cầu thông báo vi phạm dữ liệu trong vòng?", questionEn: "GDPR requires breach notification within?", options: ["24h", "48h", "72h", "7 ngày"], optionsEn: ["24h", "48h", "72h", "7 days"], answer: 2, explanation: "Điều 33 GDPR: thông báo cho cơ quan giám sát trong 72 giờ kể từ khi phát hiện.", explanationEn: "GDPR Art. 33: notify the supervisory authority within 72 hours of discovery." },
          { question: "Post-mortem hiệu quả nên?", questionEn: "An effective post-mortem should?", options: ["Đổ lỗi cho người gây ra", "Blameless — tập trung quy trình & hệ thống, ra action item đo được", "Bỏ qua, làm tiếp", "Chỉ kỹ thuật, không cần ghi lại"], optionsEn: ["Blame the person responsible", "Be blameless — focus on process & system, ship measurable action items", "Skip it and move on", "Be technical only, no notes needed"], answer: 1, explanation: "Blameless post-mortem khuyến khích minh bạch — đội mới học được và sửa hệ thống thay vì sợ hãi.", explanationEn: "Blameless post-mortems encourage transparency — teams learn and fix the system instead of hiding." },
        ],
      },
      // ============ LESSON 7 ============
      {
        id: "cyber-7",
        title: "Secure Coding: Input Validation, SQLi & XSS chuyên sâu",
        titleEn: "Secure Coding: Input Validation, SQLi & XSS Deep Dive",
        level: 2,
        difficulty: "intermediate",
        theory: `## 1. 🚪 Mọi input đều là kẻ thù tiềm tàng

Quy tắc số 1: **Validate ở server**, kể cả khi đã validate ở client. Client validation chỉ giúp UX — kẻ tấn công bypass dễ dàng bằng \`curl\`.

- **Allowlist > Denylist**: liệt kê cái được phép, từ chối phần còn lại.
- **Strong typing**: dùng schema (Zod, Joi, Pydantic). Ép kiểu trước khi xử lý.
- **Canonicalize**: chuẩn hoá unicode (NFC), trim, lowercase email — tránh bypass kiểu \`admin\` vs \`Admin\`.

## 2. 💉 SQL Injection — vẫn đứng top OWASP sau 20 năm

Code sai kinh điển:

\`\`\`ts
// ❌ Nguy hiểm
db.query(\`SELECT * FROM users WHERE email='\${email}'\`);
\`\`\`

Kẻ tấn công gửi \`email = ' OR 1=1 --\` → đăng nhập với mọi tài khoản.

**Cách đúng**: luôn dùng **parameterized query** / **prepared statement**.

> 💡 ORM (Prisma, Drizzle, SQLAlchemy) mặc định an toàn — nhưng \`$queryRaw\` hay \`.raw()\` thì KHÔNG. Đừng nối chuỗi.

## 3. 🕷️ XSS (Cross-Site Scripting) — 3 dạng cần biết

- **Reflected XSS**: payload trong URL phản chiếu lại trang.
- **Stored XSS**: payload lưu trong DB, hiện cho mọi user (nguy hiểm nhất).
- **DOM-based XSS**: JS phía client ghi input vào \`innerHTML\` mà không sanitize.

**Phòng thủ**:
1. **Escape output** theo ngữ cảnh (HTML, attribute, JS, URL, CSS).
2. **Sanitize HTML** bằng DOMPurify khi buộc phải render rich text.
3. **Content Security Policy (CSP)**: chặn inline script, chỉ cho phép domain whitelist.
4. **Cookie HttpOnly + SameSite=Strict**: kể cả XSS cũng không đánh cắp được session.

## 4. 🧪 Các lỗ hổng injection khác

- **Command Injection**: \`exec(\`ping \${ip}\`)\` → \`ip = "8.8.8.8; rm -rf /"\`. Dùng \`spawn\` với mảng args.
- **NoSQL Injection**: \`{ email: req.body.email }\` với \`email = { $gt: "" }\` bypass auth Mongo.
- **SSRF**: server tự fetch URL do user gửi → truy cập \`http://169.254.169.254\` (metadata cloud). Allowlist domain & block IP nội bộ.
- **Path Traversal**: \`fs.readFile(userInput)\` với \`../../etc/passwd\`. Dùng \`path.resolve\` + kiểm tra prefix.

## 5. ⚙️ Checklist Secure Coding cho mỗi PR

- [ ] Mọi input có schema validation (Zod/Pydantic).
- [ ] Mọi truy vấn DB dùng parameter, không nối chuỗi.
- [ ] Mọi output HTML được escape hoặc sanitize.
- [ ] Có CSP, HttpOnly cookie, SameSite.
- [ ] Có rate limit ở endpoint nhạy cảm.
- [ ] Có unit test cho input độc hại (fuzz nhẹ).`,
        theoryEn: `## 1. 🚪 Treat every input as hostile

Rule #1: **validate on the server**, even if you already validate on the client. Client validation is for UX only — attackers bypass it with \`curl\`.

- **Allowlist > Denylist**: enumerate the allowed shapes, reject the rest.
- **Strong typing**: use schemas (Zod, Joi, Pydantic). Coerce before processing.
- **Canonicalize**: normalize unicode (NFC), trim, lowercase email — prevent \`admin\` vs \`Admin\` bypass.

## 2. 💉 SQL Injection — still OWASP top after 20 years

Classic bad code:

\`\`\`ts
// ❌ Dangerous
db.query(\`SELECT * FROM users WHERE email='\${email}'\`);
\`\`\`

Attacker sends \`email = ' OR 1=1 --\` → logs in as any user.

**Correct**: always use **parameterized queries** / **prepared statements**.

> 💡 ORMs (Prisma, Drizzle, SQLAlchemy) are safe by default — but \`$queryRaw\` / \`.raw()\` are NOT. Never concatenate.

## 3. 🕷️ XSS (Cross-Site Scripting) — 3 flavors

- **Reflected XSS**: payload in URL reflected back.
- **Stored XSS**: payload saved in DB, shown to every user (worst).
- **DOM-based XSS**: client JS writes input to \`innerHTML\` without sanitizing.

**Defenses**:
1. **Context-aware output escaping** (HTML, attribute, JS, URL, CSS).
2. **Sanitize HTML** with DOMPurify when rich text is required.
3. **Content Security Policy (CSP)**: block inline script, whitelist domains.
4. **HttpOnly + SameSite=Strict cookies**: even XSS cannot steal the session.

## 4. 🧪 Other injection families

- **Command Injection**: \`exec(\`ping \${ip}\`)\` with \`ip = "8.8.8.8; rm -rf /"\`. Use \`spawn\` + array args.
- **NoSQL Injection**: \`{ email: req.body.email }\` with \`email = { $gt: "" }\` bypasses Mongo auth.
- **SSRF**: server fetches user-supplied URL → hits \`http://169.254.169.254\` (cloud metadata). Allowlist domains + block internal IPs.
- **Path Traversal**: \`fs.readFile(userInput)\` with \`../../etc/passwd\`. Use \`path.resolve\` + verify prefix.

## 5. ⚙️ Secure-coding checklist for every PR

- [ ] Every input has schema validation (Zod/Pydantic).
- [ ] Every DB query is parameterized, no concatenation.
- [ ] Every HTML output is escaped or sanitized.
- [ ] CSP, HttpOnly cookies, SameSite are set.
- [ ] Rate limits on sensitive endpoints.
- [ ] Unit tests with hostile input (light fuzzing).`,
        code: `// Secure Express endpoint: Zod + parameterized query + DOMPurify
import { z } from "zod";
import DOMPurify from "isomorphic-dompurify";
import { db } from "./db";

const CommentSchema = z.object({
  postId: z.string().uuid(),
  body: z.string().min(1).max(2000),
});

app.post("/comments", async (req, res) => {
  // 1) Validate
  const parsed = CommentSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "invalid_input" });

  // 2) Sanitize rich text (only allow safe tags)
  const safeHtml = DOMPurify.sanitize(parsed.data.body, {
    ALLOWED_TAGS: ["b", "i", "em", "strong", "a", "p", "br"],
    ALLOWED_ATTR: ["href"],
  });

  // 3) Parameterized query — no string concat
  const row = await db.query(
    "INSERT INTO comments (post_id, user_id, body) VALUES ($1, $2, $3) RETURNING id",
    [parsed.data.postId, req.user.id, safeHtml],
  );

  res.json({ id: row.rows[0].id });
});`,
        codeLanguage: "typescript",
        exercise: "Lấy 1 form bất kỳ trong dự án của bạn (login, comment, search…). Viết schema Zod cho input, chuyển truy vấn DB sang dạng parameterized, thêm DOMPurify cho mọi nội dung render dạng HTML. Sau đó thử tấn công bằng payload: `' OR 1=1 --`, `<img src=x onerror=alert(1)>`, `../../etc/passwd`. Đảm bảo tất cả đều bị chặn và có log cảnh báo.",
        exerciseEn: "Pick any form in your project (login, comment, search…). Add a Zod schema, switch DB calls to parameterized queries, add DOMPurify for any HTML-rendered field. Then attack with: `' OR 1=1 --`, `<img src=x onerror=alert(1)>`, `../../etc/passwd`. All must be blocked and logged.",
        quiz: [
          { question: "Cách an toàn nhất để tránh SQL Injection là?", questionEn: "Safest way to prevent SQL Injection?", options: ["Escape dấu nháy bằng tay", "Dùng parameterized / prepared statements", "Chặn từ khoá SELECT", "Dùng regex lọc input"], optionsEn: ["Manually escape quotes", "Use parameterized / prepared statements", "Block the SELECT keyword", "Filter input with regex"], answer: 1, explanation: "Parameterized query tách dữ liệu khỏi câu lệnh — driver tự xử lý escape an toàn.", explanationEn: "Parameterized queries separate data from code — the driver escapes safely." },
          { question: "Stored XSS khác Reflected XSS ở điểm nào?", questionEn: "How does Stored XSS differ from Reflected XSS?", options: ["Không khác", "Stored lưu payload trong DB và hại nhiều user; Reflected qua URL từng lần", "Reflected nguy hiểm hơn Stored", "Stored chỉ hại admin"], optionsEn: ["No difference", "Stored persists the payload in DB and harms many users; Reflected is per-URL", "Reflected is more dangerous than Stored", "Stored only harms admins"], answer: 1, explanation: "Stored XSS phát tán cho mọi người xem nội dung — tác hại lớn hơn nhiều.", explanationEn: "Stored XSS reaches every viewer of the content — far broader impact." },
          { question: "Cookie nào giúp giảm thiệt hại khi bị XSS?", questionEn: "Which cookie flag reduces XSS damage?", options: ["Secure", "HttpOnly", "Path=/", "Max-Age cao"], optionsEn: ["Secure", "HttpOnly", "Path=/", "Long Max-Age"], answer: 1, explanation: "HttpOnly khiến JavaScript không đọc được cookie, nên XSS không lấy được session token.", explanationEn: "HttpOnly hides the cookie from JavaScript, so XSS cannot steal the session token." },
          { question: "SSRF là gì?", questionEn: "What is SSRF?", options: ["Server tự gửi request tới URL do attacker chỉ định", "Tấn công vào CSS", "Lỗi DNS", "Một loại malware"], optionsEn: ["The server fetches a URL chosen by the attacker", "An attack on CSS", "A DNS bug", "A kind of malware"], answer: 0, explanation: "SSRF (Server-Side Request Forgery) lợi dụng server fetch URL → truy cập tài nguyên nội bộ như metadata cloud.", explanationEn: "SSRF abuses server-side fetch to reach internal resources like cloud metadata." },
          { question: "Validation nên đặt ở đâu?", questionEn: "Where should validation live?", options: ["Chỉ ở client", "Chỉ ở server", "Cả client (UX) và server (bảo mật)", "Không cần nếu đã có WAF"], optionsEn: ["Client only", "Server only", "Both client (UX) and server (security)", "Not needed if a WAF exists"], answer: 2, explanation: "Client để UX nhanh; server là biên giới bảo mật thật — kẻ tấn công luôn bypass client.", explanationEn: "Client gives fast UX; the server is the real security boundary — attackers bypass clients." },
        ],
      },
      // ============ LESSON 8 ============
      {
        id: "cyber-8",
        title: "Bảo mật mạng & Web: TLS/HTTPS, CORS, CSRF, Cookie",
        titleEn: "Network & Web Security: TLS/HTTPS, CORS, CSRF, Cookies",
        level: 2,
        difficulty: "intermediate",
        theory: `## 1. 🔒 HTTPS / TLS — đường ống mã hoá

TLS giúp 3 điều: **mã hoá** (chống nghe trộm), **toàn vẹn** (chống sửa), **xác thực server** (chống giả mạo). Bắt buộc cho mọi sản phẩm production.

- Dùng **TLS 1.3** (hoặc tối thiểu 1.2), tắt TLS 1.0/1.1, SSLv3.
- **HSTS** (\`Strict-Transport-Security\`) ép trình duyệt luôn dùng HTTPS, kể cả khi user gõ \`http://\`.
- Chứng chỉ miễn phí qua **Let's Encrypt** + auto-renew. Đừng dùng cert self-signed ở production.

## 2. 🌐 CORS — đừng đặt \`*\` bừa bãi

CORS quyết định domain nào được phép gọi API của bạn từ browser. Hai nhầm lẫn phổ biến:

- ❌ \`Access-Control-Allow-Origin: *\` đi kèm \`Allow-Credentials: true\` → browser sẽ từ chối, nhưng nếu \`*\` thì cũng cho mọi site đọc public API của bạn.
- ✅ Allowlist tường minh: \`https://app.haiedutech.com\`, \`https://www.haiedutech.com\`.

> 💡 CORS **không bảo vệ** server — nó chỉ chặn browser. Tấn công bằng curl không quan tâm CORS. Bảo mật thật nằm ở AuthN/AuthZ.

## 3. 🛡️ CSRF — kẻ tấn công "mượn tay" trình duyệt

Nếu user đăng nhập \`bank.com\` rồi mở tab \`evil.com\`, trang xấu có thể submit form ngầm tới \`bank.com/transfer\` — browser tự gửi cookie. Phòng thủ:

1. **SameSite=Lax** (mặc định mới của browser) hoặc \`Strict\` cho cookie nhạy cảm.
2. **CSRF token**: server cấp token ngẫu nhiên trong form/header, verify mỗi request mutate.
3. **Double-submit cookie**: token vừa ở cookie vừa ở header, server so khớp.
4. API JWT (Authorization header) **không bị CSRF** vì browser không tự gắn header này.

## 4. 🍪 Cookie an toàn — 4 cờ bắt buộc

\`\`\`http
Set-Cookie: session=abc123;
  Secure;          # chỉ gửi qua HTTPS
  HttpOnly;        # JS không đọc được
  SameSite=Strict; # không gửi cross-site
  Path=/;
  Max-Age=3600;
\`\`\`

## 5. 🧱 Security Headers nên có

| Header | Tác dụng |
|--------|----------|
| \`Strict-Transport-Security\` | Ép HTTPS |
| \`Content-Security-Policy\` | Chống XSS, clickjacking inline |
| \`X-Frame-Options: DENY\` | Chống clickjacking |
| \`X-Content-Type-Options: nosniff\` | Chống MIME sniffing |
| \`Referrer-Policy: strict-origin-when-cross-origin\` | Giảm rò rỉ URL |
| \`Permissions-Policy\` | Tắt camera/mic/geolocation mặc định |

Kiểm tra điểm headers tại **securityheaders.com** — mục tiêu A trở lên.`,
        theoryEn: `## 1. 🔒 HTTPS / TLS — the encrypted pipe

TLS gives you three things: **encryption** (no eavesdropping), **integrity** (no tampering), **server authentication** (no impersonation). Mandatory in production.

- Use **TLS 1.3** (or at least 1.2); disable TLS 1.0/1.1, SSLv3.
- **HSTS** (\`Strict-Transport-Security\`) forces the browser to always use HTTPS, even when the user types \`http://\`.
- Free certificates from **Let's Encrypt** with auto-renew. Never use self-signed certs in production.

## 2. 🌐 CORS — don't blindly set \`*\`

CORS decides which origins may call your API from the browser. Common mistakes:

- ❌ \`Access-Control-Allow-Origin: *\` together with \`Allow-Credentials: true\` → browsers refuse; and \`*\` exposes any public response to every site.
- ✅ Explicit allowlist: \`https://app.haiedutech.com\`, \`https://www.haiedutech.com\`.

> 💡 CORS **does not protect** the server — it only restricts browsers. A curl attack ignores CORS. Real security lives in AuthN/AuthZ.

## 3. 🛡️ CSRF — the attacker "borrows" the browser

If a user is logged into \`bank.com\` and opens \`evil.com\`, the malicious page can silently submit a form to \`bank.com/transfer\` — the browser auto-sends cookies. Defenses:

1. **SameSite=Lax** (browser default) or \`Strict\` for sensitive cookies.
2. **CSRF token**: server issues a random token, verifies it on every mutating request.
3. **Double-submit cookie**: token in cookie AND header, server compares.
4. JWT APIs (Authorization header) are **not vulnerable to CSRF** because browsers don't auto-attach this header.

## 4. 🍪 Safe cookies — 4 mandatory flags

\`\`\`http
Set-Cookie: session=abc123;
  Secure;          # HTTPS only
  HttpOnly;        # not readable from JS
  SameSite=Strict; # never sent cross-site
  Path=/;
  Max-Age=3600;
\`\`\`

## 5. 🧱 Security headers you should ship

| Header | Purpose |
|--------|---------|
| \`Strict-Transport-Security\` | Force HTTPS |
| \`Content-Security-Policy\` | Mitigate XSS / inline clickjacking |
| \`X-Frame-Options: DENY\` | Anti clickjacking |
| \`X-Content-Type-Options: nosniff\` | Anti MIME sniffing |
| \`Referrer-Policy: strict-origin-when-cross-origin\` | Reduce URL leakage |
| \`Permissions-Policy\` | Disable camera/mic/geolocation by default |

Grade your headers at **securityheaders.com** — aim for A or higher.`,
        code: `// Express middleware: hardened security headers + safe CORS
import express from "express";
import helmet from "helmet";
import cors from "cors";

const app = express();

// 1) Helmet — sane defaults for security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://cdn.haiedutech.com"],
      imgSrc: ["'self'", "data:", "https://images.haiedutech.com"],
      connectSrc: ["'self'", "https://api.haiedutech.com"],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  hsts: { maxAge: 63072000, includeSubDomains: true, preload: true },
}));

// 2) Strict CORS allowlist
const ALLOWED = new Set([
  "https://app.haiedutech.com",
  "https://www.haiedutech.com",
]);
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);          // same-origin / curl
    if (ALLOWED.has(origin)) return cb(null, true);
    return cb(new Error("CORS blocked: " + origin));
  },
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  maxAge: 600,
}));

// 3) Safe cookie defaults
app.use((req, res, next) => {
  res.cookie = ((orig) => (name, val, opts = {}) =>
    orig.call(res, name, val, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      ...opts,
    }))(res.cookie);
  next();
});`,
        codeLanguage: "typescript",
        exercise: "Chạy `curl -I https://your-domain.com` và soi các header trả về. Bổ sung HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy. Kiểm tra điểm tại securityheaders.com — mục tiêu A. Sau đó dựng 1 trang HTML giả lập CSRF (form auto submit POST sang API của bạn) và xác nhận request bị chặn nhờ SameSite + CSRF token.",
        exerciseEn: "Run `curl -I https://your-domain.com` and inspect the headers. Add HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy. Grade at securityheaders.com — target A. Then build a CSRF demo page (auto-submitting form against your API) and confirm the request is blocked by SameSite + CSRF token.",
        quiz: [
          { question: "Tác dụng chính của HSTS là?", questionEn: "Main purpose of HSTS?", options: ["Mã hoá dữ liệu", "Ép trình duyệt luôn dùng HTTPS", "Chặn XSS", "Tăng tốc TLS handshake"], optionsEn: ["Encrypt data", "Force the browser to always use HTTPS", "Block XSS", "Speed up the TLS handshake"], answer: 1, explanation: "HSTS yêu cầu trình duyệt nâng cấp tự động sang HTTPS và từ chối downgrade.", explanationEn: "HSTS tells browsers to upgrade to HTTPS automatically and reject downgrades." },
          { question: "Cookie có cờ nào không bị JS đọc?", questionEn: "Which cookie flag makes the cookie unreadable from JS?", options: ["Secure", "HttpOnly", "SameSite", "Path"], optionsEn: ["Secure", "HttpOnly", "SameSite", "Path"], answer: 1, explanation: "HttpOnly khiến cookie chỉ được gửi kèm HTTP request, JS không lấy được.", explanationEn: "HttpOnly cookies are sent only on HTTP requests; JS cannot access them." },
          { question: "Tấn công CSRF lợi dụng?", questionEn: "CSRF attacks abuse?", options: ["Lỗi SQL", "Việc browser tự gắn cookie khi gửi cross-site request", "Lỗi bộ nhớ", "Mật khẩu yếu"], optionsEn: ["A SQL bug", "The browser auto-attaching cookies on cross-site requests", "Memory bugs", "Weak passwords"], answer: 1, explanation: "Browser tự đính cookie session → site độc có thể giả mạo hành vi mutate.", explanationEn: "Browsers auto-attach session cookies, so malicious sites can forge mutating actions." },
          { question: "Cấu hình CORS nào AN TOÀN cho API có cookie?", questionEn: "Which CORS config is SAFE for a cookie-bearing API?", options: ["`Access-Control-Allow-Origin: *` + `Allow-Credentials: true`", "Allowlist origin cụ thể + `Allow-Credentials: true`", "Không trả header CORS", "Chỉ cấu hình ở client"], optionsEn: ["`Access-Control-Allow-Origin: *` + `Allow-Credentials: true`", "Explicit origin allowlist + `Allow-Credentials: true`", "No CORS headers", "Client-side only"], answer: 1, explanation: "Browser chặn `*` khi có credentials; cần liệt kê origin cụ thể.", explanationEn: "Browsers reject `*` with credentials — list explicit origins." },
          { question: "CSRF token KHÔNG cần thiết khi?", questionEn: "CSRF tokens are NOT needed when?", options: ["API dùng cookie session", "API xác thực qua header `Authorization: Bearer ...`", "Có CORS `*`", "Form gọi POST"], optionsEn: ["The API uses session cookies", "The API authenticates via `Authorization: Bearer ...`", "CORS is `*`", "The form does a POST"], answer: 1, explanation: "Browser không tự gắn header Authorization → không bị CSRF (vẫn cần XSS defense).", explanationEn: "Browsers don't auto-attach Authorization headers → no CSRF (XSS defenses still needed)." },
        ],
      },
      // ============ LESSON 9 ============
      {
        id: "cyber-9",
        title: "Supply Chain Security & DevSecOps trong CI/CD",
        titleEn: "Supply Chain Security & DevSecOps in CI/CD",
        level: 3,
        difficulty: "advanced",
        theory: `## 1. 📦 "Bạn không viết phần lớn code của mình"

Một app web hiện đại kéo về hàng nghìn package npm. Nếu **1** package bị chiếm (event-stream, ua-parser-js, xz-utils 2024…), kẻ tấn công vào thẳng production. Đây là **supply chain attack**.

## 2. 🔐 Quản trị phụ thuộc

- **Lockfile bắt buộc**: \`package-lock.json\`, \`bun.lockb\`, \`poetry.lock\`. Commit vào git.
- **Pin version**: dùng version cụ thể, không dùng \`^\`/\`~\` cho infra-critical lib.
- **Audit định kỳ**: \`npm audit\`, \`bun audit\`, \`pip-audit\`, GitHub **Dependabot**.
- **SBOM** (Software Bill of Materials): xuất bằng \`syft\`/\`cyclonedx\` — biết rõ mình ship cái gì.
- **Sigstore / cosign**: ký artifact và verify chữ ký trước khi deploy.

## 3. 🤖 DevSecOps — "Shift Left" bảo mật vào CI/CD

Đừng đợi pentest cuối kỳ. Cài security gate ở mỗi PR:

\`\`\`text
Commit → Pre-commit hook (lint, secret scan)
       → CI: SAST (Semgrep, CodeQL) + Dep audit + SBOM
       → Build: sign image (cosign), scan image (Trivy)
       → Deploy staging: DAST (ZAP) + smoke test
       → Production: runtime monitor (Falco, GuardDuty)
\`\`\`

## 4. 🔑 Secret management

- **Không bao giờ commit secret**. Dùng \`.env\` + \`.gitignore\`, hoặc tốt hơn: secret manager (Doppler, AWS Secrets Manager, Lovable secrets).
- **gitleaks / trufflehog** chạy ở pre-commit + CI để chặn rò rỉ.
- Nếu lỡ commit: **rotate ngay**, không chỉ xoá commit — secret đã vào history công khai.

## 5. 🐳 Bảo mật container & image

- Dùng **base image nhỏ** (\`distroless\`, \`alpine\`).
- Chạy bằng **non-root user**: \`USER 1001\`.
- Multi-stage build để loại trừ dev dependency.
- Scan với **Trivy** / **Grype** trước khi push.
- Đặt **read-only root filesystem** trong Kubernetes \`securityContext\`.

> 💡 Nguyên tắc: artifact ở production phải có **provenance** rõ ràng (ai build, từ commit nào, qua pipeline nào). SLSA Level ≥ 2.`,
        theoryEn: `## 1. 📦 "You don't write most of your code"

A modern web app pulls thousands of npm packages. If **one** is compromised (event-stream, ua-parser-js, xz-utils 2024…), attackers walk straight into production. This is a **supply-chain attack**.

## 2. 🔐 Dependency governance

- **Lockfile required**: \`package-lock.json\`, \`bun.lockb\`, \`poetry.lock\`. Commit it.
- **Pin versions**: explicit versions, no \`^\`/\`~\` for infra-critical libs.
- **Routine audits**: \`npm audit\`, \`bun audit\`, \`pip-audit\`, GitHub **Dependabot**.
- **SBOM** (Software Bill of Materials): emit with \`syft\`/\`cyclonedx\` — know what you ship.
- **Sigstore / cosign**: sign artifacts and verify signatures before deploy.

## 3. 🤖 DevSecOps — shift security left in CI/CD

Don't wait for the end-of-quarter pentest. Add security gates to every PR:

\`\`\`text
Commit → Pre-commit hook (lint, secret scan)
       → CI: SAST (Semgrep, CodeQL) + dep audit + SBOM
       → Build: sign image (cosign), scan image (Trivy)
       → Deploy staging: DAST (ZAP) + smoke test
       → Production: runtime monitor (Falco, GuardDuty)
\`\`\`

## 4. 🔑 Secret management

- **Never commit secrets**. Use \`.env\` + \`.gitignore\`, or better, a secret manager (Doppler, AWS Secrets Manager, Lovable secrets).
- Run **gitleaks / trufflehog** in pre-commit + CI to block leaks.
- If you accidentally commit one: **rotate immediately** — deleting the commit is not enough, the secret is in public history.

## 5. 🐳 Container & image security

- Use a **small base image** (\`distroless\`, \`alpine\`).
- Run as a **non-root user**: \`USER 1001\`.
- Multi-stage build to drop dev dependencies.
- Scan with **Trivy** / **Grype** before pushing.
- Set **read-only root filesystem** in Kubernetes \`securityContext\`.

> 💡 Rule: every production artifact must have clear **provenance** (who built it, from which commit, through which pipeline). Aim for SLSA Level ≥ 2.`,
        code: `# .github/workflows/security.yml — security gate on every PR
name: security
on: [pull_request]

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      # 1) Secret scan
      - name: gitleaks
        uses: gitleaks/gitleaks-action@v2

      # 2) Dependency audit
      - name: npm audit
        run: npm audit --audit-level=high

      # 3) SAST
      - name: Semgrep
        uses: returntocorp/semgrep-action@v1
        with:
          config: p/owasp-top-ten

      # 4) SBOM + container scan
      - name: Build image
        run: docker build -t app:\${{ github.sha }} .
      - name: Trivy scan
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: app:\${{ github.sha }}
          severity: CRITICAL,HIGH
          exit-code: 1
      - name: SBOM (syft)
        uses: anchore/sbom-action@v0
        with:
          image: app:\${{ github.sha }}
          format: cyclonedx-json

      # 5) Sign artifact
      - name: cosign sign
        env:
          COSIGN_EXPERIMENTAL: "true"
        run: cosign sign --yes app:\${{ github.sha }}`,
        codeLanguage: "yaml",
        exercise: "Cài Semgrep + gitleaks + Trivy vào CI của 1 repo bạn đang làm. Chạy thử và sửa MỌI finding CRITICAL/HIGH. Tạo file SBOM (`syft .` hoặc `cyclonedx`) và commit. Viết 1 đoạn ngắn (≤200 từ) mô tả: pipeline gồm những bước nào, mỗi bước chặn lớp tấn công gì, ai trực khi gate fail.",
        exerciseEn: "Add Semgrep + gitleaks + Trivy to the CI of one of your repos. Run it and fix ALL CRITICAL/HIGH findings. Emit an SBOM (`syft .` or `cyclonedx`) and commit it. Write a short note (≤200 words) describing: pipeline stages, attack class each one blocks, who handles a failed gate.",
        quiz: [
          { question: "Supply chain attack nghĩa là?", options: ["Tấn công vào kho hàng vật lý", "Tấn công thông qua 1 dependency / công cụ bên thứ ba mà nạn nhân tin tưởng", "Phishing email", "DDoS"], answer: 1, explanation: "Kẻ tấn công chiếm 1 lib/build tool → mọi nơi dùng nó đều bị ảnh hưởng (xz-utils 2024)." },
          { question: "Khi lỡ commit API key lên GitHub public, bước ĐẦU TIÊN là?", options: ["Force push xoá commit", "Rotate (vô hiệu) key ngay lập tức", "Đổi repo sang private", "Mở issue"], answer: 1, explanation: "Bot scan GitHub trong vài giây. Phải coi key đã lộ — rotate trước, dọn history sau." },
          { question: "SBOM dùng để làm gì?", options: ["Build app nhanh hơn", "Liệt kê toàn bộ thành phần & version mà artifact bao gồm để truy vết CVE", "Mã hoá code", "Sign request"], answer: 1, explanation: "Khi CVE mới ra, SBOM cho biết bạn có dùng version bị ảnh hưởng hay không." },
          { question: "Container production nên chạy với?", options: ["root để tiện debug", "Non-root user, read-only filesystem", "Privileged mode", "Network host"], answer: 1, explanation: "Least privilege: non-root + read-only FS giảm thiệt hại nếu container bị chiếm." },
          { question: "Mục tiêu của 'shift left' trong DevSecOps là?", options: ["Đẩy bảo mật sang đội QA", "Đưa kiểm tra bảo mật vào sớm trong pipeline (commit, PR) thay vì cuối kỳ", "Bỏ qua test cuối", "Chỉ chạy security ở production"], answer: 1, explanation: "Phát hiện lỗi sớm rẻ hơn gấp 100 lần so với fix ở production." },
        ],
      },
      // ============ LESSON 10 ============
      {
        id: "cyber-10",
        title: "Privacy, Compliance & Ethical Hacking thực hành",
        titleEn: "Privacy, Compliance & Hands-on Ethical Hacking",
        level: 3,
        difficulty: "advanced",
        theory: `## 1. ⚖️ Vì sao dev phải hiểu Privacy & Compliance?

Bảo mật bảo vệ **hệ thống**; privacy bảo vệ **con người**. Vi phạm GDPR có thể bị phạt tới **4% doanh thu toàn cầu**. Hiểu luật giúp bạn thiết kế đúng từ đầu thay vì refactor đắt đỏ về sau.

## 2. 📜 Các khung pháp lý chính

| Khung | Phạm vi | Điểm chính cho dev |
|------|---------|---------------------|
| **GDPR** (EU) | Dữ liệu cá nhân của người EU | Đồng ý rõ ràng, quyền truy cập/xoá, breach notice 72h |
| **CCPA/CPRA** (California) | Người tiêu dùng CA | Quyền opt-out bán dữ liệu |
| **HIPAA** (US) | Dữ liệu y tế | Mã hoá at-rest/in-transit, audit log |
| **PCI-DSS** | Thẻ thanh toán | Không lưu CVV, mã hoá PAN, tokenization |
| **Nghị định 13/2023** (VN) | PII của người Việt | Đồng ý, lưu trữ trong nước cho dữ liệu nhạy cảm |

## 3. 🔬 Privacy by Design — 7 nguyên tắc

1. **Proactive, not reactive**: phòng từ đầu, không vá khi vỡ.
2. **Privacy by default**: cài đặt mặc định bảo mật nhất.
3. **Embedded into design**: privacy nằm trong kiến trúc, không phải feature gắn thêm.
4. **Full functionality**: không đánh đổi UX vì privacy (win-win).
5. **End-to-end security**: bảo vệ từ thu thập đến xoá.
6. **Visibility & transparency**: user biết dữ liệu được dùng làm gì.
7. **User-centric**: user có quyền điều khiển dữ liệu của mình.

## 4. 🧰 Kỹ thuật giảm rủi ro PII

- **Data minimization**: chỉ thu thập trường thực sự cần.
- **Pseudonymization**: thay PII bằng ID giả lập, lưu mapping ở vault riêng.
- **Anonymization** (k-anonymity, differential privacy) cho analytics.
- **Retention policy**: tự động xoá log/PII sau N ngày.
- **Right to erasure**: API \`DELETE /me\` xoá thật, không soft-delete.

## 5. 🥷 Ethical Hacking — quy trình 5 bước (PTES)

1. **Reconnaissance**: \`whois\`, \`nmap\`, Shodan — thu thập thông tin công khai.
2. **Scanning**: \`nmap -sV\`, \`nikto\`, \`nuclei\` — tìm dịch vụ & lỗi đã biết.
3. **Exploitation**: dùng Burp Suite/ZAP/Metasploit trên **môi trường được phép**.
4. **Post-exploitation**: đánh giá tác động (lateral movement, data exfil).
5. **Reporting**: viết báo cáo có severity (CVSS), PoC, hướng dẫn fix.

> ⚠️ **CHỈ pentest hệ thống bạn sở hữu hoặc có hợp đồng cho phép.** Tấn công không phép vi phạm Bộ luật Hình sự 2015 (VN), Computer Fraud and Abuse Act (US). Luyện tập trên **HackTheBox**, **TryHackMe**, **PortSwigger Web Security Academy**, **OverTheWire** — đều miễn phí & hợp pháp.

## 6. 🎓 Lộ trình học tiếp

- **Chứng chỉ**: CompTIA Security+ → CEH → OSCP → OSWE.
- **Cộng đồng**: OWASP chapter Vietnam, DEF CON groups, BSides.
- **Bug bounty**: HackerOne, Bugcrowd, Intigriti — kiếm tiền hợp pháp từ kỹ năng.`,
        theoryEn: `## 1. ⚖️ Why developers must understand Privacy & Compliance

Security protects **systems**; privacy protects **people**. GDPR fines reach **4% of global revenue**. Knowing the law lets you design correctly upfront instead of paying for expensive refactors.

## 2. 📜 Major regulatory frameworks

| Framework | Scope | Key for devs |
|-----------|-------|--------------|
| **GDPR** (EU) | EU residents' data | Explicit consent, access/erasure rights, 72h breach notice |
| **CCPA/CPRA** (California) | CA consumers | Right to opt-out of data sale |
| **HIPAA** (US) | Health data | Encryption at-rest/in-transit, audit logs |
| **PCI-DSS** | Payment cards | Never store CVV, encrypt PAN, tokenize |
| **Decree 13/2023** (Vietnam) | Vietnamese PII | Consent, domestic storage for sensitive data |

## 3. 🔬 Privacy by Design — 7 principles

1. **Proactive, not reactive**.
2. **Privacy by default**: most-private settings out-of-the-box.
3. **Embedded into design**: privacy is architecture, not a bolt-on.
4. **Full functionality**: never trade UX for privacy.
5. **End-to-end security**: from collection to deletion.
6. **Visibility & transparency**: users understand how data is used.
7. **User-centric**: users control their data.

## 4. 🧰 PII-risk reduction techniques

- **Data minimization**: only collect strictly needed fields.
- **Pseudonymization**: replace PII with surrogate IDs, keep the mapping in a separate vault.
- **Anonymization** (k-anonymity, differential privacy) for analytics.
- **Retention policy**: auto-purge logs/PII after N days.
- **Right to erasure**: \`DELETE /me\` truly deletes (no soft-delete).

## 5. 🥷 Ethical Hacking — 5-step PTES flow

1. **Reconnaissance**: \`whois\`, \`nmap\`, Shodan — gather public intel.
2. **Scanning**: \`nmap -sV\`, \`nikto\`, \`nuclei\` — find services + known CVEs.
3. **Exploitation**: Burp Suite / ZAP / Metasploit on **authorized** targets.
4. **Post-exploitation**: estimate impact (lateral movement, data exfil).
5. **Reporting**: severity (CVSS), proof-of-concept, remediation guide.

> ⚠️ **Only pentest systems you own or have written permission for.** Unauthorized hacking violates Vietnam's Penal Code 2015 and the US Computer Fraud and Abuse Act. Practice legally on **HackTheBox**, **TryHackMe**, **PortSwigger Web Security Academy**, **OverTheWire**.

## 6. 🎓 Where to go next

- **Certs**: CompTIA Security+ → CEH → OSCP → OSWE.
- **Community**: OWASP Vietnam chapter, DEF CON groups, BSides.
- **Bug bounty**: HackerOne, Bugcrowd, Intigriti — get paid legally.`,
        code: `// GDPR-friendly user data export & delete (Supabase / Postgres)
import { supabase } from "./client";

// 1) Right of Access — export everything we hold about the user
export async function exportMyData(userId: string) {
  const [profile, orders, sessions, audits] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", userId).single(),
    supabase.from("orders").select("*").eq("user_id", userId),
    supabase.from("sessions").select("id, created_at, ip_hash").eq("user_id", userId),
    supabase.from("audit_logs").select("ts, action").eq("user_id", userId),
  ]);

  return {
    exported_at: new Date().toISOString(),
    profile: profile.data,
    orders: orders.data,
    sessions: sessions.data,
    audit_logs: audits.data,
  };
}

// 2) Right to Erasure — hard delete, cascade, keep only legally required records
export async function deleteMyAccount(userId: string) {
  // Pseudonymize records we must keep (e.g., invoices required for tax law)
  await supabase
    .from("orders")
    .update({ customer_name: "REDACTED", email: null, phone: null })
    .eq("user_id", userId);

  // Hard delete the rest (RLS + FK ON DELETE CASCADE handle children)
  await supabase.from("profiles").delete().eq("id", userId);
  await supabase.auth.admin.deleteUser(userId);

  // Audit trail (no PII): we logged that erasure happened
  await supabase.from("erasure_log").insert({
    user_hash: await sha256(userId),
    erased_at: new Date().toISOString(),
  });
}

async function sha256(s: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}`,
        codeLanguage: "typescript",
        exercise: "Tạo trang `/account/privacy` cho phép user: (1) tải bản sao JSON dữ liệu của mình, (2) yêu cầu xoá tài khoản với xác nhận 2 bước. Viết Privacy Policy ngắn (≤300 từ) liệt kê: dữ liệu thu thập, mục đích, bên thứ ba, thời gian lưu, quyền của user. Sau đó luyện 1 phòng (room) trên TryHackMe hoặc PortSwigger Academy về SQLi/XSS — chụp lại quá trình và viết writeup ngắn.",
        exerciseEn: "Build `/account/privacy` letting users (1) download their JSON data export, (2) request account deletion with 2-step confirmation. Write a short Privacy Policy (≤300 words) listing: data collected, purpose, third parties, retention, user rights. Then complete one TryHackMe or PortSwigger Academy room on SQLi/XSS — record your process and write a short writeup.",
        quiz: [
          { question: "GDPR yêu cầu doanh nghiệp đáp ứng yêu cầu xoá dữ liệu (right to erasure) trong vòng?", options: ["7 ngày", "30 ngày (có thể gia hạn thêm 2 tháng nếu phức tạp)", "1 năm", "Không giới hạn"], answer: 1, explanation: "Điều 12 GDPR: 1 tháng, có thể gia hạn tối đa 2 tháng nếu yêu cầu phức tạp." },
          { question: "Dữ liệu nào TUYỆT ĐỐI KHÔNG được lưu sau khi xử lý thanh toán (PCI-DSS)?", options: ["Tên chủ thẻ", "Số PAN dạng mã hoá", "CVV/CVC", "Ngày hết hạn"], answer: 2, explanation: "CVV chỉ dùng 1 lần ngay khi giao dịch — lưu lại là vi phạm PCI-DSS." },
          { question: "Pseudonymization khác Anonymization ở điểm nào?", options: ["Không khác", "Pseudonymization có thể khôi phục lại danh tính nếu có khoá; Anonymization thì không", "Anonymization mạnh hơn mã hoá", "Pseudonymization là mã hoá đối xứng"], answer: 1, explanation: "Pseudonymization vẫn được coi là PII theo GDPR; Anonymization (đúng nghĩa) thì không còn là PII." },
          { question: "Hành vi nào được phép trong ethical hacking?", options: ["Quét port mọi website trên internet", "Pentest hệ thống bạn sở hữu hoặc có hợp đồng/scope cho phép", "Truy cập admin của công ty khác để báo lỗi", "Đọc DB của bạn cũ vì bạn từng có quyền"], answer: 1, explanation: "Không có hợp đồng / scope rõ ràng → coi như tấn công trái phép, vi phạm pháp luật." },
          { question: "Bước nào KHÔNG thuộc PTES (Penetration Testing Execution Standard)?", options: ["Reconnaissance", "Exploitation", "Reporting", "Marketing"], answer: 3, explanation: "PTES gồm: Pre-engagement, Recon, Threat Modeling, Vuln Analysis, Exploitation, Post-Exploitation, Reporting." },
        ],
      },
    ],
  },
];
