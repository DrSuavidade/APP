import React, { useEffect, useState } from "react";
import api from "../api/axios"; 
import "../CSS/ScouterCard.css";

function ScouterCard({ onSelectScouter }) {
  const [scouters, setScouters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScouters = async () => {
      try {
        const response = await api.get("/users/tipo/3");
        setScouters(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar scouters:", error);
        setError("Erro ao carregar os dados.");
        setLoading(false);
      }
    };

    fetchScouters();
  }, []);

  if (loading) {
    return <p>Carregando scouters...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="scouter-list">
      {scouters.length > 0 ? (
        scouters.map((scouter) => (
          <div
            key={scouter.ID_USER}
            className="scouter-card"
            onClick={() => onSelectScouter(scouter)}
          >
            <div className="scouter-avatar"></div>
            <div className="scouter-info">
              <span className="name">{scouter.NOME}</span>
              <span className="role">Scouter</span>
            </div>
          </div>
        ))
      ) : (
        <p>Nenhum scouter encontrado.</p>
      )}
    </div>
  );
}

export default ScouterCard;
