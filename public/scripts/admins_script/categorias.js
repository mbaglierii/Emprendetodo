import { openDialog, closeDialog } from './dialog.js';  

function cargarCategorias() {
    const tbody = document.getElementById("category-table-body");

    tbody.innerHTML = ""; 


    fetch("/categorias/")
        .then(response => response.json())
        .then(data => {
            data.forEach(categoria => {
                const row = document.createElement("tr");
                row.id = `row-category${categoria.pk_categoria}`;

                const idCell = document.createElement("td");
                idCell.textContent = categoria.pk_categoria;
                row.appendChild(idCell);
                
                const nameCell = document.createElement("td");
                nameCell.textContent = categoria.nombre_categoria;
                row.appendChild(nameCell);

                const imagen_dir_categoria = document.createElement("td");
                imagen_dir_categoria.textContent = categoria.imagen_dir_categoria;
                row.appendChild(imagen_dir_categoria);

                const actionsCell = document.createElement("td");

                const editButton = document.createElement("button");
                editButton.className = "edit-button";
                editButton.textContent = "Modificar";
                editButton.addEventListener("click", () => modificarCategoria(categoria.pk_categoria, categoria.nombre_categoria));
                
                const deleteButton = document.createElement("button");
                deleteButton.className = "delete-button";
                deleteButton.textContent = "Eliminar";
                deleteButton.addEventListener("click", () => eliminarCategoria(categoria.pk_categoria));

                actionsCell.appendChild(editButton);
                actionsCell.appendChild(deleteButton);
                row.appendChild(actionsCell);

                tbody.appendChild(row);
            });
        })
        .catch(error => console.error("Error al obtener categorías:", error));
}

function agregarCategoria(){
    openDialog(0, "Agregar Categoria", [
        { placeholder: "Categoria", value: "" }
    ], agregarCategoriaBoton);

    const dialogContent = document.getElementById("dialogContent");
    const fileLabel = document.createElement("label");
    fileLabel.textContent = "Imagen Categoria";
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.name = "archivo"; 

    dialogContent.insertBefore(fileLabel, dialogContent.lastChild.previousSibling);
    dialogContent.insertBefore(fileInput, dialogContent.lastChild.previousSibling);
}

async function agregarCategoriaBoton(id, categoria){

    const fileInput = document.getElementById("dialogContent").querySelector("input[type='file']");
    const selectedFile = fileInput.files[0]; 

    const formData = new FormData();
    formData.append("imagen", selectedFile); 
    formData.append("categoria", categoria); 


    await fetch(`/categorias/create`, {
        method: 'POST',
        body : formData
    })

    cargarCategorias();
    closeDialog();
}

async function confirmarModificacion(id, values) {

    const fileInput = document.getElementById("dialogContent").querySelector("input[type='file']");
    const selectedFile = fileInput.files[0]; 

    const formData = new FormData();
    formData.append("imagen", selectedFile); 
    formData.append("categoria", values); 
    formData.append("id_categoria", id); 

    await fetch(`/categorias/modificar_categoria`, {
        method: 'PUT',
        body : formData
    })
    cargarCategorias();
    closeDialog();
}

function modificarCategoria(id, nombreCategoria) {
    openDialog(id, "Modificar Categoria", [
        { placeholder: "Categoria", value: nombreCategoria }
    ], confirmarModificacion);

    const dialogContent = document.getElementById("dialogContent");
    const fileLabel = document.createElement("label");
    fileLabel.textContent = "Imagen Categoria";
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.name = "archivo"; 

    dialogContent.insertBefore(fileLabel, dialogContent.lastChild.previousSibling);
    dialogContent.insertBefore(fileInput, dialogContent.lastChild.previousSibling);
}

function eliminarCategoria(id) {
    if (confirm("¿Seguro quiere eliminar este elemento?")) {
        fetch(`/categorias/eliminar/?id_categoria=${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                document.getElementById(`row-category${id}`).remove();
                alert(`La categoría ha sido eliminada.`);
            } else {
                alert("Hubo un error al eliminar la categoría");
            }
        })
        .catch(error => console.error("Error en la solicitud DELETE:", error));
    }
}

document.addEventListener("DOMContentLoaded", cargarCategorias);
document.getElementById("boton_agregar_categoria").addEventListener("click", agregarCategoria);
