import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/FloatingButton.css"; // Estilo para o botão flutuante

const FloatingButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/microsite"); // Redireciona para /microsite
  };

  return (
    <div className="floating-button" onClick={handleClick}>
      Descarregue a App
    </div>
  );
};

export default FloatingButton;