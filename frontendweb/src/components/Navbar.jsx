import React from 'react';
//import Navbar from './components/Navbar';
import "../CSS/Navbar.css";
import { Link } from "react-router-dom";


const Navbar = () => {
    return (
      <nav className="bg-black text-white flex items-center justify-between px-6 py-3">
        <div className="flex items-center">
        <Link to="/home">
  <img src="/logo.png" alt="Logo" className="h-10 cursor-pointer" />
</Link>
        </div>
        <ul className="flex space-x-6">
        <ul className="flex space-x-6 text-white">
  <li className="cursor-pointer hover:opacity-80">
    <Link to="/team/shadow" className="nav-link">PLANTEL</Link>
  </li>
  <li className="cursor-pointer hover:opacity-80">
    <Link to="/players" className="nav-link">JOGADORES</Link>
  </li>
  <li className="cursor-pointer hover:opacity-80">
    <Link to="/clubs" className="nav-link">CLUBES</Link>
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
</ul>
</ul>
      </nav>
    );
  };
  
  export default Navbar;
