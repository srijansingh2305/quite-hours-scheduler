import { NextApiRequest, NextApiResponse } from 'next'
import { getDatabase } from '@/lib/mongodb'
import { sendQuietHourReminder } from '@/lib/email'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Simple auth check - you might want to use a cron secret
  const authHeader = req.headers.authorization
  if (authHeader !== `Bearer ${process.env.CRON_SECRET || 'your-cron-secret'}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const db = await getDatabase()
    const collection = db.collection('quietHours')

    // Find quiet hours starting in 10-11 minutes that haven't had emails sent
    const now = new Date()
    const tenMinutesFromNow = new Date(now.getTime() + 10 * 60 * 1000)
    const elevenMinutesFromNow = new Date(now.getTime() + 11 * 60 * 1000)

    const upcomingQuietHours = await collection
      .find({
        startTime: {
          $gte: tenMinutesFromNow,
          $lt: elevenMinutesFromNow
        },
        emailSent: { $ne: true }
      })
      .toArray()

    console.log(`Found ${upcomingQuietHours.length} quiet hours needing email notifications`)

    const results = []

    for (const qh of upcomingQuietHours) {
      try {
        // Get user details from Supabase
        const { data: user, error: userError } = await supabaseAdmin.auth.admin.getUserById(qh.userId)
        
        if (userError || !user?.user?.email) {
          console.error(`Error getting user ${qh.userId}:`, userError)
          continue
        }

        // Send email reminder
        const emailResult = await sendQuietHourReminder(
          user.user.email,
          qh.title,
          qh.startTime,
          qh.endTime
        )

        if (emailResult.success) {
          // Mark as email sent
          await collection.updateOne(
            { _id: qh._id },
            { $set: { emailSent: true } }
          )

          results.push({
            quietHourId: qh._id,
            email: user.user.email,
            status: 'sent'
          })

          console.log(`Email sent successfully for quiet hour ${qh._id} to ${user.user.email}`)
        } else {
          console.error(`Failed to send email for quiet hour ${qh._id}:`, emailResult.error)
          results.push({
            quietHourId: qh._id,
            email: user.user.email,
            status: 'failed',
            error: emailResult.error
          })
        }
      } catch (error) {
        console.error(`Error processing quiet hour ${qh._id}:`, error)
        results.push({
          quietHourId: qh._id,
          status: 'error',
          error: error
        })
      }
    }

    res.status(200).json({ 
      success: true, 
      processed: results.length,
      results 
    })

  } catch (error) {
    console.error('Cron job error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}