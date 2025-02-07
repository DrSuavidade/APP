import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/JogadoresDestacados.css";

const JogadoresDestacados = ({ ID_USER }) => {
  const [jogadores, setJogadores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJogadores = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/jogador/list/${ID_USER}`);
        setJogadores(response.data);
      } catch (error) {
        console.error("❌ Erro ao buscar jogadores destacados:", error);
        setJogadores([]);
      } finally {
        setLoading(false);
      }
    };

    if (ID_USER) {
      fetchJogadores();
    }
  }, [ID_USER]);

  if (loading) {
    return <p>Carregando jogadores...</p>;
  }

  if (!jogadores || jogadores.length === 0) {
    return <p className="text-gray">Nenhum jogador destacado.</p>;
  }

  return (
    <div className="jogadores-destacados-container">
      <h3>JOGADORES DESTACADOS</h3>
      <div className="jogadores-list">
        {jogadores.map((jogador) => (
          <div key={jogador.ID_JOGADORES} className="jogador-item">
            <div className="jogador-avatar"></div>
            <div className="jogador-info">
              <span className="nome">{jogador.NOME}</span>
              <span className="idade">{jogador.IDADE} anos</span>
              <span className="ano">{jogador.ANO_NASC}</span>
              <span className="relatorio">
                Relatório: {jogador.ID_RELATORIO ? `#${jogador.ID_RELATORIO}` : "Sem relatório"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JogadoresDestacados;
