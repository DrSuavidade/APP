import React from "react";
import "../CSS/eventsviewpage.css";
import EventsList from "../components/DadosEvents";
import UpcomingMatches from "../components/Proximaspartidas.jsx";

const SearchBar = () => {
  return (
    <section className="search-bar">
      <input type="text" placeholder="Escreva o nome do clube ou da equipe" />
      <button className="search-btn">Procurar</button>
      <button className="add-btn">Adicionar</button>
    </section>
  );
};

const EventsCreatePage = () => {
  return (
    <div className="main-container">
      <SearchBar />
      <div className="content">
        <EventsList />
        <UpcomingMatches />
      </div>
    </div>
  );
};

export default EventsCreatePage;
