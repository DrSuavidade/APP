import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  final String baseUrl;

  ApiService({required this.baseUrl});

  // Generic GET request
  Future<dynamic> get(String endpoint) async {
    final response = await http.get(Uri.parse('$baseUrl/$endpoint'));
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to fetch data: ${response.body}');
    }
  }

  // Generic POST request
  Future<dynamic> post(String endpoint, Map<String, dynamic> data) async {
    final response = await http.post(
      Uri.parse('$baseUrl/$endpoint'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(data),
    );
    if (response.statusCode == 200 || response.statusCode == 201) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to send data: ${response.body}');
    }
  }

  // Generic PUT request
  Future<dynamic> put(String endpoint, Map<String, dynamic> data) async {
    final response = await http.put(
      Uri.parse('$baseUrl/$endpoint'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(data),
    );
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to update data: ${response.body}');
    }
  }

  // Generic DELETE request
  Future<void> delete(String endpoint) async {
    final response = await http.delete(Uri.parse('$baseUrl/$endpoint'));
    if (response.statusCode != 200) {
      throw Exception('Failed to delete data: ${response.body}');
    }
  }

  // UserController Endpoints
  Future<dynamic> registerUser(Map<String, dynamic> data) =>
      post('users/signup', data);
  Future<dynamic> loginUser(Map<String, dynamic> data) =>
      post('users/login', data);
  Future<dynamic> editUser(String id, Map<String, dynamic> data) =>
      put('users/edit/$id', data);
  Future<void> deleteUser(String id) => delete('users/delete/$id');

  // ClubeController Endpoints
  Future<dynamic> addClube(Map<String, dynamic> data) =>
      post('clube/add', data);
  Future<dynamic> listClubes() => get('clube/list');
  Future<dynamic> editClube(String id, Map<String, dynamic> data) =>
      put('clube/edit/$id', data);
  Future<void> deleteClube(String id) => delete('clube/delete/$id');

  // EquipaController Endpoints
  Future<dynamic> addEquipa(Map<String, dynamic> data) =>
      post('equipa/add', data);
  Future<dynamic> listEquipas() => get('equipa/list');
  Future<dynamic> editEquipa(String id, Map<String, dynamic> data) =>
      put('equipa/edit/$id', data);
  Future<void> deleteEquipa(String id) => delete('equipa/delete/$id');

  // EventosController Endpoints
  Future<dynamic> addEvento(Map<String, dynamic> data) =>
      post('evento/add', data);
  Future<dynamic> listEventos() => get('evento/list');
  // Fetch events by user ID
Future<dynamic> listEventosByUser(int userId) async {
  return await get('evento/list/$userId');
}
Future<List<dynamic>> getFilteredEventosByEscalao(int userId, String escalao) async {
    final response = await http.get(
      Uri.parse('$baseUrl/eventos/user/$userId?ESCALAO=$escalao'),
      headers: {'Content-Type': 'application/json'},
    );
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else {
      throw Exception('Failed to fetch filtered eventos');
    }
  }


  Future<dynamic> editEvento(String id, Map<String, dynamic> data) =>
      put('evento/edit/$id', data);
  Future<void> deleteEvento(String id) => delete('evento/delete/$id');

  // FavoritosController Endpoints
  Future<dynamic> addFavorito(Map<String, dynamic> data) =>
      post('favorito/add', data);
  Future<dynamic> listFavoritos() => get('favorito/list');
  Future<dynamic> editFavorito(String id, Map<String, dynamic> data) =>
      put('favorito/edit/$id', data);
  Future<void> deleteFavorito(String id) => delete('favorito/delete/$id');

  // JogadoresController Endpoints
  Future<dynamic> addJogador(Map<String, dynamic> data) =>
      post('jogador/add', data);
  Future<dynamic> listJogadores() => get('jogador/list');
  // Fetch player by ID_JOGADORES
Future<dynamic> getJogadorById(int jogadorId) async {
  return await get('jogador/$jogadorId');
}
  Future<dynamic> listJogadoresByUser(int userId) =>
    get('jogador/list/$userId');
  Future<dynamic> editJogador(String id, Map<String, dynamic> data) =>
      put('jogador/edit/$id', data);
  Future<void> deleteJogador(String id) => delete('jogador/delete/$id');

  // PosicaoController Endpoints
  Future<dynamic> addPosicao(Map<String, dynamic> data) =>
      post('posicao/add', data);
  Future<dynamic> listPosicoes() => get('posicao/list');
  Future<dynamic> editPosicao(String id, Map<String, dynamic> data) =>
      put('posicao/edit/$id', data);
  Future<void> deletePosicao(String id) => delete('posicao/delete/$id');

  // RelatoriosController Endpoints
  Future<dynamic> addRelatorio(Map<String, dynamic> data) =>
      post('relatorio/add', data);
  Future<dynamic> listRelatorios() => get('relatorio/list');
  Future<dynamic> listRelatoriosHistorico() async {
  return await get('relatorio/historico');
}
  Future<dynamic> editRelatorio(String id, Map<String, dynamic> data) =>
      put('relatorio/edit/$id', data);
  Future<void> deleteRelatorio(String id) => delete('relatorio/delete/$id');

  // TipoUtilizadorController Endpoints
  Future<dynamic> addTipoUtilizador(Map<String, dynamic> data) =>
      post('tipo/add', data);
  Future<dynamic> listTipoUtilizadores() => get('tipo/list');
  Future<dynamic> editTipoUtilizador(String id, Map<String, dynamic> data) =>
      put('tipo/edit/$id', data);
  Future<void> deleteTipoUtilizador(String id) => delete('tipo/delete/$id');
}
