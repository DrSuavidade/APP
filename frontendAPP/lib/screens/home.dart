import 'package:flutter/material.dart';
import '../api/api_service.dart';
import 'hamburger_menu.dart';

class HomeScreen extends StatefulWidget {
  final int userId;

  const HomeScreen({super.key, required this.userId});

  @override
  HomeScreenState createState() => HomeScreenState();
}

class HomeScreenState extends State<HomeScreen> {
  final ApiService api = ApiService(baseUrl: 'http://10.0.2.2:3000/api');
  List<dynamic> userGames = [];
  List<dynamic> userPlayers = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchData();
  }

  Future<void> _fetchData() async {
    try {
      final gamesResponse = await api.listEventosByUser(widget.userId);
      final playersResponse = await api.listJogadoresByUser(widget.userId);

      // Sort events by date and filter the two closest
      List<dynamic> sortedGames = List<dynamic>.from(gamesResponse);
      sortedGames.sort((a, b) {
        DateTime dateA = DateTime.parse(a['DATA']);
        DateTime dateB = DateTime.parse(b['DATA']);
        return dateA.compareTo(dateB);
      });

      setState(() {
        userGames =
            sortedGames.take(2).toList(); // Take only the two closest events
        userPlayers = List<dynamic>.from(playersResponse);
        isLoading = false;
      });
    } catch (e) {
      setState(() {
        isLoading = false;
      });
      if (!(e.toString().contains('No players found') ||
          e.toString().contains('No events found'))) {
        _showErrorDialog('Error', e.toString());
      }
    }
  }

  void _showErrorDialog(String title, String message) {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text(title),
          content: Text(message),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('OK'),
            ),
          ],
        );
      },
    );
  }

  void _deleteRelatorio(int idRelatorio) async {
  try {
    await api.put('relatorio/edit/$idRelatorio', {
      'STATUS': 'EliminadoScouter',
    });

    if (!mounted) return;

    setState(() {
      userPlayers.removeWhere((player) => player['ID_RELATORIO'] == idRelatorio);
    });

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text("Relatório removido com sucesso!")),
    );
  } catch (e) {
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text("Erro ao remover relatório.")),
    );
  }
}


  void _confirmDeleteRelatorio(int idRelatorio) {
  showDialog(
    context: context,
    builder: (context) => AlertDialog(
      title: const Text("Confirmar Exclusão"),
      content: const Text("Tem certeza que deseja remover este relatório?"),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: const Text("Cancelar"),
        ),
        TextButton(
          onPressed: () {
            Navigator.of(context).pop(); // Close the dialog
            _deleteRelatorio(idRelatorio);
          },
          child: const Text("Confirmar", style: TextStyle(color: Colors.red)),
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
        automaticallyImplyLeading: false, // Removes the default back arrow
        backgroundColor: Colors.transparent,
        elevation: 0,
        toolbarHeight: 50,
        title: Row(
          children: [
            Builder(
              builder: (context) => IconButton(
                icon: const Icon(Icons.menu, color: Colors.white),
                onPressed: () {
                  Scaffold.of(context).openDrawer(); // Open the custom drawer
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
      drawer:
          HamburgerMenu(userId: widget.userId), // Use the custom hamburger menu
      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : Stack(
              children: [
                // Background Image
                Container(
                  width: double.infinity,
                  height: double.infinity,
                  decoration: const BoxDecoration(
                    image: DecorationImage(
                      image: AssetImage(
                          'assets/images/Padrao.png'), // Background image
                      fit: BoxFit.cover, // Cover the full screen
                    ),
                  ),
                ),
                // Main Content
                Padding(
                  padding: const EdgeInsets.only(right: 12),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const SizedBox(height: 70),
                      const Text(
                        "PRÓXIMAS PARTIDAS",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 10,
                        ),
                      ),
                      const SizedBox(height: 10),
                      userGames.isEmpty
                          ? const Center(
                              child: Text(
                                "Não existem eventos de momento",
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 14,
                                ),
                              ),
                            )
                          : Column(
                              children: [
                                Column(
                                  children: userGames.map((game) {
                                    return _eventoCard(
                                      _formatDate(game['DATA']),
                                      game['HORA'],
                                      game['EQUIPA_CASA'],
                                      game['VISITANTE'],
                                      game['LOCAL'],
                                      context,
                                    );
                                  }).toList(),
                                ),
                                Center(
                                  child: TextButton(
                                    onPressed: () {
                                      Navigator.pushNamed(
                                        context,
                                        '/calendar',
                                        arguments: {
                                          'userId': widget.userId
                                        }, // Pass userId here
                                      );
                                    },
                                    style: TextButton.styleFrom(
                                      foregroundColor: Colors.white,
                                    ),
                                    child: const Text('Ver mais jogos'),
                                  ),
                                ),
                              ],
                            ),
                      const SizedBox(height: 10),
                      const Text(
                        "JOGADORES DESTACADOS",
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 14,
                        ),
                      ),
                      const SizedBox(height: 10),
                      userPlayers.isEmpty
                          ? const Center(
                              child: Text(
                                "Não existem jogadores de momento",
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 14,
                                ),
                              ),
                            )
                          : Expanded(
                              child: ListView(
                                padding: const EdgeInsets.only(right: 30),
                                children: userPlayers.map((player) {
                                  return _playerCard(
                                    player['NOME'],
                                    DateTime.now().year -
                                        DateTime.parse(player['DATA_NASC'])
                                            .year,
                                    player['NOTA_ADM'],
                                    player['ID_RELATORIO'],
                                    player['ID_JOGADORES'],
                                    context,
                                  );
                                }).toList(),
                              ),
                            ),
                    ],
                  ),
                ),
                // Bottom Navigation Bar
                Align(
                  alignment: Alignment.bottomCenter,
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      ElevatedButton(
                        onPressed: () {
                          Navigator.pushNamed(
                            context,
                            '/add_game',
                            arguments: {
                              'userId': widget.userId
                            }, // Pass userId here
                          );
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor:
                              Colors.grey[600], // Button background color
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(16),
                          ),
                          padding: const EdgeInsets.symmetric(
                            vertical: 10,
                            horizontal: 20,
                          ),
                        ),
                        child: const Text(
                          "Add Game",
                          style: TextStyle(color: Colors.white),
                        ),
                      ),
                      const SizedBox(
                          height: 10), // Space between button and nav bar
                      Stack(
                        alignment: Alignment.bottomCenter,
                        children: [
                          // Shadow Rectangle for Depth
                          Positioned(
                            bottom: 16, // Slightly below the actual navbar
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
                            margin: const EdgeInsets.fromLTRB(16, 16, 16,
                                24), // Adjusted margin for the bottom
                            height: 64,
                            decoration: BoxDecoration(
                              color: const Color.fromARGB(255, 77, 77, 77),
                              borderRadius: BorderRadius.circular(16),
                            ),
                            child: ClipRRect(
                              borderRadius: BorderRadius.circular(16),
                              child: Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceEvenly,
                                children: [
                                  // Calendar Button
                                  GestureDetector(
                                    onTap: () {
                                      Navigator.pushNamed(
                                        context,
                                        '/calendar',
                                        arguments: {
                                          'userId': widget.userId
                                        }, // Pass userId here
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
                                            color: 0 == 1 // Highlight condition
                                                ? Colors.grey[
                                                    600] // Selected button background
                                                : Colors
                                                    .transparent, // Default button background
                                            borderRadius:
                                                BorderRadius.circular(16),
                                          ),
                                        ),
                                        const Icon(
                                          Icons.calendar_today,
                                          color: 0 == 1
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
                                        arguments: {
                                          'userId': widget.userId
                                        }, // Pass userId here
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
                                            color: 1 == 1 // Highlight condition
                                                ? Colors.grey[
                                                    600] // Selected button background
                                                : Colors
                                                    .transparent, // Default button background
                                            borderRadius:
                                                BorderRadius.circular(16),
                                          ),
                                        ),
                                        const Icon(
                                          Icons.sports_soccer,
                                          color: 1 == 1
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
                                        arguments: {
                                          'userId': widget.userId
                                        }, // Pass userId here
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
                                            color: 2 == 1 // Highlight condition
                                                ? Colors.grey[
                                                    600] // Selected button background
                                                : Colors
                                                    .transparent, // Default button background
                                            borderRadius:
                                                BorderRadius.circular(16),
                                          ),
                                        ),
                                        const Icon(
                                          Icons.history,
                                          color: 2 == 1
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
                    ],
                  ),
                ),
              ],
            ),
    );
  }

  Widget _eventoCard(
    String date,
    String time,
    String homeTeam,
    String awayTeam,
    String location,
    BuildContext context,
  ) {
    return GestureDetector(
      onTap: () {
        Navigator.pushNamed(
          context,
          '/calendar',
          arguments: {'userId': widget.userId}, // Pass userId here
        ); // Navigate to calendar
      },
      child: Container(
        margin: const EdgeInsets.only(bottom: 6), // Space between cards
        padding: const EdgeInsets.all(10),
        width: double.infinity,
        height: 80, // Adjusted height for content
        decoration: BoxDecoration(
          color: const Color.fromARGB(252, 140, 140, 140),
          borderRadius: BorderRadius.circular(5),
        ),
        child: Stack(
          alignment: Alignment.centerLeft,
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  "$date  $time",
                  style: const TextStyle(color: Colors.white, fontSize: 10),
                ),
                const SizedBox(height: 5),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      "• ",
                      style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                        fontSize: 12,
                      ),
                    ),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          homeTeam,
                          style: const TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.bold,
                            fontSize: 12,
                          ),
                        ),
                        Text(
                          awayTeam,
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 12,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ],
            ),
            Align(
              alignment: Alignment.centerRight,
              child: Padding(
                padding: const EdgeInsets.only(right: 5),
                child: Text(
                  location,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 10,
                    fontWeight: FontWeight.w300,
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _playerCard(String name, int age, int notaAdm, int idRelatorio, int idJogador, BuildContext context) {
  return GestureDetector(
    onTap: () {
      Navigator.pushNamed(
        context,
        '/relatorio',
        arguments: {
          'id_relatorio': idRelatorio,
          'id_jogador': idJogador,
          'id_user': widget.userId,
        },
      );
    },
    child: Container(
      margin: const EdgeInsets.only(bottom: 6), // Space between cards
      padding: const EdgeInsets.only(left: 50, right: 10, top: 15, bottom: 15),
      width: double.infinity,
      height: 60,
      decoration: BoxDecoration(
        color: Colors.grey[900],
        borderRadius: const BorderRadius.only(
          topRight: Radius.circular(10),
          bottomRight: Radius.circular(10),
        ),
      ),
      child: Row(
        children: [
          const CircleAvatar(
            backgroundColor: Color.fromARGB(255, 49, 49, 49),
            child: Icon(Icons.person, color: Colors.white),
          ),
          const SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  "NOME: $name",
                  style: const TextStyle(color: Colors.white, fontSize: 9),
                ),
                Text(
                  "IDADE: $age",
                  style: const TextStyle(color: Colors.grey, fontSize: 8),
                ),
              ],
            ),
          ),
          Row(
            children: [
              Text(
                "$notaAdm",
                style: const TextStyle(color: Colors.white, fontSize: 18),
              ),
              const Icon(
                Icons.star,
                color: Colors.white,
                size: 20,
              ),
            ],
          ),
          const SizedBox(width: 8),
          // Trash Icon to Delete Relatorio
          GestureDetector(
            onTap: () => _confirmDeleteRelatorio(idRelatorio),
            child: const Icon(
              Icons.delete,
              color: Color.fromARGB(255, 77, 77, 77),
              size: 20,
            ),
          ),
        ],
      ),
    ),
  );
}

}
