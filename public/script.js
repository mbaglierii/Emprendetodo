
document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.querySelector(".logout");
    
    logoutButton.addEventListener("click", function () {
        localStorage.removeItem("userInfo"); 
        localStorage.removeItem("isLoggedIn"); 
        localStorage.removeItem("token");  
        window.location.reload(); 
    });
});

document.getElementById('ofertasLink').addEventListener('click', function (event) {
    event.preventDefault(); 

    fetch('/ofertas', {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        })
    .then(response => {
        if (response.ok) {
            window.location.href = '/ofertas'; 
        } else {
            console.error('Error al enviar los datos');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});


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
