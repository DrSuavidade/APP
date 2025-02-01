import React, { useEffect, useState } from "react";
import axios from "axios";

const ListaJogadoresEqp = ({ selectedYear, addedPlayers, idEquipa, onPlayerRemoved }) => {
    const [registeredPlayers, setRegisteredPlayers] = useState([]);
    const [selectedPlayers, setSelectedPlayers] = useState([]); // Estado para jogadores selecionados

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
                    !prevPlayers.some(existingPlayer => existingPlayer.ID_JOGADORES === player.ID_JOGADORES)
                );
                return [...prevPlayers, ...newPlayers];
            });

            addedPlayers.forEach(player => {
                axios.post("http://localhost:3000/api/jogadores", player)
                    .catch(error => console.error("❌ Erro ao adicionar jogador:", error));
            });
        }
    }, [addedPlayers]);

    // 🔹 Selecionar ou desselecionar jogadores ao clicar
    const handlePlayerClick = (player) => {
        setSelectedPlayers((prev) =>
            prev.includes(player)
                ? prev.filter((p) => p.ID_JOGADORES !== player.ID_JOGADORES)
                : [...prev, player]
        );
    };

    // 🔹 Remover jogadores da equipa e enviar para a dropbox
    const handleRemovePlayers = async () => {
        try {
            const playersIds = selectedPlayers.map((player) => player.ID_JOGADORES);
    
            await axios.delete(`http://localhost:3000/api/relationship11/${playersIds.join(",")}`);
    
            // 🔹 Atualiza a lista removendo os jogadores excluídos
            setRegisteredPlayers((prevPlayers) =>
                prevPlayers.filter((p) => !selectedPlayers.some(sel => sel.ID_JOGADORES === p.ID_JOGADORES))
            );
    
            // 🔹 Adiciona os jogadores de volta na dropbox
            selectedPlayers.forEach(onPlayerRemoved);
    
            // 🔹 Limpa a seleção após remover os jogadores
            setSelectedPlayers([]);
    
        } catch (error) {
            console.error("❌ Erro ao remover jogadores da equipa:", error);
        }
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
                        <div
                            key={player.ID_JOGADORES}
                            className={`player-entry ${selectedPlayers.includes(player) ? "selected" : ""}`}
                            onClick={() => handlePlayerClick(player)}
                        >
                            <span className="player-name">{player.NOME}</span>
                            <span className="player-stars">{`★`.repeat(player.NOTA_ADM || 0) + `☆`.repeat(5 - (player.NOTA_ADM || 0))}</span>
                        </div>
                    ))
                ) : (
                    <p className="no-players">Nenhum jogador encontrado para esta equipa.</p>
                )}
            </div>

            {/* 🔹 Botão só aparece se houver jogadores selecionados */}
            {selectedPlayers.length > 0 && (
                <button className="remove-button" onClick={handleRemovePlayers}>
                    Remover Jogadores ({selectedPlayers.length})
                </button>
            )}
        </div>
    );
};

export default ListaJogadoresEqp;
