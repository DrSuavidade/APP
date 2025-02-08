import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './../CSS/TeamPage.css';
import DropboxJogadores from './../components/DropboxJogadores';
import ListaJogadoresEqp from './../components/ListaJogadoresEqp';
import Cookies from 'js-cookie';

const players = [];

const TeamPage = () => {
    const [availablePlayers, setAvailablePlayers] = useState(players);
    const [registeredPlayers, setRegisteredPlayers] = useState([]);
    const [idEquipa] = useState(1); // 🔹 Definindo ID da equipa como 1
    const navigate = useNavigate();

    useEffect(() => {
        // Verifica se o ID_TIPO existe nos cookies
        const ID_TIPO = Cookies.get("ID_TIPO");
        if (ID_TIPO === "3") {
            navigate('/erro401'); // Redireciona para a página de erro 401 se o ID_TIPO for 1
        }
    }, [navigate]);

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
