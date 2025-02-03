import React, { useState } from "react";
import "../CSS/ScoutsViewPage.css";
import ScouterCard from "../components/ScouterCard"; 
import MiniRelatorios from "../components/MiniRelatorios";
import ProximasPartidasByScouter from "../components/ProximasPartidasByScouter";
import JogadoresDestacados from "../components/JogadoresDestacados"; // Importando o novo componente

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

function ScoutsViewPage() {
    const [selectedScouter, setSelectedScouter] = useState(null);

    return (
        <div className="main-container">
            <div className="content-container">
                {/* Área esquerda com a lista de scouters */}
                <div className="left-container">
                    <SearchScouter />
                    <ScouterCard onSelectScouter={setSelectedScouter} />
                </div>

                {/* Área direita com detalhes do scouter selecionado */}
                {selectedScouter && (
                    <div className="right-container">
                        <MiniRelatorios ID_USER={selectedScouter} />
                        <ProximasPartidasByScouter ID_USER={selectedScouter} />
                        <JogadoresDestacados ID_USER={selectedScouter} /> 
                        <button className="assign-event-button">Atribuir Evento</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ScoutsViewPage;
