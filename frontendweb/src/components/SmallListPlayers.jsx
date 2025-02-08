import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../CSS/ListRelatorios.css";
import { FaTrash, FaPlus, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie'; // Importar a biblioteca js-cookie

const SmallListPlayers = () => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [showScrollbar, setShowScrollbar] = useState(false); // Controla a exibição da scrollbar
  const [userType, setUserType] = useState(null); // Adicionar estado para armazenar ID_TIPO
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlayers();
    const ID_TIPO = Cookies.get("ID_TIPO");
    setUserType(ID_TIPO);
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get('https://backendscout-cx6c.onrender.com/api/all-players');
      setPlayers(response.data);
    } catch (error) {
      console.error('Erro ao buscar jogadores:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const togglePlayerSelection = (playerId) => {
    setSelectedPlayers((prevSelected) =>
      prevSelected.includes(playerId)
        ? prevSelected.filter((id) => id !== playerId)
        : [...prevSelected, playerId]
    );
  };

  const handleDelete = async () => {
    if (!showCheckboxes) {
      setShowCheckboxes(true);
      return;
    }

    if (selectedPlayers.length === 0) {
      Swal.fire("Erro", "Selecione pelo menos um jogador para excluir.", "error");
      return;
    }

    Swal.fire({
      title: "Tem certeza?",
      text: "Os jogadores selecionados serão excluídos permanentemente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
            await axios.delete('https://backendscout-cx6c.onrender.com/api/players/delete', { 
                data: { playersIds: selectedPlayers } // Corrigido para 'playersIds'
              });
          setPlayers(players.filter((player) => !selectedPlayers.includes(player.ID_JOGADORES)));
          setSelectedPlayers([]);
          setShowCheckboxes(false);
          Swal.fire("Excluído!", "Os jogadores foram removidos com sucesso.", "success");
        } catch (error) {
          console.error('Erro ao deletar jogadores:', error);
          Swal.fire("Erro!", "Não foi possível excluir os jogadores.", "error");
        }
      }
    });
  };

  const handleCancelSelection = () => {
    setSelectedPlayers([]);
    setShowCheckboxes(false);
  };

  const getStars = (nota) => {
    // Ensure nota is a valid number, default to 0 if it's invalid
    const notaNumber = nota === "Sem nota" || nota === null || nota === undefined ? 0 : nota;
  
    return (
      <span className="stars">
        <span className="filled-star">{"★".repeat(notaNumber)}</span>
        <span className="gray-stars">{"★".repeat(5 - notaNumber)}</span>
      </span>
    );
  };
  

  const filteredPlayers = players.filter((player) =>
    player.NOME.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowMore = () => {
    setShowScrollbar(true); // Ativa a scrollbar após clicar em "Ver Mais"
  };

  return (
    <div className="small-list-users-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Escreva o nome do jogador"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {userType !== "1" && (
        <div className="toolbar">
          <FaTrash className="icon trash" onClick={handleDelete} />
          {showCheckboxes && <FaTimes className="icon cancel" onClick={handleCancelSelection} />}
          <FaPlus className="icon add" onClick={() => navigate('/players/new')} />
        </div>
      )}

      <div className={`user-list ${showScrollbar ? "with-scrollbar" : "without-scrollbar"}`}>
        {filteredPlayers.slice(0, showScrollbar ? filteredPlayers.length : 6).map((player) => (
          <div key={player.ID_JOGADORES} className="user-item">
            {showCheckboxes && (
              <input
                type="checkbox"
                checked={selectedPlayers.includes(player.ID_JOGADORES)}
                onChange={() => togglePlayerSelection(player.ID_JOGADORES)}
              />
            )}
            <span className="user-name">{player.NOME}</span>
            <span className="user-permissions" style={{ margin: '0 10px' }}>{player.ABREVIATURA_CLUBE || "--"}</span>
            <span className="user-permissions">{getStars(player.NOTA_ADM)}</span>
          </div>
        ))}
      </div>

      {!showScrollbar && filteredPlayers.length > 6 && (
        <button onClick={handleShowMore} className="load-more-btn">
          Ver Mais
        </button>
      )}
    </div>
  );
};

export default SmallListPlayers;
