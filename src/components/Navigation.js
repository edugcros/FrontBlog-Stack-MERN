import React from 'react'
import { Link } from 'react-router-dom'
import "../App.css"

export default function Navigation() {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light nav">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <i className="material-icons">
            assignment </i> Blogbook
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item active">
              <Link to="/create" className="nav-link">Crear Documento</Link>
            </li>
            <li className="nav-item active">
              <Link to="/calendar" className="nav-link">Eventos</Link>
            </li>
            <li className="nav-item active">
              <Link to="/user" className="nav-link">Bufete</Link>
            </li>
          </ul>
        </div>
        <div className="d-flex navbar-right mr-5 ">
          <button type="button" className="btn btn-danger" onClick={handleLogout}>
            <strong>Logout</strong>
          </button>
        </div>
      </div>
    </nav>
  )
}