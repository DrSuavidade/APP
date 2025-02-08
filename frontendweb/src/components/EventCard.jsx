import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/EventCard.css";
import { FaMapMarkerAlt } from "react-icons/fa";

const EventCard = ({ eventId }) => {
  const [evento, setEvento] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const response = await axios.get(`https://backendscout-cx6c.onrender.com/api/evento/list`);
        const eventoFiltrado = response.data.find(e => e.ID_EVENTOS.toString() === eventId);
        setEvento(eventoFiltrado);
      } catch (error) {
        console.error("Erro ao buscar evento:", error);
        setErro("Erro ao buscar evento");
      }
    };

    fetchEvento();
  }, [eventId]);

  if (erro) return <p className="error-message">Erro: {erro}</p>;
  if (!evento) return <p className="no-events">Nenhum evento encontrado com ID {eventId}</p>;

  return (
    <div className="event-card-container">
      <div className="event-card">
        <p className="event-date">{new Date(evento.DATA).toLocaleDateString("pt-PT")}</p>
        <div className="event-teams">
          <span className="team-name">{evento.EQUIPA_CASA}</span>
          <span className="event-time">{evento.HORA}</span>
          <span className="team-name">{evento.VISITANTE}</span>
        </div>
        <div className="event-location">
          <FaMapMarkerAlt className="location-icon" />
          <span>{evento.LOCAL}</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
