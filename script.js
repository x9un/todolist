const list = document.getElementById('list');// 所展示的 todos
const addBtn = document.getElementById('addBtn');// 添加按钮
const addList = document.getElementById('addList');// 输入框
const warn = document.getElementById('warn');// 警告信息    
const checkedbox = document.getElementById('checkbox');//复选框
const coin = document.getElementById('coin');//金币
const progress=document.getElementById('progress');//进度条标签

const localStorageTodos=JSON.parse(
    localStorage.getItem('todos')
);

const localStorageProgress=JSON.parse(
    localStorage.getItem('progress')
);

let todos=localStorage.getItem('todos') !== null?localStorageTodos:[];
let progressValue=localStorage.getItem('progress') !== null?localStorageProgress:0;

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
    if(!todo.status){
    item.innerHTML=`
    <label>
    <input type="checkbox" id="${todo.id}" class="nes-checkbox" onclick="ticked(${todo.id})"/>
    <span>${todo.text}</span>
    </label>
    <i class="nes-icon close is-small nes-pointer" onclick="removeTodo(${todo.id})"></i>
    `;
    }else{
    item.innerHTML=`
    <label>
    <input type="checkbox" id="${todo.id}" class="nes-checkbox" onclick="ticked(${todo.id})"/>
    <span class="completed">${todo.text}</span>
    </label>
    <i class="nes-icon close is-small nes-pointer" onclick="removeTodo(${todo.id})"></i>
    `;    
    }
    list.appendChild(item);
    let elCheckBox=document.getElementById(todo.id);
    if(todo.status){
        elCheckBox.checked=true;
    }
}

// Tick
function ticked(id){
    todos.forEach((todo) => {
        if(todo.id === id){
            todo.status= !todo.status;
            let elCheckBox=document.getElementById(id);
            if(todo.status){
                elCheckBox.nextElementSibling.classList.add('completed');
                coin.animate([
                    // keyframes
                    { opacity: 0 },
                    { opacity: 1 },
                    { opacity: 0 }
                  ], {
                    // timing options
                    duration: 500,
                  });
            }else{
                elCheckBox.nextElementSibling.classList.remove('completed');
            }
        }
    });
    updateLocalStorage();
}


// Remove todo by ID
function removeTodo(id){
    todos=todos.filter(todo => todo.id !== id);
    updateLocalStorage();
    init();
}

//progressUpdate
function progressUpdate(){
    let todoChecked=0;
    todos.forEach(todo=>{
        if(todo.status){
            todoChecked++;
        } 
    })
    progressValue=todoChecked/todos.length *100;
    localStorage.setItem('progress',JSON.stringify(progressValue));
    progress.setAttribute('value',progressValue);
}
  
function updateLocalStorage(){
    localStorage.setItem('todos',JSON.stringify(todos));
    progressUpdate();
}

addList.onkeydown = function (event) {
    var e = event || window.event;
    if (e && e.keyCode == 13) { //回车键的键值为13
        addTodos(e);
    }
}

function init(){                     
    list.innerHTML=``;
    todos.forEach(addTodosDOM);
}

init();
progressUpdate();

addBtn.addEventListener('click',addTodos);
