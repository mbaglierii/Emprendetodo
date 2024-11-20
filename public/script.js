document.addEventListener("DOMContentLoaded", function () {

    const logoutButton = document.querySelector(".logout");

    logoutButton.addEventListener("click", function (event) {
        event.preventDefault();
        
        localStorage.removeItem("userInfo");
        
        localStorage.removeItem("isLoggedIn");
        
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "token_admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        document.getElementById('user-info').classList.add('hidden');
        document.getElementById('PAdmin').style.display = "none";
        document.getElementById('navButtons').style.display = "flex";
        window.location.href = '/';
    });
    var token_valido = false;
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split('=');
        if (cookie[0] === 'token_admin') {
            document.getElementById('PAdmin').style.display = "block";
        };
        if (cookie[0] === 'token'){
            token_valido = true;
        }
    }

    if (token_valido === false){
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userInfo');
    }


});

function cargarCategorias() {
    fetch('/categorias')
        .then(response => response.json()) 
        .then(categorias => {
            const categoriasContainer = document.querySelector('.categorias');
            categoriasContainer.innerHTML = '';

            categorias.forEach(categoria => {
                const categoriaDiv = document.createElement('div');
                categoriaDiv.classList.add('categoria');
                
                const img = document.createElement('img');
                img.src = 'category_photos/' + categoria.imagen_dir_categoria; 
                img.alt = categoria.nombre_categoria;  

                categoriaDiv.appendChild(img);

               

                categoriasContainer.appendChild(categoriaDiv);
            });
        })
        .catch(error => {
            console.error('Error al cargar las categorías:', error);
        });
}

//cargar publicaciones
async function fetchPublicaciones(busqueda) {
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


function mostrarInformacion(element) {
    const publicacionid = element.getAttribute('data-id');

    console.log(publicacionid);

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
        })
        .catch(error => console.error('Error al obtener la información:', error));
}

function cerrarInformacion() {
    document.getElementById('informacion-publicacion').style.display = 'none';
}







const categorias = document.querySelector('.categorias');

let scrollSpeed = 1;
let intervalId;

function scrollCategorias() {
    categorias.scrollLeft += scrollSpeed;

    if (categorias.scrollLeft >= categorias.scrollWidth - categorias.clientWidth) {
        categorias.scrollLeft = 0;  
    }
}

function startScroll() {
    intervalId = setInterval(scrollCategorias, 30); 
}

function stopScroll() {
    clearInterval(intervalId); 
}

categorias.addEventListener('mouseenter', stopScroll);
categorias.addEventListener('mouseleave', startScroll);

startScroll();
window.onload = cargarCategorias, fetchPublicaciones("");