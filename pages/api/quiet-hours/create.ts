import { NextApiRequest, NextApiResponse } from 'next'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import { getDatabase } from '@/lib/mongodb'
import { validateQuietHour } from '@/utils/validation'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const supabase = createPagesServerClient({ req, res })
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { title, startTime, endTime, description } = req.body

    const validation = validateQuietHour({ title, startTime, endTime })
    if (!validation.isValid) {
      return res.status(400).json({ error: validation.errors.join(', ') })
    }

    const db = await getDatabase()
    const collection = db.collection('quietHours')

    // Check for overlapping quiet hours for the same user
    const start = new Date(startTime)
    const end = new Date(endTime)

    const overlapping = await collection.findOne({
      userId: user.id,
      $or: [
        {
          startTime: { $lt: end },
          endTime: { $gt: start }
        }
      ]
    })

    if (overlapping) {
      return res.status(400).json({ error: 'You have an overlapping quiet hour during this time' })
    }

    const quietHour = {
      userId: user.id,
      title,
      startTime: start,
      endTime: end,
      description: description || '',
      emailSent: false,
      createdAt: new Date(),
    }
    console.log('User:', user)
    console.log('Request Body:', req.body)
    console.log('Validation result:', validation)
    console.log('Attempting to insert quiet hour...')


    const result = await collection.insertOne(quietHour)

    res.status(201).json({ 
      success: true, 
      quietHour: { ...quietHour, _id: result.insertedId } 
    })
  } catch (error) {
    console.error('Create quiet hour error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}