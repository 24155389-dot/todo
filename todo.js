let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}
let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;
saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function onAddTodo() {
    let inputtext = document.getElementById("todoUserInput").value;
    if (inputtext === "") {
        alert("Enter Valid input");
        return;
    } else {
        todosCount += 1;
        let newTodo = {
            text: inputtext,
            uniqueNo: todosCount,
            isChecked: false
        };
        todoList.push(newTodo);
        createAndAppendTodo(newTodo);
        inputtext = "";
    }

}
addTodoButton.onclick = function() {
    onAddTodo();
}

function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");
    let objectIndex = todoList.findIndex(function(item) {
        if ("todo" + item.uniqueNo === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let todoindexItem = todoList[objectIndex];
    if (todoindexItem.isChecked === true) {
        todoindexItem.isChecked = false;
    } else {
        todoindexItem.isChecked = true;
    }
}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);
    let deleteitemindex = todoList.findIndex(function(item) {
        if ("todo" + item.uniqueNo === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deleteitemindex, 1);

}

function createAndAppendTodo(todo) {
    let todoId = "todo" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoElement = document.createElement("li");
    todoElement.classList.add("d-flex", "flex-row", "todo-item-container");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);
    let checkboxElement = document.createElement("input");
    checkboxElement.type = "checkbox";
    checkboxElement.id = checkboxId;
    checkboxElement.checked = todo.isChecked;
    checkboxElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    };
    checkboxElement.classList.add("checkbox-input");
    todoElement.appendChild(checkboxElement);
    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);
    let labelElement = document.createElement("label");
    labelElement.id = labelId;
    labelElement.setAttribute("for", checkboxId);
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);
    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    };
    deleteIconContainer.appendChild(deleteIcon);
}
for (let todo of todoList) {
    createAndAppendTodo(todo);
}