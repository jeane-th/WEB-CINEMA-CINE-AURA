const datos = JSON.parse(sessionStorage.getItem("datosCompra")).datos;

console.log(datos)


const producto1 = document.getElementById("producto1");
producto1.innerHTML = `
    <div class="imagen_producto">
        <img src="${datos.poster}" alt="">
    </div>
     <div class="info_producto">
        <div id="detalle-pelicula-boletos" class="descripcion_producto">
         <h1>${datos.titulo}</h1>
            <p><b>${datos.formato}</b></p>
            <p>${
                datos.but
            }</p>
        </div>
        <div id=""class="precio_cantidad">
            <p class="precio"><span>s/.</span> ${datos.precio*datos.cantBol}</p>
            <div class="cantidad">
                <div class="numero_div">
                    <p id="numero">cant.${datos.cantBol}</p>
                </div>
            </div>
        </div>
    </div>
`
