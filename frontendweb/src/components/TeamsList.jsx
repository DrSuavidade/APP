import React from "react";

const TeamsList = ({ selectedClub, favorites, toggleFavorite }) => {
  return (
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
  );
};

export default TeamsList;
