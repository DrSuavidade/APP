import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { FaCog } from 'react-icons/fa'; // Importe o ícone de roldana
import Swal from 'sweetalert2'; // Para exibir alertas
import Cookies from "js-cookie"; // Importar a biblioteca js-cookie

const ListaJogadoresEqp = ({ addedPlayers, onPlayerRemoved }) => {
    const location = useLocation();
    const { idEquipa } = location.state || {};  // Acessa o ID da equipa da navegação anterior
    const idClube = location.state?.idClube;
    const [clube, setClube] = useState({ nome: "Carregando...", abreviatura: "" });
    const [equipas, setEquipas] = useState([]);
    const [selectedEquipa,] = useState(idEquipa || ""); // Define a equipa automaticamente
    const [registeredPlayers, setRegisteredPlayers] = useState([]);
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [userType, setUserType] = useState(null); // Adicionado estado para armazenar ID_TIPO

    // Lista de escalões disponíveis
    const escaloes = ["Sub-10", "Sub-11", "Sub-13", "Sub-15", "Sub-17", "Sub-19", "Profissional"];

    // Buscar informações do clube
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

        const ID_TIPO = Cookies.get("ID_TIPO");
        setUserType(ID_TIPO);
    }, [idClube]);

    // Buscar equipas do clube
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

    // Buscar jogadores da equipa selecionada
    const fetchPlayers = async (idEquipa) => {
        if (!idEquipa) return;

        try {
            const response = await axios.get(`http://localhost:3000/api/jogador/equipa/${idEquipa}`);
            setRegisteredPlayers(response.data || []);
        } catch (error) {
            console.error("❌ Erro ao buscar jogadores:", error);
        }
    };

    // Adicionar jogadores manualmente à equipa
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

    // Selecionar ou desselecionar jogadores
    const handlePlayerClick = (player) => {
        setSelectedPlayers((prev) =>
            prev.includes(player)
                ? prev.filter((p) => p.ID_JOGADORES !== player.ID_JOGADORES)
                : [...prev, player]
        );
    };

    // Remover jogadores selecionados
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

    // Função para editar a equipa
    const handleEditEquipa = () => {
        const equipaAtual = equipas.find(equipa => equipa.ID_EQUIPA === selectedEquipa);

        Swal.fire({
            title: 'Editar Equipa',
            html:
                `<input id="swal-input1" class="swal2-input" placeholder="Novo Nome" value="${equipaAtual?.NOME || ''}">` +
                `<select id="swal-input2" class="swal2-input">
                    ${escaloes.map(escalao => `<option value="${escalao}" ${escalao === equipaAtual?.ESCALAO ? 'selected' : ''}>${escalao}</option>`).join('')}
                </select>`,
            focusConfirm: false,
            preConfirm: () => {
                return {
                    nome: document.getElementById('swal-input1').value,
                    escalao: document.getElementById('swal-input2').value
                };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { nome, escalao } = result.value;
                axios.put(`http://localhost:3000/api/equipa/edit/${selectedEquipa}`, { NOME: nome, ESCALAO: escalao })
                    .then(response => {
                        Swal.fire('Sucesso!', 'Equipa atualizada com sucesso.', 'success').then(() => {
                            // Recarrega a página para atualizar as informações
                            window.location.reload();
                        });
                    })
                    .catch(error => {
                        console.error('Erro ao atualizar equipa:', error);
                        Swal.fire('Erro!', 'Não foi possível atualizar a equipa.', 'error');
                    });
            }
        });
    };

    return (
        <div className="right-panel">
            <h2 className="club-name">{clube.NOME || "Nome Indisponível"}</h2>
            <p className="club-abbreviation">{clube.ABREVIATURA || ""}</p>

            {/* Exibição da equipa única com ícone de edição */}
            <div className="team-info">
                <div>
                    <p className="team-name">
                        {equipas.find(equipa => equipa.ID_EQUIPA === selectedEquipa)?.NOME || "Carregando equipa..."}
                    </p>
                    <p className="team-escalao">
                        {equipas.find(equipa => equipa.ID_EQUIPA === selectedEquipa)?.ESCALAO || "Escalão não definido"}
                    </p>
                </div>
                {userType !== "1" && (
                    <FaCog className="icon cog" onClick={handleEditEquipa} />
                )}
            </div>

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

            {selectedPlayers.length > 0 && userType !== "1" && (
                <button className="remove-button" onClick={handleRemovePlayers}>
                    Remover Jogadores ({selectedPlayers.length})
                </button>
            )}
        </div>
    );
};

export default ListaJogadoresEqp;
