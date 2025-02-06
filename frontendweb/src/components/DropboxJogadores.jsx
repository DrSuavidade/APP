import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom"; // Importando o hook para acessar o ID_EQUIPA da navegação

const DropboxJogadores = ({ onRegisterPlayer }) => {
    const location = useLocation();
    const { idEquipa } = location.state || {};  // Acessa o ID da equipa da navegação anterior
    const [selectedYear, setSelectedYear] = useState('');
    const [players, setPlayers] = useState([]);
    const [selectedPlayers, setSelectedPlayers] = useState([]); // Novo estado para jogadores selecionados
    const [availableYears, setAvailableYears] = useState([]);

    // Gerar anos de 1970 a 2025
    useEffect(() => {
        const years = [];
        for (let year = 1970; year <= 2025; year++) {
            years.push(year);
        }
        setAvailableYears(years);
    }, []);

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

    // Selecionar ou desselecionar um jogador
    const handlePlayerClick = (player) => {
        setSelectedPlayers((prev) =>
            prev.includes(player) ? prev.filter((p) => p !== player) : [...prev, player]
        );
    };

    // Confirmar jogadores e enviá-los para a equipa
    const handleConfirm = async () => {
        if (!idEquipa) {
            console.error("❌ ID da equipa não encontrado!");
            return;
        }

        console.log("ID da equipa selecionada:", idEquipa); // Verificar se o ID da equipa está correto
        console.log("Jogadores selecionados:", selectedPlayers); // Verificar se os jogadores foram selecionados corretamente

        try {
            for (const player of selectedPlayers) {
                const response = await axios.post("http://localhost:3000/api/jogador/adicionar", {
                    ID_JOGADORES: player.ID_JOGADORES,
                    ID_EQUIPA: idEquipa, // Usando o ID da equipa dinamicamente
                });
                console.log("Resposta do backend:", response.data); // Verificar a resposta da API
            }
    
            // 🔹 Remove os jogadores confirmados da dropbox sem afetar o restante do código
            setPlayers((prevPlayers) =>
                prevPlayers.filter((p) => !selectedPlayers.some((sp) => sp.ID_JOGADORES === p.ID_JOGADORES))
            );
    
            // 🔹 Atualiza a ListaJogadoresEqp com os jogadores confirmados
            onRegisterPlayer((prevLista) => [...prevLista, ...selectedPlayers]);
    
            // 🔹 Limpa a seleção para evitar duplicação
            setSelectedPlayers([]);
    
        } catch (error) {
            console.error("❌ Erro ao adicionar jogadores à equipa:", error);
        }
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
                    {availableYears.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>

            <div className="players-container">
                <div className="players-wrapper">
                    {selectedYear ? (
                        players.length > 0 ? (
                            players.map(player => (
                                <div 
                                    key={player.ID_JOGADORES} 
                                    className={`player-card ${selectedPlayers.includes(player) ? "selected" : ""}`}
                                    onClick={() => handlePlayerClick(player)}
                                >
                                    <div className="player-avatar">
                                        <img 
                                            src={player.IMG_URL || "https://via.placeholder.com/60"} 
                                            alt="Jogador" 
                                            className="player-image"
                                        />
                                    </div>
                                    <div className="player-info">
                                        <p className="player-name">{player.NOME}</p>
                                        <p className="player-age">Nascimento: {new Date(player.DATA_NASC).toLocaleDateString()}</p>
                                        <p className="player-note"><strong>Nota:</strong> {player.NOTA_ADM || 'N/A'}</p>
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

            {selectedPlayers.length > 0 && (
                <button className="confirm-button" onClick={handleConfirm}>
                    Confirmar Seleção ({selectedPlayers.length})
                </button>
            )}
        </div>
    );
};

export default DropboxJogadores;
