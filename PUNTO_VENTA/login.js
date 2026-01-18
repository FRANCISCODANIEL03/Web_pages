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

        // Crear nuevo elemento visual
        const listItem = document.createElement("li");

        const totalProductPrice = productPrice * quantity;
        listItem.dataset.productId = productId;
        listItem.dataset.quantity = quantity;
        listItem.dataset.total = totalProductPrice;

        const contentDiv = document.createElement("div");
        contentDiv.innerHTML = `
        Producto: ${productName}<br>
        Cantidad: <span class="quantity">${quantity}</span><br>
        Total: $<span class="item-total">${totalProductPrice.toFixed(2)}</span>
    `;

        // Botón aumentar
        increaseButton.addEventListener("click", () => {
            let stock = parseInt(option.dataset.stock);
            if (stock < 1) return;

            let qty = parseInt(listItem.dataset.quantity) + 1;
            let newTotal = qty * productPrice;
            listItem.dataset.quantity = qty;
            listItem.dataset.total = newTotal;
            contentDiv.querySelector(".quantity").textContent = qty;
            contentDiv.querySelector(".item-total").textContent = newTotal.toFixed(2);

            option.dataset.stock = stock - 1;

            const producto = productos.find(p => p.id_producto === parseInt(productId));
            if (producto) producto.stock = stock - 1;
            localStorage.setItem("productosConStock", JSON.stringify(productos));

            updateProductDisplay(productId, productName, stock - 1, productPrice);

            const index = carrito.findIndex(p => p.productoId === parseInt(productId));
            if (index !== -1) {
                carrito[index].cantidad_productos = qty;
                saveCartToLocalStorage()
            }

            total += productPrice;
            updateTotals();

            if (qty > 1) decreaseButton.disabled = false;
            if (stock - 1 <= 0) {
                increaseButton.disabled = true;
            }

            const li = document.querySelector(`li[data-id="${productId}"]`);
            if (li) aplicarEstiloStock(li, stock - 1);
        });

        // Botón disminuir
        decreaseButton.addEventListener("click", () => {
            let qty = parseInt(listItem.dataset.quantity);
            if (qty <= 1) return;

            qty -= 1;
            let newTotal = qty * productPrice;
            listItem.dataset.quantity = qty;
            listItem.dataset.total = newTotal;
            contentDiv.querySelector(".quantity").textContent = qty;
            contentDiv.querySelector(".item-total").textContent = newTotal.toFixed(2);

            let stock = parseInt(option.dataset.stock) + 1;
            option.dataset.stock = stock;

            const producto = productos.find(p => p.id_producto === parseInt(productId));
            if (producto) producto.stock = stock;
            localStorage.setItem("productosConStock", JSON.stringify(productos));

            updateProductDisplay(productId, productName, stock, productPrice);

            const index = carrito.findIndex(p => p.productoId === parseInt(productId));
            if (index !== -1) {
                carrito[index].cantidad_productos = qty;
                saveCartToLocalStorage()
            }
            total -= productPrice;
            updateTotals();

            if (qty <= 1) decreaseButton.disabled = true;
            if (stock > 0) {
                increaseButton.disabled = false;
            }

            const li = document.querySelector(`li[data-id="${productId}"]`);
            if (li) aplicarEstiloStock(li, stock);

        });

        // Botón eliminar
        deleteButton.addEventListener("click", () => {
            const itemTotal = parseFloat(listItem.dataset.total);
            const itemQuantity = parseInt(listItem.dataset.quantity);
            cartList.removeChild(listItem);

            let stock = parseInt(option.dataset.stock) + itemQuantity;
            option.dataset.stock = stock;

            const producto = productos.find(p => p.id_producto === parseInt(productId));
            if (producto) producto.stock = stock;
            localStorage.setItem("productosConStock", JSON.stringify(productos));

            updateProductDisplay(productId, productName, stock, productPrice);

            total -= itemTotal;
            updateTotals();

            const index = carrito.findIndex(p => p.productoId === parseInt(productId));
            if (index !== -1) carrito.splice(index, 1);

            saveCartToLocalStorage();

            notyf.success(`Producto eliminado del carrito: ${productName}`);
            if (carrito.length == 0) {
                totalPriceElement.innerHTML = `<strong>Carrito vacío</strong>`;
            }

            const li = document.querySelector(`li[data-id="${productId}"]`);
            if (li) aplicarEstiloStock(li, stock);

        });

        // Contenedor de botones
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("btncont");
        buttonContainer.appendChild(increaseButton);
        buttonContainer.appendChild(decreaseButton);
        buttonContainer.appendChild(deleteButton);

        // Agregar al DOM
        listItem.appendChild(contentDiv);
        listItem.appendChild(buttonContainer);
        cartList.appendChild(listItem);

        // Desactivar botones según stock y cantidad
        if (quantity <= 1) decreaseButton.disabled = true;
        if (parseInt(option.dataset.stock) <= 0) {
            increaseButton.disabled = true;
        } else {
            increaseButton.disabled = false;
        }

        // Agregar al arreglo del carrito
        if (!skipPush) {
            carrito.push({ productoId: parseInt(productId), cantidad_productos: quantity });
            saveCartToLocalStorage();

            let newStock = parseInt(option.dataset.stock) - quantity;
            option.dataset.stock = newStock;
            updateProductDisplay(productId, productName, newStock, productPrice);

            const producto = productos.find(p => p.id_producto === parseInt(productId));
            if (producto) producto.stock = newStock;
            localStorage.setItem("productosConStock", JSON.stringify(productos));

            notyf.success(`Agregado al carrito: ${productName} - Cantidad: ${quantity}`);

            const li = document.querySelector(`li[data-id="${productId}"]`);
            if (li) aplicarEstiloStock(li, newStock);

        }


    }

});
