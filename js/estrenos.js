// Peliculas que se estrenan en los siguientes 2 meses en adelante

const contEstrenos = document.getElementById("cont_estrenos");

// 🔹 Renderizar películas en pantalla
function renderizarPeliculas(peliculas) {
    contEstrenos.innerHTML = "";

    const hoy = new Date();
    const dosMesesDespues = new Date();
    dosMesesDespues.setMonth(hoy.getMonth() + 2);

    const peliculasFiltradas = peliculas.filter(peli => {
        if (!peli.fecha) return false; // si no hay fecha, se descarta
        const fechaEstreno = new Date(peli.fecha);
        return fechaEstreno >= dosMesesDespues; // solo las que se estrenan dentro de 2 meses o más
    });

    peliculasFiltradas.forEach((peli, index) => {
        const div = document.createElement("div");

        // 🔸 Alternar clases según el índice
        if (index % 2 === 0) {
            div.classList.add("video_cont"); // impares (posición 1, 3, 5...)
        } else {
            div.classList.add("video_cont_2"); // pares (posición 2, 4, 6...)
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
            <div class="video_info">
                <span class="span_cont">
                    <span class="span_text">Estreno</span>
                    <iconify-icon icon="mdi:calendar" class="icon_calendar"></iconify-icon>
                </span>
                <h3>${peli.titulo}</h3>
                <p>${peli.sinopsis}</p>
            </div>
        `;

        contEstrenos.appendChild(div);
    });
}

renderizarPeliculas(dataPelis);
