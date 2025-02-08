import React, { useState, useEffect } from "react";
import PlayerCard from "../components/PlayerCard";
import ListRelatorios from "../components/ListRelatorios";
import FichaRelatorio from "../components/FichaRelatorio";
import axios from "axios";
import "../CSS/ReportsPage.css"; // Importe o CSS específico para a ReportsPage
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const ReportsPage = () => {
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

    const fetchRelatorios = async () => {
      try {
        const response = await axios.get("https://backendscout-cx6c.onrender.com/api/relatorios-merged");
        if (response.data.length > 0) {
          setSelectedRelatorio(response.data[0].ID_RELATORIO);
        }
      } catch (error) {
        console.error("❌ Erro ao buscar relatórios:", error);
      }
    };

    fetchRelatorios();
  }, [navigate]);

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
