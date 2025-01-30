import React, { useEffect, useState } from "react";
import axios from "axios"; 

const ListaJogadoresEqp = ({ selectedYear, addedPlayers }) => {
    const [registeredPlayers, setRegisteredPlayers] = useState([]);

    useEffect(() => {
        axios.get("/api/jogadores") 
            .then(response => setRegisteredPlayers(response.data || [])) 
            .catch(error => console.error("Erro ao buscar jogadores:", error));
    }, []);

    useEffect(() => {
        if (addedPlayers && addedPlayers.length > 0) {
            setRegisteredPlayers(prevPlayers => {
                const newPlayers = addedPlayers.filter(player => 
                    !prevPlayers.some(existingPlayer => existingPlayer.name === player.name)
                );
                return [...prevPlayers, ...newPlayers];
            });

            addedPlayers.forEach(player => {
                axios.post("/api/jogadores", player)
                    .catch(error => console.error("Erro ao adicionar jogador:", error));
            });
        }
    }, [addedPlayers]);

    return (
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
                        <span className="player-stars">{'★'.repeat(player.stars || 0)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListaJogadoresEqp;
