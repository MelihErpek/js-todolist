const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const deleteAllBtn = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items ;


let eventListeners = () => {
  form.addEventListener('submit', addNewItem);
  taskList.addEventListener('click', deleteItem);
  deleteAllBtn.addEventListener('click', deleteAllItem);
}

let loadItems = () =>
{
  items = getItemsFromLS();

  items.forEach(function(item){
    createItem(item);
  })
}

let getItemsFromLS = () =>
{
  if(localStorage.getItem('items')===null)
  {
    items = [];
  }
  else{
    items = JSON.parse(localStorage.getItem('items'));
  }
  return items;
}

let setItemToLs = (text) => {
  items = getItemsFromLS();
  items.push(text);
  localStorage.setItem('items',JSON.stringify(items));
}

let deleteItemFromLS = (text) =>{
    items = getItemsFromLS();
    items.forEach(function(item,index){
      if(item === text){
        items.splice(index,1);
      }
    });
    localStorage.setItem('items',JSON.stringify(items));
  }

let createItem = (text) => {
  const li = document.createElement('li');
  li.className = 'list-group-item list-group-item-secondary';
  li.appendChild(document.createTextNode(text));

  const a = document.createElement('a');
  a.classList = 'delete-item float-right';
  a.setAttribute('href', '#');
  a.innerHTML = '<i class="fas fa-times"></i>';

  li.appendChild(a);

  taskList.appendChild(li);
}
let addNewItem = (e) => {
  if (input.value === '') {
    alert("add new item");
  }
  
  createItem(input.value);

  setItemToLs(input.value);

  input.value = '';

  e.preventDefault();

}
let deleteItem = (e) => {

  if (e.target.className === 'fas fa-times') {
    e.target.parentElement.parentElement.remove();

    deleteItemFromLS(e.target.parentElement.parentElement.textContent);
  }
}
let deleteAllItem = (e) => {
  if (confirm('are you sure?')) {
    while(taskList.firstChild)
    {
      taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
  }
  //taskList.innerHTML ='';
  e.preventDefault();
}
eventListeners();

loadItems();

