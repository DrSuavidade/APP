import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const DropboxJogadores = ({ onRegisterPlayer }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { idEquipa } = location.state || JSON.parse(localStorage.getItem("selectedTeam")) || {};  // Acessa o ID da equipa da navegação anterior ou do localStorage
    const [selectedYear, setSelectedYear] = useState('');
    const [players, setPlayers] = useState([]);
    const [selectedPlayers, setSelectedPlayers] = useState([]); // Jogadores selecionados
    const [availableYears, setAvailableYears] = useState([]); // Anos disponíveis
    const [userType, setUserType] = useState(null); // Adicionado estado para armazenar ID_TIPO

    useEffect(() => {
        const fetchAvailableYears = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/jogador/semEquipa/ano");
                console.log(`📌 Anos disponíveis:`, response.data);
                setAvailableYears(response.data);
            } catch (error) {
                console.error("❌ Erro ao buscar anos disponíveis:", error);
                setAvailableYears([]); // Garante que a lista é limpa se não houver anos disponíveis
            }
        };

        fetchAvailableYears();

        const ID_TIPO = Cookies.get("ID_TIPO");
        setUserType(ID_TIPO);
    }, []); // Apenas uma vez quando o componente é montado

   // Buscar jogadores ao selecionar um ano (apenas os que não têm equipa)
    useEffect(() => {
        if (!selectedYear) return;

        const fetchPlayersByYear = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/jogador/ano/${selectedYear}`);
                console.log(`📌 Jogadores disponíveis do ano ${selectedYear}:`, response.data);
                setPlayers(response.data);
            } catch (error) {
                console.error("❌ Erro ao buscar jogadores:", error);
                setPlayers([]); // Garante que a lista é limpa se não houver jogadores disponíveis
            }
        };

        fetchPlayersByYear();
    }, [selectedYear]);

    const handlePlayerClick = (player) => {
        setSelectedPlayers((prev) =>
            prev.includes(player) ? prev.filter((p) => p !== player) : [...prev, player]
        );
    };

    const handleConfirm = async () => {
        if (!idEquipa) {
            console.error("❌ ID da equipa não encontrado!");
            return;
        }

        console.log("ID da equipa selecionada:", idEquipa);
        console.log("Jogadores selecionados:", selectedPlayers);

        try {
            for (const player of selectedPlayers) {
                const response = await axios.post("http://localhost:3000/api/jogador/adicionar", {
                    ID_JOGADORES: player.ID_JOGADORES,
                    ID_EQUIPA: idEquipa, // Usando o ID da equipa dinamicamente
                });
                console.log("Resposta do backend:", response.data);
            }

            setPlayers((prevPlayers) =>
                prevPlayers.filter((p) => !selectedPlayers.some((sp) => sp.ID_JOGADORES === p.ID_JOGADORES))
            );

            onRegisterPlayer((prevLista) => [...prevLista, ...selectedPlayers]);

            setSelectedPlayers([]);

            // Salva o ID da equipa no localStorage
            localStorage.setItem("selectedTeam", JSON.stringify({ idEquipa }));
            
            // Recarrega a página
            window.location.reload();
        } catch (error) {
            console.error("❌ Erro ao adicionar jogadores à equipa:", error);
        }
    };

    return (
        <div className="left-panel">
            <div className="search-container">
                <input type="text" className="search-input" placeholder="Escreva o nome do jogador" />
                
            </div>

            <div className="filter-container">
                <label htmlFor="year-select">Ano:</label>
                <select
                    id="year-select"
                    className="year-dropdown"
                    onChange={(e) => setSelectedYear(e.target.value)}
                >
                    <option value="">Selecione um ano</option>
                    {availableYears.length > 0 ? (
                        availableYears.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))
                    ) : (
                        <option value="">Sem anos disponíveis</option>
                    )}
                </select>
            </div>

            <div className="players-container">
                <div className="players-wrapper">
                    {selectedYear ? (
                        players.length > 0 ? (
                            players.map((player) => (
                                <div
                                    key={player.ID_JOGADORES}
                                    className={`player-card ${
                                        selectedPlayers.includes(player) ? "selected" : ""
                                    }`}
                                    onClick={() => handlePlayerClick(player)}
                                >
                                    <div className="player-avatar">
                                    <div className="profile-icon">👤</div> {/* Moved to the left */}
                                    </div>
                                    <div className="player-info">
                                        <p className="pplayer-name">{player.NOME}</p>
                                        <p className="player-age">
                                             {new Date(player.DATA_NASC).toLocaleDateString()}
                                        </p>
                                        <p className="player-note">
                                            <strong>Nota:</strong> {player.NOTA_ADM || "N/A"}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Nenhum jogador disponível para {selectedYear}.</p>
                        )
                    ) : (
                        <p>Selecione um ano para ver os jogadores disponíveis.</p>
                    )}
                </div>
            </div>

            {selectedPlayers.length > 0 && userType !== "1" && (
                <button className="confirm-button" onClick={handleConfirm}>
                    Confirmar Seleção ({selectedPlayers.length})
                </button>
            )}
        </div>
    );
};

export default DropboxJogadores;
