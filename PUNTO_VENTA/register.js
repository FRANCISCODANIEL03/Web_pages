document.addEventListener("DOMContentLoaded", async () => {
    const URL = "http://localhost:3001"
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-pass');
    const toggleButton = document.getElementById('togglePassword');
    const toggleButton2 = document.getElementById('togglePassword2');
    const icon = document.getElementById('iconPassword');
    const icon2 = document.getElementById('iconPassword2');

    // Mostrar/ocultar ícono según si hay texto
    passwordInput.addEventListener('input', () => {
        toggleButton.classList.toggle('hidden', passwordInput.value === '');
    });

    toggleButton.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = !isPassword ? 'password' : 'text';
        icon.className = !isPassword ? 'bi bi-eye-slash' : 'bi bi-eye';
    });

    confirmPasswordInput.addEventListener('input', () => {
        toggleButton2.classList.toggle('hidden', confirmPasswordInput.value === '');
    });

    toggleButton2.addEventListener('click', () => {
        const isPassword = confirmPasswordInput.type === 'password';
        confirmPasswordInput.type = !isPassword ? 'password' : 'text';
    });


});