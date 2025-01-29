
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
    { id: "3", group: "Verde", name: "Ana Costa", age: 15, reports: 6, performance: "4/4", stats: { technique: "4/4", speed: "3/4", competitiveness: "3/4", intelligence: "4/4", height: "Baixo", morphology: "Endomorfo" } },
    { id: "4", group: "Azul", name: "Carlos Mendes", age: 13, reports: 7, performance: "3/4", stats: { technique: "3/4", speed: "4/4", competitiveness: "4/4", intelligence: "3/4", height: "Alto", morphology: "Mesomorfo" } },
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

  const renderProgressBar = (value) => {
    const max = 4;
    const percentage = (parseInt(value.split("/")[0], 10) / max) * 100;
    return (
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="plantel-container">
      {/* Campo */}
      <div className="field">
        {/* Quadrados Vermelhos */}
        <div className="row">
          <div className="square red" onClick={() => openSidebar("Vermelho")}></div>
          <div className="square red" onClick={() => openSidebar("Vermelho")}></div>
        </div>
        <div className="row">
          <div className="square red" onClick={() => openSidebar("Vermelho")}></div>
          <div className="square red" onClick={() => openSidebar("Vermelho")}></div>
          <div className="square red" onClick={() => openSidebar("Vermelho")}></div>
        </div>
        {/* Quadrados Amarelos */}
        <div className="row">
          <div className="square yellow" onClick={() => openSidebar("Amarelo")}></div>
          <div className="square yellow" onClick={() => openSidebar("Amarelo")}></div>
          <div className="square yellow" onClick={() => openSidebar("Amarelo")}></div>
        </div>
        <div className="row">
          <div className="square yellow" onClick={() => openSidebar("Amarelo")}></div>
          <div className="square yellow" onClick={() => openSidebar("Amarelo")}></div>
        </div>
        {/* Quadrados Verdes */}
        <div className="row">
          <div className="square green" onClick={() => openSidebar("Verde")}></div>
          <div className="square green" onClick={() => openSidebar("Verde")}></div>
          <div className="square green" onClick={() => openSidebar("Verde")}></div>
        </div>
        <div className="row">
          <div className="square green" onClick={() => openSidebar("Verde")}></div>
          <div className="square green" onClick={() => openSidebar("Verde")}></div>
        </div>
        {/* Quadrados Azuis */}
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
                  <div className="player-info">
                    <div className="player-avatar">👤</div>
                    <div className="player-details">
                      <h3>{player.name}</h3>
                      <p>Idade: {player.age}</p>
                      <p>Relatórios: {player.reports}</p>
                    </div>
                  </div>
                </div>
              ))}
            <button className="add-btn">ADICIONAR</button>
            <button className="close-btn" onClick={closeSidebar}>Fechar</button>
          </>
        ) : (
          <>
            <h2>Informações do Jogador</h2>
            {playerData && (
              <div className="player-details" style={{ textAlign: "left", padding: "1rem" }}>
                <div className="player-header">
                  <div className="avatar-large">👤</div>
                  <div>
                    <h3 style={{ margin: 0 }}>{playerData.name}</h3>
                    <p style={{ margin: 0 }}>Idade: {playerData.age}</p>
                    <p style={{ margin: 0 }}>Relatórios: {playerData.reports}</p>
                  </div>
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <p>Desempenho:</p>
                  {renderProgressBar(playerData.performance)}
                  <p>Técnica:</p>
                  {renderProgressBar(playerData.stats.technique)}
                  <p>Velocidade:</p>
                  {renderProgressBar(playerData.stats.speed)}
                  <p>Atitude Competitiva:</p>
                  {renderProgressBar(playerData.stats.competitiveness)}
                  <p>Inteligência:</p>
                  {renderProgressBar(playerData.stats.intelligence)}
                  <p>Altura: {playerData.stats.height}</p>
                  <p>Morfologia: {playerData.stats.morphology}</p>
                </div>
                <button
                  className="add-btn"
                  style={{ backgroundColor: "#32CD32", color: "white", marginBottom: "10px" }}
                >
                  ADICIONAR
                </button>
                <button className="close-btn" onClick={closeSidebar}>Fechar</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Plantel;