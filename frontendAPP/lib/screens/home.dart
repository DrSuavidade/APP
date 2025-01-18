import 'package:flutter/material.dart';
import '../api/api_service.dart';
import 'hamburger_menu.dart';

class HomeScreen extends StatefulWidget {
  final int userId;

  const HomeScreen({Key? key, required this.userId}) : super(key: key);

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final ApiService api = ApiService(baseUrl: 'http://localhost:3000/api');
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
        DateTime dateA = DateTime.parse(a['data']);
        DateTime dateB = DateTime.parse(b['data']);
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
      _showErrorDialog('Error', e.toString());
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
              child: Text('OK'),
            ),
          ],
        );
      },
    );
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
          ? Center(child: CircularProgressIndicator())
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
                      ...userGames.map((game) {
                        return _eventoCard(
                          game['data'],
                          game['hora'],
                          game['equipa_casa'],
                          game['visitante'],
                          game['local'],
                          context,
                        );
                      }).toList(),
                      Center(
                        child: TextButton(
                          onPressed: () {
                            Navigator.pushNamed(context, '/calendar');
                          },
                          style: TextButton.styleFrom(
                            foregroundColor: Colors.white, // Text color
                          ),
                          child: const Text('Ver mais jogos'),
                        ),
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
                      Expanded(
                        child: ListView(
                          padding: const EdgeInsets.only(right: 30),
                          children: userPlayers.map((player) {
                            return _playerCard(
                              player['nome'],
                              DateTime.now().year -
                                  DateTime.parse(player['data_nasc']).year,
                              5, // Replace with stars if available
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
                  child: Stack(
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
                                        borderRadius: BorderRadius.circular(16),
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
                                        borderRadius: BorderRadius.circular(16),
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
                                        borderRadius: BorderRadius.circular(16),
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
            context, '/add_player'); // Adjust navigation if necessary
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

  Widget _playerCard(String name, int age, int stars, BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.pushNamed(
            context, '/relatorio'); // Navigate to relatorio.dart
      },
      child: Container(
        margin: const EdgeInsets.only(bottom: 6), // Space between cards
        padding:
            const EdgeInsets.only(left: 50, right: 40, top: 15, bottom: 15),
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
                  "$stars",
                  style: const TextStyle(color: Colors.white, fontSize: 18),
                ),
                const Icon(
                  Icons.star,
                  color: Color.fromARGB(255, 255, 255, 255),
                  size: 20,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
