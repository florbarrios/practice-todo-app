'use strict'

let todos = getSavedTodos();

//filter todos

const filters = {
    searchTerm: '',
    hideCompleted: false,
};

renderTodos(todos,filters);

document.querySelector('#search-todos').addEventListener('input', (e) => {
    filters.searchTerm = e.target.value
    renderTodos(todos, filters)
});

// add todo form handler - andrew's solution

document.querySelector('#add-todo-form').addEventListener('submit', (e) => {
    e.preventDefault();

    let userInput = e.target.elements.newTodo.value.trim()

    if (userInput.length > 0) {
        todos.push({
            id: uuidv4(),
            text: userInput,
            completed: false,
        });
        saveTodos(todos);
        renderTodos(todos, filters);
        e.target.elements.newTodo.value = '';
    } 
});

document.querySelector('#filter-completed').addEventListener('change', (e) => {
    filters.hideCompleted = e.target.checked;
    renderTodos(todos, filters);
});
