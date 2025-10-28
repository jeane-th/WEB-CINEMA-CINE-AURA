document.addEventListener("DOMContentLoaded", () => {
    const carrusel = document.querySelector(".carrusel");
    const titulo = carrusel.querySelector(".tit");
    const descripcion = carrusel.querySelector(".Despc");
    const btnNumeros = carrusel.querySelector(".number_button");
    const btn = document.getElementById("btnComprarHome");

    // 🔹 Tomar solo las 5 primeras películas
    const primerasCinco = dataPelis.slice(0, 5);
    console.log(primerasCinco)
    let indiceActual = 0;

    // 🔸 Función que actualiza el fondo y texto
    function mostrarPelicula(index) {
        const peli = primerasCinco[index];
        carrusel.style.backgroundImage = `url(${peli.background})`;
        titulo.textContent = peli.titulo;
        descripcion.textContent = peli.sinopsis || "Sin descripción disponible";
        idActual = peli.id; // guarda el id actual
        // console.log("Mostrando:", idActual);
    }

    // 🔸 Crear botones dinámicamente
    btnNumeros.innerHTML = ""; // limpia si ya hay botones
    primerasCinco.forEach((peli, i) => {
        const a = document.createElement("a");
        a.href = "#";
        a.innerHTML = `<iconify-icon icon="fluent:number-circle-${i + 1}-20-regular"></iconify-icon>`;
        a.addEventListener("click", (e) => {
            e.preventDefault();
            mostrarPelicula(i);
            indiceActual = i;
        });
        btnNumeros.appendChild(a);
    });

    // 🔸 Mostrar la primera película al cargar
    mostrarPelicula(indiceActual);

    // 🔸 Rotar automáticamente cada 3 segundos
    setInterval(() => {
        indiceActual = (indiceActual + 1) % primerasCinco.length; // pasa a la siguiente o vuelve al inicio
        mostrarPelicula(indiceActual);
    }, 3000);

    // 🔸 Listener único para el botón
    btn.addEventListener("click", () => {
        peliInfo(idActual);
    });

});


function peliInfo(id) {
    console.log("ID:", id);
    window.location.href = `./paginas/boleteria.html?id=${id}`;
}


document.addEventListener("DOMContentLoaded", () => {
    const contPeliculas = document.querySelector(".peliculas");
    const flechaIzq = document.querySelector(".flecha_izquierda a");
    const flechaDer = document.querySelector(".flecha_derecha a");

    // 🔹 Tomar solo las 5 primeras películas del array
    const primerasCinco = dataPelis.slice(0, 5);

    // 🔹 Crear dinámicamente las imágenes
    contPeliculas.innerHTML = ""; // limpiar si hay estáticas
    primerasCinco.forEach((peli, index) => {
        const img = document.createElement("img");
        img.src = peli.poster || peli.poster; // usa tu propiedad de imagen
        img.alt = peli.titulo;
        img.id = `p_${index + 1}`;
        contPeliculas.appendChild(img);
    });

    // 🔹 Capturar las imágenes recién creadas
    const peliculas = document.querySelectorAll(".peliculas img");

    // 🔹 Crear arreglo de orden
    let orden = Array.from(peliculas);

    // 🔹 Aplicar transición suave
    orden.forEach(img => {
        img.style.transition = "all 0.5s ease";
    });

    // 🔹 Posiciones según tu CSS original
    function actualizarPosiciones() {
        const posiciones = [
            { right: "270px", left: "auto", z: 0, w: "170px", h: "255px" },
            { right: "85px", left: "auto", z: 1, w: "220px", h: "330px" },
            { left: "50%", right: "auto", z: 2, w: "250px", h: "375px", t: "translateX(-50%)" },
            { left: "85px", right: "auto", z: 1, w: "220px", h: "330px" },
            { left: "270px", right: "auto", z: 0, w: "170px", h: "255px" },
        ];

        orden.forEach((img, i) => {
            const p = posiciones[i];
            img.style.left = p.left || "auto";
            img.style.right = p.right || "auto";
            img.style.zIndex = p.z;
            img.style.width = p.w;
            img.style.height = p.h;
            img.style.transform = p.t || "none";
        });
    }

    // 🔹 Inicializar
    actualizarPosiciones();

    // 👉 Flecha derecha → siguiente
    flechaDer.addEventListener("click", e => {
        e.preventDefault();
        const ultimo = orden.pop();
        orden.unshift(ultimo);
        actualizarPosiciones();
    });

    // 👈 Flecha izquierda → anterior
    flechaIzq.addEventListener("click", e => {
        e.preventDefault();
        const primero = orden.shift();
        orden.push(primero);
        actualizarPosiciones();
    });
});


const contEstrenos = document.getElementById("cont_estrenos_home");

function renderizarPeliculas(peliculas) {
    contEstrenos.innerHTML = "";

    const hoy = new Date();
    const dosMesesDespues = new Date();
    dosMesesDespues.setMonth(hoy.getMonth() + 3);

    const peliculasFiltradas = peliculas.filter(peli => {
        if (!peli.fecha) return false; // si no hay fecha, se descarta
        const fechaEstreno = new Date(peli.fecha);
        return fechaEstreno >= dosMesesDespues; // solo las que se estrenan dentro de 2 meses o más
    });

    peliculasFiltradas.forEach((peli, index) => {
        const div = document.createElement("div");

        // 🔸 Alternar clases según el índice
        if (index % 2 === 0) {
            div.classList.add("video_1"); // impares (posición 1, 3, 5...)
        } else {
            div.classList.add("video_2"); // pares (posición 2, 4, 6...)
        }
        div.innerHTML = `
           <div class="video_box">
                <iframe
                    width="500"
                    height="281"
                    src="${peli.trailer}"
                    title="Trailer de ${peli.titulo}"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
                </iframe>
            </div>
            <div class="texto_video">
                <div class="texto_preventa">
                    <p id="preventa">Preventa</p>
                    <iconify-icon icon="mdi:calendar-outline" id="icon_calendar"></iconify-icon>
                </div>
                    <h3>${peli.titulo}</h3>
                    <p id="desc">${peli.sinopsis}</p>
                </div>
             </div>
        `;

        contEstrenos.appendChild(div);
    });
}

renderizarPeliculas(dataPelis);
