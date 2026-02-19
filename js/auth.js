// 登录状态管理
function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

// 登录
function login() {
    localStorage.setItem('isLoggedIn', 'true');
}

// 退出登录
function logout() {
    localStorage.removeItem('isLoggedIn');
    showToast('已退出登录');
    location.reload();
}

// 获取当前用户
function getCurrentUser() {
    // 从localStorage获取用户信息，目前返回默认值
    return {
        name: localStorage.getItem('username') || '林小绿',
        id: localStorage.getItem('userId') || '1'
    };
}

// 要求登录
function requireAuth() {
    if (!isLoggedIn()) {
        showToast('请先登录');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
        return false;
    }
    return true;
}

// 根据登录状态显示不同内容
function showContentBasedOnLogin(loggedInContentId, notLoggedInContentId) {
    const loggedIn = isLoggedIn();
    const loggedInContent = document.getElementById(loggedInContentId);
    const notLoggedInContent = document.getElementById(notLoggedInContentId);
    
    if (loggedInContent && notLoggedInContent) {
        if (loggedIn) {
            loggedInContent.style.display = 'block';
            notLoggedInContent.style.display = 'none';
        } else {
            loggedInContent.style.display = 'none';
            notLoggedInContent.style.display = 'block';
        }
    }
}

// 统一弹窗函数
function showToast(message, duration = 2000) {
    // 创建toast元素
    const toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.top = '50%';
    toast.style.left = '50%';
    toast.style.transform = 'translate(-50%, -50%)';
    toast.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    toast.style.color = 'white';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '8px';
    toast.style.zIndex = '9999';
    toast.style.fontSize = '14px';
    toast.style.textAlign = 'center';
    toast.textContent = message;
    
    // 添加到页面
    document.body.appendChild(toast);
    
    // 自动移除
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, duration);
}

// 页面加载时检查登录状态
document.addEventListener('DOMContentLoaded', function() {
    // 可以在这里添加全局的登录状态检查逻辑
});