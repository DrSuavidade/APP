import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/ScoutsViewPage.css";
import ScouterCard from "../components/ScouterCard";
import MiniRelatorios from "../components/MiniRelatorios";
import ProximasPartidasByScouter from "../components/ProximasPartidasByScouter";
import JogadoresDestacados from "../components/JogadoresDestacados";

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
    const navigate = useNavigate();

    const handleSelectScouter = (scouter) => {
        setSelectedScouter(scouter);
        localStorage.setItem("selectedScouter", JSON.stringify(scouter));
        window.dispatchEvent(new Event("storage"));
    };

    const handleAssignEvent = () => {
        if (selectedScouter) {
            navigate("../events/AddEventToScout", { state: { selectedScouter } });
        }
    };

    const handleAddPlayer = () => {
        if (selectedScouter) {
            navigate("../players/add-to-event", { state: { selectedScouter } });
        }
    };

    return (
        <div className="main-container">
            <div className="content-container">
                <div className="left-container">
                    <SearchScouter />
                    <ScouterCard onSelectScouter={handleSelectScouter} />
                </div>

                <div className="right-container">
                    <MiniRelatorios ID_USER={selectedScouter?.ID_USER} />
                    <ProximasPartidasByScouter ID_USER={selectedScouter?.ID_USER} />
                    <button 
                        className={`assign-event-button ${!selectedScouter ? "disabled" : ""}`} 
                        onClick={handleAssignEvent} 
                        disabled={!selectedScouter}
                    >
                        Atribuir Evento
                    </button>
                    {selectedScouter ? (
                        <>
                            <JogadoresDestacados ID_USER={selectedScouter?.ID_USER} />
                            <button 
                                className="add-player-button" 
                                onClick={handleAddPlayer}
                            >
                                Adicionar Jogador
                            </button>
                        </>
                    ) : (
                        <p>Selecione um Scouter para ver os detalhes.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ScoutsViewPage;
