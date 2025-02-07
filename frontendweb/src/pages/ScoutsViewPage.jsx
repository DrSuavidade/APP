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
    const navigate = useNavigate();

    useEffect(() => {
        // Verifica se o token existe nos cookies
        const token = Cookies.get('token');
        if (!token) {
            navigate('/login'); // Redireciona para a página de login se não houver token
        }

        const ID_TIPO = Cookies.get("ID_TIPO");
        if (ID_TIPO === "1") {
            navigate('/erro401'); // Redireciona para a página de erro 401 se o ID_TIPO for 1
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
                        <JogadoresDestacados ID_USER={selectedScouter?.ID_USER} />
                    ) : (
                        <p>Selecione um Scouter para ver os detalhes.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ScoutsViewPage;
