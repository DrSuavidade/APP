import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardHistory from "../components/CardHistory";
import ListHistory from "../components/ListHistory";
import FichaRelatorio from "../components/FichaRelatorio";
import axios from "axios";

const ReportsHistory = () => {
  const { ID_JOGADORES } = useParams(); // Pegando o ID do jogador pela URL
  const [selectedRelatorio, setSelectedRelatorio] = useState(null);

  useEffect(() => {
    const fetchFirstRelatorio = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/player/reports/${ID_JOGADORES}`);
        if (response.data.length > 0) {
          setSelectedRelatorio(response.data[0].ID_RELATORIO); // Pegando o primeiro relatório
        }
      } catch (error) {
        console.error("❌ Erro ao buscar relatórios:", error);
      }
    };

    fetchFirstRelatorio();
  }, [ID_JOGADORES]); // Atualiza sempre que o ID do jogador mudar

  return (
    <div>
      <h1>Histórico de Relatórios</h1>

      {/* Passando o ID recebido via URL */}
      <CardHistory ID_JOGADORES={ID_JOGADORES} onSelectRelatorio={setSelectedRelatorio} />
      <ListHistory ID_JOGADORES={ID_JOGADORES} onSelectRelatorio={setSelectedRelatorio} />

      {/* Somente exibir FichaRelatorio se houver um relatório selecionado */}
      {selectedRelatorio && <FichaRelatorio ID_RELATORIO={selectedRelatorio} />}
    </div>
  );
};

export default ReportsHistory;
