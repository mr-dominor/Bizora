import { createClient } from "@supabase/supabase-js";

export const supabaseServer = createClient(
  process.env.SUPABASE_URL!,     // ✅ still needed
  process.env.SUPABASE_SERVICE_ROLE_KEY!     // ✅ server-only
);
