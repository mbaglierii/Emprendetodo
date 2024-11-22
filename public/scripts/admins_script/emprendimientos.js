import { openDialog, closeDialog } from './dialog.js';  

function cargarEmprendimientos() {
    const tbody = document.getElementById("emprendimientos-table-body");
    
    tbody.innerHTML = "";

    fetch("/emprendimientos/")
        .then(response => response.json())
        .then(data => {
            data.forEach(categoria => {
                const row = document.createElement("tr");
                row.id = `row-emprend${categoria.pk_emprendimiento}`;

                const idCell = document.createElement("td");
                idCell.textContent = categoria.pk_emprendimiento;
                row.appendChild(idCell);
                
                const nameCell = document.createElement("td");
                nameCell.textContent = categoria.nombre_emprendimiento;
                row.appendChild(nameCell);

                const creationDate = document.createElement("td");
                creationDate.textContent = formatearFecha(categoria.fecha_creacion);
                row.appendChild(creationDate);

                const reviews = document.createElement("td");
                reviews.textContent = categoria.reviews;
                row.appendChild(reviews);

                const fk_user = document.createElement("td");
                fk_user.textContent = categoria.fk_user;
                row.appendChild(fk_user);

                const fk_localidad = document.createElement("td");
                fk_localidad.textContent = categoria.fk_localidad;
                row.appendChild(fk_localidad);

                const imagen_dir_perfil_empren = document.createElement("td");
                imagen_dir_perfil_empren.textContent = categoria.imagen_dir_perfil_empren;
                row.appendChild(imagen_dir_perfil_empren);

                const descripcion = document.createElement("td");
                descripcion.textContent = categoria.descripcion;
                row.appendChild(descripcion);

                const telefono = document.createElement("td");
                telefono.textContent = categoria.telefono;
                row.appendChild(telefono);


                const actionsCell = document.createElement("td");

                const editButton = document.createElement("button");
                editButton.className = "edit-button";
                editButton.textContent = "Modificar";
                editButton.addEventListener("click", () => modificarCategoria(categoria.pk_emprendimiento, categoria));
                
                const deleteButton = document.createElement("button");
                deleteButton.className = "delete-button";
                deleteButton.textContent = "Eliminar";
                deleteButton.addEventListener("click", () => eliminarEmprendimiento(categoria.pk_emprendimiento));

                actionsCell.appendChild(editButton);
                actionsCell.appendChild(deleteButton);
                row.appendChild(actionsCell);

                tbody.appendChild(row);
            });
        })
        .catch(error => console.error("Error al obtener categorías:", error));
}

function agregarEmprendimiento(){
    openDialog(0, "Agregar Emprendimiento", [
        { placeholder: "Nombre Emprendimiento", value: "" },    
        { placeholder: "Fecha de creacion", value: "" },
        { placeholder: "Reviews", value: "" },
        { placeholder: "Numero de usuario", value: "" },
        { placeholder: "Numero de localidad", value: "" },
        { placeholder: "Descripcion", value: "" },
        { placeholder: "Telefono", value: "" },

    ], agregarEmprendimientoBoton);

    const dialogContent = document.getElementById("dialogContent");
    const fileLabel = document.createElement("label");
    fileLabel.textContent = "Imagen Emprendimiento";
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.name = "archivo"; 

    dialogContent.insertBefore(fileLabel, dialogContent.lastChild.previousSibling);
    dialogContent.insertBefore(fileInput, dialogContent.lastChild.previousSibling);
}

async function agregarEmprendimientoBoton(id, valores){
    

    const fileInput = document.getElementById("dialogContent").querySelector("input[type='file']");
    const selectedFile = fileInput.files[0]; 

    const formData = new FormData();
    formData.append("imagen", selectedFile);
    formData.append("nombre_emprendimiento", valores[0]);
    formData.append("fecha_creacion", valores[1]);
    formData.append("reviews", valores[2]);
    formData.append("fk_user", valores[3]);
    formData.append("fk_localidad", valores[4]);
    formData.append("descripcion", valores[5]);
    formData.append("telefono", valores[6]);


    await fetch(`/emprendimientos/create`, {
    method: 'POST',
    body: formData
    })
    cargarEmprendimientos();
    closeDialog();
}

async function confirmarEmprendimiento(id, values) {

    const fileInput = document.getElementById("dialogContent").querySelector("input[type='file']");
    const selectedFile = fileInput.files[0]; 

    const formData = new FormData();
    formData.append("imagen", selectedFile);
    formData.append("nombre_emprendimiento", values[0]);
    formData.append("fecha_creacion", values[1]);
    formData.append("reviews", values[2]);
    formData.append("fk_user", values[3]);
    formData.append("fk_localidad", values[4]);
    formData.append("descripcion", values[5]);
    formData.append("telefono", values[6]);
    formData.append("pk_emprendimiento", id);


    await fetch(`/emprendimientos/modificar_emprendimiento`, {
        method: 'PUT',
        body : formData
    })
    cargarEmprendimientos();
    closeDialog();
}

function modificarCategoria(id, categoria) {
    openDialog(id, "Modificar Emprendimiento", [
        { placeholder: "Nombre Emprendimiento", value: categoria.nombre_emprendimiento },    
        { placeholder: "Fecha de creacion", value: formatearFecha(categoria.fecha_creacion) },
        { placeholder: "Reviews", value: categoria.reviews },
        { placeholder: "Numero de usuario", value: categoria.fk_user},
        { placeholder: "Numero de localidad", value: categoria.fk_localidad },
        { placeholder: "Descripcion", value: categoria.descripcion },
        { placeholder: "Telefono", value: categoria.telefono },
    ], confirmarEmprendimiento);

    const dialogContent = document.getElementById("dialogContent");
    const fileLabel = document.createElement("label");
    fileLabel.textContent = "Imagen Emprendimiento";
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.name = "archivo"; 

    dialogContent.insertBefore(fileLabel, dialogContent.lastChild.previousSibling);
    dialogContent.insertBefore(fileInput, dialogContent.lastChild.previousSibling);
}

function eliminarEmprendimiento(id) {
    if (confirm("¿Seguro quiere eliminar este elemento?")) {
        fetch(`/emprendimientos/eliminar/?id_emprendimiento=${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                document.getElementById(`row-emprend${id}`).remove();
                alert(`El emprendimiento ha sido eliminado.`);
            } else {
                alert("Hubo un error al eliminar el emprendimiento");
            }
        })
        .catch(error => console.error("Error en la solicitud DELETE:", error));
    }
}

export function formatearFecha(fechaISO) {
    return fechaISO.split('T')[0];
}


document.addEventListener("DOMContentLoaded", cargarEmprendimientos);
document.getElementById("boton_agregar_emprendimientos").addEventListener("click", agregarEmprendimiento);
