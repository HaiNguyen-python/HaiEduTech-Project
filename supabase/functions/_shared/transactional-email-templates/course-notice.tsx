import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  language?: string; recipientName?: string; noticeCode?: string; courseName?: string;
  classType?: string; duration?: string; dates?: string; schedule?: string;
  objective?: string; baseTuition?: string;
  discount?: string; finalTuition?: string; extraFee?: string; totalDue?: string; paymentReference?: string; paymentDetails?: string;
  instructorName?: string; instructorCredentials?: string; instructorExpertise?: string;
  instructorContact?: string; note?: string;
}
const CourseNoticeEmail = (p: Props) => {
  const vi = p.language === 'vi'
  const c = vi ? {
    preview: `Giấy báo khóa học ${p.courseName || ''} - HaiEduTech`, center: 'TRUNG TÂM NGOẠI NGỮ & TIN HỌC HAIEDUTECH', title: 'Giấy Báo Chương Trình & Khóa Học', dear: 'Kính gửi', learner: 'Học viên',
    intro: 'Trung tâm Ngoại ngữ & Tin học HaiEduTech trân trọng gửi đến quý PHHS thông tin chương trình học được thiết kế theo mục tiêu cá nhân.', format: 'Hình thức', duration: 'Thời lượng', dates: 'Thời gian', schedule: 'Lịch học', outcome: 'Mục tiêu',
    tuition: 'Học phí', discount: 'Ưu đãi', final: 'Học phí chính thức', otherFee: 'Khoản phí khác', total: 'Tổng thanh toán', paymentNote: 'Quý PHHS vui lòng đóng HP đầu khóa học', reference: 'Nội dung chuyển khoản', instructor: 'Giảng viên', note: 'Ghi chú', slogan: 'Học thông minh • Dẫn đầu kỷ nguyên số',
  } : {
    preview: `Course announcement ${p.courseName || ''} - HaiEduTech`, center: 'HAIEDUTECH LANGUAGE & INFORMATION TECHNOLOGY CENTER', title: 'Programme & Course Announcement', dear: 'Dear', learner: 'Learner',
    intro: "HaiEduTech Language & Information Technology Center is pleased to share the details of a study programme designed around the learner's personal goals.", format: 'Format', duration: 'Duration', dates: 'Dates', schedule: 'Schedule', outcome: 'Outcome',
    tuition: 'Tuition', discount: 'Discount', final: 'Final tuition', otherFee: 'Other fee', total: 'Total due', paymentNote: 'Tuition is payable at the start of the course.', reference: 'Payment reference', instructor: 'Instructor', note: 'Note', slogan: 'Learn smart • Lead the digital era',
  }
  return (
  <Html lang={vi ? "vi" : "en"} dir="ltr"><Head /><Preview>{c.preview}</Preview>
    <Body style={main}><Container style={container}>
      <Section style={header}><Text style={brand}>{c.center}</Text><Heading style={h1}>{c.title}</Heading><Text style={subtitle}>{p.noticeCode}</Text></Section>
      <Section style={content}>
        <Text style={text}>{c.dear} <strong>{p.recipientName || c.learner}</strong>,</Text>
        <Text style={text}>{c.intro}</Text>
        <Section style={panel}><Heading as="h2" style={h2}>{p.courseName}</Heading>
          <Text style={row}><strong>{c.format}:</strong> {p.classType}</Text>
          <Text style={row}><strong>{c.duration}:</strong> {p.duration}</Text><Text style={row}><strong>{c.dates}:</strong> {p.dates}</Text>
          <Text style={row}><strong>{c.schedule}:</strong> {p.schedule}</Text>{p.objective && <Text style={row}><strong>{c.outcome}:</strong> {p.objective}</Text>}
        </Section>
        <Section style={feePanel}><Text style={row}><strong>{c.tuition}:</strong> {p.baseTuition}</Text><Text style={row}><strong>{c.discount}:</strong> {p.discount}</Text><Text style={p.totalDue ? row : total}><strong>{c.final}:</strong> {p.finalTuition}</Text>{p.extraFee && <Text style={row}><strong>{c.otherFee}:</strong> {p.extraFee}</Text>}{p.totalDue && <Text style={total}><strong>{c.total}:</strong> {p.totalDue}</Text>}<Text style={paymentNote}>{c.paymentNote}</Text><Text style={row}>{p.paymentDetails}</Text>{p.paymentReference && <Text style={row}><strong>{c.reference}:</strong> {p.paymentReference}</Text>}</Section>
        <Heading as="h3" style={sectionTitle}>{c.instructor}</Heading><Text style={row}><strong>{p.instructorName}</strong></Text><Text style={row}>{p.instructorCredentials}</Text><Text style={row}>{p.instructorExpertise?.split("\n").map((line, i, arr) => <span key={i}>{line}{i < arr.length - 1 ? <br /> : null}</span>)}</Text><Text style={row}>{p.instructorContact}</Text>
        {p.note && <Text style={note}><strong>{c.note}:</strong> {p.note}</Text>}
        <Hr style={hr}/><Text style={footer}>HaiEduTech · {c.slogan}<br/>haiedutech.com · contact@haiedutech.com · 0962.823.800</Text>
      </Section>
    </Container></Body>
  </Html>
)}
export const template = { component: CourseNoticeEmail, subject: (d: Record<string, any>) => d.language === 'vi' ? `HaiEduTech - Giấy báo khóa học ${d.courseName || ''} - ${d.recipientName || ''}` : `HaiEduTech - Course announcement ${d.courseName || ''} - ${d.recipientName || ''}`, displayName: 'Course Notice · Giấy báo khóa học', previewData: { language: 'en', recipientName: 'Gia Nghi Dang', noticeCode: 'HET-20261002-DEMO', courseName: 'Cambridge English A1-A2', classType: 'One-to-one', duration: '12 weeks · 24 sessions · 36 hours', dates: '02/06/2026 - 20/08/2026', schedule: 'Tuesday - Thursday, 19:00 - 20:30', baseTuition: '7,200,000 VND', discount: '10%', finalTuition: '6,480,000 VND', paymentDetails: 'Vietcombank · 1025536199 · NGUYEN TRAN THANH HAI', instructorName: 'Nguyen Tran Thanh Hai, M.A., M.Eng.', instructorCredentials: "Master's in English Language & Culture", instructorExpertise: 'Data & AI Engineer (Finland)\n15 years of teaching experience', instructorContact: '0962.823.800 · contact@haiedutech.com' } } satisfies TemplateEntry
const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', margin: 0, padding: '24px 12px' }
const container = { maxWidth: '680px', margin: '0 auto', border: '1px solid #dbe4f0', backgroundColor: '#ffffff' }
const header = { backgroundColor: '#0f5132', padding: '28px 32px', color: '#ffffff', borderTop: '8px solid #15803d' }
const brand = { margin: '0 0 8px', fontSize: '12px', fontWeight: '800', color: '#dcfce7' }
const h1 = { margin: 0, fontSize: '23px', lineHeight: '30px', color: '#ffffff' }
const subtitle = { margin: '8px 0 0', fontSize: '12px', color: '#dcfce7' }
const content = { padding: '28px 32px' }; const text = { fontSize: '15px', lineHeight: '24px', color: '#334155' }
const panel = { padding: '18px', borderLeft: '4px solid #15803d', backgroundColor: '#f0fdf4' }; const feePanel = { padding: '18px', marginTop: '20px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }
const h2 = { margin: 0, fontSize: '21px', color: '#0f172a' }; const row = { margin: '7px 0', fontSize: '14px', lineHeight: '21px', color: '#334155' }
const sectionTitle = { margin: '24px 0 10px', fontSize: '15px', textTransform: 'uppercase' as const, color: '#0f5132' }
const total = { margin: '10px 0', fontSize: '17px', color: '#0f5132' }; const paymentNote = { margin: '12px 0', padding: '10px 12px', borderLeft: '4px solid #15803d', backgroundColor: '#ffffff', color: '#0f5132', fontSize: '14px', fontWeight: '700' }; const note = { marginTop: '22px', padding: '12px', backgroundColor: '#ecfdf5', color: '#334155', fontSize: '14px', lineHeight: '21px' }
const hr = { margin: '28px 0 18px', borderColor: '#e2e8f0' }; const footer = { textAlign: 'center' as const, fontSize: '12px', lineHeight: '19px', color: '#64748b' }
