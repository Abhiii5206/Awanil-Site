import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 
  import.meta.env.VITE_SUPABASE_URL || "https://xhpxyeomhhaiopdnvtti.supabase.co";

const supabaseKey = 
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_HvEK3ybqjsFP9702OfihHw_awjQgZf7";

export const supabase = createClient(supabaseUrl, supabaseKey);