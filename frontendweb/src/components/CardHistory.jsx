import React, { useEffect, useState } from "react";
import "../CSS/PlayerCard.css";
import axios from "axios";

const CardHistory = ({ ID_JOGADORES, onSelectRelatorio }) => {
  const [historyCards, setHistoryCards] = useState([]);
  const [startIndex, setStartIndex] = useState(0); // Estado para controlar o índice inicial dos cards exibidos

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

  // Função para navegar para a esquerda
  const handlePrev = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 3, 0));
  };

  // Função para navegar para a direita
  const handleNext = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + 3, historyCards.length - 3));
  };

  // Filtra os cards para exibir apenas 3 por vez
  const visibleCards = historyCards.slice(startIndex, startIndex + 3);

  return (
    <div className="report-section">
      <h2>RELATÓRIOS PENDENTES</h2>

      <div className="player-cards-navigation">
        <button className="arrow-button" onClick={handlePrev} disabled={startIndex === 0}>
          &#9664; {/* Seta para a esquerda */}
        </button>

        <div className="player-cards-container">
          {visibleCards.length > 0 ? (
            visibleCards.map((report) => (
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

        <button
          className="arrow-button"
          onClick={handleNext}
          disabled={startIndex >= historyCards.length - 3}
        >
          &#9654; {/* Seta para a direita */}
        </button>
      </div>
    </div>
  );
};

export default CardHistory;