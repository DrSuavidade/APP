import React from 'react';
import SmallListUsers from '../components/SmallListUsers';
import PlayerCard from '../components/PlayerCard';
import SmallListPlayers from '../components/SmallListPlayers';
import SmallListEvents from '../components/SmallListEvents';
import "../CSS/HUB.css";

const HomePage = () => {
  return (
    <div className="home-container">
      {/* Título RELATÓRIOS AVALIADOS acima dos cards */}
      <h2 className="relatorios-title">RELATÓRIOS AVALIADOS</h2>
      
      {/* Relatórios Avaliados - Alinhados na mesma linha */}
      <div className="top-section">
        <PlayerCard />
      </div>

      {/* Container principal com as três colunas alinhadas */}
      <div className="dashboard-container">
        {/* Lista de Scouters à esquerda */}
        <div className="scouters-section">
          <h2 className="section-title">SCOUTERS</h2>
          <SmallListUsers />
        </div>

        {/* Eventos Recentes no centro, alinhado com as outras seções */}
        <div className="events-section"> 
        <h2 className="section-title">JOGOS</h2>
          <SmallListEvents />
        </div>

        {/* Lista de Jogadores à direita */}
        <div className="players-section">
          <h2 className="section-title">JOGADORES</h2>
          <SmallListPlayers />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
