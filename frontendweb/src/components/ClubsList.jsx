import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaPlus, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ClubsList = ({ setSelectedClub }) => { // Adicionado setSelectedClub como prop
  const [clubes, setClubes] = useState([]);
  const [erro, setErro] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClubes, setSelectedClubes] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClubes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/clubes/com-equipas");
        setClubes(response.data);
      } catch (error) {
        console.error("Erro ao buscar clubes:", error);
        setErro("Erro ao buscar clubes");
      }
    };

    fetchClubes();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleClubeSelection = (clubeId) => {
    setSelectedClubes((prevSelected) =>
      prevSelected.includes(clubeId)
        ? prevSelected.filter((id) => id !== clubeId)
        : [...prevSelected, clubeId]
    );
  };

  const handleDelete = async () => {
    if (!showCheckboxes) {
      setShowCheckboxes(true);
      return;
    }

    if (selectedClubes.length === 0) {
      Swal.fire("Erro", "Selecione pelo menos um clube para excluir.", "error");
      return;
    }

    Swal.fire({
      title: "Tem certeza?",
      text: "Os clubes selecionados serão excluídos permanentemente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete('http://localhost:3000/api/clubes/delete-multiple', {
            data: { clubesIds: selectedClubes }
          });

          setClubes(clubes.filter((clube) => !selectedClubes.includes(clube.id_clube)));
          setSelectedClubes([]);
          setShowCheckboxes(false);

          Swal.fire("Excluído!", "Os clubes foram removidos com sucesso.", "success");
        } catch (error) {
          console.error('Erro ao deletar clubes:', error);
          Swal.fire("Erro!", "Não foi possível excluir os clubes.", "error");
        }
      }
    });
  };

  const handleCancelSelection = () => {
    setSelectedClubes([]);
    setShowCheckboxes(false);
  };

  // Função para lidar com o clique em um clube
  const handleClubClick = (clube) => {
    setSelectedClub(clube); // Atualiza o clube selecionado
  };

  const filteredClubes = clubes.filter((clube) =>
    clube.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="left-menu">
      <h2>Clubes</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Pesquisar clube"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="search-btn">Pesquisar</button>
      </div>

      <div className="toolbar">
        <FaTrash className="icon trash" onClick={handleDelete} />
        {showCheckboxes && <FaTimes className="icon cancel" onClick={handleCancelSelection} />}
        <FaPlus className="icon add" onClick={() => navigate('/team/add-club')} />
      </div>

      <div className="team-header">
        <span>ID Clube</span>
        <span>Nome Clube</span>
        <span>Abreviatura</span>
        <span>Nº Equipas</span>
      </div>
      <ul className="team-list">
        {erro ? (
          <p className="error-message">Erro: {erro}</p>
        ) : (
          filteredClubes.map((clube, index) => (
            <li key={index} className="team-item" onClick={() => handleClubClick(clube)}> {/* Adiciona o clique aqui */}
              {showCheckboxes && (
                <input
                  type="checkbox"
                  checked={selectedClubes.includes(clube.id_clube)}
                  onChange={() => toggleClubeSelection(clube.id_clube)}
                />
              )}
              <span>{clube.id_clube}</span>
              <span>{clube.nome}</span>
              <span>{clube.abreviatura}</span>
              <span>{clube.totalEquipas}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ClubsList;