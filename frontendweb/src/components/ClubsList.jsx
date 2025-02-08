import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaPlus, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Cookies from "js-cookie";
import { FaCheck } from 'react-icons/fa';

const ClubsList = ({ setSelectedClub }) => {
  const [clubes, setClubes] = useState([]);
  const [erro, setErro] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClubes, setSelectedClubes] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [favoriteClubes, setFavoriteClubes] = useState([]);
  const [isFavoriteMode, setIsFavoriteMode] = useState(false);
  const [userType, setUserType] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "ascending" }); // Estado para ordenação
  const navigate = useNavigate();

  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const storedID = Cookies.get("ID_USER");
    setUserID(storedID);

    const ID_TIPO = Cookies.get("ID_TIPO");
    setUserType(ID_TIPO);
  }, []);

  useEffect(() => {
    const fetchClubes = async () => {
      try {
        const response = await axios.get("https://backendscout-cx6c.onrender.com/api/clubes/com-equipas");
        setClubes(response.data);
        if (response.data.length > 0) {
          setSelectedClub(response.data[0]);
        }
      } catch (error) {
        console.error("Erro ao buscar clubes:", error);
        setErro("Erro ao buscar clubes");
      }
    };

    const fetchFavoriteClubes = async () => {
      try {
        const response = await axios.get(`https://backendscout-cx6c.onrender.com/api/favorito/list/${userID}`);
        setFavoriteClubes(response.data.map(fav => fav.ID_CLUBE));
      } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
      }
    };

    fetchClubes();
    fetchFavoriteClubes();
  }, [userID, setSelectedClub]);

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
      text: "Os clubes selecionados serão excluídos permanentemente, incluindo as suas equipas e relações!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          for (const clubeId of selectedClubes) {
            await axios.delete(`https://backendscout-cx6c.onrender.com/api/clube/delete-all/${clubeId}`);
          }

          setClubes(clubes.filter((clube) => !selectedClubes.includes(clube.id_clube)));
          setSelectedClubes([]);
          setShowCheckboxes(false);

          Swal.fire("Excluído!", "Os clubes e suas equipas foram removidos com sucesso.", "success");
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

  const handleClubClick = (clube) => {
    setSelectedClub(clube);
    if (isFavoriteMode) {
      handleAddFavorito(clube.id_clube);
    }
  };

  const handleAddFavorito = async (clubeId) => {
    const ID_USER = userID;
    try {
      await axios.post('https://backendscout-cx6c.onrender.com/api/favorito/add', {
        ID_CLUBE: clubeId,
        ID_USER: ID_USER
      });
      setFavoriteClubes([...favoriteClubes, clubeId]);
      Swal.fire("Sucesso!", "Clube adicionado aos favoritos.", "success");
      window.location.reload();
    } catch (error) {
      console.error('Erro ao adicionar favorito:', error);
      Swal.fire("Erro!", "Não foi possível adicionar o clube aos favoritos.", "error");
    }
  };

  const toggleFavoriteMode = () => {
    setIsFavoriteMode(!isFavoriteMode);
  };

  const handleSort = (key) => {
    console.log("handleSort chamado com a chave:", key); // Log para depuração

    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    console.log("Ordenando por:", key, "Direção:", direction); // Log para depuração

    setClubes((prevClubes) => {
      const sortedClubes = [...prevClubes].sort((a, b) => {
        // Verifique se as chaves existem e são válidas
        if (a[key] === undefined || b[key] === undefined) {
          console.warn(`Chave "${key}" não encontrada ou inválida em algum objeto.`);
          return 0;
        }

        // Tratamento especial para números
        let valueA = a[key];
        let valueB = b[key];

        if (key === "totalEquipas") {
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

      console.log("Clubes ordenados:", sortedClubes); // Log para depuração
      return sortedClubes;
    });
  };

  const filteredClubes = clubes.filter((clube) =>
    clube.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="left-menu">
      <div className="search-container">
        <input
          type="text"
          placeholder="Pesquisar clube"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="toolbar">
        <span className="favorite-button" onClick={toggleFavoriteMode}>
          <FaCheck className={isFavoriteMode ? "active" : ""} />
        </span>
        {userType !== "1" && (
          <div className="icons-container">
            <FaTrash className="icon trash" onClick={handleDelete} />
            <FaPlus className="icon add" onClick={() => navigate('/team/add-club')} />
            {showCheckboxes && <FaTimes className="icon cancel" onClick={handleCancelSelection} />}
          </div>
        )}
      </div>

      <div className="team-header">
        <span onClick={() => handleSort("id_clube")}>ID Clube</span>
        <span onClick={() => handleSort("nome")}>Nome Clube</span>
        <span onClick={() => handleSort("abreviatura")}>Abreviatura</span>
        <span onClick={() => handleSort("totalEquipas")}>Nº Equipas</span>
      </div>
      <ul className="team-list">
        {erro ? (
          <p className="error-message">Erro: {erro}</p>
        ) : (
          filteredClubes.map((clube, index) => (
            <li
              key={index}
              className={`team-item ${isFavoriteMode && favoriteClubes.includes(clube.id_clube) ? 'selected' : ''}`}
              onClick={() => !showCheckboxes && handleClubClick(clube)}
            >
              {showCheckboxes ? (
                <input
                  type="checkbox"
                  checked={selectedClubes.includes(clube.id_clube)}
                  onChange={() => toggleClubeSelection(clube.id_clube)}
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <span>{clube.id_clube}</span>
              )}
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