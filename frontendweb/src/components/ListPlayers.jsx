import React, { useEffect, useState } from "react";
import "../CSS/ListRelatorios.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaPlus, FaTimes } from "react-icons/fa";
import Cookies from "js-cookie";

const ListPlayers = ({ onSelectPlayer, onPlayersLoaded }) => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectMode, setSelectMode] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [userType, setUserType] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "ascending" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(
          "https://backendscout-cx6c.onrender.com/api/all-players"
        );
        console.log("📌 Jogadores recebidos:", response.data);
        setPlayers(response.data);

        if (onPlayersLoaded && players.length === 0) {
          onPlayersLoaded(response.data);
        }
      } catch (error) {
        console.error("❌ Erro ao buscar jogadores:", error);
      }
    };

    fetchPlayers();

    const ID_TIPO = Cookies.get("ID_TIPO");
    setUserType(ID_TIPO);
  }, [onPlayersLoaded, players.length]);

  useEffect(() => {
    console.log("Players atualizados:", players); // Log para depuração
  }, [players]);

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
      Swal.fire(
        "Erro",
        "Selecione pelo menos um jogador para excluir.",
        "error"
      );
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
          await axios.delete("https://backendscout-cx6c.onrender.com/api/players/delete", {
            data: { playersIds: selectedPlayers },
          });

          setPlayers(
            players.filter((p) => !selectedPlayers.includes(p.ID_JOGADORES))
          );
          setSelectedPlayers([]);
          setSelectMode(false);

          Swal.fire(
            "Excluído!",
            "Os jogadores foram removidos com sucesso.",
            "success"
          );
        } catch (error) {
          console.error("❌ Erro ao excluir jogadores:", error);
          Swal.fire("Erro!", "Não foi possível excluir os jogadores.", "error");
        }
      }
    });
  };

  const getStars = (nota) => {
    return (
      <span className="stars">
        <span className="filled-star">{"★".repeat(nota)}</span>
        <span className="gray-stars">{"★".repeat(5 - nota)}</span>
      </span>
    );
  };

  const handleSort = (key) => {
    console.log("handleSort chamado com a chave:", key); // Log para depuração

    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    console.log("Ordenando por:", key, "Direção:", direction); // Log para depuração

    setPlayers((prevPlayers) => {
      const sortedPlayers = [...prevPlayers].sort((a, b) => {
        // Verifique se as chaves existem e são válidas
        if (a[key] === undefined || b[key] === undefined) {
          console.warn(`Chave "${key}" não encontrada ou inválida em algum objeto.`);
          return 0;
        }

        // Tratamento especial para datas e números
        let valueA = a[key];
        let valueB = b[key];

        if (key === "DATA_NASC") {
          // Converte datas para timestamps para comparação
          valueA = new Date(valueA).getTime();
          valueB = new Date(valueB).getTime();
        } else if (key === "NOTA_ADM") {
          // Garante que as notas sejam números
          valueA = Number(valueA);
          valueB = Number(valueB);
        }

        if (valueA < valueB) {
          return direction === "ascending" ? -1 : 1;
        }
        if (valueA > valueB) {
          return direction === "ascending" ? 1 : -1;
        }
        return 0;
      });

      console.log("Jogadores ordenados:", sortedPlayers); // Log para depuração
      return sortedPlayers;
    });
  };

  return (
    <div className="list-players-container">
      {console.log("Tabela re-renderizada")}
      <div className="lista-eventos-toolbar">
        <div className="lista-eventos-search-container">
          <input
            type="text"
            placeholder="Pesquisar jogador"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {userType !== "1" && (
          <div className="lista-eventos-buttons-container">
            <div className="lista-eventos-icons-container">
              <FaTrash
                className="icon trash"
                onClick={selectMode ? deleteSelected : toggleSelectMode}
              />
              <FaPlus
                className="icon add"
                onClick={() => navigate("/players/new")}
              />
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
        )}
      </div>

      <div className="lista-eventos-scroll-container">
        <table className="lista-eventos-table">
          <thead>
            <tr>
              {selectMode && <th></th>}
              <th onClick={() => handleSort("ID_JOGADORES")}>ID</th>
              <th onClick={() => handleSort("NOME")}>Nome</th>
              <th onClick={() => handleSort("ABREVIATURA_CLUBE")}>Clube</th>
              <th onClick={() => handleSort("NOTA_ADM")}>Avaliação</th>
              <th onClick={() => handleSort("GENERO")}>Gênero</th>
              <th onClick={() => handleSort("DATA_NASC")}>Ano Nasc.</th>
              <th onClick={() => handleSort("NACIONALIDADE")}>Nacionalidade</th>
              <th onClick={() => handleSort("STATUS")}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {players
              .filter((p) =>
                p.NOME.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((player) => (
                <tr
                  key={player.ID_JOGADORES}
                  onClick={() => onSelectPlayer(player.ID_JOGADORES)}
                >
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
                  <td>{getStars(player.NOTA_ADM || 0)}</td>
                  <td>{player.GENERO}</td>
                  <td>
                    {player.DATA_NASC
                      ? new Date(player.DATA_NASC).getFullYear()
                      : "--"}
                  </td>
                  <td>{player.NACIONALIDADE}</td>
                  <td>
                    {player.STATUS === "Active" ? (
                      <div
                        className="status-circle"
                        data-tooltip="Active"
                        style={{ backgroundColor: "green" }}
                      ></div>
                    ) : player.STATUS === "Inactive" ? (
                      <div
                        className="status-circle"
                        data-tooltip="Inactive"
                        style={{ backgroundColor: "yellow" }}
                      ></div>
                    ) : (
                      <div
                        className="status-circle"
                        data-tooltip="Unknown"
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