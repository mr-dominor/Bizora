import { createClient } from "@supabase/supabase-js";

console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
console.log("NEXT_PUBLIC_SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("Anon Key exists?", !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,     // ✅ still needed
  process.env.SUPABASE_SERVICE_ROLE_KEY!     // ✅ server-only
);
