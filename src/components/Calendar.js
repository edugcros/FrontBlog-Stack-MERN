import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import moment from 'moment';
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import EventoModal from './EventoModal';
import axios from 'axios'


export default function Calendar() {

  const [modalOpen, setModalOpen] = useState(false)
  const [events, setEvents] = useState([])
  const calendarRef = useRef(null)

  const onEventAdd = event => {
    let calendarApi = calendarRef.current.getApi()
    calendarApi.addEvent({
      start: moment(event.start).toDate(),
      end: moment(event.end).toDate(),
      title: event.title,
    })
  }

  async function handleEventAdd(data) {
    await axios.post('http://localhost:4000/api/calendar', data.event)
  }

  async function handleDatesSet(id) {
    const response = await axios.get('http://localhost:4000/api/calendar', id)
    setEvents(response.data)
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                <Link to="/create" className="nav-link">Create Note</Link>
              </li>
              <li className="nav-item active">
                <Link to="/user" className="nav-link">Users</Link>
              </li>
              <li className="nav-item active">
                <Link to="/calendar" className="nav-link">Eventos</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="d-grid gap-2  mx-auto">
        <button className="btn btn-primary " onClick={() => setModalOpen(true)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar3 mx-2" viewBox="0 2 16 16">
          <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
          <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
        </svg>Evento</button>
      </div>
      <section className=" bg-light">

        <div style={{ position: "relative", zIndex: 0 }}>
          <FullCalendar
            ref={calendarRef}
            events={events}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            eventAdd={event => handleEventAdd(event)}
            datesSet={(date) => handleDatesSet(date)}
          />
        </div>
        <EventoModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onEventAdd={event => onEventAdd(event)} />
      </section>
    </>
  )
}
