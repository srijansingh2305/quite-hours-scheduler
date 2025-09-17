import { NextApiRequest, NextApiResponse } from 'next'
import { sendQuietHourReminder } from '@/lib/email'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const result = await sendQuietHourReminder(
      'srijansingh235@gmail.com', // Your email
      'Test Session',
      new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
      new Date(Date.now() + 70 * 60 * 1000)  // 70 minutes from now
    )

    res.status(200).json({ success: true, result })
  } catch (error) {
    console.error('Test email error:', error)
    res.status(500).json({ error: 'Failed to send test email' })
  }
}