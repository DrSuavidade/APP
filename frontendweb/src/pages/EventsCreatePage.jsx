import React from "react";
import "../CSS/eventscreatepage.css";

const Header = () => {
  return (
    <header>
      <nav className="menu-bar">
        <div className="logo-container">
          <img src="images/v687_782.png" alt="Logotipo" className="logo" />
        </div>
        <ul className="menu">
          <li><a href="#">Plantel</a></li>
          <li><a href="#">Jogadores</a></li>
          <li><a href="#">Clubes</a></li>
          <li><a href="#">Scouters</a></li>
          <li><a href="#">Eventos</a></li>
          <li><a className="active" href="#">Relatórios</a></li>
        </ul>
      </nav>
    </header>
  );
};

const SearchBar = () => {
  return (
    <section className="search-bar">
      <input type="text" placeholder="Escreva o nome do clube ou da equipe" />
      <button>Procurar</button>
      <button>Adicionar</button>
    </section>
  );
};

const UpcomingMatches = () => {
  const matches = [
    {
      casa: "A.C. VISEU",
      fora: "SL NELAS",
      hora: "12:00",
      data: "25/10/2024",
    },
    {
      casa: "A.C. VISEU",
      fora: "SL NELAS",
      hora: "12:00",
      data: "25/10/2024",
    },
  ];

  return (
    <aside className="upcoming-matches">
      <h2>PRÓXIMAS PARTIDAS</h2>
      {matches.map((match, index) => (
        <div key={index} className="match">
          <p><strong>CASA:</strong> {match.casa}</p>
          <p><strong>FORA:</strong> {match.fora}</p>
          <p>
            <strong>Hora:</strong> {match.hora} | <strong>Data:</strong> {match.data}
          </p>
        </div>
      ))}
    </aside>
  );
};

const Event = ({ scouter, jogo, data, hora, local }) => {
  return (
    <div className="event">
      <p><strong>Scouter:</strong> {scouter}</p>
      <p><strong>Jogo:</strong> {jogo}</p>
      <p><strong>Data:</strong> {data}</p>
      <p><strong>Hora:</strong> {hora}</p>
      <p><strong>Local:</strong> {local}</p>
    </div>
  );
};

const EventsRow = () => {
  return (
    <section className="events-row">
      <Event
        scouter="Marco Santos"
        jogo="A.F. VISEU vs SL NELAS"
        data="25/10/2024"
        hora="12:00 AM"
        local="Estádio do Fontelo"
      />
    </section>
  );
};

const App = () => {
  return (
    <div>
      <Header />
      <main className="main-content">
        <div className="search-and-matches">
          <SearchBar />
          <UpcomingMatches />
        </div>
        <EventsRow />
      </main>
    </div>
  );
};

export default App;
