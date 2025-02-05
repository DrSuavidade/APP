import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TeamList = ({ selectedClub, favorites, toggleFavorite }) => {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      if (!selectedClub) return;

      try {
        const response = await fetch(`http://localhost:3000/api/equipas/${selectedClub.id_clube}`);
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error("Erro ao buscar equipas:", error);
      }
    };

    fetchTeams();
  }, [selectedClub]);

  const handleManageTeams = () => {
    if (!selectedClub) return;
    navigate("/team", { state: { idClube: selectedClub.id_clube } });
  };

  const handleCreateTeam = () => {
    if (!selectedClub) return;
    navigate(`/team/add/${selectedClub.id_clube}`);
  };

  return (
    <div className={`right-menu ${selectedClub ? 'active' : ''}`}>
      {selectedClub && (
        <div className="selected-club-info">
          <h3>{selectedClub.nome}</h3>
          <h4>{selectedClub.abreviatura}</h4>
        </div>
      )}

      <div className="team-details">
        <h3>Equipas</h3>
        <div id="team-details-container">
          {teams.length > 0 ? (
            teams.map((team, index) => (
              <div 
                key={index} 
                className="squad-item" 
                onClick={() => navigate("/team", { state: { idClube: selectedClub.id_clube, idEquipa: team.ID_EQUIPA } })}
                style={{ cursor: "pointer" }}
              >
                <div className="team-info-left">
                  <span className="team-id">{team.ID_EQUIPA}</span>
                  <div className="team-name-escalao">
                    <span className="team-name">{team.NOME}</span>
                    <span className="team-escalao">{team.ESCALAO}</span>
                  </div>
                </div>
                <div className="team-info-right">
                  <span className="team-players">{team.NUMERO_JOGADORES} jogadores</span>
                </div>
              </div>
            ))
          ) : (
            <p className="empty">Este clube não tem equipas registadas.</p>
          )}
        </div>
      </div>

      <button className="manage-teams" onClick={handleManageTeams}>
        Gerir Equipas
      </button>
      <button className="create-team" onClick={handleCreateTeam}>Criar Equipa</button>
    </div>
  );
};

export default TeamList;
