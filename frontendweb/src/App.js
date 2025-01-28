import React from 'react';
import Navbar from './components/Navbar'; // Garante que o caminho esteja correto
import './App.css';
import AppRoutes from './routes/AppRoutes'; // Certifica-te de que o caminho está correto

function App() {
  return (
    <div className="App">
      <div className="page-container">
        {/* Invocar as rotas existentes */}
        <AppRoutes />
      <div>
          <Navbar />
          {/* Outras páginas/conteúdo abaixo */}
      </div>
      </div>
      </div>
  );
}

export default App;
