"use client"
import { createClient } from '@supabase/supabase-js';

console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
console.log("NEXT_PUBLIC_SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("Anon Key exists?", !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient(supabaseUrl, supabaseKey,{
  auth: {
    persistSession: true,   // ✅ ensures it saves to localStorage
    autoRefreshToken: true, // ✅ refreshes session in background
  },
});
