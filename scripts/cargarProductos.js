





$( document ).ready(function() {

    cargarProductosHTML();

});





function cargarProductosHTML(){

    console.log(stockProductos);

    stockProductos.forEach(producto => {

        var $carousel = $('.carousel').flickity();



        const { imagen, nombre, precio, id, descripcion } = producto;

        let large = `
        <div class="carousel-cell celdas-item ">
            <div class="card producto">
              <img src="${imagen}" alt="Denim Jeans" style="width:100%">
              <h1>${nombre}</h1>
              <p class="price">${precio}</p>
              <p>${descripcion}</p>
              <p><button class="botonCompra" id="${id}">Añadir al carro</button></p>
            </div>
        </div>`;




        var $cellElems = $(large);
        $carousel.flickity( 'append', $cellElems );


        
    });

}



