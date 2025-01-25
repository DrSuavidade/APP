import React, { useState } from "react";
import "../CSS/AddScouterToEvent.css";

// Navbar Component
function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">
        <img src="/path/to/logo.png" alt="Logo" />
      </div>
      <div className="menu">
        <span>Plantel</span>
        <span>Jogadores</span>
        <span>Clubes</span>
        <span>Scouters</span>
        <span>Eventos</span>
        <span>Relatórios</span>
      </div>
    </header>
  );
}

// SearchScouter Component
function SearchScouter() {
  return (
    <div className="search-scouter">
      <input type="text" placeholder="Escreva o nome do clube ou da equipa" />
      <button className="search-button">Pesquisar</button>
      <label className="select-all">
        <input type="checkbox" /> Selecionar Todos
      </label>
      <button className="add-button">Adicionar</button>
    </div>
  );
}

// ScouterList Component
function ScouterList() {
  const scouters = [
    { name: "Armando Silva", role: "Scouter", reviews: "5 Avaliações" },
    { name: "Ernesto Tivelli", role: "Convidado", reviews: "1 Avaliação" },
  ];

  return (
    <div className="scouter-list">
      {scouters.map((scouter, index) => (
        <div key={index} className="scouter-card">
          <div className="scouter-avatar"></div>
          <div className="scouter-info">
            <span className="name">{scouter.name}</span>
            <span className="role">{scouter.role}</span>
            <span className="reviews">{scouter.reviews}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// EventDetails Component
function EventDetails() {
  return (
    <div className="event-details-sidebar">
      <h3>Evento</h3>
      <p>25/10/2024</p>
      <p>12:00 AM</p>
      <p>A.F. Viseu vs. SL Nelas</p>
      <p>Sub-16</p>
      <p>Estádio da Fonte</p>
    </div>
  );
}

// SelectedScouterDetails Component
function SelectedScouterDetails() {
  return (
    <div className="selected-scouter-details">
      <h3>Scouter</h3>
      <div className="scouter-card">
        <div className="scouter-avatar"></div>
        <div className="scouter-info">
          <span className="name">Armando Silva</span>
          <span className="role">Scouter</span>
          <span className="reviews">5 Avaliações</span>
        </div>
      </div>
    </div>
  );
}

// HighlightedPlayers Component
function HighlightedPlayers() {
  return (
    <div className="highlighted-players">
      <h3>Jogadores Destacados</h3>
      <button className="add-player-button">Adicionar Jogador</button>
    </div>
  );
}

// Main App Component
function App() {
  return (
    <div className="main-container">
      <Navbar />
      <div className="content-container">
        <div className="left-container">
          <SearchScouter />
          <ScouterList />
          <button className="confirm-button">Confirmar</button>
        </div>
        <div className="right-container">
          <EventDetails />
          <SelectedScouterDetails />
          <HighlightedPlayers />
        </div>
      </div>
    </div>
  );
}

export default App;