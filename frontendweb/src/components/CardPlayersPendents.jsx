import React, { useEffect, useState } from "react";
import "../CSS/PlayerCard.css";
import axios from "axios";

const CardPlayersPendents = ({ setSelectedPlayerId }) => {
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
    <div key={player.ID_JOGADORES} className="player-card-new" onClick={() => setSelectedPlayerId(player.ID_JOGADORES)}>
      <div className="profile-icon">👤</div> {/* Ícone movido para a esquerda */}
      
      <div className="player-info"> {/* Agrupa as informações do jogador */}
        <h3 className="player-name">{player.NOME || "Nome não disponível"}</h3>
        <p className="player-age-year">{player.IDADE} anos • {player.ANO_NASCIMENTO}</p>
        <p className="player-nationality">{player.NACIONALIDADE}</p>
        <p className="player-team">{player.ABREVIATURA_CLUBE} - {player.NOME_EQUIPA}</p>
      </div>

      <div 
  className="status-dot" 
  data-tooltip={player.STATUS || "Sem status"}
></div>
 {/* Ponto de status mantido no canto superior direito */}
    </div>
  ))
) : (
  <p>Nenhum jogador pendente encontrado.</p>
)}
    </div>
  );
};

export default CardPlayersPendents;