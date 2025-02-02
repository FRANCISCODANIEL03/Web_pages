document.addEventListener("DOMContentLoaded", async () => {
    const regButton = document.getElementById("reg");
    const nombre = document.getElementById("nombre");
    const apellido1 = document.getElementById("ape1");
    var apellido2 = document.getElementById("ape2").value;
    
    regButton.addEventListener("click", async () => {
    var fechaNacimiento = document.getElementById("fecha_nac").value;
    const valNombre = nombre.value.trim()
    const valApe1 = nombre.value.trim()
    if (!valNombre || !valApe1) {
        Swal.fire({
            title:"Por favor, completa todos los campos.",
            icon:"warning"
        })
        return;
    }
    // Validar que la fecha sea válida y en el pasado
    /*if (!validarFechaNacimiento(fechaNacimiento)) {
        Swal.fire({
            title:"Por favor, ingresa una fecha de nacimiento válida.",
            icon:"warning"
        })
        return;
    }*/
    /*const fechaN = new Date(document.getElementById("fecha_nac").value)
    const anio = fechaN.getFullYear()
    const mes = fechaN.getUTCMonth()
    const dia = fechaN.getDate()
    
    const fechaF = `${anio}-${mes}-${dia}`
    console.log(fechaF)
    console.log(fechaN)*/
    // Crear el objeto a enviar
    if (!apellido2){
        apellido2 = null
    }
    if(!fechaNacimiento){
        fechaNacimiento = null
    }
    const nuevoCliente = {
        nombre_cliente: nombre.value,
        apellido1: apellido1.value,
        apellido2: apellido2,
        fecha_nacimiento: fechaNacimiento,
        puntos_compra: 0 // Por defecto
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
        const data = await response.json()
        console.log(data)
        if (!response.ok) {
            throw new Error("Error al registrar el cliente.");

        }
        Swal.fire({
            title:`Cliente registrado exitosamente con el ID: ${data.id_cliente}`,
            icon:"success"
        })

    } catch (error) {
        console.error(error);
        Swal.fire({
            title:"Hubo un problema al registrar el cliente.",
            icon:"warning"
        })
    }
});

// Validar formato y rango de la fecha de nacimiento
/*function validarFechaNacimiento(fecha) {
    const hoy = new Date();
    const fechaIngresada = new Date(fecha);

    if (isNaN(fechaIngresada.getTime())) {
        return false; // Fecha inválida
    }

    return fechaIngresada < hoy; // La fecha debe ser anterior a hoy
}*/
});