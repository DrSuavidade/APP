import React, { useEffect, useState } from "react";
import "../CSS/PlayerCard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlayerCard = ({ onSelectRelatorio }) => {
  const [playerCards, setPlayerCards] = useState([]);
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

  return (
    <div className="player-cards-container">
      {playerCards.length > 0 ? (
        playerCards.map((report) => (
          <div 
            key={report.ID_RELATORIO} 
            className="player-card" 
            onClick={() => handleCardClick(report.ID_RELATORIO)} 
            style={{ cursor: "pointer" }}
          >
            <div className="status-dot" data-tooltip={report.STATUS || "Sem status"}></div>
            <div className="profile-icon">👤</div>
            <h3 className="player-name">{report.JOGADOR_NOME || "Nome não disponível"}</h3>
            <p className="player-age">
              {report.DATA_NASC ? `${new Date().getFullYear() - new Date(report.DATA_NASC).getFullYear()} anos` : "Idade não informada"}{" "}
              {report.DATA_NASC ? new Date(report.DATA_NASC).getFullYear() : ""}
            </p>
            <p className="team-name">
              {report.ABREVIATURA_CLUBE} - {report.NOME_EQUIPA}
            </p>

            {/* Exibição da NOTA no círculo */}
            <div 
              className="nota-circle"
              style={{ backgroundColor: getNotaColor(report.NOTA) }}
            >
              {report.NOTA}/4
            </div>
          </div>
        ))
      ) : (
        <p>Carregando ou nenhum relatório encontrado.</p>
      )}
    </div>
  );
};

export default PlayerCard;