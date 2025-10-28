const datos = JSON.parse(sessionStorage.getItem("datosCompra")).datos;
console.log(datos)

const boton = document.getElementById("btnPagoTarjeta");

boton.addEventListener("click", () => {
    console.log("holaa")
    redirectComprar(datos)
});

function redirectComprar( datos) {
    const datosCompra = {datos};
    // guardar en sessionStorage
    sessionStorage.setItem("datosCompra", JSON.stringify(datosCompra));
    // redirigir a la página de pago
    window.location.href = "../paginas/comprobante.html";
}
