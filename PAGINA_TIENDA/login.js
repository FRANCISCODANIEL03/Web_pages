document.addEventListener("DOMContentLoaded", async () => {
    const cartButton = document.getElementById("cart-button");
    const cart = document.getElementById("cart");
    const logoutButton = document.getElementById("logout-button");
    const checkoutButton = document.getElementById("checkout-button");
    const addToCartButton = document.getElementById("add-to-cart-button");
    const storeSelect = document.getElementById("store-select");
    const quantityInput = document.getElementById("quantity");
    const cartList = document.getElementById("cart-list");
    const totalPriceElement = document.getElementById("total-price");
    const client = document.getElementById("client");
    const productList = document.getElementById("product-list");
    const productSelect = document.getElementById("product-select");
    const paginationContainer = document.createElement("div"); // Contenedor de paginación
    paginationContainer.id = "pagination-container";
    productList.parentNode.appendChild(paginationContainer); // Agregar debajo de la lista

    let productos = [];
    let currentPage = 1;
    const itemsPerPage = 10;

    let total = 0;
    let tiendas = [];
    let carrito = [];
    const clientId = localStorage.getItem("clienteId");
    const clientNombre = localStorage.getItem("clienteNombre");
    const clienteId = parseInt(clientId);

    client.textContent = clientNombre

    try {
        // Obtener productos de la API
        const response = await fetch("https://api-tienda-don-pepe.onrender.com/api/v1/productos?limit=100");
        if (!response.ok) throw new Error("Error al obtener los datos de la API");
        productos = await response.json();

        //Obtener las tiendas
        const storeResponse = await fetch("https://api-tienda-don-pepe.onrender.com/api/v1/tiendas");
        if (!storeResponse.ok) throw new Error("Error al obtener los datos de la API");
        tiendas = await storeResponse.json();

        //Cargar el sector de tiendas
        actualizarListaTiendas(tiendas);
        actualizarPaginacion(productos); // Crear botones de paginación
        mostrarPagina(1, productos); // Mostrar la primera página

    } catch (error) {
        console.error("Error:", error.message);
        productList.innerHTML = "<li>Error al cargar los productos</li>";
        storeSelect.innerHTML = "<option>Error al cargar las tiendas</option>";
    }

    // Función para mostrar una página específica
    function mostrarPagina(page, productos) {
        currentPage = page;

        // Calcular el rango de productos a mostrar
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const productosPagina = productos.slice(startIndex, endIndex);

        // Actualizar la lista y el selector
        actualizarListaProductos(productosPagina);
    }

    // Función para actualizar la lista y el selector
    function actualizarListaProductos(productosPagina) {
        productList.innerHTML = "";
        productSelect.innerHTML = "";

        productosPagina.forEach(producto => {
            // Crear un elemento de lista para cada producto
            const li = document.createElement("li");
            li.textContent = `${producto.nombre_producto} - Stock: ${producto.stock} - Precio: $${producto.precio}`;
            li.setAttribute("data-id", producto.id_producto);
            li.setAttribute("title", producto.descripcion || "Sin descripción");
            productList.appendChild(li);

            // Crear una opción para el selector
            const option = document.createElement("option");
            option.value = producto.id_producto;
            option.textContent = producto.nombre_producto;
            option.dataset.price = producto.precio;
            option.dataset.stock = producto.stock;
            productSelect.appendChild(option);
        });
    }

    // Función para crear los botones de paginación
    function actualizarPaginacion(productos) {
        paginationContainer.innerHTML = "";
        const totalPages = Math.ceil(productos.length / itemsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement("button");
            button.textContent = i;
            button.classList.add("pagination-button");
            if (i === currentPage) button.classList.add("active");

            // Evento para cambiar de página
            button.addEventListener("click", () => {
                mostrarPagina(i, productos);
                document.querySelectorAll(".pagination-button").forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
            });

            paginationContainer.appendChild(button);
        }
    }

    // Función para actualizar el selector de tiendas
    function actualizarListaTiendas(tiendas) {
        storeSelect.innerHTML = "";

        tiendas.forEach(tienda => {
            const option = document.createElement("option");
            option.value = tienda.id_tienda; // Usar el ID de la tienda como valor
            option.textContent = tienda.nombre_tienda; // Mostrar el nombre de la tienda
            storeSelect.appendChild(option);
        });
    }

    // Mostrar/ocultar carrito
    cartButton.addEventListener("click", () => {
        cart.classList.toggle("visible");
    });

    // Cerrar sesión
    logoutButton.addEventListener("click", () => {
        // Redirigir a la página de inicio de sesión
        window.location.href='index.html'
    });

});
