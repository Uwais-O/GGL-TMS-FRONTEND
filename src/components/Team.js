import { useEffect, useState } from "react";
import axios from "axios";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

function Team() {
  const [members, setUsers] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [tstack, setTstack] = useState("");
  const [comments, setComments] = useState("");

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
        name: name,
        role: role,
        tstack: tstack,
        comments: comments,
      });
      alert("Team Member Registered Successfully");
      setId("");
      setName("");
      setRole("");
      setTstack("");
      setComments("");

      Load();
    } catch (err) {
      alert(err);
    }
  }

  async function editMember(members) {
    setName(members.name);
    setRole(members.role);
    setTstack(members.tstack);
    setComments(members.comments);
    setId(members.id);
  }

  async function DeleteMember(id) {
    await axios.delete(
      "https://localhost:7195/api/Student/DeleteStudent/" + id
    );
    alert("Member deleted Successfully");
    setId("");
    setName("");
    setRole("");
    setTstack("");
    setComments("");
    Load();
  }

  async function update(event) {
    event.preventDefault();
    try {
      await axios.patch(
        "https://localhost:7195/api/Student/UpdateStudent/" +
          members.find((u) => u.id === id).id || id,
        {
          id: id,
          name: name,
          role: role,
          tstack: tstack,
          comments: comments,
        }
      );
      alert("Registation Updated Successfully");
      setId("");
      setName("");
      setRole("");
      setTstack("");
      setComments("");

      Load();
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div style={{justifyContent: "space-between" }}>
      <div class="container mt-4" style={{ marginLeft: "70px" }}>
        <form>
          <div class="form-group">
            <div class="col-sm-4">
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
                id="name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </div>
            <div class="col-sm-4">
              {/* </div> */}
              {/* <div class="form-group"> */}
              <label for="Role">Role</label>
              <select
                class="form-control"
                id="tech-stack"
                value={role}
                onChange={(event) => {
                  setRole(event.target.role);
                }}
              >
                <option value="Developer">Developer</option>
                <option value="QA">QA</option>
                <option value="Designer">Designer</option>
                <option value="BizDev">BizDev</option>
              </select>
              {/* </div> */}

              {/* <div class="form-group"> */}
              <div class="col-sm-4">
                <label for="tech-stack">TechStack</label>
              </div>
              <select
                class="form-control"
                id="tech-stack"
                value={tstack}
                onChange={(event) => {
                  setTstack(event.target.tstack);
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
              {/* </div> */}
              {/* <div class="form-group"> */}
              <div class="col-sm-4">
                <label>Comments</label>
              </div>
              <input
                type="text"
                class="form-control"
                id="course"
                value={comments}
                onChange={(event) => {
                  setComments(event.target.value);
                }}
              />
              {/* </div> */}
            </div>
            <div>
              <button class="btn btn-primary mt-4" onClick={save}>
                Register
              </button>
              <button class="btn btn-warning mt-4" onClick={update}>
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
      <br></br>
      <div class="col-md-9" style={{ marginLeft: "10px", marginTop: "45px" }}>
        <table class="table table-bordered ">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Role</th>
              <th scope="col">Tech-Stack</th>
              <th scope="col">Comments/Blockers</th>

              <th scope="col">Options</th>
            </tr>
          </thead>
          {members.map(function fn(member) {
            return (
              <tbody>
                <tr>
                  <th scope="row">{member.id} </th>
                  <td>{member.name}</td>
                  <td>{member.role}</td>
                  <td>{member.tstack}</td>
                  <td>{member.comments}</td>

                  <td>
                    <button
                      type="button"
                      class="bi bi-pen"
                      onClick={() => editMember(members)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      class="bi bi-trash"
                      onClick={() => DeleteMember(members.id)}
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
    </div>
  );
}

export default Team;
