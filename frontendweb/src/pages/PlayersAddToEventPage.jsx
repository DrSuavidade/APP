import React from "react";
import "../CSS/Playersaddtoeventpage.css";

const PlayersAddToEventPage = () => {
  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>EVENTO</h2>
        <div className="event-info">
          <p><strong>24/Jul/2024</strong></p>
          <p>AF Viseu 12:00 AM vs SL Nelas</p>
          <p>📍 Entrada do torneio</p>
        </div>

        <h2>SCOUTER</h2>
        <div className="scouter-info">
          <p><strong>Armando Silva</strong></p>
          <p>👤 Scouter</p>
        </div>

        <h2>JOGADORES DESTACADOS</h2>
        <button className="add-player-btn">➕ Adicionar Jogador</button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <h1>Adicionar Jogadores ao Evento</h1>

        {/* Search Box */}
        <div className="search-box">
          <input type="text" placeholder="Escreva o nome do clube ou jogador" />
          <button>🔍 Procurar</button>
        </div>

        {/* Player List */}
        <div className="player-list">
          {[
            { id: 1, name: "David Moreira", age: 15, birthYear: 2008, team: "AC Viseu Sub-16" },
            { id: 2, name: "Rodrigo Mello", age: 16, birthYear: 2007, team: "AC Viseu Sub-16" },
          ].map((player) => (
            <div key={player.id} className="player-card">
              <p><strong>{player.name}</strong></p>
              <p>{player.age} anos • {player.birthYear}</p>
              <p>{player.team}</p>
            </div>
          ))}
        </div>

        {/* Confirm Button */}
        <button className="confirm-btn">✅ Confirmar</button>
      </main>
    </div>
  );
};

export default PlayersAddToEventPage;