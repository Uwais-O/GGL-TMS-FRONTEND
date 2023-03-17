//Navbar component
import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";

function Nav() {
  return (
    <nav className="navbar">
      <h1 style={{marginLeft:"50px"}}>Team Management System</h1>
      <img
        src="https://www.gamesglobal.com/images/gg-logo.png?w=640&q=75"
        alt="Logo"
        width="200px"
        style={{marginRight:"50px"}}
      />
    </nav>
  );
}

export default Nav;