document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('add-task-btn');
    const newTaskInput = document.getElementById('new-task-input');
    const taskListBody = document.getElementById('task-list-body');

    loadTasks();

    addTaskBtn.addEventListener('click', function() {
        const taskText = newTaskInput.value.trim();
        if (taskText === "") return;

        const formData = new FormData();
        formData.append('action', 'add_task');
        formData.append('task_name', taskText);

        fetch('php/todo.php', { method: 'POST', body: formData })
        .then(res => res.text())
        .then(data => {
            if (!isNaN(data) && data != 0) {
                addTaskToDOM(data, taskText, 'pending');
                newTaskInput.value = '';
            } else {
                alert("Error saving: " + data); // shows specific error
            }
        });
    });

    // edit & delete
    taskListBody.addEventListener('click', function(e) {
        
        // delete
        if (e.target.classList.contains('delete-btn')) {
            const row = e.target.closest('tr');
            const taskId = row.getAttribute('data-id');

            if(!confirm("Delete this task?")) return;

            const formData = new FormData();
            formData.append('action', 'delete_task');
            formData.append('task_id', taskId);

            fetch('php/todo.php', { method: 'POST', body: formData })
            .then(res => res.text())
            .then(data => {
                if(data.trim() === "Deleted") {
                    row.remove();
                } else {
                    alert("Delete Failed: " + data);
                }
            });
        }

        // edit
        if (e.target.classList.contains('edit-btn')) {
            const row = e.target.closest('tr');
            const label = row.querySelector('label');
            const taskId = row.getAttribute('data-id');
            
            const newText = prompt("Edit your task:", label.innerText);
            
            if (newText && newText.trim() !== "") {
                const formData = new FormData();
                formData.append('action', 'edit_task');
                formData.append('task_id', taskId);
                formData.append('task_name', newText);

                fetch('php/todo.php', { method: 'POST', body: formData })
                .then(res => res.text())
                .then(data => {
                    if(data.trim() === "Edited") {
                        label.innerText = newText;
                    } else {
                        alert("Edit Failed: " + data);
                    }
                });
            }
        }
    });

    taskListBody.addEventListener('change', function(e) {
        if (e.target.type === 'checkbox') {
            const row = e.target.closest('tr');
            const taskId = row.getAttribute('data-id');
            const status = e.target.checked ? 'completed' : 'pending';

            if (e.target.checked) row.classList.add('completed');
            else row.classList.remove('completed');

            const formData = new FormData();
            formData.append('action', 'update_status');
            formData.append('task_id', taskId);
            formData.append('status', status);

            fetch('php/todo.php', { method: 'POST', body: formData });
        }
    });

    // helpers
    function loadTasks() {
        console.log("Attempting to load tasks..."); 

        fetch('php/todo.php?action=get_tasks')
        .then(response => {
            return response.text().then(text => {
                try {
                    return JSON.parse(text);
                } catch (e) {
                    throw new Error("Server Error: " + text);
                }
            });
        })
        .then(tasks => {
            taskListBody.innerHTML = ''; 
            tasks.forEach(task => {
                addTaskToDOM(task.id, task.task_name, task.status);
            });
        })
        .catch(err => {
            console.error(err);
            alert("List Error:\n" + err.message);
        });
    }

    function addTaskToDOM(id, text, status) {
        const row = document.createElement('tr');
        row.classList.add('task-row');
        row.setAttribute('data-id', id);
        if (status === 'completed') row.classList.add('completed');

        const isChecked = status === 'completed' ? 'checked' : '';

        row.innerHTML = `
            <td class="task-name-cell">
                <input type="checkbox" id="task-${id}" ${isChecked}>
                <label for="task-${id}">${text}</label>
            </td>
            <td class="task-actions-cell">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;
        taskListBody.appendChild(row);
    }
});