
const dialog = require("dialog.js");

document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.getElementById("category-table-body");

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
});

function confirmAction() {
    const values = currentFields.map(input => input.value); 
    console.log("Valores confirmados:", values); 
    closeDialog();
}

function modificarCategoria(id, nombreCategoria) {
    dialog.openDialog("Modificar Categoria", [
        { placeholder: "Categoria", value: nombreCategoria }
    ], confirmAction());
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

