import React, { useEffect, useState } from "react";
import "../CSS/ListRelatorios.css";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTrash, FaTimes } from "react-icons/fa";

const ReportsHistory = ({ ID_JOGADORES, onSelectRelatorio }) => {
  const [relatorios, setRelatorios] = useState([]);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedRelatorios, setSelectedRelatorios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    if (!ID_JOGADORES) return;
    const fetchRelatorios = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/player/reports/${ID_JOGADORES}`);
        console.log("📌 Relatórios recebidos:", response.data);
        setRelatorios(response.data);
      } catch (error) {
        console.error("❌ Erro ao buscar relatórios:", error);
      }
    };

    fetchRelatorios();
  }, [ID_JOGADORES]);

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
      Swal.fire("Erro", "Selecione pelo menos um relatório para excluir.", "error");
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
          await axios.delete("http://localhost:3000/api/relatorios/delete", {
            data: { relatoriosIds: selectedRelatorios },
          });

          setRelatorios(relatorios.filter((r) => !selectedRelatorios.includes(r.ID_RELATORIO)));
          setSelectedRelatorios([]);
          setSelectMode(false);

          Swal.fire("Excluído!", "Os relatórios foram excluídos com sucesso.", "success");
        } catch (error) {
          console.error("❌ Erro ao excluir relatórios:", error);
          Swal.fire("Erro!", "Não foi possível excluir os relatórios.", "error");
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

  const getStars = (nota) => "★".repeat(nota) + "☆".repeat(5 - nota);

  return (
    <div className="list-relatorios-container">
    <div className="lista-eventos-toolbar">
      <div className="lista-eventos-search-container">
        <input
          type="text"
          placeholder="Pesquisar relatório"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="lista-eventos-icons-container">
        <FaTrash className="icon trash" onClick={selectMode ? deleteSelected : toggleSelectMode} />
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
    </div>


      <div className="lista-eventos-scroll-container">
        <table className="lista-eventos-table">
          <thead>
            <tr>
              {selectMode && <th></th>}
              <th>ID</th>
              <th>Jogador</th>
              <th>Clube</th>
              <th>Avaliação</th>
              <th>Scouter</th>
              <th>Data</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
          {relatorios
            .filter((report) =>
              report.JOGADOR_NOME.toLowerCase().includes(searchTerm.toLowerCase()) ||
              report.ABREVIATURA_CLUBE.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((report) => (
              <tr key={report.ID_RELATORIO} onClick={() => onSelectRelatorio(report.ID_RELATORIO)}>
                {selectMode && (
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRelatorios.includes(report.ID_RELATORIO)}
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