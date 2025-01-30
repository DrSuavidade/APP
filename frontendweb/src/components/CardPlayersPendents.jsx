import React, { useEffect, useState } from "react";
import "../CSS/PlayerCard.css";
import axios from "axios";

const CardPlayersPendents = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPendents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/player-pendents");
        console.log("📌 Dados recebidos dos jogadores inativos:", response.data);
        setPlayers(response.data);
      } catch (error) {
        console.error("❌ Erro ao buscar jogadores inativos:", error);
      }
    };

    fetchPendents();
  }, []);

  return (
    <div className="report-section">
      <h2>JOGADORES PENDENTES</h2>

      {players.length > 0 ? (
        players.map((player) => (
          <div key={player.ID_JOGADORES} className="player-card">
            <div className="status-dot"></div>
            <div className="profile-icon">👤</div>
            <h3 className="player-name">{player.NOME || "Nome não disponível"}</h3>
            <p className="player-age">
              {player.IDADE} anos • {player.ANO_NASCIMENTO}
            </p>
            <p className="player-age">
              {player.NACIONALIDADE} 
            </p>
            <p className="team-name">
              {player.ABREVIATURA_CLUBE} - {player.NOME_EQUIPA}
            </p>
          </div>
        ))
      ) : (
        <p>Nenhum jogador pendente encontrado.</p>
      )}
    </div>
  );
};

export default CardPlayersPendents;
