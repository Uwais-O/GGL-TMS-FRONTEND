/**
  React component that manages the registration, editing, and deletion of team members.
 **/

import { useEffect, useState } from "react";
import axios from "axios";
// Bootstrap CSS
import { FaTrash } from 'react-icons/fa'
import { FaPen } from 'react-icons/fa'
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";


function Tms() {
 // Define state variables for managing team member data
  const [members, setUsers] = useState([]);
  const [id, setId] = useState("");
  const [mname, setName] = useState("");
  const [role, setRole] = useState("");
  const [tstack, setTstack] = useState("");
  const [blockers, setComments] = useState("");

  // Define options for select dropdowns
  const options = [
    { label: "C#", value: "C#" },
    { label: "Asp.net", value: "Asp.net" },
    { label: "Java", value: "Java" },
    { label: "React.js", value: "React.js" },
    { label: "Angular", value: "Angular" },
    { label: "Figma/Tessa", value: "Figma/Tessa" },
    { label: "Selenium", value: "Selenium" },
    { label: "Cypress", value: "Cypress" }
  ];

  const options1 = [
    { label: "Developer", value: "Developer" },
    { label: "QA", value: "QA" },
    { label: "Designer", value: "Designer" },
    { label: "BizDev", value: "BizDev" }
  ];
  
  // Use effect hook to fetch initial team member data from backend API
  useEffect(() => {
    (async () => await Load())();
  }, []);

  // Function to fetch team member data from backend API
  async function Load() {
    const result = await axios.get(
      "https://backend220230317110502.azurewebsites.net/api/Member/GetMember"
    );
    setUsers(result.data);
    console.log(result.data);
  }

  // Function to handle form submission for registering new team member
  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("https://backend220230317110502.azurewebsites.net/api/Member/AddMember", {
        mname: mname,
        role: role,
        tstack: tstack,
        blockers: blockers,
      });
      //Alert if completed
      alert("Team Member Registered Successfully");
      setId("");
      setName("");
      setRole("");
      setTstack("");
      setComments("");

      Load();
    } catch (err) {
      console.log("404 finder", err.response)
      alert(err);
    }
  }

  //Function to edit existing team member data
  async function editMember(members) {
    setId(members.id);
    setName(members.mname);
    setRole(members.role);
    setTstack(members.tstack);
    setComments(members.blockers);
  }

  //Function to delete member, takes id as parameter
  async function DeleteMember(id) {
     // Send a delete request to the backend API using the axios library
    await axios.delete(
      //deletes member using 'id' as identifier/key
      "https://backend220230317110502.azurewebsites.net/api/Member/DeleteMember/" + id
    );
    alert("Member deleted Successfully");
    setId("");
    setName("");
    setRole("");
    setTstack("");
    setComments("");
    Load();
  }

  //Function to update member
  // Define an asynchronous function called "update" that takes an "event" parameter
async function update(event) {
  // Prevent the default behavior of the form submission
  event.preventDefault();
  
  try {
    // Send a PATCH request to the backend API using the axios library
    await axios.patch(
      // Construct the API endpoint URL by finding the member with the matching ID in the "members" array
      // and appending the member ID to the base URL. If no matching member is found, use the value of "id".
      "https://backend220230317110502.azurewebsites.net/api/Member/UpdateMember/" + 
        members.find((u) => u.id === id).id || id,
      {
        // Pass the updated member information as the payload of the request
        id: id,
        mname: mname,
        role: role,
        tstack: tstack,
        blockers: blockers,
      }
    );
    
    // If the request is successful, show an alert to the user indicating that the registration has been updated
    alert("Registration Updated Successfully");
    
    // Reset the values of the input fields to their initial state
    setId("");
    setName("");
    setRole("");
    setTstack("");
    setComments("");

    // Reload the updated member list from the backend API
    Load();
  } catch (err) {
    // If the request fails, show an error message to the user via an alert
    alert(err);
  }
}

  
  return (
    //Styling for box background
    <div 
      className="shadow p-4 my-5 bg-white rounded mx-auto position-relative"
      style={{ maxWidth: 1000, maxHeight: 800 }}
    >
      <div className="row">
        <div className="col-md-6">
        <div class="form-group">
            <div>

              <input //Styling for input 
                type="text"
                class="form-control"
                id="id"
                hidden
                value={id}
                //onChange function that sets Id 
                onChange={(event) => {
                  setId(event.target.value);
                }}
              />

              <label>Name</label>

              <input
                type="text"
                class="form-control"
                id="name"
                value={mname}
                //onChange to set state of Name var
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </div>
            <div>
              <label for="Role">Role</label>
              <select
                class="form-control"
                id="role"
                value={role}
                //onChange function to set state of Role var
                onChange={(event) => {
                  setRole(event.target.value);
                }}
              >
       {/*Maps through options variables for dropdown menu for role */}         
      {options1.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}            
              </select>
  
              <div class="col-sm-4">
                <label for="tech-stack">TechStack</label>
              </div>

              <select
                class="form-control"
                id="tech-stack"
                value={tstack}
                //onChange to set state of techstack var
                onChange={(event) => {
                  setTstack(event.target.value);
                }}
              >
      {/*Maps through options variables for dropdown menu for tech-stack */}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
              
              <div class="col-sm-4">
                <label>Comments</label>
              </div>
              <input
                type="text"
                class="form-control"
                id="course"
                value={blockers}
                //onChange to set state of blockers var
                onChange={(event) => {
                  setComments(event.target.value);
                }}
              />
              {/*Button styling*/}
            </div>
            <div>
              
              <button id="Register" class="btn btn-primary mt-4" style={{marginRight:"23px"}} onClick={save}>
                Register
              </button>
              <button id="Update" class="btn btn-warning mt-4" onClick={update}>
                Update
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <img
           src="https://www.pcagroup.co/uploads/1/4/2/4/142408771/pca-artboard-12_orig.png"
           alt="example image"
           className="position-absolute top-0 end-0"
           style={{ maxWidth: "35%", marginRight:"80px" }}
          />
        </div>
      </div>

      {/* Table styling and logic */}
      <div className="row">
        <div className="col-md-12">
        <table class="table table-borderless table-hover" style={{marginTop:"20px", marginBottom:"20px"}} >
          <thead class="thead-dark" style={{background: "black"}}>
            <tr class="titel" style={{color:"white"}}>
              <th scope="col">ID</th>
              <th id = "n4me" scope="col">Name</th>
              <th scope="col">Role</th>
              <th scope="col">Tech-Stack</th>
              <th scope="col">Comments/Blockers</th>

              <th scope="col">Actions</th>
            </tr>
          </thead>
          {/* Render a table body that displays information about each member in the "members" array */}
          {members.map(function fn(member) {
            return (
              <tbody>
                <tr>
                  {/* Render the ID of the member in the first column */}
                  <th scope="row">{member.id}</th>
                  
                  {/* Render the name of the member in the second column */}
                  <td>{member.mname}</td>
                  
                  {/* Render the role of the member in the third column */}
                  <td>{member.role}</td>
                  
                  {/* Render the technology stack of the member in the fourth column */}
                  <td>{member.tstack}</td>
                  
                  {/* Render the blockers of the member in the fifth column */}
                  <td>{member.blockers}</td>

                  {/* Render a button in the sixth column that allows the user to edit the member's information */}

                  <td>
                    <FaPen style={{marginRight:"24px", color:"green"}}
                      id="Edit"
                      type="button1"
                      class="bi bi-pen"
                      onClick={() => editMember(member)}
                    >
                      Edit
                    </FaPen>
                    <FaTrash style={{color:"red"}}
                      id="Delete"
                      type="button2"
                      class="bi bi-trash"
                      onClick={() => DeleteMember(member.id)}
                    >
                      Delete
                    </FaTrash>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
        </div>
      </div>
    </div>
  );
}

export default Tms;
