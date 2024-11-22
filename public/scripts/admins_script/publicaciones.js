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

                const descripcion = document.createElement("td");
                descripcion.textContent = publicacion.descripcion;
                row.appendChild(descripcion);

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

                const imagenes = document.createElement("td");
                imagenes.textContent = publicacion.imagenes;
                row.appendChild(imagenes);

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
        { placeholder: "Descripcion", value: "" },
        { placeholder: "Numero de emprendimiento", value: "" },
        { placeholder: "Fecha de publicacion", value: "" },
        { placeholder: "Numero de categoria", value: "" },
        { placeholder: "Clicks", value: "" },
        { placeholder: "Impresiones", value: "" }
    ], agregarPublicacionBoton);

    const dialogContent = document.getElementById("dialogContent");
    const fileLabel = document.createElement("label");
    fileLabel.textContent = "Imagenes publicaciones";
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.name = "archivo"; 
    fileInput.multiple = true;

    dialogContent.insertBefore(fileLabel, dialogContent.lastChild.previousSibling);
    dialogContent.insertBefore(fileInput, dialogContent.lastChild.previousSibling);
}

async function agregarPublicacionBoton(id, publicacion){
    const fileInput = document.getElementById("dialogContent").querySelector("input[type='file']");
    const selectedFiles = fileInput.files; 

    if (selectedFiles){
        const formData = new FormData();
        formData.append("nombre_publicacion", publicacion[0]);
        formData.append("descripcion", publicacion[1]);
        formData.append("fk_emprendimiento", publicacion[2]);
        formData.append("fecha_publicacion", publicacion[3]);
        formData.append("fk_categoria", publicacion[4]);
        formData.append("clicks", publicacion[5]);
        formData.append("impresiones", publicacion[6]);

        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append("imagen", selectedFiles[i]);
        }

        const response = await fetch(`/publicaciones/create`, {
            method: 'POST',
            body : formData
        })
        if(response.ok){
            cargarPublicaciones();
            closeDialog();    
        }
        
    }else{
        alert("Tiene que ingresar por lo minimo una imagen");
    }

    
}

async function confirmarModificacion(id, values) {
    const fileInput = document.getElementById("dialogContent").querySelector("input[type='file']");
    const selectedFiles = fileInput.files; 

    if (selectedFiles){
        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append("imagen", selectedFiles[i]);
        }
        const reponse = await fetch(`/publicaciones/modificar?nombre_publicacion=${values[0]}&descripcion=${values[1]}&fk_emprendimiento=${values[2]}&fecha_publicacion=${values[3]}&fk_categoria=${values[4]}&clicks=${values[5]}&impresiones=${values[6]}&id_publicacion=${id}`, {
            method: 'PUT',
            body : formData
        })
        if (reponse.ok){
            cargarPublicaciones();
            closeDialog();
        }else{
            alert("Hubo un error");
        }
        
    }else{
        const response = await fetch(`/publicaciones/modificar?nombre_publicacion=${values[0]}&descripcion=${values[1]}&fk_emprendimiento=${values[2]}&fecha_publicacion=${values[3]}&fk_categoria=${values[4]}&clicks=${values[5]}&impresiones=${values[6]}&id_publicacion=${id}`, {
            method: 'PUT',
        })
        if (response.ok){
            cargarPublicaciones();
            closeDialog();
        }else{
            alert("Hubo un error");
        }
    }
   
}

function modificarPublicacion(id, publicacion) {
    openDialog(id, "Modificar Publicacion", [
        { placeholder: "Nombre de publicacion", value: publicacion.nombre_publicacion },
        { placeholder: "Descripcion", value: publicacion.descripcion },
        { placeholder: "Numero de emprendimiento", value: publicacion.fk_emprendimiento },
        { placeholder: "Fecha de publicacion", value: formatearFecha(publicacion.fecha_publicacion) },
        { placeholder: "Numero de categoria", value: publicacion.fk_categoria },
        { placeholder: "Clicks", value: publicacion.clicks },
        { placeholder: "Impresiones", value: publicacion.impresiones }
    ], confirmarModificacion);

    const dialogContent = document.getElementById("dialogContent");
    const fileLabel = document.createElement("label");
    fileLabel.textContent = "Imagenes publicaciones";
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.name = "archivo"; 
    fileInput.multiple = true;

    dialogContent.insertBefore(fileLabel, dialogContent.lastChild.previousSibling);
    dialogContent.insertBefore(fileInput, dialogContent.lastChild.previousSibling);
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
