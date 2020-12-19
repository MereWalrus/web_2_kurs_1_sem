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
  let idCounter = 0;

  function setStudents(arr) {
    if (Array.isArray(arr)) {
      students = arr.slice();
    }
    else {
      students = [];
    }
    idCounter = 0;
    for (const student of students) {
      student["id"] = idCounter;
      idCounter++;
    }
  }

  function renderHeader() {
    let thead = document.createElement("thead");

    let headerRow = document.createElement("tr");

    let name = document.createElement("th");
    let surname = document.createElement("th");
    let age = document.createElement("th");
    let averageScore = document.createElement("th");

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

  function renderStudent(student) {
    let row = document.createElement("tr");

    let name = document.createElement("td");
    let surname = document.createElement("td");
    let age = document.createElement("td");
    let averageScore = document.createElement("td");

    name.appendChild(document.createTextNode(student.name));
    surname.appendChild(document.createTextNode(student.surname));
    age.appendChild(document.createTextNode(!isNaN(student.age) ? student.age : ""));
    averageScore.appendChild(document.createTextNode(!isNaN(student.averageScore) ? student.averageScore : ""));

    row.appendChild(name);
    row.appendChild(surname);
    row.appendChild(age);
    row.appendChild(averageScore);

    row.setAttribute("rowId", student.id.toString());

    return row;
  }

  function renderBody() {
    let tbody = document.createElement("tbody");

    for (let i = 0; i < students.length; i++) {
      tbody.appendChild(renderStudent(students[i]));
    }

    return tbody;
  }

  function renderTable() {
    let studentsTable = document.createElement("table");

    studentsTable.appendChild(renderHeader());
    studentsTable.appendChild(renderBody());

    studentsTable.setAttribute("id", "students-table");
    
    return studentsTable;
  }

  function makeTable(arr) {
    setStudents(arr);
    return renderTable();
  }

  return {
    makeTable: makeTable,
    sayHello: function sayHello () {
      alert("hello");
      return document.createElement("p").appendChild(document.createTextNode("hello"));
    }
  }
})();

let studentsTable = studentsTableModule.makeTable(students);
studentsTableModule.sayHello();
document.body.appendChild(studentsTable);
document.body.appendChild(document.createElement("p").appendChild(document.createTextNode("hello")));
alert("help");
//document.body.appendChild(hello);