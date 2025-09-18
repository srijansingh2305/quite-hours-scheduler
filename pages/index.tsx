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
      <div style={{
        textAlign: 'center',
        maxWidth: '1000px',
        margin: '0 auto',
        animation: 'fadeIn 0.8s ease-out'
      }}>
        {/* Hero Section */}
        <div style={{ marginBottom: '4rem' }}>
          <div style={{
            fontSize: '5rem',
            marginBottom: '1.5rem',
            filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))'
          }}>
            
          </div>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '800',
            color: '#ffffff',
            marginBottom: '1.5rem',
            textShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            letterSpacing: '-0.02em'
          }}>
            Quiet Hours Scheduler
          </h1>
          <p style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.25rem)',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '3rem',
            lineHeight: '1.7',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            Schedule your focused study sessions and get automatic email reminders 
            10 minutes before each session begins.
          </p>
        </div>

        {/* Features Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {[
            {
              icon: '📅',
              title: 'Schedule Sessions',
              description: 'Create quiet study blocks with start and end times that work for your schedule.'
            },
            {
              icon: '📧',
              title: 'Get Reminders',
              description: 'Receive email notifications 10 minutes before each session starts.'
            },
            {
              icon: '🎯',
              title: 'Stay Focused',
              description: 'Eliminate overlap conflicts and maintain consistent study habits.'
            }
          ].map((feature, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                padding: '2.5rem 2rem',
                borderRadius: '20px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                animation: `slideIn 0.6s ease-out ${0.2 + index * 0.1}s both`
              }}
            >
              <div style={{
                fontSize: '3rem',
                marginBottom: '1.5rem',
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '1.4rem',
                fontWeight: '700',
                marginBottom: '1rem',
                color: '#2d3748'
              }}>
                {feature.title}
              </h3>
              <p style={{
                color: '#4a5568',
                lineHeight: '1.6',
                fontSize: '1rem'
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link
            href="/login"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              color: 'white',
              borderRadius: '12px',
              fontWeight: '600',
              fontSize: '1.1rem',
              textDecoration: 'none',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s ease',
              border: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
            }}
          >
            Get Started
          </Link>
          
          <Link
            href="/login"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '1rem 2rem',
              background: 'rgba(255, 255, 255, 0.15)',
              color: 'white',
              borderRadius: '12px',
              fontWeight: '600',
              fontSize: '1.1rem',
              textDecoration: 'none',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Sign In
          </Link>
        </div>
      </div>
    </Layout>
  )
}