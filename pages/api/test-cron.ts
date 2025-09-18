import { NextApiRequest, NextApiResponse } from 'next'
import { getDatabase } from '@/lib/mongodb'
import { sendQuietHourReminder } from '@/lib/email'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = await getDatabase()
    const collection = db.collection('quietHours')

 
    const upcomingQuietHours = await collection
      .find({
        emailSent: { $ne: true },
        startTime: { $gt: new Date() } 
      })
      .toArray()

    console.log(`Found ${upcomingQuietHours.length} quiet hours for testing`)

    const results = []

    for (const qh of upcomingQuietHours) {
      try {
        const { data: user } = await supabaseAdmin.auth.admin.getUserById(qh.userId)
        
        if (user?.user?.email) {
          const emailResult = await sendQuietHourReminder(
            user.user.email,
            qh.title,
            qh.startTime,
            qh.endTime
          )

          if (emailResult.success) {
            await collection.updateOne(
              { _id: qh._id },
              { $set: { emailSent: true } }
            )
            results.push({ id: qh._id, status: 'sent', email: user.user.email })
          } else {
            results.push({ id: qh._id, status: 'failed', error: emailResult.error })
          }
        }
      } catch (error) {
        results.push({ id: qh._id, status: 'error', error })
      }
    }

    res.status(200).json({ success: true, results })
  } catch (error) {
    console.error('Test cron error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}