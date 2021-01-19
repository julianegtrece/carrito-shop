//FLICKTY





var elem = document.querySelector('.carousel');
var flkty = new Flickity(elem, {
    // options
    cellAlign: 'left',
    contain: true
});

// element argument can be a selector string
//   for an individual element
var flkty = new Flickity('.carousel', {
    cellAlign: 'left',
    contain: true
});





//carrito

let productosCarrito = [];
let productTotal;
let cantidadProductosCarrito;


//click al slider


$(document).on('click', '.botonCompra', function (e) {

    const productoComprado = obtenerProducto(e.target.id);

    comprarProducto(productoComprado);


});


$(document).on('click', '.icono-borrar', function (e) {

    console.log(e.target.id);

    borrarProductoCarrito(e.target.id);


});



function borrarProductoCarrito(productoId){

    const productoBorrado = productosCarrito.find(producto => producto.id == productoId);
    productTotal = productTotal - productoBorrado.precio;

    $(".precioTotal").text(productTotal);


    productosCarrito = productosCarrito.filter(producto=> producto.id != productoId);
   
    cantidadProductosCarrito = productosCarrito.length;

    $(".articulos-carrito").text(cantidadProductosCarrito);


    cargarArticuloCarritoHTML();
    guardarStorage();


}



function obtenerProducto(id) {
    const productoComprado = stockProductos.find(producto => producto.id == id);    
    return productoComprado;


}



function comprarProducto(productoComprado) {

    const productoObjeto = {
        imagen: productoComprado.imagen,
        nombre: productoComprado.nombre,
        precio: productoComprado.precio,
            id: productoComprado.id,
        cantidad: 1
      }



    const existe = productosCarrito.some(producto => producto.id == productoComprado.id);


    if (existe) {

        const productos = productosCarrito.map(producto=>{
            if(producto.id == productoObjeto.id){
                producto.cantidad++;
                producto.precio= productoObjeto.precio * producto.cantidad;
              return producto;
            }else{
              return producto;
            }
            
          });
      
          productosCarrito = [...productos];



    }else{
        productosCarrito.push(productoObjeto);
    }



    cargarArticuloCarritoHTML();
    cargarElementosCarrito();
    guardarStorage();

}




function cargarElementosCarrito(){
    let precioTotal=0;

    productosCarrito.forEach(function(producto){
        precioTotal += producto.precio;
    })

    if(isNaN(productTotal)){
        productTotal=precioTotal;
    }else{

        productTotal = precioTotal;
    }

    precioTotal=0;




    $(".precioTotal").text(productTotal);

    cantidadProductosCarrito = productosCarrito.length;

    $(".articulos-carrito").text(cantidadProductosCarrito);

}



function guardarStorage(){
    localStorage.setItem('carrito', JSON.stringify(productosCarrito));
    localStorage.setItem('carrito-cantidad', cantidadProductosCarrito);
    localStorage.setItem('carrito-total', productTotal);
}











function cargarArticuloCarritoHTML() {

    limpiarCarrito();
    productosCarrito.forEach(producto => {

        const {
            imagen,
            nombre,
            precio,
            cantidad,
            id
        } = producto;

        const large = `
                <div class="row cart-detail">
                    <div class="col-lg-4 col-sm-4 col-4 cart-detail-img">
                      <img src="${imagen}">

                    </div>
                    <div class="col-lg-8 col-sm-8 col-8 cart-detail-product">
                      <p>${nombre}</p> 

                      <span class="price text-info" id="${id}">${precio}</span> <span class="count"> Cantidad:${cantidad}</span> <i class="fa fa-remove icono-borrar" id="${id}" style="font-size:24px"></i>
                    </div>
                    
                  </div>
              `


        $(".items-del-carito").append(large);


    })



}



function limpiarCarrito() {

    $(".cart-detail").remove();
}




window.onload=function () {
	productosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    cargarArticuloCarritoHTML();
    productTotal = localStorage.getItem('carrito-total');
    cantidadProductosCarrito = localStorage.getItem('carrito-cantidad');

    $(".precioTotal").text(productTotal);
    $(".articulos-carrito").text(cantidadProductosCarrito);

    

}