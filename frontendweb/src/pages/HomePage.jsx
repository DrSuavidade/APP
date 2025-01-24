import React from 'react';
//import Navbar from '../components/Navbar';
//import Footer from '../components/Footer';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import '../CSS/ware.css';
import '../CSS/site.main.css';

export default function Home() {
    const searchScouter = () => {
        const input = document.getElementById('scouter-input').value;
        alert(`Procurando por: ${input}`);
    };

    const addScouter = () => {
        alert('Adicionar botão clicado!');
    };

    const searchJogador = () => {
        const input = document.getElementById('jogador-input').value;
        alert(`Procurando por: ${input}`);
    };

    const addJogador = () => {
        alert('Adicionar jogador clicado!');
    };

    return (
        <div>
            {/* Navbar */}
            <header className="navbar">
                <div className="logo">
                    <img src="images/image.png" alt="Logo" />
                </div>
                <div className="menu">
                    <span>Plantel</span>
                    <span>Jogadores</span>
                    <span>Clubes</span>
                    <span>Scouters</span>
                    <span>Eventos</span>
                    <span>Relatórios</span>
                </div>
            </header>

            {/* Header */}
            <div className="header">RELATÓRIOS PENDENTES</div>

            {/* Report Cards */}
            <div className="report-section">
                {[
                    { name: 'Marco Saraiva', age: 12, year: 2012, club: 'AC Viseu Sub - 12', badge: '3/4', badgeClass: 'badge3' },
                    { name: 'Pedro Ferreira', age: 15, year: 2009, club: 'AC Viseu Sub - 12', badge: '2/4', badgeClass: 'badge2' },
                    { name: 'Ricardo Bosques', age: 11, year: 2013, club: 'AC Viseu Sub - 12', badge: '3/4', badgeClass: 'badge3' },
                    { name: 'Jorge da Silva', age: 17, year: 2007, club: 'AC Viseu Sub - 12', badge: '4/4', badgeClass: 'badge4' },
                ].map((report, index) => (
                    <div
                        key={index}
                        className="report-card"
                        onClick={() => alert(`Relatório clicado: ${report.name}`)}
                    >
                        <div className="icon">👤</div>
                        <h3>{report.name}</h3>
                        <p>{`${report.age} anos | ${report.year}`}</p>
                        <p>{report.club}</p>
                        <div className={report.badgeClass}>{report.badge}</div>
                        <div className="status"></div>
                    </div>
                ))}
            </div>

            {/* Functional Containers */}
            <div className="functional-container">
                {/* Scouters */}
                <div className="functional-box">
                    <h3>SCOUTERS</h3>
                    <div className="container">
                        <div className="search-bar">
                            <input type="text" placeholder="Escreva o nome do scouter" id="scouter-input" />
                            <button onClick={searchScouter}>Search</button>
                        </div>
                        <div className="actions">
                            <label>
                                <input type="checkbox" id="select-all" />
                                Selecionar Todos
                            </label>
                            <button onClick={addScouter}>Adicionar</button>
                        </div>
                        <div className="scouter-list-container">
                            <ul className="scouter-list">
                                {[
                                    { name: 'Armando Silva', reviews: 5 },
                                    { name: 'Ernesto Tivolli', reviews: 0 },
                                    { name: 'Márcia Pereira', reviews: 3 },
                                    { name: 'João Mendes', reviews: 2 },
                                    { name: 'Carlos Silva', reviews: 4 },
                                ].map((scouter, index) => (
                                    <li key={index}>
                                        <span>{scouter.name}</span>
                                        <span>{`${scouter.reviews} avaliações`}</span>
                                        <button>Selecionar</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Jogos */}
                <div className="functional-box">
                    <h3>JOGOS</h3>
                    <div
                        className="green-button"
                        onClick={() => alert('Jogo 1 clicado')}
                    >
                        A.F. VISEU VS SL NELAS<br />Estádio do Fontelo
                    </div>
                    <div
                        className="green-button"
                        onClick={() => alert('Jogo 2 clicado')}
                    >
                        A.F. VISEU VS SL NELAS<br />Estádio do Fontelo
                    </div>
                </div>

                {/* Jogadores */}
                <div className="functional-box">
                    <h3>JOGADORES</h3>
                    <div className="search-bar">
                        <input type="text" placeholder="Escreva o nome do jogador" id="jogador-input" />
                        <button onClick={searchJogador}>Search</button>
                    </div>
                    <div className="actions">
                        <label>
                            <input type="checkbox" id="select-all" />
                            Selecionar Todos
                        </label>
                        <button onClick={addJogador}>Adicionar</button>
                    </div>
                    <div className="scouter-list-container">
                        <ul className="scouter-list">
                            {[
                                { name: 'Marco Saraiva', rating: '⭐⭐⭐' },
                                { name: 'Alexandre Figueiró', rating: '⭐⭐⭐⭐' },
                                { name: 'Afonso Moreira', rating: '⭐⭐' },
                                { name: 'Rui Carlos', rating: '⭐⭐⭐⭐⭐' },
                            ].map((player, index) => (
                                <li key={index}>
                                    <span>{player.name}</span>
                                    <span>{player.rating}</span>
                                    <button onClick={() => alert(`Selecionar ${player.name}`)}>
                                        Selecionar
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
