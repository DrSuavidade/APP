import React, { useEffect, useState } from 'react';
import './../CSS/TeamPage.css';

const players = [
    { name: "João Silva", age: 10, year: 2013, team: "AC Viseu Sub-10" },
    { name: "Pedro Lima", age: 11, year: 2012, team: "AC Viseu Sub-11" },
    { name: "David Moreira", age: 15, year: 2009, team: "AC Viseu Sub-19" },
    { name: "Luís Gonçalves", age: 22, year: 2001, team: "AC Viseu Sub-23" },
    { name: "André Costa", age: 27, year: 1996, team: "AC Viseu Profissional" },
    { name: "Carlos Santos", age: 10, year: 2013, team: "AC Viseu Sub-10", stars: 4 },
    { name: "António Marques", age: 11, year: 2012, team: "AC Viseu Sub-11", stars: 5 },
    { name: "Tiago Faria", age: 16, year: 2008, team: "AC Viseu Sub-19", stars: 3 },
    { name: "Mariana Carvalho", age: 21, year: 2002, team: "AC Viseu Sub-23", stars: 5 },
    { name: "Paulo Ribeiro", age: 25, year: 1998, team: "AC Viseu Profissional", stars: 4 },
];

const TeamPage = () => {
    const [selectedYear, setSelectedYear] = useState('');
    const [availablePlayers, setAvailablePlayers] = useState(players);
    const [registeredPlayers, setRegisteredPlayers] = useState([]);

    const handleRegisterPlayer = (player) => {
        setAvailablePlayers(availablePlayers.filter(p => p.name !== player.name));
        setRegisteredPlayers([...registeredPlayers, player]);
    };

    return (
        <div className="team-page">
            <div className="main-container">
            <div className="left-panel">
                    <form className="search-bar">
                        <input type="text" className="search-input" placeholder="Escreve o nome do clube ou da equipa" />
                        <button type="submit" className="search-button">Procurar</button>
                    </form>
                    
                    <div className="filter-container">
                        <label htmlFor="year-select">Ano:</label>
                        <select id="year-select" className="year-dropdown" onChange={(e) => setSelectedYear(e.target.value)}>
                            <option value="">Selecione um ano</option>
                            {[...new Set(players.map(player => player.year))].sort((a, b) => a - b).map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>

                    <div className="players-container">
                        {availablePlayers.filter(player => player.year.toString() === selectedYear).map((player, index) => (
                            <div key={index} className="player-card">
                                <div className="player-avatar"></div>
                                <div className="player-info">
                                    <p className="player-name">{player.name}</p>
                                    <p className="player-age">{player.age} anos</p>
                                    <p className="player-year">{player.year}</p>
                                    <p className="player-team">{player.team}</p>
                                    <button className="register-button" onClick={() => handleRegisterPlayer(player)}>Adicionar</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="back-button" onClick={() => window.location.href = '/'}>Voltar</button>
                </div>

                <div className="right-panel">
                    <h2 className="club-name">Académico de Viseu Futebol Clube</h2>
                    <p className="club-abbreviation">AC VISEU</p>
                    <p className="club-rating">AVALIAÇÃO - BOM</p>
                    <h3 className="team-name">{selectedYear ? `Equipa ${selectedYear}` : "Selecione um ano"}</h3>
                    <p className="player-count">Jogadores: {registeredPlayers.length}</p>
                    <div className="player-list">
                        {registeredPlayers.map((player, index) => (
                            <div key={index} className="player-entry">
                                <span className="player-name">{player.name}</span>
                                <span className="player-stars">{'★'.repeat(player.stars)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamPage;
