/**
 * @file toeicVocabExpansion5.ts
 * @description TOEIC Vocabulary Expansion #5 - finance, manufacturing,
 * customer service, IT, contracts and corporate communication.
 */
import type { ToeicWord } from "./toeicVocabTypes";

const w = (
  word: string, wordClass: string, ipa: string, level: ToeicWord["level"],
  vi: string, en: string, example: string,
  synonyms: string[], collocations: string[], category: string,
): ToeicWord => ({
  word, wordClass, ipa, level, definition: { en, vi },
  example, synonyms, collocations, category,
});

export const toeicVocabExpansion5: ToeicWord[] = [
  // Finance & Accounting
  w("invoice", "n", "/ˈɪn.vɔɪs/", "basic", "Hóa đơn", "A bill for goods or services", "Please send the invoice to accounts payable.", ["bill"], ["issue an invoice"], "Finance & Accounting"),
  w("reimburse", "v", "/ˌriː.ɪmˈbɜːs/", "intermediate", "Hoàn trả", "To pay back money spent", "Travel expenses are reimbursed within two weeks.", ["repay", "refund"], ["reimburse expenses"], "Finance & Accounting"),
  w("audit", "n", "/ˈɔː.dɪt/", "intermediate", "Kiểm toán", "Official examination of accounts", "The annual audit revealed no irregularities.", ["review"], ["external audit"], "Finance & Accounting"),
  w("liability", "n", "/ˌlaɪ.əˈbɪl.ə.ti/", "advanced", "Khoản nợ phải trả", "A financial obligation", "The company reduced its long-term liabilities.", ["debt"], ["financial liability"], "Finance & Accounting"),
  w("asset", "n", "/ˈæs.et/", "basic", "Tài sản", "Anything of monetary value owned", "Real estate remains the firm's largest asset.", ["holding"], ["fixed asset"], "Finance & Accounting"),
  w("depreciation", "n", "/dɪˌpriː.ʃiˈeɪ.ʃən/", "advanced", "Khấu hao", "Decrease in value over time", "Depreciation is calculated on a straight-line basis.", [], ["asset depreciation"], "Finance & Accounting"),

  // Manufacturing & Operations
  w("assembly line", "n", "/əˈsem.bli laɪn/", "intermediate", "Dây chuyền lắp ráp", "Sequential production process", "The new robot improved assembly line efficiency.", [], ["assembly-line worker"], "Manufacturing & Operations"),
  w("inventory", "n", "/ˈɪn.vən.tər.i/", "intermediate", "Hàng tồn kho", "Goods held in stock", "Inventory must be counted at the end of each quarter.", ["stock"], ["take inventory", "manage inventory"], "Manufacturing & Operations"),
  w("warehouse", "n", "/ˈweə.haʊs/", "basic", "Nhà kho", "Building for storing goods", "Goods are shipped directly from the warehouse.", ["storehouse"], ["warehouse manager"], "Manufacturing & Operations"),
  w("downtime", "n", "/ˈdaʊn.taɪm/", "intermediate", "Thời gian ngừng hoạt động", "Period when equipment is unavailable", "Preventive maintenance minimises downtime.", [], ["machine downtime"], "Manufacturing & Operations"),
  w("output", "n", "/ˈaʊt.pʊt/", "basic", "Sản lượng", "Amount produced", "Quarterly output reached a new record.", ["production"], ["increase output"], "Manufacturing & Operations"),
  w("quality control", "n", "/ˈkwɒl.ə.ti kənˈtrəʊl/", "intermediate", "Kiểm soát chất lượng", "Process to ensure product quality", "Strict quality control reduced defects by 40%.", [], ["quality-control team"], "Manufacturing & Operations"),

  // Customer Service
  w("inquiry", "n", "/ɪnˈkwaɪə.ri/", "basic", "Yêu cầu thông tin", "Request for information", "Please direct all inquiries to the front desk.", ["query"], ["handle an inquiry"], "Customer Service"),
  w("complaint", "n", "/kəmˈpleɪnt/", "basic", "Khiếu nại", "Statement that something is wrong", "We aim to respond to every complaint within 24 hours.", ["grievance"], ["file a complaint"], "Customer Service"),
  w("refund", "n", "/ˈriː.fʌnd/", "basic", "Tiền hoàn lại", "Money returned to a customer", "Customers can request a full refund within 30 days.", ["repayment"], ["issue a refund"], "Customer Service"),
  w("satisfaction", "n", "/ˌsæt.ɪsˈfæk.ʃən/", "basic", "Sự hài lòng", "Feeling of fulfilment", "Customer satisfaction scores rose this quarter.", ["contentment"], ["customer satisfaction"], "Customer Service"),
  w("loyalty programme", "n", "/ˈlɔɪ.əl.ti ˈprəʊ.ɡræm/", "intermediate", "Chương trình khách hàng thân thiết", "Reward scheme for repeat customers", "Our loyalty programme has over a million members.", [], ["loyalty rewards"], "Customer Service"),

  // IT & Technology
  w("server", "n", "/ˈsɜː.vər/", "basic", "Máy chủ", "Computer that hosts services", "The server will be offline for maintenance tonight.", [], ["server downtime"], "Information Technology"),
  w("backup", "n", "/ˈbæk.ʌp/", "basic", "Sao lưu", "Copy of data for safety", "Daily backups protect against data loss.", [], ["create a backup"], "Information Technology"),
  w("bandwidth", "n", "/ˈbænd.wɪdθ/", "intermediate", "Băng thông", "Data transfer capacity", "Higher bandwidth supports remote video calls.", [], ["limited bandwidth"], "Information Technology"),
  w("integration", "n", "/ˌɪn.tɪˈɡreɪ.ʃən/", "intermediate", "Tích hợp", "Combining systems to work together", "API integration speeds up the workflow.", [], ["system integration"], "Information Technology"),
  w("rollout", "n", "/ˈrəʊl.aʊt/", "intermediate", "Triển khai", "The launch of a new product", "The software rollout is scheduled for May.", ["launch"], ["phased rollout"], "Information Technology"),

  // Contracts & Legal
  w("clause", "n", "/klɔːz/", "intermediate", "Điều khoản", "Section of a contract", "Pay attention to the confidentiality clause.", ["provision"], ["contract clause"], "Contracts & Legal"),
  w("amendment", "n", "/əˈmend.mənt/", "intermediate", "Sửa đổi", "Change to a document", "Both parties signed the amendment.", ["change"], ["contract amendment"], "Contracts & Legal"),
  w("compliance", "n", "/kəmˈplaɪ.əns/", "intermediate", "Tuân thủ", "Conformity with rules", "Compliance training is mandatory for all staff.", ["adherence"], ["regulatory compliance"], "Contracts & Legal"),
  w("breach", "n", "/briːtʃ/", "advanced", "Vi phạm", "Failure to follow rules or a contract", "A data breach was reported to authorities immediately.", ["violation"], ["breach of contract"], "Contracts & Legal"),

  // HR & Personnel
  w("onboarding", "n", "/ˈɒnˌbɔː.dɪŋ/", "intermediate", "Hội nhập nhân viên mới", "Process of integrating new hires", "A strong onboarding programme reduces turnover.", [], ["onboarding process"], "Personnel & Human Resources"),
  w("retention", "n", "/rɪˈten.ʃən/", "intermediate", "Giữ chân nhân viên", "Ability to keep employees", "Flexible hours improved staff retention.", [], ["employee retention"], "Personnel & Human Resources"),
  w("performance review", "n", "/pəˈfɔː.məns rɪˈvjuː/", "intermediate", "Đánh giá hiệu suất", "Periodic employee evaluation", "Annual performance reviews include peer feedback.", ["appraisal"], ["conduct a review"], "Personnel & Human Resources"),
  w("severance", "n", "/ˈsev.ər.əns/", "advanced", "Trợ cấp thôi việc", "Pay given on dismissal", "The severance package included three months' salary.", [], ["severance pay"], "Personnel & Human Resources"),
];
