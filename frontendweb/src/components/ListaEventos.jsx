import { useEffect, useState } from "react";
import EventoCard from "./EventoCard";

const ListaEventos = () => {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/eventos/recentes") // Ajuste a URL conforme necessário
      .then((res) => res.json())
      .then((data) => setEventos(data))
      .catch((error) => console.error("Erro ao buscar eventos:", error));
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {eventos.length > 0 ? (
        eventos.map((evento) => <EventoCard key={evento.DATA} evento={evento} />)
      ) : (
        <p className="text-gray-400">Nenhum evento encontrado.</p>
      )}
    </div>
  );
};

export default ListaEventos;
