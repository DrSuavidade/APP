import React from "react";
import "../CSS/playersreportpage.css";




// Header Component
const Header = () => {
    return (
      <header>
        <nav className="menu-bar">
          <div className="logo-container">
            <img src={process.env.PUBLIC_URL + ''} alt="Logotipo" className="logo" />
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

  // Player Card Component
  const PlayerCard = ({ name, age, team, score, color }) => {
    return (
      <div className="player-card">
        <div className="player-photo"></div>
        <div className="player-info">
          <h3>{name}</h3>
          <p>{age} anos</p>
          <p>{team}</p>
          <div className={`player-score ${color}`}>{score}</div>
        </div>
      </div>
    );
  };

  // Relatório Component
  const Relatorio = ({ name, age, evaluation, skills, comments }) => {
    return (
      <section className="relatorio">
        <h2>Relatório - 28/10/2024</h2>
        <div className="relatorio-details">
          <p><strong>Nome:</strong> {name}</p>
          <p><strong>Idade:</strong> {age}</p>
          <p><strong>Avaliação:</strong> {evaluation}</p>
        </div>
        <div className="skills">
          {skills.map((skill, index) => (
            <div key={index}>
              <h3>{skill.name}</h3>
              <div className="skill-bar">
                <div className="skill-progress" style={{ width: skill.level }}></div>
              </div>
            </div>
          ))}
        </div>
        <div className="comments">
          <h3>Comentário do Scouter</h3>
          <p>{comments.scouter}</p>
          <br />
          <h3>Comentário do Admin</h3>
          <textarea placeholder="Escreva o seu comentário"></textarea>
        </div>
        <div className="actions">
          <button className="reject-btn">Rejeitar</button>
          <button className="confirm-btn">Confirmar</button>
        </div>
      </section>
    );
  };

  // Main Application Component
  const App = () => {
    const players = [
      { name: "Marco Saraiva", age: 12, team: "AC Viseu Sub-12", score: "3/4", color: "green" },
      { name: "Alexandre Santos", age: 14, team: "AC Viseu Sub-14", score: "2/4", color: "yellow" },
      { name: "Duarte Paulo", age: 17, team: "AC Viseu Sub-19", score: "4/4", color: "green" },
      { name: "David Moreira", age: 16, team: "AC Viseu Sub-16", score: "1/4", color: "red" },
    ];

    const skills = [
      { name: "Técnica", level: "50%" },
      { name: "Velocidade", level: "75%" },
      { name: "Atitude Competitiva", level: "100%" },
    ];

    return (
      <div>
        <Header />
        <section className="player-cards-row">
          {players.map((player, index) => (
            <PlayerCard key={index} {...player} />
          ))}
        </section>
        <main className="main-container">
          <Relatorio
            name="Marco Saraiva"
            age={12}
            evaluation="Bom"
            skills={skills}
            comments={{ scouter: "Jogador muito esforçado em campo" }}
          />
        </main>
      </div>
    );
  };

  export default App;
