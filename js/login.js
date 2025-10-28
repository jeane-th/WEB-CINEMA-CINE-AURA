// ==== USUARIOS FIJOS (miembros del equipo) ====
const usuariosFijos = [
  { nombre: "Bladimir", clave: "123456" },
  { nombre: "Karla", clave: "abcde1" },
  { nombre: "Jeaneth", clave: "123456" },
  { nombre: "Brisa", clave: "clave2" },
  { nombre: "Nicole", clave: "grupo5" }
];

// ==== OBTENER DATOS DE COMPRA ====
const datos = JSON.parse(sessionStorage.getItem("datosCompra"));
console.log("🧾 Datos obtenidos:", datos);

// ==== CALCULAR TOTAL ====
let totalBoletos = (datos.precio || 0) * (datos.cantBol || 0);
let totalDulces = 0;

if (datos.carrito && datos.carrito.length > 0) {
  totalDulces = datos.carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
}

const totalAPagar = totalBoletos + totalDulces;

// ==== CAPTURA DEL FORMULARIO ====
const form = document.getElementById('loginForm');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value.trim();
    const clave = document.getElementById('clave').value.trim();

    const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];

    let encontrado = null;

    if (usuario.includes('@')) {
      encontrado = usuariosRegistrados.find(u => u.email === usuario && u.password === clave);
    } else {
      encontrado = usuariosFijos.find(u => u.nombre === usuario && u.clave === clave);
    }

    if (encontrado) {
      mostrarPantallaBienvenida(encontrado.nombre || usuario);
    } else {
      mostrarMensaje("❌ Usuario o contraseña incorrectos");
    }
  });
}

// ==== FUNCIÓN DE MENSAJE DE ERROR ====
function mostrarMensaje(texto) {
  let msg = document.getElementById("mensajeLogin");
  if (!msg) {
    msg = document.createElement("div");
    msg.id = "mensajeLogin";
    document.body.appendChild(msg);
  }

  msg.textContent = texto;
  msg.style.position = "fixed";
  msg.style.top = "30px";
  msg.style.left = "50%";
  msg.style.transform = "translateX(-50%)";
  msg.style.backgroundColor = "#ed0133";
  msg.style.color = "white";
  msg.style.padding = "10px 20px";
  msg.style.borderRadius = "10px";
  msg.style.fontWeight = "bold";
  msg.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
  msg.style.zIndex = "9999";

  setTimeout(() => msg.remove(), 2000);
}

// ==== FUNCIÓN DE BIENVENIDA ====
function mostrarPantallaBienvenida(nombre) {
  const container = document.querySelector(".container") || document.body;
  container.innerHTML = `
    <div class="login-title">🎉 Bienvenido ${nombre} 🎉</div>
    <p class="login-description">Gracias por elegirnos⭐🍿</p>
    <p class="login-description"><strong>Total a pagar: S/. ${totalAPagar.toFixed(2)}</strong></p>
    <form id="formPagar" class="loginForm">
      <button id="butonLogin" class="button-login" type="submit">Pagar ahora</button>
    </form>
  `;

  const boton = document.getElementById("butonLogin");
  boton.addEventListener("click", (e) => {
    e.preventDefault();
    redirectComprar();
  });
}

// ==== FUNCIÓN PARA PASAR DATOS A LA SIGUIENTE PÁGINA ====
function redirectComprar() {
  // Puedes guardar el mismo objeto, agregando el total
  const datosConTotal = { ...datos, total: totalAPagar };
  sessionStorage.setItem("datosCompra", JSON.stringify(datosConTotal));

  // Redirigir a pago con tarjeta
  window.location.href = "../paginas/pagoTarjeta.html";
}
