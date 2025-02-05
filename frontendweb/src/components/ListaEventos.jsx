import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaPlus, FaTimes } from "react-icons/fa";
import "../CSS/ListRelatorios.css";

const ListaEventos = () => {
  const [eventos, setEventos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectMode, setSelectMode] = useState(false);
  const [selectedEventos, setSelectedEventos] = useState([]);
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
  }, []);

  const toggleSelectMode = () => {
    setSelectMode(!selectMode);
    if (!selectMode) {
      setSelectedEventos([]);
    }
  };

  const toggleSelection = (data) => {
    if (selectedEventos.includes(data)) {
      setSelectedEventos(selectedEventos.filter((e) => e !== data));
    } else {
      setSelectedEventos([...selectedEventos, data]);
    }
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
          await axios.delete("http://localhost:3000/api/eventos/delete", {
            data: { eventosIds: selectedEventos },
          });

          setEventos(eventos.filter((e) => !selectedEventos.includes(e.DATA)));
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
      {/* Barra de pesquisa e botões */}
      <div className="lista-eventos-toolbar">
        <div className="lista-eventos-search-container">
          <input
            type="text"
            placeholder="Pesquisar evento"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="lista-eventos-buttons-container">
          <div className="lista-eventos-icons-container">
            <FaTrash className="icon trash" onClick={toggleSelectMode} />
            <FaPlus className="icon add" onClick={() => navigate("/evento/add")} />
            {selectMode && <FaTimes className="icon cancel" onClick={() => setSelectMode(false)} />}
          </div>
        </div>
      </div>

      {/* Tabela de eventos */}
      <div className="lista-eventos-scroll-container">
        <table className="lista-eventos-table">
          <thead>
            <tr>
              {selectMode && <th></th>}
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
                <tr key={evento.DATA}>
                  {selectMode && (
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedEventos.includes(evento.DATA)}
                        onChange={() => toggleSelection(evento.DATA)}
                      />
                    </td>
                  )}
                  <td>{evento.EQUIPA_CASA} vs {evento.VISITANTE}</td>
                  <td>{evento.NOME_USER || "Sem Scout Associado"}</td>
                  <td>{evento.DATA}</td>
                  <td>{evento.HORA}</td>
                  <td>{evento.LOCAL}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListaEventos;