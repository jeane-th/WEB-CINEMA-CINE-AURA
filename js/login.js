// ==== USUARIOS FIJOS (miembros del equipo) ====
const usuariosFijos = [
  { nombre: "Bladimir", clave: "123456" },
  { nombre: "Karla", clave: "abcde1" },
  { nombre: "Jeaneth", clave: "123456" },
  { nombre: "Brisa", clave: "clave2" },
  { nombre: "Nicole", clave: "grupo5" }
];

// ==== CAPTURA EL FORMULARIO ====
const form = document.getElementById('loginForm');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value.trim();
    const clave = document.getElementById('clave').value.trim();

    // ---- OBTENER USUARIOS REGISTRADOS EN LOCALSTORAGE ----
    const usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios")) || [];

    // ---- VALIDACIÓN ----
    let encontrado = null;

    // Si contiene '@' => buscar en usuarios registrados
    if (usuario.includes('@')) {
      encontrado = usuariosRegistrados.find(u => u.email === usuario && u.password === clave);
    } else {
      // Si no contiene '@' => buscar en usuarios fijos
      encontrado = usuariosFijos.find(u => u.nombre === usuario && u.clave === clave);
    }

    if (encontrado) {
      mostrarPantallaBienvenida(encontrado.nombre || usuario);
    } else {
      mostrarMensaje("❌ Usuario o contraseña incorrectos");
    }
  });
}

// ---- FUNCIÓN PARA MENSAJE DE ERROR ----
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

// ---- FUNCIÓN PARA MOSTRAR LA BIENVENIDA ----
function mostrarPantallaBienvenida(nombre) {

  const mensaje = document.querySelector(".mensaje") || document.body;

  // Limpiar contenido actual
  mensaje.innerHTML = "";

  const container = document.querySelector(".container") || document.body;

  // Limpiar contenido actual
  container.innerHTML = "";

  container.innerHTML = `
      <div class="login-title">Bienvenido</div>
            <p class="login-description">
     
      </p>
      <div class="login-title"> 🎉 ${nombre} 🎉</div>
      <p class="login-description">
        Gracias por elegirnos⭐🍿
      </p>
      <p class="login-description">
      </p>
      <p class="login-description">
      Total a pagar: S/ ${datos.precio * datos.cantBol}
      </p>
      <!-- Formulario único -->
      <form id="loginForm" class="loginForm">
        <button id="butonLogin" class="button-login" type="submit">Pagar</button>
      </form>
  `;
  // Botón Pagar
  const boton = document.getElementById("butonLogin");

  boton.addEventListener("click", () => {
      redirectComprar(datos)
  });

  // Agregar al DOM
  container.appendChild(boton);
}

const datos = JSON.parse(sessionStorage.getItem("datosCompra")).datos;
console.log(datos)


function redirectComprar( datos) {
    const datosCompra = {datos};
    // guardar en sessionStorage
    sessionStorage.setItem("datosCompra", JSON.stringify(datosCompra));

    // redirigir a la página de pago
    window.location.href = "../paginas/pagoTarjeta.html";
}

