
//import Navbar from '../components/Navbar';
//import Footer from '../components/Footer';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useState } from "react";
//import "../CSS/plantel.css";

const Plantel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarContent, setSidebarContent] = useState("");

  const openSidebar = (group) => {
    setSidebarContent(group);
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    setSidebarContent("");
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
          <div
            className="square red"
            onClick={() => openSidebar("Vermelho 1")}
          ></div>
          <div
            className="square red"
            onClick={() => openSidebar("Vermelho 2")}
          ></div>
        </div>
        <div className="row">
          <div
            className="square red"
            onClick={() => openSidebar("Vermelho 3")}
          ></div>
          <div
            className="square red"
            onClick={() => openSidebar("Vermelho 4")}
          ></div>
          <div
            className="square red"
            onClick={() => openSidebar("Vermelho 5")}
          ></div>
        </div>

        {/* Quadrados Amarelos */}
        <div className="row">
          <div
            className="square yellow"
            onClick={() => openSidebar("Amarelo 1")}
          ></div>
          <div
            className="square yellow"
            onClick={() => openSidebar("Amarelo 2")}
          ></div>
          <div
            className="square yellow"
            onClick={() => openSidebar("Amarelo 3")}
          ></div>
        </div>
        <div className="row">
          <div
            className="square yellow"
            onClick={() => openSidebar("Amarelo 4")}
          ></div>
          <div
            className="square yellow"
            onClick={() => openSidebar("Amarelo 5")}
          ></div>
        </div>

        {/* Quadrados Verdes */}
        <div className="row">
          <div
            className="square green"
            onClick={() => openSidebar("Verde 1")}
          ></div>
          <div
            className="square green"
            onClick={() => openSidebar("Verde 2")}
          ></div>
          <div
            className="square green"
            onClick={() => openSidebar("Verde 3")}
          ></div>
        </div>
        <div className="row">
          <div
            className="square green"
            onClick={() => openSidebar("Verde 4")}
          ></div>
          <div
            className="square green"
            onClick={() => openSidebar("Verde 5")}
          ></div>
        </div>

        {/* Quadrados Azuis */}
        <div className="row">
          <div
            className="square blue"
            onClick={() => openSidebar("Azul 1")}
          ></div>
          <div
            className="square blue"
            onClick={() => openSidebar("Azul 2")}
          ></div>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`} id="sidebar">
        <h2>Informações</h2>
        {sidebarContent && (
          <div className="player-card">
            <div className="avatar">👤</div>
            <div className="info">
              <h3>{sidebarContent}</h3>
              <p>Detalhes sobre {sidebarContent}</p>
            </div>
          </div>
        )}
        <button className="close-btn" onClick={closeSidebar}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default Plantel;
