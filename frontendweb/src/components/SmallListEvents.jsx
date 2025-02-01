import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/ListRelatorios.css'; // Reutilizando o CSS existente

const RecentEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/eventos/recentes');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Erro ao buscar eventos recentes:', error);
      }
    };

    fetchRecentEvents();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR'); // Formato dd/mm/yyyy
  };

  return (
    <div className="recent-events-container">
      <h2>Eventos Recentes</h2>
      <div className="events-list">
        {events.map((event, index) => (
          <div className="event-info" key={index}>
            <div className="event-scout">{event.NOME_USER || "Sem Scout Associado"}</div>
            <div className="event-date-time">{formatDate(event.DATA)} {event.HORA}</div>
            <div className="event-teams">{event.EQUIPA_CASA} vs {event.VISITANTE}</div>
            <div className="event-location">{event.LOCAL}</div>
          </div>
        ))}
      </div>
      <button
        className="add-event-btn"
        onClick={() => navigate('/events/new')}
      >
        Adicionar Evento
      </button>
    </div>
  );
};

export default RecentEvents;