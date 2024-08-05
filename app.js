document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const tableBody = document.querySelector('#todo-table tbody');
    const filter = document.getElementById('filter-todo');

    // Load todos from localStorage when the page loads
    loadTodos();

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const todoText = input.value.trim();
        if (todoText === '') return;

        addTodoToTable(todoText);
        saveTodoToLocalStorage(todoText, 'Uncompleted');

        // Clear the input field
        input.value = '';
    });

    function addTodoToTable(todoText, status = 'Uncompleted') {
        const row = document.createElement('tr');

        const todoCell = document.createElement('td');
        todoCell.textContent = todoText;

        const statusCell = document.createElement('td');
        statusCell.textContent = status;
        statusCell.classList.add('status');
        if (status === 'Completed') statusCell.classList.add('completed');

        const actionsCell = document.createElement('td');

        const completeButton = document.createElement('button');
        completeButton.textContent = status === 'Uncompleted' ? 'Complete' : 'Uncompleted';
        completeButton.classList.add('complete-btn');

        completeButton.addEventListener('click', () => {
            if (statusCell.textContent === 'Uncompleted') {
                statusCell.textContent = 'Completed';
                statusCell.classList.add('completed');
                completeButton.textContent = 'Uncompleted';
                updateTodoInLocalStorage(todoText, 'Completed');
            } else {
                statusCell.textContent = 'Uncompleted';
                statusCell.classList.remove('completed');
                completeButton.textContent = 'Complete';
                updateTodoInLocalStorage(todoText, 'Uncompleted');
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');

        deleteButton.addEventListener('click', () => {
            row.remove();
            deleteTodoFromLocalStorage(todoText);
        });

        actionsCell.appendChild(completeButton);
        actionsCell.appendChild(deleteButton);

        row.appendChild(todoCell);
        row.appendChild(statusCell);
        row.appendChild(actionsCell);

        tableBody.appendChild(row);
    }

    function saveTodoToLocalStorage(todoText, status) {
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push({ text: todoText, status });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function updateTodoInLocalStorage(todoText, status) {
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos = todos.map(todo => todo.text === todoText ? { ...todo, status } : todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function deleteTodoFromLocalStorage(todoText) {
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos = todos.filter(todo => todo.text !== todoText);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function loadTodos() {
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => addTodoToTable(todo.text, todo.status));
    }

    filter.addEventListener('change', () => {
        const filterValue = filter.value;
        const rows = tableBody.querySelectorAll('tr');

        rows.forEach(row => {
            const status = row.querySelector('.status').textContent;
            if (filterValue === 'all') {
                row.style.display = '';
            } else if (filterValue === 'completed') {
                row.style.display = status === 'Completed' ? '' : 'none';
            } else if (filterValue === 'uncompleted') {
                row.style.display = status === 'Uncompleted' ? '' : 'none';
            }
        });
    });
});
