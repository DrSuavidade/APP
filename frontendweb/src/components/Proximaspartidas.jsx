import React from "react";
import "../CSS/eventsviewpage.css";


const matches = [
  { casa: "A.C. VISEU", fora: "SL NELAS", hora: "12:00", data: "25/10/2024" },
  { casa: "A.C. CASTRO DAIRE", fora: "SL TONDELA", hora: "10:00", data: "25/10/2024" },
  { casa: "LUS LAMA LOBOS", fora: "A.C CASTRO DAIRE", hora: "16:00", data: "25/10/2024" },
  { casa: "F.C. PAÇO DE FERREIRA", fora: "F.C ALMADA", hora: "18:00", data: "25/10/2024" },

];

const UpcomingMatches = () => {
  return (
    <aside className="upcoming-matches">
      <h2>PRÓXIMAS PARTIDAS</h2>
      {matches.map((match, index) => (
        <div key={index} className="match-card">
          <p className="match-teams"><strong>{match.casa}</strong> vs <strong>{match.fora}</strong></p>
          <p className="match-info">
            <strong>Hora:</strong> {match.hora} | <strong>Data:</strong> {match.data}
          </p>
        </div>
      ))}
    </aside>
  );
};

export default UpcomingMatches;
