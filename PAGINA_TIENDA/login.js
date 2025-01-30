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


});
