import React, { useEffect, useState } from "react";
import api from "../api/axios"; // Importa a instância centralizada do axios
import "../CSS/MiniRelatorios.css"; // Arquivo de estilo

const MiniRelatorios = ({ ID_USER }) => {
  const [relatorios, setRelatorios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ID_USER) return; // Evita chamada desnecessária à API

    const fetchRelatorios = async () => {
      try {
        const response = await api.get(`http://localhost:3000/api/relatorio/historico/${ID_USER}`);
        setRelatorios(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar relatórios:", err);
        setError("Erro ao carregar os dados.");
        setLoading(false);
      }
    };

    fetchRelatorios();
  }, [ID_USER]); // Atualiza sempre que `ID_USER` mudar

  const getStatusColor = (status) => {
    switch (status) {
      case "Avaliado":
        return "yellow";
      case "Avaliado_ADM":
        return "green";
      default:
        return "red";
    }
  };

  const getStars = (nota) => {
    const totalStars = 5;
    const fullStars = Math.floor(nota);
    return "★".repeat(fullStars) + "☆".repeat(totalStars - fullStars);
  };

  if (loading) {
    return <p>Carregando relatórios...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="mini-relatorios-container">
      <h2>Histórico de Avaliações</h2><br />
      {relatorios.length > 0 ? (
        relatorios.map((report) => (
          <div key={report.ID_RELATORIO} className="mini-relatorio-item">
            <div>{report.JOGADOR_NOME}</div>
            <div className="estrelas">{getStars(report.NOTA)}</div>
            <div>
              <span
                className="status-circle"
                style={{ backgroundColor: getStatusColor(report.STATUS) }}
                title={report.STATUS}
              ></span>
            </div>
          </div>
        ))
      ) : (
        <p>Nenhum relatório encontrado.</p>
      )}
    </div>
  );
};

export default MiniRelatorios;
