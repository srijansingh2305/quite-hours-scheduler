import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@supabase/auth-helpers-react'
import Layout from '@/components/Layout'
import QuietHourForm from '@/components/QuietHourForm'
import QuietHoursList from '@/components/QuietHoursList'
import { signOut } from '@/utils/auth'
import toast from 'react-hot-toast'

export default function Dashboard() {
  const [refreshList, setRefreshList] = useState(false)
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  const handleFormSuccess = () => {
    setRefreshList(true)
  }

  const handleRefresh = () => {
    setRefreshList(false)
  }

  const handleSignOut = async () => {
    const result = await signOut()
    if (result.success) {
      toast.success('Signed out successfully!')
      router.push('/')
    } else {
      toast.error('Failed to sign out')
    }
  }

  if (!user) {
    return <Layout><div>Loading...</div></Layout>
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user.email}!</p>
          </div>
          
          <button
            onClick={handleSignOut}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Sign Out
          </button>
        </div>

        <div className="space-y-8">
          <QuietHourForm onSuccess={handleFormSuccess} />
          <QuietHoursList refresh={refreshList} onRefresh={handleRefresh} />
        </div>
      </div>
    </Layout>
  )
}