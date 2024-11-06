import { openDialog, closeDialog } from './dialog.js';  

function cargarProvincias() {
    const tbody = document.getElementById("provincias-table-body");

    tbody.innerHTML = ""; 


    fetch("/provincias/")
        .then(response => response.json())
        .then(data => {
            data.forEach(provincia => {
                const row = document.createElement("tr");
                row.id = `row-provincia${provincia.pk_provincia}`;

                const idCell = document.createElement("td");
                idCell.textContent = provincia.pk_provincia;
                row.appendChild(idCell);
                
                const nameCell = document.createElement("td");
                nameCell.textContent = provincia.nombre_provincia;
                row.appendChild(nameCell);

                const actionsCell = document.createElement("td");

                const editButton = document.createElement("button");
                editButton.className = "edit-button";
                editButton.textContent = "Modificar";
                editButton.addEventListener("click", () => modificarProvincia(provincia.pk_provincia, provincia));
                
                const deleteButton = document.createElement("button");
                deleteButton.className = "delete-button";
                deleteButton.textContent = "Eliminar";
                deleteButton.addEventListener("click", () => eliminarProvincia(provincia.pk_provincia));

                actionsCell.appendChild(editButton);
                actionsCell.appendChild(deleteButton);
                row.appendChild(actionsCell);

                tbody.appendChild(row);
            });
        })
        .catch(error => console.error("Error al obtener localiadades:", error));
}

function agregarProvincia(){
    openDialog(0, "Agregar Provincia", [
        { placeholder: "Nombre de provincia", value: "" }
    ], agregarProvinciaBoton);
}

function agregarProvinciaBoton(id, provincia){
    fetch(`/provincias/create?nombre_provincia=${provincia[0]}`, {
        method: 'POST',
    })
    cargarProvincias();
    closeDialog();
}

function confirmarModificacion(id, values) {
    console.log(values);
    fetch(`/provincias/modificar?nombre_provincia=${values[0]}&id_provincia=${id}`, {
        method: 'PUT',
    })
    cargarProvincias();
    closeDialog();
}

function modificarProvincia(id, provincia) {
    openDialog(id, "Modificar Provincia", [
        { placeholder: "Nombre de provincia", value: provincia.nombre_provincia }
    ], confirmarModificacion);
}

function eliminarProvincia(id) {
    if (confirm("¿Seguro quiere eliminar este elemento?")) {
        fetch(`/provincias/eliminar/?id_provincia=${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                document.getElementById(`row-provincia${id}`).remove();
                alert(`La provincia ha sido eliminada.`);
            } else {
                alert("Hubo un error al eliminar la provincia");
            }
        })
        .catch(error => console.error("Error en la solicitud DELETE:", error));
    }
}

document.addEventListener("DOMContentLoaded", cargarProvincias);
document.getElementById("boton_agregar_provincia").addEventListener("click", agregarProvincia);
