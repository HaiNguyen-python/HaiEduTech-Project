import type { ExtendedProgrammingModule } from "./types";

// Cloud Engineer — Expansion: 2 new modules, 10 deep lessons total
// Complements cloudLessons.ts (5 base modules, 15 lessons)
export const cloudExpansionModules: ExtendedProgrammingModule[] = [
  // ============================================================
  // MODULE 6: Cloud Operations & Resilience
  // ============================================================
  {
    id: "cloud-ops-resilience",
    title: "Vận hành & Khả năng phục hồi",
    titleEn: "Cloud Operations & Resilience",
    icon: "🛡️",
    color: "from-cyan-500 to-cyan-700",
    description: "Storage types, auto scaling, encryption, DDoS, monitoring",
    descriptionEn: "Storage types, auto scaling, encryption, DDoS, monitoring",
    course: "cloud",
    lessons: [
      {
        id: "cloud-ops-1",
        title: "Block vs File vs Object Storage",
        titleEn: "Block vs File vs Object Storage",
        theory: `**Cloud Storage** chia làm 3 loại chính, mỗi loại tối ưu cho một mục đích khác nhau. Hiểu sai loại storage là sai lầm phổ biến nhất khi thiết kế kiến trúc cloud.

## 1. Block Storage
Chia dữ liệu thành **block cố định** (thường 4KB-64KB), mỗi block có địa chỉ riêng. Hệ điều hành tự ghép thành file system.

**Đặc điểm:**
- **Latency cực thấp** (<1ms): phù hợp database, OS disk
- **Random access** nhanh, throughput cao (IOPS lớn)
- Gắn vào **MỘT** instance tại một thời điểm (single-attach)
- Cần format (ext4, NTFS, XFS) trước khi dùng

**Dịch vụ:** AWS EBS, Azure Managed Disks, GCP Persistent Disk
**Use cases:** PostgreSQL/MySQL data files, boot volume, transactional workload

## 2. File Storage (NAS)
Cung cấp **shared file system** qua NFS/SMB. Nhiều client mount cùng lúc, thấy chung folder/file.

**Đặc điểm:**
- **Multi-attach**: hàng nghìn client truy cập song song
- POSIX-compliant: hành xử như filesystem Linux/Windows truyền thống
- Latency vừa phải (1-10ms)
- Đắt hơn object storage 5-10 lần

**Dịch vụ:** AWS EFS, Azure Files, GCP Filestore
**Use cases:** content management (WordPress media), home directory, dev environment chia sẻ code

## 3. Object Storage
Lưu dữ liệu dưới dạng **object** (data + metadata + unique ID) trong **bucket** phẳng. Truy cập qua HTTP API (PUT/GET/DELETE).

**Đặc điểm:**
- **Khả năng mở rộng vô hạn** (exabytes)
- **Durability 99.999999999%** (11 nines) — gần như không mất dữ liệu
- Chi phí cực rẻ ($0.023/GB/month tier nóng, $0.004/GB tier lạnh)
- Latency cao hơn (10-100ms), không phù hợp DB
- **Immutable**: không thể sửa, chỉ ghi đè cả object

**Dịch vụ:** AWS S3, Azure Blob Storage, GCP Cloud Storage
**Use cases:** backup, static website, data lake, media (ảnh/video), log archive

## Bảng so sánh
| Tiêu chí | Block | File | Object |
|---|---|---|---|
| Latency | <1ms | 1-10ms | 10-100ms |
| Multi-attach | ❌ | ✅ | ✅ |
| Giá ($/GB) | $0.10 | $0.30 | $0.023 |
| Scale tối đa | 64 TiB | Petabytes | Exabytes |
| API | iSCSI/NVMe | NFS/SMB | HTTP/REST |

## Quy tắc chọn
- **Database, boot disk** → Block
- **Shared code, CMS media** → File
- **Backup, ảnh/video, data lake, web tĩnh** → Object

## Anti-patterns
- ❌ Dùng S3 (object) làm database backend → latency giết performance
- ❌ Dùng EBS (block) cho 1000 web server cần đọc chung file → không multi-attach được
- ❌ Lưu log app vào EFS thay vì S3 → đắt gấp 13 lần`,
        theoryEn: `**Cloud Storage** comes in 3 main types — choosing wrong is the most common cloud architecture mistake.

## 1. Block Storage
Splits data into fixed blocks (4KB-64KB) with unique addresses. OS assembles into a filesystem.

- **Sub-millisecond latency**, ideal for DB and OS disks
- High IOPS, random access
- **Single-attach** per instance
- Services: AWS EBS, Azure Managed Disks, GCP Persistent Disk
- Use: PostgreSQL/MySQL data, boot volumes, transactional workloads

## 2. File Storage (NAS)
Shared filesystem over NFS/SMB. Multiple clients mount the same folder.

- **Multi-attach** to thousands of clients
- POSIX-compliant
- 1-10ms latency
- 5-10× more expensive than object
- Services: AWS EFS, Azure Files, GCP Filestore
- Use: CMS media, shared dev environments, home directories

## 3. Object Storage
Objects (data + metadata + ID) in flat buckets, HTTP API access.

- **Unlimited scale** (exabytes), 11 nines durability
- Very cheap ($0.023/GB hot, $0.004/GB cold)
- 10-100ms latency, not for DBs
- **Immutable** — overwrite the whole object
- Services: AWS S3, Azure Blob, GCP Cloud Storage
- Use: backups, static sites, data lakes, media, logs

## Comparison
| Criteria | Block | File | Object |
|---|---|---|---|
| Latency | <1ms | 1-10ms | 10-100ms |
| Multi-attach | ❌ | ✅ | ✅ |
| Price ($/GB) | $0.10 | $0.30 | $0.023 |
| Max scale | 64 TiB | Petabytes | Exabytes |

## Selection rules
- DB / boot → Block
- Shared code / CMS → File
- Backup / media / data lake → Object

## Anti-patterns
- ❌ S3 as DB backend (latency kills performance)
- ❌ EBS for 1000 web servers needing shared files (no multi-attach)
- ❌ App logs on EFS instead of S3 (13× more expensive)`,
        code: `import boto3

# Block Storage (EBS) — attach to ONE EC2
ec2 = boto3.client('ec2')
ebs = ec2.create_volume(
    AvailabilityZone='us-east-1a',
    Size=100,                    # GB
    VolumeType='gp3',            # SSD general purpose
    Iops=3000,
    Throughput=125,              # MB/s
    Encrypted=True
)

# File Storage (EFS) — multi-attach NFS
efs = boto3.client('efs')
fs = efs.create_file_system(
    PerformanceMode='generalPurpose',
    ThroughputMode='elastic',
    Encrypted=True
)

# Object Storage (S3) — unlimited scale
s3 = boto3.client('s3')
s3.create_bucket(Bucket='my-data-lake-2026')
s3.put_object(
    Bucket='my-data-lake-2026',
    Key='2026/01/users.parquet',
    Body=open('users.parquet', 'rb'),
    StorageClass='INTELLIGENT_TIERING'   # auto-move cold data
)

# Choose by workload
def recommend_storage(workload: str) -> str:
    rules = {
        "database":      "Block (EBS gp3 / io2)",
        "shared_code":   "File (EFS)",
        "backup":        "Object (S3 Glacier)",
        "static_site":   "Object (S3 + CloudFront)",
        "data_lake":     "Object (S3 Parquet)",
        "boot_disk":     "Block (EBS gp3)",
    }
    return rules.get(workload, "Object (default)")

print(recommend_storage("data_lake"))`,
        codeLanguage: "python",
        exercise: "Design storage for a video streaming platform with: user database, raw uploaded videos, encoded video segments, and shared editing workspace. Explain which storage type for each.",
        exerciseEn: "Design storage for a video streaming platform with: user database, raw uploaded videos, encoded video segments, and shared editing workspace. Explain which storage type for each.",
        quiz: [
          { question: "Which storage type is best for a PostgreSQL database?", options: ["Object (S3)", "File (EFS)", "Block (EBS)", "Archive (Glacier)"], answer: 2, explanation: "Block storage offers sub-ms latency and high IOPS, essential for transactional databases." },
          { question: "What is S3's durability guarantee?", options: ["99%", "99.9%", "99.99%", "99.999999999% (11 nines)"], answer: 3, explanation: "S3 Standard provides 11 nines of durability — losing one object is statistically near-impossible." },
          { question: "Which storage CANNOT be attached to multiple instances simultaneously?", options: ["EFS", "S3", "EBS (standard)", "Azure Files"], answer: 2, explanation: "Standard EBS is single-attach. Multi-attach EBS exists but is limited to specific volume types and use cases." },
          { question: "Best storage for storing 10 PB of historical logs accessed once a year?", options: ["EBS", "EFS", "S3 Glacier Deep Archive", "RDS"], answer: 2, explanation: "Glacier Deep Archive costs ~$0.001/GB/month — perfect for rarely-accessed cold data." },
          { question: "Why is object storage NOT ideal for OS boot volumes?", options: ["Too expensive", "High latency (10-100ms) and HTTP-only API", "Too small capacity", "No encryption"], answer: 1, explanation: "Booting an OS requires sub-ms random reads. Object storage's HTTP API and high latency make it unsuitable." },
        ],
      },
      {
        id: "cloud-ops-2",
        title: "Auto Scaling & Load Balancing",
        titleEn: "Auto Scaling & Load Balancing",
        theory: `**Auto Scaling + Load Balancing** là cặp công nghệ cốt lõi giúp ứng dụng cloud co giãn theo nhu cầu và phân phối traffic đều đặn — đây là lý do chính khiến cloud rẻ và đáng tin cậy hơn on-premise.

## Auto Scaling là gì?
Tự động **thêm/bớt instance** dựa trên metric (CPU, memory, request count, queue length…). Mục tiêu: vừa đủ tài nguyên — không thừa (lãng phí $) không thiếu (down service).

## 4 chiến lược scaling
1. **Manual scaling** — admin tự đổi số lượng (chỉ dùng test)
2. **Scheduled scaling** — set giờ cố định (vd: 8h sáng → 10 instance, 22h → 2 instance)
3. **Dynamic scaling** — phản ứng metric realtime (CPU >70% → +1 instance)
4. **Predictive scaling** — ML dự đoán traffic tương lai (AWS dùng từ 2018)

## Vertical vs Horizontal Scaling
| | Vertical (scale up) | Horizontal (scale out) |
|---|---|---|
| Cách làm | Tăng RAM/CPU 1 server | Thêm nhiều server |
| Giới hạn | Phần cứng max | Gần như vô hạn |
| Downtime | Có (restart) | Không |
| Cloud-native | ❌ | ✅ |

Cloud luôn ưu tiên **horizontal** — đó là điều khiến cloud khác biệt với on-prem.

## Load Balancer (LB)
Phân phối traffic đến nhiều backend instance. **Health check** liên tục — instance chết bị loại bỏ tự động.

**3 loại LB chính (AWS):**
- **ALB** (Application LB, Layer 7) — định tuyến theo URL, header, host. Dùng cho web app, microservices
- **NLB** (Network LB, Layer 4) — TCP/UDP, latency cực thấp (<1ms), throughput cao. Dùng cho game, IoT, real-time
- **GLB** (Gateway LB, Layer 3) — chuyên cho firewall/IDS appliance

## Thuật toán phân phối
- **Round Robin** — luân phiên đều
- **Least Connection** — ưu tiên server ít kết nối nhất
- **IP Hash** — same client → same server (sticky session)
- **Weighted** — server mạnh hơn nhận nhiều traffic hơn

## Real-world example: Netflix
Netflix phục vụ 250M users với traffic peak 200 Tbps. Họ dùng:
- **Auto Scaling** dựa trên RPS (requests per second), scale out tới 100,000+ instances trong giờ vàng
- **AWS ALB** + **CloudFront** CDN
- **Predictive scaling** cho các sự kiện đặc biệt (Stranger Things release)

## Best practices
1. **Warm pool** — giữ vài instance "ngủ" để scale-out nhanh (giảm cold-start)
2. **Cooldown period** — chờ 5-10 phút giữa các lần scale để tránh "flapping"
3. **Multi-AZ deployment** — phân tán instance qua nhiều Availability Zones
4. **Health check kỹ** — dùng custom endpoint /health, không chỉ TCP ping
5. **Graceful shutdown** — drain connection trước khi terminate instance

## Anti-patterns
- ❌ Scale dựa trên CPU duy nhất → bỏ sót I/O bound app
- ❌ Min instances = 1 → single point of failure
- ❌ Không test load → kịch bản scale lỗi khi thật sự cần`,
        theoryEn: `**Auto Scaling + Load Balancing** is the core combo that makes cloud apps elastic and cheaper than on-premise.

## Auto Scaling
Automatically add/remove instances based on metrics (CPU, memory, RPS, queue depth). Goal: just enough — no waste, no outage.

## 4 strategies
1. **Manual** — admin sets count (test only)
2. **Scheduled** — fixed hours (8am → 10 instances, 10pm → 2)
3. **Dynamic** — react to live metrics (CPU >70% → +1)
4. **Predictive** — ML forecasts traffic (AWS since 2018)

## Vertical vs Horizontal
| | Vertical | Horizontal |
|---|---|---|
| How | Bigger box | More boxes |
| Limit | Hardware max | ~Infinite |
| Downtime | Yes | No |
| Cloud-native | ❌ | ✅ |

Cloud always prefers **horizontal** — that's what makes it different from on-prem.

## Load Balancer
Distributes traffic to backends with continuous health checks.

**AWS LB types:**
- **ALB** (L7) — URL/header/host routing, web/microservices
- **NLB** (L4) — TCP/UDP, sub-ms latency, gaming/IoT
- **GLB** (L3) — firewall appliances

## Algorithms
- Round Robin, Least Connection, IP Hash, Weighted

## Netflix example
250M users, 200 Tbps peak. Auto-scales to 100,000+ instances during prime time using predictive scaling (e.g., Stranger Things release).

## Best practices
1. Warm pool to reduce cold-start
2. Cooldown 5-10 min between scaling events
3. Multi-AZ deployment
4. Custom /health endpoint, not just TCP
5. Graceful shutdown with connection draining

## Anti-patterns
- ❌ CPU-only scaling misses I/O-bound apps
- ❌ Min=1 → single point of failure
- ❌ No load testing → scaling fails when needed`,
        code: `import boto3

# 1. Create Launch Template (instance blueprint)
ec2 = boto3.client('ec2')
template = ec2.create_launch_template(
    LaunchTemplateName='web-app-v1',
    LaunchTemplateData={
        'ImageId': 'ami-0abcdef1234567890',
        'InstanceType': 't3.medium',
        'SecurityGroupIds': ['sg-web'],
        'UserData': 'IyEvYmluL2Jhc2gKZG9ja2VyIHJ1biAtZCAtcCA4MDo4MCBteWFwcA=='
    }
)

# 2. Create Auto Scaling Group
asg = boto3.client('autoscaling')
asg.create_auto_scaling_group(
    AutoScalingGroupName='web-asg',
    MinSize=2,                # Always ≥2 for HA
    MaxSize=20,
    DesiredCapacity=4,
    LaunchTemplate={'LaunchTemplateName': 'web-app-v1'},
    VPCZoneIdentifier='subnet-1a,subnet-1b,subnet-1c',  # Multi-AZ
    HealthCheckType='ELB',
    HealthCheckGracePeriod=300
)

# 3. Dynamic scaling policy (target tracking)
asg.put_scaling_policy(
    AutoScalingGroupName='web-asg',
    PolicyName='cpu-target-50',
    PolicyType='TargetTrackingScaling',
    TargetTrackingConfiguration={
        'PredefinedMetricSpecification': {
            'PredefinedMetricType': 'ASGAverageCPUUtilization'
        },
        'TargetValue': 50.0   # Keep CPU ~50%
    }
)

# 4. Application Load Balancer with health check
elb = boto3.client('elbv2')
lb = elb.create_load_balancer(
    Name='web-alb',
    Subnets=['subnet-1a', 'subnet-1b', 'subnet-1c'],
    SecurityGroups=['sg-alb'],
    Scheme='internet-facing',
    Type='application'
)

tg = elb.create_target_group(
    Name='web-tg',
    Protocol='HTTP',
    Port=80,
    VpcId='vpc-12345',
    HealthCheckPath='/health',     # Custom endpoint
    HealthCheckIntervalSeconds=15,
    HealthyThresholdCount=2,
    UnhealthyThresholdCount=3
)`,
        codeLanguage: "python",
        exercise: "Design an auto-scaling setup for an e-commerce site that gets 10× traffic during Black Friday. Include: min/max sizes, scaling triggers, LB type, and one cost-saving technique.",
        exerciseEn: "Design an auto-scaling setup for an e-commerce site that gets 10× traffic during Black Friday. Include: min/max sizes, scaling triggers, LB type, and one cost-saving technique.",
        quiz: [
          { question: "Horizontal scaling means:", options: ["Bigger CPU/RAM", "More instances of the same size", "Faster network", "Cheaper storage"], answer: 1, explanation: "Horizontal scaling adds more instances. Vertical scaling makes one instance bigger." },
          { question: "Which LB is best for a real-time multiplayer game?", options: ["ALB (L7)", "NLB (L4)", "GLB (L3)", "Classic LB"], answer: 1, explanation: "NLB operates at L4 with sub-ms latency, ideal for TCP/UDP gaming traffic." },
          { question: "What does Predictive Scaling use?", options: ["Random rules", "Machine learning on historical traffic", "Manual schedules", "DNS round-robin"], answer: 1, explanation: "Predictive Scaling uses ML to forecast traffic patterns and pre-warm capacity." },
          { question: "Why set Min instances ≥ 2?", options: ["Cost savings", "Multi-AZ high availability", "Faster startup", "Required by AWS"], answer: 1, explanation: "Running ≥2 instances across different AZs prevents single-point-of-failure outages." },
          { question: "What is connection draining?", options: ["Stopping new traffic to terminating instance while finishing existing requests", "Cleaning up logs", "Resetting TCP", "Restarting LB"], answer: 0, explanation: "Connection draining lets in-flight requests complete before terminating an instance — preventing user errors during scale-in." },
        ],
      },
      {
        id: "cloud-ops-3",
        title: "Encryption at Rest, in Transit & KMS",
        titleEn: "Encryption at Rest, in Transit & KMS",
        theory: `**Mã hóa (Encryption)** là tuyến phòng thủ cuối cùng. Ngay cả khi attacker chiếm được hạ tầng, dữ liệu mã hóa vẫn vô dụng nếu không có khóa. Cloud cung cấp 3 lớp mã hóa.

## 1. Encryption at Rest (lưu trữ)
Mã hóa dữ liệu khi nằm trên đĩa, trong DB, S3 bucket. Dùng **AES-256** (chuẩn vàng).

**Cách hoạt động:**
- **Envelope encryption**: dữ liệu được mã bằng **Data Key (DEK)**, DEK lại được mã bằng **Master Key (KEK)** trong KMS
- Khi đọc: KMS giải mã DEK → DEK giải mã dữ liệu → trả về plain text
- Master key **KHÔNG BAO GIỜ** rời khỏi KMS (HSM-backed)

**Ví dụ:**
- S3: SSE-S3 (AWS quản key) | SSE-KMS (bạn quản key) | SSE-C (bạn cung cấp key)
- EBS: encrypted by default từ 2023
- RDS: chỉ bật được khi tạo DB, không thể bật sau

## 2. Encryption in Transit (đường truyền)
Mã hóa khi dữ liệu di chuyển qua mạng. Dùng **TLS 1.2+** (tránh TLS 1.0/1.1, SSL).

**3 vị trí cần TLS:**
- Client ↔ LB (browser → ALB)
- LB ↔ App (ALB → EC2)
- App ↔ DB (EC2 → RDS)

**Best practice:**
- Dùng **AWS Certificate Manager (ACM)** — TLS cert miễn phí, auto-rotate
- HSTS header: ép browser luôn dùng HTTPS
- mTLS (mutual TLS): cả client và server đều phải có cert (zero-trust)

## 3. KMS (Key Management Service)
Dịch vụ quản lý vòng đời khóa mã hóa.

**Tính năng:**
- **Auto rotation**: AWS tự đổi key mỗi 365 ngày (KMS) hoặc 90 ngày (CloudHSM)
- **Audit log**: mọi lần dùng key được log vào CloudTrail
- **Cross-account access**: chia sẻ key qua nhiều tài khoản
- **Multi-region keys**: replica key qua nhiều region cho DR

**Loại key:**
| Loại | Ai quản | Giá | Compliance |
|---|---|---|---|
| AWS managed | AWS | Free | Standard |
| Customer managed (CMK) | Bạn | $1/key/month | Higher |
| CloudHSM | Bạn (FIPS 140-2 L3) | $1.45/hour | Banking, defense |

## Compliance & Regulations
- **PCI-DSS**: bắt buộc encryption at rest cho thẻ tín dụng
- **GDPR Article 32**: encryption là biện pháp bảo vệ "appropriate"
- **HIPAA**: PHI phải mã hóa cả at rest và in transit
- **SOC 2**: audit yêu cầu CMK với rotation tự động

## Best practices
1. **Default encrypt everything** — không bao giờ tạo bucket/DB không mã hóa
2. **Use CMK** cho dữ liệu nhạy cảm — kiểm soát rotation và revoke
3. **Separate keys per environment** — dev/staging/prod khác key
4. **Log mọi decrypt operation** — bất thường = báo động
5. **Backup keys offline** cho disaster recovery

## Anti-patterns
- ❌ Hardcode key trong code/Git → leak qua public repo
- ❌ Dùng cùng 1 key cho tất cả service → 1 leak = mất tất cả
- ❌ Không bật TLS internal vì "VPC riêng tư" → không phải zero-trust
- ❌ Không rotate key → tăng nguy cơ bị brute force theo thời gian`,
        theoryEn: `**Encryption** is the last line of defense. Even if attackers compromise infrastructure, encrypted data is useless without the key. Cloud provides 3 layers.

## 1. Encryption at Rest
Encrypts data on disk, in DBs, in buckets. AES-256 standard.

**Envelope encryption:** data → DEK (Data Key) → KEK (Master Key in KMS). Master key NEVER leaves KMS (HSM-backed).

**Examples:**
- S3: SSE-S3, SSE-KMS, SSE-C
- EBS: encrypted by default (2023+)
- RDS: must enable at creation

## 2. Encryption in Transit
Protects network traffic. Use TLS 1.2+, never TLS 1.0/1.1 or SSL.

**3 critical paths:** client→LB, LB→app, app→DB

**Best:** ACM (free auto-rotated certs), HSTS, mTLS for zero-trust.

## 3. KMS
Manages key lifecycle.

- Auto rotation (365 days KMS, 90 days HSM)
- All usage logged to CloudTrail
- Cross-account & multi-region replica

| Type | Owner | Cost |
|---|---|---|
| AWS managed | AWS | Free |
| Customer managed (CMK) | You | $1/key/month |
| CloudHSM | You (FIPS L3) | $1.45/hour |

## Compliance
- PCI-DSS, GDPR Art. 32, HIPAA, SOC 2 all require/recommend encryption.

## Best practices
1. Default-encrypt everything
2. Use CMK for sensitive data
3. Separate keys per environment
4. Log every decrypt
5. Offline backup of keys for DR

## Anti-patterns
- ❌ Hardcoded keys in Git
- ❌ One key for everything
- ❌ Skipping internal TLS (not zero-trust)
- ❌ No key rotation`,
        code: `import boto3
from base64 import b64encode

kms = boto3.client('kms')
s3 = boto3.client('s3')

# 1. Create a Customer Managed Key (CMK)
key = kms.create_key(
    Description='prod-app-data-key',
    KeyUsage='ENCRYPT_DECRYPT',
    Origin='AWS_KMS',
    MultiRegion=True              # Replicate for DR
)
key_id = key['KeyMetadata']['KeyId']

# Enable auto-rotation
kms.enable_key_rotation(KeyId=key_id)

# 2. Envelope encryption manually
data = b"Sensitive customer record"
dek = kms.generate_data_key(KeyId=key_id, KeySpec='AES_256')
plaintext_dek = dek['Plaintext']        # Use to encrypt data
encrypted_dek = dek['CiphertextBlob']   # Store this with data

# Encrypt the data with DEK using AES (cryptography library in real code)
# For demo we just show the wrapper:
print(f"Encrypted DEK (store this): {b64encode(encrypted_dek)[:40]}...")

# 3. S3 with SSE-KMS encryption
s3.put_object(
    Bucket='secure-bucket',
    Key='customer-data.json',
    Body=data,
    ServerSideEncryption='aws:kms',
    SSEKMSKeyId=key_id
)

# 4. Force HTTPS-only bucket policy
s3.put_bucket_policy(
    Bucket='secure-bucket',
    Policy='''{
        "Version": "2012-10-17",
        "Statement": [{
            "Effect": "Deny",
            "Principal": "*",
            "Action": "s3:*",
            "Resource": "arn:aws:s3:::secure-bucket/*",
            "Condition": {"Bool": {"aws:SecureTransport": "false"}}
        }]
    }'''
)

# 5. Decrypt later
decrypted = kms.decrypt(CiphertextBlob=encrypted_dek)
print(f"Recovered DEK length: {len(decrypted['Plaintext'])} bytes")`,
        codeLanguage: "python",
        exercise: "Design encryption strategy for a healthcare app storing patient records: which keys, where to encrypt, and how to satisfy HIPAA's 'minimum necessary' rule.",
        exerciseEn: "Design encryption strategy for a healthcare app storing patient records: which keys, where to encrypt, and how to satisfy HIPAA's 'minimum necessary' rule.",
        quiz: [
          { question: "What does envelope encryption mean?", options: ["Encrypting email", "Data encrypted by DEK, DEK encrypted by KEK in KMS", "Encrypting only the header", "Using two passwords"], answer: 1, explanation: "Envelope encryption uses a Data Key for the data and a Master Key (in KMS) for the Data Key — the master never leaves KMS." },
          { question: "Which TLS version should you use?", options: ["TLS 1.0", "TLS 1.1", "TLS 1.2 or 1.3", "SSL 3.0"], answer: 2, explanation: "TLS 1.2 minimum, 1.3 preferred. Older versions have known vulnerabilities (BEAST, POODLE)." },
          { question: "How often does AWS KMS auto-rotate a CMK?", options: ["30 days", "90 days", "365 days", "Never"], answer: 2, explanation: "AWS KMS rotates customer-managed keys every 365 days when rotation is enabled." },
          { question: "Why use CMK instead of AWS-managed keys?", options: ["Cheaper", "Full control over rotation, revoke, and audit", "Faster encryption", "Required for S3"], answer: 1, explanation: "CMK gives you control over key policies, rotation schedule, and the ability to revoke access — required for many compliance frameworks." },
          { question: "Which is an anti-pattern?", options: ["Auto-rotating keys", "Using ACM for TLS certs", "Hardcoding API keys in Git", "Separate keys per environment"], answer: 2, explanation: "Hardcoding keys in source control is the #1 cause of cloud breaches — they get scanned and exploited within minutes." },
        ],
      },
      {
        id: "cloud-ops-4",
        title: "DDoS Protection & Web Application Firewall",
        titleEn: "DDoS Protection & WAF",
        theory: `**DDoS attack** (Distributed Denial of Service) làm app sập bằng cách gửi traffic giả từ hàng nghìn IP cùng lúc. **WAF** (Web Application Firewall) chặn tấn công ở tầng ứng dụng (SQL injection, XSS).

## Các loại DDoS attack
**1. Volumetric (L3/L4)** — flood bandwidth
- UDP flood, ICMP flood, amplification (DNS/NTP)
- Đơn vị: Gbps, có thể đạt 3.4 Tbps (kỷ lục Cloudflare 2023)

**2. Protocol (L3/L4)** — exhaust server resources
- SYN flood, Ping of Death, fragmented packet
- Server hết RAM/CPU xử lý handshake giả

**3. Application (L7)** — mimicking legitimate users
- HTTP flood, Slowloris, login bot
- Khó phát hiện vì giống user thật, đo bằng RPS (requests/sec)

## Lá chắn DDoS Protection (AWS Shield)
**Shield Standard** (FREE, auto-enabled):
- Bảo vệ L3/L4 cơ bản (SYN flood, UDP flood)
- Tích hợp với CloudFront, Route 53

**Shield Advanced** ($3000/month):
- Bảo vệ L7
- 24/7 DDoS Response Team (DRT)
- Cost protection: AWS bồi hoàn nếu auto-scale do DDoS
- Real-time visibility qua CloudWatch

## WAF (Web Application Firewall)
Lọc HTTP request **trước khi** đến app server. Hoạt động bằng **rules**.

**Loại rules:**
- **Managed rules** (AWS, Cloudflare): chống OWASP Top 10 (SQL injection, XSS, RCE)
- **Rate-based rules**: chặn IP gửi >2000 req/5min
- **Geo-blocking**: chặn IP từ một quốc gia
- **Bot Control**: phân biệt bot tốt (Googlebot) vs xấu (scraper)
- **Custom rules**: regex tùy chỉnh

## Kiến trúc bảo vệ đa lớp
\`\`\`
Internet
   │
   ▼
[Route 53] ← AWS Shield Standard (FREE, anycast DNS)
   │
   ▼
[CloudFront CDN] ← Cache + edge filtering, hấp thụ traffic
   │
   ▼
[AWS WAF] ← Filter L7 (OWASP, rate limit, bot)
   │
   ▼
[ALB] → [EC2 in private subnet]
\`\`\`

## Real-world: GitHub 2018 (1.35 Tbps memcached attack)
- Bị tấn công 1.35 Tbps — kỷ lục thời điểm đó
- Akamai (CDN của GitHub) hấp thụ và lọc
- Downtime chỉ 10 phút
- Bài học: **luôn có CDN trước app** — tăng khả năng hấp thụ

## OWASP Top 10 (2021) WAF chặn
1. Broken Access Control
2. Cryptographic Failures
3. Injection (SQL, NoSQL, OS)
4. Insecure Design
5. Security Misconfiguration
6. Vulnerable Components
7. Identification & Auth Failures
8. Software & Data Integrity
9. Logging & Monitoring Failures
10. SSRF

## Best practices
1. **Multi-layer defense** — Route53 + CloudFront + WAF + Security Group
2. **Hide origin IP** — chỉ CloudFront mới được gọi origin (origin access control)
3. **Rate limit theo path** — /login chặt hơn /static
4. **Monitor false positive** — WAF chặn nhầm legit user → mất doanh thu
5. **Test trước go-live** — dùng tool như sqlmap để verify rules
6. **Geofencing** — nếu chỉ phục vụ VN, chặn IP nước ngoài

## Anti-patterns
- ❌ Chỉ dựa vào Security Group — không chặn được L7 attack
- ❌ Bật WAF "Block All" → chặn nhầm legit user
- ❌ Dùng IP whitelist cho mobile app → IP user đổi liên tục`,
        theoryEn: `**DDoS** floods apps with fake traffic from thousands of IPs. **WAF** blocks app-layer attacks (SQLi, XSS).

## DDoS attack types
1. **Volumetric (L3/L4)** — flood bandwidth (Tbps record: 3.4 Tbps in 2023)
2. **Protocol (L3/L4)** — exhaust server resources (SYN flood)
3. **Application (L7)** — mimic real users (HTTP flood, login bots)

## AWS Shield
- **Standard** (free, auto-enabled): L3/L4 protection
- **Advanced** ($3000/month): L7 protection, 24/7 response team, cost reimbursement

## WAF Rules
- Managed rules (OWASP Top 10)
- Rate-based (IP doing >2000 req/5min)
- Geo-blocking
- Bot Control (good vs bad bots)
- Custom regex

## Multi-layer defense
Route 53 → CloudFront → WAF → ALB → EC2 (private)

## GitHub 2018 case
1.35 Tbps memcached attack — Akamai absorbed it, only 10 min downtime. Lesson: always have a CDN in front.

## OWASP Top 10 (2021)
Broken Access, Crypto Failures, Injection, Insecure Design, Misconfig, Vulnerable Components, Auth Failures, Integrity, Logging Failures, SSRF.

## Best practices
1. Multi-layer defense
2. Hide origin IP (CloudFront-only access)
3. Per-path rate limiting (/login stricter)
4. Monitor false positives
5. Pen-test before launch
6. Geofencing if regional

## Anti-patterns
- ❌ Security Group only (no L7 protection)
- ❌ "Block All" mode (blocks legit users)
- ❌ IP whitelisting mobile apps (IPs change)`,
        code: `import boto3

wafv2 = boto3.client('wafv2')

# 1. Create a Web ACL with managed + rate-based rules
acl = wafv2.create_web_acl(
    Name='production-waf',
    Scope='REGIONAL',                # or CLOUDFRONT
    DefaultAction={'Allow': {}},
    Rules=[
        # Managed rule: AWS Common Rule Set (OWASP Top 10)
        {
            'Name': 'AWS-CommonRuleSet',
            'Priority': 1,
            'OverrideAction': {'None': {}},
            'Statement': {
                'ManagedRuleGroupStatement': {
                    'VendorName': 'AWS',
                    'Name': 'AWSManagedRulesCommonRuleSet'
                }
            },
            'VisibilityConfig': {
                'SampledRequestsEnabled': True,
                'CloudWatchMetricsEnabled': True,
                'MetricName': 'common-rules'
            }
        },
        # Rate limit: block IP doing >2000 req/5min
        {
            'Name': 'RateLimit',
            'Priority': 2,
            'Action': {'Block': {}},
            'Statement': {
                'RateBasedStatement': {
                    'Limit': 2000,
                    'AggregateKeyType': 'IP'
                }
            },
            'VisibilityConfig': {
                'SampledRequestsEnabled': True,
                'CloudWatchMetricsEnabled': True,
                'MetricName': 'rate-limit'
            }
        },
        # Geo-block: only allow VN, US
        {
            'Name': 'GeoAllowList',
            'Priority': 3,
            'Action': {'Block': {}},
            'Statement': {
                'NotStatement': {
                    'Statement': {
                        'GeoMatchStatement': {
                            'CountryCodes': ['VN', 'US']
                        }
                    }
                }
            },
            'VisibilityConfig': {
                'SampledRequestsEnabled': True,
                'CloudWatchMetricsEnabled': True,
                'MetricName': 'geo-block'
            }
        }
    ],
    VisibilityConfig={
        'SampledRequestsEnabled': True,
        'CloudWatchMetricsEnabled': True,
        'MetricName': 'production-waf'
    }
)

# 2. Attach WAF to ALB
wafv2.associate_web_acl(
    WebACLArn=acl['Summary']['ARN'],
    ResourceArn='arn:aws:elasticloadbalancing:us-east-1:123:loadbalancer/app/web-alb/abc'
)
print("WAF attached. Now monitor blocked requests in CloudWatch.")`,
        codeLanguage: "python",
        exercise: "Design DDoS + WAF protection for a banking website. List 5 specific rules and explain why each is necessary.",
        exerciseEn: "Design DDoS + WAF protection for a banking website. List 5 specific rules and explain why each is necessary.",
        quiz: [
          { question: "Which DDoS type targets the application layer (L7)?", options: ["UDP flood", "SYN flood", "HTTP flood mimicking real users", "ICMP ping"], answer: 2, explanation: "L7 attacks like HTTP flood mimic legitimate user requests, making them hardest to detect." },
          { question: "AWS Shield Standard protects against:", options: ["L7 only", "L3/L4 attacks (free, auto-enabled)", "Only DNS attacks", "Only SQL injection"], answer: 1, explanation: "Shield Standard is free, auto-enabled, and covers most common L3/L4 volumetric and protocol attacks." },
          { question: "What does a WAF primarily protect against?", options: ["Volumetric DDoS", "OWASP Top 10 application attacks", "Hardware failure", "Network latency"], answer: 1, explanation: "WAF inspects HTTP requests to block injection, XSS, and other OWASP Top 10 attacks before reaching the app." },
          { question: "Why hide your origin server's IP?", options: ["Marketing", "Force traffic through CDN/WAF — bypassing them is impossible", "Save bandwidth", "Faster DNS"], answer: 1, explanation: "If attackers find the origin IP, they bypass CDN and WAF entirely — hiding the origin is critical." },
          { question: "Best practice for /login endpoint?", options: ["No limit", "Stricter rate limit than other endpoints", "Allow all geos", "Disable WAF"], answer: 1, explanation: "Login endpoints are prime targets for credential stuffing — apply tighter rate limits (e.g., 10 attempts/min/IP)." },
        ],
      },
      {
        id: "cloud-ops-5",
        title: "Monitoring with CloudWatch & Prometheus",
        titleEn: "Monitoring with CloudWatch & Prometheus",
        theory: `**Monitoring** = "bạn không thể sửa cái bạn không nhìn thấy". Hệ thống cloud cần 3 trụ cột: **Metrics** (số), **Logs** (text), **Traces** (luồng request) — gọi là **3 pillars of observability**.

## 1. Metrics
Số đo theo thời gian (time-series). Vd: CPU%, RPS, latency p99.
- Lưu trong **time-series database** (CloudWatch Metrics, Prometheus)
- Aggregate: avg, min, max, sum, percentile
- Retention thường 15 tháng (CloudWatch) hoặc tùy cấu hình (Prometheus)

## 2. Logs
Sự kiện rời rạc dạng text/JSON. Vd: "User 123 logged in at 14:23"
- Lưu trong **CloudWatch Logs**, **ELK** (Elasticsearch), **Loki**
- Tìm kiếm full-text, lọc theo regex
- **Structured logging** (JSON) > unstructured text

## 3. Traces
Theo dõi request đi qua microservices. Vd: API Gateway → Lambda → DynamoDB → 12ms tổng
- Dùng **AWS X-Ray**, **Jaeger**, **Tempo**
- Phát hiện bottleneck giữa các service
- OpenTelemetry là chuẩn mở thay thế các vendor format

## CloudWatch (AWS native)
**Components:**
- **Metrics**: 1.4M+ metrics tự động từ AWS services
- **Logs**: aggregate log từ EC2/Lambda/RDS/VPC
- **Alarms**: trigger SNS khi metric vượt threshold
- **Dashboards**: visualize realtime
- **Insights**: query logs bằng SQL-like

**Tích hợp tự động:**
- EC2: CPU, network, disk I/O (free)
- Custom metrics: $0.30/metric/month (memory, GC time…)

## Prometheus + Grafana (open-source stack)
**Prometheus:**
- **Pull model**: scrape /metrics endpoint mỗi 15s
- **PromQL**: ngôn ngữ query mạnh (rate, histogram_quantile)
- Lưu trong TSDB nội bộ, chỉ giữ 15 ngày mặc định
- Cluster qua **Thanos** hoặc **Cortex** cho long-term

**Grafana:**
- Dashboard đẹp, plugin phong phú
- Hỗ trợ Prometheus, CloudWatch, Loki, Tempo cùng lúc
- Alert manager riêng

## RED Method (microservices)
- **R**ate — RPS
- **E**rrors — error rate %
- **D**uration — latency p50/p95/p99

## USE Method (resources)
- **U**tilization — % busy
- **S**aturation — queue length
- **E**rrors — error count

## Alerting best practices
1. **Alert on symptoms, not causes** — alert "user can't login" thay vì "DB CPU 80%"
2. **Multi-window multi-burn-rate** (Google SRE) — 1h burn 2% + 6h burn 5% → page
3. **Severity levels**: P1 (page on-call) > P2 (email) > P3 (ticket)
4. **Runbook link** trong mỗi alert — giảm MTTR
5. **Test alerts định kỳ** (chaos engineering)

## SLI / SLO / SLA
- **SLI** (Indicator) — số đo cụ thể (vd: "% request <200ms")
- **SLO** (Objective) — mục tiêu nội bộ (vd: "99.9% requests <200ms trong 30 ngày")
- **SLA** (Agreement) — hợp đồng với customer (vd: "99.5% uptime hoặc hoàn 10%")

## Real-world: Netflix Atlas
Netflix có **2.5 tỷ metrics/phút** (2024). Họ tự build Atlas (giống Prometheus) vì không vendor nào scale nổi.

## Anti-patterns
- ❌ Quá nhiều alert → alert fatigue, on-call ignore
- ❌ Chỉ monitor infra, bỏ business metric (revenue, signup)
- ❌ Không test alert → "im lặng" khi sự cố thật
- ❌ Log mọi thứ ở DEBUG level → tốn $$ và làm chậm app`,
        theoryEn: `**Monitoring** = "you can't fix what you can't see". Cloud needs 3 observability pillars: Metrics, Logs, Traces.

## 1. Metrics
Time-series numbers. CPU%, RPS, p99 latency. Stored in TSDB (CloudWatch, Prometheus). Retention 15+ months.

## 2. Logs
Discrete events (text/JSON). CloudWatch Logs, ELK, Loki. Always use **structured (JSON)** logging.

## 3. Traces
Request flow through microservices. X-Ray, Jaeger, Tempo. OpenTelemetry is the open standard.

## CloudWatch
- 1.4M+ auto metrics, log aggregation, alarms, dashboards, Insights query
- EC2 metrics free; custom $0.30/metric/month

## Prometheus + Grafana
- Pull model, scrape /metrics every 15s
- PromQL query language
- 15-day default retention, extend with Thanos/Cortex
- Grafana for dashboards + alerts

## RED method (services)
Rate, Errors, Duration

## USE method (resources)
Utilization, Saturation, Errors

## Alerting best practices
1. Alert on symptoms, not causes
2. Multi-window multi-burn-rate (Google SRE)
3. P1/P2/P3 severity levels
4. Runbook link in every alert
5. Periodic alert testing (chaos engineering)

## SLI / SLO / SLA
- SLI: indicator (metric)
- SLO: internal target (99.9%)
- SLA: customer contract (refund clause)

## Netflix Atlas
2.5B metrics/minute (2024). They built it because no vendor could scale.

## Anti-patterns
- ❌ Alert fatigue from too many alerts
- ❌ Infra-only metrics, no business metrics
- ❌ Untested alerts go silent during real outages
- ❌ DEBUG-level logging in production`,
        code: `import boto3
import json

cloudwatch = boto3.client('cloudwatch')
logs = boto3.client('logs')

# 1. Publish custom metric
cloudwatch.put_metric_data(
    Namespace='MyApp/Prod',
    MetricData=[
        {
            'MetricName': 'OrdersProcessed',
            'Value': 142,
            'Unit': 'Count',
            'Dimensions': [
                {'Name': 'Environment', 'Value': 'prod'},
                {'Name': 'Region', 'Value': 'us-east-1'}
            ]
        },
        {
            'MetricName': 'OrderLatency',
            'Value': 234.5,
            'Unit': 'Milliseconds',
            'StatisticValues': {
                'SampleCount': 100,
                'Sum': 23450,
                'Minimum': 50,
                'Maximum': 800
            }
        }
    ]
)

# 2. Create alarm: page on-call when error rate > 5%
cloudwatch.put_metric_alarm(
    AlarmName='HighErrorRate',
    ComparisonOperator='GreaterThanThreshold',
    EvaluationPeriods=2,
    MetricName='5XXError',
    Namespace='AWS/ApplicationELB',
    Period=300,
    Statistic='Average',
    Threshold=5.0,
    ActionsEnabled=True,
    AlarmActions=['arn:aws:sns:us-east-1:123:pagerduty-critical'],
    AlarmDescription='ALB 5XX > 5% — runbook: https://wiki/runbooks/5xx',
    TreatMissingData='breaching'
)

# 3. Structured logging (JSON)
def log_event(level: str, event: str, **kwargs):
    record = {
        'timestamp': '2026-04-19T10:00:00Z',
        'level': level,
        'event': event,
        **kwargs
    }
    print(json.dumps(record))

log_event('INFO', 'order_created', user_id=123, amount=49.99, currency='USD')
log_event('ERROR', 'payment_failed', user_id=123, error='card_declined', retry=2)

# 4. Query logs with CloudWatch Insights (SQL-like)
query = """
fields @timestamp, user_id, error
| filter event = "payment_failed"
| stats count() by error
| sort count desc
| limit 10
"""

# Equivalent PromQL example (commented):
# rate(http_requests_total{status="500"}[5m]) / rate(http_requests_total[5m]) > 0.05`,
        codeLanguage: "python",
        exercise: "Define 3 SLIs and matching SLOs for an e-commerce checkout service. Explain the error budget calculation for one of them.",
        exerciseEn: "Define 3 SLIs and matching SLOs for an e-commerce checkout service. Explain the error budget calculation for one of them.",
        quiz: [
          { question: "What are the 3 pillars of observability?", options: ["CPU, RAM, Disk", "Metrics, Logs, Traces", "AWS, Azure, GCP", "Dev, Staging, Prod"], answer: 1, explanation: "Metrics (numbers), Logs (events), Traces (request flow) form the foundation of modern observability." },
          { question: "Which is the RED method?", options: ["Red, Yellow, Green", "Rate, Errors, Duration", "Read, Edit, Delete", "Reliable, Efficient, Durable"], answer: 1, explanation: "RED = Rate, Errors, Duration — Tom Wilkie's method for monitoring request-driven services." },
          { question: "Difference between SLO and SLA?", options: ["Same thing", "SLO is internal target, SLA is customer contract with penalties", "SLA is faster", "SLO is for infra only"], answer: 1, explanation: "SLO is your internal goal (e.g., 99.9%); SLA is the contractual commitment to customers, often with refund clauses." },
          { question: "Best practice: alert on…", options: ["Every metric change", "Symptoms users feel, not internal causes", "CPU only", "Disk full only"], answer: 1, explanation: "Alert on user-facing symptoms (login failures, slow checkout) — internal causes generate noise without helping users." },
          { question: "Prometheus uses what data collection model?", options: ["Push from clients", "Pull (scrape /metrics endpoint)", "WebSocket stream", "Email"], answer: 1, explanation: "Prometheus pulls/scrapes metrics from /metrics endpoints — opposite of push-based StatsD/CloudWatch." },
        ],
      },
    ],
  },

  // ============================================================
  // MODULE 7: Cloud Strategy, Cost & Resilience
  // ============================================================
  {
    id: "cloud-strategy-cost",
    title: "Chiến lược, Chi phí & Phục hồi thảm họa",
    titleEn: "Cloud Strategy, Cost & Disaster Recovery",
    icon: "🌐",
    color: "from-pink-500 to-pink-700",
    description: "Pricing models, multi-cloud, containers vs serverless, DR, multi-region",
    descriptionEn: "Pricing models, multi-cloud, containers vs serverless, DR, multi-region",
    course: "cloud",
    lessons: [
      {
        id: "cloud-strat-1",
        title: "Cloud Pricing Models",
        titleEn: "Cloud Pricing Models",
        theory: `**Cloud Pricing** là chủ đề khiến nhiều startup phá sản. Hiểu sai mô hình giá có thể tăng bill 5-10 lần. Cloud có 5 mô hình giá chính.

## 1. On-Demand
- Trả theo giờ/giây sử dụng, không cam kết
- **Đắt nhất** (giá niêm yết)
- Linh hoạt: tắt mở bất kỳ lúc nào
- Use case: dev/test, workload không đoán được

## 2. Reserved Instances (RI)
- Cam kết 1-3 năm trả trước → giảm **40-72%**
- Có 3 loại payment: All Upfront, Partial, No Upfront
- **Standard RI**: discount cao nhất nhưng không đổi instance type
- **Convertible RI**: discount thấp hơn, đổi được instance type
- Use case: workload ổn định (DB, web prod)

## 3. Savings Plans (mới hơn RI, linh hoạt hơn)
- Cam kết \\$X/giờ trong 1-3 năm → giảm **66%**
- **Compute Savings Plan**: áp dụng cho EC2, Fargate, Lambda
- **EC2 Instance Savings Plan**: chỉ EC2, discount cao hơn
- Tự động áp dụng, không cần đổi instance khi update

## 4. Spot Instances
- Mua lại capacity dư của AWS → giảm **70-90%**
- AWS có thể **thu hồi trong 2 phút** khi cần
- Use case: batch processing, rendering, ML training, CI/CD
- Best practice: dùng Spot Fleet với multi-instance-type để giảm interruption

## 5. Free Tier
- AWS: 12 tháng đầu free + always-free (Lambda 1M req/month)
- Azure: \\$200 credit + always-free
- GCP: \\$300 credit + always-free (e2-micro)

## So sánh chi phí 1 web server m5.large/24h trong 1 năm
| Mô hình | Giá/năm | Tiết kiệm |
|---|---|---|
| On-Demand | \\$840 | 0% |
| RI 1 year (No Upfront) | \\$535 | 36% |
| RI 3 year (All Upfront) | \\$310 | 63% |
| Savings Plan 3 year | \\$340 | 60% |
| Spot (avg) | \\$170 | 80% |

## Hidden costs (cạm bẫy)
1. **Egress traffic** ($0.09/GB out to Internet) — backup ra ngoài cloud có thể tốn $$$
2. **NAT Gateway** ($0.045/GB processing) — đường ngầm đắt
3. **Cross-AZ data transfer** ($0.01/GB mỗi chiều) — micro service chat nhau
4. **CloudWatch logs** ($0.50/GB ingest + $0.03/GB store)
5. **Idle resources** — quên tắt EC2 dev sau giờ làm
6. **Unattached EBS volumes** — vẫn tính tiền dù EC2 đã xóa
7. **S3 cross-region replication** — gấp 2-3 lần storage cost

## Real-world: Pinterest's $190M/year on AWS
- 80% trên Reserved + Savings Plan (workload ổn định)
- 15% Spot (data processing, ML)
- 5% On-Demand (spike traffic)
- FinOps team riêng, theo dõi $/MAU

## Best practices (FinOps)
1. **Tag mọi resource** (Environment, Team, Project) → chargeback
2. **Review weekly Cost Explorer** — bất thường = báo động
3. **Set budget alerts** — \\$500, \\$1000, \\$5000 thresholds
4. **Right-size monthly** — m5.xlarge dùng 30% CPU → đổi m5.large
5. **Delete orphaned resources** — EBS, snapshot, ELB không dùng
6. **Use S3 Intelligent-Tiering** — auto move cold data sang Glacier
7. **Schedule dev/test off-hours** — tắt 12h/ngày = tiết kiệm 50%

## Anti-patterns
- ❌ Mua RI 3 năm cho startup chưa product-market-fit
- ❌ Dùng On-Demand 24/7 cho workload predictable
- ❌ Bỏ qua egress cost khi thiết kế multi-region
- ❌ Spot cho production DB → mất data khi bị reclaim`,
        theoryEn: `**Cloud Pricing** has bankrupted many startups. Wrong model = 5-10× bill. Five main models.

## 1. On-Demand
Pay per hour/second, no commitment. **Most expensive** but flexible. Use: dev/test, unpredictable workloads.

## 2. Reserved Instances (RI)
Commit 1-3 years → **40-72% off**. Standard (cheapest, locked instance type) vs Convertible (less discount, swappable).

## 3. Savings Plans
Commit \\$X/hour for 1-3 years → **66% off**. More flexible than RI, applies to EC2/Fargate/Lambda.

## 4. Spot Instances
Buy spare AWS capacity → **70-90% off**. Can be reclaimed in 2 minutes. Use: batch, ML training, CI/CD.

## 5. Free Tier
AWS 12 months + always-free; Azure \\$200; GCP \\$300.

## Cost comparison (m5.large 24/7 for 1 year)
| Model | Cost | Savings |
|---|---|---|
| On-Demand | \\$840 | 0% |
| RI 1y NoUpfront | \\$535 | 36% |
| RI 3y AllUpfront | \\$310 | 63% |
| Savings Plan 3y | \\$340 | 60% |
| Spot (avg) | \\$170 | 80% |

## Hidden costs (traps)
1. Egress (\\$0.09/GB to Internet)
2. NAT Gateway (\\$0.045/GB)
3. Cross-AZ transfer
4. CloudWatch logs
5. Idle resources
6. Unattached EBS volumes
7. S3 cross-region replication

## Pinterest case (\\$190M/year)
80% RI/Savings, 15% Spot, 5% On-Demand. Dedicated FinOps team tracking \\$/MAU.

## FinOps best practices
1. Tag everything for chargeback
2. Weekly Cost Explorer review
3. Budget alerts at multiple thresholds
4. Monthly right-sizing
5. Delete orphaned resources
6. S3 Intelligent-Tiering
7. Schedule dev/test off-hours

## Anti-patterns
- ❌ 3-year RI for pre-PMF startup
- ❌ On-Demand 24/7 for predictable workloads
- ❌ Ignoring egress in multi-region design
- ❌ Spot for production DBs`,
        code: `def cloud_cost_calculator(hours_per_month: int, instance_hourly: float):
    """Compare pricing models for one instance"""
    on_demand = instance_hourly * hours_per_month * 12

    models = {
        'On-Demand': on_demand,
        'RI 1yr No Upfront': on_demand * 0.64,
        'RI 1yr All Upfront': on_demand * 0.58,
        'RI 3yr All Upfront': on_demand * 0.37,
        'Savings Plan 3yr': on_demand * 0.40,
        'Spot (avg)': on_demand * 0.20,
    }

    print(f"{'Model':<25} {'Annual':<12} {'Savings':<10}")
    print("-" * 50)
    for model, cost in models.items():
        savings = (1 - cost / on_demand) * 100
        print(f"{model:<25} \\${cost:>8.2f}   {savings:>5.1f}%")

    return models

# m5.large at \\$0.096/hour, 24/7
cloud_cost_calculator(hours_per_month=730, instance_hourly=0.096)

# Detect orphaned EBS volumes
import boto3
ec2 = boto3.client('ec2')

orphaned = ec2.describe_volumes(
    Filters=[{'Name': 'status', 'Values': ['available']}]   # available = unattached
)
total_waste = sum(v['Size'] * 0.10 for v in orphaned['Volumes'])  # gp3 = \\$0.10/GB/month
print(f"\\nOrphaned EBS waste: \\${total_waste:.2f}/month")

# Set budget alert
budgets = boto3.client('budgets')
budgets.create_budget(
    AccountId='123456789012',
    Budget={
        'BudgetName': 'monthly-prod',
        'BudgetLimit': {'Amount': '5000', 'Unit': 'USD'},
        'TimeUnit': 'MONTHLY',
        'BudgetType': 'COST'
    },
    NotificationsWithSubscribers=[{
        'Notification': {
            'NotificationType': 'ACTUAL',
            'ComparisonOperator': 'GREATER_THAN',
            'Threshold': 80   # Alert at 80% of budget
        },
        'Subscribers': [{'SubscriptionType': 'EMAIL', 'Address': 'finops@company.com'}]
    }]
)`,
        codeLanguage: "python",
        exercise: "A SaaS company runs 50 EC2 m5.xlarge instances 24/7 in production. Recommend a pricing strategy and calculate annual savings vs all on-demand.",
        exerciseEn: "A SaaS company runs 50 EC2 m5.xlarge instances 24/7 in production. Recommend a pricing strategy and calculate annual savings vs all on-demand.",
        quiz: [
          { question: "Maximum savings with Reserved Instances?", options: ["20%", "40%", "Up to 72%", "100%"], answer: 2, explanation: "3-year All-Upfront Standard RIs can save up to 72% vs on-demand." },
          { question: "Spot Instances can be reclaimed by AWS within…", options: ["1 hour", "2 minutes notice", "1 day", "Never"], answer: 1, explanation: "AWS gives only 2 minutes notice before reclaiming Spot capacity — never use for stateful workloads." },
          { question: "Which is a hidden cloud cost?", options: ["EC2 hourly", "Egress traffic ($0.09/GB to Internet)", "Free tier", "Documentation"], answer: 1, explanation: "Data transfer OUT to the Internet is one of the most overlooked costs and can dwarf compute spending." },
          { question: "Best pricing model for batch ML training?", options: ["On-Demand", "Reserved 3yr", "Spot Instances", "Dedicated Hosts"], answer: 2, explanation: "ML training is restartable and can tolerate interruptions — Spot saves 70-90%." },
          { question: "What should you tag every resource with?", options: ["Color", "Environment, Team, Project for cost allocation", "User password", "Random ID"], answer: 1, explanation: "Tags enable chargeback, cost allocation, and identifying orphaned resources — foundation of FinOps." },
        ],
      },
      {
        id: "cloud-strat-2",
        title: "Multi-Cloud vs Hybrid Cloud",
        titleEn: "Multi-Cloud vs Hybrid Cloud",
        theory: `**Multi-Cloud** = dùng 2+ public cloud (AWS + Azure). **Hybrid Cloud** = mix public cloud + on-premise. Cả hai đều giải quyết vấn đề khác nhau.

## Multi-Cloud
**Lý do dùng:**
1. **Avoid vendor lock-in** — không phụ thuộc 1 cloud
2. **Best-of-breed** — Azure AD + GCP BigQuery + AWS Lambda
3. **Geographic coverage** — 1 cloud không có region tại quốc gia X
4. **Negotiation power** — đe dọa chuyển cloud → giảm giá
5. **Compliance** — luật quốc gia bắt dùng cloud nội địa

**Thách thức:**
- **Operational complexity** gấp 3-5 lần
- Đội ngũ phải biết nhiều hệ sinh thái
- Network egress giữa cloud rất đắt
- Khó áp dụng IaC chung
- Identity management phức tạp

**Patterns:**
- **Cloud-agnostic** — chỉ dùng dịch vụ chung (Kubernetes, PostgreSQL)
- **Distributed** — workload A trên AWS, workload B trên Azure
- **Active-active** — same workload chạy song song trên 2 cloud (DR)

## Hybrid Cloud
**Lý do dùng:**
1. **Legacy systems** — mainframe, app cũ không port lên cloud được
2. **Data residency** — dữ liệu nhạy cảm phải ở on-prem
3. **Burst to cloud** — peak traffic tràn lên cloud
4. **Edge computing** — IoT, manufacturing cần latency thấp tại factory
5. **Cost control** — workload predictable rẻ hơn on-prem (sau 3 năm)

**Connectivity:**
- **VPN** — qua Internet, encrypted, latency cao (50-200ms), rẻ
- **Direct Connect** (AWS) / ExpressRoute (Azure) — leased line riêng, latency thấp (5-20ms), \\$\\$\\$
- **SD-WAN** — phần mềm tự chọn route tốt nhất

## Hybrid patterns
- **Cloud bursting**: chạy on-prem, peak thì spin up cloud
- **Cloud as DR**: production on-prem, backup trên cloud (cheap insurance)
- **Cloud-first dev**: dev/test trên cloud, prod on-prem (cho tới khi sẵn sàng migrate)

## Tools cho Hybrid/Multi-cloud
- **Kubernetes** — orchestration chuẩn, chạy mọi nơi (EKS, AKS, GKE, on-prem)
- **Terraform** — IaC đa cloud
- **HashiCorp Vault** — secret management
- **Anthos** (Google) — quản lý K8s qua GCP/AWS/on-prem
- **Azure Arc** — tương tự Anthos
- **AWS Outposts** — racks AWS đặt tại data center bạn

## Real-world cases
- **Netflix**: thuần AWS từ 2008 (đối nghịch multi-cloud)
- **Walmart**: multi-cloud (AWS + Azure) — không muốn chuyển tiền cho đối thủ Amazon
- **Apple iCloud**: hybrid (own DC + AWS + GCP) — phân tán rủi ro
- **Banks**: hybrid bắt buộc (regulator yêu cầu data residency)

## Khi nào KHÔNG nên multi-cloud?
- Startup < 100 employee — complexity giết tốc độ
- Workload đơn giản — over-engineering
- Đội ngũ < 50 engineer — không đủ skill phủ 3 cloud
- Vendor lock-in thực ra không tệ nếu cloud cung cấp giá trị cao

## Best practices
1. **Standardize on Kubernetes** — workload portable
2. **Use Terraform** — IaC đa cloud
3. **Centralized observability** — Datadog/Grafana cho tất cả clouds
4. **Single identity** — Okta/Azure AD federate qua các cloud
5. **Document carefully** — runbook đa cloud cực dài

## Anti-patterns
- ❌ Multi-cloud chỉ vì "trendy" → tăng chi phí gấp đôi
- ❌ Hybrid mà không có Direct Connect → latency giết app
- ❌ Cloud-agnostic toàn bộ → bỏ qua dịch vụ tốt nhất của từng cloud
- ❌ Replicate full data giữa 2 cloud → egress bill cao như compute`,
        theoryEn: `**Multi-Cloud** = 2+ public clouds. **Hybrid Cloud** = public cloud + on-premise. Different problems, different solutions.

## Multi-Cloud
**Why:**
1. Avoid vendor lock-in
2. Best-of-breed (Azure AD + GCP BigQuery + AWS Lambda)
3. Geographic coverage
4. Negotiation leverage
5. Compliance (data sovereignty)

**Challenges:**
- 3-5× operational complexity
- Multi-ecosystem expertise needed
- Expensive cross-cloud egress
- Hard to share IaC
- Complex identity management

**Patterns:**
- Cloud-agnostic (Kubernetes only)
- Distributed (different workloads per cloud)
- Active-active (same workload on 2 clouds for DR)

## Hybrid Cloud
**Why:**
1. Legacy systems can't migrate
2. Data residency requirements
3. Burst to cloud during peaks
4. Edge computing (IoT, manufacturing)
5. Predictable workloads cheaper on-prem after 3 years

**Connectivity:**
- VPN (Internet, encrypted, 50-200ms)
- Direct Connect/ExpressRoute (leased line, 5-20ms, \\$\\$\\$)
- SD-WAN (smart routing)

## Hybrid patterns
- Cloud bursting
- Cloud as DR
- Cloud-first dev

## Tools
- Kubernetes (run anywhere)
- Terraform (multi-cloud IaC)
- Anthos (Google), Azure Arc, AWS Outposts
- HashiCorp Vault for secrets

## Real-world
- Netflix: AWS-only since 2008
- Walmart: AWS + Azure (won't fund Amazon)
- Apple iCloud: own DC + AWS + GCP
- Banks: hybrid mandated by regulators

## When NOT to multi-cloud
- Startup <100 employees
- Simple workloads
- <50 engineers
- When lock-in is a fair tradeoff

## Best practices
1. Standardize on Kubernetes
2. Use Terraform for IaC
3. Centralized observability
4. Single identity provider (Okta)
5. Detailed runbooks

## Anti-patterns
- ❌ Multi-cloud for trendiness
- ❌ Hybrid without Direct Connect
- ❌ Forced cloud-agnostic (skips best services)
- ❌ Full data replication (egress kills budget)`,
        code: `# Terraform: Multi-cloud setup (AWS + Azure)

# providers.tf
"""
terraform {
  required_providers {
    aws   = { source = "hashicorp/aws"   version = "~> 5.0" }
    azurerm = { source = "hashicorp/azurerm" version = "~> 3.0" }
  }
}
provider "aws"     { region = "us-east-1" }
provider "azurerm" { features {} }
"""

# main.tf — same module, two clouds
"""
# AWS Kubernetes cluster
resource "aws_eks_cluster" "primary" {
  name     = "app-prod"
  role_arn = aws_iam_role.eks.arn
  vpc_config { subnet_ids = aws_subnet.private[*].id }
}

# Azure Kubernetes cluster (DR)
resource "azurerm_kubernetes_cluster" "secondary" {
  name                = "app-prod-dr"
  location            = "westeurope"
  resource_group_name = azurerm_resource_group.dr.name
  dns_prefix          = "appprod"
  default_node_pool {
    name       = "default"
    node_count = 3
    vm_size    = "Standard_D4_v3"
  }
  identity { type = "SystemAssigned" }
}
"""

# Python: deploy same workload to both
import subprocess

def deploy_to_cluster(cluster_name: str, kubeconfig: str):
    """Apply Kubernetes manifests to any K8s cluster (cloud-agnostic)"""
    result = subprocess.run(
        ['kubectl', '--kubeconfig', kubeconfig, 'apply', '-f', 'app/'],
        capture_output=True, text=True
    )
    print(f"[{cluster_name}] {result.stdout}")
    return result.returncode == 0

# Active-active deployment
clusters = [
    ('aws-eks-primary',  '~/.kube/aws-config'),
    ('azure-aks-dr',     '~/.kube/azure-config'),
]
for name, config in clusters:
    deploy_to_cluster(name, config)

# Hybrid: hybrid Cloud Connect cost calculator
def hybrid_connection_cost(monthly_gb: int):
    vpn = monthly_gb * 0.05         # \\$0.05/GB internet egress
    direct_connect = 250 + monthly_gb * 0.02   # \\$250/month port + \\$0.02/GB
    print(f"VPN:            \\${vpn:.2f}/month")
    print(f"Direct Connect: \\${direct_connect:.2f}/month")
    print(f"Break-even at: {(250 / 0.03):.0f} GB/month")

hybrid_connection_cost(monthly_gb=15000)`,
        codeLanguage: "python",
        exercise: "Your company has a 20-person engineering team and runs a SaaS product on AWS. Justify whether they should adopt multi-cloud or stay single-cloud, with 3 specific reasons.",
        exerciseEn: "Your company has a 20-person engineering team and runs a SaaS product on AWS. Justify whether they should adopt multi-cloud or stay single-cloud, with 3 specific reasons.",
        quiz: [
          { question: "What is multi-cloud?", options: ["Multiple regions in one cloud", "Using 2+ public cloud providers", "Multiple accounts", "Cloud + Edge"], answer: 1, explanation: "Multi-cloud means actively using multiple public cloud providers (AWS + Azure + GCP)." },
          { question: "Hybrid cloud combines:", options: ["Two public clouds", "Public cloud + on-premise data center", "Two regions", "Cloud + SaaS"], answer: 1, explanation: "Hybrid = public cloud + on-premise infrastructure connected via VPN or Direct Connect." },
          { question: "Main downside of multi-cloud?", options: ["Slower internet", "Operational complexity 3-5× higher", "More expensive hardware", "No automation possible"], answer: 1, explanation: "Each cloud has its own services, APIs, and operational model — managing all of them multiplies complexity." },
          { question: "Best tool for cloud-agnostic infrastructure?", options: ["AWS CloudFormation", "Azure ARM templates", "Terraform", "Bash scripts"], answer: 2, explanation: "Terraform supports all major clouds with the same HCL language — true multi-cloud IaC." },
          { question: "When does hybrid cloud make most sense?", options: ["New startup", "Mature company with legacy systems and data residency requirements", "Personal projects", "Test environments"], answer: 1, explanation: "Hybrid is ideal when legacy systems can't migrate or regulations require some data to stay on-premise." },
        ],
      },
      {
        id: "cloud-strat-3",
        title: "Containers vs Serverless",
        titleEn: "Containers vs Serverless",
        theory: `**Containers** (Docker, Kubernetes) và **Serverless** (Lambda, Cloud Functions) là 2 paradigm chính cho ứng dụng modern. Chọn sai = tốn $$ và bóp nghẹt scale.

## Containers
**Là gì:** đóng gói app + dependencies vào một image nhẹ, chạy nhất quán mọi nơi.

**Ưu điểm:**
- **Portable**: chạy được trên laptop, AWS, Azure, on-prem
- **Long-running**: tốt cho app cần state (web server, DB)
- **Full control**: chọn OS, runtime, resource
- **Cost-predictable**: trả tiền theo cluster size, không tính per-request

**Nhược điểm:**
- Phải quản lý cluster (nodes, scaling, patching)
- Cold start chậm (kéo image, start container) — vài giây
- Cần expertise K8s — học khó

## Serverless
**Là gì:** chạy code theo trigger (HTTP, queue, schedule), không quản lý server. Chỉ trả tiền theo execution.

**Ưu điểm:**
- **Zero ops** — không quản lý server, scaling, patching
- **Pay-per-use** — không request = \\$0
- **Auto-scale từ 0 đến 10,000 trong giây**
- **Tích hợp event** — S3, DynamoDB streams, EventBridge

**Nhược điểm:**
- **Cold start** (100ms-2s) — vấn đề cho real-time API
- **Time limit**: Lambda max 15 phút
- **Memory limit**: max 10GB
- **Vendor lock-in cao** — code gắn với AWS/Azure
- **Đắt khi traffic cao** — \\$\\$\\$ vượt EC2 sau ngưỡng

## Comparison matrix
| Tiêu chí | Containers | Serverless |
|---|---|---|
| Setup time | Cao (K8s, cluster) | Thấp (deploy code) |
| Scaling | Cần cấu hình HPA | Tự động instant |
| Cold start | 5-30s | 100ms-2s |
| Max execution | Vô hạn | 15 phút (Lambda) |
| Cost (low traffic) | Cao (cluster idle) | Gần \\$0 |
| Cost (high traffic) | Thấp | Cao |
| State | Có (volume) | Stateless (cần ext DB) |
| Languages | Mọi ngôn ngữ | Hạn chế (Python, Node, Java, Go, .NET, Ruby) |
| Vendor lock-in | Thấp | Cao |
| Best for | Long-running app, microservices, ML training | Event-driven, API GW, ETL |

## Khi nào chọn Container?
- Long-running web app (Express, Django)
- Database, message queue
- Workload >15 phút
- Cần GPU
- Đa cloud / on-prem
- Traffic cao và ổn định

## Khi nào chọn Serverless?
- API endpoints không liên tục
- Webhook handlers
- Cron jobs (1-2x/giờ)
- File processing (S3 trigger)
- Chatbot, prototype
- Mobile backend với traffic spike

## Container Services
- **AWS**: ECS (Fargate serverless container), EKS (K8s)
- **Azure**: ACI, AKS
- **GCP**: Cloud Run (serverless container), GKE

## Serverless Services
- **AWS**: Lambda, Step Functions, EventBridge
- **Azure**: Functions, Logic Apps
- **GCP**: Cloud Functions, Cloud Run

## Hybrid pattern (tốt nhất)
Nhiều hệ thống dùng cả hai:
- **Serverless**: ingestion, event handling, light API
- **Container**: heavy processing, long-running service

Ví dụ: 
- User upload ảnh → S3 → **Lambda** trigger → resize → DynamoDB
- Web app frontend → ALB → **EKS** containers (3-tier)

## Cost example: 1M requests/month, 200ms each
- **Lambda 512MB**: \\$0.20 + \\$8.30 compute = **\\$8.50**
- **Fargate 0.5 vCPU/1GB always-on**: **\\$30** (nhưng có 24/7 capacity)
- **EC2 t3.micro 24/7**: **\\$7.50** (rẻ nhất nếu request liên tục)

→ Lambda thắng cho traffic thấp; EC2 thắng cho traffic ổn định cao.

## Best practices
1. **Start serverless** — POC, prototype, MVP nhanh
2. **Migrate sang container** khi traffic >1M req/day ổn định
3. **Lambda layers** — share code giữa functions
4. **Provisioned concurrency** — eliminate cold start cho critical path
5. **Container registry security** — scan image (Trivy, Snyk)
6. **Resource limits** — đặt CPU/memory limit cho container

## Anti-patterns
- ❌ Lambda cho long-running (>15 min) → fail
- ❌ Container cho 1 lần/giờ workflow → idle 99%
- ❌ Serverless cho real-time game → cold start phá UX
- ❌ K8s cho 1 microservice → over-engineering`,
        theoryEn: `**Containers** (Docker, Kubernetes) and **Serverless** (Lambda, Cloud Functions) — choosing wrong wastes money and limits scale.

## Containers
Package app + deps into a lightweight image. Long-running, portable, full control. Need to manage cluster.

## Serverless
Run code on triggers (HTTP, queue, schedule). Zero ops, pay-per-execution, auto-scale 0→10000 in seconds. Cold starts and 15-min time limits are constraints.

## Comparison
| | Containers | Serverless |
|---|---|---|
| Setup | High (K8s) | Low |
| Cold start | 5-30s | 100ms-2s |
| Max runtime | Unlimited | 15 min (Lambda) |
| Cost (low traffic) | High | Near-zero |
| Cost (high traffic) | Low | High |
| State | Yes | Stateless |
| Lock-in | Low | High |

## When Containers
Long-running web apps, databases, >15 min workloads, GPU, multi-cloud, high & steady traffic.

## When Serverless
Intermittent APIs, webhooks, cron jobs, S3 triggers, chatbots, mobile backends, prototypes.

## Services
- AWS: ECS/Fargate/EKS vs Lambda/Step Functions
- Azure: ACI/AKS vs Functions
- GCP: Cloud Run/GKE vs Cloud Functions

## Hybrid pattern (best)
Serverless for ingestion + light APIs; Containers for heavy processing.
Example: S3 upload → Lambda resize → DynamoDB. Web → ALB → EKS containers.

## Cost example (1M requests/month, 200ms)
- Lambda 512MB: \\$8.50
- Fargate always-on: \\$30
- EC2 t3.micro 24/7: \\$7.50

## Best practices
1. Start serverless (MVP)
2. Migrate to containers when traffic stabilizes
3. Lambda layers for shared code
4. Provisioned concurrency to eliminate cold starts
5. Image scanning (Trivy/Snyk)
6. Container resource limits

## Anti-patterns
- ❌ Lambda for >15 min jobs
- ❌ Always-on container for hourly task
- ❌ Serverless for real-time games (cold start)
- ❌ K8s for single microservice`,
        code: `# === SERVERLESS: AWS Lambda image resize ===
import boto3
from PIL import Image
from io import BytesIO

s3 = boto3.client('s3')

def lambda_handler(event, context):
    """Triggered when image uploaded to S3"""
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']

    obj = s3.get_object(Bucket=bucket, Key=key)
    img = Image.open(BytesIO(obj['Body'].read()))
    img.thumbnail((300, 300))

    out = BytesIO()
    img.save(out, format='JPEG', quality=85)
    out.seek(0)

    s3.put_object(
        Bucket=f"{bucket}-thumbnails",
        Key=key,
        Body=out,
        ContentType='image/jpeg'
    )
    return {'statusCode': 200, 'body': 'Resized'}

# === CONTAINER: Dockerfile + K8s deployment ===
dockerfile = """
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "app:app"]
"""

k8s_deployment = """
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3
  selector:
    matchLabels: {app: web}
  template:
    metadata:
      labels: {app: web}
    spec:
      containers:
      - name: web
        image: 123.dkr.ecr.us-east-1.amazonaws.com/web:v1.2
        ports: [{containerPort: 8000}]
        resources:
          requests: {memory: "256Mi", cpu: "250m"}
          limits:   {memory: "512Mi", cpu: "500m"}
        livenessProbe:
          httpGet: {path: /health, port: 8000}
          initialDelaySeconds: 30
"""

# === Cost decision helper ===
def recommend_compute(req_per_month: int, avg_duration_ms: int):
    lambda_cost = (req_per_month / 1_000_000) * 0.20
    lambda_cost += (req_per_month * avg_duration_ms / 1000) * (512/1024) * 0.0000166667

    fargate_cost = 30   # always-on 0.5 vCPU/1GB
    ec2_cost = 7.50     # t3.micro 24/7

    options = sorted([
        ('Lambda',  lambda_cost),
        ('Fargate', fargate_cost),
        ('EC2',     ec2_cost),
    ], key=lambda x: x[1])

    print(f"Cheapest: {options[0][0]} at \\${options[0][1]:.2f}/month")
    for name, cost in options:
        print(f"  {name}: \\${cost:.2f}")

recommend_compute(req_per_month=1_000_000, avg_duration_ms=200)`,
        codeLanguage: "python",
        exercise: "Decide: Containers or Serverless for (1) a Slack bot, (2) a ML training job that runs 6 hours, (3) a real-time multiplayer game, (4) a daily ETL pipeline. Justify each.",
        exerciseEn: "Decide: Containers or Serverless for (1) a Slack bot, (2) a ML training job that runs 6 hours, (3) a real-time multiplayer game, (4) a daily ETL pipeline. Justify each.",
        quiz: [
          { question: "Maximum AWS Lambda execution time?", options: ["1 minute", "5 minutes", "15 minutes", "1 hour"], answer: 2, explanation: "Lambda has a hard 15-minute timeout — for longer workloads use Fargate, ECS, or Step Functions." },
          { question: "Cold start in serverless typically lasts:", options: ["1 microsecond", "100ms-2 seconds", "1 minute", "10 minutes"], answer: 1, explanation: "Cold starts add 100ms-2s while the runtime initializes. Provisioned concurrency eliminates this for critical paths." },
          { question: "Which is best for a long-running database server?", options: ["Lambda", "Containers (EKS/ECS)", "Step Functions", "EventBridge"], answer: 1, explanation: "Databases need persistent storage and continuous uptime — containers (or managed services) are the right fit." },
          { question: "Serverless is most cost-effective when:", options: ["Traffic is constant 24/7", "Traffic is intermittent / unpredictable", "Need GPU", "Need custom OS"], answer: 1, explanation: "Pay-per-execution shines for spiky/sporadic workloads. Constant traffic favors always-on containers or EC2." },
          { question: "What is GCP Cloud Run?", options: ["Database", "Serverless containers (best of both worlds)", "VM service", "DNS"], answer: 1, explanation: "Cloud Run runs containers in a serverless way — auto-scale to zero, pay per request, no Lambda's 15-min limit." },
        ],
      },
      {
        id: "cloud-strat-4",
        title: "Disaster Recovery (RTO/RPO)",
        titleEn: "Disaster Recovery (RTO/RPO)",
        theory: `**Disaster Recovery (DR)** = kế hoạch khôi phục hệ thống sau thảm họa (datacenter cháy, region down, ransomware, human error). Cloud cho phép DR rẻ hơn 10x so với on-prem.

## RTO vs RPO (2 metric quan trọng nhất)
- **RTO (Recovery Time Objective)**: thời gian tối đa được phép down. Vd: 1h
- **RPO (Recovery Point Objective)**: dữ liệu tối đa được phép mất. Vd: 5 phút (mất data 5 phút trước thảm họa)

\`\`\`
[Last backup] ←── RPO ──→ [Disaster] ←── RTO ──→ [Service back]
\`\`\`

## 4 chiến lược DR (theo AWS)

### 1. Backup & Restore (rẻ nhất)
- Backup định kỳ sang region khác (S3, snapshots)
- Khi disaster: restore từ backup (xây lại từ đầu)
- **RPO**: hours | **RTO**: 24+ hours
- **Cost**: \\$ (chỉ tốn storage)
- **Use**: dev, internal tools, archive

### 2. Pilot Light
- DR region chỉ chạy core (database replica, AMI sẵn sàng)
- Compute tắt, chỉ bật khi cần
- **RPO**: minutes | **RTO**: 10s of minutes
- **Cost**: \\$\\$ (storage + DB)
- **Use**: SaaS B2B medium-tier

### 3. Warm Standby
- DR region chạy phiên bản scaled-down của full stack
- Khi disaster: scale up + DNS failover
- **RPO**: seconds | **RTO**: minutes
- **Cost**: \\$\\$\\$ (≈30-50% production)
- **Use**: ngân hàng, e-commerce, healthcare

### 4. Multi-Site Active-Active (mạnh nhất)
- Cả 2 region chạy production song song
- Traffic split (DNS, GLB)
- **RPO**: ~0 | **RTO**: ~0 (instant failover)
- **Cost**: \\$\\$\\$\\$ (2x production)
- **Use**: trading, payment, mission-critical

## So sánh
| Strategy | RTO | RPO | Cost | Complexity |
|---|---|---|---|---|
| Backup & Restore | Hours | Hours | \\$ | Low |
| Pilot Light | 10s min | Minutes | \\$\\$ | Medium |
| Warm Standby | Minutes | Seconds | \\$\\$\\$ | High |
| Active-Active | ~0 | ~0 | \\$\\$\\$\\$ | Very high |

## Failover process (Warm Standby ví dụ)
1. **Detect**: monitoring báo region primary down (Route 53 health check)
2. **Decide**: tự động hoặc manual approve
3. **Promote replica**: read replica → primary writable
4. **Scale up**: ASG min từ 2 → 50 instance
5. **DNS update**: Route 53 chỉ về region DR
6. **Validate**: smoke test endpoints
7. **Notify**: Slack/PagerDuty báo team

## Database replication options
- **AWS Aurora Global Database**: cross-region replication <1s lag, RPO ~1s
- **DynamoDB Global Tables**: multi-region active-active, eventual consistency
- **PostgreSQL streaming replication**: async, RPO seconds
- **Snowflake Replication**: data warehouse cross-cloud

## DR testing (thường bị bỏ qua)
**Game Day exercises**: chủ động shutdown 1 component để test
- Netflix có **Chaos Monkey** từ 2010 — random kill instance
- Gremlin: SaaS chaos engineering
- Test ít nhất quarterly cho tier-1 systems

## Real-world failures
- **AWS us-east-1 Dec 2021**: 7h downtime, ảnh hưởng Slack, Disney+, Robinhood (đa số single-region)
- **Facebook Oct 2021**: BGP misconfig làm down 6h, mất \\$60M
- **GitLab Jan 2017**: human error xóa production DB, mất 6h dữ liệu (không có DR proper)

## Best practices
1. **Định nghĩa RTO/RPO trên mỗi service** — không phải tất cả đều cần \\$\\$\\$\\$
2. **Test DR quarterly** — nếu không test = không có DR
3. **Document runbook** — đầy đủ, ai cũng làm được
4. **Multi-region cho tier-1** — không tin 1 region
5. **Backup encryption** — ransomware không phá được
6. **Immutable backups** (S3 Object Lock) — chống ransomware xóa backup
7. **DNS TTL thấp** (60s) — failover nhanh

## Anti-patterns
- ❌ "We have backup" mà chưa test restore → backup hỏng nhiều khi không biết
- ❌ DR region cùng tài khoản với primary → ransomware/IAM compromise = mất cả 2
- ❌ RTO/RPO quá khắt khe trên non-critical → đốt tiền vô ích
- ❌ Manual failover → 3am nửa đêm gọi ai?`,
        theoryEn: `**Disaster Recovery (DR)** = restoring service after disasters. Cloud makes DR 10× cheaper than on-prem.

## RTO vs RPO
- **RTO (Recovery Time Objective)**: max acceptable downtime
- **RPO (Recovery Point Objective)**: max acceptable data loss

## 4 DR Strategies

### 1. Backup & Restore — cheapest
- Periodic backups to other region. RTO: 24h+, RPO: hours. \\$ cost.
- Use: dev, internal tools

### 2. Pilot Light
- Core (DB replica) running, compute off until needed. RTO: 10s of min, RPO: minutes. \\$\\$.

### 3. Warm Standby
- Scaled-down full stack in DR region. RTO: minutes, RPO: seconds. \\$\\$\\$.
- Use: banking, healthcare

### 4. Multi-Site Active-Active
- Both regions running production. RTO/RPO ~0. \\$\\$\\$\\$.
- Use: trading, payments

## Failover process (Warm Standby)
1. Detect (Route 53 health check)
2. Decide (auto or manual)
3. Promote replica
4. Scale up ASG
5. DNS update
6. Validate
7. Notify team

## DB Replication
- Aurora Global Database (RPO ~1s)
- DynamoDB Global Tables (active-active eventual)
- PostgreSQL streaming
- Snowflake Replication

## DR Testing
Game Days. Netflix Chaos Monkey since 2010. Test quarterly minimum for tier-1.

## Real-world failures
- AWS us-east-1 Dec 2021: 7h, took down Slack/Disney+/Robinhood
- Facebook Oct 2021: BGP misconfig, 6h, \\$60M loss
- GitLab Jan 2017: deleted prod DB, 6h data loss

## Best practices
1. Define RTO/RPO per service
2. Test quarterly (else no DR)
3. Document runbooks
4. Multi-region for tier-1
5. Encrypt backups
6. Immutable backups (S3 Object Lock)
7. Low DNS TTL (60s)

## Anti-patterns
- ❌ Untested backups
- ❌ DR in same account as primary (ransomware loses both)
- ❌ Over-strict RTO/RPO for non-critical
- ❌ Manual failover at 3am`,
        code: `import boto3
from datetime import datetime

# 1. Aurora Global Database (cross-region replication for DR)
rds = boto3.client('rds')

# Create global cluster (primary in us-east-1)
rds.create_global_cluster(
    GlobalClusterIdentifier='prod-global',
    SourceDBClusterIdentifier='arn:aws:rds:us-east-1:123:cluster:prod-primary',
    Engine='aurora-postgresql'
)

# Add secondary region (eu-west-1) — read replica
rds.create_db_cluster(
    DBClusterIdentifier='prod-secondary',
    Engine='aurora-postgresql',
    GlobalClusterIdentifier='prod-global',
    SourceRegion='us-east-1'
)

# 2. Route 53 failover with health check
route53 = boto3.client('route53')

# Health check on primary
hc_primary = route53.create_health_check(
    CallerReference=str(datetime.now()),
    HealthCheckConfig={
        'Type': 'HTTPS',
        'FullyQualifiedDomainName': 'primary.app.com',
        'Port': 443,
        'ResourcePath': '/health',
        'RequestInterval': 30,
        'FailureThreshold': 3
    }
)

# Primary record (used while healthy)
route53.change_resource_record_sets(
    HostedZoneId='Z123',
    ChangeBatch={
        'Changes': [{
            'Action': 'CREATE',
            'ResourceRecordSet': {
                'Name': 'app.com',
                'Type': 'A',
                'SetIdentifier': 'primary',
                'Failover': 'PRIMARY',
                'TTL': 60,                # Low TTL for fast failover
                'ResourceRecords': [{'Value': '1.2.3.4'}],
                'HealthCheckId': hc_primary['HealthCheck']['Id']
            }
        }]
    }
)

# Secondary record (kicks in if primary unhealthy)
route53.change_resource_record_sets(
    HostedZoneId='Z123',
    ChangeBatch={
        'Changes': [{
            'Action': 'CREATE',
            'ResourceRecordSet': {
                'Name': 'app.com',
                'Type': 'A',
                'SetIdentifier': 'secondary',
                'Failover': 'SECONDARY',
                'TTL': 60,
                'ResourceRecords': [{'Value': '5.6.7.8'}]
            }
        }]
    }
)

# 3. Automated failover script
def failover_to_dr_region():
    """Manual trigger if auto-failover doesn't work"""
    # Promote DR Aurora cluster to writable
    rds.failover_global_cluster(
        GlobalClusterIdentifier='prod-global',
        TargetDbClusterIdentifier='arn:aws:rds:eu-west-1:123:cluster:prod-secondary'
    )

    # Scale up DR Auto Scaling Group
    asg = boto3.client('autoscaling')
    asg.update_auto_scaling_group(
        AutoScalingGroupName='web-dr',
        MinSize=10, DesiredCapacity=20, MaxSize=50
    )

    print(f"Failover initiated at {datetime.now()}")
    # Send notification (PagerDuty, Slack)
    # ... runbook step 4 ...

# 4. RTO/RPO calculator
def calculate_dr_strategy_cost(production_cost: float, strategy: str) -> dict:
    multipliers = {
        'backup_restore': 0.05,    # 5% (just storage)
        'pilot_light':    0.15,    # 15% (DB + small compute)
        'warm_standby':   0.40,    # 40% (scaled-down full stack)
        'active_active':  1.00,    # 100% (full duplicate)
    }
    rtos = {'backup_restore': '24h', 'pilot_light': '30min', 'warm_standby': '5min', 'active_active': '<1min'}
    rpos = {'backup_restore': '1h',  'pilot_light': '5min',  'warm_standby': '30s',  'active_active': '~0s'}

    return {
        'monthly_cost': production_cost * multipliers[strategy],
        'rto': rtos[strategy],
        'rpo': rpos[strategy]
    }

print(calculate_dr_strategy_cost(10000, 'warm_standby'))
# {'monthly_cost': 4000.0, 'rto': '5min', 'rpo': '30s'}`,
        codeLanguage: "python",
        exercise: "A fintech app processes \\$5M/day in transactions. Recommend a DR strategy with specific RTO/RPO targets, estimated cost, and 3 mandatory tests.",
        exerciseEn: "A fintech app processes \\$5M/day in transactions. Recommend a DR strategy with specific RTO/RPO targets, estimated cost, and 3 mandatory tests.",
        quiz: [
          { question: "What does RTO measure?", options: ["Maximum data loss allowed", "Maximum downtime allowed", "Number of backups", "Server speed"], answer: 1, explanation: "RTO (Recovery Time Objective) is the maximum acceptable downtime before service is restored." },
          { question: "Cheapest DR strategy?", options: ["Active-Active", "Backup & Restore", "Warm Standby", "Pilot Light"], answer: 1, explanation: "Backup & Restore only pays for storage — no compute running idle. RTO is hours, not seconds." },
          { question: "Best DR strategy for a stock trading platform?", options: ["Backup & Restore", "Pilot Light", "Active-Active multi-region", "No DR needed"], answer: 2, explanation: "Trading needs near-zero RTO/RPO — only Active-Active provides instant failover with no data loss." },
          { question: "Why use immutable backups (S3 Object Lock)?", options: ["Cheaper", "Prevent ransomware/attacker from deleting backups", "Faster restore", "Smaller files"], answer: 1, explanation: "Object Lock makes backups WORM (write-once-read-many) — even compromised admin credentials can't delete them." },
          { question: "How often should you test DR?", options: ["Never (it works)", "Quarterly minimum for tier-1 systems", "Once a decade", "Only after disasters"], answer: 1, explanation: "Untested DR is no DR. Quarterly Game Days catch broken runbooks, expired credentials, and stale assumptions." },
        ],
      },
      {
        id: "cloud-strat-5",
        title: "Multi-Region Active-Active Architecture",
        titleEn: "Multi-Region Active-Active Architecture",
        theory: `**Multi-Region Active-Active** = chạy production song song trên ≥2 region. Đây là kiến trúc đỉnh cao cho tier-1 systems (banking, payments, global SaaS).

## Tại sao cần?
1. **Latency thấp toàn cầu** — user EU không phải ping qua US (~150ms)
2. **Disaster recovery** RTO ~0 — region down vẫn chạy
3. **Compliance** — data residency theo quốc gia (GDPR EU, India, China)
4. **Capacity** — vượt giới hạn 1 region

## 3 patterns chính

### Pattern 1: Active-Passive (failover)
- Region A xử lý 100% traffic, Region B chỉ standby
- Disaster: Route 53 chuyển sang B
- **Đơn giản** nhưng B thường idle = lãng phí

### Pattern 2: Active-Active (Geo-routing)
- DNS trả về region gần nhất (Route 53 latency-based hoặc geolocation)
- User EU → eu-west-1, user US → us-east-1
- **Latency thấp** + DR tự nhiên
- Mỗi region xử lý subset của user → cần data sync

### Pattern 3: Cell-based (Netflix, AWS)
- Chia user thành "cells", mỗi cell tồn tại độc lập
- Cell failure không ảnh hưởng cell khác
- Cực phức tạp, chỉ phù hợp hyper-scale

## Thách thức data consistency
**CAP theorem**: chọn 2 trong 3 — Consistency, Availability, Partition tolerance
- **CP**: bank, transaction (chấp nhận downtime để bảo vệ data)
- **AP**: social media, cart (chấp nhận inconsistency tạm thời)

**3 chiến lược:**
1. **Strong consistency** — sync write 2 region (latency cao)
2. **Eventual consistency** — async, accept lag (DynamoDB Global Tables)
3. **Conflict resolution** — last-write-wins, CRDT, application logic

## Database options
- **DynamoDB Global Tables** — multi-region active-active, eventual (~1s lag)
- **Aurora Global Database** — 1 writer, multi reader (sync <1s)
- **Cosmos DB (Azure)** — multi-master với 5 consistency levels
- **CockroachDB** — global SQL với strong consistency
- **Spanner (GCP)** — global SQL với TrueTime atomic clock

## Networking
- **Global Load Balancer**: AWS Global Accelerator, GCP GLB, Azure Front Door
- **CDN edge**: CloudFront, Cloudflare — cache static + edge compute
- **Cross-region peering**: VPC peering hoặc Transit Gateway

## Real architecture: Spotify
- 4 regions: US-east, US-west, EU, APAC
- DynamoDB-like store cho user data (eventual consistency OK cho playlist)
- Strong consistency chỉ cho subscription billing
- 350M users, 99.95% uptime

## Real architecture: Stripe
- Active-active cross-region cho **idempotency**
- Strong consistency cho payment (CockroachDB)
- Game Days hàng tuần, chaos engineering
- Failover <30s

## Cost analysis
| Component | Single-region | Multi-region |
|---|---|---|
| Compute | \\$10k | \\$20k (2x) |
| Database | \\$5k | \\$8k (replica overhead) |
| Cross-region transfer | \\$0 | \\$2k (data sync egress) |
| Operations | \\$5k | \\$15k (3x complexity) |
| **Total** | **\\$20k** | **\\$45k** (2.25x) |

→ Justify only when downtime cost > extra spend.

## Operational complexity
- **Deployment**: phải coordinate 2 region (canary trên A trước, sau B)
- **Schema migration**: backward compatible bắt buộc (rolling update)
- **Monitoring**: dashboard cho từng region + global aggregate
- **Incident response**: ai trực region nào? cross-region bridge call

## Best practices
1. **Stateless services** — bất kỳ region nào cũng xử lý được request
2. **Asymmetric reads** — read local, write to nearest writer
3. **Idempotency keys** — request retry không double-charge
4. **Canary deployments per region** — deploy 5% region A, monitor, rồi roll
5. **Region health dashboard** — Status page hiển thị per-region
6. **Failover drills** — quarterly, có pre-defined runbook

## Anti-patterns
- ❌ Multi-region với strong consistency cho mọi service → latency chết
- ❌ Active-active không có conflict resolution → data corruption
- ❌ Deploy đồng thời cả 2 region → cùng bug = down toàn bộ
- ❌ Multi-region cho startup MVP → over-engineering, đốt tiền`,
        theoryEn: `**Multi-Region Active-Active** = production running in ≥2 regions simultaneously. The peak architecture for tier-1 systems.

## Why
1. Low global latency
2. RTO ~0 disaster recovery
3. Data residency compliance
4. Capacity beyond one region

## 3 Patterns
1. **Active-Passive** — A serves all, B standby. Simple but B idle.
2. **Active-Active geo-routed** — DNS picks nearest region. Low latency + natural DR.
3. **Cell-based** (Netflix/AWS) — independent cells per user subset. Hyper-scale only.

## CAP Theorem
Choose 2 of: Consistency, Availability, Partition tolerance.
- CP: banks (downtime over data loss)
- AP: social media (eventual OK)

## Consistency strategies
1. Strong (sync write all regions, slow)
2. Eventual (async, accept lag)
3. Conflict resolution (LWW, CRDT, app logic)

## DBs
- DynamoDB Global Tables (active-active eventual)
- Aurora Global Database (1 writer)
- Cosmos DB (multi-master, 5 levels)
- CockroachDB (global SQL strong)
- Spanner (TrueTime atomic clock)

## Networking
Global Load Balancers, CDN edges, cross-region peering.

## Spotify
4 regions, eventual for playlists, strong for billing. 350M users, 99.95% uptime.

## Stripe
Active-active with idempotency keys, CockroachDB for payments, weekly Game Days, <30s failover.

## Cost
Single-region \\$20k → multi-region \\$45k (2.25×). Justified only when downtime > extra cost.

## Operational complexity
- Coordinated deploys (canary per region)
- Backward-compatible schema migrations
- Per-region + global dashboards
- Cross-region incident response

## Best practices
1. Stateless services
2. Asymmetric reads (local) and writes (nearest writer)
3. Idempotency keys
4. Canary per region
5. Per-region status dashboard
6. Quarterly failover drills

## Anti-patterns
- ❌ Strong consistency everywhere (latency dies)
- ❌ Active-active without conflict resolution
- ❌ Simultaneous deploys to all regions
- ❌ Multi-region for startup MVP`,
        code: `# === DynamoDB Global Tables (active-active) ===
import boto3

dynamodb = boto3.client('dynamodb')

# Create base table in us-east-1
dynamodb.create_table(
    TableName='users',
    KeySchema=[{'AttributeName': 'user_id', 'KeyType': 'HASH'}],
    AttributeDefinitions=[{'AttributeName': 'user_id', 'AttributeType': 'S'}],
    BillingMode='PAY_PER_REQUEST',
    StreamSpecification={
        'StreamEnabled': True,
        'StreamViewType': 'NEW_AND_OLD_IMAGES'    # Required for Global
    }
)

# Add to global table — replicate to eu-west-1 and ap-southeast-1
dynamodb.create_global_table(
    GlobalTableName='users',
    ReplicationGroup=[
        {'RegionName': 'us-east-1'},
        {'RegionName': 'eu-west-1'},
        {'RegionName': 'ap-southeast-1'}
    ]
)

# Write from any region — auto-replicates within seconds
us_dynamo = boto3.resource('dynamodb', region_name='us-east-1')
us_dynamo.Table('users').put_item(Item={
    'user_id': '123',
    'name': 'Alice',
    'updated_at': '2026-04-19T10:00:00Z'
})

# === Route 53 Latency-Based Routing ===
route53 = boto3.client('route53')

# Same DNS name, different IPs per region — Route 53 picks nearest
for region, ip in [('us-east-1', '1.2.3.4'),
                   ('eu-west-1', '5.6.7.8'),
                   ('ap-southeast-1', '9.10.11.12')]:
    route53.change_resource_record_sets(
        HostedZoneId='Z123',
        ChangeBatch={'Changes': [{
            'Action': 'CREATE',
            'ResourceRecordSet': {
                'Name': 'api.app.com',
                'Type': 'A',
                'SetIdentifier': region,
                'Region': region,                    # AWS-specific latency
                'TTL': 60,
                'ResourceRecords': [{'Value': ip}]
            }
        }]}
    )

# === Idempotency key for safe retries ===
import hashlib
import json

def safe_payment(amount: float, user_id: str, request_id: str):
    """Process payment with idempotency — retry-safe across regions"""
    idempotency_key = hashlib.sha256(
        f"{user_id}:{request_id}".encode()
    ).hexdigest()

    # Check if already processed (any region writes here)
    table = boto3.resource('dynamodb').Table('payments')
    existing = table.get_item(Key={'idempotency_key': idempotency_key})

    if 'Item' in existing:
        return existing['Item']     # Already done — return cached result

    # Process new payment
    result = {'idempotency_key': idempotency_key, 'amount': amount,
              'status': 'completed'}
    table.put_item(Item=result, ConditionExpression='attribute_not_exists(idempotency_key)')
    return result

# === Health check global aggregator ===
def check_all_regions():
    regions = ['us-east-1', 'eu-west-1', 'ap-southeast-1']
    health = {}
    for region in regions:
        # Custom health endpoint per region
        # health[region] = httpx.get(f'https://{region}.api.app.com/health').json()
        health[region] = {'status': 'healthy', 'latency_ms': 25}
    return health

print(json.dumps(check_all_regions(), indent=2))`,
        codeLanguage: "python",
        exercise: "Design a multi-region active-active architecture for a global e-commerce platform serving US, EU, and Asia. Specify: DB choice, consistency model, failover strategy, and 3 trade-offs accepted.",
        exerciseEn: "Design a multi-region active-active architecture for a global e-commerce platform serving US, EU, and Asia. Specify: DB choice, consistency model, failover strategy, and 3 trade-offs accepted.",
        quiz: [
          { question: "Active-Active means:", options: ["One region serves traffic, other is standby", "Both regions actively serve production traffic", "Backup runs every hour", "Two databases sharing one disk"], answer: 1, explanation: "Active-Active runs production in 2+ regions simultaneously, often with geo-routing to nearest user." },
          { question: "CAP Theorem says you must trade off:", options: ["Cost, Availability, Performance", "Consistency, Availability, Partition tolerance", "Compute, Storage, Network", "CDN, API, Database"], answer: 1, explanation: "Eric Brewer's CAP says distributed systems can guarantee only 2 of: Consistency, Availability, Partition tolerance." },
          { question: "Best DB for global active-active with strong consistency?", options: ["Single-region MySQL", "DynamoDB Global Tables", "Spanner or CockroachDB", "Redis"], answer: 2, explanation: "Spanner (atomic clock) and CockroachDB are designed for global strong consistency. DynamoDB Global is eventual." },
          { question: "Why use idempotency keys in multi-region?", options: ["Faster queries", "Prevent duplicate charges when retries cross regions", "Smaller payloads", "Lower latency"], answer: 1, explanation: "Network partitions cause client retries — idempotency keys ensure the same payment isn't processed twice." },
          { question: "Anti-pattern in multi-region?", options: ["Per-region canary deploys", "Backward-compatible schema migrations", "Deploying simultaneously to all regions", "Idempotency keys"], answer: 2, explanation: "Simultaneous deploys mean a single bug takes down ALL regions. Always canary one region first, then gradually expand." },
        ],
      },
    ],
  },
];
