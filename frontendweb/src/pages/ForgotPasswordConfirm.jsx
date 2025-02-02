import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/logineregistar.css";

const ForgotPasswordConfirm = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Email Enviado!</h1>
        <p className="text">Verifique seu e-mail para obter sua nova senha.</p>
        <button className="login-button" onClick={() => navigate("/login")}>
          Voltar para Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordConfirm;
