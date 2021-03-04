const list = document.getElementById('list');// 所展示的 todos
const addBtn = document.getElementById('addBtn');// 添加按钮
const addList = document.getElementById('addList');// 输入框
const warn = document.getElementById('warn');// 警告信息    
const checkedbox = document.getElementById('checkbox');//复选框

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
        const todo = {
            id:generateID(),
            text:addList.value,
            status:false
        };
        todos.push(todo);
        addTodosDOM(todo);
        updateLocalStorage();
        addList.value='';// clear
    }
}

// Generate random ID
function generateID(){
    return Math.floor(Math.random() * 100000000);
}

// Add todos to DOM list 
function addTodosDOM(todo){
    const item=document.createElement('li');
    item.innerHTML=`
    <label>
    <input type="checkbox" id="${todo.id}" class="nes-checkbox" onclick="ticked(${todo.id})"/>
    <span>${todo.text}</span>
    </label>
    <i class="nes-icon close is-small nes-pointer" onclick="removeTodo(${todo.id})"></i>
    `;
    list.appendChild(item);
    let elCheckBox=document.getElementById(todo.id);
    console.log(todo.status);
    if(todo.status){
        elCheckBox.checked=true;
    }
}

// tick
function ticked(id){
    todos.forEach((todo) => {
        if(todo.id === id){
           todo.status= !todo.status;
        }
        console.log(todo);
    });
    updateLocalStorage();
}

// Remove todo by ID
function removeTodo(id){
    todos=todos.filter(todo => todo.id !== id);
    updateLocalStorage();
    init();
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
