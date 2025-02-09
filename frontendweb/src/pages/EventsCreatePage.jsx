import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import "../CSS/ScoutsCreateEditPage.css";
import { useNavigate } from "react-router-dom"; // Adiciona useNavigate
import Cookies from "js-cookie"; // Importar a biblioteca js-cookie

const EventsCreatePage = () => {
  const [formData, setFormData] = useState({
    DATA: "",
    HORA: "",
    EQUIPA_CASA: "",
    VISITANTE: "",
    LOCAL: "",
    ID_USER: "000", // Definindo ID_USER como "000" por padrão
  });

  const [equipas, setEquipas] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // Use o hook useNavigate para navegação

  useEffect(() => {
    const ID_TIPO = Cookies.get("ID_TIPO");
    if (ID_TIPO === "1") {
      navigate('/erro401'); // Redireciona para a página de erro 401 se o ID_TIPO for 1
    }

    const fetchEquipas = async () => {
      try {
        const response = await axios.get("/equipa/list");
        setEquipas(response.data);
      } catch (error) {
        console.error("Erro ao buscar equipas:", error);
      }
    };

    fetchEquipas();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await axios.post("/evento/addweb", formData);
      setSuccessMessage("Evento adicionado com sucesso!");
      setFormData({
        DATA: "",
        HORA: "",
        EQUIPA_CASA: "",
        VISITANTE: "",
        LOCAL: "",
        ID_USER: "000", // Redefinindo ID_USER como "000" após o envio
      });
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Erro ao adicionar evento.");
    }
  };

  return (
    <div className="main-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>Adicionar Evento</h2>
        <div className="form-group">
          <label>Data</label>
          <input type="date" name="DATA" value={formData.DATA} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Horário</label>
          <input type="time" name="HORA" value={formData.HORA} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Equipe Casa</label>
          <select name="EQUIPA_CASA" value={formData.EQUIPA_CASA} onChange={handleChange} required>
            <option value="">Selecione a equipe</option>
            {equipas.map((equipa) => (
              <option key={equipa.ID_EQUIPA} value={equipa.NOME}>{equipa.NOME}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Equipe Visitante</label>
          <input type="text" name="VISITANTE" value={formData.VISITANTE} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Localização</label>
          <input type="text" name="LOCAL" value={formData.LOCAL} onChange={handleChange} required />
        </div>
        <button type="submit" className="submit-button">Adicionar</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default EventsCreatePage;