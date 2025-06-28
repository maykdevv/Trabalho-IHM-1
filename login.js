document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const formSwitchBtn = document.getElementById('form-switch-btn');
    const formTitle = document.getElementById('form-title');
    const formSubtitle = document.getElementById('form-subtitle');
    const formSwitchText = document.getElementById('form-switch-text');
    const forgotPassword = document.getElementById('forgot-password');
    
    // Current state
    let isLoginForm = true;
    
    // Switch between login and signup forms
    formSwitchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        isLoginForm = !isLoginForm;
        
        if (isLoginForm) {
            loginForm.classList.remove('hidden');
            signupForm.classList.add('hidden');
            formTitle.textContent = 'Bem-vindo de volta';
            formSubtitle.textContent = 'Faça login para acessar sua conta';
            formSwitchText.innerHTML = 'Não tem uma conta? <button id="form-switch-btn" class="text-primary-400 hover:text-primary-300 font-medium">Cadastre-se</button>';
        } else {
            loginForm.classList.add('hidden');
            signupForm.classList.remove('hidden');
            formTitle.textContent = 'Crie sua conta';
            formSubtitle.textContent = 'Preencha seus dados para se cadastrar';
            formSwitchText.innerHTML = 'Já tem uma conta? <button id="form-switch-btn" class="text-primary-400 hover:text-primary-300 font-medium">Faça login</button>';
        }
        
        // Re-attach event listener to the new button
        document.getElementById('form-switch-btn').addEventListener('click', arguments.callee);
    });
    
    // Form submissions
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Redireciona para a página principal
        window.location.href = 'index.html';
    });
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        
        if (password !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }
        
        // Simula cadastro e redireciona
        alert('Conta criada com sucesso!');
        window.location.href = 'index.html';
    });
    
    // Forgot password
    forgotPassword.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Um e-mail para redefinição de senha será enviado para o endereço cadastrado.');
    });
});