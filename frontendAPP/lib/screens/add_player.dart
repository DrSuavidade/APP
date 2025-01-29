import 'package:flutter/material.dart';
import '../api/api_service.dart';

class AddPlayerScreen extends StatefulWidget {
  final int userId;
  final int idEvento;

  const AddPlayerScreen(
      {Key? key, required this.userId, required this.idEvento})
      : super(key: key);

  @override
  _AddPlayerScreenState createState() => _AddPlayerScreenState();
}

class _AddPlayerScreenState extends State<AddPlayerScreen> {
  final ApiService api = ApiService(baseUrl: 'http://localhost:3000/api');
  List<dynamic> jogadores = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchJogadores();
  }

  Future<void> _fetchJogadores() async {
    try {
      setState(() => isLoading = true);
      final response = await api.listJogadoresByEvento(widget.idEvento);
      setState(() {
        jogadores = response;
        isLoading = false;
      });
    } catch (e) {
      setState(() => isLoading = false);
    }
  }

  Future<void> _createRelatorio(int idJogador) async {
    try {
      await api.addRelatorio({
        "TECNICA": 0,
        "VELOCIDADE": 0,
        "COMPETITIVA": 0,
        "INTELIGENCIA": 0,
        "ALTURA": "null",
        "MORFOLOGIA": "null",
        "COMENTARIO": "null",
        "STATUS": "Ativo",
        "ID_USER": widget.userId,
        "ID_JOGADORES": idJogador,
        "ID_EVENTOS": widget.idEvento,
        "COMENTARIO_ADM": "null",
        "DATA": DateTime.now().toIso8601String(),
        "NOTA": 0,
      });

      _showSuccessDialog();
    } catch (e) {
      if (e.toString().contains('Não pode ter vários relatórios')) {
        _showErrorDialog('Erro',
            'Não pode ter vários relatórios para o mesmo jogador no mesmo evento.');
      } else {
        _showErrorDialog('Erro', 'Não foi possível criar o relatório.');
      }
    }
  }

  void _showSuccessDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Sucesso'),
        content: Text('Relatório criado com sucesso!'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pushNamedAndRemoveUntil(
                context, '/home', (route) => false,
                arguments: {'userId': widget.userId}),
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }

  void _showErrorDialog(String title, String message) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(title),
        content: Text(message),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Adicionar Jogadores'),
        backgroundColor: Colors.black,
      ),
      body: Column(
        children: [
          Expanded(
            child: isLoading
                ? const Center(
                    child: CircularProgressIndicator(),
                  )
                : jogadores.isEmpty
                    ? const Center(
                        child: Text(
                          'Nenhum jogador disponível',
                          style: TextStyle(color: Colors.white),
                        ),
                      )
                    : ListView.builder(
                        itemCount: jogadores.length,
                        itemBuilder: (context, index) {
                          final jogador = jogadores[index];
                          return ListTile(
                            title: Text(
                              jogador['NOME'] ?? 'Sem nome',
                              style: const TextStyle(color: Colors.white),
                            ),
                            trailing:
                                const Icon(Icons.add, color: Colors.white),
                            onTap: () =>
                                _createRelatorio(jogador['ID_JOGADORES']),
                          );
                        },
                      ),
          ),
          // Add the button at the bottom
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: ElevatedButton(
                onPressed: () {
                  Navigator.pushNamed(
                    context,
                    '/add_player_bd',
                    arguments: {
                      'userId': widget.userId,
                      'idEvento': widget.idEvento,
                    },
                  );
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.green,
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
                child: const Text(
                  'Adicionar Jogadores ao Banco de Dados',
                  style: TextStyle(color: Colors.white),
                ),
              ),
            ),
          ),
        ],
      ),
      backgroundColor: Colors.black,
    );
  }
}
