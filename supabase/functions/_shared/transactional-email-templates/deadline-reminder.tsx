import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'HaiEduTech'

interface DeadlineReminderProps {
  studentName?: string
  university?: string
  program?: string
  deadlineDate?: string
  daysRemaining?: number
  dashboardUrl?: string
}

const DeadlineReminderEmail = ({
  studentName, university, program, deadlineDate, daysRemaining = 7, dashboardUrl,
}: DeadlineReminderProps) => {
  const urgent = (daysRemaining ?? 7) <= 3
  return (
    <Html lang="vi" dir="ltr">
      <Head />
      <Preview>{`Còn ${daysRemaining} ngày: deadline ${university || 'ứng tuyển'}`}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={eyebrow}>{SITE_NAME} · Study Abroad Reminder</Text>
          <Heading style={h1}>
            {urgent ? '🚨' : '⏰'} Còn {daysRemaining} ngày đến deadline
          </Heading>
          <Text style={text}>Xin chào {studentName || 'bạn'},</Text>
          <Text style={text}>
            Đây là nhắc nhở tự động về deadline ứng tuyển sắp tới của bạn. Hãy chuẩn bị hồ sơ và bấm nộp đúng hạn nhé!
          </Text>

          <Section style={urgent ? urgentPanel : panel}>
            <Text style={labelText}>Trường</Text>
            <Text style={valueText}>{university || '—'}</Text>
            {program && <>
              <Text style={labelText}>Chương trình</Text>
              <Text style={valueText}>{program}</Text>
            </>}
            <Text style={labelText}>Hạn chót</Text>
            <Text style={valueText}>{deadlineDate || '—'}</Text>
          </Section>

          {dashboardUrl && (
            <Section style={{ textAlign: 'center', margin: '24px 0' }}>
              <Button href={dashboardUrl} style={button}>Mở Journey Dashboard</Button>
            </Section>
          )}

          <Hr style={divider} />
          <Text style={footer}>
            Bạn nhận email này vì có deadline đang lưu trong {SITE_NAME} Study Abroad Portal. Tắt nhắc nhở trong phần Settings.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: DeadlineReminderEmail,
  subject: (data: Record<string, any>) => {
    const d = data.daysRemaining ?? 7
    const urgent = d <= 3
    return `${urgent ? '🚨 ' : '⏰ '}Còn ${d} ngày: ${data.university || 'deadline ứng tuyển'}`
  },
  displayName: 'Study Abroad · Deadline reminder',
  previewData: {
    studentName: 'Minh Anh',
    university: 'Aalto University',
    program: 'MSc Computer Science',
    deadlineDate: '15 Jan 2026',
    daysRemaining: 7,
    dashboardUrl: 'https://haiedutech.com/study-abroad/journey',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif', margin: '0', padding: '32px 16px' }
const container = { maxWidth: '640px', margin: '0 auto', padding: '32px', borderRadius: '18px', border: '1px solid rgba(15, 23, 42, 0.08)', backgroundColor: '#ffffff', boxShadow: '0 18px 40px rgba(15, 23, 42, 0.08)' }
const eyebrow = { margin: '0 0 12px', fontSize: '12px', lineHeight: '16px', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#10b981' }
const h1 = { margin: '0 0 16px', fontSize: '24px', lineHeight: '32px', fontWeight: '800', color: '#0f172a' }
const text = { margin: '0 0 16px', fontSize: '15px', lineHeight: '25px', color: '#475569' }
const panel = { borderRadius: '16px', backgroundColor: '#f0fdf4', padding: '18px', border: '1px solid rgba(16, 185, 129, 0.25)' }
const urgentPanel = { borderRadius: '16px', backgroundColor: '#fef2f2', padding: '18px', border: '1px solid rgba(239, 68, 68, 0.35)' }
const labelText = { margin: '8px 0 4px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase' as const, letterSpacing: '0.06em', color: '#10b981' }
const valueText = { margin: '0', fontSize: '15px', lineHeight: '24px', color: '#0f172a', fontWeight: '600' }
const button = { backgroundColor: '#10b981', color: '#ffffff', padding: '12px 24px', borderRadius: '10px', textDecoration: 'none', fontSize: '14px', fontWeight: '700' }
const divider = { margin: '28px 0 20px', borderColor: 'rgba(148, 163, 184, 0.18)' }
const footer = { margin: '0', fontSize: '12px', lineHeight: '20px', color: '#94a3b8' }
