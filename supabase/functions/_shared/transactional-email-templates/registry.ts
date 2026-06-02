/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  to?: string
  displayName?: string
  previewData?: Record<string, any>
}

import { template as registrationNotification } from './registration-notification.tsx'
import { template as askTeacher } from './ask-teacher.tsx'
import { template as deadlineReminder } from './deadline-reminder.tsx'
import { template as monthlyProgressReport } from './monthly-progress-report.tsx'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'registration-notification': registrationNotification,
  'ask-teacher': askTeacher,
  'deadline-reminder': deadlineReminder,
  'monthly-progress-report': monthlyProgressReport,
}
