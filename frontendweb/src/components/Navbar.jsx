import React from 'react';
//import Navbar from './components/Navbar';
import "../CSS/Navbar.css";

const Navbar = () => {
    return (
      <nav className="bg-black text-white flex items-center justify-between px-6 py-3">
        <div className="flex items-center">
        <img src="/logo.png" alt="Logo" className="h-10" />
        </div>
        <ul className="flex space-x-6">
          <li className="cursor-pointer hover:opacity-80">PLANTEL</li>
          <li className="cursor-pointer hover:opacity-80">JOGADORES</li>
          <li className="cursor-pointer hover:opacity-80">CLUBES</li>
          <li className="cursor-pointer hover:opacity-80">SCOUTERS</li>
          <li className="bg-gray-800 px-4 py-2 rounded">EVENTOS</li>
          <li className="cursor-pointer hover:opacity-80">RELATÓRIOS</li>
        </ul>
      </nav>
    );
  };
  
  export default Navbar;
