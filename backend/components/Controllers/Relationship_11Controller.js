const Relationship11 = require('../Models/Relationship_11');
const Equipa = require('../Models/Equipa');
const Clube = require('../Models/Clube');
const Relatorio = require('../Models/Relatorio');
const Jogadores = require('../Models/Jogadores');
const User = require('../Models/User');

const relationship11Controller = {};

// Add a new favorito
relationship11Controller.addRelationship11 = async (req, res) => {
  const { ID_EQUIPA, ID_JOGADORES } = req.body;

  try {
    // Create a new favorito document with the calculated id_favorito
    const relationship11 = new Relationship11({ ID_EQUIPA, ID_JOGADORES });
    await relationship11.save();

    res.status(201).json({ message: 'Relationship11 adicionado com sucesso!', relationship11 });
  } catch (error) {
    console.error('Erro ao adicionar relationship11:', error);
    res.status(500).json({ error: 'Erro ao adicionar relationship11' });
  }
};

// List all favoritos
relationship11Controller.listRelationship11 = async (req, res) => {
  try {
    const relationship11 = await Relationship11.find();
    res.status(200).json(relationship11);
  } catch (error) {
    console.error('Erro ao listar relationship11:', error);
    res.status(500).json({ error: 'Erro ao listar relationship11' });
  }
};

//Lista o Clube e a Equipa de um determinado jogador
relationship11Controller.getPlayerTeamAndClub = async (req, res) => {
  let { ID_JOGADORES } = req.params;

  try {
    // Garantir que ID_JOGADORES é um número
    ID_JOGADORES = Number(ID_JOGADORES);
    if (isNaN(ID_JOGADORES)) {
      return res.status(400).json({ error: "ID_JOGADORES inválido." });
    }

    // Buscar a relação do jogador com a equipa
    const relationship = await Relationship11.findOne({ ID_JOGADORES });

    if (!relationship) {
      return res.status(404).json({ message: "Jogador não está vinculado a nenhuma equipa." });
    }

    // Buscar os dados da equipa
    const equipa = await Equipa.findOne({ ID_EQUIPA: relationship.ID_EQUIPA });

    if (!equipa) {
      return res.status(404).json({ message: "Equipa não encontrada." });
    }

    // Buscar os dados do clube associado à equipa
    const clube = await Clube.findOne({ ID_CLUBE: equipa.ID_CLUBE });

    if (!clube) {
      return res.status(404).json({ message: "Clube não encontrado." });
    }

    // Retornar os dados
    res.status(200).json({
      NOME_EQUIPA: equipa.NOME,
      ABREVIATURA_CLUBE: clube.ABREVIATURA
    });

  } catch (error) {
    console.error("Erro ao buscar equipa e clube do jogador:", error);
    res.status(500).json({ error: "Erro ao buscar equipa e clube do jogador." });
  }
};

//PlayerCards Component main controller
relationship11Controller.playerCards = async (req, res) => {
  try {
    // Buscar relatórios avaliados
    const relatorios = await Relatorio.find({ STATUS: 'Avaliado' });

    if (!relatorios || relatorios.length === 0) {
      return res.status(404).json({ message: "Nenhum relatório avaliado encontrado." });
    }

    // Buscar jogadores cujos IDs estão presentes nos relatórios
    const jogadoresIds = relatorios.map(r => r.ID_JOGADORES);
    const jogadores = await Jogadores.find({ ID_JOGADORES: { $in: jogadoresIds } });

    // Buscar relação jogador-equipa
    const relationships = await Relationship11.find({ ID_JOGADORES: { $in: jogadoresIds } });

    // Buscar equipas e clubes associados
    const equipasIds = relationships.map(r => r.ID_EQUIPA);
    const equipas = await Equipa.find({ ID_EQUIPA: { $in: equipasIds } });

    const clubesIds = equipas.map(e => e.ID_CLUBE);
    const clubes = await Clube.find({ ID_CLUBE: { $in: clubesIds } });

    // Criar resposta formatada com todos os dados necessários
    const result = relatorios.map(relatorio => {
      const jogador = jogadores.find(j => j.ID_JOGADORES === relatorio.ID_JOGADORES);
      const relationship = relationships.find(r => r.ID_JOGADORES === relatorio.ID_JOGADORES);
      const equipa = equipas.find(e => e.ID_EQUIPA === (relationship ? relationship.ID_EQUIPA : null));
      const clube = clubes.find(c => c.ID_CLUBE === (equipa ? equipa.ID_CLUBE : null));

      return {
        ID_RELATORIO: relatorio.ID_RELATORIO,
        NOTA: relatorio.NOTA,
        STATUS: relatorio.STATUS,
        JOGADOR_NOME: jogador ? jogador.NOME : "Desconhecido",
        DATA_NASC: jogador ? jogador.DATA_NASC : null,
        ABREVIATURA_CLUBE: clube ? clube.ABREVIATURA : "--",
        NOME_EQUIPA: equipa ? equipa.NOME : "Sem equipa"
      };
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Erro ao buscar dados para PlayerCard:", error);
    res.status(500).json({ error: "Erro ao buscar dados para PlayerCard." });
  }
};


// Edit a favorito by id_favoritos
relationship11Controller.editRelationship11 = async (req, res) => {
  const { ID_EQUIPA, ID_JOGADORES } = req.params;
  const { NEW_ID_EQUIPA, NEW_ID_JOGADORES } = req.body;

  try {
    const relationship11 = await Relationship11.findOne({ ID_EQUIPA, ID_JOGADORES });
    if (!relationship11) {
      return res.status(404).json({ message: 'Relationship11 não encontrado' });
    }

    if (NEW_ID_EQUIPA) relationship11.ID_EQUIPA = NEW_ID_EQUIPA;
    if (NEW_ID_JOGADORES) relationship11.ID_JOGADORES = NEW_ID_JOGADORES;

    const updatedRelationship11 = await relationship11.save();
    res.status(200).json({ message: 'Relationship11 atualizado com sucesso!', relationship11: updatedRelationship11 });
  } catch (error) {
    console.error('Erro ao atualizar relationship11:', error);
    res.status(500).json({ error: 'Erro ao atualizar relationship11' });
  }
};


//PAGINA DE REALTORIOS
// Novo controlador para listar todos os relatórios com dados completos
relationship11Controller.listRelatoriosMergedData = async (req, res) => {
  try {
    // Buscar todos os relatórios
    const relatorios = await Relatorio.find();

    if (!relatorios || relatorios.length === 0) {
      return res.status(404).json({ message: "Nenhum relatório encontrado." });
    }

    // Buscar jogadores pelos IDs presentes nos relatórios
    const jogadoresIds = relatorios.map(r => r.ID_JOGADORES);
    const jogadores = await Jogadores.find({ ID_JOGADORES: { $in: jogadoresIds } });

    // Buscar relação jogador-equipa
    const relationships = await Relationship11.find({ ID_JOGADORES: { $in: jogadoresIds } });

    // Buscar equipas e clubes associados
    const equipasIds = relationships.map(r => r.ID_EQUIPA);
    const equipas = await Equipa.find({ ID_EQUIPA: { $in: equipasIds } });

    const clubesIds = equipas.map(e => e.ID_CLUBE);
    const clubes = await Clube.find({ ID_CLUBE: { $in: clubesIds } });

    // Buscar usuários (scouters) pelos IDs presentes nos relatórios
    const usersIds = relatorios.map(r => r.ID_USER);
    const users = await User.find({ ID_USER: { $in: usersIds } });

    // Criar resposta formatada com todos os dados necessários
    const result = relatorios.map(relatorio => {
      const jogador = jogadores.find(j => j.ID_JOGADORES === relatorio.ID_JOGADORES);
      const relationship = relationships.find(r => r.ID_JOGADORES === relatorio.ID_JOGADORES);
      const equipa = equipas.find(e => e.ID_EQUIPA === (relationship ? relationship.ID_EQUIPA : null));
      const clube = clubes.find(c => c.ID_CLUBE === (equipa ? equipa.ID_CLUBE : null));
      const user = users.find(u => u.ID_USER === relatorio.ID_USER);

      return {
        ID_RELATORIO: relatorio.ID_RELATORIO,
        JOGADOR_NOME: jogador ? jogador.NOME : "Desconhecido",
        ABREVIATURA_CLUBE: clube ? clube.ABREVIATURA : "--",
        NOTA_ADM: jogador ? jogador.NOTA_ADM : "Sem nota",
        ID_USER: relatorio.ID_USER,
        NOME_USER: user ? user.NOME : "Desconhecido",
        DATA: relatorio.DATA, // Certificar-se de que retorna a data correta
        STATUS: relatorio.STATUS // Agora incluindo o status do relatório
      };
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Erro ao buscar dados para ListRelatoriosMergedData:", error);
    res.status(500).json({ error: "Erro ao buscar dados para ListRelatoriosMergedData." });
  }
};

//Delete ralatorios pela lista
relationship11Controller.deleteSelectedRelatorios = async (req, res) => {
  try {
    const { relatoriosIds } = req.body;

    if (!relatoriosIds || !Array.isArray(relatoriosIds) || relatoriosIds.length === 0) {
      return res.status(400).json({ message: "Nenhum relatório selecionado para exclusão." });
    }

    // Excluir os relatórios com os IDs fornecidos
    const result = await Relatorio.deleteMany({ ID_RELATORIO: { $in: relatoriosIds } });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Nenhum relatório encontrado para exclusão." });
    }

    res.status(200).json({ message: "Relatórios excluídos com sucesso.", deletedCount: result.deletedCount });
  } catch (error) {
    console.error("Erro ao deletar relatórios:", error);
    res.status(500).json({ error: "Erro ao excluir relatórios." });
  }
};

//Ficha de Relatorios
relationship11Controller.fichaReports = async (req, res) => {
  try {
    const { ID_RELATORIO } = req.params;

    if (!ID_RELATORIO) {
      return res.status(400).json({ error: "ID do relatório não fornecido." });
    }

    // Buscar relatório
    const relatorio = await Relatorio.findOne({ ID_RELATORIO });

    if (!relatorio) {
      return res.status(404).json({ message: "Relatório não encontrado." });
    }

    // Formatar data para "dd/MM/yyyy"
    const formatarData = (data) => {
      const dataObj = new Date(data);
      const dia = dataObj.getUTCDate().toString().padStart(2, "0");
      const mes = (dataObj.getUTCMonth() + 1).toString().padStart(2, "0");
      const ano = dataObj.getUTCFullYear();
      return `${dia}/${mes}/${ano}`;
    };

    const dataFormatada = formatarData(relatorio.DATA);

    // Buscar jogador relacionado
    const jogador = await Jogadores.findOne({ ID_JOGADORES: relatorio.ID_JOGADORES });

    if (!jogador) {
      return res.status(404).json({ message: "Jogador não encontrado." });
    }

    // Calcular idade e ano de nascimento
    const calcularIdade = (dataNasc) => {
      const nascimento = new Date(dataNasc);
      const hoje = new Date();
      let idade = hoje.getFullYear() - nascimento.getFullYear();
      const mes = hoje.getMonth() - nascimento.getMonth();
      if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
      }
      return idade;
    };
    const anoNascimento = new Date(jogador.DATA_NASC).getFullYear();

    // Buscar equipa e clube do jogador
    const relationship = await Relationship11.findOne({ ID_JOGADORES: jogador.ID_JOGADORES });
    let nomeEquipa = "Sem equipa";
    let abreviaturaClube = "--";

    if (relationship) {
      const equipa = await Equipa.findOne({ ID_EQUIPA: relationship.ID_EQUIPA });
      if (equipa) {
        nomeEquipa = equipa.NOME;
        const clube = await Clube.findOne({ ID_CLUBE: equipa.ID_CLUBE });
        if (clube) {
          abreviaturaClube = clube.ABREVIATURA;
        }
      }
    }

    // Se a NOTA_ADM do relatório for 0 ou undefined, usar a do jogador
    const notaADM = relatorio.NOTA_ADM && relatorio.NOTA_ADM > 0 ? relatorio.NOTA_ADM : jogador.NOTA_ADM;

    // Retornar os dados formatados
    res.status(200).json({
      ID_RELATORIO: relatorio.ID_RELATORIO,
      DATA: dataFormatada, // Data formatada corretamente
      JOGADOR_NOME: jogador.NOME,
      IDADE: calcularIdade(jogador.DATA_NASC),
      ANO_NASCIMENTO: anoNascimento,
      NOTA: relatorio.NOTA,
      TECNICA: relatorio.TECNICA,
      VELOCIDADE: relatorio.VELOCIDADE,
      COMPETITIVA: relatorio.COMPETITIVA,
      INTELIGENCIA: relatorio.INTELIGENCIA,
      MORFOLOGIA: relatorio.MORFOLOGIA,
      COMENTARIO_SCOUTTER: relatorio.COMENTARIO,
      COMENTARIO_ADM: relatorio.COMENTARIO_ADM || "",
      NOTA_ADM: notaADM,
      STATUS: relatorio.STATUS,
      NOME_EQUIPA: nomeEquipa,
      ABREVIATURA_CLUBE: abreviaturaClube,
      MOSTRAR_BOTOES: relatorio.STATUS === "Avaliado"
    });

  } catch (error) {
    console.error("Erro ao buscar dados do relatório:", error);
    res.status(500).json({ error: "Erro ao buscar os dados do relatório." });
  }
};

//Updadte atraves da ficha tecnicas de relatorios
relationship11Controller.updateRelatorioADM = async (req, res) => {
  try {
    const { ID_RELATORIO, NOTA_ADM, COMENTARIO_ADM } = req.body;

    if (!ID_RELATORIO) {
      return res.status(400).json({ error: "ID do relatório não fornecido." });
    }

    // Atualizar o relatório com o novo STATUS e COMENTARIO_ADM
    const relatorioAtualizado = await Relatorio.findOneAndUpdate(
      { ID_RELATORIO },
      { STATUS: "Avaliado_ADM", COMENTARIO_ADM },
      { new: true }
    );

    if (!relatorioAtualizado) {
      return res.status(404).json({ message: "Relatório não encontrado." });
    }

    // Atualizar a NOTA_ADM do jogador
    const jogadorAtualizado = await Jogadores.findOneAndUpdate(
      { ID_JOGADORES: relatorioAtualizado.ID_JOGADORES },
      { NOTA_ADM },
      { new: true }
    );

    if (!jogadorAtualizado) {
      return res.status(404).json({ message: "Jogador não encontrado." });
    }

    res.status(200).json({
      message: "Relatório e jogador atualizados com sucesso!",
      relatorio: relatorioAtualizado,
      jogador: jogadorAtualizado
    });

  } catch (error) {
    console.error("Erro ao atualizar relatório:", error);
    res.status(500).json({ error: "Erro ao atualizar os dados." });
  }
};

//PAGINA DE JOGADORES
//Busca os players com os jogadores inativos 
relationship11Controller.cardsPlayersPendents = async (req, res) => {
  try {
    const jogadoresInativos = await Jogadores.find({ STATUS: "Inactive" });

    const jogadoresComEquipa = await Promise.all(
      jogadoresInativos.map(async (jogador) => {
        // Buscar relação com equipe
        const relacao = await Relationship11.findOne({ ID_JOGADORES: jogador.ID_JOGADORES });

        let nomeEquipa = "Sem Equipa";
        let abreviaturaClube = "--";

        if (relacao) {
          const equipa = await Equipa.findOne({ ID_EQUIPA: relacao.ID_EQUIPA });
          if (equipa) {
            nomeEquipa = equipa.NOME;
            const clube = await Clube.findOne({ ID_CLUBE: equipa.ID_CLUBE });
            if (clube) abreviaturaClube = clube.ABREVIATURA;
          }
        }

        return {
          ID_JOGADORES: jogador.ID_JOGADORES,
          NOME: jogador.NOME,
          IDADE: new Date().getFullYear() - new Date(jogador.DATA_NASC).getFullYear(),
          ANO_NASCIMENTO: new Date(jogador.DATA_NASC).getFullYear(),
          NACIONALIDADE: jogador.NACIONALIDADE,
          NOME_EQUIPA: nomeEquipa,
          ABREVIATURA_CLUBE: abreviaturaClube,
        };
      })
    );

    res.json(jogadoresComEquipa);
  } catch (error) {
    console.error("Erro ao buscar jogadores inativos:", error);
    res.status(500).json({ error: "Erro ao buscar jogadores inativos" });
  }
};

//Lista de Jogadores com algumas informaçoes extras como clube/equipa/n de relatorios
relationship11Controller.listAllPlayersMerged = async (req, res) => {
  try {
    // Buscar todos os jogadores na base de dados
    const jogadores = await Jogadores.find();

    if (!jogadores || jogadores.length === 0) {
      return res.status(404).json({ message: "Nenhum jogador encontrado." });
    }

    // Para cada jogador, buscar sua equipe, clube e contagem de relatórios
    const jogadoresDetalhados = await Promise.all(
      jogadores.map(async (jogador) => {
        // Buscar relação com equipe
        const relationship = await Relationship11.findOne({ ID_JOGADORES: jogador.ID_JOGADORES });

        let nomeEquipa = "Sem Equipa";
        let abreviaturaClube = "--";

        if (relationship) {
          const equipa = await Equipa.findOne({ ID_EQUIPA: relationship.ID_EQUIPA });
          if (equipa) {
            nomeEquipa = equipa.NOME;
            const clube = await Clube.findOne({ ID_CLUBE: equipa.ID_CLUBE });
            if (clube) {
              abreviaturaClube = clube.ABREVIATURA;
            }
          }
        }

        // Contar o número de relatórios desse jogador
        const totalRelatorios = await Relatorio.countDocuments({ ID_JOGADORES: jogador.ID_JOGADORES });

        return {
          ID_JOGADORES: jogador.ID_JOGADORES,
          NOME: jogador.NOME,
          DATA_NASC: jogador.DATA_NASC,
          IDADE: new Date().getFullYear() - new Date(jogador.DATA_NASC).getFullYear(),
          ANO_NASCIMENTO: new Date(jogador.DATA_NASC).getFullYear(),
          GENERO: jogador.GENERO,
          LINK: jogador.LINK,
          NACIONALIDADE: jogador.NACIONALIDADE,
          DADOS_ENC: jogador.DADOS_ENC,
          NOTA_ADM: jogador.NOTA_ADM || "Sem nota",
          STATUS: jogador.STATUS,
          NOME_EQUIPA: nomeEquipa,
          ABREVIATURA_CLUBE: abreviaturaClube,
          TOTAL_RELATORIOS: totalRelatorios, // Número de relatórios do jogador
        };
      })
    );

    res.status(200).json(jogadoresDetalhados);
  } catch (error) {
    console.error("Erro ao buscar jogadores:", error);
    res.status(500).json({ error: "Erro ao buscar jogadores." });
  }
};

relationship11Controller.deletePlayers = async (req, res) => {
  try {
    const { playersIds } = req.body;

    if (!playersIds || playersIds.length === 0) {
      return res.status(400).json({ error: "Nenhum jogador selecionado para exclusão." });
    }

    console.log("🔴 Jogadores a serem excluídos:", playersIds);

    // Deletar relatórios vinculados aos jogadores
    await Relatorio.deleteMany({ ID_JOGADORES: { $in: playersIds } });
    console.log("🗑 Relatórios vinculados removidos.");

    // Deletar relações de equipe (corrigido para Relationship11)
    await Relationship11.deleteMany({ ID_JOGADORES: { $in: playersIds } });
    console.log("🗑 Relações de equipe removidas.");

    // Deletar os jogadores
    const deletedPlayers = await Jogadores.deleteMany({ ID_JOGADORES: { $in: playersIds } });

    if (deletedPlayers.deletedCount === 0) {
      return res.status(404).json({ error: "Nenhum jogador encontrado para exclusão." });
    }

    console.log("✅ Jogadores removidos:", deletedPlayers.deletedCount);
    res.json({ success: true, message: "Jogadores excluídos com sucesso." });
  } catch (error) {
    console.error("❌ Erro ao excluir jogadores:", error);
    res.status(500).json({ error: "Erro ao excluir jogadores." });
  }
};

relationship11Controller.getPlayerFicha = async (req, res) => {
  try {
    const { ID_JOGADORES } = req.params;

    if (!ID_JOGADORES) {
      return res.status(400).json({ error: "ID do jogador não fornecido." });
    }

    // Buscar jogador pelo ID
    const jogador = await Jogadores.findOne({ ID_JOGADORES });

    if (!jogador) {
      return res.status(404).json({ message: "Jogador não encontrado." });
    }

    // Formatar a data de nascimento para dd/mm/yyyy
    const dataNascimentoFormatada = new Date(jogador.DATA_NASC).toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    // Calcular idade e ano de nascimento
    const anoNascimento = new Date(jogador.DATA_NASC).getFullYear();
    const idade = new Date().getFullYear() - anoNascimento;

    // Buscar relação com equipe e clube
    const relationship = await Relationship11.findOne({ ID_JOGADORES });
    let nomeEquipa = "Sem Equipa";
    let abreviaturaClube = "--";

    if (relationship) {
      const equipa = await Equipa.findOne({ ID_EQUIPA: relationship.ID_EQUIPA });
      if (equipa) {
        nomeEquipa = equipa.NOME;
        const clube = await Clube.findOne({ ID_CLUBE: equipa.ID_CLUBE });
        if (clube) {
          abreviaturaClube = clube.ABREVIATURA;
        }
      }
    }

    // Contar o número de relatórios do jogador
    const totalRelatorios = await Relatorio.countDocuments({ ID_JOGADORES });

    // Retornar os dados formatados
    res.status(200).json({
      ID_JOGADORES: jogador.ID_JOGADORES,
      NOME: jogador.NOME,
      DATA_NASC: dataNascimentoFormatada, // Agora no formato dd/mm/yyyy
      IDADE: idade,
      ANO_NASCIMENTO: anoNascimento,
      GENERO: jogador.GENERO,
      LINK: jogador.LINK,
      NACIONALIDADE: jogador.NACIONALIDADE,
      DADOS_ENC: jogador.DADOS_ENC,
      NOTA_ADM: jogador.NOTA_ADM || "Sem nota",
      STATUS: jogador.STATUS,
      NOME_EQUIPA: nomeEquipa,
      ABREVIATURA_CLUBE: abreviaturaClube,
      TOTAL_RELATORIOS: totalRelatorios, // Número de relatórios do jogador
    });
  } catch (error) {
    console.error("Erro ao buscar dados do jogador:", error);
    res.status(500).json({ error: "Erro ao buscar dados do jogador." });
  }
};



module.exports = relationship11Controller;
