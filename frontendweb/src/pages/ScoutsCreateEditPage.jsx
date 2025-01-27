import React, { useEffect, useState } from "react";
import "../CSS/ScoutsCreateEditPage.css";
import api from "../api/axios";

const ScoutsCreateEditPage = () => {
  const [formData, setFormData] = useState({
    NOME: "",
    EMAIL: "",
    PASSWORD: "",
    ID_TIPO: "",
  });

  const [tipoUtilizadores, setTipoUtilizadores] = useState([]);
  const [users, setUsers] = useState([]); // Estado para armazenar os últimos 10 utilizadores
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchTipoUtilizadores = async () => {
      try {
        const response = await api.get("/tipo/listNames");
        setTipoUtilizadores(response.data);
      } catch (error) {
        setError("Erro ao carregar os tipos de utilizadores.");
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await api.get("/users/lastTen");
        setUsers(response.data); // Armazena os últimos utilizadores
      } catch (error) {
        console.error("Erro ao carregar os últimos utilizadores:", error);
      }
    };

    fetchTipoUtilizadores();
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await api.post("/users/signup", formData);
      if (response.status === 201) {
        setSuccess("Utilizador criado com sucesso!");
        setFormData({ NOME: "", EMAIL: "", PASSWORD: "", ID_TIPO: "" });
      }
    } catch (error) {
      setError("Erro ao criar utilizador. Verifique os dados.");
    }
  };
  return (
    <div className="main-container">
      {/* Formulário */}
      <div className="form-container">
        <h2>Criar/Editar Scout</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="NOME">Nome</label>
            <input
              type="text"
              id="NOME"
              value={formData.NOME}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="EMAIL">Email</label>
            <input
              type="email"
              id="EMAIL"
              value={formData.EMAIL}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="PASSWORD">Password</label>
            <input
              type="password"
              id="PASSWORD"
              value={formData.PASSWORD}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="ID_TIPO">Tipo de Utilizador</label>
            <select
              id="ID_TIPO"
              value={formData.ID_TIPO}
              onChange={handleChange}
              required
            >
              <option value="">Selecione um tipo</option>
              {tipoUtilizadores.map((tipo, index) => (
                <option key={index} value={tipo.ID_TIPO}>
                  {tipo.PERMISSOES}
                </option>
              ))}
            </select>
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <button type="submit">Adicionar</button>
        </form>
      </div>
  
      {/* Lista de Utilizadores */}
      <div className="main-container">
        <h3>Últimos Utilizadores Adicionados</h3>
        <div className="history-item">
            {users.map((user, index) => (
            <div key={index} className="user">
                <span className="name">{user.NOME}</span>
                <span className="details">{user.ID_TIPO}</span> {/* Ajuste aqui */}
            </div>
            ))}
        </div>
    </div>

    </div>
  );
  
};

export default ScoutsCreateEditPage;
