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
          { question: "Trong CIA Triad, chữ 'I' đại diện cho?", options: ["Identity", "Integrity", "Isolation", "Inheritance"], answer: 1, explanation: "Integrity — đảm bảo dữ liệu không bị sửa đổi trái phép." },
          { question: "Tấn công làm server không phục vụ được người dùng hợp lệ thuộc loại nào trong STRIDE?", options: ["Spoofing", "Tampering", "Denial of Service", "Repudiation"], answer: 2, explanation: "DoS phá hoại Availability — chữ A trong CIA." },
          { question: "Defense in Depth có ý nghĩa gì?", options: ["Chỉ cần 1 firewall mạnh là đủ", "Nhiều lớp phòng thủ, nếu 1 lớp thủng vẫn còn lớp khác", "Mã hoá mọi thứ", "Chỉ tin admin"], answer: 1, explanation: "Defense in Depth = layered defense; mỗi lớp độc lập nên 1 lớp thủng không sụp toàn hệ thống." },
          { question: "Nguyên tắc 'Least Privilege' nghĩa là?", options: ["Cho user quyền tối thiểu để làm việc", "Cho admin toàn quyền", "Bỏ hết quyền", "Cho phép guest đọc mọi thứ"], answer: 0, explanation: "Least Privilege: cấp đúng quyền cần thiết, không hơn — giới hạn thiệt hại nếu tài khoản bị chiếm." },
          { question: "Khi xử lý lỗi không xác định, hệ thống an toàn nên?", options: ["Allow by default", "Deny by default (Fail Securely)", "Bỏ qua lỗi", "Ghi ra console rồi tiếp tục"], answer: 1, explanation: "Fail Securely: lỗi → từ chối thao tác để tránh bypass kiểm soát." },
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
          { question: "Authentication trả lời câu hỏi nào?", options: ["Bạn được làm gì?", "Bạn là ai?", "Khi nào bạn đăng nhập?", "Bạn ở đâu?"], answer: 1, explanation: "AuthN = xác minh danh tính. AuthZ mới trả lời 'được làm gì'." },
          { question: "Hash nào KHÔNG nên dùng để lưu mật khẩu năm 2026?", options: ["bcrypt cost 12", "argon2id", "MD5", "scrypt"], answer: 2, explanation: "MD5 và SHA-1 nhanh, dễ brute-force bằng GPU. Dùng bcrypt/argon2id/scrypt." },
          { question: "Refresh token nên được lưu ở đâu trong web app?", options: ["localStorage", "URL query string", "HttpOnly + Secure cookie", "console.log để debug"], answer: 2, explanation: "HttpOnly + Secure + SameSite=Strict cookie giúp JavaScript không đọc được token → giảm rủi ro XSS." },
          { question: "OAuth 2.0 chủ yếu giải quyết bài toán gì?", options: ["Mã hoá đối xứng", "Uỷ quyền (delegated authorization)", "Tăng tốc DB", "Load balancing"], answer: 1, explanation: "OAuth cho phép cấp quyền truy cập tài nguyên mà không lộ mật khẩu." },
          { question: "Role của user nên được lưu ở đâu để chống privilege escalation?", options: ["Trong JWT payload do client gửi lên", "Trong cookie không bảo vệ", "Bảng riêng (vd user_roles) có RLS + SECURITY DEFINER", "Trong localStorage"], answer: 2, explanation: "Roles phải ở bảng riêng có RLS; check qua hàm SECURITY DEFINER để tránh đệ quy và privilege escalation." },
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
          { question: "Cách phòng SQL Injection đáng tin cậy nhất?", options: ["Escape ký tự ' bằng tay", "Parameterized queries / ORM", "Đặt DB ở mạng nội bộ", "Chỉ dùng SELECT, không UPDATE"], answer: 1, explanation: "Parameterized queries tách lệnh khỏi dữ liệu — DB không bao giờ thực thi input như SQL." },
          { question: "Trong React, render HTML do user nhập an toàn bằng cách nào?", options: ["dangerouslySetInnerHTML trực tiếp", "DOMPurify.sanitize trước khi dangerouslySetInnerHTML", "eval(userInput)", "Lưu vào DB rồi render"], answer: 1, explanation: "DOMPurify loại bỏ tag/attr/JS độc, sau đó mới gắn vào DOM." },
          { question: "SameSite cookie giúp chặn loại tấn công nào nhiều nhất?", options: ["SQL Injection", "XSS", "CSRF", "DDoS"], answer: 2, explanation: "SameSite ngăn browser gửi cookie kèm request cross-site → chặn CSRF cơ bản." },
          { question: "Lỗ hổng IDOR xảy ra khi?", options: ["Mật khẩu yếu", "Không kiểm tra quyền sở hữu tài nguyên theo user", "Thiếu HTTPS", "Cache quá lâu"], answer: 1, explanation: "IDOR = chỉ kiểm tra ID mà không kiểm tra user có sở hữu/được phép truy cập tài nguyên đó." },
          { question: "Khi IDOR thất bại, response nên trả?", options: ["403 chi tiết kèm message 'không phải của bạn'", "404 (giấu sự tồn tại tài nguyên)", "500", "200 với body rỗng"], answer: 1, explanation: "Trả 404 (hoặc 403 chung chung) để tránh leak thông tin có/không tồn tại tài nguyên." },
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
          { question: "Tại sao SHA-256 trần KHÔNG nên dùng để lưu mật khẩu?", options: ["Cho output quá dài", "Tính toán quá nhanh → dễ brute-force trên GPU", "Không có salt", "Đã bị bẻ khoá"], answer: 1, explanation: "Hash mật khẩu cần **chậm có chủ ý** (bcrypt/argon2id) để chống brute-force." },
          { question: "AES-256-GCM khác AES-256-CBC điểm cốt lõi nào?", options: ["GCM nhanh hơn nên không cần IV", "GCM là AEAD — vừa mã hoá vừa xác thực, chặn tampering", "CBC mạnh hơn", "Không khác gì"], answer: 1, explanation: "GCM tạo auth tag giúp phát hiện khi ciphertext bị sửa; CBC trần không có và dễ bị padding-oracle." },
          { question: "Cùng 1 khoá AES-GCM, IV (nonce) nên được dùng thế nào?", options: ["Hardcoded để dễ test", "Tăng dần", "Ngẫu nhiên/duy nhất cho mỗi message", "Lấy từ user input"], answer: 2, explanation: "Lặp IV trong GCM cùng key là thảm hoạ — kẻ tấn công có thể recover plaintext và forge tag." },
          { question: "Trong TLS, certificate giúp giải quyết vấn đề gì?", options: ["Xác thực server (chống MITM)", "Mã hoá nhanh hơn", "Giảm latency", "Không liên quan"], answer: 0, explanation: "Certificate được CA ký, client verify → biết đang nói chuyện với server thật chứ không phải kẻ MITM." },
          { question: "Quản lý khoá an toàn nên?", options: ["Commit .env có khoá vào private repo", "Lưu trong KMS/Vault, rotation định kỳ, audit log", "Gửi qua Slack cho team", "Hardcode trong source"], answer: 1, explanation: "KMS/Vault + rotation + audit là chuẩn. Repo private vẫn không an toàn (lộ qua dev laptop, fork…)." },
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
          { question: "Khi tạo bảng public mới trong Supabase/PostgREST, bước nào BẮT BUỘC sau CREATE TABLE?", options: ["Chỉ cần bật RLS", "GRANT cho role tương ứng (authenticated, service_role) rồi mới bật RLS + policy", "Drop bảng cũ", "Tạo index"], answer: 1, explanation: "Không có default grant — không GRANT thì API sẽ báo permission denied dù policy đúng." },
          { question: "Cấu hình \`Access-Control-Allow-Origin: *\` cùng \`credentials: true\` sẽ?", options: ["Hoạt động bình thường", "Bị browser từ chối — và là dấu hiệu cấu hình ẩu", "Tăng tốc CORS", "Tự động bật HTTPS"], answer: 1, explanation: "Spec không cho phép '*' với credentials; phải liệt kê origin cụ thể." },
          { question: "API key của OpenAI/Stripe nên được gọi từ đâu?", options: ["Frontend, gắn vào fetch()", "Server / edge function, đọc từ env / KMS", "URL query string", "Hardcode trong app mobile"], answer: 1, explanation: "Key ở backend giúp tránh leak qua DevTools, repo, mirror site." },
          { question: "Lợi ích lớn nhất của Content-Security-Policy?", options: ["Tăng tốc trang", "Chặn script không cho phép → giảm tác động XSS dù sanitize sót", "Giảm size CSS", "Bật HTTP/3"], answer: 1, explanation: "CSP whitelist nguồn script/style — XSS không có nguồn cho phép sẽ bị browser chặn." },
          { question: "Rate limit /login khác /search ở chỗ?", options: ["Không khác", "/login cần chặt hơn để chống brute-force credential", "/search cần chặt hơn vì tốn DB", "Cả hai phải bằng 1000 req/giây"], answer: 1, explanation: "Endpoint nhạy cảm (login, password reset, OTP) cần limit thấp + lockout sau N lần fail." },
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
          { question: "Trường nào TUYỆT ĐỐI không được log?", options: ["request_id", "user_id ẩn danh", "password / token / OTP", "ip"], answer: 2, explanation: "Bí mật xác thực không bao giờ log; nếu log file bị lộ là thảm hoạ." },
          { question: "Bước nào đứng đầu trong quy trình Incident Response của NIST?", options: ["Recovery", "Preparation", "Containment", "Lessons Learned"], answer: 1, explanation: "Preparation: có runbook, contact list, quyền tạm — trước khi sự cố xảy ra." },
          { question: "SAST khác DAST ở điểm nào?", options: ["SAST chạy ở production, DAST trên code", "SAST phân tích code tĩnh, DAST tấn công ứng dụng đang chạy", "Không khác", "SAST chỉ chạy thủ công"], answer: 1, explanation: "SAST = static (Semgrep, CodeQL). DAST = dynamic (ZAP, Burp) — tấn công thực tế trên staging." },
          { question: "GDPR yêu cầu thông báo vi phạm dữ liệu trong vòng?", options: ["24h", "48h", "72h", "7 ngày"], answer: 2, explanation: "Điều 33 GDPR: thông báo cho cơ quan giám sát trong 72 giờ kể từ khi phát hiện." },
          { question: "Post-mortem hiệu quả nên?", options: ["Đổ lỗi cho người gây ra", "Blameless — tập trung quy trình & hệ thống, ra action item đo được", "Bỏ qua, làm tiếp", "Chỉ kỹ thuật, không cần ghi lại"], answer: 1, explanation: "Blameless post-mortem khuyến khích minh bạch — đội mới học được và sửa hệ thống thay vì sợ hãi." },
        ],
      },
    ],
  },
];
