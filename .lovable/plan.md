
Tiếp tục mở rộng nội dung Theory cho Learn Programming theo chuẩn đã thiết lập (6-9 H2 sections, case study thật, trade-off tables, best practices, anti-patterns).

## Trạng thái hiện tại
**Đã hoàn thành (đợt 1 — phần 1/3):**
- `cloudLessons.ts`: 4/15 lessons (cloud-fund-1, cloud-fund-2, cloud-fund-3, cloud-compute-1)

**Người dùng hiện đang ở:** `/programming/prog-data-pipeline` → thuộc Data Engineering pillar

## Kế hoạch tiếp theo

### Đợt này — Hoàn tất Cloud + bắt đầu Data Engineering

**Phần A: Hoàn tất Cloud Engineer (cloudLessons.ts còn 11 lessons)**
Mở rộng theory + theoryEn cho:
1. cloud-storage-1 (S3/Object Storage)
2. cloud-compute-2 (Containers/Kubernetes)
3. cloud-net-1 (VPC/Networking)
4. cloud-iam-1 (IAM/Security)
5. cloud-sec-1 (Encryption/Compliance)
6. cloud-serverless-1 (Lambda/Functions)
7. cloud-iac-1 (Terraform/IaC)
8. cloud-cicd-1 (CI/CD pipelines)
9. cloud-arch-1 (Well-Architected)
10. cloud-cost-1 (FinOps cơ bản)
11. cloud-arch-2 (Microservices)

**Phần B: Data Engineering (dataEngLessons.ts) — vì user đang ở pipeline lesson**
Ưu tiên mở rộng các module quan trọng nhất trước:
1. Module 1: Pandas Basics
2. Module 2: Data Cleaning
3. Module 3: Data Ingestion
4. Module 4: ETL Pipeline Design ← user đang xem
5. Module 5: Data Modeling
6. Module 6: Data Warehousing

(Module 7-11 sẽ làm trong đợt sau)

## Chuẩn nội dung (giữ nguyên)
Mỗi lesson tối thiểu 6-9 H2 sections:
- Tổng quan & bối cảnh
- Khái niệm cốt lõi
- Cách hoạt động chi tiết (sơ đồ ASCII / bảng)
- Case study thật (Netflix, Spotify, Stripe, Airbnb, Uber, Grab, Shopee...)
- So sánh / trade-offs (bảng)
- Best practices (checklist)
- Common pitfalls / anti-patterns
- Khi nào nên / không nên dùng
- Bridge sang bài tiếp theo

## Files chỉnh sửa
- `src/data/curriculum/cloudLessons.ts` (11 lessons còn lại)
- `src/data/curriculum/dataEngLessons.ts` (6 modules đầu)

Không tạo file mới, không thay schema, không đụng UI/backend. Cấu trúc code/exercise/quiz giữ nguyên — chỉ mở rộng `theory` và `theoryEn`.

## Đợt sau (sẽ tiếp tục trong message kế tiếp)
- `cloudExpansion.ts` (10 lessons)
- `dataEngLessons.ts` module 7-11
- `aiFoundationLessons.ts`, `mlLessons.ts`
- `sqlLessons.ts`, `programmingExpansion.ts`
