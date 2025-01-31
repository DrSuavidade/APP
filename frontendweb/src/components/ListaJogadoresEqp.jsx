import React, { useEffect, useState } from "react";
import axios from "axios";

const ListaJogadoresEqp = ({ selectedYear, addedPlayers, idEquipa }) => {
    const [registeredPlayers, setRegisteredPlayers] = useState([]);

    useEffect(() => {
        if (!idEquipa) return; // Evita chamadas sem ID

        const fetchPlayers = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/jogador/equipa/${idEquipa}`);
                console.log("📌 Jogadores recebidos:", response.data);
                setRegisteredPlayers(response.data || []);
            } catch (error) {
                console.error("❌ Erro ao buscar jogadores:", error);
            }
        };

        fetchPlayers();
    }, [idEquipa]);

    useEffect(() => {
        if (addedPlayers && addedPlayers.length > 0) {
            setRegisteredPlayers(prevPlayers => {
                const newPlayers = addedPlayers.filter(player =>
                    !prevPlayers.some(existingPlayer => existingPlayer.name === player.name)
                );
                return [...prevPlayers, ...newPlayers];
            });

            addedPlayers.forEach(player => {
                axios.post("http://localhost:3000/api/jogadores", player)
                    .catch(error => console.error("❌ Erro ao adicionar jogador:", error));
            });
        }
    }, [addedPlayers]);

    const getStars = (nota) => {
        return "★".repeat(nota || 0) + "☆".repeat(5 - (nota || 0));
    };

    return (
        <div className="right-panel">
            <h2 className="club-name">Académico de Viseu Futebol Clube</h2>
            <p className="club-abbreviation">AC VISEU</p>
            <p className="club-rating">AVALIAÇÃO - BOM</p>
            <h3 className="team-name">{selectedYear ? `Equipa ${selectedYear}` : "Selecione um ano"}</h3>
            <p className="player-count">Jogadores: {registeredPlayers.length}</p>

            <div className="player-list">
                {registeredPlayers.length > 0 ? (
                    registeredPlayers.map((player) => (
                        <div key={player.ID_JOGADORES} className="player-entry">
                            <span className="player-name">{player.NOME}</span>
                            <span className="player-stars">{getStars(player.NOTA_ADM)}</span>
                        </div>
                    ))
                ) : (
                    <p className="no-players">Nenhum jogador encontrado para esta equipa.</p>
                )}
            </div>

        </div>
    );
};

export default ListaJogadoresEqp;
