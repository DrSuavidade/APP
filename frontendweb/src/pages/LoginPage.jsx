import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/logineregistar.css";
import api from "../api/axios";
import { useEffect } from "react";
import Cookies from "js-cookie";



const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await api.post("/users/loginWeb", {
        EMAIL: email,
        PASSWORD: password,
      });
  
      Cookies.set("token", response.data.token, { expires: 1 }); // Expira em 1 dia
      Cookies.set("ID_USER", response.data.USER.ID_USER, { expires: 1 });
  
      navigate("/home");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Erro no login. Tente novamente.");
      } else {
        setError("Erro de rede. Verifique sua conexão.");
      }
    }
  }

  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <div className="login-container login-page">
      <div className="login-box">
        <div className="login-logo">
        <img src="/logo.png" alt="Logo" className="h-10" />
        </div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
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
            <p className ="text" >Password</p>
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
          <a className ="text" href="/forgot-password">Esqueceste-te da password?</a>
          <p className="bottom">
            Não tens conta? <a href="/register">Registrar</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
