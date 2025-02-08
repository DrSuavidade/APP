import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CardHistory from "../components/CardHistory";
import ListHistory from "../components/ListHistory";
import FichaRelatorio from "../components/FichaRelatorio";
import axios from "axios";
import "../CSS/ReportsPage.css"; // Importando o mesmo CSS da ReportsPage
import Cookies from 'js-cookie';

const ReportsHistory = () => {
  const { ID_JOGADORES } = useParams(); // Pegando o ID do jogador pela URL
  const [selectedRelatorio, setSelectedRelatorio] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se o token existe nos cookies
    const token = Cookies.get('token');
    if (!token) {
      navigate('/login'); // Redireciona para a página de login se não houver token
    }

    const ID_TIPO = Cookies.get("ID_TIPO");
    if (ID_TIPO === "1") {
      navigate('/erro401'); // Redireciona para a página de erro 401 se o ID_TIPO for 1
    }

    const fetchFirstRelatorio = async () => {
      try {
        const response = await axios.get(`https://backendscout-cx6c.onrender.com/api/player/reports/${ID_JOGADORES}`);
        if (response.data.length > 0) {
          setSelectedRelatorio(response.data[0].ID_RELATORIO); // Pegando o primeiro relatório
        }
      } catch (error) {
        console.error("❌ Erro ao buscar relatórios:", error);
      }
    };

    fetchFirstRelatorio();
  }, [ID_JOGADORES, navigate]); // Atualiza sempre que o ID do jogador mudar

  return (
    <div className="reports-page"> 
      <div className="reports-left">
        <div className="player-cards-container">
          <CardHistory ID_JOGADORES={ID_JOGADORES} onSelectRelatorio={setSelectedRelatorio} />
        </div>
        <ListHistory ID_JOGADORES={ID_JOGADORES} onSelectRelatorio={setSelectedRelatorio} />
      </div>
      <div className="reports-right">
        {selectedRelatorio && <FichaRelatorio ID_RELATORIO={selectedRelatorio} />}
      </div>
    </div>
  );
};

export default ReportsHistory;
