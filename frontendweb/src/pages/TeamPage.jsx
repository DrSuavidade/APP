import React, { useState } from 'react';
import './../CSS/TeamPage.css';
import DropboxJogadores from './../components/DropboxJogadores';
import ListaJogadoresEqp from './../components/ListaJogadoresEqp';

const players = [
    { name: "João Silva", age: 10, year: 2013, team: "AC Viseu Sub-10", stars: 4 },
    { name: "Silva João ", age: 10, year: 2013, team: "AC Viseu Sub-10", stars: 2 },
    { name: "Pedro Lima", age: 11, year: 2012, team: "AC Viseu Sub-11", stars: 5 },
    { name: "David Moreira", age: 15, year: 2009, team: "AC Viseu Sub-19", stars: 3 },
    { name: "Luís Gonçalves", age: 22, year: 2001, team: "AC Viseu Sub-23", stars: 4 },
    { name: "André Costa", age: 27, year: 1996, team: "AC Viseu Profissional", stars: 5 },
];

const TeamPage = () => {
    const [availablePlayers, setAvailablePlayers] = useState(players);
    const [registeredPlayers, setRegisteredPlayers] = useState([]);
    const [idEquipa] = useState(1); // 🔹 Definindo ID da equipa como 1

    const handleRegisterPlayer = (player) => {
        setRegisteredPlayers([...registeredPlayers, player]);
        setAvailablePlayers(availablePlayers.filter(p => p.name !== player.name));
    };

    return (
        <div className="team-page">
            <div className="main-container">
                <DropboxJogadores 
                    players={availablePlayers} 
                    onRegisterPlayer={handleRegisterPlayer} 
                />
                <ListaJogadoresEqp 
                    selectedYear={""} 
                    addedPlayers={registeredPlayers} 
                    idEquipa={idEquipa} // 🔹 Passando ID da equipa para a ListaJogadoresEqp
                />
            </div>
        </div>
    );
};

export default TeamPage;
