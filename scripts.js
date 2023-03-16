// Display selected month
function displaySelectedMonth() {
  const selectedMonth = document.querySelector("input[name='month']:checked").value;
  const monthName = new Date(2000, selectedMonth, 1).toLocaleString("default", { month: "long" });
  document.getElementById("calendar").dataset.month = monthName;
}

// Call the function to display the initial month
displaySelectedMonth();

// Generate calendar
const calendar = document.getElementById("calendar");
const today = new Date();
const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
const endDate = new Date(today.getFullYear(), today.getMonth() + 11, 0);

for (let day = startDate; day <= endDate; day.setDate(day.getDate() + 1)) {
  const cell = document.createElement("div");
  cell.classList.add("day");
  cell.dataset.date = day.toISOString().slice(0, 10);
  cell.textContent = day.getDate();
  calendar.appendChild(cell);
}

// Add event listeners
calendar.addEventListener("click", (e) => {
  if (e.target.classList.contains("day")) {
    e.target.classList.toggle("selected");
  }
});
// Add this event listener inside the `scripts.js` file, after the calendar event listener
document.getElementById("month").addEventListener("change", () => {
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
