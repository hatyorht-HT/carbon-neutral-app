// 底部导航组件
function createFooter() {
    const navItems = [
        { id: 'home', icon: '🏠', text: '首页', page: 'index.html', label: '首页' },
        { id: 'shop', icon: '🛒', text: '积分商城', page: 'shop.html', label: '积分商城' },
        { id: 'market', icon: '🏪', text: '闲置市场', page: 'market.html', label: '闲置市场' },
        { id: 'recycle', icon: '♻️', text: '回收', page: 'recycle.html', label: '回收' },
        { id: 'rank', icon: '🏆', text: '排行', page: 'rank.html', label: '排行' },
        { id: 'profile', icon: '👤', text: '我的', page: 'profile.html', label: '我的' }
    ];
    
    const currentPath = window.location.pathname;
    const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
    
    const footerHTML = `
        <div class="bottom-nav">
            ${navItems.map(item => `
                <a href="${item.page}" class="nav-item ${currentPage.includes(item.page) ? 'active' : ''}" data-page="${item.page}" aria-label="${item.label}">
                    <span class="nav-icon">${item.icon}</span>
                    <span>${item.text}</span>
                </a>
            `).join('')}
        </div>
    `;
    
    const footerContainer = document.createElement('div');
    footerContainer.id = 'footer-container';
    footerContainer.innerHTML = footerHTML;
    document.body.appendChild(footerContainer);
}

// 页面加载时生成底部导航
document.addEventListener('DOMContentLoaded', createFooter);