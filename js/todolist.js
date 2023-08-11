const addTodoButtonOnClickHandle = () => {
    generateTodoObj();
}

const addTodoOnKeyUpHandle = (event) => {
    if(event.keyCode === 13) {
        generateTodoObj();
    }
}



function dropFinishOnChangeHandle(selectElement) {
    const selectedValue = selectElement.value;
    TodoListService.getInstance().updateTodoList(selectedValue); 
}




function toggleComplete(element) {
    element.classList.toggle("completed");
  }
  

const checkedOnChangeHandle = (target) => {
    toggleComplete(target.parentNode.parentNode);
    TodoListService.getInstance().setCompleStatus(target.value, target.checked);
}

const modifyTodoOnClickHandle = (target) => {
    openModal();
    modifyModal(TodoListService.getInstance().getTodoById(target.value));
}

const deleteTodoOnClickHandle = (target) => {
    const itemId = target.value;
    TodoListService.getInstance().removeTodo(itemId);
}

const generateTodoObj = () => {
    const todoContent = document.querySelector(".todolist-header-items .text-input").value;
    const selectedDate = document.querySelector(".class-date").value; 
    const selectedTime = document.querySelector(".class-time").value; 

    const todoObj = {
        id: this.todoIndex, 
        todoContent: todoContent,
        createDate: DateUtils.toStringByFormatting(new Date()),
        completStatus: false,
        selectedDate: selectedDate,
        selectedTime: selectedTime, 
    };

    TodoListService.getInstance().addTodo(todoObj);
}


class TodoListService {
    static #instance = null;

    static getInstance() {
        if(this.#instance === null) {
            this.#instance = new TodoListService();
        }
        return this.#instance;
    }

    todoList = new Array();
    todoIndex = 1;

    constructor() {
        this.loadTodoList();
    }
  
    // JSON.parse(제인슨 문자열) : 제이슨 문자열 -> 객체 
    // JSON.stringify(객체) : 객체 -> 제이슨 문자열

    openModalForTodo = (todoId) => {
        const todo = this.getTodoById(todoId);
        modifyModal(todo);
        this.openModal();
    }

    loadTodoList() {
        this.todoList = !!localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : new Array();
        this.todoIndex = !!this.todoList[this.todoList.length - 1]?.id ? this.todoList[this.todoList.length - 1].id + 1 : 1;
    }

    saveLocalStorage() {
        localStorage.setItem("todoList", JSON.stringify(this.todoList));
    }

    getTodoById(id) {
        // console.log(this.todoList);
        // console.log(this.todoList.filter(todo => todo.id === parseInt(id)));
        // console.log(this.todoList.filter(todo => todo.id === parseInt(id))[0]);
        return this.todoList.filter(todo => todo.id === parseInt(id))[0];
    }

    addTodo(todoObj) {
        const todo = {
            ...todoObj,
            id: this.todoIndex
        }

        this.todoList.push(todo);

        this.saveLocalStorage();

        this.updateTodoList();

        this.todoIndex++;
    }

    setCompleStatus(id, status) {
        this.todoList.forEach((todo, index) => {
            if(todo.id === parseInt(id)) {
                this.todoList[index].completStatus = status;
            }
        });

        this.saveLocalStorage();
    }

    setTodo(todoObj) {
        for(let i = 0; i < this.todoList.length; i++) {
            if(this.todoList[i].id === todoObj.id) {
                this.todoList[i] = todoObj;
                break;
            }
        }

        this.saveLocalStorage();

        this.updateTodoList();
    }

    removeTodo(id) {
        this.todoList = this.todoList.filter(todo => {
            return todo.id !== parseInt(id);
        });

        this.saveLocalStorage();
        this.updateTodoList();
    }
  
    getFilteredTodoList(filterOption) {
        if (filterOption === "Finish!") {
            return this.todoList.filter(todo => todo.completStatus === true);
        } else if (filterOption === "On-going") {
            return this.todoList.filter(todo => todo.completStatus === false);
        } else {
            return this.todoList;
        }
    }
    getTodoListByDate(date) {
        return this.todoList.filter(todo => {
            const todoDate = new Date(todo.selectedDate);
            return (
                todoDate.getDate() === date.getDate() &&
                todoDate.getMonth() === date.getMonth() &&
                todoDate.getFullYear() === date.getFullYear()
            );
        });
    }

    updateTodoList(filterOption) {
        const todolistMainContainer = document.querySelector(".todolist-main-container");
        const filteredTodoList = this.getFilteredTodoList(filterOption);
    
        todolistMainContainer.innerHTML = filteredTodoList.map(todo => {
            return `
            <li class="todolist-items" id="todoItem-${todo.id}"> 
            <div class="item-left">
                <input type="checkbox" id="complet-chkbox${todo.id}" class="complet-chkboxs" ${todo.completStatus ? "checked" : ""} value="${todo.id}" onchange="checkedOnChangeHandle(this);">
                <label for="complet-chkbox${todo.id}"></label>
                    </div>
                    <div class="item-center">
                    <p class="selected-datetime">${todo.selectedDate} ${todo.selectedTime}</p>
                    <div class="todolist-content" data-todo-id="${todo.id}">${todo.todoContent}</div>



                    </div>
                </div>
                    <div class="item-right">
                        <div class="todolist-item-buttons">
                         
                            <button class="btn btn-remove" value="${todo.id}" onclick="deleteTodoOnClickHandle(this);"> x </button>
                        </div>
                    </div>
                </li>
            `;
        }).join("");

        todolistMainContainer.addEventListener("click", (event) => {
            const target = event.target;
            if (target.classList.contains("todolist-content")) {
                const todoId = target.getAttribute("data-todo-id");
                this.openModalForTodo(todoId);
            }
        });
    


    }
}


