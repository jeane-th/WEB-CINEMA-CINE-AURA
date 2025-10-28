document.addEventListener("DOMContentLoaded", () => {
  const datos = JSON.parse(sessionStorage.getItem("datosCompra"));
  const lista = document.getElementById("lista_productos");
  const resumen = document.getElementById("resumen_contenedor");

  if (!datos) {
    lista.innerHTML = "<p>No hay datos de compra disponibles 😅</p>";
    return;
  }

  // 🟣 Producto principal (boletería)
  const peliculaHTML = `
    <div class="producto">
      <div class="imagen_producto">
        <img src="${datos.poster}" alt="${datos.titulo}">
      </div>
      <div class="info_producto">
        <div class="descripcion_producto">
          <h1>${datos.titulo}</h1>
          <p><b>${datos.formato}</b></p>
          <p>Asientos: ${datos.but.join(", ")}</p>
        </div>
        <div class="precio_cantidad">
          <p class="precio"><span>S/.</span> ${(datos.precio * datos.cantBol).toFixed(2)}</p>
          <div class="cantidad">
            <div class="numero_div">
              <p>Cant. ${datos.cantBol}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  lista.innerHTML += peliculaHTML;

  // 🟡 Productos del carrito (dulcería)
  if (datos.carrito && datos.carrito.length > 0) {
    datos.carrito.forEach(item => {
      lista.innerHTML += `
        <div class="producto">
          <div class="imagen_producto">
            <img src="${item.imagen}" alt="${item.titulo}">
          </div>
          <div class="info_producto">
            <div class="descripcion_producto">
              <h1>${item.titulo}</h1>
              <p>${item.descripcion}</p>
            </div>
            <div class="precio_cantidad">
              <p class="precio"><span>S/.</span> ${(item.precio * item.cantidad).toFixed(2)}</p>
              <div class="cantidad">
                <div class="numero_div">
                  <p>Cant. ${item.cantidad}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    });
  }

  // 🧮 Calcular resumen
  const totalBoletos = datos.precio * datos.cantBol;
  const totalDulces = datos.carrito?.reduce((acc, item) => acc + item.precio * item.cantidad, 0) || 0;
  const subtotal = totalBoletos + totalDulces;
  const descuento = subtotal > 100 ? 15 : 0;
  const total = subtotal - descuento;

  resumen.innerHTML = `
    <div class="parrafo">
      <p><strong>Sub-total</strong></p>
      <p class="precio_resumen">S/. ${subtotal.toFixed(2)}</p>
    </div>
    <div class="parrafo">
      <p><strong>Dscto Socio Clásico</strong></p>
      <p class="precio_resumen">S/. ${descuento.toFixed(2)}</p>
    </div>
    <hr>
    <div class="parrafo">
      <p><strong>Total</strong></p>
      <p class="precio_resumen">S/. ${total.toFixed(2)}</p>
    </div>
    <div class="boton_continuar_compra">
      <a href="../paginas/acceder.html">Finalizar compra</a>
    </div>
  `;
});
