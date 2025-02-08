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
  const [userType, setUserType] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "ascending" }); // Estado para ordenação
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

  useEffect(() => {
    console.log("Eventos atualizados:", eventos); // Log para depuração
  }, [eventos]);

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

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-PT"); // Formata a data para dd/mm/yyyy
  };

  const handleSort = (key) => {
    console.log("handleSort chamado com a chave:", key); // Log para depuração

    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    console.log("Ordenando por:", key, "Direção:", direction); // Log para depuração

    setEventos((prevEventos) => {
      const sortedEventos = [...prevEventos].sort((a, b) => {
        // Verifique se as chaves existem e são válidas
        if (a[key] === undefined || b[key] === undefined) {
          console.warn(`Chave "${key}" não encontrada ou inválida em algum objeto.`);
          return 0;
        }

        // Tratamento especial para datas e números
        let valueA = a[key];
        let valueB = b[key];

        if (key === "DATA") {
          // Converte datas para timestamps para comparação
          valueA = new Date(valueA).getTime();
          valueB = new Date(valueB).getTime();
        } else if (key === "HORA") {
          // Converte horas para timestamps para comparação
          valueA = new Date(`1970-01-01T${valueA}`).getTime();
          valueB = new Date(`1970-01-01T${valueB}`).getTime();
        }

        if (valueA < valueB) {
          return direction === "ascending" ? -1 : 1;
        }
        if (valueA > valueB) {
          return direction === "ascending" ? 1 : -1;
        }
        return 0;
      });

      console.log("Eventos ordenados:", sortedEventos); // Log para depuração
      return sortedEventos;
    });
  };

  return (
    <div className="lista-eventos-container">
      {console.log("Tabela re-renderizada")}
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

      <div className="lista-eventos-scroll-container">
        <table className="lista-eventos-table">
          <thead>
            <tr>
              {selectMode && <th></th>}
              <th onClick={() => handleSort("ID_EVENTOS")}>ID</th>
              <th onClick={() => handleSort("EQUIPA_CASA")}>Jogo</th>
              <th onClick={() => handleSort("NOME_USER")}>Scouter</th>
              <th onClick={() => handleSort("DATA")}>Data</th>
              <th onClick={() => handleSort("HORA")}>Hora</th>
              <th onClick={() => handleSort("LOCAL")}>Local</th>
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
                  <td>{evento.ID_EVENTOS}</td>
                  <td>{evento.EQUIPA_CASA} vs {evento.VISITANTE}</td>
                  <td>{evento.NOME_USER || "Sem Scout Associado"}</td>
                  <td>{formatarData(evento.DATA)}</td>
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