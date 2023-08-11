const calendarGrid = document.querySelector(".calendar-grid");
const currentMonthLabel = document.querySelector(".current-month");
const thisday = new Date();


function generateCalendar(year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
  
    calendarGrid.innerHTML = "";

    const startDay = firstDay.getDay();

    for (let i = 0; i < startDay; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.classList.add("calendar-cell");
        emptyCell.classList.add("empty-cell");
        calendarGrid.appendChild(emptyCell);
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
        const calendarCell = document.createElement("div");
        calendarCell.classList.add("calendar-cell");
        calendarCell.innerText = day;
        if (year === thisday.getFullYear() && month === thisday.getMonth() && day === thisday.getDate()) {
            calendarCell.classList.add("thisday");
        }
        calendarGrid.appendChild(calendarCell);
    }
    
    currentMonthLabel.innerText = `${year}년 ${month + 1}월`;
}
function goToMonthly() {
    showMonthlyCalendar();
    const thisday = new Date(); // 현재 날짜를 다시 가져와서 초기화
    generateCalendar(thisday.getFullYear(), thisday.getMonth()); 
}

function showPrevMonth() {
    thisday.setMonth(thisday.getMonth() - 1);
    generateCalendar(thisday.getFullYear(), thisday.getMonth());
}

function showNextMonth() {
    thisday.setMonth(thisday.getMonth() + 1);
    generateCalendar(thisday.getFullYear(), thisday.getMonth());
}

generateCalendar(thisday.getFullYear(), thisday.getMonth());



// monthly.js
function onCalendarDateClick(date) {
    const day = parseInt(date);
    const year = thisday.getFullYear();
    const month = thisday.getMonth();
    const clickedDate = new Date(year, month, day);

    const filteredTodoList = TodoListService.getInstance().getTodoListByDate(clickedDate);

    updateCalendarTodoListDisplay(filteredTodoList);
}

function updateCalendarTodoListDisplay(todoList) {
    const innerBox = document.querySelector(".inner-box");
    innerBox.innerHTML = ""; // 기존 내용 비우기

    if (todoList.length > 0) {
        todoList.forEach((todo, index) => {
            const todoItem = document.createElement("div");
            todoItem.classList.add("calendar-todo-item");

            const todoDate = new Date(todo.selectedDate);
            const formattedDate = `${todoDate.getFullYear()}-${padZero(todoDate.getMonth() + 1)}-${padZero(todoDate.getDate())}`;
            const formattedTime = todo.selectedTime;

            todoItem.innerHTML = `
                <div class="todo-date-time">${formattedDate} ${formattedTime}</div>
                <div class="todo-content">${todo.todoContent}</div>
            `;

            if (index !== 0) {
                todoItem.style.marginTop = "14px"; // 원하는 간격 조절
            }

            innerBox.appendChild(todoItem);
        });
    } else {
        innerBox.innerHTML = "<div class='no-todo-message'>Nothing!</div>";
    }

    todoItem.innerHTML = `
    <div class="todo-date-time">${formattedDate} ${formattedTime}</div>
    <div class="todo-content">${todo.todoContent}</div>
`;

}


function padZero(num) {
    return num.toString().padStart(2, '0');
}

function updateTodoListDisplay(todoList) {
    const todoListContainer = document.querySelector(".todolist-main-container");

    todoListContainer.innerHTML = ""; // 기존 목록을 비우기

    todoList.forEach(todo => {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");
        todoItem.innerText = todo.todoContent;

        todoListContainer.appendChild(todoItem);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const dateCells = document.querySelectorAll(".calendar-cell");
    dateCells.forEach(cell => {
        cell.addEventListener("click", () => {
            const clickedDate = cell.innerText;
            onCalendarDateClick(clickedDate);
        });
    });
});

