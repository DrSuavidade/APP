import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/ListRelatorios.css'; // Reutilizando o CSS existente
import Cookies from 'js-cookie';
import { FaMapMarkerAlt } from "react-icons/fa";

const RecentEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const [userType, setUserType] = useState(null); // Adicionado estado para armazenar ID_TIPO

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

    const ID_TIPO = Cookies.get("ID_TIPO");
    setUserType(ID_TIPO);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR'); // Formato dd/mm/yyyy
  };

  return (
    <div className="recent-events-container">
      <div className="events-list">
        {events.map((event, index) => (
          <div className="event-info" key={index}>
            <div className="event-scout">{event.NOME_USER || "Sem Scout Associado"}</div>
            <div className="event-teams">{event.EQUIPA_CASA} <div className="event-date-time">{formatDate(event.DATA)} {event.HORA}</div> {event.VISITANTE}</div>
            <div className="event-location">
             <FaMapMarkerAlt className="location-icon" />
              {event.LOCAL}</div>
          </div>
        ))}
      </div>
      {userType !== "1" && (
        <button
          className="add-event-btn"
          onClick={() => navigate('/events/new')}
        >
          Adicionar Evento
        </button>
      )}
    </div>
  );
};

export default RecentEvents;
