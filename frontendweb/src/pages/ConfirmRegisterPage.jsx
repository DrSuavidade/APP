import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/logineregistar.css";

const ConfirmRegister = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Conta Criada!</h1>
        <p className="text">Seu cadastro foi realizado com sucesso.</p>
        <button className="login-button" onClick={() => navigate("/login")}>
          Ir para Login
        </button>
      </div>
    </div>
  );
};

export default ConfirmRegister;
