import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/reports">Relatórios</Link></li>
        <li><Link to="/clubs">Clubes</Link></li>
        <li><Link to="/events">Eventos</Link></li>
        <li><Link to="/players">Jogadores</Link></li>
        <li><Link to="/team">Equipa</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
