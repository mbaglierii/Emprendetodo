document.getElementById("registerForm").addEventListener("submit", async function(event) {
    event.preventDefault(); 

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    
    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    const formData = new FormData(this); 

    try {
        const response = await fetch('/users/create', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            alert("¡Registro exitoso! Bienvenido, " + data.username);
            window.location.href = "/"; 
        } else if (response.status === 400) {
            const error = await response.json();
            alert(error.error);
        } else if (response.status === 409) {
            const error = await response.json();
            alert(error.error);
        } else {
            alert("Ocurrió un error. Por favor, intenta nuevamente.");
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        alert("No se pudo procesar el registro en este momento.");
    }
});
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
    const citySelect = document.getElementById("city");
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