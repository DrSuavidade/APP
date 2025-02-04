import React, { useEffect, useState } from "react";
import "../CSS/ListRelatorios.css";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTrash, FaPlus, FaTimes } from "react-icons/fa";


const ListRelatorios = ({ onSelectRelatorio }) => {
  const [relatorios, setRelatorios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectMode, setSelectMode] = useState(false);
  const [selectedRelatorios, setSelectedRelatorios] = useState([]);

  useEffect(() => {
    const fetchRelatorios = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/relatorios-merged");
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
  {/* Cabeçalho fixo */}
  <div className="list-relatorios-header">
  <div className="search-toolbar">
  {/* Barra de pesquisa */}
  <div className="search-container">
    <input
      type="text"
      placeholder="Escreva o nome do jogador"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <button className="search-btn">Pesquisar</button>
  </div>

  {/* Novos botões (movidos para baixo) */}
  <div className="buttons-container">
    <FaTrash className="icon trash" onClick={toggleSelectMode} />
    <FaPlus className="icon add" onClick={() => console.log("Adicionar relatório")} />
    {selectMode && <FaTimes className="icon cancel" onClick={() => setSelectMode(false)} />}
  </div>
</div>

    {/* Títulos das colunas */}
    <div className="table-header">
      <div>ID</div>
      <div>Jogador</div>
      <div>Clube</div>
      <div>Avaliação</div>
      <div>Scouter</div>
      <div>Data</div>
      <div>Status</div>
    </div>
  </div>

  {/* Conteúdo rolável */}
  <div className="table-content">
    {relatorios
      .filter((r) => r.JOGADOR_NOME.toLowerCase().includes(searchTerm.toLowerCase()))
      .map((report) => (
        <div
          key={report.ID_RELATORIO}
          className="table-row"
          onClick={() => onSelectRelatorio(report.ID_RELATORIO)}
        >
          <div>{report.ID_RELATORIO}</div>
          <div>{report.JOGADOR_NOME}</div>
          <div>{report.ABREVIATURA_CLUBE}</div>
          <div>{getStars(report.NOTA_ADM)}</div>
          <div>{report.NOME_USER} (ID: {report.ID_USER})</div>
          <div>{formatDate(report.DATA)}</div>
          <div>
            <span
              className="status-circle"
              style={{ backgroundColor: getStatusColor(report.STATUS) }}
              title={report.STATUS}
            ></span>
          </div>
        </div>
      ))}
  </div>
</div>
  );
};

export default ListRelatorios;
