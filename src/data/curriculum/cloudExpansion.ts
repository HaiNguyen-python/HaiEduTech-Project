import type { ExtendedProgrammingModule } from "./types";

// Cloud Engineer - Expansion: 2 new modules, 10 deep lessons total
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
        theory: `## 1. 🚦 Vấn đề đời thường

Tưởng tượng bạn mở quán phở online. Hôm bình thường 100 khách → một bếp lo được. Đến Tết, 5.000 đơn cùng lúc → một bếp **cháy**. Bạn cần nhiều bếp, biết tự thuê thêm khi đông, tự cho nghỉ khi vắng → đó chính là **Auto Scaling + Load Balancer** trên cloud.

Cùng lúc, bạn phải chọn **kho lưu trữ**: thực phẩm tươi để tủ lạnh (truy cập nhanh), gia vị khô để kho (rẻ), giấy tờ cũ gửi kho ngoài (cực rẻ, ít đụng). Cloud cũng vậy: **Block / Object / Archive storage**.

## 2. 💡 Khái niệm chính: 3 loại Storage

| Loại | Đời sống | Cloud (AWS) | Khi nào |
|------|----------|-------------|---------|
| **Block** | Tủ lạnh trong bếp | EBS | Database, OS disk - cần IOPS cao |
| **Object** | Kho hàng có mã vạch | S3 | Ảnh, video, log, backup |
| **Archive** | Kho gửi ngoại thành | Glacier | Dữ liệu pháp lý 7 năm, ít đọc |

Giá rẻ dần từ trên xuống, nhưng độ trễ (latency) tăng dần.

## 3. 🧰 Bộ công cụ Resilience tối thiểu

- **Load Balancer (ELB/ALB)**: chia khách cho nhiều bếp.
- **Auto Scaling Group**: tự thêm/bớt bếp theo CPU, request/giây.
- **Multi-AZ**: triển khai ở ≥2 vùng trong 1 region → mất 1 vùng vẫn sống.
- **Health Check**: bếp ốm → load balancer tự bỏ qua.

## 4. 🎯 Ví dụ chạy được ngay

\`\`\`python
import boto3
ec2 = boto3.client("ec2")
asg = boto3.client("autoscaling")

# Tạo Auto Scaling Group: min 2, max 10, desired 2
asg.create_auto_scaling_group(
    AutoScalingGroupName="pho-quan-asg",
    MinSize=2, MaxSize=10, DesiredCapacity=2,
    LaunchTemplate={"LaunchTemplateName": "pho-template"},
    AvailabilityZones=["ap-southeast-1a", "ap-southeast-1b"],
)
\`\`\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Đặt Auto Scaling chỉ theo CPU sẽ "chậm 1 nhịp" - khi CPU 80% thì đã có khách bỏ đi. Hãy kết hợp **request/giây** hoặc **queue length**.

- **Quên Multi-AZ** → một vùng sập là toàn bộ app sập.
- **Để storage Block cho file tĩnh** → đắt gấp 10× so với S3.
- **Health check sai endpoint** → load balancer giết server khoẻ vì nó không trả 200.

## 6. ✅ Best practice

> 💡 **Mẹo:** Quy tắc 3-2-1 cho dữ liệu - **3** bản sao, **2** loại storage khác nhau, **1** bản ở vùng địa lý khác.

- Bật **lifecycle policy** trên S3: file > 90 ngày tự chuyển Glacier → tiết kiệm 70% chi phí.
- Đặt **scaling cooldown** 60–120 giây để tránh "ping-pong" thêm-bớt liên tục.
- **Dry-run** Auto Scaling vào giờ thấp điểm trước khi bật production.

## 7. 🤔 Khi nào dùng / không dùng

- ✅ Dùng Auto Scaling khi traffic **biến động lớn** (ecommerce, livestream, game ra mắt).
- ❌ Không cần khi traffic **đều và nhỏ** (blog cá nhân) - 1 server + snapshot đủ rồi.
- ✅ Object Storage cho mọi file người dùng upload (ảnh đại diện, video).
- ❌ Tránh Block Storage cho ảnh - bạn sẽ trả gấp 10× tiền vô ích.

## 8. 📌 Tóm tắt 30 giây

Cloud Resilience = **đủ bếp + đúng kho + biết phục hồi**. Auto Scaling lo "đủ bếp", chọn Block/Object/Archive lo "đúng kho", Multi-AZ + Health Check lo "phục hồi". Nhớ quy tắc 3-2-1 và lifecycle policy là bạn vừa **không sập** vừa **không cháy ví**.
`,
        theoryEn: `**Cloud Storage** comes in 3 main types - choosing wrong is the most common cloud architecture mistake.

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
- **Immutable** - overwrite the whole object
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
        code: `# Nhập thư viện boto3 để tương tác với các dịch vụ AWS.
import boto3

# Block Storage (EBS) - gắn vào MỘT EC2
# Khởi tạo một client EC2 để tương tác với dịch vụ EC2.
ec2 = boto3.client('ec2')
# Tạo một ổ đĩa EBS (Elastic Block Store) mới.
# Đầu vào: Các thông số cấu hình cho ổ đĩa EBS.
# Đầu ra: Một đối tượng chứa thông tin về ổ đĩa EBS đã tạo.
ebs = ec2.create_volume(
    AvailabilityZone='us-east-1a', # Vùng khả dụng mà ổ đĩa sẽ được tạo.
    Size=100,                    # Kích thước của ổ đĩa tính bằng GB.
    VolumeType='gp3',            # Loại ổ đĩa: gp3 là loại SSD đa dụng.
    Iops=3000,                   # Số lượng hoạt động nhập/xuất mỗi giây (IOPS).
    Throughput=125,              # Băng thông của ổ đĩa tính bằng MB/s.
    Encrypted=True               # Đặt True để mã hóa ổ đĩa.
)

# File Storage (EFS) - gắn được nhiều EC2 (NFS)
# Khởi tạo một client EFS để tương tác với dịch vụ EFS.
efs = boto3.client('efs')
# Tạo một hệ thống tệp EFS (Elastic File System) mới.
# Đầu vào: Các thông số cấu hình cho hệ thống tệp EFS.
# Đầu ra: Một đối tượng chứa thông tin về hệ thống tệp EFS đã tạo.
fs = efs.create_file_system(
    PerformanceMode='generalPurpose', # Chế độ hiệu suất chung.
    ThroughputMode='elastic',         # Chế độ thông lượng co giãn.
    Encrypted=True                    # Đặt True để mã hóa hệ thống tệp.
)

# Object Storage (S3) - khả năng mở rộng không giới hạn
# Khởi tạo một client S3 để tương tác với dịch vụ S3.
s3 = boto3.client('s3')
# Tạo một bucket S3 mới.
# Đầu vào: Tên của bucket.
# Đầu ra: Không có giá trị trả về trực tiếp, nhưng bucket sẽ được tạo trên AWS.
s3.create_bucket(Bucket='my-data-lake-2026')
# Tải một đối tượng (file) lên bucket S3.
# Đầu vào: Tên bucket, khóa đối tượng (đường dẫn file), nội dung file và lớp lưu trữ.
# Đầu ra: Không có giá trị trả về trực tiếp, nhưng đối tượng sẽ được lưu trữ trong S3.
s3.put_object(
    Bucket='my-data-lake-2026',          # Tên của bucket S3.
    Key='2026/01/users.parquet',         # Đường dẫn và tên file trong bucket.
    Body=open('users.parquet', 'rb'),    # Nội dung của file để tải lên (mở ở chế độ đọc nhị phân).
    StorageClass='INTELLIGENT_TIERING'   # Lớp lưu trữ thông minh, tự động di chuyển dữ liệu ít truy cập.
)

# Chọn loại lưu trữ dựa trên khối lượng công việc
# Định nghĩa một hàm để đề xuất loại lưu trữ AWS phù hợp dựa trên khối lượng công việc.
# Đầu vào: workload (chuỗi) - mô tả loại công việc.
# Đầu ra: str (chuỗi) - tên loại lưu trữ được đề xuất.
def recommend_storage(workload: str) -> str:
    # Định nghĩa các quy tắc ánh xạ khối lượng công việc với loại lưu trữ.
    rules = {
        "database":      "Block (EBS gp3 / io2)",      # Cơ sở dữ liệu thường dùng Block Storage.
        "shared_code":   "File (EFS)",                 # Mã nguồn chia sẻ dùng File Storage.
        "backup":        "Object (S3 Glacier)",        # Sao lưu dùng Object Storage (S3 Glacier cho dữ liệu lạnh).
        "static_site":   "Object (S3 + CloudFront)",   # Trang web tĩnh dùng Object Storage (S3) kết hợp CDN (CloudFront).
        "data_lake":     "Object (S3 Parquet)",        # Data Lake dùng Object Storage (S3) với định dạng Parquet.
        "boot_disk":     "Block (EBS gp3)",            # Ổ đĩa khởi động máy chủ dùng Block Storage.
    }
    # Trả về loại lưu trữ tương ứng với khối lượng công việc, nếu không tìm thấy sẽ trả về mặc định.
    return rules.get(workload, "Object (default)")

# Gọi hàm recommend_storage với khối lượng công việc "data_lake" và in kết quả.
# Kết quả mong đợi: "Object (S3 Parquet)"
print(recommend_storage("data_lake"))`,
        codeLanguage: "python",
        exercise: "Design storage for a video streaming platform with: user database, raw uploaded videos, encoded video segments, and shared editing workspace. Explain which storage type for each.",
        exerciseEn: "Design storage for a video streaming platform with: user database, raw uploaded videos, encoded video segments, and shared editing workspace. Explain which storage type for each.",
        quiz: [
          { question: "Which storage type is best for a PostgreSQL database?", options: ["Object (S3)", "File (EFS)", "Block (EBS)", "Archive (Glacier)"], answer: 2, explanation: "Block storage offers sub-ms latency and high IOPS, essential for transactional databases." },
          { question: "What is S3's durability guarantee?", options: ["99%", "99.9%", "99.99%", "99.999999999% (11 nines)"], answer: 3, explanation: "S3 Standard provides 11 nines of durability - losing one object is statistically near-impossible." },
          { question: "Which storage CANNOT be attached to multiple instances simultaneously?", options: ["EFS", "S3", "EBS (standard)", "Azure Files"], answer: 2, explanation: "Standard EBS is single-attach. Multi-attach EBS exists but is limited to specific volume types and use cases." },
          { question: "Best storage for storing 10 PB of historical logs accessed once a year?", options: ["EBS", "EFS", "S3 Glacier Deep Archive", "RDS"], answer: 2, explanation: "Glacier Deep Archive costs ~$0.001/GB/month - perfect for rarely-accessed cold data." },
          { question: "Why is object storage NOT ideal for OS boot volumes?", options: ["Too expensive", "High latency (10-100ms) and HTTP-only API", "Too small capacity", "No encryption"], answer: 1, explanation: "Booting an OS requires sub-ms random reads. Object storage's HTTP API and high latency make it unsuitable." },
        ],
      },
      {
        id: "cloud-ops-2",
        title: "Auto Scaling & Load Balancing",
        titleEn: "Auto Scaling & Load Balancing",
        theory: `## 1. 🚦 Vấn đề đời thường

Quán phở của thầy ngày thường đông 50 khách, đặt 5 bàn là đủ. Nhưng sáng mùng 1 Tết: 300 khách ùa vào - bàn ghế đâu? Nhân viên đâu? Nếu thuê sẵn 50 bàn quanh năm thì lỗ chỏng vó vì 360 ngày kia chỉ dùng 5 bàn.

→ **Auto Scaling + Load Balancer** chính là người bồi bàn thông minh: tự kê thêm bàn khi đông, tự cất bớt khi vắng, và phân khách đều ra các bàn để không có bàn nào bị quá tải.

## 2. 💡 Khái niệm chính

- **Auto Scaling Group (ASG)**: nhóm máy chủ tự co giãn theo CPU / RAM / số request.
- **Load Balancer (LB)**: "lễ tân" đứng trước, chia request đều ra các máy phía sau.
- **Health Check**: mỗi 30s LB hỏi "máy còn sống không?" - máy chết thì LB cắt traffic.

## 3. 🧰 Thành phần tối thiểu

| Thành phần | Vai trò | Ví dụ AWS |
|---|---|---|
| Launch Template | "Công thức" tạo máy mới | EC2 AMI + user-data |
| ASG | Quản lý min/max/desired | min=2, max=20 |
| Target Group | Danh sách máy đang sống | Health check /health |
| ALB / NLB | Lễ tân chia traffic | Round-robin, sticky |

## 4. 🎯 Ví dụ chạy được ngay

\\\`\\\`\\\`yaml
# Auto Scaling Policy (CPU > 70% → thêm máy)
TargetTrackingScalingPolicy:
  TargetValue: 70.0
  PredefinedMetricSpecification:
    PredefinedMetricType: ASGAverageCPUUtilization
  ScaleOutCooldown: 60      # đợi 60s rồi mới scale tiếp
  ScaleInCooldown: 300      # cắt máy chậm hơn (tránh rung)
\\\`\\\`\\\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:**
> - **Cooldown quá ngắn** → ASG "rung" liên tục: vừa thêm máy đã cắt, vừa cắt đã thêm.
> - **Health check sai endpoint** → LB tưởng máy chết, cắt hết → website sập.
> - **Chỉ scale theo CPU** → app I/O-bound (đợi DB) thì CPU thấp nhưng request xếp hàng dài.
> - **Quên warm-up** → máy mới bật chưa kịp cache đã nhận traffic → user gặp lỗi 502.

## 6. ✅ Best practice

> 💡 **Mẹo:**
> - **Scale-out nhanh, scale-in chậm**: thà thừa máy 5 phút còn hơn thiếu 30 giây.
> - **Multi-AZ**: ASG trải máy qua ít nhất 2 vùng - 1 vùng sập vẫn sống.
> - Dùng **Predictive Scaling** nếu lưu lượng có pattern (ví dụ Shopee Sale 12.12 - tăng máy trước 30 phút).
> - **Pre-warm LB** trước event lớn: gọi AWS Support hoặc dùng warm-up traffic giả.

## 7. 🤔 Khi nào dùng / không dùng

| Dùng khi | Không cần dùng |
|---|---|
| Traffic dao động ngày/đêm, mùa | Hệ thống lưu lượng phẳng quanh năm |
| Cần HA - chịu được 1 máy chết | Demo nội bộ 5 user |
| Chi phí quan trọng (giảm 40-60%) | Workload stateful chưa tách session |

## 8. 📌 Tóm tắt 30 giây

Auto Scaling = bồi bàn tự kê thêm/cất bớt bàn. Load Balancer = lễ tân chia khách. Cặp đôi này giúp app tự sống, tự rẻ, tự HA. Nhớ: scale-out nhanh, scale-in chậm, multi-AZ, health check đúng endpoint.
`,
        theoryEn: `**Auto Scaling + Load Balancing** is the core combo that makes cloud apps elastic and cheaper than on-premise.

## Auto Scaling
Automatically add/remove instances based on metrics (CPU, memory, RPS, queue depth). Goal: just enough - no waste, no outage.

## 4 strategies
1. **Manual** - admin sets count (test only)
2. **Scheduled** - fixed hours (8am → 10 instances, 10pm → 2)
3. **Dynamic** - react to live metrics (CPU >70% → +1)
4. **Predictive** - ML forecasts traffic (AWS since 2018)

## Vertical vs Horizontal
| | Vertical | Horizontal |
|---|---|---|
| How | Bigger box | More boxes |
| Limit | Hardware max | ~Infinite |
| Downtime | Yes | No |
| Cloud-native | ❌ | ✅ |

Cloud always prefers **horizontal** - that's what makes it different from on-prem.

## Load Balancer
Distributes traffic to backends with continuous health checks.

**AWS LB types:**
- **ALB** (L7) - URL/header/host routing, web/microservices
- **NLB** (L4) - TCP/UDP, sub-ms latency, gaming/IoT
- **GLB** (L3) - firewall appliances

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
        code: `# Nhập thư viện boto3 để tương tác với các dịch vụ AWS.
import boto3

# 1. Tạo Launch Template (bản thiết kế cho các máy chủ EC2)
# Khởi tạo client EC2 để gọi các API liên quan đến EC2.
ec2 = boto3.client('ec2')
# Gọi API để tạo một Launch Template mới.
template = ec2.create_launch_template(
    # Đặt tên cho Launch Template.
    LaunchTemplateName='web-app-v1',
    # Cung cấp dữ liệu cấu hình cho Launch Template.
    LaunchTemplateData={
        # ID của Amazon Machine Image (AMI) sẽ được dùng để khởi tạo instance.
        'ImageId': 'ami-0abcdef1234567890',
        # Loại instance (kích thước máy chủ) sẽ được khởi tạo.
        'InstanceType': 't3.medium',
        # Danh sách các Security Group IDs sẽ được gán cho instance.
        'SecurityGroupIds': ['sg-web'],
        # Dữ liệu người dùng (User Data) sẽ chạy khi instance khởi động lần đầu.
        # Đây là một script bash được mã hóa Base64 để chạy Docker container.
        'UserData': 'IyEvYmluL2Jhc2gKZG9ja2VyIHJ1biAtZCAtcCA4MDo4MCBteWFwcA=='
    }
)

# 2. Tạo Auto Scaling Group (nhóm tự động điều chỉnh số lượng máy chủ)
# Khởi tạo client Auto Scaling để gọi các API liên quan.
asg = boto3.client('autoscaling')
# Gọi API để tạo một Auto Scaling Group mới.
asg.create_auto_scaling_group(
    # Đặt tên cho Auto Scaling Group.
    AutoScalingGroupName='web-asg',
    # Số lượng instance tối thiểu luôn phải có trong nhóm.
    MinSize=2,                # Luôn có ít nhất 2 instance để đảm bảo tính sẵn sàng cao (HA).
    # Số lượng instance tối đa mà nhóm có thể mở rộng tới.
    MaxSize=20,
    # Số lượng instance mong muốn hiện tại trong nhóm.
    DesiredCapacity=4,
    # Tham chiếu đến Launch Template đã tạo ở bước 1.
    LaunchTemplate={'LaunchTemplateName': 'web-app-v1'},
    # Danh sách các Subnet IDs mà các instance sẽ được phân bổ vào.
    # Đặt trong nhiều Availability Zone (Multi-AZ) để tăng tính sẵn sàng.
    VPCZoneIdentifier='subnet-1a,subnet-1b,subnet-1c',  # Đảm bảo hoạt động trên nhiều vùng sẵn sàng.
    # Loại kiểm tra sức khỏe (Health Check) sẽ được sử dụng.
    HealthCheckType='ELB',
    # Thời gian chờ (tính bằng giây) trước khi Auto Scaling Group bắt đầu kiểm tra sức khỏe của một instance mới.
    HealthCheckGracePeriod=300
)

# 3. Chính sách điều chỉnh quy mô động (dựa trên mục tiêu)
# Gọi API để đặt một chính sách điều chỉnh quy mô cho Auto Scaling Group.
asg.put_scaling_policy(
    # Tên của Auto Scaling Group mà chính sách này áp dụng.
    AutoScalingGroupName='web-asg',
    # Tên của chính sách điều chỉnh quy mô.
    PolicyName='cpu-target-50',
    # Loại chính sách, ở đây là Target Tracking Scaling (theo dõi mục tiêu).
    PolicyType='TargetTrackingScaling',
    # Cấu hình chi tiết cho chính sách Target Tracking.
    TargetTrackingConfiguration={
        # Đặc tả về chỉ số được theo dõi.
        'PredefinedMetricSpecification': {
            # Loại chỉ số được định nghĩa sẵn, ở đây là mức sử dụng CPU trung bình của ASG.
            'PredefinedMetricType': 'ASGAverageCPUUtilization'
        },
        # Giá trị mục tiêu mà chính sách sẽ cố gắng duy trì cho chỉ số.
        'TargetValue': 50.0   # Giữ mức sử dụng CPU trung bình khoảng 50%.
    }
)

# 4. Application Load Balancer (ALB) với kiểm tra sức khỏe
# Khởi tạo client ELBv2 để gọi các API liên quan đến Application Load Balancer.
elb = boto3.client('elbv2')
# Gọi API để tạo một Load Balancer mới.
lb = elb.create_load_balancer(
    # Đặt tên cho Load Balancer.
    Name='web-alb',
    # Danh sách các Subnet IDs mà Load Balancer sẽ hoạt động.
    Subnets=['subnet-1a', 'subnet-1b', 'subnet-1c'],
    # Danh sách các Security Group IDs sẽ được gán cho Load Balancer.
    SecurityGroups=['sg-alb'],
    # Sơ đồ truy cập của Load Balancer (internet-facing có thể truy cập từ internet).
    Scheme='internet-facing',
    # Loại Load Balancer, ở đây là Application Load Balancer.
    Type='application'
)

# Tạo Target Group (nhóm đích) để định tuyến lưu lượng truy cập đến các instance.
tg = elb.create_target_group(
    # Đặt tên cho Target Group.
    Name='web-tg',
    # Giao thức mà Target Group sử dụng để giao tiếp với các đích.
    Protocol='HTTP',
    # Cổng mà Target Group lắng nghe trên các đích.
    Port=80,
    # ID của VPC mà Target Group thuộc về.
    VpcId='vpc-12345',
    # Đường dẫn URL mà Load Balancer sẽ gửi yêu cầu kiểm tra sức khỏe đến.
    HealthCheckPath='/health',     # Sử dụng một endpoint tùy chỉnh để kiểm tra sức khỏe.
    # Khoảng thời gian (tính bằng giây) giữa các lần kiểm tra sức khỏe.
    HealthCheckIntervalSeconds=15,
    # Số lần kiểm tra sức khỏe thành công liên tiếp để đánh dấu một đích là khỏe mạnh.
    HealthyThresholdCount=2,
    # Số lần kiểm tra sức khỏe thất bại liên tiếp để đánh dấu một đích là không khỏe mạnh.
    UnhealthyThresholdCount=3
)
`,
        codeLanguage: "python",
        exercise: "Design an auto-scaling setup for an e-commerce site that gets 10× traffic during Black Friday. Include: min/max sizes, scaling triggers, LB type, and one cost-saving technique.",
        exerciseEn: "Design an auto-scaling setup for an e-commerce site that gets 10× traffic during Black Friday. Include: min/max sizes, scaling triggers, LB type, and one cost-saving technique.",
        quiz: [
          { question: "Horizontal scaling means:", options: ["Bigger CPU/RAM", "More instances of the same size", "Faster network", "Cheaper storage"], answer: 1, explanation: "Horizontal scaling adds more instances. Vertical scaling makes one instance bigger." },
          { question: "Which LB is best for a real-time multiplayer game?", options: ["ALB (L7)", "NLB (L4)", "GLB (L3)", "Classic LB"], answer: 1, explanation: "NLB operates at L4 with sub-ms latency, ideal for TCP/UDP gaming traffic." },
          { question: "What does Predictive Scaling use?", options: ["Random rules", "Machine learning on historical traffic", "Manual schedules", "DNS round-robin"], answer: 1, explanation: "Predictive Scaling uses ML to forecast traffic patterns and pre-warm capacity." },
          { question: "Why set Min instances ≥ 2?", options: ["Cost savings", "Multi-AZ high availability", "Faster startup", "Required by AWS"], answer: 1, explanation: "Running ≥2 instances across different AZs prevents single-point-of-failure outages." },
          { question: "What is connection draining?", options: ["Stopping new traffic to terminating instance while finishing existing requests", "Cleaning up logs", "Resetting TCP", "Restarting LB"], answer: 0, explanation: "Connection draining lets in-flight requests complete before terminating an instance - preventing user errors during scale-in." },
        ],
      },
      {
        id: "cloud-ops-3",
        title: "Encryption at Rest, in Transit & KMS",
        titleEn: "Encryption at Rest, in Transit & KMS",
        theory: `## 1. 🚦 Vấn đề đời thường

Bạn gửi tin nhắn cho người yêu qua một tờ giấy chuyển tay qua 5 người lạ. Nếu giấy không **gập kín** (encryption in transit), ai cũng đọc được. Nếu để giấy trong ngăn bàn không khoá (encryption at rest), người dọn phòng cũng xem được. Trong cloud, dữ liệu đi qua hàng chục thiết bị → mã hoá là điều **bắt buộc**, không phải tuỳ chọn.

## 2. 💡 Hai loại mã hoá phải hiểu

| Loại | Ý nghĩa | Ví dụ Cloud |
|------|---------|-------------|
| **At rest** | Mã hoá khi lưu trên đĩa | S3 SSE-KMS, EBS encryption |
| **In transit** | Mã hoá khi truyền qua mạng | TLS 1.3 / HTTPS |

Một dịch vụ "an toàn" phải bật **cả hai**. Thiếu một là hổng.

## 3. 🔑 KMS - chìa khoá quản chìa khoá

KMS (Key Management Service) giống như **két sắt trung tâm** giữ mọi chìa khoá. Bạn không cầm chìa AES trực tiếp - bạn xin KMS mã hoá hộ. Lợi ích:

- Xoay chìa (key rotation) tự động hằng năm.
- Ghi log mọi lần dùng chìa → audit dễ.
- Phân quyền: ai được "mượn chìa", ai không.

## 4. 🎯 Ví dụ bật mã hoá S3 + KMS

\`\`\`python
# Nhập thư viện boto3 để tương tác với AWS.
import boto3

# Tạo một đối tượng client cho dịch vụ S3.
# Đối tượng này sẽ được dùng để gọi các API của S3.
s3 = boto3.client("s3")

# Đặt cấu hình mã hóa cho một bucket S3.
# Điều này đảm bảo tất cả các đối tượng được tải lên bucket này sẽ được mã hóa tự động.
s3.put_bucket_encryption(
    # Tên của bucket S3 mà bạn muốn cấu hình mã hóa.
    Bucket="my-secure-bucket",
    # Cấu hình mã hóa phía máy chủ (Server-Side Encryption).
    ServerSideEncryptionConfiguration={
        # Danh sách các quy tắc mã hóa. Ở đây chỉ có một quy tắc.
        "Rules": [{
            # Áp dụng mã hóa phía máy chủ theo mặc định cho tất cả các đối tượng.
            "ApplyServerSideEncryptionByDefault": {
                # Thuật toán mã hóa sẽ được sử dụng.
                # "aws:kms" nghĩa là sử dụng AWS Key Management Service (KMS).
                "SSEAlgorithm": "aws:kms",
                # ID của khóa KMS tùy chỉnh sẽ được dùng để mã hóa.
                # "alias/my-app-key" là một alias (bí danh) cho khóa KMS của bạn.
                "KMSMasterKeyID": "alias/my-app-key"
            }
        }]
    }
)
# Sau khi chạy đoạn code này, bucket "my-secure-bucket" sẽ yêu cầu mã hóa KMS cho tất cả các đối tượng mới.
\`\`\`

Mọi file upload sau đó tự động mã hoá AES-256 với chìa từ KMS.

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Dùng cùng 1 KMS key cho cả production và development - lập trình viên test xoá nhầm key → production **mất quyền giải mã toàn bộ dữ liệu**.

- Quên bật **Bucket Policy enforce TLS** → ai gọi qua HTTP cũ vẫn nhận được data thô.
- Lưu key vào source code (\`AKIA...\`) rồi push GitHub → bot quét trong 30 giây.
- Tắt key rotation vì "ngại migrate" → 1 key dùng 5 năm bị crack thì xong.

## 6. ✅ Best practice

> 💡 **Mẹo:** Một dự án nên có **3 KMS key tách biệt**: \`prod-data-key\`, \`prod-log-key\`, \`dev-key\`. Khi rò rỉ chỉ thiệt hại 1/3.

- Bật **TLS 1.3** tối thiểu, từ chối TLS 1.0/1.1.
- Dùng **AWS Secrets Manager** (không phải biến môi trường) cho mật khẩu DB.
- Bật **CloudTrail** để xem ai đụng key → bắt được kẻ xấu.

## 7. 🤔 Khi nào dùng / không dùng

- ✅ **Luôn luôn** bật encryption at rest cho mọi storage có dữ liệu khách hàng.
- ✅ **Luôn luôn** ép HTTPS - Let's Encrypt miễn phí, không có lý do gì để không bật.
- ❌ Không cần KMS riêng cho file public (logo, banner) - phí key thừa.

## 8. 📌 Tóm tắt 30 giây

Mã hoá cloud = **at rest + in transit + KMS quản chìa**. Bật cả hai, tách key theo môi trường, xoay key tự động, không bao giờ commit key vào git. Làm đúng 4 điều này là 90% audit security đã pass.
`,
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
        code: `# Nhập thư viện boto3 để tương tác với các dịch vụ AWS.
import boto3
# Nhập hàm b64encode từ thư viện base64 để mã hóa dữ liệu sang định dạng base64.
from base64 import b64encode

# Khởi tạo một client KMS để tương tác với dịch vụ AWS Key Management Service.
kms = boto3.client('kms')
# Khởi tạo một client S3 để tương tác với dịch vụ AWS Simple Storage Service.
s3 = boto3.client('s3')

# 1. Tạo một khóa quản lý bởi khách hàng (Customer Managed Key - CMK) trong KMS.
# Khóa này sẽ được dùng để mã hóa/giải mã dữ liệu.
key = kms.create_key(
    Description='prod-app-data-key', # Mô tả cho khóa, giúp dễ nhận biết mục đích sử dụng.
    KeyUsage='ENCRYPT_DECRYPT',      # Chỉ định khóa này dùng để mã hóa và giải mã.
    Origin='AWS_KMS',                # Khóa được tạo bên trong AWS KMS.
    MultiRegion=True                 # Cho phép khóa này được sao chép sang các vùng khác để phục hồi sau thảm họa (DR).
)
# Lấy ID của khóa vừa tạo để sử dụng trong các bước tiếp theo.
key_id = key['KeyMetadata']['KeyId']

# Bật tính năng tự động xoay vòng khóa (auto-rotation) cho CMK.
# Điều này giúp tăng cường bảo mật bằng cách định kỳ tạo ra một phiên bản khóa mới.
kms.enable_key_rotation(KeyId=key_id)

# 2. Thực hiện mã hóa phong bì (envelope encryption) một cách thủ công.
# Đây là phương pháp mã hóa dữ liệu lớn bằng một khóa dữ liệu (DEK), sau đó mã hóa DEK bằng CMK.
# Dữ liệu nhạy cảm cần được mã hóa.
data = b"Sensitive customer record"
# Yêu cầu KMS tạo một khóa dữ liệu (Data Encryption Key - DEK) mới.
# Khóa này sẽ được mã hóa bằng CMK (key_id).
dek = kms.generate_data_key(KeyId=key_id, KeySpec='AES_256')
# Lấy khóa dữ liệu ở dạng văn bản gốc (plaintext DEK).
# Khóa này sẽ được dùng để mã hóa dữ liệu thực tế (data).
plaintext_dek = dek['Plaintext']        # Use to encrypt data
# Lấy khóa dữ liệu đã được mã hóa bằng CMK (encrypted DEK).
# Khóa này cần được lưu trữ cùng với dữ liệu đã mã hóa.
encrypted_dek = dek['CiphertextBlob']   # Store this with data

# Mã hóa dữ liệu (data) bằng DEK sử dụng thuật toán AES (trong thực tế sẽ dùng thư viện mã hóa).
# Đối với bản demo này, chúng ta chỉ hiển thị phần wrapper (khóa DEK đã mã hóa).
# In ra 40 ký tự đầu tiên của khóa DEK đã mã hóa (dạng base64) để minh họa.
# Đầu ra: Một chuỗi đại diện cho khóa DEK đã được mã hóa.
print(f"Encrypted DEK (store this): {b64encode(encrypted_dek)[:40]}...")

# 3. Tải đối tượng lên S3 với mã hóa phía máy chủ sử dụng KMS (SSE-KMS).
# S3 sẽ tự động sử dụng CMK đã chỉ định để mã hóa dữ liệu trước khi lưu trữ.
s3.put_object(
    Bucket='secure-bucket',         # Tên bucket S3 nơi lưu trữ dữ liệu.
    Key='customer-data.json',       # Tên file trong bucket.
    Body=data,                      # Dữ liệu cần tải lên.
    ServerSideEncryption='aws:kms', # Chỉ định sử dụng mã hóa phía máy chủ với KMS.
    SSEKMSKeyId=key_id              # ID của CMK sẽ được S3 sử dụng để mã hóa dữ liệu.
)

# 4. Áp dụng chính sách bucket S3 để chỉ cho phép truy cập qua HTTPS.
# Điều này đảm bảo rằng mọi giao tiếp với bucket đều được mã hóa trong quá trình truyền tải.
s3.put_bucket_policy(
    Bucket='secure-bucket', # Tên bucket S3 áp dụng chính sách.
    Policy='''{
        "Version": "2012-10-17",
        "Statement": [{
            "Effect": "Deny", # Từ chối quyền truy cập.
            "Principal": "*", # Áp dụng cho tất cả người dùng/tài khoản.
            "Action": "s3:*", # Áp dụng cho tất cả các hành động S3.
            "Resource": "arn:aws:s3:::secure-bucket/*", # Áp dụng cho tất cả các đối tượng trong bucket.
            "Condition": {"Bool": {"aws:SecureTransport": "false"}} # Điều kiện: nếu không sử dụng HTTPS (aws:SecureTransport là false).
        }]
    }'''
)

# 5. Giải mã khóa dữ liệu (DEK) đã mã hóa sau này.
# Sử dụng KMS để giải mã CiphertextBlob (DEK đã mã hóa) trở lại thành plaintext DEK.
# Đầu vào: Khóa DEK đã mã hóa (encrypted_dek).
decrypted = kms.decrypt(CiphertextBlob=encrypted_dek)
# In ra độ dài của khóa DEK đã giải mã.
# Đầu ra: Độ dài của khóa DEK ở dạng văn bản gốc (ví dụ: 32 bytes cho AES_256).
print(f"Recovered DEK length: {len(decrypted['Plaintext'])} bytes")`,
        codeLanguage: "python",
        exercise: "Design encryption strategy for a healthcare app storing patient records: which keys, where to encrypt, and how to satisfy HIPAA's 'minimum necessary' rule.",
        exerciseEn: "Design encryption strategy for a healthcare app storing patient records: which keys, where to encrypt, and how to satisfy HIPAA's 'minimum necessary' rule.",
        quiz: [
          { question: "What does envelope encryption mean?", options: ["Encrypting email", "Data encrypted by DEK, DEK encrypted by KEK in KMS", "Encrypting only the header", "Using two passwords"], answer: 1, explanation: "Envelope encryption uses a Data Key for the data and a Master Key (in KMS) for the Data Key - the master never leaves KMS." },
          { question: "Which TLS version should you use?", options: ["TLS 1.0", "TLS 1.1", "TLS 1.2 or 1.3", "SSL 3.0"], answer: 2, explanation: "TLS 1.2 minimum, 1.3 preferred. Older versions have known vulnerabilities (BEAST, POODLE)." },
          { question: "How often does AWS KMS auto-rotate a CMK?", options: ["30 days", "90 days", "365 days", "Never"], answer: 2, explanation: "AWS KMS rotates customer-managed keys every 365 days when rotation is enabled." },
          { question: "Why use CMK instead of AWS-managed keys?", options: ["Cheaper", "Full control over rotation, revoke, and audit", "Faster encryption", "Required for S3"], answer: 1, explanation: "CMK gives you control over key policies, rotation schedule, and the ability to revoke access - required for many compliance frameworks." },
          { question: "Which is an anti-pattern?", options: ["Auto-rotating keys", "Using ACM for TLS certs", "Hardcoding API keys in Git", "Separate keys per environment"], answer: 2, explanation: "Hardcoding keys in source control is the #1 cause of cloud breaches - they get scanned and exploited within minutes." },
        ],
      },
      {
        id: "cloud-ops-4",
        title: "DDoS Protection & Web Application Firewall",
        titleEn: "DDoS Protection & WAF",
        theory: `## 1. 🚦 Vấn đề đời thường

Tưởng tượng quán cà phê của thầy đang đông khách. Bỗng 10.000 "khách giả" mặc áo giống nhau xếp hàng trước cửa, không gọi nước, chỉ chiếm chỗ - khách thật vào không nổi. Đó chính là **DDoS** (Distributed Denial of Service): hàng triệu máy "zombie" gửi request rác làm server thật bị nghẹt.

**WAF** (Web Application Firewall) là anh bảo vệ thông minh đứng cửa: nhìn mặt, hỏi vài câu, đứa nào khả nghi (SQL Injection, XSS, bot) thì chặn ngay.

## 2. 💡 Khái niệm chính

- **DDoS Layer 3/4**: ngập băng thông (SYN flood, UDP flood) → chống bằng **Anti-DDoS** (AWS Shield, Cloudflare).
- **DDoS Layer 7**: ngập HTTP request (1 triệu request/giây) → chống bằng **WAF + rate limit**.
- **WAF rules**: regex/pattern chặn SQLi, XSS, đường dẫn lạ, IP nước lạ.

## 3. 🧰 Thành phần phòng thủ

| Tầng | Đe doạ | Vũ khí |
|---|---|---|
| L3/L4 | SYN/UDP flood | AWS Shield, Cloudflare Magic Transit |
| L7 | HTTP flood, bot | WAF + Rate Limit + CAPTCHA |
| App | SQLi, XSS, CSRF | WAF rules + code review |
| Bot | Scrape, credential stuffing | Bot Manager, fingerprinting |

## 4. 🎯 Ví dụ chạy được ngay

\\\`\\\`\\\`json
// AWS WAF rule: chặn IP request > 2000/5 phút
{
  "Name": "RateLimitRule",
  "Priority": 1,
  "Action": { "Block": {} },
  "Statement": {
    "RateBasedStatement": {
      "Limit": 2000,
      "AggregateKeyType": "IP"
    }
  }
}
\\\`\\\`\\\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:**
> - **Bật WAF mode "Block" ngay** - chưa test đã chặn cả khách thật. Luôn chạy **Count mode** trước 1 tuần.
> - **Whitelist quá rộng** (ví dụ allow toàn bộ IP văn phòng) → attacker chiếm 1 máy nội bộ là vào tự do.
> - **Quên log** → bị tấn công xong không biết bị gì, vá sao.
> - **Rate limit quá lỏng** (10.000 req/IP) → bot vẫn lọt; quá chặt (50 req/IP) → user thật bị chặn.

## 6. ✅ Best practice

> 💡 **Mẹo:**
> - **Defense in depth**: Cloudflare/Shield (L3/4) + WAF (L7) + app-level validation (3 lớp).
> - Bật **AWS Managed Rules** (OWASP Top 10) trước khi viết rule riêng.
> - Dùng **Geo-blocking** nếu app chỉ phục vụ VN: chặn 200 quốc gia còn lại = giảm 80% noise.
> - **Tabletop exercise** mỗi quý: giả lập DDoS để team biết quy trình.

## 7. 🤔 Khi nào dùng / không dùng

| Dùng khi | Cân nhắc |
|---|---|
| Public web, API, mobile backend | Internal app sau VPN - dùng SG đủ |
| E-commerce, banking, gaming | Static site CDN-only - Cloudflare free đủ |
| Có dữ liệu nhạy cảm | Demo, dev environment |

## 8. 📌 Tóm tắt 30 giây

DDoS = đám đông giả; WAF = bảo vệ thông minh. Phòng thủ 3 lớp: anti-DDoS (L3/4) + WAF (L7) + validation (app). Chạy Count mode trước, geo-block, rate limit hợp lý, log đầy đủ. Không bao giờ chỉ dựa 1 lớp.
`,
        theoryEn: `**DDoS** floods apps with fake traffic from thousands of IPs. **WAF** blocks app-layer attacks (SQLi, XSS).

## DDoS attack types
1. **Volumetric (L3/L4)** - flood bandwidth (Tbps record: 3.4 Tbps in 2023)
2. **Protocol (L3/L4)** - exhaust server resources (SYN flood)
3. **Application (L7)** - mimic real users (HTTP flood, login bots)

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
1.35 Tbps memcached attack - Akamai absorbed it, only 10 min downtime. Lesson: always have a CDN in front.

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
        code: `# Nhập thư viện boto3 để tương tác với các dịch vụ AWS.
import boto3

# Tạo một client (kết nối) tới dịch vụ AWS WAFv2.
# Client này sẽ được dùng để gọi các API của WAFv2.
wafv2 = boto3.client('wafv2')

# 1. Tạo một Web ACL (Access Control List) với các quy tắc được quản lý và quy tắc dựa trên tỷ lệ.
# Web ACL này sẽ định nghĩa cách WAF xử lý các yêu cầu HTTP/S.
acl = wafv2.create_web_acl(
    # Đặt tên cho Web ACL.
    Name='production-waf',
    # Xác định phạm vi của Web ACL: 'REGIONAL' cho các tài nguyên trong một khu vực (ví dụ: ALB),
    # hoặc 'CLOUDFRONT' cho các phân phối CloudFront.
    Scope='REGIONAL',                # or CLOUDFRONT
    # Hành động mặc định cho các yêu cầu không khớp với bất kỳ quy tắc nào.
    # Ở đây, mặc định là cho phép tất cả các yêu cầu.
    DefaultAction={'Allow': {}},
    # Danh sách các quy tắc sẽ được áp dụng cho Web ACL này.
    Rules=[
        # Quy tắc được quản lý: Bộ quy tắc chung của AWS (dựa trên OWASP Top 10).
        # Quy tắc này giúp bảo vệ khỏi các lỗ hổng web phổ biến.
        {
            # Tên của quy tắc.
            'Name': 'AWS-CommonRuleSet',
            # Độ ưu tiên của quy tắc. Số nhỏ hơn có độ ưu tiên cao hơn.
            'Priority': 1,
            # Hành động ghi đè (override) cho quy tắc này. 'None' nghĩa là không ghi đè,
            # hành động sẽ được xác định bởi ManagedRuleGroupStatement.
            'OverrideAction': {'None': {}},
            # Định nghĩa chi tiết của quy tắc.
            'Statement': {
                # Đây là một quy tắc nhóm được quản lý bởi AWS.
                'ManagedRuleGroupStatement': {
                    # Nhà cung cấp của nhóm quy tắc.
                    'VendorName': 'AWS',
                    # Tên của nhóm quy tắc được quản lý.
                    'Name': 'AWSManagedRulesCommonRuleSet'
                }
            },
            # Cấu hình hiển thị (visibility) cho quy tắc này, dùng cho việc giám sát.
            'VisibilityConfig': {
                # Bật lấy mẫu yêu cầu (sampled requests) để xem chi tiết các yêu cầu bị chặn/cho phép.
                'SampledRequestsEnabled': True,
                # Bật gửi dữ liệu tới CloudWatch Metrics.
                'CloudWatchMetricsEnabled': True,
                # Tên của metric trong CloudWatch.
                'MetricName': 'common-rules'
            }
        },
        # Giới hạn tỷ lệ (Rate limit): chặn các địa chỉ IP thực hiện >2000 yêu cầu trong 5 phút.
        # Quy tắc này giúp bảo vệ khỏi các cuộc tấn công DDoS hoặc brute-force.
        {
            # Tên của quy tắc.
            'Name': 'RateLimit',
            # Độ ưu tiên của quy tắc.
            'Priority': 2,
            # Hành động khi quy tắc này được kích hoạt: Chặn yêu cầu.
            'Action': {'Block': {}},
            # Định nghĩa chi tiết của quy tắc.
            'Statement': {
                # Đây là một quy tắc dựa trên tỷ lệ.
                'RateBasedStatement': {
                    # Giới hạn số lượng yêu cầu trong 5 phút.
                    'Limit': 2000,
                    # Loại khóa để tổng hợp tỷ lệ. 'IP' nghĩa là theo địa chỉ IP nguồn.
                    'AggregateKeyType': 'IP'
                }
            },
            # Cấu hình hiển thị cho quy tắc này.
            'VisibilityConfig': {
                'SampledRequestsEnabled': True,
                'CloudWatchMetricsEnabled': True,
                'MetricName': 'rate-limit'
            }
        },
        # Chặn theo địa lý (Geo-block): chỉ cho phép các yêu cầu từ Việt Nam (VN) và Hoa Kỳ (US).
        # Các yêu cầu từ các quốc gia khác sẽ bị chặn.
        {
            # Tên của quy tắc.
            'Name': 'GeoAllowList',
            # Độ ưu tiên của quy tắc.
            'Priority': 3,
            # Hành động khi quy tắc này được kích hoạt: Chặn yêu cầu.
            'Action': {'Block': {}},
            # Định nghĩa chi tiết của quy tắc.
            'Statement': {
                # Đây là một quy tắc phủ định (NOT).
                # Nó sẽ khớp với các yêu cầu KHÔNG thỏa mãn điều kiện bên trong.
                'NotStatement': {
                    'Statement': {
                        # Đây là một quy tắc khớp theo địa lý.
                        'GeoMatchStatement': {
                            # Danh sách mã quốc gia được cho phép.
                            'CountryCodes': ['VN', 'US']
                        }
                    }
                }
            },
            # Cấu hình hiển thị cho quy tắc này.
            'VisibilityConfig': {
                'SampledRequestsEnabled': True,
                'CloudWatchMetricsEnabled': True,
                'MetricName': 'geo-block'
            }
        }
    ],
    # Cấu hình hiển thị tổng thể cho toàn bộ Web ACL.
    VisibilityConfig={
        'SampledRequestsEnabled': True,
        'CloudWatchMetricsEnabled': True,
        'MetricName': 'production-waf'
    }
)

# 2. Gắn Web ACL vừa tạo vào một tài nguyên AWS (ví dụ: Application Load Balancer - ALB).
# Sau khi gắn, WAF sẽ bắt đầu kiểm tra lưu lượng truy cập đến tài nguyên này.
wafv2.associate_web_acl(
    # ARN (Amazon Resource Name) của Web ACL vừa tạo.
    # acl['Summary']['ARN'] trích xuất ARN từ kết quả trả về của create_web_acl.
    WebACLArn=acl['Summary']['ARN'],
    # ARN của tài nguyên AWS mà Web ACL sẽ bảo vệ.
    # Thay thế bằng ARN thực tế của ALB hoặc tài nguyên khác.
    ResourceArn='arn:aws:elasticloadbalancing:us-east-1:123:loadbalancer/app/web-alb/abc'
)
# In thông báo xác nhận rằng WAF đã được gắn thành công.
# Hướng dẫn người dùng kiểm tra các yêu cầu bị chặn trong CloudWatch.
print("WAF attached. Now monitor blocked requests in CloudWatch.")
# Đầu ra mong đợi: "WAF attached. Now monitor blocked requests in CloudWatch."
`,
        codeLanguage: "python",
        exercise: "Design DDoS + WAF protection for a banking website. List 5 specific rules and explain why each is necessary.",
        exerciseEn: "Design DDoS + WAF protection for a banking website. List 5 specific rules and explain why each is necessary.",
        quiz: [
          { question: "Which DDoS type targets the application layer (L7)?", options: ["UDP flood", "SYN flood", "HTTP flood mimicking real users", "ICMP ping"], answer: 2, explanation: "L7 attacks like HTTP flood mimic legitimate user requests, making them hardest to detect." },
          { question: "AWS Shield Standard protects against:", options: ["L7 only", "L3/L4 attacks (free, auto-enabled)", "Only DNS attacks", "Only SQL injection"], answer: 1, explanation: "Shield Standard is free, auto-enabled, and covers most common L3/L4 volumetric and protocol attacks." },
          { question: "What does a WAF primarily protect against?", options: ["Volumetric DDoS", "OWASP Top 10 application attacks", "Hardware failure", "Network latency"], answer: 1, explanation: "WAF inspects HTTP requests to block injection, XSS, and other OWASP Top 10 attacks before reaching the app." },
          { question: "Why hide your origin server's IP?", options: ["Marketing", "Force traffic through CDN/WAF - bypassing them is impossible", "Save bandwidth", "Faster DNS"], answer: 1, explanation: "If attackers find the origin IP, they bypass CDN and WAF entirely - hiding the origin is critical." },
          { question: "Best practice for /login endpoint?", options: ["No limit", "Stricter rate limit than other endpoints", "Allow all geos", "Disable WAF"], answer: 1, explanation: "Login endpoints are prime targets for credential stuffing - apply tighter rate limits (e.g., 10 attempts/min/IP)." },
        ],
      },
      {
        id: "cloud-ops-5",
        title: "Monitoring with CloudWatch & Prometheus",
        titleEn: "Monitoring with CloudWatch & Prometheus",
        theory: `## 1. 🚦 Vấn đề đời thường

3 giờ sáng, server sập. Bạn mới biết khi khách hàng gọi điện chửi. Đó là vì **không có monitoring**. Monitoring giống như **đồng hồ đo nhịp tim cho hệ thống** - phải kêu "tút tút" trước khi bệnh nhân ngất.

## 2. 💡 3 trụ cột Observability

| Trụ cột | Trả lời câu hỏi | Công cụ |
|---------|-----------------|---------|
| **Metrics** | Bao nhiêu? (CPU, RPS, latency) | CloudWatch, Prometheus |
| **Logs** | Chuyện gì xảy ra? | CloudWatch Logs, ELK |
| **Traces** | Request đi đường nào? | X-Ray, Jaeger |

Thiếu 1 trong 3 là "mù một mắt" khi debug production.

## 3. 🚨 Alert: phải đúng người, đúng lúc

Không phải lỗi nào cũng cần đánh thức kỹ sư lúc 3 giờ sáng. Quy tắc **3 mức**:

- **P1 - Page (gọi điện)**: hệ thống chết, doanh thu mất.
- **P2 - Slack/Email**: chậm bất thường, lỗi 5%.
- **P3 - Dashboard**: xu hướng xấu, xem giờ hành chính.

## 4. 🎯 Ví dụ tạo alert CPU > 80% kéo dài 5 phút

\`\`\`python
# Thư viện boto3 để tương tác với AWS
import boto3
# Tạo client CloudWatch để gọi API
cw = boto3.client("cloudwatch")

# Tạo cảnh báo CloudWatch khi CPU cao trên EC2
cw.put_metric_alarm(
    AlarmName="HighCPU-Prod",
    MetricName="CPUUtilization", Namespace="AWS/EC2",
    Statistic="Average", Period=60,
    EvaluationPeriods=5, Threshold=80,
    ComparisonOperator="GreaterThanThreshold",
    AlarmActions=["arn:aws:sns:ap-southeast-1:123:ops-pager"],
)
\`\`\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** **Alert Fatigue** - mỗi ngày 200 alert vô nghĩa → kỹ sư tắt thông báo → ngày thực sự cháy thì không ai biết.

- Log mọi thứ ở mức \`INFO\` → CloudWatch ngốn 500 USD/tháng vô ích.
- Alert dựa trên **giá trị tuyệt đối** thay vì **xu hướng** → traffic Tết tăng 3× cũng báo cháy.
- Dashboard 50 widget → không ai xem.

## 6. ✅ Best practice

> 💡 **Mẹo:** Quy tắc **Golden Signals** của Google SRE - chỉ cần theo 4 thứ: **Latency, Traffic, Errors, Saturation**. 4 cái này nằm 1 dashboard, đủ 80% trường hợp.

- Dùng **structured logging** (JSON) → query bằng CloudWatch Insights nhanh gấp 10×.
- Đặt **SLO** (Service Level Objective) ví dụ "99.9% request < 300ms" → alert khi **error budget** sắp cạn.
- Diễn tập **game day**: cố tình tắt 1 dịch vụ, xem alert có kêu, có đúng người không.

## 7. 🤔 Khi nào dùng / không dùng

- ✅ Mọi production app phải có ít nhất Metrics + Logs từ ngày 1.
- ✅ Tracing khi có ≥3 microservice - không thì overkill.
- ❌ Không cần Datadog 2.000 USD/tháng cho startup MVP - CloudWatch + Sentry đủ.

## 8. 📌 Tóm tắt 30 giây

Monitoring = **Metrics + Logs + Traces**, alert chia 3 mức P1/P2/P3, theo Golden Signals của Google. Đừng log mọi thứ, đừng alert mọi thứ - chỉ alert cái **đánh thức kỹ sư cũng đáng**. Có SLO + error budget là bạn đã ở level senior.
`,
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
        code: `# Nhập thư viện boto3 để tương tác với các dịch vụ AWS.
import boto3
# Nhập thư viện json để làm việc với dữ liệu JSON.
import json

# Khởi tạo một client CloudWatch để gửi dữ liệu metric và tạo báo động.
cloudwatch = boto3.client('cloudwatch')
# Khởi tạo một client Logs để tương tác với CloudWatch Logs (mặc dù không dùng trực tiếp trong ví dụ này).
logs = boto3.client('logs')

# 1. Gửi một metric tùy chỉnh lên CloudWatch.
cloudwatch.put_metric_data(
    # Đặt không gian tên (Namespace) cho metric, giúp nhóm các metric liên quan.
    Namespace='MyApp/Prod',
    # Danh sách các dữ liệu metric cần gửi.
    MetricData=[
        {
            # Tên của metric.
            'MetricName': 'OrdersProcessed',
            # Giá trị của metric.
            'Value': 142,
            # Đơn vị của metric.
            'Unit': 'Count',
            # Các chiều (Dimensions) của metric, giúp lọc và phân tích dữ liệu.
            'Dimensions': [
                {'Name': 'Environment', 'Value': 'prod'},
                {'Name': 'Region', 'Value': 'us-east-1'}
            ]
        },
        {
            # Tên của metric thứ hai.
            'MetricName': 'OrderLatency',
            # Giá trị trung bình hoặc tổng hợp của metric.
            'Value': 234.5,
            # Đơn vị của metric.
            'Unit': 'Milliseconds',
            # Các giá trị thống kê chi tiết cho metric này.
            'StatisticValues': {
                'SampleCount': 100, # Số lượng mẫu đã được lấy.
                'Sum': 23450,       # Tổng của tất cả các mẫu.
                'Minimum': 50,      # Giá trị nhỏ nhất trong các mẫu.
                'Maximum': 800      # Giá trị lớn nhất trong các mẫu.
            }
        }
    ]
)

# 2. Tạo một báo động (alarm) trong CloudWatch.
# Báo động này sẽ kích hoạt khi tỷ lệ lỗi vượt quá ngưỡng.
cloudwatch.put_metric_alarm(
    # Tên duy nhất của báo động.
    AlarmName='HighErrorRate',
    # Toán tử so sánh (ví dụ: lớn hơn ngưỡng).
    ComparisonOperator='GreaterThanThreshold',
    # Số khoảng thời gian đánh giá liên tiếp mà metric phải vi phạm ngưỡng để kích hoạt báo động.
    EvaluationPeriods=2,
    # Tên của metric mà báo động sẽ theo dõi.
    MetricName='5XXError',
    # Không gian tên của metric (ở đây là metric của AWS Application Load Balancer).
    Namespace='AWS/ApplicationELB',
    # Khoảng thời gian (tính bằng giây) mà mỗi điểm dữ liệu metric đại diện.
    Period=300, # 5 phút
    # Loại thống kê được sử dụng để đánh giá metric (ví dụ: trung bình).
    Statistic='Average',
    # Ngưỡng mà khi metric vượt qua sẽ kích hoạt báo động.
    Threshold=5.0, # 5%
    # Kích hoạt các hành động khi báo động thay đổi trạng thái.
    ActionsEnabled=True,
    # Danh sách các ARN của hành động sẽ được thực hiện khi báo động kích hoạt (ví dụ: gửi thông báo SNS).
    AlarmActions=['arn:aws:sns:us-east-1:123:pagerduty-critical'],
    # Mô tả chi tiết về báo động.
    AlarmDescription='ALB 5XX > 5% - runbook: https://wiki/runbooks/5xx',
    # Cách xử lý dữ liệu bị thiếu: 'breaching' có nghĩa là coi dữ liệu thiếu như đang vi phạm ngưỡng.
    TreatMissingData='breaching'
)

# 3. Ghi log có cấu trúc (JSON).
# Hàm này tạo một bản ghi log dưới dạng JSON.
def log_event(level: str, event: str, **kwargs):
    # Tạo một từ điển (dictionary) chứa các thông tin log.
    record = {
        'timestamp': '2026-04-19T10:00:00Z', # Thời gian của sự kiện.
        'level': level,                     # Mức độ log (INFO, ERROR, WARN, v.v.).
        'event': event,                     # Tên của sự kiện.
        **kwargs                            # Thêm bất kỳ đối số từ khóa nào khác vào bản ghi.
    }
    # Chuyển đổi từ điển thành chuỗi JSON và in ra console.
    # Đầu ra: Một chuỗi JSON đại diện cho bản ghi log.
    print(json.dumps(record))

# Gọi hàm log_event để ghi một sự kiện "order_created".
# Đầu ra: {"timestamp": "2026-04-19T10:00:00Z", "level": "INFO", "event": "order_created", "user_id": 123, "amount": 49.99, "currency": "USD"}
log_event('INFO', 'order_created', user_id=123, amount=49.99, currency='USD')
# Gọi hàm log_event để ghi một sự kiện "payment_failed".
# Đầu ra: {"timestamp": "2026-04-19T10:00:00Z", "level": "ERROR", "event": "payment_failed", "user_id": 123, "error": "card_declined", "retry": 2}
log_event('ERROR', 'payment_failed', user_id=123, error='card_declined', retry=2)

# 4. Truy vấn log bằng CloudWatch Logs Insights (ngôn ngữ giống SQL).
# Đây là một chuỗi truy vấn được sử dụng để phân tích dữ liệu log trong CloudWatch Logs.
query = """
# Chọn các trường @timestamp, user_id và error từ các bản ghi log.
fields @timestamp, user_id, error
# Lọc các bản ghi log mà trường 'event' có giá trị là "payment_failed".
| filter event = "payment_failed"
# Nhóm các bản ghi theo trường 'error' và đếm số lượng (count) cho mỗi nhóm.
| stats count() by error
# Sắp xếp kết quả theo số lượng đếm (count) theo thứ tự giảm dần.
| sort count desc
# Giới hạn kết quả trả về chỉ 10 dòng đầu tiên.
| limit 10
"""

# Ví dụ tương đương trong PromQL (được comment):
# rate(http_requests_total{status="500"}[5m]) / rate(http_requests_total[5m]) > 0.05`,
        codeLanguage: "python",
        exercise: "Define 3 SLIs and matching SLOs for an e-commerce checkout service. Explain the error budget calculation for one of them.",
        exerciseEn: "Define 3 SLIs and matching SLOs for an e-commerce checkout service. Explain the error budget calculation for one of them.",
        quiz: [
          { question: "What are the 3 pillars of observability?", options: ["CPU, RAM, Disk", "Metrics, Logs, Traces", "AWS, Azure, GCP", "Dev, Staging, Prod"], answer: 1, explanation: "Metrics (numbers), Logs (events), Traces (request flow) form the foundation of modern observability." },
          { question: "Which is the RED method?", options: ["Red, Yellow, Green", "Rate, Errors, Duration", "Read, Edit, Delete", "Reliable, Efficient, Durable"], answer: 1, explanation: "RED = Rate, Errors, Duration - Tom Wilkie's method for monitoring request-driven services." },
          { question: "Difference between SLO and SLA?", options: ["Same thing", "SLO is internal target, SLA is customer contract with penalties", "SLA is faster", "SLO is for infra only"], answer: 1, explanation: "SLO is your internal goal (e.g., 99.9%); SLA is the contractual commitment to customers, often with refund clauses." },
          { question: "Best practice: alert on…", options: ["Every metric change", "Symptoms users feel, not internal causes", "CPU only", "Disk full only"], answer: 1, explanation: "Alert on user-facing symptoms (login failures, slow checkout) - internal causes generate noise without helping users." },
          { question: "Prometheus uses what data collection model?", options: ["Push from clients", "Pull (scrape /metrics endpoint)", "WebSocket stream", "Email"], answer: 1, explanation: "Prometheus pulls/scrapes metrics from /metrics endpoints - opposite of push-based StatsD/CloudWatch." },
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
        theory: `## 1. 🚦 Vấn đề đời thường

Bạn thuê phòng trọ ở Sài Gòn. Có 3 kiểu trả tiền: trả theo ngày (đắt nhưng linh hoạt), trả theo tháng (rẻ hơn), trả nguyên năm (rẻ nhất nhưng cọc cứng). Cloud y hệt: **On-Demand, Reserved, Spot** - chọn sai là **đốt tiền**.

## 2. 💡 3 mô hình giá phải nhớ

| Mô hình | Giá | Cam kết | Khi nào dùng |
|---------|-----|---------|--------------|
| **On-Demand** | 100% | 0 | Test, traffic không đoán được |
| **Reserved (1-3 năm)** | -40% đến -75% | Trả trước hoặc cam kết | Workload chạy 24/7 ổn định |
| **Spot** | -70% đến -90% | Có thể bị "cắt" trong 2 phút | Batch job, ML training, render video |

## 3. 💰 FinOps là gì?

**FinOps** = **Finance + DevOps**. Đó là văn hoá nơi engineer biết mỗi \`terraform apply\` tốn bao nhiêu tiền, và chịu trách nhiệm với hoá đơn cuối tháng.

3 giai đoạn FinOps:
1. **Inform** - gắn tag, biết ai tiêu gì.
2. **Optimize** - tắt zombie, mua Reserved.
3. **Operate** - đặt budget alert, review hàng tuần.

## 4. 🎯 Ví dụ tính nhanh

Server \`m5.large\` On-Demand: 0.096 USD/giờ × 730 giờ = **70 USD/tháng**.
Cùng server Reserved 1 năm trả trước: **~28 USD/tháng** → tiết kiệm 60%.

\`\`\`python
# Định nghĩa một hàm để tính toán chi phí hàng tháng.
# Hàm này nhận vào tỷ lệ theo giờ và số giờ làm việc.
# Tham số:
#   hourly_rate (float): Tỷ lệ chi phí cho mỗi giờ.
#   hours (int): Tổng số giờ làm việc trong tháng (mặc định là 730 giờ, tương đương khoảng 30 ngày * 24 giờ).
# Trả về:
#   float: Tổng chi phí hàng tháng.
def monthly_cost(hourly_rate: float, hours: int = 730) -> float:
    # Tính toán chi phí bằng cách nhân tỷ lệ theo giờ với tổng số giờ.
    return hourly_rate * hours

# Gọi hàm monthly_cost với tỷ lệ 0.096 và in kết quả ra màn hình.
# Đây là chi phí cho mô hình "On-Demand" (theo yêu cầu).
# Kết quả mong đợi: 0.096 * 730 = 70.08
print(monthly_cost(0.096))   # On-Demand
# Gọi hàm monthly_cost với tỷ lệ 0.038 và in kết quả ra màn hình.
# Đây là chi phí cho mô hình "Reserved" (đã đặt trước).
# Kết quả mong đợi: 0.038 * 730 = 27.74
print(monthly_cost(0.038))   # Reserved
\`\`\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** Mua **Reserved 3 năm** rồi 6 tháng sau migrate sang Graviton/ARM rẻ hơn → bạn vẫn phải trả tiền cho Reserved cũ → mất gấp đôi.

- Quên tắt môi trường **dev/staging** cuối tuần → chạy 168 giờ/tuần thay vì 40 giờ.
- Để **NAT Gateway** treo dù không dùng → 32 USD/tháng cho mỗi cái.
- Snapshot EBS không xoá → tích luỹ TB sau 1 năm.

## 6. ✅ Best practice

> 💡 **Mẹo:** Quy tắc **70-25-5** - 70% baseline dùng Reserved, 25% biến động dùng On-Demand, 5% batch dùng Spot. Tiết kiệm 50% mà vẫn an toàn.

- Bắt buộc **tag** mọi resource: \`env\`, \`team\`, \`project\` → biết ai tiêu nhiều.
- Bật **Cost Anomaly Detection** → AWS tự gửi mail khi chi phí lệch 20%.
- Mỗi tháng review **Trusted Advisor** / **Cost Explorer** - luôn tìm được 10–30% lãng phí.

## 7. 🤔 Khi nào dùng / không dùng

- ✅ Reserved cho database production, app server core.
- ✅ Spot cho ML training, transcode video, CI runner.
- ❌ Không Spot cho database hay API người dùng (bị cắt = sập).
- ❌ Đừng mua Reserved khi chưa chạy On-Demand đủ 1 tháng để biết pattern.

## 8. 📌 Tóm tắt 30 giây

Cloud rẻ hay đắt là do **bạn mua đúng mô hình** không. **70-25-5** + tag mọi thứ + bật Cost Anomaly là tiết kiệm ngay 30–50%. FinOps không phải kế toán - đó là văn hoá engineer **biết giá** mỗi dòng code mình viết.
`,
        theoryEn: `**Cloud Pricing** has bankrupted many startups. Wrong model = 5-10× bill. Five main models.

## 1. On-Demand
Pay per hour/second, no commitment. **Most expensive** but flexible. Use: dev/test, unpredictable workloads.

## 2. Reserved Instances (RI)
Commit 1-3 years → **40-72% off**. Standard (cheapest, locked instance type) vs Convertible (less discount, swappable).

## 3. Savings Plans
Commit \\\\$X/hour for 1-3 years → **66% off**. More flexible than RI, applies to EC2/Fargate/Lambda.

## 4. Spot Instances
Buy spare AWS capacity → **70-90% off**. Can be reclaimed in 2 minutes. Use: batch, ML training, CI/CD.

## 5. Free Tier
AWS 12 months + always-free; Azure \\\\$200; GCP \\\\$300.

## Cost comparison (m5.large 24/7 for 1 year)
| Model | Cost | Savings |
|---|---|---|
| On-Demand | \\\\$840 | 0% |
| RI 1y NoUpfront | \\\\$535 | 36% |
| RI 3y AllUpfront | \\\\$310 | 63% |
| Savings Plan 3y | \\\\$340 | 60% |
| Spot (avg) | \\\\$170 | 80% |

## Hidden costs (traps)
1. Egress (\\\\$0.09/GB to Internet)
2. NAT Gateway (\\\\$0.045/GB)
3. Cross-AZ transfer
4. CloudWatch logs
5. Idle resources
6. Unattached EBS volumes
7. S3 cross-region replication

## Pinterest case (\\\\$190M/year)
80% RI/Savings, 15% Spot, 5% On-Demand. Dedicated FinOps team tracking \\\\$/MAU.

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
        code: `# Định nghĩa một hàm để tính toán chi phí đám mây cho một phiên bản (instance)
# Đầu vào:
#   - hours_per_month (int): Số giờ hoạt động mỗi tháng của phiên bản.
#   - instance_hourly (float): Chi phí theo giờ của phiên bản.
# Đầu ra:
#   - models (dict): Một từ điển chứa chi phí hàng năm cho các mô hình định giá khác nhau.
def cloud_cost_calculator(hours_per_month: int, instance_hourly: float):
    """Compare pricing models for one instance"""
    # Tính toán chi phí hàng năm cho mô hình On-Demand (trả theo nhu cầu)
    on_demand = instance_hourly * hours_per_month * 12

    # Định nghĩa các mô hình định giá khác nhau và chi phí tương ứng
    # Chi phí được tính dựa trên tỷ lệ phần trăm giảm giá so với On-Demand
    models = {
        'On-Demand': on_demand,
        'RI 1yr No Upfront': on_demand * 0.64, # Reserved Instance 1 năm, không trả trước
        'RI 1yr All Upfront': on_demand * 0.58, # Reserved Instance 1 năm, trả trước toàn bộ
        'RI 3yr All Upfront': on_demand * 0.37, # Reserved Instance 3 năm, trả trước toàn bộ
        'Savings Plan 3yr': on_demand * 0.40,   # Gói tiết kiệm 3 năm
        'Spot (avg)': on_demand * 0.20,         # Phiên bản Spot (trung bình)
    }

    # In tiêu đề bảng so sánh
    # Sử dụng f-string để định dạng căn lề cho các cột
    print(f"{'Model':<25} {'Annual':<12} {'Savings':<10}")
    # In một đường kẻ để phân tách tiêu đề và dữ liệu
    print("-" * 50)
    # Lặp qua từng mô hình và chi phí trong từ điển models
    for model, cost in models.items():
        # Tính toán phần trăm tiết kiệm so với mô hình On-Demand
        savings = (1 - cost / on_demand) * 100
        # In tên mô hình, chi phí hàng năm và phần trăm tiết kiệm
        print(f"{model} {cost} {savings}")

    # Trả về từ điển chứa chi phí của các mô hình
    return models

# Ví dụ sử dụng hàm: tính toán chi phí cho một phiên bản m5.large hoạt động 24/7
# Đầu vào: 730 giờ/tháng, chi phí 0.096 USD/giờ
# Kết quả mong đợi: In ra bảng so sánh chi phí hàng năm và phần trăm tiết kiệm cho các mô hình.
cloud_cost_calculator(hours_per_month=730, instance_hourly=0.096)

# Phát hiện các ổ đĩa EBS bị bỏ hoang (không gắn vào instance nào)
# Nhập thư viện boto3 để tương tác với AWS
import boto3
# Tạo một client EC2 để gọi các API liên quan đến EC2
ec2 = boto3.client('ec2')

# Mô tả các ổ đĩa EBS có trạng thái 'available' (sẵn sàng)
# Trạng thái 'available' có nghĩa là ổ đĩa không được gắn vào bất kỳ instance nào, tức là bị bỏ hoang.
orphaned = ec2.describe_volumes(
    Filters=[{'Name': 'status', 'Values': ['available']}]   # available = unattached
)
# Tính tổng chi phí lãng phí hàng tháng từ các ổ đĩa EBS bị bỏ hoang
# Giả sử chi phí cho mỗi GB là 0.10 USD/tháng (ví dụ cho gp3)
# Đầu vào: danh sách các ổ đĩa bị bỏ hoang
# Đầu ra: tổng chi phí lãng phí hàng tháng
total_waste = sum(v['Size'] * 0.10 for v in orphaned['Volumes'])  # gp3 = \\\$0.10/GB/month
# In ra tổng chi phí lãng phí hàng tháng
# Kết quả mong đợi: "Orphaned EBS waste: [tổng chi phí] /month"
print("Orphaned EBS waste:", total_waste, "/month")

# Thiết lập cảnh báo ngân sách
# Tạo một client Budgets để gọi các API liên quan đến AWS Budgets
budgets = boto3.client('budgets')
# Tạo một ngân sách mới
# Đầu vào:
#   - AccountId: ID tài khoản AWS
#   - Budget: Chi tiết về ngân sách (tên, giới hạn, đơn vị thời gian, loại ngân sách)
#   - NotificationsWithSubscribers: Cấu hình thông báo khi ngân sách đạt ngưỡng
budgets.create_budget(
    AccountId='123456789012', # Thay thế bằng ID tài khoản AWS thực tế
    Budget={
        'BudgetName': 'monthly-prod', # Tên của ngân sách
        'BudgetLimit': {'Amount': '5000', 'Unit': 'USD'}, # Giới hạn ngân sách là 5000 USD
        'TimeUnit': 'MONTHLY', # Ngân sách được theo dõi hàng tháng
        'BudgetType': 'COST' # Loại ngân sách là chi phí
    },
    NotificationsWithSubscribers=[{
        'Notification': {
            'NotificationType': 'ACTUAL', # Loại thông báo khi chi phí thực tế đạt ngưỡng
            'ComparisonOperator': 'GREATER_THAN', # So sánh: lớn hơn
            'Threshold': 80   # Cảnh báo khi chi phí đạt 80% của ngân sách
        },
        'Subscribers': [{'SubscriptionType': 'EMAIL', 'Address': 'finops@company.com'}] # Gửi thông báo qua email đến địa chỉ này
    }]
)
# Kết quả mong đợi: Một ngân sách mới được tạo trong AWS Budgets với các cấu hình đã cho.
`,
        codeLanguage: "python",
        exercise: "A SaaS company runs 50 EC2 m5.xlarge instances 24/7 in production. Recommend a pricing strategy and calculate annual savings vs all on-demand.",
        exerciseEn: "A SaaS company runs 50 EC2 m5.xlarge instances 24/7 in production. Recommend a pricing strategy and calculate annual savings vs all on-demand.",
        quiz: [
          { question: "Maximum savings with Reserved Instances?", options: ["20%", "40%", "Up to 72%", "100%"], answer: 2, explanation: "3-year All-Upfront Standard RIs can save up to 72% vs on-demand." },
          { question: "Spot Instances can be reclaimed by AWS within…", options: ["1 hour", "2 minutes notice", "1 day", "Never"], answer: 1, explanation: "AWS gives only 2 minutes notice before reclaiming Spot capacity - never use for stateful workloads." },
          { question: "Which is a hidden cloud cost?", options: ["EC2 hourly", "Egress traffic ($0.09/GB to Internet)", "Free tier", "Documentation"], answer: 1, explanation: "Data transfer OUT to the Internet is one of the most overlooked costs and can dwarf compute spending." },
          { question: "Best pricing model for batch ML training?", options: ["On-Demand", "Reserved 3yr", "Spot Instances", "Dedicated Hosts"], answer: 2, explanation: "ML training is restartable and can tolerate interruptions - Spot saves 70-90%." },
          { question: "What should you tag every resource with?", options: ["Color", "Environment, Team, Project for cost allocation", "User password", "Random ID"], answer: 1, explanation: "Tags enable chargeback, cost allocation, and identifying orphaned resources - foundation of FinOps." },
        ],
      },
      {
        id: "cloud-strat-2",
        title: "Multi-Cloud vs Hybrid Cloud",
        titleEn: "Multi-Cloud vs Hybrid Cloud",
        theory: `## 1. 🚦 Khái niệm chính

- **Single cloud**: chỉ dùng 1 nhà cung cấp (AWS *hoặc* Azure *hoặc* GCP).
- **Multi-cloud**: chạy app trên **≥2 public cloud** (ví dụ: AWS + GCP).
- **Hybrid cloud**: kết hợp **on-prem** (data center riêng) **+ public cloud**.
- **Multi-region** ≠ multi-cloud: nhiều vùng nhưng vẫn cùng 1 nhà.

> 💡 **Mẹo nhớ:** Multi-cloud trả lời câu hỏi *"phụ thuộc ai?"*, Hybrid trả lời câu hỏi *"data ở đâu?"*.

## 2. 🧭 Workload Decision Tree

Khi đứng trước 1 workload mới, hãy đi theo cây quyết định sau:

\`\`\`mermaid
flowchart TD
    A[New Workload] --> B{Public OK?}
    B -- Yes --> C{Need 2 clouds?}
    B -- No --> D[On-Prem / Hybrid]
    C -- No --> E[Single Cloud]
    C -- Yes --> F[Multi-Cloud]
    D --> G{Burst Needed?}
    G -- Yes --> H[Hybrid + Cloud Burst]
    G -- No --> I[Pure On-Prem]
\`\`\`

## 3. 🏛️ Hybrid Cloud - đào sâu

### 3.1 Why Hybrid?
1. Hệ thống legacy không thể migrate (mainframe ngân hàng).
2. **Data residency**: NHNN, GDPR yêu cầu data ở trong nước.
3. **Cloud bursting**: peak traffic thì đẩy lên cloud, off-peak chạy on-prem.
4. Edge computing (IoT, nhà máy sản xuất).
5. Workload ổn định: sau 3 năm on-prem rẻ hơn cloud.

### 3.2 Connectivity (cách nối on-prem ↔ cloud)
| Phương án | Latency | Chi phí | Use case |
|---|---|---|---|
| **VPN** (Internet) | 50-200ms | $ | Dev, traffic thấp |
| **Direct Connect / ExpressRoute** | 5-20ms | $$$ | Production, low-latency |
| **SD-WAN** | Tùy route | $$ | Multi-site enterprise |

### 3.3 Hybrid Patterns
- **Cloud bursting** - chạy on-prem, khi peak thì auto scale ra cloud.
- **Cloud as DR** - production on-prem, disaster recovery trên cloud.
- **Cloud-first dev** - dev/staging trên cloud, prod on-prem.

### 3.4 Tools
- **Kubernetes** - chạy ở đâu cũng được.
- **Terraform** - IaC đa cloud.
- **Anthos** (Google), **Azure Arc**, **AWS Outposts** - đem mặt phẳng cloud xuống on-prem.
- **HashiCorp Vault** - quản lý secret xuyên môi trường.

### 3.5 Real-world ví dụ
- **Netflix**: AWS-only từ 2008 (chống lại trào lưu multi-cloud).
- **Walmart**: AWS + Azure (không muốn nuôi Amazon).
- **Apple iCloud**: DC riêng + AWS + GCP.
- **Ngân hàng VN (BIDV, Vietcombank)**: hybrid bắt buộc theo quy định NHNN.

## 4. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:**
> - **Egress fee cắt cổ**: chuyển 1TB từ AWS sang GCP có thể tốn $90.
> - **Lowest common denominator**: chỉ dùng dịch vụ có ở cả 2 cloud → mất tính năng "xịn".
> - **2x team skill**: kỹ sư phải giỏi cả AWS lẫn GCP - lương gấp đôi, tuyển khó gấp ba.
> - **Hybrid latency**: gọi DB on-prem từ cloud có thể 50-200ms → app chậm.

## 5. ✅ Best practice

> 💡 **Mẹo:**
> - Đừng multi-cloud vì *sợ* vendor lock-in - hãy dùng abstraction (Terraform, K8s) trên 1 cloud trước.
> - Chỉ multi-cloud khi có **lý do thật**: compliance, giá tốt cho 1 dịch vụ cụ thể, customer yêu cầu.
> - Hybrid hợp với: ngân hàng, bệnh viện, doanh nghiệp đã đầu tư on-prem nặng.
> - **Đo egress fee** trước khi quyết - đây là "chi phí ẩn" giết multi-cloud.

## 6. 🤔 Khi nào dùng / không dùng

| Single cloud | Multi-cloud | Hybrid |
|---|---|---|
| Startup, app vừa | Compliance đa quốc gia | Bank/insurance VN |
| Team < 20 kỹ sư | Cần mặc cả giá | On-prem đã có sẵn |
| Tốc độ ra sản phẩm | Tránh outage 1 cloud | Data nhạy cảm |

## 7. 📌 Tóm tắt 30 giây

Single = đơn giản, nhanh. Multi-cloud = chống lock-in nhưng đắt + phức tạp. Hybrid = on-prem + cloud, hợp ngân hàng/y tế VN. Đừng "multi-cloud cho oai" - phải có lý do thật và tính được egress fee.
`,
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
- Direct Connect/ExpressRoute (leased line, 5-20ms, \\\\$\\\\$\\\\$)
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
        code: `# Terraform: Thiết lập đa đám mây (AWS + Azure)

# providers.tf (cấu hình providers Terraform)
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

# main.tf - cùng module, hai đám mây
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

# Python: Triển khai cùng workload cho cả hai cụm
import subprocess

# Hàm: áp dụng manifest Kubernetes lên cụm với kubeconfig cụ thể
def deploy_to_cluster(cluster_name: str, kubeconfig: str):
    """Apply Kubernetes manifests to any K8s cluster (cloud-agnostic)"""
    result = subprocess.run(
        ['kubectl', '--kubeconfig', kubeconfig, 'apply', '-f', 'app/'],
        capture_output=True, text=True
    )
    print(f"[{cluster_name}] {result.stdout}")
    return result.returncode == 0

# Triển khai active-active (cả hai cụm cùng nhận traffic)
clusters = [
    ('aws-eks-primary',  '~/.kube/aws-config'),
    ('azure-aks-dr',     '~/.kube/azure-config'),
]
# Lặp qua danh sách cụm và gọi hàm deploy cho từng cụm
for name, config in clusters:
    deploy_to_cluster(name, config)

# Hybrid: tính chi phí kết nối hybrid Cloud Connect
def hybrid_connection_cost(monthly_gb: int):
    vpn = monthly_gb * 0.05         # \\\\\\\$0.05/GB internet egress
    direct_connect = 250 + monthly_gb * 0.02   # \\\\\\\$250/month port + \\\\\\\$0.02/GB
    print("VPN:", vpn, "/month")
    print("Direct Connect:", direct_connect, "/month")
    print(f"Break-even at: {(250 / 0.03):.0f} GB/month")

hybrid_connection_cost(monthly_gb=15000)`,
        codeLanguage: "python",
        exercise: "Your company has a 20-person engineering team and runs a SaaS product on AWS. Justify whether they should adopt multi-cloud or stay single-cloud, with 3 specific reasons.",
        exerciseEn: "Your company has a 20-person engineering team and runs a SaaS product on AWS. Justify whether they should adopt multi-cloud or stay single-cloud, with 3 specific reasons.",
        quiz: [
          { question: "What is multi-cloud?", options: ["Multiple regions in one cloud", "Using 2+ public cloud providers", "Multiple accounts", "Cloud + Edge"], answer: 1, explanation: "Multi-cloud means actively using multiple public cloud providers (AWS + Azure + GCP)." },
          { question: "Hybrid cloud combines:", options: ["Two public clouds", "Public cloud + on-premise data center", "Two regions", "Cloud + SaaS"], answer: 1, explanation: "Hybrid = public cloud + on-premise infrastructure connected via VPN or Direct Connect." },
          { question: "Main downside of multi-cloud?", options: ["Slower internet", "Operational complexity 3-5× higher", "More expensive hardware", "No automation possible"], answer: 1, explanation: "Each cloud has its own services, APIs, and operational model - managing all of them multiplies complexity." },
          { question: "Best tool for cloud-agnostic infrastructure?", options: ["AWS CloudFormation", "Azure ARM templates", "Terraform", "Bash scripts"], answer: 2, explanation: "Terraform supports all major clouds with the same HCL language - true multi-cloud IaC." },
          { question: "When does hybrid cloud make most sense?", options: ["New startup", "Mature company with legacy systems and data residency requirements", "Personal projects", "Test environments"], answer: 1, explanation: "Hybrid is ideal when legacy systems can't migrate or regulations require some data to stay on-premise." },
        ],
      },
      {
        id: "cloud-strat-3",
        title: "Containers vs Serverless",
        titleEn: "Containers vs Serverless",
        theory: `## 1. 🚦 Vấn đề đời thường

Mở quán bún bò, thầy có 3 cách:
- **VM** = mua cả căn nhà, tự sửa điện nước, tự dọn - kiểm soát 100% nhưng mệt.
- **Container (Docker/K8s)** = thuê căn hộ chung cư - đã có điện nước, chỉ mang đồ vào, nhanh dọn nhanh chuyển.
- **Serverless (Lambda/Cloud Functions)** = thuê chỗ ngồi Highlands - uống xong đi luôn, tính tiền theo cốc, không cần lo bảo trì.

## 2. 💡 Khái niệm chính

- **Container**: đóng gói app + dependency vào 1 image, chạy chỗ nào cũng giống nhau. Orchestrator phổ biến: **Kubernetes** (K8s), ECS, GKE.
- **Serverless (FaaS)**: chỉ viết function, cloud lo bật/tắt máy. Tính tiền theo **số request × thời gian thực thi**.
- Cả hai đều "hơn VM": triển khai nhanh, scale tự động, dễ CI/CD.

## 3. 🧰 So sánh nhanh

| Tiêu chí | Container (K8s) | Serverless |
|---|---|---|
| Cold start | 0 (luôn chạy) | 100ms-3s |
| Tối đa thời gian | ∞ | 15 phút (Lambda) |
| Trạng thái (state) | OK (StatefulSet) | Stateless (cần DB ngoài) |
| Chi phí khi idle | Vẫn tính tiền pod | **0đ** |
| Độ phức tạp ops | Cao | **Thấp** |
| Vendor lock-in | Thấp (K8s mọi cloud) | Cao |

## 4. 🎯 Ví dụ chạy được ngay

\\\`\\\`\\\`python
# Serverless: AWS Lambda xử lý ảnh upload
def handler(event, context):
    bucket = event['Records'][0]['s3']['bucket']['name']
    key    = event['Records'][0]['s3']['object']['key']
    resize_image(bucket, key, max_w=800)
    return { "statusCode": 200 }
# Tính tiền: $0.20 / 1 triệu request + $0.0000166/GB-second
\\\`\\\`\\\`

\\\`\\\`\\\`yaml
# Container: K8s deployment 3 replica auto-scale
apiVersion: apps/v1
kind: Deployment
spec:
  replicas: 3
  template:
    spec:
      containers: [{ name: api, image: myapi:v1.2, resources: { limits: { cpu: "500m" } } }]
\\\`\\\`\\\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:**
> - **Cold start Lambda** với app Java/.NET có thể 3-5 giây → user nghĩ web sập.
> - **Serverless tưởng rẻ**: 100M request/tháng có thể đắt hơn 1 EC2 t3.medium chạy liên tục.
> - **K8s phức tạp**: cần kỹ sư DevOps lương cao; startup 5 người dùng K8s = tự bắn vào chân.
> - **Vendor lock-in serverless**: viết theo Lambda Event API → đổi sang Cloud Functions phải sửa nhiều.

## 6. ✅ Best practice

> 💡 **Mẹo:**
> - **Bắt đầu serverless** cho: webhook, cron job, image resize, API low-traffic.
> - **Chọn container** khi: long-running process, traffic ổn định cao, cần WebSocket/gRPC.
> - **Hybrid là hợp lý**: API chính chạy K8s, các tác vụ phụ (thumbnail, email) chạy Lambda.
> - **Đo trước, chọn sau**: chạy cả 2 với prototype 1 tuần, so chi phí + latency thật.

## 7. 🤔 Khi nào dùng / không dùng

| Serverless hợp | Container hợp |
|---|---|
| Traffic burst, idle nhiều | Traffic cao đều |
| Cron, webhook, ETL nhỏ | Microservices phức tạp |
| Team nhỏ, ít DevOps | Cần multi-cloud portable |
| Prototype nhanh | App stateful, WebSocket |

## 8. 📌 Tóm tắt 30 giây

Container = căn hộ; Serverless = ghế Highlands. Serverless rẻ khi idle, đắt khi chạy nhiều. K8s mạnh nhưng cần team. Hybrid (K8s + Lambda) là pattern thông minh nhất cho hệ thống thực tế.
`,
        theoryEn: `**Containers** (Docker, Kubernetes) and **Serverless** (Lambda, Cloud Functions) - choosing wrong wastes money and limits scale.

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
- Lambda 512MB: \\\\$8.50
- Fargate always-on: \\\\$30
- EC2 t3.micro 24/7: \\\\$7.50

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
# Nhập thư viện boto3 để tương tác với các dịch vụ AWS như S3.
import boto3
# Nhập thư viện PIL (Pillow) để xử lý ảnh.
from PIL import Image
# Nhập BytesIO từ module io để làm việc với dữ liệu nhị phân trong bộ nhớ.
from io import BytesIO

# Khởi tạo một client S3 để có thể gọi các API của S3.
s3 = boto3.client('s3')

# Định nghĩa hàm lambda_handler, đây là điểm vào chính khi AWS Lambda được kích hoạt.
# Đầu vào:
#   - event: Một dictionary chứa thông tin về sự kiện đã kích hoạt Lambda (ví dụ: upload ảnh lên S3).
#   - context: Một đối tượng chứa thông tin về môi trường thực thi Lambda.
# Đầu ra:
#   - Một dictionary chứa statusCode và body, cho biết kết quả thực thi của hàm.
def lambda_handler(event, context):
    """Triggered when image uploaded to S3"""
    # Lấy tên bucket S3 từ sự kiện.
    bucket = event['Records'][0]['s3']['bucket']['name']
    # Lấy khóa (tên file) của đối tượng S3 từ sự kiện.
    key = event['Records'][0]['s3']['object']['key']

    # Tải đối tượng (ảnh) từ S3.
    # Đầu vào: bucket và key của ảnh.
    # Đầu ra: Một đối tượng S3 chứa dữ liệu ảnh.
    obj = s3.get_object(Bucket=bucket, Key=key)
    # Mở ảnh bằng Pillow từ dữ liệu nhị phân đọc được từ S3.
    # Đầu vào: Dữ liệu nhị phân của ảnh.
    # Đầu ra: Một đối tượng ảnh của Pillow.
    img = Image.open(BytesIO(obj['Body'].read()))
    # Thay đổi kích thước ảnh (thumbnail) để vừa trong khung 300x300 pixel, giữ tỷ lệ.
    # Đầu vào: Kích thước tối đa (chiều rộng, chiều cao).
    img.thumbnail((300, 300))

    # Tạo một bộ đệm trong bộ nhớ để lưu ảnh đã thay đổi kích thước.
    out = BytesIO()
    # Lưu ảnh đã thay đổi kích thước vào bộ đệm dưới định dạng JPEG với chất lượng 85%.
    # Đầu vào: Bộ đệm, định dạng, chất lượng.
    img.save(out, format='JPEG', quality=85)
    # Di chuyển con trỏ về đầu bộ đệm để sẵn sàng đọc hoặc tải lên.
    out.seek(0)

    # Tải ảnh đã thay đổi kích thước lên một bucket S3 khác (có tên là bucket-thumbnails).
    # Đầu vào: Tên bucket đích, khóa (tên file), dữ liệu ảnh, kiểu nội dung.
    s3.put_object(
        Bucket=f"{bucket}-thumbnails", # Tên bucket đích, ví dụ: "my-images-thumbnails"
        Key=key,
        Body=out,
        ContentType='image/jpeg'
    )
    # Trả về một phản hồi HTTP thành công.
    # Kết quả mong đợi: {'statusCode': 200, 'body': 'Resized'}
    return {'statusCode': 200, 'body': 'Resized'}

# === CONTAINER: Dockerfile + K8s deployment ===
# Định nghĩa nội dung của Dockerfile dưới dạng chuỗi.
# Dockerfile này dùng để xây dựng một image Docker cho ứng dụng Python.
dockerfile = """
# Sử dụng image nền tảng Python 3.12 slim (nhỏ gọn).
FROM python:3.12-slim
# Đặt thư mục làm việc hiện tại bên trong container là /app.
WORKDIR /app
# Sao chép file requirements.txt vào thư mục làm việc.
COPY requirements.txt .
# Cài đặt các thư viện Python được liệt kê trong requirements.txt.
# --no-cache-dir giúp giảm kích thước image bằng cách không lưu cache cài đặt.
RUN pip install --no-cache-dir -r requirements.txt
# Sao chép tất cả các file còn lại từ thư mục hiện tại của host vào thư mục làm việc trong container.
COPY . .
# Định nghĩa lệnh sẽ được chạy khi container khởi động.
# Ở đây, sử dụng Gunicorn để phục vụ ứng dụng Python trên cổng 8000.
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "app:app"]
"""

# Định nghĩa cấu hình triển khai Kubernetes (Deployment) dưới dạng chuỗi YAML.
# Deployment này mô tả cách chạy ứng dụng web trong một cụm Kubernetes.
k8s_deployment = """
# Phiên bản API của Kubernetes.
apiVersion: apps/v1
# Loại tài nguyên Kubernetes: Deployment.
kind: Deployment
# Metadata cho Deployment, bao gồm tên.
metadata:
  name: web-app
# Đặc tả của Deployment.
spec:
  # Số lượng bản sao (replicas) của ứng dụng muốn chạy.
  replicas: 3
  # Bộ chọn (selector) để tìm các Pod mà Deployment này quản lý.
  selector:
    matchLabels: {app: web}
  # Mẫu (template) cho các Pod sẽ được tạo bởi Deployment.
  template:
    # Metadata cho Pod, bao gồm nhãn.
    metadata:
      labels: {app: web}
    # Đặc tả của Pod.
    spec:
      # Danh sách các container sẽ chạy trong Pod.
      containers:
      # Định nghĩa container đầu tiên.
      - name: web
        # Image Docker sẽ được sử dụng cho container này.
        image: 123.dkr.ecr.us-east-1.amazonaws.com/web:v1.2
        # Các cổng mà container sẽ lắng nghe.
        ports: [{containerPort: 8000}]
        # Yêu cầu và giới hạn tài nguyên (CPU, bộ nhớ) cho container.
        resources:
          # Yêu cầu tối thiểu.
          requests: {memory: "256Mi", cpu: "250m"}
          # Giới hạn tối đa.
          limits:   {memory: "512Mi", cpu: "500m"}
        # Cấu hình kiểm tra sức khỏe (liveness probe) để Kubernetes biết khi nào container cần được khởi động lại.
        livenessProbe:
          # Loại kiểm tra: HTTP GET.
          httpGet: {path: /health, port: 8000}
          # Thời gian chờ trước khi bắt đầu kiểm tra sức khỏe lần đầu.
          initialDelaySeconds: 30
"""

# === Cost decision helper ===
# Định nghĩa hàm để gợi ý lựa chọn dịch vụ điện toán dựa trên chi phí.
# Đầu vào:
#   - req_per_month: Số lượng yêu cầu mỗi tháng.
#   - avg_duration_ms: Thời gian xử lý trung bình cho mỗi yêu cầu (tính bằng mili giây).
# Đầu ra:
#   - In ra dịch vụ rẻ nhất và chi phí của nó, sau đó in ra chi phí của tất cả các tùy chọn.
def recommend_compute(req_per_month: int, avg_duration_ms: int):
    # Tính toán chi phí ước tính cho AWS Lambda.
    # Chi phí dựa trên số lượng yêu cầu (0.20 USD cho 1 triệu yêu cầu).
    lambda_cost = (req_per_month / 1_000_000) * 0.20
    # Chi phí dựa trên thời gian thực thi và bộ nhớ (512MB).
    lambda_cost += (req_per_month * avg_duration_ms / 1000) * (512/1024) * 0.0000166667

    # Chi phí ước tính cho AWS Fargate (luôn bật, 0.5 vCPU/1GB).
    fargate_cost = 30   # always-on 0.5 vCPU/1GB
    # Chi phí ước tính cho AWS EC2 (t3.micro chạy 24/7).
    ec2_cost = 7.50     # t3.micro 24/7

    # Tạo danh sách các tùy chọn dịch vụ và chi phí tương ứng.
    # Sắp xếp danh sách theo chi phí tăng dần.
    # Đầu vào: Danh sách các tuple (tên dịch vụ, chi phí).
    # Đầu ra: Danh sách đã sắp xếp.
    options = sorted([
        ('Lambda',  lambda_cost),
        ('Fargate', fargate_cost),
        ('EC2',     ec2_cost),
    ], key=lambda x: x[1])

    # In ra tùy chọn rẻ nhất.
    # Kết quả mong đợi: "Cheapest: Lambda 0.00000..." hoặc tương tự.
    print("Cheapest:", options[0][0], options[0][1])
    # In ra chi phí của tất cả các tùy chọn.
    # Kết quả mong đợi: Tên dịch vụ và chi phí của nó trên từng dòng.
    for name, cost in options:
        print(name, cost)

# Gọi hàm recommend_compute với 1 triệu yêu cầu mỗi tháng và thời gian xử lý trung bình 200ms.
# Kết quả mong đợi: In ra chi phí ước tính và dịch vụ rẻ nhất.
recommend_compute(req_per_month=1_000_000, avg_duration_ms=200)`,
        codeLanguage: "python",
        exercise: "Decide: Containers or Serverless for (1) a Slack bot, (2) a ML training job that runs 6 hours, (3) a real-time multiplayer game, (4) a daily ETL pipeline. Justify each.",
        exerciseEn: "Decide: Containers or Serverless for (1) a Slack bot, (2) a ML training job that runs 6 hours, (3) a real-time multiplayer game, (4) a daily ETL pipeline. Justify each.",
        quiz: [
          { question: "Maximum AWS Lambda execution time?", options: ["1 minute", "5 minutes", "15 minutes", "1 hour"], answer: 2, explanation: "Lambda has a hard 15-minute timeout - for longer workloads use Fargate, ECS, or Step Functions." },
          { question: "Cold start in serverless typically lasts:", options: ["1 microsecond", "100ms-2 seconds", "1 minute", "10 minutes"], answer: 1, explanation: "Cold starts add 100ms-2s while the runtime initializes. Provisioned concurrency eliminates this for critical paths." },
          { question: "Which is best for a long-running database server?", options: ["Lambda", "Containers (EKS/ECS)", "Step Functions", "EventBridge"], answer: 1, explanation: "Databases need persistent storage and continuous uptime - containers (or managed services) are the right fit." },
          { question: "Serverless is most cost-effective when:", options: ["Traffic is constant 24/7", "Traffic is intermittent / unpredictable", "Need GPU", "Need custom OS"], answer: 1, explanation: "Pay-per-execution shines for spiky/sporadic workloads. Constant traffic favors always-on containers or EC2." },
          { question: "What is GCP Cloud Run?", options: ["Database", "Serverless containers (best of both worlds)", "VM service", "DNS"], answer: 1, explanation: "Cloud Run runs containers in a serverless way - auto-scale to zero, pay per request, no Lambda's 15-min limit." },
        ],
      },
      {
        id: "cloud-strat-4",
        title: "Disaster Recovery (RTO/RPO)",
        titleEn: "Disaster Recovery (RTO/RPO)",
        theory: `## 1. 🚦 Vấn đề đời thường

Cháy nhà giữa đêm. Câu hỏi sống còn: **Mất bao lâu mới có nhà ở lại?** (RTO) và **Đồ đạc sao lưu lần cuối là khi nào?** (RPO). Disaster Recovery (DR) trong cloud cũng đúng 2 câu hỏi đó - nhưng "nhà" là hệ thống và "đồ đạc" là dữ liệu khách hàng.

## 2. 💡 RTO vs RPO

| Chỉ số | Ý nghĩa | Ví dụ |
|--------|---------|-------|
| **RTO** (Recovery Time Objective) | Bao lâu mới sống lại | "App down tối đa 1 giờ" |
| **RPO** (Recovery Point Objective) | Mất tối đa bao nhiêu data | "Mất tối đa 5 phút giao dịch" |

RTO/RPO càng nhỏ → chi phí càng lớn (gần như theo cấp số nhân).

## 3. 🛡️ 4 chiến lược DR (rẻ → đắt)

| Chiến lược | RTO | RPO | Chi phí | Ví dụ |
|-----------|-----|-----|---------|-------|
| **Backup & Restore** | giờ–ngày | giờ | $ | Blog, app nội bộ |
| **Pilot Light** | 10 phút–1 giờ | phút | $$ | Ecommerce nhỏ |
| **Warm Standby** | phút | giây | $$$ | Ngân hàng số |
| **Multi-Site Active-Active** | gần 0 | gần 0 | $$$$ | VietJet booking, Shopee |

## 4. 🎯 Ví dụ tính chi phí DR

\`\`\`python
def dr_cost(production_cost: float, strategy: str) -> float:
    multiplier = {
        "backup": 0.10,        # 10% prod
        "pilot_light": 0.25,   # 25% prod
        "warm_standby": 0.55,  # 55% prod
        "active_active": 1.0,  # 100% prod (gấp đôi tổng cộng)
    }[strategy]
    return production_cost * multiplier

print(dr_cost(10_000, "warm_standby"))  # 5500 USD/tháng
\`\`\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:** **Backup không test = không có backup**. 60% công ty phát hiện backup hỏng đúng lúc cần restore - vì chưa bao giờ thử.

- Đặt RTO 5 phút nhưng database 2 TB → restore thực tế mất 4 giờ.
- DR site ở **cùng region** với prod → cùng region sập là cùng chết.
- Tài liệu DR runbook có nhưng "người duy nhất biết chạy" đã nghỉ việc.

## 6. ✅ Best practice

> 💡 **Mẹo:** Tổ chức **DR drill mỗi quý**. Tắt thật prod region trong môi trường staging và bấm đồng hồ. Lần đầu sẽ sốc, nhưng sau 3 lần là êm.

- Chọn DR region **cách prod ≥ 1.000 km** (ap-southeast-1 ↔ ap-northeast-1).
- Tự động hoá failover bằng **Route 53 health check** + **Lambda**.
- Lưu runbook trong Git, không phải Confluence - kèm screenshot.

## 7. 🤔 Khi nào dùng chiến lược nào

- **Backup & Restore**: blog, công cụ nội bộ, mất 1 ngày không sao.
- **Pilot Light**: app SMB, mất 30 phút khách hàng vẫn chấp nhận.
- **Warm Standby**: SaaS có SLA 99.9%, mất phút thì OK.
- **Active-Active**: ngân hàng, sàn TMĐT lớn - downtime = mất doanh thu triệu USD/giờ.

## 8. 📌 Tóm tắt 30 giây

DR = trả lời 2 câu **RTO** (sống lại sau bao lâu) + **RPO** (mất tối đa bao nhiêu data). 4 chiến lược từ Backup đến Active-Active, chi phí tăng gấp 10× theo mức độ. Đừng tin backup chưa test, đừng để DR cùng region. Diễn tập mỗi quý là khác biệt giữa **DR thật** và **DR trên giấy**.
`,
        theoryEn: `**Disaster Recovery (DR)** = restoring service after disasters. Cloud makes DR 10× cheaper than on-prem.

## RTO vs RPO
- **RTO (Recovery Time Objective)**: max acceptable downtime
- **RPO (Recovery Point Objective)**: max acceptable data loss

## 4 DR Strategies

### 1. Backup & Restore - cheapest
- Periodic backups to other region. RTO: 24h+, RPO: hours. \\\\$ cost.
- Use: dev, internal tools

### 2. Pilot Light
- Core (DB replica) running, compute off until needed. RTO: 10s of min, RPO: minutes. \\\\$\\\\$.

### 3. Warm Standby
- Scaled-down full stack in DR region. RTO: minutes, RPO: seconds. \\\\$\\\\$\\\\$.
- Use: banking, healthcare

### 4. Multi-Site Active-Active
- Both regions running production. RTO/RPO ~0. \\\\$\\\\$\\\\$\\\\$.
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
- Facebook Oct 2021: BGP misconfig, 6h, \\\\$60M loss
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

# Add secondary region (eu-west-1) - read replica
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
        exercise: "A fintech app processes \\\\$5M/day in transactions. Recommend a DR strategy with specific RTO/RPO targets, estimated cost, and 3 mandatory tests.",
        exerciseEn: "A fintech app processes \\\\$5M/day in transactions. Recommend a DR strategy with specific RTO/RPO targets, estimated cost, and 3 mandatory tests.",
        quiz: [
          { question: "What does RTO measure?", options: ["Maximum data loss allowed", "Maximum downtime allowed", "Number of backups", "Server speed"], answer: 1, explanation: "RTO (Recovery Time Objective) is the maximum acceptable downtime before service is restored." },
          { question: "Cheapest DR strategy?", options: ["Active-Active", "Backup & Restore", "Warm Standby", "Pilot Light"], answer: 1, explanation: "Backup & Restore only pays for storage - no compute running idle. RTO is hours, not seconds." },
          { question: "Best DR strategy for a stock trading platform?", options: ["Backup & Restore", "Pilot Light", "Active-Active multi-region", "No DR needed"], answer: 2, explanation: "Trading needs near-zero RTO/RPO - only Active-Active provides instant failover with no data loss." },
          { question: "Why use immutable backups (S3 Object Lock)?", options: ["Cheaper", "Prevent ransomware/attacker from deleting backups", "Faster restore", "Smaller files"], answer: 1, explanation: "Object Lock makes backups WORM (write-once-read-many) - even compromised admin credentials can't delete them." },
          { question: "How often should you test DR?", options: ["Never (it works)", "Quarterly minimum for tier-1 systems", "Once a decade", "Only after disasters"], answer: 1, explanation: "Untested DR is no DR. Quarterly Game Days catch broken runbooks, expired credentials, and stale assumptions." },
        ],
      },
      {
        id: "cloud-strat-5",
        title: "Multi-Region Active-Active Architecture",
        titleEn: "Multi-Region Active-Active Architecture",
        theory: `## 1. 🚦 Vấn đề đời thường

Thầy mở 5 chi nhánh phở: Hà Nội, Đà Nẵng, Sài Gòn, Cần Thơ, Singapore. Khách Sài Gòn không phải bay ra Hà Nội ăn - họ vào chi nhánh gần nhất. Lỡ chi nhánh Hà Nội cháy, 4 chi nhánh kia vẫn bán bình thường. Đó là **multi-region active-active**: nhiều vùng cùng phục vụ traffic, không có vùng nào "dự phòng ngồi không".

Khác với **active-passive** (chi nhánh Đà Nẵng đóng cửa, chỉ mở khi Hà Nội cháy) - lãng phí và lúc cháy chuyển đổi mất 5-30 phút.

## 2. 💡 Khái niệm chính

- **Active-active**: ≥2 region cùng phục vụ user; route bằng **GeoDNS** hoặc **Anycast**.
- **Active-passive**: 1 region chính, region kia standby; **failover** thủ công/tự động.
- **RTO** (Recovery Time Objective): bao lâu mới sống lại. **RPO** (Recovery Point Objective): mất tối đa bao nhiêu phút data.

## 3. 🧰 Thành phần cốt lõi

| Tầng | Thách thức | Giải pháp phổ biến |
|---|---|---|
| DNS | Đưa user đến region gần | Route 53 latency-based, Cloudflare |
| Compute | Chạy giống nhau ở mọi region | Container image + IaC |
| **Database** | **Đồng bộ dữ liệu** | DynamoDB Global Tables, Spanner, Aurora Global |
| Cache | Tránh stale | TTL ngắn, invalidate cross-region |
| Storage | File giống nhau | S3 Cross-Region Replication |

## 4. 🎯 Ví dụ chạy được ngay

\\\`\\\`\\\`hcl
# Route 53 latency-based routing - gửi user đến endpoint gần nhất
resource "aws_route53_record" "api_sg" {
  zone_id = var.zone
  name    = "api.example.com"
  type    = "A"
  set_identifier = "singapore"
  latency_routing_policy { region = "ap-southeast-1" }
  alias { name = aws_lb.sg.dns_name, zone_id = aws_lb.sg.zone_id, evaluate_target_health = true }
}
resource "aws_route53_record" "api_us" { /* tương tự cho us-east-1 */ }
\\\`\\\`\\\`

## 5. ⚠️ Bẫy thường gặp

> ⚠️ **Cảnh báo:**
> - **Conflict ghi (write conflict)**: 2 region cùng update 1 record → ai thắng? Cần CRDT, version vector, hoặc partition theo user.
> - **Latency replication**: data đẩy từ SG sang US mất 200ms → user vừa đặt hàng SG sang US chưa thấy.
> - **Chi phí gấp đôi**: compute, storage, egress - multi-region đắt 1.8-2.5x single region.
> - **"Active-active" giả**: nhiều team thực ra chỉ active-passive nhưng tưởng active-active → khi cháy mới biết.

## 6. ✅ Best practice

> 💡 **Mẹo:**
> - **Stateless trước, stateful sau**: app layer dễ multi-region; DB là phần khó nhất, cân nhắc kỹ.
> - **Partition theo region**: user SG → ghi DB SG (primary), user US → DB US - tránh conflict.
> - **Test failover định kỳ** (game day): tắt thật 1 region 30 phút trong giờ thấp điểm.
> - Nếu chỉ cần RTO 15 phút, **active-passive với hot standby** đơn giản và rẻ hơn nhiều.

## 7. 🤔 Khi nào dùng / không dùng

| Cần active-active | Không cần |
|---|---|
| RTO < 1 phút | RTO 30 phút OK |
| User toàn cầu | User chỉ ở VN |
| Doanh thu/giây cao (Shopee Sale) | Internal tool |
| Compliance đa quốc gia | Startup MVP |

## 8. 📌 Tóm tắt 30 giây

Active-active = nhiều chi nhánh cùng bán; active-passive = chi nhánh dự phòng đóng cửa. Multi-region đắt, phức tạp, đặc biệt là DB. Trừ khi RTO < 1 phút và user toàn cầu, hãy bắt đầu bằng multi-AZ + active-passive.
`,
        theoryEn: `**Multi-Region Active-Active** = production running in ≥2 regions simultaneously. The peak architecture for tier-1 systems.

## Why
1. Low global latency
2. RTO ~0 disaster recovery
3. Data residency compliance
4. Capacity beyond one region

## 3 Patterns
1. **Active-Passive** - A serves all, B standby. Simple but B idle.
2. **Active-Active geo-routed** - DNS picks nearest region. Low latency + natural DR.
3. **Cell-based** (Netflix/AWS) - independent cells per user subset. Hyper-scale only.

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
Single-region \\\\$20k → multi-region \\\\$45k (2.25×). Justified only when downtime > extra cost.

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
# Nhập thư viện boto3 để tương tác với các dịch vụ AWS.
import boto3

# Khởi tạo một client DynamoDB để gọi các API của DynamoDB.
dynamodb = boto3.client('dynamodb')

# Tạo một bảng cơ sở (base table) trong vùng us-east-1.
# Bảng này sẽ được dùng làm nền tảng cho bảng Global Table.
dynamodb.create_table(
    TableName='users', # Tên của bảng là 'users'.
    KeySchema=[{'AttributeName': 'user_id', 'KeyType': 'HASH'}], # Định nghĩa khóa chính: user_id là khóa phân vùng (HASH).
    AttributeDefinitions=[{'AttributeName': 'user_id', 'AttributeType': 'S'}], # Định nghĩa thuộc tính user_id có kiểu dữ liệu là chuỗi (S).
    BillingMode='PAY_PER_REQUEST', # Chế độ thanh toán là theo yêu cầu (chỉ trả tiền cho những gì bạn sử dụng).
    StreamSpecification={
        'StreamEnabled': True, # Bật DynamoDB Streams để theo dõi các thay đổi dữ liệu.
        'StreamViewType': 'NEW_AND_OLD_IMAGES'    # Bắt buộc phải có StreamViewType này ('NEW_AND_OLD_IMAGES') để sử dụng Global Tables.
    }
)

# Thêm bảng 'users' vào Global Table để sao chép dữ liệu sang các vùng khác.
# Dữ liệu sẽ được tự động sao chép giữa us-east-1, eu-west-1 và ap-southeast-1.
dynamodb.create_global_table(
    GlobalTableName='users', # Tên của Global Table là 'users'.
    ReplicationGroup=[ # Danh sách các vùng mà dữ liệu sẽ được sao chép đến.
        {'RegionName': 'us-east-1'},
        {'RegionName': 'eu-west-1'},
        {'RegionName': 'ap-southeast-1'}
    ]
)

# Ghi dữ liệu từ bất kỳ vùng nào - dữ liệu sẽ tự động được sao chép trong vài giây.
# Khởi tạo một resource DynamoDB cho vùng us-east-1.
us_dynamo = boto3.resource('dynamodb', region_name='us-east-1')
# Ghi một mục (item) vào bảng 'users' trong vùng us-east-1.
# Mục này sẽ được tự động sao chép sang các vùng khác trong Global Table.
us_dynamo.Table('users').put_item(Item={
    'user_id': '123',
    'name': 'Alice',
    'updated_at': '2026-04-19T10:00:00Z'
})

# === Route 53 Latency-Based Routing ===
# Khởi tạo một client Route 53 để tương tác với dịch vụ DNS của AWS.
route53 = boto3.client('route53')

# Cấu hình Route 53 Latency-Based Routing.
# Cùng một tên DNS nhưng trỏ đến các IP khác nhau tùy theo vùng. Route 53 sẽ chọn IP gần nhất với người dùng.
# Lặp qua danh sách các vùng và địa chỉ IP tương ứng.
for region, ip in [('us-east-1', '1.2.3.4'),
                   ('eu-west-1', '5.6.7.8'),
                   ('ap-southeast-1', '9.10.11.12')]:
    # Thay đổi (tạo) một bản ghi tài nguyên (Resource Record Set) trong Route 53.
    route53.change_resource_record_sets(
        HostedZoneId='Z123', # ID của Hosted Zone (vùng lưu trữ DNS của bạn).
        ChangeBatch={'Changes': [{ # Một lô các thay đổi cần thực hiện.
            'Action': 'CREATE', # Hành động là tạo bản ghi mới.
            'ResourceRecordSet': {
                'Name': 'api.app.com', # Tên DNS mà người dùng sẽ truy cập.
                'Type': 'A', # Loại bản ghi là A (ánh xạ tên miền tới địa chỉ IPv4).
                'SetIdentifier': region, # Định danh duy nhất cho bản ghi trong một nhóm bản ghi.
                'Region': region,                    # Chỉ định vùng cho định tuyến dựa trên độ trễ của AWS.
                'TTL': 60, # Thời gian tồn tại (Time To Live) của bản ghi là 60 giây.
                'ResourceRecords': [{'Value': ip}] # Địa chỉ IP mà tên miền sẽ trỏ tới.
            }
        }]}
    )

# === Idempotency key for safe retries ===
# Nhập thư viện hashlib để tạo mã băm (hash).
import hashlib
# Nhập thư viện json để làm việc với dữ liệu JSON.
import json

# Định nghĩa hàm safe_payment để xử lý thanh toán với khóa idempotency.
# Đảm bảo rằng việc thử lại thanh toán sẽ an toàn và không tạo ra các giao dịch trùng lặp.
# Đầu vào: amount (số tiền), user_id (ID người dùng), request_id (ID yêu cầu duy nhất).
# Đầu ra: Kết quả thanh toán (một dictionary).
def safe_payment(amount: float, user_id: str, request_id: str):
    """Process payment with idempotency - retry-safe across regions"""
    # Tạo khóa idempotency bằng cách băm user_id và request_id.
    # Khóa này đảm bảo mỗi yêu cầu thanh toán duy nhất chỉ được xử lý một lần.
    idempotency_key = hashlib.sha256(
        f"{user_id}:{request_id}".encode() # Mã hóa chuỗi thành bytes trước khi băm.
    ).hexdigest() # Lấy kết quả băm dưới dạng chuỗi thập lục phân.

    # Kiểm tra xem yêu cầu này đã được xử lý trước đó chưa.
    # Sử dụng bảng DynamoDB 'payments' để lưu trữ trạng thái các giao dịch.
    table = boto3.resource('dynamodb').Table('payments')
    # Lấy mục từ bảng dựa trên idempotency_key.
    existing = table.get_item(Key={'idempotency_key': idempotency_key})

    # Nếu mục đã tồn tại (tức là yêu cầu đã được xử lý), trả về kết quả đã lưu.
    if 'Item' in existing:
        return existing['Item']     # Đã hoàn thành - trả về kết quả đã được lưu trong cache.

    # Nếu đây là một yêu cầu mới, tiến hành xử lý thanh toán.
    result = {'idempotency_key': idempotency_key, 'amount': amount,
              'status': 'completed'}
    # Ghi kết quả thanh toán vào bảng 'payments'.
    # ConditionExpression='attribute_not_exists(idempotency_key)' đảm bảo rằng
    # mục chỉ được ghi nếu idempotency_key chưa tồn tại, ngăn chặn ghi đè.
    table.put_item(Item=result, ConditionExpression='attribute_not_exists(idempotency_key)')
    # Trả về kết quả của giao dịch mới.
    return result

# === Health check global aggregator ===
# Định nghĩa hàm check_all_regions để kiểm tra tình trạng sức khỏe của dịch vụ trên tất cả các vùng.
# Đầu vào: Không có.
# Đầu ra: Một dictionary chứa trạng thái sức khỏe của từng vùng.
def check_all_regions():
    # Danh sách các vùng cần kiểm tra.
    regions = ['us-east-1', 'eu-west-1', 'ap-southeast-1']
    health = {} # Khởi tạo dictionary để lưu trữ trạng thái sức khỏe.
    # Lặp qua từng vùng để kiểm tra.
    for region in regions:
        # Đây là một ví dụ về cách gọi endpoint kiểm tra sức khỏe tùy chỉnh cho mỗi vùng.
        # health[region] = httpx.get(f'https://{region}.api.app.com/health').json()
        # Trong ví dụ này, chúng ta sử dụng dữ liệu giả định.
        health[region] = {'status': 'healthy', 'latency_ms': 25}
    # Trả về dictionary chứa trạng thái sức khỏe của tất cả các vùng.
    return health

# Gọi hàm check_all_regions và in kết quả ra màn hình dưới dạng JSON được định dạng đẹp.
# Kết quả mong đợi: Một đối tượng JSON hiển thị trạng thái sức khỏe của từng vùng.
print(json.dumps(check_all_regions(), indent=2))`,
        codeLanguage: "python",
        exercise: "Design a multi-region active-active architecture for a global e-commerce platform serving US, EU, and Asia. Specify: DB choice, consistency model, failover strategy, and 3 trade-offs accepted.",
        exerciseEn: "Design a multi-region active-active architecture for a global e-commerce platform serving US, EU, and Asia. Specify: DB choice, consistency model, failover strategy, and 3 trade-offs accepted.",
        quiz: [
          { question: "Active-Active means:", options: ["One region serves traffic, other is standby", "Both regions actively serve production traffic", "Backup runs every hour", "Two databases sharing one disk"], answer: 1, explanation: "Active-Active runs production in 2+ regions simultaneously, often with geo-routing to nearest user." },
          { question: "CAP Theorem says you must trade off:", options: ["Cost, Availability, Performance", "Consistency, Availability, Partition tolerance", "Compute, Storage, Network", "CDN, API, Database"], answer: 1, explanation: "Eric Brewer's CAP says distributed systems can guarantee only 2 of: Consistency, Availability, Partition tolerance." },
          { question: "Best DB for global active-active with strong consistency?", options: ["Single-region MySQL", "DynamoDB Global Tables", "Spanner or CockroachDB", "Redis"], answer: 2, explanation: "Spanner (atomic clock) and CockroachDB are designed for global strong consistency. DynamoDB Global is eventual." },
          { question: "Why use idempotency keys in multi-region?", options: ["Faster queries", "Prevent duplicate charges when retries cross regions", "Smaller payloads", "Lower latency"], answer: 1, explanation: "Network partitions cause client retries - idempotency keys ensure the same payment isn't processed twice." },
          { question: "Anti-pattern in multi-region?", options: ["Per-region canary deploys", "Backward-compatible schema migrations", "Deploying simultaneously to all regions", "Idempotency keys"], answer: 2, explanation: "Simultaneous deploys mean a single bug takes down ALL regions. Always canary one region first, then gradually expand." },
        ],
      },
    ],
  },
];
