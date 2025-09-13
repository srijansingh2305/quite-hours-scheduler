import { useState } from 'react'
import { supabaseClient } from '@/utils/auth'
import toast from 'react-hot-toast'

interface AuthFormProps {
  mode: 'login' | 'signup'
  onSuccess: () => void
}

export default function AuthForm({ mode, onSuccess }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (mode === 'signup') {
        const { error } = await supabaseClient.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/api/auth/callback`
          }
        })
        
        if (error) throw error
        toast.success('Check your email to confirm your account!')
      } else {
        const { error } = await supabaseClient.auth.signInWithPassword({
          email,
          password
        })
        
        if (error) throw error
        toast.success('Signed in successfully!')
        onSuccess()
      }
    } catch (error: any) {
      toast.error(error.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {loading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  )
}