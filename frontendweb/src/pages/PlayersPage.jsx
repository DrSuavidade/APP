import React from "react";
import CardPlayersPendents from "../components/CardPlayersPendents";
import ListPlayers from "../components/ListPlayers";

const PlayersPage = () => {
  return (
    <div className="players-page-container">
      <h1>Jogadores Pendentes</h1>
      <CardPlayersPendents />
      <ListPlayers/>
    </div>
  );
};

export default PlayersPage;