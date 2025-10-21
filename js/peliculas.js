// 🔹 Obtener elementos del DOM
const contCartelera = document.getElementById("cont_cartelera");
const filtroGenero = document.getElementById("filtroGenero");
const filtroIdioma = document.getElementById("filtroIdioma");
const filtroFormato = document.getElementById("filtroFormato");
const filtroClasificacion = document.getElementById("filtroClasificacion");

// 🔹 Elementos de filtros activos
const listaFiltros = document.getElementById("listaFiltros");
const btnLimpiar = document.getElementById("btnLimpiarFiltros");

// 🔹 Renderizar películas en pantalla
function renderizarPeliculas(peliculas) {
  contCartelera.innerHTML = "";
  if (peliculas.length === 0) {
    contCartelera.innerHTML = "<p>No se encontraron películas.</p>";
    return;
  }

  peliculas.forEach(peli => {
    const div = document.createElement("div");
    div.classList.add("cont_pelicula");
    div.innerHTML = `
      <img src="${peli.poster}" alt="${peli.titulo}">
      <h4>${peli.titulo}</h4>
      <span>${Math.floor(peli.duracion / 60)}h ${peli.duracion % 60}m | ${peli.clasificacion}</span>
      <p>${peli.genero}</p>
      <button>Ver Horarios</button>
      <button data-id="${peli.id}">Ver detalles</button>
    `;
    contCartelera.appendChild(div);
  });
}

document.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const id = e.target.dataset.id;
    console.log(id)
  }
});

// 🔹 Aplica todos los filtros
function aplicarFiltros() {
  const generoSel = filtroGenero.value;
  const idiomaSel = filtroIdioma.value;
  const formatoSel = filtroFormato.value;
  const clasificacionSel = filtroClasificacion.value;

  const filtradas = dataPelis.filter(p => {
    const cumpleGenero = generoSel === "todos" || p.genero.includes(generoSel);
    const cumpleIdioma = idiomaSel === "todos" || p.idioma.includes(idiomaSel);
    const cumpleFormato = formatoSel === "todos" || p.formato.includes(formatoSel);
    const cumpleClasificacion = clasificacionSel === "todos" || p.clasificacion.includes(clasificacionSel);
    return cumpleGenero && cumpleIdioma && cumpleFormato && cumpleClasificacion;
  });

  renderizarPeliculas(filtradas);
}

// 🔹 Actualiza los filtros activos (muestra botones)
function actualizarFiltrosActivos() {
  listaFiltros.innerHTML = ""; // limpiar lista actual

  const filtros = [
    { nombre: "Género", valor: filtroGenero.value, ref: filtroGenero },
    { nombre: "Idioma", valor: filtroIdioma.value, ref: filtroIdioma },
    { nombre: "Formato", valor: filtroFormato.value, ref: filtroFormato },
    { nombre: "Clasificación", valor: filtroClasificacion.value, ref: filtroClasificacion }
  ];

  const activos = filtros.filter(f => f.valor !== "todos");

  // 🔸 Mostrar u ocultar el botón "Limpiar filtros"
  if (activos.length === 0) {
    listaFiltros.textContent = "";
    btnLimpiar.style.display = "none";
    return;
  } else {
    btnLimpiar.style.display = "inline-block";
  }

  activos.forEach(f => {
    const btn = document.createElement("button");
    btn.textContent = `${f.nombre}: ${f.valor} ✕`;
    btn.classList.add("filtro-boton");
    btn.addEventListener("click", () => {
      f.ref.value = "todos";
      aplicarFiltros();
      actualizarFiltrosActivos();
    });
    listaFiltros.appendChild(btn);
  });
}

// 🔹 Botón para limpiar todos los filtros
btnLimpiar.addEventListener("click", () => {
  filtroGenero.value = "todos";
  filtroIdioma.value = "todos";
  filtroFormato.value = "todos";
  filtroClasificacion.value = "todos";
  aplicarFiltros();
  actualizarFiltrosActivos();
});

// ------------------------
// 🔹 Funciones para llenar los selects dinámicamente
function llenarSelectGeneros() {
  const generos = new Set();
  dataPelis.forEach(p => p.genero.split(",").forEach(g => generos.add(g.trim())));

  filtroGenero.innerHTML = `<option value="todos">Géneros</option>`;
  generos.forEach(genero => {
    const option = document.createElement("option");
    option.value = genero;
    option.textContent = genero;
    filtroGenero.appendChild(option);
  });
}

function llenarSelectIdiomas() {
  const idiomas = new Set();
  dataPelis.forEach(p => p.idioma.split(",").forEach(i => idiomas.add(i.trim())));

  filtroIdioma.innerHTML = `<option value="todos">Idiomas</option>`;
  idiomas.forEach(idioma => {
    const option = document.createElement("option");
    option.value = idioma;
    option.textContent = idioma;
    filtroIdioma.appendChild(option);
  });
}

function llenarSelectFormatos() {
  const formatos = new Set();
  dataPelis.forEach(p => p.formato.split(",").forEach(f => formatos.add(f.trim())));

  filtroFormato.innerHTML = `<option value="todos">Formatos</option>`;
  formatos.forEach(formato => {
    const option = document.createElement("option");
    option.value = formato;
    option.textContent = formato;
    filtroFormato.appendChild(option);
  });
}

function llenarSelectClasificaciones() {
  const clasificaciones = new Set();
  dataPelis.forEach(p => p.clasificacion.split(",").forEach(c => clasificaciones.add(c.trim())));

  filtroClasificacion.innerHTML = `<option value="todos">Clasificación</option>`;
  clasificaciones.forEach(clasificacion => {
    const option = document.createElement("option");
    option.value = clasificacion;
    option.textContent = clasificacion;
    filtroClasificacion.appendChild(option);
  });
}

// 🔹 Escuchar cambios en los selects
[filtroGenero, filtroIdioma, filtroFormato, filtroClasificacion].forEach(filtro => {
  filtro.addEventListener("change", () => {
    aplicarFiltros();
    actualizarFiltrosActivos();
  });
});

// 🔹 Inicialización
llenarSelectGeneros();
llenarSelectIdiomas();
llenarSelectFormatos();
llenarSelectClasificaciones();
renderizarPeliculas(dataPelis);
actualizarFiltrosActivos();
