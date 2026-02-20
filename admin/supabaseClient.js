// Supabase 客户端配置
import { createClient } from 'https://jspm.dev/@supabase/supabase-js'

const supabaseUrl = 'https://wywegcbfylaxjbjyhptq.supabase.co'
const supabaseKey = 'sb_publishable_9QcdKFydD2n9WA1W9cok2A_3JeBMa-R'

export const supabaseClient = createClient(supabaseUrl, supabaseKey)
