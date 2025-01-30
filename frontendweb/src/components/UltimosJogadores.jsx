import React, { useEffect, useState } from "react";
import api from "../api/axios";
import "../CSS/UltimosJogadores.css";


function UltimosJogadores() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await api.get("/jogador/lastTen");
        setPlayers(response.data);
      } catch (error) {
        console.error("Erro ao carregar os jogadores:", error);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div className="history-container">
      <h3>Últimos Jogadores Adicionados</h3>
      <div className="history-list">
        {players.length > 0 ? (
          players.map((player, index) => (
            <div key={index} className="player-item">
              <span className="player-name">{player.NOME}</span>
              <span className="player-rating">
                {player.NOTA_ADM !== undefined && player.NOTA_ADM !== null
                  ? player.NOTA_ADM
                  : "N/A"}
              </span>
            </div>
          ))
        ) : (
          <p>Nenhum jogador adicionado ainda.</p>
        )}
      </div>
    </div>
  );
}

export default UltimosJogadores;
