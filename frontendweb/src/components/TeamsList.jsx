import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaTimes } from 'react-icons/fa'; // Importe os ícones necessários
import Swal from 'sweetalert2'; // Para exibir alertas
import axios from "axios"; // Para fazer chamadas à API

const TeamList = ({ selectedClub, favorites, toggleFavorite }) => {
  const [teams, setTeams] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false); // Controla a exibição dos checkboxes
  const [selectedTeams, setSelectedTeams] = useState([]); // Armazena as equipas selecionadas
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

  const handleCreateTeam = () => {
    if (!selectedClub) return;
    navigate(`/team/add/${selectedClub.id_clube}`);
  };

  // Função para alternar a seleção de uma equipa
  const toggleTeamSelection = (teamId) => {
    setSelectedTeams((prevSelected) =>
      prevSelected.includes(teamId)
        ? prevSelected.filter((id) => id !== teamId)
        : [...prevSelected, teamId]
    );
  };

  // Função para cancelar a seleção de equipas
  const handleCancelSelection = () => {
    setSelectedTeams([]);
    setShowCheckboxes(false);
  };

  // Função para excluir as equipas selecionadas
  const handleDeleteTeams = async () => {
    if (!showCheckboxes) {
      setShowCheckboxes(true);
      return;
    }
  
    if (selectedTeams.length === 0) {
      Swal.fire("Erro", "Selecione pelo menos uma equipa para excluir.", "error");
      return;
    }
  
    Swal.fire({
      title: "Tem certeza?",
      text: "As equipas selecionadas serão excluídas permanentemente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Excluir cada equipa individualmente
          for (const teamId of selectedTeams) {
            await axios.delete(`http://localhost:3000/api/equipa/delete/${teamId}`);
          }
  
          // Atualizar a lista de equipas após a exclusão
          setTeams(teams.filter((team) => !selectedTeams.includes(team.ID_EQUIPA)));
          setSelectedTeams([]);
          setShowCheckboxes(false);
  
          Swal.fire("Excluído!", "As equipas foram removidas com sucesso.", "success");
        } catch (error) {
          console.error('Erro ao deletar equipas:', error);
          Swal.fire("Erro!", "Não foi possível excluir as equipas.", "error");
        }
      }
    });
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
        <div className="toolbar">
          <FaTrash className="icon trash" onClick={handleDeleteTeams} />
          {showCheckboxes && <FaTimes className="icon cancel" onClick={handleCancelSelection} />}
        </div>
        <div id="team-details-container">
          {teams.length > 0 ? (
            teams.map((team, index) => (
              <div
                key={index}
                className="squad-item"
                onClick={() => !showCheckboxes && navigate("/team", { state: { idClube: selectedClub.id_clube, idEquipa: team.ID_EQUIPA } })}
                style={{ cursor: "pointer" }}
              >
                {showCheckboxes && (
                  <input
                    type="checkbox"
                    checked={selectedTeams.includes(team.ID_EQUIPA)}
                    onChange={() => toggleTeamSelection(team.ID_EQUIPA)}
                    onClick={(e) => e.stopPropagation()} // Impede a navegação ao clicar no checkbox
                  />
                )}
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

      <button className="create-team" onClick={handleCreateTeam}>Criar Equipa</button>
    </div>
  );
};

export default TeamList;