let today = new Date();

const sidebarToggleButtonOnClickHandle = () => {
  const sidebar = document.querySelector(".sidebar");
  const sidebarToggleButton = document.querySelector(".sidebar-toggle-button");

  if (sidebar.classList.contains("isSidebarOpen")) {
      sidebar.classList.remove("isSidebarOpen");
      sidebarToggleButton.innerHTML = 'open';
      closeSidebar(); // 사이드바 닫을 때 z-index 복원
  } else {
      sidebar.classList.add("isSidebarOpen");
      sidebarToggleButton.innerHTML = 'close';
      openSidebar(); // 사이드바 열 때 z-index 조정
  }
}

const sidebarMenuOnClickHandle = (target) => {
  switch (target.innerHTML) {
    case "Main":
      Routes.getInstance().routeState = "welcome";
      break;
    case "To Do List":
      Routes.getInstance().routeState = "todolist";
      break;
    case "Monthly":
      Routes.getInstance().routeState = "monthly"; 
      goToMonthly(); 
      break;
  }

  Routes.getInstance().show();
  sidebarToggleButtonOnClickHandle();
}



function openSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.zIndex = 9999; // 사이드바를 가장 앞으로 오도록 설정
  sidebar.classList.add("open"); // 사이드바 열기
}

function closeSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.zIndex = 1; // 기본 z-index 값으로 복원
  sidebar.classList.remove("open"); // 사이드바 닫기
}
function showMonthlyCalendar() {
  document.querySelector(".todolist-page-container").classList.add("invisible");
  document.querySelector(".welcome-page-container").classList.add("invisible");
  document.querySelector(".monthly-page-container").classList.remove("invisible");
}

// 월간 달력을 클릭할 때 실행되는 함수
function goToMonthly() {
  showMonthlyCalendar();
  generateCalendar(today.getFullYear(), today.getMonth()); // 월간 달력 표시
}