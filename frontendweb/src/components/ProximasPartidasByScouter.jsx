import React, { useEffect, useState } from "react";
import api from "../api/axios";
import "../CSS/ProximasPartidasByScouter.css";

const ProximasPartidasByScouter = ({ ID_USER }) => {
  const [partidas, setPartidas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ID_USER) return; // Evita chamadas desnecessárias à API

    const fetchPartidas = async () => {
      try {
        const response = await api.get(`/evento/list`); // Chamada para listEvento
        const todasPartidas = response.data;

        // Filtrar apenas as partidas do ID_USER selecionado
        const partidasFiltradas = todasPartidas.filter(
          (partida) => partida.ID_USER === ID_USER
        );

        setPartidas(partidasFiltradas);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar partidas:", err);
        setError(err.response?.data?.message || "Erro ao carregar os dados.");
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
              <p className="data-hora">
                {formatDate(partida.DATA, partida.HORA)}
              </p>
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
