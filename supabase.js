import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const supabaseUrl = 'https://ujjxqimaubjkomyflpje.supabase.co'

const supabaseKey = 'sb_publishable_Fm1I-coG9W7rVDUWjq-Igg_icncO4vL'

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)
window.supabase = supabase