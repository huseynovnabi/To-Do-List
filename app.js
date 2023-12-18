"use strict";

const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");
let todos = [];


let runEvents = () => {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", pageLoaded);
    secondCardBody.addEventListener("click", removeTodoToUI);
    clearButton.addEventListener("click", allClearTodosEverywhere);
    filterInput.addEventListener("keyup", filter);
}



let pageLoaded = () => {
    chekTodosFromStorage();
    todos.forEach(todo => {
        addTodoToUI(todo);
    });
}



let filter = (e) => {
    const filterValue = e.target.value.toLowerCase().trim();
    const todoListesi = document.querySelectorAll(".list-group-item");
    if (todoListesi.length > 0) {
        todoListesi.forEach(todo => {
            if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
                todo.setAttribute("style", "display : block");
            } else {
                todo.setAttribute("style", "display : none !important");
            }
        });
    } else {
        showAlert("warning", "Enter at least one todo to filter!");
    }
}



let allClearTodosEverywhere = () => {
    const todoListesi = document.querySelectorAll(".list-group-item");
    if (todoListesi.length > 0) {
        // Ekrandan silmək
        todoListesi.forEach(todo => {
            todo.remove();
        });

        // Storage' dan silmək
        todos = [];
        localStorage.setItem("todos", JSON.stringify(todos));
        showAlert("success", "All todos have been deleted successfully");
    } else {
        showAlert("warning", "There must be at least one todo to delete!");
    }
}


let removeTodoToUI = (e) => {
    if (e.target.className === "fa fa-remove") {
        //  Ekrandan silmək
        const todo = e.target.parentElement.parentElement;
        todo.remove();

        // Storage' dan silmək
        removeTodoToStorage(todo.textContent);
        showAlert("success", "To Do was successfully deleted");
    }
}

let removeTodoToStorage = (removeTodo) => {
    chekTodosFromStorage();
    todos.forEach((todo, index) => {
        if (removeTodo === todo) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

let addTodo = (e) => {
    const inputText = addInput.value.trim();
    if (inputText == null || inputText == "") {
        showAlert("warning", "Please do not leave it blank!");
    } else {
        addTodoToUI(inputText);
        addTodoToStorage(inputText);
        showAlert("success", "Added To Do");
    }

    e.preventDefault();
}



let addTodoToUI = (newTodo) => {
    // <li class="list-group-item d-flex justify-content-between">Todo 1
    //     <a href="#" class="delete-item">
    //         <i class="fa fa-remove"></i>
    //     </a>
    // </li>

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = newTodo;

    const a = document.createElement("a");
    a.href = "#";
    a.className = "delete-item";

    const i = document.createElement("i");
    i.className = "fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value = " ";
}



let addTodoToStorage = (newTodo) => {
    chekTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}



let chekTodosFromStorage = () => {
    if (localStorage.getItem("todos") == null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}



let showAlert = (type, message) => {
    /*  
      <div class="alert alert-warning" role="alert">
         A simple warning alert—check it out!
     </div>
   */

    const div = document.createElement("div");
    // div.className = "alert alert - " + type;
    div.className = `alert alert-${type}`;
    div.textContent = message;

    firstCardBody.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 2000);
}



runEvents();


