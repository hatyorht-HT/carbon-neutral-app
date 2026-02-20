(async function checkAdmin() {
    // 简单的本地状态检查
    const adminToken = localStorage.getItem('admin_token');
    
    if (!adminToken) {
        alert('请先登录管理员账号');
        window.location.href = 'index.html';
    }
})();