import 'package:flutter/material.dart';
import '../api/api_service.dart';

class ListPlayerScreen extends StatefulWidget {
  final int userId;
  final int idEvento;

  const ListPlayerScreen({super.key, required this.userId, required this.idEvento});

  @override
  ListPlayerScreenState createState() => ListPlayerScreenState();
}

class ListPlayerScreenState extends State<ListPlayerScreen> {
  final ApiService api = ApiService(baseUrl: 'http://10.0.2.2:3000/api');
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
                  '/calendar',
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
            decoration: const BoxDecoration(
              image: DecorationImage(
                image: AssetImage('assets/images/Padrao.png'),
                fit: BoxFit.cover,
              ),
            ),
          ),

          Column(
            children: [
              const SizedBox(height: 75),
              const Padding(
                padding: EdgeInsets.only(top: 8, bottom: 5),
                child: Center(
                  child: Text(
                    "JOGADORES DO EVENTO",
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
                    color: Colors.grey[800], // Slightly lighter than before
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Expanded(
                        child: isLoading
                            ? const Center(child: CircularProgressIndicator(color: Colors.white))
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
                                      return Container(
                                        margin: const EdgeInsets.symmetric(vertical: 6, horizontal: 8),
                                        padding: const EdgeInsets.all(12),
                                        decoration: BoxDecoration(
                                          color: Colors.grey[900], // Darker player cards
                                          borderRadius: BorderRadius.circular(12),
                                        ),
                                        child: Row(
                                          children: [
                                            // Player Image Placeholder
                                            Container(
                                              width: 40,
                                              height: 40,
                                              decoration: BoxDecoration(
                                                shape: BoxShape.circle,
                                                color: Colors.white.withOpacity(0.2),
                                              ),
                                              child: const Icon(Icons.person, color: Colors.white, size: 24),
                                            ),
                                            const SizedBox(width: 12),

                                            // Player Details
                                            Expanded(
                                              child: Column(
                                                crossAxisAlignment: CrossAxisAlignment.start,
                                                children: [
                                                  Text(
                                                    jogador['NOME'] ?? 'Sem nome',
                                                    style: const TextStyle(
                                                      color: Colors.white,
                                                      fontSize: 14,
                                                      fontWeight: FontWeight.bold,
                                                    ),
                                                  ),
                                                  const SizedBox(height: 2),
                                                  Text(
                                                    _formatDate(jogador['DATA_NASC']),
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
                                              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                                              decoration: BoxDecoration(
                                                color: Colors.grey[600], // Light gray rating badge
                                                borderRadius: BorderRadius.circular(12),
                                              ),
                                              child: Text(
                                                jogador['NOTA_ADM'].toString(),
                                                style: const TextStyle(color: Colors.white, fontSize: 14),
                                              ),
                                            ),
                                          ],
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
                  _bottomNavButton(Icons.calendar_today, '/calendar', 0, selected: true),
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
