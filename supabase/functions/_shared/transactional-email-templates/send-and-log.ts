import { createClient } from 'npm:@supabase/supabase-js@2'
import { sendTemplateEmail, type SendTemplateEmailOptions, type SendTemplateEmailResult } from './send-email.ts'
import { TEMPLATES } from './registry.ts'

// Sends a registered template and records the outcome in email_send_log,
// preserving the app's existing delivery history. Log writes never decide the result.
export async function sendAndLog(
  templateName: string,
  to: string,
  options: SendTemplateEmailOptions = {},
): Promise<SendTemplateEmailResult> {
  const url = Deno.env.get('SUPABASE_URL')
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  const db = url && key ? createClient(url, key) : null
  const recipient = TEMPLATES[templateName]?.to || to
  const log = async (status: string, error_message?: string) => {
    if (!db) return
    const { error } = await db.from('email_send_log').insert({
      message_id: null,
      template_name: templateName,
      recipient_email: recipient,
      status,
      error_message: error_message ?? null,
    })
    if (error) console.error('email_send_log insert failed', { code: error.code, message: error.message })
  }
  try {
    const result = await sendTemplateEmail(templateName, to, options)
    await log(result.sent ? 'sent' : 'suppressed')
    return result
  } catch (e) {
    await log('failed', e instanceof Error ? e.message : String(e))
    throw e
  }
}
