import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import "../CSS/ScoutsCreateEditPage.css";

const EventsCreatePage = () => {
  const [formData, setFormData] = useState({
    DATA: "",
    HORA: "",
    EQUIPA_CASA: "",
    VISITANTE: "",
    LOCAL: "",
    ID_USER: "",
  });

  const [scouters, setScouters] = useState([]);
  const [equipas, setEquipas] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchScouters = async () => {
      try {
        const response = await axios.get("/users/tipo/3");
        setScouters(response.data);
      } catch (error) {
        console.error("Erro ao buscar scouters:", error);
      }
    };

    const fetchEquipas = async () => {
      try {
        const response = await axios.get("/equipa/list");
        setEquipas(response.data);
      } catch (error) {
        console.error("Erro ao buscar equipas:", error);
      }
    };

    fetchScouters();
    fetchEquipas();
  }, []);

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
        ID_USER: "",
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
        <div className="form-group">
          <label>Scouter</label>
          <select name="ID_USER" value={formData.ID_USER} onChange={handleChange} required>
            <option value="">Selecione o scouter</option>
            {scouters.map((scouter) => (
              <option key={scouter.ID_USER} value={scouter.ID_USER}>{scouter.NOME}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">Adicionar</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default EventsCreatePage;
