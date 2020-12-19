"use strict";
let students = [
  {
    "name": "asdf",
    "surname": "llll",
    "age": 12,
    "averageScore": 7
  },
  {
    "name": "asdfdd",
    "surname": ";'",
    "age": 54,
    "averageScore": 3
  },
  {
    "name": "",
    "surname": "",
    "age": 20,
    "averageScore": 10
  },
  {
    "name": "lala",
    "surname": "",
    "age": 19,
    "averageScore": 5
  }
]

let studentsTableModule = (function () {
  let students = []

  function setStudents(arr) {
    if (Array.isArray(arr) && arr.length) {
      students = arr.slice();
    }
  }

  function renderHeader() {
    let thead = document.createElement("thead");

    let headerRow = document.createElement("tr");

    let name = document.createElement("td");
    let surname = document.createElement("td");
    let age = document.createElement("td");
    let averageScore = document.createElement("td");

    name.appendChild(document.createTextNode("Имя"));
    surname.appendChild(document.createTextNode("Фамилия"));
    age.appendChild(document.createTextNode("Возраст"));
    averageScore.appendChild(document.createTextNode("Средний балл"));

    headerRow.appendChild(name);
    headerRow.appendChild(surname);
    headerRow.appendChild(age);
    headerRow.appendChild(averageScore);
    
    thead.appendChild(headerRow);

    return thead;
  }

  function renderBody() {
    let tbody = document.createElement("tbody");

    for (const student of students) {
      tbody.appendChild(renderStudent(student));
    }
  }
})();