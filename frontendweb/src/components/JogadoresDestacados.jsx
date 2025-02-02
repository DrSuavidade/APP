import React, { useEffect, useState } from "react";
import api from "../api/axios"; // Importando a instância do axios
import "../CSS/JogadoresDestacados.css"; // Arquivo de estilos

const JogadoresDestacados = ({ ID_USER }) => {
  const [jogadores, setJogadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ID_USER) return;

    const fetchJogadores = async () => {
      try {
        const response = await api.get(`/jogador/list/${ID_USER}`);
        setJogadores(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar jogadores:", err);
        setError("Erro ao carregar os jogadores.");
        setLoading(false);
      }
    };

    fetchJogadores();
  }, [ID_USER]);

  const calcularIdade = (dataNasc) => {
    const nascimento = new Date(dataNasc);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  };

  if (loading) return <p>Carregando jogadores...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="jogadores-destacados-container">
      <h3>JOGADORES DESTACADOS</h3>
      <div className="jogadores-list">
        {jogadores.length > 0 ? (
          jogadores.map((jogador) => (
            <div key={jogador.ID_JOGADORES} className="jogador-item">
              <div className="jogador-avatar"></div>
              <div className="jogador-info">
                <span className="nome">NOME: {jogador.NOME}</span>
                <span className="idade">IDADE: {calcularIdade(jogador.DATA_NASC)}</span>
                <span className="ano">{new Date(jogador.DATA_NASC).getFullYear()}</span>
              </div>
              <div className="avaliacao">
                <span className="nota">{jogador.NOTA_ADM}</span>
                <span className="estrela">★</span>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum jogador encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default JogadoresDestacados;
