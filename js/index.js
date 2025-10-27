//  EFECTO TARJETAS
const tarjetas = document.querySelectorAll('.cards div');

tarjetas.forEach(tarjeta => {
  tarjeta.addEventListener('mouseenter', () => {
    tarjeta.style.transform = 'scale(1.1)';
    tarjeta.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    tarjeta.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
    tarjeta.style.borderRadius = '10px';
  });

  tarjeta.addEventListener('mouseleave', () => {
    tarjeta.style.transform = 'scale(1)';
    tarjeta.style.boxShadow = 'none';
  });
});


// 🎬 CARRUSEL PRINCIPAL
 const peliculasBanner = [
    {
        titulo: "Lilo & Stitch",
        descripcion: "La conmovedora y divertidísima historia de una solitaria niña hawaiana y el extraterrestre fugitivo que la ayuda a reparar su desestructurada familia."
    },
    {
        titulo: "Culpa nuestra", 
        descripcion: "La boda de Jenna y Lion propicia el tan deseado reencuentro entre Noah y Nick tiempo después de su ruptura."
    },
    {
        titulo: "Guardianes de la noche",
        descripcion: "El Cuerpo de Cazadores de Demonios se enfrenta a los Doce Kizuki restantes antes de enfrentarse a Muzan en el Castillo del Infinito."
    },
    {
        titulo: "Black Phone 2",
        descripcion: "Finney, ahora marcado por el trauma, junto a su hermana menor Gwen, comienzan a tener visiones relacionadas con asesinatos."
    },
    {
        titulo: "Strangers: Capítulo 2",
        descripcion: "De camino a su luna de miel, el vehículo de una pareja se avería, obligándoles a refugiarse en un remoto Airbnb."
    }
];

let currentSlide = 0;
let slideInterval;

// Función para cambiar al siguiente slide
function nextSlide() {
    const nextSlide = (currentSlide + 1) % peliculasBanner.length;
    changeToSlide(nextSlide);
}

// Función para cambiar a un slide específico - VERSIÓN MÁS FUERTE
function changeToSlide(slideIndex) {
    console.log(`Cambiando a slide: ${slideIndex + 1}`);
    
    const items = document.querySelectorAll('.item');
    
    // Ocultar TODOS los slides de manera forzada
    items.forEach(item => {
        item.style.cssText = `
            opacity: 0 !important;
            z-index: 0 !important;
            display: block !important;
            visibility: visible !important;
        `;
    });
    
    // Mostrar SOLO el slide seleccionado
    const targetItem = document.getElementById(`item_${slideIndex + 1}`);
    if (targetItem) {
        targetItem.style.cssText = `
            opacity: 1 !important;
            z-index: 1 !important;
            display: block !important;
            visibility: visible !important;
        `;
        console.log(`Mostrando item_${slideIndex + 1}`);
    }
    
    currentSlide = slideIndex;
    updateSlideText();
}

// Función para actualizar el texto
function updateSlideText() {
    const tituloElement = document.querySelector('.texto h2');
    const descripcionElement = document.querySelector('.texto p');
    
    if (tituloElement && descripcionElement) {
        tituloElement.textContent = peliculasBanner[currentSlide].titulo;
        descripcionElement.textContent = peliculasBanner[currentSlide].descripcion;
        console.log(`Texto actualizado: ${peliculasBanner[currentSlide].titulo}`);
    }
}

// Función para ir a un slide específico
function goToSlide(index) {
    clearInterval(slideInterval);
    changeToSlide(index);
    startSlideShow();
}

// Función para iniciar el cambio automático
function startSlideShow() {
    slideInterval = setInterval(nextSlide, 3000); // 3 segundos para prueba
}

// Función para configurar eventos de los botones
function setupButtonEvents() {
    const buttons = document.querySelectorAll('.number_button a');
    
    buttons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            goToSlide(index);
        });
    });
}

// Función para pausar el carrusel
function setupCarouselHover() {
    const carrusel = document.querySelector('.carrusel');
    
    if (carrusel) {
        carrusel.addEventListener('mouseenter', () => {
            console.log('Carrusel pausado');
            clearInterval(slideInterval);
        });
        
        carrusel.addEventListener('mouseleave', () => {
            console.log('Carrusel reanudado');
            startSlideShow();
        });
    }
}

// Función para inicializar el carrusel - VERSIÓN MÁS FUERTE
function initializeCarousel() {
    console.log('Inicializando carrusel...');
    
    const items = document.querySelectorAll('.item');
    
    // Ocultar todos excepto el primero de manera forzada
    items.forEach((item, index) => {
        if (index === 0) {
            item.style.cssText = `
                opacity: 1 !important;
                z-index: 1 !important;
                display: block !important;
                visibility: visible !important;
            `;
        } else {
            item.style.cssText = `
                opacity: 0 !important;
                z-index: 0 !important;
                display: block !important;
                visibility: visible !important;
            `;
        }
    });
    
    console.log('Carrusel inicializado');
}

// Inicializar cuando la página cargue
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado - Iniciando carrusel principal');
    
    // Esperar un poco para asegurar que todo esté listo
    setTimeout(() => {
        initializeCarousel();
        setupButtonEvents();
        setupCarouselHover();
        startSlideShow();
        updateSlideText();
        
        console.log('Carrusel principal completamente inicializado');
    }, 100);
});


// Función para pausar el carrusel cuando el mouse está sobre él
function setupCarouselHover() {
    const carrusel = document.querySelector('.carrusel');
    
    if (carrusel) {
        carrusel.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        carrusel.addEventListener('mouseleave', () => {
            startSlideShow();
        });
    }
}

// Función para inicializar el carrusel
function initializeCarousel() {
    // Ocultar todos los slides excepto el primero
    const items = document.querySelectorAll('.item');
    items.forEach((item, index) => {
        if (index === 0) {
            item.style.opacity = '1';
            item.style.zIndex = '1';
        } else {
            item.style.opacity = '0';
            item.style.zIndex = '0';
        }
    });
    
    // Asegurar que todos los items tengan transición
    items.forEach(item => {
        item.style.transition = 'opacity 0.5s ease';
    });
}

// Inicializar el carrusel cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el carrusel
    initializeCarousel();
    
    // Configurar eventos de los botones
    setupButtonEvents();
    
    // Configurar pausa al hacer hover
    setupCarouselHover();
    
    // Iniciar el cambio automático
    startSlideShow();
    
    // Actualizar texto inicial
    updateSlideText();
});



document.addEventListener('DOMContentLoaded', () => {
    // Elementos
    const peliculas = Array.from(document.querySelectorAll('.peliculas img'));
    const btnIzquierda = document.querySelector('.flecha_izquierda a');
    const btnDerecha = document.querySelector('.flecha_derecha a');

    if (peliculas.length === 0) {
        console.warn('No se encontraron imágenes en .peliculas');
        return;
    }

    // Configuración basada en tu CSS
    const CONFIG = {
        autoPlayInterval: 4000,
        transitionDuration: '0.8s ease',
        positions: [
            { // Posición 1 - Izquierda lejana (como #p_5 en tu CSS)
                id: 'pos_5',
                left: '270px',
                right: '',
                width: '170px',
                height: '255px',
                zIndex: 0,
                center: false
            },
            { // Posición 2 - Izquierda cercana (como #p_4 en tu CSS)
                id: 'pos_4',
                left: '85px',
                right: '',
                width: '220px',
                height: '330px',
                zIndex: 1,
                center: false
            },
            { // Posición 3 - CENTRO (como #p_3 en tu CSS)
                id: 'pos_3',
                left: '50%',
                right: '',
                width: '250px',
                height: '375px',
                zIndex: 2,
                center: true
            },
            { // Posición 4 - Derecha cercana (como #p_2 en tu CSS)
                id: 'pos_2',
                left: '',
                right: '85px',
                width: '220px',
                height: '330px',
                zIndex: 1,
                center: false
            },
            { // Posición 5 - Derecha lejana (como #p_1 en tu CSS)
                id: 'pos_1',
                left: '',
                right: '270px',
                width: '170px',
                height: '255px',
                zIndex: 0,
                center: false
            }
        ]
    };

    let indiceCentro = 2; // Empieza con la imagen 3 en el centro
    let intervalo = null;

    // Aplicar estilos base a todas las imágenes
    function aplicarEstilosBase() {
        peliculas.forEach(img => {
            Object.assign(img.style, {
                position: 'absolute',
                transition: `all ${CONFIG.transitionDuration}`,
                opacity: '1'
            });
        });
    }

    // Actualizar las posiciones del carrusel
    function actualizarCarrusel() {
        // Para cada posición, asignar la imagen correspondiente
        CONFIG.positions.forEach((posicion, indexPos) => {
            // Calcular qué imagen va en esta posición
            // La posición central (index 2) muestra la imagen indiceCentro
            const diff = indexPos - 2; // diferencia desde el centro
            let indiceImagen = (indiceCentro + diff + peliculas.length) % peliculas.length;
            
            const img = peliculas[indiceImagen];
            
            if (img) {
                // Aplicar estilos de posición
                img.style.width = posicion.width;
                img.style.height = posicion.height;
                img.style.zIndex = posicion.zIndex;
                
                // Posicionamiento horizontal
                if (posicion.center) {
                    img.style.left = posicion.left;
                    img.style.right = posicion.right;
                    img.style.transform = 'translateX(-50%)';
                } else {
                    img.style.left = posicion.left;
                    img.style.right = posicion.right;
                    img.style.transform = 'none';
                }
            }
        });
    }

    // Navegación
    function moverDerecha() {
        indiceCentro = (indiceCentro + 1) % peliculas.length;
        actualizarCarrusel();
        actualizarEnlacesFlechas();
    }

    function moverIzquierda() {
        indiceCentro = (indiceCentro - 1 + peliculas.length) % peliculas.length;
        actualizarCarrusel();
        actualizarEnlacesFlechas();
    }

    // Actualizar los enlaces de las flechas para que apunten a las imágenes correctas
    function actualizarEnlacesFlechas() {
        if (btnIzquierda) {
            const indiceAnterior = (indiceCentro - 1 + peliculas.length) % peliculas.length;
            btnIzquierda.href = `#p_${indiceAnterior + 1}`;
        }
        
        if (btnDerecha) {
            const indiceSiguiente = (indiceCentro + 1) % peliculas.length;
            btnDerecha.href = `#p_${indiceSiguiente + 1}`;
        }
    }

    // Auto-play
    function iniciarAutoPlay() {
        clearInterval(intervalo);
        intervalo = setInterval(moverDerecha, CONFIG.autoPlayInterval);
    }

    // Inicialización
    function inicializar() {
        aplicarEstilosBase();
        actualizarCarrusel();
        actualizarEnlacesFlechas();
        iniciarAutoPlay();
        
        // Event listeners para botones
        if (btnDerecha) {
            btnDerecha.addEventListener('click', (e) => {
                e.preventDefault();
                clearInterval(intervalo);
                moverDerecha();
                iniciarAutoPlay();
            });
        }

        if (btnIzquierda) {
            btnIzquierda.addEventListener('click', (e) => {
                e.preventDefault();
                clearInterval(intervalo);
                moverIzquierda();
                iniciarAutoPlay();
            });
        }

        // Pausar al hacer hover
        const contenedor = document.querySelector('.selector_peliculas');
        if (contenedor) {
            contenedor.addEventListener('mouseenter', () => clearInterval(intervalo));
            contenedor.addEventListener('mouseleave', iniciarAutoPlay);
        }

        // También pausar al hacer hover en las flechas específicamente
        const flechas = document.querySelectorAll('.flecha_izquierda, .flecha_derecha');
        flechas.forEach(flecha => {
            flecha.addEventListener('mouseenter', () => clearInterval(intervalo));
            flecha.addEventListener('mouseleave', iniciarAutoPlay);
        });
    }

    inicializar();
});