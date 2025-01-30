import React, { useState } from "react";
import "./../CSS/clubespage.css";
import ClubsCards from "./../components/ClubsCards";
import ClubsList from "./../components/ClubsList";
import TeamsList from "./../components/TeamsList";

const teams = [
  {
    name: "Académico de Viseu Futebol Clube", abbreviation: "VIS", teams: 7, squads: [
      { name: "AC Viseu Sub-23", players: 17 },
      { name: "AC Viseu Sub-19", players: 15 },
      { name: "AC Viseu Sub-16", players: 13 }
    ]
  },
  {
    name: "Clube Desportivo de Tondela", abbreviation: "TON", teams: 4, squads: [
      { name: "Tondela Sub-23", players: 18 },
      { name: "Tondela Sub-19", players: 16 }
    ]
  },
  {
    name: "Portimonense Sporting Clube", abbreviation: "PTM", teams: 3, squads: [
      { name: "PSC Sub-21", players: 14 },
      { name: "PSC Sub-18", players: 12 }
    ]
  },
  { name: "Clube Desportivo Feirense", abbreviation: "FEI", teams: 6, squads: [] },
  { name: "Grupo Desportivo de Chaves", abbreviation: "CHV", teams: 4, squads: [] },
  { name: "Clube Sport Marítimo", abbreviation: "MAR", teams: 3, squads: [] },
  { name: "Sport Lisboa e Benfica B", abbreviation: "BEN B", teams: 4, squads: [] },
  { name: "Futebol Clube de Penafiel", abbreviation: "PNF", teams: 3, squads: [] }
];

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
    <div>
      <ClubsCards teams={teams} favorites={favorites} setSelectedClub={setSelectedClub} toggleFavorite={toggleFavorite} />
      <div className="main-content">
        <ClubsList teams={teams} setSelectedClub={setSelectedClub} />
        <TeamsList selectedClub={selectedClub} favorites={favorites} toggleFavorite={toggleFavorite} />
      </div>
    </div>
  );
};

export default ClubsPage;
