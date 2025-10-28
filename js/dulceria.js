const enlaces = document.querySelectorAll(".selector a");
const contenedorProductos = document.getElementById("contenedor_productos");
const carritoWrap = document.querySelector(".carrito_compras");

//Renderizmos tarjeta de productos según categoría
function renderizarProductos(categoriaSeleccionada) {
    contenedorProductos.innerHTML = "";

    const productos = dataDulceria.filter(
        (p) => p.categoria.toLowerCase() === categoriaSeleccionada.toLowerCase()
    );

    productos.forEach((producto) => {
        const div = document.createElement("figure");
        div.classList.add("contenedor_producto");
        div.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.titulo}" class="imagen_producto">
        <figcaption class="nombre_producto">${producto.titulo}</figcaption>
        <p class="descripcion_producto">${producto.descripcion || ''}</p>
        <div class="precio_boton" style="display:flex; align-items:flex-start; gap:8px;">
            <p class="precio"><span>s/.</span> ${producto.precio.toFixed(2)}</p>
            <div class="boton_compra" style="margin-top:0;">
                <a href="#" data-id="${producto.id}" class="btn-comprar">
                    <iconify-icon icon="tabler:shopping-bag" id="icon_bolsa"></iconify-icon>
                </a>
            </div>
        </div>
        `;

        const boton = div.querySelector(".btn-comprar");
        //Al hacer click al botón, cambia por el contador
        boton.addEventListener("click", (e) => {
            e.preventDefault();
            const carrito = JSON.parse(localStorage.getItem("carritoCineAura")) || [];
            const prodEnCarrito = carrito.find(item => item.id === producto.id);
            transformarEnContador(boton, producto, prodEnCarrito ? prodEnCarrito.cantidad : 1);
        });

        contenedorProductos.appendChild(div);
    });

    cargarEstadoBotonesDesdeCarrito();
}

//Mostrar por categoría seleccionada
enlaces.forEach((enlace) => {
    enlace.addEventListener('click', (e) => {
        e.preventDefault();
        const categoria = enlace.getAttribute("data-categoria");

        enlaces.forEach(a => a.classList.remove("activo"));
        enlace.classList.add("activo");

        renderizarProductos(categoria);
    });
});

//Transformar de botón de compra a contador
function transformarEnContador(boton, producto, cantidadInicial = 1) {
    if (boton.classList.contains("contador-activo")) return;

    boton.innerHTML = "";
    boton.classList.add("contador-activo");

    boton.innerHTML = `
    <div class="contenedor-contador">
        <button type="button" class="btn-contador" data-accion="disminuir">-</button>
        <span class="cantidad-producto">${Math.max(1, parseInt(cantidadInicial) || 1)}</span>
        <button type="button" class="btn-contador" data-accion="aumentar">+</button>
    </div>
    `;

    const spanCantidad = boton.querySelector(".cantidad-producto");

    // Inicializa en el carrito
    actualizarCarrito(producto.id, parseInt(spanCantidad.textContent), true);

    // Delegación de eventos (evita listeners repetidos)
    boton.addEventListener("click", (e) => {
        const accion = e.target.dataset.accion;
        if (!accion) return;
        e.stopPropagation();

        let cantidad = parseInt(spanCantidad.textContent);

        if (accion === "aumentar") cantidad++;
        if (accion === "disminuir") cantidad--;

        if (cantidad <= 0) {
            transformarEnIcono(boton, producto.id);
        } else {
            spanCantidad.textContent = cantidad;
            actualizarCarrito(producto.id, cantidad);
        }
    }, { once: false });
}

//Transformar de contador a boton de compra
function transformarEnIcono(boton, productoId) {
    actualizarCarrito(productoId, 0);
    boton.classList.remove("contador-activo");
    boton.innerHTML = `<iconify-icon icon="tabler:shopping-bag" id="icon_bolsa"></iconify-icon>`;
}

//Funciones del carrito de compras------------------------

function obtenerProductoPorId(id) {
    return dataDulceria.find(p => p.id === id) || null;
}

//Creamos badge para el carrito de compras
let badge = document.getElementById("contador-carrito");
if (!badge && carritoWrap) {
    badge = document.createElement("span");
    badge.id = "contador-carrito";
    badge.classList.add("badge-carrito");
    carritoWrap.style.position = "relative";
    carritoWrap.appendChild(badge);
}

function actualizarCarrito(productoId, cantidad, forzarAgregar = false) {
    let carrito = JSON.parse(localStorage.getItem('carritoCineAura')) || [];

    const idx = carrito.findIndex(item => item.id === productoId);

    if (cantidad > 0) {
        const producto = obtenerProductoPorId(productoId);
        if (!producto) return;

        if (idx !== -1) {
            carrito[idx].cantidad = cantidad;
        } else {
            carrito.push({
                id: producto.id,
                titulo: producto.titulo,
                precio: producto.precio,
                imagen: producto.imagen,
                descripcion: producto.descripcion || '',
                categoria: producto.categoria,
                cantidad: cantidad
            });
        }
    } else {
        if (idx !== -1) carrito.splice(idx, 1);
    }

    localStorage.setItem('carritoCineAura', JSON.stringify(carrito));
    actualizarContadorCarrito(carrito);
}

//Mostrar cantidad de productos en el badge del carrito
function actualizarContadorCarrito(carritoArray) {
    const contador = document.getElementById('contador-carrito');
    if (!contador) return;

    const totalDistintos = carritoArray.length;
    if (totalDistintos > 0) {
        contador.style.display = 'flex';
        contador.style.alignItems = 'center';
        contador.style.justifyContent = 'center';
        contador.textContent = totalDistintos;
    } else {
        contador.style.display = 'none';
    }

}
const carrito = JSON.parse(localStorage.getItem('carritoCineAura')) || [];
//Evitar que al recargar la página se pierda las selecciones
function cargarEstadoBotonesDesdeCarrito() {

    // Para cada botón, si su producto está en el carrito lo transformamos con la cantidad
    const botonesCompra = document.querySelectorAll('.boton_compra .btn-comprar');
    botonesCompra.forEach(boton => {
        const productoElemento = boton.closest('.contenedor_producto');
        if (!productoElemento) return;
        const id = boton.getAttribute('data-id') || boton.dataset.id;
        if (!id) return;
        const prod = carrito.find(item => String(item.id) === String(id));
        if (prod) {
            // transformar con la cantidad guardada
            transformarEnContador(boton, obtenerProductoPorId(prod.id), prod.cantidad);
        } else {
            //asegurar que está el icono (por si alguien metió HTML sin icono)
            if (!boton.classList.contains('contador-activo')) {
                boton.innerHTML = '';
                const iconoBolsa = document.createElement('iconify-icon');
                iconoBolsa.setAttribute('icon', 'tabler:shopping-bag');
                iconoBolsa.id = 'icon_bolsa';
                boton.appendChild(iconoBolsa);
            }
        }
    });
    actualizarContadorCarrito(carrito);
}

//Inicialización
document.addEventListener("DOMContentLoaded", () => {
    // Mostrar la primera categoría por defecto (si existen enlaces)
    if (enlaces.length > 0) {
        const categoriaInicial = enlaces[0].getAttribute("data-categoria");
        renderizarProductos(categoriaInicial);
    } else {
        // si no hay enlaces, renderiza todo o deja vacío
        contenedorProductos.innerHTML = "<p>No hay categorías definidas.</p>";
    }
});

//*************************************************** */


// ✅ Recuperar los datos de boletería desde la página anterior (reserva)
const datosObtenidos = JSON.parse(sessionStorage.getItem("datosCompra"));
console.log("🎬 Datos obtenidos desde boletería:", datosObtenidos);


// ✅ Botón para continuar al pago
const btnContinuar = document.getElementById("boton_comprar");

btnContinuar.addEventListener("click", () => {
  // Combinar los datos existentes con el carrito actual
  const datosFinales = {
    ...datosObtenidos, // ← mezcla todo lo que ya estaba (titulo, but, etc.)
    carrito            // ← agrega el nuevo array
  };

  // Guardar el nuevo objeto combinado
  sessionStorage.setItem("datosCompra", JSON.stringify(datosFinales));

  // Ver en consola antes de redirigir (opcional)
  console.log("📦 Enviando a pagos:", datosFinales);

  // Redirigir a la página de pago
  window.location.href = "../paginas/pagos.html";
});
