
import { fetchPublicaciones } from './scripts/filter_index.js';  

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

                categoriaDiv.setAttribute('data-id', categoria.pk_categoria); 

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