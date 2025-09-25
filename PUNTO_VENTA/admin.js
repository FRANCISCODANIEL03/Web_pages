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
            Stock1.value = producto.stock
            categoria2.value = producto.categoria || ""; // Asegúrate que el select tenga la opción correcta

            notyf.success("Producto cargado correctamente");
        } catch (error) {
            
        }
    });

});
