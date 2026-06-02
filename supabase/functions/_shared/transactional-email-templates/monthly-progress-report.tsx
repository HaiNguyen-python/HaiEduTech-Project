import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text, Button, Hr, Link,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'HaiEduTech'
const SITE_URL = 'https://haiedutech.com'

interface ModuleStat {
  module: string
  accuracyPct: number
  attempts: number
}

interface MonthlyProgressReportProps {
  studentName?: string
  periodLabel?: string // e.g. "Tháng 5/2026"
  totalHours?: number
  streakDays?: number
  totalStars?: number
  petLevel?: number
  petEmoji?: string
  modules?: ModuleStat[]
  reviewQueueCount?: number
  encouragement?: string
}

const MonthlyProgressReportEmail = ({
  studentName,
  periodLabel,
  totalHours,
  streakDays,
  totalStars,
  petLevel,
  petEmoji,
  modules,
  reviewQueueCount,
  encouragement,
}: MonthlyProgressReportProps) => {
  const hours = totalHours ?? 0
  const streak = streakDays ?? 0
  const stars = totalStars ?? 0
  const level = petLevel ?? 1
  const emoji = petEmoji || '🐉'
  const safeModules = modules && modules.length > 0 ? modules : []
  const review = reviewQueueCount ?? 0
  const encMsg =
    encouragement ||
    'Mỗi giờ học hôm nay là một bước tiến vững chắc trên hành trình chinh phục tri thức. Hãy duy trì nhịp học và cùng AI Pet leo lên cấp tiếp theo nhé!'

  return (
    <Html lang="vi" dir="ltr">
      <Head />
      <Preview>
        Báo cáo học tập {periodLabel || 'tháng vừa qua'} của {studentName || 'bạn'} tại {SITE_NAME}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* HEADER */}
          <Section style={header}>
            <Text style={brandLabel}>HAIEDUTECH · SMART LEARNING PLATFORM</Text>
            <Heading style={h1}>Báo Cáo Học Tập Định Kỳ {periodLabel ? `· ${periodLabel}` : ''}</Heading>
            <Text style={subtitle}>
              Xin chào {studentName || 'học viên'}, đây là tổng kết hành trình học tập 30 ngày qua của bạn.
            </Text>
          </Section>

          <Hr style={divider} />

          {/* SECTION 1: OVERVIEW METRICS — 3-column responsive table */}
          <Heading as="h2" style={h2}>1. Chỉ số tổng quan</Heading>
          <table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={metricsTable}>
            <tbody>
              <tr>
                <td style={metricCell} align="center">
                  <Text style={metricLabel}>Tổng giờ học</Text>
                  <Text style={metricValue}>{hours.toFixed(1)}h</Text>
                  <Text style={metricHint}>Streak {streak} ngày</Text>
                </td>
                <td style={metricCell} align="center">
                  <Text style={metricLabel}>Sao tích lũy</Text>
                  <Text style={metricValue}>⭐ {stars}</Text>
                  <Text style={metricHint}>Tháng này</Text>
                </td>
                <td style={metricCellLast} align="center">
                  <Text style={metricLabel}>Cấp độ Thú Cưng AI</Text>
                  <Text style={metricValue}>{emoji} Lv. {level}</Text>
                  <Text style={metricHint}>Cùng leo cấp tiếp!</Text>
                </td>
              </tr>
            </tbody>
          </table>

          <Hr style={divider} />

          {/* SECTION 2: MODULE DETAILS */}
          <Heading as="h2" style={h2}>2. Chi tiết môn học</Heading>
          {safeModules.length === 0 ? (
            <Text style={text}>
              Chưa có hoạt động học cụ thể trong kỳ này. Hãy quay lại và chọn một lộ trình
              bạn yêu thích để bắt đầu nhé.
            </Text>
          ) : (
            <Section style={moduleList}>
              {safeModules.map((m) => (
                <table key={m.module} role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={moduleRow}>
                  <tbody>
                    <tr>
                      <td style={moduleNameCell}>
                        <Text style={moduleBullet}>•&nbsp;{m.module}</Text>
                      </td>
                      <td style={moduleStatCell} align="right">
                        <Text style={moduleAccuracy}>{m.accuracyPct}% chính xác</Text>
                        <Text style={moduleHint}>{m.attempts} hoạt động</Text>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ))}
            </Section>
          )}
          <Text style={reviewLine}>
            📚 <strong>Smart Review queue:</strong> còn {review} từ vựng đang chờ ôn tập.
          </Text>

          <Hr style={divider} />

          {/* SECTION 3: NEXT ACTION — accent block */}
          <Heading as="h2" style={h2}>3. Hành động kế tiếp</Heading>
          <Section style={accentBox}>
            <Text style={accentText}>{encMsg}</Text>
            <Button href={`${SITE_URL}/placement-test`} style={ctaButton}>
              Vào bài kiểm tra đầu vào →
            </Button>
            <Text style={accentSecondary}>
              Hoặc mở dashboard học tập:{' '}
              <Link href={`${SITE_URL}/dashboard`} style={inlineLink}>haiedutech.com/dashboard</Link>
            </Text>
          </Section>

          <Hr style={divider} />

          <Text style={footer}>
            Báo cáo được tạo tự động vào ngày 1 mỗi tháng bởi hệ thống AI của {SITE_NAME}.
            <br />
            Học thông minh • Dẫn đầu kỷ nguyên số.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: MonthlyProgressReportEmail,
  subject: (data: Record<string, any>) =>
    `📊 Báo cáo học tập ${data?.periodLabel || 'tháng vừa qua'} - HaiEduTech`,
  displayName: 'Monthly progress report',
  previewData: {
    studentName: 'Nguyễn Văn A',
    periodLabel: 'Tháng 5/2026',
    totalHours: 12.5,
    streakDays: 18,
    totalStars: 240,
    petLevel: 7,
    petEmoji: '🐉',
    modules: [
      { module: 'AI Academy · Module 2', accuracyPct: 86, attempts: 14 },
      { module: 'IELTS Speaking', accuracyPct: 72, attempts: 9 },
      { module: 'HSK 3 Vocabulary', accuracyPct: 91, attempts: 22 },
      { module: 'Scratch Coding · Game Lab', accuracyPct: 80, attempts: 6 },
    ],
    reviewQueueCount: 23,
    encouragement:
      'Bạn đã duy trì nhịp học rất ấn tượng! Hãy tiếp tục giữ phong độ để nâng cấp thú cưng AI lên Level 8 trong tháng tới.',
  },
} satisfies TemplateEntry

// ============ Styles — inline, email-client safe ============
const main: React.CSSProperties = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  margin: 0,
  padding: 0,
}

const container: React.CSSProperties = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '32px 24px',
  backgroundColor: '#ffffff',
}

const header: React.CSSProperties = {
  textAlign: 'center' as const,
  padding: '8px 0 16px',
}

const brandLabel: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '1.5px',
  color: '#3B82F6',
  margin: '0 0 12px',
}

const h1: React.CSSProperties = {
  fontSize: '22px',
  fontWeight: 700,
  color: '#0f172a',
  margin: '0 0 8px',
  lineHeight: 1.3,
}

const h2: React.CSSProperties = {
  fontSize: '15px',
  fontWeight: 700,
  color: '#0f172a',
  margin: '20px 0 12px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
}

const subtitle: React.CSSProperties = {
  fontSize: '14px',
  color: '#475569',
  margin: 0,
  lineHeight: 1.5,
}

const divider: React.CSSProperties = {
  borderColor: '#e2e8f0',
  borderStyle: 'solid',
  borderWidth: '1px 0 0 0',
  margin: '24px 0',
}

const text: React.CSSProperties = {
  fontSize: '14px',
  color: '#334155',
  lineHeight: 1.6,
  margin: '0 0 12px',
}

const metricsTable: React.CSSProperties = {
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  borderCollapse: 'separate' as const,
  overflow: 'hidden',
  backgroundColor: '#f8fafc',
}

const metricCell: React.CSSProperties = {
  width: '33.33%',
  padding: '20px 12px',
  borderRight: '1px solid #e2e8f0',
  verticalAlign: 'top' as const,
}

const metricCellLast: React.CSSProperties = {
  width: '33.33%',
  padding: '20px 12px',
  verticalAlign: 'top' as const,
}

const metricLabel: React.CSSProperties = {
  fontSize: '11px',
  color: '#64748b',
  fontWeight: 600,
  letterSpacing: '0.5px',
  textTransform: 'uppercase' as const,
  margin: '0 0 6px',
}

const metricValue: React.CSSProperties = {
  fontSize: '22px',
  fontWeight: 800,
  color: '#0f172a',
  margin: '0 0 4px',
  lineHeight: 1.2,
}

const metricHint: React.CSSProperties = {
  fontSize: '11px',
  color: '#94a3b8',
  margin: 0,
}

const moduleList: React.CSSProperties = {
  margin: '0 0 12px',
}

const moduleRow: React.CSSProperties = {
  borderBottom: '1px solid #f1f5f9',
}

const moduleNameCell: React.CSSProperties = {
  padding: '10px 0',
  verticalAlign: 'middle' as const,
}

const moduleStatCell: React.CSSProperties = {
  padding: '10px 0',
  verticalAlign: 'middle' as const,
  whiteSpace: 'nowrap' as const,
}

const moduleBullet: React.CSSProperties = {
  fontSize: '14px',
  color: '#0f172a',
  fontWeight: 500,
  margin: 0,
}

const moduleAccuracy: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: 700,
  color: '#10B981',
  margin: 0,
}

const moduleHint: React.CSSProperties = {
  fontSize: '11px',
  color: '#94a3b8',
  margin: '2px 0 0',
}

const reviewLine: React.CSSProperties = {
  fontSize: '13px',
  color: '#475569',
  margin: '16px 0 0',
  padding: '10px 14px',
  backgroundColor: '#f8fafc',
  borderLeft: '3px solid #3B82F6',
  borderRadius: '4px',
}

const accentBox: React.CSSProperties = {
  backgroundColor: '#ecfdf5',
  border: '1px solid #a7f3d0',
  borderRadius: '10px',
  padding: '20px 22px',
  textAlign: 'center' as const,
}

const accentText: React.CSSProperties = {
  fontSize: '14px',
  color: '#064e3b',
  lineHeight: 1.6,
  margin: '0 0 16px',
}

const ctaButton: React.CSSProperties = {
  backgroundColor: '#10B981',
  color: '#ffffff',
  padding: '12px 24px',
  borderRadius: '8px',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: 700,
  display: 'inline-block',
}

const accentSecondary: React.CSSProperties = {
  fontSize: '12px',
  color: '#475569',
  margin: '14px 0 0',
}

const inlineLink: React.CSSProperties = {
  color: '#3B82F6',
  textDecoration: 'underline',
}

const footer: React.CSSProperties = {
  fontSize: '11px',
  color: '#94a3b8',
  textAlign: 'center' as const,
  lineHeight: 1.6,
  margin: 0,
}
