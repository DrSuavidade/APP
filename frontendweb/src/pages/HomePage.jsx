import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import SmallListUsers from '../components/SmallListUsers';
import PlayerCard from '../components/PlayerCard';
import SmallListPlayers from '../components/SmallListPlayers';
import SmallListEvents from '../components/SmallListEvents';
import "../CSS/HUB.css";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se o token existe nos cookies
    const token = Cookies.get('token');
    if (!token) {
      navigate('/login'); // Redireciona para a página de login se não houver token
    }
  }, [navigate]);

  return (
    <div className="home-container">
      {/* Restante do código da Home Page */}
      <h2 className="relatorios-title">RELATÓRIOS PENDENTES</h2>
      <div className="top-section">
        <PlayerCard />
      </div>
      <div className="dashboard-container">
        <div className="scouters-section">
          <h2 className="section-title">SCOUTERS</h2>
          <SmallListUsers />
        </div>
        <div className="events-section">
          <h2 className="section-title">JOGOS</h2>
          <SmallListEvents />
        </div>
        <div className="players-section">
          <h2 className="section-title">JOGADORES</h2>
          <SmallListPlayers />
        </div>
      </div>
    </div>
  );
};

export default HomePage;