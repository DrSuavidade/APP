import React, { useState } from "react";
import "../CSS/AddScouterToEvent.css";
import ScouterCard from "../components/ScouterCard";
import SideBar from "../components/SideBar";

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
