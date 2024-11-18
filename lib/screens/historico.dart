import 'package:flutter/material.dart';
import 'hamburger_menu.dart';

class HistoricoScreen extends StatelessWidget {
  final List<Map<String, dynamic>> reports = [
    {"name": "Afonso Lopes", "stars": 5, "status": "yellow"},
    {"name": "Mário Hernani", "stars": 4, "status": "green"},
    {"name": "Rodrigo Marques", "stars": 2, "status": "red"},
    {"name": "Marco Saraiva", "stars": 4, "status": "yellow"},
    {"name": "David Moreira", "stars": 3, "status": "yellow"},
    // Add more reports as needed
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
            IconButton(
              icon: Icon(Icons.menu, color: Colors.white),
              onPressed: () {
                openHamburgerMenu(context);
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
      body: Column(
        children: [
          // Search Bar
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextField(
              decoration: InputDecoration(
                hintText: "Escreva o dia do tipo...",
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
          // Reports List
          Expanded(
            child: ListView.builder(
              itemCount: reports.length,
              itemBuilder: (context, index) {
                final report = reports[index];
                return Card(
                  color: Colors.grey[800],
                  margin: EdgeInsets.symmetric(vertical: 5, horizontal: 16),
                  child: ListTile(
                    title: Text(
                      report['name'],
                      style: TextStyle(color: Colors.white),
                    ),
                    trailing: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          "${report['stars']}",
                          style: TextStyle(color: Colors.white),
                        ),
                        Icon(Icons.star, color: Colors.yellow),
                        SizedBox(width: 10),
                        CircleAvatar(
                          radius: 6,
                          backgroundColor: _statusColor(report['status']),
                        ),
                      ],
                    ),
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
        currentIndex: 2,
        onTap: (index) {
          if (index == 0) Navigator.pushNamed(context, '/calendar');
          if (index == 1) Navigator.pushNamed(context, '/home');
        },
        items: [
          BottomNavigationBarItem(icon: Icon(Icons.calendar_today), label: ""),
          BottomNavigationBarItem(icon: Icon(Icons.sports_soccer), label: ""),
          BottomNavigationBarItem(icon: Icon(Icons.history), label: ""),
        ],
      ),
    );
  }

  Color _statusColor(String status) {
    switch (status) {
      case "green":
        return Colors.green;
      case "yellow":
        return Colors.yellow;
      case "red":
        return Colors.red;
      default:
        return Colors.grey;
    }
  }
}
