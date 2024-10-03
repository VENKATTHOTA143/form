document
  .getElementById("studentForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const hallNo = document.getElementById("hallNo").value;
    const name = document.getElementById("name").value;
    const fatherName = document.getElementById("fatherName").value;
    const department = document.getElementById("department").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const table = document
      .getElementById("studentTable")
      .getElementsByTagName("tbody")[0];
    const newRow = table.insertRow();
    newRow.insertCell(0).textContent = hallNo;
    newRow.insertCell(1).textContent = name;
    newRow.insertCell(2).textContent = fatherName;
    newRow.insertCell(3).textContent = department;
    newRow.insertCell(4).textContent = phone;
    newRow.insertCell(5).textContent = email;
    newRow.insertCell(6).textContent = address;
    document.getElementById("studentForm").reset();
    loadTableData();
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const isDuplicate = students.some((student) => student.hallNo === hallNo);
    if (isDuplicate) {
      alert("This Hall No is already taken. Please enter a unique Hall No.");
      return;
    }
  });
function upperCase() {
  const x = document.getElementById("name");
  x.value = x.value.toUpperCase();
}
async function fetchStudentData() {
  try {
    const response = await fetch("./form2.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const students = await response.json();
    populateTable(students);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}
function populateTable(students) {
  const tableBody = document
    .getElementById("studentTable")
    .getElementsByTagName("tbody")[0];

  tableBody.innerHTML = "";
  students.forEach((student) => {
    const newRow = tableBody.insertRow();
    newRow.insertCell(0).textContent = student.hallNo;
    newRow.insertCell(1).textContent = student.name;
    newRow.insertCell(2).textContent = student.fatherName;
    newRow.insertCell(3).textContent = student.department;
    newRow.insertCell(4).textContent = student.phone;
    newRow.insertCell(5).textContent = student.email;
    newRow.insertCell(6).textContent = student.address;
  });
}
function upperCase() {
  const x = document.getElementById("name");
  x.value = x.value.toUpperCase();
}
const hallNoAscIcon = document.querySelector(".ri-sort-asc");
const hallNoDescIcon = document.querySelector(".ri-sort-desc");
let isAscending = true;
hallNoAscIcon.addEventListener("click", () => {
  sortTableByColumn(0, isAscending);
  isAscending = !isAscending;
  toggleSortIcons();
});
hallNoDescIcon.addEventListener("click", () => {
  sortTableByColumn(0, !isAscending);
  isAscending = !isAscending;
  toggleSortIcons();
});
function toggleSortIcons() {
  hallNoAscIcon.style.display = isAscending ? "none" : "inline";
  hallNoDescIcon.style.display = isAscending ? "inline" : "none";
}
function sortTableByColumn(index, ascending) {
  const table = document.getElementById("studentTable");
  const rows = Array.from(table.rows).slice(1);

  rows.sort((a, b) => {
    const aText = a.cells[index].textContent.trim();
    const bText = b.cells[index].textContent.trim();

    if (!isNaN(aText) && !isNaN(bText)) {
      return ascending ? aText - bText : bText - aText;
    }
    return ascending ? aText.localeCompare(bText) : bText.localeCompare(aText);
  });
  const tbody = table.getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";
  rows.forEach((row) => tbody.appendChild(row));
}
window.onload = fetchStudentData;
