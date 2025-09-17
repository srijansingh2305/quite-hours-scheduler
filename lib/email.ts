import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendQuietHourReminder(
  email: string,
  title: string,
  startTime: Date,
  endTime: Date
) {
    console.log('Attempting to send email to:', email)
    console.log('Resend API key present:', !!process.env.RESEND_API_KEY)
    console.log('FROM_EMAIL:', process.env.FROM_EMAIL)
  const startTimeStr = startTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
  const endTimeStr = endTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: [email],
      subject: `Quiet Hour Starting Soon: ${title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">🔕 Quiet Hour Reminder</h2>
          <p>Your quiet study session "<strong>${title}</strong>" is starting in 10 minutes!</p>
          <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #374151;">Session Details:</h3>
            <ul style="color: #6B7280;">
              <li><strong>Title:</strong> ${title}</li>
              <li><strong>Start Time:</strong> ${startTimeStr}</li>
              <li><strong>End Time:</strong> ${endTimeStr}</li>
            </ul>
          </div>
          <p style="color: #6B7280;">
            Get ready to focus and make the most of your quiet study time! 📚
          </p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #E5E7EB;">
          <p style="font-size: 12px; color: #9CA3AF;">
            This is an automated reminder from Quiet Hours Scheduler.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Email send error:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error: unknown) {
    console.error('Email send error:', error)
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error }
  }
}