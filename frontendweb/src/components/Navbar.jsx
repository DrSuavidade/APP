import React, { useEffect, useState } from "react";
import "../CSS/Navbar.css";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2"; // Importa o SweetAlert

const Navbar = () => {
  const [userID, setUserID] = useState(null);
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState(null); // Adicionado estado para armazenar ID_TIPO
  const [showDropdown, setShowDropdown] = useState(false); // Estado para controlar o dropdown
  const navigate = useNavigate();

  useEffect(() => {
    // Busca o ID, nome e tipo do usuário dos cookies
    const storedID = Cookies.get("ID_USER");
    const storedName = Cookies.get("USER_NAME"); // Adicione o nome do usuário ao cookie no login
    const storedType = Cookies.get("ID_TIPO"); // Adicione o ID_TIPO ao cookie no login

    setUserID(storedID);
    setUserName(storedName || "Usuário"); // Fallback para "Usuário" se o nome não estiver disponível
    setUserType(storedType); // Definindo o tipo de usuário
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: 'Tem certeza que deseja sair?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, sair',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Limpa os cookies
        Cookies.remove("token");
        Cookies.remove("ID_USER");
        Cookies.remove("USER_NAME");
        Cookies.remove("ID_TIPO");
        // Redireciona para a página de login
        navigate("/login");
      }
    });
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
        {/* Esconde SCOUTERS se o ID_TIPO for 1 */}
        {userType !== "1" && (
          <li className="cursor-pointer hover:opacity-80">
            <Link to="/scouts" className="nav-link">SCOUTERS</Link>
          </li>
        )}
        <li className="bg-gray-800 px-4 py-2 rounded">
          <Link to="/events" className="nav-link">EVENTOS</Link>
        </li>
        {/* Esconde RELATÓRIOS se o ID_TIPO for 1 */}
        {userType !== "1" && (
          <li className="cursor-pointer hover:opacity-80">
            <Link to="/reports" className="nav-link">RELATÓRIOS</Link>
          </li>
        )}
        <li
          className="relative cursor-pointer hover:opacity-80"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <div className="flex items-center space-x-2">
            <FaUser className="text-xl" />
            <span>{userName}</span>
          </div>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
              <div
                className="px-4 py-2 hover:bg-gray-200 flex items-center space-x-2"
                onClick={handleLogout}
              >
                <FaSignOutAlt />
                <span>Sair</span>
              </div>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
