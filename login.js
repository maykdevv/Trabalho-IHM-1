document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const formSwitchBtn = document.getElementById('form-switch-btn');
    const formTitle = document.getElementById('form-title');
    const formSubtitle = document.getElementById('form-subtitle');
    const formSwitchText = document.getElementById('form-switch-text');
    const clientBtn = document.getElementById('client-btn');
    const adminBtn = document.getElementById('admin-btn');
    const forgotPassword = document.getElementById('forgot-password');
    
    // Current state
    let isLoginForm = true;
    let isClient = true;
    
    // Switch between login and signup forms
    formSwitchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        isLoginForm = !isLoginForm;
        
        if (isLoginForm) {
            loginForm.classList.remove('hidden');
            signupForm.classList.add('hidden');
            formTitle.textContent = 'Bem-vindo de volta';
            formSubtitle.textContent = 'Faça login para acessar sua conta';
            formSwitchText.innerHTML = 'Não tem uma conta? <button id="form-switch-btn" class="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 font-medium">Cadastre-se</button>';
        } else {
            loginForm.classList.add('hidden');
            signupForm.classList.remove('hidden');
            formTitle.textContent = 'Crie sua conta';
            formSubtitle.textContent = 'Preencha seus dados para se cadastrar';
            formSwitchText.innerHTML = 'Já tem uma conta? <button id="form-switch-btn" class="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 font-medium">Faça login</button>';
        }
        
        // Re-attach event listener to the new button
        document.getElementById('form-switch-btn').addEventListener('click', arguments.callee);
    });
    
document.getElementById('meuBotao').addEventListener('click', function() {

window.location.href = 'admPage.html';
});

    // Switch between client and admin
    clientBtn.addEventListener('click', function() {
        isClient = true;
        clientBtn.classList.add('active');
        adminBtn.classList.remove('active');
        clientBtn.querySelector('i').classList.remove('text-gray-500', 'dark:text-gray-400');
        clientBtn.querySelector('i').classList.add('text-primary-600', 'dark:text-primary-400');
        adminBtn.querySelector('i').classList.remove('text-primary-600', 'dark:text-primary-400');
        adminBtn.querySelector('i').classList.add('text-gray-500', 'dark:text-gray-400');
    });
    
    adminBtn.addEventListener('click', function() {
        isClient = false;
        adminBtn.classList.add('active');
        clientBtn.classList.remove('active');
        adminBtn.querySelector('i').classList.remove('text-gray-500', 'dark:text-gray-400');
        adminBtn.querySelector('i').classList.add('text-primary-600', 'dark:text-primary-400');
        clientBtn.querySelector('i').classList.remove('text-primary-600', 'dark:text-primary-400');
        clientBtn.querySelector('i').classList.add('text-gray-500', 'dark:text-gray-400');
    });
    
    // Form submissions
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // Here you would typically send this to your backend
        console.log('Login attempt:', { 
            email, 
            password, 
            userType: isClient ? 'client' : 'admin' 
        });
        
        // Simulate successful login
        alert(`Login ${isClient ? 'do cliente' : 'do administrador'} realizado com sucesso!`);
    });
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const phone = document.getElementById('signup-phone').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        
        if (password !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }
        
        // Here you would typically send this to your backend
        console.log('Signup attempt:', { 
            name, 
            email, 
            phone, 
            password, 
            userType: isClient ? 'client' : 'admin' 
        });
        
        // Simulate successful signup
        alert(`Conta ${isClient ? 'de cliente' : 'de administrador'} criada com sucesso!`);
    });
    
    // Forgot password
    forgotPassword.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Um e-mail para redefinição de senha será enviado para o endereço cadastrado.');
    });


    document.addEventListener('DOMContentLoaded', function() {
    // ... (código anterior permanece igual)

    // Form submissions
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // Redirecionar conforme o tipo de usuário
        if (isClient) {
            window.location.href = 'index.html';
        } else {
            window.location.href = 'admPage.html';
        }
    });
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const phone = document.getElementById('signup-phone').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        
        if (password !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }
        
        // Redirecionar conforme o tipo de usuário
        if (isClient) {
            window.location.href = 'index.html';
        } else {
            window.location.href = 'admPage.html';
        }
    });
    
    // ... (restante do código permanece igual)
});
});