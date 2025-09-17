import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/cron/email-notifications`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.CRON_SECRET || 'your-cron-secret'}`,
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()
    
    res.status(200).json({
      success: true,
      cronResponse: data,
      statusCode: response.status
    })
  } catch (error) {
    console.error('Test real cron error:', error)
    res.status(500).json({ error: 'Failed to test real cron' })
  }
}