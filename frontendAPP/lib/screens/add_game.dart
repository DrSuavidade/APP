import 'package:flutter/material.dart';
import '../api/api_service.dart';

class AddGameScreen extends StatefulWidget {
  final int userId;

  const AddGameScreen({Key? key, required this.userId}) : super(key: key);

  @override
  _AddGameScreenState createState() => _AddGameScreenState();
}

class _AddGameScreenState extends State<AddGameScreen> {
  final ApiService api = ApiService(baseUrl: 'http://localhost:3000/api');
  List<dynamic> eventos = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchEventos();
  }

  Future<void> _fetchEventos() async {
    try {
      setState(() => isLoading = true);
      final response = await api.listEventos();
      setState(() {
        eventos = response;
        isLoading = false;
      });
    } catch (e) {
      setState(() => isLoading = false);
      _showErrorDialog('Erro', 'Não foi possível carregar os eventos.');
    }
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

  void _navigateToAddPlayer(int idEvento) {
    Navigator.pushNamed(
      context,
      '/add_player',
      arguments: {
        'userId': widget.userId,
        'idEvento': idEvento,
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Selecionar Jogo'),
        backgroundColor: Colors.black,
      ),
      backgroundColor: Colors.black,
      body: isLoading
          ? Center(child: CircularProgressIndicator(color: Colors.white))
          : eventos.isEmpty
              ? Center(
                  child: Text(
                    'Nenhum jogo disponível.',
                    style: TextStyle(color: Colors.white, fontSize: 16),
                  ),
                )
              : ListView.builder(
                  itemCount: eventos.length,
                  itemBuilder: (context, index) {
                    final evento = eventos[index];
                    return Card(
                      color: Colors.grey[800],
                      margin: EdgeInsets.symmetric(vertical: 8, horizontal: 16),
                      child: ListTile(
                        title: Text(
                          '${evento['EQUIPA_CASA']} vs ${evento['VISITANTE']}',
                          style: TextStyle(color: Colors.white),
                        ),
                        subtitle: Text(
                          'Data: ${evento['DATA']}\nHora: ${evento['HORA']}',
                          style: TextStyle(color: Colors.grey),
                        ),
                        trailing: Icon(Icons.arrow_forward, color: Colors.white),
                        onTap: () => _navigateToAddPlayer(evento['ID_EVENTOS']),
                      ),
                    );
                  },
                ),
    );
  }
}
