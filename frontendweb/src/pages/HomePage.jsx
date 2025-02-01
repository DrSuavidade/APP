import React from 'react';
import SmallListUsers from '../components/SmallListUsers';
import Navbar from '../components/Navbar';
import PlayerCard from '../components/PlayerCard';
import SmallListPlayers from '../components/SmallListPlayers';
import SmallListEvents from '../components/SmallListEvents'

const App = () => {
  return (
    <div>
        <Navbar/>
        <PlayerCard/>
        <SmallListUsers />
        <SmallListPlayers/>
        <SmallListEvents/>
    </div>
  );
};

export default App;