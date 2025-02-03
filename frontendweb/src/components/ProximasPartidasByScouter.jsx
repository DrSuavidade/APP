import React, { useEffect, useState } from "react";
import api from "../api/axios"; // Instância axios para requisições à API
import "../CSS/ProximasPartidasByScouter.css"; // Estilos do componente

const ProximasPartidasByScouter = ({ ID_USER }) => {
  const [partidas, setPartidas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPartidas = async () => {
      try {
        const response = await api.get(`/evento/list/${ID_USER}`); // Usando o getGamesByUser
        setPartidas(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar partidas:", err);
        setError("Erro ao carregar os dados.");
        setLoading(false);
      }
    };

    fetchPartidas();
  }, [ID_USER]);

  const formatDate = (dateString, timeString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString("pt-PT")} ${timeString}`;
  };

  if (loading) {
    return <p>Carregando partidas...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="proximas-partidas-container">
      <h3>PRÓXIMAS PARTIDAS</h3>
      <div className="partidas-list">
        {partidas.length > 0 ? (
          partidas.map((partida) => (
            <div key={partida.ID_EVENTOS} className="partida-item">
              <p className="data-hora">{formatDate(partida.DATA, partida.HORA)}</p>
              <div className="equipes">
                <strong>{partida.EQUIPA_CASA}</strong>
                <span className="vs">VS</span>
                <strong>{partida.VISITANTE}</strong>
              </div>
              <p className="local">{partida.LOCAL}</p>
            </div>
          ))
        ) : (
          <p>Nenhuma partida encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default ProximasPartidasByScouter;
