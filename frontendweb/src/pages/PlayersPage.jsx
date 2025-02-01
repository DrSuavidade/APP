import React, { useState } from "react";
import CardPlayersPendents from "../components/CardPlayersPendents";
import ListPlayers from "../components/ListPlayers";
import FichaPlayer from "../components/FichaPlayer";


const PlayersPage = () => {
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [playersLoaded, setPlayersLoaded] = useState(false); // Novo estado para controlar se os jogadores foram carregados

  // Define o primeiro jogador da lista como padrão ao carregar a página
  const handlePlayersLoaded = (players) => {
    if (!playersLoaded && players.length > 0) { // Só define o primeiro jogador na primeira carga
      setSelectedPlayerId(players[0].ID_JOGADORES);
      setPlayersLoaded(true); // Marca que os jogadores foram carregados
    }
  };

  return (
    <div className="players-page-container">
      <h1>Jogadores Pendentes</h1>
      <CardPlayersPendents setSelectedPlayerId={setSelectedPlayerId} />
      <ListPlayers onSelectPlayer={setSelectedPlayerId} onPlayersLoaded={handlePlayersLoaded} />
      <FichaPlayer ID_JOGADORES={selectedPlayerId} />
    </div>
  );
};

export default PlayersPage;