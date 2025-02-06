import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ListaEventos2 = () => {
  const [eventos, setEventos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/eventos/recentes");
        setEventos(response.data);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    };

    fetchEventos();
  }, []);

  const selecionarEvento = (eventoId) => {
    localStorage.setItem("selectedEvent", eventoId); // Salva o ID do evento selecionado
    window.dispatchEvent(new Event("storage")); // Força a atualização da página
  };

  return (
    <div className="lista-eventos-container">
      <div className="lista-eventos-toolbar">
        <input
          type="text"
          placeholder="Pesquisar evento"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="lista-eventos-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Jogo</th>
            <th>Scouter</th>
            <th>Data</th>
            <th>Hora</th>
            <th>Local</th>
          </tr>
        </thead>
        <tbody>
          {eventos
            .filter((e) =>
              `${e.EQUIPA_CASA} vs ${e.VISITANTE}`.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((evento) => (
              <tr key={evento.ID_EVENTOS} onClick={() => selecionarEvento(evento.ID_EVENTOS)}>
                <td>{evento.ID_EVENTOS}</td>
                <td>{evento.EQUIPA_CASA} vs {evento.VISITANTE}</td>
                <td>{evento.NOME_USER || "Sem Scout Associado"}</td>
                <td>{new Date(evento.DATA).toLocaleDateString("pt-PT")}</td>
                <td>{evento.HORA}</td>
                <td>{evento.LOCAL}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaEventos2;
