
let articulosCarrito = [];
let articulosLista = [];

//eventos
document.addEventListener('DOMContentLoaded', () => {
    generarTrendingItems();
    generarNewItems();
    generarCarrito();
    generarLista();
})

//funciones
function generarTrendingItems() {
    async function cargarProdctos() {
        try {
            const respuesta = await fetch('src\\js\\productos.json');
            const resultado = await respuesta.json();    
            
            const audifonos = resultado.productos.audifonos;
            const computadoras = resultado.productos.computadoras;
            const telefonos = resultado.productos.telefonos;
            const newSectionWrapper = document.querySelector('.new-section__body-wrapper');

            const audifonos04 = audifonos[3];
            const telefono02 = telefonos[1];
            const telefono04 = telefonos[3];
            const telefono05 = telefonos[4];
            const laptop02 = computadoras[1];
            const laptop04 = computadoras[3];
            const laptop05 = computadoras[4];

            const newItems = [audifonos04, telefono02, telefono04, telefono05, laptop02, laptop04, laptop05];

            newItems.forEach(trendItem => {
                const trendItemDiv = document.createElement('DIV');
                trendItemDiv.innerHTML = `
                <div class="new-section__item item" data-id="${trendItem.id}">
                    <div class="new-section__item-img-wrapper">
                        <img src="${trendItem.imagen}" alt="product-img">
                    </div>
                    <div class="new-section__item-title-wrapper">
                        <h2 class="new-section__item-title">${trendItem.nombre}</h2>
                    </div>
                    <div class="new-section__item-price-wrapper">
                        <p class="new-section__item-price">$${trendItem.precio}</p>
                    </div>
                    <div class="new-section__item-btn-wrapper">
                        <button class="new-section__item-btn btn btn-primary btn-item-carro"><a href="#">Agregar al
                                Carro</a></button>
                        <button class="trending-section__item-btn btn btn-danger"><a
                                href="#"><span>&#9829;</span></a></button>
                    </div>
                </div>
            `;
            newSectionWrapper.appendChild(trendItemDiv);
            });

        } catch (error) {
            console.log(error);
        }
    }
    cargarProdctos();
}

function generarNewItems() {
   async function cargarProdctos() {
        try {
            const respuesta = await fetch('src\\js\\productos.json');
            const resultado = await respuesta.json();    
            
            const audifonos = resultado.productos.audifonos;
            const computadoras = resultado.productos.computadoras;
            const telefonos = resultado.productos.telefonos;
            const trendingSectionWrapper = document.querySelector('.trending-section__body-wrapper');
            const verMasTrendingSectionWrapper = document.querySelector('.ver-mas-trending__body-wrapper');

            const audifonos01 = audifonos[0];
            const audifonos02 = audifonos[1];
            const telefono03 = telefonos[2];
            const laptop4 = computadoras[3];

            const audifonos03 = audifonos[2];
            const audifonos05 = audifonos[4];
            const telefono01 = telefonos[0];
            const laptop1 = computadoras[0];

            const trendingItemsVerMas = [audifonos03, audifonos05, telefono01, laptop1];
            const trendingItems = [audifonos01, audifonos02, telefono03, laptop4];

            trendingItems.forEach(trendItem => {
                const trendItemDiv = document.createElement('DIV');
                trendItemDiv.innerHTML = `
                    <div class="trending-section__item item" data-id="${trendItem.id}">
                       <div class="trending-section__item-img-wrapper">
                         <img src="${trendItem.imagen}" alt="product-img">
                       </div>
                    <div class="trending-section__item-title-wrapper">
                        <h2 class="trending-section__item-title">${trendItem.nombre}</h2>
                    </div>
                    <div class="trending-section__item-price-wrapper">
                        <p class="trending-section__item-price">$${trendItem.precio}</p>
                     </div>
                     <div class="trending-section__item-btn-wrapper">
                       <button class="trending-section__item-btn btn btn-primary btn-item-carro"><a href="#">Agregar al
                           Carro</a></button>
                       <button class="trending-section__item-btn btn btn-danger"><a
                          href="#"><span>&#9829;</span></a></button>
                     </div>
                    </div>
            `;
            trendingSectionWrapper.appendChild(trendItemDiv);
            });

            trendingItemsVerMas.forEach(trendItem => {
                const trendItemDiv = document.createElement('DIV');
                trendItemDiv.innerHTML = `
                    <div class="trending-section__item item" data-id="${trendItem.id}">
                       <div class="trending-section__item-img-wrapper">
                         <img src="${trendItem.imagen}" alt="product-img">
                       </div>
                    <div class="trending-section__item-title-wrapper">
                        <h2 class="trending-section__item-title">${trendItem.nombre}</h2>
                    </div>
                    <div class="trending-section__item-price-wrapper">
                        <p class="trending-section__item-price">$${trendItem.precio}</p>
                     </div>
                     <div class="trending-section__item-btn-wrapper">
                       <button class="trending-section__item-btn btn btn-primary btn-item-carro"><a href="#">Agregar al
                           Carro</a></button>
                       <button class="trending-section__item-btn btn btn-danger"><a
                          href="#"><span>&#9829;</span></a></button>
                     </div>
                    </div>
            `;
            verMasTrendingSectionWrapper.appendChild(trendItemDiv);
            });

            traerElemento();
            traerElementoListaDeseos();

        } catch (error) {
            console.log(error);
        }
    }
    cargarProdctos();
}

function traerElemento() {
    const arrayCarrito = [];
    const carritoContainer = document.querySelector(".cart-item-wrapper");
    const items = document.querySelectorAll('.item');

    items.forEach(item => {
        const btnItem = item.children[3].children[0];
        btnItem.addEventListener('click', (e) => {
            e.preventDefault();
            btnItem.children[0].textContent = "Agregado"
            const idItem = item.dataset.id;

            async function cargarProdcto() {
                try {
                    const respuesta = await fetch('src\\js\\productos.json');
                    const resultado = await respuesta.json(); 
                    const productos = resultado.productos;
                    let existe = false;

                    for (let index in productos) {
                        for (let key of productos[index]) {
                            const idJSON = key.id; //verificamos que el producto del JSON sea el mismo al que dimos click
                            
                            if(idItem == idJSON) {

                                const divItemCarrito = document.createElement('DIV');
                                divItemCarrito.classList.add('cart-item');
                                divItemCarrito.dataset.id = item.dataset.id;
                                divItemCarrito.innerHTML = `
                                <h2 class="cart-item__titulo">${key.nombre}</h2>
                                <img class="cart-item__img" src="${key.imagen}">
                                <p class="cart-item__precio">$${key.precio}</p>
                                `;

                                articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

                                //comprobamos que sea el primer elemento agregado al carrito
                                if(articulosCarrito.length == 0) {

                                    carritoContainer.appendChild(divItemCarrito);
                                    arrayCarrito.push(divItemCarrito.dataset.id);
                                    articulosCarrito.push(key);
                                    sincronizarCarrito();

                                } else {

                                    //validamos que no se repita el mismo item
                                    articulosCarrito.forEach(articulo => {
                                         if (articulo.id == divItemCarrito.dataset.id) {
                                             existe = true;
                                             return;
                                         }
                                    });

                                    if(!existe) {
                                        carritoContainer.appendChild(divItemCarrito);
                                        arrayCarrito.push(divItemCarrito.dataset.id);
                                        articulosCarrito.push(key);
                                        sincronizarCarrito();
                                    }
                                }
                            }
                        }
                    }

                } catch(error) {
                    console.log(error);
                }
            }
            cargarProdcto();
        })
    })
}

function traerElementoListaDeseos() {
    const arrayLista = [];
    const listaContainer = document.querySelector(".wish-item-wrapper");
    const items = document.querySelectorAll('.item');

    items.forEach(item => {
        const btnItem = item.children[3].children[1];
        btnItem.addEventListener('click', (e) => {
            e.preventDefault();
            const idItem = item.dataset.id;

            async function cargarProdcto() {
                try {
                    const respuesta = await fetch('src\\js\\productos.json');
                    const resultado = await respuesta.json(); 
                    const productos = resultado.productos;
                    let existe = false;

                    for (let index in productos) {
                        for (let key of productos[index]) {
                            const idJSON = key.id;
                            
                            if(idItem == idJSON) {

                                const divItemCarrito = document.createElement('DIV');
                                divItemCarrito.classList.add('wish-item');
                                divItemCarrito.dataset.id = item.dataset.id;
                                divItemCarrito.innerHTML = `
                                <h2 class="wish-item__titulo">${key.nombre}</h2>
                                <img class="wish-item__img" src="${key.imagen}">
                                <p class="wish-item__precio">$${key.precio}</p>
                                `;

                                articulosLista = JSON.parse(localStorage.getItem('lista')) || [];

                                //comprobamos que sea el primer elemento agregado al carrito
                                if(articulosLista.length == 0) {

                                    listaContainer.appendChild(divItemCarrito);
                                    arrayLista.push(divItemCarrito.dataset.id);
                                    articulosLista.push(key);
                                    console.log(articulosLista)
                                    sincronizarLista();

                                } else {

                                    //validamos que no se repita el mismo item
                                    articulosLista.forEach(articulo => {
                                         if (articulo.id == divItemCarrito.dataset.id) {
                                             existe = true;
                                             return;
                                         }
                                    });

                                    if(!existe) {
                                        listaContainer.appendChild(divItemCarrito);
                                        arrayLista.push(divItemCarrito.dataset.id);
                                        articulosLista.push(key);
                                        sincronizarLista();
                                    }
                                }
                            }
                        }
                    }

                } catch(error) {
                    console.log(error);
                }
            }
            cargarProdcto();
        })
    })
}

function sincronizarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

function sincronizarLista() {
    localStorage.setItem('lista', JSON.stringify(articulosLista));
}

function generarCarrito() {
    articulosCarrito = [];
    articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoContainer = document.querySelector(".cart-item-wrapper");

    articulosCarrito.forEach(articulo => {
        const divItemCarrito = document.createElement('DIV');
        divItemCarrito.classList.add('cart-item');
        divItemCarrito.innerHTML = `
        <h2 class="cart-item__titulo">${articulo.nombre}</h2>
        <img class="cart-item__img" src="${articulo.imagen}">
        <p class="cart-item__precio">$${articulo.precio}</p>
        `;

        carritoContainer.appendChild(divItemCarrito);
    })
}

function generarLista() {
    articulosLista = [];
    articulosLista = JSON.parse(localStorage.getItem('lista')) || [];
    const listaContainer = document.querySelector(".wish-item-wrapper");

    articulosLista.forEach(articulo => {
        const divItemCarrito = document.createElement('DIV');
        divItemCarrito.classList.add('wish-item');
        divItemCarrito.innerHTML = `
        <h2 class="wish-item__titulo">${articulo.nombre}</h2>
        <img class="wish-item__img" src="${articulo.imagen}">
        <p class="wish-item__precio">$${articulo.precio}</p>
        `;

        listaContainer.appendChild(divItemCarrito);
    })
}