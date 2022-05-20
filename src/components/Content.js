import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Navigation from './Navigation'
import { useParams } from 'react-router-dom'

export default function Content() {

  const { id } = useParams()
  const [data, setData] = useState({
    title: '',
    content: '',
    author: '',
  })

  const get = async () => {
    if (id) {
      const res = await axios.get('http://localhost:4000/api/notes/' + id);
      console.log(res.data)
      setData({
        title: res.data.title,
        content: res.data.content,
        author: res.data.author,
        cod: res.data.cod,
        client: res.data.client,
        description: res.data.description,
      });
    }
  }

  useEffect(() => {
    get();
  }, [])


  return (
    <>
      <Navigation className="navbar navbar-expand-lg navbar-light bg-light" />
      <div className="container card card-c mt-5 ">
        <div className="card-body">
          <table class="table table-primary table-bordered ">
            <thead>
              <tr>
                <th scope="col">Cod.Expte</th>
                <th scope="col">A Descripcion</th>
                <th scope="col">Cliente</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> {data.cod} </td>
                <td> {data.description} </td>
                <td> {data.client} </td>
              </tr>
            </tbody>
          </table>

          <strong>
            <p className="pt-4">
              Contenido:<br />
              {data.content}
            </p>
          </strong>
        </div>
      </div>
    </>
  )
}
