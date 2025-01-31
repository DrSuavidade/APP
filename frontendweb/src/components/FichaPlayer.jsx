import React, { useEffect, useState } from "react";
import "../CSS/FichaRelatorio.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faHistory, faTimes } from "@fortawesome/free-solid-svg-icons";

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
      .put(`http://localhost:3000/api/jogador/edit/${ID_JOGADORES}`, {
        NOME: player.NOME,
        DATA_NASC: player.DATA_NASC,
        GENERO: player.GENERO,
        NACIONALIDADE: player.NACIONALIDADE,
        LINK: player.LINK,
        DADOS_ENC: player.DADOS_ENC,
        NOTA_ADM: player.NOTA_ADM,
        STATUS: player.STATUS,
      })
      .then((response) => {
        console.log(response.data.message);
        setEditMode(false);
      })
      .catch((error) => {
        console.error("Erro ao atualizar jogador:", error);
      });
  };

  const handleCancel = () => {
    setEditMode(false); // Cancela a edição
  };

  const getStatusColor = () => {
    if (player?.STATUS === "Inactive") return "yellow";
    if (player?.STATUS === "Active") return "green";
    return "orange";
  };

  if (!player) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="ficha-relatorio-container">
      <div className="header">
        <h2>Informações do Jogador</h2>
        <div className="status-circle" style={{ background: getStatusColor() }}></div>
      </div>

      <div className="player-info">
        <div className="avatar-placeholder"></div>
        <div className="player-details">
          <h3>{player.NOME}</h3>
          <p>Equipa: {player.NOME_EQUIPA}</p>
          <p>Clube: {player.ABREVIATURA_CLUBE}</p>
        </div>
      </div>

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

      <div className="actions">
        <button className="icon-btn" onClick={handleEdit} disabled={editMode}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        {editMode && (
          <>
            <button className="icon-btn cancel-btn" onClick={handleCancel}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <button className="save-btn" onClick={handleSave}>
              Salvar
            </button>
          </>
        )}
        <button className="icon-btn" onClick={() => navigate("/player/history")}>
          <FontAwesomeIcon icon={faHistory} />
        </button>
      </div>

      <p>Total de Relatórios: {player.TOTAL_RELATORIOS}</p>
    </div>
  );
};

export default FichaPlayer;