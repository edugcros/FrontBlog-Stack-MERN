import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Navigation from './Navigation'
import { useParams } from 'react-router-dom'


export default function CreateNote() {

  const { id } = useParams()
  const [users, setUsers] = useState([])
  const [data, setData] = useState({
    title: '',
    content: '',
    author: '',
    cod: '',
    client: '',
    description: '',
    condition: '',
    date: new Date(),
  })


  const get = async () => {
    const res = await axios.get('http://localhost:4000/api/users');
    if (res.data.length > 0) {
      setUsers(res.data.map(user => user.username))
    }
    if (id) {
      const res = await axios.get('http://localhost:4000/api/notes/' + id);
      console.log(res.data)
      setData({
        title: res.data.title,
        content: res.data.content,
        date: new Date(res.data.date),
        author: res.data.author,
        client: res.data.client,
        cod: res.data.cod,
        description: res.data.description,
        condition: res.data.condition,
        _id: res.data._id,
      });
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      const updateNote = {
        title: data.title,
        content: data.content,
        author: data.author,
        date: data.date,
        cod: data.cod,
        client: data.client,
        condition: data.condition,
        description: data.description,
      }
      const res = await axios.put('http://localhost:4000/api/notes/' + id, updateNote);
      console.log(res)
    }
    else {
      const newNote = {
        title: data.title,
        content: data.content,
        author: data.author,
        date: data.date,
        cod: data.cod,
        client: data.client,
        description: data.description,
        condition: data.condition,
      };
      const res = axios.post('http://localhost:4000/api/notes', newNote);
      console.log(res)
    }
    window.location.href = '/';
  }

  useEffect(() => {
    get();
  }, [])



  return (
    <>
      <Navigation className="navbar navbar-expand-lg navbar-light bg-light" />
      <div className="col-md-6 offset-md-3 mt-5" >
        <div className="card card-body">
          <h4>Crear Documento</h4>
          <form onSubmit={handleSubmit}>
            {/* SELECT THE USER */}
            <div className="form-group">
              <select
                className="form-control"
                name="author"
                value={data.author}
                onChange={handleChange}
                required>
                <option value="">Seleccione Author</option>
                {
                  users.map(user => (
                    <option key={user} value={user}>
                      {user}
                    </option>
                  ))
                }
              </select>
            </div>
            {/*Estado*/}
            <div className="form-group apr">
              <label>Estado</label>
              <select
                className="form-control ml-4"
                name="condition"
                value={data.condition}
                onChange={handleChange}
                required >
                <option value="">Selecione el Estado</option>
                <option value="Revisión">Revisión</option>
                <option value="Aprobado">Aprobado</option>
              </select>
              <button className="btn btn-outline-dark ml-5 ">
                Save 
              </button>
            </div>
            {/* Note Title */}
            <div className="form-group">
              <label>Titulo</label>
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Titulo"
                onChange={handleChange}
                name="title"
                value={data.title}
                required />
            </div>
            <div className="form-group">
              {/* Note Cod */}
              <label>Cod.Expte</label>
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Cod.Expte."
                onChange={handleChange}
                name="cod"
                value={data.cod}
                required />
            </div>
            <div className="form-group">
              {/* Note Description */}
              <label>Descripcion</label>
              <input
                type="text"
                className="form-control mt-2"
                placeholder="A. Descripcion"
                onChange={handleChange}
                name="description"
                value={data.description}
                required />
            </div>
            <div className="form-group">
              {/* Note Client */}
              <label>Cliente</label>
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Cliente"
                onChange={handleChange}
                name="client"
                value={data.client}
                required />
            </div>
            {/* Note Content */}
            <div className="form-group">
              <label>Contenido</label>
              <textarea
                type="text"
                className="form-control mt-2"
                placeholder="Content"
                name="content"
                onChange={handleChange}
                value={data.content}
                required>
              </textarea>
            </div>
            <button className="btn btn-primary mt-2">
              Save <i className="material-icons">
                assignment
              </i>
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
