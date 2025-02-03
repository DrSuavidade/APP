const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserController');
const clubeController = require('../Controllers/ClubeController');
const equipaController = require('../Controllers/EquipaController');
const eventosController = require('../Controllers/EventosController');
const jogadoresController = require('../Controllers/JogadoresController');
const posicaoController = require('../Controllers/PosicaoController');
const relatoriosController = require('../Controllers/RelatoriosController');
const favoritosController = require('../Controllers/FavoritosController');
const tipoUtilizadorController = require('../Controllers/TipoUtilizadorController');
const equipaSombraController = require('../Controllers/EquipaSombraController');
const relacaoSombraController = require('../Controllers/RelacaoSombraController');
const relationship11Controller = require('../Controllers/Relationship_11Controller');
const relationship12Controller = require('../Controllers/Relationship_12Controller');
const autenticarJWT = require('../Middleware/authMiddleware');
const multer = require("multer");

const upload = multer(); // Configura o multer para processar multipart/form-data

// User Routes
router.post('/users/signup', userController.registar); // Use 'registar' instead of 'signup'
router.post('/users/registoweb', userController.registoweb);
router.post('/users/login', userController.login);
router.post('/users/recuperar_senha', userController.recuperarSenha);
router.get('/users/list/:ID_USER', userController.getUserById);
router.get('/users/lastTen', userController.lastTenUsers);
router.put('/users/edit/:ID_USER', userController.editUser); // Update user
router.delete('/users/delete/:ID_USER', userController.deleteUser); // Delete user
router.delete('/users/delete-multiple', userController.deleteMultipleUsers);
router.get('/users/tipo/3', userController.getUserByTipo);

// Clube Routes
router.post('/clube/add', clubeController.addClube); // Add club
router.get('/clube/list', clubeController.listClube); // List clubs
router.put('/clube/edit/:ID_CLUBE', clubeController.editClube); // Edit club
router.delete('/clube/delete/:ID_CLUBE', clubeController.deleteClube); // Delete club
router.get("/clubes/com-equipas", clubeController.listClubesWithTeams); // list club with team
router.delete("/clubes/delete-multiple", clubeController.deleteSelectedClubes); // Delete a todos os selecionados
router.get("/clube/:ID_CLUBE", clubeController.getClubeById);

// Equipa Routes
router.post('/equipa/add', equipaController.addEquipa); // Add team
router.get('/equipa/list', equipaController.listEquipa); // List teams
router.put('/equipa/edit/:ID_EQUIPA', equipaController.editEquipa); // Edit team
router.delete('/equipa/delete/:ID_EQUIPA', equipaController.deleteEquipa); // Delete team
router.get("/equipas/:ID_CLUBE", equipaController.listTeamsByClub); // Listar equipa by club


// Eventos Routes
router.post('/evento/add', /*autenticarJWT,*/ eventosController.addEvento);
router.post('/evento/addweb', eventosController.addEventoWeb);
router.get('/evento/list', eventosController.listEvento);
router.get('/evento/list/:ID_USER', eventosController.getGamesByUser);
router.get('/eventos/user/:ID_USER', eventosController.getFilteredGamesByUser);
router.put('/evento/edit/:ID_EVENTOS', eventosController.editEvento);
router.delete('/evento/delete/:ID_EVENTOS', eventosController.deleteEvento);
router.get('/eventos/recentes', eventosController.listEventosRecentes);




// Jogadores Routes
router.post('/jogador/add', jogadoresController.addJogador);
router.post("/jogador/addPlayerPage", upload.none(), jogadoresController.addPlayerPage);
router.get('/jogador/list', jogadoresController.listJogador);
router.get("/jogador/lastTen", jogadoresController.getLastTenPlayers);
router.get('/jogador/:ID_JOGADORES', jogadoresController.getJogadorById);
router.get('/jogador/list/:ID_USER', jogadoresController.getPlayersByUser);
router.get('/jogador/evento/:ID_EVENTOS', jogadoresController.listJogadoresByEvento);
router.put('/jogador/edit/:ID_JOGADORES', jogadoresController.editJogador);
router.delete('/jogador/delete/:ID_JOGADORES', jogadoresController.deleteJogador);
router.get('/jogador/equipa/:idEquipa', jogadoresController.listJogadoresByEquipa);
router.get('/jogador/ano/:year', jogadoresController.listJogadoresByAge);
router.get('/jogador/details/:ID_JOGADORES', jogadoresController.getJogadorDetails);



// Posicao Routes
router.post('/posicao/add', posicaoController.addPosicao);
router.get('/posicao/list', posicaoController.listPosicao);
router.put('/posicao/edit/:ID_POSICAO', posicaoController.editPosicao);
router.delete('/posicao/delete/:ID_POSICAO', posicaoController.deletePosicao);

// Relatorios Routes
router.post('/relatorio/add', relatoriosController.addRelatorio);
router.get('/relatorio/list', relatoriosController.listRelatorio);
router.get('/relatorio/avaliados', relatoriosController.listRelatoriosAvaliadosComJogadores);
router.get('/relatorio/get/:ID_JOGADORES/:ID_USER', relatoriosController.getRelatorioByPlayerAndUser);
router.get('/relatorio/historico/:ID_USER', relatoriosController.listHistoricoRelatorios);
router.put('/relatorio/edit/:ID_RELATORIO', relatoriosController.editRelatorio);
router.delete('/relatorio/delete/:ID_RELATORIO', relatoriosController.deleteRelatorio);

// Favoritos Routes
router.post('/favorito/add', favoritosController.addFavorito);
router.get('/favorito/list', favoritosController.listFavoritos);
router.put('/favorito/edit/:ID_CLUBE/:ID_USER', favoritosController.editFavorito);
router.delete('/favorito/delete/:ID_CLUBE/:ID_USER', favoritosController.deleteFavorito);
router.get('/favorito/list/:ID_USER', favoritosController.listFavoritosByUser);

// TipoUtilizador Routes
router.post('/tipo/add', tipoUtilizadorController.addTipoUtilizador);
router.get('/tipo/list', tipoUtilizadorController.listTipoUtilizador);
router.get("/tipo/listTP", tipoUtilizadorController.listTPbyName);
router.put('/tipo/edit/:ID_TIPO', tipoUtilizadorController.editTipoUtilizador);
router.delete('/tipo/delete/:ID_TIPO', tipoUtilizadorController.deleteTipoUtilizador);

// EquipaSombra Routes
router.post('/sombra/add', equipaSombraController.addEquipaSombra);
router.get('/sombra/list', equipaSombraController.listEquipaSombra);
router.get('/sombra/listByUser', equipaSombraController.listEquipaSombraByUser);
router.put('/sombra/edit/:ID_SOMBRA', equipaSombraController.editEquipaSombra);
router.delete('/sombra/delete/:ID_SOMBRA', equipaSombraController.deleteEquipaSombra);

// RelacaoSombra Routes
router.post('/resombra/add', relacaoSombraController.addRelacaoSombra);
router.get('/resombra/list', relacaoSombraController.listRelacaoSombra);
router.get('/resombra/posicao/list', relacaoSombraController.listPlayersByPosition);
router.put('/resombra/edit/:ID_RELACAO', relacaoSombraController.editRelacaoSombra);
router.delete('/resombra/delete/:ID_RELACAO', relacaoSombraController.deleteRelacaoSombra);
router.delete('/resombra/remove', relacaoSombraController.removeRelacaoSombra);

// Relationship_11 Routes
router.post('/r11/add', relationship11Controller.addRelationship11);
router.get('/r11/list', relationship11Controller.listRelationship11);
router.get('/relationship11/team-club/:ID_JOGADORES', relationship11Controller.getPlayerTeamAndClub);
router.get('/player-cards', relationship11Controller.playerCards);
router.get('/relatorios-merged', relationship11Controller.listRelatoriosMergedData);
router.put('/r11/edit/:ID_EQUIPA/:ID_JOGADORES', relationship11Controller.editRelationship11);
router.get("/relatorio/ficha/:ID_RELATORIO", relationship11Controller.fichaReports);
router.delete('/relatorios/delete', relationship11Controller.deleteSelectedRelatorios);
router.put("/relatorio/update", relationship11Controller.updateRelatorioADM);
//router.delete('/r11/delete/:ID_EQUIPA/:ID_JOGADORES', relationship11Controller.deleteRelationship11);
// Relationship_11 Routes / PLAYERS PAGE
router.get("/player-pendents", relationship11Controller.cardsPlayersPendents);
router.delete("/players/delete", relationship11Controller.deletePlayers);
router.get("/all-players", relationship11Controller.listAllPlayersMerged);
router.get("/player/:ID_JOGADORES", relationship11Controller.getPlayerFicha);
router.put("/player/activate/:ID_JOGADORES", relationship11Controller.activatePlayer);
router.delete("/player/reject/:ID_JOGADORES", relationship11Controller.rejectPlayer);
// Relationship_11 Routes / HISTORY PAGE
router.get("/player/history/:ID_JOGADORES", relationship11Controller.listPendingReportsByPlayer);
router.get("/player/reports/:ID_JOGADORES", relationship11Controller.listPlayerReports);
// Relationship_11 Routes / HOME PAGE
router.get("/users", relationship11Controller.listAllUsersWithPermissions);
router.delete("/relationship11/:ID_JOGADORES", relationship11Controller.deleteRelationship11);
router.post("/jogador/adicionar", relationship11Controller.addRelationship11);



// Relationship_12 Routes
router.post('/r12/add', relationship12Controller.addRelationship12);
router.get('/r12/list', relationship12Controller.listRelationship12);
router.put('/r12/edit/:ID_JOGADORES/:ID_EVENTOS', relationship12Controller.editRelationship12);
router.delete('/r12/delete/:ID_JOGADORES/:ID_EVENTOS', relationship12Controller.deleteRelationship12);


module.exports = router;
