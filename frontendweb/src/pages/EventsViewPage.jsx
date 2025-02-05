import React from "react";
import ProximasPartidas from "../components/Proximaspartidas.jsx";
import ListaEventos from "../components/ListaEventos.jsx";
import "../CSS/ListRelatorios.css";

const EventsViewPage = () => {
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