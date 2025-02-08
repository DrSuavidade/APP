import React, { useEffect, useState } from "react";
import "../CSS/PlayerCard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import profileImage from "../img/v219_657.png";

const PlayerCard = ({ onSelectRelatorio }) => {
  const [playerCards, setPlayerCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Estado para controlar a página atual
  const cardsPerPage = 3; // Número de cartões por página
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayerCards = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/player-cards");
        console.log("📌 Dados recebidos do backend:", response.data);
        setPlayerCards(response.data);
      } catch (error) {
        console.error("❌ Erro ao buscar dados do PlayerCard:", error);
      }
    };

    fetchPlayerCards();
  }, []);

  const getNotaColor = (nota) => {
    return nota <= 2 ? "orange" : "green";
  };

  const handleCardClick = (idRelatorio) => {
    try {
      if (onSelectRelatorio) {
        onSelectRelatorio(idRelatorio);
      } else {
        throw new Error("onSelectRelatorio não está definido");
      }
    } catch (error) {
      console.error("❌ Erro ao selecionar relatório:", error);
      navigate("/reports");
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const startIndex = currentPage * cardsPerPage;
  const visibleCards = playerCards.slice(startIndex, startIndex + cardsPerPage);

  return (
    <div className="player-cards-navigation">
      {currentPage > 0 && (
        <button className="arrow-button" onClick={handlePrevPage}>
          &#9664;
        </button>
      )}
      <div className="player-cards-container">
        {visibleCards.map((report) => (
          <div
            key={report.ID_RELATORIO}
            className="player-card-new"
            onClick={() => handleCardClick(report.ID_RELATORIO)}
            style={{ cursor: "pointer" }}
          >
            <div className="profile-icon">
             <img src={profileImage} alt="Player Profile" style={{ width: "100%", height: "100%", borderRadius: "50%" }} />
            </div>

            <div className="player-info">
              <h3 className="player-name">{report.JOGADOR_NOME || "Nome não disponível"}</h3>
              <p className="player-age-year">
                {report.DATA_NASC ? `${new Date().getFullYear() - new Date(report.DATA_NASC).getFullYear()} anos` : "Idade não informada"}{" "}
                {report.DATA_NASC ? new Date(report.DATA_NASC).getFullYear() : ""}
              </p>
              <p className="player-nationality">{report.NACIONALIDADE || "Nacionalidade não informada"}</p>
              <p className="player-team">
                {report.ABREVIATURA_CLUBE} - {report.NOME_EQUIPA}
              </p>
            </div>

            <div className="status-dot" data-tooltip={report.STATUS || "Sem status"}></div>

            <div className="nota-circle2" style={{ backgroundColor: getNotaColor(report.NOTA) }}>
              {report.NOTA}/4
            </div>
          </div>
        ))}
      </div>
      {startIndex + cardsPerPage < playerCards.length && (
        <button className="arrow-button" onClick={handleNextPage}>
          &#9654;
        </button>
      )}
    </div>
  );
};

export default PlayerCard;
