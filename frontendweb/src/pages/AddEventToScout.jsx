import React from "react";
import "../CSS/AddEventToScout.css";
import EventList from "../components/EventList";
import EventCard from "../components/EventCard";
import ScouterCard from "../components/SideBar";

const MainPage = () => {
  const events = [
    {
    },
  ];

  const featuredEvent = events[0];

  const scouter = {
  };

  return (
    <div className="main-page bg-gray-900 min-h-screen p-8 text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <EventList events={events} />
        <EventList events={events} />
        <EventCard event={featuredEvent} />
        <ScouterCard scouter={scouter} />
      </div>
    </div>
  );
};

export default MainPage;
