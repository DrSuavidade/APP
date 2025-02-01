import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/addClub.css"; // Certifique-se de criar este arquivo de estilo
import api from "../api/axios";

const AddClubPage = () => {
  const [name, setName] = useState("");
  const [abreviatura, setAbreviatura] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleAddClub = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await api.post("/clube/add", {
        NOME: name,
        ABREVIATURA: abreviatura,
      });
  
      if (response.status === 201) {
        setSuccess(true);
        navigate("/clubs"); // Redireciona imediatamente após sucesso
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Erro ao adicionar clube.");
      } else {
        setError("Erro de rede. Verifique sua conexão.");
      }
    }
  };
  

  return (
    <div className="add-club-container">
      <div className="add-club-box">
        <h1>Adicionar Clube</h1>
        <form onSubmit={handleAddClub}>
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              placeholder="Nome do clube"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Abreviatura</label>
            <input
              type="text"
              placeholder="Ex: SUB 10"
              value={abreviatura}
              onChange={(e) => setAbreviatura(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">Clube adicionado com sucesso!</p>}
          <button type="submit" className="add-club-button">
            Adicionar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClubPage;
