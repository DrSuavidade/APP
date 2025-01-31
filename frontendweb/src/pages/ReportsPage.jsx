import React, { useState, useEffect } from "react";
import PlayerCard from "../components/PlayerCard";
import ListRelatorios from "../components/ListRelatorios";
import FichaRelatorio from "../components/FichaRelatorio";
import axios from "axios";

const ReportsPage = () => {
  const [selectedRelatorio, setSelectedRelatorio] = useState(null);
  

  useEffect(() => {
    // Buscar a lista de relatórios e selecionar o primeiro automaticamente
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
    <div className="report-section">
      <PlayerCard onSelectRelatorio={setSelectedRelatorio} />
      <ListRelatorios onSelectRelatorio={setSelectedRelatorio} />
      {selectedRelatorio && <FichaRelatorio ID_RELATORIO={selectedRelatorio} />}
    </div>
  );
};

export default ReportsPage;
