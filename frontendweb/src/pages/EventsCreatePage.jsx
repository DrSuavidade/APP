import React from "react";
import "../CSS/eventscreatepage.css";
import UpcomingMatches from "../components/Proximaspartidas.jsx"; // Importando a nova componente

const SearchBar = () => {
  return (
    <section className="search-bar">
      <input type="text" placeholder="Escreva o nome do clube ou da equipe" />
      <button className="search-btn">Procurar</button>
      <button className="add-btn">Adicionar</button>
    </section>
  );
};

const Event = ({ scouter, jogo, escalado, data, hora, local }) => {
  return (
    <div className="event">
      <p><strong>Scouter:</strong> {scouter}</p>
      <p><strong>Jogo:</strong> {jogo}</p>
      <p><strong>Escalado:</strong> {escalado}</p>
      <p><strong>Data:</strong> {data}</p>
      <p><strong>Hora:</strong> {hora}</p>
      <p><strong>Local:</strong> {local}</p>
    </div>
  );
};

const EventsRow = () => {
  return (
    <section className="events-container">
      <div className="events-list">
        {["Sub-16", "Sub-23", "Sub-19"].map((categoria, index) => (
          <Event
            key={index}
            scouter="Marco Santos"
            jogo="A.F. VISEU vs SL NELAS"
            escalado={categoria}
            data="25/10/2024"
            hora="12:00 AM"
            local="Estádio do Fontelo"
          />
        ))}
      </div>
    </section>
  );
};

const App = () => {
  return (
    <div className="main-container">
      <SearchBar />
      <div className="content">
        <EventsRow />
        <UpcomingMatches /> {/* Substituindo a antiga implementação pela nova componente */}
      </div>
    </div>
  );
};

export default App;
