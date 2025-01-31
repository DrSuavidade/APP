import React from 'react';
import SmallListUsers from '../components/SmallListUsers';
import Navbar from '../components/Navbar';
import PlayerCard from '../components/PlayerCard';

const App = () => {
  return (
    <div>
        <Navbar/>
        <PlayerCard/>
        <SmallListUsers />
    </div>
  );
};

export default App;