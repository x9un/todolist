const list = document.getElementById('list');// 所展示的 todos
const addBtn = document.getElementById('addBtn');// 添加按钮
const addList = document.getElementById('addList');// 输入框
const warn = document.getElementById('warn');// 警告信息

const localStorageTodos=JSON.parse(
    localStorage.getItem('todos')
);

let todos=localStorage.getItem('todos') !== null?localStorageTodos:[];

// Add todos
function addTodos(e){
    e.preventDefault();

    if(addList.value.trim()===''){
        warn.className='warn error';
    }else{
        warn.className='warn';
        const todo = {text:addList.value};
        todos.push(todo);
        addTodosDOM(todo);
        updateLocalStorage();
        addList.value='';// clear
    }
}

// Add todos to DOM list 
function addTodosDOM(todo){
    const item=document.createElement('li');
    item.innerHTML=`
    <label>
    <input type="checkbox" class="nes-checkbox" />
    <span>${todo.text}</span>
    </label>
    `;
    list.appendChild(item);
}

function updateLocalStorage(){
    localStorage.setItem('todos',JSON.stringify(todos));
}

function init(){
    list.innerHTML=``;
    todos.forEach(addTodosDOM);
}

init();
addBtn.addEventListener('click',addTodos);