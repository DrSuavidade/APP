import 'package:flutter/material.dart';
import 'hamburger_menu.dart';

class HomeScreen extends StatelessWidget {
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
      drawer: HamburgerMenu(), // Use the custom hamburger menu
      body: Stack(
  children: [
    // Background Image
    Container(
      width: double.infinity,
      height: double.infinity,
      decoration: BoxDecoration(
        image: DecorationImage(
          image: AssetImage('assets/images/Padrao.png'), // Background image
          fit: BoxFit.cover, // Cover the full screen
        ),
      ),
    ),
    // Main Content
    Padding(
      padding: EdgeInsets.only(right: 12),
      child: Column(
        children: [
          SizedBox(height: 70),
          // Future Games Section
          Text(
            "PRÓXIMAS PARTIDAS",
            textAlign: TextAlign.center,
            style: TextStyle(
              color: Colors.white,
              fontSize: 10,
            ),
          ),
          SizedBox(height: 3),
          GestureDetector(
            onTap: () {
              Navigator.pushNamed(context, '/add_player'); // Navigate to add_player.dart
            },
            child: Padding(
              padding: const EdgeInsets.only(left: 12), // Add left padding
              child: Container(
                width: double.infinity,
                height: 63, // Adjusted height to fit content better
                padding: EdgeInsets.all(5),
                decoration: BoxDecoration(
                  color: const Color.fromARGB(252, 140, 140, 140),
                  borderRadius: BorderRadius.circular(5),
                ),
                child: Stack(
                  alignment: Alignment.centerLeft, // For aligning text to the middle left
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          "17/10/2024  12:00 AM",
                          style: TextStyle(color: Colors.white, fontSize: 10),
                        ),
                        SizedBox(height: 5),
                        Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              "• ", // Bullet point
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
                                  "A.F. VISEU",
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 12,
                                  ),
                                ),
                                Text(
                                  "FC VAGUEENSE",
                                  style: TextStyle(
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
                      alignment: Alignment.centerRight, // Align the text to the middle left
                      child: Padding(
                        padding: EdgeInsets.only(right: 5), // Adjust spacing if necessary
                        child: Text(
                          "Estádio Municipal do Fontelo",
                          style: TextStyle(
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
            ),
          ),
          SizedBox(height: 4),
          GestureDetector(
            onTap: () {
              Navigator.pushNamed(context, '/add_player'); // Navigate to add_player.dart
            },
            child: Padding(
              padding: const EdgeInsets.only(left: 12), // Add left padding
              child: Container(
                width: double.infinity,
                height: 63, // Adjusted height to fit content better
                padding: EdgeInsets.all(5),
                decoration: BoxDecoration(
                  color: const Color.fromARGB(252, 140, 140, 140),
                  borderRadius: BorderRadius.circular(5),
                ),
                child: Stack(
                  alignment: Alignment.centerLeft, // For aligning text to the middle left
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          "25/10/2024  12:00 AM",
                          style: TextStyle(color: Colors.white, fontSize: 10),
                        ),
                        SizedBox(height: 5),
                        Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              "• ", // Bullet point
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
                                  "SL NELAS",
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 12,
                                  ),
                                ),
                                Text(
                                  "A.F. VISEU",
                                  style: TextStyle(
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
                      alignment: Alignment.centerRight, // Align the text to the middle left
                      child: Padding(
                        padding: EdgeInsets.only(right: 5), // Adjust spacing if necessary
                        child: Text(
                          "Estádio Municipal de Nelas",
                          style: TextStyle(
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
            ),
          ),
          TextButton(
            onPressed: () {
              Navigator.pushNamed(context, '/calendar'); // Navigate to calendar.dart
            },
            child: Text(
              "VER MAIS JOGOS",
              style: TextStyle(
                color: Colors.white,
                fontSize: 9,
              ),
            ),
          ),
          SizedBox(height: 10),

          // Featured Players Section
          Text(
            "JOGADORES DESTACADOS",
            style: TextStyle(
              color: Colors.white,
              fontSize: 14,
            ),
          ),
          SizedBox(height: 10),
          Expanded(
            child: ListView(
              padding:
                  EdgeInsets.only(right: 30), // Only add padding to the right
              children: [
                _playerCard("Marco Saraiva", 12, 5, context),
                _playerCard("Pedro Costa", 25, 3, context),
                _playerCard("João Pereira", 21, 4, context),
              ],
            ),
          ),

          SizedBox(height: 4),
          ElevatedButton(
            onPressed: () {
              Navigator.pushNamed(context, '/add_game'); // Navigate to add_game.dart
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.grey[900],
              padding: EdgeInsets.only(top: 2, bottom: 2, right: 20, left: 20),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10.0),
              ),
            ),
            child: Text("ADICIONAR JOGADOR",
                style: TextStyle(color: Colors.white, fontWeight: FontWeight.w300, fontSize: 10)),
          ),
          SizedBox(height: 94),
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
                color:
                    const Color.fromARGB(255, 36, 36, 36), // Dark shadow color
                borderRadius: BorderRadius.circular(16),
              ),
            ),
          ),
          // Actual Bottom Navigation Bar
          Container(
            margin: EdgeInsets.fromLTRB(
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
                          context, '/calendar'); // Navigate to calendar
                    },
                    child: Stack(
                      alignment: Alignment.center,
                      children: [
                        Container(
                          height: double.infinity,
                          width: 80, // Highlight width (wider for selected)
                          decoration: BoxDecoration(
                            color: 0 == 1 // Highlight condition
                                ? Colors.grey[600] // Selected button background
                                : Colors
                                    .transparent, // Default button background
                            borderRadius: BorderRadius.circular(16),
                          ),
                        ),
                        Icon(
                          Icons.calendar_today,
                          color:
                              0 == 1 ? Colors.white : Colors.grey, // Icon color
                          size: 34,
                        ),
                      ],
                    ),
                  ),
                  // Soccer Button
                  GestureDetector(
                    onTap: () {
                      Navigator.pushNamed(context, '/home');
                    },
                    child: Stack(
                      alignment: Alignment.center,
                      children: [
                        Container(
                          height: double.infinity,
                          width: 104, // Highlight width (wider for selected)
                          decoration: BoxDecoration(
                            color: 1 == 1 // Highlight condition
                                ? Colors.grey[600] // Selected button background
                                : Colors
                                    .transparent, // Default button background
                            borderRadius: BorderRadius.circular(16),
                          ),
                        ),
                        Icon(
                          Icons.sports_soccer,
                          color:
                              1 == 1 ? Colors.white : Colors.grey, // Icon color
                          size: 34,
                        ),
                      ],
                    ),
                  ),
                  // History Button
                  GestureDetector(
                    onTap: () {
                      Navigator.pushNamed(
                          context, '/historico'); // Navigate to historico
                    },
                    child: Stack(
                      alignment: Alignment.center,
                      children: [
                        Container(
                          height: double.infinity,
                          width: 80, // Highlight width (wider for selected)
                          decoration: BoxDecoration(
                            color: 2 == 1 // Highlight condition
                                ? Colors.grey[600] // Selected button background
                                : Colors
                                    .transparent, // Default button background
                            borderRadius: BorderRadius.circular(16),
                          ),
                        ),
                        Icon(
                          Icons.history,
                          color:
                              2 == 1 ? Colors.white : Colors.grey, // Icon color
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
            CircleAvatar(
              backgroundColor: const Color.fromARGB(255, 49, 49, 49),
              child: const Icon(Icons.person, color: Colors.white),
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