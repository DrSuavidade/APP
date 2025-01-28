import React, { useState } from "react";
import "./../CSS/clubespage.css";

const teams = [
  {
    name: "Académico de Viseu Futebol Clube", abbreviation: "VIS", teams: 7, squads: [
      { name: "AC Viseu Sub-23", players: 17 },
      { name: "AC Viseu Sub-19", players: 15 },
      { name: "AC Viseu Sub-16", players: 13 }
    ]
  },
  {
    name: "Clube Desportivo de Tondela", abbreviation: "TON", teams: 4, squads: [
      { name: "Tondela Sub-23", players: 18 },
      { name: "Tondela Sub-19", players: 16 }
    ]
  },
  {
    name: "Portimonense Sporting Clube", abbreviation: "PTM", teams: 3, squads: [
      { name: "PSC Sub-21", players: 14 },
      { name: "PSC Sub-18", players: 12 }
    ]
  },
  { name: "Clube Desportivo Feirense", abbreviation: "FEI", teams: 6, squads: [] },
  { name: "Grupo Desportivo de Chaves", abbreviation: "CHV", teams: 4, squads: [] },
  { name: "Clube Sport Marítimo", abbreviation: "MAR", teams: 3, squads: [] },
  { name: "Sport Lisboa e Benfica B", abbreviation: "BEN B", teams: 4, squads: [] },
  { name: "Futebol Clube de Penafiel", abbreviation: "PNF", teams: 3, squads: [] }
];


const ClubsPage = () => {
  const [selectedClub, setSelectedClub] = useState(null);
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (clubName) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [clubName]: !prevFavorites[clubName],
    }));
  };
  return (
    <div>
      {/* Header */}
      <header>
        <nav className="menu-bar">
          <div className="logo-container">
            <img src="../img/v687_776.png" alt="Logotipo" className="logo" />
          </div>
          <ul className="menu">
            <li><a href="#">Plantel</a></li>
            <li><a href="#">Jogadores</a></li>
            <li><a className="active" href="#">Clubes</a></li>
            <li><a href="#">Scouters</a></li>
            <li><a href="#">Eventos</a></li>
            <li><a href="#">Relatórios</a></li>
          </ul>
        </nav>
      </header>

      {/* Cards Section */}
      <section className="clubes-cards-row">
      <div>
      {/* Cards dos Clubes */}
      <div>
      {/* Cards dos Clubes Favoritos */}
      <div className="club-cards-container">
        {teams.filter(team => favorites[team.name]).map((team, index) => (
          <div key={index} className="club-card" onClick={() => setSelectedClub(team)}>
            <h4>{team.name}</h4>
            <p>{team.abbreviation}</p>
            <button
              className={`favorite-icon ${favorites[team.name] ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation(); // Impede que o clique no botão selecione o clube
                toggleFavorite(team.name);
              }}
            >
              ⭐
            </button>
          </div>
        ))}
      </div>
    </div>
    </div>
      </section>

      {/* Main Content */}
      <div className="main-content">
        <div className="left-menu">
          <form className="search-bar">
            <input type="text" placeholder="Escreve o nome do clube ou da equipa" />
            <button type="submit">Procurar</button>
          </form>

          <div className="team-header">
            <span>Nome Clube</span>
            <span>Abreviatura</span>
            <span>Nº Equipas</span>
          </div>

          <div className="team-list">
            {teams.map((team, index) => (
              <div
                className="team-item"
                key={index}
                onClick={() => setSelectedClub(team)}
              >
                <span className="team-name">{team.name}</span>
                <span className="team-abbreviation">{team.abbreviation}</span>
                <span className="team-count">{team.teams}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`right-menu ${selectedClub ? 'active' : ''}`}>
          {selectedClub && (
            <div className="selected-club-info">
              <h3>{selectedClub.name}</h3>
              <h4>{selectedClub.abbreviation}</h4>
              <button
                className={`favorite-button ${favorites[selectedClub.name] ? 'active' : ''}`}
                onClick={() => toggleFavorite(selectedClub.name)}
              >
                ⭐ Favorito
              </button>



            </div>
          )}
          <div className="team-details">
            <h3>Equipas</h3>
            <div id="team-details-container">
              {selectedClub ? (
                selectedClub.squads.length > 0 ? (
                  selectedClub.squads.map((squad, index) => (
                    <div key={index} className="squad-item">
                      <span>{squad.name}</span>
                      <span>{squad.players} jogadores</span>
                    </div>
                  ))
                ) : (
                  <p className="empty">Este clube não tem equipas registadas.</p>
                )
              ) : (
                <p className="empty">Selecione um clube à esquerda</p>
              )}
            </div>
          </div>
          <button className="manage-teams">Gerir Equipas</button>
          <button className="create-team">Criar Equipa</button>
        </div>
      </div>
    </div>
  );
};

export default ClubsPage;
