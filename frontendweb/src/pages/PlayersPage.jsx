import React from "react";
import CardPlayersPendents from "../components/CardPlayersPendents";
import ListPlayers from "../components/ListPlayers";
import FichaPlayer from "../components/FichaPlayer";

const PlayersPage = () => {
  return (
    <div className="players-page-container">
      <h1>Jogadores Pendentes</h1>
      <CardPlayersPendents />
      <ListPlayers/>
      <FichaPlayer ID_JOGADORES={1} />
    </div>
  );
};

export default PlayersPage;