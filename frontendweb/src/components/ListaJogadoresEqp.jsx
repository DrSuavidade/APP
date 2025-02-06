import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ListaJogadoresEqp = ({addedPlayers, onPlayerRemoved }) => {
    const location = useLocation();
    const { idEquipa } = location.state || {};  // Acessa o ID da equipa da navegação anterior
    const idClube = location.state?.idClube;
    const [clube, setClube] = useState({ nome: "Carregando...", abreviatura: "" });
    const [equipas, setEquipas] = useState([]);
    const [selectedEquipa,] = useState(idEquipa || ""); // Define a equipa automaticamente
    const [registeredPlayers, setRegisteredPlayers] = useState([]);
    const [selectedPlayers, setSelectedPlayers] = useState([]);

    // 🔹 Buscar informações do clube
    useEffect(() => {
        if (!idClube) return;

        const fetchClubInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/clube/${idClube}`);
                setClube(response.data);
            } catch (error) {
                console.error("❌ Erro ao buscar informações do clube:", error);
                setClube({ nome: "Clube não encontrado", abreviatura: "" });
            }
        };

        fetchClubInfo();
    }, [idClube]);

    // 🔹 Buscar equipas do clube
    useEffect(() => {
        if (!idClube) return;

        const fetchTeams = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/equipas/${idClube}`);
                setEquipas(response.data);
                // Se a equipa já foi recebida do estado, busca seus jogadores
                if (idEquipa) {
                    fetchPlayers(idEquipa);
                }
            } catch (error) {
                console.error("❌ Erro ao buscar equipas:", error);
                setEquipas([]);
            }
        };

        fetchTeams();
    }, [idClube, idEquipa]);

    // 🔹 Buscar jogadores da equipa selecionada
    const fetchPlayers = async (idEquipa) => {
        if (!idEquipa) return;

        try {
            const response = await axios.get(`http://localhost:3000/api/jogador/equipa/${idEquipa}`);
            setRegisteredPlayers(response.data || []);
        } catch (error) {
            console.error("❌ Erro ao buscar jogadores:", error);
        }
    };

    // 🔹 Adicionar jogadores manualmente à equipa
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

    // 🔹 Selecionar ou desselecionar jogadores
    const handlePlayerClick = (player) => {
        setSelectedPlayers((prev) =>
            prev.includes(player)
                ? prev.filter((p) => p.ID_JOGADORES !== player.ID_JOGADORES)
                : [...prev, player]
        );
    };

    // 🔹 Remover jogadores selecionados
    const handleRemovePlayers = async () => {
        try {
            const playersIds = selectedPlayers.map((player) => player.ID_JOGADORES);
    
            await axios.delete(`http://localhost:3000/api/relationship11/${playersIds.join(",")}`);
    
            setRegisteredPlayers((prevPlayers) =>
                prevPlayers.filter((p) => !selectedPlayers.some(sel => sel.ID_JOGADORES === p.ID_JOGADORES))
            );

            selectedPlayers.forEach(onPlayerRemoved);
            setSelectedPlayers([]);
    
        } catch (error) {
            console.error("❌ Erro ao remover jogadores da equipa:", error);
        }
    };

    return (
        <div className="right-panel">
            <h2 className="club-name">{clube.NOME || "Nome Indisponível"}</h2>
            <p className="club-abbreviation">{clube.ABREVIATURA || ""}</p>

            {/* 🔹 Exibição da equipa única */}
            <p className="team-name">{equipas.find(equipa => equipa.ID_EQUIPA === selectedEquipa)?.NOME || "Carregando equipa..."}</p>

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
                            <span className="player-stars">
                                {`★`.repeat(player.NOTA_ADM || 0) + `☆`.repeat(5 - (player.NOTA_ADM || 0))}
                            </span>
                        </div>
                    ))
                ) : (
                    <p className="no-players">Nenhum jogador encontrado para esta equipa.</p>
                )}
            </div>

            {selectedPlayers.length > 0 && (
                <button className="remove-button" onClick={handleRemovePlayers}>
                    Remover Jogadores ({selectedPlayers.length})
                </button>
            )}
        </div>
    );
};

export default ListaJogadoresEqp;
