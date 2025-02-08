import React, { useEffect, useState } from "react";
import "../CSS/PlayerCard.css";
import axios from "axios";
import profileImage from "../img/v219_657.png";

const CardPlayersPendents = ({ setSelectedPlayerId }) => {
  const [players, setPlayers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 2;

  useEffect(() => {
    const fetchPendents = async () => {
      try {
        const response = await axios.get("https://backendscout-cx6c.onrender.com/api/player-pendents");
        console.log("📌 Dados recebidos dos jogadores inativos:", response.data);
        setPlayers(response.data);
      } catch (error) {
        console.error("❌ Erro ao buscar jogadores inativos:", error);
      }
    };

    fetchPendents();
  }, []);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(players.length / cardsPerPage) - 1));
  };

  const startIndex = currentPage * cardsPerPage;
  const visiblePlayers = players.slice(startIndex, startIndex + cardsPerPage);

  return (
    <div className="report-section">
      <h2>JOGADORES PENDENTES</h2>
      <div className="player-cards-navigation">
        {currentPage > 0 && (
          <button className="arrow-button previous" onClick={handlePrevPage}>
            &#9664; {/* Seta para a esquerda */}
          </button>
        )}
        <div className="player-cards-container">
          {visiblePlayers.length > 0 ? (
            visiblePlayers.map((player) => (
              <div
                key={player.ID_JOGADORES}
                className="player-card-new"
                onClick={() => setSelectedPlayerId(player.ID_JOGADORES)}
              >
            <div className="profile-icon">
             <img src={profileImage} alt="Player Profile" style={{ width: "100%", height: "100%", borderRadius: "50%" }} />
            </div>
                <div className="player-info">
                  <h3 className="player-name">{player.NOME || "Nome não disponível"}</h3>
                  <p className="player-age-year">{player.IDADE} anos • {player.ANO_NASCIMENTO}</p>
                  <p className="player-nationality">{player.NACIONALIDADE}</p>
                  <p className="player-team">{player.ABREVIATURA_CLUBE} - {player.NOME_EQUIPA}</p>
                </div>
                <div
                  className="status-dot"
                  data-tooltip={player.STATUS || "Sem status"}
                ></div>
              </div>
            ))
          ) : (
            <p>Nenhum jogador pendente encontrado.</p>
          )}
        </div>
        {startIndex + cardsPerPage < players.length && (
          <button className="arrow-button next" onClick={handleNextPage}>
            &#9654; {/* Seta para a direita */}
          </button>
        )}
      </div>
    </div>
  );
};

export default CardPlayersPendents;
