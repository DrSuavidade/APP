import 'package:flutter/material.dart';
import 'hamburger_menu.dart'; // Import the reusable hamburger menu

class AddPlayerBDScreen extends StatelessWidget {
  final List<Map<String, String>> players = [
    {"name": "João Gomes", "dob": "02/12/2012", "age": "12 anos"},
    {"name": "Mário Silva", "dob": "15/05/2010", "age": "14 anos"},
    {"name": "Ana Costa", "dob": "10/10/2011", "age": "13 anos"},
    {"name": "Pedro Marques", "dob": "20/07/2009", "age": "15 anos"},
  ];

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
      drawer: HamburgerMenu(),
      body: Column(
        children: [
          // Search Bar
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextField(
              decoration: InputDecoration(
                hintText: "Escreva o nome do jogador...",
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
          // All Players List
          Expanded(
            child: ListView.builder(
              itemCount: players.length,
              itemBuilder: (context, index) {
                final player = players[index];
                return Card(
                  color: Colors.grey[800],
                  margin: EdgeInsets.symmetric(vertical: 5, horizontal: 16),
                  child: ListTile(
                    title: Text(
                      "NOME: ${player['name']}",
                      style: TextStyle(color: Colors.white),
                    ),
                    subtitle: Text(
                      "${player['dob']} - ${player['age']}",
                      style: TextStyle(color: Colors.grey),
                    ),
                    trailing: Icon(Icons.check_circle, color: Colors.green),
                  ),
                );
              },
            ),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pushNamed(context, '/add_player_name'); // Navigate to add_player_name.dart
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
      bottomNavigationBar: BottomNavigationBar(
        backgroundColor: Colors.grey[900],
        selectedItemColor: Colors.white,
        unselectedItemColor: Colors.grey,
        currentIndex: 1,
        onTap: (index) {
          if (index == 0) Navigator.pushNamed(context, '/calendar');
          if (index == 2) Navigator.pushNamed(context, '/historico');
        },
        items: [
          BottomNavigationBarItem(icon: Icon(Icons.calendar_today), label: ""),
          BottomNavigationBarItem(icon: Icon(Icons.sports_soccer), label: ""),
          BottomNavigationBarItem(icon: Icon(Icons.history), label: ""),
        ],
      ),
    );
  }
}
