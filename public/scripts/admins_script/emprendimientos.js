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

    ], agregarEmprendimientoBoton);
}

function agregarEmprendimientoBoton(id, valores){
    
    console.log(valores);
        fetch(`/emprendimientos/create?nombre_emprendimiento=${valores[0]}&fecha_creacion=${valores[1]}&reviews=${valores[2]}&fk_user=${valores[3]}&fk_localidad=${valores[4]}`, {
        method: 'POST',
    })
    cargarEmprendimientos();
    closeDialog();
}

function confirmarEmprendimiento(id, values) {
    fetch(`/emprendimientos/modificar_emprendimiento?nombre_emprendimiento=${values[0]}&fecha_creacion=${formatearFecha(values[1])}&reviews=${values[2]}&fk_user=${values[3]}&fk_localidad=${values[4]}&pk_emprendimiento=${id}`, {
        method: 'PUT',
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
        { placeholder: "Numero de localidad", value: categoria.fk_localidad }
    ], confirmarEmprendimiento);
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
