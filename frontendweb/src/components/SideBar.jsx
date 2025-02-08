import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/sidebar.css";
import ScouterCard from "../components/ScouterCard";

const EventCard = () => {
    const [evento, setEvento] = useState(null);

    useEffect(() => {
        axios.get("https://backendscout-cx6c.onrender.com/api/eventos/recentes")
            .then(response => setEvento(response.data[0]))
            .catch(error => console.error("Erro ao buscar evento:", error));
    }, []);

    if (!evento) return <p>Carregando evento...</p>;

    return (
        <div className="event-card">
            <h3 className="event-title">EVENTO</h3>
            <p className="event-date">{evento.DATA}</p>
            <div className="event-details">
                <span className="home-team">{evento.EQUIPA_CASA}</span>
                <span className="event-time">{evento.HORA}</span>
                <span className="away-team">{evento.VISITANTE}</span>
            </div>
            <p className="event-location">
                <span className="material-icons">place</span> {evento.LOCAL}
            </p>
        </div>
    );
};

const SideBar = () => {
    const [selectedScouter, setSelectedScouter] = useState(null);

    useEffect(() => {
        const loadScouter = () => {
            const storedScouter = localStorage.getItem("selectedScouter");
            if (storedScouter) {
                setSelectedScouter(JSON.parse(storedScouter));
            }
        };

        loadScouter();

        window.addEventListener("storage", loadScouter);
        return () => window.removeEventListener("storage", loadScouter);
    }, []);

    return (
        <div className="sidebar">
            <EventCard />
            {selectedScouter ? (
            <ScouterCard scouter={selectedScouter} />
            ) : (
                <p>Nenhum Scouter Selecionado</p>
            )}
        </div>
    );
};

export default SideBar;
