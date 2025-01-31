import React, { useState } from "react";
import "../CSS/AddEventToScout.css";

// Navbar Component
function Navbar() {
return (
<header>
</header>
);
}

// EventList Component
function EventList() {
const [events, setEvents] = useState([
        {
            scouter: "Marco Santos",
            team1: "A.F. VISEU",
            team2: "SL NELAS",
            school: "Sub-16",
            date: "25/10/2024",
            time: "12:00 AM",
            location: "Estádio do Fontelo",
        },
        // Adicione outros eventos aqui, se necessário
    ]);

    return (
        <div className="event-list-container">
            {events.map((event, index) => (
                <div key={index} className="event-item">
                    <div className="event-info">
                        <span className="scouter">Scouter: {event.scouter}</span>
                        <span>{event.team1}</span>
                        <span>{event.team2}</span>
                    </div>
                    <div className="event-details">
                        <span>{event.school}</span>
                        <span>{event.date}</span>
                        <span>{event.time}</span>
                        <span className="location">{event.location}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

// ScouterDetails Component
function ScouterDetails() {
return (
<div className="scouter-details">
    <h3>Scouter</h3>
    <div className="scouter-card">
        <div className="scouter-avatar"></div>
        <div className="scouter-info">
            <span className="name">Armando Silva</span>
            <span className="role">Scouter</span>
            <span className="reviews">5 Avaliações</span>
        </div>
    </div>
</div>
);
}

// HighlightedPlayers Component
function HighlightedPlayers() {
return (
<div className="highlighted-players">
    <h3>Jogadores Destacados</h3>
    <button className="add-player-button">Adicionar Jogador</button>
</div>
);
}

// Main App Component
function App() {
return (
<div className="main-container">
    <Navbar />
    <div className="content-container">
        <EventList />
        <div className="sidebar">
            <ScouterDetails />
            <HighlightedPlayers />
        </div>
    </div>
</div>
);
}

export default App;