// Generate calendar
const calendar = document.getElementById("calendar");
const today = new Date();
const startDate = new Date(today.getFullYear(), today.getMonth(), 1);

function displaySelectedMonth() {
  const monthSelect = document.getElementById("month-select");
  const selectedMonths = Array.from(monthSelect.selectedOptions).map(option => parseInt(option.value));
  const monthNames = selectedMonths.map(month => new Date(2000, month, 1).toLocaleString("default", { month: "long" }));
  document.getElementById("calendar").dataset.month = monthNames.join(", ");
}

function updateCalendar() {
  // Get selected months
  const monthSelect = document.getElementById("month-select");
  const selectedMonths = Array.from(monthSelect.selectedOptions).map(option => parseInt(option.value));

  // Clear the existing calendar
  calendar.innerHTML = "";

  // Generate the new calendar for each selected month
  selectedMonths.forEach(selectedMonth => {
    const start = new Date(today.getFullYear(), selectedMonth, 1);
    const end = new Date(today.getFullYear(), selectedMonth + 1, 0);

    for (let day = start; day <= end; day.setDate(day.getDate() + 1)) {
      const cell = document.createElement("div");
      cell.classList.add("day");
      cell.dataset.date = day.toISOString().slice(0, 10);
      cell.textContent = day.getDate();
      calendar.appendChild(cell);
    }
  });
}

// Call the functions to display the initial month and calendar
displaySelectedMonth();
updateCalendar();

// Add event listeners
calendar.addEventListener("click", (e) => {
  if (e.target.classList.contains("day")) {
    e.target.classList.toggle("selected");
  }
});

document.getElementById("month-select").addEventListener("change", () => {
  displaySelectedMonth();
  updateCalendar();
});

const userForm = document.getElementById("userForm");
userForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const selectedDays = Array.from(calendar.querySelectorAll(".selected")).map((day) => day.dataset.date);

  const user = document.createElement("div");
  user.classList.add("user");
  user.textContent = `${username}: ${selectedDays.join(", ")}`;
  document.getElementById("users").appendChild(user);

  // Clear the form and calendar selections
  userForm.reset();
  calendar.querySelectorAll(".selected").forEach((day) => day.classList.remove("selected"));
});
