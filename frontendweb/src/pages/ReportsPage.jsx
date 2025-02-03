import React, { useState, useEffect } from "react";
import PlayerCard from "../components/PlayerCard";
import ListRelatorios from "../components/ListRelatorios";
import FichaRelatorio from "../components/FichaRelatorio";
import axios from "axios";
import "../CSS/ReportsPage.css"; // Importe o CSS específico para a ReportsPage

const ReportsPage = () => {
  const [selectedRelatorio, setSelectedRelatorio] = useState(null);

  useEffect(() => {
    const fetchRelatorios = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/relatorios-merged");
        if (response.data.length > 0) {
          setSelectedRelatorio(response.data[0].ID_RELATORIO);
        }
      } catch (error) {
        console.error("❌ Erro ao buscar relatórios:", error);
      }
    };

    fetchRelatorios();
  }, []);

  return (
      <div className="reports-page">
        <div className="reports-left">
          <div className="player-cards-container">
            <PlayerCard onSelectRelatorio={setSelectedRelatorio} />
          </div>
          <ListRelatorios onSelectRelatorio={setSelectedRelatorio} />
        </div>
        <div className="reports-right">
          {selectedRelatorio && <FichaRelatorio ID_RELATORIO={selectedRelatorio} />}
        </div>
      </div>
    );
    
};

export default ReportsPage;