import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaTimes, FaCog, FaPlus } from 'react-icons/fa'; // Importe o ícone FaPlus
import Swal from 'sweetalert2';
import axios from "axios";
import Cookies from "js-cookie";

const TeamList = ({ selectedClub, favorites, toggleFavorite }) => {
  const [teams, setTeams] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [userType, setUserType] = useState(null);
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

    const ID_TIPO = Cookies.get("ID_TIPO");
    setUserType(ID_TIPO);
  }, [selectedClub]);

  const handleCreateTeam = () => {
    if (!selectedClub) return;
    navigate(`/team/add/${selectedClub.id_clube}`);
  };

  const handleEditClub = () => {
    Swal.fire({
      title: 'Editar Clube',
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="Novo Nome" value="${selectedClub.nome}">` +
        `<input id="swal-input2" class="swal2-input" placeholder="Nova Abreviatura" value="${selectedClub.abreviatura}">`,
      focusConfirm: false,
      preConfirm: () => {
        return {
          nome: document.getElementById('swal-input1').value,
          abreviatura: document.getElementById('swal-input2').value
        };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { nome, abreviatura } = result.value;
        axios.put(`http://localhost:3000/api/clube/edit/${selectedClub.id_clube}`, { NOME: nome, ABREVIATURA: abreviatura })
          .then(response => {
            Swal.fire('Sucesso!', 'Clube atualizado com sucesso.', 'success').then(() => {
              window.location.reload();
            });
          })
          .catch(error => {
            console.error('Erro ao atualizar clube:', error);
            Swal.fire('Erro!', 'Não foi possível atualizar o clube.', 'error');
          });
      }
    });
  };

  const toggleTeamSelection = (teamId) => {
    setSelectedTeams((prevSelected) =>
      prevSelected.includes(teamId)
        ? prevSelected.filter((id) => id !== teamId)
        : [...prevSelected, teamId]
    );
  };

  const handleCancelSelection = () => {
    setSelectedTeams([]);
    setShowCheckboxes(false);
  };

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
      text: "As equipas selecionadas serão excluídas permanentemente, incluindo suas relações com os jogadores!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          for (const teamId of selectedTeams) {
            await axios.delete(`http://localhost:3000/api/equipa/delete-all/${teamId}`);
          }

          setTeams(teams.filter((team) => !selectedTeams.includes(team.ID_EQUIPA)));
          setSelectedTeams([]);
          setShowCheckboxes(false);

          Swal.fire("Excluído!", "As equipas e suas relações de jogadores foram removidas com sucesso.", "success");
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
          {userType !== "1" && (
            <FaCog className="icon-cog2" onClick={handleEditClub} />
          )}
        </div>
      )}

      <div className="team-details">
        <h3>Equipas</h3>
        {userType !== "1" && (
          <div className="toolbar">
            <FaTrash className="icon trash" onClick={handleDeleteTeams} />
            {showCheckboxes && <FaTimes className="icon cancel" onClick={handleCancelSelection} />}
            <FaPlus className="icon plus" onClick={handleCreateTeam} />
          </div>
        )}
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
                    onClick={(e) => e.stopPropagation()}
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
    </div>
  );
};

export default TeamList;