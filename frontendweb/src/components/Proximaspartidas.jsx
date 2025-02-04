import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/Proximaspartidas.css";

const categories = ["Todos", "Sub-13", "Sub-14", "Sub-15", "Sub-16", "Sub-18", "Sub-19", "Sub-23", "Profissional"];

const UpcomingMatches = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const url = selectedCategory !== "Todos"
          ? `http://localhost:3000/api/proximas-partidas?ESCALAO=${selectedCategory}`
          : "http://localhost:3000/api/proximas-partidas";
        
        const response = await axios.get(url);
        setMatches(response.data);
        setError(null);
      } catch (error) {
        console.error("Erro ao buscar partidas:", error);
        setError("Nenhuma partida encontrada.");
      }
    };

    fetchMatches();
  }, [selectedCategory]); // Atualiza quando o escalão muda

  return (
    <aside className="upcoming-matches">
      <div className="category-selector">
        {categories.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? "selected" : ""}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <h2>PRÓXIMAS PARTIDAS</h2>

      {/* Se houver erro */}
      {error && <p className="erro">{error}</p>}

      <div className="match-header">
        <span>CASA</span>
        <span>FORA</span>
      </div>

      {matches.length > 0 ? (
        matches.map((match, index) => (
          <div key={index} className="match-card">
            <p className="match-teams">
              <strong>{match.JOGO}</strong>
            </p>
            <p className="match-info">
              <strong>Escalão:</strong> {match.ESCALAO}
            </p>
            <p className="match-info">
              <strong>Hora:</strong> {match.HORA} | <strong>Data:</strong> {new Date(match.DATA).toLocaleDateString()}
            </p>
            <p className="match-info">
              <strong>Local:</strong> {match.LOCAL}
            </p>
          </div>
        ))
      ) : (
        !error && <p className="no-matches">Nenhuma partida encontrada.</p>
      )}
    </aside>
  );
};

export default UpcomingMatches;