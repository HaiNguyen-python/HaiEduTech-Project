import { createEmailWebhookHandler } from 'npm:@lovable.dev/email-js@0.1.0'
import { createClient } from 'npm:@supabase/supabase-js@2'

const db = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
)

async function record(
  eventId: string,
  recipient: string,
  reason: 'bounce' | 'complaint' | 'unsubscribe',
  status: 'bounced' | 'complained' | 'suppressed',
  message: string,
) {
  const email = recipient.toLowerCase()
  const { error: supErr } = await db
    .from('suppressed_emails')
    .upsert({ email, reason, metadata: null }, { onConflict: 'email' })
  if (supErr) {
    console.error('suppressed_emails upsert failed', { code: supErr.code, message: supErr.message, event_id: eventId })
    throw new Error('suppressed_emails upsert failed')
  }
  const { error: logErr } = await db.from('email_send_log').insert({
    message_id: null,
    template_name: 'system',
    recipient_email: email,
    status,
    error_message: message,
  })
  if (logErr) {
    console.error('email_send_log insert failed', { code: logErr.code, message: logErr.message, event_id: eventId })
    throw new Error('email_send_log insert failed')
  }
}

const handler = createEmailWebhookHandler({
  apiKey: Deno.env.get('LOVABLE_API_KEY')!,
  on: {
    'email.bounced': async (event) => {
      await record(event.event_id, event.data.recipient, 'bounce', 'bounced',
        'Permanent bounce — email address is invalid or rejected')
    },
    'email.complaint': async (event) => {
      await record(event.event_id, event.data.recipient, 'complaint', 'complained',
        'Spam complaint — recipient marked email as spam')
    },
    'email.unsubscribed': async (event) => {
      await record(event.event_id, event.data.recipient, 'unsubscribe', 'suppressed',
        'Recipient unsubscribed')
    },
  },
})

Deno.serve((req) => handler(req))
