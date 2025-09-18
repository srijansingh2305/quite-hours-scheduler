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
      <div style={{
        maxWidth: '420px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '3rem 2.5rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        animation: 'fadeIn 0.6s ease-out'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#2d3748',
            marginBottom: '0.5rem',
            letterSpacing: '-0.025em'
          }}>
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p style={{
            color: '#4a5568',
            fontSize: '1rem'
          }}>
            {mode === 'login' 
              ? 'Sign in to manage your quiet hours'
              : 'Sign up to start scheduling your study sessions'
            }
          </p>
        </div>

        <AuthForm mode={mode} onSuccess={handleAuthSuccess} />

        <div style={{
          marginTop: '2rem',
          textAlign: 'center'
        }}>
          <button
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            style={{
              background: 'none',
              border: 'none',
              color: '#6366f1',
              fontSize: '0.9rem',
              cursor: 'pointer',
              padding: '0.5rem',
              transition: 'color 0.2s ease',
              fontWeight: '500'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#4f46e5'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#6366f1'
            }}
          >
            {mode === 'login' 
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"
            }
          </button>
        </div>
      </div>
    </Layout>
  )
}