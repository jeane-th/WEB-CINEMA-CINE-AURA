// Recibe el id desde la pagina peliculas 
const params = new URLSearchParams(window.location.search);
const idPeli = Number(params.get("id"));

console.log("ID recibido:", idPeli);

const posicion = dataPelis.findIndex(peli => peli.id === idPeli);
const pelicula = dataPelis[posicion]
console.log(pelicula);

// Renderizar pelicula elegida 
const divDetallePelicula = document.getElementById("box_pelicula");
divDetallePelicula.innerHTML = `
        <img src="${pelicula.poster}" class="img_pelicula"> 
        <div class="box_2_texto"> 
            <h4>Director:</h4> 
            <p>Dean Fleisch Camp</p> 
            <h4>Reparto:</h4> 
            <p>Sydney Agudong, Maia Kealoha, Chris Sanders</p> 
        </div>
    `;
const div = document.getElementById("box_pelicula_detalle");
div.innerHTML = `
        <h3>${pelicula.titulo}</h3>
        <p class="box_detalle_text">
            <iconify-icon icon="ic:outline-watch-later" class="icon_watch"></iconify-icon>
            ${pelicula.duracion} min - ${pelicula.clasificacion}
        </p>
    `;

const ocupadas = ['A-3', 'A-4', 'C-1', 'C-2', 'C-3', 'D-8']
const seleccionadas = []

document.addEventListener('DOMContentLoaded', () => {
    const butacas = document.querySelectorAll('.butaca')
    const butacasSeleccionadas = document.getElementById('butacas_seleccionadas')
    const resumenText = document.getElementById('resumen_text')

    butacas.forEach(b => {
        const fila = b.dataset.fila
        const num = b.dataset.numero
        const id = `${fila}-${num}`

        if (ocupadas.includes(id)) {
            b.classList.add('ocupada')
            b.style.backgroundColor = '#444'
            b.style.cursor = 'not-allowed'
        }

        //Al hacer click en una butaca
        b.addEventListener('click', () => {
            if (b.classList.contains('ocupada')) return

            if (b.classList.contains('seleccionada')) {
                b.classList.remove('seleccionada')
                b.style.backgroundColor = '#d6d6d6'
                const index = seleccionadas.indexOf(id)
                if (index !== -1) seleccionadas.splice(index, 1)
            } else {
                b.classList.add('seleccionada')
                b.style.backgroundColor = '#ed4d5f'
                seleccionadas.push(id)
            }
            actualizarResumen()
        })
    })
    function actualizarResumen() {
        butacasSeleccionadas.innerHTML = ''

        if (seleccionadas.length === 0) {
            resumenText.textContent = 'Butacas seleccionadas:'
            return
        }

        seleccionadas.forEach(id => {
            const tag = document.createElement('span')

            tag.classList.add('butaca_tag')
            tag.textContent = id
            butacasSeleccionadas.appendChild(tag)
        })
    }
})


// continuar continuar
const btnContinuar = document.getElementById("boton_comprar")
btnContinuar.addEventListener("click", () =>{
    let cantidadBoletos=seleccionadas.length;
     redirectComprar(
        seleccionadas,
        pelicula.titulo, 
        pelicula.poster, 
        pelicula.formato,
        cantidadBoletos, 
        25)
    } 
);

function redirectComprar( but, titulo,poster,formato, cantBol, precio) {
    const datosCompra = { but, titulo,poster,formato, cantBol, precio };
    // guardar en sessionStorage
    sessionStorage.setItem("datosCompra", JSON.stringify(datosCompra));

    // redirigir a la página de pago
    window.location.href = "../paginas/pagos.html";
}

