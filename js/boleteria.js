document.addEventListener('DOMContentLoaded'), () => {
    const butacas = document.querySelectorAll('.butaca');
    const listaSeleccionadas = document.getElementById('lista_seleccionadas')
    const resuemntText = document.getElementById('resumen_texto')

    const ocupadas = ['A-3', 'A-4', 'B-5', 'C-8', 'D-10', 'E-1', 'F-7']
    const seleccionadas = []

    butacas.forEach(b => {
        const fila = b.dataset.fila
        const num = b.dataset.numero
        const id = `${fila}-${num}`

        if (ocupadas.includes(id)) {
            b.classList.add('ocupada')
            b.style.backgroundColor = '#444'
            b.style.cursos = 'not-allowed'
        }

        b.addEventListener('click', () => {
            if (b.classList.constains('ocupada')) return

            if (b.classList.constains('seleccionada')) {
                b.classList.remove('selecionada')
                b.style.backgroundColor = '#d6d6d6'
                const index = seleccionadas.indexOf(id)
                if (index !== -1) seleccionadas.splice(index, 1)
            } else {
                b.classList.add('seleccionada')
                b.style.backgroundColor= '#ed4d5f'
                seleccionadas.push(id)
            }
            actualizarResumen()
        })
    })

    function actualizarResumen() {
        listaSeleccionadas.innerHTML = ''

        if (seleccionadas.length === 0) {
            resuemntText.textContent = 'Butacas seleccionadas:'
            return
        }

        seleccionadas.forEach(id => {
            const tag = document.createElement('span')
            tag.classList.add('butaca_tag')
            tag.textContent = id
            listaSeleccionadas.appendChild(tag)
        })
    }

}