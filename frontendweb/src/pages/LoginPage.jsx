import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/login.css";
import api from "../api/axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/users/login", {
        EMAIL: email,
        PASSWORD: password,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Erro no login. Tente novamente.");
      } else {
        setError("Erro de rede. Verifique sua conexão.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo">
          <img src="/logo.png" alt="Logo" />
        </div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">
            Log in
          </button>
        </form>
        <div className="login-footer">
          <a href="/forgot-password">Esqueceste-te da password?</a>
          <p>
            Não tens conta? <a href="/register">Registrar</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
