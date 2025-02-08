import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/ProximasPartidasByScouter.css";
import { FaMapMarkerAlt } from "react-icons/fa";


const ProximasPartidasByScouter = ({ ID_USER }) => {
  const [partidas, setPartidas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ID_USER) return; // Evita chamadas desnecessárias à API

    const fetchPartidas = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/evento/list/${ID_USER}`); // Chama getGamesByUser
        setPartidas(response.data);
      } catch (err) {
        console.error("Erro ao buscar partidas:", err);
        setError("Erro ao carregar os dados.");
      } finally {
        setLoading(false);
      }
    };

    fetchPartidas();
  }, [ID_USER]); // Atualiza sempre que `ID_USER` mudar

  const formatDate = (dateString, timeString) => {
    if (!dateString || !timeString) return "Data/hora não definida";
    const date = new Date(dateString);
    return `${date.toLocaleDateString("pt-PT")} ${timeString}`;
  };

  if (!ID_USER) return <p>Selecione um Scouter para ver as partidas.</p>;
  if (loading) return <p>Carregando partidas...</p>;
  if (error) return <p>{error}</p>;

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
              <p className="local">
              <FaMapMarkerAlt className="location-icon" />
              {partida.LOCAL}
              </p>
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
