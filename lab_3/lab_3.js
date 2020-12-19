"use strict";

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

    name.classList.add("name-cell");
    surname.classList.add("surname-cell");
    age.classList.add("age-cell");
    averageScore.classList.add("average-score-cell");

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

  function makeTable() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          if (this.responseText) {
            setStudents(JSON.parse(xhttp.responseText));
            let studentsTable = renderTable();
            document.body.appendChild(studentsTable);

            let avgScorePar = document.createElement("p");
            avgScorePar.setAttribute("id", "avg-score")

            studentsTable.parentNode.insertBefore(avgScorePar, studentsTable.nextSibling);

            changeAverageScore();
            //document.body.appendChild(document.createElement("p").appendChild(document.createTextNode("Средний балл всех студентов: " + studentsTableModule.computeAverageScore())));
          }
        }
    };
    xhttp.open("GET", "students.json", true);
    xhttp.send();
  }
  function changeAverageScore() {
    document.querySelector("#avg-score").textContent = "Средний балл всех студентов: " + studentsTableModule.computeAverageScore();
  }
  function computeAverageScore() {
    let studentsTable = document.querySelector("#students-table");
    let scores = studentsTable.querySelectorAll("tbody > tr > td.average-score-cell");

    let scoresSum = 0;
    let validScoresNumber = 0;
    for (let i = 0; i < scores.length; i++) {
      let n = parseFloat(scores[i].textContent);
      if (!isNaN(n)) {
        scoresSum += n;
        validScoresNumber++;
      }
    }

    return validScoresNumber ? scoresSum / validScoresNumber : 0;
  }

  return {
    makeTable: makeTable,
    computeAverageScore: computeAverageScore
  }
})();

let studentsTable = studentsTableModule.makeTable();