import React from "react";
import "../CSS/Loader.css"; // Ajuste o caminho conforme necessário

const Loader = () => {
  return (
    <div className="loader-container">
      <img src="/logo.png" alt="Logo" className="loader-logo" /> {/* Se estiver em 'public/' */}
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;
