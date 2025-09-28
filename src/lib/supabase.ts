import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://dnpxijvjjdokgppqxnap.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRucHhpanZqamRva2dwcHF4bmFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwNTg2ODAsImV4cCI6MjA3NDYzNDY4MH0.JZoWKFaxUD3pHDbtGCP6UozYhyY4AUC8ResBY1VMfA8'

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
