import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  created_at: string
  name: string
  email: string
  status: string
  is_admin: boolean
  updated_at: string
}

export interface AuthUser {
  id: string
  email: string
  user_metadata: {
    name?: string
  }
}
