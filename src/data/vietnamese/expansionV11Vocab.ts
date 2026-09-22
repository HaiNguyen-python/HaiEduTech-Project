/**
 * @file expansionV11Vocab.ts
 * @description Giai đoạn 2 (phần 2) - 10 bài từ vựng chuyên đề mới cho nhóm vn-vocab-specialized.
 * @copyright 2026 HaiEduTech, ILC. All rights reserved.
 */
import { vocabularyModules } from "./vocabularyLessons";
import type { VietnameseLesson, VietnameseQuizQuestion, VietnameseVocabEntry } from "./types";

const v = (
  word: string,
  meaning: string,
  meaningEn: string,
  example: string,
  exampleEn: string,
  partOfSpeech?: string,
): VietnameseVocabEntry => ({ word, meaning, meaningEn, example, exampleEn, partOfSpeech });

const q = (
  question: string,
  questionEn: string,
  options: string[],
  answer: number,
  explanation: string,
  explanationEn: string,
): VietnameseQuizQuestion => ({ question, questionEn, options, answer, explanation, explanationEn });

const lessons: VietnameseLesson[] = [
  {
    id: "vn-v11-vocab-banking",
    title: "Từ vựng ngân hàng và giao dịch",
    titleEn: "Banking and Transaction Vocabulary",
    level: "intermediate",
    theory: `## Ngân hàng và giao dịch

### 1. Ba nhóm từ cần nhớ
- **Tài khoản**: mở tài khoản, số tài khoản, chủ tài khoản, sao kê
- **Giao dịch**: chuyển khoản, rút tiền, nạp tiền, phí giao dịch
- **Tín dụng**: thẻ tín dụng, lãi suất, kỳ hạn, hạn mức

### 2. Mẫu câu tại quầy
> Em muốn **mở tài khoản** thanh toán ạ.
> Cho em **chuyển khoản** 5 triệu sang số tài khoản này.
> **Lãi suất** kỳ hạn 12 tháng là bao nhiêu ạ?

### 3. Lưu ý dùng từ
"Chuyển khoản" là chuyển giữa hai tài khoản, "chuyển tiền" rộng hơn, có thể gửi tiền mặt.`,
    theoryEn: `## Banking and transactions

Three groups: accounts (mở tài khoản, số tài khoản, sao kê), transactions (chuyển khoản, rút tiền, phí giao dịch), credit (thẻ tín dụng, lãi suất, kỳ hạn, hạn mức).

Counter phrases: Em muốn mở tài khoản thanh toán; Cho em chuyển khoản 5 triệu; Lãi suất kỳ hạn 12 tháng là bao nhiêu.

'Chuyển khoản' moves money account to account; 'chuyển tiền' is broader and can include cash.`,
    vocabulary: [
      v("tài khoản", "nơi giữ tiền ở ngân hàng", "bank account", "Em muốn mở tài khoản thanh toán.", "I would like to open a current account.", "danh từ"),
      v("chuyển khoản", "gửi tiền giữa hai tài khoản", "bank transfer", "Tôi đã chuyển khoản sáng nay.", "I made the transfer this morning.", "động từ"),
      v("sao kê", "bảng liệt kê giao dịch", "bank statement", "Cho em in sao kê ba tháng.", "Please print a three-month statement.", "danh từ"),
      v("lãi suất", "phần trăm tiền lãi", "interest rate", "Lãi suất kỳ hạn một năm là 5%.", "The one-year interest rate is 5%.", "danh từ"),
      v("kỳ hạn", "thời gian gửi hoặc trả", "term, maturity", "Sổ tiết kiệm kỳ hạn sáu tháng.", "A six-month savings term.", "danh từ"),
      v("thẻ tín dụng", "thẻ chi trước trả sau", "credit card", "Tôi trả bằng thẻ tín dụng.", "I paid by credit card.", "danh từ"),
      v("hạn mức", "mức tối đa được dùng", "credit limit", "Hạn mức thẻ là 50 triệu.", "The card limit is 50 million.", "danh từ"),
      v("phí giao dịch", "tiền trả cho mỗi lần giao dịch", "transaction fee", "Phí giao dịch là 11 nghìn đồng.", "The transaction fee is 11,000 dong.", "danh từ"),
      v("rút tiền", "lấy tiền ra khỏi tài khoản", "to withdraw", "Tôi rút tiền ở cây ATM.", "I withdrew money at the ATM.", "động từ"),
      v("số dư", "tiền còn lại trong tài khoản", "balance", "Số dư tài khoản còn 2 triệu.", "The account balance is 2 million.", "danh từ"),
    ],
    quiz: [
      q("Từ nào chỉ bảng liệt kê giao dịch?", "Which word means a list of transactions?", ["sao kê", "hạn mức", "kỳ hạn", "số dư"], 0, "'Sao kê' là bảng liệt kê các giao dịch của tài khoản.", "'Sao kê' is the account statement."),
      q("'Số dư' nghĩa là gì?", "What does 'số dư' mean?", ["Tiền còn lại trong tài khoản", "Phí giao dịch", "Tiền lãi", "Hạn mức thẻ"], 0, "'Số dư' là số tiền hiện còn trong tài khoản.", "'Số dư' is the remaining balance."),
      q("Câu nào đúng khi muốn gửi tiền sang tài khoản khác?", "Which sentence asks to move money to another account?", ["Cho em chuyển khoản sang số tài khoản này.", "Cho em rút tiền sang số tài khoản này.", "Cho em sao kê sang tài khoản này.", "Cho em lãi suất tài khoản này."], 0, "Chuyển giữa hai tài khoản gọi là 'chuyển khoản'.", "Moving money between accounts is 'chuyển khoản'."),
      q("'Kỳ hạn' liên quan tới điều gì?", "What is 'kỳ hạn' about?", ["Thời gian gửi hoặc trả", "Số tiền tối đa", "Tên chủ tài khoản", "Loại thẻ"], 0, "'Kỳ hạn' là khoảng thời gian của khoản gửi hay khoản vay.", "'Kỳ hạn' is the term of a deposit or loan."),
      q("'Hạn mức' của thẻ tín dụng là gì?", "What is a credit card 'hạn mức'?", ["Mức chi tiêu tối đa được phép", "Phí thường niên", "Lãi suất", "Ngày hết hạn"], 0, "'Hạn mức' là số tiền tối đa được phép sử dụng.", "'Hạn mức' is the maximum spending allowed."),
    ],
  },
  {
    id: "vn-v11-vocab-realestate",
    title: "Từ vựng nhà ở và thuê nhà",
    titleEn: "Housing and Renting Vocabulary",
    level: "intermediate",
    theory: `## Nhà ở và thuê nhà

### 1. Loại chỗ ở
nhà nguyên căn, chung cư, căn hộ dịch vụ, phòng trọ, nhà trong hẻm

### 2. Từ về hợp đồng
tiền cọc, tiền thuê, hợp đồng thuê, chủ nhà, người thuê, gia hạn, thanh lý hợp đồng

### 3. Mẫu câu thương lượng
> Tiền cọc mấy tháng ạ?
> Giá này đã bao gồm phí quản lý chưa ạ?
> Em muốn xem nhà vào cuối tuần được không ạ?

### 4. Lưu ý văn hóa
Người Việt thường hỏi hướng nhà và tầng lầu vì liên quan tới nắng, gió và phong thủy.`,
    theoryEn: `## Housing and renting

Housing types: nhà nguyên căn (whole house), chung cư (apartment block), căn hộ dịch vụ (serviced flat), phòng trọ (rented room), nhà trong hẻm (house in an alley).

Contract words: tiền cọc (deposit), tiền thuê (rent), hợp đồng thuê, chủ nhà, người thuê, gia hạn, thanh lý hợp đồng.

Vietnamese renters commonly ask about the house direction and floor level because of sunlight, airflow and feng shui.`,
    vocabulary: [
      v("nhà nguyên căn", "cả căn nhà cho một hộ", "whole house", "Gia đình tôi thuê nhà nguyên căn.", "My family rents a whole house.", "danh từ"),
      v("phòng trọ", "phòng thuê giá rẻ", "rented room", "Sinh viên thường ở phòng trọ.", "Students usually live in rented rooms.", "danh từ"),
      v("tiền cọc", "tiền đặt trước để giữ nhà", "deposit", "Tiền cọc bằng một tháng tiền thuê.", "The deposit equals one month's rent.", "danh từ"),
      v("chủ nhà", "người cho thuê", "landlord", "Chủ nhà rất dễ tính.", "The landlord is easy-going.", "danh từ"),
      v("người thuê", "người trả tiền để ở", "tenant", "Người thuê phải giữ gìn nhà cửa.", "The tenant must look after the house.", "danh từ"),
      v("phí quản lý", "tiền trả cho dịch vụ chung cư", "management fee", "Phí quản lý tính theo mét vuông.", "The management fee is per square metre.", "danh từ"),
      v("hẻm", "đường nhỏ trong khu dân cư", "alley", "Nhà nằm trong hẻm nhỏ.", "The house sits in a small alley.", "danh từ"),
      v("hướng nhà", "phía nhà đối diện", "house direction", "Hướng nhà quay về phía nam.", "The house faces south.", "danh từ"),
      v("nội thất", "đồ đạc trong nhà", "furniture, interior", "Căn hộ có sẵn nội thất.", "The flat comes furnished.", "danh từ"),
      v("gia hạn hợp đồng", "kéo dài thời gian thuê", "to renew a lease", "Chúng tôi muốn gia hạn hợp đồng một năm.", "We want to renew the lease for a year.", "động từ"),
    ],
    quiz: [
      q("'Tiền cọc' là gì?", "What is 'tiền cọc'?", ["Tiền đặt trước để giữ nhà", "Tiền thuê hằng tháng", "Phí quản lý", "Tiền điện nước"], 0, "'Tiền cọc' là khoản đặt trước, thường được trả lại khi kết thúc hợp đồng.", "It is the upfront deposit, usually refundable."),
      q("Ai là 'chủ nhà'?", "Who is the 'chủ nhà'?", ["Người cho thuê", "Người thuê", "Người môi giới", "Người bảo vệ"], 0, "'Chủ nhà' là bên sở hữu và cho thuê nhà.", "'Chủ nhà' owns and rents out the property."),
      q("Câu nào hỏi về chi phí đi kèm?", "Which question asks about extra costs?", ["Giá này đã bao gồm phí quản lý chưa ạ?", "Nhà hướng nào ạ?", "Nhà có nội thất không ạ?", "Em xem nhà cuối tuần nhé?"], 0, "Câu hỏi về phí quản lý làm rõ chi phí kèm theo tiền thuê.", "Asking about the management fee clarifies added costs."),
      q("'Phòng trọ' thường dành cho ai?", "Who typically rents a 'phòng trọ'?", ["Sinh viên và người lao động", "Khách du lịch hạng sang", "Doanh nghiệp lớn", "Người mua nhà"], 0, "'Phòng trọ' là chỗ thuê giá rẻ, phổ biến với sinh viên và người lao động.", "It is budget housing common for students and workers."),
      q("'Gia hạn hợp đồng' nghĩa là gì?", "What does 'gia hạn hợp đồng' mean?", ["Kéo dài thời gian thuê", "Hủy hợp đồng", "Tăng tiền thuê", "Đổi chủ nhà"], 0, "Gia hạn là tiếp tục hợp đồng thêm một thời gian.", "It means extending the lease period."),
    ],
  },
  {
    id: "vn-v11-vocab-hospital",
    title: "Từ vựng bệnh viện và khám chữa bệnh",
    titleEn: "Hospital and Medical Vocabulary",
    level: "intermediate",
    theory: `## Bệnh viện và khám bệnh

### 1. Quy trình khám
lấy số - đăng ký khám - khám lâm sàng - xét nghiệm - nhận kết quả - lấy thuốc

### 2. Nói về triệu chứng
> Em bị **đau đầu** và **sốt** từ hôm qua.
> Em **ho khan** khoảng ba ngày rồi ạ.
> Em **dị ứng** với thuốc kháng sinh.

### 3. Từ về bảo hiểm
bảo hiểm y tế, thẻ bảo hiểm, tuyến đầu, chuyển tuyến, đồng chi trả

### 4. Lưu ý quan trọng
Trong y tế tuyệt đối không nói giảm. Hãy nói rõ vị trí, mức độ và thời gian đau.`,
    theoryEn: `## Hospital visits

Process: take a number, register, clinical examination, tests, receive results, collect medicine.

Describing symptoms: đau đầu (headache), sốt (fever), ho khan (dry cough), dị ứng (allergy). Insurance words: bảo hiểm y tế, thẻ bảo hiểm, chuyển tuyến (referral), đồng chi trả (co-payment).

In medical settings never soften: state the exact location, severity and duration.`,
    vocabulary: [
      v("đăng ký khám", "ghi tên để được khám", "to register for examination", "Em đăng ký khám nội tổng quát.", "I registered for general internal medicine.", "động từ"),
      v("triệu chứng", "dấu hiệu của bệnh", "symptom", "Triệu chứng gồm sốt và ho.", "Symptoms include fever and cough.", "danh từ"),
      v("xét nghiệm", "kiểm tra mẫu máu, nước tiểu", "medical test", "Bác sĩ cho em đi xét nghiệm máu.", "The doctor sent me for a blood test.", "danh từ"),
      v("đơn thuốc", "giấy ghi thuốc phải uống", "prescription", "Em lấy thuốc theo đơn thuốc này.", "I collect medicine with this prescription.", "danh từ"),
      v("dị ứng", "phản ứng xấu với chất nào đó", "allergy", "Em dị ứng với hải sản.", "I am allergic to seafood.", "động từ"),
      v("bảo hiểm y tế", "chế độ chi trả chi phí khám bệnh", "health insurance", "Thẻ bảo hiểm y tế giúp giảm chi phí.", "Health insurance reduces the cost.", "danh từ"),
      v("chuyển tuyến", "chuyển sang bệnh viện cấp cao hơn", "referral to a higher-level hospital", "Bác sĩ viết giấy chuyển tuyến.", "The doctor wrote a referral.", "động từ"),
      v("cấp cứu", "chữa ngay cho ca nguy hiểm", "emergency care", "Bệnh nhân được đưa vào cấp cứu.", "The patient was taken to emergency.", "danh từ"),
      v("tái khám", "khám lại sau đợt điều trị", "follow-up visit", "Em tái khám sau mười ngày.", "I have a follow-up in ten days.", "động từ"),
      v("liều dùng", "lượng thuốc mỗi lần uống", "dosage", "Liều dùng là hai viên mỗi ngày.", "The dosage is two tablets a day.", "danh từ"),
    ],
    quiz: [
      q("'Triệu chứng' là gì?", "What is a 'triệu chứng'?", ["Dấu hiệu của bệnh", "Tên thuốc", "Loại bảo hiểm", "Phòng khám"], 0, "'Triệu chứng' là biểu hiện cho thấy người bệnh đang có vấn đề.", "A symptom is a sign of illness."),
      q("Khi cần khám ở bệnh viện cấp cao hơn, cần giấy gì?", "What paper do you need for a higher-level hospital?", ["Giấy chuyển tuyến", "Đơn thuốc", "Sao kê", "Hợp đồng"], 0, "Giấy chuyển tuyến cho phép khám ở bệnh viện tuyến trên và vẫn hưởng bảo hiểm.", "A referral allows treatment at a higher level with insurance cover."),
      q("Cách nói nào rõ ràng nhất khi mô tả bệnh?", "Which description is clearest?", ["Em đau đầu và sốt từ hôm qua.", "Em hơi không được ổn.", "Em thấy khó nói lắm.", "Em không sao đâu ạ."], 0, "Y tế cần thông tin chính xác về vị trí, mức độ và thời gian.", "Medical contexts need exact location, severity and duration."),
      q("'Liều dùng' cho biết điều gì?", "What does 'liều dùng' tell you?", ["Lượng thuốc mỗi lần uống", "Giá thuốc", "Tên bác sĩ", "Ngày tái khám"], 0, "'Liều dùng' là lượng thuốc và số lần uống trong ngày.", "Dosage states how much and how often to take."),
      q("'Tái khám' nghĩa là gì?", "What does 'tái khám' mean?", ["Khám lại sau điều trị", "Khám lần đầu", "Cấp cứu", "Xét nghiệm máu"], 0, "'Tái khám' là lần khám tiếp theo để theo dõi kết quả điều trị.", "It is the follow-up visit to review treatment."),
    ],
  },
  {
    id: "vn-v11-vocab-law",
    title: "Từ vựng hành chính và pháp lý cơ bản",
    titleEn: "Basic Administrative and Legal Vocabulary",
    level: "advanced",
    theory: `## Hành chính và pháp lý

### 1. Giấy tờ thường gặp
căn cước công dân, hộ khẩu, giấy khai sinh, giấy tạm trú, công chứng, bản sao y

### 2. Từ trong thủ tục
nộp hồ sơ, tiếp nhận, thụ lý, xác minh, cấp phép, gia hạn, hồ sơ bổ sung

### 3. Mẫu câu tại cơ quan
> Em nộp hồ sơ xin cấp lại căn cước ạ.
> Hồ sơ cần công chứng những giấy tờ nào ạ?
> Bao lâu thì có kết quả ạ?

### 4. Lưu ý
Văn bản pháp lý dùng nghĩa chính xác, không dùng thành ngữ hay nói giảm.`,
    theoryEn: `## Administrative and legal basics

Documents: căn cước công dân (ID card), hộ khẩu (household registration), giấy khai sinh (birth certificate), giấy tạm trú (temporary residence), công chứng (notarisation), bản sao y (certified copy).

Procedure verbs: nộp hồ sơ (submit), tiếp nhận (receive), thụ lý (process), xác minh (verify), cấp phép (grant a licence), gia hạn (extend).

Legal texts demand exact meaning: no idioms, no softening.`,
    vocabulary: [
      v("căn cước công dân", "thẻ chứng minh nhân thân", "citizen identity card", "Em xin cấp lại căn cước công dân.", "I apply to reissue my ID card.", "danh từ"),
      v("hộ khẩu", "sổ đăng ký hộ gia đình", "household registration", "Hộ khẩu ghi các thành viên trong nhà.", "The household book lists family members.", "danh từ"),
      v("công chứng", "chứng nhận giấy tờ là hợp pháp", "notarisation", "Bản dịch cần công chứng.", "The translation needs notarisation.", "danh từ"),
      v("bản sao y", "bản chép lại có xác nhận", "certified copy", "Nộp bản sao y giấy khai sinh.", "Submit a certified copy of the birth certificate.", "danh từ"),
      v("thụ lý", "nhận và bắt đầu xử lý hồ sơ", "to take up a case", "Cơ quan đã thụ lý đơn của anh.", "The office has taken up your application.", "động từ"),
      v("xác minh", "kiểm tra để biết đúng hay sai", "to verify", "Cán bộ xác minh thông tin cư trú.", "The officer verifies residence details.", "động từ"),
      v("cấp phép", "cho phép chính thức", "to grant a licence", "Sở đã cấp phép xây dựng.", "The department granted the building permit.", "động từ"),
      v("tạm trú", "ở tạm thời tại nơi khác", "temporary residence", "Em đăng ký tạm trú tại phường.", "I registered temporary residence at the ward.", "danh từ"),
      v("hiệu lực", "thời gian có giá trị pháp lý", "validity, legal effect", "Hợp đồng có hiệu lực từ ngày 1.", "The contract takes effect from the 1st.", "danh từ"),
      v("vi phạm", "làm trái quy định", "violation", "Hành vi này vi phạm hợp đồng.", "This act violates the contract.", "động từ"),
    ],
    quiz: [
      q("'Công chứng' để làm gì?", "What is 'công chứng' for?", ["Chứng nhận giấy tờ hợp pháp", "Nộp thuế", "Xin visa", "Đăng ký kết hôn"], 0, "Công chứng xác nhận tính hợp pháp của giấy tờ hoặc bản dịch.", "Notarisation certifies a document's legality."),
      q("'Thụ lý' nghĩa là gì?", "What does 'thụ lý' mean?", ["Nhận và bắt đầu xử lý hồ sơ", "Từ chối hồ sơ", "Trả lại hồ sơ", "Lưu trữ hồ sơ"], 0, "Cơ quan thụ lý là đã nhận và bắt đầu giải quyết.", "It means the office has accepted and begun processing."),
      q("'Hiệu lực' của hợp đồng chỉ điều gì?", "What does contract 'hiệu lực' refer to?", ["Thời gian hợp đồng có giá trị pháp lý", "Số tiền hợp đồng", "Người ký hợp đồng", "Số trang hợp đồng"], 0, "'Hiệu lực' là khoảng thời gian hợp đồng có giá trị ràng buộc.", "It is the period in which the contract legally binds."),
      q("Văn bản pháp lý nên tránh điều gì?", "What should legal texts avoid?", ["Thành ngữ và cách nói giảm", "Số liệu cụ thể", "Định nghĩa rõ ràng", "Mốc thời gian"], 0, "Pháp lý cần nghĩa chính xác nên tránh thành ngữ và nói giảm.", "Legal language needs precision, so avoid idioms and softening."),
      q("Giấy nào xác nhận việc ở tạm thời tại địa phương khác?", "Which paper confirms staying temporarily elsewhere?", ["Giấy tạm trú", "Hộ khẩu", "Giấy khai sinh", "Bản sao y"], 0, "Giấy tạm trú xác nhận chỗ ở tạm thời tại địa phương.", "It confirms temporary local residence."),
    ],
  },
  {
    id: "vn-v11-vocab-tech",
    title: "Từ vựng công nghệ và đời sống số",
    titleEn: "Technology and Digital Life Vocabulary",
    level: "intermediate",
    theory: `## Công nghệ và đời sống số

### 1. Thiết bị và tài khoản
máy tính, điện thoại thông minh, máy tính bảng, tài khoản, mật khẩu, đăng nhập, đăng xuất

### 2. Mạng và dữ liệu
đường truyền, wifi, dữ liệu, dung lượng, sao lưu, tải lên, tải xuống

### 3. An toàn số
bảo mật, xác thực hai lớp, lừa đảo trực tuyến, mã độc, quyền truy cập

### 4. Mẫu câu hữu ích
> Wifi nhà mình mật khẩu gì ạ?
> Em bật xác thực hai lớp cho tài khoản rồi.
> File này nặng quá, em gửi qua đường liên kết nhé.`,
    theoryEn: `## Technology and digital life

Devices and accounts: máy tính, điện thoại thông minh, tài khoản, mật khẩu, đăng nhập, đăng xuất.

Network and data: đường truyền, dữ liệu, dung lượng, sao lưu (back up), tải lên, tải xuống.

Digital safety: bảo mật, xác thực hai lớp (two-factor authentication), lừa đảo trực tuyến, mã độc, quyền truy cập.`,
    vocabulary: [
      v("đăng nhập", "vào tài khoản của mình", "to log in", "Em đăng nhập bằng email trường.", "I log in with my school email.", "động từ"),
      v("mật khẩu", "chuỗi ký tự bảo vệ tài khoản", "password", "Mật khẩu nên dài hơn tám ký tự.", "A password should exceed eight characters.", "danh từ"),
      v("sao lưu", "lưu bản dự phòng", "to back up", "Em sao lưu dữ liệu mỗi tuần.", "I back up my data weekly.", "động từ"),
      v("dung lượng", "kích thước dữ liệu", "storage size", "Dung lượng còn lại là 2GB.", "The remaining storage is 2GB.", "danh từ"),
      v("xác thực hai lớp", "xác minh qua hai bước", "two-factor authentication", "Bật xác thực hai lớp cho an toàn.", "Turn on two-factor authentication for safety.", "danh từ"),
      v("lừa đảo trực tuyến", "gian lận trên mạng", "online scam", "Cẩn thận với lừa đảo trực tuyến.", "Beware of online scams.", "danh từ"),
      v("đường liên kết", "địa chỉ dẫn tới nội dung", "link", "Em gửi đường liên kết tài liệu.", "I sent the document link.", "danh từ"),
      v("quyền truy cập", "được phép mở và dùng", "access rights", "Em cần quyền truy cập thư mục này.", "I need access to this folder.", "danh từ"),
      v("cập nhật", "nâng lên bản mới hơn", "to update", "Nhớ cập nhật phần mềm.", "Remember to update the software.", "động từ"),
      v("thiết bị", "máy móc dùng để làm việc", "device", "Tài khoản đăng nhập trên hai thiết bị.", "The account is logged in on two devices.", "danh từ"),
    ],
    quiz: [
      q("'Sao lưu' nghĩa là gì?", "What does 'sao lưu' mean?", ["Lưu bản dự phòng của dữ liệu", "Xóa dữ liệu", "Chia sẻ dữ liệu", "Nén dữ liệu"], 0, "Sao lưu là tạo bản dự phòng để khỏi mất dữ liệu.", "Backing up creates a spare copy to prevent data loss."),
      q("'Xác thực hai lớp' giúp gì?", "What does two-factor authentication do?", ["Tăng bảo mật cho tài khoản", "Tăng dung lượng", "Tăng tốc mạng", "Giảm giá dịch vụ"], 0, "Thêm một bước xác minh khiến kẻ khác khó chiếm tài khoản.", "An extra verification step makes account takeover much harder."),
      q("Từ nào chỉ kích thước dữ liệu?", "Which word means data size?", ["dung lượng", "đường truyền", "thiết bị", "quyền truy cập"], 0, "'Dung lượng' chỉ kích thước hoặc chỗ chứa dữ liệu.", "'Dung lượng' means data size or storage capacity."),
      q("Khi file quá lớn để gửi kèm, nên làm gì?", "What should you do when a file is too large to attach?", ["Gửi đường liên kết", "Xóa bớt tài khoản", "Đổi mật khẩu", "Tắt xác thực hai lớp"], 0, "Gửi đường liên kết tránh giới hạn kích thước tệp đính kèm.", "Sending a link avoids attachment size limits."),
      q("'Quyền truy cập' nói về điều gì?", "What is 'quyền truy cập' about?", ["Được phép mở và sử dụng dữ liệu", "Dung lượng lưu trữ", "Tốc độ mạng", "Loại thiết bị"], 0, "'Quyền truy cập' là phép mở và sử dụng tài nguyên.", "Access rights permit opening and using a resource."),
    ],
  },
  {
    id: "vn-v11-vocab-education",
    title: "Từ vựng trường học và thi cử",
    titleEn: "School and Examination Vocabulary",
    level: "beginner",
    theory: `## Trường học và thi cử

### 1. Hệ thống trường
mầm non, tiểu học, trung học cơ sở, trung học phổ thông, đại học, cao học

### 2. Học tập
học kỳ, tín chỉ, thời khóa biểu, điểm danh, bài kiểm tra, đồ án, học bổng

### 3. Thi cử
thi giữa kỳ, thi cuối kỳ, đề thi, phòng thi, bảng điểm, xét tuyển, tốt nghiệp

### 4. Mẫu câu
> Học kỳ này em học năm môn.
> Em đang chờ bảng điểm cuối kỳ.
> Trường xét tuyển bằng điểm thi tốt nghiệp.`,
    theoryEn: `## School and exams

Levels: mầm non (preschool), tiểu học (primary), trung học cơ sở (lower secondary), trung học phổ thông (upper secondary), đại học (university), cao học (master's).

Study words: học kỳ (semester), tín chỉ (credit), thời khóa biểu (timetable), điểm danh (roll call), đồ án (project), học bổng (scholarship).

Exam words: thi giữa kỳ, thi cuối kỳ, đề thi, phòng thi, bảng điểm, xét tuyển, tốt nghiệp.`,
    vocabulary: [
      v("học kỳ", "một giai đoạn học trong năm", "semester", "Học kỳ này em học năm môn.", "This semester I take five subjects.", "danh từ"),
      v("tín chỉ", "đơn vị tính khối lượng học", "credit", "Môn này có ba tín chỉ.", "This subject carries three credits.", "danh từ"),
      v("thời khóa biểu", "bảng giờ học", "timetable", "Thời khóa biểu dán ở cửa lớp.", "The timetable is posted at the classroom door.", "danh từ"),
      v("điểm danh", "kiểm tra ai có mặt", "roll call", "Cô giáo điểm danh đầu giờ.", "The teacher calls the roll at the start.", "động từ"),
      v("đề thi", "bộ câu hỏi kiểm tra", "exam paper", "Đề thi có bốn phần.", "The exam paper has four parts.", "danh từ"),
      v("bảng điểm", "giấy ghi điểm các môn", "transcript", "Em xin một bản bảng điểm.", "I request a copy of my transcript.", "danh từ"),
      v("xét tuyển", "chọn học sinh dựa trên tiêu chí", "admission by review", "Trường xét tuyển theo điểm học bạ.", "The school admits by school-report scores.", "động từ"),
      v("tốt nghiệp", "học xong và được cấp bằng", "to graduate", "Anh ấy tốt nghiệp năm 2025.", "He graduated in 2025.", "động từ"),
      v("học bổng", "khoản tiền hỗ trợ người học giỏi", "scholarship", "Em nhận học bổng toàn phần.", "I received a full scholarship.", "danh từ"),
      v("đồ án", "bài lớn cuối môn hoặc cuối khóa", "project, thesis project", "Em bảo vệ đồ án tháng sau.", "I defend my project next month.", "danh từ"),
    ],
    quiz: [
      q("'Tín chỉ' dùng để làm gì?", "What are 'tín chỉ' for?", ["Tính khối lượng học của môn", "Ghi điểm thi", "Đặt lịch học", "Xin học bổng"], 0, "Tín chỉ là đơn vị đo khối lượng học tập của môn học.", "Credits measure a subject's study load."),
      q("Giấy ghi điểm các môn gọi là gì?", "What is the document listing subject scores?", ["bảng điểm", "đề thi", "thời khóa biểu", "đồ án"], 0, "'Bảng điểm' liệt kê điểm của các môn đã học.", "'Bảng điểm' lists the scores of completed subjects."),
      q("'Xét tuyển' khác 'thi tuyển' ở điểm nào?", "How does 'xét tuyển' differ from an entrance exam?", ["Dựa trên hồ sơ và điểm có sẵn thay vì thi thêm", "Phải thi thêm hai môn", "Chỉ dành cho học sinh giỏi", "Chỉ dùng ở đại học"], 0, "Xét tuyển dùng điểm và hồ sơ hiện có, không cần kỳ thi riêng.", "Admission by review uses existing scores and records, not a new exam."),
      q("Cấp học nào ngay trước đại học?", "Which level comes just before university?", ["trung học phổ thông", "trung học cơ sở", "tiểu học", "cao học"], 0, "Trung học phổ thông là cấp học ngay trước đại học.", "Upper secondary comes directly before university."),
      q("'Đồ án' là loại bài gì?", "What kind of work is an 'đồ án'?", ["Bài lớn cuối môn hoặc cuối khóa", "Bài kiểm tra 15 phút", "Bài tập về nhà hằng ngày", "Bài thi giữa kỳ"], 0, "Đồ án là bài lớn, thường phải bảo vệ trước hội đồng.", "A project is a major piece, often defended before a panel."),
    ],
  },
  {
    id: "vn-v11-vocab-transport",
    title: "Từ vựng giao thông và di chuyển",
    titleEn: "Traffic and Getting Around Vocabulary",
    level: "beginner",
    theory: `## Giao thông và di chuyển

### 1. Phương tiện
xe máy, xe buýt, tàu hỏa, tàu điện, xe khách, xe công nghệ, phà

### 2. Trên đường
ngã tư, vòng xoay, đèn giao thông, làn đường, vạch kẻ đường, cầu vượt, tắc đường

### 3. Mua vé và hỏi đường
> Cho em một vé đi Đà Nẵng ạ.
> Xe buýt số 8 có qua chợ Bến Thành không ạ?
> Từ đây tới đó mất bao lâu ạ?

### 4. Lưu ý an toàn
Người điều khiển xe máy phải đội mũ bảo hiểm. Đi bộ nên dùng vạch kẻ đường và cầu vượt.`,
    theoryEn: `## Traffic and getting around

Vehicles: xe máy (motorbike), xe buýt, tàu hỏa (train), tàu điện (metro), xe khách (coach), xe công nghệ (ride-hailing), phà (ferry).

On the road: ngã tư (crossroads), vòng xoay (roundabout), đèn giao thông, làn đường, vạch kẻ đường (crossing), cầu vượt (overpass), tắc đường (traffic jam).

Safety: motorbike riders must wear a helmet; pedestrians should use crossings and overpasses.`,
    vocabulary: [
      v("xe công nghệ", "xe gọi qua ứng dụng", "ride-hailing vehicle", "Em gọi xe công nghệ cho nhanh.", "I book a ride-hailing car for speed.", "danh từ"),
      v("tắc đường", "xe đông không di chuyển được", "traffic jam", "Giờ cao điểm hay tắc đường.", "Rush hour often brings jams.", "danh từ"),
      v("ngã tư", "nơi hai đường cắt nhau", "crossroads", "Rẽ phải ở ngã tư thứ hai.", "Turn right at the second crossroads.", "danh từ"),
      v("vòng xoay", "chỗ giao thông chạy vòng", "roundabout", "Đi hết vòng xoay rồi rẽ trái.", "Go around the roundabout then turn left.", "danh từ"),
      v("vạch kẻ đường", "vạch cho người đi bộ qua", "pedestrian crossing", "Qua đường ở vạch kẻ đường.", "Cross at the pedestrian crossing.", "danh từ"),
      v("mũ bảo hiểm", "mũ bảo vệ khi đi xe máy", "helmet", "Đi xe máy phải đội mũ bảo hiểm.", "Riders must wear a helmet.", "danh từ"),
      v("bến xe", "nơi xe khách đón trả khách", "bus station", "Bến xe cách đây hai cây số.", "The bus station is two kilometres away.", "danh từ"),
      v("giờ cao điểm", "giờ đông người đi lại", "rush hour", "Tránh đi vào giờ cao điểm.", "Avoid travelling in rush hour.", "danh từ"),
      v("vé khứ hồi", "vé đi và về", "return ticket", "Em mua vé khứ hồi rẻ hơn.", "A return ticket is cheaper for me.", "danh từ"),
      v("trạm dừng", "chỗ xe dừng nghỉ", "stop, rest stop", "Xe nghỉ mười phút tại trạm dừng.", "The coach stops ten minutes at the rest stop.", "danh từ"),
    ],
    quiz: [
      q("'Vé khứ hồi' là loại vé gì?", "What is a 'vé khứ hồi'?", ["Vé cả đi và về", "Vé chỉ một chiều", "Vé tháng", "Vé trẻ em"], 0, "Khứ hồi gồm cả chặng đi và chặng về.", "A return ticket covers both directions."),
      q("Người đi bộ nên qua đường ở đâu?", "Where should pedestrians cross?", ["Vạch kẻ đường hoặc cầu vượt", "Giữa vòng xoay", "Trên làn xe máy", "Ở bến xe"], 0, "Vạch kẻ đường và cầu vượt là nơi qua đường an toàn.", "Crossings and overpasses are the safe places to cross."),
      q("'Giờ cao điểm' nghĩa là gì?", "What does 'giờ cao điểm' mean?", ["Giờ đông người đi lại", "Giờ nghỉ trưa", "Giờ đêm muộn", "Giờ mở cửa hàng"], 0, "Giờ cao điểm là lúc lượng xe và người đi lại nhiều nhất.", "Rush hour is when traffic peaks."),
      q("'Xe công nghệ' được gọi bằng cách nào?", "How do you book a 'xe công nghệ'?", ["Qua ứng dụng trên điện thoại", "Ra bến xe mua vé", "Gọi điện cho bến tàu", "Đón ở trạm dừng"], 0, "Xe công nghệ được gọi qua ứng dụng trên điện thoại.", "Ride-hailing vehicles are booked through a phone app."),
      q("Khi đi xe máy, quy định bắt buộc là gì?", "What is mandatory when riding a motorbike?", ["Đội mũ bảo hiểm", "Mang vé khứ hồi", "Đi vào giờ cao điểm", "Dừng ở vòng xoay"], 0, "Pháp luật yêu cầu người đi xe máy đội mũ bảo hiểm.", "The law requires motorbike riders to wear helmets."),
    ],
  },
  {
    id: "vn-v11-vocab-environment",
    title: "Từ vựng môi trường và phát triển bền vững",
    titleEn: "Environment and Sustainability Vocabulary",
    level: "advanced",
    theory: `## Môi trường và phát triển bền vững

### 1. Vấn đề
ô nhiễm, rác thải nhựa, khí thải, biến đổi khí hậu, xâm nhập mặn, sạt lở

### 2. Giải pháp
phân loại rác, tái chế, năng lượng tái tạo, tiết kiệm điện, trồng rừng, giảm phát thải

### 3. Mẫu câu thảo luận
> Rác thải nhựa đang là vấn đề lớn ở các thành phố.
> Muốn giảm phát thải, cần chuyển sang năng lượng tái tạo.
> Đồng bằng sông Cửu Long chịu ảnh hưởng của xâm nhập mặn.

### 4. Lưu ý
Đây là chủ đề thi nói và viết rất phổ biến, nên học kèm số liệu và ví dụ địa phương.`,
    theoryEn: `## Environment and sustainability

Problems: ô nhiễm (pollution), rác thải nhựa (plastic waste), khí thải (emissions), biến đổi khí hậu (climate change), xâm nhập mặn (saline intrusion), sạt lở (landslide or erosion).

Solutions: phân loại rác (waste sorting), tái chế (recycling), năng lượng tái tạo (renewable energy), tiết kiệm điện, trồng rừng, giảm phát thải.

This topic appears constantly in speaking and writing tests, so learn it with figures and local examples.`,
    vocabulary: [
      v("ô nhiễm", "bị làm bẩn, độc hại", "pollution", "Ô nhiễm không khí tăng vào mùa khô.", "Air pollution rises in the dry season.", "danh từ"),
      v("rác thải nhựa", "rác từ đồ nhựa", "plastic waste", "Rác thải nhựa khó phân hủy.", "Plastic waste decomposes slowly.", "danh từ"),
      v("phân loại rác", "chia rác theo loại", "waste sorting", "Nhiều khu phố đã phân loại rác.", "Many neighbourhoods now sort waste.", "động từ"),
      v("tái chế", "làm lại thành sản phẩm mới", "to recycle", "Giấy và nhựa có thể tái chế.", "Paper and plastic can be recycled.", "động từ"),
      v("năng lượng tái tạo", "năng lượng từ nguồn không cạn", "renewable energy", "Điện gió là năng lượng tái tạo.", "Wind power is renewable energy.", "danh từ"),
      v("biến đổi khí hậu", "khí hậu thay đổi bất thường", "climate change", "Biến đổi khí hậu gây mưa bão thất thường.", "Climate change brings erratic storms.", "danh từ"),
      v("xâm nhập mặn", "nước biển tràn vào đất liền", "saline intrusion", "Xâm nhập mặn ảnh hưởng tới lúa.", "Saline intrusion harms rice crops.", "danh từ"),
      v("phát thải", "thải khí ra môi trường", "emission", "Nhà máy phải giảm phát thải.", "Factories must cut emissions.", "danh từ"),
      v("bền vững", "giữ được lâu dài, không cạn kiệt", "sustainable", "Du lịch bền vững bảo vệ di sản.", "Sustainable tourism protects heritage.", "tính từ"),
      v("trồng rừng", "gây lại rừng", "to plant forests", "Địa phương trồng rừng ngập mặn.", "The locality plants mangrove forests.", "động từ"),
    ],
    quiz: [
      q("'Xâm nhập mặn' là hiện tượng gì?", "What is 'xâm nhập mặn'?", ["Nước biển tràn vào vùng đất liền", "Rừng bị chặt", "Không khí bị bẩn", "Rác nhựa tăng"], 0, "Nước biển xâm nhập vào đất và nguồn nước ngọt trong đất liền.", "Seawater pushes into inland soil and freshwater sources."),
      q("Nguồn nào là năng lượng tái tạo?", "Which is renewable energy?", ["Điện gió", "Than đá", "Dầu mỏ", "Khí hóa lỏng"], 0, "Điện gió lấy từ nguồn không cạn kiệt nên là năng lượng tái tạo.", "Wind power comes from an inexhaustible source."),
      q("'Bền vững' nghĩa là gì?", "What does 'bền vững' mean?", ["Duy trì được lâu dài, không làm cạn kiệt", "Rẻ nhất", "Nhanh nhất", "Mới nhất"], 0, "Bền vững là phát triển mà vẫn giữ được nguồn lực cho tương lai.", "Sustainable means developing while preserving resources."),
      q("Bước đầu tiên để tái chế hiệu quả là gì?", "What is the first step to effective recycling?", ["Phân loại rác tại nguồn", "Đốt rác", "Chôn rác", "Xuất khẩu rác"], 0, "Phân loại rác tại nguồn giúp vật liệu tái chế không bị lẫn.", "Sorting at source keeps recyclable materials clean."),
      q("Vùng nào ở Việt Nam chịu xâm nhập mặn nặng nhất?", "Which Vietnamese region suffers the most saline intrusion?", ["Đồng bằng sông Cửu Long", "Tây Bắc", "Tây Nguyên", "Đông Bắc"], 0, "Đồng bằng sông Cửu Long là vùng thấp ven biển nên bị ảnh hưởng nặng.", "The Mekong Delta is low-lying and coastal, so it is hit hardest."),
    ],
  },
  {
    id: "vn-v11-vocab-startup",
    title: "Từ vựng khởi nghiệp và kinh doanh",
    titleEn: "Startup and Business Vocabulary",
    level: "advanced",
    theory: `## Khởi nghiệp và kinh doanh

### 1. Mô hình và sản phẩm
mô hình kinh doanh, sản phẩm mẫu, khách hàng mục tiêu, thị trường ngách, lợi thế cạnh tranh

### 2. Tiền và vốn
vốn đầu tư, nhà đầu tư, gọi vốn, doanh thu, chi phí, lợi nhuận, điểm hòa vốn

### 3. Mẫu câu thuyết trình
> Khách hàng mục tiêu của chúng tôi là sinh viên năm cuối.
> Doanh thu quý ba tăng 18% so với quý hai.
> Chúng tôi dự kiến đạt điểm hòa vốn sau mười tháng.

### 4. Lưu ý
Khi thuyết trình, số liệu phải kèm mốc thời gian và cơ sở so sánh.`,
    theoryEn: `## Startups and business

Model and product: mô hình kinh doanh, sản phẩm mẫu (prototype), khách hàng mục tiêu, thị trường ngách (niche), lợi thế cạnh tranh.

Money: vốn đầu tư, nhà đầu tư, gọi vốn (fundraising), doanh thu (revenue), chi phí, lợi nhuận, điểm hòa vốn (break-even point).

When pitching, every figure needs a time frame and a comparison base.`,
    vocabulary: [
      v("mô hình kinh doanh", "cách doanh nghiệp tạo doanh thu", "business model", "Mô hình kinh doanh dựa trên thuê bao.", "The business model relies on subscriptions.", "danh từ"),
      v("gọi vốn", "kêu gọi đầu tư", "to raise capital", "Công ty gọi vốn vòng đầu.", "The company is raising a first round.", "động từ"),
      v("doanh thu", "tổng tiền bán được", "revenue", "Doanh thu tháng này đạt 400 triệu.", "This month's revenue reached 400 million.", "danh từ"),
      v("lợi nhuận", "tiền còn lại sau khi trừ chi phí", "profit", "Lợi nhuận ròng tăng nhẹ.", "Net profit rose slightly.", "danh từ"),
      v("điểm hòa vốn", "lúc doanh thu bằng chi phí", "break-even point", "Dự án đạt điểm hòa vốn sau một năm.", "The project breaks even after a year.", "danh từ"),
      v("thị trường ngách", "phân khúc nhỏ chuyên biệt", "niche market", "Chúng tôi chọn thị trường ngách.", "We target a niche market.", "danh từ"),
      v("khách hàng mục tiêu", "nhóm khách chính muốn phục vụ", "target customer", "Khách hàng mục tiêu là giáo viên.", "Our target customers are teachers.", "danh từ"),
      v("lợi thế cạnh tranh", "điểm mạnh hơn đối thủ", "competitive advantage", "Lợi thế cạnh tranh là dữ liệu riêng.", "Our advantage is proprietary data.", "danh từ"),
      v("sản phẩm mẫu", "bản thử đầu tiên", "prototype", "Sản phẩm mẫu đã chạy thử.", "The prototype has been tested.", "danh từ"),
      v("nhà đầu tư", "người bỏ vốn", "investor", "Nhà đầu tư hỏi về chi phí vận hành.", "The investor asked about operating costs.", "danh từ"),
    ],
    quiz: [
      q("'Điểm hòa vốn' là lúc nào?", "When is the break-even point?", ["Khi doanh thu bằng tổng chi phí", "Khi có nhà đầu tư", "Khi ra sản phẩm mẫu", "Khi doanh thu cao nhất"], 0, "Hòa vốn là lúc doanh thu vừa bù đủ chi phí.", "Break-even is when revenue exactly covers cost."),
      q("'Thị trường ngách' nghĩa là gì?", "What is a 'thị trường ngách'?", ["Phân khúc nhỏ và chuyên biệt", "Thị trường lớn nhất", "Thị trường nước ngoài", "Thị trường bán lẻ"], 0, "Ngách là phân khúc nhỏ với nhu cầu rất riêng.", "A niche is a small segment with very specific needs."),
      q("Lợi nhuận khác doanh thu ở điểm nào?", "How does profit differ from revenue?", ["Lợi nhuận là phần còn lại sau khi trừ chi phí", "Lợi nhuận luôn lớn hơn doanh thu", "Hai từ đồng nghĩa", "Lợi nhuận chỉ tính theo năm"], 0, "Doanh thu là tổng tiền thu, lợi nhuận là phần còn lại sau chi phí.", "Revenue is total income; profit is what remains after costs."),
      q("Khi trình bày số liệu, cần kèm gì?", "What must accompany a figure in a pitch?", ["Mốc thời gian và cơ sở so sánh", "Một thành ngữ", "Tên nhà đầu tư", "Logo công ty"], 0, "Số liệu không có mốc thời gian và cơ sở so sánh thì vô nghĩa.", "A figure without a time frame and comparison base is meaningless."),
      q("'Sản phẩm mẫu' dùng để làm gì?", "What is a prototype for?", ["Thử nghiệm ý tưởng trước khi làm thật", "Bán đại trà", "Nộp cho cơ quan thuế", "Thay hợp đồng"], 0, "Sản phẩm mẫu để kiểm chứng ý tưởng và thu phản hồi.", "A prototype validates the idea and gathers feedback."),
    ],
  },
  {
    id: "vn-v11-vocab-emotion",
    title: "Từ vựng cảm xúc và sức khỏe tinh thần",
    titleEn: "Emotions and Mental Wellbeing Vocabulary",
    level: "intermediate",
    theory: `## Cảm xúc và sức khỏe tinh thần

### 1. Thang cảm xúc
vui - hài lòng - bình thường - lo lắng - căng thẳng - kiệt sức

### 2. Nói về cảm xúc của mình
> Dạo này em thấy **căng thẳng** vì deadline.
> Em cần **nghỉ ngơi** vài ngày để **lấy lại tinh thần**.
> Em **biết ơn** vì được mọi người giúp đỡ.

### 3. Lắng nghe người khác
> Anh hiểu cảm giác đó.
> Em muốn kể thêm không?
> Có cần anh giúp gì cụ thể không?

### 4. Lưu ý
Nếu ai nói về ý định tự gây hại, hãy khuyên gặp chuyên gia hoặc gọi đường dây hỗ trợ ngay, không tự xử lý một mình.`,
    theoryEn: `## Emotions and mental wellbeing

Emotion scale: vui (happy), hài lòng (content), bình thường (okay), lo lắng (anxious), căng thẳng (stressed), kiệt sức (burnt out).

Talking about yourself: Dạo này em thấy căng thẳng; Em cần nghỉ ngơi để lấy lại tinh thần; Em biết ơn vì được giúp đỡ.

Listening phrases: Anh hiểu cảm giác đó; Em muốn kể thêm không; Có cần anh giúp gì cụ thể không.

If someone mentions self-harm, direct them to a professional or a support line immediately.`,
    vocabulary: [
      v("căng thẳng", "áp lực làm khó chịu", "stressed", "Em căng thẳng vì kỳ thi.", "I feel stressed about the exam.", "tính từ"),
      v("lo lắng", "sợ điều xấu có thể xảy ra", "anxious", "Mẹ lo lắng cho sức khỏe của bà.", "Mum is anxious about grandma's health.", "tính từ"),
      v("kiệt sức", "hết hẳn năng lượng", "exhausted, burnt out", "Làm ba tháng liền khiến anh kiệt sức.", "Three straight months left him burnt out.", "tính từ"),
      v("bình tĩnh", "giữ được sự điềm tĩnh", "calm", "Anh cố giữ bình tĩnh.", "He tried to stay calm.", "tính từ"),
      v("lấy lại tinh thần", "hồi phục tâm trạng", "to recover one's spirits", "Đi biển giúp em lấy lại tinh thần.", "The beach helped me recover my spirits.", "cụm động từ"),
      v("biết ơn", "cảm thấy mang ơn", "grateful", "Em biết ơn sự giúp đỡ của thầy.", "I am grateful for your help, sir.", "tính từ"),
      v("đồng cảm", "hiểu và chia sẻ cảm xúc", "to empathise", "Bạn ấy rất đồng cảm với người khác.", "She empathises deeply with others.", "động từ"),
      v("chia sẻ", "nói ra để nhẹ lòng", "to share", "Em chia sẻ với anh chuyện này.", "I am sharing this with you.", "động từ"),
      v("hỗ trợ tâm lý", "giúp đỡ về mặt tinh thần", "psychological support", "Trường có phòng hỗ trợ tâm lý.", "The school has a psychological support room.", "danh từ"),
      v("cân bằng", "giữ mức hợp lý giữa các việc", "balance", "Em cần cân bằng học và nghỉ.", "I need to balance study and rest.", "danh từ"),
    ],
    quiz: [
      q("'Kiệt sức' mô tả trạng thái nào?", "What state does 'kiệt sức' describe?", ["Hết hẳn năng lượng sau thời gian dài quá tải", "Vui vẻ phấn khởi", "Hơi buồn ngủ", "Bình tĩnh thư thái"], 0, "Kiệt sức là cạn năng lượng do quá tải kéo dài.", "It is depletion after prolonged overload."),
      q("Câu nào thể hiện lắng nghe tốt?", "Which sentence shows good listening?", ["Em muốn kể thêm không?", "Chuyện đó nhỏ mà.", "Ai cũng thế thôi.", "Đừng nghĩ nữa."], 0, "Câu hỏi mở mời người kia chia sẻ tiếp mà không phán xét.", "An open question invites more sharing without judgement."),
      q("'Đồng cảm' nghĩa là gì?", "What does 'đồng cảm' mean?", ["Hiểu và chia sẻ cảm xúc của người khác", "Đồng ý mọi điều", "Cùng làm việc", "Cho tiền giúp đỡ"], 0, "Đồng cảm là hiểu và cùng cảm nhận với người khác.", "Empathy is understanding and feeling with someone."),
      q("Nếu ai nói về ý định tự gây hại, nên làm gì?", "If someone mentions self-harm, what should you do?", ["Khuyên gặp chuyên gia hoặc gọi đường dây hỗ trợ ngay", "Bỏ qua cho đỡ nặng nề", "Khuyên tự vượt qua một mình", "Kể cho nhiều người biết"], 0, "Đây là tình huống cần chuyên gia, không nên tự xử lý một mình.", "This needs professional help, not a solo response."),
      q("'Cân bằng' trong học tập nghĩa là gì?", "What does 'cân bằng' mean in study?", ["Giữ mức hợp lý giữa học và nghỉ", "Học nhiều hơn nghỉ", "Nghỉ nhiều hơn học", "Chỉ học vào cuối tuần"], 0, "Cân bằng là phân bổ hợp lý giữa học tập và nghỉ ngơi.", "Balance means a sensible split between study and rest."),
    ],
  },
];

const specializedModule = vocabularyModules.find((mod) => mod.id === "vn-vocab-specialized");
if (specializedModule) specializedModule.lessons.push(...lessons);
