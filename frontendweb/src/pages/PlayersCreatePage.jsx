import React, { useState, useEffect } from "react";
import "../CSS/PlayerCreatePage.css";
import api from "../api/axios";

// Função para renderizar estrelas
const renderStars = (rating) => {
  const totalStars = 5;  // Definindo o total de estrelas
  const filledStars = Math.floor(rating);  // Estrelas cheias
  const emptyStars = totalStars - filledStars;  // Estrelas vazias

  // Cria as estrelas cheias e vazias
  const stars = [
    ...Array(filledStars).fill(<span className="filled-star">⭐</span>),
    ...Array(emptyStars).fill(<span className="empty-star">☆</span>)
  ];
  return stars;
};

function PlayersCreatePage() {
  const [formData, setFormData] = useState({
    NOME: "",
    LINK: "",
    DATA_NASC: "",
    GENERO: "male",
    NACIONALIDADE: "portuguese",
    DADOS_ENC: null,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [players, setPlayers] = useState([]); // Estado para armazenar os jogadores

  // Fetch dos 10 últimos jogadores
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await api.get("/jogador/lastTen");
        setPlayers(response.data); // Armazena os jogadores no estado
      } catch (error) {
        console.error("Erro ao carregar os jogadores:", error);
      }
    };

    fetchPlayers();
  }, [success]); // Atualiza a lista quando um jogador é adicionado com sucesso

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    setFormData({
      ...formData,
      [id]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const response = await api.post("/jogador/addPlayerPage", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        setSuccess(true);
        setFormData({
          NOME: "",
          LINK: "",
          DATA_NASC: "",
          GENERO: "male",
          NACIONALIDADE: "portuguese",
          DADOS_ENC: null,
        });
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Erro ao adicionar jogador.");
      } else {
        setError("Erro de rede. Verifique sua conexão.");
      }
    }
  };

  return (
    <div className="main-container">
      {/* Formulário de Adicionar Jogador */}
      <div className="form-container">
        <h2>Adicionar Jogador</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="NOME">Nome</label>
            <input
              type="text"
              id="NOME"
              placeholder="Nome completo"
              value={formData.NOME}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="LINK">Link</label>
            <input
              type="url"
              id="LINK"
              placeholder="Link da federação"
              value={formData.LINK}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="DATA_NASC">Data de Nascimento</label>
            <input
              type="date"
              id="DATA_NASC"
              value={formData.DATA_NASC}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="GENERO">Gênero</label>
              <select id="GENERO" value={formData.GENERO} onChange={handleChange}>
                <option value="male">Masculino</option>
                <option value="female">Feminino</option>
                <option value="other">Outro</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="NACIONALIDADE">Nacionalidade</label>
              <select
                id="NACIONALIDADE"
                value={formData.NACIONALIDADE}
                onChange={handleChange}
              >
                <option value="portuguese">Português</option>
                <option value="spanish">Espanhol</option>
                <option value="other">Outro</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="DADOS_ENC">Dados Encarregados de Educação</label>
            <input
              type="file"
              id="DADOS_ENC"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">Jogador adicionado com sucesso!</p>}
          <div className="form-group">
            <button type="submit">Adicionar</button>
          </div>
        </form>
      </div>

      {/* Seção de Últimos Jogadores Adicionados */}
      <div className="history-container">
        <h3>Últimos Jogadores Adicionados</h3>
        <div className="history-list">
          {players.map((player, index) => (
            <div key={index} className="player-item">
              <span className="player-name">{player.NOME}</span>
              <span className="player-rating">
                {renderStars(player.NOTA_ADM !== undefined && player.NOTA_ADM !== null ? player.NOTA_ADM : 0)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlayersCreatePage;
