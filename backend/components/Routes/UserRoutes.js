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

// User Routes
router.post('/users/signup', userController.registar); // Use 'registar' instead of 'signup'
router.post('/users/login', userController.login);
router.put('/users/edit/:ID_USER', userController.editUser); // Update user
router.delete('/users/delete/:ID_USER', userController.deleteUser); // Delete user

// Clube Routes
router.post('/clube/add', clubeController.addClube); // Add club
router.get('/clube/list', clubeController.listClube); // List clubs
router.put('/clube/edit/:ID_CLUBE', clubeController.editClube); // Edit club
router.delete('/clube/delete/:ID_CLUBE', clubeController.deleteClube); // Delete club

// Equipa Routes
router.post('/equipa/add', equipaController.addEquipa); // Add team
router.get('/equipa/list', equipaController.listEquipa); // List teams
router.put('/equipa/edit/:ID_EQUIPA', equipaController.editEquipa); // Edit team
router.delete('/equipa/delete/:ID_EQUIPA', equipaController.deleteEquipa); // Delete team

// Eventos Routes
router.post('/evento/add', autenticarJWT, eventosController.addEvento);
router.get('/evento/list', eventosController.listEvento);
router.get('/evento/list/:ID_USER', eventosController.getGamesByUser);
router.put('/evento/edit/:ID_EVENTOS', eventosController.editEvento);
router.delete('/evento/delete/:ID_EVENTOS', eventosController.deleteEvento);

// Jogadores Routes
router.post('/jogador/add', jogadoresController.addJogador);
router.get('/jogador/list', jogadoresController.listJogador);
router.get('/jogador/list/:ID_USER', jogadoresController.getPlayersByUser);
router.put('/jogador/edit/:ID_JOGADORES', jogadoresController.editJogador);
router.delete('/jogador/delete/:ID_JOGADORES', jogadoresController.deleteJogador);

// Posicao Routes
router.post('/posicao/add', posicaoController.addPosicao);
router.get('/posicao/list', posicaoController.listPosicao);
router.put('/posicao/edit/:ID_POSICAO', posicaoController.editPosicao);
router.delete('/posicao/delete/:ID_POSICAO', posicaoController.deletePosicao);

// Relatorios Routes
router.post('/relatorio/add', relatoriosController.addRelatorio);
router.get('/relatorio/list', relatoriosController.listRelatorio);
router.get('/relatorio/get', relatoriosController.getRelatorioByPlayerAndUser);
router.put('/relatorio/edit/app/:ID_RELATORIO', relatoriosController.editAppRelatorio);
router.put('/relatorio/edit/:ID_RELATORIO', relatoriosController.editRelatorio);
router.delete('/relatorio/delete/:ID_RELATORIO', relatoriosController.deleteRelatorio);

// Favoritos Routes
router.post('/favorito/add', favoritosController.addFavorito);
router.get('/favorito/list', favoritosController.listFavoritos);
router.put('/favorito/edit/:ID_CLUBE/:ID_USER', favoritosController.editFavorito);
router.delete('/favorito/delete/:ID_CLUBE/:ID_USER', favoritosController.deleteFavorito);

// TipoUtilizador Routes
router.post('/tipo/add', tipoUtilizadorController.addTipoUtilizador);
router.get('/tipo/list', tipoUtilizadorController.listTipoUtilizador);
router.put('/tipo/edit/:ID_TIPO', tipoUtilizadorController.editTipoUtilizador);
router.delete('/tipo/delete/:ID_TIPO', tipoUtilizadorController.deleteTipoUtilizador);

// EquipaSombra Routes
router.post('/sombra/add', equipaSombraController.addEquipaSombra);
router.get('/sombra/list', equipaSombraController.listEquipaSombra);
router.put('/sombra/edit/:ID_SOMBRA', equipaSombraController.editEquipaSombra);
router.delete('/sombra/delete/:ID_SOMBRA', equipaSombraController.deleteEquipaSombra);

// RelacaoSombra Routes
router.post('/resombra/add', relacaoSombraController.addRelacaoSombra);
router.get('/resombra/list', relacaoSombraController.listRelacaoSombra);
router.put('/resombra/edit/:ID_RELACAO', relacaoSombraController.editRelacaoSombra);
router.delete('/resombra/delete/:ID_RELACAO', relacaoSombraController.deleteRelacaoSombra);

// Relationship_11 Routes
router.post('/r11/add', relationship11Controller.addRelationship11);
router.get('/r11/list', relationship11Controller.listRelationship11);
router.put('/r11/edit/:ID_EQUIPA/:ID_JOGADORES', relationship11Controller.editRelationship11);
router.delete('/r11/delete/:ID_EQUIPA/:ID_JOGADORES', relationship11Controller.deleteRelationship11);

// Relationship_12 Routes
router.post('/r12/add', relationship12Controller.addRelationship12);
router.get('/r12/list', relationship12Controller.listRelationship12);
router.put('/r12/edit/:ID_JOGADORES/:ID_EVENTOS', relationship12Controller.editRelationship12);
router.delete('/r12/delete/:ID_JOGADORES/:ID_EVENTOS', relationship12Controller.deleteRelationship12);


module.exports = router;
