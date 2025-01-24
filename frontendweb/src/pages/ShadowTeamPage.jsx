
//import Navbar from '../components/Navbar';
//import Footer from '../components/Footer';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import '../CSS/ware.css';

import React, { useState } from "react";
//import "../CSS/Plantel.css";

export default function Plantel() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarGroup, setSidebarGroup] = useState("");

  const openSidebar = (group) => {
    setSidebarGroup(group);
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    setSidebarGroup("");
  };

  const squares = [
    { color: "red", group: "Vermelho 1" },
    { color: "red", group: "Vermelho 2" },
    { color: "red", group: "Vermelho 3" },
    { color: "red", group: "Vermelho 4" },
    { color: "red", group: "Vermelho 5" },
    { color: "yellow", group: "Amarelo 1" },
    { color: "yellow", group: "Amarelo 2" },
    { color: "yellow", group: "Amarelo 3" },
    { color: "yellow", group: "Amarelo 4" },
    { color: "yellow", group: "Amarelo 5" },
    { color: "green", group: "Verde 1" },
    { color: "green", group: "Verde 2" },
    { color: "green", group: "Verde 3" },
    { color: "green", group: "Verde 4" },
    { color: "green", group: "Verde 5" },
    { color: "blue", group: "Azul 1" },
    { color: "blue", group: "Azul 2" },
  ];

  return (
    <div>
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
        {squares.map((square, index) => (
          <div
            key={index}
            className={`square ${square.color}`}
            onClick={() => openSidebar(square.group)}
          ></div>
        ))}
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2>Jogadores</h2>
        {sidebarGroup && (
          <div className="player-card">
            <div className="avatar">👤</div>
            <div className="info">
              <h3>{sidebarGroup}</h3>
              <p>11/05/2011 - 13 anos</p>
            </div>
            <div className="progress">2/4</div>
          </div>
        )}
        <button className="close-btn" onClick={closeSidebar}>
          Fechar
        </button>
      </div>
    </div>
  );
}
