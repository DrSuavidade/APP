import React, { useState } from "react";

const DropboxJogadores = ({ players, onRegisterPlayer }) => {
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [allSelected, setAllSelected] = useState(false);

    const handleSelectAll = () => {
        if (allSelected) {
            setSelectedPlayers([]);
        } else {
            const filteredPlayers = players.filter(player => player.year.toString() === selectedYear);
            setSelectedPlayers(filteredPlayers);
        }
        setAllSelected(!allSelected);
    };

    const handlePlayerClick = (player) => {
        if (selectedPlayers.includes(player)) {
            setSelectedPlayers(selectedPlayers.filter(p => p !== player));
        } else {
            setSelectedPlayers([...selectedPlayers, player]);
        }
    };

    const handleConfirm = () => {
        selectedPlayers.forEach(player => onRegisterPlayer(player));
        setSelectedPlayers([]);
    };

    return (
        <div className="left-panel">
            <div className="search-container">
                <input type="text" className="search-input" placeholder="Escreva o nome do jogador" />
                <button className="search-button">Procurar</button>
            </div>

            <div className="filter-container">
                <label htmlFor="year-select">Ano:</label>
                <select 
                    id="year-select" 
                    className="year-dropdown" 
                    onChange={(e) => setSelectedYear(e.target.value)}
                >
                    <option value="">Selecione um ano</option>
                    {[...new Set(players.map(player => player.year))].sort((a, b) => a - b).map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>

                <button 
                    className={`select-all-button ${allSelected ? "deselected" : ""}`} 
                    onClick={handleSelectAll}
                >
                    {allSelected ? "Desselecionar Todos" : "Selecionar Todos"}
                </button>
            </div>

            <div className="players-container">
                {players.filter(player => player.year.toString() === selectedYear).map((player, index) => (
                    <div 
                        key={index} 
                        className={`player-card ${selectedPlayers.includes(player) ? "selected" : ""}`}
                        onClick={() => handlePlayerClick(player)}
                    >
                        <div className="player-avatar"></div>
                        <div className="player-info">
                            <p className="player-name">{player.name}</p>
                            <p className="player-age">{player.age} anos</p>
                            <p className="player-year">{player.year}</p>
                            <p className="player-team">{player.team}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button className="confirm-button" onClick={handleConfirm}>Confirmar</button>
        </div>
    );
};

export default DropboxJogadores;
