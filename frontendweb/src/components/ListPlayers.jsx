import React, { useEffect, useState } from "react";
import "../CSS/ListRelatorios.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

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
      alert("Selecione pelo menos um jogador para excluir.");
      return;
    }

    Swal.fire({
      title: "Tem certeza?",
      text: "Os dados serão excluídos permanentemente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Avançar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete("http://localhost:3000/api/players/delete", {
            data: { playersIds: selectedPlayers },
          });

          console.log("✅ Jogadores excluídos:", response.data);

          setPlayers(players.filter((p) => !selectedPlayers.includes(p.ID_JOGADORES)));
          setSelectedPlayers([]);
          setSelectMode(false);

          Swal.fire("Excluído!", "Os jogadores foram excluídos com sucesso.", "success");
        } catch (error) {
          console.error("❌ Erro ao excluir jogadores:", error);
          Swal.fire("Erro!", "Não foi possível excluir os jogadores.", "error");
        }
      }
    });
  };

  const getStars = (nota) => {
    const stars = "★".repeat(nota) + "☆".repeat(5 - nota);
    return <span className="stars">{stars}</span>;
  };

  return (
    <div className="list-players-container">
      {/* Barra de pesquisa */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Escreva o nome do jogador"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-btn">Search</button>
      </div>

      {/* Botão de adicionar */}
      <button className="list-players-add-btn" onClick={() => navigate("/players/new")}>
        Adicionar Jogador
      </button>

      {/* Botão de seleção/eliminação */}
      <button className={`list-players-delete-btn ${selectMode ? "active" : ""}`} onClick={toggleSelectMode}>
        {selectMode ? "Cancelar" : "Selecionar para Eliminar"}
      </button>
      {selectMode && (
        <button className="confirm-delete-btn" onClick={deleteSelected}>
          Confirmar Eliminação
        </button>
      )}

      {/* Tabela de jogadores */}
      <div className="list-players-scroll-container">
      <table className="list-players-table">
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
            <th>Estado</th> {/* Nova coluna para o estado */}
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
                <td>{getStars(player.NOTA_ADM)}</td>
                <td>{player.GENERO}</td>
                <td>{player.DATA_NASC ? new Date(player.DATA_NASC).getFullYear() : "--"}</td>
                <td>{player.NACIONALIDADE}</td>
                <td>
                  {player.STATUS === "Inactive" && (
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        backgroundColor: "yellow",
                        display: "inline-block",
                      }}
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