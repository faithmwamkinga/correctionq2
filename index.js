const todoList = document.getElementById('registration');
const getTodoList = () => {
  return fetch('https://dummyjson.com/todos?limit=20')
    .then(response => response.json())
    .then(response => response.todos)
    .catch(error => error);
};
const displayList = async () => {
  const users = await getTodoList();
  console.log(users);
  if (Array.isArray(users)) {
    users.forEach(item => {
      let div = document.createElement('div');
      let userName = document.createElement('input');
      let ids = document.createElement('span');
      let checkbox = document.createElement('input');
      let icon = document.createElement('i');
      checkbox.type = 'checkbox';
      checkbox.checked = item.completed;
      icon.classList.add('fa', 'fa-trash');
      ids.appendChild(icon);
      userName.value = item.todo;
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          userName.style.textDecoration = 'line-through';
        } else {
          userName.style.textDecoration = 'none';
        }
      });
      icon.addEventListener('click', () => {
        deleteUser(item.id);
        div.remove();
      });
      div.appendChild(checkbox);
      div.appendChild(userName);
      div.appendChild(ids);
      div.setAttribute('key', item.id);
      div.setAttribute('class', 'persona');
      userContainer.appendChild(div);
    });
  }
};
const deleteUser = async (userId) => {
  fetch(`https://dummyjson.com/todos/${userId}`, {
  method: 'DELETE'
})
  .then(response => {
    if (!response.ok) {
      return ' delete task';
    }
  })
  .catch(error => {
    console.log(error);
  });
};
displayList();
const addForm = document.getElementById('row');
addForm.addEventListener('submit', event => {
  event.preventDefault();
  const taskInput = document.getElementById('input-box');
  const newTask = taskInput.value;
  taskInput.value = '';
  if (newTask) {
    const div = document.createElement('div');
    const userName = document.createElement('input');
    const ids = document.createElement('span');
    const checkbox = document.createElement('input');
    const icon = document.createElement('i');
    checkbox.type = 'checkbox';
    checkbox.checked = false;
    icon.classList.add('fa', 'fa-trash');
    ids.appendChild(icon);
    userName.value = newTask;
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        userName.style.textDecoration = 'line-through';
      } else {
        userName.style.textDecoration = 'none';
      }
    });
    div.appendChild(checkbox);
    div.appendChild(userName);
    div.appendChild(ids);
    div.setAttribute('key', Date.now());
    div.setAttribute('class', 'persona');
    userContainer.prepend(div);
  }
});