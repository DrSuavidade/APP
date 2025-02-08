import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../CSS/eventsviewpage.css"; // Importa o CSS específico
import { FaMapMarkerAlt } from "react-icons/fa";


const ProximasPartidas = () => {
  const [escaloes] = useState([
    'Sub-10', 'Sub-11', 'Sub-12', 'Sub-13', 'Sub-14', 'Sub-15', 'Sub-16', 'Sub-23', 'Profissional'
  ]);
  const [escalaoSelecionado, setEscalaoSelecionado] = useState('Profissional');
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProximasPartidas = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/eventos/escalao/${escalaoSelecionado}`);
        if (response.status === 200 && response.data.length > 0) {
          setEventos(response.data);
        } else {
          setEventos([]); // Se não houver eventos, definir como lista vazia
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setEventos([]); // Se for erro 404, definir como lista vazia
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProximasPartidas();
  }, [escalaoSelecionado]);

  const handleEscalaoChange = (escalao) => {
    setEscalaoSelecionado(escalao);
  };

  return (
    <div className="eventos-escalao-container">
      <h2 className="eventos-escalao-title">PRÓXIMAS PARTIDAS</h2>
      <div className="eventos-escalao-list-escaloes">
        {escaloes.map((escalao) => (
          <button
            key={escalao}
            className={`eventos-escalao-escalao-btn ${escalao === escalaoSelecionado ? 'active' : ''}`}
            onClick={() => handleEscalaoChange(escalao)}
          >
            {escalao}
          </button>
        ))}
      </div>

      <div className="eventos-escalao-list-eventos">
        {loading ? (
          <div className="eventos-escalao-loading">Carregando...</div>
        ) : error ? (
          <div className="eventos-escalao-error">Erro: {error}</div>
        ) : eventos.length === 0 ? (
          <div className="eventos-escalao-empty">Nenhum evento encontrado</div>
        ) : (
          eventos.map((evento) => (
            <div key={evento.ID_EVENTOS} className="eventos-escalao-item">
              <div className="eventos-escalao-info">
                <span className="eventos-escalao-equipa">{evento.EQUIPA_CASA}</span>
                <span className="eventos-escalao-vs">vs</span>
                <span className="eventos-escalao-equipa">{evento.VISITANTE}</span>
              </div>
              <div className="eventos-escalao-details">
                <span className="eventos-escalao-data">{evento.DATA}</span>
                <span className="eventos-escalao-hora">{evento.HORA}</span>
                <span className="eventos-escalao-local">
                  <FaMapMarkerAlt className="location-icon" /> {evento.LOCAL}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProximasPartidas;