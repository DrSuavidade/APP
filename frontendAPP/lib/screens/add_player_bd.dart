// ignore_for_file: prefer_const_constructors

import 'package:flutter/material.dart';
import '../api/api_service.dart';
import 'hamburger_menu.dart';

class AddPlayerBDScreen extends StatefulWidget {
  final int userId;
  final int idEvento;

  AddPlayerBDScreen({Key? key, required this.userId, required this.idEvento})
      : super(key: key);

  @override
  _AddPlayerBDScreenState createState() => _AddPlayerBDScreenState();
}

class _AddPlayerBDScreenState extends State<AddPlayerBDScreen> {
  final ApiService api = ApiService(baseUrl: 'http://localhost:3000/api');
  List<dynamic> jogadores = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchPlayers();
  }

  Future<void> _fetchPlayers() async {
    try {
      setState(() => isLoading = true);
      final response = await api.listJogadores();
      setState(() {
        jogadores = response;
        isLoading = false;
      });
    } catch (e) {
      setState(() => isLoading = false);
      _showErrorDialog('Erro', 'Não foi possível carregar os jogadores.');
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


  void _showErrorDialog(String title, String message) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(title),
        content: Text(message),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: Text('OK'),
          ),
        ],
      ),
    );
  }

  void _showSuccessDialog() {
  showDialog(
    context: context,
    builder: (context) => AlertDialog(
      title: Text('Sucesso'),
      content: Text('Relatório criado com sucesso!'),
      actions: [
        TextButton(
          onPressed: () {
            Navigator.pop(context); // Close dialog
            Navigator.pop(context); // Go back to previous page
            Navigator.pushReplacementNamed(
              context,
              '/home',
              arguments: {'userId': widget.userId},
            );
          },
          child: const Text('OK'),
        ),
      ],
    ),
  );
}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        backgroundColor: Colors.black,
        elevation: 0,
        title: Row(
          children: [
            Builder(
              builder: (context) => IconButton(
                icon: Icon(Icons.menu, color: Colors.white),
                onPressed: () {
                  Scaffold.of(context).openDrawer(); // Open the custom drawer
                },
              ),
            ),
            Spacer(),
            Image.asset(
              'assets/images/Logofinal1.png',
              height: 40,
            ),
          ],
        ),
      ),
      drawer: HamburgerMenu(userId: widget.userId), // Pass userId to the menu
      body: isLoading
          ? Center(child: CircularProgressIndicator())
          : jogadores.isEmpty
              ? Center(
                  child: Text(
                    'Nenhum jogador disponível',
                    style: TextStyle(color: Colors.white),
                  ),
                )
              : ListView.builder(
                  itemCount: jogadores.length,
                  itemBuilder: (context, index) {
                    final jogador = jogadores[index];
                    return Card(
                      color: Colors.grey[800],
                      margin: EdgeInsets.symmetric(vertical: 5, horizontal: 16),
                      child: ListTile(
                        title: Text(
                          "NOME: ${jogador['NOME']}",
                          style: TextStyle(color: Colors.white),
                        ),
                        subtitle: Text(
                          "Data de Nascimento: ${jogador['DATA_NASC']}",
                          style: TextStyle(color: Colors.grey),
                        ),
                        trailing:
                            Icon(Icons.arrow_forward, color: Colors.white),
                        onTap: () {
                          _createRelatorio(jogador['ID_JOGADORES']);
                        },
                      ),
                    );
                  },
                ),
    );
  }
}
