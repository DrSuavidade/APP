import React, { useEffect, useState } from "react";
import "../CSS/Navbar.css";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [userID, setUserID] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Aguarda a leitura correta do cookie
    const storedID = Cookies.get("ID_USER");
    setUserID(storedID);
  }, []);

  const handleLogout = () => {
    // Limpa os cookies
    Cookies.remove("token");
    Cookies.remove("ID_USER");
    // Redireciona para a página de login
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white flex items-center justify-between px-6 py-3">
      <div className="flex items-center">
        <Link to="/home">
          <img src="/logo.png" alt="Logo" className="h-10 cursor-pointer" />
        </Link>
      </div>
      <ul className="flex space-x-6 text-white">
        <li className="cursor-pointer hover:opacity-80">
          <Link to="/team/shadow" className="nav-link">PLANTEL</Link>
        </li>
        <li className="cursor-pointer hover:opacity-80">
          <Link to="/players" className="nav-link">JOGADORES</Link>
        </li>
        <li className="cursor-pointer hover:opacity-80">
          {userID ? (
            <Link to={`/clubs/${userID}`} className="nav-link">CLUBES</Link>
          ) : (
            <span className="nav-link text-gray-400">CLUBES</span>
          )}
        </li>
        <li className="cursor-pointer hover:opacity-80">
          <Link to="/scouts" className="nav-link">SCOUTERS</Link>
        </li>
        <li className="bg-gray-800 px-4 py-2 rounded">
          <Link to="/events" className="nav-link">EVENTOS</Link>
        </li>
        <li className="cursor-pointer hover:opacity-80">
          <Link to="/reports" className="nav-link">RELATÓRIOS</Link>
        </li>
        <li className="cursor-pointer hover:opacity-80" onClick={handleLogout}>
          <span className="nav-link">Sair ou Mudar de Conta</span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
