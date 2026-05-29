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

interface RegistrationNotificationProps {
  name?: string
  email?: string
  phone?: string
  program?: string
  level?: string
  message?: string
  submittedAt?: string
}

const Row = ({ label, value }: { label: string; value?: string | null }) => {
  if (!value) return null

  return (
    <Section style={rowSection}>
      <Text style={labelText}>{label}</Text>
      <Text style={valueText}>{value}</Text>
    </Section>
  )
}

const RegistrationNotificationEmail = ({
  name,
  email,
  phone,
  program,
  level,
  message,
  submittedAt,
}: RegistrationNotificationProps) => (
  <Html lang="vi" dir="ltr">
    <Head />
    <Preview>Đăng ký khóa học mới từ {name || 'học viên'} tại {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={eyebrow}>HaiEduTech · Course Registration</Text>
        <Heading style={h1}>Có học viên mới đăng ký khóa học</Heading>
        <Text style={text}>
          Bạn vừa nhận được một đăng ký mới từ website. Thông tin chi tiết nằm ngay bên dưới để tiện liên hệ.
        </Text>

        <Section style={panel}>
          <Row label="Họ và tên" value={name} />
          <Row label="Email" value={email || 'Không có'} />
          <Row label="Số điện thoại" value={phone} />
          <Row label="Chương trình" value={program} />
          <Row label="Trình độ hiện tại" value={level || 'Chưa ghi'} />
          <Row label="Ghi chú" value={message || 'Không có'} />
          <Row label="Thời gian gửi" value={submittedAt || 'Vừa xong'} />
        </Section>

        <Hr style={divider} />

        <Text style={footer}>
          Email này được gửi tự động từ form đăng ký khóa học trên website {SITE_NAME}.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: RegistrationNotificationEmail,
  subject: (data: Record<string, any>) => `[Đăng ký khóa học] ${data.program || 'Học viên mới'}`,
  displayName: 'Course registration notification',
  to: 'hainguyen240195@gmail.com',
  previewData: {
    name: 'Nguyễn Minh Anh',
    email: 'minhanh@example.com',
    phone: '0912345678',
    program: 'English – Cambridge (Starters–PET)',
    level: 'Starters',
    message: 'Em muốn học tối thứ 3 và thứ 5.',
    submittedAt: '2026-05-25 17:45',
  },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily: "Inter, Arial, sans-serif",
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
  color: '#2fa39a',
}

const h1 = {
  margin: '0 0 16px',
  fontSize: '28px',
  lineHeight: '34px',
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
  border: '1px solid rgba(47, 163, 154, 0.18)',
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
  color: '#2fa39a',
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