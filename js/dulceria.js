document.addEventListener("DOMContentLoaded", () => {
    const enlaces = document.querySelectorAll('.selector a');
    const listas = document.querySelectorAll('.lista_productos');

enlaces.forEach(enlace => {
    enlace.addEventListener('click', function (e) {
        e.preventDefault();
        const categoria = this.getAttribute('data-categoria');
        // Oculta todas las categorías
        listas.forEach(lista => lista.style.display = 'none');
        // Muestra la categoría seleccionada
        const activa = document.querySelector(`.lista_productos.${categoria}`);
        if (activa) {
            activa.style.display = 'flex';
        }
        // Quita y aplica estilo activo
        enlaces.forEach(a => a.classList.remove('activo'));
        this.classList.add('activo');
    });
});
});

const datos = JSON.parse(sessionStorage.getItem("datosCompra"));

console.log(datos)

// continuar continuar
const btnContinuar = document.getElementById("boton_comprar")
btnContinuar.addEventListener("click", () =>{
     redirectComprar(datos)
    } 
);

function redirectComprar( datos) {
    const datosCompra = {datos};
    // guardar en sessionStorage
    sessionStorage.setItem("datosCompra", JSON.stringify(datosCompra));

    // redirigir a la página de pago
    window.location.href = "../paginas/pagos.html";
}

