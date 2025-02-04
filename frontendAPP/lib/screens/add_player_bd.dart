import 'package:flutter/material.dart';
import '../api/api_service.dart';

class AddPlayerBDScreen extends StatefulWidget {
  final int userId;
  final int idEvento;

  const AddPlayerBDScreen(
      {Key? key, required this.userId, required this.idEvento})
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

  String _formatDate(String isoDate) {
    DateTime date = DateTime.parse(isoDate);
    return "${date.day.toString().padLeft(2, '0')}/${date.month.toString().padLeft(2, '0')}/${date.year}";
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        automaticallyImplyLeading: false,
        backgroundColor: Colors.transparent,
        elevation: 0,
        toolbarHeight: 50,
        title: Row(
          children: [
            IconButton(
              icon: const Icon(Icons.arrow_back, color: Colors.white),
              onPressed: () {
                Navigator.pushReplacementNamed(
                  context,
                  '/add_game',
                  arguments: {'userId': widget.userId},
                );
              },
            ),
            const Spacer(),
            Image.asset(
              'assets/images/Logofinal1.png',
              height: 40,
            ),
          ],
        ),
      ),
      body: Stack(
        children: [
          // Background Image
          Container(
            decoration: BoxDecoration(
              image: DecorationImage(
                image: AssetImage('assets/images/Padrao.png'),
                fit: BoxFit.cover,
              ),
            ),
          ),

          Column(
            children: [
              SizedBox(height: 75),
              Padding(
                padding: EdgeInsets.only(top: 8, bottom: 5),
                child: Center(
                  child: Text(
                    "ADICIONAR JOGADORES",
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 16,
                    ),
                  ),
                ),
              ),
              Expanded(
                child: Container(
                  margin: EdgeInsets.symmetric(horizontal: 16, vertical: 5),
                  padding: EdgeInsets.symmetric(vertical: 10, horizontal: 12),
                  decoration: BoxDecoration(
                    color: Colors.grey[800], // Slightly lighter than before
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Column(
                    children: [
                      Expanded(
                        child: isLoading
                            ? Center(
                                child: CircularProgressIndicator(
                                    color: Colors.white))
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
                                      return GestureDetector(
                                        onTap: () => _createRelatorio(jogador['ID_JOGADORES']),
                                        child: Container(
                                          margin: EdgeInsets.symmetric(
                                              vertical: 6, horizontal: 8),
                                          padding: EdgeInsets.all(12),
                                          decoration: BoxDecoration(
                                            color: Colors.grey[
                                                900], // Darker player cards
                                            borderRadius:
                                                BorderRadius.circular(12),
                                          ),
                                          child: Row(
                                            children: [
                                              // Player Image Placeholder
                                              Container(
                                                width: 40,
                                                height: 40,
                                                decoration: BoxDecoration(
                                                  shape: BoxShape.circle,
                                                  color: Colors.white
                                                      .withOpacity(0.2),
                                                ),
                                                child: Icon(Icons.person,
                                                    color: Colors.white,
                                                    size: 24),
                                              ),
                                              SizedBox(width: 12),

                                              // Player Details
                                              Expanded(
                                                child: Column(
                                                  crossAxisAlignment:
                                                      CrossAxisAlignment.start,
                                                  children: [
                                                    Text(
                                                      jogador['NOME'] ??
                                                          'Sem nome',
                                                      style: TextStyle(
                                                        color: Colors.white,
                                                        fontSize: 14,
                                                        fontWeight:
                                                            FontWeight.bold,
                                                      ),
                                                    ),
                                                    SizedBox(height: 2),
                                                    Text(
                                                      _formatDate(
                                                          jogador['DATA_NASC']),
                                                      style: TextStyle(
                                                        color: Colors.grey[400],
                                                        fontSize: 12,
                                                      ),
                                                    ),
                                                  ],
                                                ),
                                              ),

                                              // Admin Rating Badge
                                              Container(
                                                padding: EdgeInsets.symmetric(
                                                    horizontal: 10,
                                                    vertical: 4),
                                                decoration: BoxDecoration(
                                                  color: Colors.grey[
                                                      600], // Light gray rating badge
                                                  borderRadius:
                                                      BorderRadius.circular(12),
                                                ),
                                                child: Text(
                                                  jogador['NOTA_ADM']
                                                      .toString(),
                                                  style: TextStyle(
                                                      color: Colors.white,
                                                      fontSize: 14),
                                                ),
                                              ),

                                              SizedBox(width: 10),

                                              // Circle Button (Inactive for now)
                                              GestureDetector(
                                                onTap: () {
                                                  setState(() {
                                                    jogador['selected'] =
                                                        !(jogador['selected'] ??
                                                            false);
                                                  });
                                                },
                                                child: Container(
                                                  width: 26,
                                                  height: 26,
                                                  decoration: BoxDecoration(
                                                    shape: BoxShape.circle,
                                                    border: Border.all(
                                                        color: Colors.white,
                                                        width: 2),
                                                    color: (jogador[
                                                                'selected'] ??
                                                            false)
                                                        ? Colors.white
                                                        : Colors
                                                            .transparent, // Toggle color
                                                  ),
                                                ),
                                              ),
                                            ],
                                          ),
                                        ),
                                      );
                                    },
                                  ),
                      ),
                      SizedBox(height: 10),

// Add New Player Button
Padding(
  padding: const EdgeInsets.symmetric(vertical: 10),
  child: Center(
    child: SizedBox(
      width: 200, // Adjusted button width
      child: ElevatedButton(
        onPressed: () {
          Navigator.pushNamed(
            context,
            '/add_new_player', // New page for adding a player
            arguments: {
              'userId': widget.userId,
              'idEvento': widget.idEvento,
            },
          );
        },
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.grey[700], // Light gray color
          padding: const EdgeInsets.symmetric(vertical: 14),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
          ),
        ),
        child: const Text(
          'Adicionar Novo Jogador',
          style: TextStyle(color: Colors.white),
        ),
      ),
    ),
  ),
),

                    ],
                  ),
                ),
              ),
              SizedBox(height: 120),
            ],
          ),
          // Bottom Navigation Bar inside Stack
          Align(
            alignment: Alignment.bottomCenter,
            child: Container(
              margin: const EdgeInsets.fromLTRB(16, 16, 16, 24),
              height: 64,
              decoration: BoxDecoration(
                color: const Color.fromARGB(255, 77, 77, 77),
                borderRadius: BorderRadius.circular(16),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  _bottomNavButton(Icons.calendar_today, '/calendar', 0),
                  _bottomNavButton(Icons.sports_soccer, '/home', 1,
                      selected: true),
                  _bottomNavButton(Icons.history, '/historico', 2),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _bottomNavButton(IconData icon, String route, int index,
      {bool selected = false}) {
    return GestureDetector(
      onTap: () {
        Navigator.pushNamed(context, route,
            arguments: {'userId': widget.userId});
      },
      child: Container(
        width: 80,
        height: double.infinity,
        decoration: BoxDecoration(
          color: selected ? Colors.grey[600] : Colors.transparent,
          borderRadius: BorderRadius.circular(16),
        ),
        child: Icon(
          icon,
          color: selected ? Colors.white : Colors.grey,
          size: 34,
        ),
      ),
    );
  }
}
