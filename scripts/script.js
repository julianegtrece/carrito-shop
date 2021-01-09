var elem = document.querySelector('.container-slides');
var flkty = new Flickity( elem, {
  // options
  cellAlign: 'left',
  contain: true
});

// element argument can be a selector string
//   for an individual element
var flkty = new Flickity( '.container-slides', {
    cellAlign: 'left',
    contain: true
});







// selectores de carrito

const listaProductos = document.querySelector('.producto');
const contenedorCarrito =  document.querySelector(".box-card-items");


// listeners



// flkty.on( 'staticClick', function( event, pointer, cellElement, cellIndex ) {
//   console.log(cellElement);
// });


let articulosCarrito = [];



$('.botonCompra').on( 'click', function(event, pointer, cellElement, cellIndex) {
  console.log(event.currentTarget.parentElement.parentElement); 
  //accedo al elemento padre del evento
  const productoSeleccionado = event.currentTarget.parentElement.parentElement;

  obtenerDatos(productoSeleccionado);

});

function obtenerDatos(producto){
  const productoObjeto = {
    imagen: producto.querySelector('img').src,
		nombre: producto.querySelector('h1').textContent,
		precio: producto.querySelector('.price').textContent,
		cantidad: 1
  
  
  }

  console.log(productoObjeto);


  articulosCarrito.push(productoObjeto);

  insertarCarritoHTML();
  
}



function insertarCarritoHTML() {

	/* Borrar contenido carrito */
	limpiarCarrito();

	/* Inserto los productos del carrito en el HTML */
	articulosCarrito.forEach(producto => {

		/* Destructuring sobre el producto */
		const { imagen, nombre, precio, cantidad } = producto;

		const row = document.createElement('row');
    row.innerHTML = `
    <div class="row ">
    <div class="col-sm-5">
              <img class="card-img" src="../img/producto1.jpg" alt="Suresh Dasari Card">
            </div>

            <div class="col-sm-7">
              <div class="card-body">
                <h5 class="card-title">Placa Madre</h5>
                <p class="card-text">X2</p>
                <a href="#" class="btn btn-primary">borrar</a>
              </div>
            </div>
            </div>
		`

		contenedorCarrito.appendChild(row);
	});
}


function limpiarCarrito() {
	// contenedorCarrito.innerHTML = '';

	while (contenedorCarrito.firstChild) {
		contenedorCarrito.removeChild(contenedorCarrito.firstChild);
	}
}