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
        theory: `**Ba ông lớn (Big Three)** chiếm hơn 65% thị phần Cloud toàn cầu:

**1. AWS (Amazon Web Services) — ~32% market share**
- Ra đời sớm nhất (2006), portfolio rộng nhất với 200+ dịch vụ.
- Mạnh về: compute (EC2), storage (S3), serverless (Lambda).
- Cộng đồng lớn, tài liệu dồi dào.

**2. Microsoft Azure — ~23% market share**
- Tích hợp sâu với hệ sinh thái Microsoft (Windows Server, Active Directory, Office 365).
- Mạnh về: enterprise hybrid cloud, Azure DevOps, AI services.

**3. Google Cloud Platform (GCP) — ~11% market share**
- Mạnh về: data analytics (BigQuery), AI/ML (Vertex AI), Kubernetes (GKE).
- Hạ tầng mạng global của Google rất nhanh.

**Bảng so sánh dịch vụ tương đương:**
| Loại | AWS | Azure | GCP |
|------|-----|-------|-----|
| VM | EC2 | Virtual Machines | Compute Engine |
| Object Storage | S3 | Blob Storage | Cloud Storage |
| Managed DB | RDS | SQL Database | Cloud SQL |
| Serverless | Lambda | Functions | Cloud Functions |
| Kubernetes | EKS | AKS | GKE |

**Cách chọn:** dựa vào hệ sinh thái sẵn có, kỹ năng team, giá cả cho workload cụ thể, và yêu cầu vị trí địa lý (region).`,
        theoryEn: `**The Big Three** dominate 65%+ of the global cloud market:

**1. AWS — ~32% market share**: oldest (2006), 200+ services, strong in compute (EC2), storage (S3), serverless (Lambda).

**2. Azure — ~23%**: deep Microsoft integration (Windows Server, AD, O365), strong in enterprise hybrid, DevOps.

**3. GCP — ~11%**: best for data analytics (BigQuery), AI/ML (Vertex AI), Kubernetes (GKE), fast global network.

**Service equivalence:**
| Type | AWS | Azure | GCP |
|------|-----|-------|-----|
| VM | EC2 | VMs | Compute Engine |
| Object Storage | S3 | Blob | Cloud Storage |
| DB | RDS | SQL DB | Cloud SQL |
| Serverless | Lambda | Functions | Cloud Functions |
| K8s | EKS | AKS | GKE |

**How to choose:** existing ecosystem, team skills, workload pricing, region requirements.`,
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
        theory: `**Hạ tầng vật lý của Cloud** được tổ chức theo 3 cấp:

**1. Region (Khu vực)** — một vùng địa lý chứa nhiều data center. Ví dụ: \`us-east-1\` (Virginia), \`ap-southeast-1\` (Singapore), \`eu-west-1\` (Ireland).
- AWS hiện có ~33 region, GCP ~40, Azure ~60.
- Chọn region gần người dùng để giảm latency, và tuân thủ luật dữ liệu (GDPR, data residency).

**2. Availability Zone (AZ)** — một hoặc nhiều data center riêng biệt **trong một Region**, có nguồn điện, mạng, làm mát độc lập.
- Mỗi region thường có 3 AZ trở lên.
- Triển khai ứng dụng qua nhiều AZ để **chịu lỗi (fault tolerance)**: nếu 1 AZ sập, ứng dụng vẫn chạy.

**3. Edge Location** — điểm phân phối nội dung (CDN) gần người dùng cuối, cache static assets.
- AWS CloudFront có 600+ edge location toàn cầu.
- Giảm latency truy cập cho ảnh, video, file tĩnh.

**Quy tắc thiết kế HA (High Availability):**
- **Multi-AZ**: chống sự cố tại 1 data center → SLA 99.99%.
- **Multi-Region**: chống sự cố toàn vùng địa lý → SLA 99.999% nhưng chi phí cao.
- **Active-Active** vs **Active-Passive**: tùy ngân sách và RTO/RPO.`,
        theoryEn: `**Cloud physical infrastructure** is organized in 3 tiers:

**1. Region** — geographic area with multiple data centers (e.g. \`us-east-1\`, \`ap-southeast-1\`). AWS ~33, GCP ~40, Azure ~60. Choose by latency + data residency law (GDPR).

**2. Availability Zone (AZ)** — one or more isolated data centers inside a Region with independent power, network, cooling. Each region has 3+ AZs. Deploy across AZs for fault tolerance.

**3. Edge Location** — CDN PoPs near end-users that cache static content. CloudFront has 600+ globally.

**HA design rules:**
- **Multi-AZ**: protects against 1 data center failure → 99.99% SLA.
- **Multi-Region**: protects against entire region failure → 99.999% but expensive.`,
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
        theory: `**Virtual Machine (VM)** là máy ảo chạy trên hạ tầng vật lý dùng chung qua hypervisor. Đây là dịch vụ **IaaS** cốt lõi.

**AWS EC2 — các thành phần:**
- **AMI** (Amazon Machine Image): template chứa OS + phần mềm.
- **Instance Type**: cấu hình CPU/RAM. Họ chính:
  - **t** (burstable, rẻ): t3.micro, t3.small — dev/test, web nhỏ.
  - **m** (general purpose): m5.large — cân bằng compute/memory.
  - **c** (compute optimized): c5.xlarge — xử lý tính toán nặng.
  - **r** (memory optimized): r5.xlarge — database, cache.
  - **g/p** (GPU): training ML, render.
- **EBS Volume**: ổ đĩa gắn vào VM (block storage).
- **Security Group**: firewall ảo cho instance.
- **Key Pair**: SSH key để truy cập.

**Mô hình mua:**
- **On-Demand**: trả theo giờ, không cam kết. Đắt nhất.
- **Reserved Instance (RI)**: cam kết 1-3 năm, tiết kiệm 30-72%.
- **Spot Instance**: dùng dung lượng dư, rẻ tới 90% nhưng có thể bị thu hồi.
- **Savings Plan**: cam kết mức chi mỗi giờ, linh hoạt hơn RI.

**Auto Scaling Group (ASG)**: tự động thêm/bớt instance theo CPU, request count, lịch.`,
        theoryEn: `**Virtual Machine (VM)** runs on shared physical hardware via a hypervisor. Core IaaS service.

**AWS EC2 components:**
- **AMI**: OS + software template.
- **Instance Type**: t (burstable), m (general), c (compute), r (memory), g/p (GPU).
- **EBS Volume**: block storage attached.
- **Security Group**: virtual firewall.
- **Key Pair**: SSH access.

**Pricing models:**
- **On-Demand**: hourly, no commit.
- **Reserved Instance**: 1-3yr commit, 30-72% savings.
- **Spot**: spare capacity, up to 90% off, can be reclaimed.
- **Savings Plan**: commit \$/hour, flexible.

**Auto Scaling Group**: scale based on CPU, request count, schedule.`,
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
        theory: `**Object Storage** lưu trữ dữ liệu dưới dạng **đối tượng (object)** trong **bucket**, mỗi object có:
- **Key** (path/tên file)
- **Value** (nội dung)
- **Metadata** (Content-Type, custom tags)
- **Version ID** (nếu bật versioning)

**AWS S3 — đặc tính:**
- Khả năng mở rộng vô hạn (đến hàng exabyte).
- Độ bền **99.999999999%** (11 số 9) — gần như không bao giờ mất data.
- Truy cập qua HTTP/HTTPS REST API.
- Tích hợp sâu với Lambda, CloudFront, Athena.

**Storage Classes (lớp lưu trữ):**
| Class | Use case | Giá |
|-------|----------|-----|
| **Standard** | Truy cập thường xuyên | \$0.023/GB |
| **Intelligent-Tiering** | Tự chuyển tier theo access | Tự động |
| **Standard-IA** | Truy cập ít (>30 ngày) | \$0.0125/GB |
| **One Zone-IA** | IA nhưng 1 AZ | \$0.01/GB |
| **Glacier Instant** | Archive truy cập tức thì | \$0.004/GB |
| **Glacier Flexible** | Archive (1 phút – 12h) | \$0.0036/GB |
| **Glacier Deep Archive** | Archive lâu dài (12h) | \$0.00099/GB |

**Lifecycle Policy**: tự động chuyển object giữa các class theo thời gian (ví dụ: sau 30 ngày → IA, sau 365 ngày → Glacier).

**Use case phổ biến:** lưu ảnh/video user upload, static website, backup, data lake, log archive.`,
        theoryEn: `**Object Storage** stores data as **objects** in **buckets**. Each object has Key, Value, Metadata, Version ID.

**AWS S3:**
- Infinite scale, **11 nines** durability.
- HTTP/HTTPS REST API.
- Integrates with Lambda, CloudFront, Athena.

**Storage Classes:** Standard, Intelligent-Tiering, Standard-IA, One Zone-IA, Glacier Instant/Flexible/Deep Archive.

**Lifecycle policy** auto-transitions objects between classes.

**Use cases:** user uploads, static websites, backups, data lakes, log archives.`,
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
        theory: `**Container** đóng gói app + dependencies thành một đơn vị nhẹ, chạy nhất quán mọi nơi. **Docker** là chuẩn de-facto.

**Vì sao chọn container thay VM?**
- Khởi động giây thay vì phút.
- Nhẹ (MB thay vì GB).
- Cùng image chạy được trên dev/staging/prod.

**Kubernetes (K8s)** là nền tảng orchestration để chạy hàng nghìn container ở quy mô production:
- **Pod**: đơn vị nhỏ nhất, chứa 1+ container.
- **Deployment**: quản lý replica + rolling update.
- **Service**: load balancer nội bộ.
- **Ingress**: route HTTP từ ngoài vào.
- **ConfigMap / Secret**: config + bí mật.
- **Namespace**: phân vùng logic.

**Managed Kubernetes:**
- **AWS EKS** — control plane do AWS quản lý, worker node tự bạn quản (hoặc Fargate).
- **Azure AKS** — miễn phí control plane.
- **GCP GKE** — chế độ Autopilot tự lo cả node.

**Khi nào dùng container thay serverless?**
- Cần control runtime, custom binary.
- Stateful workload (database, queue).
- Long-running process (background worker).
- Tránh vendor lock-in (K8s portable).`,
        theoryEn: `**Containers** package app + deps into lightweight units. **Docker** is the standard.

**Why over VMs?** Seconds to start, MB-sized, consistent across environments.

**Kubernetes (K8s)** orchestrates containers at scale: Pod, Deployment, Service, Ingress, ConfigMap/Secret, Namespace.

**Managed K8s:** EKS (AWS), AKS (Azure), GKE (GCP — has Autopilot mode).

**Containers vs serverless:** choose containers for runtime control, stateful workloads, long-running processes, or to avoid vendor lock-in.`,
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
        theory: `**VPC (Virtual Private Cloud)** là mạng ảo riêng của bạn trong cloud, cách ly logic với các khách hàng khác.

**Cấu trúc VPC điển hình:**
- **CIDR block** — dải IP của VPC, ví dụ \`10.0.0.0/16\` (65,536 IP).
- **Subnet** — chia VPC thành các vùng nhỏ, mỗi subnet thuộc 1 AZ.
  - **Public subnet**: có route ra Internet Gateway → VM có public IP.
  - **Private subnet**: chỉ ra Internet qua **NAT Gateway** → bảo mật cao hơn.
- **Route Table** — quy tắc định tuyến cho mỗi subnet.
- **Internet Gateway (IGW)** — cổng ra Internet cho public subnet.
- **NAT Gateway** — cho phép private subnet ra Internet (outbound only).
- **Security Group** — firewall **stateful** ở cấp instance (mặc định deny inbound).
- **NACL** — firewall **stateless** ở cấp subnet (rule-based).

**Best practice 3-tier architecture:**
- Public subnet: ALB (Application Load Balancer), Bastion host.
- Private subnet (app): EC2/EKS chạy backend.
- Private subnet (data): RDS, ElastiCache.

**Kết nối hybrid:** VPN, Direct Connect, VPC Peering, Transit Gateway.`,
        theoryEn: `**VPC** is your isolated virtual network in the cloud.

**Components:**
- **CIDR block**: IP range like \`10.0.0.0/16\`.
- **Subnet**: divides VPC; each in 1 AZ. Public (with IGW route), Private (with NAT Gateway).
- **Route Table**: routing rules.
- **IGW**: Internet entrance for public subnets.
- **NAT Gateway**: outbound-only Internet for private subnets.
- **Security Group**: stateful firewall at instance level.
- **NACL**: stateless firewall at subnet level.

**3-tier architecture:** ALB in public, app in private, DB in private DB subnet.

**Hybrid connectivity:** VPN, Direct Connect, VPC Peering, Transit Gateway.`,
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
        theory: `**IAM** quản lý **AI** được làm **GÌ** với **TÀI NGUYÊN** nào, **KHI NÀO**, **TỪ ĐÂU**. Đây là dịch vụ bảo mật quan trọng nhất cloud.

**4 thực thể chính:**
- **User**: con người hoặc service account, có credential (password, access key).
- **Group**: nhóm user, gán policy chung.
- **Role**: identity tạm thời, được "assume" bởi user/service. Best practice cho EC2/Lambda.
- **Policy**: tài liệu JSON định nghĩa quyền (Allow/Deny + Action + Resource).

**Cấu trúc IAM Policy:**
\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["s3:GetObject"],
    "Resource": "arn:aws:s3:::my-bucket/*",
    "Condition": {
      "IpAddress": {"aws:SourceIp": "203.0.113.0/24"}
    }
  }]
}
\`\`\`

**Nguyên tắc vàng — Least Privilege:** chỉ cấp quyền tối thiểu cần thiết.

**Best practices:**
- ❌ Không dùng root account cho công việc hằng ngày.
- ✅ Bật **MFA** cho mọi user.
- ✅ Dùng **Role** cho EC2/Lambda thay vì hardcode access key.
- ✅ Rotate access key định kỳ (90 ngày).
- ✅ Dùng **AWS Organizations + SCP** cho multi-account.
- ✅ Audit bằng **CloudTrail** + **IAM Access Analyzer**.`,
        theoryEn: `**IAM** controls WHO can do WHAT on WHICH resource, WHEN, and FROM WHERE.

**4 entities:** User, Group, Role, Policy (JSON Allow/Deny + Action + Resource + Condition).

**Least Privilege**: grant only minimum needed permissions.

**Best practices:** no root for daily work, enable MFA, use Roles for EC2/Lambda, rotate keys every 90 days, AWS Organizations + SCP, audit with CloudTrail + IAM Access Analyzer.`,
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
