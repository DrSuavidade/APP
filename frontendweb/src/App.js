import React from 'react';
import './App.css';
import AppRoutes from './routes/AppRoutes'; // Certifica-te de que o caminho está correto

function App() {
  return (
    <div className="App">
      <div className="page-container">
        {/* Invocar as rotas existentes */}
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
