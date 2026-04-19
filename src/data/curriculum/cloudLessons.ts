// Cloud Engineer curriculum — 5 progressive modules
// Tương thích với ExtendedProgrammingModule (cùng schema với SQL/ML/Data Eng)
import type { ExtendedProgrammingModule } from "./types";

export const cloudModules: ExtendedProgrammingModule[] = [
  // ============ MODULE 1: Cloud Fundamentals ============
  {
    id: "cloud-fundamentals",
    title: "Nền tảng Điện toán Đám mây",
    titleEn: "Cloud Computing Fundamentals",
    icon: "☁️",
    color: "from-sky-500 to-blue-600",
    description: "Hiểu mô hình đám mây, IaaS/PaaS/SaaS, các nhà cung cấp lớn (AWS, Azure, GCP)",
    descriptionEn: "Understand cloud models, IaaS/PaaS/SaaS, major providers (AWS, Azure, GCP)",
    course: "cloud",
    lessons: [
      {
        id: "cloud-fund-1",
        title: "Điện toán đám mây là gì?",
        titleEn: "What is Cloud Computing?",
        level: 1,
        difficulty: "beginner",
        theory: `**Cloud Computing** là việc cung cấp tài nguyên máy tính (server, storage, database, network, software) qua Internet theo mô hình **trả tiền theo mức sử dụng (pay-as-you-go)**. Thay vì đầu tư trước hàng triệu đô vào data center, bạn "thuê" hạ tầng theo phút/giờ và mở rộng tức thì khi cần.

## Bối cảnh & vì sao Cloud bùng nổ
Trước 2006, mọi công ty muốn chạy phần mềm phải tự mua server, lắp ráp data center, thuê đội sysadmin trực 24/7. Khi traffic tăng đột ngột (Black Friday, viral content), hệ thống sập vì không kịp mua thêm máy. Khi traffic xuống, hàng triệu đô server nằm chơi.

AWS ra mắt S3 (2006) và EC2 (2006) khởi đầu kỷ nguyên Cloud — biến CAPEX (chi phí đầu tư) thành OPEX (chi phí vận hành). Ngày nay >95% doanh nghiệp dùng cloud ở mức độ nào đó (Gartner 2024).

## 5 đặc tính cốt lõi theo NIST
NIST (Viện Tiêu chuẩn Mỹ) định nghĩa cloud bằng 5 đặc tính chuẩn để phân biệt với "outsourcing thường":

1. **On-demand self-service** — tự cấp phát tài nguyên qua web console / API / CLI mà không cần liên hệ con người ở nhà cung cấp.
2. **Broad network access** — truy cập từ mọi thiết bị (laptop, mobile, IoT) qua mạng chuẩn (HTTPS).
3. **Resource pooling** — hạ tầng vật lý dùng chung (multi-tenant) qua ảo hóa, người dùng không thấy vị trí vật lý cụ thể.
4. **Rapid elasticity** — co giãn nhanh theo nhu cầu, có thể tự động (auto-scaling) hoặc thủ công, gần như không giới hạn từ góc nhìn người dùng.
5. **Measured service** — đo đếm chính xác (CPU-second, GB-month, request) để tính phí minh bạch.

## 3 mô hình dịch vụ (IaaS / PaaS / SaaS)
Mức độ "nhà cung cấp lo giùm" tăng dần — bạn càng ít việc, càng ít linh hoạt:

| Mô hình | Khách hàng quản lý | Nhà cung cấp lo | Ví dụ |
|---|---|---|---|
| **IaaS** | OS, runtime, middleware, app, data | Hardware, virtualization, network | AWS EC2, Azure VM, GCP Compute Engine |
| **PaaS** | App, data | Toàn bộ phần dưới | Elastic Beanstalk, Heroku, App Engine |
| **SaaS** | Cấu hình & dữ liệu của bạn | Mọi thứ khác | Gmail, Office 365, Salesforce |

**Mẹo nhớ:** "Pizza analogy" — IaaS = bạn mua nguyên liệu về tự nấu; PaaS = mua pizza đông lạnh tự nướng; SaaS = đặt pizza giao tận nhà.

## 4 mô hình triển khai (deployment)
- **Public Cloud** — hạ tầng dùng chung (AWS, Azure, GCP). Rẻ nhất, scale nhanh nhất.
- **Private Cloud** — riêng cho 1 tổ chức (on-prem hoặc hosted). Kiểm soát cao, phù hợp ngân hàng/quốc phòng.
- **Hybrid Cloud** — mix Public + Private, kết nối qua VPN/Direct Connect.
- **Community Cloud** — vài tổ chức cùng lĩnh vực dùng chung (vd. cloud cho ngành y tế tuân thủ HIPAA).

## Case study thực tế: Netflix
Năm 2008 Netflix bị crash database 3 ngày vì hạ tầng on-prem không chịu nổi. Họ quyết định "all-in" vào AWS. Đến 2016 đóng hoàn toàn data center cuối cùng. Hiện nay Netflix chạy >100,000 EC2 instance, phục vụ 250M+ subscriber, dùng auto-scaling để xử lý peak buổi tối gấp 10× lúc 3h sáng — không thể làm được nếu tự mua server.

## Lợi ích vs đánh đổi
**Lợi ích:**
- Giảm CAPEX (không mua server) → đổi sang OPEX dễ dự toán hơn cho startup
- Time-to-market nhanh: deploy app mới trong vài phút thay vì 3 tháng đặt hàng server
- Global scale: bật region mới ở Singapore trong 5 phút
- Độ tin cậy cao (SLA 99.9% – 99.999%)
- Tự động backup, encryption, compliance (SOC2, ISO27001) sẵn có

**Đánh đổi:**
- Bill có thể "shock" nếu thiết kế sai (xem bài FinOps)
- Vendor lock-in nếu dùng dịch vụ độc quyền (DynamoDB, BigQuery)
- Phụ thuộc Internet — mất mạng = mất production
- Compliance/data residency phức tạp với một số ngành

## Khi nào KHÔNG nên cloud
- Workload cực ổn định, chạy 24/7 nhiều năm → on-prem có thể rẻ hơn 30-50% (vd. Dropbox đã "reverse migration" từ AWS về self-hosted để tiết kiệm $75M/năm)
- Latency cực thấp <1ms (HFT trading)
- Dữ liệu nhạy cảm bị luật cấm rời quốc gia

## Liên hệ bài tiếp theo
Bài 2 sẽ so sánh **Big Three** (AWS / Azure / GCP) — bạn sẽ biết chọn nhà cung cấp nào cho dự án cụ thể.`,
        theoryEn: `**Cloud Computing** delivers compute resources (servers, storage, databases, network, software) over the Internet on a **pay-as-you-go** model. Instead of investing millions upfront in a data center, you rent infrastructure by the minute/hour and scale instantly when needed.

## Context: why Cloud exploded
Before 2006, every company had to buy servers, build data centers, and hire 24/7 sysadmins. Traffic spike on Black Friday? Site crashed. Traffic drop? Millions in idle hardware.

AWS launched S3 and EC2 in 2006, turning CAPEX into OPEX. Today >95% of businesses use cloud in some form (Gartner 2024).

## 5 essential characteristics (NIST)
NIST defines cloud with 5 traits that distinguish it from regular hosting:

1. **On-demand self-service** — provision via console/API/CLI without contacting a human.
2. **Broad network access** — reachable from any device over standard protocols.
3. **Resource pooling** — multi-tenant shared physical hardware via virtualization.
4. **Rapid elasticity** — scale up/down quickly, often automatically.
5. **Measured service** — precise metering (CPU-second, GB-month) for transparent billing.

## 3 service models (IaaS / PaaS / SaaS)
The more the provider handles, the less you control:

| Model | You manage | Provider manages | Examples |
|---|---|---|---|
| **IaaS** | OS, runtime, app, data | Hardware, virtualization | EC2, Azure VM |
| **PaaS** | App + data | Everything below | Beanstalk, Heroku, App Engine |
| **SaaS** | Config + your data | Everything else | Gmail, O365, Salesforce |

**Pizza analogy:** IaaS = buy ingredients & cook; PaaS = frozen pizza, just bake; SaaS = order delivery.

## 4 deployment models
- **Public** — shared (AWS, Azure, GCP). Cheapest, fastest scale.
- **Private** — dedicated to one org. Maximum control, common in banking/defense.
- **Hybrid** — mix of public + private, linked via VPN / Direct Connect.
- **Community** — shared by orgs in same regulated industry (e.g., HIPAA-compliant health cloud).

## Case study: Netflix
In 2008 Netflix suffered a 3-day database outage on-prem. They went "all-in" on AWS, closed their last data center in 2016. Today Netflix runs 100,000+ EC2 instances serving 250M+ subscribers, using auto-scaling to handle prime-time peaks 10× larger than 3 AM — impossible with self-owned hardware.

## Benefits vs trade-offs
**Benefits:** lower CAPEX, fast time-to-market, global scale, 99.9-99.999% SLA, built-in backup/encryption/compliance.

**Trade-offs:** bills can shock you if designed wrong; vendor lock-in (DynamoDB, BigQuery); Internet dependency; compliance/data-residency complexity.

## When NOT to use cloud
- Very stable workloads running 24/7 for years → on-prem can be 30-50% cheaper (Dropbox famously reverse-migrated and saved $75M/year).
- Ultra-low latency <1ms (HFT trading).
- Data legally barred from leaving the country.

## Next lesson
Lesson 2 compares the **Big Three** so you can pick the right provider for your project.`,
        code: `# Mô phỏng mô hình "pay-as-you-go" của Cloud
def calculate_cloud_cost(hours_used: float, instance_type: str = "t3.micro") -> float:
    pricing = {
        "t3.micro":  0.0104,   # USD/hour
        "t3.small":  0.0208,
        "t3.medium": 0.0416,
        "m5.large":  0.096,
    }
    rate = pricing.get(instance_type, 0.05)
    return round(hours_used * rate, 4)

# Ví dụ: chạy 1 web server t3.small trong 720 giờ (1 tháng)
monthly = calculate_cloud_cost(720, "t3.small")
print(f"Chi phí 1 tháng: \${monthly} USD")

# So sánh on-premise (mua server vật lý)
on_prem_capex = 5000  # USD đầu tư ban đầu
months_to_breakeven = on_prem_capex / monthly
print(f"On-prem hòa vốn sau: {months_to_breakeven:.1f} tháng")`,
        codeLanguage: "python",
        exercise: "Tính chi phí khi chạy 3 instance m5.large trong 24 giờ. So sánh với việc chạy 10 instance t3.micro cùng thời gian.",
        exerciseEn: "Calculate the cost of running 3 m5.large instances for 24 hours. Compare with 10 t3.micro instances for the same time.",
        quiz: [
          { question: "In which model does the CUSTOMER manage the OS?", options: ["SaaS", "PaaS", "IaaS", "FaaS"], answer: 2, explanation: "IaaS — the customer manages OS, runtime, and app. The provider handles hardware and virtualization only." },
          { question: "What does 'Rapid elasticity' mean?", options: ["Fast access", "Quickly scale up/down on demand", "Pay-as-you-go billing", "High security"], answer: 1, explanation: "Rapid elasticity is the ability to automatically scale resources up or down to meet changing demand." },
          { question: "Gmail belongs to which service model?", options: ["IaaS", "PaaS", "SaaS", "DaaS"], answer: 2, explanation: "Gmail is SaaS — ready-to-use software where users don't manage infrastructure or runtime." },
          { question: "How does Public Cloud differ from Private Cloud?", options: ["Public is cheaper", "Public shares infrastructure across multiple customers", "Public is insecure", "No difference"], answer: 1, explanation: "Public Cloud shares infrastructure (multi-tenant) across many customers; Private Cloud is dedicated to a single organization." },
          { question: "Which is NOT a benefit of cloud computing?", options: ["Lower CAPEX", "Global scale", "Completely eliminates security risk", "Pay-as-you-go pricing"], answer: 2, explanation: "Cloud does not eliminate security risk — it follows the Shared Responsibility Model: provider secures the infrastructure, customer secures data & configuration." },
        ],
      },
      {
        id: "cloud-fund-2",
        title: "Big Three: AWS vs Azure vs GCP",
        titleEn: "Big Three: AWS vs Azure vs GCP",
        level: 1,
        difficulty: "beginner",
        theory: `**Ba ông lớn (Big Three)** chiếm hơn 65% thị phần Cloud toàn cầu. Hiểu sự khác biệt giúp bạn chọn đúng nhà cung cấp cho startup, doanh nghiệp, hoặc dự án ML cụ thể — và tránh "vendor lock-in" bất ngờ.

## Toàn cảnh thị trường (Synergy Research 2024)
- **AWS** ~32% — số 1 từ 2006, lead về innovation và service breadth.
- **Microsoft Azure** ~23% — tăng nhanh nhờ Office 365 + AI (OpenAI partnership).
- **Google Cloud (GCP)** ~11% — mạnh về data/AI/Kubernetes, đang tăng trưởng nhanh nhất.
- Còn lại (~34%): Alibaba, IBM, Oracle, Tencent, DigitalOcean…

## 1. AWS — vua của breadth & maturity
- Ra đời 2006 với S3 và EC2, đi trước 4-5 năm.
- **200+ dịch vụ** trong mọi domain: compute, storage, DB, AI/ML, IoT, satellite, robotics.
- Cộng đồng lớn nhất: tài liệu, Stack Overflow answers, certified engineers.
- **Mạnh nhất ở:** EC2, S3, Lambda, DynamoDB.
- **Yếu ở:** UX console phức tạp, naming khó hiểu (Cognito, Athena…).
- **Khách hàng tiêu biểu:** Netflix, Airbnb, Lyft, NASA, Samsung.

## 2. Microsoft Azure — vua của enterprise hybrid
- Tận dụng quan hệ doanh nghiệp 30 năm của Microsoft.
- **Tích hợp sâu:** Active Directory, Office 365, Windows Server, Teams, SQL Server.
- **Mạnh nhất ở:** Azure AD, Azure DevOps, Power BI, Azure OpenAI Service (độc quyền hosted GPT-4).
- **Hybrid cloud số 1:** Azure Arc, Azure Stack — chạy Azure trên on-prem.
- **Khách hàng tiêu biểu:** Walmart, BMW, FedEx, Coca-Cola, hầu hết ngân hàng & chính phủ.

## 3. Google Cloud (GCP) — vua của data & AI
- Hạ tầng từ Google Search/YouTube — mạng global cực nhanh (private fiber).
- **Mạnh nhất ở:** BigQuery, Vertex AI, GKE (Google phát minh K8s).
- UX/console sạch và dev-friendly nhất.
- **Yếu ở:** ít service hơn AWS/Azure, support enterprise yếu hơn.
- **Khách hàng tiêu biểu:** Spotify, PayPal, HSBC, Snapchat.

## Bảng so sánh dịch vụ tương đương
| Loại | AWS | Azure | GCP |
|------|-----|-------|-----|
| VM | EC2 | Virtual Machines | Compute Engine |
| Object Storage | S3 | Blob Storage | Cloud Storage |
| Managed SQL | RDS | SQL Database | Cloud SQL |
| NoSQL | DynamoDB | Cosmos DB | Firestore / Bigtable |
| Serverless FaaS | Lambda | Functions | Cloud Functions |
| Kubernetes | EKS | AKS | GKE |
| Data Warehouse | Redshift | Synapse | BigQuery |
| ML Platform | SageMaker | Azure ML | Vertex AI |
| CDN | CloudFront | Front Door | Cloud CDN |

## Trade-offs khi chọn provider
| Tiêu chí | AWS | Azure | GCP |
|---|---|---|---|
| Breadth of services | ★★★★★ | ★★★★ | ★★★ |
| Enterprise sales/support | ★★★★ | ★★★★★ | ★★★ |
| Data & AI/ML | ★★★★ | ★★★★ | ★★★★★ |
| Documentation | ★★★★★ | ★★★★ | ★★★★ |
| Pricing transparency | ★★★ | ★★★ | ★★★★ |
| Hybrid cloud | ★★★ | ★★★★★ | ★★★ |

## Case study: Spotify chọn GCP
Năm 2016 Spotify migrate từ on-prem sang GCP (không chọn AWS dù lớn hơn) vì BigQuery cho phép query 100TB data trong vài giây — phân tích hành vi nghe nhạc realtime; Pub/Sub + Dataflow đơn giản hơn Kinesis.

## Case study: Coca-Cola chọn Azure
700,000 nhân viên đã dùng Office 365 + Active Directory toàn cầu → Azure tích hợp SSO ngay, không cần build lại identity.

## Best practices khi chọn cloud
1. **Bắt đầu từ skill team:** Windows/.NET → Azure; Linux/Python → AWS/GCP.
2. **Region & latency:** chọn nhà cung cấp có data center gần khách hàng cuối.
3. **Pricing cho workload cụ thể:** chạy POC tính bill thực tế, đừng tin pricing calculator 100%.
4. **Compliance:** kiểm tra certification (HIPAA, PCI-DSS, SOC2) tại region bạn dùng.
5. **Exit strategy:** dùng abstraction (Terraform, K8s) để có thể migrate sau này.

## Anti-patterns
- ❌ Chọn cloud chỉ vì "AWS lớn nhất" mà không đánh giá use case.
- ❌ Lock-in vào dịch vụ độc quyền (DynamoDB, BigQuery) cho dự án ngắn hạn.
- ❌ Multi-cloud "cho vui" → tăng độ phức tạp 3x mà không có lợi ích thật.

## Liên hệ bài tiếp theo
Bài 3 sẽ giải thích **Region, AZ, Edge Location** — kiến trúc vật lý phía dưới mọi cloud.`,
        theoryEn: `**The Big Three** dominate 65%+ of the global cloud market. Knowing the differences helps you pick the right provider — and avoid surprise vendor lock-in.

## Market overview (Synergy Research 2024)
- **AWS** ~32% — #1 since 2006.
- **Azure** ~23% — fastest enterprise growth via Office 365 + OpenAI.
- **GCP** ~11% — strong in data/AI/Kubernetes.

## 1. AWS — king of breadth
Born 2006, 4-5 year head start. **200+ services**. Largest community. **Strongest in:** EC2, S3, Lambda, DynamoDB. **Customers:** Netflix, Airbnb, NASA.

## 2. Azure — king of enterprise hybrid
Leverages Microsoft's 30-year enterprise relationships. **Deep integration** with AD, Office 365, Windows Server. **Strongest in:** Azure AD, Azure DevOps, Azure OpenAI. **Customers:** Walmart, BMW, FedEx.

## 3. GCP — king of data & AI
Built on Google Search/YouTube infrastructure. **Strongest in:** BigQuery, Vertex AI, GKE. Cleanest UX. **Customers:** Spotify, PayPal, Snapchat.

## Service equivalence
| Type | AWS | Azure | GCP |
|------|-----|-------|-----|
| VM | EC2 | VMs | Compute Engine |
| Object Storage | S3 | Blob | Cloud Storage |
| SQL | RDS | SQL DB | Cloud SQL |
| NoSQL | DynamoDB | Cosmos DB | Firestore |
| FaaS | Lambda | Functions | Cloud Functions |
| K8s | EKS | AKS | GKE |
| DW | Redshift | Synapse | BigQuery |
| ML | SageMaker | Azure ML | Vertex AI |

## Provider trade-offs
| Criterion | AWS | Azure | GCP |
|---|---|---|---|
| Breadth | ★★★★★ | ★★★★ | ★★★ |
| Enterprise support | ★★★★ | ★★★★★ | ★★★ |
| Data & AI/ML | ★★★★ | ★★★★ | ★★★★★ |
| Hybrid | ★★★ | ★★★★★ | ★★★ |

## Case: Spotify picked GCP (2016)
BigQuery let them query 100TB in seconds for real-time listener analytics; Pub/Sub + Dataflow simpler than AWS Kinesis.

## Case: Coca-Cola picked Azure
700K employees already on Office 365 + AD → Azure SSO worked instantly.

## Best practices
1. Start from team skills (Windows/.NET → Azure; Linux/Python → AWS/GCP).
2. Choose by region/latency proximity to end users.
3. Run a real POC — don't trust pricing calculators 100%.
4. Verify compliance certs for your region.
5. Use abstractions (Terraform, K8s) to keep an exit option.

## Anti-patterns
- ❌ Picking AWS just because it's "biggest".
- ❌ Locking into proprietary services for short-term projects.
- ❌ Multi-cloud "for fun" — 3× complexity, no real benefit.

## Next lesson
Lesson 3 covers **Regions, AZs, Edge Locations** — the physical layer beneath every cloud.`,
        code: `# Bảng tra cứu dịch vụ tương đương 3 nhà cung cấp
service_map = {
    "virtual_machine": {"aws": "EC2",      "azure": "Virtual Machines", "gcp": "Compute Engine"},
    "object_storage":  {"aws": "S3",       "azure": "Blob Storage",     "gcp": "Cloud Storage"},
    "managed_sql":     {"aws": "RDS",      "azure": "SQL Database",     "gcp": "Cloud SQL"},
    "serverless_fn":   {"aws": "Lambda",   "azure": "Functions",        "gcp": "Cloud Functions"},
    "kubernetes":      {"aws": "EKS",      "azure": "AKS",              "gcp": "GKE"},
    "data_warehouse":  {"aws": "Redshift", "azure": "Synapse",          "gcp": "BigQuery"},
}

def find_equivalent(service: str, from_provider: str, to_provider: str) -> str:
    for category, providers in service_map.items():
        if providers.get(from_provider, "").lower() == service.lower():
            return providers.get(to_provider, "N/A")
    return "Not found"

print(find_equivalent("S3", "aws", "gcp"))         # Cloud Storage
print(find_equivalent("BigQuery", "gcp", "azure")) # Synapse`,
        codeLanguage: "python",
        exercise: "Bạn đang dùng AWS Lambda + S3 + RDS. Liệt kê dịch vụ tương đương trên Azure và GCP để tạo bảng so sánh migration.",
        exerciseEn: "You use AWS Lambda + S3 + RDS. List equivalent services on Azure and GCP for a migration comparison.",
        quiz: [
          { question: "What is the GCP equivalent of AWS S3?", options: ["Blob Storage", "Cloud Storage", "Cloud SQL", "BigQuery"], answer: 1, explanation: "GCP Cloud Storage is the object storage equivalent of AWS S3 and Azure Blob Storage." },
          { question: "Which provider is well-known for Data Analytics with BigQuery?", options: ["AWS", "Azure", "GCP", "IBM"], answer: 2, explanation: "GCP is famous for BigQuery — a blazing-fast serverless data warehouse." },
          { question: "What is AKS?", options: ["AWS Kubernetes service", "Azure Kubernetes service", "GCP Kubernetes service", "A framework name"], answer: 1, explanation: "AKS = Azure Kubernetes Service. Equivalent to EKS (AWS) and GKE (GCP)." },
          { question: "Where does Azure shine the most?", options: ["Pure AI", "Microsoft enterprise integration", "Gaming", "Personal IoT"], answer: 1, explanation: "Azure integrates deeply with the Microsoft ecosystem (Windows Server, Active Directory, Office 365) — a major enterprise advantage." },
          { question: "AWS Lambda is what type of service?", options: ["IaaS", "PaaS", "Serverless / FaaS", "SaaS"], answer: 2, explanation: "AWS Lambda is Function-as-a-Service (FaaS) — a form of serverless computing." },
        ],
      },
      {
        id: "cloud-fund-3",
        title: "Region, AZ và Edge Location",
        titleEn: "Regions, AZs, and Edge Locations",
        level: 2,
        difficulty: "beginner",
        theory: `**Hạ tầng vật lý của Cloud** được tổ chức theo 3 cấp lồng nhau: Region → AZ → Edge Location. Hiểu rõ giúp bạn thiết kế hệ thống chịu lỗi (fault-tolerant), tuân thủ luật dữ liệu, và tối ưu latency cho người dùng.

## Vì sao cần biết kiến trúc vật lý?
Năm 2017, AWS us-east-1 (Virginia) sập 5 giờ vì 1 typo trong lệnh debug — Slack, Trello, Quora, Medium đều offline. Lý do? Tất cả đều chạy single-region. Sau sự cố này "Multi-AZ" trở thành tiêu chuẩn vàng, và các hệ thống critical bắt đầu Multi-Region.

## 1. Region (Khu vực)
Một vùng địa lý chứa nhiều data center liên kết bằng mạng tốc độ cao. Mỗi region có **mã định danh** riêng:
- AWS: \`us-east-1\` (Virginia), \`ap-southeast-1\` (Singapore), \`eu-west-1\` (Ireland)
- Azure: \`East US\`, \`Southeast Asia\`, \`West Europe\`
- GCP: \`us-central1\`, \`asia-southeast1\`, \`europe-west1\`

**Số lượng region (2024):** AWS ~33, Azure ~60, GCP ~40.

**Chọn region dựa trên:**
1. **Khoảng cách tới user** → giảm latency (mỗi 1000km ≈ 10ms RTT thêm vào)
2. **Luật dữ liệu** — GDPR yêu cầu data EU không rời EU; Trung Quốc, Nga, Việt Nam có luật data residency riêng
3. **Giá** — us-east-1 thường rẻ nhất AWS; Sao Paulo đắt gấp 1.5x
4. **Service availability** — service mới thường ra mắt us-east-1 trước, region khác chậm 6-18 tháng
5. **Carbon footprint** — vài region chạy 100% renewable energy (eu-north-1 Stockholm)

## 2. Availability Zone (AZ)
**1 hoặc nhiều data center** trong cùng region, **vật lý cách ly**: nguồn điện riêng, máy phát dự phòng, hệ thống làm mát riêng, đường mạng riêng. AZ cách nhau ~10-100 km — đủ xa để 1 thảm họa (cháy, lụt, mất điện) không ảnh hưởng AZ khác, đủ gần để mạng nội bộ <2ms latency.

**Mỗi region thường có 3 AZ trở lên.** Ký hiệu: \`us-east-1a\`, \`us-east-1b\`, \`us-east-1c\`.

**Lưu ý cực quan trọng:** AZ \`us-east-1a\` của tài khoản A có thể là AZ vật lý khác với \`us-east-1a\` của tài khoản B! AWS shuffle AZ name để tránh "tất cả khách hàng đổ vào us-east-1a".

## 3. Edge Location
**Điểm hiện diện (PoP)** cho CDN — chỉ cache nội dung tĩnh, không phải data center đầy đủ.
- AWS CloudFront có **600+ edge** ở 90+ thành phố
- Azure Front Door, Cloudflare, Akamai cũng có hạ tầng tương tự
- Edge **không** chạy app code thông thường (trừ Lambda@Edge, Cloudflare Workers)

## So sánh 3 cấp
| Cấp | Quy mô | Chức năng chính | Khoảng cách | Latency tới user |
|---|---|---|---|---|
| Region | Vùng địa lý | Toàn bộ services | 1000s km | 50-200ms |
| AZ | Cụm data center | Compute/DB chịu lỗi | 10-100 km | <2ms (nội bộ) |
| Edge | PoP nhỏ | Cache CDN | 50-500 km | 5-50ms |

## Tính SLA & xác suất downtime
- 1 AZ uptime ~99.95% → downtime ~4.4 giờ/năm
- 3 AZ độc lập → uptime ~99.9999998% → downtime ~63 ms/năm (lý thuyết)
- Multi-Region (active-active) → gần 99.999% (the Five Nines), downtime <5 phút/năm

## Case study: Slack outage 2017
Slack chạy 100% trên us-east-1 đơn (single-region). Khi AWS S3 us-east-1 sập 5 giờ, Slack offline toàn cầu. Sau đó họ đầu tư multi-region active-passive với DynamoDB Global Tables.

## Case study: Netflix Chaos Engineering
Netflix tạo công cụ "Chaos Monkey" tự ngẫu nhiên kill EC2 trong production để **buộc** team phải thiết kế Multi-AZ. Sau đó "Chaos Kong" ngẫu nhiên kill cả region để test Multi-Region.

## Best practices HA design
1. **Mặc định Multi-AZ** cho mọi production workload (RDS, EC2 ASG, ElastiCache đều support)
2. **Đừng hardcode AZ name** trong code — để autoscaling tự phân phối
3. **Multi-Region cho hệ thống critical** (financial, healthcare) — chấp nhận chi phí 1.8-2.5x
4. **CloudFront / CDN** đặt ở Edge gần user → giảm bandwidth + latency
5. **Backup chéo region** — backup us-east-1 sang us-west-2 để chống region failure
6. **Test failover hàng quý** — chuẩn bị runbook và practice (Game Day)

## Anti-patterns
- ❌ Single-AZ DB cho production
- ❌ Multi-Region nhưng dữ liệu chỉ ở 1 region (replica chưa promote được)
- ❌ Hardcode \`us-east-1\` trong source code → khó migrate
- ❌ Edge Location dùng cho dynamic API (sai use case, nên dùng Lambda@Edge nếu cần)

## Liên hệ bài tiếp theo
Module tiếp theo bắt đầu **Compute & Storage** — làm quen với EC2 (VM), S3 (object storage), và container Docker.`,
        theoryEn: `**Cloud physical infrastructure** has 3 nested tiers: Region → AZ → Edge. Knowing this lets you design fault-tolerant systems, comply with data laws, and optimize user latency.

## Why it matters
In 2017, AWS us-east-1 went down for 5 hours due to a debug typo — Slack, Trello, Quora, Medium all offline. They all ran single-region. After that, "Multi-AZ" became the gold standard and critical systems went Multi-Region.

## 1. Region
Geographic area with multiple linked data centers. Each has a code: \`us-east-1\`, \`ap-southeast-1\`, \`eu-west-1\`.

**Counts (2024):** AWS ~33, Azure ~60, GCP ~40.

**Choose a region by:**
1. Distance to users (every 1000 km ≈ +10ms RTT)
2. Data residency laws (GDPR, China, Russia)
3. Pricing (us-east-1 is cheapest AWS; São Paulo 1.5× more)
4. Service availability (new services launch in us-east-1 first)
5. Carbon footprint (eu-north-1 = 100% renewable)

## 2. Availability Zone (AZ)
**One or more data centers** in the same region with isolated power, cooling, networking. AZs are 10-100 km apart — far enough to survive disasters, close enough for <2ms internal latency. Most regions have 3+ AZs.

**Important:** AZ \`us-east-1a\` of account A may be a different physical AZ than account B's "1a" — AWS shuffles names to balance load.

## 3. Edge Location
**CDN PoPs** that cache static content — not full data centers. CloudFront has 600+ edges in 90+ cities. Edges don't run app code (except Lambda@Edge / Cloudflare Workers).

## Comparison
| Tier | Scale | Function | Distance | Latency |
|---|---|---|---|---|
| Region | Geographic | All services | 1000s km | 50-200ms |
| AZ | Data center cluster | Fault-tolerant compute/DB | 10-100 km | <2ms internal |
| Edge | Small PoP | CDN cache | 50-500 km | 5-50ms |

## SLA math
- 1 AZ ~99.95% → ~4.4 hr downtime/year
- 3 independent AZs → ~99.9999998% → ~63 ms/year (theory)
- Multi-Region active-active → ~99.999% → <5 min/year

## Case: Slack 2017 outage
Slack ran 100% in us-east-1. When S3 us-east-1 went down for 5 hours, Slack went global-offline. They invested in multi-region active-passive with DynamoDB Global Tables afterward.

## Case: Netflix Chaos Engineering
Netflix built "Chaos Monkey" to randomly kill EC2 instances in production — forcing engineers to design Multi-AZ. Later "Chaos Kong" randomly kills entire regions.

## Best practices
1. Default to Multi-AZ for every production workload.
2. Never hardcode an AZ name.
3. Multi-Region for critical (financial, healthcare); accept 1.8-2.5× cost.
4. Use CloudFront/CDN at edges close to users.
5. Cross-region backups (us-east-1 → us-west-2).
6. Run quarterly failover drills (Game Day).

## Anti-patterns
- ❌ Single-AZ DB in production
- ❌ Multi-Region but data isn't actually replicated
- ❌ Hardcoding \`us-east-1\` in source
- ❌ Using Edge for dynamic APIs

## Next lesson
Next module starts **Compute & Storage** — meet EC2 (VM), S3 (object storage), and Docker containers.`,
        code: `# Mô phỏng triển khai Multi-AZ vs Single-AZ
class CloudDeployment:
    def __init__(self, name: str, azs: list[str]):
        self.name = name
        self.azs = azs

    def availability(self) -> float:
        # Mỗi AZ có uptime ~99.95%; xác suất TẤT CẢ cùng sập = (1-0.9995)^n
        single_uptime = 0.9995
        all_down = (1 - single_uptime) ** len(self.azs)
        return round((1 - all_down) * 100, 5)

single_az = CloudDeployment("Web app A", ["us-east-1a"])
multi_az  = CloudDeployment("Web app B", ["us-east-1a", "us-east-1b", "us-east-1c"])

print(f"{single_az.name}: {single_az.availability()}%")  # 99.95
print(f"{multi_az.name}:  {multi_az.availability()}%")   # 99.99999...`,
        codeLanguage: "python",
        exercise: "Một ứng dụng SaaS toàn cầu cần SLA 99.99% và phục vụ user tại Mỹ + Châu Âu + Châu Á. Hãy đề xuất chiến lược Region + AZ + Edge Location.",
        exerciseEn: "A global SaaS app needs 99.99% SLA and serves users in US + EU + Asia. Propose a Region + AZ + Edge Location strategy.",
        quiz: [
          { question: "What is an AZ?", options: ["A region", "An isolated data center inside a region", "A CDN node", "A physical server"], answer: 1, explanation: "An AZ (Availability Zone) is one or more isolated data centers (independent power, network, cooling) within a single region." },
          { question: "To survive a data center failure, you should?", options: ["Use one large AZ", "Deploy across Multi-AZ", "Use on-premise", "Add more RAM"], answer: 1, explanation: "Multi-AZ deployment keeps the application running when one AZ fails." },
          { question: "Edge Locations are used for?", options: ["Storing the main database", "Caching content close to users (CDN)", "Backing up an AZ", "Running VMs"], answer: 1, explanation: "Edge Locations are CDN PoPs that cache static content near end-users to reduce latency." },
          { question: "Where is the us-east-1 region located?", options: ["California", "Virginia (USA)", "Singapore", "Ireland"], answer: 1, explanation: "us-east-1 is the first AWS region, located in N. Virginia, USA." },
          { question: "Most COMMON reason for choosing a region?", options: ["Nice logo color", "Low cost + low latency + legal compliance", "Fewer AZs", "Memorable name"], answer: 1, explanation: "Pick a region based on user proximity (latency), pricing, and data residency law (GDPR)." },
        ],
      },
    ],
  },

  // ============ MODULE 2: Compute & Storage ============
  {
    id: "cloud-compute-storage",
    title: "Compute & Storage",
    titleEn: "Compute & Storage",
    icon: "💾",
    color: "from-cyan-500 to-blue-600",
    description: "VM, container, serverless và các loại storage (block, object, file)",
    descriptionEn: "VMs, containers, serverless and storage types (block, object, file)",
    course: "cloud",
    lessons: [
      {
        id: "cloud-compute-1",
        title: "Virtual Machines (EC2/VM)",
        titleEn: "Virtual Machines (EC2/VM)",
        level: 2,
        difficulty: "beginner",
        theory: `**Virtual Machine (VM)** là máy ảo chạy trên hạ tầng vật lý dùng chung qua hypervisor. Đây là dịch vụ **IaaS** cốt lõi và là khối xây dựng đầu tiên hầu hết engineer chạm tới khi vào cloud.

## Vì sao bắt đầu từ VM?
VM là cách "đơn giản nhất" để mang ứng dụng lên cloud — chỉ cần một server Linux/Windows tương tự on-prem. Không cần học container, serverless, hay refactor code. Đây là bước migration "lift-and-shift" phổ biến nhất.

## VM hoạt động ra sao?
Một server vật lý (bare metal) có thể chứa hàng chục VM nhờ **hypervisor** (Xen, KVM, AWS Nitro):
- Hypervisor chia CPU, RAM, network ảo cho từng VM
- Mỗi VM tin rằng mình là máy thật (có "kernel" riêng, OS riêng)
- Cô lập (isolation) giữa các VM cùng máy → khách hàng A không nhìn thấy data của khách hàng B

AWS Nitro System (2017) là cải tiến lớn: chuyển virtualization xuống chip riêng → VM gần như hiệu năng bare metal.

## Các thành phần chính của EC2
- **AMI** (Amazon Machine Image): template chứa OS + phần mềm. Có public AMI (Amazon Linux 2, Ubuntu), Marketplace AMI (Bitnami, có phí), Custom AMI (chính bạn build).
- **Instance Type**: cấu hình CPU/RAM. Họ chính:
  - **t** (burstable, rẻ): t3.micro, t3.small — dev/test, web nhỏ, có "CPU credits" giới hạn
  - **m** (general purpose): m5.large — cân bằng compute/memory, web app điển hình
  - **c** (compute optimized): c5.xlarge — game server, batch processing, video encoding
  - **r** (memory optimized): r5.xlarge — Redis cache, in-memory DB
  - **i** (storage optimized): i3.large — NoSQL, search engine cần SSD nhanh
  - **g/p** (GPU): training ML (p4d, g5), render
  - **mac/metal**: Mac mini cho iOS build, bare metal cho VMware
- **EBS Volume**: ổ đĩa gắn vào VM (block storage), persistent
- **Instance Store**: SSD nội bộ trên host → cực nhanh nhưng **mất data khi stop**
- **Security Group**: firewall ảo (stateful)
- **Key Pair**: SSH key (Linux) hoặc password retrieval (Windows)
- **User Data**: bash script chạy lúc boot — bootstrap config

## Mô hình pricing (xem chi tiết bài "Cloud Pricing")
| Model | Discount | Cam kết | Use case |
|---|---|---|---|
| On-Demand | 0% | Không | Dev/test, spike traffic |
| Reserved (1-3yr) | 30-72% | 1-3 năm | Workload ổn định 24/7 |
| Savings Plan | 30-66% | Cam kết \\\\$/giờ | Mix EC2/Fargate/Lambda |
| Spot | 70-90% | Có thể bị thu hồi 2 phút | Batch, ML training, CI |
| Dedicated Host | Cao nhất | Riêng máy vật lý | License Oracle/Windows BYOL |

## Auto Scaling Group (ASG)
Tự động thêm/bớt instance dựa trên:
- **Target tracking** — giữ CPU ~50%
- **Step scaling** — thêm 2 instance nếu CPU >70% trong 5 phút
- **Scheduled scaling** — scale up 8AM, scale down 8PM
- **Predictive scaling** — ML dự đoán traffic (AWS Auto Scaling)

ASG luôn đi cùng **Load Balancer (ALB/NLB)** để phân phối traffic.

## Case study: Airbnb — 5000+ EC2
Airbnb dùng mix m5/c5 cho web tier, r5 cho cache, p3 cho ML model search. Auto-scaling theo lịch (mùa hè peak), tiết kiệm ~40% bằng Savings Plan + Spot cho data pipeline.

## Best practices EC2
1. **Right-sizing hàng tháng** — m5.xlarge dùng 30% CPU → đổi m5.large (tiết kiệm 50%)
2. **Dùng Spot cho stateless workload** (web, batch, CI)
3. **Snapshot EBS định kỳ** — DLM (Data Lifecycle Manager) tự động
4. **Security Group nguyên tắc least-privilege** — không mở 0.0.0.0/0 cho SSH
5. **IMDSv2 mandatory** — chống SSRF attack
6. **Termination Protection** cho production instance
7. **Tags chuẩn:** Environment, Owner, CostCenter, Project

## Anti-patterns
- ❌ Chạy 1 EC2 không có ASG cho production (single point of failure)
- ❌ Mở SSH 0.0.0.0/0 → bị brute-force trong vài giờ
- ❌ Dùng Spot cho database stateful → mất data
- ❌ AMI tự build không cập nhật patch → lỗ hổng security
- ❌ Quên tắt EC2 dev sau giờ làm → bill ngầm

## Khi nào KHÔNG dùng VM?
- Workload rất ngắn (vài giây/request) → Lambda rẻ hơn 10-100x
- App đã container-ize → ECS/EKS quản lý dễ hơn
- Static website → S3 + CloudFront 0 server, 0 maintenance

## Liên hệ bài tiếp theo
Bài Storage tiếp theo sẽ giới thiệu **S3 Object Storage** — bộ nhớ "vô tận" giá rẻ, complement cho EC2.`,
        theoryEn: `**Virtual Machine (VM)** runs on shared physical hardware via a hypervisor. Core IaaS service and the first building block most engineers touch in cloud.

## Why start with VMs?
VMs are the simplest way to bring an app to cloud — just like an on-prem Linux/Windows server. No container/serverless rewrite needed. This is the classic "lift-and-shift" path.

## How VMs work
A bare-metal server runs many VMs via a **hypervisor** (Xen, KVM, AWS Nitro). Hypervisor splits CPU/RAM/network. Each VM has its own kernel and OS, fully isolated from neighbors. **AWS Nitro (2017)** offloads virtualization to dedicated chips → near bare-metal performance.

## EC2 components
- **AMI**: OS + software template (public, Marketplace, custom)
- **Instance Type families:**
  - **t** (burstable): dev/test with CPU credits
  - **m** (general): typical web apps
  - **c** (compute): game server, batch, video encoding
  - **r** (memory): Redis, in-memory DB
  - **i** (storage): NoSQL, search engines
  - **g/p** (GPU): ML training, render
  - **mac/metal**: iOS build, VMware
- **EBS Volume** (persistent block storage)
- **Instance Store** (fast local SSD, lost on stop)
- **Security Group** (stateful firewall)
- **Key Pair** (SSH)
- **User Data** (boot script)

## Pricing models
| Model | Discount | Commit | Use case |
|---|---|---|---|
| On-Demand | 0% | None | Dev/test, spikes |
| Reserved | 30-72% | 1-3 yr | Stable 24/7 |
| Savings Plan | 30-66% | \\\\$/hr | Mixed EC2/Fargate/Lambda |
| Spot | 70-90% | Reclaimable in 2 min | Batch, ML, CI |
| Dedicated Host | Highest | Physical machine | Oracle/Windows BYOL |

## Auto Scaling Group (ASG)
Adds/removes instances by target tracking (keep CPU ~50%), step scaling, scheduled (8AM up, 8PM down), or predictive (ML-based). Always paired with a Load Balancer.

## Case: Airbnb — 5000+ EC2
Mix of m5/c5 web tier, r5 cache, p3 ML search. Schedule-based scaling for summer peaks. ~40% savings via Savings Plans + Spot for pipelines.

## Best practices
1. Monthly right-sizing (50% CPU? downsize)
2. Spot for stateless workloads
3. Periodic EBS snapshots (DLM)
4. Least-privilege Security Groups (no 0.0.0.0/0 SSH)
5. Mandatory IMDSv2 (anti-SSRF)
6. Termination Protection in prod
7. Standard tags: Env, Owner, CostCenter, Project

## Anti-patterns
- ❌ Single EC2 in prod (no ASG)
- ❌ SSH open to 0.0.0.0/0
- ❌ Spot for stateful DBs
- ❌ Stale unpatched AMIs
- ❌ Forgetting to stop dev EC2 after hours

## When NOT to use VMs
- Sub-second workloads → Lambda is 10-100× cheaper
- Already containerized → ECS/EKS easier
- Static site → S3 + CloudFront, zero servers

## Next lesson
Storage lesson covers **S3 Object Storage** — "infinite", cheap storage that complements EC2.`,
        code: `# Khởi tạo EC2 instance với boto3 (AWS SDK for Python)
import boto3

ec2 = boto3.resource("ec2", region_name="us-east-1")

instance = ec2.create_instances(
    ImageId="ami-0c55b159cbfafe1f0",   # Amazon Linux 2 AMI
    InstanceType="t3.micro",
    MinCount=1,
    MaxCount=1,
    KeyName="my-keypair",
    SecurityGroupIds=["sg-0123456789abcdef0"],
    TagSpecifications=[{
        "ResourceType": "instance",
        "Tags": [{"Key": "Name", "Value": "web-server-prod"}],
    }],
)
print(f"Started instance: {instance[0].id}")

# Ước tính chi phí 1 tháng
hours = 24 * 30
hourly = 0.0104  # t3.micro on-demand
print(f"Monthly cost: \${hours * hourly:.2f}")`,
        codeLanguage: "python",
        exercise: "Một startup chạy web app có ~100 req/s ban ngày, gần 0 req/s ban đêm. Đề xuất loại instance + chiến lược pricing tiết kiệm nhất.",
        exerciseEn: "A startup runs a web app with ~100 req/s during the day and near 0 at night. Propose the best instance type + pricing strategy.",
        quiz: [
          { question: "Which instance type is CHEAPEST but can be reclaimed?", options: ["On-Demand", "Reserved", "Spot", "Dedicated"], answer: 2, explanation: "Spot Instances use spare capacity, up to 90% cheaper, but AWS can reclaim them with a 2-minute warning." },
          { question: "AMI stands for?", options: ["AWS Memory Image", "Amazon Machine Image", "Auto Mount Instance", "App Module Index"], answer: 1, explanation: "AMI = Amazon Machine Image — a template containing OS + software used to launch instances." },
          { question: "The 'r' instance family (e.g. r5.xlarge) is optimized for?", options: ["GPU", "Heavy compute", "Memory (large RAM)", "Network"], answer: 2, explanation: "The 'r' family is memory optimized — ideal for databases, caches, and in-memory analytics." },
          { question: "Auto Scaling Group is used to?", options: ["Add RAM automatically", "Add/remove instances automatically", "Back up data", "Encrypt disks"], answer: 1, explanation: "ASG automatically launches/terminates EC2 instances based on conditions (CPU, request count, schedule)." },
          { question: "To save 30-72% with a 1-3 year commitment, use?", options: ["Spot", "On-Demand", "Reserved Instance", "Free Tier"], answer: 2, explanation: "Reserved Instances commit for 1 or 3 years in exchange for substantial savings vs On-Demand." },
        ],
      },
      {
        id: "cloud-storage-1",
        title: "Object Storage (S3)",
        titleEn: "Object Storage (S3)",
        level: 2,
        difficulty: "beginner",
        theory: `**Object Storage** là kiểu lưu trữ phẳng (flat namespace), khác hoàn toàn với file system truyền thống có folder lồng nhau. Mỗi file là một "object" độc lập có metadata riêng, được truy cập qua HTTP API. Đây là nền tảng của data lake, static website, backup, và CDN trong cloud hiện đại.

## Vì sao cần Object Storage?
Trước cloud, công ty phải mua **NAS/SAN** đắt tiền (vài chục nghìn USD), tự lo RAID, sao lưu, mở rộng. Khi data vượt vài TB, chi phí tăng phi tuyến. Object Storage giải quyết bằng **hạ tầng phân tán** quy mô exabyte, **trả tiền theo GB thực dùng**, durability cực cao và API đơn giản. AWS S3 ra đời 2006 — sản phẩm thương mại đầu tiên của AWS — và đến nay vẫn là chuẩn de-facto.

## Cấu trúc một Object
Mỗi object gồm 4 phần:
- **Key** — chuỗi tên duy nhất trong bucket, thường giống đường dẫn (\`reports/2026/q1.pdf\`) nhưng thực ra **không có folder** — đó chỉ là tiền tố (prefix).
- **Value** — nội dung nhị phân (0 byte đến 5 TB).
- **Metadata** — \`Content-Type\`, \`Cache-Control\`, custom tag (\`x-amz-meta-author\`).
- **Version ID** — chỉ có khi bật Versioning, giúp khôi phục object đã xóa/ghi đè.

## Đặc tính cốt lõi của S3
- **Durability 99.999999999% (11 nines)** — về mặt thống kê, lưu 10 triệu object thì trung bình **10,000 năm mới mất 1 object**. Đạt được nhờ S3 nhân bản dữ liệu qua tối thiểu 3 AZ.
- **Availability 99.99%** (Standard) — tương đương ~52 phút downtime/năm.
- **Strongly consistent** (từ 2020): write xong là read ngay thấy ngay (trước đó là eventual consistency).
- **Khả năng mở rộng tuyến tính**: 1 bucket có thể chứa hàng tỷ object, throughput tự scale.
- **Truy cập qua REST API** (PUT, GET, DELETE, LIST) — dễ tích hợp mọi ngôn ngữ.

## Storage Classes — chọn đúng tier để tiết kiệm
| Class | Use case | Giá USD/GB/tháng | Min duration | Retrieval |
|-------|----------|------------------|--------------|-----------|
| **Standard** | Truy cập thường xuyên | $0.023 | — | tức thì |
| **Intelligent-Tiering** | Pattern không đoán được | $0.023 + $0.0025 monitor | 30 ngày | tức thì |
| **Standard-IA** | Truy cập <1 lần/tháng | $0.0125 | 30 ngày | tức thì |
| **One Zone-IA** | IA nhưng chỉ 1 AZ (rẻ hơn 20%) | $0.01 | 30 ngày | tức thì |
| **Glacier Instant Retrieval** | Archive cần truy cập tức thì | $0.004 | 90 ngày | tức thì |
| **Glacier Flexible** | Archive (1 phút – 12h) | $0.0036 | 90 ngày | 1 phút – 12h |
| **Glacier Deep Archive** | Lưu trữ lâu dài (>1 năm) | $0.00099 | 180 ngày | 12-48h |

**Bài toán thực tế**: Lưu 1 PB log trong 1 năm.
- Standard: 1,048,576 GB × $0.023 × 12 = **$289,406/năm**
- Glacier Deep Archive: 1,048,576 GB × $0.00099 × 12 = **$12,457/năm** → tiết kiệm **96%**

## Lifecycle Policy — tự động hóa tiết kiệm
Lifecycle là rule JSON gắn vào bucket, tự chuyển object giữa các class theo tuổi:
\`\`\`
0-30 ngày   → Standard       (truy cập nóng)
30-90 ngày  → Standard-IA    (truy cập thưa)
90-365 ngày → Glacier Flexible (archive)
>365 ngày   → Glacier Deep Archive (lưu trữ tuân thủ)
>2555 ngày  → Delete         (sau 7 năm theo SOX)
\`\`\`
**Quan trọng**: lifecycle **chỉ giảm chi phí lưu trữ**, không giảm chi phí lấy ra (retrieval). Nếu workload truy cập ngẫu nhiên, **Intelligent-Tiering** là an toàn hơn — S3 tự đo và chuyển.

## Case study thật: Netflix dùng S3 như "single source of truth"
Netflix lưu **>100 PB** dữ liệu (video master, log analytics, ML feature) trên S3. Họ không tự build storage vì:
- **Chi phí**: nếu tự xây cần >5 data center riêng — tốn hàng trăm triệu USD.
- **Reliability**: S3 đã 17 năm chưa từng mất dữ liệu của Netflix.
- **Tích hợp**: Spark/Athena/Hive đọc trực tiếp từ S3 không cần copy ra HDFS.
- **Lifecycle**: log cũ tự xuống Glacier sau 30 ngày → tiết kiệm hàng triệu USD/năm.

## Case study: Dropbox rời S3 (Project Magic Pocket)
Năm 2016 Dropbox migrate **>500 PB** từ S3 sang hạ tầng tự xây vì khi đạt quy mô siêu lớn, biên lợi nhuận tự build vượt giá thuê S3. Bài học: **dưới ~50 PB hầu như luôn rẻ hơn dùng S3**, chỉ vài hyperscaler mới có lý do tự build.

## So sánh Object vs Block vs File Storage
| Khía cạnh | Object (S3) | Block (EBS) | File (EFS/NFS) |
|-----------|-------------|-------------|----------------|
| Đơn vị | object + metadata | block 4 KB | file + folder |
| API | HTTP REST | iSCSI/NVMe | NFS/SMB |
| Mount như disk? | Không | Có (1 instance) | Có (nhiều instance) |
| Tốc độ random IO | Trung bình | Rất cao | Cao |
| Giá | Rẻ nhất | Đắt nhất | Trung bình |
| Use case | Backup, data lake, web asset | DB, OS disk | Shared workspace, lift-and-shift |

## Best practices
- ✅ **Bật Versioning** + MFA Delete cho bucket quan trọng — chống xóa nhầm/ransomware.
- ✅ **Block Public Access** ở account level — mặc định mọi bucket private.
- ✅ **Server-side encryption** mặc định (SSE-S3 hoặc SSE-KMS).
- ✅ **Lifecycle** ngay từ ngày tạo bucket — tránh "data hoarding" không kiểm soát.
- ✅ **Bucket policy + IAM Role** thay vì access key — và dùng **presigned URL** cho truy cập tạm thời.
- ✅ **CloudFront** trước S3 cho web asset — giảm 80-90% egress cost.
- ✅ **S3 Storage Lens** — dashboard miễn phí phân tích usage và đề xuất tiết kiệm.

## Common pitfalls
- ❌ **Bucket public mà không biết** — top nguyên nhân lộ data (Capital One 2019, ~100M record).
- ❌ **Không bật lifecycle** → 60% bucket >1 năm có data "lạnh" trả giá Standard.
- ❌ **Quá nhiều object nhỏ (KB)** — overhead request lớn hơn data; nên gộp thành Parquet/ORC.
- ❌ **Hot-key prefix** — trước 2018, dùng prefix tăng dần (\`logs/2024/01/01/...\`) gây bottleneck; hiện S3 đã auto-shard nhưng vẫn nên random hash đầu key.
- ❌ **Egress cost bất ngờ** — tải 1 TB từ S3 ra Internet ~$90; dùng CloudFront hoặc S3 Transfer Acceleration để tối ưu.
- ❌ **Glacier retrieval trong giờ cao điểm** — Bulk retrieval rẻ ($0.0025/GB) nhưng mất 5-12h.

## Khi nào KHÔNG nên dùng S3?
- ❌ Cần latency <10 ms cho read/write nhỏ → dùng DynamoDB hoặc ElastiCache.
- ❌ Cần POSIX file system (lock, append) → dùng EFS hoặc FSx.
- ❌ Workload OLTP (database) → dùng RDS/Aurora.

## Liên hệ bài tiếp theo
S3 chỉ là một mảnh trong bộ ba **Compute + Storage + Network**. Bài kế tiếp sẽ học cách chạy workload đóng gói bằng **Container & Kubernetes**, kết hợp với S3 để build microservice scalable.`,
        theoryEn: `**Object Storage** uses a flat namespace where each file is a self-describing object with metadata, accessed via HTTP API — fundamentally different from POSIX file systems. It powers data lakes, static sites, backups, and CDNs in modern cloud architectures.

## Why Object Storage?
Before cloud, companies bought expensive NAS/SAN ($10k+) and managed RAID, backup, scaling. Cost grew non-linearly past a few TB. Object Storage solves this with distributed exabyte-scale infrastructure, pay-per-GB pricing, extreme durability, and a simple API. AWS S3 (2006) was AWS's first commercial product and remains the de-facto standard.

## Anatomy of an Object
- **Key** — unique string in the bucket; looks like a path (\`reports/2026/q1.pdf\`) but there are **no real folders**, only prefixes.
- **Value** — binary payload (0 bytes to 5 TB).
- **Metadata** — \`Content-Type\`, \`Cache-Control\`, custom \`x-amz-meta-*\` tags.
- **Version ID** — only when Versioning is enabled; lets you restore deleted/overwritten objects.

## Core S3 Properties
- **Durability 99.999999999% (11 nines)** — statistically, 10M objects lose 1 object per ~10,000 years. Achieved by replicating across ≥3 AZs.
- **Availability 99.99%** (Standard) — ~52 min downtime/year.
- **Strongly consistent** (since 2020): read-after-write returns the latest version immediately.
- **Linear scalability**: billions of objects per bucket; throughput auto-scales.
- **REST API access**: easy to integrate from any language.

## Storage Classes
| Class | Use case | $/GB/mo | Min | Retrieval |
|-------|----------|---------|-----|-----------|
| Standard | Frequent | $0.023 | — | instant |
| Intelligent-Tiering | Unknown patterns | $0.023 + $0.0025 monitor | 30d | instant |
| Standard-IA | <1×/month | $0.0125 | 30d | instant |
| One Zone-IA | IA in 1 AZ | $0.01 | 30d | instant |
| Glacier Instant | Archive, instant | $0.004 | 90d | instant |
| Glacier Flexible | Archive | $0.0036 | 90d | 1 min – 12h |
| Glacier Deep Archive | Long-term | $0.00099 | 180d | 12-48h |

**Real math:** 1 PB for 1 year on Standard = **$289,406**, on Glacier Deep Archive = **$12,457** (96% savings).

## Lifecycle Policies
JSON rules attached to a bucket auto-transition objects by age. Lifecycle reduces **storage cost only**, not retrieval cost. For unpredictable access, use Intelligent-Tiering — S3 measures and moves automatically.

## Case study: Netflix
Netflix stores **>100 PB** on S3 (video masters, analytics logs, ML features). They don't self-host because: (1) cost — building 5+ DCs is hundreds of millions; (2) reliability — 17 years with no Netflix data lost; (3) integration — Spark/Athena read directly; (4) lifecycle — old logs auto-tier to Glacier saving millions/year.

## Case study: Dropbox left S3
In 2016 Dropbox migrated **>500 PB** off S3 to in-house "Magic Pocket". At extreme scale, self-build margin beats S3 pricing. **Below ~50 PB, S3 is almost always cheaper.**

## Object vs Block vs File
| Aspect | Object (S3) | Block (EBS) | File (EFS) |
|--------|-------------|-------------|------------|
| Unit | object + metadata | 4 KB block | file + folder |
| API | HTTP REST | iSCSI/NVMe | NFS/SMB |
| Mount | No | Yes (1 instance) | Yes (many) |
| Random IO | Medium | Very high | High |
| Price | Cheapest | Most expensive | Medium |
| Use case | Backup, data lake, web | DB, OS disk | Shared workspace |

## Best Practices
- ✅ Versioning + MFA Delete on critical buckets (anti-ransomware).
- ✅ Block Public Access at account level — default private.
- ✅ Default server-side encryption (SSE-S3 or SSE-KMS).
- ✅ Lifecycle from day 1 — avoid uncontrolled data hoarding.
- ✅ Bucket Policy + IAM Role over access keys; use presigned URLs for temp access.
- ✅ CloudFront in front of S3 — cuts 80-90% egress.
- ✅ S3 Storage Lens — free dashboard with savings recommendations.

## Common Pitfalls
- ❌ Accidentally public buckets (Capital One 2019, ~100M records).
- ❌ No lifecycle → 60% of buckets >1 year hold cold data at Standard pricing.
- ❌ Many tiny objects — request overhead exceeds data; consolidate into Parquet/ORC.
- ❌ Hot-key prefix (legacy issue, mostly auto-sharded now); still randomize prefixes for highest TPS.
- ❌ Unexpected egress: 1 TB to Internet costs ~$90; use CloudFront or Transfer Acceleration.
- ❌ Glacier retrieval at peak: Bulk is cheap ($0.0025/GB) but 5-12h.

## When NOT to use S3
- ❌ Latency <10 ms reads/writes → DynamoDB or ElastiCache.
- ❌ POSIX semantics (lock, append) → EFS or FSx.
- ❌ OLTP DB workloads → RDS/Aurora.

## Bridge to Next Lesson
S3 is one piece of Compute + Storage + Network. Next we cover **Containers & Kubernetes** — running packaged workloads at scale, often paired with S3 for storage.`,
        code: `# Upload và quản lý object trên S3 với boto3
import boto3

s3 = boto3.client("s3")

# 1. Upload file
s3.upload_file(
    Filename="report.pdf",
    Bucket="my-app-bucket",
    Key="reports/2026/q1-report.pdf",
    ExtraArgs={
        "ContentType": "application/pdf",
        "Metadata": {"author": "hai-nguyen", "year": "2026"},
    },
)

# 2. Generate presigned URL (cho phép download tạm thời 1h)
url = s3.generate_presigned_url(
    "get_object",
    Params={"Bucket": "my-app-bucket", "Key": "reports/2026/q1-report.pdf"},
    ExpiresIn=3600,
)
print(f"Download link (1h): {url}")

# 3. Lifecycle: chuyển sang Glacier sau 90 ngày
lifecycle = {
    "Rules": [{
        "ID": "archive-old-reports",
        "Filter": {"Prefix": "reports/"},
        "Status": "Enabled",
        "Transitions": [{"Days": 90, "StorageClass": "GLACIER"}],
    }]
}
s3.put_bucket_lifecycle_configuration(Bucket="my-app-bucket", LifecycleConfiguration=lifecycle)`,
        codeLanguage: "python",
        exercise: "Thiết kế lifecycle cho bucket lưu log: 30 ngày đầu Standard, 30-90 ngày Standard-IA, sau 1 năm Glacier Deep Archive, sau 7 năm xóa.",
        exerciseEn: "Design a lifecycle for a log bucket: Standard for 30 days, Standard-IA 30-90, Glacier Deep Archive after 1 year, delete after 7 years.",
        quiz: [
          { question: "What durability does S3 promise?", options: ["99.9%", "99.99%", "99.999999999% (11 nines)", "100%"], answer: 2, explanation: "S3 Standard offers 99.999999999% (11 nines) durability — objects are virtually never lost." },
          { question: "Which class is CHEAPEST for long-term archival?", options: ["Standard", "Standard-IA", "Glacier Instant", "Glacier Deep Archive"], answer: 3, explanation: "Glacier Deep Archive (~$0.00099/GB) is the cheapest, but retrieval takes about 12 hours." },
          { question: "Presigned URLs are used to?", options: ["Secure the bucket", "Grant temporary access to a private object", "Speed up downloads", "Encrypt the file"], answer: 1, explanation: "Presigned URLs grant time-limited access to private objects without sharing AWS credentials." },
          { question: "How does S3 store data?", options: ["Block", "File system", "Objects in a bucket", "Database rows"], answer: 2, explanation: "S3 is object storage — data is stored as objects (key + value + metadata) inside buckets." },
          { question: "Which is NOT something a Lifecycle policy can do?", options: ["Move to IA after 30 days", "Delete after 1 year", "Move to Glacier", "Auto-rename files"], answer: 3, explanation: "Lifecycle policies only transition storage class or delete — they cannot rename/key objects." },
        ],
      },
      {
        id: "cloud-compute-2",
        title: "Containers & Kubernetes (EKS/AKS/GKE)",
        titleEn: "Containers & Kubernetes (EKS/AKS/GKE)",
        level: 3,
        difficulty: "intermediate",
        theory: `**Container** là cách đóng gói ứng dụng cùng toàn bộ phụ thuộc (libraries, runtime, config) thành một image bất biến, chạy giống hệt nhau trên laptop dev, server staging và cluster production. **Docker** là implementation phổ biến nhất; **Kubernetes** là hệ điều hành phân tán quản lý hàng nghìn container ở quy mô production. Bộ đôi này đã thay đổi hoàn toàn cách deploy phần mềm trong 10 năm qua.

## Vì sao Container thay thế VM?
| Khía cạnh | VM | Container |
|-----------|-----|-----------|
| Boot time | 30-120 giây | 0.5-2 giây |
| Kích thước image | 1-10 GB | 50-500 MB |
| Overhead | Toàn bộ Guest OS | Chỉ shared kernel |
| Density/host | 10-30 VM | 100-1000 container |
| Portable | Cần chuẩn (OVF) | Image OCI chạy mọi nơi |
| Use case | Cô lập mạnh, multi-OS | Microservice, CI/CD |

VM ảo hóa **phần cứng** (hypervisor giả lập CPU/RAM/disk); container ảo hóa **OS** (chia sẻ kernel host nhưng cô lập namespace + cgroup). Vì shared kernel, container nhẹ hơn nhưng cô lập yếu hơn — không nên chạy code không tin cậy chung host (dùng gVisor/Kata cho điều đó).

## Bên trong Docker — kiến trúc layered
Một Dockerfile build ra image gồm nhiều **layer** xếp chồng (copy-on-write):
\`\`\`dockerfile
FROM python:3.11-slim          # layer 1: base OS + Python
WORKDIR /app
COPY requirements.txt .         # layer 2: chỉ rebuild khi requirements đổi
RUN pip install -r requirements.txt   # layer 3: cache nếu layer 2 không đổi
COPY . .                        # layer 4: code app, đổi nhiều nhất
CMD ["gunicorn", "-b", "0.0.0.0:8000", "app:app"]
\`\`\`
**Best practice xếp lớp**: đặt thứ ít đổi (deps) lên trên, code app xuống dưới — tận dụng cache, build nhanh.

## Kubernetes — các khái niệm cốt lõi
- **Pod** — đơn vị nhỏ nhất K8s schedule. Một Pod = 1+ container chia sẻ network + storage. Pod ephemeral (chết là tạo mới với IP khác).
- **ReplicaSet** — đảm bảo luôn có N pod chạy.
- **Deployment** — quản lý ReplicaSet + chiến lược rolling update / rollback.
- **Service** — endpoint ổn định (ClusterIP, NodePort, LoadBalancer) định tuyến vào tập pod theo label.
- **Ingress** — route HTTP/HTTPS layer 7 (host/path) vào Service. Dùng nginx-ingress, AWS ALB Ingress Controller, Traefik.
- **ConfigMap / Secret** — tách config & bí mật khỏi image.
- **Namespace** — phân vùng logic (team, env) trong cùng cluster.
- **PersistentVolume + PVC** — abstraction cho storage (EBS, EFS, S3 csi).
- **HPA (Horizontal Pod Autoscaler)** — auto scale pod theo CPU/memory/custom metric.
- **DaemonSet** — chạy 1 pod trên MỌI node (log agent, monitoring agent).
- **StatefulSet** — pod có identity ổn định + storage cá nhân (DB, Kafka).

## Architecture của Kubernetes Cluster
\`\`\`
┌──────────── Control Plane ────────────┐
│ kube-apiserver  (entry point REST)   │
│ etcd            (key-value state DB) │
│ scheduler       (gán pod → node)     │
│ controller-mgr  (reconcile loops)    │
└──────────────────┬─────────────────────┘
                   │
       ┌───────────┴───────────┐
       │                       │
┌──── Node 1 ────┐      ┌──── Node 2 ────┐
│ kubelet        │      │ kubelet        │
│ kube-proxy     │      │ kube-proxy     │
│ container rt   │      │ container rt   │
│ ┌──┐ ┌──┐     │      │ ┌──┐ ┌──┐     │
│ │P1│ │P2│ ... │      │ │P3│ │P4│ ... │
│ └──┘ └──┘     │      │ └──┘ └──┘     │
└────────────────┘      └────────────────┘
\`\`\`
Mọi tương tác qua **kube-apiserver**. State lưu trong **etcd**. Mỗi node có **kubelet** quản pod local, **kube-proxy** routing network.

## Managed Kubernetes — chọn cái nào?
| Service | Provider | Control plane | Worker | Đặc điểm |
|---------|----------|---------------|--------|----------|
| **EKS** | AWS | Managed ($0.10/h) | EC2 hoặc Fargate | Tích hợp IAM, ALB, VPC chuẩn |
| **AKS** | Azure | **Free** | VM hoặc ACI | Tích hợp Entra ID, free SLA 99.95% |
| **GKE** | GCP | Standard $0.10/h, Autopilot $0.10/h+pod | VM hoặc Autopilot | **Autopilot** tự lo node — gần serverless |
| **Self-hosted (kubeadm)** | Bất kỳ | Tự build | Tự build | Rẻ nhưng tốn devops |

**Lời khuyên**: nếu mới bắt đầu, **GKE Autopilot** dễ nhất; team AWS-heavy chọn **EKS + Fargate**; team Microsoft chọn **AKS**.

## Case study: Spotify — chạy hơn 1700 microservice trên K8s
Spotify migrate từ Helios (orchestrator riêng) sang Kubernetes 2018-2020. Họ chạy:
- **150+ cluster GKE** xuyên 4 region.
- **>10,000 node**, **>1.7 triệu pod** đỉnh.
- Backend **Backstage** (open-source developer portal) ra đời từ trải nghiệm này — nay là chuẩn CNCF.
Bài học: K8s cho phép **mỗi team deploy độc lập 100+ lần/ngày** mà không đụng nhau.

## Case study: Airbnb — 1000 service, EKS + service mesh
Airbnb dùng EKS + Envoy/Istio service mesh để xử lý 100k+ RPS giữa các service. Mesh cho mTLS tự động, retry, circuit breaker — tránh viết lại logic này trong từng service. Tradeoff: thêm độ phức tạp ops và 1-2 ms latency mỗi hop.

## Container vs Serverless vs VM — khi nào chọn gì?
| Tình huống | Khuyến nghị |
|------------|-------------|
| Webhook, batch ngắn, ít event | **Lambda/Cloud Functions** |
| Microservice HTTP đều đặn | **Container (ECS/EKS/Cloud Run)** |
| Long-running worker, queue consumer | **Container** |
| DB, cache stateful | **Managed service hoặc StatefulSet** |
| Legacy app cần Windows/full OS | **VM** |
| Workload đều cao 24/7 | **VM với Reserved/Savings Plan** |
| Cần portability multi-cloud | **K8s** (chuẩn hóa) |

## Best Practices
- ✅ **Image nhỏ**: dùng \`-slim\`, \`-alpine\`, multi-stage build → đẩy nhanh deploy & giảm CVE.
- ✅ **Non-root user** trong container.
- ✅ **Health probe**: liveness (kill nếu chết), readiness (chỉ nhận traffic khi sẵn sàng), startup (cho app boot chậm).
- ✅ **Resource request + limit**: tránh "noisy neighbor" và OOMKill bất ngờ.
- ✅ **Pod Disruption Budget** + **anti-affinity** để khả dụng cao.
- ✅ **Network Policy** (Calico/Cilium): mặc định deny all, allow theo nhãn.
- ✅ **GitOps** (ArgoCD/Flux): cluster state = git repo.
- ✅ **Image signing** (cosign) + **scan** (Trivy) trong CI.

## Common Pitfalls
- ❌ Không đặt resource request/limit → 1 pod ngốn RAM kéo cả node sập.
- ❌ Lưu state vào filesystem container (mất khi pod restart) — phải dùng PV/EFS/S3.
- ❌ Latest tag image (\`myapp:latest\`) → không reproducible; luôn pin SHA hoặc semver.
- ❌ 1 pod / 1 node (over-provisioning) → mất lợi thế bin-packing K8s.
- ❌ Quên log → stdout (K8s thu thập tự động); log vào file trong container sẽ mất.
- ❌ Cluster admin role rộng cho mọi developer — tuân thủ RBAC least privilege.
- ❌ Bật autoscaling mà không có **PodDisruptionBudget** → scale down giết hết replica.

## Khi KHÔNG nên dùng K8s
- ❌ Team <5 dev, <10 service → ECS/Cloud Run/Heroku đủ.
- ❌ Không có người chuyên ops K8s — chi phí học khoảng 6-12 tháng.
- ❌ Workload thuần event-driven → Lambda đơn giản hơn nhiều.

## Liên hệ bài tiếp theo
Container chạy bên trong **VPC** — mạng ảo riêng có subnet, route, firewall. Bài tiếp sẽ đi sâu **VPC, Subnet & Routing** để hiểu cách container trong EKS giao tiếp an toàn với DB, Internet, và các service khác.`,
        theoryEn: `**Containers** package app + dependencies into immutable images that run identically across dev laptops, staging servers, and production clusters. **Docker** is the dominant runtime; **Kubernetes** is the distributed OS that orchestrates thousands of containers. Together they reshaped software deployment in the past decade.

## Containers vs VMs
| Aspect | VM | Container |
|--------|-----|-----------|
| Boot | 30-120s | 0.5-2s |
| Image | 1-10 GB | 50-500 MB |
| Overhead | Full guest OS | Shared kernel only |
| Density/host | 10-30 | 100-1000 |
| Portability | OVF standard | OCI runs anywhere |

VMs virtualize hardware (hypervisor); containers virtualize OS (shared kernel + namespaces + cgroups). Lighter but weaker isolation — use gVisor/Kata for untrusted code.

## Docker layered architecture
Dockerfiles build images as stacked, copy-on-write layers. Best practice: place rarely-changing items (deps) on top, app code on bottom — maximizes cache reuse.

## Kubernetes core concepts
- **Pod** — smallest scheduled unit; 1+ containers sharing network/storage; ephemeral.
- **ReplicaSet** — keeps N pods running.
- **Deployment** — manages ReplicaSets + rolling updates/rollback.
- **Service** — stable endpoint (ClusterIP/NodePort/LoadBalancer).
- **Ingress** — L7 HTTP routing (nginx, ALB Ingress, Traefik).
- **ConfigMap / Secret** — externalize config & secrets.
- **Namespace** — logical partitioning.
- **PersistentVolume + PVC** — storage abstraction (EBS, EFS, S3 CSI).
- **HPA** — autoscale pods on CPU/mem/custom metrics.
- **DaemonSet** — one pod per node (log/monitor agents).
- **StatefulSet** — stable identity + per-pod storage (DBs, Kafka).

## Cluster Architecture
Control plane: \`kube-apiserver\` (entry), \`etcd\` (state), scheduler, controller-manager. Each node: \`kubelet\` (manages local pods), \`kube-proxy\` (network), container runtime.

## Managed Kubernetes
| Service | Provider | Control plane | Notes |
|---------|----------|---------------|-------|
| **EKS** | AWS | $0.10/h | Tight IAM/ALB/VPC integration |
| **AKS** | Azure | Free | Entra ID, free 99.95% SLA |
| **GKE** | GCP | $0.10/h (Autopilot extra) | Autopilot ≈ serverless K8s |

Beginner pick: **GKE Autopilot**. AWS shop: **EKS + Fargate**. MS shop: **AKS**.

## Case study: Spotify
Migrated from Helios to Kubernetes 2018-2020: 150+ GKE clusters, >10k nodes, >1.7M pods at peak, 1700+ microservices. Created Backstage developer portal (now CNCF standard). Each team deploys 100+ times/day independently.

## Case study: Airbnb
Runs 1000+ services on EKS + Envoy/Istio mesh handling 100k+ RPS with auto mTLS, retries, circuit breakers. Tradeoff: ops complexity + 1-2 ms per hop.

## Decision matrix
| Workload | Pick |
|----------|------|
| Webhooks, short bursts | Lambda/Cloud Functions |
| Steady microservice HTTP | Container (ECS/EKS/Cloud Run) |
| Long-running workers | Container |
| Stateful DB/cache | Managed service or StatefulSet |
| Legacy needing full OS/Windows | VM |
| Steady high 24/7 | VM + Reserved/Savings Plan |
| Multi-cloud portability | K8s |

## Best Practices
- ✅ Small images (slim/alpine, multi-stage), non-root user.
- ✅ Liveness, readiness, startup probes.
- ✅ Resource requests + limits (avoid noisy neighbor + OOMKill).
- ✅ PodDisruptionBudget + anti-affinity.
- ✅ Default-deny NetworkPolicy (Calico/Cilium).
- ✅ GitOps (ArgoCD/Flux): cluster state = git repo.
- ✅ Image signing (cosign) + scanning (Trivy) in CI.

## Common Pitfalls
- ❌ No resource limits → one pod kills node.
- ❌ Storing state on container fs (lost on restart).
- ❌ \`:latest\` tag → not reproducible; pin SHA/semver.
- ❌ One pod per node — wastes K8s bin-packing.
- ❌ Logs to file inside container — log to stdout instead.
- ❌ Wide cluster-admin RBAC.
- ❌ Autoscaling without PodDisruptionBudget.

## When NOT to use K8s
- ❌ <5 devs, <10 services → ECS/Cloud Run/Heroku is enough.
- ❌ No K8s ops expertise — 6-12 month learning curve.
- ❌ Pure event-driven workloads → Lambda is simpler.

## Bridge to next lesson
Containers run inside a **VPC** — your private virtual network with subnets, routing, firewall. Next we dive into **VPC, Subnets & Routing** to see how EKS pods talk to DBs, Internet, and other services securely.`,
        code: `# Dockerfile cho web app Python
# FROM python:3.11-slim
# WORKDIR /app
# COPY requirements.txt .
# RUN pip install -r requirements.txt
# COPY . .
# CMD ["gunicorn", "-b", "0.0.0.0:8000", "app:app"]

# Kubernetes manifest: Deployment + Service
manifest = """
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3
  selector:
    matchLabels: { app: web }
  template:
    metadata:
      labels: { app: web }
    spec:
      containers:
      - name: web
        image: myrepo/web-app:1.2.0
        ports: [ { containerPort: 8000 } ]
        resources:
          requests: { cpu: "100m", memory: "128Mi" }
          limits:   { cpu: "500m", memory: "512Mi" }
---
apiVersion: v1
kind: Service
metadata: { name: web-svc }
spec:
  type: LoadBalancer
  selector: { app: web }
  ports: [ { port: 80, targetPort: 8000 } ]
"""
print(manifest)`,
        codeLanguage: "yaml",
        exercise: "Viết Deployment Kubernetes cho 1 API Node.js cần 2 replica, image `mycompany/api:v3`, request 200m CPU & 256Mi RAM, expose qua Service ClusterIP port 3000.",
        exerciseEn: "Write a Kubernetes Deployment for a Node.js API needing 2 replicas, image `mycompany/api:v3`, request 200m CPU & 256Mi RAM, exposed via ClusterIP Service port 3000.",
        quiz: [
          { question: "What is the smallest deployable unit in Kubernetes?", options: ["Container", "Pod", "Deployment", "Node"], answer: 1, explanation: "A Pod is the smallest unit — it contains one or more containers sharing network/storage." },
          { question: "EKS is the Kubernetes service of?", options: ["Azure", "GCP", "AWS", "IBM"], answer: 2, explanation: "EKS = Elastic Kubernetes Service from AWS." },
          { question: "Which component ensures the correct number of replicas?", options: ["Service", "Deployment", "Ingress", "ConfigMap"], answer: 1, explanation: "A Deployment manages a ReplicaSet, ensuring the desired number of replicas runs and handles rolling updates." },
          { question: "Containers are faster than VMs because?", options: ["They have a dedicated CPU", "They share the host kernel and skip OS boot", "They are smaller than 1 byte", "They need no network"], answer: 1, explanation: "Containers share the host OS kernel and don't boot a separate OS, so they start in seconds." },
          { question: "Choose containers over serverless when?", options: ["Tiny event-driven app", "You need runtime control + long-running processes", "You want zero management", "Triggered once per month"], answer: 1, explanation: "Containers are best when you need runtime control, stateful or long-running workloads, or want to avoid vendor lock-in." },
        ],
      },
    ],
  },

  // ============ MODULE 3: Networking & Security ============
  {
    id: "cloud-network-security",
    title: "Networking & Bảo mật",
    titleEn: "Networking & Security",
    icon: "🔐",
    color: "from-indigo-500 to-blue-600",
    description: "VPC, subnet, IAM, security group, encryption, shared responsibility model",
    descriptionEn: "VPC, subnets, IAM, security groups, encryption, shared responsibility model",
    course: "cloud",
    lessons: [
      {
        id: "cloud-net-1",
        title: "VPC, Subnet và Routing",
        titleEn: "VPC, Subnets, and Routing",
        level: 3,
        difficulty: "intermediate",
        theory: `**VPC (Virtual Private Cloud)** là mạng ảo cô lập của bạn trong cloud — giống như có một data center riêng nhưng được hạ tầng hyperscaler quản lý. Mọi tài nguyên cloud (EC2, RDS, EKS, Lambda) đều "sống" bên trong một VPC nào đó. Hiểu VPC là điều kiện bắt buộc để build hệ thống cloud an toàn và hiệu năng cao.

## Vì sao cần VPC?
Trước khi có VPC (AWS giới thiệu 2009, EC2-Classic là tiền thân), mọi EC2 chia chung 1 mạng phẳng — không kiểm soát được ai thấy ai. VPC giải quyết:
- **Cô lập logic**: tài nguyên của bạn không thấy được tài nguyên khách hàng khác.
- **Định tuyến tùy biến**: tự quyết route, NAT, peering.
- **Bảo mật phân lớp**: SG (instance), NACL (subnet), endpoint, WAF.
- **Hybrid**: kết nối trực tiếp với on-prem qua VPN/Direct Connect.

## Khái niệm cốt lõi
- **CIDR block** — dải IP của VPC, ví dụ \`10.0.0.0/16\` cho 65,536 địa chỉ. Chọn dải **không đụng** với on-prem hoặc các VPC khác (chuẩn RFC1918: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16).
- **Subnet** — chia VPC thành nhiều vùng nhỏ; mỗi subnet **thuộc đúng 1 AZ** (không trải qua AZ).
  - **Public subnet**: route table có \`0.0.0.0/0 → IGW\`; instance có Public IP → ra Internet.
  - **Private subnet**: không có route trực tiếp ra IGW; muốn ra Internet phải đi qua **NAT Gateway** trong public subnet (outbound only).
  - **Isolated subnet**: không ra Internet được — dùng cho DB nhạy cảm.
- **Route Table** — quy tắc \`destination → target\`; mỗi subnet gắn 1 route table.
- **Internet Gateway (IGW)** — cổng ra Internet; gắn 1 IGW per VPC.
- **NAT Gateway** — managed NAT, chịu chi phí ~$0.045/giờ + $0.045/GB ra. (Anti-pattern lớn về cost!)
- **VPC Endpoint** — kết nối riêng tới dịch vụ AWS (S3, DynamoDB) **không qua Internet** → tiết kiệm cost & tăng bảo mật.
- **Security Group (SG)** — firewall **stateful** ở cấp instance/ENI. Mặc định deny inbound, allow outbound. Return traffic tự allow.
- **NACL (Network ACL)** — firewall **stateless** ở cấp subnet, có rule Allow + Deny đánh số thứ tự. Phải allow cả 2 chiều.

## So sánh Security Group vs NACL
| Đặc điểm | Security Group | NACL |
|----------|----------------|------|
| Cấp độ | Instance/ENI | Subnet |
| Stateful | ✅ Có | ❌ Không |
| Rule | Chỉ Allow | Allow + Deny |
| Đánh giá rule | All rules | Theo thứ tự (lowest first) |
| Mặc định | Deny inbound | Allow tất cả |
| Use case chính | Kiểm soát app-level | Bóc lớp bảo mật subnet |

Best practice: dùng SG là tuyến phòng thủ chính; NACL chỉ để chặn rộng (block IP độc, chặn cả subnet).

## Sơ đồ kiến trúc 3-tier chuẩn
\`\`\`
                    ┌─────────────┐
Internet ───► IGW ─►│   Public    │  ALB, Bastion, NAT Gateway
                    │   Subnet    │  (10.0.1.0/24, 10.0.2.0/24)
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │   Private   │  EC2/ECS/EKS app servers
                    │  App Subnet │  (10.0.11.0/24, 10.0.12.0/24)
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │   Private   │  RDS, ElastiCache (no Internet)
                    │  DB Subnet  │  (10.0.21.0/24, 10.0.22.0/24)
                    └─────────────┘
\`\`\`
**2 AZ tối thiểu** cho mỗi tier để chịu lỗi 1 AZ.

## Hybrid & Multi-VPC connectivity
| Cách kết nối | Băng thông | Latency | Use case |
|--------------|------------|---------|----------|
| **VPN site-to-site** | <1.25 Gbps | ~Internet | Backup link, dev/test |
| **Direct Connect** | 1-100 Gbps | <2 ms | Production hybrid, low latency |
| **VPC Peering** | Full speed | <1 ms | 2 VPC kết nối trực tiếp (không transitive) |
| **Transit Gateway** | 50 Gbps/attachment | <1 ms | Hub-and-spoke nhiều VPC + on-prem |
| **PrivateLink** | Service-specific | <1 ms | Expose 1 dịch vụ ra VPC khác |

## Case study: Capital One — VPC làm tường bảo mật fintech
Capital One chia hạ tầng thành **>200 VPC** theo team/môi trường, kết nối qua Transit Gateway. Mỗi VPC có chính sách bảo mật riêng + audit độc lập. Sau sự cố 2019 (lộ data S3), họ tăng cường VPC Endpoint cho S3 — mọi traffic giờ đi nội bộ AWS network thay vì Internet.

## Case study: Stripe — chiến lược latency
Stripe là payment processor, phải xử lý webhook <100 ms toàn cầu. Họ:
- Triển khai 1 VPC mỗi region với cùng CIDR scheme.
- Dùng PrivateLink cho merchant trong cùng region → bypass Internet.
- VPC Flow Log → S3 → Athena để forensic mọi packet bất thường.

## Best Practices
- ✅ **Dải CIDR đủ lớn** (\`/16\`) — khó mở rộng sau này. Tránh \`/24\` nhỏ.
- ✅ **Tách CIDR** giữa các VPC — cần peering không đụng dải.
- ✅ **2-3 AZ tối thiểu** cho HA.
- ✅ **VPC Flow Log** bật mặc định (gửi vào S3/CloudWatch) — debug + security.
- ✅ **VPC Endpoint cho S3, DynamoDB** — miễn phí Gateway endpoint, tiết kiệm hàng nghìn USD/tháng NAT egress.
- ✅ **Tags chuẩn**: Environment, Owner, CostCenter cho mọi subnet/SG.
- ✅ **SG reference SG khác** thay vì hardcode IP — co giãn theo ASG.
- ✅ **Default SG trống** — buộc team tạo SG riêng có ý đồ rõ ràng.

## Common Pitfalls
- ❌ **NAT Gateway runaway cost** — 1 NAT = $32/tháng + data; 1 app sai bug spam call ra ngoài có thể đốt $10k/tháng.
- ❌ **Subnet quá nhỏ** (\`/28\` chỉ có 11 IP) → ASG scale up bị fail.
- ❌ **SG mở 0.0.0.0/0 cho 22/3389** — top vector tấn công.
- ❌ **CIDR overlap** giữa VPC → không peering được.
- ❌ **1 NAT Gateway / 1 AZ** → AZ chết là cả 1 AZ private mất Internet. Triển khai NAT mỗi AZ.
- ❌ **Không dùng VPC Endpoint cho S3** → traffic ra Internet rồi vòng lại, tốn cost & latency.

## Khi cần Multi-VPC?
- Tách prod/staging/dev (blast radius).
- Tách team/business unit (billing, compliance).
- Gộp sau M&A (peering hoặc TGW).
- Compliance vùng (PCI-DSS, HIPAA cô lập).

## Liên hệ bài tiếp theo
VPC quyết định **WHO có thể kết nối tới WHAT qua đường nào**. Bài tiếp **IAM** sẽ trả lời câu hỏi sâu hơn: **WHO được phép làm GÌ trên TÀI NGUYÊN nào** — tầng kiểm soát identity & permission của cloud.`,
        theoryEn: `**VPC (Virtual Private Cloud)** is your isolated virtual network in the cloud — like a private data center managed by the hyperscaler. Every cloud resource lives inside some VPC. Mastering VPC is mandatory for safe, performant cloud systems.

## Why VPC?
Before VPC (AWS introduced it 2009; EC2-Classic predecessor), all EC2s shared one flat network with no isolation. VPC delivers logical isolation, custom routing, layered security (SG, NACL, endpoint, WAF), and hybrid connectivity to on-prem.

## Core Concepts
- **CIDR block** — VPC IP range (\`10.0.0.0/16\` = 65,536 IPs). Pick a range that doesn't collide with on-prem or other VPCs (RFC1918: 10/8, 172.16/12, 192.168/16).
- **Subnet** — divides VPC; **belongs to exactly 1 AZ**.
  - **Public**: route \`0.0.0.0/0 → IGW\`; instances have public IP.
  - **Private**: no direct IGW route; uses NAT Gateway in public subnet for outbound only.
  - **Isolated**: no Internet at all — for sensitive DBs.
- **Route Table** — \`destination → target\` rules; one per subnet.
- **Internet Gateway (IGW)** — Internet entry point; one per VPC.
- **NAT Gateway** — managed NAT, ~$0.045/h + $0.045/GB out. Big cost trap!
- **VPC Endpoint** — private connection to AWS services (S3, DynamoDB) bypassing Internet.
- **Security Group (SG)** — stateful firewall at instance/ENI; default deny inbound, allow outbound.
- **NACL** — stateless firewall at subnet; has Allow + Deny ordered rules; must allow both directions.

## SG vs NACL
| Aspect | SG | NACL |
|--------|-----|------|
| Level | Instance/ENI | Subnet |
| Stateful | ✅ | ❌ |
| Rule types | Allow only | Allow + Deny |
| Evaluation | All rules | Ordered (lowest first) |
| Default | Deny in | Allow all |

Use SG as primary defense; NACL for broad blocks (bad IPs, whole subnets).

## 3-tier reference architecture
- Public subnet (2 AZ): ALB, Bastion, NAT Gateway.
- Private app subnet (2 AZ): EC2/ECS/EKS app servers.
- Private DB subnet (2 AZ): RDS, ElastiCache, no Internet.

## Hybrid & multi-VPC
| Method | Bandwidth | Latency | Use |
|--------|-----------|---------|-----|
| VPN | <1.25 Gbps | ~Internet | Backup, dev |
| Direct Connect | 1-100 Gbps | <2 ms | Prod hybrid |
| VPC Peering | Full | <1 ms | Two VPCs (non-transitive) |
| Transit Gateway | 50 Gbps | <1 ms | Hub-and-spoke many VPCs |
| PrivateLink | Service-specific | <1 ms | Expose one service across VPCs |

## Case study: Capital One
200+ VPCs split by team/env, connected via Transit Gateway. Each VPC has independent security policy + audit. After 2019 S3 leak they enforced VPC Endpoints for S3 — all traffic now stays inside AWS network.

## Case study: Stripe
Payment webhooks <100 ms globally. One VPC per region with consistent CIDR scheme; PrivateLink for in-region merchants bypassing Internet; VPC Flow Logs → S3 → Athena for forensics.

## Best Practices
- ✅ Big CIDR (/16); tough to expand later.
- ✅ Non-overlapping CIDRs across VPCs (peering needs it).
- ✅ Min 2-3 AZs.
- ✅ Enable VPC Flow Logs by default.
- ✅ S3 + DynamoDB Gateway endpoints — free, save thousands in NAT egress.
- ✅ Tag everything (Env, Owner, CostCenter).
- ✅ Reference other SGs in rules instead of hardcoded IPs.
- ✅ Keep default SG empty — force teams to create intentional SGs.

## Common Pitfalls
- ❌ NAT Gateway runaway cost (one bug looping out → $10k/month).
- ❌ Tiny subnets (/28 = 11 usable IPs) breaking ASG.
- ❌ SG opening 22/3389 to 0.0.0.0/0.
- ❌ Overlapping CIDRs blocking future peering.
- ❌ Single NAT for all AZs — AZ outage breaks Internet for all private subnets.
- ❌ No VPC Endpoint for S3 → traffic goes out and back, costs & latency.

## When multi-VPC?
Prod/staging/dev separation; team/BU isolation; M&A merges; compliance regions (PCI/HIPAA).

## Bridge to next lesson
VPC controls **who can connect where**. Next: **IAM** — who can do **what** on which **resource** — the identity & permission layer of the cloud.`,
        code: `# Tạo VPC + 2 subnet (1 public + 1 private) bằng boto3
import boto3
ec2 = boto3.client("ec2")

# 1. Tạo VPC
vpc = ec2.create_vpc(CidrBlock="10.0.0.0/16")
vpc_id = vpc["Vpc"]["VpcId"]

# 2. Public subnet (us-east-1a)
public = ec2.create_subnet(VpcId=vpc_id, CidrBlock="10.0.1.0/24", AvailabilityZone="us-east-1a")
ec2.modify_subnet_attribute(SubnetId=public["Subnet"]["SubnetId"], MapPublicIpOnLaunch={"Value": True})

# 3. Private subnet (us-east-1b)
private = ec2.create_subnet(VpcId=vpc_id, CidrBlock="10.0.2.0/24", AvailabilityZone="us-east-1b")

# 4. Internet Gateway cho public
igw = ec2.create_internet_gateway()
ec2.attach_internet_gateway(VpcId=vpc_id, InternetGatewayId=igw["InternetGateway"]["InternetGatewayId"])

print(f"VPC {vpc_id} ready: public={public['Subnet']['SubnetId']}, private={private['Subnet']['SubnetId']}")`,
        codeLanguage: "python",
        exercise: "Thiết kế VPC cho web app 3-tier (ALB + EC2 + RDS) trên 2 AZ. Liệt kê subnet, route table, và security group cần thiết.",
        exerciseEn: "Design a VPC for a 3-tier web app (ALB + EC2 + RDS) across 2 AZs. List required subnets, route tables, and security groups.",
        quiz: [
          { question: "How does a public subnet differ from a private one?", options: ["IP range size", "Public has a route to an Internet Gateway", "Private is faster", "No difference"], answer: 1, explanation: "Public subnets have a 0.0.0.0/0 route to an Internet Gateway; private subnets do not (they reach the Internet via NAT Gateway only)." },
          { question: "NAT Gateway is used for?", options: ["Public subnets", "Allowing private subnets outbound Internet access", "Speeding up DNS", "Storing logs"], answer: 1, explanation: "A NAT Gateway lets private-subnet instances reach the Internet outbound (e.g. pulling updates) without being reachable inbound." },
          { question: "Security Groups are firewalls that are?", options: ["Stateless at subnet level", "Stateful at instance level", "At VPC level", "At region level"], answer: 1, explanation: "Security Groups are stateful firewalls at the instance level — return traffic is automatically allowed." },
          { question: "How many IPs are in CIDR 10.0.0.0/16?", options: ["256", "1024", "65,536", "16 million"], answer: 2, explanation: "/16 = 65,536 IPs (2^16)." },
          { question: "To connect 2 VPCs in different accounts, use?", options: ["Internet Gateway", "VPC Peering or Transit Gateway", "NAT", "Route Table"], answer: 1, explanation: "VPC Peering connects two VPCs directly; Transit Gateway scales better when connecting many VPCs." },
        ],
      },
      {
        id: "cloud-iam-1",
        title: "IAM: Identity & Access Management",
        titleEn: "IAM: Identity & Access Management",
        level: 3,
        difficulty: "intermediate",
        theory: `**IAM (Identity & Access Management)** trả lời 5 câu hỏi cốt lõi: **AI** (identity), được làm **GÌ** (action), với **TÀI NGUYÊN** nào (resource), **KHI NÀO** + **TỪ ĐÂU** (condition). Đây là dịch vụ **bảo mật quan trọng nhất** trong cloud — sai IAM = lộ data, mất tiền, hỏng compliance.

## Vì sao IAM là "first line of defense"?
Theo báo cáo Gartner, **>75% sự cố bảo mật cloud do cấu hình IAM sai** (key bị rò trên GitHub, role rộng, không bật MFA…). Vd: vụ Capital One 2019 mất 100M record vì 1 IAM role có \`s3:ListBucket\` quá rộng. Vụ Uber 2016 mất data 57M user vì AWS access key commit lên GitHub. **Hiểu IAM = giảm 75% rủi ro.**

## Bốn thực thể cốt lõi
| Thực thể | Định nghĩa | Khi nào dùng |
|----------|-----------|--------------|
| **User** | Identity dài hạn cho người/service account | Người dev login console, app legacy không thể assume role |
| **Group** | Tập hợp user, gán policy chung | Quản lý theo team (Devs, Admins, ReadOnly) |
| **Role** | Identity tạm thời, được "assume" → cấp credential ngắn hạn | EC2/Lambda/EKS, cross-account, federated SSO |
| **Policy** | JSON định nghĩa quyền (Allow/Deny + Action + Resource + Condition) | Gắn vào User/Group/Role |

**Quy tắc vàng**: ưu tiên **Role > User** mọi lúc có thể, vì:
- Credential ngắn hạn (15 phút – 12 giờ), tự xoay.
- Không cần lưu access key vào file/biến môi trường.
- Audit dễ qua CloudTrail.

## Cấu trúc IAM Policy
\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "AllowS3FromOffice",
    "Effect": "Allow",
    "Action": ["s3:GetObject", "s3:PutObject"],
    "Resource": "arn:aws:s3:::myapp-data/*",
    "Condition": {
      "IpAddress": {"aws:SourceIp": "203.0.113.0/24"},
      "Bool": {"aws:MultiFactorAuthPresent": "true"}
    }
  }]
}
\`\`\`
- **Effect**: Allow / Deny (Deny luôn thắng).
- **Action**: theo định dạng \`service:operation\` (\`s3:GetObject\`, \`ec2:RunInstances\`); hỗ trợ wildcard \`s3:Get*\`.
- **Resource**: ARN — \`arn:aws:s3:::bucket/*\` (lưu ý 2 wildcard khác nhau: \`*\` = mọi ký tự, \`?\` = 1 ký tự).
- **Condition**: bộ lọc — IP, MFA, thời gian, tag, user-agent…

## Cơ chế đánh giá quyền
Khi 1 request đến AWS, IAM duyệt theo thứ tự:
1. **Explicit Deny** ở bất kỳ policy → DENY ngay.
2. **Explicit Allow** ở ít nhất 1 policy → cần kiểm tra tiếp.
3. **Service Control Policy (SCP)** ở Organizations → nếu chặn → DENY.
4. **Resource policy** (vd bucket policy) → có thể grant cross-account.
5. **Permission boundary** (giới hạn tối đa của role).
6. **Session policy** (khi assume role) — thu hẹp thêm.
7. Nếu không có Allow nào rõ ràng → **implicit DENY**.

## Các loại Policy
| Loại | Phạm vi | Use case |
|------|---------|----------|
| **AWS Managed** | AWS soạn (\`AmazonS3ReadOnlyAccess\`) | Khởi đầu nhanh |
| **Customer Managed** | Bạn soạn, tái dùng | Chuẩn nội bộ |
| **Inline** | Gắn cứng 1 entity | Quyền one-off |
| **Resource policy** | Trên resource (bucket policy, KMS key policy) | Cross-account access |
| **SCP** | Org-wide guardrail | Chặn region, dịch vụ ở account |
| **Permission Boundary** | Trần quyền tối đa | Cho dev tự tạo role nhưng không vượt giới hạn |
| **Session Policy** | Khi STS AssumeRole | Cấp credential thu hẹp tạm thời |

## Case study: Capital One 2019 — bài học $300 triệu
- Lỗi: IAM Role gắn cho WAF có quyền \`s3:ListBucket\` + \`s3:GetObject\` quá rộng.
- Tấn công SSRF khai thác → đọc credential → liệt kê & tải bucket.
- Mất 100M record cá nhân, phạt **$80M** + tổn thất ~$300M.
- **Bài học**: least privilege + Permission Boundary + Block Public Access mặc định.

## Case study: Uber 2016 — access key trên GitHub
- Dev commit AWS access key vào private GitHub repo.
- Hacker tìm được, dùng key tải data 57M user + 600k driver.
- Uber giấu, trả $100k "bug bounty" — bị phạt $148M năm 2018.
- **Bài học**: dùng **OIDC** (GitHub Actions assume role không cần key), bật **GitGuardian/AWS Access Analyzer** scan, **Secrets Manager** thay vì env var.

## Cross-account access đúng cách
Thay vì share user/key, dùng **AssumeRole**:
\`\`\`
Account A (Trust)            Account B (Caller)
┌─────────────┐              ┌──────────────┐
│ Role MyRole │◄── trust ────│ User devops  │
│  Trust:     │              │              │
│  acct-B     │              │  sts:Assume  │
└─────────────┘              │  Role        │
       ▲                     └──────┬───────┘
       │ assume                     │
       └────── temp credential ◄────┘
\`\`\`
**External ID** dùng cho 3rd-party SaaS (Datadog, Snyk) để chống "confused deputy attack".

## Best Practices (checklist 12 điểm)
- ✅ **Khóa root account**: bật MFA hardware, không tạo access key, chỉ dùng cho billing/account closure.
- ✅ **MFA bắt buộc** cho mọi human user (\`Condition: aws:MultiFactorAuthPresent\`).
- ✅ **Dùng Role** cho EC2/Lambda/EKS — không hardcode key.
- ✅ **AWS SSO/IAM Identity Center** cho SSO doanh nghiệp; tránh tạo IAM User cho từng nhân viên.
- ✅ **Permission Boundary** cho team tự service mới mà không vượt trần.
- ✅ **SCP** ở Organizations chặn region không cho phép, chặn dịch vụ nguy hiểm.
- ✅ **Access Analyzer** chạy hàng tuần — tự tìm policy public/cross-account thừa.
- ✅ **CloudTrail** bật mọi region, log vào S3 immutable bucket có Object Lock.
- ✅ **Rotate access key 90 ngày** (nếu buộc phải dùng); ưu tiên xóa hẳn.
- ✅ **Tag-based access control** (ABAC): policy dùng \`aws:ResourceTag\` thay vì list cứng resource.
- ✅ **Secrets Manager / Parameter Store** thay vì env var cho DB password, API key.
- ✅ **Test policy với IAM Policy Simulator** trước khi apply.

## Common Pitfalls
- ❌ **\`Action: "*"\` + \`Resource: "*"\`** trong policy production.
- ❌ **AdministratorAccess gắn cho user thường** "cho nhanh".
- ❌ **Access key cá nhân trong code/Slack/Notion**.
- ❌ **Trust policy quá rộng** (\`Principal: "*"\`).
- ❌ **Không bật CloudTrail** → không có audit khi có sự cố.
- ❌ **MFA chỉ bật cho admin** — mọi user nên bật.
- ❌ **IAM User cho mỗi nhân viên** thay vì federated SSO → khó offboard.

## Khi NÀO dùng User vs Role?
- ✅ User: legacy app không assume role được; CLI cá nhân (nên kết hợp aws-vault).
- ✅ Role: 99% case khác — service-to-service, cross-account, federated SSO, GitHub Actions OIDC.

## Liên hệ bài tiếp theo
IAM kiểm soát "ai làm gì". Tầng kế tiếp là **bảo vệ DỮ LIỆU** — bài tiếp **Shared Responsibility & Encryption** sẽ học cách mã hóa at-rest (KMS) + in-transit (TLS) và phân chia trách nhiệm với cloud provider.`,
        theoryEn: `**IAM (Identity & Access Management)** answers 5 questions: **WHO** (identity) can do **WHAT** (action) on **WHICH** resource, **WHEN** + **FROM WHERE** (condition). It is the most important security service in the cloud — IAM mistakes = data leaks, financial loss, compliance failure.

## Why IAM is the first line of defense
Per Gartner, **>75% of cloud security incidents are caused by IAM misconfiguration** (leaked keys on GitHub, overly broad roles, no MFA, etc.). Capital One 2019 lost 100M records due to one IAM role with overly broad \`s3:ListBucket\`. Uber 2016 lost 57M users via an AWS access key committed to GitHub. **Mastering IAM cuts ~75% of risk.**

## Four core entities
| Entity | Definition | Use case |
|--------|------------|----------|
| **User** | Long-term identity for human/service account | Console login, legacy apps that can't assume roles |
| **Group** | Set of users with shared policies | Team-based management |
| **Role** | Temporary identity that is "assumed" → short-lived credentials | EC2/Lambda/EKS, cross-account, federated SSO |
| **Policy** | JSON defining permissions (Allow/Deny + Action + Resource + Condition) | Attach to User/Group/Role |

**Golden rule**: prefer **Role > User** wherever possible.

## Policy structure (Effect, Action, Resource, Condition)
- Effect: Allow / Deny (Deny always wins).
- Action: \`service:operation\` (\`s3:GetObject\`); supports wildcards.
- Resource: ARN with wildcards.
- Condition: filters — IP, MFA, time, tag, user-agent.

## Evaluation order
Explicit Deny → Explicit Allow → SCP → Resource policy → Permission boundary → Session policy → implicit DENY if no Allow.

## Policy types
AWS Managed, Customer Managed, Inline, Resource policy, SCP, Permission Boundary, Session Policy.

## Case study: Capital One 2019 ($300M lesson)
WAF role had over-broad \`s3:ListBucket\` + \`s3:GetObject\`. SSRF exploit read credentials, listed and downloaded buckets — 100M records lost, $80M fine, ~$300M total. Lesson: least privilege + Permission Boundary + default Block Public Access.

## Case study: Uber 2016 (key on GitHub)
Dev committed AWS access key to private GitHub repo. Hackers found it, downloaded 57M users + 600k drivers. Uber hid it, paid $100k "bug bounty", got fined $148M in 2018. Lesson: use **OIDC** (GitHub Actions assume role without keys), enable secret scanners, use **Secrets Manager**.

## Cross-account: AssumeRole + ExternalId
Use Role with trust policy + STS AssumeRole; ExternalId protects against the "confused deputy" problem with 3rd-party SaaS.

## Best Practices (12-point checklist)
- ✅ Lock root: hardware MFA, no access keys, only for billing/account closure.
- ✅ Mandatory MFA for humans.
- ✅ Roles for EC2/Lambda/EKS — no hardcoded keys.
- ✅ AWS SSO/IAM Identity Center for enterprise SSO.
- ✅ Permission Boundary for self-service teams.
- ✅ SCPs in Organizations to block dangerous regions/services.
- ✅ Run Access Analyzer weekly.
- ✅ CloudTrail in all regions → immutable S3 with Object Lock.
- ✅ Rotate access keys 90 days (if you must use them).
- ✅ Tag-based access control (ABAC).
- ✅ Secrets Manager / Parameter Store for secrets.
- ✅ Test policies with IAM Policy Simulator first.

## Common Pitfalls
- ❌ \`Action: "*"\` + \`Resource: "*"\` in production.
- ❌ AdministratorAccess on regular users.
- ❌ Personal access keys in code/Slack/Notion.
- ❌ \`Principal: "*"\` in trust policies.
- ❌ CloudTrail off — no audit trail.
- ❌ MFA only for admins.
- ❌ IAM Users instead of federated SSO — offboarding nightmare.

## User vs Role decision
User: legacy apps, individual CLI (use aws-vault). Role: 99% of other cases.

## Bridge to next lesson
IAM controls "who does what". Next layer protects **DATA** — **Shared Responsibility & Encryption** covers at-rest (KMS) + in-transit (TLS) and how responsibility is split with the cloud provider.`,
        code: `# IAM Policy: cho phép Lambda đọc S3 bucket cụ thể + ghi CloudWatch Logs
policy = {
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowS3Read",
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::app-data",
        "arn:aws:s3:::app-data/*"
      ]
    },
    {
      "Sid": "AllowLogs",
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*"
    }
  ]
}

import json
print(json.dumps(policy, indent=2))
# Gắn policy này vào Role, sau đó Lambda assume Role đó`,
        codeLanguage: "json",
        exercise: "Viết IAM policy cho phép developer write/read 1 bucket S3 'dev-uploads', deny xóa object, chỉ truy cập từ IP công ty 203.0.113.0/24.",
        exerciseEn: "Write an IAM policy that lets a developer read/write S3 bucket 'dev-uploads', deny delete, accessible only from office IP 203.0.113.0/24.",
        quiz: [
          { question: "What is the core principle of IAM?", options: ["Grant maximum permissions", "Least Privilege", "One user, one policy", "Use root for everything"], answer: 1, explanation: "Least Privilege — grant only the minimum permissions required to do the job." },
          { question: "How should an EC2 instance access S3?", options: ["Hardcode an access key", "Attach an IAM Role to the instance", "Make the S3 bucket public", "Share a password"], answer: 1, explanation: "Best practice is to attach an IAM Role to EC2 — credentials rotate automatically and access keys are never exposed." },
          { question: "What does MFA stand for?", options: ["Multi-Factor Authentication", "Mass File Access", "Manual Failure Alert", "Memory Function Array"], answer: 0, explanation: "MFA = Multi-Factor Authentication — requires a second factor (token, app) in addition to a password." },
          { question: "To deny actions at the organization level (multi-account), use?", options: ["Security Group", "NACL", "SCP in AWS Organizations", "IAM Group"], answer: 2, explanation: "Service Control Policies (SCPs) in AWS Organizations block actions at the account level — stronger than IAM Policies." },
          { question: "Which service logs every AWS API call?", options: ["CloudWatch", "CloudTrail", "Config", "Inspector"], answer: 1, explanation: "CloudTrail records every API call (who did what, when) — required for audit & forensics." },
        ],
      },
      {
        id: "cloud-sec-1",
        title: "Shared Responsibility & Encryption",
        titleEn: "Shared Responsibility & Encryption",
        level: 3,
        difficulty: "intermediate",
        theory: `**Shared Responsibility Model** chia trách nhiệm bảo mật giữa **nhà cung cấp cloud (CSP)** và **khách hàng**.

**CSP chịu trách nhiệm "Security OF the Cloud":**
- Hạ tầng vật lý (data center, server, network)
- Hypervisor, mạng nội bộ
- Tính sẵn sàng của các managed service

**Khách hàng chịu trách nhiệm "Security IN the Cloud":**
- OS patching (với IaaS)
- Cấu hình firewall, IAM
- **Mã hóa dữ liệu** at-rest và in-transit
- App-level vulnerability
- Quản lý user, password, MFA

**Mức độ trách nhiệm theo dịch vụ:**
| Service | CSP lo | Khách hàng lo |
|---------|--------|---------------|
| IaaS (EC2) | hạ tầng + hypervisor | OS, app, data, IAM |
| PaaS (RDS) | + OS + DB engine | data, access control |
| SaaS (S3) | gần như tất cả | data + access control |

**Encryption (mã hóa):**
- **At-rest**: dữ liệu lưu trên disk → dùng **AWS KMS** quản lý key, S3/EBS/RDS hỗ trợ tự động.
- **In-transit**: dữ liệu khi truyền → bắt buộc **TLS 1.2+**.
- **Customer-managed key (CMK)** vs **AWS-managed key**: CMK có quyền xoay/audit/cấp quyền chi tiết hơn.

**Best practices an toàn:**
1. Bật encryption mặc định cho mọi bucket/disk/DB.
2. Bắt buộc HTTPS/TLS cho mọi endpoint.
3. Định kỳ scan vulnerability (Inspector, GuardDuty).
4. Backup + test restore định kỳ.
5. Bật **WAF + Shield** cho web app công khai.`,
        theoryEn: `**Shared Responsibility Model** splits security between cloud provider (CSP) and customer.

**CSP — Security OF the Cloud:** physical infra, hypervisor, network, managed service availability.

**Customer — Security IN the Cloud:** OS patching (IaaS), firewall config, IAM, **data encryption**, app security, MFA.

**Encryption:**
- **At-rest**: KMS-managed keys for S3/EBS/RDS.
- **In-transit**: TLS 1.2+.
- **CMK** vs AWS-managed key: CMK gives full control (rotation, audit, granular access).

**Best practices:** default encryption everywhere, enforce HTTPS, scan with Inspector/GuardDuty, backup + test restore, WAF + Shield for public apps.`,
        code: `# Bật encryption khi upload S3 + tạo CMK trong KMS
import boto3
kms = boto3.client("kms")
s3  = boto3.client("s3")

# 1. Tạo CMK (Customer Master Key)
key = kms.create_key(
    Description="App data encryption key",
    KeyUsage="ENCRYPT_DECRYPT",
    KeySpec="SYMMETRIC_DEFAULT",
)
key_id = key["KeyMetadata"]["KeyId"]

# 2. Upload S3 với SSE-KMS (server-side encryption với CMK)
s3.put_object(
    Bucket="my-secure-bucket",
    Key="confidential/contract.pdf",
    Body=b"<binary content>",
    ServerSideEncryption="aws:kms",
    SSEKMSKeyId=key_id,
)

# 3. Bật default encryption cho bucket
s3.put_bucket_encryption(
    Bucket="my-secure-bucket",
    ServerSideEncryptionConfiguration={
        "Rules": [{
            "ApplyServerSideEncryptionByDefault": {
                "SSEAlgorithm": "aws:kms",
                "KMSMasterKeyID": key_id,
            },
            "BucketKeyEnabled": True,
        }]
    },
)
print(f"Bucket secured with CMK {key_id}")`,
        codeLanguage: "python",
        exercise: "Một fintech lưu data khách hàng trên RDS PostgreSQL. Liệt kê các biện pháp bảo mật cần áp dụng (mã hóa, IAM, network, audit).",
        exerciseEn: "A fintech stores customer data in RDS PostgreSQL. List required security measures (encryption, IAM, network, audit).",
        quiz: [
          { question: "Per Shared Responsibility, WHO patches the OS on EC2?", options: ["AWS", "The customer", "Both", "Nobody"], answer: 1, explanation: "For IaaS like EC2, the customer patches the OS. For PaaS/SaaS, AWS handles that layer." },
          { question: "What is AWS KMS used for?", options: ["Managing IPs", "Managing encryption keys", "Managing logs", "Managing DNS"], answer: 1, explanation: "KMS = Key Management Service — create, store, and manage the lifecycle of encryption keys." },
          { question: "TLS 1.2+ applies to?", options: ["Encryption at-rest", "Encryption in-transit", "IAM", "Backup"], answer: 1, explanation: "TLS protects data while it travels between client and server (in-transit)." },
          { question: "Why is a CMK better than an AWS-managed key?", options: ["Cheaper", "Rotation, audit, and granular access control", "Faster", "Automatic"], answer: 1, explanation: "Customer-Managed Keys (CMKs) let you rotate, audit, and finely control access — ideal for compliance." },
          { question: "Which service detects anomalous behavior (threat detection)?", options: ["KMS", "GuardDuty", "S3", "Lambda"], answer: 1, explanation: "GuardDuty uses ML to detect unusual behavior (compromised keys, crypto mining, etc.)." },
        ],
      },
    ],
  },

  // ============ MODULE 4: Serverless & DevOps ============
  {
    id: "cloud-serverless-devops",
    title: "Serverless & DevOps",
    titleEn: "Serverless & DevOps",
    icon: "⚡",
    color: "from-emerald-500 to-cyan-600",
    description: "Lambda, API Gateway, IaC (Terraform), CI/CD pipeline, observability",
    descriptionEn: "Lambda, API Gateway, IaC (Terraform), CI/CD pipelines, observability",
    course: "cloud",
    lessons: [
      {
        id: "cloud-serverless-1",
        title: "Lambda & API Gateway",
        titleEn: "Lambda & API Gateway",
        level: 3,
        difficulty: "intermediate",
        theory: `**Serverless** không có nghĩa là "không server", mà là **bạn không quản lý server**. Cloud lo: provisioning, scaling, patching, HA. Bạn chỉ viết code và **trả tiền theo execution**.

**AWS Lambda — đặc tính:**
- Trigger từ S3, API Gateway, EventBridge, SQS, DynamoDB Stream...
- Hỗ trợ Node.js, Python, Java, Go, Ruby, .NET, container.
- Memory 128MB – 10GB, timeout tối đa 15 phút.
- **Cold start**: lần invoke đầu chậm (100ms – vài giây) do container khởi tạo.
- Concurrency mặc định 1000/region, có thể request tăng.

**Pricing:** \$0.20 / 1M request + \$0.0000166667 / GB-second. **1M request 128MB chạy 100ms = ~\$0.20.**

**API Gateway** tạo REST/HTTP/WebSocket API trước Lambda:
- Authentication (Cognito, IAM, Lambda authorizer).
- Throttling, caching, request validation.
- Custom domain + TLS.

**Khi nào dùng Serverless?**
- ✅ Event-driven, không đều (webhook, image processing, cron).
- ✅ Tải đột biến (campaign, sự kiện).
- ✅ Backend mobile/web nhỏ-vừa.
- ❌ Long-running >15 phút, low-latency real-time, workload đều cao (VM/container rẻ hơn).`,
        theoryEn: `**Serverless** = no server management. Cloud handles provisioning, scaling, HA. You write code and pay per execution.

**AWS Lambda:** trigger from S3/API GW/EventBridge/SQS, supports many runtimes, 128MB–10GB memory, 15min timeout max, has cold start, default 1000 concurrency.

**Pricing:** \$0.20 per 1M requests + \$0.0000166667/GB-second.

**API Gateway** fronts Lambda with auth, throttling, caching, custom domain.

**Use serverless for:** event-driven workloads, bursty traffic, small/medium APIs. Avoid for >15min jobs, ultra-low-latency, or steady high load.`,
        code: `# AWS Lambda handler (Python) — xử lý API Gateway request
import json

def lambda_handler(event, context):
    """Xử lý GET /users/{id}"""
    user_id = event["pathParameters"]["id"]

    # Mô phỏng query DynamoDB
    user = {"id": user_id, "name": f"User {user_id}", "email": f"{user_id}@example.com"}

    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        "body": json.dumps(user),
    }

# SAM template (serverless.yaml)
sam_template = """
Resources:
  GetUserFn:
    Type: AWS::Serverless::Function
    Properties:
      Runtime: python3.11
      Handler: app.lambda_handler
      MemorySize: 256
      Timeout: 10
      Events:
        ApiEvent:
          Type: Api
          Properties:
            Path: /users/{id}
            Method: get
"""
print(sam_template)`,
        codeLanguage: "python",
        exercise: "Tính chi phí cho Lambda chạy 5 triệu request/tháng, mỗi request dùng 256MB và chạy 200ms.",
        exerciseEn: "Calculate the cost for a Lambda running 5 million requests/month, each using 256MB and running 200ms.",
        quiz: [
          { question: "What is the maximum Lambda timeout?", options: ["1 minute", "5 minutes", "15 minutes", "Unlimited"], answer: 2, explanation: "Lambda has a maximum timeout of 15 minutes (900 seconds)." },
          { question: "What is a cold start?", options: ["Lambda errored", "Initial slow invocation while a new container initializes", "Lambda runs at machine boot", "Unrelated"], answer: 1, explanation: "Cold start is the latency of creating a new Lambda container — can be reduced with Provisioned Concurrency." },
          { question: "API Gateway does NOT provide which feature?", options: ["Authentication", "Throttling", "Database storage", "Caching"], answer: 2, explanation: "API Gateway does not store data — that's the job of DynamoDB/RDS." },
          { question: "When should you NOT use serverless?", options: ["Short webhook handler", "Cron job", "Long-running >15 minutes", "Image resize"], answer: 2, explanation: "Workloads longer than 15 minutes need containers/VMs because Lambda's max timeout is 15 minutes." },
          { question: "Lambda pricing is based on?", options: ["Number of CPUs", "Number of requests + GB-seconds", "Bandwidth", "Storage"], answer: 1, explanation: "Lambda is billed per request and memory × execution time (GB-seconds)." },
        ],
      },
      {
        id: "cloud-iac-1",
        title: "Infrastructure as Code (Terraform)",
        titleEn: "Infrastructure as Code (Terraform)",
        level: 4,
        difficulty: "intermediate",
        theory: `**Infrastructure as Code (IaC)** quản lý hạ tầng bằng code thay vì click trên console. Lợi ích: version control, reproducible, code review, rollback.

**Công cụ phổ biến:**
- **Terraform** (HashiCorp) — multi-cloud, cộng đồng lớn nhất, ngôn ngữ HCL.
- **AWS CloudFormation** — native AWS, YAML/JSON.
- **AWS CDK** — viết bằng TypeScript/Python, biên dịch sang CloudFormation.
- **Pulumi** — IaC bằng ngôn ngữ thực (TS/Py/Go).

**Terraform concepts:**
- **Provider**: plugin kết nối cloud (aws, azurerm, google).
- **Resource**: tài nguyên cần tạo (\`aws_instance\`, \`aws_s3_bucket\`).
- **State file** (\`terraform.tfstate\`): theo dõi resource đã tạo. **Lưu remote** (S3 + DynamoDB lock).
- **Module**: tái sử dụng cấu hình.
- **Variable** + **Output**: tham số hóa.

**Workflow chuẩn:**
1. \`terraform init\` — tải provider.
2. \`terraform plan\` — xem trước thay đổi.
3. \`terraform apply\` — áp dụng.
4. \`terraform destroy\` — xóa hết.

**Best practices:**
- ✅ Lưu state remote + lock.
- ✅ Tách environment (dev/staging/prod) bằng workspace hoặc folder.
- ✅ Code review mọi PR thay đổi infra.
- ✅ Dùng module cho pattern lặp lại.
- ❌ Không bao giờ sửa tay tài nguyên đã quản lý bởi Terraform (sẽ drift).`,
        theoryEn: `**Infrastructure as Code (IaC)** manages infra via code — version control, reproducible, reviewable, rollback.

**Tools:** Terraform (multi-cloud, HCL), CloudFormation (native AWS, YAML), CDK (TS/Py → CloudFormation), Pulumi (real languages).

**Terraform:** Provider, Resource, State file (store remote with S3 + DynamoDB lock), Module, Variable, Output.

**Workflow:** init → plan → apply → destroy.

**Best practices:** remote state + locking, separate envs, code review every PR, use modules, never manually edit Terraform-managed resources (causes drift).`,
        code: `# main.tf — tạo VPC + S3 bucket bằng Terraform
terraform {
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.0" }
  }
  backend "s3" {
    bucket = "my-terraform-state"
    key    = "prod/network.tfstate"
    region = "us-east-1"
    dynamodb_table = "tf-state-lock"
  }
}

provider "aws" {
  region = var.region
}

variable "region" {
  default = "us-east-1"
}

variable "env" {
  default = "prod"
}

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  tags = { Name = "vpc-\${var.env}", ManagedBy = "terraform" }
}

resource "aws_s3_bucket" "data" {
  bucket = "myapp-data-\${var.env}"
  tags   = { ManagedBy = "terraform" }
}

resource "aws_s3_bucket_versioning" "v" {
  bucket = aws_s3_bucket.data.id
  versioning_configuration { status = "Enabled" }
}

output "vpc_id"     { value = aws_vpc.main.id }
output "bucket_arn" { value = aws_s3_bucket.data.arn }`,
        codeLanguage: "hcl",
        exercise: "Viết Terraform tạo: 1 EC2 t3.micro trong VPC default, gắn security group cho phép SSH (port 22) và HTTP (port 80) từ 0.0.0.0/0.",
        exerciseEn: "Write Terraform to create: 1 EC2 t3.micro in default VPC, with a security group allowing SSH (22) and HTTP (80) from 0.0.0.0/0.",
        quiz: [
          { question: "What is the Terraform state file used for?", options: ["Storing code", "Tracking the resources you've created", "Storing passwords", "Storing logs"], answer: 1, explanation: "The state file maps code resources to real cloud resources — store remotely with locking for teams." },
          { question: "Which command PREVIEWS changes WITHOUT applying them?", options: ["terraform apply", "terraform plan", "terraform destroy", "terraform init"], answer: 1, explanation: "`terraform plan` shows the changes that would be made without actually applying them." },
          { question: "The MAIN benefit of IaC is?", options: ["Faster than the console", "Version control + reproducibility + reviewability", "It is free", "It self-heals"], answer: 1, explanation: "IaC enables git versioning, reproducible environments, and code review — reducing console-click mistakes." },
          { question: "What is drift?", options: ["A network error", "Difference between code and actual deployed state", "A price increase", "A backup"], answer: 1, explanation: "Drift happens when resources are modified manually so the live state differs from the code — Terraform will revert or warn." },
          { question: "The native AWS IaC tool is?", options: ["Terraform", "CloudFormation", "Ansible", "Chef"], answer: 1, explanation: "CloudFormation is native AWS IaC; Terraform is HashiCorp's multi-cloud tool." },
        ],
      },
      {
        id: "cloud-cicd-1",
        title: "CI/CD & Observability",
        titleEn: "CI/CD & Observability",
        level: 4,
        difficulty: "advanced",
        theory: `**CI/CD** tự động hóa build → test → deploy:
- **CI (Continuous Integration)**: mỗi commit → build + chạy test + scan security.
- **CD (Continuous Delivery)**: build qua test thì sẵn sàng deploy (manual approve).
- **CD (Continuous Deployment)**: deploy tự động lên prod nếu pass.

**Công cụ phổ biến:**
- **GitHub Actions** — YAML, marketplace lớn.
- **AWS CodePipeline + CodeBuild + CodeDeploy** — native AWS.
- **GitLab CI**, **Jenkins**, **CircleCI**.

**Deployment strategies (giảm rủi ro):**
- **Rolling update**: thay từng phần. Default Kubernetes.
- **Blue/Green**: 2 môi trường, switch traffic.
- **Canary**: deploy 5% → 25% → 100% theo dõi metric.
- **Feature flags**: bật tính năng cho subset user.

**Observability — 3 trụ cột:**
1. **Metrics** — số liệu định lượng (CPU, latency, error rate). CloudWatch, Prometheus, Datadog.
2. **Logs** — sự kiện văn bản. CloudWatch Logs, ELK, Loki.
3. **Traces** — đường đi của request qua nhiều service. AWS X-Ray, Jaeger, OpenTelemetry.

**SLI / SLO / SLA:**
- **SLI** (Service Level Indicator): chỉ số đo (vd: 99.95% request <200ms).
- **SLO** (Objective): mục tiêu nội bộ (vd: SLI ≥ 99.9%).
- **SLA** (Agreement): cam kết với khách hàng + bồi thường nếu vi phạm.

**Error budget**: nếu SLO 99.9% thì tháng có 43 phút "downtime allowance" — vượt thì freeze release.`,
        theoryEn: `**CI/CD:** automate build → test → deploy. CI = on every commit; CD (Delivery) = ready to deploy; CD (Deployment) = auto deploy if pass.

**Tools:** GitHub Actions, AWS CodePipeline, GitLab CI, Jenkins.

**Deployment strategies:** Rolling, Blue/Green, Canary, Feature flags.

**Observability — 3 pillars:** Metrics (CloudWatch/Prometheus), Logs (CloudWatch/ELK), Traces (X-Ray/Jaeger/OpenTelemetry).

**SLI / SLO / SLA + Error budget:** measurable indicator → internal target → customer commitment + penalty. Error budget = allowed downtime per period.`,
        code: `# .github/workflows/deploy.yml — CI/CD với GitHub Actions
name: Build & Deploy

on:
  push:
    branches: [main]

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm test -- --coverage
      - run: npm audit --audit-level=high

  deploy:
    needs: ci
    runs-on: ubuntu-latest
    environment: production   # require manual approval
    steps:
      - uses: actions/checkout@v4
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789012:role/github-deploy
          aws-region: us-east-1

      - name: Build & push Docker image
        run: |
          docker build -t myapp:\${{ github.sha }} .
          aws ecr get-login-password | docker login --username AWS --password-stdin 123.dkr.ecr.us-east-1.amazonaws.com
          docker tag myapp:\${{ github.sha }} 123.dkr.ecr.us-east-1.amazonaws.com/myapp:\${{ github.sha }}
          docker push 123.dkr.ecr.us-east-1.amazonaws.com/myapp:\${{ github.sha }}

      - name: Deploy ECS (rolling update)
        run: |
          aws ecs update-service \\
            --cluster prod \\
            --service myapp \\
            --force-new-deployment`,
        codeLanguage: "yaml",
        exercise: "Một service có SLO 99.95% uptime/tháng. Tính error budget (phút downtime cho phép). Nếu tuần đầu đã dùng 30 phút thì còn lại bao nhiêu?",
        exerciseEn: "A service has an SLO of 99.95% monthly uptime. Calculate the error budget (allowed downtime in minutes). If 30 min were used in week 1, how much remains?",
        quiz: [
          { question: "What is a canary deployment?", options: ["Deploy 100% immediately", "Deploy gradually 5%→25%→100% while watching metrics", "Deploy only at night", "Automatic rollback"], answer: 1, explanation: "Canary gradually shifts a small portion of traffic, monitors metrics, then expands — reducing risk." },
          { question: "Tracing is used to track?", options: ["CPU usage", "A request's path across multiple services (microservices)", "Disk space", "DNS"], answer: 1, explanation: "Distributed tracing (X-Ray, Jaeger) shows the end-to-end path of a request across services — great for debugging latency." },
          { question: "How does an SLA differ from an SLO?", options: ["No difference", "SLA is a customer commitment with penalties", "SLA is always 100%", "SLO is only for the CEO"], answer: 1, explanation: "An SLA is a contractual customer commitment with penalties; an SLO is an internal target; an SLI is the measured indicator." },
          { question: "An error budget at 99.9% equals how many minutes/month?", options: ["~4 minutes", "~43 minutes", "~7 hours", "0"], answer: 1, explanation: "30 days × 24h × 60min × 0.001 ≈ 43.2 minutes of allowed downtime." },
          { question: "A good CI pipeline should NOT?", options: ["Run tests automatically", "Run security scans", "Deploy directly to prod without testing", "Lint code"], answer: 2, explanation: "CI must always pass tests + security checks before merging. Deploying to prod belongs to CD and usually requires approval." },
        ],
      },
    ],
  },

  // ============ MODULE 5: Architecture & Cost ============
  {
    id: "cloud-architecture-cost",
    title: "Kiến trúc & Tối ưu chi phí",
    titleEn: "Architecture & Cost Optimization",
    icon: "🏗️",
    color: "from-blue-500 to-indigo-600",
    description: "Well-Architected Framework, microservices, cost optimization, FinOps",
    descriptionEn: "Well-Architected Framework, microservices, cost optimization, FinOps",
    course: "cloud",
    lessons: [
      {
        id: "cloud-arch-1",
        title: "AWS Well-Architected Framework",
        titleEn: "AWS Well-Architected Framework",
        level: 4,
        difficulty: "advanced",
        theory: `**AWS Well-Architected Framework** đưa ra **6 trụ cột (pillars)** để đánh giá và cải thiện kiến trúc cloud:

**1. Operational Excellence** — vận hành xuất sắc.
- IaC, CI/CD, monitoring, runbook, postmortem culture.

**2. Security** — bảo mật.
- Identity (IAM, MFA), detective control (CloudTrail, GuardDuty), data protection (encryption), incident response.

**3. Reliability** — độ tin cậy.
- Multi-AZ, auto-scaling, backup, disaster recovery (RPO/RTO).

**4. Performance Efficiency** — hiệu năng.
- Chọn đúng instance type, dùng caching (CloudFront, ElastiCache), serverless cho bursty load.

**5. Cost Optimization** — tối ưu chi phí.
- Right-sizing, Reserved/Savings Plan, lifecycle, tagging.

**6. Sustainability** — bền vững (mới 2021).
- Chọn region carbon thấp, ARM-based Graviton, tắt resource không dùng.

**5 nguyên tắc thiết kế (5 design principles):**
1. Stop guessing capacity — dùng auto-scale.
2. Test systems at production scale — dùng cloud để spin lên test rồi tear down.
3. Automate to make architectural experimentation easier.
4. Allow for evolutionary architectures — design có thể thay đổi.
5. Drive architectures using data — quyết định dựa trên metric.

**Anti-patterns cần tránh:**
- ❌ Single point of failure (1 EC2 không có ASG/LB).
- ❌ Hardcoded credentials trong code.
- ❌ Không có backup hoặc backup không test restore.
- ❌ Over-provisioning (mua to hơn cần thiết).
- ❌ "Lift-and-shift" mà không tối ưu cho cloud.`,
        theoryEn: `**AWS Well-Architected Framework — 6 pillars:** Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, Sustainability.

**5 design principles:**
1. Stop guessing capacity — auto-scale.
2. Test at production scale.
3. Automate experimentation.
4. Allow evolutionary architectures.
5. Drive decisions with data.

**Anti-patterns:** SPOF, hardcoded credentials, no tested backups, over-provisioning, naive lift-and-shift.`,
        code: `# Well-Architected self-assessment checklist
checklist = {
    "operational_excellence": [
        "IaC (Terraform/CFN) cho 100% infra?",
        "CI/CD tự động deploy?",
        "Có runbook + on-call rotation?",
    ],
    "security": [
        "Bật MFA cho mọi user?",
        "Encryption at-rest + in-transit?",
        "CloudTrail bật ở mọi region?",
        "GuardDuty + Security Hub?",
    ],
    "reliability": [
        "Multi-AZ deployment?",
        "Backup + test restore định kỳ?",
        "Đã định nghĩa RPO/RTO?",
        "Disaster recovery plan tested?",
    ],
    "performance": [
        "Right-sized instance?",
        "Có caching (CloudFront/ElastiCache)?",
        "Auto Scaling Group cấu hình đúng?",
    ],
    "cost": [
        "Tagging chuẩn để chargeback?",
        "Reserved/Savings Plan cho workload đều?",
        "Lifecycle S3 → Glacier?",
        "Tắt dev environment ngoài giờ?",
    ],
    "sustainability": [
        "Dùng ARM Graviton khi có thể?",
        "Region carbon thấp (eu-north-1)?",
        "Tắt resource không dùng?",
    ],
}

total = sum(len(v) for v in checklist.values())
print(f"Tổng câu hỏi đánh giá: {total}")
for pillar, items in checklist.items():
    print(f"\\n[{pillar.upper()}] — {len(items)} mục")
    for q in items: print(f"  □ {q}")`,
        codeLanguage: "python",
        exercise: "Áp dụng Well-Architected vào kiến trúc 1 web app e-commerce. Liệt kê 2 cải tiến cụ thể cho mỗi trong 6 pillars.",
        exerciseEn: "Apply Well-Architected to an e-commerce web app. List 2 concrete improvements for each of the 6 pillars.",
        quiz: [
          { question: "Which pillar is the NEWEST (added in 2021)?", options: ["Security", "Reliability", "Sustainability", "Performance"], answer: 2, explanation: "Sustainability is the 6th pillar, added in 2021." },
          { question: "What is RPO?", options: ["Recovery Point Objective", "Real Production Output", "Resource Provisioning Order", "Region Performance Optimizer"], answer: 0, explanation: "RPO = Recovery Point Objective — the maximum amount of data loss you can tolerate (e.g. 1h means hourly backups)." },
          { question: "Which anti-pattern is most dangerous for reliability?", options: ["Good tagging", "Single point of failure", "Auto-scaling", "Multi-AZ"], answer: 1, explanation: "A SPOF (single point of failure) takes the whole system down when one component fails." },
          { question: "The principle 'Stop guessing capacity' means?", options: ["Guess more", "Use auto-scaling to match real demand", "Over-provision by 50%", "Skip monitoring"], answer: 1, explanation: "Cloud enables auto-scaling — no need to guess capacity, just scale to actual demand." },
          { question: "How many pillars does Well-Architected have?", options: ["3", "5", "6", "10"], answer: 2, explanation: "6 pillars: Operational Excellence, Security, Reliability, Performance, Cost, Sustainability." },
        ],
      },
      {
        id: "cloud-cost-1",
        title: "Tối ưu chi phí & FinOps",
        titleEn: "Cost Optimization & FinOps",
        level: 5,
        difficulty: "advanced",
        theory: `**FinOps** là văn hóa cộng tác giữa Finance + Engineering + Business để quản lý chi phí cloud một cách dữ liệu hóa.

**3 phase của FinOps (FinOps Foundation):**
1. **Inform**: hiển thị chi phí (tagging, dashboard, allocation).
2. **Optimize**: giảm chi phí (right-size, RI, lifecycle, tắt dev).
3. **Operate**: tự động hóa, đặt budget alert, FinOps culture.

**10 chiến lược tiết kiệm cụ thể:**

1. **Right-sizing** — phân tích metric, đổi xuống instance nhỏ hơn nếu CPU <40%.
2. **Reserved Instance / Savings Plan** — tiết kiệm 30-72% với cam kết 1-3 năm.
3. **Spot Instance** — tiết kiệm 90% cho workload chịu lỗi (batch, CI, ML training).
4. **Auto Scaling** — chỉ chạy đủ instance cần.
5. **Schedule shutdown** — tắt dev/staging ngoài giờ làm việc (\$lệ ~70%).
6. **S3 Lifecycle** — chuyển sang IA/Glacier theo tuổi data.
7. **Delete unused resources** — EBS volume mồ côi, snapshot cũ, Elastic IP không gắn.
8. **Compression + caching** — giảm egress + DB load.
9. **Graviton (ARM)** — tiết kiệm 20-40% so với x86 cho cùng workload.
10. **Region pricing arbitrage** — us-east-1 thường rẻ nhất.

**Tagging Strategy bắt buộc:**
- \`Environment\` (prod/staging/dev)
- \`Owner\` (team/email)
- \`CostCenter\` (mã phòng ban)
- \`Project\` (mã dự án)

**Công cụ:** AWS Cost Explorer, Cost Anomaly Detection, AWS Budgets, Trusted Advisor, third-party (CloudHealth, Vantage, Cloudability).

**Showback vs Chargeback:**
- **Showback**: chỉ hiển thị chi phí cho mỗi team (giáo dục).
- **Chargeback**: thực sự trừ ngân sách team đó (tạo accountability).`,
        theoryEn: `**FinOps** = Finance + Engineering + Business collaboration to manage cloud cost via data.

**3 phases:** Inform (visibility) → Optimize (reduce) → Operate (automate, culture).

**10 saving strategies:** right-sizing, RI/Savings Plan, Spot, auto-scaling, scheduled shutdown, S3 lifecycle, delete orphans, compression+caching, Graviton ARM, region arbitrage.

**Mandatory tags:** Environment, Owner, CostCenter, Project.

**Tools:** Cost Explorer, Anomaly Detection, Budgets, Trusted Advisor, CloudHealth/Vantage.

**Showback (visibility) vs Chargeback (actual budget impact).**`,
        code: `# Phân tích chi phí EC2: tìm instance over-provisioned + tính tiết kiệm
instances = [
    {"id": "i-aaa", "type": "m5.2xlarge", "cpu_avg": 12, "monthly_cost": 280},
    {"id": "i-bbb", "type": "m5.large",   "cpu_avg": 65, "monthly_cost": 70},
    {"id": "i-ccc", "type": "c5.4xlarge", "cpu_avg": 18, "monthly_cost": 500},
    {"id": "i-ddd", "type": "t3.medium",  "cpu_avg": 8,  "monthly_cost": 30},
]

# Right-sizing: nếu CPU <40% → giảm 1 size
size_down = {
    "m5.2xlarge": ("m5.large",  70),     # ~75% rẻ hơn
    "c5.4xlarge": ("c5.xlarge", 125),
    "t3.medium":  ("t3.small",  15),
}

total_save = 0
for inst in instances:
    if inst["cpu_avg"] < 40 and inst["type"] in size_down:
        new_type, new_cost = size_down[inst["type"]]
        save = inst["monthly_cost"] - new_cost
        total_save += save
        print(f"⬇️  {inst['id']} {inst['type']} → {new_type}: tiết kiệm \${save}/tháng (CPU avg {inst['cpu_avg']}%)")

print(f"\\n💰 Tổng tiết kiệm: \${total_save}/tháng = \${total_save*12}/năm")

# Reserved Instance: với i-bbb chạy đều → mua RI 1 năm tiết kiệm thêm ~40%
ri_save = 70 * 12 * 0.40
print(f"💎 RI cho i-bbb: tiết kiệm thêm ~\${ri_save:.0f}/năm")`,
        codeLanguage: "python",
        exercise: "Công ty bạn chi \$50,000/tháng cho AWS (60% EC2, 25% RDS, 10% S3, 5% transfer). Đề xuất 5 hành động cụ thể để giảm 25-30% chi phí.",
        exerciseEn: "Your company spends \$50,000/month on AWS (60% EC2, 25% RDS, 10% S3, 5% transfer). Propose 5 concrete actions to reduce cost by 25-30%.",
        quiz: [
          { question: "What are the 3 phases of FinOps?", options: ["Plan/Build/Run", "Inform/Optimize/Operate", "Buy/Use/Sell", "Dev/Test/Prod"], answer: 1, explanation: "FinOps Foundation phases: Inform (visibility) → Optimize (reduce) → Operate (automate)." },
          { question: "Spot Instances can save up to?", options: ["10%", "30%", "50%", "90%"], answer: 3, explanation: "Spot Instances use spare capacity, saving up to 90% vs on-demand — for interruption-tolerant workloads." },
          { question: "The most COMMON required tags are?", options: ["Color", "Environment + Owner + CostCenter", "Random ID", "Hostname"], answer: 1, explanation: "Standard cost-allocation tags: Environment, Owner, CostCenter, Project." },
          { question: "How much does Graviton (ARM) save vs x86?", options: ["0%", "5%", "20-40%", "80%"], answer: 2, explanation: "Graviton2/3 (ARM) provides 20-40% better price-performance than x86 across many workloads." },
          { question: "How does Chargeback differ from Showback?", options: ["Chargeback only displays cost", "Chargeback actually deducts from team budget", "No difference", "Showback is more expensive"], answer: 1, explanation: "Showback only displays cost (educational); Chargeback actually charges the team's budget (stronger accountability)." },
        ],
      },
      {
        id: "cloud-arch-2",
        title: "Microservices & Event-Driven Architecture",
        titleEn: "Microservices & Event-Driven Architecture",
        level: 5,
        difficulty: "advanced",
        theory: `**Microservices** chia ứng dụng monolith thành nhiều service nhỏ, độc lập deploy.

**Lợi ích:**
- Mỗi team sở hữu 1 service → ship nhanh hơn.
- Scale độc lập (chỉ scale service nào nóng).
- Tech stack đa dạng (mỗi service dùng ngôn ngữ phù hợp nhất).
- Lỗi cô lập (1 service sập không kéo cả app).

**Thách thức:**
- Distributed system complexity (network, latency, partial failure).
- Data consistency (không có ACID xuyên service).
- Observability khó hơn (cần distributed tracing).
- Operational overhead (CI/CD, monitoring, service mesh).

**Khi nào DÙNG microservices?**
- ✅ Team >50 người, nhiều bounded context khác biệt.
- ✅ Cần scale từng phần độc lập.
- ✅ Đã có DevOps maturity tốt.
- ❌ Startup nhỏ, MVP — bắt đầu với **modular monolith**.

**Event-Driven Architecture (EDA)** dùng event để giao tiếp giữa service:
- **Producer** publish event (vd: \`OrderCreated\`).
- **Consumer** subscribe event và xử lý.
- Loose coupling, dễ thêm consumer mới.

**Components AWS:**
- **SQS** — queue (point-to-point, FIFO available).
- **SNS** — pub/sub topic (1-to-many fanout).
- **EventBridge** — event bus với rule routing, schema registry.
- **Kinesis** — streaming data (real-time analytics).
- **Step Functions** — orchestration workflow phức tạp.

**Pattern phổ biến:**
- **CQRS** (Command Query Responsibility Segregation): tách write/read model.
- **Saga**: transaction phân tán bằng chuỗi event + compensating action.
- **Outbox pattern**: đảm bảo "save DB + publish event" atomic.
- **Circuit breaker**: tự ngắt call đến service đang down.`,
        theoryEn: `**Microservices** split monolith into small independent services.

**Pros:** team ownership, independent scaling, polyglot stacks, fault isolation.

**Cons:** distributed complexity, data consistency, harder observability, ops overhead.

**Use when:** large org, distinct bounded contexts, mature DevOps. Avoid for MVPs — start with modular monolith.

**Event-Driven Architecture (EDA):** producer → event → consumer(s). Loose coupling.

**AWS components:** SQS (queue), SNS (pub/sub fanout), EventBridge (event bus + routing), Kinesis (streams), Step Functions (orchestration).

**Patterns:** CQRS, Saga, Outbox, Circuit breaker.`,
        code: `# Event-driven microservice với SNS + SQS + Lambda
# Flow: OrderService publish 'OrderCreated' → SNS → 3 SQS queue → 3 consumer Lambda
# (EmailService, InventoryService, AnalyticsService)

import boto3, json
sns = boto3.client("sns")
sqs = boto3.client("sqs")

# 1. OrderService publish event
def create_order(order):
    # Save order to DB (omitted)
    sns.publish(
        TopicArn="arn:aws:sns:us-east-1:123:OrderEvents",
        Message=json.dumps({
            "type": "OrderCreated",
            "orderId": order["id"],
            "userId": order["userId"],
            "amount": order["total"],
            "items": order["items"],
        }),
        MessageAttributes={
            "eventType": {"DataType": "String", "StringValue": "OrderCreated"}
        },
    )

# 2. EmailService Lambda consumer
def email_handler(event, context):
    for record in event["Records"]:
        msg = json.loads(record["body"])
        order = json.loads(msg["Message"])
        print(f"📧 Send confirmation email for order {order['orderId']}")
        # send_email(...)

# 3. InventoryService Lambda consumer (giảm stock)
def inventory_handler(event, context):
    for record in event["Records"]:
        order = json.loads(json.loads(record["body"])["Message"])
        for item in order["items"]:
            print(f"📦 Decrement stock {item['sku']} by {item['qty']}")

# Lợi ích: thêm AnalyticsService chỉ cần subscribe SNS — không sửa OrderService`,
        codeLanguage: "python",
        exercise: "Thiết kế EDA cho ứng dụng đặt taxi (Uber-like): khi user book, các service Driver-Match, Notification, Pricing, Analytics đều cần biết. Vẽ flow & chọn AWS service phù hợp.",
        exerciseEn: "Design EDA for a taxi-booking app (Uber-like): when a user books, Driver-Match, Notification, Pricing, Analytics services all need to know. Draw the flow & pick suitable AWS services.",
        quiz: [
          { question: "Microservices are NOT suitable for?", options: ["Large org with many teams", "Small startup MVP", "App that scales per part", "Strong DevOps maturity"], answer: 1, explanation: "Small MVPs/startups should start as a monolith or modular monolith — avoid premature complexity." },
          { question: "How does SNS differ from SQS?", options: ["SNS is a queue", "SNS is pub/sub fanout (1-to-many)", "No difference", "SNS is slower"], answer: 1, explanation: "SNS is a pub/sub topic with fanout (1 message → many subscribers); SQS is a point-to-point queue (one consumer per message)." },
          { question: "The Saga pattern solves?", options: ["Auth", "Distributed transactions across services", "Logging", "Caching"], answer: 1, explanation: "Saga replaces distributed ACID transactions with a sequence of local transactions plus compensating actions on failure." },
          { question: "A circuit breaker is used to?", options: ["Speed things up", "Stop calling a downstream service that's failing", "Encrypt data", "Back up data"], answer: 1, explanation: "A circuit breaker detects downstream failure and temporarily halts calls to prevent cascading failures." },
          { question: "The Outbox pattern guarantees?", options: ["Email outbox", "Atomic 'save to DB + publish event'", "Backups", "Encryption"], answer: 1, explanation: "The Outbox pattern writes the event in the same DB transaction; a worker then reads and publishes — ensuring atomicity." },
        ],
      },
    ],
  },
];
