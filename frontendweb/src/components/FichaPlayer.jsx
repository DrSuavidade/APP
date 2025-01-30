import React, { useEffect, useState } from "react";
import "../CSS/FichaRelatorio.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FichaPlayer = ({ ID_JOGADORES }) => {
  const [player, setPlayer] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (ID_JOGADORES) {
      axios
        .get(`http://localhost:3000/api/player/${ID_JOGADORES}`)
        .then((response) => {
          setPlayer(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar jogador:", error);
        });
    }
  }, [ID_JOGADORES]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    axios
      .put(`http://localhost:3000/api/player/update/${ID_JOGADORES}`, {
        DATA_NASC: player.DATA_NASC,
        GENERO: player.GENERO,
        NACIONALIDADE: player.NACIONALIDADE,
        LINK: player.LINK,
        DADOS_ENC: player.DADOS_ENC,
      })
      .then(() => {
        setEditMode(false);
      })
      .catch((error) => {
        console.error("Erro ao atualizar jogador:", error);
      });
  };

  const getStatusColor = () => {
    if (player?.STATUS === "Inactive") return "red";
    if (player?.STATUS === "Active") return "green";
    return "orange";
  };

  if (!player) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="ficha-relatorio-container">
      <h2>Informações do Jogador</h2>
      <div className="player-info">
        <div className="avatar-placeholder"></div>
        <div className="player-details">
          <h3>{player.NOME}</h3>
          <p>Equipa: {player.NOME_EQUIPA}</p>
          <p>Clube: {player.ABREVIATURA_CLUBE}</p>
        </div>
        <div className="status-circle" style={{ background: getStatusColor() }}></div>
      </div>

      <button className="edit-btn" onClick={handleEdit} disabled={editMode}>
        Editar
      </button>

      <div className="player-fields">
        <label>Data de Nascimento:</label>
        <input
        type="text"
        value={new Date(player.DATA_NASC).toLocaleDateString("pt-PT")}
        disabled={!editMode}
        onChange={(e) => setPlayer({ ...player, DATA_NASC: e.target.value })}
        />
        <label>Gênero:</label>
        <select
          value={player.GENERO}
          disabled={!editMode}
          onChange={(e) => setPlayer({ ...player, GENERO: e.target.value })}
        >
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
        </select>

        <label>Nacionalidade:</label>
        <input
          type="text"
          value={player.NACIONALIDADE}
          disabled={!editMode}
          onChange={(e) => setPlayer({ ...player, NACIONALIDADE: e.target.value })}
        />

        <label>Link:</label>
        <input
          type="text"
          value={player.LINK}
          disabled={!editMode}
          onChange={(e) => setPlayer({ ...player, LINK: e.target.value })}
        />

        <label>Dados do Encarregado:</label>
        <textarea
          value={player.DADOS_ENC}
          disabled={!editMode}
          onChange={(e) => setPlayer({ ...player, DADOS_ENC: e.target.value })}
        />
      </div>

      {editMode && (
        <button className="save-btn" onClick={handleSave}>
          Salvar
        </button>
      )}

      <p>Total de Relatórios: {player.TOTAL_RELATORIOS}</p>
      <button className="history-btn" onClick={() => navigate("/player/history")}>
        Histórico
      </button>
    </div>
  );
};

export default FichaPlayer;
