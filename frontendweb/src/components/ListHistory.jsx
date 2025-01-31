import React, { useEffect, useState } from "react";
import "../CSS/ListRelatorios.css";
import axios from "axios";
import Swal from "sweetalert2";

const ListRelatorios = ({ID_JOGADORES, onSelectRelatorio }) => {
  const [relatorios, setRelatorios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectMode, setSelectMode] = useState(false);
  const [selectedRelatorios, setSelectedRelatorios] = useState([]);

  useEffect(() => {
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
  }, []);

  const toggleSelectMode = () => {
    setSelectMode(!selectMode);
    if (!selectMode) {
      setSelectedRelatorios([]);
    }
  };

  const toggleSelection = (id) => {
    if (selectedRelatorios.includes(id)) {
      setSelectedRelatorios(selectedRelatorios.filter((r) => r !== id));
    } else {
      setSelectedRelatorios([...selectedRelatorios, id]);
    }
  };

  const deleteSelected = async () => {
    if (selectedRelatorios.length === 0) {
      alert("Selecione pelo menos um relatório para excluir.");
      return;
    }

    Swal.fire({
      title: "Tem certeza?",
      text: "Os dados serão excluídos permanentemente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Avançar",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete("http://localhost:3000/api/relatorios/delete", {
            data: { relatoriosIds: selectedRelatorios }
          });

          console.log("✅ Relatórios excluídos:", response.data);

          setRelatorios(relatorios.filter(r => !selectedRelatorios.includes(r.ID_RELATORIO)));
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
        return "green";
      default:
        return "red";
    }
  };

  const getStars = (nota) => {
    const stars = "★".repeat(nota) + "☆".repeat(5 - nota);
    return <span className="stars">{stars}</span>;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Data desconhecida";
    
    const date = new Date(dateString);
    
    const dia = String(date.getUTCDate()).padStart(2, "0");
    const mes = String(date.getUTCMonth() + 1).padStart(2, "0");
    const ano = date.getUTCFullYear();
  
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <div className="list-relatorios-container">
      {/* Barra de pesquisa */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Escreva o nome do jogador"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-btn">Search</button>
      </div>

      {/* Botão de seleção/eliminação */}
      <button className={`delete-btn ${selectMode ? "active" : ""}`} onClick={toggleSelectMode}>
        {selectMode ? "Cancelar" : "Selecionar para Eliminar"}
      </button>
      {selectMode && (
        <button className="confirm-delete-btn" onClick={deleteSelected}>
          Confirmar Eliminação
        </button>
      )}

      {/* Tabela de relatórios */}
      <table className="relatorios-table">
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
            .filter((r) => r.JOGADOR_NOME.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((report) => (
              <tr
                key={report.ID_RELATORIO}
                onClick={() => onSelectRelatorio(report.ID_RELATORIO)}
                style={{ cursor: "pointer" }}
              >
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
                <td>{formatDate(report.DATA)}</td>
                <td>
                  <span
                    className="status-circle"
                    style={{ backgroundColor: getStatusColor(report.STATUS) }}
                    title={report.STATUS}
                  ></span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListRelatorios;
