import React, { useState } from "react";
import "./../CSS/clubespage.css";
import ClubsCards from "./../components/ClubsCards";
import ClubsList from "./../components/ClubsList";
import TeamsList from "./../components/TeamsList";

const ClubsPage = () => {
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
      <ClubsCards favorites={favorites} setSelectedClub={setSelectedClub} toggleFavorite={toggleFavorite} />
      <div className="main-content">
        <ClubsList setSelectedClub={setSelectedClub} />
        <TeamsList selectedClub={selectedClub} favorites={favorites} toggleFavorite={toggleFavorite} />
      </div>
    </div>
  );
};

export default ClubsPage;
