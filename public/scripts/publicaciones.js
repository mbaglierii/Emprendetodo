document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("crearPublicacionesForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); 

        const userInfoString = localStorage.getItem("userInfo");
        const userInfo = JSON.parse(userInfoString);
        const pkUser = userInfo.pk_emprendimiento;            


        const formData = new FormData(form);
        formData.append("fecha_publicacion", obtenerFechaHoy());
        formData.append("clicks", 0);
        formData.append("impresiones", 0);
        formData.append("fk_emprendimiento", pkUser);
        
        try {
            const response = await fetch("/publicaciones/create", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                const result = await response.json();
                alert("Publicacion creado con éxito");
                form.reset(); 
            } else {
                const error = await response.json();
                alert(`Error al crear Publicacion: ${error.message}`);
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("Hubo un problema al enviar el formulario.");
        }
    });
});

function obtenerFechaHoy() {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = hoy.getMonth() + 1;
    const dia = hoy.getDate();
    
    return `${año}-${mes}-${dia}`;
}

async function loadCategorias() {
    const provinceSelect = document.getElementById("fk_categoria");
    const response = await fetch('/categorias/');
    const provincias = await response.json();

    provincias.forEach(provincia => {
        const option = document.createElement("option");
        option.value = provincia.pk_categoria;
        option.textContent = provincia.nombre_categoria;
        provinceSelect.appendChild(option);
    });
}

window.addEventListener("load", loadCategorias);