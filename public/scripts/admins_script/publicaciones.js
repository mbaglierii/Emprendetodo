import { openDialog, closeDialog } from './dialog.js';  
import {formatearFecha} from './emprendimientos.js';

function cargarPublicaciones() {
    const tbody = document.getElementById("publicaciones-table-body");

    tbody.innerHTML = ""; 


    fetch("/publicaciones/")
        .then(response => response.json())
        .then(data => {
            data.forEach(publicacion => {
                const row = document.createElement("tr");
                row.id = `row-publicacion${publicacion.pk_publicacion}`;

                const idCell = document.createElement("td");
                idCell.textContent = publicacion.pk_publicacion;
                row.appendChild(idCell);
                
                const nameCell = document.createElement("td");
                nameCell.textContent = publicacion.nombre_publicacion;
                row.appendChild(nameCell);

                const fk_emprendimiento = document.createElement("td");
                fk_emprendimiento.textContent = publicacion.fk_emprendimiento;
                row.appendChild(fk_emprendimiento);

                const fecha_publicacion = document.createElement("td");
                fecha_publicacion.textContent = formatearFecha(publicacion.fecha_publicacion);
                row.appendChild(fecha_publicacion);

                const fk_categoria = document.createElement("td");
                fk_categoria.textContent = publicacion.fk_categoria;
                row.appendChild(fk_categoria);

                const clicks = document.createElement("td");
                clicks.textContent = publicacion.clicks;
                row.appendChild(clicks);

                const impresiones = document.createElement("td");
                impresiones.textContent = publicacion.impresiones;
                row.appendChild(impresiones);

                const actionsCell = document.createElement("td");

                const editButton = document.createElement("button");
                editButton.className = "edit-button";
                editButton.textContent = "Modificar";
                editButton.addEventListener("click", () => modificarPublicacion(publicacion.pk_publicacion, publicacion));
                
                const deleteButton = document.createElement("button");
                deleteButton.className = "delete-button";
                deleteButton.textContent = "Eliminar";
                deleteButton.addEventListener("click", () => eliminarPublicacion(publicacion.pk_publicacion));

                actionsCell.appendChild(editButton);
                actionsCell.appendChild(deleteButton);
                row.appendChild(actionsCell);

                tbody.appendChild(row);
            });
        })
        .catch(error => console.error("Error al obtener localiadades:", error));
}

function agregarPublicacion(){
    openDialog(0, "Agregar Publicacion", [
        { placeholder: "Nombre de publicacion", value: "" },
        { placeholder: "Numero de emprendimiento", value: "" },
        { placeholder: "Fecha de publicacion", value: "" },
        { placeholder: "Numero de categoria", value: "" },
        { placeholder: "Clicks", value: "" },
        { placeholder: "Impresiones", value: "" }
    ], agregarPublicacionBoton);
}

function agregarPublicacionBoton(id, publicacion){
    fetch(`/publicaciones/create?nombre_publicacion=${publicacion[0]}&fk_emprendimiento=${publicacion[1]}&fecha_publicacion=${publicacion[2]}&fk_categoria=${publicacion[3]}&clicks=${publicacion[4]}&impresiones=${publicacion[5]}`, {
        method: 'POST',
    })
    cargarPublicaciones();
    closeDialog();
}

function confirmarModificacion(id, values) {
    console.log(values);
    fetch(`/publicaciones/modificar?nombre_publicacion=${values[0]}&fk_emprendimiento=${values[1]}&fecha_publicacion=${values[2]}&fk_categoria=${values[3]}&clicks=${values[4]}&impresiones=${values[5]}&id_publicacion=${id}`, {
        method: 'PUT',
    })
    cargarPublicaciones();
    closeDialog();
}

function modificarPublicacion(id, publicacion) {
    openDialog(id, "Modificar Publicacion", [
        { placeholder: "Nombre de publicacion", value: publicacion.nombre_publicacion },
        { placeholder: "Numero de emprendimiento", value: publicacion.fk_emprendimiento },
        { placeholder: "Fecha de publicacion", value: formatearFecha(publicacion.fecha_publicacion) },
        { placeholder: "Numero de categoria", value: publicacion.fk_categoria },
        { placeholder: "Clicks", value: publicacion.clicks },
        { placeholder: "Impresiones", value: publicacion.impresiones }
    ], confirmarModificacion);
}

function eliminarPublicacion(id) {
    if (confirm("¿Seguro quiere eliminar este elemento?")) {
        fetch(`/publicaciones/eliminar/?id_publicacion=${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                document.getElementById(`row-publicacion${id}`).remove();
                alert(`La publicacion ha sido eliminada.`);
            } else {
                alert("Hubo un error al eliminar la publicacion");
            }
        })
        .catch(error => console.error("Error en la solicitud DELETE:", error));
    }
}

document.addEventListener("DOMContentLoaded", cargarPublicaciones);
document.getElementById("boton_agregar_publicacion").addEventListener("click", agregarPublicacion);
