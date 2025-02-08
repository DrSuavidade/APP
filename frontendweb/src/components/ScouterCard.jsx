import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTrash, FaPlus, FaTimes } from "react-icons/fa";
import "../CSS/ScouterCard.css";

function ScouterCard({ onSelectScouter, onToggleUsers }) {
  const [scouters, setScouters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedScouters, setSelectedScouters] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [hasAutoSelected, setHasAutoSelected] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Scoutters"); 
  const navigate = useNavigate();
  const [activeScouter, setActiveScouter] = useState(null);

  useEffect(() => {
    const fetchScouters = async () => {
      try {
        const response = await axios.get("https://backendscout-cx6c.onrender.com/api/users/tipo/3");
        const sortedUsers = response.data.sort((a, b) => (b.ID_TIPO === 3 ? 1 : -1));
        setScouters(sortedUsers);

        if (!hasAutoSelected && sortedUsers.length > 0) {
          onSelectScouter(sortedUsers[0]);
          setHasAutoSelected(true);
        }
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchScouters();
  }, [onSelectScouter, hasAutoSelected]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddScouter = () => {
    navigate("/scouts/new");
  };

  const handleSelectScouter = (scouterId, scouter) => {
    if (showCheckboxes) {
        setSelectedScouters((prevSelected) =>
            prevSelected.includes(scouterId)
                ? prevSelected.filter((id) => id !== scouterId)
                : [...prevSelected, scouterId]
        );
    } else {
        setActiveScouter(scouterId); // Define o scouter ativo
        onSelectScouter(scouter);
    }
};

  const handleDelete = async () => {
    if (!showCheckboxes) {
      setShowCheckboxes(true);
      return;
    }

    if (selectedScouters.length === 0) {
      Swal.fire("Erro", "Selecione pelo menos um usuário para excluir.", "error");
      return;
    }

    Swal.fire({
      title: "Tem certeza?",
      text: "Os usuários selecionados serão excluídos permanentemente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete("https://backendscout-cx6c.onrender.com/api/users/delete-multiple", {
            data: { userIds: selectedScouters }
          });

          setScouters(scouters.filter((scouter) => !selectedScouters.includes(scouter.ID_USER)));
          setSelectedScouters([]);
          setShowCheckboxes(false);

          Swal.fire("Excluído!", "Os usuários foram removidos com sucesso.", "success");
        } catch (error) {
          console.error("Erro ao deletar usuários:", error);
          Swal.fire("Erro!", "Não foi possível excluir os usuários.", "error");
        }
      }
    });
  };

  // Função para alternar entre "Scoutters" e "Users"
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    onToggleUsers(filter === "Users"); // Define `true` se "Users" for selecionado
  };

  const filteredUsers = selectedFilter === "Scoutters"
    ? scouters.filter((user) => user.ID_TIPO === 3)
    : scouters.filter((user) => user.ID_TIPO !== 3);

  return (
    <div className="scouter-list-container">
      <div className="scouter-toolbar">
        <div className="scouter-search-container">
          <input
            type="text"
            placeholder="Pesquisar usuário"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="scouter-filter-buttons">
          <button
            className={`filter-button ${selectedFilter === "Scoutters" ? "active" : ""}`}
            onClick={() => handleFilterChange("Scoutters")}
          >
            Scoutters
          </button>
          <button
            className={`filter-button ${selectedFilter === "Users" ? "active" : ""}`}
            onClick={() => handleFilterChange("Users")}
          >
            Users
          </button>
        </div>

        <div className="scouter-buttons-container">
          <div className="scouter-icons-container">
            <FaTrash className="icon trash" onClick={handleDelete} />
            <FaPlus className="icon add" onClick={handleAddScouter} />
            {showCheckboxes && <FaTimes className="icon cancel" onClick={() => setShowCheckboxes(false)} />}
          </div>
        </div>
      </div>

      <div className="scouter-list">
        {filteredUsers
          .filter((scouter) => scouter.NOME.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((scouter) => (
            <div
              key={scouter.ID_USER}
              className={`scouter-card ${activeScouter === scouter.ID_USER ? "selected" : ""}`}
              onClick={() => handleSelectScouter(scouter.ID_USER, scouter)}
            >
              <div className="scouter-avatar"></div>
              <div className="scouter-info">
                <span className="name">{scouter.NOME}</span>
                <span className="role">
                  {scouter.ID_TIPO === 3 ? "Scouter" : scouter.ID_TIPO === 2 ? "Admin" : "Viewer"}
                </span>
              </div>
              {showCheckboxes && (
                <input
                  type="checkbox"
                  checked={selectedScouters.includes(scouter.ID_USER)}
                  onChange={() => handleSelectScouter(scouter.ID_USER, scouter)}
                  className="scouter-checkbox"
                />
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default ScouterCard;
