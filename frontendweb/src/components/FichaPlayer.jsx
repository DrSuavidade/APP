import React, { useEffect, useState } from "react";
import "../CSS/FichaRelatorio.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faHistory, faTimes } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import PlayerRadarChart from "./PlayerRadarChart";
import Cookies from "js-cookie"; // Importar a biblioteca js-cookie

const FichaPlayer = ({ ID_JOGADORES }) => {
  const [player, setPlayer] = useState(null);
  const [playerAverages, setPlayerAverages] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [userType, setUserType] = useState(null); // Adicionar estado para armazenar ID_TIPO
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

      axios
        .get(`http://localhost:3000/api/jogador/details/${ID_JOGADORES}`)
        .then((response) => {
          console.log("🚀 Player Averages Fetched:", response.data); // ✅ Debugging
          setPlayerAverages(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar médias dos relatórios:", error);
        });
    }

    const ID_TIPO = Cookies.get("ID_TIPO");
    setUserType(ID_TIPO);
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
    setEditMode(false);
  };

  const handleActivatePlayer = async (ID_JOGADORES) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/player/activate/${ID_JOGADORES}`);
      Swal.fire("Sucesso!", response.data.message, "success");
      setPlayer({ ...player, STATUS: "Active" });
    } catch (error) {
      Swal.fire("Erro!", error.response?.data?.error || "Erro ao ativar jogador.", "error");
    }
  };

  const handleRejectPlayer = async (ID_JOGADORES) => {
    const confirm = await Swal.fire({
      title: "Tem certeza?",
      text: "Esta ação é irreversível e removerá o jogador e todos os seus dados permanentemente. Deseja continuar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    });

    if (confirm.isConfirmed) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/player/reject/${ID_JOGADORES}`);
        Swal.fire("Sucesso!", response.data.message, "success");
        navigate("/players");
      } catch (error) {
        Swal.fire("Erro!", error.response?.data?.error || "Erro ao rejeitar jogador.", "error");
      }
    }
  };

  const getStatusColor = () => {
    if (player?.STATUS === "Inactive") return "yellow";
    if (player?.STATUS === "Active") return "green";
    return "orange";
  };

  const getStatusText = () => {
    if (player?.STATUS === "Inactive") return "Inactive";
    if (player?.STATUS === "Active") return "Active";
    return "Unknown";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString;
    }
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (!player) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="ficha-relatorio-container">
      <div className="header">
        <h2>Informações do Jogador</h2>
        <div 
          className="status-circle" 
          data-tooltip={getStatusText()} 
          style={{ background: getStatusColor() }}
        ></div>
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
          type={editMode ? "date" : "text"} // Alterar o tipo para "date" em modo de edição
          value={editMode ? player.DATA_NASC.split('T')[0] : formatDate(player.DATA_NASC)}
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
        {userType !== "1" && (
          <button className="icon-btn" onClick={handleEdit} disabled={editMode}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
        )}
        {editMode && (
          <>
            {userType !== "1" && (
              <button className="icon-btn cancel-btn" onClick={handleCancel}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )}
            <button className="save-btn" onClick={handleSave}>
              Salvar
            </button>
          </>
        )}
        {userType !== "1" && (
          <button className="icon-btn" onClick={() => navigate(`/reports/history/${ID_JOGADORES}`)}>
            <FontAwesomeIcon icon={faHistory} />
          </button>
        )}
      </div>

      {player.STATUS === "Inactive" && userType !== "1" && (
        <div className="player-actions">
          <button className="activate-btn" onClick={() => handleActivatePlayer(player.ID_JOGADORES)}>
            Ativar Jogador
          </button>
          <button className="reject-btn" onClick={() => handleRejectPlayer(player.ID_JOGADORES)}>
            Rejeitar Jogador
          </button>
        </div>
      )}
      <p>Total de Relatórios: {player.TOTAL_RELATORIOS}</p>

      {playerAverages ? (
          <PlayerRadarChart playerDetails={playerAverages} />
        ) : (
          <p style={{ color: "red", textAlign: "center" }}>
            ❌ Nenhum dado carregado.
          </p>
        )}
    </div>
  );
};

export default FichaPlayer;
