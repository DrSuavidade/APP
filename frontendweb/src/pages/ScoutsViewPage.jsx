import React from "react";
import "../CSS/ScoutsViewPage.css";

// Navbar Component
function Navbar() {
return (
<header className="navbar">
    <div className="logo">
        <img src="/path/to/logo.png" alt="Logo" />
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

// ScouterList Component
function ScouterList() {
const scouters = [
{ name: "Armando Silva", role: "Scouter", reviews: "5 Avaliações" },
{ name: "Ernesto Tivelli", role: "Convidado", reviews: "1 Avaliação" },
];

return (
<div className="scouter-list">
    {scouters.map((scouter, index) => (
    <div key={index} className="scouter-card">
        <div className="scouter-avatar"></div>
        <div className="scouter-info">
            <span className="name">{scouter.name}</span>
            <span className="role">{scouter.role}</span>
            <span className="reviews">{scouter.reviews}</span>
        </div>
    </div>
    ))}
</div>
);
}

// ScouterDetails Component
function ScouterDetails() {
return (
<div className="scouter-details-sidebar">
    <h3>Armando Silva</h3>
    <p className="role">SCOUTER</p>
    <p className="email">armandossilva@gmail.com</p>
    <p className="reviews">5 avaliações</p>
</div>
);
}

// EvaluationHistory Component
function EvaluationHistory() {
const evaluations = [
{ name: "Marco Saraiva", rating: "★★★☆☆", status: "yellow" },
{ name: "Alexandre Figueiredo", rating: "★★★☆☆", status: "red" },
{ name: "Mario Hernani", rating: "★★★★★", status: "green" },
{ name: "Duarte Paulo", rating: "★★☆☆☆", status: "yellow" },
{ name: "Rodrigo Marques", rating: "★☆☆☆☆", status: "red" },
];

return (
<div className="evaluation-history">
    <h3>Histórico de Avaliações</h3>
    {evaluations.map((evaluation, index) => (
    <div key={index} className="evaluation-item">
        <span className="name">{evaluation.name}</span>
        <span className="rating">{evaluation.rating}</span>
        <span className={`status ${evaluation.status}`}></span>
    </div>
    ))}
</div>
);
}

// UpcomingMatches Component
function UpcomingMatches() {
const matches = [
{ date: "17/01/2024 12:00 AM", teams: "A.F. Viseu vs FC Vaguense", location: "Estádio Municipal da Fonte" },
{ date: "25/01/2024 12:00 AM", teams: "A.F. Viseu vs SL Nelas", location: "Estádio Municipal de Nelas" },
];

return (
<div className="upcoming-matches">
    <h3>Próximas Partidas</h3>
    {matches.map((match, index) => (
    <div key={index} className="match-item">
        <p>{match.date}</p>
        <p>{match.teams}</p>
        <p>{match.location}</p>
    </div>
    ))}
    <button className="assign-event-button">Atribuir Evento</button>
</div>
);
}

// HighlightedPlayers Component
function HighlightedPlayers() {
const players = [
{ name: "Marco Saraiva", age: 24, number: 5, rating: "★★★★★" },
{ name: "Pedro Costa", age: 22, number: 10, rating: "★★★★☆" },
{ name: "João Pereira", age: 23, number: 8, rating: "★★★☆☆" },
];

return (
<div className="highlighted-players">
    <h3>Jogadores Destacados</h3>
    {players.map((player, index) => (
    <div key={index} className="player-card">
        <div className="player-info">
            <span className="name">NOME: {player.name}</span>
            <span className="age">IDADE: {player.age}</span>
            <span className="number">NÚMERO: {player.number}</span>
            <span className="rating">{player.rating}</span>
        </div>
    </div>
    ))}
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
        <div className="left-container">
            <SearchScouter />
            <ScouterList />
        </div>
        <div className="right-container">
            <ScouterDetails />
            <EvaluationHistory />
            <UpcomingMatches />
            <HighlightedPlayers />
        </div>
    </div>
</div>
);
}

export default App;