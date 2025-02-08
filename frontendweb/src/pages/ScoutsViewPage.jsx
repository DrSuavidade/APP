import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/ScoutsViewPage.css";
import ScouterCard from "../components/ScouterCard";
import MiniRelatorios from "../components/MiniRelatorios";
import ProximasPartidasByScouter from "../components/ProximasPartidasByScouter";
import JogadoresDestacados from "../components/JogadoresDestacados";
import Cookies from 'js-cookie';

function ScoutsViewPage() {
    const [selectedScouter, setSelectedScouter] = useState(null);
    const [hideComponents, setHideComponents] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            navigate('/login');
        }

        const ID_TIPO = Cookies.get("ID_TIPO");
        if (ID_TIPO === "1") {
            navigate('/erro401');
        }
    }, [navigate]);

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

    return (
        <div className="main-container">
            <div className="content-container">
                <div className="left-container">
                    <ScouterCard 
                        onSelectScouter={handleSelectScouter} 
                        onToggleUsers={(hide) => setHideComponents(hide)} // Mantém a lógica de esconder
                    />
                </div>

                {!hideComponents && (
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
                            <JogadoresDestacados ID_USER={selectedScouter?.ID_USER} />
                        ) : (
                            <p>Selecione um Scouter para ver os detalhes.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ScoutsViewPage;
