//get input locator
const todoInput = document.getElementById("todo-input-box");
const name = document.getElementById("namechk");
const errorEle = document.getElementById("error-msg");

const todoTitle = document.getElementById("todo-title");
const listContainer = document.getElementById("item-container");

//get button locator
const addBtn = document.getElementById("add-btn");

//get list locator
const todoItemList = document.getElementById("todo-items-list");

// get text from input box
let todoListArray = [];

const userSavedList = localStorage.getItem("todoList");

if (userSavedList) {
  const existingList = JSON.parse(userSavedList);
  existingList.map((todo) => {
    renderTodoListItem(todo);
  });
}

addBtn.addEventListener("click", () => {
  if (todoInput.value.length > 0) {
    errorEle.textContent = "";
    todoInput.style.borderColor = "white";
    todoListArray.push(todoInput.value);
    localStorage.setItem("todoList", JSON.stringify(todoListArray));
    renderTodoListItem(todoInput.value);
    todoInput.value = "";
  } else {
    inputValidation(todoInput.value);
  }
});

todoInput.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    if (todoInput.value.length > 0) {
      errorEle.textContent = "";
      todoInput.style.borderColor = "white";
      todoListArray.push(todoInput.value);
      renderTodoListItem(todoInput.value);
      todoInput.value = "";
    } else {
      inputValidation(todoInput.value);
    }
  }
});

function inputValidation() {
  errorEle.textContent = "Add a new todo";
  errorEle.style.color = "red";
  errorEle.style.fontWeight = "800";
  todoInput.style.borderColor = "red";
}

function renderTodoListItem(todo) {
  const todoItem = document.createElement("li");
  todoItem.classList.add("li");

  const checkboxInput = document.createElement("input");
  checkboxInput.type = "checkbox";
  checkboxInput.id = "checkboxInput";
  checkboxInput.classList.add("checkbox");

  const todoHeading = document.createElement("h3");
  todoHeading.classList.add("todoHeading");
  todoHeading.id = "todoHeading";
  todoHeading.textContent = todo;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "delete";
  deleteBtn.classList.add("delete-btn");

  todoItem.appendChild(checkboxInput);
  todoItem.appendChild(todoHeading);
  todoItem.appendChild(deleteBtn);

  todoItemList.appendChild(todoItem);

  checkboxInput.addEventListener("change", function () {
    if (checkboxInput.checked) {
      todoHeading.style.textDecoration = "line-through";
      todoHeading.style.textDecorationColor = "red";
      todoHeading.style.textDecorationThickness = ".2rem";
    }

    // If unchecked, remove the strikethrough
    else {
      todoHeading.style.textDecoration = "none";
    }
  });

  deleteBtn.addEventListener("click", () => {
    todoListArray = todoListArray.filter((todes) => {
      if (todes != todo) return todes;
    });
    todoItemList.removeChild(todoItem);
    // renderTodoListItem()
  });
}
