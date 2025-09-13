import { NextApiRequest, NextApiResponse } from 'next'
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'
import { getDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const supabase = createPagesServerClient({ req, res })
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { id } = req.query

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid ID provided' })
    }

    const db = await getDatabase()
    const collection = db.collection('quietHours')

    const result = await collection.deleteOne({
      _id: new ObjectId(id),
      userId: user.id
    })

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Quiet hour not found' })
    }

    res.status(200).json({ success: true })
  } catch (error) {
    console.error('Delete quiet hour error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}