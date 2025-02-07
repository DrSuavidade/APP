import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTrash, FaPlus, FaTimes } from "react-icons/fa";
import "../CSS/ScouterCard.css";

function ScouterCard({ onSelectScouter }) {
  const [scouters, setScouters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedScouters, setSelectedScouters] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);

  useEffect(() => {
    const fetchScouters = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users/tipo/3"); // Endpoint correto do UserController
        setScouters(response.data);
      } catch (error) {
        console.error("Erro ao buscar scouters:", error);
      }
    };

    fetchScouters();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleScouterSelection = (scouterId) => {
    setSelectedScouters((prevSelected) =>
      prevSelected.includes(scouterId)
        ? prevSelected.filter((id) => id !== scouterId)
        : [...prevSelected, scouterId]
    );
  };

  const handleDelete = async () => {
    if (!showCheckboxes) {
      setShowCheckboxes(true);
      return;
    }

    if (selectedScouters.length === 0) {
      Swal.fire("Erro", "Selecione pelo menos um scouter para excluir.", "error");
      return;
    }

    Swal.fire({
      title: "Tem certeza?",
      text: "Os scouters selecionados serão excluídos permanentemente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete("http://localhost:3000/api/users/delete-multiple", {
            data: { userIds: selectedScouters }
          });

          setScouters(scouters.filter((scouter) => !selectedScouters.includes(scouter.ID_USER)));
          setSelectedScouters([]);
          setShowCheckboxes(false);

          Swal.fire("Excluído!", "Os scouters foram removidos com sucesso.", "success");
        } catch (error) {
          console.error("Erro ao deletar scouters:", error);
          Swal.fire("Erro!", "Não foi possível excluir os scouters.", "error");
        }
      }
    });
  };

  const handleCancelSelection = () => {
    setSelectedScouters([]);
    setShowCheckboxes(false);
  };

  const handleScouterClick = (scouter) => {
    onSelectScouter(scouter);
  };

  return (
    <div className="scouter-list-container">
      {/* Barra de Pesquisa e Botões */}
      <div className="scouter-toolbar">
        <div className="scouter-search-container">
          <input
            type="text"
            placeholder="Pesquisar scouter"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="scouter-buttons-container">
          <div className="scouter-icons-container">
            <FaTrash className="icon trash" onClick={handleDelete} />
            <FaPlus className="icon add" onClick={() => Swal.fire("Adicionar Scouter", "Funcionalidade a implementar.", "info")} />
            {showCheckboxes && <FaTimes className="icon cancel" onClick={handleCancelSelection} />}
          </div>
        </div>
      </div>

      {/* Lista de Scouters */}
      <div className="scouter-list">
        {scouters
          .filter((scouter) => scouter.NOME.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((scouter) => (
            <div
              key={scouter.ID_USER}
              className={`scouter-card ${showCheckboxes && selectedScouters.includes(scouter.ID_USER) ? "selected" : ""}`}
              onClick={() => !showCheckboxes && handleScouterClick(scouter)}
            >
              {showCheckboxes ? (
                <input
                  type="checkbox"
                  checked={selectedScouters.includes(scouter.ID_USER)}
                  onChange={() => toggleScouterSelection(scouter.ID_USER)}
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <div className="scouter-avatar"></div>
              )}
              <div className="scouter-info">
                <span className="name">{scouter.NOME}</span>
                <span className="role">Scouter</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ScouterCard;
