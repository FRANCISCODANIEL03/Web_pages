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


});
