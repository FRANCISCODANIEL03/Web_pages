document.addEventListener("DOMContentLoaded", async () => {
    const cartButton = document.getElementById("cart-button");
    const cart = document.getElementById("cart");
    const logoutButton = document.getElementById("logout-button");
    const Result = document.getElementById("result_list");
    const divRes = document.getElementById("result");
    const prodButton = document.getElementById("prod");
    const buyButton = document.getElementById("buy");
    const clientButton = document.getElementById("cliente");
    const searchButton = document.getElementById("search");
    const insButton = document.getElementById("insert");
    const upButton = document.getElementById("update");
    const delButton = document.getElementById("delete");
    const opButton = document.getElementById("btn_op");
    const opFac = document.getElementById("btn_fac");
    const nameL = document.getElementById("name");
    const divId = document.getElementById("did");
    const divIdP = document.getElementById("didp");
    const divNom = document.getElementById("dnombre");
    const divApe1 = document.getElementById("dape1");
    const divApe2 = document.getElementById("dape2");
    const divEm = document.getElementById("demail");
    const divPass = document.getElementById("dpass");
    const divPassc = document.getElementById("dpassc");
    const divNomP = document.getElementById("dnombrep");
    const divDes = document.getElementById("ddescrip");
    const divCat = document.getElementById("dcat");
    const divPrecio = document.getElementById("dprecio");
    const divStock = document.getElementById("dstock");
    const oper = document.getElementById("opera");
    const URL = "http://localhost:3001/api/v1/";
    const IdP = document.getElementById("idp");
    const NomP1 = document.getElementById("nombrep");
    const Des2 = document.getElementById("descrip");
    const Precio1 = document.getElementById("precio");
    const Stock1 = document.getElementById("stock");
    const categoria2 = document.getElementById("category");
    const message1 = document.getElementById("msg")
    const message2 = document.getElementById("msg2")

    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-pass");
    const toggleButton = document.getElementById("togglePassword");
    const toggleButton2 = document.getElementById("togglePassword2");
    const icon = document.getElementById("iconPassword");
    const icon2 = document.getElementById("iconPassword2");

    passwordInput.addEventListener("input", () => {
        toggleButton.classList.toggle("hidden", passwordInput.value === "");
    });

    toggleButton.addEventListener("click", () => {
        const isPassword = passwordInput.type === "password";
        passwordInput.type = !isPassword ? "password" : "text";
        icon.className = !isPassword ? "bi bi-eye-slash" : "bi bi-eye";
    });

    confirmPasswordInput.addEventListener("input", () => {
        toggleButton2.classList.toggle("hidden", confirmPasswordInput.value === "");
    });

    toggleButton2.addEventListener("click", () => {
        const isPassword = confirmPasswordInput.type === "password";
        confirmPasswordInput.type = !isPassword ? "password" : "text";
        icon2.className = !isPassword ? "bi bi-eye-slash" : "bi bi-eye";
    });

    IdP.addEventListener("change", async () => {
        const ID2 = IdP.value.trim();
        if (!ID2) return;

        try {
            const response = await fetch(`${URL}productos/${ID2}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenA}`,
                },
            });

            if (!response.ok) throw new Error("Producto no encontrado");
            const producto = await response.json();

            // Llenar los campos con los datos del producto
            NomP1.value = producto.nombre_producto;
            Des2.value = producto.descripcion || "";
            Precio1.value = producto.precio;
            Stock1.value = producto.stock;
            categoria2.value = producto.categoria || ""; // Asegúrate que el select tenga la opción correcta

            notyf.success("Producto cargado correctamente");
        } catch (error) {
            notyf.error("Producto no registrado en la Base de Datos");

            // Limpiar los campos si no se encuentra
            vaciar();
        }
    });

    let cont = 0;
    let rec = "";
    let op = "";
    let producto = [];
    let compra = [];

    const notyf = new Notyf({
        position: {
            x: "right",
            y: "top",
        },
        types: [
            {
                type: "warning",
                background: "orange",
            },
        ],
    });

    prodButton.addEventListener("click", () => {
        nameL.textContent = "PRODUCTOS";

        [searchButton, insButton, upButton, delButton].forEach((button) => {
            button.style.display = "block"; // Mostrar en el DOM
            button.classList.remove("animated-hidden");
            button.classList.add("animated-visible");
        });

        cont = 1;
        vaciar()
        hiddenI()
        divRes.style.display = "none"
        opButton.style.display = "none";
        message1.style.display = "none";
        message2.style.display = "block";
    });

    buyButton.addEventListener("click", () => {
        nameL.textContent = "COMPRAS";
        [searchButton, delButton].forEach((button) => {
            button.style.display = "block"; // Mostrar en el DOM
            button.classList.remove("animated-hidden");
            button.classList.add("animated-visible");
        });
        [insButton, upButton].forEach((button) => {
            button.classList.remove("animated-visible");
            button.classList.add("animated-hidden");

            // Esperar a que termine la animación antes de ocultar completamente
            setTimeout(() => {
                button.style.display = "none";
            }, 300); // Igual al tiempo del CSS (0.3s)
        });

        cont = 3;
        vaciar()
        hiddenI();
        divRes.style.display = "none";
        opButton.style.display = "none";
        message1.style.display = "none";
        message2.style.display = "block";
    });

    clientButton.addEventListener("click", () => {
        nameL.textContent = "USUARIOS";
        [searchButton, insButton].forEach((button) => {
            button.style.display = "block"; // Mostrar en el DOM
            button.classList.remove("animated-hidden");
            button.classList.add("animated-visible");
        });
        [upButton, delButton].forEach((button) => {
            button.classList.remove("animated-visible");
            button.classList.add("animated-hidden");

            // Esperar a que termine la animación antes de ocultar completamente
            setTimeout(() => {
                button.style.display = "none";
            }, 300); // Igual al tiempo del CSS (0.3s)
        });

        cont = 4;
        vaciar()
        hiddenI();
        divRes.style.display = "none";
        opButton.style.display = "none";
        message1.style.display = "none";
        message2.style.display = "block";
    });

    searchButton.addEventListener("click", () => {
        hiddenI();
        oper.textContent = "BUSCAR";
        oper.style.display = "block";
        op = "search";
        switch (cont) {
            case 1:
                rec = "product";
                divId.style.display = "block";
                break;
            case 3:
                rec = "buy";
                divId.style.display = "block";
                break;
            case 4:
                rec = "client";
                divEm.style.display = "block"
                divPass.style.display = "block"
                break;
        }
        opButton.style.display = "block";
        divRes.style.display = "none";
        vaciar();
        message2.style.display = "none";
    });

    insButton.addEventListener("click", () => {
        hiddenI();
        oper.textContent = "INSERTAR";
        oper.style.display = "block";
        op = "insert";
        switch (cont) {
            case 1:
                divNomP.style.display = "block";
                divDes.style.display = "block";
                divCat.style.display = "block";
                divPrecio.style.display = "block";
                divStock.style.display = "block";
                rec = "product";
                break;
            case 4:
                divNom.style.display = "block";
                divApe1.style.display = "block";
                divApe2.style.display = "block";
                divEm.style.display = "block";
                divPass.style.display = "block";
                divPassc.style.display = "block";
                rec = "client";
                break;
        }
        opButton.style.display = "block";
        divRes.style.display = "none";
        vaciar();
        message2.style.display = "none";
    });

    upButton.addEventListener("click", () => {
        hiddenI();
        oper.textContent = "ACTUALIZAR";
        oper.style.display = "block";
        op = "update";
        divId.style.display = "block";
        switch (cont) {
            case 1:
                divId.style.display = "none";
                divIdP.style.display = "block";
                divNomP.style.display = "block";
                divDes.style.display = "block";
                divCat.style.display = "block";
                divPrecio.style.display = "block";
                divStock.style.display = "block";
                rec = "product";
                break;
            case 4:
                divNom.style.display = "block";
                divApe1.style.display = "block";
                divApe2.style.display = "block";
                divEm.style.display = "block";
                divPass.style.display = "block";
                divPassc.style.display = "block";
                rec = "client";
                break;
        }
        opButton.style.display = "block";
        divRes.style.display = "none";
        vaciar();
        message2.style.display = "none";
    });

    delButton.addEventListener("click", () => {
        hiddenI();
        oper.textContent = "ELIMINAR";
        oper.style.display = "block";
        op = "delete";
        divId.style.display = "block";
        switch (cont) {
            case 1:
                rec = "product";
                break;
            case 3:
                rec = "buy";
                break;
            case 4:
                rec = "client";
                break;
        }
        opButton.style.display = "block";
        divRes.style.display = "none";
        vaciar();
        message2.style.display = "none";
    });

    const tokenA = localStorage.getItem("token");
    const vaciar = () => {
        document.getElementById("id").value = "";
        document.getElementById("idp").value = "";
        document.getElementById("nombre").value = "";
        document.getElementById("ape1").value = "";
        document.getElementById("ape2").value = "";
        document.getElementById("nombrep").value = "";
        document.getElementById("descrip").value = "";
        document.getElementById("precio").value = "";
        document.getElementById("stock").value = "";
        document.getElementById("category").selectedIndex = 0;
        document.getElementById("email").value == "";
        document.getElementById("password").value == "";
        document.getElementById("confirm-pass").value == "";
    };
    opButton.addEventListener("click", async () => {
        const Id = document.getElementById("id").value;
        const Nom = document.getElementById("nombre").value;
        const Ape1 = document.getElementById("ape1").value;
        var Ape2 = document.getElementById("ape2").value;
        const NomP = document.getElementById("nombrep").value;
        const Des = document.getElementById("descrip").value;
        const categoria = document.getElementById("category").value;
        const Precio1 = document.getElementById("precio");
        const Precio = parseFloat(Precio1.value);
        const Stock1 = document.getElementById("stock");
        const Stock = parseInt(Stock1.value);
        const ID = parseInt(Id);
        Result.innerHTML = "";
        if (op == "search" && rec == "product") {
            if (ID < 1 || isNaN(ID)) {
                notyf.open({
                    type: "warning",
                    message: "Por favor, ingresa un id valido",
                });
                return;
            }
            try {
                // Obtener productos de la API
                const response = await fetch(`${URL}productos/${ID}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tokenA}`,
                    },
                });
                if (!response.ok)
                    throw new Error("Error al obtener los datos de la API");
                producto = await response.json();
            } catch (error) {
                notyf.error("Producto no registrado en la Base de Datos");
                return;
            }
            const li = document.createElement("li");
            li.innerHTML = `Id: ${producto.id_producto}<br> 
                            -> Nombre: ${producto.nombre_producto}<br>  
                            -> Descripcion: ${producto.descripcion || "Sin descripcion"}<br>
                            -> Categoria: ${producto.categoria}<br>
                            -> Precio: ${producto.precio}<br>
                            -> Stock: ${producto.stock}<br>`;
            Result.appendChild(li);
            divRes.style.display = "block";
        } else if (op == "search" && rec == "buy") {
            if (ID < 1 || isNaN(ID)) {
                notyf.open({
                    type: "warning",
                    message: "Por favor, ingresa un id valido",
                });
                return;
            }
            try {
                // Obtener compra de la API
                const response = await fetch(`${URL}compras/${ID}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tokenA}`,
                    },
                });
                if (!response.ok)
                    throw new Error("Error al obtener los datos de la API");
                compra = await response.json();
            } catch (error) {
                console.log(error);
                notyf.error("Compra no registrada en la Base de Datos");
                return;
            }

            // Crear elementos para mostrar la información
            const liCompra = document.createElement("li");
            liCompra.innerHTML = `
                <strong>Id de la compra:</strong> ${compra.id_compra}<br>
                <strong>Fecha de compra:</strong> ${new Date(
                compra.fecha_compra
            ).toLocaleDateString()}<br>
                <strong>Tienda:</strong> ${compra.tienda_.nombre_tienda}<br>
            `;
            Result.appendChild(liCompra);

            // Información del cliente
            const liCliente = document.createElement("li");
            liCliente.innerHTML = `
                <strong>Cliente:</strong> ${compra.cliente_.nombre_cliente} ${compra.cliente_.apellido1
                } ${compra.cliente_.apellido2 || "---"}
            `;
            Result.appendChild(liCliente);

            // Detalles de la compra
            compra.detalles_.forEach((detalle, index) => {
                const liDetalle = document.createElement("li");
                liDetalle.innerHTML = `
                    <strong>Producto ${index + 1}:</strong><br>
                    - Nombre del producto: ${detalle.producto.nombre_producto
                    }<br>
                    - Descripción: ${detalle.producto.descripcion || "Sin descripción"
                    }<br>
                    - Precio unitario: $${detalle.producto.precio.toFixed(
                        2
                    )}<br>
                    - Cantidad comprada: ${detalle.cantidad_productos}<br>
                    - Total: $${detalle.total.toFixed(2)}<br>
                `;
                Result.appendChild(liDetalle);
            });

            // Mostrar el contenedor de resultados
            divRes.style.display = "block";
            opFac.style.display = "block";
        } else if (op == "insert" && rec == "product") {
            if (!NomP.trim() || !Des.trim() || !Precio1.value.trim() || !Stock1.value.trim()) {
                notyf.open({
                    type: 'warning',
                    message: 'Por favor, completa todos los campos',
                });
                return;
            }
            const nuevoProd = {
                nombre_producto: NomP,
                descripcion: Des,
                precio: Precio,
                stock: Stock,
                categoria: categoria,
            };
            try {
                const response = await fetch(`${URL}productos`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tokenA}`,
                    },
                    body: JSON.stringify(nuevoProd),
                });

                if (!response.ok) {
                    notyf.error("Producto ya registrado en la Base de Datos");
                    return;
                }

                data = await response.json();
                notyf.success(
                    `Producto registrado exitosamente con el ID: ${data.id_producto}`
                );
                vaciar();
            } catch (error) {
                console.error(error);
                notyf.error("Hubo un problema al registrar el producto.");
                return;
            }
        } else if (op == "insert" && rec == "client") {
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirm-pass").value;
            if (
                !Nom.trim() ||
                !Ape1.trim() ||
                !email.trim() ||
                !password.trim() ||
                !confirmPassword.trim()
            ) {
                notyf.open({
                    type: "warning",
                    message: "Por favor, completa todos los campos",
                });
                return;
            }
            if (password !== confirmPassword) {
                notyf.error("Las constraseñas no coinciden");
                return;
            }
            // Crear el objeto a enviar
            if (Ape2 == "") {
                Ape2 = null;
            }

            var data = null;

            const nuevoUsuario = {
                nombre: Nom,
                apellido1: Ape1,
                apellido2: Ape2,
                password: password,
                email: email,
            };
            try {
                const response = await fetch(`${URL}auth/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(nuevoUsuario),
                });
                data = await response.json();
                console.log(data);
                if (!response.ok) {
                    throw new Error("Error al registrar el usuario");
                }
                notyf.success("Usuario registrado exitosamente");
                vaciar()
            } catch (error) {
                console.error(error);
                for (const err of data.message) {
                    notyf.error(err);
                }
            }
        } else if (op == "search" && rec == "client") {
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
                const response = await fetch(`${URL}auth/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                });
                if (!response.ok) throw new Error("Error al obtener los datos de los clientes");
                clientes = await response.json();
                const li = document.createElement("li");
                li.innerHTML = `Id: ${clientes.id}<br> 
                            -> Nombre: ${clientes.nombre}<br>  
                            -> Apellido1: ${clientes.apellido1}<br>
                            -> Apellido2: ${clientes.apellido2 || "---"}<br>
                            -> Email: ${clientes.email}<br>
                            -> Role: ${clientes.role}<br>`;
                Result.appendChild(li);
                divRes.style.display = "block";
            } catch (error) {
                notyf.error('Credenciales incorrectas. Intenta nuevamente.')
                divRes.style.display = "none";
                return;
            }
        }
        else if (op == "update" && rec == "product") {
            if (!NomP.trim() || !Des.trim() || !Precio1.value.trim() || !Stock1.value.trim()) {
                notyf.open({
                    type: 'warning',
                    message: 'Por favor, completa todos los campos',
                });
                return;
            }
            const idp = parseInt(IdP.value);
            const updateProd = {
                nombre_producto: NomP,
                descripcion: Des,
                precio: Precio,
                stock: Stock,
                categoria: categoria,
            };
            try {
                const response = await fetch(`${URL}productos/${idp}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tokenA}`,
                    },
                    body: JSON.stringify(updateProd),
                });
                data = await response.json();
                notyf.success(`Producto actualizado exitosamente con el ID: ${idp}`);
                vaciar();
            } catch (error) {
                console.error("Error:", error.message);
                notyf.error("Hubo un problema al actualizar el producto.");
                return;
            }
        } else if (op == "delete" && rec == "product") {
            if (ID < 1 || isNaN(ID)) {
                notyf.open({
                    type: "warning",
                    message: "Por favor, ingresa un id valido",
                });
                return;
            }
            const confirmado = await mostrarConfirmacion("¿Estás seguro de eliminar este producto?");
            if (!confirmado) {
                notyf.error("Eliminación cancelada")
                vaciar()
                return;
            }
            try {
                const response = await fetch(`${URL}productos/${ID}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tokenA}`,
                    },
                });

                // Verificar si la eliminación fue exitosa
                if (!response.ok) {
                    notyf.error("Producto no registrado en la Base de Datos");
                    return;
                }
                // Mostrar mensaje de éxito si se eliminó correctamente
                notyf.success(`Producto con ID ${ID} eliminado exitosamente.`);
                vaciar();
            } catch (error) {
                console.error("Error:", error.message);
                notyf.error(
                    "Hubo un problema al eliminar el producto, Por favor, inténtalo de nuevo más tarde."
                );
            }
        } else if (op == "delete" && rec == "buy") {
            if (ID < 1 || isNaN(ID)) {
                notyf.open({
                    type: "warning",
                    message: "Por favor, ingresa un id valido",
                });
                return;
            }
            const confirmado = await mostrarConfirmacion("¿Estás seguro de eliminar esta compra?");
            if (!confirmado) {
                notyf.error("Eliminación cancelada")
                vaciar()
                return;
            }
            try {
                const response = await fetch(`${URL}compras/${ID}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tokenA}`,
                    },
                });

                // Verificar si la eliminación fue exitosa
                if (!response.ok) {
                    notyf.error("Compra no registrado en la Base de Datos");
                    return;
                }
                // Mostrar mensaje de éxito si se eliminó correctamente
                notyf.success(`Compra con ID ${ID} eliminado exitosamente.`);
            } catch (error) {
                console.error("Error:", error.message);
                notyf.error(
                    "Hubo un problema al eliminar la compra, Por favor, inténtalo de nuevo más tarde."
                );
            }
        }
    });

    function mostrarConfirmacion(mensaje) {
        return new Promise((resolve) => {
            const modal = document.getElementById("confirmModal");
            const message = document.getElementById("confirmMessage");
            const btnYes = document.getElementById("confirmYes");
            const btnNo = document.getElementById("confirmNo");

            message.textContent = mensaje;
            modal.style.display = "flex";

            const limpiar = () => {
                modal.style.display = "none";
                btnYes.removeEventListener("click", onYes);
                btnNo.removeEventListener("click", onNo);
            };

            const onYes = () => {
                limpiar();
                resolve(true);
            };

            const onNo = () => {
                limpiar();
                resolve(false);
            };

            btnYes.addEventListener("click", onYes);
            btnNo.addEventListener("click", onNo);
        });
    }

    // Mostrar/ocultar recursos
    cartButton.addEventListener("click", () => {
        cart.classList.toggle("visible");
        setTimeout(() => {
            cart.classList.toggle("visible");
        }, 4000);
    });

    // Cerrar sesión
    logoutButton.addEventListener("click", () => {
        // Redirigir a la página de inicio de sesión
        window.location.href = "index.html";
    });

    //Ocultar los inputs
    function hiddenI() {
        divId.style.display = "none";
        divIdP.style.display = "none";
        divNom.style.display = "none";
        divApe1.style.display = "none";
        divApe2.style.display = "none";
        divDes.style.display = "none";
        divCat.style.display = "none";
        divEm.style.display = "none";
        divNomP.style.display = "none";
        divPrecio.style.display = "none";
    }

});
