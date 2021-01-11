var elem = document.querySelector('.container-slides');
var flkty = new Flickity(elem, {
  // options
  cellAlign: 'left',
  contain: true
});

// element argument can be a selector string
//   for an individual element
var flkty = new Flickity('.container-slides', {
  cellAlign: 'left',
  contain: true
});







// selectores de carrito

const listaProductos = document.querySelector('.producto');
const contenedorCarrito = document.querySelector(".box-card-items");


// listeners



// flkty.on( 'staticClick', function( event, pointer, cellElement, cellIndex ) {
//   console.log(cellElement);
// });


let articulosCarrito = [];



$('.botonCompra').on('click', function (event, pointer, cellElement, cellIndex) {
  // console.log(event.currentTarget.parentElement.parentElement);
  //accedo al elemento padre del evento
  const productoSeleccionado = event.currentTarget.parentElement.parentElement;

  obtenerDatos(productoSeleccionado);
});


$('.boton-vaciar').on('click', function (event, pointer, cellElement, cellIndex) {
  // console.log(event.currentTarget.parentElement.parentElement);
  //accedo al elemento padre del evento
  vaciarCarrito();
});








window.onload=function () {
	articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
	insertarCarritoHTML();
}





function obtenerDatos(producto) {
  const productoObjeto = {
    imagen: producto.querySelector('img').src,
    nombre: producto.querySelector('h1').textContent,
    precio: producto.querySelector('.price').textContent,
		id: producto.querySelector('button').getAttribute('data-id'),
    cantidad: 1


  }

  const existe = articulosCarrito.some(producto => producto.id == productoObjeto.id);

  
  if (existe){
    const productos = articulosCarrito.map(producto=>{
      if(producto.id == productoObjeto.id){
        producto.cantidad++;
        return producto;
      }else{
        return producto;
      }
      
    });

    articulosCarrito = [...productos];



  }else{
    articulosCarrito.push(productoObjeto);

  }

  insertarCarritoHTML();
  guardarStorage();
  console.log(articulosCarrito);

}

function guardarStorage() {
	localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}



function insertarCarritoHTML() {

  /* Borrar contenido carrito */
  limpiarCarrito();

  /* Inserto los productos del carrito en el HTML */
  articulosCarrito.forEach(producto => {

    /* Destructuring sobre el producto */
    
    const {
      imagen,
      nombre,
      precio,
      cantidad,
      id
    } = producto;



    const row = document.createElement('div');
    row.innerHTML = `
    <div class="row carta-carrito">
    <div class="col-sm-5">
              <img class="card-img" src="${imagen}" alt="Suresh Dasari Card">
            </div>

            <div class="col-sm-7">
              <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">Precio: ${precio} Cantidad:${cantidad}</p>
                <a href="#" class="btn btn-primary">borrar</a>
              </div>
            </div>
            </div>
		`

    contenedorCarrito.appendChild(row);
  });
}


function limpiarCarrito() {
  console.log(contenedorCarrito.firstChild)
  // contenedorCarrito.innerHTML = '';

  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}

function limpiarProductos() {
	while (listaProductos.firstChild) {
		listaProductos.removeChild(listaProductos.firstChild);
	}
}



function vaciarCarrito(){

  console.log('vaciar carro');
  articulosCarrito = [];
  localStorage.clear();
  insertarCarritoHTML();

}