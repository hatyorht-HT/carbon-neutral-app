// 登录状态管理
function checkLoginStatus() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

// 登录
function login() {
    localStorage.setItem('isLoggedIn', 'true');
}

// 退出登录
function logout() {
    localStorage.removeItem('isLoggedIn');
    alert('已退出登录');
    location.reload();
}

// 根据登录状态显示不同内容
function showContentBasedOnLogin(loggedInContentId, notLoggedInContentId) {
    const isLoggedIn = checkLoginStatus();
    const loggedInContent = document.getElementById(loggedInContentId);
    const notLoggedInContent = document.getElementById(notLoggedInContentId);
    
    if (loggedInContent && notLoggedInContent) {
        if (isLoggedIn) {
            loggedInContent.style.display = 'block';
            notLoggedInContent.style.display = 'none';
        } else {
            loggedInContent.style.display = 'none';
            notLoggedInContent.style.display = 'block';
        }
    }
}

// 页面加载时检查登录状态
document.addEventListener('DOMContentLoaded', function() {
    // 可以在这里添加全局的登录状态检查逻辑
});