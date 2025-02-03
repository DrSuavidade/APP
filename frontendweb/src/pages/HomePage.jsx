import React from 'react';
import SmallListUsers from '../components/SmallListUsers';
import Navbar from '../components/Navbar';
import PlayerCard from '../components/PlayerCard';
import SmallListPlayers from '../components/SmallListPlayers';
import SmallListEvents from '../components/SmallListEvents';
import "../CSS/HUB.css";

const App = () => {
  return (
    <div className="homepage-container">
      {/* Navbar no topo */}
      <Navbar />

      {/* PlayerCard centralizado abaixo da Navbar */}
      <div className="player-card-container">
        <PlayerCard />
      </div>

      {/* Seção inferior com três colunas */}
      <div className="main-content">
        <div className="column users">
          <SmallListUsers />
        </div>
        <div className="column events">
          <SmallListEvents />
        </div>
        <div className="column players">
          <SmallListPlayers />
        </div>
      </div>
    </div>
  );
};

export default App;