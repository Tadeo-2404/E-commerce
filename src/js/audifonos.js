
document.addEventListener('DOMContentLoaded', () => {
    generarAudifonos();
    generarCarrito();
    generarLista();
})

function generarAudifonos() {
    async function cargarProdctos() {
         try {
             const respuesta = await fetch('src\\js\\productos.json');
             const resultado = await respuesta.json();    
             const audifonos = resultado.productos.audifonos;
             const audifonosContainer = document.querySelector('.audifonos-section__body-wrapper');

             audifonos.forEach(audifono => {
                const audifonoDiv = document.createElement('DIV');
                audifonoDiv.innerHTML = `
                <div class="audifonos-section__item item" data-id="${audifono.id}">
                    <div class="audifonos-section__item-img-wrapper">
                        <img src="${audifono.imagen}" alt="product-img">
                    </div>
                    <div class="audifonos-section__item-title-wrapper">
                        <h2 class="audifonos-section__item-title">${audifono.nombre}</h2>
                    </div>
                    <div class="audifonos-section__item-price-wrapper">
                        <p class="audifonos-section__item-price">$${audifono.precio}</p>
                    </div>
                    <div class="audifonos-section__item-btn-wrapper">
                        <button class="audifonos-section__item-btn btn btn-primary btn-item-carro"><a href="#">Agregar al
                                Carro</a></button>
                        <button class="trending-section__item-btn btn btn-danger"><a
                                href="#"><span>&#9829;</span></a></button>
                    </div>
                </div>
            `;

            audifonosContainer.appendChild(audifonoDiv);
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