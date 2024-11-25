import 'package:flutter/material.dart';
import 'hamburger_menu.dart';

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        backgroundColor: Colors.black,
        elevation: 0,
        title: Row(
          children: [
            IconButton(
              icon: Icon(Icons.menu, color: Colors.white),
              onPressed: () {
                openHamburgerMenu(context); // Open Hamburger Menu
              },
            ),
            Spacer(),
            Image.asset(
              'assets/images/Logofinal1.png',
              height: 40,
            ),
          ],
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Future Games Section
            Text(
              "PRÓXIMAS PARTIDAS",
              style: TextStyle(
                color: Colors.white,
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 10),
            GestureDetector(
              onTap: () {
                Navigator.pushNamed(
                    context, '/add_player'); // Navigate to add_player.dart
              },
              child: Container(
                padding: EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.grey[800],
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "17/10/2024  12:00 AM",
                      style: TextStyle(color: Colors.white, fontSize: 14),
                    ),
                    Text(
                      "A.F. VISEU   FC VAGUEENSE",
                      style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Text(
                      "Estádio Municipal do Fontelo",
                      style: TextStyle(color: Colors.grey, fontSize: 12),
                    ),
                  ],
                ),
              ),
            ),
            SizedBox(height: 10),
            GestureDetector(
              onTap: () {
                Navigator.pushNamed(
                    context, '/add_player'); // Navigate to add_player.dart
              },
              child: Container(
                padding: EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.grey[800],
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "25/10/2024  12:00 AM",
                      style: TextStyle(color: Colors.white, fontSize: 14),
                    ),
                    Text(
                      "A.F. VISEU   SL NELAS",
                      style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Text(
                      "Estádio Municipal de Nelas",
                      style: TextStyle(color: Colors.grey, fontSize: 12),
                    ),
                  ],
                ),
              ),
            ),
            TextButton(
              onPressed: () {
                Navigator.pushNamed(
                    context, '/calendar'); // Navigate to calendar.dart
              },
              child: Text(
                "VER MAIS JOGOS",
                style: TextStyle(color: Colors.white),
              ),
            ),
            SizedBox(height: 20),

            // Featured Players Section
            Text(
              "JOGADORES DESTACADOS",
              style: TextStyle(
                color: Colors.white,
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 10),
            Expanded(
              child: ListView(
                children: [
                  _playerCard("Marco Saraiva", 12, 5, context),
                  _playerCard("Pedro Cesta", 25, 3, context),
                  _playerCard("João Pereira", 21, 4, context),
                ],
              ),
            ),
            SizedBox(height: 10),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(
                    context, '/add_game'); // Navigate to add_game.dart
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.grey[900],
                padding: EdgeInsets.symmetric(vertical: 14.0),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10.0),
                ),
              ),
              child: Text("ADICIONAR JOGADOR",
                  style: TextStyle(color: Colors.white)),
            ),
          ],
        ),
      ),
      // Enhanced BottomNavigationBar with Depth
      bottomNavigationBar: Stack(
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
                  GestureDetector(
                    onTap: () {
                      Navigator.pushNamed(
                          context, '/calendar'); // Navigate to calendar
                    },
                    child: Container(
                      height: double.infinity,
                      width: 64,
                      decoration: BoxDecoration(
                        color: 0 == 1 // Highlight condition
                            ? Colors.grey[600] // Selected button background
                            : Colors.transparent, // Default button background
                        borderRadius: BorderRadius.circular(16),
                      ),
                      child: Icon(
                        Icons.calendar_today,
                        color:
                            0 == 1 ? Colors.white : Colors.grey, // Icon color
                        size: 34,
                      ),
                    ),
                  ),
                  GestureDetector(
                    onTap: () {
                      // Do nothing since this is the active page
                    },
                    child: Container(
                      height: double.infinity,
                      width: 104,
                      decoration: BoxDecoration(
                        color: 1 == 1 // Highlight condition
                            ? Colors.grey[600] // Selected button background
                            : Colors.transparent, // Default button background
                        borderRadius: BorderRadius.circular(16),
                      ),
                      child: Icon(
                        Icons.sports_soccer,
                        color:
                            1 == 1 ? Colors.white : Colors.grey, // Icon color
                        size: 34,
                      ),
                    ),
                  ),
                  GestureDetector(
                    onTap: () {
                      Navigator.pushNamed(
                          context, '/historico'); // Navigate to historico
                    },
                    child: Container(
                      height: double.infinity,
                      width: 64,
                      decoration: BoxDecoration(
                        color: 2 == 1 // Highlight condition
                            ? Colors.grey[600] // Selected button background
                            : Colors.transparent, // Default button background
                        borderRadius: BorderRadius.circular(16),
                      ),
                      child: Icon(
                        Icons.history,
                        color:
                            2 == 1 ? Colors.white : Colors.grey, // Icon color
                        size: 34,
                      ),
                    ),
                  ),
                ],
              ),
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
        margin: EdgeInsets.only(bottom: 10),
        padding: EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.grey[800],
          borderRadius: BorderRadius.circular(10),
        ),
        child: Row(
          children: [
            CircleAvatar(
              backgroundColor: Colors.grey,
              child: Icon(Icons.person, color: Colors.white),
            ),
            SizedBox(width: 10),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    "NOME: $name",
                    style: TextStyle(color: Colors.white),
                  ),
                  Text(
                    "IDADE: $age",
                    style: TextStyle(color: Colors.grey),
                  ),
                ],
              ),
            ),
            Row(
              children: [
                Text(
                  "$stars",
                  style: TextStyle(
                      color: Colors.white, fontWeight: FontWeight.bold),
                ),
                Icon(Icons.star, color: Colors.yellow),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
