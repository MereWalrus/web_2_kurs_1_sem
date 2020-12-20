'use strict';

function App() {
  let student = {
    "name": "Гавриил",
    "surname": "Лановой",
    "age": 17,
    "averageScore": 7
  };
  return (
    <table>
      <StudentsThead />
      <Student student={student}/>

    </table>
  );
}

function Student(props) {
  return(
      <tr row-id={props.student.id}>
          <td className="name-cell">{props.student.name}</td>
          <td className="surname-cell">{props.student.surname}</td>
          <td className="age-cell">{!isNaN(props.student.age) ? props.student.age : ""}</td>
          <td className="average-score-cell">{!isNaN(props.student.averageScore) ? props.student.averageScore : ""}</td>
          <td><button onClick={(() => removeStudent(this.parentNode()))}>Удалить</button></td>
      </tr>
  );
}

function StudentsThead() {
  return(
    <thead>
      <tr>
          <th>Имя</th>
          <th>Фамилия</th>
          <th>Возраст</th>
          <th>Средний балл</th>
          <th></th>
      </tr>
    </thead>
);
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);