document.addEventListener('DOMContentLoaded', () => {
    const butacas = document.querySelectorAll('.butaca')
    const butacasSeleccionadas = document.getElementById('butacas_seleccionadas')
    const resumenText = document.getElementById('resumen_text')

    const ocupadas = ['A-3', 'A-4', 'C-1', 'C-2','C-3','D-8']
    const seleccionadas = []

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
                b.style.backgroundColor= '#ed4d5f'
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
