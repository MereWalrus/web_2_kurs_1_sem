'use strict';

function App() {
  let students = [
    {
      "name": "Гавриил",
      "surname": "Лановой",
      "age": 17,
      "averageScore": 7,
      "id": 0
    },
    {
      "name": "Василий",
      "surname": "Лыткин",
      "age": 28,
      "averageScore": 10,
      "id": 1
    },
    {
      "name": "Антон",
      "surname": "Селиверстов",
      "age": 18,
      "averageScore": 8,
      "id": 2
    },
    {
      "name": "Чеслав",
      "surname": "Недбайло",
      "age": 19,
      "averageScore": 5,
      "id": 3
    }
  ]
  return (
    <StudentsTable students={students}/>
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

function StudentsTbody(props) {
  const students = props.students.map((student) => {
    return(
        <Student key={student.id} student={student} />
    );
  })

  return(
      <tbody>
        {students}
      </tbody>
  );
}

class StudentsTable extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          students: this.props.students
      }
  }

  render() {
      return (
          <table>
            <StudentsThead />
            <StudentsTbody students={this.state.students} />
          </table>
      );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);