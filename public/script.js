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
