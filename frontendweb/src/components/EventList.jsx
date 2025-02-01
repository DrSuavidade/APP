import React from "react";
import "../CSS/EventList.css";

const EventoList2 = ({ events }) => {
  return (
    <div className="evento-list2">
      {events.map((event, index) => (
        <div key={index} className="evento-item">
          <div className="evento-teams">
            <p className="home-team">{event.homeTeam}</p>
            <p className="away-team">{event.awayTeam}</p>
          </div>
          <p className="scouter">{event.scouter}</p>
          <p className="date">{event.date}</p>
          <p className="time">{event.time}</p>
          <p className="location">
            <span className="material-icons"></span> {event.location}
          </p>
        </div>
      ))}
    </div>
  );
};

export default EventoList2;
