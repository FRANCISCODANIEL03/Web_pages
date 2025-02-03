document.addEventListener("DOMContentLoaded", async () => {
    const userIdInput = document.getElementById("user-input");
    const userNameInput = document.getElementById("user-name");
    const loginButton = document.getElementById("login");

    let clientes = [];

    // Validar el login
    loginButton.addEventListener("click", async () => {
        const userId = parseInt(userIdInput.value);
        const userName = userNameInput.value.trim();
        if (!userId || !userName) {
            Swal.fire({
                title:"Por favor, completa todos los campos.",
                icon:"warning"
            })
            return;
        }
        if(userId < 0){
            Swal.fire({
                title:"Por favor, ingresa un id valido",
                icon:"warning"
            })
            return;
        }
        try {
            // Obtener los clientes desde la API
            const response = await fetch(`https://api-tienda-don-pepe.onrender.com/api/v1/clientes/${userId}`);
            if (!response.ok) throw new Error("Error al obtener los datos de los clientes");
            clientes = await response.json();
        } catch (error) {
            console.error("Error:", error.message);
            Swal.fire({
                title:"Error al cargar los datos. Inténtalo más tarde.",
                icon:"error"
            })
            return;
        }


        // Buscar el cliente en la lista
        if(userId == 1 && userName == "admin"){
            Swal.fire({
                title:"Inicio de administrador exitoso.",
                icon:"success"
            })

            // Almacenar los datos del usuario en localStorage
            localStorage.setItem("clienteId", 0);
            localStorage.setItem("clienteNombre", "admin");

            // Redirigir o realizar alguna acción
            setTimeout(() => {
                window.location.href = "admin.html"; // Cambiar por la URL de tu página principal
            }, 1000);
            return;
        }
        if (clientes) {
            Swal.fire({
                title:"Inicio de sesión exitoso.",
                icon:"success"
            })

            // Almacenar los datos del usuario en localStorage
            localStorage.setItem("clienteId", clientes.id_cliente);
            localStorage.setItem("clienteNombre", clientes.nombre_cliente);

            // Redirigir o realizar alguna acción
            setTimeout(() => {
                window.location.href = "login.html"; // Cambiar por la URL de tu página principal
            }, 1000);
        } else {
            Swal.fire({
                title:"Credenciales incorrectas. Intenta nuevamente.",
                icon:"error"
            })
        }
    });
});