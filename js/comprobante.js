document.addEventListener("DOMContentLoaded", () => {
  const datos = JSON.parse(sessionStorage.getItem("datosCompra"));
  if (!datos) {
    document.getElementById("detalleCompra").innerHTML = "<p>No hay datos disponibles 😅</p>";
    return;
  }

  // ---- Calcular totales ----
  const totalBoletos = datos.precio * datos.cantBol;
  const totalDulces = datos.carrito
    ? datos.carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
    : 0;
  const subtotal = totalBoletos + totalDulces;
  const descuento = subtotal > 100 ? 15 : 0;
  const total = subtotal - descuento;

  // ---- Mostrar detalle de la compra ----
  const detalle = document.getElementById("detalleCompra");
  detalle.innerHTML = `
    <p><strong>Película:</strong> ${datos.titulo}</p>
    <p><strong>Formato:</strong> ${datos.formato}</p>
    <p><strong>Butacas:</strong> ${datos.but.join(", ")}</p>
    ${
      datos.carrito && datos.carrito.length
        ? `<p><strong>Snacks:</strong> ${datos.carrito.map(c => c.titulo).join(", ")}</p>`
        : ""
    }
  `;

  // ---- Mostrar totales ----
  const totalHTML = document.getElementById("totalCompra");
  totalHTML.innerHTML = `
    <p><strong>Subtotal:</strong> S/. ${subtotal.toFixed(2)}</p>
    <p><strong>Descuento Socio Clásico:</strong> - S/. ${descuento.toFixed(2)}</p>
    <hr>
    <h3><strong>Total pagado:</strong> S/. ${total.toFixed(2)}</h3>
  `;

  // ---- Botón para imprimir PDF ----
  const btnImprimir = document.getElementById("btnImprimir");
  btnImprimir.addEventListener("click", () => {
    const contenido = document.getElementById("resumenPDF").innerHTML;
    const ventana = window.open("", "_blank");
    ventana.document.write(`
      <html>
      <head>
        <title>Comprobante - CineAura</title>
        <link rel="stylesheet" href="../css/pagos.css">
      </head>
      <body>
        <h1>🎬 CineAura - Comprobante de Compra</h1>
        ${contenido}
        <script>window.onload = () => window.print()</script>
      </body>
      </html>
    `);
    ventana.document.close();
  });
});
