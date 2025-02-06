import React, { useEffect, useState } from "react";
import "../CSS/ListRelatorios.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaPlus, FaTimes } from "react-icons/fa";

const ListPlayers = ({ onSelectPlayer, onPlayersLoaded }) => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectMode, setSelectMode] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/all-players");
        console.log("📌 Jogadores recebidos:", response.data);
        setPlayers(response.data);

        // Chama a função onPlayersLoaded apenas na primeira carga
        if (onPlayersLoaded && players.length === 0) {
          onPlayersLoaded(response.data);
        }
      } catch (error) {
        console.error("❌ Erro ao buscar jogadores:", error);
      }
    };

    fetchPlayers();
  }, [onPlayersLoaded, players.length]);

  const toggleSelectMode = () => {
    setSelectMode(!selectMode);
    if (!selectMode) {
      setSelectedPlayers([]);
    }
  };

  const toggleSelection = (id) => {
    if (selectedPlayers.includes(id)) {
      setSelectedPlayers(selectedPlayers.filter((p) => p !== id));
    } else {
      setSelectedPlayers([...selectedPlayers, id]);
    }
  };

  const deleteSelected = async () => {
    if (selectedPlayers.length === 0) {
      Swal.fire("Erro", "Selecione pelo menos um jogador para excluir.", "error");
      return;
    }

    Swal.fire({
      title: "Tem certeza?",
      text: "Os jogadores serão excluídos permanentemente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete("http://localhost:3000/api/players/delete", {
            data: { playersIds: selectedPlayers },
          });

          setPlayers(players.filter((p) => !selectedPlayers.includes(p.ID_JOGADORES)));
          setSelectedPlayers([]);
          setSelectMode(false);

          Swal.fire("Excluído!", "Os jogadores foram removidos com sucesso.", "success");
        } catch (error) {
          console.error("❌ Erro ao excluir jogadores:", error);
          Swal.fire("Erro!", "Não foi possível excluir os jogadores.", "error");
        }
      }
    });
  };

  return (
    <div className="list-players-container">
      {/* Barra de pesquisa e botões */}
      <div className="lista-eventos-toolbar">
        <div className="lista-eventos-search-container">
          <input
            type="text"
            placeholder="Pesquisar jogador"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="lista-eventos-buttons-container">
          <div className="lista-eventos-icons-container">
            <FaTrash
              className="icon trash"
              onClick={selectMode ? deleteSelected : toggleSelectMode}
            />
            <FaPlus className="icon add" onClick={() => navigate("/players/new")} />
            {selectMode && (
              <FaTimes
                className="icon cancel"
                onClick={() => {
                  setSelectMode(false);
                  setSelectedPlayers([]);
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Tabela de jogadores */}
      <div className="lista-eventos-scroll-container">
        <table className="lista-eventos-table">
          <thead>
            <tr>
              {selectMode && <th></th>}
              <th>ID</th>
              <th>Nome</th>
              <th>Clube</th>
              <th>Avaliação</th>
              <th>Gênero</th>
              <th>Ano Nasc.</th>
              <th>Nacionalidade</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {players
              .filter((p) => p.NOME.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((player) => (
                <tr key={player.ID_JOGADORES} onClick={() => onSelectPlayer(player.ID_JOGADORES)}>
                  {selectMode && (
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedPlayers.includes(player.ID_JOGADORES)}
                        onChange={() => toggleSelection(player.ID_JOGADORES)}
                      />
                    </td>
                  )}
                  <td>{player.ID_JOGADORES}</td>
                  <td>{player.NOME}</td>
                  <td>{player.ABREVIATURA_CLUBE || "--"}</td>
                  <td>★ ★ ★ ★ ★</td>
                  <td>{player.GENERO}</td>
                  <td>{player.DATA_NASC ? new Date(player.DATA_NASC).getFullYear() : "--"}</td>
                  <td>{player.NACIONALIDADE}</td>
                  <td>
                    {player.STATUS === "Active" ? (
                      <div
                        className="status-circle"
                        style={{ backgroundColor: "green" }}
                      ></div>
                    ) : player.STATUS === "Inactive" ? (
                      <div
                        className="status-circle"
                        style={{ backgroundColor: "yellow" }}
                      ></div>
                    ) : (
                      <div
                        className="status-circle"
                        style={{ backgroundColor: "red" }}
                      ></div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListPlayers;