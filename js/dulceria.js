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
