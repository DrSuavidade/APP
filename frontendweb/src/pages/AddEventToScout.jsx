import React, { useState } from "react";
import "../CSS/AddEventToScout.css";

// Navbar Component
function Navbar() {
return (
<header className="navbar">
    <div className="logo">
        <img src="C:\Users\Utilizador\pi4-react\src\img\logo academico.png" alt="Logo" />
    </div>
    <div className="menu">
        <span>Plantel</span>
        <span>Jogadores</span>
        <span>Clubes</span>
        <span>Scouters</span>
        <span>Eventos</span>
        <span>Relatórios</span>
    </div>
</header>
);
}

// EventList Component
function EventList() {
const [events, setEvents] = useState([
{
scouter: "Marco Santos",
school: "Sub-16",
date: "21/01/2024",
time: "12:00 AM",
location: "Estádio da Fonte",
},
{
scouter: "Marco Santos",
school: "Sub-23",
date: "21/01/2024",
time: "12:00 AM",
location: "Estádio da Fonte",
},
{
scouter: "Marco Santos",
school: "Sub-14",
date: "21/01/2024",
time: "12:00 AM",
location: "Estádio da Fonte",
},
{
scouter: "Marco Santos",
school: "Profissionais",
date: "21/01/2024",
time: "12:00 AM",
location: "Estádio da Fonte",
},
]);

const handleConfirm = () => {
console.log("Eventos confirmados:", events);
// Aqui você pode integrar com a base de dados (ex: enviar via API)
};

return (
<div className="event-list-container">
    <div className="search-bar">
        <input type="text" placeholder="Escreva o nome do clube ou jogador" />
        <button className="search-button">Buscar</button>
    </div>
    <div className="event-list">
        {events.map((event, index) => (
        <div key={index} className="event-item">
            <div className="event-info">
                <span className="scouter">Scouter: {event.scouter}</span>
                <span className="school">{event.school}</span>
            </div>
            <div className="event-details">
                <span className="date">{event.date}</span>
                <span className="time">{event.time}</span>
                <span className="location">{event.location}</span>
            </div>
        </div>
        ))}
    </div>
    <button className="confirm-button" onClick={handleConfirm}>Confirmar</button>
</div>
);
}

// EventDetails Component
function EventDetails() {
return (
<div className="event-details-sidebar">
    <h3>Evento</h3>
    <p>21/01/2024</p>
    <p>12:00 AM</p>
    <p>A.F. Viseu vs. SL Nelas</p>
    <p>Estádio da Fonte</p>
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
            <EventDetails />
            <ScouterDetails />
            <HighlightedPlayers />
        </div>
    </div>
</div>
);
}

export default App;