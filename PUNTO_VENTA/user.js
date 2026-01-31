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

    const notyf = new Notyf({
            position: {
                x: 'right',
                y: 'top'
            },
            types: [
                {
                    type: 'warning',
                    background: 'orange',
                }
            ]
    });

    // Validar el login
    loginButton.addEventListener("click", async () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (!email.trim() || !password.trim()) {
            notyf.open({
                type: 'warning',
                message: 'Por favor, completa todos los campos',
            });
            return;
        }

    });
});