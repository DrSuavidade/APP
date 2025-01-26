
//import Navbar from '../components/Navbar';
//import Footer from '../components/Footer';
import React, { useState } from "react";
import "../CSS/plantel.css";

const Plantel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [playerData, setPlayerData] = useState(null);

  const players = [
    { id: "1", group: "Vermelho", name: "Marco Saraiva", age: 12, reports: 5, performance: "2/4", stats: { technique: "2/4", speed: "3/4", competitiveness: "4/4", intelligence: "1/4", height: "Alto", morphology: "Hectomorfo" } },
    { id: "2", group: "Amarelo", name: "João Silva", age: 14, reports: 8, performance: "3/4", stats: { technique: "3/4", speed: "4/4", competitiveness: "3/4", intelligence: "2/4", height: "Médio", morphology: "Mesomorfo" } },
  ];

  const openSidebar = (group) => {
    setSidebarOpen(true);
    setDetailsOpen(false);
    setPlayerData(players.filter((player) => player.group === group));
  };

  const openDetails = (player) => {
    setDetailsOpen(true);
    setPlayerData(player);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    setDetailsOpen(false);
    setPlayerData(null);
  };

  return (
    <div className="plantel-container">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">
          <img src="logo.png" alt="Logo" />
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

      {/* Campo */}
      <div className="field">
        {/* Quadrados Vermelhos */}
        <div className="row">
          <div className="square red" onClick={() => openSidebar("Vermelho")}></div>
          <div className="square red" onClick={() => openSidebar("Vermelho")}></div>
        </div>
        <div className="row">
          <div className="square yellow" onClick={() => openSidebar("Amarelo")}></div>
          <div className="square yellow" onClick={() => openSidebar("Amarelo")}></div>
        </div>
        <div className="row">
          <div className="square green" onClick={() => openSidebar("Verde")}></div>
          <div className="square green" onClick={() => openSidebar("Verde")}></div>
        </div>
        <div className="row">
          <div className="square blue" onClick={() => openSidebar("Azul")}></div>
          <div className="square blue" onClick={() => openSidebar("Azul")}></div>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`} id="sidebar">
        {!detailsOpen ? (
          <>
            <h2>Jogadores do Grupo</h2>
            {playerData &&
              playerData.map((player) => (
                <div key={player.id} className="player-card" onClick={() => openDetails(player)}>
                  <div className="avatar">👤</div>
                  <div className="info">
                    <h3>{player.name}</h3>
                    <p>Idade: {player.age}</p>
                    <p>Relatórios: {player.reports}</p>
                  </div>
                </div>
              ))}
            <button className="close-btn" onClick={closeSidebar}>Fechar</button>
          </>
        ) : (
          <>
            <h2>Informações do Jogador</h2>
            {playerData && (
              <div className="player-details">
                <div className="player-header">
                  <div className="avatar-large">👤</div>
                  <div className="details">
                    <h3>{playerData.name}</h3>
                    <p>Idade: {playerData.age}</p>
                    <p>Relatórios: {playerData.reports}</p>
                    <p>Desempenho: {playerData.performance}</p>
                  </div>
                </div>
                <div className="player-stats">
                  <p>Técnica: {playerData.stats.technique}</p>
                  <p>Velocidade: {playerData.stats.speed}</p>
                  <p>Atitude Competitiva: {playerData.stats.competitiveness}</p>
                  <p>Inteligência: {playerData.stats.intelligence}</p>
                  <p>Altura: {playerData.stats.height}</p>
                  <p>Morfologia: {playerData.stats.morphology}</p>
                </div>
              </div>
            )}
            <button className="close-btn" onClick={closeSidebar}>Fechar</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Plantel;

