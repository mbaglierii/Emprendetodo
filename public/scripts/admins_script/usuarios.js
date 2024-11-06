import { openDialog, closeDialog } from './dialog.js';  

function cargarUsuarios() {
    const tbody = document.getElementById("usuarios-table-body");
    
    tbody.innerHTML = "";

    fetch("/users/")
        .then(response => response.json())
        .then(data => {
            data.forEach(usuario => {
                const row = document.createElement("tr");
                row.id = `row-user${usuario.pk_user}`;

                const idCell = document.createElement("td");
                idCell.textContent = usuario.pk_user;
                row.appendChild(idCell);
                
                const nameCell = document.createElement("td");
                nameCell.textContent = usuario.username;
                row.appendChild(nameCell);

                const password = document.createElement("td");
                password.textContent = usuario.password;
                row.appendChild(password);

                const email = document.createElement("td");
                email.textContent = usuario.email;
                row.appendChild(email);

                const fk_provincia = document.createElement("td");
                fk_provincia.textContent = usuario.fk_provincia;
                row.appendChild(fk_provincia);

                const fk_localidad = document.createElement("td");
                fk_localidad.textContent = usuario.fk_localidad;
                row.appendChild(fk_localidad);

                const fk_genero = document.createElement("td");
                switch(usuario.fk_genero){
                    case 1:
                        fk_genero.textContent = "Masculino";
                        break;
                    case 2:
                        fk_genero.textContent = "Femenino";
                        break;
                    case 3:
                        fk_genero.textContent = "Otros";
                        break;
                }
                row.appendChild(fk_genero);


                const imagen_dir = document.createElement("td");
                const link_imagen = document.createElement("a");
                
                link_imagen.href = "/user_ProfilePicture/" + usuario.imagen_dir;
                link_imagen.textContent = "Ver Foto de perfil";
                imagen_dir.appendChild(link_imagen);
                row.appendChild(imagen_dir);

                const adminCell = document.createElement("td");
                const adminCircle = document.createElement("div");

                if (usuario.admin === 1) {
                    adminCircle.style.backgroundColor = "green";
                } else {
                    adminCircle.style.backgroundColor = "red";
                }

                adminCircle.style.width = "15px";
                adminCircle.style.height = "15px";
                adminCircle.style.borderRadius = "50%";
                adminCircle.style.margin = "auto";

                adminCell.appendChild(adminCircle);
                row.appendChild(adminCell);

                const actionsCell = document.createElement("td");

                const editButton = document.createElement("button");
                editButton.className = "edit-button";
                editButton.textContent = "Modificar";
                editButton.addEventListener("click", () => modificarUsuario(usuario.pk_user, usuario));
                
                const deleteButton = document.createElement("button");
                deleteButton.className = "delete-button";
                deleteButton.textContent = "Eliminar";
                deleteButton.addEventListener("click", () => eliminarUsuario(usuario.pk_user));

                actionsCell.appendChild(editButton);
                actionsCell.appendChild(deleteButton);
                row.appendChild(actionsCell);

                tbody.appendChild(row);
            });
        })
        .catch(error => console.error("Error al obtener usuarios:", error));
}

function agregarUsuario(){
    window.open('/register.html', '_blank');
}


function modificarUsuario(id, usuario) {
    openDialog(id, "Modificar Usuario", [
        { placeholder: "Nombre Usuario", value: usuario.username },    
        { placeholder: "Contraseña", value: "" },
        { placeholder: "Email", value: usuario.email },
        { placeholder: "Nuemro Provincia", value: usuario.fk_provincia},
        { placeholder: "Numero de Localidad", value: usuario.fk_localidad },
        { placeholder: "Genero", value: usuario.fk_genero },
        { placeholder: "Direccion de imagen", value: usuario.imagen_dir },
        { placeholder: "Admin", value: usuario.admin},    
    ], confirmarUsuario);
}

async function confirmarUsuario(id, values) {
    const response = await fetch(`/users/modificar_usuario?username=${values[0]}&password=${values[1]}&email=${values[2]}&fk_provincia=${values[3]}&fk_localidad=${values[4]}&fk_genero=${values[5]}&imagen_dir=${values[6]}&admin=${values[7]}&pk_user=${id}`, {
        method: 'PUT',
    });

    if (response.ok) {
        cargarUsuarios();
        closeDialog();
    } else {
        console.error('Error al actualizar el usuario');
    }
}


function eliminarUsuario(id) {
    if (confirm("¿Seguro quiere eliminar este elemento?")) {
        fetch(`/users/eliminar/?id_user=${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                document.getElementById(`row-user${id}`).remove();
                alert(`El usuario ha sido eliminado.`);
            } else {
                alert("Hubo un error al eliminar al usuario");
            }
        })
        .catch(error => console.error("Error en la solicitud DELETE:", error));
    }
}




document.addEventListener("DOMContentLoaded", cargarUsuarios);
document.getElementById("boton_agregar_usuarios").addEventListener("click", agregarUsuario);
