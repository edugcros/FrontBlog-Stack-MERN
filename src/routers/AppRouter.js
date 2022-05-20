import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes, Navigate } from "react-router-dom";

import NotesList from '../components/NotesList'
import Register from '../components/Register/Register'

import '../App.css';
import User from '../components/User';
import Login from '../components/Login';
import CreateNote from '../components/CreateNote';
import Content from '../components/Content';
import Calendar from '../components/Calendar';
import Chequed from '../components/Chequed';



function AppRouter() {
  const user = localStorage.getItem('token');

  return (
    <Routes>
      {user && <Route path="/" exact element={<NotesList />} />}
      {user && <Route path="/create" exact element={<CreateNote />} />}
      {user && <Route path="/user" exact element={<User />} />}
      {user && <Route path="/content/:id" exact element={<Content />} />}
      {user && <Route path="/edit/:id" exact element={<CreateNote />} />}
      {user && <Route path="/calendar" exact element={<Calendar />} />}
      <Route path="/login" exact element={<Login />} />
      <Route path="/register" exact element={<Register />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/create" element={<Navigate replace to="/login" />} />
      <Route path="/user" element={<Navigate replace to="/login" />} />
      <Route path="/calendar" element={<Navigate replace to="/login" />} />
      <Route path="/content/:id" element={<Navigate replace to="/login" />} />
      <Route path="/edit/:id" exact element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default AppRouter;