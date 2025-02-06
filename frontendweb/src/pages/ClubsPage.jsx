import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./../CSS/clubespage.css";
import ClubsCards from "./../components/ClubsCards";
import ClubsList from "./../components/ClubsList";
import TeamsList from "./../components/TeamsList";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

const ClubsPage = () => {
  const { ID_USER } = useParams();
  const [userId, setUserId] = useState(ID_USER);
  const [selectedClub, setSelectedClub] = useState(null);
  const [favorites, setFavorites] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
      if (!token) {
        navigate('/login'); // Redireciona para a página de login se não houver token
      }
    if (!ID_USER) {
      const cookieUserId = Cookies.get("ID_USER");
      setUserId(cookieUserId);
    }
  }, [navigate, ID_USER]);

  const toggleFavorite = (clubName) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [clubName]: !prevFavorites[clubName],
    }));
  };

  return (
    <div className="page-container pushed-down">
      <div className="clubs-card-container shift-left">
        <ClubsCards ID_USER={parseInt(userId, 10)} setSelectedClub={setSelectedClub} toggleFavorite={toggleFavorite} />
      </div>
      <div className="main-content">
        <div className="clubs-container compact-table stretch-left no-gap">
          <ClubsList setSelectedClub={setSelectedClub} />
          <div className="teams-container move-right">
            <TeamsList selectedClub={selectedClub} favorites={favorites} toggleFavorite={toggleFavorite} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubsPage;
