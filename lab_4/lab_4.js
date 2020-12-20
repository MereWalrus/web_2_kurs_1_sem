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
      student["id"] = idCounter++;
    }
  }

  function addStudent() {
    let student = {
      "name": $('#name').val(),
      "surname": $('#surname').val(),
      "age": $('#age').val(),
      "averageScore": $('#average-score').val(),
      "id": idCounter++
    };
    students.push(student);

    $("#students-table > tbody").append(renderStudent(student));
    changeAverageScore();
  }

  function removeStudent(studentRow) {
    let id = $(studentRow).attr("rowId");
    studentRow.remove();

    for (let i = 0; i < students.length; i++) {
      if(students[i].id == parseInt(id)) {
        students.splice(i,1);
        break;
      }
    }

    changeAverageScore();
  }

  function renderHeader() {
    let thead = $("<thead></thead>");

    let headerRow = $("<tr></tr>");

    let name = $("<th></th>").text("Имя");
    let surname = $("<th></th>").text("Фамилия");
    let age = $("<th></th>").text("Возраст");
    let averageScore = $("<th></th>").text("Средний балл");

    $(headerRow).append(name, surname, age, averageScore, $("<th></th>"));

    $(thead).append(headerRow);

    return thead;
  }

  function renderStudent(student) {
    let row = $("<tr></tr>");

    let name = $("<td></td>").text(student.name).addClass("name-cell");
    let surname = $("<td></td>").text(student.surname).addClass("surname-cell");
    let age = $("<td></td>").text(!isNaN(student.age) ? student.age : "").addClass("age-cell");
    let averageScore = $("<td></td>").text(!isNaN(student.averageScore) ? student.averageScore : "").addClass("average-score-cell");

    $(row).append(name, surname, age, averageScore);

    let removeButton = $("<button></button>");
    removeButton.text("Удалить");
    $(row).append(removeButton);
    $(removeButton).click(() => removeStudent($(removeButton).parent()));

    $(row).attr("rowId", student.id.toString());
    return row;
  }

  function renderBody() {
    let tbody = $("<tbody></tbody>");

    for (let i = 0; i < students.length; i++) {
      $(tbody).append(renderStudent(students[i]));
    }

    return tbody;
  }

  function renderTable() {
    let studentsTable = $("<table></table>");

    $(studentsTable).append(renderHeader());
    $(studentsTable).append(renderBody());
    $(studentsTable).attr("id", "students-table");

    
    return studentsTable;
  }

  function makeTable() {
    $.get("students.json", function(data) {
          alert(data);
          setStudents(data);
          let studentsTable = renderTable();
          $("body").append(studentsTable);

          let avgScorePar = $("<p></p>");
          $(avgScorePar).attr("id", "avg-score-par")

          $(studentsTable).after(avgScorePar, studentsTable.nextSibling);

          changeAverageScore();
    });
  }
  function changeAverageScore() {
    $("#avg-score-par").text("Средний балл всех студентов: " + computeAverageScore());
  }
  function computeAverageScore() {
    let scores = $("#students-table td.average-score-cell");
    alert(scores);
    let scoresSum = 0;
    let validScoresNumber = 0;
    for (let i = 0; i < scores.length; i++) {
      alert($(scores[i]).text());
      let n = parseFloat($(scores[i]).text());
      if (!isNaN(n)) {
        scoresSum += n;
        validScoresNumber++;
      }
    }

    return validScoresNumber ? scoresSum / validScoresNumber : 0;
  }

  return {
    makeTable: makeTable,
    computeAverageScore: computeAverageScore,
    addStudent: addStudent
  }
})();

studentsTableModule.makeTable();