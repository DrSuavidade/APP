import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/ListaJogadores.css"; 

const ListaJogadores = ({ onSelectionChange }) => {
  const [jogadores, setJogadores] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  useEffect(() => {
    const fetchJogadores = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/jogador/list");
        if (response.data && Array.isArray(response.data)) {
          setJogadores(response.data);
        }
      } catch (error) {
        console.error("Erro ao carregar jogadores:", error);
      }
    };

    fetchJogadores();
  }, []);

  const toggleSelection = (jogador) => {
    let updatedSelection;
    if (selectedPlayers.some((p) => p.ID_JOGADORES === jogador.ID_JOGADORES)) {
      updatedSelection = selectedPlayers.filter((p) => p.ID_JOGADORES !== jogador.ID_JOGADORES);
    } else {
      updatedSelection = [...selectedPlayers, jogador];
    }

    setSelectedPlayers(updatedSelection);
    onSelectionChange(updatedSelection); // Envia os jogadores selecionados para a página principal
  };

  return (
    <div className="jogadores-container">
      <div className="jogadores-grid">
        {jogadores.length > 0 ? (
          jogadores.map((jogador) => {
            const birthYear = jogador.DATA_NASC ? new Date(jogador.DATA_NASC).getFullYear() : "Desconhecido";
            const idade = new Date().getFullYear() - birthYear;

            return (
              <div
                key={jogador.ID_JOGADORES}
                className={`jogador-card ${selectedPlayers.some((p) => p.ID_JOGADORES === jogador.ID_JOGADORES) ? "selected" : ""}`}
                onClick={() => toggleSelection(jogador)}
              >
                <div className="jogador-avatar"></div>
                <div className="jogador-info">
                  <p className="nome">{jogador.NOME}</p>
                  <p>{idade} anos • {birthYear}</p>
                  <p className="equipa">AC Viseu Sub - 16</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray">Nenhum jogador encontrado.</p>
        )}
      </div>

      
    </div>
  );
};

export default ListaJogadores;
