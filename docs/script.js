document.addEventListener("DOMContentLoaded", function () {
  const todoForm = document.getElementById("todoForm");
  const todoInput = document.getElementById("todoInput");
  const todoList = document.getElementById("todoList");

  let todos = JSON.parse(localStorage.getItem("todos")) || [];

 
  function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
      const li = document.createElement("li");
      let getTime = timeDiff(todo?.timestamp);
      console.log(todo);
      li.innerHTML = `
      
          <span class="text ${todo.completed ? "completed" : ""}">${todo.text}
          <span class='time'>${getTime}</span>
          </span>
          
          <div class='icon-wrap'>
          <input type="checkbox" ${todo.completed ? "checked" : ""}>
          <svg viewBox="0 0 1024 1024" class="icon edit-btn" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M823.3 938.8H229.4c-71.6 0-129.8-58.2-129.8-129.8V215.1c0-71.6 58.2-129.8 129.8-129.8h297c23.6 0 42.7 19.1 42.7 42.7s-19.1 42.7-42.7 42.7h-297c-24.5 0-44.4 19.9-44.4 44.4V809c0 24.5 19.9 44.4 44.4 44.4h593.9c24.5 0 44.4-19.9 44.4-44.4V512c0-23.6 19.1-42.7 42.7-42.7s42.7 19.1 42.7 42.7v297c0 71.6-58.2 129.8-129.8 129.8z" fill="#65f033"></path><path d="M483 756.5c-1.8 0-3.5-0.1-5.3-0.3l-134.5-16.8c-19.4-2.4-34.6-17.7-37-37l-16.8-134.5c-1.6-13.1 2.9-26.2 12.2-35.5l374.6-374.6c51.1-51.1 134.2-51.1 185.3 0l26.3 26.3c24.8 24.7 38.4 57.6 38.4 92.7 0 35-13.6 67.9-38.4 92.7L513.2 744c-8.1 8.1-19 12.5-30.2 12.5z m-96.3-97.7l80.8 10.1 359.8-359.8c8.6-8.6 13.4-20.1 13.4-32.3 0-12.2-4.8-23.7-13.4-32.3L801 218.2c-17.9-17.8-46.8-17.8-64.6 0L376.6 578l10.1 80.8z" fill="#565d8f"></path></g></svg>
          <svg viewBox="0 0 1024 1024" class="icon delete-btn" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M154 260h568v700H154z" fill="#FF3B30"></path><path d="M624.428 261.076v485.956c0 57.379-46.737 103.894-104.391 103.894h-362.56v107.246h566.815V261.076h-99.864z" fill="#030504"></path><path d="M320.5 870.07c-8.218 0-14.5-6.664-14.5-14.883V438.474c0-8.218 6.282-14.883 14.5-14.883s14.5 6.664 14.5 14.883v416.713c0 8.219-6.282 14.883-14.5 14.883zM543.5 870.07c-8.218 0-14.5-6.664-14.5-14.883V438.474c0-8.218 6.282-14.883 14.5-14.883s14.5 6.664 14.5 14.883v416.713c0 8.219-6.282 14.883-14.5 14.883z" fill="#152B3C"></path><path d="M721.185 345.717v-84.641H164.437z" fill="#030504"></path><path d="M633.596 235.166l-228.054-71.773 31.55-99.3 228.055 71.773z" fill="#FF3B30"></path><path d="M847.401 324.783c-2.223 0-4.475-0.333-6.706-1.034L185.038 117.401c-11.765-3.703-18.298-16.239-14.592-27.996 3.706-11.766 16.241-18.288 27.993-14.595l655.656 206.346c11.766 3.703 18.298 16.239 14.592 27.996-2.995 9.531-11.795 15.631-21.286 15.631z" fill="#FF3B30"></path></g></svg>
          </div>
        `;

      const deleteBtn = li.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", function () {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
      });

      const editBtn = li.querySelector(".edit-btn");
      editBtn.addEventListener("click", function () {
        const newTodo = prompt("Edit Todo:", todo.text);
        if (newTodo && newTodo.trim() !== "") {
          todos[index].text = newTodo.trim();
          saveTodos();
          renderTodos();
        }
      });

      const checkbox = li.querySelector('input[type="checkbox"]');
      checkbox.addEventListener("change", function () {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos();
      });

      todoList.appendChild(li);
    });
  }

  renderTodos();

  todoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const todoText = todoInput.value.trim();

    if (todoText !== "") {
      todos.push({ text: todoText, completed: false, timestamp: new Date() });
      saveTodos();
      renderTodos();
      todoInput.value = "";
    } else {
      alert("Please enter a valid todo.");
    }
  });

  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  function timeDiff(prevDate) {
    let d1 = new Date(prevDate);
    let d2 = new Date();
    let diffInMs = d2 - d1;

    if (diffInMs < 10000) { 
        return 'Just now';
    }

    let seconds = Math.floor(diffInMs / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    if (days > 0) {
        return days + (days === 1 ? ' day ago' : ' days ago');
    } else if (hours > 0) {
        return hours + (hours === 1 ? ' hour ago' : ' hours ago');
    } else if (minutes > 0) {
        return minutes + (minutes === 1 ? ' minute ago' : ' minutes ago');
    } else {
        return seconds + (seconds <= 10 ? ' seconds ago' : ' seconds ago');
    }
}

});
