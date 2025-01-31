import React from "react";

const ClubsCards = ({ teams, favorites, setSelectedClub, toggleFavorite }) => {
  return (
    <section className="clubes-cards-row">
      <div className="club-cards-container">
        {teams.filter(team => favorites[team.name]).map((team, index) => (
          <div key={index} className="club-card" onClick={() => setSelectedClub(team)}>
            <h4>{team.name}</h4>
            <p>{team.abbreviation}</p>
            <button
              className={`favorite-icon ${favorites[team.name] ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(team.name);
              }}
            >
              ⭐
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClubsCards;
