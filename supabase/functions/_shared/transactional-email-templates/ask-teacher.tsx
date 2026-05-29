import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'HaiEduTech'

interface AskTeacherProps {
  name?: string
  email?: string
  phone?: string
  message?: string
  submittedAt?: string
}

const InfoRow = ({ label, value }: { label: string; value?: string | null }) => {
  if (!value) return null
  return (
    <Section style={rowSection}>
      <Text style={labelText}>{label}</Text>
      <Text style={valueText}>{value}</Text>
    </Section>
  )
}

const AskTeacherEmail = ({
  name,
  email,
  phone,
  message,
  submittedAt,
}: AskTeacherProps) => (
  <Html lang="vi" dir="ltr">
    <Head />
    <Preview>Học viên {name || ''} gửi câu hỏi cho thầy Hải</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={eyebrow}>HaiEduTech · Câu hỏi từ chatbot</Text>
        <Heading style={h1}>Học viên gửi câu hỏi cho thầy Hải</Heading>
        <Text style={text}>
          Câu hỏi được gửi trực tiếp từ chatbot trên website {SITE_NAME}. Hãy phản hồi sớm để hỗ trợ học viên.
        </Text>

        <Section style={panel}>
          <InfoRow label="Họ và tên" value={name} />
          <InfoRow label="Email" value={email || 'Không có'} />
          <InfoRow label="Số điện thoại" value={phone || 'Không có'} />
          <InfoRow label="Thời gian gửi" value={submittedAt || 'Vừa xong'} />
        </Section>

        <Section style={messagePanel}>
          <Text style={messageLabel}>Câu hỏi:</Text>
          <Text style={messageText}>{message || '(Không có nội dung)'}</Text>
        </Section>

        <Hr style={divider} />
        <Text style={footer}>
          Email này được gửi tự động từ chatbot trên website {SITE_NAME}.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: AskTeacherEmail,
  subject: (data: Record<string, any>) => `[Câu hỏi từ chatbot] ${data.name || 'Học viên'}`,
  displayName: 'Chatbot · Ask teacher',
  to: 'hainguyen240195@gmail.com',
  previewData: {
    name: 'Nguyễn Minh Anh',
    email: 'minhanh@example.com',
    phone: '0912345678',
    message: 'Thầy ơi cho em hỏi lộ trình học IELTS từ 5.0 lên 7.0 nên bắt đầu từ đâu ạ?',
    submittedAt: '2026-05-29 18:30',
  },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'Inter, Arial, sans-serif',
  margin: '0',
  padding: '32px 16px',
}
const container = {
  maxWidth: '640px',
  margin: '0 auto',
  padding: '32px',
  borderRadius: '18px',
  border: '1px solid rgba(15, 23, 42, 0.08)',
  backgroundColor: '#ffffff',
  boxShadow: '0 18px 40px rgba(15, 23, 42, 0.08)',
}
const eyebrow = {
  margin: '0 0 12px',
  fontSize: '12px',
  lineHeight: '16px',
  fontWeight: '700',
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  color: '#3b82f6',
}
const h1 = {
  margin: '0 0 16px',
  fontSize: '24px',
  lineHeight: '32px',
  fontWeight: '800',
  color: '#0f172a',
}
const text = {
  margin: '0 0 24px',
  fontSize: '15px',
  lineHeight: '25px',
  color: '#475569',
}
const panel = {
  borderRadius: '16px',
  backgroundColor: '#f8fafc',
  padding: '8px 18px',
  border: '1px solid rgba(59, 130, 246, 0.18)',
}
const messagePanel = {
  marginTop: '16px',
  borderRadius: '16px',
  backgroundColor: '#eff6ff',
  padding: '18px',
  border: '1px solid rgba(59, 130, 246, 0.22)',
}
const messageLabel = {
  margin: '0 0 8px',
  fontSize: '12px',
  fontWeight: '700',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.06em',
  color: '#3b82f6',
}
const messageText = {
  margin: '0',
  fontSize: '15px',
  lineHeight: '24px',
  color: '#0f172a',
  whiteSpace: 'pre-wrap' as const,
}
const rowSection = {
  padding: '12px 0',
  borderBottom: '1px solid rgba(148, 163, 184, 0.18)',
}
const labelText = {
  margin: '0 0 4px',
  fontSize: '12px',
  lineHeight: '16px',
  fontWeight: '700',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.06em',
  color: '#3b82f6',
}
const valueText = {
  margin: '0',
  fontSize: '15px',
  lineHeight: '24px',
  color: '#0f172a',
  whiteSpace: 'pre-wrap' as const,
}
const divider = {
  margin: '28px 0 20px',
  borderColor: 'rgba(148, 163, 184, 0.18)',
}
const footer = {
  margin: '0',
  fontSize: '13px',
  lineHeight: '22px',
  color: '#64748b',
}
