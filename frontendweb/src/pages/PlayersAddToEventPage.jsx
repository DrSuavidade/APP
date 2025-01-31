// PlayersAddToEventPage.jsx
import React, { useState } from "react";
import "../CSS/main.css";

const PlayersAddToEventPage = () => {
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const players = [
    { id: 1, name: "David Moreira", age: 15, birthYear: 2008, team: "AC Viseu Sub-16" },
    { id: 2, name: "Rodrigo Mello", age: 16, birthYear: 2007, team: "AC Viseu Sub-16" },
    { id: 2, name: "Rodrigo Mello", age: 16, birthYear: 2007, team: "AC Viseu Sub-16" },
  ];

  const togglePlayerSelection = (id) => {
    setSelectedPlayers((prev) =>
      prev.includes(id) ? prev.filter((playerId) => playerId !== id) : [...prev, id]
    );
  };

  return (
    <div className="container">
      <aside className="sidebar" style={{ display: "block", visibility: "visible" }}>
        <div className="event-info">
          <h3>EVENTO</h3>
          <p>AF Viseu vs SL Nelas</p>
          <p>📍 Entrada do torneio</p>
          <p>25/10/2024 - 12:00 AM</p>
        </div>

        <div className="scouter-info">
          <h3>SCOUTER</h3>
          <p>Armando Silva</p>
          <span>🔍 5 Avaliações</span>
        </div>

        <button className="add-player-btn">➕ Adicionar Jogador</button>
      </aside>

      <main className="main-content">
        <h1>Adicionar Jogadores ao Evento</h1>

        <div className="search-box">
          <input type="text" placeholder="Escreva o nome do clube ou jogador" />
          <button>🔍 Procurar</button>
        </div>

        <div className="player-list">
          {players.map((player) => (
            <button
              key={player.id}
              className={`player-card ${selectedPlayers.includes(player.id) ? "selected" : ""}`}
              onClick={() => togglePlayerSelection(player.id)}
            >
              <p><strong>{player.name}</strong></p>
              <p>{player.age} anos • {player.birthYear}</p>
              <p>{player.team}</p>
            </button>
          ))}
        </div>

        <button className="confirm-btn">✅ Confirmar</button>
      </main>
    </div>
  );
};

export default PlayersAddToEventPage;
