fetch("./componentes2/header.html")
  .then(res => res.text())
  .then(data => {
    // Insertar el header
    document.getElementById("header").innerHTML = data;

    // === Activar el enlace actual ===
    const currentPage = window.location.pathname.split("/").pop();
    const links = document.querySelectorAll("nav .menu a");

    links.forEach(link => {
      const href = link.getAttribute("href").split("/").pop();

      // Si la página actual pertenece al grupo de películas
      if (
        ["peliculas.html", "estrenos.html", "preventa.html"].includes(currentPage) &&
        href === "peliculas.html"
      ) {
        link.classList.add("activo");
      }
      // Si es cualquier otra página, se marca normalmente
      else if (href === currentPage) {
        link.classList.add("activo");
      }
    });

    // === Crear y añadir el contenedor del buscador (oculto por defecto) ===
    const buscadorHtml = `
      <div class="buscador" id="buscador" style="display:none;">
        <input type="text" id="inputBuscador" placeholder="Buscar película...">
        <div class="resultados" id="resultadosBuscador"></div>
      </div>
    `;
    // lo añadimos al header (al final del header)
    const headerElem = document.querySelector("header");
    headerElem.insertAdjacentHTML("beforeend", buscadorHtml);

    // === Selectores del buscador ===
    const btnLupa = document.querySelector(".opciones a"); // la primera <a> dentro de .opciones (tu lupa)
    const buscador = document.getElementById("buscador");
    const inputBuscador = document.getElementById("inputBuscador");
    const resultados = document.getElementById("resultadosBuscador");

    // Mostrar/ocultar buscador al hacer clic en la lupa
    btnLupa.addEventListener("click", (e) => {
      e.preventDefault();
      const isVisible = buscador.style.display === "block";
      if (!isVisible) {
        buscador.style.display = "block";
        inputBuscador.value = "";
        resultados.innerHTML = "";
        inputBuscador.focus();
      } else {
        buscador.style.display = "none";
      }
    });

    // Función para renderizar resultados
    function renderResultados(items) {
      resultados.innerHTML = "";
      if (!items || items.length === 0) {
        resultados.innerHTML = "<div class='resultado-item'>No se encontraron películas.</div>";
        return;
      }

      items.forEach(p => {
        const div = document.createElement("div");
        div.className = "resultado-item";
        div.innerHTML = `
      <img src="${p.poster}" alt="${p.titulo}">
      <span class="titulo-peli">${p.titulo}</span>
    `;
        div.addEventListener("click", () => peliInfo(p.id));
        resultados.appendChild(div);
      });
    }
    function peliInfo(id) {
      console.log("ID:", id);
      window.location.href = `./paginas/boleteria.html?id=${id}`;
    }


    // Filtrado en vivo (usa dataPelis que debe estar cargado antes)
    inputBuscador.addEventListener("input", () => {
      const texto = inputBuscador.value.trim().toLowerCase();
      resultados.innerHTML = "";
      if (!texto) {
        resultados.style.display = "none";
        return;
      }

      if (typeof dataPelis === "undefined") {
        resultados.innerHTML = "<div class='resultado-item'>No hay datos de películas.</div>";
        resultados.style.display = "block";
        return;
      }

      const coincidencias = dataPelis.filter(p => p.titulo.toLowerCase().includes(texto));
      renderResultados(coincidencias);
      resultados.style.display = "block";
    });

    // Buscar con Enter: si hay resultados, tomar el primer resultado
    inputBuscador.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const first = resultados.querySelector(".resultado-item");
        if (first && typeof dataPelis !== "undefined") {
          // tomamos el primer match
          const texto = inputBuscador.value.trim().toLowerCase();
          const match = dataPelis.find(p => p.titulo.toLowerCase().includes(texto));
          if (match) window.location.href = `./paginas/detalle.html?id=${match.id}`; // ajusta ruta si hace falta
        }
      }
    });

    // Ocultar buscador si se hace clic fuera
    document.addEventListener("click", (e) => {
      if (!e.target.closest("#buscador") && !e.target.closest(".opciones a")) {
        buscador.style.display = "none";
      }
    });

  })
  .finally(() => {
    document.body.style.visibility = "visible";
  });
