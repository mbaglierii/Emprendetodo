let currentFields = [];

export function openDialog(id_modificar,title, fields, confirmCallback) {
    const dialogTitle = document.getElementById("dialogTitle");
    const dialogContent = document.getElementById("dialogContent");

    dialogTitle.textContent = title;
    dialogContent.innerHTML = ""; 
    currentFields = []; 

    fields.forEach(field => {
        const text = document.createElement("label");
        text.textContent = field.placeholder;
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = field.placeholder;
        input.value = field.value || ""; 
        dialogContent.appendChild(text);
        dialogContent.appendChild(input);

        currentFields.push(input); 
    });

    const confirmButton = document.createElement("button");
    confirmButton.textContent = "Confirmar";
    confirmButton.onclick = () => {
        confirmCallback(id_modificar, currentFields.map( input => input.value)); 
        closeDialog(); 
    };
    dialogContent.appendChild(confirmButton);

    const closeButton = document.createElement("button");
    closeButton.textContent = "Cerrar";
    closeButton.style.marginLeft = "5px";
    closeButton.onclick = () => {
        closeDialog();
    };
    dialogContent.appendChild(closeButton);

    document.getElementById("dynamicDialog").style.display = "block";
}

export function closeDialog() {
    document.getElementById("dynamicDialog").style.display = "none";
}
