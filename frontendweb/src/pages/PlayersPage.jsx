import React, { useState } from "react";
import CardPlayersPendents from "../components/CardPlayersPendents";
import ListPlayers from "../components/ListPlayers";
import FichaPlayer from "../components/FichaPlayer";
import "../CSS/PlayerCard.css";
import "../CSS/ListPlayers.css";

const PlayersPage = () => {
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [playersLoaded, setPlayersLoaded] = useState(false);

  const handlePlayersLoaded = (players) => {
    if (!playersLoaded && players.length > 0) {
      setSelectedPlayerId(players[0].ID_JOGADORES);
      setPlayersLoaded(true);
    }
  };

  return (
    <div className="players-page-wrapper">
      <div className="players-page-container">
        <div className="players-content">
          <div className="players-list-section">
            <CardPlayersPendents setSelectedPlayerId={setSelectedPlayerId} />
            <ListPlayers onSelectPlayer={setSelectedPlayerId} onPlayersLoaded={handlePlayersLoaded} />
          </div>
          <div className="player-details-section">
            <FichaPlayer ID_JOGADORES={selectedPlayerId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayersPage;