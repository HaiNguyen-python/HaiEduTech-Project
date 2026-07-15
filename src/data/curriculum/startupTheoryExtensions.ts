/**
 * Deep-dive extensions for the Startup Tech track (su-1-1 → su-6-5).
 * Appended to each lesson's theory in ProgrammingLesson.tsx via
 * getTheoryExtension(). Content style: hyphen only (no em-dash), bilingual
 * VI theory + brief EN mirror, focus on hard-won VN founder insights.
 */
export interface StartupTheoryExtension { vi: string; en: string }

const deep = (vi: string, en: string) => ({ vi, en });

export const startupTheoryExtensions: Record<string, StartupTheoryExtension> = {
  // ============================================================
  // Module 1 - Founder Mindset
  // ============================================================
  "su-1-1": deep(
    `
## 🔬 Đào sâu: Vì sao khái niệm "startup" hay bị hiểu sai ở VN?
Ở Việt Nam, truyền thông hay dùng chữ "khởi nghiệp" cho cả 3 nhóm: SME, startup và social enterprise. Điều này gây tai hại vì nhà đầu tư mạo hiểm (VC) không rót vốn vào SME - họ cần **exit 10x trong 7 năm**. Nếu bạn xây quán cà phê rồi đi gọi VC, cả hai bên đều mất thời gian.

## 📐 Công thức 3S để nhận biết startup thật
- **Scalable**: doanh thu tăng nhanh hơn chi phí (biên gộp > 60% với SaaS).
- **Searching**: chưa có PMF - mô hình còn thay đổi.
- **Sizable market**: TAM > 1 tỷ USD (US) hoặc > 100 triệu USD (VN/SEA).

## 🎯 Case Việt Nam nhìn kỹ hơn
- **Tiki (2010)**: bắt đầu như SME bán sách online, chuyển thành startup khi mở marketplace + logistics.
- **Foody**: startup từ đầu vì mục tiêu là scale nền tảng review, không phải mở nhà hàng.
- **The Coffee House**: SME (chuỗi F&B), không phải startup dù có tech.

## ⚠️ Sai lầm phổ biến
Founder VN hay nhầm "công ty công nghệ" = startup. Một studio outsource làm web-app cho khách theo giờ là **agency**, không phải startup - vì doanh thu tuyến tính với số dev.
`,
    `A startup is a temporary org searching for a repeatable, scalable model. Rule of thumb: revenue must grow faster than headcount. Vietnamese founders often confuse "tech company" with startup - an agency selling dev hours is not a startup.`,
  ),
  "su-1-2": deep(
    `
## 🔬 Đào sâu: Vì sao 80% startup chết vì founder, không phải vì market?
Y Combinator theo dõi 3000+ startup và phát hiện: khi thị trường xấu, những founder có **grit** (bền bỉ) và **fast learning cycle** vẫn xoay được. Ngược lại, founder có ý tưởng hay nhưng thiếu 3 mindset dưới đây thường tự bỏ cuộc trước tuần 52.

## 📐 Cụ thể hoá 3 mindset
1. **Growth**: viết nhật ký "1 điều tôi chưa biết hôm nay" - 30 ngày liên tục.
2. **First-principles**: khi gặp bế tắc, hỏi 3 câu "Vì sao?" liên tiếp để về giả định gốc.
3. **Bias for action**: quy tắc **48 giờ** - mọi quyết định one-way-door được suy nghĩ tối đa 48h, two-way-door quyết trong 2h.

## 🎯 Bài tập Elon Musk hay dùng
Ý tưởng: "Xe điện quá đắt vì pin lithium đắt." First-principles hỏi: nguyên vật liệu của pin (nickel, cobalt, than, lithium) trên thị trường London Metal Exchange giá bao nhiêu? Kết quả: giá vật liệu chỉ chiếm 12% giá pin thành phẩm → còn 88% cơ hội tối ưu hoá công nghệ và quy mô.

## ⚠️ Anti-pattern
"Chờ đủ dữ liệu rồi quyết định" = paralysis. Amazon quy tắc: **quyết ở 70% thông tin**. Chờ 90% thường là quá muộn.
`,
    `80% of startups die from founder burnout, not market. Practice growth mindset, first-principles thinking and bias-for-action daily. Use Amazon's 70% rule.`,
  ),
  "su-1-3": deep(
    `
## 🔬 Đào sâu: 5 nguồn pain point chất lượng cao ở VN 2026
1. **Nội tại**: pain bạn đã chịu 100+ giờ (ELSA - founder Văn Vũ Đinh phát âm sai bị hiểu lầm).
2. **Ngành mẹ**: pain nghề của bố mẹ/họ hàng (Misa AVA - kế toán thủ công).
3. **Regulation shift**: NĐ13/2023 về data protection tạo thị trường compliance-tech.
4. **Adjacent geography**: pain SEA nhưng chưa ai làm VN version (Homebase - rent-to-own bất động sản kiểu Thái).
5. **AI enablement**: cái trước AI không làm được, giờ làm được với LLM (Kompa - social listening).

## 📐 3 lens lọc trend
- **Wave**: đang sóng lên (AI infra, vertical AI, climate-tech) hay đang xẹp (NFT gaming)?
- **Wallet**: ai đang trả tiền và trả bao nhiêu (WTP > 50k/tháng cho B2C, > 5M/tháng cho SME)?
- **Wedge**: bạn có unfair advantage nào (dataset, quan hệ, kinh nghiệm chuyên ngành)?

## 🎯 VN-specific opportunities 2026
- **Vertical AI cho SMB**: kế toán, y tế cơ sở, giáo dục K12.
- **EdTech học tiếng cho học sinh vùng sâu** (voice-first, offline-first).
- **Logistics-tech** cho cross-border VN → Trung/Nhật.
- **Compliance-tech**: PDPA, e-invoice, ESG report.
`,
    `Best pain sources: personal experience, parents' industry, regulation shifts, adjacent geographies, and AI-enabled niches. Filter with the 3W lens (Wave, Wallet, Wedge).`,
  ),
  "su-1-4": deep(
    `
## 🔬 Đào sâu: Mom Test - làm sao phỏng vấn không bị "bạn tốt bụng lừa"?
Rob Fitzpatrick trong "The Mom Test" chỉ ra: nếu bạn hỏi "Bạn có thích ý tưởng này không?", ngay cả mẹ bạn cũng nói **có** vì lịch sự. Cách đúng: hỏi về **quá khứ**, không tương lai; về **hành vi thực**, không opinion.

## 📐 3 loại câu hỏi hợp lệ
1. "Lần cuối bạn gặp vấn đề X là khi nào? Bạn đã làm gì để giải quyết?"
2. "Bạn đã chi bao nhiêu tiền cho giải pháp hiện tại (kể cả thời gian)?"
3. "Có ai khác trong team/gia đình cũng gặp vấn đề này không?"

## ⚠️ Câu hỏi CẤM
- "Bạn có mua sản phẩm X giá 99k không?" (hypothetical)
- "Bạn nghĩ ý tưởng này thế nào?" (opinion)
- "Bạn có thích tính năng Y không?" (leading)

## 🎯 Metric để "go/no-go"
- 7/10 xác nhận pain rõ rệt (chi tiền/thời gian).
- 5/10 sẵn sàng thử beta trong 2 tuần tới.
- 3/10 giới thiệu người khác cùng gặp pain.

## 💡 Mẹo của thầy Hải
Sau khi phỏng vấn xong, gửi 1 form Notion trong 24h: "Anh/chị chịu **chi 200k** để beta test tuần sau không?" - đây là **pre-order test** thật sự.
`,
    `Use the Mom Test: ask about past behavior, not future opinions. Go/no-go: 7/10 confirm pain + 5/10 beta commit + 3/10 refer. Then send a 200k pre-order test link.`,
  ),
  "su-1-5": deep(
    `
## 🔬 Đào sâu: Cấu trúc equity chống rủi ro
Rule of thumb sau 200+ deal VC VN nhìn thấy:
- **2 co-founder**: 50/50 chỉ dùng khi cả hai contribute NGANG NHAU (cực hiếm). Thực tế 55/45 hoặc 60/40 (CEO nhiều hơn).
- **3 co-founder**: 45/30/25 hoặc 40/35/25. Tránh 33/33/33 vì kẹt khi bỏ phiếu.
- **Vesting**: 4 năm với **1 năm cliff** - đi trước 12 tháng thì mất toàn bộ.

## 📐 Founder Prenup - phải có trước khi code dòng đầu tiên
1. **IP assignment**: mọi code/design tạo ra thuộc công ty (không phải cá nhân).
2. **Vesting schedule**: viết vào Founder Agreement.
3. **Reverse vesting**: cổ phần founder cũng chịu vesting.
4. **Right of first refusal**: muốn bán share, phải mời co-founder mua trước.
5. **Non-compete 1 năm** sau nghỉ.

## ⚠️ Anti-pattern VN thường mắc
- "Anh em thân nhau khỏi cần hợp đồng" → 90% chia tay lộn xộn.
- "Cho friend 10% để làm advisor part-time" → không vesting = dilution vĩnh viễn.
- "CTO thuê ngoài lấy 20% equity mà không code" → chết ở seed round.

## 🎯 ESOP pool khuyên
- Pre-seed: 10%
- Seed: 12-15%
- Series A: 15-20%
Càng vào sau, VC ép mở pool trước khi rót → dilution founder.
`,
    `Avoid 50/50 or 33/33/33. Use 4-year vesting with 1-year cliff. Sign a founder prenup (IP, vesting, ROFR, non-compete) before writing code. Set ESOP pool 10-20% based on stage.`,
  ),
  // ============================================================
  // Module 2 - Product & MVP
  // ============================================================
  "su-2-1": deep(
    `
## 🔬 Đào sâu: Jobs-To-Be-Done - "khách không mua khoan, họ mua lỗ trên tường"
Clay Christensen: khách hàng "thuê" (hire) sản phẩm để hoàn thành 1 **job**. Job có 3 lớp:
1. **Functional**: đo được (đi từ A→B).
2. **Emotional**: cảm nhận (được coi trọng).
3. **Social**: người khác nghĩ gì (uy tín, đẳng cấp).

## 📐 JTBD interview - 5 câu quyết định
1. "Lần đầu bạn nhận ra mình CẦN giải pháp này là khi nào?"
2. "Bạn đã cân nhắc dùng cái gì trước? (competing solutions)"
3. "Điều gì làm bạn quyết định chọn giải pháp hiện tại?"
4. "Sau khi dùng, kết quả có đúng kỳ vọng?"
5. "Nếu ngày mai sản phẩm biến mất, bạn thay bằng gì?"

## 🎯 Ví dụ ELSA
- Functional: cải thiện phát âm tiếng Anh.
- Emotional: đỡ ngại khi nói với người nước ngoài.
- Social: gia đình/sếp thấy tiến bộ trong họp.
Nếu chỉ nhắm functional, ELSA chỉ là app phát âm. Kết hợp cả 3 → churn thấp và ARPU cao.

## ⚠️ Anti-pattern
"Xây tất cả tính năng khách yêu cầu" = feature bloat. JTBD nói: cắt tính năng nào không giúp hoàn thành job chính.
`,
    `Customers hire products to do a job with functional + emotional + social layers. Ask the 5 JTBD questions. Cut features that don't serve the core job.`,
  ),
  "su-2-2": deep(
    `
## 🔬 Đào sâu: Lean Canvas 9 ô - thứ tự điền quan trọng hơn nội dung
Ash Maurya sửa Business Model Canvas thành **Lean Canvas** cho startup: bỏ Key Partners/Activities, thêm Problem/Solution/UVP/Unfair Advantage.

Thứ tự điền ĐÚNG:
1. Customer Segment (rõ ai)
2. Problem (top-3 pain có bằng chứng)
3. UVP (unique value proposition - 1 câu)
4. Solution (top-3 features)
5. Channels
6. Revenue Streams
7. Cost Structure
8. Key Metrics (North Star + input metrics)
9. Unfair Advantage (cái đối thủ không copy được)

## 📐 Bài kiểm tra Lean Canvas
- **Câu UVP** ngắn dưới 10 chữ và tránh buzzword ("AI-powered platform" ❌).
- **Unfair Advantage** phải là 1 trong 5: insider info, dream team, existing customers, personal authority, patents.
- **Key Metrics** không được là vanity (downloads, pageviews) - phải là actionable (D7 retention, paid conversion).

## 🎯 Ví dụ Lean Canvas cho startup ôn IELTS VN
- Customer: học sinh 17-22 tuổi đang cày IELTS 6.5+.
- Problem: speaking practice thiếu partner, sợ tốn tiền IELTS thật.
- UVP: "Đo band IELTS Speaking trong 15 phút."
- Solution: mock test AI + rubric grading.
- North Star Metric: paid weekly practice sessions per user.
`,
    `Fill Lean Canvas in order: Segment → Problem → UVP → Solution → Channels → Revenue → Cost → Metrics → Unfair Advantage. Keep UVP <10 words, no buzzwords.`,
  ),
  "su-2-3": deep(
    `
## 🔬 Đào sâu: 3 loại MVP - chọn đúng theo giai đoạn
1. **Concierge MVP**: bạn tự tay phục vụ 10 khách (Airbnb chụp ảnh cho host).
2. **Wizard of Oz**: giao diện có vẻ tự động nhưng backend là con người (Zappos ban đầu).
3. **Landing Page MVP**: bán trước khi build (Buffer thu $9/tháng qua landing page).

## 📐 Quy tắc "1 job, 3 features, 30 ngày"
- Chọn 1 job quan trọng nhất (không 5).
- 3 features tối đa (cắt phần còn lại).
- Ship trong 30 ngày (dùng Lovable/Bubble/Figma prototype).

## 🎯 Stack no-code khuyên 2026
- **UI**: Lovable, Bubble, FlutterFlow.
- **DB + Auth**: Supabase (như HaiEduTech), Firebase.
- **AI**: OpenAI/Anthropic API, hoặc gọi Lovable AI Gateway.
- **Payment**: Stripe, MoMo, VNPay.

## ⚠️ Anti-pattern
- "Code xong hết rồi mới cho khách xem" → 6 tháng trôi qua, khách bỏ đi.
- "Beautify UI trước khi validate" → sơn nhà chưa xây.
- Không tracking analytics → không biết cần cải gì.

## 💡 Chỉ số đầu tiên cần đo
- **Activation rate**: % user hoàn thành hành động core trong 24h đầu.
- **D7/D30 retention**: quay lại tuần 1/tháng 1.
- **Sean Ellis PMF score**: "Bạn sẽ cảm thấy thế nào nếu sản phẩm biến mất?" - 40%+ trả lời "rất thất vọng" = có PMF signal.
`,
    `3 MVP types: Concierge, Wizard of Oz, Landing Page. Rule: 1 job / 3 features / 30 days. Measure activation, D7/D30 retention, and Sean Ellis PMF (>=40%).`,
  ),
  "su-2-4": deep(
    `
## 🔬 Đào sâu: 8 nguyên tắc UX cho founder không phải designer
1. **Fitts's Law**: nút CTA to và gần ngón cái (mobile-first).
2. **Hick's Law**: giảm số lựa chọn - 3-5 option/màn.
3. **Miller's Law**: chunking - group 5-7 phần tử.
4. **Peak-End rule**: user nhớ đỉnh + kết thúc, không phải toàn bộ trải nghiệm.
5. **Zeigarnik effect**: progress bar dở dang tăng completion 40%.
6. **Aesthetic-usability**: đẹp = user cảm thấy dễ dùng dù không phải.
7. **Jakob's Law**: user quen pattern quen (giỏ hàng ở góc phải).
8. **Doherty threshold**: response < 400ms giữ flow, > 1s user bỏ.

## 📐 Design system tối thiểu
- **Font**: 1 sans-serif cho body (Inter/Manrope), 1 display (optional).
- **Màu**: primary + accent + 5 neutral shade (dùng Tailwind).
- **Spacing**: bội số 4px (4/8/12/16/24/32).
- **Component**: 8 element (button, input, card, modal, toast, tab, dropdown, avatar).

## 🎯 Onboarding pattern hiệu quả
- **Tour < 3 bước** (không 10).
- **Empty state có CTA** (không màn trắng).
- **Progressive disclosure**: chỉ show tính năng nâng cao khi user cần.
`,
    `Learn 8 UX laws (Fitts, Hick, Miller, Peak-End, Zeigarnik, Aesthetic-usability, Jakob, Doherty). Build minimum design system: 1 font, primary+accent+5 neutrals, 4px spacing, 8 components.`,
  ),
  "su-2-5": deep(
    `
## 🔬 Đào sâu: North Star Metric - đo lường "1 thứ quan trọng nhất"
NSM là **1 metric** phản ánh giá trị cốt lõi bạn tạo cho khách. Sai NSM → cả team đi lệch 6 tháng.

## 📐 3 tiêu chí NSM tốt
1. Correlate với **doanh thu dài hạn** (không chỉ tuần này).
2. Đo **giá trị khách nhận**, không chỉ hoạt động.
3. Team có thể **tác động trực tiếp**.

## 🎯 Ví dụ NSM
- **Airbnb**: nights booked (không phải sign-ups).
- **Spotify**: time spent listening (không phải downloads).
- **ELSA**: paid practice minutes/user/week.
- **Duolingo**: DAU that completed a lesson.

## 📐 AARRR funnel + KPI input
- **Acquisition**: CAC, CTR, cost per install.
- **Activation**: % hoàn thành onboarding <24h.
- **Retention**: D1/D7/D30, cohort curve flatten hay không.
- **Referral**: K-factor (mỗi user mời được bao nhiêu).
- **Revenue**: ARPU, LTV, MRR growth %.

## ⚠️ Anti-pattern
- Chọn "MAU" làm NSM cho SaaS → vanity nếu không convert paid.
- Chọn "revenue" thẳng làm NSM cho pre-PMF startup → team spam marketing.
`,
    `NSM = 1 metric that reflects real customer value. Airbnb: nights booked. Spotify: listening time. Track AARRR inputs behind it (CAC, activation, D7/D30, K-factor, ARPU/LTV).`,
  ),
  // ============================================================
  // Module 3 - Business Model & Market
  // ============================================================
  "su-3-1": deep(
    `
## 🔬 Đào sâu: 10 revenue stream phổ biến cho startup tech
1. **SaaS subscription** (biên gộp 70-85%).
2. **Marketplace take-rate** (10-30%).
3. **Transaction fee** (2-5%).
4. **Freemium + upgrade** (conversion 2-5%).
5. **Advertising** (ARPU thấp, cần scale).
6. **Data licensing** (B2B).
7. **API metered** ($/1000 calls).
8. **White-label** (setup + monthly).
9. **Physical + digital** (razor-and-blade).
10. **Community/education** (course, cohort).

## 📐 Recurring vs one-off
- SaaS trên 5x giá trị so với license one-off vì **LTV** cao và **valuation multiple** cao (10-15x ARR vs 2-3x revenue).
- VN 2026: chuyển từ license Excel/desktop → SaaS cloud là **wave lớn**.

## 🎯 Blend model - xu hướng 2026
Nhiều startup dùng blend:
- **Base subscription** + usage overage (Notion, Vercel).
- **Free tier** + team plan (Slack, Figma).
- **Marketplace** + SaaS cho seller (Shopify).
`,
    `10 revenue streams. Prefer SaaS/subscription over one-off (10-15x ARR multiple). 2026 trend: blend base + usage or freemium + team plan.`,
  ),
  "su-3-2": deep(
    `
## 🔬 Đào sâu: Tính TAM/SAM/SOM CHÍNH XÁC (không copy từ Statista)
- **TAM** = tổng chi tiêu ngành nếu bạn thắng 100%.
- **SAM** = phần thị trường bạn thực sự phục vụ được (địa lý, ngôn ngữ, segment).
- **SOM** = miếng bạn giành được trong 3-5 năm (thường 1-5% SAM).

## 📐 3 cách tính TAM đáng tin
1. **Top-down**: dùng report (Statista, McKinsey) rồi lọc. Rủi ro: report sai.
2. **Bottom-up**: (số người dùng tiềm năng) × (ARPU). Chính xác hơn.
3. **Value theory**: (tiết kiệm khách) × (giá bạn tính) × (số khách).

## 🎯 Ví dụ VN
Startup EdTech tiếng Anh cho học sinh cấp 3 VN:
- TAM: 3M học sinh × 500k VND/tháng × 12 = 18,000 tỷ VND (~750M USD).
- SAM: 30% có smartphone dùng app học tiếng = 5.4M người × 200k × 12 = 12,960 tỷ.
- SOM (3 năm): 2% SAM = 260 tỷ VND / năm.

## ⚠️ Anti-pattern
- "Thị trường EdTech VN 2 tỷ USD" copy nguyên từ report → VC hỏi cách tính, bạn chết ngay.
- Chỉ đưa TAM khủng, không có SAM và SOM → không thuyết phục.
`,
    `TAM = if you own everything. SAM = you actually serve. SOM = 3-5 yr realistic. Prefer bottom-up: users × ARPU. Always compute all three.`,
  ),
  "su-3-3": deep(
    `
## 🔬 Đào sâu: 5 chiến lược pricing cho SaaS
1. **Cost-plus**: chi phí + margin (chán, ai cũng vượt).
2. **Competitor-based**: theo đối thủ (race to bottom).
3. **Value-based**: theo giá trị mang lại (10% giá trị tiết kiệm).
4. **Freemium**: free tier + paid tier.
5. **Usage-based**: $/API call, $/seat, $/MB.

## 📐 3 anchor psychology
- **Decoy**: 3 tier, tier giữa là "trap" đẩy khách lên tier cao.
- **Charm pricing**: 99k tốt hơn 100k (dù tâm lý).
- **Bundle**: gộp 3 sản phẩm giảm 20% thay vì bán lẻ.

## 🎯 Pricing table hiệu quả
| Tier | Feature | Price | Target |
|---|---|---|---|
| Free | Core, 3 project | 0 | Students, testers |
| Pro | Unlimited + priority | 199k/mo | Freelancer, small team |
| Team | + seats + admin | 499k/mo/seat | 5-50 người |
| Enterprise | + SLA + custom | Contact us | 100+ người |

## ⚠️ Anti-pattern
- Free tier quá rộng → không ai upgrade.
- Enterprise không hide giá → khách tự loại.
- Đổi giá quá thường → mất trust.
`,
    `Prefer value-based pricing. Use decoy, charm pricing and bundles. 4-tier structure: Free → Pro → Team → Enterprise. Never race-to-bottom.`,
  ),
  "su-3-4": deep(
    `
## 🔬 Đào sâu: Unit Economics - làm sao biết startup có lãi bền vững?
- **CAC** (Customer Acquisition Cost): tổng chi phí marketing/sales chia số khách mới trong kỳ.
- **LTV** (Lifetime Value): (ARPU × gross margin) / churn.
- **LTV/CAC**: > 3 = tốt, > 5 = xuất sắc. < 1 = đốt tiền.
- **Payback period**: CAC / (ARPU × gross margin) = bao nhiêu tháng thu lại CAC. Nên < 12 tháng cho SaaS SMB.

## 📐 Ví dụ tính
- ARPU: 200k/tháng.
- Gross margin: 80%.
- Churn: 5%/tháng → tuổi thọ trung bình 20 tháng.
- **LTV** = 200k × 80% × 20 = 3.2M VND.
- CAC: 800k → **LTV/CAC = 4** (healthy).
- Payback: 800k / (200k × 80%) = 5 tháng ✅.

## 🎯 Cách giảm CAC
- SEO/content organic (chi phí sunk 1 lần).
- Referral program (K-factor > 0.5).
- Community-led (Discord, Telegram).
- Partnership với influencer/kênh sẵn có.

## 🎯 Cách tăng LTV
- Giảm churn (onboarding tốt, customer success).
- Upsell tier cao (annual plan, seat expansion).
- Cross-sell sản phẩm liền kề.
`,
    `Unit econ: LTV/CAC > 3 healthy, payback < 12 months for SMB SaaS. Reduce CAC via SEO/referral/community. Grow LTV via retention + upsell + cross-sell.`,
  ),
  "su-3-5": deep(
    `
## 🔬 Đào sâu: GTM (Go-To-Market) cho AI/EdTech VN
GTM = cách bạn đưa sản phẩm ĐẾN đúng người, đúng lúc, đúng giá. 3 mô hình:

1. **Product-led growth (PLG)**: sản phẩm tự bán (Notion, Figma). Dùng khi self-serve + K-factor cao.
2. **Sales-led**: sales team gọi doanh nghiệp (Salesforce). Dùng khi ARPU > 20k USD/năm.
3. **Community-led**: Discord/Telegram/YouTube build organic (ELSA VN, Base.vn). Dùng khi content-heavy.

## 📐 5 channel test đầu tiên (rule of 5)
- Facebook/Instagram ads
- Google ads
- SEO organic
- Referral/affiliate
- Cộng đồng (Zalo/Discord/Facebook group)
→ Chi 5-10 triệu cho mỗi kênh trong 2 tuần, giữ 2 kênh CAC thấp nhất.

## 🎯 VN-specific channels 2026
- **TikTok Shop** cho gen Z consumer.
- **Zalo Mini App** cho SMB local (tận dụng 70M users VN).
- **Cộng đồng VOZ/Reddit VN** cho tech B2B.
- **VinaSchool/K12 partnership** cho EdTech.

## ⚠️ Anti-pattern
- Chi 100% ngân sách 1 kênh → concentration risk.
- Không đo CAC theo kênh → không biết cắt kênh nào.
`,
    `GTM = PLG / Sales-led / Community-led. Rule of 5: test 5 channels with 5-10M each in 2 weeks; keep 2 lowest-CAC. VN 2026 channels: TikTok Shop, Zalo Mini, VOZ, K12 partnership.`,
  ),
  // ============================================================
  // Module 4 - Fundraising & Finance
  // ============================================================
  "su-4-1": deep(
    `
## 🔬 Đào sâu: Khi nào KHÔNG nên gọi VC?
VC không phải luôn là con đường tốt nhất. Cân nhắc:

| Tiêu chí | Bootstrap | Angel | VC | Grant |
|---|---|---|---|---|
| Dilution | 0% | 5-15% | 20-30% | 0% |
| Speed | Chậm | Trung bình | Nhanh | Rất chậm |
| Support | Không | Mentor + network | Full stack | Không |
| Exit pressure | Không | Nhẹ | Cao (10x/7 năm) | Không |
| Best for | SME có PMF | Pre-seed idea | Scale hyper-growth | Deep tech/social |

## 📐 Quy tắc kinh nghiệm
- **Bootstrap**: nếu bạn đạt được PMF trong 6 tháng với < 200 triệu.
- **Angel**: idea giai đoạn 0, cần smart money.
- **VC**: có traction (>10k MAU hoặc >100k MRR), TAM > 1B USD, muốn scale nhanh.
- **Grant**: deep tech, social impact, xin NAFOSTED/Vingroup Innovation Foundation.

## 🎯 VN 2026 - VC list active
- **Series A+**: 500 Global, VinaCapital Ventures, Do Ventures, Golden Gate.
- **Seed**: Antler, Ascend Vietnam Ventures, ThinkZone.
- **Angel**: các founder cũ VNG, Tiki, Foody.

## ⚠️ Anti-pattern
Gọi VC khi chưa có PMF → cắt equity 30% cho $500k, rồi 12 tháng sau vẫn không tìm ra product-market fit → công ty chết + founder mất 30%.
`,
    `Don't always raise VC. Bootstrap if you can hit PMF <$10k. Angel for pre-seed. VC only with traction and >1B TAM. Grants for deep tech.`,
  ),
  "su-4-2": deep(
    `
## 🔬 Đào sâu: Cap Table và dilution qua 3 vòng
Ví dụ startup 3 co-founder:

**Founding**: 3 co-founder chia 100%: 45/30/25.

**Seed round** ($500k @ $4M pre-money = $4.5M post):
- Investors mua 11.1% ($500k / $4.5M).
- Founder giảm về 88.9%: 40/26.7/22.2.

**Pre-A** ($2M @ $10M pre-money = $12M post):
- Investors mới 16.7%.
- Founder + seed loãng: 74.1%.

**Series A** ($5M @ $25M pre-money = $30M post):
- Investors mới 16.7%.
- Founder cuối: ~62%.

## 📐 Anti-dilution + ESOP dilution
- **ESOP pool 15%** mở TRƯỚC seed → founder chịu dilution.
- **Anti-dilution weighted-average**: nếu round sau giá thấp hơn, VC được thêm shares miễn phí.

## 🎯 Rule of thumb dilution
- Sau seed: founder giữ 70-80%.
- Sau A: giữ 55-65%.
- Sau B: giữ 40-50%.
- Sau IPO: giữ 15-25%.

## ⚠️ Anti-pattern
Cho advisor 5% không vesting → 3 năm sau advisor biến mất nhưng vẫn giữ 5% → founder mất tinh thần.
`,
    `Model 3 rounds of dilution. Rule: founders 70-80% post-seed, 55-65% post-A, 40-50% post-B. Beware ESOP dilution and full-ratchet anti-dilution.`,
  ),
  "su-4-3": deep(
    `
## 🔬 Đào sâu: Pitch Deck 10 slide - công thức Sequoia
1. **Company purpose** (1 câu định vị).
2. **Problem** (3 pain, có data).
3. **Solution** (screenshot + demo).
4. **Why now** (unlock: tech shift, regulation, behavior).
5. **Market size** (TAM/SAM/SOM có nguồn).
6. **Competition** (2x2 matrix + moat).
7. **Product** (roadmap 12-18 tháng).
8. **Business model** (revenue stream + unit econ).
9. **Team** (why us + advisor).
10. **Financials + ask** ($X for Y milestones in Z months).

## 📐 3 quy tắc thiết kế
- **10-20-30**: 10 slide, 20 phút, font > 30pt.
- **1 idea/slide**: không nhồi 5 bullet.
- **Story arc**: hook → pain → solution → magic moment → why now → traction → team → ask.

## 🎯 Slide "traction" mạnh nhất
Chỉ 1 chart tăng lên phải (up-and-to-the-right):
- MRR growth (SaaS).
- MAU với retention curve flatten.
- Cohort revenue.
- LOI/pre-order từ enterprise.

## ⚠️ Anti-pattern
- Slide 15+ trang → VC bỏ ngang slide 5.
- "Không có competition" → VC nghĩ market không tồn tại.
- Ask $X không nói dùng làm gì → không xin được.
`,
    `10-20-30 rule. Sequoia's 10 slides: purpose, problem, solution, why-now, market, competition, product, model, team, financials+ask. One idea per slide.`,
  ),
  "su-4-4": deep(
    `
## 🔬 Đào sâu: SAFE vs Convertible Note vs Priced Round
| | SAFE | Convertible Note | Priced Round |
|---|---|---|---|
| Debt? | Không | Có (lãi 4-8%) | Không |
| Maturity | Không | 18-24 tháng | Không |
| Valuation cap | Có | Có | Chốt luôn |
| Discount | 10-20% | 10-25% | Không |
| Speed | Nhanh (2 tuần) | Trung bình | Chậm (2-3 tháng) |
| Legal cost | $3-5k | $5-10k | $30-50k |

## 📐 Khi nào dùng cái nào
- **SAFE**: pre-seed/seed nhỏ (<$500k), muốn nhanh, không muốn lãi.
- **Convertible Note**: cần chuyển đổi thành share ở round sau, có lãi cho investor VN thích.
- **Priced Round**: seed lớn hoặc A+, đã có lead investor set valuation.

## 🎯 Điều khoản cần đọc kỹ
- **Valuation cap**: giá tối đa để convert (thấp hơn = tốt cho founder... không, tốt cho investor).
- **Discount**: giảm giá khi convert (10-20% thường thấy).
- **MFN** (Most Favored Nation): investor được hưởng điều khoản tốt nhất của round sau.
- **Pro-rata**: quyền giữ % qua các round sau.

## ⚠️ Anti-pattern
- Ký 5 SAFE với 5 valuation cap khác nhau → messy khi convert.
- Convertible Note không extend maturity → tự nhiên biến thành nợ phải trả.
`,
    `SAFE = fast, no debt, valuation cap. Note = debt with interest. Priced = full round with lead. Watch cap, discount, MFN, pro-rata.`,
  ),
  "su-4-5": deep(
    `
## 🔬 Đào sâu: Burn multiple - metric quan trọng nhất 2024-2026
**Burn multiple** = net burn / net new ARR. Bell Curve investment (David Sacks) thang đo:
- < 1: xuất sắc, VC tranh nhau.
- 1-1.5: rất tốt.
- 1.5-2: chấp nhận được.
- 2-3: cần cải thiện.
- > 3: nguy hiểm.

Ví dụ: burn $200k/tháng, tạo $100k new ARR/tháng → burn multiple = 2 (chưa tốt).

## 📐 3-statement forecast
1. **P&L**: revenue - COGS - opex = EBITDA.
2. **Cash flow**: opening cash + inflow - outflow = closing cash.
3. **Balance sheet**: assets = liabilities + equity.

## 🎯 Runway calculation
- **Simple runway** = cash / monthly burn.
- **Effective runway** = cash / (burn - revenue growth).
- Rule: giữ **runway 18-24 tháng** sau round. < 12 tháng bắt đầu gọi round sau ngay.

## ⚠️ Anti-pattern
- "Hire khi vừa gọi được vốn" → burn tăng 3x, runway ngắn còn 8 tháng.
- Không hedge USD/VND → 2022 khủng hoảng tỷ giá làm nhiều startup VN mất 15% cash.
- Không xây scenario Best/Base/Worst → không có kế hoạch B.
`,
    `Burn multiple = net burn / new ARR; target <1.5. Runway 18-24 months after each round. Always model Best/Base/Worst scenarios.`,
  ),
  // ============================================================
  // Module 5 - Ops & Growth
  // ============================================================
  "su-5-1": deep(
    `
## 🔬 Đào sâu: Hire slow, fire fast - công thức 10 hire đầu tiên
Theo phân tích 200 startup YC:
- 3 first hires: T-shaped, mỗi người take 1 pillar (product/engineering/growth).
- 4-6th hire: specialists (senior engineer, growth lead, product designer).
- 7-10th hire: middle managers + operations.

## 📐 Quy trình phỏng vấn 4 vòng
1. **Screener** (30 phút): cultural + basic skills.
2. **Deep dive** (90 phút): 1 case study cụ thể + coding/design test.
3. **Working session** (2-4 giờ paid): làm 1 task thật.
4. **Reference check + culture**: gọi 3 ref cũ + team dinner.

## 🎯 Signal đỏ trong interview
- Không hỏi bất kỳ câu nào về công ty → thiếu curiosity.
- Blame ex-boss/ex-team → thiếu ownership.
- "Tôi làm được mọi thứ" → thiếu self-awareness.
- Không biết impact số của mình → thiếu data mindset.

## ⚠️ Fire fast - khi nào?
- Sau 90 ngày probation nếu miss 2/3 mục tiêu.
- Có culture red flag (bắt nạt, không trung thực).
- Regression sau 6 tháng dù coaching.
Rule: 1 người sai trong team 5 người = 20% năng suất mất.
`,
    `Hire slow (4-round process, working session paid). Fire fast within 90 days if 2/3 goals missed. First 10 hires: T-shaped, specialists, then managers.`,
  ),
  "su-5-2": deep(
    `
## 🔬 Đào sâu: 5 growth loop bền vững
1. **Viral loop** (Dropbox: mời bạn được 500MB).
2. **Content loop** (Notion templates → SEO → new users).
3. **UGC loop** (TikTok: creator upload → viewer xem → thành creator).
4. **Paid loop** (chi ads → revenue → chi ads).
5. **Sales-assisted loop** (Enterprise deal → case study → next deal).

## 📐 K-factor > 0.5 = viral thật
K-factor = (số lời mời/user) × (conversion rate lời mời).
- K > 1: viral thật, mỗi user tạo > 1 user mới.
- 0.5 < K < 1: amplifier tốt.
- K < 0.5: cần channel khác.

## 🎯 SEO/ASO cho startup
- **SEO**: viết 1 pillar page 3000+ chữ về topic core + 20 satellite pages.
- **ASO**: keyword trong tên app + description dày, screenshot chuyên nghiệp.
- Rule of thumb: 3-6 tháng để bắt đầu thấy organic traffic.

## ⚠️ Anti-pattern
- Growth hack "spam link Zalo" → bị ban + hại brand.
- Buy fake reviews trên App Store → Apple ban vĩnh viễn.
`,
    `5 growth loops: viral, content, UGC, paid, sales. K-factor > 0.5 for real virality. SEO/ASO takes 3-6 months. Never spam or buy fake reviews.`,
  ),
  "su-5-3": deep(
    `
## 🔬 Đào sâu: PMF - làm sao biết CHẮC bạn đã đạt?
Marc Andreessen: "You can always feel when product-market fit isn't happening. And you can always feel product-market fit when it's happening."

## 📐 4 dấu hiệu định lượng
1. **Sean Ellis test**: >= 40% user trả lời "very disappointed" nếu sản phẩm biến mất.
2. **Retention curve flatten**: cohort tuần 4-8 không giảm nữa (plateau).
3. **Organic growth > 30%**: mỗi tháng user mới chủ yếu do word-of-mouth.
4. **Pull > Push**: khách chủ động tìm bạn, sale team quá tải.

## 🎯 4 dấu hiệu định tính
- Team chuyển từ "kiếm khách" sang "phục vụ khách" gấp gáp.
- Server crash vì traffic bất ngờ.
- Khách gọi cảm ơn cá nhân, không hỏi tính năng.
- Investor tự tìm đến bạn thay vì bạn phải pitch.

## ⚠️ Pre-PMF anti-pattern
- Hire nhiều sales quá sớm → burn tăng nhưng deal không close.
- Marketing budget lớn → user churn cao, LTV/CAC < 1.
- Roadmap 12 tháng cứng → thị trường thay đổi bạn không kịp.
`,
    `PMF signals: Sean Ellis >=40%, retention curve flatten, organic growth >30%, and pull > push. Don't scale until you see all four.`,
  ),
  "su-5-4": deep(
    `
## 🔬 Đào sâu: OKR - công thức Andy Grove
**Objective** (định tính, cảm hứng) + **Key Results** (định lượng, đo được, thách thức).

Ví dụ tốt:
- **O**: Trở thành EdTech tiếng Anh #1 cho học sinh Việt cấp 3.
- **KR1**: Đạt 100k paid users trong Q4.
- **KR2**: NPS >= 60.
- **KR3**: D30 retention >= 40%.

## 📐 3 rule OKR
1. **Aim high**: KR thất bại 30-40% mới là stretch. Nếu 100% đạt → set quá thấp.
2. **Public**: cả company thấy OKR nhau (không bí mật).
3. **Cascade**: company OKR → team OKR → individual OKR.

## 🎯 Weekly ritual (Scrum + OKR)
- **Thứ 2**: weekly commit (mỗi người 3 top priorities).
- **Thứ 4**: mid-week checkin (5 phút mỗi người).
- **Thứ 6**: retrospective + demo (celebrate wins).
- **Cuối tháng**: OKR review + adjust.
- **Cuối quý**: OKR scoring 0.0-1.0.

## ⚠️ Anti-pattern
- OKR = task list → mất tính stretch.
- Cascading OKR không align → team hôm sau đi ngược company OKR.
- Không public OKR → thiếu accountability.
`,
    `OKR = Objective (qualitative) + Key Results (quantitative, stretch). Aim for 60-70% achievement. Weekly rituals: Mon commit, Wed checkin, Fri retro. Score 0.0-1.0 quarterly.`,
  ),
  "su-5-5": deep(
    `
## 🔬 Đào sâu: Legal setup cho startup VN 2026
### Chọn form pháp nhân
- **Công ty TNHH 2TV+**: đơn giản, 2-50 người, chuyển share phải sự đồng ý.
- **Công ty CP**: bắt buộc nếu muốn phát hành cổ phần ra ngoài, tối thiểu 3 cổ đông.
- **CP** thường được VC prefer.

### Chọn location
- **VN**: dễ nhưng thuế TNDN 20% + hạn chế đầu tư nước ngoài (một số ngành).
- **Singapore**: VN founder pop, thuế 17% cap, dễ pool VC. Chi phí duy trì $3-5k/năm.
- **Delaware**: cần cho gọi VC Mỹ + IPO Nasdaq.

### VSD (Vietnam Startup Deck) mẫu
- Đăng ký ưu đãi thuế Nghị định 13 (giảm 50% TNDN 2 năm đầu).
- Đăng ký DNKHCN (doanh nghiệp khoa học công nghệ) → miễn thuế 4 năm.

## 📐 IP protection
- **Copyright**: source code, design.
- **Trademark**: brand name, logo (đăng ký NOIP).
- **Trade secret**: NDA với nhân viên + partner.
- **Patent**: chỉ cần cho deep tech (rất tốn kém).

## ⚠️ Anti-pattern
- Founder ký contract cá nhân → sau bị VC ép chuyển sang công ty.
- Không có NDA với freelancer → IP rơi vào tay người khác.
- Đăng ký trademark quá trễ → tên bị ai đó cướp.
`,
    `Choose LLC vs JSC (VC prefer JSC). Consider Singapore or Delaware for global VC. Register IP: copyright, trademark, NDA. Get tax breaks under Decree 13.`,
  ),
  // ============================================================
  // Module 6 - AI Startup Playbook
  // ============================================================
  "su-6-1": deep(
    `
## 🔬 Đào sâu: 3 lớp AI stack 2026
1. **Infra**: chip (NVIDIA, AMD), cloud (AWS, GCP), foundational model (OpenAI, Anthropic, Google). Yêu cầu vốn > $100M.
2. **Model layer**: fine-tuned/open-source model + serving (Together AI, Fireworks). Vốn $10-50M.
3. **Application layer**: sản phẩm cuối cho end-user. Vốn $200k-2M gọi được seed.

## 📐 LLM wrapper vs Vertical AI vs AI-native
- **LLM wrapper** (chỉ prompt engineering trên GPT-4): commodity, dễ bị copy.
- **Vertical AI** (specific domain: pháp lý, y tế, giáo dục): có moat từ **domain data + workflow integration**.
- **AI-native** (rebuild toàn bộ product logic quanh AI): Perplexity, Cursor, ELSA.

## 🎯 Con đường cho VN founder
- **Không nên**: xây foundation model (không đủ vốn + GPU).
- **Nên**: Vertical AI cho ngành mẹ đẻ (finance VN, edu VN, healthcare VN).
- **Lý do**: dataset tiếng Việt + hiểu quy trình local = moat mà OpenAI không thể copy nhanh.

## ⚠️ Anti-pattern
- "Xây ChatGPT VN" → cạnh tranh trực tiếp với OpenAI với vốn 1000x nhỏ hơn → chết.
- Đầu tư vào infra layer khi chưa có $50M+ → mất 12 tháng đốt cash không kết quả.
`,
    `AI stack has 3 layers: infra, model, app. VN founders: focus on Vertical AI in your domain. Don't try to be 'ChatGPT for VN'.`,
  ),
  "su-6-2": deep(
    `
## 🔬 Đào sâu: Build AI product với API - kiến trúc 2026
### Stack tiêu chuẩn
- **Frontend**: React/Next.js hoặc Lovable.
- **Backend**: Supabase Edge Functions hoặc Vercel Functions.
- **LLM**: Lovable AI Gateway (google/gemini-2.5-flash cho tốc độ, gemini-2.5-pro cho reasoning, claude-sonnet cho code).
- **Embedding**: text-embedding-3-small ($0.02/1M token).
- **Vector DB**: Supabase pgvector (miễn phí đến 500MB) hoặc Pinecone (paid).
- **Guard rails**: content moderation + prompt injection detection.

### Pattern kiến trúc
1. **RAG (Retrieval-Augmented Generation)**: user query → embedding → retrieve top-k chunk → prompt LLM với context.
2. **Function calling**: LLM tự chọn tool để trả lời (search, calculator, DB query).
3. **Agent**: LLM plan → execute → reflect → repeat.

## 📐 3 metric quan trọng
- **Latency P95**: < 3s cho chat, < 10s cho analysis.
- **Cost/query**: track $/user/day.
- **Quality score**: user thumbs up/down + rubric eval.

## ⚠️ Anti-pattern
- Gọi thẳng OpenAI API trong frontend → API key lộ + bị spam.
- Không cache/batch → chi phí gấp 10.
- Không có fallback khi LLM down → app chết.
`,
    `Stack: React + Supabase Edge + Lovable AI Gateway + pgvector. Patterns: RAG, function calling, agent. Watch P95 latency, cost/query, quality score. Never call LLM from frontend.`,
  ),
  "su-6-3": deep(
    `
## 🔬 Đào sâu: Data moat - khi nào cần fine-tuning?
### 3 nguồn data moat
1. **User-generated**: user tạo data khi dùng (Notion pages, Figma files).
2. **Domain-specific**: dataset chuyên ngành khó thu (medical records, legal case).
3. **Feedback loop**: user chỉnh sửa output AI → data cải thiện model.

### Khi nào KHÔNG cần fine-tuning?
- Prompt engineering + RAG đã đủ.
- Task chung (translation, summarization).
- Chưa có > 1000 examples chất lượng cao.

### Khi nào NÊN fine-tuning?
- Task very specific (VN legal text summarization).
- Latency/cost là bottleneck (small model + fine-tune rẻ hơn GPT-4).
- Có > 10k examples chất lượng cao.

## 📐 3 loại fine-tuning
- **LoRA** (Low-Rank Adaptation): rẻ ($10-100), fast, không mất kiến thức gốc.
- **Full fine-tuning**: đắt ($1k-10k), risk catastrophic forgetting.
- **RLHF** (Reinforcement Learning from Human Feedback): cần > 100k feedback pairs.

## 🎯 Case ELSA
Fine-tuned model chuyên phát âm tiếng Anh cho người **có L1 (native language) tiếng Việt/Nhật/Hàn**. Dataset gồm > 1 tỷ voice samples với label mispronunciation → không competitor nào copy được nhanh.
`,
    `Data moat comes from user-generated data, domain-specific data, or feedback loops. Fine-tune only when RAG isn't enough. Use LoRA first, then full fine-tune, then RLHF.`,
  ),
  "su-6-4": deep(
    `
## 🔬 Đào sâu: Pattern chung của 5 case Việt thắng
1. **Deep vertical**: không general, cực chuyên (ELSA phát âm, VinAI NLP VN, Misa kế toán, Got It education marketplace, Trusting Social credit scoring).
2. **Data moat**: mỗi startup có dataset đặc biệt không copy nhanh.
3. **Founder-market fit**: founder có insider knowledge/network.
4. **Local advantage + global ambition**: dùng VN làm launchpad, xuất khẩu sang SEA/US.
5. **Corp-friendly**: hầu hết B2B hoặc partner với corp lớn.

## 📐 Bài học từ thất bại
- **Wefit VN** (fitness marketplace): burn quá nhanh, unit econ âm 2 năm liền → phá sản 2019.
- **Foody VN**: sell to SEA Group vì không giữ được PMF sau khi Grab/Now vào.
- **Vinasun taxi + Vato**: không kịp adapt với Grab/Be → mất thị phần 70%.

## 🎯 Playbook chung
1. Chọn niche vertical nhỏ (200-500k user tối đa).
2. Build 12 tháng đến PMF.
3. Raise seed $500k → 18 tháng runway.
4. Scale trong SEA (VN → ID → TH → PH) trong 2 năm.
5. Series A $3-5M, expand US/EU 3 năm tiếp.
6. Exit: acquisition bởi corp hoặc IPO SGX/HOSE.
`,
    `VN winners share 5 traits: deep vertical, data moat, founder-market fit, local+global, corp-friendly. Failures: bad unit econ, slow adapt. Playbook: PMF → SEA expand → Series A → US/EU.`,
  ),
  "su-6-5": deep(
    `
## 🔬 Đào sâu: Path từ VN ra thế giới 2026
### Top 5 accelerator cho startup VN
1. **Y Combinator (US)**: $500k, 3 tháng SF, alumni network mạnh nhất. Chấp nhận rate < 1%.
2. **Antler (SG)**: $100k seed, 6 tháng SG, match co-founder + coaching.
3. **500 Global** (chi nhánh SEA): $150k, 4 tháng, active ở SG/VN.
4. **Techstars**: $120k, 3 tháng, network US mạnh.
5. **Iterative** (SEA-focus): $150k, 3 tháng, đầu tư nhiều VN startup.

### Chuẩn bị hồ sơ apply
- **Traction**: > 1000 user hoặc > $10k MRR.
- **Team**: 2-3 co-founder full-time.
- **Deck**: 10 slide Sequoia format.
- **Video**: 1 phút giới thiệu bằng English rõ ràng.

### Bảo hộ IP toàn cầu
- Đăng ký trademark PCT (International).
- Đăng ký công ty Delaware trước khi apply YC.
- **Flip structure**: chuyển IP từ VN sang Cayman/Singapore holding.

## 📐 Chi phí + timeline
- Legal flip: $10-30k, 2-3 tháng.
- Company incorporation SG/DE: $2-5k, 1-2 tuần.
- IP registration global: $5-15k, 6-12 tháng.

## ⚠️ Anti-pattern
- Apply YC với product tiếng Việt only → không hiểu global vision.
- Flip cấu trúc quá sớm → tốn tiền + confuse VN tax.
- Không có US-based advisor/board member → khó gọi Series A US.
`,
    `Top accelerators for VN: YC, Antler, 500 Global, Techstars, Iterative. Need >1000 users + Sequoia deck + 1min video. Flip to Delaware/Cayman before Series A. Budget $15-50k for legal + IP.`,
  ),
};

export function getStartupTheoryExtension(lessonId: string, lang: "vi" | "en"): string {
  const ext = startupTheoryExtensions[lessonId];
  if (!ext) return "";
  return lang === "vi" ? ext.vi : ext.en;
}
