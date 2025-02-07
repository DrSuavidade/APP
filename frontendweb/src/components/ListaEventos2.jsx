import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaPlus, FaTimes } from "react-icons/fa";
import Cookies from "js-cookie";

const ListaEventos2 = () => {
  const [eventos, setEventos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectMode, setSelectMode] = useState(false);
  const [selectedEventos, setSelectedEventos] = useState([]);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/eventos/recentes");
        setEventos(response.data);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    };

    fetchEventos();

    const ID_TIPO = Cookies.get("ID_TIPO");
    setUserType(ID_TIPO);
  }, []);

  const selecionarEvento = (eventoId) => {
    localStorage.setItem("selectedEvent", eventoId);
    window.dispatchEvent(new Event("storage"));
  };

  const toggleSelectMode = () => {
    setSelectMode(!selectMode);
    if (!selectMode) {
      setSelectedEventos([]);
    }
  };

  const toggleSelection = (eventoId) => {
    setSelectedEventos((prev) =>
      prev.includes(eventoId) ? prev.filter((id) => id !== eventoId) : [...prev, eventoId]
    );
  };

  const deleteSelected = async () => {
    if (selectedEventos.length === 0) {
      Swal.fire("Erro", "Selecione pelo menos um evento para excluir.", "error");
      return;
    }

    Swal.fire({
      title: "Tem certeza?",
      text: "Os eventos serão excluídos permanentemente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete("http://localhost:3000/api/eventos/delete-multiple", {
            data: { eventosIds: selectedEventos },
          });

          setEventos(eventos.filter((evento) => !selectedEventos.includes(evento.ID_EVENTOS)));
          setSelectedEventos([]);
          setSelectMode(false);

          Swal.fire("Excluído!", "Os eventos foram removidos com sucesso.", "success");
        } catch (error) {
          console.error("Erro ao excluir eventos:", error);
          Swal.fire("Erro!", "Não foi possível excluir os eventos.", "error");
        }
      }
    });
  };

  return (
    <div className="lista-eventos-container">
      <div className="lista-eventos-toolbar">
        <div className="lista-eventos-search-container">
          <input
            type="text"
            placeholder="Pesquisar evento"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {userType !== "1" && (
          <div className="lista-eventos-icons-container">
            <FaTrash className="icon trash" onClick={selectMode ? deleteSelected : toggleSelectMode} />
            <FaPlus className="icon add" onClick={() => navigate("/events/new")} />
            {selectMode && (
              <FaTimes
                className="icon cancel"
                onClick={() => {
                  setSelectMode(false);
                  setSelectedEventos([]);
                }}
              />
            )}
          </div>
        )}
      </div>

      <table className="lista-eventos-table">
        <thead>
          <tr>
            {selectMode && <th></th>}
            <th>ID</th>
            <th>Jogo</th>
            <th>Scouter</th>
            <th>Data</th>
            <th>Hora</th>
            <th>Local</th>
          </tr>
        </thead>
        <tbody>
          {eventos
            .filter((e) =>
              `${e.EQUIPA_CASA} vs ${e.VISITANTE}`.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((evento) => (
              <tr key={evento.ID_EVENTOS} onClick={() => selecionarEvento(evento.ID_EVENTOS)}>
                {selectMode && (
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedEventos.includes(evento.ID_EVENTOS)}
                      onChange={() => toggleSelection(evento.ID_EVENTOS)}
                    />
                  </td>
                )}
                <td>{evento.ID_EVENTOS}</td>
                <td>{evento.EQUIPA_CASA} vs {evento.VISITANTE}</td>
                <td>{evento.NOME_USER || "Sem Scout Associado"}</td>
                <td>{new Date(evento.DATA).toLocaleDateString("pt-PT")}</td>
                <td>{evento.HORA}</td>
                <td>{evento.LOCAL}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaEventos2;
