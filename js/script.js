// 页面切换和导航高亮功能
let currentPage = 'index.html';

// 导航项
const navItems = [
    { id: 'home', icon: '🏠', text: '首页', page: 'index.html' },
    { id: 'shop', icon: '🛒', text: '商城', page: 'shop.html' },
    { id: 'recycle', icon: '♻️', text: '回收', page: 'recycle.html' },
    { id: 'rank', icon: '🏆', text: '排行', page: 'rank.html' },
    { id: 'profile', icon: '👤', text: '我的', page: 'profile.html' }
];

// 初始化导航栏
function initNavigation() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    nav.innerHTML = navItems.map(item => `
        <a href="${item.page}" class="nav-item ${currentPage.includes(item.page) ? 'active' : ''}" data-page="${item.page}">
            <span class="nav-icon">${item.icon}</span>
            <span>${item.text}</span>
        </a>
    `).join('');
    
    // 添加导航点击事件
    nav.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function(e) {
            // 阻止默认跳转，使用单页切换
            e.preventDefault();
            const page = this.getAttribute('data-page');
            navigateTo(page);
        });
    });
}

// 页面导航
function navigateTo(page) {
    currentPage = page;
    
    // 更新导航高亮
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-page') === page) {
            item.classList.add('active');
        }
    });
    
    // 这里可以实现单页切换逻辑
    // 目前使用多HTML文件方式，所以直接跳转到对应页面
    window.location.href = page;
}

// 初始化页面
function initPage() {
    initNavigation();
    initPageSpecifics();
}

// 页面特定初始化
function initPageSpecifics() {
    if (currentPage.includes('recycle.html')) {
        initRecyclePage();
    } else if (currentPage.includes('shop.html')) {
        initShopPage();
    } else if (currentPage.includes('profile.html')) {
        initProfilePage();
    }
}

// 回收页面初始化
function initRecyclePage() {
    // 旧程度选择
    const radioOptions = document.querySelectorAll('.radio-option');
    radioOptions.forEach(option => {
        option.addEventListener('click', function() {
            radioOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // 立即发布按钮
    const publishBtn = document.querySelector('.btn');
    if (publishBtn) {
        publishBtn.addEventListener('click', function() {
            alert('发布成功');
            // 清空表单
            document.querySelector('input[type="text"]').value = '';
            document.querySelector('select').value = '';
            radioOptions.forEach(opt => opt.classList.remove('active'));
            radioOptions[1].classList.add('active'); // 默认选中九成新
        });
    }
    
    // 选择图片按钮
    const uploadBtn = document.querySelector('.upload-btn');
    if (uploadBtn) {
        uploadBtn.addEventListener('click', function() {
            // 触发文件选择
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.click();
        });
    }
}

// 商城页面初始化
function initShopPage() {
    // 获取更多按钮
    const getMoreBtn = document.querySelector('.get-more');
    if (getMoreBtn) {
        getMoreBtn.addEventListener('click', function() {
            alert('功能开发中');
        });
    }
    
    // 商品卡片点击
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            alert('功能开发中');
        });
    });
}

// 我的页面初始化
function initProfilePage() {
    // 菜单项点击
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('span').textContent;
            alert(text);
        });
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initPage);

// 轮播功能
document.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.getElementById('carouselWrapper');
    const dots = document.querySelectorAll('.dot');
    const slides = document.querySelectorAll('.carousel-slide');
    let currentIndex = 0;
    let slideInterval;
    let autoPlayDelay = 3000; // 3秒
    let isPaused = false;

    // 切换到指定索引
    function goToSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        wrapper.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentIndex = index;
    }

    // 下一张
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    // 上一张
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    // 开始自动播放
    function startAutoPlay() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            if (!isPaused) {
                nextSlide();
            }
        }, autoPlayDelay);
    }

    // 暂停自动播放（用户手动操作时）
    function pauseAutoPlay() {
        isPaused = true;
        // 5秒后恢复
        setTimeout(() => {
            isPaused = false;
        }, 5000);
    }

    // 绑定触摸事件（可选简单监听）
    let touchStartX = 0;
    if (wrapper) {
        wrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            pauseAutoPlay();
        });

        wrapper.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchEndX - touchStartX;
            if (Math.abs(diff) > 50) { // 滑动阈值
                if (diff > 0) {
                    prevSlide(); // 右滑显示上一张
                } else {
                    nextSlide(); // 左滑显示下一张
                }
            }
        });
    }

    // 点击指示点切换
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            pauseAutoPlay();
        });
    });

    // 初始化
    if (wrapper && slides.length > 0) {
        goToSlide(0);
        startAutoPlay();

        // 可选：当页面隐藏时停止自动播放，节省资源
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                clearInterval(slideInterval);
            } else {
                startAutoPlay();
            }
        });
    }
});