
//import Navbar from '../components/Navbar';
//import Footer from '../components/Footer';
import React, { useState } from "react";
import "../CSS/plantel.css";

const Plantel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [playerData, setPlayerData] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [searchText, setSearchText] = useState("");

  const players = [
    { id: "1", group: "Vermelho", name: "Marco Saraiva", age: 12, reports: 5, type: "titular", performance: "3/4", stats: { technique: "3/4", speed: "2/4", competitiveness: "4/4", intelligence: "1/4", height: "Alto", morphology: "Hectomorfo" } },
    { id: "2", group: "Vermelho", name: "Cleiton dos Santos", age: 11, reports: 6, type: "titular", performance: "4/4", stats: { technique: "4/4", speed: "3/4", competitiveness: "4/4", intelligence: "2/4", height: "Médio", morphology: "Mesomorfo" } },
    { id: "3", group: "Amarelo", name: "Rodrigo Martins", age: 12, reports: 4, type: "titular", performance: "2/4", stats: { technique: "2/4", speed: "4/4", competitiveness: "3/4", intelligence: "3/4", height: "Baixo", morphology: "Endomorfo" } },
    { id: "4", group: "Amarelo", name: "Khalifa Morais", age: 13, reports: 3, type: "titular", performance: "1/4", stats: { technique: "3/4", speed: "2/4", competitiveness: "2/4", intelligence: "4/4", height: "Alto", morphology: "Mesomorfo" } },
    { id: "5", group: "Verde", name: "Pedro Guerra", age: 13, reports: 5, type: "reserva", performance: "2/4", stats: { technique: "2/4", speed: "3/4", competitiveness: "2/4", intelligence: "1/4", height: "Médio", morphology: "Endomorfo" } },
    { id: "6", group: "Azul", name: "João Gomes", age: 12, reports: 7, type: "reserva", performance: "3/4", stats: { technique: "3/4", speed: "2/4", competitiveness: "4/4", intelligence: "3/4", height: "Baixo", morphology: "Mesomorfo" } },
  ];

  const openSidebar = (group) => {
    setSidebarOpen(true);
    setDetailsOpen(false);
    setSelectedPlayer(null);
    setPlayerData(players.filter((player) => player.group === group) || []);
  };

  const openDetails = (player) => {
    setDetailsOpen(true);
    setSelectedPlayer(player);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    setDetailsOpen(false);
    setSelectedPlayer(null);
    setPlayerData([]);
    setSearchText("");
  };

  const goBackToList = () => {
    setDetailsOpen(false);
    setSelectedPlayer(null);
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
  <div className="row">
    <div className="square red" onClick={() => openSidebar("Vermelho")}></div>
    <div className="square red" onClick={() => openSidebar("Vermelho")}></div>
  </div>
  <div className="row">
    <div className="square red" onClick={() => openSidebar("Vermelho")}></div>
    <div className="square red" onClick={() => openSidebar("Vermelho")}></div>
    <div className="square red" onClick={() => openSidebar("Vermelho")}></div>
  </div>
  <div className="row">
    <div className="square yellow" onClick={() => openSidebar("Amarelo")}></div>
    <div className="square yellow" onClick={() => openSidebar("Amarelo")}></div>
    <div className="square yellow" onClick={() => openSidebar("Amarelo")}></div>
  </div>
  <div className="row">
    <div className="square yellow" onClick={() => openSidebar("Amarelo")}></div>
    <div className="square yellow" onClick={() => openSidebar("Amarelo")}></div>
  </div>
  <div className="row">
    <div className="square green" onClick={() => openSidebar("Verde")}></div>
    <div className="square green" onClick={() => openSidebar("Verde")}></div>
    <div className="square green" onClick={() => openSidebar("Verde")}></div>
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
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        {!detailsOpen ? (
          <>
            <h2>Jogadores do Grupo</h2>

            {/* 🔍 Barra de Entrada de Texto */}
            <div className="search-bar">
              <input
                type="text"
                placeholder="Escreva o nome do jogador..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button className="clear-btn" onClick={() => setSearchText("")}>✖</button>
            </div>

            {/* 📋 Titulares */}
            <h3 className="section-title">TITULARES</h3>
            {playerData.filter((player) => player.type === "titular").map((player) => (
              <div key={player.id} className="player-card" onClick={() => openDetails(player)}>
                <div className="player-info">
                  <div className="player-avatar">👤</div>
                  <div className="player-details">
                    <h3>{player.name}</h3>
                    <p>{player.age} anos</p>
                    <p>Relatórios: {player.reports}</p>
                    {renderProgressBar(player.performance)}
                  </div>
                </div>
              </div>
            ))}

            {/* 📋 Reservas */}
            <h3 className="section-title">RESERVAS</h3>
            {playerData.filter((player) => player.type === "reserva").map((player) => (
              <div key={player.id} className="player-card" onClick={() => openDetails(player)}>
                <div className="player-info">
                  <div className="player-avatar">👤</div>
                  <div className="player-details">
                    <h3>{player.name}</h3>
                    <p>{player.age} anos</p>
                    <p>Relatórios: {player.reports}</p>
                    {renderProgressBar(player.performance)}
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
            {selectedPlayer && (
              <div className="player-details">
                <div className="player-header">
                  <div className="avatar-large">👤</div>
                  <div>
                    <h3>{selectedPlayer.name}</h3>
                    <p>Idade: {selectedPlayer.age}</p>
                    <p>Relatórios: {selectedPlayer.reports}</p>
                  </div>
                </div>
                <p>Desempenho:</p> {renderProgressBar(selectedPlayer.performance)}
                <p>Técnica:</p> {renderProgressBar(selectedPlayer.stats.technique)}
                <p>Velocidade:</p> {renderProgressBar(selectedPlayer.stats.speed)}
                <p>Atitude Competitiva:</p> {renderProgressBar(selectedPlayer.stats.competitiveness)}
                <p>Inteligência:</p> {renderProgressBar(selectedPlayer.stats.intelligence)}
                <p>Altura: {selectedPlayer.stats.height}</p>
                <p>Morfologia: {selectedPlayer.stats.morphology}</p>

                <button className="add-btn">ADICIONAR</button>
                <button className="back-btn" onClick={goBackToList}>Voltar</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Plantel;