import { createClient } from '@supabase/supabase-js'

// ✅ STEP: Replace these two lines with YOUR Supabase project values
// Get them from: https://supabase.com → Your Project → Settings → API
const SUPABASE_URL = 'https://YOUR_PROJECT_ID.supabase.co'
const SUPABASE_ANON_KEY = 'YOUR_ANON_PUBLIC_KEY'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
