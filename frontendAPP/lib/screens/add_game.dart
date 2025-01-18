// ignore_for_file: use_key_in_widget_constructors, prefer_const_constructors

import 'package:flutter/material.dart';
import 'hamburger_menu.dart'; // Import the reusable hamburger menu

class AddGameScreen extends StatelessWidget {
  final List<Map<String, String>> games = [
    {"home": "A.F Viseu", "away": "SL Nelas", "time": "12:00 AM", "date": "17/10/2024"},
    {"home": "FC Penafiel", "away": "CD Tondela", "time": "18:00 PM", "date": "20/10/2024"},
    {"home": "Leões SC", "away": "UD Oliveirense", "time": "15:00 PM", "date": "23/10/2024"},
    {"home": "FC Alverca", "away": "FC Paços de Ferreira", "time": "16:00 PM", "date": "25/10/2024"},
  ];

  final int userId;

  AddGameScreen({Key? key, required this.userId}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        backgroundColor: Colors.black,
        elevation: 0,
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
      drawer: HamburgerMenu(userId: userId),
      body: Column(
        children: [
          // Search Bar
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextField(
              decoration: InputDecoration(
                hintText: "Escreva o dia do jogo...",
                hintStyle: TextStyle(color: Colors.grey),
                prefixIcon: Icon(Icons.search, color: Colors.grey),
                filled: true,
                fillColor: Colors.grey[800],
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10),
                  borderSide: BorderSide.none,
                ),
              ),
            ),
          ),
          // Game List
          Expanded(
            child: ListView.builder(
              itemCount: games.length,
              itemBuilder: (context, index) {
                final game = games[index];
                return Card(
                  color: Colors.grey[800],
                  margin: EdgeInsets.symmetric(vertical: 5, horizontal: 16),
                  child: ListTile(
                    title: Text(
                      "${game['home']} vs ${game['away']}",
                      style: TextStyle(color: Colors.white),
                    ),
                    subtitle: Text(
                      "${game['date']} at ${game['time']}",
                      style: TextStyle(color: Colors.grey),
                    ),
                    onTap: () {
                      Navigator.pushNamed(context, '/add_player'); // Navigate to add_player.dart
                    },
                  ),
                );
              },
            ),
          ),
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        backgroundColor: Colors.grey[900],
        selectedItemColor: Colors.white,
        unselectedItemColor: Colors.grey,
        currentIndex: 0,
        onTap: (index) {
          if (index == 1) Navigator.pushNamed(context, '/home');
          if (index == 2) Navigator.pushNamed(context, '/historico');
        },
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.calendar_today), label: ""),
          BottomNavigationBarItem(icon: Icon(Icons.sports_soccer), label: ""),
          BottomNavigationBarItem(icon: Icon(Icons.history), label: ""),
        ],
      ),
    );
  }
}
