import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/logineregistar.css";
import api from "../api/axios";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    try {
      await api.post("/users/registoweb", {
        EMAIL: email,
        NOME: name,
        PASSWORD: password,
        ID_TIPO: 1,
      });

      navigate("/register/confirm"); // Redirect to confirmation page
    } catch (error) {
      setError(error.response?.data?.message || "Erro ao criar conta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Registrar</h1>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <p className="text">Email</p>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <p className="text">Nome</p>
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <p className="text">Senha</p>
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <p className="text">Confirmar Senha</p>
            <input
              type="password"
              placeholder="Confirmar Senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="register-button" disabled={loading}>
            {loading ? "Criando Conta..." : "Criar Conta"}
          </button>
        </form>
        <div className="register-footer">
          <p>
            Já tens conta? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
