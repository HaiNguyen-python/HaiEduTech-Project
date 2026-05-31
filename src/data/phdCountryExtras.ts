/**
 * @file phdCountryExtras.ts
 * @description Optional "Cost & Culture" panel data, keyed by PhdCountryGuide.id.
 *   Kept separate from phdCountryGuides.ts to avoid bloating the main file.
 *   Cost figures are approximate 2024 USD/month and intended as orientation only.
 */

export interface CostOfLiving {
  rentUsd: number;       // mid-range single room in a major city
  foodUsd: number;
  transportUsd: number;
  totalUsd: number;      // not just rent+food+transport, includes misc
}

export interface CountryExtras {
  costOfLiving: CostOfLiving;
  cultureNotesVi: string[];
  cultureNotesEn: string[];
}

export const PHD_COUNTRY_EXTRAS: Record<string, CountryExtras> = {
  europe: {
    costOfLiving: { rentUsd: 700, foodUsd: 320, transportUsd: 70, totalUsd: 1450 },
    cultureNotesVi: [
      "Work-life balance rõ ràng: hết 5h chiều là tắt máy, weekend là của gia đình.",
      "PhD = đồng nghiệp có lương, không phải 'sinh viên'. Xưng hô first-name với supervisor.",
      "Mùa đông thiếu nắng tháng 11–2; cần bổ sung vitamin D và đèn SAD.",
      "Tiếng Anh phổ biến trong môi trường nghiên cứu, nhưng học tiếng bản địa cơ bản giúp hoà nhập.",
    ],
    cultureNotesEn: [
      "Clear work-life balance: lights off at 5pm, weekends for family.",
      "PhD = salaried colleague, not 'student'. First-name basis with supervisors.",
      "Dark winter Nov–Feb; supplement vitamin D and consider a SAD lamp.",
      "English dominates research; basic local language still helps integration.",
    ],
  },
  us: {
    costOfLiving: { rentUsd: 1200, foodUsd: 450, transportUsd: 120, totalUsd: 2350 },
    cultureNotesVi: [
      "Văn hoá networking mạnh: 'office hours', conference, happy hour rất quan trọng.",
      "Stipend đủ sống ở thành phố trung bình, eo hẹp ở Bay Area / Boston / NYC.",
      "Healthcare phụ thuộc bảo hiểm trường - đọc kỹ trước khi đi khám.",
      "Đa văn hoá nhưng vẫn có cú sốc khi sống ở vùng rural / Trung Tây.",
    ],
    cultureNotesEn: [
      "Heavy networking culture: office hours, conferences, happy hours all matter.",
      "Stipend is fine in mid-tier cities, tight in Bay Area / Boston / NYC.",
      "Healthcare depends on university insurance - read coverage carefully.",
      "Diverse, but rural / Midwest placements can still bring culture shock.",
    ],
  },
  uk: {
    costOfLiving: { rentUsd: 950, foodUsd: 380, transportUsd: 110, totalUsd: 1900 },
    cultureNotesVi: [
      "Trọng 'giờ giấc Anh': họp đúng giờ, email lịch sự, không gọi điện đột xuất.",
      "Sinh hoạt phí London cao gấp 1.4× thành phố khác - cân nhắc Manchester/Edinburgh.",
      "Mưa quanh năm, mang áo mưa hơn ô.",
      "PhD chỉ 3–4 năm, áp lực ra paper sớm hơn US.",
    ],
    cultureNotesEn: [
      "Punctuality matters: be on time, polite email, avoid surprise phone calls.",
      "London costs 1.4× other UK cities - consider Manchester / Edinburgh.",
      "Year-round rain; rain jacket beats umbrella.",
      "PhD is only 3–4 years; publication pressure starts earlier than in the US.",
    ],
  },
  australia: {
    costOfLiving: { rentUsd: 1050, foodUsd: 400, transportUsd: 130, totalUsd: 2050 },
    cultureNotesVi: [
      "Văn hoá thân thiện, gọi nhau tên cộc lốc kể cả với GS.",
      "Khí hậu dễ chịu nhưng UV rất cao - luôn dùng kem chống nắng.",
      "Sydney/Melbourne đắt; Brisbane/Adelaide tiết kiệm 20–30%.",
      "PhD thường 3.5 năm, có thể gia hạn 6 tháng có lương.",
    ],
    cultureNotesEn: [
      "Casual culture; first names with everyone including professors.",
      "Pleasant weather but UV is intense - sunscreen daily.",
      "Sydney/Melbourne are expensive; Brisbane/Adelaide save 20–30%.",
      "PhD usually 3.5 years with a paid 6-month extension option.",
    ],
  },
  japan: {
    costOfLiving: { rentUsd: 550, foodUsd: 320, transportUsd: 90, totalUsd: 1250 },
    cultureNotesVi: [
      "Hierarchy rất mạnh (sensei / senpai / kohai) - học cách chào hỏi từ ngày đầu.",
      "Lab kiểu 'gia đình thứ hai', có thể ở lại tới khuya.",
      "Học tiếng Nhật cơ bản giúp đời sống tăng chất lượng rõ rệt.",
      "Tokyo đắt hơn các thành phố khác 30%; Sendai/Fukuoka rất hợp lý.",
    ],
    cultureNotesEn: [
      "Strong hierarchy (sensei / senpai / kohai) - master greetings on day one.",
      "Lab is a 'second family', late evenings are common.",
      "Basic Japanese transforms day-to-day quality of life.",
      "Tokyo costs 30% more than other cities; Sendai/Fukuoka are very reasonable.",
    ],
  },
  korea: {
    costOfLiving: { rentUsd: 600, foodUsd: 300, transportUsd: 70, totalUsd: 1200 },
    cultureNotesVi: [
      "Work hours dài, đặc biệt trong lab top - biết nói 'không' lịch sự là kỹ năng sống.",
      "TOPIK càng cao càng dễ kết bạn ngoài lab.",
      "Y tế xuất sắc và rẻ khi có bảo hiểm sinh viên.",
      "Seoul và Daejeon (KAIST) là 2 hub PhD chính.",
    ],
    cultureNotesEn: [
      "Long work hours in top labs - politely declining is a survival skill.",
      "Higher TOPIK = much easier social life outside the lab.",
      "Healthcare is excellent and cheap with student insurance.",
      "Seoul and Daejeon (KAIST) are the two main PhD hubs.",
    ],
  },
  finland: {
    costOfLiving: { rentUsd: 680, foodUsd: 320, transportUsd: 60, totalUsd: 1380 },
    cultureNotesVi: [
      "Im lặng = lịch sự, không cần lấp khoảng lặng trong hội thoại.",
      "Tiếng Anh rất tốt; tiếng Phần cần để hoà nhập sâu, không bắt buộc cho công việc nghiên cứu.",
      "Sauna là một phần văn hoá xã hội - đi sauna với lab là chuyện bình thường.",
      "Mùa đông −20°C kéo dài 3–4 tháng, cần đầu tư quần áo và đèn vitamin D.",
    ],
    cultureNotesEn: [
      "Silence = politeness; no need to fill conversational gaps.",
      "English is excellent; Finnish helps integration but isn't required for research.",
      "Sauna is a social institution - lab sauna outings are normal.",
      "Winters hit −20°C for 3–4 months; invest in proper clothing and a SAD lamp.",
    ],
  },
  singapore: {
    costOfLiving: { rentUsd: 950, foodUsd: 350, transportUsd: 80, totalUsd: 1700 },
    cultureNotesVi: [
      "Multicultural, an toàn, giao thông công cộng top thế giới.",
      "Cường độ làm việc cao, kỳ vọng output sớm - quản lý sức khoẻ tinh thần kỹ.",
      "Thuê nhà cực đắt; cân nhắc HDB / shared housing để tiết kiệm.",
      "Tiếng Anh là ngôn ngữ chính, không cần học thêm ngôn ngữ.",
    ],
    cultureNotesEn: [
      "Multicultural, safe, world-class public transport.",
      "High-intensity work, early output expected - guard your mental health.",
      "Rent is brutally expensive; HDB / shared housing saves a lot.",
      "English is the working language; no extra language needed.",
    ],
  },
};
