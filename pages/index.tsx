import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@supabase/auth-helpers-react'
import Layout from '@/components/Layout'
import Link from 'next/link'

export default function Home() {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router])

  return (
    <Layout>
      <div className="text-center max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="text-6xl mb-4">🔕</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Quiet Hours Scheduler
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Schedule your focused study sessions and get automatic email reminders 
            10 minutes before each session begins.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-3xl mb-4">📅</div>
            <h3 className="text-lg font-semibold mb-2">Schedule Sessions</h3>
            <p className="text-gray-600">
              Create quiet study blocks with start and end times that work for your schedule.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-3xl mb-4">📧</div>
            <h3 className="text-lg font-semibold mb-2">Get Reminders</h3>
            <p className="text-gray-600">
              Receive email notifications 10 minutes before each session starts.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-lg font-semibold mb-2">Stay Focused</h3>
            <p className="text-gray-600">
              Eliminate overlap conflicts and maintain consistent study habits.
            </p>
          </div>
        </div>

        <div className="space-x-4">
          <Link
            href="/login"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Get Started
          </Link>
          
          <Link
            href="/login"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Sign In
          </Link>
        </div>
      </div>
    </Layout>
  )
}