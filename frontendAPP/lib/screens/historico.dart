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
      final response = await api.listRelatoriosHistorico();
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
      case 'AvaliadoADM':
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
      backgroundColor: Colors.black,
      appBar: AppBar(
        automaticallyImplyLeading: false,
        backgroundColor: Colors.black,
        elevation: 0,
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
          // Main Background
          Container(
            decoration: BoxDecoration(
              image: DecorationImage(
                image: AssetImage('assets/images/Padrao.png'),
                fit: BoxFit.cover,
              ),
            ),
          ),
          // Main Content
          Padding(
            padding:
                const EdgeInsets.only(bottom: 100), // Adjust for bottom nav bar
            child: isLoading
                ? Center(child: CircularProgressIndicator())
                : relatorios.isEmpty
                    ? Center(
                        child: Text(
                          "Nenhum relatório encontrado",
                          style: TextStyle(color: Colors.white, fontSize: 14),
                        ),
                      )
                    : ListView.builder(
                        itemCount: relatorios.length,
                        itemBuilder: (context, index) {
                          final relatorio = relatorios[index];
                          final playerName =
                              relatorio['JOGADOR_NOME'] ?? 'Desconhecido';
                          final nota = relatorio['NOTA'] ?? 0;
                          final status = relatorio['STATUS'] ?? 'Indefinido';

                          return Card(
                            color: Colors.grey[800],
                            margin: EdgeInsets.symmetric(
                                vertical: 5, horizontal: 16),
                            child: ListTile(
                              title: Text(
                                playerName,
                                style: TextStyle(color: Colors.white),
                              ),
                              trailing: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Text(
                                    "$nota",
                                    style: TextStyle(color: Colors.white),
                                  ),
                                  Icon(Icons.star, color: Colors.white),
                                  SizedBox(width: 40),
                                  CircleAvatar(
                                    radius: 6, // Adjust the size of the dot
                                    backgroundColor: _statusColor(status),
                                  ),
                                ],
                              ),
                            ),
                          );
                        },
                      ),
          ),
          // Bottom Navigation Bar
          Align(
            alignment: Alignment.bottomCenter,
            child: Stack(
              alignment: Alignment.bottomCenter,
              children: [
                // Shadow Rectangle for Depth
                Positioned(
                  bottom: 16,
                  left: 16,
                  right: 16,
                  child: Container(
                    height: 70,
                    decoration: BoxDecoration(
                      color: const Color.fromARGB(
                          255, 36, 36, 36), // Dark shadow color
                      borderRadius: BorderRadius.circular(16),
                    ),
                  ),
                ),
                // Actual Bottom Navigation Bar
                Container(
                  margin: const EdgeInsets.fromLTRB(
                      16, 16, 16, 24), // Adjusted margin for the bottom
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
                        // Calendar Button
                        GestureDetector(
                          onTap: () {
                            Navigator.pushNamed(
                              context,
                              '/calendar',
                              arguments: {'userId': widget.userId},
                            ); // Navigate to calendar
                          },
                          child: Stack(
                            alignment: Alignment.center,
                            children: [
                              Container(
                                height: double.infinity,
                                width:
                                    80, // Highlight width (wider for selected)
                                decoration: BoxDecoration(
                                  color: 0 == 2 // Highlight condition
                                      ? Colors.grey[
                                          600] // Selected button background
                                      : Colors
                                          .transparent, // Default button background
                                  borderRadius: BorderRadius.circular(16),
                                ),
                              ),
                              const Icon(
                                Icons.calendar_today,
                                color: 0 == 2
                                    ? Colors.white
                                    : Colors.grey, // Icon color
                                size: 34,
                              ),
                            ],
                          ),
                        ),
                        // Soccer Button
                        GestureDetector(
                          onTap: () {
                            Navigator.pushNamed(
                              context,
                              '/home',
                              arguments: {'userId': widget.userId},
                            );
                          },
                          child: Stack(
                            alignment: Alignment.center,
                            children: [
                              Container(
                                height: double.infinity,
                                width:
                                    104, // Highlight width (wider for selected)
                                decoration: BoxDecoration(
                                  color: 1 == 2 // Highlight condition
                                      ? Colors.grey[
                                          600] // Selected button background
                                      : Colors
                                          .transparent, // Default button background
                                  borderRadius: BorderRadius.circular(16),
                                ),
                              ),
                              const Icon(
                                Icons.sports_soccer,
                                color: 1 == 2
                                    ? Colors.white
                                    : Colors.grey, // Icon color
                                size: 34,
                              ),
                            ],
                          ),
                        ),
                        // History Button
                        GestureDetector(
                          onTap: () {
                            Navigator.pushNamed(
                              context,
                              '/historico',
                              arguments: {'userId': widget.userId},
                            ); // Navigate to historico
                          },
                          child: Stack(
                            alignment: Alignment.center,
                            children: [
                              Container(
                                height: double.infinity,
                                width:
                                    80, // Highlight width (wider for selected)
                                decoration: BoxDecoration(
                                  color: 2 == 2 // Highlight condition
                                      ? Colors.grey[
                                          600] // Selected button background
                                      : Colors
                                          .transparent, // Default button background
                                  borderRadius: BorderRadius.circular(16),
                                ),
                              ),
                              const Icon(
                                Icons.history,
                                color: 2 == 2
                                    ? Colors.white
                                    : Colors.grey, // Icon color
                                size: 34,
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
