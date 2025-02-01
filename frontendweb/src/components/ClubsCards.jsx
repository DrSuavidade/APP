import React, { useState, useEffect } from "react";

const ClubsCards = ({ favorites, setSelectedClub, toggleFavorite }) => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/clubes/com-equipas");
        const data = await response.json();
        setTeams(data); // Atualiza o estado com os clubes vindos do backend
      } catch (error) {
        console.error("Erro ao buscar clubes:", error);
      }
    };

    fetchClubs();
  }, []);

  return (
    <section className="clubes-cards-row">
      <div className="club-cards-container">
        {teams.filter(team => favorites[team.nome]).map((team, index) => (
          <div key={index} className="club-card" onClick={() => setSelectedClub(team)}>
            <h4>{team.nome}</h4>
            <p>{team.abreviatura}</p>
            <button
              className={`favorite-icon ${favorites[team.nome] ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(team.nome);
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
