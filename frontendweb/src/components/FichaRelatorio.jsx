import React, { useEffect, useState } from "react";
import "../CSS/FichaRelatorio.css";
import axios from "axios";
import Swal from "sweetalert2";

const FichaRelatorio = ({ ID_RELATORIO }) => {
  const [relatorio, setRelatorio] = useState(null);
  const [notaADM, setNotaADM] = useState(0);
  const [comentarioADM, setComentarioADM] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (ID_RELATORIO) {
      axios
        .get(`http://localhost:3000/api/relatorio/ficha/${ID_RELATORIO}`)
        .then((response) => {
          setRelatorio(response.data);
          setNotaADM(response.data.NOTA_ADM);
          setComentarioADM(response.data.COMENTARIO_ADM);
          setStatus(response.data.STATUS);
        })
        .catch((error) => {
          console.error("Erro ao buscar relatório:", error);
        });
    }
  }, [ID_RELATORIO]);

  const getStars = () => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={index < notaADM ? "star filled" : "star"}
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
      <span key={index} className={index < valor ? "circle filled" : "circle"}>●</span>
    ));
  };

  const handleUpdate = (novoStatus) => {
    axios
      .put("http://localhost:3000/api/relatorio/update", {
        ID_RELATORIO,
        NOTA_ADM: notaADM,
        COMENTARIO_ADM: comentarioADM,
        STATUS: novoStatus
      })
      .then((response) => {
        console.log("✅ Relatório atualizado:", response.data);
        Swal.fire({
          title: "Sucesso!",
          text: `O relatório foi atualizado para ${novoStatus}.`,
          icon: "success",
          confirmButtonText: "OK"
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
          confirmButtonText: "OK"
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
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        handleUpdate("Rejeitado");
      }
    });
  };

  if (!relatorio) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="ficha-relatorio-container">
      <h2>RELATÓRIO {new Date(relatorio.DATA).toLocaleDateString("pt-BR")}</h2>
      <div className="player-info">
        <div className="avatar-placeholder"></div>
        <div className="player-details">
          <h3>{relatorio.JOGADOR_NOME}</h3>
          <p>{relatorio.IDADE} anos • {relatorio.ANO_NASCIMENTO}</p>
          <p>{relatorio.NOME_EQUIPA} ({relatorio.ABREVIATURA_CLUBE})</p>
        </div>
        <div 
            className={`nota-circle ${relatorio.NOTA <= 2 ? "nota-baixa" : "nota-alta"}`}
            >
            {relatorio.NOTA}/4
        </div>
      </div>
  
      <div className="attributes">
        {["TECNICA", "VELOCIDADE", "COMPETITIVA", "INTELIGENCIA"].map((attr) => (
          <div className="attribute-circle" key={attr}>
            <h4>{attr}</h4>
            <div className="circle-group">{getAttributeCircles(relatorio[attr])}</div>
          </div>
        ))}
      </div>
  
      <h4>MORFOLOGIA: {relatorio.MORFOLOGIA}</h4>
  
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
  
      <h4>AVALIAÇÃO GLOBAL</h4>
      <div className="stars">{getStars()}</div>
  
      {status === "Avaliado" && (
        <div className="buttons">
          <button className="reject-btn" onClick={handleReject}>Rejeitar</button>
          <button className="confirm-btn" onClick={() => handleUpdate("Avaliado_ADM")}>
            Confirmar
          </button>
        </div>
      )}
    </div>
  );
};

export default FichaRelatorio;
