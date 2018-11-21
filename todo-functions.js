// Fetch existing todos from localStorage
const getSavedTodos = () => {
    let todosJSON = localStorage.getItem('todos');
    return todosJSON !== null ? JSON.parse(todosJSON) : []
}

// Save todos to localStorage
const saveTodos = (todos) => localStorage.setItem('todos', JSON.stringify(todos))

// Remove todo from list
const removeTodo = function (id) {
    const todoIndex = todos.findIndex((todo) => todo.id === id);

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
 };

 // Change completed property
 const toggleTodo = (id) => {
    const todo= todos.find(function (todo) {
        return todo.id === id;
    });

    if (todo !== undefined) {
        todo.completed = !todo.completed
    }
 }

// Get the DOM element for an individual note
const generateTodoDOM = (todo) => {
    const todoPara = document.createElement('div');
    const completedCheckbox = document.createElement('input');
    const todoText = document.createElement('span');
    const removeButton = document.createElement('button');

    // Set up todo checkbox
    completedCheckbox.setAttribute('type', 'checkbox');
    completedCheckbox.checked = todo.completed;
    todoPara.appendChild(completedCheckbox);
    completedCheckbox.addEventListener('change', () => {
        toggleTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos, filters);
    });

    // Set up todo text
    todoText.textContent = todo.text;
    todoPara.appendChild(todoText);

    // Set up todo remove button
    removeButton.textContent = 'x';
    todoPara.appendChild(removeButton);
    removeButton.addEventListener('click', () => {
        removeTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos, filters);
    });

    return todoPara;
}

// Get the DOM element for the list summary
const generateSummaryDOM = (incompleteTodos) => {
    const statusPara = document.createElement('h3');
    statusPara.textContent = `You have ${incompleteTodos.length} todos left.`;
    return statusPara;
}

// Render applicaton todos based on filters
const renderTodos = (todos, filters) => {
    const filteredTodos = todos.filter((todo) => {
        const searchTermMatch = todo.text.toLowerCase().includes(filters.searchTerm.toLowerCase());
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed;
        return searchTermMatch && hideCompletedMatch;
    });

    document.querySelector('#todos').innerHTML = '';

    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)

    const statusPara = generateSummaryDOM(incompleteTodos);
    document.querySelector('#todos').appendChild(statusPara);

    filteredTodos.forEach((todo) => {
        const todoPara = generateTodoDOM(todo);
        document.querySelector('#todos').appendChild(todoPara);
    });
}
