import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Adiciona useNavigate
import "../CSS/AddScouterToEvent.css";
import ScouterCard from "../components/ScouterCard";
import SideBar from "../components/SideBar";
import Cookies from "js-cookie"; // Importar a biblioteca js-cookie

// SearchScouter Component
function SearchScouter() {
  return (
    <div className="search-scouter">
      <input type="text" placeholder="Escreva o nome do clube ou da equipa" />
      <button className="search-button">Pesquisar</button>
      <label className="select-all">
        <input type="checkbox" /> Selecionar Todos
      </label>
      <button className="add-button">Adicionar</button>
    </div>
  );
}

function AddScouterToEvent() {
  const [selectedScouter, setSelectedScouter] = useState(null);
  const navigate = useNavigate(); // Use o hook useNavigate para navegação

  useEffect(() => {
    const ID_TIPO = Cookies.get("ID_TIPO");
    if (ID_TIPO === "1") {
      navigate('/erro401'); // Redireciona para a página de erro 401 se o ID_TIPO for 1
    }
  }, [navigate]);

  return (
    <div className="main-container">
      <div className="content-container">
        <div className="left-container">
          <SearchScouter />
          <ScouterCard onSelectScouter={setSelectedScouter} />
          <button className="confirm-button">Confirmar</button>
        </div>
        <div className="right-container">
          <SideBar scouter={selectedScouter} />
        </div>
      </div>
    </div>
  );
}

export default AddScouterToEvent;
