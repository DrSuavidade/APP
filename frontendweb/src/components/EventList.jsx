const EventoList = ({ jogo, escalão, data, hora, local }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg text-white shadow-md">
      <p className="text-sm">Scouter: Marco Santos</p>
      <h3 className="font-bold">{jogo}</h3>
      <p className="text-sm">{escalão} | {data} | {hora}</p>
      <p className="text-sm flex items-center"><span className="mr-2">📍</span>{local}</p>
    </div>
  );
};

export default EventoList;
