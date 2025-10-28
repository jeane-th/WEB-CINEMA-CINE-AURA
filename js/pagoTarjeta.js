// Recuperar los datos de compra (película + dulcería + total)
const datos = JSON.parse(sessionStorage.getItem("datosCompra"));
console.log("💳 Datos para pago:", datos);

// Capturar el botón de pago
const boton = document.getElementById("btnPagoTarjeta");

boton.addEventListener("click", () => {
  console.log("Procesando pago...");

  // Solo se usan temporalmente: simulamos el pago
  redirectComprar(datos);
});

// Función para pasar los datos temporalmente a comprobante
function redirectComprar(datos) {
  // Guardar los mismos datos sin duplicar niveles
  sessionStorage.setItem("datosCompra", JSON.stringify(datos));

  // Redirigir a la página de comprobante
  window.location.href = "../paginas/comprobante.html";
}
