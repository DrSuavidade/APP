import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTrash, FaPlus, FaTimes } from "react-icons/fa";
import "../CSS/ScouterCard.css";

function ScouterCard({ onSelectScouter }) {
  const [scouters, setScouters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedScouters, setSelectedScouters] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScouters = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users/tipo/3");
        const sortedUsers = response.data.sort((a, b) => (b.ID_TIPO === 3 ? 1 : -1));
        setScouters(sortedUsers);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchScouters();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddScouter = () => {
    navigate("/scouts/new");
  };

  const handleSelectScouter = (scouterId, scouter) => {
    if (showCheckboxes) {
      // Se showCheckboxes estiver ativo, permite selecionar ou desmarcar
      setSelectedScouters((prevSelected) =>
        prevSelected.includes(scouterId)
          ? prevSelected.filter((id) => id !== scouterId)
          : [...prevSelected, scouterId]
      );
    } else {
      // Comportamento original: envia o ID do scouter
      onSelectScouter(scouter);
    }
  };

  const handleDelete = async () => {
    if (!showCheckboxes) {
      setShowCheckboxes(true); // Ativa o modo de seleção
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
          await axios.delete("http://localhost:3000/api/users/delete-multiple", {
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

  return (
    <div className="scouter-list-container">
      {/* Barra de Pesquisa e Botões */}
      <div className="scouter-toolbar">
        <div className="scouter-search-container">
          <input
            type="text"
            placeholder="Pesquisar usuário"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="scouter-buttons-container">
          <div className="scouter-icons-container">
            <FaTrash className="icon trash" onClick={handleDelete} />
            <FaPlus className="icon add" onClick={handleAddScouter} />
            {showCheckboxes && <FaTimes className="icon cancel" onClick={() => setShowCheckboxes(false)} />}
          </div>
        </div>
      </div>

      {/* Lista de Usuários */}
      <div className="scouter-list">
        {scouters
          .filter((scouter) => scouter.NOME.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((scouter) => (
            <div
              key={scouter.ID_USER}
              className="scouter-card"
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
