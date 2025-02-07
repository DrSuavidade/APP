import React, { useEffect, useState } from "react";
import "../CSS/PlayerCard.css";
import axios from "axios";

const CardHistory = ({ ID_JOGADORES, onSelectRelatorio }) => {
  const [historyCards, setHistoryCards] = useState([]);

  useEffect(() => {
    if (!ID_JOGADORES) return; // Evita requisições desnecessárias

    const fetchHistoryCards = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/player/history/${ID_JOGADORES}`);
        console.log("📌 Dados recebidos do backend (CardHistory):", response.data);
        setHistoryCards(response.data);
      } catch (error) {
        console.error("❌ Erro ao buscar dados do CardHistory:", error);
      }
    };

    fetchHistoryCards();
  }, [ID_JOGADORES]);

  // Função para definir a cor do círculo com base na nota
  const getNotaColor = (nota) => {
    return nota >= 3 ? "#28a745" : "#fd7e14"; // Verde para 3 ou 4, Laranja para 2 ou menos
  };

  return (
    <div className="report-section">
      <h2>RELATÓRIOS PENDENTES</h2>

      {historyCards.length > 0 ? (
        historyCards.map((report) => (
          <div 
            key={report.ID_RELATORIO} 
            className="player-card" 
            onClick={() => onSelectRelatorio(report.ID_RELATORIO)} 
            style={{ cursor: "pointer" }}
          >
            <div className="status-dot" data-tooltip={report.STATUS || "Sem status"}></div>
            <div className="profile-icon">📄</div>
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
        <p>Carregando ou nenhum relatório pendente encontrado.</p>
      )}
    </div>
  );
};

export default CardHistory;
