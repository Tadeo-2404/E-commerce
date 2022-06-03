
let articulosCarrito = [];

document.addEventListener('DOMContentLoaded', () => {
    generarItemsCarrito();
})

function generarItemsCarrito() {
    articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoContainer = document.querySelector(".carrito-section__body-wrapper");

    articulosCarrito.forEach(articulo => {
        const divItemCarrito = document.createElement('DIV');
        divItemCarrito.classList.add('carrito-item');
        divItemCarrito.innerHTML = `
        <div class="carrito-section__item item" data-id="${articulo.id}">
            <div class="carrito-section__item-img-wrapper">
                <img src="${articulo.imagen}" alt="product-img">
            </div>
            <div class="carrito-section__item-title-wrapper">
                <h2 class="carrito-section__item-title">${articulo.nombre}</h2>
            </div>
            <div class="carrito-section__item-price-wrapper">
                <p class="carrito-section__item-price">$${articulo.precio}</p>
            </div>
            <div class="carrito-section__item-btn-wrapper">
                <button class="carrito-section__item-btn btn btn-danger"><a href="#">Eliminar Item</a></button>
            </div>
        </div>
    `;

        carritoContainer.appendChild(divItemCarrito);
    })

    borrarItemCarrito();
}

function borrarItemCarrito() {
    const itemsCarrito = document.querySelectorAll('.item');

    itemsCarrito.forEach(item => {
        const btnItem = item.children[3].children[0];
        const idItemCarrito = item.dataset.id;
        
        btnItem.addEventListener('click', () => {
            
            articulosCarrito = articulosCarrito.filter(producto => producto.id != idItemCarrito);
            localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
            window.location.reload();
        })
    })

}