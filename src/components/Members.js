import { useEffect, useState } from "react";
import axios from "axios";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

function Members() {
  const [id, setId] = useState("");
  const [stname, setName] = useState("");
  const [course, setCourse] = useState("");
  const [students, setUsers] = useState([]);
  useEffect(() => {
    (async () => await Load())();
  }, []);
  async function Load() {
    const result = await axios.get(
      "https://localhost:7195/api/Student/GetStudent"
    );
    setUsers(result.data);
    console.log(result.data);
  }
  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("https://localhost:7195/api/Student/AddStudent", {
        stname: stname,
        course: course,
      });
      alert("Student Registation Successfully");
      setId("");
      setName("");
      setCourse("");

      Load();
    } catch (err) {
      alert(err);
    }
  }

  async function editStudent(students) {
    setName(students.stname);
    setCourse(students.course);

    setId(students.id);
  }

  async function DeleteStudent(id) {
    await axios.delete(
      "https://localhost:7195/api/Student/DeleteStudent/" + id
    );
    alert("Employee deleted Successfully");
    setId("");
    setName("");
    setCourse("");
    Load();
  }

  async function update(event) {
    event.preventDefault();
    try {
      await axios.patch(
        "https://localhost:7195/api/Student/UpdateStudent/" +
          students.find((u) => u.id === id).id || id,
        {
          id: id,
          stname: stname,
          course: course,
        }
      );
      alert("Registation Updateddddd");
      setId("");
      setName("");
      setCourse("");

      Load();
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      <h1>Team Alpha</h1>
      <div class="container mt-4">
        <form>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="id"
              hidden
              value={id}
              onChange={(event) => {
                setId(event.target.value);
              }}
            />

            <label>Name</label>
            <input
              type="text"
              class="form-control"
              id="stname"
              value={stname}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label for="Role">Role</label>
            <select
              class="form-control"
              id="tech-stack"
              //value={course}
              onChange={(event) => {
                // setCourse(event.target.value);
              }}
            >
              <option value="Developer">Developer</option>
              <option value="QA">QA</option>
              <option value="Designer">Designer</option>
              <option value="BizDev">BizDev</option>
            </select>
          </div>

          <div class="form-group">
            <label for="tech-stack">Tech Stack</label>
            <select
              class="form-control"
              id="tech-stack"
              //value={course}
              onChange={(event) => {
                //setCourse(event.target.value);
              }}
            >
              <option value="C#">C#</option>
              <option value="Asp.net">Asp.net</option>
              <option value="Java">Java</option>
              <option value="React.js">React.js</option>
              <option value="Angular">Angular</option>
              <option value="Figma/Tessa">Figma/Tessa</option>
              <option value="Selenium">Selenium</option>
              <option value="Cypress">Cypress</option>
            </select>
          </div>
          <div class="form-group">
            <label>Comments</label>
            <input
              type="text"
              class="form-control"
              id="course"
              value={course}
              onChange={(event) => {
                setCourse(event.target.value);
              }}
            />
          </div>
          <div>
            <button class="btn btn-primary mt-4" onClick={save}>
              Register
            </button>
            <button class="btn btn-warning mt-4" onClick={update}>
              Update
            </button>
          </div>
        </form>
      </div>
      <br></br>

      <table class="table table-dark" align="center">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Role</th>
            <th scope="col">Tech-Stack</th>
            <th scope="col">Comments</th>

            <th scope="col">Option</th>
          </tr>
        </thead>
        {students.map(function fn(student) {
          return (
            <tbody>
              <tr>
                <th scope="row">{student.id} </th>
                <td>{student.stname}</td>
                <td>{student.course}</td>

                <td>
                  <button
                    type="button"
                    class="btn btn-warning"
                    onClick={() => editStudent(student)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => DeleteStudent(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

export default Members;
