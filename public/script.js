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

    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split('=');
        if (cookie[0] === 'token_admin') {
            document.getElementById('PAdmin').style.display = "block";
        }
    }


});



const categorias = document.querySelector('.categorias');
console.log("Elemento 'categorias' seleccionado:", categorias);

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
