import { openDialog, closeDialog } from './dialog.js';  

function cargarLocalidades() {
    const tbody = document.getElementById("localidades-table-body");

    tbody.innerHTML = ""; 


    fetch("/localidades/")
        .then(response => response.json())
        .then(data => {
            data.forEach(localidad => {
                const row = document.createElement("tr");
                row.id = `row-localidad${localidad.pk_localidades}`;

                const idCell = document.createElement("td");
                idCell.textContent = localidad.pk_localidades;
                row.appendChild(idCell);
                
                const nameCell = document.createElement("td");
                nameCell.textContent = localidad.nombre_localidad;
                row.appendChild(nameCell);

                const fk_provincia = document.createElement("td");
                fk_provincia.textContent = localidad.fk_provincia;
                row.appendChild(fk_provincia);

                const actionsCell = document.createElement("td");

                const editButton = document.createElement("button");
                editButton.className = "edit-button";
                editButton.textContent = "Modificar";
                editButton.addEventListener("click", () => modificarLocalidad(localidad.pk_localidades, localidad));
                
                const deleteButton = document.createElement("button");
                deleteButton.className = "delete-button";
                deleteButton.textContent = "Eliminar";
                deleteButton.addEventListener("click", () => eliminarLocalidad(localidad.pk_localidades));

                actionsCell.appendChild(editButton);
                actionsCell.appendChild(deleteButton);
                row.appendChild(actionsCell);

                tbody.appendChild(row);
            });
        })
        .catch(error => console.error("Error al obtener localiadades:", error));
}

function agregarLocalidad(){
    openDialog(0, "Agregar Localidad", [
        { placeholder: "Nombre de localidad", value: "" },
        { placeholder: "Numero de provincia", value: "" }
    ], agregarLocalidadBoton);
}

function agregarLocalidadBoton(id, localidad){
    fetch(`/localidades/create?nombre_localidad=${localidad[0]}&fk_provincia=${localidad[1]}`, {
        method: 'POST',
    })
    cargarLocalidades();
    closeDialog();
}

function confirmarModificacion(id, values) {
    fetch(`/localidades/modificar?id_localidad=${id}&nombre_localidad=${values[0]}&fk_provincia=${values[1]}`, {
        method: 'PUT',
    })
    cargarLocalidades();
    closeDialog();
}

function modificarLocalidad(id, localidad) {
    openDialog(id, "Modificar Localidad", [
        { placeholder: "Nombre localidad", value: localidad.nombre_localidad },
        { placeholder: "Numero provincia", value: localidad.fk_provincia }

    ], confirmarModificacion);
}

function eliminarLocalidad(id) {
    if (confirm("¿Seguro quiere eliminar este elemento?")) {
        fetch(`/localidades/eliminar/?id_localidad=${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                document.getElementById(`row-localidad${id}`).remove();
                alert(`La localidad ha sido eliminada.`);
            } else {
                alert("Hubo un error al eliminar la localidad");
            }
        })
        .catch(error => console.error("Error en la solicitud DELETE:", error));
    }
}

document.addEventListener("DOMContentLoaded", cargarLocalidades);
document.getElementById("boton_agregar_localidad").addEventListener("click", agregarLocalidad);
