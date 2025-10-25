document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  // Crear función para mostrar mensaje debajo del input
  function mostrarError(idCampo, mensaje) {
    let campo = document.getElementById(idCampo);
    let errorDiv = campo.parentNode.querySelector(".error-msg");
    if (!errorDiv) {
      errorDiv = document.createElement("div");
      errorDiv.classList.add("error-msg");
      errorDiv.style.color = "red";
      errorDiv.style.fontSize = "12px";
      errorDiv.style.marginTop = "3px";
      campo.parentNode.appendChild(errorDiv);
    }
    errorDiv.textContent = mensaje;
  }

  function limpiarErrores() {
    document.querySelectorAll(".error-msg").forEach(el => el.remove());
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    limpiarErrores();

    const nombres = document.getElementById("nombres").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const email = document.getElementById("email").value.trim();
    const generoSeleccionado = document.querySelector('input[name="genero"]:checked');
    const password = document.getElementById("password").value.trim();
    const confirmar = document.getElementById("confirmar").value.trim();
    const tipoDocumento = document.getElementById("tipodocumento").value;
    const numeroDocumento = document.getElementById("numero_documento").value.trim();
    const fechaNacimiento = document.getElementById("fecha_nacimiento").value;
    const celular = document.getElementById("celular").value.trim();
    const departamento = document.getElementById("departamento").value;
    const distrito = document.getElementById("distrito").value.trim();

    // Expresiones regulares
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?: [A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/;
    const correoValido = /^[a-zA-Z0-9._%+-]+@[A-Za-z]+\.(com|pe|org|net)$/; // sin números después del @
    const soloNumeros = /^[0-9]+$/;
    const sinEspacios = /^\S+$/;

    let valido = true;

    // Validaciones
    if (!soloLetras.test(nombres)) {
      mostrarError("nombres", "⚠️ Solo se permiten letras, sin números ni símbolos");
      valido = false;
    }

    if (!soloLetras.test(apellidos)) {
      mostrarError("apellidos", "⚠️ Solo se permiten letras, sin números ni símbolos");
      valido = false;
    }

    if (!correoValido.test(email)) {
      mostrarError("email", "⚠️ Correo inválido. No use números después del @");
      valido = false;
    }

    if (!generoSeleccionado) {
      mostrarError("password", "⚠️ Debes seleccionar un género");
      valido = false;
    }

    if (!sinEspacios.test(password)) {
      mostrarError("password", "⚠️ La contraseña no debe tener espacios");
      valido = false;
    }

    if (password.length < 6) {
      mostrarError("password", "⚠️ Debe tener al menos 6 caracteres");
      valido = false;
    }

    if (password !== confirmar) {
      mostrarError("confirmar", "⚠️ Las contraseñas no coinciden");
      valido = false;
    }

    if (!soloNumeros.test(numeroDocumento)) {
      mostrarError("numero_documento", "⚠️ Solo se permiten números");
      valido = false;
    }

    if (!soloNumeros.test(celular) || celular.length !== 9) {
      mostrarError("celular", "⚠️ Debe tener 9 dígitos numéricos");
      valido = false;
    }

    if (!soloLetras.test(distrito)) {
      mostrarError("distrito", "⚠️ Solo se permiten letras");
      valido = false;
    }

    // Validar edad mínima
    if (fechaNacimiento) {
      const fechaNac = new Date(fechaNacimiento);
      const hoy = new Date();
      let edad = hoy.getFullYear() - fechaNac.getFullYear();
      const m = hoy.getMonth() - fechaNac.getMonth();
      if (m < 0 || (m === 0 && hoy.getDate() < fechaNac.getDate())) edad--;
      if (edad < 13) {
        mostrarError("fecha_nacimiento", "⚠️ Debes tener al menos 13 años");
        valido = false;
      }
    } else {
      mostrarError("fecha_nacimiento", "⚠️ Ingrese su fecha de nacimiento");
      valido = false;
    }

    if (!valido) return;

    // Guardar usuario
    const usuario = {
      nombres,
      apellidos,
      email,
      genero: generoSeleccionado.value,
      password,
      tipoDocumento,
      numeroDocumento,
      fechaNacimiento,
      celular,
      departamento,
      distrito
    };

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (usuarios.some(u => u.email === email)) {
      mostrarError("email", "⚠️ Este correo ya está registrado");
      return;
    }

    if (usuarios.some(u => u.numeroDocumento === numeroDocumento)) {
      mostrarError("numero_documento", "⚠️ Este documento ya está registrado");
      return;
    }

    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("✅ Registro exitoso. Serás redirigido al inicio de sesión.");
    window.location.href = "acceder.html";
  });

  // Solo un género a la vez
  const generos = document.querySelectorAll('input[name="genero"]');
  generos.forEach(chk => {
    chk.addEventListener("change", () => {
      generos.forEach(g => {
        if (g !== chk) g.checked = false;
      });
    });
  });
});