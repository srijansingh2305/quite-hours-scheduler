import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@supabase/auth-helpers-react'
import Layout from '@/components/Layout'
import AuthForm from '@/components/AuthForm'

export default function Login() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user, router])

  const handleAuthSuccess = () => {
    router.push('/dashboard')
  }

  if (user) {
    return <Layout><div>Redirecting...</div></Layout>
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-sm border">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-600">
              {mode === 'login' 
                ? 'Sign in to manage your quiet hours'
                : 'Sign up to start scheduling your study sessions'
              }
            </p>
          </div>

          <AuthForm mode={mode} onSuccess={handleAuthSuccess} />

          <div className="mt-6 text-center">
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-indigo-600 hover:text-indigo-500 text-sm"
            >
              {mode === 'login' 
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"
              }
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}