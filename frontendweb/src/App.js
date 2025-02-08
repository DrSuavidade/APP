import React from "react";
import { BrowserRouter as Router } from "react-router-dom"; // Importa BrowserRouter
import "./App.css";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <Router> {/* Agora envolvemos tudo no Router */}
      <div className="App">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
