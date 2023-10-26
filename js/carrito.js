var carrito = [];
var total = 0;

var productos = {
    Acrilicos: {
        "Nombre": "Acrilicos",
        "IdProducto": "Acrilicos",
        "Precio": 1500,
        "Descripcion": "acrilicus muy lindus",
        "PhotoLink": "../assets/placeholder.png"
    },
    SpaDeManos: {
        "Nombre": "Spa de Manos",
        "IdProducto": "SpaDeManos",
        "Precio": 1000,
        "Descripcion": "spa de manos q muy lindus",
        "PhotoLink": "../assets/placeholder.png"
    },
    Manicura: {
        "Nombre": "Manicura",
        "IdProducto": "Manicura",
        "Precio": 900,
        "Descripcion": "manicura muy lindus",
        "PhotoLink": "../assets/placeholder.png"
    }
};

window.onload = function () {
    for (var productoId in productos) {
        var producto = productos[productoId];

        var productDiv = document.createElement('div');
        productDiv.className = 'product';

        var h1 = document.createElement('h1');
        h1.textContent = producto.Nombre;
        productDiv.appendChild(h1);

        var img = document.createElement('img');
        img.className = 'product-image';
        img.src = producto.PhotoLink;
        img.alt = 'Product Image';
        productDiv.appendChild(img);

        var p = document.createElement('p');
        p.className = 'product-description';
        p.textContent = producto.Descripcion;
        productDiv.appendChild(p);

        var button = document.createElement('button');
        button.className = 'add-to-cart';
        button.id = 'boton' + producto.IdProducto;
        button.type = 'button';

        button.onclick = (function (id) {
            return function () {
                botonDeAgregar(id);
            };
        })(producto.IdProducto);

        button.textContent = 'Agregar al carrito';
        productDiv.appendChild(button);

        document.getElementById('catalogo').appendChild(productDiv);

        var br = document.createElement('br');
        document.getElementById('catalogo').appendChild(br);
    }
};


function botonDeAgregar(productoId) {
    if (carrito.includes(productoId)) {
        console.log('El elemento está en el array');
        var indice = carrito.indexOf(productoId);
        if (indice !== -1) {
            carrito.splice(indice, 1);
            var boton = document.getElementById('boton' + productoId);
            boton.innerHTML = 'Agregar al carrito';
            boton.classList.remove('remove-from-cart');
            boton.classList.add('add-to-cart');
        }
    } else {
        console.log('El elemento no está en el array');
        carrito.push(productoId)
        var boton = document.getElementById('boton' + productoId);
        boton.innerHTML = 'Eliminar del carrito';
        boton.classList.remove('add-to-cart');
        boton.classList.add('remove-from-cart');
    }
    console.log(carrito)
    calcular();
}

function calcular() {
    console.log(carrito.length)
    var boton = document.getElementById('Precio');

    if (carrito.length === 0) {
        boton.innerHTML = 'Total $0';
    } else {
        total = 0;
        carrito.forEach(producto => {
            var precio = productos[producto].Precio;
            total += precio;
        });
        boton.innerHTML = 'Total $' + total;
        console.log("El total es: " + total)
    }}

    // Este objeto almacenará las citas


    document.getElementById('appointmentForm').addEventListener('submit', function (event) {

        var citas = JSON.parse(localStorage.getItem('citas')) || {};
        console.log(citas);
        // Evita que la página se recargue cuando se envía el formulario
        event.preventDefault();
        event.stopPropagation();
    
        var fecha = document.getElementById('appointmentDate').value;
        var hora = document.getElementById('appointmentTime').value;
    
        // Combina la fecha y la hora en una sola cadena
        var fechaHora = fecha + ' ' + hora;
    
        // Verifica si la fecha y hora ya están ocupadas
        if (citas[fechaHora]) {
            showPopup('Lo siento, esa hora ya está ocupada. Por favor, elige otra.', 'error');
            return;
        }
    
        // Usa un placeholder para el precio y los servicios,
        // reemplaza esto con tus propias variables
        var precio = 'total';
        var servicios = 'carrito';
    
        // Guarda la cita en el objeto citas
        citas[fechaHora] = {
            precio: precio,
            servicios: servicios
        };
    
        // Guarda las citas en localStorage
        localStorage.setItem('citas', JSON.stringify(citas));
    
        showPopup('¡Cita agendada con éxito!', 'success');
    });
    
    function showPopup(message, type) {
        var popup = document.createElement('div');
        popup.className = 'popup ' + type;
        popup.textContent = message;
    
        document.body.appendChild(popup);
    
        setTimeout(function() {
            popup.remove();
        }, 10000);
    }
    

