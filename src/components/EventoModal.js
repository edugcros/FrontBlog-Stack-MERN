import React, { useState } from 'react'
import Modal from 'react-modal'
import DateTimePicker from 'react-datetime-picker';

export default function EventoModal({ isOpen, onClose, onEventAdd }) {

    const [title, setTitle] = useState( "" );
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());

    const onSubmit = (event) => {
        event.preventDefault();
        onEventAdd({
            title,
            start,
            end,
        });
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <form onSubmit={onSubmit}>
                <input placeholder="Evento" value={title} onChange={e => setTitle(e.target.value)} />

                <div>
                    <label>Inicio</label><br/>
                    <DateTimePicker value={start} onChange={date => setStart(date)} />
                </div>
                <div>
                    <label>Finalizado</label><br/>
                    <DateTimePicker value={end} onChange={date => setEnd(date)} />
                </div>
                <button className="btn btn-primary mt-2">Añadir</button>
            </form>
        </Modal>
    )
}
