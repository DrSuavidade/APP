import React, { useState, useEffect } from "react";

const ClubsCards = ({ ID_USER, setSelectedClub, toggleFavorite }) => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchFavoriteClubs = async () => {
      try {
        console.log(`Buscando clubes favoritos para ID_USER: ${ID_USER}`); // DEBUG
        const response = await fetch(`https://backendscout-cx6c.onrender.com/api/favorito/list/${ID_USER}`);
        if (!response.ok) throw new Error("Erro ao buscar clubes favoritos");

        const favoriteClubs = await response.json(); // Lista de clubes favoritos com nome e abreviatura
        console.log("Clubes recebidos:", favoriteClubs); // DEBUG

        if (Array.isArray(favoriteClubs) && favoriteClubs.length > 0) {
          setTeams(favoriteClubs); // Atualiza o estado com os favoritos apenas se houver dados
        } else {
          console.warn("Nenhum clube retornado pela API.");
          setTeams([]); // Limpa a lista se não houver clubes
        }
      } catch (error) {
        console.error("Erro ao buscar os clubes favoritos:", error);
        setTeams([]); // Limpa a lista em caso de erro
      }
    };

    fetchFavoriteClubs();
  }, [ID_USER]);

  const handleRemoveFavorite = async (ID_CLUBE) => {
    try {
      const response = await fetch(`https://backendscout-cx6c.onrender.com/api/favorito/delete/${ID_CLUBE}/${ID_USER}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao remover favorito');
      }

      // Atualiza a lista de favoritos após a remoção
      const updatedTeams = teams.filter(team => team.ID_CLUBE !== ID_CLUBE);
      setTeams(updatedTeams);

      console.log('Favorito removido com sucesso!');
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
    }
  };

  console.log("Estado atual dos clubes:", teams); // DEBUG

  return (
    <section className="clubes-cards-row">
      <div className="club-cards-container">
      {teams.length === 0 && <p className="no-clubs-message">Nenhum clube encontrado.</p>}
      {teams.map((team, index) => (
          <div key={index} className="club-card" onClick={() => setSelectedClub(team)}>
            <h4>{team.nome || "Nome não encontrado"}</h4> {/* Exibe nome corretamente */}
            <p>{team.abreviatura || "Sem abreviação"}</p> {/* Exibe a abreviação corretamente */}
            <button
              className={`favorite-icon active`} // Ajuste no botão de favorito
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveFavorite(team.ID_CLUBE);
              }}
            >
              ✅ {/* Ícone atualizado */}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClubsCards;