import React from "react";
import "../CSS/HUB.css";

const HUB = () => {
    const searchScouter = () => {
      const input = document.getElementById("scouter-input").value;
      alert(`Procurando por: ${input}`);
    };
  
    const searchJogador = () => {
      const input = document.getElementById("jogador-input").value;
      alert(`Procurando por: ${input}`);
    };
  
    const addScouter = () => {
      alert("Adicionar botão clicado!");
    };
  
    const addJogador = () => {
      alert("Adicionar jogador clicado!");
    };
  
    return (
      <div className="hub">
        {/* Navbar */}
        <header className="navbar">
          <div className="menu">
            <span>Plantel</span>
            <span>Jogadores</span>
            <span>Clubes</span>
            <span>Scouters</span>
            <span>Eventos</span>
            <span>Relatórios</span>
          </div>
        </header>
  
        {/* Header */}
        <div className="header">RELATÓRIOS PENDENTES</div>
  
        {/* Report Cards */}
        <div className="report-section">
          {[
            { name: "Marco Saraiva", age: 12, year: 2012, club: "AC Viseu Sub - 12", badge: "3/4" },
            { name: "Pedro Ferreira", age: 15, year: 2009, club: "AC Viseu Sub - 12", badge: "2/4" },
            { name: "Ricardo Bosques", age: 11, year: 2013, club: "AC Viseu Sub - 12", badge: "3/4" },
            { name: "Jorge da Silva", age: 17, year: 2007, club: "AC Viseu Sub - 12", badge: "4/4" }
          ].map((report, index) => (
            <div
              className="report-card"
              key={index}
              onClick={() => alert(`Relatório clicado: ${report.name}`)}
            >
              <div className="icon">👤</div>
              <h3>{report.name}</h3>
              <p>{`${report.age} anos | ${report.year}`}</p>
              <p>{report.club}</p>
              <div className={`badge${index + 1}`}>{report.badge}</div>
              <div className="status"></div>
            </div>
          ))}
        </div>
  
        {/* Functional Sections */}
        <div className="functional-container">
          {/* Scouters */}
          <div className="functional-box">
            <h3>SCOUTERS</h3>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Escreva o nome do scouter"
                id="scouter-input"
              />
              <button onClick={searchScouter}>Search</button>
            </div>
            <div className="actions">
              <label>
                <input type="checkbox" id="select-all-scouters" />
                Selecionar Todos
              </label>
              <button className="add-button" onClick={addScouter}>
                Adicionar
              </button>
            </div>
            <div className="scouter-list-container">
              <ul className="scouter-list">
                {[
                  { name: "Armando Silva", evaluations: "5 avaliações" },
                  { name: "Ernesto Tivolli", evaluations: "0 avaliações" },
                  { name: "Márcia Pereira", evaluations: "3 avaliações" },
                  { name: "João Mendes", evaluations: "2 avaliações" }
                ].map((scouter, index) => (
                  <li key={index}>
                    <div className="scouter-details">
                      <span className="name">{scouter.name}</span>
                      <span className="evaluations">{scouter.evaluations}</span>
                    </div>
                    <button>Selecionar</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
  
          {/* Jogos */}
          <div className="functional-box">
            <h3>JOGOS</h3>
            {["A.F. VISEU VS SL NELAS", "A.F. VISEU VS SL NELAS"].map(
              (game, index) => (
                <div
                  key={index}
                  className="green-button"
                  onClick={() => alert(`${game} clicado`)}
                >
                  {game}
                  <br />
                  Estádio do Fontelo
                </div>
              )
            )}
          </div>
  
          {/* Jogadores */}
          <div className="functional-box">
            <h3>JOGADORES</h3>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Escreva o nome do jogador"
                id="jogador-input"
              />
              <button onClick={searchJogador}>Search</button>
            </div>
            <div className="actions">
              <label>
                <input type="checkbox" id="select-all-jogadores" />
                Selecionar Todos
              </label>
              <button className="add-button" onClick={addJogador}>
                Adicionar
              </button>
            </div>
            <div className="scouter-list-container">
              <ul className="scouter-list">
                {[
                  { name: "Marco Saraiva", stars: "⭐⭐⭐" },
                  { name: "Alexandre Figueiró", stars: "⭐⭐⭐⭐" },
                  { name: "Afonso Moreira", stars: "⭐⭐" },
                  { name: "Rui Carlos", stars: "⭐⭐⭐⭐⭐" }
                ].map((player, index) => (
                  <li key={index}>
                    <div className="scouter-details">
                      <span className="name">{player.name}</span>
                      <span className="evaluations">{player.stars}</span>
                    </div>
                    <button>Selecionar</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default HUB;