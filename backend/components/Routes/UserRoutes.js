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

// User Routes
router.post('/users/signup', userController.registar); // Use 'registar' instead of 'signup'
router.post('/users/login', userController.login);
router.put('/users/edit/:id_user', userController.editUser); // Update user
router.delete('/users/delete/:id_user', userController.deleteUser); // Delete user

// Clube Routes
router.post('/clube/add', clubeController.addClube); // Add club
router.get('/clube/list', clubeController.listClube); // List clubs
router.put('/clube/edit/:id_clube', clubeController.editClube); // Edit club
router.delete('/clube/delete/:id_clube', clubeController.deleteClube); // Delete club

// Equipa Routes
router.post('/equipa/add', equipaController.addEquipa); // Add team
router.get('/equipa/list', equipaController.listEquipa); // List teams
router.put('/equipa/edit/:id_equipa', equipaController.editEquipa); // Edit team
router.delete('/equipa/delete/:id_equipa', equipaController.deleteEquipa); // Delete team

// Eventos Routes
router.post('/evento/add', eventosController.addEvento);
router.get('/evento/list', eventosController.listEvento);
router.get('/evento/list/:id_user', eventosController.getGamesByUser);
router.put('/evento/edit/:id_eventos', eventosController.editEvento);
router.delete('/evento/delete/:id_eventos', eventosController.deleteEvento);

// Jogadores Routes
router.post('/jogador/add', jogadoresController.addJogador);
router.get('/jogador/list', jogadoresController.listJogador);
router.get('/jogador/list/:id_user', jogadoresController.getPlayersByUser);
router.put('/jogador/edit/:id_jogadores', jogadoresController.editJogador);
router.delete('/jogador/delete/:id_jogadores', jogadoresController.deleteJogador);

// Posicao Routes
router.post('/posicao/add', posicaoController.addPosicao);
router.get('/posicao/list', posicaoController.listPosicao);
router.put('/posicao/edit/:id_posicao', posicaoController.editPosicao);
router.delete('/posicao/delete/:id_posicao', posicaoController.deletePosicao);

// Relatorios Routes
router.post('/relatorio/add', relatoriosController.addRelatorio);
router.get('/relatorio/list', relatoriosController.listRelatorio);
router.get('/relatorio/get', relatoriosController.getRelatorioByPlayerAndUser);
router.put('/relatorio/edit/app/:id_relatorios', relatoriosController.editAppRelatorio);
router.put('/relatorio/edit/:id_relatorios', relatoriosController.editRelatorio);
router.delete('/relatorio/delete/:id_relatorios', relatoriosController.deleteRelatorio);

// Favoritos Routes
router.post('/favorito/add', favoritosController.addFavorito);
router.get('/favorito/list', favoritosController.listFavoritos);
router.put('/favorito/edit/:id_favoritos', favoritosController.editFavorito);
router.delete('/favorito/delete/:id_favoritos', favoritosController.deleteFavorito);

// TipoUtilizador Routes
router.post('/tipo/add', tipoUtilizadorController.addTipoUtilizador);
router.get('/tipo/list', tipoUtilizadorController.listTipoUtilizador);
router.put('/tipo/edit/:id_tipo', tipoUtilizadorController.editTipoUtilizador);
router.delete('/tipo/delete/:id_tipo', tipoUtilizadorController.deleteTipoUtilizador);

// EquipaSombra Routes
router.post('/sombra/add', equipaSombraController.addEquipaSombra);
router.get('/sombra/list', equipaSombraController.listEquipaSombra);
router.put('/sombra/edit/:id_tipo', equipaSombraController.editEquipaSombra);
router.delete('/sombra/delete/:id_tipo', equipaSombraController.deleteEquipaSombra);

// RelacaoSombra Routes
router.post('/resombra/add', relacaoSombraController.addRelacaoSombra);
router.get('/resombra/list', relacaoSombraController.listRelacaoSombra);
router.put('/resombra/edit/:id_tipo', relacaoSombraController.editRelacaoSombra);
router.delete('/resombra/delete/:id_tipo', relacaoSombraController.deleteRelacaoSombra);

// Relationship_11 Routes
router.post('/r11/add', relationship11Controller.addRelationship11);
router.get('/r11/list', relationship11Controller.listRelationship11);
router.put('/r11/edit/:id_tipo', relationship11Controller.editRelationship11);
router.delete('/r11/delete/:id_tipo', relationship11Controller.deleteRelationship11);

// Relationship_12 Routes
router.post('/r12/add', relationship12Controller.addRelationship12);
router.get('/r12/list', relationship12Controller.listRelationship12);
router.put('/r12/edit/:id_tipo', relationship12Controller.editRelationship12);
router.delete('/r12/delete/:id_tipo', relationship12Controller.deleteRelationship12);


module.exports = router;
