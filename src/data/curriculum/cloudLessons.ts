// Cloud Engineer curriculum - 5 progressive modules
// Tương thích với ExtendedProgrammingModule (cùng schema với SQL/ML/Data Eng)
import type { ExtendedProgrammingModule } from "./types";

export const cloudModules: ExtendedProgrammingModule[] = [
  // ============ MODULE 1: Cloud Fundamentals ============
  {
    id: "cloud-fundamentals",
    title: "Cloud Computing Platform",
    titleEn: "Cloud Computing Fundamentals",
    icon: "☁️",
    color: "from-sky-500 to-blue-600",
    description: "Understand cloud models, IaaS/PaaS/SaaS, major providers (AWS, Azure, GCP)",
    descriptionEn: "Understand cloud models, IaaS/PaaS/SaaS, major providers (AWS, Azure, GCP)",
    course: "cloud",
    lessons: [
      {
        id: "cloud-fund-1",
        title: "What is cloud computing?",
        titleEn: "What is Cloud Computing?",
        level: 1,
        difficulty: "beginner",
        theory: `## 1. 🚦 Vấn đề đời thường

Ngày xưa muốn bán hàng online phải mua server vài chục triệu, thuê phòng máy lạnh, cắm điện 24/7. Giờ chỉ cần mở laptop, vài cú click trên AWS/GCP - có ngay máy chủ chạy. **Cloud computing** = "thuê hạ tầng IT theo phút như thuê Grab".

> 💡 **Mẹo của thầy Hải:** Cloud không phải "máy ảo trên mây" - đó là **mô hình kinh doanh trả theo dùng** (pay-as-you-go), giúp startup khởi nghiệp với 0đ vốn hạ tầng.

## 2. 💡 Khái niệm chính

- **On-premise**: server bạn tự sở hữu, đặt trong văn phòng.
- **Cloud**: server do AWS/GCP/Azure quản lý, bạn thuê.
- **Pay-as-you-go**: dùng bao nhiêu trả bấy nhiêu.
- **Elasticity**: tự co giãn khi traffic tăng/giảm.

## 3. 🧰 5 đặc tính NIST của cloud

1. On-demand self-service (tự click là có).
2. Broad network access (truy cập mọi nơi).
3. Resource pooling (chia sẻ tài nguyên).
4. Rapid elasticity (co giãn nhanh).
5. Measured service (đo đếm để tính tiền).

## 4. 🎯 Ví dụ chạy được ngay

Mở AWS Free Tier → tạo 1 EC2 t2.micro → SSH vào → bạn vừa "thuê server". Hết tháng tắt đi → khỏi tốn xu nào.

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Quên tắt resource → cuối tháng nhận hoá đơn vài trăm USD. Luôn set **billing alert** ngay sau khi tạo account.

## 6. ✅ Best practice

> 💡 **Mẹo của thầy Hải:** Mới học → dùng AWS Free Tier 12 tháng (EC2 t2.micro, S3 5GB, RDS) miễn phí. Đủ để build portfolio.

## 7. 🤔 Khi nào dùng cloud

- ✅ Startup, traffic biến động, cần scale nhanh.
- ❌ Hệ thống cực nhạy cảm (quân sự, ngân hàng lõi) → on-premise.

## 8. 📌 Tóm tắt 30 giây

Cloud = thuê IT theo phút. 5 đặc tính NIST. Pay-as-you-go + elasticity = lý do startup yêu cloud. Luôn bật billing alert.
`,
        theoryEn: `**Cloud Computing** delivers compute resources (servers, storage, databases, network, software) over the Internet on a **pay-as-you-go** model. Instead of investing millions upfront in a data center, you rent infrastructure by the minute/hour and scale instantly when needed.

## Context: why Cloud exploded
Before 2006, every company had to buy servers, build data centers, and hire 24/7 sysadmins. Traffic spike on Black Friday? Site crashed. Traffic drop? Millions in idle hardware.

AWS launched S3 and EC2 in 2006, turning CAPEX into OPEX. Today >95% of businesses use cloud in some form (Gartner 2024).

## 5 essential characteristics (NIST)
NIST defines cloud with 5 traits that distinguish it from regular hosting:

1. **On-demand self-service** - provision via console/API/CLI without contacting a human.
2. **Broad network access** - reachable from any device over standard protocols.
3. **Resource pooling** - multi-tenant shared physical hardware via virtualization.
4. **Rapid elasticity** - scale up/down quickly, often automatically.
5. **Measured service** - precise metering (CPU-second, GB-month) for transparent billing.

## 3 service models (IaaS / PaaS / SaaS)
The more the provider handles, the less you control:

| Model | You manage | Provider manages | Examples |
|---|---|---|---|
| **IaaS** | OS, runtime, app, data | Hardware, virtualization | EC2, Azure VM |
| **PaaS** | App + data | Everything below | Beanstalk, Heroku, App Engine |
| **SaaS** | Config + your data | Everything else | Gmail, O365, Salesforce |

**Pizza analogy:** IaaS = buy ingredients & cook; PaaS = frozen pizza, just bake; SaaS = order delivery.

## 4 deployment models
- **Public** - shared (AWS, Azure, GCP). Cheapest, fastest scale.
- **Private** - dedicated to one org. Maximum control, common in banking/defense.
- **Hybrid** - mix of public + private, linked via VPN / Direct Connect.
- **Community** - shared by orgs in same regulated industry (e.g., HIPAA-compliant health cloud).

## Case study: Netflix
In 2008 Netflix suffered a 3-day database outage on-prem. They went "all-in" on AWS, closed their last data center in 2016. Today Netflix runs 100,000+ EC2 instances serving 250M+ subscribers, using auto-scaling to handle prime-time peaks 10× larger than 3 AM - impossible with self-owned hardware.

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

# For example: run 1 t3.small web server for 720 hours (1 month)
monthly = calculate_cloud_cost(720, "t3.small")
print(f"Cost for 1 month: \${monthly} USD")

# Compare on-premise (buy physical server)
on_prem_capex = 5000  # USD đầu tư ban đầu
months_to_breakeven = on_prem_capex / monthly
print(f"On-prem breakeven later: {months_to_breakeven:.1f} months")`,
        codeLanguage: "python",
        exercise: "Calculate the cost of running 3 m5.large instances for 24 hours. Compare that to running 10 t3.micro instances at the same time.",
        exerciseEn: "Calculate the cost of running 3 m5.large instances for 24 hours. Compare with 10 t3.micro instances for the same time.",
        quiz: [
          { question: "In which model does the CUSTOMER manage the OS?", options: ["SaaS", "PaaS", "IaaS", "FaaS"], answer: 2, explanation: "IaaS - the customer manages OS, runtime, and app. The provider handles hardware and virtualization only." },
          { question: "What does 'Rapid elasticity' mean?", options: ["Fast access", "Quickly scale up/down on demand", "Pay-as-you-go billing", "High security"], answer: 1, explanation: "Rapid elasticity is the ability to automatically scale resources up or down to meet changing demand." },
          { question: "Gmail belongs to which service model?", options: ["IaaS", "PaaS", "SaaS", "DaaS"], answer: 2, explanation: "Gmail is SaaS - ready-to-use software where users don't manage infrastructure or runtime." },
          { question: "How does Public Cloud differ from Private Cloud?", options: ["Public is cheaper", "Public shares infrastructure across multiple customers", "Public is insecure", "No difference"], answer: 1, explanation: "Public Cloud shares infrastructure (multi-tenant) across many customers; Private Cloud is dedicated to a single organization." },
          { question: "Which is NOT a benefit of cloud computing?", options: ["Lower CAPEX", "Global scale", "Completely eliminates security risk", "Pay-as-you-go pricing"], answer: 2, explanation: "Cloud does not eliminate security risk - it follows the Shared Responsibility Model: provider secures the infrastructure, customer secures data & configuration." },
        ],
      },
      {
        id: "cloud-fund-2",
        title: "Big Three: AWS vs Azure vs GCP",
        titleEn: "Big Three: AWS vs Azure vs GCP",
        level: 1,
        difficulty: "beginner",
        theory: `## 1. 🚦 Vấn đề đời thường

Bạn vào quán phở: **IaaS** = mua nguyên liệu sống về tự nấu (linh hoạt, tốn công). **PaaS** = đặt suất set có sẵn rau-thịt, chỉ ăn (đỡ vất vả). **SaaS** = vào quán ăn luôn, không cần nấu nướng.

> 💡 **Mẹo của thầy Hải:** Càng lên cao càng đỡ quản lý hạ tầng - đổi lấy việc ít tuỳ biến hơn.

## 2. 💡 3 mô hình dịch vụ

| Mô hình | Bạn quản | Cloud quản | Ví dụ |
|---------|----------|-----------|-------|
| IaaS | OS, app, data | Server, network | EC2, GCE |
| PaaS | App, data | OS, runtime | Heroku, App Engine |
| SaaS | Data người dùng | Cả ứng dụng | Gmail, Notion |

## 3. 🧰 Khi chọn mô hình

\`\`\`
Cần kiểm soát hệ điều hành → IaaS
Chỉ cần deploy code Python → PaaS
Cần dùng ngay không setup → SaaS
\`\`\`

## 4. 🎯 Ví dụ chạy được ngay

- Build website Django: chọn **PaaS** (Render/Railway) → 5 phút deploy.
- Train model AI có GPU: chọn **IaaS** (AWS EC2 g4dn) để cài CUDA.
- Quản lý team: chọn **SaaS** (Slack, Notion).

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Chọn IaaS chỉ vì "nghe pro" → mất hàng tuần config server, lẽ ra PaaS xong trong 1 ngày.

## 6. ✅ Best practice

> 💡 **Mẹo của thầy Hải:** Startup MVP → bắt đầu PaaS. Khi traffic và chi phí tăng → cân nhắc xuống IaaS để tối ưu.

## 7. 🤔 Khi nào dùng

- ✅ IaaS: cần kiểm soát sâu, workload đặc biệt.
- ✅ PaaS: dev nhanh, app web/api thông thường.
- ✅ SaaS: tool hằng ngày.

## 8. 📌 Tóm tắt 30 giây

IaaS = nguyên liệu, PaaS = set ăn, SaaS = ăn liền. Càng lên cao càng đỡ quản, càng ít tuỳ biến. Chọn theo nhu cầu kiểm soát.
`,
        theoryEn: `**The Big Three** dominate 65%+ of the global cloud market. Knowing the differences helps you pick the right provider - and avoid surprise vendor lock-in.

## Market overview (Synergy Research 2024)
- **AWS** ~32% - #1 since 2006.
- **Azure** ~23% - fastest enterprise growth via Office 365 + OpenAI.
- **GCP** ~11% - strong in data/AI/Kubernetes.

## 1. AWS - king of breadth
Born 2006, 4-5 year head start. **200+ services**. Largest community. **Strongest in:** EC2, S3, Lambda, DynamoDB. **Customers:** Netflix, Airbnb, NASA.

## 2. Azure - king of enterprise hybrid
Leverages Microsoft's 30-year enterprise relationships. **Deep integration** with AD, Office 365, Windows Server. **Strongest in:** Azure AD, Azure DevOps, Azure OpenAI. **Customers:** Walmart, BMW, FedEx.

## 3. GCP - king of data & AI
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
3. Run a real POC - don't trust pricing calculators 100%.
4. Verify compliance certs for your region.
5. Use abstractions (Terraform, K8s) to keep an exit option.

## Anti-patterns
- ❌ Picking AWS just because it's "biggest".
- ❌ Locking into proprietary services for short-term projects.
- ❌ Multi-cloud "for fun" - 3× complexity, no real benefit.

## Next lesson
Lesson 3 covers **Regions, AZs, Edge Locations** - the physical layer beneath every cloud.`,
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
        exercise: "You are using AWS Lambda + S3 + RDS. List equivalent services on Azure and GCP to create a migration comparison table.",
        exerciseEn: "You use AWS Lambda + S3 + RDS. List equivalent services on Azure and GCP for a migration comparison.",
        quiz: [
          { question: "What is the GCP equivalent of AWS S3?", options: ["Blob Storage", "Cloud Storage", "Cloud SQL", "BigQuery"], answer: 1, explanation: "GCP Cloud Storage is the object storage equivalent of AWS S3 and Azure Blob Storage." },
          { question: "Which provider is well-known for Data Analytics with BigQuery?", options: ["AWS", "Azure", "GCP", "IBM"], answer: 2, explanation: "GCP is famous for BigQuery - a blazing-fast serverless data warehouse." },
          { question: "What is AKS?", options: ["AWS Kubernetes service", "Azure Kubernetes service", "GCP Kubernetes service", "A framework name"], answer: 1, explanation: "AKS = Azure Kubernetes Service. Equivalent to EKS (AWS) and GKE (GCP)." },
          { question: "Where does Azure shine the most?", options: ["Pure AI", "Microsoft enterprise integration", "Gaming", "Personal IoT"], answer: 1, explanation: "Azure integrates deeply with the Microsoft ecosystem (Windows Server, Active Directory, Office 365) - a major enterprise advantage." },
          { question: "AWS Lambda is what type of service?", options: ["IaaS", "PaaS", "Serverless / FaaS", "SaaS"], answer: 2, explanation: "AWS Lambda is Function-as-a-Service (FaaS) - a form of serverless computing." },
        ],
      },
      {
        id: "cloud-fund-3",
        title: "Region, AZ and Edge Location",
        titleEn: "Regions, AZs, and Edge Locations",
        level: 2,
        difficulty: "beginner",
        theory: `## 1. 🚦 Vấn đề đời thường

Bạn cần lên Đà Lạt: **Public cloud** = đi xe khách (chia chỗ với khách lạ, rẻ). **Private cloud** = thuê xe riêng (đắt nhưng kín đáo). **Hybrid** = đi xe nhà ra bến rồi lên xe khách. **Multi-cloud** = lúc đi Vietjet, lúc Bamboo - không phụ thuộc 1 hãng.

> 💡 **Mẹo của thầy Hải:** Doanh nghiệp lớn thường multi-cloud để tránh "vendor lock-in" - bị 1 nhà cung cấp giam.

## 2. 💡 4 mô hình triển khai

| Mô hình | Ai dùng | Đặc điểm |
|---------|---------|---------|
| Public | Mọi người | AWS/GCP/Azure công cộng, rẻ |
| Private | 1 tổ chức | Tự host hoặc thuê riêng, kiểm soát cao |
| Hybrid | Trộn 2 trên | Nhạy cảm trên private, còn lại public |
| Multi-cloud | Nhiều nhà cung cấp | Không phụ thuộc, phức tạp quản lý |

## 3. 🧰 Khi nào chọn

\`\`\`
Startup / SME → Public
Bệnh viện, ngân hàng → Hybrid (data nhạy cảm on-prem)
Tập đoàn lớn → Multi-cloud + Hybrid
\`\`\`

## 4. 🎯 Ví dụ chạy được ngay

Một ngân hàng VN: data khách hàng trên private cloud (Vietel IDC), website public trên AWS - hybrid điển hình.

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Multi-cloud nghe hay nhưng tăng độ phức tạp gấp 3 (auth, billing, monitoring). Đừng theo trend nếu chưa đủ team.

## 6. ✅ Best practice

> 💡 **Mẹo của thầy Hải:** Bắt đầu public - khi có yêu cầu tuân thủ (compliance), data nhạy cảm mới chuyển hybrid.

## 7. 🤔 Khi nào dùng

- ✅ Public: 90% startup, dự án mới.
- ✅ Hybrid: tài chính, y tế, chính phủ.
- ✅ Multi-cloud: enterprise tránh lock-in.

## 8. 📌 Tóm tắt 30 giây

Public rẻ và nhanh. Private kiểm soát cao. Hybrid kết hợp. Multi-cloud tránh phụ thuộc. Chọn theo độ nhạy data và quy mô team.
`,
        theoryEn: `**Cloud physical infrastructure** has 3 nested tiers: Region → AZ → Edge. Knowing this lets you design fault-tolerant systems, comply with data laws, and optimize user latency.

## Why it matters
In 2017, AWS us-east-1 went down for 5 hours due to a debug typo - Slack, Trello, Quora, Medium all offline. They all ran single-region. After that, "Multi-AZ" became the gold standard and critical systems went Multi-Region.

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
**One or more data centers** in the same region with isolated power, cooling, networking. AZs are 10-100 km apart - far enough to survive disasters, close enough for <2ms internal latency. Most regions have 3+ AZs.

**Important:** AZ \`us-east-1a\` of account A may be a different physical AZ than account B's "1a" - AWS shuffles names to balance load.

## 3. Edge Location
**CDN PoPs** that cache static content - not full data centers. CloudFront has 600+ edges in 90+ cities. Edges don't run app code (except Lambda@Edge / Cloudflare Workers).

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
Netflix built "Chaos Monkey" to randomly kill EC2 instances in production - forcing engineers to design Multi-AZ. Later "Chaos Kong" randomly kills entire regions.

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
Next module starts **Compute & Storage** - meet EC2 (VM), S3 (object storage), and Docker containers.`,
        code: `# Mô phỏng triển khai Multi-AZ vs Single-AZ
class CloudDeployment:
    def __init__(self, name: str, azs: list[str]):
        self.name = name
        self.azs = azs

    def availability(self) -> float:
        # Each AZ has uptime ~99.95%; probability of ALL collapsing = (1-0.9995)^n
        single_uptime = 0.9995
        all_down = (1 - single_uptime) ** len(self.azs)
        return round((1 - all_down) * 100, 5)

single_az = CloudDeployment("Web app A", ["us-east-1a"])
multi_az  = CloudDeployment("Web app B", ["us-east-1a", "us-east-1b", "us-east-1c"])

print(f"{single_az.name}: {single_az.availability()}%")  # 99.95
print(f"{multi_az.name}:  {multi_az.availability()}%")   # 99.99999...`,
        codeLanguage: "python",
        exercise: "A global SaaS application needs a 99.99% SLA and serves users in the US + Europe + Asia. Let's propose the strategy Region + AZ + Edge Location.",
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
    description: "VM, container, serverless and storage types (block, object, file)",
    descriptionEn: "VMs, containers, serverless and storage types (block, object, file)",
    course: "cloud",
    lessons: [
      {
        id: "cloud-compute-1",
        title: "Virtual Machines (EC2/VM)",
        titleEn: "Virtual Machines (EC2/VM)",
        level: 2,
        difficulty: "beginner",
        theory: `## 1. 🚦 Vấn đề đời thường

Bạn cần "máy tính trên cloud" để chạy app: chọn CPU/RAM/ổ cứng, bật lên, SSH vào - y hệt máy thật. Đó là **EC2** (AWS) hay **Compute Engine** (GCP) - máy chủ ảo (Virtual Machine).

> 💡 **Mẹo của thầy Hải:** EC2 là dịch vụ **kiếm doanh thu lớn nhất AWS**. Hiểu EC2 = hiểu 50% AWS.

## 2. 💡 Khái niệm chính

- **Instance**: 1 máy ảo cụ thể.
- **Instance type**: cấu hình (t2.micro, m5.xlarge…). Chữ cái = họ (general/compute/memory), số = thế hệ.
- **AMI** (Amazon Machine Image): "ảnh đĩa" cài sẵn OS.
- **EBS**: ổ cứng gắn vào instance.
- **Region & AZ**: vùng địa lý + phòng máy.

## 3. 🧰 Tạo EC2 bằng AWS CLI

\`\`\`bash
aws ec2 run-instances \\
  --image-id ami-0abcdef \\
  --instance-type t2.micro \\
  --key-name my-key \\
  --security-group-ids sg-123
\`\`\`

## 4. 🎯 Ví dụ chạy được ngay

Free Tier: tạo \`t2.micro\` + Ubuntu → SSH:

\`\`\`bash
ssh -i my-key.pem ubuntu@<public-ip>
sudo apt update && sudo apt install nginx -y
\`\`\`

→ Trình duyệt mở \`http://<ip>\` → đã có web server!

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Quên gán Security Group mở port 22/80 → SSH/HTTP không vào được mà cứ tưởng máy chết.

## 6. ✅ Best practice

> 💡 **Mẹo của thầy Hải:** Dev → **Spot Instance** (giảm 70-90% giá). Production critical → **On-Demand** hoặc **Reserved**.

## 7. 🤔 Khi nào dùng

- ✅ App cần OS-level control, custom runtime.
- ❌ Code Python đơn giản → Lambda/serverless rẻ hơn.

## 8. 📌 Tóm tắt 30 giây

EC2 = máy ảo trên cloud. Chọn instance type theo workload. Spot rẻ cho dev, On-Demand cho prod. Security Group = firewall.
`,
        theoryEn: `**Virtual Machine (VM)** runs on shared physical hardware via a hypervisor. Core IaaS service and the first building block most engineers touch in cloud.

## Why start with VMs?
VMs are the simplest way to bring an app to cloud - just like an on-prem Linux/Windows server. No container/serverless rewrite needed. This is the classic "lift-and-shift" path.

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

## Case: Airbnb - 5000+ EC2
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
Storage lesson covers **S3 Object Storage** - "infinite", cheap storage that complements EC2.`,
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

# Estimated cost for 1 month
hours = 24 * 30
hourly = 0.0104  # t3.micro on-demand
print(f"Monthly cost: \${hours * hourly:.2f}")`,
        codeLanguage: "python",
        exercise: "A startup running a web app has ~100 req/s during the day, nearly 0 req/s at night. Propose the most economical instance type + pricing strategy.",
        exerciseEn: "A startup runs a web app with ~100 req/s during the day and near 0 at night. Propose the best instance type + pricing strategy.",
        quiz: [
          { question: "Which instance type is CHEAPEST but can be reclaimed?", options: ["On-Demand", "Reserved", "Spot", "Dedicated"], answer: 2, explanation: "Spot Instances use spare capacity, up to 90% cheaper, but AWS can reclaim them with a 2-minute warning." },
          { question: "AMI stands for?", options: ["AWS Memory Image", "Amazon Machine Image", "Auto Mount Instance", "App Module Index"], answer: 1, explanation: "AMI = Amazon Machine Image - a template containing OS + software used to launch instances." },
          { question: "The 'r' instance family (e.g. r5.xlarge) is optimized for?", options: ["GPU", "Heavy compute", "Memory (large RAM)", "Network"], answer: 2, explanation: "The 'r' family is memory optimized - ideal for databases, caches, and in-memory analytics." },
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
        theory: `## 1. 🚦 Vấn đề đời thường

Cần lưu hình ảnh app, video user upload, file backup - không thể nhồi hết vào ổ cứng EC2. **S3** = "Google Drive cho lập trình viên": vô hạn dung lượng, truy cập qua HTTP, trả tiền theo GB lưu + GB tải.

> 💡 **Mẹo của thầy Hải:** S3 = object storage. Phù hợp file (image, video, log). KHÔNG dùng làm database (truy vấn chậm).

## 2. 💡 Khái niệm chính

- **Bucket**: thư mục gốc (tên duy nhất toàn cầu).
- **Object**: 1 file + metadata.
- **Key**: đường dẫn \`folder/subfolder/file.jpg\`.
- **Storage class**: Standard, IA, Glacier (rẻ nhưng chậm).

## 3. 🧰 Cú pháp Python (boto3)

\`\`\`python
import boto3
s3 = boto3.client("s3")
s3.upload_file("local.jpg", "my-bucket", "uploads/local.jpg")
s3.download_file("my-bucket", "uploads/local.jpg", "out.jpg")
\`\`\`

## 4. 🎯 Ví dụ chạy được ngay

URL public:

\`\`\`
https://my-bucket.s3.amazonaws.com/uploads/local.jpg
\`\`\`

Hoặc tạo presigned URL hết hạn sau 1 giờ:

\`\`\`python
url = s3.generate_presigned_url("get_object",
        Params={"Bucket":"my-bucket","Key":"x.jpg"}, ExpiresIn=3600)
\`\`\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Để bucket public + ghi đè key trùng → hacker có thể overwrite. Luôn enable **versioning** + **block public access** trừ khi cần thiết.

## 6. ✅ Best practice

> 💡 **Mẹo của thầy Hải:** File ít truy cập → **Lifecycle rule** tự động chuyển qua Glacier sau 30 ngày, giảm chi phí 80%.

## 7. 🤔 Khi nào dùng

- ✅ Static website, image/video, backup, data lake.
- ❌ Lưu data có quan hệ → DB (RDS, DynamoDB).

## 8. 📌 Tóm tắt 30 giây

S3 = object storage vô hạn. Bucket → object → key. Storage class chọn theo tần suất truy cập. Bật versioning + block public.
`,
        theoryEn: `**Object Storage** uses a flat namespace where each file is a self-describing object with metadata, accessed via HTTP API - fundamentally different from POSIX file systems. It powers data lakes, static sites, backups, and CDNs in modern cloud architectures.

## Why Object Storage?
Before cloud, companies bought expensive NAS/SAN ($10k+) and managed RAID, backup, scaling. Cost grew non-linearly past a few TB. Object Storage solves this with distributed exabyte-scale infrastructure, pay-per-GB pricing, extreme durability, and a simple API. AWS S3 (2006) was AWS's first commercial product and remains the de-facto standard.

## Anatomy of an Object
- **Key** - unique string in the bucket; looks like a path (\`reports/2026/q1.pdf\`) but there are **no real folders**, only prefixes.
- **Value** - binary payload (0 bytes to 5 TB).
- **Metadata** - \`Content-Type\`, \`Cache-Control\`, custom \`x-amz-meta-*\` tags.
- **Version ID** - only when Versioning is enabled; lets you restore deleted/overwritten objects.

## Core S3 Properties
- **Durability 99.999999999% (11 nines)** - statistically, 10M objects lose 1 object per ~10,000 years. Achieved by replicating across ≥3 AZs.
- **Availability 99.99%** (Standard) - ~52 min downtime/year.
- **Strongly consistent** (since 2020): read-after-write returns the latest version immediately.
- **Linear scalability**: billions of objects per bucket; throughput auto-scales.
- **REST API access**: easy to integrate from any language.

## Storage Classes
| Class | Use case | $/GB/mo | Min | Retrieval |
|-------|----------|---------|-----|-----------|
| Standard | Frequent | $0.023 | - | instant |
| Intelligent-Tiering | Unknown patterns | $0.023 + $0.0025 monitor | 30d | instant |
| Standard-IA | <1×/month | $0.0125 | 30d | instant |
| One Zone-IA | IA in 1 AZ | $0.01 | 30d | instant |
| Glacier Instant | Archive, instant | $0.004 | 90d | instant |
| Glacier Flexible | Archive | $0.0036 | 90d | 1 min – 12h |
| Glacier Deep Archive | Long-term | $0.00099 | 180d | 12-48h |

**Real math:** 1 PB for 1 year on Standard = **$289,406**, on Glacier Deep Archive = **$12,457** (96% savings).

## Lifecycle Policies
JSON rules attached to a bucket auto-transition objects by age. Lifecycle reduces **storage cost only**, not retrieval cost. For unpredictable access, use Intelligent-Tiering - S3 measures and moves automatically.

## Case study: Netflix
Netflix stores **>100 PB** on S3 (video masters, analytics logs, ML features). They don't self-host because: (1) cost - building 5+ DCs is hundreds of millions; (2) reliability - 17 years with no Netflix data lost; (3) integration - Spark/Athena read directly; (4) lifecycle - old logs auto-tier to Glacier saving millions/year.

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
- ✅ Block Public Access at account level - default private.
- ✅ Default server-side encryption (SSE-S3 or SSE-KMS).
- ✅ Lifecycle from day 1 - avoid uncontrolled data hoarding.
- ✅ Bucket Policy + IAM Role over access keys; use presigned URLs for temp access.
- ✅ CloudFront in front of S3 - cuts 80-90% egress.
- ✅ S3 Storage Lens - free dashboard with savings recommendations.

## Common Pitfalls
- ❌ Accidentally public buckets (Capital One 2019, ~100M records).
- ❌ No lifecycle → 60% of buckets >1 year hold cold data at Standard pricing.
- ❌ Many tiny objects - request overhead exceeds data; consolidate into Parquet/ORC.
- ❌ Hot-key prefix (legacy issue, mostly auto-sharded now); still randomize prefixes for highest TPS.
- ❌ Unexpected egress: 1 TB to Internet costs ~$90; use CloudFront or Transfer Acceleration.
- ❌ Glacier retrieval at peak: Bulk is cheap ($0.0025/GB) but 5-12h.

## When NOT to use S3
- ❌ Latency <10 ms reads/writes → DynamoDB or ElastiCache.
- ❌ POSIX semantics (lock, append) → EFS or FSx.
- ❌ OLTP DB workloads → RDS/Aurora.

## Bridge to Next Lesson
S3 is one piece of Compute + Storage + Network. Next we cover **Containers & Kubernetes** - running packaged workloads at scale, often paired with S3 for storage.`,
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

# 2. Generate presigned URL (allows temporary download for 1 hour)
url = s3.generate_presigned_url(
    "get_object",
    Params={"Bucket": "my-app-bucket", "Key": "reports/2026/q1-report.pdf"},
    ExpiresIn=3600,
)
print(f"Download link (1h): {url}")

# 3. Lifecycle: switch to Glacier after 90 days
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
        exercise: "Lifecycle design for log storage bucket: first 30 days Standard, 30-90 days Standard-IA, after 1 year Glacier Deep Archive, after 7 years deletion.",
        exerciseEn: "Design a lifecycle for a log bucket: Standard for 30 days, Standard-IA 30-90, Glacier Deep Archive after 1 year, delete after 7 years.",
        quiz: [
          { question: "What durability does S3 promise?", options: ["99.9%", "99.99%", "99.999999999% (11 nines)", "100%"], answer: 2, explanation: "S3 Standard offers 99.999999999% (11 nines) durability - objects are virtually never lost." },
          { question: "Which class is CHEAPEST for long-term archival?", options: ["Standard", "Standard-IA", "Glacier Instant", "Glacier Deep Archive"], answer: 3, explanation: "Glacier Deep Archive (~$0.00099/GB) is the cheapest, but retrieval takes about 12 hours." },
          { question: "Presigned URLs are used to?", options: ["Secure the bucket", "Grant temporary access to a private object", "Speed up downloads", "Encrypt the file"], answer: 1, explanation: "Presigned URLs grant time-limited access to private objects without sharing AWS credentials." },
          { question: "How does S3 store data?", options: ["Block", "File system", "Objects in a bucket", "Database rows"], answer: 2, explanation: "S3 is object storage - data is stored as objects (key + value + metadata) inside buckets." },
          { question: "Which is NOT something a Lifecycle policy can do?", options: ["Move to IA after 30 days", "Delete after 1 year", "Move to Glacier", "Auto-rename files"], answer: 3, explanation: "Lifecycle policies only transition storage class or delete - they cannot rename/key objects." },
        ],
      },
      {
        id: "cloud-compute-2",
        title: "Containers & Kubernetes (EKS/AKS/GKE)",
        titleEn: "Containers & Kubernetes (EKS/AKS/GKE)",
        level: 3,
        difficulty: "intermediate",
        theory: `## 1. 🚦 Vấn đề đời thường

App của bạn chạy local ngon - đem deploy mỗi máy 1 phiên bản Python, library lệch nhau, lỗi tùm lum. **Container (Docker)** đóng gói app + dependencies thành 1 hộp chạy y hệt mọi nơi. **Kubernetes** = "ban quản lý chung cư container".

> 💡 **Mẹo của thầy Hải:** Container ≠ máy ảo. Container chia sẻ kernel OS → nhẹ hơn 100 lần, khởi động trong giây.

## 2. 💡 Khái niệm chính

- **Image**: bản đóng gói (read-only).
- **Container**: instance chạy của image.
- **Dockerfile**: công thức build image.
- **Registry**: nơi lưu image (Docker Hub, ECR).
- **Kubernetes (K8s)**: quản lý hàng trăm container: scale, restart, load balance.

## 3. 🧰 Dockerfile mẫu

\`\`\`dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]
\`\`\`

\`\`\`bash
docker build -t my-app .
docker run -p 8000:8000 my-app
\`\`\`

## 4. 🎯 Ví dụ chạy được ngay

Đẩy lên AWS ECS hoặc Google Cloud Run → có URL public ngay, scale tự động.

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Image to vài GB (do \`python:3.11\` full) → deploy chậm. Dùng \`python:3.11-slim\` hoặc \`alpine\` để giảm xuống dưới 200MB.

## 6. ✅ Best practice

> 💡 **Mẹo của thầy Hải:** Mới học container? Bắt đầu với **ECS Fargate** hoặc **Cloud Run** - dễ hơn K8s nhiều mà vẫn auto-scale.

## 7. 🤔 Khi nào dùng

- ✅ Microservices, dev/prod đồng nhất, CI/CD.
- ❌ Script chạy 1 lần → script Python thường đủ.

## 8. 📌 Tóm tắt 30 giây

Docker = đóng gói app. K8s = điều phối hàng trăm container. Image nhẹ + registry + orchestrator = devops hiện đại.
`,
        theoryEn: `**Containers** package app + dependencies into immutable images that run identically across dev laptops, staging servers, and production clusters. **Docker** is the dominant runtime; **Kubernetes** is the distributed OS that orchestrates thousands of containers. Together they reshaped software deployment in the past decade.

## Containers vs VMs
| Aspect | VM | Container |
|--------|-----|-----------|
| Boot | 30-120s | 0.5-2s |
| Image | 1-10 GB | 50-500 MB |
| Overhead | Full guest OS | Shared kernel only |
| Density/host | 10-30 | 100-1000 |
| Portability | OVF standard | OCI runs anywhere |

VMs virtualize hardware (hypervisor); containers virtualize OS (shared kernel + namespaces + cgroups). Lighter but weaker isolation - use gVisor/Kata for untrusted code.

## Docker layered architecture
Dockerfiles build images as stacked, copy-on-write layers. Best practice: place rarely-changing items (deps) on top, app code on bottom - maximizes cache reuse.

## Kubernetes core concepts
- **Pod** - smallest scheduled unit; 1+ containers sharing network/storage; ephemeral.
- **ReplicaSet** - keeps N pods running.
- **Deployment** - manages ReplicaSets + rolling updates/rollback.
- **Service** - stable endpoint (ClusterIP/NodePort/LoadBalancer).
- **Ingress** - L7 HTTP routing (nginx, ALB Ingress, Traefik).
- **ConfigMap / Secret** - externalize config & secrets.
- **Namespace** - logical partitioning.
- **PersistentVolume + PVC** - storage abstraction (EBS, EFS, S3 CSI).
- **HPA** - autoscale pods on CPU/mem/custom metrics.
- **DaemonSet** - one pod per node (log/monitor agents).
- **StatefulSet** - stable identity + per-pod storage (DBs, Kafka).

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
- ❌ One pod per node - wastes K8s bin-packing.
- ❌ Logs to file inside container - log to stdout instead.
- ❌ Wide cluster-admin RBAC.
- ❌ Autoscaling without PodDisruptionBudget.

## When NOT to use K8s
- ❌ <5 devs, <10 services → ECS/Cloud Run/Heroku is enough.
- ❌ No K8s ops expertise - 6-12 month learning curve.
- ❌ Pure event-driven workloads → Lambda is simpler.

## Bridge to next lesson
Containers run inside a **VPC** - your private virtual network with subnets, routing, firewall. Next we dive into **VPC, Subnets & Routing** to see how EKS pods talk to DBs, Internet, and other services securely.`,
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
        exercise: "Writing a Deployment of Kubernetes for a Node.js API requires 2 replicas, image `mycompany/api:v3`, requires 200m CPU & 256Mi RAM, exposed via Service ClusterIP port 3000.",
        exerciseEn: "Write a Kubernetes Deployment for a Node.js API needing 2 replicas, image `mycompany/api:v3`, request 200m CPU & 256Mi RAM, exposed via ClusterIP Service port 3000.",
        quiz: [
          { question: "What is the smallest deployable unit in Kubernetes?", options: ["Container", "Pod", "Deployment", "Node"], answer: 1, explanation: "A Pod is the smallest unit - it contains one or more containers sharing network/storage." },
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
    title: "Networking & Security",
    titleEn: "Networking & Security",
    icon: "🔐",
    color: "from-indigo-500 to-blue-600",
    description: "VPC, subnet, IAM, security group, encryption, shared responsibility model",
    descriptionEn: "VPC, subnets, IAM, security groups, encryption, shared responsibility model",
    course: "cloud",
    lessons: [
      {
        id: "cloud-net-1",
        title: "VPC, Subnet and Routing",
        titleEn: "VPC, Subnets, and Routing",
        level: 3,
        difficulty: "intermediate",
        theory: `## 1. Vấn đề đời thường

Hãy tưởng tượng bạn thuê một toà nhà văn phòng (cloud account). Nếu để cửa mở toang, bất kỳ ai trong toà nhà cũng vào được phòng bạn - quá nguy hiểm. Bạn cần **một khu riêng có tường, có cổng, có bảo vệ**. Trong cloud, "khu riêng" đó gọi là **VPC** (Virtual Private Cloud - mạng ảo riêng).

Mọi máy chủ cloud (EC2, RDS, Lambda…) đều phải "sống" bên trong một VPC. Không có VPC = không có cloud.

## 2. VPC là gì? - định nghĩa siêu ngắn

**VPC = một mạng riêng (private network) trong cloud, có địa chỉ IP riêng, có firewall riêng, không ai khác thấy được.**

Ví dụ: VPC của bạn có dải IP \`10.0.0.0/16\` → chứa 65,536 địa chỉ IP nội bộ (giống như văn phòng có 65k phòng). Hàng xóm cùng AWS không thấy IP này.

> **CIDR là gì?** \`10.0.0.0/16\` là cách viết tắt cho "dải IP từ 10.0.0.0 đến 10.0.255.255". Số \`/16\` cho biết có bao nhiêu IP. Đừng lo công thức - chỉ cần nhớ \`/16\` = nhiều, \`/24\` = ít (256 IP), \`/28\` = rất ít (16 IP).

## 3. Chia VPC thành các Subnet (khu nhỏ hơn)

VPC quá to → chia thành nhiều **subnet** (mạng con), mỗi subnet có vai trò riêng:

| Loại subnet | Có ra Internet? | Dùng cho |
|---|---|---|
| **Public** | ✅ Có (qua Internet Gateway) | Web server, Load Balancer - cần khách truy cập |
| **Private** | ⚠️ Chỉ ra được, không ai vào (qua NAT) | App server - gọi API ngoài để cập nhật, không cho ai gọi vào |
| **Isolated** | ❌ Không | Database - tuyệt đối không cho ra Internet |

**Quy tắc đời thường**: như nhà bạn - phòng khách (public) đón khách, phòng ngủ (private) chỉ người nhà ra vào, két sắt (isolated) khoá kín.

## 4. Cú pháp tối thiểu - tạo VPC + 2 Subnet

\`\`\`python
import boto3
ec2 = boto3.client("ec2")

# Bước 1: Tạo VPC với dải IP 10.0.0.0/16 (65k IP nội bộ)
vpc = ec2.create_vpc(CidrBlock="10.0.0.0/16")
vpc_id = vpc["Vpc"]["VpcId"]

# Bước 2: Subnet công khai (10.0.1.0/24) - đặt web server
public = ec2.create_subnet(
    VpcId=vpc_id,
    CidrBlock="10.0.1.0/24",      # 256 IP cho subnet này
    AvailabilityZone="us-east-1a" # Đặt trong vùng a
)

# Bước 3: Subnet riêng tư (10.0.2.0/24) - đặt database
private = ec2.create_subnet(
    VpcId=vpc_id,
    CidrBlock="10.0.2.0/24",
    AvailabilityZone="us-east-1b" # Đặt vùng b để chống lỗi 1 vùng
)
\`\`\`

**Đọc từng dòng**:
- Dòng 4: tạo "khu nhà" \`10.0.0.0/16\`.
- Dòng 8–11: cắt 1 phòng \`10.0.1.0/24\` đặt ở vùng a, sau này nối Internet.
- Dòng 14–17: cắt phòng \`10.0.2.0/24\` đặt ở vùng b - tách 2 vùng để 1 vùng chết, app vẫn sống.

## 5. Hai loại firewall - chọn cái nào?

VPC có **2 lớp firewall** dễ nhầm:

| Tên | Đặt ở đâu | Cách hoạt động | Mặc định |
|---|---|---|---|
| **Security Group (SG)** | Quanh **từng máy chủ** | Stateful (nhớ kết nối, return traffic tự cho qua) | Chặn tất cả vào, cho tất cả ra |
| **NACL** | Quanh **cả subnet** | Stateless (phải mở cả 2 chiều) | Cho tất cả qua |

> **Stateful nghĩa là gì?** Như cửa nhà có cảm biến: bạn mở cửa cho khách vào, khi khách đi ra, cửa tự cho qua không hỏi lại. Stateless thì lần nào cũng phải xin phép. SG dễ dùng hơn → dùng SG là chính, NACL chỉ cho trường hợp đặc biệt.

**Best practice**: 99% trường hợp chỉ dùng **Security Group**. NACL chỉ bật khi cần chặn rộng (block 1 dải IP độc).

## 6. Lỗi thường gặp (đắt tiền)

- ❌ **Mở SSH (cổng 22) cho \`0.0.0.0/0\`** - cả thế giới có thể thử mật khẩu. Hacker sẽ tìm thấy trong vài phút. Chỉ mở cho IP văn phòng.
- ❌ **Subnet quá nhỏ** \`/28\` (chỉ 11 IP dùng được) - auto-scale tăng máy lên là hết IP, deploy fail.
- ❌ **Quên bật VPC Flow Log** - khi bị tấn công, không có log để điều tra ai đã làm gì.
- ❌ **Chỉ 1 NAT Gateway cho cả VPC** - vùng đặt NAT chết → toàn bộ private subnet mất Internet. Đặt mỗi vùng 1 cái.
- ❌ **CIDR trùng** giữa 2 VPC khi cần nối với nhau (peering) → phải dựng lại từ đầu.

## 7. Ghi chú nâng cao (đọc khi đã thạo cơ bản)

Khi hệ thống lớn lên, bạn sẽ gặp các khái niệm sau:
- **NAT Gateway**: cổng cho private subnet ra Internet một chiều. Phí ~$32/tháng + $0.045/GB → 1 bug spam call có thể đốt $10k/tháng.
- **VPC Endpoint**: nối thẳng tới S3/DynamoDB **không qua Internet** → tiết kiệm cost + an toàn hơn.
- **VPC Peering / Transit Gateway**: nối 2 hoặc nhiều VPC với nhau (peering = 2 cái, TGW = nhiều cái như "ổ điện trung tâm").
- **Direct Connect / VPN**: nối VPC với data center on-prem (lai cloud).

**Kiến trúc 3-tier chuẩn**: Public subnet (Load Balancer) → Private subnet (app server) → Isolated subnet (database). Mỗi tier ở **2 vùng (AZ)** để chống lỗi.

## 8. Liên hệ bài tiếp theo

VPC trả lời: "Máy chủ nào ở đâu, nối được với ai qua đường nào?". Bài tiếp **IAM** trả lời câu hỏi tiếp theo: "**Người nào / Service nào** được phép **làm gì** trên **tài nguyên nào**?" - tầng kiểm soát danh tính của cloud.`,
        theoryEn: `## 1. Real-world problem
Imagine renting an office building. If you leave doors open, anyone can wander in. You need a private area with walls and a guard. In the cloud, that private area is a **VPC (Virtual Private Cloud)**. Every cloud server (EC2, RDS, Lambda) must live inside one.

## 2. What is a VPC?
A VPC is a private network in the cloud with its own IPs and firewalls. Example: \`10.0.0.0/16\` gives 65,536 internal IPs that nobody else can see. \`/16\` = many; \`/24\` = 256; \`/28\` = 16.

## 3. Subnets - divide the VPC
- **Public**: reachable from Internet (web servers, load balancers).
- **Private**: outbound only via NAT (app servers).
- **Isolated**: no Internet at all (databases).

Like a house: living room (public) for guests, bedroom (private) for family, safe (isolated) locked away.

## 4. Minimal syntax
Create a VPC \`10.0.0.0/16\`, then a public subnet \`10.0.1.0/24\` in AZ \`us-east-1a\` and a private subnet \`10.0.2.0/24\` in \`us-east-1b\` (two AZs for fault tolerance).

## 5. Two firewall layers
| Layer | Scope | Behavior | Default |
|---|---|---|---|
| **Security Group** | Per instance | Stateful (return traffic auto-allowed) | Deny in / Allow out |
| **NACL** | Per subnet | Stateless (allow both directions) | Allow all |
Use SG as your main firewall; NACL only for blanket blocks.

## 6. Common pitfalls
- Opening SSH (port 22) to \`0.0.0.0/0\` - hackers find it in minutes.
- Tiny subnets (/28 = 11 usable IPs) breaking auto-scale.
- Forgetting VPC Flow Logs - no forensics after an incident.
- Single NAT Gateway across AZs - one AZ outage breaks Internet for all private subnets.
- Overlapping CIDRs preventing future VPC peering.

## 7. Advanced notes
- **NAT Gateway**: ~$32/month + $0.045/GB; a runaway bug can burn $10k/month.
- **VPC Endpoints** for S3/DynamoDB stay inside AWS network - cheaper and safer.
- **VPC Peering** connects two VPCs; **Transit Gateway** is a hub for many VPCs.
- **Direct Connect / VPN** bridges VPC to on-prem data centers.

3-tier reference: public (ALB) → private (app) → isolated (DB), each across 2 AZs.

## 8. Bridge to next lesson
VPC controls "where servers live and who can reach them". Next: **IAM** - who is allowed to do what on which resource.`,
        code: `# Tạo VPC + 2 subnet (1 public + 1 private) bằng boto3
import boto3
ec2 = boto3.client("ec2")

# Step 1: Create VPC range 10.0.0.0/16 (65,536 internal IPs)
vpc = ec2.create_vpc(CidrBlock="10.0.0.0/16")
vpc_id = vpc["Vpc"]["VpcId"]

# Step 2: Public subnet in us-east-1a zone (256 IPs)
public = ec2.create_subnet(VpcId=vpc_id, CidrBlock="10.0.1.0/24", AvailabilityZone="us-east-1a")
# Self-assign a public IP when the server starts in this subnet
ec2.modify_subnet_attribute(SubnetId=public["Subnet"]["SubnetId"], MapPublicIpOnLaunch={"Value": True})

# Step 3: Private subnet in us-east-1b zone (1 zone error protection)
private = ec2.create_subnet(VpcId=vpc_id, CidrBlock="10.0.2.0/24", AvailabilityZone="us-east-1b")

# Step 4: Create an Internet Gateway and attach it to the VPC to make the subnet public to the Internet
igw = ec2.create_internet_gateway()
ec2.attach_internet_gateway(VpcId=vpc_id, InternetGatewayId=igw["InternetGateway"]["InternetGatewayId"])

print(f"VPC {vpc_id} available: public={public['Subnet']['SubnetId']}, private={private['Subnet']['SubnetId']}")`,
        codeLanguage: "python",
        exercise: "Design VPC for 3-tier web app (Load Balancer + EC2 app + RDS database) in 2 regions (AZ). List: how many subnets are needed, what type of each subnet (public/private/isolated), and how to open a Security Group for each floor.",
        exerciseEn: "Design a VPC for a 3-tier web app (Load Balancer + EC2 app + RDS) across 2 AZs. List: how many subnets, what type each (public/private/isolated), and how to open Security Groups for each tier.",
        quiz: [
          { question: "How does a Public subnet differ from a Private subnet?", options: ["Public has more IPs", "Public has a route 0.0.0.0/0 → Internet Gateway", "Private runs faster", "No difference"], answer: 1, explanation: "A Public subnet has a route '0.0.0.0/0 → Internet Gateway', so its instances can reach the Internet. A Private subnet lacks this route - it must go through a NAT Gateway to reach the Internet." },
          { question: "What is a NAT Gateway used for?", options: ["Letting public subnets reach the Internet", "Letting private subnets reach the Internet outbound only", "Speeding up DNS", "Storing logs"], answer: 1, explanation: "A NAT Gateway lets instances in a private subnet make outbound calls (e.g. fetch updates, hit external APIs) but blocks any inbound calls from the Internet - keeping private machines safe." },
          { question: "What kind of firewall is a Security Group?", options: ["Stateless at the subnet level", "Stateful at the instance level", "At the VPC level", "At the region level"], answer: 1, explanation: "A Security Group surrounds each instance/ENI and is 'stateful' - when you allow an inbound packet, the response packet is automatically allowed out." },
          { question: "How many IP addresses does the CIDR block 10.0.0.0/16 contain?", options: ["256", "1024", "65,536", "16 million"], answer: 2, explanation: "/16 = 2^(32-16) = 2^16 = 65,536 IPs. Mnemonic: /16 ≈ a large city, /24 = a street (256 IPs), /28 = a few houses (16 IPs)." },
          { question: "How do you connect 2 VPCs in different accounts?", options: ["Internet Gateway", "VPC Peering or Transit Gateway", "NAT Gateway", "Route Table"], answer: 1, explanation: "VPC Peering connects two VPCs directly (even across accounts). For many VPCs + on-prem, use Transit Gateway as a central hub to avoid complex mesh peering." },
        ],
      },
      {
        id: "cloud-iam-1",
        title: "IAM: Identity & Access Management",
        titleEn: "IAM: Identity & Access Management",
        level: 3,
        difficulty: "intermediate",
        theory: `## 1. Vấn đề đời thường

Bạn mở một quán cà phê. **Ai được làm gì?**
- Nhân viên pha chế: vào quầy bar, không vào két.
- Kế toán: mở két, không pha chế.
- Khách: ngồi bàn, không vào quầy.

Trong cloud, danh sách "ai làm được gì" gọi là **IAM** (Identity & Access Management - quản lý danh tính và quyền truy cập). Sai IAM = giao chìa khoá két cho khách → mất tiền, lộ data.

> **Vì sao quan trọng?** Theo Gartner, **>75% sự cố bảo mật cloud do cấu hình IAM sai**. Học IAM tốt = giảm 75% rủi ro.

## 2. IAM trả lời 4 câu hỏi

Mỗi lần ai đó gọi AWS, IAM hỏi:

| Câu hỏi | Tên gọi | Ví dụ |
|---|---|---|
| **Ai?** | Identity (Principal) | User Lan, Lambda function |
| **Làm gì?** | Action | \`s3:GetObject\` (đọc file S3) |
| **Trên cái gì?** | Resource | Bucket \`app-data\` |
| **Khi nào / từ đâu?** | Condition | Chỉ từ IP văn phòng + có MFA |

Có đủ 4 câu trả lời "Allow" thì cho qua, thiếu thì từ chối.

## 3. Bốn nhân vật cần nhớ

| Nhân vật | Là gì? | Khi nào dùng |
|---|---|---|
| **User** | 1 người/account dài hạn, có mật khẩu hoặc access key | Dev đăng nhập console |
| **Group** | Nhóm User, gán quyền chung | Nhóm "Developers" cùng quyền |
| **Role** | Danh tính tạm thời, được "mượn" trong vài giờ | Lambda, EC2, GitHub Actions |
| **Policy** | File JSON ghi quyền (Allow/Deny + Action + Resource) | Gắn vào User/Group/Role |

> **Quy tắc vàng**: Dùng **Role thay cho User** mọi khi có thể. Vì sao? Role tự sinh credential ngắn hạn (15 phút – 12 giờ), tự xoá → nếu bị lộ cũng hết hạn nhanh. User có access key tồn tại mãi → lộ là chết.

## 4. Cú pháp tối thiểu - viết 1 Policy

\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["s3:GetObject"],
    "Resource": "arn:aws:s3:::app-data/*",
    "Condition": {
      "IpAddress": {"aws:SourceIp": "203.0.113.0/24"}
    }
  }]
}
\`\`\`

**Đọc từng dòng**:
- \`Effect: "Allow"\` - Cho phép (hoặc \`"Deny"\` để cấm).
- \`Action: ["s3:GetObject"]\` - Hành động: đọc file trên S3.
- \`Resource: "arn:aws:s3:::app-data/*"\` - Trên bucket tên \`app-data\`, mọi file (\`/*\`).
- \`Condition\` - Chỉ khi IP nguồn thuộc dải văn phòng \`203.0.113.0/24\`.

Hiểu được 4 dòng này là hiểu được 80% IAM.

## 5. Quy tắc đánh giá quyền (đọc kỹ kẻo nhầm)

Khi 1 request đến, IAM kiểm tra theo thứ tự:

1. **Nếu có dòng "Deny"** ở bất kỳ policy nào → **TỪ CHỐI ngay** (Deny luôn thắng).
2. **Nếu có ít nhất 1 dòng "Allow"** → cho qua.
3. **Nếu không có Allow rõ ràng** → **TỪ CHỐI ngầm** (mặc định cấm).

> **Mẹo nhớ**: Cloud mặc định **đóng** mọi cửa. Bạn phải mở từng cánh bằng "Allow". Đã "Deny" thì không có "Allow" nào cứu được.

## 6. Lỗi đắt tiền thường gặp

- ❌ **\`Action: "*"\` + \`Resource: "*"\`** trong production - bằng quyền root, 1 lỗi nhỏ thành thảm hoạ.
- ❌ **Gắn AdministratorAccess cho user thường** "cho nhanh" - quên thu hồi → developer nghỉ việc vẫn xoá được data.
- ❌ **Commit access key lên GitHub** - bot tìm thấy trong vài phút, đào Bitcoin trên account bạn → hoá đơn $50k/đêm.
- ❌ **Trust policy mở \`Principal: "*"\`** - bất kỳ ai trên thế giới mượn được role của bạn.
- ❌ **Tắt CloudTrail** - bị tấn công cũng không biết ai đã làm gì.
- ❌ **MFA chỉ bật cho admin** - user thường bị lừa cũng có thể vào hệ thống.

## 7. Best Practices cốt lõi (8 điểm)

- ✅ **Khoá root account**: bật MFA phần cứng, không tạo access key, chỉ dùng cho việc account/billing.
- ✅ **MFA bắt buộc** cho mọi người dùng (kể cả intern).
- ✅ **Dùng Role** cho EC2/Lambda/EKS - đừng bao giờ hardcode access key vào code.
- ✅ **Least Privilege** (tối thiểu quyền): chỉ cấp đúng quyền cần, không hơn.
- ✅ **AWS SSO / IAM Identity Center** cho công ty - thay vì tạo IAM User cho từng nhân viên.
- ✅ **Secrets Manager** lưu mật khẩu DB/API key - không để trong env var.
- ✅ **CloudTrail bật mọi region** + lưu vào S3 immutable bucket → audit khi có sự cố.
- ✅ **Test policy bằng IAM Policy Simulator** trước khi apply cho production.

## 8. Ghi chú nâng cao (case study + tính năng cao cấp)

**Capital One 2019 - bài học $300 triệu**: 1 IAM Role gắn cho WAF có quyền \`s3:ListBucket\` quá rộng. Hacker khai thác lỗ hổng SSRF → đọc credential → tải 100M record cá nhân. Phạt $80M + thiệt hại $300M. **Bài học**: Least Privilege + Permission Boundary + Block Public Access mặc định.

**Uber 2016 - access key trên GitHub**: Dev commit access key vào repo "private" GitHub. Hacker tìm thấy, tải data 57M user. Uber giấu, trả $100k "bug bounty" → bị phạt $148M năm 2018. **Bài học**: dùng OIDC (GitHub Actions assume role không cần key cố định).

**Tính năng cao cấp** (đọc khi đã thạo cơ bản):
- **SCP** (Service Control Policy): chặn rộng ở cấp Organizations - ví dụ chặn cả region không cho tạo tài nguyên.
- **Permission Boundary**: trần quyền tối đa cho team self-service.
- **ABAC** (Tag-based access): policy dùng tag thay vì list cứng resource.
- **Cross-account AssumeRole + ExternalId**: cho 3rd-party SaaS (Datadog, Snyk) truy cập an toàn.

## 9. Liên hệ bài tiếp theo

IAM kiểm soát "ai làm gì". Bài kế **Shared Responsibility & Encryption** trả lời câu hỏi tiếp theo: "Ai chịu trách nhiệm bảo mật cái gì?" và "Làm sao mã hoá data để dù bị lộ, kẻ tấn công cũng không đọc được?".`,
        theoryEn: `## 1. Real-world problem
Run a coffee shop. Who can do what? Barista at the bar (not the safe). Accountant at the safe (not the bar). Customer at the table only. In the cloud, that "who-can-do-what" list is **IAM**. >75% of cloud security incidents come from misconfigured IAM (Gartner).

## 2. IAM answers 4 questions
WHO (Principal) does WHAT (Action) on WHICH RESOURCE under WHICH CONDITION (IP, MFA, time)?

## 3. Four characters
- **User**: long-term identity (password / access key) for humans.
- **Group**: collection of users, share policies.
- **Role**: temporary identity assumed for 15 min – 12 h. Use for EC2, Lambda, GitHub Actions.
- **Policy**: JSON describing Allow/Deny + Action + Resource + Condition. Attach to User/Group/Role.

**Golden rule**: prefer Role over User - short-lived credentials beat long-lived keys.

## 4. Minimal policy
\`\`\`json
{ "Effect": "Allow",
  "Action": ["s3:GetObject"],
  "Resource": "arn:aws:s3:::app-data/*",
  "Condition": {"IpAddress": {"aws:SourceIp": "203.0.113.0/24"}} }
\`\`\`
Allow reading any object in bucket \`app-data\` only from office IP range.

## 5. Evaluation order
1. Any explicit Deny → DENY.
2. At least one Allow → ALLOW.
3. No Allow at all → implicit DENY.
Cloud is closed by default; every door must be opened with an Allow.

## 6. Common pitfalls
- \`Action: "*"\` + \`Resource: "*"\` in prod.
- AdministratorAccess on regular users.
- Access keys committed to GitHub.
- \`Principal: "*"\` in trust policies.
- CloudTrail off.
- MFA only for admins.

## 7. Best Practices
Lock root + hardware MFA, mandatory MFA for everyone, Roles for services (no hardcoded keys), Least Privilege, AWS SSO for staff, Secrets Manager for DB passwords, CloudTrail in all regions to immutable S3, test with IAM Policy Simulator.

## 8. Advanced notes (case studies)
- **Capital One 2019**: over-broad WAF role → SSRF leaked 100M records, $80M fine + ~$300M total. Use Least Privilege + Permission Boundary + Block Public Access.
- **Uber 2016**: AWS key in private GitHub → 57M users leaked → $148M fine. Use OIDC for GitHub Actions instead of static keys.
Advanced features: SCPs (org-wide guardrails), Permission Boundaries (max ceiling for self-service), ABAC (tag-based access), Cross-account AssumeRole with ExternalId for 3rd-party SaaS.

## 9. Bridge to next lesson
IAM controls "who does what". Next: **Shared Responsibility & Encryption** - who is responsible for which security layer, and how to encrypt data so leaks remain unreadable.`,
        code: `# IAM Policy: cho phép Lambda đọc 1 bucket S3 cụ thể + ghi log CloudWatch
policy = {
  "Version": "2012-10-17",   # Phiên bản chuẩn, luôn để 2012-10-17
  "Statement": [
    {
      "Sid": "AllowS3Read",  # Tên đoạn quyền, đặt cho dễ đọc
      "Effect": "Allow",     # Cho phép (đối lập với Deny)
      "Action": ["s3:GetObject", "s3:ListBucket"],   # Đọc file + liệt kê bucket
      "Resource": [
        "arn:aws:s3:::app-data",        # Bucket (để ListBucket)
        "arn:aws:s3:::app-data/*"       # Mọi file trong bucket (để GetObject)
      ]
    },
    {
      "Sid": "AllowLogs",
      "Effect": "Allow",
      "Action": [                       # Quyền ghi log để debug Lambda
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*"  # Mọi log group ở mọi region
    }
  ]
}

import json
print(json.dumps(policy, indent=2))
# Then: create a Role, attach this policy to the Role, then assign the Role to the Lambda function`,
        codeLanguage: "json",
        exercise: "Write an IAM policy that allows developers to read/write 'dev-uploads' S3 bucket, prohibits deleting objects, only allows access from office IP 203.0.113.0/24. Suggestion: use 2 Statements - 1 Allow for read/write, 1 Deny for delete.",
        exerciseEn: "Write an IAM policy that lets a developer read/write S3 bucket 'dev-uploads', deny delete, accessible only from office IP 203.0.113.0/24. Hint: use 2 Statements - one Allow for read/write, one Deny for delete.",
        quiz: [
          { question: "What is the core principle of IAM?", options: ["Grant maximum permissions for convenience", "Least Privilege - grant only the permissions needed", "One user one policy", "Use root for everything"], answer: 1, explanation: "Least Privilege - grant only the minimum permissions necessary. Cloud security rule #1: it shrinks the 'blast radius' when something goes wrong." },
          { question: "How should EC2 access S3?", options: ["Hardcode access keys in code", "Attach an IAM Role to the EC2", "Make the S3 bucket public", "Share a password"], answer: 1, explanation: "Attaching an IAM Role to EC2 lets AWS issue short-lived, auto-rotating credentials. No hardcoded keys → no risk of leaks on GitHub." },
          { question: "What does MFA stand for?", options: ["Multi-Factor Authentication", "Mass File Access", "Manual Failure Alert", "Memory Function Array"], answer: 0, explanation: "MFA = Multi-Factor Authentication - a second factor (code from an app, USB key…) on top of the password. Enabling MFA blocks ~99% of credential-stuffing attacks." },
          { question: "To block actions at the org level (multi-account), you use?", options: ["Security Group", "NACL", "SCP in AWS Organizations", "IAM Group"], answer: 2, explanation: "Service Control Policies (SCPs) in AWS Organizations apply at the account level - even the root user of a child account can't bypass them. Stronger than regular IAM policies." },
          { question: "Which service logs every AWS API call (who did what, when)?", options: ["CloudWatch", "CloudTrail", "Config", "Inspector"], answer: 1, explanation: "CloudTrail records every API call - must be enabled for auditing and incident investigation. CloudWatch is different - that's metrics & application logs." },
        ],
      },
      {
        id: "cloud-sec-1",
        title: "Shared Responsibility & Encryption",
        titleEn: "Shared Responsibility & Encryption",
        level: 3,
        difficulty: "intermediate",
        theory: `## 1. Vấn đề đời thường

Bạn thuê 1 căn hộ chung cư. Ban quản lý chịu trách nhiệm: tường, mái, thang máy, bảo vệ cổng. **Bạn chịu trách nhiệm**: khoá cửa căn hộ, không cho người lạ vào, không để chìa khoá ngoài cửa.

Nếu bạn để cửa mở rồi mất tiền - **lỗi của bạn**, không phải ban quản lý. Cloud cũng vậy. Mô hình này gọi là **Shared Responsibility Model** (mô hình trách nhiệm chia sẻ).

> **Vì sao quan trọng?** Gartner dự báo đến 2025, **99% sự cố bảo mật cloud sẽ là LỖI KHÁCH HÀNG** - không phải lỗi của AWS/Azure/Google. Hiểu mô hình này = không đổ lỗi sai chỗ.

## 2. Quy tắc "of vs in" - của ai?

| Trách nhiệm | Ai làm? | Ví dụ |
|---|---|---|
| **Security OF the Cloud** | Cloud Provider (AWS/Azure/GCP) | Data center, phần cứng, hypervisor, mạng vật lý |
| **Security IN the Cloud** | **Bạn (khách hàng)** | IAM, Security Group, mã hoá, vá OS, code app, dữ liệu |

**Mẹo nhớ**: "**OF** the cloud" = **bản thân cloud** (provider lo). "**IN** the cloud" = **mọi thứ bạn để vào cloud** (bạn lo).

## 3. Trách nhiệm thay đổi theo loại dịch vụ

Càng dùng dịch vụ "cao cấp" (PaaS/SaaS), provider lo càng nhiều, bạn lo càng ít:

| Tầng | On-prem | IaaS (EC2) | PaaS (RDS) | SaaS (S3) |
|---|---|---|---|---|
| Dữ liệu | **Bạn** | **Bạn** | **Bạn** | **Bạn** |
| IAM (kiểm soát truy cập) | **Bạn** | **Bạn** | **Bạn** | **Bạn** |
| App code | Bạn | Bạn | Bạn | CSP |
| OS, runtime | Bạn | Bạn | CSP | CSP |
| Hardware, network vật lý | Bạn | CSP | CSP | CSP |

> **Quy luật cốt lõi**: dù dùng dịch vụ nào, **DỮ LIỆU + IAM luôn là của BẠN**. AWS không bao giờ thay bạn quyết "ai được đọc data của bạn".

## 4. Mã hoá dữ liệu - 3 trạng thái cần bảo vệ

Data ở 3 trạng thái, mỗi trạng thái có cách bảo vệ riêng:

| Trạng thái | Là gì? | Cách mã hoá |
|---|---|---|
| **At-rest** | Đang nằm trên ổ đĩa | AES-256 trên S3/EBS/RDS (dùng KMS) |
| **In-transit** | Đang truyền qua mạng | TLS 1.2+ (HTTPS, mTLS) |
| **In-use** | Đang xử lý trong RAM/CPU | Confidential Computing (Nitro Enclaves) |

> **Mẹo**: Bật mã hoá at-rest và in-transit là **mặc định**, miễn phí, không lý do gì để tắt. In-use chỉ cần khi xử lý data siêu nhạy cảm (y tế, ngân hàng).

## 5. Cú pháp tối thiểu - bật mã hoá khi upload S3

\`\`\`python
import boto3
kms = boto3.client("kms")
s3  = boto3.client("s3")

# Bước 1: Tạo "khoá chủ" (Customer Master Key) trong KMS
key = kms.create_key(Description="Khoá mã hoá data app")
key_id = key["KeyMetadata"]["KeyId"]

# Bước 2: Upload file lên S3 với mã hoá at-rest dùng khoá vừa tạo
s3.put_object(
    Bucket="my-secure-bucket",
    Key="hop-dong/contract.pdf",
    Body=b"<noi dung file>",
    ServerSideEncryption="aws:kms",   # Bật mã hoá KMS
    SSEKMSKeyId=key_id,                # Dùng khoá nào
)
\`\`\`

**Đọc từng dòng**:
- Dòng 5–7: Tạo 1 khoá mã hoá nằm trong KMS (Key Management Service). Khoá này **không bao giờ rời khỏi AWS** - bạn chỉ "mượn" nó để mã/giải mã.
- Dòng 10–16: Khi upload file, gắn nhãn "mã hoá bằng KMS, dùng khoá X". S3 tự mã hoá trước khi ghi xuống đĩa. Khi đọc lại, S3 tự giải mã (nếu IAM cho phép).

## 6. Lỗi đắt tiền thường gặp

- ❌ **Tin "AWS lo hết bảo mật"** - sai. 99% sự cố là lỗi customer.
- ❌ **Backup cùng account với data gốc** - hacker chiếm account là xoá luôn cả backup. Vụ Code Spaces 2014: hacker xoá EC2 + S3 + backup → công ty đóng cửa trong 6 tiếng.
- ❌ **Public S3 bucket** chứa data nhạy cảm - bot scan tìm thấy trong vài giờ.
- ❌ **TLS 1.0 vẫn bật** vì 1 client cũ - đủ để hacker thực hiện downgrade attack.
- ❌ **Không vá OS** trên EC2 - vụ Equifax 2017: không vá Apache Struts trong 2 tháng → mất 147M record SSN, phạt $1.4 tỷ USD.
- ❌ **Lưu password DB trong env var** thay vì Secrets Manager → leak qua log/config.
- ❌ **Bật GuardDuty nhưng không ai xem alert** → cảnh báo có nhưng không hành động.

## 7. Best Practices cốt lõi (10 điểm)

- ✅ **Mã hoá mặc định** mọi bucket/disk/DB (bật ở account level cho khỏi quên).
- ✅ **TLS 1.2+ everywhere** + HSTS header.
- ✅ **CMK** (Customer-Managed Key) cho data nhạy cảm + bật xoay khoá tự động (1–3 năm).
- ✅ **Backup ở account khác** + S3 Object Lock (bất biến - không xoá được dù root account).
- ✅ **CloudTrail multi-region** → S3 immutable bucket.
- ✅ **GuardDuty + Security Hub + Inspector** (bộ 3 chuẩn) - và **đọc alert** đều đặn.
- ✅ **AWS Config** kiểm tra compliance liên tục (vd: phát hiện bucket nào public, EBS nào chưa mã hoá).
- ✅ **Systems Manager Patch Manager** vá OS hàng tuần.
- ✅ **Secrets Manager** lưu mật khẩu DB, tự xoay 30–90 ngày.
- ✅ **WAF + Shield** cho web app công khai (chống DDoS L7, SQL injection).

## 8. Ghi chú nâng cao (case study + KMS chi tiết)

**Capital One vs Code Spaces - 2 kết cục**:
- **Capital One 2019**: lộ S3 do IAM rộng + WAF SSRF → mất 100M record, phạt $80M. **Khôi phục được** vì có backup ở account khác + audit rõ.
- **Code Spaces 2014** (đã phá sản): hacker chiếm root account (không MFA), xoá toàn bộ EC2 + S3 + **backup trong cùng account**. **6 tiếng** - công ty đóng cửa vĩnh viễn.

→ Bài học: backup phải ở **account khác** + Object Lock immutable.

**Envelope encryption (KMS)**: Dữ liệu lớn dùng DEK (Data Encryption Key - sinh nhanh, mã hoá AES-256). DEK lại được CMK (Customer Master Key trong KMS HSM) mã hoá. KMS không bao giờ thấy plaintext data → an toàn cao.

**Encryption Context**: gắn metadata (vd: \`{"purpose": "user-data"}\`) vào mỗi lần encrypt. Khi decrypt phải đưa đúng context → chống tấn công "wrong-context decrypt".

**Compliance frameworks**: PCI-DSS (thẻ tín dụng), HIPAA (y tế Mỹ - cần BAA), SOC 2 (SaaS B2B), ISO 27001 (quốc tế), GDPR (châu Âu), FedRAMP (chính phủ Mỹ - dùng GovCloud).

## 9. Liên hệ bài tiếp theo

Bảo mật xong, bài kế chuyển sang **vận hành hiện đại** - **Lambda & API Gateway** mở chương Serverless & DevOps: build app không cần quản server, chỉ trả tiền khi code thực sự chạy.`,
        theoryEn: `## 1. Real-world problem
Renting an apartment: building manager handles walls, lifts, security guard. **You** lock your own door and don't leave keys outside. Same in cloud - this is the **Shared Responsibility Model**. Gartner: 99% of cloud security incidents through 2025 are customer mistakes, not provider mistakes.

## 2. "of vs in" rule
- **Security OF the Cloud** = provider's job (data centers, hardware, hypervisor).
- **Security IN the Cloud** = your job (IAM, Security Groups, encryption settings, OS patching, app code, data).

## 3. Responsibility shifts by service model
| Layer | On-prem | IaaS | PaaS | SaaS |
|---|---|---|---|---|
| Data | You | You | You | You |
| IAM | You | You | You | You |
| App | You | You | You | CSP |
| OS / runtime | You | You | CSP | CSP |
| Hardware / network | You | CSP | CSP | CSP |

**Rule**: data + IAM are ALWAYS yours.

## 4. Encrypt 3 data states
- **At-rest** (on disk): AES-256 via KMS for S3/EBS/RDS.
- **In-transit** (over network): TLS 1.2+, mTLS for service mesh.
- **In-use** (in RAM/CPU): Confidential Computing (Nitro Enclaves) for ultra-sensitive data.
At-rest + in-transit are free defaults - never leave them off.

## 5. Minimal example - encrypt S3 upload
Create a KMS Customer Master Key, then \`put_object\` with \`ServerSideEncryption="aws:kms"\` + the key id. KMS holds the key; S3 calls KMS to wrap a per-object data key.

## 6. Common pitfalls
- Believing "AWS handles everything".
- Backups in the same account (Code Spaces 2014 → company shut down in 6 hours).
- Public S3 buckets with sensitive data.
- TLS 1.0 still enabled.
- Unpatched OS (Equifax 2017 → 147M records, $1.4B fine).
- Secrets in env vars instead of Secrets Manager.
- GuardDuty enabled but alerts ignored.

## 7. Best Practices
Default encryption everywhere; TLS 1.2+ + HSTS; CMK with rotation; cross-account backups + S3 Object Lock; multi-region CloudTrail to immutable S3; GuardDuty + Security Hub + Inspector trio; AWS Config continuous compliance; Patch Manager weekly; Secrets Manager with 30–90 day rotation; WAF + Shield for public apps.

## 8. Advanced notes (case studies + KMS)
- **Capital One 2019**: IAM + WAF SSRF leaked 100M records, $80M fine - recovered via cross-account backups.
- **Code Spaces 2014**: hacker took root (no MFA), wiped EC2 + S3 + same-account backups - company died in 6 h.
- **Equifax 2017**: unpatched Apache Struts → 147M SSN records, $1.4B fines.
**Envelope encryption**: app uses fast Data Encryption Key; KMS Customer Master Key wraps the DEK in HSM. **Encryption Context** binds metadata to each encrypt - defends against wrong-context decryption.
Compliance: PCI-DSS, HIPAA (BAA), SOC 2, ISO 27001, GDPR, FedRAMP.

## 9. Bridge to next lesson
Security covered. Next: **Lambda & API Gateway** opens the Serverless & DevOps chapter - build apps without managing servers, paying only when code runs.`,
        code: `# Bật mã hoá khi upload file lên S3 + tạo CMK trong KMS
import boto3
kms = boto3.client("kms")
s3  = boto3.client("s3")

# Step 1: Create Customer Master Key (CMK) in KMS
# This key resides in the AWS HSM, never leaving the KMS
key = kms.create_key(
    Description="Application data encryption key",
    KeyUsage="ENCRYPT_DECRYPT",
    KeySpec="SYMMETRIC_DEFAULT",  # AES-256 đối xứng
)
key_id = key["KeyMetadata"]["KeyId"]

# Step 2: Upload a file to S3 with SSE-KMS encryption
# S3 will automatically call KMS to encrypt the file before writing to the drive
s3.put_object(
    Bucket="my-secure-bucket",
    Key="confidential/contract.pdf",
    Body=b"<binary content>",
    ServerSideEncryption="aws:kms",   # Bật mã hoá bằng KMS
    SSEKMSKeyId=key_id,                # Dùng khoá vừa tạo
)

# Step 3: Turn on default encryption for the entire bucket
# → All files uploaded later are automatically encrypted, no need to declare again
s3.put_bucket_encryption(
    Bucket="my-secure-bucket",
    ServerSideEncryptionConfiguration={
        "Rules": [{
            "ApplyServerSideEncryptionByDefault": {
                "SSEAlgorithm": "aws:kms",
                "KMSMasterKeyID": key_id,
            },
            "BucketKeyEnabled": True,  # Tiết kiệm chi phí KMS API call
        }]
    },
)
print(f"Bucket secured with CMK {key_id}")`,
        codeLanguage: "python",
        exercise: "A fintech stores customer data on RDS PostgreSQL. List 8–10 security measures to apply - divided into 4 groups: (1) Encryption, (2) IAM, (3) Network, (4) Audit/Backup.",
        exerciseEn: "A fintech stores customer data in RDS PostgreSQL. List 8–10 required security measures, grouped into: (1) Encryption, (2) IAM, (3) Network, (4) Audit/Backup.",
        quiz: [
          { question: "Under Shared Responsibility, who patches the OS on an EC2 instance?", options: ["AWS handles it", "The customer (you)", "Both", "Nobody"], answer: 1, explanation: "With IaaS (like EC2), the customer patches the OS. With PaaS (RDS) or SaaS (S3), AWS handles it. Rule of thumb: the more 'self-managed' (IaaS), the more is on you." },
          { question: "What is AWS KMS used for?", options: ["Managing IPs", "Managing encryption keys", "Managing logs", "Managing DNS"], answer: 1, explanation: "KMS = Key Management Service - generates, stores, and rotates encryption keys. Keys live inside an HSM and never leave AWS → no risk of leakage." },
          { question: "TLS 1.2+ protects data in which state?", options: ["At-rest (on disk)", "In-transit (moving over the network)", "IAM", "Backup"], answer: 1, explanation: "TLS protects data **in transit** between client ↔ server. At-rest encryption uses AES-256 on disk, not TLS." },
          { question: "Why is a Customer-Managed Key (CMK) better than an AWS-managed key?", options: ["Cheaper", "You control rotation, audit, and fine-grained access", "It runs faster", "It's automatic"], answer: 1, explanation: "A CMK lets you decide when keys rotate, who can use them, and audit via CloudTrail. AWS-managed keys are simple but lack the fine-grained controls required for compliance like PCI/HIPAA." },
          { question: "Which service uses ML for threat detection?", options: ["KMS", "GuardDuty", "S3", "Lambda"], answer: 1, explanation: "GuardDuty uses ML on VPC Flow Logs + DNS logs + CloudTrail to detect anomalous behavior (Bitcoin mining, leaked keys, lateral movement)." },
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
        theory: `## 1. 🚦 Vấn đề đời thường

Bạn chỉ cần code 1 hàm gửi email khi user đăng ký - vậy mà phải dựng EC2, cài OS, mở firewall, trả tiền 24/7. Quá phí. **Serverless** (AWS Lambda, GCF) = "chỉ trả tiền khi hàm chạy", không cần quản lý server.

> 💡 **Mẹo của thầy Hải:** Serverless KHÔNG phải "không có server" - vẫn có, nhưng AWS lo cho bạn. Bạn chỉ trả theo số lần gọi + thời gian chạy.

## 2. 💡 Khái niệm chính

- **Function**: đoạn code (Python/Node/Go).
- **Trigger**: sự kiện kích hoạt (HTTP, S3 upload, cron, queue).
- **Cold start**: lần gọi đầu tiên chậm hơn (vài trăm ms).
- **Pay-per-invocation**: tính theo số lần + GB-second.

## 3. 🧰 AWS Lambda Python

\`\`\`python
def lambda_handler(event, context):
    name = event.get("name", "world")
    return {"statusCode": 200, "body": f"Hello {name}"}
\`\`\`

Trigger qua API Gateway → có URL public.

## 4. 🎯 Ví dụ chạy được ngay

Workflow phổ biến: User upload ảnh lên S3 → Lambda tự động resize → ghi lại bucket. Không cần server lúc nào cả.

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Lambda có giới hạn 15 phút mỗi lần chạy + 10GB RAM. Job dài hơn → dùng ECS/Batch.

## 6. ✅ Best practice

> 💡 **Mẹo của thầy Hải:** Cold start đau → bật **Provisioned Concurrency** cho function quan trọng, hoặc dùng **Lambda SnapStart**.

## 7. 🤔 Khi nào dùng

- ✅ Webhook, image processing, cron jobs nhẹ, glue logic.
- ❌ App lâu (>15 phút), web socket realtime - dùng container.

## 8. 📌 Tóm tắt 30 giây

Serverless = trả theo lần chạy. Trigger qua HTTP/S3/cron. Hợp glue logic, microservice nhỏ. Cảnh báo cold start + 15-min limit.
`,
        theoryEn: `**Serverless** doesn't mean "no servers" - it means **you don't manage servers**. The cloud handles provisioning, OS patching, scaling, and HA. You write functions and **pay per millisecond of execution**. It is the purest pay-per-use compute model.

## Why Serverless emerged

Even with traditional cloud, you still picked instance types, configured ASG/LB, and paid for idle servers 24/7. AWS Lambda (2014) inverted the model: **"Bring code, not servers."** Azure Functions, GCP Functions, Cloudflare Workers, and Vercel Functions followed.

## Core Lambda concepts

| Concept | Description |
|---|---|
| **Function** | The handler code that runs on event |
| **Runtime** | Node.js, Python, Java, Go, Ruby, .NET, or custom container |
| **Trigger** | S3, API GW, EventBridge, SQS, SNS, DynamoDB Stream, Kinesis, cron |
| **Memory** | 128 MB → 10 GB (more RAM = more vCPU) |
| **Timeout** | Max **15 minutes** per invocation |
| **Concurrency** | Default 1000 parallel executions / region |
| **Layer** | Shared libraries to reduce package size |
| **Execution role** | IAM role granting Lambda access to AWS resources |

## Cold start vs warm start

\`\`\`
Cold: Request → Download code (50-200ms) → Init runtime (50-300ms) → Run handler
Warm: Request → Run handler (<10ms overhead)
\`\`\`
- Java/.NET: 1-3s cold start ❌
- Python/Node.js: 100-500ms ⚠️
- Go/Rust: 50-100ms ✅

**Mitigations:** Provisioned Concurrency (keeps N containers warm), SnapStart (Java), Lambda Power Tuning, prefer Python/Node/Go.

## API Gateway

Provides routing, auth (Cognito/IAM/JWT), throttling, caching, request validation, custom TLS domains, stages, and WebSocket support.

**Three flavors on AWS:**
- **HTTP API** - cheap ($1/M req), fast, simple. **Default choice.**
- **REST API** - expensive ($3.5/M) but full features (caching, validation, WAF).
- **WebSocket API** - bidirectional real-time.

## Real pricing (us-east-1)

\`\`\`
Lambda: $0.20 per 1M requests + $0.0000166667 per GB-second

Example: 5M req/month, 256 MB, 200ms each
- Request: $1.00
- Compute: ~$4.17
- Total: ~$5.17/month

vs EC2 t3.small 24/7: ~$15/month (3x more)
\`\`\`

**Free Tier (forever):** 1M requests + 400,000 GB-seconds / month.

## Case study: Netflix - 1 trillion events/day on Lambda

Netflix uses Lambda for video encoding pipelines (one upload triggers thousands of parallel encodings), A/B testing infra, and CDN cache invalidation. Result: **80% cost reduction** vs always-on EC2 for event-driven workloads.

## Case study: Coca-Cola Freestyle - 50,000 vending machines

Each machine pings telemetry every few hours. Switched from idle EC2 cluster to API Gateway + Lambda + DynamoDB. Saved **65% backend cost** and gained automatic scaling from 0 → thousands.

## Serverless vs Container vs VM

| Criterion | Lambda | Container (ECS/EKS) | VM (EC2) |
|---|---|---|---|
| **Idle cost** | $0 | Cluster cost | 24/7 cost |
| **Cold start** | 100ms-3s | None | None |
| **Max runtime** | 15 min | Unlimited | Unlimited |
| **Scaling speed** | <1s, auto | 30s-2min | 1-3 min |
| **Best for** | Bursty, event-driven | Steady microservices | Legacy, GPU |
| **Vendor lock-in** | High | Low (Docker) | Low |

## Best practices

- ✅ Small single-purpose functions.
- ✅ Stateless - store state in DynamoDB/S3/RDS, not /tmp.
- ✅ Initialize DB clients **outside** the handler to reuse on warm start.
- ✅ Set realistic timeouts (10s typical).
- ✅ Use DLQ for async invokes.
- ✅ CloudWatch Logs + X-Ray + structured JSON logs + correlation IDs.
- ✅ Use Lambda Powertools (official AWS).

## Common pitfalls

- ❌ "Lambda monolith" - one function with 20 endpoints.
- ❌ Sync Lambda → Lambda calls (double-billing, cascade timeouts). Use Step Functions.
- ❌ Direct RDS connections without RDS Proxy → connection storms.
- ❌ Huge packages (>50MB) → slow cold start.
- ❌ Long-running ETL → fails at 15min.
- ❌ SQS polling with batch size 1 → 10x more cost.

## When to use Serverless

✅ **Yes:** APIs <10k RPS, webhooks, image processing, cron jobs, glue code, MVPs.

❌ **No:** Jobs >15 min, strict p99 <50ms, steady high load (>1000 RPS 24/7), long-lived stateful WebSockets, complex stateful workflows (use Step Functions).

## Bridge to next lesson

Next (**Infrastructure as Code**): how do you manage hundreds of Lambdas, API Gateways, IAM roles, and S3 buckets reproducibly and as a team? Answer: Terraform / CloudFormation / SAM - infrastructure in code, version-controlled, deployed via CI/CD.`,
        code: `# AWS Lambda handler (Python) - xử lý API Gateway request
import json

def lambda_handler(event, context):
    """Handle GET /users/{id}"""
    user_id = event["pathParameters"]["id"]

    # Simulate DynamoDB queries
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
        exercise: "Calculate the cost for Lambda to run 5 million requests/month, each request uses 256MB and runs 200ms.",
        exerciseEn: "Calculate the cost for a Lambda running 5 million requests/month, each using 256MB and running 200ms.",
        quiz: [
          { question: "What is the maximum Lambda timeout?", options: ["1 minute", "5 minutes", "15 minutes", "Unlimited"], answer: 2, explanation: "Lambda has a maximum timeout of 15 minutes (900 seconds)." },
          { question: "What is a cold start?", options: ["Lambda errored", "Initial slow invocation while a new container initializes", "Lambda runs at machine boot", "Unrelated"], answer: 1, explanation: "Cold start is the latency of creating a new Lambda container - can be reduced with Provisioned Concurrency." },
          { question: "API Gateway does NOT provide which feature?", options: ["Authentication", "Throttling", "Database storage", "Caching"], answer: 2, explanation: "API Gateway does not store data - that's the job of DynamoDB/RDS." },
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
        theory: `## 1. 🚦 Vấn đề đời thường

Mỗi lần ra production, bạn click chuột tạo 20 resource trên AWS - quên 1 cái là lỗi. Ngày sau muốn tạo môi trường staging y hệt → click lại từ đầu, mất 4 tiếng. **IaC (Infrastructure as Code)** = "viết hạ tầng bằng code, deploy bằng 1 lệnh".

> 💡 **Mẹo của thầy Hải:** Hạ tầng = code → version git, code review, rollback. Đó là cách Netflix, Facebook quản hàng ngàn server.

## 2. 💡 Khái niệm chính

- **Declarative**: mô tả trạng thái cuối (Terraform, CloudFormation).
- **Imperative**: mô tả các bước (Ansible, scripts).
- **State file**: lưu trạng thái hiện tại của hạ tầng.
- **Module**: tái sử dụng cấu hình.

## 3. 🧰 Terraform mẫu

\`\`\`hcl
resource "aws_instance" "web" {
  ami           = "ami-0abc123"
  instance_type = "t2.micro"
  tags = { Name = "web-server" }
}
\`\`\`

\`\`\`bash
terraform init
terraform plan    # xem sẽ thay đổi gì
terraform apply   # deploy
terraform destroy # xoá sạch
\`\`\`

## 4. 🎯 Ví dụ chạy được ngay

1 file \`.tf\` tạo: VPC + 2 subnet + EC2 + Security Group → chạy \`apply\` 5 phút có cả hệ thống.

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** State file chứa secret → đừng commit lên git public. Lưu trên S3 + DynamoDB lock.

## 6. ✅ Best practice

> 💡 **Mẹo của thầy Hải:** 1 module/repo cho dev/staging/prod. Dùng workspace hoặc folder separate để tránh "apply nhầm môi trường".

## 7. 🤔 Khi nào dùng

- ✅ Bất kỳ team nào > 2 người, hạ tầng > 5 resource.
- ❌ POC 1 file index.html → quá overkill.

## 8. 📌 Tóm tắt 30 giây

IaC = hạ tầng dạng code. Terraform là tool đa cloud phổ biến nhất. State file phải bảo vệ. Apply phải qua plan + review.
`,
        theoryEn: `**Infrastructure as Code (IaC)** manages infrastructure (servers, networks, DBs, IAM…) through **version-controlled code files** instead of console clicks or manual CLI. IaC turns infra into software - reviewable, testable, deployable, and rollback-able like application code.

## Why IaC?

Before IaC: admins clicked the console, no one knew how staging differed from prod ("snowflake servers"), DR ran on hand-written runbooks, onboarding took weeks. With IaC: a single \`.tf\` file describes the system; \`terraform apply\` rebuilds it in minutes.

## Concrete benefits

| Benefit | Real value |
|---|---|
| Version control | Git history, blame, rollback |
| Reproducibility | Identical dev/staging/prod |
| Code review | PR review before deploying infra |
| Disaster recovery | Rebuild a region in 30 min, not 3 days |
| Auto documentation | Code IS the doc |
| Compliance | Who/when/why for every resource |
| Cost transparency | Plan reveals cost impact before apply |

## Popular IaC tools

| Tool | Clouds | Language | Strength | Weakness |
|---|---|---|---|---|
| **Terraform** | Multi (AWS/Azure/GCP/K8s) | HCL | Largest community, modules | HCL learning curve |
| **CloudFormation** | AWS | YAML/JSON | Native AWS, free, drift detection | Verbose, AWS-only |
| **AWS CDK** | AWS | TS/Python/Java/Go | Real languages | Two-layer debugging |
| **Pulumi** | Multi | TS/Python/Go/.NET | Real languages + multi-cloud | Smaller community |
| **Ansible** | Multi | YAML | Great for config mgmt | Imperative |
| **AWS SAM** | AWS Serverless | YAML | Optimized for Lambda | Serverless only |

**2024 picks:** Terraform for multi-cloud, CDK for AWS-only TS/Python teams, SAM for pure serverless.

## Core Terraform concepts

| Concept | Description |
|---|---|
| Provider | Cloud plugin (aws, azurerm, google, kubernetes) |
| Resource | A specific resource (\`aws_instance\`, \`aws_s3_bucket\`) |
| Data source | Reference existing resources (\`data "aws_ami"\`) |
| Variable | Input parameter |
| Output | Exported value |
| Module | Reusable code package |
| State file | \`terraform.tfstate\` - code-to-cloud mapping |
| Backend | Where state is stored (S3 + DynamoDB lock) |
| Workspace | Per-env state |

## State file - Terraform's heart

Stores the mapping of code resources to real cloud IDs plus metadata.

**Golden rules:**
1. Always store **remote** (S3 + DynamoDB lock).
2. **Never** edit it by hand - use \`terraform import\` or \`state mv\`.
3. Lock prevents concurrent apply.
4. **Encrypt at rest** - state may contain secrets.
5. Enable S3 versioning for rollback.

## Standard workflow

\`\`\`
init → fmt → validate → plan → apply → destroy
\`\`\`

**Plan symbols:** \`+\` create, \`-\` destroy (warning if DB!), \`~\` in-place update, \`-/+\` replace (data loss risk!).

## Modules - scaling Terraform

Don't copy-paste - write a module once, instantiate per env. Sources: Terraform Registry, your own git, popular ones like \`terraform-aws-modules/vpc/aws\`.

## Case study: Airbnb - 5000+ resources via Terraform

Uses Atlantis (PR automation), per-team module repos, S3+DynamoDB state, and Policy-as-Code (Sentinel) to block dangerous PRs. Result: infra changes went from days to hours; near-zero drift.

## Case study: Capital One - 100% IaC mandate

Post-cloud migration, console is read-only. All changes via PR + CI/CD. Quarterly DR test rebuilds entire staging region in 4h.

## Best practices

- ✅ Remote state + locking from day one.
- ✅ Separate envs (workspace or folder).
- ✅ Pin provider versions.
- ✅ Modularize repeated patterns.
- ✅ Required PR review with \`plan\` output attached.
- ✅ \`fmt\` + \`tflint\` + \`tfsec\` in CI.
- ✅ Standard tags via provider default_tags.
- ✅ \`prevent_destroy\` lifecycle for prod RDS/S3.

## Anti-patterns

- ❌ Manual console edits → drift.
- ❌ Committing state to git.
- ❌ One giant state file for 100 services.
- ❌ No version pinning.
- ❌ Apply from a dev laptop.
- ❌ Hardcoded secrets in .tf files.
- ❌ Over-generic modules with 50 variables.

## When to use

✅ All production cloud workloads - no exception.
⚠️ One-off POCs - ClickOps OK but **delete immediately**.
❌ Don't use IaC for application data (S3 file uploads, DB rows).

## Bridge to next lesson

With IaC in place, we need **CI/CD pipelines** to auto-run \`terraform plan\` on PRs and \`apply\` on merge. Next: **CI/CD & Observability** - build, test, deploy, and monitor with metrics, logs, traces.`,
        code: `# main.tf - tạo VPC + S3 bucket bằng Terraform
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
        exercise: "Write Terraform to create: 1 EC2 t3.micro in the default VPC, attach a security group that allows SSH (port 22) and HTTP (port 80) from 0.0.0.0/0.",
        exerciseEn: "Write Terraform to create: 1 EC2 t3.micro in default VPC, with a security group allowing SSH (22) and HTTP (80) from 0.0.0.0/0.",
        quiz: [
          { question: "What is the Terraform state file used for?", options: ["Storing code", "Tracking the resources you've created", "Storing passwords", "Storing logs"], answer: 1, explanation: "The state file maps code resources to real cloud resources - store remotely with locking for teams." },
          { question: "Which command PREVIEWS changes WITHOUT applying them?", options: ["terraform apply", "terraform plan", "terraform destroy", "terraform init"], answer: 1, explanation: "`terraform plan` shows the changes that would be made without actually applying them." },
          { question: "The MAIN benefit of IaC is?", options: ["Faster than the console", "Version control + reproducibility + reviewability", "It is free", "It self-heals"], answer: 1, explanation: "IaC enables git versioning, reproducible environments, and code review - reducing console-click mistakes." },
          { question: "What is drift?", options: ["A network error", "Difference between code and actual deployed state", "A price increase", "A backup"], answer: 1, explanation: "Drift happens when resources are modified manually so the live state differs from the code - Terraform will revert or warn." },
          { question: "The native AWS IaC tool is?", options: ["Terraform", "CloudFormation", "Ansible", "Chef"], answer: 1, explanation: "CloudFormation is native AWS IaC; Terraform is HashiCorp's multi-cloud tool." },
        ],
      },
      {
        id: "cloud-cicd-1",
        title: "CI/CD & Observability",
        titleEn: "CI/CD & Observability",
        level: 4,
        difficulty: "advanced",
        theory: `## 1. 🚦 Vấn đề đời thường

Dev xong đẩy code lên git → tester clone về test → lead build deploy. Mất 2 ngày cho 1 lần ra mắt. Có **CI/CD** thì: bạn \`git push\` → auto test → auto deploy → 5 phút sau khách hàng đã dùng được.

> 💡 **Mẹo của thầy Hải:** **CI** = Continuous Integration (auto test/build). **CD** = Continuous Deployment (auto release). 2 thứ đi đôi.

## 2. 💡 Khái niệm chính

- **Pipeline**: chuỗi job (lint → test → build → deploy).
- **Runner**: máy chạy job.
- **Artifact**: sản phẩm sau build (jar, image).
- **Environment**: dev/staging/prod.

## 3. 🧰 GitHub Actions mẫu

\`\`\`yaml
name: CI/CD
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: pip install -r requirements.txt
      - run: pytest
  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - run: aws s3 sync ./dist s3://my-site
\`\`\`

## 4. 🎯 Ví dụ chạy được ngay

Push code → tab Actions thấy job xanh → 2 phút sau site live tại \`https://my-site.com\`.

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Hardcode AWS key trong yaml → leak public. Luôn dùng **GitHub Secrets** hoặc OIDC role.

## 6. ✅ Best practice

> 💡 **Mẹo của thầy Hải:** Nhánh \`main\` → auto deploy production. PR → deploy preview environment để QA test trước khi merge.

## 7. 🤔 Khi nào dùng

- ✅ Mọi dự án có > 1 dev, deploy > 1 lần/tuần.
- ❌ Script 1 file chạy 1 lần → manual cũng được.

## 8. 📌 Tóm tắt 30 giây

CI test, CD deploy. GitHub Actions/GitLab CI/Jenkins là 3 tool top. Dùng secret manager. Pipeline phải fast (< 10 phút) để không cản dev.
`,
        theoryEn: `**CI/CD** (Continuous Integration / Continuous Delivery / Continuous Deployment) automates the journey from a developer's commit to production, paired with **observability** to monitor and respond to incidents. It's the backbone of modern DevOps - there's no cloud-native production without CI/CD + observability.

## CI vs CD vs CD

| Term | Meaning | Trigger |
|---|---|---|
| **Continuous Integration** | On commit: build + test + lint + security scan | Each push/PR |
| **Continuous Delivery** | After CI passes: artifact ready, **human clicks deploy** | Manual approval |
| **Continuous Deployment** | After CI passes: auto-deploy to prod | Fully automatic |

Most teams start with Delivery (safer) and move to Deployment once tests, observability, and canaries are mature.

## Popular CI/CD tools

| Tool | Best for | Strengths | Weaknesses |
|---|---|---|---|
| **GitHub Actions** | GitHub repos | Simple YAML, huge marketplace | GitHub lock-in |
| **GitLab CI** | GitLab repos | Built-in, easy self-hosted runners | Heavy UI |
| **Jenkins** | On-prem enterprise | Infinite flexibility, many plugins | High maintenance |
| **AWS CodePipeline** | AWS-native | Deep IAM/ECS/Lambda integration | AWS-only |
| **CircleCI** | Startups | Fast, easy parallelism | Pricey at scale |
| **ArgoCD / Flux** | Kubernetes GitOps | Pull-based, drift detection | K8s-only |

## Deployment strategies

| Strategy | How it works | Risk | When |
|---|---|---|---|
| Recreate | Stop v1, start v2 (downtime) | High | Dev/staging |
| Rolling | Replace instances gradually | Medium | K8s default, common web apps |
| Blue/Green | Two parallel envs, switch LB | Low | Need instant rollback |
| Canary | 5% → 25% → 100% by metric | Very low | High-stakes (Netflix/Amazon) |
| Shadow | Mirror traffic, drop response | Zero | Test new version with real traffic |
| Feature flags | Deploy off, enable per user | Low | A/B testing |

## Observability - Three Pillars

### Metrics (quantitative)
Time-series data: CPU%, latency p50/p95/p99, error rate, RPS, queue length.

**Tools:** CloudWatch, Prometheus + Grafana, Datadog, New Relic, InfluxDB.

**Google SRE 4 Golden Signals:** Latency, Traffic, Errors, Saturation.

### Logs (qualitative)
Detailed events: "User 123 logged in", "Payment failed: insufficient funds".

**Tools:** CloudWatch Logs, ELK, Loki + Grafana, Splunk, Datadog Logs.

**Best practice:** **Structured JSON logs** with correlation IDs.

### Traces (distributed)
The path of one request across services: \`req-ABC → API GW (5ms) → Auth (12ms) → Order (45ms) → Payment (120ms ⚠️)\`.

**Tools:** AWS X-Ray, Jaeger (CNCF), Zipkin, OpenTelemetry (vendor-neutral standard).

## SLI / SLO / SLA

| Term | Definition | Example | Audience |
|---|---|---|---|
| SLI | Measurable indicator | "% requests <200ms" | Engineers |
| SLO | Internal target for SLI | "SLI ≥ 99.9% in 30 days" | Engineering team |
| SLA | Customer contract + penalty | "99.5% uptime or refund 10%" | Customer + Legal |

**Rule:** SLO is always stricter than SLA, providing a buffer.

## Error Budget - economics of reliability

\`\`\`
Error Budget = (1 - SLO) × time
SLO 99.9%/month  → ~43.2 minutes
SLO 99.95%       → ~21.6 minutes
SLO 99.99%       → ~4.32 minutes (4 nines)
SLO 99.999%      → ~26 seconds (5 nines - telco/finance only)
\`\`\`

Budget remaining → ship freely. Budget exhausted → freeze and stabilize.

## Case study: Netflix - Spinnaker + Chaos Engineering

Built Spinnaker (open-source CD), deploys 4000+ times/day with auto-canary. Compares 50+ metrics vs baseline. Bad metrics → auto-rollback. **Chaos Monkey** kills random prod instances to test resilience. Result: faster shipping with 99.99% uptime.

## Case study: Knight Capital - $440M lost in 45 minutes

2012: deployed new code to 8 trading servers - **forgot one**. Old code on the missed server placed wrong orders, losing $440M in 45 minutes; the company collapsed. **Lesson:** full automation, immutable deploys, canaries, auto-rollback.

## CI/CD best practices

- ✅ Trunk-based development + feature flags.
- ✅ Test pyramid (lots of unit, some integration, few E2E).
- ✅ Build artifact once, deploy to many envs.
- ✅ Immutable infrastructure (no SSH, redeploy).
- ✅ Secrets from vault, never in code/committed env files.
- ✅ Approval gate for prod (manual or metric-based).
- ✅ Pipeline as code in git.
- ✅ Track DORA metrics: deploy freq, lead time, MTTR, change failure rate.

## Observability best practices

- ✅ Structured JSON logs with correlation IDs.
- ✅ Sample traces (1-10%) to control cost.
- ✅ Alert on SLOs, not raw CPU%.
- ✅ Runbook attached to each alert.
- ✅ Blameless postmortems after incidents.

## Anti-patterns

- ❌ Deploying from a developer laptop.
- ❌ Skipping tests "because we're in a hurry".
- ❌ Different builds per env → "works on staging, fails on prod".
- ❌ Alerting on everything → fatigue.
- ❌ No rollback plan.
- ❌ Logging secrets/PII → GDPR violation.
- ❌ 100% trace sampling → wrecks budget.

## When to use

✅ **CI/CD:** any project with >1 developer or >1 release/month.
✅ **Observability:** invest from MVP - debugging with data is 100x easier.
⚠️ **Continuous Deployment:** only after canaries + auto-rollback + strong observability.

## Bridge to next lesson

With CI/CD + observability in place, how do we know our overall architecture is "good"? Next: the **AWS Well-Architected Framework** - six pillars (Operational Excellence, Security, Reliability, Performance, Cost, Sustainability) and the classic anti-patterns to avoid.`,
        code: `# .github/workflows/deploy.yml - CI/CD với GitHub Actions
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
        exercise: "A service has an SLO of 99.95% uptime/month. Calculate error budget (allowable minutes of downtime). If you used 30 minutes the first week, how much is left?",
        exerciseEn: "A service has an SLO of 99.95% monthly uptime. Calculate the error budget (allowed downtime in minutes). If 30 min were used in week 1, how much remains?",
        quiz: [
          { question: "What is a canary deployment?", options: ["Deploy 100% immediately", "Deploy gradually 5%→25%→100% while watching metrics", "Deploy only at night", "Automatic rollback"], answer: 1, explanation: "Canary gradually shifts a small portion of traffic, monitors metrics, then expands - reducing risk." },
          { question: "Tracing is used to track?", options: ["CPU usage", "A request's path across multiple services (microservices)", "Disk space", "DNS"], answer: 1, explanation: "Distributed tracing (X-Ray, Jaeger) shows the end-to-end path of a request across services - great for debugging latency." },
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
    title: "Architecture & Cost Optimization",
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
        theory: `## 1. 🚦 Vấn đề đời thường

Ngày khai trương sàn TMĐT, traffic tăng gấp 100. Server đơn nổ tan tành. Khách bỏ giỏ hàng, mất doanh thu. **Cloud architecture** tốt = thiết kế hệ thống biết "co giãn" + "không chết khi 1 phần hỏng".

> 💡 **Mẹo của thầy Hải:** AWS Well-Architected Framework có 6 trụ cột: **Operational, Security, Reliability, Performance, Cost, Sustainability**.

## 2. 💡 Pattern thường gặp

- **N-tier**: web + app + DB tách lớp.
- **Microservices**: mỗi service deploy riêng.
- **Event-driven**: pub/sub qua queue (SQS, Kafka).
- **CQRS**: tách read/write.
- **Auto-scaling**: thêm/bớt server theo CPU/traffic.

## 3. 🧰 Architecture điển hình

\`\`\`
[CloudFront CDN] → [ALB Load Balancer]
   → [Auto Scaling Group: EC2/ECS]
   → [RDS Multi-AZ + Read Replica]
   → [ElastiCache Redis]
   → [S3 Static Assets]
\`\`\`

## 4. 🎯 Ví dụ chạy được ngay

Web Shopify-like cho 100k user/ngày: ALB + 5 EC2 + RDS Multi-AZ + ElastiCache → chịu được 1000 req/s, downtime gần 0.

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Single AZ = 1 phòng máy chết là cả site sập. Luôn deploy ≥ 2 AZ cho production.

## 6. ✅ Best practice

> 💡 **Mẹo của thầy Hải:** **Cache aggressive**: CDN cho static, Redis cho session/data nóng. 80% traffic phải hit cache, không hit DB.

## 7. 🤔 Khi nào áp dụng

- ✅ Production app cần > 99% uptime.
- ❌ POC, dự án 1 user → over-engineer.

## 8. 📌 Tóm tắt 30 giây

6 trụ cột Well-Architected. Multi-AZ bắt buộc. Cache aggressive. Auto-scale theo metric. Loose coupling qua queue/event.
`,
        theoryEn: `**AWS Well-Architected Framework (WAF)** is a set of principles and assessment questions developed by AWS since 2015, based on reviewing thousands of real customer workloads. Goal: give teams a **common language** to evaluate cloud architectures and a **roadmap to improve** along 6 pillars.

WAF isn't a mindless checklist - it's a framework for **asking the right questions**. The free WAR (Well-Architected Review) tool in the AWS Console enables self-assessment.

## Why a framework?

Without a standard, every engineer designs to personal "best practices" - some over-prioritize security, others slash cost dangerously, others over-engineer reliability for an internal 10-user app. WAF balances 6 pillars - you can't max all; you must make **deliberate trade-offs**.

## The 6 Pillars

### 1️⃣ Operational Excellence
Run and monitor systems to deliver business value and continuously improve.

**Practices:** IaC, CI/CD, observability, runbooks, on-call, blameless postmortems, periodic game days.

**Key question:** "If you took 2 weeks off, would the system run itself?"

### 2️⃣ Security (Defense in Depth)
- **Identity:** IAM least privilege, MFA, SSO.
- **Detective:** CloudTrail (all regions), GuardDuty, Security Hub.
- **Infrastructure:** VPC, SG, WAF, Shield.
- **Data:** Encryption at-rest (KMS) + in-transit (TLS 1.2+).
- **Incident response:** runbooks, isolation procedures, forensics.

**Key question:** "If one dev's credential leaks, what could an attacker do?"

### 3️⃣ Reliability
Multi-AZ for prod, multi-region for mission-critical, auto-scaling, **tested** backups, defined RPO/RTO, circuit breakers, retries with exponential backoff, idempotent operations.

**Key question:** "If an AZ dies at 3 AM, does the system self-heal?"

### 4️⃣ Performance Efficiency
Right-sizing, multi-tier caching (CloudFront → ElastiCache → app cache), serverless for bursty workloads, picking the right database (RDS/DynamoDB/Redshift/OpenSearch), CDN for static assets, GPU instances for ML inference.

**Key question:** "What's your p99 latency? Your cost-per-request?"

### 5️⃣ Cost Optimization
Tagging for chargeback, right-sizing + scheduling, RIs/Savings Plans, Spot for batch/training, S3 lifecycle, Cost Anomaly Detection + budget alerts.

**Key question:** "How much AWS spend per $1 of revenue?"

### 6️⃣ Sustainability (added 2021)
Low-carbon regions (eu-north-1, us-west-2), ARM Graviton (~60% less power), serverless + auto-scale (no 24/7 idle), strict right-sizing, removing unused resources.

**Key question:** "If you cut 30% of resources, would the app still work?"

## 5 Design Principles

1. Stop guessing capacity - auto-scale.
2. Test at production scale.
3. Automate to enable experimentation.
4. Allow evolutionary architectures.
5. Drive decisions with data.

## Classic anti-patterns

| Anti-pattern | Consequence | Fix |
|---|---|---|
| Single point of failure | One death = total outage | Multi-AZ ASG + ALB |
| Hardcoded credentials | GitHub leak in minutes | Secrets Manager + IAM Role |
| Untested backups | Disaster = data loss | Quarterly DR drills |
| Over-provisioning | Pay for unused 80% | Right-sizing + Cost Explorer |
| Pure "lift-and-shift" | Cloud cost without cloud benefit | Gradual re-architecture |
| \`*:*\` permissions | Total compromise | IAM least privilege |
| No tagging | Cost blindness | Mandatory tag policy |
| Manual prod deploys | Human error | CI/CD + IaC |
| Default VPC | No segmentation | Custom VPC + tiered subnets |
| Public DB IP | Internet brute-force | Private subnet + bastion/SSM |

## Case study: Capital One - annual WAR reviews

Every prod workload runs WAR yearly: ~60 questions across pillars. **High Risk Issues (HRIs)** must be fixed within SLA (Critical 30 days, High 90). Result: 40% fewer prod incidents over 2 years.

## Case study: Hospital with no DR plan - 7 days of data lost

A US hospital ran its EHR on AWS Multi-AZ but no Multi-Region, no tested backups. A ransomware encrypted RDS snapshots. Backup lifecycle expired after 7 days. **Pillar violations:** Reliability (no RPO defined) + Operational Excellence (no DR drills).

## How to apply WAF

\`\`\`
1. List workloads.
2. Run WAR tool per workload.
3. Answer ~60 pillar questions.
4. Receive HRI list.
5. Build prioritized roadmap with SLAs.
6. Re-review every 6-12 months.
\`\`\`

## Best practices

- ✅ WAR review every prod workload pre-launch and yearly.
- ✅ Balance pillars - don't max one.
- ✅ Document trade-offs ("Accept RPO 1h to cut backup cost 60%").
- ✅ Tier workloads (Tier 0 vs Tier 3) - don't over-engineer Tier 3.
- ✅ Train the team on WAF vocabulary.

## Common pitfalls

- ❌ Treating WAF as a one-off checklist.
- ❌ Maxing Reliability for an internal POC.
- ❌ Ignoring Sustainability "because it doesn't make money".
- ❌ Scoring high but ignoring HRIs.

## When to use

✅ Every AWS production workload.
⚠️ For Tier-3 (internal POCs), focus on Security + Cost only.
❌ Not a replacement for domain-specific design knowledge (e.g., trading systems).

## Bridge to next lesson

Among the 6 pillars, **Cost Optimization** is the one CFOs care about most. Next: **Cost Optimization & FinOps** dives into 10+ concrete strategies, tools, and the FinOps culture - turning cost from a "monthly bill surprise" into a **daily business metric**.`,
        code: `# Well-Architected self-assessment checklist
checklist = {
    "operational_excellence": [
        "IaC (Terraform/CFN) cho 100% infra?",
        "CI/CD automatic deployment?",
        "Is there runbook + on-call rotation?",
    ],
    "security": [
        "Enable MFA for all users?",
        "Encryption at-rest + in-transit?",
        "CloudTrail enabled in all regions?",
        "GuardDuty + Security Hub?",
    ],
    "reliability": [
        "Multi-AZ deployment?",
        "Backup + test restore periodically?",
        "RPO/RTO defined?",
        "Disaster recovery plan tested?",
    ],
    "performance": [
        "Right-sized instance?",
        "Is there caching (CloudFront/ElastiCache)?",
        "Auto Scaling Group configured correctly?",
    ],
    "cost": [
        "Standard tagging for chargeback?",
        "Reserved/Savings Plan for even workload?",
        "Lifecycle S3 → Glacier?",
        "Turn off dev environment after hours?",
    ],
    "sustainability": [
        "Use ARM Graviton when possible?",
        "Low carbon region (eu-north-1)?",
        "Turn off unused resources?",
    ],
}

total = sum(len(v) for v in checklist.values())
print(f"Total assessment questions: {total}")
for pillar, items in checklist.items():
    print(f"\\n[{pillar.upper()}] - {len(items)} items")
    for q in items: print(f"  □ {q}")`,
        codeLanguage: "python",
        exercise: "Applying Well-Architected to the architecture of an e-commerce web app. List 2 specific improvements for each of the 6 pillars.",
        exerciseEn: "Apply Well-Architected to an e-commerce web app. List 2 concrete improvements for each of the 6 pillars.",
        quiz: [
          { question: "Which pillar is the NEWEST (added in 2021)?", options: ["Security", "Reliability", "Sustainability", "Performance"], answer: 2, explanation: "Sustainability is the 6th pillar, added in 2021." },
          { question: "What is RPO?", options: ["Recovery Point Objective", "Real Production Output", "Resource Provisioning Order", "Region Performance Optimizer"], answer: 0, explanation: "RPO = Recovery Point Objective - the maximum amount of data loss you can tolerate (e.g. 1h means hourly backups)." },
          { question: "Which anti-pattern is most dangerous for reliability?", options: ["Good tagging", "Single point of failure", "Auto-scaling", "Multi-AZ"], answer: 1, explanation: "A SPOF (single point of failure) takes the whole system down when one component fails." },
          { question: "The principle 'Stop guessing capacity' means?", options: ["Guess more", "Use auto-scaling to match real demand", "Over-provision by 50%", "Skip monitoring"], answer: 1, explanation: "Cloud enables auto-scaling - no need to guess capacity, just scale to actual demand." },
          { question: "How many pillars does Well-Architected have?", options: ["3", "5", "6", "10"], answer: 2, explanation: "6 pillars: Operational Excellence, Security, Reliability, Performance, Cost, Sustainability." },
        ],
      },
      {
        id: "cloud-cost-1",
        title: "Cost Optimization & FinOps",
        titleEn: "Cost Optimization & FinOps",
        level: 5,
        difficulty: "advanced",
        theory: `## 1. 🚦 Vấn đề đời thường

Cuối tháng nhận hoá đơn AWS: 8.000 USD - sếp xanh mặt. Hoá ra dev quên tắt 5 RDS dev, 200GB EBS không dùng, 3 NAT Gateway cấu hình sai. **Cost optimization** = hồi quang phản chiếu mỗi tháng để cắt chi phí 30-70%.

> 💡 **Mẹo của thầy Hải:** Cloud rẻ chỉ khi bạn hiểu cách tính tiền. Không hiểu → cloud đắt gấp 5 lần on-premise.

## 2. 💡 5 chiến lược cắt giảm

1. **Right-sizing**: chọn instance đúng nhu cầu (đừng m5.4xlarge cho app dùng 5% CPU).
2. **Reserved/Savings Plan**: cam kết 1-3 năm → giảm tới 72%.
3. **Spot instance**: workload có thể bị ngắt → giảm 90%.
4. **Auto-shutdown dev**: tắt EC2/RDS dev ngoài giờ hành chính.
5. **Storage tiering**: file ít dùng → Glacier (rẻ 1/10).

## 3. 🧰 Tool theo dõi

- **AWS Cost Explorer**: phân tích theo service/tag.
- **AWS Budgets**: alert khi vượt ngưỡng.
- **Trusted Advisor**: gợi ý cắt giảm.
- **Compute Optimizer**: gợi ý right-sizing.

## 4. 🎯 Ví dụ chạy được ngay

Tag mọi resource theo \`env=dev/prod\` và \`team=...\` → Cost Explorer chia theo tag → biết ngay team nào tiêu tốn nhất.

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Data transfer giữa AZ/Region tính tiền cao - kiến trúc dàn trải nhiều region không cần thiết → hoá đơn nhân 3.

## 6. ✅ Best practice

> 💡 **Mẹo của thầy Hải:** Set **Budget alert ở 50%, 80%, 100%** của ngân sách dự kiến. Nhận email sớm sửa kịp.

## 7. 🤔 Khi nào áp dụng

- ✅ Mọi tài khoản production.
- ✅ Dev account để tránh "tiền nướng vô tội vạ".

## 8. 📌 Tóm tắt 30 giây

Right-size + Reserved + Spot + Auto-shutdown + Tiering = công thức cắt 50% chi phí. Tag mọi resource. Bật Budget alert.
`,
        theoryEn: `**FinOps** (Cloud Financial Operations) is a **cultural practice combining Finance + Engineering + Business** to maximize the value of cloud spend through data-driven decisions and distributed financial accountability. Standardized by the FinOps Foundation (CNCF/Linux Foundation) since 2019.

> Motto: **"Visibility → Optimization → Operation"** and **"Make engineers care about cost without slowing them down."**

## Why cloud cost is a major problem

On-prem = **CapEx** (one-time approval). Cloud = **OpEx** - pay as you go, and **a single click can create $10K/month of resources** (e.g., a forgotten SageMaker GPU notebook).

- Average **30-35% of cloud spend is wasted** (Flexera 2024).
- Adobe once fixed an Azure forgotten-resource bug saving $80K/month.
- Pinterest spent $170M/year on AWS → saved 15% via FinOps.

## 3 Phases of FinOps

\`\`\`
INFORM      → see costs (tagging, dashboards)
OPTIMIZE    → reduce costs (right-size, RI, lifecycle)
OPERATE     → run continuously (automation, alerts, culture)
\`\`\`

It's a loop, not linear.

## Phase 1 - Inform

**Tools:** Cost Explorer, AWS Budgets, Cost & Usage Report, Cost Anomaly Detection, Trusted Advisor, Compute Optimizer.

**Mandatory tags:** Environment, Owner, CostCenter, Project, Application, DataClassification. Enforce via Service Control Policies - untagged resources can't be created.

## Phase 2 - 10 saving strategies

### 1. Right-sizing (20-40% saving)
CPU avg <40% over 14 days → downsize.

### 2. RI / Savings Plans (30-72%)
| Type | Flexibility | Discount |
|---|---|---|
| EC2 RI Standard 3y All Upfront | Low | ~72% |
| Compute Savings Plan 3y | High | ~66% |
| 1y No Upfront | Medium | ~30% |

Buy RI/SP for baseline (~70% capacity), use on-demand for variable.

### 3. Spot Instances (up to 90%)
Spare capacity, 2-min reclaim warning. Great for batch, CI/CD, ML training, stateless web.

### 4. Auto Scaling
Scale by real metrics, not by guessing.

### 5. Scheduled shutdown (70% for dev)
Stop dev/staging outside work hours: 40h/168h = save ~76%.

### 6. S3 Lifecycle (50-90% for old data)
Standard → IA → Glacier Instant → Deep Archive.

### 7. Delete unused resources
Orphan EBS, old snapshots, unattached EIPs ($3.6/mo each), idle NAT Gateways ($32/mo + traffic).

### 8. Compression + caching
gzip/brotli (70% bandwidth saved), CDN caching reduces S3 GET + egress.

### 9. Graviton ARM (20-40% better price-performance)
M6g/R6g/C6g - most Linux/Java/Python/Go workloads run unmodified.

### 10. Region arbitrage
us-east-1 cheapest; sa-east-1 ~30% pricier. Watch latency + data residency (GDPR).

## Phase 3 - Operate

- Budget alerts at 50%, 80%, 100%.
- Anomaly Detection → Slack/Email.
- Tagging enforced via SCP.
- FinOps champions per team.
- Showback dashboards per team.
- Chargeback (actually deduct from team budget).

## Showback vs Chargeback

| | Showback | Chargeback |
|---|---|---|
| How | Display cost (educational) | Actually charge team |
| Accountability | Medium | High |
| Political risk | Low | High (needs data culture) |
| Best for | Starting FinOps | Mature orgs |

Start with Showback for 6-12 months, then upgrade to Chargeback.

## Case study: Pinterest - saves $25M/year

Compute Savings Plans for 70% baseline + Graviton migration + Spot for data pipelines + S3 Intelligent-Tiering for 200PB photos = **15% reduction = $25M/year**.

## Case study: Adobe - $80K/month leak

A dev forgot a SageMaker p3.16xlarge ($25/hour) notebook. Two months later: $160K wasted. Lesson: budget alerts + auto-shutdown idle notebooks.

## Case study: Snap - FinOps culture

Public cost dashboards for every engineer. Each new feature needs **cost-per-DAU estimate**. Engineers rewarded for cost-saving ideas. Reduced cost from $2/user/year to $0.60/user/year in 3 years.

## Best practices

- ✅ Tag from day one - retro-tagging is brutal.
- ✅ Budget alerts on every account.
- ✅ Weekly cost review in standups.
- ✅ Cost as a feature - include cost-per-request in design docs.
- ✅ Mandatory Compute Savings Plan for baseline.
- ✅ Spot for any fault-tolerant workload.
- ✅ Auto-shutdown dev/staging on weekends.
- ✅ Quarterly waste audit.

## Common pitfalls

- ❌ "Optional" tagging → useless dashboards.
- ❌ Over-buying RI → locked into workloads you abandon.
- ❌ Cutting cost while neglecting reliability/perf → bad UX.
- ❌ Pushing all cost responsibility to finance - engineers ignore it.
- ❌ Race-to-the-bottom that breaks SLOs.

## When to use

✅ Always - even startups (cloud costs spiral fast).
⚠️ Don't slash cost during a hyper-growth ship-feature phase.
❌ Doesn't apply to on-prem (use traditional IT asset management).

## Bridge to next lesson

The final lesson (**Microservices & Event-Driven Architecture**) tackles how to scale from a monolith to many independent services while maintaining the reliability + cost optimization just learned. SQS, SNS, EventBridge, Saga, and CQRS will be analyzed in detail.`,
        code: `# Phân tích chi phí EC2: tìm instance over-provisioned + tính tiết kiệm
instances = [
    {"id": "i-aaa", "type": "m5.2xlarge", "cpu_avg": 12, "monthly_cost": 280},
    {"id": "i-bbb", "type": "m5.large",   "cpu_avg": 65, "monthly_cost": 70},
    {"id": "i-ccc", "type": "c5.4xlarge", "cpu_avg": 18, "monthly_cost": 500},
    {"id": "i-ddd", "type": "t3.medium",  "cpu_avg": 8,  "monthly_cost": 30},
]

# Right-sizing: if CPU <40% → reduce 1 size
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
        print(f"⬇️ {inst['id']} {inst['type']} → {new_type}: save \${save}/month (CPU avg {inst['cpu_avg']}%)")

print(f"\\n💰 Total savings: \${total_save}/month = \${total_save*12}/year")

# Reserved Instance: with i-bbb running smoothly → buy RI for 1 year and save ~40% more
ri_save = 70 * 12 * 0.40
print(f"💎 RI for i-bbb: additional savings ~\${ri_save:.0f}/year")`,
        codeLanguage: "python",
        exercise: "Your company spends \$50,000/month on AWS (60% EC2, 25% RDS, 10% S3, 5% transfer). Propose 5 specific actions to reduce costs by 25-30%.",
        exerciseEn: "Your company spends \$50,000/month on AWS (60% EC2, 25% RDS, 10% S3, 5% transfer). Propose 5 concrete actions to reduce cost by 25-30%.",
        quiz: [
          { question: "What are the 3 phases of FinOps?", options: ["Plan/Build/Run", "Inform/Optimize/Operate", "Buy/Use/Sell", "Dev/Test/Prod"], answer: 1, explanation: "FinOps Foundation phases: Inform (visibility) → Optimize (reduce) → Operate (automate)." },
          { question: "Spot Instances can save up to?", options: ["10%", "30%", "50%", "90%"], answer: 3, explanation: "Spot Instances use spare capacity, saving up to 90% vs on-demand - for interruption-tolerant workloads." },
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
        theory: `## 1. 🚦 Vấn đề đời thường

App của bạn ngày 100 user, nửa năm sau 1 triệu user. Kiến trúc cũ chịu không nổi. Phải biết các pattern **scale**: caching, queue, sharding, read replica… để không phải viết lại từ đầu.

> 💡 **Mẹo của thầy Hải:** Scale có 2 loại - **vertical** (server to hơn) dễ nhưng có giới hạn; **horizontal** (nhiều server) khó nhưng vô hạn.

## 2. 💡 Pattern nâng cao

- **Caching**: CDN, Redis, query cache.
- **Queue/Async**: SQS, Kafka, RabbitMQ → tách workload chậm khỏi request.
- **Read replica**: nhiều DB read, 1 DB write.
- **Sharding**: chia data theo user_id mod N.
- **Circuit breaker**: ngắt service hỏng để không lan.
- **Saga pattern**: distributed transaction qua chuỗi event.

## 3. 🧰 Caching layered

\`\`\`
[Client] → [CDN edge cache] → [ALB] → [App memory cache] 
       → [Redis cluster] → [DB primary]
\`\`\`

## 4. 🎯 Ví dụ chạy được ngay

Email gửi user → đẩy vào SQS → worker pool xử lý async → response trả về < 100ms thay vì chờ 3s.

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Cache invalidation là 1 trong 2 bài toán khó nhất CS. Sai TTL → user thấy data cũ. Phải có chiến lược rõ ràng.

## 6. ✅ Best practice

> 💡 **Mẹo của thầy Hải:** Áp dụng **CAP theorem**: pick 2 trong 3 (Consistency, Availability, Partition tolerance). Hệ thống lớn thường chọn AP + eventual consistency.

## 7. 🤔 Khi nào áp dụng

- ✅ App > 10k DAU, growth nhanh.
- ❌ POC, MVP → keep it simple.

## 8. 📌 Tóm tắt 30 giây

Cache, queue, replica, sharding, circuit breaker, saga. Hiểu CAP. Don't over-engineer khi chưa scale tới.
`,
        theoryEn: `**Microservices Architecture** splits an application into **many small, independently deployed services** communicating via API/event. Each service is owned by one team, can use a different tech stack, and scales independently. **Event-Driven Architecture (EDA)** is how microservices communicate **asynchronously through events** instead of direct REST calls - reducing coupling and increasing resilience.

> "Microservices isn't a free lunch - you trade monolith complexity for distributed-system complexity." - Sam Newman, *Building Microservices*

## Why microservices?

Traditional monoliths struggle with org scale:
- 5M-line codebase + 100 devs → merge hell, week-long deploys.
- One module bug → redeploy everything.
- Whole app must scale even if only one module is hot.
- Single tech stack lock-in.

Netflix (2009-2012), Amazon (2002 "two-pizza teams"), and Uber pioneered microservices at scale.

## Pros

| Benefit | Explanation |
|---|---|
| Independent deployment | Team A deploys 50x/day independently of Team B |
| Per-part scaling | Scale Search on Black Friday, not Auth |
| Polyglot | Recommendation in Python, Payment in Java, Notification in Go |
| Fault isolation | Recommendation outage doesn't kill Checkout |
| Team ownership | "You build it, you run it" (Werner Vogels) |
| Tech evolution | Migrate one service to new tech without rewriting all |

## Costs

| Challenge | Description |
|---|---|
| Distributed complexity | Network failure, partial failure, consistency |
| Data consistency | No cross-service ACID → need Saga, eventual consistency |
| Harder observability | One request → 20 services → need distributed tracing |
| Ops overhead | CI/CD × N, monitoring × N, on-call × N |
| Service mesh / API gateway | New infra layer (Istio, Linkerd, Kong) |
| Skill demand | Team must know Docker, K8s, queues, event sourcing |
| Higher latency | Network hops vs in-memory calls |
| Testing complexity | Integration tests need N services - use contract testing |

## When to use microservices?

✅ Large org (>50 devs), distinct bounded contexts (DDD), differentiated scaling needs, mature DevOps + platform team.

❌ Small startups, MVPs, simple CRUD, teams new to distributed systems.

> Martin Fowler's **Monolith First** rule: *"Don't start with microservices."*

## Modular Monolith - wise middle ground

Same single deploy but strict module boundaries (separate DB schemas, public APIs). Extract a module to a microservice **only when** it really needs independent scaling. Shopify, GitHub, and Basecamp still run massive modular monoliths.

## Event-Driven Architecture (EDA)

\`\`\`
SYNC: Order ──HTTP→ Email
              ──HTTP→ Inventory
              ──HTTP→ Analytics
(Order knows & depends on all three; one outage kills the order)

ASYNC: Order ──"OrderCreated"→ [Event Bus]
                               ↓
                  Email   Inventory   Analytics
                 (sub)     (sub)       (sub)
(Order knows nothing about consumers; add new ones by subscribing)
\`\`\`

## AWS components for EDA

| Service | Pattern | Use case |
|---|---|---|
| **SQS** | Queue (1-1) | Decouple, retry, DLQ |
| **SNS** | Pub/Sub fanout | Notify many consumers |
| **EventBridge** | Event bus + routing | Event apps, SaaS integration |
| **Kinesis Streams** | Streaming | Real-time analytics, clickstream |
| **Kinesis Firehose** | Streaming → S3/Redshift | Log aggregation, ETL |
| **Step Functions** | Orchestration | Saga, multi-step workflows |
| **MSK** | Managed Kafka | Event sourcing, strict ordering |

## SQS vs SNS vs EventBridge vs Kinesis

| | SQS | SNS | EventBridge | Kinesis |
|---|---|---|---|---|
| Pattern | Queue 1-1 | Pub/Sub fanout | Event bus + routing | Streaming |
| Throughput | High | High | Medium | Very high (MB/s) |
| Ordering | FIFO option | No | No | Per-shard |
| Retention | 14 days | Immediate | 24h archive | 7-365 days |
| Best for | Job queue | Notify many | SaaS integration | IoT, logs, clickstream |

## Classic patterns

1. **API Gateway** - single entry point routes to services.
2. **Service Discovery** - Consul, Cloud Map, K8s DNS.
3. **Circuit Breaker** - open the circuit when downstream fails to avoid cascading.
4. **Saga** - sequence of local transactions + compensating actions, via Choreography (events) or Orchestration (Step Functions).
5. **CQRS** - separate write (DynamoDB/RDS) and read (ES, replicas) models.
6. **Event Sourcing** - store the event log, not current state; replay to rebuild.
7. **Outbox** - atomic "save DB + publish event" via DB transaction + worker.
8. **Strangler Fig** - migrate from monolith piece by piece via API gateway routing.

## Case study: Netflix - 700+ microservices

One user view → ~100 service calls (auth, recommendation, billing, video metadata, CDN). Uses Apache Kafka for events, Hystrix for circuit breaking, Chaos Monkey to randomly kill services in prod and test resilience.

## Case study: Uber - domain-oriented refactor

Had 4000+ microservices → too complex → reorganized into ~50 **domains** (Rider, Driver, Trip, Pricing, Maps), each containing 10-50 related services.

## Case study: Stitch Fix - modular monolith works

Stitch Fix kept a Rails modular monolith with only a few ML microservices. CTO wrote *"We don't need microservices - we need modules"* and they scaled to $2B revenue.

## Best practices

- ✅ Bounded contexts (DDD) - split by business capability.
- ✅ Database per service.
- ✅ API contract first (OpenAPI/Protobuf) + contract testing.
- ✅ Async events as default; sync REST only when truly needed.
- ✅ Idempotent operations (events can deliver twice).
- ✅ Distributed tracing from day one.
- ✅ Service mesh (Istio, App Mesh) when >20 services.
- ✅ Clear API versioning (\`/v1/users\`).

## Anti-patterns

- ❌ **Distributed monolith** - services that must release together.
- ❌ Shared database across services.
- ❌ Long sync chains (A → B → C → D) - cascading failures.
- ❌ Nano-services (one CRUD operation per service).
- ❌ Skipping observability → 3-day incident debugging.
- ❌ Hand-rolled saga in app code - use Step Functions.
- ❌ Starting with microservices on day one with 5 devs.

## When to use

✅ Microservices: large orgs, distinct domains, differentiated scaling, mature DevOps.
✅ EDA: loose coupling, async workflows, multiple consumers, audit trail.
❌ Small startups → modular monolith. Simple sync workflow → REST. Inexperienced teams → train first.

## Bridge - Cloud Engineer course conclusion

You've completed 5 Cloud Engineer modules:
1. Cloud Fundamentals
2. Compute & Storage
3. Networking & Security
4. DevOps & Automation
5. Architecture & Cost

**Next steps:** pick a deeper pillar:
- **Data Engineering** - pipelines, ETL, warehousing on cloud.
- **AI Foundation + ML** - train and serve models on cloud (SageMaker, Bedrock).
- **Advanced SQL** - query optimization for cloud data warehouses.

Or take the **AWS Solutions Architect Associate** certification to formalize your knowledge!`,
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

# 3. InventoryService Lambda consumer (reduce stock)
def inventory_handler(event, context):
    for record in event["Records"]:
        order = json.loads(json.loads(record["body"])["Message"])
        for item in order["items"]:
            print(f"📦 Decrement stock {item['sku']} by {item['qty']}")

# Benefit: adding AnalyticsService just requires subscribing to SNS - no editing of OrderService`,
        codeLanguage: "python",
        exercise: "EDA design for a taxi booking application (Uber-like): when a user books, the Driver-Match, Notification, Pricing, and Analytics services all need to be known. Draw the flow & choose the appropriate AWS service.",
        exerciseEn: "Design EDA for a taxi-booking app (Uber-like): when a user books, Driver-Match, Notification, Pricing, Analytics services all need to know. Draw the flow & pick suitable AWS services.",
        quiz: [
          { question: "Microservices are NOT suitable for?", options: ["Large org with many teams", "Small startup MVP", "App that scales per part", "Strong DevOps maturity"], answer: 1, explanation: "Small MVPs/startups should start as a monolith or modular monolith - avoid premature complexity." },
          { question: "How does SNS differ from SQS?", options: ["SNS is a queue", "SNS is pub/sub fanout (1-to-many)", "No difference", "SNS is slower"], answer: 1, explanation: "SNS is a pub/sub topic with fanout (1 message → many subscribers); SQS is a point-to-point queue (one consumer per message)." },
          { question: "The Saga pattern solves?", options: ["Auth", "Distributed transactions across services", "Logging", "Caching"], answer: 1, explanation: "Saga replaces distributed ACID transactions with a sequence of local transactions plus compensating actions on failure." },
          { question: "A circuit breaker is used to?", options: ["Speed things up", "Stop calling a downstream service that's failing", "Encrypt data", "Back up data"], answer: 1, explanation: "A circuit breaker detects downstream failure and temporarily halts calls to prevent cascading failures." },
          { question: "The Outbox pattern guarantees?", options: ["Email outbox", "Atomic 'save to DB + publish event'", "Backups", "Encryption"], answer: 1, explanation: "The Outbox pattern writes the event in the same DB transaction; a worker then reads and publishes - ensuring atomicity." },
        ],
      },
    ],
  },
];
