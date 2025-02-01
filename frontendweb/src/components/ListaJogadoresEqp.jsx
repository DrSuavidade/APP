import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ListaJogadoresEqp = ({ selectedYear, addedPlayers, idEquipa, onPlayerRemoved }) => {
    const location = useLocation();
    const idClube = location.state?.idClube;
    const [clube, setClube] = useState({ nome: "Carregando...", abreviatura: "" });
    const [equipas, setEquipas] = useState([]);
    const [selectedEquipa, setSelectedEquipa] = useState("");
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
            } catch (error) {
                console.error("❌ Erro ao buscar equipas:", error);
                setEquipas([]);
            }
        };

        fetchTeams();
    }, [idClube]);

    // 🔹 Buscar jogadores da equipa selecionada
    useEffect(() => {
        if (!selectedEquipa) return;

        const fetchPlayers = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/jogador/equipa/${selectedEquipa}`);
                setRegisteredPlayers(response.data || []);
            } catch (error) {
                console.error("❌ Erro ao buscar jogadores:", error);
            }
        };

        fetchPlayers();
    }, [selectedEquipa]);

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
            

            {/* 🔹 Dropdown de equipas */}
            <select 
                className="team-dropdown" 
                value={selectedEquipa}
                onChange={(e) => setSelectedEquipa(e.target.value)}
            >
                {equipas.length > 0 ? (
                    <>
                        <option value="" disabled>Selecione uma equipa</option>
                        {equipas.map(equipa => (
                            <option key={equipa.ID_EQUIPA} value={equipa.ID_EQUIPA}>
                                {equipa.NOME}
                            </option>
                        ))}
                    </>
                ) : (
                    <option value="" disabled>Não existe nenhuma equipa para este clube</option>
                )}
            </select>

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
