let currentFields = [];

function openDialog(title, fields, confirmCallback) {
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
        confirmCallback(currentFields.map(input => input.value)); 
        closeDialog(); 
    };
    dialogContent.appendChild(confirmButton);

    document.getElementById("dynamicDialog").style.display = "block";
}


function closeDialog() {
    document.getElementById("dynamicDialog").style.display = "none";
}


module.exports = {
    closeDialog,
    openDialog
}