import React from 'react';
import './App.css';
import AppRoutes from './routes/AppRoutes'; // Certifica-te de que o caminho está correto

function App() {
  return (
    <div className="App">
      {/* Invocar as rotas existentes */}
      <AppRoutes />
    </div>
  );
}

export default App;
