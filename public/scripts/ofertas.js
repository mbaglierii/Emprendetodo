document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    loadTasks();

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();

        if (taskText.length < 5) {
            alert("La Oferta debe tener al menos 5 caracteres.");
            return;
        }

        addTask(taskText);
        taskInput.value = '';
    });

    function loadTasks() {
        const tasks = getTasks();
        console.log("Cargando Ofertas del local storage:", tasks);
        tasks.forEach(task => {
            createTaskElement(task);
        });
    }

    function addTask(taskText) {
        const tasks = getTasks();
        const newTask = { text: taskText, completed: false };
        tasks.push(newTask);
        console.log("Agregando nueva Oferta:", newTask);
        updateLocalStorage(tasks);
        createTaskElement(newTask);
    }

    function createTaskElement(task) {
        const li = document.createElement('li');
        const textSpan = document.createElement('span');  
        textSpan.textContent = task.text;
        li.appendChild(textSpan);  

        if (task.completed) {
            textSpan.style.textDecoration = 'line-through';
        }

        const completeButton = document.createElement('button');
        completeButton.className = 'complete';
        completeButton.textContent = 'Completar';
        completeButton.addEventListener('click', () => {
            const tasks = getTasks();
            const taskIndex = tasks.findIndex(t => t.text === task.text);
            if (taskIndex !== -1) {
                tasks[taskIndex].completed = !tasks[taskIndex].completed;
                textSpan.style.textDecoration = tasks[taskIndex].completed ? 'line-through' : 'none';  
                console.log("Oferta completada:", tasks[taskIndex]);
                updateLocalStorage(tasks);
            }
        });

        const editButton = document.createElement('button');
        editButton.className = 'edit';
        editButton.textContent = 'Editar';
        editButton.addEventListener('click', () => {
            const newTaskText = prompt("Edita tu Oferta:", task.text);
            if (newTaskText && newTaskText.length >= 5) {
                const tasks = getTasks();
                const taskIndex = tasks.findIndex(t => t.text === task.text);
                if (taskIndex !== -1) {
                    tasks[taskIndex].text = newTaskText;
                    task.text = newTaskText;
                    li.textContent = newTaskText;
                    console.log("Oferta editada:", task);
                    updateLocalStorage(tasks);
                    li.appendChild(completeButton);
                    li.appendChild(editButton);
                    li.appendChild(deleteButton);
                }
            } else {
                alert("La Oferta debe tener al menos 5 caracteres.");
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.textContent = 'Borrar';
        deleteButton.addEventListener('click', () => {
            console.log("Borrando oferta:", task);
            deleteTask(task);
            li.remove();
        });

        li.appendChild(completeButton);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    }

    function deleteTask(taskToDelete) {
        let tasks = getTasks();
        tasks = tasks.filter(task => task.text !== taskToDelete.text);
        console.log("Ofertas después de borrar:", tasks);
        updateLocalStorage(tasks);
    }

    function getTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        console.log("Ofertas desde local storage:", tasks);
        return tasks;
    }

    function updateLocalStorage(tasks) {
        console.log("Actualizando local storage con Ofertas:", tasks);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
