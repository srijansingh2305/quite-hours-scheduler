import { NextApiRequest, NextApiResponse } from 'next'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import { getDatabase } from '@/lib/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  console.log('Entering list API handler');

  if (req.method !== 'GET') {
    console.log('Invalid method:', req.method);
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const supabase = createPagesServerClient({ req, res })
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const db = await getDatabase()
    const collection = db.collection('quietHours')

    const quietHours = await collection
      .find({ userId: user.id })
      .sort({ startTime: 1 })
      .toArray()

    res.status(200).json({ success: true, quietHours })
  } catch (error) {
    console.error('List quiet hours error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}