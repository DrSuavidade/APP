import React, { useEffect, useState } from "react";
import "../CSS/ListRelatorios.css";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTrash, FaTimes } from "react-icons/fa";
import Cookies from "js-cookie";

const ReportsHistory = ({ ID_JOGADORES, onSelectRelatorio }) => {
  const [relatorios, setRelatorios] = useState([]);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedRelatorios, setSelectedRelatorios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userType, setUserType] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "ascending" }); // Estado para ordenação

  useEffect(() => {
    if (!ID_JOGADORES) return;
    const fetchRelatorios = async () => {
      try {
        const response = await axios.get(
          `https://backendscout-cx6c.onrender.com/api/player/reports/${ID_JOGADORES}`
        );
        console.log("📌 Relatórios recebidos:", response.data);
        setRelatorios(response.data);
      } catch (error) {
        console.error("❌ Erro ao buscar relatórios:", error);
      }
    };

    fetchRelatorios();

    const ID_TIPO = Cookies.get("ID_TIPO");
    setUserType(ID_TIPO);
  }, [ID_JOGADORES]);

  useEffect(() => {
    console.log("Relatórios atualizados:", relatorios); // Log para depuração
  }, [relatorios]);

  const toggleSelectMode = () => {
    setSelectMode(!selectMode);
    if (!selectMode) {
      setSelectedRelatorios([]);
    }
  };

  const toggleSelection = (id) => {
    setSelectedRelatorios((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((r) => r !== id)
        : [...prevSelected, id]
    );
  };

  const deleteSelected = async () => {
    if (selectedRelatorios.length === 0) {
      Swal.fire(
        "Erro",
        "Selecione pelo menos um relatório para excluir.",
        "error"
      );
      return;
    }

    Swal.fire({
      title: "Tem certeza?",
      text: "Os dados serão excluídos permanentemente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete("https://backendscout-cx6c.onrender.com/api/relatorios/delete", {
            data: { relatoriosIds: selectedRelatorios },
          });

          setRelatorios(
            relatorios.filter(
              (r) => !selectedRelatorios.includes(r.ID_RELATORIO)
            )
          );
          setSelectedRelatorios([]);
          setSelectMode(false);

          Swal.fire(
            "Excluído!",
            "Os relatórios foram excluídos com sucesso.",
            "success"
          );
        } catch (error) {
          console.error("❌ Erro ao excluir relatórios:", error);
          Swal.fire(
            "Erro!",
            "Não foi possível excluir os relatórios.",
            "error"
          );
        }
      }
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Avaliado":
        return "yellow";
      case "Avaliado_ADM":
        return "transparent";
      case "Ativo":
        return "white";
      default:
        return "red";
    }
  };

  const getStars = (nota) => {
    return (
      <span className="stars">
        <span className="filled-star">{"★".repeat(nota)}</span>
        <span className="gray-stars">{"★".repeat(5 - nota)}</span>
      </span>
    );
  };

  const handleSort = (key) => {
    console.log("handleSort chamado com a chave:", key); // Log para depuração

    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    console.log("Ordenando por:", key, "Direção:", direction); // Log para depuração

    setRelatorios((prevRelatorios) => {
      const sortedRelatorios = [...prevRelatorios].sort((a, b) => {
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
        } else if (key === "NOTA_ADM") {
          // Garante que as notas sejam números
          valueA = Number(valueA);
          valueB = Number(valueB);
        }

        if (valueA < valueB) {
          return direction === "ascending" ? -1 : 1;
        }
        if (valueA > valueB) {
          return direction === "ascending" ? 1 : -1;
        }
        return 0;
      });

      console.log("Relatórios ordenados:", sortedRelatorios); // Log para depuração
      return sortedRelatorios;
    });
  };

  return (
    <div className="list-relatorios-container">
      {console.log("Tabela re-renderizada")}
      <div className="lista-eventos-toolbar">
        <div className="lista-eventos-search-container">
          <input
            type="text"
            placeholder="Pesquisar relatório"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {userType !== "1" && (
          <div className="lista-eventos-icons-container">
            <FaTrash
              className="icon trash"
              onClick={selectMode ? deleteSelected : toggleSelectMode}
            />
            {selectMode && (
              <FaTimes
                className="icon cancel"
                onClick={() => {
                  setSelectMode(false);
                  setSelectedRelatorios([]);
                }}
              />
            )}
          </div>
        )}
      </div>

      <div className="lista-eventos-scroll-container">
        <table className="lista-eventos-table">
          <thead>
            <tr>
              {selectMode && <th></th>}
              <th onClick={() => handleSort("ID_RELATORIO")}>ID</th>
              <th onClick={() => handleSort("JOGADOR_NOME")}>Jogador</th>
              <th onClick={() => handleSort("ABREVIATURA_CLUBE")}>Clube</th>
              <th onClick={() => handleSort("NOTA_ADM")}>Avaliação</th>
              <th onClick={() => handleSort("NOME_USER")}>Scouter</th>
              <th onClick={() => handleSort("DATA")}>Data</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {relatorios
              .filter(
                (report) =>
                  report.JOGADOR_NOME.toLowerCase().includes(
                    searchTerm.toLowerCase()
                  ) ||
                  report.ABREVIATURA_CLUBE.toLowerCase().includes(
                    searchTerm.toLowerCase()
                  )
              )
              .map((report) => (
                <tr
                  key={report.ID_RELATORIO}
                  onClick={() => onSelectRelatorio(report.ID_RELATORIO)}
                >
                  {selectMode && (
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedRelatorios.includes(
                          report.ID_RELATORIO
                        )}
                        onChange={() => toggleSelection(report.ID_RELATORIO)}
                      />
                    </td>
                  )}
                  <td>{report.ID_RELATORIO}</td>
                  <td>{report.JOGADOR_NOME}</td>
                  <td>{report.ABREVIATURA_CLUBE}</td>
                  <td>{getStars(report.NOTA_ADM)}</td>
                  <td>{report.NOME_USER} (ID: {report.ID_USER})</td>
                  <td>{new Date(report.DATA).toLocaleDateString()}</td>
                  <td>
                    <div
                      className="status-circle"
                      data-tooltip={report.STATUS || "Sem status"}
                      style={{ backgroundColor: getStatusColor(report.STATUS) }}
                    ></div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsHistory;