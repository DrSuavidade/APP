import React, { useState, useEffect } from "react";
import api from "../api/axios"; // Axios instance for backend calls
import "../CSS/plantel.css";

const Plantel = () => {
  const [positions, setPositions] = useState({}); // Store positions by row
  const [selectedPosition, setSelectedPosition] = useState(null); // Store clicked position
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar visibility
  const [players, setPlayers] = useState([]); // Players related to selected position
  const [allPlayers, setAllPlayers] = useState([]); // List of all players for adding
  const [isAddingPlayer, setIsAddingPlayer] = useState(false); // Toggle between views
  const [selectedPlayer, setSelectedPlayer] = useState(null); // Store clicked player
  const [playerDetails, setPlayerDetails] = useState(null); // Store detailed player info
  const [shadowTeams, setShadowTeams] = useState([]); // Store all teams for the user
  const [selectedShadowTeam, setSelectedShadowTeam] = useState(1); // Default to ID_SOMBRA = 1
  const [selectedFormation, setSelectedFormation] = useState("2-5-5-5"); // Default


  const fetchPositions = async () => {
    try {
      const response = await api.get("/posicao/list");
      const positionsList = response.data;
  
      let formation = {};
  
      if (selectedFormation === "2-5-5-5") {
        formation = {
          row1: positionsList.filter(p => ["Avancado", "Avancado2", "Avancado3"].includes(p.NOME)),
          row2: positionsList.filter(p => ["Avancado4", "Avancado5"].includes(p.NOME)),
          row3: positionsList.filter(p => ["Medio", "Medio2", "Medio3"].includes(p.NOME)),
          row4: positionsList.filter(p => ["Medio4", "Medio5"].includes(p.NOME)),
          row5: positionsList.filter(p => ["Defesa", "Defesa2"].includes(p.NOME)),
          row6: positionsList.filter(p => ["Defesa3", "Defesa4", "Defesa5"].includes(p.NOME)),
          row7: positionsList.filter(p => p.NOME.includes("GuardaRedes")),
        };
      } else if (selectedFormation === "1-4-4-2") {
        formation = {
          row1: positionsList.filter(p => ["Avancado", "Avancado2"].includes(p.NOME)),
          row2: positionsList.filter(p => ["Medio", "Medio2"].includes(p.NOME)),
          row3: positionsList.filter(p => ["Medio3", "Medio4"].includes(p.NOME)),
          row4: positionsList.filter(p => ["Defesa", "Defesa2"].includes(p.NOME)),
          row5: positionsList.filter(p => ["Defesa3", "Defesa4"].includes(p.NOME)),
          row6: positionsList.filter(p => ["GuardaRedes"].includes(p.NOME)),
        };
      } else if (selectedFormation === "1-5-4-1") {
        formation = {
          row1: positionsList.filter(p => ["Avancado"].includes(p.NOME)),
          row2: positionsList.filter(p => ["Medio", "Medio2"].includes(p.NOME)),
          row3: positionsList.filter(p => ["Medio3", "Medio4"].includes(p.NOME)),
          row4: positionsList.filter(p => ["Defesa", "Defesa2", "Defesa3"].includes(p.NOME)),
          row5: positionsList.filter(p => ["Defesa4", "Defesa5"].includes(p.NOME)),
          row6: positionsList.filter(p => ["GuardaRedes"].includes(p.NOME)),
        };
      }
  
      setPositions(formation);
    } catch (error) {
      console.error("Error fetching positions:", error);
    }
  };
  
  // Use useEffect to trigger fetchPositions when selectedFormation changes
  useEffect(() => {
    fetchPositions();
  }, [selectedFormation]);
  
  

  // Define fetchShadowTeams outside of useEffect so it can be reused
  const fetchShadowTeams = async () => {
    try {
      const response = await api.get("/sombra/listByUser?ID_USER=1");
      setShadowTeams(response.data);
    } catch (error) {
      console.error("Erro ao buscar equipas sombra:", error);
    }
  };

  useEffect(() => {
    fetchShadowTeams(); // Call it inside useEffect
  }, []);

  // Fetch players for the selected position
  const fetchPlayersForPosition = async (ID_POSICAO) => {
    try {
      const response = await api.get(
        `/resombra/posicao/list?ID_SOMBRA=${selectedShadowTeam}&ID_POSICAO=${ID_POSICAO}`
      );
      setPlayers(response.data);
    } catch (error) {
      console.error("Error fetching players:", error);
      setPlayers([]);
    }
  };

  // Fetch player details when a player is clicked
  const fetchPlayerDetails = async (player) => {
    try {
      const response = await api.get(`/jogador/details/${player.ID_JOGADORES}`);
      setPlayerDetails(response.data);
    } catch (error) {
      console.error("Error fetching player details:", error);
      setPlayerDetails(null);
    }
  };

  // Handle player selection and show details
  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
    fetchPlayerDetails(player);
  };

  // Fetch all players for adding
  const fetchAllPlayers = async () => {
    try {
      const response = await api.get("/jogador/list");
      setAllPlayers(response.data);
    } catch (error) {
      console.error("Error fetching all players:", error);
      setAllPlayers([]);
    }
  };

  // Handle player selection and add to RELACAOSOMBRA
  const addPlayerToPosition = async (player) => {
    if (!selectedPosition) return;

    try {
      const response = await api.post("/resombra/add", {
        ID_POSICAO: selectedPosition.ID_POSICAO,
        ID_JOGADORES: player.ID_JOGADORES,
        ID_SOMBRA: selectedShadowTeam,
      });

      if (response.status === 201) {
        fetchPlayersForPosition(selectedPosition.ID_POSICAO);
        setIsAddingPlayer(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(
          "Este jogador já está atribuído a esta posição para esta equipe sombra."
        );
      } else {
        console.error("Erro ao adicionar jogador à posição:", error);
      }
    }
  };

  const removePlayerFromPosition = async (player) => {
    if (!selectedPosition) return;

    try {
      await api.delete("/resombra/remove", {
        data: {
          ID_POSICAO: selectedPosition.ID_POSICAO,
          ID_JOGADORES: player.ID_JOGADORES,
          ID_SOMBRA: selectedShadowTeam,
        },
      });

      // Refresh the player list after removal
      fetchPlayersForPosition(selectedPosition.ID_POSICAO);
    } catch (error) {
      console.error("Erro ao remover jogador da posição:", error);
    }
  };

  const addNewShadowTeam = async () => {
    const teamName = prompt("Digite o nome da nova Equipa Sombra:");
    if (!teamName) return; // If the user cancels, do nothing

    try {
      const response = await api.post("/sombra/add", {
        ID_USER: 1, // Logged user ID (static for testing)
        NOME: teamName,
      });

      if (response.status === 201) {
        fetchShadowTeams(); // Refresh the dropdown after adding
      }
    } catch (error) {
      console.error("Erro ao adicionar nova equipa sombra:", error);
    }
  };

  const deleteShadowTeam = async () => {
    if (!selectedShadowTeam) return;
  
    const confirmDelete = window.confirm("Tem certeza que deseja remover esta Equipa Sombra?");
    if (!confirmDelete) return;
  
    try {
      await api.delete(`/sombra/delete/${selectedShadowTeam}`);
  
      // Refresh the list after deletion
      fetchShadowTeams();
  
      // If the deleted team was selected, switch to another one
      if (shadowTeams.length > 1) {
        setSelectedShadowTeam(shadowTeams[0].ID_SOMBRA);
      } else {
        setSelectedShadowTeam(null);
      }
  
      setSidebarOpen(false); // Hide the sidebar
    } catch (error) {
      console.error("Erro ao remover equipa sombra:", error);
    }
  };
  

  // Toggle the sidebar content
  const toggleSidebar = (position) => {
    if (
      selectedPosition &&
      selectedPosition.ID_POSICAO === position.ID_POSICAO
    ) {
      setSidebarOpen(false);
      setSelectedPosition(null);
      setPlayers([]);
      setIsAddingPlayer(false);
      setSelectedPlayer(null);
    } else {
      setSelectedPosition(position);
      setSidebarOpen(true);
      fetchPlayersForPosition(position.ID_POSICAO);
    }
  };

  const getPositionColor = (positionName) => {
    if (positionName.includes("GuardaRedes")) return "blue";
    if (positionName.includes("Defesa")) return "red";
    if (positionName.includes("Medio")) return "yellow";
    if (positionName.includes("Avancado")) return "green";
    return "gray";
  };

  return (
    <div className="plantel-container">
      {/* Field with positions */}
      <div className={`field ${sidebarOpen ? "shifted" : ""}`}>
  {Object.keys(positions).map((rowKey, rowIndex) => (
    <div 
      key={rowIndex} 
      className={`row f-${selectedFormation}-row-${rowIndex}`} // Apply dynamic class
    >
      {positions[rowKey]?.map(position => (
        <div
          key={position.ID_POSICAO}
          className="square"
          onClick={() => toggleSidebar(position)}
          style={{ backgroundColor: getPositionColor(position.NOME) }}
        >
          {position.NOME}
        </div>
      ))}
    </div>
  ))}
</div>


      {/* Dropdown for EquipaSombra (Outside the field to prevent shifting) */}
      <div className="shadow-team-selector">
  <label htmlFor="teamSelect">Equipa Sombra:</label>
  <select
    id="teamSelect"
    value={selectedShadowTeam}
    onChange={(e) => {
      setSelectedShadowTeam(Number(e.target.value));
      setSidebarOpen(false);
      setSelectedPosition(null);
      setPlayers([]);
    }}
  >
    {shadowTeams.map(team => (
      <option key={team.ID_SOMBRA} value={team.ID_SOMBRA}>
        {team.NOME}
      </option>
    ))}
  </select>

  {/* Add and Delete Buttons */}
  <button className="add-shadow-team-btn" onClick={addNewShadowTeam}>+</button>
  <button className="delete-shadow-team-btn" onClick={deleteShadowTeam}>🗑</button>
</div>
            
<div className="formation-selector">
  <label>Formação:</label>
  <select
    value={selectedFormation}
    onChange={(e) => {
      setSelectedFormation(e.target.value);
      fetchPositions(); // Refresh positions based on new formation
    }}
  >
    <option value="2-5-5-5">2-5-5-5</option>
    <option value="1-4-4-2">1-4-4-2</option>
    <option value="1-5-4-1">1-5-4-1</option>
  </select>
</div>



      {sidebarOpen && (
        <div className="sidebar open">
          {selectedPosition && !isAddingPlayer && !selectedPlayer ? (
            <>
              <h2>{selectedPosition.NOME}</h2>
              <h3>Jogadores nesta posição:</h3>
              <div className="player-list">
                {players.length > 0 ? (
                  players.map((player) => (
                    <div
                      key={player.ID_JOGADORES}
                      className="player-card"
                      onClick={() => handlePlayerClick(player)}
                    >
                      <div className="player-info">
                        <div className="player-avatar">👤</div>
                        <div className="player-details">
                          <h3>{player.NOME}</h3>
                          <p>Nacionalidade: {player.NACIONALIDADE}</p>
                          <p>Status: {player.STATUS}</p>
                        </div>
                      </div>
                      <button
                        className="remove-btn"
                        onClick={() => removePlayerFromPosition(player)}
                      >
                        ✖
                      </button>
                    </div>
                  ))
                ) : (
                  <p>Nenhum jogador encontrado.</p>
                )}
              </div>
              <button
                className="add-btn"
                onClick={() => {
                  setIsAddingPlayer(true);
                  fetchAllPlayers();
                }}
              >
                Adicionar
              </button>
            </>
          ) : selectedPosition && isAddingPlayer ? (
            <>
              <h2>Escolha um Jogador</h2>
              <div className="player-list">
                {allPlayers.length > 0 ? (
                  allPlayers.map((player) => (
                    <div
                      key={player.ID_JOGADORES}
                      className="player-card"
                      onClick={() => addPlayerToPosition(player)}
                    >
                      <div className="player-info">
                        <div className="player-avatar">👤</div>
                        <div className="player-details">
                          <h3>{player.NOME}</h3>
                          <p>Nacionalidade: {player.NACIONALIDADE}</p>
                          <p>Status: {player.STATUS}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Nenhum jogador disponível.</p>
                )}
              </div>
              <button
                className="close-btn"
                onClick={() => setIsAddingPlayer(false)}
              >
                Cancelar
              </button>
            </>
          ) : selectedPlayer && playerDetails ? (
            <>
              <button
                className="back-btn"
                onClick={() => setSelectedPlayer(null)}
              >
                ← Voltar
              </button>
              <div className="player-header">
                <div className="player-avatar-large">👤</div>
                <div>
                  <h2>{playerDetails.jogador.NOME}</h2>
                  <p>
                    Nascimento:{" "}
                    {new Date(
                      playerDetails.jogador.DATA_NASC
                    ).toLocaleDateString()}
                  </p>
                  <p>Nota Adm: {playerDetails.jogador.NOTA_ADM}</p>
                </div>
              </div>
              <h3>Características</h3>
              <div className="player-stats">
                <p>
                  <strong>Técnica:</strong> {playerDetails.stats.tecnica || 0}/4
                </p>
                <p>
                  <strong>Velocidade:</strong>{" "}
                  {playerDetails.stats.velocidade || 0}/4
                </p>
                <p>
                  <strong>Competitiva:</strong>{" "}
                  {playerDetails.stats.competitiva || 0}/4
                </p>
                <p>
                  <strong>Inteligência:</strong>{" "}
                  {playerDetails.stats.inteligencia || 0}/4
                </p>
                <p>
                  <strong>Altura:</strong>{" "}
                  {playerDetails.stats.altura || "Não disponível"}
                </p>
                <p>
                  <strong>Morfologia:</strong>{" "}
                  {playerDetails.stats.morfologia || "Não disponível"}
                </p>
              </div>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Plantel;
