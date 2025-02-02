import React, { useState } from "react";
import "../CSS/Proximaspartidas.css";

const categories = ["Sub-13", "Sub-14", "Sub-15", "Sub-16", "Sub-18", "Sub-19", "Sub-23", "Profissional"];

const matches = [
  { casa: "A.C. VISEU", fora: "SL NELAS", hora: "12:00", data: "25/10/2024", categoria: "Sub-19" },
  { casa: "A.C. CASTRO DAIRE", fora: "SL TONDELA", hora: "10:00", data: "25/10/2024", categoria: "Sub-23" },
  { casa: "LUS LAMA LOBOS", fora: "A.C CASTRO DAIRE", hora: "16:00", data: "25/10/2024", categoria: "Sub-18" },
  { casa: "F.C. PAÇO DE FERREIRA", fora: "F.C ALMADA", hora: "18:00", data: "25/10/2024", categoria: "Profissional" },
];

const UpcomingMatches = () => {
  const [selectedCategory, setSelectedCategory] = useState("Sub-19");

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
      <div className="match-header">
        <span>CASA</span>
        <span>FORA</span>
      </div>
      {matches.filter(match => match.categoria === selectedCategory).map((match, index) => (
        <div key={index} className="match-card">
          <p className="match-teams">
            <strong>{match.casa}</strong> vs <strong>{match.fora}</strong>
          </p>
          <p className="match-info">
            <strong>Hora:</strong> {match.hora} | <strong>Data:</strong> {match.data}
          </p>
        </div>
      ))}
    </aside>
  );
};

export default UpcomingMatches;
