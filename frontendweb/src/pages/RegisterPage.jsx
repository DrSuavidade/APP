import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/register.css";
import api from "../api/axios";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      const response = await api.post("/users/registoweb", {
        EMAIL: email,
        NOME: name,
        PASSWORD: password,
        ID_TIPO: 1, 
      });

      if (response.status === 201) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 2000); 
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Erro ao criar conta.");
      } else {
        setError("Erro de rede. Verifique sua conexão.");
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-logo">
          <img src="frontendweb\src\img\logo.png" alt="Logo" />
        </div>
        <h1>Registrar</h1>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <p className ="text">Email</p>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
             <p className ="text">Nome</p>
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
             <p className ="text">Password</p>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <p className ="text">Confirm Password</p>
            <input
              type="password"
              placeholder="Confirmar Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">Conta criada com sucesso!</p>}
          <button type="submit" className="register-button">
            Create Account
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
