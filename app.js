const submitTodo = document.querySelector('.add-todo');
const todoValue = document.querySelector('input#text');
const results = document.getElementById('todo-items');


document.addEventListener('DOMContentLoaded', getAllTodos)
submitTodo.addEventListener('click', addTodo);
results.addEventListener('click', todoActions);


function addTodo(event) {
    event.preventDefault()

    if (todoValue.value === null || todoValue.value === "") {
        return alert('non puoi inserire un Todo vuoto!');
    } else {

        const todo = document.createElement('div')
        todo.classList.add('todo-item')

        const todoLi = document.createElement('li')
        todoLi.setAttribute('id', 'todoLi')
        todoLi.innerText = todoValue.value
        todoLi.classList.add('todo-li')
        todoLi.setAttribute('data-flagged', "false")
        todo.appendChild(todoLi)


        const flagButton = document.createElement('button')
        flagButton.setAttribute('id', 'flagbutton')
        flagButton.classList.add('flag-button')
        flagButton.innerHTML = '<i class="fa-solid fa-check"></i>'
        todo.appendChild(flagButton)

        const deleteButton = document.createElement('button')
        deleteButton.setAttribute('id', 'deletebutton')
        deleteButton.classList.add('delete-button')
        deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
        todo.appendChild(deleteButton)

        results.appendChild(todo)
        saveTodoToLocalStorage(todoValue.value, todoLi.getAttribute('data-flagged'))

        todoValue.value = ''
    }
}

function todoActions(event) {

    const todo = event.target

    if (todo.classList[0] === 'delete-button') {
        const todoRemove = todo.parentElement
        console.log(todoRemove)
        todoRemove.remove()
        deleteTodo(todo)
    }

    if (todo.classList[0] === 'flag-button') {
        const bgItem = todo.parentElement.firstChild
        bgItem.classList.toggle('flagged')
        if (bgItem.classList.contains('flagged')) {
            bgItem.setAttribute('data-flagged', "true")
        } else {
            bgItem.setAttribute('data-flagged', "false")
        }
        updateLocalStorage(bgItem.innerText, bgItem.dataset.flagged)
    }
}

function updateLocalStorage(text, attr) {
    const todoItems = JSON.parse(localStorage.getItem('myTodos'))
    const foundIndex = todoItems.findIndex(todo => todo.text === text);
    console.log(foundIndex)
    todoItems[foundIndex].isFlagged = attr;
    todoItems[foundIndex].text = text;
    localStorage.setItem('myTodos', JSON.stringify(todoItems))
}

function saveTodoToLocalStorage(myTodos, myAttr) {
    let todoItems;
    if (localStorage.getItem('myTodos') === null) {
        todoItems = []
    } else {
        todoItems = JSON.parse(localStorage.getItem('myTodos'))
    }
    todoItems.push({
        isFlagged: myAttr,
        text: myTodos
    })
    localStorage.setItem('myTodos', JSON.stringify(todoItems))
}

function getAllTodos() {
    let todoItems;
    if (localStorage.getItem('myTodos') === null) {
        todoItems = []
    } else {
        todoItems = JSON.parse(localStorage.getItem('myTodos'))
    }
    todoItems.forEach((myTodos) => {

        const todo = document.createElement('div')
        todo.classList.add('todo-item')

        const todoLi = document.createElement('li')
        if (myTodos.isFlagged === 'true') {
            todoLi.classList.add('flagged')
            todoLi.setAttribute('data-flagged', "true")
        } else if (myTodos.isFlagged === 'false') {
            todoLi.setAttribute('data-flagged', "false")
        }
        todoLi.setAttribute('id', 'todoLi')
        todoLi.innerText = myTodos.text
        todoLi.classList.add('todo-li')
        todo.appendChild(todoLi)

        const flagButton = document.createElement('button')
        flagButton.setAttribute('id', 'flagbutton')
        flagButton.classList.add('flag-button')
        flagButton.innerHTML = '<i class="fa-solid fa-check"></i>'
        todo.appendChild(flagButton)

        const deleteButton = document.createElement('button')
        deleteButton.setAttribute('id', 'deletebutton')
        deleteButton.classList.add('delete-button')
        deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
        todo.appendChild(deleteButton)

        results.appendChild(todo)
    })
}

function deleteTodo(todo) {
    let todoItems;
    if (localStorage.getItem('myTodos') === null) {
        todoItems = []
    } else {
        todoItems = JSON.parse(localStorage.getItem('myTodos'))
    }
    const foundIndex = todoItems.findIndex(todos => todos.text === todo.parentElement.innerText)
    todoItems.splice(foundIndex, 1)
    localStorage.setItem('myTodos', JSON.stringify(todoItems))
}
