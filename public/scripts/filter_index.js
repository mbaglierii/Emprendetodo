document.querySelector('.categorias').addEventListener('click', (event) => {
    const categoria = event.target.closest('.categoria'); // Verifica si el clic ocurrió en un elemento válido
    if (categoria) {
        const categoriaId = categoria.getAttribute('data-id');
        ejecutarFuncion(categoriaId);
    }
});

function ejecutarFuncion(id) {
    fetchPublicaciones_categoria(id);
}


//cargar publicaciones
export async function fetchPublicaciones(busqueda) {
    try {
        const response = await fetch(`/publicaciones/find?busqueda=${encodeURIComponent(busqueda)}`);
        if (!response.ok) {
            throw new Error('Error al obtener las publicaciones');
        }
        
        const publicaciones = await response.json();
        
        const cuadrilla = document.querySelector('.cuadrilla');
        cuadrilla.innerHTML = ''; 

        publicaciones.forEach((publicacion) => {
            console.log(publicacion);
            const imagenSrc = publicacion.imagenes.length > 0 
                ? `/publicaciones_photos/${publicacion.imagenes[0]}`
                : 'images/artesany.png'; 
            

            const cuadro = document.createElement('div');
            cuadro.classList.add('cuadro');
            cuadro.setAttribute('data-id', publicacion.pk_publicacion); 
            cuadro.addEventListener('click', function() {
                mostrarInformacion(this); 
            });

            const img = document.createElement('img');
            img.src = imagenSrc;
            img.alt = publicacion.nombre_publicacion || 'Imagen de la publicación';
            
            cuadro.appendChild(img);
            cuadrilla.appendChild(cuadro);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}



function busqueda_publicacion(){
    const boton = document.getElementById('enviar_busqueda');
    const busqueda = document.getElementById('text_busqueda');

    boton.addEventListener('click', function() {
        fetchPublicaciones(busqueda.value); 
    });
}
document.addEventListener('DOMContentLoaded', busqueda_publicacion);


export async function fetchPublicaciones_categoria(id_categoria) {
    try {
        const response = await fetch(`/publicaciones/find_by_cat?id_categoria=${encodeURIComponent(id_categoria)}`);

        if (!response.ok) {
            throw new Error('Error al obtener las publicaciones');
        }
        
        const publicaciones = await response.json();
        
        const cuadrilla = document.querySelector('.cuadrilla');
        cuadrilla.innerHTML = ''; 

        publicaciones.forEach((publicacion) => {
            console.log(publicacion);
            const imagenSrc = publicacion.imagenes.length > 0 
                ? `/publicaciones_photos/${publicacion.imagenes[0]}`
                : 'images/artesany.png'; 
            

            const cuadro = document.createElement('div');
            cuadro.classList.add('cuadro');
            cuadro.setAttribute('data-id', publicacion.pk_publicacion); 
            cuadro.addEventListener('click', function() {
                mostrarInformacion(this); 
            });

            const img = document.createElement('img');
            img.src = imagenSrc;
            img.alt = publicacion.nombre_publicacion || 'Imagen de la publicación';
            
            cuadro.appendChild(img);
            cuadrilla.appendChild(cuadro);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

function mostrarInformacion(element) {
    const publicacionid = element.getAttribute('data-id');
    const showButton = document.getElementById('show-button');


    fetch(`/publicaciones/find_by_id?pk_publicacion=${publicacionid}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('titulo-publicacion').textContent = data[0].nombre_publicacion;
            document.getElementById('descripcion-publicacion').textContent = data[0].descripcion;

            const imagenesContainer = document.getElementById('imagenes-publicacion');
            imagenesContainer.innerHTML = ''; 
            data[0].imagenes.forEach(imagen => {
                const img = document.createElement('img');
                img.src = `/publicaciones_photos/${imagen}`;
                img.alt = data[0].nombre_publicacion;
                img.style.width = '100px';
                img.style.margin = '5px';
                imagenesContainer.appendChild(img);
            });

            document.getElementById('emprendimiento-publicacion').textContent = `Emprendimiento: ${data[0].nombre_emprendimiento}`;
            document.getElementById('informacion-publicacion').style.display = 'block';

            showButton.addEventListener('click', () => {
                mostrarInformacion_emprendimiento(data[0].fk_emprendimiento);
            });

        })
        .catch(error => console.error('Error al obtener la información:', error));
}

function cerrarInformacion() {
    document.getElementById('informacion-publicacion').style.display = 'none';
}



//informacion emprendimiento
const overlay = document.getElementById('overlay');
const closeButton = document.getElementById('close-button');

function mostrarInformacion_emprendimiento(id) {
    cerrarInformacion(); 
    overlay.style.display = 'flex';

    fetch(`/emprendimientos/encontrar?emprendimiento=${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            document.getElementById('popup-title').textContent = data.nombre_emprendimiento;
            document.getElementById('popup-description').textContent = "Descripcion: " +data.descripcion;
            document.getElementById('popup-date').textContent = "Fecha de creacion: " + formatearFecha(data.fecha_creacion);
            document.getElementById('popup-reviews').textContent = "Reviews: " + data.reviews;
            document.getElementById('popup-phone').textContent = "Telefono: " + data.telefono;
            document.getElementById('popup-image').src = "/emprendimiento_photos/" + data.imagen_dir_perfil_empren

        })
        .catch(error => console.error('Error al obtener la información del emprendimiento:', error));


}

closeButton.addEventListener('click', () => {
    overlay.style.display = 'none';
});


function formatearFecha(fechaISO) {
    return fechaISO.split('T')[0];
}


window.cerrarInformacion = cerrarInformacion;
