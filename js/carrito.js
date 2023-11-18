var carrito = [];
var total = 0;



window.onload = function () {

    fetch('../js/productos.json')
    .then(response => response.json())
    .then(data => {
        var productos = data;
        // Now you can use your 'productos' object here
    


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

})
.catch((error) => {
    console.error('Error:', error);
});

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
         Swal.fire({
            icon: "success",
            title: "Servicio agregado exitosamente",
            showConfirmButton: false,
            timer: 1000
          });


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
    }
}

// Este objeto almacena las citas


document.getElementById('appointmentForm').addEventListener('submit', function (event) {

    var citas = JSON.parse(localStorage.getItem('citas')) || {};
    console.log(citas);
    // Evita que la página se recargue cuando se envía el formulario
    event.preventDefault();
    event.stopPropagation();

    var fecha = document.getElementById('appointmentDate').value;
    var hora = document.getElementById('appointmentTime').value;
    var fechaHora = fecha + ' ' + hora;

    // Verifica si la fecha y hora ya están ocupadas
    if (citas[fechaHora]) {
        showPopup('Lo siento, esa hora ya está ocupada. Por favor, elige otra.', 'error');
        return;
    }

    // Usa un placeholder para el precio y los servicios,
    var precio = total;
    var servicios = carrito;

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

    setTimeout(function () {
        popup.remove();
    }, 10000);
}


