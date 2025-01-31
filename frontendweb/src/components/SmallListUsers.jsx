import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../CSS/ListRelatorios.css";
import { FaTrash, FaPlus, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';

const SmallListUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [showScrollbar, setShowScrollbar] = useState(false); // Controla a exibição da scrollbar
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleUserSelection = (userId) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  const handleDelete = async () => {
    if (!showCheckboxes) {
      setShowCheckboxes(true);
      return;
    }

    if (selectedUsers.length === 0) {
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
          await axios.delete('http://localhost:3000/api/users/delete', { data: { usersIds: selectedUsers } });
          setUsers(users.filter((user) => !selectedUsers.includes(user.ID_USER)));
          setSelectedUsers([]);
          setShowCheckboxes(false);
          Swal.fire("Excluído!", "Os usuários foram removidos com sucesso.", "success");
        } catch (error) {
          console.error('Erro ao deletar usuários:', error);
          Swal.fire("Erro!", "Não foi possível excluir os usuários.", "error");
        }
      }
    });
  };

  const handleCancelSelection = () => {
    setSelectedUsers([]);
    setShowCheckboxes(false);
  };

  const filteredUsers = users.filter((user) =>
    user.NOME.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowMore = () => {
    setShowScrollbar(true); // Ativa a scrollbar após clicar em "Ver Mais"
  };

  return (
    <div className="small-list-users-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Escreva o nome do scouter"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="search-btn">Search</button>
      </div>

      <div className="toolbar">
        <FaTrash className="icon trash" onClick={handleDelete} />
        {showCheckboxes && <FaTimes className="icon cancel" onClick={handleCancelSelection} />}
        <FaPlus className="icon add" onClick={() => navigate('/scouts/new')} />
      </div>

      <div className={`user-list ${showScrollbar ? "with-scrollbar" : "without-scrollbar"}`}>
        {filteredUsers.slice(0, showScrollbar ? filteredUsers.length : 6).map((user) => (
          <div key={user.ID_USER} className="user-item">
            {showCheckboxes && (
              <input
                type="checkbox"
                checked={selectedUsers.includes(user.ID_USER)}
                onChange={() => toggleUserSelection(user.ID_USER)}
              />
            )}
            <span className="user-name">{user.NOME}</span>
            <span className="user-permissions">{user.PERMISSOES}</span>
          </div>
        ))}
      </div>

      {!showScrollbar && filteredUsers.length > 6 && (
        <button onClick={handleShowMore} className="load-more-btn">
          Ver Mais
        </button>
      )}
    </div>
  );
};

export default SmallListUsers;
