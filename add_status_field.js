// 添加 status 字段到 used_items 表
const { createClient } = supabase;

// 初始化 Supabase 客户端
const supabaseUrl = 'https://wywegcbfylaxjbjyhptq.supabase.co';
const supabaseAnonKey = 'sb_publishable_9QcdKFydD2n9WA1W9cok2A_3JeBMa-R';
const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

async function addStatusField() {
    try {
        // 执行 SQL 命令添加 status 字段
        const { error } = await supabaseClient
            .rpc('execute_sql', {
                sql: 'ALTER TABLE used_items ADD COLUMN IF NOT EXISTS status TEXT DEFAULT \'待审核\';'
            });

        if (error) {
            console.error('添加 status 字段失败:', error);
        } else {
            console.log('添加 status 字段成功!');
        }
    } catch (error) {
        console.error('执行 SQL 命令失败:', error);
    }
}

// 运行函数
addStatusField();
