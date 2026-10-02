import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  recipientName?: string; noticeCode?: string; courseNameVi?: string; courseNameEn?: string;
  classType?: string; level?: string; duration?: string; dates?: string; schedule?: string;
  objective?: string; modules?: string[]; benefits?: string[]; baseTuition?: string;
  discount?: string; finalTuition?: string; extraFee?: string; totalDue?: string; paymentReference?: string; paymentDetails?: string;
  instructorName?: string; instructorCredentials?: string; instructorExpertise?: string;
  instructorContact?: string; note?: string;
}
const CourseNoticeEmail = (p: Props) => (
  <Html lang="vi" dir="ltr"><Head /><Preview>{`Giấy báo khóa học ${p.courseNameVi || ''} - HaiEduTech`}</Preview>
    <Body style={main}><Container style={container}>
      <Section style={header}><Text style={brand}>TRUNG TÂM NGOẠI NGỮ & TIN HỌC HAIEDUTECH</Text><Heading style={h1}>GIẤY BÁO CHƯƠNG TRÌNH & KHÓA HỌC</Heading><Text style={subtitle}>PROGRAMME & COURSE ANNOUNCEMENT · {p.noticeCode}</Text></Section>
      <Section style={content}>
        <Text style={text}>Kính gửi / Dear <strong>{p.recipientName || 'Học viên'}</strong>,</Text>
        <Text style={text}>Trung tâm Ngoại ngữ & Tin học HaiEduTech trân trọng gửi đến quý PHHS thông tin chương trình học được thiết kế theo mục tiêu cá nhân.</Text>
        <Section style={panel}><Heading as="h2" style={h2}>{p.courseNameVi}</Heading><Text style={muted}>{p.courseNameEn}</Text>
          <Text style={row}><strong>Hình thức / Format:</strong> {p.classType}</Text><Text style={row}><strong>Trình độ / Level:</strong> {p.level}</Text>
          <Text style={row}><strong>Thời lượng / Duration:</strong> {p.duration}</Text><Text style={row}><strong>Thời gian / Dates:</strong> {p.dates}</Text>
          <Text style={row}><strong>Lịch học / Schedule:</strong> {p.schedule}</Text>{p.objective && <Text style={row}><strong>Mục tiêu / Outcome:</strong> {p.objective}</Text>}
        </Section>
        <Heading as="h3" style={sectionTitle}>Lộ trình / Curriculum</Heading>{(p.modules || []).map((m, i) => <Text key={i} style={list}>{i + 1}. {m}</Text>)}
        <Heading as="h3" style={sectionTitle}>Quyền lợi / Included</Heading>{(p.benefits || []).map((m, i) => <Text key={i} style={list}>✓ {m}</Text>)}
        <Section style={feePanel}><Text style={row}><strong>Học phí / Tuition:</strong> {p.baseTuition}</Text><Text style={row}><strong>Ưu đãi / Discount:</strong> {p.discount}</Text><Text style={total}><strong>Học phí chính thức / Final:</strong> {p.finalTuition}</Text>{p.extraFee && <Text style={row}><strong>Khoản phí khác / Other fee:</strong> {p.extraFee}</Text>}{p.totalDue && <Text style={total}><strong>Tổng thanh toán / Total due:</strong> {p.totalDue}</Text>}<Text style={paymentNote}>Quý PHHS vui lòng đóng HP đầu khóa học</Text><Text style={row}>{p.paymentDetails}</Text>{p.paymentReference && <Text style={row}><strong>Nội dung chuyển khoản / Reference:</strong> {p.paymentReference}</Text>}</Section>
        <Heading as="h3" style={sectionTitle}>Giảng viên / Instructor</Heading><Text style={row}><strong>{p.instructorName}</strong></Text><Text style={row}>{p.instructorCredentials}</Text><Text style={row}>{p.instructorExpertise?.split("\n").map((line, i, arr) => <span key={i}>{line}{i < arr.length - 1 ? <br /> : null}</span>)}</Text><Text style={row}>{p.instructorContact}</Text>
        {p.note && <Text style={note}><strong>Ghi chú / Note:</strong> {p.note}</Text>}
        <Hr style={hr}/><Text style={footer}>HaiEduTech · Học thông minh • Dẫn đầu kỷ nguyên số<br/>haiedutech.com · contact@haiedutech.com · 0962.823.800</Text>
      </Section>
    </Container></Body>
  </Html>
)
export const template = { component: CourseNoticeEmail, subject: (d: Record<string, any>) => `HaiEduTech - Giấy báo khóa học ${d.courseNameVi || ''} - ${d.recipientName || ''}`, displayName: 'Course Notice · Giấy báo khóa học', previewData: { recipientName: 'Đặng Gia Nghi', noticeCode: 'HET-20261002-DEMO', courseNameVi: 'Cambridge English (Level A1-A2)', courseNameEn: 'Cambridge English A1-A2', classType: 'Kèm 1-1 / One-to-one', level: 'A1-A2', duration: '12 tuần · 24 buổi · 36 giờ', dates: '02/06/2026 - 20/08/2026', schedule: 'Thứ 3 - Thứ 5, 19:00 - 20:30', modules: ['Nền tảng ngữ pháp và từ vựng', 'Giao tiếp và phát âm'], benefits: ['Toàn bộ tài liệu trong chương trình'], baseTuition: '7.200.000đ', discount: '10%', finalTuition: '6.480.000đ', paymentDeadline: '01/06/2026', paymentDetails: 'Vietcombank · 1025536199 · NGUYEN TRAN THANH HAI', instructorName: 'Ths.Ks. Nguyễn Trần Thanh Hải', instructorCredentials: 'Thạc sĩ Ngôn ngữ & Văn hóa Anh', instructorExpertise: 'Kỹ sư dữ liệu & trí tuệ nhân tạo (Phần Lan)', instructorContact: '0962.823.800 · contact@haiedutech.com' } } satisfies TemplateEntry
const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', margin: 0, padding: '24px 12px' }
const container = { maxWidth: '680px', margin: '0 auto', border: '1px solid #dbe4f0', backgroundColor: '#ffffff' }
const header = { backgroundColor: '#0f5132', padding: '28px 32px', color: '#ffffff', borderTop: '8px solid #15803d' }
const brand = { margin: '0 0 8px', fontSize: '12px', fontWeight: '800', color: '#dcfce7' }
const h1 = { margin: 0, fontSize: '23px', lineHeight: '30px', color: '#ffffff' }
const subtitle = { margin: '8px 0 0', fontSize: '12px', color: '#dcfce7' }
const content = { padding: '28px 32px' }; const text = { fontSize: '15px', lineHeight: '24px', color: '#334155' }
const panel = { padding: '18px', borderLeft: '4px solid #15803d', backgroundColor: '#f0fdf4' }; const feePanel = { padding: '18px', marginTop: '20px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }
const h2 = { margin: 0, fontSize: '21px', color: '#0f172a' }; const muted = { margin: '4px 0 14px', color: '#64748b' }; const row = { margin: '7px 0', fontSize: '14px', lineHeight: '21px', color: '#334155' }
const sectionTitle = { margin: '24px 0 10px', fontSize: '15px', textTransform: 'uppercase' as const, color: '#0f5132' }; const list = { margin: '5px 0', fontSize: '14px', lineHeight: '21px', color: '#334155' }
const total = { margin: '10px 0', fontSize: '17px', color: '#0f5132' }; const paymentNote = { margin: '12px 0', padding: '10px 12px', borderLeft: '4px solid #15803d', backgroundColor: '#ffffff', color: '#0f5132', fontSize: '14px', fontWeight: '700' }; const note = { marginTop: '22px', padding: '12px', backgroundColor: '#ecfdf5', color: '#334155', fontSize: '14px', lineHeight: '21px' }
const hr = { margin: '28px 0 18px', borderColor: '#e2e8f0' }; const footer = { textAlign: 'center' as const, fontSize: '12px', lineHeight: '19px', color: '#64748b' }
