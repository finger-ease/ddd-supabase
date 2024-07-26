import { createClient } from "https://esm.sh/@supabase/supabase-js";

import process from "node:process";
import { Database } from "./database.types.ts";

export const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
);
