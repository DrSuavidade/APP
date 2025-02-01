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
    <div className="page-container">
      {/* Passando ID_USER corretamente para ClubsCards */}
      <ClubsCards ID_USER={parseInt(ID_USER, 10)} setSelectedClub={setSelectedClub} toggleFavorite={toggleFavorite} />
      <div className="main-content">
        <ClubsList setSelectedClub={setSelectedClub} />
        <TeamsList selectedClub={selectedClub} favorites={favorites} toggleFavorite={toggleFavorite} />
      </div>
    </div>
  );
};

export default ClubsPage;
