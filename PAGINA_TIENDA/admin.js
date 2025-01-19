document.addEventListener("DOMContentLoaded", async () => {
    const cartButton = document.getElementById("cart-button");
    const cart = document.getElementById("cart");
    const logoutButton = document.getElementById("logout-button");
    const Result = document.getElementById("result_list");
    const divRes = document.getElementById("result");
    const prodButton = document.getElementById("prod");
    const storeButton = document.getElementById("store");
    const buyButton = document.getElementById("buy");
    const clientButton = document.getElementById("cliente");
    const searchButton = document.getElementById("search");
    const insButton = document.getElementById("insert");
    const upButton = document.getElementById("update");
    const delButton = document.getElementById("delete");
    const opButton = document.getElementById("btn_op");
    const nameL = document.getElementById("name");
    const divId = document.getElementById("did");
    const divNom = document.getElementById("dnombre");
    const divApe1 = document.getElementById("dape1");
    const divApe2 = document.getElementById("dape2");
    const divFn = document.getElementById("dfecha");
    const divNomT = document.getElementById("dnombret");
    const divPunt = document.getElementById("dpuntos");
    const divNomP = document.getElementById("dnombrep");
    const divDes = document.getElementById("ddescrip");
    const divPrecio = document.getElementById("dprecio");
    const divStock = document.getElementById("dstock");
    const oper = document.getElementById("opera");

    let cont = 0;
    let rec = "";
    let op = "";
    let producto = [];
    let tienda = [];
    let compra = [];
    let cliente = [];
    let data = []

    prodButton.addEventListener("click", () =>{
        hiddenB()
        nameL.textContent = "PRODUCTOS"
        searchButton.style.display = "block"
        insButton.style.display = "block"
        upButton.style.display = "block"
        delButton.style.display = "block"

        cont = 1;
    })

    storeButton.addEventListener("click", () =>{
        hiddenB()
        nameL.textContent = "TIENDAS"
        searchButton.style.display = "block"
        insButton.style.display = "block"
        upButton.style.display = "block"
        delButton.style.display = "block"
        cont = 2;
    })

    buyButton.addEventListener("click", () =>{
        hiddenB()
        nameL.textContent = "COMPRAS"
        searchButton.style.display = "block"
        delButton.style.display = "block"

        cont = 3;
    })

    clientButton.addEventListener("click", () =>{
        hiddenB()
        nameL.textContent = "CLIENTES"
        searchButton.style.display = "block"
        insButton.style.display = "block"
        upButton.style.display = "block"
        delButton.style.display = "block"

        cont = 4;
    })

    searchButton.addEventListener("click", () =>{
        hiddenI()
        oper.textContent = "BUSCAR"
        oper.style.display = "block"
        op = "search"
        divId.style.display = "block"
        switch(cont){
            case 1:
                rec = "product";
            break;
            case 2:
                rec = "store";
            break;
            case 3:
                rec = "buy";
            break;
            case 4:
                rec = "client";
            break;
        }
         opButton.style.display = "block"
    })

    insButton.addEventListener("click", () =>{
        hiddenI()
        oper.textContent = "INSERTAR"
        oper.style.display = "block"
        op = "insert"
        switch(cont){
            case 1:
                divNomP.style.display = "block"
                divDes.style.display = "block"
                divPrecio.style.display = "block"
                divStock.style.display = "block"
                rec = "product"
            break;
            case 2:
                divNomT.style.display = "block"
                rec = "store"
            break;
            case 4:
                divNom.style.display = "block"
                divApe1.style.display = "block"
                divApe2.style.display = "block"
                divFn.style.display = "block"
                divPunt.style.display = "block"
                rec = "client"
            break;
        }
         opButton.style.display = "block"
    })

    upButton.addEventListener("click", () =>{
        hiddenI()
        oper.textContent = "ACTUALIZAR"
        oper.style.display = "block"
        op = "update"
        divId.style.display = "block"
        switch(cont){
            case 1:
                divNomP.style.display = "block"
                divDes.style.display = "block"
                divPrecio.style.display = "block"
                divStock.style.display = "block"
                rec = "product"
            break;
            case 2:
                divNomT.style.display = "block"
                rec = "store"
            break;
            case 4:
                divNom.style.display = "block"
                divApe1.style.display = "block"
                divApe2.style.display = "block"
                divFn.style.display = "block"
                divPunt.style.display = "block"
                rec = "client"
            break;
        }
        opButton.style.display = "block"
    })

    delButton.addEventListener("click", () =>{
        hiddenI()
        oper.textContent = "ELIMINAR"
        oper.style.display = "block"
        op = "delete"
        divId.style.display = "block"
        switch(cont){
            case 1:
                rec = "product";
            break;
            case 2:
                rec = "store";
            break;
            case 3:
                rec = "buy";
            break;
            case 4:
                rec = "client";
            break;
        }
        opButton.style.display = "block"
    })

    opButton.addEventListener("click", async () =>{
        const Id = document.getElementById("id").value;
        const Nom = document.getElementById("nombre").value;
        const Ape1 = document.getElementById("ape1").value;
        var Ape2 = document.getElementById("ape2").value;
        var Fn = document.getElementById("fecha").value;
        const NomT = document.getElementById("nombret").value;
        var Punt = parseInt(document.getElementById("puntos").value);
        const NomP = document.getElementById("nombrep").value;
        const Des = document.getElementById("descrip").value;
        const Precio = parseFloat(document.getElementById("precio").value);
        const Stock = parseInt(document.getElementById("stock").value);
        const ID = parseInt(Id)
        Result.innerHTML = ""

        if(ID < 1){
            Swal.fire({
                title:"Por favor, ingresa un id valido",
                icon:"warning"
            })
            return;
        }
        if(Punt < 0){
            Swal.fire({
                title:"Por favor, ingresa puntos validos",
                icon:"warning"
            })
            return;
        }
        if(Precio < 1){
            Swal.fire({
                title:"Por favor, ingresa un precio valido",
                icon:"warning"
            })
            return;
        }
        if(Stock < 0){
            Swal.fire({
                title:"Por favor, ingresa un stock valido",
                icon:"warning"
            })
            return;
        }

        if(op == "search" && rec == "product"){
            try{
             // Obtener productos de la API
            const response = await fetch(`https://api-tienda-don-pepe.onrender.com/api/v1/productos/${ID}`);
            if (!response.ok) throw new Error("Error al obtener los datos de la API");
            producto = await response.json();
            }catch (error) {
                Swal.fire({
                    title:"Producto no registrado en la Base de Datos",
                    icon:"error"
                })
                return;
            }
            const li = document.createElement("li");
            li.innerHTML = `Id: ${producto.id_producto}<br> 
                            -> Nombre: ${producto.nombre_producto}<br>  
                            -> Descripcion: ${producto.descripcion}<br>
                            -> Precio: ${producto.precio}<br>
                            -> Stock: ${producto.stock}<br>`;
            Result.appendChild(li)
            divRes.style.display = "block"
        }
        else if(op == "search" && rec == "store"){
            try{
                // Obtener productos de la API
               const response = await fetch(`https://api-tienda-don-pepe.onrender.com/api/v1/tiendas/${ID}`);
               if (!response.ok) throw new Error("Error al obtener los datos de la API");
               tienda = await response.json();
               }catch (error) {
                Swal.fire({
                    title:"Tienda no registrada en la Base de Datos",
                    icon:"error"
                })
                return;
               }
            const li = document.createElement("li");
           li.innerHTML = `Id: ${tienda.id_tienda}<br> 
                           -> Nombre de la tienda: ${tienda.nombre_tienda}<br>`;
           Result.appendChild(li)
           divRes.style.display = "block"
        }
        else if(op == "search" && rec == "buy"){
            try {
                // Obtener compra de la API
                const response = await fetch(`https://api-tienda-don-pepe.onrender.com/api/v1/compras/${ID}`);
                if (!response.ok) throw new Error("Error al obtener los datos de la API");
            
                compra = await response.json();
            } catch (error) {
                Swal.fire({
                    title:"Compra no registrada en la Base de Datos",
                    icon:"error"
                })
                return;
            }
            
            // Crear elementos para mostrar la información
            const liCompra = document.createElement("li");
            liCompra.innerHTML = `
                <strong>Id de la compra:</strong> ${compra.id_compra}<br>
                <strong>Fecha de compra:</strong> ${new Date(compra.fecha_compra).toLocaleDateString()}<br>
                <strong>Tienda:</strong> ${compra.tienda_.nombre_tienda}<br>
            `;
            Result.appendChild(liCompra);
            
            // Información del cliente
            const liCliente = document.createElement("li");
            liCliente.innerHTML = `
                <strong>Cliente:</strong> ${compra.cliente_.nombre_cliente} ${compra.cliente_.apellido1} ${compra.cliente_.apellido2}<br>
                <strong>Fecha de nacimiento:</strong> ${new Date(compra.cliente_.fecha_nacimiento).toLocaleDateString()}<br>
                <strong>Puntos acumulados:</strong> ${compra.cliente_.puntos_compra}<br>
            `;
            Result.appendChild(liCliente);
            
            // Detalles de la compra
            compra.detalles_.forEach((detalle, index) => {
                const liDetalle = document.createElement("li");
                liDetalle.innerHTML = `
                    <strong>Producto ${index + 1}:</strong><br>
                    - Nombre del producto: ${detalle.producto.nombre_producto}<br>
                    - Descripción: ${detalle.producto.descripcion || "Sin descripción"}<br>
                    - Precio unitario: $${detalle.producto.precio.toFixed(2)}<br>
                    - Cantidad comprada: ${detalle.cantidad_productos}<br>
                    - Total: $${detalle.total.toFixed(2)}<br>
                `;
                Result.appendChild(liDetalle);
            });
        
            // Mostrar el contenedor de resultados
            divRes.style.display = "block"; 
        }
        else if(op == "search" && rec == "client"){
            try {
                // Obtener cliente de la API
                const response = await fetch(`https://api-tienda-don-pepe.onrender.com/api/v1/clientes/${ID}`);
                if (!response.ok) throw new Error("Error al obtener los datos de la API");
                
                cliente = await response.json();
            } catch (error) {
                Swal.fire({
                    title: "Cliente no registrado en la Base de Datos",
                    icon:"error"
                })
                return;
            }
            // Crear elementos para mostrar la información
            const liCliente = document.createElement("li");
            liCliente.innerHTML = `
                <strong>ID Cliente:</strong> ${cliente.id_cliente}<br>
                <strong>Nombre:</strong> ${cliente.nombre_cliente} ${cliente.apellido1 || ""} ${cliente.apellido2 || ""}<br>
                <strong>Fecha de Nacimiento:</strong> ${new Date(cliente.fecha_nacimiento).toLocaleDateString()}<br>
                <strong>Puntos de Compra:</strong> ${cliente.puntos_compra}<br>
                <strong>Fecha de Registro:</strong> ${new Date(cliente.fecha_registro).toLocaleDateString()}<br>
            `;
            Result.appendChild(liCliente);
                
            // Mostrar el contenedor de resultados
            divRes.style.display = "block";        
        }
        else if(op == "insert" && rec == "product"){
            const nuevoProd = {
                nombre_producto: NomP,
                descripcion: Des,
                precio: Precio,
                stock:Stock
            };
            try {
                const response = await fetch("https://api-tienda-don-pepe.onrender.com/api/v1/productos", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(nuevoProd)
                });
                // Verificar si la eliminación fue exitosa
                if (!response.ok) {
                    Swal.fire({
                        title: "Producto ya registrado en la Base de Datos",
                        icon: "error",
                    });
                    return;
                }
                data = await response.json()
            } catch (error) {
                console.error(error);
                Swal.fire({
                    title:"Hubo un problema al registrar el producto.",
                    icon:"error"
                })
                return
            }
            Swal.fire({
                title:`Producto registrado exitosamente con el ID: ${data.id_producto}`,
                icon:"success"
            })
        }
        else if(op == "insert" && rec == "store"){
            const nuevoTienda = {
                nombre_tienda: NomT
            };
            try {
                const response = await fetch("https://api-tienda-don-pepe.onrender.com/api/v1/tiendas", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(nuevoTienda)
                });
                // Verificar si la eliminación fue exitosa
                if (!response.ok) {
                    Swal.fire({
                        title: "Tienda ya registrada en la Base de Datos",
                        icon: "error",
                    });
                    return;
                }
                data = await response.json()
            } catch (error) {
                console.error(error);
                Swal.fire({
                    title:"Hubo un problema al registrar la tienda.",
                    icon:"warning"
                })
                return;
            }
            Swal.fire({
                title:`Tienda registrada exitosamente con el ID: ${data.id_tienda}`,
                icon:"success"
            })
        }
        else if(op == "insert" && rec == "client"){
            if (!Ape2){
                Ape2 = null
            }
            if(!Fn){
                Fn = null
            }
            if(!Punt){
                Punt = 0
            }
            
            const nuevoCliente = {
                nombre_cliente: Nom,
                apellido1: Ape1,
                apellido2: Ape2,
                fecha_nacimiento: Fn,
                puntos_compra: Punt
            };
            console.log(nuevoCliente)
            try {
                const response = await fetch("https://api-tienda-don-pepe.onrender.com/api/v1/clientes", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(nuevoCliente)
                });
                // Verificar si la eliminación fue exitosa
                if (!response.ok) {
                    Swal.fire({
                        title: "Cliente ya registrado en la Base de Datos",
                        icon: "error",
                    });
                    return;
                }
                data = await response.json()
                } catch (error) {
                    console.error(error);
                    Swal.fire({
                        title:"Hubo un problema al registrar el cliente.",
                        icon:"error"
                    })
                    return;
                }
            Swal.fire({
                title:`Cliente registrado exitosamente con el ID: ${data.id_cliente}`,
                icon:"success"
            })        
        }
        else if(op == "update" && rec == "product"){
            var nuevoProd = {};
            if (NomP) {nuevoProd.nombre_producto = NomP;}
            if (Des) {nuevoProd.descripcion = Des;}
            if (Precio) {nuevoProd.precio = Precio;}
            if (Stock) {nuevoProd.stock = Stock;}
        console.log(nuevoProd)
        try {
            const response = await fetch(`https://api-tienda-don-pepe.onrender.com/api/v1/productos/${ID}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(nuevoProd),
            });
            data = await response.json()
            } catch (error) {
                console.error("Error:", error.message);
                Swal.fire({
                    title: "Hubo un problema al actualizar el producto.",
                    icon: "error",
                });
                return;
            }
        Swal.fire({
            title: `Producto con ID ${ID} actualizado exitosamente.`,
            icon: "success",
        });
        }
        else if(op == "update" && rec == "store"){
            const nuevoTienda = {
                nombre_tienda: NomT
            };
            try {
                const response = await fetch(`https://api-tienda-don-pepe.onrender.com/api/v1/tiendas/${ID}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(nuevoTienda)
                });
                data = await response.json()
                } catch (error) {
                    console.error(error);
                    Swal.fire({
                        title:"Hubo un problema al actualizar la tienda.",
                        icon:"error"
                    })
                    return;
                }
            Swal.fire({
                title:`Tienda actualizada exitosamente con el ID: ${data.id_tienda}`,
                icon:"success"
            })
        }
        else if(op == "update" && rec == "client"){
            if (!Ape2){
                Ape2 = null
            }
            if(!Fn){
                Fn = null
            }
            var nuevoCliente = {};
            if (Nom) {nuevoCliente.nombre_cliente = Nom;}
            if (Ape1) {nuevoCliente.apellido1 = Ape1;}
            if (Ape2) {nuevoCliente.apellido2 = Ape2;}
            if (Fn) {nuevoCliente.fecha_nacimiento = Fn;}
            if (Punt) {nuevoCliente.puntos_compra = Punt;}
            console.log(nuevoCliente)
            try {
                const response = await fetch(`https://api-tienda-don-pepe.onrender.com/api/v1/clientes/${ID}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(nuevoCliente)
                });
                data = await response.json()
                console.log(data)
                } catch (error) {
                    console.error(error);
                    Swal.fire({
                        title:"Hubo un problema al actualizar el cliente.",
                        icon:"error"
                    })
                }
            Swal.fire({
                title:`Cliente actualizado exitosamente con el ID: ${data.id_cliente}`,
                icon:"success"
            })        
        }
        else if(op == "delete" && rec == "product"){
            try {
                const response = await fetch(`https://api-tienda-don-pepe.onrender.com/api/v1/productos/${ID}`, {
                    method: "DELETE",
                });
            
                // Verificar si la eliminación fue exitosa
                if (!response.ok) {
                    Swal.fire({
                        title: "Producto no registrado en la Base de Datos",
                        icon: "error",
                    });
                    return;
                }
            
                // Mostrar mensaje de éxito si se eliminó correctamente
                Swal.fire({
                    title: `Producto con ID ${ID} eliminado exitosamente.`,
                    icon: "success",
                });
            } catch (error) {
                console.error("Error:", error.message);
                Swal.fire({
                    title: "Hubo un problema al eliminar el producto.",
                    text: "Por favor, inténtalo de nuevo más tarde.",
                    icon: "error",
                });
            }
        }        
        else if(op == "delete" && rec == "store"){
            try {
                const response = await fetch(`https://api-tienda-don-pepe.onrender.com/api/v1/tiendas/${ID}`, {
                    method: "DELETE",
                });
            
                // Verificar si la eliminación fue exitosa
                if (!response.ok) {
                    Swal.fire({
                        title: "Tienda no registrada en la Base de Datos",
                        icon: "error",
                    });
                    return;
                }
            
                // Mostrar mensaje de éxito si se eliminó correctamente
                Swal.fire({
                    title: `Tienda con ID ${ID} eliminada exitosamente.`,
                    icon: "success",
                });
            } catch (error) {
                console.error("Error:", error.message);
                Swal.fire({
                    title: "Hubo un problema al eliminar la tienda.",
                    text: "Por favor, inténtalo de nuevo más tarde.",
                    icon: "error",
                });
            }
        }
        else if(op == "delete" && rec == "buy"){
            try {
                const response = await fetch(`https://api-tienda-don-pepe.onrender.com/api/v1/compras/${ID}`, {
                    method: "DELETE",
                });
            
                // Verificar si la eliminación fue exitosa
                if (!response.ok) {
                    Swal.fire({
                        title: "Compra no registrado en la Base de Datos",
                        icon: "error",
                    });
                    return;
                }
            
                // Mostrar mensaje de éxito si se eliminó correctamente
                Swal.fire({
                    title: `Compra con ID ${ID} eliminado exitosamente.`,
                    icon: "success",
                });
            } catch (error) {
                console.error("Error:", error.message);
                Swal.fire({
                    title: "Hubo un problema al eliminar la compra.",
                    text: "Por favor, inténtalo de nuevo más tarde.",
                    icon: "error",
                });
            }
        }
        else if(op == "delete" && rec == "client"){
            try {
                const response = await fetch(`https://api-tienda-don-pepe.onrender.com/api/v1/clientes/${ID}`, {
                    method: "DELETE",
                });
            
                // Verificar si la eliminación fue exitosa
                if (!response.ok) {
                    Swal.fire({
                        title: "Cliente no registrado en la Base de Datos",
                        icon: "error",
                    });
                    return;
                }
            
                // Mostrar mensaje de éxito si se eliminó correctamente
                Swal.fire({
                    title: `Cliente con ID ${ID} eliminado exitosamente.`,
                    icon: "success",
                });
            } catch (error) {
                console.error("Error:", error.message);
                Swal.fire({
                    title: "Hubo un problema al eliminar el cliente.",
                    text: "Por favor, inténtalo de nuevo más tarde.",
                    icon: "error",
                });
            }
        }
    })
    
    // Mostrar/ocultar carrito
    cartButton.addEventListener("click", () => {
        cart.classList.toggle("visible");
        setTimeout(() => {
            cart.classList.toggle("visible");
        }, 5000);
    });


});
