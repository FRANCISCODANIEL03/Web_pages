document.addEventListener("DOMContentLoaded", async () => {
    const URL = "http://localhost:3001"
    const passwordInput = document.getElementById('password');
    const toggleButton = document.getElementById('togglePassword');
    const icon = document.getElementById('iconPassword');

    // Mostrar/ocultar ícono según si hay texto
    passwordInput.addEventListener('input', () => {
        toggleButton.classList.toggle('hidden', passwordInput.value === '');
    });

    toggleButton.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = !isPassword ? 'password' : 'text';
        icon.className = !isPassword ? 'bi bi-eye-slash' : 'bi bi-eye';
    });

    const loginButton = document.getElementById("login");

    let clientes = [];


});