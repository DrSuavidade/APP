import React from "react";

const ClubsList = ({ teams, setSelectedClub }) => {
  return (
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
  );
};

export default ClubsList;
