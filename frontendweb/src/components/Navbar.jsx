import React, { useEffect, useState } from "react";
import "../CSS/Navbar.css";
import Cookies from "js-cookie";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2"; // Importa o SweetAlert

const Navbar = () => {
  const location = useLocation(); // Obtém a URL atual
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = Cookies.get("USER_NAME");
    const storedType = Cookies.get("ID_TIPO");
    setUserName(storedName || "Usuário");
    setUserType(storedType);
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Tem certeza que deseja sair?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, sair",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove("token");
        Cookies.remove("ID_USER");
        Cookies.remove("user");
        Cookies.remove("ID_TIPO");
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
        <li className={location.pathname === "/team/shadow" ? "active" : ""}>
          <Link to="/team/shadow" className="nav-link">PLANTEL</Link>
        </li>
        <li className={location.pathname === "/players" ? "active" : ""}>
          <Link to="/players" className="nav-link">JOGADORES</Link>
        </li>
        <li className={location.pathname === "/clubs" ? "active" : ""}>
          <Link to="/clubs" className="nav-link">CLUBES</Link>
        </li>
        {userType !== "1" && (
          <li className={location.pathname === "/scouts" ? "active" : ""}>
            <Link to="/scouts" className="nav-link">SCOUTERS</Link>
          </li>
        )}
        <li className={location.pathname === "/events" ? "active" : ""}>
          <Link to="/events" className="nav-link">EVENTOS</Link>
        </li>
        {userType !== "1" && (
          <li className={location.pathname === "/reports" ? "active" : ""}>
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
