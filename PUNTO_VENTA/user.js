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

        const user = {
            "email": email,
            "password": password
        }
        try {
            // Obtener los clientes desde la API
            const response = await fetch(`${URL}/api/v1/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            if (!response.ok) throw new Error("Error al obtener los datos de los clientes");
            clientes = await response.json();
            console.log(clientes);
            
        } catch (error) {
            notyf.error('Credenciales incorrectas. Intenta nuevamente.')
            return;
        }
        //Buscar el cliente en la lista
        if (email == "admin@gmail.com" && password == "admin123") {
            notyf.success('Inicio de administrador exitoso.')
        }

    });
});