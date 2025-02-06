import React, { useState } from "react";
import { useParams } from "react-router-dom"; // Importando useParams para capturar o ID_USER da URL
import "./../CSS/clubespage.css";
import ClubsCards from "./../components/ClubsCards";
import ClubsList from "./../components/ClubsList";
import TeamsList from "./../components/TeamsList";

const ClubsPage = () => {
  const { ID_USER } = useParams(); // Captura o ID_USER da URL
  const [selectedClub, setSelectedClub] = useState(null);
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (clubName) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [clubName]: !prevFavorites[clubName],
    }));
  };

  return (
    <div className="page-container pushed-down"> {/* Ajuste para mover tudo para a esquerda */}
      {/* Passando ID_USER corretamente para ClubsCards */}
      <div className="clubs-card-container shift-left"> 
        <ClubsCards ID_USER={parseInt(ID_USER, 10)} setSelectedClub={setSelectedClub} toggleFavorite={toggleFavorite} />
      </div>
      <div className="main-content">
        <div className="clubs-container compact-table stretch-left no-gap">
          <ClubsList setSelectedClub={setSelectedClub} />
          <div className="teams-container move-right"> {/* Movendo a secção da direita para a esquerda */}
            <TeamsList selectedClub={selectedClub} favorites={favorites} toggleFavorite={toggleFavorite} />
          </div>
        </div>
      </div>
    </div>
  );
};


export default ClubsPage;
