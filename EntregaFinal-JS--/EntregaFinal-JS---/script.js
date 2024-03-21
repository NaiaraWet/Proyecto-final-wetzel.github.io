
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        datos = data;
        for (const auto of datos) {
            let contenedor = document.createElement("div");
            contenedor.className = "card";
            contenedor.innerHTML = `
                <div style="width: 18rem;">
                    <img src="${auto.imagen}" class="card-img-top">
                    <div class="skin">
                        <h5 class="card-title">${auto.id} ${auto.nombre}</h5>
                        <p class="card-text">${auto.precio}</p>
                    </div>
                </div>`;
            document.body.appendChild(contenedor);
        }
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));


let contenedor1 = document.getElementById("contenedor1");

contenedor1.innerHTML = `
    <h1 class = "bienvenida">BIENVENIDA A SKIN BY NAIARA</h1>
    <h2>Vas a encontrar los mejores productos para el cuidado de tu piel</h2>
    <p>Ingrese a continuación su Nombre y Apellido</p>
    <input id="nombreYApellido" type="text">
    <button id="enter">Enter</button>`;

const contenedor3 = document.getElementById("contenedor3");
let boton = document.getElementById("enter");

boton.addEventListener("click", function () {
        let nombreYApellido = document.getElementById("nombreYApellido").value;
        let contenedor2 = document.getElementById("contenedor2");
    
    if( nombreYApellido === "") {
        Swal.fire({
            icon: "error",
            title: "Wrong",
            text: "No has ingresado tu Nombre y Apellido, vuelve a intentarlo",
        })
    }else {
        contenedor2.innerHTML = `
      <p>Bienvenida ${nombreYApellido} al mundo del cuidado facial!</p>
      <p>Desea comprar un producto para el cuidado de tu piel?</p>
      <button id="si">SI</button>
      <button id="no">NO</button>`;

    let botonSi = document.getElementById("si");
    let botonNo = document.getElementById("no");

    botonSi.addEventListener("click", function () {
        contenedor3.innerHTML = `
        <h3>Gracias por decidir comprar con nosotros. Ingrese a continuación el Nro del producto que desea comprar</h3>
        <input id="numeroproducto" type="number" min="1" max="10" step="1">
        <button id="confirmar">Confirmar</button>`;

        let botonConfirmar = document.getElementById("confirmar");
        botonConfirmar.addEventListener("click", function () {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "La compra se ha realizado con exito",
                showConfirmButton: false,
                timer: 1500
              });
            let productoskin = parseInt(document.getElementById("productoskin").value);
            let skinSeleccionado = datos.find( skin => skin.id === productoskin);
            if (skinSeleccionado) {
                comprarskin(skinSeleccionado, datos);

            } else {
                Swal.fire({
                    icon: "error",
                    title: "Ups",
                    text: "Número de producto no válido. Por favor, ingrese un número válido.",
                })
            }
        });
    });

    botonNo.addEventListener("click", function () {
        Swal.fire("Gracias por tu visita");
    });
    }
});


function comprarskin(skin, datos) {
    let contenedor4 = document.getElementById("contenedor4");
    let contenido ="";
    let precio = parseFloat(skin.precio.replace("USD", "").replace(",", ""));

    if (precio >= 150) {
         precio = aplicarDescuento(precio);
        contenido =`
            <h3>Felicitaciones por tu compra!</h3>
            <div class="card" style="width: 18rem;">
            <img src="${skin.imagen}" class="card-img-top">
            <div class="skin">
                <h5 class="card-title">${skin.id} ${skin.nombre}</h5>
                <p class="card-text">Precio: $${skin.precio}</p>
            </div>
            </div>
            <p>Gracias por tu compra, se te ha aplicado un descuento de $${precio.toFixed(2)} al superar los 1000. ¡Vuelva pronto!</p>
            </div>`;
    } else {
        contenido = `
            <div class="contenedor4">
            <h3>Felicitaciones por tu compra!</h3>
            <div class="card" style="width: 18rem;">
                <img src="${skin.imagen}" class="card-img-top">
                <div class="skin">
                    <h5 class="card-title">${skin.id} ${skin.nombre}</h5>
                    <p class="card-text">Precio: ${skin.precio}</p>
                </div>
            </div>
            <p>¡Disfruta tu nuevo producto de skin care!</p>
            </div>`;
    }
            
    contenedor4.innerHTML = contenido;
        guardarEnLocalStorage (skin);
}

function aplicarDescuento(precio) {
    return precio / 15;
}
function guardarEnLocalStorage(skin) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(skin);
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
