import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaPlus, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';

const EventosList = ({ setSelectedEvento }) => {
  const [eventos, setEventos] = useState([]);
  const [erro, setErro] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEventos, setSelectedEventos] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/evento/list");
        setEventos(response.data);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
        setErro("Erro ao buscar eventos");
      }
    };

    fetchEventos();
  }, []);

  return (
    <div className="left-menu">
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Pesquisar evento"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-btn">Pesquisar</button>
      </div>

      <div className="toolbar">
        <FaTrash className="icon trash" />
        {showCheckboxes && <FaTimes className="icon cancel" />}
        <FaPlus className="icon add" onClick={() => navigate('/evento/add')} />
      </div>

      <div className="eventos-header">
        <span>Jogo</span>
        <span>Scouter</span>
        <span>Data</span>
        <span>Hora</span>
        <span>Local</span>
      </div>
      <ul className="eventos-items">
        {erro ? (
          <p className="error-message">Erro: {erro}</p>
        ) : (
          eventos.map((evento, index) => (
            <li key={index} className="evento-item">
              <span>{evento.EQUIPA_CASA} vs {evento.VISITANTE}</span>
              <span>{evento.NOME_USER || "Sem Scout Associado"}</span>
              <span>{evento.DATA}</span>
              <span>{evento.HORA}</span>
              <span>{evento.LOCAL}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default EventosList;

