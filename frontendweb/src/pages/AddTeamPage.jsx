import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Adiciona useNavigate
import axios from "axios";
import Cookies from "js-cookie"; // Importar a biblioteca js-cookie
import "../CSS/addClub.css";

const CreateTeamPage = () => {
  const { id_clube } = useParams(); // Obtém o ID do clube a partir da URL
  const [nome, setNome] = useState("");
  const [escalao, setEscalao] = useState("Sub-13");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Use o hook useNavigate para navegação

  useEffect(() => {
    const ID_TIPO = Cookies.get("ID_TIPO");
    if (ID_TIPO === "1") {
      navigate('/erro401'); // Redireciona para a página de erro 401 se o ID_TIPO for 1
    }
  }, [navigate]);

  const escaloes = [
    "Sub-10","Sub-11","Sub-12","Sub-13", "Sub-14", "Sub-15", "Sub-16", "Sub-19", "Sub-23", "Profissional"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("https://backendscout-cx6c.onrender.com/api/equipa/add", {
        NOME: nome,
        ESCALAO: escalao,
        ID_CLUBE: id_clube,
      });

      setMessage(response.data.message);
      setNome("");
      setEscalao("Sub-13");
    } catch (error) {
      setMessage("Erro ao adicionar equipa.");
      console.error("Erro:", error);
    }
  };

  const handleBack = () => {
    navigate(-1); // Volta para a página anterior no histórico
  };

  return (
    <div className="add-club-container">
      <div className="add-club-box">
        <h1>Adicionar Equipa</h1>
        {message && <p className={message.includes("Erro") ? "error-message" : "success-message"}>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome</label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Escalão</label>
            <select value={escalao} onChange={(e) => setEscalao(e.target.value)} required>
              {escaloes.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="add-club-button">Adicionar</button>
          <button onClick={handleBack} className="add-club-button">Voltar</button>
        </form>
      </div>
    </div>
  );
};

export default CreateTeamPage;
