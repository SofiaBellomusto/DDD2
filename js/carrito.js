var carrito = [];
var precios = {
    "Acrilicos": 1500,
    "SpaDeManos": 1000
};

function botonDeAgregar(producto) {

    //si el producto se encuentra en el carrito
    if (carrito.includes(producto)) {
        console.log('El elemento está en el array');

        //busca el producto en el array
        var indice = carrito.indexOf(producto);

        //si encuentra el indice, elimina su contenido
        if (indice !== -1) {
            carrito.splice(indice, 1);

            var boton = document.getElementById('boton' + producto);
            boton.innerHTML = 'Agregar al carrito';
            boton.classList = 'add-to-cart'; //agregue para el color


        }
        //si el producto no se encuentra en el carrito
    } else {
        console.log('El elemento no está en el array');
        //agregar producto al carrito
        carrito.push(producto)

        //cambia el texto del boton
        var boton = document.getElementById('boton' + producto);
        boton.innerHTML = 'Eliminar del carrito';
        boton.classList = 'remove-from-cart'; //agregue para cambiar el color
    }
    console.log(carrito)
    calcular();
}


function calcular() {
    console.log(carrito.length)
    if (carrito.length === 0) {
        console.log("No tiene productos en su carrito");
    } else {
        let total = 0;
        carrito.forEach(producto => {
            // Buscar el precio del producto en el objeto precios
            var precio = precios[producto];
            total += precio;
        });
        console.log("El total es: " + total)
    }
}