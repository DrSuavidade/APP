import React, { useState } from "react";
import axios from "../api/axios";
import "../CSS/ScoutsCreateEditPage.css"; // Reutilizando o CSS

const EventsCreatePage = () => {
  const [formData, setFormData] = useState({
    DATA: "",
    HORA: "",
    EQUIPA_CASA: "",
    VISITANTE: "",
    LOCAL: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
      });
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Erro ao adicionar evento."
      );
    }
  };

  return (
    <div className="main-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>Adicionar Evento</h2>
        <div className="form-group">
          <label>Data</label>
          <input
            type="date"
            name="DATA"
            value={formData.DATA}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Horário</label>
          <input
            type="time"
            name="HORA"
            value={formData.HORA}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Equipe Casa</label>
          <input
            type="text"
            name="EQUIPA_CASA"
            value={formData.EQUIPA_CASA}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Equipe Visitante</label>
          <input
            type="text"
            name="VISITANTE"
            value={formData.VISITANTE}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Localização</label>
          <input
            type="text"
            name="LOCAL"
            value={formData.LOCAL}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Adicionar
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default EventsCreatePage;
