document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("crearEmprendimientoForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); 

        const userInfoString = localStorage.getItem("userInfo");
        const userInfo = JSON.parse(userInfoString);
        const pkUser = userInfo.pk_user;            

        if (userInfo.pk_emprendimiento !== null) {
            alert("Ya tienes un emprendimiento asociado. No puedes crear otro.");
            return;
        }

        const formData = new FormData(form);
        console.log(formData.entries());
        formData.append("fecha_creacion", obtenerFechaHoy());
        formData.append("reviews", 0);
        formData.append("fk_user", pkUser);
        
        try {
            const response = await fetch("/emprendimientos/create", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                const result = await response.json();

                const userInfoString = localStorage.getItem("userInfo");

                const userInfo = JSON.parse(userInfoString);

                userInfo.pk_emprendimiento = result.emprendimientoId; 
            
                localStorage.setItem("userInfo", JSON.stringify(userInfo));

                alert("Emprendimiento creado con éxito");
                form.reset(); 
            } else {
                const error = await response.json();
                alert(`Error al crear emprendimiento: ${error.message}`);
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

async function loadProvinces() {
    const provinceSelect = document.getElementById("province");
    const response = await fetch('/provincias/');
    const provincias = await response.json();

    provincias.forEach(provincia => {
        const option = document.createElement("option");
        option.value = provincia.pk_provincia;
        option.textContent = provincia.nombre_provincia;
        provinceSelect.appendChild(option);
    });
}

document.getElementById("province").addEventListener("change", async function() {
    const provinceId = this.value;
    const citySelect = document.getElementById("fk_localidad");
    citySelect.innerHTML = '<option value="">Selecciona tu localidad</option>';

    if (provinceId) {
        const response = await fetch(`/localidades/find?fk_provincia=${provinceId}`);
        const cities = await response.json();

        cities.forEach(city => {
            const option = document.createElement("option");
            option.value = city.pk_localidades;
            option.textContent = city.nombre_localidad;
            citySelect.appendChild(option);
        });
    }
});

window.addEventListener("load", loadProvinces);