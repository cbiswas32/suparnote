import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tglwbcqojkoddlytzpkq.supabase.co";
const supabaseAnonKey = "sb_publishable_p_UFJ4taBu4qO_Wvw7QqYw_cVlacyEZ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
