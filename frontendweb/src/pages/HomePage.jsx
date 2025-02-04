import React from 'react';
import SmallListUsers from '../components/SmallListUsers';
import Navbar from '../components/Navbar';
import PlayerCard from '../components/PlayerCard';
import SmallListPlayers from '../components/SmallListPlayers';
import SmallListEvents from '../components/SmallListEvents';
import "../CSS/HUB.css"; 

const HomePage = () => {
  return (
    <div className="home-container">
      {/* Relatórios Avaliados - Alinhados na mesma linha */}
      <div className="top-section">
        <PlayerCard />
      </div>

      {/* Container principal com as três colunas */}
      <div className="dashboard-container">
        {/* Lista de Scouters à esquerda */}
        <div className="scouters-section">
          <SmallListUsers />
        </div>

        {/* Eventos Recentes no centro */}
        <div className="events-section">
          <SmallListEvents />
        </div>

        {/* Lista de Jogadores à direita */}
        <div className="players-section">
          <SmallListPlayers />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
