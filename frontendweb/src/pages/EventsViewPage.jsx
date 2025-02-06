import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import ProximasPartidas from "../components/Proximaspartidas.jsx";
import ListaEventos from "../components/ListaEventos.jsx";
import "../CSS/ListRelatorios.css";

  const EventsViewPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se o token existe nos cookies
    const token = Cookies.get('token');
    if (!token) {
      navigate('/login'); // Redireciona para a página de login se não houver token
    }
  }, [navigate]);

  return (
    <div className="events-view-container">
      {/* Container principal para os componentes */}
      <div className="events-content">
        {/* Container para a ListaEventos */}
        <div className="lista-eventos-wrapper">
          <ListaEventos />
        </div>

        {/* Container para as ProximasPartidas */}
        <div className="proximas-partidas-wrapper">
          <ProximasPartidas />
        </div>
      </div>
    </div>
  );
};

export default EventsViewPage;