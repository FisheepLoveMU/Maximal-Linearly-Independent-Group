const container = document.getElementById('container');
const toRegister = document.getElementById('to-register');
const toLogin = document.getElementById('to-login');

toRegister.addEventListener('click', () => {
    container.classList.add('active');
});

toLogin.addEventListener('click', () => {
    container.classList.remove('active');
});

// 获取表单和错误提示元素
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const loginError = document.getElementById('login-error');
const registerError = document.getElementById('register-error');

// 登录表单提交事件
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();

    // 简单校验
    if (!username || !password) {
        showError(loginError, '请输入用户名和密码');
        return;
    }

    // 从 localStorage 获取已注册的用户信息
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (userData.username === username && userData.password === password) {
        // 登录成功，设置登录状态
        localStorage.setItem('isLoggedIn', 'true');
        showError(loginError, '登录成功！正在跳转...', 'success');
        setTimeout(() => {
            window.location.href = "../index.html";
        }, 1500);
    } else {
        showError(loginError, '用户名或密码错误');
    }
});

// 注册表单提交事件
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value.trim();
    const confirm = document.getElementById('register-confirm').value.trim();

    // 校验
    if (!username || !password || !confirm) {
        showError(registerError, '请填写所有字段');
        return;
    }
    if (password !== confirm) {
        showError(registerError, '两次输入的密码不一致');
        return;
    }
    if (password.length < 6) {
        showError(registerError, '密码长度至少为6位');
        return;
    }

    // 保存用户信息到 localStorage（仅演示，实际项目请勿明文存储密码）
    localStorage.setItem('userData', JSON.stringify({
        username,
        password
    }));

    showError(registerError, '注册成功！请登录', 'success');
    // 2秒后自动切换到登录界面
    setTimeout(() => {
        container.classList.remove('active');
    }, 2000);
});

// 错误/成功提示函数
function showError(element, message, type = 'error') {
    element.textContent = message;
    element.style.display = 'block';
    element.style.color = type === 'error' ? '#ff4757' : '#2ed573';
    setTimeout(() => {
        element.style.display = 'none';
    }, 4000);
}