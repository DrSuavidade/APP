import 'package:flutter/material.dart';
import 'hamburger_menu.dart';
class CalendarScreen extends StatelessWidget {
  final List<Map<String, String>> games = [
    {"home": "A.F Viseu", "away": "SL Nelas", "time": "12:00 AM", "date": "17/10/2024"},
    {"home": "AC Castro Daire", "away": "CD Tondela", "time": "18:00 PM", "date": "20/10/2024"},
    {"home": "UD Alta Lisboa", "away": "AC Castro Daire", "time": "15:00 PM", "date": "23/10/2024"},
    // Add more games as needed
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
          // Levels Filter
          Container(
            height: 40,
            child: ListView(
              scrollDirection: Axis.horizontal,
              children: [
                _filterButton("Sub-10"),
                _filterButton("Sub-11"),
                _filterButton("Sub-12"),
                _filterButton("Sub-13"),
                _filterButton("Sub-14"),
                _filterButton("Sub-16"),
                _filterButton("Sub-19"),
                _filterButton("Sub-23"),
                _filterButton("PROFISSIONAL"),
              ],
            ),
          ),
          SizedBox(height: 10),
          // Games List
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
                      "${game['home']}  vs  ${game['away']}",
                      style: TextStyle(color: Colors.white),
                    ),
                    subtitle: Text(
                      "${game['date']} at ${game['time']}",
                      style: TextStyle(color: Colors.grey),
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
        currentIndex: 0,
        onTap: (index) {
          if (index == 1) Navigator.pushNamed(context, '/home');
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

  Widget _filterButton(String label) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 8.0),
      child: ElevatedButton(
        onPressed: () {
          // Filter functionality
        },
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.grey[900],
        ),
        child: Text(label, style: TextStyle(color: Colors.white)),
      ),
    );
  }
}
