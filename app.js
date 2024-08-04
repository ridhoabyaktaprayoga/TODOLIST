document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const tableBody = document.querySelector('#todo-table tbody');
    const filter = document.getElementById('filter-todo');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const todoText = input.value.trim();
        if (todoText === '') return;

        addTodoToTable(todoText);

        // Clear the input field
        input.value = '';
    });

    function addTodoToTable(todoText) {
        const row = document.createElement('tr');

        const todoCell = document.createElement('td');
        todoCell.textContent = todoText;

        const statusCell = document.createElement('td');
        statusCell.textContent = 'Uncompleted';
        statusCell.classList.add('status');

        const actionsCell = document.createElement('td');
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.addEventListener('click', () => {
            if (statusCell.textContent === 'Uncompleted') {
                statusCell.textContent = 'Completed';
                statusCell.classList.add('completed');
            }
        });
        actionsCell.appendChild(completeButton);

        row.appendChild(todoCell);
        row.appendChild(statusCell);
        row.appendChild(actionsCell);

        tableBody.appendChild(row);
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
