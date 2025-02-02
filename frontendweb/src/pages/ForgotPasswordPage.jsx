import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/logineregistar.css";
import api from "../api/axios";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/users/recuperar_senha", { EMAIL: email });
      navigate("/forgot-password-confirm"); // Redirect to confirmation page
    } catch (error) {
      setError(error.response?.data?.message || "Erro ao recuperar a senha.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Recuperar Senha</h1>
        <form onSubmit={handleForgotPassword}>
          <div className="form-group">
            <p className="text">Digite seu e-mail</p>
            <input
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Enviando..." : "Recuperar Senha"}
          </button>
        </form>
        <div className="login-footer">
          <a className="text" href="/login">Voltar para Login</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
