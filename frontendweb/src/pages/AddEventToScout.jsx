import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import "../CSS/AddEventToScout.css";
import EventCard from "../components/EventCard"; 
import ListaEventos2 from "../components/ListaEventos2"; 

const MainPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [selectedScouter, setSelectedScouter] = useState(null);

    useEffect(() => {
        const updateSelectedData = () => {
            const storedEventId = localStorage.getItem("selectedEvent");
            setSelectedEventId(storedEventId);
            
            // Verifica se o Scouter veio via state ou se precisa ser recuperado do localStorage
            if (location.state?.selectedScouter) {
                setSelectedScouter(location.state.selectedScouter);
                localStorage.setItem("selectedScouter", JSON.stringify(location.state.selectedScouter));
            } else {
                const storedScouter = localStorage.getItem("selectedScouter");
                setSelectedScouter(storedScouter ? JSON.parse(storedScouter) : null);
            }
        };

        window.addEventListener("storage", updateSelectedData);
        updateSelectedData();

        return () => {
            window.removeEventListener("storage", updateSelectedData);
        };
    }, [location.state]);

    const handleAddPlayer = () => {
        if (selectedScouter) {
            navigate("../players/add-to-event", { state: { selectedScouter } });
        }
    };

    return (
        <div className="main-page">
            <div className="grid-container">
                {/* Seção Esquerda: Lista de Eventos */}
                <div className="left-section">
                    <ListaEventos2 /> 
                </div>

                {/* Seção Direita: Detalhes do Evento e Scouter */}
                <div className="right-section">
                    {/* Exibir o Evento Selecionado */}
                    {selectedEventId ? (
                        <EventCard eventId={selectedEventId} /> 
                    ) : (
                        <p className="text-center text-gray-300">Selecione um evento na lista.</p>
                    )}

                    {/* Exibir o Scouter Selecionado */}
                    {selectedScouter ? (
                        <>
                            <div className="scouter-info-card">
                                <h3>Scouter</h3>
                                <div className="scouter-avatar"></div>
                                <p><strong>{selectedScouter.NOME}</strong></p>
                                <p className="scouter-role">Scouter</p>
                                <p>{selectedScouter.AVALIACOES} Avaliações</p>
                            </div>
                            <button 
                                className="add-player-button" 
                                onClick={handleAddPlayer}
                            >
                                Adicionar Jogador
                            </button>
                        </>
                    ) : (
                        <p className="text-center text-gray-300">Nenhum Scouter Selecionado</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
