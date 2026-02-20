// admin/js/admin-auth.js 
import { supabaseClient } from '../supabaseClient.js'; 

/** 
 * 管理员登录逻辑 
 */ 
export async function adminLogin(email, password) { 
    // 1. 调用 Supabase Auth 进行登录 
    const { data, error } = await supabaseClient.auth.signInWithPassword({ 
        email: email, 
        password: password, 
    }); 

    if (error) throw new Error('登录失败: ' + error.message); 

    const user = data.user; 

    // 2. 核心安全检查：从 profiles 表获取该用户的 role 
    const { data: profile, error: profileError } = await supabaseClient 
        .from('profiles') 
        .select('role') 
        .eq('phone_email', user.email) // 使用 email 查询对应的 profiles 记录 
        .single(); 

    if (profileError || !profile || profile.role !== 'admin') { 
        // 如果不是管理员，立即登出，防止非法逗留 
        await supabaseClient.auth.signOut(); 
        throw new Error('权限不足：您不是系统管理员'); 
    } 

    // 3. 登录成功，记录状态到 sessionStorage 和 localStorage 
    sessionStorage.setItem('isAdmin', 'true'); 
    sessionStorage.setItem('adminEmail', user.email); 
    localStorage.setItem('admin_token', '3'); // 使用数字ID 3作为token 
    
    return user; 
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
    const isLoggedIn = await checkAdminAuth()
    if (!isLoggedIn) {
        // 重定向到登录页面
        window.location.href = 'index.html'
    }
}
