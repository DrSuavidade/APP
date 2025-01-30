import 'package:flutter/material.dart';
import '../api/api_service.dart';
import 'hamburger_menu.dart';

class HistoricoScreen extends StatefulWidget {
  final int userId;

  const HistoricoScreen({Key? key, required this.userId}) : super(key: key);

  @override
  _HistoricoScreenState createState() => _HistoricoScreenState();
}

class _HistoricoScreenState extends State<HistoricoScreen> {
  final ApiService api = ApiService(baseUrl: 'http://localhost:3000/api');
  List<dynamic> relatorios = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchHistoricoRelatorios();
  }

  Future<void> _fetchHistoricoRelatorios() async {
    try {
      final response = await api.listRelatoriosHistorico(userId: widget.userId);
      setState(() {
        relatorios = response;
        isLoading = false;
      });
    } catch (e) {
      setState(() {
        isLoading = false;
      });
      _showErrorDialog('Erro', 'Falha ao carregar os relatórios.');
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

  Color _statusColor(String status) {
    switch (status) {
      case 'Avaliado':
        return Colors.yellow;
      case 'Avaliado_ADM':
        return Colors.green;
      case 'Recusado':
        return Colors.red;
      default:
        return Colors.grey;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true, // Makes app bar float over the background
      appBar: AppBar(
        automaticallyImplyLeading: false,
        backgroundColor: Colors.transparent, // Fully transparent top bar
        elevation: 0,
        toolbarHeight: 50, // Match home.dart
        title: Row(
          children: [
            Builder(
              builder: (context) => IconButton(
                icon: Icon(Icons.menu, color: Colors.white),
                onPressed: () {
                  Scaffold.of(context).openDrawer();
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
      drawer: HamburgerMenu(userId: widget.userId),
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
          Padding(
            padding: const EdgeInsets.only(bottom: 100), // Adjust for bottom nav bar
            child: Column(
              children: [
                // Grey Box containing the title and list
                SizedBox(height: 50),
                Container(
                  margin: EdgeInsets.symmetric(horizontal: 16, vertical: 20),
                  padding: EdgeInsets.symmetric(vertical: 12, horizontal: 12),
                  decoration: BoxDecoration(
                    color: Colors.grey[800], // Main grey box
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Column(
                    children: [
                      // Title inside Dark Grey Box
                      Container(
                        padding: EdgeInsets.symmetric(vertical: 8),
                        decoration: BoxDecoration(
                          color: Colors.grey[900], // Dark grey box for title
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Center(
                          child: Text(
                            "HISTÓRICO DE AVALIAÇÕES",
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ),
                      // List Items
                      isLoading
                          ? Center(child: CircularProgressIndicator())
                          : relatorios.isEmpty
                              ? Center(
                                  child: Padding(
                                    padding: EdgeInsets.symmetric(vertical: 10),
                                    child: Text(
                                      "Nenhum relatório encontrado",
                                      style: TextStyle(
                                        color: Colors.white,
                                        fontSize: 14,
                                      ),
                                    ),
                                  ),
                                )
                              : ListView.builder(
                                  shrinkWrap: true,
                                  physics: NeverScrollableScrollPhysics(),
                                  itemCount: relatorios.length,
                                  itemBuilder: (context, index) {
                                    final relatorio = relatorios[index];
                                    final playerName =
                                        relatorio['JOGADOR_NOME'] ?? 'Desconhecido';
                                    final nota = relatorio['NOTA'] ?? 0;
                                    final status = relatorio['STATUS'] ?? 'Indefinido';

                                    return Padding(
                                      padding: const EdgeInsets.symmetric(vertical: 5),
                                      child: Container(
                                        decoration: BoxDecoration(
                                          color: Colors.grey[400],
                                          borderRadius: BorderRadius.circular(12),
                                        ),
                                        padding: EdgeInsets.symmetric(
                                            vertical: 10, horizontal: 16),
                                        child: Row(
                                          mainAxisAlignment:
                                              MainAxisAlignment.spaceBetween,
                                          children: [
                                            // Player Name
                                            Expanded(
                                              child: Text(
                                                playerName,
                                                style:
                                                    TextStyle(color: Colors.white, fontSize: 14),
                                              ),
                                            ),
                                            // Rating
                                            Row(
                                              children: List.generate(
                                                5,
                                                (i) => Icon(
                                                  Icons.star,
                                                  size: 16,
                                                  color: i < nota ? Colors.yellow : Colors.grey,
                                                ),
                                              ),
                                            ),
                                            SizedBox(width: 10),
                                            // Status Indicator
                                            CircleAvatar(
                                              radius: 6,
                                              backgroundColor: _statusColor(status),
                                            ),
                                          ],
                                        ),
                                      ),
                                    );
                                  },
                                ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          // Bottom Navigation Bar
          Align(
            alignment: Alignment.bottomCenter,
            child: Container(
              margin: const EdgeInsets.fromLTRB(16, 16, 16, 24),
              height: 64,
              decoration: BoxDecoration(
                color: const Color.fromARGB(255, 77, 77, 77),
                borderRadius: BorderRadius.circular(16),
              ),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(16),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    _bottomNavButton(Icons.calendar_today, '/calendar', 0),
                    _bottomNavButton(Icons.sports_soccer, '/home', 1),
                    _bottomNavButton(Icons.history, '/historico', 2, selected: true),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _bottomNavButton(IconData icon, String route, int index, {bool selected = false}) {
    return GestureDetector(
      onTap: () {
        Navigator.pushNamed(context, route, arguments: {'userId': widget.userId});
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
