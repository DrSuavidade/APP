import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/eventsviewpage.css";

const DadosEvents = () => {
  const [eventos, setEventos] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await axios.get("https://backendscout-cx6c.onrender.com/api/evento/list");
        setEventos(response.data);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
        setErro("Erro ao buscar eventos");
      }
    };

    fetchEventos();
  }, []);

  return (
    <section className="events-container">
      <div className="events-list">
        {erro ? (
          <p className="error-message">{erro}</p>
        ) : (
          eventos.map((evento, index) => (
            <div key={index} className="event">
              <p><strong>Jogo:</strong> {evento.EQUIPA_CASA} vs {evento.VISITANTE}</p>
              <p><strong>Scouter:</strong> {evento.NOME_USER || "Sem Scout Associado"}</p>
              <p><strong>Data:</strong> {evento.DATA}</p>
              <p><strong>Hora:</strong> {evento.HORA}</p>
              <p><strong>Local:</strong> {evento.LOCAL}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default DadosEvents;
