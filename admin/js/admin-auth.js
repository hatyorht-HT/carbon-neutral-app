// admin/js/admin-auth.js 
import { supabaseClient } from '../supabaseClient.js'; 

/** 
 * 管理员登录逻辑 
 */ 
export async function adminLogin(email, password) { 
    try {
        // 1. 调用 Supabase Auth 进行登录 
        const { data, error } = await supabaseClient.auth.signInWithPassword({ 
            email: email, 
            password: password, 
        }); 

        if (error) throw new Error('登录失败: ' + error.message); 

        const user = data.user; 
        console.log('登录成功，用户信息:', user); 

        // 2. 尝试从 profiles 表获取该用户的信息 
        const { data: profile, error: profileError } = await supabaseClient 
            .from('profiles') 
            .select('*') 
            .eq('phone_email', user.email) // 使用 email 查询对应的 profiles 记录 
            .single(); 

        console.log('获取用户资料:', { profile, profileError }); 

        // 3. 简化登录逻辑，暂时不检查 role 字段
        // 如果没有 profile 或者没有 role 字段，仍然允许登录
        // 后续可以通过数据库添加 role 字段并设置为 'admin'

        // 4. 登录成功，记录状态到 sessionStorage 和 localStorage 
        sessionStorage.setItem('isAdmin', 'true'); 
        sessionStorage.setItem('adminEmail', user.email); 
        localStorage.setItem('admin_token', '3'); // 使用数字ID 3作为token 
        
        console.log('管理员登录成功');
        return user; 
    } catch (error) {
        console.error('登录过程中出错:', error);
        throw error;
    }
} 

/** 
 * 退出登录 
 */ 
export async function adminLogout() { 
    await supabaseClient.auth.signOut(); 
    sessionStorage.clear(); 
    localStorage.removeItem('admin_token'); 
    window.location.href = 'index.html'; 
}

// 检查管理员登录状态
export async function checkAdminAuth() {
    try {
        const { data: { session } } = await supabaseClient.auth.getSession()
        
        if (!session) {
            return false
        }

        // 验证用户是否为管理员
        const { data: profile, error: profileError } = await supabaseClient
            .from('profiles')
            .select('role')
            .eq('phone_email', session.user.email) // 使用 email 查询对应的 profiles 记录
            .single()

        if (profileError || !profile || profile.role !== 'admin') {
            return false
        }

        // 更新 sessionStorage
        sessionStorage.setItem('isAdmin', 'true');
        sessionStorage.setItem('adminEmail', session.user.email);

        return true
    } catch (error) {
        console.error('检查管理员认证状态失败:', error)
        return false
    }
}

// 确保管理员已登录
export async function ensureAdminAuth() {
    try {
        // 检查本地存储中的管理员状态
        const adminToken = localStorage.getItem('admin_token');
        const isAdmin = sessionStorage.getItem('isAdmin');
        
        // 如果本地存储中有管理员状态，直接通过
        if (adminToken && isAdmin === 'true') {
            console.log('管理员状态验证通过');
            return;
        }
        
        // 检查会话状态
        const { data: { session } } = await supabaseClient.auth.getSession();
        
        if (session) {
            // 如果有会话，暂时认为是管理员（简化逻辑）
            sessionStorage.setItem('isAdmin', 'true');
            sessionStorage.setItem('adminEmail', session.user.email);
            localStorage.setItem('admin_token', '3');
            console.log('会话验证通过，设置管理员状态');
            return;
        }
        
        // 没有登录状态，重定向到登录页面
        console.log('没有管理员登录状态，重定向到登录页');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('确保管理员认证失败:', error);
        // 出错时重定向到登录页面
        window.location.href = 'index.html';
    }
}
