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
              style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 10),
            GestureDetector(
              onTap: () {
                Navigator.pushNamed(context, '/add_player'); // Navigate to add_player.dart
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
                      style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
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
                Navigator.pushNamed(context, '/add_player'); // Navigate to add_player.dart
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
                      style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
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
                Navigator.pushNamed(context, '/calendar'); // Navigate to calendar.dart
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
              style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.bold),
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
                Navigator.pushNamed(context, '/add_game'); // Navigate to add_game.dart
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.grey[900],
                padding: EdgeInsets.symmetric(vertical: 14.0),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10.0),
                ),
              ),
              child: Text("ADICIONAR JOGADOR", style: TextStyle(color: Colors.white)),
            ),
          ],
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        backgroundColor: Colors.grey[900],
        selectedItemColor: Colors.white,
        unselectedItemColor: Colors.grey,
        currentIndex: 1, // Middle button is active
        onTap: (index) {
          if (index == 0) {
            Navigator.pushNamed(context, '/calendar'); // Left button -> calendar.dart
          } else if (index == 2) {
            Navigator.pushNamed(context, '/historico'); // Right button -> historico.dart
          }
        },
        items: [
          BottomNavigationBarItem(icon: Icon(Icons.calendar_today), label: ""),
          BottomNavigationBarItem(icon: Icon(Icons.sports_soccer), label: ""),
          BottomNavigationBarItem(icon: Icon(Icons.history), label: ""),
        ],
      ),
    );
  }

  Widget _playerCard(String name, int age, int stars, BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.pushNamed(context, '/relatorio'); // Navigate to relatorio.dart
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
                  style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
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
