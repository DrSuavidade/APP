const Card = ({ children }) => (
  <div className="bg-gray-600 text-white rounded-2xl shadow-lg p-4 w-full max-w-2xl">
    {children}
  </div>
);

const EventoCard = ({ evento }) => {
  return (
    <Card>
      <div className="flex flex-col p-4">
        <div className="flex justify-between text-sm text-gray-300 mb-2">
          <span>Scouter: {evento.NOME_USER}</span>
          <span>Sub - 16</span> {/* Ajuste conforme necessário */}
        </div>
        
        <div className="text-xl font-bold">
          {evento.EQUIPA_CASA} <br />
          {evento.VISITANTE}
        </div>

        <div className="flex justify-between items-center mt-2 text-gray-300 text-sm">
          <span>{new Date(evento.DATA).toLocaleDateString()}</span>
          <span>{evento.HORA}</span>
          <span className="flex items-center">
            📍 {evento.LOCAL}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default EventoCard;
