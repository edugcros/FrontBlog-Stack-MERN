import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'
import Navigation from './Navigation';



export default function NotesList() {


  const [search, setSearch] = useState([]);
  const [note, setNote] = useState([]);
  const [busqueda, setBusqueda] = useState("");




  const get = async () => {
    await axios.get('http://localhost:4000/api/notes')
      .then(response => {
        setSearch(response.data);
        setNote(response.data);
      }).catch(error => {
        console.log(error);
      })
  }


  useEffect(() => {
    get();
  }, [])


  const handleChange = e => {
    setBusqueda(e.target.value);
    filter(e.target.value);
  }

  const filter = (busqueda) => {
    var search = note.filter((elemento) => {
      if (elemento.author.toString().toLowerCase().includes(busqueda.toLowerCase()) ||
        elemento.client.toString().toLowerCase().includes(busqueda.toLowerCase()) ||
        elemento.condition.toString().toLowerCase().includes(busqueda.toLowerCase())
      )
        return elemento;
    });
    setSearch(search);
  }

  const deleteNote = async (id) => {
    await axios.delete('http://localhost:4000/api/notes/' + id)
      .then(res => {
        console.log("delete", res)
      }).catch(error => {
        console.log(error);
      })
    return get();
  }



  return (
    <>
      <Navigation className="navbar navbar-expand-lg navbar-light bg-light" />
      <div className="containerInput container pt-4">
        <input
          className="form-control inputBuscar"
          value={busqueda}
          placeholder="Búsqueda por Author, Cliente o Estado"
          onChange={handleChange}
        />
      </div>
      <div className="container row mx-auto">
        {
          search.map((note) => (
            <div className=" card card-s col-4 mt-3 " key={note._id}>
              <div className="card-header rounded d-flex justify-content-between material-card">
                <Link to={"/content/" + note._id} className=" btn btn-outline-dark ">
                  <h6>Author: {note.author}</h6>
                </Link>
                <Link to={"/edit/" + note._id} className=" btn btn-outline-dark ">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                  </svg>
                </Link>
              </div>
              <div className="card-body card-b">
                <strong>
                  <h6>
                    Titulo: {note.title}
                  </h6>
                </strong>
                <strong>
                  <p>
                    Cliente: {(note.client)}
                  </p>
                </strong>
                <strong>
                  <p>
                    Estado: {(note.condition)}
                  </p>
                </strong>
                <p>
                  {format(note.date)}
                </p>
              </div>
              <div className="card-footer d-flex justify-content-between  rounded material-card">
                <button className="btn btn-danger" onClick={() => deleteNote(note._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}