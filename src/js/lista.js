
let articulosLista = [];

document.addEventListener('DOMContentLoaded', () => {
    generarItemsLista();
})

function generarItemsLista() {
    articulosLista = JSON.parse(localStorage.getItem('lista')) || [];
    const listaContainer = document.querySelector(".lista-section__body-wrapper");

    articulosLista.forEach(articulo => {
        const divItemlista = document.createElement('DIV');
        divItemlista.classList.add('lista-item');
        divItemlista.innerHTML = `
        <div class="lista-section__item item" data-id="${articulo.id}">
            <div class="lista-section__item-img-wrapper">
                <img src="${articulo.imagen}" alt="product-img">
            </div>
            <div class="lista-section__item-title-wrapper">
                <h2 class="lista-section__item-title">${articulo.nombre}</h2>
            </div>
            <div class="lista-section__item-price-wrapper">
                <p class="lista-section__item-price">$${articulo.precio}</p>
            </div>
            <div class="lista-section__item-btn-wrapper">
                <button class="lista-section__item-btn btn btn-danger"><a href="#">Eliminar Item</a></button>
            </div>
        </div>
    `;

        listaContainer.appendChild(divItemlista);
    })

    borrarItemLista();
}

function borrarItemLista() {
    const itemsLista = document.querySelectorAll('.item');

    itemsLista.forEach(item => {
        const btnItem = item.children[3].children[0];
        const idItemLista = item.dataset.id;
        
        btnItem.addEventListener('click', () => {
            
            articulosLista = articulosLista.filter(producto => producto.id != idItemLista);
            localStorage.setItem('lista', JSON.stringify(articulosLista));
            window.location.reload();
        })
    })

}