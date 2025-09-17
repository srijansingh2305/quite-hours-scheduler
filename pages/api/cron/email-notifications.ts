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

  try {
    const db = await getDatabase()
    const collection = db.collection('quietHours')

    const now = new Date()
    console.log('Current time:', now)

    // For testing: look for sessions starting in the next 15 minutes that haven't had emails sent
    const fifteenMinutesFromNow = new Date(now.getTime() + 15 * 60 * 1000)
    console.log('Looking for sessions starting before:', fifteenMinutesFromNow)

    const upcomingQuietHours = await collection
      .find({
        startTime: {
          $gte: now, // Must be in the future
          $lte: fifteenMinutesFromNow // But within 15 minutes
        },
        emailSent: { $ne: true }
      })
      .toArray()

    console.log(`Found ${upcomingQuietHours.length} quiet hours needing email notifications`)
    console.log('Quiet hours found:', upcomingQuietHours.map(qh => ({
      id: qh._id,
      title: qh.title,
      startTime: qh.startTime,
      emailSent: qh.emailSent
    })))

    const results = []

    for (const qh of upcomingQuietHours) {
      try {
        console.log(`Processing quiet hour ${qh._id} for user ${qh.userId}`)
        
        const { data: user, error: userError } = await supabaseAdmin.auth.admin.getUserById(qh.userId)
        
        if (userError || !user?.user?.email) {
          console.error(`Error getting user ${qh.userId}:`, userError)
          continue
        }

        console.log(`Sending email to ${user.user.email} for session: ${qh.title}`)

        const emailResult = await sendQuietHourReminder(
          user.user.email,
          qh.title,
          qh.startTime,
          qh.endTime
        )

        if (emailResult.success) {
          console.log(`Email sent successfully, updating database...`)
          
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