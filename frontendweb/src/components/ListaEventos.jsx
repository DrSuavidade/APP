import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaPlus, FaTimes } from "react-icons/fa";
import Cookies from "js-cookie";

const ListaEventos = () => {
  const [eventos, setEventos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectMode, setSelectMode] = useState(false);
  const [selectedEventos, setSelectedEventos] = useState([]);
  const [userType, setUserType] = useState(null); // Adicionado estado para armazenar ID_TIPO
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await axios.get("https://backendscout-cx6c.onrender.com/api/eventos/recentes");
        setEventos(response.data);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    };

    fetchEventos();

    const ID_TIPO = Cookies.get("ID_TIPO");
    setUserType(ID_TIPO);
  }, []);

  const toggleSelectMode = () => {
    setSelectMode(!selectMode);
    if (!selectMode) {
      setSelectedEventos([]); // Limpa as seleções ao ativar o modo de seleção
    }
  };

  const toggleSelection = (eventoId) => {
    if (selectedEventos.includes(eventoId)) {
      setSelectedEventos(selectedEventos.filter((id) => id !== eventoId));
    } else {
      setSelectedEventos([...selectedEventos, eventoId]);
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
          await axios.delete("https://backendscout-cx6c.onrender.com/api/eventos/delete-multiple", {
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

  // Função para formatar a data no formato dd/mm/yyyy
  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-PT"); // Formata a data para dd/mm/yyyy
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
        {userType !== "1" && (
          <div className="lista-eventos-buttons-container">
            <div className="lista-eventos-icons-container">
              <FaTrash
                className="icon trash"
                onClick={selectMode ? deleteSelected : toggleSelectMode} // Só executa deleteSelected se o modo de seleção estiver ativo
              />
              <FaPlus className="icon add" onClick={() => navigate("/events/new")} />
              {selectMode && (
                <FaTimes
                  className="icon cancel"
                  onClick={() => {
                    setSelectMode(false);
                    setSelectedEventos([]); // Limpa as seleções ao cancelar o modo de seleção
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Tabela de eventos */}
      <div className="lista-eventos-scroll-container">
        <table className="lista-eventos-table">
          <thead>
            <tr>
              {selectMode && <th></th>}
              <th>ID</th> {/* Nova coluna para o ID do evento */}
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
                <tr key={evento.ID_EVENTOS}>
                  {selectMode && (
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedEventos.includes(evento.ID_EVENTOS)}
                        onChange={() => toggleSelection(evento.ID_EVENTOS)}
                      />
                    </td>
                  )}
                  <td>{evento.ID_EVENTOS}</td> {/* Exibe o ID do evento */}
                  <td>{evento.EQUIPA_CASA} vs {evento.VISITANTE}</td>
                  <td>{evento.NOME_USER || "Sem Scout Associado"}</td>
                  <td>{formatarData(evento.DATA)}</td> {/* Formata a data */}
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
