import { NextApiRequest, NextApiResponse } from 'next'
import { sendQuietHourReminder } from '@/lib/email'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('Testing email with Resend API key:', process.env.RESEND_API_KEY ? 'Present' : 'Missing')
    console.log('FROM_EMAIL:', process.env.FROM_EMAIL)
    
    const result = await sendQuietHourReminder(
      'srijansingh235@gmail.com', 
      'Test Email from API',
      new Date(Date.now() + 10 * 60 * 1000),
      new Date(Date.now() + 70 * 60 * 1000)
    )

    console.log('Email result:', result)
    res.status(200).json({ success: true, result })
  } catch (error) {
    console.error('Test email error:', error)
    res.status(500).json({ error: 'Failed to send test email', details: error })
  }
}