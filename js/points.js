// 积分管理工具函数

// 获取当前用户名（需与登录状态一致，目前假设从 localStorage 获取）
function getCurrentUser() {
    return localStorage.getItem('username') || '林小绿'; // 实际根据登录逻辑获取
}

// 获取当前用户积分
function getUserPoints() {
    const user = getCurrentUser();
    const key = `points_${user}`;
    return parseInt(localStorage.getItem(key)) || 0;
}

// 增加当前用户积分
function addUserPoints(amount) {
    const user = getCurrentUser();
    const key = `points_${user}`;
    const current = getUserPoints();
    localStorage.setItem(key, current + amount);
    return current + amount;
}

// 减少当前用户积分（可能用于兑换，但当前不需要）
function deductUserPoints(amount) {
    // 暂不实现
}

// 更新页面上的积分显示
function updatePointsDisplay() {
    const points = getUserPoints();
    // 查找所有可能显示积分的元素
    const pointsElements = document.querySelectorAll('[data-points]');
    pointsElements.forEach(element => {
        element.textContent = points.toLocaleString();
    });
}
