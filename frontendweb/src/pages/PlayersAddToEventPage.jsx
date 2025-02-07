import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../CSS/AddEventToScout.css";
import EventCard from "../components/EventCard";
import ListaJogadores from "../components/ListaJogadores";
import JogadoresDestacados from "../components/JogadoresDestacados";

const PlayersAddToEventPage = () => {
  const location = useLocation();
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedScouter, setSelectedScouter] = useState(null);
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  useEffect(() => {
    const updateSelectedData = () => {
      const storedEventId = localStorage.getItem("selectedEvent");
      setSelectedEventId(storedEventId);

      if (location.state?.selectedScouter) {
        setSelectedScouter(location.state.selectedScouter);
        localStorage.setItem("selectedScouter", JSON.stringify(location.state.selectedScouter));
      } else {
        const storedScouter = localStorage.getItem("selectedScouter");
        setSelectedScouter(storedScouter ? JSON.parse(storedScouter) : null);
      }
    };

    window.addEventListener("storage", updateSelectedData);
    updateSelectedData();

    return () => {
      window.removeEventListener("storage", updateSelectedData);
    };
  }, [location.state]);

  const handleSelectedPlayers = (players) => {
    setSelectedPlayers(players);
  };

  // PlayersAddToEventPage.jsx - Código corrigido
const handleCriarRelatorio = async () => {
  if (!selectedPlayers.length || !selectedEventId || !selectedScouter) {
    alert("Selecione jogadores, um evento e um scouter antes de criar relatórios.");
    return;
  }

  try {
    const resultados = [];
    const scouterId = Number(selectedScouter.ID_USER);
    const eventId = Number(selectedEventId);

    // Verificação básica de IDs
    if (isNaN(scouterId) || isNaN(eventId)) {
      throw new Error("IDs inválidos do evento/scouter");
    }

    // Processar jogadores sequencialmente
    for (const jogador of selectedPlayers) {
      try {
        const playerId = Number(jogador.ID_JOGADORES);
        
        // Validação local
        if (isNaN(playerId)) {
          resultados.push({ jogador: jogador.NOME, status: "Erro: ID inválido" });
          continue;
        }

        // Tentar criar relatório diretamente
        const relatorioData = {
          TECNICA: 0,
          VELOCIDADE: 0,
          COMPETITIVA: 0,
          INTELIGENCIA: 0,
          ALTURA: "Não informado",
          MORFOLOGIA: "Não informado",
          STATUS: "Ativo",
          ID_USER: scouterId,
          ID_JOGADORES: playerId,
          ID_EVENTOS: eventId,
          COMENTARIO: "",
          DATA: new Date(),
          NOTA: 0
        };

        // Tentativa de criação
        await axios.post("http://localhost:3000/api/relatorio/add", relatorioData);
        
        // Criar relação (opcionalmente com tratamento de erro)
        try {
          await axios.post("http://localhost:3000/api/r12/add", {
            ID_JOGADORES: playerId,
            ID_EVENTOS: eventId
          });
        } catch (r12Error) {
          console.warn("Erro na relação R12:", r12Error);
        }

        resultados.push({ jogador: jogador.NOME, status: "Sucesso" });

      } catch (error) {
        // Capturar erros específicos do backend
        const erroMessage = error.response?.data?.error.includes("Não pode ter vários relatórios") 
          ? "Relatório já existe" 
          : "Erro desconhecido";

        resultados.push({
          jogador: jogador.NOME,
          status: `Erro: ${erroMessage}`
        });
      }
    }

    // Feedback detalhado
    const mensagem = resultados.map(r => `• ${r.jogador}: ${r.status}`).join('\n');
    alert(`Resultado:\n${mensagem}`);

  } catch (error) {
    console.error("Erro global:", error);
    alert("Falha crítica no processo");
  }
};

  return (
    <div className="main-page">
      <div className="grid-container">
        {/* Seção Esquerda: Lista de Jogadores */}
        <div className="left-section">
          <ListaJogadores onSelectionChange={handleSelectedPlayers} />
          <button className="confirmar-btn" onClick={handleCriarRelatorio}>
            Criar Relatório
          </button>
        </div>

        {/* Seção Direita: Detalhes do Evento, Scouter e Jogadores Destacados */}
        <div className="right-section">
          {selectedEventId ? (
            <EventCard eventId={selectedEventId} />
          ) : (
            <p className="text-center text-gray-300">Selecione um evento.</p>
          )}

          {selectedScouter ? (
            <div className="scouter-info-card">
              <h3>Scouter</h3>
              <div className="scouter-avatar"></div>
              <p><strong>{selectedScouter.NOME}</strong></p>
              <p className="scouter-role">Scouter</p>
              <p>{selectedScouter.AVALIACOES} Avaliações</p>
            </div>
          ) : (
            <p className="text-center text-gray-300">Nenhum Scouter Selecionado</p>
          )}

          {/* Exibir Jogadores Destacados */}
          <JogadoresDestacados jogadores={selectedPlayers} />
        </div>
      </div>
    </div>
  );
};

export default PlayersAddToEventPage;