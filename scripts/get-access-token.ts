import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getAccessToken() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'srijansingh235@gmail.com',
    password: '123456' // Put your actual password here
  });

  if (error) {
    console.error('Error logging in:', error);
    return;
  }

  console.log('Access Token:', data.session?.access_token);
}

getAccessToken();
