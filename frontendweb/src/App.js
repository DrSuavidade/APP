import React from 'react';
import './App.css';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <div className="App">
      <div className="page-container">
        <AppRoutes /> {/* Mantemos apenas o AppRoutes */}
      </div>
    </div>
  );
}

export default App;
