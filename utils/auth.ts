import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const supabaseClient = createClientComponentClient()

export async function getCurrentUser() {
  const { data: { user }, error } = await supabaseClient.auth.getUser()
  if (error) {
    console.error('Error getting user:', error)
    return null
  }
  return user
}

export async function signOut() {
  const { error } = await supabaseClient.auth.signOut()
  if (error) {
    console.error('Error signing out:', error)
    return { success: false, error }
  }
  return { success: true }
}