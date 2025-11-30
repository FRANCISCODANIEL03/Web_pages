document.addEventListener("DOMContentLoaded", async () => {
    const URL = "http://localhost:3001"
    const cartButton = document.getElementById("cart-button");
    const cart = document.getElementById("cart");
    const logoutButton = document.getElementById("logout-button");
    const checkoutButton = document.getElementById("checkout-button");
    const downloadBtn = document.getElementById("downloadBtn");
    const addToCartButton = document.getElementById("add-to-cart-button");
    const quantityInput = document.getElementById("quantity");
    const cartList = document.getElementById("cart-list");
    const totalPriceElement = document.getElementById("total-price");
    const client = document.getElementById("client");
    const productList = document.getElementById("product-list");
    const productSelect = document.getElementById("product-select");
    const categoryFilter = document.getElementById("categoryFilter");
    const paginationContainer = document.createElement("div"); // Contenedor de paginación
    paginationContainer.id = "pagination-container";
    productList.parentNode.appendChild(paginationContainer); // Agregar debajo de la lista

    let productos = [];
    let currentPage = 1;
    const itemsPerPage = 10;

    let total = 0;
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito.length == 0) {
        totalPriceElement.innerHTML = `<strong>Carrito vacío</strong>`;
    }

    // Función para guardar en localStorage
    function saveCartToLocalStorage() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
        localStorage.setItem("productosConStock", JSON.stringify(productos));
    }

    function updateTotals() {
        const IVA = total * 0.16;
        totalPriceElement.textContent = `Subtotal: $${total.toFixed(2)} + 
        IVA $${IVA.toFixed(2)}
        Total: $${(total + IVA).toFixed(2)}`;
    }

    function updateProductDisplay(id, name, stock, price) {
        const productElement = productList.querySelector(`[data-id="${id}"]`);
        if (productElement) {
            productElement.textContent = `${name} - Stock: ${stock} - Precio: $${price}`;
        }
    }

    // Función para crear un nuevo item
    function addNewCartItem(productId, productName, productPrice, quantity, option, skipPush = false) {
        // Crear botones
        const increaseButton = document.createElement("button");
        increaseButton.classList.add("btns");
        increaseButton.innerHTML = `<i class="bi bi-plus"></i>`;

        const decreaseButton = document.createElement("button");
        decreaseButton.classList.add("btns");
        decreaseButton.innerHTML = `<i class="bi bi-dash"></i>`;

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btns");
        deleteButton.innerHTML = `<i class="bi bi-trash"></i>`;

});
