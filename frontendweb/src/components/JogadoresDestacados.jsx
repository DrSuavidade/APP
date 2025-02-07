import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaPlus, FaTimes } from "react-icons/fa";
import "../CSS/JogadoresDestacados.css";

const JogadoresDestacados = ({ ID_USER }) => {
  const [jogadores, setJogadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedJogadores, setSelectedJogadores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJogadores = async () => {
      try {
        const response = await axios.get(`/jogador/list/${ID_USER}`);
        setJogadores(response.data);
      } catch (error) {
        console.error("Erro ao buscar jogadores:", error);
        setJogadores([]);
      } finally {
        setLoading(false);
      }
    };

    if (ID_USER) {
      fetchJogadores();
    }
  }, [ID_USER]);

  const toggleSelectMode = () => {
    setSelectMode(!selectMode);
    if (!selectMode) {
      setSelectedJogadores([]); // Limpa as seleções ao ativar o modo de seleção
    }
  };

  const toggleSelection = (ID_JOGADORES) => {
    if (selectedJogadores.includes(ID_JOGADORES)) {
      setSelectedJogadores(selectedJogadores.filter((id) => id !== ID_JOGADORES));
    } else {
      setSelectedJogadores([...selectedJogadores, ID_JOGADORES]);
    }
  };

  const deleteSelected = async () => {
    if (selectedJogadores.length === 0) {
      Swal.fire("Erro", "Selecione pelo menos um jogador para excluir.", "error");
      return;
    }

    Swal.fire({
      title: "Tem certeza?",
      text: "Os jogadores serão excluídos permanentemente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`/jogador/delete`, {
            data: { jogadoresIds: selectedJogadores },
          });

          setJogadores(jogadores.filter((jogador) => !selectedJogadores.includes(jogador.ID_JOGADORES)));
          setSelectedJogadores([]);
          setSelectMode(false);

          Swal.fire("Excluído!", "Os jogadores foram removidos com sucesso.", "success");
        } catch (error) {
          console.error("Erro ao excluir jogadores:", error);
          Swal.fire("Erro!", "Não foi possível excluir os jogadores.", "error");
        }
      }
    });
  };

  if (loading) {
    return <p>Carregando jogadores...</p>;
  }

  if (!jogadores || jogadores.length === 0) {
    return <p className="text-gray">Nenhum jogador selecionado.</p>;
  }

  return (
    <div className="jogadores-destacados-container">
      <div className="jogadores-destacados-toolbar">
        <FaTrash className="icon trash" onClick={selectMode ? deleteSelected : toggleSelectMode} />
        <FaPlus className="icon add" onClick={() => navigate("/jogadores/novo")} />
        {selectMode && (
          <FaTimes className="icon cancel" onClick={() => {
            setSelectMode(false);
            setSelectedJogadores([]);
          }} />
        )}
      </div>

      <h3>JOGADORES DESTACADOS</h3>
      <div className="jogadores-list">
        {jogadores.map((jogador) => (
          <div key={jogador.ID_JOGADORES} className="jogador-item">
            {selectMode && (
              <input
                type="checkbox"
                checked={selectedJogadores.includes(jogador.ID_JOGADORES)}
                onChange={() => toggleSelection(jogador.ID_JOGADORES)}
              />
            )}
            <div className="jogador-avatar"></div>
            <div className="jogador-info">
              <span className="nome">{jogador.NOME}</span>
              <span className="idade">{jogador.IDADE} anos</span>
              <span className="ano">{jogador.ANO_NASC}</span>
              <span className="relatorio">Relatório: {jogador.ID_RELATORIO || "Sem relatório"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JogadoresDestacados;
