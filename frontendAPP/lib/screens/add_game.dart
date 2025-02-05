import 'package:flutter/material.dart';
import '../api/api_service.dart';
import 'hamburger_menu.dart';

class AddGameScreen extends StatefulWidget {
  final int userId;

  const AddGameScreen({super.key, required this.userId});

  @override
  AddGameScreenState createState() => AddGameScreenState();
}

class AddGameScreenState extends State<AddGameScreen> {
  final ApiService api = ApiService(baseUrl: 'http://10.0.2.2:3000/api');
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

  String _formatDate(String isoDate) {
    DateTime date = DateTime.parse(isoDate);
    return "${date.day.toString().padLeft(2, '0')}/${date.month.toString().padLeft(2, '0')}/${date.year}";
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true, // Makes app bar overlay background
      appBar: AppBar(
        automaticallyImplyLeading: false,
        backgroundColor: Colors.transparent, // Transparent top bar
        elevation: 0,
        toolbarHeight: 50,
        title: Row(
          children: [
            Builder(
              builder: (context) => IconButton(
                icon: const Icon(Icons.menu, color: Colors.white),
                onPressed: () {
                  Scaffold.of(context).openDrawer();
                },
              ),
            ),
            const Spacer(),
            Image.asset(
              'assets/images/Logofinal1.png',
              height: 40,
            ),
          ],
        ),
      ),
      drawer: HamburgerMenu(userId: widget.userId),
      body: Stack(
        children: [
          // Background Image
          Container(
            decoration: const BoxDecoration(
              image: DecorationImage(
                image: AssetImage('assets/images/Padrao.png'),
                fit: BoxFit.cover,
              ),
            ),
          ),
          Column(
            children: [
              const SizedBox(height: 75), // Adjusted to move content up
              // Title at the top
              const Padding(
                padding: EdgeInsets.only(top: 8, bottom: 5),
                child: Center(
                  child: Text(
                    "SELECIONE UMA PARTIDA",
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 16,
                    ),
                  ),
                ),
              ),

              Expanded(
                child: Container(
                  margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 5),
                  padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 12),
                  decoration: BoxDecoration(
                    color: Colors.grey[850], // Now matches event cards
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // List of Events
                      Expanded(
                        child: isLoading
                            ? const Center(
                                child: CircularProgressIndicator(
                                    color: Colors.white))
                            : eventos.isEmpty
                                ? const Center(
                                    child: Text(
                                      'Nenhum jogo disponível.',
                                      style: TextStyle(color: Colors.white),
                                    ),
                                  )
                                : ListView.builder(
                                    itemCount: eventos.length,
                                    itemBuilder: (context, index) {
                                      final evento = eventos[index];
                                      return GestureDetector(
                                        onTap: () => _navigateToAddPlayer(evento[
                                            'ID_EVENTOS']), // Restored logic
                                        child: Container(
                                          margin: const EdgeInsets.symmetric(
                                              vertical: 6, horizontal: 8),
                                          padding: const EdgeInsets.symmetric(
                                              vertical: 10, horizontal: 16),
                                          decoration: BoxDecoration(
                                            color: Colors.grey[
                                                700], // Lighter gray for event cards
                                            borderRadius:
                                                BorderRadius.circular(12),
                                          ),
                                          child: Column(
                                            crossAxisAlignment:
                                                CrossAxisAlignment.center,
                                            children: [
                                              Text(
                                                '${evento['EQUIPA_CASA']}  vs  ${evento['VISITANTE']}',
                                                style: const TextStyle(
                                                  color: Colors.white,
                                                  fontSize: 13,
                                                  fontWeight: FontWeight.bold,
                                                ),
                                              ),
                                              const SizedBox(height: 6),
                                              Text(
                                                '${_formatDate(evento['DATA'])}  ${evento['HORA']}',
                                                style: TextStyle(
                                                  color: Colors.grey[400],
                                                  fontSize: 11,
                                                ),
                                              ),
                                            ],
                                          ),
                                        ),
                                      );
                                    },
                                  ),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 120),
            ],
          ),
          // Bottom Navigation Bar inside the Stack (fixes white background issue)
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
                  _bottomNavButton(Icons.calendar_today, '/calendar', 0,
                      selected: true),
                  _bottomNavButton(Icons.sports_soccer, '/home', 1),
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
