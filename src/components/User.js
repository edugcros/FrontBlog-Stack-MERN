
import React, { Component } from 'react'
import axios from 'axios'
import Navigation from './Navigation';


export default class User extends Component {

  state = {
    username: '',
    users: []
  }

  async componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    const res = await axios.get('http://localhost:4000/api/users');
    this.setState({
      users: res.data
    }); console.log(res)
  }


  deleteUser = async (userId) => {
    const response = window.confirm('are you sure you want to delete it?');
    if (response) {
      await axios.delete('http://localhost:4000/api/users/' + userId);
      this.getUsers();
    } console.log(userId);
  }

  render() {
    return (
      <>
        <Navigation className="navbar navbar-expand-lg navbar-light bg-light" />
        <div className="row container mx-auto pt-4 ">
          <div className="col-md-12">
            <ul className="list-group">
              {
                this.state.users.map(user => (
                  <li className="list-group-item list-group-item-action mt-2 " key={user._id}>
                    <strong>{user.username}</strong>
                    <button type="button" className="btn btn-danger float-right " onClick={() => this.deleteUser(user._id)}
                    >Delete
                    </button>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </>
    )
  }
}


/*   this.state.users.map(user => (
    <li className="list-group-item list-group-item-action" key={user._id} onDoubleClick={() => this.deleteUser(user._id)}>
        {user.username}
    </li>*/
