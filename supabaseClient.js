// Supabase 客户端配置
const supabaseUrl = 'https://wywegcbfylaxjbjyhptq.supabase.co';
const supabaseAnonKey = 'sb_publishable_9QcdKFydD2n9WA1W9cok2A_3JeBMa-R';

// 初始化 Supabase 客户端
const supabaseClient = supabase.createClient(supabaseUrl, supabaseAnonKey);

// 全局变量，供所有页面使用
window.supabaseClient = supabaseClient;
