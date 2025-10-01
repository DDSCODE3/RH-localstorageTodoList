const openModalButton = document.querySelector(".open-modal-button");
const modalScreen = document.querySelector(".modal-screen");
const todosContainer = document.querySelector(".todos-container");
const checkbox = document.querySelector("#has-date");
const cancelBtn = document.querySelector(".cancel");
const createBtn = document.querySelector(".create");
const closeXBtn = document.querySelector(".size-6");
const todoInput = document.querySelector(".input");
const clearAllTodos = document.querySelector(".clear-all-todos");
const sortTodoBtn = document.querySelectorAll(".sort-menu button");

let todos = [];

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    console.log("چک‌باکس فعال شد");
  } else {
    console.log("چک‌باکس غیرفعال شد");
  }
});

function addTodo() {
  const todoTitle = todoInput.value;
  const newTodo = {
    id: Math.floor(Math.random() * 99999),
    title: todoTitle,
    isComplete: false,
  };

  todoInput.value = "";
  todos.push(newTodo);
  saveToLocalStorage(todos);
  showTodos(todos);
}

function addTodoWithEnter(e) {
  if (e.code === "Enter") {
    addTodo();
    // showTodos();
    hideModal();
  }
}

function saveToLocalStorage(todosArray) {
  localStorage.setItem("todos", JSON.stringify(todosArray));
}

function getItem() {
  const localTodos = JSON.parse(localStorage.getItem("todos"));
  if (localTodos) {
    todos = localTodos;
  }
  showTodos(todos);
}

function showTodos(todos) {
  todosContainer.innerHTML = "";
  if (todos.length) {
    todos.forEach(function (todo) {
      todosContainer.insertAdjacentHTML(
        "beforeend",
        `
        <article id="${todo.id}" class="todo  ${
          todo.isComplete ? "complete" : ""
        }">
          <div class="todo-data">
            <div class="checkbox">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              </span>
            </div>
            <div>
              <p class="todo-title">${todo.title}</p>
            </div>
          </div>

          <div class="todo-buttons">
            <button class="delete" onclick ="removeTodo(${
              todo.id
            })">حذف</button>
            
            <button class="complete" onclick ="completeTodo(${
              todo.id
            })">تکمیل</button>
          </div>
        </article>
      `
      );
    });
  } else {
    todosContainer.innerHTML = `<h1 style="text-align:center">محتوایی یافت نشد </h1>`;
  }
}
function removeTodo(todoId) {
  const mainTodoIndex = todos.findIndex(function (todo) {
    return todo.id === todoId;
  });
  todos.splice(mainTodoIndex, 1);
  showTodos(todos);
  saveToLocalStorage(todos);
}

function completeTodo(todoId) {
  todos.some(function (todo) {
    if (todo.id === todoId) {
      todo.isComplete = true;
    }
  });
  saveToLocalStorage(todos);
  showTodos(todos);
}

// function clearAllTodo() {
//   const userConfirm = confirm("تمامی داده ها پاک شود؟");
//   if (userConfirm) {
//     localStorage.clear();
//     todosContainer.innerHTML = "";
//     todosContainer.innerHTML = `<h1 style="text-align:center">محتوایی یافت نشد </h1>`;
//   }
// }

function showModal() {
  modalScreen.classList.remove("hidden");
}
function hideModal() {
  modalScreen.classList.add("hidden");
}

function sortTodoHandler(event) {
  const sortType = event.target.value;
  console.log(sortType);

  switch (sortType) {
    case "completed": {
      const completeTodos = todos.filter(function (todo) {
        return todo.isComplete === true;
      });

      console.log(completeTodos);
      showTodos(completeTodos);
      break;
    }

    case "uncompleted": {
      const unCompletedTodos = todos.filter(function (todo) {
        return todo.isComplete === false;
      });

      showTodos(unCompletedTodos);
      break;
    }

    default:
      showTodos(todos);
      break;
  }
}

sortTodoBtn.forEach(function (sortTodoBtn) {
  sortTodoBtn.addEventListener("click", sortTodoHandler);
});

document.addEventListener("keyup", addTodoWithEnter);
createBtn.addEventListener("click", addTodo);
openModalButton.addEventListener("click", showModal);
cancelBtn.addEventListener("click", hideModal);
createBtn.addEventListener("click", hideModal);
closeXBtn.addEventListener("click", hideModal);
// clearAllTodos.addEventListener("click", clearAllTodo);
