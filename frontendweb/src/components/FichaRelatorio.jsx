import React, { useEffect, useState } from "react";
import "../CSS/FichaRelatorio.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";

const FichaRelatorio = ({ ID_RELATORIO }) => {
  const [relatorio, setRelatorio] = useState(null);
  const [notaADM, setNotaADM] = useState(0);
  const [comentarioADM, setComentarioADM] = useState("");
  const [status, setStatus] = useState("");
  const [ID_JOGADORES, setID_JOGADORES] = useState(null);
  const [userType, setUserType] = useState(null); // Adicionado estado para armazenar ID_TIPO
  const navigate = useNavigate();

  useEffect(() => {
    if (ID_RELATORIO) {
      axios
        .get(`https://backendscout-cx6c.onrender.com/api/relatorio/ficha/${ID_RELATORIO}`)
        .then((response) => {
          const data = response.data;
          setRelatorio(data);
          setNotaADM(data.NOTA_ADM);
          setComentarioADM(data.COMENTARIO_ADM);
          setStatus(data.STATUS);
          setID_JOGADORES(data.ID_JOGADORES);

          // Calcular a média dos campos de avaliação
          const media = Math.round(
            (data.TECNICA +
              data.VELOCIDADE +
              data.COMPETITIVA +
              data.INTELIGENCIA) /
              4
          );
          setRelatorio((prev) => ({ ...prev, NOTA: media }));
        })
        .catch((error) => {
          console.error("Erro ao buscar relatório:", error);
        });
    }

    const ID_TIPO = Cookies.get("ID_TIPO");
    setUserType(ID_TIPO);
  }, [ID_RELATORIO]);

  const getStars = () => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={index < notaADM ? "Star filled" : "Star"}
        onClick={() => {
          if (status === "Avaliado") setNotaADM(index + 1);
        }}
        style={{ cursor: status === "Avaliado" ? "pointer" : "default" }}
      >
        ★
      </span>
    ));
  };

  const getAttributeCircles = (valor) => {
    return [...Array(4)].map((_, index) => (
      <span key={index} className={index < valor ? "circle filled" : "circle"}>
        ●
      </span>
    ));
  };

  const handleUpdate = (novoStatus) => {
    axios
      .put("https://backendscout-cx6c.onrender.com/api/relatorio/update", {
        ID_RELATORIO,
        NOTA_ADM: notaADM,
        COMENTARIO_ADM: comentarioADM,
        STATUS: novoStatus,
        NOTA: relatorio.NOTA, // Incluindo a nota do relatório
      })
      .then((response) => {
        console.log("✅ Relatório atualizado:", response.data);
        Swal.fire({
          title: "Sucesso!",
          text: `O relatório foi atualizado para ${novoStatus}.`,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.href = "/reports";
        });
      })
      .catch((error) => {
        console.error("❌ Erro ao atualizar relatório:", error);
        Swal.fire({
          title: "Erro!",
          text: "Houve um erro ao atualizar o relatório.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  const handleReject = () => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Esta ação é irreversível! O relatório será rejeitado.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, rejeitar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        handleUpdate("Rejeitado");
      }
    });
  };

  const handleNotaChange = (delta) => {
    if (status === "Avaliado") {
      const newNota = Math.max(0, Math.min(4, relatorio.NOTA + delta));
      setRelatorio({ ...relatorio, NOTA: newNota });
    }
  };

  if (!relatorio) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="ficha-relatorio-container">
      <h2>RELATÓRIO {relatorio.DATA}</h2>
      <div className="player-info">
        <div className="avatar-placeholder"></div>
        <div className="player-details">
          <h3>{relatorio.JOGADOR_NOME}</h3>
          <p>
            {relatorio.IDADE} anos • {relatorio.ANO_NASCIMENTO}
          </p>
          <p>
            {relatorio.NOME_EQUIPA} ({relatorio.ABREVIATURA_CLUBE})
          </p>
        </div>
        <div className="nota-container">
          {status === "Avaliado" && (
            <div
              className={`triangle-up ${
                relatorio.NOTA === 4 ? "disabled" : "visible"
              }`}
              onClick={() => relatorio.NOTA < 4 && handleNotaChange(1)}
            ></div>
          )}

          <div
            className={`nota-circle ${
              relatorio.NOTA <= 2 ? "nota-baixa" : "nota-alta"
            }`}
          >
            {relatorio.NOTA}/4
          </div>

          {status === "Avaliado" && (
            <div
              className={`triangle-down ${
                relatorio.NOTA === 0 ? "disabled" : "visible"
              }`}
              onClick={() => relatorio.NOTA > 0 && handleNotaChange(-1)}
            ></div>
          )}
        </div>
      </div>

      <div className="attributes">
        {["TECNICA", "VELOCIDADE", "COMPETITIVA", "INTELIGENCIA"].map(
          (attr) => (
            <div className="attribute-circle" key={attr}>
              <h4>{attr}</h4>
              <div className="circle-group">
                {getAttributeCircles(relatorio[attr])}
              </div>
            </div>
          )
        )}
      </div>

      <h4>ALTURA:  <div className="titulo2"> {relatorio.ALTURA}</div></h4>
      <h4>MORFOLOGIA: <div className="titulo2">{relatorio.MORFOLOGIA}</div></h4>

      <div className="comments">
        <h4>COMENTÁRIO SCOUTER</h4>
        <p>{relatorio.COMENTARIO_SCOUTTER}</p>

        <h4>COMENTÁRIO ADMIN</h4>
        <textarea
          value={comentarioADM}
          onChange={(e) => setComentarioADM(e.target.value)}
          disabled={status !== "Avaliado"}
        />
      </div>

      <div className="avaliacao-global">
      <h4>AVALIAÇÃO GLOBAL</h4>
      <div className="Stars">{getStars()}</div>
      </div>

      {status === "Avaliado" && userType !== "1" && (
        <div className="buttons">
          <button className="reject-btn" onClick={handleReject}>
            Rejeitar
          </button>
          <button
            className="confirm-btn"
            onClick={() => handleUpdate("Avaliado_ADM")}
          >
            Confirmar
          </button>
        </div>
      )}

      <div className="history-button">
        <button
          className="icon-btn"
          onClick={() => navigate(`/reports/history/${ID_JOGADORES}`)}
        >
          <FontAwesomeIcon icon={faHistory} />
        </button>
      </div>
    </div>
  );
};

export default FichaRelatorio;
