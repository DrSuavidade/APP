import React from "react";
import "../CSS/eventsviewpage.css";

const DadosEvents = ({ scouter, jogo, escalado, data, hora, local }) => {
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

const EventsList = () => {
  const eventos = [
    { scouter: "Marco Santos", jogo: "A.F. VISEU vs SL NELAS", escalado: "Sub-16", data: "25/10/2024", hora: "12:00 AM", local: "Estádio do Fontelo" },
    { scouter: "Marco Santos", jogo: "A.F. VISEU vs SL NELAS", escalado: "Sub-23", data: "25/10/2024", hora: "12:00 AM", local: "Estádio do Fontelo" },
    { scouter: "Marco Santos", jogo: "A.F. VISEU vs SL NELAS", escalado: "Sub-19", data: "25/10/2024", hora: "12:00 AM", local: "Estádio do Fontelo" },
  ];

  return (
    <section className="events-container">
      <div className="events-list">
        {eventos.map((evento, index) => (
          <DadosEvents key={index} {...evento} />
        ))}
      </div>
    </section>
  );
};

export default EventsList;