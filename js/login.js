// ==== USUARIOS FIJOS (miembros del equipo) ====
const usuariosFijos = [
  { nombre: "Bladimir", clave: "123456" },
  { nombre: "Karla", clave: "abcde1" },
  { nombre: "Jeane", clave: "pass12" },
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
      mostrarMensaje(`✅ Bienvenido ${usuario} 😄`, "success");
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 1500);
    } else {
      mostrarMensaje("❌ Usuario o contraseña incorrectos");
    }
  });
}

// ---- FUNCIÓN PARA MENSAJES ----
function mostrarMensaje(texto, tipo = "error") {
  let msg = document.getElementById("mensajeLogin");
  if (!msg) {
    msg = document.createElement("div");
    msg.id = "mensajeLogin";
    document.body.appendChild(msg);
  }

  msg.textContent = texto;
  msg.className = tipo;
  msg.style.position = "fixed";
  msg.style.top = "20px";
  msg.style.left = "50%";
  msg.style.transform = "translateX(-50%)";
  msg.style.backgroundColor = tipo === "success" ? "#4CAF50" : "#ed0133";
  msg.style.color = "white";
  msg.style.padding = "10px 20px";
  msg.style.borderRadius = "10px";
  msg.style.fontWeight = "bold";
  msg.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
  msg.style.zIndex = "9999";
  msg.style.opacity = "1";
  msg.style.transition = "opacity 0.3s ease";

  setTimeout(() => {
    msg.style.opacity = "0";
    setTimeout(() => msg.remove(), 500);
  }, 2000);
}   